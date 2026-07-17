module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = (require(18 /* GCategory */), require(31 /* GAction */));
        function a(e) {
            let { name, category, group, link, icon, builder } = e;
            ((this._name = name),
                (this._category = category),
                (this._group = group),
                (this._link = link),
                (this._builder = builder),
                (this._title = new GObject.GLocaleKey("GOpenLinkAction", "title." + name)),
                (this._icon = icon));
        }
        ((a.Links = require(1622)),
            GObject.GObject.inherit(a, i),
            (a.ID = "open-link"),
            (a.prototype._name = null),
            (a.prototype._title = null),
            (a.prototype.getIcon = function () {
                return this._icon || null;
            }),
            (a.prototype.getId = function () {
                return a.ID + "." + this._name;
            }),
            (a.prototype.getTitle = function () {
                return this._title;
            }),
            (a.prototype.getCategory = function () {
                return this._category;
            }),
            (a.prototype.getGroup = function () {
                return this._group;
            }),
            (a.prototype.isEnabled = function () {
                return true;
            }),
            (a.prototype.execute = function () {
                if (this._link || this._builder) {
                    let e = (this._builder && "function" == typeof this._builder && this._builder()) || this._link;
                    e && gContainer.openExternalLink(null, e);
                }
            }),
            (a.prototype.toString = function () {
                return "[Object GOpenLinkAction]";
            }),
            (module.exports = a));
    };
