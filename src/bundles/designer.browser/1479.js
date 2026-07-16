module.exports = function (module, exports, require) {
        "use strict";
        require(271);
        const designerConfig = require(10),
            { IS_LOCALHOST: i, IS_RC: a } = require(231 /* IS_TRUNK */);
        designerConfig.IS_TEAMS = "teams.coreldraw.app" === window.location.hostname;
        const r = window.location.hostname.endsWith(".ngrok.io");
        (designerConfig.IS_TEAMS
            ? (designerConfig.gApi.url = designerConfig.cloudTeamsURL)
            : i || r
              ? (designerConfig.trunkwebcdr && (designerConfig.gApi.webcdr = designerConfig.cloudTrunkURL + "/api/webcdr"), (designerConfig.gApi.url = designerConfig.cloudTrunkURL))
              : designerConfig.IS_BETA
                ? (designerConfig.cloudBetaURL && (designerConfig.gApi.url = designerConfig.cloudBetaURL), designerConfig.betaWebcdr && (designerConfig.gApi.webcdr = designerConfig.betaWebcdr))
                : a
                  ? (designerConfig.cloudRCURL && (designerConfig.gApi.url = designerConfig.cloudRCURL), designerConfig.stagingWebcdr && (designerConfig.gApi.webcdr = designerConfig.stagingWebcdr))
                  : designerConfig.IS_TRUNK && ((designerConfig.gApi.url = designerConfig.cloudTrunkURL), designerConfig.trunkwebcdr && (designerConfig.gApi.webcdr = designerConfig.trunkwebcdr)),
            !designerConfig.gApi.webcdr && designerConfig.webcdr && (designerConfig.gApi.webcdr = designerConfig.webcdr),
            (window.gApi = designerConfig.gApi),
            (module.exports = designerConfig));
    };
