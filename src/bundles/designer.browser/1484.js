module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(8 /* Symbol */);
        var i = _interopRequireDefault(require(176)),
            GObject = require(1),
            r = _interopRequireDefault(require(1242 /* GMSTeamsAuthenticator */)),
            s = _interopRequireDefault(require(44 /* GSystemDialog */)),
            l = _interopRequireDefault(require(443)),
            c = require(1243);
        const { isPrivateChat, isTeamsChannel } = l.default;
        function p(e) {
            if ("function" != typeof e) throw "GMSTeamsAppLoader constructor error: Wrong argument is provided";
            this._callback = e;
        }
        ((p.prototype.isExeuteOnMobileDevice = function () {
            return i.default.hardware === i.default.Hardware.Phone;
        }),
            (p.prototype.load = async function () {
                if (this.isExeuteOnMobileDevice())
                    return void s.default.splashScreenError(
                        GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.unsupported-mobile-for-msteams-new"))
                    );
                const e = [c.MS_TEAMS_COMMAND];
                ((await isPrivateChat()) ? e.push(c.ONE_DRIVE_BUSINESS_COMMAND) : (await isTeamsChannel()) && e.push(c.SHAREPOINT_COMMAND),
                    r.default
                        .getInstance()
                        .authenticate(e)
                        .then(() => {
                            this._callback();
                        }));
            }),
            (module.exports = p));
    };
