module.exports = function (module, exports, require) {
        "use strict";
        function GFontsProvider(providerManager) {
            this._providerManager = providerManager;
        }
        (require(20 /* polyfill:RegExp */),
            require(34),
            require(134 /* polyfill:String */),
            (GFontsProvider.Errors = { UnknownError: 0, ConnectionError: 1 }),
            (GFontsProvider.prototype._providerManager = null),
            (GFontsProvider.prototype._enabled = true),
            (GFontsProvider.prototype.addPreviews = function (fonts) {
                throw new Error("GFontsProvider.addPreviews: virtual");
            }),
            (GFontsProvider.prototype.load = function (query, offset, count, callback) {
                throw new Error("GFontsProvider.load: virtual");
            }),
            (GFontsProvider.prototype.getTotalFonts = function (query) {
                throw new Error("GFontsProvider.getTotalFonts: virtual");
            }),
            (GFontsProvider.prototype.getProviderId = function () {
                throw new Error("GFontsProvider.getProviderId: virtual");
            }),
            (GFontsProvider.prototype.resolveFont = function (family, style, weight, callback) {
                throw new Error("GFontsProvider.resolveFont: virtual");
            }),
            (GFontsProvider.prototype.isInitialized = function () {
                return true;
            }),
            (GFontsProvider.prototype.resetProvider = function () {}),
            (GFontsProvider.prototype.hasEnabler = function () {
                return false;
            }),
            (GFontsProvider.prototype.getEnabler = function () {
                return null;
            }),
            (GFontsProvider.prototype.setEnabled = function (enabled) {
                this._enabled = !!enabled;
            }),
            (GFontsProvider.prototype.isEnabled = function () {
                return this._enabled;
            }),
            (GFontsProvider.prototype._searchFilter = function (query) {
                return function (font) {
                    return query.indexOf("%") >= 0
                        ? font.family.toLowerCase().startsWith(query.replace(/%/g, ""))
                        : font.family.toLowerCase() == query.toLowerCase();
                };
            }),
            (GFontsProvider.prototype._getClosestKey = function (fonts, family, weight, style) {
                var distance,
                    minDistance = Number.POSITIVE_INFINITY;
                weight = Number(weight);
                for (var bestIndex = -1, s = 0; s < fonts.length; s++) {
                    var l = fonts[s];
                    l.family === family && ((distance = (weight - l.weight) * (weight - l.weight)), style !== l.style && (distance += 9e4), distance < minDistance && ((minDistance = distance), (bestIndex = s)));
                }
                return bestIndex;
            }),
            (module.exports = GFontsProvider));
    };
