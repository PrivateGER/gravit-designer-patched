module.exports = function (module, exports, require) {
            var n = require(5),
                r = require(338),
                o = require(90),
                IsFiniteNonNegativeNumber = require(0),
                s = function (e) {
                    this._pageSize = e.getPageSize();
                };
            (IsFiniteNonNegativeNumber.inherit(s, o),
                (s.prototype._pageSize = null),
                (s.prototype._y = function (e) {
                    return this._pageSize.relativeY(e);
                }),
                (s.prototype._x = function (e) {
                    return r.normalizeNumber(e);
                }),
                (s.PointTo = function (e, t, i, r) {
                    (s.call(this, e), (this._point = new n(i, r)), (this._operator = t));
                }),
                IsFiniteNonNegativeNumber.inherit(s.PointTo, s),
                (s.PointTo.prototype.getPoint = function () {
                    return this._point;
                }),
                (s.PointTo.prototype.write = function (e) {
                    Number.isNaN(this._point.getX()) ||
                        Number.isNaN(this._point.getY()) ||
                        (e.write(this._x(this._point.getX())),
                        e.writeSpace(),
                        e.write(this._y(this._point.getY())),
                        e.writeSpace(),
                        e.write(this._operator));
                }),
                (s.MoveTo = function (e, t, i) {
                    s.PointTo.call(this, e, "m", t, i);
                }),
                IsFiniteNonNegativeNumber.inherit(s.MoveTo, s.PointTo),
                (s.LineTo = function (e, t, i) {
                    s.PointTo.call(this, e, "l", t, i);
                }),
                IsFiniteNonNegativeNumber.inherit(s.LineTo, s.PointTo),
                (s.BezierCurveTo = function (e, t, i, r, o, a, l) {
                    (s.call(this, e), (this._point1 = new n(t, i)), (this._point2 = new n(r, o)), (this._point3 = new n(a, l)));
                }),
                IsFiniteNonNegativeNumber.inherit(s.BezierCurveTo, s),
                (s.BezierCurveTo.prototype.getPoint1 = function () {
                    return this._point1;
                }),
                (s.BezierCurveTo.prototype.getPoint2 = function () {
                    return this._point2;
                }),
                (s.BezierCurveTo.prototype.getPoint3 = function () {
                    return this._point3;
                }),
                (s.BezierCurveTo.prototype.write = function (e) {
                    Number.isNaN(this._point1.getX()) ||
                        Number.isNaN(this._point1.getY()) ||
                        Number.isNaN(this._point2.getX()) ||
                        Number.isNaN(this._point2.getY()) ||
                        Number.isNaN(this._point3.getX()) ||
                        Number.isNaN(this._point3.getY()) ||
                        (e.write(this._x(this._point1.getX())),
                        e.writeSpace(),
                        e.write(this._y(this._point1.getY())),
                        e.writeSpace(),
                        e.write(this._x(this._point2.getX())),
                        e.writeSpace(),
                        e.write(this._y(this._point2.getY())),
                        e.writeSpace(),
                        e.write(this._x(this._point3.getX())),
                        e.writeSpace(),
                        e.write(this._y(this._point3.getY())),
                        e.writeSpace(),
                        e.write("c"));
                }),
                (module.exports = s));
        };
