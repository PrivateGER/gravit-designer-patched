module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GObject = require(1),
            a = o(require(119 /* GCommonNames */)),
            r = o(require(860));
        function s(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : () => {};
            ((this._cb = e), (this._showFormCb = t), this._run());
        }
        (GObject.GObject.inherit(s, GObject.GObject),
            (s.prototype._close = function () {
                this._dialog && this._dialog.gDialog("close");
            }),
            (s.prototype._run = function () {
                if (gDesigner.isAnonymous())
                    return (
                        new r.default((e) => {
                            e && !e.anonymous && this._logged(e);
                        }).open({ anonymous: true, signup: true, animate: true }),
                        void this._showFormCb()
                    );
                this._cb && this._cb();
            }),
            (s.prototype._logged = function (e) {
                (this._close(), this._cb && this._cb(e));
            }),
            (s.prototype._build = function () {
                ((this._dialog = $("<div/>")),
                    gDesigner.getUser().then((e) => {
                        if (e) this._logged(e);
                        else {
                            this._dialog.closest(".loading").removeClass("loading");
                            var t = $("<div/>");
                            (t.addClass("container").appendTo(this._dialog),
                                $("<div/>").addClass("logo").appendTo(t),
                                $("<span/>")
                                    .addClass("title")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text.title")))
                                    .appendTo(t),
                                $("<span/>")
                                    .addClass("subtitle")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text.subtitle")))
                                    .appendTo(t));
                            var n = $("<div/>");
                            n.addClass("buttons").appendTo(t);
                            var o = (e, t) => {
                                var o = $("<div/>");
                                (o.on("click", t),
                                    o
                                        .addClass(e)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text." + e)))
                                        .appendTo(n));
                            };
                            (o("login", () => {
                                a.default.performLogin().then((e) => {
                                    this._logged(e);
                                });
                            }),
                                o("signup", () => {
                                    a.default.performSignup().then((e) => {
                                        this._logged(e);
                                    });
                                }));
                        }
                    }),
                    this._dialog.gDialog({
                        releaseOnClose: true,
                        className: "g-login-panel loading",
                    }),
                    this._dialog.gDialog("open", true));
            }),
            (module.exports = s));
    };
