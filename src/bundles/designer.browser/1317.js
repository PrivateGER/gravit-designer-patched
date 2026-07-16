module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GOutlineAction = require(1185);
        function a() {}
        (GObject.GObject.inherit(a, GOutlineAction),
            (a.ID = "modify.offset"),
            (a.TITLE = new GObject.GLocaleKey("GOffsetAction", "title")),
            (a.prototype.getId = function () {
                return a.ID;
            }),
            (a.prototype.getTitle = function () {
                return a.TITLE;
            }),
            (a.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (a.prototype.getShortcut = function () {
                return null;
            }),
            (a.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-expand-shrink" : null;
            }),
            (a.prototype._dialogPromptMessage = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GOffsetAction", "text.dialog-prompt-message"));
            }),
            (a.prototype._makeOffsetter = function (e, t) {
                var n;
                if (t.hasMixin(GObject.GStylable)) {
                    var i = t.getPaintLayers();
                    if (i) {
                        var a = i.getBorderLayers(true).pop();
                        a && (n = a.$_blc);
                    }
                }
                return (
                    (t = GObject.GPathUtil.makeClockWise(t)),
                    e > 0 ? new GObject.GVertexOffsetter(t, e, false, true, 0, n) : new GObject.GVertexOffsetter(t, -e, true, false, 0, n)
                );
            }),
            (a.prototype._dialogAlertMessage = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GOffsetAction", "text.invalid-value"));
            }),
            (a.prototype.toString = function () {
                return "[Object GOffsetAction]";
            }),
            (module.exports = a));
    };
