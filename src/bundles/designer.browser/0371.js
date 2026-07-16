module.exports = function (module, exports, require) {
        "use strict";
        var o = require(29),
            i = require(136),
            a = require(100),
            r = require(232),
            s = require(43),
            l = require(80),
            c = require(145),
            d = require(251 /* IteratorPrototype */).IteratorPrototype,
            u = require(252),
            p = require(102),
            g = s("toStringTag"),
            h = l.set,
            f = function (e) {
                var t = l.getterFor(e ? "WrapForValidIterator" : "IteratorHelper");
                return r(i(d), {
                    next: function () {
                        var n = t(this);
                        if (e) return n.nextHandler();
                        if (n.done) return u(void 0, true);
                        try {
                            var o = n.nextHandler();
                            return n.returnHandlerResult ? o : u(o, n.done);
                        } catch (e) {
                            throw ((n.done = true), e);
                        }
                    },
                    return: function () {
                        var n = t(this),
                            i = n.iterator;
                        if (((n.done = true), e)) {
                            var a = c(i, "return");
                            return a ? o(a, i) : u(void 0, true);
                        }
                        if (n.inner)
                            try {
                                p(n.inner.iterator, "normal");
                            } catch (e) {
                                return p(i, "throw", e);
                            }
                        return (i && p(i, "normal"), u(void 0, true));
                    },
                });
            },
            m = f(true),
            y = f(false);
        (a(y, g, "Iterator Helper"),
            (module.exports = function (e, t, n) {
                var o = function (o, i) {
                    (i ? ((i.iterator = o.iterator), (i.next = o.next)) : (i = o),
                        (i.type = t ? "WrapForValidIterator" : "IteratorHelper"),
                        (i.returnHandlerResult = !!n),
                        (i.nextHandler = e),
                        (i.counter = 0),
                        (i.done = false),
                        h(this, i));
                };
                return ((o.prototype = t ? m : y), o);
            }));
    };
