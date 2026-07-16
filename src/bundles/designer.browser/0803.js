module.exports = function (module, exports) {
        module.exports = {
            nodeEnv: "production",
            isBeta: false,
            storeVendor: "",
            isCorel: false,
            isTeams: "teams.coreldraw.app" === window.location.hostname,
        };
    };
