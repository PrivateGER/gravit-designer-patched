module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        const tooltipConfigs = [
            {
                selector: "#toolbar > .section > .menubar-toolbar-button",
                i18n: "text.menu",
                offsetX: 10,
            },
            {
                selector: "#toolbar > .section > .open-toolbar-button > .action-button",
                i18n: "text.open",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .save-toolbar-button > .action-button",
                i18n: "text.save",
            },
            {
                selector: "#toolbar > .section > .undo-toolbar-button > .action-button",
                i18n: "text.undo-redo",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .zoom-button > .action-button > .caption",
                i18n: "text.zoom",
                offsetY: 14,
            },
            {
                selector: "#toolbar > .section > .snap-button > .action-button",
                i18n: "text.snapping",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .select-toolbar-button > .action-button",
                i18n: "text.select",
            },
            {
                selector: "#toolbar > .section > .shapes-toolbar-button > .action-button",
                i18n: "text.shapes",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .path-toolbar-button > .action-button",
                i18n: "text.path",
            },
            {
                selector: "#toolbar > .section > .knife-toolbar-button > .action-button",
                i18n: "text.knife",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .text-toolbar-button > .action-button",
                i18n: "text.text",
            },
            {
                selector: "#toolbar > .section > .image-toolbar-button > .action-button",
                i18n: "text.image",
                furtherAway: true,
            },
            {
                selector: "#toolbar > .section > .window-button  > .action-button",
                i18n: "text.files",
            },
            {
                selector: "#toolbar > .section > .export-toolbar-button > .action-button",
                i18n: "text.export",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="pages"]',
                i18n: "text.pages",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="layers"]',
                i18n: "text.layers",
                furtherAway: true,
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="libraries"]',
                i18n: "text.libraries",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="symbols"]',
                i18n: "text.symbols",
                furtherAway: true,
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="dimension.align"]',
                i18n: "text.align-distribute",
                className: "align-distribute",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="dimension.dimension"]',
                i18n: "text.transform",
                furtherAway: true,
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="document"]',
                i18n: "text.document",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="appearance"]',
                i18n: "text.appearance",
                furtherAway: true,
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="fill"]',
                i18n: "text.fills",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="border"]',
                i18n: "text.borders",
                furtherAway: true,
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="effect"]',
                i18n: "text.effects",
            },
            {
                selector: '.g-touch-toolbar-button[g-touch-tool="annotation"]',
                i18n: "text.comments",
                furtherAway: true,
            },
            {
                selector: "#assistant-bar > .container",
                side: GObject.GRect.Side.LEFT_CENTER,
                i18n: "text.modifier-keys",
                disconnected: true,
                offsetX: -15,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar > .container",
                side: GObject.GRect.Side.RIGHT_CENTER,
                i18n: "text.nudge",
                disconnected: true,
                offsetX: 15,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-copy",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.copy",
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-paste",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.paste",
                furtherAway: true,
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-trash-2",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.delete",
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-selection",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.select-deselect",
                furtherAway: true,
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-arrange-order",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.arrange",
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-fullscreen",
                side: GObject.GRect.Side.TOP_CENTER,
                i18n: "text.fullscreen",
                furtherAway: true,
                offsetY: -10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-group",
                i18n: "text.group",
                offsetY: 10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-ungroup",
                i18n: "text.ungroup",
                furtherAway: true,
                offsetY: 10,
                className: "assistant-bar",
            },
            {
                selector: "#assistant-bar .gravit-icon-touch-convert-to-path",
                i18n: "text.convert-to-path",
                offsetY: 10,
                className: "assistant-bar",
            },
        ];
        module.exports = new (class {
            constructor() {
                this._resizeBound = this._resize.bind(this);
            }
            open() {
                this._panel && this._panel.remove();
                const body = $("body").addClass("g-quick-help");
                ((this._panel = $("<div/>")
                    .addClass("g-quick-help-screen")
                    .addClass(GObject.GLocale.getLocaleTagISO6391())
                    .addClass("hidden")
                    .on("click", () => this.close())
                    .appendTo(body)),
                    gDesigner.getRightSidebars().disableContextSensitive(),
                    this._update(),
                    this._panel.removeClass("hidden"),
                    $(window).on("resize", this._resizeBound));
            }
            close() {
                ($("body").removeClass("g-quick-help"),
                    this._panel && this._panel.remove(),
                    delete this._panel,
                    gDesigner.getRightSidebars().enableContextSensitive(),
                    $(window).off("resize", this._resizeBound));
            }
            _resize() {
                this._panel && (this._panel.empty(), this._update());
            }
            _update() {
                (this._createStaticTooltips(), tooltipConfigs.forEach((config) => this._createDynamicTooltip(config)));
            }
            _createStaticTooltips() {
                $("<div/>")
                    .addClass("static-tooltips")
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append($("<img/>").attr("src", "assets/help/pinch-to-zoom.svg"))
                            .append(
                                this._createTooltip({
                                    disconnected: true,
                                    i18n: "text.pinch-to-zoom",
                                })
                            )
                    )
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append($("<img/>").attr("src", "assets/help/drag-with-2-fingers.svg"))
                            .append(
                                this._createTooltip({
                                    disconnected: true,
                                    i18n: "text.drag-with-2-fingers",
                                })
                            )
                    )
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append($("<img/>").attr("src", "assets/help/tap-and-holder.svg"))
                            .append(
                                this._createTooltip({
                                    disconnected: true,
                                    i18n: "text.tap-and-hold",
                                })
                            )
                    )
                    .appendTo(this._panel);
            }
            _createDynamicTooltip(config) {
                const target = $(config.selector),
                    targetOffset = target.offset();
                if (!targetOffset || !target.is(":visible")) return;
                const tooltip = this._createTooltip(config).appendTo(this._panel),
                    targetRect = new GObject.GRect(targetOffset.left, targetOffset.top, target.outerWidth(), target.outerHeight()),
                    tooltipRect = new GObject.GRect(0, 0, tooltip.outerWidth(), tooltip.outerHeight()),
                    position = this._calculatePosition(tooltipRect, targetRect, config);
                tooltip.css({ top: position.getY(), left: position.getX() });
            }
            _calculatePosition(tooltipRect, targetRect, config) {
                const side = config.side || GObject.GRect.Side.BOTTOM_CENTER,
                    anchorPoint = targetRect.getSide(side);
                switch (side) {
                    case GObject.GRect.Side.TOP_CENTER: {
                        const tooltipCenterX = tooltipRect.getSide(GObject.GRect.Side.CENTER).getX();
                        return new GObject.GPoint(anchorPoint.getX() - tooltipCenterX + (config.offsetX || 0), anchorPoint.getY() - tooltipRect.getHeight() + (config.offsetY || 0));
                    }
                    case GObject.GRect.Side.BOTTOM_CENTER: {
                        const tooltipCenterX = tooltipRect.getSide(GObject.GRect.Side.CENTER).getX();
                        return new GObject.GPoint(anchorPoint.getX() - tooltipCenterX + (config.offsetX || 0), anchorPoint.getY() + (config.offsetY || 0));
                    }
                    case GObject.GRect.Side.LEFT_CENTER: {
                        const tooltipCenterY = tooltipRect.getSide(GObject.GRect.Side.CENTER).getY();
                        return new GObject.GPoint(anchorPoint.getX() - tooltipRect.getWidth() + (config.offsetX || 0), anchorPoint.getY() - tooltipCenterY + (config.offsetY || 0));
                    }
                    case GObject.GRect.Side.RIGHT_CENTER: {
                        const tooltipCenterY = tooltipRect.getSide(GObject.GRect.Side.CENTER).getY();
                        return new GObject.GPoint(anchorPoint.getX() + (config.offsetX || 0), anchorPoint.getY() - tooltipCenterY + (config.offsetY || 0));
                    }
                    default:
                        throw "Unsupported side";
                }
            }
            _createTooltip(config) {
                const content = $("<div>")
                    .addClass("content")
                    .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GQuickHelpScreen", config.i18n))));
                return $("<div/>")
                    .addClass("tooltip" + (config.className ? " " + config.className : ""))
                    .addClass("side-" + (config.side || GObject.GRect.Side.BOTTOM_CENTER))
                    .toggleClass("further-away", !!config.furtherAway)
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append(
                                $("<div>")
                                    .addClass("connector")
                                    .css("display", config.disconnected ? "none" : "")
                            )
                            .append(content)
                    );
            }
        })();
    };
