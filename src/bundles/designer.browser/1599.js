module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.invert-selection"),
            (s.TITLE = new GObject.GLocaleKey("GInvertSelectionAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (s.prototype.getGroup = function () {
                return "select";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "I"];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e.getScene(),
                    n = t.getActivePage(),
                    i = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration().multiPageView,
                    a = [];
                (t.accept(function (e) {
                    if (
                        e instanceof GObject.GItem &&
                        !e.hasMixin(GObject.GAnnotation) &&
                        !(e.getParent() instanceof GObject.GItem) &&
                        !e.hasFlag(GObject.GNode.Flag.Selected) &&
                        (e.getPage() === n || i) &&
                        !e.isLocked()
                    ) {
                        var t =
                                !e.getProperty("vis") ||
                                e.findParent(function (e) {
                                    return e instanceof GObject.GBlock && !e.getProperty("vis");
                                }),
                            r = e.getProperty("plkt"),
                            s =
                                r & GObject.GBlock.ProgramLck.NoEdit &&
                                r & GObject.GBlock.ProgramLck.NoSizeChanges &&
                                r & GObject.GBlock.ProgramLck.NoMove &&
                                r & GObject.GBlock.ProgramLck.NoDelete;
                        t || s || a.push(e);
                    }
                }),
                    e.getEditor().updateSelection(false, a));
            }),
            (s.prototype.toString = function () {
                return "[Object GInvertSelectionAction]";
            }),
            (module.exports = s));
    };
