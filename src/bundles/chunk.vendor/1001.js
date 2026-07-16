module.exports = function (module, exports, require) {
            var n = require(22),
                r = require(159),
                o = require(122);

            function a(e) {
                throw new Error("This class cannot be instantiated");
            }
            ((a.asFlattenElement = function (e) {
                function t(e, i) {
                    if (e instanceof n) {
                        var a = e.getFirstChild();
                        for (
                            e instanceof r ? (e = new o()) : e.getParent().removeChild(e),
                                i && (e instanceof o && i instanceof o ? (e = i) : i.appendChild(e));
                            a;

                        ) {
                            var s = a.getNext();
                            ((e instanceof r || e instanceof o) && t(a, e), (a = s));
                        }
                    }
                }
                for (var i = new o(), a = e.getFirstChild(); a; ) {
                    var s = a.getNext();
                    (t(a, i), (a = s));
                }
                if (i.getFirstChild() && null === i.getFirstChild().getNext()) {
                    var l = i.getFirstChild();
                    (i.removeChild(l), (i = l));
                }
                return i;
            }),
                (module.exports = a));
        };
