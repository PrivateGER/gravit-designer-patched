module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.metaKey = false),
                (i.prototype.ctrlKey = false),
                (i.prototype.shiftKey = false),
                (i.prototype.optionKey = false),
                (i.prototype.spaceKey = false),
                (i.prototype.escapeKey = false),
                (i.prototype.tabKey = false),
                (i.prototype.plusKey = false),
                (i.prototype.minusKey = false),
                (i.prototype.zKey = false),
                (i.prototype.middleButton = false),
                (i.prototype.toString = function () {
                    return "[Object GModifiers]";
                }),
                (module.exports = i));
        };
