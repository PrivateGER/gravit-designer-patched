module.exports = function (module, exports, require) {
            var n = require(197),
                IsFiniteNonNegativeNumber = require(0),
                o = require(602),
                a = require(90),
                s = require(1143),
                l = require(800),
                h = require(856),
                A = function () {
                    ((this._collection = new o()), (this.dictionary = new n()));
                };
            (IsFiniteNonNegativeNumber.inherit(A, a),
                (A.prototype._collection = null),
                (A.prototype.add = function (e, t) {
                    this._collection.add(e, t);
                }),
                (A.prototype.getCollection = function () {
                    return this._collection;
                }),
                (A.prototype.write = function (e) {
                    var t = new s();
                    (this._collection.write(t), new l(new h(t.asArray())).write(e));
                }),
                (module.exports = A));
        };
