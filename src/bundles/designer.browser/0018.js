module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function GCategory(localeKey) {
            let visible = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                icon = arguments.length > 2 ? arguments[2] : void 0;
            ((this.label = GObject.GLocale.get(localeKey)), (this.visible = visible), (this.icon = icon), (this.parent = null));
        }
        function createCategory(localeKeyParts) {
            let parent = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                visibleFn = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => true,
                iconFn = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : () => null;
            var category = new GCategory();
            return (
                Object.defineProperties(category, {
                    label: { get: () => GObject.GLocale.get(new GObject.GLocaleKey(localeKeyParts[0], localeKeyParts[1])) },
                    visible: { get: visibleFn },
                    icon: { get: iconFn },
                    parent: { get: () => parent },
                }),
                category
            );
        }
        (GObject.GObject.inherit(GCategory, GObject.GObject),
            (GCategory.prototype.label = null),
            (GCategory.prototype.visible = true),
            (GCategory.prototype.icon = null),
            (GCategory.CATEGORY_FILE = createCategory(["GCategory", "category.file"])),
            (GCategory.CATEGORY_FILE_SHARE = createCategory(["GCategory", "category.file.share"], GCategory.CATEGORY_FILE)),
            (GCategory.CATEGORY_FILE_OPEN_RECENT = createCategory(["GCategory", "category.file.open-recent"], GCategory.CATEGORY_FILE)),
            (GCategory.CATEGORY_FILE_SAVE_AS = createCategory(["GCategory", "category.file.save-as"], GCategory.CATEGORY_FILE)),
            (GCategory.CATEGORY_FILE_GRAVIT_CLOUD = createCategory(["GCategory", "category.file.gravit-cloud"], GCategory.CATEGORY_FILE)),
            (GCategory.CATEGORY_FILE_IMPORT = createCategory(["GCategory", "category.file.import"], GCategory.CATEGORY_FILE)),
            (GCategory.CATEGORY_FILE_IMPORT_IMAGE = createCategory(["GCategory", "category.file.import.image"], GCategory.CATEGORY_FILE_IMPORT)),
            (GCategory.CATEGORY_FILE_EXPORT = createCategory(
                ["GCategory", "category.file.export"],
                GCategory.CATEGORY_FILE,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-export" : null)
            )),
            (GCategory.CATEGORY_FILE_EXPORT_PDF = createCategory(["GCategory", "category.file.export.pdf"], GCategory.CATEGORY_FILE_EXPORT)),
            (GCategory.CATEGORY_EDIT = createCategory(["GCategory", "category.edit"])),
            (GCategory.CATEGORY_EDIT_PASTE = createCategory(
                ["GCategory", "category.edit.paste"],
                GCategory.CATEGORY_EDIT,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-paste" : null)
            )),
            (GCategory.CATEGORY_EDIT_SELECT_SAME = createCategory(["GCategory", "category.edit.select-same"], GCategory.CATEGORY_EDIT)),
            (GCategory.CATEGORY_MODIFY = createCategory(["GCategory", "category.modify"])),
            (GCategory.CATEGORY_MODIFY_COMBINE = createCategory(["GCategory", "category.modify.combine"], GCategory.CATEGORY_MODIFY)),
            (GCategory.CATEGORY_MODIFY_ARRANGE = createCategory(
                ["GCategory", "category.modify.arrange"],
                GCategory.CATEGORY_MODIFY,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-arrange" : null)
            )),
            (GCategory.CATEGORY_MODIFY_ALIGN = createCategory(
                ["GCategory", "category.modify.align"],
                GCategory.CATEGORY_MODIFY,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-align" : null)
            )),
            (GCategory.CATEGORY_MODIFY_TRANSFORM = createCategory(
                ["GCategory", "category.modify.transform"],
                GCategory.CATEGORY_MODIFY,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-transform" : null)
            )),
            (GCategory.CATEGORY_MODIFY_PATH = createCategory(["GCategory", "category.modify.path"], GCategory.CATEGORY_MODIFY)),
            (GCategory.CATEGORY_MODIFY_SYMBOL = createCategory(
                ["GCategory", "category.modify.symbol"],
                GCategory.CATEGORY_MODIFY,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-symbol" : null)
            )),
            (GCategory.CATEGORY_VIEW = createCategory(
                ["GCategory", "category.view"],
                null,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-no-icon" : null)
            )),
            (GCategory.CATEGORY_VIEW_CANVAS = createCategory(["GCategory", "category.view.canvas"], GCategory.CATEGORY_VIEW)),
            (GCategory.CATEGORY_VIEW_SNAP = createCategory(
                ["GCategory", "category.view.snap"],
                GCategory.CATEGORY_VIEW,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-snap" : null)
            )),
            (GCategory.CATEGORY_VIEW_MAGNIFICATION = createCategory(
                ["GCategory", "category.view.magnification"],
                GCategory.CATEGORY_VIEW,
                () => true,
                () => (gDesigner.isTouchEnabled() ? "gravit-icon-zoom-in" : null)
            )),
            (GCategory.CATEGORY_HELP = createCategory(["GCategory", "category.help"])),
            (GCategory.CATEGORY_HELP_SUPPORT = createCategory(["GCategory", "category.help.support"], GCategory.CATEGORY_HELP)),
            (GCategory.CATEGORY_HELP_BETA_FEEDBACK = createCategory(["GCategory", "category.help.beta_feedback"], GCategory.CATEGORY_HELP)),
            (GCategory.CATEGORY_HELP_LEARN = createCategory(["GCategory", "category.help.learn"], GCategory.CATEGORY_HELP)),
            (GCategory.CATEGORY_HELP_LANGUAGE = createCategory(["GCategory", "category.help.language"], GCategory.CATEGORY_HELP)),
            (GCategory.CATEGORY_HELP_SWITCHWEBCDR = createCategory(["GCategory", "category.help.switchwebcdr"], GCategory.CATEGORY_HELP)),
            (GCategory.CATEGORY_ACCOUNT = createCategory(
                ["GCategory", "category.account"],
                null,
                () => gDesigner.isTouchEnabled(),
                () => {
                    const syncUser = gDesigner.getSyncUser();
                    if (syncUser) {
                        if (syncUser.hasOwnPictureAvatar())
                            return $("<div/>").addClass("avatar").css("background-image", 'url("'.concat(syncUser.avatar, '")'));
                        const userColor = syncUser.getUserColor();
                        return $("<div/>")
                            .addClass("avatar")
                            .css("background-color", userColor)
                            .css("border-color", userColor)
                            .append($("<span/>").text(syncUser.getUserNameInitials()));
                    }
                    return null;
                }
            )),
            (module.exports = GCategory));
    };
