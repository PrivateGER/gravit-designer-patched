module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(106);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "modify.reverse-order"),
            (r.TITLE = new GObject.GLocaleKey("GReverseOrderAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (r.prototype.getGroup = function () {
                return "structure/path";
            }),
            (r.prototype.isEnabled = function () {
                if (!a.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    t = false;
                if (e) for (var n = 0; !t && n < e.length; ++n) e[n] instanceof GObject.GPath && (t = true);
                return t;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getSelection() : null,
                    i = [];
                if (n)
                    for (var a = 0; a < n.length; ++a) {
                        var r = n[a];
                        r instanceof GObject.GPath && i.push(r);
                    }
                if (i.length) {
                    t.beginTransaction();
                    try {
                        for (a = 0; a < i.length; ++a) i[a].reverseOrder();
                    } finally {
                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (r.prototype.toString = function () {
                return "[Object GReverseOrderAction]";
            }),
            (module.exports = r));
    };
