module.exports = function (module, exports, require) {
        "use strict";
        (require(30), require(3));
        const { HAS_ANNOTATIONS: o } = require(10 /* designerConfig */);
        function i() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(
                this,
                {
                    isShareEnabled: false,
                    isSharing: false,
                    isPrivateSharing: false,
                    role: void 0,
                    realtimeCollaborators: [],
                    edit: true,
                    save: true,
                    export: true,
                    inspect: true,
                    comment: !!o,
                    copyPaste: true,
                    isDocumentTabManagementEnabled: true,
                },
                e
            );
        }
        ((i.prototype.isDocumentTabManagementEnabled = true),
            (i.prototype.isShareEnabled = false),
            (i.prototype.isSharing = false),
            (i.prototype.isPrivateSharing = false),
            (i.prototype.role = void 0),
            (i.prototype.realtimeCollaborators = []),
            (i.prototype.edit = true),
            (i.prototype.saveAs = true),
            (i.prototype.export = true),
            (i.prototype.inspect = true),
            (i.prototype.comment = !!o),
            (i.prototype.copyPaste = true),
            (i.prototype.toString = function () {
                return "Object [GApplicationState]";
            }),
            (module.exports = i));
    };
