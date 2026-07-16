module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.default = async function (e, t, n, o) {
                var i = void 0 !== window.dataLayer ? window.dataLayer : [],
                    s = n;
                (i.push({ version: "3.15.0" }),
                    i.push({ gtmLocation: s }),
                    i.push({ hardware: u() }),
                    await (0, GSaveAction._tryAndCatch)(async () => {
                        if (o && !o.isAnonymous()) {
                            customDimensions && customDimensions.forEach((e) => dataLayer.push({ [e]: void 0 }));
                            const { type: e = "EWOSU", token } = o;
                            i.push({ [e]: token });
                        }
                    }));
                var c = a.default.getRuntimeCode();
                (i.push({ installType: c }), i.push({ event: "INIT_GTM_EVENT" }));
            }),
            require(8 /* Symbol */),
            require(4),
            require(32),
            require(33));
        var GObject = require(1),
            a = o(require(859)),
            GSaveAction = require(40),
            s = require(803);
        const { GA: { customDimensions } = {}, GoogleTagManagerSettings } = require(10 /* designerConfig */);
        window.dataLayer = [];
        const d = GoogleTagManagerSettings.getContainerId(s.nodeEnv);
        !(function (e, t, n, o, i) {
            ((e[o] = e[o] || []), e[o].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }));
            var a = t.getElementsByTagName(n)[0],
                r = t.createElement(n);
            ((r.async = true), (r.src = "https://www.googletagmanager.com/gtm.js?id=" + i));
        })(window, document, "script", "dataLayer", d);
        const u = () => {
            switch (GObject.GSystem.hardware) {
                case GObject.GSystem.Hardware.Desktop:
                    return "desktop";
                case GObject.GSystem.Hardware.Tablet:
                    return "tablet";
                case GObject.GSystem.Hardware.Phone:
                    return "phone";
                default:
                    return "unknown";
            }
        };
    };
