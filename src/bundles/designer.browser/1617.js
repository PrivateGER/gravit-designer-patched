module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(1618)),
            s = _interopRequireDefault(require(85)),
            l = _interopRequireDefault(require(31)),
            c = _interopRequireDefault(require(18 /* GCategory */)),
            d = _interopRequireDefault(require(44 /* GSystemDialog */)),
            u = _interopRequireDefault(require(443 /* _interopRequireWildcard */)),
            p = _interopRequireDefault(require(1341));
        const { isExecutingOnMSTeamsSync } = u.default;
        class h extends l.default {
            constructor() {
                (super(),
                    (this._scene = null),
                    (this._isInPlayMode = null),
                    (this._shouldExitFullScreen = null),
                    (this._isErrorMessageDisplaying = false),
                    (this._timeoutId = null),
                    (this._isLoading = false),
                    (this._keyDownHandlerBind = this._keyDownHandler.bind(this)),
                    (this._fullScreenRequestDeniedHandlerBind = this._fullScreenRequestDeniedHandler.bind(this)),
                    (this._browserFullScreenModeChangeHandlerBind = this._browserFullScreenModeChangeHandler.bind(this)));
            }
            getId() {
                return h.ID;
            }
            getTitle() {
                return h.TITLE;
            }
            getCategory() {
                return c.default.CATEGORY_VIEW;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.ENTER];
            }
            isEnabled() {
                return !!gDesigner.getActiveDocument() && r.default.enabled && !this._isErrorMessageDisplaying && !this._isLoading;
            }
            isVisible() {
                return !isExecutingOnMSTeamsSync();
            }
            execute() {
                if (this._isInPlayMode) return this._exitPlayMode();
                if (((this._scene = this._getScene()), this._scene))
                    if (
                        (this._setIsLoading(true),
                        (this._widget = new GPlatform.GSceneWidget(this._scene)),
                        (this._widget.getViewConfiguration().paintMode = GObject.GScenePaintConfiguration.PaintMode.Output),
                        (this._overlay = $("<div></div>").css({
                            position: "absolute",
                            zIndex: 9999,
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            background: "black",
                        })),
                        this._overlay.append(this._widget._htmlElement).appendTo($("body")),
                        document.addEventListener("keydown", this._keyDownHandlerBind, true),
                        window.addEventListener("unhandledrejection", this._fullScreenRequestDeniedHandlerBind),
                        gContainer.getRuntime() === s.default.Runtime.Electron)
                    ) {
                        const e = require(881).remote.getCurrentWindow();
                        (e.once("leave-full-screen", this._exitPlayMode.bind(this)),
                            e.isFullScreen()
                                ? (this._setShouldExitFullScreen(false), this._enterPlayMode())
                                : (this._setShouldExitFullScreen(true),
                                  e.once("enter-full-screen", () => {
                                      this._timeoutId = setTimeout(this._enterPlayMode.bind(this), 250);
                                  }),
                                  e.setFullScreen(true)));
                    } else
                        (this._setShouldExitFullScreen(true),
                            document.addEventListener(r.default.raw.fullscreenchange, this._browserFullScreenModeChangeHandlerBind),
                            r.default.request(this._overlay[0]));
            }
            changeActivePage(e, t) {
                const n = gDesigner.getAction("".concat(p.default.ID, ".").concat(t)).getNextPage(e);
                n ? e.setActivePage(n) : t === p.default.Type.Next && r.default.exit();
            }
            _getScene() {
                gDesigner.toggleLoading(true);
                try {
                    return this._cloneActiveScene();
                } catch (e) {
                    return null;
                } finally {
                    gDesigner.toggleLoading(false);
                }
            }
            _cloneActiveScene() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getScene();
                return t ? t.clone(null, t.getWorkspace()) : null;
            }
            _keyDownHandler(e) {
                let t = true;
                switch (GPlatform.GKey.translateCode(e.code)) {
                    case GPlatform.GKey.Constant.DOWN:
                    case GPlatform.GKey.Constant.PAGE_DOWN:
                    case GPlatform.GKey.Constant.RIGHT:
                    case GPlatform.GKey.Constant.SPACE:
                        this.changeActivePage(this._scene, p.default.Type.Next);
                        break;
                    case GPlatform.GKey.Constant.UP:
                    case GPlatform.GKey.Constant.PAGE_UP:
                    case GPlatform.GKey.Constant.LEFT:
                        this.changeActivePage(this._scene, p.default.Type.Previous);
                        break;
                    case GPlatform.GKey.Constant.ESC:
                        gContainer.getRuntime() === s.default.Runtime.Electron && this._exitPlayMode();
                        break;
                    default:
                        t = false;
                }
                t && e.stopPropagation();
            }
            _fullScreenRequestDeniedHandler(e) {
                "Fullscreen request denied" === e.reason.message &&
                    (this._exitPlayMode(),
                    d.default.custom({
                        title: GObject.GLocale.getValue("GCommonNames", "text.something-wrong.try-again"),
                        openCallback: () => this._setIsErrorMessageDisplaying(true),
                        closeCallback: () => this._setIsErrorMessageDisplaying(false),
                    }));
            }
            _enterPlayMode() {
                (this._setIsInPlayMode(true), this._widget.resize(this._overlay.outerWidth(), this._overlay.outerHeight()));
                const e = this._scene.getActivePage().getPaintBBox();
                if (
                    (this._widget.zoomAll(e, false),
                    gContainer.getRuntime() === s.default.Runtime.Browser || gContainer.getRuntime() === s.default.Runtime.PWA)
                ) {
                    /^((?!chrome|android)(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))*[s\u017F]afari/i.test(
                        navigator.userAgent
                    ) && this._createExitFullScreenHint().appendTo(this._overlay);
                }
                this._setIsLoading(false);
            }
            _createExitFullScreenHint() {
                return $("<div/>")
                    .addClass("g-exit-full-screen")
                    .on("webkitAnimationEnd", (e) => {
                        $(e.target).closest(".g-exit-full-screen").remove();
                    })
                    .append(
                        $("<div/>").html(
                            GObject.GLocale.getValue("GPlayAction", "text.exit-full-screen").replace("%key", () =>
                                $("<span/>").addClass("highlight").text(GObject.GLocale.getValue("GPlayAction", "text.esc")).prop("outerHTML")
                            )
                        )
                    );
            }
            _exitPlayMode() {
                (this._timeoutId && clearTimeout(this._timeoutId),
                    this._shouldExitFullScreen && this._exitFullScreen(),
                    this._overlay.remove(),
                    this._widget.release(),
                    document.removeEventListener("keydown", this._keyDownHandlerBind, true),
                    document.removeEventListener(r.default.raw.fullscreenchange, this._browserFullScreenModeChangeHandlerBind),
                    window.removeEventListener("unhandledrejection", this._fullScreenRequestDeniedHandlerBind),
                    this._setIsInPlayMode(false),
                    this._setIsLoading(false));
            }
            _browserFullScreenModeChangeHandler() {
                r.default.isFullscreen ? this._enterPlayMode() : this._exitPlayMode();
            }
            _exitFullScreen() {
                if (gContainer.getRuntime() === s.default.Runtime.Electron) {
                    require(881).remote.getCurrentWindow().setFullScreen(false);
                } else r.default.exit();
            }
            _setIsInPlayMode(e) {
                this._isInPlayMode = e;
            }
            _setIsLoading(e) {
                this._isLoading = e;
            }
            _setShouldExitFullScreen(e) {
                this._shouldExitFullScreen = e;
            }
            _setIsErrorMessageDisplaying(e) {
                this._isErrorMessageDisplaying = e;
            }
            toString() {
                return "[Object GPlayAction]";
            }
        }
        ((h.ID = "view.play"), (h.TITLE = new GObject.GLocaleKey("GPlayAction", "title")), (module.exports = h));
    };
