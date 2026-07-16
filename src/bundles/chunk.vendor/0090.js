module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.write = function (e) {}),
                (i.prototype.isEmpty = function () {
                    return false;
                }),
                (i.prototype.equals = function (e) {
                    return this === e;
                }),
                (i.prototype.toString = function () {
                    return "[Object GPDFObject]";
                }),
                (i.Container = function () {}),
                (i.Container.prototype.accept = function () {
                    throw new Error("Not Implemented");
                }),
                (i.Container.prototype.toString = function () {
                    return "[Object GPDFObject.Container]";
                }),
                (module.exports = i));
        };
