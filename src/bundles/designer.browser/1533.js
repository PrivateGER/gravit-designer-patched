module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1);
        const i = require(156),
            { FILE_FORMATS } = require(10 /* designerConfig */),
            r = FILE_FORMATS.find((e) => e.default),
            { COMMAND_SAVE } = require(591 /* COMMAND_SAVE */),
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
                    const c = this._request(COMMAND_SAVE.REQUEST, {
                        id: e,
                        file: t,
                        metadata: i,
                        scene: GObject.GNode.serialize(n, { save: true }),
                        type: r.type,
                    });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd, id, data } = e.data;
                            if ((cmd !== COMMAND_SAVE.SUCCESS && cmd !== COMMAND_SAVE.FAILED) || id !== c) return false;
                            cmd === COMMAND_SAVE.SUCCESS ? a(data.file) : cmd === COMMAND_SAVE.FAILED && l();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
        };
    };
