module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var GObject = require(1),
            GEditor = require(53),
            CookieKeys = _interopRequireDefault(require(1561)),
            GUser = _interopRequireDefault(require(177 /* GUser */));
        const { gApi } = require(10 /* designerConfig */);
        module.exports = class {
            constructor(firstName, lastName) {
                let isAnonymous = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                ((this._firstName = firstName),
                    (this._lastName = lastName),
                    (this._anonymous = isAnonymous),
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
                                    .on("input", (event) => this._nameFieldValueChange(true, event))
                                    .on("change", (event) => this._nameFieldValueChange(true, event))
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
                                    .on("input", (event) => this._nameFieldValueChange(false, event))
                                    .on("change", (event) => this._nameFieldValueChange(false, event))
                            )
                    );
            }
            async _updateUserName() {
                const userData = { name: this._firstName, last_name: this._lastName },
                    user = new GUser.default(userData);
                (this._anonymous
                    ? gContainer.setCookie({
                          name: CookieKeys.default.ANONYMOUS_USERNAME,
                          value: encodeURIComponent(JSON.stringify(userData)),
                      })
                    : await gApi.updateUser(userData),
                    await this._updateUserProperties(user),
                    this.close());
            }
            async _updateUserProperties(user) {
                ((GEditor.GEditorOptions.userConfig = Object.assign({}, GEditor.GEditorOptions.userConfig, { userName: user.getFullUserName() })),
                    gDesigner.getCloudCommunicationManager().userPropertiesChanged(),
                    await gDesigner.getUser());
            }
            _checkNameFieldsFilled() {
                return !this._firstName || !this._firstName.length;
            }
            _nameFieldValueChange(isFirstName, event) {
                (isFirstName ? (this._firstName = $(event.target).val()) : (this._lastName = $(event.target).val()),
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
