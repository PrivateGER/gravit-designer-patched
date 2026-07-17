module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(193), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            GElementAction = require(106),
            GSystemDialog = require(44);
        function GOutlineAction() {}
        (GObject.GObject.inherit(GOutlineAction, GElementAction),
            (GOutlineAction.ID = "modify.ouline"),
            (GOutlineAction.TITLE = new GObject.GLocaleKey("GOutlineAction", "title")),
            (GOutlineAction.prototype.getId = function () {
                return GOutlineAction.ID;
            }),
            (GOutlineAction.prototype.getTitle = function () {
                return GOutlineAction.TITLE;
            }),
            (GOutlineAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GOutlineAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GOutlineAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F5];
            }),
            (GOutlineAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    hasVertexSource = false;
                if (selection) for (var n = 0; !hasVertexSource && n < selection.length; ++n) selection[n] instanceof GObject.GImage || !selection[n].hasMixin(GObject.GVertexSource) || (hasVertexSource = true);
                return hasVertexSource;
            }),
            (GOutlineAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-convert-to-outline" : null;
            }),
            (GOutlineAction.prototype.execute = function () {
                var document = gDesigner.getActiveDocument(),
                    editor = document ? document.getEditor() : null,
                    individualSelection = editor ? editor.getIndividualSelection() : null,
                    vertexElements = [];
                if (individualSelection)
                    for (var r = 0; r < individualSelection.length; ++r) {
                        var s = individualSelection[r];
                        s.hasMixin(GObject.GVertexSource) && vertexElements.push(s);
                    }
                vertexElements.length &&
                    GSystemDialog.prompt(
                        this._dialogPromptMessage(),
                        (inputValue) => {
                            if (inputValue) {
                                var newElements,
                                    parentsSet,
                                    offsetValue = parseFloat(inputValue);
                                if (isNaN(offsetValue) || !isFinite(offsetValue) || GObject.GMath.isEqualEps(offsetValue, 0))
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GOutlineAction", "text.invalid-value")));
                                else {
                                    editor.beginTransaction();
                                    try {
                                        try {
                                            parentsSet = new Set();
                                            for (var c = 0; c < vertexElements.length; ++c) {
                                                var d = vertexElements[c].getParent();
                                                d && parentsSet.add(d);
                                            }
                                            ((0, Utils.blockChanges)(editor, parentsSet), (newElements = []));
                                            for (c = 0; c < vertexElements.length; ++c) {
                                                var u = vertexElements[c],
                                                    p = u.getParent();
                                                if (p) {
                                                    var g = u.getNext(),
                                                        h = this._makeOffsetter(offsetValue, u),
                                                        f = GObject.GPathUtil.createPathFromVertexSource(h);
                                                    (f && (GObject.GElement.prototype.assignFrom.call(f, u), p.insertChild(f, g), newElements.push(f)),
                                                        p.removeChild(u));
                                                }
                                            }
                                        } finally {
                                            ((0, Utils.releaseChanges)(editor, parentsSet), newElements.length && editor.updateSelection(false, newElements));
                                        }
                                    } finally {
                                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                                    }
                                }
                            }
                        },
                        "1"
                    );
            }),
            (GOutlineAction.prototype._dialogPromptMessage = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GOutlineAction", "text.dialog-prompt-message"));
            }),
            (GOutlineAction.prototype._makeOffsetter = function (offset, element) {
                var borderLineCap;
                if (element.hasMixin(GObject.GStylable)) {
                    var paintLayers = element.getPaintLayers();
                    if (paintLayers) {
                        var borderLayer = paintLayers.getBorderLayers(true).pop();
                        borderLayer && (borderLineCap = borderLayer.$_blc);
                    }
                }
                var absoluteOffset = offset > 0 ? offset : -offset;
                return (element instanceof GObject.GPathBase && !element.isClockWise() && element.reverseOrder(), new GObject.GVertexOffsetter(element, absoluteOffset, true, true, 0, borderLineCap));
            }),
            (GOutlineAction.prototype.toString = function () {
                return "[Object GOutlineAction]";
            }),
            (module.exports = GOutlineAction));
    };
