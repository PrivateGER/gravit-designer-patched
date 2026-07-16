module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1);
        const { FILE_FORMATS: i } = require(10 /* designerConfig */),
            a = i.find((e) => e.default),
            { COMMAND_SAVE: r } = require(591 /* COMMAND_SAVE */),
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
                    const c = this._request(r.REQUEST, {
                        id: e,
                        file: t,
                        metadata: i,
                        scene: GObject.GNode.serialize(n, { save: true }),
                        type: a.type,
                    });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd: t, id: n, data: o } = e.data;
                            if ((t !== r.SUCCESS && t !== r.FAILED) || n !== c) return false;
                            t === r.SUCCESS ? s(o.file) : t === r.FAILED && l();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
        };
    };
