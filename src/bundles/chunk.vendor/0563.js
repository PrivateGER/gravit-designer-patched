module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(60),
                o = require(439),
                a = require(1134),
                s = require(601);

            function l() {
                o.apply(this, arguments);
            }
            (IsFiniteNonNegativeNumber.inherit(l, o),
                (l.prototype.parse = function (e, t) {
                    var i = this._getTransform();
                    ((this._node = a.generatePath(
                        this._data.path,
                        i,
                        this._data.path.isClosed,
                        s.parse(this._data.frame),
                        this._data.fixedRadius
                    )),
                        (this._data.noTransform = true),
                        this._node &&
                            (this._node.setProperty("csc", true),
                            this._node.setProperty("evenodd", this.isEvenOdd()),
                            o.prototype.parse.call(this, true, t)));
                }),
                (l.prototype._getRelatedNodeClass = function () {
                    return r;
                }),
                (module.exports = l));
        };
