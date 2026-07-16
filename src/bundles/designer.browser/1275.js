module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(57), require(8 /* Symbol */), require(4), require(13), require(32), require(33));
        var GObject = require(1),
            a = require(53),
            designerConfig = require(10),
            GAutoSave = require(1276),
            l = _interopRequireDefault(require(1278)),
            c = require(85),
            d = null;
        function u() {
            return (
                d ||
                    (d = [
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
                new Promise((e, t) => {
                    this._buildDialog()
                        .then(() => e(this))
                        .catch(() => t(false));
                })
            );
        }
        (GObject.GObject.inherit(u, GObject.GObject),
            (u.prototype._buildDialog = async function () {
                let e = (await designerConfig.gApi.getUserSettings().catch(() => ({ notifications_disabled: false }))).notifications_disabled;
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
                                                const e = !!this.checked;
                                                gDesigner.stats("settings_toggle_auto-save-warning-enabled", e);
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
                                            .prop("checked", gDesigner.getSetting("enable_steps_debug", a.GEditorOptions.debugTransactions))
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
                                        .prop("checked", e)
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
                                        .attr("data-setting", l.default.getSetting())
                                        .on("change", (e) => {
                                            const t = $(e.target).closest("input").is(":checked");
                                            gDesigner.stats("settings_toggle_disable-scrubbing", t);
                                        })
                                        .prop("checked", !l.default.isEnabled())
                                )
                                .append($("<div></div>"))
                        )
                    ),
                    gContainer.getRuntime() === c.Runtime.Electron &&
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
            (u.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (u.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (u.prototype.save = async function (e) {
                (this._saveBasicSettings(), await this._saveNotificationSetting(), e(), $(".symbols-container").triggerHandler("scroll"));
            }),
            (u.prototype._saveNotificationSetting = async function () {
                var e = this._dialog.find('[data-setting="notifications_disabled"]').prop("checked"),
                    t = await designerConfig.gApi.getUserSettings();
                t && t.notifications_disabled !== e && (await designerConfig.gApi.updateUserSettings({ notifications_disabled: e }, true));
            }),
            (u.prototype._saveBasicSettings = function () {
                var e =
                        designerConfig.AUTOSAVE_INTERVALS[
                            parseInt(this._dialog.find('[data-setting="'.concat(GAutoSave.AUTO_SAVE_INTERVAL_SETTING, '"]')).val())
                        ],
                    t = null;
                if (this._dialog.find('[data-setting="decimals-num-onoff"]').prop("checked")) {
                    var n = this._dialog.find('[data-setting="decimals-num-val"]').gInputBox("value"),
                        o = GObject.GUtil.parseNumber(n);
                    "number" != typeof o || isNaN(o) || (t = o);
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
                        l.default.getSetting(),
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
                        t,
                        e,
                        this._dialog.find('[data-setting="create_backup_copy"]').prop("checked"),
                        !this._dialog.find('[data-setting="'.concat(l.default.getSetting(), '"]')).prop("checked"),
                    ]
                );
            }),
            (u.prototype._createSetting = function (e, t, n) {
                var o = $("<div></div>").addClass("text-description").append($("<div></div>").text(e).addClass("label"));
                return (
                    t
                        ? (o = o.append($("<div></div>").addClass("description").html(t))).find("a").attr("target", "_blank")
                        : o.css({ verticalAlign: "middle" }),
                    $("<div></div>")
                        .addClass("setting")
                        .append($("<div></div>").addClass("form").append(o).append($("<div></div>").addClass("editor").append(n)))
                );
            }),
            (u.prototype._createThemeSelector = function () {
                for (
                    var e,
                        t = function (e, t) {
                            return $("<div/>")
                                .html(e.name)
                                .addClass("g-theme-row")
                                .on("click", function () {
                                    (gDesigner.stats(
                                        "settings_change_theme",
                                        GObject.GLocale.get(e.localeClass, null, GObject.GLocaleLanguage.English)
                                    ),
                                        $(".g-theme-selector").data("theme", e.key).text(e.name),
                                        t && t());
                                });
                        },
                        n = 0;
                    n < d.length;
                    ++n
                )
                    if (d[n].key === gDesigner.getSetting("theme", "light")) {
                        e = d[n];
                        break;
                    }
                e = e || d[0];
                var o = function () {
                    $(".g-overlay.theme-selector").find(".g-theme-row:hover").trigger("click");
                };
                return $("<div/>")
                    .attr("type", "button")
                    .addClass("g-select")
                    .css("min-width", "170px")
                    .css("width", "max-content")
                    .text(e.name)
                    .attr("data-setting", "theme")
                    .data("theme", e.key)
                    .addClass("g-theme-selector")
                    .on("click", function (e) {
                        for (var n = $("<div/>"), i = 0; i < d.length; ++i)
                            n.append(
                                t(d[i], function () {
                                    n.gOverlay("close");
                                })
                            );
                        n.gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "theme-selector",
                            enterCallback: o,
                        }).gOverlay("open", e.target);
                    });
            }),
            (u.prototype._createDecimalsNum = function () {
                var e = gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum),
                    t = $("<div/>").append(
                        $("<input>")
                            .attr("type", "text")
                            .css("width", "60px")
                            .css("display", null !== gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum) ? "" : "none")
                            .attr("data-setting", "decimals-num-val")
                            .gInputBox({ minValue: 0, maxVal: 6 })
                            .on(
                                "change",
                                function (e) {
                                    gDesigner.stats("settings_change_decimals-num");
                                    var t = $(e.target).gInputBox("value");
                                    ((t = GObject.GUtil.parseNumber(t)) < 0 && (t = 0),
                                        t > 6 && (t = 6),
                                        $(e.target).gInputBox("value", null !== t ? GObject.GUtil.formatNumber(t, 0) : "2"));
                                }.bind(this)
                            )
                            .gInputBox("value", null !== e ? GObject.GUtil.formatNumber(e, 0) : "2")
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
                                function (e) {
                                    gDesigner.stats("settings_change_decimals-num");
                                    var t = gDesigner.getSetting("decimals_num", GObject.GScene.decimalsNum),
                                        n = "2";
                                    (null !== t && (n = GObject.GUtil.formatNumber(t, 0)),
                                        this._dialog
                                            .find('[data-setting="decimals-num-val"]')
                                            .css("display", $(e.target).prop("checked") ? "" : "none")
                                            .gInputBox("value", n));
                                }.bind(this)
                            )
                            .append($("<div></div>"))
                    )
                    .append(t);
            }),
            (u.prototype._createAutoSaveSetting = function () {
                var e = $("<label/>")
                        .addClass("g-switch")
                        .append(
                            $("<input>")
                                .attr("type", "checkbox")
                                .attr("data-setting", "auto_save")
                                .on("change", function () {
                                    const e = !!this.checked;
                                    gDesigner.stats("settings_toggle_auto-save", e);
                                })
                                .prop("checked", gDesigner.getSetting("auto_save", true))
                        )
                        .append($("<div/>")),
                    t = $("<select/>")
                        .attr("data-setting", GAutoSave.AUTO_SAVE_INTERVAL_SETTING)
                        .on("change", function () {
                            const e = designerConfig.AUTOSAVE_INTERVALS[$(this).val()];
                            gDesigner.stats("settings_change_auto-save-interval", e);
                        });
                return (
                    designerConfig.AUTOSAVE_INTERVALS.forEach((e, n) => {
                        var o = $("<option/>").text(e).val(n);
                        t.append(o);
                    }),
                    t.val(designerConfig.AUTOSAVE_INTERVALS.indexOf(gDesigner.getSetting(GAutoSave.AUTO_SAVE_INTERVAL_SETTING, designerConfig.AUTOSAVE_INTERVAL_DEFAULT))),
                    [e, t]
                );
            }),
            (module.exports = u));
    };
