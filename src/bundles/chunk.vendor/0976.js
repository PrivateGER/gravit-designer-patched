module.exports = function (module, exports, require) {
            "use strict";
            (require(4), require(32), require(38), require(33));
            const n = require(171),
                r = require(375),
                o = require(170),
                GOfferDialogV1 = require(526);
            module.exports = class {
                constructor(e) {
                    let { page, content: i = "", title, cmd: s = {}, closeable: l = true } = e;
                    const { openPurchaseFlow, close } = s;
                    ((title = title || o.getValue("GOfferDialogV1", "text.offerdialog-v1-default-title")),
                        (this._dialog = n("<div></div>").addClass("g-cloud-ui-offer-dialog-v1")),
                        l &&
                            n("<div></div>")
                                .addClass("g-cloud-ui-btn-close")
                                .append(n("<span></span>").addClass("g-cloud-icon-close"))
                                .on("click", () => close && close())
                                .appendTo(this._dialog));
                    let c = n("<header></header>").appendTo(this._dialog);
                    ((this._title = n("<span></span>").addClass("title g-cloud-ui-markable").appendTo(c)),
                        Array.isArray(title) || (title = [title]),
                        title.forEach((e) => {
                            (n("<label></label>").html(e).appendTo(this._title), n("<br>").appendTo(this._title));
                        }));
                    let p = n("<main></main>").appendTo(this._dialog);
                    if ("object" == typeof i) {
                        (n("<span></span>").addClass("title").html(i.title).appendTo(p),
                            n("<div></div>")
                                .addClass("topics")
                                .appendTo(p)
                                .append(
                                    i.data.map((e) =>
                                        n("<div></div>").addClass("topic").append(n("<span></span>").addClass("g-cloud-icon-v").text(e))
                                    )
                                ));
                    } else "string" == typeof i && n("<span></span>").addClass("title no-bold").html(i).appendTo(p);
                    n("<div></div>")
                        .addClass("banner")
                        .append(n("<span></span>").text(o.getValue("GOfferDialogV1", "text.upgrade-tip")))
                        .appendTo(this._dialog);
                    let u = n("<footer></footer>").appendTo(this._dialog),
                        d = n("<div></div>").addClass("info").appendTo(u);
                    (n("<button></button>")
                        .addClass("g-cloud-ui-btn-pro highlighted")
                        .text(this._getFooterInfo().buy)
                        .on("click", () => {
                            (r("".concat(page || "offer", "_click_buybutton")), openPurchaseFlow && openPurchaseFlow());
                        })
                        .appendTo(d),
                        n("<div></div>").addClass("money-back").appendTo(d));
                }
                _getFooterInfo() {
                    return GOfferDialogV1.footerInfo[this._prefix || GOfferDialogV1.FooterInfoType.Normal];
                }
                getHTMLElement() {
                    return this._dialog;
                }
            };
        };
