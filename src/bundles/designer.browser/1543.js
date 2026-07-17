module.exports = function (module, exports, require) {
        "use strict";
        (require(168 /* PDFFetchStream */), require(4), require(13), require(169 /* PDFNetworkStream */));
        const GFitAllAction = require(449),
            GFitSelectionAction = require(566),
            GSaveAction = require(447),
            GUndoAction = require(1171),
            GMagnificationAction = require(1167),
            GOpenAction = require(813),
            GGravitCloudAction = require(448),
            GSaveAsAction = require(445),
            GCloudSynchronizationAction = require(1293),
            GMenu = require(238),
            GMenuItem = require(339),
            CLOUD_ICONS = require(257),
            GContainer = require(85),
            { GSystem, GMath } = require(1 /* GObject */),
            { FILE_FORMATS } = require(10 /* designerConfig */);
        module.exports = function (toolbarClass) {
            ((toolbarClass.prototype._windowButton = null),
                (toolbarClass.prototype._nativeButton = null),
                (toolbarClass.prototype._touchSection = null),
                (toolbarClass.prototype._updateTouchUI = function () {
                    (this._touchSection || (this._touchSection = this._createTouchSection().prependTo(this._htmlElement)),
                        this._windowButton || (this._windowButton = this._createWindowButton().hide().insertBefore(this._exportButton)),
                        this._nativeButton ||
                            (gContainer.getRuntime() === GContainer.Runtime.Electron &&
                                GSystem.operatingSystem !== GSystem.OperatingSystem.OSX_IOS &&
                                (this._nativeButton = this._createNativeButton().appendTo(this._htmlElement.find(".export-section")))));
                    (!gDesigner.getApplicationManager().isEditingEnabled() ? this._updateTouchSimpleUI() : this._updateTouchFullUI(),
                        this._updateActiveWindow(),
                        this._updateZoomFromWindow(true),
                        this._updateActions(),
                        this._updateContextTools(),
                        this._updateViewBasedOnPermissions());
                }),
                (toolbarClass.prototype._updateViewBasedOnPermissions = function () {
                    this._windowButton &&
                        (gDesigner.getApplicationManager().isDocumentTabManagementEnabled()
                            ? this._windowButton.show()
                            : this._windowButton.hide());
                }),
                (toolbarClass.prototype._updateTouchFullUI = function () {
                    this._htmlElement.find(".menu-section > .zoom-button").length ||
                        (this._touchZoomButton && (this._touchZoomButton = null),
                        this._initTouchZoomButton(),
                        this._touchZoomButton.insertBefore(".menu-section > .snap-button"));
                }),
                (toolbarClass.prototype._updateTouchSimpleUI = function () {
                    (this._updateTouchZoomButtonSimpleUI(), this._updateZoomFromWindow(true), this._updateTouchPageButton());
                }),
                (toolbarClass.prototype._updateTouchZoomButtonSimpleUI = function () {
                    const zoomButton = this._htmlElement.find(".view-section > .zoom-button");
                    zoomButton.is(this._touchZoomButton) ||
                        ((this._touchZoomButton = null), this._initTouchZoomButton(), zoomButton.replaceWith(this._touchZoomButton));
                }),
                (toolbarClass.prototype._updateTouchPageButton = function () {
                    this._pageButton && (this._pageButton.gPageButton("reinit"), this._pageButton.addClass("dropdown"));
                }),
                (toolbarClass.prototype._initTouchZoomButton = function () {
                    const dropdownButton = $("<button />").addClass("dropdown-button").append($("<span></span>").addClass("gravit-icon-down")),
                        zoomMenu = new GMenu(void 0, "g-zoom-menu");
                    this._touchZoomButton = $("<div/>")
                        .addClass("zoom-button")
                        .addClass("toolbar-button")
                        .addClass("action-button")
                        .addClass("g-menu-button")
                        .addClass("dropdown")
                        .append($("<div />").addClass("action-button").append($("<span />").addClass("caption").text("100%")))
                        .append(dropdownButton)
                        .gMenuButton({
                            menu: () => (
                                zoomMenu.clearItems(),
                                [
                                    gDesigner.getAction(GFitAllAction.ID),
                                    gDesigner.getAction(GFitSelectionAction.ID),
                                    gDesigner.getAction("".concat(GMagnificationAction.ID, ".50")),
                                    gDesigner.getAction("".concat(GMagnificationAction.ID, ".100")),
                                    gDesigner.getAction("".concat(GMagnificationAction.ID, ".200")),
                                    gDesigner.getAction("".concat(GMagnificationAction.ID, ".400")),
                                ].reduce((menu, action) => (menu.createAddItem(action), menu), zoomMenu)
                            ),
                            getActiveItem: () => {
                                var activeWindow = gDesigner.getWindows().getActiveWindow(),
                                    zoomPercent = 100 * (activeWindow && activeWindow.getView()).getZoom(),
                                    roundedZoom = zoomPercent && GMath.round(zoomPercent, false, 0),
                                    zoomAction = roundedZoom && gDesigner.getAction("".concat(GMagnificationAction.ID, ".").concat(roundedZoom)),
                                    zoomTitle = zoomAction && zoomAction.getTitle();
                                return zoomTitle && zoomMenu.findItem(zoomTitle);
                            },
                            reference: dropdownButton,
                        });
                }),
                (toolbarClass.prototype._getTouchMenubarIcon = function () {
                    return gContainer.getRuntime() === GContainer.Runtime.IPad ? "gravit-icon-touch-menubar-ipad" : "gravit-icon-touch-menubar";
                }),
                (toolbarClass.prototype._createTouchSection = function () {
                    return (
                        this._touchZoomButton || this._initTouchZoomButton(),
                        $("<div></div>")
                            .addClass("section menu-section g-touch-only")
                            .append(
                                this._createLabelButton({
                                    icon: this._getTouchMenubarIcon(),
                                    menu: () => {
                                        const mainMenu = gDesigner.getMainMenu();
                                        return (mainMenu.detach(), mainMenu);
                                    },
                                }).addClass("menubar-toolbar-button")
                            )
                            .append(
                                this._createLabelButton({
                                    icon: "gravit-icon-open",
                                    split: true,
                                    menu: () => this._createOpenMenu(),
                                    click: () => gDesigner.executeAction(GOpenAction.ID),
                                }).addClass("open-toolbar-button")
                            )
                            .append(this._createSaveButtonGroup())
                            .append(
                                this._createLabelButton({
                                    action: gDesigner.getAction(GUndoAction.ID),
                                    icon: "gravit-icon-undo",
                                    split: true,
                                    menu: () => this._createQuickHistoryUndoRedoMenu(),
                                    click: () => gDesigner.executeAction(GUndoAction.ID),
                                }).addClass("undo-toolbar-button")
                            )
                            .append(this._touchZoomButton)
                            .append(this._createSnapButton())
                    );
                }),
                (toolbarClass.prototype._createSaveButtonGroup = function () {
                    const saveAction = gDesigner.getAction(GSaveAction.ID);
                    return this._createLabelButton({
                        icon: "gravit-icon-save",
                        split: true,
                        menu: [
                            gDesigner.getAction("".concat(GSaveAsAction.ID, ".").concat(FILE_FORMATS.find((format) => format.default).ext)),
                            gDesigner.getAction("".concat(GGravitCloudAction.ID, ".").concat(GGravitCloudAction.Actions.SaveAs)),
                            gDesigner.getAction(GCloudSynchronizationAction.ID),
                        ].reduce((menu, action) => (menu.createAddItem(action), menu), new GMenu()),
                        click: () => gDesigner.executeAction(GSaveAction.ID),
                    })
                        .addClass("save-toolbar-button")
                        .attr("data-action", saveAction.getId())
                        .data("action", saveAction);
                }),
                (toolbarClass.prototype._createWindowButton = function () {
                    const windowMenu = new GMenu();
                    return this._createLabelButton({
                        caption: " ",
                        menu: () => {
                            windowMenu.clearItems();
                            const windows = gDesigner.getWindows();
                            return windows.getWindows().reduce((menu, window) => (this._createAndAppendWindowTabToMenu(windows, menu, window), menu), windowMenu);
                        },
                        getActiveItem: () => this._findActiveWindowItemInMenu(windowMenu),
                    })
                        .addClass("window-button")
                        .addClass("g-touch-only");
                }),
                (toolbarClass.prototype._createAndAppendWindowTabToMenu = function (windows, menu, window) {
                    const title = this._getWindowTitle(window),
                        menuItem = menu.createAddItem(title, () => {
                            windows.activateWindow(window, true);
                        });
                    (menuItem.setDetachable(true),
                        menuItem.addEventListener(GMenuItem.DetachEvent, () => {
                            windows.removeWindow(window);
                        }));
                    const doc = window.getDocument();
                    doc && (doc.isCloudFile() || doc.isExternalFile()) && menuItem.setIcon(CLOUD_ICONS["gravit-icon-cloud"]);
                }),
                (toolbarClass.prototype._findActiveWindowItemInMenu = function (menu) {
                    const windows = gDesigner.getWindows(),
                        activeWindow = windows && windows.getActiveWindow(),
                        title = this._getWindowTitle(activeWindow);
                    return title && menu.findItem(title);
                }),
                (toolbarClass.prototype._createNativeButton = function () {
                    const e = (e) => $("<button/>").addClass("native-button").append($("<span/>").addClass(e));
                    return this._createLabelButton({
                        caption: "",
                        icon: "gravit-icon-3-dots",
                        click: (event) => {
                            $("<div/>")
                                .append(
                                    $("<div/>")
                                        .addClass("container")
                                        .append(e("gravit-icon-minimize").on("click", () => gContainer.minimizeWindow()))
                                        .append(e("gravit-icon-maximize").on("click", () => gContainer.maximizeWindow()))
                                        .append(e("gravit-icon-close").on("click", () => gContainer.closeWindow()))
                                )
                                .gOverlay({
                                    releaseOnClose: true,
                                    clazz: "g-toolbar-native-button-overlay",
                                })
                                .gOverlay("open", $(event.target));
                        },
                    })
                        .addClass("native-button")
                        .addClass("g-touch-only");
                }),
                (toolbarClass.prototype._updateActiveWindow = function () {
                    if (gDesigner.isTouchEnabled() && this._windowButton)
                        if (gDesigner.getApplicationManager().isDocumentTabManagementEnabled()) {
                            const activeWindow = gDesigner.getWindows() && gDesigner.getWindows().getActiveWindow();
                            if (activeWindow) {
                                const doc = activeWindow.getDocument();
                                var title = this._getWindowTitle(activeWindow),
                                    truncatedTitle = "..." + title.substr(title.length - 3);
                                const captionElement = this._windowButton
                                    .show()
                                    .toggleClass("syncing", doc && doc.isSynchronizing())
                                    .find(".action-button .caption")
                                    .text(title);
                                (this._windowButton.find(".subicon").remove(), this._windowButton.find(".ending").remove());
                                var isOverflowing = captionElement[0].offsetWidth < captionElement[0].scrollWidth;
                                (this._windowButton.toggleClass("text-overflow", isOverflowing),
                                    isOverflowing &&
                                        $("<span/>")
                                            .addClass("ending")
                                            .attr("data-ending", truncatedTitle)
                                            .insertBefore(this._windowButton.find(".gravit-icon-down")),
                                    this._windowButton.find(".subicon").remove(),
                                    doc &&
                                        (doc.isCloudFile() || doc.isExternalFile()) &&
                                        $("<span/>")
                                            .addClass("subicon")
                                            .addClass(CLOUD_ICONS["gravit-icon-cloud-window"])
                                            .insertBefore(this._windowButton.find(".gravit-icon-down")));
                            } else this._windowButton.hide();
                        } else this._windowButton.hide();
                }),
                (toolbarClass.prototype._getWindowTitle = function (window) {
                    const doc = window && window.getDocument();
                    return window && "".concat(window.getTitleWithExtension()).concat(doc && doc.isModified() ? "*" : "");
                }));
        };
    };
