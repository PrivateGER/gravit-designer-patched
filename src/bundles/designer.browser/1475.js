module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var exportModule = require(797),
            GObject = require(1);
        require(257);
        function a(currentDocument, newDocument, localName, cloudName, a, onCancel) {
            ((this._currentDocument = currentDocument),
                (this._newDocument = newDocument),
                (this._localName = localName),
                (this._cloudName = cloudName),
                (this._callback = a),
                (this._onCancel = onCancel),
                (this._dialog = $("<div></div>")),
                $("<div></div>")
                    .addClass("g-btn-close")
                    .css("display", this._onCancel ? "" : "none")
                    .append($("<span></span>").addClass("gravit-icon-close"))
                    .on("click", this.close.bind(this))
                    .appendTo(this._dialog));
            var header = $("<div></div>").addClass("header").appendTo(this._dialog);
            ($("<div></div>")
                .addClass("title")
                .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.sync.title"))))
                .appendTo(header),
                $("<div></div>")
                    .addClass("subtitle")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.sync.subtitle"))))
                    .appendTo(header),
                (this._container = $("<div></div>").addClass("container").appendTo(this._dialog)),
                (this._footer = $("<div></div>")
                    .addClass("footer")
                    .css("display", this._onCancel ? "" : "none")
                    .appendTo(this._dialog)));
            let buttonsContainer = $("<div></div>").addClass("buttons").appendTo(this._footer);
            $("<button></button>")
                .addClass("g-button")
                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                .on("click", this.close.bind(this))
                .appendTo(buttonsContainer);
            (this._dialog.gDialog({
                releaseOnClose: true,
                className: "g-document-chooser",
            }),
                this._updatePreview());
        }
        (GObject.GObject.inherit(a, GObject.GObject),
            (a.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (a.prototype.close = function () {
                (this._dialog.gDialog("close"), this._onCancel && this._onCancel());
            }),
            (a.prototype._updatePreview = function () {
                (this._container.empty(),
                    this._createPreview(
                        this._newDocument,
                        "online",
                        this._cloudName,
                        this._newDocument.lastModifiedDate() > this._currentDocument.lastModifiedDate()
                    ),
                    this._createPreview(
                        this._currentDocument,
                        "offline",
                        this._localName,
                        this._currentDocument.lastModifiedDate() > this._newDocument.lastModifiedDate()
                    ));
            }),
            (a.prototype._loadPreview = function (document, mode) {
                return new Promise(function (resolve) {
                    if ("offline" !== mode) {
                        var pendingImages = [],
                            onImageStatusChange = function (event) {
                                if (
                                    event.image.getStatus() === GObject.GImage.ImageStatus.Loaded ||
                                    event.image.getStatus() === GObject.GImage.ImageStatus.Error
                                ) {
                                    event.image.removeEventListener(GObject.GImage.StatusEvent, this);
                                    var index = pendingImages.indexOf(event.image);
                                    (-1 !== index && pendingImages.splice(index, 1), pendingImages.length || resolve());
                                }
                            };
                        (document.acceptChildren((child) => {
                            child instanceof GObject.GImage &&
                                ((child.getStatus() === GObject.GImage.ImageStatus.Error && child.getStatus() === GObject.GImage.ImageStatus.Loaded) ||
                                    (pendingImages.push(child), child.addEventListener(GObject.GImage.StatusEvent, onImageStatusChange)));
                        }),
                            pendingImages.length || resolve());
                    } else resolve();
                });
            }),
            (a.prototype._createPreview = function (document, mode, label) {
                let isNewer = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                var imageContainer = $("<div />").addClass("image"),
                    previewElement = $("<div></div>")
                        .addClass("preview")
                        .on("click", () => {
                            (gDesigner.stats("documentchooser_click_preview", mode), this.close(), this._callback(document));
                        })
                        .appendTo(this._container),
                    previewImageElement = $("<div></div>")
                        .addClass("preview-image loading")
                        .css("background", GObject.GPattern.asCSSBackground(null))
                        .append(imageContainer)
                        .appendTo(previewElement);
                this._loadPreview(document, mode).then(() => {
                    var exportedBitmap = exportModule.GBitmapExport.export(document);
                    (previewImageElement.removeClass("loading"),
                        imageContainer.css("background-image", "url(".concat(exportedBitmap.toImageDataUrl(GObject.GBitmap.ImageType.JPEG, 1), ")")));
                });
                var formatDate = function (date) {
                    return 0 === date.getTime()
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.unavailable"))
                        : GObject.GLocale.toLocaleDate(date, {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                          });
                };
                previewElement.append(
                    $("<div></div>")
                        .addClass("title")
                        .append($("<span></span>").text(label + " " + GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text." + mode))))
                ).append(
                    $("<div></div>")
                        .addClass("subtitle")
                        .append(
                            $("<span></span>").text(
                                formatDate(document.lastModifiedDate()) +
                                    (isNewer ? " " + GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.newer-file")) : "")
                            )
                        )
                );
            }),
            (module.exports = a));
    };
