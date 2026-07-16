module.exports = function (module, exports, require) {
        var o, i, a;
        ((i = [require(171), require(605)]),
            void 0 ===
                (a =
                    "function" ==
                    typeof (o = function (e) {
                        return e.extend(e.expr[":"], {
                            data: e.expr.createPseudo
                                ? e.expr.createPseudo(function (t) {
                                      return function (n) {
                                          return !!e.data(n, t);
                                      };
                                  })
                                : function (t, n, o) {
                                      return !!e.data(t, o[3]);
                                  },
                        });
                    })
                        ? o.apply(exports, i)
                        : o) || (module.exports = a));
    };
