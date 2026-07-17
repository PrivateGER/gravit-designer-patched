module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(596 /* polyfill:Array */), require(328 /* polyfill:Array */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(34), require(4), require(41), require(13), require(32), require(38), require(97), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GContainer = _interopRequireDefault(require(85 /* GContainer */)),
            GFilesPanelConstants = require(858),
            GDrive = _interopRequireDefault(require(802 /* CloudDrive */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            Utils = require(40),
            GUser = _interopRequireDefault(require(177 /* GUser */)),
            designerConfig = require(10),
            AppError = _interopRequireDefault(require(355)),
            configBase = require(519);
        const GFolderView = require(1548),
            GUserPreview = require(1166),
            GFileDetailRenderer = require(1549),
            GFileDetailEvent = require(1174);
        let clearSelectionClickHandler = null;
        const FilesPanelViewBase = function (panel, filesPanel) {
            ((this.panel = panel),
                (this.filesPanel = filesPanel),
                (this._cloudFolders = []),
                (this._permissions = [FilesPanelViewBase.Permission.CreateFolder, FilesPanelViewBase.Permission.RecentFilesShowMore]),
                (this._bindedHandleShortcut = this.handleShortcut.bind(this)),
                gDesigner.getUser().then((user) => {
                    this._user = user;
                }),
                (this._isLoadingFolders = false),
                ((gContainer.getRuntime() === GContainer.default.Runtime.Electron &&
                    GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.Windows) ||
                    GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.Unix) &&
                    this.panel.closest(".g-dialog-container").addClass("cross-controls"));
        };
        ((FilesPanelViewBase.prototype.filesPanel = null),
            (FilesPanelViewBase.prototype._cloudFolders = null),
            (FilesPanelViewBase.prototype._isLoadingFolders = false),
            (FilesPanelViewBase.prototype._fileInfoPanel = null),
            (FilesPanelViewBase.prototype._rightSide = null),
            (FilesPanelViewBase.prototype._user = null),
            (FilesPanelViewBase.prototype._contextMenu = null),
            (FilesPanelViewBase.prototype._downloadContextMenu = null),
            (FilesPanelViewBase.prototype._fileInfoPanelIsOpen = false),
            (FilesPanelViewBase.prototype._fileTypeFilterButton = null),
            (FilesPanelViewBase.prototype._sortButton = null),
            (FilesPanelViewBase.prototype._loadFoldersOnDemand = async function () {
                if (!this._isLoadingFolders) {
                    this._isLoadingFolders = true;
                    try {
                        const loadPromises = this._cloudFolders
                            .filter((folderNode) => folderNode.isStateOpen() && !folderNode.isDone())
                            .map((folderNode) =>
                                folderNode.loadChildrenOnDemand((folder, limit, offset) =>
                                    this.filesPanel.drive
                                        .fetchFolders(this.filesPanel.getSort(), folder, limit, offset)
                                        .then((t) => t.map((t) => this._factoryFolder(t, folderNode)))
                                )
                            );
                        loadPromises.length && (await Promise.all(loadPromises));
                    } finally {
                        this._isLoadingFolders = false;
                    }
                }
            }),
            (FilesPanelViewBase.prototype._factoryFolder = function (folder, parentNode) {
                var self = this;
                folder = this.filesPanel.updateCloudItemForUserPermission(folder);
                var isSelected = this.filesPanel.isItemSelected(folder),
                    isInClipboard = this.filesPanel.isItemInClipboard(folder),
                    childrenRefreshed = false,
                    folderView = new GFolderView(folder, parentNode, this.filesPanel.drive.isRootFolder(folder))
                        .onClick((clickedFolder, element) => {
                            (GPlatform.GPlatform.modifiers.metaKey
                                ? this.filesPanel.manageSelection(clickedFolder, element)
                                : this.filesPanel.drive.getCurrentFolder() !== clickedFolder &&
                                  (this.filesPanel.handleFolderClick(clickedFolder, element),
                                  "shared_files_with_me" === clickedFolder.id ? this.hideFileTypeFilterButton() : this.displayFileTypeFilterButton()),
                                self._closeFileInfoPanel());
                        })
                        .onDoubleClick(() => {
                            folderView.getChildren() && folderView.getChildren().length ? folderView.toggleState() : loadChildren().then(() => folderView.toggleState());
                        })
                        .onContext(function (e, element, contextEvent) {
                            (gDesigner.stats("filespanel-view_context_cloudfolder"),
                                self.resetSelection(),
                                self._addToSelection(element),
                                self._openContextMenuForEventPosition(contextEvent));
                        })
                        .onFileDrop((droppedItem, targetFolder) => {
                            this.filesPanel.performFileMove(droppedItem, targetFolder);
                        })
                        .setRefreshHandler(loadChildren)
                        .onFolderStateClick(() => {
                            loadChildren().then(() => {
                                if ((folderView.toggleState(), !folderView.isRootFolder() && !childrenRefreshed && folderView.isStateOpen())) {
                                    var childFolders = folderView.getChildren();
                                    childFolders && childFolders.length && ((childrenRefreshed = true), childFolders.forEach((child) => child.refresh()));
                                }
                            });
                        });
                this._cloudFolders.push(folderView);
                const isRoot = this.filesPanel.drive.isRootFolder(folder),
                    parentIsRoot = parentNode && this.filesPanel.drive.isRootFolder(parentNode.getFolder());
                var loadPromise;
                function loadChildren() {
                    return folderView.isLoading() || (folderView.getChildren() && folderView.getChildren().length)
                        ? loadPromise || Promise.resolve()
                        : (folderView.setLoading(true),
                          (loadPromise = self.filesPanel.drive
                              .fetchFolders(self.filesPanel.getSort(), folder)
                              .then((children) => {
                                  (folderView.setLoading(false), folderView.setChildren(children.map((childFolder) => self._factoryFolder(childFolder, folderView))), folderView.update());
                                  const currentFolder = self.filesPanel.drive.getCurrentFolder();
                                  if ((currentFolder && "id" in currentFolder && currentFolder.id === folder.id) || currentFolder === folder) {
                                      self.manageOpenFolder(null, folder, folderView);
                                      let ancestorNode = folderView;
                                      do {
                                          ancestorNode.isStateOpen() || ancestorNode.toggleState();
                                      } while ((ancestorNode = ancestorNode.getParent()));
                                  }
                              })
                              .catch((error) => (console.log(error && error.stack, error), self.toggleLoading(false), folderView.setLoading(false), Promise.reject(error)))));
                }
                return (
                    (isRoot || parentIsRoot || this.filesPanel.drive.containsInPreviousPath(folder)) &&
                        (isRoot && this.filesPanel.drive.resetPreviousSelectedFolderPath(),
                        this.filesPanel.drive.removeLoadedFolderFromPreviousPath(folder),
                        loadChildren()),
                    isRoot && folderView.toggleState(),
                    folderView
                        .getHTMLElement()
                        .addClass(isSelected ? "selected" : "")
                        .addClass(isInClipboard ? "cut" : ""),
                    folderView
                );
            }),
            (FilesPanelViewBase.prototype.navigateToFolder = async function (folder) {
                try {
                    const drive = this.filesPanel.drive;
                    (this.toggleLoading(true), (folder = "string" == typeof folder ? await drive.getFolder(folder) : folder));
                    var revealFolderNode = async (targetFolder, revealFolderNode) => {
                        this.filesPanel.navigateToFolder(targetFolder);
                        for (
                            var targetNode = this._cloudFolders.find((node) => node.getFolder().id === targetFolder.id), o = 0;
                            !(targetNode || (await (0, Utils.sleep)(100), (targetNode = this._cloudFolders.find((node) => node.getFolder().id === targetFolder.id)), ++o > 30));

                        );
                        if ((this.manageOpenFolder(null, targetFolder, targetNode), targetNode)) {
                            var container = targetNode.getHTMLContainer();
                            (0 === container[0].offsetTop && revealFolderNode && (container = revealFolderNode.getHTMLContainer()),
                                setTimeout(() => {
                                    this.panel.find(".g-left-side").animate({ scrollTop: $(container).position().top }, 150);
                                }));
                        }
                    };
                    if (
                        (folder.family === designerConfig.EXTERNAL_APP.ONEDRIVEBUSINESS && (drive.isRootFolder(folder) || drive.isRootFolder(folder.parent))) ||
                        drive.isRootFolder(folder.relativeUrl ? folder.relativeUrl : folder.parent)
                    )
                        revealFolderNode(folder);
                    else {
                        for (var reachedRoot, path = [folder], currentFolder = folder, notFoundFlag = false; !reachedRoot; )
                            if (
                                (currentFolder = await drive
                                    .getFolder(currentFolder.parent)
                                    .catch((error) => (error.status === designerConfig.gApi.HTTP_STATUS_CODES.NOT_FOUND && currentFolder.id === folder.id && (notFoundFlag = true), null)))
                            ) {
                                if ((path.push(currentFolder), path.length > configBase.MAX_FOLDER_DEPTH_FOR_CLOUD))
                                    return Promise.reject(designerConfig.gApi.HTTP_STATUS_CODES.NOT_FOUND);
                                drive.isRootFolder(currentFolder.parent) && (reachedRoot = true);
                            } else {
                                if (notFoundFlag) return Promise.reject(designerConfig.gApi.HTTP_STATUS_CODES.NOT_FOUND);
                                reachedRoot = true;
                            }
                        var orderedPath = path.reverse(),
                            levelNodes = this._cloudFolders,
                            currentPathFolder = null,
                            previousPathFolder = null,
                            matchedNode = null;
                        for (currentPathFolder = previousPathFolder = orderedPath.shift(); currentPathFolder; ) {
                            matchedNode = levelNodes.find((node) => node.getFolder().id === currentPathFolder.id);
                            for (var g = 0; !(matchedNode || (await (0, Utils.sleep)(100), (matchedNode = levelNodes.find((node) => node.getFolder().id === currentPathFolder.id)), ++g > 300)); );
                            matchedNode
                                ? (await matchedNode.refresh(), (levelNodes = matchedNode.getChildren()), matchedNode.toggleState(), (currentPathFolder = orderedPath.shift()) ? (previousPathFolder = currentPathFolder) : revealFolderNode(previousPathFolder, matchedNode))
                                : (currentPathFolder = null);
                        }
                    }
                    this.toggleLoading(false);
                } catch (error) {
                    return (this.toggleLoading(false), error);
                }
            }),
            (FilesPanelViewBase.prototype.relayout = function () {
                this.initLayout(true);
            }),
            (FilesPanelViewBase.prototype.hasPermission = function (permission) {
                return this._permissions.includes(permission);
            }),
            (FilesPanelViewBase.prototype._handleDriveEvent = function (event) {
                event.type === GDrive.default.DriveEvent.Type.FileDeleted &&
                    this._getFileInfoPanelFileId() === event.data.id &&
                    this._closeFileInfoPanel();
            }),
            (FilesPanelViewBase.prototype._getFileInfoPanelFileId = function () {
                return $(".g-file-detail-container").data("fileId");
            }),
            (FilesPanelViewBase.prototype._registerDriveEvent = function () {
                gDesigner.addEventListener(GDrive.default.DriveEvent, this._handleDriveEvent, this);
            }),
            (FilesPanelViewBase.prototype.initLayout = function (isRelayout) {
                (window.addEventListener("keydown", this._bindedHandleShortcut, true), this._registerDriveEvent());
                var self = this;
                ("native" === this.filesPanel.getCloudSettingsById(this.filesPanel.getCurrentDriveId()).type &&
                    this.panel.addClass("native-cloud"),
                    isRelayout && (this.panel.off("click", clearSelectionClickHandler), this.panel.empty()),
                    this.createTopBar(this.filesPanel.getUser()),
                    this.panel.find(".g-files-top-buttons").toggleClass("g-cdgs", !this.filesPanel.getUISettings().dialogControls),
                    this.panel.find(".g-files-top-account").toggleClass("g-cdgs", !this.filesPanel.getUISettings().dialogControls));
                var itemsContainer = $("<div />").addClass("g-items-container");
                this.addSearchBar(itemsContainer);
                var mainContainer = $("<div />").addClass("g-main").appendTo(itemsContainer);
                const loadMoreOnScroll = (0, Utils.throttle)(this._loadFoldersOnDemand.bind(this), 100);
                let lastScrollTop = 0;
                var leftSide = $("<div />")
                    .addClass("g-left-side")
                    .scroll((event) => {
                        if (self.filesPanel.drive.isLoadFoldersOnDemandSupported()) {
                            const scrollTop = $(event.target).scrollTop();
                            (scrollTop > lastScrollTop && loadMoreOnScroll(), (lastScrollTop = scrollTop));
                        }
                    })
                    .appendTo(mainContainer);
                ((this._rightSide = $("<div />")
                    .addClass("g-right-side")
                    .on("contextmenu", (event) => {
                        (self.resetSelection(), self._openContextMenuForEventPosition(event));
                    })
                    .appendTo(mainContainer)),
                    (this._fileInfoPanel = FilesPanelViewBase._createFileInfoPanel()),
                    this._fileInfoPanel.appendTo(mainContainer));
                var mainFoldersList = $("<div />").addClass("g-folders-list").addClass("main"),
                    customFoldersList = $("<div />").addClass("g-folders-list").addClass("fixed-bottom").addClass("custom-folders"),
                    filesList = $("<div/>").addClass("g-files-list"),
                    emptyPanel = $("<div/>").addClass("g-empty-panel").hide();
                const exampleFilesList = $("<div/>").addClass("g-example-files-list").hide(),
                    recentFilesList = $("<div/>").addClass("g-recent-files-list");
                ((clearSelectionClickHandler = function (event) {
                    (event.stopPropagation(),
                        self.filesPanel.getSelection().length &&
                            (self.resetSelection(), self._updateFileInfoPanel(null), gDesigner.stats("filespanel-view_clear_selection")));
                }),
                    this.panel.on("click", clearSelectionClickHandler));
                const loadMoreFiles = (0, Utils.debounce)(() => this.filesPanel.buildDepth(false, false), 100);
                ($(this._rightSide).scroll(
                    function (event) {
                        var scrollTarget = $(event.currentTarget);
                        Math.floor(scrollTarget[0].scrollHeight - scrollTarget.scrollTop()) === Math.floor(scrollTarget.outerHeight()) && $(filesList).children().length > 0 && loadMoreFiles();
                    }.bind(this)
                ),
                    this.createHeader(this.panel),
                    itemsContainer.appendTo(this.panel),
                    mainFoldersList.appendTo(leftSide),
                    customFoldersList.appendTo(leftSide),
                    $("<div />")
                        .addClass("g-files-top-line g-recent-files")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.title-recent-files")))
                        .appendTo(this._rightSide),
                    emptyPanel.appendTo(this._rightSide),
                    exampleFilesList.appendTo(this._rightSide),
                    recentFilesList.appendTo(this._rightSide));
                const allFilesSeparator = $("<div />")
                    .addClass("g-files-top-line g-all-files")
                    .addClass("g-recent-files-separator")
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.title-all-files")))
                    .hide()
                    .appendTo(this._rightSide);
                (this.hasPermission(FilesPanelViewBase.Permission.RecentFilesShowMore) &&
                    allFilesSeparator.append(
                        $("<div />")
                            .addClass("g-recent-files-show-more")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.show-more")))
                            .on("click", function () {
                                (recentFilesList.addClass("extended-list"), $(this).hide(), self.updateLayout());
                            })
                            .on("mouseover", function (event) {
                                (event.stopPropagation(), event.preventDefault());
                            })
                    ),
                    filesList.appendTo(this._rightSide),
                    this.createFooter(this.filesPanel.getDefaultFilename()),
                    this._permissionChanged());
            }),
            (FilesPanelViewBase.prototype.updateLayout = function () {
                const filesListElement = this.panel.find(".g-files-list");
                if (filesListElement.hasClass("list-view")) {
                    const t = (listElement, t) => {
                        let n, o, i;
                        (({ columnsAmount: o, total: n, totalRows: i } = this._getGridData(listElement)), t && listElement.css("max-height", ""));
                        const isExtended = listElement.hasClass("extended-list");
                        if (!n) return void listElement.addClass("single-row");
                        if (!o || isNaN(o)) return;
                        const maxRows = isExtended ? 6 : 2;
                        (t && !isExtended && i > 2
                            ? this.panel.find(".g-recent-files-show-more").show()
                            : this.panel.find(".g-recent-files-show-more").hide(),
                            t && i > maxRows && (i = maxRows),
                            1 === i ? listElement.addClass("single-row") : listElement.removeClass("single-row"),
                            listElement.find(".g-gravit-file").each(function (index) {
                                1 !== i &&
                                    $(this).toggleClass(
                                        "last-row-file",
                                        (function (index) {
                                            return index >= (i - 1) * o;
                                        })(index)
                                    );
                            }));
                    };
                    (t(filesListElement), t(this.panel.find(".g-recent-files-list"), true));
                } else {
                    const recentFilesListElement = this.panel.find(".g-recent-files-list"),
                        isExtended = recentFilesListElement.hasClass("extended-list"),
                        { totalRows, firstHeight } = this._getGridData(recentFilesListElement);
                    if (totalRows > 1 && !isExtended) {
                        const maxHeight = firstHeight + 10;
                        recentFilesListElement.css("max-height", maxHeight + "px");
                    } else recentFilesListElement.css("max-height", "1000px");
                }
                this._updateContextMenu();
            }),
            (FilesPanelViewBase.prototype._updateContextMenu = function () {
                this._setContextMenuActiveRangeSize();
            }),
            (FilesPanelViewBase.prototype._getGridData = function (container) {
                const items = container.find(".g-gravit-file"),
                    total = items.length,
                    itemWidth = items.eq(0).width(),
                    itemHeight = items.eq(0).height();
                let columnsAmount = 1;
                itemWidth && !isNaN(itemWidth) && (columnsAmount = Math.floor(container.width() / itemWidth));
                return {
                    total: total,
                    totalRows: total % columnsAmount > 0 ? Math.floor(total / columnsAmount) + 1 : Math.floor(total / columnsAmount),
                    columnsAmount: columnsAmount,
                    firstHeight: itemHeight,
                };
            }),
            (FilesPanelViewBase.prototype.toggleLoading = function (isLoading) {
                isLoading
                    ? this.panel.closest(".g-dialog-content").find(".cloud-frame").addClass("loading")
                    : this.panel.closest(".g-dialog-content").find(".cloud-frame").removeClass("loading");
            }),
            (FilesPanelViewBase.prototype.toggleRecentFiles = function (show) {
                const rightSide = this.panel.find(".g-right-side");
                rightSide.toggleClass("g-show-recent-files", !!show);
                const showAllFiles = !rightSide.find(".g-files-list").is(":empty") && !!show;
                rightSide.find(".g-all-files").toggle(showAllFiles);
                const showRecentFiles = !rightSide.find(".g-recent-files-list").is(":empty") && !!show;
                (rightSide.find(".g-recent-files").toggle(showRecentFiles), this.panel.find(".g-recent-files-separator").toggle(showRecentFiles));
            }),
            (FilesPanelViewBase.prototype.toggleFolders = function (show) {
                this.panel.toggleClass("full-width", !!show);
                (this.panel.find(".g-left-side").toggleClass("g-no-display", !show),
                    this.panel.closest(".cloud-dialog").toggleClass("no-folders", !show));
            }),
            (FilesPanelViewBase.prototype.createTopBar = function (user) {
                let isUpdate = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    isDefaultVariant = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                user = new GUser.default(user);
                var cloudSettings = this.filesPanel.getCloudSettings(),
                    currentCloudSettings = this.filesPanel.getCloudSettingsById(this.filesPanel.getCurrentDriveId()),
                    self = this,
                    topBar = $("<div />")
                        .addClass("g-files-top-bar")
                        .addClass(isDefaultVariant ? "default" : "")
                        .append(
                            $("<div />")
                                .addClass("g-files-top-buttons")
                                .append(
                                    $("<div />")
                                        .addClass("g-button")
                                        .addClass("cloud-button")
                                        .addClass("maximize-button")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.maximize-window")))
                                        .on("click", (event) => {
                                            (event.stopPropagation(), this.filesPanel.handleMaximizePanel());
                                        })
                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-maximize-dialog"))
                                )
                                .append(
                                    $("<div />")
                                        .addClass("g-button")
                                        .addClass("cloud-button")
                                        .addClass("minimize-button")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.minimize-window")))
                                        .css("display", "none")
                                        .on("click", (event) => {
                                            (event.stopPropagation(), this.filesPanel.handleMinimizePanel());
                                        })
                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-minimize-dialog"))
                                )
                                .append(
                                    $("<div/>")
                                        .addClass("g-button")
                                        .addClass("cloud-button")
                                        .addClass("close-button")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.close-window")))
                                        .on("click", (event) => {
                                            (event.stopPropagation(), this.filesPanel.handleClosePanel());
                                        })
                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-close"))
                                )
                        )
                        .append(
                            $("<div />")
                                .addClass("g-files-top-account")
                                .append($("<div />").addClass("g-files-top-account-name").html(user.getUserReference()))
                                .append(new GUserPreview(user).build().addClass("g-files-top-avatar"))
                        );
                if ((isUpdate ? this.panel.find(".g-files-top-bar").replaceWith(topBar) : topBar.appendTo(this.panel), isDefaultVariant))
                    return void this._createRefreshButton(topBar, isDefaultVariant);
                var cloudMenu = $("<div />")
                    .addClass("g-files-top-cloud-menu")
                    .append($("<div />").addClass("g-files-top-cloud-menu-icon"))
                    .on("click", function () {
                        (self._cloudPane(this), gDesigner.stats("filespanel-view_open_cloud-pane"));
                    })
                    .appendTo(topBar);
                switch (currentCloudSettings.type) {
                    case "sharepoint":
                    case "sharepoint-native":
                        cloudMenu.addClass("sharepoint").append($("<div />").addClass("g-files-top-cloud-menu-name").text(currentCloudSettings.name));
                        break;
                    case "onedrivebusiness":
                    case "onedrivebusiness-native":
                        cloudMenu.addClass("onedrivebusiness").append($("<div />").addClass("g-files-top-cloud-menu-name").text(currentCloudSettings.name));
                        break;
                    case "googledrive-native":
                    case "googledrive":
                        cloudMenu.addClass(currentCloudSettings.className).append($("<div />").addClass("g-files-top-cloud-menu-name").text(currentCloudSettings.name));
                        break;
                    default:
                        cloudMenu.addClass("gravit-cloud");
                }
                (cloudSettings && 0 !== cloudSettings.length) ||
                    topBar.append(
                        $("<div />")
                            .addClass("g-files-top-add-cloud-account-button")
                            .append(
                                $("<div />")
                                    .addClass("icon-container")
                                    .append($("<span />").addClass("icon").addClass("gravit-icon-plus-add"))
                            )
                            .append(
                                $("<div />")
                                    .addClass("text")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.connect-cloud-drive")))
                            )
                            .on(
                                "click",
                                function () {
                                    this._newCloudAccountDialog();
                                }.bind(this)
                            )
                    );
                const driveActions = this.filesPanel.drive.getActions();
                (driveActions &&
                    driveActions.length &&
                    driveActions.forEach((action) => {
                        let { title, icon, execute } = action;
                        return $("<div/>")
                            .addClass("g-files-top-cloud-refresh-content")
                            .append(
                                $("<div/>")
                                    .addClass("container")
                                    .append(icon ? $("<div/>").addClass("icon").addClass(icon) : "")
                                    .append($("<div/>").addClass("text").text(title))
                            )
                            .appendTo(topBar)
                            .click(() => {
                                (gDesigner.stats("filespanel-view_execute_action", title),
                                    execute(this.filesPanel.getContextSource()).catch((error) => {
                                        "string" == typeof error ? GSystemDialog.default.alert(error) : console.error(error);
                                    }));
                            });
                    }),
                    this._createRefreshButton(topBar, isDefaultVariant));
            }),
            (FilesPanelViewBase.prototype.updateTopBar = function () {
                this.createTopBar(this.filesPanel.getUser(), true);
            }),
            (FilesPanelViewBase.prototype._createRefreshButton = function (container, isDefaultVariant) {
                $("<div/>")
                    .addClass("g-files-top-cloud-refresh-content")
                    .addClass(isDefaultVariant ? "default" : "")
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append($("<div/>").addClass("icon").addClass("gravit-icon-refresh"))
                            .append(
                                $("<div/>")
                                    .addClass("text")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.refresh-drive-content")))
                            )
                    )
                    .appendTo(container)
                    .click(() => {
                        (gDesigner.stats("filespanel-view_refresh_file-list"), this.filesPanel.updateFilesList());
                    });
            }),
            (FilesPanelViewBase.prototype._cloudPane = async function (anchorElement) {
                try {
                    var cloudSettings = this.filesPanel.getCloudSettings(),
                        pane = $("<div/>")
                            .addClass("cloud-pane")
                            .on("click", () => {
                                (gDesigner.stats("filespanel-view_close_cloud-pane"), pane.gOverlay("close"));
                            }),
                        currentCloudSettings = this.filesPanel.getCloudSettingsById(this.filesPanel.getCurrentDriveId()),
                        head = $("<div />")
                            .addClass("head")
                            .append($("<div />").addClass("cloud-pane-head-icon"))
                            .on("click", () => {
                                (gDesigner.stats("filespanel-view_close_cloud-pane"), pane.gOverlay("close"));
                            })
                            .appendTo(pane);
                    switch (currentCloudSettings.type) {
                        case "sharepoint":
                        case "sharepoint-native":
                            head.addClass("sharepoint").append($("<div />").addClass("cloud-pane-head-name").text(currentCloudSettings.name));
                            break;
                        case "googledrive":
                        case "googledrive-native":
                            head.addClass("google-drive").append($("<div />").addClass("cloud-pane-head-name").text(currentCloudSettings.name));
                            break;
                        default:
                            head.addClass("native");
                    }
                    if (cloudSettings && cloudSettings.length) {
                        for (var itemsContainer = $("<div />").addClass("items-container"), s = 0, count = cloudSettings.length; s < count; s++)
                            try {
                                var supportsCorporate,
                                    u = cloudSettings[s],
                                    p = false,
                                    h = [];
                                if (u.id === currentCloudSettings.id && (supportsCorporate = this.filesPanel.drive.supportsCorporateStorage())) {
                                    try {
                                        h = await this.filesPanel.drive.getCorporateStorages();
                                    } catch (error) {
                                        console.error(error);
                                    }
                                    p = h.length > 0;
                                }
                                ((cloudSetting) => {
                                    const itemElement = $("<div />")
                                        .addClass("item")
                                        .addClass(cloudSetting.id === this.filesPanel.getCurrentDriveId() ? "selected" : "")
                                        .addClass("cloud-".concat(cloudSetting.type))
                                        .append(
                                            $("<div />")
                                                .addClass("icon-container")
                                                .append(
                                                    $("<span />")
                                                        .addClass("icon")
                                                        .addClass((cloudSetting.className && "".concat(cloudSetting.className, "-icon")) || "")
                                                )
                                        )
                                        .append($("<div />").addClass("name").text(cloudSetting.name))
                                        .on(
                                            "click",
                                            async function () {
                                                if (cloudSetting.id !== this.filesPanel.getCurrentDriveId()) {
                                                    (gDesigner.stats("filespanel-view_open_cloud-drive", cloudSetting.name), this.toggleLoading(true));
                                                    try {
                                                        await this.filesPanel.setCloudDrive(cloudSetting);
                                                    } catch (error) {
                                                        var knownError;
                                                        (error && error instanceof AppError.default && (knownError = error),
                                                            GSystemDialog.default.alert(
                                                                knownError || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"))
                                                            ),
                                                            console.error(">>>failed to set cloud drive", error));
                                                    }
                                                }
                                                pane.gOverlay("close");
                                            }.bind(this)
                                        )
                                        .appendTo(itemsContainer);
                                    if (
                                        (supportsCorporate && p && itemElement.append($("<div />").addClass("corporate-storage-list").addClass("arrow-open-right")),
                                        cloudSetting.deletable &&
                                            itemElement.append(
                                                $("<div />")
                                                    .addClass("account-settings-container")
                                                    .append(
                                                        $("<span />")
                                                            .addClass("edit-account")
                                                            .addClass("icon")
                                                            .addClass("gravit-icon-context-icon")
                                                    )
                                                    .on("click", (event) => {
                                                        (event.preventDefault(),
                                                            event.stopPropagation(),
                                                            this._editCloudPane(cloudSetting),
                                                            gDesigner.stats("filespanel-view_open_edit-cloud-account-dialog"),
                                                            this._closeCorporateSubMenu(),
                                                            pane.gOverlay("close"));
                                                    })
                                            ),
                                        supportsCorporate && p)
                                    ) {
                                        var corporateStorage = this.filesPanel.drive.getCorporateStorage(),
                                            storageOptions = [
                                                {
                                                    default: true,
                                                    name: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.my-drive")),
                                                    active: !corporateStorage,
                                                    data: null,
                                                },
                                            ];
                                        ((storageOptions = storageOptions.concat(
                                            h.map((storage) => ({
                                                active: corporateStorage && storage.id === corporateStorage.id,
                                                default: false,
                                                name: storage.name,
                                                data: storage,
                                            }))
                                        )),
                                            this._corporateStoragesPane(itemElement, storageOptions, async (selectedStorage) => {
                                                (await this.filesPanel.drive.setCorporateStorage(selectedStorage.data),
                                                    this.filesPanel.drive.setCurrentFolder(null),
                                                    this.filesPanel.updateFilesList(),
                                                    pane.gOverlay("close"));
                                            }));
                                    } else
                                        itemElement.hover(() => {
                                            this._closeCorporateSubMenu();
                                        });
                                })(u);
                            } catch (error) {
                                console.error(error);
                            }
                        itemsContainer.appendTo(pane);
                    }
                    (cloudSettings.some((cloudSetting) => ["googledrive"].includes(cloudSetting.type)) ||
                        $("<div/>")
                            .addClass("new-item")
                            .append(
                                $("<div />")
                                    .addClass("icon-container")
                                    .append($("<span />").addClass("icon").addClass("gravit-icon-plus-add"))
                            )
                            .append(
                                $("<div />")
                                    .addClass("text-container")
                                    .append(
                                        $("<div />")
                                            .addClass("item-text")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.connect-new-cloud-drive")))
                                    )
                            )
                            .on(
                                "click",
                                function () {
                                    (this._newCloudAccountDialog(), pane.gOverlay("close"));
                                }.bind(this)
                            )
                            .appendTo(pane),
                        pane
                            .gOverlay({
                                padding: false,
                                releaseOnClose: true,
                                clazz: "cloud-pane-overlay",
                                offsetX: 10,
                                offsetY: -40,
                                closeCallback: () => {
                                    this._closeCorporateSubMenu();
                                },
                            })
                            .gOverlay("open", anchorElement, this.panel));
                } catch (e) {
                    GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")));
                }
            }),
            (FilesPanelViewBase.prototype._editCloudPane = function (cloudSetting) {
                const self = this;
                if (cloudSetting) {
                    var dialogContent = $("<div />")
                        .addClass("edit-account-dialog-content")
                        .on("keypress", function (event) {
                            13 === event.keyCode && $(this).closest(".edit-account-dialog").find(".vendor-form-save").click();
                        })
                        .append(
                            $("<div />")
                                .addClass("g-btn-close")
                                .append($("<span />").addClass("gravit-icon-close"))
                                .on("click", () => {
                                    (gDesigner.stats("filespanel-view_close_edit-cloud-account-dialog", cloudSetting.name), dialogContent.gDialog("close"));
                                })
                        )
                        .append(
                            $("<div />")
                                .addClass("title")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.edit-drive-title")))
                        )
                        .append(
                            $("<label />")
                                .append(
                                    $("<div />").text(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.add-new-account-field-name"))
                                    )
                                )
                                .append(
                                    $("<input />")
                                        .attr("type", "text")
                                        .attr("tabindex", 1)
                                        .attr("name", "name")
                                        .val(cloudSetting.name)
                                        .attr("id", "cloud-account-name")
                                )
                        )
                        .gDialog({
                            className: "edit-account-dialog",
                            closable: true,
                            buttons: [
                                $("<button />")
                                    .addClass("cloud-button")
                                    .addClass("edit-account-disconnect-button")
                                    .attr("tabindex", 4)
                                    .on("click", (event) => {
                                        (event.preventDefault(),
                                            event.stopPropagation(),
                                            gDesigner.stats("filespanel-view_disconnect_cloud-account", cloudSetting.name),
                                            self.filesPanel.deleteCloudDrive(cloudSetting).then(async () => {
                                                try {
                                                    self.filesPanel.getCurrentDriveId() === cloudSetting.id &&
                                                        (self.toggleLoading(true),
                                                        self.filesPanel.drive instanceof GDrive.default && (await self.filesPanel.drive.uninstall()),
                                                        self.filesPanel.setCloudDrive(self.filesPanel.getCloudSettingsById(1)));
                                                } catch (error) {
                                                    console.error(">>>e", error);
                                                }
                                                dialogContent.gDialog("close");
                                            }));
                                    })
                                    .text(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.button-edit-cloud-drive-disconnect"))
                                    ),
                                $("<button />")
                                    .addClass("vendor-form-cancel")
                                    .addClass("cloud-button")
                                    .attr("tabindex", 3)
                                    .on("click", function (event) {
                                        (event.preventDefault(),
                                            event.stopPropagation(),
                                            gDesigner.stats("filespanel-view_close_edit-cloud-account-dialog", cloudSetting.name),
                                            dialogContent.gDialog("close"));
                                    })
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.button-add-cloud-drive-cancel"))),
                                $("<button />")
                                    .addClass("vendor-form-save")
                                    .addClass("cloud-button")
                                    .addClass("primary")
                                    .attr("tabindex", 2)
                                    .on("click", async function (event) {
                                        (event.preventDefault(), event.stopPropagation());
                                        var nameValue = dialogContent.find("#cloud-account-name").val();
                                        let errorFields = [];
                                        (nameValue || errorFields.push("cloud-account-name"),
                                            errorFields.length
                                                ? errorFields.forEach((fieldId) => {
                                                      dialogContent.find("#".concat(fieldId)).addClass("error");
                                                  })
                                                : (gDesigner.stats("filespanel-view_save_edit-cloud-account-dialog", cloudSetting.name),
                                                  await self.filesPanel.updateCloudAccountName(cloudSetting.id, nameValue),
                                                  dialogContent.gDialog("close")));
                                    })
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.button-add-cloud-drive-save"))),
                            ],
                        });
                    (dialogContent.gDialog("open", true), dialogContent.find("#cloud-account-name").focus());
                } else console.error("vendor object is missing");
            }),
            (FilesPanelViewBase.prototype._newCloudAccountDialog = async function () {
                var self = this,
                    cloudAccountOptions = await this.filesPanel.getCreateCloudAccountOptions();
                if ((gDesigner.stats("filespanel-view_open_add-cloud-drive-account-dialog"), !(cloudAccountOptions.length < 1))) {
                    var dialog = $("<div />")
                            .append(
                                $("<div></div>")
                                    .addClass("g-btn-close")
                                    .append($("<span></span>").addClass("gravit-icon-close"))
                                    .on("click", () => {
                                        (gDesigner.stats("filespanel-view_close_new-cloud-account-dialog"), dialog.gDialog("close"));
                                    })
                            )
                            .append(
                                $("<div />")
                                    .addClass("title")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.add-new-cloud-drive")))
                            ),
                        vendorOptions = $("<div />").addClass("vendor-options");
                    dialog.gDialog({
                        releaseOnClose: true,
                        closable: true,
                        className: "g-cloud-account-options",
                    });
                    for (var a = 0, count = cloudAccountOptions.length; a < count; a++) {
                        !(function (vendorOption) {
                            vendorOptions.append(
                                $("<div />")
                                    .addClass("vendor-option")
                                    .addClass(vendorOption.pro && !gDesigner.isEnabledProFeatures() ? "pro" : "")
                                    .addClass(vendorOption.type)
                                    .append(
                                        $("<div />")
                                            .addClass("icon")
                                            .addClass((vendorOption.className && "".concat(vendorOption.className, "-icon")) || "")
                                    )
                                    .append(
                                        $("<div />")
                                            .addClass("name")
                                            .text(
                                                GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GFilesPanelViewBase", "text.connect-cloud-drive-text")
                                                ).replace("%name", vendorOption.name)
                                            )
                                    )
                                    .on("click", function () {
                                        if (vendorOption.pro && !gDesigner.isEnabledProFeatures())
                                            return (
                                                gDesigner.stats("filespanel-view_nonprotriespro_clouddriver", vendorOption.type),
                                                gDesigner.handlePROFeatureInterruption()
                                            );
                                        (dialog.gDialog("close"), self._addCloudDriveDialog(vendorOption));
                                    })
                            );
                        })(cloudAccountOptions[a]);
                    }
                    (dialog.append(vendorOptions), dialog.gDialog("open"));
                }
            }),
            (FilesPanelViewBase.prototype._addCloudDriveDialog = function (cloudSetting) {
                var self = this;
                if (cloudSetting) {
                    if ((gDesigner.stats("filespanel-view_open_add-cloud-drive-account-form-dialog", cloudSetting.type), "googledrive" === cloudSetting.type))
                        return (function (vendorConfig) {
                            let isRetry = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            return self.filesPanel.saveNewCloudAccount(vendorConfig).then(async () => {
                                try {
                                    await self.filesPanel.setCloudDrive(vendorConfig);
                                } catch (error) {
                                    return (
                                        self.filesPanel.deleteCloudDrive(vendorConfig).then(() => {
                                            if (isRetry) throw error.message;
                                            GSystemDialog.default.alert(error.message);
                                        }),
                                        Promise.reject(error)
                                    );
                                }
                            });
                        })({
                            type: "googledrive",
                            deletable: false,
                            className: "google-drive",
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewBase", "text.personal-google-drive")),
                        }).then(() => {
                            const drive = this.filesPanel.drive;
                            drive &&
                                drive.hasEventListeners(GDrive.default.DriveEvent) &&
                                drive.trigger(new GDrive.default.DriveEvent(this.filesPanel.getContextSource(), GDrive.default.DriveEvent.Type.Added));
                        });
                } else console.error("vendor object is missing");
            }),
            (FilesPanelViewBase.prototype._closeCorporateSubMenu = function () {
                this._corporateSubMenu && (this._corporateSubMenu.gOverlay("close"), (this._corporateSubMenu = null));
            }),
            (FilesPanelViewBase.prototype.updateUserDetails = function (user) {
                let userReference;
                (user instanceof GUser.default || (user = new GUser.default(user)),
                    (userReference = user.getUserReference()),
                    userReference && this.panel.find(".g-files-top-account-name").html(userReference));
            }),
            (FilesPanelViewBase.prototype._corporateStoragesPane = async function (triggerElement, storageOptions, onSelect) {
                const showPane = () => {
                    for (
                        var storagesPane = $("<div/>")
                                .addClass("corporate-storages-pane")
                                .on("click", () => {
                                    (gDesigner.stats("filespanel-view_close_corporate-storages-pane"), storagesPane.gOverlay("close"));
                                }),
                            storageContainer = $("<div />").addClass("storage-container"),
                            a = 0,
                            count = storageOptions.length;
                        a < count;
                        a++
                    ) {
                        var l = storageOptions[a];
                        (function (storage) {
                            $("<div />")
                                .addClass("item")
                                .addClass(storage.active ? "selected" : "")
                                .append($("<div />").addClass("icon-container").append($("<span />").addClass("icon")))
                                .append($("<div />").addClass("name").text(storage.name))
                                .appendTo(storageContainer)[0]
                                .addEventListener(
                                    "mousedown",
                                    () => {
                                        (storagesPane.gOverlay("close"), gDesigner.stats("filespanel-view_select_corporate-storage"), onSelect(storage));
                                    },
                                    true
                                );
                        }).call(this, l);
                    }
                    (storageContainer.appendTo(storagesPane),
                        this._closeCorporateSubMenu(),
                        triggerElement.addClass("active"),
                        storagesPane
                            .gOverlay({
                                padding: false,
                                releaseOnClose: true,
                                clazz: "cloud-corporate-storage-pane-overlay",
                                offsetX: triggerElement.outerWidth() - 11,
                                offsetY: -triggerElement.outerHeight(),
                                closeCallback: () => {
                                    (triggerElement.removeClass("active"), gContainer.getRuntime() === GContainer.default.Runtime.IPad && triggerElement.gOverlay("close"));
                                },
                            })
                            .gOverlay("open", triggerElement, this.panel),
                        (this._corporateSubMenu = storagesPane));
                };
                gContainer.getRuntime() === GContainer.default.Runtime.IPad
                    ? triggerElement.click(() => {
                          (triggerElement.gOverlay("open"), showPane());
                      })
                    : triggerElement.hover(showPane);
            }),
            (FilesPanelViewBase.prototype._sortPane = function (anchorElement) {
                var menu = $("<div/>").addClass("context-pane");
                (void 0 !== this.filesPanel.drive.SORT_TYPES.UPDATED &&
                    $("<div/>")
                        .addClass("context-button")
                        .addClass("sort-option")
                        .addClass("updated")
                        .append($("<span/>").addClass("icon"))
                        .append(
                            $("<span/>")
                                .addClass("label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.updated")))
                        )
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("filespanel-view_sort-by_cloud", GFilesPanelConstants.GFilesPanelSortTypes.UPDATED),
                                    this.filesPanel.setSortType("updated"),
                                    this.filesPanel.sort(),
                                    menu.gOverlay("close"));
                            }.bind(this)
                        )
                        .appendTo(menu),
                    void 0 !== this.filesPanel.drive.SORT_TYPES.NAME &&
                        $("<div/>")
                            .addClass("context-button")
                            .addClass("sort-option")
                            .addClass("name")
                            .append($("<span/>").addClass("icon"))
                            .append(
                                $("<span/>")
                                    .addClass("label")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.name")))
                            )
                            .on(
                                "click",
                                function () {
                                    (gDesigner.stats("filespanel-view_sort-by_cloud", GFilesPanelConstants.GFilesPanelSortTypes.NAME),
                                        this.filesPanel.setSortType("name"),
                                        this.filesPanel.sort(),
                                        menu.gOverlay("close"));
                                }.bind(this)
                            )
                            .appendTo(menu),
                    void 0 !== this.filesPanel.drive.SORT_TYPES.CREATED &&
                        $("<div/>")
                            .addClass("context-button")
                            .addClass("sort-option")
                            .addClass("created")
                            .append($("<span/>").addClass("icon"))
                            .append(
                                $("<span/>")
                                    .addClass("label")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.created")))
                            )
                            .on(
                                "click",
                                function () {
                                    (gDesigner.stats("filespanel-view_sort-by_cloud", GFilesPanelConstants.GFilesPanelSortTypes.CREATED),
                                        this.filesPanel.setSortType("created"),
                                        this.filesPanel.sort(),
                                        menu.gOverlay("close"));
                                }.bind(this)
                            )
                            .appendTo(menu),
                    $("<hr/>").appendTo(menu),
                    $("<div/>")
                        .addClass("context-button")
                        .addClass("sort-option")
                        .addClass("ascending")
                        .append($("<span/>").addClass("icon"))
                        .append(
                            $("<span/>")
                                .addClass("label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.ascending")))
                        )
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("filespanel-view_sort-type_cloud", "ascending"),
                                    this.filesPanel.setSortDirection(GFilesPanelConstants.GFilesPanelSortDirections.ASCEND),
                                    this.filesPanel.sort(),
                                    menu.gOverlay("close"));
                            }.bind(this)
                        )
                        .appendTo(menu),
                    $("<div/>")
                        .addClass("context-button")
                        .addClass("sort-option")
                        .addClass("descending")
                        .append($("<span/>").addClass("icon"))
                        .append(
                            $("<span/>")
                                .addClass("label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.descending")))
                        )
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("filespanel-view_sort-type_cloud", "descending"),
                                    this.filesPanel.setSortDirection(GFilesPanelConstants.GFilesPanelSortDirections.DESCEND),
                                    this.filesPanel.sort(),
                                    menu.gOverlay("close"));
                            }.bind(this)
                        )
                        .appendTo(menu),
                    menu
                        .gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "context-overlay",
                            offsetX: -70,
                            offsetY: 8,
                        })
                        .gOverlay("open", anchorElement, this.panel),
                    this._updateSortStates());
            }),
            (FilesPanelViewBase.prototype._handleFilterItemClick = function (isChecked, fileType, filterButtonElement) {
                const filterButton = $(filterButtonElement);
                (isChecked ? this.filesPanel.addFileTypeToSelectedFilter(fileType) : this.filesPanel.deleteFileTypeFromSelectedFilter(fileType),
                    this.filesPanel.sort(),
                    0 !== this.filesPanel.getSelectedFilterForFileTypes().length
                        ? filterButton.hasClass("g-check") || filterButton.addClass("g-check")
                        : filterButton.hasClass("g-check") && filterButton.removeClass("g-check"));
            }),
            (FilesPanelViewBase.prototype._createFilterFileTypeOverlay = function (anchorElement) {
                var menu = $("<div/>").addClass("context-pane");
                const fileTypes = this.filesPanel.getAvailableFileTypesFilter();
                if (!fileTypes || !fileTypes.length) return;
                var self = this;
                return (
                    fileTypes.forEach((fileTypeDef) => {
                        !(function (fileTypeDef, container) {
                            const checkbox = $('<input type="checkbox"/>').on("click", function (event) {
                                (event.stopImmediatePropagation(), self._handleFilterItemClick(checkbox[0].checked, fileTypeDef.type, anchorElement));
                            });
                            $("<div/>")
                                .addClass("context-button")
                                .addClass("sort-option")
                                .addClass(fileTypeDef.id)
                                .append(checkbox)
                                .append($("<label/>").addClass("label").css("cursor", "pointer").text(GObject.GLocale.get(fileTypeDef.name)))
                                .on("click", function (event) {
                                    (event.preventDefault(),
                                        event.stopImmediatePropagation(),
                                        (checkbox[0].checked = !checkbox[0].checked),
                                        self._handleFilterItemClick(checkbox[0].checked, fileTypeDef.type, anchorElement));
                                })
                                .appendTo(container);
                        })(fileTypeDef, menu);
                    }),
                    menu.append($("<hr>")),
                    $("<div/>")
                        .addClass("context-button")
                        .addClass("sort-option")
                        .addClass("clear-option")
                        .append($("<span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.clear"))))
                        .on(
                            "click",
                            function () {
                                if (0 === this.filesPanel.getSelectedFilterForFileTypes().length) return;
                                const checkboxes = menu.find("input[type=checkbox]");
                                for (let t = 0; t < checkboxes.length; t++) checkboxes[t].checked = false;
                                (this.filesPanel.clearAllFileTypesFromSelectedFilter(),
                                    this.clearFileTypeFilterState(),
                                    this.filesPanel.sort());
                            }.bind(this)
                        )
                        .appendTo(menu),
                    menu
                        .gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "context-overlay",
                            offsetX: -70,
                            offsetY: 8,
                        })
                        .gOverlay("open", anchorElement, this.panel),
                    this._updateFilterFileTypeStates(),
                    menu
                );
            }),
            (FilesPanelViewBase.prototype._updateSortStates = function () {
                var dialogContainer = this.panel.closest(".g-dialog-container");
                (dialogContainer.find(".sort-option").removeClass("sort-selected"),
                    dialogContainer.find(".sort-option." + this.filesPanel.getSortType()).addClass("sort-selected"),
                    this.filesPanel.getSortDirection()
                        ? dialogContainer.find(".sort-option.ascending").addClass("sort-selected")
                        : dialogContainer.find(".sort-option.descending").addClass("sort-selected"));
            }),
            (FilesPanelViewBase.prototype._updateFileTypeFilterButtonColor = function (button) {
                0 !== this.filesPanel.getSelectedFilterForFileTypes().length && $(button).addClass("g-check");
            }),
            (FilesPanelViewBase.prototype._updateFilterFileTypeStates = function () {
                var dialogContainer = this.panel.closest(".g-dialog-container");
                if (!dialogContainer.length) return;
                this.filesPanel.getSelectedFilterForFileTypes().forEach((fileType) => {
                    const typeDef = this.filesPanel.getAvailableFileTypesFilter().find((candidate) => candidate.type === fileType);
                    dialogContainer.find(".sort-option.".concat(typeDef.id)).find("input[type=checkbox]")[0].checked = true;
                });
            }),
            (FilesPanelViewBase.prototype._addToSelection = function (element) {
                var node = element.data("node");
                node && (element.addClass("selected"), this.filesPanel.addToSelection(node));
            }),
            (FilesPanelViewBase.prototype.resetSelection = function () {
                (this.panel.find(".g-gravit-folder").removeClass("selected"),
                    this.panel.find(".g-gravit-file").removeClass("selected").removeClass("last-selected"),
                    this.filesPanel.resetSelection());
            }),
            (FilesPanelViewBase.prototype.manageOpenFolder = function (element, targetFolder, folderNode) {
                (this.panel.find(".g-gravit-folder").removeClass("opened"), element)
                    ? $(element).addClass("opened")
                    : targetFolder &&
                      this.panel.find(".g-gravit-folder").each((e, domElement) => {
                          const folderElement = $(domElement),
                              node = folderElement.data("node");
                          ((node && "id" in node && (node.id === targetFolder.id || node.id === targetFolder)) || node === targetFolder) && folderElement.addClass("opened");
                      });
                if (folderNode && !folderNode.isRootFolder()) {
                    var children = folderNode.getChildren();
                    children && children.length && children.forEach((child) => child.refresh());
                }
            }),
            (FilesPanelViewBase.prototype._isMultiSelectionEnabled = function () {
                return this.filesPanel.isMultiSelectionEnabled();
            }),
            (FilesPanelViewBase.prototype.manageSelection = function (element, node) {
                if ((this.panel.find(".g-gravit-file").removeClass("last-selected"), GPlatform.GPlatform.modifiers.metaKey))
                    element.hasClass("selected") ? (element.removeClass("selected"), this.filesPanel.removeFromSelection(node)) : this._addToSelection(element);
                else if (this._isMultiSelectionEnabled() && GPlatform.GPlatform.modifiers.shiftKey) {
                    var jqElement = $(element),
                        nextSelected = jqElement.nextAll(".g-cloud-element.selected"),
                        prevSelected = jqElement.prevAll(".g-cloud-element.selected"),
                        prevAnchor = prevSelected.length > 0 ? prevSelected[0] : null,
                        nextAnchor = nextSelected.length > 0 ? nextSelected[0] : null;
                    if (!prevAnchor || !nextAnchor) {
                        this.resetSelection();
                        var rangeElements = [],
                            anchorElement = null;
                        if ((prevAnchor ? ((anchorElement = $(prevAnchor)), (rangeElements = $(prevAnchor).nextUntil(element))) : ((anchorElement = $(nextAnchor)), (rangeElements = $(element).nextUntil(nextAnchor))), rangeElements.length > 0))
                            for (var d = 0; d < rangeElements.length; ++d) {
                                let rangeElement = $(rangeElements[d]);
                                this._addToSelection(rangeElement);
                            }
                        (this._addToSelection(element), this._addToSelection(anchorElement));
                    }
                } else (this.resetSelection(), this._addToSelection(element), element.addClass("last-selected"));
            }),
            (FilesPanelViewBase.prototype.addToClipboard = function (source) {
                let mode = "";
                ((mode = this.filesPanel.isClipboardModeCopy(source) ? "copy" : "cut"),
                    this.panel.find(".g-gravit-folder.selected").addClass(mode),
                    this.panel.find(".g-gravit-file.selected").addClass(mode),
                    this.resetSelection());
            }),
            (FilesPanelViewBase.prototype.resetClipboard = function (source) {
                let mode = "";
                (this.filesPanel.isClipboardModeCopy(source) ? (mode = "copy") : this.filesPanel.isClipboardModeCut(source) && (mode = "cut"),
                    this.panel.find(".g-gravit-folder").removeClass(mode),
                    this.panel.find(".g-gravit-file").removeClass(mode));
            }),
            (FilesPanelViewBase.prototype.shouldFilesBeRequested = function () {
                var rightSide = this.panel.find(".g-right-side");
                return Math.floor(rightSide[0].scrollHeight - rightSide.scrollTop()) === Math.floor(rightSide.outerHeight());
            }),
            (FilesPanelViewBase.prototype.clearFilesAndFolders = function () {
                ((this._cloudFolders = []), this.clearFiles(), this.panel.find(".g-folders-list").empty());
            }),
            (FilesPanelViewBase.prototype.clearFiles = function () {
                (this.panel.find(".g-files-list").empty(),
                    this.panel.find(".g-recent-files-list").empty(),
                    this.panel.find(".g-search-no-results").hide(),
                    this.toggleRecentFiles(false));
            }),
            (FilesPanelViewBase.prototype._showCDRWarningUnsupportedObjects = function () {
                this.panel.find(".save-form-container").addClass("warning").find(".warning-container").css("display", "");
            }),
            (FilesPanelViewBase.prototype.minimizeWindow = function () {
                (this.panel.closest(".g-dialog-container").removeClass("fullscreen"),
                    this.panel.find(".g-files-top-bar").find(".maximize-button").show(),
                    this.panel.find(".g-files-top-bar").find(".minimize-button").hide());
            }),
            (FilesPanelViewBase.prototype.maximizeWindow = function () {
                (this.panel.closest(".g-dialog-container").addClass("fullscreen"),
                    this.panel.find(".g-files-top-bar").find(".maximize-button").hide(),
                    this.panel.find(".g-files-top-bar").find(".minimize-button").show());
            }),
            (FilesPanelViewBase.prototype.toListView = function () {
                (this.panel.find(".g-files-list").addClass("list-view"),
                    this.panel.find(".g-recent-files-list").addClass("list-view"),
                    this.panel.find(".header").find(".g-button.list-view").addClass("g-selected"),
                    this.panel.find(".header").find(".g-button.card-view").removeClass("g-selected"),
                    this.updateLayout());
            }),
            (FilesPanelViewBase.prototype.toCardView = function () {
                (this.panel.find(".g-files-list").removeClass("list-view"),
                    this.panel.find(".g-recent-files-list").removeClass("list-view"),
                    this.panel.find(".header").find(".g-button.card-view").addClass("g-selected"),
                    this.panel.find(".header").find(".g-button.list-view").removeClass("g-selected"),
                    this.updateLayout());
            }),
            (FilesPanelViewBase.prototype.toggleEmptyPanel = function (show) {
                if (show) {
                    const emptyMessage = this.filesPanel.drive.getDefaultEmptyMessage();
                    emptyMessage &&
                        this.panel
                            .find(".g-empty-panel")
                            .empty()
                            .prepend(
                                $("<div/>")
                                    .append($("<span/>").html(emptyMessage.title))
                                    .append(
                                        emptyMessage.buttons
                                            ? emptyMessage.buttons.map((buttonDef) =>
                                                  $("<button/>")
                                                      .addClass("g-highlight-button highlighted")
                                                      .text(buttonDef.title)
                                                      .on(
                                                          "click",
                                                          () => (
                                                              gDesigner.stats("filespanel-view_execute_action", buttonDef.title),
                                                              buttonDef.execute(this.filesPanel.getContextSource())
                                                          )
                                                      )
                                              )
                                            : ""
                                    )
                            )
                            .show();
                } else this.panel.find(".g-empty-panel").hide();
            }),
            (FilesPanelViewBase.prototype.toggleExampleFiles = function (show) {
                show ? this.panel.find(".g-example-files-list").show() : this.panel.find(".g-example-files-list").hide();
            }),
            (FilesPanelViewBase.prototype.removeExampleFiles = function () {
                this.panel.find(".g-gravit-example-file").remove();
            }),
            (FilesPanelViewBase.prototype.renderNewFolderButton = function (container, targetFolder) {
                var actionsContainer = $("<div/>").addClass("header-left-actions");
                ($("<div/>")
                    .addClass("g-button")
                    .addClass("cloud-button")
                    .addClass("new-folder")
                    .append($("<span/>").addClass("icon").addClass("gravit-icon-w-newfolder"))
                    .append(
                        $("<span/>")
                            .addClass("label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.new-folder")))
                    )
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.new-folder-tooltip")))
                    .on("click", (event) => {
                        event.stopPropagation();
                        const isDisabled = $(event.currentTarget).hasClass("g-disabled");
                        this._isCreateFolderEnabled() && !isDisabled && this.filesPanel.handleNewFolder(targetFolder);
                    })
                    .appendTo(actionsContainer),
                    actionsContainer.appendTo(container));
            }),
            (FilesPanelViewBase.prototype._isCreateFolderEnabled = function () {
                return !gDesigner.getApplicationManager().isOnlyFileOpenFromCloudEnabled() && this.hasPermission(FilesPanelViewBase.Permission.CreateFolder);
            }),
            (FilesPanelViewBase.prototype.renderSortButton = function (container) {
                var self = this,
                    sortButton = $("<div/>")
                        .addClass("g-button")
                        .addClass("cloud-button")
                        .addClass("sort")
                        .css("margin-left", "5px")
                        .append($("<span/>").addClass("icon").addClass("gravit-icon-w-sort"))
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.sort")))
                        .on("click", function (event) {
                            (event.stopPropagation(), gDesigner.stats("filespanel-view_sort_cloud"), self._sortPane(this));
                        });
                ((this._sortButton = sortButton), sortButton.appendTo(container));
            }),
            (FilesPanelViewBase.prototype.renderFileTypeFilterButton = function (container) {
                var self = this,
                    filterButton = $("<div/>")
                        .addClass("g-button")
                        .addClass("cloud-button")
                        .addClass("filter-button")
                        .addClass("sort")
                        .append($("<span/>").addClass("icon").addClass("gravit-icon-filter-view"))
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.filter")))
                        .on("click", function (event) {
                            (event.stopPropagation(), self._createFilterFileTypeOverlay(this));
                        });
                (filterButton.appendTo(container), (this._fileTypeFilterButton = filterButton), this._updateFileTypeFilterButtonColor(filterButton));
            }),
            (FilesPanelViewBase.prototype.clearFileTypeFilterState = function () {
                this._fileTypeFilterButton && this._fileTypeFilterButton.removeClass("g-check");
            }),
            (FilesPanelViewBase.prototype.hideFileTypeFilterButton = function () {
                this._fileTypeFilterButton &&
                    (this._fileTypeFilterButton.css("display", "none"), this._sortButton.css("marginLeft", "15px"));
            }),
            (FilesPanelViewBase.prototype.displayFileTypeFilterButton = function () {
                this._fileTypeFilterButton &&
                    (this._fileTypeFilterButton.css("display", "block"), this._sortButton.css("marginLeft", "5px"));
            }),
            (FilesPanelViewBase.prototype.renderToParentFolderButton = function (container) {
                $("<div/>")
                    .addClass("g-button")
                    .addClass("cloud-button")
                    .addClass("back")
                    .addClass("g-hidden")
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.back-tooltip")))
                    .append($("<span/>").addClass("icon").addClass("gravit-icon-w-back"))
                    .append(
                        $("<span/>")
                            .addClass("label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.back")))
                    )
                    .on(
                        "click",
                        function (event) {
                            (event.stopPropagation(), this.filesPanel.handleBack());
                        }.bind(this)
                    )
                    .appendTo(container);
            }),
            (FilesPanelViewBase.prototype.renderToRootFolderButton = function (container) {
                $("<div/>")
                    .addClass("g-button")
                    .addClass("cloud-button")
                    .addClass("back")
                    .addClass("g-hidden")
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.my-cloud-tooltip")))
                    .append($("<span/>").addClass("icon").addClass("gravit-icon-w-back"))
                    .append(
                        $("<span/>")
                            .addClass("label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.my-cloud")))
                    )
                    .on(
                        "click",
                        function (event) {
                            (event.stopPropagation(), this.filesPanel.navigateToRoot());
                        }.bind(this)
                    )
                    .appendTo(container);
            }),
            (FilesPanelViewBase.prototype.renderGridStyleButtons = function (container) {
                var self = this;
                $("<div />")
                    .addClass("grid-styles-container")
                    .append(
                        $("<div />")
                            .addClass("g-button")
                            .addClass("cloud-button")
                            .addClass("style-button")
                            .addClass("card-view")
                            .addClass("g-selected")
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.card-view-button")))
                            .append($("<span />").addClass("icon").addClass("gravit-icon-card-view"))
                            .on("click", function (event) {
                                (event.stopPropagation(),
                                    $(this).hasClass("g-selected") ||
                                        (gDesigner.stats("filespanel-view_view-files_card"), self.filesPanel.toCardView()));
                            })
                    )
                    .append(
                        $("<div />")
                            .addClass("g-button")
                            .addClass("cloud-button")
                            .addClass("style-button")
                            .addClass("list-view")
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.list-view-button")))
                            .append($("<span />").addClass("icon").addClass("gravit-icon-list-view"))
                            .on("click", function (event) {
                                (event.stopPropagation(),
                                    $(this).hasClass("g-selected") ||
                                        (gDesigner.stats("filespanel-view_view-files_list"), self.filesPanel.toListView()));
                            })
                    )
                    .appendTo(container);
            }),
            (FilesPanelViewBase.prototype._getSaveOptions = function () {
                return {};
            }),
            (FilesPanelViewBase.prototype.addSearchBar = function () {}),
            (FilesPanelViewBase.prototype.getSearchValue = function () {}),
            (FilesPanelViewBase.prototype.updateControls = function () {}),
            (FilesPanelViewBase.prototype.updateToolControls = function () {}),
            (FilesPanelViewBase.prototype.createHeader = function () {}),
            (FilesPanelViewBase.prototype.createFooter = function () {}),
            (FilesPanelViewBase.prototype.addFile = function () {}),
            (FilesPanelViewBase.prototype.addFolder = function () {}),
            (FilesPanelViewBase.prototype.focusFileNameInput = function () {}),
            (FilesPanelViewBase.prototype.scrollToSelectedElement = function () {}),
            (FilesPanelViewBase.Permission = {
                CreateFolder: "create-folder",
                RecentFilesShowMore: "recent-files-show-more",
            }),
            (FilesPanelViewBase.prototype._permissions = []),
            (FilesPanelViewBase.prototype.hasPermission = function (permission) {
                return this._permissions.includes(permission);
            }),
            (FilesPanelViewBase.prototype.setPermission = function (permission) {
                let enable = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (this._permissionSupported(permission)) {
                    if (enable) this.hasPermission(permission) || this._permissions.push(permission);
                    else if (this.hasPermission(permission)) {
                        var index = this._permissions.indexOf(permission);
                        this._permissions.splice(index, 1);
                    }
                    this._permissionChanged();
                } else console.warn("Permission not supported: " + permission);
            }),
            (FilesPanelViewBase._createFileInfoPanel = function () {
                return $("<div/>")
                    .on("click", (event) => {
                        (event.stopPropagation(), event.preventDefault());
                    })
                    .addClass("g-file-info-panel");
            }),
            (FilesPanelViewBase.prototype._closeFileInfoPanel = function () {
                (this._rightSide.toggleClass("show-info-panel", false),
                    this._fileInfoPanel.toggleClass("g-active", false),
                    (this._fileInfoPanelIsOpen = false));
            }),
            (FilesPanelViewBase.prototype._openFileInfoPanel = function () {
                (this._rightSide.toggleClass("show-info-panel", true),
                    this._fileInfoPanel.toggleClass("g-active", true),
                    (this._fileInfoPanelIsOpen = true));
            }),
            (FilesPanelViewBase.prototype._updateFileInfoPanel = async function (file, fileElement, isRecent) {
                const selection = this.filesPanel.getSelection();
                if (!file || !this._user || (selection && 1 !== selection.length)) this._closeFileInfoPanel();
                else {
                    selection[0].id !== file.id && (file = selection[0]);
                    try {
                        (this._openFileInfoPanel(), this._fileInfoPanel.toggleClass("loading", true), this._fileInfoPanel.empty());
                        const detailContainer = $("<div/>").addClass("g-file-detail-container").appendTo(this._fileInfoPanel),
                            renderer = GFileDetailRenderer.getRenderForFile(file);
                        (await renderer.render(detailContainer, file), renderer.addEventListener(GFileDetailEvent, (event) => this._detailRenderEventListener(event, file, fileElement, isRecent)));
                    } finally {
                        (this._fileInfoPanel.toggleClass("loading", false),
                            this._scrollToTheFile(fileElement, isRecent),
                            isRecent && this._expandRecentListIfFileWasHidden(fileElement));
                    }
                }
            }),
            (FilesPanelViewBase.prototype._detailRenderEventListener = function (event, file, fileElement, isRecent) {
                switch (event.type) {
                    case GFileDetailEvent.Type.DoubleClickFile:
                        this.filesPanel.handleFileDblClick(event.data);
                        break;
                    case GFileDetailEvent.Type.Reload:
                        this._updateFileInfoPanel(file, fileElement, isRecent);
                        break;
                    case GFileDetailEvent.Type.UnshareWithMe:
                        (this._closeFileInfoPanel(), this.filesPanel.updateFilesList());
                }
            }),
            (FilesPanelViewBase.prototype._scrollToTheFile = function (fileElement) {
                const oneThirdHeight = this._rightSide.height() / 3,
                    target = fileElement[0],
                    scrollOffset = target.offsetTop - oneThirdHeight > 0 ? target.offsetTop - oneThirdHeight : 0;
                this._rightSide.animate({ scrollTop: scrollOffset + "px" }, 400);
            }),
            (FilesPanelViewBase.prototype._expandRecentListIfFileWasHidden = function (fileElement) {
                const recentFilesListElement = this.panel.find(".g-recent-files-list"),
                    gridData = this._getGridData(recentFilesListElement);
                recentFilesListElement.find(".g-gravit-file").index(fileElement) >= gridData.columnsAmount &&
                    (this.panel.find(".g-recent-files-show-more").hide(), recentFilesListElement.css("max-height", "max-content"));
            }),
            (FilesPanelViewBase.prototype._permissionSupported = function (permission) {
                return Object.values(FilesPanelViewBase.Permission).includes(permission);
            }),
            (FilesPanelViewBase.prototype.handleShortcut = function (event) {
                switch (event.which) {
                    case 70:
                        this._forceSearchInput(event);
                        break;
                    case 86:
                        this._handlePasteShortcut(event);
                        break;
                    case 27:
                        this._handleEscShortcut(event);
                }
            }),
            (FilesPanelViewBase.prototype._forceSearchInput = function (event) {
                if (GPlatform.GPlatform.modifiers.metaKey || GPlatform.GPlatform.modifiers.ctrlKey) {
                    var searchInput = this.panel.find(".search-container > input.search-field");
                    searchInput.length > 0 && (event.preventDefault(), searchInput.focus());
                }
            }),
            (FilesPanelViewBase.prototype._handlePasteShortcut = function (event) {
                function stopEvent() {
                    (event.preventDefault(), event.stopPropagation());
                }
                (GPlatform.GPlatform.modifiers.metaKey || GPlatform.GPlatform.modifiers.ctrlKey) &&
                    (this.filesPanel.isClipboardModeCut()
                        ? (stopEvent(), this.filesPanel.performCutPaste())
                        : this.filesPanel.isClipboardModeCopy() && (stopEvent(), this.filesPanel.performCopyPaste()));
            }),
            (FilesPanelViewBase.prototype._handleEscShortcut = function (event) {
                this._fileInfoPanelIsOpen && (this._closeFileInfoPanel(), event.preventDefault(), event.stopPropagation());
            }),
            (FilesPanelViewBase.prototype.handleParentClose = function () {
                (window.removeEventListener("keydown", this._bindedHandleSearchShortcut, true),
                    gDesigner.removeEventListener(GDrive.default.DriveEvent, this._handleDriveEvent, this));
            }),
            (FilesPanelViewBase.prototype._setContextMenuActiveRangeSize = function (contextMenu) {
                const menu = contextMenu || this._contextMenu,
                    frame = $(".frame.cloud-frame"),
                    offset = frame.offset();
                offset &&
                    (menu.setActiveRangeSize(offset.left, offset.top, frame.height(), frame.width()),
                    this._downloadContextMenu && this._downloadContextMenu.setActiveRangeSize(offset.left, offset.top, frame.height(), frame.width()));
            }),
            (FilesPanelViewBase.prototype._permissionChanged = function () {}),
            (FilesPanelViewBase.prototype._isContextMenuAvailableForFile = function (file) {
                return this.filesPanel._isContextMenuAvailableForFile(file);
            }),
            (module.exports = FilesPanelViewBase));
    };
