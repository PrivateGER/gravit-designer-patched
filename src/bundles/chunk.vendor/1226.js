module.exports = function (module, exports, require) {
            var n = require(147),
                r = require(138),
                IsFiniteNonNegativeNumber = require(0),
                a = require(68),
                s = require(391),
                l = require(90),
                h = require(1415),
                A = require(1418),
                c = require(799),
                p = require(1419),
                u = require(1229),
                d = require(293),
                g = require(158),
                f = function (e, t) {
                    ((this._valid = true), (this._operation = t), this.load(e));
                };
            (IsFiniteNonNegativeNumber.inherit(f, l),
                (f.prototype._pattern = null),
                (f.prototype._operator = null),
                (f.prototype._operation = null),
                (f.prototype._valid = true),
                (f.prototype.isValid = function () {
                    return this._valid;
                }),
                (f.prototype.load = function (e) {
                    var t = e.color;
                    if (t instanceof r) {
                        var i;
                        if (t instanceof n) i = new h(e);
                        else {
                            if (!(t instanceof g)) return void console.log("WARN: Unsupported gradient pattern: " + t);
                            i = new A(e);
                        }
                        if (!i.isValid()) return void (this._valid = false);
                        var o = e.doc,
                            l = o.getIndirectObject(i),
                            f = o.getIndirectObject(new p(l));
                        (o.addIndirectObject(l), o.addIndirectObject(f));
                        var m = o.addResource(c.Group.Types.PATTERN, new s(f));
                        ((this._pattern = new u(m, this._operation)), (this._operator = "scn"));
                    } else {
                        if (!("string" == typeof t || t instanceof a)) return void console.log("WARN: Unsupported color: " + t);
                        var y = e.colorSpace || e.doc.getColorSpace();
                        ((this._pattern = y.parseColor(t)), (this._operator = y.operator));
                    }
                    this._operation & d.OPERATIONFLAG_STROKE && (this._operator = this._operator.toUpperCase());
                }),
                (f.prototype.getPattern = function () {
                    return this._pattern;
                }),
                (f.prototype.write = function (e) {
                    (this._pattern.write(e), e.writeln(), e.write(this._operator));
                }),
                (f.prototype.equals = function (e) {
                    return e instanceof f && this._pattern.equals(e._pattern);
                }),
                (module.exports = f));
        };
