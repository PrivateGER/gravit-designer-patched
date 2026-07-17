module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(97), require(33), require(26));
        var GObject = require(1),
            GEditor = require(53),
            Utils = require(40),
            designerConfig = require(10),
            GError = require(592),
            GCloudAnnotations = require(1094);
        const CommentPermissions = require(434);
        function GAnnotationsUtils() {}
        async function hasAnnotationPermission(annotation, action) {
            const syncUser = gDesigner.getSyncUser(),
                applicationManager = gDesigner.getApplicationManager(),
                isOwner = GAnnotationsUtils.isOwner(syncUser, annotation),
                isAssigned = (annotation.getProperty("asgn") || []).includes(syncUser.getUID()),
                commentingEnabled = applicationManager.isCommentingEditingEnabled(),
                hasAccess = await applicationManager.hasAccess(action);
            return commentingEnabled && (hasAccess || isOwner || isAssigned);
        }
        ((GAnnotationsUtils.getCloudAnnotationsForDocument = async function (document) {
            const annotationsId = document.getAnnotationsId();
            if (!annotationsId) throw new GError("GAnnotationsUtils.getCloudAnnotationsForDocument: can't get annotations id for the document");
            const annotationsToken = await document.getAnnotationsToken(annotationsId);
            return gDesigner
                .getAnnotationsManager()
                .getAnnotations(annotationsId, annotationsToken)
                .then((annotationsData) => new GCloudAnnotations(annotationsData, annotationsId, annotationsToken, document));
        }),
            (GAnnotationsUtils.updateAndReturnCloudAnnotationsForDocument = async function (document, annotations) {
                const annotationsId = document.getAnnotationsId();
                if (!annotationsId)
                    throw new GError("GAnnotationsUtils.updateAndReturnCloudAnnotationsForDocument: can't get annotations id for the document");
                annotations || (annotations = []);
                const annotationsToken = await document.getAnnotationsToken(annotationsId);
                return gDesigner
                    .getAnnotationsManager()
                    .updateAnnotations(annotationsId, this._prepareAnnotations(document, annotations), annotationsToken)
                    .then((updatedAnnotations) => new GCloudAnnotations(updatedAnnotations, annotationsId, annotationsToken, document));
            }),
            (GAnnotationsUtils._prepareAnnotations = function (document, annotations) {
                return annotations;
            }),
            (GAnnotationsUtils.saveDocumentAnnotations = async function (document, isSecondaryFormat, scene, isDuplicateSave) {
                var needsAccessToken = isSecondaryFormat;
                if (
                    ((scene = scene || document.getScene()),
                    (!document.isCloudFile() && !document.isExternalFile()) || !scene || (!scene.hasAnnotations() && !scene.isCloudAnnotations()))
                )
                    return false;
                var documentId = document.getId(),
                    cloudId = scene.getProperty("cid"),
                    reservedId = document.getReservedId();
                let pageAnnotationsList = [];
                var annotationsFileId;
                scene.iteratePages((page) => {
                    let annotations = page.getAnnotations();
                    (isDuplicateSave && (GAnnotationsUtils.removeSidFromAnnotations(annotations), page.getProperty("Guid") || GAnnotationsUtils.removeGuidFromAnnotations(annotations)), pageAnnotationsList.push(annotations));
                }, true);
                var accessToken = null;
                const findAccessToken = async () => {
                    let file = await gApi.getFile(annotationsFileId, true).catch(() => null);
                    if (file && file.link_accesses && file.link_accesses.length)
                        for (var t = 0; t < file.link_accesses.length && !accessToken; ++t) {
                            let linkAccess = file.link_accesses[t];
                            if (linkAccess.token && linkAccess.comment) return linkAccess.token;
                        }
                    return null;
                };
                if (((annotationsFileId = documentId || cloudId || reservedId) && needsAccessToken && ((accessToken = await document.getAnnotationsToken(annotationsFileId)) || (accessToken = await findAccessToken())), !annotationsFileId))
                    try {
                        const fileData = { trashed: null };
                        let newFile = await gApi.createFile(fileData);
                        (annotationsFileId = newFile.id) && document.setReservedId(annotationsFileId);
                    } catch (e) {
                        console.warn("Failed to record annotations");
                    }
                if (!annotationsFileId) return false;
                needsAccessToken && !accessToken && (accessToken = await findAccessToken());
                const preparedAnnotations = this._prepareAnnotations(document, pageAnnotationsList.map(GObject.GNode.store));
                return (
                    preparedAnnotations instanceof Array || (preparedAnnotations.suppressNewPageNotifications = !!isDuplicateSave),
                    gDesigner
                        .getAnnotationsManager()
                        .updateAnnotations(annotationsFileId, preparedAnnotations, accessToken)
                        .then((updateResult) => {
                            var snapshot = new GCloudAnnotations(updateResult, annotationsFileId, accessToken, document);
                            let lastModifiedTime,
                                annotationsCollection = snapshot.annotationsCollection;
                            return (
                                (lastModifiedTime = (isDuplicateSave && scene.getLastSavedTime()) || new Date(snapshot.lastUpdateTime).getTime()),
                                annotationsCollection && annotationsCollection.length
                                    ? (scene.iteratePages((page) => {
                                          let pageAnnotations = GAnnotationsUtils.findAnnotationsListForPage(page, annotationsCollection);
                                          pageAnnotations && page.setAnnotations(GObject.GNode.restore(pageAnnotations));
                                      }, true),
                                      scene.getProperty("cid") !== annotationsFileId && scene.setCloudAnnotations(annotationsFileId),
                                      needsAccessToken && accessToken && scene.setProperty("asec", accessToken))
                                    : (scene.setCloudAnnotations(null), scene.cleanAnnotations(), needsAccessToken && accessToken && scene.setProperty("asec", accessToken)),
                                scene.setLastTimeAnnotationsFromCloudModified(lastModifiedTime),
                                true
                            );
                        })
                        .catch((error) => (scene.setCloudAnnotations(null), console.warn("Failed to record annotations: " + error), false))
                );
            }),
            (GAnnotationsUtils.findAnnotationsListForPage = function (page, annotationsCollection) {
                const guid = page.getProperty("Guid", true) || page.getAnnotations().getProperty("Guid");
                let result = null;
                if (!annotationsCollection || !annotationsCollection.length) return result;
                if (
                    (guid &&
                        (result = this._findInAnnotationsObj(
                            annotationsCollection,
                            (item) => item.Guid === guid || item.aid === guid,
                            (item) => item.$Guid === guid || item["@Guid"] === guid || item.$aid === guid
                        )),
                    !result)
                ) {
                    const aid = page.getAnnotations().getProperty("aid");
                    aid &&
                        (result = this._findInAnnotationsObj(
                            annotationsCollection,
                            (item) => item.aid === aid,
                            (item) => item.$aid === aid
                        ));
                }
                if (!result) {
                    const pageId = page.getId();
                    pageId &&
                        (result = this._findInAnnotationsObj(
                            annotationsCollection,
                            (item) => item.pgid === pageId,
                            (item) => item.$pgid === pageId
                        ));
                }
                return result;
            }),
            (GAnnotationsUtils._findInAnnotationsObj = function (list, matchDefault, matchAnnotationsList) {
                return list.find((item) => (item instanceof GObject.GAnnotationsList ? matchAnnotationsList(item) : matchDefault(item)));
            }),
            (GAnnotationsUtils.mergeAnnotations = function (annotationsList, existingChildren, restoredList, restoredChildren, recordedProperties) {
                let selectedIds = {},
                    existingById = {},
                    changed = false;
                (existingChildren.forEach((child) => {
                    ((existingById[child.getId()] = child), child.hasFlag(GObject.GNode.Flag.Selected) && (selectedIds[child.getId()] = 1));
                }),
                    existingChildren.forEach((existingChild) => {
                        restoredChildren.some((restoredChild) => restoredChild.getId() === existingChild.getId()) || (annotationsList.removeChild(existingChild), (changed = true));
                    }));
                const excludedPropertyKeys = ["$lmd", "$storedUrl", "$__ids", "$plkt", "$mtime", "$lkt", "@_lkt"];
                recordedProperties && recordedProperties instanceof Object && excludedPropertyKeys.push(...Object.keys(recordedProperties).map((key) => "$" + key));
                for (let t = 0; t < restoredChildren.length; t++) {
                    let restoredChild = restoredChildren[t],
                        existingChild = existingById[restoredChild.getId()];
                    (existingChild &&
                        ((0, Utils.isDifferent)(restoredChild, existingChild, excludedPropertyKeys.concat(restoredChild instanceof GObject.GRectangleAnnotation ? ["$cu"] : [])) &&
                            ((0, Utils.mergeNode)(existingChild, restoredChild), (changed = true)),
                        existingChild.setProperty("mtime", restoredChild.getProperty("mtime"))),
                        1 === selectedIds[restoredChild.getId()] && restoredChild.setFlag(GObject.GNode.Flag.Selected),
                        existingById[restoredChild.getId()] || (annotationsList.appendChild(restoredChild), (changed = true)));
                }
                annotationsList.setProperty("sid", restoredList.getProperty("sid") || null);
                const guid = restoredList.getProperty("Guid");
                return (guid && annotationsList.setProperty("Guid", guid), changed);
            }),
            (GAnnotationsUtils.canDeleteAnnotation = function (annotation) {
                var syncUser = gDesigner.getSyncUser();
                return GAnnotationsUtils.isOwner(syncUser, annotation);
            }),
            (GAnnotationsUtils.removeAnnotations = function (elements, parent, title) {
                let o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                if (!parent || !parent.getScene()) return;
                let scene = parent.getScene(),
                    activeDocument = gDesigner.getActiveDocument();
                if (activeDocument.getScene() === scene) {
                    var hasAnnotationsId = !!activeDocument.getAnnotationsId();
                    GEditor.GAnnotationEditor.removeAnnotations(elements, parent, title, o, !hasAnnotationsId);
                }
            }),
            (GAnnotationsUtils.filterAnnotationElements = function (elements) {
                return elements.filter((element) => element.hasMixin(GObject.GAnnotation) || element instanceof GObject.GComment);
            }),
            (GAnnotationsUtils.canResolveAnnotation = function (annotation) {
                return hasAnnotationPermission(annotation, CommentPermissions.RESOLVE_COMMENT_ANNOTATION);
            }),
            (GAnnotationsUtils.canReopenAnnotation = function (annotation) {
                return hasAnnotationPermission(annotation, CommentPermissions.REOPEN_COMMENT_ANNOTATION);
            }),
            (GAnnotationsUtils.isOwner = function (user, annotation) {
                if (user) {
                    const ownerUid = annotation.getProperty ? annotation.getProperty("uid") : annotation.uid;
                    return user.getUID() === ownerUid;
                }
                return false;
            }),
            (GAnnotationsUtils.canUpdate = function (annotation) {
                return !(gDesigner.isAnonymous() && !designerConfig.ANONYMOUS_SESSION_ENABLED) && !!annotation;
            }),
            (GAnnotationsUtils.resolveAllComments = function (document) {
                var scene = document.getScene();
                scene &&
                    GEditor.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            scene.iteratePages((page) => {
                                page.getAnnotations().resolve();
                            }, true);
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.resolve-all-comments"))
                    );
            }),
            (GAnnotationsUtils.getCommentsCount = function (file) {
                if (!file.annotations) return 0;
                let t = 0;
                const snapshotData = { annotationsCollection: file.annotations, lastUpdateTime: 0 };
                let snapshot = new GCloudAnnotations(snapshotData, file.id);
                return (
                    snapshot &&
                        snapshot.annotationsCollection &&
                        snapshot.annotationsCollection.forEach((annotationsListEntry) => {
                            annotationsListEntry.$ &&
                                annotationsListEntry.$.forEach(function (entry) {
                                    entry.rsv ||
                                        (entry.$ &&
                                            0 !== entry.$.length &&
                                            entry.$.forEach(function (child) {
                                                "cmt" === child["@"] && t++;
                                            }),
                                        t++);
                                });
                        }),
                    t
                );
            }),
            (GAnnotationsUtils.removeSidFromAnnotations = function (annotations) {
                GAnnotationsUtils.setPropertyValueInAnnotations(annotations, "sid", null);
            }),
            (GAnnotationsUtils.removeGuidFromAnnotations = function (annotations) {
                GAnnotationsUtils.setPropertyValueInAnnotations(annotations, "Guid", "");
            }),
            (GAnnotationsUtils.setPropertyValueInAnnotations = function (node, propertyName, propertyValue, i) {
                node.accept((node) => {
                    (node instanceof GObject.GAnnotationsList || node.hasMixin(GObject.GAnnotation) || node instanceof GObject.GComment) && node.setProperty(propertyName, propertyValue, i);
                });
            }),
            (module.exports = GAnnotationsUtils));
    };
