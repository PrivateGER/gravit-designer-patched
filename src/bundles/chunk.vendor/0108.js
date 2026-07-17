module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                GLocaleKey = require(47);

            function GFont() {}
            (IsFiniteNonNegativeNumber.inherit(GFont, IsFiniteNonNegativeNumber),
                (GFont.prototype._failed = false),
                (GFont.Features = {
                    SmallCaps: "smcp",
                    Fractions: "frac",
                    Variants: "fvar",
                    StylisticSet: "stylisticset",
                    LocalizedForm: "locl",
                }),
                (GFont.SmallCapsUnicodeMap = {
                    a: "ᴀ",
                    b: "ʙ",
                    c: "ᴄ",
                    d: "ᴅ",
                    e: "ᴇ",
                    f: "ғ",
                    g: "ɢ",
                    h: "ʜ",
                    i: "ɪ",
                    j: "ᴊ",
                    k: "ᴋ",
                    l: "ʟ",
                    m: "ᴍ",
                    n: "ɴ",
                    o: "ᴏ",
                    p: "ᴘ",
                    q: "ǫ",
                    r: "ʀ",
                    s: "s",
                    t: "ᴛ",
                    u: "ᴜ",
                    v: "ᴠ",
                    w: "ᴡ",
                    x: "x",
                    y: "ʏ",
                    z: "ᴢ",
                }),
                (GFont.Style = {
                    Normal: "N",
                    Italic: "I",
                }),
                (GFont.Weight = {
                    Thin: 100,
                    ExtraLight: 200,
                    Light: 300,
                    Regular: 400,
                    Medium: 500,
                    SemiBold: 600,
                    Bold: 700,
                    ExtraBold: 800,
                    Heavy: 900,
                }),
                (GFont.WeightName = {
                    100: new GLocaleKey("GFont", "weight.thin"),
                    200: new GLocaleKey("GFont", "weight.extra-light"),
                    300: new GLocaleKey("GFont", "weight.light"),
                    400: new GLocaleKey("GFont", "weight.regular"),
                    500: new GLocaleKey("GFont", "weight.medium"),
                    600: new GLocaleKey("GFont", "weight.semi-bold"),
                    700: new GLocaleKey("GFont", "weight.bold"),
                    800: new GLocaleKey("GFont", "weight.extra-bold"),
                    900: new GLocaleKey("GFont", "weight.heavy"),
                }),
                (GFont.WeightNameItalic = {
                    100: new GLocaleKey("GFont", "weight.thin-italic"),
                    200: new GLocaleKey("GFont", "weight.extra-light-italic"),
                    300: new GLocaleKey("GFont", "weight.light-italic"),
                    400: new GLocaleKey("GFont", "weight.regular-italic"),
                    500: new GLocaleKey("GFont", "weight.medium-italic"),
                    600: new GLocaleKey("GFont", "weight.semi-bold-italic"),
                    700: new GLocaleKey("GFont", "weight.bold-italic"),
                    800: new GLocaleKey("GFont", "weight.extra-bold-italic"),
                    900: new GLocaleKey("GFont", "weight.heavy-italic"),
                }),
                (GFont.equals = function (font, otherFont) {
                    return font && otherFont
                        ? font.getFamily() === otherFont.getFamily() && font.getStyle() === otherFont.getStyle() && font.getWeight() === otherFont.getWeight()
                        : !!font == !!otherFont;
                }),
                (GFont.getFontFamilyCorrected = function (fontFamily) {
                    return "Noto Sans CS" === fontFamily ? "Noto Sans CJK SC" : "Noto Sans CT" === fontFamily ? "Noto Sans CJK TC" : fontFamily;
                }),
                (GFont.prototype.isResolved = function () {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.isEmbedded = function () {
                    return false;
                }),
                (GFont.prototype.setFailed = function (failed) {
                    this._failed = failed;
                }),
                (GFont.prototype.isFailed = function () {
                    return this._failed;
                }),
                (GFont.prototype.toFontFaceSrc = function () {
                    return null;
                }),
                (GFont.prototype.toCssProperties = function () {
                    var getStyleName = function () {
                        switch (this.getStyle()) {
                            case GFont.Style.Normal:
                                return "normal";
                            case GFont.Style.Italic:
                                return "italic";
                            default:
                                throw new Error("Unknown style");
                        }
                    }.bind(this);
                    return {
                        "font-family": this.getFamily(),
                        "font-style": getStyleName(),
                        "font-weight": this.getWeight() ? this.getWeight().toString() : null,
                    };
                }),
                (GFont.prototype.getFamily = function () {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getStyle = function () {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getWeight = function () {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getGlyphBaseline = function (fontSize) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.stringToGlyphs = function (text, x, y, fontSize, options) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getGlyphBoundingRect = function (fontSize, glyph) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getGlyphOutline = function (fontSize, x, y, glyph) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getLeftSideBearing = function (fontSize, glyph) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getMaxFontHeight = function (fontSize) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.getAdvance = function (fontSize, glyph, previousGlyph) {
                    throw new Error("Unsupported operation.");
                }),
                (GFont.prototype.hasFeature = function (feature) {
                    return false;
                }),
                (GFont.prototype.getAvailableStylisticSets = function (script) {
                    return [];
                }),
                (GFont.prototype.getAvailableLanguageSystemTags = function (script) {
                    return [];
                }),
                (module.exports = GFont));
        };
