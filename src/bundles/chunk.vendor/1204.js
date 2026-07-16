module.exports = function (module, exports, require) {
            var GFont = require(108),
                r = require(11),
                o = require(7);

            function a() {}
            ((a.Transform = {
                sameTransformation: function (e, t) {
                    var i = e.decomposed(),
                        n = t.decomposed();
                    return o.equals(i.skew, n.skew) && o.equals(i.rotate, n.rotate) && o.equals(i.scale, n.scale);
                },
            }),
                (a.Font = {
                    Weight: ["ExtraLight", "ExtraBold", "SemiBold", "Thin", "Light", "Regular", "Medium", "Bold", "Heavy"],
                    getWeight: function (e) {
                        e = e.toLowerCase();
                        for (var t, i = a.Font.Weight, r = 0; r < i.length; r++) {
                            var o = i[r];
                            if (-1 !== e.indexOf(o.toLowerCase())) {
                                t = GFont.Weight[o];
                                break;
                            }
                        }
                        return (
                            t ||
                                (t =
                                    -1 !== e.indexOf("bolder")
                                        ? GFont.Weight.ExtraBold
                                        : -1 !== e.indexOf("bold")
                                          ? GFont.Weight.Bold
                                          : GFont.Weight.Regular),
                            t
                        );
                    },
                    getStyle: function (e) {
                        return -1 !== (e = e.toLowerCase()).indexOf("italic") ? GFont.Style.Italic : GFont.Style.Normal;
                    },
                }),
                (a.Word = {
                    sameFormatting: function (e, t, i, n) {
                        return ["fontWeight", "fontStyle", "fontColor", "fontFamily", "fontSize"].concat(i || []).every(function (i) {
                            return !(!n || -1 === n.indexOf(i)) || r.equals(e[i], t[i], true);
                        });
                    },
                }),
                (a.prototype.createTexts = function (e) {}),
                (a.prototype.mergeTexts = function (e, t) {}),
                (module.exports = a));
        };
