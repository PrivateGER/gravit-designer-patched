module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(3));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31),
            GExportDialog = require(1513),
            GLoginPanel = require(446),
            GSaveAction = require(447);
        const DocumentStatus = require(86),
            GSystemDialog = require(44);
        function GExportAction(options) {
            ((this._options = options || null),
                (GExportAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "tooltip-description")),
                        shortcut: GExportAction.SHORTCUT,
                        learnMore: "/docs/import-export/export/",
                    }),
                    [GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.try-this-feature-pro-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.try-this-feature-pro-tooltip-description")),
                        learnMore: "/docs/import-export/export/#advanced-export",
                        upgradeToProStatsValue: "file.export",
                        middle: false,
                        side: true,
                    }),
                    [GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_EXP_PDF_ADVANCED_SETTING]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.try-export-pdf-advanced-setting-tooltip-title")),
                        description: GObject.GLocale.get(
                            new GObject.GLocaleKey("GExportAction", "text.try-export-pdf-advanced-setting-tooltip-description")
                        ),
                        learnMore: "/docs/import-export/export/#advanced-export",
                        upgradeToProStatsValue: "file.export.pdf",
                        middle: false,
                        side: true,
                    }),
                }),
                this._initProTooltip());
        }
        (GObject.GObject.inherit(GExportAction, GAction),
            (GExportAction.ID = "file.export"),
            (GExportAction.TITLE = new GObject.GLocaleKey("GExportAction", "title")),
            (GExportAction.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "E"]),
            (GExportAction.TOOLTIP_CONFIG = null),
            (GExportAction.prototype._initProTooltip = function () {
                GExportAction.TOOLTIP_CONFIG[GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR] = GRichTooltipConfig.GRichTooltipConfig.from(
                    Object.assign(GExportAction.TOOLTIP_CONFIG[GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR].getConfig(), {
                        isPro: gDesigner.isProTooltipNeeded(GExportAction.ID),
                    })
                );
            }),
            (GExportAction.prototype.getId = function () {
                return this._options && this._options.format ? GExportAction.ID + "." + this._options.format : GExportAction.ID;
            }),
            (GExportAction.prototype.getTitle = function () {
                return this._options ? new GObject.GLocaleKey("GExportAction", "title.advanced-options") : GExportAction.TITLE;
            }),
            (GExportAction.prototype.getGroupIcon = function () {
                return this._options ? null : "gravit-icon-export";
            }),
            (GExportAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-export" : null;
            }),
            (GExportAction.prototype.getCategory = function () {
                return this._options && "pdf" == this._options.format ? GCategory.CATEGORY_FILE_EXPORT_PDF : GCategory.CATEGORY_FILE_EXPORT;
            }),
            (GExportAction.prototype.getGroup = function () {
                return this._options ? "export/file-type/export" : "export/export";
            }),
            (GExportAction.prototype.isPro = function () {
                return true;
            }),
            (GExportAction.prototype.getShortcut = function () {
                return this._options ? null : GExportAction.SHORTCUT;
            }),
            (GExportAction.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isExportEnabled()) return false;
                return !!gDesigner.getActiveDocument();
            }),
            (GExportAction.prototype.execute = function () {
                const options = arguments[0],
                    document = gDesigner.getActiveDocument(),
                    self = this;
                function openExportDialog(document) {
                    new GExportDialog(document, self._options || options, self.getId()).open();
                }
                document && document.isCommercialProductFile()
                    ? document.openPaywall(this.getId())
                    : document.hasPagesWithInfiniteEmptyCanvas()
                      ? GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")))
                      : new GLoginPanel(
                            () => {
                                $(".g-export-dialog").length ||
                                    (document.isNew()
                                        ? GSystemDialog.confirm(
                                              GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.save-before-export")),
                                              (confirmed) => {
                                                  confirmed
                                                      ? gDesigner.executeAction(
                                                            GSaveAction.ID,
                                                            [
                                                                document,
                                                                function () {
                                                                    let result =
                                                                        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                                    const { documentStatus: documentStatus = null } = result;
                                                                    documentStatus && documentStatus === DocumentStatus.Saved && openExportDialog(gDesigner.getActiveDocument());
                                                                },
                                                                true,
                                                            ],
                                                            "unsavedhandler"
                                                        )
                                                      : openExportDialog(document);
                                              },
                                              GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")),
                                              GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes"))
                                          )
                                        : openExportDialog(document));
                            },
                            () => {
                                gDesigner.stats("action-cancelled_anonymous", this.getId());
                            }
                        );
            }),
            (GExportAction.prototype.getTooltipArea = function () {
                return this._options && "pdf" === this._options.format
                    ? GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_EXP_PDF_ADVANCED_SETTING
                    : GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (GExportAction.prototype.getTooltipConfig = function (area) {
                return this._options
                    ? ("pdf" === this._options.format && area && GExportAction.TOOLTIP_CONFIG[area]) || null
                    : (area && GExportAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GExportAction.prototype.toString = function () {
                return "[Object GExportAction]";
            }),
            (module.exports = GExportAction));
    };
