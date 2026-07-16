module.exports = function (module, exports) {
        module.exports = function () {
            throw new Error("define cannot be used indirect");
        };
    };
