module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(38));
        const { GLocale, GLocaleKey } = require(1 /* GObject */);
        function GCollaborators() {
            throw "No instantiate";
        }
        GCollaborators.Mode = { Online: "online", Offline: "offline" };
        const methods = {
            init: function () {
                return this.each(function () {
                    $(this)
                        .data("mode", GCollaborators.Mode.Online)
                        .addClass("g-collaborators")
                        .append($("<div/>").addClass("g-collaborators-container"));
                });
            },
            mode: function (methodName) {
                const method = methods[methodName];
                return (method && ($(this).data("mode", methodName), method.call(this)), this);
            },
            online: function () {
                const collaborators = $(this).data("collaborators") || [];
                return (methods.collaborators.call(this, collaborators), this);
            },
            offline: function () {
                return (
                    $(this)
                        .find(".g-collaborators-container")
                        .attr("data-title", GLocale.get(new GLocaleKey("GCollaborators", "text.you-are-offline-tooltip")))
                        .empty()
                        .append(
                            $("<div/>").addClass("g-collaborator").addClass("offline").append($("<span/>").addClass("gravit-icon-offline"))
                        )
                        .append($("<span/>").text(GLocale.get(new GLocaleKey("GCollaborators", "text.you-are-offline")))),
                    this
                );
            },
            collaborators: function (collaborators) {
                if (arguments.length > 0) {
                    if (!((collaborators && collaborators.length) || $(this).data("mode") !== GCollaborators.Mode.Offline)) return;
                    const renderCollaborator = (collaborator) => {
                            const color = collaborator.getUserColor(),
                                tooltip = collaborator.getTooltip() || "",
                                icon = collaborator.getIcon(),
                                collaboratorElement = $("<div/>")
                                    .addClass("g-collaborator")
                                    .attr("data-title", tooltip)
                                    .css("border-color", color)
                                    .css("background-color", color)
                                    .append(
                                        $("<span/>")
                                            .addClass("icon")
                                            .addClass(icon || "")
                                            .css("display", icon ? "flex" : "none")
                                    );
                            if (collaborator.hasOwnPictureAvatar()) {
                                const avatarSource = collaborator.avatar;
                                "<svg>" === avatarSource.substr(0, "<svg>".length)
                                    ? $(avatarSource).appendTo(collaboratorElement)
                                    : collaboratorElement.css({ backgroundImage: 'url("'.concat(avatarSource, '")') });
                            } else $("<span/>").text(collaborator.getUserNameInitials()).appendTo(collaboratorElement);
                            return collaboratorElement;
                        },
                        container = $(this)
                            .data("collaborators", collaborators)
                            .find(".g-collaborators-container")
                            .removeAttr("data-title")
                            .empty()
                            .append(collaborators.slice(0, 4).map((collaborator) => renderCollaborator(collaborator)));
                    if (collaborators.length > 4) {
                        const overlay = $("<div/>")
                            .gOverlay({ clazz: "g-collaborators-overlay" })
                            .append(
                                $("<div/>")
                                    .addClass("g-collaborators-container")
                                    .append(
                                        collaborators
                                            .slice(4, collaborators.length)
                                            .map((collaborator) =>
                                                $("<div/>").addClass("g-collaborator-row").append(renderCollaborator(collaborator)).append($("<span/>").text(collaborator.name))
                                            )
                                    )
                            );
                        $("<div/>")
                            .addClass("g-collaborator")
                            .addClass("plus")
                            .append($("<span/>").text("+ ".concat(collaborators.length - 4)))
                            .on("click", (event) => {
                                overlay.gOverlay("open", $(event.target).closest(".g-collaborator"));
                            })
                            .appendTo(container);
                    }
                    return this;
                }
                return $(this).data("collaborators");
            },
        };
        (($.fn.gCollaborators = function (methodName) {
            return methods[methodName]
                ? methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof methodName && methodName
                  ? void $.error("Method " + methodName + " does not exist on jQuery.gCollaborators")
                  : methods.init.apply(this, arguments);
        }),
            (module.exports = GCollaborators));
    };
