module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13), require(26));
        var GObject = require(1),
            designerConfig = require(10),
            dateFormatUtils = require(1163),
            GProperties = _interopRequireDefault(require(123)),
            VersionHistoryEvent = _interopRequireDefault(require(1159)),
            GCloudStorage = _interopRequireDefault(require(220 /* GCloudStorage */)),
            GDocument = _interopRequireDefault(require(163 /* GDocument */)),
            GMessageDialog = _interopRequireDefault(require(219)),
            GDocumentEvent = _interopRequireDefault(require(78)),
            GDocumentStatus = _interopRequireDefault(require(86)),
            GDocumentStatusEvent = _interopRequireDefault(require(217)),
            GStorageItemEvent = _interopRequireDefault(require(336)),
            GRichTooltip = _interopRequireDefault(require(67 /* GRichTooltipConfig */));
        function GVersionHistoryProperties() {}
        (GObject.GObject.inherit(GVersionHistoryProperties, GProperties.default),
            (GVersionHistoryProperties.ID = "version-history"),
            (GVersionHistoryProperties.TITLE = new GObject.GLocaleKey("GVersionHistoryProperties", "title")),
            (GVersionHistoryProperties.prototype._relayoutBindedToActiveDocument = null),
            (GVersionHistoryProperties.prototype._panel = null),
            (GVersionHistoryProperties.prototype._toolbar = null),
            (GVersionHistoryProperties.prototype._loadingIndicator = null),
            (GVersionHistoryProperties.prototype._previewOverlay = null),
            (GVersionHistoryProperties.prototype._fileId = null),
            (GVersionHistoryProperties.prototype._enabledInputs = null),
            (GVersionHistoryProperties.prototype._previousDoc = null),
            (GVersionHistoryProperties.prototype._previewDoc = null),
            (GVersionHistoryProperties.prototype.isGroup = function (e) {
                return true;
            }),
            (GVersionHistoryProperties.prototype.isAvailable = function (e) {
                return false;
            }),
            (GVersionHistoryProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel), (this._toolbar = toolbar));
                (toolbar.addClass("filled"),
                    toolbar.addClass("version-history-toolbar"),
                    $("<label/>")
                        .addClass("version-history-toolbar")
                        .append(
                            $("<span />")
                                .addClass("pro")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "title")))
                        )
                        .appendTo(toolbar),
                    $("<button/>")
                        .append($("<span></span>").addClass("gravit-icon-detach"))
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("version-history-panel_close_panel"), this.close());
                            }.bind(this)
                        )
                        .appendTo(toolbar),
                    (this._loadingIndicator = $("<div/>").addClass("version-history-panel-loading g-loading").appendTo(panel)),
                    (this._versionsContainer = $("<div/>")
                        .addClass("section")
                        .append([
                            $("<div/>")
                                .addClass("title")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-manual-save")))
                                .gRichTooltip(
                                    GRichTooltip.default.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-manual-save-tooltip-title")
                                        ),
                                        middle: false,
                                        marginLeft: 10,
                                    })
                                ),
                            $("<div/>").addClass("content"),
                        ])));
                var containerDiv = $("<div/>").addClass("container").append(this._versionsContainer).appendTo(panel);
                (designerConfig.AUTO_SAVE_ENABLED &&
                    (this._autoSaveContainer = $("<div/>")
                        .addClass("section")
                        .append([
                            $("<div/>")
                                .addClass("title")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-auto-save")))
                                .gRichTooltip(
                                    GRichTooltip.default.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-auto-save-tooltip-title")
                                        ),
                                        middle: false,
                                        marginLeft: 10,
                                    })
                                ),
                            $("<div/>").addClass("content"),
                        ])
                        .appendTo(containerDiv)),
                    gDesigner.addEventListener(VersionHistoryEvent.default, this._handleEvent, this));
            }),
            (GVersionHistoryProperties.prototype._handleEvent = function (event) {
                event.type === VersionHistoryEvent.default.Type.Enable ? this._updateVersionHistory(event.fileId) : event.type === VersionHistoryEvent.default.Type.Close && this.close();
            }),
            (GVersionHistoryProperties.prototype._updateVersionHistory = function (fileId) {
                (this._versionsContainer.find(".content").empty(),
                    designerConfig.AUTO_SAVE_ENABLED && this._autoSaveContainer.find(".content").empty(),
                    this._toggleLoading(true));
                var self = this;
                this._fileId = fileId;
                const loadPromises = [
                    designerConfig.gApi.listVersions(this._fileId, "tf").then((response) => {
                        const { f: versions, t: thumbnailRefs } = response;
                        let thumbnailPromises = [];
                        for (let e = 0, t = thumbnailRefs ? thumbnailRefs.length : 0; e < t; e++)
                            thumbnailRefs[e] ? thumbnailPromises.push(designerConfig.gApi.getFile(this._fileId, false, thumbnailRefs[e].versionId, "t")) : thumbnailPromises.push(null);
                        return Promise.all(thumbnailPromises).then((thumbnails) => {
                            let results = [];
                            for (let o = 0, i = versions.length; o < i; o++) {
                                let entry = {
                                    version: versions[o],
                                    thumbnail: thumbnails[o] || {
                                        name: gDesigner.getWindows().getActiveWindow().getTitle(),
                                        url_t: "assets/icon/versus.svg",
                                    },
                                };
                                results.push(entry);
                            }
                            return Promise.resolve(results);
                        });
                    }),
                ];
                (designerConfig.AUTO_SAVE_ENABLED &&
                    loadPromises.push(
                        designerConfig.gApi.listAutoSaves(this._fileId).then((autoSaveResponse) => {
                            let autoSaveResults = [],
                                thumbnailPromises2 = [];
                            for (let t = 0, o = autoSaveResponse.versions.length; t < o; t++)
                                thumbnailPromises2.push(
                                    autoSaveResponse.versions_t && autoSaveResponse.versions_t[t]
                                        ? designerConfig.gApi.getAutoSaveThumbnail(this._fileId, autoSaveResponse.versions_t[t].versionId)
                                        : null
                                );
                            return Promise.all(thumbnailPromises2).then((thumbnails2) => {
                                for (let o = 0, i = autoSaveResponse.versions.length; o < i; o++) {
                                    let entry = {
                                        version: autoSaveResponse.versions[o],
                                        thumbnail: {
                                            name: gDesigner.getWindows().getActiveWindow().getTitle(),
                                            url_t: (thumbnails2 && thumbnails2[o] && thumbnails2[o].url) || "assets/icon/versus.svg",
                                        },
                                        autosave: true,
                                    };
                                    autoSaveResults.push(entry);
                                }
                                return autoSaveResults;
                            });
                        })
                    ),
                    Promise.all(loadPromises)
                        .then((results) => {
                            let [versionEntries, autoSaveEntries] = results;
                            (self._renderVersionsList(versionEntries, autoSaveEntries), this._toggleLoading(false));
                        })
                        .catch(
                            (e) => (
                                new GMessageDialog.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "error-loading"))).open(),
                                this._toggleLoading(false),
                                false
                            )
                        ));
            }),
            (GVersionHistoryProperties.prototype._renderVersionsList = function (versionEntries, autoSaveEntries) {
                const isPro = gDesigner.isEnabledProFeatures(),
                    self = this,
                    storageItem = gDesigner.getActiveDocument().getStorageItem(),
                    currentVersionId = storageItem && storageItem.getVersionId && storageItem.getVersionId(),
                    hasVersionId = !!currentVersionId;
                let autoSaveContentEl,
                    versionsContentEl = this._versionsContainer.find(".content");
                designerConfig.AUTO_SAVE_ENABLED && (autoSaveContentEl = this._autoSaveContainer.find(".content"));
                const latestVersionEntry = versionEntries.find((entry) => entry.version.latest);
                let currentEntry = latestVersionEntry,
                    isAutoSaveCurrent = false;
                if (designerConfig.AUTO_SAVE_ENABLED && autoSaveEntries && autoSaveEntries.length) {
                    const autoSaveEntry = autoSaveEntries.find((autoSaveEntry) => autoSaveEntry.version.latest);
                    designerConfig.DateAPI.lt(latestVersionEntry.version.modified, autoSaveEntry.version.modified, false) && ((currentEntry = autoSaveEntry), (isAutoSaveCurrent = true));
                }
                const renderItem = (entry, index, count) => {
                    let { version, thumbnail, autosave } = entry;
                    return $("<div />")
                        .addClass("version-history-item")
                        .addClass((hasVersionId ? currentVersionId === version.versionId : ((isAutoSaveCurrent && autosave) || (!isAutoSaveCurrent && !autosave)) && version.latest) ? "vhi-initial" : "")
                        .addClass(isPro || version.latest ? "" : "vhi-disabled")
                        .addClass((hasVersionId ? currentVersionId === version.versionId : version.versionId === currentEntry.version.versionId) ? "vhi-active" : "")
                        .append(
                            $("<div />")
                                .addClass("vhi-thumbnail")
                                .css("background-image", "url(" + thumbnail.url_t + ")")
                        )
                        .append(
                            $("<div />")
                                .addClass("vhi-info")
                                .append(
                                    $("<div />")
                                        .addClass("vhi-title")
                                        .text(
                                            version.versionId === currentEntry.version.versionId
                                                ? GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.current-version"))
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.version")).replace(
                                                      "%version",
                                                      count - index
                                                  )
                                        )
                                )
                                .append(
                                    $("<div />")
                                        .addClass("vhi-updated")
                                        .text((0, dateFormatUtils.dateToVersionFormat)(version.modified))
                                )
                        )
                        .append(
                            $("<div />")
                                .addClass("vhi-settings")
                                .addClass("gravit-icon-settings")
                                .on("click", function (event) {
                                    (event.stopPropagation(),
                                        (isPro || version.latest) &&
                                            ($(this).find(".vhi-settings-list").toggle(),
                                            gDesigner.stats("version-history-panel_click_setting-icon")));
                                })
                                .on("dblclick", function (event) {
                                    event.stopPropagation();
                                })
                                .append(
                                    $("<div />")
                                        .addClass("vhi-settings-list")
                                        .append(
                                            $("<div />")
                                                .addClass("vhi-settings-item g-menu-item-menu")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "preview")))
                                                .on("click", function (event) {
                                                    (event.stopPropagation(),
                                                        gDesigner.stats("version-history-panel_show-preview_from-settings-menu"),
                                                        gDesigner.intercomStats("Preview version from history"),
                                                        self._showPreview(version.versionId, thumbnail.name, $(this).closest(".version-history-item"), autosave),
                                                        $(this).parent(".vhi-settings-list").hide());
                                                })
                                        )
                                        .append(
                                            $("<div />")
                                                .addClass("vhi-settings-item g-menu-item-menu")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "restore")))
                                                .on("click", function (event) {
                                                    (event.stopPropagation(),
                                                        gDesigner.stats("version-history-panel_restore-version_from-settings-menu"),
                                                        gDesigner.intercomStats("Open version from history"),
                                                        self._applyVersion(version.versionId, thumbnail.name, autosave),
                                                        $(this).parent(".vhi-settings-list").hide());
                                                })
                                        )
                                )
                        )
                        .on("click", function (e) {
                            if ($(this).hasClass("vhi-disabled"))
                                return (
                                    gDesigner.stats("version-history-panel_click_disabled"),
                                    gDesigner.handlePROFeatureInterruption(),
                                    false
                                );
                            var clickedElement = this;
                            setTimeout(function () {
                                var dblclickCount = parseInt($(clickedElement).data("dblclicked"), 10);
                                dblclickCount
                                    ? $(clickedElement).data("dblclicked", dblclickCount - 1)
                                    : (gDesigner.stats("version-history-panel_show-preview_from-main-panel"),
                                      self._showPreview(version.versionId, thumbnail.name, $(clickedElement), autosave),
                                      gDesigner.intercomStats("Preview version from history"));
                            }, 500);
                        })
                        .on("dblclick", function (e) {
                            if ($(this).hasClass("vhi-disabled"))
                                return (
                                    gDesigner.stats("version-history-panel_dblclick_disabled"),
                                    gDesigner.handlePROFeatureInterruption(),
                                    false
                                );
                            ($(this).data("dblclicked", 2),
                                gDesigner.stats("version-history-panel_apply-version"),
                                self._applyVersion(version.versionId, thumbnail.name, autosave),
                                gDesigner.intercomStats("Open version from history"));
                        })
                        .on("mouseenter", function () {
                            (isPro || version.latest) && $(this).addClass("show-icon");
                        })
                        .on("mouseleave", function () {
                            ($(this).removeClass("show-icon"), $(this).find(".vhi-settings-list").hide());
                        });
                };
                function renderList(entries) {
                    for (let t = 0, n = entries.length; t < n; t++) {
                        let item = entries[t],
                            targetContainer = null;
                        ((targetContainer = item.autosave ? autoSaveContentEl : versionsContentEl), targetContainer.append(renderItem(item, t, n)));
                    }
                }
                (versionsContentEl.empty(),
                    autoSaveContentEl && autoSaveContentEl.empty(),
                    renderList(versionEntries),
                    designerConfig.AUTO_SAVE_ENABLED && renderList(autoSaveEntries),
                    this._updatePanelHeight(),
                    gDesigner.addEventListener(GDocumentEvent.default, this._documentEvent, this),
                    gDesigner.addEventListener(GStorageItemEvent.default, this._storageEventHandler, this));
            }),
            (GVersionHistoryProperties.prototype._updatePanelHeight = function () {
                let panelHeight = parseInt(this._panel.closest(".sidebar-inspector").outerHeight(), 10) - parseInt(this._toolbar.outerHeight(), 10);
                this._panel.css("height", panelHeight);
            }),
            (GVersionHistoryProperties.prototype._documentStatusEventHandler = function (event) {
                let { status } = event;
                status === GDocumentStatus.default.LoadFailed && this._closePreview();
            }),
            (GVersionHistoryProperties.prototype._documentEvent = function (event) {
                let { document, type } = event;
                if (type === GDocumentEvent.default.Type.AutoSaveSynchronized) return void this._updateVersionHistory(this._fileId);
                if (this._loadingPreview) return;
                const isCloudStorage = document.getStorageItem() instanceof GCloudStorage.default.Item,
                    scene = document.getScene();
                ((isCloudStorage && document.getStorageItem().getId() !== this._fileId) || (!isCloudStorage && scene && scene.getProperty("cid") !== this._fileId)) && this.close();
            }),
            (GVersionHistoryProperties.prototype._storageEventHandler = function (event) {
                let { type: eventType, storageItem } = event;
                eventType === GStorageItemEvent.default.Type.VersionUpdate &&
                    storageItem instanceof GCloudStorage.default.Item &&
                    this._fileId === storageItem.getId() &&
                    this._updateVersionHistory(this._fileId);
            }),
            (GVersionHistoryProperties.prototype._showPreview = async function (versionId, title, targetElement, autosave) {
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument.isModified())
                    return (new GMessageDialog.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                this._loadingPreview = true;
                var previewDocument = new GDocument.default(await GCloudStorage.default.from(gDesigner.getDefaultStorage(), this._fileId, title, versionId, !!autosave));
                (previewDocument.lockByVersionHistory(),
                    this._previewDoc
                        ? (gDesigner.replaceDocument(this._previewDoc, previewDocument),
                          this._previewDoc.removeEventListener(GDocumentStatusEvent.default, this._documentStatusEventHandler, this),
                          (this._previewDoc = previewDocument))
                        : ((this._previousDoc = activeDocument), (this._previewDoc = previewDocument), gDesigner.replaceDocument(this._previousDoc, previewDocument)),
                    previewDocument.addEventListener(GDocumentStatusEvent.default, this._documentStatusEventHandler, this),
                    previewDocument.load(null, {
                        progress: (percent) => {
                            100 == percent &&
                                ((this._loadingPreview = false), gDesigner.trigger(new GDocumentEvent.default(GDocumentEvent.default.Type.StorageItemUpdated, previewDocument)));
                        },
                    }),
                    this._enabledInputs ||
                        ((this._enabledInputs = {
                            allEnabledButtons: $("button:not([disabled=true])"),
                            allEnabledInput: $("input:not([disabled=true])"),
                            allEnabledTextarea: $("textarea:not([disabled=true])"),
                        }),
                        this._enabledInputs.allEnabledButtons.attr("disabled", true),
                        this._enabledInputs.allEnabledInput.attr("disabled", true),
                        this._enabledInputs.allEnabledTextarea.attr("disabled", true)),
                    $(".version-history-item.vhi-active").removeClass("vhi-active"),
                    targetElement.addClass("vhi-active"),
                    this._previewOverlay ||
                        ((this._previewOverlay = $("<div />")
                            .css({
                                position: "absolute",
                                zIndex: 9999,
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            })
                            .data("versionId", versionId)
                            .data("title", title)
                            .appendTo($("body"))),
                        this._relayout(versionId, title, autosave),
                        this._relayoutBindedToActiveDocument && window.removeEventListener("resize", this._relayoutBindedToActiveDocument),
                        (this._relayoutBindedToActiveDocument = this._relayout.bind(this, versionId, title, autosave)),
                        window.addEventListener("resize", this._relayoutBindedToActiveDocument)));
            }),
            (GVersionHistoryProperties.prototype._relayout = function (versionId, title, autosave) {
                if (this._previewOverlay) {
                    var toolbarEl = $("#toolbar");
                    ((this._buttonsToolbar = $("<div />")
                        .addClass("vhp-preview-overlay")
                        .css({
                            position: toolbarEl.css("position"),
                            top: toolbarEl.css("top"),
                            left: toolbarEl.css("left"),
                            right: toolbarEl.css("right"),
                            bottom: toolbarEl.css("bottom"),
                            background: toolbarEl.css("background") || toolbarEl.css("background-color"),
                            border: toolbarEl.css("border"),
                        })
                        .append(
                            $("<button />")
                                .addClass("edit-version")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "edit-version")))
                                .on(
                                    "click",
                                    function () {
                                        (gDesigner.stats("version-history-panel_edit-version"),
                                            gDesigner.intercomStats("Open version from history"),
                                            this._applyVersion(versionId, title, autosave));
                                    }.bind(this)
                                )
                        )
                        .append(
                            $("<button />")
                                .addClass("close-preview")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "close-preview")))
                                .on(
                                    "click",
                                    function () {
                                        (gDesigner.stats("version-history-panel_close_preview"), this._closePreview());
                                    }.bind(this)
                                )
                        )),
                        this._previewOverlay.empty().append(this._buttonsToolbar),
                        this._panel.addClass("z-index-top"),
                        this._toolbar.addClass("z-index-top"));
                }
                this._updatePanelHeight();
            }),
            (GVersionHistoryProperties.prototype._closePreview = function () {
                (this._enabledInputs &&
                    (this._enabledInputs.allEnabledButtons.removeAttr("disabled"),
                    this._enabledInputs.allEnabledInput.removeAttr("disabled"),
                    this._enabledInputs.allEnabledTextarea.removeAttr("disabled"),
                    (this._enabledInputs = null)),
                    this._previousDoc && (gDesigner.openDocument(this._previousDoc.getStorageItem()), (this._previousDoc = null)),
                    this._previewDoc &&
                        (this._previewDoc.removeEventListener(GDocumentStatusEvent.default, this._documentStatusEventHandler, this),
                        this._previewDoc !== gDesigner.getActiveDocument() && gDesigner.removeDocument(this._previewDoc),
                        (this._previewDoc = null),
                        $(".version-history-item.vhi-active").removeClass("vhi-active"),
                        $(".version-history-item.vhi-initial").addClass("vhi-active")),
                    this._previewOverlay &&
                        (window.removeEventListener("resize", this._relayoutBindedToActiveDocument),
                        this._panel.removeClass("z-index-top"),
                        this._toolbar.removeClass("z-index-top"),
                        this._previewOverlay.remove(),
                        (this._previewOverlay = null)));
            }),
            (GVersionHistoryProperties.prototype._applyVersion = async function (versionId, title, autosave) {
                gDesigner.stats("version-history-panel_open_version", this._fileId);
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument.isModified())
                    return (new GMessageDialog.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                var newDocument = gDesigner.openDocumentWithReload(await GCloudStorage.default.from(gDesigner.getDefaultStorage(), this._fileId, title, versionId, autosave));
                (gDesigner.activateDocument(newDocument),
                    this._previousDoc && (this._previousDoc = null),
                    this._previewDoc || gDesigner.removeDocument(activeDocument),
                    this.close());
            }),
            (GVersionHistoryProperties.prototype._toggleLoading = function (isLoading) {
                var containerEl = this._panel.find(".container");
                isLoading ? (containerEl.hide(), this._loadingIndicator.show()) : (containerEl.show(), this._loadingIndicator.hide());
            }),
            (GVersionHistoryProperties.prototype.close = function () {
                (gDesigner.stats("version-history-panel_close_panel", this._fileId),
                    this._closePreview(),
                    gDesigner.trigger(new VersionHistoryEvent.default(VersionHistoryEvent.default.Type.Disable)),
                    gDesigner.removeEventListener(GDocumentEvent.default, this._documentEvent, this),
                    gDesigner.removeEventListener(GStorageItemEvent.default, this._storageEventHandler, this));
            }),
            (GVersionHistoryProperties.prototype.toString = function () {
                return "[Object GVersionHistoryProperties]";
            }),
            (module.exports = GVersionHistoryProperties));
    };
