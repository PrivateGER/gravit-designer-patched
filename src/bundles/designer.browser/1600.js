module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(4), require(32), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GSubAction = _interopRequireDefault(require(1168)),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            GMergeMainAction = _interopRequireDefault(require(812 /* GMergeMainAction */)),
            designerConfig = require(10);
        class MergeSubAction extends GSubAction.default {
            constructor(options) {
                (super(options),
                    (this._title = new GObject.GLocaleKey("GMergeSubAction", "title.".concat(this._type))),
                    (this._transactionType = null));
            }
            _getMainActionId() {
                return GMergeMainAction.default.ID;
            }
            getFullTitle() {
                const title = this.getTitle(),
                    mainTitle = this.getMainAction().getTitle();
                return "".concat(GObject.GLocale.get(mainTitle), " (").concat(GObject.GLocale.get(title), ")");
            }
            getCategory() {
                return GCategory.default.CATEGORY_MODIFY_COMBINE;
            }
            getGroup() {
                return "structure-boolean/combine";
            }
            getIcon() {
                switch (this._type) {
                    case MergeSubAction.Type.Union:
                        return "gravit-icon-merge-union";
                    case MergeSubAction.Type.Subtract:
                        return "gravit-icon-merge-subtract";
                    case MergeSubAction.Type.Intersect:
                        return "gravit-icon-merge-intersect";
                    case MergeSubAction.Type.Difference:
                        return "gravit-icon-merge-difference";
                    default:
                        return null;
                }
            }
            isVisible() {
                return true;
            }
            getShortcutSubKey() {
                switch (this._type) {
                    case MergeSubAction.Type.Union:
                        return GPlatform.GKey.Constant.U;
                    case MergeSubAction.Type.Subtract:
                        return GPlatform.GKey.Constant.S;
                    case MergeSubAction.Type.Intersect:
                        return GPlatform.GKey.Constant.I;
                    case MergeSubAction.Type.Difference:
                        return GPlatform.GKey.Constant.X;
                    default:
                        return null;
                }
            }
            execute() {
                const editor = gDesigner.getActiveDocument().getEditor(),
                    selection = editor && GObject.GNode.order(editor.getIndividualSelection().slice());
                if (!selection) return;
                editor.beginTransaction();
                const shouldChangeBoolean = this._shouldChangeBooleanOperation(selection);
                try {
                    shouldChangeBoolean
                        ? (this._setTransactionType(MergeSubAction.TransactionType.Merge), this._changeBooleanOperationType(selection[0]))
                        : (this._setTransactionType(MergeSubAction.TransactionType.Combine), this._createCompoundShape(editor, selection));
                } finally {
                    editor.commitTransaction(this._getTransactionName());
                }
            }
            _setTransactionType(transactionType) {
                this._transactionType = transactionType;
            }
            _getTransactionName() {
                return GObject.GLocale.getValue("GMergeSubAction", "transaction.".concat(this._transactionType));
            }
            _shouldChangeBooleanOperation(elements) {
                const [firstElement] = elements;
                return 1 === elements.length && (firstElement instanceof GObject.GCompoundShape || 1 === GMergeMainAction.default.getValidItems(firstElement).length);
            }
            _changeBooleanOperationType(element) {
                if (
                    element.getParent() instanceof GObject.GCompoundShape &&
                    (element instanceof GObject.GCompoundShape || (element.hasMixin(GObject.GVertexSource) && !(element instanceof GObject.GGroup)))
                )
                    return element.setProperty("bool", this._getBooleanOperationType());
                if (element instanceof GObject.GCompoundShape && element.getFirstChild())
                    for (let child = element.getFirstChild().getNext(); null !== child; child = child.getNext())
                        child.setProperty("bool", this._getBooleanOperationType());
            }
            _createCompoundShape(editor, elements) {
                const compoundShape = new GObject.GCompoundShape();
                let parentsSet,
                    validItems = [];
                if (
                    (elements.forEach((element) => {
                        validItems = validItems.concat(GMergeMainAction.default.getValidItems(element));
                    }),
                    validItems.length > 1)
                ) {
                    const lastElement = elements[elements.length - 1];
                    let insertionParent = lastElement.getParent(),
                        insertAnchor = lastElement.getNext();
                    for (; !compoundShape.validateInsertion(insertionParent); ) ((insertAnchor = insertionParent.getNext()), (insertionParent = insertionParent.getParent()));
                    if (!insertionParent) return;
                    insertionParent.insertChild(compoundShape, insertAnchor);
                    try {
                        const compoundChildren = [],
                            otherChildren = [];
                        let firstCompoundParent = null;
                        ((parentsSet = new Set()),
                            validItems.forEach((element) => {
                                (element.getParent() instanceof GObject.GCompoundShape ? (compoundChildren.push(element), firstCompoundParent || (firstCompoundParent = element.getParent())) : otherChildren.push(element),
                                    parentsSet.add(element.getParent()));
                            }),
                            (validItems = compoundChildren.concat(otherChildren)));
                        const styleSource = firstCompoundParent || validItems[0];
                        if (((0, Utils.blockChanges)(editor, parentsSet, null, compoundShape), compoundShape.assignStyleFrom(styleSource), styleSource instanceof GObject.GText)) {
                            const textElement = styleSource;
                            if (!textElement.getPaintLayers().getFillLayers(true).length && textElement.getProperty("_fc")) {
                                compoundShape.getPaintLayers().clearFillLayers();
                                const fillColor =
                                    "string" == typeof textElement.getProperty("_fc")
                                        ? GObject.GRGBColor.fromCSSColor(textElement.getProperty("_fc"))
                                        : textElement.getProperty("_fc");
                                compoundShape.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(fillColor));
                            }
                        }
                        validItems.forEach((element) => {
                            let childToRemove,
                                parent = element.getParent();
                            for (
                                !(parent === firstCompoundParent || (parent instanceof GObject.GCompoundShape && this._type === MergeSubAction.Type.Union)) &&
                                    element.setProperty("bool", this._getBooleanOperationType()),
                                    parent.removeChild(element);
                                (parent instanceof GObject.GGroup || parent instanceof GObject.GCompoundShape) && !parent.getFirstChild();

                            )
                                ((childToRemove = parent), (parent = parent.getParent()), parent.removeChild(childToRemove));
                            compoundShape.appendChild(element);
                        });
                    } finally {
                        (0, Utils.releaseChanges)(editor, parentsSet, null, compoundShape);
                    }
                    editor.updateSelection(false, [compoundShape]);
                }
            }
            _getBooleanOperationType() {
                switch (this._type) {
                    case MergeSubAction.Type.Union:
                        return GObject.GVertexPolyBoolean.OR;
                    case MergeSubAction.Type.Subtract:
                        return GObject.GVertexPolyBoolean.SUB;
                    case MergeSubAction.Type.Intersect:
                        return GObject.GVertexPolyBoolean.AND;
                    case MergeSubAction.Type.Difference:
                        return GObject.GVertexPolyBoolean.XOR;
                    default:
                        throw new Error("Type is not valid.");
                }
            }
            getTooltipConfig(area) {
                return area && MergeSubAction.TOOLTIP_CONFIG[area] ? MergeSubAction.TOOLTIP_CONFIG[area][this._type] : null;
            }
            toString() {
                return "[Object GMergeSubAction]";
            }
        }
        ((MergeSubAction.Type = {
            Union: "union",
            Subtract: "subtract",
            Intersect: "intersect",
            Difference: "difference",
        }),
            (MergeSubAction.TransactionType = { Merge: "merge", Combine: "combine" }),
            (MergeSubAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: {
                    [MergeSubAction.Type.Union]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.union.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.union.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Union.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [MergeSubAction.Type.Subtract]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.substract.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.substract.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Subtract.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [MergeSubAction.Type.Intersect]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.intersect.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.intersect.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Intersect.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [MergeSubAction.Type.Difference]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.difference.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.difference.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Difference.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                },
            }),
            (module.exports = MergeSubAction));
    };
