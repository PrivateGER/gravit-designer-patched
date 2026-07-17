module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(271 /* polyfill:String */), require(34), require(4), require(13));
        var GEditorWidgetModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            designerConfig = require(10),
            DocumentStatus = require(86),
            GDocumentStatusEvent = require(217),
            GDocumentEvent = require(78),
            GSaveAsAction = (require(173), require(445 /* GSaveAsAction */)),
            FontsProviderManager = require(255),
            GSceneProperties = (require(163 /* GDocument */), require(442));
        const defaultFileExtension = designerConfig.FILE_FORMATS.find((format) => format.default).ext;
        function GWindow(document, isPreview) {
            ((this._container = $("<div></div>").addClass("window")),
                (this._overlay = $("<div></div>")
                    .addClass("window-overlay")
                    .append(
                        $("<div></div>").addClass("window-overlay-container").append($("<div></div>").addClass("window-overlay-content"))
                    )),
                (this._document = document),
                this._document.addEventListener(GDocumentStatusEvent, this._documentStatusChanged, this, void 0, void 0, true),
                gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                this._container.on(
                    "mousedown",
                    function (e) {
                        this._view && this._view.focus();
                    }.bind(this)
                ),
                isPreview && (this._isPreview = isPreview),
                this._updateScene());
        }
        (GObject.GObject.inherit(GWindow, GObject.GEventTarget),
            (GWindow.VIEW_MARGIN = 10),
            (GWindow.prototype._requiresViewTransformation = true),
            (GWindow.prototype._container = null),
            (GWindow.prototype._document = null),
            (GWindow.prototype._view = null),
            (GWindow.prototype._overlay = null),
            (GWindow.prototype._contextMenuClientPosition = null),
            (GWindow.prototype._isPreview = false),
            (GWindow.prototype.isPreview = function () {
                return this._isPreview;
            }),
            (GWindow.prototype.getDocument = function () {
                return this._document;
            }),
            (GWindow.prototype.getView = function () {
                return this._view;
            }),
            (GWindow.prototype.getTitle = function () {
                var title = this._document.getTitle(),
                    windowIndex = this._document._windows.indexOf(this);
                return (windowIndex > 0 && (title += ":" + windowIndex.toString()), title);
            }),
            (GWindow.prototype.getTitleWithExtension = function () {
                var title = this.getTitle();
                if (this._document.getStorageItem() && designerConfig.USE_EXTENSION_IN_FILENAME) {
                    const extension = "." + this._document.getStorageItem().getExtension().toLowerCase();
                    if (!title.endsWith(extension)) return title + extension;
                }
                return title;
            }),
            (GWindow.prototype.activate = function (force) {
                this._view &&
                    (this._requiresViewTransformation &&
                        ((1 === this._view.getZoom() && 0 === this._view.getScrollX() && 0 === this._view.getScrollY()) || force) &&
                        this.centerAndZoom(),
                    (this._requiresViewTransformation = false),
                    this._view.setRulers(gDesigner.getSetting("rulers_visible")),
                    $("#mainframe").toggleClass("rulers", gDesigner.getWindows().getActiveWindow().getView().hasRulers()),
                    (this._view.getViewConfiguration().guideLinesVisible = gDesigner.getSetting("guide_lines_visible")),
                    (this._view.getViewConfiguration().symbolLabelsVisible = gDesigner.getSetting("symbol_labels_visible")),
                    (this._view.getViewConfiguration().gridVisible = true),
                    this._view.focus());
            }),
            (GWindow.prototype.deactivate = function () {
                if (this._document) {
                    var editor = this._document.getEditor();
                    (editor && editor.closeInlineEditor(), this._view.cleanCache());
                }
            }),
            (GWindow.prototype.relayout = function (width, height, viewOffset, force) {
                if (this._view) {
                    (this._container.width(width), this._container.height(height), this._view.setViewOffset(viewOffset));
                    var previousWidth = this._view.getWidth(),
                        previousHeight = this._view.getHeight();
                    this._view.resize(width, height, force, () => {
                        previousWidth && previousHeight && (previousWidth != width || previousHeight != height) && this._view.scrollBy((previousWidth - width) / 2, (previousHeight - height) / 2);
                    });
                }
                this._overlay.css({
                    left: (viewOffset ? viewOffset[0] : 0) + "px",
                    top: (viewOffset ? viewOffset[1] : 0) + "px",
                    right: (viewOffset ? viewOffset[2] : 0) + "px",
                    bottom: (viewOffset ? viewOffset[3] : 0) + "px",
                });
            }),
            (GWindow.prototype.release = function () {
                (this._releaseScene(),
                    this._releaseView(),
                    this._document.removeEventListener(GDocumentStatusEvent, this._documentStatusChanged, this),
                    gDesigner.removeEventListener(GDocumentEvent, this._documentEvent, this),
                    FontsProviderManager.getInstance().releaseDocumentListener(this._document.sessionId));
            }),
            (GWindow.prototype.centerAndZoom = function () {
                var scene = this._document.getScene(),
                    activePage = scene.getActivePage(),
                    bbox = scene.getPaintBBox();
                if (activePage)
                    if (this._view.getViewConfiguration().multiPageView) {
                        var pagePosition = activePage.getPosition(1),
                            pagePaintBBox = activePage.getPaintBBox(1);
                        pagePaintBBox && (bbox = pagePaintBBox.translated(pagePosition.getX(), pagePosition.getY()));
                    } else if (GSceneProperties.CDR_ORIGIN_PROPERTY_NAME && activePage.getProperty(GSceneProperties.CDR_ORIGIN_PROPERTY_NAME, true)) {
                        var contentBBox = activePage.getContentBBox();
                        bbox = contentBBox && !contentBBox.isEmpty() ? contentBBox : activePage.getPaintBBox();
                    } else bbox = activePage.getPaintBBox();
                else scene.isFixedSized() && (bbox = new GObject.GRect(0, 0, scene.getProperty("w"), scene.getProperty("h")));
                var viewBox = this._view.getViewBox(true);
                !bbox || bbox.isEmpty() || viewBox.isEmpty()
                    ? this._view.zoomAt(new GObject.GPoint(0, 0), 1)
                    : bbox.getWidth() >= viewBox.getWidth() || bbox.getHeight() >= viewBox.getHeight()
                      ? this._view.zoomAll(bbox, false)
                      : this._view.zoomAtCenter(bbox.getSide(GObject.GRect.Side.CENTER), 1);
            }),
            (GWindow.prototype.viewContainsMouse = function (mouseX, mouseY) {
                if (!this._view) return false;
                var viewOffset = this._view.getViewOffset(),
                    offsetLeft = viewOffset[0],
                    offsetTop = viewOffset[1],
                    maxX = this._view.getWidth() - viewOffset[2],
                    maxY = this._view.getHeight() - viewOffset[3];
                return !(mouseX < offsetLeft || mouseX > maxX || mouseY < offsetTop || mouseY > maxY);
            }),
            (GWindow.prototype._releaseView = function () {
                this._view && (this._view.release(), (this._view = null));
            }),
            (GWindow.prototype._releaseScene = function () {
                this._view &&
                    this._view.getScene() &&
                    (this._view.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._sceneAfterPropertiesChanged, this),
                    this._view.getScene().removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this));
            }),
            (GWindow.prototype.activateProgress = function (message, allowDismiss) {
                return this._setOverlayContent(
                    $("<div></div>")
                        .append(
                            $("<span></span>")
                                .append($("<p></p>").addClass("text").text(message))
                                .append($("<progress>").attr({ min: "0", max: "100" }).css("width", "200px").val(0))
                                .append($("<p></p>").css("display", "none").addClass("progress-info"))
                        )
                        .append($("<div></div>").append($("<button></button>").addClass("cancel-loading").css("display", "none"))),
                    allowDismiss
                );
            }),
            (GWindow.prototype.deactivateProgress = function () {
                this._setOverlayContent(null);
            }),
            (GWindow.prototype.activateCancelLoading = function (cancelHandler) {
                var self = this;
                this._overlay
                    .find(".cancel-loading")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cancel-loading")))
                    .on("click", function () {
                        (cancelHandler(), self.deactivateProgress());
                    })
                    .css("display", "");
            }),
            (GWindow.prototype._setOverlayContent = function (content, dismissOnClick) {
                if (content) {
                    if ((this._overlay.appendTo(this._container).find(".window-overlay-content").empty().append(content), dismissOnClick)) {
                        var self = this;
                        this._overlay.on("click", function () {
                            (self._overlay.unbind("click", this), self._setOverlayContent(null));
                        });
                    }
                } else this._overlay.remove();
                return this._overlay;
            }),
            (GWindow.prototype._documentEvent = function (event) {
                event.type === GDocumentEvent.Type.StorageItemUpdated && this._updateViewConfiguration();
            }),
            (GWindow.prototype._documentStatusChanged = function (event) {
                switch (event.status) {
                    case DocumentStatus.Ready:
                        (this._updateScene(), gDesigner.saveStats());
                        break;
                    case DocumentStatus.Loading:
                    case DocumentStatus.Saving:
                    case DocumentStatus.Syncing:
                    case DocumentStatus.Downloading:
                        var statusText = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading")),
                            fileStatusMessage = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-file"));
                        event.status === DocumentStatus.Saving
                            ? ((statusText = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.saving"))),
                              (fileStatusMessage = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.saving-file"))))
                            : event.status === DocumentStatus.Syncing
                              ? ((statusText = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing"))),
                                (fileStatusMessage = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing-file"))))
                              : event.status === DocumentStatus.Downloading &&
                                ((statusText = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.downloading"))),
                                (fileStatusMessage = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.downloading-file"))));
                        let fileName = event.data && event.data.filename ? event.data.filename : this._document.getTitle();
                        fileName && (fileStatusMessage = fileStatusMessage.replace("%name", fileName));
                        let progressMessage = fileName ? fileStatusMessage + "..." : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.opening-your-image"));
                        (this.activateProgress(progressMessage, event.data && event.data.cancelHandlerHolder ? event.data.cancelHandlerHolder : null),
                            (event.data.text = (text, forceCustom) => this._overlay.find(".text").text(fileName && !forceCustom ? fileStatusMessage : text)),
                            (event.data.progressInfo = (infoText) =>
                                this._overlay
                                    .find(".progress-info")
                                    .text(infoText)
                                    .css("display", infoText ? "" : "none")));
                        var lastProgressValue = 0,
                            lastUpdateTime = new Date().getTime(),
                            previousProgressCallback = event.data.progress;
                        event.data.progress = function (progressValue) {
                            var progressElement,
                                previousDisplay,
                                currentTime = new Date().getTime();
                            if (100 === progressValue || (progressValue - lastProgressValue >= 0.5 && currentTime - lastUpdateTime >= 40)) {
                                lastUpdateTime = currentTime;
                                var progressBar = this._overlay.find("progress");
                                (progressBar.val(progressValue), (lastProgressValue = progressValue));
                                ((progressElement = progressBar[0]),
                                    (previousDisplay = progressElement.style.display),
                                    (progressElement.style.display = "none"),
                                    progressElement.offsetHeight,
                                    (progressElement.style.display = previousDisplay),
                                    progressElement.offsetHeight,
                                    progressBar.hide(0, function () {
                                        ($(this).show(), $(this)[0].offsetHeight);
                                    }),
                                    previousProgressCallback && (0, Utils.isFunction)(previousProgressCallback) && previousProgressCallback(progressValue));
                            }
                        }.bind(this);
                        break;
                    case DocumentStatus.LoadCancelled:
                    case DocumentStatus.DownloadCancelled:
                    case DocumentStatus.SaveCancelled:
                        this._setOverlayContent(null);
                        break;
                    case DocumentStatus.Saved:
                        (this._document.setErrored(false), gDesigner.intercomStats("File saved/exported"), this._setOverlayContent(null));
                        break;
                    case DocumentStatus.Loaded:
                        (this.centerAndZoom(), gDesigner.intercomStats("File opened"));
                        break;
                    case DocumentStatus.SyncFailed:
                    case DocumentStatus.Downloaded:
                    case DocumentStatus.DownloadFailed:
                        this._setOverlayContent(null);
                        break;
                    case DocumentStatus.LoadFailed:
                        statusText = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"));
                        (!event.data || !event.data.text || event.data.text instanceof Function || (statusText = event.data.text),
                            this._setOverlayContent($("<span></span>").text(statusText)));
                        break;
                    case DocumentStatus.SaveFailed:
                        if ((this._document.setErrored(true), this._document.isCollaborativeTextEditing())) return;
                        this._setOverlayContent(
                            $("<span></span>")
                                .css({
                                    padding: "6px",
                                    display: "inline-block",
                                    backgroundColor: "#333",
                                    borderRadius: "6px",
                                })
                                .append(
                                    $("<p></p>")
                                        .text(
                                            "string" == typeof event.data
                                                ? event.data
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unable-to-save"))
                                        )
                                        .css({ lineHeight: "1.5em", margin: "10px" })
                                )
                                .append(
                                    $("<button></button>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                                        .on(
                                            "click",
                                            function () {
                                                (this._document.updateStatus(DocumentStatus.SaveCancelled), this._setOverlayContent(null));
                                            }.bind(this)
                                        )
                                        .css({ margin: "10px" })
                                )
                                .append(
                                    $("<button></button>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.try-again")))
                                        .on(
                                            "click",
                                            function () {
                                                this._document &&
                                                    gDesigner.executeAction(
                                                        GSaveAsAction.ID + "." + defaultFileExtension,
                                                        [null, this._document, null],
                                                        "failedalertdialog"
                                                    );
                                            }.bind(this)
                                        )
                                        .css({ margin: "10px" })
                                )
                        );
                }
            }),
            (GWindow.prototype._updateScene = function () {
                if (!this._view || this._document.getScene() !== this._view.getScene()) {
                    (this._releaseScene(), this._releaseView());
                    const status = this._document.getStatus();
                    !this._document.getScene() ||
                        (status !== DocumentStatus.Ready && status !== DocumentStatus.Locked) ||
                        ((this._view = new GEditorWidgetModule.GEditorWidget(this._document.getEditor())),
                        this._updateViewConfiguration(),
                        this._view.setViewMargin([GWindow.VIEW_MARGIN, GWindow.VIEW_MARGIN, GWindow.VIEW_MARGIN, GWindow.VIEW_MARGIN]),
                        this._container.empty().append(this._view._htmlElement),
                        this._updateWindowBackground(),
                        this._view
                            .getScene()
                            .addEventListener(
                                GObject.GNode.AfterPropertiesChangeEvent,
                                this._sceneAfterPropertiesChanged,
                                this,
                                void 0,
                                void 0,
                                true
                            ),
                        this._view
                            .getScene()
                            .addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this, void 0, void 0, true),
                        (this._requiresViewTransformation = true));
                }
            }),
            (GWindow.prototype._updateViewConfiguration = function () {
                if (this._document && this._document.isCommercialProductFile()) {
                    var watermarkImage = new Image();
                    ((watermarkImage.onload = () => {
                        watermarkImage.naturalWidth > 0 &&
                            watermarkImage.naturalHeight > 0 &&
                            ((this._view.getViewConfiguration().watermark = watermarkImage), this._view.invalidate());
                    }),
                        (watermarkImage.src = "assets/img/brand/watermark.png"));
                } else ((this._view.getViewConfiguration().watermark = null), this._view.invalidate());
            }),
            (GWindow.prototype._sceneAfterPropertiesChanged = function (event) {
                !event.temporary && GObject.GUtil.containsOneOf(event.properties, ["w", "h"]) && this._updateWindowBackground();
            }),
            (GWindow.prototype._updateWindowBackground = function () {
                this._document.getScene().isFixedSized()
                    ? (this._view._htmlElement.style.background = "")
                    : (this._view._htmlElement.style.background = "white");
            }),
            (GWindow.prototype.getVisibleBBox = function () {
                if (this._document.getScene().isFixedSized()) {
                    var scene = this._document.getScene();
                    return new GObject.GRect(0, 0, scene.getProperty("w"), scene.getProperty("h"));
                }
                return this._view ? new GObject.GRect(0, 0, this._view.getWidth(), this._view.getHeight()) : null;
            }),
            (GWindow.prototype._afterFlagChangeEvent = function (event) {
                event.node instanceof GObject.GPage && event.flag === GObject.GNode.Flag.Active && this._updateWindowBackground();
            }),
            (GWindow.prototype.scrollIntoView = function (rect) {
                if (rect && !rect.isEmpty()) {
                    const view = this.getView(),
                        visibleArea = view.getViewVisibleArea(),
                        targetRect = view.getWorldTransform().mapRect(rect);
                    if (!visibleArea.containsRect(targetRect)) {
                        let visibleCenter = visibleArea.getSide(GObject.GRect.Side.CENTER),
                            delta = targetRect.getSide(GObject.GRect.Side.CENTER).subtract(visibleCenter);
                        GPlatform.GPlatform.scheduleFrame(() => view.scrollBy(delta.getX(), delta.getY()));
                    }
                }
            }),
            (module.exports = GWindow));
    };
