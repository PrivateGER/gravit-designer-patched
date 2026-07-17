module.exports = function (module, exports, require) {
        "use strict";
        (require(91 /* polyfill:String */), require(842 /* polyfill:String */));
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports._cloneChildrenIntoReceiver = cloneChildrenIntoReceiver),
            (exports._mergeChildren = mergeChildren),
            (exports._mergePath = mergePath),
            (exports._mergeProperties = mergeProperties),
            (exports._mergeStyle = mergeStyle),
            (exports._removeDeletedChildren = removeDeletedChildren),
            (exports._tryAndCatch = void 0),
            (exports._updateCommonChildren = updateCommonChildren),
            (exports.areNodePropertiesDifferent = areNodePropertiesDifferent),
            (exports.base64StringToString = function (base64String) {
                let decoded;
                try {
                    decoded = decodeUtf8Bytes(base64.toByteArray(base64String));
                } catch (e) {
                    decoded = "";
                }
                return decoded;
            }),
            (exports.base64URLSafeEncode = function (input) {
                return (0, base64Url.trim)((0, base64Url.encode)(input));
            }),
            (exports.blockChanges = function (editor, parents, scene, element) {
                scene && scene.startBlockReferenceChanges();
                element && element.beginUpdate();
                editor && editor._beginSelectionUpdate();
                parents &&
                    parents.forEach((parent) => {
                        parent.beginUpdate();
                    });
            }),
            (exports.buildDialogDocumentHasUpdates = function (document, onReload, onSave, onCancel) {
                return GSystemDialog.custom({
                    subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "has-new-version-when-save-message")),
                    className: "g-has-updates-warning-dialog",
                    icon: "info",
                    closeable: false,
                    buttons: [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cancel")),
                            closeOnClick: true,
                            shortcut: GSystemDialog.Shortcut.Esc,
                            position: "left",
                            onclick: () => {
                                onCancel && onCancel.call(this, document);
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "has-new-version-when-save-reload")),
                            closeOnClick: true,
                            onclick: () => {
                                (gDesigner.getToolbar()._updateActions(), onReload.call(this, document));
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "has-new-version-when-save-save")),
                            className: "primary",
                            closeOnClick: true,
                            shortcut: GSystemDialog.Shortcut.Enter,
                            onclick: () => {
                                onSave.call(this, document);
                            },
                        },
                    ],
                });
            }),
            (exports.chaining = void 0),
            (exports.debounce = function (func, wait) {
                let timer;
                return function () {
                    const args = arguments;
                    let later = () => {
                        ((timer = 0), func.apply(this, args));
                    };
                    (timer && clearTimeout(timer), (timer = setTimeout(later, wait)));
                };
            }),
            (exports.decodeFromUTF8 = decodeUtf8Bytes),
            (exports.decodeHTML = function (html) {
                return $("<textarea/>").html(html).text();
            }),
            (exports.decrypt = function (encryptedText) {
                try {
                    var parts = encryptedText.split(":"),
                        ivHex = parts.shift(),
                        iv = CryptoJS.enc.Hex.parse(ivHex),
                        cipherText = parts.join(":");
                    return CryptoJS.AES.decrypt(cipherText, encryptionKey, {
                        iv: iv,
                        format: CryptoJS.format.OpenSSL,
                        mode: CryptoJS.mode.CBC,
                    }).toString(CryptoJS.enc.Utf8);
                } catch (e) {
                    return;
                }
            }),
            (exports.encodeToUTF8 = encodeUtf8String),
            (exports.encrypt = function (plainText) {
                try {
                    var iv = CryptoJS.lib.WordArray.random(32),
                        encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey, {
                            iv: iv,
                            format: CryptoJS.format.OpenSSL,
                            mode: CryptoJS.mode.CBC,
                        });
                    return iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
                } catch (e) {
                    return;
                }
            }),
            (exports.fakeFunction = function () {}),
            (exports.getAnnotationType = function (annotation) {
                let match = annotation
                    .toString()
                    .match(
                        /\[G((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)Annotation\]/
                    );
                return (match && match[1]) || null;
            }),
            (exports.getExtensionFromString = function (text, extensions) {
                var pattern = new RegExp("\\b" + extensions.join("|") + "\\b", "gim"),
                    match = text.match(pattern);
                return match ? match[0] : null;
            }),
            (exports.getFileNameWithoutExtension = function (fileName, extension) {
                fileName.toLowerCase().endsWith(".".concat(extension).toLowerCase()) && (fileName = fileName.substr(0, fileName.lastIndexOf(".")));
                return fileName;
            }),
            (exports.getFileSHA256Digest = async function (input) {
                input instanceof Blob ? (input = await input.arrayBuffer()) : "string" == typeof input && (input = encodeUtf8String(input));
                return CryptoJS
                    .SHA256(
                        (function (buffer) {
                            for (var bytes = new Uint8Array(buffer), words = [], index = 0; index < bytes.length; index += 4)
                                words.push((bytes[index] << 24) | (bytes[index + 1] << 16) | (bytes[index + 2] << 8) | bytes[index + 3]);
                            return CryptoJS.lib.WordArray.create(words, bytes.length);
                        })(input)
                    )
                    .toString();
            }),
            (exports.getFileStateAndRole = function (user, file) {
                let role,
                    state = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                const shareList = file.getPrivateShareList();
                shareList.forEach((share) => {
                    const { id, copy, inspect, comment, owner, access, edit } = share;
                    user.getUID() === id
                        ? ((role = GShareRoleFactory.makeFromShare(share)),
                          owner
                              ? Object.assign(state, {
                                    owner: true,
                                    edit: true,
                                    inspect: true,
                                    copy: true,
                                    comment: !!HAS_ANNOTATIONS,
                                    share: true,
                                })
                              : Object.assign(state, {
                                    owner: false,
                                    share: false,
                                    edit: edit,
                                    copy: copy,
                                    inspect: inspect,
                                    comment: !!HAS_ANNOTATIONS && comment,
                                    sharing: access,
                                }))
                        : access && Object.assign(state, { sharing: true });
                });
                const ownerShare = shareList.find((share) => share.owner);
                if (ownerShare) {
                    const isOwner = user.getUID() === ownerShare.id;
                    ((state.owner = isOwner), (state.share = isOwner));
                }
                const publicShare = file.getPublicShare();
                publicShare && publicShare.access && ((state.isPrivate = false), (state.sharing = true));
                return (
                    Object.assign(state, {
                        isPrivate: shareList && shareList.filter((share) => !share.owner).length > 0,
                    }),
                    { state: state, role: role, publicShare: publicShare }
                );
            }),
            (exports.getSizeInfo = function (bytes) {
                var remaining = bytes;
                const million = 1e6,
                    billion = 1e3 * million;
                var sizeInfo = { gb: 0, mb: 0, kb: 0 },
                    gbCount = Math.floor(remaining / billion);
                gbCount && ((sizeInfo.gb = gbCount), (remaining -= gbCount * billion));
                var mbCount = Math.floor(remaining / million);
                mbCount && ((sizeInfo.mb = mbCount), (remaining -= mbCount * million));
                var kbCount = Math.floor(remaining / 1e3);
                kbCount && ((sizeInfo.kb = kbCount), (remaining -= 1e3 * kbCount));
                return sizeInfo;
            }),
            (exports.getVersionFromString = function (text, patterns, fallback) {
                var match = text.match(patterns.join("|"));
                return match ? match[0] : fallback;
            }),
            (exports.isDifferent = isDifferent),
            (exports.isFunction = function (value) {
                if (void 0 === value) return false;
                var typeTag = Object.prototype.toString.call(value);
                return ["[object Function]", "[object AsyncFunction]", "[object GeneratorFunction]", "[object Proxy]"].indexOf(typeTag) >= 0;
            }),
            (exports.isPassiveSupported = function () {
                if (void 0 === passiveSupported) {
                    passiveSupported = false;
                    try {
                        const options = {
                            get passive() {
                                return ((passiveSupported = true), false);
                            },
                        };
                        (window.addEventListener("test", null, options), window.removeEventListener("test", null, options));
                    } catch (e) {
                        passiveSupported = false;
                    }
                }
                return passiveSupported;
            }),
            (exports.isSupportedScreenSize = function (width) {
                if (!width && GObject.GSystem.hardware === GObject.GSystem.Hardware.Tablet) {
                    return (window.screen.height > window.screen.width ? window.screen.height : window.screen.width) >= MIN_SUPPORTED_SCREEN_SIZE;
                }
                return (width || window.screen.availWidth) >= MIN_SUPPORTED_SCREEN_SIZE;
            }),
            (exports.isSymbol = isSymbol),
            (exports.isSymbolInstance = void 0),
            (exports.iterateAroundIndex = function (list, startIndex, callback) {
                var o = 0,
                    i = 0,
                    length = list.length;
                for (; o < length; ) {
                    var r = startIndex + i;
                    (callback(list[r], r), o++, i > 0 && startIndex - i >= 0 ? (i = -i) : i > 0 ? i++ : startIndex - i + 1 < length ? (i = 1 - i) : i--);
                }
            }),
            (exports.iterateEqualStyleLayers = function (styleType, styleProperty, selectedLayers, callback) {
                var matches = [];
                if (selectedLayers.length > 1) {
                    for (var r = 0; r < selectedLayers.length; r++) {
                        var s = selectedLayers[r],
                            l = [];
                        if ("fill" === styleType) l = s.getPaintLayers().getFillLayers();
                        else if ("border" === styleType) l = s.getPaintLayers().getBorderLayers();
                        else if ("effect" === styleType) for (var c = s.getEffects().getFirstChild(); null !== c; c = c.getNext()) l.push(c);
                        for (var d = 0; d < l.length; d++) {
                            var u = l[d];
                            (("fill" === styleType && GObject.GStylable.FillPaintLayer.equals(u, styleProperty)) ||
                                ("border" === styleType && GObject.GStylable.BorderPaintLayer.equals(u, styleProperty)) ||
                                ("effect" === styleType && GObject.GUtil.equals(u, styleProperty))) &&
                                matches.push(u);
                        }
                    }
                    matches.forEach(function (match) {
                        callback(match);
                    });
                } else callback(styleProperty);
            }),
            (exports.mergeNode = mergeNode),
            (exports.releaseChanges = function (editor, parents, scene) {
                parents &&
                    parents.forEach((parent) => {
                        parent.endUpdate();
                    });
                editor && editor._finishSelectionUpdate();
                for (var argsLength = arguments.length, elements = new Array(argsLength > 3 ? argsLength - 3 : 0), a = 3; a < argsLength; a++) elements[a - 3] = arguments[a];
                elements &&
                    elements.forEach((element) => {
                        element.endUpdate();
                    });
                scene && scene.endBlockReferenceChanges();
            }),
            (exports.removeAllSuffixWhichLikeExtension = function (fileName, extension) {
                const suffix = ".".concat(extension).toLowerCase();
                for (; fileName.toLowerCase().endsWith(suffix); ) fileName = fileName.substr(0, fileName.lastIndexOf("."));
                return fileName;
            }),
            (exports.resolveDocumentImages = function (node, timeout) {
                let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return new Promise(async (resolve, reject) => {
                    const isImageSettled = (status) => status === GObject.GImage.ImageStatus.Loaded || status === GObject.GImage.ImageStatus.Error;
                    let s = 0;
                    if (
                        (node.accept((element) => {
                            element instanceof GObject.GImage && !isImageSettled(element.getStatus()) && s++;
                        }),
                        s > 0)
                    ) {
                        let timeoutId = setTimeout(() => {
                            (s > 0 || options.cancelled) && (node.removeEventListener(GObject.GImage.StatusEvent, onStatusChange), reject());
                        }, timeout);
                        const onStatusChange = (event) => {
                            let { status } = event;
                            (isImageSettled(status) &&
                                --s <= 0 &&
                                (timeoutId && (clearTimeout(timeoutId), (timeoutId = null)), node.removeEventListener(GObject.GImage.StatusEvent, onStatusChange), resolve(true)),
                                options.cancelled && (timeoutId && (clearTimeout(timeoutId), (timeoutId = null)), node.removeEventListener(GObject.GImage.StatusEvent, onStatusChange), reject()));
                        };
                        node.addEventListener(GObject.GImage.StatusEvent, onStatusChange);
                    } else resolve(true);
                });
            }),
            (exports.saveBBoxes = function (node) {
                var boundingBoxes = [];
                node.accept(function (element) {
                    if (element instanceof GObject.GElement) {
                        var bbox = element.getPaintBBox(false, null, true);
                        boundingBoxes.push(bbox);
                    }
                });
                for (var serializedData = new Float64Array(4 * boundingBoxes.length), o = 0; o < boundingBoxes.length; ++o)
                    for (var a = GObject.GRect.serialize(boundingBoxes[o]), r = 0; r < 4; ++r) serializedData[4 * o + r] = a[r];
                ((fileName = "Test_invisible-.dat"),
                    (fileData = serializedData),
                    navigator.webkitTemporaryStorage.requestQuota(1e3, function (grantedBytes) {
                        var bytes = grantedBytes;
                        (console.log("Requested bytes:", 1e3, "Granted bytes:", bytes),
                            window.webkitRequestFileSystem(
                                window.TEMPORARY,
                                bytes,
                                function (fileSystem) {
                                    const rootUrl = fileSystem.root.toURL();
                                    window.webkitResolveLocalFileSystemURL(
                                        rootUrl,
                                        function (dirEntry) {
                                            dirEntry.getFile(fileName, { create: true }, function (fileEntry) {
                                                fileEntry.createWriter(
                                                    function (fileWriter) {
                                                        ((fileWriter.onwriteend = function () {
                                                            console.log("Write completed.");
                                                        }),
                                                            (fileWriter.onerror = function (event) {
                                                                console.log("Write failed: " + event.toString());
                                                            }),
                                                            fileWriter.seek(0));
                                                        var blob = new Blob([fileData.buffer], {
                                                            type: "application/octet-stream",
                                                        });
                                                        fileWriter.write(blob);
                                                    },
                                                    function (error) {
                                                        console.log(error);
                                                    }
                                                );
                                            });
                                        },
                                        function (error) {
                                            console.log(error);
                                        }
                                    );
                                },
                                function (error) {
                                    console.log(error);
                                }
                            ));
                    }));
                var fileName, fileData;
            }),
            (exports.sleep = function (ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }),
            (exports.stringToBase64String = function (text) {
                return base64.fromByteArray(encodeUtf8String(text));
            }),
            (exports.throttle = function (func, wait) {
                let throttled;
                return function () {
                    const args = arguments;
                    throttled || (func.apply(this, args), (throttled = true), setTimeout(() => (throttled = false), wait));
                };
            }),
            (exports.toCapitalize = function (text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            }),
            (exports.toMD5 = function (text) {
                return CryptoJS.MD5(text).toString();
            }),
            (exports.trimStart = function (text, prefix) {
                if (!prefix || !prefix.length) return text;
                if (!text || !text.startsWith(prefix)) return text;
                return text.substring(prefix.length);
            }),
            (exports.watchDog = void 0),
            require(58 /* polyfill:Array */),
            require(19),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(30 /* polyfill:Object */),
            require(8 /* Symbol */),
            require(356 /* polyfill:RegExp */),
            require(20 /* polyfill:RegExp */),
            require(3),
            require(271 /* polyfill:String */),
            require(71 /* polyfill:String */),
            require(151),
            require(134 /* polyfill:String */),
            require(1041),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(97),
            require(33));
        var GObject = require(1),
            a = _interopRequireDefault(require(84)),
            base64Url = require(1042);
        const CryptoJS = require(1043);
        var base64 = require(250),
            GSystemDialog = require(44);
        const GShareRoleFactory = require(433),
            { HAS_ANNOTATIONS, MIN_SUPPORTED_SCREEN_SIZE } = require(10 /* designerConfig */);
        exports.watchDog = {
            trap: (handler, bypassCheck, onBlocked, featureFlag) => (event) =>
                ((event, handler, bypassCheck, onBlocked, featureFlag) =>
                    gDesigner.isEnabledProFeatures(featureFlag) || (bypassCheck && bypassCheck(event))
                        ? handler
                            ? handler(event)
                            : void 0
                        : (onBlocked && onBlocked(event), event.stopImmediatePropagation(), event.preventDefault(), gDesigner.handlePROFeatureInterruption(), false))(
                    event,
                    handler,
                    bypassCheck,
                    onBlocked,
                    featureFlag
                ),
            check: (proValue, fallbackValue) => (gDesigner.isEnabledProFeatures() ? proValue : fallbackValue),
        };
        exports._tryAndCatch = async (action) => {
            try {
                await action();
            } catch (e) {
                console.log(e);
            }
        };
        const encryptionKey = CryptoJS.enc.Latin1.parse(CryptoJS.enc.Latin1.stringify(CryptoJS.SHA256("#a09j!@10jas-109827s*%#1098XAapoc-9908#!123")));
        function isSymbol(node, requireInstance) {
            const isSymbolNode = (candidate) => candidate && candidate instanceof GObject.GSymbol && (!requireInstance || !candidate.isMaster());
            return !!isSymbolNode(node) || !!node.findParent(isSymbolNode);
        }
        function decodeUtf8Bytes(bytes) {
            return new TextDecoder("utf-8").decode(bytes);
        }
        function encodeUtf8String(text) {
            return new TextEncoder("utf-8").encode(text);
        }
        exports.isSymbolInstance = (node) => isSymbol(node, true);
        function areNodePropertiesDifferent(nodeA, nodeB) {
            let excludedProps = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            const getCustomProps = (obj) =>
                    Object.keys(obj)
                        .filter((key) => (key.startsWith("$") || key.startsWith("@")) && !excludedProps.includes(key))
                        .map((key) => key.slice(1)),
                keysA = getCustomProps(nodeA),
                keysB = getCustomProps(nodeB);
            return !GObject.GUtil.equals(keysA, keysB) || !nodeA.arePropertiesEqual(nodeB, keysA);
        }
        function isDifferent(nodeA, nodeB, excludedProps) {
            if ((excludedProps || (excludedProps = ["$lmd", "$storedUrl", "$__ids"]), !(nodeA instanceof nodeB.constructor))) return true;
            if (nodeA.hasMixin(GObject.GNode.Properties) !== nodeB.hasMixin(GObject.GNode.Properties)) return true;
            if (nodeA.hasMixin(GObject.GNode.Properties) && areNodePropertiesDifferent(nodeA, nodeB, excludedProps)) return true;
            if (nodeA.hasMixin(GObject.GElement.Stylable) !== nodeB.hasMixin(GObject.GElement.Stylable)) return true;
            if (nodeA.hasMixin(GObject.GElement.Stylable)) {
                const effectsA = nodeA.getEffects(),
                    effectsB = nodeB.getEffects();
                if (Boolean(effectsA) !== Boolean(effectsB)) return true;
                if (effectsA && isDifferent(effectsA, effectsB, excludedProps)) return true;
                const paintLayersA = nodeA.getPaintLayers(),
                    paintLayersB = nodeB.getPaintLayers();
                if (Boolean(paintLayersA) !== Boolean(paintLayersB)) return true;
                if (paintLayersA && isDifferent(paintLayersA, paintLayersB, excludedProps)) return true;
            }
            if (nodeA.hasMixin(GObject.GNode.Container) !== nodeB.hasMixin(GObject.GNode.Container)) return true;
            if (nodeA instanceof GObject.GPathBase != nodeB instanceof GObject.GPathBase) return true;
            if (nodeA instanceof GObject.GPathBase) {
                var anchorPointsA = nodeA.getAnchorPoints(),
                    pointsA = anchorPointsA.getChildren(),
                    anchorPointsB = nodeB.getAnchorPoints(),
                    pointsB = anchorPointsB.getChildren();
                if (pointsA.length !== pointsB.length) return true;
                for (var l = 0; l < pointsA.length; l++) {
                    var c = anchorPointsA.getChildByIndex(l),
                        d = anchorPointsB.getChildByIndex(l);
                    if (c ^ d) return true;
                    if (areNodePropertiesDifferent(c, d, excludedProps)) return true;
                }
            }
            if (nodeA.hasMixin(GObject.GNode.Container)) {
                const childrenA = nodeA.getChildren(),
                    childrenB = nodeB.getChildren();
                if (childrenA.length !== childrenB.length) return true;
                for (let e = 0; e < childrenA.length; e++) if (isDifferent(childrenA[e], childrenB[e], excludedProps)) return true;
            }
            return false;
        }
        function mergeNode(target, source) {
            try {
                (mergeStyle(target, source), mergePath(target, source), mergeChildren(target, source), mergeProperties(target, source));
            } catch (e) {
                console.log(e, e && e.stack);
            }
        }
        function mergeProperties(target, source) {
            const propNames = (function (obj) {
                const excludeKeys = [];
                return Object.keys(obj)
                    .filter((key) => key.startsWith("$") && !excludeKeys.includes(key))
                    .map((key) => key.slice(1));
            })(source);
            target.setProperties(propNames, source.getProperties(propNames));
        }
        function mergeStyle(target, source) {
            if (target.hasMixin(GObject.GElement.Stylable)) {
                var targetPaintLayers = target.getPaintLayers(),
                    sourcePaintLayers = source.getPaintLayers(),
                    targetBorderLayers = targetPaintLayers.getBorderLayers(),
                    sourceBorderLayers = sourcePaintLayers.getBorderLayers(),
                    targetFillLayers = targetPaintLayers.getFillLayers(),
                    sourceFillLayers = sourcePaintLayers.getFillLayers();
                target.hasMixin(a.default)
                    ? (sourceBorderLayers.length && targetBorderLayers.length && targetBorderLayers[0].assignFrom(sourceBorderLayers[0]), sourceFillLayers.length && targetFillLayers.length && targetFillLayers[0].assignFrom(sourceFillLayers[0]))
                    : (targetBorderLayers.forEach((targetBorder) => {
                          var sourceBorder = sourceBorderLayers.find((sourceBorder) => sourceBorder.getId() === targetBorder.getId());
                          sourceBorder && targetBorder.assignFrom(sourceBorder);
                      }),
                      targetFillLayers.forEach((targetFill) => {
                          var sourceFill = sourceFillLayers.find((sourceFill) => sourceFill.getId() === targetFill.getId());
                          sourceFill && targetFill.assignFrom(sourceFill);
                      }));
            }
        }
        function mergePath(target, source) {
            if (target instanceof GObject.GPathBase) {
                var targetPoints = target.getAnchorPoints();
                (targetPoints.beginUpdate(), targetPoints.clearChildren(), targetPoints.deserialize(source.getAnchorPoints().serialize()), targetPoints.endUpdate());
            }
        }
        function mergeChildren(target, source) {
            if (!target.hasMixin(GObject.GNode.Container)) return;
            let targetChildren = target.getChildren(),
                sourceChildren = source.getChildren();
            (removeDeletedChildren(target, source), cloneChildrenIntoReceiver(target, source), updateCommonChildren(targetChildren, sourceChildren));
        }
        function removeDeletedChildren(target, source) {
            let targetChildren = target.getChildren(),
                sourceChildren = source.getChildren();
            targetChildren.forEach((child) => {
                sourceChildren.some((sourceChild) => sourceChild.getId() === child.getId()) || target.removeChild(child);
            });
        }
        function cloneChildrenIntoReceiver(target, source) {
            for (var sourceChild = source.getLastChild(); null !== sourceChild; sourceChild = sourceChild.getPrevious()) {
                if (target.getChildren().some((targetChild) => targetChild.getId() === sourceChild.getId())) continue;
                let nextSourceChild = sourceChild.getNext(),
                    insertBeforeNode = nextSourceChild && target.getChildren().find((targetChild) => targetChild.getId() === nextSourceChild.getId());
                target.insertChild(sourceChild.clone(), insertBeforeNode);
            }
        }
        function updateCommonChildren(targetChildren, sourceChildren) {
            targetChildren.forEach((targetChild) => {
                let sourceChild = sourceChildren.find((child) => child.getId() === targetChild.getId());
                sourceChild && isDifferent(targetChild, sourceChild) && mergeNode(targetChild, sourceChild);
            });
        }
        let passiveSupported;
        exports.chaining = (firstFn, secondFn) => () => firstFn() && secondFn();
    };
