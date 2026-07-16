module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = (require(9 /* String */), require(47), require(64));

            function o() {}
            (IsFiniteNonNegativeNumber.inherit(o, IsFiniteNonNegativeNumber),
                (o.import = function (e, t) {
                    var i = new FileReader();
                    ((i.onload = function () {
                        var e = i.result;
                        if (e.length > r.maxImgDataUrlLength) t("Size limit exceeded");
                        else {
                            var n = new Image();
                            ((n.onload = function () {
                                var i = n.naturalWidth,
                                    o = n.naturalHeight;
                                o > r.maxImgLinearDimension || i > r.maxImgLinearDimension || i * o > r.maxImgAreaDots
                                    ? t("Size limit exceeded")
                                    : t(null, e, i, o);
                            }),
                                (n.src = e));
                        }
                    }),
                        (i.onerror = function () {
                            (i.abort(), console.log("File error"));
                        }),
                        e instanceof Uint8Array && (e = new Blob([e])),
                        i.readAsDataURL(e));
                }),
                (module.exports = o));
        };
