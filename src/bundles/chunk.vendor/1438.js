module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(799),
                o = require(197),
                a = function () {
                    o.call(this);
                };
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.prototype.add = function (e, t) {
                    return this.getGroup(e).add(t);
                }),
                (a.prototype.getGroup = function (e) {
                    var t = this.get("/" + e.name);
                    return (t || ((t = new r.Group(e)), this.put("/" + e.name, t)), t);
                }),
                (module.exports = a));
        };
