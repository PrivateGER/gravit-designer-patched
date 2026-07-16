module.exports = function (module, exports) {
            function i() {}
            ((i.Command = {
                Move: 1,
                Line: 2,
                Curve: 3,
                Curve2: 4,
                Close: 5,
            }),
                (i.prototype.command = null),
                (i.prototype.x = null),
                (i.prototype.y = null),
                (module.exports = i));
        };
