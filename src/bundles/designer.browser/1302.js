module.exports = function (module, exports, require) {
        "use strict";
        var o = setInterval(function () {
            navigator.onLine && ($(document).trigger("networkAvailable"), clearInterval(o));
        }, 2e4);
        exports.youtubePlaylist = "https://www.youtube.com/playlist?list=PLqsk_4aqUvEYxmy5NpQakcZXa6_3w-I8F";
    };
