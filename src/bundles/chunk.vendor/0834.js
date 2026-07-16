module.exports = function (module, exports, require) {
            "use strict";
            require(30);
            const {
                TYPES: { TYPE },
                ACTIONS: { ACTION },
            } = require(585);
            class o {
                constructor(e) {
                    Object.assign(this, e);
                }
                getAction() {
                    return this.change & ACTION;
                }
                getType() {
                    return this.change & TYPE;
                }
            }
            ((o.from = function (e) {
                return new o(e);
            }),
                (module.exports = o));
        };
