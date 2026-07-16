module.exports = function (module, exports, require) {
        var o, i, a;
        ((i = [require(171), require(605)]),
            void 0 ===
                (a =
                    "function" ==
                    typeof (o = function (e) {
                        return (e.fn.scrollParent = function (t) {
                            var n = this.css("position"),
                                o = "absolute" === n,
                                i = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                                a = this.parents()
                                    .filter(function () {
                                        var t = e(this);
                                        return (
                                            (!o || "static" !== t.css("position")) &&
                                            i.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                                        );
                                    })
                                    .eq(0);
                            return "fixed" !== n && a.length ? a : e(this[0].ownerDocument || document);
                        });
                    })
                        ? o.apply(exports, i)
                        : o) || (module.exports = a));
    };
