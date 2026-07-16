module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var GObject = require(1),
            a = require(53),
            r = _interopRequireDefault(require(1561)),
            s = _interopRequireDefault(require(177));
        const { gApi } = require(10 /* designerConfig */);
        module.exports = class {
            constructor(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                ((this._firstName = e),
                    (this._lastName = t),
                    (this._anonymous = n),
                    (this._confirmBtn = $("<button/>")
                        .addClass("confirm-btn")
                        .attr("disabled", this._checkNameFieldsFilled())
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GUserNameConfigDialog", "text.ok")))
                        .on("click", () => {
                            (gDesigner.stats("user-name-config-dialog_update-user-name"), this._updateUserName());
                        })),
                    (this._dialog = $("<div/>")
                        .append(
                            $("<div/>")
                                .addClass("header")
                                .append(
                                    $("<span/>")
                                        .addClass("title")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GUserNameConfigDialog", "text.dialog-title")))
                                )
                        )
                        .append(
                            $("<div/>")
                                .addClass("tips-content-container")
                                .append(
                                    $("<span/>")
                                        .addClass("tips")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GUserNameConfigDialog", "text.name-usage-tips")))
                                )
                        )
                        .append(this._buildNameFields())
                        .append(this._confirmBtn)
                        .gDialog({
                            releaseOnClose: true,
                            className: "g-username-config-dialog",
                        })));
            }
            _buildNameFields() {
                return $("<div/>")
                    .addClass("name-fields")
                    .append(
                        $("<div/>")
                            .addClass("label-and-input")
                            .addClass("first-name-field")
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GUserNameConfigDialog", "text.first-name"))))
                            .append(
                                $("<input/>")
                                    .addClass("field-input")
                                    .val(this._firstName)
                                    .on("input", (e) => this._nameFieldValueChange(true, e))
                                    .on("change", (e) => this._nameFieldValueChange(true, e))
                            )
                    )
                    .append(
                        $("<div/>")
                            .addClass("label-and-input")
                            .addClass("last-name-field")
                            .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GUserNameConfigDialog", "text.last-name"))))
                            .append(
                                $("<input/>")
                                    .addClass("field-input")
                                    .val(this._lastName)
                                    .on("input", (e) => this._nameFieldValueChange(false, e))
                                    .on("change", (e) => this._nameFieldValueChange(false, e))
                            )
                    );
            }
            async _updateUserName() {
                const e = { name: this._firstName, last_name: this._lastName },
                    t = new s.default(e);
                (this._anonymous
                    ? gContainer.setCookie({
                          name: r.default.ANONYMOUS_USERNAME,
                          value: encodeURIComponent(JSON.stringify(e)),
                      })
                    : await gApi.updateUser(e),
                    await this._updateUserProperties(t),
                    this.close());
            }
            async _updateUserProperties(e) {
                ((a.GEditorOptions.userConfig = Object.assign({}, a.GEditorOptions.userConfig, { userName: e.getFullUserName() })),
                    gDesigner.getCloudCommunicationManager().userPropertiesChanged(),
                    await gDesigner.getUser());
            }
            _checkNameFieldsFilled() {
                return !this._firstName || !this._firstName.length;
            }
            _nameFieldValueChange(e, t) {
                (e ? (this._firstName = $(t.target).val()) : (this._lastName = $(t.target).val()),
                    this._confirmBtn.attr("disabled", this._checkNameFieldsFilled()));
            }
            open() {
                (gDesigner.stats("user-name-config-dialog_open"), this._dialog.gDialog("open", false));
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
