module.exports = function (module, exports, require) {
            "use strict";
            require(30);
            const {
                TYPES: { TYPE: n },
                ACTIONS: { ACTION: r },
            } = require(585);
            class o {
                constructor(e) {
                    Object.assign(this, e);
                }
                getAction() {
                    return this.change & r;
                }
                getType() {
                    return this.change & n;
                }
            }
            ((o.from = function (e) {
                return new o(e);
            }),
                (module.exports = o));
        };
