module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(211);

            function o() {}
            (require(274),
                IsFiniteNonNegativeNumber.inherit(o, r),
                (o.prototype.getDefaultStyle = function () {
                    var e = this._scene
                        ? this._scene.getStyles().querySingle('style[_sdf="' + IsFiniteNonNegativeNumber.getTypeId(this._getRelatedItemClass()) + '"]')
                        : null;
                    return e || null;
                }),
                (o.prototype._getRelatedItemClass = function () {
                    throw new Error("GItemTool.getRelatedItemClass: virtual method");
                }),
                (o.prototype.toString = function () {
                    return "[Object GItemTool]";
                }),
                (module.exports = o));
        };
