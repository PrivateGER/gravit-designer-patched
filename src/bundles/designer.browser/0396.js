module.exports = function (module, exports, require) {
        "use strict";
        var o = {}.propertyIsEnumerable,
            i = Object.getOwnPropertyDescriptor,
            a = i && !o.call({ 1: 2 }, 1);
        exports.f = a
            ? function (e) {
                  var t = i(this, e);
                  return !!t && t.enumerable;
              }
            : o;
    };
