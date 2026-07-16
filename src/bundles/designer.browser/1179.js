module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.join-paths"),
            (s.TITLE = new GObject.GLocaleKey("GJoinPathsAction", "title")),
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
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-join-paths" : null;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "J"];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t && t.length > 1)
                        for (var n = 0, i = 0; i < t.length; ++i)
                            if (
                                !(t[i] instanceof GObject.GImage) &&
                                ((t[i] instanceof GObject.GPathBase || t[i].hasMixin(GObject.GVertexSource)) && n++, 2 === n)
                            )
                                return true;
                }
                return false;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = e.getSelection();
                if (t && t.length) {
                    e.beginTransaction();
                    try {
                        var n = new GObject.GRectangle();
                        (GObject.GElement.prototype.assignFrom.call(n, t[0]), e.convertSelectionToPaths(true));
                        var i = e.joinPaths();
                        i && (GObject.GElement.prototype.assignFrom.call(i, n), e.updateSelection(false, [i]));
                    } finally {
                        e.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GJoinPathsAction]";
            }),
            (module.exports = s));
    };
