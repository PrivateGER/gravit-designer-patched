module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.downloadActiveFile = function () {
                let extension = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!window.gDesigner) return false;
                const document = window.gDesigner.getActiveDocument();
                if (!document) return false;
                if (!window.gContainer) return false;
                const storage = window.gContainer.getStorage();
                if (!storage) return false;
                extension = extension || document.getExtension();
                const filename = "".concat(document.getTitle() || "Design", ".").concat(extension);
                return (
                    storage.download(filename, (data) => {
                        document.store(data, console.log, console.error, options);
                    }),
                    true
                );
            }),
            (exports.downloadDataURI = function downloadDataURI(data, name, extension, mime) {
                if (data instanceof Blob) {
                    var reader = new FileReader();
                    ((reader.onloadend = () => {
                        triggerDownload(reader.result);
                    }),
                        reader.readAsArrayBuffer(data));
                } else "string" == typeof data ? downloadDataURI(new Blob([data], mime), name, extension, mime) : triggerDownload(data);
                function triggerDownload(buffer) {
                    gContainer.download({ buffer: buffer, name: name, extension: extension, mime: mime });
                }
            }),
            require(19),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(20 /* polyfill:RegExp */),
            require(34),
            require(247),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192));
        var GObject = require(1),
            BinaryReader = require(1210 /* lib:jdataview */),
            invalidCharsRegex = /["\*\/:<>\?\\\|]/g,
            controlCharsRegex = /[\0-\x1F\x80-\x9F]/g,
            allDotsRegex = /^\.+$/,
            reservedNamesRegex =
                /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\.(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
            trailingDotsSpacesRegex = /[ \.]+$/;
        ((GObject.GUtil.sanitizeFilename = function (filename, replacement) {
            return ((replacement = replacement || "_"), filename.replace(invalidCharsRegex, replacement).replace(controlCharsRegex, replacement).replace(allDotsRegex, replacement).replace(reservedNamesRegex, replacement).replace(trailingDotsSpacesRegex, replacement).substr(0, 255));
        }),
            (GObject.GUtil.dataUrlToBlob = function (dataUrl) {
                if (
                    !/^data:(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){0,255};ba[s\u017F]e64,/i.exec(
                        dataUrl
                    )
                ) {
                    const commaParts = dataUrl.split(","),
                        mimeType = commaParts[0].split(":")[1],
                        data = commaParts[1];
                    return new Blob([data], { type: mimeType });
                }
                var binary,
                    base64Parts = dataUrl.split(";base64,"),
                    contentType = base64Parts[0].split(":")[1];
                try {
                    binary = window.atob(base64Parts[1]);
                } catch (e) {
                    binary = "";
                }
                for (var length = binary.length, bytes = new Uint8Array(length), r = 0; r < length; ++r) bytes[r] = binary.charCodeAt(r);
                return new Blob([bytes], { type: contentType });
            }),
            (GObject.GUtil.readACVFile = function (buffer) {
                var reader = new BinaryReader(buffer),
                    curves = { rgb: [], r: [], g: [], b: [] };
                reader.seek(4);
                var pointCount = reader.getUint16(),
                    channelNames = ["r", "g", "b"],
                    channelArray = null,
                    x = null,
                    y = null,
                    c = null,
                    d = null;
                for (curves.rgb.push([0, reader.getUint16()]), reader.seek(reader.tell() + 2), c = 1; c < pointCount; c++)
                    ((y = reader.getUint16()), (x = reader.getUint16()), curves.rgb.push([x, y]));
                for (c = 0; c < 3; c++)
                    for (pointCount = reader.getUint16(), channelArray = curves[channelNames[c]], d = 0; d < pointCount; d++) ((y = reader.getUint16()), (x = reader.getUint16()), channelArray.push([x, y]));
                return curves;
            }));
    };
