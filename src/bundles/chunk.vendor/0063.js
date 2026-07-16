module.exports = function (module, exports, require) {
            var n = require(87),
                r = require(48);

            function o(e, t) {
                ((this._source = e), (this._transform = t));
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(o, n),
                (o.transformVertex = function (e, t) {
                    if (t)
                        switch (e.command) {
                            case r.Command.Move:
                            case r.Command.Line:
                            case r.Command.Curve:
                            case r.Command.Curve2:
                                t.map(e);
                                break;
                            case r.Command.Close:
                                break;
                            default:
                                throw new Error("Unknown vertex command: " + e.command.toString());
                        }
                }),
                (o.prototype._source = null),
                (o.prototype._transform = null),
                (o.prototype.getTransform = function () {
                    return this._transform;
                }),
                (o.prototype.setTransform = function (e) {
                    this._transform = e;
                }),
                (o.prototype.rewindVertices = function (e) {
                    return this._source.rewindVertices(e);
                }),
                (o.prototype.readVertex = function (e) {
                    return !!this._source.readVertex(e) && (o.transformVertex(e, this._transform), true);
                }),
                (o.prototype.hasVertexForRead = function () {
                    return this._source.hasVertexForRead();
                }),
                (o.prototype.toString = function () {
                    return "[Object GVertexTransformer]";
                }),
                (module.exports = o));
        };
