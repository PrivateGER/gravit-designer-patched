module.exports = function (module, exports, require) {
            var n = require(17),
                r = require(68);

            function o(e) {
                (n.call(this), (this._value = e && e instanceof Array ? e.slice() : [0, 0, 0]));
            }
            (require(50).inherit("H", o, n),
                (o.prototype.clone = function () {
                    return new o(this._value);
                }),
                (o.prototype.toScreen = function (e) {
                    return r.hsvToRGB(this._value, e);
                }),
                (o.prototype.toHumanString = function () {
                    return "hsv " + this._value[0] + "," + this._value[1] + "," + this._value[2];
                }),
                (o.prototype.toString = function () {
                    return "[Object GHSVColor]";
                }),
                (module.exports = o));
        };
