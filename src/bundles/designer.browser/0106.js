module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        require(3);
        var GObject = require(1),
            a = o(require(31)),
            r = o(require(567 /* GAnnotationsSidebar */)),
            s = o(require(10 /* designerConfig */));
        function l() {}
        (GObject.GObject.inherit(l, a.default),
            (l.prototype.isEnabled = function () {
                return !s.default || gDesigner.getRightSidebars().getActiveSidebar() !== r.default.ID;
            }),
            (l.prototype.toString = function () {
                return "[Object GElementAction]";
            }),
            (module.exports = l));
    };
