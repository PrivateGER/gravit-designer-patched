module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(4), require(322), require(32), require(38), require(97), require(33), require(26));
        const { GObject } = require(1 /* GObject */),
            ResourceMap = require(1069);
        function ControlSubject() {
            ((this._resourceMap = new ResourceMap()), (this._controlSubjectState = { locked: false }));
        }
        (GObject.inherit(ControlSubject, GObject),
            (ControlSubject.prototype._controlSubjectState = null),
            (ControlSubject.prototype.lockPermissions = function () {
                ((this._controlSubjectState.locked = true), Object.freeze(this._controlSubjectState), Object.freeze(this._resourceMap));
            }),
            (ControlSubject.prototype.grant = function (resources, permission) {
                if (this._controlSubjectState.locked) return this;
                if ((resources = resources instanceof Array ? resources : [resources]).some((e) => this._resourceMap.has(e))) throw "Can't override an existing resource";
                return (resources.forEach((e) => this._resourceMap.set(e, permission)), this);
            }),
            (ControlSubject.prototype.revoke = function (resources) {
                return (
                    this._controlSubjectState.locked ||
                        (resources = resources instanceof Array ? resources : [resources]).forEach((e) => {
                            this._resourceMap.has(e) && this._resourceMap.delete(e);
                        }),
                    this
                );
            }),
            (ControlSubject.prototype.can = function (resources) {
                return (
                    (resources = resources instanceof Array ? resources : [resources]),
                    Promise.all(
                        resources.map(async (e) => {
                            if (!this._resourceMap.has(e)) return false;
                            var permissionFn = this._resourceMap.get(e);
                            return !permissionFn || !!(await permissionFn(this, e));
                        })
                    ).then((e) => e.every((e) => !!e))
                );
            }),
            (ControlSubject.prototype.canSync = function (resources) {
                return (resources = resources instanceof Array ? resources : [resources]).every((e) => {
                    if (!this._resourceMap.has(e)) return false;
                    const permissionFn = this._resourceMap.get(e);
                    if (!permissionFn) return true;
                    return !!permissionFn(this, e);
                });
            }),
            (ControlSubject.prototype.extend = function (other) {
                if (this._controlSubjectState.locked) return this;
                if (!(other instanceof ControlSubject)) throw "Not a valid instance to extend";
                const selfEntries = toMap(this._resourceMap),
                    otherEntries = toMap(other._resourceMap);
                return ((this._resourceMap = new ResourceMap(...selfEntries, ...otherEntries)), this);
                function toMap(e) {
                    return e instanceof Map ? e : new Map(Object.entries(e));
                }
            }),
            (module.exports = ControlSubject));
    };
