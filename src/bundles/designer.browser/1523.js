module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var GObject = require(1),
            GEditor = require(53),
            GRichTooltipConfig = require(67),
            GMenu = require(238),
            GPosition = require(444),
            GProperties = require(123),
            GExporter = require(1253),
            GLoginPanel = require(446),
            GSceneProperties = require(442);
        const GSettingChangedEvent = require(135);
        function GExportProperties() {}
        (GObject.GObject.inherit(GExportProperties, GProperties),
            (GExportProperties.prototype._panel = null),
            (GExportProperties.prototype._toolbar = null),
            (GExportProperties.prototype._exportButton = null),
            (GExportProperties.prototype._createSliceButton = null),
            (GExportProperties.prototype._document = null),
            (GExportProperties.prototype._elements = null),
            (GExportProperties.prototype._sizeMenu = null),
            (GExportProperties.prototype.isSticky = function () {
                return true;
            }),
            (GExportProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel),
                    (this._toolbar = toolbar),
                    toolbar.addClass("list-toolbar"),
                    $("<label></label>")
                        .addClass("panel-title")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.make-exportable")))
                        .appendTo(toolbar),
                    (this._exportButton = $("<button></button>")
                        .addClass("btn-export")
                        .attr("id", "btn-export")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.export")) + "...")
                        .append($("<span></span>").addClass("gravit-icon-export"))
                        .on("click", this._export.bind(this))
                        .appendTo(toolbar)),
                    (this._createSliceButton = $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.create-slice")))
                        .append($("<span></span>").addClass("gravit-icon-slice"))
                        .on("click", this._createSlice.bind(this))
                        .appendTo(toolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.create-slice-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.create-slice-tooltip-description")),
                                learnMore: "/docs/import-export/export/#slices",
                            })
                        )),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.add")))
                        .append($("<span></span>").addClass("gravit-icon-plus"))
                        .on("click", this._addExport.bind(this))
                        .appendTo(toolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.add-export-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.add-export-tooltip-description")),
                                learnMore:
                                    "/docs/import-export/export/#mass-exporting-assets-and-slices",
                            })
                        ),
                    (this._sizeMenu = new GMenu()),
                    this._sizeMenu.createAddItem("1x"),
                    this._sizeMenu.createAddItem("2x"),
                    this._sizeMenu.createAddItem("0.5x"),
                    this._sizeMenu.createAddItem("3x"),
                    this._sizeMenu.createAddItem("512w"),
                    this._sizeMenu.createAddItem("512h"),
                    this._sizeMenu.createAddItem("128x128"),
                    this._sizeMenu.createAddItem("300dpi"),
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this));
            }),
            (GExportProperties.prototype.update = function (document) {
                if (
                    (this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        (this._document = null)),
                    (this._elements = null),
                    document)
                ) {
                    this._document = document;
                    var elements = this._getElements();
                    this._elements = [];
                    for (var hasNonSliceElement = false, i = 0; i < elements.length; ++i)
                        (elements[i] instanceof GObject.GBlock && this._elements.push(elements[i]), elements[i] instanceof GObject.GSlice || (hasNonSliceElement = true));
                    if (this._elements && this._elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._createSliceButton.css("display", hasNonSliceElement ? "" : "none"),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (GExportProperties.prototype._getElements = function () {
                var editor = this._document.getEditor();
                if (
                    this._document &&
                    editor &&
                    ((this._elements = editor.getSelection()),
                    this._elements && this._elements.length && (this._elements = editor.filterIndividualElements(this._elements)),
                    !this._elements || 0 === this._elements.length)
                ) {
                    var activeTool = gDesigner.getToolManager().getActiveTool(),
                        defaultStyle = null;
                    activeTool instanceof GEditor.GItemTool && (defaultStyle = activeTool.getDefaultStyle())
                        ? (this._elements = [defaultStyle])
                        : (this._elements = [this._document.getScene().getActivePage()]);
                }
                return this._elements;
            }),
            (GExportProperties.prototype._export = function () {
                new GLoginPanel(
                    () => {
                        gDesigner.stats("exportproperties_click_export");
                        var exportables = GExporter.generateExportables(this._elements);
                        GExporter.export(
                            exportables,
                            this._document.getStorage() || gDesigner.getDefaultStorage(),
                            this._document.getTitle(),
                            null,
                            null,
                            true
                        );
                    },
                    () => {
                        gDesigner.stats("exportproperties_cancel_anonymous");
                    }
                );
            }),
            (GExportProperties.prototype._createSlice = function () {
                gDesigner.stats("exportproperties_click_createslice");
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var newSlices = [], n = 0; n < this._elements.length; ++n) {
                        var i = this._elements[n];
                        if (!(i instanceof GObject.GSlice)) {
                            var a = (i.getProperty(GSceneProperties.EXPORT_PROPERTY_NAME, true, []) || []).slice(),
                                r = i.getPaintBBox();
                            i.setProperty(GSceneProperties.EXPORT_PROPERTY_NAME, void 0, true);
                            var s = new GObject.GSlice();
                            (s.setProperties(["x", "y", "w", "h"], [r.getX(), r.getY(), r.getWidth(), r.getHeight()]),
                                s.setProperty(GSceneProperties.EXPORT_PROPERTY_NAME, a, true),
                                newSlices.push(s));
                        }
                    }
                    editor.insertElements(newSlices, true, true, false);
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.create-slices")));
                }
            }),
            (GExportProperties.prototype._addExport = function () {
                gDesigner.stats("exportproperties_click_add-item-to-export");
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var t = 0; t < this._elements.length; ++t) {
                        for (
                            var n = this._elements[t],
                                i = (n.getProperty(GSceneProperties.EXPORT_PROPERTY_NAME, true, []) || []).slice(),
                                a = { sz: "", sf: "", fm: "png" },
                                r = [
                                    { sz: "1x", sf: "@1x" },
                                    { sz: "2x", sf: "@2x" },
                                    { sz: "3x", sf: "@3x" },
                                    { sz: "1.5x", sf: "@1,5x" },
                                    { sz: "0.5x", sf: "@0,5x" },
                                ],
                                s = 0;
                            s < r.length;
                            ++s
                        ) {
                            for (var l = r[s], c = false, d = 0; d < i.length; ++d)
                                if (i[d].sz === l.sz) {
                                    c = true;
                                    break;
                                }
                            if (!c) {
                                ((a.sz = l.sz), (a.sf = i.length > 0 ? l.sf : ""));
                                break;
                            }
                        }
                        (i.push(a), n.setProperty(GSceneProperties.EXPORT_PROPERTY_NAME, i, true));
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.add")));
                }
            }),
            (GExportProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateProperties();
            }),
            (GExportProperties.prototype._updateExport = function (index, key, value) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var a = 0; a < this._elements.length; ++a) {
                        var r = this._elements[a],
                            s = r.getProperty(GSceneProperties.EXPORT_PROPERTY_NAME, true);
                        !s ||
                            index >= s.length ||
                            (((s = s.slice())[index] = $.extend({}, s[index])), (s[index][key] = value), r.setProperty(GSceneProperties.EXPORT_PROPERTY_NAME, s, true));
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.update-setting")));
                }
            }),
            (GExportProperties.prototype._removeExport = function (index) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var n = 0; n < this._elements.length; ++n) {
                        var i = this._elements[n],
                            a = i.getProperty(GSceneProperties.EXPORT_PROPERTY_NAME, true);
                        !a || index >= a.length || ((a = a.slice()).splice(index, 1), i.setProperty(GSceneProperties.EXPORT_PROPERTY_NAME, a, true));
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "action.remove")));
                }
            }),
            (GExportProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary &&
                    this._elements.length &&
                    this._elements[0] === event.node &&
                    event.properties.indexOf(GSceneProperties.EXPORT_PROPERTY_NAME) >= 0 &&
                    this._updateProperties();
            }),
            (GExportProperties.prototype._updateProperties = function () {
                var rows = [],
                    touchEnabled = gDesigner.isTouchEnabled(),
                    sizeColumnWidth = touchEnabled ? "40%" : "30%",
                    suffixColumnWidth = touchEnabled ? "25%" : "35%",
                    formatColumnWidth = touchEnabled ? "25%" : "30%",
                    removeColumnWidth = touchEnabled ? "12%" : "5%";
                if (this._elements)
                    for (let t = 0; t < this._elements.length; ++t) {
                        var l = this._elements[t].getProperty(GSceneProperties.EXPORT_PROPERTY_NAME, true, []) || [];
                        if (l) for (var c = 0; c < l.length; ++c) c < rows.length ? (rows[c].diff = true) : rows.push($.extend({}, l[c]));
                    }
                (this._panel.empty().css("margin", rows.length ? "" : "0"),
                    this._toolbar
                        .toggleClass("empty-list", 0 === rows.length)
                        .find("label:first-child")
                        .text(
                            0 === rows.length
                                ? GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.make-exportable"))
                                : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.export"))
                        ),
                    this._exportButton.css("display", rows.length ? "" : "none"));
                for (let l = 0; l < rows.length; ++l) {
                    var d = l + 1 === rows.length,
                        p = rows[l];
                    $("<div></div>")
                        .data("index", l)
                        .gPropertyRow({
                            clazz: "export-properties-row",
                            columns: [
                                {
                                    width: sizeColumnWidth,
                                    label: d ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")) : null,
                                    content: $("<div></div>")
                                        .append(
                                            $("<input/>")
                                                .attr("type", "text")
                                                .css("margin", "0")
                                                .css("width", "70%")
                                                .val(p.sz)
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        gDesigner.stats("exportproperties_change_size-dropdown");
                                                        var target = $(event.target);
                                                        this._updateExport(
                                                            $(event.target).closest(".g-property-row").data("index"),
                                                            "sz",
                                                            target.val()
                                                        );
                                                    }.bind(this)
                                                )
                                        )
                                        .append(
                                            $("<button></button>")
                                                .addClass("g-flat")
                                                .css("width", "30%")
                                                .append($('<span class="gravit-icon-down"></span>').css("font-size", "12px"))
                                                .on(
                                                    "click",
                                                    function (event) {
                                                        (gDesigner.stats("exportproperties_click_change-size"),
                                                            this._sizeMenu.open(
                                                                event.target,
                                                                GPosition.Position.Left_Top,
                                                                GPosition.Position.Right_Bottom,
                                                                function (selectedItem) {
                                                                    $(event.target)
                                                                        .closest("div")
                                                                        .find("input")
                                                                        .val(selectedItem.getCaption())
                                                                        .trigger("change")
                                                                        .focus()
                                                                        .select();
                                                                }
                                                            ));
                                                    }.bind(this)
                                                )
                                        ),
                                },
                                {
                                    width: suffixColumnWidth,
                                    label: d ? GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.suffix")) : null,
                                    content: $("<input/>")
                                        .attr("type", "text")
                                        .val(p.diff ? null : p.sf)
                                        .attr(
                                            "placeholder",
                                            p.diff
                                                ? GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.multiple"))
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.none"))
                                        )
                                        .on(
                                            "change",
                                            function (event) {
                                                gDesigner.stats("exportproperties_toggle_multiple");
                                                var target = $(event.target);
                                                this._updateExport($(event.target).closest(".g-property-row").data("index"), "sf", target.val());
                                            }.bind(this)
                                        ),
                                },
                                {
                                    width: formatColumnWidth,
                                    label: d ? GObject.GLocale.get(new GObject.GLocaleKey("GExportProperties", "text.format")) : null,
                                    content: $("<select></select>")
                                        .append($("<option></option>").attr("value", "png").text("PNG"))
                                        .append($("<option></option>").attr("value", "jpg").text("JPEG"))
                                        .append($("<option></option>").attr("value", "svg").text("SVG"))
                                        .append($("<option></option>").attr("value", "pdf").text("PDF"))
                                        .val(p.fm)
                                        .on(
                                            "change",
                                            function (event) {
                                                gDesigner.stats("exportproperties_format_dropdown");
                                                var target = $(event.target);
                                                this._updateExport($(event.target).closest(".g-property-row").data("index"), "fm", target.val());
                                            }.bind(this)
                                        ),
                                },
                                {
                                    width: removeColumnWidth,
                                    content: $("<button></button>")
                                        .addClass(touchEnabled ? "g-flat gravit-icon-close" : "g-flat")
                                        .html(touchEnabled ? "" : "&#x2715;")
                                        .on(
                                            "click",
                                            function (event) {
                                                (gDesigner.stats("exportproperties_click_removeitem"),
                                                    this._removeExport($(event.target).closest(".g-property-row").data("index")));
                                            }.bind(this)
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._panel);
                }
            }),
            (GExportProperties.prototype.toString = function () {
                return "[Object GExportProperties]";
            }),
            (module.exports = GExportProperties));
    };
