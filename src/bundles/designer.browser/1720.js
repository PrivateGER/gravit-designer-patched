module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10);
        const methods = {
            init: function (options) {
                options = $.extend(
                    {
                        clazz: null,
                        defaultText: GObject.GLocale.get(new GObject.GLocaleKey("GUnshareButton", "text.unshare-with-me")),
                        stats: "filespanel-view_infoPanel_unshare",
                        restrictedStats: "filespanel-view_infoPanel_nonprotriespro-unshare",
                        unshareCallback: null,
                    },
                    options
                );
                let element = $(this);
                return (
                    element.data("gunsharebutton", { options: options }),
                    this.addClass("unshare-button")
                        .addClass("g-highlight-button")
                        .addClass("highlighted")
                        .addClass(options.clazz || "")
                        .append($("<span/>").addClass("icon"))
                        .append($("<span/>").addClass("label").text(options.defaultText))
                        .on("click", () => {
                            if (element.hasClass("g-disabled")) return;
                            gDesigner.getShareManager().isShareProRestricted()
                                ? (gDesigner.stats(options.restrictedStats), gDesigner.handleShareFilePROFeatureInterruption())
                                : (gDesigner.stats(options.stats),
                                  gDesigner.getUser().then(async (user) => {
                                      if (!user) return;
                                      const itemId = element.data("gunsharebutton").storeItem.getId(),
                                          userId = user.getUID();
                                      (console.log("About to call unshare with item id: %s and user id: %s", itemId, userId),
                                          await designerConfig.gApi.unshareWithUser(itemId, userId),
                                          "function" == typeof options.unshareCallback && options.unshareCallback());
                                  }));
                        }),
                    this
                );
            },
            update: function (options) {
                const { disabled, hidden } = options,
                    element = $(this);
                (disabled ? element.addClass("g-disabled") : element.removeClass("g-disabled"), hidden ? element.hide() : element.show());
                gDesigner.getShareManager().isShareProRestricted() && element.gPro();
                const pluginData = element.data("gunsharebutton");
                return ((pluginData.storeItem = options.storeItem), options.unshareCallback && (pluginData.options.unshareCallback = options.unshareCallback), this);
            },
        };
        $.fn.gUnshareButton = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.gUnshareButton")
                  : methods.init.apply(this, arguments);
        };
    };
