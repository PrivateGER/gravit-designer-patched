module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(4), require(13), require(32), require(38), require(33));
        var appConfig = require(357),
            GObject = require(1),
            Utils = require(40);
        const { gApi, LINKS, DESIGNER: { TITLE } = {}, SubscriptionStatus } = require(10 /* designerConfig */),
            licenseManager = (require(173), require(337)),
            orderByFields = ["number", "name", "price", "date"];
        function GPurchasePanel(user, messageHandler) {
            let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            ((this._user = user),
                (this._options = options),
                (this._query = { skip: 0, name: "", issued: "true" }),
                (this._messageHandler = messageHandler),
                (this._typing = false),
                this._init(),
                (this._allowReactivateSubscriptions = false),
                this._load());
        }
        (GObject.GObject.inherit(GPurchasePanel, GObject.GObject),
            (GPurchasePanel.prototype._init = function () {
                this._container = $("<div></div>").addClass("g-purchase-panel");
                let debounceTimer = void 0;
                const deferredShowInfo = () => this._showInfoIfAny(),
                    n = (n) => {
                        (debounceTimer && clearTimeout(debounceTimer), (debounceTimer = setTimeout(deferredShowInfo, 500)), this._search($(n.target).closest("input").val()));
                    };
                ($("<div></div>")
                    .addClass("search-panel")
                    .append(
                        $("<input>")
                            .attr("type", "text")
                            .attr("data-property", "search")
                            .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.search-label")))
                            .on("input", (0, Utils.debounce)((0, Utils.throttle)(n, 500), 500))
                            .on("keyup", (event) => {
                                13 === event.which && (gDesigner.stats("profile-dialog_purchase-panel_search"), n(event));
                            })
                    )
                    .append(
                        $("<label></label>")
                            .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.orderby-label"))))
                            .append(
                                $("<select></select>")
                                    .attr("data-property", "orderby")
                                    .append(
                                        orderByFields.map((field) =>
                                            $("<option></option>")
                                                .attr("value", field)
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.orderby-" + field)))
                                        )
                                    )
                                    .on("change", (event) => {
                                        (gDesigner.stats("profile-dialog_purchase-panel_order-by", event.target.value),
                                            this._orderBy.bind(this));
                                    })
                            )
                            .append(
                                $("<span></span>")
                                    .data("direction", "")
                                    .attr("data-property", "direction")
                                    .addClass("gravit-icon-sort-asc")
                                    .on("click", (event) => {
                                        let directionSpan = $(event.target).closest("span"),
                                            direction = directionSpan.data("direction"),
                                            sortLabel = "asc";
                                        ("-" === direction ? ((direction = ""), (sortLabel = "asc")) : ((direction = "-"), (sortLabel = "desc")),
                                            directionSpan.data("direction", direction),
                                            directionSpan.toggleClass("gravit-icon-sort-asc gravit-icon-sort-desc"),
                                            gDesigner.stats("profile-dialog_purchase-panel_sort", sortLabel),
                                            this._orderBy());
                                    })
                            )
                    )
                    .appendTo(this._container),
                    (this._purchaseList = $("<div></div>").addClass("purchase-list").appendTo(this._container)),
                    $("<footer></footer>")
                        .append(
                            $(
                                "<span>"
                                    .concat(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.contact-partner-billing-alternative")),
                                        "</span>"
                                    )
                                    .replace(
                                        "%partner%",
                                        $("<a/>")
                                            .addClass("cb-link")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.contact-partner-cleverbridge")))
                                            .prop("outerHTML")
                                    )
                            )
                        )
                        .appendTo(this._container),
                    this._container.find(".cb-link").on("click", (event) => {
                        (gDesigner.stats("profile-dialog_purchase-panel_cleverbridge-link"),
                            gContainer.openExternalLink(event, LINKS.CLEVERBRIDGE_SUPPORT_URL));
                    }),
                    $(this._purchaseList).scroll((event) => {
                        let scrollTarget = $(event.currentTarget);
                        scrollTarget[0].scrollHeight - scrollTarget.scrollTop() === scrollTarget.outerHeight() &&
                            $(this._purchaseList).children().length > 0 &&
                            this._load();
                    }));
            }),
            (GPurchasePanel.prototype._search = async function (searchTerm) {
                (this._messageHandler(void 0),
                    (this._query.skip = 0),
                    (this._query.name = searchTerm),
                    (this._query.by = this._container.find('select[data-property="orderby"] > option:selected').attr("value")),
                    (this._query.direction = this._container.find('span[data-property="direction"]').data("direction")),
                    await this._load(true));
            }),
            (GPurchasePanel.prototype._orderBy = function () {
                (this._search(this._container.find('input[data-property="search"]').val()), this._showInfoIfAny());
            }),
            (GPurchasePanel.prototype._showInfoIfAny = function () {
                this._purchaseList[0].hasChildNodes() ||
                    this._messageHandler(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.empty-search")), "info");
            }),
            (GPurchasePanel.prototype._load = async function (clearExisting) {
                if (-1 !== this._query.skip) {
                    this._toggleLoading(true);
                    try {
                        let purchases = await gApi.listPurchasedProducts(this._query),
                            count = purchases.length;
                        ((this._query.skip = count > 0 ? (count < 10 ? -1 : this._query.skip + count) : -1),
                            clearExisting && this._purchaseList.empty(),
                            purchases.forEach((purchase) => this._addOrUpdateItem(purchase)));
                    } catch (error) {
                        this._handleError(error);
                    } finally {
                        this._toggleLoading(false);
                    }
                }
            }),
            (GPurchasePanel.prototype._addOrUpdateItem = function (purchase, itemElement) {
                const isLifetimeCoupon = purchase.issued_coupon && purchase.issued_coupon.lifetime;
                (itemElement =
                    itemElement ||
                    $("<div></div>")
                        .addClass("purchase-item")
                        .data("purchase", purchase)
                        .on("click", (event) => {
                            (this._purchaseList.find(".purchase-item.g-active").removeClass("g-active"),
                                $(event.target).closest(".purchase-item").addClass("g-active"));
                        })
                        .appendTo(this._purchaseList)).empty();
                let isSelected = false,
                    allowReinstate = false;
                (this._options &&
                    this._options.subscription &&
                    purchase.purchase_id == this._options.subscription.purchase &&
                    ((isSelected = true), (allowReinstate = !!this._options.subscription.reinstate), (this._options = null)),
                    isSelected && itemElement.addClass("g-selected"));
                const title =
                    purchase.name ||
                    (isLifetimeCoupon
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.pro-subscription-lifetime")).replace("%app", TITLE)
                        : GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.pro-subscription")).replace("%app", TITLE));
                $("<div></div>").addClass("header").append($("<label></label>").addClass("title").text(title)).appendTo(itemElement);
                (purchase.invoice &&
                    $("<div></div>")
                        .addClass("orderno")
                        .append(
                            $("<a></a>")
                                .attr("href", purchase.invoice)
                                .attr("target", "_blank")
                                .append(
                                    $("<span></span>").text(
                                        ""
                                            .concat(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.orderno")), " ")
                                            .concat(purchase.purchase_id)
                                    )
                                )
                        )
                        .appendTo(itemElement),
                    appConfig.PURCHASEPANEL.HAS_PRODUCT_DESCRIPTION &&
                        $("<div></div>").addClass("description").append($("<label></label>").text(purchase.description)).appendTo(itemElement));
                let purchasedLabel = ""
                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.purchased")), " ")
                    .concat(purchase.created ? GObject.GLocale.toLocaleDate(new Date(purchase.created)) : "");
                !isLifetimeCoupon &&
                    purchase.issued_coupon &&
                    purchase.issued_coupon.expires &&
                    (purchasedLabel += ", ".concat(
                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.purchased-expires")).replace(
                            "%date",
                            GObject.GLocale.toLocaleDate(new Date(purchase.issued_coupon.expires))
                        )
                    ));
                let statusLabel = $("<span></span>").text(purchasedLabel + ".");
                if (purchase.subscription && !purchase.refunded) {
                    let baseLabel = purchasedLabel;
                    (statusLabel.text(purchasedLabel + "..."),
                        gApi
                            .getSubscriptionByPurchase(purchase.purchase_id, purchase.provider)
                            .then((subscription) => {
                                const createPrompt = (promptTitle, promptMessage, buttonLabel, onConfirm, highlight) => {
                                    let promptElement = $("<div></div>")
                                        .addClass("prompt")
                                        .append(
                                            $("<div></div>")
                                                .append($("<span></span>").addClass("title").text(promptTitle))
                                                .append(
                                                    $("<div></div>")
                                                        .append(
                                                            $("<button></button>")
                                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes")))
                                                                .on("click", () => onConfirm(promptElement))
                                                        )
                                                        .append(
                                                            $("<button></button>")
                                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")))
                                                                .on("click", () => promptElement.removeClass("show"))
                                                        )
                                                )
                                        )
                                        .append(
                                            $("<div></div>").append(
                                                $("<div></div>").addClass("subtitle").append($("<span></span>").html(promptMessage))
                                            )
                                        )
                                        .insertAfter(itemElement);
                                    return (
                                        $("<div></div>")
                                            .addClass("subscription")
                                            .append($("<label></label>").html("&nbsp;"))
                                            .append(
                                                $("<button></button>")
                                                    .toggleClass("highlight", !!highlight)
                                                    .text(buttonLabel)
                                                    .on("click", () => promptElement.addClass("show"))
                                            )
                                            .appendTo(itemElement),
                                        promptElement
                                    );
                                };
                                if (subscription.status === SubscriptionStatus.Active)
                                    (isLifetimeCoupon
                                        ? statusLabel.text(baseLabel + ".")
                                        : statusLabel.text(
                                              ""
                                                  .concat(baseLabel, ", ")
                                                  .concat(GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.purchased-renews")), " ")
                                                  .concat(GObject.GLocale.toLocaleDate(new Date(subscription.endDate)), ".")
                                          ),
                                        createPrompt(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.prompt-cancel-title")),
                                            GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.prompt-cancel-info"))
                                                .replace("%app", TITLE)
                                                .replace("%date", GObject.GLocale.toLocaleDate(new Date(subscription.endDate))),
                                            GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")),
                                            async (prompt) => {
                                                this._toggleLoading(true);
                                                try {
                                                    (await gApi
                                                        .deactivateSubscription(subscription.id, purchase.provider)
                                                        .then(() => {
                                                            (gDesigner.stats("profile-dialog_purchase-panel_cancel-subscription"),
                                                                prompt.remove(),
                                                                this._addOrUpdateItem(purchase, itemElement));
                                                        })
                                                        .catch((error) => this._handleError(error)),
                                                        await licenseManager.checkLicense());
                                                } finally {
                                                    this._toggleLoading(false);
                                                }
                                            }
                                        ));
                                else {
                                    if (
                                        (statusLabel.text(
                                            ""
                                                .concat(baseLabel, ", ")
                                                .concat(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.subscription-ends")).replace(
                                                        "%date",
                                                        GObject.GLocale.toLocaleDate(new Date(subscription.endDate))
                                                    ),
                                                    "."
                                                )
                                        ),
                                        !this._allowReactivateSubscriptions)
                                    )
                                        return;
                                    if (subscription.repurchase) return;
                                    let activatePrompt = createPrompt(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.prompt-activate-title")),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.prompt-activate-info")).replace(
                                            "%date",
                                            GObject.GLocale.toLocaleDate(new Date(subscription.nextBillingDate))
                                        ),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.prompt-activate-label")),
                                        async (prompt) => {
                                            this._toggleLoading(true);
                                            try {
                                                (await gApi
                                                    .activateSubscription(subscription.id, purchase.provider)
                                                    .then(() => {
                                                        (gDesigner.stats("profile-dialog_purchase-panel_activate-subscription"),
                                                            prompt.remove(),
                                                            this._addOrUpdateItem(purchase, itemElement));
                                                    })
                                                    .catch((error) => this._handleError(error)),
                                                    await licenseManager.checkLicense());
                                            } finally {
                                                this._toggleLoading(false);
                                            }
                                        },
                                        appConfig.PURCHASEPANEL.HAS_HIGHLIGHT
                                    );
                                    allowReinstate && activatePrompt.addClass("show");
                                }
                            })
                            .catch(() => statusLabel.text(baseLabel + ".")));
                }
                return ($("<div></div>").addClass("purchased").append($("<label></label>").append(statusLabel)).appendTo(itemElement), itemElement);
            }),
            (GPurchasePanel.prototype._handleError = function (error) {
                let message = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.something-wrong"));
                (error && error.message ? (message = error.message) : error && error.errors && (message = error.errors.map((errorEntry) => errorEntry[1]).join("<br>")), this._messageHandler(message));
            }),
            (GPurchasePanel.prototype._toggleLoading = function (isLoading) {
                isLoading ? this._container.addClass("g-loading") : this._container.removeClass("g-loading");
            }),
            (GPurchasePanel.prototype.getHTMLElement = function () {
                return this._container;
            }),
            (module.exports = GPurchasePanel));
    };
