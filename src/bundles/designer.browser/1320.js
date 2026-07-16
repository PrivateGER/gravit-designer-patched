module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            s = require(106);
        function l() {}
        (GObject.GObject.inherit(l, s),
            (l.ID = "modify.converttorawpath"),
            (l.TITLE = new GObject.GLocaleKey("GConvertToRawPathAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (l.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-convert-to-raw-path" : null;
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "R"];
            }),
            (l.prototype._isValidElement = function (e) {
                if (e instanceof GObject.GPath || e instanceof GObject.GCompoundPath) {
                    var t = [];
                    if (e instanceof GObject.GCompoundPath) for (var n = e.getPaths().getFirstChild(); null !== n; n = n.getNext()) t.push(n);
                    else t = [e];
                    for (var i = 0; i < t.length; i++)
                        for (var a = t[i].getAnchorPoints().getFirstChild(); a; ) {
                            if (GObject.GPathBase.isCornerType(a.getProperty("tp"))) return true;
                            a = a.getNext();
                        }
                    return false;
                }
                return !(!e.hasMixin(GObject.GVertexSource) || e instanceof GObject.GImage || e instanceof GObject.GPathsGraph);
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t) for (var n = 0; n < t.length; ++n) if (this._isValidElement(t[n])) return true;
                }
                return false;
            }),
            (l.prototype.execute = function () {
                var e,
                    t = gDesigner.getActiveDocument(),
                    n = t ? t.getEditor() : null,
                    i = n ? n.getIndividualSelection() : null,
                    r = [],
                    s = new Set();
                if (i)
                    for (var l = 0; l < i.length; ++l) {
                        var c = i[l];
                        this._isValidElement(c) && (r.push(c), s.add(c.getParent()));
                    }
                n.beginTransaction();
                try {
                    try {
                        ((0, Utils.blockChanges)(n, s), (e = []));
                        for (l = 0; l < r.length; ++l) {
                            var d = r[l],
                                u = d.getParent(),
                                p = d.getNext(),
                                g = GObject.GPathUtil.createPathFromVertexSource(d);
                            (g && (GObject.GElement.prototype.assignFrom.call(g, d), u.insertChild(g, p), e.push(g)), u.removeChild(d));
                        }
                    } finally {
                        ((0, Utils.releaseChanges)(n, s), e.length && n.updateSelection(false, e));
                    }
                } finally {
                    n.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (l.prototype.toString = function () {
                return "[Object GConvertToRawPathAction]";
            }),
            (module.exports = l));
    };
