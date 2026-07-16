module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(168 /* PDFFetchStream */), require(30), require(4), require(322), require(13), require(169 /* PDFNetworkStream */), require(26));
            const GShareRoles = require(287),
                r = require(352);
            class o {
                static get ALL_PERMISSIONS_DENIED() {
                    return Object.values(r).reduce(
                        (e, t) =>
                            Object.assign(e, {
                                [t]: false,
                            }),
                        {}
                    );
                }
                static newFromPermissions() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e[r.OWNER]) return GShareRoles.Owner;
                    if (!e[r.ACCESS]) return GShareRoles.NoAccess;
                    const t = Object.assign(
                            {},
                            o.ALL_PERMISSIONS_DENIED,
                            Object.entries(e).reduce((e, t) => {
                                let [i, n] = t;
                                return Object.assign(e, {
                                    [i]: n || false,
                                });
                            }, {})
                        ),
                        i = Object.keys(t).length,
                        a = Object.values(GShareRoles).find((e) => {
                            let { permissions } = e;
                            const r = Object.entries(Object.assign({}, o.ALL_PERMISSIONS_DENIED, permissions));
                            if (r.length === i)
                                return r.every((e) => {
                                    let [i, n] = e;
                                    return t[i] === n;
                                });
                        });
                    return a || (e[r.COPY] ? GShareRoles.Developer : GShareRoles.Viewer);
                }
            }
            module.exports = o;
        };
