module.exports = function (module, exports, require) {
            var GPaintConfiguration = require(907),
                IsFiniteNonNegativeNumber = require(0),
                GLocaleKey = require(47);

            function GScenePaintConfiguration() {}
            (IsFiniteNonNegativeNumber.inherit(GScenePaintConfiguration, GPaintConfiguration),
                (GScenePaintConfiguration.PaintMode = {
                    Full: "F",
                    Fast: "S",
                    Outline: "L",
                    Output: "O",
                }),
                (GScenePaintConfiguration.PaintModeName = {
                    F: new GLocaleKey("GScenePaintConfiguration", "paint.full"),
                    S: new GLocaleKey("GScenePaintConfiguration", "paint.fast"),
                    L: new GLocaleKey("GScenePaintConfiguration", "paint.outline"),
                    O: new GLocaleKey("GScenePaintConfiguration", "paint.output"),
                }),
                (GScenePaintConfiguration.prototype.watermark = null),
                (GScenePaintConfiguration.prototype.paintMode = GScenePaintConfiguration.PaintMode.Full),
                (GScenePaintConfiguration.prototype.pixelMode = false),
                (GScenePaintConfiguration.prototype.clipToPage = false),
                (GScenePaintConfiguration.prototype.guides = true),
                (GScenePaintConfiguration.prototype.slices = true),
                (GScenePaintConfiguration.prototype.annotations = true),
                (GScenePaintConfiguration.prototype.elementAnnotations = false),
                (GScenePaintConfiguration.prototype.showResolvedAnnotations = false),
                (GScenePaintConfiguration.prototype.clipArea = null),
                (GScenePaintConfiguration.prototype.ignoreEffects = false),
                (GScenePaintConfiguration.prototype.noWebGL = false),
                (GScenePaintConfiguration.prototype.forceEffectsWhenZoomed = false),
                (GScenePaintConfiguration.prototype.enableFxCache = true),
                (GScenePaintConfiguration.prototype.clipDirty = true),
                (GScenePaintConfiguration.prototype.defaultEffectDetailLevel = null),
                (GScenePaintConfiguration.prototype.sceneBackground = true),
                (GScenePaintConfiguration.prototype.multiPageView = false),
                (GScenePaintConfiguration.prototype.ignoreRulerOffsets = false),
                (GScenePaintConfiguration.prototype.rulerLeftFill = false),
                (GScenePaintConfiguration.prototype.thumbnails = true),
                (GScenePaintConfiguration.prototype.thumbnailSize = 85),
                (GScenePaintConfiguration.prototype.pageThumbnails = false),
                (GScenePaintConfiguration.prototype.pageThumbnailSize = 85),
                (GScenePaintConfiguration.prototype.paintSharp = true),
                (GScenePaintConfiguration.prototype.isOutline = function (element) {
                    return this.paintMode === GScenePaintConfiguration.PaintMode.Outline || !(!element || !element.isOutline());
                }),
                (GScenePaintConfiguration.prototype.isAnnotationsVisible = function (element) {
                    return !!this.annotations;
                }),
                (GScenePaintConfiguration.prototype.isGuidesVisible = function (element) {
                    return !(!this.guides || !this.isAnnotationsVisible());
                }),
                (GScenePaintConfiguration.prototype.isSlicesVisible = function (element) {
                    return !(!this.slices || !this.isAnnotationsVisible());
                }),
                (GScenePaintConfiguration.prototype.isElementAnnotationsVisible = function (element) {
                    if (!this.elementAnnotations || !this.isAnnotationsVisible()) return false;
                    if (element) {
                        if (element.getProperty("rmd")) return false;
                        if (!this.showResolvedAnnotations && element.getProperty("rsv")) return false;
                    }
                    return true;
                }),
                (GScenePaintConfiguration.prototype.isClipToPage = function (element) {
                    return this.clipToPage || this.paintMode === GScenePaintConfiguration.PaintMode.Output;
                }),
                (GScenePaintConfiguration.prototype.toString = function () {
                    return "[Object GScenePaintConfiguration]";
                }),
                (module.exports = GScenePaintConfiguration));
        };
