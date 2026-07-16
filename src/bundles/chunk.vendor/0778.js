module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(280),
                o = require(779),
                a = require(553);

            function s() {
                (r.call(this), (this._styleEdManager = new o()), (this._toolManager = new a()));
            }
            (IsFiniteNonNegativeNumber.inherit(s, r),
                (s.prototype._styleEdManager = null),
                (s.prototype._toolManager = null),
                (s.prototype.getStyleEdManager = function () {
                    return this._styleEdManager;
                }),
                (s.prototype.getToolManager = function () {
                    return this._toolManager;
                }),
                (module.exports = s));
        };
