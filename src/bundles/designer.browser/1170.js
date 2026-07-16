module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            SidebarsIds = require(198),
            GAnnotationsSidebar = require(567),
            GCategory = require(18),
            l = require(31),
            c = require(395);
        function d(e) {
            this._sidebar = e;
        }
        (GObject.GObject.inherit(d, l),
            (d.ID = "view.toggle-sidebar"),
            (d.TITLE = new GObject.GLocaleKey("GToggleSidebarAction", "title")),
            (d.prototype._sidebar = null),
            (d.prototype.getId = function () {
                return d.ID + "." + this._sidebar.getId();
            }),
            (d.prototype.getTitle = function () {
                return GObject.GLocale.get(d.TITLE).replace("%s", GObject.GLocale.get(this._sidebar.getTitle()));
            }),
            (d.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (d.prototype.getGroup = function () {
                return "view-sidebars";
            }),
            (d.prototype.isCheckable = function () {
                return true;
            }),
            (d.prototype.isChecked = function () {
                return this._sidebar.getId() === this._getSidebars().getActiveSidebar();
            }),
            (d.prototype.getShortcut = function () {
                switch (this._sidebar.getId()) {
                    case SidebarsIds.SidebarsIds.GOutlineSidebar:
                        return [GPlatform.GKey.Constant.OPTION, "1"];
                    case SidebarsIds.SidebarsIds.GInspectorSidebar:
                        return [GPlatform.GKey.Constant.OPTION, "2"];
                    default:
                        return null;
                }
            }),
            (d.prototype.execute = function () {
                (this.isChecked()
                    ? (this._getSidebars().setActiveSidebar(null), gDesigner.setPartVisible(this._getSidebars().getSidebarsPart(), false))
                    : (this._getSidebars().setActiveSidebar(this._sidebar.getId()),
                      gDesigner.setPartVisible(this._getSidebars().getSidebarsPart(), true)),
                    c.setOrientationStateInSetting(this._sidebar.getOrientation(), this.isChecked()),
                    this._sidebar.getId() === GAnnotationsSidebar.ID && gDesigner.getToolbar().updateCommentToggleStatus());
            }),
            (d.prototype._getSidebars = function () {
                switch (this._sidebar.getOrientation()) {
                    case c.Orientation.Left:
                        return gDesigner.getLeftSidebars();
                    case c.Orientation.Right:
                        return gDesigner.getRightSidebars();
                }
            }),
            (d.prototype.isVisible = function () {
                return this._sidebar.isVisible();
            }),
            (d.prototype.toString = function () {
                return "[Object GToggleSidebarAction]";
            }),
            (module.exports = d));
    };
