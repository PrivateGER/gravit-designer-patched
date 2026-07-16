module.exports = function (module, exports, require) {
            "use strict";
            var n = require(269);

            function r() {}
            ((r.prototype._listeners = null),
                (r.prototype.temporaryReceiver = false),
                (r.prototype.addEventListener = function (e, t, i, r, o) {
                    var a = n.getTypeId(e);
                    this._listeners || (this._listeners = {});
                    var s = t;
                    if (i || r) {
                        var l = r ? r.slice() : [];
                        (l.unshift(i || t), (t = Function.prototype.bind.apply(t, l)));
                    }
                    (a in this._listeners ||
                        (this._listeners[a] = {
                            eventClass: e,
                            listeners: [],
                        }),
                        o
                            ? this._listeners[a].listeners.unshift({
                                  listener: t,
                                  sourceListener: s,
                                  target: i,
                                  registered: true,
                              })
                            : this._listeners[a].listeners.push({
                                  listener: t,
                                  sourceListener: s,
                                  target: i,
                                  registered: true,
                              }));
                }),
                (r.prototype.removeEventListener = function (e, t, i) {
                    var r = n.getTypeId(e),
                        o = false;
                    if (this._listeners && r in this._listeners) {
                        for (var a = this._listeners[r].listeners, s = 0; s < a.length; ++s)
                            a[s].sourceListener != t || (i && a[s].target !== i) || ((a[s].registered = false), a.splice(s, 1), (o = true), --s);
                        0 == a.length && delete this._listeners[r];
                    }
                    return o;
                }),
                (r.prototype.hasEventListeners = function (e) {
                    return !(!this._listeners || !(n.getTypeId(e) in this._listeners));
                }),
                (r.prototype.trigger = function (e) {
                    if (((e.sender = this), this._listeners)) {
                        var t = n.getTypeId(e);
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
