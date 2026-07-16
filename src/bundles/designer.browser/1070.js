module.exports = function (module, exports, require) {
        "use strict";
        require(30);
        const { GObject } = require(1 /* GObject */);
        class i {
            constructor(e) {
                Object.assign(this, e);
            }
        }
        (GObject.inherit(i, GObject),
            (i.prototype.applyFrom = function (e) {
                Object.assign(this, e);
            }),
            (module.exports = i));
    };
