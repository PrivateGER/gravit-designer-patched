module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(19), require(4), require(32), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            r = o(require(18 /* GCategory */)),
            s = o(require(1168)),
            GSaveAction = require(40),
            c = require(67),
            d = o(require(812)),
            designerConfig = require(10);
        class p extends s.default {
            constructor(e) {
                (super(e),
                    (this._title = new GObject.GLocaleKey("GMergeSubAction", "title.".concat(this._type))),
                    (this._transactionType = null));
            }
            _getMainActionId() {
                return d.default.ID;
            }
            getFullTitle() {
                const e = this.getTitle(),
                    t = this.getMainAction().getTitle();
                return "".concat(GObject.GLocale.get(t), " (").concat(GObject.GLocale.get(e), ")");
            }
            getCategory() {
                return r.default.CATEGORY_MODIFY_COMBINE;
            }
            getGroup() {
                return "structure-boolean/combine";
            }
            getIcon() {
                switch (this._type) {
                    case p.Type.Union:
                        return "gravit-icon-merge-union";
                    case p.Type.Subtract:
                        return "gravit-icon-merge-subtract";
                    case p.Type.Intersect:
                        return "gravit-icon-merge-intersect";
                    case p.Type.Difference:
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
                    case p.Type.Union:
                        return GPlatform.GKey.Constant.U;
                    case p.Type.Subtract:
                        return GPlatform.GKey.Constant.S;
                    case p.Type.Intersect:
                        return GPlatform.GKey.Constant.I;
                    case p.Type.Difference:
                        return GPlatform.GKey.Constant.X;
                    default:
                        return null;
                }
            }
            execute() {
                const e = gDesigner.getActiveDocument().getEditor(),
                    t = e && GObject.GNode.order(e.getIndividualSelection().slice());
                if (!t) return;
                e.beginTransaction();
                const n = this._shouldChangeBooleanOperation(t);
                try {
                    n
                        ? (this._setTransactionType(p.TransactionType.Merge), this._changeBooleanOperationType(t[0]))
                        : (this._setTransactionType(p.TransactionType.Combine), this._createCompoundShape(e, t));
                } finally {
                    e.commitTransaction(this._getTransactionName());
                }
            }
            _setTransactionType(e) {
                this._transactionType = e;
            }
            _getTransactionName() {
                return GObject.GLocale.getValue("GMergeSubAction", "transaction.".concat(this._transactionType));
            }
            _shouldChangeBooleanOperation(e) {
                const [t] = e;
                return 1 === e.length && (t instanceof GObject.GCompoundShape || 1 === d.default.getValidItems(t).length);
            }
            _changeBooleanOperationType(e) {
                if (
                    e.getParent() instanceof GObject.GCompoundShape &&
                    (e instanceof GObject.GCompoundShape || (e.hasMixin(GObject.GVertexSource) && !(e instanceof GObject.GGroup)))
                )
                    return e.setProperty("bool", this._getBooleanOperationType());
                if (e instanceof GObject.GCompoundShape && e.getFirstChild())
                    for (let t = e.getFirstChild().getNext(); null !== t; t = t.getNext())
                        t.setProperty("bool", this._getBooleanOperationType());
            }
            _createCompoundShape(e, t) {
                const n = new GObject.GCompoundShape();
                let o,
                    a = [];
                if (
                    (t.forEach((e) => {
                        a = a.concat(d.default.getValidItems(e));
                    }),
                    a.length > 1)
                ) {
                    const r = t[t.length - 1];
                    let s = r.getParent(),
                        c = r.getNext();
                    for (; !n.validateInsertion(s); ) ((c = s.getNext()), (s = s.getParent()));
                    if (!s) return;
                    s.insertChild(n, c);
                    try {
                        const t = [],
                            r = [];
                        let s = null;
                        ((o = new Set()),
                            a.forEach((e) => {
                                (e.getParent() instanceof GObject.GCompoundShape ? (t.push(e), s || (s = e.getParent())) : r.push(e),
                                    o.add(e.getParent()));
                            }),
                            (a = t.concat(r)));
                        const c = s || a[0];
                        if (((0, GSaveAction.blockChanges)(e, o, null, n), n.assignStyleFrom(c), c instanceof GObject.GText)) {
                            const e = c;
                            if (!e.getPaintLayers().getFillLayers(true).length && e.getProperty("_fc")) {
                                n.getPaintLayers().clearFillLayers();
                                const t =
                                    "string" == typeof e.getProperty("_fc")
                                        ? GObject.GRGBColor.fromCSSColor(e.getProperty("_fc"))
                                        : e.getProperty("_fc");
                                n.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(t));
                            }
                        }
                        a.forEach((e) => {
                            let t,
                                o = e.getParent();
                            for (
                                !(o === s || (o instanceof GObject.GCompoundShape && this._type === p.Type.Union)) &&
                                    e.setProperty("bool", this._getBooleanOperationType()),
                                    o.removeChild(e);
                                (o instanceof GObject.GGroup || o instanceof GObject.GCompoundShape) && !o.getFirstChild();

                            )
                                ((t = o), (o = o.getParent()), o.removeChild(t));
                            n.appendChild(e);
                        });
                    } finally {
                        (0, GSaveAction.releaseChanges)(e, o, null, n);
                    }
                    e.updateSelection(false, [n]);
                }
            }
            _getBooleanOperationType() {
                switch (this._type) {
                    case p.Type.Union:
                        return GObject.GVertexPolyBoolean.OR;
                    case p.Type.Subtract:
                        return GObject.GVertexPolyBoolean.SUB;
                    case p.Type.Intersect:
                        return GObject.GVertexPolyBoolean.AND;
                    case p.Type.Difference:
                        return GObject.GVertexPolyBoolean.XOR;
                    default:
                        throw new Error("Type is not valid.");
                }
            }
            getTooltipConfig(e) {
                return e && p.TOOLTIP_CONFIG[e] ? p.TOOLTIP_CONFIG[e][this._type] : null;
            }
            toString() {
                return "[Object GMergeSubAction]";
            }
        }
        ((p.Type = {
            Union: "union",
            Subtract: "subtract",
            Intersect: "intersect",
            Difference: "difference",
        }),
            (p.TransactionType = { Merge: "merge", Combine: "combine" }),
            (p.TOOLTIP_CONFIG = {
                [c.TOOLTIP_AREA.TOOLBAR]: {
                    [p.Type.Union]: c.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.union.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.union.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Union.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [p.Type.Subtract]: c.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.substract.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.substract.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Subtract.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [p.Type.Intersect]: c.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.intersect.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.intersect.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Intersect.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                    [p.Type.Difference]: c.GRichTooltipConfig.from({
                        title: GObject.GLocale.getValue("GMergeSubAction", "tooltip.difference.title"),
                        description: GObject.GLocale.getValue("GMergeSubAction", "tooltip.difference.description"),
                        video: designerConfig.gApi.getRichTooltipVideoURL("Boolean_Difference.mp4"),
                        middle: false,
                        learnMore: "/docs/basics/compound-shapes-boolean-operations/",
                    }),
                },
            }),
            (module.exports = p));
    };
