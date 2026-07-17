module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(4), require(41), require(32), require(33));
        var GObject = require(1),
            GFontsProvider = require(381);
        function GoogleFontsProvider(options) {
            GFontsProvider.call(this, options);
        }
        GObject.GObject.inherit(GoogleFontsProvider, GFontsProvider);
        var providerId = GObject.GUtil.uuid(),
            fontList = [],
            pendingFontLoads = {};
        (GObject.GObject.inherit(GoogleFontsProvider, GFontsProvider),
            (GoogleFontsProvider.prototype._totalFonts = 0),
            (GoogleFontsProvider.prototype._initialized = false),
            (GoogleFontsProvider.prototype._initializing = false),
            (GoogleFontsProvider.prototype._resolveCallbacks = []),
            (GoogleFontsProvider.prototype._loadCallbacks = []),
            (GoogleFontsProvider.prototype._clearCallbacks = function (error) {
                (this._resolveCallbacks.forEach(function (resolveCallback) {
                    resolveCallback(error);
                }),
                    (this._resolveCallbacks = []),
                    this._loadCallbacks.forEach(function (loadCallback) {
                        loadCallback(error);
                    }),
                    (this._loadCallbacks = []));
            }),
            (GoogleFontsProvider.prototype.addPreviews = function (fontEntries, loadImmediately) {
                for (
                    var domParser = new DOMParser(),
                        needsFetch = false,
                        registerPreviewCallback = function (callback, svg) {
                            callback ? ((this.cb = callback), this.svg && callback(this.svg)) : ((this.svg = svg), this.cb && this.cb(svg));
                        },
                        a = 0;
                    a < fontEntries.length;
                    a++
                )
                    fontEntries[a].cachedPreview || fontEntries[a].addPreviewCallback || (fontEntries[a].addPreviewCallback = registerPreviewCallback);
                if (loadImmediately) {
                    fontEntries.length;
                    if (!fontEntries.length) return;
                    var batchIndices = [];
                    for (a = 0; a < fontEntries.length; a++) {
                        for (var l = 0; l < fontList.length; l++)
                            if (fontList[l].family === fontEntries[a].family) {
                                var c = parseInt(l / 10);
                                batchIndices.indexOf(c) < 0 && batchIndices.push(c);
                                break;
                            }
                        if (l === fontList.length) return void console.warn("Error while generating previews: couldn't find font.");
                    }
                    for (a = 0; a < batchIndices.length; a++) {
                        c = batchIndices[a];
                        if ((fontList[10 * c].cachedPreview || (needsFetch = true), needsFetch)) {
                            var d = new XMLHttpRequest(),
                                u = gContainer.getRootPath();
                            (d.open("GET", u + "/assets/data/google_previews/previews" + c + ".json"),
                                (d.num = c),
                                (d.onload = function () {
                                    if (this.status >= 200 && this.status < 300) {
                                        var previewsData;
                                        try {
                                            previewsData = JSON.parse(this.response);
                                        } catch (e) {
                                            return void (
                                                "undefined" != typeof gdb_loaddesign && console.warn("couldn't parse font preview")
                                            );
                                        }
                                        for (var batchFontCount = Math.min(fontList.length, 10 * (this.num + 1)) - 10 * this.num, o = 0; o < batchFontCount; o++) {
                                            var svgElement,
                                                r = fontList[10 * this.num + o];
                                            r.addPreviewCallback || (r.addPreviewCallback = registerPreviewCallback);
                                            try {
                                                (svgElement = domParser.parseFromString(previewsData[o], "image/svg+xml").firstChild) &&
                                                    svgElement.getAttribute("xmlns") &&
                                                    (svgElement.setAttribute("height", "20px"), r.addPreviewCallback(null, svgElement));
                                            } catch (e) {
                                                "undefined" != typeof gdb_loaddesign && console.warn("error parsing svg");
                                            }
                                        }
                                    }
                                }),
                                d.send());
                        }
                    }
                }
            }),
            (GoogleFontsProvider.prototype.initialize = function () {
                this._initialized || this._initializing || this._load.apply(this, arguments);
            }),
            (GoogleFontsProvider.prototype._load = function () {
                this._initializing = true;
                var args = Array.prototype.slice.call(arguments),
                    rootPath = gContainer.getRootPath(),
                    xhr = new XMLHttpRequest(),
                    cacheBuster = gDesigner ? gDesigner.getVersion() : ~~(1e4 * Math.random());
                (xhr.open("GET", rootPath + "/assets/data/googlefonts.json?" + cacheBuster),
                    (xhr.onload = function () {
                        xhr.status >= 200 && xhr.status < 300
                            ? ((this._initialized = true),
                              (this._initializing = false),
                              (fontList = JSON.parse(xhr.response)),
                              (this._totalFonts = fontList.length),
                              args.length,
                              this._clearCallbacks())
                            : xhr.status >= 400 && ((this._initialized = true), (this._initializing = false), this._clearCallbacks(true));
                    }.bind(this)),
                    (xhr.onerror = function () {
                        ((this._initialized = true), (this._initializing = false), this._clearCallbacks(GFontsProvider.Errors.ConnectionError));
                    }.bind(this)),
                    xhr.send());
            }),
            (GoogleFontsProvider.prototype.load = function (filter, offset, count, callback) {
                if (!this._initialized && !this._initializing)
                    return (
                        this._loadCallbacks.push(
                            function (error) {
                                error ? callback.fail(error) : this.load(filter, offset, count, callback);
                            }.bind(this)
                        ),
                        void this.initialize(this.load, filter, offset, count, callback)
                    );
                this._initializing
                    ? this._loadCallbacks.push(
                          function (error) {
                              error ? callback.fail(error) : this.load(filter, offset, count, callback);
                          }.bind(this)
                      )
                    : callback.done(fontList.filter(this._searchFilter(filter)).slice(offset, offset + count), true, null);
            }),
            (GoogleFontsProvider.prototype.getTotalFonts = function (filter) {
                return filter ? fontList.filter(this._searchFilter(filter)).length : this._totalFonts;
            }),
            (GoogleFontsProvider.prototype.resolveFont = function (family, style, weight, callback) {
                if (!this._initialized && !this._initializing)
                    return (
                        this._loadCallbacks.push(
                            function (error) {
                                error ? callback.fail(error) : this.resolveFont(family, style, weight, callback);
                            }.bind(this)
                        ),
                        void this.initialize(this.resolveFont, family, style, weight, callback)
                    );
                if (this._initializing)
                    this._resolveCallbacks.push(
                        function (error) {
                            error ? callback.fail(error) : this.resolveFont(family, style, weight, callback);
                        }.bind(this)
                    );
                else {
                    for (var r = 0; r < fontList.length; r++) {
                        var c = fontList[r];
                        if (c.family === family)
                            for (var d = c.fonts, u = 0; u < d.length; u++) {
                                var p = d[u];
                                if (p.weight === (weight || 400) && p.style === (style || GObject.GFont.Style.Normal)) {
                                    if (pendingFontLoads[p.url]) pendingFontLoads[p.url].push(callback);
                                    else {
                                        var g = new XMLHttpRequest();
                                        ((g.responseType = "arraybuffer"),
                                            g.open("GET", p.url),
                                            (pendingFontLoads[p.url] = []),
                                            pendingFontLoads[p.url].push(callback),
                                            (g.onload = function () {
                                                if (this.status >= 200 && this.status < 300) {
                                                    var pendingCallbacks = pendingFontLoads[p.url];
                                                    (delete pendingFontLoads[p.url],
                                                        pendingCallbacks.forEach((pendingCallback) => {
                                                            pendingCallback.done(this.response);
                                                        }));
                                                }
                                            }),
                                            (g.onerror = () => {
                                                (delete pendingFontLoads[p.url], callback.fail(GFontsProvider.Errors.ConnectionError));
                                            }),
                                            g.send());
                                    }
                                    return;
                                }
                            }
                    }
                    callback.fail();
                }
            }),
            (GoogleFontsProvider.prototype.getProviderId = function () {
                return providerId;
            }),
            (GoogleFontsProvider.prototype.resetProvider = function () {
                this._load();
            }),
            (module.exports = GoogleFontsProvider));
    };
