module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = (require(28 /* GStylable */), require(11)),
                o = require(90),
                a = require(1410),
                s = require(5),
                l = require(338),
                h = require(7),
                A = require(182),
                c = require(1411),
                p = function (e) {
                    ((this._doc = e), (this._lines = []));
                };

            function u(e) {
                r.extend(this, e);
            }

            function d(e) {
                ((this.origin = e), (this.align = null), (this.words = []));
            }

            function g(e) {
                this.lines = e;
            }
            ((p.Mode = {
                FILL: 0,
                STROKE: 1,
                BOTH: 2,
            }),
                IsFiniteNonNegativeNumber.inherit(p, o),
                (p.prototype.add = function (e) {
                    var t = this._lines.slice(-1).pop();
                    t
                        ? t.origin.mapPoint(new s(0, 0)).getY() !== e.origin.mapPoint(new s(0, 0)).getY() &&
                          ((t = new p.Line(e.origin)), this._lines.push(t))
                        : ((t = new p.Line(e.origin)), this._lines.push(t));
                    t.add(e);
                }),
                (p.prototype.setOrigin = function (e) {
                    this.origin = e;
                }),
                (p.prototype.getCurrentWord = function () {
                    var e = this._lines.slice(-1).pop();
                    if (e) return e.words.slice(-1).pop();
                }),
                (p.prototype.write = function (e) {
                    (this.origin && (this.origin.write(e), e.writeln()),
                        e.writeln("BT"),
                        new p.Paragraph(this._lines).write(e),
                        e.write("ET"));
                }),
                (u.prototype.text = ""),
                (u.prototype.mode = p.Mode.BOTH),
                (u.prototype.lineWidth = 0),
                (u.prototype.charSpacing = 0),
                (u.prototype.wordSpacing = 0),
                (u.prototype.fontReference = null),
                (u.prototype.fillColor = null),
                (u.prototype.strokeColor = null),
                (u.prototype.origin = new h()),
                (u.prototype.textLigatures = false),
                (u.prototype.textFractions = false),
                (u.prototype.script = null),
                (u.prototype.textStylisticSet = null),
                (u.prototype.textLocalizedForm = null),
                (u.prototype.append = function (e) {
                    this.text += e.text;
                }),
                (u.prototype.merge = function (e) {
                    return false;
                }),
                (p.Word = u),
                IsFiniteNonNegativeNumber.inherit(d, o),
                (d.prototype.font = null),
                (d.prototype.strokeColor = null),
                (d.prototype.fillColor = null),
                (d.prototype.charSpacing = null),
                (d.prototype.wordSpacing = null),
                (d.prototype.mode = null),
                (d.prototype.align = null),
                (d.prototype.write = function (e) {
                    r.each(
                        this.words,
                        function (t, i) {
                            (new a(i.origin).write(e),
                                e.writeln(),
                                (this.font && this.font.equals(i.fontReference)) || i.fontReference.write(e),
                                i.strokeColor &&
                                    ((this.strokeColor && this.strokeColor.equals(i.strokeColor)) || (i.strokeColor.write(e), e.writeln())),
                                i.fillColor &&
                                    ((this.fillColor && this.fillColor.equals(i.fillColor)) || (i.fillColor.write(e), e.writeln())),
                                this.charSpacing !== i.charSpacing &&
                                    (e.write(l.normalizeNumber(i.charSpacing)), e.writeSpace(), e.writeln("Tc")),
                                this.mode !== i.mode &&
                                    (e.write(i.mode),
                                    e.writeSpace(),
                                    e.writeln("Tr"),
                                    i.mode >= p.Mode.STROKE && (e.write(l.normalizeNumber(i.lineWidth)), e.writeSpace(), e.writeln("w"))),
                                (this.font = i.fontReference),
                                (this.fillColor = i.fillColor),
                                (this.strokeColor = i.strokeColor),
                                (this.charSpacing = l.normalizeNumber(i.charSpacing)),
                                (this.wordSpacing = l.normalizeNumber(i.wordSpacing)),
                                (this.mode = i.mode));
                            var n = {
                                letterSpacing: this.charSpacing,
                                kerning: true,
                                features: {
                                    liga: i.textLigatures,
                                    rlig: i.textLigatures,
                                    frac: i.textFractions,
                                    stylisticSet: i.textStylisticSet,
                                },
                            };
                            (i.script && "auto" !== i.script && (n.script = i.script),
                                i.textLocalizedForm && (n.language = i.textLocalizedForm));
                            var r = this.font.getFont().encode(i.text, n);
                            new c(new A(r)).write(e);
                        }.bind(this)
                    );
                }),
                (d.prototype.add = function (e) {
                    var t = this.words.slice(-1).pop();
                    ((t && t.merge(e)) || this.words.push(e), this.align || (this.align = e.align));
                }),
                (p.Line = d),
                (g.prototype.write = function (e) {
                    var t = {
                        font: null,
                        fillColor: null,
                        strokeColor: null,
                        charSpacing: 0,
                        wordSpacing: 0,
                        mode: 0,
                    };
                    r.each(this.lines, function (i, n) {
                        (r.each(Object.keys(t), function (e, i) {
                            n[i] = t[i];
                        }),
                            n.write(e),
                            r.each(Object.keys(t), function (e, i) {
                                t[i] = n[i];
                            }));
                    });
                }),
                (p.Paragraph = g),
                (module.exports = p));
        };
