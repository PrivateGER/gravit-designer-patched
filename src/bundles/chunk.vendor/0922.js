module.exports = function (module, exports, require) {
            var n = require(195);
            module.exports = function (e) {
                ((e.String = function (e, t) {
                    ((this.value = t), (this.obj = e));
                }),
                    (e.String.prototype.value = null),
                    (e.String.prototype.obj = null),
                    (e.String.prototype.measure = function (e) {
                        return n.measure(this.value, e);
                    }),
                    (e.String.prototype.draw = function (e, t, i, r, o, a, s) {
                        n.draw(e, this.value, s, t, i, r, o, a);
                    }));
            };
        };
