module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            GCategory = require(18),
            s = require(106);
        function l() {}
        (GObject.GObject.inherit(l, s),
            (l.ID = "modify.createnestedcompound"),
            (l.TITLE = new GObject.GLocaleKey("GCreateNestedCompoundAction", "title")),
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
                return "structure-boolean";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.ALT_LEFT, "M"];
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-nested-compound" : "";
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection(),
                        n = 0;
                    if (t && t.length)
                        for (var i = 0; i < t.length; ++i) {
                            if ((t[i] instanceof GObject.GCompoundShape && n++, n >= 2)) return true;
                        }
                }
                return false;
            }),
            (l.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = GObject.GNode.order(e.getIndividualSelection().slice());
                e.beginTransaction();
                try {
                    for (var n, i = [], r = new Set(), s = 0; s < t.length; ++s) {
                        (l = t[s]) instanceof GObject.GCompoundShape && (n ? (i.push(l), r.add(l.getParent())) : (n = l));
                    }
                    if (i.length > 0) {
                        try {
                            (0, GSaveAction.blockChanges)(e, r, null, n);
                            for (s = 0; s < i.length; ++s) {
                                var l;
                                ((l = i[s]).getParent().removeChild(l), n.appendChild(l));
                            }
                        } finally {
                            (0, GSaveAction.releaseChanges)(e, r, null, n);
                        }
                        e.updateSelection(false, [n]);
                    }
                } finally {
                    e.commitTransaction("Create nested compound");
                }
            }),
            (l.prototype.toString = function () {
                return "[Object GCreateNestedCompoundAction]";
            }),
            (module.exports = l));
    };
