module.exports = function (module, exports, require) {
            "use strict";
            require(57);
            module.exports = class {
                constructor() {
                    let {
                        public_stats,
                        private_stats,
                        team_stats,
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    ((this._public_stats = public_stats), (this._private_stats = private_stats), (this._team_stats = team_stats));
                }
                getPrivateShareQuota() {
                    return (this._private_stats && parseInt(this._private_stats.quota)) || 0;
                }
                getPublicShareQuota() {
                    return (this._public_stats && parseInt(this._public_stats.quota)) || 0;
                }
                toJSON() {
                    return {
                        public_stats: this._public_stats,
                        private_stats: this._private_stats,
                        team_stats: this._team_stats,
                    };
                }
            };
        };
