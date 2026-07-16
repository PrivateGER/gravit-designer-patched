module.exports = function (e, t) {
            function i() {}
            ((i.prototype.now = function () {
                return new Date().getTime();
            }),
                (e.exports = new i()));
        };
