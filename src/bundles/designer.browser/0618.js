module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            a,
            r = require(25),
            s = require(74),
            l = require(245),
            globalObject = require(23 /* RegExp */),
            d = require(29),
            u = require(79),
            p = require(175),
            g = require(137),
            h = require(260),
            f = require(65),
            m = require(35),
            y = require(46),
            v = require(146),
            _ = require(342),
            b = require(409).set,
            w = require(623),
            C = require(626),
            x = require(304),
            S = require(412),
            E = require(80),
            A = require(186),
            CONSTRUCTOR = require(201),
            G = require(202),
            P = CONSTRUCTOR.CONSTRUCTOR,
            D = CONSTRUCTOR.REJECTION_EVENT,
            L = CONSTRUCTOR.SUBCLASSING,
            I = E.getterFor("Promise"),
            k = E.set,
            O = A && A.prototype,
            F = A,
            R = O,
            M = globalObject.TypeError,
            N = globalObject.document,
            B = globalObject.process,
            U = G.f,
            $ = U,
            j = !!(N && N.createEvent && globalObject.dispatchEvent),
            K = function (e) {
                var t;
                return !(!y(e) || !m((t = e.then))) && t;
            },
            V = function (e, t) {
                var n,
                    o,
                    i,
                    a = t.value,
                    r = 1 === t.state,
                    s = r ? e.ok : e.fail,
                    l = e.resolve,
                    c = e.reject,
                    u = e.domain;
                try {
                    s
                        ? (r || (2 === t.rejection && Y(t), (t.rejection = 1)),
                          true === s ? (n = a) : (u && u.enter(), (n = s(a)), u && (u.exit(), (i = true))),
                          n === e.promise ? c(new M("Promise-chain cycle")) : (o = K(n)) ? d(o, n, l, c) : l(n))
                        : c(a);
                } catch (e) {
                    (u && !i && u.exit(), c(e));
                }
            },
            H = function (e, t) {
                e.notified ||
                    ((e.notified = true),
                    w(function () {
                        for (var n, o = e.reactions; (n = o.get()); ) V(n, e);
                        ((e.notified = false), t && !e.rejection && z(e));
                    }));
            },
            W = function (e, t, n) {
                var o, i;
                (j
                    ? (((o = N.createEvent("Event")).promise = t), (o.reason = n), o.initEvent(e, false, true), globalObject.dispatchEvent(o))
                    : (o = { promise: t, reason: n }),
                    !D && (i = globalObject["on" + e]) ? i(o) : "unhandledrejection" === e && C("Unhandled promise rejection", n));
            },
            z = function (e) {
                d(b, globalObject, function () {
                    var t,
                        n = e.facade,
                        o = e.value;
                    if (
                        q(e) &&
                        ((t = x(function () {
                            l ? B.emit("unhandledRejection", o, n) : W("unhandledrejection", n, o);
                        })),
                        (e.rejection = l || q(e) ? 2 : 1),
                        t.error)
                    )
                        throw t.value;
                });
            },
            q = function (e) {
                return 1 !== e.rejection && !e.parent;
            },
            Y = function (e) {
                d(b, globalObject, function () {
                    var t = e.facade;
                    l ? B.emit("rejectionHandled", t) : W("rejectionhandled", t, e.value);
                });
            },
            X = function (e, t, n) {
                return function (o) {
                    e(t, o, n);
                };
            },
            Q = function (e, t, n) {
                e.done || ((e.done = true), n && (e = n), (e.value = t), (e.state = 2), H(e, true));
            },
            J = function (e, t, n) {
                if (!e.done) {
                    ((e.done = true), n && (e = n));
                    try {
                        if (e.facade === t) throw new M("Promise can't be resolved itself");
                        var o = K(t);
                        o
                            ? w(function () {
                                  var n = { done: false };
                                  try {
                                      d(o, t, X(J, n, e), X(Q, n, e));
                                  } catch (t) {
                                      Q(n, t, e);
                                  }
                              })
                            : ((e.value = t), (e.state = 1), H(e, false));
                    } catch (t) {
                        Q({ done: false }, t, e);
                    }
                }
            };
        if (
            P &&
            ((R = (F = function (e) {
                (v(this, R), f(e), d(o, this));
                var t = I(this);
                try {
                    e(X(J, t), X(Q, t));
                } catch (e) {
                    Q(t, e);
                }
            }).prototype),
            ((o = function (e) {
                k(this, {
                    type: "Promise",
                    done: false,
                    notified: false,
                    parent: false,
                    reactions: new S(),
                    rejection: false,
                    state: 0,
                    value: null,
                });
            }).prototype = u(R, "then", function (e, t) {
                var n = I(this),
                    o = U(_(this, F));
                return (
                    (n.parent = true),
                    (o.ok = !m(e) || e),
                    (o.fail = m(t) && t),
                    (o.domain = l ? B.domain : void 0),
                    0 === n.state
                        ? n.reactions.add(o)
                        : w(function () {
                              V(o, n);
                          }),
                    o.promise
                );
            })),
            (i = function () {
                var e = new o(),
                    t = I(e);
                ((this.promise = e), (this.resolve = X(J, t)), (this.reject = X(Q, t)));
            }),
            (G.f = U =
                function (e) {
                    return e === F || void 0 === e ? new i(e) : $(e);
                }),
            !s && m(A) && O !== Object.prototype)
        ) {
            ((a = O.then),
                L ||
                    u(
                        O,
                        "then",
                        function (e, t) {
                            var n = this;
                            return new F(function (e, t) {
                                d(a, n, e, t);
                            }).then(e, t);
                        },
                        { unsafe: true }
                    ));
            try {
                delete O.constructor;
            } catch (e) {}
            p && p(O, R);
        }
        (r({ global: true, constructor: true, wrap: true, forced: P }, { Promise: F }), g(F, "Promise", false, true), h("Promise"));
    };
