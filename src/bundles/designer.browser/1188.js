module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i() {}
        ((i.CheckingForUpdate = function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.isSilent = e.isSilent;
        }),
            GObject.GObject.inherit(i.CheckingForUpdate, GObject.GEvent),
            (i.InstallUpdate = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.isSilent = e.isSilent;
            }),
            GObject.GObject.inherit(i.InstallUpdate, GObject.GEvent),
            (i.UpdateAvailable = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.newVersion = e.newVersion),
                    (this.currentVersion = e.currentVersion),
                    (this.forceUpdate = e.forceUpdate),
                    (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.UpdateAvailable, GObject.GEvent),
            (i.UpdateError = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.error = e.error), (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.UpdateError, GObject.GEvent),
            (i.Downloading = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.percent = e.percent), (this.size = e.size), (this.newVersion = e.newVersion), (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.Downloading, GObject.GEvent),
            (i.DownloadComplete = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.newVersion = e.newVersion), (this.forceUpdate = e.forceUpdate), (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.DownloadComplete, GObject.GEvent),
            (i.AfterUpdate = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.currentVersion = e.currentVersion), (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.AfterUpdate, GObject.GEvent),
            (i.UpdateNotAvailable = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this.currentVersion = e.currentVersion), (this.isSilent = e.isSilent));
            }),
            GObject.GObject.inherit(i.UpdateNotAvailable, GObject.GEvent),
            (i.BeforeInstallUpdate = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.isSilent = e.isSilent;
            }),
            GObject.GObject.inherit(i.BeforeInstallUpdate, GObject.GEvent),
            (module.exports = i));
    };
