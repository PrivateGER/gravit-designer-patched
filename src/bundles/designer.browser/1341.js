module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        class ChangeActivePageAction extends GAction.default {
            constructor(type) {
                (super(), (this._type = type), (this._title = new GObject.GLocaleKey("GChangeActivePageAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(ChangeActivePageAction.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return GCategory.default.CATEGORY_VIEW;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                const baseModifiers = [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case ChangeActivePageAction.Type.Next:
                        return baseModifiers.concat(GPlatform.GKey.Constant.DOWN);
                    case ChangeActivePageAction.Type.Previous:
                        return baseModifiers.concat(GPlatform.GKey.Constant.UP);
                    default:
                        return null;
                }
            }
            getAdditionalShortcuts() {
                switch (this._type) {
                    case ChangeActivePageAction.Type.Next:
                        return [GPlatform.GKey.Constant.PAGE_DOWN];
                    case ChangeActivePageAction.Type.Previous:
                        return [GPlatform.GKey.Constant.PAGE_UP];
                    default:
                        return null;
                }
            }
            execute() {
                const leftSidebars = gDesigner.getLeftSidebars(),
                    outlineSidebar = leftSidebars && leftSidebars.getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument && activeDocument.getScene();
                if (outlineSidebar && scene) {
                    const nextPage = this.getNextPage(scene);
                    outlineSidebar.changeActivePage(nextPage);
                }
            }
            getNextPage(scene) {
                const activePage = scene.getActivePage();
                for (let candidatePage = this._getNextPageAccordingToType(activePage); null !== candidatePage; candidatePage = this._getNextPageAccordingToType(candidatePage))
                    if (candidatePage instanceof GObject.GPage) return candidatePage;
                return null;
            }
            _getNextPageAccordingToType(page) {
                switch (this._type) {
                    case ChangeActivePageAction.Type.Next:
                        return page.getNext();
                    case ChangeActivePageAction.Type.Previous:
                        return page.getPrevious();
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeActivePageAction]";
            }
        }
        ((ChangeActivePageAction.ID = "view.change-active-page"), (ChangeActivePageAction.Type = { Next: "next", Previous: "previous" }), (module.exports = ChangeActivePageAction));
    };
