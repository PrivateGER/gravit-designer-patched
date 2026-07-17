module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GEffectsButton = require(1527);
        function GEffectsPanel(catTranslate) {
            ((this._htmlElement = $("<div></div>").addClass("g-effects-panel").gOverlay({ releaseOnClose: false, padding: false })),
                (this._catTranslate = catTranslate));
        }
        ((GEffectsPanel.prototype._htmlElement = null),
            (GEffectsPanel.prototype._content = null),
            (GEffectsPanel.prototype._catTranslate = null),
            (GEffectsPanel.prototype._parent = null),
            (GEffectsPanel.prototype.addItem = function (item) {
                this._content.append(item._htmlElement);
            }),
            (GEffectsPanel.prototype.createSelector = function () {
                var selectElement = $("<select></select>").addClass("g-effects-select").addClass("active");
                return (
                    (this._htmlElementSelector = $("<div></div>").addClass("g-effects-selector").append(selectElement)),
                    this._htmlElement.append(this._htmlElementSelector),
                    selectElement
                );
            }),
            (GEffectsPanel.prototype.addItems = function (items) {
                for (
                    this._content ||
                    ((this._content = $("<div></div>").addClass("g-effects-content")), this._htmlElement.append(this._content));
                    items.length % 3 != 0;

                ) {
                    var t = new GEffectsButton();
                    items.push(t);
                }
                this._content.children(".g-effects-button").remove();
                for (var n = 0; n < items.length; ++n)
                    if (items[n] instanceof GEffectsButton) this.addItem(items[n]);
                    else {
                        t = new GEffectsButton(
                            GObject.GLocale.getValue(items[n].i18n, "name"),
                            items[n].icon,
                            items[n].clazz,
                            items[n].cb,
                            !items[n].mostUsed,
                            items[n],
                            this._catTranslate
                        );
                        this.addItem(t);
                    }
            }),
            (GEffectsPanel.prototype.open = function (parent) {
                ((this._parent = parent), this._htmlElement.gOverlay("open", parent));
            }),
            (GEffectsPanel.prototype.close = function (parent) {
                this._htmlElement.gOverlay("close", parent || this._parent);
            }),
            (GEffectsPanel.prototype.toString = function () {
                return "[Object GEffectsPanel]";
            }),
            (module.exports = GEffectsPanel));
    };
