module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(34), require(134 /* polyfill:String */), require(4), require(41), require(13), require(32), require(33));
        var GObject = require(1),
            notoScriptFonts = require(1075),
            GFontsProvider = require(381);
        function DefaultFontsProvider(providerManager) {
            GFontsProvider.call(this, providerManager);
        }
        GObject.GObject.inherit(DefaultFontsProvider, GFontsProvider);
        var providerId = GObject.GUtil.uuid(),
            pendingFontLoads = {},
            loadedFontFamilies = null,
            fontFamilies = [
                {
                    family: "Open Sans",
                    fonts: [
                        {
                            weight: GObject.GFont.Weight.Light,
                            style: GObject.GFont.Style.Normal,
                            url: "assets/font/OpenSans-Light.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.Light,
                            style: GObject.GFont.Style.Italic,
                            url: "assets/font/OpenSans-LightItalic.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.Regular,
                            style: GObject.GFont.Style.Normal,
                            url: "assets/font/OpenSans-Regular.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.Regular,
                            style: GObject.GFont.Style.Italic,
                            url: "assets/font/OpenSans-Italic.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.SemiBold,
                            style: GObject.GFont.Style.Normal,
                            url: "assets/font/OpenSans-SemiBold.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.SemiBold,
                            style: GObject.GFont.Style.Italic,
                            url: "assets/font/OpenSans-SemiBoldItalic.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.Bold,
                            style: GObject.GFont.Style.Normal,
                            url: "assets/font/OpenSans-Bold.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.Bold,
                            style: GObject.GFont.Style.Italic,
                            url: "assets/font/OpenSans-BoldItalic.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.ExtraBold,
                            style: GObject.GFont.Style.Normal,
                            url: "assets/font/OpenSans-ExtraBold.ttf",
                        },
                        {
                            weight: GObject.GFont.Weight.ExtraBold,
                            style: GObject.GFont.Style.Italic,
                            url: "assets/font/OpenSans-ExtraBoldItalic.ttf",
                        },
                    ],
                    preview: "assets/font/OpenSans.svg",
                    scripts: ["LATIN"],
                },
            ];
        (fontFamilies.push({
            family: "Noto Sans CJK SC",
            fonts: [
                {
                    weight: GObject.GFont.Weight.Regular,
                    style: GObject.GFont.Style.Normal,
                    url: "assets/font/chinese-simplified/NotoSansCJKsc-Regular.otf",
                },
                {
                    weight: GObject.GFont.Weight.Bold,
                    style: GObject.GFont.Style.Normal,
                    url: "assets/font/chinese-simplified/NotoSansCJKsc-Bold.otf",
                },
            ],
            preview: "assets/font/chinese-simplified/NotoSans.svg",
            scripts: ["HAN"],
        }),
            fontFamilies.push({
                family: "Noto Sans CJK TC",
                fonts: [
                    {
                        weight: GObject.GFont.Weight.Regular,
                        style: GObject.GFont.Style.Normal,
                        url: "assets/font/chinese-traditional/NotoSansCJKtc-Regular.otf",
                    },
                    {
                        weight: GObject.GFont.Weight.Bold,
                        style: GObject.GFont.Style.Normal,
                        url: "assets/font/chinese-traditional/NotoSansCJKtc-Bold.otf",
                    },
                ],
                preview: "assets/font/chinese-traditional/NotoSans.svg",
                scripts: ["HAN"],
            }),
            (fontFamilies = fontFamilies.concat(notoScriptFonts)),
            GObject.GObject.inherit(DefaultFontsProvider, GFontsProvider),
            (DefaultFontsProvider.prototype.getDefaultFamilyForString = function (text) {
                var script = GObject.GOpenTypeFont.getScriptForString(text);
                if ("CYRILLIC" === script || "GREEK" === script) return "Noto Sans";
                var matchedFamily = fontFamilies.find((family) => family.scripts && family.scripts.indexOf(script) >= 0);
                return (matchedFamily && matchedFamily.family) || null;
            }),
            (DefaultFontsProvider.prototype.addPreviews = function (fontEntries) {
                for (var domParser = new DOMParser(), n = 0; n < fontEntries.length; n++)
                    fontEntries[n].cachedPreview ||
                        (fontEntries[n].addPreviewCallback = function (onPreviewReady) {
                            var request = new XMLHttpRequest();
                            (request.open("GET", this.preview),
                                (request.onload = function () {
                                    var node;
                                    if (this.status >= 200 && this.status < 300)
                                        try {
                                            (node = domParser.parseFromString(this.response, "image/svg+xml").firstChild) &&
                                                node.getAttribute("xmlns") &&
                                                (node.setAttribute("height", "20px"), onPreviewReady(node));
                                        } catch (e) {
                                            "undefined" != typeof gdb_loaddesign && console.warn("Couldn't parse default preview");
                                        }
                                }),
                                request.send());
                        });
            }),
            (DefaultFontsProvider.prototype.init = function () {
                loadedFontFamilies || (loadedFontFamilies = fontFamilies);
            }),
            (DefaultFontsProvider.prototype.load = function (familyName, offset, limit, deferred) {
                (this.init(),
                    deferred.done(
                        loadedFontFamilies
                            .filter(function (familyEntry) {
                                return familyName.indexOf("%") >= 0
                                    ? familyEntry.family.toLowerCase().startsWith(familyName.replace(/%/g, ""))
                                    : familyEntry.family.toLowerCase() == familyName.toLowerCase();
                            })
                            .slice(offset, offset + limit),
                        true,
                        null
                    ));
            }),
            (DefaultFontsProvider.prototype.getTotalFonts = function (filterText) {
                return (this.init(), filterText ? loadedFontFamilies.filter(this._searchFilter(filterText)).length : loadedFontFamilies.length);
            }),
            (DefaultFontsProvider.prototype.hasFont = function (familyName) {
                var found = false;
                if (fontFamilies)
                    for (var n = 0; n < fontFamilies.length; ++n)
                        if (fontFamilies[n].family === familyName) {
                            found = true;
                            break;
                        }
                return found;
            }),
            (DefaultFontsProvider.prototype.resolveFont = function (family, style, weight, deferred) {
                this.init();
                for (var r = 0; r < loadedFontFamilies.length; r++) {
                    var s = loadedFontFamilies[r];
                    if (s.family === family)
                        for (var d = s.fonts, u = 0; u < d.length; u++) {
                            var p = d[u];
                            if (p.weight === (weight || 400) && p.style === (style || GObject.GFont.Style.Normal)) {
                                if (pendingFontLoads[p.url]) pendingFontLoads[p.url].push(deferred);
                                else {
                                    var g = new XMLHttpRequest();
                                    ((g.responseType = "arraybuffer"),
                                        g.open("GET", p.url),
                                        (pendingFontLoads[p.url] = []),
                                        pendingFontLoads[p.url].push(deferred),
                                        (g.onload = function () {
                                            if (this.status >= 200 && this.status < 300) {
                                                var callbacks = pendingFontLoads[p.url];
                                                (delete pendingFontLoads[p.url],
                                                    callbacks.forEach((callback) => {
                                                        callback.done(this.response);
                                                    }));
                                            }
                                        }),
                                        (g.onerror = () => {
                                            (delete pendingFontLoads[p.url], deferred.fail(GFontsProvider.Errors.ConnectionError));
                                        }),
                                        g.send());
                                }
                                return;
                            }
                        }
                }
                deferred.fail();
            }),
            (DefaultFontsProvider.prototype.getProviderId = function () {
                return providerId;
            }),
            (module.exports = DefaultFontsProvider));
    };
