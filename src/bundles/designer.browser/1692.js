module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */),
            (function () {
                function e() {
                    return new Promise((e, t) => {
                        const n = new FileReader();
                        ((n.onload = () => {
                            e(n.result);
                        }),
                            (n.onerror = t),
                            n.readAsArrayBuffer(this));
                    });
                }
                ("File" in self && (File.prototype.arrayBuffer = File.prototype.arrayBuffer || e),
                    "Blob" in self && (Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || e));
            })());
    };
