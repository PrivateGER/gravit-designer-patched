module.exports = function (module, exports, require) {
        var o, i, a;
        ((i = [require(171), require(605)]),
            void 0 ===
                (a =
                    "function" ==
                    typeof (o = function (e) {
                        return (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
                    })
                        ? o.apply(exports, i)
                        : o) || (module.exports = a));
    };
