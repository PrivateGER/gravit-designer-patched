module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(247), require(91 /* polyfill:String */));
        var GRegex = require(263),
            designerConfig = require(10);
        const { GObject } = require(1 /* GObject */),
            GRole = require(733),
            GEntity = require(589),
            userColorCache = {},
            colorPalette = [
                "#B30000",
                "#B35900",
                "#999900",
                "#59B300",
                "#009966",
                "#00B3B3",
                "#0095B3",
                "#006699",
                "#003CB3",
                "#1E00B3",
                "#5900B3",
                "#9500B3",
                "#B30077",
                "#E60000",
                "#E67300",
                "#E69900",
                "#5500FF",
                "#BF00FF",
            ];
        function GUser() {
            let attributes = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this, attributes);
        }
        (GObject.inheritAndMix(GUser, GEntity, [GRole, designerConfig.User], true),
            (GUser.equals = function (firstUser, secondUser) {
                return new GUser(firstUser).getUID() === new GUser(secondUser).getUID();
            }),
            (GUser.prototype.hasOwnPictureAvatar = function () {
                return this.avatar && this.avatar.split("?")[1] && "v=" === this.avatar.split("?")[1].substr(0, 2);
            }),
            (GUser.prototype.getUID = function () {
                return !this.id && designerConfig.ANONYMOUS_SESSION_ENABLED ? this.user_id || this.session_id || "" : this.id || this.user_id || "";
            }),
            (GUser.prototype.getUserColor = function () {
                if (!this._color) {
                    const uid = this.getUID();
                    if (!userColorCache[uid]) {
                        var presetColor = colorPalette.shift();
                        userColorCache[uid] =
                            presetColor ||
                            "#" +
                                (
                                    (((32 * Math.random()) | 0) << 3) |
                                    (((32 * Math.random()) | 0) << 11) |
                                    (((32 * Math.random()) | 0) << 19)
                                ).toString(16);
                    }
                    this._color = userColorCache[uid];
                }
                return this._color;
            }),
            (GUser.prototype.getEmail = function () {
                return designerConfig.CloudUtils.getUserEmail(this);
            }),
            (GUser.prototype.isDeactivated = function () {
                return !!this.deactivated;
            }),
            (GUser.prototype.isAnonymous = function () {
                return this.anonymous;
            }),
            (GUser.prototype.isGravitAccount = function () {
                const email = this.getEmail();
                return /\@(gravit\.io|designer\.io|corel\.com|corelvector\.com)$/.test(email);
            }),
            (GUser.prototype.isEmailVerified = function () {
                return !!this.email_verified;
            }),
            (GUser.prototype.getFirstName = function () {
                try {
                    if (this.name && this.name.trim()) {
                        return this.name.trim().split(GRegex.GRegex.String.SpacesLineBreak)[0];
                    }
                    return this.name || "";
                } catch (e) {
                    return "";
                }
            }),
            (GUser.prototype.getUserNameInitials = function () {
                const firstName = this.getFirstName();
                try {
                    if (this.last_name && this.last_name.trim()) {
                        const lastName = this.last_name;
                        return "".concat(firstName.substr(0, 1)).concat(lastName.substr(0, 1)).toLocaleUpperCase();
                    }
                    return firstName ? "".concat(firstName.substr(0, 1)) : "";
                } catch (t) {
                    return firstName ? "".concat(firstName.substr(0, 1)) : "";
                }
            }),
            (GUser.prototype.getLastName = function () {
                return this.last_name;
            }),
            (GUser.prototype.getUserReference = function () {
                return this.email || this.login || this.getFullUserName();
            }),
            (GUser.prototype.getAccountName = function () {
                return this.email || this.login || "";
            }),
            (module.exports = GUser));
    };
