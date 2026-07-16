module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(41));
        var designerConfig = require(10);
        class i {
            static getElements() {
                return i.isUnsplashIntegrationEnabled() ? designerConfig.ELEMENTS : designerConfig.ELEMENTS.filter((e) => "element.image" !== e.path);
            }
            static isUnsplashIntegrationEnabled() {
                return designerConfig.ENABLE_UNSPLASH_INTEGRATION;
            }
        }
        module.exports = i;
    };
