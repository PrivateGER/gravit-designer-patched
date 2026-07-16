module.exports = function (module, exports, require) {
            "use strict";
            const n = require(171),
                r = require(375),
                GOfferDialogV1 = require(526),
                { learnmore } = require(253),
                s = require(170),
                l = require(325);
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
                constructor(e) {
                    let {
                        title,
                        product,
                        dismiss,
                        impl,
                        closeable,
                        page,
                        campaign,
                        withFooter,
                        content: g = GOfferDialogV1.DEFAULT_CONTENT,
                    } = e;
                    ((this._impl = impl), s.setLanguage(this._impl.getLanguage()));
                    let f = null;
                    dismiss &&
                        (f = {
                            title: s.get(new l("GReminderDialog", "text.continue-as-free")),
                            execute: () => {
                                (r("".concat(page, "_click_continuebutton")), this.close());
                            },
                        });
                    const m = new GOfferDialogV1({
                        page: page,
                        title: title,
                        content: g,
                        action: f,
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
                    ((this._htmlElement = n("<div></div>")
                        .addClass("g-cloud-ui-reminder-dialog g-dialog")
                        .append(n("<div></div>").addClass("g-cloud-ui-reminder-dialog-content g-dialog-content").append(m))),
                        learnmore || this._htmlElement.addClass("g-cloud-ui-no-learn-more"));
                }
                open() {
                    n(".g-cloud-ui-reminder-dialog").length ||
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
