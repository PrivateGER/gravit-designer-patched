module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(8 /* Symbol */));
        var GObject = require(1),
            GFontDBClient = require(1198),
            FontsProviderManager = require(255),
            GImportedFontsProvider = require(1118);
        function FontImporter() {
            try {
                this._fontDB = GFontDBClient.getInstance();
            } catch (e) {
                this._fontDB = null;
            }
        }
        ((FontImporter.prototype.fontDB = null),
            (FontImporter.prototype._numFiles = 0),
            (FontImporter.prototype._tmpFontList = null),
            (FontImporter.prototype._importTrialCount = 0),
            (FontImporter.prototype.import = function (callback) {
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const { silent } = options;
                return !silent && this.busy()
                    ? this._importTrialCount++ > 100
                        ? void callback()
                        : (setTimeout(
                              function () {
                                  this.import(callback);
                              }.bind(this),
                              100
                          ),
                          void this._importTrialCount++)
                    : ((this._importTrialCount = 0), this._prompt(callback, options), true);
            }),
            (FontImporter.prototype._prompt = function (promptCallback, promptOptions) {
                var self = this,
                    storage = gDesigner.getDefaultStorage();
                this._numLoaded = 0;
                var fontListPromise = new Promise((resolve) => {
                    this._fontDB.getItem(GFontDBClient.FONT_LIST).done((fontList) => {
                        ((this._tmpFontList = fontList || []), resolve(this._tmpFontList));
                    });
                });
                storage.openPrompt(
                    [
                        { ext: "ttf", mime: "font/ttf" },
                        { ext: "otf", mime: "font/otf" },
                        { ext: "ttc", mime: "font/collection" },
                        { ext: "dfont", mime: "font/collection" },
                    ],
                    function (file) {
                        let numFiles = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        ((self._numFiles = numFiles),
                            fontListPromise.then(() => {
                                file.read((buffer) => {
                                    var fonts = GObject.GOpenTypeUtil.getFont(null, null, null, buffer, true);
                                    self._numFiles += fonts.length - 1;
                                    var addNext = function (fontArray, index) {
                                            return index < fontArray.length
                                                ? function () {
                                                      this.checkAndAdd(fontArray[index], addNext(fontArray, index + 1));
                                                  }.bind(this)
                                                : promptCallback;
                                        }.bind(self),
                                        next = addNext(fonts, 0);
                                    next && next.call(self);
                                });
                            }));
                    },
                    true,
                    promptOptions
                );
            }),
            (FontImporter.prototype.busy = function () {
                return !this._fontDB || !this._fontDB.ready() || this._numFiles > 0;
            }),
            (FontImporter.prototype.getProgress = function () {
                return 0 === this._numFiles ? 1 : this._numLoaded / this._numFiles;
            }),
            (FontImporter.prototype.ready = function () {
                return this._tmpFontList
                    ? Promise.resolve(void 0)
                    : new Promise((resolve) => {
                          this._fontDB.getItem(GFontDBClient.FONT_LIST).done((fontList) => {
                              ((this._tmpFontList = fontList || []), resolve());
                          });
                      });
            }),
            (FontImporter.prototype.checkAndAdd = function (font, callback) {
                var family = font.family,
                    weight = font.weight,
                    style = font.style,
                    buffer = font.buffer,
                    entry = {
                        style: style,
                        weight: String(weight),
                        family: family,
                        subfamily: font.subfamily,
                        displayname: font.displayname,
                    };
                if (this._tmpFontList)
                    for (var s = 0; s < this._tmpFontList.length; s++) {
                        var l = this._tmpFontList[s];
                        if (l.family === entry.family && l.weight === entry.weight && l.style === entry.style) {
                            if (font.subfamily && !l.subfamily) l.subfamily = font.subfamily;
                            else if (l.subfamily && l.subfamily !== entry.subfamily) {
                                entry.family = entry.family + (entry.subfamily || "");
                                continue;
                            }
                            return (font.displayname && !l.displayname && (l.displayname = font.displayname), void this._postAddAction(callback));
                        }
                    }
                else this._tmpFontList = [];
                (this._tmpFontList.push(entry),
                    this._fontDB.updateItem(family + "_" + weight + "_" + style, buffer).done(() => {
                        this._postAddAction(callback, true);
                    }));
            }),
            (FontImporter.prototype._postAddAction = function (callback, isNewFont) {
                (this._numLoaded++,
                    this._numLoaded === this._numFiles
                        ? ((this._numLoaded = 0),
                          (this._numFiles = 0),
                          this._fontDB.updateItem(GFontDBClient.FONT_LIST, this._tmpFontList).done((n) => {
                              if ((isNewFont ? FontsProviderManager.getInstance().reset(GImportedFontsProvider, true) : FontsProviderManager.getInstance().reset(), gDesigner.getWorkspace()))
                                  for (var o = 0; o < this._tmpFontList.length; o++) {
                                      var i = this._tmpFontList[o];
                                      gDesigner.getWorkspace().getFontManager().getFont(i.family, i.style, parseInt(i.weight));
                                  }
                              callback && callback();
                          }))
                        : callback && callback());
            }),
            (module.exports = FontImporter));
    };
