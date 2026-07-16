module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.paint = function (e, t) {
                throw new Error("Not implemented");
            }),
                (i.prototype.getSourceBBox = function () {
                    throw new Error("Not implemented");
                }),
                (i.prototype.execute = function (e, t, i) {}),
                (module.exports = i));
        };
