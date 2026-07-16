module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = o(require(31)),
            s = o(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        class c extends r.default {
            constructor(e) {
                (super(), (this._type = e), (this._title = new GObject.GLocaleKey("GChangeActivePageAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(c.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return s.default.CATEGORY_VIEW;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                const e = [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case c.Type.Next:
                        return e.concat(GPlatform.GKey.Constant.DOWN);
                    case c.Type.Previous:
                        return e.concat(GPlatform.GKey.Constant.UP);
                    default:
                        return null;
                }
            }
            getAdditionalShortcuts() {
                switch (this._type) {
                    case c.Type.Next:
                        return [GPlatform.GKey.Constant.PAGE_DOWN];
                    case c.Type.Previous:
                        return [GPlatform.GKey.Constant.PAGE_UP];
                    default:
                        return null;
                }
            }
            execute() {
                const e = gDesigner.getLeftSidebars(),
                    t = e && e.getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    n = gDesigner.getActiveDocument(),
                    o = n && n.getScene();
                if (t && o) {
                    const e = this.getNextPage(o);
                    t.changeActivePage(e);
                }
            }
            getNextPage(e) {
                const t = e.getActivePage();
                for (let e = this._getNextPageAccordingToType(t); null !== e; e = this._getNextPageAccordingToType(e))
                    if (e instanceof GObject.GPage) return e;
                return null;
            }
            _getNextPageAccordingToType(e) {
                switch (this._type) {
                    case c.Type.Next:
                        return e.getNext();
                    case c.Type.Previous:
                        return e.getPrevious();
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeActivePageAction]";
            }
        }
        ((c.ID = "view.change-active-page"), (c.Type = { Next: "next", Previous: "previous" }), (module.exports = c));
    };
