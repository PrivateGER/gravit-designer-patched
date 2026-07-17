module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(32), require(33));
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend({}, options)),
                    this.each(function () {
                        var row = $(this);
                        if (
                            (row.addClass("g-property-row"),
                            options.hasOwnProperty("clazz") && row.addClass(options.clazz),
                            options.hasOwnProperty("label") || options.hasOwnProperty("icon"))
                        ) {
                            var labelElement = $('<label class="property-label"></label>').appendTo(row);
                            if (options.hasOwnProperty("icon"))
                                (row.addClass("icon-label"),
                                    labelElement.addClass("strict-line-height"),
                                    "string" == typeof options.icon ? $("<span></span>").addClass(options.icon).appendTo(labelElement) : labelElement.append(options.icon));
                            else {
                                var labelSpan = $("<span />").addClass("vertical-align").appendTo(labelElement);
                                "string" == typeof options.label ? labelSpan.text(options.label) : labelSpan.append(options.label);
                            }
                            options.click &&
                                labelElement
                                    .addClass("clickable")
                                    .find("span")
                                    .append($("<span></span>").addClass("gravit-icon-down click-arrow"))
                                    .on("click", options.click);
                        } else row.addClass("no-label");
                        options.hasOwnProperty("justified") && true === options.justified && row.addClass("justified");
                        var columnsWrapper = $("<div></div>").addClass("columns").appendTo(row);
                        (options.hasOwnProperty("clickable") && options.clickable && columnsWrapper.addClass("clickable"),
                            options.hasOwnProperty("hoverable") && options.hoverable && columnsWrapper.addClass("hoverable"),
                            options.hasOwnProperty("height") && columnsWrapper.css("height", options.height));
                        var hasColumnLabel = false;
                        if (
                            (options.columns.forEach(function (column) {
                                var tag = "<div></div>";
                                column.content && $(column.content).is(":input") && (tag = "<label></label>");
                                var columnElement = $(tag).addClass("column");
                                if (
                                    (column.hasOwnProperty("clazz") && columnElement.addClass(column.clazz),
                                    "auto" === column.width ? columnElement.addClass("auto-grow") : column.width && columnElement.css("width", column.width),
                                    column.prefix)
                                ) {
                                    var prefixHtml = "",
                                        prefixWidth = null;
                                    ("string" == typeof column.prefix
                                        ? (prefixHtml = column.prefix + "&nbsp;")
                                        : ((prefixHtml = column.prefix.label), (prefixWidth = column.prefix.width || null)),
                                        $("<div></div>").addClass("prefix").css("width", prefixWidth).html(prefixHtml).appendTo(columnElement));
                                }
                                (column.content
                                    ? $("<div></div>").addClass("content").append(column.content).appendTo(columnElement)
                                    : column.html
                                      ? $(column.html).appendTo(columnElement)
                                      : columnElement.html("&nbsp;"),
                                    (!column.content || (column.hasOwnProperty("padding") && false === column.padding)) && columnElement.addClass("no-padding"),
                                    column.label && (hasColumnLabel = true),
                                    options.isMenu &&
                                        ($("<div/>")
                                            .addClass("gravit-icon-right")
                                            .click(() => {
                                                column.content.click();
                                            })
                                            .appendTo(columnElement),
                                        columnsWrapper.addClass("no-padding-left")),
                                    options.hasOwnProperty("rawClick") && options.rawClick && columnElement.on("click", options.rawClick),
                                    options.noPaddingRight && columnsWrapper.addClass("no-padding-right"),
                                    columnElement.appendTo(columnsWrapper));
                            }),
                            hasColumnLabel)
                        ) {
                            var labelsRow = $("<div></div>").addClass("labels").appendTo(row);
                            options.columns.forEach(function (column) {
                                var columnLabel = $("<label></label>");
                                (column.label
                                    ? "string" == typeof column.label
                                        ? $("<span></span>")
                                              .text(column.label)
                                              .addClass(column.labelClass ? column.labelClass : "")
                                              .appendTo(columnLabel)
                                        : columnLabel.append(column.label)
                                    : columnLabel.html("&nbsp;"),
                                    "auto" === column.width ? columnLabel.addClass("auto-grow") : column.width && columnLabel.css("width", column.width),
                                    (!column.content || (column.hasOwnProperty("padding") && false === column.padding)) && columnLabel.addClass("no-padding"),
                                    columnLabel.appendTo(labelsRow));
                            });
                        }
                    })
                );
            },
        };
        $.fn.gPropertyRow = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
