module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var GObject = require(1),
            GProperties = require(123);
        function GGroupFrameProperties() {
            this._items = [];
        }
        (GObject.GObject.inherit(GGroupFrameProperties, GProperties),
            (GGroupFrameProperties.prototype._panel = null),
            (GGroupFrameProperties.prototype._document = null),
            (GGroupFrameProperties.prototype._items = null),
            (GGroupFrameProperties.prototype.init = function (panel) {
                ((this._panel = panel),
                    this._panel.addClass("group-frame-property-panel"),
                    $("<div></div>")
                        .addClass("group-frame-row")
                        .attr("major-item-only", true)
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<select></select>")
                                        .attr("data-item-property", "frm")
                                        .on(
                                            "change",
                                            function (event) {
                                                var isFrame = "1" == $(event.target).val();
                                                (gDesigner.stats("groupframeproperties_toggle_frame", isFrame ? "enable" : "disable"),
                                                    this._assignProperty(
                                                        "frm",
                                                        isFrame,
                                                        isFrame
                                                            ? GObject.GLocale.get(new GObject.GLocaleKey("GGroupFrameProperties", "text.switch-frame"))
                                                            : GObject.GLocale.get(new GObject.GLocaleKey("GGroupFrameProperties", "text.switch-group"))
                                                    ));
                                            }.bind(this)
                                        )
                                        .append(
                                            $("<option></option>")
                                                .attr("value", "0")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GGroupFrameProperties", "text.group")))
                                        )
                                        .append(
                                            $("<option></option>")
                                                .attr("value", "1")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GGroupFrameProperties", "text.frame")))
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._panel));
            }),
            (GGroupFrameProperties.prototype.update = function (document, items) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._items = []),
                    document)
                ) {
                    for (var n = 0; n < items.length; ++n) {
                        items[n] instanceof GObject.GGroup && this._items.push(items[n]);
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
            (GGroupFrameProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._items.length > 0 && this._items[0] === event.node && this._updateProperties();
            }),
            (GGroupFrameProperties.prototype._updateProperties = function () {
                var item = this._items[0];
                (this._panel.find("[major-item-only]").css("display", ""),
                    this._panel
                        .find('[data-item-property="frm"]')
                        .prop("disabled", false)
                        .prop("value", item.getProperty("frm") ? "1" : "0"));
            }),
            (GGroupFrameProperties.prototype._assignProperty = function (propertyName, value, actionName) {
                if ("frm" == propertyName) {
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var i = 0; i < this._items.length; ++i) {
                            var a = this._items[i];
                            a.setFrame && a.setFrame(value);
                        }
                    } finally {
                        editor.commitTransaction(actionName);
                    }
                }
            }),
            (GGroupFrameProperties.prototype.toString = function () {
                return "[Object GGroupFrameProperties]";
            }),
            (module.exports = GGroupFrameProperties));
    };
