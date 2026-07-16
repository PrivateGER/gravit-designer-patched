module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                GScenePaintConfiguration = require(133);

            function o() {
                (GScenePaintConfiguration.call(this),
                    (this.paintMode = GScenePaintConfiguration.PaintMode.Full),
                    (this.multiPageView = true),
                    (this.ignoreEffects = true),
                    (this.thumbnails = false));
            }
            (IsFiniteNonNegativeNumber.inherit(o, GScenePaintConfiguration),
                (o.prototype.isOutline = function (e) {
                    return false;
                }),
                (o.prototype.isAnnotationsVisible = function (e) {
                    return !!this.annotations;
                }),
                (o.prototype.isElementAnnotationsVisible = function (e) {
                    return !!this.annotations;
                }),
                (o.prototype.isClipToPage = function (e) {
                    return false;
                }),
                (module.exports = o));
        };
