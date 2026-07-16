module.exports = function (module, exports, require) {
        "use strict";
        function o(e) {
            if (!o.Type[e]) throw new Error("Incorrect Clour Role type");
            this._type = e;
        }
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.GCloudRole = o),
            (exports.default = void 0),
            require(3),
            (o.Type = {
                Viewer: "Viewer",
                Coauthor: "Coauthor",
                Creator: "Creator",
                Reviewer: "Reviewer",
                Approver: "Approver",
                ContentEditor: "ContentEditor",
            }),
            (o.prototype._type = null),
            (o.prototype.setRole = function (e) {
                if (!o.Type[e]) throw new Error("Incorrect Clour Role type");
                return ((this._type = e), this);
            }),
            (o.prototype.getRole = function () {
                return this._type;
            }),
            (o.prototype.toString = function () {
                return "[Object GCloudRole]";
            }));
        exports.default = o;
    };
