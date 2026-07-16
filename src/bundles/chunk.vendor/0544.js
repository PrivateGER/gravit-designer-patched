module.exports = function (module, exports, require) {
            var n = require(99),
                IsFiniteNonNegativeNumber = require(0),
                o = require(132),
                a = require(6),
                s = require(210),
                l = require(12);

            function h(e) {
                (n.call(this, e),
                    this.getAllowedSnapZones().forEach(
                        function (e) {
                            e !== a.Side.TOP_LEFT && this.disallowSnapZone(e);
                        }.bind(this)
                    ));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(h, n, [n.Map, n.DetailMap]),
                (h.ID = "guide.full-pixels"),
                (h.prototype.getId = function () {
                    return h.ID;
                }),
                (h.prototype.map = function (e, t) {
                    if (this._scene.getProperty("ut") === o.Unit.PX) {
                        var i = l.round(e, true),
                            n = l.round(t, true);
                        return {
                            x: {
                                value: i,
                                guide: null,
                                delta: Math.abs(e - i),
                            },
                            y: {
                                value: n,
                                guide: null,
                                delta: Math.abs(t - n),
                            },
                        };
                    }
                    return null;
                }),
                (h.prototype.isMappingAllowed = function (e) {
                    return !s.options.disabled && e !== n.DetailMap.Mode.DetailOffFilterOn;
                }),
                (h.prototype.isFullPixelsGuide = function () {
                    return true;
                }),
                (h.prototype.toString = function () {
                    return "[Object GFullPixelsGuide]";
                }),
                (module.exports = h));
        };
