module.exports = function (e, t, i) {
            "use strict";
            e.exports = {
                PasswordLength: {
                    Minimum: 6,
                    Maximum: 48,
                },
                RegExp: {
                    PASSWORD_SPECIAL_CHARACTERS: /[$@!%*#?&]/,
                    PASSWORD_UPPERCASE: /[A-Z]/,
                    PASSWORD_LOWERCASE: /[a-z]/,
                    PASSWORD_NUMBERS: /[0-9]/,
                },
            };
        };
