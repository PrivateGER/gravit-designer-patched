module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GObject = require(1),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.selectbyfonttype"),
            (s.TITLE = new GObject.GLocaleKey("GSelectByFontTypeAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getGroup = function () {
                return "edit/select-by-font";
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_SELECT_SAME;
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e && e.getEditor() && e.getEditor().getSelection()) {
                    var t = this._getFontFamily();
                    return !(!t || !t.length);
                }
                return false;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = this._getFontFamily(),
                    n = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                    o = [];
                (e.getScene().acceptChildren(function (e) {
                    (e.removeFlag(GObject.GNode.Flag.Selected), e instanceof GObject.GText) &&
                        (e.getProperty("_tff") || (n && n.getFamily())) === t &&
                        o.push(e);
                }),
                    e.getEditor().updateSelection(true, o));
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-select-by-font" : "";
            }),
            (s.prototype.toString = function () {
                return "[Object GSelectByFontTypeAction]";
            }),
            (s.prototype._getFontFamily = function () {
                for (
                    var e,
                        t = gDesigner.getActiveDocument().getEditor().getSelection(),
                        n = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                        a = 0;
                    a < t.length;
                    a++
                ) {
                    var r = t[a];
                    if (r instanceof GObject.GText) {
                        var s = (o.GElementEditor.getEditor(r) || r).getProperty("_tff");
                        if ((s || (s = n && n.getFamily()), e)) {
                            if (e !== s) {
                                e = "";
                                break;
                            }
                        } else e = s;
                    }
                }
                return e;
            }),
            (module.exports = s));
    };
