module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10),
            Constants = require(357),
            GProfileDialog = require(604),
            loginPanel = (require(1158), null),
            fadeOverlay = null;
        var methods = {
            init: function () {
                return this.each(function () {
                    fadeOverlay = $("<div/>")
                        .addClass("overlay-fade")
                        .on("click", function () {
                            (this.remove(), loginPanel.gOverlay("close"));
                        })
                        .appendTo($("body"));
                    var logo = Constants.USERLOGIN.loadLogo();
                    ((loginPanel = $("<div></div>")
                        .addClass("loading")
                        .addClass("g-user-details")
                        .addClass(Constants.USERLOGIN.OVERLAY_CLASS)
                        .append(logo)
                        .gOverlay({
                            clazz: "g-user-login-dialog" + (Constants.USERLOGIN.OVERLAY_CLASS ? " " + Constants.USERLOGIN.OVERLAY_CLASS : ""),
                            padding: false,
                            releaseOnClose: true,
                            closeCallback: function () {
                                fadeOverlay.remove();
                            },
                        })
                        .gOverlay("open", this)),
                        gDesigner.getUser().then(async (user) => {
                            let showInternalDialog = !designerConfig.PROFILE_DIALOG_URL;
                            (designerConfig.PROFILE_DIALOG_URL && (showInternalDialog = await designerConfig.gApi.hasPurchases().catch(() => false)),
                                loginPanel.removeClass("loading"),
                                loginPanel.append(
                                    (function (user, showInternalDialog) {
                                        gDesigner.getLicense();
                                        const closeDialog = () => {
                                                loginPanel.gOverlay("close");
                                            },
                                            canManageAccount = user.canUpdateSelfAccountData();
                                        var container = $("<div/>"),
                                            footer = $("<div/>")
                                                .addClass("footer")
                                                .append(
                                                    $("<div/>")
                                                        .addClass("top-section")
                                                        .append([
                                                            $("<button/>")
                                                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.settings")))
                                                                .addClass("highlight")
                                                                .css("display", canManageAccount ? "" : "none")
                                                                .on("click", async (event) => {
                                                                    (gDesigner.stats("profile_click_open-button"),
                                                                        designerConfig.ALWAYS_SHOW_ACCOUNT_SETTING_DIALOG || showInternalDialog
                                                                            ? new GProfileDialog(user).open()
                                                                            : designerConfig.PROFILE_DIALOG_URL
                                                                              ? gContainer.openExternalLink(event, designerConfig.PROFILE_DIALOG_URL)
                                                                              : gContainer.openExternalLink(event, designerConfig.gApi.url + "/profile"),
                                                                        closeDialog());
                                                                }),
                                                            $("<button/>")
                                                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.sign-out")))
                                                                .addClass("signout")
                                                                .on("click", function () {
                                                                    (gDesigner.stats("profile_click_signout-button"),
                                                                        gDesigner.signout(),
                                                                        closeDialog());
                                                                }),
                                                        ])
                                                );
                                        return (
                                            user.hasOwnPictureAvatar()
                                                ? container
                                                      .append(
                                                          $("<div/>")
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("avatar")
                                                                      .css("background-image", 'url("' + user.avatar + '")')
                                                              )
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("username-div")
                                                                      .append(
                                                                          $("<div/>")
                                                                              .addClass("username")
                                                                              .append(
                                                                                  $("<span/>").addClass("name").text(user.getFullUserName())
                                                                              )
                                                                              .append(
                                                                                  $("<span/>").addClass("email").text(user.getAccountName())
                                                                              )
                                                                      )
                                                              )
                                                      )
                                                      .append(footer)
                                                : container
                                                      .append(
                                                          $("<div/>")
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("avatar")
                                                                      .addClass("g-user-login-avatar")
                                                                      .css({
                                                                          "background-color": user.getUserColor(),
                                                                      })
                                                                      .text(user.getUserNameInitials())
                                                              )
                                                              .append(
                                                                  $("<div/>")
                                                                      .addClass("username-div")
                                                                      .append(
                                                                          $("<div/>")
                                                                              .addClass("username")
                                                                              .append(
                                                                                  $("<span/>").addClass("name").text(user.getFullUserName())
                                                                              )
                                                                              .append(
                                                                                  $("<span/>").addClass("email").text(user.getAccountName())
                                                                              )
                                                                      )
                                                              )
                                                      )
                                                      .append(footer),
                                            container
                                        );
                                    })(user, showInternalDialog)
                                ));
                        }));
                });
            },
        };
        $.fn.gUserLogin = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
