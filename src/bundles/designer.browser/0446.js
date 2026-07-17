module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GCloudUtil = _interopRequireDefault(require(119 /* GCommonNames */)),
            GEmbeddedLoginDialog = _interopRequireDefault(require(860 /* GEmbeddedLogin */));
        function GLoginPanel(callback) {
            let showFormCallback = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : () => {};
            ((this._cb = callback), (this._showFormCb = showFormCallback), this._run());
        }
        (GObject.GObject.inherit(GLoginPanel, GObject.GObject),
            (GLoginPanel.prototype._close = function () {
                this._dialog && this._dialog.gDialog("close");
            }),
            (GLoginPanel.prototype._run = function () {
                if (gDesigner.isAnonymous())
                    return (
                        new GEmbeddedLoginDialog.default((user) => {
                            user && !user.anonymous && this._logged(user);
                        }).open({ anonymous: true, signup: true, animate: true }),
                        void this._showFormCb()
                    );
                this._cb && this._cb();
            }),
            (GLoginPanel.prototype._logged = function (user) {
                (this._close(), this._cb && this._cb(user));
            }),
            (GLoginPanel.prototype._build = function () {
                ((this._dialog = $("<div/>")),
                    gDesigner.getUser().then((user) => {
                        if (user) this._logged(user);
                        else {
                            this._dialog.closest(".loading").removeClass("loading");
                            var container = $("<div/>");
                            (container.addClass("container").appendTo(this._dialog),
                                $("<div/>").addClass("logo").appendTo(container),
                                $("<span/>")
                                    .addClass("title")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text.title")))
                                    .appendTo(container),
                                $("<span/>")
                                    .addClass("subtitle")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text.subtitle")))
                                    .appendTo(container));
                            var buttonsContainer = $("<div/>");
                            buttonsContainer.addClass("buttons").appendTo(container);
                            var createButton = (action, onClick) => {
                                var button = $("<div/>");
                                (button.on("click", onClick),
                                    button
                                        .addClass(action)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginPanel", "text." + action)))
                                        .appendTo(buttonsContainer));
                            };
                            (createButton("login", () => {
                                GCloudUtil.default.performLogin().then((user) => {
                                    this._logged(user);
                                });
                            }),
                                createButton("signup", () => {
                                    GCloudUtil.default.performSignup().then((user) => {
                                        this._logged(user);
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
            (module.exports = GLoginPanel));
    };
