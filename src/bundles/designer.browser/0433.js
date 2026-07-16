module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(38));
        const {
                ShareRoles,
                defaultUserSettings: { share: { defaults: { public: { role } = {}, private: { role: a } = {} } = {} } = {} } = {},
            } = require(10 /* designerConfig */),
            r = require(1067),
            s = require(1070),
            l = require(1071);
        function c() {
            throw "No instantiate";
        }
        ((c.makeFromShare = function (e) {
            const t = c._makeFromShareRole(e.getRole());
            return (t && (t.applyPermissions(new s(e.getPermissions())), t.lockPermissions()), t);
        }),
            (c.makeFromShareRole = function (e) {
                const t = c._makeFromShareRole(e);
                return (t.lockPermissions(), t);
            }),
            (c._makeFromShareRole = function (e) {
                if (!e) return null;
                const { id, name, description, status, pro, permissions: c = {}, assignable, level } = e,
                    p = new r({
                        id: id,
                        level: level,
                        name: name,
                        description: description,
                        status: status,
                        pro: pro,
                        permissions: new s(c),
                        assignable: assignable,
                    }),
                    g = l[p.id];
                return (g && p.grant(g), p);
            }),
            (c.ROLES = {
                get ALL() {
                    return Object.values(ShareRoles).map((e) => c.makeFromShareRole(e));
                },
                get DEFAULT_PUBLIC_ROLE() {
                    return c.makeFromShareRole(role);
                },
                get DEFAULT_PRIVATE_ROLE() {
                    return c.makeFromShareRole(a);
                },
                get NO_ACCESS_ROLE() {
                    return c.makeFromShareRole(ShareRoles.NoAccess);
                },
                get APPROVER_ROLE() {
                    return c.makeFromShareRole(ShareRoles.Approver);
                },
                get OWNER_ROLE() {
                    return c.makeFromShareRole(ShareRoles.Owner);
                },
                get VIEWER_ROLE() {
                    return c.makeFromShareRole(ShareRoles.Viewer);
                },
            }),
            (module.exports = c));
    };
