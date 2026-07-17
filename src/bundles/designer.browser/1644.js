module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15);
        module.exports = class {
            constructor() {
                ((this._dialog = this._createDialog()),
                    this._dialog.append(this._createCloseButton(), this._getTitle(), this._getContent()));
            }
            open() {
                this._dialog.gDialog("open", true);
            }
            close() {
                this._dialog.gDialog("close");
            }
            _getTitle() {
                const titleText = GObject.GLocale.getValue("GShortcutsDialog", "text.title");
                return $("<div />").addClass("title").text(titleText);
            }
            _getContent() {
                const table = $("<table/>"),
                    tbody = $("<tbody/>").appendTo(table);
                return (
                    gDesigner.getActions().forEach((action) => {
                        if (!action.isAvailable()) return;
                        const shortcutHint = action.getShortcutHint({ isWordMode: true });
                        if (shortcutHint) {
                            const title = GObject.GLocale.get(action.getFullTitle());
                            this._createTableRow(title, shortcutHint).appendTo(tbody);
                        }
                    }),
                    gravit.tools.forEach((tool) => {
                        if (tool.key) {
                            const shortcut = GPlatform.GKey.shortcutToString(tool.key);
                            if (!shortcut) return;
                            const toolTitle = GObject.GLocale.get(tool.richTooltipConfig.getConfig().title);
                            this._createTableRow(toolTitle, shortcut).appendTo(tbody);
                        }
                    }),
                    $("<div/>").addClass("wrapper").append(table)
                );
            }
            _createDialog() {
                return $("<div/>").gDialog({
                    releaseOnClose: true,
                    className: "g-shortcuts-dialog",
                });
            }
            _createCloseButton() {
                const closeIcon = $("<span />").addClass("gravit-icon-close");
                return $("<div />").addClass("g-btn-close").append(closeIcon).on("click", this.close.bind(this));
            }
            _createTableRow(label, shortcutText) {
                const row = $("<tr/>");
                return ($("<td/>").text(label).appendTo(row), $("<td/>").text(shortcutText).appendTo(row), row);
            }
        };
    };
