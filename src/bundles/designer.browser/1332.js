module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            a = require(53),
            GPlatform = require(15),
            designerConfig = require(10),
            GSaveAction = require(40),
            c = _interopRequireDefault(require(44 /* GSystemDialog */)),
            GAnnotationsSidebar = require(567),
            GCategory = require(18),
            p = require(31);
        const g = require(358),
            h = require(607);
        function f() {}
        (GObject.GObject.inherit(f, p),
            (f.ID = "edit.delete"),
            (f.TITLE = new GObject.GLocaleKey("GDeleteAction", "title")),
            (f.prototype._isConfirmWindowDisplaying = false),
            (f.prototype.getId = function () {
                return f.ID;
            }),
            (f.prototype.getTitle = function () {
                return f.TITLE;
            }),
            (f.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (f.prototype.getGroup = function () {
                return "ccp";
            }),
            (f.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.REMOVE];
            }),
            (f.prototype.getAdditionalShortcuts = function () {
                var e = [];
                return (
                    GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.OSX_IOS
                        ? e.push([GPlatform.GKey.Constant.DELETE])
                        : e.push([GPlatform.GKey.Constant.BACKSPACE]),
                    e
                );
            }),
            (f.prototype.isEnabled = function () {
                var e = gDesigner.getActiveDocument();
                if (this._isConfirmWindowDisplaying) return false;
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t) for (var n = 0; n < t.length; ++n) if (t[n] instanceof GObject.GItem || t[n] instanceof GObject.GLayer) return true;
                }
                return false;
            }),
            (f.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e.getEditor(),
                    n = e.getActiveStylesList(),
                    o = gDesigner.getMouseOverContext();
                if (designerConfig.HAS_ANNOTATIONS && gDesigner.getRightSidebars().getActiveSidebar() === GAnnotationsSidebar.ID) {
                    var r = t.getSelection().filter((e) => g.canDeleteAnnotation(e));
                    r.length &&
                        (this._setIsConfirmWindowDisplaying(true),
                        c.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-remove")),
                            (e) => {
                                (e &&
                                    gDesigner.getActiveDocument() &&
                                    gDesigner.getActiveDocument().getEditor() === t &&
                                    g.removeAnnotations(r, r[0].getParent(), GObject.GLocale.get(this.getTitle())),
                                    this._setIsConfirmWindowDisplaying(false));
                            },
                            null,
                            null,
                            null,
                            true,
                            true
                        ));
                } else if (o.context && (n.Fill || n.Border || n.Effect)) {
                    var u = null,
                        p = null,
                        m = t.getSelection();
                    if (o.context === h.FillPropertiesPanel) ((u = n.Fill), (p = "fill"));
                    else if (o.context === h.BorderPropertiesPanel) ((u = n.Border), (p = "border"));
                    else {
                        if (o.context !== h.EffectPropertiesPanel) return void t.deleteSelection();
                        ((u = n.Effect), (p = "effect"));
                    }
                    a.GEditor.tryRunTransaction(
                        e.getScene(),
                        function () {
                            (0, GSaveAction.iterateEqualStyleLayers)(p, u, m, function (e) {
                                e.getParent().removeChild(e);
                            });
                        },
                        GObject.GLocale.get(f.TITLE)
                    );
                } else t.deleteSelection();
            }),
            (f.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-delete" : "";
            }),
            (f.prototype._setIsConfirmWindowDisplaying = function (e) {
                this._isConfirmWindowDisplaying = e;
            }),
            (f.prototype.toString = function () {
                return "[Object GDeleteAction]";
            }),
            (module.exports = f));
    };
