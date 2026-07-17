module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13), require(38));
        var GObject = require(1);
        const { FILE_FORMATS, gApi } = require(10 /* designerConfig */),
            r = FILE_FORMATS.find((format) => format.default),
            { COMMAND_SAVE, COMMAND_SYNC_IMAGES } = require(591 /* COMMAND_SAVE */),
            c = require(1164);
        module.exports = class extends c {
            constructor(worker, user) {
                super(worker, user);
            }
            async updateFileSceneAndMetadata(documentId, file, scene, metadata) {
                await this._syncSceneImages(documentId, scene);
                const { sceneSnapshot, urls } = await this._saveScene(documentId, file, scene);
                return (
                    console.log({ documentId: documentId, file: file, sceneSnapshot: sceneSnapshot, urls: urls }),
                    await this._saveThumbnail(metadata.thumbnail.getImageAsBlob(), urls.url_t),
                    await gApi.commitAutoSaveFileUpdate(file.id),
                    gApi.getFile(documentId + "?edit")
                );
            }
            _syncSceneImages(documentId, scene) {
                return new Promise((resolve) => {
                    let entries = scene.getDictionary().getEntries(),
                        images = [];
                    ((entries = entries.map((entry) => (entry.hasOwnProperty("cachedCanvas") && (entry.cachedCanvas = null), entry))),
                        scene.acceptChildren((child) => {
                            child instanceof GObject.GImage &&
                                images.push({
                                    name: child.getProperty("name"),
                                    url: child.getProperty("url"),
                                });
                        }));
                    const sceneCopy = Object.create(scene),
                        requestId = this._request(COMMAND_SYNC_IMAGES.REQUEST, {
                            id: documentId,
                            images: images,
                            entries: entries,
                            cloudURL: gApi.url,
                        });
                    this._worker.addEventListener(
                        "message",
                        function (event) {
                            const { cmd, id, data } = event.data;
                            if (cmd !== COMMAND_SYNC_IMAGES.SUCCESS || id !== requestId) return false;
                            let dictionary = sceneCopy.getDictionary();
                            sceneCopy.setCloudSynchronization(null);
                            let newDictionary = new GObject.GDictionary();
                            return (newDictionary.deserialize(data), dictionary.merge(newDictionary), resolve(), true);
                        }.bind(this),
                        { once: true }
                    );
                });
            }
            _saveScene(documentId, file, scene) {
                return new Promise((resolve, reject) => {
                    let serializedScene = GObject.GNode.serialize(scene, { save: true });
                    const sceneCopy = Object.create(scene),
                        requestId = this._request(COMMAND_SAVE.REQUEST, {
                            id: documentId,
                            file: file,
                            scene: serializedScene,
                            type: r.type,
                        });
                    this._worker.addEventListener(
                        "message",
                        function (event) {
                            const { cmd: cmd, id: id, data: data } = event.data;
                            if ((cmd !== COMMAND_SAVE.SUCCESS && cmd !== COMMAND_SAVE.FAILED) || id !== requestId) return false;
                            cmd === COMMAND_SAVE.SUCCESS ? resolve({ sceneSnapshot: sceneCopy, urls: data.urls }) : cmd === COMMAND_SAVE.FAILED && reject();
                            return true;
                        }.bind(this),
                        { once: true }
                    );
                });
            }
            _saveThumbnail(imageBlob, uploadUrl) {
                const request = new XMLHttpRequest();
                request.open("PUT", uploadUrl);
                const headers = {
                    "Content-Type": "image/jpeg",
                    "Cache-Control": "public,max-age=31600000",
                };
                for (var i in headers) request.setRequestHeader(i, headers[i]);
                request.send(imageBlob);
            }
        };
    };
