module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const o = require(75),
            IsFiniteNonNegativeNumber = require(0),
            a = require(1174);
        function r() {}
        (IsFiniteNonNegativeNumber.inherit(r, o),
            (r.prototype.render = async function (e, t) {
                throw "Not implemented!";
            }),
            (r.prototype._triggerEvent = async function (e, t) {
                this.hasEventListeners(a) && this.trigger(new a(e, t));
            }),
            (module.exports = r));
    };
