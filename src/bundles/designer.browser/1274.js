module.exports = function (module, exports, require) {
        "use strict";
        (require(193), require(3), require(4), require(13));
        var o = require(53),
            GObject = require(1),
            GAlignAction = require(866),
            GDistributeAction = require(867),
            s = require(123),
            l = require(135);
        function c() {
            this._elements = [];
        }
        (GObject.GObject.inherit(c, s),
            (c.prototype._panel = null),
            (c.prototype._document = null),
            (c.prototype._elements = null),
            (c.prototype.isGroup = function (e) {
                return false;
            }),
            (c.prototype.init = function (e, t) {
                this._panel = e;
                var n = (e) => {
                    var t = GAlignAction.ID + "." + e,
                        n = gDesigner.getAction(t);
                    return $("<button></button>")
                        .attr("data-action", t)
                        .on("click", this._executeAction.bind(this))
                        .text(GObject.GLocale.get(n.getTitle()));
                };
                ($("<hr/>").appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    content: n(o.GEditor.ArrangeAlignType.AlignJustifyHorizontal),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    content: n(o.GEditor.ArrangeAlignType.AlignJustifyVertical),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GAlignProperties", "text.space-x")),
                                        width: "50px",
                                    },
                                    content: $("<input>")
                                        .on("keydown", this._spaceEvent.bind(this))
                                        .attr({ type: "text", "data-dist": GDistributeAction.Type.Horizontal })
                                        .val("1")
                                        .gInputBox({ minValue: 1 }),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GAlignProperties", "text.space-y")),
                                        width: "50px",
                                    },
                                    content: $("<input>")
                                        .on("keydown", this._spaceEvent.bind(this))
                                        .attr({ type: "text", "data-dist": GDistributeAction.Type.Vertical })
                                        .val("1")
                                        .gInputBox({ minValue: 1 }),
                                },
                            ],
                        })
                        .appendTo(this._panel));
            }),
            (c.prototype._executeAction = function (e) {
                var t = $(e.target).closest("[data-action]").attr("data-action");
                t && gDesigner.executeAction(t, void 0, "alignproperties");
            }),
            (c.prototype._spaceEvent = function (e) {
                if (13 === e.keyCode) {
                    var t = $(e.target).closest("input"),
                        n = t.attr("data-dist"),
                        o = this._document.getScene().stringToPoint(t.gInputBox("value"));
                    (!isNaN(o) && o > 0 && gDesigner.executeAction(GDistributeAction.ID + "." + n, [this._elements, null, o], "shortcut"),
                        this._updateDisplayValues());
                }
            }),
            (c.prototype.isAvailable = function (e) {
                return true === e;
            }),
            (c.prototype.update = function (e, t) {
                if (
                    (this._document && ((this._document = null), gDesigner.removeEventListener(l, this._settingChanged)),
                    (this._elements = []),
                    e)
                ) {
                    for (var n = 0; n < t.length; ++n)
                        !t[n].hasMixin(GObject.GElement.Transform) || t[n] instanceof GObject.GPage || this._elements.push(t[n]);
                    if (this._elements.length >= 2 && this._elements.length === t.length)
                        return ((this._document = e), gDesigner.addEventListener(l, this._settingChanged, this), true);
                }
                return false;
            }),
            (c.prototype._settingChanged = function (e) {
                "decimals_num" === e.key && this._updateDisplayValues();
            }),
            (c.prototype._updateDisplayValues = function () {
                this._panel.find("[data-dist]").each(
                    function (e, t) {
                        var n = $(t),
                            o = parseFloat(n.gInputBox("value"));
                        ((o = isNaN(o) || o <= 0 || !o ? 1 : o),
                            n.gInputBox("value", GObject.GUtil.formatNumber(o, this._document.getScene().getOptimalDecimalsCount())));
                    }.bind(this)
                );
            }),
            (c.prototype.toString = function () {
                return "[Object GAlignProperties]";
            }),
            (module.exports = c));
    };
