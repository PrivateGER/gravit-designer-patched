module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(3));
        const o = require(433);
        function i() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(
                this,
                {
                    edit: false,
                    inspect: false,
                    copy: false,
                    owner: true,
                    share: false,
                    sharing: false,
                    isPrivate: false,
                    comment: false,
                    role: o.ROLES.NO_ACCESS_ROLE,
                    realtimeCollaborators: [],
                },
                e
            );
        }
        ((i.prototype.edit = false),
            (i.prototype.inspect = false),
            (i.prototype.copy = false),
            (i.prototype.owner = true),
            (i.prototype.share = false),
            (i.prototype.sharing = false),
            (i.prototype.comment = false),
            (i.prototype.role = o.ROLES.NO_ACCESS_ROLE),
            (i.prototype.isPrivate = false),
            (i.prototype.realtimeCollaborators = []),
            (i.prototype.toString = function () {
                return "Object [GShareState]";
            }),
            (module.exports = i));
    };
