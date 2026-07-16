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
                const e = GObject.GLocale.getValue("GShortcutsDialog", "text.title");
                return $("<div />").addClass("title").text(e);
            }
            _getContent() {
                const e = $("<table/>"),
                    t = $("<tbody/>").appendTo(e);
                return (
                    gDesigner.getActions().forEach((e) => {
                        if (!e.isAvailable()) return;
                        const n = e.getShortcutHint({ isWordMode: true });
                        if (n) {
                            const i = GObject.GLocale.get(e.getFullTitle());
                            this._createTableRow(i, n).appendTo(t);
                        }
                    }),
                    gravit.tools.forEach((e) => {
                        if (e.key) {
                            const n = GPlatform.GKey.shortcutToString(e.key);
                            if (!n) return;
                            const a = GObject.GLocale.get(e.richTooltipConfig.getConfig().title);
                            this._createTableRow(a, n).appendTo(t);
                        }
                    }),
                    $("<div/>").addClass("wrapper").append(e)
                );
            }
            _createDialog() {
                return $("<div/>").gDialog({
                    releaseOnClose: true,
                    className: "g-shortcuts-dialog",
                });
            }
            _createCloseButton() {
                const e = $("<span />").addClass("gravit-icon-close");
                return $("<div />").addClass("g-btn-close").append(e).on("click", this.close.bind(this));
            }
            _createTableRow(e, t) {
                const n = $("<tr/>");
                return ($("<td/>").text(e).appendTo(n), $("<td/>").text(t).appendTo(n), n);
            }
        };
    };
