module.exports = function (module, exports, require) {
            "use strict";
            (require(4), require(32), require(38), require(33));
            const $ = require(171),
                trackEvent = require(375),
                i18n = require(170),
                urls = require(254);
            class OfferDialog {
                static get FooterInfoType() {
                    return {
                        Normal: "normal",
                        Promo: "promo",
                    };
                }
                static get footerInfo() {
                    return {
                        [this.FooterInfoType.Normal]: {
                            title: i18n.getValue("GOfferDialogV1", "text.footer-normal-title"),
                            buy: i18n.getValue("GOfferDialogV1", "text.footer-normal-buy"),
                        },
                        [this.FooterInfoType.Promo]: {
                            title: i18n.getValue("GOfferDialogV1", "text.footer-promo-title"),
                            buy: i18n.getValue("GOfferDialogV1", "text.footer-promo-buy"),
                        },
                    };
                }
                static get DEFAULT_CONTENT() {
                    return {
                        type: OfferDialog.ContentType.Topics,
                        title: i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-title"),
                        data: [
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-1"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-2"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-3"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-4"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-5"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-6"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-7"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-8"),
                            i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-topic-9"),
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
                constructor(options) {
                    let { page, content, title, action, cmd: cmd = {}, closeable: closeable = true, withFooter: withFooter = true } = options;
                    ((this._page = page),
                        (this._content = content),
                        (this._title = title || i18n.getValue("GOfferDialogV1", "text.offerdialog-v1-default-title")),
                        (this._openPurchaseFlow = cmd.openPurchaseFlow),
                        (this._close = cmd.close),
                        (this._closeable = closeable),
                        (this._withFooter = withFooter),
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
                    this._ui.dialog = $("<div></div>").addClass("g-cloud-ui-offer-dialog-v1");
                }
                _initHeader() {
                    const header = $("<header>").appendTo(this._ui.dialog);
                    ((this._ui.title = $("<span>").addClass("title g-cloud-ui-markable").appendTo(header)),
                        (Array.isArray(this._title) ? this._title : [this._title]).forEach((titleLine) => {
                            ($("<label>").html(titleLine).appendTo(this._ui.title), $("<br>").appendTo(this._ui.title));
                        }));
                }
                _initMain() {
                    this._ui.main = $("<main>").appendTo(this._ui.dialog);
                }
                _initContent() {
                    if (this._content)
                        switch (this._content.type) {
                            case OfferDialog.ContentType.Title:
                                $("<span>").addClass("title no-bold").html(this._content.title).appendTo(this._ui.main);
                                break;
                            case OfferDialog.ContentType.Topics:
                                $("<span>").addClass("title").html(this._content.title).appendTo(this._ui.main);
                                $("<div>")
                                    .addClass("topics")
                                    .appendTo(this._ui.main)
                                    .append(
                                        this._content.data.map((topic) =>
                                            $("<div>").addClass("topic").append($("<span>").addClass("g-cloud-icon-v").text(topic))
                                        )
                                    );
                                break;
                            case OfferDialog.ContentType.Web:
                                return this._initWebContent();
                        }
                }
                _initWebContent() {
                    const contentEl = $("<div>").addClass("content g-cloud-ui-loading").appendTo(this._ui.main);
                    $("<iframe>", {
                        id: "GOfferDialogV1",
                        src: this._content.data,
                        width: 500,
                        height: 500,
                        scrolling: "no",
                        frameborder: 0,
                    })
                        .appendTo(contentEl)
                        .on("load", () => {
                            contentEl.removeClass("g-cloud-ui-loading");
                        });
                }
                _initActionButton() {
                    if (!this._action) return;
                    const { style, title: actionTitle, execute } = this._action;
                    $("<button>")
                        .addClass(style || "")
                        .text(actionTitle)
                        .on("click", () => execute())
                        .appendTo(this._ui.main);
                }
                _initFooter() {
                    this._withFooter &&
                        ((this._ui.footer = $("<footer>").appendTo(this._ui.dialog)),
                        $("<span>")
                            .addClass("title")
                            .append($("<span>").text(i18n.getValue("GServerTranslations", "NEED_HELP")))
                            .append(" ")
                            .append(
                                $("<a>")
                                    .addClass("support-link")
                                    .attr("href", urls.getSupportUrl())
                                    .attr("target", "_blank")
                                    .text(i18n.getValue("GServerTranslations", "CONTACT_SUPPORT"))
                            )
                            .appendTo(this._ui.footer),
                        this._initFooterInfo());
                }
                _initCloseButton() {
                    this._closeable &&
                        $("<div>")
                            .addClass("g-cloud-ui-btn-close")
                            .append($("<span>").addClass("g-cloud-icon-close"))
                            .on("click", () => this._close && this._close())
                            .appendTo(this._ui.dialog);
                }
                _initFooterInfo() {
                    const infoEl = $("<div>").addClass("info").appendTo(this._ui.footer);
                    ($("<button>")
                        .addClass("g-cloud-ui-btn-pro highlighted")
                        .text(this._getFooterInfo().buy)
                        .on("click", () => {
                            (trackEvent("".concat(this._page || "offer", "_click_buybutton")), this._openPurchaseFlow && this._openPurchaseFlow());
                        })
                        .appendTo(infoEl),
                        $("<div>").addClass("money-back").appendTo(infoEl));
                }
                _getFooterInfo() {
                    return OfferDialog.footerInfo[this._prefix || OfferDialog.FooterInfoType.Normal];
                }
                getHTMLElement() {
                    return this._ui.dialog;
                }
            }
            module.exports = OfferDialog;
        };
