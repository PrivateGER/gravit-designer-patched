/*! For license information please see static.maintenance.js.LICENSE.txt */
var GravitDesigner = (function (e) {
    function t(t) {
        for (var n, r, s = t[0], l = t[1], c = t[2], d = 0, p = []; d < s.length; d++)
            ((r = s[d]), Object.prototype.hasOwnProperty.call(a, r) && a[r] && p.push(a[r][0]), (a[r] = 0));
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (u && u(t); p.length; ) p.shift()();
        return (i.push.apply(i, c || []), o());
    }
    function o() {
        for (var e, t = 0; t < i.length; t++) {
            for (var o = i[t], n = !0, s = 1; s < o.length; s++) {
                var l = o[s];
                0 !== a[l] && (n = !1);
            }
            n && (i.splice(t--, 1), (e = r((r.s = o[0]))));
        }
        return e;
    }
    var n = {},
        a = { 11: 0 },
        i = [];
    function r(t) {
        if (n[t]) return n[t].exports;
        var o = (n[t] = { i: t, l: !1, exports: {} });
        return (e[t].call(o.exports, o, o.exports, r), (o.l = !0), o.exports);
    }
    ((r.m = e),
        (r.c = n),
        (r.d = function (e, t, o) {
            r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
        }),
        (r.r = function (e) {
            ("undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 }));
        }),
        (r.t = function (e, t) {
            if ((1 & t && (e = r(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if ((r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var n in e)
                    r.d(
                        o,
                        n,
                        function (t) {
                            return e[t];
                        }.bind(null, n)
                    );
            return o;
        }),
        (r.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return (r.d(t, "a", t), t);
        }),
        (r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = "/"));
    var s = (this.webpackJsonpGravitDesigner = this.webpackJsonpGravitDesigner || []),
        l = s.push.bind(s);
    ((s.push = t), (s = s.slice()));
    for (var c = 0; c < s.length; c++) t(s[c]);
    var u = l;
    return (i.push([1359, 0]), o());
})([
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(199).PROPER,
            a = o(79),
            i = o(37),
            r = o(62),
            s = o(21),
            l = o(460),
            c = RegExp.prototype,
            u = c.toString,
            d = s(function () {
                return "/a/b" !== u.call({ source: "a", flags: "b" });
            }),
            p = n && "toString" !== u.name;
        (d || p) &&
            a(
                c,
                "toString",
                function () {
                    var e = i(this);
                    return "/" + r(e.source) + "/" + r(l(e));
                },
                { unsafe: !0 }
            );
    },
    function (e, t, o) {
        "use strict";
        o(668);
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        (o(618), o(627), o(628), o(629), o(630), o(631));
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(15);
        const a = o(519),
            i = o(520),
            r = o(231);
        ((a.GoogleTagManagerSettings = o(820)),
            (a.AUTO_SAVE_ENABLED = n.GPlatform.webBrowser !== n.GPlatform.constructor.WebBrowser.Safari),
            (a.DOMAIN = "corelvector.com"),
            (a.GA = { customDimensions: ["EWOSU", "token", "template", "preset"] }),
            (a.PURCHASE = { URL_TO_PRODUCT: { purchase_flow: 214093, purchase_flow_new: 220444 } }),
            (a.LEGACY_SHARE_DIALOG = !1),
            (a.ENABLE_COLLABORATION = !0),
            (a.FILE_REVIEW_ENABLED = !0),
            (a.ENABLE_REQUEST_ACCESS = !0),
            (a.ENABLE_GUEST_ACCESS = !0),
            (a.IN_APP_PURCHASE.WINDOWS.production = "ESDWINGRAVIT"),
            (a.IN_APP_PURCHASE.WINDOWS.beta = "ESDWINGRAVIT"),
            (a.IN_APP_PURCHASE.WINDOWS.lts = "ESDWINGRAVIT"),
            (a.IN_APP_PURCHASE.WINDOWS.rc = "GravitDesignerSubscription-rc"),
            (a.IN_APP_PURCHASE.WINDOWS.trunk = "GravitDesignerSubscription-trunk"),
            (a.IN_APP_PURCHASE.CLEVERBRIDGE.openCartInAPopup = !0),
            (a.websocketURL = "wss://ws.corelvector.com"),
            (a.trunkWebsocketURL = "wss://ws-trunk.corelvector.com"),
            (a.rcWebsocketURL = "wss://ws-staging.corelvector.com"),
            (a.betaWebsocketURL = "wss://ws-preview.corelvector.com"),
            (a.cloudURL = "https://cloud.corelvector.com"),
            (a.cloudTrunkURL = "https://cloud-trunk.corelvector.com"),
            (a.cloudBetaURL = "https://cloud-preview.corelvector.com"),
            (a.cloudRCURL = "https://cloud-staging.corelvector.com"),
            (a.trunkURL = "https://app-trunk.corelvector.com"),
            (a.betaURL = "https://app-preview.corelvector.com"),
            (a.ltsURL = "https://app-lts.corelvector.com"),
            (a.rcURL = "https://app-staging.corelvector.com"),
            (a.prodURL = "https://app.corelvector.com"),
            (a.domain = "corelvector.com"),
            (a.gApi = o(417)),
            (a.DateAPI = o(209).DateAPI),
            (a.GLocaleFactory = o(209).GLocale),
            (a.defaultUserSettings = o(253)),
            (a.i18n = {
                trunk: "https://d2mocl49mz6ak6.cloudfront.net/trunk/locale",
                staging: "https://d2mocl49mz6ak6.cloudfront.net/staging/locale",
                preview: "https://d2mocl49mz6ak6.cloudfront.net/preview/locale",
                production: "https://d2mocl49mz6ak6.cloudfront.net/production/locale",
            }),
            (a.SharePermissions = o(352)),
            (a.ShareRoles = o(287)),
            (a.Share = o(575)),
            (a.Lock = o(579)),
            (a.FileExtended = o(574)),
            (a.FileTypes = o(825)),
            (a.MicrosoftB2BKeyType = o(826)),
            (a.PaymentProviders = o(577)),
            (a.PurchaseStatus = o(827)),
            (a.SubscriptionStatus = o(828)),
            (a.PasswordlessAuthenticationActions = o(580)),
            (a.PasswordRules = o(581)),
            (a.License = o(829)),
            (a.LicenseType = o(430)),
            (a.Runtime = o(582)),
            (a.User = o(830)),
            (a.CloudUtils = o(254)),
            (a.UTM = o(354)),
            r.IS_WEB_WORKER ||
                ((a.GLoginDialog = o(270).GLoginDialog),
                (a.GReminderDialogFactory = o(270).GReminderDialogFactory),
                (a.GReminderDialog = o(270).GReminderDialog),
                (a.GPaywallDialog = o(270).GPaywallDialog)),
            (a.PRESET_LIMIT = 20),
            (a.CATEGORIES = o(831)),
            (a.ELEMENTS = o(832)),
            (a.GooglePickerBuilder = o(833)),
            (a.HAS_ANNOTATIONS = !0),
            (a.ANNOTATION_PERMANENT_LINK = !0),
            (a.ANONYMOUS_SESSION_ENABLED = !0),
            (a.USE_EXTENSION_IN_FILENAME = !1),
            (a.ALWAYS_SHOW_ACCOUNT_SETTING_DIALOG = !1),
            (a.Notification = o(834)),
            (a.NotificationConstants = o(585)),
            (a.FileStatus = o(586)),
            (a.FileReviewStatusAvailable = [
                a.FileStatus.IN_REVIEW,
                a.FileStatus.REOPENED,
                a.FileStatus.AWAITING_APPROVAL,
                a.FileStatus.APPROVED,
            ]),
            (a.GFileReviewFlow = o(835)),
            (a.GFileReviewActions = o(836)));
        const s = o(583);
        ((a.NOTIFICATION_USER_MENTION_REGEX = s.NOTIFICATION.USER_MENTION),
            (a.HTTP_STATUS_CODES = o(578)),
            (a.CloudIntegration = {
                cloudOptions: [{ name: "Google Drive", type: "googledrive", className: "google-drive", pro: !0, default: !1 }],
                nativeOption: { type: "native", name: "Corel Vector", deletable: !1, pro: !1, id: i.Provider.CloudNative, default: !0 },
            }),
            (a.PAGE_CLIP_DEFAULT = !0),
            (a.msTeamsMode = !1),
            (a.thirdPartyCookieWarningLink = "https://support.corelvector.com/hc/en-us/articles/1500005394122"),
            (a.LINKS.BLENDING_MODES_DOCUMENTATION_URL = "https://documentation.corelvector.com/colors-gradients-textures/blending-modes"),
            (a.AmplitudeHelper = o(584)),
            (a.AmplitudeData = o(431)),
            (e.exports = a));
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        o(679);
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(184),
            a = o(360),
            i = o(203),
            r = o(80),
            s = o(88).f,
            l = o(418),
            c = o(252),
            u = o(74),
            d = o(49),
            p = r.set,
            h = r.getterFor("Array Iterator");
        e.exports = l(
            Array,
            "Array",
            function (e, t) {
                p(this, { type: "Array Iterator", target: n(e), index: 0, kind: t });
            },
            function () {
                var e = h(this),
                    t = e.target,
                    o = e.index++;
                if (!t || o >= t.length) return ((e.target = null), c(void 0, !0));
                switch (e.kind) {
                    case "keys":
                        return c(o, !1);
                    case "values":
                        return c(t[o], !1);
                }
                return c([o, t[o]], !1);
            },
            "values"
        );
        var g = (i.Arguments = i.Array);
        if ((a("keys"), a("values"), a("entries"), !u && d && "values" !== g.name))
            try {
                s(g, "name", { value: "values" });
            } catch (e) {}
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(306);
        n({ target: "RegExp", proto: !0, forced: /./.exec !== a }, { exec: a });
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            try {
                return !!e();
            } catch (e) {
                return !0;
            }
        };
    },
    ,
    function (e, t, o) {
        "use strict";
        (function (t) {
            var o = function (e) {
                return e && e.Math === Math && e;
            };
            e.exports =
                o("object" == typeof globalThis && globalThis) ||
                o("object" == typeof window && window) ||
                o("object" == typeof self && self) ||
                o("object" == typeof t && t) ||
                o("object" == typeof this && this) ||
                (function () {
                    return this;
                })() ||
                Function("return this")();
        }).call(this, o(109));
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(222).f,
            i = o(100),
            r = o(79),
            s = o(298),
            l = o(341),
            c = o(277);
        e.exports = function (e, t) {
            var o,
                u,
                d,
                p,
                h,
                g = e.target,
                f = e.global,
                m = e.stat;
            if ((o = f ? n : m ? n[g] || s(g, {}) : n[g] && n[g].prototype))
                for (u in t) {
                    if (
                        ((p = t[u]),
                        (d = e.dontCallGetSet ? (h = a(o, u)) && h.value : o[u]),
                        !c(f ? u : g + (m ? "." : "#") + u, e.forced) && void 0 !== d)
                    ) {
                        if (typeof p == typeof d) continue;
                        l(p, d);
                    }
                    ((e.sham || (d && d.sham)) && i(p, "sham", !0), r(o, u, p, e));
                }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(421),
            i = o(422),
            r = o(19),
            s = o(100),
            l = o(137),
            c = o(43)("iterator"),
            u = r.values,
            d = function (e, t) {
                if (e) {
                    if (e[c] !== u)
                        try {
                            s(e, c, u);
                        } catch (t) {
                            e[c] = u;
                        }
                    if ((l(e, t, !0), a[t]))
                        for (var o in r)
                            if (e[o] !== r[o])
                                try {
                                    s(e, o, r[o]);
                                } catch (t) {
                                    e[o] = r[o];
                                }
                }
            };
        for (var p in a) d(n[p] && n[p].prototype, p);
        d(i, "DOMTokenList");
    },
    function (e, t, o) {
        "use strict";
        var n = o(239),
            a = Function.prototype,
            i = a.call,
            r = n && a.bind.bind(i, i);
        e.exports = n
            ? r
            : function (e) {
                  return function () {
                      return i.apply(e, arguments);
                  };
              };
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(239),
            a = Function.prototype.call;
        e.exports = n
            ? a.bind(a)
            : function () {
                  return a.apply(a, arguments);
              };
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(415);
        n({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== a }, { assign: a });
    },
    ,
    function (e, t, o) {
        "use strict";
        o(670);
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(421),
            i = o(422),
            r = o(671),
            s = o(100),
            l = function (e) {
                if (e && e.forEach !== r)
                    try {
                        s(e, "forEach", r);
                    } catch (t) {
                        e.forEach = r;
                    }
            };
        for (var c in a) a[c] && l(n[c] && n[c].prototype);
        l(i);
    },
    function (e, t, o) {
        "use strict";
        var n = o(200),
            a = o(29),
            i = o(27),
            r = o(278),
            s = o(21),
            l = o(37),
            c = o(35),
            u = o(46),
            d = o(130),
            p = o(117),
            h = o(62),
            g = o(92),
            f = o(308),
            m = o(145),
            x = o(667),
            y = o(279),
            b = o(43)("replace"),
            w = Math.max,
            v = Math.min,
            D = i([].concat),
            A = i([].push),
            C = i("".indexOf),
            E = i("".slice),
            S = "$0" === "a".replace(/./, "$0"),
            k = !!/./[b] && "" === /./[b]("a", "$0");
        r(
            "replace",
            function (e, t, o) {
                var i = k ? "$" : "$0";
                return [
                    function (e, o) {
                        var n = g(this),
                            i = u(e) ? m(e, b) : void 0;
                        return i ? a(i, e, n, o) : a(t, h(n), e, o);
                    },
                    function (e, a) {
                        var r = l(this),
                            s = h(e);
                        if ("string" == typeof a && -1 === C(a, i) && -1 === C(a, "$<")) {
                            var u = o(t, r, s, a);
                            if (u.done) return u.value;
                        }
                        var g = c(a);
                        g || (a = h(a));
                        var m,
                            b = r.global;
                        b && ((m = r.unicode), (r.lastIndex = 0));
                        for (var S, k = []; null !== (S = y(r, s)) && (A(k, S), b); ) {
                            "" === h(S[0]) && (r.lastIndex = f(s, p(r.lastIndex), m));
                        }
                        for (var _, T = "", P = 0, F = 0; F < k.length; F++) {
                            for (var R, I = h((S = k[F])[0]), G = w(v(d(S.index), s.length), 0), O = [], L = 1; L < S.length; L++)
                                A(O, void 0 === (_ = S[L]) ? _ : String(_));
                            var B = S.groups;
                            if (g) {
                                var N = D([I], O, G, s);
                                (void 0 !== B && A(N, B), (R = h(n(a, void 0, N))));
                            } else R = x(I, s, G, O, B, a);
                            G >= P && ((T += E(s, P, G) + R), (P = G + I.length));
                        }
                        return T + E(s, P);
                    },
                ];
            },
            !!s(function () {
                var e = /./;
                return (
                    (e.exec = function () {
                        var e = [];
                        return ((e.groups = { a: "7" }), e);
                    }),
                    "7" !== "".replace(e, "$<a>")
                );
            }) ||
                !S ||
                k
        );
    },
    function (e, t, o) {
        "use strict";
        var n = "object" == typeof document && document.all;
        e.exports =
            void 0 === n && void 0 !== n
                ? function (e) {
                      return "function" == typeof e || e === n;
                  }
                : function (e) {
                      return "function" == typeof e;
                  };
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(46),
            a = String,
            i = TypeError;
        e.exports = function (e) {
            if (n(e)) return e;
            throw new i(a(e) + " is not an object");
        };
    },
    function (e, t, o) {
        "use strict";
        o(680);
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        o(682);
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(296),
            i = o(61),
            r = o(258),
            s = o(295),
            l = o(398),
            c = n.Symbol,
            u = a("wks"),
            d = l ? c.for || c : (c && c.withoutSetter) || r;
        e.exports = function (e) {
            return (i(u, e) || (u[e] = s && i(c, e) ? c[e] : d("Symbol." + e)), u[e]);
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(35);
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : n(e);
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(21);
        e.exports = !n(function () {
            return (
                7 !==
                Object.defineProperty({}, 1, {
                    get: function () {
                        return 7;
                    },
                })[1]
            );
        });
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(678);
        n({ global: !0, forced: parseInt !== a }, { parseInt: a });
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(403).includes,
            i = o(21),
            r = o(360);
        (n(
            {
                target: "Array",
                proto: !0,
                forced: i(function () {
                    return !Array(1).includes();
                }),
            },
            {
                includes: function (e) {
                    return a(this, e, arguments.length > 1 ? arguments[1] : void 0);
                },
            }
        ),
            r("includes"));
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(93),
            i = n({}.hasOwnProperty);
        e.exports =
            Object.hasOwn ||
            function (e, t) {
                return i(a(e), t);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(131),
            a = String;
        e.exports = function (e) {
            if ("Symbol" === n(e)) throw new TypeError("Cannot convert a Symbol value to a string");
            return a(e);
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(35),
            a = o(185),
            i = TypeError;
        e.exports = function (e) {
            if (n(e)) return e;
            throw new i(a(e) + " is not a function");
        };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(27),
            i = o(361),
            r = o(92),
            s = o(62),
            l = o(362),
            c = a("".indexOf);
        n(
            { target: "String", proto: !0, forced: !l("includes") },
            {
                includes: function (e) {
                    return !!~c(s(r(this)), s(i(e)), arguments.length > 1 ? arguments[1] : void 0);
                },
            }
        );
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        e.exports = !1;
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(35),
            a = o(88),
            i = o(401),
            r = o(298);
        e.exports = function (e, t, o, s) {
            s || (s = {});
            var l = s.enumerable,
                c = void 0 !== s.name ? s.name : t;
            if ((n(o) && i(o, c, s), s.global)) l ? (e[t] = o) : r(t, o);
            else {
                try {
                    s.unsafe ? e[t] && (l = !0) : delete e[t];
                } catch (e) {}
                l ? (e[t] = o) : a.f(e, t, { value: o, enumerable: !1, configurable: !s.nonConfigurable, writable: !s.nonWritable });
            }
            return e;
        };
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r = o(452),
            s = o(23),
            l = o(46),
            c = o(100),
            u = o(61),
            d = o(297),
            p = o(300),
            h = o(259),
            g = s.TypeError,
            f = s.WeakMap;
        if (r || d.state) {
            var m = d.state || (d.state = new f());
            ((m.get = m.get),
                (m.has = m.has),
                (m.set = m.set),
                (n = function (e, t) {
                    if (m.has(e)) throw new g("Object already initialized");
                    return ((t.facade = e), m.set(e, t), t);
                }),
                (a = function (e) {
                    return m.get(e) || {};
                }),
                (i = function (e) {
                    return m.has(e);
                }));
        } else {
            var x = p("state");
            ((h[x] = !0),
                (n = function (e, t) {
                    if (u(e, x)) throw new g("Object already initialized");
                    return ((t.facade = e), c(e, x, t), t);
                }),
                (a = function (e) {
                    return u(e, x) ? e[x] : {};
                }),
                (i = function (e) {
                    return u(e, x);
                }));
        }
        e.exports = {
            set: n,
            get: a,
            has: i,
            enforce: function (e) {
                return i(e) ? a(e) : n(e, {});
            },
            getterFor: function (e) {
                return function (t) {
                    var o;
                    if (!l(t) || (o = a(t)).type !== e) throw new g("Incompatible receiver, " + e + " required");
                    return o;
                };
            },
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(399),
            i = o(400),
            r = o(37),
            s = o(294),
            l = TypeError,
            c = Object.defineProperty,
            u = Object.getOwnPropertyDescriptor;
        t.f = n
            ? i
                ? function (e, t, o) {
                      if (
                          (r(e),
                          (t = s(t)),
                          r(o),
                          "function" == typeof e && "prototype" === t && "value" in o && "writable" in o && !o.writable)
                      ) {
                          var n = u(e, t);
                          n &&
                              n.writable &&
                              ((e[t] = o.value),
                              (o = {
                                  configurable: "configurable" in o ? o.configurable : n.configurable,
                                  enumerable: "enumerable" in o ? o.enumerable : n.enumerable,
                                  writable: !1,
                              }));
                      }
                      return c(e, t, o);
                  }
                : c
            : function (e, t, o) {
                  if ((r(e), (t = s(t)), r(o), a))
                      try {
                          return c(e, t, o);
                      } catch (e) {}
                  if ("get" in o || "set" in o) throw new l("Accessors not supported");
                  return ("value" in o && (e[t] = o.value), e);
              };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(262).trim;
        n(
            { target: "String", proto: !0, forced: o(461)("trim") },
            {
                trim: function () {
                    return a(this);
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(194),
            a = TypeError;
        e.exports = function (e) {
            if (n(e)) throw new a("Can't call method on " + e);
            return e;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(92),
            a = Object;
        e.exports = function (e) {
            return a(n(e));
        };
    },
    function (e, t, o) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        function a(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }
        ((t.assign = function (e) {
            for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
                var o = t.shift();
                if (o) {
                    if ("object" != typeof o) throw new TypeError(o + "must be non-object");
                    for (var n in o) a(o, n) && (e[n] = o[n]);
                }
            }
            return e;
        }),
            (t.shrinkBuf = function (e, t) {
                return e.length === t ? e : e.subarray ? e.subarray(0, t) : ((e.length = t), e);
            }));
        var i = {
                arraySet: function (e, t, o, n, a) {
                    if (t.subarray && e.subarray) e.set(t.subarray(o, o + n), a);
                    else for (var i = 0; i < n; i++) e[a + i] = t[o + i];
                },
                flattenChunks: function (e) {
                    var t, o, n, a, i, r;
                    for (n = 0, t = 0, o = e.length; t < o; t++) n += e[t].length;
                    for (r = new Uint8Array(n), a = 0, t = 0, o = e.length; t < o; t++) ((i = e[t]), r.set(i, a), (a += i.length));
                    return r;
                },
            },
            r = {
                arraySet: function (e, t, o, n, a) {
                    for (var i = 0; i < n; i++) e[a + i] = t[o + i];
                },
                flattenChunks: function (e) {
                    return [].concat.apply([], e);
                },
            };
        ((t.setTyped = function (e) {
            e
                ? ((t.Buf8 = Uint8Array), (t.Buf16 = Uint16Array), (t.Buf32 = Int32Array), t.assign(t, i))
                : ((t.Buf8 = Array), (t.Buf16 = Array), (t.Buf32 = Array), t.assign(t, r));
        }),
            t.setTyped(n));
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(110),
            i = o(200),
            r = o(29),
            s = o(27),
            l = o(21),
            c = o(35),
            u = o(241),
            d = o(157),
            p = o(666),
            h = o(295),
            g = String,
            f = a("JSON", "stringify"),
            m = s(/./.exec),
            x = s("".charAt),
            y = s("".charCodeAt),
            b = s("".replace),
            w = s((1).toString),
            v = /[\uD800-\uDFFF]/g,
            D = /^[\uD800-\uDBFF]$/,
            A = /^[\uDC00-\uDFFF]$/,
            C =
                !h ||
                l(function () {
                    var e = a("Symbol")("stringify detection");
                    return "[null]" !== f([e]) || "{}" !== f({ a: e }) || "{}" !== f(Object(e));
                }),
            E = l(function () {
                return '"\\udf06\\ud834"' !== f("\udf06\ud834") || '"\\udead"' !== f("\udead");
            }),
            S = function (e, t) {
                var o = d(arguments),
                    n = p(t);
                if (c(n) || (void 0 !== e && !u(e)))
                    return (
                        (o[1] = function (e, t) {
                            if ((c(n) && (t = r(n, this, g(e), t)), !u(t))) return t;
                        }),
                        i(f, null, o)
                    );
            },
            k = function (e, t, o) {
                var n = x(o, t - 1),
                    a = x(o, t + 1);
                return (m(D, e) && !m(A, a)) || (m(A, e) && !m(D, n)) ? "\\u" + w(y(e, 0), 16) : e;
            };
        f &&
            n(
                { target: "JSON", stat: !0, arity: 3, forced: C || E },
                {
                    stringify: function (e, t, o) {
                        var n = d(arguments),
                            a = i(C ? S : f, null, n);
                        return E && "string" == typeof a ? b(a, v, k) : a;
                    },
                }
            );
    },
    function (e, t, o) {
        "use strict";
        o(684);
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(88),
            i = o(174);
        e.exports = n
            ? function (e, t, o) {
                  return a.f(e, t, i(1, o));
              }
            : function (e, t, o) {
                  return ((e[t] = o), e);
              };
    },
    function (e, t, o) {
        "use strict";
        var n = o(117);
        e.exports = function (e) {
            return n(e.length);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(37),
            i = o(145);
        e.exports = function (e, t, o) {
            var r, s;
            a(e);
            try {
                if (!(r = i(e, "return"))) {
                    if ("throw" === t) throw o;
                    return o;
                }
                r = n(r, e);
            } catch (e) {
                ((s = !0), (r = e));
            }
            if ("throw" === t) throw o;
            if (s) throw r;
            return (a(r), o);
        };
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        o(20);
        var n,
            a,
            i = o(25),
            r = o(29),
            s = o(35),
            l = o(37),
            c = o(62),
            u =
                ((n = !1),
                ((a = /[ac]/).exec = function () {
                    return ((n = !0), /./.exec.apply(this, arguments));
                }),
                !0 === a.test("abc") && n),
            d = /./.test;
        i(
            { target: "RegExp", proto: !0, forced: !u },
            {
                test: function (e) {
                    var t = l(this),
                        o = c(e),
                        n = t.exec;
                    if (!s(n)) return r(d, t, o);
                    var a = r(n, t, o);
                    return null !== a && (l(a), !0);
                },
            }
        );
    },
    ,
    function (e, t) {
        var o;
        o = (function () {
            return this;
        })();
        try {
            o = o || new Function("return this")();
        } catch (e) {
            "object" == typeof window && (o = window);
        }
        e.exports = o;
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(35),
            i = function (e) {
                return a(e) ? e : void 0;
            };
        e.exports = function (e, t) {
            return arguments.length < 2 ? i(n[e]) : n[e] && n[e][t];
        };
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        o(424);
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = n({}.toString),
            i = n("".slice);
        e.exports = function (e) {
            return i(a(e), 8, -1);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(130),
            a = Math.min;
        e.exports = function (e) {
            var t = n(e);
            return t > 0 ? a(t, 9007199254740991) : 0;
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(401),
            a = o(88);
        e.exports = function (e, t, o) {
            return (o.get && n(o.get, t, { getter: !0 }), o.set && n(o.set, t, { setter: !0 }), a.f(e, t, o));
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(124),
            a = o(29),
            i = o(37),
            r = o(185),
            s = o(305),
            l = o(101),
            c = o(144),
            u = o(246),
            d = o(204),
            p = o(102),
            h = TypeError,
            g = function (e, t) {
                ((this.stopped = e), (this.result = t));
            },
            f = g.prototype;
        e.exports = function (e, t, o) {
            var m,
                x,
                y,
                b,
                w,
                v,
                D,
                A = o && o.that,
                C = !(!o || !o.AS_ENTRIES),
                E = !(!o || !o.IS_RECORD),
                S = !(!o || !o.IS_ITERATOR),
                k = !(!o || !o.INTERRUPTED),
                _ = n(t, A),
                T = function (e) {
                    return (m && p(m, "normal", e), new g(!0, e));
                },
                P = function (e) {
                    return C ? (i(e), k ? _(e[0], e[1], T) : _(e[0], e[1])) : k ? _(e, T) : _(e);
                };
            if (E) m = e.iterator;
            else if (S) m = e;
            else {
                if (!(x = d(e))) throw new h(r(e) + " is not iterable");
                if (s(x)) {
                    for (y = 0, b = l(e); b > y; y++) if ((w = P(e[y])) && c(f, w)) return w;
                    return new g(!1);
                }
                m = u(e, x);
            }
            for (v = E ? e.next : m.next; !(D = a(v, m)).done; ) {
                try {
                    w = P(D.value);
                } catch (e) {
                    p(m, "throw", e);
                }
                if ("object" == typeof w && w && c(f, w)) return w;
            }
            return new g(!1);
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(223),
            a = o(65),
            i = o(239),
            r = n(n.bind);
        e.exports = function (e, t) {
            return (
                a(e),
                void 0 === t
                    ? e
                    : i
                      ? r(e, t)
                      : function () {
                            return e.apply(t, arguments);
                        }
            );
        };
    },
    function (e, t, o) {
        "use strict";
        o(673);
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29);
        n(
            { target: "URL", proto: !0, enumerable: !0 },
            {
                toJSON: function () {
                    return a(URL.prototype.toString, this);
                },
            }
        );
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23).navigator,
            a = n && n.userAgent;
        e.exports = a ? String(a) : "";
    },
    function (e, t, o) {
        "use strict";
        var n = o(616);
        e.exports = function (e) {
            var t = +e;
            return t != t || 0 === t ? 0 : n(t);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(622),
            a = o(35),
            i = o(116),
            r = o(43)("toStringTag"),
            s = Object,
            l =
                "Arguments" ===
                i(
                    (function () {
                        return arguments;
                    })()
                );
        e.exports = n
            ? i
            : function (e) {
                  var t, o, n;
                  return void 0 === e
                      ? "Undefined"
                      : null === e
                        ? "Null"
                        : "string" ==
                            typeof (o = (function (e, t) {
                                try {
                                    return e[t];
                                } catch (e) {}
                            })((t = s(e)), r))
                          ? o
                          : l
                            ? i(t)
                            : "Object" === (n = i(t)) && a(t.callee)
                              ? "Arguments"
                              : n;
              };
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n,
            a = o(37),
            i = o(617),
            r = o(301),
            s = o(259),
            l = o(406),
            c = o(242),
            u = o(300),
            d = u("IE_PROTO"),
            p = function () {},
            h = function (e) {
                return "<script>" + e + "<\/script>";
            },
            g = function (e) {
                (e.write(h("")), e.close());
                var t = e.parentWindow.Object;
                return ((e = null), t);
            },
            f = function () {
                try {
                    n = new ActiveXObject("htmlfile");
                } catch (e) {}
                var e, t;
                f =
                    "undefined" != typeof document
                        ? document.domain && n
                            ? g(n)
                            : (((t = c("iframe")).style.display = "none"),
                              l.appendChild(t),
                              (t.src = String("javascript:")),
                              (e = t.contentWindow.document).open(),
                              e.write(h("document.F=Object")),
                              e.close(),
                              e.F)
                        : g(n);
                for (var o = r.length; o--; ) delete f.prototype[r[o]];
                return f();
            };
        ((s[d] = !0),
            (e.exports =
                Object.create ||
                function (e, t) {
                    var o;
                    return (
                        null !== e ? ((p.prototype = a(e)), (o = new p()), (p.prototype = null), (o[d] = e)) : (o = f()),
                        void 0 === t ? o : i.f(o, t)
                    );
                }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(88).f,
            a = o(61),
            i = o(43)("toStringTag");
        e.exports = function (e, t, o) {
            (e && !o && (e = e.prototype), e && !a(e, i) && n(e, i, { configurable: !0, value: t }));
        };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            return { iterator: e, next: e.next, done: !1 };
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(27);
        e.exports = n({}.isPrototypeOf);
    },
    function (e, t, o) {
        "use strict";
        var n = o(65),
            a = o(194);
        e.exports = function (e, t) {
            var o = e[t];
            return a(o) ? void 0 : n(o);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(144),
            a = TypeError;
        e.exports = function (e, t) {
            if (n(t, e)) return e;
            throw new a("Incorrect invocation");
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23);
        e.exports = function (e, t) {
            var o = n.Iterator,
                a = o && o.prototype,
                i = a && a[e],
                r = !1;
            if (i)
                try {
                    i.call(
                        {
                            next: function () {
                                return { done: !0 };
                            },
                            return: function () {
                                r = !0;
                            },
                        },
                        -1
                    );
                } catch (e) {
                    e instanceof t || (r = !1);
                }
            if (!r) return i;
        };
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(278),
            i = o(37),
            r = o(46),
            s = o(117),
            l = o(62),
            c = o(92),
            u = o(145),
            d = o(308),
            p = o(279);
        a("match", function (e, t, o) {
            return [
                function (t) {
                    var o = c(this),
                        a = r(t) ? u(t, e) : void 0;
                    return a ? n(a, t, o) : new RegExp(t)[e](l(o));
                },
                function (e) {
                    var n = i(this),
                        a = l(e),
                        r = o(t, n, a);
                    if (r.done) return r.value;
                    if (!n.global) return p(n, a);
                    var c = n.unicode;
                    n.lastIndex = 0;
                    for (var u, h = [], g = 0; null !== (u = p(n, a)); ) {
                        var f = l(u[0]);
                        ((h[g] = f), "" === f && (n.lastIndex = d(a, s(n.lastIndex), c)), g++);
                    }
                    return 0 === g ? null : h;
                },
            ];
        });
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r = o(425),
            s = o(49),
            l = o(23),
            c = o(35),
            u = o(46),
            d = o(61),
            p = o(131),
            h = o(185),
            g = o(100),
            f = o(79),
            m = o(120),
            x = o(144),
            y = o(208),
            b = o(175),
            w = o(43),
            v = o(258),
            D = o(80),
            A = D.enforce,
            C = D.get,
            E = l.Int8Array,
            S = E && E.prototype,
            k = l.Uint8ClampedArray,
            _ = k && k.prototype,
            T = E && y(E),
            P = S && y(S),
            F = Object.prototype,
            R = l.TypeError,
            I = w("toStringTag"),
            G = v("TYPED_ARRAY_TAG"),
            O = r && !!b && "Opera" !== p(l.opera),
            L = !1,
            B = {
                Int8Array: 1,
                Uint8Array: 1,
                Uint8ClampedArray: 1,
                Int16Array: 2,
                Uint16Array: 2,
                Int32Array: 4,
                Uint32Array: 4,
                Float32Array: 4,
                Float64Array: 8,
            },
            N = { BigInt64Array: 8, BigUint64Array: 8 },
            M = function (e) {
                var t = y(e);
                if (u(t)) {
                    var o = C(t);
                    return o && d(o, "TypedArrayConstructor") ? o.TypedArrayConstructor : M(t);
                }
            },
            U = function (e) {
                if (!u(e)) return !1;
                var t = p(e);
                return d(B, t) || d(N, t);
            };
        for (n in B) (i = (a = l[n]) && a.prototype) ? (A(i).TypedArrayConstructor = a) : (O = !1);
        for (n in N) (i = (a = l[n]) && a.prototype) && (A(i).TypedArrayConstructor = a);
        if (
            (!O || !c(T) || T === Function.prototype) &&
            ((T = function () {
                throw new R("Incorrect invocation");
            }),
            O)
        )
            for (n in B) l[n] && b(l[n], T);
        if ((!O || !P || P === F) && ((P = T.prototype), O)) for (n in B) l[n] && b(l[n].prototype, P);
        if ((O && y(_) !== P && b(_, P), s && !d(P, I)))
            for (n in ((L = !0),
            m(P, I, {
                configurable: !0,
                get: function () {
                    return u(this) ? this[G] : void 0;
                },
            }),
            B))
                l[n] && g(l[n], G, n);
        e.exports = {
            NATIVE_ARRAY_BUFFER_VIEWS: O,
            TYPED_ARRAY_TAG: L && G,
            aTypedArray: function (e) {
                if (U(e)) return e;
                throw new R("Target is not a typed array");
            },
            aTypedArrayConstructor: function (e) {
                if (c(e) && (!b || x(T, e))) return e;
                throw new R(h(e) + " is not a typed array constructor");
            },
            exportTypedArrayMethod: function (e, t, o, n) {
                if (s) {
                    if (o)
                        for (var a in B) {
                            var i = l[a];
                            if (i && d(i.prototype, e))
                                try {
                                    delete i.prototype[e];
                                } catch (o) {
                                    try {
                                        i.prototype[e] = t;
                                    } catch (e) {}
                                }
                        }
                    (P[e] && !o) || f(P, e, o ? t : (O && S[e]) || t, n);
                }
            },
            exportTypedArrayStaticMethod: function (e, t, o) {
                var n, a;
                if (s) {
                    if (b) {
                        if (o)
                            for (n in B)
                                if ((a = l[n]) && d(a, e))
                                    try {
                                        delete a[e];
                                    } catch (e) {}
                        if (T[e] && !o) return;
                        try {
                            return f(T, e, o ? t : (O && T[e]) || t);
                        } catch (e) {}
                    }
                    for (n in B) !(a = l[n]) || (a[e] && !o) || f(a, e, t);
                }
            },
            getTypedArrayConstructor: M,
            isView: function (e) {
                if (!u(e)) return !1;
                var t = p(e);
                return "DataView" === t || d(B, t) || d(N, t);
            },
            isTypedArray: U,
            TypedArray: T,
            TypedArrayPrototype: P,
        };
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(27);
        e.exports = n([].slice);
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = {};
        ((0, o(94).assign)(n, o(462), o(465), o(314)), (e.exports = n));
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(681).left,
            i = o(350),
            r = o(213);
        n(
            { target: "Array", proto: !0, forced: (!o(245) && r > 79 && r < 83) || !i("reduce") },
            {
                reduce: function (e) {
                    var t = arguments.length;
                    return a(this, e, t, t > 1 ? arguments[1] : void 0);
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        o(683);
    },
    ,
    function (e, t) {
        e.exports = jQuery;
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(619),
            a = o(46),
            i = o(92),
            r = o(620);
        e.exports =
            Object.setPrototypeOf ||
            ("__proto__" in {}
                ? (function () {
                      var e,
                          t = !1,
                          o = {};
                      try {
                          ((e = n(Object.prototype, "__proto__", "set"))(o, []), (t = o instanceof Array));
                      } catch (e) {}
                      return function (o, n) {
                          return (i(o), r(n), a(o) ? (t ? e(o, n) : (o.__proto__ = n), o) : o);
                      };
                  })()
                : void 0);
    },
    ,
    function (e, t, o) {
        "use strict";
        (o(30), o(20), o(107), o(3), o(247), o(91));
        var n = o(263),
            a = o(10);
        const { GObject: i } = o(1),
            r = o(733),
            s = o(589),
            l = {},
            c = [
                "#B30000",
                "#B35900",
                "#999900",
                "#59B300",
                "#009966",
                "#00B3B3",
                "#0095B3",
                "#006699",
                "#003CB3",
                "#1E00B3",
                "#5900B3",
                "#9500B3",
                "#B30077",
                "#E60000",
                "#E67300",
                "#E69900",
                "#5500FF",
                "#BF00FF",
            ];
        function u() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this, e);
        }
        (i.inheritAndMix(u, s, [r, a.User], !0),
            (u.equals = function (e, t) {
                return new u(e).getUID() === new u(t).getUID();
            }),
            (u.prototype.hasOwnPictureAvatar = function () {
                return this.avatar && this.avatar.split("?")[1] && "v=" === this.avatar.split("?")[1].substr(0, 2);
            }),
            (u.prototype.getUID = function () {
                return !this.id && a.ANONYMOUS_SESSION_ENABLED ? this.user_id || this.session_id || "" : this.id || this.user_id || "";
            }),
            (u.prototype.getUserColor = function () {
                if (!this._color) {
                    const t = this.getUID();
                    if (!l[t]) {
                        var e = c.shift();
                        l[t] =
                            e ||
                            "#" +
                                (
                                    (((32 * Math.random()) | 0) << 3) |
                                    (((32 * Math.random()) | 0) << 11) |
                                    (((32 * Math.random()) | 0) << 19)
                                ).toString(16);
                    }
                    this._color = l[t];
                }
                return this._color;
            }),
            (u.prototype.getEmail = function () {
                return a.CloudUtils.getUserEmail(this);
            }),
            (u.prototype.isDeactivated = function () {
                return !!this.deactivated;
            }),
            (u.prototype.isAnonymous = function () {
                return this.anonymous;
            }),
            (u.prototype.isGravitAccount = function () {
                const e = this.getEmail();
                return /\@(gravit\.io|designer\.io|corel\.com|corelvector\.com)$/.test(e);
            }),
            (u.prototype.isEmailVerified = function () {
                return !!this.email_verified;
            }),
            (u.prototype.getFirstName = function () {
                try {
                    if (this.name && this.name.trim()) {
                        return this.name.trim().split(n.GRegex.String.SpacesLineBreak)[0];
                    }
                    return this.name || "";
                } catch (e) {
                    return "";
                }
            }),
            (u.prototype.getUserNameInitials = function () {
                const e = this.getFirstName();
                try {
                    if (this.last_name && this.last_name.trim()) {
                        const t = this.last_name;
                        return "".concat(e.substr(0, 1)).concat(t.substr(0, 1)).toLocaleUpperCase();
                    }
                    return e ? "".concat(e.substr(0, 1)) : "";
                } catch (t) {
                    return e ? "".concat(e.substr(0, 1)) : "";
                }
            }),
            (u.prototype.getLastName = function () {
                return this.last_name;
            }),
            (u.prototype.getUserReference = function () {
                return this.email || this.login || this.getFullUserName();
            }),
            (u.prototype.getAccountName = function () {
                return this.email || this.login || "";
            }),
            (e.exports = u));
    },
    function (e, t) {
        e.exports = require("fs");
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(23),
            i = o(324),
            r = o(260),
            s = i.ArrayBuffer;
        (n({ global: !0, constructor: !0, forced: a.ArrayBuffer !== s }, { ArrayBuffer: s }), r("ArrayBuffer"));
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(223),
            i = o(21),
            r = o(324),
            s = o(37),
            l = o(244),
            c = o(117),
            u = r.ArrayBuffer,
            d = r.DataView,
            p = d.prototype,
            h = a(u.prototype.slice),
            g = a(p.getUint8),
            f = a(p.setUint8);
        n(
            {
                target: "ArrayBuffer",
                proto: !0,
                unsafe: !0,
                forced: i(function () {
                    return !new u(2).slice(1, void 0).byteLength;
                }),
            },
            {
                slice: function (e, t) {
                    if (h && void 0 === t) return h(s(this), e);
                    for (
                        var o = s(this).byteLength,
                            n = l(e, o),
                            a = l(void 0 === t ? o : t, o),
                            i = new u(c(a - n)),
                            r = new d(this),
                            p = new d(i),
                            m = 0;
                        n < a;

                    )
                        f(p, m++, g(r, n++));
                    return i;
                },
            }
        );
    },
    ,
    function (e, t) {
        var o,
            n,
            a = (e.exports = {});
        function i() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function s(e) {
            if (o === setTimeout) return setTimeout(e, 0);
            if ((o === i || !o) && setTimeout) return ((o = setTimeout), setTimeout(e, 0));
            try {
                return o(e, 0);
            } catch (t) {
                try {
                    return o.call(null, e, 0);
                } catch (t) {
                    return o.call(this, e, 0);
                }
            }
        }
        !(function () {
            try {
                o = "function" == typeof setTimeout ? setTimeout : i;
            } catch (e) {
                o = i;
            }
            try {
                n = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                n = r;
            }
        })();
        var l,
            c = [],
            u = !1,
            d = -1;
        function p() {
            u && l && ((u = !1), l.length ? (c = l.concat(c)) : (d = -1), c.length && h());
        }
        function h() {
            if (!u) {
                var e = s(p);
                u = !0;
                for (var t = c.length; t; ) {
                    for (l = c, c = []; ++d < t; ) l && l[d].run();
                    ((d = -1), (t = c.length));
                }
                ((l = null),
                    (u = !1),
                    (function (e) {
                        if (n === clearTimeout) return clearTimeout(e);
                        if ((n === r || !n) && clearTimeout) return ((n = clearTimeout), clearTimeout(e));
                        try {
                            n(e);
                        } catch (t) {
                            try {
                                return n.call(null, e);
                            } catch (t) {
                                return n.call(this, e);
                            }
                        }
                    })(e));
            }
        }
        function g(e, t) {
            ((this.fun = e), (this.array = t));
        }
        function f() {}
        ((a.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
            (c.push(new g(e, t)), 1 !== c.length || u || s(h));
        }),
            (g.prototype.run = function () {
                this.fun.apply(null, this.array);
            }),
            (a.title = "browser"),
            (a.browser = !0),
            (a.env = {}),
            (a.argv = []),
            (a.version = ""),
            (a.versions = {}),
            (a.on = f),
            (a.addListener = f),
            (a.once = f),
            (a.off = f),
            (a.removeListener = f),
            (a.removeAllListeners = f),
            (a.emit = f),
            (a.prependListener = f),
            (a.prependOnceListener = f),
            (a.listeners = function (e) {
                return [];
            }),
            (a.binding = function (e) {
                throw new Error("process.binding is not supported");
            }),
            (a.cwd = function () {
                return "/";
            }),
            (a.chdir = function (e) {
                throw new Error("process.chdir is not supported");
            }),
            (a.umask = function () {
                return 0;
            }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(240),
            a = o(92);
        e.exports = function (e) {
            return n(a(e));
        };
    },
    function (e, t, o) {
        "use strict";
        var n = String;
        e.exports = function (e) {
            try {
                return n(e);
            } catch (e) {
                return "Object";
            }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(23);
        e.exports = n.Promise;
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(152),
            a = o(427),
            i = o(429),
            r = o(131),
            s = o(29),
            l = o(27),
            c = o(21),
            u = n.aTypedArray,
            d = n.exportTypedArrayMethod,
            p = l("".slice);
        d(
            "fill",
            function (e) {
                var t = arguments.length;
                u(this);
                var o = "Big" === p(r(this), 0, 3) ? i(e) : +e;
                return s(a, this, o, t > 1 ? arguments[1] : void 0, t > 2 ? arguments[2] : void 0);
            },
            c(function () {
                var e = 0;
                return (
                    new Int8Array(2).fill({
                        valueOf: function () {
                            return e++;
                        },
                    }),
                    1 !== e
                );
            })
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(29),
            i = o(152),
            r = o(101),
            s = o(428),
            l = o(93),
            c = o(21),
            u = n.RangeError,
            d = n.Int8Array,
            p = d && d.prototype,
            h = p && p.set,
            g = i.aTypedArray,
            f = i.exportTypedArrayMethod,
            m = !c(function () {
                var e = new Uint8ClampedArray(2);
                return (a(h, e, { length: 1, 0: 3 }, 1), 3 !== e[1]);
            }),
            x =
                m &&
                i.NATIVE_ARRAY_BUFFER_VIEWS &&
                c(function () {
                    var e = new d(2);
                    return (e.set(1), e.set("2", 1), 0 !== e[0] || 2 !== e[1]);
                });
        f(
            "set",
            function (e) {
                g(this);
                var t = s(arguments.length > 1 ? arguments[1] : void 0, 1),
                    o = l(e);
                if (m) return a(h, this, o, t);
                var n = this.length,
                    i = r(o),
                    c = 0;
                if (i + t > n) throw new u("Wrong length");
                for (; c < i; ) this[t + c] = o[c++];
            },
            !m || x
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(223),
            i = o(21),
            r = o(65),
            s = o(351),
            l = o(152),
            c = o(521),
            u = o(522),
            d = o(213),
            p = o(523),
            h = l.aTypedArray,
            g = l.exportTypedArrayMethod,
            f = n.Uint16Array,
            m = f && a(f.prototype.sort),
            x = !(
                !m ||
                (i(function () {
                    m(new f(2), null);
                }) &&
                    i(function () {
                        m(new f(2), {});
                    }))
            ),
            y =
                !!m &&
                !i(function () {
                    if (d) return d < 74;
                    if (c) return c < 67;
                    if (u) return !0;
                    if (p) return p < 602;
                    var e,
                        t,
                        o = new f(516),
                        n = Array(516);
                    for (e = 0; e < 516; e++) ((t = e % 4), (o[e] = 515 - e), (n[e] = e - 2 * t + 3));
                    for (
                        m(o, function (e, t) {
                            return ((e / 4) | 0) - ((t / 4) | 0);
                        }),
                            e = 0;
                        e < 516;
                        e++
                    )
                        if (o[e] !== n[e]) return !0;
                });
        g(
            "sort",
            function (e) {
                return (
                    void 0 !== e && r(e),
                    y
                        ? m(this, e)
                        : s(
                              h(this),
                              (function (e) {
                                  return function (t, o) {
                                      return void 0 !== e
                                          ? +e(t, o) || 0
                                          : o != o
                                            ? -1
                                            : t != t
                                              ? 1
                                              : 0 === t && 0 === o
                                                ? 1 / t > 0 && 1 / o < 0
                                                    ? 1
                                                    : -1
                                                : t > o;
                                  };
                              })(e)
                          )
                );
            },
            !y || x
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(200),
            i = o(152),
            r = o(21),
            s = o(157),
            l = n.Int8Array,
            c = i.aTypedArray,
            u = i.exportTypedArrayMethod,
            d = [].toLocaleString,
            p =
                !!l &&
                r(function () {
                    d.call(new l(1));
                });
        u(
            "toLocaleString",
            function () {
                return a(d, p ? s(c(this)) : c(this), s(arguments));
            },
            r(function () {
                return [1, 2].toLocaleString() !== new l([1, 2]).toLocaleString();
            }) ||
                !r(function () {
                    l.prototype.toLocaleString.call([1, 2]);
                })
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(702);
        n({ global: !0, forced: parseFloat !== a }, { parseFloat: a });
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            return null == e;
        };
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(61),
            i = Function.prototype,
            r = n && Object.getOwnPropertyDescriptor,
            s = a(i, "name"),
            l = s && "something" === function () {}.name,
            c = s && (!n || (n && r(i, "name").configurable));
        e.exports = { EXISTS: s, PROPER: l, CONFIGURABLE: c };
    },
    function (e, t, o) {
        "use strict";
        var n = o(239),
            a = Function.prototype,
            i = a.apply,
            r = a.call;
        e.exports =
            ("object" == typeof Reflect && Reflect.apply) ||
            (n
                ? r.bind(i)
                : function () {
                      return r.apply(i, arguments);
                  });
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(186),
            i = o(35),
            r = o(277),
            s = o(299),
            l = o(43),
            c = o(407),
            u = o(74),
            d = o(213),
            p = a && a.prototype,
            h = l("species"),
            g = !1,
            f = i(n.PromiseRejectionEvent),
            m = r("Promise", function () {
                var e = s(a),
                    t = e !== String(a);
                if (!t && 66 === d) return !0;
                if (u && (!p.catch || !p.finally)) return !0;
                if (!d || d < 51 || !/native code/.test(e)) {
                    var o = new a(function (e) {
                            e(1);
                        }),
                        n = function (e) {
                            e(
                                function () {},
                                function () {}
                            );
                        };
                    if ((((o.constructor = {})[h] = n), !(g = o.then(function () {}) instanceof n))) return !0;
                }
                return !(t || ("BROWSER" !== c && "DENO" !== c) || f);
            });
        e.exports = { CONSTRUCTOR: m, REJECTION_EVENT: f, SUBCLASSING: g };
    },
    function (e, t, o) {
        "use strict";
        var n = o(65),
            a = TypeError,
            i = function (e) {
                var t, o;
                ((this.promise = new e(function (e, n) {
                    if (void 0 !== t || void 0 !== o) throw new a("Bad Promise constructor");
                    ((t = e), (o = n));
                })),
                    (this.resolve = n(t)),
                    (this.reject = n(o)));
            };
        e.exports.f = function (e) {
            return new i(e);
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = {};
    },
    function (e, t, o) {
        "use strict";
        var n = o(131),
            a = o(145),
            i = o(194),
            r = o(203),
            s = o(43)("iterator");
        e.exports = function (e) {
            if (!i(e)) return a(e, s) || a(e, "@@iterator") || r[n(e)];
        };
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(61),
            a = o(35),
            i = o(93),
            r = o(300),
            s = o(665),
            l = r("IE_PROTO"),
            c = Object,
            u = c.prototype;
        e.exports = s
            ? c.getPrototypeOf
            : function (e) {
                  var t = i(e);
                  if (n(t, l)) return t[l];
                  var o = t.constructor;
                  return a(o) && t instanceof o ? o.prototype : t instanceof c ? u : null;
              };
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i = o(23),
            r = o(129),
            s = i.process,
            l = i.Deno,
            c = (s && s.versions) || (l && l.version),
            u = c && c.v8;
        (u && (a = (n = u.split("."))[0] > 0 && n[0] < 4 ? 1 : +(n[0] + n[1])),
            !a && r && (!(n = r.match(/Edge\/(\d+)/)) || n[1] >= 74) && (n = r.match(/Chrome\/(\d+)/)) && (a = +n[1]),
            (e.exports = a));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        (function (e) {
            var n = o(250),
                a = o(515),
                i = o(516);
            function r() {
                return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function s(e, t) {
                if (r() < t) throw new RangeError("Invalid typed array length");
                return (
                    l.TYPED_ARRAY_SUPPORT
                        ? ((e = new Uint8Array(t)).__proto__ = l.prototype)
                        : (null === e && (e = new l(t)), (e.length = t)),
                    e
                );
            }
            function l(e, t, o) {
                if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(e, t, o);
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return d(this, e);
                }
                return c(this, e, t, o);
            }
            function c(e, t, o, n) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
                    ? (function (e, t, o, n) {
                          if ((t.byteLength, o < 0 || t.byteLength < o)) throw new RangeError("'offset' is out of bounds");
                          if (t.byteLength < o + (n || 0)) throw new RangeError("'length' is out of bounds");
                          t =
                              void 0 === o && void 0 === n
                                  ? new Uint8Array(t)
                                  : void 0 === n
                                    ? new Uint8Array(t, o)
                                    : new Uint8Array(t, o, n);
                          l.TYPED_ARRAY_SUPPORT ? ((e = t).__proto__ = l.prototype) : (e = p(e, t));
                          return e;
                      })(e, t, o, n)
                    : "string" == typeof t
                      ? (function (e, t, o) {
                            ("string" == typeof o && "" !== o) || (o = "utf8");
                            if (!l.isEncoding(o)) throw new TypeError('"encoding" must be a valid string encoding');
                            var n = 0 | g(t, o),
                                a = (e = s(e, n)).write(t, o);
                            a !== n && (e = e.slice(0, a));
                            return e;
                        })(e, t, o)
                      : (function (e, t) {
                            if (l.isBuffer(t)) {
                                var o = 0 | h(t.length);
                                return (0 === (e = s(e, o)).length || t.copy(e, 0, 0, o), e);
                            }
                            if (t) {
                                if (("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) || "length" in t)
                                    return "number" != typeof t.length || (n = t.length) != n ? s(e, 0) : p(e, t);
                                if ("Buffer" === t.type && i(t.data)) return p(e, t.data);
                            }
                            var n;
                            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                        })(e, t);
            }
            function u(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative');
            }
            function d(e, t) {
                if ((u(t), (e = s(e, t < 0 ? 0 : 0 | h(t))), !l.TYPED_ARRAY_SUPPORT)) for (var o = 0; o < t; ++o) e[o] = 0;
                return e;
            }
            function p(e, t) {
                var o = t.length < 0 ? 0 : 0 | h(t.length);
                e = s(e, o);
                for (var n = 0; n < o; n += 1) e[n] = 255 & t[n];
                return e;
            }
            function h(e) {
                if (e >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                return 0 | e;
            }
            function g(e, t) {
                if (l.isBuffer(e)) return e.length;
                if (
                    "undefined" != typeof ArrayBuffer &&
                    "function" == typeof ArrayBuffer.isView &&
                    (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
                )
                    return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var o = e.length;
                if (0 === o) return 0;
                for (var n = !1; ; )
                    switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return o;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return U(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * o;
                        case "hex":
                            return o >>> 1;
                        case "base64":
                            return W(e).length;
                        default:
                            if (n) return U(e).length;
                            ((t = ("" + t).toLowerCase()), (n = !0));
                    }
            }
            function f(e, t, o) {
                var n = !1;
                if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
                if (((void 0 === o || o > this.length) && (o = this.length), o <= 0)) return "";
                if ((o >>>= 0) <= (t >>>= 0)) return "";
                for (e || (e = "utf8"); ; )
                    switch (e) {
                        case "hex":
                            return T(this, t, o);
                        case "utf8":
                        case "utf-8":
                            return S(this, t, o);
                        case "ascii":
                            return k(this, t, o);
                        case "latin1":
                        case "binary":
                            return _(this, t, o);
                        case "base64":
                            return E(this, t, o);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return P(this, t, o);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            ((e = (e + "").toLowerCase()), (n = !0));
                    }
            }
            function m(e, t, o) {
                var n = e[t];
                ((e[t] = e[o]), (e[o] = n));
            }
            function x(e, t, o, n, a) {
                if (0 === e.length) return -1;
                if (
                    ("string" == typeof o ? ((n = o), (o = 0)) : o > 2147483647 ? (o = 2147483647) : o < -2147483648 && (o = -2147483648),
                    (o = +o),
                    isNaN(o) && (o = a ? 0 : e.length - 1),
                    o < 0 && (o = e.length + o),
                    o >= e.length)
                ) {
                    if (a) return -1;
                    o = e.length - 1;
                } else if (o < 0) {
                    if (!a) return -1;
                    o = 0;
                }
                if (("string" == typeof t && (t = l.from(t, n)), l.isBuffer(t))) return 0 === t.length ? -1 : y(e, t, o, n, a);
                if ("number" == typeof t)
                    return (
                        (t &= 255),
                        l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf
                            ? a
                                ? Uint8Array.prototype.indexOf.call(e, t, o)
                                : Uint8Array.prototype.lastIndexOf.call(e, t, o)
                            : y(e, [t], o, n, a)
                    );
                throw new TypeError("val must be string, number or Buffer");
            }
            function y(e, t, o, n, a) {
                var i,
                    r = 1,
                    s = e.length,
                    l = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    ((r = 2), (s /= 2), (l /= 2), (o /= 2));
                }
                function c(e, t) {
                    return 1 === r ? e[t] : e.readUInt16BE(t * r);
                }
                if (a) {
                    var u = -1;
                    for (i = o; i < s; i++)
                        if (c(e, i) === c(t, -1 === u ? 0 : i - u)) {
                            if ((-1 === u && (u = i), i - u + 1 === l)) return u * r;
                        } else (-1 !== u && (i -= i - u), (u = -1));
                } else
                    for (o + l > s && (o = s - l), i = o; i >= 0; i--) {
                        for (var d = !0, p = 0; p < l; p++)
                            if (c(e, i + p) !== c(t, p)) {
                                d = !1;
                                break;
                            }
                        if (d) return i;
                    }
                return -1;
            }
            function b(e, t, o, n) {
                o = Number(o) || 0;
                var a = e.length - o;
                n ? (n = Number(n)) > a && (n = a) : (n = a);
                var i = t.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                n > i / 2 && (n = i / 2);
                for (var r = 0; r < n; ++r) {
                    var s = parseInt(t.substr(2 * r, 2), 16);
                    if (isNaN(s)) return r;
                    e[o + r] = s;
                }
                return r;
            }
            function w(e, t, o, n) {
                return j(U(t, e.length - o), e, o, n);
            }
            function v(e, t, o, n) {
                return j(
                    (function (e) {
                        for (var t = [], o = 0; o < e.length; ++o) t.push(255 & e.charCodeAt(o));
                        return t;
                    })(t),
                    e,
                    o,
                    n
                );
            }
            function D(e, t, o, n) {
                return v(e, t, o, n);
            }
            function A(e, t, o, n) {
                return j(W(t), e, o, n);
            }
            function C(e, t, o, n) {
                return j(
                    (function (e, t) {
                        for (var o, n, a, i = [], r = 0; r < e.length && !((t -= 2) < 0); ++r)
                            ((o = e.charCodeAt(r)), (n = o >> 8), (a = o % 256), i.push(a), i.push(n));
                        return i;
                    })(t, e.length - o),
                    e,
                    o,
                    n
                );
            }
            function E(e, t, o) {
                return 0 === t && o === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, o));
            }
            function S(e, t, o) {
                o = Math.min(e.length, o);
                for (var n = [], a = t; a < o; ) {
                    var i,
                        r,
                        s,
                        l,
                        c = e[a],
                        u = null,
                        d = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (a + d <= o)
                        switch (d) {
                            case 1:
                                c < 128 && (u = c);
                                break;
                            case 2:
                                128 == (192 & (i = e[a + 1])) && (l = ((31 & c) << 6) | (63 & i)) > 127 && (u = l);
                                break;
                            case 3:
                                ((i = e[a + 1]),
                                    (r = e[a + 2]),
                                    128 == (192 & i) &&
                                        128 == (192 & r) &&
                                        (l = ((15 & c) << 12) | ((63 & i) << 6) | (63 & r)) > 2047 &&
                                        (l < 55296 || l > 57343) &&
                                        (u = l));
                                break;
                            case 4:
                                ((i = e[a + 1]),
                                    (r = e[a + 2]),
                                    (s = e[a + 3]),
                                    128 == (192 & i) &&
                                        128 == (192 & r) &&
                                        128 == (192 & s) &&
                                        (l = ((15 & c) << 18) | ((63 & i) << 12) | ((63 & r) << 6) | (63 & s)) > 65535 &&
                                        l < 1114112 &&
                                        (u = l));
                        }
                    (null === u
                        ? ((u = 65533), (d = 1))
                        : u > 65535 && ((u -= 65536), n.push(((u >>> 10) & 1023) | 55296), (u = 56320 | (1023 & u))),
                        n.push(u),
                        (a += d));
                }
                return (function (e) {
                    var t = e.length;
                    if (t <= 4096) return String.fromCharCode.apply(String, e);
                    var o = "",
                        n = 0;
                    for (; n < t; ) o += String.fromCharCode.apply(String, e.slice(n, (n += 4096)));
                    return o;
                })(n);
            }
            ((t.Buffer = l),
                (t.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return l.alloc(+e);
                }),
                (t.INSPECT_MAX_BYTES = 50),
                (l.TYPED_ARRAY_SUPPORT =
                    void 0 !== e.TYPED_ARRAY_SUPPORT
                        ? e.TYPED_ARRAY_SUPPORT
                        : (function () {
                              try {
                                  var e = new Uint8Array(1);
                                  return (
                                      (e.__proto__ = {
                                          __proto__: Uint8Array.prototype,
                                          foo: function () {
                                              return 42;
                                          },
                                      }),
                                      42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                                  );
                              } catch (e) {
                                  return !1;
                              }
                          })()),
                (t.kMaxLength = r()),
                (l.poolSize = 8192),
                (l._augment = function (e) {
                    return ((e.__proto__ = l.prototype), e);
                }),
                (l.from = function (e, t, o) {
                    return c(null, e, t, o);
                }),
                l.TYPED_ARRAY_SUPPORT &&
                    ((l.prototype.__proto__ = Uint8Array.prototype),
                    (l.__proto__ = Uint8Array),
                    "undefined" != typeof Symbol &&
                        Symbol.species &&
                        l[Symbol.species] === l &&
                        Object.defineProperty(l, Symbol.species, { value: null, configurable: !0 })),
                (l.alloc = function (e, t, o) {
                    return (function (e, t, o, n) {
                        return (
                            u(t),
                            t <= 0 ? s(e, t) : void 0 !== o ? ("string" == typeof n ? s(e, t).fill(o, n) : s(e, t).fill(o)) : s(e, t)
                        );
                    })(null, e, t, o);
                }),
                (l.allocUnsafe = function (e) {
                    return d(null, e);
                }),
                (l.allocUnsafeSlow = function (e) {
                    return d(null, e);
                }),
                (l.isBuffer = function (e) {
                    return !(null == e || !e._isBuffer);
                }),
                (l.compare = function (e, t) {
                    if (!l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                    if (e === t) return 0;
                    for (var o = e.length, n = t.length, a = 0, i = Math.min(o, n); a < i; ++a)
                        if (e[a] !== t[a]) {
                            ((o = e[a]), (n = t[a]));
                            break;
                        }
                    return o < n ? -1 : n < o ? 1 : 0;
                }),
                (l.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1;
                    }
                }),
                (l.concat = function (e, t) {
                    if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return l.alloc(0);
                    var o;
                    if (void 0 === t) for (t = 0, o = 0; o < e.length; ++o) t += e[o].length;
                    var n = l.allocUnsafe(t),
                        a = 0;
                    for (o = 0; o < e.length; ++o) {
                        var r = e[o];
                        if (!l.isBuffer(r)) throw new TypeError('"list" argument must be an Array of Buffers');
                        (r.copy(n, a), (a += r.length));
                    }
                    return n;
                }),
                (l.byteLength = g),
                (l.prototype._isBuffer = !0),
                (l.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2) m(this, t, t + 1);
                    return this;
                }),
                (l.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4) (m(this, t, t + 3), m(this, t + 1, t + 2));
                    return this;
                }),
                (l.prototype.swap64 = function () {
                    var e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8) (m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4));
                    return this;
                }),
                (l.prototype.toString = function () {
                    var e = 0 | this.length;
                    return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : f.apply(this, arguments);
                }),
                (l.prototype.equals = function (e) {
                    if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === l.compare(this, e);
                }),
                (l.prototype.inspect = function () {
                    var e = "",
                        o = t.INSPECT_MAX_BYTES;
                    return (
                        this.length > 0 && ((e = this.toString("hex", 0, o).match(/.{2}/g).join(" ")), this.length > o && (e += " ... ")),
                        "<Buffer " + e + ">"
                    );
                }),
                (l.prototype.compare = function (e, t, o, n, a) {
                    if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    if (
                        (void 0 === t && (t = 0),
                        void 0 === o && (o = e ? e.length : 0),
                        void 0 === n && (n = 0),
                        void 0 === a && (a = this.length),
                        t < 0 || o > e.length || n < 0 || a > this.length)
                    )
                        throw new RangeError("out of range index");
                    if (n >= a && t >= o) return 0;
                    if (n >= a) return -1;
                    if (t >= o) return 1;
                    if (this === e) return 0;
                    for (
                        var i = (a >>>= 0) - (n >>>= 0),
                            r = (o >>>= 0) - (t >>>= 0),
                            s = Math.min(i, r),
                            c = this.slice(n, a),
                            u = e.slice(t, o),
                            d = 0;
                        d < s;
                        ++d
                    )
                        if (c[d] !== u[d]) {
                            ((i = c[d]), (r = u[d]));
                            break;
                        }
                    return i < r ? -1 : r < i ? 1 : 0;
                }),
                (l.prototype.includes = function (e, t, o) {
                    return -1 !== this.indexOf(e, t, o);
                }),
                (l.prototype.indexOf = function (e, t, o) {
                    return x(this, e, t, o, !0);
                }),
                (l.prototype.lastIndexOf = function (e, t, o) {
                    return x(this, e, t, o, !1);
                }),
                (l.prototype.write = function (e, t, o, n) {
                    if (void 0 === t) ((n = "utf8"), (o = this.length), (t = 0));
                    else if (void 0 === o && "string" == typeof t) ((n = t), (o = this.length), (t = 0));
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        ((t |= 0), isFinite(o) ? ((o |= 0), void 0 === n && (n = "utf8")) : ((n = o), (o = void 0)));
                    }
                    var a = this.length - t;
                    if (((void 0 === o || o > a) && (o = a), (e.length > 0 && (o < 0 || t < 0)) || t > this.length))
                        throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var i = !1; ; )
                        switch (n) {
                            case "hex":
                                return b(this, e, t, o);
                            case "utf8":
                            case "utf-8":
                                return w(this, e, t, o);
                            case "ascii":
                                return v(this, e, t, o);
                            case "latin1":
                            case "binary":
                                return D(this, e, t, o);
                            case "base64":
                                return A(this, e, t, o);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return C(this, e, t, o);
                            default:
                                if (i) throw new TypeError("Unknown encoding: " + n);
                                ((n = ("" + n).toLowerCase()), (i = !0));
                        }
                }),
                (l.prototype.toJSON = function () {
                    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
                }));
            function k(e, t, o) {
                var n = "";
                o = Math.min(e.length, o);
                for (var a = t; a < o; ++a) n += String.fromCharCode(127 & e[a]);
                return n;
            }
            function _(e, t, o) {
                var n = "";
                o = Math.min(e.length, o);
                for (var a = t; a < o; ++a) n += String.fromCharCode(e[a]);
                return n;
            }
            function T(e, t, o) {
                var n = e.length;
                ((!t || t < 0) && (t = 0), (!o || o < 0 || o > n) && (o = n));
                for (var a = "", i = t; i < o; ++i) a += M(e[i]);
                return a;
            }
            function P(e, t, o) {
                for (var n = e.slice(t, o), a = "", i = 0; i < n.length; i += 2) a += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return a;
            }
            function F(e, t, o) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > o) throw new RangeError("Trying to access beyond buffer length");
            }
            function R(e, t, o, n, a, i) {
                if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > a || t < i) throw new RangeError('"value" argument is out of bounds');
                if (o + n > e.length) throw new RangeError("Index out of range");
            }
            function I(e, t, o, n) {
                t < 0 && (t = 65535 + t + 1);
                for (var a = 0, i = Math.min(e.length - o, 2); a < i; ++a)
                    e[o + a] = (t & (255 << (8 * (n ? a : 1 - a)))) >>> (8 * (n ? a : 1 - a));
            }
            function G(e, t, o, n) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var a = 0, i = Math.min(e.length - o, 4); a < i; ++a) e[o + a] = (t >>> (8 * (n ? a : 3 - a))) & 255;
            }
            function O(e, t, o, n, a, i) {
                if (o + n > e.length) throw new RangeError("Index out of range");
                if (o < 0) throw new RangeError("Index out of range");
            }
            function L(e, t, o, n, i) {
                return (i || O(e, 0, o, 4), a.write(e, t, o, n, 23, 4), o + 4);
            }
            function B(e, t, o, n, i) {
                return (i || O(e, 0, o, 8), a.write(e, t, o, n, 52, 8), o + 8);
            }
            ((l.prototype.slice = function (e, t) {
                var o,
                    n = this.length;
                if (
                    ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                    (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                    t < e && (t = e),
                    l.TYPED_ARRAY_SUPPORT)
                )
                    (o = this.subarray(e, t)).__proto__ = l.prototype;
                else {
                    var a = t - e;
                    o = new l(a, void 0);
                    for (var i = 0; i < a; ++i) o[i] = this[i + e];
                }
                return o;
            }),
                (l.prototype.readUIntLE = function (e, t, o) {
                    ((e |= 0), (t |= 0), o || F(e, t, this.length));
                    for (var n = this[e], a = 1, i = 0; ++i < t && (a *= 256); ) n += this[e + i] * a;
                    return n;
                }),
                (l.prototype.readUIntBE = function (e, t, o) {
                    ((e |= 0), (t |= 0), o || F(e, t, this.length));
                    for (var n = this[e + --t], a = 1; t > 0 && (a *= 256); ) n += this[e + --t] * a;
                    return n;
                }),
                (l.prototype.readUInt8 = function (e, t) {
                    return (t || F(e, 1, this.length), this[e]);
                }),
                (l.prototype.readUInt16LE = function (e, t) {
                    return (t || F(e, 2, this.length), this[e] | (this[e + 1] << 8));
                }),
                (l.prototype.readUInt16BE = function (e, t) {
                    return (t || F(e, 2, this.length), (this[e] << 8) | this[e + 1]);
                }),
                (l.prototype.readUInt32LE = function (e, t) {
                    return (t || F(e, 4, this.length), (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3]);
                }),
                (l.prototype.readUInt32BE = function (e, t) {
                    return (t || F(e, 4, this.length), 16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]));
                }),
                (l.prototype.readIntLE = function (e, t, o) {
                    ((e |= 0), (t |= 0), o || F(e, t, this.length));
                    for (var n = this[e], a = 1, i = 0; ++i < t && (a *= 256); ) n += this[e + i] * a;
                    return (n >= (a *= 128) && (n -= Math.pow(2, 8 * t)), n);
                }),
                (l.prototype.readIntBE = function (e, t, o) {
                    ((e |= 0), (t |= 0), o || F(e, t, this.length));
                    for (var n = t, a = 1, i = this[e + --n]; n > 0 && (a *= 256); ) i += this[e + --n] * a;
                    return (i >= (a *= 128) && (i -= Math.pow(2, 8 * t)), i);
                }),
                (l.prototype.readInt8 = function (e, t) {
                    return (t || F(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]);
                }),
                (l.prototype.readInt16LE = function (e, t) {
                    t || F(e, 2, this.length);
                    var o = this[e] | (this[e + 1] << 8);
                    return 32768 & o ? 4294901760 | o : o;
                }),
                (l.prototype.readInt16BE = function (e, t) {
                    t || F(e, 2, this.length);
                    var o = this[e + 1] | (this[e] << 8);
                    return 32768 & o ? 4294901760 | o : o;
                }),
                (l.prototype.readInt32LE = function (e, t) {
                    return (t || F(e, 4, this.length), this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24));
                }),
                (l.prototype.readInt32BE = function (e, t) {
                    return (t || F(e, 4, this.length), (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]);
                }),
                (l.prototype.readFloatLE = function (e, t) {
                    return (t || F(e, 4, this.length), a.read(this, e, !0, 23, 4));
                }),
                (l.prototype.readFloatBE = function (e, t) {
                    return (t || F(e, 4, this.length), a.read(this, e, !1, 23, 4));
                }),
                (l.prototype.readDoubleLE = function (e, t) {
                    return (t || F(e, 8, this.length), a.read(this, e, !0, 52, 8));
                }),
                (l.prototype.readDoubleBE = function (e, t) {
                    return (t || F(e, 8, this.length), a.read(this, e, !1, 52, 8));
                }),
                (l.prototype.writeUIntLE = function (e, t, o, n) {
                    ((e = +e), (t |= 0), (o |= 0), n) || R(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
                    var a = 1,
                        i = 0;
                    for (this[t] = 255 & e; ++i < o && (a *= 256); ) this[t + i] = (e / a) & 255;
                    return t + o;
                }),
                (l.prototype.writeUIntBE = function (e, t, o, n) {
                    ((e = +e), (t |= 0), (o |= 0), n) || R(this, e, t, o, Math.pow(2, 8 * o) - 1, 0);
                    var a = o - 1,
                        i = 1;
                    for (this[t + a] = 255 & e; --a >= 0 && (i *= 256); ) this[t + a] = (e / i) & 255;
                    return t + o;
                }),
                (l.prototype.writeUInt8 = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 1, 255, 0),
                        l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (l.prototype.writeUInt16LE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 2, 65535, 0),
                        l.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : I(this, e, t, !0),
                        t + 2
                    );
                }),
                (l.prototype.writeUInt16BE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 2, 65535, 0),
                        l.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : I(this, e, t, !1),
                        t + 2
                    );
                }),
                (l.prototype.writeUInt32LE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 4, 4294967295, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t + 3] = e >>> 24), (this[t + 2] = e >>> 16), (this[t + 1] = e >>> 8), (this[t] = 255 & e))
                            : G(this, e, t, !0),
                        t + 4
                    );
                }),
                (l.prototype.writeUInt32BE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 4, 4294967295, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e))
                            : G(this, e, t, !1),
                        t + 4
                    );
                }),
                (l.prototype.writeIntLE = function (e, t, o, n) {
                    if (((e = +e), (t |= 0), !n)) {
                        var a = Math.pow(2, 8 * o - 1);
                        R(this, e, t, o, a - 1, -a);
                    }
                    var i = 0,
                        r = 1,
                        s = 0;
                    for (this[t] = 255 & e; ++i < o && (r *= 256); )
                        (e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), (this[t + i] = (((e / r) >> 0) - s) & 255));
                    return t + o;
                }),
                (l.prototype.writeIntBE = function (e, t, o, n) {
                    if (((e = +e), (t |= 0), !n)) {
                        var a = Math.pow(2, 8 * o - 1);
                        R(this, e, t, o, a - 1, -a);
                    }
                    var i = o - 1,
                        r = 1,
                        s = 0;
                    for (this[t + i] = 255 & e; --i >= 0 && (r *= 256); )
                        (e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), (this[t + i] = (((e / r) >> 0) - s) & 255));
                    return t + o;
                }),
                (l.prototype.writeInt8 = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 1, 127, -128),
                        l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        e < 0 && (e = 255 + e + 1),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (l.prototype.writeInt16LE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 2, 32767, -32768),
                        l.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : I(this, e, t, !0),
                        t + 2
                    );
                }),
                (l.prototype.writeInt16BE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 2, 32767, -32768),
                        l.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : I(this, e, t, !1),
                        t + 2
                    );
                }),
                (l.prototype.writeInt32LE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 4, 2147483647, -2147483648),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8), (this[t + 2] = e >>> 16), (this[t + 3] = e >>> 24))
                            : G(this, e, t, !0),
                        t + 4
                    );
                }),
                (l.prototype.writeInt32BE = function (e, t, o) {
                    return (
                        (e = +e),
                        (t |= 0),
                        o || R(this, e, t, 4, 2147483647, -2147483648),
                        e < 0 && (e = 4294967295 + e + 1),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e))
                            : G(this, e, t, !1),
                        t + 4
                    );
                }),
                (l.prototype.writeFloatLE = function (e, t, o) {
                    return L(this, e, t, !0, o);
                }),
                (l.prototype.writeFloatBE = function (e, t, o) {
                    return L(this, e, t, !1, o);
                }),
                (l.prototype.writeDoubleLE = function (e, t, o) {
                    return B(this, e, t, !0, o);
                }),
                (l.prototype.writeDoubleBE = function (e, t, o) {
                    return B(this, e, t, !1, o);
                }),
                (l.prototype.copy = function (e, t, o, n) {
                    if (
                        (o || (o = 0),
                        n || 0 === n || (n = this.length),
                        t >= e.length && (t = e.length),
                        t || (t = 0),
                        n > 0 && n < o && (n = o),
                        n === o)
                    )
                        return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (t < 0) throw new RangeError("targetStart out of bounds");
                    if (o < 0 || o >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    (n > this.length && (n = this.length), e.length - t < n - o && (n = e.length - t + o));
                    var a,
                        i = n - o;
                    if (this === e && o < t && t < n) for (a = i - 1; a >= 0; --a) e[a + t] = this[a + o];
                    else if (i < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (a = 0; a < i; ++a) e[a + t] = this[a + o];
                    else Uint8Array.prototype.set.call(e, this.subarray(o, o + i), t);
                    return i;
                }),
                (l.prototype.fill = function (e, t, o, n) {
                    if ("string" == typeof e) {
                        if (
                            ("string" == typeof t
                                ? ((n = t), (t = 0), (o = this.length))
                                : "string" == typeof o && ((n = o), (o = this.length)),
                            1 === e.length)
                        ) {
                            var a = e.charCodeAt(0);
                            a < 256 && (e = a);
                        }
                        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    } else "number" == typeof e && (e &= 255);
                    if (t < 0 || this.length < t || this.length < o) throw new RangeError("Out of range index");
                    if (o <= t) return this;
                    var i;
                    if (((t >>>= 0), (o = void 0 === o ? this.length : o >>> 0), e || (e = 0), "number" == typeof e))
                        for (i = t; i < o; ++i) this[i] = e;
                    else {
                        var r = l.isBuffer(e) ? e : U(new l(e, n).toString()),
                            s = r.length;
                        for (i = 0; i < o - t; ++i) this[i + t] = r[i % s];
                    }
                    return this;
                }));
            var N = /[^+\/0-9A-Za-z-_]/g;
            function M(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16);
            }
            function U(e, t) {
                var o;
                t = t || 1 / 0;
                for (var n = e.length, a = null, i = [], r = 0; r < n; ++r) {
                    if ((o = e.charCodeAt(r)) > 55295 && o < 57344) {
                        if (!a) {
                            if (o > 56319) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue;
                            }
                            if (r + 1 === n) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue;
                            }
                            a = o;
                            continue;
                        }
                        if (o < 56320) {
                            ((t -= 3) > -1 && i.push(239, 191, 189), (a = o));
                            continue;
                        }
                        o = 65536 + (((a - 55296) << 10) | (o - 56320));
                    } else a && (t -= 3) > -1 && i.push(239, 191, 189);
                    if (((a = null), o < 128)) {
                        if ((t -= 1) < 0) break;
                        i.push(o);
                    } else if (o < 2048) {
                        if ((t -= 2) < 0) break;
                        i.push((o >> 6) | 192, (63 & o) | 128);
                    } else if (o < 65536) {
                        if ((t -= 3) < 0) break;
                        i.push((o >> 12) | 224, ((o >> 6) & 63) | 128, (63 & o) | 128);
                    } else {
                        if (!(o < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        i.push((o >> 18) | 240, ((o >> 12) & 63) | 128, ((o >> 6) & 63) | 128, (63 & o) | 128);
                    }
                }
                return i;
            }
            function W(e) {
                return n.toByteArray(
                    (function (e) {
                        if (
                            (e = (function (e) {
                                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
                            })(e).replace(N, "")).length < 2
                        )
                            return "";
                        for (; e.length % 4 != 0; ) e += "=";
                        return e;
                    })(e)
                );
            }
            function j(e, t, o, n) {
                for (var a = 0; a < n && !(a + o >= t.length || a >= e.length); ++a) t[a + o] = e[a];
                return a;
            }
        }).call(this, o(109));
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(29),
            i = o(396),
            r = o(174),
            s = o(184),
            l = o(294),
            c = o(61),
            u = o(399),
            d = Object.getOwnPropertyDescriptor;
        t.f = n
            ? d
            : function (e, t) {
                  if (((e = s(e)), (t = l(t)), u))
                      try {
                          return d(e, t);
                      } catch (e) {}
                  if (c(e, t)) return r(!a(i.f, e, t), e[t]);
              };
    },
    function (e, t, o) {
        "use strict";
        var n = o(116),
            a = o(27);
        e.exports = function (e) {
            if ("Function" === n(e)) return a(e);
        };
    },
    ,
    function (e, t, o) {
        "use strict";
        e.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version",
        };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        const n = {
            IS_LOCALHOST: "localhost" === window.location.hostname,
            IS_RC: !1,
            IS_BETA: !1,
            IS_TRUNK: !1,
            IS_PRODUCTION: !0,
            IS_LTS: !1,
            IS_WEB_WORKER: "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
        };
        e.exports = n;
    },
    function (e, t, o) {
        "use strict";
        var n = o(79);
        e.exports = function (e, t, o) {
            for (var a in t) n(e, a, t[a], o);
            return e;
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(21);
        e.exports = !n(function () {
            var e = function () {}.bind();
            return "function" != typeof e || e.hasOwnProperty("prototype");
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(21),
            i = o(116),
            r = Object,
            s = n("".split);
        e.exports = a(function () {
            return !r("z").propertyIsEnumerable(0);
        })
            ? function (e) {
                  return "String" === i(e) ? s(e, "") : r(e);
              }
            : r;
    },
    function (e, t, o) {
        "use strict";
        var n = o(110),
            a = o(35),
            i = o(144),
            r = o(398),
            s = Object;
        e.exports = r
            ? function (e) {
                  return "symbol" == typeof e;
              }
            : function (e) {
                  var t = n("Symbol");
                  return a(t) && i(t.prototype, s(e));
              };
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(46),
            i = n.document,
            r = a(i) && a(i.createElement);
        e.exports = function (e) {
            return r ? i.createElement(e) : {};
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(402),
            a = o(301).concat("length", "prototype");
        t.f =
            Object.getOwnPropertyNames ||
            function (e) {
                return n(e, a);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(130),
            a = Math.max,
            i = Math.min;
        e.exports = function (e, t) {
            var o = n(e);
            return o < 0 ? a(o + t, 0) : i(o, t);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(407);
        e.exports = "NODE" === n;
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(65),
            i = o(37),
            r = o(185),
            s = o(204),
            l = TypeError;
        e.exports = function (e, t) {
            var o = arguments.length < 2 ? s(e) : t;
            if (a(o)) return i(n(o, e));
            throw new l(r(e) + " is not iterable");
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(27),
            i = o(278),
            r = o(37),
            s = o(46),
            l = o(92),
            c = o(342),
            u = o(308),
            d = o(117),
            p = o(62),
            h = o(145),
            g = o(279),
            f = o(344),
            m = o(21),
            x = f.UNSUPPORTED_Y,
            y = Math.min,
            b = a([].push),
            w = a("".slice),
            v = !m(function () {
                var e = /(?:)/,
                    t = e.exec;
                e.exec = function () {
                    return t.apply(this, arguments);
                };
                var o = "ab".split(e);
                return 2 !== o.length || "a" !== o[0] || "b" !== o[1];
            }),
            D =
                "c" === "abbc".split(/(b)*/)[1] ||
                4 !== "test".split(/(?:)/, -1).length ||
                2 !== "ab".split(/(?:ab)*/).length ||
                4 !== ".".split(/(.?)(.?)/).length ||
                ".".split(/()()/).length > 1 ||
                "".split(/.?/).length;
        i(
            "split",
            function (e, t, o) {
                var a = "0".split(void 0, 0).length
                    ? function (e, o) {
                          return void 0 === e && 0 === o ? [] : n(t, this, e, o);
                      }
                    : t;
                return [
                    function (t, o) {
                        var i = l(this),
                            r = s(t) ? h(t, e) : void 0;
                        return r ? n(r, t, i, o) : n(a, p(i), t, o);
                    },
                    function (e, n) {
                        var i = r(this),
                            s = p(e);
                        if (!D) {
                            var l = o(a, i, s, n, a !== t);
                            if (l.done) return l.value;
                        }
                        var h = c(i, RegExp),
                            f = i.unicode,
                            m = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.unicode ? "u" : "") + (x ? "g" : "y"),
                            v = new h(x ? "^(?:" + i.source + ")" : i, m),
                            A = void 0 === n ? 4294967295 : n >>> 0;
                        if (0 === A) return [];
                        if (0 === s.length) return null === g(v, s) ? [s] : [];
                        for (var C = 0, E = 0, S = []; E < s.length; ) {
                            v.lastIndex = x ? 0 : E;
                            var k,
                                _ = g(v, x ? w(s, E) : s);
                            if (null === _ || (k = y(d(v.lastIndex + (x ? E : 0)), s.length)) === C) E = u(s, E, f);
                            else {
                                if ((b(S, w(s, C, E)), S.length === A)) return S;
                                for (var T = 1; T <= _.length - 1; T++) if ((b(S, _[T]), S.length === A)) return S;
                                E = C = k;
                            }
                        }
                        return (b(S, w(s, C)), S);
                    },
                ];
            },
            D || !v,
            x
        );
    },
    function (e, t, o) {
        "use strict";
        e.exports = "\t\n\v\f\r                　\u2028\u2029\ufeff";
    },
    ,
    function (e, t, o) {
        "use strict";
        ((t.byteLength = function (e) {
            var t = c(e),
                o = t[0],
                n = t[1];
            return (3 * (o + n)) / 4 - n;
        }),
            (t.toByteArray = function (e) {
                var t,
                    o,
                    n = c(e),
                    r = n[0],
                    s = n[1],
                    l = new i(
                        (function (e, t, o) {
                            return (3 * (t + o)) / 4 - o;
                        })(0, r, s)
                    ),
                    u = 0,
                    d = s > 0 ? r - 4 : r;
                for (o = 0; o < d; o += 4)
                    ((t =
                        (a[e.charCodeAt(o)] << 18) |
                        (a[e.charCodeAt(o + 1)] << 12) |
                        (a[e.charCodeAt(o + 2)] << 6) |
                        a[e.charCodeAt(o + 3)]),
                        (l[u++] = (t >> 16) & 255),
                        (l[u++] = (t >> 8) & 255),
                        (l[u++] = 255 & t));
                2 === s && ((t = (a[e.charCodeAt(o)] << 2) | (a[e.charCodeAt(o + 1)] >> 4)), (l[u++] = 255 & t));
                1 === s &&
                    ((t = (a[e.charCodeAt(o)] << 10) | (a[e.charCodeAt(o + 1)] << 4) | (a[e.charCodeAt(o + 2)] >> 2)),
                    (l[u++] = (t >> 8) & 255),
                    (l[u++] = 255 & t));
                return l;
            }),
            (t.fromByteArray = function (e) {
                for (var t, o = e.length, a = o % 3, i = [], r = 0, s = o - a; r < s; r += 16383)
                    i.push(u(e, r, r + 16383 > s ? s : r + 16383));
                1 === a
                    ? ((t = e[o - 1]), i.push(n[t >> 2] + n[(t << 4) & 63] + "=="))
                    : 2 === a && ((t = (e[o - 2] << 8) + e[o - 1]), i.push(n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + "="));
                return i.join("");
            }));
        for (
            var n = [],
                a = [],
                i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                s = 0,
                l = r.length;
            s < l;
            ++s
        )
            ((n[s] = r[s]), (a[r.charCodeAt(s)] = s));
        function c(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var o = e.indexOf("=");
            return (-1 === o && (o = t), [o, o === t ? 0 : 4 - (o % 4)]);
        }
        function u(e, t, o) {
            for (var a, i, r = [], s = t; s < o; s += 3)
                ((a = ((e[s] << 16) & 16711680) + ((e[s + 1] << 8) & 65280) + (255 & e[s + 2])),
                    r.push(n[((i = a) >> 18) & 63] + n[(i >> 12) & 63] + n[(i >> 6) & 63] + n[63 & i]));
            return r.join("");
        }
        ((a["-".charCodeAt(0)] = 62), (a["_".charCodeAt(0)] = 63));
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r = o(21),
            s = o(35),
            l = o(46),
            c = o(136),
            u = o(208),
            d = o(79),
            p = o(43),
            h = o(74),
            g = p("iterator"),
            f = !1;
        ([].keys && ("next" in (i = [].keys()) ? (a = u(u(i))) !== Object.prototype && (n = a) : (f = !0)),
            !l(n) ||
            r(function () {
                var e = {};
                return n[g].call(e) !== e;
            })
                ? (n = {})
                : h && (n = c(n)),
            s(n[g]) ||
                d(n, g, function () {
                    return this;
                }),
            (e.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: f }));
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            return { value: e, done: t };
        };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = 0,
            i = Math.random(),
            r = n((1).toString);
        e.exports = function (e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + r(++a + i, 36);
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = {};
    },
    function (e, t, o) {
        "use strict";
        var n = o(110),
            a = o(120),
            i = o(43),
            r = o(49),
            s = i("species");
        e.exports = function (e) {
            var t = n(e);
            r &&
                t &&
                !t[s] &&
                a(t, s, {
                    configurable: !0,
                    get: function () {
                        return this;
                    },
                });
        };
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(92),
            i = o(62),
            r = o(248),
            s = n("".replace),
            l = RegExp("^[" + r + "]+"),
            c = RegExp("(^|[^" + r + "])[" + r + "]+$"),
            u = function (e) {
                return function (t) {
                    var o = i(a(t));
                    return (1 & e && (o = s(o, l, "")), 2 & e && (o = s(o, c, "$1")), o);
                };
            };
        e.exports = { start: u(1), end: u(2), trim: u(3) };
    },
    function (e, t, o) {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = t.GRegex = void 0));
        const { NOTIFICATION_USER_MENTION_REGEX: n } = o(10),
            a = (t.GRegex = {
                String: {
                    InParenthesis: { NotNegativeNumberInTheEnd: /\(\d+\)$/ },
                    SpacesLineBreak: /\s/,
                    NotNegativeNumber: /\d+/,
                    MentionInputRtrim: /\s+$/,
                    MentionInputRegexpEncode: /([.*+?^=!:${}()|\[\]\/\\])/g,
                    MentionInputHighlightRegString: "(?![^&;]+;)(?!<[^<>]*)(<%=term%>)(?![^<>]*>)(?![^&;]+;)",
                    USERNAME_RE: n || /@[^\r\n\t\f\v\s,{#%'"*<()>}:`;,!&?$+^\/|=\]\[\\]+/g,
                    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    FileExtension: /\.[0-9a-z]+$/i,
                    MultipleDotsEnd: /\.+$/,
                    InvalidFileName: /(\\|\||\/)/,
                    ValidFileName:
                        /^(?:[\x2D0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])+(?:[ -\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/,
                },
                URLQuery: { NextParameter: /[?&]([^=#]+)=([^&#]*)/g },
                NavigatorUserAgent: { IS_CHROME_OS: /CrO[S\u017F]/i },
            });
        t.default = { String: a.String };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(21),
            a = o(35),
            i = /#|\.prototype\./,
            r = function (e, t) {
                var o = l[s(e)];
                return o === u || (o !== c && (a(t) ? n(t) : !!t));
            },
            s = (r.normalize = function (e) {
                return String(e).replace(i, ".").toLowerCase();
            }),
            l = (r.data = {}),
            c = (r.NATIVE = "N"),
            u = (r.POLYFILL = "P");
        e.exports = r;
    },
    function (e, t, o) {
        "use strict";
        o(20);
        var n = o(29),
            a = o(79),
            i = o(306),
            r = o(21),
            s = o(43),
            l = o(100),
            c = s("species"),
            u = RegExp.prototype;
        e.exports = function (e, t, o, d) {
            var p = s(e),
                h = !r(function () {
                    var t = {};
                    return (
                        (t[p] = function () {
                            return 7;
                        }),
                        7 !== ""[e](t)
                    );
                }),
                g =
                    h &&
                    !r(function () {
                        var t = !1,
                            o = /a/;
                        return (
                            "split" === e &&
                                (((o = {}).constructor = {}),
                                (o.constructor[c] = function () {
                                    return o;
                                }),
                                (o.flags = ""),
                                (o[p] = /./[p])),
                            (o.exec = function () {
                                return ((t = !0), null);
                            }),
                            o[p](""),
                            !t
                        );
                    });
            if (!h || !g || o) {
                var f = /./[p],
                    m = t(p, ""[e], function (e, t, o, a, r) {
                        var s = t.exec;
                        return s === i || s === u.exec
                            ? h && !r
                                ? { done: !0, value: n(f, t, o, a) }
                                : { done: !0, value: n(e, o, t, a) }
                            : { done: !1 };
                    });
                (a(String.prototype, e, m[0]), a(u, p, m[1]));
            }
            d && l(u[p], "sham", !0);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(37),
            i = o(35),
            r = o(116),
            s = o(306),
            l = TypeError;
        e.exports = function (e, t) {
            var o = e.exec;
            if (i(o)) {
                var c = n(o, e, t);
                return (null !== c && a(c), c);
            }
            if ("RegExp" === r(e)) return n(s, e, t);
            throw new l("RegExp#exec called on incompatible receiver");
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
        e.exports = require("path");
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(35),
            a = o(46),
            i = o(175);
        e.exports = function (e, t, o) {
            var r, s;
            return (i && n((r = t.constructor)) && r !== o && a((s = r.prototype)) && s !== o.prototype && i(e, s), e);
        };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(397),
            a = o(241);
        e.exports = function (e) {
            var t = n(e, "string");
            return a(t) ? t : t + "";
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(213),
            a = o(21),
            i = o(23).String;
        e.exports =
            !!Object.getOwnPropertySymbols &&
            !a(function () {
                var e = Symbol("symbol detection");
                return !i(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && n && n < 41);
            });
    },
    function (e, t, o) {
        "use strict";
        var n = o(297);
        e.exports = function (e, t) {
            return n[e] || (n[e] = t || {});
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(74),
            a = o(23),
            i = o(298),
            r = (e.exports = a["__core-js_shared__"] || i("__core-js_shared__", {}));
        (r.versions || (r.versions = [])).push({
            version: "3.42.0",
            mode: n ? "pure" : "global",
            copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE",
            source: "https://github.com/zloirock/core-js",
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = Object.defineProperty;
        e.exports = function (e, t) {
            try {
                a(n, e, { value: t, configurable: !0, writable: !0 });
            } catch (o) {
                n[e] = t;
            }
            return t;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(35),
            i = o(297),
            r = n(Function.toString);
        (a(i.inspectSource) ||
            (i.inspectSource = function (e) {
                return r(e);
            }),
            (e.exports = i.inspectSource));
    },
    function (e, t, o) {
        "use strict";
        var n = o(296),
            a = o(258),
            i = n("keys");
        e.exports = function (e) {
            return i[e] || (i[e] = a(e));
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(21),
            i = o(35),
            r = o(131),
            s = o(110),
            l = o(299),
            c = function () {},
            u = s("Reflect", "construct"),
            d = /^\s*(?:class|function)\b/,
            p = n(d.exec),
            h = !d.test(c),
            g = function (e) {
                if (!i(e)) return !1;
                try {
                    return (u(c, [], e), !0);
                } catch (e) {
                    return !1;
                }
            },
            f = function (e) {
                if (!i(e)) return !1;
                switch (r(e)) {
                    case "AsyncFunction":
                    case "GeneratorFunction":
                    case "AsyncGeneratorFunction":
                        return !1;
                }
                try {
                    return h || !!p(d, l(e));
                } catch (e) {
                    return !0;
                }
            };
        ((f.sham = !0),
            (e.exports =
                !u ||
                a(function () {
                    var e;
                    return (
                        g(g.call) ||
                        !g(Object) ||
                        !g(function () {
                            e = !0;
                        }) ||
                        e
                    );
                })
                    ? f
                    : g));
    },
    function (e, t, o) {
        "use strict";
        var n = TypeError;
        e.exports = function (e, t) {
            if (e < t) throw new n("Not enough arguments");
            return e;
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            try {
                return { error: !1, value: e() };
            } catch (e) {
                return { error: !0, value: e };
            }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(43),
            a = o(203),
            i = n("iterator"),
            r = Array.prototype;
        e.exports = function (e) {
            return void 0 !== e && (a.Array === e || r[i] === e);
        };
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i = o(29),
            r = o(27),
            s = o(62),
            l = o(307),
            c = o(344),
            u = o(296),
            d = o(136),
            p = o(80).get,
            h = o(458),
            g = o(459),
            f = u("native-string-replace", String.prototype.replace),
            m = RegExp.prototype.exec,
            x = m,
            y = r("".charAt),
            b = r("".indexOf),
            w = r("".replace),
            v = r("".slice),
            D = ((a = /b*/g), i(m, (n = /a/), "a"), i(m, a, "a"), 0 !== n.lastIndex || 0 !== a.lastIndex),
            A = c.BROKEN_CARET,
            C = void 0 !== /()??/.exec("")[1];
        ((D || C || A || h || g) &&
            (x = function (e) {
                var t,
                    o,
                    n,
                    a,
                    r,
                    c,
                    u,
                    h = this,
                    g = p(h),
                    E = s(e),
                    S = g.raw;
                if (S) return ((S.lastIndex = h.lastIndex), (t = i(x, S, E)), (h.lastIndex = S.lastIndex), t);
                var k = g.groups,
                    _ = A && h.sticky,
                    T = i(l, h),
                    P = h.source,
                    F = 0,
                    R = E;
                if (
                    (_ &&
                        ((T = w(T, "y", "")),
                        -1 === b(T, "g") && (T += "g"),
                        (R = v(E, h.lastIndex)),
                        h.lastIndex > 0 &&
                            (!h.multiline || (h.multiline && "\n" !== y(E, h.lastIndex - 1))) &&
                            ((P = "(?: " + P + ")"), (R = " " + R), F++),
                        (o = new RegExp("^(?:" + P + ")", T))),
                    C && (o = new RegExp("^" + P + "$(?!\\s)", T)),
                    D && (n = h.lastIndex),
                    (a = i(m, _ ? o : h, R)),
                    _
                        ? a
                            ? ((a.input = v(a.input, F)), (a[0] = v(a[0], F)), (a.index = h.lastIndex), (h.lastIndex += a[0].length))
                            : (h.lastIndex = 0)
                        : D && a && (h.lastIndex = h.global ? a.index + a[0].length : n),
                    C &&
                        a &&
                        a.length > 1 &&
                        i(f, a[0], o, function () {
                            for (r = 1; r < arguments.length - 2; r++) void 0 === arguments[r] && (a[r] = void 0);
                        }),
                    a && k)
                )
                    for (a.groups = c = d(null), r = 0; r < k.length; r++) c[(u = k[r])[0]] = a[u[1]];
                return a;
            }),
            (e.exports = x));
    },
    function (e, t, o) {
        "use strict";
        var n = o(37);
        e.exports = function () {
            var e = n(this),
                t = "";
            return (
                e.hasIndices && (t += "d"),
                e.global && (t += "g"),
                e.ignoreCase && (t += "i"),
                e.multiline && (t += "m"),
                e.dotAll && (t += "s"),
                e.unicode && (t += "u"),
                e.unicodeSets && (t += "v"),
                e.sticky && (t += "y"),
                t
            );
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(309).charAt;
        e.exports = function (e, t, o) {
            return t + (o ? n(e, t).length : 1);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(130),
            i = o(62),
            r = o(92),
            s = n("".charAt),
            l = n("".charCodeAt),
            c = n("".slice),
            u = function (e) {
                return function (t, o) {
                    var n,
                        u,
                        d = i(r(t)),
                        p = a(o),
                        h = d.length;
                    return p < 0 || p >= h
                        ? e
                            ? ""
                            : void 0
                        : (n = l(d, p)) < 55296 || n > 56319 || p + 1 === h || (u = l(d, p + 1)) < 56320 || u > 57343
                          ? e
                              ? s(d, p)
                              : n
                          : e
                            ? c(d, p, p + 2)
                            : u - 56320 + ((n - 55296) << 10) + 65536;
                };
            };
        e.exports = { codeAt: u(!1), charAt: u(!0) };
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e, t, o, n) {
            for (var a = (65535 & e) | 0, i = ((e >>> 16) & 65535) | 0, r = 0; 0 !== o; ) {
                o -= r = o > 2e3 ? 2e3 : o;
                do {
                    i = (i + (a = (a + t[n++]) | 0)) | 0;
                } while (--r);
                ((a %= 65521), (i %= 65521));
            }
            return a | (i << 16) | 0;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = (function () {
            for (var e, t = [], o = 0; o < 256; o++) {
                e = o;
                for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
                t[o] = e;
            }
            return t;
        })();
        e.exports = function (e, t, o, a) {
            var i = n,
                r = a + o;
            e ^= -1;
            for (var s = a; s < r; s++) e = (e >>> 8) ^ i[255 & (e ^ t[s])];
            return -1 ^ e;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(94),
            a = !0,
            i = !0;
        try {
            String.fromCharCode.apply(null, [0]);
        } catch (e) {
            a = !1;
        }
        try {
            String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (e) {
            i = !1;
        }
        for (var r = new n.Buf8(256), s = 0; s < 256; s++)
            r[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;
        function l(e, t) {
            if (t < 65534 && ((e.subarray && i) || (!e.subarray && a))) return String.fromCharCode.apply(null, n.shrinkBuf(e, t));
            for (var o = "", r = 0; r < t; r++) o += String.fromCharCode(e[r]);
            return o;
        }
        ((r[254] = r[254] = 1),
            (t.string2buf = function (e) {
                var t,
                    o,
                    a,
                    i,
                    r,
                    s = e.length,
                    l = 0;
                for (i = 0; i < s; i++)
                    (55296 == (64512 & (o = e.charCodeAt(i))) &&
                        i + 1 < s &&
                        56320 == (64512 & (a = e.charCodeAt(i + 1))) &&
                        ((o = 65536 + ((o - 55296) << 10) + (a - 56320)), i++),
                        (l += o < 128 ? 1 : o < 2048 ? 2 : o < 65536 ? 3 : 4));
                for (t = new n.Buf8(l), r = 0, i = 0; r < l; i++)
                    (55296 == (64512 & (o = e.charCodeAt(i))) &&
                        i + 1 < s &&
                        56320 == (64512 & (a = e.charCodeAt(i + 1))) &&
                        ((o = 65536 + ((o - 55296) << 10) + (a - 56320)), i++),
                        o < 128
                            ? (t[r++] = o)
                            : o < 2048
                              ? ((t[r++] = 192 | (o >>> 6)), (t[r++] = 128 | (63 & o)))
                              : o < 65536
                                ? ((t[r++] = 224 | (o >>> 12)), (t[r++] = 128 | ((o >>> 6) & 63)), (t[r++] = 128 | (63 & o)))
                                : ((t[r++] = 240 | (o >>> 18)),
                                  (t[r++] = 128 | ((o >>> 12) & 63)),
                                  (t[r++] = 128 | ((o >>> 6) & 63)),
                                  (t[r++] = 128 | (63 & o))));
                return t;
            }),
            (t.buf2binstring = function (e) {
                return l(e, e.length);
            }),
            (t.binstring2buf = function (e) {
                for (var t = new n.Buf8(e.length), o = 0, a = t.length; o < a; o++) t[o] = e.charCodeAt(o);
                return t;
            }),
            (t.buf2string = function (e, t) {
                var o,
                    n,
                    a,
                    i,
                    s = t || e.length,
                    c = new Array(2 * s);
                for (n = 0, o = 0; o < s; )
                    if ((a = e[o++]) < 128) c[n++] = a;
                    else if ((i = r[a]) > 4) ((c[n++] = 65533), (o += i - 1));
                    else {
                        for (a &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && o < s; ) ((a = (a << 6) | (63 & e[o++])), i--);
                        i > 1
                            ? (c[n++] = 65533)
                            : a < 65536
                              ? (c[n++] = a)
                              : ((a -= 65536), (c[n++] = 55296 | ((a >> 10) & 1023)), (c[n++] = 56320 | (1023 & a)));
                    }
                return l(c, n);
            }),
            (t.utf8border = function (e, t) {
                var o;
                for ((t = t || e.length) > e.length && (t = e.length), o = t - 1; o >= 0 && 128 == (192 & e[o]); ) o--;
                return o < 0 || 0 === o ? t : o + r[e[o]] > t ? o : t;
            }));
    },
    function (e, t, o) {
        "use strict";
        e.exports = function () {
            ((this.input = null),
                (this.next_in = 0),
                (this.avail_in = 0),
                (this.total_in = 0),
                (this.output = null),
                (this.next_out = 0),
                (this.avail_out = 0),
                (this.total_out = 0),
                (this.msg = ""),
                (this.state = null),
                (this.data_type = 2),
                (this.adler = 0));
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8,
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        o(669);
    },
    function (e, t, o) {
        "use strict";
        var n = o(37),
            a = o(102);
        e.exports = function (e, t, o, i) {
            try {
                return i ? t(n(o)[0], o[1]) : t(o);
            } catch (t) {
                a(e, "throw", t);
            }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(27),
            i = o(49),
            r = o(425),
            s = o(199),
            l = o(100),
            c = o(120),
            u = o(232),
            d = o(21),
            p = o(146),
            h = o(130),
            g = o(117),
            f = o(426),
            m = o(687),
            x = o(691),
            y = o(208),
            b = o(175),
            w = o(427),
            v = o(157),
            D = o(288),
            A = o(341),
            C = o(137),
            E = o(80),
            S = s.PROPER,
            k = s.CONFIGURABLE,
            _ = E.getterFor("ArrayBuffer"),
            T = E.getterFor("DataView"),
            P = E.set,
            F = n.ArrayBuffer,
            R = F,
            I = R && R.prototype,
            G = n.DataView,
            O = G && G.prototype,
            L = Object.prototype,
            B = n.Array,
            N = n.RangeError,
            M = a(w),
            U = a([].reverse),
            W = x.pack,
            j = x.unpack,
            z = function (e) {
                return [255 & e];
            },
            V = function (e) {
                return [255 & e, (e >> 8) & 255];
            },
            Y = function (e) {
                return [255 & e, (e >> 8) & 255, (e >> 16) & 255, (e >> 24) & 255];
            },
            H = function (e) {
                return (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0];
            },
            q = function (e) {
                return W(m(e), 23, 4);
            },
            K = function (e) {
                return W(e, 52, 8);
            },
            Z = function (e, t, o) {
                c(e.prototype, t, {
                    configurable: !0,
                    get: function () {
                        return o(this)[t];
                    },
                });
            },
            J = function (e, t, o, n) {
                var a = T(e),
                    i = f(o),
                    r = !!n;
                if (i + t > a.byteLength) throw new N("Wrong index");
                var s = a.bytes,
                    l = i + a.byteOffset,
                    c = v(s, l, l + t);
                return r ? c : U(c);
            },
            X = function (e, t, o, n, a, i) {
                var r = T(e),
                    s = f(o),
                    l = n(+a),
                    c = !!i;
                if (s + t > r.byteLength) throw new N("Wrong index");
                for (var u = r.bytes, d = s + r.byteOffset, p = 0; p < t; p++) u[d + p] = l[c ? p : t - p - 1];
            };
        if (r) {
            var Q = S && "ArrayBuffer" !== F.name;
            (d(function () {
                F(1);
            }) &&
            d(function () {
                new F(-1);
            }) &&
            !d(function () {
                return (new F(), new F(1.5), new F(NaN), 1 !== F.length || (Q && !k));
            })
                ? Q && k && l(F, "name", "ArrayBuffer")
                : (((R = function (e) {
                      return (p(this, I), D(new F(f(e)), this, R));
                  }).prototype = I),
                  (I.constructor = R),
                  A(R, F)),
                b && y(O) !== L && b(O, L));
            var $ = new G(new R(2)),
                ee = a(O.setInt8);
            ($.setInt8(0, 2147483648),
                $.setInt8(1, 2147483649),
                (!$.getInt8(0) && $.getInt8(1)) ||
                    u(
                        O,
                        {
                            setInt8: function (e, t) {
                                ee(this, e, (t << 24) >> 24);
                            },
                            setUint8: function (e, t) {
                                ee(this, e, (t << 24) >> 24);
                            },
                        },
                        { unsafe: !0 }
                    ));
        } else
            ((I = (R = function (e) {
                p(this, I);
                var t = f(e);
                (P(this, { type: "ArrayBuffer", bytes: M(B(t), 0), byteLength: t }), i || ((this.byteLength = t), (this.detached = !1)));
            }).prototype),
                (O = (G = function (e, t, o) {
                    (p(this, O), p(e, I));
                    var n = _(e),
                        a = n.byteLength,
                        r = h(t);
                    if (r < 0 || r > a) throw new N("Wrong offset");
                    if (r + (o = void 0 === o ? a - r : g(o)) > a) throw new N("Wrong length");
                    (P(this, { type: "DataView", buffer: e, byteLength: o, byteOffset: r, bytes: n.bytes }),
                        i || ((this.buffer = e), (this.byteLength = o), (this.byteOffset = r)));
                }).prototype),
                i && (Z(R, "byteLength", _), Z(G, "buffer", T), Z(G, "byteLength", T), Z(G, "byteOffset", T)),
                u(O, {
                    getInt8: function (e) {
                        return (J(this, 1, e)[0] << 24) >> 24;
                    },
                    getUint8: function (e) {
                        return J(this, 1, e)[0];
                    },
                    getInt16: function (e) {
                        var t = J(this, 2, e, arguments.length > 1 && arguments[1]);
                        return (((t[1] << 8) | t[0]) << 16) >> 16;
                    },
                    getUint16: function (e) {
                        var t = J(this, 2, e, arguments.length > 1 && arguments[1]);
                        return (t[1] << 8) | t[0];
                    },
                    getInt32: function (e) {
                        return H(J(this, 4, e, arguments.length > 1 && arguments[1]));
                    },
                    getUint32: function (e) {
                        return H(J(this, 4, e, arguments.length > 1 && arguments[1])) >>> 0;
                    },
                    getFloat32: function (e) {
                        return j(J(this, 4, e, arguments.length > 1 && arguments[1]), 23);
                    },
                    getFloat64: function (e) {
                        return j(J(this, 8, e, arguments.length > 1 && arguments[1]), 52);
                    },
                    setInt8: function (e, t) {
                        X(this, 1, e, z, t);
                    },
                    setUint8: function (e, t) {
                        X(this, 1, e, z, t);
                    },
                    setInt16: function (e, t) {
                        X(this, 2, e, V, t, arguments.length > 2 && arguments[2]);
                    },
                    setUint16: function (e, t) {
                        X(this, 2, e, V, t, arguments.length > 2 && arguments[2]);
                    },
                    setInt32: function (e, t) {
                        X(this, 4, e, Y, t, arguments.length > 2 && arguments[2]);
                    },
                    setUint32: function (e, t) {
                        X(this, 4, e, Y, t, arguments.length > 2 && arguments[2]);
                    },
                    setFloat32: function (e, t) {
                        X(this, 4, e, q, t, arguments.length > 2 && arguments[2]);
                    },
                    setFloat64: function (e, t) {
                        X(this, 8, e, K, t, arguments.length > 2 && arguments[2]);
                    },
                }));
        (C(R, "ArrayBuffer"), C(G, "DataView"), (e.exports = { ArrayBuffer: R, DataView: G }));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(61),
            a = o(615),
            i = o(222),
            r = o(88);
        e.exports = function (e, t, o) {
            for (var s = a(t), l = r.f, c = i.f, u = 0; u < s.length; u++) {
                var d = s[u];
                n(e, d) || (o && n(o, d)) || l(e, d, c(t, d));
            }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(37),
            a = o(408),
            i = o(194),
            r = o(43)("species");
        e.exports = function (e, t) {
            var o,
                s = n(e).constructor;
            return void 0 === s || i((o = n(s)[r])) ? t : a(o);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(43)("iterator"),
            a = !1;
        try {
            var i = 0,
                r = {
                    next: function () {
                        return { done: !!i++ };
                    },
                    return: function () {
                        a = !0;
                    },
                };
            ((r[n] = function () {
                return this;
            }),
                Array.from(r, function () {
                    throw 2;
                }));
        } catch (e) {}
        e.exports = function (e, t) {
            try {
                if (!t && !a) return !1;
            } catch (e) {
                return !1;
            }
            var o = !1;
            try {
                var i = {};
                ((i[n] = function () {
                    return {
                        next: function () {
                            return { done: (o = !0) };
                        },
                    };
                }),
                    e(i));
            } catch (e) {}
            return o;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(21),
            a = o(23).RegExp,
            i = n(function () {
                var e = a("a", "y");
                return ((e.lastIndex = 2), null !== e.exec("abcd"));
            }),
            r =
                i ||
                n(function () {
                    return !a("a", "y").sticky;
                }),
            s =
                i ||
                n(function () {
                    var e = a("^r", "gy");
                    return ((e.lastIndex = 2), null !== e.exec("str"));
                });
        e.exports = { BROKEN_CARET: s, MISSED_STICKY: r, UNSUPPORTED_Y: i };
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(116);
        e.exports =
            Array.isArray ||
            function (e) {
                return "Array" === n(e);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(124),
            a = o(27),
            i = o(240),
            r = o(93),
            s = o(101),
            l = o(573),
            c = a([].push),
            u = function (e) {
                var t = 1 === e,
                    o = 2 === e,
                    a = 3 === e,
                    u = 4 === e,
                    d = 6 === e,
                    p = 7 === e,
                    h = 5 === e || d;
                return function (g, f, m, x) {
                    for (
                        var y, b, w = r(g), v = i(w), D = s(v), A = n(f, m), C = 0, E = x || l, S = t ? E(g, D) : o || p ? E(g, 0) : void 0;
                        D > C;
                        C++
                    )
                        if ((h || C in v) && ((b = A((y = v[C]), C, w)), e))
                            if (t) S[C] = b;
                            else if (b)
                                switch (e) {
                                    case 3:
                                        return !0;
                                    case 5:
                                        return y;
                                    case 6:
                                        return C;
                                    case 2:
                                        c(S, y);
                                }
                            else
                                switch (e) {
                                    case 4:
                                        return !1;
                                    case 7:
                                        c(S, y);
                                }
                    return d ? -1 : a || u ? u : S;
                };
            };
        e.exports = { forEach: u(0), map: u(1), filter: u(2), some: u(3), every: u(4), find: u(5), findIndex: u(6), filterReject: u(7) };
    },
    function (e, t, o) {
        "use strict";
        var n = o(21);
        e.exports = function (e, t) {
            var o = [][e];
            return (
                !!o &&
                n(function () {
                    o.call(
                        null,
                        t ||
                            function () {
                                return 1;
                            },
                        1
                    );
                })
            );
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(157),
            a = Math.floor,
            i = function (e, t) {
                var o = e.length;
                if (o < 8)
                    for (var r, s, l = 1; l < o; ) {
                        for (s = l, r = e[l]; s && t(e[s - 1], r) > 0; ) e[s] = e[--s];
                        s !== l++ && (e[s] = r);
                    }
                else
                    for (
                        var c = a(o / 2), u = i(n(e, 0, c), t), d = i(n(e, c), t), p = u.length, h = d.length, g = 0, f = 0;
                        g < p || f < h;

                    )
                        e[g + f] = g < p && f < h ? (t(u[g], d[f]) <= 0 ? u[g++] : d[f++]) : g < p ? u[g++] : d[f++];
                return e;
            };
        e.exports = i;
    },
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(23),
            i = o(29),
            r = o(49),
            s = o(693),
            l = o(152),
            c = o(324),
            u = o(146),
            d = o(174),
            p = o(100),
            h = o(694),
            g = o(117),
            f = o(426),
            m = o(428),
            x = o(695),
            y = o(294),
            b = o(61),
            w = o(131),
            v = o(46),
            D = o(241),
            A = o(136),
            C = o(144),
            E = o(175),
            S = o(243).f,
            k = o(696),
            _ = o(349).forEach,
            T = o(260),
            P = o(120),
            F = o(88),
            R = o(222),
            I = o(698),
            G = o(80),
            O = o(288),
            L = G.get,
            B = G.set,
            N = G.enforce,
            M = F.f,
            U = R.f,
            W = a.RangeError,
            j = c.ArrayBuffer,
            z = j.prototype,
            V = c.DataView,
            Y = l.NATIVE_ARRAY_BUFFER_VIEWS,
            H = l.TYPED_ARRAY_TAG,
            q = l.TypedArray,
            K = l.TypedArrayPrototype,
            Z = l.isTypedArray,
            J = function (e, t) {
                P(e, t, {
                    configurable: !0,
                    get: function () {
                        return L(this)[t];
                    },
                });
            },
            X = function (e) {
                var t;
                return C(z, e) || "ArrayBuffer" === (t = w(e)) || "SharedArrayBuffer" === t;
            },
            Q = function (e, t) {
                return Z(e) && !D(t) && t in e && h(+t) && t >= 0;
            },
            $ = function (e, t) {
                return ((t = y(t)), Q(e, t) ? d(2, e[t]) : U(e, t));
            },
            ee = function (e, t, o) {
                return (
                    (t = y(t)),
                    !(Q(e, t) && v(o) && b(o, "value")) ||
                    b(o, "get") ||
                    b(o, "set") ||
                    o.configurable ||
                    (b(o, "writable") && !o.writable) ||
                    (b(o, "enumerable") && !o.enumerable)
                        ? M(e, t, o)
                        : ((e[t] = o.value), e)
                );
            };
        r
            ? (Y || ((R.f = $), (F.f = ee), J(K, "buffer"), J(K, "byteOffset"), J(K, "byteLength"), J(K, "length")),
              n({ target: "Object", stat: !0, forced: !Y }, { getOwnPropertyDescriptor: $, defineProperty: ee }),
              (e.exports = function (e, t, o) {
                  var r = e.match(/\d+/)[0] / 8,
                      l = e + (o ? "Clamped" : "") + "Array",
                      c = "get" + e,
                      d = "set" + e,
                      h = a[l],
                      y = h,
                      b = y && y.prototype,
                      w = {},
                      D = function (e, t) {
                          M(e, t, {
                              get: function () {
                                  return (function (e, t) {
                                      var o = L(e);
                                      return o.view[c](t * r + o.byteOffset, !0);
                                  })(this, t);
                              },
                              set: function (e) {
                                  return (function (e, t, n) {
                                      var a = L(e);
                                      a.view[d](t * r + a.byteOffset, o ? x(n) : n, !0);
                                  })(this, t, e);
                              },
                              enumerable: !0,
                          });
                      };
                  (Y
                      ? s &&
                        ((y = t(function (e, t, o, n) {
                            return (
                                u(e, b),
                                O(
                                    v(t)
                                        ? X(t)
                                            ? void 0 !== n
                                                ? new h(t, m(o, r), n)
                                                : void 0 !== o
                                                  ? new h(t, m(o, r))
                                                  : new h(t)
                                            : Z(t)
                                              ? I(y, t)
                                              : i(k, y, t)
                                        : new h(f(t)),
                                    e,
                                    y
                                )
                            );
                        })),
                        E && E(y, q),
                        _(S(h), function (e) {
                            e in y || p(y, e, h[e]);
                        }),
                        (y.prototype = b))
                      : ((y = t(function (e, t, o, n) {
                            u(e, b);
                            var a,
                                s,
                                l,
                                c = 0,
                                d = 0;
                            if (v(t)) {
                                if (!X(t)) return Z(t) ? I(y, t) : i(k, y, t);
                                ((a = t), (d = m(o, r)));
                                var p = t.byteLength;
                                if (void 0 === n) {
                                    if (p % r) throw new W("Wrong length");
                                    if ((s = p - d) < 0) throw new W("Wrong length");
                                } else if ((s = g(n) * r) + d > p) throw new W("Wrong length");
                                l = s / r;
                            } else ((l = f(t)), (a = new j((s = l * r))));
                            for (B(e, { buffer: a, byteOffset: d, byteLength: s, length: l, view: new V(a) }); c < l; ) D(e, c++);
                        })),
                        E && E(y, q),
                        (b = y.prototype = A(K))),
                      b.constructor !== y && p(b, "constructor", y),
                      (N(b).TypedArrayConstructor = y),
                      H && p(b, H, l));
                  var C = y !== h;
                  ((w[l] = y),
                      n({ global: !0, constructor: !0, forced: C, sham: !Y }, w),
                      "BYTES_PER_ELEMENT" in y || p(y, "BYTES_PER_ELEMENT", r),
                      "BYTES_PER_ELEMENT" in b || p(b, "BYTES_PER_ELEMENT", r),
                      T(l));
              }))
            : (e.exports = function () {});
    },
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(43),
            a = o(136),
            i = o(88).f,
            r = n("unscopables"),
            s = Array.prototype;
        (void 0 === s[r] && i(s, r, { configurable: !0, value: a(null) }),
            (e.exports = function (e) {
                s[r][e] = !0;
            }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(454),
            a = TypeError;
        e.exports = function (e) {
            if (n(e)) throw new a("The method doesn't accept regular expressions");
            return e;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(43)("match");
        e.exports = function (e) {
            var t = /./;
            try {
                "/./"[e](t);
            } catch (o) {
                try {
                    return ((t[n] = !1), "/./"[e](t));
                } catch (e) {}
            }
            return !1;
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(136),
            i = o(100),
            r = o(232),
            s = o(43),
            l = o(80),
            c = o(145),
            u = o(251).IteratorPrototype,
            d = o(252),
            p = o(102),
            h = s("toStringTag"),
            g = l.set,
            f = function (e) {
                var t = l.getterFor(e ? "WrapForValidIterator" : "IteratorHelper");
                return r(a(u), {
                    next: function () {
                        var o = t(this);
                        if (e) return o.nextHandler();
                        if (o.done) return d(void 0, !0);
                        try {
                            var n = o.nextHandler();
                            return o.returnHandlerResult ? n : d(n, o.done);
                        } catch (e) {
                            throw ((o.done = !0), e);
                        }
                    },
                    return: function () {
                        var o = t(this),
                            a = o.iterator;
                        if (((o.done = !0), e)) {
                            var i = c(a, "return");
                            return i ? n(i, a) : d(void 0, !0);
                        }
                        if (o.inner)
                            try {
                                p(o.inner.iterator, "normal");
                            } catch (e) {
                                return p(a, "throw", e);
                            }
                        return (a && p(a, "normal"), d(void 0, !0));
                    },
                });
            },
            m = f(!0),
            x = f(!1);
        (i(x, h, "Iterator Helper"),
            (e.exports = function (e, t, o) {
                var n = function (n, a) {
                    (a ? ((a.iterator = n.iterator), (a.next = n.next)) : (a = n),
                        (a.type = t ? "WrapForValidIterator" : "IteratorHelper"),
                        (a.returnHandlerResult = !!o),
                        (a.nextHandler = e),
                        (a.counter = 0),
                        (a.done = !1),
                        g(this, a));
                };
                return ((n.prototype = t ? m : x), n);
            }));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = {}.propertyIsEnumerable,
            a = Object.getOwnPropertyDescriptor,
            i = a && !n.call({ 1: 2 }, 1);
        t.f = i
            ? function (e) {
                  var t = a(this, e);
                  return !!t && t.enumerable;
              }
            : n;
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(46),
            i = o(241),
            r = o(145),
            s = o(614),
            l = o(43),
            c = TypeError,
            u = l("toPrimitive");
        e.exports = function (e, t) {
            if (!a(e) || i(e)) return e;
            var o,
                l = r(e, u);
            if (l) {
                if ((void 0 === t && (t = "default"), (o = n(l, e, t)), !a(o) || i(o))) return o;
                throw new c("Can't convert object to primitive value");
            }
            return (void 0 === t && (t = "number"), s(e, t));
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(295);
        e.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(21),
            i = o(242);
        e.exports =
            !n &&
            !a(function () {
                return (
                    7 !==
                    Object.defineProperty(i("div"), "a", {
                        get: function () {
                            return 7;
                        },
                    }).a
                );
            });
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(21);
        e.exports =
            n &&
            a(function () {
                return 42 !== Object.defineProperty(function () {}, "prototype", { value: 42, writable: !1 }).prototype;
            });
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(21),
            i = o(35),
            r = o(61),
            s = o(49),
            l = o(199).CONFIGURABLE,
            c = o(299),
            u = o(80),
            d = u.enforce,
            p = u.get,
            h = String,
            g = Object.defineProperty,
            f = n("".slice),
            m = n("".replace),
            x = n([].join),
            y =
                s &&
                !a(function () {
                    return 8 !== g(function () {}, "length", { value: 8 }).length;
                }),
            b = String(String).split("String"),
            w = (e.exports = function (e, t, o) {
                ("Symbol(" === f(h(t), 0, 7) && (t = "[" + m(h(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
                    o && o.getter && (t = "get " + t),
                    o && o.setter && (t = "set " + t),
                    (!r(e, "name") || (l && e.name !== t)) && (s ? g(e, "name", { value: t, configurable: !0 }) : (e.name = t)),
                    y && o && r(o, "arity") && e.length !== o.arity && g(e, "length", { value: o.arity }));
                try {
                    o && r(o, "constructor") && o.constructor
                        ? s && g(e, "prototype", { writable: !1 })
                        : e.prototype && (e.prototype = void 0);
                } catch (e) {}
                var n = d(e);
                return (r(n, "source") || (n.source = x(b, "string" == typeof t ? t : "")), e);
            });
        Function.prototype.toString = w(function () {
            return (i(this) && p(this).source) || c(this);
        }, "toString");
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(61),
            i = o(184),
            r = o(403).indexOf,
            s = o(259),
            l = n([].push);
        e.exports = function (e, t) {
            var o,
                n = i(e),
                c = 0,
                u = [];
            for (o in n) !a(s, o) && a(n, o) && l(u, o);
            for (; t.length > c; ) a(n, (o = t[c++])) && (~r(u, o) || l(u, o));
            return u;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(184),
            a = o(244),
            i = o(101),
            r = function (e) {
                return function (t, o, r) {
                    var s = n(t),
                        l = i(s);
                    if (0 === l) return !e && -1;
                    var c,
                        u = a(r, l);
                    if (e && o != o) {
                        for (; l > u; ) if ((c = s[u++]) != c) return !0;
                    } else for (; l > u; u++) if ((e || u in s) && s[u] === o) return e || u || 0;
                    return !e && -1;
                };
            };
        e.exports = { includes: r(!0), indexOf: r(!1) };
    },
    function (e, t, o) {
        "use strict";
        t.f = Object.getOwnPropertySymbols;
    },
    function (e, t, o) {
        "use strict";
        var n = o(402),
            a = o(301);
        e.exports =
            Object.keys ||
            function (e) {
                return n(e, a);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(110);
        e.exports = n("document", "documentElement");
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(129),
            i = o(116),
            r = function (e) {
                return a.slice(0, e.length) === e;
            };
        e.exports = r("Bun/")
            ? "BUN"
            : r("Cloudflare-Workers")
              ? "CLOUDFLARE"
              : r("Deno/")
                ? "DENO"
                : r("Node.js/")
                  ? "NODE"
                  : n.Bun && "string" == typeof Bun.version
                    ? "BUN"
                    : n.Deno && "object" == typeof Deno.version
                      ? "DENO"
                      : "process" === i(n.process)
                        ? "NODE"
                        : n.window && n.document
                          ? "BROWSER"
                          : "REST";
    },
    function (e, t, o) {
        "use strict";
        var n = o(302),
            a = o(185),
            i = TypeError;
        e.exports = function (e) {
            if (n(e)) return e;
            throw new i(a(e) + " is not a constructor");
        };
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r,
            s = o(23),
            l = o(200),
            c = o(124),
            u = o(35),
            d = o(61),
            p = o(21),
            h = o(406),
            g = o(157),
            f = o(242),
            m = o(303),
            x = o(410),
            y = o(245),
            b = s.setImmediate,
            w = s.clearImmediate,
            v = s.process,
            D = s.Dispatch,
            A = s.Function,
            C = s.MessageChannel,
            E = s.String,
            S = 0,
            k = {};
        p(function () {
            n = s.location;
        });
        var _ = function (e) {
                if (d(k, e)) {
                    var t = k[e];
                    (delete k[e], t());
                }
            },
            T = function (e) {
                return function () {
                    _(e);
                };
            },
            P = function (e) {
                _(e.data);
            },
            F = function (e) {
                s.postMessage(E(e), n.protocol + "//" + n.host);
            };
        ((b && w) ||
            ((b = function (e) {
                m(arguments.length, 1);
                var t = u(e) ? e : A(e),
                    o = g(arguments, 1);
                return (
                    (k[++S] = function () {
                        l(t, void 0, o);
                    }),
                    a(S),
                    S
                );
            }),
            (w = function (e) {
                delete k[e];
            }),
            y
                ? (a = function (e) {
                      v.nextTick(T(e));
                  })
                : D && D.now
                  ? (a = function (e) {
                        D.now(T(e));
                    })
                  : C && !x
                    ? ((r = (i = new C()).port2), (i.port1.onmessage = P), (a = c(r.postMessage, r)))
                    : s.addEventListener && u(s.postMessage) && !s.importScripts && n && "file:" !== n.protocol && !p(F)
                      ? ((a = F), s.addEventListener("message", P, !1))
                      : (a =
                            "onreadystatechange" in f("script")
                                ? function (e) {
                                      h.appendChild(f("script")).onreadystatechange = function () {
                                          (h.removeChild(this), _(e));
                                      };
                                  }
                                : function (e) {
                                      setTimeout(T(e), 0);
                                  })),
            (e.exports = { set: b, clear: w }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(129);
        e.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(n);
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(49),
            i = Object.getOwnPropertyDescriptor;
        e.exports = function (e) {
            if (!a) return n[e];
            var t = i(n, e);
            return t && t.value;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = function () {
            ((this.head = null), (this.tail = null));
        };
        ((n.prototype = {
            add: function (e) {
                var t = { item: e, next: null },
                    o = this.tail;
                (o ? (o.next = t) : (this.head = t), (this.tail = t));
            },
            get: function () {
                var e = this.head;
                if (e) return (null === (this.head = e.next) && (this.tail = null), e.item);
            },
        }),
            (e.exports = n));
    },
    function (e, t, o) {
        "use strict";
        var n = o(186),
            a = o(343),
            i = o(201).CONSTRUCTOR;
        e.exports =
            i ||
            !a(function (e) {
                n.all(e).then(void 0, function () {});
            });
    },
    function (e, t) {
        (function (t) {
            e.exports = t;
        }).call(this, {});
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(27),
            i = o(29),
            r = o(21),
            s = o(405),
            l = o(404),
            c = o(396),
            u = o(93),
            d = o(240),
            p = Object.assign,
            h = Object.defineProperty,
            g = a([].concat);
        e.exports =
            !p ||
            r(function () {
                if (
                    n &&
                    1 !==
                        p(
                            { b: 1 },
                            p(
                                h({}, "a", {
                                    enumerable: !0,
                                    get: function () {
                                        h(this, "b", { value: 3, enumerable: !1 });
                                    },
                                }),
                                { b: 2 }
                            )
                        ).b
                )
                    return !0;
                var e = {},
                    t = {},
                    o = Symbol("assign detection");
                return (
                    (e[o] = 7),
                    "abcdefghijklmnopqrst".split("").forEach(function (e) {
                        t[e] = e;
                    }),
                    7 !== p({}, e)[o] || "abcdefghijklmnopqrst" !== s(p({}, t)).join("")
                );
            })
                ? function (e, t) {
                      for (var o = u(e), a = arguments.length, r = 1, p = l.f, h = c.f; a > r; )
                          for (var f, m = d(arguments[r++]), x = p ? g(s(m), p(m)) : s(m), y = x.length, b = 0; y > b; )
                              ((f = x[b++]), (n && !i(h, m, f)) || (o[f] = m[f]));
                      return o;
                  }
                : p;
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(74),
            r = o(199),
            s = o(35),
            l = o(419),
            c = o(208),
            u = o(175),
            d = o(137),
            p = o(100),
            h = o(79),
            g = o(43),
            f = o(203),
            m = o(251),
            x = r.PROPER,
            y = r.CONFIGURABLE,
            b = m.IteratorPrototype,
            w = m.BUGGY_SAFARI_ITERATORS,
            v = g("iterator"),
            D = function () {
                return this;
            };
        e.exports = function (e, t, o, r, g, m, A) {
            l(o, t, r);
            var C,
                E,
                S,
                k = function (e) {
                    if (e === g && R) return R;
                    if (!w && e && e in P) return P[e];
                    switch (e) {
                        case "keys":
                        case "values":
                        case "entries":
                            return function () {
                                return new o(this, e);
                            };
                    }
                    return function () {
                        return new o(this);
                    };
                },
                _ = t + " Iterator",
                T = !1,
                P = e.prototype,
                F = P[v] || P["@@iterator"] || (g && P[g]),
                R = (!w && F) || k(g),
                I = ("Array" === t && P.entries) || F;
            if (
                (I &&
                    (C = c(I.call(new e()))) !== Object.prototype &&
                    C.next &&
                    (i || c(C) === b || (u ? u(C, b) : s(C[v]) || h(C, v, D)), d(C, _, !0, !0), i && (f[_] = D)),
                x &&
                    "values" === g &&
                    F &&
                    "values" !== F.name &&
                    (!i && y
                        ? p(P, "name", "values")
                        : ((T = !0),
                          (R = function () {
                              return a(F, this);
                          }))),
                g)
            )
                if (((E = { values: k("values"), keys: m ? R : k("keys"), entries: k("entries") }), A))
                    for (S in E) (w || T || !(S in P)) && h(P, S, E[S]);
                else n({ target: t, proto: !0, forced: w || T }, E);
            return ((i && !A) || P[v] === R || h(P, v, R, { name: g }), (f[t] = R), E);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(251).IteratorPrototype,
            a = o(136),
            i = o(174),
            r = o(137),
            s = o(203),
            l = function () {
                return this;
            };
        e.exports = function (e, t, o, c) {
            var u = t + " Iterator";
            return ((e.prototype = a(n, { next: i(+!c, o) })), r(e, u, !1, !0), (s[u] = l), e);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(88),
            i = o(174);
        e.exports = function (e, t, o) {
            n ? a.f(e, t, i(0, o)) : (e[t] = o);
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0,
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(242)("span").classList,
            a = n && n.constructor && n.constructor.prototype;
        e.exports = a === Object.prototype ? void 0 : a;
    },
    function (e, t, o) {
        "use strict";
        var n = o(21),
            a = o(43),
            i = o(49),
            r = o(74),
            s = a("iterator");
        e.exports = !n(function () {
            var e = new URL("b?a=1&b=2&c=3", "https://a"),
                t = e.searchParams,
                o = new URLSearchParams("a=1&a=2&b=3"),
                n = "";
            return (
                (e.pathname = "c%20d"),
                t.forEach(function (e, o) {
                    (t.delete("b"), (n += o + e));
                }),
                o.delete("a", 2),
                o.delete("b", void 0),
                (r && (!e.toJSON || !o.has("a", 1) || o.has("a", 2) || !o.has("a", void 0) || o.has("b"))) ||
                    (!t.size && (r || !i)) ||
                    !t.sort ||
                    "https://a/c%20d?a=1&c=3" !== e.href ||
                    "3" !== t.get("c") ||
                    "a=1" !== String(new URLSearchParams("?a=1")) ||
                    !t[s] ||
                    "a" !== new URL("https://a@b").username ||
                    "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") ||
                    "xn--e1aybc" !== new URL("https://тест").host ||
                    "#%D0%B1" !== new URL("https://a#б").hash ||
                    "a1c3" !== n ||
                    "x" !== new URL("https://x", void 0).host
            );
        });
    },
    function (e, t, o) {
        "use strict";
        (o(19), o(677));
        var n = o(25),
            a = o(23),
            i = o(411),
            r = o(110),
            s = o(29),
            l = o(27),
            c = o(49),
            u = o(423),
            d = o(79),
            p = o(120),
            h = o(232),
            g = o(137),
            f = o(419),
            m = o(80),
            x = o(146),
            y = o(35),
            b = o(61),
            w = o(124),
            v = o(131),
            D = o(37),
            A = o(46),
            C = o(62),
            E = o(136),
            S = o(174),
            k = o(246),
            _ = o(204),
            T = o(252),
            P = o(303),
            F = o(43),
            R = o(351),
            I = F("iterator"),
            G = m.set,
            O = m.getterFor("URLSearchParams"),
            L = m.getterFor("URLSearchParamsIterator"),
            B = i("fetch"),
            N = i("Request"),
            M = i("Headers"),
            U = N && N.prototype,
            W = M && M.prototype,
            j = a.TypeError,
            z = a.encodeURIComponent,
            V = String.fromCharCode,
            Y = r("String", "fromCodePoint"),
            H = parseInt,
            q = l("".charAt),
            K = l([].join),
            Z = l([].push),
            J = l("".replace),
            X = l([].shift),
            Q = l([].splice),
            $ = l("".split),
            ee = l("".slice),
            te = l(/./.exec),
            oe = /\+/g,
            ne = /^[0-9a-f]+$/i,
            ae = function (e, t) {
                var o = ee(e, t, t + 2);
                return te(ne, o) ? H(o, 16) : NaN;
            },
            ie = function (e) {
                for (var t = 0, o = 128; o > 0 && 0 != (e & o); o >>= 1) t++;
                return t;
            },
            re = function (e) {
                var t = null;
                switch (e.length) {
                    case 1:
                        t = e[0];
                        break;
                    case 2:
                        t = ((31 & e[0]) << 6) | (63 & e[1]);
                        break;
                    case 3:
                        t = ((15 & e[0]) << 12) | ((63 & e[1]) << 6) | (63 & e[2]);
                        break;
                    case 4:
                        t = ((7 & e[0]) << 18) | ((63 & e[1]) << 12) | ((63 & e[2]) << 6) | (63 & e[3]);
                }
                return t > 1114111 ? null : t;
            },
            se = function (e) {
                for (var t = (e = J(e, oe, " ")).length, o = "", n = 0; n < t; ) {
                    var a = q(e, n);
                    if ("%" === a) {
                        if ("%" === q(e, n + 1) || n + 3 > t) {
                            ((o += "%"), n++);
                            continue;
                        }
                        var i = ae(e, n + 1);
                        if (i != i) {
                            ((o += a), n++);
                            continue;
                        }
                        n += 2;
                        var r = ie(i);
                        if (0 === r) a = V(i);
                        else {
                            if (1 === r || r > 4) {
                                ((o += "�"), n++);
                                continue;
                            }
                            for (var s = [i], l = 1; l < r && !(++n + 3 > t || "%" !== q(e, n)); ) {
                                var c = ae(e, n + 1);
                                if (c != c) {
                                    n += 3;
                                    break;
                                }
                                if (c > 191 || c < 128) break;
                                (Z(s, c), (n += 2), l++);
                            }
                            if (s.length !== r) {
                                o += "�";
                                continue;
                            }
                            var u = re(s);
                            null === u ? (o += "�") : (a = Y(u));
                        }
                    }
                    ((o += a), n++);
                }
                return o;
            },
            le = /[!'()~]|%20/g,
            ce = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" },
            ue = function (e) {
                return ce[e];
            },
            de = function (e) {
                return J(z(e), le, ue);
            },
            pe = f(
                function (e, t) {
                    G(this, { type: "URLSearchParamsIterator", target: O(e).entries, index: 0, kind: t });
                },
                "URLSearchParams",
                function () {
                    var e = L(this),
                        t = e.target,
                        o = e.index++;
                    if (!t || o >= t.length) return ((e.target = null), T(void 0, !0));
                    var n = t[o];
                    switch (e.kind) {
                        case "keys":
                            return T(n.key, !1);
                        case "values":
                            return T(n.value, !1);
                    }
                    return T([n.key, n.value], !1);
                },
                !0
            ),
            he = function (e) {
                ((this.entries = []),
                    (this.url = null),
                    void 0 !== e &&
                        (A(e) ? this.parseObject(e) : this.parseQuery("string" == typeof e ? ("?" === q(e, 0) ? ee(e, 1) : e) : C(e))));
            };
        he.prototype = {
            type: "URLSearchParams",
            bindURL: function (e) {
                ((this.url = e), this.update());
            },
            parseObject: function (e) {
                var t,
                    o,
                    n,
                    a,
                    i,
                    r,
                    l,
                    c = this.entries,
                    u = _(e);
                if (u)
                    for (o = (t = k(e, u)).next; !(n = s(o, t)).done; ) {
                        if (((i = (a = k(D(n.value))).next), (r = s(i, a)).done || (l = s(i, a)).done || !s(i, a).done))
                            throw new j("Expected sequence with length 2");
                        Z(c, { key: C(r.value), value: C(l.value) });
                    }
                else for (var d in e) b(e, d) && Z(c, { key: d, value: C(e[d]) });
            },
            parseQuery: function (e) {
                if (e)
                    for (var t, o, n = this.entries, a = $(e, "&"), i = 0; i < a.length; )
                        (t = a[i++]).length && ((o = $(t, "=")), Z(n, { key: se(X(o)), value: se(K(o, "=")) }));
            },
            serialize: function () {
                for (var e, t = this.entries, o = [], n = 0; n < t.length; ) ((e = t[n++]), Z(o, de(e.key) + "=" + de(e.value)));
                return K(o, "&");
            },
            update: function () {
                ((this.entries.length = 0), this.parseQuery(this.url.query));
            },
            updateURL: function () {
                this.url && this.url.update();
            },
        };
        var ge = function () {
                x(this, fe);
                var e = arguments.length > 0 ? arguments[0] : void 0,
                    t = G(this, new he(e));
                c || (this.size = t.entries.length);
            },
            fe = ge.prototype;
        if (
            (h(
                fe,
                {
                    append: function (e, t) {
                        var o = O(this);
                        (P(arguments.length, 2), Z(o.entries, { key: C(e), value: C(t) }), c || this.length++, o.updateURL());
                    },
                    delete: function (e) {
                        for (
                            var t = O(this),
                                o = P(arguments.length, 1),
                                n = t.entries,
                                a = C(e),
                                i = o < 2 ? void 0 : arguments[1],
                                r = void 0 === i ? i : C(i),
                                s = 0;
                            s < n.length;

                        ) {
                            var l = n[s];
                            if (l.key !== a || (void 0 !== r && l.value !== r)) s++;
                            else if ((Q(n, s, 1), void 0 !== r)) break;
                        }
                        (c || (this.size = n.length), t.updateURL());
                    },
                    get: function (e) {
                        var t = O(this).entries;
                        P(arguments.length, 1);
                        for (var o = C(e), n = 0; n < t.length; n++) if (t[n].key === o) return t[n].value;
                        return null;
                    },
                    getAll: function (e) {
                        var t = O(this).entries;
                        P(arguments.length, 1);
                        for (var o = C(e), n = [], a = 0; a < t.length; a++) t[a].key === o && Z(n, t[a].value);
                        return n;
                    },
                    has: function (e) {
                        for (
                            var t = O(this).entries,
                                o = P(arguments.length, 1),
                                n = C(e),
                                a = o < 2 ? void 0 : arguments[1],
                                i = void 0 === a ? a : C(a),
                                r = 0;
                            r < t.length;

                        ) {
                            var s = t[r++];
                            if (s.key === n && (void 0 === i || s.value === i)) return !0;
                        }
                        return !1;
                    },
                    set: function (e, t) {
                        var o = O(this);
                        P(arguments.length, 1);
                        for (var n, a = o.entries, i = !1, r = C(e), s = C(t), l = 0; l < a.length; l++)
                            (n = a[l]).key === r && (i ? Q(a, l--, 1) : ((i = !0), (n.value = s)));
                        (i || Z(a, { key: r, value: s }), c || (this.size = a.length), o.updateURL());
                    },
                    sort: function () {
                        var e = O(this);
                        (R(e.entries, function (e, t) {
                            return e.key > t.key ? 1 : -1;
                        }),
                            e.updateURL());
                    },
                    forEach: function (e) {
                        for (var t, o = O(this).entries, n = w(e, arguments.length > 1 ? arguments[1] : void 0), a = 0; a < o.length; )
                            n((t = o[a++]).value, t.key, this);
                    },
                    keys: function () {
                        return new pe(this, "keys");
                    },
                    values: function () {
                        return new pe(this, "values");
                    },
                    entries: function () {
                        return new pe(this, "entries");
                    },
                },
                { enumerable: !0 }
            ),
            d(fe, I, fe.entries, { name: "entries" }),
            d(
                fe,
                "toString",
                function () {
                    return O(this).serialize();
                },
                { enumerable: !0 }
            ),
            c &&
                p(fe, "size", {
                    get: function () {
                        return O(this).entries.length;
                    },
                    configurable: !0,
                    enumerable: !0,
                }),
            g(ge, "URLSearchParams"),
            n({ global: !0, constructor: !0, forced: !u }, { URLSearchParams: ge }),
            !u && y(M))
        ) {
            var me = l(W.has),
                xe = l(W.set),
                ye = function (e) {
                    if (A(e)) {
                        var t,
                            o = e.body;
                        if ("URLSearchParams" === v(o))
                            return (
                                (t = e.headers ? new M(e.headers) : new M()),
                                me(t, "content-type") || xe(t, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"),
                                E(e, { body: S(0, C(o)), headers: S(0, t) })
                            );
                    }
                    return e;
                };
            if (
                (y(B) &&
                    n(
                        { global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 },
                        {
                            fetch: function (e) {
                                return B(e, arguments.length > 1 ? ye(arguments[1]) : {});
                            },
                        }
                    ),
                y(N))
            ) {
                var be = function (e) {
                    return (x(this, U), new N(e, arguments.length > 1 ? ye(arguments[1]) : {}));
                };
                ((U.constructor = be),
                    (be.prototype = U),
                    n({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, { Request: be }));
            }
        }
        e.exports = { URLSearchParams: ge, getState: O };
    },
    function (e, t, o) {
        "use strict";
        e.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView;
    },
    function (e, t, o) {
        "use strict";
        var n = o(130),
            a = o(117),
            i = RangeError;
        e.exports = function (e) {
            if (void 0 === e) return 0;
            var t = n(e),
                o = a(t);
            if (t !== o) throw new i("Wrong length or index");
            return o;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(93),
            a = o(244),
            i = o(101);
        e.exports = function (e) {
            for (
                var t = n(this),
                    o = i(t),
                    r = arguments.length,
                    s = a(r > 1 ? arguments[1] : void 0, o),
                    l = r > 2 ? arguments[2] : void 0,
                    c = void 0 === l ? o : a(l, o);
                c > s;

            )
                t[s++] = e;
            return t;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(576),
            a = RangeError;
        e.exports = function (e, t) {
            var o = n(e);
            if (o % t) throw new a("Wrong offset");
            return o;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(397),
            a = TypeError;
        e.exports = function (e) {
            var t = n(e, "number");
            if ("number" == typeof t) throw new a("Can't convert number to bigint");
            return BigInt(t);
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(35),
            i = n.WeakMap;
        e.exports = a(i) && /native code/.test(String(i));
    },
    function (e, t, o) {
        "use strict";
        var n = o(37),
            a = o(46),
            i = o(202);
        e.exports = function (e, t) {
            if ((n(e), a(t) && t.constructor === e)) return t;
            var o = i.f(e);
            return ((0, o.resolve)(t), o.promise);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(46),
            a = o(116),
            i = o(43)("match");
        e.exports = function (e) {
            var t;
            return n(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" === a(e));
        };
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(21),
            a = o(23).RegExp;
        e.exports = n(function () {
            var e = a(".", "s");
            return !(e.dotAll && e.test("\n") && "s" === e.flags);
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(21),
            a = o(23).RegExp;
        e.exports = n(function () {
            var e = a("(?<a>b)", "g");
            return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c");
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(61),
            i = o(144),
            r = o(307),
            s = RegExp.prototype;
        e.exports = function (e) {
            var t = e.flags;
            return void 0 !== t || "flags" in s || a(e, "flags") || !i(s, e) ? t : n(r, e);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(199).PROPER,
            a = o(21),
            i = o(248);
        e.exports = function (e) {
            return a(function () {
                return !!i[e]() || "​᠎" !== "​᠎"[e]() || (n && i[e].name !== e);
            });
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(463),
            a = o(94),
            i = o(312),
            r = o(225),
            s = o(313),
            l = Object.prototype.toString;
        function c(e) {
            if (!(this instanceof c)) return new c(e);
            this.options = a.assign({ level: -1, method: 8, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: 0, to: "" }, e || {});
            var t = this.options;
            (t.raw && t.windowBits > 0
                ? (t.windowBits = -t.windowBits)
                : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
                (this.err = 0),
                (this.msg = ""),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new s()),
                (this.strm.avail_out = 0));
            var o = n.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
            if (0 !== o) throw new Error(r[o]);
            if ((t.header && n.deflateSetHeader(this.strm, t.header), t.dictionary)) {
                var u;
                if (
                    ((u =
                        "string" == typeof t.dictionary
                            ? i.string2buf(t.dictionary)
                            : "[object ArrayBuffer]" === l.call(t.dictionary)
                              ? new Uint8Array(t.dictionary)
                              : t.dictionary),
                    0 !== (o = n.deflateSetDictionary(this.strm, u)))
                )
                    throw new Error(r[o]);
                this._dict_set = !0;
            }
        }
        function u(e, t) {
            var o = new c(t);
            if ((o.push(e, !0), o.err)) throw o.msg || r[o.err];
            return o.result;
        }
        ((c.prototype.push = function (e, t) {
            var o,
                r,
                s = this.strm,
                c = this.options.chunkSize;
            if (this.ended) return !1;
            ((r = t === ~~t ? t : !0 === t ? 4 : 0),
                "string" == typeof e
                    ? (s.input = i.string2buf(e))
                    : "[object ArrayBuffer]" === l.call(e)
                      ? (s.input = new Uint8Array(e))
                      : (s.input = e),
                (s.next_in = 0),
                (s.avail_in = s.input.length));
            do {
                if (
                    (0 === s.avail_out && ((s.output = new a.Buf8(c)), (s.next_out = 0), (s.avail_out = c)),
                    1 !== (o = n.deflate(s, r)) && 0 !== o)
                )
                    return (this.onEnd(o), (this.ended = !0), !1);
                (0 !== s.avail_out && (0 !== s.avail_in || (4 !== r && 2 !== r))) ||
                    ("string" === this.options.to
                        ? this.onData(i.buf2binstring(a.shrinkBuf(s.output, s.next_out)))
                        : this.onData(a.shrinkBuf(s.output, s.next_out)));
            } while ((s.avail_in > 0 || 0 === s.avail_out) && 1 !== o);
            return 4 === r
                ? ((o = n.deflateEnd(this.strm)), this.onEnd(o), (this.ended = !0), 0 === o)
                : 2 !== r || (this.onEnd(0), (s.avail_out = 0), !0);
        }),
            (c.prototype.onData = function (e) {
                this.chunks.push(e);
            }),
            (c.prototype.onEnd = function (e) {
                (0 === e &&
                    ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = a.flattenChunks(this.chunks))),
                    (this.chunks = []),
                    (this.err = e),
                    (this.msg = this.strm.msg));
            }),
            (t.Deflate = c),
            (t.deflate = u),
            (t.deflateRaw = function (e, t) {
                return (((t = t || {}).raw = !0), u(e, t));
            }),
            (t.gzip = function (e, t) {
                return (((t = t || {}).gzip = !0), u(e, t));
            }));
    },
    function (e, t, o) {
        "use strict";
        var n,
            a = o(94),
            i = o(464),
            r = o(310),
            s = o(311),
            l = o(225);
        function c(e, t) {
            return ((e.msg = l[t]), t);
        }
        function u(e) {
            return (e << 1) - (e > 4 ? 9 : 0);
        }
        function d(e) {
            for (var t = e.length; --t >= 0; ) e[t] = 0;
        }
        function p(e) {
            var t = e.state,
                o = t.pending;
            (o > e.avail_out && (o = e.avail_out),
                0 !== o &&
                    (a.arraySet(e.output, t.pending_buf, t.pending_out, o, e.next_out),
                    (e.next_out += o),
                    (t.pending_out += o),
                    (e.total_out += o),
                    (e.avail_out -= o),
                    (t.pending -= o),
                    0 === t.pending && (t.pending_out = 0)));
        }
        function h(e, t) {
            (i._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t),
                (e.block_start = e.strstart),
                p(e.strm));
        }
        function g(e, t) {
            e.pending_buf[e.pending++] = t;
        }
        function f(e, t) {
            ((e.pending_buf[e.pending++] = (t >>> 8) & 255), (e.pending_buf[e.pending++] = 255 & t));
        }
        function m(e, t) {
            var o,
                n,
                a = e.max_chain_length,
                i = e.strstart,
                r = e.prev_length,
                s = e.nice_match,
                l = e.strstart > e.w_size - 262 ? e.strstart - (e.w_size - 262) : 0,
                c = e.window,
                u = e.w_mask,
                d = e.prev,
                p = e.strstart + 258,
                h = c[i + r - 1],
                g = c[i + r];
            (e.prev_length >= e.good_match && (a >>= 2), s > e.lookahead && (s = e.lookahead));
            do {
                if (c[(o = t) + r] === g && c[o + r - 1] === h && c[o] === c[i] && c[++o] === c[i + 1]) {
                    ((i += 2), o++);
                    do {} while (
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        c[++i] === c[++o] &&
                        i < p
                    );
                    if (((n = 258 - (p - i)), (i = p - 258), n > r)) {
                        if (((e.match_start = t), (r = n), n >= s)) break;
                        ((h = c[i + r - 1]), (g = c[i + r]));
                    }
                }
            } while ((t = d[t & u]) > l && 0 != --a);
            return r <= e.lookahead ? r : e.lookahead;
        }
        function x(e) {
            var t,
                o,
                n,
                i,
                l,
                c,
                u,
                d,
                p,
                h,
                g = e.w_size;
            do {
                if (((i = e.window_size - e.lookahead - e.strstart), e.strstart >= g + (g - 262))) {
                    (a.arraySet(e.window, e.window, g, g, 0),
                        (e.match_start -= g),
                        (e.strstart -= g),
                        (e.block_start -= g),
                        (t = o = e.hash_size));
                    do {
                        ((n = e.head[--t]), (e.head[t] = n >= g ? n - g : 0));
                    } while (--o);
                    t = o = g;
                    do {
                        ((n = e.prev[--t]), (e.prev[t] = n >= g ? n - g : 0));
                    } while (--o);
                    i += g;
                }
                if (0 === e.strm.avail_in) break;
                if (
                    ((c = e.strm),
                    (u = e.window),
                    (d = e.strstart + e.lookahead),
                    (p = i),
                    (h = void 0),
                    (h = c.avail_in) > p && (h = p),
                    (o =
                        0 === h
                            ? 0
                            : ((c.avail_in -= h),
                              a.arraySet(u, c.input, c.next_in, h, d),
                              1 === c.state.wrap ? (c.adler = r(c.adler, u, h, d)) : 2 === c.state.wrap && (c.adler = s(c.adler, u, h, d)),
                              (c.next_in += h),
                              (c.total_in += h),
                              h)),
                    (e.lookahead += o),
                    e.lookahead + e.insert >= 3)
                )
                    for (
                        l = e.strstart - e.insert,
                            e.ins_h = e.window[l],
                            e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[l + 1]) & e.hash_mask;
                        e.insert &&
                        ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[l + 3 - 1]) & e.hash_mask),
                        (e.prev[l & e.w_mask] = e.head[e.ins_h]),
                        (e.head[e.ins_h] = l),
                        l++,
                        e.insert--,
                        !(e.lookahead + e.insert < 3));

                    );
            } while (e.lookahead < 262 && 0 !== e.strm.avail_in);
        }
        function y(e, t) {
            for (var o, n; ; ) {
                if (e.lookahead < 262) {
                    if ((x(e), e.lookahead < 262 && 0 === t)) return 1;
                    if (0 === e.lookahead) break;
                }
                if (
                    ((o = 0),
                    e.lookahead >= 3 &&
                        ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 3 - 1]) & e.hash_mask),
                        (o = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                        (e.head[e.ins_h] = e.strstart)),
                    0 !== o && e.strstart - o <= e.w_size - 262 && (e.match_length = m(e, o)),
                    e.match_length >= 3)
                )
                    if (
                        ((n = i._tr_tally(e, e.strstart - e.match_start, e.match_length - 3)),
                        (e.lookahead -= e.match_length),
                        e.match_length <= e.max_lazy_match && e.lookahead >= 3)
                    ) {
                        e.match_length--;
                        do {
                            (e.strstart++,
                                (e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 3 - 1]) & e.hash_mask),
                                (o = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                                (e.head[e.ins_h] = e.strstart));
                        } while (0 != --e.match_length);
                        e.strstart++;
                    } else
                        ((e.strstart += e.match_length),
                            (e.match_length = 0),
                            (e.ins_h = e.window[e.strstart]),
                            (e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) & e.hash_mask));
                else ((n = i._tr_tally(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++);
                if (n && (h(e, !1), 0 === e.strm.avail_out)) return 1;
            }
            return (
                (e.insert = e.strstart < 2 ? e.strstart : 2),
                4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
            );
        }
        function b(e, t) {
            for (var o, n, a; ; ) {
                if (e.lookahead < 262) {
                    if ((x(e), e.lookahead < 262 && 0 === t)) return 1;
                    if (0 === e.lookahead) break;
                }
                if (
                    ((o = 0),
                    e.lookahead >= 3 &&
                        ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 3 - 1]) & e.hash_mask),
                        (o = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                        (e.head[e.ins_h] = e.strstart)),
                    (e.prev_length = e.match_length),
                    (e.prev_match = e.match_start),
                    (e.match_length = 2),
                    0 !== o &&
                        e.prev_length < e.max_lazy_match &&
                        e.strstart - o <= e.w_size - 262 &&
                        ((e.match_length = m(e, o)),
                        e.match_length <= 5 &&
                            (1 === e.strategy || (3 === e.match_length && e.strstart - e.match_start > 4096)) &&
                            (e.match_length = 2)),
                    e.prev_length >= 3 && e.match_length <= e.prev_length)
                ) {
                    ((a = e.strstart + e.lookahead - 3),
                        (n = i._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - 3)),
                        (e.lookahead -= e.prev_length - 1),
                        (e.prev_length -= 2));
                    do {
                        ++e.strstart <= a &&
                            ((e.ins_h = ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 3 - 1]) & e.hash_mask),
                            (o = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                            (e.head[e.ins_h] = e.strstart));
                    } while (0 != --e.prev_length);
                    if (((e.match_available = 0), (e.match_length = 2), e.strstart++, n && (h(e, !1), 0 === e.strm.avail_out))) return 1;
                } else if (e.match_available) {
                    if (
                        ((n = i._tr_tally(e, 0, e.window[e.strstart - 1])) && h(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out)
                    )
                        return 1;
                } else ((e.match_available = 1), e.strstart++, e.lookahead--);
            }
            return (
                e.match_available && ((n = i._tr_tally(e, 0, e.window[e.strstart - 1])), (e.match_available = 0)),
                (e.insert = e.strstart < 2 ? e.strstart : 2),
                4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (h(e, !1), 0 === e.strm.avail_out) ? 1 : 2
            );
        }
        function w(e, t, o, n, a) {
            ((this.good_length = e), (this.max_lazy = t), (this.nice_length = o), (this.max_chain = n), (this.func = a));
        }
        function v() {
            ((this.strm = null),
                (this.status = 0),
                (this.pending_buf = null),
                (this.pending_buf_size = 0),
                (this.pending_out = 0),
                (this.pending = 0),
                (this.wrap = 0),
                (this.gzhead = null),
                (this.gzindex = 0),
                (this.method = 8),
                (this.last_flush = -1),
                (this.w_size = 0),
                (this.w_bits = 0),
                (this.w_mask = 0),
                (this.window = null),
                (this.window_size = 0),
                (this.prev = null),
                (this.head = null),
                (this.ins_h = 0),
                (this.hash_size = 0),
                (this.hash_bits = 0),
                (this.hash_mask = 0),
                (this.hash_shift = 0),
                (this.block_start = 0),
                (this.match_length = 0),
                (this.prev_match = 0),
                (this.match_available = 0),
                (this.strstart = 0),
                (this.match_start = 0),
                (this.lookahead = 0),
                (this.prev_length = 0),
                (this.max_chain_length = 0),
                (this.max_lazy_match = 0),
                (this.level = 0),
                (this.strategy = 0),
                (this.good_match = 0),
                (this.nice_match = 0),
                (this.dyn_ltree = new a.Buf16(1146)),
                (this.dyn_dtree = new a.Buf16(122)),
                (this.bl_tree = new a.Buf16(78)),
                d(this.dyn_ltree),
                d(this.dyn_dtree),
                d(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new a.Buf16(16)),
                (this.heap = new a.Buf16(573)),
                d(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new a.Buf16(573)),
                d(this.depth),
                (this.l_buf = 0),
                (this.lit_bufsize = 0),
                (this.last_lit = 0),
                (this.d_buf = 0),
                (this.opt_len = 0),
                (this.static_len = 0),
                (this.matches = 0),
                (this.insert = 0),
                (this.bi_buf = 0),
                (this.bi_valid = 0));
        }
        function D(e) {
            var t;
            return e && e.state
                ? ((e.total_in = e.total_out = 0),
                  (e.data_type = 2),
                  ((t = e.state).pending = 0),
                  (t.pending_out = 0),
                  t.wrap < 0 && (t.wrap = -t.wrap),
                  (t.status = t.wrap ? 42 : 113),
                  (e.adler = 2 === t.wrap ? 0 : 1),
                  (t.last_flush = 0),
                  i._tr_init(t),
                  0)
                : c(e, -2);
        }
        function A(e) {
            var t,
                o = D(e);
            return (
                0 === o &&
                    (((t = e.state).window_size = 2 * t.w_size),
                    d(t.head),
                    (t.max_lazy_match = n[t.level].max_lazy),
                    (t.good_match = n[t.level].good_length),
                    (t.nice_match = n[t.level].nice_length),
                    (t.max_chain_length = n[t.level].max_chain),
                    (t.strstart = 0),
                    (t.block_start = 0),
                    (t.lookahead = 0),
                    (t.insert = 0),
                    (t.match_length = t.prev_length = 2),
                    (t.match_available = 0),
                    (t.ins_h = 0)),
                o
            );
        }
        function C(e, t, o, n, i, r) {
            if (!e) return -2;
            var s = 1;
            if (
                (-1 === t && (t = 6),
                n < 0 ? ((s = 0), (n = -n)) : n > 15 && ((s = 2), (n -= 16)),
                i < 1 || i > 9 || 8 !== o || n < 8 || n > 15 || t < 0 || t > 9 || r < 0 || r > 4)
            )
                return c(e, -2);
            8 === n && (n = 9);
            var l = new v();
            return (
                (e.state = l),
                (l.strm = e),
                (l.wrap = s),
                (l.gzhead = null),
                (l.w_bits = n),
                (l.w_size = 1 << l.w_bits),
                (l.w_mask = l.w_size - 1),
                (l.hash_bits = i + 7),
                (l.hash_size = 1 << l.hash_bits),
                (l.hash_mask = l.hash_size - 1),
                (l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3)),
                (l.window = new a.Buf8(2 * l.w_size)),
                (l.head = new a.Buf16(l.hash_size)),
                (l.prev = new a.Buf16(l.w_size)),
                (l.lit_bufsize = 1 << (i + 6)),
                (l.pending_buf_size = 4 * l.lit_bufsize),
                (l.pending_buf = new a.Buf8(l.pending_buf_size)),
                (l.d_buf = 1 * l.lit_bufsize),
                (l.l_buf = 3 * l.lit_bufsize),
                (l.level = t),
                (l.strategy = r),
                (l.method = o),
                A(e)
            );
        }
        ((n = [
            new w(0, 0, 0, 0, function (e, t) {
                var o = 65535;
                for (o > e.pending_buf_size - 5 && (o = e.pending_buf_size - 5); ; ) {
                    if (e.lookahead <= 1) {
                        if ((x(e), 0 === e.lookahead && 0 === t)) return 1;
                        if (0 === e.lookahead) break;
                    }
                    ((e.strstart += e.lookahead), (e.lookahead = 0));
                    var n = e.block_start + o;
                    if (
                        (0 === e.strstart || e.strstart >= n) &&
                        ((e.lookahead = e.strstart - n), (e.strstart = n), h(e, !1), 0 === e.strm.avail_out)
                    )
                        return 1;
                    if (e.strstart - e.block_start >= e.w_size - 262 && (h(e, !1), 0 === e.strm.avail_out)) return 1;
                }
                return (
                    (e.insert = 0),
                    4 === t ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4) : (e.strstart > e.block_start && (h(e, !1), e.strm.avail_out), 1)
                );
            }),
            new w(4, 4, 8, 4, y),
            new w(4, 5, 16, 8, y),
            new w(4, 6, 32, 32, y),
            new w(4, 4, 16, 16, b),
            new w(8, 16, 32, 32, b),
            new w(8, 16, 128, 128, b),
            new w(8, 32, 128, 256, b),
            new w(32, 128, 258, 1024, b),
            new w(32, 258, 258, 4096, b),
        ]),
            (t.deflateInit = function (e, t) {
                return C(e, t, 8, 15, 8, 0);
            }),
            (t.deflateInit2 = C),
            (t.deflateReset = A),
            (t.deflateResetKeep = D),
            (t.deflateSetHeader = function (e, t) {
                return e && e.state ? (2 !== e.state.wrap ? -2 : ((e.state.gzhead = t), 0)) : -2;
            }),
            (t.deflate = function (e, t) {
                var o, a, r, l;
                if (!e || !e.state || t > 5 || t < 0) return e ? c(e, -2) : -2;
                if (((a = e.state), !e.output || (!e.input && 0 !== e.avail_in) || (666 === a.status && 4 !== t)))
                    return c(e, 0 === e.avail_out ? -5 : -2);
                if (((a.strm = e), (o = a.last_flush), (a.last_flush = t), 42 === a.status))
                    if (2 === a.wrap)
                        ((e.adler = 0),
                            g(a, 31),
                            g(a, 139),
                            g(a, 8),
                            a.gzhead
                                ? (g(
                                      a,
                                      (a.gzhead.text ? 1 : 0) +
                                          (a.gzhead.hcrc ? 2 : 0) +
                                          (a.gzhead.extra ? 4 : 0) +
                                          (a.gzhead.name ? 8 : 0) +
                                          (a.gzhead.comment ? 16 : 0)
                                  ),
                                  g(a, 255 & a.gzhead.time),
                                  g(a, (a.gzhead.time >> 8) & 255),
                                  g(a, (a.gzhead.time >> 16) & 255),
                                  g(a, (a.gzhead.time >> 24) & 255),
                                  g(a, 9 === a.level ? 2 : a.strategy >= 2 || a.level < 2 ? 4 : 0),
                                  g(a, 255 & a.gzhead.os),
                                  a.gzhead.extra &&
                                      a.gzhead.extra.length &&
                                      (g(a, 255 & a.gzhead.extra.length), g(a, (a.gzhead.extra.length >> 8) & 255)),
                                  a.gzhead.hcrc && (e.adler = s(e.adler, a.pending_buf, a.pending, 0)),
                                  (a.gzindex = 0),
                                  (a.status = 69))
                                : (g(a, 0),
                                  g(a, 0),
                                  g(a, 0),
                                  g(a, 0),
                                  g(a, 0),
                                  g(a, 9 === a.level ? 2 : a.strategy >= 2 || a.level < 2 ? 4 : 0),
                                  g(a, 3),
                                  (a.status = 113)));
                    else {
                        var m = (8 + ((a.w_bits - 8) << 4)) << 8;
                        ((m |= (a.strategy >= 2 || a.level < 2 ? 0 : a.level < 6 ? 1 : 6 === a.level ? 2 : 3) << 6),
                            0 !== a.strstart && (m |= 32),
                            (m += 31 - (m % 31)),
                            (a.status = 113),
                            f(a, m),
                            0 !== a.strstart && (f(a, e.adler >>> 16), f(a, 65535 & e.adler)),
                            (e.adler = 1));
                    }
                if (69 === a.status)
                    if (a.gzhead.extra) {
                        for (
                            r = a.pending;
                            a.gzindex < (65535 & a.gzhead.extra.length) &&
                            (a.pending !== a.pending_buf_size ||
                                (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                                p(e),
                                (r = a.pending),
                                a.pending !== a.pending_buf_size));

                        )
                            (g(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++);
                        (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                            a.gzindex === a.gzhead.extra.length && ((a.gzindex = 0), (a.status = 73)));
                    } else a.status = 73;
                if (73 === a.status)
                    if (a.gzhead.name) {
                        r = a.pending;
                        do {
                            if (
                                a.pending === a.pending_buf_size &&
                                (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                                p(e),
                                (r = a.pending),
                                a.pending === a.pending_buf_size)
                            ) {
                                l = 1;
                                break;
                            }
                            ((l = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0), g(a, l));
                        } while (0 !== l);
                        (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                            0 === l && ((a.gzindex = 0), (a.status = 91)));
                    } else a.status = 91;
                if (91 === a.status)
                    if (a.gzhead.comment) {
                        r = a.pending;
                        do {
                            if (
                                a.pending === a.pending_buf_size &&
                                (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                                p(e),
                                (r = a.pending),
                                a.pending === a.pending_buf_size)
                            ) {
                                l = 1;
                                break;
                            }
                            ((l = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0), g(a, l));
                        } while (0 !== l);
                        (a.gzhead.hcrc && a.pending > r && (e.adler = s(e.adler, a.pending_buf, a.pending - r, r)),
                            0 === l && (a.status = 103));
                    } else a.status = 103;
                if (
                    (103 === a.status &&
                        (a.gzhead.hcrc
                            ? (a.pending + 2 > a.pending_buf_size && p(e),
                              a.pending + 2 <= a.pending_buf_size &&
                                  (g(a, 255 & e.adler), g(a, (e.adler >> 8) & 255), (e.adler = 0), (a.status = 113)))
                            : (a.status = 113)),
                    0 !== a.pending)
                ) {
                    if ((p(e), 0 === e.avail_out)) return ((a.last_flush = -1), 0);
                } else if (0 === e.avail_in && u(t) <= u(o) && 4 !== t) return c(e, -5);
                if (666 === a.status && 0 !== e.avail_in) return c(e, -5);
                if (0 !== e.avail_in || 0 !== a.lookahead || (0 !== t && 666 !== a.status)) {
                    var y =
                        2 === a.strategy
                            ? (function (e, t) {
                                  for (var o; ; ) {
                                      if (0 === e.lookahead && (x(e), 0 === e.lookahead)) {
                                          if (0 === t) return 1;
                                          break;
                                      }
                                      if (
                                          ((e.match_length = 0),
                                          (o = i._tr_tally(e, 0, e.window[e.strstart])),
                                          e.lookahead--,
                                          e.strstart++,
                                          o && (h(e, !1), 0 === e.strm.avail_out))
                                      )
                                          return 1;
                                  }
                                  return (
                                      (e.insert = 0),
                                      4 === t
                                          ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                                          : e.last_lit && (h(e, !1), 0 === e.strm.avail_out)
                                            ? 1
                                            : 2
                                  );
                              })(a, t)
                            : 3 === a.strategy
                              ? (function (e, t) {
                                    for (var o, n, a, r, s = e.window; ; ) {
                                        if (e.lookahead <= 258) {
                                            if ((x(e), e.lookahead <= 258 && 0 === t)) return 1;
                                            if (0 === e.lookahead) break;
                                        }
                                        if (
                                            ((e.match_length = 0),
                                            e.lookahead >= 3 &&
                                                e.strstart > 0 &&
                                                (n = s[(a = e.strstart - 1)]) === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a])
                                        ) {
                                            r = e.strstart + 258;
                                            do {} while (
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                n === s[++a] &&
                                                a < r
                                            );
                                            ((e.match_length = 258 - (r - a)),
                                                e.match_length > e.lookahead && (e.match_length = e.lookahead));
                                        }
                                        if (
                                            (e.match_length >= 3
                                                ? ((o = i._tr_tally(e, 1, e.match_length - 3)),
                                                  (e.lookahead -= e.match_length),
                                                  (e.strstart += e.match_length),
                                                  (e.match_length = 0))
                                                : ((o = i._tr_tally(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++),
                                            o && (h(e, !1), 0 === e.strm.avail_out))
                                        )
                                            return 1;
                                    }
                                    return (
                                        (e.insert = 0),
                                        4 === t
                                            ? (h(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                                            : e.last_lit && (h(e, !1), 0 === e.strm.avail_out)
                                              ? 1
                                              : 2
                                    );
                                })(a, t)
                              : n[a.level].func(a, t);
                    if (((3 !== y && 4 !== y) || (a.status = 666), 1 === y || 3 === y))
                        return (0 === e.avail_out && (a.last_flush = -1), 0);
                    if (
                        2 === y &&
                        (1 === t
                            ? i._tr_align(a)
                            : 5 !== t &&
                              (i._tr_stored_block(a, 0, 0, !1),
                              3 === t && (d(a.head), 0 === a.lookahead && ((a.strstart = 0), (a.block_start = 0), (a.insert = 0)))),
                        p(e),
                        0 === e.avail_out)
                    )
                        return ((a.last_flush = -1), 0);
                }
                return 4 !== t
                    ? 0
                    : a.wrap <= 0
                      ? 1
                      : (2 === a.wrap
                            ? (g(a, 255 & e.adler),
                              g(a, (e.adler >> 8) & 255),
                              g(a, (e.adler >> 16) & 255),
                              g(a, (e.adler >> 24) & 255),
                              g(a, 255 & e.total_in),
                              g(a, (e.total_in >> 8) & 255),
                              g(a, (e.total_in >> 16) & 255),
                              g(a, (e.total_in >> 24) & 255))
                            : (f(a, e.adler >>> 16), f(a, 65535 & e.adler)),
                        p(e),
                        a.wrap > 0 && (a.wrap = -a.wrap),
                        0 !== a.pending ? 0 : 1);
            }),
            (t.deflateEnd = function (e) {
                var t;
                return e && e.state
                    ? 42 !== (t = e.state.status) && 69 !== t && 73 !== t && 91 !== t && 103 !== t && 113 !== t && 666 !== t
                        ? c(e, -2)
                        : ((e.state = null), 113 === t ? c(e, -3) : 0)
                    : -2;
            }),
            (t.deflateSetDictionary = function (e, t) {
                var o,
                    n,
                    i,
                    s,
                    l,
                    c,
                    u,
                    p,
                    h = t.length;
                if (!e || !e.state) return -2;
                if (2 === (s = (o = e.state).wrap) || (1 === s && 42 !== o.status) || o.lookahead) return -2;
                for (
                    1 === s && (e.adler = r(e.adler, t, h, 0)),
                        o.wrap = 0,
                        h >= o.w_size &&
                            (0 === s && (d(o.head), (o.strstart = 0), (o.block_start = 0), (o.insert = 0)),
                            (p = new a.Buf8(o.w_size)),
                            a.arraySet(p, t, h - o.w_size, o.w_size, 0),
                            (t = p),
                            (h = o.w_size)),
                        l = e.avail_in,
                        c = e.next_in,
                        u = e.input,
                        e.avail_in = h,
                        e.next_in = 0,
                        e.input = t,
                        x(o);
                    o.lookahead >= 3;

                ) {
                    ((n = o.strstart), (i = o.lookahead - 2));
                    do {
                        ((o.ins_h = ((o.ins_h << o.hash_shift) ^ o.window[n + 3 - 1]) & o.hash_mask),
                            (o.prev[n & o.w_mask] = o.head[o.ins_h]),
                            (o.head[o.ins_h] = n),
                            n++);
                    } while (--i);
                    ((o.strstart = n), (o.lookahead = 2), x(o));
                }
                return (
                    (o.strstart += o.lookahead),
                    (o.block_start = o.strstart),
                    (o.insert = o.lookahead),
                    (o.lookahead = 0),
                    (o.match_length = o.prev_length = 2),
                    (o.match_available = 0),
                    (e.next_in = c),
                    (e.input = u),
                    (e.avail_in = l),
                    (o.wrap = s),
                    0
                );
            }),
            (t.deflateInfo = "pako deflate (from Nodeca project)"));
    },
    function (e, t, o) {
        "use strict";
        var n = o(94);
        function a(e) {
            for (var t = e.length; --t >= 0; ) e[t] = 0;
        }
        var i = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
            r = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
            l = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            c = new Array(576);
        a(c);
        var u = new Array(60);
        a(u);
        var d = new Array(512);
        a(d);
        var p = new Array(256);
        a(p);
        var h = new Array(29);
        a(h);
        var g,
            f,
            m,
            x = new Array(30);
        function y(e, t, o, n, a) {
            ((this.static_tree = e),
                (this.extra_bits = t),
                (this.extra_base = o),
                (this.elems = n),
                (this.max_length = a),
                (this.has_stree = e && e.length));
        }
        function b(e, t) {
            ((this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t));
        }
        function w(e) {
            return e < 256 ? d[e] : d[256 + (e >>> 7)];
        }
        function v(e, t) {
            ((e.pending_buf[e.pending++] = 255 & t), (e.pending_buf[e.pending++] = (t >>> 8) & 255));
        }
        function D(e, t, o) {
            e.bi_valid > 16 - o
                ? ((e.bi_buf |= (t << e.bi_valid) & 65535), v(e, e.bi_buf), (e.bi_buf = t >> (16 - e.bi_valid)), (e.bi_valid += o - 16))
                : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += o));
        }
        function A(e, t, o) {
            D(e, o[2 * t], o[2 * t + 1]);
        }
        function C(e, t) {
            var o = 0;
            do {
                ((o |= 1 & e), (e >>>= 1), (o <<= 1));
            } while (--t > 0);
            return o >>> 1;
        }
        function E(e, t, o) {
            var n,
                a,
                i = new Array(16),
                r = 0;
            for (n = 1; n <= 15; n++) i[n] = r = (r + o[n - 1]) << 1;
            for (a = 0; a <= t; a++) {
                var s = e[2 * a + 1];
                0 !== s && (e[2 * a] = C(i[s]++, s));
            }
        }
        function S(e) {
            var t;
            for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
            for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
            for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
            ((e.dyn_ltree[512] = 1), (e.opt_len = e.static_len = 0), (e.last_lit = e.matches = 0));
        }
        function k(e) {
            (e.bi_valid > 8 ? v(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0));
        }
        function _(e, t, o, n) {
            var a = 2 * t,
                i = 2 * o;
            return e[a] < e[i] || (e[a] === e[i] && n[t] <= n[o]);
        }
        function T(e, t, o) {
            for (
                var n = e.heap[o], a = o << 1;
                a <= e.heap_len && (a < e.heap_len && _(t, e.heap[a + 1], e.heap[a], e.depth) && a++, !_(t, n, e.heap[a], e.depth));

            )
                ((e.heap[o] = e.heap[a]), (o = a), (a <<= 1));
            e.heap[o] = n;
        }
        function P(e, t, o) {
            var n,
                a,
                s,
                l,
                c = 0;
            if (0 !== e.last_lit)
                do {
                    ((n = (e.pending_buf[e.d_buf + 2 * c] << 8) | e.pending_buf[e.d_buf + 2 * c + 1]),
                        (a = e.pending_buf[e.l_buf + c]),
                        c++,
                        0 === n
                            ? A(e, a, t)
                            : (A(e, (s = p[a]) + 256 + 1, t),
                              0 !== (l = i[s]) && D(e, (a -= h[s]), l),
                              A(e, (s = w(--n)), o),
                              0 !== (l = r[s]) && D(e, (n -= x[s]), l)));
                } while (c < e.last_lit);
            A(e, 256, t);
        }
        function F(e, t) {
            var o,
                n,
                a,
                i = t.dyn_tree,
                r = t.stat_desc.static_tree,
                s = t.stat_desc.has_stree,
                l = t.stat_desc.elems,
                c = -1;
            for (e.heap_len = 0, e.heap_max = 573, o = 0; o < l; o++)
                0 !== i[2 * o] ? ((e.heap[++e.heap_len] = c = o), (e.depth[o] = 0)) : (i[2 * o + 1] = 0);
            for (; e.heap_len < 2; )
                ((i[2 * (a = e.heap[++e.heap_len] = c < 2 ? ++c : 0)] = 1),
                    (e.depth[a] = 0),
                    e.opt_len--,
                    s && (e.static_len -= r[2 * a + 1]));
            for (t.max_code = c, o = e.heap_len >> 1; o >= 1; o--) T(e, i, o);
            a = l;
            do {
                ((o = e.heap[1]),
                    (e.heap[1] = e.heap[e.heap_len--]),
                    T(e, i, 1),
                    (n = e.heap[1]),
                    (e.heap[--e.heap_max] = o),
                    (e.heap[--e.heap_max] = n),
                    (i[2 * a] = i[2 * o] + i[2 * n]),
                    (e.depth[a] = (e.depth[o] >= e.depth[n] ? e.depth[o] : e.depth[n]) + 1),
                    (i[2 * o + 1] = i[2 * n + 1] = a),
                    (e.heap[1] = a++),
                    T(e, i, 1));
            } while (e.heap_len >= 2);
            ((e.heap[--e.heap_max] = e.heap[1]),
                (function (e, t) {
                    var o,
                        n,
                        a,
                        i,
                        r,
                        s,
                        l = t.dyn_tree,
                        c = t.max_code,
                        u = t.stat_desc.static_tree,
                        d = t.stat_desc.has_stree,
                        p = t.stat_desc.extra_bits,
                        h = t.stat_desc.extra_base,
                        g = t.stat_desc.max_length,
                        f = 0;
                    for (i = 0; i <= 15; i++) e.bl_count[i] = 0;
                    for (l[2 * e.heap[e.heap_max] + 1] = 0, o = e.heap_max + 1; o < 573; o++)
                        ((i = l[2 * l[2 * (n = e.heap[o]) + 1] + 1] + 1) > g && ((i = g), f++),
                            (l[2 * n + 1] = i),
                            n > c ||
                                (e.bl_count[i]++,
                                (r = 0),
                                n >= h && (r = p[n - h]),
                                (s = l[2 * n]),
                                (e.opt_len += s * (i + r)),
                                d && (e.static_len += s * (u[2 * n + 1] + r))));
                    if (0 !== f) {
                        do {
                            for (i = g - 1; 0 === e.bl_count[i]; ) i--;
                            (e.bl_count[i]--, (e.bl_count[i + 1] += 2), e.bl_count[g]--, (f -= 2));
                        } while (f > 0);
                        for (i = g; 0 !== i; i--)
                            for (n = e.bl_count[i]; 0 !== n; )
                                (a = e.heap[--o]) > c ||
                                    (l[2 * a + 1] !== i && ((e.opt_len += (i - l[2 * a + 1]) * l[2 * a]), (l[2 * a + 1] = i)), n--);
                    }
                })(e, t),
                E(i, c, e.bl_count));
        }
        function R(e, t, o) {
            var n,
                a,
                i = -1,
                r = t[1],
                s = 0,
                l = 7,
                c = 4;
            for (0 === r && ((l = 138), (c = 3)), t[2 * (o + 1) + 1] = 65535, n = 0; n <= o; n++)
                ((a = r),
                    (r = t[2 * (n + 1) + 1]),
                    (++s < l && a === r) ||
                        (s < c
                            ? (e.bl_tree[2 * a] += s)
                            : 0 !== a
                              ? (a !== i && e.bl_tree[2 * a]++, e.bl_tree[32]++)
                              : s <= 10
                                ? e.bl_tree[34]++
                                : e.bl_tree[36]++,
                        (s = 0),
                        (i = a),
                        0 === r ? ((l = 138), (c = 3)) : a === r ? ((l = 6), (c = 3)) : ((l = 7), (c = 4))));
        }
        function I(e, t, o) {
            var n,
                a,
                i = -1,
                r = t[1],
                s = 0,
                l = 7,
                c = 4;
            for (0 === r && ((l = 138), (c = 3)), n = 0; n <= o; n++)
                if (((a = r), (r = t[2 * (n + 1) + 1]), !(++s < l && a === r))) {
                    if (s < c)
                        do {
                            A(e, a, e.bl_tree);
                        } while (0 != --s);
                    else
                        0 !== a
                            ? (a !== i && (A(e, a, e.bl_tree), s--), A(e, 16, e.bl_tree), D(e, s - 3, 2))
                            : s <= 10
                              ? (A(e, 17, e.bl_tree), D(e, s - 3, 3))
                              : (A(e, 18, e.bl_tree), D(e, s - 11, 7));
                    ((s = 0), (i = a), 0 === r ? ((l = 138), (c = 3)) : a === r ? ((l = 6), (c = 3)) : ((l = 7), (c = 4)));
                }
        }
        a(x);
        var G = !1;
        function O(e, t, o, a) {
            (D(e, 0 + (a ? 1 : 0), 3),
                (function (e, t, o, a) {
                    (k(e), a && (v(e, o), v(e, ~o)), n.arraySet(e.pending_buf, e.window, t, o, e.pending), (e.pending += o));
                })(e, t, o, !0));
        }
        ((t._tr_init = function (e) {
            (G ||
                (!(function () {
                    var e,
                        t,
                        o,
                        n,
                        a,
                        l = new Array(16);
                    for (o = 0, n = 0; n < 28; n++) for (h[n] = o, e = 0; e < 1 << i[n]; e++) p[o++] = n;
                    for (p[o - 1] = n, a = 0, n = 0; n < 16; n++) for (x[n] = a, e = 0; e < 1 << r[n]; e++) d[a++] = n;
                    for (a >>= 7; n < 30; n++) for (x[n] = a << 7, e = 0; e < 1 << (r[n] - 7); e++) d[256 + a++] = n;
                    for (t = 0; t <= 15; t++) l[t] = 0;
                    for (e = 0; e <= 143; ) ((c[2 * e + 1] = 8), e++, l[8]++);
                    for (; e <= 255; ) ((c[2 * e + 1] = 9), e++, l[9]++);
                    for (; e <= 279; ) ((c[2 * e + 1] = 7), e++, l[7]++);
                    for (; e <= 287; ) ((c[2 * e + 1] = 8), e++, l[8]++);
                    for (E(c, 287, l), e = 0; e < 30; e++) ((u[2 * e + 1] = 5), (u[2 * e] = C(e, 5)));
                    ((g = new y(c, i, 257, 286, 15)), (f = new y(u, r, 0, 30, 15)), (m = new y(new Array(0), s, 0, 19, 7)));
                })(),
                (G = !0)),
                (e.l_desc = new b(e.dyn_ltree, g)),
                (e.d_desc = new b(e.dyn_dtree, f)),
                (e.bl_desc = new b(e.bl_tree, m)),
                (e.bi_buf = 0),
                (e.bi_valid = 0),
                S(e));
        }),
            (t._tr_stored_block = O),
            (t._tr_flush_block = function (e, t, o, n) {
                var a,
                    i,
                    r = 0;
                (e.level > 0
                    ? (2 === e.strm.data_type &&
                          (e.strm.data_type = (function (e) {
                              var t,
                                  o = 4093624447;
                              for (t = 0; t <= 31; t++, o >>>= 1) if (1 & o && 0 !== e.dyn_ltree[2 * t]) return 0;
                              if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
                              for (t = 32; t < 256; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;
                              return 0;
                          })(e)),
                      F(e, e.l_desc),
                      F(e, e.d_desc),
                      (r = (function (e) {
                          var t;
                          for (
                              R(e, e.dyn_ltree, e.l_desc.max_code), R(e, e.dyn_dtree, e.d_desc.max_code), F(e, e.bl_desc), t = 18;
                              t >= 3 && 0 === e.bl_tree[2 * l[t] + 1];
                              t--
                          );
                          return ((e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t);
                      })(e)),
                      (a = (e.opt_len + 3 + 7) >>> 3),
                      (i = (e.static_len + 3 + 7) >>> 3) <= a && (a = i))
                    : (a = i = o + 5),
                    o + 4 <= a && -1 !== t
                        ? O(e, t, o, n)
                        : 4 === e.strategy || i === a
                          ? (D(e, 2 + (n ? 1 : 0), 3), P(e, c, u))
                          : (D(e, 4 + (n ? 1 : 0), 3),
                            (function (e, t, o, n) {
                                var a;
                                for (D(e, t - 257, 5), D(e, o - 1, 5), D(e, n - 4, 4), a = 0; a < n; a++) D(e, e.bl_tree[2 * l[a] + 1], 3);
                                (I(e, e.dyn_ltree, t - 1), I(e, e.dyn_dtree, o - 1));
                            })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, r + 1),
                            P(e, e.dyn_ltree, e.dyn_dtree)),
                    S(e),
                    n && k(e));
            }),
            (t._tr_tally = function (e, t, o) {
                return (
                    (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
                    (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
                    (e.pending_buf[e.l_buf + e.last_lit] = 255 & o),
                    e.last_lit++,
                    0 === t ? e.dyn_ltree[2 * o]++ : (e.matches++, t--, e.dyn_ltree[2 * (p[o] + 256 + 1)]++, e.dyn_dtree[2 * w(t)]++),
                    e.last_lit === e.lit_bufsize - 1
                );
            }),
            (t._tr_align = function (e) {
                (D(e, 2, 3),
                    A(e, 256, c),
                    (function (e) {
                        16 === e.bi_valid
                            ? (v(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
                            : e.bi_valid >= 8 && ((e.pending_buf[e.pending++] = 255 & e.bi_buf), (e.bi_buf >>= 8), (e.bi_valid -= 8));
                    })(e));
            }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(466),
            a = o(94),
            i = o(312),
            r = o(314),
            s = o(225),
            l = o(313),
            c = o(469),
            u = Object.prototype.toString;
        function d(e) {
            if (!(this instanceof d)) return new d(e);
            this.options = a.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {});
            var t = this.options;
            (t.raw &&
                t.windowBits >= 0 &&
                t.windowBits < 16 &&
                ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
                !(t.windowBits >= 0 && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32),
                t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                (this.err = 0),
                (this.msg = ""),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new l()),
                (this.strm.avail_out = 0));
            var o = n.inflateInit2(this.strm, t.windowBits);
            if (o !== r.Z_OK) throw new Error(s[o]);
            if (
                ((this.header = new c()),
                n.inflateGetHeader(this.strm, this.header),
                t.dictionary &&
                    ("string" == typeof t.dictionary
                        ? (t.dictionary = i.string2buf(t.dictionary))
                        : "[object ArrayBuffer]" === u.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
                    t.raw && (o = n.inflateSetDictionary(this.strm, t.dictionary)) !== r.Z_OK))
            )
                throw new Error(s[o]);
        }
        function p(e, t) {
            var o = new d(t);
            if ((o.push(e, !0), o.err)) throw o.msg || s[o.err];
            return o.result;
        }
        ((d.prototype.push = function (e, t) {
            var o,
                s,
                l,
                c,
                d,
                p = this.strm,
                h = this.options.chunkSize,
                g = this.options.dictionary,
                f = !1;
            if (this.ended) return !1;
            ((s = t === ~~t ? t : !0 === t ? r.Z_FINISH : r.Z_NO_FLUSH),
                "string" == typeof e
                    ? (p.input = i.binstring2buf(e))
                    : "[object ArrayBuffer]" === u.call(e)
                      ? (p.input = new Uint8Array(e))
                      : (p.input = e),
                (p.next_in = 0),
                (p.avail_in = p.input.length));
            do {
                if (
                    (0 === p.avail_out && ((p.output = new a.Buf8(h)), (p.next_out = 0), (p.avail_out = h)),
                    (o = n.inflate(p, r.Z_NO_FLUSH)) === r.Z_NEED_DICT && g && (o = n.inflateSetDictionary(this.strm, g)),
                    o === r.Z_BUF_ERROR && !0 === f && ((o = r.Z_OK), (f = !1)),
                    o !== r.Z_STREAM_END && o !== r.Z_OK)
                )
                    return (this.onEnd(o), (this.ended = !0), !1);
                (p.next_out &&
                    ((0 !== p.avail_out && o !== r.Z_STREAM_END && (0 !== p.avail_in || (s !== r.Z_FINISH && s !== r.Z_SYNC_FLUSH))) ||
                        ("string" === this.options.to
                            ? ((l = i.utf8border(p.output, p.next_out)),
                              (c = p.next_out - l),
                              (d = i.buf2string(p.output, l)),
                              (p.next_out = c),
                              (p.avail_out = h - c),
                              c && a.arraySet(p.output, p.output, l, c, 0),
                              this.onData(d))
                            : this.onData(a.shrinkBuf(p.output, p.next_out)))),
                    0 === p.avail_in && 0 === p.avail_out && (f = !0));
            } while ((p.avail_in > 0 || 0 === p.avail_out) && o !== r.Z_STREAM_END);
            return (
                o === r.Z_STREAM_END && (s = r.Z_FINISH),
                s === r.Z_FINISH
                    ? ((o = n.inflateEnd(this.strm)), this.onEnd(o), (this.ended = !0), o === r.Z_OK)
                    : s !== r.Z_SYNC_FLUSH || (this.onEnd(r.Z_OK), (p.avail_out = 0), !0)
            );
        }),
            (d.prototype.onData = function (e) {
                this.chunks.push(e);
            }),
            (d.prototype.onEnd = function (e) {
                (e === r.Z_OK &&
                    ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = a.flattenChunks(this.chunks))),
                    (this.chunks = []),
                    (this.err = e),
                    (this.msg = this.strm.msg));
            }),
            (t.Inflate = d),
            (t.inflate = p),
            (t.inflateRaw = function (e, t) {
                return (((t = t || {}).raw = !0), p(e, t));
            }),
            (t.ungzip = p));
    },
    function (e, t, o) {
        "use strict";
        var n = o(94),
            a = o(310),
            i = o(311),
            r = o(467),
            s = o(468);
        function l(e) {
            return ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
        }
        function c() {
            ((this.mode = 0),
                (this.last = !1),
                (this.wrap = 0),
                (this.havedict = !1),
                (this.flags = 0),
                (this.dmax = 0),
                (this.check = 0),
                (this.total = 0),
                (this.head = null),
                (this.wbits = 0),
                (this.wsize = 0),
                (this.whave = 0),
                (this.wnext = 0),
                (this.window = null),
                (this.hold = 0),
                (this.bits = 0),
                (this.length = 0),
                (this.offset = 0),
                (this.extra = 0),
                (this.lencode = null),
                (this.distcode = null),
                (this.lenbits = 0),
                (this.distbits = 0),
                (this.ncode = 0),
                (this.nlen = 0),
                (this.ndist = 0),
                (this.have = 0),
                (this.next = null),
                (this.lens = new n.Buf16(320)),
                (this.work = new n.Buf16(288)),
                (this.lendyn = null),
                (this.distdyn = null),
                (this.sane = 0),
                (this.back = 0),
                (this.was = 0));
        }
        function u(e) {
            var t;
            return e && e.state
                ? ((t = e.state),
                  (e.total_in = e.total_out = t.total = 0),
                  (e.msg = ""),
                  t.wrap && (e.adler = 1 & t.wrap),
                  (t.mode = 1),
                  (t.last = 0),
                  (t.havedict = 0),
                  (t.dmax = 32768),
                  (t.head = null),
                  (t.hold = 0),
                  (t.bits = 0),
                  (t.lencode = t.lendyn = new n.Buf32(852)),
                  (t.distcode = t.distdyn = new n.Buf32(592)),
                  (t.sane = 1),
                  (t.back = -1),
                  0)
                : -2;
        }
        function d(e) {
            var t;
            return e && e.state ? (((t = e.state).wsize = 0), (t.whave = 0), (t.wnext = 0), u(e)) : -2;
        }
        function p(e, t) {
            var o, n;
            return e && e.state
                ? ((n = e.state),
                  t < 0 ? ((o = 0), (t = -t)) : ((o = 1 + (t >> 4)), t < 48 && (t &= 15)),
                  t && (t < 8 || t > 15)
                      ? -2
                      : (null !== n.window && n.wbits !== t && (n.window = null), (n.wrap = o), (n.wbits = t), d(e)))
                : -2;
        }
        function h(e, t) {
            var o, n;
            return e ? ((n = new c()), (e.state = n), (n.window = null), 0 !== (o = p(e, t)) && (e.state = null), o) : -2;
        }
        var g,
            f,
            m = !0;
        function x(e) {
            if (m) {
                var t;
                for (g = new n.Buf32(512), f = new n.Buf32(32), t = 0; t < 144; ) e.lens[t++] = 8;
                for (; t < 256; ) e.lens[t++] = 9;
                for (; t < 280; ) e.lens[t++] = 7;
                for (; t < 288; ) e.lens[t++] = 8;
                for (s(1, e.lens, 0, 288, g, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5;
                (s(2, e.lens, 0, 32, f, 0, e.work, { bits: 5 }), (m = !1));
            }
            ((e.lencode = g), (e.lenbits = 9), (e.distcode = f), (e.distbits = 5));
        }
        function y(e, t, o, a) {
            var i,
                r = e.state;
            return (
                null === r.window && ((r.wsize = 1 << r.wbits), (r.wnext = 0), (r.whave = 0), (r.window = new n.Buf8(r.wsize))),
                a >= r.wsize
                    ? (n.arraySet(r.window, t, o - r.wsize, r.wsize, 0), (r.wnext = 0), (r.whave = r.wsize))
                    : ((i = r.wsize - r.wnext) > a && (i = a),
                      n.arraySet(r.window, t, o - a, i, r.wnext),
                      (a -= i)
                          ? (n.arraySet(r.window, t, o - a, a, 0), (r.wnext = a), (r.whave = r.wsize))
                          : ((r.wnext += i), r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += i))),
                0
            );
        }
        ((t.inflateReset = d),
            (t.inflateReset2 = p),
            (t.inflateResetKeep = u),
            (t.inflateInit = function (e) {
                return h(e, 15);
            }),
            (t.inflateInit2 = h),
            (t.inflate = function (e, t) {
                var o,
                    c,
                    u,
                    d,
                    p,
                    h,
                    g,
                    f,
                    m,
                    b,
                    w,
                    v,
                    D,
                    A,
                    C,
                    E,
                    S,
                    k,
                    _,
                    T,
                    P,
                    F,
                    R,
                    I,
                    G = 0,
                    O = new n.Buf8(4),
                    L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in)) return -2;
                (12 === (o = e.state).mode && (o.mode = 13),
                    (p = e.next_out),
                    (u = e.output),
                    (g = e.avail_out),
                    (d = e.next_in),
                    (c = e.input),
                    (h = e.avail_in),
                    (f = o.hold),
                    (m = o.bits),
                    (b = h),
                    (w = g),
                    (F = 0));
                e: for (;;)
                    switch (o.mode) {
                        case 1:
                            if (0 === o.wrap) {
                                o.mode = 13;
                                break;
                            }
                            for (; m < 16; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if (2 & o.wrap && 35615 === f) {
                                ((o.check = 0),
                                    (O[0] = 255 & f),
                                    (O[1] = (f >>> 8) & 255),
                                    (o.check = i(o.check, O, 2, 0)),
                                    (f = 0),
                                    (m = 0),
                                    (o.mode = 2));
                                break;
                            }
                            if (((o.flags = 0), o.head && (o.head.done = !1), !(1 & o.wrap) || (((255 & f) << 8) + (f >> 8)) % 31)) {
                                ((e.msg = "incorrect header check"), (o.mode = 30));
                                break;
                            }
                            if (8 != (15 & f)) {
                                ((e.msg = "unknown compression method"), (o.mode = 30));
                                break;
                            }
                            if (((m -= 4), (P = 8 + (15 & (f >>>= 4))), 0 === o.wbits)) o.wbits = P;
                            else if (P > o.wbits) {
                                ((e.msg = "invalid window size"), (o.mode = 30));
                                break;
                            }
                            ((o.dmax = 1 << P), (e.adler = o.check = 1), (o.mode = 512 & f ? 10 : 12), (f = 0), (m = 0));
                            break;
                        case 2:
                            for (; m < 16; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if (((o.flags = f), 8 != (255 & o.flags))) {
                                ((e.msg = "unknown compression method"), (o.mode = 30));
                                break;
                            }
                            if (57344 & o.flags) {
                                ((e.msg = "unknown header flags set"), (o.mode = 30));
                                break;
                            }
                            (o.head && (o.head.text = (f >> 8) & 1),
                                512 & o.flags && ((O[0] = 255 & f), (O[1] = (f >>> 8) & 255), (o.check = i(o.check, O, 2, 0))),
                                (f = 0),
                                (m = 0),
                                (o.mode = 3));
                        case 3:
                            for (; m < 32; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            (o.head && (o.head.time = f),
                                512 & o.flags &&
                                    ((O[0] = 255 & f),
                                    (O[1] = (f >>> 8) & 255),
                                    (O[2] = (f >>> 16) & 255),
                                    (O[3] = (f >>> 24) & 255),
                                    (o.check = i(o.check, O, 4, 0))),
                                (f = 0),
                                (m = 0),
                                (o.mode = 4));
                        case 4:
                            for (; m < 16; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            (o.head && ((o.head.xflags = 255 & f), (o.head.os = f >> 8)),
                                512 & o.flags && ((O[0] = 255 & f), (O[1] = (f >>> 8) & 255), (o.check = i(o.check, O, 2, 0))),
                                (f = 0),
                                (m = 0),
                                (o.mode = 5));
                        case 5:
                            if (1024 & o.flags) {
                                for (; m < 16; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((o.length = f),
                                    o.head && (o.head.extra_len = f),
                                    512 & o.flags && ((O[0] = 255 & f), (O[1] = (f >>> 8) & 255), (o.check = i(o.check, O, 2, 0))),
                                    (f = 0),
                                    (m = 0));
                            } else o.head && (o.head.extra = null);
                            o.mode = 6;
                        case 6:
                            if (
                                1024 & o.flags &&
                                ((v = o.length) > h && (v = h),
                                v &&
                                    (o.head &&
                                        ((P = o.head.extra_len - o.length),
                                        o.head.extra || (o.head.extra = new Array(o.head.extra_len)),
                                        n.arraySet(o.head.extra, c, d, v, P)),
                                    512 & o.flags && (o.check = i(o.check, c, v, d)),
                                    (h -= v),
                                    (d += v),
                                    (o.length -= v)),
                                o.length)
                            )
                                break e;
                            ((o.length = 0), (o.mode = 7));
                        case 7:
                            if (2048 & o.flags) {
                                if (0 === h) break e;
                                v = 0;
                                do {
                                    ((P = c[d + v++]), o.head && P && o.length < 65536 && (o.head.name += String.fromCharCode(P)));
                                } while (P && v < h);
                                if ((512 & o.flags && (o.check = i(o.check, c, v, d)), (h -= v), (d += v), P)) break e;
                            } else o.head && (o.head.name = null);
                            ((o.length = 0), (o.mode = 8));
                        case 8:
                            if (4096 & o.flags) {
                                if (0 === h) break e;
                                v = 0;
                                do {
                                    ((P = c[d + v++]), o.head && P && o.length < 65536 && (o.head.comment += String.fromCharCode(P)));
                                } while (P && v < h);
                                if ((512 & o.flags && (o.check = i(o.check, c, v, d)), (h -= v), (d += v), P)) break e;
                            } else o.head && (o.head.comment = null);
                            o.mode = 9;
                        case 9:
                            if (512 & o.flags) {
                                for (; m < 16; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                if (f !== (65535 & o.check)) {
                                    ((e.msg = "header crc mismatch"), (o.mode = 30));
                                    break;
                                }
                                ((f = 0), (m = 0));
                            }
                            (o.head && ((o.head.hcrc = (o.flags >> 9) & 1), (o.head.done = !0)), (e.adler = o.check = 0), (o.mode = 12));
                            break;
                        case 10:
                            for (; m < 32; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            ((e.adler = o.check = l(f)), (f = 0), (m = 0), (o.mode = 11));
                        case 11:
                            if (0 === o.havedict)
                                return (
                                    (e.next_out = p),
                                    (e.avail_out = g),
                                    (e.next_in = d),
                                    (e.avail_in = h),
                                    (o.hold = f),
                                    (o.bits = m),
                                    2
                                );
                            ((e.adler = o.check = 1), (o.mode = 12));
                        case 12:
                            if (5 === t || 6 === t) break e;
                        case 13:
                            if (o.last) {
                                ((f >>>= 7 & m), (m -= 7 & m), (o.mode = 27));
                                break;
                            }
                            for (; m < 3; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            switch (((o.last = 1 & f), (m -= 1), 3 & (f >>>= 1))) {
                                case 0:
                                    o.mode = 14;
                                    break;
                                case 1:
                                    if ((x(o), (o.mode = 20), 6 === t)) {
                                        ((f >>>= 2), (m -= 2));
                                        break e;
                                    }
                                    break;
                                case 2:
                                    o.mode = 17;
                                    break;
                                case 3:
                                    ((e.msg = "invalid block type"), (o.mode = 30));
                            }
                            ((f >>>= 2), (m -= 2));
                            break;
                        case 14:
                            for (f >>>= 7 & m, m -= 7 & m; m < 32; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if ((65535 & f) != ((f >>> 16) ^ 65535)) {
                                ((e.msg = "invalid stored block lengths"), (o.mode = 30));
                                break;
                            }
                            if (((o.length = 65535 & f), (f = 0), (m = 0), (o.mode = 15), 6 === t)) break e;
                        case 15:
                            o.mode = 16;
                        case 16:
                            if ((v = o.length)) {
                                if ((v > h && (v = h), v > g && (v = g), 0 === v)) break e;
                                (n.arraySet(u, c, d, v, p), (h -= v), (d += v), (g -= v), (p += v), (o.length -= v));
                                break;
                            }
                            o.mode = 12;
                            break;
                        case 17:
                            for (; m < 14; ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if (
                                ((o.nlen = 257 + (31 & f)),
                                (f >>>= 5),
                                (m -= 5),
                                (o.ndist = 1 + (31 & f)),
                                (f >>>= 5),
                                (m -= 5),
                                (o.ncode = 4 + (15 & f)),
                                (f >>>= 4),
                                (m -= 4),
                                o.nlen > 286 || o.ndist > 30)
                            ) {
                                ((e.msg = "too many length or distance symbols"), (o.mode = 30));
                                break;
                            }
                            ((o.have = 0), (o.mode = 18));
                        case 18:
                            for (; o.have < o.ncode; ) {
                                for (; m < 3; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((o.lens[L[o.have++]] = 7 & f), (f >>>= 3), (m -= 3));
                            }
                            for (; o.have < 19; ) o.lens[L[o.have++]] = 0;
                            if (
                                ((o.lencode = o.lendyn),
                                (o.lenbits = 7),
                                (R = { bits: o.lenbits }),
                                (F = s(0, o.lens, 0, 19, o.lencode, 0, o.work, R)),
                                (o.lenbits = R.bits),
                                F)
                            ) {
                                ((e.msg = "invalid code lengths set"), (o.mode = 30));
                                break;
                            }
                            ((o.have = 0), (o.mode = 19));
                        case 19:
                            for (; o.have < o.nlen + o.ndist; ) {
                                for (
                                    ;
                                    (E = ((G = o.lencode[f & ((1 << o.lenbits) - 1)]) >>> 16) & 255),
                                        (S = 65535 & G),
                                        !((C = G >>> 24) <= m);

                                ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                if (S < 16) ((f >>>= C), (m -= C), (o.lens[o.have++] = S));
                                else {
                                    if (16 === S) {
                                        for (I = C + 2; m < I; ) {
                                            if (0 === h) break e;
                                            (h--, (f += c[d++] << m), (m += 8));
                                        }
                                        if (((f >>>= C), (m -= C), 0 === o.have)) {
                                            ((e.msg = "invalid bit length repeat"), (o.mode = 30));
                                            break;
                                        }
                                        ((P = o.lens[o.have - 1]), (v = 3 + (3 & f)), (f >>>= 2), (m -= 2));
                                    } else if (17 === S) {
                                        for (I = C + 3; m < I; ) {
                                            if (0 === h) break e;
                                            (h--, (f += c[d++] << m), (m += 8));
                                        }
                                        ((m -= C), (P = 0), (v = 3 + (7 & (f >>>= C))), (f >>>= 3), (m -= 3));
                                    } else {
                                        for (I = C + 7; m < I; ) {
                                            if (0 === h) break e;
                                            (h--, (f += c[d++] << m), (m += 8));
                                        }
                                        ((m -= C), (P = 0), (v = 11 + (127 & (f >>>= C))), (f >>>= 7), (m -= 7));
                                    }
                                    if (o.have + v > o.nlen + o.ndist) {
                                        ((e.msg = "invalid bit length repeat"), (o.mode = 30));
                                        break;
                                    }
                                    for (; v--; ) o.lens[o.have++] = P;
                                }
                            }
                            if (30 === o.mode) break;
                            if (0 === o.lens[256]) {
                                ((e.msg = "invalid code -- missing end-of-block"), (o.mode = 30));
                                break;
                            }
                            if (
                                ((o.lenbits = 9),
                                (R = { bits: o.lenbits }),
                                (F = s(1, o.lens, 0, o.nlen, o.lencode, 0, o.work, R)),
                                (o.lenbits = R.bits),
                                F)
                            ) {
                                ((e.msg = "invalid literal/lengths set"), (o.mode = 30));
                                break;
                            }
                            if (
                                ((o.distbits = 6),
                                (o.distcode = o.distdyn),
                                (R = { bits: o.distbits }),
                                (F = s(2, o.lens, o.nlen, o.ndist, o.distcode, 0, o.work, R)),
                                (o.distbits = R.bits),
                                F)
                            ) {
                                ((e.msg = "invalid distances set"), (o.mode = 30));
                                break;
                            }
                            if (((o.mode = 20), 6 === t)) break e;
                        case 20:
                            o.mode = 21;
                        case 21:
                            if (h >= 6 && g >= 258) {
                                ((e.next_out = p),
                                    (e.avail_out = g),
                                    (e.next_in = d),
                                    (e.avail_in = h),
                                    (o.hold = f),
                                    (o.bits = m),
                                    r(e, w),
                                    (p = e.next_out),
                                    (u = e.output),
                                    (g = e.avail_out),
                                    (d = e.next_in),
                                    (c = e.input),
                                    (h = e.avail_in),
                                    (f = o.hold),
                                    (m = o.bits),
                                    12 === o.mode && (o.back = -1));
                                break;
                            }
                            for (
                                o.back = 0;
                                (E = ((G = o.lencode[f & ((1 << o.lenbits) - 1)]) >>> 16) & 255), (S = 65535 & G), !((C = G >>> 24) <= m);

                            ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if (E && 0 == (240 & E)) {
                                for (
                                    k = C, _ = E, T = S;
                                    (E = ((G = o.lencode[T + ((f & ((1 << (k + _)) - 1)) >> k)]) >>> 16) & 255),
                                        (S = 65535 & G),
                                        !(k + (C = G >>> 24) <= m);

                                ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((f >>>= k), (m -= k), (o.back += k));
                            }
                            if (((f >>>= C), (m -= C), (o.back += C), (o.length = S), 0 === E)) {
                                o.mode = 26;
                                break;
                            }
                            if (32 & E) {
                                ((o.back = -1), (o.mode = 12));
                                break;
                            }
                            if (64 & E) {
                                ((e.msg = "invalid literal/length code"), (o.mode = 30));
                                break;
                            }
                            ((o.extra = 15 & E), (o.mode = 22));
                        case 22:
                            if (o.extra) {
                                for (I = o.extra; m < I; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((o.length += f & ((1 << o.extra) - 1)), (f >>>= o.extra), (m -= o.extra), (o.back += o.extra));
                            }
                            ((o.was = o.length), (o.mode = 23));
                        case 23:
                            for (
                                ;
                                (E = ((G = o.distcode[f & ((1 << o.distbits) - 1)]) >>> 16) & 255), (S = 65535 & G), !((C = G >>> 24) <= m);

                            ) {
                                if (0 === h) break e;
                                (h--, (f += c[d++] << m), (m += 8));
                            }
                            if (0 == (240 & E)) {
                                for (
                                    k = C, _ = E, T = S;
                                    (E = ((G = o.distcode[T + ((f & ((1 << (k + _)) - 1)) >> k)]) >>> 16) & 255),
                                        (S = 65535 & G),
                                        !(k + (C = G >>> 24) <= m);

                                ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((f >>>= k), (m -= k), (o.back += k));
                            }
                            if (((f >>>= C), (m -= C), (o.back += C), 64 & E)) {
                                ((e.msg = "invalid distance code"), (o.mode = 30));
                                break;
                            }
                            ((o.offset = S), (o.extra = 15 & E), (o.mode = 24));
                        case 24:
                            if (o.extra) {
                                for (I = o.extra; m < I; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                ((o.offset += f & ((1 << o.extra) - 1)), (f >>>= o.extra), (m -= o.extra), (o.back += o.extra));
                            }
                            if (o.offset > o.dmax) {
                                ((e.msg = "invalid distance too far back"), (o.mode = 30));
                                break;
                            }
                            o.mode = 25;
                        case 25:
                            if (0 === g) break e;
                            if (((v = w - g), o.offset > v)) {
                                if ((v = o.offset - v) > o.whave && o.sane) {
                                    ((e.msg = "invalid distance too far back"), (o.mode = 30));
                                    break;
                                }
                                (v > o.wnext ? ((v -= o.wnext), (D = o.wsize - v)) : (D = o.wnext - v),
                                    v > o.length && (v = o.length),
                                    (A = o.window));
                            } else ((A = u), (D = p - o.offset), (v = o.length));
                            (v > g && (v = g), (g -= v), (o.length -= v));
                            do {
                                u[p++] = A[D++];
                            } while (--v);
                            0 === o.length && (o.mode = 21);
                            break;
                        case 26:
                            if (0 === g) break e;
                            ((u[p++] = o.length), g--, (o.mode = 21));
                            break;
                        case 27:
                            if (o.wrap) {
                                for (; m < 32; ) {
                                    if (0 === h) break e;
                                    (h--, (f |= c[d++] << m), (m += 8));
                                }
                                if (
                                    ((w -= g),
                                    (e.total_out += w),
                                    (o.total += w),
                                    w && (e.adler = o.check = o.flags ? i(o.check, u, w, p - w) : a(o.check, u, w, p - w)),
                                    (w = g),
                                    (o.flags ? f : l(f)) !== o.check)
                                ) {
                                    ((e.msg = "incorrect data check"), (o.mode = 30));
                                    break;
                                }
                                ((f = 0), (m = 0));
                            }
                            o.mode = 28;
                        case 28:
                            if (o.wrap && o.flags) {
                                for (; m < 32; ) {
                                    if (0 === h) break e;
                                    (h--, (f += c[d++] << m), (m += 8));
                                }
                                if (f !== (4294967295 & o.total)) {
                                    ((e.msg = "incorrect length check"), (o.mode = 30));
                                    break;
                                }
                                ((f = 0), (m = 0));
                            }
                            o.mode = 29;
                        case 29:
                            F = 1;
                            break e;
                        case 30:
                            F = -3;
                            break e;
                        case 31:
                            return -4;
                        case 32:
                        default:
                            return -2;
                    }
                return (
                    (e.next_out = p),
                    (e.avail_out = g),
                    (e.next_in = d),
                    (e.avail_in = h),
                    (o.hold = f),
                    (o.bits = m),
                    (o.wsize || (w !== e.avail_out && o.mode < 30 && (o.mode < 27 || 4 !== t))) &&
                    y(e, e.output, e.next_out, w - e.avail_out)
                        ? ((o.mode = 31), -4)
                        : ((b -= e.avail_in),
                          (w -= e.avail_out),
                          (e.total_in += b),
                          (e.total_out += w),
                          (o.total += w),
                          o.wrap &&
                              w &&
                              (e.adler = o.check = o.flags ? i(o.check, u, w, e.next_out - w) : a(o.check, u, w, e.next_out - w)),
                          (e.data_type =
                              o.bits + (o.last ? 64 : 0) + (12 === o.mode ? 128 : 0) + (20 === o.mode || 15 === o.mode ? 256 : 0)),
                          ((0 === b && 0 === w) || 4 === t) && 0 === F && (F = -5),
                          F)
                );
            }),
            (t.inflateEnd = function (e) {
                if (!e || !e.state) return -2;
                var t = e.state;
                return (t.window && (t.window = null), (e.state = null), 0);
            }),
            (t.inflateGetHeader = function (e, t) {
                var o;
                return e && e.state ? (0 == (2 & (o = e.state).wrap) ? -2 : ((o.head = t), (t.done = !1), 0)) : -2;
            }),
            (t.inflateSetDictionary = function (e, t) {
                var o,
                    n = t.length;
                return e && e.state
                    ? 0 !== (o = e.state).wrap && 11 !== o.mode
                        ? -2
                        : 11 === o.mode && a(1, t, n, 0) !== o.check
                          ? -3
                          : y(e, t, n, n)
                            ? ((o.mode = 31), -4)
                            : ((o.havedict = 1), 0)
                    : -2;
            }),
            (t.inflateInfo = "pako inflate (from Nodeca project)"));
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            var o, n, a, i, r, s, l, c, u, d, p, h, g, f, m, x, y, b, w, v, D, A, C, E, S;
            ((o = e.state),
                (n = e.next_in),
                (E = e.input),
                (a = n + (e.avail_in - 5)),
                (i = e.next_out),
                (S = e.output),
                (r = i - (t - e.avail_out)),
                (s = i + (e.avail_out - 257)),
                (l = o.dmax),
                (c = o.wsize),
                (u = o.whave),
                (d = o.wnext),
                (p = o.window),
                (h = o.hold),
                (g = o.bits),
                (f = o.lencode),
                (m = o.distcode),
                (x = (1 << o.lenbits) - 1),
                (y = (1 << o.distbits) - 1));
            e: do {
                (g < 15 && ((h += E[n++] << g), (g += 8), (h += E[n++] << g), (g += 8)), (b = f[h & x]));
                t: for (;;) {
                    if (((h >>>= w = b >>> 24), (g -= w), 0 === (w = (b >>> 16) & 255))) S[i++] = 65535 & b;
                    else {
                        if (!(16 & w)) {
                            if (0 == (64 & w)) {
                                b = f[(65535 & b) + (h & ((1 << w) - 1))];
                                continue t;
                            }
                            if (32 & w) {
                                o.mode = 12;
                                break e;
                            }
                            ((e.msg = "invalid literal/length code"), (o.mode = 30));
                            break e;
                        }
                        ((v = 65535 & b),
                            (w &= 15) && (g < w && ((h += E[n++] << g), (g += 8)), (v += h & ((1 << w) - 1)), (h >>>= w), (g -= w)),
                            g < 15 && ((h += E[n++] << g), (g += 8), (h += E[n++] << g), (g += 8)),
                            (b = m[h & y]));
                        o: for (;;) {
                            if (((h >>>= w = b >>> 24), (g -= w), !(16 & (w = (b >>> 16) & 255)))) {
                                if (0 == (64 & w)) {
                                    b = m[(65535 & b) + (h & ((1 << w) - 1))];
                                    continue o;
                                }
                                ((e.msg = "invalid distance code"), (o.mode = 30));
                                break e;
                            }
                            if (
                                ((D = 65535 & b),
                                g < (w &= 15) && ((h += E[n++] << g), (g += 8) < w && ((h += E[n++] << g), (g += 8))),
                                (D += h & ((1 << w) - 1)) > l)
                            ) {
                                ((e.msg = "invalid distance too far back"), (o.mode = 30));
                                break e;
                            }
                            if (((h >>>= w), (g -= w), D > (w = i - r))) {
                                if ((w = D - w) > u && o.sane) {
                                    ((e.msg = "invalid distance too far back"), (o.mode = 30));
                                    break e;
                                }
                                if (((A = 0), (C = p), 0 === d)) {
                                    if (((A += c - w), w < v)) {
                                        v -= w;
                                        do {
                                            S[i++] = p[A++];
                                        } while (--w);
                                        ((A = i - D), (C = S));
                                    }
                                } else if (d < w) {
                                    if (((A += c + d - w), (w -= d) < v)) {
                                        v -= w;
                                        do {
                                            S[i++] = p[A++];
                                        } while (--w);
                                        if (((A = 0), d < v)) {
                                            v -= w = d;
                                            do {
                                                S[i++] = p[A++];
                                            } while (--w);
                                            ((A = i - D), (C = S));
                                        }
                                    }
                                } else if (((A += d - w), w < v)) {
                                    v -= w;
                                    do {
                                        S[i++] = p[A++];
                                    } while (--w);
                                    ((A = i - D), (C = S));
                                }
                                for (; v > 2; ) ((S[i++] = C[A++]), (S[i++] = C[A++]), (S[i++] = C[A++]), (v -= 3));
                                v && ((S[i++] = C[A++]), v > 1 && (S[i++] = C[A++]));
                            } else {
                                A = i - D;
                                do {
                                    ((S[i++] = S[A++]), (S[i++] = S[A++]), (S[i++] = S[A++]), (v -= 3));
                                } while (v > 2);
                                v && ((S[i++] = S[A++]), v > 1 && (S[i++] = S[A++]));
                            }
                            break;
                        }
                    }
                    break;
                }
            } while (n < a && i < s);
            ((n -= v = g >> 3),
                (h &= (1 << (g -= v << 3)) - 1),
                (e.next_in = n),
                (e.next_out = i),
                (e.avail_in = n < a ? a - n + 5 : 5 - (n - a)),
                (e.avail_out = i < s ? s - i + 257 : 257 - (i - s)),
                (o.hold = h),
                (o.bits = g));
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(94),
            a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            i = [
                16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
            ],
            r = [
                1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193,
                12289, 16385, 24577, 0, 0,
            ],
            s = [
                16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64,
                64,
            ];
        e.exports = function (e, t, o, l, c, u, d, p) {
            var h,
                g,
                f,
                m,
                x,
                y,
                b,
                w,
                v,
                D = p.bits,
                A = 0,
                C = 0,
                E = 0,
                S = 0,
                k = 0,
                _ = 0,
                T = 0,
                P = 0,
                F = 0,
                R = 0,
                I = null,
                G = 0,
                O = new n.Buf16(16),
                L = new n.Buf16(16),
                B = null,
                N = 0;
            for (A = 0; A <= 15; A++) O[A] = 0;
            for (C = 0; C < l; C++) O[t[o + C]]++;
            for (k = D, S = 15; S >= 1 && 0 === O[S]; S--);
            if ((k > S && (k = S), 0 === S)) return ((c[u++] = 20971520), (c[u++] = 20971520), (p.bits = 1), 0);
            for (E = 1; E < S && 0 === O[E]; E++);
            for (k < E && (k = E), P = 1, A = 1; A <= 15; A++) if (((P <<= 1), (P -= O[A]) < 0)) return -1;
            if (P > 0 && (0 === e || 1 !== S)) return -1;
            for (L[1] = 0, A = 1; A < 15; A++) L[A + 1] = L[A] + O[A];
            for (C = 0; C < l; C++) 0 !== t[o + C] && (d[L[t[o + C]]++] = C);
            if (
                (0 === e
                    ? ((I = B = d), (y = 19))
                    : 1 === e
                      ? ((I = a), (G -= 257), (B = i), (N -= 257), (y = 256))
                      : ((I = r), (B = s), (y = -1)),
                (R = 0),
                (C = 0),
                (A = E),
                (x = u),
                (_ = k),
                (T = 0),
                (f = -1),
                (m = (F = 1 << k) - 1),
                (1 === e && F > 852) || (2 === e && F > 592))
            )
                return 1;
            for (;;) {
                ((b = A - T),
                    d[C] < y ? ((w = 0), (v = d[C])) : d[C] > y ? ((w = B[N + d[C]]), (v = I[G + d[C]])) : ((w = 96), (v = 0)),
                    (h = 1 << (A - T)),
                    (E = g = 1 << _));
                do {
                    c[x + (R >> T) + (g -= h)] = (b << 24) | (w << 16) | v | 0;
                } while (0 !== g);
                for (h = 1 << (A - 1); R & h; ) h >>= 1;
                if ((0 !== h ? ((R &= h - 1), (R += h)) : (R = 0), C++, 0 == --O[A])) {
                    if (A === S) break;
                    A = t[o + d[C]];
                }
                if (A > k && (R & m) !== f) {
                    for (0 === T && (T = k), x += E, P = 1 << (_ = A - T); _ + T < S && !((P -= O[_ + T]) <= 0); ) (_++, (P <<= 1));
                    if (((F += 1 << _), (1 === e && F > 852) || (2 === e && F > 592))) return 1;
                    c[(f = R & m)] = (k << 24) | (_ << 16) | (x - u) | 0;
                }
            }
            return (0 !== R && (c[x + R] = ((A - T) << 24) | (64 << 16) | 0), (p.bits = k), 0);
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports = function () {
            ((this.text = 0),
                (this.time = 0),
                (this.xflags = 0),
                (this.os = 0),
                (this.extra = null),
                (this.extra_len = 0),
                (this.name = ""),
                (this.comment = ""),
                (this.hcrc = 0),
                (this.done = !1));
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
        ((t.read = function (e, t, o, n, a) {
            var i,
                r,
                s = 8 * a - n - 1,
                l = (1 << s) - 1,
                c = l >> 1,
                u = -7,
                d = o ? a - 1 : 0,
                p = o ? -1 : 1,
                h = e[t + d];
            for (d += p, i = h & ((1 << -u) - 1), h >>= -u, u += s; u > 0; i = 256 * i + e[t + d], d += p, u -= 8);
            for (r = i & ((1 << -u) - 1), i >>= -u, u += n; u > 0; r = 256 * r + e[t + d], d += p, u -= 8);
            if (0 === i) i = 1 - c;
            else {
                if (i === l) return r ? NaN : (1 / 0) * (h ? -1 : 1);
                ((r += Math.pow(2, n)), (i -= c));
            }
            return (h ? -1 : 1) * r * Math.pow(2, i - n);
        }),
            (t.write = function (e, t, o, n, a, i) {
                var r,
                    s,
                    l,
                    c = 8 * i - a - 1,
                    u = (1 << c) - 1,
                    d = u >> 1,
                    p = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    h = n ? 0 : i - 1,
                    g = n ? 1 : -1,
                    f = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
                for (
                    t = Math.abs(t),
                        isNaN(t) || t === 1 / 0
                            ? ((s = isNaN(t) ? 1 : 0), (r = u))
                            : ((r = Math.floor(Math.log(t) / Math.LN2)),
                              t * (l = Math.pow(2, -r)) < 1 && (r--, (l *= 2)),
                              (t += r + d >= 1 ? p / l : p * Math.pow(2, 1 - d)) * l >= 2 && (r++, (l /= 2)),
                              r + d >= u
                                  ? ((s = 0), (r = u))
                                  : r + d >= 1
                                    ? ((s = (t * l - 1) * Math.pow(2, a)), (r += d))
                                    : ((s = t * Math.pow(2, d - 1) * Math.pow(2, a)), (r = 0)));
                    a >= 8;
                    e[o + h] = 255 & s, h += g, s /= 256, a -= 8
                );
                for (r = (r << a) | s, c += a; c > 0; e[o + h] = 255 & r, h += g, r /= 256, c -= 8);
                e[o + h - g] |= 128 * f;
            }));
    },
    function (e, t) {
        var o = {}.toString;
        e.exports =
            Array.isArray ||
            function (e) {
                return "[object Array]" == o.call(e);
            };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        const n = [{ ext: "gvdesign", type: "application/gravit+design", default: !0 }],
            a = n.map((e) => {
                let { ext: t } = e;
                return t.toLowerCase();
            });
        e.exports = {
            AmplitudeHelper: { logEvent() {}, updateUserProperty() {}, updateUserLicenseProperties() {} },
            AmplitudeData: { Events: {}, EventProperties: {}, UserProperties: {} },
            ENABLE_UNSPLASH_INTEGRATION: !0,
            GoogleTagManagerSettings: null,
            IN_APP_PURCHASE: {
                WINDOWS: { trunk: null, rc: null, beta: null, production: null, lts: null },
                CLEVERBRIDGE: { openCartInAPopup: !1 },
            },
            License: null,
            LicenseType: null,
            Runtime: null,
            NOTIFICATION_USER_MENTION_REGEX: null,
            NOTIFICATION_SETTINGS_ENABLED: !1,
            FILE_REVIEW_ENABLED: !0,
            ANNOTATION_PERMANENT_LINK: !1,
            ANONYMOUS_SESSION_ENABLED: !1,
            LOCAL_FONTS_API_ENABLED: !0,
            DOMAIN: null,
            GA: { customDimensions: null },
            TOUCH_LAYOUT: !0,
            SHARE_ENGINE: !0,
            LEGACY_SHARE_DIALOG: !1,
            ENABLE_COLLABORATION: !0,
            ENABLE_REQUEST_ACCESS: !0,
            ENABLE_GUEST_ACCESS: !0,
            LISTS_FEATURE: !0,
            REMOVE_GUEST_USER_WHEN_ROLE_IS_NO_ACCESS: !1,
            PURCHASE: { URL_TO_PRODUCT: null },
            DESIGNER: { TITLE: "Corel Vector" },
            TRANSLATION_MANAGER: { CONSIDER_EXTENSION: void 0 },
            SOFTWARE_UPDATE: { SHOW_CHANGE_LOG: !1, CHANGE_LOG_LINK: "https://corelvector.com/changelog/" },
            LOGIN_DIALOGS: { POPUP: !0 },
            HAS_ENTERPRISE: !1,
            FORGOT_PWD_LINK: null,
            LICENSE: { UPGRADEABLE: !1 },
            CLOUD_DIALOG: { NEW_LAYOUT: !1, SHOW_FILE_SIZE_INFO: !0 },
            CLOUD_SYNC_FEATURE: { NEW_LAYOUT: !0 },
            USER_LOGIN: { SHOW_PURCHASE_PRO: !0 },
            AUTO_SAVE_ENABLED: !0,
            AUTOSAVE_INTERVALS: [5, 10, 20],
            AUTOSAVE_INTERVAL_DEFAULT: 5,
            FILE_FORMATS: n,
            FILE_EXTENSIONS: a,
            LINKS: {
                CLEVERBRIDGE_SUPPORT_URL: "https://support.cleverbridge.com/hc/en/requests/new?ticket_form_id=18434",
                BLENDING_MODES_DOCUMENTATION_URL: null,
                ACCOUNT_SETTING_URL: null,
                USER_NAME_UPDATE_URL: null,
            },
            FOLDER_FORMAT: "application/gravit+folder",
            HAS_SNAPZONES: !0,
            HAS_ANNOTATIONS: !1,
            PROFILE_DIALOG_URL: null,
            PRESET_LIMIT: void 0,
            CONNECTION_TEST_WITH_CREDENTIALS: !1,
            NEW_COMMENT_READ_TIMEOUT: 3e4,
            cloudTrunkURL: null,
            cloudRCURL: null,
            trunkURL: null,
            betaURL: null,
            cloudBetaURL: null,
            prodURL: null,
            rcURL: null,
            ltsURL: null,
            domain: null,
            webcdr: null,
            stagingWebcdr: null,
            betaWebcdr: null,
            trunkwebcdr: null,
            websocketURL: null,
            trunkWebsocketURL: null,
            rcWebsocketURL: null,
            betaWebsocketURL: null,
            DateAPI: null,
            gApi: null,
            GooglePickerBuilder: null,
            USE_EXTENSION_IN_FILENAME: !0,
            ALWAYS_SHOW_ACCOUNT_SETTING_DIALOG: !0,
            ALLOW_REARRANGE_TABS: !0,
            SHOW_SIDEBAR_BADGE: !0,
            COMPUTE_SHA256_FOR_FILES: !1,
            IS_COREL: !1,
            IS_TRUNK: !1,
            IS_PROD: !0,
            IS_BETA: !1,
            FILE_ID_PREFIX: {},
            GFileReviewActions: {},
            FileStatus: {},
            User: {},
            NotificationConstants: {},
            LONG_PRESS_TIME_OUT: 500,
            JPEG_EXPORT_QUALITY_DEFAULT: 92,
            VTREE_FREE_HEIGHT: 7,
            VTREE_FREE_HEIGHT_TOUCH: 15,
            UN_BELIVEVABLE_FEW_BYTES_TO_SAVE: 200,
            FILE_SIZE_TO_RAM_COEFFCIENT: 1.5,
            FILE_SIZE_TO_SAVING_RAM_COEFFCIENT: 5,
            MIN_JS_HEAP_SIZE: 104857600,
            JS_HEAP_SIZE_LIMIT_POYFILL: 4294705152,
            ELECTRON_NOJS_MAX_MEMORY: 1503238553.6,
            MIN_TOUCH_MOVE_DISTANCE: 20,
            MIN_TWO_FINGERS_TOUCH_MOVE_DISTANCE: 10,
            MIN_SUPPORTED_SCREEN_SIZE: 1024,
            MAX_FOLDER_DEPTH_FOR_CLOUD: 64,
            OFFLINE_CHECK_MIN_WAIT: 2e3,
            USER_CHECK_MIN_WAIT: 3e4,
            SubscriptionStatus: null,
            PurchaseStatus: null,
            EXTERNAL_APP: { GOOGLEDRIVE: "googledrive" },
            DEFAULT_FILE_THUMBNAIL: "assets/img/cloud/default-file-preview.svg",
            CACHED_GAPI_FUNCTIONS: ["getCollaborators", "getFileExtended", "getFile", "getExternalFile"],
            SEARCH_IN_FOLDERS: !1,
            ACTIVE_USAGE_IDLE_TIME: 3e4,
        };
    },
    function (e, t, o) {
        "use strict";
        function n() {}
        ((n.Provider = { CloudNative: 1, SharepointNative: 2, GoogleDriveNative: 3, OneDriveBusinessNative: 4 }),
            (n.SecurityLevel = { Lowest: 0, Highest: 1 }),
            (e.exports = n));
    },
    function (e, t, o) {
        "use strict";
        var n = o(129).match(/firefox\/(\d+)/i);
        e.exports = !!n && +n[1];
    },
    function (e, t, o) {
        "use strict";
        var n = o(129);
        e.exports = /MSIE|Trident/.test(n);
    },
    function (e, t, o) {
        "use strict";
        var n = o(129).match(/AppleWebKit\/(\d+)\./);
        e.exports = !!n && +n[1];
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(49),
            i = o(120),
            r = o(307),
            s = o(21),
            l = n.RegExp,
            c = l.prototype;
        a &&
            s(function () {
                var e = !0;
                try {
                    l(".", "d");
                } catch (t) {
                    e = !1;
                }
                var t = {},
                    o = "",
                    n = e ? "dgimsy" : "gimsy",
                    a = function (e, n) {
                        Object.defineProperty(t, e, {
                            get: function () {
                                return ((o += n), !0);
                            },
                        });
                    },
                    i = { dotAll: "s", global: "g", ignoreCase: "i", multiline: "m", sticky: "y" };
                for (var r in (e && (i.hasIndices = "d"), i)) a(r, i[r]);
                return Object.getOwnPropertyDescriptor(c, "flags").get.call(t) !== n || o !== n;
            }) &&
            i(c, "flags", { configurable: !0, get: r });
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
        e.exports = require("url");
    },
    function (e, t) {
        e.exports = require("http");
    },
    function (e, t) {
        e.exports = require("https");
    },
    function (e, t, o) {
        "use strict";
        var n = o(672);
        e.exports = function (e, t) {
            return new (n(e))(0 === t ? 0 : t);
        };
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(130),
            a = RangeError;
        e.exports = function (e) {
            var t = n(e);
            if (t < 0) throw new a("The argument can't be less than 0");
            return t;
        };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        function n() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this, e);
        }
        (o(30), (n.prototype.getUID = function () {}), (e.exports = n));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        var n;
        !(function (a, i) {
            "use strict";
            var r = "model",
                s = "name",
                l = "type",
                c = "vendor",
                u = "version",
                d = "mobile",
                p = "tablet",
                h = "smarttv",
                g = function (e) {
                    for (var t = {}, o = 0; o < e.length; o++) t[e[o].toUpperCase()] = e[o];
                    return t;
                },
                f = function (e, t) {
                    return "string" == typeof e && -1 !== m(t).indexOf(m(e));
                },
                m = function (e) {
                    return e.toLowerCase();
                },
                x = function (e, t) {
                    if ("string" == typeof e) return ((e = e.replace(/^\s\s*/, "")), void 0 === t ? e : e.substring(0, 350));
                },
                y = function (e, t) {
                    for (var o, n, a, i, r, s, l = 0; l < t.length && !r; ) {
                        var c = t[l],
                            u = t[l + 1];
                        for (o = n = 0; o < c.length && !r; )
                            if ((r = c[o++].exec(e)))
                                for (a = 0; a < u.length; a++)
                                    ((s = r[++n]),
                                        "object" == typeof (i = u[a]) && i.length > 0
                                            ? 2 === i.length
                                                ? "function" == typeof i[1]
                                                    ? (this[i[0]] = i[1].call(this, s))
                                                    : (this[i[0]] = i[1])
                                                : 3 === i.length
                                                  ? "function" != typeof i[1] || (i[1].exec && i[1].test)
                                                      ? (this[i[0]] = s ? s.replace(i[1], i[2]) : void 0)
                                                      : (this[i[0]] = s ? i[1].call(this, s, i[2]) : void 0)
                                                  : 4 === i.length && (this[i[0]] = s ? i[3].call(this, s.replace(i[1], i[2])) : void 0)
                                            : (this[i] = s || void 0));
                        l += 2;
                    }
                },
                b = function (e, t) {
                    for (var o in t)
                        if ("object" == typeof t[o] && t[o].length > 0) {
                            for (var n = 0; n < t[o].length; n++) if (f(t[o][n], e)) return "?" === o ? void 0 : o;
                        } else if (f(t[o], e)) return "?" === o ? void 0 : o;
                    return e;
                },
                w = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM",
                },
                v = {
                    browser: [
                        [/\b(?:crmo|crios)\/([\w\.]+)/i],
                        [u, [s, "Chrome"]],
                        [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                        [u, [s, "Edge"]],
                        [
                            /(opera mini)\/([-\w\.]+)/i,
                            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                        ],
                        [s, u],
                        [/opios[\/ ]+([\w\.]+)/i],
                        [u, [s, "Opera Mini"]],
                        [/\bopr\/([\w\.]+)/i],
                        [u, [s, "Opera"]],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                            /(?:ms|\()(ie) ([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                            /(weibo)__([\d\.]+)/i,
                        ],
                        [s, u],
                        [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                        [u, [s, "UCBrowser"]],
                        [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
                        [u, [s, "WeChat(Win) Desktop"]],
                        [/micromessenger\/([\w\.]+)/i],
                        [u, [s, "WeChat"]],
                        [/konqueror\/([\w\.]+)/i],
                        [u, [s, "Konqueror"]],
                        [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                        [u, [s, "IE"]],
                        [/yabrowser\/([\w\.]+)/i],
                        [u, [s, "Yandex"]],
                        [/(avast|avg)\/([\w\.]+)/i],
                        [[s, /(.+)/, "$1 Secure Browser"], u],
                        [/\bfocus\/([\w\.]+)/i],
                        [u, [s, "Firefox Focus"]],
                        [/\bopt\/([\w\.]+)/i],
                        [u, [s, "Opera Touch"]],
                        [/coc_coc\w+\/([\w\.]+)/i],
                        [u, [s, "Coc Coc"]],
                        [/dolfin\/([\w\.]+)/i],
                        [u, [s, "Dolphin"]],
                        [/coast\/([\w\.]+)/i],
                        [u, [s, "Opera Coast"]],
                        [/miuibrowser\/([\w\.]+)/i],
                        [u, [s, "MIUI Browser"]],
                        [/fxios\/([-\w\.]+)/i],
                        [u, [s, "Firefox"]],
                        [/\bqihu|(qi?ho?o?|360)browser/i],
                        [[s, "360 Browser"]],
                        [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                        [[s, /(.+)/, "$1 Browser"], u],
                        [/(comodo_dragon)\/([\w\.]+)/i],
                        [[s, /_/g, " "], u],
                        [
                            /(electron)\/([\w\.]+) safari/i,
                            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                        ],
                        [s, u],
                        [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
                        [s],
                        [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                        [[s, "Facebook"], u],
                        [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                        [s, u],
                        [/\bgsa\/([\w\.]+) .*safari\//i],
                        [u, [s, "GSA"]],
                        [/headlesschrome(?:\/([\w\.]+)| )/i],
                        [u, [s, "Chrome Headless"]],
                        [/ wv\).+(chrome)\/([\w\.]+)/i],
                        [[s, "Chrome WebView"], u],
                        [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                        [u, [s, "Android Browser"]],
                        [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                        [s, u],
                        [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                        [u, [s, "Mobile Safari"]],
                        [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                        [u, s],
                        [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                        [
                            s,
                            [
                                u,
                                b,
                                {
                                    "1.0": "/8",
                                    1.2: "/1",
                                    1.3: "/3",
                                    "2.0": "/412",
                                    "2.0.2": "/416",
                                    "2.0.3": "/417",
                                    "2.0.4": "/419",
                                    "?": "/",
                                },
                            ],
                        ],
                        [/(webkit|khtml)\/([\w\.]+)/i],
                        [s, u],
                        [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                        [[s, "Netscape"], u],
                        [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                        [u, [s, "Firefox Reality"]],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                            /(firefox)\/([\w\.]+)/i,
                            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                            /(links) \(([\w\.]+)/i,
                        ],
                        [s, u],
                        [/(cobalt)\/([\w\.]+)/i],
                        [s, [u, /master.|lts./, ""]],
                    ],
                    cpu: [
                        [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                        [["architecture", "amd64"]],
                        [/(ia32(?=;))/i],
                        [["architecture", m]],
                        [/((?:i[346]|x)86)[;\)]/i],
                        [["architecture", "ia32"]],
                        [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                        [["architecture", "arm64"]],
                        [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                        [["architecture", "armhf"]],
                        [/windows (ce|mobile); ppc;/i],
                        [["architecture", "arm"]],
                        [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                        [["architecture", /ower/, "", m]],
                        [/(sun4\w)[;\)]/i],
                        [["architecture", "sparc"]],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                        ],
                        [["architecture", m]],
                    ],
                    device: [
                        [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                        [r, [c, "Samsung"], [l, p]],
                        [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                        [r, [c, "Samsung"], [l, d]],
                        [/((ipod|iphone)\d+,\d+)/i],
                        [r, [c, "Apple"], [l, d]],
                        [/(ipad\d+,\d+)/i],
                        [r, [c, "Apple"], [l, p]],
                        [/\((ip(?:hone|od)[\w ]*);/i],
                        [r, [c, "Apple"], [l, d]],
                        [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                        [r, [c, "Apple"], [l, p]],
                        [/(macintosh);/i],
                        [r, [c, "Apple"]],
                        [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                        [r, [c, "Huawei"], [l, p]],
                        [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
                        [r, [c, "Huawei"], [l, d]],
                        [
                            /\b(poco[\w ]+)(?: bui|\))/i,
                            /\b; (\w+) build\/hm\1/i,
                            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                        ],
                        [
                            [r, /_/g, " "],
                            [c, "Xiaomi"],
                            [l, d],
                        ],
                        [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                        [
                            [r, /_/g, " "],
                            [c, "Xiaomi"],
                            [l, p],
                        ],
                        [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                        [r, [c, "OPPO"], [l, d]],
                        [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                        [r, [c, "Vivo"], [l, d]],
                        [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                        [r, [c, "Realme"], [l, d]],
                        [
                            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                            /\bmot(?:orola)?[- ](\w*)/i,
                            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                        ],
                        [r, [c, "Motorola"], [l, d]],
                        [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                        [r, [c, "Motorola"], [l, p]],
                        [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                        [r, [c, "LG"], [l, p]],
                        [
                            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                            /\blg-?([\d\w]+) bui/i,
                        ],
                        [r, [c, "LG"], [l, d]],
                        [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                        [r, [c, "Lenovo"], [l, p]],
                        [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                        [
                            [r, /_/g, " "],
                            [c, "Nokia"],
                            [l, d],
                        ],
                        [/(pixel c)\b/i],
                        [r, [c, "Google"], [l, p]],
                        [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                        [r, [c, "Google"], [l, d]],
                        [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                        [r, [c, "Sony"], [l, d]],
                        [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                        [
                            [r, "Xperia Tablet"],
                            [c, "Sony"],
                            [l, p],
                        ],
                        [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                        [r, [c, "OnePlus"], [l, d]],
                        [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                        [r, [c, "Amazon"], [l, p]],
                        [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                        [
                            [r, /(.+)/g, "Fire Phone $1"],
                            [c, "Amazon"],
                            [l, d],
                        ],
                        [/(playbook);[-\w\),; ]+(rim)/i],
                        [r, c, [l, p]],
                        [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                        [r, [c, "BlackBerry"], [l, d]],
                        [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                        [r, [c, "ASUS"], [l, p]],
                        [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                        [r, [c, "ASUS"], [l, d]],
                        [/(nexus 9)/i],
                        [r, [c, "HTC"], [l, p]],
                        [
                            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                            /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i,
                        ],
                        [c, [r, /_/g, " "], [l, d]],
                        [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                        [r, [c, "Acer"], [l, p]],
                        [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                        [r, [c, "Meizu"], [l, d]],
                        [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                        [r, [c, "Sharp"], [l, d]],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                            /(hp) ([\w ]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft); (lumia[\w ]+)/i,
                            /(lenovo)[-_ ]?([-\w]+)/i,
                            /(jolla)/i,
                            /(oppo) ?([\w ]+) bui/i,
                        ],
                        [c, r, [l, d]],
                        [
                            /(archos) (gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /(nook)[\w ]+build\/(\w+)/i,
                            /(dell) (strea[kpr\d ]*[\dko])/i,
                            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                            /(trinity)[- ]*(t\d{3}) bui/i,
                            /(gigaset)[- ]+(q\w{1,9}) bui/i,
                            /(vodafone) ([\w ]+)(?:\)| bui)/i,
                        ],
                        [c, r, [l, p]],
                        [/(surface duo)/i],
                        [r, [c, "Microsoft"], [l, p]],
                        [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                        [r, [c, "Fairphone"], [l, d]],
                        [/(u304aa)/i],
                        [r, [c, "AT&T"], [l, d]],
                        [/\bsie-(\w*)/i],
                        [r, [c, "Siemens"], [l, d]],
                        [/\b(rct\w+) b/i],
                        [r, [c, "RCA"], [l, p]],
                        [/\b(venue[\d ]{2,7}) b/i],
                        [r, [c, "Dell"], [l, p]],
                        [/\b(q(?:mv|ta)\w+) b/i],
                        [r, [c, "Verizon"], [l, p]],
                        [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                        [r, [c, "Barnes & Noble"], [l, p]],
                        [/\b(tm\d{3}\w+) b/i],
                        [r, [c, "NuVision"], [l, p]],
                        [/\b(k88) b/i],
                        [r, [c, "ZTE"], [l, p]],
                        [/\b(nx\d{3}j) b/i],
                        [r, [c, "ZTE"], [l, d]],
                        [/\b(gen\d{3}) b.+49h/i],
                        [r, [c, "Swiss"], [l, d]],
                        [/\b(zur\d{3}) b/i],
                        [r, [c, "Swiss"], [l, p]],
                        [/\b((zeki)?tb.*\b) b/i],
                        [r, [c, "Zeki"], [l, p]],
                        [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                        [[c, "Dragon Touch"], r, [l, p]],
                        [/\b(ns-?\w{0,9}) b/i],
                        [r, [c, "Insignia"], [l, p]],
                        [/\b((nxa|next)-?\w{0,9}) b/i],
                        [r, [c, "NextBook"], [l, p]],
                        [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                        [[c, "Voice"], r, [l, d]],
                        [/\b(lvtel\-)?(v1[12]) b/i],
                        [[c, "LvTel"], r, [l, d]],
                        [/\b(ph-1) /i],
                        [r, [c, "Essential"], [l, d]],
                        [/\b(v(100md|700na|7011|917g).*\b) b/i],
                        [r, [c, "Envizen"], [l, p]],
                        [/\b(trio[-\w\. ]+) b/i],
                        [r, [c, "MachSpeed"], [l, p]],
                        [/\btu_(1491) b/i],
                        [r, [c, "Rotor"], [l, p]],
                        [/(shield[\w ]+) b/i],
                        [r, [c, "Nvidia"], [l, p]],
                        [/(sprint) (\w+)/i],
                        [c, r, [l, d]],
                        [/(kin\.[onetw]{3})/i],
                        [
                            [r, /\./g, " "],
                            [c, "Microsoft"],
                            [l, d],
                        ],
                        [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                        [r, [c, "Zebra"], [l, p]],
                        [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                        [r, [c, "Zebra"], [l, d]],
                        [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                        [c, r, [l, "console"]],
                        [/droid.+; (shield) bui/i],
                        [r, [c, "Nvidia"], [l, "console"]],
                        [/(playstation [345portablevi]+)/i],
                        [r, [c, "Sony"], [l, "console"]],
                        [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                        [r, [c, "Microsoft"], [l, "console"]],
                        [/smart-tv.+(samsung)/i],
                        [c, [l, h]],
                        [/hbbtv.+maple;(\d+)/i],
                        [
                            [r, /^/, "SmartTV"],
                            [c, "Samsung"],
                            [l, h],
                        ],
                        [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                        [
                            [c, "LG"],
                            [l, h],
                        ],
                        [/(apple) ?tv/i],
                        [c, [r, "Apple TV"], [l, h]],
                        [/crkey/i],
                        [
                            [r, "Chromecast"],
                            [c, "Google"],
                            [l, h],
                        ],
                        [/droid.+aft(\w)( bui|\))/i],
                        [r, [c, "Amazon"], [l, h]],
                        [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                        [r, [c, "Sharp"], [l, h]],
                        [/(bravia[\w ]+)( bui|\))/i],
                        [r, [c, "Sony"], [l, h]],
                        [/(mitv-\w{5}) bui/i],
                        [r, [c, "Xiaomi"], [l, h]],
                        [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],
                        [
                            [c, x],
                            [r, x],
                            [l, h],
                        ],
                        [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                        [[l, h]],
                        [/((pebble))app/i],
                        [c, r, [l, "wearable"]],
                        [/droid.+; (glass) \d/i],
                        [r, [c, "Google"], [l, "wearable"]],
                        [/droid.+; (wt63?0{2,3})\)/i],
                        [r, [c, "Zebra"], [l, "wearable"]],
                        [/(quest( 2)?)/i],
                        [r, [c, "Facebook"], [l, "wearable"]],
                        [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                        [c, [l, "embedded"]],
                        [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                        [r, [l, d]],
                        [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                        [r, [l, p]],
                        [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                        [[l, p]],
                        [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                        [[l, d]],
                        [/(android[-\w\. ]{0,9});.+buil/i],
                        [r, [c, "Generic"]],
                    ],
                    engine: [
                        [/windows.+ edge\/([\w\.]+)/i],
                        [u, [s, "EdgeHTML"]],
                        [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                        [u, [s, "Blink"]],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                            /(icab)[\/ ]([23]\.[\d\.]+)/i,
                        ],
                        [s, u],
                        [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                        [u, s],
                    ],
                    os: [
                        [/microsoft (windows) (vista|xp)/i],
                        [s, u],
                        [
                            /(windows) nt 6\.2; (arm)/i,
                            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                        ],
                        [s, [u, b, w]],
                        [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                        [
                            [s, "Windows"],
                            [u, b, w],
                        ],
                        [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                        [
                            [u, /_/g, "."],
                            [s, "iOS"],
                        ],
                        [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                        [
                            [s, "Mac OS"],
                            [u, /_/g, "."],
                        ],
                        [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                        [u, s],
                        [
                            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/ ]([\w\.]+)/i,
                            /\((series40);/i,
                        ],
                        [s, u],
                        [/\(bb(10);/i],
                        [u, [s, "BlackBerry"]],
                        [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                        [u, [s, "Symbian"]],
                        [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                        [u, [s, "Firefox OS"]],
                        [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                        [u, [s, "webOS"]],
                        [/crkey\/([\d\.]+)/i],
                        [u, [s, "Chromecast"]],
                        [/(cros) [\w]+ ([\w\.]+\w)/i],
                        [[s, "Chromium OS"], u],
                        [
                            /(nintendo|playstation) ([wids345portablevuch]+)/i,
                            /(xbox); +xbox ([^\);]+)/i,
                            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                            /(mint)[\/\(\) ]?(\w*)/i,
                            /(mageia|vectorlinux)[; ]/i,
                            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                            /(hurd|linux) ?([\w\.]*)/i,
                            /(gnu) ?([\w\.]*)/i,
                            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku) (\w+)/i,
                        ],
                        [s, u],
                        [/(sunos) ?([\w\.\d]*)/i],
                        [[s, "Solaris"], u],
                        [
                            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
                            /(unix) ?([\w\.]*)/i,
                        ],
                        [s, u],
                    ],
                },
                D = function (e, t) {
                    if (("object" == typeof e && ((t = e), (e = void 0)), !(this instanceof D))) return new D(e, t).getResult();
                    var o = e || (void 0 !== a && a.navigator && a.navigator.userAgent ? a.navigator.userAgent : ""),
                        n = t
                            ? (function (e, t) {
                                  var o = {};
                                  for (var n in e) t[n] && t[n].length % 2 == 0 ? (o[n] = t[n].concat(e[n])) : (o[n] = e[n]);
                                  return o;
                              })(v, t)
                            : v;
                    return (
                        (this.getBrowser = function () {
                            var e,
                                t = {};
                            return (
                                (t[s] = void 0),
                                (t[u] = void 0),
                                y.call(t, o, n.browser),
                                (t.major = "string" == typeof (e = t.version) ? e.replace(/[^\d\.]/g, "").split(".")[0] : void 0),
                                t
                            );
                        }),
                        (this.getCPU = function () {
                            var e = { architecture: void 0 };
                            return (y.call(e, o, n.cpu), e);
                        }),
                        (this.getDevice = function () {
                            var e = { vendor: void 0, model: void 0, type: void 0 };
                            return (y.call(e, o, n.device), e);
                        }),
                        (this.getEngine = function () {
                            var e = { name: void 0, version: void 0 };
                            return (y.call(e, o, n.engine), e);
                        }),
                        (this.getOS = function () {
                            var e = { name: void 0, version: void 0 };
                            return (y.call(e, o, n.os), e);
                        }),
                        (this.getResult = function () {
                            return {
                                ua: this.getUA(),
                                browser: this.getBrowser(),
                                engine: this.getEngine(),
                                os: this.getOS(),
                                device: this.getDevice(),
                                cpu: this.getCPU(),
                            };
                        }),
                        (this.getUA = function () {
                            return o;
                        }),
                        (this.setUA = function (e) {
                            return ((o = "string" == typeof e && e.length > 350 ? x(e, 350) : e), this);
                        }),
                        this.setUA(o),
                        this
                    );
                };
            ((D.VERSION = "0.7.33"),
                (D.BROWSER = g([s, u, "major"])),
                (D.CPU = g(["architecture"])),
                (D.DEVICE = g([r, c, l, "console", d, h, p, "wearable", "embedded"])),
                (D.ENGINE = D.OS = g([s, u])),
                void 0 !== t
                    ? (void 0 !== e && e.exports && (t = e.exports = D), (t.UAParser = D))
                    : o(414)
                      ? void 0 ===
                            (n = function () {
                                return D;
                            }.call(t, o, t, e)) || (e.exports = n)
                      : void 0 !== a && (a.UAParser = D));
            var A = void 0 !== a && (a.jQuery || a.Zepto);
            if (A && !A.ua) {
                var C = new D();
                ((A.ua = C.getResult()),
                    (A.ua.get = function () {
                        return C.getUA();
                    }),
                    (A.ua.set = function (e) {
                        C.setUA(e);
                        var t = C.getResult();
                        for (var o in t) A.ua[o] = t[o];
                    }));
            }
        })("object" == typeof window ? window : this);
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(29),
            a = o(35),
            i = o(46),
            r = TypeError;
        e.exports = function (e, t) {
            var o, s;
            if ("string" === t && a((o = e.toString)) && !i((s = n(o, e)))) return s;
            if (a((o = e.valueOf)) && !i((s = n(o, e)))) return s;
            if ("string" !== t && a((o = e.toString)) && !i((s = n(o, e)))) return s;
            throw new r("Can't convert object to primitive value");
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(110),
            a = o(27),
            i = o(243),
            r = o(404),
            s = o(37),
            l = a([].concat);
        e.exports =
            n("Reflect", "ownKeys") ||
            function (e) {
                var t = i.f(s(e)),
                    o = r.f;
                return o ? l(t, o(e)) : t;
            };
    },
    function (e, t, o) {
        "use strict";
        var n = Math.ceil,
            a = Math.floor;
        e.exports =
            Math.trunc ||
            function (e) {
                var t = +e;
                return (t > 0 ? a : n)(t);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(49),
            a = o(400),
            i = o(88),
            r = o(37),
            s = o(184),
            l = o(405);
        t.f =
            n && !a
                ? Object.defineProperties
                : function (e, t) {
                      r(e);
                      for (var o, n = s(t), a = l(t), c = a.length, u = 0; c > u; ) i.f(e, (o = a[u++]), n[o]);
                      return e;
                  };
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r = o(25),
            s = o(74),
            l = o(245),
            c = o(23),
            u = o(29),
            d = o(79),
            p = o(175),
            h = o(137),
            g = o(260),
            f = o(65),
            m = o(35),
            x = o(46),
            y = o(146),
            b = o(342),
            w = o(409).set,
            v = o(623),
            D = o(626),
            A = o(304),
            C = o(412),
            E = o(80),
            S = o(186),
            k = o(201),
            _ = o(202),
            T = k.CONSTRUCTOR,
            P = k.REJECTION_EVENT,
            F = k.SUBCLASSING,
            R = E.getterFor("Promise"),
            I = E.set,
            G = S && S.prototype,
            O = S,
            L = G,
            B = c.TypeError,
            N = c.document,
            M = c.process,
            U = _.f,
            W = U,
            j = !!(N && N.createEvent && c.dispatchEvent),
            z = function (e) {
                var t;
                return !(!x(e) || !m((t = e.then))) && t;
            },
            V = function (e, t) {
                var o,
                    n,
                    a,
                    i = t.value,
                    r = 1 === t.state,
                    s = r ? e.ok : e.fail,
                    l = e.resolve,
                    c = e.reject,
                    d = e.domain;
                try {
                    s
                        ? (r || (2 === t.rejection && Z(t), (t.rejection = 1)),
                          !0 === s ? (o = i) : (d && d.enter(), (o = s(i)), d && (d.exit(), (a = !0))),
                          o === e.promise ? c(new B("Promise-chain cycle")) : (n = z(o)) ? u(n, o, l, c) : l(o))
                        : c(i);
                } catch (e) {
                    (d && !a && d.exit(), c(e));
                }
            },
            Y = function (e, t) {
                e.notified ||
                    ((e.notified = !0),
                    v(function () {
                        for (var o, n = e.reactions; (o = n.get()); ) V(o, e);
                        ((e.notified = !1), t && !e.rejection && q(e));
                    }));
            },
            H = function (e, t, o) {
                var n, a;
                (j
                    ? (((n = N.createEvent("Event")).promise = t), (n.reason = o), n.initEvent(e, !1, !0), c.dispatchEvent(n))
                    : (n = { promise: t, reason: o }),
                    !P && (a = c["on" + e]) ? a(n) : "unhandledrejection" === e && D("Unhandled promise rejection", o));
            },
            q = function (e) {
                u(w, c, function () {
                    var t,
                        o = e.facade,
                        n = e.value;
                    if (
                        K(e) &&
                        ((t = A(function () {
                            l ? M.emit("unhandledRejection", n, o) : H("unhandledrejection", o, n);
                        })),
                        (e.rejection = l || K(e) ? 2 : 1),
                        t.error)
                    )
                        throw t.value;
                });
            },
            K = function (e) {
                return 1 !== e.rejection && !e.parent;
            },
            Z = function (e) {
                u(w, c, function () {
                    var t = e.facade;
                    l ? M.emit("rejectionHandled", t) : H("rejectionhandled", t, e.value);
                });
            },
            J = function (e, t, o) {
                return function (n) {
                    e(t, n, o);
                };
            },
            X = function (e, t, o) {
                e.done || ((e.done = !0), o && (e = o), (e.value = t), (e.state = 2), Y(e, !0));
            },
            Q = function (e, t, o) {
                if (!e.done) {
                    ((e.done = !0), o && (e = o));
                    try {
                        if (e.facade === t) throw new B("Promise can't be resolved itself");
                        var n = z(t);
                        n
                            ? v(function () {
                                  var o = { done: !1 };
                                  try {
                                      u(n, t, J(Q, o, e), J(X, o, e));
                                  } catch (t) {
                                      X(o, t, e);
                                  }
                              })
                            : ((e.value = t), (e.state = 1), Y(e, !1));
                    } catch (t) {
                        X({ done: !1 }, t, e);
                    }
                }
            };
        if (
            T &&
            ((L = (O = function (e) {
                (y(this, L), f(e), u(n, this));
                var t = R(this);
                try {
                    e(J(Q, t), J(X, t));
                } catch (e) {
                    X(t, e);
                }
            }).prototype),
            ((n = function (e) {
                I(this, { type: "Promise", done: !1, notified: !1, parent: !1, reactions: new C(), rejection: !1, state: 0, value: null });
            }).prototype = d(L, "then", function (e, t) {
                var o = R(this),
                    n = U(b(this, O));
                return (
                    (o.parent = !0),
                    (n.ok = !m(e) || e),
                    (n.fail = m(t) && t),
                    (n.domain = l ? M.domain : void 0),
                    0 === o.state
                        ? o.reactions.add(n)
                        : v(function () {
                              V(n, o);
                          }),
                    n.promise
                );
            })),
            (a = function () {
                var e = new n(),
                    t = R(e);
                ((this.promise = e), (this.resolve = J(Q, t)), (this.reject = J(X, t)));
            }),
            (_.f = U =
                function (e) {
                    return e === O || void 0 === e ? new a(e) : W(e);
                }),
            !s && m(S) && G !== Object.prototype)
        ) {
            ((i = G.then),
                F ||
                    d(
                        G,
                        "then",
                        function (e, t) {
                            var o = this;
                            return new O(function (e, t) {
                                u(i, o, e, t);
                            }).then(e, t);
                        },
                        { unsafe: !0 }
                    ));
            try {
                delete G.constructor;
            } catch (e) {}
            p && p(G, L);
        }
        (r({ global: !0, constructor: !0, wrap: !0, forced: T }, { Promise: O }), h(O, "Promise", !1, !0), g("Promise"));
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(65);
        e.exports = function (e, t, o) {
            try {
                return n(a(Object.getOwnPropertyDescriptor(e, t)[o]));
            } catch (e) {}
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(621),
            a = String,
            i = TypeError;
        e.exports = function (e) {
            if (n(e)) return e;
            throw new i("Can't set " + a(e) + " as a prototype");
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(46);
        e.exports = function (e) {
            return n(e) || null === e;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = {};
        ((n[o(43)("toStringTag")] = "z"), (e.exports = "[object z]" === String(n)));
    },
    function (e, t, o) {
        "use strict";
        var n,
            a,
            i,
            r,
            s,
            l = o(23),
            c = o(411),
            u = o(124),
            d = o(409).set,
            p = o(412),
            h = o(410),
            g = o(624),
            f = o(625),
            m = o(245),
            x = l.MutationObserver || l.WebKitMutationObserver,
            y = l.document,
            b = l.process,
            w = l.Promise,
            v = c("queueMicrotask");
        if (!v) {
            var D = new p(),
                A = function () {
                    var e, t;
                    for (m && (e = b.domain) && e.exit(); (t = D.get()); )
                        try {
                            t();
                        } catch (e) {
                            throw (D.head && n(), e);
                        }
                    e && e.enter();
                };
            (h || m || f || !x || !y
                ? !g && w && w.resolve
                    ? (((r = w.resolve(void 0)).constructor = w),
                      (s = u(r.then, r)),
                      (n = function () {
                          s(A);
                      }))
                    : m
                      ? (n = function () {
                            b.nextTick(A);
                        })
                      : ((d = u(d, l)),
                        (n = function () {
                            d(A);
                        }))
                : ((a = !0),
                  (i = y.createTextNode("")),
                  new x(A).observe(i, { characterData: !0 }),
                  (n = function () {
                      i.data = a = !a;
                  })),
                (v = function (e) {
                    (D.head || n(), D.add(e));
                }));
        }
        e.exports = v;
    },
    function (e, t, o) {
        "use strict";
        var n = o(129);
        e.exports = /ipad|iphone|ipod/i.test(n) && "undefined" != typeof Pebble;
    },
    function (e, t, o) {
        "use strict";
        var n = o(129);
        e.exports = /web0s(?!.*chrome)/i.test(n);
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e, t) {
            try {
                1 === arguments.length ? console.error(e) : console.error(e, t);
            } catch (e) {}
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(65),
            r = o(202),
            s = o(304),
            l = o(121);
        n(
            { target: "Promise", stat: !0, forced: o(413) },
            {
                all: function (e) {
                    var t = this,
                        o = r.f(t),
                        n = o.resolve,
                        c = o.reject,
                        u = s(function () {
                            var o = i(t.resolve),
                                r = [],
                                s = 0,
                                u = 1;
                            (l(e, function (e) {
                                var i = s++,
                                    l = !1;
                                (u++,
                                    a(o, t, e).then(function (e) {
                                        l || ((l = !0), (r[i] = e), --u || n(r));
                                    }, c));
                            }),
                                --u || n(r));
                        });
                    return (u.error && c(u.value), o.promise);
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(74),
            i = o(201).CONSTRUCTOR,
            r = o(186),
            s = o(110),
            l = o(35),
            c = o(79),
            u = r && r.prototype;
        if (
            (n(
                { target: "Promise", proto: !0, forced: i, real: !0 },
                {
                    catch: function (e) {
                        return this.then(void 0, e);
                    },
                }
            ),
            !a && l(r))
        ) {
            var d = s("Promise").prototype.catch;
            u.catch !== d && c(u, "catch", d, { unsafe: !0 });
        }
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(65),
            r = o(202),
            s = o(304),
            l = o(121);
        n(
            { target: "Promise", stat: !0, forced: o(413) },
            {
                race: function (e) {
                    var t = this,
                        o = r.f(t),
                        n = o.reject,
                        c = s(function () {
                            var r = i(t.resolve);
                            l(e, function (e) {
                                a(r, t, e).then(o.resolve, n);
                            });
                        });
                    return (c.error && n(c.value), o.promise);
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(202);
        n(
            { target: "Promise", stat: !0, forced: o(201).CONSTRUCTOR },
            {
                reject: function (e) {
                    var t = a.f(this);
                    return ((0, t.reject)(e), t.promise);
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(110),
            i = o(74),
            r = o(186),
            s = o(201).CONSTRUCTOR,
            l = o(453),
            c = a("Promise"),
            u = i && !s;
        n(
            { target: "Promise", stat: !0, forced: i || s },
            {
                resolve: function (e) {
                    return l(u && this === c ? r : this, e);
                },
            }
        );
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
        e.exports = require("child_process");
    },
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(21);
        e.exports = !n(function () {
            function e() {}
            return ((e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype);
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(348),
            i = o(35),
            r = o(116),
            s = o(62),
            l = n([].push);
        e.exports = function (e) {
            if (i(e)) return e;
            if (a(e)) {
                for (var t = e.length, o = [], n = 0; n < t; n++) {
                    var c = e[n];
                    "string" == typeof c ? l(o, c) : ("number" != typeof c && "Number" !== r(c) && "String" !== r(c)) || l(o, s(c));
                }
                var u = o.length,
                    d = !0;
                return function (e, t) {
                    if (d) return ((d = !1), t);
                    if (a(this)) return t;
                    for (var n = 0; n < u; n++) if (o[n] === e) return t;
                };
            }
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = o(93),
            i = Math.floor,
            r = n("".charAt),
            s = n("".replace),
            l = n("".slice),
            c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
            u = /\$([$&'`]|\d{1,2})/g;
        e.exports = function (e, t, o, n, d, p) {
            var h = o + e.length,
                g = n.length,
                f = u;
            return (
                void 0 !== d && ((d = a(d)), (f = c)),
                s(p, f, function (a, s) {
                    var c;
                    switch (r(s, 0)) {
                        case "$":
                            return "$";
                        case "&":
                            return e;
                        case "`":
                            return l(t, 0, o);
                        case "'":
                            return l(t, h);
                        case "<":
                            c = d[l(s, 1, -1)];
                            break;
                        default:
                            var u = +s;
                            if (0 === u) return a;
                            if (u > g) {
                                var p = i(u / 10);
                                return 0 === p ? a : p <= g ? (void 0 === n[p - 1] ? r(s, 1) : n[p - 1] + r(s, 1)) : a;
                            }
                            c = n[u - 1];
                    }
                    return void 0 === c ? "" : c;
                })
            );
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(23),
            i = o(146),
            r = o(37),
            s = o(35),
            l = o(208),
            c = o(120),
            u = o(420),
            d = o(21),
            p = o(61),
            h = o(43),
            g = o(251).IteratorPrototype,
            f = o(49),
            m = o(74),
            x = h("toStringTag"),
            y = TypeError,
            b = a.Iterator,
            w =
                m ||
                !s(b) ||
                b.prototype !== g ||
                !d(function () {
                    b({});
                }),
            v = function () {
                if ((i(this, g), l(this) === g)) throw new y("Abstract class Iterator not directly constructable");
            },
            D = function (e, t) {
                f
                    ? c(g, e, {
                          configurable: !0,
                          get: function () {
                              return t;
                          },
                          set: function (t) {
                              if ((r(this), this === g)) throw new y("You can't redefine this property");
                              p(this, e) ? (this[e] = t) : u(this, e, t);
                          },
                      })
                    : (g[e] = t);
            };
        (p(g, x) || D(x, "Iterator"),
            (!w && p(g, "constructor") && g.constructor !== Object) || D("constructor", v),
            (v.prototype = g),
            n({ global: !0, constructor: !0, forced: w }, { Iterator: v }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(121),
            r = o(65),
            s = o(37),
            l = o(143),
            c = o(102),
            u = o(149)("every", TypeError);
        n(
            { target: "Iterator", proto: !0, real: !0, forced: u },
            {
                every: function (e) {
                    s(this);
                    try {
                        r(e);
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    if (u) return a(u, this, e);
                    var t = l(this),
                        o = 0;
                    return !i(
                        t,
                        function (t, n) {
                            if (!e(t, o++)) return n();
                        },
                        { IS_RECORD: !0, INTERRUPTED: !0 }
                    ).stopped;
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(121),
            r = o(65),
            s = o(37),
            l = o(143),
            c = o(102),
            u = o(149)("forEach", TypeError);
        n(
            { target: "Iterator", proto: !0, real: !0, forced: u },
            {
                forEach: function (e) {
                    s(this);
                    try {
                        r(e);
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    if (u) return a(u, this, e);
                    var t = l(this),
                        o = 0;
                    i(
                        t,
                        function (t) {
                            e(t, o++);
                        },
                        { IS_RECORD: !0 }
                    );
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(349).forEach,
            a = o(350)("forEach");
        e.exports = a
            ? [].forEach
            : function (e) {
                  return n(this, e, arguments.length > 1 ? arguments[1] : void 0);
              };
    },
    function (e, t, o) {
        "use strict";
        var n = o(348),
            a = o(302),
            i = o(46),
            r = o(43)("species"),
            s = Array;
        e.exports = function (e) {
            var t;
            return (
                n(e) && ((t = e.constructor), ((a(t) && (t === s || n(t.prototype))) || (i(t) && null === (t = t[r]))) && (t = void 0)),
                void 0 === t ? s : t
            );
        };
    },
    function (e, t, o) {
        "use strict";
        o(674);
        var n,
            a = o(25),
            i = o(49),
            r = o(423),
            s = o(23),
            l = o(124),
            c = o(27),
            u = o(79),
            d = o(120),
            p = o(146),
            h = o(61),
            g = o(415),
            f = o(675),
            m = o(157),
            x = o(309).codeAt,
            y = o(676),
            b = o(62),
            w = o(137),
            v = o(303),
            D = o(424),
            A = o(80),
            C = A.set,
            E = A.getterFor("URL"),
            S = D.URLSearchParams,
            k = D.getState,
            _ = s.URL,
            T = s.TypeError,
            P = s.parseInt,
            F = Math.floor,
            R = Math.pow,
            I = c("".charAt),
            G = c(/./.exec),
            O = c([].join),
            L = c((1).toString),
            B = c([].pop),
            N = c([].push),
            M = c("".replace),
            U = c([].shift),
            W = c("".split),
            j = c("".slice),
            z = c("".toLowerCase),
            V = c([].unshift),
            Y = /[a-z]/i,
            H = /[\d+-.a-z]/i,
            q = /\d/,
            K = /^0x/i,
            Z = /^[0-7]+$/,
            J = /^\d+$/,
            X = /^[\da-f]+$/i,
            Q = /[\0\t\n\r #%/:<>?@[\\\]^|]/,
            $ = /[\0\t\n\r #/:<>?@[\\\]^|]/,
            ee = /^[\u0000-\u0020]+/,
            te = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/,
            oe = /[\t\n\r]/g,
            ne = function (e) {
                var t, o, n, a;
                if ("number" == typeof e) {
                    for (t = [], o = 0; o < 4; o++) (V(t, e % 256), (e = F(e / 256)));
                    return O(t, ".");
                }
                if ("object" == typeof e) {
                    for (
                        t = "",
                            n = (function (e) {
                                for (var t = null, o = 1, n = null, a = 0, i = 0; i < 8; i++)
                                    0 !== e[i] ? (a > o && ((t = n), (o = a)), (n = null), (a = 0)) : (null === n && (n = i), ++a);
                                return a > o ? n : t;
                            })(e),
                            o = 0;
                        o < 8;
                        o++
                    )
                        (a && 0 === e[o]) ||
                            (a && (a = !1), n === o ? ((t += o ? ":" : "::"), (a = !0)) : ((t += L(e[o], 16)), o < 7 && (t += ":")));
                    return "[" + t + "]";
                }
                return e;
            },
            ae = {},
            ie = g({}, ae, { " ": 1, '"': 1, "<": 1, ">": 1, "`": 1 }),
            re = g({}, ie, { "#": 1, "?": 1, "{": 1, "}": 1 }),
            se = g({}, re, { "/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1 }),
            le = function (e, t) {
                var o = x(e, 0);
                return o > 32 && o < 127 && !h(t, e) ? e : encodeURIComponent(e);
            },
            ce = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 },
            ue = function (e, t) {
                var o;
                return 2 === e.length && G(Y, I(e, 0)) && (":" === (o = I(e, 1)) || (!t && "|" === o));
            },
            de = function (e) {
                var t;
                return e.length > 1 && ue(j(e, 0, 2)) && (2 === e.length || "/" === (t = I(e, 2)) || "\\" === t || "?" === t || "#" === t);
            },
            pe = function (e) {
                return "." === e || "%2e" === z(e);
            },
            he = {},
            ge = {},
            fe = {},
            me = {},
            xe = {},
            ye = {},
            be = {},
            we = {},
            ve = {},
            De = {},
            Ae = {},
            Ce = {},
            Ee = {},
            Se = {},
            ke = {},
            _e = {},
            Te = {},
            Pe = {},
            Fe = {},
            Re = {},
            Ie = {},
            Ge = function (e, t, o) {
                var n,
                    a,
                    i,
                    r = b(e);
                if (t) {
                    if ((a = this.parse(r))) throw new T(a);
                    this.searchParams = null;
                } else {
                    if ((void 0 !== o && (n = new Ge(o, !0)), (a = this.parse(r, null, n)))) throw new T(a);
                    ((i = k(new S())).bindURL(this), (this.searchParams = i));
                }
            };
        Ge.prototype = {
            type: "URL",
            parse: function (e, t, o) {
                var a,
                    i,
                    r,
                    s,
                    l,
                    c = this,
                    u = t || he,
                    d = 0,
                    p = "",
                    g = !1,
                    x = !1,
                    y = !1;
                for (
                    e = b(e),
                        t ||
                            ((c.scheme = ""),
                            (c.username = ""),
                            (c.password = ""),
                            (c.host = null),
                            (c.port = null),
                            (c.path = []),
                            (c.query = null),
                            (c.fragment = null),
                            (c.cannotBeABaseURL = !1),
                            (e = M(e, ee, "")),
                            (e = M(e, te, "$1"))),
                        e = M(e, oe, ""),
                        a = f(e);
                    d <= a.length;

                ) {
                    switch (((i = a[d]), u)) {
                        case he:
                            if (!i || !G(Y, i)) {
                                if (t) return "Invalid scheme";
                                u = fe;
                                continue;
                            }
                            ((p += z(i)), (u = ge));
                            break;
                        case ge:
                            if (i && (G(H, i) || "+" === i || "-" === i || "." === i)) p += z(i);
                            else {
                                if (":" !== i) {
                                    if (t) return "Invalid scheme";
                                    ((p = ""), (u = fe), (d = 0));
                                    continue;
                                }
                                if (
                                    t &&
                                    (c.isSpecial() !== h(ce, p) ||
                                        ("file" === p && (c.includesCredentials() || null !== c.port)) ||
                                        ("file" === c.scheme && !c.host))
                                )
                                    return;
                                if (((c.scheme = p), t)) return void (c.isSpecial() && ce[c.scheme] === c.port && (c.port = null));
                                ((p = ""),
                                    "file" === c.scheme
                                        ? (u = Se)
                                        : c.isSpecial() && o && o.scheme === c.scheme
                                          ? (u = me)
                                          : c.isSpecial()
                                            ? (u = we)
                                            : "/" === a[d + 1]
                                              ? ((u = xe), d++)
                                              : ((c.cannotBeABaseURL = !0), N(c.path, ""), (u = Fe)));
                            }
                            break;
                        case fe:
                            if (!o || (o.cannotBeABaseURL && "#" !== i)) return "Invalid scheme";
                            if (o.cannotBeABaseURL && "#" === i) {
                                ((c.scheme = o.scheme),
                                    (c.path = m(o.path)),
                                    (c.query = o.query),
                                    (c.fragment = ""),
                                    (c.cannotBeABaseURL = !0),
                                    (u = Ie));
                                break;
                            }
                            u = "file" === o.scheme ? Se : ye;
                            continue;
                        case me:
                            if ("/" !== i || "/" !== a[d + 1]) {
                                u = ye;
                                continue;
                            }
                            ((u = ve), d++);
                            break;
                        case xe:
                            if ("/" === i) {
                                u = De;
                                break;
                            }
                            u = Pe;
                            continue;
                        case ye:
                            if (((c.scheme = o.scheme), i === n))
                                ((c.username = o.username),
                                    (c.password = o.password),
                                    (c.host = o.host),
                                    (c.port = o.port),
                                    (c.path = m(o.path)),
                                    (c.query = o.query));
                            else if ("/" === i || ("\\" === i && c.isSpecial())) u = be;
                            else if ("?" === i)
                                ((c.username = o.username),
                                    (c.password = o.password),
                                    (c.host = o.host),
                                    (c.port = o.port),
                                    (c.path = m(o.path)),
                                    (c.query = ""),
                                    (u = Re));
                            else {
                                if ("#" !== i) {
                                    ((c.username = o.username),
                                        (c.password = o.password),
                                        (c.host = o.host),
                                        (c.port = o.port),
                                        (c.path = m(o.path)),
                                        c.path.length--,
                                        (u = Pe));
                                    continue;
                                }
                                ((c.username = o.username),
                                    (c.password = o.password),
                                    (c.host = o.host),
                                    (c.port = o.port),
                                    (c.path = m(o.path)),
                                    (c.query = o.query),
                                    (c.fragment = ""),
                                    (u = Ie));
                            }
                            break;
                        case be:
                            if (!c.isSpecial() || ("/" !== i && "\\" !== i)) {
                                if ("/" !== i) {
                                    ((c.username = o.username), (c.password = o.password), (c.host = o.host), (c.port = o.port), (u = Pe));
                                    continue;
                                }
                                u = De;
                            } else u = ve;
                            break;
                        case we:
                            if (((u = ve), "/" !== i || "/" !== I(p, d + 1))) continue;
                            d++;
                            break;
                        case ve:
                            if ("/" !== i && "\\" !== i) {
                                u = De;
                                continue;
                            }
                            break;
                        case De:
                            if ("@" === i) {
                                (g && (p = "%40" + p), (g = !0), (r = f(p)));
                                for (var w = 0; w < r.length; w++) {
                                    var v = r[w];
                                    if (":" !== v || y) {
                                        var D = le(v, se);
                                        y ? (c.password += D) : (c.username += D);
                                    } else y = !0;
                                }
                                p = "";
                            } else if (i === n || "/" === i || "?" === i || "#" === i || ("\\" === i && c.isSpecial())) {
                                if (g && "" === p) return "Invalid authority";
                                ((d -= f(p).length + 1), (p = ""), (u = Ae));
                            } else p += i;
                            break;
                        case Ae:
                        case Ce:
                            if (t && "file" === c.scheme) {
                                u = _e;
                                continue;
                            }
                            if (":" !== i || x) {
                                if (i === n || "/" === i || "?" === i || "#" === i || ("\\" === i && c.isSpecial())) {
                                    if (c.isSpecial() && "" === p) return "Invalid host";
                                    if (t && "" === p && (c.includesCredentials() || null !== c.port)) return;
                                    if ((s = c.parseHost(p))) return s;
                                    if (((p = ""), (u = Te), t)) return;
                                    continue;
                                }
                                ("[" === i ? (x = !0) : "]" === i && (x = !1), (p += i));
                            } else {
                                if ("" === p) return "Invalid host";
                                if ((s = c.parseHost(p))) return s;
                                if (((p = ""), (u = Ee), t === Ce)) return;
                            }
                            break;
                        case Ee:
                            if (!G(q, i)) {
                                if (i === n || "/" === i || "?" === i || "#" === i || ("\\" === i && c.isSpecial()) || t) {
                                    if ("" !== p) {
                                        var A = P(p, 10);
                                        if (A > 65535) return "Invalid port";
                                        ((c.port = c.isSpecial() && A === ce[c.scheme] ? null : A), (p = ""));
                                    }
                                    if (t) return;
                                    u = Te;
                                    continue;
                                }
                                return "Invalid port";
                            }
                            p += i;
                            break;
                        case Se:
                            if (((c.scheme = "file"), "/" === i || "\\" === i)) u = ke;
                            else {
                                if (!o || "file" !== o.scheme) {
                                    u = Pe;
                                    continue;
                                }
                                switch (i) {
                                    case n:
                                        ((c.host = o.host), (c.path = m(o.path)), (c.query = o.query));
                                        break;
                                    case "?":
                                        ((c.host = o.host), (c.path = m(o.path)), (c.query = ""), (u = Re));
                                        break;
                                    case "#":
                                        ((c.host = o.host), (c.path = m(o.path)), (c.query = o.query), (c.fragment = ""), (u = Ie));
                                        break;
                                    default:
                                        (de(O(m(a, d), "")) || ((c.host = o.host), (c.path = m(o.path)), c.shortenPath()), (u = Pe));
                                        continue;
                                }
                            }
                            break;
                        case ke:
                            if ("/" === i || "\\" === i) {
                                u = _e;
                                break;
                            }
                            (o &&
                                "file" === o.scheme &&
                                !de(O(m(a, d), "")) &&
                                (ue(o.path[0], !0) ? N(c.path, o.path[0]) : (c.host = o.host)),
                                (u = Pe));
                            continue;
                        case _e:
                            if (i === n || "/" === i || "\\" === i || "?" === i || "#" === i) {
                                if (!t && ue(p)) u = Pe;
                                else if ("" === p) {
                                    if (((c.host = ""), t)) return;
                                    u = Te;
                                } else {
                                    if ((s = c.parseHost(p))) return s;
                                    if (("localhost" === c.host && (c.host = ""), t)) return;
                                    ((p = ""), (u = Te));
                                }
                                continue;
                            }
                            p += i;
                            break;
                        case Te:
                            if (c.isSpecial()) {
                                if (((u = Pe), "/" !== i && "\\" !== i)) continue;
                            } else if (t || "?" !== i)
                                if (t || "#" !== i) {
                                    if (i !== n && ((u = Pe), "/" !== i)) continue;
                                } else ((c.fragment = ""), (u = Ie));
                            else ((c.query = ""), (u = Re));
                            break;
                        case Pe:
                            if (i === n || "/" === i || ("\\" === i && c.isSpecial()) || (!t && ("?" === i || "#" === i))) {
                                if (
                                    (".." === (l = z((l = p))) || "%2e." === l || ".%2e" === l || "%2e%2e" === l
                                        ? (c.shortenPath(), "/" === i || ("\\" === i && c.isSpecial()) || N(c.path, ""))
                                        : pe(p)
                                          ? "/" === i || ("\\" === i && c.isSpecial()) || N(c.path, "")
                                          : ("file" === c.scheme &&
                                                !c.path.length &&
                                                ue(p) &&
                                                (c.host && (c.host = ""), (p = I(p, 0) + ":")),
                                            N(c.path, p)),
                                    (p = ""),
                                    "file" === c.scheme && (i === n || "?" === i || "#" === i))
                                )
                                    for (; c.path.length > 1 && "" === c.path[0]; ) U(c.path);
                                "?" === i ? ((c.query = ""), (u = Re)) : "#" === i && ((c.fragment = ""), (u = Ie));
                            } else p += le(i, re);
                            break;
                        case Fe:
                            "?" === i
                                ? ((c.query = ""), (u = Re))
                                : "#" === i
                                  ? ((c.fragment = ""), (u = Ie))
                                  : i !== n && (c.path[0] += le(i, ae));
                            break;
                        case Re:
                            t || "#" !== i
                                ? i !== n && ("'" === i && c.isSpecial() ? (c.query += "%27") : (c.query += "#" === i ? "%23" : le(i, ae)))
                                : ((c.fragment = ""), (u = Ie));
                            break;
                        case Ie:
                            i !== n && (c.fragment += le(i, ie));
                    }
                    d++;
                }
            },
            parseHost: function (e) {
                var t, o, n;
                if ("[" === I(e, 0)) {
                    if ("]" !== I(e, e.length - 1)) return "Invalid host";
                    if (
                        !(t = (function (e) {
                            var t,
                                o,
                                n,
                                a,
                                i,
                                r,
                                s,
                                l = [0, 0, 0, 0, 0, 0, 0, 0],
                                c = 0,
                                u = null,
                                d = 0,
                                p = function () {
                                    return I(e, d);
                                };
                            if (":" === p()) {
                                if (":" !== I(e, 1)) return;
                                ((d += 2), (u = ++c));
                            }
                            for (; p(); ) {
                                if (8 === c) return;
                                if (":" !== p()) {
                                    for (t = o = 0; o < 4 && G(X, p()); ) ((t = 16 * t + P(p(), 16)), d++, o++);
                                    if ("." === p()) {
                                        if (0 === o) return;
                                        if (((d -= o), c > 6)) return;
                                        for (n = 0; p(); ) {
                                            if (((a = null), n > 0)) {
                                                if (!("." === p() && n < 4)) return;
                                                d++;
                                            }
                                            if (!G(q, p())) return;
                                            for (; G(q, p()); ) {
                                                if (((i = P(p(), 10)), null === a)) a = i;
                                                else {
                                                    if (0 === a) return;
                                                    a = 10 * a + i;
                                                }
                                                if (a > 255) return;
                                                d++;
                                            }
                                            ((l[c] = 256 * l[c] + a), (2 !== ++n && 4 !== n) || c++);
                                        }
                                        if (4 !== n) return;
                                        break;
                                    }
                                    if (":" === p()) {
                                        if ((d++, !p())) return;
                                    } else if (p()) return;
                                    l[c++] = t;
                                } else {
                                    if (null !== u) return;
                                    (d++, (u = ++c));
                                }
                            }
                            if (null !== u)
                                for (r = c - u, c = 7; 0 !== c && r > 0; ) ((s = l[c]), (l[c--] = l[u + r - 1]), (l[u + --r] = s));
                            else if (8 !== c) return;
                            return l;
                        })(j(e, 1, -1)))
                    )
                        return "Invalid host";
                    this.host = t;
                } else if (this.isSpecial()) {
                    if (((e = y(e)), G(Q, e))) return "Invalid host";
                    if (
                        null ===
                        (t = (function (e) {
                            var t,
                                o,
                                n,
                                a,
                                i,
                                r,
                                s,
                                l = W(e, ".");
                            if ((l.length && "" === l[l.length - 1] && l.length--, (t = l.length) > 4)) return e;
                            for (o = [], n = 0; n < t; n++) {
                                if ("" === (a = l[n])) return e;
                                if (
                                    ((i = 10),
                                    a.length > 1 && "0" === I(a, 0) && ((i = G(K, a) ? 16 : 8), (a = j(a, 8 === i ? 1 : 2))),
                                    "" === a)
                                )
                                    r = 0;
                                else {
                                    if (!G(10 === i ? J : 8 === i ? Z : X, a)) return e;
                                    r = P(a, i);
                                }
                                N(o, r);
                            }
                            for (n = 0; n < t; n++)
                                if (((r = o[n]), n === t - 1)) {
                                    if (r >= R(256, 5 - t)) return null;
                                } else if (r > 255) return null;
                            for (s = B(o), n = 0; n < o.length; n++) s += o[n] * R(256, 3 - n);
                            return s;
                        })(e))
                    )
                        return "Invalid host";
                    this.host = t;
                } else {
                    if (G($, e)) return "Invalid host";
                    for (t = "", o = f(e), n = 0; n < o.length; n++) t += le(o[n], ae);
                    this.host = t;
                }
            },
            cannotHaveUsernamePasswordPort: function () {
                return !this.host || this.cannotBeABaseURL || "file" === this.scheme;
            },
            includesCredentials: function () {
                return "" !== this.username || "" !== this.password;
            },
            isSpecial: function () {
                return h(ce, this.scheme);
            },
            shortenPath: function () {
                var e = this.path,
                    t = e.length;
                !t || ("file" === this.scheme && 1 === t && ue(e[0], !0)) || e.length--;
            },
            serialize: function () {
                var e = this,
                    t = e.scheme,
                    o = e.username,
                    n = e.password,
                    a = e.host,
                    i = e.port,
                    r = e.path,
                    s = e.query,
                    l = e.fragment,
                    c = t + ":";
                return (
                    null !== a
                        ? ((c += "//"),
                          e.includesCredentials() && (c += o + (n ? ":" + n : "") + "@"),
                          (c += ne(a)),
                          null !== i && (c += ":" + i))
                        : "file" === t && (c += "//"),
                    (c += e.cannotBeABaseURL ? r[0] : r.length ? "/" + O(r, "/") : ""),
                    null !== s && (c += "?" + s),
                    null !== l && (c += "#" + l),
                    c
                );
            },
            setHref: function (e) {
                var t = this.parse(e);
                if (t) throw new T(t);
                this.searchParams.update();
            },
            getOrigin: function () {
                var e = this.scheme,
                    t = this.port;
                if ("blob" === e)
                    try {
                        return new Oe(e.path[0]).origin;
                    } catch (e) {
                        return "null";
                    }
                return "file" !== e && this.isSpecial() ? e + "://" + ne(this.host) + (null !== t ? ":" + t : "") : "null";
            },
            getProtocol: function () {
                return this.scheme + ":";
            },
            setProtocol: function (e) {
                this.parse(b(e) + ":", he);
            },
            getUsername: function () {
                return this.username;
            },
            setUsername: function (e) {
                var t = f(b(e));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.username = "";
                    for (var o = 0; o < t.length; o++) this.username += le(t[o], se);
                }
            },
            getPassword: function () {
                return this.password;
            },
            setPassword: function (e) {
                var t = f(b(e));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.password = "";
                    for (var o = 0; o < t.length; o++) this.password += le(t[o], se);
                }
            },
            getHost: function () {
                var e = this.host,
                    t = this.port;
                return null === e ? "" : null === t ? ne(e) : ne(e) + ":" + t;
            },
            setHost: function (e) {
                this.cannotBeABaseURL || this.parse(e, Ae);
            },
            getHostname: function () {
                var e = this.host;
                return null === e ? "" : ne(e);
            },
            setHostname: function (e) {
                this.cannotBeABaseURL || this.parse(e, Ce);
            },
            getPort: function () {
                var e = this.port;
                return null === e ? "" : b(e);
            },
            setPort: function (e) {
                this.cannotHaveUsernamePasswordPort() || ("" === (e = b(e)) ? (this.port = null) : this.parse(e, Ee));
            },
            getPathname: function () {
                var e = this.path;
                return this.cannotBeABaseURL ? e[0] : e.length ? "/" + O(e, "/") : "";
            },
            setPathname: function (e) {
                this.cannotBeABaseURL || ((this.path = []), this.parse(e, Te));
            },
            getSearch: function () {
                var e = this.query;
                return e ? "?" + e : "";
            },
            setSearch: function (e) {
                ("" === (e = b(e)) ? (this.query = null) : ("?" === I(e, 0) && (e = j(e, 1)), (this.query = ""), this.parse(e, Re)),
                    this.searchParams.update());
            },
            getSearchParams: function () {
                return this.searchParams.facade;
            },
            getHash: function () {
                var e = this.fragment;
                return e ? "#" + e : "";
            },
            setHash: function (e) {
                "" !== (e = b(e)) ? ("#" === I(e, 0) && (e = j(e, 1)), (this.fragment = ""), this.parse(e, Ie)) : (this.fragment = null);
            },
            update: function () {
                this.query = this.searchParams.serialize() || null;
            },
        };
        var Oe = function (e) {
                var t = p(this, Le),
                    o = v(arguments.length, 1) > 1 ? arguments[1] : void 0,
                    n = C(t, new Ge(e, !1, o));
                i ||
                    ((t.href = n.serialize()),
                    (t.origin = n.getOrigin()),
                    (t.protocol = n.getProtocol()),
                    (t.username = n.getUsername()),
                    (t.password = n.getPassword()),
                    (t.host = n.getHost()),
                    (t.hostname = n.getHostname()),
                    (t.port = n.getPort()),
                    (t.pathname = n.getPathname()),
                    (t.search = n.getSearch()),
                    (t.searchParams = n.getSearchParams()),
                    (t.hash = n.getHash()));
            },
            Le = Oe.prototype,
            Be = function (e, t) {
                return {
                    get: function () {
                        return E(this)[e]();
                    },
                    set:
                        t &&
                        function (e) {
                            return E(this)[t](e);
                        },
                    configurable: !0,
                    enumerable: !0,
                };
            };
        if (
            (i &&
                (d(Le, "href", Be("serialize", "setHref")),
                d(Le, "origin", Be("getOrigin")),
                d(Le, "protocol", Be("getProtocol", "setProtocol")),
                d(Le, "username", Be("getUsername", "setUsername")),
                d(Le, "password", Be("getPassword", "setPassword")),
                d(Le, "host", Be("getHost", "setHost")),
                d(Le, "hostname", Be("getHostname", "setHostname")),
                d(Le, "port", Be("getPort", "setPort")),
                d(Le, "pathname", Be("getPathname", "setPathname")),
                d(Le, "search", Be("getSearch", "setSearch")),
                d(Le, "searchParams", Be("getSearchParams")),
                d(Le, "hash", Be("getHash", "setHash"))),
            u(
                Le,
                "toJSON",
                function () {
                    return E(this).serialize();
                },
                { enumerable: !0 }
            ),
            u(
                Le,
                "toString",
                function () {
                    return E(this).serialize();
                },
                { enumerable: !0 }
            ),
            _)
        ) {
            var Ne = _.createObjectURL,
                Me = _.revokeObjectURL;
            (Ne && u(Oe, "createObjectURL", l(Ne, _)), Me && u(Oe, "revokeObjectURL", l(Me, _)));
        }
        (w(Oe, "URL"), a({ global: !0, constructor: !0, forced: !r, sham: !i }, { URL: Oe }));
    },
    function (e, t, o) {
        "use strict";
        var n = o(309).charAt,
            a = o(62),
            i = o(80),
            r = o(418),
            s = o(252),
            l = i.set,
            c = i.getterFor("String Iterator");
        r(
            String,
            "String",
            function (e) {
                l(this, { type: "String Iterator", string: a(e), index: 0 });
            },
            function () {
                var e,
                    t = c(this),
                    o = t.string,
                    a = t.index;
                return a >= o.length ? s(void 0, !0) : ((e = n(o, a)), (t.index += e.length), s(e, !1));
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(124),
            a = o(29),
            i = o(93),
            r = o(323),
            s = o(305),
            l = o(302),
            c = o(101),
            u = o(420),
            d = o(246),
            p = o(204),
            h = Array;
        e.exports = function (e) {
            var t = i(e),
                o = l(this),
                g = arguments.length,
                f = g > 1 ? arguments[1] : void 0,
                m = void 0 !== f;
            m && (f = n(f, g > 2 ? arguments[2] : void 0));
            var x,
                y,
                b,
                w,
                v,
                D,
                A = p(t),
                C = 0;
            if (!A || (this === h && s(A)))
                for (x = c(t), y = o ? new this(x) : h(x); x > C; C++) ((D = m ? f(t[C], C) : t[C]), u(y, C, D));
            else
                for (y = o ? new this() : [], v = (w = d(t, A)).next; !(b = a(v, w)).done; C++)
                    ((D = m ? r(w, f, [b.value, C], !0) : b.value), u(y, C, D));
            return ((y.length = C), y);
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(27),
            a = /[^\0-\u007E]/,
            i = /[.\u3002\uFF0E\uFF61]/g,
            r = "Overflow: input needs wider integers to process",
            s = RangeError,
            l = n(i.exec),
            c = Math.floor,
            u = String.fromCharCode,
            d = n("".charCodeAt),
            p = n([].join),
            h = n([].push),
            g = n("".replace),
            f = n("".split),
            m = n("".toLowerCase),
            x = function (e) {
                return e + 22 + 75 * (e < 26);
            },
            y = function (e, t, o) {
                var n = 0;
                for (e = o ? c(e / 700) : e >> 1, e += c(e / t); e > 455; ) ((e = c(e / 35)), (n += 36));
                return c(n + (36 * e) / (e + 38));
            },
            b = function (e) {
                var t,
                    o,
                    n = [],
                    a = (e = (function (e) {
                        for (var t = [], o = 0, n = e.length; o < n; ) {
                            var a = d(e, o++);
                            if (a >= 55296 && a <= 56319 && o < n) {
                                var i = d(e, o++);
                                56320 == (64512 & i) ? h(t, ((1023 & a) << 10) + (1023 & i) + 65536) : (h(t, a), o--);
                            } else h(t, a);
                        }
                        return t;
                    })(e)).length,
                    i = 128,
                    l = 0,
                    g = 72;
                for (t = 0; t < e.length; t++) (o = e[t]) < 128 && h(n, u(o));
                var f = n.length,
                    m = f;
                for (f && h(n, "-"); m < a; ) {
                    var b = 2147483647;
                    for (t = 0; t < e.length; t++) (o = e[t]) >= i && o < b && (b = o);
                    var w = m + 1;
                    if (b - i > c((2147483647 - l) / w)) throw new s(r);
                    for (l += (b - i) * w, i = b, t = 0; t < e.length; t++) {
                        if ((o = e[t]) < i && ++l > 2147483647) throw new s(r);
                        if (o === i) {
                            for (var v = l, D = 36; ; ) {
                                var A = D <= g ? 1 : D >= g + 26 ? 26 : D - g;
                                if (v < A) break;
                                var C = v - A,
                                    E = 36 - A;
                                (h(n, u(x(A + (C % E)))), (v = c(C / E)), (D += 36));
                            }
                            (h(n, u(x(v))), (g = y(l, w, m === f)), (l = 0), m++);
                        }
                    }
                    (l++, i++);
                }
                return p(n, "");
            };
        e.exports = function (e) {
            var t,
                o,
                n = [],
                r = f(g(m(e), i, "."), ".");
            for (t = 0; t < r.length; t++) ((o = r[t]), h(n, l(a, o) ? "xn--" + b(o) : o));
            return p(n, ".");
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(27),
            i = o(244),
            r = RangeError,
            s = String.fromCharCode,
            l = String.fromCodePoint,
            c = a([].join);
        n(
            { target: "String", stat: !0, arity: 1, forced: !!l && 1 !== l.length },
            {
                fromCodePoint: function (e) {
                    for (var t, o = [], n = arguments.length, a = 0; n > a; ) {
                        if (((t = +arguments[a++]), i(t, 1114111) !== t)) throw new r(t + " is not a valid code point");
                        o[a] = t < 65536 ? s(t) : s(55296 + ((t -= 65536) >> 10), (t % 1024) + 56320);
                    }
                    return c(o, "");
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(21),
            i = o(27),
            r = o(62),
            s = o(262).trim,
            l = o(248),
            c = n.parseInt,
            u = n.Symbol,
            d = u && u.iterator,
            p = /^[+-]?0x/i,
            h = i(p.exec),
            g =
                8 !== c(l + "08") ||
                22 !== c(l + "0x16") ||
                (d &&
                    !a(function () {
                        c(Object(d));
                    }));
        e.exports = g
            ? function (e, t) {
                  var o = s(r(e));
                  return c(o, t >>> 0 || (h(p, o) ? 16 : 10));
              }
            : c;
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(121),
            r = o(65),
            s = o(37),
            l = o(143),
            c = o(102),
            u = o(149)("find", TypeError);
        n(
            { target: "Iterator", proto: !0, real: !0, forced: u },
            {
                find: function (e) {
                    s(this);
                    try {
                        r(e);
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    if (u) return a(u, this, e);
                    var t = l(this),
                        o = 0;
                    return i(
                        t,
                        function (t, n) {
                            if (e(t, o++)) return n(t);
                        },
                        { IS_RECORD: !0, INTERRUPTED: !0 }
                    ).result;
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(65),
            r = o(37),
            s = o(143),
            l = o(371),
            c = o(323),
            u = o(102),
            d = o(149),
            p = o(74),
            h = !p && d("map", TypeError),
            g = l(function () {
                var e = this.iterator,
                    t = r(a(this.next, e));
                if (!(this.done = !!t.done)) return c(e, this.mapper, [t.value, this.counter++], !0);
            });
        n(
            { target: "Iterator", proto: !0, real: !0, forced: p || h },
            {
                map: function (e) {
                    r(this);
                    try {
                        i(e);
                    } catch (e) {
                        u(this, "throw", e);
                    }
                    return h ? a(h, this, e) : new g(s(this), { mapper: e });
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(65),
            a = o(93),
            i = o(240),
            r = o(101),
            s = TypeError,
            l = "Reduce of empty array with no initial value",
            c = function (e) {
                return function (t, o, c, u) {
                    var d = a(t),
                        p = i(d),
                        h = r(d);
                    if ((n(o), 0 === h && c < 2)) throw new s(l);
                    var g = e ? h - 1 : 0,
                        f = e ? -1 : 1;
                    if (c < 2)
                        for (;;) {
                            if (g in p) {
                                ((u = p[g]), (g += f));
                                break;
                            }
                            if (((g += f), e ? g < 0 : h <= g)) throw new s(l);
                        }
                    for (; e ? g >= 0 : h > g; g += f) g in p && (u = o(u, p[g], g, d));
                    return u;
                };
            };
        e.exports = { left: c(!1), right: c(!0) };
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(65),
            r = o(37),
            s = o(143),
            l = o(371),
            c = o(323),
            u = o(74),
            d = o(102),
            p = o(149),
            h = !u && p("filter", TypeError),
            g = l(function () {
                for (var e, t, o = this.iterator, n = this.predicate, i = this.next; ; ) {
                    if (((e = r(a(i, o))), (this.done = !!e.done))) return;
                    if (((t = e.value), c(o, n, [t, this.counter++], !0))) return t;
                }
            });
        n(
            { target: "Iterator", proto: !0, real: !0, forced: u || h },
            {
                filter: function (e) {
                    r(this);
                    try {
                        i(e);
                    } catch (e) {
                        d(this, "throw", e);
                    }
                    return h ? a(h, this, e) : new g(s(this), { predicate: e });
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(121),
            i = o(65),
            r = o(37),
            s = o(143),
            l = o(102),
            c = o(149),
            u = o(200),
            d = o(21),
            p = TypeError,
            h = d(function () {
                [].keys().reduce(function () {}, void 0);
            }),
            g = !h && c("reduce", p);
        n(
            { target: "Iterator", proto: !0, real: !0, forced: h || g },
            {
                reduce: function (e) {
                    r(this);
                    try {
                        i(e);
                    } catch (e) {
                        l(this, "throw", e);
                    }
                    var t = arguments.length < 2,
                        o = t ? void 0 : arguments[1];
                    if (g) return u(g, this, t ? [e] : [e, o]);
                    var n = s(this),
                        c = 0;
                    if (
                        (a(
                            n,
                            function (n) {
                                (t ? ((t = !1), (o = n)) : (o = e(o, n, c)), c++);
                            },
                            { IS_RECORD: !0 }
                        ),
                        t)
                    )
                        throw new p("Reduce of empty iterator with no initial value");
                    return o;
                },
            }
        );
    },
    function (e, t, o) {
        "use strict";
        var n = o(25),
            a = o(29),
            i = o(121),
            r = o(65),
            s = o(37),
            l = o(143),
            c = o(102),
            u = o(149)("some", TypeError);
        n(
            { target: "Iterator", proto: !0, real: !0, forced: u },
            {
                some: function (e) {
                    s(this);
                    try {
                        r(e);
                    } catch (e) {
                        c(this, "throw", e);
                    }
                    if (u) return a(u, this, e);
                    var t = l(this),
                        o = 0;
                    return i(
                        t,
                        function (t, n) {
                            if (e(t, o++)) return n();
                        },
                        { IS_RECORD: !0, INTERRUPTED: !0 }
                    ).stopped;
                },
            }
        );
    },
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(688);
        e.exports =
            Math.fround ||
            function (e) {
                return n(e, 1.1920928955078125e-7, 34028234663852886e22, 11754943508222875e-54);
            };
    },
    function (e, t, o) {
        "use strict";
        var n = o(689),
            a = o(690),
            i = Math.abs;
        e.exports = function (e, t, o, r) {
            var s = +e,
                l = i(s),
                c = n(s);
            if (l < r) return c * a(l / r / t) * r * t;
            var u = (1 + t / 2220446049250313e-31) * l,
                d = u - (u - l);
            return d > o || d != d ? c * (1 / 0) : c * d;
        };
    },
    function (e, t, o) {
        "use strict";
        e.exports =
            Math.sign ||
            function (e) {
                var t = +e;
                return 0 === t || t != t ? t : t < 0 ? -1 : 1;
            };
    },
    function (e, t, o) {
        "use strict";
        e.exports = function (e) {
            return e + 4503599627370496 - 4503599627370496;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = Array,
            a = Math.abs,
            i = Math.pow,
            r = Math.floor,
            s = Math.log,
            l = Math.LN2;
        e.exports = {
            pack: function (e, t, o) {
                var c,
                    u,
                    d,
                    p = n(o),
                    h = 8 * o - t - 1,
                    g = (1 << h) - 1,
                    f = g >> 1,
                    m = 23 === t ? i(2, -24) - i(2, -77) : 0,
                    x = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0,
                    y = 0;
                for (
                    (e = a(e)) != e || e === 1 / 0
                        ? ((u = e != e ? 1 : 0), (c = g))
                        : ((c = r(s(e) / l)),
                          e * (d = i(2, -c)) < 1 && (c--, (d *= 2)),
                          (e += c + f >= 1 ? m / d : m * i(2, 1 - f)) * d >= 2 && (c++, (d /= 2)),
                          c + f >= g
                              ? ((u = 0), (c = g))
                              : c + f >= 1
                                ? ((u = (e * d - 1) * i(2, t)), (c += f))
                                : ((u = e * i(2, f - 1) * i(2, t)), (c = 0)));
                    t >= 8;

                )
                    ((p[y++] = 255 & u), (u /= 256), (t -= 8));
                for (c = (c << t) | u, h += t; h > 0; ) ((p[y++] = 255 & c), (c /= 256), (h -= 8));
                return ((p[y - 1] |= 128 * x), p);
            },
            unpack: function (e, t) {
                var o,
                    n = e.length,
                    a = 8 * n - t - 1,
                    r = (1 << a) - 1,
                    s = r >> 1,
                    l = a - 7,
                    c = n - 1,
                    u = e[c--],
                    d = 127 & u;
                for (u >>= 7; l > 0; ) ((d = 256 * d + e[c--]), (l -= 8));
                for (o = d & ((1 << -l) - 1), d >>= -l, l += t; l > 0; ) ((o = 256 * o + e[c--]), (l -= 8));
                if (0 === d) d = 1 - s;
                else {
                    if (d === r) return o ? NaN : u ? -1 / 0 : 1 / 0;
                    ((o += i(2, t)), (d -= s));
                }
                return (u ? -1 : 1) * o * i(2, d - t);
            },
        };
    },
    function (e, t, o) {
        "use strict";
        o(353)("Uint32", function (e) {
            return function (t, o, n) {
                return e(this, t, o, n);
            };
        });
    },
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(21),
            i = o(343),
            r = o(152).NATIVE_ARRAY_BUFFER_VIEWS,
            s = n.ArrayBuffer,
            l = n.Int8Array;
        e.exports =
            !r ||
            !a(function () {
                l(1);
            }) ||
            !a(function () {
                new l(-1);
            }) ||
            !i(function (e) {
                (new l(), new l(null), new l(1.5), new l(e));
            }, !0) ||
            a(function () {
                return 1 !== new l(new s(2), 1, void 0).length;
            });
    },
    function (e, t, o) {
        "use strict";
        var n = o(46),
            a = Math.floor;
        e.exports =
            Number.isInteger ||
            function (e) {
                return !n(e) && isFinite(e) && a(e) === e;
            };
    },
    function (e, t, o) {
        "use strict";
        var n = Math.round;
        e.exports = function (e) {
            var t = n(e);
            return t < 0 ? 0 : t > 255 ? 255 : 255 & t;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(124),
            a = o(29),
            i = o(408),
            r = o(93),
            s = o(101),
            l = o(246),
            c = o(204),
            u = o(305),
            d = o(697),
            p = o(152).aTypedArrayConstructor,
            h = o(429);
        e.exports = function (e) {
            var t,
                o,
                g,
                f,
                m,
                x,
                y,
                b,
                w = i(this),
                v = r(e),
                D = arguments.length,
                A = D > 1 ? arguments[1] : void 0,
                C = void 0 !== A,
                E = c(v);
            if (E && !u(E)) for (b = (y = l(v, E)).next, v = []; !(x = a(b, y)).done; ) v.push(x.value);
            for (C && D > 2 && (A = n(A, arguments[2])), o = s(v), g = new (p(w))(o), f = d(g), t = 0; o > t; t++)
                ((m = C ? A(v[t], t) : v[t]), (g[t] = f ? h(m) : +m));
            return g;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(131);
        e.exports = function (e) {
            var t = n(e);
            return "BigInt64Array" === t || "BigUint64Array" === t;
        };
    },
    function (e, t, o) {
        "use strict";
        var n = o(101);
        e.exports = function (e, t, o) {
            for (var a = 0, i = arguments.length > 2 ? o : n(t), r = new e(i); i > a; ) r[a] = t[a++];
            return r;
        };
    },
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        var n = o(23),
            a = o(21),
            i = o(27),
            r = o(62),
            s = o(262).trim,
            l = o(248),
            c = i("".charAt),
            u = n.parseFloat,
            d = n.Symbol,
            p = d && d.iterator,
            h =
                1 / u(l + "-0") != -1 / 0 ||
                (p &&
                    !a(function () {
                        u(Object(p));
                    }));
        e.exports = h
            ? function (e) {
                  var t = s(r(e)),
                      o = u(t);
                  return 0 === o && "-" === c(t, 0) ? -0 : o;
              }
            : u;
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        const { GObject: n, GEventTarget: a, GEvent: i } = o(1);
        function r() {}
        (n.inheritAndMix(r, n, [a]),
            (r.prototype._role = null),
            (r.prototype.setRole = function (e) {
                ((this._role = e), this.hasEventListeners(r.RoleChangedEvent) && this.trigger(new r.RoleChangedEvent(e, this)));
            }),
            (r.prototype.getRole = function () {
                return this._role;
            }),
            (r.RoleChangedEvent = function (e, t) {
                ((this.role = e), (this.target = t));
            }),
            n.inherit(r.RoleChangedEvent, i),
            (e.exports = r));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e) {
        e.exports = JSON.parse(
            '[{"language":"English","keyValue":0,"abbreviation":"en-US","isDefault":true,"isAvailable":true,"realName":"English","translations":{"GBCP47LanguageTags":{"text.lang.abq":"Abaza","text.lang.ab":"Abkhazian","text.lang.ach":"Acholi","text.lang.acr":"Achi","text.lang.ady":"Adyghe","text.lang.af":"Afrikaans","text.lang.aa":"Afar","text.lang.ahg":"Agaw","text.lang.aio":"Aiton","text.lang.ak":"Akan","text.lang.x-hbotakb":"Batak Angkola","text.lang.gsw":"Alsatian","text.lang.alt":"Altai","text.lang.am":"Amharic","text.lang.ang":"Anglo-Saxon","text.lang.und-fonnapa":"Phonetic transcription—Americanist conventions","text.lang.ar":"Arabic","text.lang.an":"Aragonese","text.lang.aiw":"Aari","text.lang.rki":"Rakhine","text.lang.as":"Assamese","text.lang.ast":"Asturian","text.lang.ath":"Athapaskan languages","text.lang.x-hbotavn":"Avatime","text.lang.av":"Avar","text.lang.awa":"Awadhi","text.lang.ay":"Aymara","text.lang.azb":"Torki","text.lang.az":"Azerbaijani","text.lang.bfq":"Badaga","text.lang.bad":"Banda","text.lang.bfy":"Baghelkhandi","text.lang.x-hbotbal":"Balkar","text.lang.ban":"Balinese","text.lang.bar":"Bavarian","text.lang.bci":"Baulé","text.lang.bbc":"Batak Toba","text.lang.ber":"Berber","text.lang.bcq":"Bench","text.lang.x-hbotbcr":"Bible Cree","text.lang.bdy":"Bandjalang","text.lang.be":"Belarussian","text.lang.bem":"Bemba","text.lang.bn":"Bengali","text.lang.bgc":"Haryanvi","text.lang.bgq":"Bagri","text.lang.bg":"Bulgarian","text.lang.bhb":"Bhili","text.lang.bho":"Bhojpuri","text.lang.bik":"Bikol","text.lang.byn":"Bilen","text.lang.bi":"Bislama","text.lang.bjj":"Kanauji","text.lang.bla":"Blackfoot","text.lang.bal":"Baluchi","text.lang.blk":"Pa’o Karen","text.lang.bjt":"Balante","text.lang.bft":"Balti","text.lang.bm":"Bambara (Bamanankan)","text.lang.bai":"Bamileke","text.lang.bs":"Bosnian","text.lang.bpy":"Bishnupriya Manipuri","text.lang.br":"Breton","text.lang.brh":"Brahui","text.lang.bra":"Braj Bhasha","text.lang.my":"Burmese","text.lang.brx":"Bodo","text.lang.ba":"Bashkir","text.lang.bsk":"Burushaski","text.lang.x-hbotbtd":"Batak Dairi (Pakpak)","text.lang.beb":"Beti","text.lang.x-hbotbtk":"Batak languages","text.lang.x-hbotbtm":"Batak Mandailing","text.lang.bts":"Batak Simalungun","text.lang.x-hbotbtx":"Batak Karo","text.lang.x-hbotbtz":"Batak Alas-Kluet","text.lang.bug":"Bugis","text.lang.byv":"Medumba","text.lang.cak":"Kaqchikel","text.lang.ca":"Catalan","text.lang.cbk":"Zamboanga Chavacano","text.lang.cco":"Chinantec","text.lang.ceb":"Cebuano","text.lang.cgg":"Chiga","text.lang.ch":"Chamorro","text.lang.ce":"Chechen","text.lang.sgw":"Chaha Gurage","text.lang.hne":"Chattisgarhi","text.lang.ny":"Chichewa (Chewa, Nyanja)","text.lang.ckt":"Chukchi","text.lang.chk":"Chuukese","text.lang.cho":"Choctaw","text.lang.chp":"Chipewyan","text.lang.chr":"Cherokee","text.lang.cv":"Chuvash","text.lang.chy":"Cheyenne","text.lang.cja":"Western Cham","text.lang.cjm":"Eastern Cham","text.lang.swb":"Comorian","text.lang.cop":"Coptic","text.lang.kw":"Cornish","text.lang.co":"Corsican","text.lang.crp":"Creoles","text.lang.cr":"Cree","text.lang.crx":"Carrier","text.lang.crh":"Crimean Tatar","text.lang.csb":"Kashubian","text.lang.cu":"Church Slavonic","text.lang.cs":"Czech","text.lang.ctg":"Chittagonian","text.lang.cuk":"San Blas Kuna","text.lang.x-hbotdag":"Dagbani","text.lang.da":"Danish","text.lang.dar":"Dargwa","text.lang.dax":"Dayi","text.lang.cwd":"Woods Cree","text.lang.de":"German","text.lang.dgo":"Dogri (individual language)","text.lang.doi":"Dogri (macrolanguage)","text.lang.dhg":"Dhangu","text.lang.x-hbotdhv":"Divehi (Dhivehi, Maldivian)","text.lang.diq":"Dimli","text.lang.dv":"Divehi (Dhivehi, Maldivian)","text.lang.dje":"Zarma","text.lang.djr":"Djambarrpuyngu","text.lang.ada":"Dangme","text.lang.dnj":"Dan","text.lang.din":"Dinka","text.lang.prs":"Dari","text.lang.dwu":"Dhuwal","text.lang.dng":"Dungan","text.lang.dz":"Dzongkha","text.lang.igb":"Ebira","text.lang.crj":"Eastern Cree","text.lang.bin":"Edo","text.lang.efi":"Efik","text.lang.el":"Greek","text.lang.emk":"Eastern Maninkakan","text.lang.en":"English","text.lang.myv":"Erzya","text.lang.es":"Spanish","text.lang.esu":"Central Yupik","text.lang.et":"Estonian","text.lang.eu":"Basque","text.lang.evn":"Evenki","text.lang.eve":"Even","text.lang.ee":"Ewe","text.lang.acf":"French Antillean","text.lang.fan":"Fang","text.lang.fa":"Persian","text.lang.fat":"Fanti","text.lang.fi":"Finnish","text.lang.fj":"Fijian","text.lang.vls":"Dutch (Flemish)","text.lang.fmp":"Fe’fe’","text.lang.enf":"Forest Enets","text.lang.fon":"Fon","text.lang.fo":"Faroese","text.lang.fr":"French","text.lang.frc":"Cajun French","text.lang.fy":"Frisian","text.lang.fur":"Friulian","text.lang.frp":"Arpitan","text.lang.fuf":"Futa","text.lang.ff":"Fulah","text.lang.fuv":"Nigerian Fulfulde","text.lang.gaa":"Ga","text.lang.gd":"Scottish Gaelic (Gaelic)","text.lang.gag":"Gagauz","text.lang.gl":"Galician","text.lang.x-hbotgar":"Garshuni","text.lang.gbm":"Garhwali","text.lang.gez":"Geez","text.lang.gih":"Githabul","text.lang.niv":"Gilyak","text.lang.gil":"Kiribati (Gilbertese)","text.lang.gkp":"Kpelle (Guinea)","text.lang.glk":"Gilaki","text.lang.guk":"Gumuz","text.lang.gnn":"Gumatj","text.lang.gog":"Gogo","text.lang.gon":"Gondi","text.lang.kl":"Greenlandic","text.lang.grt":"Garo","text.lang.gn":"Guarani","text.lang.guc":"Wayuu","text.lang.guf":"Gupapuyngu","text.lang.gu":"Gujarati","text.lang.guz":"Gusii","text.lang.ht":"Haitian (Haitian Creole)","text.lang.cfm":"Halam (Falam Chin)","text.lang.hoj":"Harauti","text.lang.ha":"Hausa","text.lang.haw":"Hawaiian","text.lang.hay":"Haya","text.lang.haz":"Hazaragi","text.lang.amf":"Hammer-Banna","text.lang.hz":"Herero","text.lang.hil":"Hiligaynon","text.lang.hi":"Hindi","text.lang.mrj":"High Mari","text.lang.hmn":"Hmong","text.lang.ho":"Hiri Motu","text.lang.hnd":"Hindko","text.lang.hoc":"Ho","text.lang.har":"Harari","text.lang.hr":"Croatian","text.lang.hu":"Hungarian","text.lang.hyw":"Armenian","text.lang.hy":"Armenian East","text.lang.iba":"Iban","text.lang.ibb":"Ibibio","text.lang.ig":"Igbo","text.lang.io":"Ido","text.lang.ijo":"Ijo languages","text.lang.ie":"Interlingue","text.lang.ilo":"Ilokano","text.lang.ia":"Interlingua","text.lang.id":"Indonesian","text.lang.inh":"Ingush","text.lang.iu":"Inuktitut","text.lang.ik":"Inupiat","text.lang.und-fonipa":"Phonetic transcription—IPA conventions","text.lang.ga":"Irish","text.lang.ga-latg":"Irish Traditional","text.lang.is":"Icelandic","text.lang.smn":"Inari Sami","text.lang.it":"Italian","text.lang.he":"Hebrew","text.lang.jam":"Jamaican Creole","text.lang.ja":"Japanese","text.lang.jv":"Javanese","text.lang.jbo":"Lojban","text.lang.jct":"Krymchak","text.lang.yi":"Yiddish","text.lang.lad":"Ladino","text.lang.dyu":"Jula","text.lang.kbd":"Kabardian","text.lang.kab":"Kabyle","text.lang.kfr":"Kachchi","text.lang.kln":"Kalenjin","text.lang.kn":"Kannada","text.lang.krc":"Karachay","text.lang.ka":"Georgian","text.lang.x-hbotkaw":"Kawi (Old Javanese)","text.lang.kk":"Kazakh","text.lang.kde":"Makonde","text.lang.kea":"Kabuverdianu (Crioulo)","text.lang.ktb":"Kebena","text.lang.kek":"Kekchi","text.lang.und-geok":"Khutsuri Georgian","text.lang.kjh":"Khakass","text.lang.kca":"Khanty-Kazim","text.lang.km":"Khmer","text.lang.x-hbotkhs":"Khanty-Shurishkar","text.lang.x-hbotkht":"Khamti Shan","text.lang.x-hbotkhv":"Khanty-Vakhi","text.lang.khw":"Khowar","text.lang.ki":"Kikuyu (Gikuyu)","text.lang.ky":"Kirghiz (Kyrgyz)","text.lang.kqs":"Kisii","text.lang.kiu":"Kirmanjki","text.lang.kjd":"Southern Kiwai","text.lang.kjp":"Eastern Pwo Karen","text.lang.kjz":"Bumthangkha","text.lang.kex":"Kokni","text.lang.xal":"Kalmyk","text.lang.kam":"Kamba","text.lang.kfy":"Kumaoni","text.lang.kmw":"Komo","text.lang.kxc":"Komso","text.lang.kmz":"Khorasani Turkic","text.lang.kr":"Kanuri","text.lang.kfa":"Kodagu","text.lang.okm":"Korean Old Hangul","text.lang.kok":"Konkani","text.lang.kv":"Komi","text.lang.ktu":"Kikongo","text.lang.kg":"Kongo","text.lang.koi":"Komi-Permyak","text.lang.ko":"Korean","text.lang.kos":"Kosraean","text.lang.kpv":"Komi-Zyrian","text.lang.kpe":"Kpelle","text.lang.kri":"Krio","text.lang.kaa":"Karakalpak","text.lang.krl":"Karelian","text.lang.kdr":"Karaim","text.lang.kar":"Karen","text.lang.kqy":"Koorete","text.lang.ks":"Kashmiri","text.lang.ksh":"Ripuarian","text.lang.kha":"Khasi","text.lang.sjd":"Kildin Sami","text.lang.ksw":"S’gaw Karen","text.lang.kj":"Kuanyama","text.lang.kxu":"Kui","text.lang.kfx":"Kulvi","text.lang.kum":"Kumyk","text.lang.ku":"Kurdish","text.lang.kru":"Kurukh","text.lang.kdt":"Kuy","text.lang.kpy":"Koryak","text.lang.kyu":"Western Kayah","text.lang.lld":"Ladin","text.lang.bfu":"Lahuli","text.lang.lbe":"Lak","text.lang.lmn":"Lambani","text.lang.lo":"Lao","text.lang.la":"Latin","text.lang.lzz":"Laz","text.lang.x-hbotlcr":"L-Cree","text.lang.lbj":"Ladakhi","text.lang.x-hbotlef":"Lelemi","text.lang.lez":"Lezgi","text.lang.lij":"Ligurian","text.lang.li":"Limburgish","text.lang.ln":"Lingala","text.lang.lis":"Lisu","text.lang.ljp":"Lampung","text.lang.lki":"Laki","text.lang.mhr":"Low Mari","text.lang.lif":"Limbu","text.lang.lmo":"Lombard","text.lang.ngl":"Lomwe","text.lang.lom":"Loma","text.lang.bqi":"Luri","text.lang.dsb":"Lower Sorbian","text.lang.smj":"Lule Sami","text.lang.lt":"Lithuanian","text.lang.lb":"Luxembourgish","text.lang.lua":"Luba-Lulua","text.lang.lu":"Luba-Katanga","text.lang.lg":"Ganda","text.lang.luy":"Luyia","text.lang.luo":"Luo","text.lang.lv":"Latvian","text.lang.mad":"Madura","text.lang.mag":"Magahi","text.lang.mh":"Marshallese","text.lang.mpe":"Majang","text.lang.vmw":"Makhuwa","text.lang.ml":"Malayalam","text.lang.mam":"Mam","text.lang.mns":"Mansi","text.lang.arn":"Mapudungun","text.lang.mr":"Marathi","text.lang.mwr":"Marwari","text.lang.kmb":"Mbundu","text.lang.mbo":"Mbo","text.lang.mnc":"Manchu","text.lang.crm":"Moose Cree","text.lang.men":"Mende","text.lang.mdr":"Mandar","text.lang.mym":"Me’en","text.lang.mer":"Meru","text.lang.mfa":"Pattani Malay","text.lang.mfe":"Morisyen","text.lang.min":"Minangkabau","text.lang.lus":"Mizo","text.lang.mk":"Macedonian","text.lang.mak":"Makasar","text.lang.mkw":"Kituba","text.lang.mdy":"Male","text.lang.mg":"Malagasy","text.lang.mlq":"Malinke","text.lang.x-hbotmlr":"Malayalam Reformed","text.lang.ms":"Malay","text.lang.mnk":"Mandinka","text.lang.mn":"Mongolian","text.lang.mni":"Manipuri","text.lang.man":"Maninka","text.lang.gv":"Manx","text.lang.moh":"Mohawk","text.lang.mdf":"Moksha","text.lang.ro-md":"Moldavian","text.lang.mnw":"Mon","text.lang.ary":"Moroccan","text.lang.mos":"Mossi","text.lang.mi":"Maori","text.lang.mai":"Maithili","text.lang.mt":"Maltese","text.lang.unr":"Mundari","text.lang.mus":"Muscogee","text.lang.mwl":"Mirandese","text.lang.mww":"Hmong Daw","text.lang.myn":"Mayan","text.lang.mzn":"Mazanderani","text.lang.nag":"Naga-Assamese","text.lang.nah":"Nahuatl","text.lang.gld":"Nanai","text.lang.nap":"Neapolitan","text.lang.nsk":"Naskapi","text.lang.na":"Nauruan","text.lang.nv":"Navajo","text.lang.csw":"N-Cree","text.lang.nd":"Ndebele","text.lang.ndc":"Ndau","text.lang.ng":"Ndonga","text.lang.nds":"Low Saxon","text.lang.ne":"Nepali","text.lang.new":"Newari","text.lang.nga":"Ngbaka","text.lang.x-hbotngr":"Nagari","text.lang.x-hbotnhc":"Norway House Cree","text.lang.njz":"Nisi","text.lang.niu":"Niuean","text.lang.nyn":"Nyankole","text.lang.nqo":"N’Ko","text.lang.nl":"Dutch","text.lang.noe":"Nimadi","text.lang.nog":"Nogai","text.lang.no":"Norwegian","text.lang.nov":"Novial","text.lang.se":"Northern Sami","text.lang.nso":"Northern Sotho","text.lang.nod":"Northern Tai","text.lang.eo":"Esperanto","text.lang.nym":"Nyamwezi","text.lang.nn":"Norwegian Nynorsk (Nynorsk, Norwegian)","text.lang.nza":"Mbembe Tigon","text.lang.oc":"Occitan","text.lang.ojs":"Oji-Cree","text.lang.oj":"Ojibway","text.lang.or":"Odia (formerly Oriya)","text.lang.om":"Oromo","text.lang.os":"Ossetian","text.lang.sam":"Palestinian Aramaic","text.lang.pag":"Pangasinan","text.lang.pi":"Pali","text.lang.pam":"Pampangan","text.lang.pa":"Punjabi","text.lang.plp":"Palpa","text.lang.pap":"Papiamentu","text.lang.ps":"Pashto","text.lang.pau":"Palauan","text.lang.pcc":"Bouyei","text.lang.pcd":"Picard","text.lang.pdc":"Pennsylvania German","text.lang.el-polyton":"Polytonic Greek","text.lang.phk":"Phake","text.lang.pih":"Norfolk","text.lang.fil":"Filipino","text.lang.pce":"Palaung","text.lang.pl":"Polish","text.lang.pms":"Piemontese","text.lang.pnb":"Western Panjabi","text.lang.poh":"Pocomchi","text.lang.pon":"Pohnpeian","text.lang.pro":"Provençal / Old Provençal","text.lang.pt":"Portuguese","text.lang.pwo":"Western Pwo Karen","text.lang.bgr":"Chin","text.lang.quc":"K’iche’","text.lang.quh":"Quechua (Bolivia)","text.lang.qu":"Quechua","text.lang.qvi":"Quechua (Ecuador)","text.lang.qwh":"Quechua (Peru)","text.lang.raj":"Rajasthani","text.lang.rar":"Rarotongan","text.lang.bxr":"Russian Buriat","text.lang.atj":"R-Cree","text.lang.rej":"Rejang","text.lang.ria":"Riang","text.lang.rif":"Tarifit","text.lang.rit":"Ritarungo","text.lang.rkw":"Arakwal","text.lang.rm":"Romansh","text.lang.rmy":"Vlax Romani","text.lang.ro":"Romanian","text.lang.rom":"Romany","text.lang.rue":"Rusyn","text.lang.rtm":"Rotuman","text.lang.rw":"Kinyarwanda","text.lang.rn":"Rundi","text.lang.rup":"Aromanian","text.lang.ru":"Russian","text.lang.sck":"Sadri","text.lang.sa":"Sanskrit","text.lang.sas":"Sasak","text.lang.sat":"Santali","text.lang.x-hbotsay":"Sayisi","text.lang.scn":"Sicilian","text.lang.sco":"Scots","text.lang.scs":"North Slavey","text.lang.xan":"Sekota","text.lang.sel":"Selkup","text.lang.sga":"Old Irish","text.lang.sg":"Sango","text.lang.sgs":"Samogitian","text.lang.shi":"Tachelhit","text.lang.shn":"Shan","text.lang.sjo":"Sibe","text.lang.sid":"Sidamo","text.lang.stv":"Silte Gurage","text.lang.sms":"Skolt Sami","text.lang.sk":"Slovak","text.lang.den":"Slavey","text.lang.sl":"Slovenian","text.lang.so":"Somali","text.lang.sm":"Samoan","text.lang.seh":"Sena","text.lang.sn":"Shona","text.lang.sd":"Sindhi","text.lang.si":"Sinhala (Sinhalese)","text.lang.snk":"Soninke","text.lang.gru":"Sodo Gurage","text.lang.sop":"Songe","text.lang.st":"Southern Sotho","text.lang.sq":"Albanian","text.lang.sr":"Serbian","text.lang.sc":"Sardinian","text.lang.skr":"Saraiki","text.lang.srr":"Serer","text.lang.xsl":"South Slavey","text.lang.sma":"Southern Sami","text.lang.stq":"Saterland Frisian","text.lang.suk":"Sukuma","text.lang.su":"Sundanese","text.lang.suq":"Suri","text.lang.sva":"Svan","text.lang.sv":"Swedish","text.lang.aii":"Swadaya Aramaic","text.lang.sw":"Swahili","text.lang.ss":"Swati","text.lang.ngo":"Sutu","text.lang.sxu":"Upper Saxon","text.lang.syl":"Sylheti","text.lang.syr":"Syriac","text.lang.und-syre":"Syriac, Estrangela script-variant (equivalent to ISO 15924 \'Syre\')","text.lang.und-syrj":"Syriac, Western script-variant (equivalent to ISO 15924 \'Syrj\')","text.lang.und-syrn":"Syriac, Eastern script-variant (equivalent to ISO 15924 \'Syrn\')","text.lang.szl":"Silesian","text.lang.tab":"Tabasaran","text.lang.tg":"Tajiki","text.lang.ta":"Tamil","text.lang.tt":"Tatar","text.lang.x-hbottcr":"TH-Cree","text.lang.tdd":"Dehong Dai","text.lang.te":"Telugu","text.lang.tet":"Tetum","text.lang.tl":"Tagalog","text.lang.to":"Tongan","text.lang.tig":"Tigre","text.lang.ti":"Tigrinya","text.lang.th":"Thai","text.lang.ty":"Tahitian","text.lang.bo":"Tibetan","text.lang.tiv":"Tiv","text.lang.tk":"Turkmen","text.lang.tmh":"Tamashek","text.lang.tem":"Temne","text.lang.tn":"Tswana","text.lang.yrk":"Tundra Enets","text.lang.toi":"Tonga","text.lang.xwo":"Todo","text.lang.tod":"Toma","text.lang.tpi":"Tok Pisin","text.lang.tr":"Turkish","text.lang.ts":"Tsonga","text.lang.tsj":"Tshangla","text.lang.tru":"Turoyo Aramaic","text.lang.tcy":"Tumbuka","text.lang.tum":"Tulu","text.lang.tyv":"Tuvin","text.lang.tvl":"Tuvalu","text.lang.tw":"Twi","text.lang.tyz":"Tày","text.lang.tzm":"Tamazight","text.lang.tzo":"Tzotzil","text.lang.udm":"Udmurt","text.lang.uk":"Ukrainian","text.lang.umb":"Umbundu","text.lang.ur":"Urdu","text.lang.hsb":"Upper Sorbian","text.lang.ug":"Uyghur","text.lang.uz":"Uzbek","text.lang.vec":"Venetian","text.lang.ve":"Venda","text.lang.vi":"Vietnamese","text.lang.vo":"Volapük","text.lang.vro":"Võro","text.lang.wbm":"Wa","text.lang.wbr":"Wagdi","text.lang.war":"Waray-Waray","text.lang.x-hbotwci":"Waci Gbe","text.lang.crk":"West-Cree","text.lang.cy":"Welsh","text.lang.wo":"Wolof","text.lang.wa":"Walloon","text.lang.wtm":"Mewati","text.lang.khb":"Lü","text.lang.xh":"Xhosa","text.lang.xjb":"Minjangbal","text.lang.xkf":"Khengkha","text.lang.xog":"Soga","text.lang.xpe":"Kpelle (Liberia)","text.lang.sah":"Sakha","text.lang.yao":"Yao","text.lang.yap":"Yapese","text.lang.yo":"Yoruba","text.lang.x-hbotycr":"Y-Cree","text.lang.x-hbotyic":"Yi Classic","text.lang.ii":"Yi Modern","text.lang.zea":"Zealandic","text.lang.zgh":"Standard Moroccan Tamazight","text.lang.za":"Zhuang","text.lang.zh-hk":"Chinese, Traditional, Hong Kong SAR","text.lang.x-hbotzhp":"Chinese, Phonetic","text.lang.zh-hans":"Chinese, Simplified","text.lang.zh-hant":"Chinese, Traditional","text.lang.x-hbotzhtm":"Chinese, Traditional, Macao SAR","text.lang.zne":"Zande","text.lang.zu":"Zulu","text.lang.zza":"Zazaki"},"GMemoryManager":{"text.title":"%app is low on memory.","text.subtitle":"Please close a few files to free up some memory and avoid losing your progress."},"GBetaFlow":{"text.title":"You are using the beta version of %app.","text.message":"This is a pre-release version and may contain bugs, we strongly advise against using it for production work.","text.i-understand":"I understand"},"GSharepointOneDriveAuthenticator":{"text.please-hold-on":"Please hold on, we are logging you in."},"GSubAction":{"shortcut-hint-template":"%mainShortcutHint then %shortcutSubKeyHint"},"GSharePointCheckInAction":{"title":"Check In to SharePoint","text.doc-modified-save-before-check-in":"\'%title\' has been modified, please save it before doing the \'Check In\'."},"GSharePointCheckOutAction":{"title":"Check Out and Refresh from SharePoint","text.successul-checkout":"The document was succesfully checked out.","text.already-checkout":"The document is already checked out by you."},"GImportImageFromIOSAction":{"text.ios-files":"From Files","text.ios-photos":"From Photos"},"GIPadStorageDestinations":{"text.files":"Files","text.photos":"Photos"},"GIPadStorage":{"text.saving-to-photos-failed":"Exporting files requires access to Photos in iOS. Please go to “Settings > %app > Photos” and enable access.<br/>Note that this will reload the application, please ensure to save progress for your opened design files."},"GOpenQuickHelpScreenAction":{"title":"Show Quick Help"},"GSharePointStorage":{"text.error-failed-check-out-file":"Failed to check out the Sharepoint file, please be sure it\'s not check out by someone else to avoid losing your work"},"GQuickHelpScreen":{"text.menu":"Menu","text.open":"Open","text.save":"Save","text.undo-redo":"Undo/Redo","text.zoom":"Zoom","text.snapping":"Snapping","text.select":"Select","text.shapes":"Shapes","text.path":"Path","text.knife":"Knife","text.text":"Text","text.image":"Image","text.files":"Files","text.export":"Export","text.pages":"Pages","text.layers":"Layers","text.libraries":"Libraries","text.symbols":"Symbols","text.align-distribute":"Align and Distribute","text.transform":"Transform","text.document":"Document","text.appearance":"Appearance","text.fills":"Fills","text.borders":"Borders","text.effects":"Effects","text.comments":"Comments","text.modifier-keys":"Modifier Keys","text.nudge":"Nudge","text.copy":"Copy","text.paste":"Paste","text.delete":"Delete","text.select-deselect":"Select/Deselect All","text.arrange":"Arrange","text.fullscreen":"Fullscreen","text.group":"Group","text.ungroup":"Ungroup","text.convert-to-path":"Convert to Path","text.pinch-to-zoom":"Pinch to Zoom","text.drag-with-2-fingers":"Drag with 2 fingers to Pan","text.tap-and-hold":"Tap and Hold for Contextual menu"},"GAutoSave":{"text.notification-message-1":"Calm down, your file is being auto-saved.","text.notification-message-2":"Don’t worry, your progress is saved automatically.","text.notification-message-3":"We have your back, we are saving your design now.","text.failed-auto-saving":"We were unable to save your document right now, but don’t worry, we will try again soon.","text.alert-offline":"Auto-save isn’t available when being offline. Please download the file regularly to avoid losing progress.","text.alert-offline-desktop":"Auto-save isn’t available when being offline. Please save to a local file regularly to avoid losing progress.","text.alert-sync":"Please save this file to Corel Vector to enable Auto-save. ","text.alert-sync-sub-text":"Auto-save isn\'t available for unsaved files or locally saved files.<br />Please save or sync \\"%title\\" to Corel Vector to save your progress automatically and avoid losing progress. You can keep your file locally and sync it to the Cloud at any time from the “File“ menu.","text.alert-button.cancel":"Cancel","text.alert-button.save-to-cloud":"Save to Cloud","text.alert-cloud-reference-sync":"Auto-save isn\'t available for local files (“%title”). Please open the file from Corel Vector if you want to enable auto-save.","text.alert-cloud-reference-sync-sub-text":"Please make sure to save regularly, to avoid losing progress.","text.dialog-no-entries-created-waring.title":"This %storage file will be saved automatically, but no entries in the version history will be created. You can turn off this feature in the settings.","text.dialog-no-entries-created-waring.subtitle":"Please note that reloading this file discards all unsaved progress.","text.dialog-no-entries-created-waring.go-settings":"Go to Settings","text.dialog-file-updated-out-app-waring.title":"The file \\"%file-name\\" was modified outside of %app-name and can’t be auto-saved. Please consider saving it manually.","text.dialog-file-updated-out-app-waring.do-not-reload":"Don\'t reload","text.dialog-file-updated-out-app-waring.reload":"Reload with latest changes","text.dialog-inform-warn-feature.title":"Corel Vector can save your files automatically. Do you want to enable Auto-Save?","text.dialog-inform-warn-feature.text":"You can always change this behavior from the Settings in the Edit menu.","text.dialog-inform-warn-feature.cancel-button":"I will save my files manually","text.dialog-inform-warn-feature.enable-button":"Enable Auto-Save","text.dialog-auto-save-is-not-available-for-cdr-and-des.text":"Auto-save isn’t available for CorelDRAW (CDR, DES) files. Please make sure to save regularly to avoid losing progress or save as CDRAPP to enable auto-save.","text.dialog-auto-save-is-not-available-for-cdr-and-des.save-as-button":"Save as CDRAPP","text.dialog-auto-save-is-not-available-for-cdr-and-des.keep-cdr-button":"Keep CDR, DES"},"GFileReviewManager":{"text.cant-update-file-to-status":"Can\'t update to this status"},"GReviewDockerProperties":{"text.current-status":"Current status:","text.status-history":"Status history","text.please-share-to-start":"Please share the file to start the review process.","text.share-design-now":"Share the design now","text.review-title":"In review","text.review-description":"Reviewers give feedback.","text.reopen-title":"Reopen","text.reopened-title":"Reopened","text.reopen-description":"Review done, the design needs changes.","text.requested-approval-title":"All Done. Ready for Approval","text.request-approval-title":"Request Approval","text.request-approval-description":"All feedback is addressed. No pending changes.","text.approved-title":"Approved","text.approve-title":"Approve","text.approved-description":"No more changes are needed. File is ready for output.","text.request-approval-tooltip":"No Approver(s) assigned to this file. Please assign Approver(s) with the Share button.","text-please-save-share-to-start":"Please save and share the file to start the review process.","text.save-share-design-now":"Save and share the design now"},"GFileStatusHistoryDialog":{"text.status-history":"Status history","text.action-request-approval":"%name <highlight>requested approval</highlight> for this file","text.action-approved":"%name <highlight>approved</highlight> this file","text.action-reopened":"%name <highlight>reopened</highlight> this file","text.action-in-review":"%name <highlight>requested review</highlight> for this file"},"GCollaborativeTextPanel":{"text.send-changes-failed":"There was a problem applying your changes to this design. Please try again.","text.owner-message":"Please refer to CorelDRAW to make changes in this CDR file.","text.finish-editing-message":"Please double-click inside the text element to edit it. When you are ready, click “Finish Editing“ to complete your editing session.","text.send-changes-message":"Send the changes to the file owner?","text.request-access-message":"You can\'t currently edit text elements since there is an active editing session by %name. The file will be unlocked automatically when the other editor is done or you can request access.","text.update-available-message":"There is an updated version of this file. Do you want to reload now?","text.request-access":"Request Access","text.finish-editing":"Finish Editing","text.back-to-editing":"Back to editing","text.preview-changes":"Preview Changes","text.send-changes":"Send Changes","text.rendering-preview":"Rendering preview...","text.sending-changes":"Sending...","text.updating":"Updating...","text.wants-to-take-over":"%name wants to take over the text editing in this document. If you allow this you will be unable to edit text objects until %name finishes the edits.","text.save-my-edits-and-allow":"Save my edits and Allow","text.save-my-edits-and-close":"Save my edits and close","text.discard-my-edits-and-allow":"Discard my edits and Allow","text.discard-my-edits-and-close":"Discard my edits and close","text.decline":"Decline until I am done","text.update-now":"Update Now","text.request-has-been-sent":"A request has been sent to %name.","text.send-to-owner":"Send the changes to the file owner and notify him?","text.your-changes-were-applied":"Your changes were applied.","text.changes-you-made-are-not-saved":"You edited this document, but the changes you made are not saved. If you do not save them now they will be lost."},"GCollaborators":{"text.content-editor-tooltip":"%username can edit text in this design","text.you-are-offline":"You are offline","text.you-are-offline-tooltip":"You can’t co-edit this document or comment when you are offline.","text.reviewer-tooltip":"%username can review this design","text.content_editor-tooltip":"%username can edit text in this design","text.approver-tooltip":"%username can review and approve this design","text.owner-tooltip":"%username is the owner of this design","text.can-edit-tooltip":"%username can edit this design","text.can-comment-tooltip":"%username can comment on this design","text.can-edit-parts-tooltip":"%username can edit parts of this design"},"GCloudUtil":{"text.err-subscription-is-lifetime":"You already have a Lifetime subscription.","text.err-subscription-could-not-be-deactivated":"You already have an active subscription. <BR/>If you want to apply a new coupon code you need to cancel it in your <A>account settings</A>.","text.err-subscription-is-not-expired":"Your current subscription is good through %date.<BR/>You may only apply a coupon code to new or expired subscriptions.","text.err-subscription-is-active":"You already have an active subscription.<BR/>Even if you cancel it, your current subscription is good through %date.<BR/>You may only apply a coupon code to new or expired subscriptions."},"GMagnificationAction":{"text.actual-size":"Actual Size"},"GOpenAccountSettingsAction":{"title":"Account settings"},"GLogoutAction":{"title":"Log out"},"GToggleTouchAction":{"title":"Touch interface","title-disable":"Disable Touch Interface","text.try-this-feature-pro-tooltip-title":"Touch Interface","text.try-this-feature-pro-tooltip-description":"Show/hide the Interface optimized for touch-enabled devices."},"GExampleFilesAction":{"title":"Explore Example Files"},"GGoogleDrive":{"text.warning-message":"By default, only files that were created in Corel Vector will be shown here. To open additional files from your Google Drive, please use the button below. Please note that you need to select each folder and the included files separately so that they show up here.","text.add-files":"Open files...","text.you-have-not-added":"You haven’t opened files or saved files from/to your Google Drive yet.","text.add-additional-files":"Open Additional Files","text.all-files-tab-title":"All files","text.gravit-designer-tab-title":"Corel Vector files","text.team-drives-tab-title":"Team Drives files","text.selected-file-folder-not-added":"The selected file was added. You can find it easily from \\"Recent files\\" in \\"My Cloud.\\"","text.selected-files-folder-not-added":"The selected files were added. You can find them easily from \\"Recent files\\" in \\"My Cloud.\\"","text.selected-files-folder-not-added-additional":"Please note that you need to select the containing folder and its parents, so that it shows up here.","error.no-file-found":"Error occured. No file found","error.only-for-corporate":"Error. This feature is allowed only for corporate users","error.not-enough-parameters":"Error. Some parameters are not specified","error.google-api-error":"Error occured while processing request to Google Drive API. Please try again later or contact support from Help > Contact us."},"GAnnotations":{"text.page":"Page"},"GAnnotationPanel":{"text.document-approved-no-annotations-update":"The design was Approved and can\'t receive annotations update!","text.empty":"empty","text.unread-comment":"new","text.edit-comment":"Edit comment","text.reopen":"Reopen","text.resolve":"Resolve","text.edit":"Edit...","text.remove-annotation":"Remove annotation","text.remove-comment":"Remove comment","text.delete":"Delete","text.cancel":"Cancel","text.comment":"Reply","text.fill-contents":"Add comment","text.set-annotation-text":"Set annotation text","text.add-comment":"Add comment","text.write-annotation-here":"Type comment here","text.write-reply-here":"Type reply here","text.remove-empty-annotation":"Remove empty annotation","text.confirm-discard-annotation":"Please add some text or the comment can’t be saved. Do you want to discard?","text.marked-as-resolved":"Marked as resolved","text.re-opened":"Re-opened","text.confirm-remove":"Do you really want to remove this comment?","text.copy-permalink":"Copy Permalink","text.assign-resolve":"Done","text.assigned-to":"Assigned to&nbsp;","text.assign-to":"Assign to&nbsp;","text.additional-collaborators-all-reviewers-name":"All Reviewers","text.additional-collaborators-all-reviewers-show-text":"@reviewers","text.additional-collaborators-all-reviewers-role":"All Reviewers","text.additional-collaborators-all-approvers-name":"All Approvers","text.additional-collaborators-all-approvers-show-text":"@approvers","text.additional-collaborators-all-approvers-role":"All Approvers","text.additional-collaborators-all-content-editor-name":"All Co-editors","text.additional-collaborators-all-content-editor-show-text":"@coeditors","text.additional-collaborators-all-content-editor-role":"All Co-editors","text.additional-collaborators-all-co-author-name":"All Co-authors","text.additional-collaborators-all-co-author-show-text":"@coauthors","text.additional-collaborators-all-co-author-role":"All Co-authors","text.additional-collaborators-all-name":"All","text.additional-collaborators-all-show-text":"@all","text.additional-collaborators-all-role":"All","text.additional-collaborators-owner-name":"Owner","text.additional-collaborators-owner-show-text":"@owner","text.additional-collaborators-owner-role":"Owner"},"GAnnotationProperties":{"text.change-annotation-style":"Change annotation style","text.start-arrow":"Start arrow","text.end-arrow":"End arrow","text.tooltip-ellipse-tool":"Draw ellipses","text.tooltip-rectangle-tool":"Draw rectangles","text.tooltip-comment-tool":"Add notes","text.tooltip-pencil-tool":"Draw free-form lines and shapes","text.tooltip-highlighter-tool":"Highlight canvas areas","text.tooltip-arrow-tool":"Draw arrows and lines","text.tooltip-ellipse-fill":"Choose fill color","text.tooltip-ellipse-border":"Choose outline color","text.tooltip-ellipse-outline":"Set outline width","text.tooltip-ellipse-dropper-fill":"Pick fill color from canvas","text.tooltip-ellipse-dropper-border":"Pick outline color from canvas","text.tooltip-rectangle-fill":"Choose fill color","text.tooltip-rectangle-border":"Choose outline color","text.tooltip-rectangle-outline":"Set outline width","text.tooltip-rectangle-dropper-fill":"Pick fill color from canvas","text.tooltip-rectangle-dropper-border":"Pick outline color from canvas","text.tooltip-pencil-border":"Choose line color","text.tooltip-pencil-outline":"Set line width","text.tooltip-pencil-dropper-border":"Pick line color from canvas","text.tooltip-highlighter-border":"Choose highlight color","text.tooltip-highlighter-outline":"Set highlight width","text.tooltip-highlighter-dropper-border":"Pick highlight color from canvas","text.tooltip-arrow-border":"Choose line color","text.tooltip-arrow-outline":"Set line width","text.tooltip-arrow-dropper-border":"Pick line color from canvas","text.tooltip-comment-fill":"Choose note background color","text.tooltip-comment-dropper-fill":"Pick color from canvas"},"GAnnotationsSidebar":{"text.title":"Comments","text.show-updates":"Show updates","text.annotation-options":"Settings","text.show-resolved":"Show resolved","text.resolve-all-comments":"Resolve all comments","text.resolve-all":"Resolve all","text.notification":"Notification","text.notification-all-annotation":"All annotations","text.notification-assign-to-me":"Only assigned to me","text.notification-none":"None","text.save-file-tip":"This option is disabled until the file is saved to the Cloud.","text.hover-notification":"You can change the interval of notifications in the <span> Settings </span>"},"GTextAnnotation":{"text.new-annotation":"New annotation"},"GEditorOptions":{"text.anonymous-user":"Anonymous"},"GUseCouponAction":{"title":"Use Coupon","text.hava-coupon":"Have a coupon for Corel Vector? Enter it below.","text.invalid-coupon":"Invalid value, please inform a valid coupon!"},"GNotificationPanel":{"text.title-welcome":"Create a trial account","text.create-account":"Please %signup or %signin to try out the full functionality and save or export designs.","text.create-account-template":"Please %signup or %signin to try out the full functionality and save or export this template.","text.sign-up":"create a free account","text.sign-in":"log in","text.footer":"Learn more about %app."},"GDesigner":{"text.design-by":"Design by %name - %appname","text.preview-by":"Preview %name design in %appname online vector graphic design app. Preview the design and create a free account today!"},"GContainer":{"text.load-failed":"This design can’t be found or isn’t enabled for sharing.","text.request-permission":"Request permission to access.","text.not-memary-enough":"Not enough memory for saving, please free some memory before trying to save.","text.load-failed-from-link":"This file can\'t be opened by link, please open it directly from the Cloud.","text.load-failed-from-recent":"This file can\'t be opened from Recent files, please open it directly from the Cloud."},"GShareManager":{"text.auto-save-notification":"Comments/annotations were saved successfully to this CDR/DES file. It can now be opened with the latest changes in CorelDRAW. Please note that you need to save the file manually to include all changes to the design elements.","text.sent-request-email":"A request email has been sent.","text.cannot-request-access":"Cannot request access. Make sure the document exists and is shared with you.","text.file-can-not-be-accessed-title":"This file can\'t be accessed.","text.file-can-not-be-accessed-info":"The file either can\'t be found or it\'s not shared with you.","text.file-can-not-be-commented-title":"Your role is %role.","text.file-can-not-be-commented-info":"You don’t have permission to see comments on this design.","text.file-request-permission-to-comment":"Request Permission to Comment","text.file-request-access":"Request Access","text.template-shared-by":"This template was shared by %name.","text.shared-by":"This design was shared by %name.","text.save-warning":"The owner does not allow to save or download this file.","text.inspect-warning":"The owner only allows to view this file.","text.combined-warnings":"The owner does not allow to save or download this file and only allows to view it.","text.cant-comment":"You can view the design, but you can\'t add comments to the file.","text.new-role-is-viewer":"Your new role is Viewer. Now you can only preview this design.","text.new-role-is-reviewer":"Your new role is Reviewer. Now you can preview, comment and annotate this design.","text.new-role-is-approver":"Your new role is Approver. Now you can preview, comment and annotate this design, as well as approve the final revision.","text.new-role-is-content_editor":"Your new role is Content Editor. Now you can edit marked text objects in this design, as well as comment and annotate.","text.new-role-is-co_author":"Your new role is Co-Author. You can add and edit objects in this design, as well as comment and annotate. All changes will be saved in real-time.","text.new-role-is-developer":"Your new role is Developer. Now you can view, inspect, export assets or save a copy of this design."},"GShareDialog":{"text.participants-will-be-invited":"The participant(s) will be invited via email after you close the Share dialog.","text.you-can-not-invite-yourself":"You can’t share this file with yourself.","text.empty-email":"Email is not valid, please check if it\'s a correct address.","text.you-can-not-invite-user-from-another-domain":"Sharing design files with external users (outside the registered corporate domain) requires the file to be stored on Cloud. Save the file to the Cloud first to share with external users.","text.invalid-email":"%email is not valid, please check if it\'s a correct address.","text.resend-invitation-email":"Resend invitation email","text.resent-invitation-email":"The invitation was resent to %email.","text.sent-invitation-email":"An invitation was sent to %emails.","text.projects-left":"%number projects left in trial","text.role-required":"A role is required!","text.email-required":"An email is required!","text.public-share-link":"Everybody with the link:","text.private-share-placeholder":"Add email here to invite a participant ...","text.private-sharing":"Private Sharing","text.private-sharing-add":"Add","text.copied":"Copied","text.title":"Share File","text.subtitle-on":"Copy and share this link with your peers and stakeholders.","text.subtitle-off":"Turn on sharing to see the available options.","text.switch-on":"Sharing is On","text.switch-off":"Sharing is Off","text.allow-to-save-label":"Allow to Save","text.allow-to-save-info":"Everyone with the link will be able to download or save the file to his own account.","text.allow-to-inspect-label":"Allow to Inspect","text.allow-to-inspect-info":"Everyone with the link will be able to inspect the full layer structure of this file.","text.allow-to-comment-label":" ","text.allow-to-comment-info":" ","text.failed-copying-to-clipboard":"Failed copying to clipboard","text.copy":"Copy","text.options-description":"Allow everyone who has the link to:","text.private-share-no-options-left":"All users with email %email are already in the Private Sharing list.","text.error-change-role-failed":"External API didn\'t allow to change role","text.native-link-share-title":"","text.native-link-share-description":"","text.error-unsupported-native-link-share":"","text.error-unhandled-native-link-share":""},"GCDGSAssetShareDialog":{"text.participants-will-have-access-cdgs":"The participant(s) will have access to the assets in CorelDRAW."},"GShareAction":{"title":"Share File"},"GOpenSharedFileAction":{"title":"Open Shared File...","text.prompt-text":"Paste the shared design URL here: ","text.cancel":"Cancel","text.open":"Open","invalid-link":"Invalid link, please be sure to enter a valid share URL!"},"GCloudSynchronizationAction":{"text.syncing":"Syncing...","text.sync-to-cloud":"Sync File to Corel Vector...","text.unsync-from-cloud":"Unsync from Corel Vector...","text.last-synced-at":"Last synced at: %date"},"GPaymentDialog":{"text.default-title":"Corel Vector","text.dialog-dont-leave":"Wait Don’t Leave, Your Order has not Been Placed. <br>We cannot process your order until you fill in Your Info and Payment Info. <br>Once your Order is placed this window will close and you will be on your way to using Corel Vector.","text.cancel":"Cancel","text.finish-my-order":"Finish My Order","text.something-went-wrong":"Something is wrong","text.payment-not-confirmed":"We couldn\'t confirm your payment. <br>Please get in touch with our support via email: <a href=\'%link\'>%link</a>","text.canceled":"Canceled"},"GSystemDialog":{"text.cdr-warning-title":"Editing a CorelDRAW (CDR, DES) design","text.cdr-warning-label":"Important Note","text.cdr-warning-message":"CorelDRAW (CDR, DES) files are currently supported for annotating and adding content in CorelDRAW.app. All CorelDRAW drawing content will be displayed as a locked underlay. Any objects you create in CorelDRAW.app will be added to a new layer. When saving as CDR file the new layer(s) and its contents will be added to the CorelDRAW file while the original content will remain unchanged.","text.do-not-show-again":"Don\'t show this again","text.supported-touch-title":"It seems you are using a touch-enabled device. Do you want to switch to the touch-optimized interface?","text.supported-touch-footer":"You can switch to the touch interface at any time with “Touch interface” in the “View” menu.","text.unsupported-browser":"%app is optimized for the latest versions of Chrome, Firefox, Safari, and (new) Edge. Please try a supported web browser for an optimal experience.","text.unsupported-browser-touch":"%app is optimized for the latest versions of Safari on iOS and Chrome on Android. Please try a supported web browser for an optimal experience.","text.unsupported-screen-size":"Please note that %app may not work optimally on your device. For an optimal experience, it should be a device with a screen width of at least 1024 pixels width, 2 GB RAM and a CPU with 2.2 Ghz.","text.cdr-unsupported-objects-warning-title":"Save as CorelDRAW (CDR, DES) file","text.cdr-unsupported-objects-warning-label":"Unsupported objects","text.cdr-unsupported-objects-warning-message":"Your design contains objects that cannot be saved to CorelDRAW (CDR, DES) file format.","text.cdr-unsupported-objects-warning-option-0":"Keep appearance","text.cdr-unsupported-objects-warning-option-1":"Keep editable","text.cdr-unsupported-objects-warning-option-2":"Save as CDRAPP and keep objects editable","text.cdr-unsupported-objects-warning-option-3":"Omit incompatible objects","text.cdr-unsupported-objects-warning-option-0-tooltip":"Incompatible objects display accurately but won\'t be editable. Text will be converted to paths.","text.cdr-unsupported-objects-warning-option-1-tooltip":"Incompatible objects display accurately but won\'t be editable. Text appearance can change but will retain editing capabilities.","text.cdr-unsupported-objects-warning-option-3-tooltip":"Warning: Incompatible objects will not be saved and not available when opening the file again.","text.cdr-unsupported-objects-warning-details-label":"Details about affected pages/ layers","text.cdr-unsupported-object-warning-message":"%name is incompatible with the CorelDRAW (CDR, DES) format.You will be prompted to decide what to do with incompatible objects when saving the file as CorelDRAW (CDR, DES) file.","text.cdr-unsupported-object-warning-effect-name":"\\"%name\\" Effect","text.cdr-unsupported-object-warning-generic-name":"The object you\'re creating","text.unsupported-mobile-for-msteams":"CorelDRAW.app can not be run within the mobile application of Teams.","text.unsupported-mobile-for-msteams-new":"CorelDRAW.app is not optimized to run on mobile devices. It needs a screen resolution of at least 1024x768px.","text.unsupported-screen-size-msteams":"Please note that CorelDRAW.app may not work optimally on your device. For an optimal experience, it should have a screen resolution of at least 1024x768px.","text.unsupported-windows-size-msteams":"Please click on the \'Expand tab\' button on the top-right corner for the best experience."},"GCDRIntegrationEngine":{"text.cdr-unsupported-fonts":"This design may contain unsupported fonts (including styles and features).","text.cdr-unsupported-infinite-canvas":"Infinite Canvas","text.cdr-unsupported-blending-mode":"Blending mode","text.cdr-unsupported-blending-mode-layer":"Blending mode Fill/Border","text.cdr-unsupported-cmyk":"CMYK Color","text.cdr-unsupported-multiple-fills":"Multiple Object Fills","text.cdr-unsupported-multiple-borders":"Multiple Stroke Fills","text.cdr-unsupported-nonsolid-fills":"Non-Solid-Color Object Fill","text.cdr-unsupported-nonsolid-borders":"Non-Solid-Color Stroke Fill","text.cdr-background":"Background","text.cdr-unable-to-save-permission":"Unable to save file. Do you have permissions?","text.image-too-big":"The image you are trying to import is too large. Please resize and try again.","text.file-dimensions-too-big":"The dimensions of the pages contained in this CorelDRAW design are too big. Please decrease their size or the design’s dpi and try again.","text.blending-modes-currently-not-supported":"Blending modes are currently not supported when saving to CorelDRAW."},"GLocale":{"create":"Create","add":"Add","edit":"Edit","remove":"Remove","delete":"Delete","open":"Open","save":"Save","cancel":"Cancel","ok":"OK","yes":"Yes","no":"No","close":"Close","loading":"Loading","loading_of":"Loading of","saving":"Saving","saving_of":"Saving of","success":"Success","failure":"Failure","waiting":"Waiting","syncing":"Syncing"},"GFont":{"weight.thin":"Thin","weight.extra-light":"Extra-Light","weight.light":"Light","weight.regular":"Regular","weight.medium":"Medium","weight.semi-bold":"Semi-Bold","weight.bold":"Bold","weight.extra-bold":"Extra-Bold","weight.heavy":"Heavy","weight.thin-italic":"Thin Italic","weight.extra-light-italic":"Extra-Light Italic","weight.light-italic":"Light Italic","weight.regular-italic":"Regular Italic","weight.medium-italic":"Medium Italic","weight.semi-bold-italic":"Semi-Bold Italic","weight.bold-italic":"Bold Italic","weight.extra-bold-italic":"Extra-Bold Italic","weight.heavy-italic":"Heavy Italic"},"GImage":{"name":"Image","name.unsplash":"Unsplash Photo"},"GEllipse":{"name":"Ellipse","type.arc":"Open","type.chord":"Closed","type.pie":"Pie"},"GRectangle":{"name":"Rectangle"},"GCompoundShape":{"name":"Compound Shape"},"GLayer":{"name":"Layer"},"GGroup":{"name":"Group"},"GScene":{"name":"Scene","page":"Page"},"GPage":{"name":"Page"},"GSymbol":{"name":"Symbol"},"GPolygon":{"name":"Polygon"},"GPath":{"name":"Path"},"GCompoundPath":{"name":"Compound Path"},"GPathsGraph":{"name":"Graphic Network"},"GText":{"name":"Text"},"GCollabText":{"name":"Collaborative Text"},"GScenePaintConfiguration":{"paint.full":"Full","paint.fast":"Fast","paint.outline":"Outline","paint.output":"Output"},"GSlice":{"name":"Slice"},"GBlurEffect":{"name":"Blur"},"GShape":{"name":"Shape"},"GConnector":{"name":"Connector"},"GGLBlurEffect":{"name":"Blur"},"GGLBrightnessContrastEffect":{"name":"Brighness/contrast"},"GGLBulgePinchEffect":{"name":"Bulge"},"GGLColorHalfToneEffect":{"name":"Halftone"},"GGLDenoiseEffect":{"name":"Denoise"},"GGLDotScreenEffect":{"name":"Dot screen"},"GGLEdgeWorkEffect":{"name":"Edge work"},"GGLHexagonalEffect":{"name":"Hexagonal"},"GGLHueSaturationEffect":{"name":"Hue saturation"},"GGLInkEffect":{"name":"Ink"},"GGLLensBlurEffect":{"name":"Lens blur"},"GGLNoiseEffect":{"name":"Noise"},"GGLSepiaEffect":{"name":"Sepia"},"GGLSwirlEffect":{"name":"Swirl"},"GGLToonEffect":{"name":"Toon"},"GGLBloomEffect":{"name":"Bloom"},"GGLInnerGlowEffect":{"name":"Inner Glow"},"GGLOuterGlowEffect":{"name":"Outer Glow"},"GGLStrokeLayerEffect":{"name":"Stroke","text.outside":"Outside","text.inside":"Inside","text.center":"Center"},"GGLSketchEffect":{"name":"Sketch"},"GGLTiltShiftEffect":{"name":"Tilt shift"},"GGLTrueBlurEffect":{"name":"True blur (slow)"},"GGLUnsharpMaskEffect":{"name":"Unsharp mask"},"GGLVibranceEffect":{"name":"Vibrance"},"GGLVignetteEffect":{"name":"Vignette"},"GGLZoomBlurEffect":{"name":"Zoom blur"},"GGLRecolourEffect":{"name":"Recolor"},"GAdjustMultiEffect":{"name":"Adjust"},"GColorAdjustMultiEffect":{"name":"Color Adjust"},"GGLColorAdjustEffect":{"name":"Color Adjust"},"GColorGradingEffect":{"name":"Color Grading"},"GColorMatrixEffect":{"name":"Color Matrix"},"GColorTransformEffect":{"name":"Color Transform"},"GDropShadowEffect":{"name":"Drop Shadow"},"GContactShadowEffect":{"name":"Contact Shadow"},"GLongShadowEffect":{"name":"Long Shadow"},"GCurvedShadowEffect":{"name":"Curved Shadow"},"GGLBendEffect":{"name":"Bend"},"GGLDrunkEffect":{"name":"Alcohol"},"GGLFisheyeEffect":{"name":"Fisheye"},"GMirrorEffect":{"name":"Mirror"},"GInnerShadowEffect":{"name":"Inner Shadow"},"GOverlayEffect":{"name":"Overlay"},"GLength":{"unit.px":"Pixels","unit.mm":"Millimeters","unit.cm":"Centimeters","unit.in":"Inches","unit.pc":"Picas","unit.pt":"Points","unit.px.short":"px","unit.mm.short":"mm","unit.cm.short":"cm","unit.in.short":"in","unit.pc.short":"pc","unit.pt.short":"pt","unit.cc":"Ciceros","unit.dd":"Didots","unit.ft":"Feet","unit.yd":"Yards","unit.mi":"Miles","unit.km":"Kilometers","unit.m":"Meters","unit.H":"H","unit.Q":"Q","unit.cc.short":"cc","unit.dd.short":"dd","unit.ft.short":"ft","unit.yd.short":"yd","unit.mi.short":"mi","unit.km.short":"km","unit.m.short":"m","unit.H.short":"H","unit.Q.short":"Q"},"GStylable":{"layer.element":"Element","layer.fill":"Fill","layer.border":"Border","border-alignment.inside":"Inside","border-alignment.center":"Center","border-alignment.outside":"Outside","border-marker.circle":"Circle","border-marker.bullet":"Bullet","border-marker.diamond":"Diamond","border-marker.line":"Line","border-marker.linedouble":"Double Line","border-marker.arrow":"Arrow","border-marker.arrowfat":"Fat Arrow","border-marker.arrowline":"Line Arrow","border-marker.arrowdoubleline":"Double Line Arrow","border-marker.arrowlinebar":"Arrow Line Bar","border-marker.arrowpointer":"Arrow Pointer"},"GPaintCanvas":{"blend.normal":"Normal","blend.multiply":"Multiply","blend.screen":"Screen","blend.overlay":"Overlay","blend.darken":"Darken","blend.lighten":"Lighten","blend.colordodge":"Color Dodge","blend.colorburn":"Color Burn","blend.hardlight":"Hard Light","blend.softlight":"Soft Light","blend.difference":"Difference","blend.exclusion":"Exclusion","blend.hue":"Hue","blend.saturation":"Saturation","blend.color":"Color","blend.luminosity":"Luminosity","blend.linearburn":"Linear Burn","blend.lineardodge":"Linear Dodge","blend.linearlight":"Linear Light","blend.vividlight":"Vivid Light","blend.pinlight":"Pin Light","blend.divide":"Divide","blend.add":"Add","blend.subtract":"Subtract","blend.hardmix":"Hard Mix","blend.power":"Power","blend.harmonic":"Harmonic","blend.sin":"Sine","linecap.butt":"Butt","linecap.round":"Round","linecap.square":"Square","linejoin.bevel":"Bevel","linejoin.round":"Round","linejoin.miter":"Miter"},"GPathBase":{"corner.rounded":"Round","corner.inverse-rounded":"Round2","corner.bevel":"Bevel","corner.inset":"Inset","corner.fancy":"Fancy","anchor-point.mirror":"Mirrored","anchor-point.asymmetric":"Disconnected","anchor-point.symmetric":"Asymmetric","anchor-point.connector":"Connector"},"GSketchImport":{"text.unsupported-version":"Unsupported Version. Must be 43 or latest"},"GEPSParser":{"01":"Parts of the EPS file aren’t supported by Corel Vector. They are displayed with blue fills...","02":"Parts of the EPS file aren’t supported by Corel Vector. They are not imported...","03":"The file can\'t be loaded in a timely manner. Stopping...","04":"The file can\'t be loaded.","05":"File loading is canceled."},"GWebGLEffect":{"radius":"Radius","softness":"Softness","bend":"Bend","cov":"Cov","bloomIntensity":"Bloom Int.","baseIntensity":"Base Int.","bloomSaturation":"Bloom Sat.","baseSaturation":"Base Sat.","blurRadius":"Blur Rad.","bloomThreshold":"Bloom Thre.","clip":"Clip","brightness":"Brightness","contrast":"Contrast","centerX":"Center X","centerY":"Center Y","strength":"Strength","angle":"Angle","size":"Size","red":"Red","green":"Green","blue":"Blue","exponent":"Exponent","strengthX":"Strength X","strengthY":"Strength Y","scale":"Scale","hue":"Hue","saturation":"Saturation","intensity":"Intensity","color":"Color","opacity":"Opacity","amount":"Amount","width":"Width","shape":"Shape","ellyptical":"Ellyptical","placement":"Placement","startX":"Start X","startY":"Start Y","endX":"End X","endY":"End Y","gradientRadius":"Gradient Rad.","threshold":"Threshold","quantization":"Quantization"},"GSceneEditor":{"action.insert":"Insert","action.remove":"Remove","action.properties":"Change Properties"},"GPointerTool":{"name":"Pointer","tooltip-title":"Pointer tool","tooltip-description":"Click and drag to create a selection. Click an object to select it. Hold SHIFT to add/remove from selection. Hold ALT to select only objects fully enclosed in marqee"},"GSubSelectTool":{"name":"Subselect","tooltip-title":"Subselect tool","tooltip-description":"Click to select, edit, add and delete anchor points on a path. Click an object to select it."},"GLassoTool":{"name":"Lasso","tooltip-title":"Lasso tool","tooltip-description":"Click and drag to draw an area selecting many anchor points at once."},"GLayerTool":{"name":"Layer","tooltip-title":"Layer tool","tooltip-description":"Click to select objects within a Layer Group."},"GSliceTool":{"name":"Slice","tooltip-title":"Slice tool","tooltip-description":"Click and drag to define a specific area of your artwork to be exported as an asset."},"GPenTool":{"name":"Pen","tooltip-title":"Pen tool","tooltip-description":"Click and drag to create a starting point. Hold SHIFT to constrain it in 45°. Hold D to use Subselect tool."},"GBezigonTool":{"name":"Bezigon","tooltip-title":"Bezigon tool","tooltip-description":"Click and drag to create a starting point. Hold ALT to create a perfect curve. Hold SHIFT to constrain it in 45°."},"GFreehandTool":{"name":"Freehand","action.create-freehand-path":"Create freehand path","tooltip-title":"Freehand tool","tooltip-description":"Click and drag to start drawing. Hold D to use Subselect tool."},"GMagicTool":{"name":"Freehand shaping","tooltip-title":"Freehand shaping","tooltip-description":"Click and drag to add or subtract from an object."},"GKnifeTool":{"name":"Knife","action.cut-shape":"Cut shape(s)","tooltip-title":"Knife tool","tooltip-description":"Click a vector object to slice it."},"GLineTool":{"name":"Line","tooltip-title":"Create line","tooltip-description":"Click, drag and release to create a straight line. Hold ALT to create from center point. Hold SHIFT to constrain it in 45°."},"GRectangleTool":{"name":"Rectangle","tooltip-title":"Create rectangle","tooltip-description":"Click and drag to create a rectangle. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GEllipseTool":{"name":"Ellipse","tooltip-title":"Create ellipse","tooltip-description":"Click and drag to create an ellipse. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GPolygonTool":{"name":"Polygon","tooltip-title":"Create polygon","tooltip-description":"Click and drag to create a polygon. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GTriangleTool":{"name":"Triangle","tooltip-title":"Create triangle","tooltip-description":"Click and drag to create a triangle. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GStarTool":{"name":"Star","tooltip-title":"Create star","tooltip-description":"Click and drag to create a star. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GTextTool":{"name":"Text","your-text-here":"Your text here","action.insert-text":"Insert text","tooltip-title":"Text tool","tooltip-description":"Click to create text. "},"GHandTool":{"name":"Pan","tooltip-title":"Pan tool","tooltip-description":"Click and drag to pan view."},"GZoomTool":{"name":"Zoom","tooltip-title":"Zoom tool","tooltip-description":"Click to zoom in about a point. Hold ALT and click to zoom out. Click and drag to create a zoom in area."},"GEditor":{"action.delete-selection":"Delete Selection","action.resize-selecion":"Resize Selection","action.transform-clone-selection":"Transform & Clone Selection","action.transform-selection":"Transform Selection","action.insert-elements":"Insert Element(s)","action.change-elements":"Change Elements","action.insert-image":"Insert Image(s)","action.convert-to-paths":"Convert to Path(s)","action.arrange-order":"Arrange Order","action.arrange-alignment":"Arrange Alignment","action.inline-editing":"Inline Editing","action.move":"Move","action.drag-style":"Drag Style"},"GGradientStyleEditor":{"text.gradient":"Gradient","action.add-gradient-stop":"Add Gradient Stop"},"GPathsGraphTool":{"action.append-point":"Append Point","action.insert-elements":"Insert Element(s)","action.insert-point":"Insert Point","action.move-point":"Move Point","action.delete-point":"Delete Point","action.modify-point-properties":"Modify Point Properties","action.modify-path-properties":"Modify Path Properties"},"GPathTool":{"action.append-point":"Append Point","action.insert-elements":"Insert Element(s)","action.insert-point":"Insert Point","action.move-point":"Move Point","action.delete-point":"Delete Point","action.modify-point-properties":"Modify Point Properties","action.modify-path-properties":"Modify Path Properties","action.join-paths":"Join Paths"},"GShapeTool":{"action.insert-elements":"Insert Element(s)"},"GSelectTool":{"action.insert-path-point":"Insert Path Point","action.transform-clone-selection":"Transform & Clone Selection","action.transform-selection":"Transform Selection","action.modify-element":"Modify %element","text.element":"Element"},"GCompoundShapeEditor":{"action.drop-pattern":"Drop Pattern"},"GImageEditor":{"action.crop-image":"Crop Image"},"GInlineTextEditor":{"action.modify-text-properties":"Modify text properties"},"GShapeEditor":{"action.drop-pattern":"Drop Pattern"},"GTextEditor":{"action.drop-font":"Drop Font","action.modify-text-properties":"Modify text properties","action.edit-text":"Edit text"},"GPageEditor":{"action.resize-pages":"Resize pages"},"GFillTool":{"action.modify-fill":"Modify Fill"},"GEditorWidget":{"action.remove-guide-line":"Remove guide line","action.change-guide-line":"Change guide line","action.add-guide-line":"Add guide line","action.insert-master-symbol":"Insert master symbol"},"GKey":{"key.1":"Space","key.2":"Enter","key.3":"Tab","key.4":"Backspace","key.5":"Control","key.5.short":"Ctrl","key.6":"Shift","key.7":"Alt","key.8":"Left","key.9":"Up","key.10":"Right","key.11":"Down","key.12":"Page Up","key.13":"Page Down","key.14":"Home","key.15":"End","key.16":"Insert","key.16.short":"Ins","key.17":"Delete","key.17.short":"Del","key.18":"Escape","key.18.short":"Esc","key.19":"Command","key.19.short":"Cmd","key.30":"F1","key.31":"F2","key.32":"F3","key.33":"F4","key.34":"F5","key.35":"F6","key.36":"F7","key.37":"F8","key.38":"F9","key.39":"F10","key.40":"F11","key.41":"F12"},"GPDFExport":{"text.wait":"Please wait! This might take a little while..."},"GInfo":{"text.title":"You haven\'t activated your account yet. Please do so until %date, or it will be deactivated.","text.resend-email":"Resend email here","text.email-sent":"Email sent.","text.email-sent-submessage":"Please be sure to also check the spam/junk folder of your email client.","text.something-went-wrong":"Something is wrong.","text.save-message":"Please save your file regularly, progress will be lost when you leave this tab.","text.check-in-message":"Please don’t forget to \\"Check In\\" the file, to allow collaborators to see your changes."},"GVersionHistoryProperties":{"error-loading":"Error while loading versions. Please try again in a few minutes.","title":"Version History","edit-version":"Edit this version","close-preview":"Close preview","preview":"Preview","restore":"Restore","text.current-version":"Current version","text.version":"Version %version","text.title-manual-save-tooltip-title":"These versions were saved manually","text.title-auto-save-tooltip-title":"These versions were created via auto-save","text.title-manual-save":"Manual Saves","text.title-auto-save":"Auto-Saves"},"GDeveloperDetailsAction":{"title":"Send Developer Details","message":"Please send the provided text file to our support team at <a href=\\"%link\\" title=\\"Support\\" target=\\"_blank\\">%link.</a>"},"GWarnLinkedImageDialog":{"warn-linked-image.text":"Linked images will not be available when opening your file on another computer or in the web app.","warn-linked-image.proceed":"Proceed","warn-linked-image.cancel":"Cancel","warn-linked-image.never-remind":"Don\'t show anymore"},"GEmbeddedLogin":{"text.title":"Welcome to Corel Vector","text.pop-has-been-blocked":"The pop-up has been blocked. To log in using your %provider credentials, please allow all %app pop-ups and reload this page, or click <a>here</a>."},"GLoginDialog":{"text.sign-in-title":"Please log in to your Corel Vector account to continue.","text.not-register":"Don\'t have an account yet?","text.sign-up":"Create your FREE account.","text.placeholder-sign-in-login":"Email","text.sign-in-login":"Username / Email address","text.placeholder-sign-in-password":"Password (min 6 chars.)","text.sign-in":"Log in","text.or":"- or -","text.sign-facebook":"Log In With Facebook","text.sign-google":"Log In With Google","text.signup-facebook":"Create Account With Facebook","text.signup-google":"Create Account With Google","text.forgot-password":"Forgot your password?","text.sign-up-title":"Create your FREE account then start designing.","text.already-registered":"Already have an account?","text.back-sign-in":"Go back to log in","text.placeholder-sign-up-email":"Your email","text.placeholder-sign-up-username":"Your username","text.placeholder-sign-up-password":"Choose a password (min 6 chars.)","text.agree":"I agree to the","text.terms-use":"Terms of Use","text.privacy-policy":"Privacy Policy","text.newsletter":"Subscribe me to the Corel Vector Newsletter","text.sign-up-now":"Start Now!","text.reset-password-title":"We will send a link to this email address to reset your password.","text.reset-password-header-title":"Reset password","text.reset-password-send":"Send Request","text.placeholder-reset-password-email":"Email","text.sign-up-thanks":"The account was created successfully. Please, check your email.<br><br>We have sent a confirmation to %email. Please click on the link in this email to activate your account.<br><br>If you don\'t activate your account in 3 days it will be automatically deactivated.","text.ok":"OK","text.login-dialog-title":"Start using Corel Vector","text.continue-without-loggin-in":"Continue without logging in","text.login-here":"Log in here.","text.placeholder-sign-up-first-name":"First Name","text.placeholder-sign-up-last-name":"Last Name","text.you-are-offline":"You are offline. Please reestablish your connection to proceed.","text.sign-in-button":"SIGN IN","text.sign-in-password":"Password","text.enterprise-sign-in-message":"CorelDRAW.app Enterprise users, sign in with your<br/> Microsoft 365 or Google Workspace account.<div class=\'highlight-top\'>*</div>","text.enterprise-login-message-1":"<div class=\'highlight\'>*</div> Note: CorelDRAW.app Enterprise sign-in is available exclusively to companies signed-up for a CorelDRAW.app Enterprise License.","text.enterprise-login-message-2":"If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator","text.enterprise-sign-microsoft":"Sign in with Microsoft 365","text.enterprise-sign-google":"Sign in with Google Workspace"},"GConfirmationDialog":{"text.confirm-info-save":"A confirmation with a summary of the order has been sent to %email. Your design will be saved now.","text.confirm-info-export":"A confirmation with a summary of the order has been sent to %email. Your design will be exported now.","text.confirm-save":"Save design","text.confirm-export":"Export design","text.confirm-resend":"Resend it here"},"GPaywallDialog":{"text.paywall-info":"You can continue to edit this design for free. If you want to save or export it, you need to pay","text.paywall-buy":"Buy now for","text.paywall-edit":"Edit for free","text.paywall-bought":"You already bought this product"},"GPurchasePanel":{"text.purchased-expires":"expires on %date","text.subscription-ends":"valid until %date","text.pro-subscription-lifetime":"%app Lifetime Subscription","text.pro-subscription":"%app Subscription","text.orderby-label":"Order By:","text.orderby-number":"Order number","text.orderby-name":"Name","text.orderby-price":"Price","text.orderby-date":"Date","text.orderno":"Order nº","text.purchased":"Purchased on","text.search-label":"Search Product","text.purchased-renews":"renews on","text.change-subscription":"Change subscription","text.placeholder-password":"Use %min-number to %max-number characters","text.placeholder-address":"Street name and number","text.empty-search":"Your search term didn’t match any product, please try again.","text.prompt-cancel-title":"Do you really want to cancel this subscription?","text.prompt-cancel-info":"When canceling your %app subscription you can use features until %date.<br/>After that, you need to purchase again.","text.prompt-activate-title":"Do you really want to activate this subscription?","text.prompt-activate-info":"Activating your subscription the next billing will be on %date","text.prompt-activate-label":"Activate","text.contact-partner-billing":"Please %partner% if you want to change your billing details or you have questions about your order.","text.contact-partner-cb":"contact our partner Cleverbridge","text.contact-partner-billing-alternative":"Please contact our partner %partner% if you want to change your billing details or you have questions about your order.","text.contact-partner-cleverbridge":"Cleverbridge"},"GProfileDialog":{"text.purchases":"Purchases","text.details":"Account details","text.change-password":"Change password","text.avatar-tooltip":"PNG or JPG, 100 kB. max.","text.avatar-size-too-big":"Please keep image under 100 kB"},"GChangePasswordPanel":{"text.change-password":"Choose your new password for %name","text.set-password":"Choose the password for %name","text.assign":"Assign New Password","text.new-password":"New password","text.confirm-password":"Confirm new password","text.placeholder-new-password":"New password","text.placeholder-confirm-password":"Confirm new password","text.reset-password-info":"Please choose a new password","text.set-password-info":"Please set a password for your account","text.reset-password-done":"Your password has been changed successfully.","text.new-password-tip":"Use %min-number to %max-number characters"},"GAccountPanel":{"text.user-email-message":"Changing your email address requires to activate your account again. It will be done after you have clicked on the link in the confirmation we have sent to %email.","text.contact":"Contact details","text.account-name":"Name","text.username":"Username","text.email":"Email","text.old-password":"Old Password","text.new-password":"New Password","text.billing":"Billing Address","text.address":"Address","text.city":"City","text.state":"State/Province/Region","text.zip":"ZIP","text.country":"Country","text.save":"Save","text.delete":"Delete Account","text.error":"Ooops! Something went wrong.","text.please-wait":"Please, wait...","text.success":"Details changed successfully","text.confirm-delete-account":"Do you really want to delete your Corel Vector account?","text.reset-password-info":"Please choose a new password","text.reset-password-done":"Your password has been changed successfully.","text.contact-partner-cb":"contact our partner Cleverbridge","text.contact-partner-billing":"Please %partner% if you want to change your billing details.","text.contact-partner-billing-alternative":"Please contact our partner %partner% if you want to change your billing details.","text.contact-partner-cleverbridge":"Cleverbridge","text.all-files-cloud":"all files in the Cloud","text.all-dicussion-comments":"all Corel Vector Discussion comments","text.purchased-items-and-sub":"all purchased items and subscriptions","text.action-cant-undone":"This action can\'t be undone!","text.first-name":"First name","text.last-name":"Last name","text.email-address":"Email address","text.delete-account-title":"Do you really want to delete your Corel Vector account?","text.delete-account-sub-title":"You will lose","text.delete-account-list-1":"all files in the Cloud","text.delete-account-list-2":"all Corel Vector Discussion comments","text.delete-account-list-3":"all purchased items and subscriptions","text.delete-account-action-cant-undone":"This action can\'t be undone!","text.name-usage-tips":"Your name will be used if you are adding a comment or annotation, your email address when receiving notifications.","text.update-name-link-text":"Update the user name in my Corel account.","text.view-your-account":"View your %partner% %icon%","text.account-view-link-text":"account settings on corel.com "},"GImportedFontsProvider":{"confirm.delete-font":"Are you sure you want to delete this font?"},"GLocalFontsProvider":{"text.permission-required-title":"Permission required to access system fonts!","text.permission-required-subtitle-edge":"To allow the app to access your system fonts, click on the padlock (🔒) icon in the address bar, next to the website name, then select the \'Allow\' option from the \'Fonts\' dropdown. Save your work & reload the website to begin using system fonts.","text.permission-required-subtitle-others":"To allow the app to access your system fonts, click on the padlock (🔒) icon in the address bar, next to the website name, then toggle the gray switch in the \'Fonts\' section. Save your work & reload the website to begin using system fonts.","text.current-browser-unsupported":"This browser does not support system fonts. This feature is available on Chrome, Edge & Opera."},"GAlignAction":{"title.align-left":"Align Left","title.align-center":"Align Center","title.align-right":"Align Right","title.align-top":"Align Top","title.align-middle":"Align Middle","title.align-bottom":"Align Bottom","title.align-justify-horizontal":"Same Width","title.align-justify-vertical":"Same Height","text.align-left-tooltip-title":"Align Left","text.align-left-tooltip-description":"Align all selected objects to the left side of the left-most object.","text.align-center-tooltip-title":"Align Center","text.align-center-tooltip-description":"Aligns all selected objects to the center of the selection bounding box.","text.align-right-tooltip-title":"Align Right","text.align-right-tooltip-description":"Align all selected objects to the right side of the right-most object.","text.align-top-tooltip-title":"Align Top","text.align-top-tooltip-description":"Align all selected objects to the top side of the top-most object.","text.align-middle-tooltip-title":"Align Middle","text.align-middle-tooltip-description":"Align all selected objects to the middle of the selection bounding box.","text.align-bottom-tooltip-title":"Align Bottom","text.align-bottom-tooltip-description":"Align selection to Bottom of a bounding box or page."},"GArrangeAction":{"title.send-front":"Bring to Front","title.bring-forward":"Bring Forward","title.send-backward":"Send Backward","title.send-back":"Send to Back","bring-forward-tooltip-title":"Bring element forward","bring-forward-tooltip-description":"Bring an element up in the layer hierarchy.","send-backward-tooltip-title":"Send element backward","send-backward-tooltip-description":"Send an element down in the layer hierarchy."},"GCancelCropAction":{"title":"Cancel Cropping"},"GClipAction":{"title":"Clip Selection","text.clip-selecion":"Clip Selection","tooltip-title":"Create a clip","tooltip-description":"Create a mask for an object. Click twice to edit the clipped object."},"GConnectLinesAction":{"title":"Connect Paths Lines"},"GConvertToPathAction":{"title":"Convert to Path","tooltip-title":"Convert to path","tooltip-description":"Convert the selected shape into a path."},"GConvertToRawPathAction":{"title":"Convert to Raw Path"},"GCreateNestedCompoundAction":{"title":"Create Nested Compound"},"GCreateSymbolAction":{"title":"Create Symbol","createsymbol.enternewname":"Enter new symbol name:","createsymbol.defaultname":"Symbol","common.nosymbolsdefined":"No symbols defined.","common.nosymbolsdefined-info":"Symbols let you reuse content in your design. Create a Symbol with the “+” icon from your selected element(s).","tooltip-title":"Create Symbol","tooltip-description":"Turn the element into a new Symbol."},"GCropAction":{"title":"Confirm Cropping"},"GDetachSymbolAction":{"title":"Detach Symbol Instance","text.number-detached":"Detach symbol %number"},"GResetInstanceAction":{"title":"Reset Instance"},"GCutCopyAction":{"title.cut":"Cut","title.copy":"Copy","text.cut-selection":"Cut Selection","text.security-issues":"<p>Due security permissions we can not access your system clipboard.<br/> Please use the following shortcut instead to %cutcopy:</p><p style=\'text-align: center;font-size:16px;margin-top: 20px\'>%shortcut</p>"},"GDeleteAction":{"title":"Delete"},"GDeselectAllAction":{"title":"Deselect All"},"GDistributeAction":{"title.horizontal":"Distribute Horizontally","title.vertical":"Distribute Vertically","text.horizontal-tooltip-title":"Distribute Horizontally ","text.horizontal-tooltip-description":"Distribute selected objects horizontally so that the distance between them is equal.","text.vertical-tooltip-title":"Distribute Vertically","text.vertical-tooltip-description":"Distribute selected objects vertically so that the distance between them is equal."},"GDuplicateAction":{"title":"Duplicate"},"GEditElementActon":{"title":"Edit Selection"},"GExportAction":{"title":"Advanced Export...","title.advanced-options":"Advanced Options...","text.save-before-export":"Do you want to save this file before exporting?","tooltip-title":"Export","tooltip-description":"Export your document or selection.","text.try-this-feature-pro-tooltip-title":"Advanced Export","text.try-this-feature-pro-tooltip-description":"Export your document or selection with advanced options.","text.try-export-pdf-advanced-setting-tooltip-title":"Advanced PDF Export","text.try-export-pdf-advanced-setting-tooltip-description":"Export your document or selection to a PDF with advanced options."},"GFitAllAction":{"title":"Fit All","tooltip-title":"Fit All","tooltip-description":"Click to fit all objects in the viewport to the screen."},"GFitCurrentLayerAction":{"title":"Fit Layer"},"GFitSelectionAction":{"title":"Fit Selection"},"GGroupAction":{"title":"Group Selection","tooltip-title":"Group items","tooltip-description":"Group selected elements."},"GInvertSelectionAction":{"title":"Invert Selection"},"GJoinPathsAction":{"title":"Join Paths"},"GMergeMainAction":{"title":"Create Compound"},"GMergeSubAction":{"title.union":"Union","title.difference":"Difference","title.intersect":"Intersect","title.subtract":"Subtract","tooltip.union.title":"Union","tooltip.union.description":"Merge the area of two elements.","tooltip.difference.title":"Difference","tooltip.difference.description":"Create a shape with the parts of the selected elements that don\'t overlap.","tooltip.intersect.title":"Intersect","tooltip.intersect.description":"Create a shape with the overlapping are of the selected elements.","tooltip.substract.title":"Subtract","tooltip.substract.description":"Subtract the are of the lower object.","transaction.merge":"Merge","transaction.combine":"Combine"},"GNewAction":{"title":"New Design..."},"GNewWindowAction":{"title":"New View"},"GNewClipboardAction":{"title":"New from Clipboard"},"GOffsetAction":{"title":"Expand/Shrink","text.dialog-prompt-message":"Enter a positive value for offset or negative for inset:","text.invalid-value":"Entered invalid number for offset value."},"GOriginalViewAction":{"title":"Original-View"},"GOutlineAction":{"title":"Convert to Outline","text.dialog-prompt-message":"Enter a positive value for the outline:","text.invalid-value":"Entered invalid number for outline value."},"GVectorizeBorderAction":{"title":"Vectorize Border","tooltip-title":"Vectorize Border","tooltip-description":"Convert a border into a shape."},"GVectorizeImageAction":{"title":"Vectorize Image"},"GConvertToImageAction":{"title":"Flatten"},"GAttachToPathAction":{"title":"Attach Text to Path"},"GDetachFromPathAction":{"title":"Detach Text from Path"},"GOutlineViewAction":{"title":"Outline View"},"GFastViewAction":{"title":"Fast View"},"GPaste":{"action.paste":"Paste","action.paste-image":"Paste Image"},"GPasteAction":{"title":"Paste","text.security-issues":"<p>Due security permissions we can not access your system clipboard.<br/>Please use the following shortcut instead to paste:</p><p style=\'text-align: center;font-size:16px;margin-top: 20px\'>%shortcut</p>"},"GPasteAndReplaceAction":{"title":"Paste and Replace"},"GEyeDropperAction":{"title.fill":"Choose a fill color","title.border":"Choose a border color"},"GEnterLayerGroupAction":{"title":"Enter layer group","title.reverse":"Leave layer group"},"GRenameLayerAction":{"title":"Rename a layer"},"GCycleThroughLayersAction":{"title.next":"Select next layer","title.previous":"Select previous layer","title":""},"GLockLayerAction":{"title":"Lock a layer"},"GToggleLayerVisibilityAction":{"title":"Hide a layer"},"GTogglePaintLayersVisibilityAction":{"title.fill":"Toggle fills","title.border":"Toggle borders"},"GChangeOpacityAction":{"title":"Change opacity","full-title":"Set opacity to %value"},"GCloseActiveWindowAction":{"title":"Close window"},"GChangeAnchorPointsJointTypeMainAction":{"title":"Change anchor point joint type"},"GChangeAnchorPointsJointTypeSubAction":{"title.straight":"Change anchor point joint type to Straight","title.mirrored":"Change anchor point joint type to Mirrored","title.disconnected":"Change anchor point joint type to Disconnected","title.connector":"Change anchor point joint type to Connector","title.asymmetric":"Change anchor point joint type to Asymmetric"},"GToggleMultiPageModeAction":{"title":"Toggle multipage mode"},"GChangeActivePageAction":{"title.next":"Select next page","title.previous":"Select previous page"},"GChangeActiveWindowAction":{"title.next":"Select next tab","title.previous":"Select previous tab"},"GSwapPaintLayersAction":{"title":"Swap fill and border"},"GCreateNewLayerAction":{"title":"Create new layer"},"GShowShortcutsAction":{"title":"Show Keyboard Shortcuts"},"GPasteInPlaceAction":{"title":"Paste In Place"},"GPasteInsideAction":{"title":"Paste Inside Selection"},"GPasteHereAction":{"title":"Paste Here"},"GPasteStyleAction":{"title":"Paste Style"},"GPrintAction":{"title":"Print...","printing-disabled":"Printing is disabled due to technical problems. Please export a PDF file and print it in your favorite PDF reader.","printing-warning":"This device doesn\'t support printing at high quality. If you want to have better quality, please export a PDF document instead and print in your application of choice."},"GRedoAction":{"title":"Redo","redo-action":"Redo %action","tooltip-title":"Redo","tooltip-description":"Redo last undone operation."},"GReverseOrderAction":{"title":"Reverse Order"},"GSaveAction":{"title":"Save","title-download":"Download","tooltip-title":"Save your document","tooltip-description":"Save your progress on the current file.","has-new-version-when-save-message":"There is a newer version of this file in the cloud. Should it still be saved or do you want to reload? Please note: Reloading may lose progress.","has-new-version-when-save-reload":"Reload","has-new-version-when-save-save":"Save"},"GSaveAllAction":{"title":"Save All"},"GSaveAsAction":{"title":"Save as...","text.save-common":"%title (.%fileExtension)","text.save-pdf":"%title (.%fileExtension) at %dpiValue%dpiString","text.dpi-value":"%dpiValue %dpiString","text.dpi":"dpi","text.try-this-feature-pro-tooltip-title":"Quickly export a PDF document at 300dpi."},"GOpenAction":{"title":"Open Local File..."},"GQuitAction":{"title":"Quit"},"GSharePoint":{"error.title-found-special-chars":"You have entered an invalid file/folder name: %fileName%. Some symbols that are not allowed: %symbols%. Also there are some additional restrictions. Please try again.","error.unknown":"Unknown Error"},"GOneDriveBusiness":{"error.no-file-found":"Error occured. No file found","error.processing-api":"Error occured while processing request to One Drive Business API. Please try again later or contact support from Help > Contact us.","error.not-enough-parameters":"Error. Some parameters are not specified","error.title-found-special-chars":"You have entered an invalid file/folder name: %fileName%. Some symbols that are not allowed: %symbols%. Also there are some additional restrictions. Please try again."},"GImportFontsAction":{"title":"Add Fonts...","text.try-this-feature-pro-tooltip-title":"Add Fonts","text.try-this-feature-pro-tooltip-description":"Add your custom fonts to Corel Vector. Find them in the “Imported” tab in the Font selector."},"GClearFontsAction":{"title":"Clear imported fonts..."},"GSelectAllAction":{"title":"Select All"},"GSettingsAction":{"title":"Settings..."},"GShowGridAction":{"title":"Show Grid"},"GShowGuideLinesAction":{"title":"Show Guide Lines"},"GShowSymbolLabelsAction":{"title":"Show Symbol Labels"},"GShowRulersAction":{"title":"Show Rulers"},"GShowSlicesAction":{"title":"Show Slices"},"GShowEffectsAction":{"title":"Show Effects"},"GShowSelectionHandlesAction":{"title":"Show Selection Handles"},"GSimplifyAction":{"title":"Simplify Path","text.tolerance":"&nbsp;&nbsp;&nbsp;% Tolerance","text.simplification":"Path simplification","text.invalid-value":"Entered invalid number for pixel tolerance."},"GSnapUnitAction":{"title.full":"Snap to Full Units","title.half":"Snap to Half Units"},"GSplitAction":{"title":"Ungroup Selection","tooltip-title":"Ungroup items","tooltip-description":"Ungroup selected group of elements."},"GSplitLineAction":{"title":"Break Curve"},"GSplitPathAction":{"title":"Split Path"},"GToggleSnapAction":{"title":"Use Snapping","tooltip-title":"Snap","tootlip-title-action":"Use Snapping","tooltip-description":"Click to enable snapping."},"GToggleSnapZonesAction":{"title":"Use Snap Zones","tooltip-title":"Snap zones","tooltip-description":"Click to enable use of snap zones."},"GTransformAction":{"title.rotate-45-left":"Rotate 45° Left","title.rotate-90-left":"Rotate 90° Left","title.rotate-180-left":"Rotate 180° Left","title.rotate-45-right":"Rotate 45° Right","title.rotate-90-right":"Rotate 90° Right","title.rotate-180-right":"Rotate 180° Right","title.flip-vertical":"Flip Vertical","title.flip-horizontal":"Flip Horizontal","flip-horizontal-tooltip-title":"Flip Horizontal","flip-horizontal-tooltip-description":"Flip an object horizontally.","flip-vertical-tooltip-title":"Flip Vertical","flip-vertical-tooltip-description":"Flip an object vertically.","rotate-90-left-tooltip-title":"Rotate left","rotate-90-left-tooltip-description":"Rotate 90° to the left.","rotate-90-right-tooltip-title":"Rotate right","rotate-90-right-tooltip-description":"Rotate an object 90° to the right."},"GUndoAction":{"title":"Undo","undo-action":"Undo %action","tooltip-title":"Undo","tooltip-description":"Revert last operation. Click multiple times to go even further in edit history."},"GZoomInAction":{"title":"Zoom in","tooltip-title":"Zoom in","tooltip-description":"Click to zoom in about a point."},"GZoomOutAction":{"title":"Zoom out","tooltip-title":"Zoom out","tooltip-description":"Click to zoom out about a point."},"GSelectByFontTypeAction":{"title":"Font Type"},"GSelectByBlendModeAction":{"title":"Blend Mode"},"GSelectByBorderWidthAction":{"title":"Border Width"},"GSelectByPaintLayerAction":{"title.fill":"Fill","title.border":"Border","title.fill_border":"Fill & Border"},"GSelectByShapeAction":{"title":"Shape"},"GSelectByTransparencyAction":{"title":"Transparency"},"GSelectByEffectAction":{"title":"Effect"},"GToggleSidebarAction":{"title":"Show %s Panel"},"GPlaceImportAction":{"title":"Place Image...","tooltip-title":"Place image","tooltip-description":"Import an image from your computer."},"GLinkImageAction":{"title":"Link Image...","tooltip-title":"Link image","tooltip-description":"Import an image with a link to the original on your computer."},"GPlayAction":{"title":"Play/Present...","text.exit-full-screen":"Press %key to exit full screen","text.esc":"esc"},"GToggleFullscreenAction":{"title":"Toggle Fullscreen...","fullscreen-banner":"Press Alt + Enter to exit fullscreen mode"},"GNewFromTemplateAction":{"title":"New Design from Template..."},"GGravitCloudAction":{"title.new":"New Cloud File","title.open":"Open from Cloud...","title.save":"Save","title.save-as":"Save to Cloud as..."},"GVersionsHistoryAction":{"title":"Show Version History","unsaved-modifications":"Please save your design before showing the version history to avoid losing progress","text.try-this-feature-pro-tooltip-title":"Show Version History","text.try-this-feature-pro-tooltip-description":"Show saved versions of the current design and access up to 20 past versions."},"GOpenLinkAction":{"title.blog":"Blog","title.changelog":"What\'s New","title.discussion":"Forum","title.tutorials":"Tutorials","title.contact-us":"Contact Us","title.feedback":"Give Feedback","title.user-guide":"User Guide","title.eula":"End User License Agreement","title.request-new-feature":"Request New Feature","text.join-community":"Join the Community","title.open-a-ticket":"Open a Ticket"},"GOpenRecentAction":{"title":"No Recent Files"},"GMaskWithShapeAction":{"title":"Mask with Shape","text.mask":"Mask"},"GPurchaseProAction":{"title":"UPGRADE NOW"},"GEnhancedTooltipsAction":{"title":"Display Enhanced Tooltips"},"GSymbolsSidebar":{"text.symbols":"Symbols","action.delete-symbol":"Delete Symbol","action.create-symbol":"Create New Symbol","title":"Symbols","text.delete-symbol-tooltip-title":"Delete Symbol","text.delete-symbol-tooltip-description":"Delete the selected symbol.","text.create-symbol-tooltip-title":"Create New Symbol","text.create-symbol-tooltip-description":"Turn the selected element into a new Symbol."},"GOutlineSidebar":{"title":"Layers","text.pages":"Pages","action.toggle-page-mode":"Toggle Single / Multipage Mode","action.delete-active-page":"Delete Active Page","action.create-new-page":"Create New Page","text.layers":"Layers","text.layer":"Layer","action.delete-layer-item":"Delete Layer or Item","action.new-layer":"New Layer","action.insert-page":"Insert Page","action.delete-page":"Delete Page","action.move-page":"Move Page","action.insert-layer":"Insert Layer","action.move-layer":"Move Layer/Item","text.multipage-alert":"One of your pages is set to Infinite Canvas. Please change to a fixed size to be able to enter Multipage mode.","text.confirm-delete-masterpage":"This page is currently used as a Master page. Do you want to delete?","action.change-active-page":"Change active page","text.multipage-tooltip-title":"Multipage mode","text.multipage-tooltip-description":"Show all pages of the document in a grid side by side.","text.delete-page-tooltip-title":"Delete page","text.delete-page-tooltip-description":"Delete the selected page.","text.create-new-page-tooltip-title":"Create new page","text.create-new-page-tooltip-description":"Create a new page with the properties of the currently selected one.","text.delete-layer-tooltip-title":"Delete layer","text.delete-layer-tooltip-description":"Delete selected object or layer.","text.new-layer-tooltip-title":"Create new layer","text.new-layer-tooltip-description":"Create a new layer group."},"GInspectorSidebar":{"title":"Inspector"},"GCategory":{"category.account":"Account","category.file":"File","category.file.save-as":"File/Save as","category.edit":"Edit","category.edit.paste":"Edit/Paste","category.edit.select-same":"Edit/Select Same","category.modify":"Modify","category.modify.combine":"Modify/Create Compound Shape","category.modify.arrange":"Modify/Arrange","category.modify.align":"Modify/Align","category.modify.transform":"Modify/Transform","category.modify.path":"Modify/Path","category.modify.symbol":"Modify/Symbol","category.view":"View","category.view.magnification":"View/Magnification","category.view.canvas":"View/Canvas","category.view.snap":"View/Snap to","category.help":"Help","category.file.gravit-cloud":"File/Corel Vector","category.help.language":"Help/Language","category.help.switchwebcdr":"Help/CDGS server","category.help.support":"Help/Support","category.help.learn":"Help/Learn","category.file.import":"File/Import","category.file.import.image":"File/Import/Place Image...","category.file.export":"File/Export","category.file.export.pdf":"File/Export/PDF Document (.pdf)","category.file.open-recent":"File/Open Recent","category.file.share":"File/Share","category.view.mode":"View/View Mode","category.help.beta_feedback":"Help/Beta Feedback"},"GDocument":{"text.cloud-file-modified":"\'%title\' has been modified, do you want to replace it?","text.default-document-name":"Untitled","file-type.cdrapp":"CorelDRAW Design","file-type.gvdesign":"Corel Vector Design","file-type.cdr":"CorelDRAW Document","file-type.des":"Corel DESIGNER Document","file-type.pdf":"PDF Document","file-type.ai":"Adobe Illustrator Artwork Document","file-type.png":"PNG Image","file-type.jpeg":"JPEG Image","file-type.svg":"Scalable Vector Graphics","file-type.svgz":"Compressed SVG","file-type.eps":"Encapsulated PostScript","file-type.sketch":"Sketch File","text.import-from-pdf":"Import Page(s) from PDF","text.import-from-ai":"Import Adobe Illustrator Artwork","text.ai-not-pdf-compatible":"This Adobe Illustrator file isn’t compatible with Corel Vector, please follow the instructions in the file.","text.import-from-eps":"Import EPS","title.save-gvdesign":"Save to Local File as...","title.download-gvdesign":"Download File","title.save-cdrapp":"Save to file...","title.download-cdrapp":"Download File...","text.sync-to-cloud-error":"Could not save to cloud","text.sync-from-cloud-error":"Could not load from cloud","text.image-too-big":"You are attempting to upload a huge image, that may impact the performance of Corel Vector.<br/>Please try to reduce the image size before importing (max. 10MB, 64 megapixels).","text.image-in-design-too-big":"The design contains image which is too big for the current working environment. It may be displayed incorrectly or impact the performance of Corel Vector.","text.error-reading-file":"Can’t open file. Please make sure that the file exists, you have proper read access to it, it is not in directory synced with OneDrive, and you have an active network connection.","text.unsupported-file-extension":"This file format isn’t supported by Corel Vector.","text.suggestion-open-image":"This file can’t be open directly. Please use “File > Import > Place Image...”","text.save-your-progress":"Save your progress to proceed","text.reload-warning":"We are currently doing some important maintenance work. Please save your design in the next five minutes to avoid loss of progress!","text.unsupported-sketch-version-50+":"This Sketch file was created in version 50+, which isn’t supported by Corel Vector yet.","text.default-export-author":"Corel Vector","text.default-export-producer":"Corel Vector PDF Exporter","text.opening-your-image":"Opening your image...","text.keep-fonts-eps":"Keep Font Information","text.account-deactivated":"Hi %name, we see that you haven’t activated your account yet. This is required in order to use %app. Please <a>click here</a> to get another activation email. In this email, follow the link to activate your account.","text.cannot-save":"Cannot save contents. Remove some layers or undo few steps and try again. And report us this bug!","title.save-cdr":"Save to CorelDRAW file...","title.save-des":"Save to Corel DESIGNER file...","title.download-cdr":"Download CorelDRAW File...","title.download-des":"Download Corel DESIGNER File...","text.saveing-error":"There was a problem saving your file. Please download it from File > Download to prevent losing progress. If the problem persists, please contact support via Help > Support > Contact us","text.save-no-space":"There was no enough space on your disk. Please free some space and try again"},"GEyeDropper":{"text.tooltip":"Pick a color from anywhere on the canvas","text.preview":"Move cursor into canvas."},"GFontsButton":{"text.web-fonts":"Web Fonts","text.system-fonts":"System Fonts","text.imported-fonts":"Imported Fonts"},"GLayerPanel":{"action.rename-layer":"Rename Layer/Item","action.toggle-outline":"Toggle Outline","action.toggle-layer-outline":"Toggle Layer Outline","action.toggle-layer-visibility":"Toggle Layer Visibility","action.change-layer-color":"Change Layer Color","action.reset-instance":"Reset instance"},"GPagePanel":{"action.rename-page":"Rename Page"},"GDesignerStyleEditor":{"text.style-attribution":"Shared Style Attribution","text.new-style":"New Style","text.style-editor":"Style Editor","text.style-creator":"Style Creator","text.style":"Style","text.fill":"Fill","text.border":"Border","text.effects":"Effects","text.text":"Text","action.create":"Create","text.style-organizer":"Style Organizer","action.finish":"Finish","text.no-style":"No Shared Style","action.create-new-style":"Create New Shared Style","action.organize-styles":"Organize Shared Styles"},"GCommonNames":{"text.file-not-supported":"This file format is not supported!","text.unknown-user":"Unknown","text.anonymous-user":"Anonymous","text.native-edit-menu":"Edit","text.replace":"Replace","text.plkt-no-size-changes":"This property can’t be changed","text.infinite-canvas-no-size-changes":"%name - this property can’t be changed with an infinite canvas","text.max-number-pages-cdr":"CorelDRAW doesn’t support more than 999 pages, please remove some.","text.original-drawing-cdr":"CorelDRAW original drawing","text.unsupported-fonts-cdr":"This design may contain unsupported fonts and the option “Save text layers as paths” from the Settings will be applied.","text.unsupported-infinite-canvas":"Pages with an infinite canvas are not supported. The page size will be trimmed to the existing elements.","text.ok":"Ok","text.open-cdr-large-file":"You are trying to open a large CorelDRAW design. It may take a while to load.","text.failed-open-cdr-large-file":"Your CorelDRAW design cannot be processed at this point, please try again later.","text.failed-open-cdr-max-dim":"The dimensions of the pages contained in this CorelDRAW design are too big. Please decrease their size or the design’s dpi and try again.","text.file-too-large-cannot-be-processed":"CorelDRAW designs bigger than 450 MB cannot be processed. Please remove objects and try again.","text.file-no-images-cannot-be-processed":"Could not download file because some images are missing.<br>Please retry and ensure that you have a proper Internet connection.","text.failed-open-cdr-facing-pages":"Facing pages are currently not supported. Please switch off this page layout setting in CorelDRAW and save the design again to show it properly.","text.download-large-cdr-file":"You are trying to download a large CorelDRAW design. This may take a while.","text.failed-download-large-cdr-file":"Your CorelDRAW design cannot be downloaded at this point. Please try again later or save or download to the CDRAPP format to keep your progress.","text.rgb":"RGB","text.rgb.r":"R","text.rgb.g":"G","text.rgb.b":"B","text.cmyk":"CMYK","text.cmyk.c":"C","text.cmyk.m":"M","text.cmyk.y":"Y","text.cmyk.k":"K","text.version":"Version","text.internal-version":"Internal version","text.build":"Build","text.commit":"Commit","text.save-before-logging-out":"Please save your designs before logging out to avoid losing progress.","text.dpi":"DPI","property-h":"H","property-w":"W","text.chrome-untitled":"Untitled","text.untitled-image":"Untitled image","text.maintenance-title":"We are currently updating Corel Vector to a new version.","text.maintenance-info":"It will be available again in a few minutes.","text.cancel":"Cancel","text.save":"Save","text.cancel-loading":"Cancel","text.loading":"Loading","text.saving":"Saving","text.loading-file":"Loading %name","text.saving-file":"Saving %name, please wait to avoid losing any progress.","text.inside":"Inside","text.none":"None","action.toggle-lock":"Toggle Locker","action.toggle-visibility":"Toggle Visibility","evenodd.non-zero":"Non-Zero (Fill Holes)","evenodd.even-odd":"Even-Odd (Keep Holes)","action.change-fill-rule":"Change fill rule","action.change-blending-mode":"Change blending mode","text.opacity":"Opacity","text.blending":"Blending","text.position":"Position","text.size":"Size","text.color":"Color","text.angle":"Angle","text.export":"Export","text.format":"Format","text.default":"Default","text.web":"Web","text.colors":"Colors","arrow-paste.alert":"Select a shape, copy it to clipboard then paste it as arrow here.","text.height":"Height","text.width":"Width","text.unit":"Unit","text.advanced":"Advanced","text.global":"Global","text.document":"Document","text.corner":"Corner","text.autoscale-corners":"Autoscale Corners","text.radius":"Radius","text.angles":"Angles","text.advanced-settings":"Advanced Settings","action.change-corners":"Change corners","text.grid":"Grid","text.background-color":"Background","text.left":"Left","text.top":"Top","text.outside":"Outside","action.rotate":"Rotate","action.move":"Move","action.apply":"Apply","text.document-modified":"The document \\"%title\\" has been modified, do you want to save it?","text.guide-lines":"Guide Lines","text.full-pixels":"Full Pixels","text.anchor-points":"Anchor Points","text.shapes":"Shapes","text.pages":"Pages","tool.pointer":"Pointer","tool.subselect":"Subselect","tool.lasso":"Lasso","tool.layer":"Layer","tool.slice":"Slice","tool.pen":"Pen","tool.bezigon":"Bezigon","tool.freehand":"Freehand","tool.magichand":"Magic Hand","tool.knife":"Knife","tool.line":"Line","tool.rectangle":"Rectangle","tool.ellipse":"Ellipse","tool.polygon":"Polygon","tool.triangle":"Triangle","tool.star":"Star","tool.text":"Text","tool.pan":"Pan","tool.zoom":"Zoom","text.bottom":"Bottom","text.right":"Right","text.page":"Page","text.active":"Active","text.loading-failed":"Loading has failed","text.syncing-failed":"Syncing has failed","text.unable-to-save":"Unable to save the document. Do you have the right permissions?","text.try-again":"Try again","text.merge":"Merge","text.finish":"Finish","action.sign-out":"Log out","text.snap-to":"Snap to","text.snap-to-action":"Snap to %action","texture.position.auto":"Auto","texture.position.top":"Top","texture.position.left":"Left","texture.position.center":"Center","texture.position.right":"Right","texture.position.bottom":"Bottom","texture.repeat.repeat":"Both","texture.repeat.repeat-x":"Horizontal","texture.repeat.repeat-y":"Vertical","texture.repeat.no-repeat":"None","texture.size.auto":"Auto","texture.size.contain":"Contain","texture.size.cover":"Cover","texture.size.percent":"Percent","texture.size.length":"Length","texture.scale.fill":"Fill","texture.scale.fit":"Fit","texture.scale.stretch":"Stretch","texture.scale.tile":"Tile","noise.type.original":"Original","noise.type.black":"Black","noise.type.white":"White","noise.type.color":"Color","text.synchronizing-file":"Synchronizing %name","text.synchronizing":"Synchronizing","text.downloading":"Downloading","text.downloading-file":"Downloading %name","text.synch-failed":"Sync failed! Retrying","text.failed-to-synch":"Failed to sync!","template.presentation":"Presentation","template.blog-graphic":"Blog Graphic","template.facebook-post":"Facebook Post","template.social-media":"Social Media","template.poster":"Poster","template.posters-and-banners":"Posters & Banners","template.books":"Books","template.marketing":"Marketing","template.calendars-and-planners":"Calendars & Planners","template.cards-and-invitations":"Cards & Invitations","template.subcategory.cover-photos":"Cover Photos","template.subcategory.posts":"Posts","template.subcategory.stories":"Stories","template.subcategory.profile-pictures-thumbnails":"Profile Pictures & Thumbnails","template.subcategory.book-layouts":"Book Layouts","template.subcategory.scrapbooks":"Scrapbooks","template.subcategory.business-cards":"Business Cards","template.subcategory.email-templates-headers":"Email Templates & Headers","template.subcategory.letterhead":"Letterhead","template.subcategory.presentation":"Presentation","template.subcategory.proposals-reports":"Proposals & Reports","template.subcategory.resumes":"Resumes","template.subcategory.calendars":"Calendars","template.subcategory.planners":"Planners","template.subcategory.greeting-cards":"Greeting Cards","template.subcategory.invitations":"Invitations","template.subcategory.postcards":"Postcards","template.subcategory.recipe-cards":"Recipe Cards","template.subcategory.brochures-flyers":"Brochures & Flyers","template.subcategory.catalogs-informational-books":"Catalogs & Informational Books","template.subcategory.certificates":"Certificates","template.subcategory.infographics":"Infographics & Mind maps","template.subcategory.labels-stickers":"Labels & Stickers","template.subcategory-logos":"Logos","template.subcategory.menus":"Menus","template.subcategory.newsletters":"Newsletters","template.subcategory.posters-signs-Banners":"Posters, Signs & Banners","template.a4":"A4","template.business":"Business","template.card":"Card","template.greeting-card":"Greeting Cards","template.advertisement":"Advertisements","template.menu-and-brochure":"Menus & Brochures","element.chart":"Charts","element.emoji":"Emojis","element.shape":"Shapes","element.icons":"Icons","element.line":"Lines","element.sticker":"Stickers","element.illustration":"Illustrations","element.frame":"Frames","element.icon":"Icons","element.image":"Unsplash Photos","element.ui":"Prototyping","element.ui.ios":"iOS","element.ui.material":"Material","element.ui.windows":"Windows","element.icon.ios":"iOS","element.icon.material":"Material","element.icon.windows":"Windows","element.all":"All","element.search":"Search","text.save-to-file":"Save to File","text.save-to-cloud":"Save to Cloud","text.back-to-top":"Back to top","element.illustration.realistic":"Realistic","element.illustration.line":"Line","element.illustration.color":"Color","element.illustration.solid":"Solid","element.illustration.x-ray":"X-Ray","element.icon.animals":"Animals","element.icon.arrows":"Arrows","element.icon.astrology":"Astrology","element.icon.city":"City","element.icon.fashion":"Fashion","element.icon.finance-and-business":"Finance And Business","element.icon.food-and-objects":"Food And Objects","element.icon.gaming-and-cinema":"Gaming And Cinema","element.icon.industry-and-military":"Industry And Military","element.icon.logos":"Logos","element.icon.music":"Music","element.icon.office-and-computer":"Office And Computer","element.icon.people-and-gestures":"People And Gestures","element.icon.prototyping-material":"Prototyping Material","element.icon.prototyping-windows":"Prototyping Windows","element.icon.prototyping-ios":"Prototyping iOs","element.icon.sports-and-healthcare":"Sports And Healthcare","element.icon.time-and-weather":"Time And Weather","element.icon.travel-and-holidays":"Travel And Holidays","element.icon.very-basic":"Very Basic","element.emoji.klex":"Klex","element.emoji.classic":"Classic","element.emoji.cube":"Cube","element.emoji.cone":"Cone","element.image.texture":"Textures","element.image.nature":"Nature","element.image.architecture":"Architecture","element.image.business":"Business","element.image.animals":"Animals","element.image.food":"Food","text.cloud-login":"Cloud login","text.save-to-cloud-failed":"An error has occurred while saving to cloud. Do you want to save your file on the computer to avoid losing work?","text.fail-import-swatch":"This swatches file is invalid and could not be imported","text.import-swatches":"Import Swatches","text.export-swatches":"Export Swatches","text.downloading-fonts":"Downloading fonts","text.fonts-downloaded":"Fonts downloaded! Restart the app","text.error-downloading":"Error downloading fonts! Try again","action.settings":"Account settings","text.image":"Image","electron.container.unsaved-documents":"Are you sure you want to quit as there are unsaved documents?","electron.container.confirm":"Confirm","electron.container.synchronizing-documents":"Please wait until the file has finished saving to avoid losing progress.","text.snap-to-grid":"Grid","text.snap-to-guide-lines":"Guide Lines","text.snap-to-full-pixels":"Full Pixels","text.snap-to-anchor-points":"Anchor Points","text.snap-to-shapes":"Shapes","text.snap-to-pages":"Pages","text.start-trial-now-button":"Start the %days-day trial now","text.license-trial-day-left":"Trial: %days day left","text.license-trial-days-left":"Trial: %days days left","text.license-trial-expires-today":"Trial expires today","text.license-trial-expired":"Trial expired","text.license-pro-expired":"Your subscription has expired","text.license-offline-title":"The offline mode of Corel Vector is a Corel Vector feature","text.license-offline-subtitle":"Please save your designs in order to avoid losing progress.","text.license-offline-expired-subtitle":"Please establish an internet connection to keep using Corel Vector.","text.license-offline-footer":"The app %close in %time min.","text.license-offline-footer-highlight":"will close automatically","text.pdf-export-error":"There was a problem exporting your file. Please contact support from Help > Contact us and include the original .gvdesign file.","text.email-sent-title":"Email sent.","text.email-sent-info":"Please be sure to also check the spam/junk folder of your email client.","text.something-wrong":"Something is wrong.","text.something-wrong.try-again":"Something went wrong, please try again.","text.dont-save":"Don\'t save","text.buy-now":"UPGRADE NOW","text.error-emtpy-infinite-canvas":"Saving and exporting designs with an empty infinite canvas is not allowed.","text.error-nothing-to-save":"Nothing to save.","text.error-saving-file":"Error occurred, file could not be saved. Please contact support.","text.running-out-of-cloud-space":"You are running out of Cloud space. Please delete some older files to keep working.","text.countdown-timer":"%minutesm %secondss","text.please-wait-avoid-losing-progress":"Please wait until the file has finished saving to avoid losing progress.","text.user-account-deactivated":"Hey %name,  we couldn\'t confirm your email address in the last 3 days.<br>Your account is now deactivated!","text.activating-your-account":"Thanks for activating your account.","text.activating-your-account-subtitle":"Please enjoy designing in Corel Vector.","text.checking-connectivity":"Checking connectivity...","element.child.name.realistic":"Realistic","element.child.name.linear":"Linear","element.child.name.multi-colored":"Multi-Colored","element.child.name.solid":"Solid","element.child.name.x-ray":"X-Ray","element.child.name.alphabet":"Alphabet","element.child.name.animals":"Animals","element.child.name.arrows":"Arrows","element.child.name.architecture":"Architecture","element.child.name.astrology":"Astrology","element.child.name.baby":"Baby","element.child.name.beauty":"Beauty","element.child.name.business":"Business","element.child.name.cinema":"Cinema","element.child.name.city":"City","element.child.name.clothing":"Clothing","element.child.name.computer-hardware":"Computer Hardware","element.child.name.crime":"Crime","element.child.name.culture":"Culture","element.child.name.diy":"DIY","element.child.name.data":"Data","element.child.name.drinks":"Drinks","element.child.name.ecommerce":"Ecommerce","element.child.name.editing":"Editing","element.child.name.events":"Events","element.child.name.experimental":"Experimental","element.child.name.fashion":"Fashion","element.child.name.files":"Files","element.child.name.films":"Films","element.child.name.finance":"Finance","element.child.name.flags":"Flags","element.child.name.folders":"Folders","element.child.name.food":"Food","element.child.name.free-popular":"Free Popular","element.child.name.gaming":"Gaming","element.child.name.hands":"Hands","element.child.name.health":"Health","element.child.name.healthcare":"Healthcare","element.child.name.holidays":"Holidays","element.child.name.household":"Household","element.child.name.industry":"Industry","element.child.name.logos":"Logos","element.child.name.maps":"Maps","element.child.name.media-controls":"Media Controls","element.child.name.messaging":"Messaging","element.child.name.military":"Military","element.child.name.mobile":"Mobile","element.child.name.music":"Music","element.child.name.nature":"Nature","element.child.name.network":"Network","element.child.name.operating-systems":"Operating Systems","element.child.name.people":"People","element.child.name.photo-and-video":"Photo and Video","element.child.name.plants":"Plants","element.child.name.printing":"Printing","element.child.name.profile":"Profile","element.child.name.programming":"Programming","element.child.name.science":"Science","element.child.name.security":"Security","element.child.name.shopping":"Shopping","element.child.name.social-media":"Social Media","element.child.name.sports":"Sports","element.child.name.spirituality":"Spirituality","element.child.name.textures":"Textures","element.child.name.time-and-date":"Time And Date","element.child.name.transport":"Transport","element.child.name.travel":"Travel","element.child.name.user-interface":"User Interface","element.child.name.wallpapers":"Wallpapers","element.child.name.weather":"Weather","element.child.name.klex":"Klex","element.child.name.classic":"Classic","element.child.name.cube":"Cube","element.child.name.cone":"Cone","element.child.name.current-events":"Current Events","text.try-out-coreldrawpp-pro":"Try out CorelDRAW.app PRO","text.cant-change-cdr-limitations":"This page property can’t be changed in the currently imported design due to certain limitations.","text.filename-is-not-correct":"You have entered an invalid file name: %filename. Please try again.","text.message-explore-cloud-templates":"You haven’t added anything to Corel Vector yet. <br>What about trying out these example files?","text.try-this-feature-pro-tooltip-text":"Upgrade to unlock this feature.","text.learn-more":"Learn more","text.page-toggle-lock-tooltip-title":"Lock page","text.page-toggle-lock-tooltip-description":"Lock all objects on the current page.","text.page-toggle-visibility-tooltip-title":"Toggle visibility","text.page-toggle-visibility-tooltip-description":"Hide all objects on the page.","text.layer-toggle-lock-tooltip-title":"Lock layer","text.layer-toggle-lock-tooltip-description":"Lock layer or element.","text.layer-toggle-visibility-tooltip-title":"Toggle visibility","text.layer-toggle-visibility-tooltip-description":"Hide layer or element.","text.layer-toggle-outline-tooltip-title":"Toggle outline","text.symbol-panel-symbol-tooltip-description":"Click to highlight master on canvas. Drag on canvas to place an instance","text.corner-radius-slider-tooltip-title":"Corner slider","text.corner-radius-slider-tooltip-description":"Click and drag to make the corners of the selected elemente rounded.","text.login-in-to-continue":"Please login to continue.","error.http.forbidden":"Error occurred. You are not allowed to perform this action.","text.library-load-more":"Load more..."},"GCloudTemplates":{"text.welcome":"Welcome","text.templates":"Templates"},"GAlignProperties":{"text.space-x":"Space X","text.space-y":"Space Y"},"GAppearanceProperties":{"title":"Appearance","text.darken-image":"Darken image","text.lighten-image":"Lighten image","text.boost-contrast":"Boost contrast","text.adjust-colors":"Adjust colors","text.invert-colors":"Invert colors","text.masking":"Masking","blending.mask":"Mask","blending.inverse-mask":"Inverse Mask","text.style":"Style","action.sync":"Sync","text.multiple-selection":"Multiple selection","text.no-style":"No Shared Style","text.opacity-slider-tooltip-title":"Opacity slider","text.opacity-slider-tooltip-description":"Click and drag to make to change the opacity of the selected element.","text.blend-tooltip-title":"Blending mode","text.blend-tooltip-description":"Click to choose how this object will blend with underlying objects. Modes that are not compatible with CSS/SVG/PDF are marked with an asterisk.","text.shared-styles-tooltip-title":"Shared styles","text.shared-styles-tooltip-description":"Click to chose a shared style or create a new one."},"GBoolOpProperties":{"action.modify-merge-mode":"Modify merge mode","text.boolean":"Compound","text.union":"Union","text.intersect":"Intersect","text.subtract":"Subtract","text.difference":"Difference"},"GBorderPaintLayerProperties":{"title":"Borders","text.subtract":"Subtract","text.difference":"Difference","option.custom":"Custom","text.ends":"Ends","text.joins":"Joins","text.dash":"Dash","text.gap":"Gap","text.outline":"Outline","text.autoscale-borders":"Autoscale Borders","text.advanced-stroke-settings":"Advanced stroke settings","action.remove-selected-border":"Remove Selected Border","action.remove-border":"Remove Border","action.add-border":"Add Border","action.duplicate-border":"Duplicate Border","action.move-border":"Move Border","action.change-border-properties":"Change Border Properties","text.start-arrow":"Start Arrow","text.end-arrow":"End Arrow","text.autoscale-borders-tooltip":"Only with Transform tool","text.marker-position":"Position","text.border-alignment.disabled":"Please remove Open Path shape from selection to use border alignment","text.advanced-stroke-settings-tooltip-title":"Advanced Border settings","text.advanced-stroke-settings-tooltip-description":"Change Border Caps, Position, Dashes and Arrowheads.","text.remove-border-tooltip-title":"Remove Selected Border","text.remove-border-tooltip-description":"Click to remove the selected border from the element.","text.add-border-tooltip-title":"Add Border","text.add-border-tooltip-description":"Click to add a new border to the selected element.","text.border-width-tooltip-title":"Border width","text.border-width-tooltip-description":"The width of the border in current document units.","text.copy-border":"The Border was copied to your clipboard.","text.miter-limit":"Miter limit","text.miter-limit-tooltip-description":"Value at which the sharp corners will be converted to beveled."},"GContextMenu":{"text.select-same":"Select Same","text.arrange":"Arrange","text.align":"Align","text.transform":"Transform","text.select":"Select","text.paste":"Paste","text.create-compound":"Create Compound","text.convert-to-path":"Convert to Path","text.create-symbol":"Create Symbol","text.go-to-master":"Go to Master","text.text":"Text","text.crop":"Crop","text.original-size":"Original Size","text.replace-image":"Replace Image...","text.image":"Image","page-panel.text.duplicate":"Duplicate Page","page-panel.text.copy":"Copy Page","page-panel.text.delete":"Delete Page","page-panel.text.export":"Export Page","fill-properties-panel.text.delete-fill":"Delete Fill","fill-properties-panel.text.copy-fill":"Copy Fill","border-properties-panel.text.advanced-settings":"Advanced Border Settings","border-properties-panel.text.delete-border":"Delete Border","border-properties-panel.text.copy-border":"Copy Border","effect-properties-panel.text.apply-to-element":"Apply to Whole Element","effect-properties-panel.text.apply-to-fill":"Apply to Fill Only","effect-properties-panel.text.apply-to-border":"Apply to Border Only","effect-properties-panel.text.copy-effect":"Copy Effect"},"GDimensionProperties":{"action.keep-ratio":"Keep Ratio","text.align":"Align","text.transform":"Transform","text.select":"Select","text.anchors":"Anchors","text.alignTitle":"ALIGN & DISTRIBUTE","text.setting":"Settings","text.sameWidth":"Same width","text.sameHeight":"Same height","text.fullUnit":"Snap to full unit","text.halfUnit":"Snap to half unit","action.anchor-left":"Anchor Left","action.anchor-center":"Anchor Center","action.anchor-right":"Anchor Right","action.anchor-top":"Anchor Top","action.anchor-middle":"Anchor Middle","action.anchor-bottom":"Anchor Bottom","action.change-size":"Change Size","action.change-anchor":"Change Anchor","text.property-x-y-tooltip-title":"Position of the element","text.property-x-y-tooltip-description":"Set X and Y axis coordinates for the position of the selected element.","text.property-w-h-tooltip-title":"Size of the element","text.property-w-h-tooltip-description":"Set width and height for the size of the selected element.","text.keep-ratio-tooltip-title":"Keep Ratio","text.keep-ratio-tooltip-description":"Keep the proportions between width and height.","text.transform-button-tooltip-title":"Transform tool","text.transform-button-tooltip-description":"Transform the selected element.","text.rotate-angle-tooltip-title":"Angle of Rotation","text.rotate-angle-tooltip-description":"Set an angle to rotate the seleted element.","text.anchor-left-tooltip-title":"Anchor to the Left","text.anchor-left-tooltip-description":"Anchor selected element to the left.","text.anchor-center-tooltip-title":"Anchor Center","text.anchor-center-tooltip-description":"Anchor selected element to the center.","text.anchor-right-tooltip-title":"Anchor to the Right","text.anchor-right-tooltip-description":"Anchor selected element to the right.","text.anchor-top-tooltip-title":"Anchor Top","text.anchor-top-tooltip-description":"Anchor selected element to the top.","text.anchor-middle-tooltip-title":"Anchor to the Middle","text.anchor-middle-tooltip-description":"Anchor selected element to the middle.","text.anchor-bottom-tooltip-title":"Anchor to the Bottom","text.anchor-bottom-tooltip-description":"Anchor selected element to the bottom.","text.transform-title":"TRANSFORM","text.transform-advanced":"ADVANCED TRANSFORM","text.transform-apply":"Apply Transformations"},"GEffectProperties":{"text.most-used":"Most Used","title":"Effects","action.add":"Add Effect","action.toggle-collapse":"Toggle Effect Collapse","action.toggle-visibility":"Toggle Effect Visibility","action.remove":"Remove Effect","action.change-layer":"Change Effect Layer","action.move":"Move Effect","action.duplicate":"Duplicate Effect","action.change-properties":"Change Effect Properties","text.applies-to":"Applies to","text.more":"More","text.blur":"Blur","text.bend":"Bend","text.softness":"Softness","text.coverage":"Coverage","text.offset":"Offset","text.length":"Length","text.density":"Density","text.fade":"Fade","text.load-acv":"Load ACV","text.padding":"Padding","text.artistic":"Artistic","text.adjust":"Adjust","text.other":"Other","text.shadow":"Shadow","text.distortion":"Distortion","text.blend":"Blend","text.height":"Height","text.color.gradient.grp.instagram":"Instagram","text.color.gradient.opt.1977":"1977","text.color.gradient.opt.brannan":"Brannan","text.color.gradient.opt.gotham":"Gotham","text.color.gradient.opt.hefe":"Hefe","text.color.gradient.opt.lord-kelvin":"Lord Kelvin","text.color.gradient.opt.nashville":"Nashville","text.color.gradient.opt.x-pro-ii":"X-PRO II","text.add-effect-tooltip-title":"Add Effect","text.add-effect-tooltip-description":"Click to choose an effect to be added to the selected element.","text.copy-effect":"The Effect was copied to your clipboard."},"GEllipseProperties":{"action.change-shape":"Change shape","action.change-angle":"Change angle","text.shape":"Shape","text.ellipse-to-center":"Ellipse set border allignment to center"},"GErrorHandler":{"text.breakfast":"It\'s time for breakfast. Please save your file and restart the app.","text.sorry":"Corel Vector unexpectedly ran into an error. Sorry about that, the error message was sent to us and we will fix it as soon as possible.","text.close":"Close"},"GExportDialog":{"text.warning":"Warning:","text.canvas-bigger-than-200-in":"The canvas is bigger than 200 inches and might not be opened correctly in some PDF viewers.","text.export-to":"Export to","text.do-not-downsample-images":"Don’t downsample bitmap images","text.do-not-downsample-images-info":"Downsampling will reduce image quality but create a smaller PDF document.","text.rasterize-unsupported-objects":"Rasterize unsupported objects by CorelDRAW","text.canvas":"Canvas","text.selection":"Selection","text.assets":"Assets","text.jpeg-quality":"JPEG Quality","text.color-mode":"Color Mode","text.with-effects":"With effects","text.export-as-curves":"Export text as curves","text.export-all":"Export all","text.exporting":"Exporting, please wait","text.medium-quality":"Medium Quality Print","text.high-quality":"High Quality Print","text.selection-warning":"Please select one or more shapes to export them.","text.assets-warning":"To export an asset, select one or more shapes and click on \\"Make exportable\\" on the inspector.","text.preparing-preview":"Preparing preview...","text.decimal-places-precision":"Decimal Places","text.page-background":"Use page color","text.custom-background":"Use custom color","text.no-background":"Transparent","text.preserve-svg-editing-capabilites":"Preserve editing capabilities for SVG files","text.preserve-svg-editing-capabilites-description":"This will ensure that SVGs exported from Corel Vector can be properly re-imported.","text.default-limit":"Due to technical limitations it isn’t possible to export designs larger than 4000 px (respectively 141 cm or 55.55 in) at 300 dpi. Please resize your design or choose less dpi and try again.","text.pdf-limit":"Due to technical limitations, your design can’t be exported – it contains images larger than %limit. Please resize your design and try again.","text.layer-as-id":"Retain attributes and add IDs","text.layer-as-id-info":"All class and type attributes are retained and element names are added as IDs.","text.want-save-before-export":"Do you want to save this file before exporting?"},"GExportProperties":{"text.make-exportable":"Make Exportable","action.create-slice":"Create Slice","action.add":"Add Export","action.create-slices":"Create Slice(s)","action.update-setting":"Update Export Setting","action.remove":"Remove Export","text.suffix":"Suffix","text.multiple":"Multiple","text.format":"Format","text.create-slice-tooltip-title":"Create slice","text.create-slice-tooltip-description":"Click and drag to create a slice to be exported as an asset.","text.add-export-tooltip-title":"Add Export","text.add-export-tooltip-description":"Turn a selected object into an exportable asset."},"GFillPaintLayerProperties":{"title":"Fills","action.advanced-settings":"Advanced Fill Settings","action.remove-selected":"Remove Selected Fill","action.remove":"Remove Fill","action.add":"Add Fill","text.fill-rule":"Fill-Rule","action.modify":"Modify Fill","action.change-properties":"Change Fill Properties","action.duplicate":"Duplicate Fill","action.move":"Move Fill","text.remove-layer-tooltip-title":"Remove selected fill","text.remove-layer-tooltip-description":"Click to remove the selected fill from the element.","text.add-layer-tooltip-title":"Add fill","text.add-layer-tooltip-description":"Click to add a new fill to the selected element.","text.fill-rule-tooltip-title":"Fill rule ","text.fill-rule-tooltip-description":"Winding fill rule define how holes in shapes are shown.","text.copy-fill":"The Fill was copied to your clipboard."},"GImageProperties":{"text.checking-profile":"Checking CMYK Profile","action.replace":"Replace","action.replace-image":"Replace Image","action.original-size":"Orig. Size","action.reset-size":"Reset Image Size","action.no-crop":"No crop","action.reset-cropping":"Reset Image Cropping","text.check-profile":"Check CMYK Profile","text.loading-profile":"Loading CMYK Profile","action.crop":"Crop"},"GMissingFontsDialog":{"text.fonts-missing":"Some fonts in the document are missing","text.fonts-not-found":"The following fonts are used, but cannot be found in Corel Vector","action.keep-fonts":"Keep Fonts","action.replace-fonts":"Replace Fonts","text.turn-disabled-function":"You can also try to turn on disabled functions or do it later in font browser"},"GNewDocumentDialog":{"text.connect":"Connect","text.resources":"Resources","text.set-theme":"Set your Theme","text.set-language":"Set your Language","text.discuss":"Discuss","text.whats-new":"What\'s new","text.blog":"Blog","text.welcome":"Welcome to Corel Vector","action.open-file":"Open File","text.restart-app":"Restart your app to apply changes!","text.changelog":"Changelog","text.start-option":"New Design","text.start-option-description":"Design creation starts here","text.templates-option":"New from Template","text.templates-option-description":"Create a new design based on a template","text.cloud-option":"Open from Corel Vector","text.cloud-option-description":"Open and manage your cloud files","text.local-option":"Open from Computer","text.local-option-description":"Open a locally saved file","action.create-canvas":"Create!","action.leave-empty-infinite":"Leave it empty for infinite canvas","text.templates-login-title":"Cloud Templates","text.templates-login-phrase1":"Get inspiration and quickly start a design over thousands of free","text.templates-login-phrase2":"pro-grade templates, designed and updated by our team.","text.cloud-login-title":"Introducing Corel Vector","text.cloud-login-phrase1":"Quickly create awesome graphics and share them with the world.","text.cloud-login-phrase2":"One account, one workspace and two awesome free tools.","text.cloud-login":"Login","text.cloud-signup":"Sign up","text.old-user-title":"Welcome back to Corel Vector!","text.old-user-p1-p1":"Create a ","text.old-user-p1-p2":"new design","text.old-user-p1-p3":" from zero using pre-made or custom sizes.","text.old-user-p2-p1":"You can quick start a design with a ","text.old-user-p2-p2":"pre-made template","text.old-user-p2-p3":" here.","text.old-user-p3-p1":"Corel Vector has evolved and is now even more powerful, but don\'t worry. All ","text.old-user-p3-p2":"your old files are still here","text.old-user-p3-p3":" in the same account and can be acessed over here with the","text.old-user-p3-p4":" same login and password.","text.chk-got-it":"I got it, don\'t display this message again.","text.btn-read-more":"Read more","text.btn-got-it":"Got it, start designing","text.recent-option":"Open Recent","text.recent-option-description":"Open a recent opened file","text.recent-option-empty":"No Recent Files","text.start-option-check":"Don\'t show anymore at startup","text.about":"About","text.try-out-pro":"Try out Corel Vector","text.start-free-trial":"Start a 15-day free trial of the advanced<br/> PRO features","text.example-files":"Example Files","text.option-not-available-in-view-mode":"This option is not available in Viewer Mode."},"GUnsupportedFeaturesDialog":{"text.title-unsupported":"This design contains features, that are not supported for SVG files. These features are:","text.checked-unsupported":"Don’t show anymore"},"GSymbolProperties":{"title":"Symbol","text.instance":"instance","text.symbol":"symbol","text.instances":"instances","text.symbols":"symbols","text.master":"master","text.instanceof":"instance of","text.chooseinstance":"Instance"},"GPageProperties":{"title":"Page","text.background":"Background","action.change-background":"Change page background","action.change-canvas-opacity":"Change canvas opacity","action.change-size":"Change page size","action.change-bleeding":"Change bleeding","action.change-margins":"Change margins","action.change-margin":"Change margin","action.equal-margin":"Equal Margins","action.assign-master-page":"Assign Master Page","text.bleed":"Bleed","text.margin":"Margin","text.master":"Master","text.size-custom":"Custom Size","text.size-infinite":"Infinite Canvas","text.size-trim":"Trim Canvas","text.clip-content":"Clip content","text.page-size":"Page Size","text.rotate-canvas":"Rotate Canvas","text.rotate-canvas-tooltip-title":"Rotate Canvas","text.rotate-canvas-tooltip-description":"Rotate the canvas to a portrait or landscape.","text.trim-canvas-tooltip-title":"Trim Canvas","text.trim-canvas-tooltip-description":"Trim the page size to fit the current content.","text.clip-content-tooltip-title":"Clip Content","text.clip-content-tooltip-description":"Hide objects that are outside of the current canvas area.","text.bleed-tooltip-title":"Bleed","text.bleed-tooltip-description":"Define a bleed size for printing purposes.","text.margin-tooltip-title":"Margin","text.margin-tooltip-description":"Define margin size. Click the link icon to set each margin individually.","text.master-tooltip-title":"Master page","text.master-tooltip-description":"Choose the page to be used as a master for current page."},"GPathProperties":{"action.modify-path-node-type":"Modify Path Node(s) Type","text.closed":"Closed","text.joint":"Joint","text.straight":"Straight","action.modify-path-properties":"Modify Path Properties","action.modify-point-properties":"Modify Point Properties"},"GPatternChooser":{"text.advanced":"Advanced Options","text.scale":"Scale","text.rgb-color":"RGB Color","text.hsb-color":"HSB Color","text.cmyk-color":"CMYK Color","action.system-color-picker":"System Color Picker","action.change-stops-order":"Change order of stops","action.rotate-gradient-left":"Rotate gradient left","action.rotate-gradient-right":"Rotate gradient right","text.swatches":"Swatches","text.in-use":"In use","text.mixer":"Mixer","text.hex":"Hex","text.automatic":"Automatic","text.intensity":"Intensity","text.type":"Type","action.choose-image":"Choose Image","action.set-transparency-mask":"Set as transparency mask","text.repeat":"Repeat","action.remove-swatch":"Remove Swatch","text.tints":"Tints","text.shades":"Shades","text.tones":"Tones","text.mixes":"Mixes","action.copy-color":"Copy Color","action.paste-color":"Paste Color","action.add-to-document-swatches":"Add to Document Swatches","action.add-to-global-swatches":"Add to Global Swatches","text.equal-swatch-alert":"An equal swatch was already added.","pattern-type.transparent":"Transparent","pattern-type.color":"Color Fill","pattern-type.lineargradient":"Linear Gradient","pattern-type.radialgradient":"Radial Gradient","pattern-type.angulargradient":"Angular Gradient","pattern-type.texture":"Texture Fill","pattern-type.noise":"Noise","pattern-type.backgroundfill":"Background Fill","text.error-on-loading":"Some error ocurred during loading.","text.color-picker-tooltip-title":"Choose a color","text.color-picker-tooltip-description":"Choose a color, gradient or texture for the selected element.","text.eyedropper-tooltip-title":"Pick a color from the canvas","text.eyedropper-tooltip-description":"Hover the eyedropper over the canvas to pick a color for the selected element.","action.add-swatch":"Add swatch"},"GPolygonProperties":{"action.change-radius":"Change radius","action.change-angle":"Change angle","action.change-corner-type":"Change corner type","action.change-corner-radius":"Change corner radius","text.points":"Points","text.plain-edges":"Plain Edges","text.corners":"Corners","action.change-polygon-size":"Change polygon size","action.change-polygon-points":"Change polygon points"},"GRectangleProperties":{"text.uniform-corner-smoothness":"Uniform Corner-Smoothness","text.horizontal-corner-smoothness":"Horizontal Corner-Smoothness","text.vertical-corner-smoothness":"Vertical Corner-Smoothness","text.corner-type":"Corner-Type","text.uniform-corners":"Uniform Corners","action.modify-rectangle-properties":"Modify Rectangle Properties"},"GSceneProperties":{"action.change-grid-settings":"Change grid settings","text.on":"On","text.isometric":"Isometric","text.off":"Off","action.change-canvas-unit":"Change canvas unit","cloud.sync":"Sync Cloud","cloud.sync.info":"Keep your designs always updated and synchronized working online and offline with Corel Vector.","cloud.sync.enable":"Enable Sync","cloud.sync.more":"Learn more","cloud.sync.label":"Cloud Synchronization","text.dpi":"DPI","action.change-canvas-dpi":"Change canvas dpi","text.unit-tooltip-title":"Units","text.unit-tooltip-description":"Define the measurement unit of the document.","text.dpi-tooltip-title":"Dots per Inch","text.grid-tooltip-title":"Grid","text.grid-tooltip-description-off":"Turn off the grid.","text.grid-tooltip-description-on":"Turn on the grid.","text.grid-tooltip-description-isometric":"Turn on the Isometric grid.","text.color-mode":"Color Mode","action.change-color-mode":"Change color mode","text.color-mode-tooltip-title":"Color Mode","text.color-mode-tooltip-description":"Set the default color mode that is used when picking the color of elements.","text.reminder":"Please note that switching the color mode doesn’t alter existing elements on the canvas and only sets it as the default color mode from now on."},"GSettingsDialog":{"setting.disable-scrubbing":"Disable changing values in numeric input fields with dragging.","setting.enable_steps_debug":"Allow steps import/export","setting.highlight-on-hover":"Highlight on hover","setting.highlight-on-hover-description":"Highlight shapes when hovering them with the mouse.","setting.show-coordinates":"Show coordinates tooltip","setting.show-coordinates-description":"Show current coordinates tooltip when creating or moving shapes.","setting.show-size":"Show size tooltip","setting.show-size-description":"Show current size tooltip when creating or resizing shapes.","setting.show-angle":"Show angle tooltip","setting.show-angle-description":"Show current rotation angle tooltip when rotating shapes.","setting.invert-selection-mode":"Invert selection mode","setting.invert-selection-mode-description":"Only select objects which are completely inside the selection area, hold alt-key to switch between two modes.","setting.auto-expand-layers":"Auto expand layers","setting.auto-expand-layers-description":"When set auto-expands the layer tree for the current selection.","setting.auto-save":"Enable auto-save","setting.auto-save-description":"Files are saved automatically - please choose the interval (minutes) on the right. Please note that this feature is only available for files saved or synced to Corel Vector.","setting.auto-save-warning":"Auto-save: Warning for unsaved/local files","setting.auto-save-warning-description":"Show warning to remind about saving/syncing files to Corel Vector to enable auto-save. ","setting.auto-save-not-support-for-cdr-warning":"Auto-save: Reminder for CorelDRAW (CDR, DES) files","setting.auto-save-not-support-for-cdr-warning-description":"Show message to remind about saving to the CorelDRAW file format regularly.","setting.change-theme":"Change the theme of Corel Vector","setting.enable-beta":"Enable Beta version","setting.enable-beta-description":"Please note that beta versions are not meant for production work and may contain bugs. Please report them at <a href=\'https://discuss.gravit.io/c/designer/beta\'>our forum</a>.","setting.store-textpath":"Save text layers as paths","setting.store-textpath-description":"Saving paths will increase the file size but not require the fonts to be available.","setting.decimals-num":"Rounding","setting.decimals-num-description":"Please switch on to be able to define the number of decimal places where values are rounded in input fields.","action.save-changes":"Save Changes","text.gravish":"Gravish","text.dark-theme":"Dark Theme","text.light-theme":"Light Theme","setting.disable-warning-unsupported-features":"Disable warning messages of unsupported features","setting.disable-warning-unsupported-features-description":"Whether to disable warning message about unsupported features on svg exporter or not.","setting.eps-outline-fonts":"Outline fonts in EPS import","setting.eps-outline-fonts-description":"Fonts will be outlined so that they are not required to display the file correctly. Switch off to keep font information and edit text layers.","setting.ui-toolbar-alignment":"Left-aligned icons in the toolbar.","setting.disable-cdr-warning":"Disable warning message on CorelDRAW (CDR, DES) file open","setting.disable-cdr-warning-description":"Hides the message when opening a CDR or DES file for annotation in CorelDRAW.app.","setting.disable-cdr-unsupported-effects":"Disable warning message on Save as CorelDRAW (CDR, DES) file","setting.disable-cdr-unsupported-effects-description":"Hides the warning message when saving to the CorelDRAW file format.","setting.disable-cdr-unsupported-effect":"Disable warning message when editing CorelDRAW (CDR, DES) files","setting.disable-cdr-unsupported-effect-description":"Hides the warning message when creating incompatible objects in a CorelDRAW design.","setting.disable-notifications":"Disable notifications","setting.disable-notifications-description":"Stop receiving email notifications for new comments or annotations (can be changed for every design individually in the comments panel).","setting.create-backup-copy-of-file":"Create a backup copy of files","setting.create-backup-copy-of-file-description":"For every file you save or export, a hidden backup copy will be created automatically.","setting.email-notifications":"Email notifications","setting.email-notifications-description":"Set frequency of email notifications for new activity within the document","setting.email-notifications-frequency-every10min":"Every 10 mins","setting.email-notifications-frequency-onceaday":"Once a day","setting.email-notifications-frequency-instantly":"Instantly","setting.email-notifications-frequency-never":"Never"},"GSliceProperties":{"text.trim-transparent-pixels":"Trim transparent pixels","action.modify-slice-properties":"Modify Slice Properties"},"GTextProperties":{"text.stylisticset":"Stylistic set","text.language":"Language","text.list-type":"List Type","text.marker-none":"None","text.marker-bulleted":"Bulleted","text.marker-numbered":"Numbered","text.latin":"Latin","text.adlam":"Adlam","text.arabic":"Arabic","text.armenian":"Armenian","text.avestan":"Avestan","text.balinese":"Balinese","text.bamum":"Bamum","text.batak":"Batak","text.bengali":"Bengali","text.brahmi":"Brahmi","text.buginese":"Buginese","text.buhid":"Buhid","text.cham":"Cham","text.cherokee":"Cherokee","text.coptic":"Coptic","text.cyrillic":"Cyrillic","text.devanagari":"Devanagari","text.georgian":"Georgian","text.greek":"Greek","text.hangul":"Hangul","text.hebrew":"Hebrew","text.javanese":"Javanese","text.kaithi":"Kaithi","text.kannada":"Kannada","text.katakana":"Katakana","text.khmer":"Khmer","text.lao":"Lao","text.lepcha":"Lepcha","text.limbu":"Limbu","text.linear_b":"Linear_b","text.malayalam":"Malayalam","text.mandaic":"Mandaic","text.mongolian":"Mongolian","text.myanmar":"Myanmar","text.old_persian":"Old_persian","text.osmanya":"Osmanya","text.phoenician":"Phoenician","text.runic":"Runic","text.sundanese":"Sundanese","text.syriac":"Syriac","text.tagalog":"Tagalog","text.tai_le":"Tai_le","text.tai_tham":"Tai_tham","text.tai_viet":"Tai_viet","text.telugu":"Telugu","text.thai":"Thai","text.tibetan":"Tibetan","text.yi":"Yi","text.auto":"Auto","text.fix":"Fix","text.scale-content":"Autoscale Font","action.modify-text-properties":"Modify Text Properties","text.weight":"Weight","text.alignment":"Alignment","action.justify":"Justify","text.vertical":"Vertical","text.spacing":"Spacing","text.char":"Char","text.word":"Word","text.line":"Line","text.sizing":"Sizing","text.orientation":"Orientation","text.script":"Script","text.variant":"Variant","text.on-path":"On Path","text.reverse":"Reverse","text.distance":"Distance","text.edit":"The font is not available, continue to edit it?","text.transform":"Transform","text.transform-uppercase":"Uppercase","text.transform-capitalize":"Capitalize","text.transform-lowercase":"Lowercase","text.transform-smallcaps":"Small Caps","text.advanced-text-settings":"Advanced Settings","text.decoration":"Decoration","text.decoration-bold":"Bold","text.decoration-italic":"Italic","text.decoration-underline":"Underline","text.decoration-strikethrough":"Strikethrough","text.paragraph":"Paragraph","text.paragraph-indent":"Indent","text.paragraph-spacing":"Spacing After","text.typography":"Typography","text.typography-subscript":"Subscript","text.typography-superscript":"Superscript","text.typography-ligatures":"Ligatures","text.typography-fractions":"Fractions","text.orientation-ltr":"Left-to-right","text.orientation-rtl":"Right-to-left","text.orientation-ttb":"Top-to-bottom","text.decoration-strikeout":"Strikethrough","text.mixed":"Mixed","text.size":"Size","text.color":"Color","text.advanced-properties-icon-tooltip-title":"Advanced Text Properties","text.advanced-properties-icon-tooltip-description":"Manage advanced typography properties (Sub and Super script, Fractions, Ligatures, Change Case, Paragraph indent and spacing)."},"GToolbar":{"text.shared":"Shared","text.share":"Share","text.snap":"Snap","text.view":"View","text.select":"Select","text.path":"Path","text.shape":"Shape","text.text":"Text","text.group":"Group","text.clip":"Clip","text.split":"Ungroup","text.zoom":"Zoom","text.merge":"Create Compound Shape","text.zoom-button-tooltip-title":"Zoom","text.undoList-button-tooltip-title":"Extended undo list","text.undoList-button-tooltip-description":"See a list of actions performed lately to roll back to an older version of your design.<br/>","text.comment-toggle":"Comment Toggle","text.comment-on":"Show comments and annotations.","text.comment-off":"Hide comments and annotations."},"GTransformProperties":{"title":"Transform","text.advanced-transform-settings":"Advanced settings","text.scale":"Scale","text.skew":"Skew","text.copies":"Copies","action.apply-transformation":"Apply Transformation","text.move-tooltip-title":"Move element","text.move-tooltip-description":"Set a number to move the selected element horizontally or vertically.","text.scale-tooltip-title":"Scale element","text.scale-tooltip-description":"Set a number to adjust width and height of the selected element.","text.rotate-tooltip-title":"Rotate element","text.rotate-tooltip-description":"Set an angle to rotate the seleted element.","text.rotate-axis-tooltip-title":"Rotate along axis","text.rotate-axis-tooltip-description":"Set an angle for the reflect axis.","text.skew-tooltip-title":"Skew element","text.skew-tooltip-description":"Set an angle to slant the selected element along one of the axis.","text.copies-tooltip-title":"Copy element","text.copies-tooltip-description":"Set a number to make copies of the selected element.","text.transdorm-origin-tooltip-title":"Transdorm origin","text.transdorm-origin-tooltip-description":"Set the origin point for transformations"},"GFilesPanel":{"text.file-can-not-be-accessed-missing-permissions":"This file has view restrictions set by the owner, you are not allowed to open it.","text.assets-shared-with-me":"Assets shared with me","text.please-inform-valid-file-name":"Please, inform a valid file name","text.title-recent-files":"Recent Files","text.title-all-files":"My Cloud","text.option-isnt-available":"This option isn’t available for Cloud Drives","text.google-drive-corporate":"Google Drive","text.sharepoint-corporate":"SharePoint","text.onedrivebusiness-corporate":"OneDrive Business","text.downloading-files":"Downloading file(s)...","text.info-cdr":"CDR: All existing CorelDRAW drawing content will be maintained when opening in CorelDRAW. Drawing content added in CorelDRAW.app will be editable in CorelDRAW, but will be locked when opening the CDR file in CorelDRAW.app again.","text.info-cdrapp":"CDRAPP: The internal file format of CorelDRAW.app. All content added in CorelDRAW.app will be maintained and remains editable. Existing CorelDRAW drawing content will be maintained as a locked underlay. This file format can’t be opened in CorelDRAW.","text.info-sharepoint-cdrapp-not-available":"Saving to the CDRAPP file format isn’t supported for SharePoint yet. Please choose DES or CDR format instead.","action.new-folder":"New folder","action.new-folder-tooltip":"Creates a new folder in the current location","action.cut":"Cut","action.cut-tooltip":"Cut/Paste the current selection","action.copy":"Copy","action.copy-tooltip":"Copy/Paste the current selection","action.delete-tooltip":"Delete the current selection","action.cancel-tooltip":"Cancel and go back to editing your design.","text.delete-confirm":"You want to delete the current selection? This operation cannot be reverted!","text.sort-date":"Sort by Creation Date","text.sort-name":"Sort by Name","action.back":"Back","action.back-tooltip":"Return to previous folder","action.my-cloud":"My Cloud","action.my-cloud-tooltip":"Return to the main directory","action.open":"Open","action.rename":"Rename","text.updated":"Updated","text.name":"Name","text.creation-date":"Creation Date","text.created":"Created","text.ascending":"Ascending","text.descending":"Descending","text.large-mode":"Large preview","text.last-saved":"Last saved","action.open-design":"Open","action.delete-button":"Delete","action.card-view-button":"Card view","action.list-view-button":"List view","text.search-not-found":"No files match your search term, please try again.","text.search-placeholder":"Search File","action.open-containing-folder":"Open containing folder","action.sort":"Sorting","action.download-tooltip":"Download files","action.download-tooltip-format":"Download %format Files","action.download-title":"Download","action.download-title-format":"Download %format","action.maximize-window":"Maximize window","action.minimize-window":"Minimize window","action.close-window":"Close window","text.untitled":"Untitled","text.error-download-single-file":"Error occurred. File cannot be downloaded. Please contact support.","text.error-download-multiple-files":"Some files could not be downloaded. Please contact support.","text.error-fetching-files":"Error occurred, files could not be loaded. Please contact support.","text.error-fetching-folders":"Error occurred, folders could not be loaded. Please contact support.","text.error-creating-folder":"Error occurred, folder could not be created. Please contact support.","text.error-saving-file":"Error occurred, file could not be saved. Please contact support.","text.error-deleting":"Error occurred, could not delete item. Please contact support.","text.error-renaming":"Error occurred, could not rename item. Please contact support.","text.error-moving":"Error occurred, could not move items. Please contact support.","text.info-des":"DES: All existing Corel DESIGNER drawing content will be maintained when opening in Corel DESIGNER. Drawing content added in CorelDRAW.app will be editable in Corel DESIGNER, but will be locked when opening the DES file in CorelDRAW.app again. The Corel DESIGNER %version DES file format will be used.","text.file-already-exists-on-current-location":"%filename already exists in the current location. Do you want to create a new file with the same name?","text.folder-already-exists-on-current-location":"%foldername already exists in the current location. Do you want to create a new folder with the same name?","text.new-file-name-invalid":"The new file name is invalid","text.selection-multiple":"%selection %multiple","text.multiple":"multiple","text.cloud":"Cloud","text.filter-type-gvdesign":"GVDESIGN","text.filter-type-symbol":"Symbols","text.filter-type-styles":"Styles","text.filter-type-cdr":"CDR","text.filter-type-des":"DES","text.filter-type-cdrapp":"CDRAPP","action.filter":"Filtering","action.clear":"Clear"},"GDashboardFilesPanel":{"text.confirm-file-overwrite":"You selected a file when saving, do you want to continue and replace this file? Replacing it will overwrite its current content.","text.not-allowed-select-different-format-overwrite":"It is not allowed to select different file formats when saving symbols."},"GNewFilePrompt":{"text.name-document":"Please name your folder","action.create":"Create"},"GPresets":{"text.android-mobile":"Android mobile","preset-title.print":"Print","preset-sub-title.print":"Paper Size","preset.4a0":"4A0","preset.2a0":"2A0","preset.a0":"A0","preset.a1":"A1","preset.a2":"A2","preset.a3":"A3","preset.a4":"A4","preset.a5":"A5","preset.a6":"A6","preset.a7":"A7","preset.a8":"A8","preset.a9":"A9","preset.a10":"A10","preset.us-letter-portrait":"US-Letter Portrait","preset.us-letter-landscape":"US-Letter Landscape","preset.business-card":"Business Card","preset.flyer":"Flyer","preset.postcard":"Postcard","preset.book-cover":"Book Cover","preset-title.web":"Web/Desktop","preset-sub-title.web":"Screen Size","preset.blog-cover":"Blog Cover","preset.blog-graphic":"Blog Graphic","preset.website-small":"Website - Small","preset.website-normal":"Website - Normal","preset.website-medium":"Website - Medium","preset.website-large":"Website - Large","preset.website-huge":"Website - Huge","preset.full-website":"Full Website","preset-title.social":"Social Media","preset-sub-title.social":"Banner/Post Size","preset.facebook-cover":"Facebook Cover","preset.facebook-profile":"Facebook Profile","preset.facebook-story":"Facebook Story","preset.twitter-cover":"Twitter Cover","preset.youtube-cover":"YouTube Cover","preset.google-cover":"Google+ Cover","preset.google-business-profile":"Google My Business Profile","preset.google-business-cover":"Google My Business Cover","preset.google-business-post":"Google My Business Post","preset.linkedin-cover":"LinkedIn Cover","preset.linkedin-profile":"LinkedIn Profile","preset.linkedin-post":"LinkedIn Post","preset.twitch-cover":"Twitch Cover","preset.twitter-post":"Twitter Post","preset.twitter-profile":"Twitter Profile","preset.twitter-story":"Twitter Story","preset.facebook-post":"Facebook Post","preset.facebook-app":"Facebook App","preset.facebook-ad":"Facebook Ad","preset.blog-post":"Blog Post","preset.instagram-post":"Instagram Post","preset.instagram-profile":"Instagram Profile","preset.instagram-story":"Instagram Story","preset.instagram-thumbnail":"Instagram Thumbnail","preset.tumblr-graphic":"Tumblr Graphic","preset.pinterest-pin":"Pinterest Pin","preset.twitch-video":"Twitch Video","preset.linkedin-banner":"LinkedIn Banner","preset.dribble-shot":"Dribbble Shot","preset-title.screen":"Devices","preset-sub-title.screen":"Device Type","preset-title.merch":"Print on Demand","preset-sub-title.merch":"Item Type","preset.amazon-shirt-pullover":"Amazon Shirt/Pullover","preset.amazon-shirt":"Amazon Shirt","preset.amazon-pullover":"Amazon Pullover Back","preset.amazon-popsocket":"Amazon Popsocket","preset.teepublic-shirt":"Teepublic T-Shirt","preset.cafepress-shirt":"Cafepress T-Shirt","preset.redbubble-shirt":"Redbubble T-Shirt","preset.redbubble-shirt-standard":"Redbubble Standard","preset.redbubble-shirt-long":"Redbubble Long","preset.instagram-stories":""},"GLibrarySidebar":{"title":"Libraries","text.connect":"Connect to the internet to access the Library"},"GDocumentChooser":{"text.cloud.sync.title":"Cloud Synchronization","text.cloud.sync.subtitle":"We found a divergence in the hosted file, please choose the file version that you want to keep using.","text.cloud.online":"(Cloud)","text.cloud.offline":"(Local File)","text.cloud.newer-file":"(Newer file)","text.cloud.unavailable":"Unavailable"},"GItemProperties":{"text.click-through":"Click-through this element","text.scale-with-content":"Autoscale Clipped Shapes"},"GFrameProperties":{"text.frame":"Frame","text.switch-frame":"Turn On Frame Mode","text.frame-off":"Turn Off Frame Mode"},"GGroupFrameProperties":{"text.group":"Group","text.frame":"Frame","text.switch-frame":"Switch to Frame","text.switch-group":"Switch to Group"},"GOpenWelcomeScreenAction":{"title":"Show Welcome Screen"},"GCheckForUpdatesAction":{"title":"Check for Updates"},"GLoginPanel":{"text.title":"Let\'s get started!","text.subtitle":"We hope you have enjoyed using Corel Vector so far. Please create an account with our Corel Vector to continue.","text.login":"Login","text.signup":"Sign up"},"GSoftwareUpdatePanel":{"title":"Software Update","text.update-not-available":"There is currently no update available. You are using the latest version (%currentVersion)","text.download-ready":"Download ready,&nbsp;<a>install Corel Vector %newVersion now!</a>","text.download-progress":"Downloading Corel Vector %newVersion","text.update-available":"There\'s a new version available (%newVersion). You\'re currently using %currentVersion.&nbsp;","text.update-error":"Failed to update the application, please, try again later!","text.after-update":"You are now running Corel Vector %currentVersion.&nbsp;","text.see-release-notes":"See release notes","text.update-now":"Update Now!","text.force-update-information-time":"The app <span>will close automatically</span> in %minutes min.","text.force-new-version-available":"There’s a new version available (%newVersion)","text.force-message-avoid-losing-progress":"It will be installed automatically, please save your designs in order to avoid losing progress.","text.ok":"OK","text.dialog-unsaved-documents":"You have unsaved changes. Please save your designs in order to avoid losing progress.","text.updating":"Updating..."},"GApplicationManager":{"text.license-change-spectator-title":"You are now in Viewer Mode. You can only preview, open, and print designs. If you are unsure about this change, please contact your IT administrator.","text.license-change-spectator-losing-progress":"Please save your designs in order to avoid losing progress.","text.license-change-spectator-update-time":"The app <span>will automatically update</span> in %minutes min.","text.ok":"OK"},"GOfflineDialog":{"title.unavailable-feature":"This feature is not available while you are offline. Please establish an internet connection to continue.","text.offline-title":"Hey %name, please <strong>establish an internet connection with your device</strong> in order to verify your subscription details.","text.offline-title-retry":"Hey %name, in order to complete your request we need an internet connection. Please <strong>connect your device</strong> and click on “Retry.”","text.display-name-in-case-missing":"there","text.offline-subtitle":"If we are unable to connect in the next %days days, we will disable all features until an internet connection is present.","text.offline-check":"Check later","text.offline-retry":"Retry","text.offline-cancel":"Cancel","text.offline-footer":"If you have questions, please <a href=\'%link\' target=\'_blank\'>contact us here.</a>"},"GSaveStepsAction":{"title":"Save steps"},"GImportStepsAction":{"title":"Import steps"},"GInstallToDesktopAction":{"title":"Install to Desktop"},"GInstallPwaDialog":{"text.title":"Install Corel Vector to your desktop","text.description-text":"Corel Vector now comes as a PWA (Progressive Web App), that runs like a regular desktop application, no download required. It gives you everything you know (and love) from the current web app, but doesn’t require an internet connection ","text.description-pro-link":"(subscription required)","action.install-button":"Install","action.not-now-button":"Not now","text.footer-main-text":"After installing, the PWA is available as a regular desktop application and can also be found in ","action.footer-link-text":"Chrome apps","action.footer-more-information":"More information here","text.end-sentence-dot":".","text.pwa-requires":"<span>The PWA requires</span><span><a href=\'https://www.google.com/chrome\' target=\'_blank\'>Google Chrome</a> or <a href=\'https://www.microsoft.com/en-us/edge\' target=\'_blank\'>Microsoft Edge</a></span><span>in order to work.</span>"},"GShortcutsDialog":{"text.title":"Keyboard Shortcuts"},"GSetupSystemDate":{"title":"Setup System date","text.reset":"Reset"},"GTranslationToolAction":{"title":"Translation Tool"},"GFilesPanelViewBase":{"text.connect-cloud-drive":"Connect Cloud Drive","text.connect-new-cloud-drive":"Connect new Cloud drive...","text.cloud-connection-options":"Google Drive, iCloud, DropBox, OneDrive","text.add-new-cloud-drive":"Add new Cloud drive","text.connect-cloud-drive-text":"Connect %name","text.add-new-drive-text":"Add new %name Account","text.add-new-drive-suffix":"Account","text.edit-drive-title":"Edit Cloud Drive","text.button-edit-cloud-drive-disconnect":"Disconnect","text.error-validation-fill-all-fields":"Please fill next fields correctly: %fields","text.error-incorrect-configuration":"Either you\'ve not finished the login process, or there is an error in Account data","text.button-add-cloud-drive-save":"Save","text.button-add-cloud-drive-cancel":"Cancel","text.add-new-account-field-tenant":"Tenant","text.add-new-account-field-client-id":"Client ID","text.add-new-account-field-domain":"Domain","text.add-new-account-field-name":"Name","text.my-drive":"My Drive","text.personal-google-drive":"Personal Google Drive","text.refresh-drive-content":"Refresh Cloud Content","text.info-sharepoint-unavailable-safari":"SharePoint currently isn’t supported in your web browser, please try Chrome or Firefox instead.","text.show-more":"Show more ...","text.collaborators":"Collaborators","text.share-by":"Shared by <span>%name</span>","text.comments":"Comments","text.comment":"Comment","text.status":"Status","text.shared":"Shared","text.share-this-file":"Share this file","text.created":"Created %createdTime","text.can-only-share-by-owner":"This file can’t be shared by you, this is only possible for files where you are the owner."},"GFilesPanelViewSharepoint":{"action.checkout":"Check out","action.checkout-open":"Check out and open","action.checkin":"Check in","action.discard-check-out":"Discard check out","text.error-could-not-discard-check-out":"Could not discard check out","text.discard-check-out-warning-description":"If you discard your check out, you will lose all changes made to the document. Are you sure you want to discard your check out?","text.checkin-comment":"Enter comment for Check In","text.error-file-cant-be-opened":"File cannot be opened","text.error-could-not-connect-to-instance":"Could not connect to SharePoint instance","text.error-could-not-check-in":"Could not check in","text.error-could-not-check-out-open":"Could not check out and open","text.error-could-not-check-out":"Could not check out","text.error-loading-sharepoint-user-info":"Error loading SharePoint user info: %error","text.error-file-is-already-checked-out-by-someone-else":"This file is already in use.","text.choose-checkin-type":"What kind of version would like to check in?","text.checkin-type-minor":"Minor version (draft)","text.checkin-type-major":"Major version (publish)","text.checkin-type-overwrite":"Overwrite the current minor version","text.third-party-cookie-warning-message":"Please change your browser settings to <a href=\'%link\'>allow third-party cookies</a> and then try again.","text.third-party-cookie-warning-message-try-again":"Try again","text.no-access-to-download-some-selected-files":"You don\'t have permission to access some of the selected files. These files won\'t be downloaded.","text.no-access-to-download-all-selected-files":"You don\'t have permission to access the selected files.","text.button-proceed":"Proceed"},"GDashboardSharepointAuthenticator":{"text.please-close-already-authenticated":"Please close this window, you have been successfully authenticated."},"GDashboardManager":{"text.failed-get-file":"Failed to get file, please try again later!"},"GExternalStorage":{"text.error-file-cant-be-null":"File can not be null","text.error-window-blocked":"Window is blocked","text.error-window-blocked-alternative":"Please allow pop-ups for Corel Vector in browser settings to continue."},"GHeader":{"action.context-menu.duplicate":"Duplicate","action.context-menu.close-other":"Close Other Files","text.close-other-tabs-confirmation":"Do you really want to close all other files?","text.close-all-tabs-confirmation":"Do you really want to close all files?","action.context-menu.close-all":"Close All"},"GUserNameConfigDialog":{"text.ok":"OK","text.dialog-title":"Hi! Nice to meet you...","text.name-usage-tips":"Please enter your full name so that we identify you when adding comments or annotations.","text.first-name":"First Name","text.last-name":"Last Name"},"GMSTeamsAuthenticator":{"text.offline":"It seems like there is a connection issue. Please try again later.","text.onedrive-business-error":"You don’t seem to be signed in with an account that is allowed to access OneDrive Business inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.sharepoint-error":"You don’t seem to be signed in with an account that is allowed to access SharePoint inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.not_registered":"You don’t seem to signed in with an account that is allowed to access CorelDRAW.app, please sign in using a valid account.","text.sharepoint-onedrive-business-error":"You don’t seem to be signed in with an account that is allowed to access SharePoint and OneDrive Business inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.failed-to-open-window":"It seems your browser is blocking pop-ups, please see the icon in the address bar. Please click “Authenticate” to try again.","text.cancelled-by-user":"We couldn\'t log you in, please try again to be able to use CorelDRAW.app.","text.unknown":"Unknown error, Please contact support.","text.authenticate":"Authenticate","text.try-again":"Try again","text.error_no_client_id":"Your user isn\'t properly configured for accessing CorelDRAW.app on Microsoft Teams, please contact your IT administrator","text.error_user_not_registered":"To sign in to CorelDRAW.app for Teams for creating or editing designs, you must have a licensed copy or an active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).<br />Please ensure:<br /><ol><li>You have Enterprise License of Corel Draw Graphics Suite.</li><li>You can sign in to CorelDRAW.app with your account via MSO365 option on <a href=\'https://coreldraw.app/?enterprise\' target=\'_blank\'>Enterprise  sign in page</a>.</li></ol> Please visit <a href=\'https://www.coreldraw.com/\' target=\'_blank\'>www.coreldraw.com</a> for more information.","text.error_empty_hash":"Error occured: Empty Request Hash. Please try to reload Tab/Application.","text.error_no_command_found":"Error occured: No Commands Found in Hash. Please try to reload Tab/Application.","text.error_incorrect_hash_command":"Error occured: Wrong Hash Command. Please try to reload Tab/Application"},"GMSTeamsConfigRenderer":{"text.main-title":"Please select an option:","text.new-file-option":"Create New File","text.template-option":"New from Template","text.template-category-view-title":"Select template category","text.template-view-title":"Select template of \\"%category\\" category (%width×%height %unit)","text.create-button":"Create","text.warnings-header":"Warnings:","text.new-file-select-preset":"Select predefined size","text.existing-file-option":"Open Existing File","text.file-name-label":"Enter File Name","text.file-name-placeholder":"New CDA File Name","text.file-extension-label":"Select File Format","text.existing-file-view-title":"Choose a file","text.existing-file-shared-on":"Shared on:","text.existing-files-no-results":"No items found for this chat/channel. Please create new file or choose another chat/channel","text.existing-file-no-permission":"This file can\'t be selected, be sure you have the right permissions!","text.error-not-authenticated-existing-files":"We could not load your existing files because of authentication error. Please try again later or contact your administrator","text.error-not-authenticated":"We could not authenticate you. Please try again later or contact your administrator","text.error-user-doesnt-exist":"This user doesn\'t exist. Please contact your domain administrator","text.error-could-not-create-new-file":"Could not create new file.","text.error-conflict-file":"The filename is already used. Please go back and change it!","text.error-file-name-empty":"File name should not be empty. Please fill it in.","text.error-file-name-rules":"The file name cannot contain \'/\', \'\\\\\', \'|\' illegal characters. Please modify it.","text.error-create-file-request":"Create File request error","text.go-back-button":"‹ Go back","text.go-back-to-configuration-button":"‹ Go back to the file configuration","text.warning-could-not-share-new-file":"Could not share new file","text.warning-could-not-post-new-file-to-chat":"Could not post new file to chat","text.long-creation-time-notification":"Please wait! This might take a while.","text.file-created-successfully":"The file was saved successfully! Please click on Save to finish. ↓","text.filename-default":"Untitled-1"},"GMSTeamsOneDriveBusinessProvider":{"text.error-no-personal-chats-folder":"Could not find MS Teams Personal Chats folder"},"GUnshareButton":{"text.unshare-with-me":"Unshare with me"},"GToggleFillsAction":{"title":""},"GUnshareWithMeAction":{"title":"Unshare with me"},"GChangeAnchorPointsJointTypeAction":{"title":""},"GBanner":{"text.access-expire":"Your access to Corel Vector has expired. Unlock continued access to these flexible tools by visiting our website to <a target=\'_blank\' href=\'%link\'>subscribe today</a>"}},"translationsExtended":{},"translationsExtendedTemporary":{},"translationsTemporary":{},"etag":"608b3df09c02803797a2015c99192c33"},{"language":"German","keyValue":1,"abbreviation":"de-DE","isDefault":false,"isAvailable":true,"realName":"Deutsch","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Chinese","keyValue":2,"abbreviation":"zh-CN","isDefault":false,"isAvailable":true,"realName":"簡體中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Portuguese","keyValue":3,"abbreviation":"pt-BR","isDefault":false,"isAvailable":true,"realName":"Português","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Spanish","keyValue":4,"abbreviation":"es-ES","isDefault":false,"isAvailable":true,"realName":"Español","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"French","keyValue":5,"abbreviation":"fr-FR","isDefault":false,"isAvailable":true,"realName":"Français","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Polish","keyValue":6,"abbreviation":"pl-PL","isDefault":false,"isAvailable":true,"realName":"Polski","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Russian","keyValue":7,"abbreviation":"ru-RU","isDefault":false,"isAvailable":true,"realName":"Русский","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Turkish","keyValue":8,"abbreviation":"tr-TR","isDefault":false,"isAvailable":true,"realName":"Türkçe","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Czech","keyValue":9,"abbreviation":"cs-CZ","isDefault":false,"isAvailable":true,"realName":"Čeština","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"ChineseTaiwan","keyValue":10,"abbreviation":"zh-TW","isDefault":false,"isAvailable":true,"realName":"繁體中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Italian","keyValue":11,"abbreviation":"it-IT","isDefault":false,"isAvailable":true,"realName":"Italiano","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Japanese","keyValue":12,"abbreviation":"ja-JP","isDefault":false,"isAvailable":true,"realName":"日本語","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Dutch","keyValue":13,"abbreviation":"nl-NL","isDefault":false,"isAvailable":true,"realName":"Nederlands","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Swedish","keyValue":14,"abbreviation":"sv-SE","isDefault":false,"isAvailable":true,"realName":"Swedish","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}}]'
        );
    },
    function (e) {
        e.exports = JSON.parse(
            '[{"language":"English","keyValue":0,"abbreviation":"en-US","isDefault":true,"isAvailable":true,"realName":"English","translations":{"GLoggedIn":{"text.you-were-logged-in":"You were logged in successfully","text.you-can-close-this-page":"You can close this page and return to the desktop application of Corel Vector."},"GShareRoles":{"text.role-no-access-name":"No Access","text.role-no-access-description":"Don\'t have access to this design","text.role-owner-name":"Owner","text.role-viewer-name":"Viewer","text.role-viewer-description":"Can open and view the design","text.role-viewer-description-alt":"Now you can only view this file.","text.role-viewer-invitation-message":"%name invited you to view","text.role-viewer-invitation-info":"You can View the design, but can’t edit, annotate or export.","text.role-viewer-status":"You can only preview this design.","text.role-developer-name":"Developer","text.role-developer-description":"Can inspect elements, save and export","text.role-developer-description-alt":"Now you can inspect, save and export this file.","text.role-developer-invitation-message":"%name invited you to inspect","text.role-developer-invitation-info":"You can View, Inspect, Export assets or Save a copy of this design.","text.role-developer-status":"You can inspect and save a copy of this design, as well as export.","text.role-reviewer-name":"Reviewer","text.role-reviewer-description":"Can comment on the design and annotate","text.role-reviewer-description-alt":"Now you can view, comment and annotate this file.","text.role-reviewer-invitation-message":"%name invited you to review","text.role-reviewer-invitation-info":"You can View and Comment/Annotate on this design.","text.role-reviewer-status":"You can preview, comment and annotate this design.","text.role-approver-name":"Approver","text.role-approver-description":"Can approve the file","text.role-approver-description-alt":"Now you can view, comment and annotate this file, as well as approve the final revision.","text.role-approver-invitation-message":"%name invited you to review/approve the following design:","text.role-approver-invitation-info":"You can comment and annotate this design as well as approve the final version. Please check the “Comments” docker on the right to find all the necessary tools.","text.role-approver-status":"You can preview, comment and annotate this design, as well as approve the final revision.","text.role-co-author-name":"Co-Author","text.role-co-author-description":"Can edit the design","text.role-co-author-description-alt":"Now you can edit this file","text.role-co-author-invitation-message":"%name invited you to collaborate on","text.role-co-author-invitation-info":"You can edit elements from this design. Your changes will be saved back to original file in real-time.","text.role-co-author-status":"You can add and edit objects in this design, as well as comment and annotate. All changes will be saved in real-time.","text.role-content-editor-name":"Content editor","text.role-content-editor-description":"Can edit selected text content","text.role-content-editor-description-alt":"Now you can edit marked text objects in this file, as well as comment and annotate.","text.role-content-editor-invitation-message":"%name invited you to edit content on the following design:","text.role-content-editor-invitation-info":"You can edit marked text elements from this design. Double-click on marked text elements to edit them. Use the “Finish Editing” button to preview and save your changes.","text.role-content-editor-status":"You can edit marked text objects in this design, as well as comment and annotate.","text.invitation-message-cdss-csl":"%name has shared the following file with you:","text.invitation-info-cdss-csl":"Use these assets in your designs by linking the file to your document from the Assets docker."},"GNotifications":{"email-subject.corporate-license-changed":"Your CorelDRAW.app Corporate License was changed","email-subject.new-comment-annotation":"New comment/annotation (%file)","email-subject.new-reply":"New reply (%file)","email-subject.comment-annotation-assigned":"A comment/annotation was assigned to you (%file)","email-subject.comment-annotation-resolved":"A comment/annotation was resolved (%file)","email-subject.comment-annotation-reopened":"A comment/annotation was reopened (%file)","email-subject.comment-annotation-edited":"A comment/annotation was edited (%file)","email-subject.comment-annotation-deleted":"A comment/annotation was deleted (%file)","email-subject.comment-annotation-mentioned":"You were mentioned in a comment/annotation (%file)","email-subject.reply-assigned":"A reply was assigned to you (%file)","email-subject.reply-edited":"A reply was edited (%file)","email-subject.reply-deleted":"A reply was deleted (%file)","email-subject.reply-mentioned":"You were mentioned in a reply (%file)","email-subject.design-approved":"Design was approved (%file)","email-subject.design-reopened":"Design was reopened (%file)","email-subject.design-in-review":"Design was set back to review (%file)","email-subject.design-updated":"There is an updated version of the design (%file)","email-subject.design-request-approval":"Design approval was requested (%file)","email-subject.design-request-comment":"New request to comment (%file)","email-subject.design-request-access":"New access request (%file)","email-subject.role-changed":"Your role was changed to \\"%role\\" (%file)","email-subject.content-editor-text-changes":"There are new text changes (%file)","email-subject.design-user-request":"%user wants to have the following permissions to your design \\"%file\\": %permissions"},"GReminderDialogFactory":{"text.unknown-date":"(Unknown)","text.remaining-days":"%days days left in your trial","text.remaining-day":"1 day left in your trial","text.expires-today":"Your trial expires today"},"GServerTranslations":{"MAGIC_LINK_INVALID_TOKEN":"Invalid token!","MAGIC_LINK_FAILED_ACTIVATE":"Failed to activate magic link","MAGIC_LINK_FAILED_CREATING":"Failed to create magic link","MAGIC_LINK_FILE_NOT_ALLOW_ACCESS":"You are not allowed to access this design.","MAGIC_LINK_INVALID_INFO":"Invalid information","MAGIC_LINK_EMAIL_SENT":"Magic link was sent to your email account!","MAGIC_LINK_EMAIL_SUBJECT":"Your guest sign-in link (%file)","ACTION_INSERT":"added","ACTION_REMOVE":"deleted","ACTION_EDIT":"edited","ACTION_RESOLVE":"resolved","ACTION_REOPEN":"reopened","ACTION_APPROVE":"approved","ACTION_ASSIGN":"assigned","OPEN_IN_APP":"Open in %app","email-template-share-file-subject":"%from has shared a design with you (%file)","email-template-share-file-open-design":"Open the design","email-template-share-file-invited":"%name invited you to collaborate on","email-template-share-file-learn-more":"Learn more about how collaboration works in Corel Vector User Guide.","email-template-unshare-file-subject":"The file %file was unshared from you","CIRCULAR_REFERENCE_ERROR":"Can’t perform this command, it’s not allowed to paste a folder inside itself","COREL_ERROR_1001":"Error: There are no subscriptions in your records.","COREL_ERROR_1005":"Error: Invalid Credentials.","COREL_ERROR_1008":"Error: Unexpected Error.","COREL_ERROR_1009":"Error: Profile not Found.","DUPLICATE_VALUE":"Already Exists.","INVALID_VALUE":"Invalid Value","INVALID_USERNAME":"Invalid username, it must contain at least 3 characters among numbers, letters and _ or -.","INVALID_FIRST_NAME":"Invalid first name, some characters are not allowed.","INVALID_LAST_NAME":"Invalid last name, some characters are not allowed.","USERNAME_ALREADY_EXISTS":"The username already exists.","INVALID_EMAIL":"Invalid or nonexistent email.","INVALID_PASSWORD_IS_REQUIRED":"A password is required.","INVALID_PASSWORD_TOO_SHORT":"A minimum of %number characters is required for password.","INVALID_PASSWORD_TOO_LONG":"A maximum of %number characters is required for password.","INVALID_PASSWORD_NO_DIGITS":"A password must contain digits.","INVALID_PASSWORD_NO_LOWERCASE":"A password must contain lower case characters.","INVALID_PASSWORD_NO_UPPERCASE":"A password must contain upper case characters.","INVALID_PASSWORD_NO_SPECIAL_CHARACTERS":"A password must contain special characters.","BLOCKED_COUNTRY":"Sorry, this product is not available in your country.","EMAIL_ALREADY_EXISTS":"Email already exists.","EMAIL_NOT_EXISTS":"Email doesn\'t exist.","PASSWORD_NOT_EXISTS":"You don\'t have a password yet. Please click on \\"Forgot your password?\\" to create one.","USER_NOT_EXISTS":"User do not exist.","WRONG_PASSWORD":"The password is wrong.","GREETING":"Howdy","AUTH_GREETING_PLEASE_CLOSE_ALREADY_AUTHENTICATED":"Please close this window, you have been successfully authenticated.","GOODBYE":"Good Bye","PASSWORD_DO_NOT_MATCH":"Passwords do not match.","EMAIL_OR_USERNAME_NOT_EXISTS":"This email or username doesn\'t exist","REACHED_LIMIT_FOR_ACTION":"You have reached the limit for this action in the last %number hours. Please, check your email or try again later","NOT_AUTH":"Not Authorized","NOT_FOUND":"Nothing Here","INSUFFICIENT_PERMISSIONS":"You don\'t have the permission","USER_PASSWORD_DO_NOT_MATCH":"Your email/username and password don\'t match. Please try again!","CONTACT_SUPPORT":"Contact support","NEED_HELP":"Need help?","LOGIN__LOGIN":"Email or Username","LOGIN__EMAIL":"Email","LOGIN__PASSWORD":"Password","LOGIN__PASSWORD_FORGOT":"Forgot password?","LOGIN__REMEMBER_ME":"Remember me","LOGIN__ACTION":"Login","LOGIN__NOT_YET_REGISTERED":"New to Corel Vector? ","LOGIN__SIGNUP_NOW":"Create an Account","LOGIN__OAUTH":"Sign in with","LOGIN__EULA_ACCEPT":"Accept","LOGIN__EULA_DECLINE":"Decline","AVATAR_IMAGE_TOO_BIG":"Please keep image under 100 kB and use PNG or JPG format","SIGNUP__YOUR_USERNAME":"Your Username","SIGNUP__YOUR_NAME":"Your Name","SIGNUP__YOUR_EMAIL_ADDRESS":"Your Email","SIGNUP__YOUR_PASSWORD":"Choose a password (min. 6 chars)","SIGNUP__EMAIL_NOT_GIVEN_AWAY":"We promise not to misuse it!","SIGNUP__PASSWORD":"Password","SIGNUP__START_NOW":"Start Now!","SIGNUP__ALREADY_REGISTERED_QUESTION":"Already registered?","SIGNUP__GO_TO_LOGIN":"Go back to login","CONFIRM_EMAIL__INVALID_TOKEN":"Sorry the email confirmation link is expired","CONFIRM_EMAIL__MAIL_SENT":"An Email has been sent for activating the account. Please also check the SPAM Folder. <br><a href=\\"%serverUrl/resend-confirm-email\\" target=\\"_blank\\">Click here if you want to receive another email!</a>","CONFIRM_EMAIL__MAIL_SUBJECT":"Activate Your Account","CONFIRM_EMAIL__SUCCESS":"Email confirmed successfully","CONFIRM_EMAIL__EMAIL_ALREADY_CONFIRMD":"Your account was already confirmed!","FOLLOWUP_EMAIL__MAIL_SUBJECT":"Activate Your Corel Vector Account","RESEND_CONFIRM_EMAIL__SUBMIT":"Resend Email","RESEND_CONFIRM_EMAIL__HELP":"We will send at this email a link to confirm your email, or","RESEND_CONFIRM_EMAIL__MAIL_SENT":"An email has been sent for activating the account, if it exists. Please also check the SPAM Folder.","RESET_PASSWORD__TITLE":"Reset Password","RESET_PASSWORD__HELP":"We will send at this email a link to reset your password, or","RESET_PASSWORD__INVALID_TOKEN":"Sorry the password reset link is expired","RESET_PASSWORD__REQUEST_RESET":"Reset Password Now","RESET_PASSWORD__REMEMBER":"Remember your password again?","RESET_PASSWORD__GO_TO_LOGIN":"Login","RESET_PASSWORD__MAIL_SENT":"An email has been sent to this account if it exists. Please also check the SPAM folder.","RESET_PASSWORD__SET_NEW_TITLE":"Choose your new password for","RESET_PASSWORD__NEW_PASSWORD":"New password","RESET_PASSWORD__NEW_PASSWORD_CONFIRM":"Confirm new password","RESET_PASSWORD__SUBMIT":"Send request","RESET_PASSWORD__SET_NEW_PASSWORD":"Assign new password","RESET_PASSWORD__SUCCESS":"Your new password was successfully assigned.","RESET_PASSWORD__MAIL_SUBJECT":"Reset your password","RESET_PASSWORD__MAIL_TITLE":"Please follow this link to reset the password for your account:","RESET_PASSWORD__MAIL_ACTION":"Assign new password","CHANGE_PASSWORD_PASSWORDS_DO_NOT_MATCH":"Passwords do not match.","CHANGE_PASSWORD_INVALID_OLD_PASSWORD":"The old password is invalid.","PLEASE_INFORM_BOTH_PASSWORD_OLD_AND_NEW":"Please, inform both new and old password if you want to change it!","SUBSCRIPTIONS_MUST_BE_CANCELED":"There is an active subscription. Subscriptions must be cancelled to proceed it.","CONTENTPROVIDERINTERFACE_ERROR_FETCHING_FILE":"Failed to fetch the file","CONTENTPROVIDERINTERFACE_ERROR_SEARCHING_CONTENT":"Failed to search for content","CONTENTPROVIDERINTERFACE_ERROR_FETCHING_CONTENT_DETAILS":"Failed to retrive the content\'s detail","INVALID_COREL_LOGIN":"Invalid Corel account name/password","COREL_PROFILE_ID_ALREADY_EXISTS":"This Corel account is already assigned to a CorelDRAW account","COREL__LOGIN":"Corel Account Name","COREL__PASSWORD":"Corel Account Password","COREL__ACTION":"Login","COREL__CANCEL_ACTION":"Cancel","ENTERPRISE_INVALID_LOGIN":"This account isn’t recognized for accessing CorelDRAW.app Enterprise. If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator.","NO_SUBSCRIPTIONS":"There are no subscriptions in your records.","PROFILE_NOT_FOUND":"Corel account doesn\'t exist","UNEXPECTED_ERROR":"Unexpected error","email-template-default-thanks1":"Thanks,","email-template-default-thanks2":"the Corel Vector Team","email-template-default-copyright":"Copyright &copy; %year Corel Corporation. All rights reserved.","email-template-default-facebook-title":"Facebook","email-template-default-instagram-title":"Instagram","email-template-default-twitter-title":"Twitter","email-template-default-facebook-url":"https://www.facebook.com/GravitDesigner/","email-template-default-instagram-url":"https://www.instagram.com/gravitdesigner","email-template-default-twitter-url":"https://twitter.com/gravitdesigner","email-template-confirm-email-welcome1":"Welcome, %name!","email-template-confirm-email-welcome2":"Welcome to Corel Vector, %name!","email-template-confirm-email-msg1":"Thanks for joining</br>&nbsp;Corel Vector","email-template-confirm-email-msg2":"Just one small step before you start. Click the button below to activate your account, and happy designing!","email-template-confirm-email-msg3":"Please activate your account by clicking below.","email-template-confirm-email-successfully-purchased":"You successfully purchased a Corel Vector subscription! Please activate your account by clicking below.","email-template-confirm-email-activate1":"ACTIVATE ACCOUNT","email-template-confirm-email-activate2":"Activate Your Account","email-template-confirm-email-maycopy":"You may copy/paste this link into your browser:","email-template-followup-email-title":"Corel Vector","email-template-followup-email-msg":"You signed up for Corel Vector and you haven\'t activated your account yet! <span class=\'highlight\'><a href=\'%link\'>Activate your account today</a></span> to get designing today.","email-template-followup-email-quote":"“Every time I use @GravitDesigner, my toes curl in excitement. How is this free? If even one person reading this tweet needs an SVG editor, I hope to heaven they check out Corel Vector.” - @rvanarsdale","email-template-followup-email-activate":"Activate My Account","email-template-reset-password-welcome":"Hi, %name!","email-template-reset-password-msg1":"Looks like you forgot your password...","email-template-reset-password-msg2":"... don\'t worry, it happens.","email-template-reset-password-msg3":"To reset your password, click on the button below:","email-template-reset-password-reset":"RESET PASSWORD","email-template-reset-password-maycopy":"You may copy/paste this link into your browser:","email-template-reset-password-msg-footer":"If you didn\'t request to change your password, </br>that\'s ok, just ignore this email.","email-template-notification-new":"new","email-template-notification-action-msg-design":"%name has %action the following design:","email-template-notification-action-msg-design-in-review":"%name has set the design to be reviewed again:","email-template-notification-action-msg-design-request-approval":"%name has requested approval for the following design:","email-template-notification-action-msg-comment-annotation":"%name has %action a comment/annotation in the following design:","email-template-notification-action-msg-mention-comment-annotation":"%name has mentioned you in a comment/annotation in the following design:","email-template-notification-action-msg-replied-comment-annotation":"%name has replied to your comment/annotation in the following design:","email-template-notification-action-msg-reply":"%name has %action a reply in the following design:","email-template-notification-action-msg-mention-reply":"%name has mentioned you in a reply in the following design:","email-template-notification-action-msg-file-updated":"%name has added an updated version of the following design:","email-template-notification-action-msg-role-change":"Your role was changed to %role by %owner. %permissions","email-template-notification-action-msg-corporate-license-change":"You are now in <b>Viewer Mode</b>. You can only preview, open, and print designs. If you are unsure about this change, please contact your IT administrator.","email-template-notification-action-msg-request-commenting":"%name has requested commenting access for the following design:","email-template-notification-action-msg-request-access":"%name has requested viewing access for the following design:","email-template-notification-action-msg-updated-text":"%name has updated text content inside the following design:","email-template-notification-empty-comment":"This annotation doesn\'t have a comment yet","email-template-notification-reopened-comment":"Re-opened","email-template-notification-resolved-comment":"Marked as resolved","email-template-notification-assigned-comment":"Assigned the comment to you","email-template-notification-request-commenting-subtext":"You can allow commenting by changing the assigned role of this user to \\"Reviewer\\" or \\"Approver\\" in the Share dialog.","email-template-notification-request-access-subtext":"You can allow access by adding this user’s email address in the Share dialog and assign an appropriate role.","email-template-notification-updated-version-subtext":"Please download this file though File → Save as… and open it in CorelDRAW.","email-template-notification-recent-updates":"Here are the recent updates to %file:","email-template-notification-edit-changes":"New annotations, replies and mentions:","email-template-notification-action-changes":"Assigned, resolved, reopened comments:","email-template-notification-approval-flow-changes":"Approval flow state changes:","email-template-notification-permission-requests":"Permission requests:","email-template-magiclink-action-msg":"Please click on the link below to access the design as a guest:","email-template-magiclink-subtext":"Please note, that this link will be valid only one week and can be used only once. After that, you need to fill in your information again and send a new sign-in link by clicking on the design link above.","email-template-file-unshare-action-msg":"The file %file was unshared by %name.","email-template-file-unshare-subtext":"You have lost access to it.","ENTERPRISE_ACCOUNTS_DISABLED":"Enterprise accounts are disabled","ENTERPRISE_ACCOUNT_DEACTIVATED":"Your account has been deactivated. Ask your IT for access.","SPECIAL_LINK_NEEDED_ACTIVATE_ACCOUNT":"Special link needed to activate account","LICENSE_ALREADY_REACHED_MAXIMUM_USER_COUNT":"Your license already reached maximum user count","CORPORATE_DOMAIN_DEACTIVATED":"Corporate domain deactivated","CORPORATE_DOMAIN_EXPIRED":"Corporate domain expired","CORPORATE_CUSTOMER_DOESNT_EXIST":"Corporate customer does not exist","CORPORATE_DOMAIN_DOESNT_EXIST":"Corporate domain does not exist","EMPTY_EMAIL":"Empty email","GOOGLE_DRIVE_FAILED_GETTING_CONFIG":"Failed getting Google Drive configuration","COUPON_ALREADY_PRO":"You already have a license!","COUPON_INVALID":"Coupon invalid. Please check your coupon and try again!","COUPON_REDEEMED":"Coupon already redeemed!","COUPON_USAGE_EXCEEDED":"Usage limit exceeded for coupon!","COUPON_FAILED_ACTIVATING":"Failed activating coupon!","COUPON_ACTIVATED":"Coupon activated!","email-template-confirm-email-welcome":"Welcome, %name!","email-template-confirm-email-activate":"ACTIVATE ACCOUNT","magic_link_file_no_access":"The file either can’t be found or it’s not shared with you.","magic_link_email_already_in_use":"%email is already in use, please check if it’s a correct address.","corporate_domain_not_allowed_sign_in_as_guest":"%email belongs to a registered Corporate domain and it\'s not allowed to Sign in as Guest, please use the default login method.","RESTRICT_ASSET_SHARE_ERROR":"This email is not associated with a valid CorelDRAW user. Please check the email and try again.","INVALID_PASSWORD":"A minimum of 6 characters is required for password."},"GLoginDialog":{"text.continue":"Continue","text.continue-to-purchase":"Continue to Purchase","text.continue-to-day-trial":"Continue to %days-day Trial","text.continue-to-free-trial":"Continue to Free Trial","text.title":"Welcome to Corel Vector","text.title-title":"Thank you for choosing Corel Vector,","text.title-title-account-created":"Thank you for choosing Corel Vector!","text.title-subtitle":"please create an account or sign in to continue","text.title-title-anonymous":"Thank you for trying out Corel Vector.","text.title-subtitle-anonymous":"Please create an account or log in to continue.","text.pro-title":"Become a PRO","text.pro-subtitle":"Experience the full power of Corel Vector with advanced features and streamlined workflows tailored for Professionals","text.pro-topic-1":"Desktop apps with offline access","text.pro-topic-2":"Professional export workflow with PDF at 300dpi and advanced SVG options","text.pro-topic-3":"1GB of file storage","text.pro-topic-4":"An ever-growing library of professionally designed Templates, UI Kits, and other design assets","text.pro-topic-5":"CMYK color space, Manage Colors with swatches","text.pro-topic-6":"Make changes in your design quickly through Shared styles, Color swatches, and Master pages","text.pro-topic-7":"Use custom and system fonts","text.pro-topic-8":"and much, much more...","text.pro-learn-more":"Learn more about PRO here","text.pro-offer-title":"Introductory offer valid for 90 DAYS","text.pro-offer-price":"Get Corel Vector now for just %price/Mo.","text.pro-offer-info":"will be billed annually (until %date)","text.pro-info":"Regular price after %date is %price/mo., billed annually. You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.pro-subinfo":"Learn more about pricing and features of PRO here.","text.placeholder-sign-in-login":"Email or Username","text.placeholder-sign-in-password":"Password","text.sign-in-title":"Log In","text.sign-in-button":"Log In","text.sign-in-login":"Username / Email address","text.sign-in-password":"Password","text.forgot-password":"Forgot your password?","text.or":"or login with","text.sign-facebook":"Facebook","text.sign-google":"Google","text.not-register":"Not registered yet?","text.sign-up":"Create account","text.sign-info":"With your free account you can try out all PRO features for %days days. After the trial period is over, you can continue using the free version of Corel Vector for as long as you like. Enjoy!","text.not-register-subtitle":"Create an account to begin your free trial!","text.create-account-info":"By logging in with my Google account<br /> I agree to the <a href=\'https://www.corel.com/terms/\'>Terms of Use</a>. My personal data will be processed in accordance with the descriptions of the <a href=\'%privacy-link\'>Privacy Statement</a>","text.sign-up-title":"Register","text.agree":"I agree to the ","text.terms-use":"Terms of Use","text.eula":"End User License Agreement","text.agreement":"I agree to the %terms-of-use and %end-user-license-agreement.","text.privacy-statement":"My personal data will be processed in accordance with the descriptions of the ","text.privacy-statement-link":"Privacy Statement.","text.info-privacy-statement":"All information is confidential and will not be shared with any 3rd party. ","text.info-privacy-statement-link":"Privacy Policy","text.newsletter":"Get critical software updates and exclusive offers.","text.sign-up-email":"Email Address","text.sign-up-username":"Username","text.sign-up-password":"Password","text.sign-up-password-min-max":"(use %min-number to %max-number chars.)","text.sign-up-password-min":"","text.sign-up-now":"Begin trial","text.sign-up-already":"Already have an account?","text.sign-up-go-back":"Go back to login.","text.reset-password-send":"Send Request","text.welcome-back":"Welcome back, %name!","text.special-offer":"Special offer for you!","text.go-pro":"GO PRO NOW FOR JUST %price/mo.","text.hey":"Hey %name,<br>Thank you for being a Corel Vector user!","text.valid-until":"VALID UNTIL %date","text.buy-now":"BUY NOW for %price.","text.default-info":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.default-info-promo":"Regular price after %date is %price, billed annually.<br><br>You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.title-xmas-title":"This Holiday Season","text.title-xmas-subtitle":"Unwrap the Gift of a New Design Tool","text.tooltip-trouble-login":"If you have trouble logging in, please contact us at %support-link","text.create-free-account":"Create free account","text.title-create-account":"Create an account to begin your %days day free trial.","text.first-name":"First name","text.last-name":"Last name","text.account-created":"Your account was successfully created!","text.confirmation-account-created":"We have sent a confirmation to <strong>%email</strong>.","text.confirmation-account-created-subtitle":"Please click on the link in the email to activate your account and begin your %days day trial of Corel Vector","text.confirmation-account-created-subtitle-select":"<br><br>To continue, please select an option below:","text.confirmation-account-created-explain-trial":"When the trial is over, you will be able to use the free version of Corel Vector for as long as you like.","text.email-not-received-part-1":"If you didn\'t receive the email, please be sure to check the spam/junk folder of your email client. Otherwise, you can","text.email-not-received-part-2":"send the activation email again here.","text.confirmation-account-created-free":"Start with the free version of Corel Vector now and use your free trial of PRO at a later date.","text.ok":"ok","text.or2":"or","text.try-out-trial-text":"Try Out Corel Vector For %days Days","text.get-started-free-button":"Get Started Free","text.topic-title-1":"Easy to learn and use","text.topic-content-1":"A flexible interface, hundreds of templates, and thousands of stock photos, fonts, graphics, and more make it easy to get started.","text.topic-title-2":"Access from anywhere","text.topic-content-2":"Work across your preferred platforms and touch-enabled devices, and keep your designs safe, synced, and available with unlimited cloud storage.","text.topic-title-3":"Unleash your creativity","text.topic-content-3":"Leverage powerful tools for vector editing, multi-page layout designs, text and typography, non-destructive filters and effects, and so much more.","text.xmas-topic-1":"Click Create FREE Account.","text.xmas-topic-2":"Finish your purchase in two clicks using the in app cart.","text.xmas-topic-3":"Get started using Corel Vector!","text.xmas-header":"Unlock the full power of your<br> photos & harness your creativity with a flexible, professional<br> vector design app.","text.xmas-header-2":"It\'s as easy as 1-2-3!","text.xmas-discount":"<span>Get it Today & Save %discount <mark>— Only %price</mark><span>`","text.pro-info-header":"Dive into fast, flexible, powerful vector editing and graphic design tools.","text.pro-info-header-anonymous":"Corel Vector is a full-featured vector graphic design app that works on ALL platforms.","text.offer-1-title":"Get Started Designing Like a PRO","text.offer-1-subtitle":"Explore these Powerful Tools to Unleash your Creativity.","text.offer-1-topic-1":"Import your existing EPS files and keep working on them.","text.offer-1-topic-2":"Create your personal design system with color swatches and shared styles.","text.offer-1-topic-3":"Employ advanced symbol features like nesting and overrides.","text.offer-1-topic-4":"Discover the powerful Bezigon tool, that makes drawing perfect curves a snap.","text.offer-1-action-title":"Learn more","text.offer-1-buy-now":"BUY NOW","text.learn-more":"LEARN MORE","text.terms-use-privacy-policy-separator":"&","text.privacy-policy":"Privacy Policy","text.select-option":"Please Select an Option to Continue","text.version":"Version: <b>%version</b>","text.title-discontinued":"Corel Vector is being discontinued soon","text.title-discontinued-thanks":"Thank you for being a valued customer.","text.title-discontinued-eol-date":"Corel Vector is officially retiring on August 31, 2025.","text.title-discontinued-eol-date-details":"After this date, the software and any files saved to your Corel Vector account will no longer be available. If you have questions, please <a href=\'%support-link\' target=\'_blank\'>contact our support team</a>.","text.title-discontinued-avoid-losing-work":"To avoid losing your work, export and save your designs before August 31, 2025.","text.title-discontinued-avoid-losing-work-details":"To find step-by-step instructions, visit the tutorial:","text.title-discontinued-export-your-files":"Export your files","text.title-discontinued-sign-up-closed":"Corel Vector sign-up is now closed.","text.title-discontinued-sign-up-closed-details":"You can no longer create an account. To explore alternative graphic design applications, visit <a href=\'%product-link\' target=\'_blank\'>CorelDRAW.com</a>.","text.title-discontinued-sign-up-closed-learn-more":"Learn more","text.title-discontinued-notice":"Notice: After <b>August 31, 2025</b>, you will no longer be able to access the software."},"GReminderDialog":{"text.pro-expire-title":"Hey %name, just a friendly reminder that your Corel Vector subscription will <strong>expire next %timeunit</strong> on %date.<br>We hope that you are enjoying enhanced PRO experience so far!","text.pro-expire-subtitle":"Extend your subscription","text.pro-expired-title":"Hey %name, your Corel Vector subscription <mark>has now expired.</mark>","text.pro-expired-subtitle":"Renew your subscription","text.trial-expired-title":"Hey %name, your Corel Vector <mark>trial period has expired.</mark>","text.trial-expired-subtitle":"Upgrade to PRO","text.trial-expired-subtitle-promo":"UPGRADE TO PRO WITH THIS LIMITED TIME OFFER","text.default-info":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.","text.default-info-promo":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>. You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.default-subinfo":"You can cancel your subscription at all times (but no money is refunded<br>and the subscription runs until the end of the period).","text.default-subinfo-promo":"Regular price after %date is %price, billed annually. You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.buy-now":"BUY NOW for %price.","text.buy-now-offline":"BUY NOW","text.pro-dismiss-info":"If you click on \\"Dismiss\\", all <a data-cmd=\'learnmore\'>PRO features</a> will be disabled and your account<br>will be downgraded to the free version.","text.pro-dismiss-subinfo":"You can continue using Corel Vector for free as long as you want. Your Cloud files that exceed the limit of %limit will be kept for one more week before they are deleted permanently. You can renew your subscription at any time at your <a data-cmd=\'settings\'>account settings</a>.","text.pro-dismiss-title":"DISMISS","text.month":"month","text.days":"days","text.continue-as-free":"Continue with Corel Vector Free","text.your-pro-subscription":"Your Corel Vector subscription","text.your-subscription-expires-date":"will <mark>expire on %date</mark>","text.subscription-expires-today":"Your Corel Vector subscription expires <mark>today</mark>","text.subscription-expired":"Your Corel Vector subscription has <mark>expired</mark>","text.trial-expired":"Your Corel Vector <mark>Trial has Expired!</mark>","text.upgrade-screen":"All the design power you need, wherever you are!"},"GCommonNames":{"text.template-header-normal":" ","text.template-header-promo":"LIMITED TIME SPECIAL OFFER","text.template-header-final":"THIS IS YOUR FINAL CHANCE","text.template-header-offline":" ","text.template-title-normal":"GET COREL VECTOR NOW FOR %price.","text.template-title-promo":"GET COREL VECTOR NOW JUST FOR %price.","text.template-title-offline":"GET COREL VECTOR NOW.","text.template-content-normal":"Will be billed annually and will auto-renew on %nextBillingDate until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.","text.template-content-promo":"Will be billed annually and will auto-renew on %nextBillingDate until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.<br>You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.template-content-offline":"Will be billed annually and will auto-renew until you cancel your subscription in your <a data-cmd=\'settings\'>account settings.</a>","text.template-footer-promo":"HURRY UP! THIS OFFER <strong>%expire.</strong>","text.template-footer-normal":" ","text.template-footer-offline":" ","text.unknown-user":"Unknown"},"GCorelLoginDialog":{"text.title-title":"Welcome to CorelDRAW.app","text.title-subtitle":"At home, at work, or on the go, this powerful vector illustration web app makes doing what you love more accessible than ever.","text.placeholder-sign-in-login":"Email or Username","text.placeholder-sign-in-password":"Password","text.sign-in-title":"Licensed User Sign-in","text.sign-in-subtitle":"Use your CorelDRAW authentication credentials (version 2019 or newer) to sign in.","text.sign-in-button":"Sign in with license","text.sign-in-login-word":"(Corel customer account user name)","text.sign-in-login":"Email Address","text.sign-in-password":"Password","text.forgot-password":"Forgot your password?","text.or":"or sign in with one click","text.sign-microsoft":"Sign in with Microsoft 365","text.sign-google":"Sign in with Google Workspace","text.sign-up-email":"Email Address","text.reset-password-send":"Send Request","text.sign-up-go-back":"Go back to sign-in.","text.get-started":"Get Started","text.get-started-text":"To sign in to CorelDRAW.app for creating or editing designs, <b>you must have a licensed copy</b> or an active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).","text.learn-more":"LEARN MORE","text.enterprise-sign-in":"CorelDRAW.app Enterprise Sign-in","text.enterprise-sign-in-message":"CorelDRAW.app Enterprise users, sign in with your Microsoft 365 or Google Workspace account.","text.enterprise-login-header":"Welcome to CorelDRAW.app Enterprise","text.enterprise-login-header-subtitle":"At work, or on the go, this powerful vector illustration web app makes doing what you love more accessible than ever.","text.enterprise-login-sign-in":"Sign In","text.enterprise-login-coporate-account":"Use your corporate user account<div class=\'highlight\'>*</div> to sign in to CorelDRAW.app Enterprise","text.enterprise-login-message-1":"<div class=\'highlight\'>*</div> Note: CorelDRAW.app Enterprise sign-in is available exclusively to companies signed-up for a CorelDRAW.app Enterprise License.","text.enterprise-login-message-2":"If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator","text.enterprise-login-not-enterprise-user":"Not a CorelDRAW.app Enterprise User?","text.enterprise-login-go-to-sign-in":"Go to the CorelDRAW.app sign-in page","text.guest-sign-in-title":"Guest Sign-In","text.guest-sign-in-stubtitle":"Please provide your credentials to identify you in the shared file","text.guest-sign-in-text":"Please use the Guest Sign-In to access the shared design if you don\'t have a licensed copy or active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).","text.guest-sign-in":"Sign in as guest","text.guest-sign-in-first-name":"First Name","text.guest-sign-in-last-name":"Last Name","text.guest-sign-in-send-link":"SEND SIGN-IN LINK","text.guest-sign-in-resend-link":"RESEND SIGN-IN LINK","text.guest-sign-in-node":"<div class=\'highlight\'>*</div> Note: Clicking on the button sends a link to your provided email address, that directly signs you in when clicked.","text.guest-sign-in-send-success":"A link was sent to your email account, please click on it to access this design as a guest.","text.guest-sign-in-send-success-tip":"If you didn\'t receive the email, please be sure to check the spam/junk folder of your email client or Resend Sign-in link below."},"GOfferDialogV1":{"text.offerdialog-v1-title":"Keep creating with fast, powerful, flexible tools that work the way you do.","text.offerdialog-v1-topic-1":"Intuitive vector toolset for sharp and vivid vector graphics at any size","text.offerdialog-v1-topic-2":"Object transformation and distribution tools for snap-to-grid precision","text.offerdialog-v1-topic-3":"Keep your designs safe, synced, and available across platforms with unlimited cloud storage","text.offerdialog-v1-topic-4":"Dozens of non-destructive filters, effects, and image editing tools","text.offerdialog-v1-topic-5":"Accessible everywhere, including touch-enabled devices","text.offerdialog-v1-topic-6":"Powerful text and typography capabilities","text.offerdialog-v1-topic-7":"Easy to learn and use","text.offerdialog-v1-topic-8":"Wide range of format compatibility ensures you can import files from almost anywhere","text.offerdialog-v1-topic-9":"Thousands of templates and stock photos, graphics, fonts, and more","text.offerdialog-v1-default-title":"Corel Vector","text.share-file-sub-title-1":"Stay connected with colleagues and clients as remote work becomes our new normal.","text.share-file-sub-title-2":"Get even more power for designing on the go with CorelDRAW.app PRO:","text.share-file-dashboard-sub-title":"Design on the go with more professional tools:","text.share-file-topic-1":"Share design files with colleagues and clients.","text.share-file-topic-2":"Gather real-time comments and annotations from one or many contributors, right within your shared CorelDRAW design file.","text.share-file-topic-3":"Get unlimited Cloud storage to bring your ideas to life.","text.share-file-topic-4":"Use the web app with any major browser to design and export in CMYK","text.share-file-topic-5":"Export your designs with up to 300dpi and advanced options.","text.share-file-topic-6":"No internet connection required: Use CorelDRAW.app PRO offline.","text.share-file-topic-7":"Design and export in CMYK from start to finish.","text.share-file-title":"Benefit from CorelDRAW design sharing and more with a CorelDRAW.app PRO subscription.","text.share-file-dashboard-title":"Don’t Lose Your Super Power, Keep these Professional Tools","text.loyal-users":"EXCLUSIVE LIMITED TIME OFFER ONLY FOR OUR LOYAL COREL VECTOR USERS!","text.upgrade-tip":"When your access expires, you will also lose access to your projects until you upgrade. Please ensure you download your files before your access expires.","text.footer-promo-title":"Save %discount on Your Corel Vector Subscription when you Buy Now","text.footer-promo-buy":"BUY NOW","text.footer-normal-title":"Go PRO and Get a 1 Year Subscription to Corel Vector for only %price per year.","text.footer-normal-buy":"BUY NOW","text.footer-offline-title":"Go PRO and Get a 1 Year Subscription to Corel Vector.","text.footer-offline-buy":"BUY NOW","text.footer-buy-now":"BUY NOW","text.year":"/year","text.start-trial-button":"Start the 15-day trial now","text.start-trial-caption":"During the trial, you can try all of the features of Corel Vector. Once complete, you will return to the free version.","text.offerdialog-v1-ipad-layout-title":"This feature requires a CorelDRAW.app PRO account","text.offerdialog-v1-ipad-layout-content-title":"CorelDRAW.app’s PRO features are made for design professionals","text.offerdialog-v1-ipad-layout-topic-1":"Get unlimited cloud storage.","text.offerdialog-v1-ipad-layout-topic-2":"Export your designs at up to 300dpi and with advanced options.","text.offerdialog-v1-ipad-layout-topic-3":"Reuse existing elements with symbols and share styles.","text.offerdialog-v1-ipad-layout-topic-4":"Design and export in CMYK from start to finish.","text.offerdialog-v1-ipad-layout-topic-5":"Access system/device fonts or import your own fonts.","text.offerdialog-v1-ipad-layout-topic-6":"No internet connection required: Use CorelDRAW.app offline.","text.offerdialog-v1-ipad-layout-topic-7":"Import your existing EPS files."},"GOfflineDialog":{"text.have-questions":"If you have questions, please <a href=\'%link\' target=\'_blank\'>contact us here.</a>","text.retry-connection":"Hey %name, in order to complete your request we need an internet connection. Please <strong>connect your device</strong> and click on \\"Retry.\\"","text.retry":"Retry","text.cancel":"Cancel"},"GPaywallDialog":{"text.offerdialog-v1-subscribe-title-1":"To use this or other PRO features","text.offerdialog-v1-subscribe-title-2":"<mark>you have to subscribe</mark> to Corel Vector","text.offerdialog-v1-subscribe-share-file-title-1":"To share design files with clients and colleagues","text.offerdialog-v1-subscribe-share-file-title-2":"<mark>you have to subscribe</mark> to CorelDRAW.app PRO","text.offerdialog-v1-subscribe-share-file-dashboard-title":"To use this or other PRO features you have to <mark>subscribe</mark> to CorelDRAW.app PRO","text.remaining-days":"Your access to Corel Vector expires in <mark>%days days</mark>","text.remaining-day":"Your access to Corel Vector expires in <mark>%day day</mark>","text.expires-today":"Your access to Corel Vector expires today","text.trial-message1":"<strong>Unleash your creativity</strong> with a large set of templates and icons in the libraries, choose from a wide selection of fonts or bring in your own typefaces. Over 30 effects and 20 blend modes will give you all the freedom for your next creative project.","text.trial-message2":"<strong>Revolutionize the way you work</strong> with powerful anchoring for responsive layouts or advanced vector tools for your next icon or logo design. Symbols, shared styles and color swatches let you reuse existing elements to create your own design system.","text.trial-message-3":"Go PRO before it\'s too late.","text.pretrial-title":"Get Started Designing Like a PRO","text.pretrial-subtitle":"Explore these Powerful Tools to Unleash your Creativity.","text.learn-more":"Learn more","text.access-message1":"<strong>Upgrade today</strong> and secure continued access to this web-based vector graphics app that empowers you to create on any device. Keep your designs safe, synced, and available across platforms with unlimited storage space in the cloud."},"GSharePointModel":{"error.refresh-token-invalid":"Please, relogin to get access to the SharePoint"},"GGoogleDrive":{"text.all-files-tab-title":"All files","text.gravit-designer-tab-title":"Corel Vector files","text.team-drives-tab-title":"Team Drives files"},"SearchWidget":{"text.no-exact-matches-search-term":"No exact matches for “%searchTerm”. Showing results for similar words or characters instead."}},"translationsExtended":{},"translationsExtendedTemporary":{},"translationsTemporary":{},"etag":"c31f14723be7f3f9e5de84ddd6a9e132"},{"language":"German","keyValue":1,"abbreviation":"de-DE","isDefault":false,"isAvailable":true,"realName":"Deutsch","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Chinese","keyValue":2,"abbreviation":"zh-CN","isDefault":false,"isAvailable":true,"realName":"中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Portuguese","keyValue":3,"abbreviation":"pt-BR","isDefault":false,"isAvailable":true,"realName":"Português","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Spanish","keyValue":4,"abbreviation":"es-ES","isDefault":false,"isAvailable":true,"realName":"Español","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"French","keyValue":5,"abbreviation":"fr-FR","isDefault":false,"isAvailable":true,"realName":"Français","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Polish","keyValue":6,"abbreviation":"pl-PL","isDefault":false,"isAvailable":true,"realName":"Polski","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Russian","keyValue":7,"abbreviation":"ru-RU","isDefault":false,"isAvailable":true,"realName":"Русский","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Turkish","keyValue":8,"abbreviation":"tr-TR","isDefault":false,"isAvailable":true,"realName":"Türkçe","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Czech","keyValue":9,"abbreviation":"cs-CZ","isDefault":false,"isAvailable":true,"realName":"Čeština","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"ChineseTaiwan","keyValue":10,"abbreviation":"zh-TW","isDefault":false,"isAvailable":true,"realName":"中文 Taiwan","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Italian","keyValue":11,"abbreviation":"it-IT","isDefault":false,"isAvailable":true,"realName":"Italiano","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Japanese","keyValue":12,"abbreviation":"ja-JP","isDefault":false,"isAvailable":true,"realName":"日本語","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Dutch","keyValue":13,"abbreviation":"nl-NL","isDefault":false,"isAvailable":true,"realName":"Nederlands","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Swedish","keyValue":14,"abbreviation":"sv-SE","isDefault":false,"isAvailable":true,"realName":"Swedish","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}}]'
        );
    },
    function (e) {
        e.exports = JSON.parse("[]");
    },
    function (e, t, o) {
        var n = {
            "./glangulargradientshader": 364,
            "./glangulargradientshader.js": 364,
            "./glbendblurshader": 315,
            "./glbendblurshader.js": 315,
            "./glbendshader": 474,
            "./glbendshader.js": 474,
            "./glblendshader": 346,
            "./glblendshader.js": 346,
            "./glbloomshader": 475,
            "./glbloomshader.js": 475,
            "./glblurshader": 206,
            "./glblurshader.js": 206,
            "./glbrightnesscontrastshader": 476,
            "./glbrightnesscontrastshader.js": 476,
            "./glbulgepinchshader": 477,
            "./glbulgepinchshader.js": 477,
            "./glclipblurshader": 365,
            "./glclipblurshader.js": 365,
            "./glcoloradjustshader": 478,
            "./glcoloradjustshader.js": 478,
            "./glcolorhalftoneshader": 479,
            "./glcolorhalftoneshader.js": 479,
            "./gldenoiseshader": 480,
            "./gldenoiseshader.js": 480,
            "./gldotscreenshader": 481,
            "./gldotscreenshader.js": 481,
            "./gldrunkshader": 482,
            "./gldrunkshader.js": 482,
            "./gledgeworkshader": 483,
            "./gledgeworkshader.js": 483,
            "./glfisheyeshader": 484,
            "./glfisheyeshader.js": 484,
            "./glhexagonalshader": 485,
            "./glhexagonalshader.js": 485,
            "./glhuesaturationshader": 486,
            "./glhuesaturationshader.js": 486,
            "./glinkshader": 487,
            "./glinkshader.js": 487,
            "./glinnerglowshader": 488,
            "./glinnerglowshader.js": 488,
            "./gllensblurshader": 489,
            "./gllensblurshader.js": 489,
            "./glnoiseshader": 490,
            "./glnoiseshader.js": 490,
            "./glouterglowshader": 491,
            "./glouterglowshader.js": 491,
            "./glrecolourshader": 492,
            "./glrecolourshader.js": 492,
            "./glsepiashader": 493,
            "./glsepiashader.js": 493,
            "./glsketchshader": 494,
            "./glsketchshader.js": 494,
            "./glstrokelayershader": 495,
            "./glstrokelayershader.js": 495,
            "./glswirlshader": 496,
            "./glswirlshader.js": 496,
            "./gltiltshiftshader": 497,
            "./gltiltshiftshader.js": 497,
            "./gltoonshader": 498,
            "./gltoonshader.js": 498,
            "./gltrueblurshader": 499,
            "./gltrueblurshader.js": 499,
            "./glunsharpmaskshader": 500,
            "./glunsharpmaskshader.js": 500,
            "./glvibranceshader": 501,
            "./glvibranceshader.js": 501,
            "./glvignetteshader": 502,
            "./glvignetteshader.js": 502,
            "./glwarpshader": 503,
            "./glwarpshader.js": 503,
            "./glzoomblurshader": 504,
            "./glzoomblurshader.js": 504,
        };
        function a(e) {
            var t = i(e);
            return o(t);
        }
        function i(e) {
            if (!o.o(n, e)) {
                var t = new Error("Cannot find module '" + e + "'");
                throw ((t.code = "MODULE_NOT_FOUND"), t);
            }
            return n[e];
        }
        ((a.keys = function () {
            return Object.keys(n);
        }),
            (a.resolve = i),
            (e.exports = a),
            (a.id = 817));
    },
    ,
    function (e, t, o) {
        (function (e, n) {
            var a = o(570),
                i = o(660).spawn,
                r = o(178);
            t.XMLHttpRequest = function () {
                "use strict";
                var t,
                    s,
                    l = this,
                    c = o(571),
                    u = o(572),
                    d = {},
                    p = !1,
                    h = { "User-Agent": "node-XMLHttpRequest", Accept: "*/*" },
                    g = {},
                    f = {},
                    m = [
                        "accept-charset",
                        "accept-encoding",
                        "access-control-request-headers",
                        "access-control-request-method",
                        "connection",
                        "content-length",
                        "content-transfer-encoding",
                        "cookie",
                        "cookie2",
                        "date",
                        "expect",
                        "host",
                        "keep-alive",
                        "origin",
                        "referer",
                        "te",
                        "trailer",
                        "transfer-encoding",
                        "upgrade",
                        "via",
                    ],
                    x = ["TRACE", "TRACK", "CONNECT"],
                    y = !1,
                    b = !1,
                    w = {};
                ((this.UNSENT = 0),
                    (this.OPENED = 1),
                    (this.HEADERS_RECEIVED = 2),
                    (this.LOADING = 3),
                    (this.DONE = 4),
                    (this.readyState = this.UNSENT),
                    (this.onreadystatechange = null),
                    (this.responseText = ""),
                    (this.responseXML = ""),
                    (this.status = null),
                    (this.statusText = null),
                    (this.withCredentials = !1));
                ((this.open = function (e, t, o, n, a) {
                    if (
                        (this.abort(),
                        (b = !1),
                        !(function (e) {
                            return e && -1 === x.indexOf(e);
                        })(e))
                    )
                        throw new Error("SecurityError: Request method not allowed");
                    ((d = { method: e, url: t.toString(), async: "boolean" != typeof o || o, user: n || null, password: a || null }),
                        v(this.OPENED));
                }),
                    (this.setDisableHeaderCheck = function (e) {
                        p = e;
                    }),
                    (this.setRequestHeader = function (e, t) {
                        if (this.readyState !== this.OPENED)
                            throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
                        if (
                            (function (e) {
                                return p || (e && -1 === m.indexOf(e.toLowerCase()));
                            })(e)
                        ) {
                            if (y) throw new Error("INVALID_STATE_ERR: send flag is true");
                            ((e = f[e.toLowerCase()] || e), (f[e.toLowerCase()] = e), (g[e] = g[e] ? g[e] + ", " + t : t));
                        } else console.warn('Refused to set unsafe header "' + e + '"');
                    }),
                    (this.getResponseHeader = function (e) {
                        return "string" == typeof e && this.readyState > this.OPENED && s && s.headers && s.headers[e.toLowerCase()] && !b
                            ? s.headers[e.toLowerCase()]
                            : null;
                    }),
                    (this.getAllResponseHeaders = function () {
                        if (this.readyState < this.HEADERS_RECEIVED || b) return "";
                        var e = "";
                        for (var t in s.headers) "set-cookie" !== t && "set-cookie2" !== t && (e += t + ": " + s.headers[t] + "\r\n");
                        return e.substr(0, e.length - 2);
                    }),
                    (this.getRequestHeader = function (e) {
                        return "string" == typeof e && f[e.toLowerCase()] ? g[f[e.toLowerCase()]] : "";
                    }),
                    (this.send = function (o) {
                        if (this.readyState !== this.OPENED)
                            throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
                        if (y) throw new Error("INVALID_STATE_ERR: send has already been called");
                        var p,
                            m = !1,
                            x = !1,
                            w = a.parse(d.url);
                        switch (w.protocol) {
                            case "https:":
                                m = !0;
                            case "http:":
                                p = w.hostname;
                                break;
                            case "file:":
                                x = !0;
                                break;
                            case void 0:
                            case null:
                            case "":
                                p = "localhost";
                                break;
                            default:
                                throw new Error("Protocol not supported.");
                        }
                        if (x) {
                            if ("GET" !== d.method) throw new Error("XMLHttpRequest: Only GET method is supported");
                            if (d.async)
                                r.readFile(w.pathname, "utf8", function (e, t) {
                                    e ? l.handleError(e) : ((l.status = 200), (l.responseText = t), v(l.DONE));
                                });
                            else
                                try {
                                    ((this.responseText = r.readFileSync(w.pathname, "utf8")), (this.status = 200), v(l.DONE));
                                } catch (e) {
                                    this.handleError(e);
                                }
                        } else {
                            var D = w.port || (m ? 443 : 80),
                                A = w.pathname + (w.search ? w.search : "");
                            for (var C in h) f[C.toLowerCase()] || (g[C] = h[C]);
                            if (((g.Host = p), (m && 443 === D) || 80 === D || (g.Host += ":" + w.port), d.user)) {
                                void 0 === d.password && (d.password = "");
                                var E = new e(d.user + ":" + d.password);
                                g.Authorization = "Basic " + E.toString("base64");
                            }
                            "GET" === d.method || "HEAD" === d.method
                                ? (o = null)
                                : o
                                  ? ((g["Content-Length"] = e.isBuffer(o) ? o.length : e.byteLength(o)),
                                    g["Content-Type"] || (g["Content-Type"] = "text/plain;charset=UTF-8"))
                                  : "POST" === d.method && (g["Content-Length"] = 0);
                            var S = {
                                host: p,
                                port: D,
                                path: A,
                                method: d.method,
                                headers: g,
                                agent: !1,
                                withCredentials: l.withCredentials,
                            };
                            if (((b = !1), d.async)) {
                                var k = m ? u.request : c.request;
                                ((y = !0), l.dispatchEvent("readystatechange"));
                                var _ = function (e) {
                                    l.handleError(e);
                                };
                                ((t = k(S, function e(o) {
                                    if (301 !== (s = o).statusCode && 302 !== s.statusCode && 303 !== s.statusCode && 307 !== s.statusCode)
                                        (s.setEncoding("utf8"),
                                            v(l.HEADERS_RECEIVED),
                                            (l.status = s.statusCode),
                                            s.on("data", function (e) {
                                                (e && (l.responseText += e), y && v(l.LOADING));
                                            }),
                                            s.on("end", function () {
                                                y && (v(l.DONE), (y = !1));
                                            }),
                                            s.on("error", function (e) {
                                                l.handleError(e);
                                            }));
                                    else {
                                        d.url = s.headers.location;
                                        var n = a.parse(d.url);
                                        p = n.hostname;
                                        var i = {
                                            hostname: n.hostname,
                                            port: n.port,
                                            path: n.path,
                                            method: 303 === s.statusCode ? "GET" : d.method,
                                            headers: g,
                                            withCredentials: l.withCredentials,
                                        };
                                        (t = k(i, e).on("error", _)).end();
                                    }
                                }).on("error", _)),
                                    o && t.write(o),
                                    t.end(),
                                    l.dispatchEvent("loadstart"));
                            } else {
                                var T = ".node-xmlhttprequest-content-" + n.pid,
                                    P = ".node-xmlhttprequest-sync-" + n.pid;
                                r.writeFileSync(P, "", "utf8");
                                for (
                                    var F =
                                            "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" +
                                            (m ? "s" : "") +
                                            ".request;var options = " +
                                            JSON.stringify(S) +
                                            ";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {  responseText += chunk;});response.on('end', function() {fs.writeFileSync('" +
                                            T +
                                            "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');fs.unlinkSync('" +
                                            P +
                                            "');});response.on('error', function(error) {fs.writeFileSync('" +
                                            T +
                                            "', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('" +
                                            P +
                                            "');});}).on('error', function(error) {fs.writeFileSync('" +
                                            T +
                                            "', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('" +
                                            P +
                                            "');});" +
                                            (o ? "req.write('" + JSON.stringify(o).slice(1, -1).replace(/'/g, "\\'") + "');" : "") +
                                            "req.end();",
                                        R = i(n.argv[0], ["-e", F]);
                                    r.existsSync(P);

                                );
                                var I = JSON.parse(r.readFileSync(T, "utf8"));
                                (R.stdin.end(),
                                    r.unlinkSync(T),
                                    I.err
                                        ? l.handleError(I.err)
                                        : ((s = I.data), (l.status = I.data.statusCode), (l.responseText = I.data.text), v(l.DONE)));
                            }
                        }
                    }),
                    (this.handleError = function (e) {
                        ((this.status = 0),
                            (this.statusText = e),
                            (this.responseText = e.stack),
                            (b = !0),
                            v(this.DONE),
                            this.dispatchEvent("error"));
                    }),
                    (this.abort = function () {
                        (t && (t.abort(), (t = null)),
                            (g = h),
                            (this.status = 0),
                            (this.responseText = ""),
                            (this.responseXML = ""),
                            (b = !0),
                            this.readyState === this.UNSENT ||
                                (this.readyState === this.OPENED && !y) ||
                                this.readyState === this.DONE ||
                                ((y = !1), v(this.DONE)),
                            (this.readyState = this.UNSENT),
                            this.dispatchEvent("abort"));
                    }),
                    (this.addEventListener = function (e, t) {
                        (e in w || (w[e] = []), w[e].push(t));
                    }),
                    (this.removeEventListener = function (e, t) {
                        e in w &&
                            (w[e] = w[e].filter(function (e) {
                                return e !== t;
                            }));
                    }),
                    (this.dispatchEvent = function (e) {
                        if (("function" == typeof l["on" + e] && l["on" + e](), e in w))
                            for (var t = 0, o = w[e].length; t < o; t++) w[e][t].call(l);
                    }));
                var v = function (e) {
                    (e != l.LOADING && l.readyState === e) ||
                        ((l.readyState = e),
                        (d.async || l.readyState < l.OPENED || l.readyState === l.DONE) && l.dispatchEvent("readystatechange"),
                        l.readyState !== l.DONE || b || (l.dispatchEvent("load"), l.dispatchEvent("loadend")));
                };
            };
        }).call(this, o(221).Buffer, o(183));
    },
    ,
    function (e) {
        e.exports = JSON.parse(
            '[{"language":"English","keyValue":0,"abbreviation":"en-US","isDefault":true,"isAvailable":true,"realName":"English","translations":{"GBCP47LanguageTags":{"text.lang.abq":"Abaza","text.lang.ab":"Abkhazian","text.lang.ach":"Acholi","text.lang.acr":"Achi","text.lang.ady":"Adyghe","text.lang.af":"Afrikaans","text.lang.aa":"Afar","text.lang.ahg":"Agaw","text.lang.aio":"Aiton","text.lang.ak":"Akan","text.lang.x-hbotakb":"Batak Angkola","text.lang.gsw":"Alsatian","text.lang.alt":"Altai","text.lang.am":"Amharic","text.lang.ang":"Anglo-Saxon","text.lang.und-fonnapa":"Phonetic transcription—Americanist conventions","text.lang.ar":"Arabic","text.lang.an":"Aragonese","text.lang.aiw":"Aari","text.lang.rki":"Rakhine","text.lang.as":"Assamese","text.lang.ast":"Asturian","text.lang.ath":"Athapaskan languages","text.lang.x-hbotavn":"Avatime","text.lang.av":"Avar","text.lang.awa":"Awadhi","text.lang.ay":"Aymara","text.lang.azb":"Torki","text.lang.az":"Azerbaijani","text.lang.bfq":"Badaga","text.lang.bad":"Banda","text.lang.bfy":"Baghelkhandi","text.lang.x-hbotbal":"Balkar","text.lang.ban":"Balinese","text.lang.bar":"Bavarian","text.lang.bci":"Baulé","text.lang.bbc":"Batak Toba","text.lang.ber":"Berber","text.lang.bcq":"Bench","text.lang.x-hbotbcr":"Bible Cree","text.lang.bdy":"Bandjalang","text.lang.be":"Belarussian","text.lang.bem":"Bemba","text.lang.bn":"Bengali","text.lang.bgc":"Haryanvi","text.lang.bgq":"Bagri","text.lang.bg":"Bulgarian","text.lang.bhb":"Bhili","text.lang.bho":"Bhojpuri","text.lang.bik":"Bikol","text.lang.byn":"Bilen","text.lang.bi":"Bislama","text.lang.bjj":"Kanauji","text.lang.bla":"Blackfoot","text.lang.bal":"Baluchi","text.lang.blk":"Pa’o Karen","text.lang.bjt":"Balante","text.lang.bft":"Balti","text.lang.bm":"Bambara (Bamanankan)","text.lang.bai":"Bamileke","text.lang.bs":"Bosnian","text.lang.bpy":"Bishnupriya Manipuri","text.lang.br":"Breton","text.lang.brh":"Brahui","text.lang.bra":"Braj Bhasha","text.lang.my":"Burmese","text.lang.brx":"Bodo","text.lang.ba":"Bashkir","text.lang.bsk":"Burushaski","text.lang.x-hbotbtd":"Batak Dairi (Pakpak)","text.lang.beb":"Beti","text.lang.x-hbotbtk":"Batak languages","text.lang.x-hbotbtm":"Batak Mandailing","text.lang.bts":"Batak Simalungun","text.lang.x-hbotbtx":"Batak Karo","text.lang.x-hbotbtz":"Batak Alas-Kluet","text.lang.bug":"Bugis","text.lang.byv":"Medumba","text.lang.cak":"Kaqchikel","text.lang.ca":"Catalan","text.lang.cbk":"Zamboanga Chavacano","text.lang.cco":"Chinantec","text.lang.ceb":"Cebuano","text.lang.cgg":"Chiga","text.lang.ch":"Chamorro","text.lang.ce":"Chechen","text.lang.sgw":"Chaha Gurage","text.lang.hne":"Chattisgarhi","text.lang.ny":"Chichewa (Chewa, Nyanja)","text.lang.ckt":"Chukchi","text.lang.chk":"Chuukese","text.lang.cho":"Choctaw","text.lang.chp":"Chipewyan","text.lang.chr":"Cherokee","text.lang.cv":"Chuvash","text.lang.chy":"Cheyenne","text.lang.cja":"Western Cham","text.lang.cjm":"Eastern Cham","text.lang.swb":"Comorian","text.lang.cop":"Coptic","text.lang.kw":"Cornish","text.lang.co":"Corsican","text.lang.crp":"Creoles","text.lang.cr":"Cree","text.lang.crx":"Carrier","text.lang.crh":"Crimean Tatar","text.lang.csb":"Kashubian","text.lang.cu":"Church Slavonic","text.lang.cs":"Czech","text.lang.ctg":"Chittagonian","text.lang.cuk":"San Blas Kuna","text.lang.x-hbotdag":"Dagbani","text.lang.da":"Danish","text.lang.dar":"Dargwa","text.lang.dax":"Dayi","text.lang.cwd":"Woods Cree","text.lang.de":"German","text.lang.dgo":"Dogri (individual language)","text.lang.doi":"Dogri (macrolanguage)","text.lang.dhg":"Dhangu","text.lang.x-hbotdhv":"Divehi (Dhivehi, Maldivian)","text.lang.diq":"Dimli","text.lang.dv":"Divehi (Dhivehi, Maldivian)","text.lang.dje":"Zarma","text.lang.djr":"Djambarrpuyngu","text.lang.ada":"Dangme","text.lang.dnj":"Dan","text.lang.din":"Dinka","text.lang.prs":"Dari","text.lang.dwu":"Dhuwal","text.lang.dng":"Dungan","text.lang.dz":"Dzongkha","text.lang.igb":"Ebira","text.lang.crj":"Eastern Cree","text.lang.bin":"Edo","text.lang.efi":"Efik","text.lang.el":"Greek","text.lang.emk":"Eastern Maninkakan","text.lang.en":"English","text.lang.myv":"Erzya","text.lang.es":"Spanish","text.lang.esu":"Central Yupik","text.lang.et":"Estonian","text.lang.eu":"Basque","text.lang.evn":"Evenki","text.lang.eve":"Even","text.lang.ee":"Ewe","text.lang.acf":"French Antillean","text.lang.fan":"Fang","text.lang.fa":"Persian","text.lang.fat":"Fanti","text.lang.fi":"Finnish","text.lang.fj":"Fijian","text.lang.vls":"Dutch (Flemish)","text.lang.fmp":"Fe’fe’","text.lang.enf":"Forest Enets","text.lang.fon":"Fon","text.lang.fo":"Faroese","text.lang.fr":"French","text.lang.frc":"Cajun French","text.lang.fy":"Frisian","text.lang.fur":"Friulian","text.lang.frp":"Arpitan","text.lang.fuf":"Futa","text.lang.ff":"Fulah","text.lang.fuv":"Nigerian Fulfulde","text.lang.gaa":"Ga","text.lang.gd":"Scottish Gaelic (Gaelic)","text.lang.gag":"Gagauz","text.lang.gl":"Galician","text.lang.x-hbotgar":"Garshuni","text.lang.gbm":"Garhwali","text.lang.gez":"Geez","text.lang.gih":"Githabul","text.lang.niv":"Gilyak","text.lang.gil":"Kiribati (Gilbertese)","text.lang.gkp":"Kpelle (Guinea)","text.lang.glk":"Gilaki","text.lang.guk":"Gumuz","text.lang.gnn":"Gumatj","text.lang.gog":"Gogo","text.lang.gon":"Gondi","text.lang.kl":"Greenlandic","text.lang.grt":"Garo","text.lang.gn":"Guarani","text.lang.guc":"Wayuu","text.lang.guf":"Gupapuyngu","text.lang.gu":"Gujarati","text.lang.guz":"Gusii","text.lang.ht":"Haitian (Haitian Creole)","text.lang.cfm":"Halam (Falam Chin)","text.lang.hoj":"Harauti","text.lang.ha":"Hausa","text.lang.haw":"Hawaiian","text.lang.hay":"Haya","text.lang.haz":"Hazaragi","text.lang.amf":"Hammer-Banna","text.lang.hz":"Herero","text.lang.hil":"Hiligaynon","text.lang.hi":"Hindi","text.lang.mrj":"High Mari","text.lang.hmn":"Hmong","text.lang.ho":"Hiri Motu","text.lang.hnd":"Hindko","text.lang.hoc":"Ho","text.lang.har":"Harari","text.lang.hr":"Croatian","text.lang.hu":"Hungarian","text.lang.hyw":"Armenian","text.lang.hy":"Armenian East","text.lang.iba":"Iban","text.lang.ibb":"Ibibio","text.lang.ig":"Igbo","text.lang.io":"Ido","text.lang.ijo":"Ijo languages","text.lang.ie":"Interlingue","text.lang.ilo":"Ilokano","text.lang.ia":"Interlingua","text.lang.id":"Indonesian","text.lang.inh":"Ingush","text.lang.iu":"Inuktitut","text.lang.ik":"Inupiat","text.lang.und-fonipa":"Phonetic transcription—IPA conventions","text.lang.ga":"Irish","text.lang.ga-latg":"Irish Traditional","text.lang.is":"Icelandic","text.lang.smn":"Inari Sami","text.lang.it":"Italian","text.lang.he":"Hebrew","text.lang.jam":"Jamaican Creole","text.lang.ja":"Japanese","text.lang.jv":"Javanese","text.lang.jbo":"Lojban","text.lang.jct":"Krymchak","text.lang.yi":"Yiddish","text.lang.lad":"Ladino","text.lang.dyu":"Jula","text.lang.kbd":"Kabardian","text.lang.kab":"Kabyle","text.lang.kfr":"Kachchi","text.lang.kln":"Kalenjin","text.lang.kn":"Kannada","text.lang.krc":"Karachay","text.lang.ka":"Georgian","text.lang.x-hbotkaw":"Kawi (Old Javanese)","text.lang.kk":"Kazakh","text.lang.kde":"Makonde","text.lang.kea":"Kabuverdianu (Crioulo)","text.lang.ktb":"Kebena","text.lang.kek":"Kekchi","text.lang.und-geok":"Khutsuri Georgian","text.lang.kjh":"Khakass","text.lang.kca":"Khanty-Kazim","text.lang.km":"Khmer","text.lang.x-hbotkhs":"Khanty-Shurishkar","text.lang.x-hbotkht":"Khamti Shan","text.lang.x-hbotkhv":"Khanty-Vakhi","text.lang.khw":"Khowar","text.lang.ki":"Kikuyu (Gikuyu)","text.lang.ky":"Kirghiz (Kyrgyz)","text.lang.kqs":"Kisii","text.lang.kiu":"Kirmanjki","text.lang.kjd":"Southern Kiwai","text.lang.kjp":"Eastern Pwo Karen","text.lang.kjz":"Bumthangkha","text.lang.kex":"Kokni","text.lang.xal":"Kalmyk","text.lang.kam":"Kamba","text.lang.kfy":"Kumaoni","text.lang.kmw":"Komo","text.lang.kxc":"Komso","text.lang.kmz":"Khorasani Turkic","text.lang.kr":"Kanuri","text.lang.kfa":"Kodagu","text.lang.okm":"Korean Old Hangul","text.lang.kok":"Konkani","text.lang.kv":"Komi","text.lang.ktu":"Kikongo","text.lang.kg":"Kongo","text.lang.koi":"Komi-Permyak","text.lang.ko":"Korean","text.lang.kos":"Kosraean","text.lang.kpv":"Komi-Zyrian","text.lang.kpe":"Kpelle","text.lang.kri":"Krio","text.lang.kaa":"Karakalpak","text.lang.krl":"Karelian","text.lang.kdr":"Karaim","text.lang.kar":"Karen","text.lang.kqy":"Koorete","text.lang.ks":"Kashmiri","text.lang.ksh":"Ripuarian","text.lang.kha":"Khasi","text.lang.sjd":"Kildin Sami","text.lang.ksw":"S’gaw Karen","text.lang.kj":"Kuanyama","text.lang.kxu":"Kui","text.lang.kfx":"Kulvi","text.lang.kum":"Kumyk","text.lang.ku":"Kurdish","text.lang.kru":"Kurukh","text.lang.kdt":"Kuy","text.lang.kpy":"Koryak","text.lang.kyu":"Western Kayah","text.lang.lld":"Ladin","text.lang.bfu":"Lahuli","text.lang.lbe":"Lak","text.lang.lmn":"Lambani","text.lang.lo":"Lao","text.lang.la":"Latin","text.lang.lzz":"Laz","text.lang.x-hbotlcr":"L-Cree","text.lang.lbj":"Ladakhi","text.lang.x-hbotlef":"Lelemi","text.lang.lez":"Lezgi","text.lang.lij":"Ligurian","text.lang.li":"Limburgish","text.lang.ln":"Lingala","text.lang.lis":"Lisu","text.lang.ljp":"Lampung","text.lang.lki":"Laki","text.lang.mhr":"Low Mari","text.lang.lif":"Limbu","text.lang.lmo":"Lombard","text.lang.ngl":"Lomwe","text.lang.lom":"Loma","text.lang.bqi":"Luri","text.lang.dsb":"Lower Sorbian","text.lang.smj":"Lule Sami","text.lang.lt":"Lithuanian","text.lang.lb":"Luxembourgish","text.lang.lua":"Luba-Lulua","text.lang.lu":"Luba-Katanga","text.lang.lg":"Ganda","text.lang.luy":"Luyia","text.lang.luo":"Luo","text.lang.lv":"Latvian","text.lang.mad":"Madura","text.lang.mag":"Magahi","text.lang.mh":"Marshallese","text.lang.mpe":"Majang","text.lang.vmw":"Makhuwa","text.lang.ml":"Malayalam","text.lang.mam":"Mam","text.lang.mns":"Mansi","text.lang.arn":"Mapudungun","text.lang.mr":"Marathi","text.lang.mwr":"Marwari","text.lang.kmb":"Mbundu","text.lang.mbo":"Mbo","text.lang.mnc":"Manchu","text.lang.crm":"Moose Cree","text.lang.men":"Mende","text.lang.mdr":"Mandar","text.lang.mym":"Me’en","text.lang.mer":"Meru","text.lang.mfa":"Pattani Malay","text.lang.mfe":"Morisyen","text.lang.min":"Minangkabau","text.lang.lus":"Mizo","text.lang.mk":"Macedonian","text.lang.mak":"Makasar","text.lang.mkw":"Kituba","text.lang.mdy":"Male","text.lang.mg":"Malagasy","text.lang.mlq":"Malinke","text.lang.x-hbotmlr":"Malayalam Reformed","text.lang.ms":"Malay","text.lang.mnk":"Mandinka","text.lang.mn":"Mongolian","text.lang.mni":"Manipuri","text.lang.man":"Maninka","text.lang.gv":"Manx","text.lang.moh":"Mohawk","text.lang.mdf":"Moksha","text.lang.ro-md":"Moldavian","text.lang.mnw":"Mon","text.lang.ary":"Moroccan","text.lang.mos":"Mossi","text.lang.mi":"Maori","text.lang.mai":"Maithili","text.lang.mt":"Maltese","text.lang.unr":"Mundari","text.lang.mus":"Muscogee","text.lang.mwl":"Mirandese","text.lang.mww":"Hmong Daw","text.lang.myn":"Mayan","text.lang.mzn":"Mazanderani","text.lang.nag":"Naga-Assamese","text.lang.nah":"Nahuatl","text.lang.gld":"Nanai","text.lang.nap":"Neapolitan","text.lang.nsk":"Naskapi","text.lang.na":"Nauruan","text.lang.nv":"Navajo","text.lang.csw":"N-Cree","text.lang.nd":"Ndebele","text.lang.ndc":"Ndau","text.lang.ng":"Ndonga","text.lang.nds":"Low Saxon","text.lang.ne":"Nepali","text.lang.new":"Newari","text.lang.nga":"Ngbaka","text.lang.x-hbotngr":"Nagari","text.lang.x-hbotnhc":"Norway House Cree","text.lang.njz":"Nisi","text.lang.niu":"Niuean","text.lang.nyn":"Nyankole","text.lang.nqo":"N’Ko","text.lang.nl":"Dutch","text.lang.noe":"Nimadi","text.lang.nog":"Nogai","text.lang.no":"Norwegian","text.lang.nov":"Novial","text.lang.se":"Northern Sami","text.lang.nso":"Northern Sotho","text.lang.nod":"Northern Tai","text.lang.eo":"Esperanto","text.lang.nym":"Nyamwezi","text.lang.nn":"Norwegian Nynorsk (Nynorsk, Norwegian)","text.lang.nza":"Mbembe Tigon","text.lang.oc":"Occitan","text.lang.ojs":"Oji-Cree","text.lang.oj":"Ojibway","text.lang.or":"Odia (formerly Oriya)","text.lang.om":"Oromo","text.lang.os":"Ossetian","text.lang.sam":"Palestinian Aramaic","text.lang.pag":"Pangasinan","text.lang.pi":"Pali","text.lang.pam":"Pampangan","text.lang.pa":"Punjabi","text.lang.plp":"Palpa","text.lang.pap":"Papiamentu","text.lang.ps":"Pashto","text.lang.pau":"Palauan","text.lang.pcc":"Bouyei","text.lang.pcd":"Picard","text.lang.pdc":"Pennsylvania German","text.lang.el-polyton":"Polytonic Greek","text.lang.phk":"Phake","text.lang.pih":"Norfolk","text.lang.fil":"Filipino","text.lang.pce":"Palaung","text.lang.pl":"Polish","text.lang.pms":"Piemontese","text.lang.pnb":"Western Panjabi","text.lang.poh":"Pocomchi","text.lang.pon":"Pohnpeian","text.lang.pro":"Provençal / Old Provençal","text.lang.pt":"Portuguese","text.lang.pwo":"Western Pwo Karen","text.lang.bgr":"Chin","text.lang.quc":"K’iche’","text.lang.quh":"Quechua (Bolivia)","text.lang.qu":"Quechua","text.lang.qvi":"Quechua (Ecuador)","text.lang.qwh":"Quechua (Peru)","text.lang.raj":"Rajasthani","text.lang.rar":"Rarotongan","text.lang.bxr":"Russian Buriat","text.lang.atj":"R-Cree","text.lang.rej":"Rejang","text.lang.ria":"Riang","text.lang.rif":"Tarifit","text.lang.rit":"Ritarungo","text.lang.rkw":"Arakwal","text.lang.rm":"Romansh","text.lang.rmy":"Vlax Romani","text.lang.ro":"Romanian","text.lang.rom":"Romany","text.lang.rue":"Rusyn","text.lang.rtm":"Rotuman","text.lang.rw":"Kinyarwanda","text.lang.rn":"Rundi","text.lang.rup":"Aromanian","text.lang.ru":"Russian","text.lang.sck":"Sadri","text.lang.sa":"Sanskrit","text.lang.sas":"Sasak","text.lang.sat":"Santali","text.lang.x-hbotsay":"Sayisi","text.lang.scn":"Sicilian","text.lang.sco":"Scots","text.lang.scs":"North Slavey","text.lang.xan":"Sekota","text.lang.sel":"Selkup","text.lang.sga":"Old Irish","text.lang.sg":"Sango","text.lang.sgs":"Samogitian","text.lang.shi":"Tachelhit","text.lang.shn":"Shan","text.lang.sjo":"Sibe","text.lang.sid":"Sidamo","text.lang.stv":"Silte Gurage","text.lang.sms":"Skolt Sami","text.lang.sk":"Slovak","text.lang.den":"Slavey","text.lang.sl":"Slovenian","text.lang.so":"Somali","text.lang.sm":"Samoan","text.lang.seh":"Sena","text.lang.sn":"Shona","text.lang.sd":"Sindhi","text.lang.si":"Sinhala (Sinhalese)","text.lang.snk":"Soninke","text.lang.gru":"Sodo Gurage","text.lang.sop":"Songe","text.lang.st":"Southern Sotho","text.lang.sq":"Albanian","text.lang.sr":"Serbian","text.lang.sc":"Sardinian","text.lang.skr":"Saraiki","text.lang.srr":"Serer","text.lang.xsl":"South Slavey","text.lang.sma":"Southern Sami","text.lang.stq":"Saterland Frisian","text.lang.suk":"Sukuma","text.lang.su":"Sundanese","text.lang.suq":"Suri","text.lang.sva":"Svan","text.lang.sv":"Swedish","text.lang.aii":"Swadaya Aramaic","text.lang.sw":"Swahili","text.lang.ss":"Swati","text.lang.ngo":"Sutu","text.lang.sxu":"Upper Saxon","text.lang.syl":"Sylheti","text.lang.syr":"Syriac","text.lang.und-syre":"Syriac, Estrangela script-variant (equivalent to ISO 15924 \'Syre\')","text.lang.und-syrj":"Syriac, Western script-variant (equivalent to ISO 15924 \'Syrj\')","text.lang.und-syrn":"Syriac, Eastern script-variant (equivalent to ISO 15924 \'Syrn\')","text.lang.szl":"Silesian","text.lang.tab":"Tabasaran","text.lang.tg":"Tajiki","text.lang.ta":"Tamil","text.lang.tt":"Tatar","text.lang.x-hbottcr":"TH-Cree","text.lang.tdd":"Dehong Dai","text.lang.te":"Telugu","text.lang.tet":"Tetum","text.lang.tl":"Tagalog","text.lang.to":"Tongan","text.lang.tig":"Tigre","text.lang.ti":"Tigrinya","text.lang.th":"Thai","text.lang.ty":"Tahitian","text.lang.bo":"Tibetan","text.lang.tiv":"Tiv","text.lang.tk":"Turkmen","text.lang.tmh":"Tamashek","text.lang.tem":"Temne","text.lang.tn":"Tswana","text.lang.yrk":"Tundra Enets","text.lang.toi":"Tonga","text.lang.xwo":"Todo","text.lang.tod":"Toma","text.lang.tpi":"Tok Pisin","text.lang.tr":"Turkish","text.lang.ts":"Tsonga","text.lang.tsj":"Tshangla","text.lang.tru":"Turoyo Aramaic","text.lang.tcy":"Tumbuka","text.lang.tum":"Tulu","text.lang.tyv":"Tuvin","text.lang.tvl":"Tuvalu","text.lang.tw":"Twi","text.lang.tyz":"Tày","text.lang.tzm":"Tamazight","text.lang.tzo":"Tzotzil","text.lang.udm":"Udmurt","text.lang.uk":"Ukrainian","text.lang.umb":"Umbundu","text.lang.ur":"Urdu","text.lang.hsb":"Upper Sorbian","text.lang.ug":"Uyghur","text.lang.uz":"Uzbek","text.lang.vec":"Venetian","text.lang.ve":"Venda","text.lang.vi":"Vietnamese","text.lang.vo":"Volapük","text.lang.vro":"Võro","text.lang.wbm":"Wa","text.lang.wbr":"Wagdi","text.lang.war":"Waray-Waray","text.lang.x-hbotwci":"Waci Gbe","text.lang.crk":"West-Cree","text.lang.cy":"Welsh","text.lang.wo":"Wolof","text.lang.wa":"Walloon","text.lang.wtm":"Mewati","text.lang.khb":"Lü","text.lang.xh":"Xhosa","text.lang.xjb":"Minjangbal","text.lang.xkf":"Khengkha","text.lang.xog":"Soga","text.lang.xpe":"Kpelle (Liberia)","text.lang.sah":"Sakha","text.lang.yao":"Yao","text.lang.yap":"Yapese","text.lang.yo":"Yoruba","text.lang.x-hbotycr":"Y-Cree","text.lang.x-hbotyic":"Yi Classic","text.lang.ii":"Yi Modern","text.lang.zea":"Zealandic","text.lang.zgh":"Standard Moroccan Tamazight","text.lang.za":"Zhuang","text.lang.zh-hk":"Chinese, Traditional, Hong Kong SAR","text.lang.x-hbotzhp":"Chinese, Phonetic","text.lang.zh-hans":"Chinese, Simplified","text.lang.zh-hant":"Chinese, Traditional","text.lang.x-hbotzhtm":"Chinese, Traditional, Macao SAR","text.lang.zne":"Zande","text.lang.zu":"Zulu","text.lang.zza":"Zazaki"},"GMemoryManager":{"text.title":"%app is low on memory.","text.subtitle":"Please close a few files to free up some memory and avoid losing your progress."},"GBetaFlow":{"text.title":"You are using the beta version of %app.","text.message":"This is a pre-release version and may contain bugs, we strongly advise against using it for production work.","text.i-understand":"I understand"},"GSharepointOneDriveAuthenticator":{"text.please-hold-on":"Please hold on, we are logging you in."},"GSubAction":{"shortcut-hint-template":"%mainShortcutHint then %shortcutSubKeyHint"},"GSharePointCheckInAction":{"title":"Check In to SharePoint","text.doc-modified-save-before-check-in":"\'%title\' has been modified, please save it before doing the \'Check In\'."},"GSharePointCheckOutAction":{"title":"Check Out and Refresh from SharePoint","text.successul-checkout":"The document was succesfully checked out.","text.already-checkout":"The document is already checked out by you."},"GImportImageFromIOSAction":{"text.ios-files":"From Files","text.ios-photos":"From Photos"},"GIPadStorageDestinations":{"text.files":"Files","text.photos":"Photos"},"GIPadStorage":{"text.saving-to-photos-failed":"Exporting files requires access to Photos in iOS. Please go to “Settings > %app > Photos” and enable access.<br/>Note that this will reload the application, please ensure to save progress for your opened design files."},"GOpenQuickHelpScreenAction":{"title":"Show Quick Help"},"GSharePointStorage":{"text.error-failed-check-out-file":"Failed to check out the Sharepoint file, please be sure it\'s not check out by someone else to avoid losing your work"},"GQuickHelpScreen":{"text.menu":"Menu","text.open":"Open","text.save":"Save","text.undo-redo":"Undo/Redo","text.zoom":"Zoom","text.snapping":"Snapping","text.select":"Select","text.shapes":"Shapes","text.path":"Path","text.knife":"Knife","text.text":"Text","text.image":"Image","text.files":"Files","text.export":"Export","text.pages":"Pages","text.layers":"Layers","text.libraries":"Libraries","text.symbols":"Symbols","text.align-distribute":"Align and Distribute","text.transform":"Transform","text.document":"Document","text.appearance":"Appearance","text.fills":"Fills","text.borders":"Borders","text.effects":"Effects","text.comments":"Comments","text.modifier-keys":"Modifier Keys","text.nudge":"Nudge","text.copy":"Copy","text.paste":"Paste","text.delete":"Delete","text.select-deselect":"Select/Deselect All","text.arrange":"Arrange","text.fullscreen":"Fullscreen","text.group":"Group","text.ungroup":"Ungroup","text.convert-to-path":"Convert to Path","text.pinch-to-zoom":"Pinch to Zoom","text.drag-with-2-fingers":"Drag with 2 fingers to Pan","text.tap-and-hold":"Tap and Hold for Contextual menu"},"GAutoSave":{"text.notification-message-1":"Calm down, your file is being auto-saved.","text.notification-message-2":"Don’t worry, your progress is saved automatically.","text.notification-message-3":"We have your back, we are saving your design now.","text.failed-auto-saving":"We were unable to save your document right now, but don’t worry, we will try again soon.","text.alert-offline":"Auto-save isn’t available when being offline. Please download the file regularly to avoid losing progress.","text.alert-offline-desktop":"Auto-save isn’t available when being offline. Please save to a local file regularly to avoid losing progress.","text.alert-sync":"Please save this file to Corel Vector to enable Auto-save. ","text.alert-sync-sub-text":"Auto-save isn\'t available for unsaved files or locally saved files.<br />Please save or sync \\"%title\\" to Corel Vector to save your progress automatically and avoid losing progress. You can keep your file locally and sync it to the Cloud at any time from the “File“ menu.","text.alert-button.cancel":"Cancel","text.alert-button.save-to-cloud":"Save to Cloud","text.alert-cloud-reference-sync":"Auto-save isn\'t available for local files (“%title”). Please open the file from Corel Vector if you want to enable auto-save.","text.alert-cloud-reference-sync-sub-text":"Please make sure to save regularly, to avoid losing progress.","text.dialog-no-entries-created-waring.title":"This %storage file will be saved automatically, but no entries in the version history will be created. You can turn off this feature in the settings.","text.dialog-no-entries-created-waring.subtitle":"Please note that reloading this file discards all unsaved progress.","text.dialog-no-entries-created-waring.go-settings":"Go to Settings","text.dialog-file-updated-out-app-waring.title":"The file \\"%file-name\\" was modified outside of %app-name and can’t be auto-saved. Please consider saving it manually.","text.dialog-file-updated-out-app-waring.do-not-reload":"Don\'t reload","text.dialog-file-updated-out-app-waring.reload":"Reload with latest changes","text.dialog-inform-warn-feature.title":"Corel Vector can save your files automatically. Do you want to enable Auto-Save?","text.dialog-inform-warn-feature.text":"You can always change this behavior from the Settings in the Edit menu.","text.dialog-inform-warn-feature.cancel-button":"I will save my files manually","text.dialog-inform-warn-feature.enable-button":"Enable Auto-Save","text.dialog-auto-save-is-not-available-for-cdr-and-des.text":"Auto-save isn’t available for CorelDRAW (CDR, DES) files. Please make sure to save regularly to avoid losing progress or save as CDRAPP to enable auto-save.","text.dialog-auto-save-is-not-available-for-cdr-and-des.save-as-button":"Save as CDRAPP","text.dialog-auto-save-is-not-available-for-cdr-and-des.keep-cdr-button":"Keep CDR, DES"},"GFileReviewManager":{"text.cant-update-file-to-status":"Can\'t update to this status"},"GReviewDockerProperties":{"text.current-status":"Current status:","text.status-history":"Status history","text.please-share-to-start":"Please share the file to start the review process.","text.share-design-now":"Share the design now","text.review-title":"In review","text.review-description":"Reviewers give feedback.","text.reopen-title":"Reopen","text.reopened-title":"Reopened","text.reopen-description":"Review done, the design needs changes.","text.requested-approval-title":"All Done. Ready for Approval","text.request-approval-title":"Request Approval","text.request-approval-description":"All feedback is addressed. No pending changes.","text.approved-title":"Approved","text.approve-title":"Approve","text.approved-description":"No more changes are needed. File is ready for output.","text.request-approval-tooltip":"No Approver(s) assigned to this file. Please assign Approver(s) with the Share button.","text-please-save-share-to-start":"Please save and share the file to start the review process.","text.save-share-design-now":"Save and share the design now"},"GFileStatusHistoryDialog":{"text.status-history":"Status history","text.action-request-approval":"%name <highlight>requested approval</highlight> for this file","text.action-approved":"%name <highlight>approved</highlight> this file","text.action-reopened":"%name <highlight>reopened</highlight> this file","text.action-in-review":"%name <highlight>requested review</highlight> for this file"},"GCollaborativeTextPanel":{"text.send-changes-failed":"There was a problem applying your changes to this design. Please try again.","text.owner-message":"Please refer to CorelDRAW to make changes in this CDR file.","text.finish-editing-message":"Please double-click inside the text element to edit it. When you are ready, click “Finish Editing“ to complete your editing session.","text.send-changes-message":"Send the changes to the file owner?","text.request-access-message":"You can\'t currently edit text elements since there is an active editing session by %name. The file will be unlocked automatically when the other editor is done or you can request access.","text.update-available-message":"There is an updated version of this file. Do you want to reload now?","text.request-access":"Request Access","text.finish-editing":"Finish Editing","text.back-to-editing":"Back to editing","text.preview-changes":"Preview Changes","text.send-changes":"Send Changes","text.rendering-preview":"Rendering preview...","text.sending-changes":"Sending...","text.updating":"Updating...","text.wants-to-take-over":"%name wants to take over the text editing in this document. If you allow this you will be unable to edit text objects until %name finishes the edits.","text.save-my-edits-and-allow":"Save my edits and Allow","text.save-my-edits-and-close":"Save my edits and close","text.discard-my-edits-and-allow":"Discard my edits and Allow","text.discard-my-edits-and-close":"Discard my edits and close","text.decline":"Decline until I am done","text.update-now":"Update Now","text.request-has-been-sent":"A request has been sent to %name.","text.send-to-owner":"Send the changes to the file owner and notify him?","text.your-changes-were-applied":"Your changes were applied.","text.changes-you-made-are-not-saved":"You edited this document, but the changes you made are not saved. If you do not save them now they will be lost."},"GCollaborators":{"text.content-editor-tooltip":"%username can edit text in this design","text.you-are-offline":"You are offline","text.you-are-offline-tooltip":"You can’t co-edit this document or comment when you are offline.","text.reviewer-tooltip":"%username can review this design","text.content_editor-tooltip":"%username can edit text in this design","text.approver-tooltip":"%username can review and approve this design","text.owner-tooltip":"%username is the owner of this design","text.can-edit-tooltip":"%username can edit this design","text.can-comment-tooltip":"%username can comment on this design","text.can-edit-parts-tooltip":"%username can edit parts of this design"},"GCloudUtil":{"text.err-subscription-is-lifetime":"You already have a Lifetime subscription.","text.err-subscription-could-not-be-deactivated":"You already have an active subscription. <BR/>If you want to apply a new coupon code you need to cancel it in your <A>account settings</A>.","text.err-subscription-is-not-expired":"Your current subscription is good through %date.<BR/>You may only apply a coupon code to new or expired subscriptions.","text.err-subscription-is-active":"You already have an active subscription.<BR/>Even if you cancel it, your current subscription is good through %date.<BR/>You may only apply a coupon code to new or expired subscriptions."},"GMagnificationAction":{"text.actual-size":"Actual Size"},"GOpenAccountSettingsAction":{"title":"Account settings"},"GLogoutAction":{"title":"Log out"},"GToggleTouchAction":{"title":"Touch interface","title-disable":"Disable Touch Interface","text.try-this-feature-pro-tooltip-title":"Touch Interface","text.try-this-feature-pro-tooltip-description":"Show/hide the Interface optimized for touch-enabled devices."},"GExampleFilesAction":{"title":"Explore Example Files"},"GGoogleDrive":{"text.warning-message":"By default, only files that were created in Corel Vector will be shown here. To open additional files from your Google Drive, please use the button below. Please note that you need to select each folder and the included files separately so that they show up here.","text.add-files":"Open files...","text.you-have-not-added":"You haven’t opened files or saved files from/to your Google Drive yet.","text.add-additional-files":"Open Additional Files","text.all-files-tab-title":"All files","text.gravit-designer-tab-title":"Corel Vector files","text.team-drives-tab-title":"Team Drives files","text.selected-file-folder-not-added":"The selected file was added. You can find it easily from \\"Recent files\\" in \\"My Cloud.\\"","text.selected-files-folder-not-added":"The selected files were added. You can find them easily from \\"Recent files\\" in \\"My Cloud.\\"","text.selected-files-folder-not-added-additional":"Please note that you need to select the containing folder and its parents, so that it shows up here.","error.no-file-found":"Error occured. No file found","error.only-for-corporate":"Error. This feature is allowed only for corporate users","error.not-enough-parameters":"Error. Some parameters are not specified","error.google-api-error":"Error occured while processing request to Google Drive API. Please try again later or contact support from Help > Contact us."},"GAnnotations":{"text.page":"Page"},"GAnnotationPanel":{"text.document-approved-no-annotations-update":"The design was Approved and can\'t receive annotations update!","text.empty":"empty","text.unread-comment":"new","text.edit-comment":"Edit comment","text.reopen":"Reopen","text.resolve":"Resolve","text.edit":"Edit...","text.remove-annotation":"Remove annotation","text.remove-comment":"Remove comment","text.delete":"Delete","text.cancel":"Cancel","text.comment":"Reply","text.fill-contents":"Add comment","text.set-annotation-text":"Set annotation text","text.add-comment":"Add comment","text.write-annotation-here":"Type comment here","text.write-reply-here":"Type reply here","text.remove-empty-annotation":"Remove empty annotation","text.confirm-discard-annotation":"Please add some text or the comment can’t be saved. Do you want to discard?","text.marked-as-resolved":"Marked as resolved","text.re-opened":"Re-opened","text.confirm-remove":"Do you really want to remove this comment?","text.copy-permalink":"Copy Permalink","text.assign-resolve":"Done","text.assigned-to":"Assigned to&nbsp;","text.assign-to":"Assign to&nbsp;","text.additional-collaborators-all-reviewers-name":"All Reviewers","text.additional-collaborators-all-reviewers-show-text":"@reviewers","text.additional-collaborators-all-reviewers-role":"All Reviewers","text.additional-collaborators-all-approvers-name":"All Approvers","text.additional-collaborators-all-approvers-show-text":"@approvers","text.additional-collaborators-all-approvers-role":"All Approvers","text.additional-collaborators-all-content-editor-name":"All Co-editors","text.additional-collaborators-all-content-editor-show-text":"@coeditors","text.additional-collaborators-all-content-editor-role":"All Co-editors","text.additional-collaborators-all-co-author-name":"All Co-authors","text.additional-collaborators-all-co-author-show-text":"@coauthors","text.additional-collaborators-all-co-author-role":"All Co-authors","text.additional-collaborators-all-name":"All","text.additional-collaborators-all-show-text":"@all","text.additional-collaborators-all-role":"All","text.additional-collaborators-owner-name":"Owner","text.additional-collaborators-owner-show-text":"@owner","text.additional-collaborators-owner-role":"Owner"},"GAnnotationProperties":{"text.change-annotation-style":"Change annotation style","text.start-arrow":"Start arrow","text.end-arrow":"End arrow","text.tooltip-ellipse-tool":"Draw ellipses","text.tooltip-rectangle-tool":"Draw rectangles","text.tooltip-comment-tool":"Add notes","text.tooltip-pencil-tool":"Draw free-form lines and shapes","text.tooltip-highlighter-tool":"Highlight canvas areas","text.tooltip-arrow-tool":"Draw arrows and lines","text.tooltip-ellipse-fill":"Choose fill color","text.tooltip-ellipse-border":"Choose outline color","text.tooltip-ellipse-outline":"Set outline width","text.tooltip-ellipse-dropper-fill":"Pick fill color from canvas","text.tooltip-ellipse-dropper-border":"Pick outline color from canvas","text.tooltip-rectangle-fill":"Choose fill color","text.tooltip-rectangle-border":"Choose outline color","text.tooltip-rectangle-outline":"Set outline width","text.tooltip-rectangle-dropper-fill":"Pick fill color from canvas","text.tooltip-rectangle-dropper-border":"Pick outline color from canvas","text.tooltip-pencil-border":"Choose line color","text.tooltip-pencil-outline":"Set line width","text.tooltip-pencil-dropper-border":"Pick line color from canvas","text.tooltip-highlighter-border":"Choose highlight color","text.tooltip-highlighter-outline":"Set highlight width","text.tooltip-highlighter-dropper-border":"Pick highlight color from canvas","text.tooltip-arrow-border":"Choose line color","text.tooltip-arrow-outline":"Set line width","text.tooltip-arrow-dropper-border":"Pick line color from canvas","text.tooltip-comment-fill":"Choose note background color","text.tooltip-comment-dropper-fill":"Pick color from canvas"},"GAnnotationsSidebar":{"text.title":"Comments","text.show-updates":"Show updates","text.annotation-options":"Settings","text.show-resolved":"Show resolved","text.resolve-all-comments":"Resolve all comments","text.resolve-all":"Resolve all","text.notification":"Notification","text.notification-all-annotation":"All annotations","text.notification-assign-to-me":"Only assigned to me","text.notification-none":"None","text.save-file-tip":"This option is disabled until the file is saved to the Cloud.","text.hover-notification":"You can change the interval of notifications in the <span> Settings </span>"},"GTextAnnotation":{"text.new-annotation":"New annotation"},"GEditorOptions":{"text.anonymous-user":"Anonymous"},"GUseCouponAction":{"title":"Use Coupon","text.hava-coupon":"Have a coupon for Corel Vector? Enter it below.","text.invalid-coupon":"Invalid value, please inform a valid coupon!"},"GNotificationPanel":{"text.title-welcome":"Create a trial account","text.create-account":"Please %signup or %signin to try out the full functionality and save or export designs.","text.create-account-template":"Please %signup or %signin to try out the full functionality and save or export this template.","text.sign-up":"create a free account","text.sign-in":"log in","text.footer":"Learn more about %app."},"GDesigner":{"text.design-by":"Design by %name - %appname","text.preview-by":"Preview %name design in %appname online vector graphic design app. Preview the design and create a free account today!"},"GContainer":{"text.load-failed":"This design can’t be found or isn’t enabled for sharing.","text.request-permission":"Request permission to access.","text.not-memary-enough":"Not enough memory for saving, please free some memory before trying to save.","text.load-failed-from-link":"This file can\'t be opened by link, please open it directly from the Cloud.","text.load-failed-from-recent":"This file can\'t be opened from Recent files, please open it directly from the Cloud."},"GShareManager":{"text.auto-save-notification":"Comments/annotations were saved successfully to this CDR/DES file. It can now be opened with the latest changes in CorelDRAW. Please note that you need to save the file manually to include all changes to the design elements.","text.sent-request-email":"A request email has been sent.","text.cannot-request-access":"Cannot request access. Make sure the document exists and is shared with you.","text.file-can-not-be-accessed-title":"This file can\'t be accessed.","text.file-can-not-be-accessed-info":"The file either can\'t be found or it\'s not shared with you.","text.file-can-not-be-commented-title":"Your role is %role.","text.file-can-not-be-commented-info":"You don’t have permission to see comments on this design.","text.file-request-permission-to-comment":"Request Permission to Comment","text.file-request-access":"Request Access","text.template-shared-by":"This template was shared by %name.","text.shared-by":"This design was shared by %name.","text.save-warning":"The owner does not allow to save or download this file.","text.inspect-warning":"The owner only allows to view this file.","text.combined-warnings":"The owner does not allow to save or download this file and only allows to view it.","text.cant-comment":"You can view the design, but you can\'t add comments to the file.","text.new-role-is-viewer":"Your new role is Viewer. Now you can only preview this design.","text.new-role-is-reviewer":"Your new role is Reviewer. Now you can preview, comment and annotate this design.","text.new-role-is-approver":"Your new role is Approver. Now you can preview, comment and annotate this design, as well as approve the final revision.","text.new-role-is-content_editor":"Your new role is Content Editor. Now you can edit marked text objects in this design, as well as comment and annotate.","text.new-role-is-co_author":"Your new role is Co-Author. You can add and edit objects in this design, as well as comment and annotate. All changes will be saved in real-time.","text.new-role-is-developer":"Your new role is Developer. Now you can view, inspect, export assets or save a copy of this design."},"GShareDialog":{"text.participants-will-be-invited":"The participant(s) will be invited via email after you close the Share dialog.","text.you-can-not-invite-yourself":"You can’t share this file with yourself.","text.empty-email":"Email is not valid, please check if it\'s a correct address.","text.you-can-not-invite-user-from-another-domain":"Sharing design files with external users (outside the registered corporate domain) requires the file to be stored on Cloud. Save the file to the Cloud first to share with external users.","text.invalid-email":"%email is not valid, please check if it\'s a correct address.","text.resend-invitation-email":"Resend invitation email","text.resent-invitation-email":"The invitation was resent to %email.","text.sent-invitation-email":"An invitation was sent to %emails.","text.projects-left":"%number projects left in trial","text.role-required":"A role is required!","text.email-required":"An email is required!","text.public-share-link":"Everybody with the link:","text.private-share-placeholder":"Add email here to invite a participant ...","text.private-sharing":"Private Sharing","text.private-sharing-add":"Add","text.copied":"Copied","text.title":"Share File","text.subtitle-on":"Copy and share this link with your peers and stakeholders.","text.subtitle-off":"Turn on sharing to see the available options.","text.switch-on":"Sharing is On","text.switch-off":"Sharing is Off","text.allow-to-save-label":"Allow to Save","text.allow-to-save-info":"Everyone with the link will be able to download or save the file to his own account.","text.allow-to-inspect-label":"Allow to Inspect","text.allow-to-inspect-info":"Everyone with the link will be able to inspect the full layer structure of this file.","text.allow-to-comment-label":" ","text.allow-to-comment-info":" ","text.failed-copying-to-clipboard":"Failed copying to clipboard","text.copy":"Copy","text.options-description":"Allow everyone who has the link to:","text.private-share-no-options-left":"All users with email %email are already in the Private Sharing list.","text.error-change-role-failed":"External API didn\'t allow to change role","text.native-link-share-title":"","text.native-link-share-description":"","text.error-unsupported-native-link-share":"","text.error-unhandled-native-link-share":""},"GCDGSAssetShareDialog":{"text.participants-will-have-access-cdgs":"The participant(s) will have access to the assets in CorelDRAW."},"GShareAction":{"title":"Share File"},"GOpenSharedFileAction":{"title":"Open Shared File...","text.prompt-text":"Paste the shared design URL here: ","text.cancel":"Cancel","text.open":"Open","invalid-link":"Invalid link, please be sure to enter a valid share URL!"},"GCloudSynchronizationAction":{"text.syncing":"Syncing...","text.sync-to-cloud":"Sync File to Corel Vector...","text.unsync-from-cloud":"Unsync from Corel Vector...","text.last-synced-at":"Last synced at: %date"},"GPaymentDialog":{"text.default-title":"Corel Vector","text.dialog-dont-leave":"Wait Don’t Leave, Your Order has not Been Placed. <br>We cannot process your order until you fill in Your Info and Payment Info. <br>Once your Order is placed this window will close and you will be on your way to using Corel Vector.","text.cancel":"Cancel","text.finish-my-order":"Finish My Order","text.something-went-wrong":"Something is wrong","text.payment-not-confirmed":"We couldn\'t confirm your payment. <br>Please get in touch with our support via email: <a href=\'%link\'>%link</a>","text.canceled":"Canceled"},"GSystemDialog":{"text.cdr-warning-title":"Editing a CorelDRAW (CDR, DES) design","text.cdr-warning-label":"Important Note","text.cdr-warning-message":"CorelDRAW (CDR, DES) files are currently supported for annotating and adding content in CorelDRAW.app. All CorelDRAW drawing content will be displayed as a locked underlay. Any objects you create in CorelDRAW.app will be added to a new layer. When saving as CDR file the new layer(s) and its contents will be added to the CorelDRAW file while the original content will remain unchanged.","text.do-not-show-again":"Don\'t show this again","text.supported-touch-title":"It seems you are using a touch-enabled device. Do you want to switch to the touch-optimized interface?","text.supported-touch-footer":"You can switch to the touch interface at any time with “Touch interface” in the “View” menu.","text.unsupported-browser":"%app is optimized for the latest versions of Chrome, Firefox, Safari, and (new) Edge. Please try a supported web browser for an optimal experience.","text.unsupported-browser-touch":"%app is optimized for the latest versions of Safari on iOS and Chrome on Android. Please try a supported web browser for an optimal experience.","text.unsupported-screen-size":"Please note that %app may not work optimally on your device. For an optimal experience, it should be a device with a screen width of at least 1024 pixels width, 2 GB RAM and a CPU with 2.2 Ghz.","text.cdr-unsupported-objects-warning-title":"Save as CorelDRAW (CDR, DES) file","text.cdr-unsupported-objects-warning-label":"Unsupported objects","text.cdr-unsupported-objects-warning-message":"Your design contains objects that cannot be saved to CorelDRAW (CDR, DES) file format.","text.cdr-unsupported-objects-warning-option-0":"Keep appearance","text.cdr-unsupported-objects-warning-option-1":"Keep editable","text.cdr-unsupported-objects-warning-option-2":"Save as CDRAPP and keep objects editable","text.cdr-unsupported-objects-warning-option-3":"Omit incompatible objects","text.cdr-unsupported-objects-warning-option-0-tooltip":"Incompatible objects display accurately but won\'t be editable. Text will be converted to paths.","text.cdr-unsupported-objects-warning-option-1-tooltip":"Incompatible objects display accurately but won\'t be editable. Text appearance can change but will retain editing capabilities.","text.cdr-unsupported-objects-warning-option-3-tooltip":"Warning: Incompatible objects will not be saved and not available when opening the file again.","text.cdr-unsupported-objects-warning-details-label":"Details about affected pages/ layers","text.cdr-unsupported-object-warning-message":"%name is incompatible with the CorelDRAW (CDR, DES) format.You will be prompted to decide what to do with incompatible objects when saving the file as CorelDRAW (CDR, DES) file.","text.cdr-unsupported-object-warning-effect-name":"\\"%name\\" Effect","text.cdr-unsupported-object-warning-generic-name":"The object you\'re creating","text.unsupported-mobile-for-msteams":"CorelDRAW.app can not be run within the mobile application of Teams.","text.unsupported-mobile-for-msteams-new":"CorelDRAW.app is not optimized to run on mobile devices. It needs a screen resolution of at least 1024x768px.","text.unsupported-screen-size-msteams":"Please note that CorelDRAW.app may not work optimally on your device. For an optimal experience, it should have a screen resolution of at least 1024x768px.","text.unsupported-windows-size-msteams":"Please click on the \'Expand tab\' button on the top-right corner for the best experience."},"GCDRIntegrationEngine":{"text.cdr-unsupported-fonts":"This design may contain unsupported fonts (including styles and features).","text.cdr-unsupported-infinite-canvas":"Infinite Canvas","text.cdr-unsupported-blending-mode":"Blending mode","text.cdr-unsupported-blending-mode-layer":"Blending mode Fill/Border","text.cdr-unsupported-cmyk":"CMYK Color","text.cdr-unsupported-multiple-fills":"Multiple Object Fills","text.cdr-unsupported-multiple-borders":"Multiple Stroke Fills","text.cdr-unsupported-nonsolid-fills":"Non-Solid-Color Object Fill","text.cdr-unsupported-nonsolid-borders":"Non-Solid-Color Stroke Fill","text.cdr-background":"Background","text.cdr-unable-to-save-permission":"Unable to save file. Do you have permissions?","text.image-too-big":"The image you are trying to import is too large. Please resize and try again.","text.file-dimensions-too-big":"The dimensions of the pages contained in this CorelDRAW design are too big. Please decrease their size or the design’s dpi and try again.","text.blending-modes-currently-not-supported":"Blending modes are currently not supported when saving to CorelDRAW."},"GLocale":{"create":"Create","add":"Add","edit":"Edit","remove":"Remove","delete":"Delete","open":"Open","save":"Save","cancel":"Cancel","ok":"OK","yes":"Yes","no":"No","close":"Close","loading":"Loading","loading_of":"Loading of","saving":"Saving","saving_of":"Saving of","success":"Success","failure":"Failure","waiting":"Waiting","syncing":"Syncing"},"GFont":{"weight.thin":"Thin","weight.extra-light":"Extra-Light","weight.light":"Light","weight.regular":"Regular","weight.medium":"Medium","weight.semi-bold":"Semi-Bold","weight.bold":"Bold","weight.extra-bold":"Extra-Bold","weight.heavy":"Heavy","weight.thin-italic":"Thin Italic","weight.extra-light-italic":"Extra-Light Italic","weight.light-italic":"Light Italic","weight.regular-italic":"Regular Italic","weight.medium-italic":"Medium Italic","weight.semi-bold-italic":"Semi-Bold Italic","weight.bold-italic":"Bold Italic","weight.extra-bold-italic":"Extra-Bold Italic","weight.heavy-italic":"Heavy Italic"},"GImage":{"name":"Image","name.unsplash":"Unsplash Photo"},"GEllipse":{"name":"Ellipse","type.arc":"Open","type.chord":"Closed","type.pie":"Pie"},"GRectangle":{"name":"Rectangle"},"GCompoundShape":{"name":"Compound Shape"},"GLayer":{"name":"Layer"},"GGroup":{"name":"Group"},"GScene":{"name":"Scene","page":"Page"},"GPage":{"name":"Page"},"GSymbol":{"name":"Symbol"},"GPolygon":{"name":"Polygon"},"GPath":{"name":"Path"},"GCompoundPath":{"name":"Compound Path"},"GPathsGraph":{"name":"Graphic Network"},"GText":{"name":"Text"},"GCollabText":{"name":"Collaborative Text"},"GScenePaintConfiguration":{"paint.full":"Full","paint.fast":"Fast","paint.outline":"Outline","paint.output":"Output"},"GSlice":{"name":"Slice"},"GBlurEffect":{"name":"Blur"},"GShape":{"name":"Shape"},"GConnector":{"name":"Connector"},"GGLBlurEffect":{"name":"Blur"},"GGLBrightnessContrastEffect":{"name":"Brighness/contrast"},"GGLBulgePinchEffect":{"name":"Bulge"},"GGLColorHalfToneEffect":{"name":"Halftone"},"GGLDenoiseEffect":{"name":"Denoise"},"GGLDotScreenEffect":{"name":"Dot screen"},"GGLEdgeWorkEffect":{"name":"Edge work"},"GGLHexagonalEffect":{"name":"Hexagonal"},"GGLHueSaturationEffect":{"name":"Hue saturation"},"GGLInkEffect":{"name":"Ink"},"GGLLensBlurEffect":{"name":"Lens blur"},"GGLNoiseEffect":{"name":"Noise"},"GGLSepiaEffect":{"name":"Sepia"},"GGLSwirlEffect":{"name":"Swirl"},"GGLToonEffect":{"name":"Toon"},"GGLBloomEffect":{"name":"Bloom"},"GGLInnerGlowEffect":{"name":"Inner Glow"},"GGLOuterGlowEffect":{"name":"Outer Glow"},"GGLStrokeLayerEffect":{"name":"Stroke","text.outside":"Outside","text.inside":"Inside","text.center":"Center"},"GGLSketchEffect":{"name":"Sketch"},"GGLTiltShiftEffect":{"name":"Tilt shift"},"GGLTrueBlurEffect":{"name":"True blur (slow)"},"GGLUnsharpMaskEffect":{"name":"Unsharp mask"},"GGLVibranceEffect":{"name":"Vibrance"},"GGLVignetteEffect":{"name":"Vignette"},"GGLZoomBlurEffect":{"name":"Zoom blur"},"GGLRecolourEffect":{"name":"Recolor"},"GAdjustMultiEffect":{"name":"Adjust"},"GColorAdjustMultiEffect":{"name":"Color Adjust"},"GGLColorAdjustEffect":{"name":"Color Adjust"},"GColorGradingEffect":{"name":"Color Grading"},"GColorMatrixEffect":{"name":"Color Matrix"},"GColorTransformEffect":{"name":"Color Transform"},"GDropShadowEffect":{"name":"Drop Shadow"},"GContactShadowEffect":{"name":"Contact Shadow"},"GLongShadowEffect":{"name":"Long Shadow"},"GCurvedShadowEffect":{"name":"Curved Shadow"},"GGLBendEffect":{"name":"Bend"},"GGLDrunkEffect":{"name":"Alcohol"},"GGLFisheyeEffect":{"name":"Fisheye"},"GMirrorEffect":{"name":"Mirror"},"GInnerShadowEffect":{"name":"Inner Shadow"},"GOverlayEffect":{"name":"Overlay"},"GLength":{"unit.px":"Pixels","unit.mm":"Millimeters","unit.cm":"Centimeters","unit.in":"Inches","unit.pc":"Picas","unit.pt":"Points","unit.px.short":"px","unit.mm.short":"mm","unit.cm.short":"cm","unit.in.short":"in","unit.pc.short":"pc","unit.pt.short":"pt","unit.cc":"Ciceros","unit.dd":"Didots","unit.ft":"Feet","unit.yd":"Yards","unit.mi":"Miles","unit.km":"Kilometers","unit.m":"Meters","unit.H":"H","unit.Q":"Q","unit.cc.short":"cc","unit.dd.short":"dd","unit.ft.short":"ft","unit.yd.short":"yd","unit.mi.short":"mi","unit.km.short":"km","unit.m.short":"m","unit.H.short":"H","unit.Q.short":"Q"},"GStylable":{"layer.element":"Element","layer.fill":"Fill","layer.border":"Border","border-alignment.inside":"Inside","border-alignment.center":"Center","border-alignment.outside":"Outside","border-marker.circle":"Circle","border-marker.bullet":"Bullet","border-marker.diamond":"Diamond","border-marker.line":"Line","border-marker.linedouble":"Double Line","border-marker.arrow":"Arrow","border-marker.arrowfat":"Fat Arrow","border-marker.arrowline":"Line Arrow","border-marker.arrowdoubleline":"Double Line Arrow","border-marker.arrowlinebar":"Arrow Line Bar","border-marker.arrowpointer":"Arrow Pointer"},"GPaintCanvas":{"blend.normal":"Normal","blend.multiply":"Multiply","blend.screen":"Screen","blend.overlay":"Overlay","blend.darken":"Darken","blend.lighten":"Lighten","blend.colordodge":"Color Dodge","blend.colorburn":"Color Burn","blend.hardlight":"Hard Light","blend.softlight":"Soft Light","blend.difference":"Difference","blend.exclusion":"Exclusion","blend.hue":"Hue","blend.saturation":"Saturation","blend.color":"Color","blend.luminosity":"Luminosity","blend.linearburn":"Linear Burn","blend.lineardodge":"Linear Dodge","blend.linearlight":"Linear Light","blend.vividlight":"Vivid Light","blend.pinlight":"Pin Light","blend.divide":"Divide","blend.add":"Add","blend.subtract":"Subtract","blend.hardmix":"Hard Mix","blend.power":"Power","blend.harmonic":"Harmonic","blend.sin":"Sine","linecap.butt":"Butt","linecap.round":"Round","linecap.square":"Square","linejoin.bevel":"Bevel","linejoin.round":"Round","linejoin.miter":"Miter"},"GPathBase":{"corner.rounded":"Round","corner.inverse-rounded":"Round2","corner.bevel":"Bevel","corner.inset":"Inset","corner.fancy":"Fancy","anchor-point.mirror":"Mirrored","anchor-point.asymmetric":"Disconnected","anchor-point.symmetric":"Asymmetric","anchor-point.connector":"Connector"},"GSketchImport":{"text.unsupported-version":"Unsupported Version. Must be 43 or latest"},"GEPSParser":{"01":"Parts of the EPS file aren’t supported by Corel Vector. They are displayed with blue fills...","02":"Parts of the EPS file aren’t supported by Corel Vector. They are not imported...","03":"The file can\'t be loaded in a timely manner. Stopping...","04":"The file can\'t be loaded.","05":"File loading is canceled."},"GWebGLEffect":{"radius":"Radius","softness":"Softness","bend":"Bend","cov":"Cov","bloomIntensity":"Bloom Int.","baseIntensity":"Base Int.","bloomSaturation":"Bloom Sat.","baseSaturation":"Base Sat.","blurRadius":"Blur Rad.","bloomThreshold":"Bloom Thre.","clip":"Clip","brightness":"Brightness","contrast":"Contrast","centerX":"Center X","centerY":"Center Y","strength":"Strength","angle":"Angle","size":"Size","red":"Red","green":"Green","blue":"Blue","exponent":"Exponent","strengthX":"Strength X","strengthY":"Strength Y","scale":"Scale","hue":"Hue","saturation":"Saturation","intensity":"Intensity","color":"Color","opacity":"Opacity","amount":"Amount","width":"Width","shape":"Shape","ellyptical":"Ellyptical","placement":"Placement","startX":"Start X","startY":"Start Y","endX":"End X","endY":"End Y","gradientRadius":"Gradient Rad.","threshold":"Threshold","quantization":"Quantization"},"GSceneEditor":{"action.insert":"Insert","action.remove":"Remove","action.properties":"Change Properties"},"GPointerTool":{"name":"Pointer","tooltip-title":"Pointer tool","tooltip-description":"Click and drag to create a selection. Click an object to select it. Hold SHIFT to add/remove from selection. Hold ALT to select only objects fully enclosed in marqee"},"GSubSelectTool":{"name":"Subselect","tooltip-title":"Subselect tool","tooltip-description":"Click to select, edit, add and delete anchor points on a path. Click an object to select it."},"GLassoTool":{"name":"Lasso","tooltip-title":"Lasso tool","tooltip-description":"Click and drag to draw an area selecting many anchor points at once."},"GLayerTool":{"name":"Layer","tooltip-title":"Layer tool","tooltip-description":"Click to select objects within a Layer Group."},"GSliceTool":{"name":"Slice","tooltip-title":"Slice tool","tooltip-description":"Click and drag to define a specific area of your artwork to be exported as an asset."},"GPenTool":{"name":"Pen","tooltip-title":"Pen tool","tooltip-description":"Click and drag to create a starting point. Hold SHIFT to constrain it in 45°. Hold D to use Subselect tool."},"GBezigonTool":{"name":"Bezigon","tooltip-title":"Bezigon tool","tooltip-description":"Click and drag to create a starting point. Hold ALT to create a perfect curve. Hold SHIFT to constrain it in 45°."},"GFreehandTool":{"name":"Freehand","action.create-freehand-path":"Create freehand path","tooltip-title":"Freehand tool","tooltip-description":"Click and drag to start drawing. Hold D to use Subselect tool."},"GMagicTool":{"name":"Freehand shaping","tooltip-title":"Freehand shaping","tooltip-description":"Click and drag to add or subtract from an object."},"GKnifeTool":{"name":"Knife","action.cut-shape":"Cut shape(s)","tooltip-title":"Knife tool","tooltip-description":"Click a vector object to slice it."},"GLineTool":{"name":"Line","tooltip-title":"Create line","tooltip-description":"Click, drag and release to create a straight line. Hold ALT to create from center point. Hold SHIFT to constrain it in 45°."},"GRectangleTool":{"name":"Rectangle","tooltip-title":"Create rectangle","tooltip-description":"Click and drag to create a rectangle. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GEllipseTool":{"name":"Ellipse","tooltip-title":"Create ellipse","tooltip-description":"Click and drag to create an ellipse. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GPolygonTool":{"name":"Polygon","tooltip-title":"Create polygon","tooltip-description":"Click and drag to create a polygon. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GTriangleTool":{"name":"Triangle","tooltip-title":"Create triangle","tooltip-description":"Click and drag to create a triangle. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GStarTool":{"name":"Star","tooltip-title":"Create star","tooltip-description":"Click and drag to create a star. Hold ALT to create from center point. Hold SHIFT to constrain proportions."},"GTextTool":{"name":"Text","your-text-here":"Your text here","action.insert-text":"Insert text","tooltip-title":"Text tool","tooltip-description":"Click to create text. "},"GHandTool":{"name":"Pan","tooltip-title":"Pan tool","tooltip-description":"Click and drag to pan view."},"GZoomTool":{"name":"Zoom","tooltip-title":"Zoom tool","tooltip-description":"Click to zoom in about a point. Hold ALT and click to zoom out. Click and drag to create a zoom in area."},"GEditor":{"action.delete-selection":"Delete Selection","action.resize-selecion":"Resize Selection","action.transform-clone-selection":"Transform & Clone Selection","action.transform-selection":"Transform Selection","action.insert-elements":"Insert Element(s)","action.change-elements":"Change Elements","action.insert-image":"Insert Image(s)","action.convert-to-paths":"Convert to Path(s)","action.arrange-order":"Arrange Order","action.arrange-alignment":"Arrange Alignment","action.inline-editing":"Inline Editing","action.move":"Move","action.drag-style":"Drag Style"},"GGradientStyleEditor":{"text.gradient":"Gradient","action.add-gradient-stop":"Add Gradient Stop"},"GPathsGraphTool":{"action.append-point":"Append Point","action.insert-elements":"Insert Element(s)","action.insert-point":"Insert Point","action.move-point":"Move Point","action.delete-point":"Delete Point","action.modify-point-properties":"Modify Point Properties","action.modify-path-properties":"Modify Path Properties"},"GPathTool":{"action.append-point":"Append Point","action.insert-elements":"Insert Element(s)","action.insert-point":"Insert Point","action.move-point":"Move Point","action.delete-point":"Delete Point","action.modify-point-properties":"Modify Point Properties","action.modify-path-properties":"Modify Path Properties","action.join-paths":"Join Paths"},"GShapeTool":{"action.insert-elements":"Insert Element(s)"},"GSelectTool":{"action.insert-path-point":"Insert Path Point","action.transform-clone-selection":"Transform & Clone Selection","action.transform-selection":"Transform Selection","action.modify-element":"Modify %element","text.element":"Element"},"GCompoundShapeEditor":{"action.drop-pattern":"Drop Pattern"},"GImageEditor":{"action.crop-image":"Crop Image"},"GInlineTextEditor":{"action.modify-text-properties":"Modify text properties"},"GShapeEditor":{"action.drop-pattern":"Drop Pattern"},"GTextEditor":{"action.drop-font":"Drop Font","action.modify-text-properties":"Modify text properties","action.edit-text":"Edit text"},"GPageEditor":{"action.resize-pages":"Resize pages"},"GFillTool":{"action.modify-fill":"Modify Fill"},"GEditorWidget":{"action.remove-guide-line":"Remove guide line","action.change-guide-line":"Change guide line","action.add-guide-line":"Add guide line","action.insert-master-symbol":"Insert master symbol"},"GKey":{"key.1":"Space","key.2":"Enter","key.3":"Tab","key.4":"Backspace","key.5":"Control","key.5.short":"Ctrl","key.6":"Shift","key.7":"Alt","key.8":"Left","key.9":"Up","key.10":"Right","key.11":"Down","key.12":"Page Up","key.13":"Page Down","key.14":"Home","key.15":"End","key.16":"Insert","key.16.short":"Ins","key.17":"Delete","key.17.short":"Del","key.18":"Escape","key.18.short":"Esc","key.19":"Command","key.19.short":"Cmd","key.30":"F1","key.31":"F2","key.32":"F3","key.33":"F4","key.34":"F5","key.35":"F6","key.36":"F7","key.37":"F8","key.38":"F9","key.39":"F10","key.40":"F11","key.41":"F12"},"GPDFExport":{"text.wait":"Please wait! This might take a little while..."},"GInfo":{"text.title":"You haven\'t activated your account yet. Please do so until %date, or it will be deactivated.","text.resend-email":"Resend email here","text.email-sent":"Email sent.","text.email-sent-submessage":"Please be sure to also check the spam/junk folder of your email client.","text.something-went-wrong":"Something is wrong.","text.save-message":"Please save your file regularly, progress will be lost when you leave this tab.","text.check-in-message":"Please don’t forget to \\"Check In\\" the file, to allow collaborators to see your changes."},"GVersionHistoryProperties":{"error-loading":"Error while loading versions. Please try again in a few minutes.","title":"Version History","edit-version":"Edit this version","close-preview":"Close preview","preview":"Preview","restore":"Restore","text.current-version":"Current version","text.version":"Version %version","text.title-manual-save-tooltip-title":"These versions were saved manually","text.title-auto-save-tooltip-title":"These versions were created via auto-save","text.title-manual-save":"Manual Saves","text.title-auto-save":"Auto-Saves"},"GDeveloperDetailsAction":{"title":"Send Developer Details","message":"Please send the provided text file to our support team at <a href=\\"%link\\" title=\\"Support\\" target=\\"_blank\\">%link.</a>"},"GWarnLinkedImageDialog":{"warn-linked-image.text":"Linked images will not be available when opening your file on another computer or in the web app.","warn-linked-image.proceed":"Proceed","warn-linked-image.cancel":"Cancel","warn-linked-image.never-remind":"Don\'t show anymore"},"GEmbeddedLogin":{"text.title":"Welcome to Corel Vector","text.pop-has-been-blocked":"The pop-up has been blocked. To log in using your %provider credentials, please allow all %app pop-ups and reload this page, or click <a>here</a>."},"GLoginDialog":{"text.sign-in-title":"Please log in to your Corel Vector account to continue.","text.not-register":"Don\'t have an account yet?","text.sign-up":"Create your FREE account.","text.placeholder-sign-in-login":"Email","text.sign-in-login":"Username / Email address","text.placeholder-sign-in-password":"Password (min 6 chars.)","text.sign-in":"Log in","text.or":"- or -","text.sign-facebook":"Log In With Facebook","text.sign-google":"Log In With Google","text.signup-facebook":"Create Account With Facebook","text.signup-google":"Create Account With Google","text.forgot-password":"Forgot your password?","text.sign-up-title":"Create your FREE account then start designing.","text.already-registered":"Already have an account?","text.back-sign-in":"Go back to log in","text.placeholder-sign-up-email":"Your email","text.placeholder-sign-up-username":"Your username","text.placeholder-sign-up-password":"Choose a password (min 6 chars.)","text.agree":"I agree to the","text.terms-use":"Terms of Use","text.privacy-policy":"Privacy Policy","text.newsletter":"Subscribe me to the Corel Vector Newsletter","text.sign-up-now":"Start Now!","text.reset-password-title":"We will send a link to this email address to reset your password.","text.reset-password-header-title":"Reset password","text.reset-password-send":"Send Request","text.placeholder-reset-password-email":"Email","text.sign-up-thanks":"The account was created successfully. Please, check your email.<br><br>We have sent a confirmation to %email. Please click on the link in this email to activate your account.<br><br>If you don\'t activate your account in 3 days it will be automatically deactivated.","text.ok":"OK","text.login-dialog-title":"Start using Corel Vector","text.continue-without-loggin-in":"Continue without logging in","text.login-here":"Log in here.","text.placeholder-sign-up-first-name":"First Name","text.placeholder-sign-up-last-name":"Last Name","text.you-are-offline":"You are offline. Please reestablish your connection to proceed.","text.sign-in-button":"SIGN IN","text.sign-in-password":"Password","text.enterprise-sign-in-message":"CorelDRAW.app Enterprise users, sign in with your<br/> Microsoft 365 or Google Workspace account.<div class=\'highlight-top\'>*</div>","text.enterprise-login-message-1":"<div class=\'highlight\'>*</div> Note: CorelDRAW.app Enterprise sign-in is available exclusively to companies signed-up for a CorelDRAW.app Enterprise License.","text.enterprise-login-message-2":"If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator","text.enterprise-sign-microsoft":"Sign in with Microsoft 365","text.enterprise-sign-google":"Sign in with Google Workspace"},"GConfirmationDialog":{"text.confirm-info-save":"A confirmation with a summary of the order has been sent to %email. Your design will be saved now.","text.confirm-info-export":"A confirmation with a summary of the order has been sent to %email. Your design will be exported now.","text.confirm-save":"Save design","text.confirm-export":"Export design","text.confirm-resend":"Resend it here"},"GPaywallDialog":{"text.paywall-info":"You can continue to edit this design for free. If you want to save or export it, you need to pay","text.paywall-buy":"Buy now for","text.paywall-edit":"Edit for free","text.paywall-bought":"You already bought this product"},"GPurchasePanel":{"text.purchased-expires":"expires on %date","text.subscription-ends":"valid until %date","text.pro-subscription-lifetime":"%app Lifetime Subscription","text.pro-subscription":"%app Subscription","text.orderby-label":"Order By:","text.orderby-number":"Order number","text.orderby-name":"Name","text.orderby-price":"Price","text.orderby-date":"Date","text.orderno":"Order nº","text.purchased":"Purchased on","text.search-label":"Search Product","text.purchased-renews":"renews on","text.change-subscription":"Change subscription","text.placeholder-password":"Use %min-number to %max-number characters","text.placeholder-address":"Street name and number","text.empty-search":"Your search term didn’t match any product, please try again.","text.prompt-cancel-title":"Do you really want to cancel this subscription?","text.prompt-cancel-info":"When canceling your %app subscription you can use features until %date.<br/>After that, you need to purchase again.","text.prompt-activate-title":"Do you really want to activate this subscription?","text.prompt-activate-info":"Activating your subscription the next billing will be on %date","text.prompt-activate-label":"Activate","text.contact-partner-billing":"Please %partner% if you want to change your billing details or you have questions about your order.","text.contact-partner-cb":"contact our partner Cleverbridge","text.contact-partner-billing-alternative":"Please contact our partner %partner% if you want to change your billing details or you have questions about your order.","text.contact-partner-cleverbridge":"Cleverbridge"},"GProfileDialog":{"text.purchases":"Purchases","text.details":"Account details","text.change-password":"Change password","text.avatar-tooltip":"PNG or JPG, 100 kB. max.","text.avatar-size-too-big":"Please keep image under 100 kB"},"GChangePasswordPanel":{"text.change-password":"Choose your new password for %name","text.set-password":"Choose the password for %name","text.assign":"Assign New Password","text.new-password":"New password","text.confirm-password":"Confirm new password","text.placeholder-new-password":"New password","text.placeholder-confirm-password":"Confirm new password","text.reset-password-info":"Please choose a new password","text.set-password-info":"Please set a password for your account","text.reset-password-done":"Your password has been changed successfully.","text.new-password-tip":"Use %min-number to %max-number characters"},"GAccountPanel":{"text.user-email-message":"Changing your email address requires to activate your account again. It will be done after you have clicked on the link in the confirmation we have sent to %email.","text.contact":"Contact details","text.account-name":"Name","text.username":"Username","text.email":"Email","text.old-password":"Old Password","text.new-password":"New Password","text.billing":"Billing Address","text.address":"Address","text.city":"City","text.state":"State/Province/Region","text.zip":"ZIP","text.country":"Country","text.save":"Save","text.delete":"Delete Account","text.error":"Ooops! Something went wrong.","text.please-wait":"Please, wait...","text.success":"Details changed successfully","text.confirm-delete-account":"Do you really want to delete your Corel Vector account?","text.reset-password-info":"Please choose a new password","text.reset-password-done":"Your password has been changed successfully.","text.contact-partner-cb":"contact our partner Cleverbridge","text.contact-partner-billing":"Please %partner% if you want to change your billing details.","text.contact-partner-billing-alternative":"Please contact our partner %partner% if you want to change your billing details.","text.contact-partner-cleverbridge":"Cleverbridge","text.all-files-cloud":"all files in the Cloud","text.all-dicussion-comments":"all Corel Vector Discussion comments","text.purchased-items-and-sub":"all purchased items and subscriptions","text.action-cant-undone":"This action can\'t be undone!","text.first-name":"First name","text.last-name":"Last name","text.email-address":"Email address","text.delete-account-title":"Do you really want to delete your Corel Vector account?","text.delete-account-sub-title":"You will lose","text.delete-account-list-1":"all files in the Cloud","text.delete-account-list-2":"all Corel Vector Discussion comments","text.delete-account-list-3":"all purchased items and subscriptions","text.delete-account-action-cant-undone":"This action can\'t be undone!","text.name-usage-tips":"Your name will be used if you are adding a comment or annotation, your email address when receiving notifications.","text.update-name-link-text":"Update the user name in my Corel account.","text.view-your-account":"View your %partner% %icon%","text.account-view-link-text":"account settings on corel.com "},"GImportedFontsProvider":{"confirm.delete-font":"Are you sure you want to delete this font?"},"GLocalFontsProvider":{"text.permission-required-title":"Permission required to access system fonts!","text.permission-required-subtitle-edge":"To allow the app to access your system fonts, click on the padlock (🔒) icon in the address bar, next to the website name, then select the \'Allow\' option from the \'Fonts\' dropdown. Save your work & reload the website to begin using system fonts.","text.permission-required-subtitle-others":"To allow the app to access your system fonts, click on the padlock (🔒) icon in the address bar, next to the website name, then toggle the gray switch in the \'Fonts\' section. Save your work & reload the website to begin using system fonts.","text.current-browser-unsupported":"This browser does not support system fonts. This feature is available on Chrome, Edge & Opera."},"GAlignAction":{"title.align-left":"Align Left","title.align-center":"Align Center","title.align-right":"Align Right","title.align-top":"Align Top","title.align-middle":"Align Middle","title.align-bottom":"Align Bottom","title.align-justify-horizontal":"Same Width","title.align-justify-vertical":"Same Height","text.align-left-tooltip-title":"Align Left","text.align-left-tooltip-description":"Align all selected objects to the left side of the left-most object.","text.align-center-tooltip-title":"Align Center","text.align-center-tooltip-description":"Aligns all selected objects to the center of the selection bounding box.","text.align-right-tooltip-title":"Align Right","text.align-right-tooltip-description":"Align all selected objects to the right side of the right-most object.","text.align-top-tooltip-title":"Align Top","text.align-top-tooltip-description":"Align all selected objects to the top side of the top-most object.","text.align-middle-tooltip-title":"Align Middle","text.align-middle-tooltip-description":"Align all selected objects to the middle of the selection bounding box.","text.align-bottom-tooltip-title":"Align Bottom","text.align-bottom-tooltip-description":"Align selection to Bottom of a bounding box or page."},"GArrangeAction":{"title.send-front":"Bring to Front","title.bring-forward":"Bring Forward","title.send-backward":"Send Backward","title.send-back":"Send to Back","bring-forward-tooltip-title":"Bring element forward","bring-forward-tooltip-description":"Bring an element up in the layer hierarchy.","send-backward-tooltip-title":"Send element backward","send-backward-tooltip-description":"Send an element down in the layer hierarchy."},"GCancelCropAction":{"title":"Cancel Cropping"},"GClipAction":{"title":"Clip Selection","text.clip-selecion":"Clip Selection","tooltip-title":"Create a clip","tooltip-description":"Create a mask for an object. Click twice to edit the clipped object."},"GConnectLinesAction":{"title":"Connect Paths Lines"},"GConvertToPathAction":{"title":"Convert to Path","tooltip-title":"Convert to path","tooltip-description":"Convert the selected shape into a path."},"GConvertToRawPathAction":{"title":"Convert to Raw Path"},"GCreateNestedCompoundAction":{"title":"Create Nested Compound"},"GCreateSymbolAction":{"title":"Create Symbol","createsymbol.enternewname":"Enter new symbol name:","createsymbol.defaultname":"Symbol","common.nosymbolsdefined":"No symbols defined.","common.nosymbolsdefined-info":"Symbols let you reuse content in your design. Create a Symbol with the “+” icon from your selected element(s).","tooltip-title":"Create Symbol","tooltip-description":"Turn the element into a new Symbol."},"GCropAction":{"title":"Confirm Cropping"},"GDetachSymbolAction":{"title":"Detach Symbol Instance","text.number-detached":"Detach symbol %number"},"GResetInstanceAction":{"title":"Reset Instance"},"GCutCopyAction":{"title.cut":"Cut","title.copy":"Copy","text.cut-selection":"Cut Selection","text.security-issues":"<p>Due security permissions we can not access your system clipboard.<br/> Please use the following shortcut instead to %cutcopy:</p><p style=\'text-align: center;font-size:16px;margin-top: 20px\'>%shortcut</p>"},"GDeleteAction":{"title":"Delete"},"GDeselectAllAction":{"title":"Deselect All"},"GDistributeAction":{"title.horizontal":"Distribute Horizontally","title.vertical":"Distribute Vertically","text.horizontal-tooltip-title":"Distribute Horizontally ","text.horizontal-tooltip-description":"Distribute selected objects horizontally so that the distance between them is equal.","text.vertical-tooltip-title":"Distribute Vertically","text.vertical-tooltip-description":"Distribute selected objects vertically so that the distance between them is equal."},"GDuplicateAction":{"title":"Duplicate"},"GEditElementActon":{"title":"Edit Selection"},"GExportAction":{"title":"Advanced Export...","title.advanced-options":"Advanced Options...","text.save-before-export":"Do you want to save this file before exporting?","tooltip-title":"Export","tooltip-description":"Export your document or selection.","text.try-this-feature-pro-tooltip-title":"Advanced Export","text.try-this-feature-pro-tooltip-description":"Export your document or selection with advanced options.","text.try-export-pdf-advanced-setting-tooltip-title":"Advanced PDF Export","text.try-export-pdf-advanced-setting-tooltip-description":"Export your document or selection to a PDF with advanced options."},"GFitAllAction":{"title":"Fit All","tooltip-title":"Fit All","tooltip-description":"Click to fit all objects in the viewport to the screen."},"GFitCurrentLayerAction":{"title":"Fit Layer"},"GFitSelectionAction":{"title":"Fit Selection"},"GGroupAction":{"title":"Group Selection","tooltip-title":"Group items","tooltip-description":"Group selected elements."},"GInvertSelectionAction":{"title":"Invert Selection"},"GJoinPathsAction":{"title":"Join Paths"},"GMergeMainAction":{"title":"Create Compound"},"GMergeSubAction":{"title.union":"Union","title.difference":"Difference","title.intersect":"Intersect","title.subtract":"Subtract","tooltip.union.title":"Union","tooltip.union.description":"Merge the area of two elements.","tooltip.difference.title":"Difference","tooltip.difference.description":"Create a shape with the parts of the selected elements that don\'t overlap.","tooltip.intersect.title":"Intersect","tooltip.intersect.description":"Create a shape with the overlapping are of the selected elements.","tooltip.substract.title":"Subtract","tooltip.substract.description":"Subtract the are of the lower object.","transaction.merge":"Merge","transaction.combine":"Combine"},"GNewAction":{"title":"New Design..."},"GNewWindowAction":{"title":"New View"},"GNewClipboardAction":{"title":"New from Clipboard"},"GOffsetAction":{"title":"Expand/Shrink","text.dialog-prompt-message":"Enter a positive value for offset or negative for inset:","text.invalid-value":"Entered invalid number for offset value."},"GOriginalViewAction":{"title":"Original-View"},"GOutlineAction":{"title":"Convert to Outline","text.dialog-prompt-message":"Enter a positive value for the outline:","text.invalid-value":"Entered invalid number for outline value."},"GVectorizeBorderAction":{"title":"Vectorize Border","tooltip-title":"Vectorize Border","tooltip-description":"Convert a border into a shape."},"GVectorizeImageAction":{"title":"Vectorize Image"},"GConvertToImageAction":{"title":"Flatten"},"GAttachToPathAction":{"title":"Attach Text to Path"},"GDetachFromPathAction":{"title":"Detach Text from Path"},"GOutlineViewAction":{"title":"Outline View"},"GFastViewAction":{"title":"Fast View"},"GPaste":{"action.paste":"Paste","action.paste-image":"Paste Image"},"GPasteAction":{"title":"Paste","text.security-issues":"<p>Due security permissions we can not access your system clipboard.<br/>Please use the following shortcut instead to paste:</p><p style=\'text-align: center;font-size:16px;margin-top: 20px\'>%shortcut</p>"},"GPasteAndReplaceAction":{"title":"Paste and Replace"},"GEyeDropperAction":{"title.fill":"Choose a fill color","title.border":"Choose a border color"},"GEnterLayerGroupAction":{"title":"Enter layer group","title.reverse":"Leave layer group"},"GRenameLayerAction":{"title":"Rename a layer"},"GCycleThroughLayersAction":{"title.next":"Select next layer","title.previous":"Select previous layer","title":""},"GLockLayerAction":{"title":"Lock a layer"},"GToggleLayerVisibilityAction":{"title":"Hide a layer"},"GTogglePaintLayersVisibilityAction":{"title.fill":"Toggle fills","title.border":"Toggle borders"},"GChangeOpacityAction":{"title":"Change opacity","full-title":"Set opacity to %value"},"GCloseActiveWindowAction":{"title":"Close window"},"GChangeAnchorPointsJointTypeMainAction":{"title":"Change anchor point joint type"},"GChangeAnchorPointsJointTypeSubAction":{"title.straight":"Change anchor point joint type to Straight","title.mirrored":"Change anchor point joint type to Mirrored","title.disconnected":"Change anchor point joint type to Disconnected","title.connector":"Change anchor point joint type to Connector","title.asymmetric":"Change anchor point joint type to Asymmetric"},"GToggleMultiPageModeAction":{"title":"Toggle multipage mode"},"GChangeActivePageAction":{"title.next":"Select next page","title.previous":"Select previous page"},"GChangeActiveWindowAction":{"title.next":"Select next tab","title.previous":"Select previous tab"},"GSwapPaintLayersAction":{"title":"Swap fill and border"},"GCreateNewLayerAction":{"title":"Create new layer"},"GShowShortcutsAction":{"title":"Show Keyboard Shortcuts"},"GPasteInPlaceAction":{"title":"Paste In Place"},"GPasteInsideAction":{"title":"Paste Inside Selection"},"GPasteHereAction":{"title":"Paste Here"},"GPasteStyleAction":{"title":"Paste Style"},"GPrintAction":{"title":"Print...","printing-disabled":"Printing is disabled due to technical problems. Please export a PDF file and print it in your favorite PDF reader.","printing-warning":"This device doesn\'t support printing at high quality. If you want to have better quality, please export a PDF document instead and print in your application of choice."},"GRedoAction":{"title":"Redo","redo-action":"Redo %action","tooltip-title":"Redo","tooltip-description":"Redo last undone operation."},"GReverseOrderAction":{"title":"Reverse Order"},"GSaveAction":{"title":"Save","title-download":"Download","tooltip-title":"Save your document","tooltip-description":"Save your progress on the current file.","has-new-version-when-save-message":"There is a newer version of this file in the cloud. Should it still be saved or do you want to reload? Please note: Reloading may lose progress.","has-new-version-when-save-reload":"Reload","has-new-version-when-save-save":"Save"},"GSaveAllAction":{"title":"Save All"},"GSaveAsAction":{"title":"Save as...","text.save-common":"%title (.%fileExtension)","text.save-pdf":"%title (.%fileExtension) at %dpiValue%dpiString","text.dpi-value":"%dpiValue %dpiString","text.dpi":"dpi","text.try-this-feature-pro-tooltip-title":"Quickly export a PDF document at 300dpi."},"GOpenAction":{"title":"Open Local File..."},"GQuitAction":{"title":"Quit"},"GSharePoint":{"error.title-found-special-chars":"You have entered an invalid file/folder name: %fileName%. Some symbols that are not allowed: %symbols%. Also there are some additional restrictions. Please try again.","error.unknown":"Unknown Error"},"GOneDriveBusiness":{"error.no-file-found":"Error occured. No file found","error.processing-api":"Error occured while processing request to One Drive Business API. Please try again later or contact support from Help > Contact us.","error.not-enough-parameters":"Error. Some parameters are not specified","error.title-found-special-chars":"You have entered an invalid file/folder name: %fileName%. Some symbols that are not allowed: %symbols%. Also there are some additional restrictions. Please try again."},"GImportFontsAction":{"title":"Add Fonts...","text.try-this-feature-pro-tooltip-title":"Add Fonts","text.try-this-feature-pro-tooltip-description":"Add your custom fonts to Corel Vector. Find them in the “Imported” tab in the Font selector."},"GClearFontsAction":{"title":"Clear imported fonts..."},"GSelectAllAction":{"title":"Select All"},"GSettingsAction":{"title":"Settings..."},"GShowGridAction":{"title":"Show Grid"},"GShowGuideLinesAction":{"title":"Show Guide Lines"},"GShowSymbolLabelsAction":{"title":"Show Symbol Labels"},"GShowRulersAction":{"title":"Show Rulers"},"GShowSlicesAction":{"title":"Show Slices"},"GShowEffectsAction":{"title":"Show Effects"},"GShowSelectionHandlesAction":{"title":"Show Selection Handles"},"GSimplifyAction":{"title":"Simplify Path","text.tolerance":"&nbsp;&nbsp;&nbsp;% Tolerance","text.simplification":"Path simplification","text.invalid-value":"Entered invalid number for pixel tolerance."},"GSnapUnitAction":{"title.full":"Snap to Full Units","title.half":"Snap to Half Units"},"GSplitAction":{"title":"Ungroup Selection","tooltip-title":"Ungroup items","tooltip-description":"Ungroup selected group of elements."},"GSplitLineAction":{"title":"Break Curve"},"GSplitPathAction":{"title":"Split Path"},"GToggleSnapAction":{"title":"Use Snapping","tooltip-title":"Snap","tootlip-title-action":"Use Snapping","tooltip-description":"Click to enable snapping."},"GToggleSnapZonesAction":{"title":"Use Snap Zones","tooltip-title":"Snap zones","tooltip-description":"Click to enable use of snap zones."},"GTransformAction":{"title.rotate-45-left":"Rotate 45° Left","title.rotate-90-left":"Rotate 90° Left","title.rotate-180-left":"Rotate 180° Left","title.rotate-45-right":"Rotate 45° Right","title.rotate-90-right":"Rotate 90° Right","title.rotate-180-right":"Rotate 180° Right","title.flip-vertical":"Flip Vertical","title.flip-horizontal":"Flip Horizontal","flip-horizontal-tooltip-title":"Flip Horizontal","flip-horizontal-tooltip-description":"Flip an object horizontally.","flip-vertical-tooltip-title":"Flip Vertical","flip-vertical-tooltip-description":"Flip an object vertically.","rotate-90-left-tooltip-title":"Rotate left","rotate-90-left-tooltip-description":"Rotate 90° to the left.","rotate-90-right-tooltip-title":"Rotate right","rotate-90-right-tooltip-description":"Rotate an object 90° to the right."},"GUndoAction":{"title":"Undo","undo-action":"Undo %action","tooltip-title":"Undo","tooltip-description":"Revert last operation. Click multiple times to go even further in edit history."},"GZoomInAction":{"title":"Zoom in","tooltip-title":"Zoom in","tooltip-description":"Click to zoom in about a point."},"GZoomOutAction":{"title":"Zoom out","tooltip-title":"Zoom out","tooltip-description":"Click to zoom out about a point."},"GSelectByFontTypeAction":{"title":"Font Type"},"GSelectByBlendModeAction":{"title":"Blend Mode"},"GSelectByBorderWidthAction":{"title":"Border Width"},"GSelectByPaintLayerAction":{"title.fill":"Fill","title.border":"Border","title.fill_border":"Fill & Border"},"GSelectByShapeAction":{"title":"Shape"},"GSelectByTransparencyAction":{"title":"Transparency"},"GSelectByEffectAction":{"title":"Effect"},"GToggleSidebarAction":{"title":"Show %s Panel"},"GPlaceImportAction":{"title":"Place Image...","tooltip-title":"Place image","tooltip-description":"Import an image from your computer."},"GLinkImageAction":{"title":"Link Image...","tooltip-title":"Link image","tooltip-description":"Import an image with a link to the original on your computer."},"GPlayAction":{"title":"Play/Present...","text.exit-full-screen":"Press %key to exit full screen","text.esc":"esc"},"GToggleFullscreenAction":{"title":"Toggle Fullscreen...","fullscreen-banner":"Press Alt + Enter to exit fullscreen mode"},"GNewFromTemplateAction":{"title":"New Design from Template..."},"GGravitCloudAction":{"title.new":"New Cloud File","title.open":"Open from Cloud...","title.save":"Save","title.save-as":"Save to Cloud as..."},"GVersionsHistoryAction":{"title":"Show Version History","unsaved-modifications":"Please save your design before showing the version history to avoid losing progress","text.try-this-feature-pro-tooltip-title":"Show Version History","text.try-this-feature-pro-tooltip-description":"Show saved versions of the current design and access up to 20 past versions."},"GOpenLinkAction":{"title.blog":"Blog","title.changelog":"What\'s New","title.discussion":"Forum","title.tutorials":"Tutorials","title.contact-us":"Contact Us","title.feedback":"Give Feedback","title.user-guide":"User Guide","title.eula":"End User License Agreement","title.request-new-feature":"Request New Feature","text.join-community":"Join the Community","title.open-a-ticket":"Open a Ticket"},"GOpenRecentAction":{"title":"No Recent Files"},"GMaskWithShapeAction":{"title":"Mask with Shape","text.mask":"Mask"},"GPurchaseProAction":{"title":"UPGRADE NOW"},"GEnhancedTooltipsAction":{"title":"Display Enhanced Tooltips"},"GSymbolsSidebar":{"text.symbols":"Symbols","action.delete-symbol":"Delete Symbol","action.create-symbol":"Create New Symbol","title":"Symbols","text.delete-symbol-tooltip-title":"Delete Symbol","text.delete-symbol-tooltip-description":"Delete the selected symbol.","text.create-symbol-tooltip-title":"Create New Symbol","text.create-symbol-tooltip-description":"Turn the selected element into a new Symbol."},"GOutlineSidebar":{"title":"Layers","text.pages":"Pages","action.toggle-page-mode":"Toggle Single / Multipage Mode","action.delete-active-page":"Delete Active Page","action.create-new-page":"Create New Page","text.layers":"Layers","text.layer":"Layer","action.delete-layer-item":"Delete Layer or Item","action.new-layer":"New Layer","action.insert-page":"Insert Page","action.delete-page":"Delete Page","action.move-page":"Move Page","action.insert-layer":"Insert Layer","action.move-layer":"Move Layer/Item","text.multipage-alert":"One of your pages is set to Infinite Canvas. Please change to a fixed size to be able to enter Multipage mode.","text.confirm-delete-masterpage":"This page is currently used as a Master page. Do you want to delete?","action.change-active-page":"Change active page","text.multipage-tooltip-title":"Multipage mode","text.multipage-tooltip-description":"Show all pages of the document in a grid side by side.","text.delete-page-tooltip-title":"Delete page","text.delete-page-tooltip-description":"Delete the selected page.","text.create-new-page-tooltip-title":"Create new page","text.create-new-page-tooltip-description":"Create a new page with the properties of the currently selected one.","text.delete-layer-tooltip-title":"Delete layer","text.delete-layer-tooltip-description":"Delete selected object or layer.","text.new-layer-tooltip-title":"Create new layer","text.new-layer-tooltip-description":"Create a new layer group."},"GInspectorSidebar":{"title":"Inspector"},"GCategory":{"category.account":"Account","category.file":"File","category.file.save-as":"File/Save as","category.edit":"Edit","category.edit.paste":"Edit/Paste","category.edit.select-same":"Edit/Select Same","category.modify":"Modify","category.modify.combine":"Modify/Create Compound Shape","category.modify.arrange":"Modify/Arrange","category.modify.align":"Modify/Align","category.modify.transform":"Modify/Transform","category.modify.path":"Modify/Path","category.modify.symbol":"Modify/Symbol","category.view":"View","category.view.magnification":"View/Magnification","category.view.canvas":"View/Canvas","category.view.snap":"View/Snap to","category.help":"Help","category.file.gravit-cloud":"File/Corel Vector","category.help.language":"Help/Language","category.help.switchwebcdr":"Help/CDGS server","category.help.support":"Help/Support","category.help.learn":"Help/Learn","category.file.import":"File/Import","category.file.import.image":"File/Import/Place Image...","category.file.export":"File/Export","category.file.export.pdf":"File/Export/PDF Document (.pdf)","category.file.open-recent":"File/Open Recent","category.file.share":"File/Share","category.view.mode":"View/View Mode","category.help.beta_feedback":"Help/Beta Feedback"},"GDocument":{"text.cloud-file-modified":"\'%title\' has been modified, do you want to replace it?","text.default-document-name":"Untitled","file-type.cdrapp":"CorelDRAW Design","file-type.gvdesign":"Corel Vector Design","file-type.cdr":"CorelDRAW Document","file-type.des":"Corel DESIGNER Document","file-type.pdf":"PDF Document","file-type.ai":"Adobe Illustrator Artwork Document","file-type.png":"PNG Image","file-type.jpeg":"JPEG Image","file-type.svg":"Scalable Vector Graphics","file-type.svgz":"Compressed SVG","file-type.eps":"Encapsulated PostScript","file-type.sketch":"Sketch File","text.import-from-pdf":"Import Page(s) from PDF","text.import-from-ai":"Import Adobe Illustrator Artwork","text.ai-not-pdf-compatible":"This Adobe Illustrator file isn’t compatible with Corel Vector, please follow the instructions in the file.","text.import-from-eps":"Import EPS","title.save-gvdesign":"Save to Local File as...","title.download-gvdesign":"Download File","title.save-cdrapp":"Save to file...","title.download-cdrapp":"Download File...","text.sync-to-cloud-error":"Could not save to cloud","text.sync-from-cloud-error":"Could not load from cloud","text.image-too-big":"You are attempting to upload a huge image, that may impact the performance of Corel Vector.<br/>Please try to reduce the image size before importing (max. 10MB, 64 megapixels).","text.image-in-design-too-big":"The design contains image which is too big for the current working environment. It may be displayed incorrectly or impact the performance of Corel Vector.","text.error-reading-file":"Can’t open file. Please make sure that the file exists, you have proper read access to it, it is not in directory synced with OneDrive, and you have an active network connection.","text.unsupported-file-extension":"This file format isn’t supported by Corel Vector.","text.suggestion-open-image":"This file can’t be open directly. Please use “File > Import > Place Image...”","text.save-your-progress":"Save your progress to proceed","text.reload-warning":"We are currently doing some important maintenance work. Please save your design in the next five minutes to avoid loss of progress!","text.unsupported-sketch-version-50+":"This Sketch file was created in version 50+, which isn’t supported by Corel Vector yet.","text.default-export-author":"Corel Vector","text.default-export-producer":"Corel Vector PDF Exporter","text.opening-your-image":"Opening your image...","text.keep-fonts-eps":"Keep Font Information","text.account-deactivated":"Hi %name, we see that you haven’t activated your account yet. This is required in order to use %app. Please <a>click here</a> to get another activation email. In this email, follow the link to activate your account.","text.cannot-save":"Cannot save contents. Remove some layers or undo few steps and try again. And report us this bug!","title.save-cdr":"Save to CorelDRAW file...","title.save-des":"Save to Corel DESIGNER file...","title.download-cdr":"Download CorelDRAW File...","title.download-des":"Download Corel DESIGNER File...","text.saveing-error":"There was a problem saving your file. Please download it from File > Download to prevent losing progress. If the problem persists, please contact support via Help > Support > Contact us","text.save-no-space":"There was no enough space on your disk. Please free some space and try again"},"GEyeDropper":{"text.tooltip":"Pick a color from anywhere on the canvas","text.preview":"Move cursor into canvas."},"GFontsButton":{"text.web-fonts":"Web Fonts","text.system-fonts":"System Fonts","text.imported-fonts":"Imported Fonts"},"GLayerPanel":{"action.rename-layer":"Rename Layer/Item","action.toggle-outline":"Toggle Outline","action.toggle-layer-outline":"Toggle Layer Outline","action.toggle-layer-visibility":"Toggle Layer Visibility","action.change-layer-color":"Change Layer Color","action.reset-instance":"Reset instance"},"GPagePanel":{"action.rename-page":"Rename Page"},"GDesignerStyleEditor":{"text.style-attribution":"Shared Style Attribution","text.new-style":"New Style","text.style-editor":"Style Editor","text.style-creator":"Style Creator","text.style":"Style","text.fill":"Fill","text.border":"Border","text.effects":"Effects","text.text":"Text","action.create":"Create","text.style-organizer":"Style Organizer","action.finish":"Finish","text.no-style":"No Shared Style","action.create-new-style":"Create New Shared Style","action.organize-styles":"Organize Shared Styles"},"GCommonNames":{"text.file-not-supported":"This file format is not supported!","text.unknown-user":"Unknown","text.anonymous-user":"Anonymous","text.native-edit-menu":"Edit","text.replace":"Replace","text.plkt-no-size-changes":"This property can’t be changed","text.infinite-canvas-no-size-changes":"%name - this property can’t be changed with an infinite canvas","text.max-number-pages-cdr":"CorelDRAW doesn’t support more than 999 pages, please remove some.","text.original-drawing-cdr":"CorelDRAW original drawing","text.unsupported-fonts-cdr":"This design may contain unsupported fonts and the option “Save text layers as paths” from the Settings will be applied.","text.unsupported-infinite-canvas":"Pages with an infinite canvas are not supported. The page size will be trimmed to the existing elements.","text.ok":"Ok","text.open-cdr-large-file":"You are trying to open a large CorelDRAW design. It may take a while to load.","text.failed-open-cdr-large-file":"Your CorelDRAW design cannot be processed at this point, please try again later.","text.failed-open-cdr-max-dim":"The dimensions of the pages contained in this CorelDRAW design are too big. Please decrease their size or the design’s dpi and try again.","text.file-too-large-cannot-be-processed":"CorelDRAW designs bigger than 450 MB cannot be processed. Please remove objects and try again.","text.file-no-images-cannot-be-processed":"Could not download file because some images are missing.<br>Please retry and ensure that you have a proper Internet connection.","text.failed-open-cdr-facing-pages":"Facing pages are currently not supported. Please switch off this page layout setting in CorelDRAW and save the design again to show it properly.","text.download-large-cdr-file":"You are trying to download a large CorelDRAW design. This may take a while.","text.failed-download-large-cdr-file":"Your CorelDRAW design cannot be downloaded at this point. Please try again later or save or download to the CDRAPP format to keep your progress.","text.rgb":"RGB","text.rgb.r":"R","text.rgb.g":"G","text.rgb.b":"B","text.cmyk":"CMYK","text.cmyk.c":"C","text.cmyk.m":"M","text.cmyk.y":"Y","text.cmyk.k":"K","text.version":"Version","text.internal-version":"Internal version","text.build":"Build","text.commit":"Commit","text.save-before-logging-out":"Please save your designs before logging out to avoid losing progress.","text.dpi":"DPI","property-h":"H","property-w":"W","text.chrome-untitled":"Untitled","text.untitled-image":"Untitled image","text.maintenance-title":"We are currently updating Corel Vector to a new version.","text.maintenance-info":"It will be available again in a few minutes.","text.cancel":"Cancel","text.save":"Save","text.cancel-loading":"Cancel","text.loading":"Loading","text.saving":"Saving","text.loading-file":"Loading %name","text.saving-file":"Saving %name, please wait to avoid losing any progress.","text.inside":"Inside","text.none":"None","action.toggle-lock":"Toggle Locker","action.toggle-visibility":"Toggle Visibility","evenodd.non-zero":"Non-Zero (Fill Holes)","evenodd.even-odd":"Even-Odd (Keep Holes)","action.change-fill-rule":"Change fill rule","action.change-blending-mode":"Change blending mode","text.opacity":"Opacity","text.blending":"Blending","text.position":"Position","text.size":"Size","text.color":"Color","text.angle":"Angle","text.export":"Export","text.format":"Format","text.default":"Default","text.web":"Web","text.colors":"Colors","arrow-paste.alert":"Select a shape, copy it to clipboard then paste it as arrow here.","text.height":"Height","text.width":"Width","text.unit":"Unit","text.advanced":"Advanced","text.global":"Global","text.document":"Document","text.corner":"Corner","text.autoscale-corners":"Autoscale Corners","text.radius":"Radius","text.angles":"Angles","text.advanced-settings":"Advanced Settings","action.change-corners":"Change corners","text.grid":"Grid","text.background-color":"Background","text.left":"Left","text.top":"Top","text.outside":"Outside","action.rotate":"Rotate","action.move":"Move","action.apply":"Apply","text.document-modified":"The document \\"%title\\" has been modified, do you want to save it?","text.guide-lines":"Guide Lines","text.full-pixels":"Full Pixels","text.anchor-points":"Anchor Points","text.shapes":"Shapes","text.pages":"Pages","tool.pointer":"Pointer","tool.subselect":"Subselect","tool.lasso":"Lasso","tool.layer":"Layer","tool.slice":"Slice","tool.pen":"Pen","tool.bezigon":"Bezigon","tool.freehand":"Freehand","tool.magichand":"Magic Hand","tool.knife":"Knife","tool.line":"Line","tool.rectangle":"Rectangle","tool.ellipse":"Ellipse","tool.polygon":"Polygon","tool.triangle":"Triangle","tool.star":"Star","tool.text":"Text","tool.pan":"Pan","tool.zoom":"Zoom","text.bottom":"Bottom","text.right":"Right","text.page":"Page","text.active":"Active","text.loading-failed":"Loading has failed","text.syncing-failed":"Syncing has failed","text.unable-to-save":"Unable to save the document. Do you have the right permissions?","text.try-again":"Try again","text.merge":"Merge","text.finish":"Finish","action.sign-out":"Log out","text.snap-to":"Snap to","text.snap-to-action":"Snap to %action","texture.position.auto":"Auto","texture.position.top":"Top","texture.position.left":"Left","texture.position.center":"Center","texture.position.right":"Right","texture.position.bottom":"Bottom","texture.repeat.repeat":"Both","texture.repeat.repeat-x":"Horizontal","texture.repeat.repeat-y":"Vertical","texture.repeat.no-repeat":"None","texture.size.auto":"Auto","texture.size.contain":"Contain","texture.size.cover":"Cover","texture.size.percent":"Percent","texture.size.length":"Length","texture.scale.fill":"Fill","texture.scale.fit":"Fit","texture.scale.stretch":"Stretch","texture.scale.tile":"Tile","noise.type.original":"Original","noise.type.black":"Black","noise.type.white":"White","noise.type.color":"Color","text.synchronizing-file":"Synchronizing %name","text.synchronizing":"Synchronizing","text.downloading":"Downloading","text.downloading-file":"Downloading %name","text.synch-failed":"Sync failed! Retrying","text.failed-to-synch":"Failed to sync!","template.presentation":"Presentation","template.blog-graphic":"Blog Graphic","template.facebook-post":"Facebook Post","template.social-media":"Social Media","template.poster":"Poster","template.posters-and-banners":"Posters & Banners","template.books":"Books","template.marketing":"Marketing","template.calendars-and-planners":"Calendars & Planners","template.cards-and-invitations":"Cards & Invitations","template.subcategory.cover-photos":"Cover Photos","template.subcategory.posts":"Posts","template.subcategory.stories":"Stories","template.subcategory.profile-pictures-thumbnails":"Profile Pictures & Thumbnails","template.subcategory.book-layouts":"Book Layouts","template.subcategory.scrapbooks":"Scrapbooks","template.subcategory.business-cards":"Business Cards","template.subcategory.email-templates-headers":"Email Templates & Headers","template.subcategory.letterhead":"Letterhead","template.subcategory.presentation":"Presentation","template.subcategory.proposals-reports":"Proposals & Reports","template.subcategory.resumes":"Resumes","template.subcategory.calendars":"Calendars","template.subcategory.planners":"Planners","template.subcategory.greeting-cards":"Greeting Cards","template.subcategory.invitations":"Invitations","template.subcategory.postcards":"Postcards","template.subcategory.recipe-cards":"Recipe Cards","template.subcategory.brochures-flyers":"Brochures & Flyers","template.subcategory.catalogs-informational-books":"Catalogs & Informational Books","template.subcategory.certificates":"Certificates","template.subcategory.infographics":"Infographics & Mind maps","template.subcategory.labels-stickers":"Labels & Stickers","template.subcategory-logos":"Logos","template.subcategory.menus":"Menus","template.subcategory.newsletters":"Newsletters","template.subcategory.posters-signs-Banners":"Posters, Signs & Banners","template.a4":"A4","template.business":"Business","template.card":"Card","template.greeting-card":"Greeting Cards","template.advertisement":"Advertisements","template.menu-and-brochure":"Menus & Brochures","element.chart":"Charts","element.emoji":"Emojis","element.shape":"Shapes","element.icons":"Icons","element.line":"Lines","element.sticker":"Stickers","element.illustration":"Illustrations","element.frame":"Frames","element.icon":"Icons","element.image":"Unsplash Photos","element.ui":"Prototyping","element.ui.ios":"iOS","element.ui.material":"Material","element.ui.windows":"Windows","element.icon.ios":"iOS","element.icon.material":"Material","element.icon.windows":"Windows","element.all":"All","element.search":"Search","text.save-to-file":"Save to File","text.save-to-cloud":"Save to Cloud","text.back-to-top":"Back to top","element.illustration.realistic":"Realistic","element.illustration.line":"Line","element.illustration.color":"Color","element.illustration.solid":"Solid","element.illustration.x-ray":"X-Ray","element.icon.animals":"Animals","element.icon.arrows":"Arrows","element.icon.astrology":"Astrology","element.icon.city":"City","element.icon.fashion":"Fashion","element.icon.finance-and-business":"Finance And Business","element.icon.food-and-objects":"Food And Objects","element.icon.gaming-and-cinema":"Gaming And Cinema","element.icon.industry-and-military":"Industry And Military","element.icon.logos":"Logos","element.icon.music":"Music","element.icon.office-and-computer":"Office And Computer","element.icon.people-and-gestures":"People And Gestures","element.icon.prototyping-material":"Prototyping Material","element.icon.prototyping-windows":"Prototyping Windows","element.icon.prototyping-ios":"Prototyping iOs","element.icon.sports-and-healthcare":"Sports And Healthcare","element.icon.time-and-weather":"Time And Weather","element.icon.travel-and-holidays":"Travel And Holidays","element.icon.very-basic":"Very Basic","element.emoji.klex":"Klex","element.emoji.classic":"Classic","element.emoji.cube":"Cube","element.emoji.cone":"Cone","element.image.texture":"Textures","element.image.nature":"Nature","element.image.architecture":"Architecture","element.image.business":"Business","element.image.animals":"Animals","element.image.food":"Food","text.cloud-login":"Cloud login","text.save-to-cloud-failed":"An error has occurred while saving to cloud. Do you want to save your file on the computer to avoid losing work?","text.fail-import-swatch":"This swatches file is invalid and could not be imported","text.import-swatches":"Import Swatches","text.export-swatches":"Export Swatches","text.downloading-fonts":"Downloading fonts","text.fonts-downloaded":"Fonts downloaded! Restart the app","text.error-downloading":"Error downloading fonts! Try again","action.settings":"Account settings","text.image":"Image","electron.container.unsaved-documents":"Are you sure you want to quit as there are unsaved documents?","electron.container.confirm":"Confirm","electron.container.synchronizing-documents":"Please wait until the file has finished saving to avoid losing progress.","text.snap-to-grid":"Grid","text.snap-to-guide-lines":"Guide Lines","text.snap-to-full-pixels":"Full Pixels","text.snap-to-anchor-points":"Anchor Points","text.snap-to-shapes":"Shapes","text.snap-to-pages":"Pages","text.start-trial-now-button":"Start the %days-day trial now","text.license-trial-day-left":"Trial: %days day left","text.license-trial-days-left":"Trial: %days days left","text.license-trial-expires-today":"Trial expires today","text.license-trial-expired":"Trial expired","text.license-pro-expired":"Your subscription has expired","text.license-offline-title":"The offline mode of Corel Vector is a Corel Vector feature","text.license-offline-subtitle":"Please save your designs in order to avoid losing progress.","text.license-offline-expired-subtitle":"Please establish an internet connection to keep using Corel Vector.","text.license-offline-footer":"The app %close in %time min.","text.license-offline-footer-highlight":"will close automatically","text.pdf-export-error":"There was a problem exporting your file. Please contact support from Help > Contact us and include the original .gvdesign file.","text.email-sent-title":"Email sent.","text.email-sent-info":"Please be sure to also check the spam/junk folder of your email client.","text.something-wrong":"Something is wrong.","text.something-wrong.try-again":"Something went wrong, please try again.","text.dont-save":"Don\'t save","text.buy-now":"UPGRADE NOW","text.error-emtpy-infinite-canvas":"Saving and exporting designs with an empty infinite canvas is not allowed.","text.error-nothing-to-save":"Nothing to save.","text.error-saving-file":"Error occurred, file could not be saved. Please contact support.","text.running-out-of-cloud-space":"You are running out of Cloud space. Please delete some older files to keep working.","text.countdown-timer":"%minutesm %secondss","text.please-wait-avoid-losing-progress":"Please wait until the file has finished saving to avoid losing progress.","text.user-account-deactivated":"Hey %name,  we couldn\'t confirm your email address in the last 3 days.<br>Your account is now deactivated!","text.activating-your-account":"Thanks for activating your account.","text.activating-your-account-subtitle":"Please enjoy designing in Corel Vector.","text.checking-connectivity":"Checking connectivity...","element.child.name.realistic":"Realistic","element.child.name.linear":"Linear","element.child.name.multi-colored":"Multi-Colored","element.child.name.solid":"Solid","element.child.name.x-ray":"X-Ray","element.child.name.alphabet":"Alphabet","element.child.name.animals":"Animals","element.child.name.arrows":"Arrows","element.child.name.architecture":"Architecture","element.child.name.astrology":"Astrology","element.child.name.baby":"Baby","element.child.name.beauty":"Beauty","element.child.name.business":"Business","element.child.name.cinema":"Cinema","element.child.name.city":"City","element.child.name.clothing":"Clothing","element.child.name.computer-hardware":"Computer Hardware","element.child.name.crime":"Crime","element.child.name.culture":"Culture","element.child.name.diy":"DIY","element.child.name.data":"Data","element.child.name.drinks":"Drinks","element.child.name.ecommerce":"Ecommerce","element.child.name.editing":"Editing","element.child.name.events":"Events","element.child.name.experimental":"Experimental","element.child.name.fashion":"Fashion","element.child.name.files":"Files","element.child.name.films":"Films","element.child.name.finance":"Finance","element.child.name.flags":"Flags","element.child.name.folders":"Folders","element.child.name.food":"Food","element.child.name.free-popular":"Free Popular","element.child.name.gaming":"Gaming","element.child.name.hands":"Hands","element.child.name.health":"Health","element.child.name.healthcare":"Healthcare","element.child.name.holidays":"Holidays","element.child.name.household":"Household","element.child.name.industry":"Industry","element.child.name.logos":"Logos","element.child.name.maps":"Maps","element.child.name.media-controls":"Media Controls","element.child.name.messaging":"Messaging","element.child.name.military":"Military","element.child.name.mobile":"Mobile","element.child.name.music":"Music","element.child.name.nature":"Nature","element.child.name.network":"Network","element.child.name.operating-systems":"Operating Systems","element.child.name.people":"People","element.child.name.photo-and-video":"Photo and Video","element.child.name.plants":"Plants","element.child.name.printing":"Printing","element.child.name.profile":"Profile","element.child.name.programming":"Programming","element.child.name.science":"Science","element.child.name.security":"Security","element.child.name.shopping":"Shopping","element.child.name.social-media":"Social Media","element.child.name.sports":"Sports","element.child.name.spirituality":"Spirituality","element.child.name.textures":"Textures","element.child.name.time-and-date":"Time And Date","element.child.name.transport":"Transport","element.child.name.travel":"Travel","element.child.name.user-interface":"User Interface","element.child.name.wallpapers":"Wallpapers","element.child.name.weather":"Weather","element.child.name.klex":"Klex","element.child.name.classic":"Classic","element.child.name.cube":"Cube","element.child.name.cone":"Cone","element.child.name.current-events":"Current Events","text.try-out-coreldrawpp-pro":"Try out CorelDRAW.app PRO","text.cant-change-cdr-limitations":"This page property can’t be changed in the currently imported design due to certain limitations.","text.filename-is-not-correct":"You have entered an invalid file name: %filename. Please try again.","text.message-explore-cloud-templates":"You haven’t added anything to Corel Vector yet. <br>What about trying out these example files?","text.try-this-feature-pro-tooltip-text":"Upgrade to unlock this feature.","text.learn-more":"Learn more","text.page-toggle-lock-tooltip-title":"Lock page","text.page-toggle-lock-tooltip-description":"Lock all objects on the current page.","text.page-toggle-visibility-tooltip-title":"Toggle visibility","text.page-toggle-visibility-tooltip-description":"Hide all objects on the page.","text.layer-toggle-lock-tooltip-title":"Lock layer","text.layer-toggle-lock-tooltip-description":"Lock layer or element.","text.layer-toggle-visibility-tooltip-title":"Toggle visibility","text.layer-toggle-visibility-tooltip-description":"Hide layer or element.","text.layer-toggle-outline-tooltip-title":"Toggle outline","text.symbol-panel-symbol-tooltip-description":"Click to highlight master on canvas. Drag on canvas to place an instance","text.corner-radius-slider-tooltip-title":"Corner slider","text.corner-radius-slider-tooltip-description":"Click and drag to make the corners of the selected elemente rounded.","text.login-in-to-continue":"Please login to continue.","error.http.forbidden":"Error occurred. You are not allowed to perform this action.","text.library-load-more":"Load more..."},"GCloudTemplates":{"text.welcome":"Welcome","text.templates":"Templates"},"GAlignProperties":{"text.space-x":"Space X","text.space-y":"Space Y"},"GAppearanceProperties":{"title":"Appearance","text.darken-image":"Darken image","text.lighten-image":"Lighten image","text.boost-contrast":"Boost contrast","text.adjust-colors":"Adjust colors","text.invert-colors":"Invert colors","text.masking":"Masking","blending.mask":"Mask","blending.inverse-mask":"Inverse Mask","text.style":"Style","action.sync":"Sync","text.multiple-selection":"Multiple selection","text.no-style":"No Shared Style","text.opacity-slider-tooltip-title":"Opacity slider","text.opacity-slider-tooltip-description":"Click and drag to make to change the opacity of the selected element.","text.blend-tooltip-title":"Blending mode","text.blend-tooltip-description":"Click to choose how this object will blend with underlying objects. Modes that are not compatible with CSS/SVG/PDF are marked with an asterisk.","text.shared-styles-tooltip-title":"Shared styles","text.shared-styles-tooltip-description":"Click to chose a shared style or create a new one."},"GBoolOpProperties":{"action.modify-merge-mode":"Modify merge mode","text.boolean":"Compound","text.union":"Union","text.intersect":"Intersect","text.subtract":"Subtract","text.difference":"Difference"},"GBorderPaintLayerProperties":{"title":"Borders","text.subtract":"Subtract","text.difference":"Difference","option.custom":"Custom","text.ends":"Ends","text.joins":"Joins","text.dash":"Dash","text.gap":"Gap","text.outline":"Outline","text.autoscale-borders":"Autoscale Borders","text.advanced-stroke-settings":"Advanced stroke settings","action.remove-selected-border":"Remove Selected Border","action.remove-border":"Remove Border","action.add-border":"Add Border","action.duplicate-border":"Duplicate Border","action.move-border":"Move Border","action.change-border-properties":"Change Border Properties","text.start-arrow":"Start Arrow","text.end-arrow":"End Arrow","text.autoscale-borders-tooltip":"Only with Transform tool","text.marker-position":"Position","text.border-alignment.disabled":"Please remove Open Path shape from selection to use border alignment","text.advanced-stroke-settings-tooltip-title":"Advanced Border settings","text.advanced-stroke-settings-tooltip-description":"Change Border Caps, Position, Dashes and Arrowheads.","text.remove-border-tooltip-title":"Remove Selected Border","text.remove-border-tooltip-description":"Click to remove the selected border from the element.","text.add-border-tooltip-title":"Add Border","text.add-border-tooltip-description":"Click to add a new border to the selected element.","text.border-width-tooltip-title":"Border width","text.border-width-tooltip-description":"The width of the border in current document units.","text.copy-border":"The Border was copied to your clipboard.","text.miter-limit":"Miter limit","text.miter-limit-tooltip-description":"Value at which the sharp corners will be converted to beveled."},"GContextMenu":{"text.select-same":"Select Same","text.arrange":"Arrange","text.align":"Align","text.transform":"Transform","text.select":"Select","text.paste":"Paste","text.create-compound":"Create Compound","text.convert-to-path":"Convert to Path","text.create-symbol":"Create Symbol","text.go-to-master":"Go to Master","text.text":"Text","text.crop":"Crop","text.original-size":"Original Size","text.replace-image":"Replace Image...","text.image":"Image","page-panel.text.duplicate":"Duplicate Page","page-panel.text.copy":"Copy Page","page-panel.text.delete":"Delete Page","page-panel.text.export":"Export Page","fill-properties-panel.text.delete-fill":"Delete Fill","fill-properties-panel.text.copy-fill":"Copy Fill","border-properties-panel.text.advanced-settings":"Advanced Border Settings","border-properties-panel.text.delete-border":"Delete Border","border-properties-panel.text.copy-border":"Copy Border","effect-properties-panel.text.apply-to-element":"Apply to Whole Element","effect-properties-panel.text.apply-to-fill":"Apply to Fill Only","effect-properties-panel.text.apply-to-border":"Apply to Border Only","effect-properties-panel.text.copy-effect":"Copy Effect"},"GDimensionProperties":{"action.keep-ratio":"Keep Ratio","text.align":"Align","text.transform":"Transform","text.select":"Select","text.anchors":"Anchors","text.alignTitle":"ALIGN & DISTRIBUTE","text.setting":"Settings","text.sameWidth":"Same width","text.sameHeight":"Same height","text.fullUnit":"Snap to full unit","text.halfUnit":"Snap to half unit","action.anchor-left":"Anchor Left","action.anchor-center":"Anchor Center","action.anchor-right":"Anchor Right","action.anchor-top":"Anchor Top","action.anchor-middle":"Anchor Middle","action.anchor-bottom":"Anchor Bottom","action.change-size":"Change Size","action.change-anchor":"Change Anchor","text.property-x-y-tooltip-title":"Position of the element","text.property-x-y-tooltip-description":"Set X and Y axis coordinates for the position of the selected element.","text.property-w-h-tooltip-title":"Size of the element","text.property-w-h-tooltip-description":"Set width and height for the size of the selected element.","text.keep-ratio-tooltip-title":"Keep Ratio","text.keep-ratio-tooltip-description":"Keep the proportions between width and height.","text.transform-button-tooltip-title":"Transform tool","text.transform-button-tooltip-description":"Transform the selected element.","text.rotate-angle-tooltip-title":"Angle of Rotation","text.rotate-angle-tooltip-description":"Set an angle to rotate the seleted element.","text.anchor-left-tooltip-title":"Anchor to the Left","text.anchor-left-tooltip-description":"Anchor selected element to the left.","text.anchor-center-tooltip-title":"Anchor Center","text.anchor-center-tooltip-description":"Anchor selected element to the center.","text.anchor-right-tooltip-title":"Anchor to the Right","text.anchor-right-tooltip-description":"Anchor selected element to the right.","text.anchor-top-tooltip-title":"Anchor Top","text.anchor-top-tooltip-description":"Anchor selected element to the top.","text.anchor-middle-tooltip-title":"Anchor to the Middle","text.anchor-middle-tooltip-description":"Anchor selected element to the middle.","text.anchor-bottom-tooltip-title":"Anchor to the Bottom","text.anchor-bottom-tooltip-description":"Anchor selected element to the bottom.","text.transform-title":"TRANSFORM","text.transform-advanced":"ADVANCED TRANSFORM","text.transform-apply":"Apply Transformations"},"GEffectProperties":{"text.most-used":"Most Used","title":"Effects","action.add":"Add Effect","action.toggle-collapse":"Toggle Effect Collapse","action.toggle-visibility":"Toggle Effect Visibility","action.remove":"Remove Effect","action.change-layer":"Change Effect Layer","action.move":"Move Effect","action.duplicate":"Duplicate Effect","action.change-properties":"Change Effect Properties","text.applies-to":"Applies to","text.more":"More","text.blur":"Blur","text.bend":"Bend","text.softness":"Softness","text.coverage":"Coverage","text.offset":"Offset","text.length":"Length","text.density":"Density","text.fade":"Fade","text.load-acv":"Load ACV","text.padding":"Padding","text.artistic":"Artistic","text.adjust":"Adjust","text.other":"Other","text.shadow":"Shadow","text.distortion":"Distortion","text.blend":"Blend","text.height":"Height","text.color.gradient.grp.instagram":"Instagram","text.color.gradient.opt.1977":"1977","text.color.gradient.opt.brannan":"Brannan","text.color.gradient.opt.gotham":"Gotham","text.color.gradient.opt.hefe":"Hefe","text.color.gradient.opt.lord-kelvin":"Lord Kelvin","text.color.gradient.opt.nashville":"Nashville","text.color.gradient.opt.x-pro-ii":"X-PRO II","text.add-effect-tooltip-title":"Add Effect","text.add-effect-tooltip-description":"Click to choose an effect to be added to the selected element.","text.copy-effect":"The Effect was copied to your clipboard."},"GEllipseProperties":{"action.change-shape":"Change shape","action.change-angle":"Change angle","text.shape":"Shape","text.ellipse-to-center":"Ellipse set border allignment to center"},"GErrorHandler":{"text.breakfast":"It\'s time for breakfast. Please save your file and restart the app.","text.sorry":"Corel Vector unexpectedly ran into an error. Sorry about that, the error message was sent to us and we will fix it as soon as possible.","text.close":"Close"},"GExportDialog":{"text.warning":"Warning:","text.canvas-bigger-than-200-in":"The canvas is bigger than 200 inches and might not be opened correctly in some PDF viewers.","text.export-to":"Export to","text.do-not-downsample-images":"Don’t downsample bitmap images","text.do-not-downsample-images-info":"Downsampling will reduce image quality but create a smaller PDF document.","text.rasterize-unsupported-objects":"Rasterize unsupported objects by CorelDRAW","text.canvas":"Canvas","text.selection":"Selection","text.assets":"Assets","text.jpeg-quality":"JPEG Quality","text.color-mode":"Color Mode","text.with-effects":"With effects","text.export-as-curves":"Export text as curves","text.export-all":"Export all","text.exporting":"Exporting, please wait","text.medium-quality":"Medium Quality Print","text.high-quality":"High Quality Print","text.selection-warning":"Please select one or more shapes to export them.","text.assets-warning":"To export an asset, select one or more shapes and click on \\"Make exportable\\" on the inspector.","text.preparing-preview":"Preparing preview...","text.decimal-places-precision":"Decimal Places","text.page-background":"Use page color","text.custom-background":"Use custom color","text.no-background":"Transparent","text.preserve-svg-editing-capabilites":"Preserve editing capabilities for SVG files","text.preserve-svg-editing-capabilites-description":"This will ensure that SVGs exported from Corel Vector can be properly re-imported.","text.default-limit":"Due to technical limitations it isn’t possible to export designs larger than 4000 px (respectively 141 cm or 55.55 in) at 300 dpi. Please resize your design or choose less dpi and try again.","text.pdf-limit":"Due to technical limitations, your design can’t be exported – it contains images larger than %limit. Please resize your design and try again.","text.layer-as-id":"Retain attributes and add IDs","text.layer-as-id-info":"All class and type attributes are retained and element names are added as IDs.","text.want-save-before-export":"Do you want to save this file before exporting?"},"GExportProperties":{"text.make-exportable":"Make Exportable","action.create-slice":"Create Slice","action.add":"Add Export","action.create-slices":"Create Slice(s)","action.update-setting":"Update Export Setting","action.remove":"Remove Export","text.suffix":"Suffix","text.multiple":"Multiple","text.format":"Format","text.create-slice-tooltip-title":"Create slice","text.create-slice-tooltip-description":"Click and drag to create a slice to be exported as an asset.","text.add-export-tooltip-title":"Add Export","text.add-export-tooltip-description":"Turn a selected object into an exportable asset."},"GFillPaintLayerProperties":{"title":"Fills","action.advanced-settings":"Advanced Fill Settings","action.remove-selected":"Remove Selected Fill","action.remove":"Remove Fill","action.add":"Add Fill","text.fill-rule":"Fill-Rule","action.modify":"Modify Fill","action.change-properties":"Change Fill Properties","action.duplicate":"Duplicate Fill","action.move":"Move Fill","text.remove-layer-tooltip-title":"Remove selected fill","text.remove-layer-tooltip-description":"Click to remove the selected fill from the element.","text.add-layer-tooltip-title":"Add fill","text.add-layer-tooltip-description":"Click to add a new fill to the selected element.","text.fill-rule-tooltip-title":"Fill rule ","text.fill-rule-tooltip-description":"Winding fill rule define how holes in shapes are shown.","text.copy-fill":"The Fill was copied to your clipboard."},"GImageProperties":{"text.checking-profile":"Checking CMYK Profile","action.replace":"Replace","action.replace-image":"Replace Image","action.original-size":"Orig. Size","action.reset-size":"Reset Image Size","action.no-crop":"No crop","action.reset-cropping":"Reset Image Cropping","text.check-profile":"Check CMYK Profile","text.loading-profile":"Loading CMYK Profile","action.crop":"Crop"},"GMissingFontsDialog":{"text.fonts-missing":"Some fonts in the document are missing","text.fonts-not-found":"The following fonts are used, but cannot be found in Corel Vector","action.keep-fonts":"Keep Fonts","action.replace-fonts":"Replace Fonts","text.turn-disabled-function":"You can also try to turn on disabled functions or do it later in font browser"},"GNewDocumentDialog":{"text.connect":"Connect","text.resources":"Resources","text.set-theme":"Set your Theme","text.set-language":"Set your Language","text.discuss":"Discuss","text.whats-new":"What\'s new","text.blog":"Blog","text.welcome":"Welcome to Corel Vector","action.open-file":"Open File","text.restart-app":"Restart your app to apply changes!","text.changelog":"Changelog","text.start-option":"New Design","text.start-option-description":"Design creation starts here","text.templates-option":"New from Template","text.templates-option-description":"Create a new design based on a template","text.cloud-option":"Open from Corel Vector","text.cloud-option-description":"Open and manage your cloud files","text.local-option":"Open from Computer","text.local-option-description":"Open a locally saved file","action.create-canvas":"Create!","action.leave-empty-infinite":"Leave it empty for infinite canvas","text.templates-login-title":"Cloud Templates","text.templates-login-phrase1":"Get inspiration and quickly start a design over thousands of free","text.templates-login-phrase2":"pro-grade templates, designed and updated by our team.","text.cloud-login-title":"Introducing Corel Vector","text.cloud-login-phrase1":"Quickly create awesome graphics and share them with the world.","text.cloud-login-phrase2":"One account, one workspace and two awesome free tools.","text.cloud-login":"Login","text.cloud-signup":"Sign up","text.old-user-title":"Welcome back to Corel Vector!","text.old-user-p1-p1":"Create a ","text.old-user-p1-p2":"new design","text.old-user-p1-p3":" from zero using pre-made or custom sizes.","text.old-user-p2-p1":"You can quick start a design with a ","text.old-user-p2-p2":"pre-made template","text.old-user-p2-p3":" here.","text.old-user-p3-p1":"Corel Vector has evolved and is now even more powerful, but don\'t worry. All ","text.old-user-p3-p2":"your old files are still here","text.old-user-p3-p3":" in the same account and can be acessed over here with the","text.old-user-p3-p4":" same login and password.","text.chk-got-it":"I got it, don\'t display this message again.","text.btn-read-more":"Read more","text.btn-got-it":"Got it, start designing","text.recent-option":"Open Recent","text.recent-option-description":"Open a recent opened file","text.recent-option-empty":"No Recent Files","text.start-option-check":"Don\'t show anymore at startup","text.about":"About","text.try-out-pro":"Try out Corel Vector","text.start-free-trial":"Start a 15-day free trial of the advanced<br/> PRO features","text.example-files":"Example Files","text.option-not-available-in-view-mode":"This option is not available in Viewer Mode."},"GUnsupportedFeaturesDialog":{"text.title-unsupported":"This design contains features, that are not supported for SVG files. These features are:","text.checked-unsupported":"Don’t show anymore"},"GSymbolProperties":{"title":"Symbol","text.instance":"instance","text.symbol":"symbol","text.instances":"instances","text.symbols":"symbols","text.master":"master","text.instanceof":"instance of","text.chooseinstance":"Instance"},"GPageProperties":{"title":"Page","text.background":"Background","action.change-background":"Change page background","action.change-canvas-opacity":"Change canvas opacity","action.change-size":"Change page size","action.change-bleeding":"Change bleeding","action.change-margins":"Change margins","action.change-margin":"Change margin","action.equal-margin":"Equal Margins","action.assign-master-page":"Assign Master Page","text.bleed":"Bleed","text.margin":"Margin","text.master":"Master","text.size-custom":"Custom Size","text.size-infinite":"Infinite Canvas","text.size-trim":"Trim Canvas","text.clip-content":"Clip content","text.page-size":"Page Size","text.rotate-canvas":"Rotate Canvas","text.rotate-canvas-tooltip-title":"Rotate Canvas","text.rotate-canvas-tooltip-description":"Rotate the canvas to a portrait or landscape.","text.trim-canvas-tooltip-title":"Trim Canvas","text.trim-canvas-tooltip-description":"Trim the page size to fit the current content.","text.clip-content-tooltip-title":"Clip Content","text.clip-content-tooltip-description":"Hide objects that are outside of the current canvas area.","text.bleed-tooltip-title":"Bleed","text.bleed-tooltip-description":"Define a bleed size for printing purposes.","text.margin-tooltip-title":"Margin","text.margin-tooltip-description":"Define margin size. Click the link icon to set each margin individually.","text.master-tooltip-title":"Master page","text.master-tooltip-description":"Choose the page to be used as a master for current page."},"GPathProperties":{"action.modify-path-node-type":"Modify Path Node(s) Type","text.closed":"Closed","text.joint":"Joint","text.straight":"Straight","action.modify-path-properties":"Modify Path Properties","action.modify-point-properties":"Modify Point Properties"},"GPatternChooser":{"text.advanced":"Advanced Options","text.scale":"Scale","text.rgb-color":"RGB Color","text.hsb-color":"HSB Color","text.cmyk-color":"CMYK Color","action.system-color-picker":"System Color Picker","action.change-stops-order":"Change order of stops","action.rotate-gradient-left":"Rotate gradient left","action.rotate-gradient-right":"Rotate gradient right","text.swatches":"Swatches","text.in-use":"In use","text.mixer":"Mixer","text.hex":"Hex","text.automatic":"Automatic","text.intensity":"Intensity","text.type":"Type","action.choose-image":"Choose Image","action.set-transparency-mask":"Set as transparency mask","text.repeat":"Repeat","action.remove-swatch":"Remove Swatch","text.tints":"Tints","text.shades":"Shades","text.tones":"Tones","text.mixes":"Mixes","action.copy-color":"Copy Color","action.paste-color":"Paste Color","action.add-to-document-swatches":"Add to Document Swatches","action.add-to-global-swatches":"Add to Global Swatches","text.equal-swatch-alert":"An equal swatch was already added.","pattern-type.transparent":"Transparent","pattern-type.color":"Color Fill","pattern-type.lineargradient":"Linear Gradient","pattern-type.radialgradient":"Radial Gradient","pattern-type.angulargradient":"Angular Gradient","pattern-type.texture":"Texture Fill","pattern-type.noise":"Noise","pattern-type.backgroundfill":"Background Fill","text.error-on-loading":"Some error ocurred during loading.","text.color-picker-tooltip-title":"Choose a color","text.color-picker-tooltip-description":"Choose a color, gradient or texture for the selected element.","text.eyedropper-tooltip-title":"Pick a color from the canvas","text.eyedropper-tooltip-description":"Hover the eyedropper over the canvas to pick a color for the selected element.","action.add-swatch":"Add swatch"},"GPolygonProperties":{"action.change-radius":"Change radius","action.change-angle":"Change angle","action.change-corner-type":"Change corner type","action.change-corner-radius":"Change corner radius","text.points":"Points","text.plain-edges":"Plain Edges","text.corners":"Corners","action.change-polygon-size":"Change polygon size","action.change-polygon-points":"Change polygon points"},"GRectangleProperties":{"text.uniform-corner-smoothness":"Uniform Corner-Smoothness","text.horizontal-corner-smoothness":"Horizontal Corner-Smoothness","text.vertical-corner-smoothness":"Vertical Corner-Smoothness","text.corner-type":"Corner-Type","text.uniform-corners":"Uniform Corners","action.modify-rectangle-properties":"Modify Rectangle Properties"},"GSceneProperties":{"action.change-grid-settings":"Change grid settings","text.on":"On","text.isometric":"Isometric","text.off":"Off","action.change-canvas-unit":"Change canvas unit","cloud.sync":"Sync Cloud","cloud.sync.info":"Keep your designs always updated and synchronized working online and offline with Corel Vector.","cloud.sync.enable":"Enable Sync","cloud.sync.more":"Learn more","cloud.sync.label":"Cloud Synchronization","text.dpi":"DPI","action.change-canvas-dpi":"Change canvas dpi","text.unit-tooltip-title":"Units","text.unit-tooltip-description":"Define the measurement unit of the document.","text.dpi-tooltip-title":"Dots per Inch","text.grid-tooltip-title":"Grid","text.grid-tooltip-description-off":"Turn off the grid.","text.grid-tooltip-description-on":"Turn on the grid.","text.grid-tooltip-description-isometric":"Turn on the Isometric grid.","text.color-mode":"Color Mode","action.change-color-mode":"Change color mode","text.color-mode-tooltip-title":"Color Mode","text.color-mode-tooltip-description":"Set the default color mode that is used when picking the color of elements.","text.reminder":"Please note that switching the color mode doesn’t alter existing elements on the canvas and only sets it as the default color mode from now on."},"GSettingsDialog":{"setting.disable-scrubbing":"Disable changing values in numeric input fields with dragging.","setting.enable_steps_debug":"Allow steps import/export","setting.highlight-on-hover":"Highlight on hover","setting.highlight-on-hover-description":"Highlight shapes when hovering them with the mouse.","setting.show-coordinates":"Show coordinates tooltip","setting.show-coordinates-description":"Show current coordinates tooltip when creating or moving shapes.","setting.show-size":"Show size tooltip","setting.show-size-description":"Show current size tooltip when creating or resizing shapes.","setting.show-angle":"Show angle tooltip","setting.show-angle-description":"Show current rotation angle tooltip when rotating shapes.","setting.invert-selection-mode":"Invert selection mode","setting.invert-selection-mode-description":"Only select objects which are completely inside the selection area, hold alt-key to switch between two modes.","setting.auto-expand-layers":"Auto expand layers","setting.auto-expand-layers-description":"When set auto-expands the layer tree for the current selection.","setting.auto-save":"Enable auto-save","setting.auto-save-description":"Files are saved automatically - please choose the interval (minutes) on the right. Please note that this feature is only available for files saved or synced to Corel Vector.","setting.auto-save-warning":"Auto-save: Warning for unsaved/local files","setting.auto-save-warning-description":"Show warning to remind about saving/syncing files to Corel Vector to enable auto-save. ","setting.auto-save-not-support-for-cdr-warning":"Auto-save: Reminder for CorelDRAW (CDR, DES) files","setting.auto-save-not-support-for-cdr-warning-description":"Show message to remind about saving to the CorelDRAW file format regularly.","setting.change-theme":"Change the theme of Corel Vector","setting.enable-beta":"Enable Beta version","setting.enable-beta-description":"Please note that beta versions are not meant for production work and may contain bugs. Please report them at <a href=\'https://discuss.gravit.io/c/designer/beta\'>our forum</a>.","setting.store-textpath":"Save text layers as paths","setting.store-textpath-description":"Saving paths will increase the file size but not require the fonts to be available.","setting.decimals-num":"Rounding","setting.decimals-num-description":"Please switch on to be able to define the number of decimal places where values are rounded in input fields.","action.save-changes":"Save Changes","text.gravish":"Gravish","text.dark-theme":"Dark Theme","text.light-theme":"Light Theme","setting.disable-warning-unsupported-features":"Disable warning messages of unsupported features","setting.disable-warning-unsupported-features-description":"Whether to disable warning message about unsupported features on svg exporter or not.","setting.eps-outline-fonts":"Outline fonts in EPS import","setting.eps-outline-fonts-description":"Fonts will be outlined so that they are not required to display the file correctly. Switch off to keep font information and edit text layers.","setting.ui-toolbar-alignment":"Left-aligned icons in the toolbar.","setting.disable-cdr-warning":"Disable warning message on CorelDRAW (CDR, DES) file open","setting.disable-cdr-warning-description":"Hides the message when opening a CDR or DES file for annotation in CorelDRAW.app.","setting.disable-cdr-unsupported-effects":"Disable warning message on Save as CorelDRAW (CDR, DES) file","setting.disable-cdr-unsupported-effects-description":"Hides the warning message when saving to the CorelDRAW file format.","setting.disable-cdr-unsupported-effect":"Disable warning message when editing CorelDRAW (CDR, DES) files","setting.disable-cdr-unsupported-effect-description":"Hides the warning message when creating incompatible objects in a CorelDRAW design.","setting.disable-notifications":"Disable notifications","setting.disable-notifications-description":"Stop receiving email notifications for new comments or annotations (can be changed for every design individually in the comments panel).","setting.create-backup-copy-of-file":"Create a backup copy of files","setting.create-backup-copy-of-file-description":"For every file you save or export, a hidden backup copy will be created automatically.","setting.email-notifications":"Email notifications","setting.email-notifications-description":"Set frequency of email notifications for new activity within the document","setting.email-notifications-frequency-every10min":"Every 10 mins","setting.email-notifications-frequency-onceaday":"Once a day","setting.email-notifications-frequency-instantly":"Instantly","setting.email-notifications-frequency-never":"Never"},"GSliceProperties":{"text.trim-transparent-pixels":"Trim transparent pixels","action.modify-slice-properties":"Modify Slice Properties"},"GTextProperties":{"text.stylisticset":"Stylistic set","text.language":"Language","text.list-type":"List Type","text.marker-none":"None","text.marker-bulleted":"Bulleted","text.marker-numbered":"Numbered","text.latin":"Latin","text.adlam":"Adlam","text.arabic":"Arabic","text.armenian":"Armenian","text.avestan":"Avestan","text.balinese":"Balinese","text.bamum":"Bamum","text.batak":"Batak","text.bengali":"Bengali","text.brahmi":"Brahmi","text.buginese":"Buginese","text.buhid":"Buhid","text.cham":"Cham","text.cherokee":"Cherokee","text.coptic":"Coptic","text.cyrillic":"Cyrillic","text.devanagari":"Devanagari","text.georgian":"Georgian","text.greek":"Greek","text.hangul":"Hangul","text.hebrew":"Hebrew","text.javanese":"Javanese","text.kaithi":"Kaithi","text.kannada":"Kannada","text.katakana":"Katakana","text.khmer":"Khmer","text.lao":"Lao","text.lepcha":"Lepcha","text.limbu":"Limbu","text.linear_b":"Linear_b","text.malayalam":"Malayalam","text.mandaic":"Mandaic","text.mongolian":"Mongolian","text.myanmar":"Myanmar","text.old_persian":"Old_persian","text.osmanya":"Osmanya","text.phoenician":"Phoenician","text.runic":"Runic","text.sundanese":"Sundanese","text.syriac":"Syriac","text.tagalog":"Tagalog","text.tai_le":"Tai_le","text.tai_tham":"Tai_tham","text.tai_viet":"Tai_viet","text.telugu":"Telugu","text.thai":"Thai","text.tibetan":"Tibetan","text.yi":"Yi","text.auto":"Auto","text.fix":"Fix","text.scale-content":"Autoscale Font","action.modify-text-properties":"Modify Text Properties","text.weight":"Weight","text.alignment":"Alignment","action.justify":"Justify","text.vertical":"Vertical","text.spacing":"Spacing","text.char":"Char","text.word":"Word","text.line":"Line","text.sizing":"Sizing","text.orientation":"Orientation","text.script":"Script","text.variant":"Variant","text.on-path":"On Path","text.reverse":"Reverse","text.distance":"Distance","text.edit":"The font is not available, continue to edit it?","text.transform":"Transform","text.transform-uppercase":"Uppercase","text.transform-capitalize":"Capitalize","text.transform-lowercase":"Lowercase","text.transform-smallcaps":"Small Caps","text.advanced-text-settings":"Advanced Settings","text.decoration":"Decoration","text.decoration-bold":"Bold","text.decoration-italic":"Italic","text.decoration-underline":"Underline","text.decoration-strikethrough":"Strikethrough","text.paragraph":"Paragraph","text.paragraph-indent":"Indent","text.paragraph-spacing":"Spacing After","text.typography":"Typography","text.typography-subscript":"Subscript","text.typography-superscript":"Superscript","text.typography-ligatures":"Ligatures","text.typography-fractions":"Fractions","text.orientation-ltr":"Left-to-right","text.orientation-rtl":"Right-to-left","text.orientation-ttb":"Top-to-bottom","text.decoration-strikeout":"Strikethrough","text.mixed":"Mixed","text.size":"Size","text.color":"Color","text.advanced-properties-icon-tooltip-title":"Advanced Text Properties","text.advanced-properties-icon-tooltip-description":"Manage advanced typography properties (Sub and Super script, Fractions, Ligatures, Change Case, Paragraph indent and spacing)."},"GToolbar":{"text.shared":"Shared","text.share":"Share","text.snap":"Snap","text.view":"View","text.select":"Select","text.path":"Path","text.shape":"Shape","text.text":"Text","text.group":"Group","text.clip":"Clip","text.split":"Ungroup","text.zoom":"Zoom","text.merge":"Create Compound Shape","text.zoom-button-tooltip-title":"Zoom","text.undoList-button-tooltip-title":"Extended undo list","text.undoList-button-tooltip-description":"See a list of actions performed lately to roll back to an older version of your design.<br/>","text.comment-toggle":"Comment Toggle","text.comment-on":"Show comments and annotations.","text.comment-off":"Hide comments and annotations."},"GTransformProperties":{"title":"Transform","text.advanced-transform-settings":"Advanced settings","text.scale":"Scale","text.skew":"Skew","text.copies":"Copies","action.apply-transformation":"Apply Transformation","text.move-tooltip-title":"Move element","text.move-tooltip-description":"Set a number to move the selected element horizontally or vertically.","text.scale-tooltip-title":"Scale element","text.scale-tooltip-description":"Set a number to adjust width and height of the selected element.","text.rotate-tooltip-title":"Rotate element","text.rotate-tooltip-description":"Set an angle to rotate the seleted element.","text.rotate-axis-tooltip-title":"Rotate along axis","text.rotate-axis-tooltip-description":"Set an angle for the reflect axis.","text.skew-tooltip-title":"Skew element","text.skew-tooltip-description":"Set an angle to slant the selected element along one of the axis.","text.copies-tooltip-title":"Copy element","text.copies-tooltip-description":"Set a number to make copies of the selected element.","text.transdorm-origin-tooltip-title":"Transdorm origin","text.transdorm-origin-tooltip-description":"Set the origin point for transformations"},"GFilesPanel":{"text.file-can-not-be-accessed-missing-permissions":"This file has view restrictions set by the owner, you are not allowed to open it.","text.assets-shared-with-me":"Assets shared with me","text.please-inform-valid-file-name":"Please, inform a valid file name","text.title-recent-files":"Recent Files","text.title-all-files":"My Cloud","text.option-isnt-available":"This option isn’t available for Cloud Drives","text.google-drive-corporate":"Google Drive","text.sharepoint-corporate":"SharePoint","text.onedrivebusiness-corporate":"OneDrive Business","text.downloading-files":"Downloading file(s)...","text.info-cdr":"CDR: All existing CorelDRAW drawing content will be maintained when opening in CorelDRAW. Drawing content added in CorelDRAW.app will be editable in CorelDRAW, but will be locked when opening the CDR file in CorelDRAW.app again.","text.info-cdrapp":"CDRAPP: The internal file format of CorelDRAW.app. All content added in CorelDRAW.app will be maintained and remains editable. Existing CorelDRAW drawing content will be maintained as a locked underlay. This file format can’t be opened in CorelDRAW.","text.info-sharepoint-cdrapp-not-available":"Saving to the CDRAPP file format isn’t supported for SharePoint yet. Please choose DES or CDR format instead.","action.new-folder":"New folder","action.new-folder-tooltip":"Creates a new folder in the current location","action.cut":"Cut","action.cut-tooltip":"Cut/Paste the current selection","action.copy":"Copy","action.copy-tooltip":"Copy/Paste the current selection","action.delete-tooltip":"Delete the current selection","action.cancel-tooltip":"Cancel and go back to editing your design.","text.delete-confirm":"You want to delete the current selection? This operation cannot be reverted!","text.sort-date":"Sort by Creation Date","text.sort-name":"Sort by Name","action.back":"Back","action.back-tooltip":"Return to previous folder","action.my-cloud":"My Cloud","action.my-cloud-tooltip":"Return to the main directory","action.open":"Open","action.rename":"Rename","text.updated":"Updated","text.name":"Name","text.creation-date":"Creation Date","text.created":"Created","text.ascending":"Ascending","text.descending":"Descending","text.large-mode":"Large preview","text.last-saved":"Last saved","action.open-design":"Open","action.delete-button":"Delete","action.card-view-button":"Card view","action.list-view-button":"List view","text.search-not-found":"No files match your search term, please try again.","text.search-placeholder":"Search File","action.open-containing-folder":"Open containing folder","action.sort":"Sorting","action.download-tooltip":"Download files","action.download-tooltip-format":"Download %format Files","action.download-title":"Download","action.download-title-format":"Download %format","action.maximize-window":"Maximize window","action.minimize-window":"Minimize window","action.close-window":"Close window","text.untitled":"Untitled","text.error-download-single-file":"Error occurred. File cannot be downloaded. Please contact support.","text.error-download-multiple-files":"Some files could not be downloaded. Please contact support.","text.error-fetching-files":"Error occurred, files could not be loaded. Please contact support.","text.error-fetching-folders":"Error occurred, folders could not be loaded. Please contact support.","text.error-creating-folder":"Error occurred, folder could not be created. Please contact support.","text.error-saving-file":"Error occurred, file could not be saved. Please contact support.","text.error-deleting":"Error occurred, could not delete item. Please contact support.","text.error-renaming":"Error occurred, could not rename item. Please contact support.","text.error-moving":"Error occurred, could not move items. Please contact support.","text.info-des":"DES: All existing Corel DESIGNER drawing content will be maintained when opening in Corel DESIGNER. Drawing content added in CorelDRAW.app will be editable in Corel DESIGNER, but will be locked when opening the DES file in CorelDRAW.app again. The Corel DESIGNER %version DES file format will be used.","text.file-already-exists-on-current-location":"%filename already exists in the current location. Do you want to create a new file with the same name?","text.folder-already-exists-on-current-location":"%foldername already exists in the current location. Do you want to create a new folder with the same name?","text.new-file-name-invalid":"The new file name is invalid","text.selection-multiple":"%selection %multiple","text.multiple":"multiple","text.cloud":"Cloud","text.filter-type-gvdesign":"GVDESIGN","text.filter-type-symbol":"Symbols","text.filter-type-styles":"Styles","text.filter-type-cdr":"CDR","text.filter-type-des":"DES","text.filter-type-cdrapp":"CDRAPP","action.filter":"Filtering","action.clear":"Clear"},"GDashboardFilesPanel":{"text.confirm-file-overwrite":"You selected a file when saving, do you want to continue and replace this file? Replacing it will overwrite its current content.","text.not-allowed-select-different-format-overwrite":"It is not allowed to select different file formats when saving symbols."},"GNewFilePrompt":{"text.name-document":"Please name your folder","action.create":"Create"},"GPresets":{"text.android-mobile":"Android mobile","preset-title.print":"Print","preset-sub-title.print":"Paper Size","preset.4a0":"4A0","preset.2a0":"2A0","preset.a0":"A0","preset.a1":"A1","preset.a2":"A2","preset.a3":"A3","preset.a4":"A4","preset.a5":"A5","preset.a6":"A6","preset.a7":"A7","preset.a8":"A8","preset.a9":"A9","preset.a10":"A10","preset.us-letter-portrait":"US-Letter Portrait","preset.us-letter-landscape":"US-Letter Landscape","preset.business-card":"Business Card","preset.flyer":"Flyer","preset.postcard":"Postcard","preset.book-cover":"Book Cover","preset-title.web":"Web/Desktop","preset-sub-title.web":"Screen Size","preset.blog-cover":"Blog Cover","preset.blog-graphic":"Blog Graphic","preset.website-small":"Website - Small","preset.website-normal":"Website - Normal","preset.website-medium":"Website - Medium","preset.website-large":"Website - Large","preset.website-huge":"Website - Huge","preset.full-website":"Full Website","preset-title.social":"Social Media","preset-sub-title.social":"Banner/Post Size","preset.facebook-cover":"Facebook Cover","preset.facebook-profile":"Facebook Profile","preset.facebook-story":"Facebook Story","preset.twitter-cover":"Twitter Cover","preset.youtube-cover":"YouTube Cover","preset.google-cover":"Google+ Cover","preset.google-business-profile":"Google My Business Profile","preset.google-business-cover":"Google My Business Cover","preset.google-business-post":"Google My Business Post","preset.linkedin-cover":"LinkedIn Cover","preset.linkedin-profile":"LinkedIn Profile","preset.linkedin-post":"LinkedIn Post","preset.twitch-cover":"Twitch Cover","preset.twitter-post":"Twitter Post","preset.twitter-profile":"Twitter Profile","preset.twitter-story":"Twitter Story","preset.facebook-post":"Facebook Post","preset.facebook-app":"Facebook App","preset.facebook-ad":"Facebook Ad","preset.blog-post":"Blog Post","preset.instagram-post":"Instagram Post","preset.instagram-profile":"Instagram Profile","preset.instagram-story":"Instagram Story","preset.instagram-thumbnail":"Instagram Thumbnail","preset.tumblr-graphic":"Tumblr Graphic","preset.pinterest-pin":"Pinterest Pin","preset.twitch-video":"Twitch Video","preset.linkedin-banner":"LinkedIn Banner","preset.dribble-shot":"Dribbble Shot","preset-title.screen":"Devices","preset-sub-title.screen":"Device Type","preset-title.merch":"Print on Demand","preset-sub-title.merch":"Item Type","preset.amazon-shirt-pullover":"Amazon Shirt/Pullover","preset.amazon-shirt":"Amazon Shirt","preset.amazon-pullover":"Amazon Pullover Back","preset.amazon-popsocket":"Amazon Popsocket","preset.teepublic-shirt":"Teepublic T-Shirt","preset.cafepress-shirt":"Cafepress T-Shirt","preset.redbubble-shirt":"Redbubble T-Shirt","preset.redbubble-shirt-standard":"Redbubble Standard","preset.redbubble-shirt-long":"Redbubble Long","preset.instagram-stories":""},"GLibrarySidebar":{"title":"Libraries","text.connect":"Connect to the internet to access the Library"},"GDocumentChooser":{"text.cloud.sync.title":"Cloud Synchronization","text.cloud.sync.subtitle":"We found a divergence in the hosted file, please choose the file version that you want to keep using.","text.cloud.online":"(Cloud)","text.cloud.offline":"(Local File)","text.cloud.newer-file":"(Newer file)","text.cloud.unavailable":"Unavailable"},"GItemProperties":{"text.click-through":"Click-through this element","text.scale-with-content":"Autoscale Clipped Shapes"},"GFrameProperties":{"text.frame":"Frame","text.switch-frame":"Turn On Frame Mode","text.frame-off":"Turn Off Frame Mode"},"GGroupFrameProperties":{"text.group":"Group","text.frame":"Frame","text.switch-frame":"Switch to Frame","text.switch-group":"Switch to Group"},"GOpenWelcomeScreenAction":{"title":"Show Welcome Screen"},"GCheckForUpdatesAction":{"title":"Check for Updates"},"GLoginPanel":{"text.title":"Let\'s get started!","text.subtitle":"We hope you have enjoyed using Corel Vector so far. Please create an account with our Corel Vector to continue.","text.login":"Login","text.signup":"Sign up"},"GSoftwareUpdatePanel":{"title":"Software Update","text.update-not-available":"There is currently no update available. You are using the latest version (%currentVersion)","text.download-ready":"Download ready,&nbsp;<a>install Corel Vector %newVersion now!</a>","text.download-progress":"Downloading Corel Vector %newVersion","text.update-available":"There\'s a new version available (%newVersion). You\'re currently using %currentVersion.&nbsp;","text.update-error":"Failed to update the application, please, try again later!","text.after-update":"You are now running Corel Vector %currentVersion.&nbsp;","text.see-release-notes":"See release notes","text.update-now":"Update Now!","text.force-update-information-time":"The app <span>will close automatically</span> in %minutes min.","text.force-new-version-available":"There’s a new version available (%newVersion)","text.force-message-avoid-losing-progress":"It will be installed automatically, please save your designs in order to avoid losing progress.","text.ok":"OK","text.dialog-unsaved-documents":"You have unsaved changes. Please save your designs in order to avoid losing progress.","text.updating":"Updating..."},"GApplicationManager":{"text.license-change-spectator-title":"You are now in Viewer Mode. You can only preview, open, and print designs. If you are unsure about this change, please contact your IT administrator.","text.license-change-spectator-losing-progress":"Please save your designs in order to avoid losing progress.","text.license-change-spectator-update-time":"The app <span>will automatically update</span> in %minutes min.","text.ok":"OK"},"GOfflineDialog":{"title.unavailable-feature":"This feature is not available while you are offline. Please establish an internet connection to continue.","text.offline-title":"Hey %name, please <strong>establish an internet connection with your device</strong> in order to verify your subscription details.","text.offline-title-retry":"Hey %name, in order to complete your request we need an internet connection. Please <strong>connect your device</strong> and click on “Retry.”","text.display-name-in-case-missing":"there","text.offline-subtitle":"If we are unable to connect in the next %days days, we will disable all features until an internet connection is present.","text.offline-check":"Check later","text.offline-retry":"Retry","text.offline-cancel":"Cancel","text.offline-footer":"If you have questions, please <a href=\'%link\' target=\'_blank\'>contact us here.</a>"},"GSaveStepsAction":{"title":"Save steps"},"GImportStepsAction":{"title":"Import steps"},"GInstallToDesktopAction":{"title":"Install to Desktop"},"GInstallPwaDialog":{"text.title":"Install Corel Vector to your desktop","text.description-text":"Corel Vector now comes as a PWA (Progressive Web App), that runs like a regular desktop application, no download required. It gives you everything you know (and love) from the current web app, but doesn’t require an internet connection ","text.description-pro-link":"(subscription required)","action.install-button":"Install","action.not-now-button":"Not now","text.footer-main-text":"After installing, the PWA is available as a regular desktop application and can also be found in ","action.footer-link-text":"Chrome apps","action.footer-more-information":"More information here","text.end-sentence-dot":".","text.pwa-requires":"<span>The PWA requires</span><span><a href=\'https://www.google.com/chrome\' target=\'_blank\'>Google Chrome</a> or <a href=\'https://www.microsoft.com/en-us/edge\' target=\'_blank\'>Microsoft Edge</a></span><span>in order to work.</span>"},"GShortcutsDialog":{"text.title":"Keyboard Shortcuts"},"GSetupSystemDate":{"title":"Setup System date","text.reset":"Reset"},"GTranslationToolAction":{"title":"Translation Tool"},"GFilesPanelViewBase":{"text.connect-cloud-drive":"Connect Cloud Drive","text.connect-new-cloud-drive":"Connect new Cloud drive...","text.cloud-connection-options":"Google Drive, iCloud, DropBox, OneDrive","text.add-new-cloud-drive":"Add new Cloud drive","text.connect-cloud-drive-text":"Connect %name","text.add-new-drive-text":"Add new %name Account","text.add-new-drive-suffix":"Account","text.edit-drive-title":"Edit Cloud Drive","text.button-edit-cloud-drive-disconnect":"Disconnect","text.error-validation-fill-all-fields":"Please fill next fields correctly: %fields","text.error-incorrect-configuration":"Either you\'ve not finished the login process, or there is an error in Account data","text.button-add-cloud-drive-save":"Save","text.button-add-cloud-drive-cancel":"Cancel","text.add-new-account-field-tenant":"Tenant","text.add-new-account-field-client-id":"Client ID","text.add-new-account-field-domain":"Domain","text.add-new-account-field-name":"Name","text.my-drive":"My Drive","text.personal-google-drive":"Personal Google Drive","text.refresh-drive-content":"Refresh Cloud Content","text.info-sharepoint-unavailable-safari":"SharePoint currently isn’t supported in your web browser, please try Chrome or Firefox instead.","text.show-more":"Show more ...","text.collaborators":"Collaborators","text.share-by":"Shared by <span>%name</span>","text.comments":"Comments","text.comment":"Comment","text.status":"Status","text.shared":"Shared","text.share-this-file":"Share this file","text.created":"Created %createdTime","text.can-only-share-by-owner":"This file can’t be shared by you, this is only possible for files where you are the owner."},"GFilesPanelViewSharepoint":{"action.checkout":"Check out","action.checkout-open":"Check out and open","action.checkin":"Check in","action.discard-check-out":"Discard check out","text.error-could-not-discard-check-out":"Could not discard check out","text.discard-check-out-warning-description":"If you discard your check out, you will lose all changes made to the document. Are you sure you want to discard your check out?","text.checkin-comment":"Enter comment for Check In","text.error-file-cant-be-opened":"File cannot be opened","text.error-could-not-connect-to-instance":"Could not connect to SharePoint instance","text.error-could-not-check-in":"Could not check in","text.error-could-not-check-out-open":"Could not check out and open","text.error-could-not-check-out":"Could not check out","text.error-loading-sharepoint-user-info":"Error loading SharePoint user info: %error","text.error-file-is-already-checked-out-by-someone-else":"This file is already in use.","text.choose-checkin-type":"What kind of version would like to check in?","text.checkin-type-minor":"Minor version (draft)","text.checkin-type-major":"Major version (publish)","text.checkin-type-overwrite":"Overwrite the current minor version","text.third-party-cookie-warning-message":"Please change your browser settings to <a href=\'%link\'>allow third-party cookies</a> and then try again.","text.third-party-cookie-warning-message-try-again":"Try again","text.no-access-to-download-some-selected-files":"You don\'t have permission to access some of the selected files. These files won\'t be downloaded.","text.no-access-to-download-all-selected-files":"You don\'t have permission to access the selected files.","text.button-proceed":"Proceed"},"GDashboardSharepointAuthenticator":{"text.please-close-already-authenticated":"Please close this window, you have been successfully authenticated."},"GDashboardManager":{"text.failed-get-file":"Failed to get file, please try again later!"},"GExternalStorage":{"text.error-file-cant-be-null":"File can not be null","text.error-window-blocked":"Window is blocked","text.error-window-blocked-alternative":"Please allow pop-ups for Corel Vector in browser settings to continue."},"GHeader":{"action.context-menu.duplicate":"Duplicate","action.context-menu.close-other":"Close Other Files","text.close-other-tabs-confirmation":"Do you really want to close all other files?","text.close-all-tabs-confirmation":"Do you really want to close all files?","action.context-menu.close-all":"Close All"},"GUserNameConfigDialog":{"text.ok":"OK","text.dialog-title":"Hi! Nice to meet you...","text.name-usage-tips":"Please enter your full name so that we identify you when adding comments or annotations.","text.first-name":"First Name","text.last-name":"Last Name"},"GMSTeamsAuthenticator":{"text.offline":"It seems like there is a connection issue. Please try again later.","text.onedrive-business-error":"You don’t seem to be signed in with an account that is allowed to access OneDrive Business inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.sharepoint-error":"You don’t seem to be signed in with an account that is allowed to access SharePoint inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.not_registered":"You don’t seem to signed in with an account that is allowed to access CorelDRAW.app, please sign in using a valid account.","text.sharepoint-onedrive-business-error":"You don’t seem to be signed in with an account that is allowed to access SharePoint and OneDrive Business inside of CorelDRAW.app, please ask your domain administrator to configure access or sign in using a valid account.","text.failed-to-open-window":"It seems your browser is blocking pop-ups, please see the icon in the address bar. Please click “Authenticate” to try again.","text.cancelled-by-user":"We couldn\'t log you in, please try again to be able to use CorelDRAW.app.","text.unknown":"Unknown error, Please contact support.","text.authenticate":"Authenticate","text.try-again":"Try again","text.error_no_client_id":"Your user isn\'t properly configured for accessing CorelDRAW.app on Microsoft Teams, please contact your IT administrator","text.error_user_not_registered":"To sign in to CorelDRAW.app for Teams for creating or editing designs, you must have a licensed copy or an active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).<br />Please ensure:<br /><ol><li>You have Enterprise License of Corel Draw Graphics Suite.</li><li>You can sign in to CorelDRAW.app with your account via MSO365 option on <a href=\'https://coreldraw.app/?enterprise\' target=\'_blank\'>Enterprise  sign in page</a>.</li></ol> Please visit <a href=\'https://www.coreldraw.com/\' target=\'_blank\'>www.coreldraw.com</a> for more information.","text.error_empty_hash":"Error occured: Empty Request Hash. Please try to reload Tab/Application.","text.error_no_command_found":"Error occured: No Commands Found in Hash. Please try to reload Tab/Application.","text.error_incorrect_hash_command":"Error occured: Wrong Hash Command. Please try to reload Tab/Application"},"GMSTeamsConfigRenderer":{"text.main-title":"Please select an option:","text.new-file-option":"Create New File","text.template-option":"New from Template","text.template-category-view-title":"Select template category","text.template-view-title":"Select template of \\"%category\\" category (%width×%height %unit)","text.create-button":"Create","text.warnings-header":"Warnings:","text.new-file-select-preset":"Select predefined size","text.existing-file-option":"Open Existing File","text.file-name-label":"Enter File Name","text.file-name-placeholder":"New CDA File Name","text.file-extension-label":"Select File Format","text.existing-file-view-title":"Choose a file","text.existing-file-shared-on":"Shared on:","text.existing-files-no-results":"No items found for this chat/channel. Please create new file or choose another chat/channel","text.existing-file-no-permission":"This file can\'t be selected, be sure you have the right permissions!","text.error-not-authenticated-existing-files":"We could not load your existing files because of authentication error. Please try again later or contact your administrator","text.error-not-authenticated":"We could not authenticate you. Please try again later or contact your administrator","text.error-user-doesnt-exist":"This user doesn\'t exist. Please contact your domain administrator","text.error-could-not-create-new-file":"Could not create new file.","text.error-conflict-file":"The filename is already used. Please go back and change it!","text.error-file-name-empty":"File name should not be empty. Please fill it in.","text.error-file-name-rules":"The file name cannot contain \'/\', \'\\\\\', \'|\' illegal characters. Please modify it.","text.error-create-file-request":"Create File request error","text.go-back-button":"‹ Go back","text.go-back-to-configuration-button":"‹ Go back to the file configuration","text.warning-could-not-share-new-file":"Could not share new file","text.warning-could-not-post-new-file-to-chat":"Could not post new file to chat","text.long-creation-time-notification":"Please wait! This might take a while.","text.file-created-successfully":"The file was saved successfully! Please click on Save to finish. ↓","text.filename-default":"Untitled-1"},"GMSTeamsOneDriveBusinessProvider":{"text.error-no-personal-chats-folder":"Could not find MS Teams Personal Chats folder"},"GUnshareButton":{"text.unshare-with-me":"Unshare with me"},"GToggleFillsAction":{"title":""},"GUnshareWithMeAction":{"title":"Unshare with me"},"GChangeAnchorPointsJointTypeAction":{"title":""},"GBanner":{"text.access-expire":"Your access to Corel Vector has expired. Unlock continued access to these flexible tools by visiting our website to <a target=\'_blank\' href=\'%link\'>subscribe today</a>"}},"translationsExtended":{},"translationsExtendedTemporary":{},"translationsTemporary":{},"etag":"608b3df09c02803797a2015c99192c33"},{"language":"German","keyValue":1,"abbreviation":"de-DE","isDefault":false,"isAvailable":true,"realName":"Deutsch","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Chinese","keyValue":2,"abbreviation":"zh-CN","isDefault":false,"isAvailable":true,"realName":"簡體中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Portuguese","keyValue":3,"abbreviation":"pt-BR","isDefault":false,"isAvailable":true,"realName":"Português","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Spanish","keyValue":4,"abbreviation":"es-ES","isDefault":false,"isAvailable":true,"realName":"Español","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"French","keyValue":5,"abbreviation":"fr-FR","isDefault":false,"isAvailable":true,"realName":"Français","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Polish","keyValue":6,"abbreviation":"pl-PL","isDefault":false,"isAvailable":true,"realName":"Polski","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Russian","keyValue":7,"abbreviation":"ru-RU","isDefault":false,"isAvailable":true,"realName":"Русский","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Turkish","keyValue":8,"abbreviation":"tr-TR","isDefault":false,"isAvailable":true,"realName":"Türkçe","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Czech","keyValue":9,"abbreviation":"cs-CZ","isDefault":false,"isAvailable":true,"realName":"Čeština","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"ChineseTaiwan","keyValue":10,"abbreviation":"zh-TW","isDefault":false,"isAvailable":true,"realName":"繁體中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Italian","keyValue":11,"abbreviation":"it-IT","isDefault":false,"isAvailable":true,"realName":"Italiano","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Japanese","keyValue":12,"abbreviation":"ja-JP","isDefault":false,"isAvailable":true,"realName":"日本語","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Dutch","keyValue":13,"abbreviation":"nl-NL","isDefault":false,"isAvailable":true,"realName":"Nederlands","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Swedish","keyValue":14,"abbreviation":"sv-SE","isDefault":false,"isAvailable":true,"realName":"Swedish","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}}]'
        );
    },
    function (e) {
        e.exports = JSON.parse(
            '[{"language":"English","keyValue":0,"abbreviation":"en-US","isDefault":true,"isAvailable":true,"realName":"English","translations":{"GLoggedIn":{"text.you-were-logged-in":"You were logged in successfully","text.you-can-close-this-page":"You can close this page and return to the desktop application of Corel Vector."},"GShareRoles":{"text.role-no-access-name":"No Access","text.role-no-access-description":"Don\'t have access to this design","text.role-owner-name":"Owner","text.role-viewer-name":"Viewer","text.role-viewer-description":"Can open and view the design","text.role-viewer-description-alt":"Now you can only view this file.","text.role-viewer-invitation-message":"%name invited you to view","text.role-viewer-invitation-info":"You can View the design, but can’t edit, annotate or export.","text.role-viewer-status":"You can only preview this design.","text.role-developer-name":"Developer","text.role-developer-description":"Can inspect elements, save and export","text.role-developer-description-alt":"Now you can inspect, save and export this file.","text.role-developer-invitation-message":"%name invited you to inspect","text.role-developer-invitation-info":"You can View, Inspect, Export assets or Save a copy of this design.","text.role-developer-status":"You can inspect and save a copy of this design, as well as export.","text.role-reviewer-name":"Reviewer","text.role-reviewer-description":"Can comment on the design and annotate","text.role-reviewer-description-alt":"Now you can view, comment and annotate this file.","text.role-reviewer-invitation-message":"%name invited you to review","text.role-reviewer-invitation-info":"You can View and Comment/Annotate on this design.","text.role-reviewer-status":"You can preview, comment and annotate this design.","text.role-approver-name":"Approver","text.role-approver-description":"Can approve the file","text.role-approver-description-alt":"Now you can view, comment and annotate this file, as well as approve the final revision.","text.role-approver-invitation-message":"%name invited you to review/approve the following design:","text.role-approver-invitation-info":"You can comment and annotate this design as well as approve the final version. Please check the “Comments” docker on the right to find all the necessary tools.","text.role-approver-status":"You can preview, comment and annotate this design, as well as approve the final revision.","text.role-co-author-name":"Co-Author","text.role-co-author-description":"Can edit the design","text.role-co-author-description-alt":"Now you can edit this file","text.role-co-author-invitation-message":"%name invited you to collaborate on","text.role-co-author-invitation-info":"You can edit elements from this design. Your changes will be saved back to original file in real-time.","text.role-co-author-status":"You can add and edit objects in this design, as well as comment and annotate. All changes will be saved in real-time.","text.role-content-editor-name":"Content editor","text.role-content-editor-description":"Can edit selected text content","text.role-content-editor-description-alt":"Now you can edit marked text objects in this file, as well as comment and annotate.","text.role-content-editor-invitation-message":"%name invited you to edit content on the following design:","text.role-content-editor-invitation-info":"You can edit marked text elements from this design. Double-click on marked text elements to edit them. Use the “Finish Editing” button to preview and save your changes.","text.role-content-editor-status":"You can edit marked text objects in this design, as well as comment and annotate.","text.invitation-message-cdss-csl":"%name has shared the following file with you:","text.invitation-info-cdss-csl":"Use these assets in your designs by linking the file to your document from the Assets docker."},"GNotifications":{"email-subject.corporate-license-changed":"Your CorelDRAW.app Corporate License was changed","email-subject.new-comment-annotation":"New comment/annotation (%file)","email-subject.new-reply":"New reply (%file)","email-subject.comment-annotation-assigned":"A comment/annotation was assigned to you (%file)","email-subject.comment-annotation-resolved":"A comment/annotation was resolved (%file)","email-subject.comment-annotation-reopened":"A comment/annotation was reopened (%file)","email-subject.comment-annotation-edited":"A comment/annotation was edited (%file)","email-subject.comment-annotation-deleted":"A comment/annotation was deleted (%file)","email-subject.comment-annotation-mentioned":"You were mentioned in a comment/annotation (%file)","email-subject.reply-assigned":"A reply was assigned to you (%file)","email-subject.reply-edited":"A reply was edited (%file)","email-subject.reply-deleted":"A reply was deleted (%file)","email-subject.reply-mentioned":"You were mentioned in a reply (%file)","email-subject.design-approved":"Design was approved (%file)","email-subject.design-reopened":"Design was reopened (%file)","email-subject.design-in-review":"Design was set back to review (%file)","email-subject.design-updated":"There is an updated version of the design (%file)","email-subject.design-request-approval":"Design approval was requested (%file)","email-subject.design-request-comment":"New request to comment (%file)","email-subject.design-request-access":"New access request (%file)","email-subject.role-changed":"Your role was changed to \\"%role\\" (%file)","email-subject.content-editor-text-changes":"There are new text changes (%file)","email-subject.design-user-request":"%user wants to have the following permissions to your design \\"%file\\": %permissions"},"GReminderDialogFactory":{"text.unknown-date":"(Unknown)","text.remaining-days":"%days days left in your trial","text.remaining-day":"1 day left in your trial","text.expires-today":"Your trial expires today"},"GServerTranslations":{"MAGIC_LINK_INVALID_TOKEN":"Invalid token!","MAGIC_LINK_FAILED_ACTIVATE":"Failed to activate magic link","MAGIC_LINK_FAILED_CREATING":"Failed to create magic link","MAGIC_LINK_FILE_NOT_ALLOW_ACCESS":"You are not allowed to access this design.","MAGIC_LINK_INVALID_INFO":"Invalid information","MAGIC_LINK_EMAIL_SENT":"Magic link was sent to your email account!","MAGIC_LINK_EMAIL_SUBJECT":"Your guest sign-in link (%file)","ACTION_INSERT":"added","ACTION_REMOVE":"deleted","ACTION_EDIT":"edited","ACTION_RESOLVE":"resolved","ACTION_REOPEN":"reopened","ACTION_APPROVE":"approved","ACTION_ASSIGN":"assigned","OPEN_IN_APP":"Open in %app","email-template-share-file-subject":"%from has shared a design with you (%file)","email-template-share-file-open-design":"Open the design","email-template-share-file-invited":"%name invited you to collaborate on","email-template-share-file-learn-more":"Learn more about how collaboration works in Corel Vector User Guide.","email-template-unshare-file-subject":"The file %file was unshared from you","CIRCULAR_REFERENCE_ERROR":"Can’t perform this command, it’s not allowed to paste a folder inside itself","COREL_ERROR_1001":"Error: There are no subscriptions in your records.","COREL_ERROR_1005":"Error: Invalid Credentials.","COREL_ERROR_1008":"Error: Unexpected Error.","COREL_ERROR_1009":"Error: Profile not Found.","DUPLICATE_VALUE":"Already Exists.","INVALID_VALUE":"Invalid Value","INVALID_USERNAME":"Invalid username, it must contain at least 3 characters among numbers, letters and _ or -.","INVALID_FIRST_NAME":"Invalid first name, some characters are not allowed.","INVALID_LAST_NAME":"Invalid last name, some characters are not allowed.","USERNAME_ALREADY_EXISTS":"The username already exists.","INVALID_EMAIL":"Invalid or nonexistent email.","INVALID_PASSWORD_IS_REQUIRED":"A password is required.","INVALID_PASSWORD_TOO_SHORT":"A minimum of %number characters is required for password.","INVALID_PASSWORD_TOO_LONG":"A maximum of %number characters is required for password.","INVALID_PASSWORD_NO_DIGITS":"A password must contain digits.","INVALID_PASSWORD_NO_LOWERCASE":"A password must contain lower case characters.","INVALID_PASSWORD_NO_UPPERCASE":"A password must contain upper case characters.","INVALID_PASSWORD_NO_SPECIAL_CHARACTERS":"A password must contain special characters.","BLOCKED_COUNTRY":"Sorry, this product is not available in your country.","EMAIL_ALREADY_EXISTS":"Email already exists.","EMAIL_NOT_EXISTS":"Email doesn\'t exist.","PASSWORD_NOT_EXISTS":"You don\'t have a password yet. Please click on \\"Forgot your password?\\" to create one.","USER_NOT_EXISTS":"User do not exist.","WRONG_PASSWORD":"The password is wrong.","GREETING":"Howdy","AUTH_GREETING_PLEASE_CLOSE_ALREADY_AUTHENTICATED":"Please close this window, you have been successfully authenticated.","GOODBYE":"Good Bye","PASSWORD_DO_NOT_MATCH":"Passwords do not match.","EMAIL_OR_USERNAME_NOT_EXISTS":"This email or username doesn\'t exist","REACHED_LIMIT_FOR_ACTION":"You have reached the limit for this action in the last %number hours. Please, check your email or try again later","NOT_AUTH":"Not Authorized","NOT_FOUND":"Nothing Here","INSUFFICIENT_PERMISSIONS":"You don\'t have the permission","USER_PASSWORD_DO_NOT_MATCH":"Your email/username and password don\'t match. Please try again!","CONTACT_SUPPORT":"Contact support","NEED_HELP":"Need help?","LOGIN__LOGIN":"Email or Username","LOGIN__EMAIL":"Email","LOGIN__PASSWORD":"Password","LOGIN__PASSWORD_FORGOT":"Forgot password?","LOGIN__REMEMBER_ME":"Remember me","LOGIN__ACTION":"Login","LOGIN__NOT_YET_REGISTERED":"New to Corel Vector? ","LOGIN__SIGNUP_NOW":"Create an Account","LOGIN__OAUTH":"Sign in with","LOGIN__EULA_ACCEPT":"Accept","LOGIN__EULA_DECLINE":"Decline","AVATAR_IMAGE_TOO_BIG":"Please keep image under 100 kB and use PNG or JPG format","SIGNUP__YOUR_USERNAME":"Your Username","SIGNUP__YOUR_NAME":"Your Name","SIGNUP__YOUR_EMAIL_ADDRESS":"Your Email","SIGNUP__YOUR_PASSWORD":"Choose a password (min. 6 chars)","SIGNUP__EMAIL_NOT_GIVEN_AWAY":"We promise not to misuse it!","SIGNUP__PASSWORD":"Password","SIGNUP__START_NOW":"Start Now!","SIGNUP__ALREADY_REGISTERED_QUESTION":"Already registered?","SIGNUP__GO_TO_LOGIN":"Go back to login","CONFIRM_EMAIL__INVALID_TOKEN":"Sorry the email confirmation link is expired","CONFIRM_EMAIL__MAIL_SENT":"An Email has been sent for activating the account. Please also check the SPAM Folder. <br><a href=\\"%serverUrl/resend-confirm-email\\" target=\\"_blank\\">Click here if you want to receive another email!</a>","CONFIRM_EMAIL__MAIL_SUBJECT":"Activate Your Account","CONFIRM_EMAIL__SUCCESS":"Email confirmed successfully","CONFIRM_EMAIL__EMAIL_ALREADY_CONFIRMD":"Your account was already confirmed!","FOLLOWUP_EMAIL__MAIL_SUBJECT":"Activate Your Corel Vector Account","RESEND_CONFIRM_EMAIL__SUBMIT":"Resend Email","RESEND_CONFIRM_EMAIL__HELP":"We will send at this email a link to confirm your email, or","RESEND_CONFIRM_EMAIL__MAIL_SENT":"An email has been sent for activating the account, if it exists. Please also check the SPAM Folder.","RESET_PASSWORD__TITLE":"Reset Password","RESET_PASSWORD__HELP":"We will send at this email a link to reset your password, or","RESET_PASSWORD__INVALID_TOKEN":"Sorry the password reset link is expired","RESET_PASSWORD__REQUEST_RESET":"Reset Password Now","RESET_PASSWORD__REMEMBER":"Remember your password again?","RESET_PASSWORD__GO_TO_LOGIN":"Login","RESET_PASSWORD__MAIL_SENT":"An email has been sent to this account if it exists. Please also check the SPAM folder.","RESET_PASSWORD__SET_NEW_TITLE":"Choose your new password for","RESET_PASSWORD__NEW_PASSWORD":"New password","RESET_PASSWORD__NEW_PASSWORD_CONFIRM":"Confirm new password","RESET_PASSWORD__SUBMIT":"Send request","RESET_PASSWORD__SET_NEW_PASSWORD":"Assign new password","RESET_PASSWORD__SUCCESS":"Your new password was successfully assigned.","RESET_PASSWORD__MAIL_SUBJECT":"Reset your password","RESET_PASSWORD__MAIL_TITLE":"Please follow this link to reset the password for your account:","RESET_PASSWORD__MAIL_ACTION":"Assign new password","CHANGE_PASSWORD_PASSWORDS_DO_NOT_MATCH":"Passwords do not match.","CHANGE_PASSWORD_INVALID_OLD_PASSWORD":"The old password is invalid.","PLEASE_INFORM_BOTH_PASSWORD_OLD_AND_NEW":"Please, inform both new and old password if you want to change it!","SUBSCRIPTIONS_MUST_BE_CANCELED":"There is an active subscription. Subscriptions must be cancelled to proceed it.","CONTENTPROVIDERINTERFACE_ERROR_FETCHING_FILE":"Failed to fetch the file","CONTENTPROVIDERINTERFACE_ERROR_SEARCHING_CONTENT":"Failed to search for content","CONTENTPROVIDERINTERFACE_ERROR_FETCHING_CONTENT_DETAILS":"Failed to retrive the content\'s detail","INVALID_COREL_LOGIN":"Invalid Corel account name/password","COREL_PROFILE_ID_ALREADY_EXISTS":"This Corel account is already assigned to a CorelDRAW account","COREL__LOGIN":"Corel Account Name","COREL__PASSWORD":"Corel Account Password","COREL__ACTION":"Login","COREL__CANCEL_ACTION":"Cancel","ENTERPRISE_INVALID_LOGIN":"This account isn’t recognized for accessing CorelDRAW.app Enterprise. If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator.","NO_SUBSCRIPTIONS":"There are no subscriptions in your records.","PROFILE_NOT_FOUND":"Corel account doesn\'t exist","UNEXPECTED_ERROR":"Unexpected error","email-template-default-thanks1":"Thanks,","email-template-default-thanks2":"the Corel Vector Team","email-template-default-copyright":"Copyright &copy; %year Corel Corporation. All rights reserved.","email-template-default-facebook-title":"Facebook","email-template-default-instagram-title":"Instagram","email-template-default-twitter-title":"Twitter","email-template-default-facebook-url":"https://www.facebook.com/GravitDesigner/","email-template-default-instagram-url":"https://www.instagram.com/gravitdesigner","email-template-default-twitter-url":"https://twitter.com/gravitdesigner","email-template-confirm-email-welcome1":"Welcome, %name!","email-template-confirm-email-welcome2":"Welcome to Corel Vector, %name!","email-template-confirm-email-msg1":"Thanks for joining</br>&nbsp;Corel Vector","email-template-confirm-email-msg2":"Just one small step before you start. Click the button below to activate your account, and happy designing!","email-template-confirm-email-msg3":"Please activate your account by clicking below.","email-template-confirm-email-successfully-purchased":"You successfully purchased a Corel Vector subscription! Please activate your account by clicking below.","email-template-confirm-email-activate1":"ACTIVATE ACCOUNT","email-template-confirm-email-activate2":"Activate Your Account","email-template-confirm-email-maycopy":"You may copy/paste this link into your browser:","email-template-followup-email-title":"Corel Vector","email-template-followup-email-msg":"You signed up for Corel Vector and you haven\'t activated your account yet! <span class=\'highlight\'><a href=\'%link\'>Activate your account today</a></span> to get designing today.","email-template-followup-email-quote":"“Every time I use @GravitDesigner, my toes curl in excitement. How is this free? If even one person reading this tweet needs an SVG editor, I hope to heaven they check out Corel Vector.” - @rvanarsdale","email-template-followup-email-activate":"Activate My Account","email-template-reset-password-welcome":"Hi, %name!","email-template-reset-password-msg1":"Looks like you forgot your password...","email-template-reset-password-msg2":"... don\'t worry, it happens.","email-template-reset-password-msg3":"To reset your password, click on the button below:","email-template-reset-password-reset":"RESET PASSWORD","email-template-reset-password-maycopy":"You may copy/paste this link into your browser:","email-template-reset-password-msg-footer":"If you didn\'t request to change your password, </br>that\'s ok, just ignore this email.","email-template-notification-new":"new","email-template-notification-action-msg-design":"%name has %action the following design:","email-template-notification-action-msg-design-in-review":"%name has set the design to be reviewed again:","email-template-notification-action-msg-design-request-approval":"%name has requested approval for the following design:","email-template-notification-action-msg-comment-annotation":"%name has %action a comment/annotation in the following design:","email-template-notification-action-msg-mention-comment-annotation":"%name has mentioned you in a comment/annotation in the following design:","email-template-notification-action-msg-replied-comment-annotation":"%name has replied to your comment/annotation in the following design:","email-template-notification-action-msg-reply":"%name has %action a reply in the following design:","email-template-notification-action-msg-mention-reply":"%name has mentioned you in a reply in the following design:","email-template-notification-action-msg-file-updated":"%name has added an updated version of the following design:","email-template-notification-action-msg-role-change":"Your role was changed to %role by %owner. %permissions","email-template-notification-action-msg-corporate-license-change":"You are now in <b>Viewer Mode</b>. You can only preview, open, and print designs. If you are unsure about this change, please contact your IT administrator.","email-template-notification-action-msg-request-commenting":"%name has requested commenting access for the following design:","email-template-notification-action-msg-request-access":"%name has requested viewing access for the following design:","email-template-notification-action-msg-updated-text":"%name has updated text content inside the following design:","email-template-notification-empty-comment":"This annotation doesn\'t have a comment yet","email-template-notification-reopened-comment":"Re-opened","email-template-notification-resolved-comment":"Marked as resolved","email-template-notification-assigned-comment":"Assigned the comment to you","email-template-notification-request-commenting-subtext":"You can allow commenting by changing the assigned role of this user to \\"Reviewer\\" or \\"Approver\\" in the Share dialog.","email-template-notification-request-access-subtext":"You can allow access by adding this user’s email address in the Share dialog and assign an appropriate role.","email-template-notification-updated-version-subtext":"Please download this file though File → Save as… and open it in CorelDRAW.","email-template-notification-recent-updates":"Here are the recent updates to %file:","email-template-notification-edit-changes":"New annotations, replies and mentions:","email-template-notification-action-changes":"Assigned, resolved, reopened comments:","email-template-notification-approval-flow-changes":"Approval flow state changes:","email-template-notification-permission-requests":"Permission requests:","email-template-magiclink-action-msg":"Please click on the link below to access the design as a guest:","email-template-magiclink-subtext":"Please note, that this link will be valid only one week and can be used only once. After that, you need to fill in your information again and send a new sign-in link by clicking on the design link above.","email-template-file-unshare-action-msg":"The file %file was unshared by %name.","email-template-file-unshare-subtext":"You have lost access to it.","ENTERPRISE_ACCOUNTS_DISABLED":"Enterprise accounts are disabled","ENTERPRISE_ACCOUNT_DEACTIVATED":"Your account has been deactivated. Ask your IT for access.","SPECIAL_LINK_NEEDED_ACTIVATE_ACCOUNT":"Special link needed to activate account","LICENSE_ALREADY_REACHED_MAXIMUM_USER_COUNT":"Your license already reached maximum user count","CORPORATE_DOMAIN_DEACTIVATED":"Corporate domain deactivated","CORPORATE_DOMAIN_EXPIRED":"Corporate domain expired","CORPORATE_CUSTOMER_DOESNT_EXIST":"Corporate customer does not exist","CORPORATE_DOMAIN_DOESNT_EXIST":"Corporate domain does not exist","EMPTY_EMAIL":"Empty email","GOOGLE_DRIVE_FAILED_GETTING_CONFIG":"Failed getting Google Drive configuration","COUPON_ALREADY_PRO":"You already have a license!","COUPON_INVALID":"Coupon invalid. Please check your coupon and try again!","COUPON_REDEEMED":"Coupon already redeemed!","COUPON_USAGE_EXCEEDED":"Usage limit exceeded for coupon!","COUPON_FAILED_ACTIVATING":"Failed activating coupon!","COUPON_ACTIVATED":"Coupon activated!","email-template-confirm-email-welcome":"Welcome, %name!","email-template-confirm-email-activate":"ACTIVATE ACCOUNT","magic_link_file_no_access":"The file either can’t be found or it’s not shared with you.","magic_link_email_already_in_use":"%email is already in use, please check if it’s a correct address.","corporate_domain_not_allowed_sign_in_as_guest":"%email belongs to a registered Corporate domain and it\'s not allowed to Sign in as Guest, please use the default login method.","RESTRICT_ASSET_SHARE_ERROR":"This email is not associated with a valid CorelDRAW user. Please check the email and try again.","INVALID_PASSWORD":"A minimum of 6 characters is required for password."},"GLoginDialog":{"text.continue":"Continue","text.continue-to-purchase":"Continue to Purchase","text.continue-to-day-trial":"Continue to %days-day Trial","text.continue-to-free-trial":"Continue to Free Trial","text.title":"Welcome to Corel Vector","text.title-title":"Thank you for choosing Corel Vector,","text.title-title-account-created":"Thank you for choosing Corel Vector!","text.title-subtitle":"please create an account or sign in to continue","text.title-title-anonymous":"Thank you for trying out Corel Vector.","text.title-subtitle-anonymous":"Please create an account or log in to continue.","text.pro-title":"Become a PRO","text.pro-subtitle":"Experience the full power of Corel Vector with advanced features and streamlined workflows tailored for Professionals","text.pro-topic-1":"Desktop apps with offline access","text.pro-topic-2":"Professional export workflow with PDF at 300dpi and advanced SVG options","text.pro-topic-3":"1GB of file storage","text.pro-topic-4":"An ever-growing library of professionally designed Templates, UI Kits, and other design assets","text.pro-topic-5":"CMYK color space, Manage Colors with swatches","text.pro-topic-6":"Make changes in your design quickly through Shared styles, Color swatches, and Master pages","text.pro-topic-7":"Use custom and system fonts","text.pro-topic-8":"and much, much more...","text.pro-learn-more":"Learn more about PRO here","text.pro-offer-title":"Introductory offer valid for 90 DAYS","text.pro-offer-price":"Get Corel Vector now for just %price/Mo.","text.pro-offer-info":"will be billed annually (until %date)","text.pro-info":"Regular price after %date is %price/mo., billed annually. You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.pro-subinfo":"Learn more about pricing and features of PRO here.","text.placeholder-sign-in-login":"Email or Username","text.placeholder-sign-in-password":"Password","text.sign-in-title":"Log In","text.sign-in-button":"Log In","text.sign-in-login":"Username / Email address","text.sign-in-password":"Password","text.forgot-password":"Forgot your password?","text.or":"or login with","text.sign-facebook":"Facebook","text.sign-google":"Google","text.not-register":"Not registered yet?","text.sign-up":"Create account","text.sign-info":"With your free account you can try out all PRO features for %days days. After the trial period is over, you can continue using the free version of Corel Vector for as long as you like. Enjoy!","text.not-register-subtitle":"Create an account to begin your free trial!","text.create-account-info":"By logging in with my Google account<br /> I agree to the <a href=\'https://www.corel.com/terms/\'>Terms of Use</a>. My personal data will be processed in accordance with the descriptions of the <a href=\'%privacy-link\'>Privacy Statement</a>","text.sign-up-title":"Register","text.agree":"I agree to the ","text.terms-use":"Terms of Use","text.eula":"End User License Agreement","text.agreement":"I agree to the %terms-of-use and %end-user-license-agreement.","text.privacy-statement":"My personal data will be processed in accordance with the descriptions of the ","text.privacy-statement-link":"Privacy Statement.","text.info-privacy-statement":"All information is confidential and will not be shared with any 3rd party. ","text.info-privacy-statement-link":"Privacy Policy","text.newsletter":"Get critical software updates and exclusive offers.","text.sign-up-email":"Email Address","text.sign-up-username":"Username","text.sign-up-password":"Password","text.sign-up-password-min-max":"(use %min-number to %max-number chars.)","text.sign-up-password-min":"","text.sign-up-now":"Begin trial","text.sign-up-already":"Already have an account?","text.sign-up-go-back":"Go back to login.","text.reset-password-send":"Send Request","text.welcome-back":"Welcome back, %name!","text.special-offer":"Special offer for you!","text.go-pro":"GO PRO NOW FOR JUST %price/mo.","text.hey":"Hey %name,<br>Thank you for being a Corel Vector user!","text.valid-until":"VALID UNTIL %date","text.buy-now":"BUY NOW for %price.","text.default-info":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.default-info-promo":"Regular price after %date is %price, billed annually.<br><br>You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.title-xmas-title":"This Holiday Season","text.title-xmas-subtitle":"Unwrap the Gift of a New Design Tool","text.tooltip-trouble-login":"If you have trouble logging in, please contact us at %support-link","text.create-free-account":"Create free account","text.title-create-account":"Create an account to begin your %days day free trial.","text.first-name":"First name","text.last-name":"Last name","text.account-created":"Your account was successfully created!","text.confirmation-account-created":"We have sent a confirmation to <strong>%email</strong>.","text.confirmation-account-created-subtitle":"Please click on the link in the email to activate your account and begin your %days day trial of Corel Vector","text.confirmation-account-created-subtitle-select":"<br><br>To continue, please select an option below:","text.confirmation-account-created-explain-trial":"When the trial is over, you will be able to use the free version of Corel Vector for as long as you like.","text.email-not-received-part-1":"If you didn\'t receive the email, please be sure to check the spam/junk folder of your email client. Otherwise, you can","text.email-not-received-part-2":"send the activation email again here.","text.confirmation-account-created-free":"Start with the free version of Corel Vector now and use your free trial of PRO at a later date.","text.ok":"ok","text.or2":"or","text.try-out-trial-text":"Try Out Corel Vector For %days Days","text.get-started-free-button":"Get Started Free","text.topic-title-1":"Easy to learn and use","text.topic-content-1":"A flexible interface, hundreds of templates, and thousands of stock photos, fonts, graphics, and more make it easy to get started.","text.topic-title-2":"Access from anywhere","text.topic-content-2":"Work across your preferred platforms and touch-enabled devices, and keep your designs safe, synced, and available with unlimited cloud storage.","text.topic-title-3":"Unleash your creativity","text.topic-content-3":"Leverage powerful tools for vector editing, multi-page layout designs, text and typography, non-destructive filters and effects, and so much more.","text.xmas-topic-1":"Click Create FREE Account.","text.xmas-topic-2":"Finish your purchase in two clicks using the in app cart.","text.xmas-topic-3":"Get started using Corel Vector!","text.xmas-header":"Unlock the full power of your<br> photos & harness your creativity with a flexible, professional<br> vector design app.","text.xmas-header-2":"It\'s as easy as 1-2-3!","text.xmas-discount":"<span>Get it Today & Save %discount <mark>— Only %price</mark><span>`","text.pro-info-header":"Dive into fast, flexible, powerful vector editing and graphic design tools.","text.pro-info-header-anonymous":"Corel Vector is a full-featured vector graphic design app that works on ALL platforms.","text.offer-1-title":"Get Started Designing Like a PRO","text.offer-1-subtitle":"Explore these Powerful Tools to Unleash your Creativity.","text.offer-1-topic-1":"Import your existing EPS files and keep working on them.","text.offer-1-topic-2":"Create your personal design system with color swatches and shared styles.","text.offer-1-topic-3":"Employ advanced symbol features like nesting and overrides.","text.offer-1-topic-4":"Discover the powerful Bezigon tool, that makes drawing perfect curves a snap.","text.offer-1-action-title":"Learn more","text.offer-1-buy-now":"BUY NOW","text.learn-more":"LEARN MORE","text.terms-use-privacy-policy-separator":"&","text.privacy-policy":"Privacy Policy","text.select-option":"Please Select an Option to Continue","text.version":"Version: <b>%version</b>","text.title-discontinued":"Corel Vector is being discontinued soon","text.title-discontinued-thanks":"Thank you for being a valued customer.","text.title-discontinued-eol-date":"Corel Vector is officially retiring on August 31, 2025.","text.title-discontinued-eol-date-details":"After this date, the software and any files saved to your Corel Vector account will no longer be available. If you have questions, please <a href=\'%support-link\' target=\'_blank\'>contact our support team</a>.","text.title-discontinued-avoid-losing-work":"To avoid losing your work, export and save your designs before August 31, 2025.","text.title-discontinued-avoid-losing-work-details":"To find step-by-step instructions, visit the tutorial:","text.title-discontinued-export-your-files":"Export your files","text.title-discontinued-sign-up-closed":"Corel Vector sign-up is now closed.","text.title-discontinued-sign-up-closed-details":"You can no longer create an account. To explore alternative graphic design applications, visit <a href=\'%product-link\' target=\'_blank\'>CorelDRAW.com</a>.","text.title-discontinued-sign-up-closed-learn-more":"Learn more","text.title-discontinued-notice":"Notice: After <b>August 31, 2025</b>, you will no longer be able to access the software."},"GReminderDialog":{"text.pro-expire-title":"Hey %name, just a friendly reminder that your Corel Vector subscription will <strong>expire next %timeunit</strong> on %date.<br>We hope that you are enjoying enhanced PRO experience so far!","text.pro-expire-subtitle":"Extend your subscription","text.pro-expired-title":"Hey %name, your Corel Vector subscription <mark>has now expired.</mark>","text.pro-expired-subtitle":"Renew your subscription","text.trial-expired-title":"Hey %name, your Corel Vector <mark>trial period has expired.</mark>","text.trial-expired-subtitle":"Upgrade to PRO","text.trial-expired-subtitle-promo":"UPGRADE TO PRO WITH THIS LIMITED TIME OFFER","text.default-info":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.","text.default-info-promo":"Will be billed annually and will auto-renew on %date until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>. You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.default-subinfo":"You can cancel your subscription at all times (but no money is refunded<br>and the subscription runs until the end of the period).","text.default-subinfo-promo":"Regular price after %date is %price, billed annually. You can cancel your subscription at all times (but no money is refunded and the subscription runs until the end of the period).","text.buy-now":"BUY NOW for %price.","text.buy-now-offline":"BUY NOW","text.pro-dismiss-info":"If you click on \\"Dismiss\\", all <a data-cmd=\'learnmore\'>PRO features</a> will be disabled and your account<br>will be downgraded to the free version.","text.pro-dismiss-subinfo":"You can continue using Corel Vector for free as long as you want. Your Cloud files that exceed the limit of %limit will be kept for one more week before they are deleted permanently. You can renew your subscription at any time at your <a data-cmd=\'settings\'>account settings</a>.","text.pro-dismiss-title":"DISMISS","text.month":"month","text.days":"days","text.continue-as-free":"Continue with Corel Vector Free","text.your-pro-subscription":"Your Corel Vector subscription","text.your-subscription-expires-date":"will <mark>expire on %date</mark>","text.subscription-expires-today":"Your Corel Vector subscription expires <mark>today</mark>","text.subscription-expired":"Your Corel Vector subscription has <mark>expired</mark>","text.trial-expired":"Your Corel Vector <mark>Trial has Expired!</mark>","text.upgrade-screen":"All the design power you need, wherever you are!"},"GCommonNames":{"text.template-header-normal":" ","text.template-header-promo":"LIMITED TIME SPECIAL OFFER","text.template-header-final":"THIS IS YOUR FINAL CHANCE","text.template-header-offline":" ","text.template-title-normal":"GET COREL VECTOR NOW FOR %price.","text.template-title-promo":"GET COREL VECTOR NOW JUST FOR %price.","text.template-title-offline":"GET COREL VECTOR NOW.","text.template-content-normal":"Will be billed annually and will auto-renew on %nextBillingDate until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.","text.template-content-promo":"Will be billed annually and will auto-renew on %nextBillingDate until you cancel your subscription in your <a data-cmd=\'settings\'>account settings</a>.<br>You will keep that low price on a yearly basis for as long as you auto-renew your subscription.","text.template-content-offline":"Will be billed annually and will auto-renew until you cancel your subscription in your <a data-cmd=\'settings\'>account settings.</a>","text.template-footer-promo":"HURRY UP! THIS OFFER <strong>%expire.</strong>","text.template-footer-normal":" ","text.template-footer-offline":" ","text.unknown-user":"Unknown"},"GCorelLoginDialog":{"text.title-title":"Welcome to CorelDRAW.app","text.title-subtitle":"At home, at work, or on the go, this powerful vector illustration web app makes doing what you love more accessible than ever.","text.placeholder-sign-in-login":"Email or Username","text.placeholder-sign-in-password":"Password","text.sign-in-title":"Licensed User Sign-in","text.sign-in-subtitle":"Use your CorelDRAW authentication credentials (version 2019 or newer) to sign in.","text.sign-in-button":"Sign in with license","text.sign-in-login-word":"(Corel customer account user name)","text.sign-in-login":"Email Address","text.sign-in-password":"Password","text.forgot-password":"Forgot your password?","text.or":"or sign in with one click","text.sign-microsoft":"Sign in with Microsoft 365","text.sign-google":"Sign in with Google Workspace","text.sign-up-email":"Email Address","text.reset-password-send":"Send Request","text.sign-up-go-back":"Go back to sign-in.","text.get-started":"Get Started","text.get-started-text":"To sign in to CorelDRAW.app for creating or editing designs, <b>you must have a licensed copy</b> or an active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).","text.learn-more":"LEARN MORE","text.enterprise-sign-in":"CorelDRAW.app Enterprise Sign-in","text.enterprise-sign-in-message":"CorelDRAW.app Enterprise users, sign in with your Microsoft 365 or Google Workspace account.","text.enterprise-login-header":"Welcome to CorelDRAW.app Enterprise","text.enterprise-login-header-subtitle":"At work, or on the go, this powerful vector illustration web app makes doing what you love more accessible than ever.","text.enterprise-login-sign-in":"Sign In","text.enterprise-login-coporate-account":"Use your corporate user account<div class=\'highlight\'>*</div> to sign in to CorelDRAW.app Enterprise","text.enterprise-login-message-1":"<div class=\'highlight\'>*</div> Note: CorelDRAW.app Enterprise sign-in is available exclusively to companies signed-up for a CorelDRAW.app Enterprise License.","text.enterprise-login-message-2":"If you are unsure whether or not you\'re eligible, consult your employer\'s IT administrator","text.enterprise-login-not-enterprise-user":"Not a CorelDRAW.app Enterprise User?","text.enterprise-login-go-to-sign-in":"Go to the CorelDRAW.app sign-in page","text.guest-sign-in-title":"Guest Sign-In","text.guest-sign-in-stubtitle":"Please provide your credentials to identify you in the shared file","text.guest-sign-in-text":"Please use the Guest Sign-In to access the shared design if you don\'t have a licensed copy or active trial of CorelDRAW Graphics Suite or CorelDRAW Technical Suite (version 2019 or newer).","text.guest-sign-in":"Sign in as guest","text.guest-sign-in-first-name":"First Name","text.guest-sign-in-last-name":"Last Name","text.guest-sign-in-send-link":"SEND SIGN-IN LINK","text.guest-sign-in-resend-link":"RESEND SIGN-IN LINK","text.guest-sign-in-node":"<div class=\'highlight\'>*</div> Note: Clicking on the button sends a link to your provided email address, that directly signs you in when clicked.","text.guest-sign-in-send-success":"A link was sent to your email account, please click on it to access this design as a guest.","text.guest-sign-in-send-success-tip":"If you didn\'t receive the email, please be sure to check the spam/junk folder of your email client or Resend Sign-in link below."},"GOfferDialogV1":{"text.offerdialog-v1-title":"Keep creating with fast, powerful, flexible tools that work the way you do.","text.offerdialog-v1-topic-1":"Intuitive vector toolset for sharp and vivid vector graphics at any size","text.offerdialog-v1-topic-2":"Object transformation and distribution tools for snap-to-grid precision","text.offerdialog-v1-topic-3":"Keep your designs safe, synced, and available across platforms with unlimited cloud storage","text.offerdialog-v1-topic-4":"Dozens of non-destructive filters, effects, and image editing tools","text.offerdialog-v1-topic-5":"Accessible everywhere, including touch-enabled devices","text.offerdialog-v1-topic-6":"Powerful text and typography capabilities","text.offerdialog-v1-topic-7":"Easy to learn and use","text.offerdialog-v1-topic-8":"Wide range of format compatibility ensures you can import files from almost anywhere","text.offerdialog-v1-topic-9":"Thousands of templates and stock photos, graphics, fonts, and more","text.offerdialog-v1-default-title":"Corel Vector","text.share-file-sub-title-1":"Stay connected with colleagues and clients as remote work becomes our new normal.","text.share-file-sub-title-2":"Get even more power for designing on the go with CorelDRAW.app PRO:","text.share-file-dashboard-sub-title":"Design on the go with more professional tools:","text.share-file-topic-1":"Share design files with colleagues and clients.","text.share-file-topic-2":"Gather real-time comments and annotations from one or many contributors, right within your shared CorelDRAW design file.","text.share-file-topic-3":"Get unlimited Cloud storage to bring your ideas to life.","text.share-file-topic-4":"Use the web app with any major browser to design and export in CMYK","text.share-file-topic-5":"Export your designs with up to 300dpi and advanced options.","text.share-file-topic-6":"No internet connection required: Use CorelDRAW.app PRO offline.","text.share-file-topic-7":"Design and export in CMYK from start to finish.","text.share-file-title":"Benefit from CorelDRAW design sharing and more with a CorelDRAW.app PRO subscription.","text.share-file-dashboard-title":"Don’t Lose Your Super Power, Keep these Professional Tools","text.loyal-users":"EXCLUSIVE LIMITED TIME OFFER ONLY FOR OUR LOYAL COREL VECTOR USERS!","text.upgrade-tip":"When your access expires, you will also lose access to your projects until you upgrade. Please ensure you download your files before your access expires.","text.footer-promo-title":"Save %discount on Your Corel Vector Subscription when you Buy Now","text.footer-promo-buy":"BUY NOW","text.footer-normal-title":"Go PRO and Get a 1 Year Subscription to Corel Vector for only %price per year.","text.footer-normal-buy":"BUY NOW","text.footer-offline-title":"Go PRO and Get a 1 Year Subscription to Corel Vector.","text.footer-offline-buy":"BUY NOW","text.footer-buy-now":"BUY NOW","text.year":"/year","text.start-trial-button":"Start the 15-day trial now","text.start-trial-caption":"During the trial, you can try all of the features of Corel Vector. Once complete, you will return to the free version.","text.offerdialog-v1-ipad-layout-title":"This feature requires a CorelDRAW.app PRO account","text.offerdialog-v1-ipad-layout-content-title":"CorelDRAW.app’s PRO features are made for design professionals","text.offerdialog-v1-ipad-layout-topic-1":"Get unlimited cloud storage.","text.offerdialog-v1-ipad-layout-topic-2":"Export your designs at up to 300dpi and with advanced options.","text.offerdialog-v1-ipad-layout-topic-3":"Reuse existing elements with symbols and share styles.","text.offerdialog-v1-ipad-layout-topic-4":"Design and export in CMYK from start to finish.","text.offerdialog-v1-ipad-layout-topic-5":"Access system/device fonts or import your own fonts.","text.offerdialog-v1-ipad-layout-topic-6":"No internet connection required: Use CorelDRAW.app offline.","text.offerdialog-v1-ipad-layout-topic-7":"Import your existing EPS files."},"GOfflineDialog":{"text.have-questions":"If you have questions, please <a href=\'%link\' target=\'_blank\'>contact us here.</a>","text.retry-connection":"Hey %name, in order to complete your request we need an internet connection. Please <strong>connect your device</strong> and click on \\"Retry.\\"","text.retry":"Retry","text.cancel":"Cancel"},"GPaywallDialog":{"text.offerdialog-v1-subscribe-title-1":"To use this or other PRO features","text.offerdialog-v1-subscribe-title-2":"<mark>you have to subscribe</mark> to Corel Vector","text.offerdialog-v1-subscribe-share-file-title-1":"To share design files with clients and colleagues","text.offerdialog-v1-subscribe-share-file-title-2":"<mark>you have to subscribe</mark> to CorelDRAW.app PRO","text.offerdialog-v1-subscribe-share-file-dashboard-title":"To use this or other PRO features you have to <mark>subscribe</mark> to CorelDRAW.app PRO","text.remaining-days":"Your access to Corel Vector expires in <mark>%days days</mark>","text.remaining-day":"Your access to Corel Vector expires in <mark>%day day</mark>","text.expires-today":"Your access to Corel Vector expires today","text.trial-message1":"<strong>Unleash your creativity</strong> with a large set of templates and icons in the libraries, choose from a wide selection of fonts or bring in your own typefaces. Over 30 effects and 20 blend modes will give you all the freedom for your next creative project.","text.trial-message2":"<strong>Revolutionize the way you work</strong> with powerful anchoring for responsive layouts or advanced vector tools for your next icon or logo design. Symbols, shared styles and color swatches let you reuse existing elements to create your own design system.","text.trial-message-3":"Go PRO before it\'s too late.","text.pretrial-title":"Get Started Designing Like a PRO","text.pretrial-subtitle":"Explore these Powerful Tools to Unleash your Creativity.","text.learn-more":"Learn more","text.access-message1":"<strong>Upgrade today</strong> and secure continued access to this web-based vector graphics app that empowers you to create on any device. Keep your designs safe, synced, and available across platforms with unlimited storage space in the cloud."},"GSharePointModel":{"error.refresh-token-invalid":"Please, relogin to get access to the SharePoint"},"GGoogleDrive":{"text.all-files-tab-title":"All files","text.gravit-designer-tab-title":"Corel Vector files","text.team-drives-tab-title":"Team Drives files"},"SearchWidget":{"text.no-exact-matches-search-term":"No exact matches for “%searchTerm”. Showing results for similar words or characters instead."}},"translationsExtended":{},"translationsExtendedTemporary":{},"translationsTemporary":{},"etag":"c31f14723be7f3f9e5de84ddd6a9e132"},{"language":"German","keyValue":1,"abbreviation":"de-DE","isDefault":false,"isAvailable":true,"realName":"Deutsch","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Chinese","keyValue":2,"abbreviation":"zh-CN","isDefault":false,"isAvailable":true,"realName":"中文","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Portuguese","keyValue":3,"abbreviation":"pt-BR","isDefault":false,"isAvailable":true,"realName":"Português","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Spanish","keyValue":4,"abbreviation":"es-ES","isDefault":false,"isAvailable":true,"realName":"Español","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"French","keyValue":5,"abbreviation":"fr-FR","isDefault":false,"isAvailable":true,"realName":"Français","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Polish","keyValue":6,"abbreviation":"pl-PL","isDefault":false,"isAvailable":true,"realName":"Polski","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Russian","keyValue":7,"abbreviation":"ru-RU","isDefault":false,"isAvailable":true,"realName":"Русский","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Turkish","keyValue":8,"abbreviation":"tr-TR","isDefault":false,"isAvailable":true,"realName":"Türkçe","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Czech","keyValue":9,"abbreviation":"cs-CZ","isDefault":false,"isAvailable":true,"realName":"Čeština","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"ChineseTaiwan","keyValue":10,"abbreviation":"zh-TW","isDefault":false,"isAvailable":true,"realName":"中文 Taiwan","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Italian","keyValue":11,"abbreviation":"it-IT","isDefault":false,"isAvailable":true,"realName":"Italiano","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Japanese","keyValue":12,"abbreviation":"ja-JP","isDefault":false,"isAvailable":true,"realName":"日本語","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Dutch","keyValue":13,"abbreviation":"nl-NL","isDefault":false,"isAvailable":true,"realName":"Nederlands","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}},{"language":"Swedish","keyValue":14,"abbreviation":"sv-SE","isDefault":false,"isAvailable":true,"realName":"Swedish","translations":{},"translationsExtended":{},"translationsTemporary":{},"translationsExtendedTemporary":{}}]'
        );
    },
    function (e) {
        e.exports = JSON.parse("[]");
    },
    function (e, t, o) {
        (function (e) {
            (!(function (e) {
                var t = (function () {
                        try {
                            return !!Symbol.iterator;
                        } catch (e) {
                            return !1;
                        }
                    })(),
                    o = function (e) {
                        var o = {
                            next: function () {
                                var t = e.shift();
                                return { done: void 0 === t, value: t };
                            },
                        };
                        return (
                            t &&
                                (o[Symbol.iterator] = function () {
                                    return o;
                                }),
                            o
                        );
                    },
                    n = function (e) {
                        return encodeURIComponent(e).replace(/%20/g, "+");
                    },
                    a = function (e) {
                        return decodeURIComponent(String(e).replace(/\+/g, " "));
                    };
                (function () {
                    try {
                        var t = e.URLSearchParams;
                        return (
                            "a=1" === new t("?a=1").toString() &&
                            "function" == typeof t.prototype.set &&
                            "function" == typeof t.prototype.entries
                        );
                    } catch (e) {
                        return !1;
                    }
                })() ||
                    (function () {
                        var a = function (e) {
                                Object.defineProperty(this, "_entries", { writable: !0, value: {} });
                                var t = typeof e;
                                if ("undefined" === t);
                                else if ("string" === t) "" !== e && this._fromString(e);
                                else if (e instanceof a) {
                                    var o = this;
                                    e.forEach(function (e, t) {
                                        o.append(t, e);
                                    });
                                } else {
                                    if (null === e || "object" !== t) throw new TypeError("Unsupported input's type for URLSearchParams");
                                    if ("[object Array]" === Object.prototype.toString.call(e))
                                        for (var n = 0; n < e.length; n++) {
                                            var i = e[n];
                                            if ("[object Array]" !== Object.prototype.toString.call(i) && 2 === i.length)
                                                throw new TypeError(
                                                    "Expected [string, any] as entry at index " + n + " of URLSearchParams's input"
                                                );
                                            this.append(i[0], i[1]);
                                        }
                                    else for (var r in e) e.hasOwnProperty(r) && this.append(r, e[r]);
                                }
                            },
                            i = a.prototype;
                        ((i.append = function (e, t) {
                            e in this._entries ? this._entries[e].push(String(t)) : (this._entries[e] = [String(t)]);
                        }),
                            (i.delete = function (e) {
                                delete this._entries[e];
                            }),
                            (i.get = function (e) {
                                return e in this._entries ? this._entries[e][0] : null;
                            }),
                            (i.getAll = function (e) {
                                return e in this._entries ? this._entries[e].slice(0) : [];
                            }),
                            (i.has = function (e) {
                                return e in this._entries;
                            }),
                            (i.set = function (e, t) {
                                this._entries[e] = [String(t)];
                            }),
                            (i.forEach = function (e, t) {
                                var o;
                                for (var n in this._entries)
                                    if (this._entries.hasOwnProperty(n)) {
                                        o = this._entries[n];
                                        for (var a = 0; a < o.length; a++) e.call(t, o[a], n, this);
                                    }
                            }),
                            (i.keys = function () {
                                var e = [];
                                return (
                                    this.forEach(function (t, o) {
                                        e.push(o);
                                    }),
                                    o(e)
                                );
                            }),
                            (i.values = function () {
                                var e = [];
                                return (
                                    this.forEach(function (t) {
                                        e.push(t);
                                    }),
                                    o(e)
                                );
                            }),
                            (i.entries = function () {
                                var e = [];
                                return (
                                    this.forEach(function (t, o) {
                                        e.push([o, t]);
                                    }),
                                    o(e)
                                );
                            }),
                            t && (i[Symbol.iterator] = i.entries),
                            (i.toString = function () {
                                var e = [];
                                return (
                                    this.forEach(function (t, o) {
                                        e.push(n(o) + "=" + n(t));
                                    }),
                                    e.join("&")
                                );
                            }),
                            Object.defineProperty(i, "size", {
                                get: function () {
                                    return this._entries ? Object.keys(this._entries).length : 0;
                                },
                            }),
                            (e.URLSearchParams = a));
                    })();
                var i = e.URLSearchParams.prototype;
                ("function" != typeof i.sort &&
                    (i.sort = function () {
                        var e = this,
                            t = [];
                        (this.forEach(function (o, n) {
                            (t.push([n, o]), e._entries || e.delete(n));
                        }),
                            t.sort(function (e, t) {
                                return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
                            }),
                            e._entries && (e._entries = {}));
                        for (var o = 0; o < t.length; o++) this.append(t[o][0], t[o][1]);
                    }),
                    "function" != typeof i._fromString &&
                        Object.defineProperty(i, "_fromString", {
                            enumerable: !1,
                            configurable: !1,
                            writable: !1,
                            value: function (e) {
                                if (this._entries) this._entries = {};
                                else {
                                    var t = [];
                                    this.forEach(function (e, o) {
                                        t.push(o);
                                    });
                                    for (var o = 0; o < t.length; o++) this.delete(t[o]);
                                }
                                var n,
                                    i = (e = e.replace(/^\?/, "")).split("&");
                                for (o = 0; o < i.length; o++)
                                    ((n = i[o].split("=")), this.append(a(n[0]), n.length > 1 ? a(n.slice(1).join("=")) : ""));
                            },
                        }));
            })(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this),
                (function (e) {
                    if (
                        ((function () {
                            try {
                                var t = new e.URL("b", "http://a");
                                return ((t.pathname = "c d"), "http://a/c%20d" === t.href && t.searchParams);
                            } catch (e) {
                                return !1;
                            }
                        })() ||
                            (function () {
                                var t = e.URL,
                                    o = function (t, o) {
                                        ("string" != typeof t && (t = String(t)), o && "string" != typeof o && (o = String(o)));
                                        var n,
                                            a = document;
                                        if (o && (void 0 === e.location || o !== e.location.href)) {
                                            ((o = o.toLowerCase()),
                                                ((n = (a = document.implementation.createHTMLDocument("")).createElement("base")).href = o),
                                                a.head.appendChild(n));
                                            try {
                                                if (0 !== n.href.indexOf(o)) throw new Error(n.href);
                                            } catch (e) {
                                                throw new Error("URL unable to set base " + o + " due to " + e);
                                            }
                                        }
                                        var i = a.createElement("a");
                                        ((i.href = t), n && (a.body.appendChild(i), (i.href = i.href)));
                                        var r = a.createElement("input");
                                        if (
                                            ((r.type = "url"),
                                            (r.value = t),
                                            ":" === i.protocol || !/:/.test(i.href) || (!r.checkValidity() && !o))
                                        )
                                            throw new TypeError("Invalid URL");
                                        Object.defineProperty(this, "_anchorElement", { value: i });
                                        var s = new e.URLSearchParams(this.search),
                                            l = !0,
                                            c = !0,
                                            u = this;
                                        (["append", "delete", "set"].forEach(function (e) {
                                            var t = s[e];
                                            s[e] = function () {
                                                (t.apply(s, arguments), l && ((c = !1), (u.search = s.toString()), (c = !0)));
                                            };
                                        }),
                                            Object.defineProperty(this, "searchParams", { value: s, enumerable: !0 }));
                                        var d = void 0;
                                        Object.defineProperty(this, "_updateSearchParams", {
                                            enumerable: !1,
                                            configurable: !1,
                                            writable: !1,
                                            value: function () {
                                                this.search !== d &&
                                                    ((d = this.search),
                                                    c && ((l = !1), this.searchParams._fromString(this.search), (l = !0)));
                                            },
                                        });
                                    },
                                    n = o.prototype;
                                (["hash", "host", "hostname", "port", "protocol"].forEach(function (e) {
                                    !(function (e) {
                                        Object.defineProperty(n, e, {
                                            get: function () {
                                                return this._anchorElement[e];
                                            },
                                            set: function (t) {
                                                this._anchorElement[e] = t;
                                            },
                                            enumerable: !0,
                                        });
                                    })(e);
                                }),
                                    Object.defineProperty(n, "search", {
                                        get: function () {
                                            return this._anchorElement.search;
                                        },
                                        set: function (e) {
                                            ((this._anchorElement.search = e), this._updateSearchParams());
                                        },
                                        enumerable: !0,
                                    }),
                                    Object.defineProperties(n, {
                                        toString: {
                                            get: function () {
                                                var e = this;
                                                return function () {
                                                    return e.href;
                                                };
                                            },
                                        },
                                        href: {
                                            get: function () {
                                                return this._anchorElement.href.replace(/\?$/, "");
                                            },
                                            set: function (e) {
                                                ((this._anchorElement.href = e), this._updateSearchParams());
                                            },
                                            enumerable: !0,
                                        },
                                        pathname: {
                                            get: function () {
                                                return this._anchorElement.pathname.replace(/(^\/?)/, "/");
                                            },
                                            set: function (e) {
                                                this._anchorElement.pathname = e;
                                            },
                                            enumerable: !0,
                                        },
                                        origin: {
                                            get: function () {
                                                var e = { "http:": 80, "https:": 443, "ftp:": 21 }[this._anchorElement.protocol],
                                                    t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                                                return (
                                                    this._anchorElement.protocol +
                                                    "//" +
                                                    this._anchorElement.hostname +
                                                    (t ? ":" + this._anchorElement.port : "")
                                                );
                                            },
                                            enumerable: !0,
                                        },
                                        password: {
                                            get: function () {
                                                return "";
                                            },
                                            set: function (e) {},
                                            enumerable: !0,
                                        },
                                        username: {
                                            get: function () {
                                                return "";
                                            },
                                            set: function (e) {},
                                            enumerable: !0,
                                        },
                                    }),
                                    (o.createObjectURL = function (e) {
                                        return t.createObjectURL.apply(t, arguments);
                                    }),
                                    (o.revokeObjectURL = function (e) {
                                        return t.revokeObjectURL.apply(t, arguments);
                                    }),
                                    (e.URL = o));
                            })(),
                        void 0 !== e.location && !("origin" in e.location))
                    ) {
                        var t = function () {
                            return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "");
                        };
                        try {
                            Object.defineProperty(e.location, "origin", { get: t, enumerable: !0 });
                        } catch (o) {
                            setInterval(function () {
                                e.location.origin = t();
                            }, 100);
                        }
                    }
                })(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this));
        }).call(this, o(109));
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
        String.prototype.codePointAt ||
            (function () {
                "use strict";
                var e = (function () {
                        try {
                            var e = {},
                                t = Object.defineProperty,
                                o = t(e, e, e) && t;
                        } catch (e) {}
                        return o;
                    })(),
                    t = function (e) {
                        if (null == this) throw TypeError();
                        var t = String(this),
                            o = t.length,
                            n = e ? Number(e) : 0;
                        if ((n != n && (n = 0), !(n < 0 || n >= o))) {
                            var a,
                                i = t.charCodeAt(n);
                            return i >= 55296 && i <= 56319 && o > n + 1 && (a = t.charCodeAt(n + 1)) >= 56320 && a <= 57343
                                ? 1024 * (i - 55296) + a - 56320 + 65536
                                : i;
                        }
                    };
                e ? e(String.prototype, "codePointAt", { value: t, configurable: !0, writable: !0 }) : (String.prototype.codePointAt = t);
            })();
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, o) {
        "use strict";
        (o(58), o(8), o(71));
        const n = o(9),
            a = o(47),
            i = o(457),
            r = o(176),
            s = o(1360),
            l = o(177),
            { TRANSLATION_MANAGER: c, gApi: u } = o(10),
            d = n.getAvailableLanguages(),
            p = function (e) {
                const t = () =>
                    new Promise((e) => {
                        !(function (e, t) {
                            var o = window.localStorage.getItem(e) || null;
                            t(o ? JSON.parse(o) : null);
                        })("designer.settings", (t) => {
                            if (t && t.hasOwnProperty("language")) {
                                const e = t.language;
                                if (d.indexOf(e) >= 0) (n.setLanguage(e), u.setLanguage(e));
                                else {
                                    let e = r.language && n.lookupLanguage(r.language);
                                    e && d.includes(e)
                                        ? (n.setLanguage(e), u.setLanguage(e))
                                        : (n.setLanguage(i.English), u.setLanguage(i.English));
                                }
                            }
                            e();
                        });
                    });
                u.getUser()
                    .then(async (o) => {
                        const a = new l(o);
                        if (a && !a.isAnonymous()) {
                            const e = n.lookupLanguage(a.locale);
                            null != e &&
                                (d.indexOf(e) >= 0
                                    ? (gDesigner.setSetting("language", e), n.setLanguage(e), u.setLanguage(e))
                                    : (n.setLanguage(i.English), u.setLanguage(i.English)));
                        } else await t();
                        e && e();
                    })
                    .catch(async () => {
                        (await t(), e && e());
                    });
            };
        window.addEventListener("load", () => {
            (c.CONSIDER_EXTENSION && n.enableExtension(),
                s.init(),
                $(".title > span:first-child").text(n.get(new a("GCommonNames", "text.maintenance-title"))),
                $(".title > span:last-child").text(n.get(new a("GCommonNames", "text.maintenance-info"))),
                p(function () {
                    ($(".title > span:first-child").text(n.get(new a("GCommonNames", "text.maintenance-title"))),
                        $(".title > span:last-child").text(n.get(new a("GCommonNames", "text.maintenance-info"))));
                }));
        });
    },
    function (e, t, o) {
        "use strict";
        const n = o(9),
            a = o(457);
        e.exports = new (class {
            init() {
                const e = window.parent && window.parent.gContainer;
                e
                    ? e.getProperty("designer.settings").then((t) => {
                          if (t && t.hasOwnProperty("language")) {
                              var o = t.language;
                              e.constructor.GravitLanguages.indexOf(o) >= 0 ? n.setLanguage(o) : n.setLanguage(a.English);
                          } else n.setLanguage(a.English);
                      })
                    : n.setLanguage(a.English);
            }
        })();
    },
]);
