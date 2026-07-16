module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GObject = require(1),
            a = (require(15 /* GPlatform */), require(18 /* GCategory */)),
            r = require(106);
        function s() {
            this._title = new GObject.GLocaleKey("GEditElementActon", "title");
        }
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.edit"),
            (s.prototype._title = null),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return this._title;
            }),
            (s.prototype.getCategory = function () {
                return a.CATEGORY_EDIT;
            }),
            (s.prototype.getGroup = function () {
                return "select";
            }),
            (s.prototype.getShortcut = function () {
                return null;
            }),
            (s.prototype.isEnabled = function (e) {
                if (!r.prototype.isEnabled.call(this)) return false;
                var t = false;
                if (
                    (e =
                        e || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    e.length > 0 &&
                    !gDesigner.getActiveDocument().getEditor().isInlineEditing()
                )
                    if (gDesigner.getToolManager().getActiveTool() != gDesigner.getToolManager().getTool(o.GSubSelectTool)) t = true;
                    else for (var n = 0; n < e.length; ++n) e[n] instanceof GObject.GText && (t = true);
                return t;
            }),
            (s.prototype.execute = function (e) {
                var t = false;
                if (
                    (e =
                        e || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    e.length > 0
                ) {
                    for (var n = 0; n < e.length && !t; ++n)
                        if (e[n] instanceof GObject.GText) {
                            var a = e[n].getGeometryBBox(),
                                r = gDesigner.getWindows().getActiveWindow(),
                                s = r ? r.getView() : null;
                            a &&
                                s &&
                                (t = gDesigner.getActiveDocument().getEditor().openInlineEditor(e[n], s, new GObject.GPoint(a.getX(), a.getY())));
                        }
                    t ||
                        gDesigner.getToolManager().getActiveTool() == gDesigner.getToolManager().getTool(o.GSubSelectTool) ||
                        gDesigner.getToolManager().activateTool(o.GSubSelectTool, null, true);
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GEditElementActon]";
            }),
            (module.exports = s));
    };
