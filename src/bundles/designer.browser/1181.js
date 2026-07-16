module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106),
            GClipAction = require(809);
        function l() {}
        (GObject.GObject.inherit(l, r),
            (l.ID = "modify.mask-with-shape"),
            (l.TITLE = new GObject.GLocaleKey("GMaskWithShapeAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (l.prototype.getGroup = function () {
                return "structure-group";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "M"];
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-mask-with-shape" : "";
            }),
            (l.prototype.isEnabled = function () {
                return GClipAction.prototype.isEnabled.call(this);
            }),
            (l.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor();
                e.beginTransaction();
                try {
                    if ((GClipAction.prototype.execute.call(this, true, true), e.getSelection().length > 0)) {
                        var t = e.getSelection()[0];
                        t.setProperty("name", GObject.GLocale.get(new GObject.GLocaleKey("GMaskWithShapeAction", "text.mask")));
                        var n = t.getPaintLayers();
                        if (n) {
                            for (
                                var i = (function (e) {
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
                                    })(n),
                                    a = [],
                                    r = n.getFirstChild();
                                null !== r;
                                r = r.getNext()
                            )
                                r instanceof GObject.GStylable.FillPaintLayer && a.push(r);
                            for (var l = 0; l < a.length; ++l) n.removeChild(a[l]);
                            if ((n.insertChild(new GObject.GStylable.FillPaintLayer(GObject.GRGBColor.WHITE)), i)) {
                                i = i.clone();
                                for (l = 0; l < i.getStops().length; ++l) {
                                    var c = i.getStops()[l];
                                    "#FFFFFF" === c.color.toScreenCSS() && (c.opacity = 0);
                                }
                                var d = new GObject.GOverlayEffect();
                                (t.getEffects().appendChild(d), d.setProperties(["alm", "opc", "pat"], [true, 1, i]));
                            }
                        }
                    }
                } finally {
                    e.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (l.prototype.toString = function () {
                return "[Object GMaskWithShapeAction]";
            }),
            (module.exports = l));
    };
