module.exports = function (module, exports, require) {
        "use strict";
        (require(290), require(4), require(41), require(13), require(38));
        const { watchDog } = require(40 /* Utils */),
            i = require(433),
            a = {
                init: function (e) {
                    return (
                        (e = $.extend({ defaultRole: null, buttons: [] }, e)),
                        this.each(function () {
                            const t = i.ROLES.ALL.filter((e) => e.isAssignable()),
                                n = $("<div/>")
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
                                                t.map((e) =>
                                                    $("<div/>")
                                                        .attr("role-id", e.id)
                                                        .addClass("g-role-selector-role")
                                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-role-checked"))
                                                        .append(
                                                            $("<div/>")
                                                                .addClass("g-role-selector-role-container")
                                                                .append(
                                                                    $("<span/>").addClass("name").text(e.name).gPro({
                                                                        pro: !!e.pro,
                                                                        badgeAlwaysVisible: true,
                                                                    })
                                                                )
                                                                .append($("<span/>").addClass("text").text(e.description))
                                                        )
                                                        .on(
                                                            "click",
                                                            watchDog.trap(
                                                                () => {
                                                                    (a.role.call(this, e),
                                                                        $(this).trigger("rolechange", e),
                                                                        n.gOverlay("close"));
                                                                },
                                                                () => !e.pro
                                                            )
                                                        )
                                                )
                                            )
                                    );
                            e.buttons &&
                                e.buttons.length &&
                                (n.append($("<hr/>")),
                                n.append(
                                    $("<div/>")
                                        .addClass("g-role-selector-buttons")
                                        .append(
                                            e.buttons.map((e) => {
                                                let { icon, label, click, closeOnClick } = e;
                                                return $("<div/>")
                                                    .addClass("g-role-selector-button")
                                                    .append(
                                                        $("<span/>")
                                                            .addClass("icon")
                                                            .addClass(icon || "")
                                                    )
                                                    .append($("<span/>").addClass("label").text(label))
                                                    .on("click", () => {
                                                        (click(), closeOnClick && n.gOverlay("close"));
                                                    });
                                            })
                                        )
                                ));
                            const r = $(this)
                                    .data("options", e)
                                    .data("overlay", n)
                                    .addClass("g-role-selector")
                                    .append($("<label/>"))
                                    .append($("<span/>").addClass("gravit-icon-down"))
                                    .on("click", (e) => {
                                        n.gOverlay("open", $(e.target).closest(".g-role-selector"));
                                    }),
                                s = e.defaultRole || t[0];
                            return (a.role.call(this, s), r);
                        })
                    );
                },
                role: function (e) {
                    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (arguments.length > 0) {
                        const n = $(this);
                        let o = t && n.data("options") ? n.data("options").role : null;
                        ((n.data("options").previousRole = o), (n.data("options").role = e), n.find("label").text(e.name));
                        const i = n.data("overlay");
                        return (
                            i.find(".g-role-selector-role.g-selected").removeClass("g-selected"),
                            i.find('[role-id="'.concat(e.id, '"]')).addClass("g-selected"),
                            this
                        );
                    }
                    return $(this).data("options").role;
                },
                restoreRole: function () {
                    const e = $(this);
                    e.data("options").previousRole && a.role.call(this, e.data("options").previousRole, false);
                },
            };
        $.fn.gRoleSelector = function (e) {
            return a[e]
                ? a[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.gRoleSelector")
                  : a.init.apply(this, arguments);
        };
    };
