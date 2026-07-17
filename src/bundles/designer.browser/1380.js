module.exports = function (module, exports, require) {
        "use strict";
        (require(19),
            require(596 /* polyfill:Array */),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(57),
            require(20 /* polyfill:RegExp */),
            require(34),
            require(134 /* polyfill:String */),
            require(218),
            require(692),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(41),
            require(32),
            require(33));
        var GObject = require(1),
            designerConfig = require(10),
            GFontsProvider = require(381);
        function GBrowserFontsProvider(providerManager) {
            if (GBrowserFontsProvider._instance) throw new Error("This class cannot be instantiated multiple times");
            ((GBrowserFontsProvider._instance = this), GFontsProvider.call(this, providerManager));
        }
        GObject.GObject.inherit(GBrowserFontsProvider, GFontsProvider);
        var providerId = GObject.GUtil.uuid();
        ((GBrowserFontsProvider.DEFAULT_PORT = 32119),
            (GBrowserFontsProvider.START_PORT_SPAN = 1),
            (GBrowserFontsProvider.PORT_SPAN = 5),
            (GBrowserFontsProvider.HOST =
                "undefined" == typeof window || !window || (window.process && window.process.type)
                    ? ""
                    : window.location.href.replace(/\/$/, "")),
            (GBrowserFontsProvider.LAUNCHER_PATH = "/assets/data/launcher.swf"),
            (GBrowserFontsProvider.Cmd = {
                success: 0,
                font: 1,
                list: 2,
                probe: 3,
                close: 4,
                previews: 5,
                error: 255,
                stamp: 3735941121,
            }),
            (GBrowserFontsProvider._instance = null),
            (GBrowserFontsProvider._launcherInstall = function () {
                GBrowserFontsProvider._instance._providerManager.setLock();
            }),
            (GBrowserFontsProvider._closeLauncher = function () {
                var intervalId,
                    t = 0,
                    checkStatus = function () {
                        if (this._isInitialized()) return (console.log("initialized: finish"), void clearInterval(intervalId));
                        if (!this._taskLock) {
                            if (((this._fontList = null), this._cachedInstallButton)) {
                                var parentElement = this._cachedInstallButton.parentElement;
                                (parentElement && parentElement.contains(this._cachedInstallButton) && parentElement.removeChild(this._cachedInstallButton),
                                    (this._cachedInstallButton = null));
                            }
                            (this._providerManager.reset(), t++ > 10 && (this._cbFatal(), clearInterval(intervalId)));
                        }
                    }.bind(GBrowserFontsProvider._instance);
                intervalId = setInterval(checkStatus, 2e3);
            }),
            (GBrowserFontsProvider.prototype._firstConnect = true),
            (GBrowserFontsProvider.prototype._tlsError = false),
            (GBrowserFontsProvider.prototype._initialized = false),
            (GBrowserFontsProvider.prototype._connection = null),
            (GBrowserFontsProvider.prototype._tmpConnection = null),
            (GBrowserFontsProvider.prototype._fontList = null),
            (GBrowserFontsProvider.prototype._doReverse = false),
            (GBrowserFontsProvider.prototype._fontListLength = -1),
            (GBrowserFontsProvider.prototype._taskQueue = []),
            (GBrowserFontsProvider.prototype._taskLock = false),
            (GBrowserFontsProvider.prototype._resolveCallback = null),
            (GBrowserFontsProvider.prototype._oldUnresolved = null),
            (GBrowserFontsProvider.prototype._listCallbacks = []),
            (GBrowserFontsProvider.prototype._previewCallback = null),
            (GBrowserFontsProvider.prototype._cachedInstallButton = null),
            (GBrowserFontsProvider.prototype._timeout = null),
            (GBrowserFontsProvider.prototype._connect = function (requestedPort) {
                var port = requestedPort || GBrowserFontsProvider.DEFAULT_PORT;
                if (
                    (this._firstConnect
                        ? port > GBrowserFontsProvider.DEFAULT_PORT + GBrowserFontsProvider.START_PORT_SPAN && this._error()
                        : port > GBrowserFontsProvider.DEFAULT_PORT + GBrowserFontsProvider.PORT_SPAN && this._error(),
                    !((this._tmpConnection && this._taskLock) || this._connection))
                )
                    if (this._fontList && 1 == this._fontList.length && this._fontList[0].special) this._cbFail();
                    else
                        try {
                            (console.log("tasklock: true (connect)"),
                                (this._taskLock = true),
                                port === GBrowserFontsProvider.DEFAULT_PORT
                                    ? (this._tmpConnection = new WebSocket("wss://127.0.0.1:" + port))
                                    : (this._tmpConnection = new WebSocket("ws://127.0.0.1:" + port)),
                                (this._tmpConnection.onopen = this._onOpen.bind(this)),
                                (this._tmpConnection.onclose = this._onClose.bind(this)),
                                (this._tmpConnection.onerror = this._error.bind(this)),
                                this._timeout ||
                                    (this._timeout = setTimeout(
                                        function () {
                                            this._tmpConnection &&
                                                this._taskLock &&
                                                (this._tmpConnection.close(),
                                                (this._tmpConnection = null),
                                                console.log("tasklock: false"),
                                                (this._taskLock = false),
                                                (this._timeout = null),
                                                console.log("connection time out"),
                                                this._cbFatal());
                                        }.bind(this),
                                        3e4
                                    )));
                        } catch (e) {
                            port === GBrowserFontsProvider.DEFAULT_PORT
                                ? ((this._tlsError = true), setTimeout(this._connect.bind(this), 50, port + 1))
                                : setTimeout(this._connect.bind(this), 2e3, port + 1);
                        }
            }),
            (GBrowserFontsProvider.prototype._onOpen = function () {
                ((this._connection = this._tmpConnection),
                    (this._connection.onmessage = this._onmsg.bind(this)),
                    (this._tmpConnection = null),
                    (this._timeout = null));
                var probeBuffer = new Uint8Array(5);
                (this._setData(probeBuffer, GBrowserFontsProvider.Cmd.probe), this._connection.send(probeBuffer.buffer));
            }),
            (GBrowserFontsProvider.prototype._onClose = function (event) {
                (console.log("socket closing:" + event), (this._connection = null), (this._tmpConnection = null), (this._initialized = false));
            }),
            (GBrowserFontsProvider.prototype._error = function () {
                if ((console.log("tasklock: false (error)"), (this._taskLock = false), this._tmpConnection && !this._connection)) {
                    var urlParts = this._tmpConnection.url.split(":"),
                        port = parseInt(urlParts[urlParts.length - 1]);
                    this._tmpConnection = null;
                    var maxPortSpan = this._firstConnect ? GBrowserFontsProvider.START_PORT_SPAN : GBrowserFontsProvider.PORT_SPAN;
                    if (port > GBrowserFontsProvider.DEFAULT_PORT + maxPortSpan) return void this._cbFatal();
                    setTimeout(this._connect.bind(this), 2e3, port + 1);
                }
            }),
            (GBrowserFontsProvider.prototype._onmsg = function (event) {
                var blob = event.data;
                if (blob instanceof Blob) {
                    var cmdBlob = blob.slice(0, 1),
                        stampBlob = blob.slice(1, 5);
                    blob = blob.slice(5);
                    var commandByte = null,
                        stampBuffer = null,
                        reader = new FileReader();
                    reader.addEventListener(
                        "loadend",
                        function () {
                            var stampMatches = false;
                            if (null === commandByte) ((commandByte = reader.result), (commandByte = (commandByte = new Uint8Array(commandByte))[0]), reader.readAsArrayBuffer(stampBlob));
                            else if (null === stampBuffer) {
                                stampBuffer = reader.result;
                                var stampBytes = new Uint8Array(stampBuffer),
                                    stampView = new Uint32Array(stampBytes.buffer);
                                (stampView[0] !== GBrowserFontsProvider.Cmd.stamp
                                    ? (stampBytes.reverse(),
                                      (stampView = new Uint32Array(stampBytes.buffer))[0] === GBrowserFontsProvider.Cmd.stamp && ((this._doReverse = true), (stampMatches = true)))
                                    : (stampMatches = true),
                                    stampMatches && reader.readAsArrayBuffer(blob));
                            } else this._handleCmd(commandByte, reader.result);
                        }.bind(this)
                    );
                    try {
                        reader.readAsArrayBuffer(cmdBlob);
                    } catch (e) {
                        return;
                    }
                }
            }),
            (GBrowserFontsProvider.prototype._cbFail = function () {
                for (var e = 0; e < this._listCallbacks.length; e++) {
                    var t = this._listCallbacks[e];
                    (this._listCallbacks.shift(),
                        this._fontList && 1 == this._fontList.length && this._fontList[0].special
                            ? t.done(this._fontList, true, null)
                            : t.fail());
                }
                (this._resolveCallback &&
                    ((t = this._resolveCallback),
                    this._isInitialized() || (this._oldUnresolved ? this._oldUnresolved.push(t) : (this._oldUnresolved = [t])),
                    (this._resolveCallback = null),
                    t.fail ? t.fail() : t(true)),
                    (this._taskLock = false));
            }),
            (GBrowserFontsProvider.prototype._cbFatal = function () {
                (gDesigner.getSetting("system_fonts_enabled", true)
                    ? ((this._fontListLength = 1), (this._fontList = [{ family: "", special: true, fonts: [{ weight: 400, style: "N" }] }]))
                    : ((this._fontListLength = 0), (this._fontList = [])),
                    (this._firstConnect = false),
                    this._cbFail());
            }),
            (GBrowserFontsProvider.prototype._cbDone = function (data) {
                var pendingCallback;
                if ((console.log("cb done"), this._listCallbacks))
                    for (var n = 0; n < this._listCallbacks.length; n++)
                        ((pendingCallback = this._listCallbacks[n]),
                            this._listCallbacks.shift(),
                            (this._listCallbacks = null),
                            pendingCallback.done(this._fontList, true, null));
                (this._resolveCallback && ((pendingCallback = this._resolveCallbacks[n]), (this._resolveCallback = null), data ? pendingCallback.done(data) : pendingCallback()),
                    this._oldUnresolved &&
                        (this._oldUnresolved.forEach(function (callback) {
                            data ? callback.done(data) : callback();
                        }),
                        (this._oldUnresolved = null)),
                    (this._taskLock = false));
            }),
            (GBrowserFontsProvider.prototype._handleCmd = function (command, data) {
                try {
                    switch (command) {
                        case GBrowserFontsProvider.Cmd.probe:
                            var probeView;
                            if (this._doReverse) {
                                var reversedBytes = new Uint8Array(data);
                                (reversedBytes.reverse(), (probeView = new Uint32Array(reversedBytes.buffer)));
                            } else probeView = new Uint32Array(data);
                            this._fontListLength = probeView[0];
                            var listRequestBuffer = new Uint8Array(13);
                            (this._setData(listRequestBuffer, GBrowserFontsProvider.Cmd.list), this._connection.send(listRequestBuffer.buffer));
                            break;
                        case GBrowserFontsProvider.Cmd.list:
                            if ((statusByte = (responseBytes = new Uint8Array(data))[0]) == GBrowserFontsProvider.Cmd.success) {
                                responseBytes = responseBytes.slice(3);
                                var jsonString = String.fromCharCode.apply(null, new Uint8Array(responseBytes.buffer)),
                                    fontData = JSON.parse(jsonString),
                                    fontList = [],
                                    familyMap = {};
                                if (fontData.length)
                                    if ("string" == typeof fontData[0] || fontData[0] instanceof String) {
                                        for (var d = 0; d < fontData.length; d++) {
                                            var u = fontData[d].split("_"),
                                                p = (h = u[0]).toLowerCase(),
                                                g = {
                                                    weight: parseInt(u[1]),
                                                    style: 0 == parseInt(u[2]) ? "N" : "I",
                                                    f: h,
                                                };
                                            familyMap[p] ? familyMap[p].push(g) : (familyMap[p] = [g]);
                                        }
                                        for (var h in familyMap) {
                                            g = familyMap[h];
                                            fontList.push({ family: g[0].f, fonts: g });
                                        }
                                    } else
                                        for (d = 0; d < fontData.length; d++) {
                                            for (
                                                var f = fontData[d], m = ((h = f[0]), []), y = { family: h, fonts: m }, v = 1;
                                                v < f.length;
                                                v++
                                            ) {
                                                var _ = f[v].split("_");
                                                m.push({
                                                    weight: parseInt(_[0]),
                                                    style: 0 == parseInt(_[1]) ? "N" : "I",
                                                });
                                            }
                                            fontList.push(y);
                                        }
                                ((this._fontListLength = fontList.length),
                                    (this._fontList = fontList),
                                    (this._initialized = true),
                                    console.log("tasklock: false (cmd list)"),
                                    (this._taskLock = false),
                                    this._cbDone());
                            } else
                                statusByte == GBrowserFontsProvider.Cmd.error
                                    ? (console.log("tasklock: false (cmd list err1)"), (this._taskLock = false), this._cbFail())
                                    : (console.log("tasklock: false (cmd list err2)"), (this._taskLock = false), this._cbFail());
                            break;
                        case GBrowserFontsProvider.Cmd.previews:
                            break;
                        case GBrowserFontsProvider.Cmd.font:
                            var responseBytes, statusByte;
                            (statusByte = (responseBytes = new Uint8Array(data))[0]) == GBrowserFontsProvider.Cmd.success
                                ? ((responseBytes = responseBytes.slice(1)), this._cbDone(responseBytes.buffer))
                                : (statusByte == GBrowserFontsProvider.Cmd.error || console.warn("Error receiving data"), this._cbFail());
                    }
                } catch (e) {
                    console.warn("Error receiving data from server:" + e.message);
                }
            }),
            (GBrowserFontsProvider.prototype._setData = function (buffer, command) {
                var stamp = GBrowserFontsProvider.Cmd.stamp;
                ((buffer[0] = stamp >> 24), (buffer[1] = (stamp >> 16) & 255), (buffer[2] = (stamp >> 8) & 255), (buffer[3] = (stamp >> 0) & 255), (buffer[4] = command));
            }),
            (GBrowserFontsProvider.prototype.hasEnabler = function () {
                return true;
            }),
            (GBrowserFontsProvider.prototype.getEnabler = function () {
                var container = document.createElement("div");
                return (container.appendChild(this._getInstallButton()), container);
            }),
            (GBrowserFontsProvider.prototype.isInitialized = function () {
                return this._isInitialized();
            }),
            (GBrowserFontsProvider.prototype._isInitialized = function () {
                return (
                    !(!this._connection || !this._initialized) &&
                    (0 == this._connection.readyState ||
                        1 == this._connection.readyState ||
                        ((this._connection = null), (this._tmpConnection = null), (this._initialized = false), false))
                );
            }),
            (GBrowserFontsProvider.prototype._getInstallButton = function () {
                if (this._cachedInstallButton) return this._cachedInstallButton;
                "http://127.0.0.1:9000" === GBrowserFontsProvider.HOST &&
                    (GBrowserFontsProvider.HOST =
                        "https://" +
                        (designerConfig.domain.startsWith("corelvector") ? "app-" : "") +
                        gDesigner.getEnv().split(".")[0] +
                        "." +
                        designerConfig.domain);
                var flashObject = document.createElement("object");
                flashObject.data = GBrowserFontsProvider.LAUNCHER_PATH;
                var messageDiv = document.createElement("div");
                ((messageDiv.innerHTML =
                    "<b>To enable system fonts, either:</b><ul style='list-style:initial'><li>enable flash</li><li>download, install and run gravit font server manually: <a name='_SPECIAL_' href='/assets/data/fonts.air?no_redirect=true'>DOWNLOAD LINK</a></li><li>import fonts into browser in the settings panel.</li></ul>"),
                    (messageDiv.style.width = "310px"),
                    (messageDiv.style.textAlign = "left"));
                var flashVarsParam = document.createElement("param");
                return (
                    flashVarsParam.setAttribute("name", "FlashVars"),
                    flashVarsParam.setAttribute("value", "host=" + escape(GBrowserFontsProvider.HOST) + "&appurl=" + escape("/assets/data/fonts.air?no_redirect=true")),
                    flashObject.appendChild(flashVarsParam),
                    (flashVarsParam = document.createElement("param")).setAttribute("name", "wmode"),
                    flashVarsParam.setAttribute("value", "transparent"),
                    flashObject.appendChild(flashVarsParam),
                    (flashObject.type = "application/x-shockwave-flash"),
                    (flashObject.name = "_SPECIAL_"),
                    (flashObject.height = "150"),
                    (flashObject.width = "300"),
                    (this._cachedInstallButton = flashObject),
                    flashObject
                );
            }),
            (GBrowserFontsProvider.prototype.addPreviews = function (fontList) {
                if (fontList.length)
                    if (1 == fontList.length && fontList[0].special) {
                        var self = this;
                        fontList[0].addPreviewCallback = function (renderCallback) {
                            renderCallback(self.getEnabler());
                        };
                    } else {
                        if (!this._isInitialized()) return ((this._previewCallback = this.addPreviews), void this._initialize());
                        for (var n = 0; n < fontList.length; n++)
                            fontList[n].cachedPreview ||
                                (fontList[n].addPreviewCallback = function (renderCallback) {
                                    var container = document.createElement("div");
                                    ((container.innerHTML = this.family), (container.style.fontFamily = this.family), (container.style.fontSize = "13px"), renderCallback(container));
                                });
                    }
            }),
            (GBrowserFontsProvider.prototype._initialize = function () {
                gDesigner.getSetting("system_fonts_enabled", true)
                    ? this._taskLock || (this._tlsError ? this._connect(GBrowserFontsProvider.DEFAULT_PORT + 1) : this._connect(GBrowserFontsProvider.DEFAULT_PORT))
                    : this._cbFatal();
            }),
            (GBrowserFontsProvider.prototype.load = function (familyName, offset, limit, callback) {
                if (!this._isInitialized()) return (this._listCallbacks.push(callback), void this._initialize());
                callback.done(
                    this._fontList
                        .filter(function (font) {
                            return familyName.indexOf("%") >= 0
                                ? font.family.toLowerCase().startsWith(familyName.replace(/%/g, ""))
                                : font.family.toLowerCase() == familyName.toLowerCase();
                        })
                        .slice(offset, offset + limit),
                    true,
                    null
                );
            }),
            (GBrowserFontsProvider.prototype.getTotalFonts = function (searchText) {
                return this._isInitialized()
                    ? searchText
                        ? this._fontList.filter(this._searchFilter(searchText)).length
                        : this._fontListLength
                    : (this._initialize(), 0);
            }),
            (GBrowserFontsProvider.prototype.resolveFont = function (familyName, style, weight, callback) {
                if (!this._isInitialized())
                    return (
                        (this._resolveCallback = function (failed) {
                            failed ? callback.fail() : this.resolveFont(familyName, style, weight, callback);
                        }.bind(this)),
                        void this._initialize()
                    );
                if (!this._taskLock) {
                    var nameLength = familyName.length;
                    this._resolveCallback = callback;
                    var requestBuffer = new Uint8Array(9 + nameLength + 4);
                    (this._setData(requestBuffer, GBrowserFontsProvider.Cmd.font),
                        (requestBuffer[5] = (4278190080 & nameLength) >> 24),
                        (requestBuffer[6] = (16711680 & nameLength) >> 16),
                        (requestBuffer[7] = (65280 & nameLength) >> 8),
                        (requestBuffer[8] = (255 & nameLength) >> 0));
                    for (var s = 9; s < 9 + nameLength; s++) requestBuffer[s] = familyName.charCodeAt(s - 9);
                    var weightValue = parseInt(weight);
                    ((requestBuffer[s] = (65280 & weightValue) >> 8), (requestBuffer[s + 1] = (255 & weightValue) >> 0), (requestBuffer[s + 3] = "N" == style ? 0 : 1), this._connection.send(requestBuffer));
                }
            }),
            (GBrowserFontsProvider.prototype.getProviderId = function () {
                return providerId;
            }),
            (module.exports = GBrowserFontsProvider));
    };
