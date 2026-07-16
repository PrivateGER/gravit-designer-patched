module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.split-path"),
            (s.TITLE = new GObject.GLocaleKey("GSplitPathAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (s.prototype.getGroup = function () {
                return "structure/path";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "J"];
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-split-path" : null;
            }),
            (s.prototype.isEnabled = function () {
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t) for (var n = 0; n < t.length; ++n) if (t[n] instanceof GObject.GCompoundPath) return true;
                }
                return false;
            }),
            (s.prototype.execute = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = e.getSelection().slice();
                if (t && t.length) {
                    e.beginTransaction();
                    try {
                        for (var n = [], i = 0; i < t.length; ++i) {
                            var a = t[i];
                            if (a instanceof GObject.GCompoundPath) {
                                var s = new GObject.GRectangle();
                                GObject.GElement.prototype.assignFrom.call(s, a);
                                var l = e.splitCompoundPath(a);
                                if (l && l.length)
                                    for (var c = 0; c < l.length; ++c) {
                                        var d = l[c];
                                        (GObject.GElement.prototype.assignFrom.call(d, s), n.push(d));
                                    }
                            }
                        }
                        n.length && e.updateSelection(false, n);
                    } finally {
                        e.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GSplitPathAction]";
            }),
            (module.exports = s));
    };
