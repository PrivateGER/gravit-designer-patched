module.exports = function (module, exports, require) {
        "use strict";
        require(30);
        const o = require(177);
        class i extends o {
            constructor() {
                let {
                    id,
                    name,
                    last_name,
                    email,
                    showText,
                    avatar,
                    role,
                    fontWeight: s = "normal",
                    type: l = "contact",
                    trigger: c = "@",
                    additional: d = false,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super({
                    id: id,
                    name: name,
                    last_name: last_name,
                    email: email,
                    showText: showText,
                    avatar: avatar,
                    fontWeight: s,
                    type: l,
                    trigger: c,
                }),
                    (this.value = ""),
                    (this._role = role),
                    (this._additional = d));
            }
            setValue(e) {
                this.value = e;
            }
            getFullUserName() {
                return this._additional ? this.name : super.getFullUserName();
            }
            static createUserMention(e, t) {
                let n = e.getFirstName();
                return new i({
                    id: e.getUID(),
                    name: n,
                    last_name: e.getLastName(),
                    showText: "@" + e.getFullUserName(),
                    avatar: t ? t.avatar : "assets/icon/notification-icon.svg",
                    role: e.getRole(),
                    email: e.getEmail(),
                });
            }
            static clone(e) {
                const t = new i();
                return (Object.assign(t, e), t);
            }
        }
        module.exports = i;
    };
