module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.now = function () {
                return new Date().getTime();
            }),
                (module.exports = new i()));
        };
