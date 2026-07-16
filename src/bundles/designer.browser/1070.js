module.exports = function (module, exports, require) {
        "use strict";
        require(30);
        const { GObject: o } = require(1 /* GObject */);
        class i {
            constructor(e) {
                Object.assign(this, e);
            }
        }
        (o.inherit(i, o),
            (i.prototype.applyFrom = function (e) {
                Object.assign(this, e);
            }),
            (module.exports = i));
    };
