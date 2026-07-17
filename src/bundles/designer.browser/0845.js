module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.updateFileFn =
                exports.syncImagesToCloud =
                exports.listFilesFn =
                exports.fetchRequest =
                exports.default =
                exports.createFileAndGetSignedPutUrlsFn =
                    void 0),
            require(19),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(96 /* polyfill:JSON */),
            require(30 /* polyfill:Object */),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(3),
            require(134 /* polyfill:String */),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(26),
            require(114));
        var Dictionary = _interopRequireDefault(require(227));
        const md5 = require(435),
            r = (exports.syncImagesToCloud = async function (findExistingByMd5, defaultFileName, existingFileRefs, images, r, onFileUploaded, onDictionaryReady, fileNamePrefix, onProgress) {
                try {
                    var imageDictionary = new Dictionary.default();
                    const totalImages = images.length;
                    for (var p = 0; p < totalImages; ++p) {
                        var g = images[p];
                        if (g.cloud) {
                            imageDictionary.addEntry(new Dictionary.default.Entry(g.cloud, g.uuid, g.references));
                            continue;
                        }
                        var h = /^data:.{0,255};base64,/i.exec(g.value);
                        if (!h) continue;
                        var f = md5(g.value);
                        let matches = await findExistingByMd5({ md5: f }),
                            E = matches ? matches[0] : null;
                        if (E) imageDictionary.addEntry(new Dictionary.default.Entry(Dictionary.default.CLOUD_PROTOCOL + "://id=" + E.id, g.uuid, g.references));
                        else if (g.references > 0) {
                            for (var m = defaultFileName, y = 0; y < existingFileRefs.length; ++y) {
                                var v = existingFileRefs[y],
                                    _ = Dictionary.default.PROTOCOL + "://" + g.uuid;
                                if ((v.url + "").startsWith(Dictionary.default.PROTOCOL) && v.url === _) {
                                    v.name && (m = v.name);
                                    break;
                                }
                            }
                            var b = g.value,
                                w = h[1] || "application/octet-stream";
                            let e;
                            function C(dataUri, fileName, mimeType) {
                                var binaryString,
                                    parts = dataUri.split(",");
                                try {
                                    binaryString = atob(parts[1]);
                                } catch (e) {
                                    binaryString = "";
                                }
                                for (var a = binaryString.length, r = new Uint8Array(a); a--; ) r[a] = binaryString.charCodeAt(a);
                                return new File([r], fileName, { type: mimeType });
                            }
                            ({ urls: e, file: E } = await r(m, w));
                            var x = C(b, fileNamePrefix + "-" + E.id + ".txt", w);
                            let o = {
                                method: "PUT",
                                headers: { "Cache-Control": "public, max-age=31536000" },
                                body: x,
                            };
                            w && (o.headers = Object.assign(o.headers, { "Content-Type": w }));
                            if (!(await fetch(e.url, o)).ok) throw new Error("failed to upload");
                            (await onFileUploaded(x, E.id, f),
                                imageDictionary.addEntry(new Dictionary.default.Entry(Dictionary.default.CLOUD_PROTOCOL + "://id=" + E.id, g.uuid, g.references)),
                                onProgress && onProgress(p / totalImages));
                        }
                    }
                    return onDictionaryReady && onDictionaryReady(imageDictionary);
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            fetchRequest = (url, authToken, options) => {
                var method = (options && options.method) || "GET",
                    bodyJson = options && options.body && JSON.stringify(options.body),
                    headers = Object.assign(
                        {
                            "Content-Type": "application/json",
                            Accept: "json",
                            Authorization: authToken || "",
                        },
                        options && options.headers
                    );
                if (options && options.query) {
                    var queryParams = options.query,
                        searchParams = new URLSearchParams();
                    for (var l in queryParams) searchParams.append(l, queryParams[l]);
                    url = url + "/?" + searchParams.toString();
                }
                var fetchOptions = { credentials: "include", headers: headers, method: method };
                return (bodyJson && "GET" !== method && (fetchOptions.body = bodyJson), fetch(url, fetchOptions).then((response) => response.json()));
            };
        exports.fetchRequest = fetchRequest;
        exports.listFilesFn = (query, authToken, baseUrl) => fetchRequest("".concat(baseUrl, "/file"), authToken, { query: query });
        ((exports.createFileAndGetSignedPutUrlsFn = async function (name, type, baseUrl, authToken) {
            var createOptions = { method: "POST", body: { name: name, type: type, trashed: null } };
            const createdFile = await fetchRequest("".concat(baseUrl, "/file"), authToken, createOptions);
            var signedUrlOptions = { method: "PUT", body: { id: createdFile.id, type: type } };
            return {
                urls: await fetchRequest("".concat(baseUrl, "/file/").concat(createdFile.id, "/urls"), authToken, signedUrlOptions),
                file: createdFile,
            };
        }),
            (exports.updateFileFn = async function (fileValue, fileId, md5Value, baseUrl, authToken, computeSha256, sha256Fn) {
                const sha256 = computeSha256 && sha256Fn ? await sha256Fn(fileValue) : null;
                return await fetchRequest("".concat(baseUrl, "/file/").concat(fileId), authToken, {
                    method: "PUT",
                    body: { md5: md5Value, trashed: false, sha256: sha256 },
                });
            }));
        exports.default = { syncImagesToCloud: r };
    };
