module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(865), require(193), require(3), require(4), require(13), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            GCategory = require(18),
            s = require(106),
            GSystemDialog = require(44);
        function c() {}
        (GObject.GObject.inherit(c, s),
            (c.ID = "modify.simplify"),
            (c.TITLE = new GObject.GLocaleKey("GSimplifyAction", "title")),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (c.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-simplity" : null;
            }),
            (c.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "S"];
            }),
            (c.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null,
                    t = false;
                if (e) for (var n = 0; !t && n < e.length; ++n) e[n] instanceof GObject.GImage || !e[n].hasMixin(GObject.GVertexSource) || (t = true);
                return t;
            }),
            (c.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getIndividualSelection() : null,
                    i = e ? e.getScene() : null,
                    r = [];
                if (n)
                    for (var s = 0; s < n.length; ++s) {
                        var c = n[s];
                        c.hasMixin(GObject.GVertexSource) && r.push(c);
                    }
                if (r.length) {
                    var d = $("<div></div>")
                        .append(
                            $("<div>")
                                .gInputSlider({ min: 0, max: 100, step: 1 })
                                .attr("name", "tolerance")
                                .css("width", "50%")
                                .gInputSlider("value", 10)
                                .on("change", function (e) {
                                    if (i) {
                                        var t = Number(i.stringToPoint($(this).gInputSlider("value")).toFixed(0));
                                        $(this).parent().find("input").val(t);
                                    }
                                })
                        )
                        .append(
                            $("<span>")
                                .css("width", "50%")
                                .append(
                                    $("<input>")
                                        .attr("type", "text")
                                        .css("width", "3em")
                                        .val(10)
                                        .on("change", function (e) {
                                            var t = Number(i.stringToPoint($(this).val()).toFixed(0));
                                            $(this).parent().find(".g-input-slider").gInputSlider("value", t);
                                        })
                                )
                                .append($("<label>").html(GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.tolerance"))))
                        );
                    GSystemDialog.prompt(
                        GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.simplification")),
                        (e) => {
                            if (e) {
                                var n = parseFloat(d.find(".g-input-slider").gInputSlider("value"));
                                if (isNaN(n) || !isFinite(n) || GObject.GMath.isEqualEps(n, 0))
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSimplifyAction", "text.invalid-value")));
                                else {
                                    t.beginTransaction();
                                    try {
                                        for (var i = [], s = new Set(), c = 0; c < r.length; ++c) {
                                            var u = r[c].getParent();
                                            u && s.add(u);
                                        }
                                        try {
                                            (0, GSaveAction.blockChanges)(t, s);
                                            for (c = 0; c < r.length; ++c) {
                                                var p = r[c],
                                                    g = p.getParent(),
                                                    h = p.getNext(),
                                                    f = this._makeSimplified(n, p),
                                                    m = GObject.GPathUtil.createPathFromVertexSource(f);
                                                (m && (GObject.GElement.prototype.assignFrom.call(m, p), g.insertChild(m, h), i.push(m)),
                                                    g.removeChild(p));
                                            }
                                        } finally {
                                            ((0, GSaveAction.releaseChanges)(t, s), i.length && t.updateSelection(false, i));
                                        }
                                    } finally {
                                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                                    }
                                }
                            }
                        },
                        d
                    );
                }
            }),
            (c.prototype._makeSimplified = function (e, t) {
                var n = e > 0 ? e : -e;
                return new GObject.GVertexSimplifier(t).simplify(n / 2, false, true);
            }),
            (c.prototype.toString = function () {
                return "[Object GSimplifyAction]";
            }),
            (module.exports = c));
    };
