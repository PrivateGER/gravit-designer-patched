module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.GMicrosoftUser = r), (exports.default = void 0), require(3));
        var GObject = require(1),
            i = require(1478),
            a = require(1241);
        function r(e) {
            let { Id, Email, Title, UserId, UserPrincipalName } = e;
            ((this._id = Id), (this._email = Email), (this._name = Title), (this._userId = UserId), (this._userPrincipalName = UserPrincipalName));
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
