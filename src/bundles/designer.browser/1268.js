module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.cropImage = function (image, resetCropping) {
                if (!(image instanceof GObject.GImage)) return;
                resetCropping &&
                    GUI.GEditor.tryRunTransaction(
                        image,
                        function () {
                            var transform = image.getImageTransform();
                            image.setProperties(["trf", "ut", "tl_sx"], [transform, true, 0]);
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.reset-cropping"))
                    );
                var toolManager = gDesigner.getToolManager();
                toolManager.getActiveTool() instanceof GUI.GSubSelectTool
                    ? (toolManager.activateTool(GUI.GPointerTool, null, true), toolManager.getActiveTool().setEditMode(GUI.GSelectTool.EditMode.Select))
                    : toolManager.activateTool(GUI.GSubSelectTool, null, true);
            }),
            (exports.replaceImage = function (image, document) {
                if (!(image instanceof GObject.GImage)) return;
                var storage = storage || document.getStorage() || gDesigner.getDefaultStorage();
                if (storage && storage.canPromptOpen()) {
                    const fileTypes = [
                        { ext: "png", mime: "image/png" },
                        { ext: "jpg", mime: "image/jpeg" },
                        { ext: "jpeg", mime: "image/jpeg" },
                        { ext: "gif", mime: "image/gif" },
                    ];
                    storage.openPrompt(
                        fileTypes,
                        (file) => {
                            file.read((data) => {
                                var blob = new Blob([data]);
                                if (blob.size > GPlatform.GPlatform.maxPngDataSize)
                                    new AlertDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                else {
                                    var reader = new FileReader();
                                    ((reader.onload = () => {
                                        var dataUrl = reader.result;
                                        if (dataUrl.length > GPlatform.GPlatform.maxImgDataUrlLength)
                                            new AlertDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                        else {
                                            var imgElement = new Image();
                                            ((imgElement.onload = () => {
                                                if (
                                                    imgElement.naturalHeight > GPlatform.GPlatform.maxImgLinearDimension ||
                                                    imgElement.naturalWidth > GPlatform.GPlatform.maxImgLinearDimension ||
                                                    imgElement.naturalWidth * imgElement.naturalHeight > GPlatform.GPlatform.maxImgAreaDots
                                                )
                                                    new AlertDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                                else {
                                                    var toolManager = gDesigner.getToolManager();
                                                    (toolManager.activateTool(GUI.GPointerTool),
                                                        toolManager.getActiveTool() instanceof GUI.GSelectTool &&
                                                            toolManager.getActiveTool().setEditMode(GUI.GSelectTool.EditMode.Select));
                                                    var bbox = image.getGeometryBBox(),
                                                        transform = new GObject.GTransform().translated(bbox.getX(), bbox.getY());
                                                    (GUI.GEditor.tryRunTransaction(
                                                        image,
                                                        () => {
                                                            image.setProperties(
                                                                ["url", "iw", "ih", "itrf"],
                                                                [dataUrl, imgElement.naturalWidth, imgElement.naturalHeight, transform]
                                                            );
                                                        },
                                                        GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.replace-image"))
                                                    ),
                                                        toolManager.getActiveTool() instanceof GUI.GSelectTool &&
                                                            toolManager.getActiveTool().setEditMode(GUI.GSelectTool.EditMode.Edit));
                                                }
                                            }),
                                                (imgElement.src = dataUrl));
                                        }
                                    }),
                                        (reader.onerror = function () {
                                            new AlertDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                        }),
                                        reader.readAsDataURL(blob));
                                }
                            });
                        },
                        false
                    );
                }
            }),
            (exports.setOriginSize = function (image) {
                if (!(image instanceof GObject.GImage)) return;
                GUI.GEditor.tryRunTransaction(
                    image,
                    function () {
                        var bbox = image.getGeometryBBox(),
                            x = bbox ? bbox.getX() : 0,
                            y = bbox ? bbox.getY() : 0,
                            transform = new GObject.GTransform().translated(x, y);
                        image.setProperties(["trf", "itrf", "pw", "ph"], [transform, transform, image.getWidth(), image.getHeight()]);
                    },
                    GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.reset-size"))
                );
            }));
        var GObject = require(1),
            GPlatform = require(15),
            GUI = require(53),
            AlertDialog = (require(1267 /* lib:color-thief */), require(123), require(173), require(219));
    };
