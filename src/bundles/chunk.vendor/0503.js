module.exports = function (module, exports, require) {
            var n = require(42);

            function r(e) {
                n.call(
                    this,
                    e,
                    null,
                    "        uniform highp sampler2D texture;        varying highp vec2 texCoord;        void main() {            vec2 uv = texCoord;            vec4 color = texture2D(texture,vec2(uv.x,-uv.y+0.5*sin(uv.x*4.0)));            gl_FragColor = color;        }    "
                );
            }
            (require(0 /* IsFiniteNonNegativeNumber */).inherit(r, n),
                (r.prototype.render = function (e, t) {
                    this.simpleShader.call(this, {});
                }),
                (module.exports = r));
        };
