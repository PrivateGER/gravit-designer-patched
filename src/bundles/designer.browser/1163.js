module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = exports.dateToVersionFormat = exports.dateToFilePreviewFormat = void 0));
        const { GLocale } = require(1 /* GObject */),
            i = (e) =>
                GLocale.toLocaleDate(e, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                });
        exports.dateToVersionFormat = i;
        const a = (e) =>
            GLocale.toLocaleDate(new Date(e), {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
            });
        exports.dateToFilePreviewFormat = a;
        exports.default = { dateToVersionFormat: i, dateToFilePreviewFormat: a };
    };
