module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0);

            function r() {}
            ((r.prototype._listeners = null),
                (r.prototype.temporaryReceiver = false),
                (r.prototype.addEventListener = function (e, t, i, r, o, a) {
                    var s = IsFiniteNonNegativeNumber.getTypeId(e);
                    this._listeners || (this._listeners = {});
                    var l = t;
                    if (i || r) {
                        var h = r ? r.slice() : [];
                        (h.unshift(i || t), (t = Function.prototype.bind.apply(t, h)));
                    }
                    (s in this._listeners ||
                        (this._listeners[s] = {
                            eventClass: e,
                            listeners: [],
                        }),
                        o
                            ? this._listeners[s].listeners.unshift({
                                  listener: t,
                                  sourceListener: l,
                                  target: i,
                                  registered: true,
                                  persistent: a,
                              })
                            : this._listeners[s].listeners.push({
                                  listener: t,
                                  sourceListener: l,
                                  target: i,
                                  registered: true,
                                  persistent: a,
                              }));
                }),
                (r.prototype.removeEventListener = function (e, t, i) {
                    var r = IsFiniteNonNegativeNumber.getTypeId(e),
                        o = false;
                    if (this._listeners && r in this._listeners) {
                        for (var a = this._listeners[r].listeners, s = 0; s < a.length; ++s)
                            a[s].sourceListener != t || (i && a[s].target !== i) || ((a[s].registered = false), a.splice(s, 1), (o = true), --s);
                        0 == a.length && delete this._listeners[r];
                    }
                    return o;
                }),
                (r.prototype.removeAllEventListeners = function (e) {
                    if (this._listeners) {
                        var t = Object.keys(this._listeners);
                        if (t.length > 0)
                            for (var i = t.length - 1; i >= 0; i--) {
                                for (var n = this._listeners[t[i]], r = n.listeners.length - 1; r >= 0; r--) {
                                    var o = n.listeners[r];
                                    (!e && o.persistent) || ((o.registered = false), n.listeners.splice(r, 1));
                                }
                                0 === n.listeners.length && delete this._listeners[t[i]];
                            }
                    }
                }),
                (r.prototype.hasEventListeners = function (e) {
                    return !(!this._listeners || !(IsFiniteNonNegativeNumber.getTypeId(e) in this._listeners));
                }),
                (r.prototype.trigger = function (e) {
                    if (((e.sender = this), this._listeners)) {
                        var t = IsFiniteNonNegativeNumber.getTypeId(e);
                        if (t in this._listeners)
                            for (var i = this._listeners[t].listeners.slice(), r = 0; r < i.length; r++) {
                                var o = i[r];
                                if (o.registered) {
                                    if (e.isImmediatePropagationStopped) break;
                                    o.listener.call(this, e);
                                }
                            }
                    }
                }),
                (module.exports = r));
        };
