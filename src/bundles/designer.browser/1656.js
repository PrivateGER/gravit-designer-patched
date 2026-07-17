module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var GObject = require(1),
            GProperties = require(123);
        const GSettingChangedEvent = require(135);
        function GItemProperties() {
            this._items = [];
        }
        (GObject.GObject.inherit(GItemProperties, GProperties),
            (GItemProperties.prototype._panel = null),
            (GItemProperties.prototype._document = null),
            (GItemProperties.prototype._items = null),
            (GItemProperties.prototype.init = function (panel) {
                ((this._panel = panel),
                    this._panel.addClass("item-property-panel"),
                    $("<div></div>")
                        .attr("major-item-only", true)
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .addClass("g-checkbox-label")
                                        .append(
                                            $("<input>")
                                                .addClass("clk-checkbox")
                                                .attr("type", "checkbox")
                                                .attr("data-item-property", "clk")
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        (gDesigner.stats("itemproperties_click_through"),
                                                            this._assignProperty("clk", $(event.target).is(":checked")));
                                                    }.bind(this)
                                                )
                                        )
                                        .append(
                                            $("<span></span>")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GItemProperties", "text.click-through")))
                                                .addClass("clickElement")
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<div></div>")
                        .attr("major-shape-only", true)
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .addClass("g-checkbox-label")
                                        .append(
                                            $("<input>")
                                                .addClass("scc-checkbox")
                                                .attr("type", "checkbox")
                                                .attr("data-item-property", "scc")
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        (gDesigner.stats(
                                                            "itemproperties_toggle_scale-with-content",
                                                            $(event.target).is(":checked") ? "enable" : "disable"
                                                        ),
                                                            this._assignProperty("scc", $(event.target).is(":checked")));
                                                    }.bind(this)
                                                )
                                        )
                                        .append(
                                            $("<span></span>").text(
                                                GObject.GLocale.get(new GObject.GLocaleKey("GItemProperties", "text.scale-with-content"))
                                            )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._panel));
            }),
            (GItemProperties.prototype.update = function (document, items) {
                if (
                    (this._updateUI(),
                    this._document &&
                        (gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged, this),
                        this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._items = []),
                    document)
                ) {
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this);
                    for (var n = 0; n < items.length; ++n) items[n] instanceof GObject.GItem && this._items.push(items[n]);
                    if (this._items.length && this._items.length === items.length && this._hasChildItem(this._items[0]))
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (GItemProperties.prototype._updateUI = function () {
                gDesigner.isTouchEnabled()
                    ? (this._panel.find(".clk-checkbox").gCheckboxSlider(), this._panel.find(".scc-checkbox").gCheckboxSlider())
                    : (this._panel.find(".clk-checkbox").gCheckboxSlider("unmount"),
                      this._panel.find(".scc-checkbox").gCheckboxSlider("unmount"));
            }),
            (GItemProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateUI();
            }),
            (GItemProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._items.length > 0 && this._items[0] === event.node && this._updateProperties();
            }),
            (GItemProperties.prototype._updateProperties = function () {
                var firstItem = this._items[0];
                this._hasChildItem(firstItem)
                    ? (this._panel.find("[major-item-only]").css("display", ""),
                      this._panel.find('input[data-item-property="clk"]').prop("disabled", false).prop("checked", firstItem.getProperty("clk")),
                      firstItem instanceof GObject.GShape && !(firstItem instanceof GObject.GImage && firstItem.getProperty("dblMode"))
                          ? (this._panel.find("[major-shape-only]").css("display", ""),
                            this._panel.find("[major-item-only]").addClass("item-click-through"),
                            this._panel.find("[major-shape-only]").addClass("shape-scale-with-content"),
                            this._panel.find('input[data-item-property="scc"]').prop("checked", firstItem.getProperty("scc")))
                          : (this._panel.find("[major-shape-only]").css("display", "none"),
                            this._panel.find("[major-item-only]").removeClass("item-click-through"),
                            this._panel.find("[major-shape-only]").removeClass("shape-scale-with-content")))
                    : (this._panel.find("[major-item-only]").css("display", "none"),
                      this._panel.find("[major-shape-only]").css("display", "none"),
                      this._panel.find("[major-item-only]").removeClass("item-click-through"),
                      this._panel.find("[major-shape-only]").removeClass("shape-scale-with-content"));
            }),
            (GItemProperties.prototype._assignProperty = function (propertyName, propertyValue, transactionName) {
                if ("clk" == propertyName || "scc" == propertyName) {
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var a = 0; a < this._items.length; ++a) {
                            var r = this._items[a];
                            this._hasChildItem(r) && ("clk" == propertyName || r instanceof GObject.GShape) && this._items[a].setProperties([propertyName], [propertyValue]);
                        }
                    } finally {
                        editor.commitTransaction(transactionName);
                    }
                }
            }),
            (GItemProperties.prototype._hasChildItem = function (item) {
                return (
                    !!item.hasMixin(GObject.GNode.Container) &&
                    !item.acceptChildren(
                        function (child) {
                            return !(child instanceof GObject.GItem);
                        },
                        false,
                        false
                    )
                );
            }),
            (GItemProperties.prototype.toString = function () {
                return "[Object GItemProperties]";
            }),
            (module.exports = GItemProperties));
    };
