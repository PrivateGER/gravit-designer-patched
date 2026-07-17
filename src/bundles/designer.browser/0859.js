module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1244),
            GContainer = require(85),
            { Runtime, msTeamsMode } = require(10 /* designerConfig */),
            { storeVendor } = require(803),
            l = "darwin",
            c = "win32",
            d = "linux";
        class u {
            static getRuntimeCode() {
                const e = u.getRuntime();
                return e && e.code;
            }
            static getRuntime() {
                let e;
                if (msTeamsMode) e = Runtime.TeamsApp;
                else if (gContainer.getRuntime() === GContainer.Runtime.PWA) ((e = Runtime.PWA), storeVendor === o.GooglePlay && (e = Runtime.PWAPlayStore));
                else if (gContainer.getRuntime() === GContainer.Runtime.Browser) e = Runtime.Browser;
                else if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                    var t = gContainer.getPlatform();
                    ((e = t === l ? Runtime.Mac : t === c ? Runtime.Windows : t === d ? Runtime.Linux : t),
                        storeVendor && (storeVendor === o.Apple ? (e = Runtime.AppleStore) : storeVendor === o.Windows && (e = Runtime.WindowsStore)));
                } else
                    gContainer.getRuntime() === GContainer.Runtime.Chrome
                        ? ((e = Runtime.ChromeApp), storeVendor === o.ChromeWeb && (e = Runtime.ChromeWebStore))
                        : gContainer.getRuntime() === GContainer.Runtime.IPad && (e = Runtime.iPadOS);
                return e;
            }
        }
        module.exports = u;
    };
