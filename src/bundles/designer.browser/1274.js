module.exports = function (module, exports, require) {
        "use strict";
        (require(193), require(3), require(4), require(13));
        var GEditor = require(53),
            GObject = require(1),
            GAlignAction = require(866),
            GDistributeAction = require(867),
            GProperties = require(123),
            GSettingChangedEvent = require(135);
        function AlignProperties() {
            this._elements = [];
        }
        (GObject.GObject.inherit(AlignProperties, GProperties),
            (AlignProperties.prototype._panel = null),
            (AlignProperties.prototype._document = null),
            (AlignProperties.prototype._elements = null),
            (AlignProperties.prototype.isGroup = function (previousProperties) {
                return false;
            }),
            (AlignProperties.prototype.init = function (panel, toolbar) {
                this._panel = panel;
                var makeAlignButton = (alignType) => {
                    var actionId = GAlignAction.ID + "." + alignType,
                        action = gDesigner.getAction(actionId);
                    return $("<button></button>")
                        .attr("data-action", actionId)
                        .on("click", this._executeAction.bind(this))
                        .text(GObject.GLocale.get(action.getTitle()));
                };
                ($("<hr/>").appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    content: makeAlignButton(GEditor.GEditor.ArrangeAlignType.AlignJustifyHorizontal),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    content: makeAlignButton(GEditor.GEditor.ArrangeAlignType.AlignJustifyVertical),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GAlignProperties", "text.space-x")),
                                        width: "50px",
                                    },
                                    content: $("<input>")
                                        .on("keydown", this._spaceEvent.bind(this))
                                        .attr({ type: "text", "data-dist": GDistributeAction.Type.Horizontal })
                                        .val("1")
                                        .gInputBox({ minValue: 1 }),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GAlignProperties", "text.space-y")),
                                        width: "50px",
                                    },
                                    content: $("<input>")
                                        .on("keydown", this._spaceEvent.bind(this))
                                        .attr({ type: "text", "data-dist": GDistributeAction.Type.Vertical })
                                        .val("1")
                                        .gInputBox({ minValue: 1 }),
                                },
                            ],
                        })
                        .appendTo(this._panel));
            }),
            (AlignProperties.prototype._executeAction = function (event) {
                var actionId = $(event.target).closest("[data-action]").attr("data-action");
                actionId && gDesigner.executeAction(actionId, void 0, "alignproperties");
            }),
            (AlignProperties.prototype._spaceEvent = function (event) {
                if (13 === event.keyCode) {
                    var input = $(event.target).closest("input"),
                        distType = input.attr("data-dist"),
                        spacing = this._document.getScene().stringToPoint(input.gInputBox("value"));
                    (!isNaN(spacing) && spacing > 0 && gDesigner.executeAction(GDistributeAction.ID + "." + distType, [this._elements, null, spacing], "shortcut"),
                        this._updateDisplayValues());
                }
            }),
            (AlignProperties.prototype.isAvailable = function (value) {
                return true === value;
            }),
            (AlignProperties.prototype.update = function (document, elements) {
                if (
                    (this._document && ((this._document = null), gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged)),
                    (this._elements = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n)
                        !elements[n].hasMixin(GObject.GElement.Transform) || elements[n] instanceof GObject.GPage || this._elements.push(elements[n]);
                    if (this._elements.length >= 2 && this._elements.length === elements.length)
                        return ((this._document = document), gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this), true);
                }
                return false;
            }),
            (AlignProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updateDisplayValues();
            }),
            (AlignProperties.prototype._updateDisplayValues = function () {
                this._panel.find("[data-dist]").each(
                    function (index, input) {
                        var inputElement = $(input),
                            value = parseFloat(inputElement.gInputBox("value"));
                        ((value = isNaN(value) || value <= 0 || !value ? 1 : value),
                            inputElement.gInputBox("value", GObject.GUtil.formatNumber(value, this._document.getScene().getOptimalDecimalsCount())));
                    }.bind(this)
                );
            }),
            (AlignProperties.prototype.toString = function () {
                return "[Object GAlignProperties]";
            }),
            (module.exports = AlignProperties));
    };
