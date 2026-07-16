module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            GShareManager = require(1374),
            GCommonNames = require(1483);
        function s() {
            var e = new GShareManager();
            e.initLanguage(function () {
                ((o = e.init(GCommonNames)),
                    i &&
                        o.then(() => {
                            l(i);
                        }));
            });
        }
        function l(e) {
            gDesigner && gDesigner.setPwaEvent ? gDesigner.setPwaEvent(e) : (window.__pwaEvent__ = e);
        }
        ("complete" === document.readyState ? s() : window.addEventListener("load", s),
            window.addEventListener("beforeinstallprompt", function (e) {
                if (e && "beforeinstallprompt" === e.type) {
                    if (!o) return void (i = e);
                    o.then(() => {
                        l(e);
                    });
                }
            }),
            window.addEventListener("appinstalled", (e) => {
                e && "appinstalled" === e.type && location.reload();
            }));
    };
