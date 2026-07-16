module.exports = function (module, exports, require) {
            var n = require(48);

            function r() {}
            ((r.prototype.addVertex = function (e, t, i) {
                throw new Error("Not Supported");
            }),
                (r.prototype.appendVertices = function (e, t) {
                    if (e.rewindVertices(t || 0)) for (var i = new n(); e.readVertex(i); ) this.addVertex(i.command, i.x, i.y);
                }),
                (r.prototype.clearVertices = function () {
                    throw new Error("Not Supported.");
                }),
                (r.prototype.toString = function () {
                    return "[Object GVertexTarget]";
                }),
                (module.exports = r));
        };
