module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var GObject = require(1);
        const methods = {
            init: function (options) {
                options = $.extend(
                    {
                        clazz: null,
                        defaultText: GObject.GLocale.get(new GObject.GLocaleKey("GToolbar", "text.share")),
                        stats: "toolbar_click_share",
                        restrictedStats: "toolbar_nonprotriespro_share",
                        closeCallback: null,
                    },
                    options
                );
                let button = $(this);
                return (
                    button.data("gsharebutton", { options: options }),
                    this.addClass("share-button")
                        .addClass("g-highlight-button")
                        .addClass("highlighted")
                        .addClass(options.clazz || "")
                        .append($("<span/>").addClass("icon"))
                        .append($("<span/>").addClass("label").text(options.defaultText))
                        .on("click", () => {
                            if (button.hasClass("g-disabled")) return;
                            const shareManager = gDesigner.getShareManager();
                            shareManager.isShareProRestricted()
                                ? (gDesigner.stats(options.restrictedStats), gDesigner.handleShareFilePROFeatureInterruption())
                                : (gDesigner.stats(options.stats), shareManager.share(button.data("gsharebutton").storeItem, options.closeCallback));
                        }),
                    this
                );
            },
            update: function (state) {
                const { isPrivate, isSharing, disabled } = state,
                    button = $(this);
                disabled ? button.addClass("g-disabled") : button.removeClass("g-disabled");
                gDesigner.getShareManager().isShareProRestricted() && button.gPro();
                const pluginData = button.data("gsharebutton");
                button.find(".icon")
                    .css("display", isSharing ? "" : "none")
                    .toggleClass("gravit-icon-private-share", isPrivate)
                    .toggleClass("gravit-icon-public-share", !isPrivate);
                const labelKey = isSharing
                    ? new GObject.GLocaleKey("GToolbar", "text.shared")
                    : pluginData.options.defaultText
                      ? pluginData.options.defaultText
                      : new GObject.GLocaleKey("GToolbar", "text.share");
                return (
                    button.find(".label").text(GObject.GLocale.get(labelKey)),
                    (pluginData.storeItem = state.storeItem),
                    state.closeCallback && (pluginData.options.closeCallback = state.closeCallback),
                    this
                );
            },
        };
        $.fn.gShareButton = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.gShareButton")
                  : methods.init.apply(this, arguments);
        };
    };
