module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(193), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            s = require(106),
            GSystemDialog = require(44);
        function c() {}
        (GObject.GObject.inherit(c, s),
            (c.ID = "modify.ouline"),
            (c.TITLE = new GObject.GLocaleKey("GOutlineAction", "title")),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (c.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (c.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F5];
            }),
            (c.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    t = false;
                if (e) for (var n = 0; !t && n < e.length; ++n) e[n] instanceof GObject.GImage || !e[n].hasMixin(GObject.GVertexSource) || (t = true);
                return t;
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-convert-to-outline" : null;
            }),
            (c.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getIndividualSelection() : null,
                    i = [];
                if (n)
                    for (var r = 0; r < n.length; ++r) {
                        var s = n[r];
                        s.hasMixin(GObject.GVertexSource) && i.push(s);
                    }
                i.length &&
                    GSystemDialog.prompt(
                        this._dialogPromptMessage(),
                        (e) => {
                            if (e) {
                                var n,
                                    r,
                                    s = parseFloat(e);
                                if (isNaN(s) || !isFinite(s) || GObject.GMath.isEqualEps(s, 0))
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GOutlineAction", "text.invalid-value")));
                                else {
                                    t.beginTransaction();
                                    try {
                                        try {
                                            r = new Set();
                                            for (var c = 0; c < i.length; ++c) {
                                                var d = i[c].getParent();
                                                d && r.add(d);
                                            }
                                            ((0, Utils.blockChanges)(t, r), (n = []));
                                            for (c = 0; c < i.length; ++c) {
                                                var u = i[c],
                                                    p = u.getParent();
                                                if (p) {
                                                    var g = u.getNext(),
                                                        h = this._makeOffsetter(s, u),
                                                        f = GObject.GPathUtil.createPathFromVertexSource(h);
                                                    (f && (GObject.GElement.prototype.assignFrom.call(f, u), p.insertChild(f, g), n.push(f)),
                                                        p.removeChild(u));
                                                }
                                            }
                                        } finally {
                                            ((0, Utils.releaseChanges)(t, r), n.length && t.updateSelection(false, n));
                                        }
                                    } finally {
                                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                                    }
                                }
                            }
                        },
                        "1"
                    );
            }),
            (c.prototype._dialogPromptMessage = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GOutlineAction", "text.dialog-prompt-message"));
            }),
            (c.prototype._makeOffsetter = function (e, t) {
                var n;
                if (t.hasMixin(GObject.GStylable)) {
                    var i = t.getPaintLayers();
                    if (i) {
                        var a = i.getBorderLayers(true).pop();
                        a && (n = a.$_blc);
                    }
                }
                var r = e > 0 ? e : -e;
                return (t instanceof GObject.GPathBase && !t.isClockWise() && t.reverseOrder(), new GObject.GVertexOffsetter(t, r, true, true, 0, n));
            }),
            (c.prototype.toString = function () {
                return "[Object GOutlineAction]";
            }),
            (module.exports = c));
    };
