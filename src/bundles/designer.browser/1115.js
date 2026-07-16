module.exports = function (module, exports, require) {
        (function (e) {
            var o = (void 0 !== e && e) || ("undefined" != typeof self && self) || window,
                i = Function.prototype.apply;
            function a(e, t) {
                ((this._id = e), (this._clearFn = t));
            }
            ((exports.setTimeout = function () {
                return new a(i.call(setTimeout, o, arguments), clearTimeout);
            }),
                (exports.setInterval = function () {
                    return new a(i.call(setInterval, o, arguments), clearInterval);
                }),
                (exports.clearTimeout = exports.clearInterval =
                    function (e) {
                        e && e.close();
                    }),
                (a.prototype.unref = a.prototype.ref = function () {}),
                (a.prototype.close = function () {
                    this._clearFn.call(o, this._id);
                }),
                (exports.enroll = function (e, t) {
                    (clearTimeout(e._idleTimeoutId), (e._idleTimeout = t));
                }),
                (exports.unenroll = function (e) {
                    (clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1));
                }),
                (exports._unrefActive = exports.active =
                    function (e) {
                        clearTimeout(e._idleTimeoutId);
                        var t = e._idleTimeout;
                        t >= 0 &&
                            (e._idleTimeoutId = setTimeout(function () {
                                e._onTimeout && e._onTimeout();
                            }, t));
                    }),
                require(1116),
                (exports.setImmediate =
                    ("undefined" != typeof self && self.setImmediate) || (void 0 !== e && e.setImmediate) || (this && this.setImmediate)),
                (exports.clearImmediate =
                    ("undefined" != typeof self && self.clearImmediate) ||
                    (void 0 !== e && e.clearImmediate) ||
                    (this && this.clearImmediate)));
        }).call(this, require(109));
    };
