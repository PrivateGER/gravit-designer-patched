module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(557), require(26));
        var _interopRequireDefault = require(16);
        (require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(356), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(271 /* polyfill:String */), require(34), require(851), require(91 /* polyfill:String */), require(4), require(322), require(13), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            FilesPanelViewBase = _interopRequireDefault(require(1300 /* GFilesPanelViewBase */)),
            dateUtils = require(1163),
            Utils = require(40),
            driveUtils = require(593),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            GCloudDrive = (function (e, t) {
                if ("function" == typeof WeakMap)
                    var n = new WeakMap(),
                        o = new WeakMap();
                return (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    var i,
                        a,
                        r = { __proto__: null, default: e };
                    if (null === e || ("object" != typeof e && "function" != typeof e)) return r;
                    if ((i = t ? o : n)) {
                        if (i.has(e)) return i.get(e);
                        i.set(e, r);
                    }
                    for (const t in e)
                        "default" !== t &&
                            {}.hasOwnProperty.call(e, t) &&
                            ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (a.get || a.set)
                                ? i(r, t, a)
                                : (r[t] = e[t]));
                    return r;
                })(e, t);
            })(require(862 /* GCloudDrive */)),
            GFilesPanelConstants = require(858);
        const GDriveItem = require(156),
            { CLOUD_DIALOG } = require(10 /* designerConfig */),
            { GPlatform: platform } = require(15 /* GPlatform */),
            GContainer = require(85),
            { GRegex } = require(263 /* GRegex */),
            GFilesPanelViewNative = function () {
                (FilesPanelViewBase.default.apply(this, arguments), (this._lockEnter = false), this.panel.addClass("full-width"));
            };
        GObject.GObject.inherit(GFilesPanelViewNative, FilesPanelViewBase.default);
        var GMenu = require(238),
            GMenuItem = require(339);
        ((GFilesPanelViewNative.prototype._lockEnter = false),
            (GFilesPanelViewNative.prototype.filesPanel = null),
            (GFilesPanelViewNative.prototype.createHeader = function () {
                var self = this,
                    header = $("<div/>").addClass("header").appendTo(this.panel);
                this.renderNewFolderButton(header, () => {
                    var currentFolder = self.filesPanel.drive.getCurrentFolder();
                    if (!currentFolder || self.filesPanel.drive.isRootFolder()) return self.filesPanel.updateFilesList();
                    self._cloudFolders.forEach((folder) => {
                        folder.getFolder().id === (currentFolder.id || currentFolder) && folder.refresh();
                    });
                });
                var searchTerm = "";
                ($("<div />")
                    .addClass("search-container")
                    .append(
                        $("<input />")
                            .addClass("search-field")
                            .attr("type", "text")
                            .attr("size", "12")
                            .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.search-placeholder")))
                            .on("keyup", function (event) {
                                event.stopPropagation();
                                var searchValue = $(this).val().trim();
                                searchValue !== searchTerm &&
                                    ((searchTerm = $(this).val()), gDesigner.stats("filespanel-view_execute_search", searchValue), self.filesPanel.search(searchValue));
                                var clearSearchIcon = self.panel.find(".header").find(".search-container").find(".clear-search-icon"),
                                    searchIcon = self.panel.find(".header").find(".search-container").find(".search-icon");
                                searchValue.length ? (clearSearchIcon.show(), searchIcon.hide()) : (clearSearchIcon.hide(), searchIcon.show());
                            })
                            .on("focusin", function () {
                                self.panel.find(".header").find(".search-container").toggleClass("g-active", true);
                            })
                            .on("focusout", function () {
                                self.panel.find(".header").find(".search-container").toggleClass("g-active", false);
                            })
                            .on("input:reset", function () {
                                ($(this).val(""),
                                    (searchTerm = ""),
                                    self.panel.find(".header").find(".search-container").find(".clear-search-icon").hide());
                            })
                            .on("keydown", function (event) {
                                if (GPlatform.GKey.translateCode(event.key) === GPlatform.GKey.Constant.TAB) {
                                    var searchValue = $(this).val().trim();
                                    (self.filesPanel.search(searchValue), event.preventDefault(), event.stopPropagation());
                                }
                            })
                    )
                    .append(
                        $("<div />")
                            .addClass("clear-search-icon")
                            .append($("<span />").addClass("icon").addClass("gravit-icon-close"))
                            .on("click", function (event) {
                                event.stopPropagation();
                                var searchField = self.panel.find(".header").find(".search-container").find(".search-field"),
                                    searchIcon = self.panel.find(".header").find(".search-container").find(".search-icon");
                                (searchField.val(""),
                                    (searchTerm = ""),
                                    self.filesPanel.updateFilesList(false, false),
                                    gDesigner.stats("filespanel-view_clear_search-field"),
                                    $(this).hide(),
                                    searchField.focus(),
                                    searchIcon.show());
                            })
                            .hide()
                    )
                    .append(
                        $("<div />")
                            .addClass("search-icon")
                            .append($("<span />").addClass("icon").addClass("gravit-icon-magnifier"))
                            .on("click", function (event) {
                                (event.stopPropagation(),
                                    gDesigner.stats("filespanel-view_search_focus"),
                                    self.panel.find(".header").find(".search-container").find(".search-field").focus());
                            })
                    )
                    .appendTo(header),
                    $("<div/>").addClass("fake").appendTo(header),
                    this.renderSortButton(header));
                const availableFileTypesFilter = this.filesPanel.getAvailableFileTypesFilter();
                ("function" == typeof GCloudDrive.default &&
                    this.filesPanel.drive instanceof GCloudDrive.default &&
                    availableFileTypesFilter &&
                    availableFileTypesFilter.length > 1 &&
                    this.renderFileTypeFilterButton(header),
                    this.renderGridStyleButtons(header),
                    this._buildContextMenu(),
                    this._buildAdditionalContextMenu());
            }),
            (GFilesPanelViewNative.prototype._permissionChanged = function () {
                FilesPanelViewBase.default.prototype._permissionChanged.call(this);
                const newFolderButton = this.panel.find(".header").find(".new-folder");
                if (this._isCreateFolderEnabled())
                    (newFolderButton.attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.new-folder-tooltip"))),
                        newFolderButton.removeClass("g-disabled"));
                else {
                    const unavailableTooltip = GObject.GLocale.get(
                        new GObject.GLocaleKey("GFilesPanel", "text.option-isnt-available"),
                        "This option isn’t available for Cloud Drives"
                    );
                    (newFolderButton.attr("data-title", unavailableTooltip), newFolderButton.addClass("g-disabled"));
                }
            }),
            (GFilesPanelViewNative.prototype.addSearchBar = function (container) {
                $("<div />")
                    .addClass("g-search-no-results")
                    .hide()
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.search-not-found")))
                    .appendTo(container);
            }),
            (GFilesPanelViewNative.prototype.createFooter = function (fileName) {
                var footer = $("<div/>").addClass("footer").appendTo(this.panel);
                if (this.filesPanel.isSaveMode()) {
                    var saveFormContainer = $("<div />").addClass("save-form-container").appendTo(footer);
                    const inputContainer = $("<div/>").addClass("input-container").appendTo(saveFormContainer);
                    var fileNameInput = $("<input/>")
                        .addClass("file-name")
                        .val(fileName ? (0, Utils.decodeHTML)(fileName) : GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.untitled")))
                        .appendTo(inputContainer);
                    const isSafari = platform.webBrowser === platform.constructor.WebBrowser.Safari,
                        isIPad = gContainer.getRuntime() === GContainer.Runtime.IPad;
                    ((isSafari || isIPad) &&
                        fileNameInput.on("click", () => {
                            fileNameInput.focus();
                        }),
                        $("<div/>")
                            .addClass("g-button")
                            .addClass("cloud-button")
                            .addClass("cancel")
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.cancel-tooltip")))
                            .html(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                            .on(
                                "click",
                                function (event) {
                                    (event.stopPropagation(), this.filesPanel.handleCancelSave());
                                }.bind(this)
                            )
                            .appendTo(inputContainer),
                        this.filesPanel.setKeyListener((keyCode, event) => {
                            if (13 === keyCode && !this._lockEnter) {
                                const extension = this._getSelectedExtension(),
                                    saveOptions = this._getSaveOptions();
                                if (!this.filesPanel._canDownload(extension)) return;
                                (event.preventDefault(), this.filesPanel.handleSave(fileNameInput.val(), extension, saveOptions));
                            }
                        }),
                        gDesigner.getApplicationManager().isSavingToCloudEnabled() &&
                            gDesigner.getApplicationManager().isSavingAsEnabled() &&
                            $("<div/>")
                                .addClass("g-button")
                                .addClass("cloud-button")
                                .addClass("primary")
                                .addClass("save")
                                .append($("<span/>").addClass("icon").addClass("gravit-icon-w-save"))
                                .append(
                                    $("<span/>")
                                        .addClass("label")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "title")))
                                )
                                .on(
                                    "click",
                                    function (event) {
                                        event.stopPropagation();
                                        const extension = this._getSelectedExtension(),
                                            saveOptions = this._getSaveOptions();
                                        this.filesPanel._canDownload(extension) && this.filesPanel.handleSave(fileNameInput.val(), extension, saveOptions);
                                    }.bind(this)
                                )
                                .appendTo(inputContainer),
                        this._setSelectedExtension(GCloudDrive.DEFAULT_TYPE.ext),
                        this.panel.find(".g-items-container").addClass("g-items-container-footer"),
                        fileNameInput.focus());
                } else footer.hide();
            }),
            (GFilesPanelViewNative.prototype._getSelectedExtension = function () {
                const selectedValue = this.panel.find(".save-form-container").find("option:selected").val();
                if (!selectedValue) return (this.filesPanel.getDefaultSaveFormat() && this.filesPanel.getDefaultSaveFormat().ext) || GCloudDrive.DEFAULT_TYPE.ext;
                const possibleExtensions = this.filesPanel.getPossibleExtensions();
                return (0, Utils.getExtensionFromString)(selectedValue, possibleExtensions) || GCloudDrive.DEFAULT_TYPE.ext;
            }),
            (GFilesPanelViewNative.prototype._getSelectedVersion = function () {
                const selectedValue = this.panel.find(".save-form-container").find("option:selected").val();
                if (!selectedValue) return Number(this.filesPanel.getDefaultVersionForSave());
                const version = this._getVersionFromValue(selectedValue);
                return Number(version || this.filesPanel.getDefaultVersionForSave());
            }),
            (GFilesPanelViewNative.prototype._setSelectedExtension = function (extension) {
                this.panel.find('select.file-extension > option[value="'.concat(extension.toUpperCase(), '"]')).prop("selected", true);
            }),
            (GFilesPanelViewNative.prototype._removeCDRExtensionFromFileName = function (fileName) {
                return fileName.endsWith(".cdr") ? fileName.replace(new RegExp(".cdr$"), "") : fileName;
            }),
            (GFilesPanelViewNative.prototype.addFile = function (file) {
                let isRecent = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    isExample = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                const fileName = this._removeCDRExtensionFromFileName(file.name);
                var self = this,
                    isSelected = this.filesPanel.isItemSelected(file),
                    isInClipboard = this.filesPanel.isItemInClipboard(file),
                    targetList = null;
                targetList = isRecent
                    ? this.panel.find(".g-recent-files-list")
                    : isExample
                      ? this.panel.find(".g-example-files-list")
                      : this.panel.find(".g-files-list");
                var fileElement = $("<div/>")
                    .attr("draggable", file.hasPermission(GDriveItem.Permission.CutPaste))
                    .attr("id", file.id)
                    .addClass("g-gravit-file")
                    .addClass("g-cloud-element")
                    .addClass(file.id)
                    .addClass(isSelected ? "selected" : "")
                    .addClass(isInClipboard && this.filesPanel.isClipboardModeCut() ? "cut" : "")
                    .data("node", file)
                    .attr("data-title", file._rootPath ? file._rootPath : fileName)
                    .on("dragstart", function (event) {
                        if (self._isDuringRenaming()) return (event.stopPropagation(), void event.preventDefault());
                        ($(this).addClass("dragging"), $(".g-tooltip").toggleClass("visible", false));
                        const dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer,
                            dragGhostDiv = document.createElement("div"),
                            dragGhost = $(dragGhostDiv);
                        (dragGhost.addClass("drag-ghost-item"),
                            dragGhost.text(file.name),
                            document.getElementById(file.id).appendChild(dragGhostDiv),
                            dataTransfer.setDragImage(dragGhostDiv, 30, 15),
                            dataTransfer.setData("text/plain", JSON.stringify(file)));
                    })
                    .on("drag", function (event) {
                        if (self._isDuringRenaming()) return (event.stopPropagation(), void event.preventDefault());
                        $(".g-tooltip").toggleClass("visible", false);
                    })
                    .on("dragend", function () {
                        $(this).removeClass("dragging");
                    })
                    .on(
                        "dblclick",
                        function (event) {
                            if ((event.stopPropagation(), event.preventDefault(), !self._isDuringRenaming()))
                                return (this.filesPanel.handleFileDblClick(file), false);
                        }.bind(this)
                    )
                    .on(
                        "click",
                        function (event) {
                            (event.stopPropagation(),
                                event.preventDefault(),
                                self._isDuringRenaming() || (this.filesPanel.handleFileClick(file, fileElement), this._updateFileInfoPanel(file, fileElement, isRecent)));
                        }.bind(this)
                    )
                    .on(
                        "contextmenu",
                        function (event) {
                            (event.stopPropagation(), self._handleFileContextMenu(file, fileElement, event));
                        }.bind(this)
                    );
                file.example && fileElement.addClass("g-gravit-example-file");
                var existingElement = targetList.find("#".concat(file.id));
                existingElement.length ? $(existingElement).replaceWith(fileElement) : fileElement.appendTo(targetList);
                var dateText,
                    dateLabel,
                    imageContainer = $("<div />").addClass("image-container").appendTo(fileElement);
                this.filesPanel.getSortType() === GFilesPanelConstants.GFilesPanelSortTypes.CREATED
                    ? ((dateText = (0, dateUtils.dateToFilePreviewFormat)(file.created ? file.created : file.updated)),
                      (dateLabel = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.created"))))
                    : ((dateText = (0, dateUtils.dateToFilePreviewFormat)(file.updated ? file.updated : file.created)),
                      (dateLabel = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.updated"))));
                var fileSize = file instanceof GDriveItem && file.getSize(),
                    sizeText = "";
                if (fileSize && CLOUD_DIALOG.SHOW_FILE_SIZE_INFO) {
                    var sizeInfo = (0, Utils.getSizeInfo)(fileSize);
                    sizeInfo.gb
                        ? (sizeText += (sizeText ? "" : " ") + "".concat(sizeInfo.gb, " GB"))
                        : sizeInfo.mb
                          ? (sizeText += (sizeText ? "" : " ") + "".concat(sizeInfo.mb, " MB"))
                          : sizeInfo.kb
                            ? (sizeText += (sizeText ? "" : " ") + "".concat(sizeInfo.kb, " KB"))
                            : (sizeText += (sizeText ? "" : " ") + "< 1 KB");
                }
                var previewUrl = null;
                (file instanceof GDriveItem && (previewUrl = file.getPreviewURL()),
                    previewUrl || (previewUrl = file.url_t || file.url_s),
                    previewUrl ? imageContainer.css("background-image", 'url("'.concat(previewUrl, '")')) : imageContainer.addClass("default-preview"));
                var nameContainer = $("<div/>").addClass("name-container").appendTo(fileElement);
                ($("<div />")
                    .addClass("file-name-container")
                    .append($("<div />").addClass("name").text(fileName))
                    .append(
                        $("<input />")
                            .attr("type", "text")
                            .css("display", "none")
                            .addClass("file-name")
                            .val(fileName)
                            .css("width", $(this).parent().find(".name").outerWidth())
                    )
                    .appendTo(nameContainer),
                    this._updateFileNamePreview(fileElement, file),
                    $("<div />")
                        .addClass("file-updated")
                        .attr(
                            "data-title",
                            ""
                                .concat(dateLabel, " ")
                                .concat(dateText)
                                .concat(sizeText ? ", " + sizeText : "")
                        )
                        .text(
                            ""
                                .concat(dateLabel, " ")
                                .concat(dateText)
                                .concat(sizeText ? ", " + sizeText : "")
                        )
                        .appendTo(fileElement));
                var fileTopTile = $("<div />").addClass("file-top-tile").appendTo(fileElement);
                return (
                    this._isContextMenuAvailableForFile(file) &&
                        $("<div />")
                            .addClass("file-context")
                            .append(
                                $("<span />")
                                    .addClass("icon")
                                    .addClass("gravit-icon-w-kebab")
                                    .on("mouseover", function (event) {
                                        event.stopPropagation();
                                    })
                            )
                            .on(
                                "click",
                                function (event) {
                                    (event.stopPropagation(), self._handleFileContextMenu(file, fileElement, event));
                                }.bind(this)
                            )
                            .on("dblclick", function (event) {
                                event.stopPropagation();
                            })
                            .on("mouseover", function (event) {
                                event.stopPropagation();
                            })
                            .appendTo(fileTopTile),
                    file.hasPermission(GDriveItem.Permission.Open) &&
                        !this.filesPanel.isSaveMode() &&
                        $("<button />")
                            .addClass("open-design-button g-button cloud-button")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.open-design")))
                            .on("click", (event) => {
                                (event.stopPropagation(),
                                    file.example || gDesigner.stats("filespanel-view_open_cloudfile"),
                                    this.filesPanel.openFile(file));
                            })
                            .appendTo(fileTopTile),
                    fileElement
                );
            }),
            (GFilesPanelViewNative.prototype._handleFileContextMenu = function (file, element, event) {
                this._isContextMenuAvailableForFile(file) &&
                    (gDesigner.stats("filespanel-view_context_cloudfile"),
                    this.filesPanel.isItemSelected(file) || this.resetSelection(true),
                    this._addToSelection(element),
                    this._openContextMenuForEventPosition(event));
            }),
            (GFilesPanelViewNative.prototype._updateFileNamePreview = function (element, file) {
                const fileName = this._removeCDRExtensionFromFileName(file.name);
                var nameContainer = $(element).find(".file-name-container");
                nameContainer.attr("data-ending", "..." + fileName.substr(fileName.length - 4));
                var nameLabel = nameContainer.find(".name");
                (nameLabel.text(fileName), ((el) => el && el.offsetWidth < el.scrollWidth)(nameLabel[0]) && nameContainer.addClass("ending"));
            }),
            (GFilesPanelViewNative.prototype.addFolder = function (folder) {
                let parent = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this._factoryFolder(folder, parent).getHTMLContainer().appendTo(this.panel.find(".g-folders-list.main"));
            }),
            (GFilesPanelViewNative.prototype.addCustomFolder = function (folder) {
                let parent = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                (this._factoryFolder(folder, parent).getHTMLContainer().appendTo(this.panel.find(".g-folders-list.custom-folders")),
                    "shared_files_with_me" === folder.id &&
                        ("shared_files_with_me" === this.filesPanel.drive.getCurrentFolder().id
                            ? this.hideFileTypeFilterButton()
                            : this.displayFileTypeFilterButton()));
            }),
            (GFilesPanelViewNative.prototype.scrollToSelectedElement = function (node) {
                var foundNode = null;
                return (
                    this.panel
                        .find(".g-files-list")
                        .find(".g-gravit-file")
                        .each(
                            function (index, element) {
                                if ($(element).data("node").id === node.id)
                                    return (
                                        (foundNode = $(element).data("node")),
                                        setTimeout(() => {
                                            this.panel.find(".g-items-container").scrollTop($(element).position().top);
                                        }),
                                        false
                                    );
                            }.bind(this)
                        ),
                    foundNode
                );
            }),
            (GFilesPanelViewNative.prototype.updateControls = function (selectFileName) {
                this.panel.find(".g-gravit-folder").length > 0
                    ? this.panel.find(".g-folders-list").show()
                    : this.panel.find(".g-folders-list").hide();
                const header = this.panel.find(".header"),
                    newFolderButton = header.find(".new-folder"),
                    backButton = header.find(".back");
                (this.getSearchValue()
                    ? (newFolderButton.addClass("g-disabled"),
                      backButton.addClass("g-hidden"),
                      this.panel.find(".g-files-list").find(".g-gravit-file").length < 1 && this._showNoResultsInfo())
                    : this._isCreateFolderEnabled() && newFolderButton.removeClass("g-disabled"),
                    this.filesPanel.isRootFolder() ? backButton.addClass("g-hidden") : backButton.removeClass("g-hidden"),
                    selectFileName && this.filesPanel.isSaveMode() && this.panel.find(".footer").find("input.file-name").select());
            }),
            (GFilesPanelViewNative.prototype._showNoResultsInfo = function () {
                this.panel.find(".g-search-no-results").show();
            }),
            (GFilesPanelViewNative.prototype._checkItemPermission = function (items, permission) {
                return (items instanceof Array ? items : [items]).every((item) =>
                    item instanceof GDriveItem ? item.hasPermission(permission) : (console.error("Wrong check for file permission", item), true)
                );
            }),
            (GFilesPanelViewNative.prototype._openContextMenuForEventPosition = function (event) {
                var x = event.pageX,
                    y = event.pageY;
                this._contextMenu.open({ x: x, y: y });
            }),
            (GFilesPanelViewNative.prototype._renameFile = function (file, element, callback) {
                const fileName = this._removeCDRExtensionFromFileName(file.name),
                    self = this;
                self.toggleLoading(false);
                var input = element.find("input");
                (input.off("focusout"), input.off("keypress"));
                var nameLabel = element.find("div.name");
                (element.addClass("renaming"),
                    $(element).attr("data-title", fileName),
                    nameLabel.text(fileName),
                    input.css("width", nameLabel.outerWidth()),
                    input.val(fileName),
                    $(element).find(".file-name-container").removeClass("ending"),
                    input.css("width", nameLabel.outerWidth()));
                var originalValue = input.val(),
                    isSubmitted = false;
                (input.show(), nameLabel.hide(), input.focus());
                const confirmOverwrite = (candidateName) => {
                    let message;
                    return (
                        (message =
                            file.getType() === GDriveItem.Type.File
                                ? GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.file-already-exists-on-current-location")).replace(
                                      "%filename",
                                      '"'.concat(candidateName, '"')
                                  )
                                : GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.folder-already-exists-on-current-location")).replace(
                                      "%foldername",
                                      '"'.concat(candidateName, '"')
                                  )),
                        new Promise((resolve) => {
                            GSystemDialog.default.confirm(message, (confirmed) => resolve(!!confirmed), null, null, false, true, true);
                        })
                    );
                };
                var commitRename = async function () {
                    try {
                        (input.hide(), nameLabel.show());
                        let newName,
                            inputValue = input.val();
                        if (file.getType() === GDriveItem.Type.File && !self._isUserInputValidFileName(inputValue))
                            return (
                                GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.new-file-name-invalid"))),
                                void input.val(originalValue)
                            );
                        if (inputValue.trim() && inputValue.trim() !== file.name) {
                            self.toggleLoading(true);
                            try {
                                let i = 0;
                                const extension = file.ext || file.extension;
                                if (self.filesPanel.drive.supportsSaveCollisionFlow())
                                    if (file.getType() === GDriveItem.Type.File) {
                                        if (
                                            (await self.filesPanel.drive.fileExists(inputValue, extension, file.parent || self.filesPanel.drive.getRootFolder())) &&
                                            !(await confirmOverwrite(inputValue))
                                        )
                                            return self._renameFile(file, element, callback);
                                        if (self.filesPanel.drive.requiresOverwriteCollisionHandling())
                                            for (
                                                newName = inputValue;
                                                await self.filesPanel.drive.fileExists(newName, extension, file.parent || self.filesPanel.drive.getRootFolder());

                                            )
                                                newName = "".concat(inputValue, " (").concat(++i, ")");
                                    } else {
                                        if (
                                            (await self.filesPanel.drive.folderExists(inputValue, file.parent || self.filesPanel.drive.getRootFolder())) &&
                                            !(await confirmOverwrite(inputValue))
                                        )
                                            return self._renameFile(file, element, callback);
                                        if (self.filesPanel.drive.requiresOverwriteCollisionHandling())
                                            for (
                                                newName = inputValue;
                                                await self.filesPanel.drive.folderExists(newName, file.parent || self.filesPanel.drive.getRootFolder());

                                            )
                                                newName = "".concat(inputValue, " (").concat(++i, ")");
                                    }
                                (newName || (newName = inputValue), await self.filesPanel.renameItem(file, newName));
                            } catch (error) {
                                return (
                                    self.toggleLoading(false),
                                    error && error.badName
                                        ? void GSystemDialog.default.alert(error.message)
                                        : (input.val(originalValue),
                                          void GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-renaming"))))
                                );
                            }
                            (!(function (title) {
                                const windowManager = gDesigner.getWindows(),
                                    windows = windowManager && windowManager.getWindows();
                                if (!windows || !windows.length) return;
                                for (let n = 0, i = windows.length; n < i; n++) {
                                    let doc = windows[n].getDocument();
                                    if (doc && doc.getId() === file.id) {
                                        doc.setTitle(title);
                                        break;
                                    }
                                }
                            })(newName),
                                (file.name = newName),
                                input.css("width", nameLabel.outerWidth()));
                            const updateFileElement = (element) => {
                                (($(element).data("node").name = newName),
                                    $(element).attr("data-title", newName),
                                    $(element).find("div.name").text(newName),
                                    self._updateFileNamePreview(element, file));
                            };
                            (file.getType() === GDriveItem.Type.Folder
                                ? updateFileElement(element)
                                : $.each(self._rightSide.find(".".concat(file.id)), (index, element) => {
                                      updateFileElement(element);
                                  }),
                                self._fileInfoPanelIsOpen && self._updateFileInfoPanel(file, element, false),
                                self.filesPanel._triggerFileRenamed(file),
                                self.toggleLoading(false),
                                callback && callback());
                        } else input.val(originalValue);
                    } catch (error) {
                        throw (console.log("err changing the name", error), error);
                    }
                };
                input.on("focusout", function () {
                    (isSubmitted || (commitRename(), (isSubmitted = true)), element.removeClass("renaming"));
                }).on("keypress", function (event) {
                    const keyCode = event.which || event.charCode || event.keyCode;
                    (GPlatform.GKey.translateKey(keyCode) !== GPlatform.GKey.Constant.ENTER ||
                        isSubmitted ||
                        (gDesigner.stats("filespanel-view_update_cloudfile-name"), commitRename(), (isSubmitted = true)),
                        element.removeClass("renaming"));
                });
            }),
            (GFilesPanelViewNative.prototype._updateMenuItemCaption = function (menuItem, caption) {
                this.filesPanel.getSelection().length > 1
                    ? menuItem.setCaption(
                          GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.selection-multiple"))
                              .replace("%selection", caption)
                              .replace("%multiple", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.multiple")))
                      )
                    : menuItem.setCaption(caption);
            }),
            (GFilesPanelViewNative.prototype._isFolderSelected = function () {
                var selection = this.filesPanel.getSelection();
                return 1 === selection.length && selection[0].getType() === GDriveItem.Type.Folder;
            }),
            (GFilesPanelViewNative.prototype._getNativeMenuItems = function () {
                return [
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.open")),
                        click: () => {
                            if (this._isFolderSelected()) {
                                gDesigner.stats("filespanel-view_open_cloudfolder");
                                var selection = this.filesPanel.getSelection(),
                                    folderElement = this._getSelectedFolderUIElement();
                                (this.filesPanel.navigateToFolder(selection[0]),
                                    this.filesPanel.manageOpenFolder(folderElement, selection[0]),
                                    this._expandSelectedFolder());
                            } else {
                                gDesigner.stats("filespanel-view_opencontext_cloud");
                                selection = this.filesPanel.getSelection();
                                this.filesPanel.openFile.call(this.filesPanel, selection[0]);
                            }
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (event.sender.setEnabled(1 === selection.length),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.Open)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.rename")),
                        click: () => {
                            var selection = this.filesPanel.getSelection();
                            gDesigner.stats("filespanel-view_rename_cloud");
                            const targetElement = this._isFolderSelected() ? $(".g-gravit-folder.selected") : this._rightSide.find(".selected").eq(0);
                            this._renameFile(selection[0], targetElement);
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (event.sender.setEnabled(1 === selection.length),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.Rename)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GPasteAction", "title")),
                        click: () => {
                            this.filesPanel.isClipboardModeCut() ? this.filesPanel.performCutPaste() : this.filesPanel.performCopyPaste();
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            const isClipboardActive = this.filesPanel.isClipboardModeCut() || this.filesPanel.isClipboardModeCopy();
                            (event.sender.setEnabled(isClipboardActive),
                                event.sender.setVisible(
                                    this._checkItemPermission(selection, GDriveItem.Permission.CutPaste) ||
                                        (0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.copy")),
                        click: () => {
                            this.filesPanel.performCopyPaste(GFilesPanelConstants.GFilesPanelClipboardModes.DEFAULT);
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (this._updateMenuItemCaption(event.sender, GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.copy"))),
                                event.sender.setEnabled(selection.length > 0),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.Copy)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.cut")),
                        click: () => {
                            this.filesPanel.performCutPaste(GFilesPanelConstants.GFilesPanelClipboardModes.DEFAULT);
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (this._updateMenuItemCaption(event.sender, GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.cut"))),
                                event.sender.setEnabled(selection.length > 0),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.CutPaste)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GDeleteAction", "title")),
                        click: () => {
                            this.filesPanel.handleDelete();
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (this._updateMenuItemCaption(event.sender, GObject.GLocale.get(new GObject.GLocaleKey("GDeleteAction", "title"))),
                                event.sender.setEnabled(selection.length > 0),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.Delete)
                                ));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GUnshareWithMeAction", "title")),
                        click: async () => {
                            if (gDesigner.getShareManager().isShareProRestricted()) gDesigner.handleShareFilePROFeatureInterruption();
                            else {
                                const user = await gDesigner.getUser();
                                if (!user) return;
                                const itemId = this.filesPanel.getSelection()[0].getId(),
                                    userId = user.getUID();
                                (console.log("About to call unshare with item id: %s and user id: %s", itemId, userId),
                                    await gApi.unshareWithUser(itemId, userId),
                                    this._closeFileInfoPanel(),
                                    this.filesPanel.updateFilesList());
                            }
                        },
                        update: (event) => {
                            var selection = this.filesPanel.getSelection();
                            (this._updateMenuItemCaption(event.sender, GObject.GLocale.get(new GObject.GLocaleKey("GUnshareWithMeAction", "title"))),
                                event.sender.setEnabled(selection.length > 0),
                                event.sender.setVisible(
                                    !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                        this._checkItemPermission(selection, GDriveItem.Permission.UnshareWithMe)
                                ));
                        },
                    },
                ];
            }),
            (GFilesPanelViewNative.prototype._buildContextMenu = function () {
                ((this._contextMenu = new GMenu(null, "g-file-panel-context-menu")), this._setContextMenuActiveRangeSize());
                (this._getNativeMenuItems().forEach((menuItem) => {
                    this._contextMenu.createAddItem(menuItem.caption, menuItem.click).addEventListener(GMenuItem.UpdateEvent, menuItem.update.bind(this));
                }),
                    this._createContextMenuDownloadMenu());
            }),
            (GFilesPanelViewNative.prototype._buildAdditionalContextMenu = function () {}),
            (GFilesPanelViewNative.prototype._createContextMenuDownloadMenu = async function () {
                this._contextMenu
                    .createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.download-title")), () => {
                        (1 === this.filesPanel.getSelection().length
                            ? gDesigner.stats("filespanel-view_download_file")
                            : gDesigner.stats("filespanel-view_download_multiple-files"),
                            this.filesPanel.handleDownload());
                    })
                    .addEventListener(GMenuItem.UpdateEvent, (event) => {
                        var selection = this.filesPanel.getSelection();
                        (this._updateMenuItemCaption(event.sender, GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.download-title")), selection),
                            event.sender.setEnabled(selection.length > 0),
                            event.sender.setVisible(
                                !(0, driveUtils.hasRootFolderInSelections)(this.filesPanel.drive, selection) &&
                                    this._checkItemPermission(selection, GDriveItem.Permission.Download) &&
                                    !this._isFolderSelected()
                            ));
                    });
            }),
            (GFilesPanelViewNative.prototype.toggleFolders = function (visible) {
                this.panel.find(".g-left-side").toggleClass("g-no-display", !visible);
            }),
            (GFilesPanelViewNative.prototype.getSearchValue = function () {
                const value = this.panel.find(".header").find(".search-container").find(".search-field").val();
                return value ? value.trim() : "";
            }),
            (GFilesPanelViewNative.prototype.focusFileNameInput = function (file) {
                (this.setFileNameInputValue(file.name), this.panel.find(".footer").find("input.file-name").focus().select());
            }),
            (GFilesPanelViewNative.prototype.setFileNameInputValue = function (value) {
                this.panel.find(".footer").find("input.file-name").val(value);
            }),
            (GFilesPanelViewNative.prototype._isDuringRenaming = function () {
                return !!this.panel.find(".g-gravit-file.selected.renaming").length;
            }),
            (GFilesPanelViewNative.prototype._expandSelectedFolder = function () {
                $(".g-gravit-folder.opened .folder-state-icon.closed").click();
            }),
            (GFilesPanelViewNative.prototype.setLockEnterState = function (locked) {
                this._lockEnter = locked;
            }),
            (GFilesPanelViewNative.prototype._isUserInputValidFileName = function (fileName) {
                return GRegex.String.ValidFileName.test(fileName);
            }),
            (GFilesPanelViewNative.prototype._getSelectedFolderUIElement = function () {
                return $(".g-gravit-folder.g-cloud-element.selected");
            }),
            (module.exports = GFilesPanelViewNative));
    };
