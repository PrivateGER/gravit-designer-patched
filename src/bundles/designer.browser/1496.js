module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0));
        var o = require(803),
            designerConfig = require(10);
        const a = window && window.location && "localhost" === window.location.hostname,
            r = {
                getAppBaseUrl: function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    switch (o.nodeEnv) {
                        case "production":
                            return designerConfig.prodURL;
                        case "lts":
                            return designerConfig.ltsURL;
                        case "rc":
                            return designerConfig.rcURL;
                    }
                    return o.isBeta ? designerConfig.betaURL : e && a ? "http://localhost:9000" : designerConfig.trunkURL;
                },
            };
        exports.default = r;
    };
