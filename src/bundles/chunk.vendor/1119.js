module.exports = function (module, exports, require) {
            var n = require(12),
                r = require(6);

            function o() {
                throw new Error("No instance");
            }
            ((o.round = function (e, t) {
                return (
                    isNaN(t) && (t = 3),
                    e instanceof r
                        ? new r(o.round(e.getX()), o.round(e.getY()), o.round(e.getWidth()), o.round(e.getHeight()))
                        : Array.isArray(e)
                          ? e.map(function (e) {
                                return o.round(e, t);
                            })
                          : isNaN(e)
                            ? e
                            : n.round(e, false, t)
                );
            }),
                (module.exports = o));
        };
