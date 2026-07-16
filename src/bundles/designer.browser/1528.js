module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13), require(26));
        var GObject = require(1),
            designerConfig = require(10),
            r = require(1163),
            s = _interopRequireDefault(require(123)),
            l = _interopRequireDefault(require(1159)),
            c = _interopRequireDefault(require(220 /* GCloudStorage */)),
            d = _interopRequireDefault(require(163 /* GDocument */)),
            u = _interopRequireDefault(require(219)),
            p = _interopRequireDefault(require(78)),
            g = _interopRequireDefault(require(86)),
            h = _interopRequireDefault(require(217)),
            f = _interopRequireDefault(require(336)),
            m = _interopRequireDefault(require(67));
        function y() {}
        (GObject.GObject.inherit(y, s.default),
            (y.ID = "version-history"),
            (y.TITLE = new GObject.GLocaleKey("GVersionHistoryProperties", "title")),
            (y.prototype._relayoutBindedToActiveDocument = null),
            (y.prototype._panel = null),
            (y.prototype._toolbar = null),
            (y.prototype._loadingIndicator = null),
            (y.prototype._previewOverlay = null),
            (y.prototype._fileId = null),
            (y.prototype._enabledInputs = null),
            (y.prototype._previousDoc = null),
            (y.prototype._previewDoc = null),
            (y.prototype.isGroup = function (e) {
                return true;
            }),
            (y.prototype.isAvailable = function (e) {
                return false;
            }),
            (y.prototype.init = function (e, t) {
                ((this._panel = e), (this._toolbar = t));
                (t.addClass("filled"),
                    t.addClass("version-history-toolbar"),
                    $("<label/>")
                        .addClass("version-history-toolbar")
                        .append(
                            $("<span />")
                                .addClass("pro")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "title")))
                        )
                        .appendTo(t),
                    $("<button/>")
                        .append($("<span></span>").addClass("gravit-icon-detach"))
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("version-history-panel_close_panel"), this.close());
                            }.bind(this)
                        )
                        .appendTo(t),
                    (this._loadingIndicator = $("<div/>").addClass("version-history-panel-loading g-loading").appendTo(e)),
                    (this._versionsContainer = $("<div/>")
                        .addClass("section")
                        .append([
                            $("<div/>")
                                .addClass("title")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-manual-save")))
                                .gRichTooltip(
                                    m.default.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-manual-save-tooltip-title")
                                        ),
                                        middle: false,
                                        marginLeft: 10,
                                    })
                                ),
                            $("<div/>").addClass("content"),
                        ])));
                var n = $("<div/>").addClass("container").append(this._versionsContainer).appendTo(e);
                (designerConfig.AUTO_SAVE_ENABLED &&
                    (this._autoSaveContainer = $("<div/>")
                        .addClass("section")
                        .append([
                            $("<div/>")
                                .addClass("title")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-auto-save")))
                                .gRichTooltip(
                                    m.default.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GVersionHistoryProperties", "text.title-auto-save-tooltip-title")
                                        ),
                                        middle: false,
                                        marginLeft: 10,
                                    })
                                ),
                            $("<div/>").addClass("content"),
                        ])
                        .appendTo(n)),
                    gDesigner.addEventListener(l.default, this._handleEvent, this));
            }),
            (y.prototype._handleEvent = function (e) {
                e.type === l.default.Type.Enable ? this._updateVersionHistory(e.fileId) : e.type === l.default.Type.Close && this.close();
            }),
            (y.prototype._updateVersionHistory = function (e) {
                (this._versionsContainer.find(".content").empty(),
                    designerConfig.AUTO_SAVE_ENABLED && this._autoSaveContainer.find(".content").empty(),
                    this._toggleLoading(true));
                var t = this;
                this._fileId = e;
                const n = [
                    designerConfig.gApi.listVersions(this._fileId, "tf").then((e) => {
                        const { f: t, t: n } = e;
                        let o = [];
                        for (let e = 0, t = n ? n.length : 0; e < t; e++)
                            n[e] ? o.push(designerConfig.gApi.getFile(this._fileId, false, n[e].versionId, "t")) : o.push(null);
                        return Promise.all(o).then((e) => {
                            let n = [];
                            for (let o = 0, i = t.length; o < i; o++) {
                                let i = {
                                    version: t[o],
                                    thumbnail: e[o] || {
                                        name: gDesigner.getWindows().getActiveWindow().getTitle(),
                                        url_t: "assets/icon/versus.svg",
                                    },
                                };
                                n.push(i);
                            }
                            return Promise.resolve(n);
                        });
                    }),
                ];
                (designerConfig.AUTO_SAVE_ENABLED &&
                    n.push(
                        designerConfig.gApi.listAutoSaves(this._fileId).then((e) => {
                            let t = [],
                                n = [];
                            for (let t = 0, o = e.versions.length; t < o; t++)
                                n.push(
                                    e.versions_t && e.versions_t[t]
                                        ? designerConfig.gApi.getAutoSaveThumbnail(this._fileId, e.versions_t[t].versionId)
                                        : null
                                );
                            return Promise.all(n).then((n) => {
                                for (let o = 0, i = e.versions.length; o < i; o++) {
                                    let i = {
                                        version: e.versions[o],
                                        thumbnail: {
                                            name: gDesigner.getWindows().getActiveWindow().getTitle(),
                                            url_t: (n && n[o] && n[o].url) || "assets/icon/versus.svg",
                                        },
                                        autosave: true,
                                    };
                                    t.push(i);
                                }
                                return t;
                            });
                        })
                    ),
                    Promise.all(n)
                        .then((e) => {
                            let [n, o] = e;
                            (t._renderVersionsList(n, o), this._toggleLoading(false));
                        })
                        .catch(
                            (e) => (
                                new u.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "error-loading"))).open(),
                                this._toggleLoading(false),
                                false
                            )
                        ));
            }),
            (y.prototype._renderVersionsList = function (e, t) {
                const n = gDesigner.isEnabledProFeatures(),
                    o = this,
                    s = gDesigner.getActiveDocument().getStorageItem(),
                    l = s && s.getVersionId && s.getVersionId(),
                    c = !!l;
                let d,
                    u = this._versionsContainer.find(".content");
                designerConfig.AUTO_SAVE_ENABLED && (d = this._autoSaveContainer.find(".content"));
                const g = e.find((e) => e.version.latest);
                let h = g,
                    m = false;
                if (designerConfig.AUTO_SAVE_ENABLED && t && t.length) {
                    const e = t.find((e) => e.version.latest);
                    designerConfig.DateAPI.lt(g.version.modified, e.version.modified, false) && ((h = e), (m = true));
                }
                const y = (e, t, a) => {
                    let { version, thumbnail, autosave } = e;
                    return $("<div />")
                        .addClass("version-history-item")
                        .addClass((c ? l === version.versionId : ((m && autosave) || (!m && !autosave)) && version.latest) ? "vhi-initial" : "")
                        .addClass(n || version.latest ? "" : "vhi-disabled")
                        .addClass((c ? l === version.versionId : version.versionId === h.version.versionId) ? "vhi-active" : "")
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
                                            version.versionId === h.version.versionId
                                                ? GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.current-version"))
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "text.version")).replace(
                                                      "%version",
                                                      a - t
                                                  )
                                        )
                                )
                                .append(
                                    $("<div />")
                                        .addClass("vhi-updated")
                                        .text((0, r.dateToVersionFormat)(version.modified))
                                )
                        )
                        .append(
                            $("<div />")
                                .addClass("vhi-settings")
                                .addClass("gravit-icon-settings")
                                .on("click", function (e) {
                                    (e.stopPropagation(),
                                        (n || version.latest) &&
                                            ($(this).find(".vhi-settings-list").toggle(),
                                            gDesigner.stats("version-history-panel_click_setting-icon")));
                                })
                                .on("dblclick", function (e) {
                                    e.stopPropagation();
                                })
                                .append(
                                    $("<div />")
                                        .addClass("vhi-settings-list")
                                        .append(
                                            $("<div />")
                                                .addClass("vhi-settings-item g-menu-item-menu")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "preview")))
                                                .on("click", function (e) {
                                                    (e.stopPropagation(),
                                                        gDesigner.stats("version-history-panel_show-preview_from-settings-menu"),
                                                        gDesigner.intercomStats("Preview version from history"),
                                                        o._showPreview(version.versionId, thumbnail.name, $(this).closest(".version-history-item"), autosave),
                                                        $(this).parent(".vhi-settings-list").hide());
                                                })
                                        )
                                        .append(
                                            $("<div />")
                                                .addClass("vhi-settings-item g-menu-item-menu")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GVersionHistoryProperties", "restore")))
                                                .on("click", function (e) {
                                                    (e.stopPropagation(),
                                                        gDesigner.stats("version-history-panel_restore-version_from-settings-menu"),
                                                        gDesigner.intercomStats("Open version from history"),
                                                        o._applyVersion(version.versionId, thumbnail.name, autosave),
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
                            var t = this;
                            setTimeout(function () {
                                var e = parseInt($(t).data("dblclicked"), 10);
                                e
                                    ? $(t).data("dblclicked", e - 1)
                                    : (gDesigner.stats("version-history-panel_show-preview_from-main-panel"),
                                      o._showPreview(version.versionId, thumbnail.name, $(t), autosave),
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
                                o._applyVersion(version.versionId, thumbnail.name, autosave),
                                gDesigner.intercomStats("Open version from history"));
                        })
                        .on("mouseenter", function () {
                            (n || version.latest) && $(this).addClass("show-icon");
                        })
                        .on("mouseleave", function () {
                            ($(this).removeClass("show-icon"), $(this).find(".vhi-settings-list").hide());
                        });
                };
                function v(e) {
                    for (let t = 0, n = e.length; t < n; t++) {
                        let o = e[t],
                            i = null;
                        ((i = o.autosave ? d : u), i.append(y(o, t, n)));
                    }
                }
                (u.empty(),
                    d && d.empty(),
                    v(e),
                    designerConfig.AUTO_SAVE_ENABLED && v(t),
                    this._updatePanelHeight(),
                    gDesigner.addEventListener(p.default, this._documentEvent, this),
                    gDesigner.addEventListener(f.default, this._storageEventHandler, this));
            }),
            (y.prototype._updatePanelHeight = function () {
                let e = parseInt(this._panel.closest(".sidebar-inspector").outerHeight(), 10) - parseInt(this._toolbar.outerHeight(), 10);
                this._panel.css("height", e);
            }),
            (y.prototype._documentStatusEventHandler = function (e) {
                let { status } = e;
                status === g.default.LoadFailed && this._closePreview();
            }),
            (y.prototype._documentEvent = function (e) {
                let { document, type } = e;
                if (type === p.default.Type.AutoSaveSynchronized) return void this._updateVersionHistory(this._fileId);
                if (this._loadingPreview) return;
                const o = document.getStorageItem() instanceof c.default.Item,
                    i = document.getScene();
                ((o && document.getStorageItem().getId() !== this._fileId) || (!o && i && i.getProperty("cid") !== this._fileId)) && this.close();
            }),
            (y.prototype._storageEventHandler = function (e) {
                let { type: t, storageItem } = e;
                t === f.default.Type.VersionUpdate &&
                    storageItem instanceof c.default.Item &&
                    this._fileId === storageItem.getId() &&
                    this._updateVersionHistory(this._fileId);
            }),
            (y.prototype._showPreview = async function (e, t, n, o) {
                var a = gDesigner.getActiveDocument();
                if (a.isModified())
                    return (new u.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                this._loadingPreview = true;
                var r = new d.default(await c.default.from(gDesigner.getDefaultStorage(), this._fileId, t, e, !!o));
                (r.lockByVersionHistory(),
                    this._previewDoc
                        ? (gDesigner.replaceDocument(this._previewDoc, r),
                          this._previewDoc.removeEventListener(h.default, this._documentStatusEventHandler, this),
                          (this._previewDoc = r))
                        : ((this._previousDoc = a), (this._previewDoc = r), gDesigner.replaceDocument(this._previousDoc, r)),
                    r.addEventListener(h.default, this._documentStatusEventHandler, this),
                    r.load(null, {
                        progress: (e) => {
                            100 == e &&
                                ((this._loadingPreview = false), gDesigner.trigger(new p.default(p.default.Type.StorageItemUpdated, r)));
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
                    n.addClass("vhi-active"),
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
                            .data("versionId", e)
                            .data("title", t)
                            .appendTo($("body"))),
                        this._relayout(e, t, o),
                        this._relayoutBindedToActiveDocument && window.removeEventListener("resize", this._relayoutBindedToActiveDocument),
                        (this._relayoutBindedToActiveDocument = this._relayout.bind(this, e, t, o)),
                        window.addEventListener("resize", this._relayoutBindedToActiveDocument)));
            }),
            (y.prototype._relayout = function (e, t, n) {
                if (this._previewOverlay) {
                    var o = $("#toolbar");
                    ((this._buttonsToolbar = $("<div />")
                        .addClass("vhp-preview-overlay")
                        .css({
                            position: o.css("position"),
                            top: o.css("top"),
                            left: o.css("left"),
                            right: o.css("right"),
                            bottom: o.css("bottom"),
                            background: o.css("background") || o.css("background-color"),
                            border: o.css("border"),
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
                                            this._applyVersion(e, t, n));
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
            (y.prototype._closePreview = function () {
                (this._enabledInputs &&
                    (this._enabledInputs.allEnabledButtons.removeAttr("disabled"),
                    this._enabledInputs.allEnabledInput.removeAttr("disabled"),
                    this._enabledInputs.allEnabledTextarea.removeAttr("disabled"),
                    (this._enabledInputs = null)),
                    this._previousDoc && (gDesigner.openDocument(this._previousDoc.getStorageItem()), (this._previousDoc = null)),
                    this._previewDoc &&
                        (this._previewDoc.removeEventListener(h.default, this._documentStatusEventHandler, this),
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
            (y.prototype._applyVersion = async function (e, t, n) {
                gDesigner.stats("version-history-panel_open_version", this._fileId);
                var o = gDesigner.getActiveDocument();
                if (o.isModified())
                    return (new u.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                var a = gDesigner.openDocumentWithReload(await c.default.from(gDesigner.getDefaultStorage(), this._fileId, t, e, n));
                (gDesigner.activateDocument(a),
                    this._previousDoc && (this._previousDoc = null),
                    this._previewDoc || gDesigner.removeDocument(o),
                    this.close());
            }),
            (y.prototype._toggleLoading = function (e) {
                var t = this._panel.find(".container");
                e ? (t.hide(), this._loadingIndicator.show()) : (t.show(), this._loadingIndicator.hide());
            }),
            (y.prototype.close = function () {
                (gDesigner.stats("version-history-panel_close_panel", this._fileId),
                    this._closePreview(),
                    gDesigner.trigger(new l.default(l.default.Type.Disable)),
                    gDesigner.removeEventListener(p.default, this._documentEvent, this),
                    gDesigner.removeEventListener(f.default, this._storageEventHandler, this));
            }),
            (y.prototype.toString = function () {
                return "[Object GVersionHistoryProperties]";
            }),
            (module.exports = y));
    };
