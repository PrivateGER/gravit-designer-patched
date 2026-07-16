module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = (require(15 /* GPlatform */), require(18 /* GCategory */)),
            a = require(106);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "modify.resetinstance"),
            (r.TITLE = new GObject.GLocaleKey("GResetInstanceAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return i.CATEGORY_MODIFY_SYMBOL;
            }),
            (r.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (r.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-reset-instance" : null;
            }),
            (r.prototype.isEnabled = function () {
                if (!a.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getIndividualSelection();
                    if (t && t.length)
                        for (var n = t.length - 1; n >= 0; --n) {
                            var i = t[n];
                            if (!i.isLocked()) {
                                if (i instanceof GObject.GSymbol && !i.isLocked() && !i.inSync()) return true;
                                var r = null;
                                if (
                                    (r = i.findParent(function (e) {
                                        return e instanceof GObject.GSymbol;
                                    })) &&
                                    !r.inSync(i, true)
                                )
                                    return true;
                            }
                        }
                }
                return false;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = GObject.GNode.order(e.getIndividualSelection().slice());
                e.beginTransaction();
                try {
                    for (var n = 0; n < t.length; ++n) {
                        var i = t[n];
                        if ((i instanceof GObject.GSymbol && !i.isLocked() && !i.inSync() && i.synchronize(), !(i instanceof GObject.GSymbol))) {
                            var a = null;
                            (a = i.findParent(function (e) {
                                return e instanceof GObject.GSymbol;
                            })) &&
                                (a.inSync(i, true) || a.synchronize(i));
                        }
                    }
                } finally {
                    e.commitTransaction(GObject.GLocale.get(r.TITLE));
                }
            }),
            (r.prototype.toString = function () {
                return "[Object GResetInstanceAction]";
            }),
            (module.exports = r));
    };
