module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function GMagnificationAction(zoomLevel) {
            this._zoomLevel = zoomLevel;
        }
        (GObject.GObject.inherit(GMagnificationAction, GAction),
            (GMagnificationAction.ID = "view.magnification"),
            (GMagnificationAction.ZOOM_LEVELS = [6, 12, 25, 50, 66, 100, 150, 200, 300, 400, 800, 1600, 3200, 6400, 12800, 25600]),
            (GMagnificationAction.prototype._zoomLevel = null),
            (GMagnificationAction.prototype.getId = function () {
                return GMagnificationAction.ID + "." + this._zoomLevel.toString();
            }),
            (GMagnificationAction.prototype.getTitle = function () {
                let zoomLabel = this._zoomLevel.toString() + "%";
                return (
                    gDesigner.isTouchEnabled() &&
                        100 === this._zoomLevel &&
                        (zoomLabel += " (".concat(GObject.GLocale.get(new GObject.GLocaleKey("GMagnificationAction", "text.actual-size")), ")")),
                    zoomLabel
                );
            }),
            (GMagnificationAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_MAGNIFICATION;
            }),
            (GMagnificationAction.prototype.getGroup = function () {
                return "zoom/magnification-level";
            }),
            (GMagnificationAction.prototype.getShortcut = function () {
                switch (this._zoomLevel) {
                    case 50:
                        return [GPlatform.GKey.Constant.META, "5"];
                    case 100:
                        return [GPlatform.GKey.Constant.META, "1"];
                    case 400:
                        return [GPlatform.GKey.Constant.META, "4"];
                    case 800:
                        return [GPlatform.GKey.Constant.META, "8"];
                    default:
                        return null;
                }
            }),
            (GMagnificationAction.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (GMagnificationAction.prototype.execute = function () {
                var zoomFactor = this._zoomLevel / 100,
                    view = gDesigner.getWindows().getActiveWindow().getView(),
                    scene = view.getScene(),
                    paintBBox = scene ? scene.getPaintBBox() : null,
                    zoomCenter = paintBBox && !paintBBox.isEmpty() ? paintBBox.getSide(GObject.GRect.Side.CENTER) : new GObject.GPoint(0, 0);
                if (view.getViewConfiguration().multiPageView) {
                    var activePage = scene.getActivePage();
                    activePage && (zoomCenter = zoomCenter.add(activePage.getPosition(true)));
                }
                view.zoomAtCenter(zoomCenter, zoomFactor);
            }),
            (GMagnificationAction.prototype.toString = function () {
                return "[Object GMagnificationAction]";
            }),
            (module.exports = GMagnificationAction));
    };
