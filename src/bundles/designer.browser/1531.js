module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13), require(38));
        var GObject = require(1);
        const { FILE_FORMATS, gApi } = require(10 /* designerConfig */),
            r = FILE_FORMATS.find((e) => e.default),
            { COMMAND_SAVE, COMMAND_SYNC_IMAGES } = require(591 /* COMMAND_SAVE */),
            c = require(1164);
        module.exports = class extends c {
            constructor(e, t) {
                super(e, t);
            }
            async updateFileSceneAndMetadata(e, t, n, o) {
                await this._syncSceneImages(e, n);
                const { sceneSnapshot, urls } = await this._saveScene(e, t, n);
                return (
                    console.log({ documentId: e, file: t, sceneSnapshot: sceneSnapshot, urls: urls }),
                    await this._saveThumbnail(o.thumbnail.getImageAsBlob(), urls.url_t),
                    await gApi.commitAutoSaveFileUpdate(t.id),
                    gApi.getFile(e + "?edit")
                );
            }
            _syncSceneImages(e, t) {
                return new Promise((n) => {
                    let i = t.getDictionary().getEntries(),
                        r = [];
                    ((i = i.map((e) => (e.hasOwnProperty("cachedCanvas") && (e.cachedCanvas = null), e))),
                        t.acceptChildren((e) => {
                            e instanceof GObject.GImage &&
                                r.push({
                                    name: e.getProperty("name"),
                                    url: e.getProperty("url"),
                                });
                        }));
                    const s = Object.create(t),
                        c = this._request(COMMAND_SYNC_IMAGES.REQUEST, {
                            id: e,
                            images: r,
                            entries: i,
                            cloudURL: gApi.url,
                        });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd, id, data } = e.data;
                            if (cmd !== COMMAND_SYNC_IMAGES.SUCCESS || id !== c) return false;
                            let r = s.getDictionary();
                            s.setCloudSynchronization(null);
                            let d = new GObject.GDictionary();
                            return (d.deserialize(data), r.merge(d), n(), true);
                        }.bind(this),
                        { once: true }
                    );
                });
            }
            _saveScene(e, t, n) {
                return new Promise((i, a) => {
                    let l = GObject.GNode.serialize(n, { save: true });
                    const c = Object.create(n),
                        d = this._request(COMMAND_SAVE.REQUEST, {
                            id: e,
                            file: t,
                            scene: l,
                            type: r.type,
                        });
                    this._worker.addEventListener(
                        "message",
                        function (e) {
                            const { cmd: t, id: n, data: o } = e.data;
                            if ((t !== COMMAND_SAVE.SUCCESS && t !== COMMAND_SAVE.FAILED) || n !== d) return false;
                            t === COMMAND_SAVE.SUCCESS ? i({ sceneSnapshot: c, urls: o.urls }) : t === COMMAND_SAVE.FAILED && a();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
            _saveThumbnail(e, t) {
                const n = new XMLHttpRequest();
                n.open("PUT", t);
                const o = {
                    "Content-Type": "image/jpeg",
                    "Cache-Control": "public,max-age=31600000",
                };
                for (var i in o) n.setRequestHeader(i, o[i]);
                n.send(e);
            }
        };
    };
