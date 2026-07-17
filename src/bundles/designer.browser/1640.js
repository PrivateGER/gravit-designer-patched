module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(57), require(8 /* Symbol */), require(71 /* polyfill:String */), require(91 /* polyfill:String */), require(4), require(41), require(13), require(38), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            TranslationManager = _interopRequireDefault(require(1343 /* GTranslationManager */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            Utils = require(40);
        function GTranslationToolDialog() {}
        (GObject.GObject.inherit(GTranslationToolDialog, GObject.GObject),
            (GTranslationToolDialog.prototype._translationManager = null),
            (GTranslationToolDialog.prototype._hasUnappliedChanges = null),
            (GTranslationToolDialog.prototype._shouldDownloadMetaData = false),
            (GTranslationToolDialog.prototype._currentLanguage = null),
            (GTranslationToolDialog.prototype._dialog = null),
            (GTranslationToolDialog.prototype.init = function () {
                ((this._translationManager = gDesigner.getTranslationManager()),
                    (this._dialog = $("<div></div>").gDialog({
                        releaseOnClose: true,
                        className: "g-translation-tool-dialog",
                    })),
                    $("<div></div>")
                        .addClass("g-btn-close")
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .on("click", this.close.bind(this))
                        .appendTo(this._dialog),
                    (this._container = $("<div></div>").addClass("container").appendTo(this._dialog)),
                    (this._panel = $("<div></div>").addClass("panel").appendTo(this._container)),
                    (this._header = $("<div></div>")
                        .addClass("header")
                        .append(
                            $("<span/>").addClass("spin").addClass("loading-element").load("assets/icon/gravit-icon-rotate-right-flat.svg")
                        )
                        .append($("<span></span>").text("Choose project"))
                        .append(
                            $("<select></select>")
                                .addClass("project-chooser")
                                .append(
                                    this._translationManager
                                        .getProjectsDescription()
                                        .map((project) => $("<option></option>").text(project).attr("value", project))
                                )
                                .on("change", (event) => {
                                    this._translationManager.getProjectsDescription().includes(event.target.value) &&
                                        this._handleProjectChange(event.target.value);
                                })
                        )
                        .append($("<span></span>").text("Choose language"))
                        .append(
                            $("<select></select>")
                                .addClass("language-chooser")
                                .on("change", (event) => {
                                    this._handleLanguageChange(event.target.value, event);
                                })
                        )
                        .append($("<span></span>").text("Available"))
                        .append(
                            $("<input></input>")
                                .attr("type", "checkbox")
                                .addClass("check-available")
                                .on("change", (event) => this._toggleCurrentLanguageAvailability(event.target.checked))
                        )
                        .append($("<span></span>").text("Filter by temporary translations"))
                        .append(
                            $("<input></input>")
                                .attr("type", "checkbox")
                                .addClass("check-temporary")
                                .on("change", (event) => {
                                    const isChecked = $(event.target).closest("input").is(":checked");
                                    this._body.find(".translations-container").toggleClass("filter-by-temporary", !!isChecked);
                                })
                        )
                        .append($("<span></span>").addClass("only-export-empty-strings").text("Only export empty strings?"))
                        .append(
                            $("<input></input>")
                                .attr("type", "checkbox")
                                .on("change", (event) => (this._onlyExportEmptyStrings = event.target.checked))
                        )
                        .append($("<button></button>").addClass("button").text("Export CSV").click(this._exportAsCSV.bind(this)))
                        .append($("<button></button>").addClass("button").text("Import CSV").click(this._handleCSVImport.bind(this)))
                        .append($("<button></button>").addClass("button").text("New language").click(this._handleNewLanguage.bind(this)))
                        .appendTo(this._panel)),
                    $("<hr></hr>").appendTo(this._panel),
                    (this._body = $("<div></div>").addClass("body").appendTo(this._panel)),
                    (this._footer = $("<div></div>")
                        .addClass("footer")
                        .append($("<button></button>").addClass("button").text("Apply").on("click", this._applyChanges.bind(this)))
                        .append($("<button></button>").addClass("button").text("Download").on("click", this._downloadMetaData.bind(this)))
                        .appendTo(this._panel)),
                    this._handleProjectChange(GObject.GTranslation.Projects.Designer),
                    this.open());
            }),
            (GTranslationToolDialog.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (GTranslationToolDialog.prototype._handleProjectChange = function (project) {
                (this._translationManager.loadProjectTranslations(project),
                    this._updateUIComponents(),
                    this._handleLanguageChange(GObject.GLocaleLanguage.Default, true));
            }),
            (GTranslationToolDialog.prototype._applyChanges = function () {
                this._translationManager.applyTranslationPatch([this._translation]).then(() => {
                    ((this._hasUnappliedChanges = false), (this._shouldDownloadMetaData = true));
                });
            }),
            (GTranslationToolDialog.prototype._toggleCurrentLanguageAvailability = function (isAvailable) {
                ((this._translation.isAvailable = isAvailable), (this._hasUnappliedChanges = true));
            }),
            (GTranslationToolDialog.prototype._handleLanguageChange = function (language) {
                let force = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (!force && parseInt(this._currentLanguage) === parseInt(language)) return;
                const render = () => {
                    (this._setLoadingStatus(true), (this._currentLanguage = parseInt(language)), (this._hasUnappliedChanges = false));
                    let considerExtension = this._translationManager.isConsideringExtension();
                    (this._header.find(".language-chooser").val(this._currentLanguage),
                        this._body.find(".translations-container").remove());
                    var container = $("<div></div>")
                        .addClass("translations-container")
                        .toggleClass("filter-by-temporary", this._header.find(".check-temporary").is(":checked"));
                    ((this._translation = this._translationManager.getTranslationCopy(this._currentLanguage)),
                        this._header.find(".check-available").prop("checked", this._translation.isAvailable),
                        container.append(
                            Object.keys(this._translation.translations).map((path) => {
                                let pathContainer = $("<div></div>").addClass("path");
                                return (
                                    pathContainer.append($("<span></span>").addClass("description").text(path)),
                                    pathContainer.append(
                                        Object.keys(this._translation.translations[path]).map((translationKey) => {
                                            let row = $("<div></div>").addClass("row"),
                                                value = this._translation.translations[path][translationKey];
                                            const temporaryValue =
                                                this._translation.translationsTemporary &&
                                                this._translation.translationsTemporary[path] &&
                                                this._translation.translationsTemporary[path][translationKey];
                                            let isTemporary = !(!temporaryValue || (value && value.trim()));
                                            if (
                                                ((value = isTemporary ? temporaryValue : value),
                                                $("<input></input>")
                                                    .addClass("key")
                                                    .attr("disabled", true)
                                                    .attr("placeholder", "Key")
                                                    .val(translationKey)
                                                    .attr("data-title", value)
                                                    .appendTo(row),
                                                isTemporary &&
                                                    row.append(
                                                        $("<span/>")
                                                            .addClass("gravit-icon-google-translate")
                                                            .attr(
                                                                "data-title",
                                                                "This is a temporary translation provided by Google Translator"
                                                            )
                                                    ),
                                                $("<input></input>")
                                                    .addClass("value")
                                                    .data({
                                                        language: this._currentLanguage,
                                                        path: path,
                                                        key: translationKey,
                                                        originalValue: this._translation.translations[path][translationKey],
                                                    })
                                                    .on("change", (event) => {
                                                        ((this._translation.translations[path][translationKey] = event.target.value),
                                                            (this._hasUnappliedChanges = true));
                                                    })
                                                    .attr("placeholder", "Translation")
                                                    .val(value)
                                                    .appendTo(row),
                                                considerExtension)
                                            ) {
                                                var extendedValue =
                                                    this._translation.translationsExtended &&
                                                    this._translation.translationsExtended[path] &&
                                                    this._translation.translationsExtended[path][translationKey];
                                                const temporaryExtendedValue =
                                                    this._translation.translationsExtendedTemporary &&
                                                    this._translation.translationsExtendedTemporary[path] &&
                                                    this._translation.translationsExtendedTemporary[path][translationKey];
                                                ((extendedValue = temporaryExtendedValue || extendedValue),
                                                    (isTemporary = isTemporary || !!temporaryExtendedValue),
                                                    temporaryExtendedValue &&
                                                        row.append(
                                                            $("<span/>")
                                                                .addClass("gravit-icon-google-translate")
                                                                .attr(
                                                                    "data-title",
                                                                    "This is a temporary translation provided by Google Translator"
                                                                )
                                                        ),
                                                    $("<input></input>")
                                                        .addClass("value")
                                                        .data({
                                                            language: this._currentLanguage,
                                                            path: path,
                                                            key: translationKey,
                                                            extension: true,
                                                            originalValue: extendedValue,
                                                        })
                                                        .on("change", (event) => {
                                                            (event.target.value.trim()
                                                                ? (this._translation.translationsExtended ||
                                                                      (this._translation.translationsExtended = {}),
                                                                  this._translation.translationsExtended[path] ||
                                                                      (this._translation.translationsExtended[path] = {}),
                                                                  (this._translation.translationsExtended[path][translationKey] = event.target.value))
                                                                : delete this._translation.translationsExtended[path][translationKey],
                                                                (this._hasUnappliedChanges = true));
                                                        })
                                                        .attr("placeholder", "Extension")
                                                        .val(extendedValue || "")
                                                        .appendTo(row));
                                            }
                                            return (isTemporary && (row.addClass("temporary"), pathContainer.addClass("temporary")), row);
                                        })
                                    ),
                                    pathContainer
                                );
                            })
                        ),
                        container.appendTo(this._body),
                        this._setLoadingStatus(false));
                };
                this._hasUnappliedChanges
                    ? GSystemDialog.default.confirm("You have modified strings, you'll lose them if you don't apply them first, are you sure?", (confirmed) => {
                          confirmed ? render() : this._header.find(".language-chooser").val(this._currentLanguage);
                      })
                    : render();
            }),
            (GTranslationToolDialog.prototype.close = function () {
                this._hasUnappliedChanges || this._shouldDownloadMetaData
                    ? this._shouldDownloadMetaData
                        ? GSystemDialog.default.confirm(
                              "You haven't downloaded the translations after applying changes, are you sure about closing?",
                              (confirmed) => {
                                  confirmed && this._close();
                              }
                          )
                        : GSystemDialog.default.confirm("You have modified strings, are you sure about closing?", (confirmed) => {
                              confirmed && this._close();
                          })
                    : this._close();
            }),
            (GTranslationToolDialog.prototype._close = function () {
                ((this._hasUnappliedChanges = false),
                    (this._currentLanguage = null),
                    (this._shouldDownloadMetaData = false),
                    this._dialog.gDialog("close", false, 0));
            }),
            (GTranslationToolDialog.prototype._downloadMetaData = async function () {
                var download = async () => {
                    (this._manageDownload(
                        "translations_".concat(this._translationManager.getActiveProject(), ".json").toLowerCase(),
                        await this._translationManager.getMetaData()
                    ),
                        (this._shouldDownloadMetaData = false));
                };
                this._hasUnappliedChanges
                    ? GSystemDialog.default.confirm("You have modified strings, do you want to download before applying your changes?", (confirmed) => {
                          confirmed && download();
                      })
                    : download();
            }),
            (GTranslationToolDialog.prototype._exportAsCSV = async function () {
                var languageKey = Object.keys(GObject.GLocaleLanguage)[Object.values(GObject.GLocaleLanguage).indexOf(this._currentLanguage)];
                this._manageDownload(
                    "translations_".concat(this._translationManager.getActiveProject(), "_").concat(languageKey, ".csv").toLocaleLowerCase(),
                    await this._translationManager.export(TranslationManager.default.FormatTypes.CSV, this._currentLanguage, this._onlyExportEmptyStrings)
                );
            }),
            (GTranslationToolDialog.prototype._handleCSVImport = async function () {
                try {
                    (this._setLoadingStatus(true),
                        gDesigner.getDefaultStorage().openPrompt(
                            [{ ext: "csv", mime: "text/csv" }],
                            (file) => {
                                file &&
                                    file.read((content) => {
                                        var text = (0, Utils.decodeFromUTF8)(content);
                                        this._translationManager
                                            .import(text)
                                            .then(() => this._handleLanguageChange(this._currentLanguage, true))
                                            .catch((error) => this._handleError(error));
                                    });
                            },
                            false
                        ));
                } catch (error) {
                    this._handleError(error);
                } finally {
                    this._setLoadingStatus(false);
                }
            }),
            (GTranslationToolDialog.prototype._manageDownload = function (fileName, content) {
                var link = document.createElement("a");
                (link.setAttribute("href", URL.createObjectURL(new Blob([content], { type: "text/plain" }))),
                    link.setAttribute("download", fileName),
                    (link.style.display = "none"),
                    document.body.appendChild(link),
                    link.click(),
                    document.body.removeChild(link));
            }),
            (GTranslationToolDialog.prototype._handleError = function (error) {
                "string" != typeof error || GSystemDialog.default.alert(error);
            }),
            (GTranslationToolDialog.prototype._setLoadingStatus = function (isLoading) {
                var loadingElement = this._header.find(".loading-element");
                isLoading ? loadingElement.addClass("visible") : loadingElement.removeClass("visible");
            }),
            (GTranslationToolDialog.prototype._handleNewLanguage = function () {
                GSystemDialog.default.prompt("Please name the new language (English)!", (languageName) => {
                    languageName
                        ? GSystemDialog.default.prompt("Please inform the real name of the language!", (realName) => {
                              GSystemDialog.default.prompt("Please inform the ISO Language Code!", (isoCode) => {
                                  this._translationManager
                                      .createNewLanguage(languageName, realName, isoCode)
                                      .then((result) => {
                                          ((this._shouldDownloadMetaData = true),
                                              this._updateUIComponents(),
                                              this._handleLanguageChange(result.keyValue));
                                      })
                                      .catch((error) => this._handleError(error));
                              });
                          })
                        : GSystemDialog.default.alert("Invalid value ('".concat(languageName, "') for language!"));
                });
            }),
            (GTranslationToolDialog.prototype._updateUIComponents = function () {
                this._header.find(".project-chooser").val(this._translationManager.getActiveProject());
                var languageChooser = this._header.find(".language-chooser");
                (languageChooser.find("option").remove(),
                    languageChooser.append(
                        Object.keys(GObject.GLocaleLanguage)
                            .filter((key) => "Default" !== key)
                            .filter((key) => !!this._translationManager.getTranslationByKey(GObject.GLocaleLanguage[key]))
                            .map((key) => $("<option></option>").text(key).attr("value", GObject.GLocaleLanguage[key]))
                    ));
            }),
            (module.exports = GTranslationToolDialog));
    };
