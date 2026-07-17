module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(4), require(41), require(13));
        var GObject = require(1),
            dateFormatUtils = require(1163),
            storageItemFactory = _interopRequireDefault(require(1090)),
            reviewUtils = _interopRequireDefault(require(358 /* GAnnotationsUtils */)),
            Utils = require(40),
            designerConfig = require(10);
        const IsFiniteNonNegativeNumber = require(0),
            FilesPanelItemViewBase = require(1551),
            FilesPanelEvent = require(1174);
        function FilesPanelFileView() {}
        (IsFiniteNonNegativeNumber.inherit(FilesPanelFileView, FilesPanelItemViewBase),
            (FilesPanelFileView.prototype.render = async function (container, file) {
                (this._createUI(container), await this._updateUIForFile(container, file));
            }),
            (FilesPanelFileView.prototype._createUI = function (container) {
                $("<div/>").addClass("file-preview-container").append($("<img/>").addClass("file-preview").attr("src", "")).appendTo(container);
                const fileButtonContainer = $("<div/>").addClass("file-button-container").appendTo(container);
                ($("<button/>")
                    .gShareButton({
                        clazz: "file-panel-share-button",
                        defaultText: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.share-this-file")),
                        stats: "filespanel-view_infoPanel_share",
                        restrictedStats: "filespanel-view_infoPanel_nonprotriespro-share",
                    })
                    .appendTo(fileButtonContainer)
                    .hide(),
                    $("<div/>").addClass("file-name").appendTo(container),
                    $("<div/>").addClass("file-created").appendTo(container));
                var collaborationContainer = $("<div/>").addClass("collaboration").appendTo(container);
                ($("<span/>")
                    .addClass("collaborators")
                    .append($("<div/>").addClass("gravit-icon-collaborators"))
                    .append($("<div/>").addClass("collaborators-number").text("0"))
                    .append($("<span/>").text(" " + GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.collaborators"))))
                    .appendTo(collaborationContainer)
                    .hide(),
                    $("<span/>")
                        .addClass("comments")
                        .append($("<div/>").addClass("gravit-icon-comment"))
                        .append($("<div/>").addClass("comments-number").text("0"))
                        .append(
                            $("<span/>")
                                .addClass("comments-label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.comments")))
                        )
                        .appendTo(collaborationContainer)
                        .hide(),
                    $("<div/>")
                        .addClass("status")
                        .append(
                            $("<div/>")
                                .addClass("label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.status")) + ": ")
                        )
                        .append($("<div/>").addClass("state").text(""))
                        .appendTo(container)
                        .hide());
            }),
            (FilesPanelFileView.prototype._updateUIForFile = async function (container, file) {
                const shareButton = container.find(".share-button"),
                    commentsNumberElement = container.find(".comments-number"),
                    commentsLabelElement = container.find(".comments-label"),
                    collaboratorsNumberElement = container.find(".collaborators-number"),
                    fileCreatedElement = container.find(".file-created"),
                    collaborationElement = container.find(".collaboration"),
                    statusElement = container.find(".status"),
                    collaboratorsElement = container.find(".collaborators");
                (container.find(".file-preview").attr("src", file.getPreviewURL() || designerConfig.DEFAULT_FILE_THUMBNAIL),
                    container.find(".file-preview").unbind("dblclick"),
                    container.find(".file-preview").on("dblclick", (event) => {
                        (event.stopPropagation(), event.preventDefault(), this._triggerEvent(FilesPanelEvent.Type.DoubleClickFile, file));
                    }),
                    container.find(".file-name").text(file.name),
                    container.data("fileId", file.id));
                const storageItem = await storageItemFactory.default.createStorageItem(file);
                storageItem.supportsShadowFile() && (await storageItem.syncShadowFile());
                const fileExtended = await designerConfig.gApi.getFileExtended(storageItem.getId()).catch(() => null);
                fileCreatedElement.text(
                    GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.created")).replace(
                        "%createdTime",
                        (0, dateFormatUtils.dateToFilePreviewFormat)(file.created || fileExtended.created)
                    )
                );
                const commentsCount = (fileExtended && reviewUtils.default.getCommentsCount(fileExtended)) || 0;
                (commentsNumberElement.text(commentsCount), commentsLabelElement.text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", 1 === commentsCount ? "text.comment" : "text.comments"))));
                let b = null,
                    w = null,
                    C = false;
                if (!fileExtended)
                    return (
                        collaborationElement.hide(),
                        shareButton.gShareButton("update", { disabled: true, isSharing: false }),
                        void shareButton.attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.can-only-share-by-owner")))
                    );
                {
                    const syncUser = gDesigner.getSyncUser();
                    (({
                        state: { isPrivate: b, sharing: w, owner: C },
                    } = (0, Utils.getFileStateAndRole)(syncUser, fileExtended, {})),
                        !gDesigner.getApplicationManager().isShareEngineEnabled() || (w && !C) || shareButton.show(),
                        collaborationElement.show());
                }
                if (
                    (shareButton.gShareButton("update", {
                        disabled: false,
                        storeItem: storageItem,
                        isSharing: w,
                        closeCallback: () => {
                            this._triggerEvent(FilesPanelEvent.Type.Reload);
                        },
                        isPrivate: b,
                    }),
                    shareButton.removeAttr("data-title"),
                    !w)
                )
                    return (statusElement.hide(), container.find(".collaborators").hide(), void container.find(".comments").hide());
                const reviewHistory = await gDesigner.getFileReviewManager().getDocumentReviewHistory(storageItem.getId());
                (container.find(".comments").show(), reviewHistory.length > 1 && fileExtended ? (statusElement.show(), this._updateStatus(container, fileExtended.status)) : statusElement.hide());
                const privateShareCount = fileExtended.getPrivateShareList().filter((share) => !share.owner).length;
                privateShareCount > 0 ? (collaboratorsElement.show(), collaboratorsNumberElement.text(privateShareCount)) : collaboratorsElement.hide();
            }),
            (FilesPanelFileView.prototype._updateStatus = function (container, status) {
                const stateElement = container.find(".state");
                switch (status) {
                    case designerConfig.FileStatus.IN_REVIEW:
                        stateElement.text(GObject.GLocale.get(new GObject.GLocaleKey("GReviewDockerProperties", "text.review-title")));
                        break;
                    case designerConfig.FileStatus.REOPENED:
                        stateElement.text(GObject.GLocale.get(new GObject.GLocaleKey("GReviewDockerProperties", "text.reopen-title")));
                        break;
                    case designerConfig.FileStatus.AWAITING_APPROVAL:
                        stateElement.text(GObject.GLocale.get(new GObject.GLocaleKey("GReviewDockerProperties", "text.request-approval-title")));
                        break;
                    case designerConfig.FileStatus.APPROVED:
                        stateElement.text(GObject.GLocale.get(new GObject.GLocaleKey("GReviewDockerProperties", "text.approved-title")));
                }
            }),
            (module.exports = FilesPanelFileView));
    };
