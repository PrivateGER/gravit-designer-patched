module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(557), require(26));
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(271 /* polyfill:String */));
        var designerConfig = (function (e, t) {
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
            GFileTypes = _interopRequireDefault(require(389 /* GFileTypes */)),
            GObject = require(1);
        const GDocumentEvent = require(78),
            GLicenseChangedEvent = require(441),
            {
                PRODUCT_NAME,
                PRODUCT_APP_NAME,
                PRODUCT_BUILD_NUMBER,
                PRODUCT_LANGUAGE,
                PRODUCT_ENVIRONMENT,
            } = designerConfig.AmplitudeData.UserProperties;
        module.exports = class {
            constructor(amplitudeHelper) {
                (gDesigner.addEventListener(GDocumentEvent, this._handleDocumentEvent, this),
                    gDesigner.addEventListener(GLicenseChangedEvent, this._handleLicenseChangedEvent, this),
                    (this._amplitudeHelper = amplitudeHelper),
                    this._updateUserProperties());
            }
            _updateUserProperties() {
                let license = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : gDesigner.getLicense();
                this._amplitudeHelper.updateUserProperties(
                    {
                        [PRODUCT_NAME]: designerConfig.default.DESIGNER.TITLE,
                        [PRODUCT_APP_NAME]: designerConfig.default.DESIGNER.TITLE,
                        [PRODUCT_BUILD_NUMBER]: gDesigner.getVersion(),
                        [PRODUCT_LANGUAGE]: GObject.GLocale.lookupLocale(GObject.GLocale.getLanguage()).toUpperCase(),
                        [PRODUCT_ENVIRONMENT]: "production",
                    },
                    license
                );
            }
            _handleLicenseChangedEvent(event) {
                this._updateUserProperties(event.license);
            }
            async _handleDocumentEvent(event) {
                switch (event.type) {
                    case GDocumentEvent.Type.Opened:
                        this._amplitudeHelper.logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_OPENED, {
                            DOCUMENT_FILE_FORMAT: this._getDocumentOpenedFileFormat(event).toLowerCase(),
                            DOCUMENT_SOURCE: this._getSource(event.document),
                            DOCUMENT_RECENT: gContainer.isRecentDocument(event.document._storageItem),
                        });
                        break;
                    case GDocumentEvent.Type.Saving:
                        const { referer } = event.data;
                        this._isSimplifiedExporting(referer) ? this._documentExported(event) : this._documentSaved(event);
                }
            }
            _documentExported(event) {
                this._amplitudeHelper.logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_EXPORTED, {
                    DOCUMENT_EXPORT_TYPE: designerConfig.AmplitudeData.ExportTypes.Simple,
                    DOCUMENT_FILE_FORMAT: event.data.ext,
                });
            }
            _documentSaved(event) {
                this._amplitudeHelper.logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_SAVED, {
                    DOCUMENT_FILE_FORMAT: this._getDocumentSavedFileFormat(event).toLowerCase(),
                    DOCUMENT_DESTINATION: this._getSource(event.document),
                });
            }
            _isSimplifiedExporting(referer) {
                return !!referer && !referer.endsWith(GFileTypes.default.GVDESIGN.ext);
            }
            _getDocumentOpenedFileFormat(event) {
                return event.document.fileExtension || event.document.getExtension();
            }
            _getDocumentSavedFileFormat(event) {
                return event.data.ext || event.document.getExtension();
            }
            _getSource(document) {
                return document.isCloudFile() ? "cloud" : "local";
            }
        };
    };
