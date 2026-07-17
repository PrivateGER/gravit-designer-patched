module.exports = function (module, exports, require) {
        "use strict";
        (require(1196 /* polyfill:Array */),
            require(19),
            require(1197),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(107 /* polyfill:RegExp */),
            require(134 /* polyfill:String */),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(32),
            require(38),
            require(33));
        var GSystem = require(176),
            IsFiniteNonNegativeNumber = require(0),
            GStorage = require(237);
        const { GRegex } = require(263 /* GRegex */);
        var saveAs = require(1117 /* lib:file-saver */).saveAs,
            directoryPickerDenied = false,
            saveFilePickerType = null,
            directoryPickerType = null;
        function GBrowserStorage() {
            ((this._fileInput = null), (this._fileInputCallback = null));
        }
        function ensureWritePermission(fileHandle) {
            return fileHandle
                .queryPermission({ writable: true })
                .then((permissionStatus) => ("granted" !== permissionStatus ? fileHandle.requestPermission({ writable: true }) : permissionStatus))
                .then((updatedPermission) => {
                    if ("granted" !== updatedPermission) throw new Error("Cannot get write access");
                });
        }
        (IsFiniteNonNegativeNumber.inherit(GBrowserStorage, GStorage),
            (GBrowserStorage.Directory = function (storage, dirHandle) {
                (GStorage.Directory.call(this, storage), (this._dirHandle = dirHandle), (this._id = null));
            }),
            IsFiniteNonNegativeNumber.inherit(GBrowserStorage.Directory, GStorage.Directory),
            (GBrowserStorage.Directory.prototype._dirHandle = null),
            (GBrowserStorage.Directory.prototype._id = null),
            (GBrowserStorage.Directory.prototype.getUniqueId = function () {
                return null;
            }),
            (GBrowserStorage.Directory.prototype.addDirectory = async function (name, t) {
                let dirHandle = null;
                try {
                    return ((dirHandle = await this._dirHandle.getDirectory(name, { create: true })), await ensureWritePermission(dirHandle), new GBrowserStorage.Directory(this._storage, dirHandle));
                } catch (error) {
                    throw new Error("Cannot create a directory: " + name);
                }
            }),
            (GBrowserStorage.Directory.prototype.addFile = async function (name, t) {
                let fileHandle = null;
                try {
                    return ((fileHandle = await this._dirHandle.getFile(name, { create: true })), await ensureWritePermission(fileHandle), new GBrowserStorage.Item(this._storage, null, fileHandle.name, fileHandle));
                } catch (error) {
                    throw new Error("Cannot create a file");
                }
            }),
            (GBrowserStorage.Item = function (storage, data, filename, fileHandle) {
                (GStorage.Item.call(this, storage), (this._data = data), (this._filename = filename), (this._fileHandle = fileHandle));
            }),
            IsFiniteNonNegativeNumber.inherit(GBrowserStorage.Item, GStorage.Item),
            (GBrowserStorage.Item.prototype._data = null),
            (GBrowserStorage.Item.prototype._filename = null),
            (GBrowserStorage.Item.prototype._fileHandle = null),
            (GBrowserStorage.Item.prototype.getFullName = function () {
                return this._filename;
            }),
            (GBrowserStorage.Item.prototype.setFileName = function (filename) {
                this._filename = filename;
            }),
            (GBrowserStorage.Item.prototype.read = function (callback, t, n) {
                if (this._data || !this._fileHandle) return callback(this._data);
                this._fileHandle
                    .getFile()
                    .then((file) => file.arrayBuffer())
                    .then((buffer) => {
                        ((this._data = new Uint8Array(buffer)), callback(this._data));
                    });
            }),
            (GBrowserStorage.Item.prototype.write = function (data, onSuccess, onQuotaExceeded, progress, document) {
                if ((this._verifyFileNotTooSmall(data.length, document), this._fileHandle)) {
                    let writable = null;
                    this._fileHandle
                        .createWritable()
                        .then((stream) => ((writable = stream), writable.truncate(0)))
                        .then(() => writable.write(data))
                        .then(() => writable.close())
                        .then(() => {
                            onSuccess && onSuccess();
                        })
                        .catch((error) => {
                            if (error instanceof DOMException && error.code === DOMException.QUOTA_EXCEEDED_ERR)
                                return (this.notEnoughDiskSpace(), void (onQuotaExceeded ? onQuotaExceeded() : onSuccess && onSuccess()));
                            (saveAs(new Blob([data]), this._filename), onSuccess && onSuccess());
                        });
                } else (saveAs(new Blob([data]), this._filename), onSuccess && onSuccess());
            }),
            (GBrowserStorage.prototype._hasFileAPI = function () {
                return "function" == typeof window.showSaveFilePicker && !this._isChromeOS();
            }),
            (GBrowserStorage.prototype._isChromeOS = function () {
                return GRegex.NavigatorUserAgent.IS_CHROME_OS.test(navigator.userAgent || "");
            }),
            (GBrowserStorage.prototype._hasDirectoryWriteAPI = function () {
                return "function" == typeof window.chooseFileSystemEntries;
            }),
            (GBrowserStorage.prototype.canChooseDirectory = function () {
                return this._hasDirectoryWriteAPI() && !directoryPickerDenied;
            }),
            (GBrowserStorage.prototype.canPromptOpen = function () {
                return true;
            }),
            (GBrowserStorage.prototype.canPromptSave = function (e) {
                return this._hasFileAPI();
            }),
            (GBrowserStorage.prototype.canSave = function () {
                return this._hasFileAPI();
            }),
            (GBrowserStorage.prototype.canDownload = function () {
                return true;
            }),
            (GBrowserStorage.prototype.chooseDirectory = function (onDirectorySelected, onError, onPermissionDenied) {
                if (!this._hasFileAPI() || !this.canChooseDirectory()) return;
                var pickerOptions = { type: directoryPickerType || "open-directory" };
                let dirHandle = null;
                var succeeded = false;
                window
                    .chooseFileSystemEntries(pickerOptions)
                    .then((handle) => ((dirHandle = handle), ensureWritePermission(handle)))
                    .then(() => {
                        let result = onDirectorySelected(new GBrowserStorage.Directory(this, dirHandle));
                        return ((succeeded = true), result);
                    })
                    .catch((error) => {
                        if (error instanceof DOMException && "SecurityError" === error.name) {
                            if (((directoryPickerDenied = true), onPermissionDenied)) return void onPermissionDenied();
                        } else !succeeded && !directoryPickerType && error instanceof TypeError && (directoryPickerType = "openDirectory");
                        onError && onError();
                    });
            }),
            (GBrowserStorage.prototype.openPrompt = function (fileTypes, callback, allowMultiple) {
                let { disableFileSystemAccessAPI: disableFileSystemAccessAPI = false, silent: silent = false } =
                    arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                if (!disableFileSystemAccessAPI && this._hasFileAPI()) {
                    var pickerOptions = { multiple: !!allowMultiple };
                    return (
                        fileTypes.length > 0 && ((pickerOptions.excludeAcceptAllOption = true), (pickerOptions.types = [this._prepareDialogTypes(fileTypes)])),
                        window
                            .showOpenFilePicker(pickerOptions)
                            .then((handles) => {
                                (Array.isArray(handles) || (handles = [handles]),
                                    handles.forEach((fileHandle) => {
                                        fileHandle.getFile()
                                            .then((file) => file.arrayBuffer())
                                            .then((buffer) => callback(new GBrowserStorage.Item(this, new Uint8Array(buffer), fileHandle.name, fileHandle), handles.length))
                                            .catch((error) => {
                                                console.log("ERROR reading file");
                                            });
                                    }));
                            })
                            .catch((error) => {
                                error instanceof DOMException || console.warn("showOpenFilePicker warning", error);
                            }),
                        void (this._fileInputCallback = callback)
                    );
                }
                const extensions = fileTypes.map((fileType) => fileType.ext).flat();
                fileTypes.map((fileType) => fileType.mime);
                if (!this._fileInput) {
                    ((this._fileInput = document.createElement("input")),
                        this._fileInput.setAttribute("type", "file"),
                        this._fileInput.setAttribute("id", "file-input"),
                        (this._fileInput.multiple = allowMultiple),
                        (this._fileInput.style.opacity = 0),
                        (this._fileInput.style.position = "absolute"),
                        (this._fileInput.style.zIndex = -1),
                        (this._fileInput.style.left = "-9999px"),
                        (this._fileInput.style.top = "-9999px"));
                    var readFileAt = function (index) {
                        var fileCount = this._fileInput.files.length;
                        if (index >= fileCount) this._fileInput.value = "";
                        else {
                            var file = this._fileInput.files[index],
                                fileName = file.name;
                            if (file instanceof File || file instanceof Blob) {
                                var fileReader = new FileReader();
                                ((fileReader.onload = function () {
                                    (this._fileInputCallback(new GBrowserStorage.Item(this, new Uint8Array(fileReader.result), fileName), fileCount), readFileAt(index + 1));
                                }.bind(this)),
                                    fileReader.readAsArrayBuffer(file));
                            } else readFileAt(index + 1);
                        }
                    }.bind(this);
                    (this._fileInput.addEventListener("change", () => {
                        readFileAt(0);
                    }),
                        document.body.appendChild(this._fileInput));
                }
                (GSystem.operatingSystem === GSystem.OperatingSystem.OSX_IOS
                    ? this._fileInput.removeAttribute("accept")
                    : extensions && extensions.length
                      ? this._fileInput.setAttribute("accept", extensions.map((extension) => "." + extension).join(","))
                      : this._fileInput.removeAttribute("accept"),
                    (this._fileInputCallback = callback),
                    this._fileInput.focus(),
                    silent || this._fileInput.click());
            }),
            (GBrowserStorage.prototype.savePrompt = function (suggestedName, fileTypes, onSuccess, onCancel) {
                if (this._hasFileAPI()) {
                    var pickerOptions = {};
                    fileTypes.length > 0 && ((pickerOptions.suggestedName = suggestedName), (pickerOptions.excludeAcceptAllOption = true), (pickerOptions.types = [this._prepareDialogTypes(fileTypes, true)]));
                    var succeeded = false;
                    window
                        .showSaveFilePicker(pickerOptions)
                        .then((fileHandle) => ((succeeded = true), onSuccess(new GBrowserStorage.Item(this, null, fileHandle.name, fileHandle))))
                        .catch((error) => {
                            if ((!succeeded && !saveFilePickerType && error instanceof TypeError && (saveFilePickerType = "saveFile"), !succeeded && error.code !== DOMException.ABORT_ERR))
                                return this.download(suggestedName, onSuccess);
                            onCancel && onCancel();
                        });
                }
            }),
            (GBrowserStorage.prototype._prepareDialogTypes = function (fileTypes) {
                let forSave = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const mimeToExtensions = {};
                let description = "";
                for (let i = 0, a = fileTypes.length; i < a; i++) {
                    let { mime, ext } = fileTypes[i];
                    mime && ext
                        ? (forSave && "jpg" === ext && (mime = "x-really-an-image/jpeg"),
                          void 0 !== mimeToExtensions[mime]
                              ? (Array.isArray(mimeToExtensions[mime]) || (mimeToExtensions[mime] = [mimeToExtensions[mime]]),
                                mimeToExtensions[mime].push(ext.startsWith(".") ? ext : ".".concat(ext)),
                                description && (description += ", "),
                                (description += "*" + (ext.startsWith(".") ? ext : ".".concat(ext))))
                              : ((mimeToExtensions[mime] = ext.startsWith(".") ? ext : ".".concat(ext)),
                                description && (description += ", "),
                                (description += "*" + (ext.startsWith(".") ? ext : ".".concat(ext)))))
                        : console.warn('openPrompt warning: no mime or ext. given mime: "'.concat(mime, '", given ext: "').concat(ext, '"'));
                }
                return { description: description, accept: mimeToExtensions };
            }),
            (GBrowserStorage.prototype.download = function (filename, callback) {
                return callback(new GBrowserStorage.Item(this, null, filename));
            }),
            (module.exports = GBrowserStorage));
    };
