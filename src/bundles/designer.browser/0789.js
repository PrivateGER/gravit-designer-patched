module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = exports.NoAccessId = exports.CloudToGoogleRoleMap = void 0));
        var designerConfig = require(10),
            a = _interopRequireDefault(require(788));
        const r = (exports.NoAccessId = "NoAccess"),
            s = (exports.CloudToGoogleRoleMap = {
                [designerConfig.ShareRoles.Viewer.id]: a.default.Reader,
                [designerConfig.ShareRoles.Developer.id]: a.default.Commenter,
                [designerConfig.ShareRoles.Reviewer.id]: a.default.Commenter,
                [designerConfig.ShareRoles.CoAuthor.id]: a.default.Writer,
                [designerConfig.ShareRoles.Owner.id]: a.default.Owner,
                [designerConfig.ShareRoles.NoAccess.id]: r,
            });
        exports.default = s;
    };
