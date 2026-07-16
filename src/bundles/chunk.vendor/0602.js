module.exports = function (module, exports, require) {
            var n = require(560),
                r = require(90),
                o = require(11),
                a = function () {
                    this._objects = [];
                };
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(a, r),
                (a.prototype.peek = function () {
                    return this._objects[this._objects.length - 1];
                }),
                (a.prototype.forEach = function (e) {
                    this._objects.forEach(e);
                }),
                (a.prototype.add = function (e, t) {
                    var i = new n(e);
                    null != t ? this._objects.splice(t, 0, i) : this._objects.push(i);
                }),
                (a.prototype.isEmpty = function () {
                    return 0 === this.size();
                }),
                (a.prototype.size = function () {
                    return this._objects.length;
                }),
                (a.prototype.write = function (e) {
                    if (this._objects.length) {
                        var t = this;
                        o.each(this._objects, function (i, n) {
                            n.isEmpty() || (n.write(e), i !== t._objects.length - 1 && e.writeln());
                        });
                    }
                }),
                (module.exports = a));
        };
