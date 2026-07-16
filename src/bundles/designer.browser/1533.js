module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1);
        const i = require(156),
            { FILE_FORMATS: a } = require(10 /* designerConfig */),
            r = a.find((e) => e.default),
            { COMMAND_SAVE: s } = require(591 /* COMMAND_SAVE */),
            l = require(1164);
        module.exports = class extends l {
            constructor(e, t) {
                super(e, t);
            }
            async updateFileSceneAndMetadata(e, t, n, o) {
                const a = await this._requestWorkerToSave(e, t, n, o);
                return i.from(a);
            }
            _requestWorkerToSave(e, t, n, i) {
                return new Promise((a, l) => {
                    const c = this._request(s.REQUEST, {
                        id: e,
                        file: t,
                        metadata: i,
                        scene: GObject.GNode.serialize(n, { save: true }),
                        type: r.type,
                    });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd: t, id: n, data: o } = e.data;
                            if ((t !== s.SUCCESS && t !== s.FAILED) || n !== c) return false;
                            t === s.SUCCESS ? a(o.file) : t === s.FAILED && l();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
        };
    };
