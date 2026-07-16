module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(19), require(4), require(13), require(32), require(38), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            r = o(require(31)),
            s = o(require(18 /* GCategory */));
        class l extends r.default {
            getId() {
                return l.ID;
            }
            getTitle() {
                return l.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_MODIFY;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.X];
            }
            isEnabled() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = t && t.getSelection();
                return !!(n && n.find((e) => e.hasMixin(GObject.GStylable)));
            }
            execute() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = t && t.getSelection();
                if (n) {
                    t.beginTransaction();
                    try {
                        n.forEach((e) => {
                            if (e.hasMixin(GObject.GStylable)) {
                                const t = e.getPaintLayers();
                                if (t) {
                                    const n = this._createPaintLayers(l.Type.Border, t),
                                        o = this._createPaintLayers(l.Type.Fill, t);
                                    (n.forEach((t) => {
                                        this._setBorderAlignment(e, t);
                                    }),
                                        t.clearLayers(),
                                        n.concat(o).forEach((e) => {
                                            t.appendChild(e);
                                        }));
                                }
                            }
                        });
                    } finally {
                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }
            _createPaintLayers(e, t) {
                const n = ["_pt", "_op", "_vs", "_bl"];
                switch (e) {
                    case l.Type.Fill:
                        return t.getBorderLayers().map((e) => {
                            const t = e.getProperties(n);
                            return new GObject.GStylable.FillPaintLayer(...t);
                        });
                    case l.Type.Border:
                        return t.getFillLayers().map((e) => {
                            const t = e.getProperties(n);
                            return new GObject.GStylable.BorderPaintLayer(...t);
                        });
                    default:
                        throw Error("Not specified type given");
                }
            }
            _setBorderAlignment(e, t) {
                e instanceof GObject.GText
                    ? t.setProperty("_ba", GObject.GStylable.BorderAlignment.Outside)
                    : e instanceof GObject.GShape
                      ? e instanceof GObject.GEllipse && e.$etp === GObject.GEllipse.Type.Arc
                          ? t.setProperty("_ba", GObject.GStylable.BorderAlignment.Center)
                          : t.setProperty("_ba", GObject.GStylable.BorderAlignment.Inside)
                      : e instanceof GObject.GPath && !e.$closed && t.setProperty("_ba", GObject.GStylable.BorderAlignment.Center);
            }
            toString() {
                return "[Object GSwapPaintLayersAction]";
            }
        }
        ((l.ID = "modify.swap-paint-layers"),
            (l.TITLE = new GObject.GLocaleKey("GSwapPaintLayersAction", "title")),
            (l.Type = { Fill: "fill", Border: "border" }),
            (module.exports = l));
    };
