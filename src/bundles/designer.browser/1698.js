module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var toolManagerModule = require(53),
            GObject = require(1),
            GPlatform = require(15);
        const DraggablePoint = require(1699);
        function GEyeDropper() {}
        GObject.GObject.inheritAndMix(GEyeDropper, GObject.GObject);
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend({}, options)),
                    this.each(function () {
                        var buttonElement = this,
                            button = $(this);
                        button.addClass("g-button")
                            .data("g-eye-dropper", {
                                picker: null,
                                documentMove: null,
                                documentMouseDown: null,
                                documentKeyDown: null,
                                rgba: null,
                            })
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GEyeDropper", "text.tooltip")))
                            .append($("<span></span>").addClass("gravit-icon-picker"))
                            .on("click", function (event) {
                                button.closest(".g-disabled").length ||
                                    (options.onClick ? options.onClick.call(this) : gDesigner.stats("eyedropper_click_pick"),
                                    event.stopPropagation(),
                                    event.preventDefault(),
                                    methods.setActive.call(buttonElement, !methods.isActive.call(buttonElement), event.pageX, event.pageY));
                            });
                    })
                );
            },
            isActive: function () {
                var state = $(this).data("g-eye-dropper");
                return !!state && !!state.picker;
            },
            setValue: function (value) {
                const element = $(this),
                    cssBackground = "string" == typeof value ? value : GObject.GPattern.asCSSBackground(value);
                element.find(".g-eye-dropper-preview-color-difference").find(".current").css({ background: cssBackground });
                const state = element.data("g-eye-dropper") || {};
                ((state.currentColor = cssBackground), element.data("g-eye-dropper", state));
            },
            setActive: function (active, pageX, pageY) {
                if (active !== methods.isActive.call(this)) {
                    var element = $(this),
                        state = element.data("g-eye-dropper"),
                        onToolChanged = function () {
                            (gDesigner.getToolManager().removeEventListener(toolManagerModule.GToolManager.ToolChangedEvent, onToolChanged, this),
                                $(".g-eye-dropper-picker").remove());
                        }.bind(this);
                    if (active) {
                        var activeWindow = gDesigner.getWindows().getActiveWindow();
                        if (!activeWindow) return;
                        element.addClass("g-active");
                        for (
                            var canvasElement = activeWindow.getView().getSceneCanvas().getBitmap().getHTMLElement(true),
                                screenDPI = GObject.GPaintCanvas.getScreenDPI(),
                                previewCanvas = $("<canvas></canvas>")
                                    .attr({ width: 135, height: 135 })
                                    .addClass("g-cursor-pixel g-eye-dropper-preview"),
                                colorLabel = $("<span></span>").addClass("g-eye-dropper-preview-color"),
                                colorDiff = $("<span/>")
                                    .addClass("g-eye-dropper-preview-color-difference")
                                    .append($("<div/>").addClass("color-preview").addClass("current").css({ background: state.currentColor }))
                                    .append($("<div/>").addClass("color-preview").addClass("new")),
                                colorPointer = $("<div/>").addClass("g-eye-dropper-color-pointer"),
                                previewContext = previewCanvas[0].getContext("2d"),
                                smoothingProps = ["imageSmoothingEnabled", "webkitImageSmoothingEnabled", "mozImageSmoothingEnabled"],
                                b = 0;
                            b < smoothingProps.length;
                            ++b
                        ) {
                            var w = smoothingProps[b];
                            if (CanvasRenderingContext2D.prototype.hasOwnProperty(w)) {
                                previewContext[w] = false;
                                break;
                            }
                        }
                        state.picker = $("<div></div>")
                            .addClass("g-eye-dropper-picker g-cursor-pixel")
                            .append(previewCanvas)
                            .append(colorLabel)
                            .append(colorDiff)
                            .append(colorPointer)
                            .appendTo($("body"));
                        var padHex = function (hexPart) {
                            return 1 == hexPart.length ? "0" + hexPart : hexPart;
                        };
                        function updatePreview(screenX, screenY) {
                            if ((previewContext.setTransform(1, 0, 0, 1, 0, 0), activeWindow.viewContainsMouse(screenX, screenY))) {
                                var canvasX = screenX * screenDPI,
                                    canvasY = screenY * screenDPI;
                                ((canvasX = Math.max(0, Math.min(canvasX, canvasElement.width))), (canvasY = Math.max(0, Math.min(canvasY, canvasElement.height))));
                                var pixelData = canvasElement.getContext("2d").getImageData(canvasX, canvasY, 1, 1).data,
                                    hexColor = padHex(pixelData[0].toString(16)) + padHex(pixelData[1].toString(16)) + padHex(pixelData[2].toString(16));
                                ((hexColor = hexColor.toUpperCase()), (state.rgba = pixelData));
                                const ringSize = gDesigner.isTouchEnabled() ? 10 : 5;
                                (previewCanvas.css("box-shadow", "0 0 0 ".concat(ringSize, "px rgb(") + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + ")"),
                                    colorLabel.text("R:" + pixelData[0] + " G:" + pixelData[1] + " B:" + pixelData[2] + " #" + hexColor),
                                    colorLabel.css({
                                        display: "block",
                                        top: screenY + 5 + "px",
                                        left: screenX - 55 + "px",
                                    }),
                                    colorDiff.find(".new").css({ background: "#" + hexColor }),
                                    colorPointer.css({
                                        display: "block",
                                        top: screenY - 5 + "px",
                                        left: screenX - 5 + "px",
                                    }),
                                    colorDiff.css({
                                        display: "block",
                                        top: screenY - 76 + "px",
                                        left: screenX - 78 + "px",
                                    }),
                                    previewContext.clearRect(0, 0, 135, 135),
                                    previewContext.drawImage(canvasElement, screenX * screenDPI - 8, screenY * screenDPI - 8, 16, 16, 0, 0, 135, 135));
                            } else
                                ((state.rgba = null),
                                    previewCanvas.css("box-shadow", ""),
                                    colorLabel.css({ display: "none" }),
                                    colorDiff.css({ display: "none" }),
                                    colorPointer.attr("style", "display: none !important"),
                                    previewContext.clearRect(0, 0, 135, 135),
                                    (previewContext.fillStyle = "rgba(0,0,0,0.75)"),
                                    previewContext.scale(0.9, 0.9),
                                    previewContext.fillText(GObject.GLocale.get(new GObject.GLocaleKey("GEyeDropper", "text.preview")), 10, 72, 135));
                        }
                        (gDesigner.isTouchEnabled() &&
                            (state.draggablePoint = new DraggablePoint(
                                previewCanvas.get(0),
                                (event) => {
                                    const rect = previewCanvas.get(0).getBoundingClientRect();
                                    let pageX = event.pageX,
                                        pageY = event.pageY;
                                    ((pageX -= rect.width - 8),
                                        (pageY -= rect.height - 30),
                                        (pageX += 8),
                                        (pageY += 8),
                                        previewCanvas.css({ left: pageX + "px", top: pageY + "px" }));
                                    const centerRect = previewCanvas.get(0).getBoundingClientRect(),
                                        centerX = centerRect.left + centerRect.width / 2,
                                        centerY = centerRect.top + centerRect.height / 2;
                                    updatePreview.call(this, centerX, centerY);
                                },
                                () => {
                                    (methods.setActive.call(this, false), state.rgba && element.trigger("colorchange", [state.rgba]));
                                }
                            )),
                            (state.documentMove = function (event) {
                                if (gDesigner.isTouchEnabled()) return;
                                const pageX = event.pageX,
                                    pageY = event.pageY,
                                    rect = previewCanvas.get(0).getBoundingClientRect(),
                                    left = pageX - rect.width / 2 + 8,
                                    top = pageY - rect.height / 2 + 8;
                                (previewCanvas.css({ left: left + "px", top: top + "px" }), updatePreview.call(this, pageX, pageY));
                            }.bind(this)),
                            (state.documentMouseDown = function (event) {
                                gDesigner.isTouchEnabled()
                                    ? methods.isActive.call(this)
                                        ? methods.setActive.call(this, false)
                                        : methods.setActive.call(this, true)
                                    : (methods.setActive.call(this, false), state.rgba && element.trigger("colorchange", [state.rgba]));
                            }.bind(this)),
                            (state.documentKeyDown = function (event) {
                                GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ESC && methods.setActive.call(this, false);
                            }.bind(this)),
                            "number" == typeof pageX &&
                                "number" == typeof pageY &&
                                (gDesigner.isTouchEnabled() ? state.draggablePoint.moveTo(pageX, pageY, true) : state.documentMove({ pageX: pageX, pageY: pageY })),
                            document.addEventListener("keydown", state.documentKeyDown),
                            document.addEventListener("mousedown", state.documentMouseDown),
                            document.addEventListener("mousemove", state.documentMove),
                            gDesigner.getToolManager().addEventListener(toolManagerModule.GToolManager.ToolChangedEvent, onToolChanged, this));
                    } else
                        (document.removeEventListener("keydown", state.documentKeyDown),
                            document.removeEventListener("mousedown", state.documentMouseDown),
                            document.removeEventListener("mousemove", state.documentMove),
                            gDesigner.getToolManager().removeEventListener(toolManagerModule.GToolManager.ToolChangedEvent, onToolChanged, this),
                            state.picker.remove(),
                            (state.picker = null),
                            (state.documentKeyDown = null),
                            (state.documentMouseDown = null),
                            (state.documentMove = null),
                            state.draggablePoint && state.draggablePoint.unmount(),
                            element.removeClass("g-active"));
                }
            },
        };
        ((module.exports = GEyeDropper),
            ($.fn.gEyeDropper = function (methodName) {
                return methods[methodName]
                    ? methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof methodName && methodName
                      ? void $.error("Method " + methodName + " does not exist on jQuery.myPlugin")
                      : methods.init.apply(this, arguments);
            }));
    };
