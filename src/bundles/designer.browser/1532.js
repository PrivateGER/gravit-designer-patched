module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1);
        const { FILE_FORMATS } = require(10 /* designerConfig */),
            a = FILE_FORMATS.find((e) => e.default),
            { COMMAND_SAVE } = require(591 /* COMMAND_SAVE */),
            s = require(1164),
            GGoogleDrive = require(556);
        module.exports = class extends s {
            constructor(e, t) {
                super(e, t);
            }
            async updateFileSceneAndMetadata(e, t, n, o) {
                const i = await this._requestWorkerToSave(e, t, n, o);
                return GGoogleDrive.convertToCloudItem(i);
            }
            _requestWorkerToSave(e, t, n, i) {
                return new Promise((s, l) => {
                    const c = this._request(COMMAND_SAVE.REQUEST, {
                        id: e,
                        file: t,
                        metadata: i,
                        scene: GObject.GNode.serialize(n, { save: true }),
                        type: a.type,
                    });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd, id, data } = e.data;
                            if ((cmd !== COMMAND_SAVE.SUCCESS && cmd !== COMMAND_SAVE.FAILED) || id !== c) return false;
                            cmd === COMMAND_SAVE.SUCCESS ? s(data.file) : cmd === COMMAND_SAVE.FAILED && l();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
        };
    };
