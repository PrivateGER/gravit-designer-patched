module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GMainAction = _interopRequireDefault(require(1281 /* GMainAction */));
        class GMergeMainAction extends GMainAction.default {
            static getActionSubId(type) {
                return "".concat(GMergeMainAction.ID, ".").concat(type);
            }
            static getValidItems(element) {
                let items = [];
                if (element instanceof GObject.GGroup || element instanceof GObject.GCompoundShape)
                    for (let child = element.getFirstChild(); null !== child; child = child.getNext()) {
                        const childItems = GMergeMainAction.getValidItems(child);
                        items = items.concat(childItems);
                    }
                else element.hasMixin(GObject.GVertexSource) && element.validateInsertion(new GObject.GCompoundShape()) && items.push(element);
                return items;
            }
            getId() {
                return GMergeMainAction.ID;
            }
            getTitle() {
                return GMergeMainAction.TITLE;
            }
            getCategory() {
                return GCategory.default.CATEGORY_MODIFY;
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
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getIndividualSelection();
                if (!selection || !selection.length) return false;
                let validItems = [];
                for (let e = 0; e < selection.length; ++e) {
                    const item = selection[e];
                    if (((validItems = validItems.concat(GMergeMainAction.getValidItems(item))), validItems.length > 1)) return true;
                }
                if (1 === validItems.length) {
                    const singleItem = validItems[0];
                    return singleItem instanceof GObject.GCompoundShape || singleItem.getParent() instanceof GObject.GCompoundShape;
                }
                return false;
            }
            getShortcutHint(shortcutKey) {
                return GAction.default.prototype.getShortcutHint.call(this, shortcutKey);
            }
            execute() {
                const subActionId = GMergeMainAction.getActionSubId(this.Type.Union);
                gDesigner.executeAction(subActionId);
            }
            toString() {
                return "[Object GMergeMainAction]";
            }
        }
        ((GMergeMainAction.ID = "modify.merge"), (GMergeMainAction.TITLE = new GObject.GLocaleKey("GMergeMainAction", "title")), (module.exports = GMergeMainAction));
    };
