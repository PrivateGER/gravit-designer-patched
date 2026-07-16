module.exports = function (module, exports, require) {
        "use strict";
        const o = require(257);
        module.exports = {
            NEWDOCUMENTDIALOG: { HR_UNDER_PRESETS: false },
            OFFLINEDIALOG: { HAS_FOOTER: true },
            PATHPROPERTIES: { PATH_JOIN_CLASS: "" },
            PURCHASEPANEL: { HAS_PRODUCT_DESCRIPTION: true, HAS_HIGHLIGHT: false },
            SCENEPROPERTIES: { HAS_LOGO_UNDER_SYNC: true },
            DESIGNER: {
                HIGHLIGHT_COLOR: void 0,
                GUIDELINE_COLOR: void 0,
                GUIDELINEHINT_COLOR: void 0,
                DISTANCEHELPER_COLOR: void 0,
                HIGHLIGHTOUTLINE_COLOR: void 0,
            },
            USERLOGIN: {
                loadLogo: () =>
                    $("<div/>")
                        .addClass("cloud-logo")
                        .load(o["cloud-logo"], () => {}),
                OVERLAY_CLASS: "",
            },
            BRAND_COLOR: "#d72e63",
            SHOW_BETA_BRANDING: true,
        };
    };
