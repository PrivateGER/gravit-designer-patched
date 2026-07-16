module.exports = function (module, exports, require) {
            var n = require(90),
                r = require(182),
                IsFiniteNonNegativeNumber = require(0),
                a = require(338),
                s = function (e, t, i, n) {
                    ((this.top = t), (this.left = e), (this.width = i), (this.height = n));
                };
            ((s.prototype.left = null),
                (s.prototype.top = null),
                (s.prototype.width = null),
                (s.prototype.height = null),
                IsFiniteNonNegativeNumber.inherit(s, n),
                (s.prototype.relativeY = function (e) {
                    return a.normalizeNumber(this.height - e);
                }),
                (s.prototype.write = function (e) {
                    var t = new r();
                    (t.push(this.top), t.push(this.left), t.push(this.width), t.push(this.height), t.write(e));
                }),
                (module.exports = s));
        };
