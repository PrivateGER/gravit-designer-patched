module.exports = function (module, exports, require) {
        "use strict";
        function o() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this, { fileCache: true, collaboratorsCache: true }, e);
        }
        (require(30),
            require(3),
            (o.NO_CACHE_INVALIDATION = Object.freeze(new o({ fileCache: false, collaboratorsCache: false }))),
            (o.prototype.collaboratorsCache = true),
            (o.prototype.fileCache = true),
            (o.prototype.toString = function () {
                return "[Object GInvalidationOptions]";
            }),
            (module.exports = o));
    };
