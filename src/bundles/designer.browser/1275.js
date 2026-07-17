module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(57), require(8 /* Symbol */), require(4), require(13), require(32), require(33));
        var GObject = require(1),
            editorOptionsModule = require(53),
            designerConfig = require(10),
            GAutoSave = require(1276),
            scrubbingModule = _interopRequireDefault(require(1278)),
            runtimeModule = require(85 /* GContainer */),
            themes = null;
        function SettingsDialog() {
            return (
                themes ||
                    (themes = [
                        {
                            name:
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "text.light-theme")) +
                                " (" +
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.default")).toLowerCase() +
                                ")",
                            localeClass: new GObject.GLocaleKey("GSettingsDialog", "text.light-theme"),
                            key: "light",
                        },
                        {
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "text.dark-theme")),
                            localeClass: new GObject.GLocaleKey("GSettingsDialog", "text.dark-theme"),
                            key: "dark",
                        },
                    ]),
                new Promise((resolve, reject) => {
                    this._buildDialog()
                        .then(() => resolve(this))
                        .catch(() => reject(false));
                })
            );
        }
        (GObject.GObject.inherit(SettingsDialog, GObject.GObject),
            (SettingsDialog.prototype._buildDialog = async function () {
                let notificationsDisabled = (await designerConfig.gApi.getUserSettings().catch(() => ({ notifications_disabled: false }))).notifications_disabled;
                ((this._dialog = $("<div></div>")
                    .append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.highlight-on-hover")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.highlight-on-hover-description")),
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "highlight_on_hover")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_highlight-on-hover");
                                        })
                                        .prop("checked", gDesigner.getSetting("highlight_on_hover"))
                                )
                                .append($("<div/>"))
                        )
                    )
                    .append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-expand-layers")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-expand-layers-description")),
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "auto_expand_layers")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_auto-expand-layers");
                                        })
                                        .prop("checked", gDesigner.getSetting("auto_expand_layers"))
                                )
                                .append($("<div/>"))
                        )
                    )),
                    designerConfig.AUTO_SAVE_ENABLED &&
                        (this._dialog.append(
                            this._createSetting(
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-save")),
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-save-description")),
                                this._createAutoSaveSetting()
                            )
                        ),
                        this._dialog.append(
                            this._createSetting(
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-save-warning")),
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.auto-save-warning-description")),
                                $("<label/>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .attr("data-setting", GAutoSave.DISABLE_WARNING_SETTING_NAME)
                                            .on("change", function () {
                                                const autoSaveWarningEnabled = !!this.checked;
                                                gDesigner.stats("settings_toggle_auto-save-warning-enabled", autoSaveWarningEnabled);
                                            })
                                            .prop("checked", !gDesigner.getSetting(GAutoSave.DISABLE_WARNING_SETTING_NAME, false))
                                    )
                                    .append($("<div/>"))
                            )
                        )),
                    "production" === gDesigner.getEnv() ||
                        gDesigner.isBeta() ||
                        "lts" === gDesigner.getEnv() ||
                        "rc" === gDesigner.getEnv() ||
                        (this._dialog.append(
                            this._createSetting(
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.enable_steps_debug")),
                                null,
                                $("<label></label>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .attr("data-setting", "enable_steps_debug")
                                            .on("change", () => {
                                                gDesigner.stats("settings_toggle_steps-debug");
                                            })
                                            .prop("checked", gDesigner.getSetting("enable_steps_debug", editorOptionsModule.GEditorOptions.debugTransactions))
                                    )
                                    .append($("<div></div>"))
                            )
                        ),
                        this._dialog.append(
                            this._createSetting(
                                "Enable cached rendering",
                                null,
                                $("<label></label>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .attr("data-setting", "enable_cache")
                                            .on("change", () => {
                                                gDesigner.stats("settings_toggle_cache");
                                            })
                                            .prop("checked", gDesigner.getSetting("enable_cache", GObject.GRendererConfig.ENABLE_CACHE))
                                    )
                                    .append($("<div></div>"))
                            )
                        )),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.change-theme")),
                            null,
                            this._createThemeSelector()
                        ).append(
                            this._createSetting(
                                null,
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.ui-toolbar-alignment")),
                                $("<label></label>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .attr("data-setting", "ui_toolbar_alignment")
                                            .on("change", () => {
                                                gDesigner.stats("settings_toggle_ui-toolbar-alignment");
                                            })
                                            .prop("checked", gDesigner.getSetting("ui_toolbar_alignment", false))
                                    )
                                    .append($("<div></div>"))
                            ).addClass("sub-setting")
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.store-textpath")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.store-textpath-description")),
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "dont_store_textpath")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_store-textpath");
                                        })
                                        .prop("checked", !gDesigner.getSetting("dont_store_textpath", GObject.GText.dontStorePaths))
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.decimals-num")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.decimals-num-description")),
                            this._createDecimalsNum()
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.disable-warning-unsupported-features")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.disable-warning-unsupported-features-description")),
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "disable_warning_unsupported_features")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_warning-unsupported-features");
                                        })
                                        .prop("checked", gDesigner.getSetting("disable_warning_unsupported_features", false))
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.eps-outline-fonts")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.eps-outline-fonts-description")),
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "eps_outline_fonts")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_eps-outline-fonts");
                                        })
                                        .prop("checked", gDesigner.getSetting("eps_outline_fonts", true))
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.disable-notifications")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.disable-notifications-description")),
                            $("<label></label>")
                                .addClass("g-switch test")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", "notifications_disabled")
                                        .on("change", () => {
                                            gDesigner.stats("settings_toggle_disable-notifications");
                                        })
                                        .prop("checked", notificationsDisabled)
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    this._dialog.append(
                        this._createSetting(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.disable-scrubbing")),
                            null,
                            $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-setting", scrubbingModule.default.getSetting())
                                        .on("change", (event) => {
                                            const checked = $(event.target).closest("input").is(":checked");
                                            gDesigner.stats("settings_toggle_disable-scrubbing", checked);
                                        })
                                        .prop("checked", !scrubbingModule.default.isEnabled())
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    gContainer.getRuntime() === runtimeModule.Runtime.Electron &&
                        this._dialog.append(
                            this._createSetting(
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.create-backup-copy-of-file")),
                                GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "setting.create-backup-copy-of-file-description")),
                                $("<label></label>")
                                    .addClass("g-switch")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .attr("data-setting", "create_backup_copy")
                                            .on("change", () => {
                                                gDesigner.stats("settings_toggle_create-backup-copy");
                                            })
                                            .prop("checked", gDesigner.getSetting("create_backup_copy", false))
                                    )
                                    .append($("<div></div>"))
                            )
                        ),
                    this._dialog.gDialog({
                        releaseOnClose: true,
                        className: "g-settings-dialog",
                        buttons: [
                            $('<button class="settings-button">' + GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")) + "</button>").on(
                                "click",
                                () => {
                                    (gDesigner.stats("settings_cancel_settings"), this.close());
                                }
                            ),
                            $(
                                '<button class="settings-button">' +
                                    GObject.GLocale.get(new GObject.GLocaleKey("GSettingsDialog", "action.save-changes")) +
                                    "</button>"
                            ).on("click", () => {
                                (gDesigner.stats("settings_save_settings"), this.save(this.close.bind(this)));
                            }),
                        ],
                    }));
            }),
            (SettingsDialog.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (SettingsDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (SettingsDialog.prototype.save = async function (callback) {
                (this._saveBasicSettings(), await this._saveNotificationSetting(), callback(), $(".symbols-container").triggerHandler("scroll"));
            }),
            (SettingsDialog.prototype._saveNotificationSetting = async function () {
                var notificationsDisabled = this._dialog.find('[data-setting="notifications_disabled"]').prop("checked"),
                    userSettings = await designerConfig.gApi.getUserSettings();
                userSettings && userSettings.notifications_disabled !== notificationsDisabled && (await designerConfig.gApi.updateUserSettings({ notifications_disabled: notificationsDisabled }, true));
            }),
            (SettingsDialog.prototype._saveBasicSettings = function () {
                var autoSaveInterval =
                        designerConfig.AUTOSAVE_INTERVALS[
                            parseInt(this._dialog.find('[data-setting="'.concat(GAutoSave.AUTO_SAVE_INTERVAL_SETTING, '"]')).val())
                        ],
                    decimalsNum = null;
                if (this._dialog.find('[data-setting="decimals-num-onoff"]').prop("checked")) {
                    var rawDecimalsNum = this._dialog.find('[data-setting="decimals-num-val"]').gInputBox("value"),
                        parsedDecimalsNum = GObject.GUtil.parseNumber(rawDecimalsNum);
                    "number" != typeof parsedDecimalsNum || isNaN(parsedDecimalsNum) || (decimalsNum = parsedDecimalsNum);
                }
                gDesigner.setSetting(
                    [
                        "highlight_on_hover",
                        "auto_expand_layers",
                        GAutoSave.AUTO_SAVE_SETTING,
                        GAutoSave.DISABLE_WARNING_SETTING_NAME,
                        "system_fonts_enabled",
                        "theme",
                        "dont_store_textpath",
                        "enable_steps_debug",
                        "enable_cache",
                        "disable_warning_unsupported_features",
                        "eps_outline_fonts",
                        "ui_toolbar_alignment",
                        "decimals_num",
                        GAutoSave.AUTO_SAVE_INTERVAL_SETTING,
                        "create_backup_copy",
                        scrubbingModule.default.getSetting(),
                    ],
                    [
                        this._dialog.find('[data-setting="highlight_on_hover"]').prop("checked"),
                        this._dialog.find('[data-setting="auto_expand_layers"]').prop("checked"),
                        this._dialog.find('[data-setting="'.concat(GAutoSave.AUTO_SAVE_SETTING, '"]')).prop("checked"),
                        !this._dialog.find('[data-setting="'.concat(GAutoSave.DISABLE_WARNING_SETTING_NAME, '"]')).prop("checked"),
                        this._dialog.find('[data-setting="system_fonts_enabled"]').prop("checked"),
                        this._dialog.find('[data-setting="theme"]').data("theme"),
                        !this._dialog.find('[data-setting="dont_store_textpath"]').prop("checked"),
                        this._dialog.find('[data-setting="enable_steps_debug"]').prop("checked"),
                        this._dialog.find('[data-setting="enable_cache"]').prop("checked"),
                        this._dialog.find('[data-setting="disable_warning_unsupported_features"]').prop("checked"),
                        this._dialog.find('[data-setting="eps_outline_fonts"]').prop("checked"),
                        this._dialog.find('[data-setting="ui_toolbar_alignment"]').prop("checked"),
                        decimalsNum,
                        autoSaveInterval,
                        this._dialog.find('[data-setting="create_backup_copy"]').prop("checked"),
                        !this._dialog.find('[data-setting="'.concat(scrubbingModule.default.getSetting(), '"]')).prop("checked"),
                    ]
                );
            }),
            (SettingsDialog.prototype._createSetting = function (labelText, descriptionHtml, editorElement) {
                var labelBlock = $("<div></div>").addClass("text-description").append($("<div></div>").text(labelText).addClass("label"));
                return (
                    descriptionHtml
                        ? (labelBlock = labelBlock.append($("<div></div>").addClass("description").html(descriptionHtml))).find("a").attr("target", "_blank")
                        : labelBlock.css({ verticalAlign: "middle" }),
                    $("<div></div>")
                        .addClass("setting")
                        .append($("<div></div>").addClass("form").append(labelBlock).append($("<div></div>").addClass("editor").append(editorElement)))
                );
            }),
            (SettingsDialog.prototype._createThemeSelector = function () {
                for (
                    var selectedTheme,
                        t = function (theme, t) {
                            return $("<div/>")
                                .html(theme.name)
                                .addClass("g-theme-row")
                                .on("click", function () {
                                    (gDesigner.stats(
                                        "settings_change_theme",
                                        GObject.GLocale.get(theme.localeClass, null, GObject.GLocaleLanguage.English)
                                    ),
                                        $(".g-theme-selector").data("theme", theme.key).text(theme.name),
                                        t && t());
                                });
                        },
                        n = 0;
                    n < themes.length;
                    ++n
                )
                    if (themes[n].key === gDesigner.getSetting("theme", "light")) {
                        selectedTheme = themes[n];
                        break;
                    }
                selectedTheme = selectedTheme || themes[0];
                var selectHoveredTheme = function () {
                    $(".g-overlay.theme-selector").find(".g-theme-row:hover").trigger("click");
                };
                return $("<div/>")
                    .attr("type", "button")
                    .addClass("g-select")
                    .css("min-width", "170px")
                    .css("width", "max-content")
                    .text(selectedTheme.name)
                    .attr("data-setting", "theme")
                    .data("theme", selectedTheme.key)
                    .addClass("g-theme-selector")
                    .on("click", function (event) {
                        for (var themeList = $("<div/>"), i = 0; i < themes.length; ++i)
                            themeList.append(
                                t(themes[i], function () {
                                    themeList.gOverlay("close");
                                })
                            );
                        themeList.gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "theme-selector",
                            enterCallback: selectHoveredTheme,
                        }).gOverlay("open", event.target);
                    });
            }),
            (SettingsDialog.prototype._createDecimalsNum = function () {
                var currentDecimalsNum = gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum),
                    decimalsInput = $("<div/>").append(
                        $("<input>")
                            .attr("type", "text")
                            .css("width", "60px")
                            .css("display", null !== gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum) ? "" : "none")
                            .attr("data-setting", "decimals-num-val")
                            .gInputBox({ minValue: 0, maxVal: 6 })
                            .on(
                                "change",
                                function (event) {
                                    gDesigner.stats("settings_change_decimals-num");
                                    var parsedValue = $(event.target).gInputBox("value");
                                    ((parsedValue = GObject.GUtil.parseNumber(parsedValue)) < 0 && (parsedValue = 0),
                                        parsedValue > 6 && (parsedValue = 6),
                                        $(event.target).gInputBox("value", null !== parsedValue ? GObject.GUtil.formatNumber(parsedValue, 0) : "2"));
                                }.bind(this)
                            )
                            .gInputBox("value", null !== currentDecimalsNum ? GObject.GUtil.formatNumber(currentDecimalsNum, 0) : "2")
                    );
                return $("<div/>")
                    .append(
                        $("<label></label>")
                            .addClass("g-switch")
                            .append(
                                $("<input>")
                                    .attr("type", "checkbox")
                                    .attr("data-setting", "decimals-num-onoff")
                                    .prop("checked", null !== gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum))
                            )
                            .on(
                                "change",
                                function (event) {
                                    gDesigner.stats("settings_change_decimals-num");
                                    var currentDecimalsNum = gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum),
                                        decimalsNumText = "2";
                                    (null !== currentDecimalsNum && (decimalsNumText = GObject.GUtil.formatNumber(currentDecimalsNum, 0)),
                                        this._dialog
                                            .find('[data-setting="decimals-num-val"]')
                                            .css("display", $(event.target).prop("checked") ? "" : "none")
                                            .gInputBox("value", decimalsNumText));
                                }.bind(this)
                            )
                            .append($("<div></div>"))
                    )
                    .append(decimalsInput);
            }),
            (SettingsDialog.prototype._createAutoSaveSetting = function () {
                var autoSaveToggle = $("<label/>")
                        .addClass("g-switch")
                        .append(
                            $("<input>")
                                .attr("type", "checkbox")
                                .attr("data-setting", "auto_save")
                                .on("change", function () {
                                    const enabled = !!this.checked;
                                    gDesigner.stats("settings_toggle_auto-save", enabled);
                                })
                                .prop("checked", gDesigner.getSetting("auto_save", true))
                        )
                        .append($("<div/>")),
                    intervalSelect = $("<select/>")
                        .attr("data-setting", GAutoSave.AUTO_SAVE_INTERVAL_SETTING)
                        .on("change", function () {
                            const selectedInterval = designerConfig.AUTOSAVE_INTERVALS[$(this).val()];
                            gDesigner.stats("settings_change_auto-save-interval", selectedInterval);
                        });
                return (
                    designerConfig.AUTOSAVE_INTERVALS.forEach((interval, index) => {
                        var optionElement = $("<option/>").text(interval).val(index);
                        intervalSelect.append(optionElement);
                    }),
                    intervalSelect.val(designerConfig.AUTOSAVE_INTERVALS.indexOf(gDesigner.getSetting(GAutoSave.AUTO_SAVE_INTERVAL_SETTING, designerConfig.AUTOSAVE_INTERVAL_DEFAULT))),
                    [autoSaveToggle, intervalSelect]
                );
            }),
            (module.exports = SettingsDialog));
    };
