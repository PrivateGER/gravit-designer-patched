module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            DragMode = _interopRequireDefault(require(565)),
            methods = {
                init: function (options) {
                    return (
                        (options = $.extend({ allowDrag: true, allowDrop: true }, options)),
                        this.each(function () {
                            var element = this,
                                target = $(this);
                            (target.data("gpatterntarget", {
                                options: options,
                                pattern: null,
                                types: null,
                            }),
                                options.allowDrag &&
                                    target
                                        .attr("draggable", "true")
                                        .attr("data-drag-mode", DragMode.default.PRESS_AND_HOLD)
                                        .on("dragstart", function (event) {
                                            var originalEvent = event.originalEvent,
                                                pattern = target.data("gpatterntarget").pattern;
                                            if (pattern) {
                                                (originalEvent.stopPropagation(), target.trigger("patterndrag", pattern));
                                                var dragImage = gDragImage().css({
                                                    background: GObject.GPattern.asCSSBackground(pattern),
                                                    width: "20px",
                                                    height: "20px",
                                                });
                                                (originalEvent.dataTransfer.setDragImage(dragImage[0], 10, 10),
                                                    (originalEvent.dataTransfer.effectAllowed = "move"),
                                                    originalEvent.dataTransfer.setData(GObject.GPattern.MIME_TYPE, GObject.GPattern.serialize(pattern)),
                                                    (originalEvent.dataTransfer.sourceElement = this));
                                            } else originalEvent.preventDefault();
                                        })
                                        .on("dragend", function (event) {
                                            event.stopPropagation();
                                        }),
                                options.allowDrop &&
                                    target
                                        .on("dragover", function (event) {
                                            event.stopPropagation();
                                            var originalEvent = event.originalEvent;
                                            (originalEvent.preventDefault(), originalEvent.stopPropagation(), (event.originalEvent.dataTransfer.dropEffect = "move"));
                                        })
                                        .on("drop", function (event) {
                                            event.stopPropagation();
                                            var targetData = target.data("gpatterntarget"),
                                                originalEvent = event.originalEvent,
                                                droppedPattern = originalEvent.dataTransfer.getData(GObject.GPattern.MIME_TYPE);
                                            if (droppedPattern && (droppedPattern = GObject.GPattern.deserialize(droppedPattern))) {
                                                var allowed = true;
                                                if (targetData.types && targetData.types.length > 0) {
                                                    allowed = false;
                                                    for (var c = 0; c < targetData.types.length; ++c)
                                                        if (targetData.types[c] && droppedPattern instanceof targetData.types[c]) {
                                                            allowed = true;
                                                            break;
                                                        }
                                                }
                                                if (allowed) {
                                                    var currentPattern = target.data("gpatterntarget").pattern;
                                                    (GObject.GUtil.equals(droppedPattern, currentPattern) || (methods.value.call(element, droppedPattern), target.trigger("patternchange", droppedPattern)),
                                                        target.trigger("patterndrop", [droppedPattern, originalEvent]));
                                                }
                                            }
                                            return false;
                                        }));
                        })
                    );
                },
                value: function (value) {
                    var target = $(this),
                        targetData = target.data("gpatterntarget") || {};
                    return arguments.length
                        ? ((value = "string" == typeof value ? GObject.GPattern.deserialize(value) : value), (targetData.pattern = value), this)
                        : targetData.pattern || null;
                },
                types: function (types) {
                    var target = $(this),
                        targetData = target.data("gpatterntarget");
                    return arguments.length ? ((targetData.types = types), this) : targetData.types;
                },
            };
        $.fn.gPatternTarget = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
