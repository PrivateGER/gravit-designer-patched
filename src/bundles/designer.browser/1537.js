module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(13));
        var EventWaiter = _interopRequireDefault(require(1155));
        const { GLocale, GLocaleKey, GObject } = require(1 /* GObject */),
            GApplicationStateChangedEvent = require(392),
            GFileReviewManager = require(1165),
            GProperties = require(123),
            GDocumentEvent = require(78),
            GSaveAction = require(447),
            {
                FileStatus: { IN_REVIEW, AWAITING_APPROVAL, APPROVED, REOPENED },
                GFileReviewActions: { ACTION_REQUEST_REVIEW, ACTION_REQUEST_APPROVAL, ACTION_REOPEN, ACTION_APPROVE },
                FileReviewStatusAvailable,
                ShareRoles,
                FILE_REVIEW_ENABLED,
            } = require(10 /* designerConfig */),
            GFileStatusHistoryDialog = require(1538);
        function GReviewDockerProperties() {}
        (GObject.inherit(GReviewDockerProperties, GProperties),
            (GReviewDockerProperties.prototype.init = function (container, t) {
                ((this._container = container), (this._fileStatusHistoryDialog = new GFileStatusHistoryDialog()), this._init());
            }),
            (GReviewDockerProperties.prototype.update = function (document, t, n) {
                return (
                    document !== this._document && document
                        ? ((this._document = document),
                          this._reviewManager && this._reviewManager.removeEventListener(GFileReviewManager.UpdateEvent, this._handleReviewUpdate, this),
                          gDesigner.addEventListener(GApplicationStateChangedEvent, this._stateChangedEvent, this),
                          (this._reviewManager = gDesigner.getFileReviewManager()),
                          this._reviewManager.addEventListener(GFileReviewManager.UpdateEvent, this._handleReviewUpdate, this),
                          this._requestUIUpdate())
                        : document ||
                          (gDesigner.removeEventListener(GApplicationStateChangedEvent, this._stateChangedEvent, this),
                          this._reviewManager &&
                              (this._reviewManager.removeEventListener(GFileReviewManager.UpdateEvent, this._handleReviewUpdate, this),
                              (this._reviewManager = null))),
                    (this._document = document),
                    !!this._document
                );
            }),
            (GReviewDockerProperties.prototype.isAvailable = function () {
                return !!FILE_REVIEW_ENABLED;
            }),
            (GReviewDockerProperties.prototype._init = function () {
                FILE_REVIEW_ENABLED &&
                    ((this._updatingStatus = false),
                    this._container.addClass("g-annotation-review-docker"),
                    this._buildMainPanel($("<div/>").addClass("panel").addClass("main-panel").hide()),
                    this._document && this._requestUIUpdate());
            }),
            (GReviewDockerProperties.prototype._getDAOStatus = async function (status) {
                const appManager = this._getAppManager();
                var hasAccess;
                switch (status) {
                    case IN_REVIEW:
                        return (
                            (hasAccess = await appManager.hasAccess(ACTION_REQUEST_REVIEW, true)),
                            {
                                status: status,
                                getLabel: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.review-title")),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.review-description")),
                                getIcon: () => null,
                                getIconLabel: () => null,
                                isAvailable: async () => hasAccess && !!this._reviewManager && this._reviewManager.canUpdateToStatus(IN_REVIEW),
                            }
                        );
                    case REOPENED:
                        return (
                            (hasAccess = await appManager.hasAccess(ACTION_REOPEN, true)),
                            {
                                status: status,
                                getLabel: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", hasAccess ? "text.reopen-title" : "text.reopened-title")),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.reopen-description")),
                                getIcon: () => null,
                                getIconLabel: () => null,
                                isAvailable: async () => hasAccess && !!this._reviewManager && this._reviewManager.canUpdateToStatus(REOPENED),
                            }
                        );
                    case AWAITING_APPROVAL:
                        const isOwner = appManager.hasRole(ShareRoles.Owner),
                            hasApprovers = await this._reviewManager.hasApprovers();
                        return (
                            (hasAccess = await appManager.hasAccess(ACTION_REQUEST_APPROVAL, true)),
                            {
                                status: status,
                                getLabel: () =>
                                    GLocale.get(
                                        new GLocaleKey(
                                            "GReviewDockerProperties",
                                            hasAccess ? "text.request-approval-title" : "text.requested-approval-title"
                                        )
                                    ),
                                getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.request-approval-description")),
                                getIcon: () => (isOwner && !hasApprovers ? "info" : null),
                                getIconLabel: () =>
                                    isOwner && !hasApprovers ? GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.request-approval-tooltip")) : null,
                                isAvailable: async () => {
                                    const canUpdate = !!this._reviewManager && this._reviewManager.canUpdateToStatus(AWAITING_APPROVAL);
                                    return hasApprovers && hasAccess && canUpdate;
                                },
                            }
                        );
                    case APPROVED:
                        hasAccess = await appManager.hasAccess(ACTION_APPROVE, true);
                        var currentStatus = this._getStatus();
                        return {
                            status: status,
                            getLabel: () =>
                                GLocale.get(new GLocaleKey("GReviewDockerProperties", hasAccess && status !== currentStatus ? "text.approve-title" : "text.approved-title")),
                            getDescription: () => GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.approved-description")),
                            getIcon: () => null,
                            getIconLabel: () => null,
                            isAvailable: async () => hasAccess && !!this._reviewManager && this._reviewManager.canUpdateToStatus(APPROVED),
                        };
                }
            }),
            (GReviewDockerProperties.prototype._stateChangedEvent = function () {
                this._requestUIUpdate();
            }),
            (GReviewDockerProperties.prototype._handleReviewUpdate = function () {
                this._requestUIUpdate();
            }),
            (GReviewDockerProperties.prototype._buildMainPanel = function (panel) {
                this._mainPanel = panel;
                let headerRow = $("<div/>").addClass("row").addClass("header").appendTo(this._mainPanel);
                ($("<div/>")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.current-status")))
                    .addClass("status")
                    .click(() => {
                        ((this._opened = false), this._container.gDialog("close"));
                    })
                    .appendTo(headerRow),
                    $("<div/>")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.status-history")))
                        .addClass("history-actions")
                        .hide()
                        .click(() => {
                            (gDesigner.stats("reviewdocker_open_status-history"), this._fileStatusHistoryDialog.open());
                        })
                        .appendTo(headerRow),
                    (this._statusSelectorContainer = $("<div/>").addClass("row").addClass("status-selector").appendTo(this._mainPanel)));
                let footerRow = $("<div/>").addClass("row").addClass("footer").hide().appendTo(this._mainPanel);
                ($("<div/>")
                    .addClass("footer-title")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.please-share-to-start")))
                    .appendTo(footerRow),
                    $("<div/>")
                        .addClass("footer-action")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", "text.share-design-now")))
                        .addClass("footer-action")
                        .click(() => this._requestShare())
                        .appendTo(footerRow),
                    this._mainPanel.appendTo(this._container));
            }),
            (GReviewDockerProperties.prototype._requestShare = function () {
                const shareManager = gDesigner.getShareManager();
                (shareManager.isShareProRestricted() ? gDesigner.stats("reviewdocker_nonprotriespro_share") : gDesigner.stats("reviewdocker_share"),
                    this._document.getStorageItem()
                        ? shareManager.share()
                        : (new EventWaiter.default()
                              .listen(GDocumentEvent)
                              .when(
                                  (event) =>
                                      !!(
                                          event &&
                                          event.type &&
                                          event.document &&
                                          !event.document.isLockedByVersionHistory() &&
                                          event.type === GDocumentEvent.Type.StorageItemUpdated &&
                                          event.document.getId()
                                      ) &&
                                      (this._document === event.document ||
                                          (this._document.getStorageItem() && this._document.getId() === event.document.getId()))
                              )
                              .do(() => shareManager.share()),
                          gDesigner.executeAction(GSaveAction.ID)));
            }),
            (GReviewDockerProperties.prototype._requestUIUpdate = async function () {
                this.isAvailable() &&
                    (this._updatingUI
                        ? (this._requestedDuringUIUpdate = true)
                        : ((this._updatingUI = true),
                          await this._updateUI(),
                          (this._updatingUI = false),
                          this._requestedDuringUIUpdate && ((this._requestedDuringUIUpdate = false), await this._updateUI())));
            }),
            (GReviewDockerProperties.prototype._getAppManager = function () {
                return (this._appManager || (this._appManager = gDesigner.getApplicationManager()), this._appManager);
            }),
            (GReviewDockerProperties.prototype._updateFooter = function () {
                var footerElement = this._mainPanel.find(".footer"),
                    historyActionsElement = this._mainPanel.find(".history-actions");
                const hasStorageItem = !(!this._document || !this._document.getStorageItem());
                (footerElement
                    .find(".footer-title")
                    .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", hasStorageItem ? "text.please-share-to-start" : "text-please-save-share-to-start"))),
                    footerElement
                        .find(".footer-action")
                        .text(GLocale.get(new GLocaleKey("GReviewDockerProperties", hasStorageItem ? "text.share-design-now" : "text.save-share-design-now"))),
                    this._isDocumentSane() ? (footerElement.hide(), historyActionsElement.show()) : (footerElement.show(), historyActionsElement.hide()));
            }),
            (GReviewDockerProperties.prototype._updateUI = async function () {
                FileReviewStatusAvailable.includes(this._getStatus()) &&
                    (this._statusSelectorContainer.empty(),
                    this._mainPanel && this._mainPanel.hide(),
                    this._document &&
                        (this._mainPanel && this._mainPanel.show(),
                        await this._createStatusList(this._statusSelectorContainer),
                        this._updateFooter(),
                        this._mainPanel.show()));
            }),
            (GReviewDockerProperties.prototype._getStatus = function () {
                return (this._reviewManager && this._reviewManager.getStatus()) || IN_REVIEW;
            }),
            (GReviewDockerProperties.prototype._isDocumentSane = function () {
                return !!this._document && this._getAppManager().isSharing() && this._document.isCollaborative();
            }),
            (GReviewDockerProperties.prototype._createStatusList = async function (container) {
                var currentStatus = this._getStatus(),
                    canChangeStatus = this._isStatusChangeAllowed();
                ($("<div/>").addClass("dropdown-icon").appendTo(container),
                    (this._selectedItemContainer = $("<div/>")
                        .addClass("selected-item-container")
                        .toggleClass("disabled", !this._isDocumentSane() || !canChangeStatus)
                        .appendTo(container)),
                    (this._currentSelectedStatusElement = await this._makeItemForDAO(await this._getDAOStatus(currentStatus), {
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
                const addStatusItem = async (statusItem) => {
                    var itemElement = await this._makeItemForDAO(statusItem, {
                        selected: statusItem.status === currentStatus,
                        canHover: true,
                    });
                    itemElement.appendTo(this._statusSelector);
                    (await statusItem.isAvailable())
                        ? itemElement.on("click", async () => {
                              if (
                                  (gDesigner.stats(
                                      "reviewdocker_design",
                                      ((status) => {
                                          switch (status) {
                                              case IN_REVIEW:
                                                  return "InReview";
                                              case AWAITING_APPROVAL:
                                                  return "RequestApproval";
                                              case APPROVED:
                                                  return "Approved";
                                              case REOPENED:
                                                  return "ReOpened";
                                          }
                                      })(statusItem.status)
                                  ),
                                  this._statusListOverlay.gOverlay("close"),
                                  this._getStatus() !== statusItem.status)
                              ) {
                                  this._updatingStatus = true;
                                  const loadingItemElement = await this._makeItemForDAO(statusItem, {
                                      selected: false,
                                      canHover: false,
                                      loading: true,
                                  });
                                  (this._currentSelectedStatusElement.replaceWith(loadingItemElement),
                                      (this._currentSelectedStatusElement = loadingItemElement),
                                      this._reviewManager
                                          .updateReviewStatus(statusItem.status)
                                          .then(() => (this._updatingStatus = false))
                                          .catch(() => (this._updatingStatus = false)));
                              }
                          })
                        : itemElement.on("click", () => this._statusListOverlay.gOverlay("close"));
                };
                if (this._isDocumentSane() && canChangeStatus) {
                    this._selectedItemContainer.removeClass("disabled");
                    for (let e = 0; e < FileReviewStatusAvailable.length; e++) {
                        var i = FileReviewStatusAvailable[e],
                            a = await this._getDAOStatus(i);
                        await addStatusItem(a);
                    }
                    container.on("click", async () => {
                        this._updatingStatus || this._statusListOverlay.gOverlay("open", this._selectedItemContainer);
                    });
                }
            }),
            (GReviewDockerProperties.prototype._makeItemForDAO = async function (statusItem, options) {
                let { selected: selected = false, canHover: canHover = true, loading: loading = false, disabled: disabled = false } = options;
                var itemElement = $("<div/>")
                        .addClass("g-annotation-review-docker-status-item")
                        .data("status", statusItem)
                        .attr("status-id", statusItem.status)
                        .toggleClass("disabled", disabled || (!selected && !(await statusItem.isAvailable())))
                        .toggleClass("can-hover", canHover)
                        .toggleClass("loading", loading),
                    iconContainer = $("<div/>")
                        .addClass("icon-container")
                        .toggleClass("loading", loading)
                        .append($("<div/>").addClass("loading-indicator"))
                        .appendTo(itemElement);
                if (!loading) {
                    var icon = statusItem.getIcon();
                    icon ? (iconContainer.addClass(icon), statusItem.getIconLabel() && iconContainer.attr("data-title", statusItem.getIconLabel())) : iconContainer.toggleClass("selected", selected);
                }
                var detailsContainer = $("<div/>").addClass("details-container").appendTo(itemElement);
                return (
                    $("<div/>").addClass("title").text(statusItem.getLabel()).appendTo(detailsContainer),
                    $("<div/>").addClass("description").text(statusItem.getDescription()).appendTo(detailsContainer),
                    itemElement
                );
            }),
            (GReviewDockerProperties.prototype._isStatusChangeAllowed = function () {
                return true;
            }),
            (module.exports = GReviewDockerProperties));
    };
