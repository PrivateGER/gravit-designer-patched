module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(1227),
                o = require(182),
                a = require(1146),
                s = function (e) {
                    var t = e.color,
                        i = new o();
                    (i.push(t._x0), i.push(t._y0), i.push(t._x1), i.push(t._y1), (e.coords = i), r.call(this, a.Type.AXIAL, e));
                };
            (IsFiniteNonNegativeNumber.inherit(s, r), (module.exports = s));
        };
