module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(4), require(41), require(32), require(97), require(33), require(26));
        const { GObject } = require(1 /* GObject */),
            { GPlatform } = require(15 /* GPlatform */),
            GSimpleTree = require(1355),
            GChildrenMixin = require(1191),
            GAnnotationRow = require(1356),
            GAnnotationReplyDocker = require(1357),
            { handleCollabsData } = (require(536), require(882 /* collabApi */)),
            GInvalidationOptions = require(1354),
            Permissions = require(434);
        function GAnnotationPanel() {
            for (var argumentsLength = arguments.length, args = new Array(argumentsLength), n = 0; n < argumentsLength; n++) args[n] = arguments[n];
            (GSimpleTree.call(this, ...args), GChildrenMixin.call(this));
        }
        (GObject.inheritAndMix(GAnnotationPanel, GSimpleTree, [GChildrenMixin]),
            (GAnnotationPanel.prototype._checkTreeSanity = function () {
                return !!$(this._container).data("gannotationpanel");
            }),
            (GAnnotationPanel.prototype.clean = function () {
                (GSimpleTree.prototype.clean.call(this), this.clearChildren());
            }),
            (GAnnotationPanel.prototype._isInvalidationBlocked = function () {
                return !!this.isEditingOrAddingContent();
            }),
            (GAnnotationPanel.prototype.isEditingOrAddingContent = function () {
                return (
                    !!this.getChildren()
                        .filter((docker) => docker instanceof GAnnotationReplyDocker)
                        .some((docker) => docker.isVisible()) ||
                    !!this.getChildren()
                        .filter((row) => row instanceof GAnnotationRow)
                        .some((row) => row.isEditMode())
                );
            }),
            (GAnnotationPanel.prototype._hasResolveAccess = false),
            (GAnnotationPanel.prototype._hasReopenAccess = false),
            (GAnnotationPanel.prototype._mentionData = {}),
            (GAnnotationPanel.prototype.hasResolveAccess = function () {
                return this._hasResolveAccess;
            }),
            (GAnnotationPanel.prototype.hasReopenAccess = function () {
                return this._hasReopenAccess;
            }),
            (GAnnotationPanel.prototype.getMentionData = function () {
                return this._mentionData || {};
            }),
            (GAnnotationPanel.prototype.getCollaboratorsCache = function () {
                return this._collaboratorsCache;
            }),
            (GAnnotationPanel.prototype._beforeInvalidationStart = async function () {
                let invalidationOptions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new GInvalidationOptions();
                this.clearChildren();
                var applicationManager = gDesigner.getApplicationManager();
                ((this._hasResolveAccess = await applicationManager.hasAccess(Permissions.RESOLVE_COMMENT_ANNOTATION)),
                    (this._hasReopenAccess = await applicationManager.hasAccess(Permissions.REOPEN_COMMENT_ANNOTATION)));
                const activeDocument = gDesigner.getActiveDocument(),
                    shareManager = gDesigner.getShareManager();
                (invalidationOptions.collaboratorsCache && shareManager.resetCollaboratorsCached(activeDocument),
                    (this._collaboratorsCache = shareManager.getCollaboratorsCached(activeDocument)),
                    (this._mentionData = await handleCollabsData(this._collaboratorsCache)));
            }),
            (GAnnotationPanel.prototype._afterInvalidationEnd = function () {
                (this.scrollIntoView(), this._updateCommentStats());
            }),
            (GAnnotationPanel.prototype.scrollIntoView = function () {
                $(this._container).gAnnotationPanel("scrollIntoView");
            }),
            (GAnnotationPanel.prototype._updateCommentStats = function () {
                let e = 0,
                    t = 0,
                    children = this.getChildren(),
                    panelData = $(this._container).data("gannotationpanel"),
                    panelOptions = panelData && panelData.options;
                (children &&
                    children.forEach((child) => {
                        child instanceof GAnnotationRow && !child.isParentAnnotationResolved() && (child.isRead() || t++, e++);
                    }),
                    panelOptions && panelOptions.updateCommentCount && panelOptions.updateCommentCount(e, t));
            }),
            (GAnnotationPanel.prototype.getCommentStats = function () {
                return this._commentStats;
            }),
            (module.exports = GAnnotationPanel));
    };
