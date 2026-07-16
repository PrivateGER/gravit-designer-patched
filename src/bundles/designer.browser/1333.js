module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.select-all"),
            (s.TITLE = new GObject.GLocaleKey("GSelectAllAction", "title")),
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
                return [GPlatform.GKey.Constant.META, "A"];
            }),
            (s.prototype.isEnabled = function () {
                return !(!document.activeElement || !$(document.activeElement).is(":editable")) || !!gDesigner.getActiveDocument();
            }),
            (s.prototype.execute = function () {
                if (
                    document.activeElement &&
                    $(document.activeElement).is(":editable") &&
                    !$(document.activeElement).is("button") &&
                    !gDesigner.isGravitIME(document.activeElement)
                )
                    document.execCommand("selectAll");
                else {
                    var e = gDesigner.getActiveDocument().getEditor(),
                        t = gDesigner.getActiveDocument().getScene(),
                        n = t.getActivePage(),
                        i = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration().multiPageView,
                        a = [];
                    (t.accept(function (e) {
                        if (
                            e instanceof GObject.GItem &&
                            !e.hasMixin(GObject.GAnnotation) &&
                            !(e.getParent() instanceof GObject.GItem) &&
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
                        e.updateSelection(false, a));
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GSelectAllAction]";
            }),
            (module.exports = s));
    };
