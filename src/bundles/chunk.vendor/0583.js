module.exports = function (e, t, i) {
            "use strict";
            e.exports = {
                USER: {
                    INVALID_CHARACTERS: /[\\/'~!+@#$%^&*(),?":;{}|<>\[\]]/,
                },
                NOTIFICATION: {
                    USER_MENTION: /@[^\r\n\t\f\v\s,{#%'"*<()>}:`;,!&?$+^\/|=\]\[\\]+/g,
                },
            };
        };
