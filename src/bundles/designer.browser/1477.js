module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.GMicrosoftUser = r), (exports.default = void 0), require(3));
        var GObject = require(1),
            i = require(1478),
            a = require(1241);
        function r(e) {
            let { Id: t, Email: n, Title: o, UserId: i, UserPrincipalName: a } = e;
            ((this._id = t), (this._email = n), (this._name = o), (this._userId = i), (this._userPrincipalName = a));
        }
        (GObject.GObject.inherit(r, i.GCloudUser),
            (r.ValidRoles = [a.GCloudRole.Type.Viewer, a.GCloudRole.Type.ContentEditor]),
            (r.prototype._userId = null),
            (r.prototype.getValidRoles = function () {
                return r.ValidRoles;
            }),
            (r.prototype.getEmail = function () {
                return this._email;
            }),
            (r.prototype.getUserReference = function () {
                return this.getEmail();
            }),
            (r.prototype.getUserPrincipalName = function () {
                return this._userPrincipalName;
            }),
            (r.prototype.getNameId = function () {
                return this._userId && this._userId.NameId;
            }),
            (r.prototype.toString = function () {
                return "[GObject GMicrosoftUser]";
            }));
        exports.default = r;
    };
