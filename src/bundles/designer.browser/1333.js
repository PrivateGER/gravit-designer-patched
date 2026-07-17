module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function GSelectAllAction() {}
        (GObject.GObject.inherit(GSelectAllAction, GAction),
            (GSelectAllAction.ID = "edit.select-all"),
            (GSelectAllAction.TITLE = new GObject.GLocaleKey("GSelectAllAction", "title")),
            (GSelectAllAction.prototype.getId = function () {
                return GSelectAllAction.ID;
            }),
            (GSelectAllAction.prototype.getTitle = function () {
                return GSelectAllAction.TITLE;
            }),
            (GSelectAllAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GSelectAllAction.prototype.getGroup = function () {
                return "select";
            }),
            (GSelectAllAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "A"];
            }),
            (GSelectAllAction.prototype.isEnabled = function () {
                return !(!document.activeElement || !$(document.activeElement).is(":editable")) || !!gDesigner.getActiveDocument();
            }),
            (GSelectAllAction.prototype.execute = function () {
                if (
                    document.activeElement &&
                    $(document.activeElement).is(":editable") &&
                    !$(document.activeElement).is("button") &&
                    !gDesigner.isGravitIME(document.activeElement)
                )
                    document.execCommand("selectAll");
                else {
                    var editor = gDesigner.getActiveDocument().getEditor(),
                        scene = gDesigner.getActiveDocument().getScene(),
                        activePage = scene.getActivePage(),
                        isMultiPageView = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration().multiPageView,
                        selection = [];
                    (scene.accept(function (element) {
                        if (
                            element instanceof GObject.GItem &&
                            !element.hasMixin(GObject.GAnnotation) &&
                            !(element.getParent() instanceof GObject.GItem) &&
                            (element.getPage() === activePage || isMultiPageView) &&
                            !element.isLocked()
                        ) {
                            var isHidden =
                                    !element.getProperty("vis") ||
                                    element.findParent(function (ancestor) {
                                        return ancestor instanceof GObject.GBlock && !ancestor.getProperty("vis");
                                    }),
                                lockFlags = element.getProperty("plkt"),
                                isFullyLocked =
                                    lockFlags & GObject.GBlock.ProgramLck.NoEdit &&
                                    lockFlags & GObject.GBlock.ProgramLck.NoSizeChanges &&
                                    lockFlags & GObject.GBlock.ProgramLck.NoMove &&
                                    lockFlags & GObject.GBlock.ProgramLck.NoDelete;
                            isHidden || isFullyLocked || selection.push(element);
                        }
                    }),
                        editor.updateSelection(false, selection));
                }
            }),
            (GSelectAllAction.prototype.toString = function () {
                return "[Object GSelectAllAction]";
            }),
            (module.exports = GSelectAllAction));
    };
