module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(106);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "modify.detachFromPath"),
            (r.TITLE = new GObject.GLocaleKey("GDetachFromPathAction", "title")),
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
                return "structure/modify";
            }),
            (r.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-detach-from-path" : null;
            }),
            (r.prototype.isEnabled = function () {
                if (!a.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (e) for (var t = 0; t < e.length; ++t) if (e[t] instanceof GObject.GText && e[t].hasPathAttached()) return true;
                return false;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getIndividualSelection() : null,
                    i = [];
                if (n) for (var a = 0; a < n.length; ++a) n[a] instanceof GObject.GText && n[a].hasPathAttached() && i.push(n[a]);
                t.beginTransaction();
                try {
                    var r = e.getScene();
                    i.forEach(function (e) {
                        r.visitLinks(e, function (t) {
                            t instanceof GObject.GPathBase && r.unlink(e, t);
                        });
                    });
                } finally {
                    t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (r.prototype.toString = function () {
                return "[Object GDetachFromPathAction]";
            }),
            (module.exports = r));
    };
