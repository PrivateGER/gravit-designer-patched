module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(394);
        function a() {
            i.call(this);
        }
        (GObject.GObject.inherit(a, i),
            (a.prototype.getOrientation = function () {
                return null;
            }),
            (a.prototype.getMinimumWidth = function () {
                throw new Error("Not implemented.");
            }),
            (a.prototype.getDefaultWidth = function () {
                throw new Error("Not implemented.");
            }),
            (a.prototype.getSettingWidth = function () {
                return gDesigner.getSetting("sidebars_width_".concat(this.getId()), this.getDefaultWidth());
            }),
            (a.prototype.isResizeable = function () {
                return false;
            }),
            (a.prototype.isDeactivatable = function () {
                return true;
            }),
            (a.prototype.relayout = function () {}),
            (a.prototype.resize = function () {}),
            (a.prototype.init = function (e) {}),
            (a.prototype.activate = function () {}),
            (a.prototype.isToolAllowed = function (e) {
                return true;
            }),
            (a.prototype.deactivate = function () {}),
            (a.prototype.getTouchTools = function (e) {
                let { disableContextSensitive: t = false } = e;
                return null;
            }),
            (a.prototype.updateBadge = function (e) {
                return false;
            }),
            (a.prototype.toString = function () {
                return "[Object GSidebar]";
            }),
            (module.exports = a));
    };
