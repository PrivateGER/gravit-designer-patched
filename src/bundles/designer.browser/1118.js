module.exports = function (module, exports, require) {
        "use strict";
        (require(180), require(181 /* polyfill:ArrayBuffer */), require(57), require(20 /* polyfill:RegExp */), require(34), require(134 /* polyfill:String */), require(4), require(41), require(32), require(38), require(33));
        var GObject = require(1),
            GFontsProvider = require(381),
            fontsProviderManager = require(255 /* FontsProviderManager */),
            fontStorage = require(1198 /* GFontDBClient */),
            GSystemDialog = require(44);
        function GImportedFontsProvider(providerManager) {
            GFontsProvider.call(this, providerManager);
        }
        GObject.GObject.inherit(GImportedFontsProvider, GFontsProvider);
        var providerId = GObject.GUtil.uuid();
        ((GImportedFontsProvider.prototype._totalFonts = 0),
            (GImportedFontsProvider.prototype._fontList = null),
            (GImportedFontsProvider.prototype._formattedFontList = null),
            (GImportedFontsProvider.prototype._initialized = false),
            (GImportedFontsProvider.prototype._initializing = false),
            (GImportedFontsProvider.prototype._queue = null),
            (GImportedFontsProvider.prototype.addPreviews = function (fonts) {
                for (var t = 0; t < fonts.length; t++) {
                    var n = document.createElement("image");
                    fonts[t].preview = n;
                }
                if (fonts.length) {
                    var self = this;
                    for (t = 0; t < fonts.length; t++)
                        fonts[t].cachedPreview ||
                            (fonts[t].addPreviewCallback = function (callback, t) {
                                var previewContainer = $("<div></div>").addClass("preview-container"),
                                    fontNameLabel = document.createElement("div");
                                ((fontNameLabel.innerHTML = this.displayname || this.family),
                                    (fontNameLabel.style.fontFamily = this.family),
                                    (fontNameLabel.style.fontSize = gDesigner.isTouchEnabled() ? "20px" : "13px"),
                                    (fontNameLabel.style.height = gDesigner.isTouchEnabled() ? "30px" : "20px"),
                                    $(fontNameLabel).appendTo(previewContainer));
                                var c,
                                    deleteButton = $("<span></span>")
                                        .addClass("gravit-icon-trash g-font-delete")
                                        .attr("name", "_SPECIAL_")
                                        .appendTo(previewContainer)[0];
                                (fontNameLabel.addEventListener("mouseover", function (event) {
                                    (event.stopPropagation(), event.preventDefault());
                                }),
                                    deleteButton.addEventListener("mouseup", (event) => {
                                        (event.stopPropagation(), event.preventDefault());
                                        var providerManagerInstance = fontsProviderManager.getInstance(),
                                            deleteNextFont = (storage, fontIndex) => {
                                                var fontVariants = this.fonts;
                                                if (fontIndex >= fontVariants.length) {
                                                    var familyIndex = self._formattedFontList.findIndex((entry) => entry.family === this.family);
                                                    if (-1 === familyIndex) return;
                                                    (self._formattedFontList.splice(familyIndex, 1),
                                                        (self._fontList = []),
                                                        self._formattedFontList.forEach(function (group) {
                                                            group.fonts.forEach(function (variant) {
                                                                self._fontList.push({
                                                                    family: variant.family,
                                                                    weight: String(variant.weight),
                                                                    style: variant.style,
                                                                    subfamily: variant.subfamily,
                                                                    displayname: variant.displayname,
                                                                });
                                                            });
                                                        }),
                                                        self._totalFonts--,
                                                        storage
                                                            .updateItem(
                                                                fontStorage.FONT_LIST,
                                                                self._fontList.map(function (font) {
                                                                    return {
                                                                        family: font.family,
                                                                        weight: font.weight,
                                                                        style: font.style,
                                                                        subfamily: font.subfamily,
                                                                        displayname: font.displayname,
                                                                    };
                                                                })
                                                            )
                                                            .done((e) => {
                                                                for (var fallbackMap = {}, i = 0; i < this.families.length; i++)
                                                                    fallbackMap[this.families[i]] = "Open Sans";
                                                                if (
                                                                    (gDesigner.getDocuments().forEach((gravitDocument) => {
                                                                        gravitDocument.getScene().acceptChildren((node) => {
                                                                            node instanceof GObject.GText && node.replaceFonts(fallbackMap, true);
                                                                        });
                                                                    }),
                                                                    gDesigner.getWorkspace())
                                                                )
                                                                    for (i = 0; i < this.families.length; i++)
                                                                        gDesigner
                                                                            .getWorkspace()
                                                                            .getFontManager()
                                                                            .removeFont(this.families[i]);
                                                                (fontsProviderManager.getInstance().reset(),
                                                                    providerManagerInstance && providerManagerInstance.setShowMissingFontsDialog(true),
                                                                    console.log("successfully updated font list"),
                                                                    this._queue && this._queue.length && this._queue.shift().call(this));
                                                            }));
                                                } else {
                                                    var fontVariant = fontVariants[fontIndex],
                                                        variantKey = fontVariant.family + "_" + fontVariant.weight + "_" + fontVariant.style;
                                                    storage.deleteItem(variantKey).done(() => {
                                                        deleteNextFont(storage, fontIndex + 1);
                                                    });
                                                }
                                            };
                                        GSystemDialog.confirm(GObject.GLocale.get(new GObject.GLocaleKey("GImportedFontsProvider", "confirm.delete-font")), (confirmed) => {
                                            confirmed &&
                                                (this._queue || (this._queue = []),
                                                this._queue.push(() => {
                                                    fontStorage.getInstance((storage) => {
                                                        storage && (providerManagerInstance && providerManagerInstance.setShowMissingFontsDialog(false), deleteNextFont(storage, 0));
                                                    });
                                                }),
                                                1 === this._queue.length && this._queue.shift().call(this));
                                        });
                                    }));
                                var matchedEntry = null;
                                for (c = 0; c < self._formattedFontList.length; c++)
                                    if (self._formattedFontList[c].family === this.family) {
                                        matchedEntry = self._formattedFontList[c];
                                        break;
                                    }
                                (matchedEntry
                                    ? fontStorage.getInstance((storage) => {
                                          if (storage) {
                                              var primaryVariant = this.fonts[0];
                                              if (primaryVariant) {
                                                  var variantKey = primaryVariant.family + "_" + primaryVariant.weight + "_" + primaryVariant.style;
                                                  storage.getItem(variantKey).done((fontData) => {
                                                      var fileReader = new FileReader();
                                                      ((fileReader.onload = () => {
                                                          var styleElement = document.createElement("style");
                                                          (styleElement.appendChild(
                                                              document.createTextNode(
                                                                  "@font-face {font-family:" +
                                                                      primaryVariant.family +
                                                                      ";font-style:" +
                                                                      ("N" !== primaryVariant.style ? "italic" : "normal") +
                                                                      ";font-weight:" +
                                                                      primaryVariant.weight +
                                                                      ';src: url("' +
                                                                      fileReader.result +
                                                                      '") format("truetype");}'
                                                              )
                                                          ),
                                                              document.head.appendChild(styleElement));
                                                      }),
                                                          fileReader.readAsDataURL(
                                                              new Blob([fontData], {
                                                                  type: "application/x-font-ttf",
                                                              })
                                                          ));
                                                  });
                                              }
                                          }
                                      })
                                    : (fontNameLabel.innerHTML = "[Unavailable]"),
                                    callback(previewContainer));
                            });
                }
            }),
            (GImportedFontsProvider.prototype.initialize = function () {
                if (!this._initialized && !this._initializing) {
                    this._initializing = true;
                    var extraArgs = Array.prototype.slice.call(arguments);
                    this.load(
                        "%",
                        0,
                        1,
                        {
                            done: function (t, n, o) {
                                ((this._initialized = true),
                                    (this._initializing = false),
                                    extraArgs.length && extraArgs[0].apply(this, extraArgs.slice(1)),
                                    this._clearCallbacks());
                            }.bind(this),
                            fail: function () {
                                ((this._initializing = false), (this._initialized = true), this._clearCallbacks(true));
                            }.bind(this),
                        },
                        true
                    );
                }
            }),
            (GImportedFontsProvider.prototype.load = function (query, offset, count, callback, force) {
                if (!this._initialized && !this._initializing)
                    return (
                        this._loadCallbacks.push(
                            function (failed) {
                                failed ? callback.fail() : this.load(query, offset, count, callback);
                            }.bind(this)
                        ),
                        void this.initialize(this.load, query, offset, count, callback)
                    );
                !this._initializing || force
                    ? this._fontList
                        ? callback.done(
                              this._formattedFontList
                                  .filter((entry) =>
                                      query.indexOf("%") >= 0
                                          ? (entry.displayname || entry.family).toLowerCase().startsWith(query.replace(/%/g, ""))
                                          : (entry.displayname || entry.family).toLowerCase() == query.toLowerCase()
                                  )
                                  .slice(offset, offset + count),
                              true,
                              null
                          )
                        : fontStorage.getInstance((storage) => {
                              if (!storage) return callback.fail();
                              storage.getItem(fontStorage.FONT_LIST).done((fontListData) => {
                                  ((this._fontList = fontListData || []),
                                      this._generateFormattedList(),
                                      (this._totalFonts = this._formattedFontList ? this._formattedFontList.length : 0),
                                      callback.done(
                                          this._formattedFontList
                                              .filter((entry) =>
                                                  query.indexOf("%") >= 0
                                                      ? (entry.displayname || entry.family).toLowerCase().startsWith(query.replace(/%/g, ""))
                                                      : (entry.displayname || entry.family).toLowerCase() == query.toLowerCase()
                                              )
                                              .slice(offset, offset + count),
                                          true,
                                          null
                                      ),
                                      this._clearCallbacks());
                              });
                          })
                    : this._loadCallbacks.push(
                          function (failed) {
                              failed ? callback.fail() : this.load(query, offset, count, callback);
                          }.bind(this)
                      );
            }),
            (GImportedFontsProvider.prototype._generateFormattedList = function () {
                if (this._fontList) {
                    this._formattedFontList = [];
                    for (var remainingFonts = this._fontList.slice(), t = 0; t < remainingFonts.length; t++) {
                        var n = remainingFonts[t],
                            o = n.displayname || n.family,
                            i = [
                                {
                                    weight: parseInt(n.weight),
                                    style: n.style,
                                    family: n.family,
                                    subfamily: n.subfamily || null,
                                    displayname: n.displayname || null,
                                },
                            ],
                            a = [n.family];
                        this._formattedFontList.push({
                            family: null,
                            displayname: o,
                            fonts: i,
                            families: a,
                        });
                        for (var r = remainingFonts.length - 1; r > t; r--)
                            o === (remainingFonts[r].displayname || remainingFonts[r].family) &&
                                (a.indexOf(remainingFonts[r].family) < 0 && a.push(remainingFonts[r].family),
                                i.push({
                                    weight: parseInt(remainingFonts[r].weight),
                                    style: remainingFonts[r].style,
                                    family: remainingFonts[r].family,
                                    subfamily: remainingFonts[r].subfamily || null,
                                    displayname: remainingFonts[r].displayname || null,
                                }),
                                remainingFonts.splice(r, 1));
                        var s = 0,
                            l = a[0].length;
                        if (l > 0)
                            for (r = 1; r < a.length; r++) {
                                if (a[r].toLowerCase().indexOf("regular") >= 0) {
                                    ((l = 0), (s = r));
                                    break;
                                }
                                l > a[r].length && ((l = a[r].length), (s = r));
                            }
                        this._formattedFontList[this._formattedFontList.length - 1].family = a[s];
                    }
                } else this._formattedFontList = null;
            }),
            (GImportedFontsProvider.prototype._resolveCallbacks = []),
            (GImportedFontsProvider.prototype._loadCallbacks = []),
            (GImportedFontsProvider.prototype._clearCallbacks = function (failed) {
                (this._resolveCallbacks.forEach(function (callback) {
                    callback(!!failed);
                }),
                    (this._resolveCallbacks = []),
                    this._loadCallbacks.forEach(function (callback) {
                        callback();
                    }),
                    (this._loadCallbacks = []));
            }),
            (GImportedFontsProvider.prototype.getTotalFonts = function (query) {
                return query ? this._formattedFontList.filter(this._searchFilter(query)).length : this._totalFonts;
            }),
            (GImportedFontsProvider.prototype.resetProvider = function () {
                ((this._fontList = null), (this._formattedFontList = null));
            }),
            (GImportedFontsProvider.prototype.resolveFont = function (family, style, weight, callback) {
                if (!this._initialized && !this._initializing)
                    return (
                        this._resolveCallbacks.push(
                            function (failed) {
                                failed ? callback.fail() : this.resolveFont(family, style, weight, callback);
                            }.bind(this)
                        ),
                        void this.initialize(this.resolveFont, family, style, weight, callback)
                    );
                if (this._initializing)
                    this._resolveCallbacks.push(
                        function (failed) {
                            failed ? callback.fail() : this.resolveFont(family, style, weight, callback);
                        }.bind(this)
                    );
                else {
                    ((weight = String(weight) || "400"), (style = style || GObject.GFont.Style.Normal));
                    var fontKey = family + "_" + weight + "_" + style;
                    fontStorage.getInstance((storage) => {
                        if (!storage) return callback.fail();
                        storage.getItem(fontKey).done((fontData) => {
                            if (fontData) callback.done(fontData instanceof DataView || fontData instanceof ArrayBuffer ? fontData : fontData.buffer);
                            else {
                                if (!this._fontList) return (console.warn("NO FONTLIST"), void callback.fail());
                                var matchIndex = this._fontList.findIndex(function (entry) {
                                    return !(entry.family !== family || entry.style !== style || !entry.subfamily || entry.displayname === entry.family);
                                });
                                matchIndex >= 0
                                    ? ((weight = this._fontList[matchIndex].weight || "400"),
                                      (fontKey = family + "_" + weight + "_" + style),
                                      storage.getItem(fontKey).done((fontData) => {
                                          fontData ? callback.done(fontData instanceof DataView || fontData instanceof ArrayBuffer ? fontData : fontData.buffer) : callback.fail();
                                      }))
                                    : callback.fail();
                            }
                        });
                    });
                }
            }),
            (GImportedFontsProvider.prototype.getProviderId = function () {
                return providerId;
            }),
            (module.exports = GImportedFontsProvider));
    };
