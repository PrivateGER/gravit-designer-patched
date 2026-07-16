module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1252),
            i = require(1187),
            { gApi } = require(10 /* designerConfig */);
        module.exports = class extends i {
            constructor(e, t) {
                (super(), (this._id = e), (this._url = t));
            }
            open() {
                if (this._isOpen()) return;
                const e = new o({ id: this._id, className: "overlay" });
                (e.open(this._url),
                    e.on("error", () => {
                        e.close();
                    }),
                    gApi.isCookieEnabled &&
                        !gApi.isCookieEnabled() &&
                        e.on("load", () => {
                            e.postMessage({ cmd: "auth", token: gApi.getAuthorizationToken() }, gApi.url);
                        }));
            }
            _isOpen() {
                return !!$("#".concat(this._id)).length;
            }
        };
    };
