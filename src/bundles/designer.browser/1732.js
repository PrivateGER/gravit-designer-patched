module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10),
            a = require(357),
            GProfileDialog = require(604),
            s = (require(1158), null),
            l = null;
        var c = {
            init: function () {
                return this.each(function () {
                    l = $("<div/>")
                        .addClass("overlay-fade")
                        .on("click", function () {
                            (this.remove(), s.gOverlay("close"));
                        })
                        .appendTo($("body"));
                    var e = a.USERLOGIN.loadLogo();
                    ((s = $("<div></div>")
                        .addClass("loading")
                        .addClass("g-user-details")
                        .addClass(a.USERLOGIN.OVERLAY_CLASS)
                        .append(e)
                        .gOverlay({
                            clazz: "g-user-login-dialog" + (a.USERLOGIN.OVERLAY_CLASS ? " " + a.USERLOGIN.OVERLAY_CLASS : ""),
                            padding: false,
                            releaseOnClose: true,
                            closeCallback: function () {
                                l.remove();
                            },
                        })
                        .gOverlay("open", this)),
                        gDesigner.getUser().then(async (e) => {
                            let t = !designerConfig.PROFILE_DIALOG_URL;
                            (designerConfig.PROFILE_DIALOG_URL && (t = await designerConfig.gApi.hasPurchases().catch(() => false)),
                                s.removeClass("loading"),
                                s.append(
                                    (function (e, t) {
                                        gDesigner.getLicense();
                                        const n = () => {
                                                s.gOverlay("close");
                                            },
                                            a = e.canUpdateSelfAccountData();
                                        var l = $("<div/>"),
                                            c = $("<div/>")
                                                .addClass("footer")
                                                .append(
                                                    $("<div/>")
                                                        .addClass("top-section")
                                                        .append([
                                                            $("<button/>")
                                                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.settings")))
                                                                .addClass("highlight")
                                                                .css("display", a ? "" : "none")
                                                                .on("click", async (o) => {
                                                                    (gDesigner.stats("profile_click_open-button"),
                                                                        designerConfig.ALWAYS_SHOW_ACCOUNT_SETTING_DIALOG || t
                                                                            ? new GProfileDialog(e).open()
                                                                            : designerConfig.PROFILE_DIALOG_URL
                                                                              ? gContainer.openExternalLink(o, designerConfig.PROFILE_DIALOG_URL)
                                                                              : gContainer.openExternalLink(o, designerConfig.gApi.url + "/profile"),
                                                                        n());
                                                                }),
                                                            $("<button/>")
                                                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.sign-out")))
                                                                .addClass("signout")
                                                                .on("click", function () {
                                                                    (gDesigner.stats("profile_click_signout-button"),
                                                                        gDesigner.signout(),
                                                                        n());
                                                                }),
                                                        ])
                                                );
                                        return (
                                            e.hasOwnPictureAvatar()
                                                ? l
                                                      .append(
                                                          $("<div/>")
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("avatar")
                                                                      .css("background-image", 'url("' + e.avatar + '")')
                                                              )
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("username-div")
                                                                      .append(
                                                                          $("<div/>")
                                                                              .addClass("username")
                                                                              .append(
                                                                                  $("<span/>").addClass("name").text(e.getFullUserName())
                                                                              )
                                                                              .append(
                                                                                  $("<span/>").addClass("email").text(e.getAccountName())
                                                                              )
                                                                      )
                                                              )
                                                      )
                                                      .append(c)
                                                : l
                                                      .append(
                                                          $("<div/>")
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("avatar")
                                                                      .addClass("g-user-login-avatar")
                                                                      .css({
                                                                          "background-color": e.getUserColor(),
                                                                      })
                                                                      .text(e.getUserNameInitials())
                                                              )
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("username-div")
                                                                      .append(
                                                                          $("<div/>")
                                                                              .addClass("username")
                                                                              .append(
                                                                                  $("<span/>").addClass("name").text(e.getFullUserName())
                                                                              )
                                                                              .append(
                                                                                  $("<span/>").addClass("email").text(e.getAccountName())
                                                                              )
                                                                      )
                                                              )
                                                      )
                                                      .append(c),
                                            l
                                        );
                                    })(e, t)
                                ));
                        }));
                });
            },
        };
        $.fn.gUserLogin = function (e) {
            return c[e]
                ? c[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                  : c.init.apply(this, arguments);
        };
    };
