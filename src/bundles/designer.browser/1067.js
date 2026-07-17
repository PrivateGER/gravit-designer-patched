module.exports = function (module, exports, require) {
        "use strict";
        require(290);
        const { GObject, GLocale } = require(1 /* GObject */),
            ControlSubject = require(1068);
        function GShareRole(options) {
            let { id, level: level = 0, name, description, status, pro: pro = false, assignable: assignable = true, permissions } = options;
            (ControlSubject.call(this),
                (this.id = id),
                (this.name = name),
                (this.description = description),
                (this.status = status),
                (this.pro = pro),
                (this.permissions = permissions),
                (this.assignable = assignable),
                (this.level = level));
        }
        (GObject.inheritAndMix(GShareRole, GObject, [ControlSubject]),
            (GShareRole.prototype.getPermissions = function () {
                return this.permissions;
            }),
            (GShareRole.prototype.getDescription = function () {
                return this.description;
            }),
            (GShareRole.prototype.getStatus = function () {
                return this.status;
            }),
            (GShareRole.prototype.getName = function () {
                return this.name;
            }),
            (GShareRole.prototype.getId = function () {
                return this.id;
            }),
            (GShareRole.prototype.setId = function (id) {
                this.id = id;
            }),
            (GShareRole.prototype.getName = function () {
                return this.name;
            }),
            (GShareRole.prototype.getLevel = function () {
                return this.level;
            }),
            (GShareRole.prototype.isPro = function () {
                return this.pro;
            }),
            (GShareRole.prototype.equals = function (other) {
                return other.getId() === this.getId();
            }),
            (GShareRole.prototype.hasPermission = function (permissionKey) {
                return !!this.permissions[permissionKey];
            }),
            (GShareRole.prototype.applyPermissions = function (permissions) {
                this.permissions.applyFrom(permissions);
            }),
            (GShareRole.prototype.isAssignable = function () {
                return this.assignable;
            }),
            (GShareRole.prototype.is = function (role) {
                return this.getId() === role.id;
            }),
            (module.exports = GShareRole));
    };
