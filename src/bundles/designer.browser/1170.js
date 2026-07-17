module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            SidebarsIds = require(198),
            GAnnotationsSidebar = require(567),
            GCategory = require(18),
            GAction = require(31),
            GSidebars = require(395);
        function GToggleSidebarAction(sidebar) {
            this._sidebar = sidebar;
        }
        (GObject.GObject.inherit(GToggleSidebarAction, GAction),
            (GToggleSidebarAction.ID = "view.toggle-sidebar"),
            (GToggleSidebarAction.TITLE = new GObject.GLocaleKey("GToggleSidebarAction", "title")),
            (GToggleSidebarAction.prototype._sidebar = null),
            (GToggleSidebarAction.prototype.getId = function () {
                return GToggleSidebarAction.ID + "." + this._sidebar.getId();
            }),
            (GToggleSidebarAction.prototype.getTitle = function () {
                return GObject.GLocale.get(GToggleSidebarAction.TITLE).replace("%s", GObject.GLocale.get(this._sidebar.getTitle()));
            }),
            (GToggleSidebarAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (GToggleSidebarAction.prototype.getGroup = function () {
                return "view-sidebars";
            }),
            (GToggleSidebarAction.prototype.isCheckable = function () {
                return true;
            }),
            (GToggleSidebarAction.prototype.isChecked = function () {
                return this._sidebar.getId() === this._getSidebars().getActiveSidebar();
            }),
            (GToggleSidebarAction.prototype.getShortcut = function () {
                switch (this._sidebar.getId()) {
                    case SidebarsIds.SidebarsIds.GOutlineSidebar:
                        return [GPlatform.GKey.Constant.OPTION, "1"];
                    case SidebarsIds.SidebarsIds.GInspectorSidebar:
                        return [GPlatform.GKey.Constant.OPTION, "2"];
                    default:
                        return null;
                }
            }),
            (GToggleSidebarAction.prototype.execute = function () {
                (this.isChecked()
                    ? (this._getSidebars().setActiveSidebar(null), gDesigner.setPartVisible(this._getSidebars().getSidebarsPart(), false))
                    : (this._getSidebars().setActiveSidebar(this._sidebar.getId()),
                      gDesigner.setPartVisible(this._getSidebars().getSidebarsPart(), true)),
                    GSidebars.setOrientationStateInSetting(this._sidebar.getOrientation(), this.isChecked()),
                    this._sidebar.getId() === GAnnotationsSidebar.ID && gDesigner.getToolbar().updateCommentToggleStatus());
            }),
            (GToggleSidebarAction.prototype._getSidebars = function () {
                switch (this._sidebar.getOrientation()) {
                    case GSidebars.Orientation.Left:
                        return gDesigner.getLeftSidebars();
                    case GSidebars.Orientation.Right:
                        return gDesigner.getRightSidebars();
                }
            }),
            (GToggleSidebarAction.prototype.isVisible = function () {
                return this._sidebar.isVisible();
            }),
            (GToggleSidebarAction.prototype.toString = function () {
                return "[Object GToggleSidebarAction]";
            }),
            (module.exports = GToggleSidebarAction));
    };
