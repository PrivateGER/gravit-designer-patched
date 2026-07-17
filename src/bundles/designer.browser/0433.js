module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(38));
        const {
                ShareRoles,
                defaultUserSettings: { share: { defaults: { public: { role } = {}, private: { role: defaultPrivateRole } = {} } = {} } = {} } = {},
            } = require(10 /* designerConfig */),
            GShareRole = require(1067),
            GPermissions = require(1070),
            roleExtraGrants = require(1071);
        function GShareRoleFactory() {
            throw "No instantiate";
        }
        ((GShareRoleFactory.makeFromShare = function (share) {
            const shareRole = GShareRoleFactory._makeFromShareRole(share.getRole());
            return (shareRole && (shareRole.applyPermissions(new GPermissions(share.getPermissions())), shareRole.lockPermissions()), shareRole);
        }),
            (GShareRoleFactory.makeFromShareRole = function (roleDefinition) {
                const shareRole = GShareRoleFactory._makeFromShareRole(roleDefinition);
                return (shareRole.lockPermissions(), shareRole);
            }),
            (GShareRoleFactory._makeFromShareRole = function (roleDefinition) {
                if (!roleDefinition) return null;
                const { id, name, description, status, pro, permissions: rawPermissions = {}, assignable, level } = roleDefinition,
                    shareRole = new GShareRole({
                        id: id,
                        level: level,
                        name: name,
                        description: description,
                        status: status,
                        pro: pro,
                        permissions: new GPermissions(rawPermissions),
                        assignable: assignable,
                    }),
                    extraGrants = roleExtraGrants[shareRole.id];
                return (extraGrants && shareRole.grant(extraGrants), shareRole);
            }),
            (GShareRoleFactory.ROLES = {
                get ALL() {
                    return Object.values(ShareRoles).map((roleDefinition) => GShareRoleFactory.makeFromShareRole(roleDefinition));
                },
                get DEFAULT_PUBLIC_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(role);
                },
                get DEFAULT_PRIVATE_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(defaultPrivateRole);
                },
                get NO_ACCESS_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(ShareRoles.NoAccess);
                },
                get APPROVER_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(ShareRoles.Approver);
                },
                get OWNER_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(ShareRoles.Owner);
                },
                get VIEWER_ROLE() {
                    return GShareRoleFactory.makeFromShareRole(ShareRoles.Viewer);
                },
            }),
            (module.exports = GShareRoleFactory));
    };
