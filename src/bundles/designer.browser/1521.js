module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(32), require(97), require(33));
        const GView = require(394),
            GDocumentEvent = require(78),
            documentStatus = require(86),
            GDocumentStatusEvent = require(217);
        function Footer(htmlElement) {
            this._htmlElement = htmlElement;
        }
        ((Footer.prototype._root = null),
            (Footer.prototype._panels = []),
            (Footer.prototype._activePanel = null),
            (Footer.prototype.init = function () {
                ((this._root = $("<div></div>").addClass("root").appendTo(this._htmlElement)),
                    gravit.footer.forEach((panel) => {
                        let container = $("<div></div>").addClass("panel-container");
                        (this._root.append(container),
                            panel.init(container),
                            this._panels.push({ container: container, panel: panel }),
                            this._activePanel || this.setActivePanel(panel.getId()),
                            panel.addEventListener(
                                GView.UpdateEvent,
                                function () {
                                    (this._updateFooter(), gDesigner.relayout());
                                }.bind(this)
                            ));
                    }),
                    this._updateFooter(),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this));
            }),
            (Footer.prototype._documentEvent = function (event) {
                const document = event.document;
                switch (event.type) {
                    case GDocumentEvent.Type.Activated:
                        (document.addEventListener(GDocumentStatusEvent, this._documentStatusChanged, this), (this._document = document));
                        break;
                    case GDocumentEvent.Type.Deactivated:
                        (document.removeEventListener(GDocumentStatusEvent, this._documentStatusChanged, this), (this._document = null));
                }
            }),
            (Footer.prototype._documentStatusChanged = function (event) {
                if (!this._document || gDesigner.getActiveDocument() !== this._document) return;
                const setLoading = (loading) => this._htmlElement.toggleClass("document-loading", loading);
                switch (event.status) {
                    case documentStatus.Loading:
                    case documentStatus.Saving:
                    case documentStatus.Syncing:
                    case documentStatus.Downloading:
                        if ((this._document.isCloudFile() || this._document.isExternalFile()) && event.status === documentStatus.Saving) return;
                        setLoading(true);
                        break;
                    case documentStatus.LoadCancelled:
                    case documentStatus.DownloadCancelled:
                    case documentStatus.SaveCancelled:
                    case documentStatus.Saved:
                    case documentStatus.SyncFailed:
                    case documentStatus.Downloaded:
                    case documentStatus.DownloadFailed:
                    case documentStatus.Loaded:
                    case documentStatus.LoadFailed:
                        setLoading(false);
                }
            }),
            (Footer.prototype._updateFooter = function () {
                const e = this._panels.some((e) => e.panel.isEnabled());
                this._htmlElement.css("display", e ? "" : "none");
            }),
            (Footer.prototype.setActivePanel = function (id) {
                for (var t = 0; t < this._panels.length; ++t) {
                    var n = this._panels[t],
                        o = n.panel.getId();
                    o === id
                        ? (n.container.css("display", ""), n.panel.activate())
                        : (n.container.css("display", "none"), o === this._activePanel && n.panel.deactivate());
                }
                this._activePanel = id;
            }),
            (Footer.prototype.relayout = function () {}),
            (Footer.prototype.getHeight = function () {
                return this._htmlElement[0].clientHeight;
            }),
            (module.exports = Footer));
    };
