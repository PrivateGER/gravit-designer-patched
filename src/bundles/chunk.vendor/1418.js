module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(1227),
                o = require(182),
                a = require(1146),
                s = function (e) {
                    var t = e.color,
                        i = new o();
                    (i.push(t._fx),
                        i.push(t._fy),
                        i.push(0),
                        i.push(t._cx),
                        i.push(t._cy),
                        i.push(t._scale),
                        (e.coords = i),
                        r.call(this, a.Type.RADIAL, e));
                };
            (IsFiniteNonNegativeNumber.inherit(s, r), (module.exports = s));
        };
