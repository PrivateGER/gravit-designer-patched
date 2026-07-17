module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(34));
        var GObject = require(1),
            GPlatform = require(15),
            screenfull = _interopRequireDefault(require(1618 /* lib:screenfull */)),
            GContainer = _interopRequireDefault(require(85 /* GContainer */)),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            msTeams = _interopRequireDefault(require(443)),
            ChangeActivePageAction = _interopRequireDefault(require(1341));
        const { isExecutingOnMSTeamsSync } = msTeams.default;
        class GPlayAction extends GAction.default {
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
                return GPlayAction.ID;
            }
            getTitle() {
                return GPlayAction.TITLE;
            }
            getCategory() {
                return GCategory.default.CATEGORY_VIEW;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.ENTER];
            }
            isEnabled() {
                return !!gDesigner.getActiveDocument() && screenfull.default.enabled && !this._isErrorMessageDisplaying && !this._isLoading;
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
                        gContainer.getRuntime() === GContainer.default.Runtime.Electron)
                    ) {
                        const electronWindow = require(881).remote.getCurrentWindow();
                        (electronWindow.once("leave-full-screen", this._exitPlayMode.bind(this)),
                            electronWindow.isFullScreen()
                                ? (this._setShouldExitFullScreen(false), this._enterPlayMode())
                                : (this._setShouldExitFullScreen(true),
                                  electronWindow.once("enter-full-screen", () => {
                                      this._timeoutId = setTimeout(this._enterPlayMode.bind(this), 250);
                                  }),
                                  electronWindow.setFullScreen(true)));
                    } else
                        (this._setShouldExitFullScreen(true),
                            document.addEventListener(screenfull.default.raw.fullscreenchange, this._browserFullScreenModeChangeHandlerBind),
                            screenfull.default.request(this._overlay[0]));
            }
            changeActivePage(scene, direction) {
                const nextPage = gDesigner.getAction("".concat(ChangeActivePageAction.default.ID, ".").concat(direction)).getNextPage(scene);
                nextPage ? scene.setActivePage(nextPage) : direction === ChangeActivePageAction.default.Type.Next && screenfull.default.exit();
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
                const activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument && activeDocument.getScene();
                return scene ? scene.clone(null, scene.getWorkspace()) : null;
            }
            _keyDownHandler(event) {
                let handled = true;
                switch (GPlatform.GKey.translateCode(event.code)) {
                    case GPlatform.GKey.Constant.DOWN:
                    case GPlatform.GKey.Constant.PAGE_DOWN:
                    case GPlatform.GKey.Constant.RIGHT:
                    case GPlatform.GKey.Constant.SPACE:
                        this.changeActivePage(this._scene, ChangeActivePageAction.default.Type.Next);
                        break;
                    case GPlatform.GKey.Constant.UP:
                    case GPlatform.GKey.Constant.PAGE_UP:
                    case GPlatform.GKey.Constant.LEFT:
                        this.changeActivePage(this._scene, ChangeActivePageAction.default.Type.Previous);
                        break;
                    case GPlatform.GKey.Constant.ESC:
                        gContainer.getRuntime() === GContainer.default.Runtime.Electron && this._exitPlayMode();
                        break;
                    default:
                        handled = false;
                }
                handled && event.stopPropagation();
            }
            _fullScreenRequestDeniedHandler(event) {
                "Fullscreen request denied" === event.reason.message &&
                    (this._exitPlayMode(),
                    GSystemDialog.default.custom({
                        title: GObject.GLocale.getValue("GCommonNames", "text.something-wrong.try-again"),
                        openCallback: () => this._setIsErrorMessageDisplaying(true),
                        closeCallback: () => this._setIsErrorMessageDisplaying(false),
                    }));
            }
            _enterPlayMode() {
                (this._setIsInPlayMode(true), this._widget.resize(this._overlay.outerWidth(), this._overlay.outerHeight()));
                const paintBBox = this._scene.getActivePage().getPaintBBox();
                if (
                    (this._widget.zoomAll(paintBBox, false),
                    gContainer.getRuntime() === GContainer.default.Runtime.Browser || gContainer.getRuntime() === GContainer.default.Runtime.PWA)
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
                    .on("webkitAnimationEnd", (event) => {
                        $(event.target).closest(".g-exit-full-screen").remove();
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
                    document.removeEventListener(screenfull.default.raw.fullscreenchange, this._browserFullScreenModeChangeHandlerBind),
                    window.removeEventListener("unhandledrejection", this._fullScreenRequestDeniedHandlerBind),
                    this._setIsInPlayMode(false),
                    this._setIsLoading(false));
            }
            _browserFullScreenModeChangeHandler() {
                screenfull.default.isFullscreen ? this._enterPlayMode() : this._exitPlayMode();
            }
            _exitFullScreen() {
                if (gContainer.getRuntime() === GContainer.default.Runtime.Electron) {
                    require(881).remote.getCurrentWindow().setFullScreen(false);
                } else screenfull.default.exit();
            }
            _setIsInPlayMode(value) {
                this._isInPlayMode = value;
            }
            _setIsLoading(value) {
                this._isLoading = value;
            }
            _setShouldExitFullScreen(value) {
                this._shouldExitFullScreen = value;
            }
            _setIsErrorMessageDisplaying(value) {
                this._isErrorMessageDisplaying = value;
            }
            toString() {
                return "[Object GPlayAction]";
            }
        }
        ((GPlayAction.ID = "view.play"), (GPlayAction.TITLE = new GObject.GLocaleKey("GPlayAction", "title")), (module.exports = GPlayAction));
    };
