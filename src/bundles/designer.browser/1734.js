module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(4), require(41), require(13), require(38));
        const { watchDog } = require(40 /* Utils */),
            GShareRoleFactory = require(433),
            methods = {
                init: function (options) {
                    return (
                        (options = $.extend({ defaultRole: null, buttons: [] }, options)),
                        this.each(function () {
                            const assignableRoles = GShareRoleFactory.ROLES.ALL.filter((role) => role.isAssignable()),
                                overlay = $("<div/>")
                                    .gOverlay({
                                        padding: false,
                                        clazz: "g-role-selector-overlay",
                                        releaseOnClose: false,
                                    })
                                    .addClass("g-role-selector-container")
                                    .append(
                                        $("<div/>")
                                            .addClass("g-role-selector-roles")
                                            .append(
                                                assignableRoles.map((role) =>
                                                    $("<div/>")
                                                        .attr("role-id", role.id)
                                                        .addClass("g-role-selector-role")
                                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-role-checked"))
                                                        .append(
                                                            $("<div/>")
                                                                .addClass("g-role-selector-role-container")
                                                                .append(
                                                                    $("<span/>").addClass("name").text(role.name).gPro({
                                                                        pro: !!role.pro,
                                                                        badgeAlwaysVisible: true,
                                                                    })
                                                                )
                                                                .append($("<span/>").addClass("text").text(role.description))
                                                        )
                                                        .on(
                                                            "click",
                                                            watchDog.trap(
                                                                () => {
                                                                    (methods.role.call(this, role),
                                                                        $(this).trigger("rolechange", role),
                                                                        overlay.gOverlay("close"));
                                                                },
                                                                () => !role.pro
                                                            )
                                                        )
                                                )
                                            )
                                    );
                            options.buttons &&
                                options.buttons.length &&
                                (overlay.append($("<hr/>")),
                                overlay.append(
                                    $("<div/>")
                                        .addClass("g-role-selector-buttons")
                                        .append(
                                            options.buttons.map((button) => {
                                                let { icon, label, click, closeOnClick } = button;
                                                return $("<div/>")
                                                    .addClass("g-role-selector-button")
                                                    .append(
                                                        $("<span/>")
                                                            .addClass("icon")
                                                            .addClass(icon || "")
                                                    )
                                                    .append($("<span/>").addClass("label").text(label))
                                                    .on("click", () => {
                                                        (click(), closeOnClick && overlay.gOverlay("close"));
                                                    });
                                            })
                                        )
                                ));
                            const element = $(this)
                                    .data("options", options)
                                    .data("overlay", overlay)
                                    .addClass("g-role-selector")
                                    .append($("<label/>"))
                                    .append($("<span/>").addClass("gravit-icon-down"))
                                    .on("click", (event) => {
                                        overlay.gOverlay("open", $(event.target).closest(".g-role-selector"));
                                    }),
                                selectedRole = options.defaultRole || assignableRoles[0];
                            return (methods.role.call(this, selectedRole), element);
                        })
                    );
                },
                role: function (role) {
                    let savePreviousRole = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (arguments.length > 0) {
                        const element = $(this);
                        let previousRole = savePreviousRole && element.data("options") ? element.data("options").role : null;
                        ((element.data("options").previousRole = previousRole), (element.data("options").role = role), element.find("label").text(role.name));
                        const overlay = element.data("overlay");
                        return (
                            overlay.find(".g-role-selector-role.g-selected").removeClass("g-selected"),
                            overlay.find('[role-id="'.concat(role.id, '"]')).addClass("g-selected"),
                            this
                        );
                    }
                    return $(this).data("options").role;
                },
                restoreRole: function () {
                    const element = $(this);
                    element.data("options").previousRole && methods.role.call(this, element.data("options").previousRole, false);
                },
            };
        $.fn.gRoleSelector = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.gRoleSelector")
                  : methods.init.apply(this, arguments);
        };
    };
