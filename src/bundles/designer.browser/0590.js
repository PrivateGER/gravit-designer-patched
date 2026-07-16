module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(34), require(134 /* polyfill:String */), require(4), require(41), require(13), require(32), require(33));
        var GObject = require(1),
            i = require(1075),
            a = require(381);
        function r(e) {
            a.call(this, e);
        }
        GObject.GObject.inherit(r, a);
        var s = GObject.GUtil.uuid(),
            l = {},
            c = null,
            d = [
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
        (d.push({
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
            d.push({
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
            (d = d.concat(i)),
            GObject.GObject.inherit(r, a),
            (r.prototype.getDefaultFamilyForString = function (e) {
                var t = GObject.GOpenTypeFont.getScriptForString(e);
                if ("CYRILLIC" === t || "GREEK" === t) return "Noto Sans";
                var n = d.find((e) => e.scripts && e.scripts.indexOf(t) >= 0);
                return (n && n.family) || null;
            }),
            (r.prototype.addPreviews = function (e) {
                for (var t = new DOMParser(), n = 0; n < e.length; n++)
                    e[n].cachedPreview ||
                        (e[n].addPreviewCallback = function (e) {
                            var n = new XMLHttpRequest();
                            (n.open("GET", this.preview),
                                (n.onload = function () {
                                    var n;
                                    if (this.status >= 200 && this.status < 300)
                                        try {
                                            (n = t.parseFromString(this.response, "image/svg+xml").firstChild) &&
                                                n.getAttribute("xmlns") &&
                                                (n.setAttribute("height", "20px"), e(n));
                                        } catch (e) {
                                            "undefined" != typeof gdb_loaddesign && console.warn("Couldn't parse default preview");
                                        }
                                }),
                                n.send());
                        });
            }),
            (r.prototype.init = function () {
                c || (c = d);
            }),
            (r.prototype.load = function (e, t, n, o) {
                (this.init(),
                    o.done(
                        c
                            .filter(function (t) {
                                return e.indexOf("%") >= 0
                                    ? t.family.toLowerCase().startsWith(e.replace(/%/g, ""))
                                    : t.family.toLowerCase() == e.toLowerCase();
                            })
                            .slice(t, t + n),
                        true,
                        null
                    ));
            }),
            (r.prototype.getTotalFonts = function (e) {
                return (this.init(), e ? c.filter(this._searchFilter(e)).length : c.length);
            }),
            (r.prototype.hasFont = function (e) {
                var t = false;
                if (d)
                    for (var n = 0; n < d.length; ++n)
                        if (d[n].family === e) {
                            t = true;
                            break;
                        }
                return t;
            }),
            (r.prototype.resolveFont = function (e, t, n, i) {
                this.init();
                for (var r = 0; r < c.length; r++) {
                    var s = c[r];
                    if (s.family === e)
                        for (var d = s.fonts, u = 0; u < d.length; u++) {
                            var p = d[u];
                            if (p.weight === (n || 400) && p.style === (t || GObject.GFont.Style.Normal)) {
                                if (l[p.url]) l[p.url].push(i);
                                else {
                                    var g = new XMLHttpRequest();
                                    ((g.responseType = "arraybuffer"),
                                        g.open("GET", p.url),
                                        (l[p.url] = []),
                                        l[p.url].push(i),
                                        (g.onload = function () {
                                            if (this.status >= 200 && this.status < 300) {
                                                var e = l[p.url];
                                                (delete l[p.url],
                                                    e.forEach((e) => {
                                                        e.done(this.response);
                                                    }));
                                            }
                                        }),
                                        (g.onerror = () => {
                                            (delete l[p.url], i.fail(a.Errors.ConnectionError));
                                        }),
                                        g.send());
                                }
                                return;
                            }
                        }
                }
                i.fail();
            }),
            (r.prototype.getProviderId = function () {
                return s;
            }),
            (module.exports = r));
    };
