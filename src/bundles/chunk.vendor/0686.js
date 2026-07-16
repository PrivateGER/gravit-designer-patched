module.exports = function (module, exports, require) {
            "use strict";

            function n() {}
            var r;
            (require(19),
                require(180),
                require(181),
                require(20),
                require(151),
                require(692),
                require(189),
                require(190),
                require(191),
                require(192),
                (n.OperatingSystem = {
                    Unix: 0,
                    Windows: 1,
                    OSX_IOS: 2,
                }),
                (n.Hardware = {
                    Desktop: 10,
                    Tablet: 20,
                    Phone: 30,
                }),
                (n.littleEndian = true),
                (n.operatingSystem = null),
                (n.hardware = null),
                (n.language = null),
                (n.littleEndian =
                    ((r = new ArrayBuffer(8)),
                    (new Uint32Array(r)[1] = 168496141),
                    !(10 === r[4] && 11 === r[5] && 12 === r[6] && 13 === r[7]))),
                (n.hardware = (function () {
                    if ("undefined" == typeof navigator) return n.Hardware.Desktop;
                    var e = !!navigator.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i),
                        t = !!navigator.userAgent.match(
                            /(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i
                        );
                    return e ? n.Hardware.Tablet : t ? n.Hardware.Phone : n.Hardware.Desktop;
                })()),
                (n.operatingSystem = (function () {
                    if ("undefined" == typeof navigator) return n.Hardware.Linux;
                    for (
                        var e = [
                                {
                                    string: navigator.platform,
                                    subString: "Win",
                                    identity: n.OperatingSystem.Windows,
                                },
                                {
                                    string: navigator.platform,
                                    subString: "Mac",
                                    identity: n.OperatingSystem.OSX_IOS,
                                },
                                {
                                    string: navigator.userAgent,
                                    subString: "iPhone",
                                    identity: n.OperatingSystem.OSX_IOS,
                                },
                                {
                                    string: navigator.userAgent,
                                    subString: "iPad",
                                    identity: n.OperatingSystem.OSX_IOS,
                                },
                                {
                                    string: navigator.userAgent,
                                    subString: "Android",
                                    identity: n.OperatingSystem.Unix,
                                },
                                {
                                    string: navigator.platform,
                                    subString: "Linux",
                                    identity: n.OperatingSystem.Unix,
                                },
                            ],
                            t = 0;
                        t < e.length;
                        t++
                    ) {
                        if (-1 != e[t].string.indexOf(e[t].subString)) return e[t].identity;
                    }
                    return n.OperatingSystem.Windows;
                })()),
                (n.language = (function () {
                    if ("undefined" == typeof navigator) return null;
                    var e = (
                        navigator.language ||
                        navigator.browserLanguage ||
                        navigator.systemLanguage ||
                        navigator.userLanguage ||
                        ""
                    ).split("-");
                    return 2 == e.length || e ? e[0].toLowerCase() : null;
                })()),
                (n.fullLanguage = (function () {
                    if ("undefined" == typeof navigator) return null;
                    var e = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
                    return e ? e.toLowerCase() : null;
                })()),
                (module.exports = n));
        };
