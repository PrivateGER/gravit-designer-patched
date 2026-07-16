module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(96 /* polyfill:JSON */), require(3), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var designerConfig = require(10),
            GSaveAction = require(40);
        const a = require(1186),
            r = require(1575);
        module.exports = class extends a {
            constructor() {
                (super(), (this._url = new URL(designerConfig.gApi.url)));
            }
            setId(e) {
                return ((this._id = e), this);
            }
            setTime(e) {
                return (this._url.searchParams.set("time", e.getTime()), this);
            }
            setEndpoint(e) {
                return ((this._url.pathname = e), this);
            }
            setLanguage(e) {
                return (this._url.searchParams.set("lang", e), this);
            }
            setCampaign(e) {
                return (e && this._url.searchParams.set("campaign", e), this);
            }
            setShareFile(e) {
                return (e && this._url.searchParams.set("shareFile", e), this);
            }
            setDashboard(e) {
                return (e && this._url.searchParams.set("dashboard", e), this);
            }
            setProduct(e) {
                return (e && this._url.searchParams.set("product", (0, GSaveAction.stringToBase64String)(JSON.stringify(e))), this);
            }
            setInAppPurchasesAvailable(e) {
                return (this._url.searchParams.set("iap", e), this);
            }
            setLayout(e) {
                return ((e = e || 0), this._url.searchParams.set("layout", e), this);
            }
            build() {
                return new r(this._id, this._url.toString());
            }
        };
    };
