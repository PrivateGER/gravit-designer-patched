module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(4), require(13), require(26));
            const { Events, EventProperties, UserProperties } = require(431),
                a = require(979);
            module.exports = class {
                constructor(e) {
                    let { userId, apiKey } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    ((this._userId = userId), (this._amplitude = e), apiKey && this.init(apiKey));
                }
                init(e) {
                    if (!a.Env.isTest())
                        try {
                            this._amplitude.init(e);
                        } catch (e) {
                            console.log(e);
                        }
                }
                logEvent(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    try {
                        this._amplitude.track(e, this._formatProperties(e, t), {
                            user_id: t.userId || this._userId,
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }
                updateUserProperties(e, t, i) {
                    try {
                        const n = new this._amplitude.Identify();
                        if (e) for (let [t, i] of Object.entries(e)) n.set(t, i);
                        (t &&
                            (n.set(UserProperties.PRODUCT_LICENSE_TYPE, t.userType || t.getSubscriberUserType()),
                            n.set(UserProperties.PRODUCT_LICENSE_STATUS, t.userStatus || t.getSubscriberUserStatus())),
                            this._amplitude.identify(n, {
                                user_id: i || this._userId,
                            }));
                    } catch (e) {
                        console.error(e);
                    }
                }
                _formatProperties(e, t) {
                    if (!Object.keys(t).length) return t;
                    const i = {},
                        o = Object.keys(Events).find((t) => Events[t] === e);
                    if (EventProperties[o]) for (let [e, n] of Object.entries(EventProperties[o])) t.hasOwnProperty(e) && (i[n] = t[e]);
                    return i;
                }
            };
        };
