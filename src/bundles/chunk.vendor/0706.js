module.exports = function (module, exports, require) {
            "use strict";
            const $ = require(171),
                trackEvent = require(375),
                GOfferDialogV1 = require(526),
                { learnmore } = require(253),
                i18n = require(170),
                LocKey = require(325);
            require(417 /* gApi */).self();
            module.exports = class {
                static get ContentType() {
                    return GOfferDialogV1.ContentType;
                }
                static get __i18n__() {
                    return "GReminderDialog";
                }
                static get Impl() {
                    return class {
                        open() {
                            throw new Error("Not implemented");
                        }
                        close() {
                            throw new Error("Not implemented");
                        }
                        openPurchaseFlow() {
                            throw new Error("Not implemented");
                        }
                        openExternalLink() {
                            throw new Error("Not implemented");
                        }
                        getProduct() {
                            throw new Error("Not implemented");
                        }
                        getLicense() {
                            throw new Error("Not implemented");
                        }
                        getLanguage() {
                            throw new Error("Not implemented");
                        }
                    };
                }
                constructor(options) {
                    let {
                        title,
                        product,
                        dismiss,
                        impl,
                        closeable,
                        page,
                        campaign,
                        withFooter,
                        content: content = GOfferDialogV1.DEFAULT_CONTENT,
                    } = options;
                    ((this._impl = impl), i18n.setLanguage(this._impl.getLanguage()));
                    let dismissAction = null;
                    dismiss &&
                        (dismissAction = {
                            title: i18n.get(new LocKey("GReminderDialog", "text.continue-as-free")),
                            execute: () => {
                                (trackEvent("".concat(page, "_click_continuebutton")), this.close());
                            },
                        });
                    const offerDialogElement = new GOfferDialogV1({
                        page: page,
                        title: title,
                        content: content,
                        action: dismissAction,
                        product: product,
                        cmd: {
                            close: this.close.bind(this),
                            openPurchaseFlow: () => {
                                (this._impl.openPurchaseFlow({
                                    dialog: this,
                                    options: {
                                        closeable: closeable,
                                    },
                                }),
                                    closeable && this.close());
                            },
                        },
                        closeable: closeable,
                        withFooter: withFooter,
                    }).getHTMLElement();
                    ((this._htmlElement = $("<div></div>")
                        .addClass("g-cloud-ui-reminder-dialog g-dialog")
                        .append($("<div></div>").addClass("g-cloud-ui-reminder-dialog-content g-dialog-content").append(offerDialogElement))),
                        learnmore || this._htmlElement.addClass("g-cloud-ui-no-learn-more"));
                }
                open() {
                    $(".g-cloud-ui-reminder-dialog").length ||
                        this._impl.open({
                            dialog: this,
                        });
                }
                close() {
                    this._impl.close({
                        dialog: this,
                    });
                }
                getHTMLElement() {
                    return this._htmlElement;
                }
                toString() {
                    return "[Object GReminderDialog]";
                }
            };
        };
