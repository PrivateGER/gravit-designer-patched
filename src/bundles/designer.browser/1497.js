module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(34));
        var designerConfig = require(10);
        const { GLocale, GLocaleKey } = require(1 /* GObject */);
        function r(e) {
            this._htmlElement = e;
        }
        ((r.prototype.init = function () {
            const e = $("<div></div>").addClass("container").appendTo(this._htmlElement);
            $("<p></p>")
                .html(
                    GLocale
                        .getValue("GBanner", "text.access-expire")
                        .replace(
                            "%link",
                            designerConfig.CloudUtils.getYearlySubscriptionUrl(
                                designerConfig.UTM.buildStoreCampaignParams(
                                    designerConfig.UTM.StoreCampaign.CorelVectorTrial,
                                    designerConfig.UTM.Vehicle.IPM,
                                    designerConfig.UTM.Source.APP,
                                    designerConfig.UTM.Medium.IPM
                                )
                            )
                        )
                )
                .appendTo(e);
        }),
            (r.prototype.setEnabled = function (e) {
                $("#banner").css("display", e ? "none" : "unset");
            }),
            (module.exports = r));
    };
