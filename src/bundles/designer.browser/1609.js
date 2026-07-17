module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30 /* polyfill:Object */), require(3), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GPlatform = require(15),
            GExporters = require(797),
            Utils = require(40),
            GCategory = require(18),
            GAction = require(31),
            GLoginPanel = require(446),
            GNoticeDialog = require(219),
            GPrintStorage = require(1610),
            GContainer = require(85);
        const GSystemDialog = require(44);
        var printFrame = null,
            useSvgFallback = false,
            printingDisabled = false;
        function GPrintAction() {}
        (GObject.GObject.inherit(GPrintAction, GAction),
            (GPrintAction.ID = "file.print"),
            (GPrintAction.TITLE = new GObject.GLocaleKey("GPrintAction", "title")),
            (GPrintAction.prototype.getId = function () {
                return GPrintAction.ID;
            }),
            (GPrintAction.prototype.getTitle = function () {
                return GPrintAction.TITLE;
            }),
            (GPrintAction.prototype.getIcon = function () {
                return "gravit-icon-print";
            }),
            (GPrintAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GPrintAction.prototype.getGroup = function () {
                return "print";
            }),
            (GPrintAction.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isExportEnabled()) return false;
                const activeDocument = gDesigner.getActiveDocument();
                return activeDocument && (!activeDocument.isNew() || activeDocument.isModified());
            }),
            (GPrintAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.COMMAND, "P"];
            }),
            (GPrintAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument.getScene(),
                    pdfItem = new GPrintStorage.Item("PDF"),
                    exportOptions = {
                        suppressMessages: true,
                        dpi: gDesigner.isEnabledProFeatures() ? 300 : 150,
                        preserveEditingCapabilities: false,
                        jpegQuality: 100,
                        export: true,
                    },
                    handleNoData = () => {
                        console.log("NO DATA :(");
                    };
                const printViaSvg = () => {
                    -1 !== navigator.userAgent.indexOf("Firefox") ||
                    (gContainer.getRuntime() === GContainer.Runtime.Electron && GExporters.GSVGExport.hasSupportedEffects(scene))
                        ? GSystemDialog.confirm(
                              GObject.GLocale.get(new GObject.GLocaleKey("GPrintAction", "printing-warning")),
                              (confirmed) => {
                                  confirmed && printPagesAsSvg();
                              },
                              void 0,
                              void 0,
                              void 0,
                              true,
                              true
                          )
                        : printPagesAsSvg();
                };
                var printPagesAsSvg = () => {
                        Object.assign(exportOptions, { convertTextToPath: true });
                        let pages = [];
                        scene.iteratePages(function (page) {
                            pages.push(page);
                        });
                        let svgPages = [],
                            onSvgPageExported = (error, svgContent) => {
                                if (error || !svgContent) return handleNoData();
                                if ((svgPages.push(svgContent), pages.shift(), pages.length)) return void GExporters.GSVGExport.export(pages[0], exportOptions, onSvgPageExported);
                                let printHtml = "";
                                for (var u = 0; u < svgPages.length; u++) {
                                    let dataUrl = "data:image/svg+xml;base64," + (0, Utils.stringToBase64String)(svgPages[u]);
                                    printHtml = printHtml.concat("<img style='height:100%;width:auto;max-width:100%;display:block;' src='" + dataUrl + "'/>");
                                }
                                var frameDocument = printFrame.contentDocument;
                                ((frameDocument.head.innerHTML = "<style type='text/css' media='print'>@page { margin: 0mm; }</style>"),
                                    (frameDocument.body.style.margin = "0"),
                                    (frameDocument.body.style.height = "100%"),
                                    (frameDocument.body.innerHTML = printHtml),
                                    (frameDocument.title = activeDocument.getTitle()),
                                    $(printFrame.contentWindow.document).ready(function () {
                                        printFrame.contentWindow.focus();
                                        try {
                                            printFrame.contentWindow.print();
                                        } catch (e) {
                                            ((printingDisabled = true), showPrintDisabledNotice());
                                        }
                                    }));
                            };
                        pages.length && GExporters.GSVGExport.export(pages[0], exportOptions, onSvgPageExported);
                    },
                    showPrintDisabledNotice = () => new GNoticeDialog(GObject.GLocale.get(new GObject.GLocaleKey("GPrintAction", "printing-disabled"))).open(),
                    printLoadedFrame = () => {
                        if (printFrame.src) {
                            printFrame.focus();
                            try {
                                printFrame.contentWindow.print();
                            } catch (e) {
                                ((useSvgFallback = true), (printFrame.onload = printViaSvg), (printFrame.src = "about:blank"));
                            }
                        }
                    },
                    loadPdfIntoFrame = () => {
                        pdfItem.read((pdfData) => {
                            let blob = new window.Blob([pdfData], { type: "application/pdf" }),
                                blobUrl = window.URL.createObjectURL(blob);
                            printFrame.setAttribute("src", blobUrl);
                        });
                    };
                (printFrame ||
                    (((printFrame = document.createElement("iframe")).style.visibility = "hidden"),
                    (printFrame.style.position = "fixed"),
                    (printFrame.style.right = "0"),
                    (printFrame.style.bottom = "0"),
                    (printFrame.style.zIndex = "-1"),
                    document.body.appendChild(printFrame),
                    gContainer.getRuntime() === GContainer.Runtime.Electron && (useSvgFallback = true)),
                    new GLoginPanel(
                        () => {
                            !(function () {
                                if (printingDisabled) showPrintDisabledNotice();
                                else if (useSvgFallback) printViaSvg();
                                else {
                                    var o = 0,
                                        dpiCandidates = [300, 150, 72, 36, null];
                                    gDesigner.isEnabledProFeatures() || dpiCandidates.shift();
                                    for (var dpiUnsupported = false; !GExporters.GPDFExport.isSupported(scene, true, dpiCandidates[o++] + "dpi"); )
                                        if (null === dpiCandidates[o]) {
                                            dpiUnsupported = true;
                                            break;
                                        }
                                    dpiUnsupported ? ((printFrame.onload = null), printPagesAsSvg()) : ((exportOptions.dpi = dpiCandidates[o - 1]), (printFrame.onload = printLoadedFrame), activeDocument.store(pdfItem, loadPdfIntoFrame, handleNoData, exportOptions));
                                }
                            })();
                        },
                        () => {
                            gDesigner.stats("action-cancelled_anonymous", this.getId());
                        }
                    ));
            }),
            (GPrintAction.prototype.toString = function () {
                return "[Object GPrintAction]";
            }),
            (module.exports = GPrintAction));
    };
