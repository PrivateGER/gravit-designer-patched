module.exports = function (module, exports, require) {
        "use strict";
        (require(168 /* PDFFetchStream */), require(4), require(41), require(13), require(169 /* PDFNetworkStream */));
        var GObject = require(1);
        const GMenu = require(238),
            renderDropdownCaption = (element) => {
                element.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .append($("<span/>").addClass("gravit-icon-pages"))
                        .append($("<span/>").addClass("caption"))
                        .append($("<span/>").addClass("gravit-icon-down"))
                );
            },
            renderTouchButton = (element, reference) => {
                element.empty()
                    .append(
                        $("<div />")
                            .addClass("action-button")
                            .append($("<span />").addClass("gravit-icon-touch-pages-panel"))
                            .append($("<span />").addClass("caption"))
                    )
                    .append(reference);
            },
            methods = {
                init: function () {
                    return this.each(function () {
                        const element = $(this),
                            dropdownButton = $("<button />").addClass("dropdown-button").append($("<span></span>").addClass("gravit-icon-down"));
                        element.data("g-page-button-dropdownbutton", dropdownButton);
                        let menu = new GMenu(void 0, "g-page-menu");
                        (element.addClass("g-page-button").gMenuButton({
                            menu: () => {
                                const scene = element.data("options") && element.data("options").scene;
                                return (
                                    scene &&
                                        (menu.clearItems(),
                                        scene
                                            .getChildren()
                                            .filter((child) => child instanceof GObject.GPage && child.isVisible())
                                            .reduce(
                                                (menuAcc, page) => (
                                                    menuAcc.createAddItem(page.getLabel(), () => {
                                                        page.setFlag(GObject.GNode.Flag.Active);
                                                    }),
                                                    menuAcc
                                                ),
                                                menu
                                            )),
                                    menu
                                );
                            },
                            getActiveItem: () => {
                                const scene = element.data("options") && element.data("options").scene;
                                if (scene) {
                                    const activePage = scene.getActivePage();
                                    if (activePage) return menu.findItem(activePage.getLabel());
                                }
                                return null;
                            },
                            reference: () => (gDesigner.isTouchEnabled() ? dropdownButton : null),
                        }),
                            gDesigner.isTouchEnabled() ? renderTouchButton(element) : renderDropdownCaption(element));
                    });
                },
                scene: function (newScene) {
                    const element = $(this),
                        options = element.data("options") || {};
                    return (
                        options.scene !== newScene &&
                            (options.scene && options.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, methods._afterFlagChangeEvent, this),
                            (options.scene = newScene),
                            newScene &&
                                (methods._activatePage.call(this, newScene.getActivePage()),
                                newScene.addEventListener(GObject.GNode.AfterFlagChangeEvent, methods._afterFlagChangeEvent, this))),
                        element.data("options", options),
                        this
                    );
                },
                reinit: function () {
                    const element = $(this);
                    gDesigner.isTouchEnabled() ? renderTouchButton(element, element.data("g-page-button-dropdownbutton")) : renderDropdownCaption(element);
                    const scene = (element.data("options") || {}).scene;
                    scene &&
                        (methods._activatePage.call(this, scene.getActivePage()),
                        scene.hasEventListeners(GObject.GNode.AfterFlagChangeEvent, methods._afterFlagChangeEvent, this) ||
                            scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, methods._afterFlagChangeEvent, this));
                },
                release: function () {
                    const element = $(this),
                        options = element.data("options");
                    return (
                        options && options.scene && options.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, methods._afterFlagChangeEvent, this),
                        element.remove(),
                        this
                    );
                },
                _afterFlagChangeEvent: function (event) {
                    event.node instanceof GObject.GPage && event.flag === GObject.GNode.Flag.Active && methods._activatePage.call(this, event.node);
                },
                _activatePage: function (page) {
                    $(this)
                        .find(".caption")
                        .text(page ? page.getLabel() : "");
                },
            };
        $.fn.gPageButton = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.gPageButton")
                  : methods.init.apply(this, arguments);
        };
    };
