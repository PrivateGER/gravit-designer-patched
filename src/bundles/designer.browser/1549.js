module.exports = function (module, exports, require) {
        "use strict";
        const FilesPanelFileView = require(1550);
        function i() {}
        ((i.getRenderForFile = function (e) {
            return new FilesPanelFileView();
        }),
            (module.exports = i));
    };
