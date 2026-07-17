module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var GObject = require(1),
            GProperties = require(123);
        const GSettingChangedEvent = require(135);
        function GFrameProperties() {
            this._items = [];
        }
        (GObject.GObject.inherit(GFrameProperties, GProperties),
            (GFrameProperties.prototype._panel = null),
            (GFrameProperties.prototype._document = null),
            (GFrameProperties.prototype._items = null),
            (GFrameProperties.prototype.init = function (panel) {
                ((this._panel = panel),
                    this._panel.addClass("frame-property-panel"),
                    $("<div></div>")
                        .attr("major-item-only", true)
                        .addClass("item-frame")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .addClass("g-checkbox-label")
                                        .append(
                                            $("<input>")
                                                .addClass("frm-checkbox")
                                                .attr("type", "checkbox")
                                                .attr("data-item-property", "frm")
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        var checked = $(event.target).is(":checked");
                                                        (gDesigner.stats("frameproperties_toggle_frame", checked ? "enable" : "disable"),
                                                            this._assignProperty(
                                                                "frm",
                                                                checked,
                                                                checked
                                                                    ? GObject.GLocale.get(
                                                                          new GObject.GLocaleKey("GFrameProperties", "text.switch-frame")
                                                                      )
                                                                    : GObject.GLocale.get(new GObject.GLocaleKey("GFrameProperties", "text.frame-off"))
                                                            ));
                                                    }.bind(this)
                                                )
                                        )
                                        .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GFrameProperties", "text.frame")))),
                                },
                            ],
                        })
                        .appendTo(this._panel));
            }),
            (GFrameProperties.prototype.update = function (document, items) {
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
                    for (var n = 0; n < items.length; ++n) {
                        items[n] instanceof GObject.GLayer && this._items.push(items[n]);
                    }
                    if (this._items.length && this._items.length === items.length)
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
            (GFrameProperties.prototype._updateUI = function () {
                gDesigner.isTouchEnabled()
                    ? this._panel.find(".frm-checkbox").gCheckboxSlider()
                    : this._panel.find(".frm-checkbox").gCheckboxSlider("unmount");
            }),
            (GFrameProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateUI();
            }),
            (GFrameProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._items.length > 0 && this._items[0] === event.node && this._updateProperties();
            }),
            (GFrameProperties.prototype._updateProperties = function () {
                var item = this._items[0];
                (this._panel.find("[major-item-only]").css("display", ""),
                    this._panel.find('input[data-item-property="frm"]').prop("disabled", false).prop("checked", !!item.getProperty("frm")));
            }),
            (GFrameProperties.prototype._assignProperty = function (propertyName, value, transactionName) {
                if ("frm" == propertyName) {
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var i = 0; i < this._items.length; ++i) {
                            var a = this._items[i];
                            a.setFrame && a.setFrame(value);
                        }
                    } finally {
                        editor.commitTransaction(transactionName);
                    }
                }
            }),
            (GFrameProperties.prototype.toString = function () {
                return "[Object GFrameProperties]";
            }),
            (module.exports = GFrameProperties));
    };
