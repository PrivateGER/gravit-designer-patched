module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16 /* _interopRequireDefault */)(require(1573));
        module.exports = class {
            constructor(e, t) {
                this._promiseManager = new o.default();
            }
            getAnnotations(e, t) {
                return this._fetch({ id: e, shareToken: t });
            }
            updateAnnotations(e, t, n) {
                return this._fetch({ id: e, data: t, shareToken: n });
            }
            _fetch(e) {
                let { id, data, shareToken } = e;
                const i = data ? () => gApi.updateAnnotations(id, data, shareToken) : () => gApi.getAnnotations(id, shareToken);
                return this._promiseManager.pushPromise(i);
            }
        };
    };
