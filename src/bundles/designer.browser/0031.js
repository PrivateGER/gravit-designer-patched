module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            Icons = _interopRequireDefault(require(844));
        function GAction() {}
        (GObject.GObject.inherit(GAction, GObject.GObject),
            (GAction.SHORTCUT_DELAY = 500),
            (GAction.getActionShortcutHint = function (shortcut, options) {
                return shortcut ? GPlatform.GKey.shortcutToString(shortcut, options) : null;
            }),
            (GAction.prototype.getId = function () {
                throw new Error("Not Supported");
            }),
            (GAction.prototype.getTitle = function () {
                throw new Error("Not Supported");
            }),
            (GAction.prototype.getFullTitle = function () {
                return this.getTitle();
            }),
            (GAction.prototype.getInfo = function () {
                return null;
            }),
            (GAction.prototype.getIcon = function () {
                return Icons.default[this.getId()] || null;
            }),
            (GAction.prototype.getCategory = function () {
                return null;
            }),
            (GAction.prototype.getGroup = function () {
                return null;
            }),
            (GAction.prototype.getGroupIcon = function () {
                return null;
            }),
            (GAction.prototype.getShortcut = function () {
                return null;
            }),
            (GAction.prototype.getShortcutHint = function (options) {
                return GAction.getActionShortcutHint(this.getShortcut(), options);
            }),
            (GAction.prototype.isShortcutGlobal = function () {
                return false;
            }),
            (GAction.prototype.isRegisterShortcut = function () {
                return null;
            }),
            (GAction.prototype.getAdditionalShortcuts = function () {
                return null;
            }),
            (GAction.prototype.isEnabled = function () {
                return true;
            }),
            (GAction.prototype.isKeyBoardEventRequiredToExecute = function () {
                return false;
            }),
            (GAction.prototype.isCheckable = function () {
                return false;
            }),
            (GAction.prototype.isChecked = function () {
                return false;
            }),
            (GAction.prototype.isAvailable = function (context) {
                return true;
            }),
            (GAction.prototype.execute = function () {
                throw new Error("Not Supported");
            }),
            (GAction.prototype.executeFromShortcut = function (event) {
                return this.execute.apply(this, arguments);
            }),
            (GAction.prototype.isPro = function () {
                return false;
            }),
            (GAction.prototype.getTooltipArea = function () {
                return null;
            }),
            (GAction.prototype.getTooltipConfig = function (area) {
                return null;
            }),
            (GAction.prototype.isVisible = function () {
                return true;
            }),
            (GAction.prototype.noHover = function () {
                return false;
            }),
            (GAction.prototype.getStyleClass = function () {
                return null;
            }),
            (GAction.prototype.statsValue = function () {
                return null;
            }),
            (GAction.prototype.toString = function () {
                return "[Object GAction]";
            }),
            (module.exports = GAction));
    };
