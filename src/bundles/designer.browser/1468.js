module.exports = function (module, exports, require) {
        "use strict";
        (require(30), require(8 /* Symbol */));
        var o = require(1469),
            designerConfig = require(10);
        module.exports = new (class {
            async register(e) {
                const t = gDesigner.getEnv();
                if ("production" === t || "trunk" === t || "lts" === t || "rc" === t) {
                    const t = (0, o.getOS)(),
                        n = gDesigner.getVersion();
                    return designerConfig.gApi.diagnostic(
                        Object.assign(
                            {
                                runtime: gContainer.getRuntime(),
                                os: t,
                                userAgent: window.navigator.userAgent,
                                version: n,
                            },
                            e
                        )
                    );
                }
            }
        })();
    };
