module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(1143),
                o = require(800),
                a = require(182),
                s = require(440),
                l = require(7),
                h = function (e, t, i, n, A) {
                    o.call(this, {
                        _out: null,
                        write: function (e) {
                            e.concat(this.getWriter());
                        },
                        length: function () {
                            return this.getWriter().getPosition();
                        },
                        getWriter: function () {
                            return (
                                this._out ||
                                    ((this._out = new r()),
                                    A && !A.isIdentity() && (new s(A).write(this._out), this._out.writeln()),
                                    t.write(this._out)),
                                this._out
                            );
                        },
                    });
                    var c = new a(new l().getMatrix());
                    (this.putDictionary("/Type", "/XObject"),
                        this.putDictionary("/Subtype", "/Form"),
                        this.putDictionary("/Matrix", c),
                        this.putDictionary("/BBox", n),
                        this.putDictionary("/FormType", h.FormType.DEFAULT),
                        i && this.putDictionary("/Group", i));
                };
            (IsFiniteNonNegativeNumber.inherit(h, o),
                (h.FormType = {
                    DEFAULT: 1,
                }),
                (module.exports = h));
        };
