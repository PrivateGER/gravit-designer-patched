module.exports = function (module, exports, require) {
            var n = require(24),
                r = require(383);

            function o() {
                r.call(this);
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, r),
                (o.prototype.getAnnotationOptions = function () {
                    return n.annotationHandles.preserveAspectRatio;
                }),
                (module.exports = new o()));
        };
