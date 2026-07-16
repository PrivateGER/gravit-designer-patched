module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(557), require(26));
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(271 /* polyfill:String */));
        var i = (function (e, t) {
                if ("function" == typeof WeakMap)
                    var n = new WeakMap(),
                        o = new WeakMap();
                return (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    var i,
                        a,
                        r = { __proto__: null, default: e };
                    if (null === e || ("object" != typeof e && "function" != typeof e)) return r;
                    if ((i = t ? o : n)) {
                        if (i.has(e)) return i.get(e);
                        i.set(e, r);
                    }
                    for (const t in e)
                        "default" !== t &&
                            {}.hasOwnProperty.call(e, t) &&
                            ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (a.get || a.set)
                                ? i(r, t, a)
                                : (r[t] = e[t]));
                    return r;
                })(e, t);
            })(require(10 /* designerConfig */)),
            a = _interopRequireDefault(require(389 /* GDocument */)),
            GObject = require(1);
        const s = require(78),
            l = require(441),
            {
                PRODUCT_NAME,
                PRODUCT_APP_NAME,
                PRODUCT_BUILD_NUMBER,
                PRODUCT_LANGUAGE,
                PRODUCT_ENVIRONMENT,
            } = i.AmplitudeData.UserProperties;
        module.exports = class {
            constructor(e) {
                (gDesigner.addEventListener(s, this._handleDocumentEvent, this),
                    gDesigner.addEventListener(l, this._handleLicenseChangedEvent, this),
                    (this._amplitudeHelper = e),
                    this._updateUserProperties());
            }
            _updateUserProperties() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : gDesigner.getLicense();
                this._amplitudeHelper.updateUserProperties(
                    {
                        [PRODUCT_NAME]: i.default.DESIGNER.TITLE,
                        [PRODUCT_APP_NAME]: i.default.DESIGNER.TITLE,
                        [PRODUCT_BUILD_NUMBER]: gDesigner.getVersion(),
                        [PRODUCT_LANGUAGE]: GObject.GLocale.lookupLocale(GObject.GLocale.getLanguage()).toUpperCase(),
                        [PRODUCT_ENVIRONMENT]: "production",
                    },
                    e
                );
            }
            _handleLicenseChangedEvent(e) {
                this._updateUserProperties(e.license);
            }
            async _handleDocumentEvent(e) {
                switch (e.type) {
                    case s.Type.Opened:
                        this._amplitudeHelper.logEvent(i.AmplitudeData.Events.DOCUMENT_OPENED, {
                            DOCUMENT_FILE_FORMAT: this._getDocumentOpenedFileFormat(e).toLowerCase(),
                            DOCUMENT_SOURCE: this._getSource(e.document),
                            DOCUMENT_RECENT: gContainer.isRecentDocument(e.document._storageItem),
                        });
                        break;
                    case s.Type.Saving:
                        const { referer } = e.data;
                        this._isSimplifiedExporting(referer) ? this._documentExported(e) : this._documentSaved(e);
                }
            }
            _documentExported(e) {
                this._amplitudeHelper.logEvent(i.AmplitudeData.Events.DOCUMENT_EXPORTED, {
                    DOCUMENT_EXPORT_TYPE: i.AmplitudeData.ExportTypes.Simple,
                    DOCUMENT_FILE_FORMAT: e.data.ext,
                });
            }
            _documentSaved(e) {
                this._amplitudeHelper.logEvent(i.AmplitudeData.Events.DOCUMENT_SAVED, {
                    DOCUMENT_FILE_FORMAT: this._getDocumentSavedFileFormat(e).toLowerCase(),
                    DOCUMENT_DESTINATION: this._getSource(e.document),
                });
            }
            _isSimplifiedExporting(e) {
                return !!e && !e.endsWith(a.default.GVDESIGN.ext);
            }
            _getDocumentOpenedFileFormat(e) {
                return e.document.fileExtension || e.document.getExtension();
            }
            _getDocumentSavedFileFormat(e) {
                return e.data.ext || e.document.getExtension();
            }
            _getSource(e) {
                return e.isCloudFile() ? "cloud" : "local";
            }
        };
    };
