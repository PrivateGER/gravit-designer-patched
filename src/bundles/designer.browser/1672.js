module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26), require(125), require(126), require(114));
        const o = require(1347);
        module.exports = class {
            static setupInAppLinkReloadAppForOnce() {
                const e = function (t) {
                    let { type: n, data: i } = t;
                    if (n === o.Type.OpenInAppLink) {
                        gContainer.removeEventListener(o, e);
                        const t = i.params,
                            n = new URL(window.location.href);
                        for (let e in t) n.searchParams.set(e, t[e]);
                        window.location.href = n.toString();
                    }
                };
                gContainer.addEventListener(o, e);
            }
        };
    };
