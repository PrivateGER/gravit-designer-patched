module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var designerConfig = require(10);
        function i(e) {
            const { accessToken, expires, corporate, accountId } = new i.Settings(e);
            ((this.accessToken = accessToken), (this.expires = expires), (this.corporate = corporate), (this.accountId = accountId));
        }
        ((i.Settings = function (e) {
            e || (e = {});
            const { accessToken: t, expires: n, corporate: o = true, accountId: i } = e;
            return Object.assign(this, {
                accessToken: t,
                expires: n,
                corporate: o,
                accountId: i,
            });
        }),
            (i.prototype.isExpired = function () {
                return !this.expires || new Date().getTime() > this.expires;
            }),
            (i.prototype.getSettings = function () {
                return {
                    accessToken: this.accessToken,
                    expires: this.expires,
                    corporate: this.corporate,
                    accountId: this.accountId,
                };
            }),
            (i.prototype.get = async function () {
                return this.isExpired()
                    ? this.corporate
                        ? designerConfig.gApi.cloudServices.googleDrive.getAccessToken().then((e) => {
                              let { accessToken: t, expires: n } = e;
                              return ((this.expires = n), (this.accessToken = t), this.accessToken);
                          })
                        : gContainer
                              .getGoogleAPI()
                              .getAccessToken()
                              .then((e) => {
                                  let { accessToken: t, expires: n } = e;
                                  return ((this.expires = n), (this.accessToken = t), this.accessToken);
                              })
                    : this.accessToken;
            }),
            (module.exports = i));
    };
