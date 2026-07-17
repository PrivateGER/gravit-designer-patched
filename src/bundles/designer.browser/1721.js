module.exports = function (module, exports, require) {
        "use strict";
        require(57);
        var GMenuCloseEvent = require(1156),
            GPosition = require(444),
            methods = {
                init: function (options) {
                    return (
                        (options = $.extend(
                            {
                                menu: null,
                                defaultAction: null,
                                dblclick: null,
                                touch: false,
                                reference: null,
                            },
                            options
                        )),
                        this.each(function () {
                            var button = this,
                                timer = null;
                            ("function" == typeof options.menu && ((options.menuFactory = options.menu), (options.menu = options.menuFactory())),
                                options.menu.setTouchMode(!!options.touch));
                            $(this)
                                .addClass("g-menu-button")
                                .data("gmenubutton", { options: options })
                                .on("mousedown", function (event) {
                                    if ((event.stopPropagation(), options.menuFactory)) {
                                        const newMenu = options.menuFactory();
                                        if (newMenu !== options.menu) {
                                            options.menu.clearItems();
                                            for (let n = 0; n < newMenu.getItemCount(); ++n) options.menu.addItem(newMenu.getItem(n));
                                        }
                                    }
                                    options.dblclick
                                        ? setTimeout(() => {
                                              parseInt($(button).data("dblclicked"), 10)
                                                  ? options.menu.isOpen() && methods.close.call(button)
                                                  : options.defaultAction
                                                    ? (timer = setTimeout(
                                                          function () {
                                                              (methods.open.call(button), (timer = null));
                                                          }.bind(this),
                                                          250
                                                      ))
                                                    : options.menu.isOpen()
                                                      ? methods.close.call(button)
                                                      : methods.open.call(button);
                                          }, 500)
                                        : options.defaultAction
                                          ? (timer = setTimeout(
                                                function () {
                                                    (methods.open.call(button), (timer = null));
                                                }.bind(this),
                                                250
                                            ))
                                          : options.menu.isOpen()
                                            ? methods.close.call(button)
                                            : methods.open.call(button);
                                })
                                .on("mouseup", function (event) {
                                    (event.stopPropagation(),
                                        options.dblclick
                                            ? setTimeout(() => {
                                                  var clickCount = parseInt($(button).data("dblclicked"), 10);
                                                  clickCount
                                                      ? $(button).data("dblclicked", clickCount - 1)
                                                      : (null !== timer && (clearTimeout(timer), (timer = null)),
                                                        !options.menu.isOpen() && options.defaultAction && options.defaultAction());
                                              }, 500)
                                            : (null !== timer && (clearTimeout(timer), (timer = null)),
                                              !options.menu.isOpen() && options.defaultAction && options.defaultAction()));
                                })
                                .on("dblclick", function (event) {
                                    (event.stopPropagation(), options.dblclick && ($(button).data("dblclicked", 2), options.dblclick.call(button)));
                                });
                        })
                    );
                },
                open: function () {
                    var button = $(this),
                        options = button.data("gmenubutton").options,
                        menu = options.menu;
                    if (!menu.isOpen()) {
                        button.addClass("g-active");
                        var reference,
                            onMenuClose = function () {
                                (button.removeClass("g-active"), menu.removeEventListener(GMenuCloseEvent, onMenuClose));
                            };
                        if (
                            (menu.addEventListener(GMenuCloseEvent, onMenuClose),
                            options.reference &&
                                (options.reference instanceof jQuery || options.reference instanceof HTMLElement
                                    ? (reference = options.reference)
                                    : "function" == typeof options.reference && (reference = options.reference())),
                            reference instanceof HTMLElement && (reference = $(reference)),
                            reference || (reference = button),
                            menu.open(reference, GPosition.Position.Center, GPosition.Position.Right_Bottom, function (item) {
                                button.trigger("menuitemactivate", item);
                            }),
                            options.getActiveItem && "function" == typeof options.getActiveItem)
                        ) {
                            const activeItem = options.getActiveItem();
                            activeItem && menu.setActiveItem(activeItem);
                        }
                    }
                },
                close: function () {
                    var menu = $(this).data("gmenubutton").options.menu;
                    menu.isOpen() && menu.close();
                },
            };
        $.fn.gMenuButton = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
