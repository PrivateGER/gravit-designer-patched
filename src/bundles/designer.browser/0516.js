module.exports = function (e, t) {
        var n = {}.toString;
        e.exports =
            Array.isArray ||
            function (e) {
                return "[object Array]" == n.call(e);
            };
    };
