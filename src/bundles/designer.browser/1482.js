module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const o = require(1117).saveAs;
        function i() {}
        ((i.prototype.download = async function () {
            let { buffer: e, name: t, extension: n, mime: i } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            o(new Blob([e], i), "".concat(t, ".").concat(n));
        }),
            (module.exports = i));
    };
