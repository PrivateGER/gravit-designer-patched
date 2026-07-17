module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(13));
        var GObject = require(1),
            editors = require(53),
            touchToolModule = _interopRequireDefault(require(340)),
            GProperties = require(123),
            GSettingChangedEvent = (require(173), require(135));
        function GSliceProperties() {
            this._slices = [];
        }
        (GObject.GObject.inherit(GSliceProperties, GProperties),
            (GSliceProperties.prototype._panel = null),
            (GSliceProperties.prototype._document = null),
            (GSliceProperties.prototype._slices = null),
            (GSliceProperties.prototype._ownChange = false),
            (GSliceProperties.prototype._chooserElem = null),
            (GSliceProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel), this._panel.addClass("slice-property-panel"), this.setTouchTools([touchToolModule.default.APPEARANCE_TOUCH_TOOL]));
                var createControl = function (property) {
                    var self = this;
                    if ("x" === property || "y" === property || "w" === property || "h" === property)
                        return $("<input>")
                            .addClass(property + "-input")
                            .attr("type", "text")
                            .attr("data-property", property)
                            .on(
                                "change",
                                function (event) {
                                    (gDesigner.stats("sliceproperties_change_size"),
                                        self._assignProperty(property, self._document.getScene().stringToPoint($(event.target).gInputBox("value"))));
                                }.bind(self)
                            )
                            .gInputBox({ minValue: "w" === property || "h" === property ? 1e-10 : null });
                    if ("cls" === property)
                        return $("<button></button>")
                            .attr("data-property", property)
                            .gPatternChooser({ types: [GObject.GColor], hasOpacity: false })
                            .on("chooseropen", function () {
                                (self._document.getEditor().hideSelection(), (self._chooserElem = $(this)));
                            })
                            .on("chooserclose", function (event, n, o) {
                                (self._document && self._document.getEditor().resetHideSelection(), (self._chooserElem = null));
                            })
                            .on(
                                "patternchange",
                                function (event, pattern, opacity, temporary, chooserOn) {
                                    var extra = null;
                                    (chooserOn && (extra = { chooserOn: true, slicePattern: true }), self._assignProperty(property, pattern, temporary, extra));
                                }.bind(self)
                            );
                    if ("cls-check" === property)
                        return $("<label></label>")
                            .addClass("g-checkbox-label")
                            .append(
                                $("<input>")
                                    .addClass("cls-check-checkbox")
                                    .attr("type", "checkbox")
                                    .attr("data-property", property)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("sliceproperties_change_background"),
                                                self._assignProperty("cls", $(event.target).is(":checked") ? GObject.GRGBColor.WHITE : null));
                                        }.bind(self)
                                    )
                            )
                            .append($("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.background-color")) + "</span>"));
                    if ("trm" === property)
                        return $("<label></label>")
                            .addClass("g-checkbox-label")
                            .append(
                                $("<input>")
                                    .addClass("trm-checkbox")
                                    .attr("type", "checkbox")
                                    .attr("data-property", property)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("sliceproperties_trim_transparent"),
                                                self._assignProperty(property, $(event.target).is(":checked")));
                                        }.bind(self)
                                    )
                            )
                            .append(
                                $(
                                    "<span>" +
                                        GObject.GLocale.get(new GObject.GLocaleKey("GSliceProperties", "text.trim-transparent-pixels")) +
                                        "</span>"
                                )
                            );
                    throw new Error("Unknown input property: " + property);
                }.bind(this);
                ($("<div></div>")
                    .addClass("slice-position-left-row")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.left")),
                        columns: [{ width: "44%", content: createControl("x") }],
                    })
                    .appendTo(panel),
                    $("<div></div>")
                        .addClass("slice-position-top-row")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.top")),
                            columns: [{ width: "44%", content: createControl("y") }],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("slice-size-width-row")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")),
                            columns: [{ width: "44%", content: createControl("w") }],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("slice-size-height-row")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")),
                            columns: [{ width: "44%", content: createControl("h") }],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("slice-trm-row")
                        .gPropertyRow({ columns: [{ width: "100%", content: createControl("trm") }] })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("slice-bg-row")
                        .gPropertyRow({
                            columns: [
                                { width: "80%", content: createControl("cls-check") },
                                { width: "20%", content: createControl("cls") },
                            ],
                        })
                        .appendTo(panel));
            }),
            (GSliceProperties.prototype.update = function (document, elements, modifiedEvent) {
                if ((this._updateUI(), this._ownChange)) return true;
                if (
                    (this._chooserElem && this._chooserElem.gPatternChooser("close"),
                    this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._slices = []),
                    document)
                ) {
                    for (var o = 0; o < elements.length; ++o) elements[o] instanceof GObject.GSlice && this._slices.push(elements[o]);
                    if (this._slices.length && this._slices.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._updateProperties(modifiedEvent),
                            true
                        );
                }
                return false;
            }),
            (GSliceProperties.prototype._updateUI = function () {
                let removeInputLabel = (removeInputLabel) => {
                        removeInputLabel.prev().remove();
                    },
                    addInputLabel = (input, addInputLabel) => {
                        input.prev().length || $("<span/>").addClass("g-input-label").text(addInputLabel).insertBefore(input);
                    },
                    positionLabel = this._panel.find(".slice-position-left-row .property-label span"),
                    sizeLabel = this._panel.find(".slice-size-width-row .property-label span"),
                    xInput = this._panel.find(".x-input"),
                    yInput = this._panel.find(".y-input"),
                    wInput = this._panel.find(".w-input"),
                    hInput = this._panel.find(".h-input");
                gDesigner.isTouchEnabled()
                    ? (this._panel.find(".trm-checkbox").gCheckboxSlider(),
                      this._panel.find(".cls-check-checkbox").gCheckboxSlider(),
                      positionLabel.text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.position"))),
                      sizeLabel.text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size"))),
                      addInputLabel(xInput, "x"),
                      addInputLabel(yInput, "y"),
                      addInputLabel(wInput, "w"),
                      addInputLabel(hInput, "h"))
                    : (this._panel.find(".trm-checkbox").gCheckboxSlider("unmount"),
                      this._panel.find(".cls-check-checkbox").gCheckboxSlider("unmount"),
                      positionLabel.text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.left"))),
                      sizeLabel.text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width"))),
                      removeInputLabel(xInput),
                      removeInputLabel(yInput),
                      removeInputLabel(wInput),
                      removeInputLabel(hInput));
            }),
            (GSliceProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._slices.length > 0 && this._slices[0] === event.node && this._updateProperties();
            }),
            (GSliceProperties.prototype._settingChanged = function (event) {
                ("decimals_num" === event.key && this._updateProperties(), "touch" === event.key && this._updateUI());
            }),
            (GSliceProperties.prototype._updateProperties = function (modifiedEvent) {
                var scene = this._document.getScene(),
                    slice = this._slices[0],
                    updateField = function (property) {
                        var input = this._panel.find('input[data-property="' + property + '"]');
                        this._slices.length > 1
                            ? input.gInputBox("value", null).prop("disabled", true)
                            : input.gInputBox("value", scene.pointToString(slice.getProperty(property), scene.getOptimalDecimalsCount())).prop("disabled", false);
                    }.bind(this);
                (updateField("x"), updateField("y"), updateField("w"), updateField("h"));
                var backgroundColor = slice.getProperty("cls");
                (this._panel.find('[data-property="cls-check"]').prop("checked", !!backgroundColor),
                    this._panel.find('[data-property="cls"]').prop("disabled", !backgroundColor).gPatternChooser("value", slice.getProperty("cls")),
                    this._panel.find('input[data-property="trm"]').prop("checked", slice.getProperty("trm")),
                    modifiedEvent &&
                        (modifiedEvent.evtType == editors.GEditor.ModifiedEvent.Type.Undo || modifiedEvent.evtType == editors.GEditor.ModifiedEvent.Type.Redo) &&
                        modifiedEvent.chooserOn &&
                        modifiedEvent.slicePattern &&
                        this._panel.find('[data-property="cls"]').find(".preview").trigger("click"));
            }),
            (GSliceProperties.prototype._assignProperty = function (property, value, temporary, options) {
                this._assignProperties([property], [value], temporary, options);
            }),
            (GSliceProperties.prototype._assignProperties = function (properties, values, temporary, options) {
                if (temporary) for (var a = 0; a < this._slices.length; ++a) this._slices[a].setProperties(properties, values, true);
                else {
                    this._ownChange = true;
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (a = 0; a < this._slices.length; ++a) this._slices[a].setProperties(properties, values);
                    } finally {
                        (editor.commitTransaction(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSliceProperties", "action.modify-slice-properties")),
                            options || null
                        ),
                            (this._ownChange = false));
                    }
                }
            }),
            (GSliceProperties.prototype.toString = function () {
                return "[Object GSliceProperties]";
            }),
            (module.exports = GSliceProperties));
    };
