module.exports = function (module, exports, require) {
        "use strict";
        (require(168 /* PDFFetchStream */), require(4), require(41), require(13), require(169 /* PDFNetworkStream */));
        var GObject = require(1);
        const i = require(238),
            a = (e) => {
                e.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .append($("<span/>").addClass("gravit-icon-pages"))
                        .append($("<span/>").addClass("caption"))
                        .append($("<span/>").addClass("gravit-icon-down"))
                );
            },
            r = (e, t) => {
                e.empty()
                    .append(
                        $("<div />")
                            .addClass("action-button")
                            .append($("<span />").addClass("gravit-icon-touch-pages-panel"))
                            .append($("<span />").addClass("caption"))
                    )
                    .append(t);
            },
            s = {
                init: function () {
                    return this.each(function () {
                        const e = $(this),
                            t = $("<button />").addClass("dropdown-button").append($("<span></span>").addClass("gravit-icon-down"));
                        e.data("g-page-button-dropdownbutton", t);
                        let n = new i(void 0, "g-page-menu");
                        (e.addClass("g-page-button").gMenuButton({
                            menu: () => {
                                const t = e.data("options") && e.data("options").scene;
                                return (
                                    t &&
                                        (n.clearItems(),
                                        t
                                            .getChildren()
                                            .filter((e) => e instanceof GObject.GPage && e.isVisible())
                                            .reduce(
                                                (e, t) => (
                                                    e.createAddItem(t.getLabel(), () => {
                                                        t.setFlag(GObject.GNode.Flag.Active);
                                                    }),
                                                    e
                                                ),
                                                n
                                            )),
                                    n
                                );
                            },
                            getActiveItem: () => {
                                const t = e.data("options") && e.data("options").scene;
                                if (t) {
                                    const e = t.getActivePage();
                                    if (e) return n.findItem(e.getLabel());
                                }
                                return null;
                            },
                            reference: () => (gDesigner.isTouchEnabled() ? t : null),
                        }),
                            gDesigner.isTouchEnabled() ? r(e) : a(e));
                    });
                },
                scene: function (e) {
                    const t = $(this),
                        n = t.data("options") || {};
                    return (
                        n.scene !== e &&
                            (n.scene && n.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, s._afterFlagChangeEvent, this),
                            (n.scene = e),
                            e &&
                                (s._activatePage.call(this, e.getActivePage()),
                                e.addEventListener(GObject.GNode.AfterFlagChangeEvent, s._afterFlagChangeEvent, this))),
                        t.data("options", n),
                        this
                    );
                },
                reinit: function () {
                    const e = $(this);
                    gDesigner.isTouchEnabled() ? r(e, e.data("g-page-button-dropdownbutton")) : a(e);
                    const t = (e.data("options") || {}).scene;
                    t &&
                        (s._activatePage.call(this, t.getActivePage()),
                        t.hasEventListeners(GObject.GNode.AfterFlagChangeEvent, s._afterFlagChangeEvent, this) ||
                            t.addEventListener(GObject.GNode.AfterFlagChangeEvent, s._afterFlagChangeEvent, this));
                },
                release: function () {
                    const e = $(this),
                        t = e.data("options");
                    return (
                        t && t.scene && t.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, s._afterFlagChangeEvent, this),
                        e.remove(),
                        this
                    );
                },
                _afterFlagChangeEvent: function (e) {
                    e.node instanceof GObject.GPage && e.flag === GObject.GNode.Flag.Active && s._activatePage.call(this, e.node);
                },
                _activatePage: function (e) {
                    $(this)
                        .find(".caption")
                        .text(e ? e.getLabel() : "");
                },
            };
        $.fn.gPageButton = function (e) {
            return s[e]
                ? s[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.gPageButton")
                  : s.init.apply(this, arguments);
        };
    };
