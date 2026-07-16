module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1244),
            i = require(85),
            { Runtime: a, msTeamsMode: r } = require(10 /* designerConfig */),
            { storeVendor: s } = require(803),
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
                if (r) e = a.TeamsApp;
                else if (gContainer.getRuntime() === i.Runtime.PWA) ((e = a.PWA), s === o.GooglePlay && (e = a.PWAPlayStore));
                else if (gContainer.getRuntime() === i.Runtime.Browser) e = a.Browser;
                else if (gContainer.getRuntime() === i.Runtime.Electron) {
                    var t = gContainer.getPlatform();
                    ((e = t === l ? a.Mac : t === c ? a.Windows : t === d ? a.Linux : t),
                        s && (s === o.Apple ? (e = a.AppleStore) : s === o.Windows && (e = a.WindowsStore)));
                } else
                    gContainer.getRuntime() === i.Runtime.Chrome
                        ? ((e = a.ChromeApp), s === o.ChromeWeb && (e = a.ChromeWebStore))
                        : gContainer.getRuntime() === i.Runtime.IPad && (e = a.iPadOS);
                return e;
            }
        }
        module.exports = u;
    };
