module.exports = function (module, exports, require) {
        "use strict";
        (require(20), require(34));
        const o = require(177),
            {
                SharePermissions: { COMMENT: i, EDIT: a },
                ShareRoles: r,
            } = require(10 /* designerConfig */),
            { GLocale: s, GLocaleKey: l } = require(1 /* GObject */);
        module.exports = class extends o {
            constructor() {
                let {
                    access_id: e,
                    file_id: t,
                    accessed: n,
                    name: o,
                    last_name: i,
                    avatar: a,
                    anonymous: r = false,
                    role: s,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (super({
                    file_id: t,
                    accessed: n,
                    name: o,
                    last_name: i,
                    avatar: a,
                    anonymous: r,
                }),
                    (this.id = e),
                    (this._role = s));
            }
            getTooltip() {
                const e = this.getRole();
                return e.is(r.Owner)
                    ? s.get(new l("GCollaborators", "text.owner-tooltip")).replace("%username", this.getFullUserName())
                    : s
                          .get(new l("GCollaborators", e.hasPermission(a) ? "text.can-edit-tooltip" : "text.can-comment-tooltip"))
                          .replace("%username", this.getFullUserName());
            }
            getIcon() {
                const e = this.getRole();
                return e.hasPermission(i) && !e.hasPermission(a) ? "gravit-icon-avatar-comment" : null;
            }
        };
    };
