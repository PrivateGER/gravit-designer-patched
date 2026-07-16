module.exports = function (module, exports, require) {
        "use strict";
        function o(e) {
            Object.assign(this, e);
        }
        (require(30 /* polyfill:Object */),
            require(3),
            (o.prototype.def = false),
            (o.prototype.id = null),
            (o.prototype.sidebar = null),
            (o.prototype.icon = null),
            (o.prototype.panel = null),
            (o.prototype.toolbar = null),
            (o.prototype.activate = function () {}),
            (o.prototype.deactivate = function () {}),
            (o.prototype.toString = function () {
                return "[Object GTouchTool]";
            }),
            (o.APPEARANCE_TOUCH_TOOL = new o({
                id: "appearance",
                icon: "gravit-icon-touch-appearance-panel",
                panel: ".appearance-property-panel",
                panelWidth: "380px",
                toolbar: ".appearance-toolbar",
            })),
            (module.exports = o));
    };
