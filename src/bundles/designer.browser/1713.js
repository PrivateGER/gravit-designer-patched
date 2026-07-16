module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(4), require(41), require(32), require(97), require(33), require(26));
        const { GObject } = require(1 /* GObject */),
            { GPlatform } = require(15 /* GPlatform */),
            a = require(1355),
            r = require(1191),
            GAnnotationPanel = require(1356),
            l = require(1357 /* GAnnotationPanel */),
            { handleCollabsData } = (require(536), require(882)),
            d = require(1354),
            u = require(434);
        function p() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            (a.call(this, ...t), r.call(this));
        }
        (GObject.inheritAndMix(p, a, [r]),
            (p.prototype._checkTreeSanity = function () {
                return !!$(this._container).data("gannotationpanel");
            }),
            (p.prototype.clean = function () {
                (a.prototype.clean.call(this), this.clearChildren());
            }),
            (p.prototype._isInvalidationBlocked = function () {
                return !!this.isEditingOrAddingContent();
            }),
            (p.prototype.isEditingOrAddingContent = function () {
                return (
                    !!this.getChildren()
                        .filter((e) => e instanceof l)
                        .some((e) => e.isVisible()) ||
                    !!this.getChildren()
                        .filter((e) => e instanceof GAnnotationPanel)
                        .some((e) => e.isEditMode())
                );
            }),
            (p.prototype._hasResolveAccess = false),
            (p.prototype._hasReopenAccess = false),
            (p.prototype._mentionData = {}),
            (p.prototype.hasResolveAccess = function () {
                return this._hasResolveAccess;
            }),
            (p.prototype.hasReopenAccess = function () {
                return this._hasReopenAccess;
            }),
            (p.prototype.getMentionData = function () {
                return this._mentionData || {};
            }),
            (p.prototype.getCollaboratorsCache = function () {
                return this._collaboratorsCache;
            }),
            (p.prototype._beforeInvalidationStart = async function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new d();
                this.clearChildren();
                var t = gDesigner.getApplicationManager();
                ((this._hasResolveAccess = await t.hasAccess(u.RESOLVE_COMMENT_ANNOTATION)),
                    (this._hasReopenAccess = await t.hasAccess(u.REOPEN_COMMENT_ANNOTATION)));
                const n = gDesigner.getActiveDocument(),
                    o = gDesigner.getShareManager();
                (e.collaboratorsCache && o.resetCollaboratorsCached(n),
                    (this._collaboratorsCache = o.getCollaboratorsCached(n)),
                    (this._mentionData = await handleCollabsData(this._collaboratorsCache)));
            }),
            (p.prototype._afterInvalidationEnd = function () {
                (this.scrollIntoView(), this._updateCommentStats());
            }),
            (p.prototype.scrollIntoView = function () {
                $(this._container).gAnnotationPanel("scrollIntoView");
            }),
            (p.prototype._updateCommentStats = function () {
                let e = 0,
                    t = 0,
                    n = this.getChildren(),
                    o = $(this._container).data("gannotationpanel"),
                    i = o && o.options;
                (n &&
                    n.forEach((n) => {
                        n instanceof GAnnotationPanel && !n.isParentAnnotationResolved() && (n.isRead() || t++, e++);
                    }),
                    i && i.updateCommentCount && i.updateCommentCount(e, t));
            }),
            (p.prototype.getCommentStats = function () {
                return this._commentStats;
            }),
            (module.exports = p));
    };
