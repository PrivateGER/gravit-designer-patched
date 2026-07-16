module.exports = function (module, exports, require) {
            "use strict";
            (require(4), require(32), require(38), require(33));
            const n = require(171),
                r = require(375),
                o = require(170),
                a = require(254);
            class s {
                static get FooterInfoType() {
                    return {
                        Normal: "normal",
                        Promo: "promo",
                    };
                }
                static get footerInfo() {
                    return {
                        [this.FooterInfoType.Normal]: {
                            title: o.getValue("GOfferDialogV1", "text.footer-normal-title"),
                            buy: o.getValue("GOfferDialogV1", "text.footer-normal-buy"),
                        },
                        [this.FooterInfoType.Promo]: {
                            title: o.getValue("GOfferDialogV1", "text.footer-promo-title"),
                            buy: o.getValue("GOfferDialogV1", "text.footer-promo-buy"),
                        },
                    };
                }
                static get DEFAULT_CONTENT() {
                    return {
                        type: s.ContentType.Topics,
                        title: o.getValue("GOfferDialogV1", "text.offerdialog-v1-title"),
                        data: [
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-1"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-2"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-3"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-4"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-5"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-6"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-7"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-8"),
                            o.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-9"),
                        ],
                    };
                }
                static get ContentType() {
                    return {
                        Topics: "topics",
                        Title: "title",
                        Web: "web",
                    };
                }
                constructor(e) {
                    let { page, content, title, action, cmd: a = {}, closeable: s = true, withFooter: l = true } = e;
                    ((this._page = page),
                        (this._content = content),
                        (this._title = title || o.getValue("GOfferDialogV1", "text.offerdialog-v1-default-title")),
                        (this._openPurchaseFlow = a.openPurchaseFlow),
                        (this._close = a.close),
                        (this._closeable = s),
                        (this._withFooter = l),
                        (this._action = action),
                        this._initUI());
                }
                _initUI() {
                    ((this._ui = {}),
                        this._initDialog(),
                        this._initHeader(),
                        this._initCloseButton(),
                        this._initMain(),
                        this._initContent(),
                        this._initActionButton(),
                        this._initFooter());
                }
                _initDialog() {
                    this._ui.dialog = n("<div></div>").addClass("g-cloud-ui-offer-dialog-v1");
                }
                _initHeader() {
                    const e = n("<header>").appendTo(this._ui.dialog);
                    ((this._ui.title = n("<span>").addClass("title g-cloud-ui-markable").appendTo(e)),
                        (Array.isArray(this._title) ? this._title : [this._title]).forEach((e) => {
                            (n("<label>").html(e).appendTo(this._ui.title), n("<br>").appendTo(this._ui.title));
                        }));
                }
                _initMain() {
                    this._ui.main = n("<main>").appendTo(this._ui.dialog);
                }
                _initContent() {
                    if (this._content)
                        switch (this._content.type) {
                            case s.ContentType.Title:
                                n("<span>").addClass("title no-bold").html(this._content.title).appendTo(this._ui.main);
                                break;
                            case s.ContentType.Topics:
                                n("<span>").addClass("title").html(this._content.title).appendTo(this._ui.main);
                                n("<div>")
                                    .addClass("topics")
                                    .appendTo(this._ui.main)
                                    .append(
                                        this._content.data.map((e) =>
                                            n("<div>").addClass("topic").append(n("<span>").addClass("g-cloud-icon-v").text(e))
                                        )
                                    );
                                break;
                            case s.ContentType.Web:
                                return this._initWebContent();
                        }
                }
                _initWebContent() {
                    const e = n("<div>").addClass("content g-cloud-ui-loading").appendTo(this._ui.main);
                    n("<iframe>", {
                        id: "GOfferDialogV1",
                        src: this._content.data,
                        width: 500,
                        height: 500,
                        scrolling: "no",
                        frameborder: 0,
                    })
                        .appendTo(e)
                        .on("load", () => {
                            e.removeClass("g-cloud-ui-loading");
                        });
                }
                _initActionButton() {
                    if (!this._action) return;
                    const { style, title: t, execute } = this._action;
                    n("<button>")
                        .addClass(style || "")
                        .text(t)
                        .on("click", () => execute())
                        .appendTo(this._ui.main);
                }
                _initFooter() {
                    this._withFooter &&
                        ((this._ui.footer = n("<footer>").appendTo(this._ui.dialog)),
                        n("<span>")
                            .addClass("title")
                            .append(n("<span>").text(o.getValue("GServerTranslations", "NEED_HELP")))
                            .append(" ")
                            .append(
                                n("<a>")
                                    .addClass("support-link")
                                    .attr("href", a.getSupportUrl())
                                    .attr("target", "_blank")
                                    .text(o.getValue("GServerTranslations", "CONTACT_SUPPORT"))
                            )
                            .appendTo(this._ui.footer),
                        this._initFooterInfo());
                }
                _initCloseButton() {
                    this._closeable &&
                        n("<div>")
                            .addClass("g-cloud-ui-btn-close")
                            .append(n("<span>").addClass("g-cloud-icon-close"))
                            .on("click", () => this._close && this._close())
                            .appendTo(this._ui.dialog);
                }
                _initFooterInfo() {
                    const e = n("<div>").addClass("info").appendTo(this._ui.footer);
                    (n("<button>")
                        .addClass("g-cloud-ui-btn-pro highlighted")
                        .text(this._getFooterInfo().buy)
                        .on("click", () => {
                            (r("".concat(this._page || "offer", "_click_buybutton")), this._openPurchaseFlow && this._openPurchaseFlow());
                        })
                        .appendTo(e),
                        n("<div>").addClass("money-back").appendTo(e));
                }
                _getFooterInfo() {
                    return s.footerInfo[this._prefix || s.FooterInfoType.Normal];
                }
                getHTMLElement() {
                    return this._ui.dialog;
                }
            }
            module.exports = s;
        };
