module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = exports.GoogleToCloudRoleMap = void 0));
        var designerConfig = require(10),
            a = _interopRequireDefault(require(788));
        const r = (exports.GoogleToCloudRoleMap = {
            [a.default.Reader]: designerConfig.ShareRoles.Viewer.id,
            [a.default.Commenter]: designerConfig.ShareRoles.Reviewer.id,
            [a.default.Writer]: designerConfig.ShareRoles.CoAuthor.id,
            [a.default.Owner]: designerConfig.ShareRoles.Owner.id,
            [a.default.Organizer]: designerConfig.ShareRoles.CoAuthor.id,
            [a.default.FileOrganizer]: designerConfig.ShareRoles.CoAuthor.id,
        });
        exports.default = r;
    };
