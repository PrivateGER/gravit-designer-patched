module.exports = function (module, exports, require) {
        "use strict";
        require(30 /* polyfill:Object */);
        const GUser = require(177);
        class UserMention extends GUser {
            constructor() {
                let {
                    id,
                    name,
                    last_name,
                    email,
                    showText,
                    avatar,
                    role,
                    fontWeight: fontWeight = "normal",
                    type: mentionType = "contact",
                    trigger: trigger = "@",
                    additional: isAdditional = false,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super({
                    id: id,
                    name: name,
                    last_name: last_name,
                    email: email,
                    showText: showText,
                    avatar: avatar,
                    fontWeight: fontWeight,
                    type: mentionType,
                    trigger: trigger,
                }),
                    (this.value = ""),
                    (this._role = role),
                    (this._additional = isAdditional));
            }
            setValue(value) {
                this.value = value;
            }
            getFullUserName() {
                return this._additional ? this.name : super.getFullUserName();
            }
            static createUserMention(user, options) {
                let firstName = user.getFirstName();
                return new UserMention({
                    id: user.getUID(),
                    name: firstName,
                    last_name: user.getLastName(),
                    showText: "@" + user.getFullUserName(),
                    avatar: options ? options.avatar : "assets/icon/notification-icon.svg",
                    role: user.getRole(),
                    email: user.getEmail(),
                });
            }
            static clone(source) {
                const clonedInstance = new UserMention();
                return (Object.assign(clonedInstance, source), clonedInstance);
            }
        }
        module.exports = UserMention;
    };
