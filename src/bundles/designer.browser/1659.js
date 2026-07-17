module.exports = function (module, exports, require) {
        "use strict";
        (require(193), require(57), require(8 /* Symbol */), require(3), require(4), require(13));
        var GObject = require(1),
            uiConfig = require(357),
            richTooltip = require(67 /* GRichTooltipConfig */),
            GProperties = require(123),
            GGravitCloudAction = require(448),
            GSaveAsAction = require(445),
            DocumentStatus = require(86),
            GDocument = require(163),
            GCommonNames = require(119),
            GDocumentEvent = require(78),
            GSettingChangedEvent = require(135),
            GSystemDialog = (require(446 /* GLoginPanel */), require(44 /* GSystemDialog */)),
            iconClasses = require(257);
        const { FILE_FORMATS, CLOUD_SYNC_FEATURE: { NEW_LAYOUT } = {} } = require(10 /* designerConfig */);
        var defaultFileExtension = "." + FILE_FORMATS.find((format) => format.default).ext;
        function GSceneProperties() {}
        (GObject.GObject.inherit(GSceneProperties, GProperties),
            (GSceneProperties.prototype._panel = null),
            (GSceneProperties.prototype._document = null),
            (GSceneProperties.prototype._scene = null),
            (GSceneProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel.addClass("scene-properties-panel")),
                    toolbar.addClass("scene-properties-toolbar"),
                    NEW_LAYOUT || gDesigner.addEventListener(GDocumentEvent, this._synchronismUpdated, this));
                var createPropertyControl = function (property) {
                    let tooltipConfig = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    var self = this;
                    if ("dpi" === property)
                        return $("<div></div>")
                            .append(
                                $("<div/>")
                                    .attr("data-property", property)
                                    .on("change", function () {
                                        const dpiValue = parseInt($(this).gInputSelect("value")) || GObject.GLength.DPI;
                                        (gDesigner.stats("sceneproperties_change_canvas-dpi", dpiValue),
                                            self._assignProperty(
                                                property,
                                                dpiValue,
                                                GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-canvas-dpi"))
                                            ));
                                    })
                                    .gInputSelect({
                                        list: [72, 96, 144, 300],
                                        minValue: 72,
                                        maxValue: 300,
                                    })
                            )
                            .gRichTooltip(tooltipConfig);
                    if ("gx" === property || "gy" === property || "gaw" === property)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", property)
                            .on("change", function () {
                                "gx" === property
                                    ? gDesigner.stats("sceneproperties_change_rect-grid-settings", "width")
                                    : "gy" === property
                                      ? gDesigner.stats("sceneproperties_change_rect-grid-settings", "height")
                                      : "gaw" === property && gDesigner.stats("sceneproperties_change_axono-grid-settings", "size");
                                var value = self._document.getScene().stringToPoint($(this).gInputBox("value"));
                                null !== value && "number" == typeof value
                                    ? self._assignProperty(
                                          property,
                                          value,
                                          GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-grid-settings"))
                                      )
                                    : self._updateProperties();
                            })
                            .gInputBox();
                    if ("ga1" === property || "ga2" === property)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", property)
                            .on("change", function () {
                                "ga1" === property
                                    ? gDesigner.stats("sceneproperties_change_axono-grid-settings", "angle1")
                                    : gDesigner.stats("sceneproperties_change_axono-grid-settings", "angle2");
                                var angle = parseFloat($(this).gInputBox("value"));
                                null !== angle && "number" == typeof angle
                                    ? ((angle = GObject.GMath.normalizeAngleDegrees(angle)),
                                      "ga1" == property && (angle = (angle = angle >= 180 ? angle - 180 : angle) >= 90 ? 89 : angle),
                                      "ga2" == property && (angle = (angle = (angle = angle > 0 ? angle - 360 : angle) <= -180 ? angle + 180 : angle) <= -90 ? -89 : angle),
                                      (angle = GObject.GMath.toRadians(angle)),
                                      self._assignProperty(
                                          property,
                                          angle,
                                          GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-grid-settings"))
                                      ))
                                    : self._updateProperties();
                            })
                            .gInputBox({ postfix: "°" });
                    if (0 === property.indexOf("gm-")) {
                        var label = "",
                            gridMode = property.substr("gm-".length);
                        switch (gridMode) {
                            case GObject.GScene.GridMode.Boxed:
                                label = GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.on"));
                                break;
                            case GObject.GScene.GridMode.Axonometric:
                                label = GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.isometric"));
                                break;
                            default:
                                label = GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.off"));
                        }
                        return $("<label></label>")
                            .append(
                                $("<input>")
                                    .addClass("grid-mode-radio")
                                    .attr("type", "radio")
                                    .attr("data-property", property)
                                    .on("change", function () {
                                        (gDesigner.stats(
                                            "sceneproperties_change_grid-mode",
                                            "box" === gridMode ? "on" : "axo" === gridMode ? "isometric" : "off"
                                        ),
                                            self._assignProperty(
                                                "gm",
                                                gridMode || null,
                                                GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-grid-settings"))
                                            ),
                                            self._updateUI());
                                    })
                                    .gRichTooltip(tooltipConfig)
                            )
                            .append($("<span></span>").text(label));
                    }
                    if ("cm" === property)
                        return $("<select></select>")
                            .attr("data-property", property)
                            .gRichTooltip(tooltipConfig)
                            .on("change", function () {
                                const document = gDesigner.getActiveDocument(),
                                    scene = document.getScene();
                                if (!gDesigner.isEnabledProFeatures() && 0 != this.selectedIndex)
                                    return ($(this).val(scene.getProperty("cm")), void gDesigner.handlePROFeatureInterruption());
                                const colorMode = $(this).val();
                                gDesigner.stats("sceneproperties_change_color-mode", colorMode);
                                var children = scene.getActivePage().getChildren();
                                (!!children &&
                                    children.find((child) => !(child instanceof GObject.GAnnotationsList)) &&
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.reminder"))),
                                    gDesigner.setSetting("color_mode", colorMode),
                                    self._assignProperty(
                                        property,
                                        colorMode,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-color-mode"))
                                    ),
                                    document.setColorModeElms(children));
                            });
                    if ("ut" === property)
                        return $("<select></select>")
                            .gUnit()
                            .attr("data-property", property)
                            .gRichTooltip(tooltipConfig)
                            .on("change", function () {
                                (gDesigner.stats("sceneproperties_change_canvas-unit", $(this).val()),
                                    self._assignProperty(
                                        property,
                                        $(this).val(),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "action.change-canvas-unit"))
                                    ));
                            });
                    if (0 === property.indexOf("sync-")) {
                        label = GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text." + property.substring("sync-".length)));
                        return $("<label></label>")
                            .append(
                                $("<input>")
                                    .attr("type", "radio")
                                    .attr("data-property", property)
                                    .on("change", function (event) {
                                        var enabled = -1 !== $(event.target).data().property.indexOf("on");
                                        (gDesigner.stats("sceneproperties_toggle_sync", enabled ? "enable" : "disable"),
                                            self._assignProperty("cfs", enabled));
                                    })
                            )
                            .append($("<span></span>").text(label));
                    }
                    if (0 === property.indexOf("action-")) {
                        var actionId = property.substring("action-".length);
                        return $("<button></button>")
                            .append($("<span></span>").text(GObject.GLocale.get(gDesigner.getAction(actionId).getTitle())))
                            .on(
                                "click",
                                function (event) {
                                    gDesigner.canExecuteAction(actionId) && gDesigner.executeAction(actionId);
                                }.bind(this)
                            );
                    }
                    throw new Error("Unknown input property: " + property);
                }.bind(this);
                if (
                    ($("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.document")))
                        .appendTo(toolbar),
                    $("<div></div>")
                        .addClass("unit-row")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "unit-title-column",
                                    content: $("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unit")) + "</span>"),
                                },
                                {
                                    clazz: "unit-selector-column",
                                    content: createPropertyControl(
                                        "ut",
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.unit-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GSceneProperties", "text.unit-tooltip-description")
                                            ),
                                            middle: false,
                                        })
                                    ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    $("<div></div>")
                        .addClass("color-mode-row")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "color-mode-title-column",
                                    content: $("<span></span>").text(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.color-mode"))
                                    ),
                                },
                                {
                                    clazz: "color-mode-selector-column",
                                    content: createPropertyControl(
                                        "cm",
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.color-mode-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GSceneProperties", "text.color-mode-tooltip-description")
                                            ),
                                            middle: false,
                                        })
                                    ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    $("<div></div>")
                        .addClass("dpi-row")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "dpi-title-column",
                                    content: $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.dpi"))),
                                },
                                {
                                    clazz: "dpi-selector-column",
                                    content: createPropertyControl(
                                        "dpi",
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.dpi-tooltip-title")),
                                            middle: false,
                                        })
                                    ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    $("<div></div>")
                        .addClass("grid-mode")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "grid-mode-title-column",
                                    content: $("<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.grid")) + "</span>"),
                                },
                                {
                                    clazz: "grid-mode-off-column",
                                    content: createPropertyControl(
                                        "gm-",
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-description-off")
                                            ),
                                            learnMore: "/docs/design-aids/grid/",
                                        })
                                    ),
                                },
                                {
                                    clazz: "grid-mode-box-column",
                                    content: createPropertyControl(
                                        "gm-" + GObject.GScene.GridMode.Boxed,
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-description-on")
                                            ),
                                            learnMore: "/docs/design-aids/grid/",
                                        })
                                    ),
                                },
                                {
                                    clazz: "grid-mode-axo-column",
                                    content: createPropertyControl(
                                        "gm-" + GObject.GScene.GridMode.Axonometric,
                                        richTooltip.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-title")),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GSceneProperties", "text.grid-tooltip-description-isometric")
                                            ),
                                            learnMore: "/docs/design-aids/grid/",
                                        })
                                    ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("grid-mode-type")
                        .attr("data-grid-mode", GObject.GScene.GridMode.Boxed)
                        .gPropertyRow({
                            label: "",
                            columns: [
                                {
                                    width: "33.3%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")),
                                    content: createPropertyControl("gx"),
                                },
                                {
                                    width: "33.3%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")),
                                    content: createPropertyControl("gy"),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("grid-mode-type")
                        .attr("data-grid-mode", GObject.GScene.GridMode.Axonometric)
                        .gPropertyRow({
                            label: "",
                            columns: [
                                {
                                    width: "33.3%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")),
                                    content: createPropertyControl("gaw"),
                                },
                                {
                                    width: "33.3%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")) + " 1",
                                    content: createPropertyControl("ga1"),
                                },
                                {
                                    width: "33.3%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")) + " 2",
                                    content: createPropertyControl("ga2"),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    !NEW_LAYOUT)
                ) {
                    let actionsContainer = $("<div></div>")
                        .addClass("actions")
                        .append(
                            $("<button></button>")
                                .addClass(iconClasses["sync-button"])
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "sync.enable")))
                                .on("click", () => {
                                    (gDesigner.stats("sceneproperties_enable_cloud-sync"), this._enableCloudSync());
                                })
                        );
                    $("<div></div>")
                        .attr("data-property", "enable-cloud-sync")
                        .append(
                            $("<div></div>")
                                .addClass("cloud-sync-panel")
                                .append($("<div></div>").addClass("svg-cloud-icon svg-background-icon-theme"))
                                .append(actionsContainer)
                        )
                        .appendTo(panel);
                    const welcomeLink = this._getWelcomeLink();
                    (welcomeLink && actionsContainer.append(welcomeLink),
                        $("<div></div>")
                            .attr("data-property", "switch-cloud-sync")
                            .addClass("cloud-sync-switch")
                            .append($("<div></div>").addClass("svg-cloud-icon svg-background-icon-theme"))
                            .append(
                                $("<div></div>")
                                    .addClass("actions")
                                    .append(
                                        $("<label></label>")
                                            .addClass("g-switch")
                                            .css("width", "28px")
                                            .append(
                                                $("<input>")
                                                    .attr("type", "checkbox")
                                                    .on("change", (event) => {
                                                        gDesigner.stats(
                                                            "sceneproperties_toggle_cloud-sync",
                                                            $(event.target).is(":checked") ? "enable" : "disable"
                                                        );
                                                        var scene = this._document.getScene();
                                                        const checked = $(event.target).is(":checked");
                                                        (scene.setProperty("cfs", checked),
                                                            checked &&
                                                                this._document.chooseLatestDocument(
                                                                    scene,
                                                                    (chosenScene, viaChooser) => {
                                                                        if (chosenScene !== scene || viaChooser) {
                                                                            var newDocument = new GDocument(this._document.getStorageItem());
                                                                            (newDocument.setScene(chosenScene), gDesigner.replaceDocument(this._document, newDocument));
                                                                        } else
                                                                            this._document.storeToCloud(chosenScene, async () => {
                                                                                if (gDesigner.getDefaultStorage().canSave()) {
                                                                                    let e = false,
                                                                                        saveOptions =
                                                                                            (await this._document.saveAnnotations(e),
                                                                                            this._document.updateSaveOptionsLastModifiedDate(
                                                                                                {},
                                                                                                scene.getLastSavedTime()
                                                                                            ));
                                                                                    this._document.store(
                                                                                        null,
                                                                                        this._updateProperties.bind(this),
                                                                                        null,
                                                                                        saveOptions
                                                                                    );
                                                                                } else this._updateProperties();
                                                                            });
                                                                    },
                                                                    null,
                                                                    (localScene, incomingScene) =>
                                                                        incomingScene.lastModifiedDate().getTime() > localScene.lastModifiedDate().getTime()
                                                                ));
                                                    })
                                            )
                                            .append($("<div></div>"))
                                    )
                                    .append(
                                        $("<span></span>")
                                            .addClass("label")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "sync.label")))
                                    )
                                    .append($("<span></span>").addClass("last-modified-date"))
                            )
                            .appendTo(panel),
                        uiConfig.SCENEPROPERTIES.HAS_LOGO_UNDER_SYNC && panel.find(".svg-cloud-icon").load(iconClasses["cloud-logo"], () => {}));
                }
            }),
            (GSceneProperties.prototype._getWelcomeLink = function () {
                return $("<div></div>")
                    .addClass("more")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "sync.more"))))
                    .on("click", () => {
                        (gDesigner.stats("sceneproperties_click_welcome-to-gravit-cloud-medium-com"),
                            gContainer.openExternalLink(
                                null,
                                "https://medium.com/gravitdesigner/welcome-to-the-gravit-cloud-c30f84a7eb1f"
                            ));
                    });
            }),
            (GSceneProperties.prototype.update = function (document, elements) {
                return (
                    this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._scene = null),
                    !(!document || (1 === elements.length && elements[0] instanceof GObject.GPage && (this._scene = elements[0].getScene()), !this._scene)) &&
                        ((this._document = document),
                        this._document.getScene().addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                        this._updateColorMode(),
                        this._updateProperties(),
                        this._updateUI(),
                        true)
                );
            }),
            (GSceneProperties.prototype._afterPropertiesChange = function (event) {
                event.temporary || this._scene !== event.node || this._updateProperties();
            }),
            (GSceneProperties.prototype._updateUI = function () {
                let colorModeRow = this._panel.find(".color-mode-row"),
                    dpiRow = this._panel.find(".dpi-row");
                if (gDesigner.isTouchEnabled()) {
                    (this._panel.find('input[data-property="gm-"]').is(":checked")
                        ? this._panel.find(".grid-mode").removeClass("mode-on")
                        : this._panel.find(".grid-mode").addClass("mode-on"),
                        colorModeRow.insertAfter(dpiRow));
                    let dpiSelect = dpiRow.find(".dpi-selector-column .g-input-select");
                    (dpiSelect.find(".dpi-text").length ||
                        $("<span/>")
                            .addClass("dpi-text")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.dpi")))
                            .insertAfter(dpiSelect.find("input")),
                        this._panel
                            .find(".unit-title-column span")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GSceneProperties", "text.unit-tooltip-title"))));
                } else
                    (dpiRow.find(".dpi-selector-column .g-input-select .dpi-text").remove(),
                        colorModeRow.insertBefore(dpiRow.prev()),
                        this._panel.find(".grid-mode").removeClass("mode-on"),
                        this._panel.find(".unit-title-column span").text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unit"))));
            }),
            (GSceneProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key ? this._updateProperties() : "touch" === event.key && this._updateUI();
            }),
            (GSceneProperties.prototype._synchronismUpdated = function (event) {
                event.document !== this._document ||
                    event.type !== GDocumentEvent.Type.SynchronismUpdated ||
                    event.document.isSynchronizing() ||
                    this._updateProperties();
            }),
            (GSceneProperties.prototype._updateColorMode = function () {
                var select = this._panel.find('select[data-property="cm"]').empty(),
                    colorModes = [
                        { value: GObject.GColor.ColorModes.RGB, pro: false, text: "RGB" },
                        { value: GObject.GColor.ColorModes.HSB, pro: true, text: "HSB" },
                        { value: GObject.GColor.ColorModes.CMYK, pro: true, text: "CMYK" },
                    ];
                Array.prototype.forEach.call(colorModes, (colorModeOption) => {
                    var option = $("<option></option>").attr("value", colorModeOption.value).text(colorModeOption.text).appendTo(select);
                    1 != colorModeOption.pro || gDesigner.getLicense().isPro() || option.gPro();
                });
            }),
            (GSceneProperties.prototype._updateProperties = function () {
                var scene = this._document.getScene();
                this._panel.find('[data-property="dpi"]').gInputSelect("value", this._scene.getProperty("dpi") || GObject.GLength.DPI);
                var hasCdr = this._document.hasCDR();
                (this._panel.find('[data-property="dpi"]').find('[type="text"]').prop("disabled", hasCdr),
                    this._panel.find('[data-property="dpi"]').find("button").prop("disabled", hasCdr),
                    this._panel
                        .find('[data-property="dpi"]')
                        .attr("data-title", hasCdr ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cant-change-cdr-limitations")) : ""));
                const colorMode = gDesigner.getSetting("color_mode", GObject.GColor.ColorModes.RGB);
                (colorMode && this._scene.setProperty("cm", colorMode),
                    this._panel.find('select[data-property="cm"]').val(colorMode),
                    this._panel.find('select[data-property="ut"]').val(this._scene.getProperty("ut")),
                    this._panel
                        .find('input[data-property="gx"]')
                        .gInputBox("value", scene.pointToString(this._scene.getProperty("gx"), this._scene.getOptimalDecimalsCount())));
                (this._panel
                    .find('input[data-property="gy"]')
                    .gInputBox("value", scene.pointToString(this._scene.getProperty("gy"), this._scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('input[data-property="gaw"]')
                        .gInputBox("value", scene.pointToString(this._scene.getProperty("gaw"), this._scene.getOptimalDecimalsCount())),
                    this._panel
                        .find('[type="text"][data-property="ga1"]')
                        .gInputBox("value", GObject.GUtil.formatNumber(GObject.GMath.toDegrees(this._scene.getProperty("ga1")), 1)),
                    this._panel
                        .find('[type="text"][data-property="ga2"]')
                        .gInputBox("value", GObject.GUtil.formatNumber(GObject.GMath.toDegrees(this._scene.getProperty("ga2")), 1)));
                var gridMode = this._scene.getProperty("gm");
                if (
                    (this._panel.find('[data-property^="gm"]').each(function (index, element) {
                        var radio = $(element),
                            mode = radio.attr("data-property").substr("gm-".length);
                        radio.prop("checked", (!mode && !gridMode) || mode === gridMode);
                    }),
                    !NEW_LAYOUT)
                ) {
                    var showEnableSync = this._document.isCloudFile()
                            ? !this._document.getScene().getProperty("cid")
                            : !this._document.hasCloudReference(),
                        showSwitchSync = !showEnableSync && (this._document.isCloudFile() || this._document.hasCloudReference());
                    (this._panel
                        .find('[data-property="enable-cloud-sync"]')
                        .css("display", showEnableSync ? "" : "none")
                        .find("button")
                        .prop("disabled", this._document.getStatus() === DocumentStatus.Loading),
                        this._panel
                            .find('[data-property="switch-cloud-sync"]')
                            .css("display", showSwitchSync ? "" : "none")
                            .find("input")
                            .prop(
                                "checked",
                                (this._document.getScene() && this._document.getScene().isCloudSynchronization()) ||
                                    this._document.isCloudFile()
                            )
                            .prop("disabled", this._document.isCloudFile()));
                    var lastModifiedText = (function (date) {
                        if (0 === date.getTime()) return null;
                        var hours = date.getHours(),
                            minutes = date.getMinutes(),
                            timeText = (hours = (hours %= 12) || 12) + ":" + (minutes = minutes < 10 ? "0" + minutes : minutes);
                        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + timeText;
                    })(this._document.getScene().lastModifiedDate());
                    this._panel
                        .find('[data-property="switch-cloud-sync"]')
                        .find(".last-modified-date")
                        .text(lastModifiedText || "")
                        .css("display", lastModifiedText ? "" : "none");
                }
                this._panel.find("[data-grid-mode]").each(function (index, element) {
                    var row = $(element),
                        mode = row.attr("data-grid-mode");
                    row.css("display", (!mode && !gridMode) || mode === gridMode ? "" : "none");
                });
            }),
            (GSceneProperties.prototype._assignProperty = function (property, value, description) {
                this._assignProperties([property], [value], description);
            }),
            (GSceneProperties.prototype._assignProperties = function (properties, values, description) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    this._scene.setProperties(properties, values);
                } finally {
                    editor.commitTransaction(description);
                }
            }),
            (GSceneProperties.prototype._enableCloudSync = function () {
                var performEnableSync = () => {
                    var document = this._document;
                    gDesigner.getDefaultStorage().canSave()
                        ? this._document.isNew()
                            ? GCommonNames.createFile(document, (file) => {
                                  (document.getScene().setCloudSynchronization(file.id),
                                      gDesigner.executeAction(
                                          GSaveAsAction.ID + defaultFileExtension,
                                          [
                                              null,
                                              document,
                                              () => {
                                                  GCommonNames.renameFile(file, document.getTitle(), () => {
                                                      document.storeToCloud(document.getScene(), this._updateProperties.bind(this));
                                                  });
                                              },
                                          ],
                                          void 0,
                                          true
                                      ));
                              })
                            : this._document.isCloudFile()
                              ? gDesigner.executeAction(GSaveAsAction.ID + defaultFileExtension, void 0, (void 0).true)
                              : this._document.hasCloudReference()
                                ? console.warn("Enable Sync for referenced file")
                                : GCommonNames.createFile(document, (file) => {
                                      (document.getScene().setCloudSynchronization(file.id),
                                          document.storeToCloud(document.getScene(), () => {
                                              document.store();
                                          }));
                                  })
                        : this._document.isNew()
                          ? gDesigner.executeAction(
                                GGravitCloudAction.ID + ".save-as",
                                [
                                    this._document,
                                    (status) => {
                                        status === DocumentStatus.Loaded && gDesigner.removeDocument(document, null, true);
                                    },
                                ],
                                void 0,
                                true
                            )
                          : this._document.isCloudFile()
                            ? gDesigner.executeAction(GSaveAsAction.ID + defaultFileExtension, void 0, void 0, true)
                            : this._document.hasCloudReference()
                              ? console.warn("Enable Sync for referenced file")
                              : gDesigner.executeAction(
                                    GGravitCloudAction.ID + ".save-as",
                                    [
                                        this._document,
                                        (status) => {
                                            status === DocumentStatus.Loaded && gDesigner.removeDocument(document, null, true);
                                        },
                                    ],
                                    void 0,
                                    true
                                );
                };
                gDesigner.getUser().then((user) => {
                    user
                        ? performEnableSync()
                        : GCommonNames.performLogin().then((success) => {
                              success && performEnableSync();
                          });
                });
            }),
            (GSceneProperties.prototype.toString = function () {
                return "[Object GSceneProperties]";
            }),
            (module.exports = GSceneProperties));
    };
