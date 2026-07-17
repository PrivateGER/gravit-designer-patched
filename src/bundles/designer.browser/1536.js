module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(3), require(71 /* polyfill:String */), require(4), require(13), require(32), require(97), require(33), require(26));
        var editorModule = require(53),
            GObject = require(1),
            ownerUtil = _interopRequireDefault(require(358 /* GAnnotationsUtils */)),
            GProperties = require(123);
        const GCollaborationEvent = require(393),
            GApplicationStateChangedEvent = require(392),
            GFileReviewManager = require(1165),
            GSettingChangedEvent = require(135);
        function GAnnotationProperties(availableProperties, propertyClass, propertyTool, toolbarIcon, toolbarTooltip, tooltips, statType, panelClass) {
            ((this._elements = []),
                (this._availableProperties = availableProperties || []),
                (this._propertyClass = propertyClass),
                (this._propertyTool = propertyTool),
                (this._toolbarIcon = toolbarIcon),
                (this._toolbarTooltip = toolbarTooltip),
                (this._tooltips = tooltips),
                (this._pendingUpdates = new Map()),
                (this._statType = statType),
                (this._panelClass = panelClass));
        }
        (GObject.GObject.inherit(GAnnotationProperties, GProperties),
            (GAnnotationProperties.PropertySet = {
                BorderHeadMarker: "_bhm",
                BorderTailMarker: "_btm",
                FillLayer: "_ptf",
                BorderLayer: "_ptb",
                BorderWidth: "_bw",
            }),
            (GAnnotationProperties.PropertyTarget = {
                FillLayer: GAnnotationProperties.PropertySet.FillLayer,
                BorderLayer: GAnnotationProperties.PropertySet.BorderLayer,
                Element: null,
            }),
            (GAnnotationProperties.prototype._panel = null),
            (GAnnotationProperties.prototype._pendingUpdates = null),
            (GAnnotationProperties.prototype._document = null),
            (GAnnotationProperties.prototype._elements = null),
            (GAnnotationProperties.prototype._availableProperties = null),
            (GAnnotationProperties.prototype._propertyClass = null),
            (GAnnotationProperties.prototype._propertyTool = null),
            (GAnnotationProperties.prototype._toolbarIcon = null),
            (GAnnotationProperties.prototype._toolbarTooltip = null),
            (GAnnotationProperties.prototype._tooltips = null),
            (GAnnotationProperties.prototype._isEditing = false),
            (GAnnotationProperties.prototype.init = function (panel, container) {
                ((this._panel = panel), this._panel.addClass(this._panelClass));
                var createPropertyControl = function (propertyKey) {
                        var self = this;
                        if (propertyKey === GAnnotationProperties.PropertySet.BorderLayer || propertyKey === GAnnotationProperties.PropertySet.FillLayer) {
                            let layerTitleKey,
                                getStatsPath = () =>
                                    propertyKey === GAnnotationProperties.PropertySet.FillLayer
                                        ? self._statType + "/FillColor"
                                        : propertyKey === GAnnotationProperties.PropertySet.BorderLayer
                                          ? self._statType + "/OutlineColor"
                                          : void 0,
                                chooserElement = $("<div></div>")
                                    .attr("data-property", propertyKey)
                                    .toggleClass("g-disabled", !this._getAppManager().isCommentingEditingEnabled())
                                    .gPatternChooser({
                                        types: [GObject.GColor],
                                        singleOption: true,
                                        onOpen: function () {
                                            gDesigner.stats("annotations_open_patternchooser", getStatsPath());
                                        },
                                        onClickEyedropper: function () {
                                            gDesigner.stats("annotations_click_eyedropper", getStatsPath());
                                        },
                                    })
                                    .on("chooseropen", function () {
                                        try {
                                            (self._document.getEditor().hideSelection(), (self._chooserElem = $(this)));
                                        } finally {
                                            self.setIsEditing(true);
                                        }
                                    })
                                    .on("chooserclose", function (event, deferClose, overlayId) {
                                        try {
                                            (gDesigner.getWorkspace().getStyleEdManager().getOverlayLock(overlayId)
                                                ? deferClose()
                                                : ((self._styleEdOn = false),
                                                  gDesigner.getWorkspace().getStyleEdManager().deactivateEditor(),
                                                  self._document && self._document.getEditor().resetHideSelection()),
                                                (self._chooserElem = null));
                                        } finally {
                                            self.setIsEditing(false);
                                        }
                                    })
                                    .on("patternchange", function (event, pattern, opacity, temporary, chooserOn, activeStopIdx) {
                                        if (self._getAppManager().isCommentingEditingEnabled()) {
                                            var properties = ["_vs"],
                                                values = [true];
                                            (void 0 !== pattern && (properties.push("_pt"), values.push(pattern)),
                                                "number" == typeof opacity && (properties.push("_op"), values.push(opacity)));
                                            var options = null;
                                            (chooserOn && ((options = { chooserOn: true }), null != activeStopIdx && (options.activeStopIdx = activeStopIdx)),
                                                self._assignProperties(
                                                    properties,
                                                    values,
                                                    GObject.GLocale.get(
                                                        new GObject.GLocaleKey("GAnnotationProperties", "text.change-annotation-style")
                                                    ),
                                                    temporary,
                                                    propertyKey,
                                                    options
                                                ));
                                        }
                                    })
                                    .prepend(
                                        this._availableProperties.includes(GAnnotationProperties.PropertySet.BorderLayer) &&
                                            this._availableProperties.includes(GAnnotationProperties.PropertySet.FillLayer)
                                            ? $("<span>")
                                                  .addClass("gravit-icon")
                                                  .addClass("patternchooser-icon")
                                                  .addClass(
                                                      propertyKey === GAnnotationProperties.PropertySet.BorderLayer ? "gravit-icon-pen" : "gravit-icon-annotation-fill"
                                                  )
                                            : null
                                    );
                            return (
                                chooserElement
                                    .find("span.preview.g-button")
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", this._tooltips[propertyKey]))),
                                chooserElement
                                    .find("div.eyedropper")
                                    .attr(
                                        "data-title",
                                        GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", this._tooltips[propertyKey + "dropper"]))
                                    ),
                                (layerTitleKey =
                                    propertyKey === GAnnotationProperties.PropertySet.BorderLayer
                                        ? new GObject.GLocaleKey("GStylable", "layer.border")
                                        : new GObject.GLocaleKey("GStylable", "layer.fill")),
                                chooserElement.append($("<span/>").addClass("layer-title").text(GObject.GLocale.get(layerTitleKey))),
                                chooserElement
                            );
                        }
                        if (propertyKey === GAnnotationProperties.PropertySet.BorderWidth) {
                            var updateBorderWidth = (updateBorderWidth, temporary) => {
                                if (this._getAppManager().isCommentingEditingEnabled()) {
                                    gDesigner.stats("annotations_line-width", this._statType);
                                    var unitValue = $(updateBorderWidth).gUnitBox("value"),
                                        pxValue = unitValue ? unitValue.toUnit(GObject.GLength.Unit.PX) : null;
                                    if (null !== pxValue && pxValue >= 0) {
                                        const properties = ["_vs", propertyKey],
                                            values = [true, pxValue],
                                            actionName = void 0,
                                            target = GAnnotationProperties.PropertyTarget.BorderLayer;
                                        (temporary ? this._recordPendingUpdateForSelection(propertyKey, properties, values, actionName, target) : this._cleanPendingUpdateForSelection(propertyKey),
                                            self._assignProperties(properties, values, actionName, temporary, target));
                                    } else self._updateProperties();
                                }
                            };
                            return $("<input>")
                                .attr("data-property", propertyKey)
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", this._tooltips[propertyKey])))
                                .toggleClass("g-disabled", !this._getAppManager().isCommentingEditingEnabled())
                                .prop("disabled", !this._getAppManager().isCommentingEditingEnabled())
                                .on("change", function () {
                                    updateBorderWidth(this, true);
                                })
                                .blur(function () {
                                    updateBorderWidth(this);
                                })
                                .gUnitBox({ minValue: 0, source: "border" });
                        }
                        if (propertyKey === GAnnotationProperties.PropertySet.BorderHeadMarker || propertyKey === GAnnotationProperties.PropertySet.BorderTailMarker) {
                            const handleMarkerToggle = (handleMarkerToggle) => {
                                    if (!this._getAppManager().isCommentingEditingEnabled()) return;
                                    const checked = $(handleMarkerToggle.target).prop("checked"),
                                        markerSide = propertyKey === GAnnotationProperties.PropertySet.BorderHeadMarker ? "head" : "tail";
                                    (gDesigner.stats("annotations_border-marker_".concat(markerSide), checked ? "on" : "off"),
                                        self._assignProperty(
                                            propertyKey,
                                            checked ? GObject.GStylable.BorderMarker.Arrow : null,
                                            void 0,
                                            void 0,
                                            GAnnotationProperties.PropertyTarget.BorderLayer
                                        ));
                                },
                                markerCheckbox = $("<input>")
                                    .attr("data-property", propertyKey)
                                    .addClass("custom-checkbox-mode")
                                    .attr("type", "checkbox")
                                    .toggleClass("g-disabled", !this._getAppManager().isCommentingEditingEnabled())
                                    .prop("disabled", !this._getAppManager().isCommentingEditingEnabled())
                                    .on("change", handleMarkerToggle);
                            return (
                                gDesigner.isTouchEnabled() && markerCheckbox.gCheckboxSlider(),
                                $("<label>")
                                    .append(markerCheckbox)
                                    .append(
                                        $("<span>").text(
                                            propertyKey === GAnnotationProperties.PropertySet.BorderTailMarker
                                                ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", "text.end-arrow"))
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", "text.start-arrow"))
                                        )
                                    )
                            );
                        }
                        throw new Error("Unknown input property: " + propertyKey);
                    }.bind(this),
                    columns = [];
                this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderHeadMarker) >= 0 &&
                    this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderTailMarker) >= 0 &&
                    (this._availableProperties.splice(this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderHeadMarker), 1),
                    this._availableProperties.splice(this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderTailMarker), 1),
                    this._availableProperties.push("arrows"));
                for (var r = 0; r < this._availableProperties.length; r++) {
                    let property = this._availableProperties[r];
                    columns.push({
                        clazz:
                            this._availableProperties.includes(GAnnotationProperties.PropertySet.BorderLayer) &&
                            this._availableProperties.includes(GAnnotationProperties.PropertySet.FillLayer)
                                ? "larger"
                                : "arrows" === property
                                  ? "auto-grow"
                                  : "medium",
                        content:
                            "arrows" === property
                                ? $("<div>")
                                      .append(createPropertyControl(GAnnotationProperties.PropertySet.BorderHeadMarker))
                                      .append(createPropertyControl(GAnnotationProperties.PropertySet.BorderTailMarker))
                                      .addClass("arrows")
                                : createPropertyControl(property),
                    });
                }
                ($("<div></div>").gPropertyRow({ columns: columns }).appendTo(this._panel),
                    this._availableProperties.indexOf(GAnnotationProperties.PropertySet.FillLayer) >= 0 &&
                        this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderLayer) >= 0 &&
                        this._panel
                            .find('[data-property="'.concat(GAnnotationProperties.PropertySet.FillLayer, '"]'))
                            .closest(".column")
                            .css("margin-right", "40px"),
                    this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderWidth) >= 0 &&
                        this._panel
                            .find('[data-property="'.concat(GAnnotationProperties.PropertySet.BorderWidth, '"]'))
                            .closest(".column")
                            .css("margin-right", "10px"),
                    (this._toolbarButton = $("<button>")
                        .attr("class", "toolbar-button icon " + this._toolbarIcon)
                        .toggleClass("g-disabled", !this._getAppManager().isCommentingEditingEnabled())
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationProperties", this._toolbarTooltip)))
                        .on("click", () => {
                            if (
                                (gDesigner.stats("annotations_click_toolbar-btn", this._statType),
                                this._getAppManager().isCommentingEditingEnabled())
                            ) {
                                var propertyToolInstance = gDesigner.getToolManager().getTool(this._propertyTool);
                                propertyToolInstance === gDesigner.getToolManager().getActiveTool()
                                    ? gDesigner.getToolManager().activateTool(editorModule.GPointerTool, null, true)
                                    : gDesigner.getToolManager().activateTool(propertyToolInstance, null, true);
                            }
                        })
                        .data("toolClass", this._propertyTool)
                        .prependTo(container)));
            }),
            (GAnnotationProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateTouchComponents();
            }),
            (GAnnotationProperties.prototype._updateTouchComponents = function (e) {
                const checkboxInputs = this._panel.find(".custom-checkbox-mode");
                gDesigner.isTouchEnabled() ? checkboxInputs.gCheckboxSlider() : checkboxInputs.gCheckboxSlider("unmount");
            }),
            (GAnnotationProperties.prototype.update = function (document, elements, tool) {
                if (
                    (this._document &&
                        (this._applyPendingUpdateForSelection(),
                        gDesigner.removeEventListener(GApplicationStateChangedEvent, this._stateChangedEvent, this),
                        gDesigner.getFileReviewManager().removeEventListener(GFileReviewManager.UpdateEvent, this._handleReviewUpdate, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged, this),
                        this._document.getScene() &&
                            this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        this._document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this),
                        (this._document = null)),
                    (this._elements = []),
                    document && elements && document.getScene())
                ) {
                    if (
                        (gDesigner.addEventListener(GApplicationStateChangedEvent, this._stateChangedEvent, this),
                        gDesigner.getFileReviewManager().addEventListener(GFileReviewManager.UpdateEvent, this._handleReviewUpdate, this),
                        gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                        elements)
                    )
                        for (var o = 0; o < elements.length; ++o) {
                            var i = elements[o];
                            ((i instanceof GObject.GStyle && tool && tool instanceof this._propertyTool) ||
                                (i instanceof this._propertyClass && i.hasMixin(GObject.GAnnotation))) &&
                                this._elements.push(i);
                        }
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.addEventListener(GCollaborationEvent, this._collaborationEvent, this),
                            this._updateProperties(),
                            this._updateTouchComponents(),
                            true
                        );
                }
                return false;
            }),
            (GAnnotationProperties.prototype._collaborationEvent = async function (event) {
                switch (event.type) {
                    case GCollaborationEvent.Type.ReviewStatusChanged:
                        (this._updateToolbar(), this._elements.length && this._updateProperties());
                }
            }),
            (GAnnotationProperties.prototype._handleReviewUpdate = async function (e) {
                (this._updateToolbar(), this._elements.length && this._updateProperties());
            }),
            (GAnnotationProperties.prototype._stateChangedEvent = async function (event) {
                (this._updateToolbar(), this._document && event.document === this._document && this._updateProperties());
            }),
            (GAnnotationProperties.prototype._getAppManager = function () {
                return (this._appManager || (this._appManager = gDesigner.getApplicationManager()), this._appManager);
            }),
            (GAnnotationProperties.prototype._updateToolbar = function () {
                this._toolbarButton.toggleClass("g-disabled", !this._getAppManager().isCommentingEditingEnabled());
            }),
            (GAnnotationProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary &&
                    event.node === this._elements[0] &&
                    this._availableProperties.some((property) => event.properties.indexOf(property) >= 0) &&
                    this._updateProperties();
            }),
            (GAnnotationProperties.prototype._recordPendingUpdateForSelection = function (propertyKey, props, values, title, target) {
                this._pendingUpdates.set(propertyKey, {
                    props: props,
                    values: values,
                    title: title,
                    target: target,
                });
            }),
            (GAnnotationProperties.prototype._cleanPendingUpdateForSelection = function (propertyKey) {
                this._pendingUpdates.delete(propertyKey);
            }),
            (GAnnotationProperties.prototype._applyPendingUpdateForSelection = function () {
                let onlyPropertyKey = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                function applyUpdate(propertyKey) {
                    const pendingUpdate = this._pendingUpdates.get(propertyKey);
                    pendingUpdate && this._assignProperties(pendingUpdate.props, pendingUpdate.values, pendingUpdate.title, false, pendingUpdate.target);
                }
                onlyPropertyKey
                    ? applyUpdate.call(this, onlyPropertyKey)
                    : this._pendingUpdates.forEach((value, propertyKey) => {
                          (applyUpdate.call(this, propertyKey), this._cleanPendingUpdateForSelection(propertyKey));
                      });
            }),
            (GAnnotationProperties.prototype._updateProperties = function () {
                if (!this._elements || !this._elements.length) return void console.warn("GAnnotationProperties: empty _elements array");
                if (!this._document.getScene()) return void console.warn("Scene is null");
                var element = this._elements[0];
                editorModule.GElementEditor.getEditor(element);
                const canEdit = !element.hasMixin(GObject.GAnnotation) || ownerUtil.default.isOwner(gDesigner.getSyncUser(), element),
                    commentingEnabled = this._getAppManager().isCommentingEditingEnabled();
                if (this._availableProperties.indexOf(GAnnotationProperties.PropertySet.FillLayer) >= 0) {
                    var layer = element.getPaintLayers().getFillLayers()[0];
                    (this._panel
                        .find('[data-property="'.concat(GAnnotationProperties.PropertySet.FillLayer, '"]'))
                        .gPatternChooser("setPattern", layer ? layer.getProperty("_pt", false, false, true) : null)
                        .gPatternChooser("value", layer ? layer.getProperty("_pt", false, false, true) : null)
                        .gPatternChooser("opacity", layer ? layer.getProperty("_op", false, false, true) : null),
                        canEdit && commentingEnabled
                            ? this._panel.find('[data-property="'.concat(GAnnotationProperties.PropertySet.FillLayer, '"]')).removeClass("g-disabled")
                            : this._panel.find('[data-property="'.concat(GAnnotationProperties.PropertySet.FillLayer, '"]')).addClass("g-disabled"));
                }
                if (this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderLayer) >= 0) {
                    layer = element.getPaintLayers().getBorderLayers()[0];
                    (this._panel
                        .find('[data-property="'.concat(GAnnotationProperties.PropertySet.BorderLayer, '"]'))
                        .gPatternChooser("setPattern", layer ? layer.getProperty("_pt", false, false, true) : null)
                        .gPatternChooser("value", layer ? layer.getProperty("_pt", false, false, true) : null)
                        .gPatternChooser("opacity", layer ? layer.getProperty("_op", false, false, true) : null),
                        canEdit && commentingEnabled
                            ? this._panel.find('[data-property="'.concat(GAnnotationProperties.PropertySet.BorderLayer, '"]')).removeClass("g-disabled")
                            : this._panel.find('[data-property="'.concat(GAnnotationProperties.PropertySet.BorderLayer, '"]')).addClass("g-disabled"));
                }
                if (this._availableProperties.indexOf(GAnnotationProperties.PropertySet.BorderWidth) >= 0) {
                    var borderWidthStr = (layer = element.getPaintLayers().getBorderLayers()[0]).getProperty(GAnnotationProperties.PropertySet.BorderWidth).toString(),
                        borderWidthInput = this._panel.find('[data-property="'.concat(GAnnotationProperties.PropertySet.BorderWidth, '"]'));
                    (borderWidthInput
                        .gUnitBox({
                            unit: this._document.getScene().$ut === GObject.GLength.Unit.PX ? GObject.GLength.Unit.PX : GObject.GLength.Unit.PT,
                            minValue: 0,
                        })
                        .gUnitBox("value", null !== borderWidthStr ? new GObject.GLength.parseLength(borderWidthStr, GObject.GLength.Unit.PT) : null),
                        canEdit && commentingEnabled ? borderWidthInput.removeClass("g-disabled").attr("disabled", false) : borderWidthInput.addClass("g-disabled").attr("disabled", true));
                }
                [GAnnotationProperties.PropertySet.BorderHeadMarker, GAnnotationProperties.PropertySet.BorderTailMarker]
                    .filter((markerProperty) => this._availableProperties.indexOf(markerProperty) >= 0 || this._availableProperties.includes("arrows"))
                    .forEach((markerProperty) => {
                        var markerValue = element.getPaintLayers().getBorderLayers()[0].getProperty(markerProperty),
                            markerInput = this._panel.find('[data-property="' + markerProperty + '"]');
                        (markerInput.prop("checked", !!markerValue),
                            canEdit && commentingEnabled
                                ? (markerInput.removeClass("g-disabled"), markerInput.attr("disabled", false))
                                : (markerInput.addClass("g-disabled"), markerInput.attr("disabled", true)));
                    });
            }),
            (GAnnotationProperties.prototype._assignProperty = function (property, value, actionName, temporary, target, options) {
                this._assignProperties([property], [value], actionName, temporary, target, options);
            }),
            (GAnnotationProperties.prototype._assignProperties = function (properties, values, actionName, temporary, target, options) {
                if (this._document) {
                    var editor = this._document.getEditor();
                    temporary || editor.beginTransaction();
                    try {
                        for (var extraOptions = null, c = 0; c < this._elements.length; ++c) {
                            var layer;
                            (target === GAnnotationProperties.PropertyTarget.FillLayer
                                ? ((layer = this._elements[c].getPaintLayers().getFillLayers()[0]) ||
                                      ((layer = new GObject.GStylable.FillPaintLayer()), this._elements[c].getPaintLayers().appendChild(layer)),
                                  (extraOptions = $.extend({ fillLayerIndex: layer.getParent().getIndexOfChild(layer) }, extraOptions || options)))
                                : target === GAnnotationProperties.PropertyTarget.BorderLayer
                                  ? ((layer = this._elements[c].getPaintLayers().getBorderLayers()[0]) ||
                                        ((layer = new GObject.GStylable.BorderPaintLayer()), this._elements[c].getPaintLayers().appendChild(layer)),
                                    (extraOptions = $.extend({ borderLayerIndex: layer.getParent().getIndexOfChild(layer) }, extraOptions || options)))
                                  : (layer = this._elements[c]),
                                layer && layer.setProperties(properties, values, false, false, temporary));
                        }
                    } finally {
                        temporary || editor.commitTransaction(actionName, extraOptions);
                    }
                } else console.warn("GAnnotationProperties: empty _document property");
            }),
            (GAnnotationProperties.prototype.isEditing = function () {
                return this._isEditing;
            }),
            (GAnnotationProperties.prototype.setIsEditing = function (editing) {
                this._isEditing = editing;
            }),
            (GAnnotationProperties.prototype.toString = function () {
                return "[Object GAnnotationProperties]";
            }),
            (module.exports = GAnnotationProperties));
    };
