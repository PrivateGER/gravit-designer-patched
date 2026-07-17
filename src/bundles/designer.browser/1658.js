module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41), require(13), require(32), require(33));
        var GObject = require(1),
            GProperties = require(123),
            GDetachSymbolAction = (require(173), require(874)),
            GFitSelectionAction = require(566);
        const GSettingChangedEvent = require(135);
        function GSymbolProperties() {}
        (GObject.GObject.inherit(GSymbolProperties, GProperties),
            (GSymbolProperties.prototype._panel = null),
            (GSymbolProperties.prototype._toolbar = null),
            (GSymbolProperties.prototype._document = null),
            (GSymbolProperties.prototype._symbols = null),
            (GSymbolProperties.prototype._disabledSiblingMaps = null),
            (GSymbolProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel),
                    (this._toolbar = toolbar),
                    toolbar.addClass("filled"),
                    toolbar.addClass("page-toolbar"),
                    toolbar.addClass("symbol-instance-toolbar"),
                    panel.addClass("symbol-instance-panel"));
                var select = $("<select></select>")
                    .attr("data-property", "symbol-instance")
                    .on(
                        "change",
                        function (event) {
                            gDesigner.stats("symbolproperties_select_swap");
                            var scene = this._document.getScene(),
                                editor = this._document.getEditor(),
                                activatePageOf = function (node) {
                                    var page = node.findParent(function (node) {
                                        return node instanceof GObject.GPage;
                                    });
                                    page && scene.getActivePage() !== page && scene.setActivePage(page);
                                };
                            if (event.target.value && "0" !== event.target.value && "-1" !== event.target.value) {
                                var targetSymbolData = $(event.target)
                                    .find('option[value="' + event.target.value + '"]')
                                    .data("symbol");
                                if (targetSymbolData) {
                                    (editor = this._document.getEditor()).beginTransaction();
                                    var swapSymbol = targetSymbolData,
                                        currentSymbol = this._symbols[0],
                                        oldMasterSymbol = currentSymbol.getMasterSymbol(),
                                        disabledSiblings = currentSymbol.getDisabledSiblings(),
                                        newSymbol = currentSymbol.swapWith(swapSymbol);
                                    if ((this._disabledSiblingMaps || (this._disabledSiblingMaps = {}), disabledSiblings)) {
                                        var siblingMapKey = oldMasterSymbol.getMultireferenceId() + "_" + newSymbol.getMultireferenceId();
                                        this._disabledSiblingMaps[siblingMapKey] = disabledSiblings;
                                    }
                                    var savedDisabledSiblings = this._disabledSiblingMaps[swapSymbol.getMultireferenceId() + "_" + currentSymbol.getMultireferenceId()];
                                    (savedDisabledSiblings && newSymbol.desynchronize(savedDisabledSiblings),
                                        newSymbol && (activatePageOf(newSymbol), editor.updateSelection(false, [newSymbol])),
                                        editor.commitTransaction("Swap symbol instance"));
                                }
                            } else if (event.target.value && "0" === event.target.value) {
                                var masterSymbol = this._symbols[0].getMasterSymbol();
                                (editor.beginTransaction(),
                                    activatePageOf(masterSymbol),
                                    editor.clearSelection(),
                                    editor.updateSelection(false, [masterSymbol]),
                                    editor.hasSelection() && gDesigner.executeAction(GFitSelectionAction.ID, void 0, void 0, true),
                                    editor.commitTransaction("Select master symbol"));
                            } else
                                event.target.value &&
                                    "-1" === event.target.value &&
                                    (gDesigner.executeAction(GDetachSymbolAction.ID, void 0, void 0, true), editor.updateSelection(false, editor.getSelection().slice()));
                        }.bind(this)
                    );
                ($("<label></label>")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "title")))
                    .appendTo(toolbar),
                    $("<div></div>")
                        .addClass("chooseinstance-row")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "chooseinstance-title-col",
                                    content: $(
                                        "<span>" + GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "text.chooseinstance")) + "</span>"
                                    ),
                                },
                                { clazz: "chooseinstance-select-col", content: select },
                            ],
                        })
                        .appendTo(panel));
            }),
            (GSymbolProperties.prototype.update = function (document, elements) {
                return (
                    this._updateUI(),
                    this._document && (gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged, this), (this._document = null)),
                    (this._symbols = null),
                    !(
                        !document ||
                        (gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                        !(elements = elements.filter((element) => element instanceof GObject.GSymbol && !element.isMaster() && !!element.getMasterSymbol())).length)
                    ) && ((this._symbols = elements.slice()), (this._document = document), this._updateProperties(), true)
                );
            }),
            (GSymbolProperties.prototype._updateUI = function () {
                gDesigner.isTouchEnabled()
                    ? this._panel.find(".frm-checkbox").gCheckboxSlider()
                    : this._panel.find(".frm-checkbox").gCheckboxSlider("unmount");
            }),
            (GSymbolProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateUI();
            }),
            (GSymbolProperties.prototype._updateProperties = function () {
                var titleText,
                    scene = this._document.getScene(),
                    symbol = this._symbols[0],
                    masterSymbol = symbol.getMasterSymbol(),
                    symbols = (scene.isFixedSized(), scene.getSymbols());
                (this._symbols.length > 1
                    ? (titleText = this._symbols.length + " " + GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "text.instances")))
                    : ((titleText = symbol.getProperty("name") || GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "title"))),
                      masterSymbol.getProperty("name")
                          ? (titleText +=
                                " (" +
                                GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "text.instanceof")) +
                                " " +
                                masterSymbol.getProperty("name"))
                          : (titleText += " (" + GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "text.instance"))),
                      (titleText += ")")),
                    this._toolbar.find("label:first-child").text(titleText));
                var customOption,
                    selectElement = this._panel.find('select[data-property="symbol-instance"]').empty();
                gDesigner.canExecuteAction(GDetachSymbolAction.ID) &&
                    (selectElement.append($('<option value="-1">(' + GObject.GLocale.get(GDetachSymbolAction.TITLE) + ")</option>")),
                    selectElement.append((customOption = $('<option value="-2"></option>'))));
                var c = 0;
                (!symbols.length && masterSymbol && (symbols = [masterSymbol]),
                    symbols.length ? selectElement.removeClass("g-disabled").attr("disabled", null) : selectElement.addClass("g-disabled").attr("disabled", ""));
                var hasSelectedOption = false;
                (symbols.forEach(function (symbol) {
                    var optionElement = $("<option></option>").data("symbol", symbol).attr("value", ++c).text(symbol.getProperty("name")).appendTo(selectElement);
                    masterSymbol.getMultireferenceId() === symbol.getMultireferenceId() && (optionElement.prop("selected", true), (hasSelectedOption = true));
                }),
                    hasSelectedOption || customOption.prop("selected", true),
                    masterSymbol &&
                        masterSymbol.getScene() &&
                        selectElement.append(
                            $('<option value="0">(' + GObject.GLocale.get(new GObject.GLocaleKey("GSymbolProperties", "text.master")) + ")</option>")
                        ));
            }),
            (GSymbolProperties.prototype.toString = function () {
                return "[Object GSymbolProperties]";
            }),
            (module.exports = GSymbolProperties));
    };
