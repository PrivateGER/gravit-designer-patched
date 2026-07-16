module.exports = function (module, exports, require) {
            "use strict";
            (require(58), require(71));
            const { UNKNOWN, IN_REVIEW, AWAITING_APPROVAL, APPROVED, REOPENED } = require(586),
                l = Object.freeze({
                    [UNKNOWN]: [IN_REVIEW],
                    [IN_REVIEW]: [AWAITING_APPROVAL],
                    [AWAITING_APPROVAL]: [IN_REVIEW, REOPENED, APPROVED],
                    [REOPENED]: [IN_REVIEW, AWAITING_APPROVAL],
                    [APPROVED]: [IN_REVIEW, REOPENED],
                });

            function h(e) {
                ((this._currentStatus = e), (this._flow = l[e]));
            }
            ((h.prototype.canMoveTo = function (e) {
                return this._flow.includes(e);
            }),
                (module.exports = h));
        };
