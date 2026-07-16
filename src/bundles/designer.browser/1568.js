module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(134 /* polyfill:String */), require(4), require(41), require(26));
        var designerConfig = require(10);
        const i = require(292),
            GCloudStorage = require(220),
            r = require(78),
            s = require(536),
            l = require(177),
            c = require(393);
        var d = null;
        function u(e) {
            if (d) throw new Error("GCloudCommunicationManager is a singleton");
            (e.addEventListener(i, this._userLoggedEvent, this),
                e.addEventListener(r, this._documentEvent, this),
                (d = this),
                this.initialize());
        }
        ((u.clearSingleton = function () {
            d = null;
        }),
            (u.prototype._fileCacheMapExt = {}),
            (u.prototype._userCache = null),
            (u.prototype.getUser = async function () {
                this._initializeUserCache();
                const e = await this._userCache.get();
                return (e || this._userCache.reset(), e);
            }),
            (u.prototype.confirmEmail = function (e) {
                return designerConfig.gApi.confirmEmail(e).then((e) => (this._removeUserCache(), e));
            }),
            (u.prototype.updateUser = function (e) {
                return designerConfig.gApi.updateUser(e).then((e) => (this._removeUserCache(), new l(e)));
            }),
            (u.prototype.updateAvatar = function (e) {
                return designerConfig.gApi.updateAvatar(e).then((e) => (this._removeUserCache(), e));
            }),
            (u.prototype.useAuthorizationToken = function (e) {
                (this._removeUserCache(), designerConfig.gApi.useAuthorizationToken(e));
            }),
            (u.prototype.userPropertiesChanged = function () {
                this._removeUserCache();
            }),
            (u.prototype.getFileExtendedCached = async function (e) {
                var t = (e = e || gDesigner.getActiveDocument()).getId();
                return t
                    ? (this._fileCacheMapExt[t] || (this._fileCacheMapExt[t] = new s(() => this._getFileExtended(e))),
                      this._fileCacheMapExt[t].get())
                    : null;
            }),
            (u.prototype._userLoggedEvent = function (e) {
                const { user } = e;
                (user ? (this._initializeUserCache(), this._userCache.setCacheValue(user)) : this._removeUserCache(), this._resetAllCache());
            }),
            (u.prototype._removeUserCache = function () {
                this._userCache = null;
            }),
            (u.prototype._initializeUserCache = async function () {
                this._userCache ||
                    (this._userCache = new s(
                        () =>
                            designerConfig.gApi
                                .getUser()
                                .then((e) => new l(e))
                                .catch(() => null),
                        designerConfig.USER_CHECK_MIN_WAIT
                    ));
            }),
            (u.prototype._updateDocState = function (e) {
                this._resetFileCache(e);
            }),
            (u.prototype._resetFileCache = function (e) {
                if (e) {
                    var t = e.getId();
                    return t && this._fileCacheMapExt[t] ? this._fileCacheMapExt[t].reset() : void 0;
                }
            }),
            (u.prototype._resetAllCache = function () {
                this._fileCacheMapExt = {};
            }),
            (u.prototype._documentEvent = function (e) {
                const t = e.document;
                if (t)
                    switch (e.type) {
                        case r.Type.Added:
                            (this._updateDocState(t), t.addEventListener(c, this._collaborationEvent, this));
                            break;
                        case r.Type.Removed:
                            t.removeEventListener(c, this._collaborationEvent, this);
                            break;
                        case r.Type.Modified:
                            this._updateDocState(t);
                    }
            }),
            (u.prototype._collaborationEvent = function (e) {
                const { sender, type } = e;
                type === c.Type.ShareUpdate && this._updateDocState(sender);
            }),
            (u.prototype._getFileExtended = async function (e) {
                const t = (e = e || gDesigner.getActiveDocument()) && e.getStorageItem();
                if (!t) return null;
                const n = t.getId();
                return n
                    ? t instanceof GCloudStorage.Item
                        ? this.getFileExtended(n).catch(() => null)
                        : t && t.supportsSharing() && t.supportsShadowFile()
                          ? t.getOrCreateCollaborativeFile()
                          : null
                    : null;
            }));
        var p = {};
        async function g(e, t, n) {
            let i, a;
            try {
                if (((i = designerConfig.gApi[t](n)), !(i instanceof Promise))) return i;
                a = await i;
            } catch (e) {
                throw e;
            } finally {
                delete e[n];
            }
            return a;
        }
        ((u.prototype.initialize = function () {
            const e = Object.keys(d).filter((e) => e.startsWith("get")),
                t = designerConfig.CACHED_GAPI_FUNCTIONS.filter((t) => /^is|^get/.test(t) && !e.includes(t));
            for (let e of t)
                ((p[e] = {}),
                    (d[e] = async function (e) {
                        const t = p[this];
                        if (void 0 !== t[e]) return t[e];
                        const n = g(t, this, e);
                        return (n instanceof Promise && (t[e] = n), n);
                    }.bind(e)));
        }),
            (module.exports = u));
    };
