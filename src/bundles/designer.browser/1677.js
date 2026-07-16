module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var { ipcRenderer } = require(881);
        const i = require(1349);
        function a() {}
        ((a.prototype.installUpdate = function () {
            (console.info(this.toString() + " Firing install update"), ipcRenderer.send(i.CommandInstallUpdate));
        }),
            (a.prototype.checkForUpdates = function () {
                (console.info(this.toString() + " Firing checking update"), ipcRenderer.send(i.CommandCheckForUpdates));
            }),
            (a.prototype.downloadUpdate = function () {
                (console.info(this.toString() + " Firing download update"), ipcRenderer.send(i.CommandDownloadUpdate));
            }),
            (a.prototype.on = function (e, t) {
                ipcRenderer.on(e, t);
            }),
            (a.prototype.toString = function () {
                return "[Object GElectronUpdateServiceClient]";
            }),
            (module.exports = new a()));
    };
