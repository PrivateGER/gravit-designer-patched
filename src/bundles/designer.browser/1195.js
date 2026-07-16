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
        var o = require(176),
            IsFiniteNonNegativeNumber = require(0),
            GDocument = require(237);
        const { GRegex } = require(263 /* GRegex */);
        var s = require(1117).saveAs,
            l = false,
            c = null,
            d = null;
        function u() {
            ((this._fileInput = null), (this._fileInputCallback = null));
        }
        function p(e) {
            return e
                .queryPermission({ writable: true })
                .then((t) => ("granted" !== t ? e.requestPermission({ writable: true }) : t))
                .then((e) => {
                    if ("granted" !== e) throw new Error("Cannot get write access");
                });
        }
        (IsFiniteNonNegativeNumber.inherit(u, GDocument),
            (u.Directory = function (e, t) {
                (GDocument.Directory.call(this, e), (this._dirHandle = t), (this._id = null));
            }),
            IsFiniteNonNegativeNumber.inherit(u.Directory, GDocument.Directory),
            (u.Directory.prototype._dirHandle = null),
            (u.Directory.prototype._id = null),
            (u.Directory.prototype.getUniqueId = function () {
                return null;
            }),
            (u.Directory.prototype.addDirectory = async function (e, t) {
                let n = null;
                try {
                    return ((n = await this._dirHandle.getDirectory(e, { create: true })), await p(n), new u.Directory(this._storage, n));
                } catch (t) {
                    throw new Error("Cannot create a directory: " + e);
                }
            }),
            (u.Directory.prototype.addFile = async function (e, t) {
                let n = null;
                try {
                    return ((n = await this._dirHandle.getFile(e, { create: true })), await p(n), new u.Item(this._storage, null, n.name, n));
                } catch (e) {
                    throw new Error("Cannot create a file");
                }
            }),
            (u.Item = function (e, t, n, o) {
                (GDocument.Item.call(this, e), (this._data = t), (this._filename = n), (this._fileHandle = o));
            }),
            IsFiniteNonNegativeNumber.inherit(u.Item, GDocument.Item),
            (u.Item.prototype._data = null),
            (u.Item.prototype._filename = null),
            (u.Item.prototype._fileHandle = null),
            (u.Item.prototype.getFullName = function () {
                return this._filename;
            }),
            (u.Item.prototype.setFileName = function (e) {
                this._filename = e;
            }),
            (u.Item.prototype.read = function (e, t, n) {
                if (this._data || !this._fileHandle) return e(this._data);
                this._fileHandle
                    .getFile()
                    .then((e) => e.arrayBuffer())
                    .then((t) => {
                        ((this._data = new Uint8Array(t)), e(this._data));
                    });
            }),
            (u.Item.prototype.write = function (e, t, n, o, i) {
                if ((this._verifyFileNotTooSmall(e.length, i), this._fileHandle)) {
                    let o = null;
                    this._fileHandle
                        .createWritable()
                        .then((e) => ((o = e), o.truncate(0)))
                        .then(() => o.write(e))
                        .then(() => o.close())
                        .then(() => {
                            t && t();
                        })
                        .catch((o) => {
                            if (o instanceof DOMException && o.code === DOMException.QUOTA_EXCEEDED_ERR)
                                return (this.notEnoughDiskSpace(), void (n ? n() : t && t()));
                            (s(new Blob([e]), this._filename), t && t());
                        });
                } else (s(new Blob([e]), this._filename), t && t());
            }),
            (u.prototype._hasFileAPI = function () {
                return "function" == typeof window.showSaveFilePicker && !this._isChromeOS();
            }),
            (u.prototype._isChromeOS = function () {
                return GRegex.NavigatorUserAgent.IS_CHROME_OS.test(navigator.userAgent || "");
            }),
            (u.prototype._hasDirectoryWriteAPI = function () {
                return "function" == typeof window.chooseFileSystemEntries;
            }),
            (u.prototype.canChooseDirectory = function () {
                return this._hasDirectoryWriteAPI() && !l;
            }),
            (u.prototype.canPromptOpen = function () {
                return true;
            }),
            (u.prototype.canPromptSave = function (e) {
                return this._hasFileAPI();
            }),
            (u.prototype.canSave = function () {
                return this._hasFileAPI();
            }),
            (u.prototype.canDownload = function () {
                return true;
            }),
            (u.prototype.chooseDirectory = function (e, t, n) {
                if (!this._hasFileAPI() || !this.canChooseDirectory()) return;
                var o = { type: d || "open-directory" };
                let i = null;
                var a = false;
                window
                    .chooseFileSystemEntries(o)
                    .then((e) => ((i = e), p(e)))
                    .then(() => {
                        let t = e(new u.Directory(this, i));
                        return ((a = true), t);
                    })
                    .catch((e) => {
                        if (e instanceof DOMException && "SecurityError" === e.name) {
                            if (((l = true), n)) return void n();
                        } else !a && !d && e instanceof TypeError && (d = "openDirectory");
                        t && t();
                    });
            }),
            (u.prototype.openPrompt = function (e, t, n) {
                let { disableFileSystemAccessAPI: i = false, silent: a = false } =
                    arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                if (!i && this._hasFileAPI()) {
                    var r = { multiple: !!n };
                    return (
                        e.length > 0 && ((r.excludeAcceptAllOption = true), (r.types = [this._prepareDialogTypes(e)])),
                        window
                            .showOpenFilePicker(r)
                            .then((e) => {
                                (Array.isArray(e) || (e = [e]),
                                    e.forEach((n) => {
                                        n.getFile()
                                            .then((e) => e.arrayBuffer())
                                            .then((o) => t(new u.Item(this, new Uint8Array(o), n.name, n), e.length))
                                            .catch((e) => {
                                                console.log("ERROR reading file");
                                            });
                                    }));
                            })
                            .catch((e) => {
                                e instanceof DOMException || console.warn("showOpenFilePicker warning", e);
                            }),
                        void (this._fileInputCallback = t)
                    );
                }
                const s = e.map((e) => e.ext).flat();
                e.map((e) => e.mime);
                if (!this._fileInput) {
                    ((this._fileInput = document.createElement("input")),
                        this._fileInput.setAttribute("type", "file"),
                        this._fileInput.setAttribute("id", "file-input"),
                        (this._fileInput.multiple = n),
                        (this._fileInput.style.opacity = 0),
                        (this._fileInput.style.position = "absolute"),
                        (this._fileInput.style.zIndex = -1),
                        (this._fileInput.style.left = "-9999px"),
                        (this._fileInput.style.top = "-9999px"));
                    var l = function (e) {
                        var t = this._fileInput.files.length;
                        if (e >= t) this._fileInput.value = "";
                        else {
                            var n = this._fileInput.files[e],
                                o = n.name;
                            if (n instanceof File || n instanceof Blob) {
                                var i = new FileReader();
                                ((i.onload = function () {
                                    (this._fileInputCallback(new u.Item(this, new Uint8Array(i.result), o), t), l(e + 1));
                                }.bind(this)),
                                    i.readAsArrayBuffer(n));
                            } else l(e + 1);
                        }
                    }.bind(this);
                    (this._fileInput.addEventListener("change", () => {
                        l(0);
                    }),
                        document.body.appendChild(this._fileInput));
                }
                (o.operatingSystem === o.OperatingSystem.OSX_IOS
                    ? this._fileInput.removeAttribute("accept")
                    : s && s.length
                      ? this._fileInput.setAttribute("accept", s.map((e) => "." + e).join(","))
                      : this._fileInput.removeAttribute("accept"),
                    (this._fileInputCallback = t),
                    this._fileInput.focus(),
                    a || this._fileInput.click());
            }),
            (u.prototype.savePrompt = function (e, t, n, o) {
                if (this._hasFileAPI()) {
                    var i = {};
                    t.length > 0 && ((i.suggestedName = e), (i.excludeAcceptAllOption = true), (i.types = [this._prepareDialogTypes(t, true)]));
                    var a = false;
                    window
                        .showSaveFilePicker(i)
                        .then((e) => ((a = true), n(new u.Item(this, null, e.name, e))))
                        .catch((t) => {
                            if ((!a && !c && t instanceof TypeError && (c = "saveFile"), !a && t.code !== DOMException.ABORT_ERR))
                                return this.download(e, n);
                            o && o();
                        });
                }
            }),
            (u.prototype._prepareDialogTypes = function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const n = {};
                let o = "";
                for (let i = 0, a = e.length; i < a; i++) {
                    let { mime, ext } = e[i];
                    mime && ext
                        ? (t && "jpg" === ext && (mime = "x-really-an-image/jpeg"),
                          void 0 !== n[mime]
                              ? (Array.isArray(n[mime]) || (n[mime] = [n[mime]]),
                                n[mime].push(ext.startsWith(".") ? ext : ".".concat(ext)),
                                o && (o += ", "),
                                (o += "*" + (ext.startsWith(".") ? ext : ".".concat(ext))))
                              : ((n[mime] = ext.startsWith(".") ? ext : ".".concat(ext)),
                                o && (o += ", "),
                                (o += "*" + (ext.startsWith(".") ? ext : ".".concat(ext)))))
                        : console.warn('openPrompt warning: no mime or ext. given mime: "'.concat(mime, '", given ext: "').concat(ext, '"'));
                }
                return { description: o, accept: n };
            }),
            (u.prototype.download = function (e, t) {
                return t(new u.Item(this, null, e));
            }),
            (module.exports = u));
    };
