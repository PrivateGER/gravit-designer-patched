module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(4), require(32), require(33));
        var GObject = require(1),
            a = require(53),
            GPlatform = require(15),
            s = o(require(31)),
            l = o(require(18 /* GCategory */));
        class c extends s.default {
            constructor(e) {
                (super(),
                    (this._type = e),
                    (this._title = new GObject.GLocaleKey("GTogglePaintLayersVisibilityAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(c.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return l.default.CATEGORY_VIEW;
            }
            getShortcut() {
                switch (this._type) {
                    case c.Type.Fill:
                        return ["F"];
                    case c.Type.Border:
                        return [GPlatform.GKey.Constant.SHIFT, "B"];
                }
            }
            isVisible() {
                return false;
            }
            isEnabled() {
                return !document.activeElement || !$(document.activeElement).is(":input");
            }
            _getSingleLevelSelection(e) {
                let t = [];
                return (
                    e.forEach((e) => {
                        if (e) {
                            const n = e.getChildren();
                            (e instanceof GObject.GLayer || t.push(e),
                                Array.isArray(n) && n.length > 0 && (t = t.concat(this._getSingleLevelSelection(n))));
                        }
                    }),
                    t
                );
            }
            _getPaintLayers(e) {
                const t = e && e.hasMixin(GObject.GStylable) && e.getPaintLayers();
                if (!t) return null;
                switch (this._type) {
                    case c.Type.Fill:
                        return t.getFillLayers();
                    case c.Type.Border:
                        return t.getBorderLayers();
                    default:
                        return null;
                }
            }
            _checkPaintLayersVisibility(e) {
                let t = false,
                    n = false;
                for (let o = 0; e.length > o && (!t || !n); o++) {
                    const i = e[o],
                        a = this._getPaintLayers(i);
                    if (Array.isArray(a))
                        for (let e = 0; a.length > e && (!t || !n); e++) {
                            a[e].getProperty("_vs") ? (n = true) : (t = true);
                        }
                }
                return { hasHiddenPaintLayers: t, hasVisiblePaintLayers: n };
            }
            _setVisibilityPaintLayersState(e, t) {
                const n = gDesigner.getActiveDocument(),
                    o = n && n.getScene();
                o &&
                    a.GEditor.tryRunTransaction(
                        o,
                        () => {
                            e.forEach((e) => {
                                e.beginUpdate();
                                const n = this._getPaintLayers(e);
                                (Array.isArray(n) &&
                                    n.forEach((e) => {
                                        e.setProperty("_vs", t);
                                    }),
                                    e.endUpdate());
                            });
                        },
                        GObject.GLocale.get(c.TITLE)
                    );
            }
            execute() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getScene(),
                    n = e && e.getEditor(),
                    o = n && n.getSelection();
                if (t) {
                    t.beginUpdate();
                    try {
                        if (Array.isArray(o) && o.length > 0) {
                            const e = this._getSingleLevelSelection(o),
                                { hasHiddenPaintLayers: t, hasVisiblePaintLayers: n } = this._checkPaintLayersVisibility(e);
                            if (!t && !n) return;
                            t && n ? this._setVisibilityPaintLayersState(e, false) : this._setVisibilityPaintLayersState(e, t);
                        }
                    } finally {
                        t.endUpdate();
                    }
                }
            }
            toString() {
                return "[Object GTogglePaintLayersVisibilityAction]";
            }
        }
        ((c.ID = "view.toggle-paint-layers-visibility"), (c.Type = { Fill: "fill", Border: "border" }), (module.exports = c));
    };
