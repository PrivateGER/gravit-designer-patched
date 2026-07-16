module.exports = function (module, exports, require) {
            "use strict";
            (require(30), require(20), require(107), require(247), require(91));
            const n = require(973),
                { sanitizeName: r } = require(254),
                o = require(583),
                { GLocale: a, GLocaleKey: s } = require(209 /* GLocale */);

            function l() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                Object.assign(this, e);
            }
            ((l.prototype.isInternal = function () {
                return this.user_type === n.Internal;
            }),
                (l.prototype.isStudent = function () {
                    return this.user_type === n.Student;
                }),
                (l.prototype.canUpdateSelfAccountData = function () {
                    return !this.isStudent();
                }),
                (l.prototype.canResetSelfPassword = function () {
                    return !this.isStudent();
                }),
                (l.prototype.isSuperAdmin = function () {
                    return !!this.admin && 1 === this.admin.user;
                }),
                (l.getUserNameInitials = function (e) {
                    const t = e && e.split(/\s+/),
                        i = t && t.length > 1 ? t[t.length - 1].slice(0, 1).toUpperCase() : "";
                    return (e && e.slice(0, 1).toUpperCase()) + i;
                }),
                (l.isFirstNameValid = function (e) {
                    return !!e && !o.USER.INVALID_CHARACTERS.test(e);
                }),
                (l.isLastNameValid = function (e) {
                    return l.isFirstNameValid(e);
                }),
                (l.prototype.getFullUserName = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this.name || this.last_name) {
                        const e = new Array();
                        if (this.name && this.name.trim()) {
                            let t = this.name.trim().split(/\s/)[0];
                            e.push(r(t));
                        }
                        if (this.last_name && this.last_name.trim()) {
                            let t = this.last_name.trim().split(/\s/)[0];
                            e.push(r(t));
                        }
                        return e.join(" ");
                    }
                    return r(this.login || this.email || (e ? a.get(new s("GCommonNames", "text.unknown-user")) : "Unknown"));
                }),
                (module.exports = l));
        };
