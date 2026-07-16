module.exports = function (module, exports, require) {
            "use strict";
            require(30 /* polyfill:Object */);
            class n {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e.autosave_updated) {
                        const t = e.file_updated ? e.file_updated : e.updated ? e.updated : e.created;
                        new Date(e.autosave_updated) > new Date(t) && (e.autosave = true);
                    }
                    Object.assign(this, e);
                }
                clone() {
                    return new n(this);
                }
                getOwner() {
                    return this.owner;
                }
                isOwner(e) {
                    return this.owner.user_id === e.id;
                }
                isAutoSave() {
                    return this.autosave;
                }
                getFileDataURL() {
                    return this.isAutoSave() ? this.autosave_url : this.url;
                }
            }
            module.exports = n;
        };
