module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s(e) {
            this._zoomLevel = e;
        }
        (GObject.GObject.inherit(s, r),
            (s.ID = "view.magnification"),
            (s.ZOOM_LEVELS = [6, 12, 25, 50, 66, 100, 150, 200, 300, 400, 800, 1600, 3200, 6400, 12800, 25600]),
            (s.prototype._zoomLevel = null),
            (s.prototype.getId = function () {
                return s.ID + "." + this._zoomLevel.toString();
            }),
            (s.prototype.getTitle = function () {
                let e = this._zoomLevel.toString() + "%";
                return (
                    gDesigner.isTouchEnabled() &&
                        100 === this._zoomLevel &&
                        (e += " (".concat(GObject.GLocale.get(new GObject.GLocaleKey("GMagnificationAction", "text.actual-size")), ")")),
                    e
                );
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_MAGNIFICATION;
            }),
            (s.prototype.getGroup = function () {
                return "zoom/magnification-level";
            }),
            (s.prototype.getShortcut = function () {
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
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (s.prototype.execute = function () {
                var e = this._zoomLevel / 100,
                    t = gDesigner.getWindows().getActiveWindow().getView(),
                    n = t.getScene(),
                    i = n ? n.getPaintBBox() : null,
                    a = i && !i.isEmpty() ? i.getSide(GObject.GRect.Side.CENTER) : new GObject.GPoint(0, 0);
                if (t.getViewConfiguration().multiPageView) {
                    var r = n.getActivePage();
                    r && (a = a.add(r.getPosition(true)));
                }
                t.zoomAtCenter(a, e);
            }),
            (s.prototype.toString = function () {
                return "[Object GMagnificationAction]";
            }),
            (module.exports = s));
    };
