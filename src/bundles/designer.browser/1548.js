module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(4), require(13), require(38));
        const CloudFile = require(156);
        function GFolderView(folder, parent, isRootFolder) {
            var element;
            ((this._folder = folder),
                (this._isRootFolder = isRootFolder),
                (this._container = $("<div/>").addClass("g-container").data("node", folder)),
                (this._element = element =
                    $("<div/>")
                        .addClass("g-gravit-folder")
                        .addClass("g-cloud-element")
                        .attr("data-title", folder.name)
                        .data("node", folder)
                        .appendTo(this._container)),
                (this._childrenContainer = $("<div/>").addClass("g-children").appendTo(this._container)),
                (this._folderContainer = $("<div/>").addClass("folder-container").appendTo(element)),
                (this._folderState = $("<div />").addClass("folder-state-icon").appendTo(this._folderContainer)),
                (this._folderIcon = $("<div />").addClass("folder-icon").appendTo(this._folderContainer)),
                $("<div />").addClass("name").text(folder.name).appendTo(this._folderContainer),
                $("<input />")
                    .attr("type", "text")
                    .css("display", "none")
                    .addClass("folder-name")
                    .css("width", this._folderContainer.find(".name").outerWidth())
                    .val(folder.name)
                    .appendTo(this._folderContainer),
                (this._parent = parent),
                (this._folderContext = $("<div/>")
                    .addClass("folder-context")
                    .append(
                        $("<span />")
                            .addClass("icon")
                            .addClass("gravit-icon-w-kebab")
                            .on("mouseover", function (event) {
                                event.stopPropagation();
                            })
                    )
                    .on("mouseover", function (event) {
                        event.stopPropagation();
                    })
                    .appendTo(element)),
                this._update());
        }
        ((GFolderView.prototype._isRootFolder = false),
            (GFolderView.prototype._parent = null),
            (GFolderView.prototype._container = null),
            (GFolderView.prototype._element = null),
            (GFolderView.prototype._folderContainer = null),
            (GFolderView.prototype._folderContext = null),
            (GFolderView.prototype._folder = null),
            (GFolderView.prototype._loading = false),
            (GFolderView.prototype._children = null),
            (GFolderView.prototype._isOpen = false),
            (GFolderView.prototype._done = false),
            (GFolderView.prototype.isRootFolder = function () {
                return this._isRootFolder;
            }),
            (GFolderView.prototype.isLoading = function () {
                return this._loading;
            }),
            (GFolderView.prototype.getFolder = function () {
                return this._folder;
            }),
            (GFolderView.prototype.getParent = function () {
                return this._parent;
            }),
            (GFolderView.prototype.setLoading = function (loading) {
                this._loading !== loading && ((this._loading = loading), this._update());
            }),
            (GFolderView.prototype.onToggle = function (callback) {
                return ((this._onToggle = callback), this);
            }),
            (GFolderView.prototype.toggleState = function () {
                (gDesigner.stats("filespanel_expand-collapse_cloudfolder"),
                    this._folderState.removeClass("open"),
                    this._folderState.removeClass("closed"),
                    (this._isOpen = !this._isOpen),
                    this._update(),
                    this._onToggle && this._onToggle(this._isOpen));
            }),
            (GFolderView.prototype.isStateOpen = function () {
                return this._isOpen;
            }),
            (GFolderView.prototype.update = function () {
                this._update();
            }),
            (GFolderView.prototype.setRefreshHandler = function (callback) {
                return ((this._refreshCallback = callback), this);
            }),
            (GFolderView.prototype.isDone = function () {
                return this._done;
            }),
            (GFolderView.prototype.loadChildrenOnDemand = function (loadMore) {
                this.setLoading(true);
                const offset = (this._children || []).length;
                return loadMore(this._folder, 100, offset)
                    .then((children) => {
                        ((this._done = children.length < 100),
                            children.length &&
                                (this._childrenContainer.append(children.map((child) => child.getHTMLContainer())),
                                (this._children = this._children.concat(children))),
                            this.update());
                    })
                    .finally(() => {
                        this.setLoading(false);
                    });
            }),
            (GFolderView.prototype.refresh = function () {
                return (this.setChildren([]), this.update(), this._refreshCallback && this._refreshCallback(this));
            }),
            (GFolderView.prototype._update = function () {
                (this._children && this._children.length
                    ? (this._folderState.addClass(this._isOpen ? "open" : "closed"),
                      this._isOpen ? this._childrenContainer.show() : this._childrenContainer.hide())
                    : this._childrenContainer.hide(),
                    this._folderIcon.empty(),
                    this._folderIcon.append(
                        $("<div />")
                            .addClass("icon")
                            .addClass(this._loading ? "loading" : this._folder.getIcon() || "gravit-icon-w-folder")
                    ));
            }),
            (GFolderView.prototype.onClick = function (callback) {
                return (
                    this._folderContainer.on("click", (event) => {
                        (event.stopPropagation(), callback(this._folder, this.getHTMLElement()));
                    }),
                    this
                );
            }),
            (GFolderView.prototype.onDoubleClick = function (callback) {
                return (
                    this._folderContainer.on("dblclick", (event) => {
                        (event.stopPropagation(), callback(this._folder, this.getHTMLElement()));
                    }),
                    this
                );
            }),
            (GFolderView.prototype.onFolderStateClick = function (callback) {
                return (
                    this._folderState.on("click", (event) => {
                        (event.stopPropagation(), callback(this._folder, this.getHTMLElement()));
                    }),
                    this
                );
            }),
            (GFolderView.prototype.onContext = function (callback) {
                return (
                    this._folderContext &&
                        (this._element.on("contextmenu", (event) => {
                            (event.stopPropagation(), callback(this._folder, this.getHTMLElement(), event));
                        }),
                        this._folderContext.on("click", (event) => {
                            (event.stopPropagation(), callback(this._folder, this.getHTMLElement(), event));
                        })),
                    this
                );
            }),
            (GFolderView.prototype.onFileDrop = function (callback) {
                let timeoutId = null,
                    self = this;
                return (
                    this._element
                        .on("drop", async function (event) {
                            $(this).removeClass("drag-over");
                            const dataTransfer = event.originalEvent.dataTransfer,
                                fileData = JSON.parse(dataTransfer.getData("text"));
                            var droppedFile = CloudFile.from(fileData);
                            callback(droppedFile, self._folder);
                        })
                        .on("dragover", function (event) {
                            ($(this).addClass("drag-over"),
                                timeoutId ||
                                    (timeoutId = setTimeout(() => {
                                        self._isOpen || self._folderState.trigger("click");
                                    }, 1e3)));
                        })
                        .on("dragleave", function (event) {
                            ($(this).removeClass("drag-over"), timeoutId && clearTimeout(timeoutId), (timeoutId = null));
                        }),
                    this
                );
            }),
            (GFolderView.prototype.getHTMLContainer = function () {
                return this._container;
            }),
            (GFolderView.prototype.setChildren = function (children) {
                ((this._children = children),
                    this._childrenContainer.empty(),
                    (this._children && this._children.length) || (this._isOpen = false),
                    this._children && this._children.length && this._childrenContainer.append(children.map((child) => child.getHTMLContainer())));
            }),
            (GFolderView.prototype.getChildren = function () {
                return this._children;
            }),
            (GFolderView.prototype.getHTMLElement = function () {
                return this._element;
            }),
            (module.exports = GFolderView));
    };
