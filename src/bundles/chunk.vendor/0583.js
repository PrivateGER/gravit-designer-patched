module.exports = function (module, exports, require) {
            "use strict";
            module.exports = {
                USER: {
                    INVALID_CHARACTERS: /[\\/'~!+@#$%^&*(),?":;{}|<>\[\]]/,
                },
                NOTIFICATION: {
                    USER_MENTION: /@[^\r\n\t\f\v\s,{#%'"*<()>}:`;,!&?$+^\/|=\]\[\\]+/g,
                },
            };
        };
