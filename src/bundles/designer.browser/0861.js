module.exports = function (module, exports, require) {
        "use strict";
        (require(30), require(3));
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(31),
            GExportDialog = require(1513),
            GLoginPanel = require(446),
            GSaveAction = require(447);
        const u = require(86),
            GSystemDialog = require(44);
        function g(e) {
            ((this._options = e || null),
                (g.TOOLTIP_CONFIG = {
                    [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "tooltip-description")),
                        shortcut: g.SHORTCUT,
                        learnMore: "/docs/import-export/export/",
                    }),
                    [a.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: a.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.try-this-feature-pro-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.try-this-feature-pro-tooltip-description")),
                        learnMore: "/docs/import-export/export/#advanced-export",
                        upgradeToProStatsValue: "file.export",
                        middle: false,
                        side: true,
                    }),
                    [a.TOOLTIP_AREA.MAIN_MENU.TRY_EXP_PDF_ADVANCED_SETTING]: a.GRichTooltipConfig.from({
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
        (GObject.GObject.inherit(g, s),
            (g.ID = "file.export"),
            (g.TITLE = new GObject.GLocaleKey("GExportAction", "title")),
            (g.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "E"]),
            (g.TOOLTIP_CONFIG = null),
            (g.prototype._initProTooltip = function () {
                g.TOOLTIP_CONFIG[a.TOOLTIP_AREA.TOOLBAR] = a.GRichTooltipConfig.from(
                    Object.assign(g.TOOLTIP_CONFIG[a.TOOLTIP_AREA.TOOLBAR].getConfig(), {
                        isPro: gDesigner.isProTooltipNeeded(g.ID),
                    })
                );
            }),
            (g.prototype.getId = function () {
                return this._options && this._options.format ? g.ID + "." + this._options.format : g.ID;
            }),
            (g.prototype.getTitle = function () {
                return this._options ? new GObject.GLocaleKey("GExportAction", "title.advanced-options") : g.TITLE;
            }),
            (g.prototype.getGroupIcon = function () {
                return this._options ? null : "gravit-icon-export";
            }),
            (g.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-export" : null;
            }),
            (g.prototype.getCategory = function () {
                return this._options && "pdf" == this._options.format ? GCategory.CATEGORY_FILE_EXPORT_PDF : GCategory.CATEGORY_FILE_EXPORT;
            }),
            (g.prototype.getGroup = function () {
                return this._options ? "export/file-type/export" : "export/export";
            }),
            (g.prototype.isPro = function () {
                return true;
            }),
            (g.prototype.getShortcut = function () {
                return this._options ? null : g.SHORTCUT;
            }),
            (g.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isExportEnabled()) return false;
                return !!gDesigner.getActiveDocument();
            }),
            (g.prototype.execute = function () {
                const e = arguments[0],
                    t = gDesigner.getActiveDocument(),
                    n = this;
                function i(t) {
                    new GExportDialog(t, n._options || e, n.getId()).open();
                }
                t && t.isCommercialProductFile()
                    ? t.openPaywall(this.getId())
                    : t.hasPagesWithInfiniteEmptyCanvas()
                      ? GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")))
                      : new GLoginPanel(
                            () => {
                                $(".g-export-dialog").length ||
                                    (t.isNew()
                                        ? GSystemDialog.confirm(
                                              GObject.GLocale.get(new GObject.GLocaleKey("GExportAction", "text.save-before-export")),
                                              (e) => {
                                                  e
                                                      ? gDesigner.executeAction(
                                                            GSaveAction.ID,
                                                            [
                                                                t,
                                                                function () {
                                                                    let e =
                                                                        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                                    const { documentStatus: t = null } = e;
                                                                    t && t === u.Saved && i(gDesigner.getActiveDocument());
                                                                },
                                                                true,
                                                            ],
                                                            "unsavedhandler"
                                                        )
                                                      : i(t);
                                              },
                                              GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")),
                                              GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes"))
                                          )
                                        : i(t));
                            },
                            () => {
                                gDesigner.stats("action-cancelled_anonymous", this.getId());
                            }
                        );
            }),
            (g.prototype.getTooltipArea = function () {
                return this._options && "pdf" === this._options.format
                    ? a.TOOLTIP_AREA.MAIN_MENU.TRY_EXP_PDF_ADVANCED_SETTING
                    : a.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (g.prototype.getTooltipConfig = function (e) {
                return this._options
                    ? ("pdf" === this._options.format && e && g.TOOLTIP_CONFIG[e]) || null
                    : (e && g.TOOLTIP_CONFIG[e]) || null;
            }),
            (g.prototype.toString = function () {
                return "[Object GExportAction]";
            }),
            (module.exports = g));
    };
