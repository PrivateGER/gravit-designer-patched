module.exports = function (module, exports, require) {
        "use strict";
        (require(1196 /* polyfill:Array */), require(19), require(1197), require(180), require(181 /* polyfill:ArrayBuffer */), require(8 /* Symbol */), require(134 /* polyfill:String */), require(218), require(189), require(190), require(191), require(192), require(4), require(32), require(38), require(33));
        var GSystem = require(176),
            IsFiniteNonNegativeNumber = require(0);
        require(10 /* designerConfig */);
        var GStorage = require(237),
            saveAs = require(1117 /* lib:file-saver */).saveAs,
            legacySaveFilePickerType = null,
            legacyDirectoryPickerType = null;
        function FileSystemAccessStorage() {
            ((this._fileInput = null), (this._fileInputCallback = null));
        }
        function ensureWriteAccess(handle) {
            return handle
                .queryPermission({ writable: true })
                .then((permission) => ("granted" !== permission ? handle.requestPermission({ writable: true }) : permission))
                .then((finalPermission) => {
                    if ("granted" !== finalPermission) throw new Error("Cannot get write access");
                });
        }
        (IsFiniteNonNegativeNumber.inherit(FileSystemAccessStorage, GStorage),
            (FileSystemAccessStorage.Directory = function (storage, dirHandle) {
                (GStorage.Directory.call(this, storage), (this._dirHandle = dirHandle), (this._id = null));
            }),
            IsFiniteNonNegativeNumber.inherit(FileSystemAccessStorage.Directory, GStorage.Directory),
            (FileSystemAccessStorage.Directory.prototype._dirHandle = null),
            (FileSystemAccessStorage.Directory.prototype._id = null),
            (FileSystemAccessStorage.Directory.prototype.getUniqueId = function () {
                return null;
            }),
            (FileSystemAccessStorage.Directory.prototype.addDirectory = async function (name) {
                let dirHandle = null;
                try {
                    return ((dirHandle = await this._dirHandle.getDirectory(name, { create: true })), await ensureWriteAccess(dirHandle), new FileSystemAccessStorage.Directory(this._storage, dirHandle));
                } catch (t) {
                    throw new Error("Cannot create a directory: " + name);
                }
            }),
            (FileSystemAccessStorage.Directory.prototype.addFile = async function (name) {
                let fileHandle = null;
                try {
                    return ((fileHandle = await this._dirHandle.getFile(name, { create: true })), await ensureWriteAccess(fileHandle), new FileSystemAccessStorage.Item(this._storage, null, fileHandle.name, fileHandle));
                } catch (e) {
                    throw new Error("Cannot create a file");
                }
            }),
            (FileSystemAccessStorage.Item = function (storage, data, filename, fileHandle) {
                (GStorage.Item.call(this, storage), (this._data = data), (this._filename = filename), (this._fileHandle = fileHandle));
            }),
            IsFiniteNonNegativeNumber.inherit(FileSystemAccessStorage.Item, GStorage.Item),
            (FileSystemAccessStorage.Item.prototype._data = null),
            (FileSystemAccessStorage.Item.prototype._filename = null),
            (FileSystemAccessStorage.Item.prototype._fileHandle = null),
            (FileSystemAccessStorage.Item.prototype.getFullName = function () {
                return this._filename;
            }),
            (FileSystemAccessStorage.Item.prototype.setFileName = function (filename) {
                this._filename = filename;
            }),
            (FileSystemAccessStorage.Item.prototype.read = function (callback) {
                if (this._data || !this._fileHandle) return callback(this._data);
                this._fileHandle
                    .getFile()
                    .then((file) => file.arrayBuffer())
                    .then((buffer) => {
                        ((this._data = buffer), callback(this._data));
                    });
            }),
            (FileSystemAccessStorage.Item.prototype.write = function (data, callback, quotaErrorCallback, progress, document) {
                if ((this._verifyFileNotTooSmall(data.length, document), this._fileHandle)) {
                    let writable = null;
                    this._fileHandle
                        .createWritable()
                        .then((stream) => ((writable = stream), writable.truncate(0)))
                        .then(() => writable.write(data))
                        .then(() => writable.close())
                        .then(() => {
                            callback && callback();
                        })
                        .catch((error) => {
                            if (error instanceof DOMException && error.code === DOMException.QUOTA_EXCEEDED_ERR)
                                return (this.notEnoughDiskSpace(), void (quotaErrorCallback ? quotaErrorCallback() : callback && callback()));
                            (saveAs(new Blob([data]), this._filename), callback && callback());
                        });
                } else (saveAs(new Blob([data]), this._filename), callback && callback());
            }),
            (FileSystemAccessStorage.prototype._isFileAPIAvailable = function () {
                return false;
            }),
            (FileSystemAccessStorage.prototype._hasDirectoryWriteAPI = function () {
                return "function" == typeof window.chooseFileSystemEntries;
            }),
            (FileSystemAccessStorage.prototype.canChooseDirectory = function () {
                return this._hasDirectoryWriteAPI() && true;
            }),
            (FileSystemAccessStorage.prototype.canPromptOpen = function () {
                return true;
            }),
            (FileSystemAccessStorage.prototype.canPromptSave = function () {
                return this._isFileAPIAvailable();
            }),
            (FileSystemAccessStorage.prototype.canSave = function () {
                return this._isFileAPIAvailable();
            }),
            (FileSystemAccessStorage.prototype.canDownload = function () {
                return !this._isFileAPIAvailable();
            }),
            (FileSystemAccessStorage.prototype.chooseDirectory = function (successCallback, errorCallback, securityErrorCallback) {
                if (!this._isFileAPIAvailable() || !this.canChooseDirectory()) return;
                var options = { type: legacyDirectoryPickerType || "open-directory" };
                let dirHandle = null;
                var succeeded = false;
                window
                    .chooseFileSystemEntries(options)
                    .then((pickedHandle) => ((dirHandle = pickedHandle), ensureWriteAccess(pickedHandle)))
                    .then(() => {
                        let result = successCallback(new FileSystemAccessStorage.Directory(this, dirHandle));
                        return ((succeeded = true), result);
                    })
                    .catch((error) => {
                        if (error instanceof DOMException && "SecurityError" === error.name) {
                            if ((console.warn("Bugged!"), securityErrorCallback)) return void securityErrorCallback();
                        } else !succeeded && !legacyDirectoryPickerType && error instanceof TypeError && (legacyDirectoryPickerType = "openDirectory");
                        errorCallback && errorCallback();
                    });
            }),
            (FileSystemAccessStorage.prototype.openPrompt = function (filters, callback, multiple) {
                let { disableFileSystemAccessAPI: disableFileSystemAccessAPI = false, silent: silent = false } =
                    arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                if (!disableFileSystemAccessAPI && this._isFileAPIAvailable()) {
                    var options = { multiple: !!multiple };
                    if (filters.length > 0) {
                        const mimeExtMap = {};
                        options.excludeAcceptAllOptions = true;
                        for (let n = 0, filterCount = filters.length; n < filterCount; n++) {
                            const { mime, ext } = filters[n];
                            mime && ext
                                ? void 0 !== mimeExtMap[mime]
                                    ? (Array.isArray(mimeExtMap[mime]) || (mimeExtMap[mime] = [mimeExtMap[mime]]), mimeExtMap[mime].push(ext.startsWith(".") ? ext : ".".concat(ext)))
                                    : (mimeExtMap[mime] = ext.startsWith(".") ? ext : ".".concat(ext))
                                : console.warn(
                                      'openPrompt warning: no mime or ext. given mime: "'.concat(mime, '", given ext: "').concat(ext, '"')
                                  );
                        }
                        options.types = [{ accept: mimeExtMap }];
                    }
                    return (
                        window
                            .showOpenFilePicker(options)
                            .then((fileHandles) => {
                                (Array.isArray(fileHandles) || (fileHandles = [fileHandles]),
                                    fileHandles.forEach((fileHandle) => {
                                        fileHandle.getFile()
                                            .then((file) => file.arrayBuffer())
                                            .then((buffer) => callback(new FileSystemAccessStorage.Item(this, new Uint8Array(buffer), fileHandle.name, fileHandle), fileHandles.length))
                                            .catch(() => {
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
                const extensions = filters.map((filter) => filter.ext).flat();
                if (!this._fileInput) {
                    ((this._fileInput = document.createElement("input")),
                        this._fileInput.setAttribute("type", "file"),
                        this._fileInput.setAttribute("id", "file-input"),
                        (this._fileInput.multiple = multiple),
                        (this._fileInput.style.opacity = 0),
                        (this._fileInput.style.position = "absolute"),
                        (this._fileInput.style.zIndex = -1),
                        (this._fileInput.style.left = "-9999px"),
                        (this._fileInput.style.top = "-9999px"));
                    var readNextFile = function (index) {
                        var fileCount = this._fileInput.files.length;
                        if (index >= fileCount) this._fileInput.value = "";
                        else {
                            var file = this._fileInput.files[index],
                                name = file.name;
                            if (file instanceof File || file instanceof Blob) {
                                var reader = new FileReader();
                                ((reader.onload = function () {
                                    (this._fileInputCallback(new FileSystemAccessStorage.Item(this, new Uint8Array(reader.result), name), fileCount), readNextFile(index + 1));
                                }.bind(this)),
                                    reader.readAsArrayBuffer(file));
                            } else readNextFile(index + 1);
                        }
                    }.bind(this);
                    (this._fileInput.addEventListener("change", () => {
                        readNextFile(0);
                    }),
                        document.body.appendChild(this._fileInput));
                }
                (GSystem.hardware === GSystem.Hardware.Tablet && GSystem.operatingSystem === GSystem.OperatingSystem.OSX_IOS
                    ? this._fileInput.removeAttribute("accept")
                    : extensions && extensions.length
                      ? this._fileInput.setAttribute("accept", extensions.map((ext) => "." + ext).join(","))
                      : this._fileInput.removeAttribute("accept"),
                    (this._fileInputCallback = callback),
                    this._fileInput.focus(),
                    silent || this._fileInput.click());
            }),
            (FileSystemAccessStorage.prototype.savePrompt = function (suggestedName, filters, callback, cancelCallback) {
                if (this._isFileAPIAvailable()) {
                    var options = { suggestedName: suggestedName };
                    if (filters.length > 0) {
                        const mimeExtMap = {};
                        options.excludeAcceptAllOptions = true;
                        for (let n = 0, filterCount = filters.length; n < filterCount; n++) {
                            let { mime: mime, ext: ext } = filters[n];
                            mime && ext
                                ? ("jpg" === ext && (mime = "x-really-an-image/jpeg"),
                                  void 0 !== mimeExtMap[mime]
                                      ? (Array.isArray(mimeExtMap[mime]) || (mimeExtMap[mime] = [mimeExtMap[mime]]), mimeExtMap[mime].push(ext.startsWith(".") ? ext : ".".concat(ext)))
                                      : (mimeExtMap[mime] = ext.startsWith(".") ? ext : ".".concat(ext)))
                                : console.warn(
                                      'openPrompt warning: no mime or ext. given mime: "'.concat(mime, '", given ext: "').concat(ext, '"')
                                  );
                        }
                        let types = [{ accept: mimeExtMap }];
                        const mimeKeys = Object.keys(mimeExtMap);
                        ((mimeKeys || []).length > 1 &&
                            (types = mimeKeys.map((key) => {
                                let accept = {};
                                return ((accept[key] = mimeExtMap[key]), { accept: accept });
                            })),
                            (options.types = types));
                    }
                    var succeeded = false;
                    window
                        .showSaveFilePicker(options)
                        .then((fileHandle) => ((succeeded = true), callback(new FileSystemAccessStorage.Item(this, null, fileHandle.name, fileHandle))))
                        .catch((error) => {
                            if ((!succeeded && !legacySaveFilePickerType && error instanceof TypeError && (legacySaveFilePickerType = "saveFile"), !succeeded && error.code !== DOMException.ABORT_ERR))
                                return this.download(suggestedName, callback);
                            cancelCallback && cancelCallback();
                        });
                }
            }),
            (FileSystemAccessStorage.prototype.download = function (name, callback) {
                return callback(new FileSystemAccessStorage.Item(this, null, name));
            }),
            (module.exports = FileSystemAccessStorage));
    };
