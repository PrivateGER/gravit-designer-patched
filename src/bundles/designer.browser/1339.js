module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(20 /* polyfill:RegExp */), require(3), require(71 /* polyfill:String */), require(34), require(4), require(41), require(13), require(32), require(33));
        var GObject = require(1),
            editorModule = require(53),
            Utils = require(40),
            designerConfig = require(10),
            richTooltipModule = require(67),
            touchToolModule = _interopRequireDefault(require(340)),
            GProperties = require(123),
            GPresets = require(1153),
            GSettingChangedEvent = require(135),
            GWindows = require(603),
            GPaintModeEvent = require(1328),
            GSceneProperties = require(442);
        const GSystemDialog = require(44),
            touchLayout = require(1604),
            GDocumentEvent = require(78);
        function GPageProperties() {}
        (GObject.GObject.inherit(GPageProperties, GProperties),
            (GPageProperties.prototype._panel = null),
            (GPageProperties.prototype._canvasPropertiesRowInTouch = null),
            (GPageProperties.prototype._canvasPropertiesRowInNormal = null),
            (GPageProperties.prototype._hrAfterCanvasRow = null),
            (GPageProperties.prototype._bleedRowInTouch = null),
            (GPageProperties.prototype._bleedRowInNormal = null),
            (GPageProperties.prototype._pageSizeRowInNormal = null),
            (GPageProperties.prototype._hrAfterPageSizeRow = null),
            (GPageProperties.prototype._toolbar = null),
            (GPageProperties.prototype._document = null),
            (GPageProperties.prototype._oldDocument = null),
            (GPageProperties.prototype._pages = null),
            (GPageProperties.prototype._styleEditorChange = false),
            (GPageProperties.prototype._styleEdOn = false),
            (GPageProperties.prototype._ownChange = false),
            (GPageProperties.prototype._chooserElem = null),
            (GPageProperties.prototype._clipContentButton = null),
            (GPageProperties.prototype._excludedPresets = [GPresets.TYPE.MERCH]),
            (GPageProperties.prototype._createInput = function (property) {
                var that = this,
                    self = this;
                if ("bck" === property)
                    return $("<div></div>")
                        .attr("data-property", property)
                        .gPatternChooser({
                            types: [GObject.GColor, GObject.GGradient, GObject.GTexturePattern],
                        })
                        .on("chooseropen", function () {
                            (gDesigner.getWorkspace().getStyleEdManager().updateEditor(self._pages[0], property, false),
                                (self._styleEdOn = true),
                                (self._chooserElem = $(this)),
                                self.updatePropertiesAvailability(gDesigner.getActiveDocument().getScene().getActivePage()));
                        })
                        .on("chooserclose", function (event, cancelClose, triggerEvent) {
                            if (gDesigner.getWorkspace().getStyleEdManager().getOverlayLock(triggerEvent)) cancelClose();
                            else {
                                if (self._document && self._document.hasCDR()) {
                                    var pattern = gPatternChooser.getPattern();
                                    !pattern || pattern instanceof GObject.GRGBColor || GSystemDialog.showCDRUnsupportedObjectWarning();
                                }
                                ((self._styleEdOn = false), gDesigner.getWorkspace().getStyleEdManager().deactivateEditor());
                            }
                            self._chooserElem = null;
                        })
                        .on("patternchange", function (event, value, opacity, temporary, pagePattern, stopIndex) {
                            var propertyNames = [],
                                propertyValues = [];
                            if ((void 0 !== value && (propertyNames.push("bck"), propertyValues.push(value)), "number" == typeof opacity && (propertyNames.push("bop"), propertyValues.push(opacity)), self._pages))
                                if (temporary)
                                    self._pages.forEach(function (page) {
                                        page.setProperties(propertyNames, propertyValues, false, false, temporary);
                                    });
                                else {
                                    var options = null;
                                    (pagePattern && ((options = { chooserOn: true, pagePattern: true }), null !== stopIndex && (options.activeStopIdx = stopIndex)),
                                        self._assignProperties(
                                            propertyNames,
                                            propertyValues,
                                            GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-background")),
                                            options
                                        ));
                                }
                        });
                if ("preset-size" === property)
                    return $("<select></select>")
                        .attr("data-property", "preset-size")
                        .css("width", "100%")
                        .on("change", (event) => {
                            var selectedOption = $(event.target).find("option:selected"),
                                presetLocaleName = selectedOption.attr("data-preset-locale-en"),
                                presetLabel = "";
                            ((presetLabel = presetLocaleName || selectedOption.text()), gDesigner.stats("pageproperties_preset_size", presetLabel), this._assignPresetSize(event.target.value));
                        });
                if ("w" === property || "h" === property) {
                    var label = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "property-".concat(property.toLowerCase())), property);
                    return $("<div>")
                        .append(
                            $("<input>")
                                .attr("type", "text")
                                .attr("data-property", property)
                                .on("change", function () {
                                    gDesigner.stats("pageproperties_change_size");
                                    var inputValue = $(this).gInputBox("value"),
                                        value = self._document.getScene().stringToPoint(inputValue);
                                    "" === inputValue || 0 === value
                                        ? self._assignProperties(
                                              ["w", "h"],
                                              [value, value],
                                              GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size"))
                                          )
                                        : null !== value && "number" == typeof value && value >= 0
                                          ? self._assignProperty(
                                                property,
                                                value,
                                                GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size"))
                                            )
                                          : self._updateProperties();
                                })
                                .gInputBox()
                        )
                        .gInputLabel({ label: label, autoPadding: label.length > 1 });
                }
                if ("bl" === property)
                    return $("<input>")
                        .attr("type", "text")
                        .attr("data-property", property)
                        .on("change", function () {
                            gDesigner.stats("pageproperties_change_bleeding");
                            var value = self._document.getScene().stringToPoint($(this).gInputBox("value"));
                            null !== value && "number" == typeof value && value >= 0
                                ? self._assignProperty(property, value, GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-bleeding")))
                                : self._updateProperties();
                        })
                        .gInputBox();
                if ("mt" === property || "mb" === property || "ml" === property || "mr" === property)
                    return $("<input>")
                        .attr("type", "text")
                        .attr("data-property", property)
                        .on("change", function () {
                            gDesigner.stats("pageproperties_change_margins");
                            var value = self._document.getScene().stringToPoint($(this).gInputBox("value"));
                            null !== value && "number" == typeof value && value >= 0
                                ? "yes" === self._panel.find("[data-lock-margin]").attr("data-lock-margin")
                                    ? self._assignProperties(
                                          ["mt", "mb", "ml", "mr"],
                                          [value, value, value, value],
                                          GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-margins"))
                                      )
                                    : self._assignProperty(property, value, GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-margin")))
                                : self._updateProperties();
                        })
                        .gInputBox();
                if ("equal-margins" === property)
                    return $("<span></span>")
                        .addClass("g-button g-flat valign-middle")
                        .append($("<span></span>").addClass("gravit-icon-linked"))
                        .on("click", function () {
                            var button = $(this).closest(".g-button");
                            (gDesigner.stats("pageproperties_lock_margin", button.attr("data-lock-margin")),
                                "yes" === button.attr("data-lock-margin")
                                    ? button.attr("data-lock-margin", "no").find("span:first-child").attr("class", "gravit-icon-unlinked")
                                    : button.attr("data-lock-margin", "yes").find("span:first-child").attr("class", "gravit-icon-linked"));
                        })
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.equal-margin")))
                        .attr("data-lock-margin", "yes");
                if ("master-page" === property)
                    return $("<select></select>")
                        .attr("data-property", "master-page")
                        .css("width", "100%")
                        .gPro()
                        .on(
                            "mousedown",
                            Utils.watchDog.trap(null, null, () => gDesigner.stats("pageproperties_nonprotriespro_masterpages"))
                        )
                        .on(
                            "change",
                            Utils.watchDog.trap(
                                (event) => {
                                    (gDesigner.stats("pageproperties_change_masterpages"),
                                        this._assignMasterPage(
                                            $(event.target)
                                                .find('option[value="' + event.target.value + '"]')
                                                .data("page")
                                        ));
                                },
                                null,
                                () => gDesigner.stats("pageproperties_nonprotriespro_masterpages")
                            )
                        );
                if ("bop" === property)
                    return $("<input>")
                        .attr("type", "text")
                        .attr("data-property", property)
                        .on("change", function () {
                            (gDesigner.stats("pageproperties_change_canvas-opacity"),
                                self._assignProperty(
                                    property,
                                    GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100,
                                    GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-canvas-opacity"))
                                ));
                        })
                        .gInputBox({
                            minValue: 0,
                            maxValue: 100,
                            incrementValue: gDesigner.getOpacityIncrement(),
                            postfix: "%",
                        });
                if ("rotate-canvas" === property)
                    return $("<button>")
                        .attr("data-property", property)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.rotate-canvas")))
                        .append($("<span/>").addClass("gravit-icon-flip-canvas"))
                        .on("click", function () {
                            gDesigner.stats("pageproperties_change_rotate");
                            var page = self._pages[0];
                            page &&
                                page.getProperty("w") > 0 &&
                                page.getProperty("h") > 0 &&
                                self._assignProperties(
                                    ["w", "h"],
                                    [page.getProperty("h"), page.getProperty("w")],
                                    GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size"))
                                );
                        });
                if ("trim-canvas" === property)
                    return $("<button>")
                        .attr("data-property", property)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.size-trim")))
                        .append($("<span/>").addClass("gravit-icon-trim-canvas"))
                        .on("click", function () {
                            (gDesigner.stats("pageproperties_trim_page"),
                                self._panel.find('select[data-property="preset-size"]').val("@trim"),
                                self._assignPresetSize("@trim"));
                        });
                if ("clip-content" === property) {
                    this._clipContentButton = $("<button>")
                        .attr("data-property", property)
                        .attr("disabled", true)
                        .addClass("g-disabled")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.clip-content")))
                        .append($("<span/>").addClass("gravit-icon-clip-content"))
                        .on("click", function () {
                            var activeWindow = gDesigner.getWindows().getActiveWindow();
                            if (activeWindow) {
                                var paintMode = activeWindow.getView().getViewConfiguration().paintMode;
                                (gDesigner.stats("pageproperties_clip_content", paintMode !== GObject.GScenePaintConfiguration.PaintMode.Output),
                                    applyClipContentMode(paintMode !== GObject.GScenePaintConfiguration.PaintMode.Output, false));
                            }
                        });
                    const applyClipContentMode = function (enableClip) {
                        let force = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        var mode;
                        (force && enableClip) ||
                            (enableClip
                                ? ((mode = GObject.GScenePaintConfiguration.PaintMode.Output), that._updatePageSetting(GSceneProperties.PAGE_CLIP_CONTENT_ENABLED))
                                : ((mode = GObject.GScenePaintConfiguration.PaintMode.Full), that._updatePageSetting(GSceneProperties.PAGE_CLIP_CONTENT_DISABLED)),
                            gDesigner.setPaintMode(mode));
                    };
                    return this._clipContentButton;
                }
                throw new Error("Unknown input property: " + property);
            }),
            (GPageProperties.prototype._windowEvent = function (event) {
                const { type, window } = event;
                if (type !== GWindows.WindowEvent.Type.Activated)
                    return void (
                        type === GWindows.WindowEvent.Type.Removed &&
                        this._lastScene &&
                        (this._lastScene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._propertiesUpdateEventHandler, this),
                        this._lastScene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._pageActivationEventHandler, this),
                        (this._lastScene = null))
                    );
                if (window.getDocument() !== gDesigner.getActiveDocument()) return;
                const scene = gDesigner.getActiveDocument().getScene();
                (scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._pageActivationEventHandler, this),
                    scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._propertiesUpdateEventHandler, this),
                    this._lastScene &&
                        (this._lastScene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._propertiesUpdateEventHandler, this),
                        this._lastScene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._pageActivationEventHandler, this)),
                    (this._lastScene = scene),
                    this._pageActivationEventHandler({
                        node: scene.getActivePage(),
                        flag: GObject.GNode.Flag.Active,
                    }));
            }),
            (GPageProperties.prototype._paintModeEvent = function () {
                this.updatePropertiesAvailability(gDesigner.getActiveDocument().getScene().getActivePage());
            }),
            (GPageProperties.prototype._pageActivationEventHandler = function (event) {
                let { node, flag } = event;
                if (node instanceof GObject.GPage && flag === GObject.GNode.Flag.Active) {
                    const paintMode = gDesigner.getWindows().getActiveWindow().getView().getViewConfiguration().paintMode,
                        isInfinitePage = !node.isFixedSized();
                    if (isInfinitePage && paintMode === GObject.GScenePaintConfiguration.PaintMode.Output)
                        (gDesigner.setPaintMode(GObject.GScenePaintConfiguration.PaintMode.Full),
                            this._updatePageSetting(GSceneProperties.PAGE_CLIP_CONTENT_DISABLED));
                    else if (!isInfinitePage) {
                        var clipSetting =
                            node.getProperty(GSceneProperties.PAGE_CLIP_PROPERTY_NAME, true) ||
                            (designerConfig.PAGE_CLIP_DEFAULT ? GSceneProperties.PAGE_CLIP_CONTENT_ENABLED : GSceneProperties.PAGE_CLIP_CONTENT_DISABLED);
                        gDesigner.setPaintMode(
                            clipSetting === GSceneProperties.PAGE_CLIP_CONTENT_ENABLED
                                ? GObject.GScenePaintConfiguration.PaintMode.Output
                                : GObject.GScenePaintConfiguration.PaintMode.Full
                        );
                    }
                    this.updatePropertiesAvailability(node);
                }
            }),
            (GPageProperties.prototype._propertiesUpdateEventHandler = function (event) {
                let { node: page, temporary, properties } = event;
                if (!temporary && page instanceof GObject.GPage && (properties.indexOf("w") >= 0 || properties.indexOf("h") >= 0)) {
                    var paintMode = gDesigner.getWindows().getActiveWindow().getView().getViewConfiguration().paintMode,
                        isInfinitePage = !page.isFixedSized();
                    isInfinitePage && paintMode === GObject.GScenePaintConfiguration.PaintMode.Output
                        ? (gDesigner.setPaintMode(GObject.GScenePaintConfiguration.PaintMode.Full),
                          this._updatePageSetting(GSceneProperties.PAGE_CLIP_CONTENT_DISABLED))
                        : this._manageClipButtonState(false, !isInfinitePage);
                }
            }),
            (GPageProperties.prototype._updatePageSetting = function (clipSetting) {
                gDesigner.getActiveDocument().getScene().getActivePage().setProperty(GSceneProperties.PAGE_CLIP_PROPERTY_NAME, clipSetting, true);
            }),
            (GPageProperties.prototype._reInitLayout = function () {
                ((this._canvasPropertiesRowInNormal = $("<div></div>")
                    .attr("data-property-row", "canvas-size")
                    .addClass("canvas-properties-normal")
                    .gPropertyRow({
                        columns: [
                            {
                                width: "25%",
                                content: this._createInput("bck"),
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.color")),
                            },
                            {
                                width: "25%",
                                content: this._createInput("w"),
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")),
                            },
                            {
                                width: "25%",
                                content: this._createInput("h"),
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")),
                            },
                            {
                                width: "25%",
                                content: this._createInput("bop"),
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                            },
                        ],
                    })
                    .insertBefore(this._hrAfterbleedRow)),
                    (this._hrAfterCanvasRow = $("<hr/>").insertBefore(this._hrAfterbleedRow)),
                    (this._pageSizeRowInNormal = $("<div></div>")
                        .addClass("page-size-properties-normal")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "25%",
                                    content: $("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.page-size")) + "</span>"),
                                },
                                { width: "30%", content: this._createInput("preset-size") },
                                { width: "15%", content: this._createInput("rotate-canvas") },
                                { width: "15%", content: this._createInput("trim-canvas") },
                                { width: "15%", content: this._createInput("clip-content") },
                            ],
                        })
                        .insertBefore(this._hrAfterbleedRow)),
                    (this._hrAfterPageSizeRow = $("<hr/>").attr("data-property-row", "fixed-size").insertBefore(this._hrAfterbleedRow)),
                    (this._bleedRowInNormal = $("<div></div>")
                        .addClass("bleed-properties-normal")
                        .attr("data-property-row", "fixed-size")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "25%",
                                    content: $("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.bleed")) + "</span>"),
                                },
                                { width: "20%", content: this._createInput("bl") },
                            ],
                        })
                        .insertBefore(this._hrAfterbleedRow)));
            }),
            (GPageProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel),
                    (this._toolbar = toolbar),
                    gDesigner.getWindows().addEventListener(GWindows.WindowEvent, this._windowEvent, this),
                    gDesigner.addEventListener(GPaintModeEvent, this._paintModeEvent, this),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                    this.setTouchTools([
                        new touchToolModule.default({
                            id: "document",
                            icon: "gravit-icon-touch-document",
                            panel: [this._panel, ".scene-properties-panel"],
                            toolbar: [this._toolbar, ".scene-properties-toolbar"],
                            panelWidth: "380px",
                        }),
                    ]),
                    toolbar.addClass("filled"),
                    toolbar.addClass("page-toolbar"),
                    toolbar.addClass("page-properties-toolbar"),
                    panel.addClass("page-properties-panel"),
                    $("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "title")).toUpperCase())
                        .appendTo(toolbar),
                    (this._hrAfterbleedRow = $("<hr/>").attr("data-property-row", "fixed-size").appendTo(panel)));
                const marginTooltipConfig = richTooltipModule.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.margin-tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.margin-tooltip-description")),
                    learnMore: "/docs/organizing-your-designs/pages/#margins-7",
                });
                ($("<div></div>")
                    .attr("data-property-row", "fixed-size")
                    .addClass("page-margin-properties")
                    .gPropertyRow({
                        columns: [
                            {
                                clazz: "margin-title-column",
                                content: $(
                                    "<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.margin")) + "</span>"
                                ).addClass("margin-title"),
                            },
                            {
                                clazz: "margin-input-column",
                                labelClass: "margin-input-labels",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.left")),
                                content: this._createInput("ml").gRichTooltip(marginTooltipConfig),
                            },
                            {
                                clazz: "margin-input-column",
                                labelClass: "margin-input-labels",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.top")),
                                content: this._createInput("mt").gRichTooltip(marginTooltipConfig),
                            },
                            {
                                clazz: "margin-input-column",
                                labelClass: "margin-input-labels",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.right")),
                                content: this._createInput("mr").gRichTooltip(marginTooltipConfig),
                            },
                            {
                                clazz: "margin-input-column",
                                labelClass: "margin-input-labels",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.bottom")),
                                content: this._createInput("mb").gRichTooltip(marginTooltipConfig),
                            },
                            {
                                clazz: "margin-btn-column",
                                labelClass: "margin-input-labels",
                                content: this._createInput("equal-margins"),
                            },
                        ],
                    })
                    .appendTo(panel),
                    $("<hr/>").attr("data-property-row", "fixed-size").appendTo(panel));
                var license = gDesigner.getLicense();
                ($("<div></div>")
                    .attr("data-property-row", "fixed-size")
                    .addClass("master-property-row")
                    .gPropertyRow({
                        columns: [
                            {
                                clazz: "master-property-title",
                                content: $("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.master")) + "</span>"),
                            },
                            {
                                clazz: "master-property-selector",
                                content: $("<div></div>")
                                    .append(this._createInput("master-page"))
                                    .append($("<span></span>").gPro())
                                    .gRichTooltip(
                                        richTooltipModule.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.master-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GPageProperties", "text.master-tooltip-description")
                                            ),
                                            middle: false,
                                            isPro: !gDesigner.isEnabledProFeatures() || !(license.isPro() && !license.isExpired()),
                                            learnMore:
                                                "/docs/organizing-your-designs/pages/#master-pages",
                                        })
                                    ),
                            },
                        ],
                    })
                    .appendTo(panel),
                    panel
                        .find('[data-property="rotate-canvas"]')
                        .parent(".content")
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.rotate-canvas-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.rotate-canvas-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#orientation-4",
                            })
                        ),
                    panel
                        .find('[data-property="trim-canvas"]')
                        .parent(".content")
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.trim-canvas-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.trim-canvas-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#trim-canvas-5",
                            })
                        ),
                    panel
                        .find('[data-property="clip-content"]')
                        .parent(".content")
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.clip-content-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.clip-content-tooltip-description")),
                            })
                        ),
                    panel
                        .find('[data-property="bl"]')
                        .parent(".content")
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.bleed-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.bleed-tooltip-description")),
                                middle: false,
                                learnMore: "/docs/organizing-your-designs/pages/#bleed-6",
                            })
                        ),
                    gDesigner
                        .getWorkspace()
                        .getStyleEdManager()
                        .addEventListener(editorModule.GStyleEdManager.EditorEvent, this._styleEditorEventHandler, this),
                    this._updateUI());
            }),
            (GPageProperties.prototype._documentEvent = function (event) {
                event.type === GDocumentEvent.Type.Removed && this._panel.find('select[data-property="master-page"]').empty().append($("<option></option>"));
            }),
            (GPageProperties.prototype._assignPresetSize = function (preset) {
                if ("@infinite" === preset)
                    this._assignProperties(
                        ["w", "h"],
                        [0, 0],
                        GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size")),
                        null,
                        true
                    );
                else if ("@trim" === preset) {
                    this._ownChange = true;
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        this._pages.forEach((page) => page.trimToContent());
                    } finally {
                        (editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size"))),
                            (this._ownChange = false));
                    }
                } else {
                    var scene = this._document.getScene(),
                        parts = preset.split("x"),
                        width = scene.stringToPoint(parts[0]),
                        height = scene.stringToPoint(parts[1]),
                        dpi = +parts[2];
                    (scene.getProperty("dpi") !== dpi && scene.setProperty("dpi", dpi),
                        this._assignProperties(
                            ["w", "h"],
                            [width, height],
                            GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.change-size"))
                        ));
                }
            }),
            (GPageProperties.prototype._assignMasterPage = function (masterPage) {
                var scene = this._document.getScene(),
                    editor = this._document.getEditor();
                if (masterPage) {
                    editor.beginTransaction();
                    try {
                        (this._pages.forEach((page) => {
                            var masterPages = page.getMasterPages(),
                                alreadyLinked = false;
                            (masterPages.forEach(function (existingMaster) {
                                masterPage !== existingMaster ? scene.unlink(existingMaster, page) : (alreadyLinked = true);
                            }),
                                alreadyLinked || scene.link(masterPage, page));
                        }),
                            this._updateSlavePages(masterPage));
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.assign-master-page")));
                    }
                } else {
                    editor.beginTransaction();
                    try {
                        this._pages.forEach((page) => {
                            page.getMasterPages().forEach(function (master) {
                                scene.unlink(master, page);
                            });
                        });
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "action.assign-master-page")));
                    }
                }
            }),
            (GPageProperties.prototype.update = function (document, nodes, modifiedEvent) {
                if ((this._updateUI(), this._styleEditorChange)) return ((this._styleEditorChange = false), true);
                if (this._ownChange) return true;
                this._chooserElem && this._chooserElem.gPatternChooser("close");
                var documentChanged = document !== this._oldDocument;
                if (
                    ((this._oldDocument = document),
                    this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._pages = null),
                    document && (nodes = nodes.filter((node) => node instanceof GObject.GPage)).length)
                )
                    return (
                        (this._pages = nodes.slice()),
                        (this._document = document),
                        this._document.getScene().addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                        documentChanged && this._updatePresetSizes(),
                        this._updateProperties(modifiedEvent),
                        true
                    );
                const activeDocument = gDesigner.getActiveDocument(),
                    activeScene = activeDocument && activeDocument.getScene();
                if (gDesigner.isTouchEnabled() && activeScene && activeScene.getActivePage()) {
                    const activeView = gDesigner.getActiveView(),
                        viewConfig = activeView && activeView.getViewConfiguration();
                    if (viewConfig && viewConfig.elementAnnotations) {
                        const activeTool = gDesigner.getToolManager().getActiveTool();
                        if (!activeTool || activeTool instanceof editorModule.GSelectTool) return true;
                    }
                }
                return false;
            }),
            (GPageProperties.prototype._afterPropertiesChange = function (event) {
                (event.node === this._pages[0]
                    ? this._updateProperties()
                    : !event.temporary &&
                      event.node === this._document.getScene() &&
                      event.properties.indexOf("ut") >= 0 &&
                      (this._updatePresetSizes(), this._updateProperties()),
                    this._updateSlavePages(event.node, event.properties));
            }),
            (GPageProperties.prototype._updateUI = function () {
                (this._removeOldHtmlElement(),
                    gDesigner.isTouchEnabled() ? touchLayout._reInitLayout.call(this) : this._reInitLayout(),
                    this._document
                        ? (this._updatePresetSizes(), this._updateProperties())
                        : this._oldDocument && this._updatePresetSizes());
            }),
            (GPageProperties.prototype._removeOldHtmlElement = function () {
                (this._removeHtmlElem(this._canvasPropertiesRowInNormal),
                    (this._canvasPropertiesRowInNormal = null),
                    this._removeHtmlElem(this._hrAfterCanvasRow),
                    (this._hrAfterCanvasRow = null),
                    this._removeHtmlElem(this._bleedRowInNormal),
                    (this._bleedRowInNormal = null),
                    this._removeHtmlElem(this._pageSizeRowInNormal),
                    (this._pageSizeRowInNormal = null),
                    this._removeHtmlElem(this._hrAfterPageSizeRow),
                    (this._hrAfterPageSizeRow = null),
                    this._removeHtmlElem(this._canvasPropertiesRowInTouch),
                    (this._canvasPropertiesRowInTouch = null),
                    this._removeHtmlElem(this._bleedRowInTouch),
                    (this._bleedRowInTouch = null));
            }),
            (GPageProperties.prototype._removeHtmlElem = function (element) {
                element && element.remove();
            }),
            (GPageProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key ? this._updateProperties() : "touch" === event.key && this._updateUI();
            }),
            (GPageProperties.prototype._updateSlavePages = function (masterPage, properties) {
                var slaveProperties = ["mt", "mb", "ml", "mr", "bop", "bl", "bck"];
                if (masterPage instanceof GObject.GPage) {
                    properties || (properties = slaveProperties);
                    var propertiesToSync = slaveProperties.filter((property) => properties.indexOf(property) >= 0);
                    propertiesToSync.length &&
                        masterPage.getSlavePages().forEach((slavePage) => {
                            var values;
                            slavePage.setProperties(propertiesToSync, ((values = []), propertiesToSync.forEach((property) => values.push(masterPage.getProperty(property))), values));
                        });
                }
            }),
            (GPageProperties.prototype._updatePresetSizes = function () {
                var unit = (this._document || this._oldDocument).getScene().getProperty("ut"),
                    presetSelect = this._panel.find('select[data-property="preset-size"]').empty(),
                    customGroup = $("<optgroup></optgroup>").attr("label", GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.size-custom")));
                ($("<option></option>")
                    .attr("value", "@infinite")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPageProperties", "text.size-infinite")))
                    .appendTo(customGroup),
                    presetSelect.append(customGroup),
                    GPresets.getPresets().forEach((preset) => {
                        var group = $("<optgroup></optgroup>").attr("label", preset.name),
                            hasMatch = false;
                        (preset.layouts.forEach((layout) => {
                            if (layout.unit === unit) {
                                var includes = layout.includes;
                                if (includes)
                                    for (var s = 0; s < includes.length; s++) {
                                        var l = includes[s];
                                        $("<option></option>")
                                            .attr("data-preset-id", preset.id)
                                            .attr("data-preset-locale-en", GObject.GLocale.get(l.localeClass, null, GObject.GLocaleLanguage.English))
                                            .attr("value", l.width + "x" + l.height + "x" + (layout.dpi || 72))
                                            .text("".concat(l.name).concat(l.displaySize ? " " + l.width + "x" + l.height : ""))
                                            .appendTo(group);
                                    }
                                else
                                    $("<option></option>")
                                        .attr("data-preset-id", preset.id)
                                        .attr("data-preset-locale-en", GObject.GLocale.get(layout.localeClass, null, GObject.GLocaleLanguage.English))
                                        .attr("value", layout.width + "x" + layout.height + "x" + (layout.dpi || 72))
                                        .text("".concat(layout.name).concat(layout.displaySize ? " " + layout.width + "x" + layout.height : ""))
                                        .appendTo(group);
                                hasMatch = true;
                            }
                        }),
                            preset.hidden && group.css({ display: "none" }),
                            hasMatch && presetSelect.append(group));
                    }));
            }),
            (GPageProperties.prototype._styleEditorEventHandler = function (event) {
                this._styleEdOn && event.type === editorModule.GStyleEdManager.EditorEventType.PrepareModifiedEvent && (this._styleEditorChange = true);
            }),
            (GPageProperties.prototype._updateProperties = function (modifiedEvent) {
                var scene = this._document.getScene(),
                    page = this._pages[0],
                    isFixedSized = scene.isFixedSized(),
                    pageLabel = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page"));
                gDesigner.isTouchEnabled() && (pageLabel = pageLabel.toUpperCase());
                var title = pageLabel + " (";
                (this._pages.length > 1
                    ? (title += this._pages.length + " " + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.pages")))
                    : (title += page.getProperty("name") || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.active"))),
                    (title += ")"),
                    this._toolbar.find("label:first-child").text(title),
                    this._panel.find('input[data-property="bl"]').val(scene.pointToString(page.getProperty("bl"), scene.getOptimalDecimalsCount())),
                    page.getProperty("bck") || (page.setProperty("bck", GObject.GRGBColor.WHITE), page.setProperty("bop", 0)));
                var background = page.getProperty("bck", false, false, true);
                if (
                    (this._panel.find('[data-property-row="background"]').css("display", ""),
                    this._panel
                        .find('[data-property="bck"]')
                        .css("display", background ? "" : "none")
                        .gPatternChooser(
                            "updateSettings",
                            isFixedSized ? { types: [GObject.GColor, GObject.GGradient, GObject.GTexturePattern] } : { types: [GObject.GColor] }
                        )
                        .gPatternChooser("setPattern", background)
                        .gPatternChooser("value", background)
                        .gPatternChooser("opacity", page.getProperty("bop", false, false, true)),
                    this._panel
                        .find('input[data-property="bop"]')
                        .css("display", background ? "" : "none")
                        .gInputBox("value", GObject.GUtil.formatOpacity(100 * page.getProperty("bop"))),
                    isFixedSized)
                ) {
                    var sizeKey =
                            scene.pointToString(page.getProperty("w"), scene.getOptimalDecimalsCount()) +
                            "x" +
                            scene.pointToString(page.getProperty("h"), scene.getOptimalDecimalsCount()) +
                            "x" +
                            scene.getProperty("dpi"),
                        presetSelect = this._panel.find('select[data-property="preset-size"]');
                    presetSelect.val(presetSelect.find('option[value="' + sizeKey + '"]').length ? sizeKey : "@custom");
                } else this._panel.find('select[data-property="preset-size"]').val("@infinite");
                (this._panel
                    .find('input[data-property="w"]')
                    .gInputBox("value", scene.pointToString(page.getProperty("w"), scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="h"]')
                        .gInputBox("value", scene.pointToString(page.getProperty("h"), scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="mt"]')
                        .gInputBox("value", scene.pointToString(page.getProperty("mt"), scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="mb"]')
                        .gInputBox("value", scene.pointToString(page.getProperty("mb"), scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="ml"]')
                        .gInputBox("value", scene.pointToString(page.getProperty("ml"), scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="mr"]')
                        .gInputBox("value", scene.pointToString(page.getProperty("mr"), scene.getOptimalDecimalsCount())));
                var masterSelect = this._panel.find('select[data-property="master-page"]').empty().append($("<option></option>")),
                    p = -1,
                    commonMaster = null;
                (this._pages.forEach(function (selectedPage) {
                    var masterPages = selectedPage.getMasterPages();
                    masterPages.length && (null === commonMaster ? (commonMaster = masterPages[0]) : commonMaster !== masterPages[0] && (commonMaster = void 0));
                }),
                    scene.iteratePages((scenePage) => {
                        if (this._pages.indexOf(scenePage) < 0) {
                            p++;
                            var option = $("<option></option>").data("page", scenePage).attr("value", p).text(scenePage.getProperty("name")).appendTo(masterSelect);
                            commonMaster === scenePage && option.prop("selected", true);
                        }
                    }, true),
                    modifiedEvent &&
                        (modifiedEvent.evtType === editorModule.GEditor.ModifiedEvent.Type.Undo || modifiedEvent.evtType === editorModule.GEditor.ModifiedEvent.Type.Redo) &&
                        modifiedEvent.chooserOn &&
                        modifiedEvent.pagePattern &&
                        this._panel
                            .find('[data-property="bck"]')
                            .find(".preview")
                            .trigger("click", null !== modifiedEvent.activeStopIdx ? modifiedEvent.activeStopIdx : null),
                    this.updatePropertiesAvailability(page));
            }),
            (GPageProperties.prototype.updatePropertiesAvailability = function (page) {
                var programLock = page.getProperty("plkt"),
                    isFixedSized = page.isFixedSized(),
                    isFromTemplate = false;
                if (programLock && programLock & GObject.GBlock.ProgramLck.NoSizeChanges)
                    (this._panel.find('[data-property="bck"]').attr("disabled", true),
                        this._panel.find('input[data-property="bop"]').attr("disabled", true),
                        this._panel.find('input[data-property="w"]').attr("disabled", true),
                        this._panel.find('input[data-property="h"]').attr("disabled", true),
                        this._panel.find('button[data-property="rotate-canvas"]').attr("disabled", true),
                        this._panel.find('select[data-property="preset-size"]').attr("disabled", true),
                        this._panel.find('button[data-property="trim-canvas"]').attr("disabled", true),
                        this._manageClipButtonState(false, false),
                        this._panel.find('input[data-property="bl"]').attr("disabled", true),
                        this._panel.find('input[data-property="mt"]').attr("disabled", true),
                        this._panel.find('input[data-property="mb"]').attr("disabled", true),
                        this._panel.find('input[data-property="ml"]').attr("disabled", true),
                        this._panel.find('input[data-property="mr"]').attr("disabled", true),
                        this._panel.find("[data-lock-margin]").attr("disabled", true),
                        this._panel.find('select[data-property="master-page"]').attr("disabled", true));
                else {
                    isFromTemplate = this._document && this._document.isDocumentFromTemplate();
                    var background = page.getProperty("bck", false, false, true),
                        presetSelect = this._panel.find('select[data-property="preset-size"]'),
                        presetId = presetSelect.find('option[value="' + presetSelect.val() + '"]').data("preset-id"),
                        presetExcluded = isFromTemplate && this._excludedPresets.includes(presetId);
                    (presetSelect.attr("disabled", presetExcluded),
                        this._panel.find('[data-property="bck"]').attr("disabled", !background),
                        this._panel.find('input[data-property="bop"]').attr("disabled", !background),
                        this._panel.find('input[data-property="w"]').attr("disabled", false),
                        this._panel.find('input[data-property="h"]').attr("disabled", false),
                        isFixedSized
                            ? this._panel.find('button[data-property="rotate-canvas"]').attr("disabled", false)
                            : this._panel.find('button[data-property="rotate-canvas"]').attr("disabled", true),
                        this._panel.find('button[data-property="trim-canvas"]').attr("disabled", false),
                        this._manageClipButtonState(
                            gDesigner.getWindows().getActiveWindow() &&
                                gDesigner.getWindows().getActiveWindow().getView() &&
                                gDesigner.getWindows().getActiveWindow().getView().getViewConfiguration().paintMode ===
                                    GObject.GScenePaintConfiguration.PaintMode.Output,
                            isFixedSized
                        ),
                        this._panel.find('input[data-property="bl"]').attr("disabled", false),
                        this._panel.find('input[data-property="mt"]').attr("disabled", false),
                        this._panel.find('input[data-property="mb"]').attr("disabled", false),
                        this._panel.find('input[data-property="ml"]').attr("disabled", false),
                        this._panel.find('input[data-property="mr"]').attr("disabled", false),
                        this._panel.find("[data-lock-margin]").attr("disabled", false));
                    var isFromCdr = false,
                        scene = page.getScene();
                    (scene && GSceneProperties.CDR_ORIGIN_PROPERTY_NAME && (isFromCdr = !!scene.getProperty(GSceneProperties.CDR_ORIGIN_PROPERTY_NAME, true)),
                        this._panel
                            .find('select[data-property="master-page"]')
                            .attr("disabled", isFromCdr)
                            .attr("i18n", "text.plkt-no-size-changes"));
                }
                var disabledTitleKey = programLock && programLock & GObject.GBlock.ProgramLck.NoSizeChanges ? "text.plkt-no-size-changes" : "text.infinite-canvas-no-size-changes";
                (this._panel.find("[data-title]:not([default-data-title])").each(function () {
                    const element = $(this);
                    element.attr("default-data-title", element.attr("data-title") || "");
                }),
                    this._panel.find(":disabled").each(function () {
                        const element = $(this);
                        presetExcluded ||
                            (element.attr("default-data-title", element.attr("default-data-title") || ""),
                            element.attr(
                                "data-title",
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", element.attr("i18n") || disabledTitleKey)).replace(
                                    "%name",
                                    element.attr("default-data-title") || ""
                                )
                            ));
                    }),
                    this._panel
                        .find(":not(:disabled)[default-data-title]")
                        .removeAttr("data-title")
                        .each(function () {
                            const element = $(this);
                            element.attr("default-data-title").length && element.attr("data-title", element.attr("default-data-title"));
                        }));
                const createTooltipWrapper = (element) =>
                    $("<div></div>")
                        .addClass("tooltip-wrapper")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", (element && element.attr("i18n")) || disabledTitleKey)));
                (this._panel.find(".tooltip-wrapper").remove(),
                    this._panel.find("select:disabled").each(function () {
                        presetExcluded || createTooltipWrapper($(this)).insertAfter($(this));
                    }),
                    createTooltipWrapper().insertAfter(this._panel.find('[data-property="bck"][disabled]')));
            }),
            (GPageProperties.prototype._manageClipButtonState = function (active, enabled) {
                this._clipContentButton &&
                    (enabled || this._clipContentButton.hasClass("g-disabled")
                        ? enabled &&
                          (this._clipContentButton.hasClass("g-disabled") &&
                              (this._clipContentButton.removeAttr("disabled"), this._clipContentButton.removeClass("g-disabled")),
                          active ? this._clipContentButton.addClass("g-active") : this._clipContentButton.removeClass("g-active"))
                        : (this._clipContentButton.attr("disabled", true),
                          this._clipContentButton.addClass("g-disabled"),
                          this._clipContentButton.removeClass("g-active")));
            }),
            (GPageProperties.prototype._assignProperty = function (property, value, actionLabel) {
                this._assignProperties([property], [value], actionLabel);
            }),
            (GPageProperties.prototype._assignProperties = function (properties, values, actionLabel, options, ensureBackground) {
                this._ownChange = true;
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    this._pages.forEach(function (page) {
                        var pageProperties = properties,
                            pageValues = values;
                        ensureBackground &&
                            ((pageProperties = properties.slice()),
                            (pageValues = values.slice()),
                            page.getProperty("bck") instanceof GObject.GColor ||
                                (pageProperties.push("bck"), pageValues.push(GObject.GRGBColor.WHITE), pageProperties.push("bop"), pageValues.push(1)));
                        page.setProperties(pageProperties, pageValues);
                    });
                } finally {
                    (editor.commitTransaction(actionLabel, options || null), (this._ownChange = false));
                }
            }),
            (GPageProperties.prototype.toString = function () {
                return "[Object GPageProperties]";
            }),
            (module.exports = GPageProperties));
    };
