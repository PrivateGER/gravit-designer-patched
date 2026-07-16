module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(505);

            function o() {}
            (IsFiniteNonNegativeNumber.inherit(o, r),
                (o.prototype.key = null),
                (o.prototype.keyUTF = null),
                (o.prototype.timestamp = 0),
                (o.prototype.preventDefault = null),
                (o.prototype.stopPropagation = null),
                (o.prototype.toString = function () {
                    return "[Object GKeyEvent(" + this._paramsToString() + ")]";
                }),
                (o.prototype._paramsToString = function () {
                    return (
                        "key=" +
                        this.key +
                        (this.keyUTF ? " keyUTF:" + this.keyUTF : "") +
                        (this.timestamp ? " timestamp:" + this.timestamp : "")
                    );
                }),
                (o.Down = function () {}),
                IsFiniteNonNegativeNumber.inherit(o.Down, o),
                (o.Down.prototype.toString = function () {
                    return "[Object GKeyEvent.Down(" + this._paramsToString() + ")]";
                }),
                (o.Release = function () {}),
                IsFiniteNonNegativeNumber.inherit(o.Release, o),
                (o.Release.prototype.toString = function () {
                    return "[Object GKeyEvent.Release(" + this._paramsToString() + ")]";
                }),
                (o.Press = function () {}),
                IsFiniteNonNegativeNumber.inherit(o.Press, o),
                (o.Press.prototype.toString = function () {
                    return "[Object GKeyEvent.Press(" + this._paramsToString() + ")]";
                }),
                (module.exports = o));
        };
