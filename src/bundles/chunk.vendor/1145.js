module.exports = function (module, exports) {
            function i(e) {
                this.name = e;
            }
            ((i.prototype.write = function (e) {
                throw "Not implemented";
            }),
                (i.prototype.length = function () {
                    throw "Not implemented";
                }),
                (i.prototype.getBuffer = function () {
                    throw "Not implemented";
                }),
                (i.prototype.toString = function () {
                    return "[Object GPDFFilter]";
                }),
                (module.exports = i));
        };
