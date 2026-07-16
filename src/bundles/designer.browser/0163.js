module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */),
            require(19),
            require(328 /* polyfill:Array */),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(30 /* polyfill:Object */),
            require(8 /* Symbol */),
            require(196 /* polyfill:Promise */),
            require(20 /* polyfill:RegExp */),
            require(71 /* polyfill:String */),
            require(151),
            require(34),
            require(851),
            require(1388),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(33),
            require(26));
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GImporters = require(1201),
            GExporters = require(797),
            designerConfig = require(10),
            Utils = require(40),
            GDiagnostics = _interopRequireDefault(require(1468)),
            GMissingFontsTracker = _interopRequireDefault(require(1470)),
            GPendingFontsWaiter = _interopRequireDefault(require(1471)),
            GUser = _interopRequireDefault(require(177)),
            PDFNodeStream = require(165);
        const HeicParser = require(1472);
        var GExternalStorage = require(388),
            GDocumentEvent = require(78),
            DocumentStatus = require(86),
            GDocumentStatusEvent = require(217),
            GStorageItemEvent = require(336),
            GStorage = require(237),
            GMissingFontsDialog = require(841),
            GPaywallDialog = require(1473),
            GMessageDialog = require(219),
            GUnsupportedFeaturesDialog = require(1238),
            GDocumentChooser = require(1475),
            FontsProviderManager = require(255),
            GCommonNames = require(119),
            GCloudStorage = require(220),
            GContainer = require(85);
        const GLicenseChangedEvent = require(441),
            GApplicationStateChangedEvent = require(392),
            GNetworkAvailabilityChangedEvent = require(291),
            GUserLoggedEvent = require(292),
            GSystemDialog = require(44),
            M = require(442),
            GFileTypes = require(389),
            B = designerConfig.FILE_FORMATS.find((format) => format.default),
            U = designerConfig.FILE_FORMATS.filter((format) => format.secondary),
            GCollaborationEvent = require(393),
            GCollaborativeFileMixin = require(436);
        require(1152);
        function GDocumentController(storageItemOrScene) {
            ((this._storageItem = storageItemOrScene instanceof GStorage.Item ? storageItemOrScene : null),
                (this._windows = []),
                (this._activeWindow = null),
                this._updateStatus(DocumentStatus.Init),
                (this.sessionId = GObject.GUtil.uuid()),
                storageItemOrScene instanceof GObject.GScene ? this.setScene(storageItemOrScene) : this.setScene(gDesigner.createScene()),
                this._storageItem && gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.StorageItemUpdated, this)),
                (this._activeStylesList = { Fill: null, Border: null, Effect: null }),
                (this._lockedSymbolInstances = false));
        }
        (GObject.GObject.inherit(GDocumentController, GObject.GEventTarget),
            (GDocumentController.FileTypes = GFileTypes.getFileTypesArray()),
            (GDocumentController.prototype._status = null),
            (GDocumentController.prototype._errored = false),
            (GDocumentController.prototype._storageItem = null),
            (GDocumentController.prototype._isUpdateAvailable = false),
            (GDocumentController.prototype._tempCloudStorageItem = null),
            (GDocumentController.prototype._documentColors = null),
            (GDocumentController.prototype._scene = null),
            (GDocumentController.prototype._editor = null),
            (GDocumentController.prototype._windows = null),
            (GDocumentController.prototype._activeWindow = null),
            (GDocumentController.prototype._synchronizing = false),
            (GDocumentController.prototype._title = null),
            (GDocumentController.prototype._reservedId = null),
            (GDocumentController.prototype._trashed = null),
            (GDocumentController.prototype._fontImporter = null),
            (GDocumentController.prototype._paywall = null),
            (GDocumentController.prototype._lockedSymbolInstances = false),
            (GDocumentController.prototype._lockedByVersionHistory = false),
            (GDocumentController.prototype._editable = true),
            (GDocumentController.prototype._annotationsEditable = designerConfig.HAS_ANNOTATIONS),
            (GDocumentController.prototype._owner = null),
            (GDocumentController.prototype._cloudSynchronismFlag = false),
            (GDocumentController.prototype._documentFromTemplate = false),
            (GDocumentController.prototype._isShared = false),
            (GDocumentController.prototype._focusAnnotationId = null),
            (GDocumentController.prototype._failedDocumentIdOrToken = null),
            (GDocumentController.prototype._lastDownloadSize = 0),
            (GDocumentController.prototype._lastDownloadSize = 0),
            (GDocumentController.prototype.hasUTS = void 0),
            (GDocumentController.prototype._activeStylesList = null),
            (GDocumentController.prototype.updateActiveStylesList = function (styleType, style) {
                this._activeStylesList.hasOwnProperty(styleType) && (this._activeStylesList[styleType] = style);
            }),
            (GDocumentController.prototype.getActiveStylesList = function () {
                return this._activeStylesList;
            }),
            (GDocumentController.prototype.clearActiveStylesList = function () {
                Object.keys(this._selectedStylesList).forEach((key) => {
                    this._selectedStylesList[key] = null;
                });
            }),
            (GDocumentController.prototype.setFocusAnnotationId = function (annotationId) {
                this._focusAnnotationId = annotationId;
            }),
            (GDocumentController.prototype.getFocusAnnotationId = function () {
                return this._focusAnnotationId;
            }),
            (GDocumentController.prototype.setFailedDocumentIdOrToken = function (documentIdOrToken) {
                this._failedDocumentIdOrToken = documentIdOrToken;
            }),
            (GDocumentController.prototype.getFailedDocumentIdOrToken = function () {
                return this._failedDocumentIdOrToken;
            }),
            (GDocumentController.prototype._annotationFocused = false),
            (GDocumentController.prototype.setAnnotationFocused = function () {
                let focused = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._annotationFocused = focused;
            }),
            (GDocumentController.prototype.isAnnotationFocused = function () {
                return this._annotationFocused;
            }),
            (GDocumentController.prototype._colorModeElms = null),
            (GDocumentController.prototype.setColorModeElms = function (elements) {
                this._colorModeElms = elements;
            }),
            (GDocumentController.prototype.getColorModeElms = function () {
                return this._colorModeElms;
            }),
            (GDocumentController.prototype.setDocumentFromTemplate = function (fromTemplate) {
                this._documentFromTemplate = fromTemplate;
            }),
            (GDocumentController.prototype.isDocumentFromTemplate = function () {
                return this._documentFromTemplate;
            }),
            (GDocumentController.prototype.setIsShared = function (shared) {
                this._isShared = shared;
            }),
            (GDocumentController.prototype.isShared = function () {
                return this._isShared;
            }),
            (GDocumentController.prototype.openPaywall = function (action) {
                (this._paywall && this._paywall.close(), (this._paywall = new GPaywallDialog(this, this.getStorageItem(), action)), this._paywall.open());
            }),
            (GDocumentController.prototype.getStatus = function () {
                return this._status;
            }),
            (GDocumentController.prototype.isNew = function () {
                return !this._storageItem;
            }),
            (GDocumentController.prototype.isModified = function () {
                return (
                    !!this._editor &&
                    (!!this._errored ||
                        !!this._editor.isModified(designerConfig.HAS_ANNOTATIONS ? (e) => e.hasMixin(GObject.GAnnotation) || e instanceof GObject.GComment : null) ||
                        !(
                            !this._editable ||
                            !this.getScene() ||
                            (this.getStorageItem() && this.getStorageItem().getVersionId()) ||
                            !(this.getScene().getLastTimeAnnotationsFromCloudModified() - this.getScene().getLastSavedTime() > 0)
                        ))
                );
            }),
            (GDocumentController.prototype.getStorageItem = function () {
                return this._storageItem;
            }),
            (GDocumentController.prototype.getExtension = function () {
                const e = this.getStorageItem();
                return e ? e.getExtension() : B.ext;
            }),
            (GDocumentController.prototype.hasCDR = function () {
                return !!(M.CDR_ORIGIN_PROPERTY_NAME && this._scene && this._scene.getProperty(M.CDR_ORIGIN_PROPERTY_NAME, true));
            }),
            (GDocumentController.prototype.getTempCloudStorageItem = function () {
                return this._tempCloudStorageItem || this._storageItem;
            }),
            (GDocumentController.prototype.getStorage = function () {
                return this._storageItem ? this._storageItem.getStorage() : null;
            }),
            (GDocumentController.prototype.setStorageItem = function (storageItem) {
                storageItem !== this._storageItem &&
                    ((this._storageItem = storageItem),
                    this._storageItem &&
                        this.getFileFormatVersion() &&
                        this._storageItem.storeFileFormatVersion(this.getFileFormatVersion()),
                    gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.StorageItemUpdated, this)));
            }),
            (GDocumentController.prototype.getScene = function () {
                return this._scene;
            }),
            (GDocumentController.prototype.setScene = function (scene) {
                let force = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (scene !== this._scene || force) {
                    var n = false;
                    (gDesigner.getActiveDocument() === this && (gDesigner.activateDocument(null), (n = true)),
                        this._updateScene(scene),
                        this._updateStatus(DocumentStatus.Ready, scene),
                        n && gDesigner.activateDocument(this));
                }
            }),
            (GDocumentController.prototype.setFileFormatVersion = function () {}),
            (GDocumentController.prototype.saveFileFormatVersion = async function () {}),
            (GDocumentController.prototype.getFileFormatVersion = function () {
                return null;
            }),
            (GDocumentController.prototype.getDocumentColors = function (limit) {
                var colorKeys = Object.keys(this._documentColors);
                colorKeys.sort(
                    function (keyA, keyB) {
                        return this._documentColors[keyB] - this._documentColors[keyA];
                    }.bind(this)
                );
                var colors = colorKeys.map(
                    function (serializedColor) {
                        return GObject.GPattern.deserialize(serializedColor);
                    }.bind(this)
                );
                return ("number" == typeof limit && limit > 0 && (colors = colors.slice(0, limit)), colors);
            }),
            (GDocumentController.prototype._applicationStateChangedEvent = function (event) {
                event.document === this && this._scene && this._checkPermissionsAndUpdateState();
            }),
            (GDocumentController.prototype._networkAvailabilityChangedEvent = function () {
                this._checkPermissionsAndUpdateState();
            }),
            (GDocumentController.prototype._checkPermissionsAndUpdateState = function () {
                const e = gDesigner.getApplicationManager().isInspectEnabled(),
                    t = gDesigner.getApplicationManager().isCommentingEnabled();
                (e === this._editable && t === this._annotationsEditable) ||
                    ((this._editable = e), (this._annotationsEditable = t), this._updateState());
            }),
            (GDocumentController.prototype._resolvedMissingEntryEvent = function (event) {
                try {
                    const t = this.isCloudFile() ? this.getStorageItem().getId() : null;
                    GDiagnostics.default.register({
                        message: "DICTIONARY_MISSING_ENTRY",
                        data: { entry: event.entry.uuid, file_id: t },
                    });
                } catch (e) {
                    console.error(e);
                }
            }),
            (GDocumentController.prototype._updateScene = function (scene) {
                if (
                    (this._scene &&
                        (this._editor.release(),
                        this._editor.removeEventListener(GEditor.GEditor.FileDropEvent, this._dropFileEvent, this),
                        this._editor.removeEventListener(GEditor.GEditor.ModifiedEvent, this._modifiedEvent, this),
                        this._editor.removeAllEventListeners(),
                        this._scene
                            .getDictionary()
                            .removeEventListener(GObject.GSceneDictionary.ResolvedMissingEntryEvent, this._resolvedMissingEntryEvent, this),
                        this._scene.removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertNodeEvent, this),
                        this._scene.removeEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveNodeEvent, this),
                        this._scene.removeEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemoveNodeEvent, this),
                        this._scene.removeEventListener(GObject.GNode.BeforePropertiesChangeEvent, this._beforePropertiesChangeEvent, this),
                        this._scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChangeEvent, this),
                        this._scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                        this._scene.removeAllEventListeners(),
                        this._scene.iteratePages((page) => {
                            page.removeAllEventListeners();
                        }, true),
                        this._scene.getDictionary().removeAllEventListeners(),
                        this._scene.getSymbolDictionary().removeAllEventListeners(),
                        gDesigner.removeEventListener(GLicenseChangedEvent, this._licenseChangedEvent, this),
                        gDesigner.removeEventListener(GApplicationStateChangedEvent, this._applicationStateChangedEvent, this),
                        gDesigner.removeEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                        gDesigner.removeEventListener(GUserLoggedEvent, this._userLoggedEvent, this),
                        gDesigner.removeEventListener(GDocumentEvent, this._handleDocumentEvent, this),
                        gDesigner.removeEventListener(GStorageItemEvent, this._handleStorageItemEvent, this),
                        this.removeEventListener(GCollaborationEvent, this._collaborationEvent, this),
                        this.removeEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this),
                        (this._editor = null),
                        (this._scene = null)),
                    (this._documentColors = {}),
                    (this._scene = scene),
                    this._scene)
                ) {
                    this._editor = GEditor.GEditor.getEditor(scene) || new GEditor.GEditor(scene);
                    const syncUser = gDesigner.getSyncUser();
                    (syncUser && this._editor.setUID(syncUser.getUID()),
                        this._editor.addEventListener(GEditor.GEditor.FileDropEvent, this._dropFileEvent, this, void 0, void 0, true),
                        this._editor.addEventListener(GEditor.GEditor.ModifiedEvent, this._modifiedEvent, this, void 0, void 0, true),
                        this._scene
                            .getDictionary()
                            .addEventListener(
                                GObject.GSceneDictionary.ResolvedMissingEntryEvent,
                                this._resolvedMissingEntryEvent,
                                this,
                                void 0,
                                void 0,
                                true
                            ),
                        this._scene.addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertNodeEvent, this, void 0, void 0, true),
                        this._scene.addEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveNodeEvent, this, void 0, void 0, true),
                        this._scene.addEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemoveNodeEvent, this, void 0, void 0, true),
                        this._scene.addEventListener(
                            GObject.GNode.BeforePropertiesChangeEvent,
                            this._beforePropertiesChangeEvent,
                            this,
                            void 0,
                            void 0,
                            true
                        ),
                        this._scene.addEventListener(
                            GObject.GNode.AfterPropertiesChangeEvent,
                            this._afterPropertiesChangeEvent,
                            this,
                            void 0,
                            void 0,
                            true
                        ),
                        this._scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this, void 0, void 0, true),
                        gDesigner.addEventListener(GLicenseChangedEvent, this._licenseChangedEvent, this),
                        gDesigner.addEventListener(GApplicationStateChangedEvent, this._applicationStateChangedEvent, this),
                        gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                        gDesigner.addEventListener(GUserLoggedEvent, this._userLoggedEvent, this),
                        gDesigner.addEventListener(GDocumentEvent, this._handleDocumentEvent, this),
                        gDesigner.addEventListener(GStorageItemEvent, this._handleStorageItemEvent, this),
                        this.addEventListener(GCollaborationEvent, this._collaborationEvent, this, void 0, void 0, true),
                        this.addEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this, void 0, void 0, true),
                        scene.acceptChildren((element) => {
                            if (element.hasMixin(GObject.GElement.Stylable) && element.getPaintLayers())
                                for (var layerNode = element.getPaintLayers().getFirstChild(); null !== layerNode; layerNode = layerNode.getNext())
                                    this._updateDocumentColorsFromElement(layerNode, ["_pt"]);
                        }),
                        this._updateState());
                }
            }),
            (GDocumentController.prototype._userLoggedEvent = function (event) {
                const { user } = event;
                user && this._editor && this._editor.setUID(new GUser.default(user).getUID());
            }),
            (GDocumentController.prototype._handleDocumentEvent = function () {}),
            (GDocumentController.prototype._handleStorageItemEvent = function () {}),
            (GDocumentController.prototype._collaborationEvent = async function (event) {
                if (this.isLockedByVersionHistory()) return;
                const { type, data } = event;
                switch (type) {
                    case GCollaborationEvent.Type.ReviewStatusChanged:
                        this.isCollaborative() && this.getStorageItem().setCollaborativeFileStatus(data.status);
                        break;
                    case GCollaborationEvent.Type.FileUpdate:
                        if (data && data.metadata && data.metadata.sessionId && data.metadata.sessionId === this.sessionId) return;
                        ((this._isUpdateAvailable = true),
                            (this._isIgnoringCurrentUpdate = false),
                            gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.UpdateAvailable, this)));
                }
            }),
            (GDocumentController.prototype._handleDocumentStatusEvent = async function (event) {
                switch (event.status) {
                    case DocumentStatus.Loaded:
                        ((this._isUpdateAvailable = false), (this._isIgnoringCurrentUpdate = false));
                        break;
                    case DocumentStatus.Ready:
                        this._checkPermissionsAndUpdateState();
                        break;
                    case DocumentStatus.Saved:
                        ((this._isUpdateAvailable = false),
                            (this._isIgnoringCurrentUpdate = false),
                            this._handleDocumentStatusSavedEventForRealtimeNotification(event));
                        break;
                    case DocumentStatus.Saving:
                        gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Saving, this, event.data));
                }
            }),
            (GDocumentController.prototype._handleDocumentStatusSavedEventForRealtimeNotification = async function (event) {
                event.data && (event.data.hasOwnProperty("collabTextUpdate") || event.data.hasOwnProperty("sendEmail"))
                    ? this.publish({
                          collabTextUpdate: event.data.collabTextUpdate,
                          sendEmail: event.data.sendEmail,
                      })
                    : this.publish();
            }),
            (GDocumentController.prototype.isUpdateAvailable = async function () {
                if (this._isUpdateAvailable) return true;
                const e = this.getStorageItem();
                return !(!e || (!e.hasVersionControl() && !this.isCloudFile()) || this._synchronizing) && e.hasUpdates();
            }),
            (GDocumentController.prototype.isIgnoringCurrentUpdate = function () {
                return this._isIgnoringCurrentUpdate;
            }),
            (GDocumentController.prototype.ignoreCurrentUpdate = function () {
                this._isIgnoringCurrentUpdate = true;
            }),
            (GDocumentController.prototype.getEditor = function () {
                return this._editor;
            }),
            (GDocumentController.prototype.getWindows = function () {
                return this._windows;
            }),
            (GDocumentController.prototype.getActiveWindow = function () {
                return this._activeWindow;
            }),
            (GDocumentController.prototype.setOwner = function (owner) {
                (this._owner && this._owner.id) !== (owner && owner.id) &&
                    ((this._owner = owner), gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.OwnerUpdated, this)));
            }),
            (GDocumentController.prototype.getOwner = function () {
                return this._owner;
            }),
            (GDocumentController.prototype.canSaveToCloud = async function () {
                if (!this._owner) return true;
                const currentUser = await gDesigner.getUser();
                return (
                    !!currentUser && (this._owner.id === currentUser.getUID() || gDesigner.getApplicationManager().hasPermission(this, designerConfig.SharePermissions.EDIT))
                );
            }),
            (GDocumentController.prototype.setTitle = function (title) {
                title !== this._title &&
                    ((this._title = title),
                    this.isCloudFile() && this.getStorageItem().setFileName(title),
                    gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, this)));
            }));
        var untitledDocumentNumbers = {},
            H = 1;
        function defer(callback) {
            setTimeout(callback, 10);
        }
        ((GDocumentController.prototype.getTitle = function () {
            return (
                this.isNew() && (untitledDocumentNumbers[this.sessionId] = untitledDocumentNumbers[this.sessionId] ? untitledDocumentNumbers[this.sessionId] : H++),
                this.isNew()
                    ? this._title || GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.default-document-name")) + "-" + untitledDocumentNumbers[this.sessionId]
                    : this._storageItem.getName()
            );
        }),
            (GDocumentController.prototype.insertElement = function (element, center, fitToPage, skipTransaction) {
                var scene = this.getScene();
                if (scene.isFixedSized() && element.hasMixin(GObject.GElement.Transform)) {
                    var bbox = element.getGeometryBBox();
                    if (!bbox) return;
                    var width = bbox.getWidth(),
                        height = bbox.getHeight(),
                        pageWidth = scene.getProperty("w"),
                        pageHeight = scene.getProperty("h"),
                        transform = new GObject.GTransform();
                    if (fitToPage && (width > pageWidth || height > pageHeight)) {
                        var scaleX = 1,
                            scaleY = 1;
                        (width > pageWidth && (scaleX = pageWidth / width),
                            height > pageHeight && (scaleY = pageHeight / height),
                            scaleX < scaleY ? (scaleY = scaleX) : (scaleX = scaleY),
                            (transform = transform.translated(-bbox.getX(), -bbox.getY()).scaled(scaleX, scaleY).translated(bbox.getX(), bbox.getY())),
                            (width *= scaleX),
                            (height *= scaleY));
                    }
                    (center && (transform = transform.translated((pageWidth - width) / 2 - bbox.getX(), (pageHeight - height) / 2 - bbox.getY())), element.transform(transform, true));
                    var scaleFactor = transform.getScaleFactor(),
                        adjustBorderWidth = function (element) {
                            if (element instanceof GObject.GItem && element.hasMixin(GObject.GElement.Stylable) && element.hasStyleBorder()) {
                                var paintLayers = element.getPaintLayers();
                                paintLayers &&
                                    GObject.GUtil.each(paintLayers.getBorderLayers(), function (e, borderLayer) {
                                        borderLayer && borderLayer.setProperty("_bw", borderLayer.$_bw * scaleFactor);
                                    });
                            }
                        };
                    (element.beginUpdate(), adjustBorderWidth(element), element.hasMixin(GObject.GNode.Container) && element.acceptChildren(adjustBorderWidth), element.endUpdate());
                }
                this._editor.insertElements([element], true, skipTransaction, element instanceof GObject.GItem);
            }),
            (GDocumentController.prototype.loadFromData = function (data) {
                var options = { progress: null, checkAnnotations: false };
                (this._updateStatus(DocumentStatus.Loading, options), this._loadDataIntoDocument(data, options));
            }),
            (GDocumentController.prototype._loadDataIntoDocument = async function (data, options) {
                (options.progress && options.progress(5), await (0, Utils.sleep)(10));
                const unzippedData = GCommonNames.unzipData(data);
                return (options.progress && options.progress(10), await (0, Utils.sleep)(10), this.deserializeData(unzippedData, options));
            }),
            (GDocumentController.prototype.deserializeData = function (data, options) {
                const activeWindow = this.getActiveWindow();
                return (
                    activeWindow && activeWindow.centerAndZoom(),
                    this._updateCloudSynchronism(this.isCloudFile()),
                    new Promise(async (resolve, reject) => {
                        (options || ((options = { progress: null }), this._updateStatus(DocumentStatus.Loading, options)), options.progress && options.progress(15));
                        const scene = await new Promise((resolve, reject) => {
                            try {
                                GObject.GNode.deserializeAsync(data, gDesigner.getWorkspace(), options.progress, null, resolve);
                            } catch (e) {
                                reject(e);
                            }
                        }).catch(reject);
                        ((data = null),
                            scene &&
                                (!this.isCloudFile() && !this.isExternalFile() && scene && scene.isCloudSynchronization()
                                    ? this.loadFromCloud(
                                          scene,
                                          options,
                                          () => {
                                              this._updateCloudSynchronism(true);
                                          },
                                          () => {
                                              (this._updateCloudSynchronism(false), gDesigner.isOffline() || scene.setProperty("cfs", false));
                                          },
                                          false
                                      )
                                    : scene
                                      ? (this.isExternalFile() && scene.setProperty("cfs", false),
                                        this._updateScene(scene),
                                        !this.isCloudFile() && options.checkAnnotations && this.loadCloudAnnotations(),
                                        this._updateStatus(DocumentStatus.Loaded),
                                        this.setScene(scene, true))
                                      : this._updateStatus(DocumentStatus.LoadFailed),
                                resolve()));
                    })
                );
            }),
            (GDocumentController.prototype.loadFromCloud = function (scene, options, onLoaded, onSyncFailed) {
                let allowCancel = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                ((options = options || { progress: null }), this._updateStatus(DocumentStatus.Syncing, options));
                var attemptLoad = () => {
                    this.chooseLatestDocument(
                        scene,
                        (scene) => {
                            (this.setScene(scene), options.checkAnnotations && this.loadCloudAnnotations(), this._updateStatus(DocumentStatus.Loaded), onLoaded && onLoaded(scene));
                        },
                        (error) => {
                            (this.setScene(scene),
                                options.checkAnnotations && this.loadCloudAnnotations(),
                                this._updateStatus(DocumentStatus.SyncFailed),
                                onSyncFailed && onSyncFailed(error));
                        },
                        null,
                        (allowCancel &&
                            (() => {
                                this._updateStatus(DocumentStatus.LoadCancelled);
                            })) ||
                            void 0
                    );
                };
                attemptLoad();
            }),
            (GDocumentController.prototype.storeToCloud = async function (scene, onSuccess, onError) {
                let isExport = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    options = arguments.length > 4 ? arguments[4] : void 0;
                var saveOptions = options || {};
                this.isModified() || Object.assign(saveOptions, { lastModifiedDate: scene.getLastSavedTime() });
                const handleError = () => {
                        (this._updateCloudSynchronism(false),
                            onError
                                ? onError.apply(null, arguments)
                                : new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.sync-to-cloud-error"))).open());
                    },
                    handleSuccess = () => {
                        (this._updateCloudSynchronism(true), onSuccess && onSuccess.apply(null, arguments));
                    };
                this.isExternalFile()
                    ? this.performCloudSave(handleSuccess, handleError, saveOptions, isExport)
                    : GCommonNames.performSave(this, handleSuccess, handleError, saveOptions, await GCloudStorage.from(gDesigner.getDefaultStorage(), scene.getProperty("cid"), this.getTitle()), isExport);
            }),
            (GDocumentController.prototype.saveAnnotations = function (e, t) {
                return GCommonNames.saveDocumentAnnotations(this, e, t);
            }),
            (GDocumentController.prototype.loadCloudAnnotations = function () {
                return GCommonNames.getCloudAnnotations(this);
            }),
            (GDocumentController.prototype.performCloudSave = async function (e, t, n) {
                let o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                var self = this;
                let handledFailure = false;
                if (this.isCommercialProductFile()) this.openPaywall();
                else {
                    var storageItem = this.getStorageItem(),
                        handleFailure = (error) => {
                            (o ||
                                (error && 507 === error.code
                                    ? (GSystemDialog.alert(error.message), error.noFailCall && (handledFailure = true))
                                    : GSystemDialog.confirm(
                                          GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save-to-cloud-failed")),
                                          (confirmed) => {
                                              confirmed
                                                  ? gDesigner.executeAction("file.save-as.".concat(B.ext), [null, this], "savefailed")
                                                  : "function" != typeof t || handledFailure
                                                    ? "function" == typeof e && e(false)
                                                    : ((handledFailure = true), t());
                                          },
                                          GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")),
                                          GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes"))
                                      )),
                                error && console.log(error),
                                this.setSynchronizing(false),
                                this._updateStatus(DocumentStatus.SyncFailed),
                                this._updateStatus(DocumentStatus.SaveFailed),
                                gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.SynchronismUpdateFailed, this)),
                                this.setErrored(true),
                                t && !handledFailure && ((handledFailure = true), t()));
                        };
                    try {
                        this.setSynchronizing(true);
                        var performWrite = async () => {
                            const t = !self.isCloudFile() || storageItem.getType() !== B.type;
                            (await this.saveAnnotations(t),
                                (n = this.updateSaveOptionsLastModifiedDate(n)),
                                storageItem.write(
                                    this,
                                    function () {
                                        (self.setSynchronizing(false),
                                            self.setErrored(false),
                                            self._updateStatus(DocumentStatus.Saved, {}),
                                            gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, self)));
                                        try {
                                            self.isCloudFile() && gDesigner.updateRecentDocumentsAction();
                                        } finally {
                                            e && e();
                                        }
                                    },
                                    function (error) {
                                        handleFailure(error);
                                    },
                                    null,
                                    n
                                ));
                        };
                        if (storageItem.hasVersionControl() && (await storageItem.hasUpdates())) {
                            var scene = this.getScene(),
                                latestVersion = await storageItem.getLatestFileVersion(),
                                latestData = await new Promise((resolve, reject) => {
                                    latestVersion.read(
                                        (data) => resolve(data),
                                        (error) => reject(error)
                                    );
                                }),
                                latestScene = GObject.GNode.deserialize(GCommonNames.unzipData(latestData), gDesigner.getWorkspace());
                            return new GDocumentChooser(
                                scene,
                                latestScene,
                                this.getTitle(),
                                latestVersion.getName(),
                                (chosenScene) => {
                                    if (chosenScene === scene) performWrite();
                                    else {
                                        this.setSynchronizing(false);
                                        const newDocument = new GDocumentController(latestVersion);
                                        (newDocument.setScene(chosenScene), gDesigner.replaceDocument(this, newDocument, true));
                                    }
                                },
                                () => {
                                    (this.setSynchronizing(false), self.setErrored(false), this._updateStatus(DocumentStatus.SaveCancelled, {}), e && e());
                                }
                            ).open();
                        }
                        performWrite();
                    } catch (e) {
                        handleFailure(e);
                    }
                }
            }),
            (GDocumentController.prototype.chooseLatestDocument = async function (scene, onResolved, onError, isDifferentComparator, onCancel) {
                var reportError = (error) => {
                    (onError && onError(error), (error instanceof Error || "string" == typeof error) && console.error(error));
                };
                let fileInfo;
                try {
                    fileInfo = await designerConfig.gApi.getFile(scene.getProperty("cid"));
                } catch (e) {
                    return void reportError(e);
                }
                GCommonNames.loadDesignData(scene.getProperty("cid"), void 0, void 0, void 0, void 0, fileInfo.autosave)
                    .then(async (designData) => {
                        var sceneData = designData.data,
                            fileEntry = designData.file;
                        ((this._tempCloudStorageItem = await GCloudStorage.from(gDesigner.getDefaultStorage(), scene.getProperty("cid"))),
                            (isDifferentComparator =
                                isDifferentComparator ||
                                function (local, incoming) {
                                    return local.lastModifiedDate().getTime() !== incoming.lastModifiedDate().getTime() && (0, Utils.isDifferent)(local, incoming);
                                }));
                        var deserializedScene = GObject.GNode.deserialize(GCommonNames.unzipData(sceneData), gDesigner.getWorkspace());
                        deserializedScene
                            ? isDifferentComparator(scene, deserializedScene)
                                ? new GDocumentChooser(
                                      scene,
                                      deserializedScene,
                                      this.getTitle(),
                                      fileEntry.name,
                                      (chosenScene) => {
                                          ((this._tempCloudStorageItem = null),
                                              chosenScene === scene
                                                  ? this.storeToCloud(chosenScene)
                                                  : chosenScene.setProperties(["cid", "cfs"], scene.getProperties(["cid", "cfs"])),
                                              onResolved(chosenScene, true));
                                      },
                                      onCancel
                                  ).open()
                                : onResolved(scene)
                            : reportError();
                    })
                    .catch(reportError);
            }),
            (GDocumentController.prototype.isCloudSynchronismAvailable = function () {
                return this._cloudSynchronismFlag;
            }),
            (GDocumentController.prototype._updateCloudSynchronism = function (enabled) {
                this._cloudSynchronismFlag !== enabled &&
                    ((this._cloudSynchronismFlag = enabled),
                    gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.CloudSynchronismUpdated, this)));
            }),
            (GDocumentController.prototype.isCloudFile = function () {
                return this.getStorageItem() instanceof GCloudStorage.Item;
            }),
            (GDocumentController.prototype.isCollaborative = function () {
                return this.getStorageItem() && this.getStorageItem().hasMixin(GCollaborativeFileMixin);
            }),
            (GDocumentController.prototype.isShareable = function () {
                const e = this.getStorageItem();
                return (this.isCloudFile() && e && e.getId()) || (e && e.getId() && e.supportsShadowFile() && e.supportsSharing());
            }),
            (GDocumentController.prototype.isExternalFile = function () {
                return this.getStorageItem() instanceof GExternalStorage.Item;
            }),
            (GDocumentController.prototype.isEditingEnabled = function () {
                const e = this.getStorageItem();
                return !e || e.isEditingEnabled();
            }),
            (GDocumentController.prototype.getId = function () {
                return this.isCloudFile() || this.isExternalFile()
                    ? this.getStorageItem().getId()
                    : this.getCloudReferenceId()
                      ? this.getCloudReferenceId()
                      : null;
            }),
            (GDocumentController.prototype.getToken = function () {
                return this.isCollaborative() ? this.getStorageItem().getToken() : null;
            }),
            (GDocumentController.prototype.getAnnotationsId = function () {
                if (!designerConfig.HAS_ANNOTATIONS) return null;
                var id = this.getId();
                if (!id) {
                    var scene = this.getScene();
                    (id = scene.isCloudAnnotations() ? scene.getProperty("cid") : null) || (id = this.getReservedId());
                }
                return id;
            }),
            (GDocumentController.prototype.getAnnotationsToken = async function (requesterId) {
                if (!designerConfig.HAS_ANNOTATIONS) return null;
                var urlToken = null;
                let match = location.search.match(
                    /token=(?:[\0-%'-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/
                );
                match && (urlToken = match[0].slice(6));
                var token = null,
                    scene = this.getScene(),
                    id = this.getId(),
                    cid = scene.getProperty("cid"),
                    reservedId = this.getReservedId();
                return (!urlToken || (requesterId !== id && requesterId !== reservedId) ? requesterId === cid && requesterId !== id && requesterId !== reservedId && (token = scene.getProperty("asec")) : (token = urlToken), token);
            }),
            (GDocumentController.prototype.updateSaveOptionsLastModifiedDate = function (saveOptions, fallbackDate) {
                return (
                    saveOptions ? (saveOptions.save = true) : (saveOptions = { save: true }),
                    designerConfig.HAS_ANNOTATIONS &&
                        this._scene &&
                        this._scene.getLastTimeAnnotationsFromCloudModified() &&
                        (saveOptions.lastModifiedDate = this._scene.getLastTimeAnnotationsFromCloudModified()),
                    fallbackDate && !saveOptions.lastModifiedDate && (saveOptions.lastModifiedDate = fallbackDate),
                    saveOptions
                );
            }),
            (GDocumentController.prototype.isWebFile = function () {
                const e = this.getStorageItem();
                return e ? e instanceof GCloudStorage.Item : gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA;
            }),
            (GDocumentController.prototype.isCommercialProductFile = function () {
                return this.getStorageItem() && this.getStorageItem() instanceof GCloudStorage.CommercialProduct;
            }),
            (GDocumentController.prototype.restrictElements = function (elements) {
                return (
                    elements.forEach((element) => {
                        element.setProperty("restricted", this.getStorageItem().getId(), true);
                    }),
                    elements
                );
            }),
            (GDocumentController.prototype.filterUnrestrictedCommercialFileElements = function (elements) {
                return (
                    elements &&
                    elements.filter((element) => {
                        let restrictedOwnerId = element.getProperty("restricted", true) || false;
                        if (!restrictedOwnerId) return true;
                        let storageItem = this.getStorageItem();
                        return storageItem && storageItem.getId() === restrictedOwnerId;
                    })
                );
            }),
            (GDocumentController.prototype.hasCloudReference = function () {
                return !this.isCloudFile() && !!this._getCloudSceneId();
            }),
            (GDocumentController.prototype.getCloudReferenceId = function () {
                return (this.hasCloudReference() && this._getCloudSceneId()) || null;
            }),
            (GDocumentController.prototype._getCloudSceneId = function () {
                return this.getScene() && this.getScene().getProperty("cid");
            }),
            (GDocumentController.prototype.isCloudSyncOn = function () {
                return this.hasCloudReference() && this.getScene() && this.getScene().isCloudSynchronization();
            }),
            (GDocumentController.prototype.isExtensionAvailableForLoading = function (extension) {
                return extension && !!GDocumentController.FileTypes.find((fileType) => fileType.load && fileType.ext.toUpperCase() === extension.toUpperCase());
            }),
            (GDocumentController.prototype.reload = async function () {
                let storageItem;
                if ((gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.BeforeReload, this)), this.isCloudFile())) {
                    const fileInfo = await designerConfig.gApi.getFile(this.getId());
                    ((storageItem = await GCloudStorage.from(gDesigner.getDefaultStorage(), fileInfo, void 0, void 0, fileInfo.autosave)),
                        this.getEditor() && this.getEditor().markSavePoint(),
                        this.setStorageItem(storageItem));
                } else storageItem = this.getStorageItem();
                this.load(storageItem);
            }),
            (GDocumentController.prototype.load = function (storageItem) {
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if ("lts" !== gDesigner.getEnv() || gDesigner.isEnabledProFeatures()) {
                    var item = storageItem || this._storageItem;
                    if (item) {
                        var fileName = item.getName(),
                            extension = item.getExtension();
                        ((options = Object.assign({}, { progress: null, filename: fileName, ext: extension ? extension.toLowerCase() : null }, options)),
                            this._updateStatus(DocumentStatus.Loading, options));
                        var ensureFontFamiliesLoaded = (callback) => {
                                let called = false;
                                FontsProviderManager.getInstance().query(
                                    (fontInfo) => {
                                        var allFamilies = [];
                                        (fontInfo.faces.slice().map((face) => {
                                            for (var familyNames = [face.family], n = 0; n < face.fonts.length; n++)
                                                face.fonts[n].family && familyNames.indexOf(face.fonts[n].family) < 0 && familyNames.push(face.fonts[n].family);
                                            allFamilies = allFamilies.concat(familyNames);
                                        }),
                                            GImporters.GPDFImport.updateFontFamilies(allFamilies),
                                            called || ((called = true), callback()));
                                    },
                                    "%",
                                    true
                                );
                            },
                            onBitmapLoaded = function (error, url, width, height) {
                                if (error)
                                    return (
                                        new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open(),
                                        void this._updateStatus(DocumentStatus.LoadFailed)
                                    );
                                options.progress(100);
                                var newScene = gDesigner.createScene(),
                                    activePage = newScene.getActivePage(),
                                    image = new GObject.GImage();
                                (image.setProperties(["iw", "ih", "url"], [width, height, url]),
                                    activePage.setProperties(["w", "h", "bck"], [width, height, "PNG" !== extension ? GObject.GRGBColor.WHITE : null]),
                                    activePage.appendChild(image),
                                    item.getName() && this.setTitle(item.getName()),
                                    this.setScene(newScene),
                                    this._updateStatus(DocumentStatus.Loaded),
                                    gDesigner.gtmEvent("DOCUMENT_IMPORT_EVENT"));
                            }.bind(this);
                        item.read(
                            async (data) => {
                                if ("GVDESIGN" === extension || extension === B.ext.toUpperCase()) {
                                    (gDesigner.stats("document_open_".concat(extension.toLowerCase())), (options.checkAnnotations = true));
                                    const fontsProviderManager = FontsProviderManager.getInstance();
                                    fontsProviderManager.setShowMissingFontsDialog(false);
                                    const missingFontsTracker = new GMissingFontsTracker.default();
                                    (missingFontsTracker.start(),
                                        this._loadDataIntoDocument(data, options).finally(async () => {
                                            try {
                                                const fontManager = gDesigner.getWorkspace().getFontManager();
                                                await new GPendingFontsWaiter.default(fontManager).waitForAllPendingFonts();
                                                const missingFonts = missingFontsTracker.getMissingFonts();
                                                missingFonts && missingFonts.length && new GMissingFontsDialog(this, missingFonts).open();
                                            } finally {
                                                (missingFontsTracker.stop(), fontsProviderManager.setShowMissingFontsDialog(true));
                                            }
                                        }),
                                        gDesigner.addToRecentFiles(item),
                                        gDesigner.gtmEvent("DOCUMENT_OPEN_EVENT"));
                                } else if (U.length && U.find((e) => e.ext.toUpperCase() === extension)) {
                                    await this._handleSecondaryFormatRead(item, data, options);
                                    var o = gDesigner.getWindows().getActiveWindow().getView();
                                    if (o && this.hasCDR() && !o.getViewConfiguration().multiPageView) {
                                        var c = this._scene.getActivePage();
                                        if (c) {
                                            var contentBBox = c.getContentBBox();
                                            if (contentBBox && !contentBBox.isEmpty()) {
                                                var center = contentBBox.getSide(GObject.GRect.Side.CENTER);
                                                o.zoomAtCenter(center);
                                            }
                                        }
                                    }
                                    gDesigner.gtmEvent("DOCUMENT_OPEN_EVENT");
                                } else if ("SVG" === extension || "SVGZ" === extension)
                                    (gDesigner.stats("document_open_svg"),
                                        GImporters.GSVGImport.import(
                                            data,
                                            { fontProvider: fontProvider },
                                            gDesigner.getWorkspace().getFontManager(),
                                            (e, importedNode, meta) => {
                                                if (importedNode) {
                                                    let scene;
                                                    if (importedNode instanceof GObject.GPage)
                                                        ((scene = gDesigner.createScene(true)), scene.appendChild(importedNode), scene.setActivePage(importedNode));
                                                    else {
                                                        scene = gDesigner.createScene();
                                                        var activePage = scene.getActivePage(),
                                                            combinedBBox = null,
                                                            extractedElements = [];
                                                        if (importedNode instanceof GObject.GGroup)
                                                            for (var singleChild = 1 === importedNode.getChildren().length; importedNode.getFirstChild(); ) {
                                                                var c = importedNode.getFirstChild();
                                                                if ((importedNode.removeChild(c), activePage.appendChild(c), singleChild && c.hasMixin(GObject.GStylable))) {
                                                                    var d = importedNode.getEffects();
                                                                    d &&
                                                                        d.getChildren().length &&
                                                                        d.getChildren().forEach(function (effect) {
                                                                            c.getEffects().appendChild(effect.clone());
                                                                        });
                                                                }
                                                                if (
                                                                    !c.hasMixin(GObject.GStylable) ||
                                                                    null === c.getPaintLayers() ||
                                                                    c instanceof GObject.GImage ||
                                                                    c.hasStyleBorder() ||
                                                                    c.hasStyleFill()
                                                                )
                                                                    (extractedElements.push(c),
                                                                        c.getPaintBBox() &&
                                                                            (combinedBBox = combinedBBox ? combinedBBox.united(c.getPaintBBox()) : c.getPaintBBox()));
                                                            }
                                                        else (extractedElements.push(importedNode), activePage.appendChild(importedNode), (combinedBBox = importedNode.getPaintBBox()));
                                                        (GObject.GUtil.each(extractedElements, function () {}),
                                                            activePage.setProperties(["w", "h"], [meta ? meta.width : 0, meta ? meta.height : 0]),
                                                            meta.unit && scene.setProperty("ut", meta.unit));
                                                    }
                                                    (this._updateStatus(DocumentStatus.Loaded),
                                                        item.getName() && this.setTitle(item.getName()),
                                                        this.setScene(scene),
                                                        gDesigner.gtmEvent("DOCUMENT_IMPORT_EVENT"));
                                                } else this._updateStatus(DocumentStatus.LoadFailed);
                                                var view = gDesigner.getWindows().getActiveWindow().getView();
                                                ((view.getViewConfiguration().paintMode = GObject.GScenePaintConfiguration.PaintMode.Output),
                                                    view.invalidate());
                                            }
                                        ));
                                else if ("EPS" === extension)
                                    (gDesigner.stats("document_open_eps"),
                                        this._preProcessFonts(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.keep-fonts-eps"))),
                                        GImporters.GEPSImport.import(
                                            data,
                                            gDesigner.getSetting("eps_outline_fonts", true),
                                            gDesigner.getWorkspace().getFontManager(),
                                            (error, importedNode, meta, backgroundColor) => {
                                                if ((this._postProcessFonts(), error || !importedNode)) {
                                                    (error && new GMessageDialog(error).open(), this._updateStatus(DocumentStatus.LoadFailed));
                                                    var view = gDesigner.getWindows().getActiveWindow().getView();
                                                    return (
                                                        (view.getViewConfiguration().paintMode = GObject.GScenePaintConfiguration.PaintMode.Output),
                                                        void view.invalidate()
                                                    );
                                                }
                                                var scene = gDesigner.createScene(),
                                                    activePage = scene.getActivePage(),
                                                    c = null;
                                                ("production" !== gDesigner.getEnv() &&
                                                    "lts" !== gDesigner.getEnv() &&
                                                    ((z = 0), console.time("optimization time")),
                                                    mergeDuplicateSiblings(importedNode),
                                                    "production" !== gDesigner.getEnv() &&
                                                        "lts" !== gDesigner.getEnv() &&
                                                        (console.timeEnd("optimization time"), console.log("Nodes removed: " + z)));
                                                var importedChildren = [];
                                                for (
                                                    scene._beginBlockChanges([
                                                        GObject.GNode._Change.BeforeChildRemove,
                                                        GObject.GNode._Change.AfterChildRemove,
                                                        GObject.GNode._Change.BeforeChildInsert,
                                                        GObject.GNode._Change.AfterChildInsert,
                                                    ]),
                                                        importedNode._blockUpdateChanges();
                                                    importedNode.getFirstChild();

                                                ) {
                                                    var u = importedNode.getFirstChild();
                                                    (importedNode.removeChild(u),
                                                        activePage.appendChild(u),
                                                        importedChildren.push(u),
                                                        u.getPaintBBox() && (c = c ? c.united(u.getPaintBBox()) : u.getPaintBBox()));
                                                }
                                                (activePage.acceptChildren(function (node) {
                                                    node instanceof GObject.GText && node.hasFontsToResolve() && node.toFakeText();
                                                }),
                                                    importedNode._releaseUpdateChanges(),
                                                    GObject.GUtil.each(importedChildren, function (e, childNode) {
                                                        childNode.transform(new GObject.GTransform().translated(-c.getX(), -c.getY()));
                                                    }),
                                                    meta
                                                        ? activePage.setProperties(["w", "h"], [meta ? meta.width : 0, meta ? meta.height : 0])
                                                        : activePage.trimToContent(),
                                                    activePage.setProperty("bck", backgroundColor || GObject.GRGBColor.WHITE),
                                                    scene._endBlockChanges([
                                                        GObject.GNode._Change.BeforeChildRemove,
                                                        GObject.GNode._Change.AfterChildRemove,
                                                        GObject.GNode._Change.BeforeChildInsert,
                                                        GObject.GNode._Change.AfterChildInsert,
                                                    ]),
                                                    this._updateStatus(DocumentStatus.Loaded),
                                                    item.getName() && this.setTitle(item.getName()),
                                                    this.setScene(scene),
                                                    gDesigner.gtmEvent("DOCUMENT_IMPORT_EVENT"));
                                            },
                                            function (message) {
                                                new GMessageDialog(message).open();
                                            },
                                            function (value) {
                                                options && options.progress && options.progress(value);
                                            },
                                            this.initCancelHandler.bind(this)
                                        ));
                                else if ("PDF" === extension || "AI" === extension) {
                                    ("PDF" === extension ? gDesigner.stats("document_open_pdf") : gDesigner.stats("document_open_ai"),
                                        this._preProcessFonts());
                                    var maxProgress = 0,
                                        aiIncompatibleWarning = function (error) {
                                            new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.ai-not-pdf-compatible")), error).open();
                                        };
                                    ensureFontFamiliesLoaded(() =>
                                        GImporters.GPDFImport.import(
                                            data,
                                            {},
                                            gDesigner.getWorkspace().getFontManager(),
                                            (e, t, o) => {
                                                if ((this._postProcessFonts(), e)) new GMessageDialog(e).open();
                                                else {
                                                    var scene = gDesigner.createScene(true);
                                                    (scene._beginBlockChanges([
                                                        GObject.GNode._Change.BeforeChildRemove,
                                                        GObject.GNode._Change.AfterChildRemove,
                                                        GObject.GNode._Change.BeforeChildInsert,
                                                        GObject.GNode._Change.AfterChildInsert,
                                                    ]),
                                                        GObject.GUtil.each(t, function (e, t) {
                                                            (t.setProperty(
                                                                "name",
                                                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page")) + " " + (e + 1)
                                                            ),
                                                                "production" !== gDesigner.getEnv() &&
                                                                    "lts" !== gDesigner.getEnv() &&
                                                                    (console.time("optimization time"), (z = 0)),
                                                                mergeDuplicateSiblings(t),
                                                                "production" !== gDesigner.getEnv() &&
                                                                    "lts" !== gDesigner.getEnv() &&
                                                                    (console.timeEnd("optimization time"),
                                                                    console.log("Nodes removed: " + z)),
                                                                scene.appendChild(t));
                                                        }),
                                                        scene._endBlockChanges([
                                                            GObject.GNode._Change.BeforeChildRemove,
                                                            GObject.GNode._Change.AfterChildRemove,
                                                            GObject.GNode._Change.BeforeChildInsert,
                                                            GObject.GNode._Change.AfterChildInsert,
                                                        ]),
                                                        scene.setActivePage(t[0]),
                                                        this._updateStatus(DocumentStatus.Loaded),
                                                        item.getName() && this.setTitle(item.getName()),
                                                        this.setScene(scene),
                                                        o instanceof Array &&
                                                            o.length &&
                                                            new GMissingFontsDialog(this, o, null, (e) => {
                                                                e ||
                                                                    scene.acceptChildren((e) => {
                                                                        e instanceof GObject.GText && e.toFakeText();
                                                                    });
                                                            }).open());
                                                    var r = gDesigner.getWindows().getActiveWindow().getView();
                                                    ((r.getViewConfiguration().paintMode = GObject.GScenePaintConfiguration.PaintMode.Output),
                                                        r.invalidate(),
                                                        gDesigner.gtmEvent("DOCUMENT_IMPORT_EVENT"));
                                                }
                                            },
                                            function (loaded, total) {
                                                ((maxProgress = Math.max(maxProgress, (loaded / total) * 100)), options.progress(maxProgress));
                                            },
                                            aiIncompatibleWarning
                                        )
                                    );
                                } else if ("SKETCH" === extension)
                                    (gDesigner.stats("document_open_sketch"),
                                        this._preProcessFonts(),
                                        GImporters.GSketchImport.import(
                                            data,
                                            {
                                                progress: options.progress,
                                                fontProvider: fontProvider,
                                                workspace: gDesigner.getWorkspace(),
                                            },
                                            (e) => {
                                                this._postProcessFonts();
                                                var pages = (e = e || {}).pages,
                                                    v50Error = e.v50error;
                                                if (pages && Array.isArray(pages)) {
                                                    e.replacedFonts && new GMissingFontsDialog(this, e.replacedFonts).open();
                                                    var scene = gDesigner.createScene(true);
                                                    (scene._beginBlockChanges([
                                                        GObject.GNode._Change.BeforeChildRemove,
                                                        GObject.GNode._Change.AfterChildRemove,
                                                        GObject.GNode._Change.BeforeChildInsert,
                                                        GObject.GNode._Change.AfterChildInsert,
                                                    ]),
                                                        pages.forEach((page) => {
                                                            scene.appendChild(page);
                                                        }),
                                                        scene._endBlockChanges([
                                                            GObject.GNode._Change.BeforeChildRemove,
                                                            GObject.GNode._Change.AfterChildRemove,
                                                            GObject.GNode._Change.BeforeChildInsert,
                                                            GObject.GNode._Change.AfterChildInsert,
                                                        ]),
                                                        scene.setActivePage(pages[0]),
                                                        this._updateStatus(DocumentStatus.Loaded),
                                                        item.getName() && this.setTitle(item.getName()),
                                                        this.setScene(scene),
                                                        gDesigner.gtmEvent("DOCUMENT_IMPORT_EVENT"));
                                                } else if (v50Error)
                                                    (new GMessageDialog(
                                                        GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.unsupported-sketch-version-50+"))
                                                    ).open(),
                                                        this._updateStatus(DocumentStatus.LoadFailed));
                                                else {
                                                    var failure = { text: "string" == typeof e ? e : null };
                                                    this._updateStatus(DocumentStatus.LoadFailed, failure);
                                                }
                                            }
                                        ));
                                else if ("JPG" === extension || "JPEG" === extension || "PNG" === extension || "HEIC" === extension)
                                    if ((gDesigner.stats("document_open_".concat(extension.toLowerCase())), "HEIC" === extension)) {
                                        const blob = new Blob([data]);
                                        HeicParser.getInstance()
                                            .then((parser) => parser.parse(blob))
                                            .then((image) => GImporters.GBitmapImport.import(image, onBitmapLoaded))
                                            .catch((error) => console.log("Heic conversion error", error));
                                    } else GImporters.GBitmapImport.import(data, onBitmapLoaded);
                                else this._updateStatus(DocumentStatus.LoadFailed);
                            },
                            (error) => {
                                (error &&
                                    (console.log(error), new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.error-reading-file"))).open()),
                                    this._updateStatus(DocumentStatus.LoadFailed));
                            },
                            options.progress
                        );
                    }
                }
            }),
            (GDocumentController.prototype._handleSecondaryFormatRead = async function (e, data) {
                this._updateStatus(DocumentStatus.LoadFailed, data);
            }),
            (GDocumentController.prototype._handleSecondaryFormatSave = async function (e, t, onError) {
                onError && onError(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.cannot-save")));
            }),
            (GDocumentController.prototype.store = async function (e, t, n) {
                let o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                const i = !o.export;
                var r = (e) => {
                    (i && (this._updateStatus(DocumentStatus.SaveFailed, e), this._updateStatus(DocumentStatus.Ready)), n && n(e));
                };
                if ("lts" === gDesigner.getEnv() && !gDesigner.isEnabledProFeatures()) return r();
                if ((gContainer.verifyEnoughMemoryToSave(this), !this._scene)) return r();
                var s = e || this._storageItem;
                if (!s) throw new Error("Unable to save, no storage item available.");
                var d = s.getExtension(),
                    u = {
                        progress: null,
                        filename: o.filename,
                        ext: d && d.toLowerCase(),
                        referer: o.referer,
                    };
                i && this._updateStatus(DocumentStatus.Saving, u);
                var p = () => {
                        (i && (this._updateStatus(DocumentStatus.Saved), this._updateStatus(DocumentStatus.Ready)),
                            (d !== B.ext.toUpperCase() && -1 === U.findIndex((e) => e.ext.toUpperCase() === d)) || !this._editor
                                ? gDesigner.gtmEvent("DOCUMENT_EXPORT_EVENT")
                                : (gDesigner.gtmEvent("DOCUMENT_SAVE_EVENT"), i && this._editor.markSavePoint()),
                            i && gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, this)));
                        try {
                            d === B.ext.toUpperCase() && gDesigner.addToRecentFiles(s);
                        } finally {
                            t && t();
                        }
                    },
                    g = (e) => {
                        s.write(e, p, r, u.progress, this);
                    };
                const h = [GFileTypes.JPEG.ext.toUpperCase(), GFileTypes.JPG.ext.toUpperCase(), GFileTypes.PNG.ext.toUpperCase()],
                    m = [GFileTypes.JPEG.ext.toUpperCase(), GFileTypes.JPG.ext.toUpperCase()];
                if (d === B.ext.toUpperCase()) {
                    var y = this._scene,
                        b = 0;
                    (y.acceptChildren(function () {
                        b++;
                    }),
                        u.progress && u.progress instanceof Function && u.progress(10),
                        defer(function () {
                            var e;
                            try {
                                e = GObject.GNode.serialize(y, GObject.GUtil.extend({ save: true }, o || {}));
                            } catch (e) {
                                return (console.error(e), void r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.cannot-save"))));
                            }
                            null === e || "" === e || e.length < b
                                ? r(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.cannot-save")))
                                : (u.progress && u.progress instanceof Function && u.progress(50),
                                  defer(function () {
                                      var t = new Uint8Array(PDFNodeStream.gzip(e, { level: 9 }).buffer);
                                      (u.progress && u.progress instanceof Function && u.progress(75),
                                          t.byteLength > 20 + b ? g(t) : r("GZIP compression fail"));
                                  }));
                        }));
                } else if (U && U.find((e) => e.ext.toUpperCase() === d)) await this._handleSecondaryFormatSave(u, g, r, o);
                else if ("SVG" === d || "SVGZ" === d) {
                    const { exportOptions: e = {} } = o;
                    GExporters.GSVGExport.export(this._scene.getActivePage(), e, (e, t) => {
                        if (e || !t) return r();
                        if (!o.suppressMessages && !gDesigner.getSetting("disable_warning_unsupported_features", false)) {
                            let e = GExporters.GSVGExport.getUnsupportedFeatures(this._scene.getActivePage());
                            e && e.length && new GUnsupportedFeaturesDialog(e).open();
                        }
                        if ("SVGZ" === d) g(new Uint8Array(PDFNodeStream.gzip(t, { level: 9 }).buffer));
                        else if ("function" == typeof TextEncoder) g(new TextEncoder("utf-8").encode(t));
                        else {
                            var n = encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function (e, t) {
                                    return String.fromCharCode("0x" + t);
                                }),
                                i = new Uint8Array(n.length);
                            (Array.prototype.forEach.call(n, function (e, t) {
                                i[t] = e.charCodeAt(0);
                            }),
                                g(i));
                        }
                    });
                } else if (h.includes(d)) {
                    var w = GObject.GLength.DPI,
                        C = this._scene.getActivePage();
                    GExporters.GBitmapExport.export(C, null, m.includes(d) ? GObject.GRGBColor.WHITE : null, null, w, 1, true).toImageBuffer(d, (e) =>
                        g(new Uint8Array(e))
                    );
                } else if ("PDF" === d) {
                    var x = this;
                    gDesigner.getUser().then(function (e) {
                        var t;
                        ((t =
                            e && e.getFullUserName()
                                ? e.getFullUserName()
                                : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.default-export-author"))),
                            GExporters.GPDFExport.export(
                                x._scene,
                                {
                                    dpi: o.dpi || 72,
                                    progress: u.progress,
                                    user: t,
                                    jpegQuality: o.jpegQuality || designerConfig.JPEG_EXPORT_QUALITY_DEFAULT,
                                    title: x.getTitle(),
                                },
                                (e, t) => {
                                    if (e || !t) return r(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.pdf-export-error")));
                                    var n = new FileReader();
                                    ((n.onload = () => g(new Uint8Array(n.result))), n.readAsArrayBuffer(new Blob([t])));
                                },
                                null,
                                { message: (e) => u.progressInfo && u.progressInfo(e) }
                            ));
                    });
                } else r();
            }),
            (GDocumentController.prototype.initCancelHandler = function (e) {
                this._activeWindow && this._activeWindow.activateCancelLoading(e);
            }),
            (GDocumentController.prototype.placeOrImport = function (source, placement, skipTransaction, name, onInserted) {
                var l = (element, name) => {
                        if ((name && element instanceof GObject.GBlock && element.setProperty("name", name), placement && element.hasMixin(GObject.GElement.Transform))) {
                            var bbox = element.getGeometryBBox(),
                                x0 = bbox && bbox.getX() ? bbox.getX() : 0,
                                y0 = bbox && bbox.getY() ? bbox.getY() : 0,
                                offsetX = placement.center ? -bbox.getWidth() / 2 : 0,
                                offsetY = placement.center ? -bbox.getHeight() / 2 : 0;
                            element.transform(new GObject.GTransform(1, 0, 0, 1, placement.x - x0 + offsetX, placement.y - y0 + offsetY), true);
                        }
                        (onInserted && onInserted([element])) || this.insertElement(element, !placement, true, skipTransaction);
                    },
                    c = (file, placement) => {
                        GImporters.GBitmapImport.import(file, function (error, url, width, height) {
                            if (error) new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                            else {
                                var image = new GObject.GImage();
                                (image.setProperties(["iw", "ih", "url"], [width, height, url]), l(image, placement));
                            }
                        });
                    };
                const d = (file, name) => {
                    let progressMessage = name
                            ? "".concat(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-file")).replace("%name", name), "...")
                            : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.opening-your-image")),
                        updateProgress = this._activateProgress(progressMessage);
                    try {
                        (this._preProcessFonts(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.keep-fonts-eps"))),
                            GImporters.GEPSImport.import(
                                file,
                                gDesigner.getSetting("eps_outline_fonts", true),
                                gDesigner.getWorkspace().getFontManager(),
                                (error, importedNode, i, r) => {
                                    if ((this._deactivateProgress(), this._postProcessFonts(), !error && importedNode)) {
                                        ("production" !== gDesigner.getEnv() &&
                                            "lts" !== gDesigner.getEnv() &&
                                            ((z = 0), console.time("optimization time")),
                                            mergeDuplicateSiblings(importedNode),
                                            "production" !== gDesigner.getEnv() &&
                                                "lts" !== gDesigner.getEnv() &&
                                                (console.timeEnd("optimization time"), console.log("Nodes removed: " + z)));
                                        var targetElement = importedNode,
                                            paintBBox = importedNode.getPaintBBox();
                                        if (r) {
                                            ((targetElement = new GObject.GRectangle()).setBounds(0, 0, paintBBox.getWidth(), paintBBox.getHeight()),
                                                targetElement._blockUpdateChanges());
                                            var fillPaintLayer = new GObject.GStylable.FillPaintLayer();
                                            for (fillPaintLayer.setProperties(["_pt"], [r]), targetElement.getPaintLayers().appendChild(fillPaintLayer); importedNode.getFirstChild(); ) {
                                                var d = importedNode.getFirstChild();
                                                (importedNode.removeChild(d),
                                                    d.transform(new GObject.GTransform().translated(-paintBBox.getX(), -paintBBox.getY())),
                                                    targetElement.appendChild(d));
                                            }
                                            (targetElement._releaseUpdateChanges(), targetElement._invalidateGeometryForChildUpdate(true));
                                        } else targetElement.transform(new GObject.GTransform().translated(-paintBBox.getX(), -paintBBox.getY()));
                                        (targetElement.setProperty("name", name || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"))),
                                            skipTransaction || this._editor.beginTransaction());
                                        try {
                                            (this._scene.appendChild(targetElement),
                                                targetElement.acceptChildren(function (e) {
                                                    e instanceof GObject.GText && e.hasFontsToResolve() && e.toFakeText();
                                                }));
                                        } finally {
                                            skipTransaction ||
                                                this._editor.commitTransaction(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.import-from-eps"))
                                                );
                                        }
                                    } else error && new GMessageDialog(error).open();
                                },
                                (error) => {
                                    (this._deactivateProgress(), new GMessageDialog(error).open());
                                },
                                updateProgress,
                                this.initCancelHandler.bind(this)
                            ));
                    } catch (e) {
                        throw (this._deactivateProgress(), e);
                    }
                };
                var u = (file, name, isAI) => {
                        let progressMessage = name
                                ? "".concat(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-file")).replace("%name", name), "...")
                                : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.opening-your-image")),
                            updateProgress = this._activateProgress(progressMessage);
                        try {
                            (this._preProcessFonts(),
                                GImporters.GPDFImport.import(
                                    file,
                                    { startPage: 1 },
                                    gDesigner.getWorkspace().getFontManager(),
                                    (error, pages) => {
                                        if ((this._deactivateProgress(), this._postProcessFonts(), error)) new GMessageDialog(error).open();
                                        else if (pages && pages.length) {
                                            skipTransaction || this._editor.beginTransaction();
                                            try {
                                                var page = pages.shift();
                                                ("production" !== gDesigner.getEnv() &&
                                                    "lts" !== gDesigner.getEnv() &&
                                                    (console.time("optimization time"), (z = 0)),
                                                    mergeDuplicateSiblings(page),
                                                    "production" !== gDesigner.getEnv() &&
                                                        "lts" !== gDesigner.getEnv() &&
                                                        (console.timeEnd("optimization time"), console.log("Nodes removed: " + z)));
                                                var bbox = page.getGeometryBBox(),
                                                    rect = new GObject.GRectangle();
                                                (rect.setProperty("name", name || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"))),
                                                    rect.setBounds(bbox.getX(), bbox.getY(), bbox.getWidth(), bbox.getHeight()),
                                                    rect.beginUpdate(),
                                                    page.getChildren().forEach((child) => {
                                                        (page.removeChild(child), rect.appendChild(child));
                                                    }),
                                                    this._scene.appendChild(rect),
                                                    rect.acceptChildren((node) => {
                                                        node instanceof GObject.GText && node.toFakeText();
                                                    }),
                                                    rect.endUpdate());
                                            } finally {
                                                skipTransaction ||
                                                    this._editor.commitTransaction(
                                                        GObject.GLocale.get(
                                                            new GObject.GLocaleKey(
                                                                "GDocument",
                                                                isAI ? "text.import-from-ai" : "text.import-from-pdf"
                                                            )
                                                        )
                                                    );
                                            }
                                        }
                                    },
                                    (error) => updateProgress(error),
                                    function (error) {
                                        new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.ai-not-pdf-compatible")), error).open();
                                    }
                                ));
                        } catch (e) {
                            throw (this._deactivateProgress(), e);
                        }
                    },
                    dispatchImport = (file, extension, name) => {
                        extension = extension && extension.toUpperCase();
                        var maxSize = GPlatform.GPlatform.maxPngDataSize;
                        switch (
                            (("JPG" !== extension && "JPEG" !== extension) ||
                                (GObject.GSystem.operatingSystem !== GObject.GSystem.OperatingSystem.OSX_IOS && (maxSize >>= 2)),
                            extension)
                        ) {
                            case "JPG":
                            case "JPEG":
                            case "HEIC":
                            case "GIF":
                            case "PNG":
                                if (file.size > maxSize)
                                    return void new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                "HEIC" === extension
                                    ? HeicParser
                                          .getInstance()
                                          .then((parser) => parser.parse(file))
                                          .then((image) => c(image, name))
                                          .catch(() => console.log("HEIC conversion failed"))
                                    : c(file, name);
                                break;
                            case "SVG":
                            case "SVGZ":
                                ((file, name) => {
                                    GImporters.GSVGImport.import(file, { fontProvider: fontProvider }, gDesigner.getWorkspace().getFontManager(), (error, node) => {
                                        node && l(node, name);
                                    });
                                })(file, name);
                                break;
                            case "PDF":
                                u(file, name, false);
                                break;
                            case "AI":
                                GFileTypes.getFileTypesArray().includes(GFileTypes.AI) && u(file, name, true);
                                break;
                            case "EPS":
                                d(file, name);
                        }
                    };
                if (source instanceof GStorage.Item)
                    source.read((rawData) => {
                        var extension = source.getExtension(),
                            name = source.getName();
                        dispatchImport(new Blob([rawData]), extension, name);
                    });
                else {
                    var detectedExt = null,
                        baseName = null;
                    if (!name && source.name) {
                        var dotIndex = source.name.lastIndexOf(".");
                        dotIndex >= 0 && ((detectedExt = source.name.substr(dotIndex + 1)), (baseName = source.name.substr(0, dotIndex)));
                    }
                    if (!detectedExt && source.type)
                        for (var y = 0; y < GDocumentController.FileTypes.length; ++y)
                            if (GDocumentController.FileTypes[y].mime === source.type) {
                                detectedExt = GDocumentController.FileTypes[y].ext;
                                break;
                            }
                    if (!gDesigner.isEnabledProFeatures()) {
                        let e = GDocumentController.FileTypes.find((e) => e.ext.toUpperCase() === detectedExt.toUpperCase());
                        if (e && e.pro) return void gDesigner.handlePROFeatureInterruption();
                    }
                    dispatchImport(source, detectedExt, baseName);
                }
            }),
            (GDocumentController.prototype._preProcessFonts = function (message) {
                if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                    let systemFontsProvider = gContainer.getSystemFontsProvider();
                    systemFontsProvider && FontsProviderManager.enableProviders([systemFontsProvider], true);
                }
                let fontsProviderManager = FontsProviderManager.getInstance();
                fontsProviderManager && (message && (fontsProviderManager.keepFontsMessage = message), fontsProviderManager.setShowMissingFontsDialog(false));
            }),
            (GDocumentController.prototype._postProcessFonts = function () {
                if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                    let systemFontsProvider = gContainer.getSystemFontsProvider();
                    systemFontsProvider && FontsProviderManager.disableProviders([systemFontsProvider], true);
                }
                let fontsProviderManager = FontsProviderManager.getInstance();
                fontsProviderManager && fontsProviderManager.setShowMissingFontsDialog(true);
            }),
            (GDocumentController.prototype._activateProgress = function (message) {
                if (this._activeWindow) {
                    let progressElement = this._activeWindow.activateProgress(message, true).find("progress");
                    return (value) => progressElement.val(value);
                }
                return (value) => console.info("progress", value);
            }),
            (GDocumentController.prototype._deactivateProgress = function () {
                this._activeWindow && this._activeWindow.deactivateProgress();
            }),
            (GDocumentController.prototype.activate = function () {
                this._updateState();
            }),
            (GDocumentController.prototype.isCollaborativeTextEditing = function () {
                return false;
            }),
            (GDocumentController.prototype.getCollaborativeTextController = function () {
                return null;
            }),
            (GDocumentController.prototype.deactivate = function () {}),
            (GDocumentController.prototype.release = function () {
                (this._scene && this.setScene(null),
                    this.getStorageItem() && this.getStorageItem().release(),
                    this.removeAllEventListeners(true));
            }),
            (GDocumentController.prototype.publish = function (options) {
                const extension = this._storageItem && this._storageItem.getExtension(),
                    supportsSecondaryFormat = !!U.find((e) => e.ext.toUpperCase() === extension);
                let collabTextUpdate = false,
                    sendEmail = true;
                return (
                    options && ((collabTextUpdate = options.collabTextUpdate), (sendEmail = options.sendEmail)),
                    this.getId() && designerConfig.gApi.realtime && designerConfig.gApi.realtime.publishFile
                        ? designerConfig.gApi.realtime.publishFile(this.getId(), { sessionId: this.sessionId }, supportsSecondaryFormat, collabTextUpdate, sendEmail)
                        : Promise.resolve()
                );
            }),
            (GDocumentController.prototype._afterInsertNodeEvent = function (event) {
                if (event.node instanceof GObject.GGroup && event.node.getFirstChild()) this._updateDocumentColorsFromGroup(event.node);
                else if (event.node instanceof GObject.GElement && event.node.hasMixin(GObject.GElement.Stylable)) this._updateDocumentColors(event.node);
                else if (event.node instanceof GObject.GStylable.PaintLayer) {
                    if ((this._updateDocumentColorsFromElement(event.node, ["_pt"]), this.hasCDR())) {
                        var t = event.node.getParent();
                        t &&
                            (event.node instanceof GObject.GStylable.FillPaintLayer
                                ? t.getFillLayers(true).length > 1 && GSystemDialog.showCDRUnsupportedObjectWarning()
                                : event.node instanceof GObject.GStylable.BorderPaintLayer &&
                                  t.getBorderLayers(true).length > 1 &&
                                  GSystemDialog.showCDRUnsupportedObjectWarning());
                    }
                } else event.node instanceof GObject.GStylable.Effect && this.hasCDR() && GSystemDialog.showCDRUnsupportedObjectWarning(event.node);
                this._updateSymbolLock(this._scene.getActivePage());
            }),
            (GDocumentController.prototype._beforeRemoveNodeEvent = function (event) {
                this._updateSymbolLock(event.node, true);
            }),
            (GDocumentController.prototype._afterRemoveNodeEvent = function (event) {
                (event.node instanceof GObject.GGroup && event.node.getFirstChild()
                    ? this._updateDocumentColorsFromGroup(event.node, true)
                    : event.node instanceof GObject.GElement && event.node.hasMixin(GObject.GElement.Stylable)
                      ? this._updateDocumentColors(event.node, true)
                      : event.node instanceof GObject.GStylable.PaintLayer && this._updateDocumentColorsFromElement(event.node, ["_pt"], true),
                    event.node instanceof GObject.GText && this._updateDocumentColorsFromElement(event.node, ["content"], true));
            }),
            (GDocumentController.prototype._beforePropertiesChangeEvent = function (event) {
                event.node instanceof GObject.GSymbol && null === event.values[event.properties.indexOf("masterRef")] && this._updateSymbolLock(event.node, true);
            }),
            (GDocumentController.prototype._afterPropertiesChangeEvent = function (event) {
                if (!event.temporary) {
                    const checkBlendModeProperty = (checkBlendModeProperty) => {
                        if (this.hasCDR() && !event.node.hasMixin(GObject.GAnnotation) && event.properties.includes(checkBlendModeProperty)) {
                            const value = event.node.getProperty(checkBlendModeProperty);
                            value && value !== GObject.GPaintCanvas.BlendMode.Normal && GSystemDialog.showCDRUnsupportedObjectWarning();
                        }
                    };
                    if (
                        (event.node instanceof GObject.GStylable.PaintLayer
                            ? (this._handlePropertiesChangedForDocumentColorsElement(event.node, ["_pt"], event.properties, event.values), checkBlendModeProperty("_bl"))
                            : (event.node.hasMixin(GObject.GStylable) && checkBlendModeProperty("_sbl"),
                              event.node instanceof GObject.GText &&
                                  this._handlePropertiesChangedForDocumentColorsElement(event.node, ["content"], event.properties, event.values)),
                        !gDesigner.isEnabledProFeatures())
                    ) {
                        -1 !== event.properties.indexOf("lkt") &&
                            (0, Utils.isSymbolInstance)(event.node) &&
                            (event.node instanceof GObject.GSymbol
                                ? event.node.acceptChildren((element) => element instanceof GObject.GElement && element.setFlag(GObject.GElement.Flag.FullLocked))
                                : event.node.setFlag(GObject.GElement.Flag.FullLocked));
                    }
                }
            }),
            (GDocumentController.prototype._afterFlagChangeEvent = function (event) {
                const node = event.node;
                event.flag === GObject.GNode.Flag.Selected && node instanceof GObject.GCollabText && gDesigner.stats("document_canvas_select-collab-text");
            }),
            (GDocumentController.prototype._licenseChangedEvent = function () {
                this._updateSymbolLock(this._scene);
            }),
            (GDocumentController.prototype.lock = function () {}),
            (GDocumentController.prototype.unlock = function () {}),
            (GDocumentController.prototype.isLocked = function () {
                return false;
            }),
            (GDocumentController.prototype.lockByVersionHistory = function () {
                this._lockedByVersionHistory = true;
            }),
            (GDocumentController.prototype.isLockedByVersionHistory = function () {
                return this._lockedByVersionHistory;
            }),
            (GDocumentController.prototype._updateState = function () {
                if (this._scene) {
                    if (this._editable)
                        this._scene.accept((element) => {
                            if (element instanceof GObject.GElement) {
                                element.setProperty("plkt", GObject.GBlock.ProgramLck.NoLock);
                                const lockOverride = element.getProperty("_lkt", true);
                                void 0 !== lockOverride && element.setProperty("lkt", lockOverride);
                            }
                        });
                    else if (
                        (this._scene.accept((element) => {
                            if (element instanceof GObject.GElement) {
                                (void 0 === element.getProperty("_lkt", true) && element.setProperty("_lkt", element.getProperty("lkt") || null, true),
                                    element.setProperty("lkt", GObject.GBlock.LockType.Full));
                            }
                        }),
                        this._annotationsEditable)
                    ) {
                        const lockFlags =
                            GObject.GBlock.ProgramLck.NoSizeChanges |
                            GObject.GBlock.ProgramLck.NoEdit |
                            GObject.GBlock.ProgramLck.NoMove |
                            GObject.GBlock.ProgramLck.NoOrigChildrenEdit |
                            GObject.GBlock.ProgramLck.NoNewChildren |
                            GObject.GBlock.ProgramLck.NoDelete |
                            GObject.GBlock.ProgramLck.NoDirectVisibilityChange |
                            GObject.GBlock.ProgramLck.NoSelect;
                        this._scene.iteratePages((page) => {
                            (page.acceptChildren((node) => {
                                (node instanceof GObject.GElement && node.setProperty("plkt", lockFlags),
                                    node.hasMixin(GObject.GAnnotation) &&
                                        (node.setProperty("lkt", null), node.setProperty("plkt", lockFlags & ~GObject.GBlock.ProgramLck.NoSelect)));
                            }),
                                page.setProperty("plkt", lockFlags),
                                page.setProperty("lkt", null));
                        }, true);
                    }
                    this._updateSymbolLock(this._scene);
                }
            }),
            (GDocumentController.prototype._updateSymbolLock = function (node, unlock) {
                if (!this._editable) return;
                const locked = !unlock;
                if ((node = node || this._scene)) {
                    const apply = (setter) => {
                        node.accept((node) => {
                            if ((0, Utils.isSymbolInstance)(node)) {
                                if (node instanceof GObject.GSymbol && null === node.getProperty("masterRef")) return false;
                                !(node instanceof GObject.GSymbol) && node instanceof GObject.GElement && setter(node);
                            }
                        });
                    };
                    gDesigner.isEnabledProFeatures()
                        ? this._lockedSymbolInstances &&
                          (apply((instance) => instance.setProperty("lkt", instance.getProperty("lkt"), locked, true)), (this._lockedSymbolInstances = false))
                        : (apply((instance) => {
                              (unlock
                                  ? instance.hasFlag(GObject.GElement.Flag.FullLocked) && instance.removeFlag(GObject.GElement.Flag.FullLocked)
                                  : instance.setFlag(GObject.GElement.Flag.FullLocked),
                                  instance.setProperty("_pro", locked, true));
                          }),
                          (this._lockedSymbolInstances = true));
                }
            }),
            (GDocumentController.prototype._modifiedEvent = function (event) {
                gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, this, event.data ? event.data : null));
            }),
            (GDocumentController.prototype._dropFileEvent = function (event) {
                var extension = null;
                if (event.file.name) {
                    var dotIndex = event.file.name.lastIndexOf(".");
                    dotIndex >= 0 && (extension = event.file.name.substr(dotIndex + 1));
                }
                if (!extension && event.file.type)
                    for (var o = 0; o < GDocumentController.FileTypes.length; ++o)
                        if (GDocumentController.FileTypes[o].mime === event.file.type) {
                            extension = GDocumentController.FileTypes[o].ext;
                            break;
                        }
                (gDesigner.stats("document_drop_file", extension),
                    this.placeOrImport(event.file, {
                        x: event.position.getX(),
                        y: event.position.getY(),
                    }));
            }),
            (GDocumentController.prototype._updateStatus = function (status, data) {
                status !== this._status &&
                    ((this._status = status),
                    this.hasEventListeners(GDocumentStatusEvent) && this.trigger(new GDocumentStatusEvent(status, data)),
                    FontsProviderManager.getInstance().trigger(new GDocumentStatusEvent(status, data)),
                    this._status === DocumentStatus.Loaded && this.isCommercialProductFile() && this.openPaywall());
            }),
            (GDocumentController.prototype.updateStatus = function (status, data) {
                this._updateStatus(status, data || {});
            }),
            (GDocumentController.prototype._extractUsedDocumentRef = function (ref) {
                return (ref && 0 === ref.indexOf("document://") && (ref = ref.substr("document://".length)), null);
            }),
            (GDocumentController.prototype._addDocumentColors = function (colors) {
                for (var t = 0; t < colors.length; ++t) {
                    var n = GObject.GPattern.serialize(colors[t]);
                    this._documentColors.hasOwnProperty(n) ? (this._documentColors[n] += 1) : (this._documentColors[n] = 1);
                }
            }),
            (GDocumentController.prototype._clearDocumentColors = function (colors) {
                for (var t = 0; t < colors.length; ++t) {
                    var n = GObject.GPattern.serialize(colors[t]);
                    this._documentColors.hasOwnProperty(n) && 0 == --this._documentColors[n] && delete this._documentColors[n];
                }
            }),
            (GDocumentController.prototype._updateDocumentColors = function (element, clear) {
                var paintLayers = element.getPaintLayers();
                paintLayers &&
                    GObject.GUtil.each(
                        paintLayers.getLayers(),
                        function (e, layer) {
                            clear ? this._updateDocumentColorsFromElement(layer, ["_pt"], clear) : this._updateDocumentColorsFromElement(layer, ["_pt"]);
                        }.bind(this)
                    );
            }),
            (GDocumentController.prototype._updateDocumentColorsFromGroup = function (group, clear) {
                for (var children = group.getChildren(), o = 0; o < children.length; o++) {
                    var i = children[o];
                    i instanceof GObject.GGroup || !i.hasMixin(GObject.GElement.Stylable)
                        ? this._updateDocumentColorsFromGroup(i, clear)
                        : this._updateDocumentColors(i, clear);
                }
            }),
            (GDocumentController.prototype._updateDocumentColorsFromElement = function (element, propertyNames, clear) {
                for (var colors = [], i = 0; i < propertyNames.length; ++i) {
                    var r = element.getProperty(propertyNames[i]);
                    if (r) {
                        var s = function (value, isTopLevel, index) {
                            if (value instanceof GObject.GColor) colors.push(value);
                            else if (value instanceof GObject.GGradient) for (var l = value.getStops(), c = 0; c < l.length; ++c) colors.push(l[c].color);
                            else if ("content" === propertyNames[index] && element instanceof GObject.GText && isTopLevel) {
                                var richContent = element.getTLCore().getRichContent();
                                if (richContent && richContent.length) {
                                    var fontColor = element._getGravitValue("fontColor", richContent[0].fontColor);
                                    s(fontColor, false, index);
                                }
                            }
                        };
                        s(r, true, i);
                    }
                }
                colors.length && (clear ? this._clearDocumentColors(colors) : this._addDocumentColors(colors));
            }),
            (GDocumentController.prototype._handlePropertiesChangedForDocumentColorsElement = function (element, propertyNames, changedProperties, oldValues) {
                for (var changedIndexes = [], changedProps = [], colors = [], l = 0; l < propertyNames.length; ++l) {
                    var c = changedProperties.indexOf(propertyNames[l]);
                    if (c >= 0) {
                        (changedIndexes.push(c), changedProps.push(propertyNames[l]));
                        var d = function (value, isTopLevel, index) {
                            if (value instanceof GObject.GColor) colors.push(value);
                            else if (value instanceof GObject.GGradient) for (var stops = value.getStops(), l = 0; l < stops.length; ++l) colors.push(stops[l].color);
                            else if ("content" === changedProperties[index] && element instanceof GObject.GText && value && isTopLevel) {
                                var parsedValue = JSON.parse(value);
                                if (parsedValue[0] && parsedValue[0].fontColor) {
                                    var fontColor = element._getGravitValue("fontColor", parsedValue[0].fontColor);
                                    d(fontColor, false, index);
                                }
                            }
                        };
                        d(oldValues[c], true, c);
                    }
                }
                (colors.length && this._clearDocumentColors(colors), changedProps.length && this._updateDocumentColorsFromElement(element, changedProps));
            }),
            (GDocumentController.prototype.setSynchronizing = function (syncing) {
                syncing !== this._synchronizing &&
                    ((this._synchronizing = syncing),
                    gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.SynchronismUpdated, this)));
            }),
            (GDocumentController.prototype.isSynchronizing = function () {
                return this._synchronizing;
            }),
            (GDocumentController.prototype.setErrored = function (errored) {
                errored !== this._errored &&
                    ((this._errored = !!errored), gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, this)));
            }),
            (GDocumentController.prototype.buildPreview = function () {
                return new Promise((resolve) => {
                    for (var page = null, node = this._scene.getFirstChild(); null !== node; node = node.getNext())
                        if (node instanceof GObject.GPage) {
                            page = node;
                            break;
                        }
                    if (page) {
                        var bitmapArea = page._getBitmapPaintArea(),
                            scale = GExporters.GBitmapExport.convertSizeToScale(
                                bitmapArea.getWidth(),
                                bitmapArea.getHeight(),
                                bitmapArea.getWidth() > bitmapArea.getHeight() ? "600w" : "600h"
                            );
                        page.toBitmap(scale.getX(), scale.getY(), 2, GObject.GRGBColor.WHITE).toImageBlob("image/jpeg", resolve);
                    }
                });
            }),
            (GDocumentController.prototype.hasPagesWithInfiniteEmptyCanvas = function () {
                for (var page = this._scene.getFirstChild(); null !== page; page = page.getNext())
                    if (page instanceof GObject.GPage && !page.getGeometryBBox()) return true;
                return false;
            }),
            (GDocumentController.prototype.setReservedId = function (id) {
                this._reservedId = id;
            }),
            (GDocumentController.prototype.getReservedId = function () {
                return this._reservedId;
            }),
            (GDocumentController.prototype.getLastDownloadSize = function () {
                return this._lastDownloadSize;
            }),
            (GDocumentController.prototype.setLastDownloadSize = function (size) {
                this._lastDownloadSize = size;
            }),
            (GDocumentController.waitToRendererProcess = defer));
        var z,
            shapeEqualityProperties = Object.keys(GObject.GShape.GeometryProperties)
                .concat(Object.keys(GObject.GShape.MetaProperties))
                .concat(Object.keys(GObject.GItem.MetaProperties))
                .concat(Object.keys(GObject.GBlock.VisualProperties))
                .concat(Object.keys(GObject.GBlock.MetaProperties))
                .concat(Object.keys(GObject.GElement.Anchor.MetaProperties));
        function canMergeNodes(nodeA, nodeB) {
            if (nodeA.constructor !== nodeB.constructor) return false;
            if (!(nodeA instanceof GObject.GShape)) return false;
            if (!nodeB.getFirstChild()) return false;
            if (!nodeA.arePropertiesEqual(nodeB, shapeEqualityProperties)) return false;
            var savedStylePropertySets = nodeB.$ps;
            return (
                (nodeB.$ps = nodeA.getStylePropertySets()),
                GObject.GStylable.prototype.equalsStyle.call(nodeA, nodeB) ? ((nodeB.$ps = savedStylePropertySets), true) : ((nodeB.$ps = savedStylePropertySets), false)
            );
        }
        function haveEqualGeometry(nodeA, nodeB) {
            if (!nodeA.arePropertiesEqual(nodeB, Object.keys(GObject.GPath.GeometryProperties))) return false;
            for (
                var anchorPointProperties = Object.keys(GObject.GPathBase.AnchorPoint.GeometryProperties),
                    anchorPointsA = nodeA.getAnchorPoints(),
                    anchorPointsB = nodeB.getAnchorPoints(),
                    anchorA = anchorPointsA.getFirstChild(),
                    anchorB = anchorPointsB.getFirstChild();
                anchorA && anchorB;
                anchorA = anchorA.getNext(), anchorB = anchorB.getNext()
            )
                if (!anchorA.arePropertiesEqual(anchorB, anchorPointProperties)) return false;
            return null === anchorA && null === anchorB;
        }
        function mergeDuplicateSiblings(node) {
            node._blockUpdateChanges();
            let child = node.getFirstChild();
            for (; child; ) {
                var n = child.getNext();
                if (n) {
                    if (!canMergeNodes(child, n)) {
                        child = n;
                        continue;
                    }
                    if (!(child instanceof GObject.GPath)) {
                        child = n;
                        continue;
                    }
                    if (!haveEqualGeometry(child, n)) {
                        child = n;
                        continue;
                    }
                    (node.removeChild(n), child._blockUpdateChanges());
                    for (var o = n.getFirstChild(); null !== o; o = o.getNext()) (n.removeChild(o), child.appendChild(o));
                    (child._releaseUpdateChanges(), z++);
                } else child = n;
            }
            for (child = node.getFirstChild(); null !== child; child = child.getNext()) mergeDuplicateSiblings(child);
            node._releaseUpdateChanges();
        }
        var fontProvider = {
            queryFirst: function (fontDescriptor, callback) {
                const editDistance = (strA, strB) => {
                    let n,
                        o,
                        i,
                        a,
                        r,
                        s,
                        l,
                        c,
                        d,
                        u,
                        p,
                        g = strA.length,
                        h = strB.length;
                    if (0 === g) return h;
                    if (0 === h) return g;
                    for (g > h && ((n = strA), (strA = strB), (strB = n)), s = new Int8Array(g + 1), o = 0; o <= g; o++) s[o] = o;
                    for (o = 1; o <= h; o++) {
                        for (a = o, p = strB[o - 1], i = 1; i <= g; i++)
                            (p === strA[i - 1]
                                ? (r = s[i - 1])
                                : ((l = a + 1),
                                  (c = s[i] + 1),
                                  (d = l - ((l - c) & ((c - l) >> 7))),
                                  (u = s[i - 1] + 1),
                                  (r = d - ((d - u) & ((u - d) >> 7)))),
                                (s[i - 1] = a),
                                (a = r));
                        s[g] = a;
                    }
                    return s[g];
                };
                var o = 0,
                    i = [];
                (fontDescriptor.fontName && i.push(fontDescriptor.fontName), i.length ? i[0] !== fontDescriptor.fontFamily && i.push(fontDescriptor.fontFamily) : i.push(fontDescriptor.fontFamily));
                var handleProviderResponse = function (response) {
                    var matchedFont;
                    response.faces.length
                        ? ((matchedFont = (function (faces) {
                              var candidate = {
                                      family: faces[0].fonts[0].family || faces[0].family,
                                      weight: faces[0].fonts[0].weight,
                                      style: faces[0].fonts[0].style,
                                  },
                                  targetFamily = fontDescriptor.fontName || fontDescriptor.fontFamily || gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily(),
                                  a = editDistance(candidate.family, targetFamily),
                                  r = 0,
                                  s = candidate.family;
                              for (let e = 0; e < faces.length; e++) {
                                  var l = faces[e];
                                  let o;
                                  if (l.families)
                                      for (var c = 0; c < l.families.length; c++)
                                          ((o = editDistance(l.families[c], targetFamily)), o < a && ((a = o), (r = e), (s = l.families[c])));
                                  else ((o = editDistance(l.family, targetFamily)), o < a && ((a = o), (r = e), (s = l.family)));
                              }
                              candidate = null;
                              var bestFace = faces[r];
                              for (let t = 0; t < bestFace.fonts.length; t++) {
                                  var u = bestFace.fonts[t];
                                  if (!u.family || u.family === s) {
                                      if (u.style === fontDescriptor.fontStyle && u.weight === fontDescriptor.fontWeight) {
                                          candidate = {
                                              family: u.family || bestFace.family,
                                              weight: u.weight,
                                              style: u.style,
                                          };
                                          break;
                                      }
                                      candidate ||
                                          (candidate = {
                                              family: u.family || bestFace.family,
                                              weight: u.weight,
                                              style: u.style,
                                          });
                                  }
                              }
                              return candidate;
                          })(response.faces)),
                          callback(matchedFont))
                        : o < i.length - 1
                          ? (o++, setTimeout(() => FontsProviderManager.getInstance().query(handleProviderResponse, i[o])))
                          : callback(null);
                };
                FontsProviderManager.getInstance().query(handleProviderResponse, i[o]);
            },
        };
        module.exports = GDocumentController;
    };
