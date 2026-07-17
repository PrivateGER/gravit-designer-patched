module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = (require(15 /* GPlatform */), _interopRequireDefault(require(31 /* GAction */))),
            r = (_interopRequireDefault(require(85 /* GContainer */)), _interopRequireDefault(require(18 /* GCategory */))),
            s = _interopRequireDefault(require(1173));
        function l() {}
        (GObject.GObject.inherit(l, a.default),
            (l.ID = "file.install-to-desktop"),
            (l.TITLE = new GObject.GLocaleKey("GInstallToDesktopAction", "title")),
            (l.closedInstallPWADialogDatePropName = "pwa.closed-install-pwa-dialog-date"),
            (l.installPWA3timesAWeekPropName = "pwa.show-install-dialog-3-times-a-week"),
            (l.install = function () {
                var e = gDesigner.getPwaEvent();
                e &&
                    e.prompt &&
                    e.prompt().then(function (e) {
                        let { outcome } = e;
                        "dismissed" === outcome ||
                            ("accepted" === outcome &&
                                (gContainer.removeProperty(l.installPWA3timesAWeekPropName),
                                gContainer.removeProperty(l.closedInstallPWADialogDatePropName),
                                gDesigner.closeInstallPwaDialog()));
                    });
            }),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return r.default.CATEGORY_FILE;
            }),
            (l.prototype.getGroup = function () {
                return "install";
            }),
            (l.prototype.isAvailable = function () {
                return s.default.isSupported() && !window.matchMedia("(display-mode: standalone)").matches;
            }),
            (l.prototype.isVisible = function () {
                return !window.matchMedia("(display-mode: standalone)").matches;
            }),
            (l.prototype.isEnabled = function () {
                return gDesigner.hasPwaEvent();
            }),
            (l.prototype.execute = function () {
                return l.install();
            }),
            (l.prototype.toString = function () {
                return "[Object GInstallToDesktopAction]";
            }),
            (module.exports = l));
    };
