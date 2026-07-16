module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const o = require(11);
        module.exports = class {
            constructor(e, t) {
                ((this._worker = e), (this._user = t));
            }
            async updateFileSceneAndMetadata(e, t, n) {
                throw "Not implemented";
            }
            _request(e, t) {
                const n = o.uuid(64);
                return (
                    this._worker.postMessage({
                        cmd: e,
                        data: t,
                        id: n,
                        user: this._user,
                    }),
                    n
                );
            }
        };
    };
