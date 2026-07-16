module.exports = function (module, exports, require) {
        "use strict";
        let o;
        (require(19), require(8 /* Symbol */), require(26));
        class i {
            static async getInstance() {
                if (!o) {
                    const e = await require.e(12).then(require.t.bind(null, 1740, 7));
                    o = e.default;
                }
                return new i();
            }
            parse(e) {
                return o({ blob: e });
            }
        }
        module.exports = i;
    };
