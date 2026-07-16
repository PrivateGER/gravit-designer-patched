module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(11),
                o = require(90),
                a = require(560),
                s = require(1144),
                l = function () {
                    this.hashmap = {};
                };
            (IsFiniteNonNegativeNumber.inherit(l, o),
                (l.prototype.putText = function (e, t) {
                    this.put(e, s.newFromString(t));
                }),
                (l.prototype.put = function (e, t) {
                    this.hashmap[e] = new a(t);
                }),
                (l.prototype.get = function (e) {
                    var t = this.hashmap[e];
                    return t ? t.getValue() : null;
                }),
                (l.prototype.remove = function (e) {
                    var t = this.hashmap[e];
                    return (delete this.hashmap[e], t ? t.getValue() : null);
                }),
                (l.prototype.length = function () {
                    return Object.keys(this.hashmap).length || 0;
                }),
                (l.prototype.write = function (e) {
                    (e.write("<<"),
                        r.each(this.hashmap, function (t, i) {
                            (e.write(t), e.write(" "), i.write(e));
                        }),
                        e.write(">>"));
                }),
                (module.exports = l));
        };
