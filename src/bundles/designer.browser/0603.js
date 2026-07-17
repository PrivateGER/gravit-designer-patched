module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GWindow = require(1503),
            GSystemDialog = require(44),
            GSaveAction = require(447),
            DocumentStatus = require(86);
        function GWindows(htmlElement) {
            ((this._htmlElement = htmlElement), (this._windows = []));
        }
        (GObject.GObject.inherit(GWindows, GObject.GEventTarget),
            (GWindows.WindowEvent = function (type, window, index) {
                ((this.type = type), (this.window = window), (this.index = index));
            }),
            GObject.GObject.inherit(GWindows.WindowEvent, GObject.GEvent),
            (GWindows.WindowEvent.Type = {
                Added: 0,
                Removed: 1,
                Deactivated: 10,
                Activated: 11,
            }),
            (GWindows.WindowEvent.prototype.type = null),
            (GWindows.WindowEvent.prototype.window = null),
            (GWindows.WindowEvent.prototype.index = null),
            (GWindows.WindowEvent.prototype.toString = function () {
                return "[Object GWindows.WindowEvent]";
            }),
            (GWindows.prototype._htmlElement = null),
            (GWindows.prototype._windows = null),
            (GWindows.prototype._activeWindow = null),
            (GWindows.prototype._viewOffset = null),
            (GWindows.prototype.getWindows = function () {
                return this._windows;
            }),
            (GWindows.prototype.getActiveWindow = function () {
                return this._activeWindow;
            }),
            (GWindows.prototype.activateWindow = function (window, forceViewUpdate) {
                if (window !== this._activeWindow) {
                    (this._activeWindow && (this._activeWindow.deactivate(), this._activeWindow._container.detach()),
                        null === window
                            ? gDesigner.activateDocument(null, true)
                            : ((window && this._activeWindow && window.getDocument() !== this._activeWindow.getDocument()) || !this._activeWindow) &&
                              gDesigner.activateDocument(window.getDocument(), true));
                    var previousWindow = this._activeWindow;
                    ((this._activeWindow = window),
                        previousWindow && this.hasEventListeners(GWindows.WindowEvent) && this.trigger(new GWindows.WindowEvent(GWindows.WindowEvent.Type.Deactivated, previousWindow)),
                        window &&
                            ((window.getDocument()._activeWindow = window),
                            this._htmlElement.append(window._container),
                            this._relayoutWindow(window, forceViewUpdate),
                            this._activeWindow.activate(forceViewUpdate),
                            this.hasEventListeners(GWindows.WindowEvent) && this.trigger(new GWindows.WindowEvent(GWindows.WindowEvent.Type.Activated, window))));
                }
            }),
            (GWindows.prototype.addWindow = function (documentOrWindow, view, index) {
                var targetDocument = documentOrWindow instanceof GWindow ? documentOrWindow.getDocument() : documentOrWindow,
                    addedWindow = this._addWindow(targetDocument, view, index);
                if (documentOrWindow instanceof GWindow) {
                    var sourceView = documentOrWindow.getView();
                    addedWindow.getView() && addedWindow.getView().transform(sourceView.getScrollX(), sourceView.getScrollY(), sourceView.getZoom());
                }
                return addedWindow;
            }),
            (GWindows.prototype.removeWindow = function (window, onRemoved, force, forceViewUpdate) {
                var targetDocument = window.getDocument(),
                    finishRemoval = function (result) {
                        if (!result || result.documentStatus !== DocumentStatus.SaveCancelled) {
                            if (window === this._activeWindow) {
                                var removedIndex = this._windows.indexOf(window);
                                removedIndex > 0
                                    ? this.activateWindow(this._windows[removedIndex - 1], forceViewUpdate)
                                    : removedIndex + 1 < this._windows.length
                                      ? this.activateWindow(this._windows[removedIndex + 1], forceViewUpdate)
                                      : this.activateWindow(null);
                            }
                            (targetDocument._activeWindow === window && (targetDocument._activeWindow = null),
                                targetDocument._windows.splice(targetDocument._windows.indexOf(window), 1),
                                this._windows.splice(this._windows.indexOf(window), 1),
                                window._container.remove(),
                                this.hasEventListeners(GWindows.WindowEvent) && this.trigger(new GWindows.WindowEvent(GWindows.WindowEvent.Type.Removed, window)),
                                window.release(),
                                onRemoved && onRemoved(),
                                0 === targetDocument._windows.length && gDesigner.removeDocument(targetDocument));
                        }
                    }.bind(this);
                force
                    ? finishRemoval()
                    : targetDocument.isSynchronizing()
                      ? GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.please-wait-avoid-losing-progress")))
                      : 1 === targetDocument._windows.length && targetDocument.isModified()
                        ? gDesigner
                              .canUnloadDocument(targetDocument)
                              .then((canUnload) => {
                                  canUnload
                                      ? finishRemoval()
                                      : (gDesigner.stats("action_execute_windowalert", GSaveAction.ID),
                                        gDesigner.executeAction(GSaveAction.ID, [targetDocument, finishRemoval], void 0, true));
                              })
                              .catch((error) => {
                                  error && !error.documentStatus && console.log(error);
                              })
                        : finishRemoval();
            }),
            (GWindows.prototype.init = function () {}),
            (GWindows.prototype.relayout = function (viewOffset) {
                ((this._viewOffset = viewOffset || this._viewOffset), this._activeWindow && this._relayoutWindow(this._activeWindow));
            }),
            (GWindows.prototype._relayoutWindow = function (window, forceViewUpdate) {
                window.relayout(this._htmlElement.width(), this._htmlElement.height(), this._viewOffset, forceViewUpdate);
            }),
            (GWindows.prototype._addWindow = function (document, view, index) {
                var window = new GWindow(document, view);
                return (
                    document._windows.push(window),
                    "number" == typeof index ? this._windows.splice(index, 0, window) : this._windows.push(window),
                    this.hasEventListeners(GWindows.WindowEvent) && this.trigger(new GWindows.WindowEvent(GWindows.WindowEvent.Type.Added, window, index)),
                    this.activateWindow(window),
                    window
                );
            }),
            (GWindows.prototype.getHtmlElement = function () {
                return this._htmlElement;
            }),
            (GWindows.prototype.getWindow = function (document) {
                for (var result = null, n = 0; n < this._windows.length; ++n)
                    if (this._windows[n].getDocument() === document) {
                        result = this._windows[n];
                        break;
                    }
                return result;
            }),
            (module.exports = GWindows));
    };
