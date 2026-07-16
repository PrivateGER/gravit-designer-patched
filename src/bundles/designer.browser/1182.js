module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(32), require(33));
        var GObject = require(1),
            i = (require(15 /* GPlatform */), require(18 /* GCategory */), require(31));
        require(1313 /* GPaste */);
        function a() {
            this._targetPosition = null;
        }
        (GObject.GObject.inherit(a, i),
            (a.ID = "edit.paste.here"),
            (a.TITLE = new GObject.GLocaleKey("GPasteHereAction", "title")),
            (a.prototype._targetPosition = null),
            (a.prototype.getId = function () {
                return a.ID;
            }),
            (a.prototype.getTitle = function () {
                return a.TITLE;
            }),
            (a.prototype.getIcon = function () {
                return null;
            }),
            (a.prototype.getCategory = function () {
                return null;
            }),
            (a.prototype.getGroup = function () {
                return null;
            }),
            (a.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-here" : null;
            }),
            (a.prototype.getShortcut = function () {
                return null;
            }),
            (a.prototype.isAvailable = function (e) {
                return !!e && "context.menu" == e;
            }),
            (a.prototype.isEnabled = function () {
                if (document.queryCommandSupported("paste")) return true;
                var e = gDesigner.getClipboardMimeTypes();
                return !!(e && e.indexOf(GObject.GNode.MIME_TYPE) >= 0) && !!gDesigner.getActiveDocument();
            }),
            (a.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    document.execCommand("paste") ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (a.prototype.setPosition = function (e) {
                this._targetPosition = gDesigner
                    .getWindows()
                    .getActiveWindow()
                    .getView()
                    .getViewTransform(gDesigner.getActiveDocument().getScene().getActivePage())
                    .mapPoint(e);
            }),
            (a.prototype._paste = function (e, t) {
                if (e && e.length > 0) {
                    for (var n = [], i = 0; i < e.length; ++i) e[i] instanceof GObject.GElement && n.push(e[i]);
                    if ((n = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(n)).length > 0) {
                        var a = gDesigner.getActiveDocument().getEditor();
                        (n.forEach((e) => {
                            e instanceof GObject.GText &&
                                !e.getProperty("content") &&
                                (a.insertElements([e], false, true, true), e.getParent().removeChild(e));
                        }),
                            a.beginTransaction());
                        try {
                            var r;
                            (a.insertElements(n, !t, true, true, true),
                                n.forEach((e) => {
                                    var t = e.getGeometryBBox();
                                    t && (r = r ? r.united(t) : t);
                                }));
                            var s = r ? r.getX() : null,
                                l = r ? r.getY() : null,
                                c = null;
                            if (
                                (!this._targetPosition ||
                                    null === s ||
                                    (GObject.GMath.isEqualEps(this._targetPosition.getX(), s) &&
                                        GObject.GMath.isEqualEps(this._targetPosition.getY(), l)) ||
                                    (c = new GObject.GTransform(1, 0, 0, 1, this._targetPosition.getX() - s, this._targetPosition.getY() - l)),
                                c)
                            )
                                for (i = 0; i < n.length; ++i) {
                                    var d = n[i];
                                    d.hasMixin(GObject.GElement.Transform) && d.transform(c, true);
                                }
                        } finally {
                            a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                        }
                    }
                }
            }),
            (a.prototype.toString = function () {
                return "[Object GPasteHereAction]";
            }),
            (module.exports = a));
    };
