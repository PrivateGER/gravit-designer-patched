module.exports = function (module, exports, require) {
        "use strict";
        (require(91), require(842));
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports._cloneChildrenIntoReceiver = E),
            (exports._mergeChildren = x),
            (exports._mergePath = C),
            (exports._mergeProperties = b),
            (exports._mergeStyle = w),
            (exports._removeDeletedChildren = S),
            (exports._tryAndCatch = void 0),
            (exports._updateCommonChildren = A),
            (exports.areNodePropertiesDifferent = y),
            (exports.base64StringToString = function (e) {
                let t;
                try {
                    t = f(l.toByteArray(e));
                } catch (e) {
                    t = "";
                }
                return t;
            }),
            (exports.base64URLSafeEncode = function (e) {
                return (0, r.trim)((0, r.encode)(e));
            }),
            (exports.blockChanges = function (e, t, n, o) {
                n && n.startBlockReferenceChanges();
                o && o.beginUpdate();
                e && e._beginSelectionUpdate();
                t &&
                    t.forEach((e) => {
                        e.beginUpdate();
                    });
            }),
            (exports.buildDialogDocumentHasUpdates = function (e, t, n, o) {
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
                                o && o.call(this, e);
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "has-new-version-when-save-reload")),
                            closeOnClick: true,
                            onclick: () => {
                                (gDesigner.getToolbar()._updateActions(), t.call(this, e));
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "has-new-version-when-save-save")),
                            className: "primary",
                            closeOnClick: true,
                            shortcut: GSystemDialog.Shortcut.Enter,
                            onclick: () => {
                                n.call(this, e);
                            },
                        },
                    ],
                });
            }),
            (exports.chaining = void 0),
            (exports.debounce = function (e, t) {
                let n;
                return function () {
                    const o = arguments;
                    let i = () => {
                        ((n = 0), e.apply(this, o));
                    };
                    (n && clearTimeout(n), (n = setTimeout(i, t)));
                };
            }),
            (exports.decodeFromUTF8 = f),
            (exports.decodeHTML = function (e) {
                return $("<textarea/>").html(e).text();
            }),
            (exports.decrypt = function (e) {
                try {
                    var t = e.split(":"),
                        n = t.shift(),
                        o = s.enc.Hex.parse(n),
                        i = t.join(":");
                    return s.AES.decrypt(i, g, {
                        iv: o,
                        format: s.format.OpenSSL,
                        mode: s.mode.CBC,
                    }).toString(s.enc.Utf8);
                } catch (e) {
                    return;
                }
            }),
            (exports.encodeToUTF8 = m),
            (exports.encrypt = function (e) {
                try {
                    var t = s.lib.WordArray.random(32),
                        n = s.AES.encrypt(e, g, {
                            iv: t,
                            format: s.format.OpenSSL,
                            mode: s.mode.CBC,
                        });
                    return t.toString(s.enc.Hex) + ":" + n.toString();
                } catch (e) {
                    return;
                }
            }),
            (exports.fakeFunction = function () {}),
            (exports.getAnnotationType = function (e) {
                let t = e
                    .toString()
                    .match(
                        /\[G((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)Annotation\]/
                    );
                return (t && t[1]) || null;
            }),
            (exports.getExtensionFromString = function (e, t) {
                var n = new RegExp("\\b" + t.join("|") + "\\b", "gim"),
                    o = e.match(n);
                return o ? o[0] : null;
            }),
            (exports.getFileNameWithoutExtension = function (e, t) {
                e.toLowerCase().endsWith(".".concat(t).toLowerCase()) && (e = e.substr(0, e.lastIndexOf(".")));
                return e;
            }),
            (exports.getFileSHA256Digest = async function (e) {
                e instanceof Blob ? (e = await e.arrayBuffer()) : "string" == typeof e && (e = m(e));
                return s
                    .SHA256(
                        (function (e) {
                            for (var t = new Uint8Array(e), n = [], o = 0; o < t.length; o += 4)
                                n.push((t[o] << 24) | (t[o + 1] << 16) | (t[o + 2] << 8) | t[o + 3]);
                            return s.lib.WordArray.create(n, t.length);
                        })(e)
                    )
                    .toString();
            }),
            (exports.getFileStateAndRole = function (e, t) {
                let n,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                const i = t.getPrivateShareList();
                i.forEach((t) => {
                    const { id: i, copy: a, inspect: r, comment: s, owner: l, access: c, edit: p } = t;
                    e.getUID() === i
                        ? ((n = d.makeFromShare(t)),
                          l
                              ? Object.assign(o, {
                                    owner: true,
                                    edit: true,
                                    inspect: true,
                                    copy: true,
                                    comment: !!u,
                                    share: true,
                                })
                              : Object.assign(o, {
                                    owner: false,
                                    share: false,
                                    edit: p,
                                    copy: a,
                                    inspect: r,
                                    comment: !!u && s,
                                    sharing: c,
                                }))
                        : c && Object.assign(o, { sharing: true });
                });
                const a = i.find((e) => e.owner);
                if (a) {
                    const t = e.getUID() === a.id;
                    ((o.owner = t), (o.share = t));
                }
                const r = t.getPublicShare();
                r && r.access && ((o.isPrivate = false), (o.sharing = true));
                return (
                    Object.assign(o, {
                        isPrivate: i && i.filter((e) => !e.owner).length > 0,
                    }),
                    { state: o, role: n, publicShare: r }
                );
            }),
            (exports.getSizeInfo = function (e) {
                var t = e;
                const n = 1e6,
                    o = 1e3 * n;
                var i = { gb: 0, mb: 0, kb: 0 },
                    a = Math.floor(t / o);
                a && ((i.gb = a), (t -= a * o));
                var r = Math.floor(t / n);
                r && ((i.mb = r), (t -= r * n));
                var s = Math.floor(t / 1e3);
                s && ((i.kb = s), (t -= 1e3 * s));
                return i;
            }),
            (exports.getVersionFromString = function (e, t, n) {
                var o = e.match(t.join("|"));
                return o ? o[0] : n;
            }),
            (exports.isDifferent = v),
            (exports.isFunction = function (e) {
                if (void 0 === e) return false;
                var t = Object.prototype.toString.call(e);
                return ["[object Function]", "[object AsyncFunction]", "[object GeneratorFunction]", "[object Proxy]"].indexOf(t) >= 0;
            }),
            (exports.isPassiveSupported = function () {
                if (void 0 === T) {
                    T = false;
                    try {
                        const e = {
                            get passive() {
                                return ((T = true), false);
                            },
                        };
                        (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
                    } catch (e) {
                        T = false;
                    }
                }
                return T;
            }),
            (exports.isSupportedScreenSize = function (e) {
                if (!e && GObject.GSystem.hardware === GObject.GSystem.Hardware.Tablet) {
                    return (window.screen.height > window.screen.width ? window.screen.height : window.screen.width) >= p;
                }
                return (e || window.screen.availWidth) >= p;
            }),
            (exports.isSymbol = h),
            (exports.isSymbolInstance = void 0),
            (exports.iterateAroundIndex = function (e, t, n) {
                var o = 0,
                    i = 0,
                    a = e.length;
                for (; o < a; ) {
                    var r = t + i;
                    (n(e[r], r), o++, i > 0 && t - i >= 0 ? (i = -i) : i > 0 ? i++ : t - i + 1 < a ? (i = 1 - i) : i--);
                }
            }),
            (exports.iterateEqualStyleLayers = function (e, t, n, o) {
                var a = [];
                if (n.length > 1) {
                    for (var r = 0; r < n.length; r++) {
                        var s = n[r],
                            l = [];
                        if ("fill" === e) l = s.getPaintLayers().getFillLayers();
                        else if ("border" === e) l = s.getPaintLayers().getBorderLayers();
                        else if ("effect" === e) for (var c = s.getEffects().getFirstChild(); null !== c; c = c.getNext()) l.push(c);
                        for (var d = 0; d < l.length; d++) {
                            var u = l[d];
                            (("fill" === e && GObject.GStylable.FillPaintLayer.equals(u, t)) ||
                                ("border" === e && GObject.GStylable.BorderPaintLayer.equals(u, t)) ||
                                ("effect" === e && GObject.GUtil.equals(u, t))) &&
                                a.push(u);
                        }
                    }
                    a.forEach(function (e) {
                        o(e);
                    });
                } else o(t);
            }),
            (exports.mergeNode = _),
            (exports.releaseChanges = function (e, t, n) {
                t &&
                    t.forEach((e) => {
                        e.endUpdate();
                    });
                e && e._finishSelectionUpdate();
                for (var o = arguments.length, i = new Array(o > 3 ? o - 3 : 0), a = 3; a < o; a++) i[a - 3] = arguments[a];
                i &&
                    i.forEach((e) => {
                        e.endUpdate();
                    });
                n && n.endBlockReferenceChanges();
            }),
            (exports.removeAllSuffixWhichLikeExtension = function (e, t) {
                const n = ".".concat(t).toLowerCase();
                for (; e.toLowerCase().endsWith(n); ) e = e.substr(0, e.lastIndexOf("."));
                return e;
            }),
            (exports.resolveDocumentImages = function (e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return new Promise(async (o, a) => {
                    const r = (e) => e === GObject.GImage.ImageStatus.Loaded || e === GObject.GImage.ImageStatus.Error;
                    let s = 0;
                    if (
                        (e.accept((e) => {
                            e instanceof GObject.GImage && !r(e.getStatus()) && s++;
                        }),
                        s > 0)
                    ) {
                        let l = setTimeout(() => {
                            (s > 0 || n.cancelled) && (e.removeEventListener(GObject.GImage.StatusEvent, c), a());
                        }, t);
                        const c = (t) => {
                            let { status: d } = t;
                            (r(d) &&
                                --s <= 0 &&
                                (l && (clearTimeout(l), (l = null)), e.removeEventListener(GObject.GImage.StatusEvent, c), o(true)),
                                n.cancelled && (l && (clearTimeout(l), (l = null)), e.removeEventListener(GObject.GImage.StatusEvent, c), a()));
                        };
                        e.addEventListener(GObject.GImage.StatusEvent, c);
                    } else o(true);
                });
            }),
            (exports.saveBBoxes = function (e) {
                var t = [];
                e.accept(function (e) {
                    if (e instanceof GObject.GElement) {
                        var n = e.getPaintBBox(false, null, true);
                        t.push(n);
                    }
                });
                for (var n = new Float64Array(4 * t.length), o = 0; o < t.length; ++o)
                    for (var a = GObject.GRect.serialize(t[o]), r = 0; r < 4; ++r) n[4 * o + r] = a[r];
                ((s = "Test_invisible-.dat"),
                    (l = n),
                    navigator.webkitTemporaryStorage.requestQuota(1e3, function (e) {
                        var t = e;
                        (console.log("Requested bytes:", 1e3, "Granted bytes:", t),
                            window.webkitRequestFileSystem(
                                window.TEMPORARY,
                                t,
                                function (e) {
                                    const t = e.root.toURL();
                                    window.webkitResolveLocalFileSystemURL(
                                        t,
                                        function (e) {
                                            e.getFile(s, { create: true }, function (e) {
                                                e.createWriter(
                                                    function (e) {
                                                        ((e.onwriteend = function () {
                                                            console.log("Write completed.");
                                                        }),
                                                            (e.onerror = function (e) {
                                                                console.log("Write failed: " + e.toString());
                                                            }),
                                                            e.seek(0));
                                                        var t = new Blob([l.buffer], {
                                                            type: "application/octet-stream",
                                                        });
                                                        e.write(t);
                                                    },
                                                    function (e) {
                                                        console.log(e);
                                                    }
                                                );
                                            });
                                        },
                                        function (e) {
                                            console.log(e);
                                        }
                                    );
                                },
                                function (e) {
                                    console.log(e);
                                }
                            ));
                    }));
                var s, l;
            }),
            (exports.sleep = function (e) {
                return new Promise((t) => setTimeout(t, e));
            }),
            (exports.stringToBase64String = function (e) {
                return l.fromByteArray(m(e));
            }),
            (exports.throttle = function (e, t) {
                let n;
                return function () {
                    const o = arguments;
                    n || (e.apply(this, o), (n = true), setTimeout(() => (n = false), t));
                };
            }),
            (exports.toCapitalize = function (e) {
                return e.charAt(0).toUpperCase() + e.slice(1);
            }),
            (exports.toMD5 = function (e) {
                return s.MD5(e).toString();
            }),
            (exports.trimStart = function (e, t) {
                if (!t || !t.length) return e;
                if (!e || !e.startsWith(t)) return e;
                return e.substring(t.length);
            }),
            (exports.watchDog = void 0),
            require(58),
            require(19),
            require(180),
            require(181),
            require(30),
            require(8 /* Symbol */),
            require(356),
            require(20),
            require(3),
            require(271),
            require(71),
            require(151),
            require(134),
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
            a = o(require(84)),
            r = require(1042);
        const s = require(1043);
        var l = require(250),
            GSystemDialog = require(44);
        const d = require(433),
            { HAS_ANNOTATIONS: u, MIN_SUPPORTED_SCREEN_SIZE: p } = require(10 /* designerConfig */);
        exports.watchDog = {
            trap: (e, t, n, o) => (i) =>
                ((e, t, n, o, i) =>
                    gDesigner.isEnabledProFeatures(i) || (n && n(e))
                        ? t
                            ? t(e)
                            : void 0
                        : (o && o(e), e.stopImmediatePropagation(), e.preventDefault(), gDesigner.handlePROFeatureInterruption(), false))(
                    i,
                    e,
                    t,
                    n,
                    o
                ),
            check: (e, t) => (gDesigner.isEnabledProFeatures() ? e : t),
        };
        exports._tryAndCatch = async (e) => {
            try {
                await e();
            } catch (e) {
                console.log(e);
            }
        };
        const g = s.enc.Latin1.parse(s.enc.Latin1.stringify(s.SHA256("#a09j!@10jas-109827s*%#1098XAapoc-9908#!123")));
        function h(e, t) {
            const n = (e) => e && e instanceof GObject.GSymbol && (!t || !e.isMaster());
            return !!n(e) || !!e.findParent(n);
        }
        function f(e) {
            return new TextDecoder("utf-8").decode(e);
        }
        function m(e) {
            return new TextEncoder("utf-8").encode(e);
        }
        exports.isSymbolInstance = (e) => h(e, true);
        function y(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            const o = (e) =>
                    Object.keys(e)
                        .filter((e) => (e.startsWith("$") || e.startsWith("@")) && !n.includes(e))
                        .map((e) => e.slice(1)),
                a = o(e),
                r = o(t);
            return !GObject.GUtil.equals(a, r) || !e.arePropertiesEqual(t, a);
        }
        function v(e, t, n) {
            if ((n || (n = ["$lmd", "$storedUrl", "$__ids"]), !(e instanceof t.constructor))) return true;
            if (e.hasMixin(GObject.GNode.Properties) !== t.hasMixin(GObject.GNode.Properties)) return true;
            if (e.hasMixin(GObject.GNode.Properties) && y(e, t, n)) return true;
            if (e.hasMixin(GObject.GElement.Stylable) !== t.hasMixin(GObject.GElement.Stylable)) return true;
            if (e.hasMixin(GObject.GElement.Stylable)) {
                const o = e.getEffects(),
                    i = t.getEffects();
                if (Boolean(o) !== Boolean(i)) return true;
                if (o && v(o, i, n)) return true;
                const a = e.getPaintLayers(),
                    r = t.getPaintLayers();
                if (Boolean(a) !== Boolean(r)) return true;
                if (a && v(a, r, n)) return true;
            }
            if (e.hasMixin(GObject.GNode.Container) !== t.hasMixin(GObject.GNode.Container)) return true;
            if (e instanceof GObject.GPathBase != t instanceof GObject.GPathBase) return true;
            if (e instanceof GObject.GPathBase) {
                var o = e.getAnchorPoints(),
                    a = o.getChildren(),
                    r = t.getAnchorPoints(),
                    s = r.getChildren();
                if (a.length !== s.length) return true;
                for (var l = 0; l < a.length; l++) {
                    var c = o.getChildByIndex(l),
                        d = r.getChildByIndex(l);
                    if (c ^ d) return true;
                    if (y(c, d, n)) return true;
                }
            }
            if (e.hasMixin(GObject.GNode.Container)) {
                const o = e.getChildren(),
                    i = t.getChildren();
                if (o.length !== i.length) return true;
                for (let e = 0; e < o.length; e++) if (v(o[e], i[e], n)) return true;
            }
            return false;
        }
        function _(e, t) {
            try {
                (w(e, t), C(e, t), x(e, t), b(e, t));
            } catch (e) {
                console.log(e, e && e.stack);
            }
        }
        function b(e, t) {
            const n = (function (e) {
                const t = [];
                return Object.keys(e)
                    .filter((e) => e.startsWith("$") && !t.includes(e))
                    .map((e) => e.slice(1));
            })(t);
            e.setProperties(n, t.getProperties(n));
        }
        function w(e, t) {
            if (e.hasMixin(GObject.GElement.Stylable)) {
                var n = e.getPaintLayers(),
                    o = t.getPaintLayers(),
                    r = n.getBorderLayers(),
                    s = o.getBorderLayers(),
                    l = n.getFillLayers(),
                    c = o.getFillLayers();
                e.hasMixin(a.default)
                    ? (s.length && r.length && r[0].assignFrom(s[0]), c.length && l.length && l[0].assignFrom(c[0]))
                    : (r.forEach((e) => {
                          var t = s.find((t) => t.getId() === e.getId());
                          t && e.assignFrom(t);
                      }),
                      l.forEach((e) => {
                          var t = c.find((t) => t.getId() === e.getId());
                          t && e.assignFrom(t);
                      }));
            }
        }
        function C(e, t) {
            if (e instanceof GObject.GPathBase) {
                var n = e.getAnchorPoints();
                (n.beginUpdate(), n.clearChildren(), n.deserialize(t.getAnchorPoints().serialize()), n.endUpdate());
            }
        }
        function x(e, t) {
            if (!e.hasMixin(GObject.GNode.Container)) return;
            let n = e.getChildren(),
                o = t.getChildren();
            (S(e, t), E(e, t), A(n, o));
        }
        function S(e, t) {
            let n = e.getChildren(),
                o = t.getChildren();
            n.forEach((t) => {
                o.some((e) => e.getId() === t.getId()) || e.removeChild(t);
            });
        }
        function E(e, t) {
            for (var n = t.getLastChild(); null !== n; n = n.getPrevious()) {
                if (e.getChildren().some((e) => e.getId() === n.getId())) continue;
                let t = n.getNext(),
                    o = t && e.getChildren().find((e) => e.getId() === t.getId());
                e.insertChild(n.clone(), o);
            }
        }
        function A(e, t) {
            e.forEach((e) => {
                let n = t.find((t) => t.getId() === e.getId());
                n && v(e, n) && _(e, n);
            });
        }
        let T;
        exports.chaining = (e, t) => () => e() && t();
    };
