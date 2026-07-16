module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            i = require(123),
            GAppearanceProperties = require(1160);
        function r() {}
        (GObject.GObject.inherit(r, i),
            (r.prototype._panel = null),
            (r.prototype._document = null),
            (r.prototype._elements = null),
            (r.prototype.isGroup = function (e) {
                return e instanceof GAppearanceProperties;
            }),
            (r.prototype.init = function (e, t) {
                this._panel = e;
                var n = function (e) {
                    var t = parseInt($(e.target).closest("[data-op]").attr("data-op"));
                    gDesigner.stats(
                        "booleanops_click_" +
                            (t === GObject.GVertexPolyBoolean.OR
                                ? "merge"
                                : t === GObject.GVertexPolyBoolean.AND
                                  ? "intersect"
                                  : t === GObject.GVertexPolyBoolean.XOR
                                    ? "difference"
                                    : t === GObject.GVertexPolyBoolean.SUB
                                      ? "subtract"
                                      : "unkn")
                    );
                    var n = this._document.getEditor();
                    n.beginTransaction();
                    try {
                        for (var i = 0; i < this._elements.length; ++i) this._elements[i].setProperty("bool", t);
                    } finally {
                        n.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "action.modify-merge-mode")));
                    }
                }.bind(this);
                ($("<div></div>")
                    .addClass("compound-row")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.boolean")),
                        columns: [
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.OR)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.union")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-union"))
                                    .on("click", n),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.SUB)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.subtract")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-subtract"))
                                    .on("click", n),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.AND)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.intersect")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-intersect"))
                                    .on("click", n),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.XOR)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.difference")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-difference"))
                                    .on("click", n),
                            },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<hr/>").appendTo(this._panel));
            }),
            (r.prototype.update = function (e, t) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._elements = []),
                    e && t)
                ) {
                    for (var n = 0; n < t.length; ++n) {
                        var i = t[n];
                        if (i.getParent() && i.getParent() instanceof GObject.GCompoundShape && i.getPrevious()) this._elements.push(i);
                        else if (i instanceof GObject.GCompoundShape && i.getFirstChild())
                            for (var a = i.getFirstChild().getNext(); null !== a; a = a.getNext()) this._elements.push(a);
                    }
                    if (this._elements.length)
                        return (
                            (this._document = e),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (r.prototype._afterPropertiesChange = function (e) {
                !e.temporary && this._elements.length > 0 && this._elements[0] === e.node && this._updateProperties();
            }),
            (r.prototype._updateProperties = function () {
                var e = this._elements[0];
                this._panel.find("button[data-op]").each(function (t, n) {
                    var o = $(n);
                    o.toggleClass("g-active", e.getProperty("bool") === parseInt(o.attr("data-op")));
                });
            }),
            (r.prototype.toString = function () {
                return "[Object GBoolOpProperties]";
            }),
            (module.exports = r));
    };
