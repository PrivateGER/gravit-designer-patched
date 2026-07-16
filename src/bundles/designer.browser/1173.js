module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GPlatform = require(15),
            a = o(require(85));
        class r {
            static isSupported() {
                return r.isRuntimeSupported() && r.isWebBrowserSupported() && r.isPWAEventSupported();
            }
            static isRuntimeSupported() {
                return gContainer.getRuntime() === a.default.Runtime.Browser;
            }
            static isWebBrowserSupported() {
                return (
                    GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Chrome ||
                    GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Edge
                );
            }
            static isPWAEventSupported() {
                return void 0 !== window.BeforeInstallPromptEvent;
            }
        }
        module.exports = r;
    };
