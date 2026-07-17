module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(134 /* polyfill:String */), require(4), require(41), require(26));
        var designerConfig = require(10);
        const GUserLoggedEvent = require(292),
            GCloudStorage = require(220),
            GDocumentEvent = require(78),
            CachedValue = require(536),
            GUser = require(177),
            GCollaborationEvent = require(393);
        var singletonInstance = null;
        function GCloudCommunicationManager(application) {
            if (singletonInstance) throw new Error("GCloudCommunicationManager is a singleton");
            (application.addEventListener(GUserLoggedEvent, this._userLoggedEvent, this),
                application.addEventListener(GDocumentEvent, this._documentEvent, this),
                (singletonInstance = this),
                this.initialize());
        }
        ((GCloudCommunicationManager.clearSingleton = function () {
            singletonInstance = null;
        }),
            (GCloudCommunicationManager.prototype._fileCacheMapExt = {}),
            (GCloudCommunicationManager.prototype._userCache = null),
            (GCloudCommunicationManager.prototype.getUser = async function () {
                this._initializeUserCache();
                const cachedUser = await this._userCache.get();
                return (cachedUser || this._userCache.reset(), cachedUser);
            }),
            (GCloudCommunicationManager.prototype.confirmEmail = function (token) {
                return designerConfig.gApi.confirmEmail(token).then((result) => (this._removeUserCache(), result));
            }),
            (GCloudCommunicationManager.prototype.updateUser = function (userData) {
                return designerConfig.gApi.updateUser(userData).then((updatedUser) => (this._removeUserCache(), new GUser(updatedUser)));
            }),
            (GCloudCommunicationManager.prototype.updateAvatar = function (avatarData) {
                return designerConfig.gApi.updateAvatar(avatarData).then((result) => (this._removeUserCache(), result));
            }),
            (GCloudCommunicationManager.prototype.useAuthorizationToken = function (token) {
                (this._removeUserCache(), designerConfig.gApi.useAuthorizationToken(token));
            }),
            (GCloudCommunicationManager.prototype.userPropertiesChanged = function () {
                this._removeUserCache();
            }),
            (GCloudCommunicationManager.prototype.getFileExtendedCached = async function (document) {
                var documentId = (document = document || gDesigner.getActiveDocument()).getId();
                return documentId
                    ? (this._fileCacheMapExt[documentId] || (this._fileCacheMapExt[documentId] = new CachedValue(() => this._getFileExtended(document))),
                      this._fileCacheMapExt[documentId].get())
                    : null;
            }),
            (GCloudCommunicationManager.prototype._userLoggedEvent = function (event) {
                const { user } = event;
                (user ? (this._initializeUserCache(), this._userCache.setCacheValue(user)) : this._removeUserCache(), this._resetAllCache());
            }),
            (GCloudCommunicationManager.prototype._removeUserCache = function () {
                this._userCache = null;
            }),
            (GCloudCommunicationManager.prototype._initializeUserCache = async function () {
                this._userCache ||
                    (this._userCache = new CachedValue(
                        () =>
                            designerConfig.gApi
                                .getUser()
                                .then((userData) => new GUser(userData))
                                .catch(() => null),
                        designerConfig.USER_CHECK_MIN_WAIT
                    ));
            }),
            (GCloudCommunicationManager.prototype._updateDocState = function (document) {
                this._resetFileCache(document);
            }),
            (GCloudCommunicationManager.prototype._resetFileCache = function (document) {
                if (document) {
                    var documentId = document.getId();
                    return documentId && this._fileCacheMapExt[documentId] ? this._fileCacheMapExt[documentId].reset() : void 0;
                }
            }),
            (GCloudCommunicationManager.prototype._resetAllCache = function () {
                this._fileCacheMapExt = {};
            }),
            (GCloudCommunicationManager.prototype._documentEvent = function (event) {
                const document = event.document;
                if (document)
                    switch (event.type) {
                        case GDocumentEvent.Type.Added:
                            (this._updateDocState(document), document.addEventListener(GCollaborationEvent, this._collaborationEvent, this));
                            break;
                        case GDocumentEvent.Type.Removed:
                            document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this);
                            break;
                        case GDocumentEvent.Type.Modified:
                            this._updateDocState(document);
                    }
            }),
            (GCloudCommunicationManager.prototype._collaborationEvent = function (event) {
                const { sender, type } = event;
                type === GCollaborationEvent.Type.ShareUpdate && this._updateDocState(sender);
            }),
            (GCloudCommunicationManager.prototype._getFileExtended = async function (document) {
                const storageItem = (document = document || gDesigner.getActiveDocument()) && document.getStorageItem();
                if (!storageItem) return null;
                const itemId = storageItem.getId();
                return itemId
                    ? storageItem instanceof GCloudStorage.Item
                        ? this.getFileExtended(itemId).catch(() => null)
                        : storageItem && storageItem.supportsSharing() && storageItem.supportsShadowFile()
                          ? storageItem.getOrCreateCollaborativeFile()
                          : null
                    : null;
            }));
        var inFlightCallsByMethod = {};
        async function resolveCachedCall(cache, methodName, arg) {
            let callResult, resolvedValue;
            try {
                if (((callResult = designerConfig.gApi[methodName](arg)), !(callResult instanceof Promise))) return callResult;
                resolvedValue = await callResult;
            } catch (error) {
                throw error;
            } finally {
                delete cache[arg];
            }
            return resolvedValue;
        }
        ((GCloudCommunicationManager.prototype.initialize = function () {
            const cachedGetterNames = Object.keys(singletonInstance).filter((cachedGetterNames) => cachedGetterNames.startsWith("get")),
                functionsToCache = designerConfig.CACHED_GAPI_FUNCTIONS.filter((functionsToCache) => /^is|^get/.test(functionsToCache) && !cachedGetterNames.includes(functionsToCache));
            for (let methodName of functionsToCache)
                ((inFlightCallsByMethod[methodName] = {}),
                    (singletonInstance[methodName] = async function (callArg) {
                        const methodCache = inFlightCallsByMethod[this];
                        if (void 0 !== methodCache[callArg]) return methodCache[callArg];
                        const callPromise = resolveCachedCall(methodCache, this, callArg);
                        return (callPromise instanceof Promise && (methodCache[callArg] = callPromise), callPromise);
                    }.bind(methodName)));
        }),
            (module.exports = GCloudCommunicationManager));
    };
