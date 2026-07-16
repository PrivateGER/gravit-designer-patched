module.exports = function (module, exports, require) {
            "use strict";
            (require(58 /* polyfill:Array */), require(19), require(168 /* PDFFetchStream */), require(30 /* polyfill:Object */), require(71 /* polyfill:String */), require(4), require(41), require(13), require(169 /* PDFNetworkStream */), require(26));
            const n = require(352),
                GShareRoles = require(287),
                o = require(950),
                { share: { pro: a = false } = {} } = require(253);
            class s {
                static isPro() {
                    return !!a;
                }
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object.assign(this, e);
                }
                getRole() {
                    if (this.role) {
                        const e = Object.values(GShareRoles).find((e) => {
                            let { id } = e;
                            return id === this.role;
                        });
                        if (e) return e;
                    }
                    return o.newFromPermissions(this.getPermissions());
                }
                getPermissions() {
                    const e = Object.values(n);
                    return Object.assign(
                        {},
                        o.ALL_PERMISSIONS_DENIED,
                        Object.entries(this)
                            .filter((t) => {
                                let [i] = t;
                                return e.includes(i);
                            })
                            .reduce((e, t) => {
                                let [i, n] = t;
                                return Object.assign(e, {
                                    [i]: n || false,
                                });
                            }, {})
                    );
                }
                isPublic() {
                    return !!this.token;
                }
                getToken() {
                    return this.token;
                }
                assignRole(e) {
                    return new s(
                        Object.assign({}, this, o.ALL_PERMISSIONS_DENIED, e.permissions, {
                            role: e.id,
                        })
                    );
                }
            }
            module.exports = s;
        };
