module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            GCommonNames = require(119);
        module.exports = function (e) {
            ((e.CommercialProduct = function (t, n, o, i) {
                e.Item.call(this, t, n, o, i);
            }),
                GObject.GObject.inherit(e.CommercialProduct, e.Item),
                (e.CommercialProduct.prototype.read = function (e, t, n) {
                    GCommonNames.loadDesignData(this._id, false)
                        .then((t) => {
                            e(t.data);
                        })
                        .catch(t);
                }),
                (e.CommercialProduct.prototype.getPrice = async function () {
                    throw Error("Not implemented");
                }),
                (e.CommercialProduct.prototype.getFormattedPrice = async function () {
                    throw Error("Not implemented");
                }));
        };
    };
