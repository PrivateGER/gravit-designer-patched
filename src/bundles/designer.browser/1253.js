module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(180), require(181 /* polyfill:ArrayBuffer */), require(8 /* Symbol */), require(91 /* polyfill:String */), require(218), require(189), require(190), require(191), require(192), require(4), require(41), require(13), require(38));
        var GObject = require(1),
            GExportFormats = require(797),
            Utils = require(40),
            designerConfig = require(10),
            GStorage = require(237),
            GDocument = require(163),
            GConstants = require(442);
        const GFileTypes = require(389);
        function GExporter() {}
        ((window.pako = require(165 /* PDFNodeStream */)),
            require(1514 /* lib:zip.js */),
            require(1515 /* lib:zip.js */),
            require(1516),
            (zip.useWebWorkers = false),
            (GExporter.generateExportables = function (source, options, recursive) {
                var elements = source instanceof Array ? source : [source];
                source instanceof GObject.GScene && (elements = source.getChildren().filter((child) => child instanceof GObject.GPage && child.isVisible()));
                var result = [],
                    nameCounts = {};
                function resolveName(element) {
                    var name = element.getProperty("name");
                    if (!name) {
                        var typeId = GObject.GObject.getTypeId(element);
                        (nameCounts.hasOwnProperty(typeId) || (nameCounts[typeId] = 0), (name = element.getNodeNameTranslated()));
                        var count = ++nameCounts[typeId];
                        count > 1 && (name += "_" + count);
                    }
                    return name;
                }
                function collect(element) {
                    if (options)
                        result.push(
                            GObject.GUtil.extend({}, options, {
                                element: element,
                                name: 1 === elements.length && options.name ? options.name : resolveName(element),
                            })
                        );
                    else if (element.hasMixin(GObject.GNode.Properties)) {
                        var exportDefs = element.getProperty(GConstants.EXPORT_PROPERTY_NAME, true);
                        if (exportDefs && exportDefs instanceof Array && exportDefs.length)
                            for (var name = resolveName(element), u = 0; u < exportDefs.length; ++u) {
                                var p = exportDefs[u];
                                p.fm &&
                                    result.push(
                                        GObject.GUtil.extend(
                                            {},
                                            {
                                                size: p.sz,
                                                suffix: p.sf,
                                                format: p.fm,
                                                element: element,
                                                name: name,
                                            }
                                        )
                                    );
                            }
                    }
                    if (recursive && element.hasMixin(GObject.GNode.Container))
                        for (var child = element.getFirstChild(); null !== child; child = child.getNext()) child instanceof GObject.GElement && collect(child);
                }
                for (var d = 0; d < elements.length; ++d) {
                    collect(elements[d]);
                }
                return result;
            }),
            (GExporter._validateCommercialDocument = function () {
                const document = gDesigner.getActiveDocument();
                return !document || !document.isCommercialProductFile() || (document.openPaywall(), false);
            }),
            (GExporter.exportExportable = function (exportable, onBlob, progress, reporter) {
                if (this._validateCommercialDocument()) {
                    var element = exportable.element,
                        format = exportable.format;
                    if ("png" === format || "jpg" === format) {
                        var imageType = null,
                            quality = null;
                        switch (format) {
                            case "png":
                                imageType = GObject.GBitmap.ImageType.PNG;
                                break;
                            case "jpg":
                                ((imageType = GObject.GBitmap.ImageType.JPEG), (quality = (exportable.jpegQuality || 100) / 100));
                        }
                        var dpi = GObject.GLength.DPI,
                            bitmap = GExportFormats.GBitmapExport.export(exportable.element, exportable.size, exportable.backgroundColor, exportable.configuration, dpi, exportable.backgroundOpacity, true);
                        bitmap && bitmap.toImageBlob(imageType, onBlob, quality);
                    } else if ("svg" === format)
                        GExportFormats.GSVGExport.export(
                            element,
                            {
                                convertTextToPath: exportable.convertTextToPath,
                                decimalPlacesPrecision: Utils.watchDog.check(exportable.decimalPlacesPrecision, 3),
                                preserveEditingCapabilities: Utils.watchDog.check(exportable.preserveEditingCapabilities, false),
                                backgroundColor: exportable.backgroundColor,
                                backgroundOpacity: exportable.backgroundOpacity,
                                sceneBackground: !exportable.configuration || exportable.configuration.sceneBackground || !!exportable.backgroundColor,
                                layerNamesAsId: Utils.watchDog.check(exportable.layerNamesAsId, false),
                            },
                            function (error, data) {
                                !error && data && onBlob(new Blob([data], { type: "image/svg+xml" }));
                            }
                        );
                    else {
                        if (format !== GFileTypes.PDF.ext) throw new Error("Unknown format.");
                        gDesigner.getUser().then(function (user) {
                            var authorName;
                            authorName =
                                user && user.getFullUserName()
                                    ? user.getFullUserName()
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.default-export-author"));
                            var options = {
                                    dpi: Utils.watchDog.check(GObject.GUtil.parseNumber(exportable.size), GObject.GUtil.parseNumber("72dpi")),
                                    colorSpace: exportable.colorSpace,
                                    jpegQuality: exportable.jpegQuality || designerConfig.JPEG_EXPORT_QUALITY_DEFAULT,
                                    configuration: exportable.configuration,
                                    backgroundColor: exportable.backgroundColor,
                                    backgroundOpacity: exportable.backgroundOpacity,
                                    convertTextToPath: exportable.convertTextToPath,
                                    progress: progress,
                                    user: authorName,
                                    title: gDesigner.getWindows().getActiveWindow().getTitle(),
                                    downsampleImages: exportable.downsampleImages,
                                },
                                pdfExport = GExportFormats.GPDFExport.export(
                                    element,
                                    options,
                                    function (error, data) {
                                        (!error && data && onBlob(new Blob([data], { type: GFileTypes.PDF.mime })),
                                            reporter && (pdfExport.isAbort() ? reporter.close && reporter.close() : error && reporter.error && reporter.error(error)));
                                    },
                                    null,
                                    reporter
                                );
                            reporter && (reporter.abort = () => pdfExport && pdfExport.abort());
                        });
                    }
                }
            }),
            (GExporter.generateExportName = function (exportable, name, usedNames) {
                var fileName = GObject.GUtil.sanitizeFilename(name || exportable.name) + (exportable.suffix || "");
                if (usedNames) {
                    var duplicates = usedNames.filter(function (entry) {
                        return entry.name === fileName && entry.format === exportable.format;
                    });
                    (usedNames.push({ name: fileName, format: exportable.format }), duplicates.length && (fileName += "(" + (duplicates.length + 1) + ")"));
                }
                return (fileName += "." + exportable.format);
            }),
            (GExporter.exportToDirectory = async function (exportables, outputDirectory, onComplete, onProgress) {
                if (this._validateCommercialDocument())
                    for (var directoryCache = {}, r = 0, usedNames = [], l = 0; l < exportables.length; ++l) {
                        var c = null,
                            d = outputDirectory;
                        if ((c = exportables[l].name)) {
                            if (c.indexOf("/") >= 0) {
                                var p = c.split("/"),
                                    g = [];
                                for (let e = 0; e < p.length; ++e) {
                                    var h = GObject.GUtil.sanitizeFilename(p[e].trim());
                                    h && g.push(h);
                                }
                                if (g.length > 1) {
                                    c = g.pop();
                                    var f = "";
                                    for (let e = 0; e < g.length; ++e) {
                                        var m = g[e];
                                        f && (f += "/");
                                        var y = directoryCache[(f += m.toLowerCase())];
                                        if (y) d = y;
                                        else
                                            try {
                                                ((d = await d.addDirectory(m)), (directoryCache[f] = d));
                                            } catch (e) {}
                                    }
                                } else g.length && (c = g[0]);
                            } else c = GObject.GUtil.sanitizeFilename(c.trim());
                            c &&
                                d &&
                                GExporter.exportExportable(
                                    exportables[l],
                                    (function (directory, fileName) {
                                        return function (data) {
                                            var reader = new FileReader();
                                            if (
                                                ((reader.onload = () => {
                                                    directory.addFile(fileName)
                                                        .then((file) => {
                                                            file.write(new Uint8Array(reader.result), () => {
                                                                ++r === exportables.length && onComplete && onComplete();
                                                            });
                                                        })
                                                        .catch(() => {
                                                            ++r === exportables.length && onComplete && onComplete();
                                                        });
                                                }),
                                                data instanceof Blob || data instanceof File)
                                            )
                                                try {
                                                    reader.readAsArrayBuffer(data);
                                                } catch (t) {
                                                    ++r === exportables.length && onComplete && onComplete();
                                                }
                                            else ++r === exportables.length && onComplete && onComplete();
                                        };
                                    })(d, GExporter.generateExportName(exportables[l], c, usedNames)),
                                    onProgress
                                );
                        }
                    }
            }),
            (GExporter.export = function (exportables, storage, name, onComplete, onCancel, assetsMode, onProgress, reporter, onError, storageOptions) {
                if (this._validateCommercialDocument()) {
                    var writeBlob = (blob, file, onWritten) => {
                            var reader = new FileReader();
                            ((reader.onload = () => {
                                file.write(new Uint8Array(reader.result), () => (onWritten ? onWritten() : void 0), onError);
                            }),
                                reader.readAsArrayBuffer(blob));
                        },
                        finishExport = (blob, fileName, onWritten, fileTypeEntry, forceDownload, storageOptions) => {
                            storage instanceof GStorage.Item
                                ? writeBlob(blob, storage, onWritten)
                                : storage instanceof GStorage &&
                                  (!forceDownload && storage.canPromptSave()
                                      ? storage.savePrompt(
                                            fileName,
                                            [fileTypeEntry],
                                            (file) => {
                                                writeBlob(blob, file, onWritten);
                                            },
                                            onCancel,
                                            storageOptions
                                        )
                                      : storage.canDownload() &&
                                        storage.download(
                                            fileName,
                                            (file) => {
                                                writeBlob(blob, file, onWritten);
                                            },
                                            storageOptions
                                        ));
                        },
                        exportable = exportables[0],
                        isMultiple = exportables.length > 1,
                        fileType = GDocument.FileTypes.find((type) => type.ext === exportable.format);
                    if (
                        (isMultiple &&
                            (exportable.format !== GFileTypes.PDF.ext ||
                                assetsMode ||
                                ((isMultiple = false), ((exportable = GObject.GUtil.extend({}, exportable)).name = name), (exportable.element = exportables.map((item) => item.element)))),
                        isMultiple)
                    )
                        if (storage instanceof GStorage && storage.canChooseDirectory())
                            storage.chooseDirectory(
                                (directory) => {
                                    GExporter.exportToDirectory(exportables, directory, onComplete, onProgress);
                                },
                                onCancel,
                                () => {
                                    var fallbackZipDirectory = new GExporter.ZipDirectory();
                                    GExporter.exportToDirectory(
                                        exportables,
                                        fallbackZipDirectory,
                                        () => {
                                            fallbackZipDirectory.exportBlob((blob) => {
                                                finishExport(blob, name + ".zip", onComplete, fileType, true, storageOptions);
                                            });
                                        },
                                        onProgress
                                    );
                                }
                            );
                        else {
                            var zipDirectory = new GExporter.ZipDirectory();
                            GExporter.exportToDirectory(
                                exportables,
                                zipDirectory,
                                () => {
                                    zipDirectory.exportBlob((blob) => {
                                        finishExport(blob, name + ".zip", onComplete, { ext: "zip", mime: "application/zip" }, false, storageOptions);
                                    });
                                },
                                onProgress
                            );
                        }
                    else
                        GExporter.exportExportable(
                            exportable,
                            function (blob) {
                                const isDirectPdfDownload = storage instanceof GStorage && storage.canDownload() && fileType && fileType.ext === GFileTypes.PDF.ext;
                                finishExport(blob, GExporter.generateExportName(exportable), onComplete, fileType, isDirectPdfDownload, storageOptions);
                            },
                            onProgress,
                            reporter
                        );
                }
            }),
            (GExporter.ZipDirectory = function (storage, zipNode) {
                (GStorage.Directory.call(this, storage), (this._zipRoot = zipNode ? null : new zip.fs.FS()), (this._zipDirectory = zipNode || this._zipRoot.root));
            }),
            GObject.GObject.inherit(GExporter.ZipDirectory, GStorage.Directory),
            (GExporter.ZipDirectory.prototype.addDirectory = async function (name) {
                return new GExporter.ZipDirectory(this._storage, this._zipDirectory.addDirectory(name));
            }),
            (GExporter.ZipDirectory.prototype.addFile = async function (name) {
                return {
                    _zipDirectory: this._zipDirectory,
                    _name: name,
                    write: function (data, callback) {
                        if ((this._zipDirectory.addBlob(this._name, new Blob([data])), callback)) return callback();
                    },
                };
            }),
            (GExporter.ZipDirectory.prototype.exportBlob = function (callback) {
                this._zipDirectory.exportBlob(callback);
            }),
            (module.exports = GExporter));
    };
