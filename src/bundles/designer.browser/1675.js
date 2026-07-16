module.exports = function (module, exports, require) {
        "use strict";
        module.exports = class {
            constructor() {
                ((this._dialog = $("<div></div>").gDialog({
                    relaseOnClose: true,
                    className: "g-maintenance-dialog",
                })),
                    $("<iframe></iframe>").attr("src", "assets/static/maintenance/index.html").appendTo(this._dialog));
            }
            open() {
                this._dialog.gDialog("open", true);
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
