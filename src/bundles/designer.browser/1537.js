module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(13));
        var i = _interopRequireDefault(require(1155));
        const { GLocale, GLocaleKey, GObject } = require(1 /* GObject */),
            l = require(392),
            c = require(1165),
            d = require(123),
            u = require(78),
            GSaveAction = require(447),
            {
                FileStatus: { IN_REVIEW, AWAITING_APPROVAL, APPROVED, REOPENED },
                GFileReviewActions: { ACTION_REQUEST_REVIEW, ACTION_REQUEST_APPROVAL, ACTION_REOPEN, ACTION_APPROVE },
                FileReviewStatusAvailable,
                ShareRoles,
                FILE_REVIEW_ENABLED,
            } = require(10 /* designerConfig */),
            GFileStatusHistoryDialog = require(1538);
        function E() {}
        (GObject.inherit(E, d),
            (E.prototype.init = function (e, t) {
                ((this._container = e), (this._fileStatusHistoryDialog = new GFileStatusHistoryDialog()), this._init());
            }),
            (E.prototype.update = function (e, t, n) {
                return (
                    e !== this._document && e
                        ? ((this._document = e),
                          this._reviewManager && this._reviewManager.removeEventListener(c.UpdateEvent, this._handleReviewUpdate, this),
                          gDesigner.addEventListener(l, this._stateChangedEvent, this),
                          (this._reviewManager = gDesigner.getFileReviewManager()),
                          this._reviewManager.addEventListener(c.UpdateEvent, this._handleReviewUpdate, this),
                          this._requestUIUpdate())
                        : e ||
                          (gDesigner.removeEventListener(l, this._stateChangedEvent, this),
                          this._reviewManager &&
                              (this._reviewManager.removeEventListener(c.UpdateEvent, this._handleReviewUpdate, this),
                              (this._reviewManager = null))),
                    (this._document = e),
                    !!this._document
                );
            }),
            (E.prototype.isAvailable = function () {
                return !!FILE_REVIEW_ENABLED;
            }),
            (E.prototype._init = function () {
                FILE_REVIEW_ENABLED &&
                    ((this._updatingStatus = false),
                    this._container.addClass("g-annotation-review-docker"),
                    this._buildMainPanel($("<div/>").addClass("panel").addClass("main-panel").hide()),
                    this._document && this._requestUIUpdate());
            }),
            (E.prototype._getDAOStatus = async function (e) {
                const t = this._getAppManager();
                var n;
                switch (e) {
                    case IN_REVIEW:
                        return (
                            (n = await t.hasAccess(ACTION_REQUEST_REVIEW, true)),
                            {
                                status: e,
                                getLabel: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.review-title")),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.review-description")),
                                getIcon: () => null,
                                getIconLabel: () => null,
                                isAvailable: async () => n && !!this._reviewManager && this._reviewManager.canUpdateToStatus(IN_REVIEW),
                            }
                        );
                    case REOPENED:
                        return (
                            (n = await t.hasAccess(ACTION_REOPEN, true)),
                            {
                                status: e,
                                getLabel: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", n ? "text.reopen-title" : "text.reopened-title")),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.reopen-description")),
                                getIcon: () => null,
                                getIconLabel: () => null,
                                isAvailable: async () => n && !!this._reviewManager && this._reviewManager.canUpdateToStatus(REOPENED),
                            }
                        );
                    case AWAITING_APPROVAL:
                        const i = t.hasRole(ShareRoles.Owner),
                            s = await this._reviewManager.hasApprovers();
                        return (
                            (n = await t.hasAccess(ACTION_REQUEST_APPROVAL, true)),
                            {
                                status: e,
                                getLabel: () =>
                                    GLocale.get(
                                        new GLocaleKey(
                                            "GReviewDockerProperties",
                                            n ? "text.request-approval-title" : "text.requested-approval-title"
                                        )
                                    ),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.request-approval-description")),
                                getIcon: () => (i && !s ? "info" : null),
                                getIconLabel: () =>
                                    i && !s ? GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.request-approval-tooltip")) : null,
                                isAvailable: async () => {
                                    const e = !!this._reviewManager && this._reviewManager.canUpdateToStatus(AWAITING_APPROVAL);
                                    return s && n && e;
                                },
                            }
                        );
                    case APPROVED:
                        n = await t.hasAccess(ACTION_APPROVE, true);
                        var o = this._getStatus();
                        return {
                            status: e,
                            getLabel: () =>
                                GLocale.get(new GLocaleKey("GReviewDockerProperties", n && e !== o ? "text.approve-title" : "text.approved-title")),
                            getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.approved-description")),
                            getIcon: () => null,
                            getIconLabel: () => null,
                            isAvailable: async () => n && !!this._reviewManager && this._reviewManager.canUpdateToStatus(APPROVED),
                        };
                }
            }),
            (E.prototype._stateChangedEvent = function () {
                this._requestUIUpdate();
            }),
            (E.prototype._handleReviewUpdate = function () {
                this._requestUIUpdate();
            }),
            (E.prototype._buildMainPanel = function (e) {
                this._mainPanel = e;
                let t = $("<div/>").addClass("row").addClass("header").appendTo(this._mainPanel);
                ($("<div/>")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.current-status")))
                    .addClass("status")
                    .click(() => {
                        ((this._opened = false), this._container.gDialog("close"));
                    })
                    .appendTo(t),
                    $("<div/>")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.status-history")))
                        .addClass("history-actions")
                        .hide()
                        .click(() => {
                            (gDesigner.stats("reviewdocker_open_status-history"), this._fileStatusHistoryDialog.open());
                        })
                        .appendTo(t),
                    (this._statusSelectorContainer = $("<div/>").addClass("row").addClass("status-selector").appendTo(this._mainPanel)));
                let n = $("<div/>").addClass("row").addClass("footer").hide().appendTo(this._mainPanel);
                ($("<div/>")
                    .addClass("footer-title")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.please-share-to-start")))
                    .appendTo(n),
                    $("<div/>")
                        .addClass("footer-action")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.share-design-now")))
                        .addClass("footer-action")
                        .click(() => this._requestShare())
                        .appendTo(n),
                    this._mainPanel.appendTo(this._container));
            }),
            (E.prototype._requestShare = function () {
                const e = gDesigner.getShareManager();
                (e.isShareProRestricted() ? gDesigner.stats("reviewdocker_nonprotriespro_share") : gDesigner.stats("reviewdocker_share"),
                    this._document.getStorageItem()
                        ? e.share()
                        : (new i.default()
                              .listen(u)
                              .when(
                                  (e) =>
                                      !!(
                                          e &&
                                          e.type &&
                                          e.document &&
                                          !e.document.isLockedByVersionHistory() &&
                                          e.type === u.Type.StorageItemUpdated &&
                                          e.document.getId()
                                      ) &&
                                      (this._document === e.document ||
                                          (this._document.getStorageItem() && this._document.getId() === e.document.getId()))
                              )
                              .do(() => e.share()),
                          gDesigner.executeAction(GSaveAction.ID)));
            }),
            (E.prototype._requestUIUpdate = async function () {
                this.isAvailable() &&
                    (this._updatingUI
                        ? (this._requestedDuringUIUpdate = true)
                        : ((this._updatingUI = true),
                          await this._updateUI(),
                          (this._updatingUI = false),
                          this._requestedDuringUIUpdate && ((this._requestedDuringUIUpdate = false), await this._updateUI())));
            }),
            (E.prototype._getAppManager = function () {
                return (this._appManager || (this._appManager = gDesigner.getApplicationManager()), this._appManager);
            }),
            (E.prototype._updateFooter = function () {
                var e = this._mainPanel.find(".footer"),
                    t = this._mainPanel.find(".history-actions");
                const n = !(!this._document || !this._document.getStorageItem());
                (e
                    .find(".footer-title")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", n ? "text.please-share-to-start" : "text-please-save-share-to-start"))),
                    e
                        .find(".footer-action")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", n ? "text.share-design-now" : "text.save-share-design-now"))),
                    this._isDocumentSane() ? (e.hide(), t.show()) : (e.show(), t.hide()));
            }),
            (E.prototype._updateUI = async function () {
                FileReviewStatusAvailable.includes(this._getStatus()) &&
                    (this._statusSelectorContainer.empty(),
                    this._mainPanel && this._mainPanel.hide(),
                    this._document &&
                        (this._mainPanel && this._mainPanel.show(),
                        await this._createStatusList(this._statusSelectorContainer),
                        this._updateFooter(),
                        this._mainPanel.show()));
            }),
            (E.prototype._getStatus = function () {
                return (this._reviewManager && this._reviewManager.getStatus()) || IN_REVIEW;
            }),
            (E.prototype._isDocumentSane = function () {
                return !!this._document && this._getAppManager().isSharing() && this._document.isCollaborative();
            }),
            (E.prototype._createStatusList = async function (e) {
                var t = this._getStatus(),
                    n = this._isStatusChangeAllowed();
                ($("<div/>").addClass("dropdown-icon").appendTo(e),
                    (this._selectedItemContainer = $("<div/>")
                        .addClass("selected-item-container")
                        .toggleClass("disabled", !this._isDocumentSane() || !n)
                        .appendTo(e)),
                    (this._currentSelectedStatusElement = await this._makeItemForDAO(await this._getDAOStatus(t), {
                        selected: true,
                        canHover: false,
                        disabled: !this._isDocumentSane(),
                    })),
                    this._currentSelectedStatusElement.appendTo(this._selectedItemContainer),
                    (this._statusListOverlay = $("<div/>").gOverlay({
                        padding: false,
                        clazz: "g-file-status-selector-overlay",
                        offsetY: -66,
                        releaseOnClose: false,
                    })),
                    (this._statusSelector = $("<div/>").addClass("g-file-status-selector").appendTo(this._statusListOverlay)));
                const o = async (e) => {
                    var n = await this._makeItemForDAO(e, {
                        selected: e.status === t,
                        canHover: true,
                    });
                    n.appendTo(this._statusSelector);
                    (await e.isAvailable())
                        ? n.on("click", async () => {
                              if (
                                  (gDesigner.stats(
                                      "reviewdocker_design",
                                      ((e) => {
                                          switch (e) {
                                              case IN_REVIEW:
                                                  return "InReview";
                                              case AWAITING_APPROVAL:
                                                  return "RequestApproval";
                                              case APPROVED:
                                                  return "Approved";
                                              case REOPENED:
                                                  return "ReOpened";
                                          }
                                      })(e.status)
                                  ),
                                  this._statusListOverlay.gOverlay("close"),
                                  this._getStatus() !== e.status)
                              ) {
                                  this._updatingStatus = true;
                                  const t = await this._makeItemForDAO(e, {
                                      selected: false,
                                      canHover: false,
                                      loading: true,
                                  });
                                  (this._currentSelectedStatusElement.replaceWith(t),
                                      (this._currentSelectedStatusElement = t),
                                      this._reviewManager
                                          .updateReviewStatus(e.status)
                                          .then(() => (this._updatingStatus = false))
                                          .catch(() => (this._updatingStatus = false)));
                              }
                          })
                        : n.on("click", () => this._statusListOverlay.gOverlay("close"));
                };
                if (this._isDocumentSane() && n) {
                    this._selectedItemContainer.removeClass("disabled");
                    for (let e = 0; e < FileReviewStatusAvailable.length; e++) {
                        var i = FileReviewStatusAvailable[e],
                            a = await this._getDAOStatus(i);
                        await o(a);
                    }
                    e.on("click", async () => {
                        this._updatingStatus || this._statusListOverlay.gOverlay("open", this._selectedItemContainer);
                    });
                }
            }),
            (E.prototype._makeItemForDAO = async function (e, t) {
                let { selected: n = false, canHover: o = true, loading: i = false, disabled: a = false } = t;
                var r = $("<div/>")
                        .addClass("g-annotation-review-docker-status-item")
                        .data("status", e)
                        .attr("status-id", e.status)
                        .toggleClass("disabled", a || (!n && !(await e.isAvailable())))
                        .toggleClass("can-hover", o)
                        .toggleClass("loading", i),
                    s = $("<div/>")
                        .addClass("icon-container")
                        .toggleClass("loading", i)
                        .append($("<div/>").addClass("loading-indicator"))
                        .appendTo(r);
                if (!i) {
                    var l = e.getIcon();
                    l ? (s.addClass(l), e.getIconLabel() && s.attr("data-title", e.getIconLabel())) : s.toggleClass("selected", n);
                }
                var c = $("<div/>").addClass("details-container").appendTo(r);
                return (
                    $("<div/>").addClass("title").text(e.getLabel()).appendTo(c),
                    $("<div/>").addClass("description").text(e.getDescription()).appendTo(c),
                    r
                );
            }),
            (E.prototype._isStatusChangeAllowed = function () {
                return true;
            }),
            (module.exports = E));
    };
