module.exports = function (module, exports, require) {
        "use strict";
        require(290);
        const { GObject, GLocale } = require(1 /* GObject */),
            a = require(1068);
        function r(e) {
            let { id, level: n = 0, name, description, status, pro: s = false, assignable: l = true, permissions } = e;
            (a.call(this),
                (this.id = id),
                (this.name = name),
                (this.description = description),
                (this.status = status),
                (this.pro = s),
                (this.permissions = permissions),
                (this.assignable = l),
                (this.level = n));
        }
        (GObject.inheritAndMix(r, GObject, [a]),
            (r.prototype.getPermissions = function () {
                return this.permissions;
            }),
            (r.prototype.getDescription = function () {
                return this.description;
            }),
            (r.prototype.getStatus = function () {
                return this.status;
            }),
            (r.prototype.getName = function () {
                return this.name;
            }),
            (r.prototype.getId = function () {
                return this.id;
            }),
            (r.prototype.setId = function (e) {
                this.id = e;
            }),
            (r.prototype.getName = function () {
                return this.name;
            }),
            (r.prototype.getLevel = function () {
                return this.level;
            }),
            (r.prototype.isPro = function () {
                return this.pro;
            }),
            (r.prototype.equals = function (e) {
                return e.getId() === this.getId();
            }),
            (r.prototype.hasPermission = function (e) {
                return !!this.permissions[e];
            }),
            (r.prototype.applyPermissions = function (e) {
                this.permissions.applyFrom(e);
            }),
            (r.prototype.isAssignable = function () {
                return this.assignable;
            }),
            (r.prototype.is = function (e) {
                return this.getId() === e.id;
            }),
            (module.exports = r));
    };
