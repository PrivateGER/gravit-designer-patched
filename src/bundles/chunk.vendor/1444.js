module.exports = function (module, exports, require) {
            var n = require(2),
                IsFiniteNonNegativeNumber = require(0),
                o = require(228),
                GScenePaintConfiguration = require(133),
                s = require(1219),
                l = require(1445);

            function h(e) {
                ((this._context2d = e),
                    (this.canvas = new l(this._context2d)),
                    (this.configuration = new A()),
                    (this._context2d.canvas = this.canvas),
                    (this.canvas._canvasContext = e),
                    (this._nodeStack = []),
                    (this.canvasStack = [this.canvas]),
                    (this.canvas._paintContext = this),
                    (this.outlineColors = []));
            }

            function A() {
                Object.assign(this, {
                    paintMode: GScenePaintConfiguration.PaintMode.Full,
                    ignoreEffects: true,
                    annotations: false,
                    enableFxCache: false,
                    defaultEffectDetailLevel: 1,
                    sceneBackground: true,
                    multiPageView: false,
                    thumbnails: false,
                    isOutline: function () {
                        return false;
                    },
                    isClipToPage: function () {
                        return false;
                    },
                    isSlicesVisible: function () {
                        return false;
                    },
                });
            }
            (IsFiniteNonNegativeNumber.inherit(h, o),
                (A.prototype.isAnnotationsVisible = function (e) {
                    return !!this.annotations;
                }),
                (A.prototype.isElementAnnotationsVisible = function (e) {
                    return !!this.annotations;
                }),
                (h.prototype._nodeStack = null),
                (h.prototype.beginNode = function (e) {
                    (this._nodeStack.push(e), this.canvas.getGraphics().add(new s(e, s.Type.BEGIN)));
                }),
                (h.prototype.endNode = function (e) {
                    (this._nodeStack.pop(), this.canvas.getGraphics().add(new s(e, s.Type.END)));
                }),
                (h.prototype.getCurrentNode = function () {
                    return this._nodeStack.slice(-1).pop() || new n();
                }),
                (h.prototype.toString = function () {
                    return "[Object GPDFPaintContext]";
                }),
                (module.exports = h));
        };
