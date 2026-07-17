module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(865 /* polyfill:Number */), require(193), require(3), require(4), require(13), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            GAction = require(106),
            GSystemDialog = require(44);
        function SimplifyAction() {}
        (GObject.GObject.inherit(SimplifyAction, GAction),
            (SimplifyAction.ID = "modify.simplify"),
            (SimplifyAction.TITLE = new GObject.GLocaleKey("GSimplifyAction", "title")),
            (SimplifyAction.prototype.getId = function () {
                return SimplifyAction.ID;
            }),
            (SimplifyAction.prototype.getTitle = function () {
                return SimplifyAction.TITLE;
            }),
            (SimplifyAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (SimplifyAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (SimplifyAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-simplity" : null;
            }),
            (SimplifyAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "S"];
            }),
            (SimplifyAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var individualSelection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null,
                    hasSimplifiable = false;
                if (individualSelection) for (var n = 0; !hasSimplifiable && n < individualSelection.length; ++n) individualSelection[n] instanceof GObject.GImage || !individualSelection[n].hasMixin(GObject.GVertexSource) || (hasSimplifiable = true);
                return hasSimplifiable;
            }),
            (SimplifyAction.prototype.execute = function () {
                var document = gDesigner.getActiveDocument(),
                    editor = document ? document.getEditor() : null,
                    selection = editor ? editor.getIndividualSelection() : null,
                    scene = document ? document.getScene() : null,
                    elements = [];
                if (selection)
                    for (var s = 0; s < selection.length; ++s) {
                        var c = selection[s];
                        c.hasMixin(GObject.GVertexSource) && elements.push(c);
                    }
                if (elements.length) {
                    var content = $("<div></div>")
                        .append(
                            $("<div>")
                                .gInputSlider({ min: 0, max: 100, step: 1 })
                                .attr("name", "tolerance")
                                .css("width", "50%")
                                .gInputSlider("value", 10)
                                .on("change", function (event) {
                                    if (scene) {
                                        var toleranceValue = Number(scene.stringToPoint($(this).gInputSlider("value")).toFixed(0));
                                        $(this).parent().find("input").val(toleranceValue);
                                    }
                                })
                        )
                        .append(
                            $("<span>")
                                .css("width", "50%")
                                .append(
                                    $("<input>")
                                        .attr("type", "text")
                                        .css("width", "3em")
                                        .val(10)
                                        .on("change", function (event) {
                                            var toleranceValue = Number(scene.stringToPoint($(this).val()).toFixed(0));
                                            $(this).parent().find(".g-input-slider").gInputSlider("value", toleranceValue);
                                        })
                                )
                                .append($("<label>").html(GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.tolerance"))))
                        );
                    GSystemDialog.prompt(
                        GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.simplification")),
                        (confirmed) => {
                            if (confirmed) {
                                var tolerance = parseFloat(content.find(".g-input-slider").gInputSlider("value"));
                                if (isNaN(tolerance) || !isFinite(tolerance) || GObject.GMath.isEqualEps(tolerance, 0))
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.invalid-value")));
                                else {
                                    editor.beginTransaction();
                                    try {
                                        for (var newElements = [], parentSet = new Set(), c = 0; c < elements.length; ++c) {
                                            var u = elements[c].getParent();
                                            u && parentSet.add(u);
                                        }
                                        try {
                                            (0, Utils.blockChanges)(editor, parentSet);
                                            for (c = 0; c < elements.length; ++c) {
                                                var p = elements[c],
                                                    g = p.getParent(),
                                                    h = p.getNext(),
                                                    f = this._makeSimplified(tolerance, p),
                                                    m = GObject.GPathUtil.createPathFromVertexSource(f);
                                                (m && (GObject.GElement.prototype.assignFrom.call(m, p), g.insertChild(m, h), newElements.push(m)),
                                                    g.removeChild(p));
                                            }
                                        } finally {
                                            ((0, Utils.releaseChanges)(editor, parentSet), newElements.length && editor.updateSelection(false, newElements));
                                        }
                                    } finally {
                                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                                    }
                                }
                            }
                        },
                        content
                    );
                }
            }),
            (SimplifyAction.prototype._makeSimplified = function (tolerance, vertexSource) {
                var absTolerance = tolerance > 0 ? tolerance : -tolerance;
                return new GObject.GVertexSimplifier(vertexSource).simplify(absTolerance / 2, false, true);
            }),
            (SimplifyAction.prototype.toString = function () {
                return "[Object GSimplifyAction]";
            }),
            (module.exports = SimplifyAction));
    };
