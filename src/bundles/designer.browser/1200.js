module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(1381), require(19), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(26));
        var GObject = require(1);
        function i(e) {
            function t(e) {
                if (Object(e) !== e) return Promise.reject(new TypeError(e + " is not an object."));
                var t = e.done;
                return Promise.resolve(e.value).then(function (e) {
                    return { value: e, done: t };
                });
            }
            return (
                ((i = function (e) {
                    ((this.s = e), (this.n = e.next));
                }).prototype = {
                    s: null,
                    n: null,
                    next: function () {
                        return t(this.n.apply(this.s, arguments));
                    },
                    return: function (e) {
                        var n = this.s.return;
                        return void 0 === n ? Promise.resolve({ value: e, done: true }) : t(n.apply(this.s, arguments));
                    },
                    throw: function (e) {
                        var n = this.s.return;
                        return void 0 === n ? Promise.reject(e) : t(n.apply(this.s, arguments));
                    },
                }),
                new i(e)
            );
        }
        module.exports = {
            generateFormattedList: function (fontEntries) {
                if (!fontEntries) return null;
                const result = [];
                var remaining = fontEntries.slice();
                for (let e = 0; e < remaining.length; e++) {
                    var o = remaining[e],
                        i = o.displayname || o.family,
                        a = [
                            {
                                weight: parseInt(o.weight),
                                style: o.style,
                                family: o.family,
                                subfamily: o.subfamily || null,
                                displayname: o.displayname || null,
                            },
                        ],
                        r = [o.family];
                    result.push({ family: null, displayname: i, fonts: a, families: r });
                    for (let t = remaining.length - 1; t > e; t--)
                        i === (remaining[t].displayname || remaining[t].family) &&
                            (r.indexOf(remaining[t].family) < 0 && r.push(remaining[t].family),
                            a.push({
                                weight: parseInt(remaining[t].weight),
                                style: remaining[t].style,
                                family: remaining[t].family,
                                subfamily: remaining[t].subfamily || null,
                                displayname: remaining[t].displayname || null,
                            }),
                            remaining.splice(t, 1));
                    var s = 0,
                        l = r[0].length;
                    if (l > 0)
                        for (let e = 1; e < r.length; e++) {
                            if (r[e].toLowerCase().indexOf("regular") >= 0) {
                                ((l = 0), (s = e));
                                break;
                            }
                            l > r[e].length && ((l = r[e].length), (s = e));
                        }
                    result[result.length - 1].family = r[s];
                }
                return result;
            },
            parseNativeFonts: async function (fontDataList) {
                if (!fontDataList || !Array.isArray(fontDataList) || !fontDataList.length) return [];
                const result = [];
                for (var n = 0; n < fontDataList.length; n++) {
                    const fontData = fontDataList[n],
                        blob = await fontData.blob(),
                        buffer = await blob.arrayBuffer();
                    if (buffer) {
                        var i = GObject.GOpenTypeUtil.getFont(null, null, null, buffer, true, true);
                        if (i && i.length)
                            for (var a = 0; a < i.length; a++) {
                                for (
                                    var r = i[a], s = 2;
                                    result.find((e) => e.family === r.family && e.weight === r.weight && e.style === r.style);

                                )
                                    r.subfamily && r.family.indexOf(r.subfamily) < 0
                                        ? (r.family = r.family + " " + r.subfamily)
                                        : ((r.subfamily = "variant " + s++),
                                          (r.family =
                                              r.family.replace(
                                                  /[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]variant[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9]+$/,
                                                  ""
                                              ) +
                                              " " +
                                              r.subfamily));
                                result.push({
                                    weight: r.weight,
                                    style: r.style,
                                    family: r.family,
                                    blob: buffer,
                                    displayname: r.displayname,
                                    subfamily: r.subfamily,
                                });
                            }
                    }
                }
                return result;
            },
            getLocalFontsData: async () => {
                const fontsData = [];
                try {
                    var pendingError,
                        iterationInProgress = false,
                        hasError = false;
                    try {
                        for (
                            var iterationStep,
                                iterator = (function (e) {
                                    var t,
                                        n,
                                        o,
                                        a = 2;
                                    for ("undefined" != typeof Symbol && ((n = Symbol.asyncIterator), (o = Symbol.iterator)); a--; ) {
                                        if (n && null != (t = e[n])) return t.call(e);
                                        if (o && null != (t = e[o])) return new i(t.call(e));
                                        ((n = "@@asyncIterator"), (o = "@@iterator"));
                                    }
                                    throw new TypeError("Object is not async iterable");
                                })(await window.queryLocalFonts());
                            (iterationInProgress = !(iterationStep = await iterator.next()).done);
                            iterationInProgress = false
                        ) {
                            const font = iterationStep.value;
                            fontsData.push(font);
                        }
                    } catch (e) {
                        ((hasError = true), (pendingError = e));
                    } finally {
                        try {
                            iterationInProgress && null != iterator.return && (await iterator.return());
                        } finally {
                            if (hasError) throw pendingError;
                        }
                    }
                } catch (e) {
                    console.error(">>>error getting local fonts data:", e);
                }
                return fontsData;
            },
            getFontFamily: function (familyName, findFamily) {
                let currentName = familyName,
                    foundFamily = findFamily(currentName);
                if (
                    (foundFamily ||
                        ((currentName = currentName.replace(
                            /[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]variant[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9]+$/,
                            ""
                        )),
                        (foundFamily = findFamily(currentName))),
                    !foundFamily)
                ) {
                    let nameParts = currentName.split(" ");
                    for (; nameParts.length > 0 && (nameParts.pop(), (currentName = nameParts.join(" ")), (foundFamily = findFamily(currentName)), !foundFamily); );
                }
                return foundFamily;
            },
        };
    };
