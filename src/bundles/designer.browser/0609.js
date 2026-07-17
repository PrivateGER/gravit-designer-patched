module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GEditor = require(53);
        const GCategory = require(18),
            GElementAction = require(106);
        function GSelectByAction(id, title) {
            (GElementAction.call(this), (this._id = id), (this._title = title));
        }
        (GObject.GObject.inherit(GSelectByAction, GElementAction),
            (GSelectByAction.EmptyValue = {}),
            (GSelectByAction.EmptyPattern = {}),
            (GSelectByAction.prototype._id = null),
            (GSelectByAction.prototype._title = null),
            (GSelectByAction.prototype.getId = function () {
                return this._id;
            }),
            (GSelectByAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GSelectByAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_SELECT_SAME;
            }),
            (GSelectByAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getSelection();
                if (!selection || !selection.length) return false;
                return this._createPattern(selection) !== GSelectByAction.EmptyPattern;
            }),
            (GSelectByAction.prototype._createPattern = function (elements) {
                const count = elements && elements.length;
                if (!count) return GSelectByAction.EmptyPattern;
                const firstValue = this._getValue(elements[0]);
                if (firstValue === GSelectByAction.EmptyValue) return GSelectByAction.EmptyPattern;
                for (let o = 1; o < count; o++) {
                    const element = elements[o],
                        value = this._getValue(element);
                    if (value === GSelectByAction.EmptyValue) return GSelectByAction.EmptyPattern;
                    if (!this._matches(firstValue, value)) return GSelectByAction.EmptyPattern;
                }
                return firstValue;
            }),
            (GSelectByAction.prototype._matches = function (patternA, patternB) {
                return patternA !== GSelectByAction.EmptyPattern && patternB !== GSelectByAction.EmptyPattern && GObject.GUtil.equals(patternA, patternB, true);
            }),
            (GSelectByAction.prototype._getValue = function (element) {
                throw "Not implemented";
            }),
            (GSelectByAction.prototype.execute = function () {
                const activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument && activeDocument.getScene(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getSelection();
                if (!scene || !selection || !selection.length) return;
                const pattern = this._createPattern(selection);
                if (pattern === GSelectByAction.EmptyPattern) return;
                const matchedElements = [];
                (scene.accept((element) => {
                    if (element instanceof GObject.GElement && !element.hasMixin(GObject.GAnnotation)) {
                        const elementPattern = this._createPattern([element]);
                        this._matches(pattern, elementPattern) && matchedElements.push(element);
                    }
                }),
                    matchedElements.length > 0 &&
                        GEditor.GEditor.tryRunTransaction(
                            scene,
                            () => {
                                editor.updateSelection(false, matchedElements);
                            },
                            GObject.GLocale.get(this.getTitle())
                        ));
            }),
            (GSelectByAction.prototype.toString = function () {
                return "[Object GSelectByAction]";
            }),
            (module.exports = GSelectByAction));
    };
