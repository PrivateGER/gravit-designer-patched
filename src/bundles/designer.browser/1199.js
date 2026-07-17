module.exports = function (module, exports, require) {
        "use strict";
        (require(328 /* polyfill:Array */), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(134 /* polyfill:String */), require(4), require(41), require(13), require(38));
        var GObject = require(1),
            GFontsProvider = require(381);
        const { parseNativeFonts, getLocalFontsData, getFontFamily } = require(1200 /* gFontUtils */);
        function GLocalFontsProvider(providerManager) {
            GFontsProvider.call(this, providerManager);
        }
        GObject.GObject.inherit(GLocalFontsProvider, GFontsProvider);
        var providerId = GObject.GUtil.uuid();
        ((GLocalFontsProvider.VERSION = 1),
            (GLocalFontsProvider.prototype._totalFonts = 0),
            (GLocalFontsProvider.prototype._fontList = []),
            (GLocalFontsProvider.prototype._cachedParsedFonts = {}),
            (GLocalFontsProvider.prototype.addPreviews = function (fonts) {
                if (fonts.length)
                    for (var t = 0; t < fonts.length; t++)
                        fonts[t].cachedPreview ||
                            (fonts[t].addPreviewCallback = function (callback) {
                                var element = document.createElement("div");
                                ((element.innerHTML = this.displayname || this.family),
                                    (element.style.fontFamily = this.family),
                                    (element.style.fontStyle = this.style === GObject.GFont.Style.Italic ? "italic" : "normal"),
                                    (element.style.fontWeight = this.weight),
                                    (element.style.fontSize = "13px"),
                                    (element.style.height = "20px"),
                                    (element.style.textOverflow = "ellipsis"),
                                    (element.style.whiteSpace = "nowrap"),
                                    (element.style.overflow = "hidden"),
                                    (element.style.display = "flex"),
                                    (element.style.alignItems = "center"),
                                    callback(element));
                            });
            }),
            (GLocalFontsProvider.prototype.load = function (query, start, limit, callback) {
                return this._createLocalFontList(query, start, limit, callback);
            }),
            (GLocalFontsProvider.prototype.getTotalFonts = function (query) {
                return query ? this._fontList.filter(this._searchFilter(query)).length : this._totalFonts;
            }),
            (GLocalFontsProvider.prototype.resetProvider = function () {
                this._fontList = [];
            }),
            (GLocalFontsProvider.prototype.resolveFont = function (family, style, weight, callback) {
                ((weight = parseInt(weight) || 400), (style = style || GObject.GFont.Style.Normal));
                const cacheKey = "".concat(family, "_").concat(style, "_").concat(weight);
                return this._cachedParsedFonts[cacheKey]
                    ? callback.done(this._cachedParsedFonts["".concat(family, "_").concat(style, "_").concat(weight)].blob)
                    : this._fontList.length
                      ? this._processResolveFont(family, style, weight, callback)
                      : this._createLocalFontList("%", 0, 9999, {
                            done: () => {
                                this._processResolveFont(family, style, weight, callback);
                            },
                            fail: callback.fail,
                        });
            }),
            (GLocalFontsProvider.prototype._processResolveFont = async function (family, style, weight, callback) {
                const fontFamilyInfo = getFontFamily(family, this._findInFontsList.bind(this));
                if (!fontFamilyInfo) return callback.fail();
                const fonts = fontFamilyInfo.isLocalFont ? await parseNativeFonts(fontFamilyInfo.fonts) : fontFamilyInfo.fonts;
                if (!fonts || !Array.isArray(fonts) || !fonts.length) return callback.fail();
                const matchedFont = fonts.find(function (font) {
                    return (
                        (font.style === style && font.weight === weight && font.family === family) ||
                        (font.style === style && font.weight === weight && font.family.replace(" " + font.subfamily, "") === family)
                    );
                });
                if (matchedFont) {
                    const cacheKey = "".concat(family, "_").concat(style, "_").concat(weight);
                    return (
                        (this._cachedParsedFonts[cacheKey] = matchedFont),
                        void setTimeout(() => {
                            callback.done(matchedFont.blob);
                        }, 10)
                    );
                }
                callback.fail();
            }),
            (GLocalFontsProvider.prototype._createLocalFontList = function (query, start, limit, callback) {
                if (this._fontList && this._fontList.length > 0) return callback.done(this._getFilteredFontsList.call(this, query, start, limit), true, null);
                this._createLocalFontListPromise
                    ? this._createLocalFontListCallbacks.push(callback)
                    : ((this._createLocalFontListCallbacks = [callback]),
                      (this._createLocalFontListPromise = new Promise(async (resolve) => {
                          let fontsData = await getLocalFontsData(),
                              fontFamilies = [];
                          for (var o = 0; o < fontsData.length; o++) {
                              const fontData = fontsData[o],
                                  existingIndex = fontFamilies.findIndex((entry) => {
                                      let { family } = entry;
                                      return family === fontData.family;
                                  });
                              -1 === existingIndex ? fontFamilies.push({ family: fontData.family, fonts: [fontData], isLocalFont: true }) : fontFamilies[existingIndex].fonts.push(fontData);
                          }
                          ((this._fontList = fontFamilies.sort((fontA, fontB) => {
                              let { family: familyA } = fontA,
                                  { family: familyB } = fontB;
                              return familyA - familyB;
                          })),
                              resolve());
                      })),
                      this._createLocalFontListPromise.then(() => {
                          (this._createLocalFontListCallbacks.map((callbackEntry) => {
                              let { done } = callbackEntry;
                              (done(this._getFilteredFontsList.call(this, query, start, limit), true, null),
                                  (this._createLocalFontListPromise = null),
                                  (this._createLocalFontListCallbacks = null));
                          }),
                              (this._createLocalFontListCallbacks = []));
                      }));
            }),
            (GLocalFontsProvider.prototype._getFilteredFontsList = function (query) {
                let start = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    limit = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 9999;
                return this._fontList
                    .filter((font) =>
                        query.indexOf("%") >= 0
                            ? font.family.toLowerCase().startsWith(query.replace(/%/g, ""))
                            : font.family.toLowerCase() === query.toLowerCase()
                    )
                    .slice(start, start + limit);
            }),
            (GLocalFontsProvider.prototype._findInFontsList = function (family) {
                return this._fontList.find(function (font) {
                    let { family: fontFamily } = font;
                    return family === fontFamily;
                });
            }),
            (GLocalFontsProvider.prototype.getProviderId = function () {
                return providerId;
            }),
            (module.exports = GLocalFontsProvider));
    };
