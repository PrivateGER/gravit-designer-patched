module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GAction = require(31);
        function GProFeatureAction(action) {
            this._action = action;
        }
        (GObject.GObject.inherit(GProFeatureAction, GAction),
            (GProFeatureAction.prototype._action = null),
            (GProFeatureAction.prototype.getId = function () {
                return this._action.getId();
            }),
            (GProFeatureAction.prototype.getTitle = function () {
                return this._action.getTitle();
            }),
            (GProFeatureAction.prototype.getIcon = function () {
                return this._action.getIcon();
            }),
            (GProFeatureAction.prototype.getCategory = function () {
                return this._action.getCategory();
            }),
            (GProFeatureAction.prototype.getGroup = function () {
                return this._action.getGroup();
            }),
            (GProFeatureAction.prototype.getGroupIcon = function () {
                return this._action.getGroupIcon();
            }),
            (GProFeatureAction.prototype.getShortcut = function () {
                return this._action.getShortcut();
            }),
            (GProFeatureAction.prototype.isShortcutGlobal = function () {
                return this._action.isShortcutGlobal();
            }),
            (GProFeatureAction.prototype.isRegisterShortcut = function () {
                return this._action.isRegisterShortcut();
            }),
            (GProFeatureAction.prototype.getAdditionalShortcuts = function () {
                return this._action.getAdditionalShortcuts();
            }),
            (GProFeatureAction.prototype.isEnabled = function () {
                return this._action.isEnabled();
            }),
            (GProFeatureAction.prototype.isCheckable = function () {
                return this._action.isCheckable();
            }),
            (GProFeatureAction.prototype.isChecked = function () {
                return this._action.isChecked();
            }),
            (GProFeatureAction.prototype.isAvailable = function (context) {
                return this._action.isAvailable(context);
            }),
            (GProFeatureAction.prototype.execute = function () {
                if (gDesigner.isEnabledProFeatures(this._action.getId())) return this._action.execute.apply(this._action, arguments);
                gDesigner.handlePROFeatureInterruption();
            }),
            (GProFeatureAction.prototype.executeFromShortcut = function () {
                return this.execute.apply(this, arguments);
            }),
            (GProFeatureAction.prototype.isPro = function () {
                return true;
            }),
            (GProFeatureAction.prototype.getTooltipArea = function () {
                return this._action.getTooltipArea();
            }),
            (GProFeatureAction.prototype.getTooltipConfig = function (area) {
                return this._action.getTooltipConfig(area);
            }),
            (GProFeatureAction.prototype.statsValue = function () {
                return this._action.statsValue();
            }),
            (GProFeatureAction.prototype.toString = function () {
                return this._action.toString();
            }),
            (module.exports = GProFeatureAction));
    };
