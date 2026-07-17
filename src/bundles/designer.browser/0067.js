module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = exports.TOOLTIP_AREA = exports.GRichTooltipConfig = void 0), require(290), require(3));
        const GRichTooltipConfig = (exports.GRichTooltipConfig = function (config) {
            let {
                title,
                description,
                video,
                pic,
                isPro,
                middle,
                shortcut,
                videoTimeout,
                marginLeft,
                side,
                learnMore,
                upgradeToProStatsValue,
                forceShow,
                flipHorizontal,
            } = config;
            if (!title) throw new Error("");
            ((this._title = title),
                (this._description = description),
                (this._video = video),
                (this._pic = pic),
                (this._isPro = isPro),
                (this._middle = middle),
                (this._marginLeft = marginLeft),
                (this._shortcut = shortcut),
                (this._videoTimeout = videoTimeout),
                (this._side = side),
                (this._learnMore = learnMore),
                (this._upgradeToProStatsValue = upgradeToProStatsValue),
                (this._forceShow = forceShow),
                (this._flipHorizontal = flipHorizontal));
        });
        ((GRichTooltipConfig.from = function (config) {
            return new GRichTooltipConfig(config);
        }),
            (GRichTooltipConfig.prototype._title = null),
            (GRichTooltipConfig.prototype._description = null),
            (GRichTooltipConfig.prototype._video = null),
            (GRichTooltipConfig.prototype._pic = null),
            (GRichTooltipConfig.prototype._isPro = null),
            (GRichTooltipConfig.prototype._middle = null),
            (GRichTooltipConfig.prototype._marginLeft = null),
            (GRichTooltipConfig.prototype._shortcut = null),
            (GRichTooltipConfig.prototype._videoTimeout = null),
            (GRichTooltipConfig.prototype._side = null),
            (GRichTooltipConfig.prototype._learnMore = null),
            (GRichTooltipConfig.prototype._upgradeToProStatsValue = null),
            (GRichTooltipConfig.prototype._forceShow = false),
            (GRichTooltipConfig.prototype._flipHorizontal = false),
            (GRichTooltipConfig.prototype.setConfig = function (config) {
                let {
                    title: newTitle,
                    description: newDescription,
                    video: newVideo,
                    pic: newPic,
                    isPro: newIsPro,
                    middle: newMiddle,
                    shortcut: newShortcut,
                    videoTimeout: newVideoTimeout,
                    marginLeft: newMarginLeft,
                    side: newSide,
                    learnMore: newLearnMore,
                    upgradeToProStatsValue: newUpgradeToProStatsValue,
                } = config;
                if ((void 0 !== newTitle && (this._title = newTitle), !this._title)) throw new Error("");
                return (
                    void 0 !== newDescription && (this._description = newDescription),
                    void 0 !== newVideo && (this._video = newVideo),
                    void 0 !== newPic && (this._pic = newPic),
                    void 0 !== newIsPro && (this._isPro = newIsPro),
                    void 0 !== newMiddle && (this._middle = newMiddle),
                    void 0 !== newShortcut && (this._shortcut = newShortcut),
                    void 0 !== newVideoTimeout && (this._videoTimeout = newVideoTimeout),
                    void 0 !== newMarginLeft && (this._marginLeft = newMarginLeft),
                    void 0 !== newSide && (this._side = newSide),
                    void 0 !== newLearnMore && (this._learnMore = newLearnMore),
                    void 0 !== newUpgradeToProStatsValue && (this._upgradeToProStatsValue = newUpgradeToProStatsValue),
                    this
                );
            }),
            (GRichTooltipConfig.prototype.getConfig = function () {
                return {
                    title: this._title,
                    description: this._description,
                    video: this._video,
                    pic: this._pic,
                    isPro: this._isPro,
                    middle: this._middle,
                    marginLeft: this._marginLeft,
                    shortcut: this._shortcut,
                    videoTimeout: this._videoTimeout,
                    side: this._side,
                    learnMore: this._learnMore,
                    upgradeToProStatsValue: this._upgradeToProStatsValue,
                    forceShow: this._forceShow,
                    flipHorizontal: this._flipHorizontal,
                };
            }),
            (GRichTooltipConfig.prototype.toString = function () {
                return "[Object GRichTooltipConfig]";
            }));
        exports.TOOLTIP_AREA = {
            TOOLBAR: "TOOLBAR",
            SIDEBAR: "SIDEBAR",
            MAIN_MENU: {
                TRY_PRO_COMMON: "TRY_PRO_COMMON",
                TRY_EXP_PDF_ADVANCED_SETTING: "TRY_EXP_PDF_ADVANCED_SETTING",
            },
        };
        exports.default = GRichTooltipConfig;
    };
