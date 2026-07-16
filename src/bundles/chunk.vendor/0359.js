module.exports = function (module, exports, require) {
            var n = require(1109),
                r = require(559),
                o = require(1111),
                a = require(390),
                s = {
                    RGB: {
                        name: "/DeviceRGB",
                        operator: "rg",
                        length: 3,
                        parseColor: function (e) {
                            return new r(e);
                        },
                        fromRGBA: function (e, t, i, n) {
                            return [e, t, i];
                        },
                    },
                    RGBA: {
                        name: "/DeviceRGB",
                        operator: "rg",
                        length: 4,
                        parseColor: function (e) {
                            return new r(e);
                        },
                        fromRGBA: function (e, t, i, n) {
                            return [e, t, i, n];
                        },
                    },
                    GRAY: {
                        name: "/DeviceGray",
                        operator: "g",
                        length: 1,
                        parseColor: function (e) {
                            return new o(e);
                        },
                        fromRGBA: function (e, t, i, n) {
                            return [n];
                        },
                    },
                    CMYK: {
                        name: "/DeviceCMYK",
                        operator: "k",
                        length: 4,
                        parseColor: function (e) {
                            return new n(e);
                        },
                        fromRGBA: function (e, t, i, n) {
                            var r = (e << 24) | (t << 16) | (i << 8) | n,
                                o = s._cmykToRGB[r];
                            return (
                                o ||
                                    ((o = a.rgbToCMYK(r).map(function (e) {
                                        return 255 * e;
                                    })),
                                    (s._cmykToRGB[r] = o)),
                                o
                            );
                        },
                    },
                    _cmykToRGB: {},
                };
            module.exports = s;
        };
