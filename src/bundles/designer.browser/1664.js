module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(41));
        var designerConfig = require(10);
        class i {
            static getElements() {
                // Only the Unsplash Photos category has a living backend (the
                // local server proxies it when UNSPLASH_ACCESS_KEY is set). The
                // elements market (shapes/stickers/icons/...) was never archived,
                // so its categories are hidden rather than shown empty.
                return i.isUnsplashIntegrationEnabled() ? designerConfig.ELEMENTS.filter((e) => "element.image" === e.path) : [];
            }
            static isUnsplashIntegrationEnabled() {
                // Set by /config.js (served by server.js) before the bundles load.
                return true === window.UNSPLASH_ENABLED;
            }
        }
        module.exports = i;
    };
