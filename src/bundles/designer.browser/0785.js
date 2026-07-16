module.exports = function (module, exports, require) {
        "use strict";
        (require(30), require(8 /* Symbol */));
        module.exports = new (class {
            constructor() {
                ((this._cache = {}), (this._initiliazed = false));
            }
            updateLicense(e) {
                e._offline || this._update({ license: e });
            }
            updateUser(e) {
                this._update({ user: e });
            }
            getUser() {
                return this._cache.user;
            }
            getLicense() {
                if (this._cache.license) {
                    const { lastUpdate } = this._cache;
                    return (
                        (this._cache.license = Object.assign({}, this._cache.license, {
                            lastUpdate: lastUpdate,
                        })),
                        this._cache.license
                    );
                }
                return null;
            }
            clear() {
                ((this._cache = {}), this._store());
            }
            _update(e) {
                this._initiliazed && ((this._cache = Object.assign(this._cache, e)), this._store());
            }
            async init() {
                return gContainer
                    .getProperty("offline_cache")
                    .then((e) => {
                        ((this._cache = e || {}), (this._initiliazed = true));
                    })
                    .catch((e) => Promise.reject(e));
            }
            _store() {
                this._initiliazed && ((this._cache.lastUpdate = gDesigner.now()), gContainer.setProperty("offline_cache", this._cache));
            }
        })();
    };
