module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20), require(34));
        var GObject = require(1);
        const GSystemDialog = require(44),
            { DESIGNER: { TITLE: a } = {} } = require(10 /* designerConfig */);
        module.exports = class {
            async init() {
                (await this._shouldOpenWarningDialog()) && gDesigner.executeWhenReady(() => this._openWarningDialog());
            }
            _openWarningDialog() {
                GSystemDialog.custom({
                    icon: "info",
                    closeable: false,
                    className: "g-beta-warning-dialog",
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GBetaFlow", "text.title")).replace("%app", a),
                    subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GBetaFlow", "text.message")),
                    buttons: [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GBetaFlow", "text.i-understand")).toUpperCase(),
                            closeOnClick: true,
                            highlighted: true,
                        },
                    ],
                    dontShowAgainCb: (e) => {
                        gContainer.setProperty("designer.betaflow.dismiss-warning-dialog", !!e);
                    },
                });
            }
            async _shouldOpenWarningDialog() {
                return !(await gContainer.getProperty("designer.betaflow.dismiss-warning-dialog", false));
            }
        };
    };
