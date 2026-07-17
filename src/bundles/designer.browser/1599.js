module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function GInvertSelectionAction() {}
        (GObject.GObject.inherit(GInvertSelectionAction, GAction),
            (GInvertSelectionAction.ID = "edit.invert-selection"),
            (GInvertSelectionAction.TITLE = new GObject.GLocaleKey("GInvertSelectionAction", "title")),
            (GInvertSelectionAction.prototype.getId = function () {
                return GInvertSelectionAction.ID;
            }),
            (GInvertSelectionAction.prototype.getTitle = function () {
                return GInvertSelectionAction.TITLE;
            }),
            (GInvertSelectionAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (GInvertSelectionAction.prototype.getGroup = function () {
                return "select";
            }),
            (GInvertSelectionAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "I"];
            }),
            (GInvertSelectionAction.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (GInvertSelectionAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument.getScene(),
                    activePage = scene.getActivePage(),
                    multiPageView = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration().multiPageView,
                    itemsToSelect = [];
                (scene.accept(function (item) {
                    if (
                        item instanceof GObject.GItem &&
                        !item.hasMixin(GObject.GAnnotation) &&
                        !(item.getParent() instanceof GObject.GItem) &&
                        !item.hasFlag(GObject.GNode.Flag.Selected) &&
                        (item.getPage() === activePage || multiPageView) &&
                        !item.isLocked()
                    ) {
                        var isHidden =
                                !item.getProperty("vis") ||
                                item.findParent(function (parent) {
                                    return parent instanceof GObject.GBlock && !parent.getProperty("vis");
                                }),
                            lockFlags = item.getProperty("plkt"),
                            isFullyLocked =
                                lockFlags & GObject.GBlock.ProgramLck.NoEdit &&
                                lockFlags & GObject.GBlock.ProgramLck.NoSizeChanges &&
                                lockFlags & GObject.GBlock.ProgramLck.NoMove &&
                                lockFlags & GObject.GBlock.ProgramLck.NoDelete;
                        isHidden || isFullyLocked || itemsToSelect.push(item);
                    }
                }),
                    activeDocument.getEditor().updateSelection(false, itemsToSelect));
            }),
            (GInvertSelectionAction.prototype.toString = function () {
                return "[Object GInvertSelectionAction]";
            }),
            (module.exports = GInvertSelectionAction));
    };
