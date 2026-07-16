module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.detachsymbol"),
            (s.TITLE = new GObject.GLocaleKey("GDetachSymbolAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_SYMBOL;
            }),
            (s.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-detach-symbol" : null;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.F8];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getIndividualSelection();
                    if (t && t.length)
                        for (var n = t.length - 1; n >= 0; --n) {
                            var i = t[n];
                            if (i instanceof GObject.GSymbol && !i.isMaster() && i.getMasterSymbol()) return true;
                        }
                }
                return false;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = GObject.GNode.order(e.getIndividualSelection().slice());
                if (t.length && t[0].getScene()) {
                    e.beginTransaction();
                    try {
                        for (var n = 0, i = 0; i < t.length; ++i) {
                            var a = t[i];
                            a instanceof GObject.GSymbol && a.detach() && n++;
                        }
                    } finally {
                        e.commitTransaction(
                            GObject.GLocale.get(new GObject.GLocaleKey("GDetachSymbolAction", "text.number-detached")).replace(
                                "%number",
                                n > 1 ? "s" : ""
                            )
                        );
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GDetachSymbolAction]";
            }),
            (module.exports = s));
    };
