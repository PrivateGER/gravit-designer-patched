module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.destroy = function () {
                throw new Error("not implemented");
            }),
                (module.exports = i));
        };
