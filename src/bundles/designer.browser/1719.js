module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var GObject = require(1);
        const i = {
            init: function (e) {
                e = $.extend(
                    {
                        clazz: null,
                        defaultText: GObject.GLocale.get(new GObject.GLocaleKey("GToolbar", "text.share")),
                        stats: "toolbar_click_share",
                        restrictedStats: "toolbar_nonprotriespro_share",
                        closeCallback: null,
                    },
                    e
                );
                let t = $(this);
                return (
                    t.data("gsharebutton", { options: e }),
                    this.addClass("share-button")
                        .addClass("g-highlight-button")
                        .addClass("highlighted")
                        .addClass(e.clazz || "")
                        .append($("<span/>").addClass("icon"))
                        .append($("<span/>").addClass("label").text(e.defaultText))
                        .on("click", () => {
                            if (t.hasClass("g-disabled")) return;
                            const n = gDesigner.getShareManager();
                            n.isShareProRestricted()
                                ? (gDesigner.stats(e.restrictedStats), gDesigner.handleShareFilePROFeatureInterruption())
                                : (gDesigner.stats(e.stats), n.share(t.data("gsharebutton").storeItem, e.closeCallback));
                        }),
                    this
                );
            },
            update: function (e) {
                const { isPrivate: t, isSharing: n, disabled: i } = e,
                    a = $(this);
                i ? a.addClass("g-disabled") : a.removeClass("g-disabled");
                gDesigner.getShareManager().isShareProRestricted() && a.gPro();
                const r = a.data("gsharebutton");
                a.find(".icon")
                    .css("display", n ? "" : "none")
                    .toggleClass("gravit-icon-private-share", t)
                    .toggleClass("gravit-icon-public-share", !t);
                const s = n
                    ? new GObject.GLocaleKey("GToolbar", "text.shared")
                    : r.options.defaultText
                      ? r.options.defaultText
                      : new GObject.GLocaleKey("GToolbar", "text.share");
                return (
                    a.find(".label").text(GObject.GLocale.get(s)),
                    (r.storeItem = e.storeItem),
                    e.closeCallback && (r.options.closeCallback = e.closeCallback),
                    this
                );
            },
        };
        $.fn.gShareButton = function (e) {
            return i[e]
                ? i[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.gShareButton")
                  : i.init.apply(this, arguments);
        };
    };
