module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            GProperties = require(123),
            GAppearanceProperties = require(1160);
        function BoolOpProperties() {}
        (GObject.GObject.inherit(BoolOpProperties, GProperties),
            (BoolOpProperties.prototype._panel = null),
            (BoolOpProperties.prototype._document = null),
            (BoolOpProperties.prototype._elements = null),
            (BoolOpProperties.prototype.isGroup = function (previousProperties) {
                return previousProperties instanceof GAppearanceProperties;
            }),
            (BoolOpProperties.prototype.init = function (panel, toolbar) {
                this._panel = panel;
                var onOperationClick = function (event) {
                    var operation = parseInt($(event.target).closest("[data-op]").attr("data-op"));
                    gDesigner.stats(
                        "booleanops_click_" +
                            (operation === GObject.GVertexPolyBoolean.OR
                                ? "merge"
                                : operation === GObject.GVertexPolyBoolean.AND
                                  ? "intersect"
                                  : operation === GObject.GVertexPolyBoolean.XOR
                                    ? "difference"
                                    : operation === GObject.GVertexPolyBoolean.SUB
                                      ? "subtract"
                                      : "unkn")
                    );
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var i = 0; i < this._elements.length; ++i) this._elements[i].setProperty("bool", operation);
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "action.modify-merge-mode")));
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
                                    .on("click", onOperationClick),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.SUB)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.subtract")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-subtract"))
                                    .on("click", onOperationClick),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.AND)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.intersect")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-intersect"))
                                    .on("click", onOperationClick),
                            },
                            {
                                width: "25%",
                                content: $("<button></button>")
                                    .addClass("compound-chooser-btn")
                                    .attr("data-op", GObject.GVertexPolyBoolean.XOR)
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBoolOpProperties", "text.difference")))
                                    .append($("<span></span>").addClass("gravit-icon-merge-difference"))
                                    .on("click", onOperationClick),
                            },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<hr/>").appendTo(this._panel));
            }),
            (BoolOpProperties.prototype.update = function (document, elements) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._elements = []),
                    document && elements)
                ) {
                    for (var n = 0; n < elements.length; ++n) {
                        var i = elements[n];
                        if (i.getParent() && i.getParent() instanceof GObject.GCompoundShape && i.getPrevious()) this._elements.push(i);
                        else if (i instanceof GObject.GCompoundShape && i.getFirstChild())
                            for (var a = i.getFirstChild().getNext(); null !== a; a = a.getNext()) this._elements.push(a);
                    }
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (BoolOpProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._elements.length > 0 && this._elements[0] === event.node && this._updateProperties();
            }),
            (BoolOpProperties.prototype._updateProperties = function () {
                var firstElement = this._elements[0];
                this._panel.find("button[data-op]").each(function (index, button) {
                    var buttonElement = $(button);
                    buttonElement.toggleClass("g-active", firstElement.getProperty("bool") === parseInt(buttonElement.attr("data-op")));
                });
            }),
            (BoolOpProperties.prototype.toString = function () {
                return "[Object GBoolOpProperties]";
            }),
            (module.exports = BoolOpProperties));
    };
