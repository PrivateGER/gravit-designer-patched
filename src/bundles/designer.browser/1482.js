module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const o = require(1117 /* lib:file-saver */).saveAs;
        function i() {}
        ((i.prototype.download = async function () {
            let { buffer, name, extension, mime } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            o(new Blob([buffer], mime), "".concat(name, ".").concat(extension));
        }),
            (module.exports = i));
    };
