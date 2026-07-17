module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            designerConfig = require(10),
            GCategory = require(18),
            c = require(106);
        function GClipAction() {
            GClipAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "tooltip-description")),
                    video: designerConfig.gApi.getRichTooltipVideoURL("Clip.mp4"),
                    learnMore: "/docs/organizing-your-designs/clipping-masking/",
                }),
            };
        }
        (GObject.GObject.inherit(GClipAction, c),
            (GClipAction.ID = "modify.clip"),
            (GClipAction.TITLE = new GObject.GLocaleKey("GClipAction", "title")),
            (GClipAction.TOOLTIP_CONFIG = null),
            (GClipAction.prototype.getId = function () {
                return GClipAction.ID;
            }),
            (GClipAction.prototype.getTitle = function () {
                return GClipAction.TITLE;
            }),
            (GClipAction.prototype.getIcon = function () {
                return "gravit-icon-clip-circle";
            }),
            (GClipAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GClipAction.prototype.getGroup = function () {
                return "structure-group";
            }),
            (GClipAction.prototype.isEnabled = function () {
                if (!c.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getIndividualSelection();
                    return selection && selection.length > 1;
                }
                return false;
            }),
            (GClipAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.META, "M"];
            }),
            (GClipAction.prototype.execute = function (reverseOrder, noTransaction) {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    scene = gDesigner.getActiveDocument().getScene(),
                    orderedElements = GObject.GNode.order(editor.getIndividualSelection().slice(), reverseOrder),
                    targetElement = orderedElements.shift();
                if (!targetElement.isLocked()) {
                    var affectedParents,
                        targetBBox = targetElement.getPaintBBox();
                    noTransaction || editor.beginTransaction();
                    try {
                        affectedParents = new Set();
                        for (var d = 0; d < orderedElements.length; ++d) affectedParents.add(orderedElements[d].getParent());
                        try {
                            (0, Utils.blockChanges)(editor, affectedParents, scene, targetElement);
                            for (d = 0; d < orderedElements.length; ++d) {
                                var u = orderedElements[d];
                                u.validateInsertion(targetElement) &&
                                    u.getPaintBBox() &&
                                    targetBBox &&
                                    u.getPaintBBox().intersectsRect(targetBBox) &&
                                    (u.getParent().removeChild(u), targetElement.appendChild(u));
                            }
                        } finally {
                            ((0, Utils.releaseChanges)(editor, affectedParents, scene, targetElement), editor.updateSelection(false, [targetElement]));
                        }
                    } finally {
                        noTransaction || editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GClipAction", "text.clip-selecion")));
                    }
                }
            }),
            (GClipAction.prototype.getTooltipConfig = function (area) {
                return area && GClipAction.TOOLTIP_CONFIG[area];
            }),
            (GClipAction.prototype.toString = function () {
                return "[Object GClipAction]";
            }),
            (module.exports = GClipAction));
    };
