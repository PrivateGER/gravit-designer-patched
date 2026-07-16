module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(34));
        const o = require(177),
            {
                SharePermissions: { COMMENT, EDIT },
                ShareRoles,
            } = require(10 /* designerConfig */),
            { GLocale, GLocaleKey } = require(1 /* GObject */);
        module.exports = class extends o {
            constructor() {
                let {
                    access_id,
                    file_id,
                    accessed,
                    name,
                    last_name,
                    avatar,
                    anonymous: r = false,
                    role,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super({
                    file_id: file_id,
                    accessed: accessed,
                    name: name,
                    last_name: last_name,
                    avatar: avatar,
                    anonymous: r,
                }),
                    (this.id = access_id),
                    (this._role = role));
            }
            getTooltip() {
                const e = this.getRole();
                return e.is(ShareRoles.Owner)
                    ? GLocale.get(new GLocaleKey("GCollaborators", "text.owner-tooltip")).replace("%username", this.getFullUserName())
                    : GLocale
                          .get(new GLocaleKey("GCollaborators", e.hasPermission(EDIT) ? "text.can-edit-tooltip" : "text.can-comment-tooltip"))
                          .replace("%username", this.getFullUserName());
            }
            getIcon() {
                const e = this.getRole();
                return e.hasPermission(COMMENT) && !e.hasPermission(EDIT) ? "gravit-icon-avatar-comment" : null;
            }
        };
    };
