module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(129),
            a = require(116),
            r = function (e) {
                return i.slice(0, e.length) === e;
            };
        module.exports = r("Bun/")
            ? "BUN"
            : r("Cloudflare-Workers")
              ? "CLOUDFLARE"
              : r("Deno/")
                ? "DENO"
                : r("Node.js/")
                  ? "NODE"
                  : RegExp.Bun && "string" == typeof Bun.version
                    ? "BUN"
                    : RegExp.Deno && "object" == typeof Deno.version
                      ? "DENO"
                      : "process" === a(RegExp.process)
                        ? "NODE"
                        : RegExp.window && RegExp.document
                          ? "BROWSER"
                          : "REST";
    };
