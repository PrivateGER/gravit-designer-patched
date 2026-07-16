module.exports = function (module, exports, require) {
            "use strict";
            (require(58), require(71));
            const { UNKNOWN: n, IN_REVIEW: r, AWAITING_APPROVAL: o, APPROVED: a, REOPENED: s } = require(586),
                l = Object.freeze({
                    [n]: [r],
                    [r]: [o],
                    [o]: [r, s, a],
                    [s]: [r, o],
                    [a]: [r, s],
                });

            function h(e) {
                ((this._currentStatus = e), (this._flow = l[e]));
            }
            ((h.prototype.canMoveTo = function (e) {
                return this._flow.includes(e);
            }),
                (module.exports = h));
        };
