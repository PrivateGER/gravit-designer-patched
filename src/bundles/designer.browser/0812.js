module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(18 /* GCategory */)),
            s = _interopRequireDefault(require(31)),
            l = _interopRequireDefault(require(1281));
        class c extends l.default {
            static getActionSubId(e) {
                return "".concat(c.ID, ".").concat(e);
            }
            static getValidItems(e) {
                let t = [];
                if (e instanceof GObject.GGroup || e instanceof GObject.GCompoundShape)
                    for (let n = e.getFirstChild(); null !== n; n = n.getNext()) {
                        const e = c.getValidItems(n);
                        t = t.concat(e);
                    }
                else e.hasMixin(GObject.GVertexSource) && e.validateInsertion(new GObject.GCompoundShape()) && t.push(e);
                return t;
            }
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return r.default.CATEGORY_MODIFY;
            }
            getGroup() {
                return "structure-group";
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.Y];
            }
            getIcon() {
                return super.getIcon.call(this);
            }
            isEnabled() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = t && t.getIndividualSelection();
                if (!n || !n.length) return false;
                let o = [];
                for (let e = 0; e < n.length; ++e) {
                    const t = n[e];
                    if (((o = o.concat(c.getValidItems(t))), o.length > 1)) return true;
                }
                if (1 === o.length) {
                    const e = o[0];
                    return e instanceof GObject.GCompoundShape || e.getParent() instanceof GObject.GCompoundShape;
                }
                return false;
            }
            getShortcutHint(e) {
                return s.default.prototype.getShortcutHint.call(this, e);
            }
            execute() {
                const e = c.getActionSubId(this.Type.Union);
                gDesigner.executeAction(e);
            }
            toString() {
                return "[Object GMergeMainAction]";
            }
        }
        ((c.ID = "modify.merge"), (c.TITLE = new GObject.GLocaleKey("GMergeMainAction", "title")), (module.exports = c));
    };
