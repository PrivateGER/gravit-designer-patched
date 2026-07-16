module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.default =
                exports.GFilesPanelSortTypes =
                exports.GFilesPanelSortDirections =
                exports.GFilesPanelFileTypesFilter =
                exports.GFilesPanelClipboardModes =
                    void 0));
        const o = require(47),
            i =
                ((exports.GFilesPanelFileTypesFilter = [
                    {
                        id: "gvdesign",
                        name: new o("GFilesPanel", "text.filter-type-gvdesign"),
                        type: "application/gravit+design",
                    },
                ]),
                (exports.GFilesPanelSortTypes = {
                    UPDATED: "updated",
                    NAME: "name",
                    CREATED: "created",
                })),
            a = (exports.GFilesPanelSortDirections = { ASCEND: true, DESCEND: false }),
            r = (exports.GFilesPanelClipboardModes = { DEFAULT: 1, COPY: 2, CUT: 3 });
        exports.default = {
            GFilesPanelSortTypes: i,
            GFilesPanelSortDirections: a,
            GFilesPanelClipboardModes: r,
        };
    };
