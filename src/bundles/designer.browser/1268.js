module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.cropImage = function (e, t) {
                if (!(e instanceof GObject.GImage)) return;
                t &&
                    a.GEditor.tryRunTransaction(
                        e,
                        function () {
                            var t = e.getImageTransform();
                            e.setProperties(["trf", "ut", "tl_sx"], [t, true, 0]);
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.reset-cropping"))
                    );
                var n = gDesigner.getToolManager();
                n.getActiveTool() instanceof a.GSubSelectTool
                    ? (n.activateTool(a.GPointerTool, null, true), n.getActiveTool().setEditMode(a.GSelectTool.EditMode.Select))
                    : n.activateTool(a.GSubSelectTool, null, true);
            }),
            (exports.replaceImage = function (e, t) {
                if (!(e instanceof GObject.GImage)) return;
                var n = n || t.getStorage() || gDesigner.getDefaultStorage();
                if (n && n.canPromptOpen()) {
                    const t = [
                        { ext: "png", mime: "image/png" },
                        { ext: "jpg", mime: "image/jpeg" },
                        { ext: "jpeg", mime: "image/jpeg" },
                        { ext: "gif", mime: "image/gif" },
                    ];
                    n.openPrompt(
                        t,
                        (t) => {
                            t.read((t) => {
                                var n = new Blob([t]);
                                if (n.size > GPlatform.GPlatform.maxPngDataSize)
                                    new r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                else {
                                    var s = new FileReader();
                                    ((s.onload = () => {
                                        var t = s.result;
                                        if (t.length > GPlatform.GPlatform.maxImgDataUrlLength)
                                            new r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                        else {
                                            var n = new Image();
                                            ((n.onload = () => {
                                                if (
                                                    n.naturalHeight > GPlatform.GPlatform.maxImgLinearDimension ||
                                                    n.naturalWidth > GPlatform.GPlatform.maxImgLinearDimension ||
                                                    n.naturalWidth * n.naturalHeight > GPlatform.GPlatform.maxImgAreaDots
                                                )
                                                    new r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                                else {
                                                    var s = gDesigner.getToolManager();
                                                    (s.activateTool(a.GPointerTool),
                                                        s.getActiveTool() instanceof a.GSelectTool &&
                                                            s.getActiveTool().setEditMode(a.GSelectTool.EditMode.Select));
                                                    var l = e.getGeometryBBox(),
                                                        c = new GObject.GTransform().translated(l.getX(), l.getY());
                                                    (a.GEditor.tryRunTransaction(
                                                        e,
                                                        () => {
                                                            e.setProperties(
                                                                ["url", "iw", "ih", "itrf"],
                                                                [t, n.naturalWidth, n.naturalHeight, c]
                                                            );
                                                        },
                                                        GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.replace-image"))
                                                    ),
                                                        s.getActiveTool() instanceof a.GSelectTool &&
                                                            s.getActiveTool().setEditMode(a.GSelectTool.EditMode.Edit));
                                                }
                                            }),
                                                (n.src = t));
                                        }
                                    }),
                                        (s.onerror = function () {
                                            new r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                        }),
                                        s.readAsDataURL(n));
                                }
                            });
                        },
                        false
                    );
                }
            }),
            (exports.setOriginSize = function (e) {
                if (!(e instanceof GObject.GImage)) return;
                a.GEditor.tryRunTransaction(
                    e,
                    function () {
                        var t = e.getGeometryBBox(),
                            n = t ? t.getX() : 0,
                            i = t ? t.getY() : 0,
                            a = new GObject.GTransform().translated(n, i);
                        e.setProperties(["trf", "itrf", "pw", "ph"], [a, a, e.getWidth(), e.getHeight()]);
                    },
                    GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.reset-size"))
                );
            }));
        var GObject = require(1),
            GPlatform = require(15),
            a = require(53),
            r = (require(1267), require(123), require(173), require(219));
    };
