module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106),
            GClipAction = require(809);
        function GMaskWithShapeAction() {}
        (GObject.GObject.inherit(GMaskWithShapeAction, r),
            (GMaskWithShapeAction.ID = "modify.mask-with-shape"),
            (GMaskWithShapeAction.TITLE = new GObject.GLocaleKey("GMaskWithShapeAction", "title")),
            (GMaskWithShapeAction.prototype.getId = function () {
                return GMaskWithShapeAction.ID;
            }),
            (GMaskWithShapeAction.prototype.getTitle = function () {
                return GMaskWithShapeAction.TITLE;
            }),
            (GMaskWithShapeAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GMaskWithShapeAction.prototype.getGroup = function () {
                return "structure-group";
            }),
            (GMaskWithShapeAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "M"];
            }),
            (GMaskWithShapeAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-mask-with-shape" : "";
            }),
            (GMaskWithShapeAction.prototype.isEnabled = function () {
                return GClipAction.prototype.isEnabled.call(this);
            }),
            (GMaskWithShapeAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor();
                editor.beginTransaction();
                try {
                    if ((GClipAction.prototype.execute.call(this, true, true), editor.getSelection().length > 0)) {
                        var selectedElement = editor.getSelection()[0];
                        selectedElement.setProperty("name", GObject.GLocale.get(new GObject.GLocaleKey("GMaskWithShapeAction", "text.mask")));
                        var paintLayers = selectedElement.getPaintLayers();
                        if (paintLayers) {
                            for (
                                var grayscaleGradient = (function (e) {
                                        e: for (var t = e.getFirstChild(); null !== t; t = t.getNext())
                                            if (
                                                t instanceof GObject.GStylable.FillPaintLayer &&
                                                t.getProperty("_pt") instanceof GObject.GLinearGradient
                                            ) {
                                                var n = t.getProperty("_pt");
                                                n;
                                                t: for (var i = 0; i < n.getStops().length; ++i) {
                                                    var a = n.getStops()[i].color.toScreenCSS();
                                                    if ("#FFFFFF" !== a && "#000000" !== a) {
                                                        n = null;
                                                        break t;
                                                    }
                                                }
                                                if (n) break e;
                                            }
                                        return n;
                                    })(paintLayers),
                                    existingFillLayers = [],
                                    paintLayer = paintLayers.getFirstChild();
                                null !== paintLayer;
                                paintLayer = paintLayer.getNext()
                            )
                                paintLayer instanceof GObject.GStylable.FillPaintLayer && existingFillLayers.push(paintLayer);
                            for (var l = 0; l < existingFillLayers.length; ++l) paintLayers.removeChild(existingFillLayers[l]);
                            if ((paintLayers.insertChild(new GObject.GStylable.FillPaintLayer(GObject.GRGBColor.WHITE)), grayscaleGradient)) {
                                grayscaleGradient = grayscaleGradient.clone();
                                for (l = 0; l < grayscaleGradient.getStops().length; ++l) {
                                    var c = grayscaleGradient.getStops()[l];
                                    "#FFFFFF" === c.color.toScreenCSS() && (c.opacity = 0);
                                }
                                var overlayEffect = new GObject.GOverlayEffect();
                                (selectedElement.getEffects().appendChild(overlayEffect), overlayEffect.setProperties(["alm", "opc", "pat"], [true, 1, grayscaleGradient]));
                            }
                        }
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (GMaskWithShapeAction.prototype.toString = function () {
                return "[Object GMaskWithShapeAction]";
            }),
            (module.exports = GMaskWithShapeAction));
    };
