module.exports = function (module, exports, require) {
            var GNode = require(2),
                GUtil = require(11),
                GGuide = require(99),
                GPoint = require(5),
                GVertexSource = require(87),
                GItem = require(104),
                GLayer = require(159),
                GAnnotation = require(84),
                GComment = require(366),
                GAnnotationsList = require(506),
                GPathUtil = require(179),
                GGuideLinesGuide = require(739),
                GPath = require(60),
                GEvent = require(72),
                GEditorOptions = require(24),
                GCompoundPath = require(113),
                GBBoxGuide = require(153),
                GGridGuide = require(740),
                GActionGuide = require(1076),
                GPointsGuide = require(741),
                GEventTarget = require(75),
                IsFiniteNonNegativeNumber = require(0),
                GText = require(70),
                GConnector = require(268),
                GRect = require(6),
                GElement = require(22),
                GPathsGraph = require(162),
                GTransform = require(7),
                GGroup = require(122),
                GPathBase = require(45),
                GCompoundShape = require(233),
                GFullPixelsGuide = require(544),
                GElementEditor = require(36),
                GGuides = require(210),
                GPageGuide = require(742),
                GPageLabelGuide = require(743),
                GMath = require(12),
                GScene = require(160),
                GPage = require(83),
                GSymbol = require(216),
                GBlock = require(69),
                GVertexTransformer = require(63),
                GStylable = require(28),
                GBoxEditor = require(66),
                GDistanceHelper = require(540),
                GSymbolLabelGuide = require(1077),
                String = require(9),
                GLocaleKey = require(47),
                GCollabText = (require(56), require(531)),
                GTransactionRecorder = require(471),
                GQuadTree = require(140);

            function GEditor(scene) {
                ((this._scene = scene),
                    (this._scene.__graphic_editor__ = this),
                    (this._transactionStack = []),
                    (this._undoStates = []),
                    (this._redoStates = []),
                    (this._guides = new GGuides(this._scene)));
                var distanceGuide = new GBBoxGuide(this._guides);
                (distanceGuide.setPriority(GBBoxGuide.PRIORITY.DISTANCE_FIRST),
                    this._guides.addGuide(distanceGuide, true),
                    this._guides.addGuide(new GGridGuide(this._guides)),
                    this._guides.addGuide(new GGuideLinesGuide(this._guides)),
                    this._guides.addGuide(new GPointsGuide(this._guides)),
                    this._guides.addGuide(new GPageGuide(this._guides)),
                    this._guides.addGuide(new GFullPixelsGuide(this._guides)),
                    this._guides.addGuide(new GPageLabelGuide(this._guides)),
                    this._guides.addGuide(new GSymbolLabelGuide(this._guides)),
                    this._guides.addGuide(new GActionGuide(this._guides)),
                    (this._distanceHelper = new GDistanceHelper(this._scene)),
                    this._scene.addEventListener(GNode.AfterInsertEvent, this._afterNodeInsert, this, void 0, void 0, true),
                    this._scene.addEventListener(GNode.BeforeRemoveEvent, this._beforeNodeRemove, this, void 0, void 0, true),
                    this._scene.addEventListener(GNode.BeforeFlagChangeEvent, this._beforeFlagChange, this, void 0, void 0, true),
                    this._scene.addEventListener(GNode.AfterFlagChangeEvent, this._afterFlagChange, this, void 0, void 0, true),
                    this._scene.addEventListener(GElement.GeometryChangeEvent, this._geometryChange, this, void 0, void 0, true));
                var selectedElements = this._scene.queryAll(":selected");
                if (selectedElements && selectedElements.length) for (var r = 0; r < selectedElements.length; ++r) this._tryAddToSelection(selectedElements[r]);
            }
            (IsFiniteNonNegativeNumber.inherit(GEditor, GEventTarget),
                (GEditor._SavePoint = function (editor, oldId, newId) {
                    ((this._oldId = oldId), (this._newId = newId), (this._editor = editor));
                }),
                (GEditor._SavePoint.prototype._editor = null),
                (GEditor._SavePoint.prototype._newId = null),
                (GEditor._SavePoint.prototype._oldId = null),
                (GEditor._SavePoint.prototype.rollback = function () {
                    return this._editor.markSavePoint(this._oldId);
                }),
                (GEditor.ArrangeOrderType = {
                    SendToFront: "send-front",
                    BringForward: "bring-forward",
                    SendBackward: "send-backward",
                    SendToBack: "send-back",
                }),
                (GEditor.ArrangeAlignType = {
                    AlignLeft: "align-left",
                    AlignCenter: "align-center",
                    AlignRight: "align-right",
                    AlignTop: "align-top",
                    AlignMiddle: "align-middle",
                    AlignBottom: "align-bottom",
                    AlignJustifyHorizontal: "align-justify-horizontal",
                    AlignJustifyVertical: "align-justify-vertical",
                }),
                (GEditor.getEditor = function (node) {
                    return node.__graphic_editor__ ? node.__graphic_editor__ : null;
                }),
                (GEditor.tryRunTransaction = function (element, callback, transactionName) {
                    var editor = null;
                    if (element && element.getScene) {
                        var scene = element.getScene();
                        editor = scene ? GEditor.getEditor(scene) : null;
                    }
                    editor && editor.beginTransaction();
                    try {
                        callback();
                    } finally {
                        editor && editor.commitTransaction(transactionName);
                    }
                }),
                (GEditor.convertToConstrain = function (offsetX, offsetY, pointX, pointY, angle) {
                    var absX,
                        absY,
                        constrainedY,
                        constrainedX,
                        transform = new GTransform(1, 0, 0, 1, 0, 0);
                    angle && (transform = transform.rotated(angle));
                    var localPoint = (transform = transform.translated(offsetX, offsetY)).inverted().mapPoint(new GPoint(pointX, pointY)),
                        localX = localPoint.getX(),
                        localY = localPoint.getY();
                    return (
                        (absX = Math.abs(localX)),
                        (absY = Math.abs(localY)),
                        GMath.isEqualEps(absX, 0) || GMath.isEqualEps(absY, 0) || GMath.isEqualEps(absX - absY, 0)
                            ? ((constrainedX = localX), (constrainedY = localY))
                            : absX > absY
                              ? ((constrainedX = localX), (constrainedY = absY / absX < 0.4142 ? 0 : 0 > localY ? -absX : absX))
                              : ((constrainedY = localY), (constrainedX = absX / absY < 0.4142 ? 0 : 0 > localX ? -absY : absY)),
                        transform.mapPoint(new GPoint(constrainedX, constrainedY))
                    );
                }),
                (GEditor.getGroupGeometryBBox = function (elements, addPageOffset, useDetailBBox) {
                    if (!elements) return null;
                    for (var bbox = null, r = 0; r < elements.length; r++) {
                        var o = elements[r];
                        if (o instanceof GElement) {
                            var a = null;
                            if (useDetailBBox && o.hasMixin(GElement.Transform)) {
                                var s = GElementEditor.getEditor(o);
                                a = s ? s.getPEGeometryBBox() : o.getGeometryBBox();
                            } else a = o.getGeometryBBox();
                            if (a) {
                                if (addPageOffset) {
                                    var l = GEditor.getElementPage(o);
                                    if (l) {
                                        var h = l.getPosition(true);
                                        a = a.translated(h.getX(), h.getY());
                                    }
                                }
                                bbox = bbox ? bbox.united(a) : a;
                            }
                        }
                    }
                    return bbox;
                }),
                (GEditor.getGroupTransformBBox = function (elements, addPageOffset) {
                    if (!elements) return null;
                    for (var bbox = null, n = 0; n < elements.length; n++) {
                        var r = elements[n];
                        if (r instanceof GElement) {
                            var o = GElementEditor.getEditor(r),
                                a = null;
                            if ((a = o ? o.getElementSelectionBBox() : r.getGeometryBBox())) {
                                var s = GEditor.getElementPage(r);
                                if (s) {
                                    var l = s.getPosition(true);
                                    a = a.translated(l.getX(), l.getY());
                                }
                                bbox = bbox ? bbox.united(a) : a;
                            }
                        }
                    }
                    return bbox && (bbox.getWidth() || bbox.getHeight()) ? bbox : GEditor.getGroupGeometryBBox(elements, addPageOffset);
                }),
                (GEditor.getElementPage = function (element) {
                    for (var node = element; node; ) {
                        if (node instanceof GPage) return node;
                        node = node.getParent();
                    }
                    return null;
                }),
                (GEditor.getEditorPage = function (editor) {
                    var pageEditor = null;
                    if ((editor instanceof GElementEditor ? (pageEditor = editor) : editor.getParentEditor() instanceof GElementEditor && (pageEditor = editor.getParentEditor()), pageEditor)) {
                        var element = pageEditor.getElement();
                        return GEditor.getElementPage(element);
                    }
                    return null;
                }),
                (GEditor.validateBlockInsertion = function (parent, block, before) {
                    var previous,
                        container = parent;
                    if (!container) {
                        if (!before || !before.getParent()) return false;
                        container = before.getParent();
                    }
                    if (!block) return false;
                    if (before === block) return false;
                    if (
                        (before ? (previous = before.getPrevious()) : container.hasMixin(GNode.Container) && (previous = container.getLastChild()),
                        previous === block && (previous = previous.getPrevious()),
                        block.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack &&
                            !(container instanceof GPage || container instanceof GScene || container.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack))
                    )
                        return false;
                    if (previous) {
                        if (previous.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack) {
                            var next = previous.getNext();
                            return (next === block && (next = next.getNext()), !(next && next.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack));
                        }
                        return !(block.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack);
                    }
                    return !(before && before.getProperty("plkt") & GBlock.ProgramLck.AlwaysBack);
                }),
                (GEditor.FileDropEvent = function (file, position) {
                    ((this.file = file), (this.position = position));
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.FileDropEvent, GEvent),
                (GEditor.FileDropEvent.file = null),
                (GEditor.FileDropEvent.position = null),
                (GEditor.FileDropEvent.prototype.toString = function () {
                    return "[Event GEditor.FileDropEvent]";
                }),
                (GEditor.CustomDropEvent = function (data, position) {
                    ((this.data = data), (this.position = position));
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.CustomDropEvent, GEvent),
                (GEditor.CustomDropEvent.data = null),
                (GEditor.CustomDropEvent.position = null),
                (GEditor.CustomDropEvent.prototype.toString = function () {
                    return "[Event GEditor.CustomDropEvent]";
                }),
                (GEditor.ModifiedEvent = function (data, evtType) {
                    ((this.data = data || null),
                        data &&
                            evtType &&
                            (this.data = $.extend(
                                {
                                    evtType: evtType,
                                },
                                data
                            )));
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.ModifiedEvent, GEvent),
                (GEditor.ModifiedEvent.Type = {
                    Raw: 1,
                    Undo: 2,
                    Redo: 3,
                }),
                (GEditor.ModifiedEvent.prototype.data = null),
                (GEditor.ModifiedEvent.prototype.toString = function () {
                    return "[Event GEditor.ModifiedEvent]";
                }),
                (GEditor.MODIFIED_EVENT = new GEditor.ModifiedEvent()),
                (GEditor.SelectionChangedEvent = function (data) {
                    data && (this.data = data);
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.SelectionChangedEvent, GEvent),
                (GEditor.SelectionChangedEvent.prototype.toString = function () {
                    return "[Event GEditor.SelectionChangedEvent]";
                }),
                (GEditor.SELECTION_CHANGED_EVENT = new GEditor.SelectionChangedEvent()),
                (GEditor.InlineEditorEvent = function (editor, type, data) {
                    ((this.editor = editor), (this.type = type), (this.data = data));
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.InlineEditorEvent, GEvent),
                (GEditor.InlineEditorEvent.Type = {
                    BeforeOpen: 0,
                    AfterOpen: 1,
                    BeforeClose: 10,
                    AfterClose: 11,
                    TryOpen: 20,
                    SelectionChanged: 100,
                    TextEdited: 101,
                }),
                (GEditor.InlineEditorEvent.prototype.editor = null),
                (GEditor.InlineEditorEvent.prototype.type = null),
                (GEditor.InlineEditorEvent.prototype.data = null),
                (GEditor.InlineEditorEvent.prototype.toString = function () {
                    return "[Event GEditor.InlineEditorEvent]";
                }),
                (GEditor.InvalidationRequestEvent = function (editor, args) {
                    ((this.editor = editor), (this.args = args));
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.InvalidationRequestEvent, GEvent),
                (GEditor.InvalidationRequestEvent.prototype.editor = null),
                (GEditor.InvalidationRequestEvent.prototype.args = null),
                (GEditor.InvalidationRequestEvent.prototype.getEditorPage = function () {
                    return this.args && this.args.pages
                        ? this.args.pages.length > 1
                            ? this.args.pages[0].getScene()
                            : this.args.pages[0]
                        : this.editor
                          ? GEditor.getEditorPage(this.editor)
                          : null;
                }),
                (GEditor.InvalidationRequestEvent.prototype.toString = function () {
                    return "[Event GEditor.InvalidationRequestEvent]";
                }),
                (GEditor.EdGeometryChangeEvent = function () {}),
                IsFiniteNonNegativeNumber.inherit(GEditor.EdGeometryChangeEvent, GEvent),
                (GEditor.HotkeyEvent = function (keys) {
                    this.keys = keys;
                }),
                IsFiniteNonNegativeNumber.inherit(GEditor.HotkeyEvent, GEvent),
                (GEditor.HotkeyEvent.keys = null),
                (GEditor.HotkeyEvent.toString = function () {
                    return "[Event GEditor.HotkeyEvent]";
                }),
                (GEditor.prototype._scene = null),
                (GEditor.prototype._selection = null),
                (GEditor.prototype._lastCloneSelection = null),
                (GEditor.prototype._storedSelection = null),
                (GEditor.prototype._selectionUpdateCounter = 0),
                (GEditor.prototype._selectionDetail = false),
                (GEditor.prototype._selectionEdit = false),
                (GEditor.prototype._pathResize = true),
                (GEditor.prototype._transactionStack = null),
                (GEditor.prototype._startingScene = null),
                (GEditor.prototype._undoStates = null),
                (GEditor.prototype._redoStates = null),
                (GEditor.prototype._savePointId = null),
                (GEditor.prototype._guides = null),
                (GEditor.prototype._distanceHelper = null),
                (GEditor.prototype._keysOff = null),
                (GEditor.prototype._currentInlineEditorNode = null),
                (GEditor.prototype._selEditor = null),
                (GEditor.prototype._activatedPage = null),
                (GEditor.prototype._edTrfSettings = null),
                (GEditor.prototype._uid = null),
                (GEditor.prototype.getScene = function () {
                    return this._scene;
                }),
                (GEditor.prototype.hasSelection = function () {
                    return this._selection && this._selection.length > 0;
                }),
                (GEditor.prototype.getSelectionBBox = function (useGeometryBBox) {
                    if (this.hasSelection()) {
                        for (var bbox = null, i = 0; i < this._selection.length; ++i) {
                            var n = useGeometryBBox ? this._selection[i].getGeometryBBox() : this._selection[i].getPaintBBox();
                            n &&
                                n.getWidth() + n.getHeight() > 0 &&
                                (bbox = bbox ? bbox.united(n) : new GRect(n.getX(), n.getY(), n.getWidth(), n.getHeight()));
                        }
                        return bbox;
                    }
                    return null;
                }),
                (GEditor.prototype.getSelection = function () {
                    return this._selection;
                }),
                (GEditor.prototype.hasSelectionDetail = function () {
                    return this._selectionDetail;
                }),
                (GEditor.prototype.setSelectionDetail = function (detail, force, view) {
                    if (detail !== this._selectionDetail || force) {
                        this._selectionDetail = detail;
                        var GBaseEditor = require(39);
                        if (this._selection)
                            for (var o = 0; o < this._selection.length; ++o) {
                                var a = GElementEditor.getEditor(this._selection[o]);
                                if (a) {
                                    var s = require(329);
                                    if (this._selectionDetail)
                                        (a.setFlag(GBaseEditor.Flag.Detail),
                                            a instanceof s &&
                                                "subselect" == GEditorOptions.selectDoubleClickBehavior &&
                                                a.setEditMode(true, force, true, view ? view.getWorldTransform().getScaleFactor() : null));
                                    else {
                                        var l = require(235);
                                        ((a.getPartSelection() || (a instanceof l && a.hasPathPartSelection())) &&
                                            a.updatePartSelection(false, null),
                                            a instanceof s && "subselect" == GEditorOptions.selectDoubleClickBehavior && a.setEditMode(false, force),
                                            a.removeFlag(GBaseEditor.Flag.Detail));
                                    }
                                }
                            }
                        this.updateSelectionEditors();
                    }
                }),
                (GEditor.prototype.hasSelectionEdit = function () {
                    return this._selectionEdit;
                }),
                (GEditor.prototype.setSelectionEdit = function (edit, force, view) {
                    if (edit !== this._selectionEdit || force) {
                        this._selectionEdit = edit;
                        var GBoxEditor = require(66),
                            GPathEditor = require(127),
                            GCompoundPathEditor = require(235),
                            GPathsGraphEditor = require(275);
                        if (this._selection)
                            for (var l = 0; l < this._selection.length; ++l) {
                                var h = GElementEditor.getEditor(this._selection[l]);
                                h &&
                                    (h.hasSelectionEditing()
                                        ? h.setEditMode(edit, force, true, view ? view.getWorldTransform().getScaleFactor() : null)
                                        : h instanceof GPathEditor ||
                                          h instanceof GCompoundPathEditor ||
                                          h instanceof GPathsGraphEditor ||
                                          (edit ? h.removeFlag(GBoxEditor.Flag.ResizeAll) : h.setFlag(GBoxEditor.Flag.ResizeAll)));
                            }
                    }
                }),
                (GEditor.prototype.hasPathResize = function () {
                    return this._pathResize;
                }),
                (GEditor.prototype.setPathResize = function (pathResize, force) {
                    if ((this._pathResize !== pathResize || force) && ((this._pathResize = pathResize), this._selection))
                        for (var GPathEditor = require(127), GCompoundPathEditor = require(235), GPathsGraphEditor = require(275), GBoxEditor = require(66), s = 0; s < this._selection.length; ++s) {
                            var l = GElementEditor.getEditor(this._selection[s]);
                            ((l instanceof GPathEditor && !GCompoundPath.isOwnedPath(this._selection[s])) || l instanceof GCompoundPathEditor || l instanceof GPathsGraphEditor) &&
                                (this._pathResize ? l.setFlag(GBoxEditor.Flag.ResizeAll) : l.removeFlag(GBoxEditor.Flag.ResizeAll));
                        }
                }),
                (GEditor.prototype.getSelectionEditor = function () {
                    return this._selEditor;
                }),
                (GEditor.prototype.hideSelection = function () {
                    if (this._selection) {
                        for (var GBaseEditor = require(39), GBlockEditor = require(154), n = 0; n < this._selection.length; ++n) {
                            var r = GElementEditor.getEditor(this._selection[n]);
                            r instanceof GBlockEditor && r.setFlag(GBaseEditor.Flag.HideEditor);
                        }
                        this._selEditor && this._selEditor.setFlag(GBaseEditor.Flag.HideEditor);
                    }
                }),
                (GEditor.prototype.resetHideSelection = function () {
                    if (this._selection) {
                        for (var GBaseEditor = require(39), GBlockEditor = require(154), n = 0; n < this._selection.length; ++n) {
                            var r = GElementEditor.getEditor(this._selection[n]);
                            r instanceof GBlockEditor && r.removeFlag(GBaseEditor.Flag.HideEditor);
                        }
                        this._selEditor && this._selEditor.removeFlag(GBaseEditor.Flag.HideEditor);
                    }
                    this.updateSelectionEditors();
                }),
                (GEditor.prototype.getGuides = function () {
                    return this._guides;
                }),
                (GEditor.prototype.getDistanceHelper = function () {
                    return this._distanceHelper;
                }),
                (GEditor.prototype.activateDistanceHelper = function (key) {
                    var allowed = true;
                    if (key && this._keysOff && this._keysOff.length)
                        for (var i = 0; i < this._keysOff.length && allowed; ++i) this._keysOff[i] == key && (allowed = false);
                    return !!allowed && (this._distanceHelper.activateMeasurement(), true);
                }),
                (GEditor.prototype.keysOff = function (keys) {
                    if (keys && keys.length)
                        if (this._keysOff)
                            for (var t = 0; t < keys.length; ++t) {
                                for (var i = true, n = 0; n < this._keysOff.length && i; ++n) this._keysOff[n] == keys[t] && (i = false);
                                i && this._keysOff.push(keys[t]);
                            }
                        else this._keysOff = keys.slice();
                }),
                (GEditor.prototype.keysOn = function (keys) {
                    if (keys && keys.length && this._keysOff && this._keysOff.length) {
                        for (var t = 0; t < keys.length; ++t)
                            for (var i = this._keysOff.length - 1; i >= 0; --i) this._keysOff[i] == keys[t] && this._keysOff.splice(i, 1);
                        this._keysOff.length || (this._keysOff = null);
                    }
                }),
                (GEditor.prototype.getPathSelection = function () {
                    var e,
                        path = null;
                    if (this.hasSelection())
                        for (e = 0; e < this._selection.length; ++e)
                            if (this._selection[e] instanceof GPath || this._selection[e] instanceof GCompoundPath) {
                                if (path) {
                                    path = null;
                                    break;
                                }
                                path = this._selection[e];
                            } else if (path) {
                                path = null;
                                break;
                            }
                    return path;
                }),
                (GEditor.prototype.getAlignExclusions = function (onlyChildren, elements) {
                    var result = null,
                        targets = elements || this._selection;
                    if (targets && targets.length) {
                        var exclusions = [];
                        onlyChildren || (exclusions = targets.slice());
                        for (var a = 0; a < targets.length; ++a) {
                            var s = targets[a];
                            s.hasMixin(GNode.Container) &&
                                s.acceptChildren(
                                    function (child) {
                                        if (!(child instanceof GElement)) return false;
                                        exclusions.push(child);
                                    },
                                    false,
                                    true
                                );
                        }
                        exclusions.length && (result = exclusions);
                    }
                    return result;
                }),
                (GEditor.prototype.getMappingScopes = function (elements) {
                    var targets = elements || this._selection,
                        scopes = [];
                    if (targets && targets.length)
                        for (var n = 0; n < targets.length; ++n) {
                            var r,
                                o = targets[n];
                            if (o.getParent())
                                (r = o.findParent(function (node) {
                                    return node instanceof GElement;
                                })) &&
                                    (!scopes.length || scopes.indexOf(r) < 0) &&
                                    scopes.push(r);
                        }
                    else (r = (r = this._scene.querySingle("layer:active")) || this._scene.getActivePage()) && scopes.push(r);
                    return scopes;
                }),
                (GEditor.prototype.release = function () {
                    ((GEditor.MODIFIED_EVENT.sender = null),
                        (GEditor.SELECTION_CHANGED_EVENT.sender = null),
                        delete this._scene.__graphic_editor__,
                        this._scene.removeEventListener(GNode.AfterInsertEvent, this._afterNodeInsert, this),
                        this._scene.removeEventListener(GNode.BeforeRemoveEvent, this._beforeNodeRemove, this),
                        this._scene.removeEventListener(GNode.BeforeFlagChangeEvent, this._beforeFlagChange, this),
                        this._scene.removeEventListener(GNode.AfterFlagChangeEvent, this._afterFlagChange, this),
                        this._scene.removeEventListener(GElement.GeometryChangeEvent, this._geometryChange, this));
                }),
                (GEditor.prototype.requestInvalidation = function (editor, args) {
                    this.hasEventListeners(GEditor.InvalidationRequestEvent) && this.trigger(new GEditor.InvalidationRequestEvent(editor, args));
                }),
                (GEditor.prototype.centerSelection = function () {
                    var bbox = null,
                        activePage = this._scene.getActivePage();
                    ((bbox = activePage ? (activePage.isFixedSized() ? activePage.getGeometryBBox() : activePage.getPaintBBox()) : this._scene.getPaintBBox()),
                        this.arrangeAlign(GEditor.ArrangeAlignType.AlignCenter, null, true, bbox, true),
                        this.arrangeAlign(GEditor.ArrangeAlignType.AlignMiddle, null, true, bbox, true));
                }),
                (GEditor.prototype.getAnnotationsExceptions = function (elements) {
                    var uid = this._uid,
                        exceptions = [];

                    function handleNode(node) {
                        if (node.getProperty("uid") === uid)
                            for (var n = node.getFirstChild(); null !== n; n = n.getNext()) n instanceof GComment && exceptions.push(n);
                        else exceptions.push(node);
                    }
                    for (var r = 0; r < elements.length; r++) {
                        var annotations;
                        if ((elements[r] instanceof GPage && elements[r].hasAnnotations() ? (annotations = elements[r].getAnnotations()) : elements[r] instanceof GAnnotationsList && (annotations = elements[r]), annotations))
                            for (var a = annotations.getFirstChild(); null !== a; a = a.getNext()) handleNode(a);
                        else elements[r].hasMixin(GAnnotation) ? handleNode(elements[r]) : elements[r] instanceof GComment && exceptions.push(elements[r]);
                    }
                    return exceptions;
                }),
                (GEditor.prototype.getLinkedElementsInSelection = function (element, candidates) {
                    var linked = [],
                        scene = this._scene,
                        visitElement = function (node) {
                            var linkedPaths;
                            (node instanceof GText &&
                                node.hasPathAttached() &&
                                scene.visitLinks(node, function (link) {
                                    if (link instanceof GPathBase) return ((linkedPaths = [link]), false);
                                }),
                                node instanceof GConnector && (linkedPaths = [node.getSrcPath(), node.getDstPath()]),
                                linkedPaths &&
                                    linkedPaths.forEach(function (linkPath) {
                                        for (var ancestor = linkPath; ancestor; ) {
                                            if (candidates.indexOf(ancestor) >= 0) {
                                                linked.push(node);
                                                break;
                                            }
                                            ancestor = ancestor.getParent();
                                        }
                                    }));
                        };
                    return (visitElement(element), !linked.length && element.hasMixin(GNode.Container) && element.acceptChildren(visitElement), linked);
                }),
                (GEditor.prototype.cloneSelection = function (shift, remember) {
                    if (this._selection && this._selection.length > 0) {
                        for (var elements = this.getIndividualSelection(), cloneSpecs = [], exceptions = [], a = 0; a < elements.length; ++a) {
                            var s = elements[a];
                            ((exceptions = exceptions.concat(this.getLinkedElementsInSelection(s, elements))),
                                s.hasMixin(GNode.Store) &&
                                    cloneSpecs.push({
                                        element: s,
                                        transform: shift ? new GTransform(1, 0, 0, 1, GEditorOptions.cloneShift, GEditorOptions.cloneShift) : null,
                                    }));
                        }
                        exceptions = exceptions.concat(this.getAnnotationsExceptions(elements));
                        var clones = [];
                        if (remember) {
                            if (this._lastCloneSelection)
                                for (a = 0; a < this._lastCloneSelection.length; ++a) {
                                    var h = this._lastCloneSelection[a],
                                        A = cloneSpecs[a].element;
                                    if (h.hasMixin(GElement.Transform) && A.hasMixin(GElement.Transform)) {
                                        var c = h.getTransform(),
                                            p = A.getTransform();
                                        if (p) {
                                            var u = c ? p.preMultiplied(c.inverted()) : p;
                                            u.isIdentity() || (cloneSpecs[a].transform = u);
                                        }
                                    }
                                }
                            var originals = [];
                        }
                        for (a = 0; a < cloneSpecs.length; ++a) {
                            s = cloneSpecs[a].element;
                            var g = cloneSpecs[a].transform,
                                f = s.clone({
                                    exceptions: exceptions,
                                    copy: true,
                                    copyIgnoreProperties: GEditorOptions.propertiesExcludedFromCopying,
                                });
                            if (f) {
                                if (f instanceof GPage) {
                                    s.getParent().insertChild(f);
                                    var y = f.getPosition(true, true, true, true);
                                    (f.setProperty("off", new GTransform(1, 0, 0, 1, y.getX(), y.getY())), this._scene.renameClone(s, f));
                                } else s.getParent().insertChild(f, s.getNext());
                                (f instanceof GPage || !g || !f.hasMixin(GElement.Transform) || f.transform(g, true), clones.push(f), remember && originals.push(s));
                            }
                        }
                        if (clones.length > 0) {
                            var sceneEditor = GElementEditor.getEditor(this._scene),
                                wasTransformBoxActive = !!sceneEditor && sceneEditor.isTransformBoxActive();
                            (this.updateSelection(false, clones),
                                clones[0] instanceof GPage && this._scene.setActivePage(clones[0]),
                                (sceneEditor = GElementEditor.getEditor(this._scene)) && wasTransformBoxActive && sceneEditor.setTransformBoxActive(true));
                        }
                        return (remember && (this._lastCloneSelection = originals.slice()), clones);
                    }
                    return null;
                }),
                (GEditor.prototype.deleteSelection = function (noTransaction) {
                    var elements = this.getIndividualSelection();
                    if (
                        (elements &&
                            (elements = elements.slice().filter(function (element) {
                                return !(element.getProperty("plkt") & GBlock.ProgramLck.NoDelete);
                            })),
                        elements && elements.length > 0)
                    ) {
                        (noTransaction || this.beginTransaction(), this._beginSelectionUpdate());
                        try {
                            for (var orderedElements = GNode.order(elements, true), r = 0; r < orderedElements.length; ++r) {
                                for (var o = orderedElements[r], a = o.getParent(); a && (!(a instanceof GSymbol) || a.isMaster()); ) a = a.getParent();
                                if (a && o.hasMixin(GNode.Multireference)) !!a._getMasterSibling(o.getMultireferenceId(), false, true) || (a = null);
                                if (o instanceof GBlock && a && !this._selectionDetail)
                                    (o.setProperties(["vis", "lkt"], [false, GBlock.LockType.Full]),
                                        o.removeFlag(GNode.Flag.Selected),
                                        o.removeFlag(GNode.Flag.Highlighted));
                                else if (o instanceof GItem && !o.hasFlag(GElement.Flag.PartialLocked)) {
                                    var s = GElementEditor.getEditor(o);
                                    if (a && o instanceof GBlock && !s.isDeletePartsAllowed()) continue;
                                    for (
                                        a = o.getParent(),
                                            (s = GElementEditor.getEditor(o)) && s.isDeletePartsAllowed() && !s.isRemovalBlocked()
                                                ? s.deletePartsSelected()
                                                : s && !s.isRemovalBlocked() && a && (o.removeFlag(GNode.Flag.Selected), a.removeChild(o));
                                        (a instanceof GCompoundShape || a instanceof GGroup) && !a.getFirstChild();

                                    ) {
                                        var A = a.getParent();
                                        (A && A.removeChild(a), (a = A));
                                    }
                                } else o instanceof GLayer && !o.hasFlag(GElement.Flag.PartialLocked) && this._scene.deleteActiveLayer(o);
                            }
                        } finally {
                            (this._finishSelectionUpdate(),
                                noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.delete-selection"))));
                        }
                    }
                    return null;
                }),
                (GEditor.prototype.updateSelection = function (toggle, elements) {
                    this._beginSelectionUpdate();
                    try {
                        if (
                            (elements &&
                                elements.length &&
                                (elements = elements.filter(function (element) {
                                    var lockFlags = element.getProperty("plkt");
                                    return !(
                                        lockFlags & GBlock.ProgramLck.NoEdit &&
                                        lockFlags & GBlock.ProgramLck.NoSizeChanges &&
                                        lockFlags & GBlock.ProgramLck.NoMove &&
                                        lockFlags & GBlock.ProgramLck.NoDelete &&
                                        lockFlags & GBlock.ProgramLck.NoSelect
                                    );
                                })),
                            toggle)
                        ) {
                            if (elements && elements.length)
                                for (r = 0; r < elements.length; ++r)
                                    if (elements[r].hasFlag(GNode.Flag.Selected)) {
                                        var i = elements[r].hasMixin(GNode.Container) ? elements[r].getInternalSelectedNodes() : null;
                                        (elements[r].removeFlag(GNode.Flag.Selected),
                                            i &&
                                                i.length &&
                                                i.forEach(function (node) {
                                                    node.setFlag(GNode.Flag.Selected);
                                                }));
                                    } else elements[r].setFlag(GNode.Flag.Selected);
                        } else if ((this.clearSelection(elements), elements && elements.length > 0))
                            for (var r = 0; r < elements.length; ++r) elements[r].setFlag(GNode.Flag.Selected);
                    } finally {
                        this._finishSelectionUpdate();
                    }
                }),
                (GEditor.prototype.updateSelectionUnderCollision = function (toggle, elements, hitArea, multiPageView, partOnly) {
                    var area = hitArea;
                    this._beginSelectionUpdate();
                    try {
                        for (var selected = [], partSelected = [], l = 0; l < elements.length; ++l) {
                            var h = elements[l],
                                A = GElementEditor.openEditor(h);
                            if (multiPageView) {
                                var c = h.findParent(function (node) {
                                        return node instanceof GPage;
                                    }),
                                    p = (c = c || this._scene.getActivePage()).getPosition(multiPageView);
                                area = new GVertexTransformer(hitArea, new GTransform(1, 0, 0, 1, -p.getX(), -p.getY()));
                            }
                            partOnly
                                ? this._selectionDetail &&
                                  A &&
                                  A.isPartSelectionUnderCollisionAllowed() &&
                                  A.updatePartSelectionUnderCollision(toggle, area)
                                : A && A.isPartSelectionUnderCollisionAllowed() && this._selectionDetail
                                  ? A.updatePartSelectionUnderCollision(toggle, area) && partSelected.push(h)
                                  : this._selectionDetail
                                    ? h.isFullUnderCollision(area) && selected.push(h)
                                    : selected.push(h);
                        }
                        if (!partOnly)
                            if (partSelected && partSelected.length)
                                if ((this._selection || (this._selection = []), toggle)) {
                                    for (l = 0; l < partSelected.length; ++l) this._selection.indexOf(partSelected[l]) < 0 && this._tryAddToSelection(partSelected[l]);
                                    this.updateSelection(toggle, selected);
                                } else ((selected = selected.concat(partSelected)), this.updateSelection(toggle, selected));
                            else this.updateSelection(toggle, selected);
                    } finally {
                        this._finishSelectionUpdate();
                    }
                }),
                (GEditor.prototype.highlightSelectablesUnderCollision = function (toggle, elements, hitArea, multiPageView, partOnly) {
                    var matchIndex,
                        elementEditor,
                        exclude,
                        testArea = hitArea,
                        remaining = elements.slice(),
                        toHighlight = [],
                        self = this,
                        computeArea = function (element) {
                            var page = element.findParent(function (ancestor) {
                                    return ancestor instanceof GPage;
                                }),
                                pagePosition = (page = page || self._scene.getActivePage()).getPosition(multiPageView);
                            return new GVertexTransformer(hitArea, new GTransform(1, 0, 0, 1, -pagePosition.getX(), -pagePosition.getY()));
                        };
                    if (
                        (this._scene.acceptChildren(
                            function (node) {
                                if ((matchIndex = remaining.indexOf(node)) >= 0) {
                                    ((exclude = false), remaining.splice(matchIndex, 1));
                                    var child = node;
                                    (partOnly
                                        ? self._selectionDetail &&
                                          ((!toggle && node.hasFlag(GNode.Flag.Highlighted)) ||
                                              ((elementEditor = GElementEditor.openEditor(child)) &&
                                                  elementEditor.isPartSelectionUnderCollisionAllowed() &&
                                                  (multiPageView && (testArea = computeArea(child)), elementEditor.updatePartSelectionUnderCollision(toggle, testArea, true))))
                                        : (node.hasFlag(GNode.Flag.Highlighted) && !toggle) ||
                                          (self._selectionDetail && (elementEditor = GElementEditor.openEditor(child)),
                                          self._selectionDetail && elementEditor && elementEditor.isPartSelectionUnderCollisionAllowed()
                                              ? (self._selectionDetail || (elementEditor = GElementEditor.openEditor(child)),
                                                elementEditor && (multiPageView && (testArea = computeArea(child)), elementEditor.updatePartSelectionUnderCollision(toggle, testArea, true)))
                                              : (self._selectionDetail && multiPageView && (testArea = computeArea(child)),
                                                (self._selectionDetail && !child.isFullUnderCollision(testArea)) ||
                                                    (toggle && child.hasFlag(GNode.Flag.Selected)
                                                        ? toggle &&
                                                          child.hasFlag(GNode.Flag.Selected) &&
                                                          ((exclude = true),
                                                          child.hasFlag(GNode.Flag.Highlighted) && (child.removeFlag(GNode.Flag.Highlighted), removeFlag++))
                                                        : child.setFlag(GNode.Flag.Highlighted)))),
                                        toggle && !partOnly && (exclude || child.hasFlag(GNode.Flag.Highlighted) || toHighlight.push(child)));
                                } else node.hasFlag(GNode.Flag.Highlighted) && node.removeFlag(GNode.Flag.Highlighted);
                                return true;
                            },
                            false,
                            true
                        ),
                        !partOnly && toggle && toHighlight.length)
                    )
                        for (var d = 0; d < toHighlight.length; ++d) {
                            toHighlight[d].setFlag(GNode.Flag.Highlighted);
                        }
                }),
                (GEditor.prototype.clearSelection = function (keep) {
                    if (!GUtil.equals(keep, this._selection)) {
                        this._beginSelectionUpdate();
                        try {
                            for (var t = 0; this._selection && t < this._selection.length; )
                                if (keep && keep.indexOf(this._selection[t]) >= 0) t++;
                                else {
                                    var i = this._selection[t].hasMixin(GNode.Container) ? this._selection[t].getInternalSelectedNodes() : null;
                                    (this._selection[t].removeFlag(GNode.Flag.Selected),
                                        i &&
                                            i.length &&
                                            i.forEach(function (e) {
                                                e.setFlag(GNode.Flag.Selected);
                                            }));
                                }
                        } finally {
                            this._finishSelectionUpdate();
                        }
                    }
                }),
                (GEditor.prototype.clearInternalSelection = function (element, keep) {
                    var internalNodes = element.hasMixin(GNode.Container) ? element.getInternalSelectedNodes() : null;
                    if (internalNodes && internalNodes.length) {
                        if (GUtil.equals(keep, internalNodes)) return false;
                        this._beginSelectionUpdate();
                        try {
                            for (var o = 0; o < internalNodes.length; ++o) (!keep || keep.indexOf(internalNodes[o]) < 0) && internalNodes[o].removeFlag(GNode.Flag.Selected);
                        } finally {
                            return (this._finishSelectionUpdate(), true);
                        }
                    }
                    return false;
                }),
                (GEditor.prototype.storeSelection = function () {
                    this._storedSelection = this._saveSelection();
                }),
                (GEditor.prototype.restoreSelection = function () {
                    this._loadSelection(this._storedSelection);
                }),
                (GEditor.prototype.filterIndividualElements = function (elements) {
                    for (
                        var result = [],
                            isIndividual = function (element) {
                                return !(element instanceof GItem && element.hasFlag(GNode.Flag.Selected));
                            },
                            r = 0;
                        r < elements.length;
                        ++r
                    )
                        elements[r].hasMixin(GNode.Container) ? elements[r].acceptChildren(isIndividual) && result.push(elements[r]) : result.push(elements[r]);
                    return result;
                }),
                (GEditor.prototype.getIndividualSelection = function () {
                    return this._selection ? this.filterIndividualElements(this._selection) : null;
                }),
                (GEditor.prototype.moveSelection = function (delta, useGuides, part, hitResult, startPoint, excludeOnlyChildren, multiPage, collisionless) {
                    if (!this._selection) return new GPoint(0, 0);
                    var movable = this._selection.filter(function (element) {
                        return !(element instanceof GBlock) || (element instanceof GBlock && 0 == (element.getProperty("plkt") & GBlock.ProgramLck.NoMove));
                    });
                    if (!movable.length) return new GPoint(0, 0);
                    var offset = delta;
                    if (useGuides) {
                        var exclusions = this.getAlignExclusions(excludeOnlyChildren);
                        exclusions && this._guides.useExclusions(exclusions);
                        var scopes = this.getMappingScopes(),
                            guideExclusions = null;
                        if (
                            (movable.some(function (element) {
                                return element.hasMixin(GAnnotation);
                            }) && (guideExclusions = [GBBoxGuide]),
                            GGuides.options.zones && startPoint && 1 == movable.length && movable[0].getGeometryBBox())
                        ) {
                            var sideName = (bbox = movable[0].getGeometryBBox()).getClosestSideName(startPoint),
                                sidePoint = bbox.getSide(sideName),
                                mappedPoint = sidePoint.add(delta);
                            (this._guides.beginMap(scopes),
                                (mappedPoint = this._guides.mapPoint(mappedPoint, part ? GGuide.DetailMap.Mode.DetailOnFilterOn : GGuide.DetailMap.Mode.FilterOff, guideExclusions)),
                                this._guides.finishMap(),
                                (offset = mappedPoint.subtract(sidePoint)));
                        } else {
                            var bbox,
                                individualElements = this.filterIndividualElements(movable);
                            if ((bbox = GEditor.getGroupGeometryBBox(individualElements, multiPage))) {
                                var mappedRect = bbox.translated(delta.getX(), delta.getY());
                                (this._guides.beginMap(scopes), (mappedRect = this._guides.mapRect(mappedRect, guideExclusions, !!multiPage)), this._guides.finishMap());
                                var topLeft = bbox.getSide(GRect.Side.TOP_LEFT);
                                offset = mappedRect.getSide(GRect.Side.TOP_LEFT).subtract(topLeft);
                            }
                        }
                    }
                    var options = null;
                    return (
                        multiPage && (((options = new GBoxEditor.EdTransformOptions()).isMultiPage = true), (options.doCollisionlessTransform = collisionless)),
                        this.transformSelection(new GTransform(1, 0, 0, 1, offset.getX(), offset.getY()), part, hitResult, options),
                        new GPoint(offset.getX(), offset.getY())
                    );
                }),
                (GEditor.prototype.scaleSelection = function (scaleX, scaleY, anchorXSign, anchorYSign, unused, part, hitResult, multiPage) {
                    var elements = this.getIndividualSelection(),
                        bbox = GEditor.getGroupGeometryBBox(elements, multiPage);
                    if (bbox) {
                        var anchorX,
                            anchorY,
                            topLeft = bbox.getSide(GRect.Side.TOP_LEFT),
                            bottomRight = bbox.getSide(GRect.Side.BOTTOM_RIGHT),
                            center = bbox.getSide(GRect.Side.CENTER);
                        ((anchorX = anchorXSign < 0 ? bottomRight.getX() : anchorXSign > 0 ? topLeft.getX() : center.getX()), (anchorY = anchorYSign < 0 ? bottomRight.getY() : anchorYSign > 0 ? topLeft.getY() : center.getY()));
                        var transform = new GTransform(1, 0, 0, 1, -anchorX, -anchorY).multiplied(new GTransform(scaleX, 0, 0, scaleY, 0, 0)).multiplied(new GTransform(1, 0, 0, 1, anchorX, anchorY)),
                            options = null;
                        (multiPage && ((options = new GBoxEditor.EdTransformOptions()).isMultiPage = true), this.transformSelection(transform, part, hitResult, options));
                    }
                }),
                (GEditor.prototype.transformSelection = function (transform, part, hitResult, options) {
                    if (this._selection && this._selection.length) {
                        this._selEditor && this._selEditor.edTransform(transform, part, hitResult, options);
                        for (
                            var elements = this.filterIndividualElements(this._selection),
                                activePage = this._scene ? this._scene.getActivePage() : null,
                                pageOffset = activePage ? activePage.getPosition(true) : null,
                                s = 0;
                            s < elements.length;
                            ++s
                        ) {
                            var l,
                                h = elements[s],
                                A = GElementEditor.getEditor(h);
                            if (A)
                                if (options && options.isMultiPage && (l = GEditor.getElementPage(h))) {
                                    var c = l.getPosition(true);
                                    pageOffset && (c = c.subtract(pageOffset));
                                    var p = new GTransform(1, 0, 0, 1, c.getX(), c.getY());
                                    A.edTransform(p.multiplied(transform).multiplied(p.inverted()), part, hitResult, options);
                                } else A.edTransform(transform, part, hitResult, options);
                        }
                        this.hasEventListeners(GEditor.EdGeometryChangeEvent) && this.trigger(new GEditor.EdGeometryChangeEvent());
                    }
                }),
                (GEditor.prototype.resizeSelection = function (side, delta, options) {
                    if (this._selection && this._selection.length) {
                        if (this._selEditor) this._selEditor.resize(side, delta, options);
                        else {
                            var elements = this.filterIndividualElements(this._selection);
                            if (
                                !(elements = elements.filter(function (element) {
                                    return (
                                        !(element instanceof GBlock) || (element instanceof GBlock && 0 == (element.getProperty("plkt") & GBlock.ProgramLck.NoSizeChanges))
                                    );
                                })).length
                            )
                                return;
                            for (var GBlockEditor = require(154), a = 0; a < elements.length; ++a) {
                                var s = elements[a],
                                    l = GElementEditor.getEditor(s);
                                l && l instanceof GBlockEditor && l.resize(side, delta, options);
                            }
                        }
                        this.hasEventListeners(GEditor.EdGeometryChangeEvent) && this.trigger(new GEditor.EdGeometryChangeEvent());
                    }
                }),
                (GEditor.prototype.applyResizeSelection = function (side, delta, noTransaction) {
                    if (this._selection && this._selection.length) {
                        noTransaction || this.beginTransaction();
                        try {
                            for (var linkedElements = [], individualElements = this.filterIndividualElements(this._selection), a = 0; a < individualElements.length; ++a) {
                                var s = individualElements[a];
                                linkedElements = linkedElements.concat(this.getLinkedElementsInSelection(s, individualElements));
                            }
                            if (this._selEditor) this._selEditor.applyPartMove(side, delta, null, linkedElements);
                            else {
                                individualElements = this.filterIndividualElements(this._selection);
                                var GBlockEditor = require(154);
                                for (a = 0; a < individualElements.length; ++a) {
                                    var h = individualElements[a];
                                    linkedElements.length && linkedElements.indexOf(h);
                                    if (h) {
                                        var A = GElementEditor.getEditor(h);
                                        A && A instanceof GBlockEditor && A.applyPartMove(side, delta, null, linkedElements);
                                    }
                                }
                            }
                        } finally {
                            noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.resize-selecion")));
                        }
                    }
                }),
                (GEditor.prototype.resetSelectionTransform = function () {
                    if (this._selection && this._selection.length)
                        for (var e = 0; e < this._selection.length; ++e) {
                            var t = this._selection[e],
                                i = GElementEditor.getEditor(t);
                            i && i.resetTransform();
                        }
                }),
                (GEditor.prototype.applySelectionTransform = function (clone, noTransaction, preview, part) {
                    if (this._selection && this._selection.length) {
                        var individualElements = this.filterIndividualElements(this._selection);
                        this._guides.invalidate();
                        for (var transformable = [], s = 0; s < individualElements.length; ++s) {
                            var l = individualElements[s];
                            (elementEditor = GElementEditor.getEditor(l)) && (elementEditor.canApplyTransform() ? transformable.push(l) : elementEditor.resetTransform());
                        }
                        if (transformable && transformable.length > 0) {
                            var linked = [];
                            if (clone) var clonedOriginals = [];
                            for (s = 0; s < transformable.length; ++s) {
                                var c = transformable[s];
                                linked = linked.concat(this.getLinkedElementsInSelection(c, transformable));
                            }
                            (clone && (linked = linked.concat(this.getAnnotationsExceptions(transformable))), noTransaction || this.beginTransaction());
                            try {
                                var clones = [],
                                    newLinked = [];
                                for (s = 0; s < transformable.length; ++s) {
                                    var elementEditor;
                                    l = transformable[s];
                                    if ((elementEditor = GElementEditor.getEditor(l))) {
                                        var g = l,
                                            f = linked.length && linked.indexOf(g) >= 0 ? null : g;
                                        (f &&
                                            (clone
                                                ? g.hasMixin(GNode.Store)
                                                    ? (f = g.clone({
                                                          exceptions: linked,
                                                          copy: true,
                                                          copyIgnoreProperties: GEditorOptions.propertiesExcludedFromCopying,
                                                      })) &&
                                                      (g.getParent().insertChild(f, g.getNext()),
                                                      f instanceof GPage && this._scene.renameClone(g, f),
                                                      clones.push(f),
                                                      (newLinked = newLinked.concat(this.getLinkedElementsInSelection(f, clones))),
                                                      clonedOriginals.push(g))
                                                    : (f = null)
                                                : g.hasFlag(GElement.Flag.PartialLocked) && (f = null)),
                                            f ? elementEditor.applyTransform(preview ? g : f, part, clone ? newLinked : linked) : elementEditor.resetTransform());
                                    }
                                }
                                (this._selEditor && this._selEditor.resetTransform(),
                                    !preview && clones.length > 0 && this.updateSelection(false, clones),
                                    clone && (this._lastCloneSelection = clonedOriginals.slice()));
                            } finally {
                                noTransaction ||
                                    this.commitTransaction(
                                        clone
                                            ? String.get(new GLocaleKey("GEditor", "action.transform-clone-selection"))
                                            : String.get(new GLocaleKey("GEditor", "action.transform-selection"))
                                    );
                            }
                        }
                    }
                }),
                (GEditor.prototype.setUID = function (uid) {
                    this._uid = uid;
                }),
                (GEditor.prototype.insertElements = function (elements, skipEditors, noTransaction, afterSelection, resolveMasters, targetContainer, before) {
                    (targetContainer = targetContainer || this._scene.querySingle("layer:active") || this._scene) instanceof GLayer && targetContainer.isLocked() && (targetContainer = this._scene);
                    var page = targetContainer === this._scene ? this._scene.getActivePage() : null;
                    if (!page || !page.isLocked()) {
                        var annotationElements = elements.filter(function (element) {
                            return element.hasMixin(GAnnotation);
                        });
                        if (annotationElements.length) {
                            if (((elements = annotationElements), !page)) return;
                            targetContainer = page = page.getAnnotations();
                        } else {
                            if (page) if (page.getProperty("plkt") & GBlock.ProgramLck.NoNewChildren) return;
                            if (targetContainer instanceof GBlock) if (targetContainer.getProperty("plkt") & GBlock.ProgramLck.NoNewChildren) return;
                        }
                        var nextSibling = before || null,
                            candidateParent = null,
                            candidateNext = null,
                            insertionFound = false;
                        if (afterSelection && this.hasSelection())
                            for (var orderedSelection = GNode.order(this._selection.slice(), true), m = 0; m < orderedSelection.length && !insertionFound; ++m)
                                if ((page && orderedSelection[m].getParent() === page) || (!page && orderedSelection[m].getParent() === targetContainer)) ((nextSibling = orderedSelection[m].getNext()), (insertionFound = true));
                                else if (!candidateParent) {
                                    ((candidateParent = orderedSelection[m].getParent()), (candidateNext = orderedSelection[m].getNext()));
                                    for (var y = 0; y < elements.length && candidateParent; ++y)
                                        (!candidateParent.isLocked() && elements[y].validateInsertion(candidateParent, candidateNext)) || ((candidateParent = null), (candidateNext = null));
                                    candidateParent &&
                                        page &&
                                        (candidateParent instanceof GPage
                                            ? candidateParent !== page && (candidateParent = null)
                                            : candidateParent.findParent(function (node) {
                                                  return node instanceof GPage && node !== page;
                                              }) && (candidateParent = null));
                                }
                        (!insertionFound && candidateParent && ((targetContainer = candidateParent), (nextSibling = candidateNext)),
                            (elements = elements.filter(function (element) {
                                if (element instanceof GText)
                                    for (var i = 0; i < elements.length; i++) if (elements[i] instanceof GPathBase && elements[i].hasReferencedText(element)) return false;
                                return true;
                            })),
                            noTransaction || this.beginTransaction());
                        var styleSource = null;
                        !skipEditors &&
                            this._selection &&
                            1 === this._selection.length &&
                            this._selection[0].hasMixin(GElement.Stylable) &&
                            (styleSource = this._selection[0]);
                        var masters,
                            scene = this._scene;
                        if (resolveMasters) {
                            masters = [];
                            var existingSymbols = scene.getSymbols();
                            elements.forEach(function (element) {
                                element.accept(function (node) {
                                    node instanceof GSymbol &&
                                        ((node.getProperty("masterRef") !== node.getReferenceId() &&
                                            node.getProperty("masterRef") !== node.getOldReferenceId()) ||
                                            existingSymbols.concat(masters).some(function (symbol) {
                                                if (symbol.getMultireferenceId() === node.getMultireferenceId()) {
                                                    var reference = scene.getWorkspace().getReference(symbol.getProperty("masterRef"));
                                                    if (reference && reference.getScene() && reference.getScene() === scene) return true;
                                                }
                                                return false;
                                            }) ||
                                            ((node._master = true), masters.push(node)),
                                        node._master ||
                                            existingSymbols.some(function (t) {
                                                if (t.getMultireferenceId() === node.getMultireferenceId())
                                                    return (
                                                        node.getProperty("masterRef") !== t.getProperty("masterRef") &&
                                                            node.setProperty("masterRef", t.getProperty("masterRef")),
                                                        true
                                                    );
                                            }));
                                });
                            });
                        }
                        try {
                            for (m = 0; m < elements.length; ++m) {
                                var w = elements[m];
                                if ((targetContainer.insertChild(w, nextSibling), !skipEditors)) {
                                    var E = GElementEditor.createEditor(w, this._uid);
                                    E && E.initialSetup(styleSource);
                                }
                            }
                            (masters &&
                                (masters.forEach(function (master) {
                                    var oldMasterRef = master.getProperty("masterRef"),
                                        newMasterRef = master.getReferenceId();
                                    (master.setProperty("masterRef", newMasterRef),
                                        scene.acceptChildren(function (node) {
                                            node instanceof GSymbol && node.getProperty("masterRef") === oldMasterRef && node.setProperty("masterRef", newMasterRef);
                                        }));
                                }),
                                scene.acceptChildren(function (node) {
                                    node instanceof GSymbol &&
                                        !node.isMaster() &&
                                        node.getMasterSymbol() &&
                                        !scene.isLinked(node, node.getMasterSymbol()) &&
                                        scene.link(node.getMasterSymbol(), node);
                                })),
                                this.updateSelection(false, elements));
                        } finally {
                            noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.insert-elements")));
                        }
                    }
                }),
                (GEditor.prototype.exchangeElements = function (oldElement, newElements, noTransaction) {
                    noTransaction || this.beginTransaction();
                    try {
                        for (var parent = oldElement.getParent(), nextSibling = oldElement.getNext(true), wasSelected = oldElement.hasFlag(GNode.Flag.Selected), s = 0; s < newElements.length; ++s) {
                            var l = newElements[s];
                            (l.getParent() && l.getParent().removeChild(l), parent.insertChild(l, nextSibling), wasSelected && l.setFlag(GNode.Flag.Selected));
                        }
                        parent.removeChild(oldElement);
                    } finally {
                        noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.change-elements")));
                    }
                }),
                (GEditor.prototype.convertSelectionToPaths = function (noTransaction) {
                    var toConvert = [],
                        resultElements = [];
                    if (this._selection && this._selection.length)
                        for (var r = 0; r < this._selection.length; ++r) {
                            var o = this._selection[r];
                            (o instanceof GPathBase && !(o instanceof GPath)) || !(!o.hasMixin(GVertexSource) || o instanceof GCompoundPath || o instanceof GPathsGraph)
                                ? toConvert.push(o)
                                : resultElements.push(o);
                        }
                    if (toConvert.length) {
                        (noTransaction || this.beginTransaction(), this._beginSelectionUpdate());
                        try {
                            this.updateSelection(false, toConvert);
                            for (r = 0; r < toConvert.length; ++r) {
                                var a = toConvert[r];
                                a.removeFlag(GNode.Flag.Selected);
                                var l = a.getParent(),
                                    h = a.getNext(true),
                                    A = null;
                                if (a instanceof GPathBase) {
                                    l.removeChild(a);
                                    var c = a.cloneAnchorPoints();
                                    (A = new GPath(a.getProperty("closed"), a.getProperty("evenodd"), c)) &&
                                        (A.assignFrom(a), (a = null), l.insertChild(A, h), resultElements.push(A));
                                } else if (a instanceof GText) {
                                    var p = a.getTextShapes();
                                    if ((l.removeChild(a), p))
                                        for (var d = p.length - 1; d >= 0; d--) (l.insertChild(p[d], h), resultElements.push(p[d]));
                                } else if (a.hasMixin(GVertexSource)) {
                                    if ((l.removeChild(a), (A = GPathUtil.createPathFromVertexSource(a)))) {
                                        var f = a.$trf;
                                        ((a.$trf = null),
                                            A.assignFrom(a),
                                            a instanceof GPathBase &&
                                                ((A.$evenodd = a.getProperty("evenodd")), (A.$closed = a.getProperty("closed"))),
                                            (a.$trf = f),
                                            (a = null),
                                            l.insertChild(A, h),
                                            resultElements.push(A));
                                    }
                                } else l.removeChild(a);
                            }
                            ((toConvert = null), this.updateSelection(false, resultElements));
                        } finally {
                            (this._finishSelectionUpdate(),
                                noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.convert-to-paths"))));
                        }
                    }
                }),
                (GEditor.prototype.joinPaths = function () {
                    var joined = null;
                    if (this._selection && this._selection.length) {
                        for (var orderedSelection = GNode.order(this.getSelection().slice()), pathsToJoin = [], r = 0; r < orderedSelection.length; ++r) {
                            ((l = orderedSelection[r]) instanceof GPath || l instanceof GCompoundPath) && pathsToJoin.push(l);
                        }
                        if (pathsToJoin.length > 1) {
                            joined = new GCompoundPath();
                            var o = pathsToJoin[pathsToJoin.length - 1],
                                a = o.getParent(),
                                s = o.getNext();
                            for (r = 0; r < pathsToJoin.length; ++r) {
                                var l;
                                if ((l = pathsToJoin[r]) instanceof GPath) (l.getParent().removeChild(l), joined.getPaths().appendChild(l.clone()));
                                else {
                                    l.getParent().removeChild(l);
                                    for (var h, A = l.cloneSubPaths(), c = A.getFirstChild(); null !== c; c = h)
                                        ((h = c.getNext()), A.removeChild(c), joined.getPaths().appendChild(c));
                                }
                            }
                            a.insertChild(joined, s);
                        } else 1 == pathsToJoin.length && (joined = pathsToJoin[0]);
                    }
                    return joined;
                }),
                (GEditor.prototype.splitCompoundPath = function (compoundPath) {
                    var result = null;
                    if (compoundPath instanceof GCompoundPath) {
                        result = [];
                        var parent = compoundPath.getParent(),
                            nextSibling = compoundPath.getNext();
                        parent && parent.removeChild(compoundPath);
                        for (var next, subPaths = compoundPath.cloneSubPaths(), subPath = subPaths.getFirstChild(); null !== subPath; subPath = next)
                            ((next = subPath.getNext()), subPaths.removeChild(subPath), parent && parent.insertChild(subPath, nextSibling), result.push(subPath));
                    }
                    return result;
                }),
                (GEditor.prototype.arrangeOrder = function (orderType, elements, noTransaction) {
                    var selectionSnapshot = null;
                    if (!elements) {
                        if (!this._selection || 0 === this._selection.length) return;
                        elements = selectionSnapshot = this._selection.slice();
                    }
                    ((elements = orderType === GEditor.ArrangeOrderType.SendToFront || orderType === GEditor.ArrangeOrderType.SendBackward ? GNode.order(elements) : GNode.order(elements, true)),
                        noTransaction || this.beginTransaction());
                    try {
                        for (var o = 0; o < elements.length; ++o) {
                            var a = elements[o],
                                s = a.getParent();
                            switch (orderType) {
                                case GEditor.ArrangeOrderType.SendToFront:
                                    null !== a.getNext() && GEditor.validateBlockInsertion(s, a) && (s.removeChild(a), s.appendChild(a));
                                    break;
                                case GEditor.ArrangeOrderType.BringForward:
                                    var l = a.getNext();
                                    if (null !== l) {
                                        for (var h = null; !h && l; )
                                            (l instanceof GElement && (l.hasFlag(GNode.Flag.Selected) || (h = l)), (l = l.getNext()));
                                        if (null !== h) {
                                            var A = h.getNext();
                                            GEditor.validateBlockInsertion(s, a, A) && (s.removeChild(a), s.insertChild(a, A));
                                        }
                                    }
                                    break;
                                case GEditor.ArrangeOrderType.SendBackward:
                                    var c = a.getPrevious();
                                    if (null !== c) {
                                        for (var p = null; !p && c; )
                                            (c instanceof GElement &&
                                                (c.hasFlag(GNode.Flag.Selected) || (GEditor.validateBlockInsertion(s, a, c) && (p = c))),
                                                (c = c.getPrevious()));
                                        null !== p && (s.removeChild(a), s.insertChild(a, p));
                                    }
                                    break;
                                case GEditor.ArrangeOrderType.SendToBack:
                                    if (null !== a.getPrevious()) {
                                        for (var u = s.getFirstChild(), d = null; !d && u; )
                                            (GEditor.validateBlockInsertion(s, a, u) && (d = u), (u = u.getNext()));
                                        d && (s.removeChild(a), s.insertChild(a, d));
                                    }
                            }
                        }
                    } finally {
                        noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.arrange-order")));
                    }
                    selectionSnapshot && this.updateSelection(false, selectionSnapshot);
                }),
                (GEditor.prototype.arrangeAlign = function (alignType, elements, useUnitedBBox, referenceBBox, noTransaction, ignoreParentBBox) {
                    if (!elements) {
                        if (!this._selection || 0 === this._selection.length) return;
                        elements = this._selection.slice();
                    }
                    for (var sourceElements = elements, unitedBBox = ((elements = []), null), lockedBBox = null, h = 0; h < sourceElements.length; ++h) {
                        if ((p = sourceElements[h]).hasMixin(GElement.Transform)) {
                            if (!(c = p.getGeometryBBox()) || c.getWidth() + c.getHeight() === 0) continue;
                            ((unitedBBox = unitedBBox ? unitedBBox.united(c) : c),
                                elements.push({
                                    bbox: c,
                                    element: p,
                                }),
                                p.hasFlag(GElement.Flag.FullLocked) && (lockedBBox = lockedBBox ? lockedBBox.united(c) : c));
                        }
                    }
                    if (!referenceBBox) for (h = 0; h < elements.length; ++h) referenceBBox = referenceBBox ? referenceBBox.united(elements[h].bbox) : elements[h].bbox;
                    noTransaction || this.beginTransaction();
                    var isSingleElement = 1 === elements.length;
                    try {
                        for (h = 0; h < elements.length; ++h) {
                            var c = useUnitedBBox ? unitedBBox : elements[h].bbox,
                                p = elements[h].element,
                                u = GElementEditor.getEditor(p),
                                d = p.getParent() && isSingleElement && u && !u.isAlignPartsAllowed() && !ignoreParentBBox ? p.getParent().getGeometryBBox() : lockedBBox || referenceBBox;
                            if (!d || d.getWidth() + d.getHeight() === 0 || p.hasFlag(GElement.Flag.FullLocked)) return;
                            switch (alignType) {
                                case GEditor.ArrangeAlignType.AlignLeft:
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignLeft, d.getX(), null)
                                        : d.getX() !== c.getX() && p.transform(new GTransform(1, 0, 0, 1, d.getX() - c.getX(), 0), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignCenter:
                                    var g = d.getX() + d.getWidth() / 2;
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignCenter, g, null)
                                        : g !== c.getX() + c.getWidth() / 2 &&
                                          p.transform(new GTransform(1, 0, 0, 1, g - c.getX() - c.getWidth() / 2, 0), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignRight:
                                    var f = d.getX() + d.getWidth();
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignRight, f, null)
                                        : f !== c.getX() + c.getWidth() &&
                                          p.transform(new GTransform(1, 0, 0, 1, f - c.getWidth() - c.getX(), 0), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignTop:
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignTop, null, d.getY())
                                        : d.getY() !== c.getY() && p.transform(new GTransform(1, 0, 0, 1, 0, d.getY() - c.getY()), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignMiddle:
                                    g = d.getY() + d.getHeight() / 2;
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignMiddle, null, g)
                                        : g !== c.getY() + c.getHeight() / 2 &&
                                          p.transform(new GTransform(1, 0, 0, 1, 0, g - c.getY() - c.getHeight() / 2), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignBottom:
                                    var m = d.getY() + d.getHeight();
                                    u && u.isAlignPartsAllowed()
                                        ? u.alignParts(GEditor.ArrangeAlignType.AlignBottom, null, m)
                                        : m !== c.getY() + c.getHeight() &&
                                          p.transform(new GTransform(1, 0, 0, 1, 0, m - c.getHeight() - c.getY()), true);
                                    break;
                                case GEditor.ArrangeAlignType.AlignJustifyHorizontal:
                                    (d.getX() === c.getX() && c.getWidth() === d.getWidth()) ||
                                        p.transform(
                                            new GTransform(1, 0, 0, 1, 0, 0)
                                                .translated(-c.getX(), -c.getY())
                                                .scaled(d.getWidth() / c.getWidth(), 1)
                                                .translated(c.getX(), c.getY())
                                                .translated(d.getX() - c.getX(), 0)
                                        );
                                    break;
                                case GEditor.ArrangeAlignType.AlignJustifyVertical:
                                    (d.getY() === c.getY() && c.getHeight() === d.getHeight()) ||
                                        p.transform(
                                            new GTransform(1, 0, 0, 1, 0, 0)
                                                .translated(-c.getX(), -c.getY())
                                                .scaled(1, d.getHeight() / c.getHeight())
                                                .translated(c.getX(), c.getY())
                                                .translated(0, d.getY() - c.getY())
                                        );
                            }
                        }
                    } finally {
                        noTransaction || this.commitTransaction(String.get(new GLocaleKey("GEditor", "action.arrange-alignment")));
                    }
                }),
                (GEditor.prototype.updateByMousePosition = function (point, viewTransform, highlightOnly, options) {
                    var scene = this._scene;
                    if (options.multiPageView) {
                        var paintBBox = scene.getPaintBBox(options.multiPageView);
                        if (paintBBox && !paintBBox.isEmpty()) {
                            var scale = 1;
                            viewTransform && ((paintBBox = viewTransform.mapRect(paintBBox)), (scale = viewTransform.getScaleFactor()));
                            var pickDistance = GEditorOptions.pickDistance,
                                activePage = scene.getActivePage(),
                                labelScaleFactor = activePage.isScaleLabel() ? scale : activePage.getScaleLabelFactor(),
                                labelHeight = scene.getLabelBBox(labelScaleFactor).getHeight();
                            if (activePage && !paintBBox.containsPoint(point)) {
                                var width = paintBBox.getWidth();
                                if (!new GRect(paintBBox.getX() - pickDistance, paintBBox.getY() - pickDistance - labelHeight, width + 2 * pickDistance, labelHeight + 2 * pickDistance).containsPoint(point))
                                    return void (highlightOnly
                                        ? scene.iteratePages(function (page) {
                                              page.hasFlag(GNode.Flag.Highlighted) && page.removeFlag(GNode.Flag.Highlighted);
                                          })
                                        : (this._activatedPage = null));
                            }
                            var hitResult = null,
                                hitRect = new GRect(point.getX(), point.getY(), 0, 0);
                            if (viewTransform && viewTransform.invertible()) {
                                var localPoint = viewTransform.inverted().mapPoint(point);
                                hitRect = new GRect(localPoint.getX() - pickDistance, localPoint.getY() - pickDistance - labelHeight, 2 * pickDistance, 2 * (labelHeight + pickDistance));
                            } else hitRect = new GRect(point.getX() - pickDistance, point.getY() - pickDistance, 2 * pickDistance, 2 * pickDistance);
                            var candidates = scene.retrieveChildrenInPaintBBox(hitRect, GQuadTree.RETRIEVE_MODE_INTERSECT),
                                activePageIndex = candidates.indexOf(activePage);
                            (activePageIndex >= 0 && candidates.splice(activePageIndex, 1),
                                candidates.sort(function (pageA, pageB) {
                                    return pageB.getElementIndex() - pageA.getElementIndex();
                                }),
                                activePageIndex >= 0 && candidates.unshift(activePage));
                            for (var v = 0; v < candidates.length && !hitResult; v++)
                                hitResult = candidates[v]._detailHitTest(point, viewTransform, pickDistance, false, null, !!options && options.multiPageView, !candidates[v].isScaleLabel());
                            if (
                                (hitResult &&
                                    !highlightOnly &&
                                    (scene.getActivePage() !== hitResult.element && scene.setActivePage(hitResult.element),
                                    hitResult.data.label && this.updateSelection(false, [hitResult.element])),
                                GEditorOptions.pageSelectable)
                            ) {
                                var moveMaster = require(331 /* MOVE_MASTER */).MOVE_MASTER;
                                scene.iteratePages(function (page) {
                                    highlightOnly && hitResult && page === hitResult.element && hitResult.data.label && (moveMaster || !scene.hasLinks(page))
                                        ? page.setFlag(GNode.Flag.Highlighted)
                                        : page.removeFlag(GNode.Flag.Highlighted);
                                });
                            }
                            highlightOnly || (this._activatedPage = hitResult && hitResult.element);
                        }
                    }
                }),
                (GEditor.prototype.getActivatedPage = function () {
                    return this._activatedPage;
                }),
                (GEditor.prototype.clearHighlighted = function () {
                    this._scene.acceptChildren(
                        function (node) {
                            return (node.hasFlag(GNode.Flag.Highlighted) && node.removeFlag(GNode.Flag.Highlighted), true);
                        },
                        false,
                        true
                    );
                }),
                (GEditor.prototype.importStates = function (workspace, json) {
                    if (!GEditorOptions.debugTransactions) return null;
                    var parsedData = JSON.parse(json),
                        restoredScene = GNode.restore(parsedData.startingScene, workspace),
                        editor = new GEditor(restoredScene),
                        deepRestore = function (value) {
                            if (value instanceof Array) return value.map(deepRestore);
                            if ("object" != typeof value) return value;
                            if (value) {
                                var restored;
                                try {
                                    restored = GNode.restore(value);
                                } catch (e) {}
                                if (restored) return restored;
                                for (var i in ((restored = {}), value)) restored[i] = deepRestore(value[i]);
                                return restored;
                            }
                            return null;
                        },
                        restorePartRef = function (partRef) {
                            var elementSeq = partRef.elementSeq,
                                elementInserted = partRef.elementInserted,
                                elementAction = partRef.elementAction,
                                result = {
                                    parts: partRef.parts ? partRef.parts.map(deepRestore) : null,
                                    elementAction: elementInserted ? elementAction : null,
                                    elementInserted: elementInserted,
                                };
                            return (
                                Object.defineProperty(result, "element", {
                                    get: function () {
                                        return this.elementInserted ? this.elementNode || {} : ((sequenceIdCache = null), editor._seqIdToNode(elementSeq));
                                    },
                                }),
                                result
                            );
                        },
                        restoreAction = function (actionData) {
                            var result = {};
                            for (var i in actionData)
                                if ("action" === i) {
                                    var r = actionData[i];
                                    switch (r.type) {
                                        case GTransactionRecorder.ActionType.Insert:
                                            ((result.node = r.node),
                                                (result.parentSeq = r.parent),
                                                (result.nextSeq = r.next),
                                                (result.makeRecorded = r.makeRecorded),
                                                (result.action = function () {
                                                    sequenceIdCache = null;
                                                    var e = GNode.restore(this.node),
                                                        i = null === result.next ? null : editor._seqIdToNode(this.nextSeq),
                                                        r = editor._seqIdToNode(this.parentSeq);
                                                    (result.makeRecorded && ((this.insertedNode = e), (e.recordedTransaction = true)),
                                                        r.insertChild(e, i));
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.PropertyChange:
                                            (null !== r.node &&
                                                ((result.nodeSeq = r.node),
                                                Object.defineProperty(result, "node", {
                                                    get: function () {
                                                        return ((sequenceIdCache = null), editor._seqIdToNode(this.nodeSeq));
                                                    },
                                                })),
                                                (result.action = function () {
                                                    var e = false,
                                                        t = this.node;
                                                    (t instanceof GElement &&
                                                        !t.isRecordedTransaction() &&
                                                        ((t.recordedTransaction = true), (e = true)),
                                                        t.setProperties(this.properties, this.values, this.custom),
                                                        e && (t.recordedTransaction = false));
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.FlagSet:
                                            (null !== r.node && (result.nodeSeq = r.node),
                                                (result.action = function () {
                                                    editor._seqIdToNode(this.nodeSeq).setFlag(GNode.Flag.Active);
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.FlagRemove:
                                            (null !== r.node && (result.nodeSeq = r.node),
                                                (result.action = function () {
                                                    editor._seqIdToNode(this.nodeSeq).removeFlag(GNode.Flag.Active);
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.BeginBlock:
                                            (null !== r.node && (result.nodeSeq = r.node),
                                                (result.action = function () {
                                                    var e = editor._seqIdToNode(this.nodeSeq),
                                                        t = false;
                                                    (this.withInvalidation &&
                                                        (e instanceof GElement &&
                                                            !e.isRecordedTransaction() &&
                                                            ((e.recordedTransaction = true), (t = true)),
                                                        e._notifyChange(GElement._Change.PrepareGeometryUpdate),
                                                        t && (e.recordedTransaction = false)),
                                                        e._beginBlockChanges(this.changes));
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.EndBlock:
                                            (null !== r.node && (result.nodeSeq = r.node),
                                                (result.action = function () {
                                                    var e = editor._seqIdToNode(this.nodeSeq);
                                                    (e._endBlockChanges(this.changes),
                                                        this.withInvalidation &&
                                                            (e instanceof GElement &&
                                                                !e.isRecordedTransaction() &&
                                                                ((e.recordedTransaction = true), (recordedSet = true)),
                                                            e._notifyChange(GElement._Change.FinishGeometryUpdate),
                                                            recordedSet && (e.recordedTransaction = false)));
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.BeginSelectionUpdate:
                                            result.action = function () {
                                                editor._beginSelectionUpdate();
                                            };
                                            break;
                                        case GTransactionRecorder.ActionType.FinishSelectionUpdate:
                                            result.action = function () {
                                                editor._finishSelectionUpdate();
                                            };
                                            break;
                                        case GTransactionRecorder.ActionType.Remove:
                                            ((result.nodeSeq = r.node),
                                                (result.parentSeq = r.parent),
                                                (result.action = function () {
                                                    sequenceIdCache = null;
                                                    var e = editor._seqIdToNode(this.nodeSeq);
                                                    editor._seqIdToNode(this.parentSeq).removeChild(e);
                                                }));
                                            break;
                                        case GTransactionRecorder.ActionType.Special:
                                            ((result.nodeSeq = r.node),
                                                (result.data = r.data),
                                                (result.action = function () {
                                                    sequenceIdCache = null;
                                                    var e = editor._seqIdToNode(this.nodeSeq);
                                                    e.getTransactionActionDeserialized(result.data).call(e);
                                                }));
                                    }
                                } else result[i] = deepRestore(actionData[i]);
                            return result;
                        };
                    editor._undoStates = [];
                    for (var states = parsedData.states, A = 0; A < states.length; A++)
                        editor._redoStates.push({
                            id: states[A].id,
                            name: states[A].name,
                            action: editor._transactionRedo.bind(editor),
                            revert: editor._transactionUndo.bind(editor),
                            data: {
                                selection: states[A].data.selection ? states[A].data.selection.map(restorePartRef) : null,
                                newSelection: states[A].data.newSelection ? states[A].data.newSelection.map(restorePartRef) : null,
                                actions: states[A].data.actions.map(restoreAction),
                                relatedData: states[A].data.relatedData ? deepRestore(states[A].data.relatedData) : null,
                            },
                        });
                    return restoredScene;
                }),
                (GEditor.prototype.exportStates = function () {
                    if (!GEditorOptions.debugTransactions) return null;
                    var deepStore = function (value) {
                            if (value instanceof GNode) return GNode.store(value);
                            if (value instanceof Array) return value.map(deepStore);
                            if ("object" != typeof value) {
                                if ("function" == typeof value || value instanceof Date) throw new Error("error serializing");
                                return value;
                            }
                            if (value) {
                                if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer || value instanceof DataView)
                                    throw new Error("Invalid object encountered");
                                var result = {};
                                for (var r in value) result[r] = deepStore(value[r]);
                                return result;
                            }
                            return null;
                        },
                        storePartRef = function (storePartRef) {
                            return {
                                elementInserted: storePartRef.elementInserted,
                                elementAction: storePartRef.elementAction,
                                elementSeq: storePartRef.elementSeq,
                                parts: storePartRef.parts ? storePartRef.parts.map(deepStore) : null,
                            };
                        },
                        storeAction = function (actionRecord) {
                            var result = {};
                            for (var n in actionRecord)
                                if ("function" == typeof actionRecord[n]) {
                                    if ("action" === n) {
                                        var r = actionRecord[n];
                                        result.action = {
                                            node: r.type === GTransactionRecorder.ActionType.Insert ? r.nodeStored : r.node,
                                            type: r.type,
                                            parent: r.parent ? r.parent : null,
                                            makeRecorded: !!r.makeRecorded,
                                            next: r.next ? r.next : null,
                                            data: r.data ? deepStore(r.data) : null,
                                        };
                                    }
                                } else result[n] = deepStore(actionRecord[n]);
                            return result;
                        },
                        exportData = {};
                    exportData.startingScene = this._startingScene;
                    var undoStates = this._undoStates;
                    exportData.states = [];
                    for (var a = 0; a < undoStates.length; a++)
                        exportData.states.push({
                            id: undoStates[a].id,
                            name: undoStates[a].name,
                            data: {
                                selection: undoStates[a].data.selection ? undoStates[a].data.selection.map(storePartRef) : null,
                                newSelection: undoStates[a].data.newSelection ? undoStates[a].data.newSelection.map(storePartRef) : null,
                                actions: undoStates[a].data.actions.map(storeAction),
                                relatedData: deepStore(undoStates[a].data.relatedData),
                            },
                        });
                    return JSON.stringify(exportData);
                }),
                (GEditor.prototype.beginTransaction = function () {
                    GElementEditor.getEditor(this._scene);
                    var transactionState = {
                        selection: this._saveSelection(),
                    };
                    "function" == typeof gdb_loaddesign &&
                        0 === this._undoStates.length &&
                        GEditorOptions.debugTransactions &&
                        (this._startingScene = GNode.store(this._scene));
                    var recorder = this._scene.getWorkspace() ? this._scene.getWorkspace().getTransactionRecorder() : null;
                    if (recorder) {
                        if (this._transactionStack.length) {
                            var pendingActions = recorder.endTransaction();
                            pendingActions && pendingActions.length && (this._transactionStack[this._transactionStack.length - 1].actions = pendingActions);
                        }
                        recorder.beginTransaction("function" == typeof gdb_loaddesign && GEditorOptions.debugTransactions);
                    }
                    return (this._addDebugData("selection", transactionState.selection), this._transactionStack.push(transactionState), transactionState);
                }),
                (GEditor.prototype._transactionRedo = function (state) {
                    if (state.newSelection && state.newSelection.length)
                        for (var t = 0; t < state.newSelection.length; ++t) state.newSelection[t].element.recordedTransaction = true;
                    for (t = 0; t < state.actions.length; ++t) state.actions[t].action();
                    if (
                        (this._fixDebugData(state.newSelection, state.actions),
                        this._loadSelection(state.newSelection),
                        state.newSelection && state.newSelection.length)
                    )
                        for (t = 0; t < state.newSelection.length; ++t) state.newSelection[t].element.recordedTransaction = false;
                }),
                (GEditor.prototype._transactionUndo = function (state) {
                    if (state.selection && state.selection.length)
                        for (var t = 0; t < state.selection.length; ++t) state.selection[t].element.recordedTransaction = true;
                    for (t = state.actions.length - 1; t >= 0; --t) state.actions[t].revert();
                    if ((this._loadSelection(state.selection), state.selection && state.selection.length))
                        for (t = 0; t < state.selection.length; ++t) state.selection[t].element.recordedTransaction = false;
                }),
                (GEditor.prototype.commitTransaction = function (name, relatedData) {
                    if (!this._transactionStack.length) throw new Error("Nothing to commit, transaction stack is empty.");
                    var actions = null,
                        recorder = this._scene.getWorkspace() ? this._scene.getWorkspace().getTransactionRecorder() : null;
                    recorder && ((this._debugBugged = this._debugBugged || recorder.getDebugBugged()), (actions = recorder.endTransaction()));
                    var transactionState = this._transactionStack.pop();
                    if ((actions || (actions = transactionState.actions ? transactionState.actions.slice() : null), actions && actions.length > 0)) {
                        var stateData = {
                            actions: actions,
                            selection: transactionState.selection ? transactionState.selection.slice() : null,
                            newSelection: this._saveSelection(),
                        };
                        (relatedData && (stateData.relatedData = relatedData),
                            this._addDebugData("selection", stateData.newSelection, stateData.actions),
                            this.pushState(name, this._transactionRedo.bind(this), this._transactionUndo.bind(this), stateData));
                    }
                }),
                (GEditor.prototype.pushState = function (name, action, revert, data) {
                    (this._undoStates.length >= GEditorOptions.maxUndoSteps && this._undoStates.shift(),
                        this._undoStates.push({
                            id: GUtil.uuid(),
                            name: name || "",
                            action: action,
                            revert: revert,
                            data: data,
                            createdAt: Date.now(),
                        }),
                        (this._redoStates = []),
                        this.hasEventListeners(GEditor.ModifiedEvent) &&
                            (data.relatedData
                                ? this.trigger(new GEditor.ModifiedEvent(data.relatedData, GEditor.ModifiedEvent.Type.Raw))
                                : this.trigger(GEditor.MODIFIED_EVENT)));
                }),
                (GEditor.prototype.hasUndoState = function () {
                    return this._undoStates.length > 0;
                }),
                (GEditor.prototype.getUndoStates = function () {
                    return this._undoStates;
                }),
                (GEditor.prototype.getRedoStates = function () {
                    return this._redoStates;
                }),
                (GEditor.prototype.hasRedoState = function () {
                    return this._redoStates.length > 0;
                }),
                (GEditor.prototype.getUndoStateName = function () {
                    return this._undoStates.length > 0 ? this._undoStates[this._undoStates.length - 1].name : null;
                }),
                (GEditor.prototype.getRedoStateName = function () {
                    return this._redoStates.length > 0 ? this._redoStates[this._redoStates.length - 1].name : null;
                }),
                (GEditor.prototype.undoState = function () {
                    if (this._undoStates.length > 0) {
                        var entry = this._undoStates.pop();
                        (this._redoStates.push(entry),
                            this._scene.trigger(new GScene.RecordedTransactionStartedEvent(this._scene)),
                            entry.revert(entry.data),
                            this._scene.trigger(new GScene.RecordedTransactionFinishedEvent(this._scene)),
                            this.hasEventListeners(GEditor.ModifiedEvent) &&
                                (entry.data.relatedData
                                    ? this.trigger(new GEditor.ModifiedEvent(entry.data.relatedData, GEditor.ModifiedEvent.Type.Undo))
                                    : this.trigger(GEditor.MODIFIED_EVENT)));
                    }
                }),
                (GEditor.prototype.redoState = function () {
                    if (this._redoStates.length > 0) {
                        var entry = this._redoStates.pop();
                        (this._undoStates.push(entry),
                            this._scene.trigger(new GScene.RecordedTransactionStartedEvent(this._scene)),
                            entry.action(entry.data),
                            this._scene.trigger(new GScene.RecordedTransactionFinishedEvent(this._scene)),
                            this.hasEventListeners(GEditor.ModifiedEvent) &&
                                (entry.data.relatedData
                                    ? this.trigger(new GEditor.ModifiedEvent(entry.data.relatedData, GEditor.ModifiedEvent.Type.Redo))
                                    : this.trigger(GEditor.MODIFIED_EVENT)));
                    }
                }),
                (GEditor.prototype.getCurrentStateId = function () {
                    return this._undoStates && this._undoStates.length ? this._undoStates[this._undoStates.length - 1].id : null;
                }),
                (GEditor.prototype.markSavePoint = function (savePointId) {
                    var previousSavePointId = this._savePointId;
                    if (void 0 !== savePointId && "string" == typeof savePointId) {
                        for (var i = this._undoStates.length - 1; i >= 0; i--)
                            if (this._undoStates[i].id === savePointId) {
                                this._savePointId = savePointId;
                                break;
                            }
                    } else
                        this._savePointId =
                            this._undoStates && this._undoStates.length ? this._undoStates[this._undoStates.length - 1].id : null;
                    return new GEditor._SavePoint(this, previousSavePointId, this._savePointId);
                }),
                (GEditor.prototype.isModified = function (predicate) {
                    if (this.hasUndoState()) {
                        if ("function" == typeof predicate) {
                            for (var entry, i = this._undoStates.length - 1; i >= 0; i--) {
                                if ((entry = this._undoStates[i]).id === this._savePointId) return false;
                                if (entry.data) {
                                    if (
                                        entry.data.newSelection &&
                                        entry.data.newSelection.some(function (t) {
                                            return !predicate(t.element);
                                        })
                                    )
                                        return true;
                                    if (
                                        entry.data.selection &&
                                        entry.data.selection.some(function (t) {
                                            return !predicate(t.element);
                                        })
                                    )
                                        return true;
                                    if (
                                        !entry.data.newSelection &&
                                        !entry.data.selection &&
                                        entry.data.actions &&
                                        entry.data.actions.some(function (t) {
                                            if (t.isPropertyChangeAction && !predicate(t.node)) return true;
                                        })
                                    )
                                        return true;
                                }
                            }
                            return false;
                        }
                        return this._undoStates[this._undoStates.length - 1].id !== this._savePointId;
                    }
                    return null !== this._savePointId;
                }),
                (GEditor.prototype.isElementModified = function (element, threshold) {
                    threshold || (threshold = 2);
                    var i = 0;
                    if (this.hasUndoState())
                        for (var n = this._undoStates.length - 1; n >= 0; --n) {
                            var r = this._undoStates[n].data;
                            if (r)
                                for (var o = r.actions, a = o.length - 1; a >= 0; --a) {
                                    var s = o[a];
                                    if (s.isPropertyChangeAction && s.node === element) {
                                        if (++i < threshold) break;
                                        return true;
                                    }
                                }
                        }
                    return false;
                }),
                (GEditor.prototype.isInlineEditing = function () {
                    return !!this._currentInlineEditorNode;
                }),
                (GEditor.prototype.openInlineEditor = function (element, event, view) {
                    if (!this._scene.getWorkspace().getToolManager().getTemporaryActiveTool()) {
                        this.closeInlineEditor();
                        var elementEditor = GElementEditor.getEditor(element);
                        if (
                            (elementEditor &&
                                element instanceof GCollabText &&
                                !GCollabText.isTextMode(element) &&
                                (element.removeFlag(GNode.Flag.Selected),
                                GElementEditor.closeElementEditor(element),
                                GCollabText.setModeText(element),
                                (elementEditor = GElementEditor.openEditor(element)),
                                element.setFlag(GNode.Flag.Selected)),
                            elementEditor &&
                                (this.hasEventListeners(GEditor.InlineEditorEvent) &&
                                    this.trigger(new GEditor.InlineEditorEvent(elementEditor, GEditor.InlineEditorEvent.Type.TryOpen)),
                                elementEditor.canInlineEdit()))
                        )
                            return (
                                this.hasEventListeners(GEditor.InlineEditorEvent) &&
                                    this.trigger(new GEditor.InlineEditorEvent(elementEditor, GEditor.InlineEditorEvent.Type.BeforeOpen)),
                                elementEditor.beginInlineEdit(event),
                                elementEditor.adjustInlineEditForView(event, view),
                                (this._currentInlineEditorNode = element),
                                this.hasEventListeners(GEditor.InlineEditorEvent) &&
                                    this.trigger(new GEditor.InlineEditorEvent(elementEditor, GEditor.InlineEditorEvent.Type.AfterOpen)),
                                true
                            );
                    }
                    return false;
                }),
                (GEditor.prototype.updateInlineEditorForView = function (view) {
                    if (this._currentInlineEditorNode) {
                        var editor = GElementEditor.getEditor(this._currentInlineEditorNode);
                        editor && editor.isInlineEdit() && editor.adjustInlineEditForView(view);
                    }
                }),
                (GEditor.prototype.closeInlineEditor = function () {
                    var closed = false;
                    return (
                        this._currentInlineEditorNode &&
                            (closed = this._finishEditorInlineEdit(this._currentInlineEditorNode)) &&
                            (this._currentInlineEditorNode = null),
                        closed
                    );
                }),
                (GEditor.prototype.getCurrentInlineEditorNode = function () {
                    return this._currentInlineEditorNode;
                }),
                (GEditor.prototype._afterNodeInsert = function (event) {
                    this._tryAddToSelection(event.node);
                }),
                (GEditor.prototype._beforeNodeRemove = function (event) {
                    event.node instanceof GElement &&
                        (this._selection && this._selection.indexOf(event.node) >= 0
                            ? event.node.removeFlag(GNode.Flag.Selected)
                            : this._closeEditor(event.node));
                }),
                (GEditor.prototype._beforeFlagChange = function (event) {}),
                (GEditor.prototype._afterFlagChange = function (event) {
                    if (event.node instanceof GElement) {
                        var t = require(39);
                        if (event.flag === GNode.Flag.Selected) event.set ? this._tryAddToSelection(event.node) : this._tryRemoveFromSelection(event.node);
                        else if (event.flag == GNode.Flag.Highlighted) {
                            var r;
                            if (event.set) (r = GElementEditor.openEditor(event.node, false, true)) && r.setFlag(t.Flag.Highlighted);
                            else ((r = GElementEditor.openEditor(event.node, false, true)) && r.removeFlag(t.Flag.Highlighted), this._tryCloseEditor(event.node));
                        }
                    }
                }),
                (GEditor.prototype._geometryChange = function (event) {
                    if (this._selection && this._selection.indexOf(event.element) >= 0)
                        switch (event.type) {
                            case GElement.GeometryChangeEvent.Type.Before:
                            case GElement.GeometryChangeEvent.Type.After:
                            case GElement.GeometryChangeEvent.Type.Child:
                                var t = GElementEditor.getEditor(event.element);
                                t && t.requestInvalidation();
                        }
                }),
                (GEditor.prototype._beginSelectionUpdate = function () {
                    this._selectionUpdateCounter += 1;
                    var recorder = this._scene.getWorkspace() ? this._scene.getWorkspace().getTransactionRecorder() : null;
                    recorder && recorder.beginSelectionUpdate(this);
                }),
                (GEditor.prototype._finishSelectionUpdate = function () {
                    0 == --this._selectionUpdateCounter && this._updatedSelection();
                    var recorder = this._scene.getWorkspace() ? this._scene.getWorkspace().getTransactionRecorder() : null;
                    recorder && recorder.finishSelectionUpdate(this);
                }),
                (GEditor.prototype._updatedSelection = function () {
                    if (0 === this._selectionUpdateCounter) {
                        ((this._lastCloneSelection = null),
                            this.hasEventListeners(GEditor.SelectionChangedEvent) && this.trigger(GEditor.SELECTION_CHANGED_EVENT));
                        var styleManager = this._scene.getWorkspace().getStyleEdManager();
                        (styleManager.isActivated() && styleManager.deactivateEditor(), this.updateSelectionEditors());
                    }
                }),
                (GEditor.prototype.updateSelectionEditors = function () {
                    var GBaseEditor = require(39),
                        selection = this.getIndividualSelection();
                    if (
                        (selection &&
                            (selection = selection.filter(function (e) {
                                var t = e.getProperty("plkt");
                                return !(t & GBlock.ProgramLck.NoEdit && t & GBlock.ProgramLck.NoSizeChanges && t & GBlock.ProgramLck.NoMove);
                            })),
                        selection && selection.length > 1 && !this._selectionDetail)
                    )
                        if (this._selEditor) this._selEditor.updateFromSelection();
                        else {
                            var GSelectionPositionEditor = require(745);
                            ((this._selEditor = new GSelectionPositionEditor()),
                                this._selEditor.activate(this._scene, this),
                                (sceneEditor = GElementEditor.getEditor(this._scene)).insertEditor(this._selEditor),
                                this._selEditor.setFlag(GBaseEditor.Flag.Selected));
                        }
                    else if (this._selEditor || (selection && 1 == selection.length && !this._selectionDetail)) {
                        var sceneEditor = GElementEditor.getEditor(this._scene);
                        if (
                            (this._selEditor &&
                                (this._selEditor.requestInvalidation(),
                                GBaseEditor.closeEditor(this._selEditor),
                                delete this._selEditor,
                                (this._selEditor = null)),
                            selection && selection.length >= 1 && (!sceneEditor || !sceneEditor.isTransformBoxActive()))
                        )
                            for (var o = 0; o < selection.length; ++o) {
                                var a = GElementEditor.getEditor(selection[o]);
                                a && a.hasFlag(GBaseEditor.Flag.Outline) && a.removeFlag(GBaseEditor.Flag.Outline);
                            }
                    }
                }),
                (GEditor.prototype._tryAddToSelection = function (element) {
                    if (element instanceof GElement && element.hasFlag(GNode.Flag.Selected)) {
                        var elementEditor = GElementEditor.openEditor(element),
                            GBaseEditor = require(39);
                        if (elementEditor) {
                            (elementEditor.setFlag(GBaseEditor.Flag.Selected), this._selectionDetail && elementEditor.setFlag(GBaseEditor.Flag.Detail));
                            var GCompoundPathEditor = require(235),
                                GPathsGraphEditor = require(275),
                                GPathEditor = require(127),
                                GBoxEditor = require(66),
                                GImageEditor = require(329);
                            (elementEditor instanceof GPathEditor && GCompoundPath.isOwnedPath(elementEditor.getElement()) && elementEditor.setCatchHandle(false),
                                (elementEditor instanceof GPathEditor && !GCompoundPath.isOwnedPath(elementEditor.getElement())) || elementEditor instanceof GCompoundPathEditor || elementEditor instanceof GPathsGraphEditor
                                    ? (this._pathResize || elementEditor.removeFlag(GBoxEditor.Flag.ResizeAll),
                                      elementEditor instanceof GPathsGraphEditor && this._selectionEdit && elementEditor.setEditMode(true))
                                    : this._selectionEdit
                                      ? elementEditor instanceof GImageEditor
                                          ? elementEditor.setEditMode(true)
                                          : elementEditor.removeFlag(GBoxEditor.Flag.ResizeAll)
                                      : this._selectionDetail &&
                                        elementEditor instanceof GImageEditor &&
                                        "subselect" == GEditorOptions.selectDoubleClickBehavior &&
                                        elementEditor.setEditMode(true),
                                elementEditor.validateSelectionChange() &&
                                    (this._selection || (this._selection = []), this._selection.push(element), this._updatedSelection()));
                        }
                    }
                }),
                (GEditor.prototype._tryRemoveFromSelection = function (element) {
                    if (element instanceof GElement) {
                        var elementEditor = GElementEditor.getEditor(element),
                            GBaseEditor = require(39);
                        if (
                            (elementEditor && elementEditor.hasFlag(GBaseEditor.Flag.Selected) && (elementEditor.removeFlag(GBaseEditor.Flag.Selected), this._tryCloseEditor(element, true)),
                            this._selection)
                        ) {
                            for (var index = -1, o = 0; o < this._selection.length; ++o) {
                                this._selection[o] === element && (index = o);
                            }
                            index >= 0 &&
                                (this._selection.splice(index, 1),
                                0 == this._selection.length && (this._selection = null),
                                this._updatedSelection());
                        }
                    }
                }),
                (GEditor.prototype._tryCloseEditor = function (element, force) {
                    var elementEditor = GElementEditor.getEditor(element),
                        GBaseEditor = require(39);
                    if (
                        elementEditor &&
                        !elementEditor.hasFlag(GBaseEditor.Flag.Selected) &&
                        !elementEditor.hasFlag(GBaseEditor.Flag.Highlighted) &&
                        (force || null == elementEditor.getEditors() || 0 == elementEditor.getEditors().length)
                    ) {
                        var parentEditor = elementEditor.getParentEditor();
                        (this._closeEditor(element), parentEditor && this._tryCloseEditor(parentEditor.getElement()));
                    }
                }),
                (GEditor.prototype._finishEditorInlineEdit = function (element) {
                    var elementEditor = GElementEditor.getEditor(element);
                    if (elementEditor && elementEditor.isInlineEdit()) {
                        this.hasEventListeners(GEditor.InlineEditorEvent) &&
                            this.trigger(new GEditor.InlineEditorEvent(elementEditor, GEditor.InlineEditorEvent.Type.BeforeClose));
                        var result = null;
                        this.beginTransaction();
                        try {
                            result = elementEditor.finishInlineEdit();
                        } finally {
                            this.commitTransaction(result || String.get(new GLocaleKey("GEditor", "action.inline-editing")));
                        }
                        return (
                            element === this._currentInlineEditorNode && (this._currentInlineEditorNode = null),
                            this.hasEventListeners(GEditor.InlineEditorEvent) &&
                                this.trigger(new GEditor.InlineEditorEvent(elementEditor, GEditor.InlineEditorEvent.Type.AfterClose)),
                            true
                        );
                    }
                    return false;
                }),
                (GEditor.prototype._closeEditor = function (element) {
                    (this._finishEditorInlineEdit(element), GElementEditor.closeElementEditor(element));
                }),
                (GEditor.prototype._saveSelection = function () {
                    if (!this._selection || 0 === this._selection.length) return null;
                    for (var result = [], t = 0; t < this._selection.length; ++t) {
                        var i = this._selection[t],
                            n = GElementEditor.getEditor(i),
                            r = n && n.getPartSelection(),
                            o = n && n.getEditorStateData();
                        o
                            ? result.push({
                                  element: i,
                                  parts: r ? r.slice() : null,
                                  data: o,
                              })
                            : result.push({
                                  element: i,
                                  parts: r ? r.slice() : null,
                              });
                    }
                    return result;
                }),
                (GEditor.prototype._loadSelection = function (savedSelection) {
                    if (savedSelection && 0 !== savedSelection.length) {
                        for (var elements = [], i = 0; i < savedSelection.length; ++i) elements.push(savedSelection[i].element);
                        this.updateSelection(false, elements);
                        for (i = 0; i < savedSelection.length; ++i)
                            if (savedSelection[i].parts || savedSelection[i].data) {
                                var n = GElementEditor.getEditor(savedSelection[i].element);
                                n &&
                                    (savedSelection[i].data && n.restoreEditorStateData(savedSelection[i].data), savedSelection[i].parts && n.updatePartSelection(false, savedSelection[i].parts));
                            }
                    } else this.clearSelection();
                }),
                (GEditor.prototype.selectFromPattern = function (fillPattern, noSelectionUpdate) {
                    var matches = [];
                    return (
                        this._scene &&
                            this._scene.getActivePage() &&
                            this._scene.getActivePage().acceptChildren(
                                function (node) {
                                    if (node.hasMixin(GStylable) && !node.hasFlag(GElement.Flag.FullLocked)) {
                                        var paintLayers = node.getPaintLayers();
                                        if (paintLayers)
                                            for (var layer = paintLayers.getFirstChild(); null !== layer; layer = layer.getNext())
                                                if (
                                                    layer instanceof GStylable.FillPaintLayer &&
                                                    layer.getProperty("_pt") &&
                                                    GUtil.equals(fillPattern, layer.getProperty("_pt"))
                                                ) {
                                                    matches.push(node);
                                                    break;
                                                }
                                    }
                                },
                                false,
                                true
                            ),
                        matches.length > 0 && (noSelectionUpdate || this.updateSelection(false, matches), matches)
                    );
                }),
                (GEditor.prototype.blinkSelection = function (duration, blinkCount) {
                    if (this._selection && this._selection.length) {
                        var elementsToBlink = this._selection.slice(),
                            clearHighlight = function () {
                                this.clearHighlighted();
                            }.bind(this),
                            setHighlight = function () {
                                for (var e = 0; e < elementsToBlink.length; ++e) elementsToBlink[e].setFlag(GNode.Flag.Highlighted);
                            },
                            interval = duration / blinkCount;
                        setHighlight();
                        var highlightTimer = setInterval(setHighlight, interval),
                            clearTimer = 0;
                        (setTimeout(function () {
                            (clearHighlight(), (clearTimer = setInterval(clearHighlight, interval)));
                        }, interval / 2),
                            setTimeout(
                                function () {
                                    (clearInterval(highlightTimer), clearInterval(clearTimer), clearHighlight());
                                }.bind(this),
                                duration - interval / 3
                            ));
                    }
                }),
                (GEditor.prototype.getEdTransformSettings = function () {
                    return this._edTrfSettings;
                }),
                (GEditor.prototype.setFullContentTransform = function (enabled) {
                    this._edTrfSettings
                        ? (this._edTrfSettings.fullContentTransform = !!enabled)
                        : (this._edTrfSettings = {
                              fullContentTransform: !!enabled,
                          });
                }),
                (GEditor.prototype.clearEdTransformSettings = function () {
                    this._edTrfSettings = null;
                }),
                (GEditor.prototype.toString = function () {
                    return "[Object GEditor]";
                }));
            var sequenceIdCache = null;
            ((GEditor.prototype._getSeqId = function (node) {
                for (var root = node; !(root instanceof GElement); ) root = root.getParent();
                if ("function" != typeof root.getScene) return -1;
                var scene = root.getScene();
                if (!scene) return -1;
                if (node === scene) return -10;
                if (!sequenceIdCache) {
                    var idMap = {};
                    (scene.getSubnodeIds(idMap), (sequenceIdCache = Object.values(idMap)));
                }
                var seqId = sequenceIdCache.indexOf(node);
                if (seqId < 0) throw new Error("Couldn't determine node's sequence ID");
                return seqId;
            }),
                (GEditor.prototype._seqIdToNode = function (seqId) {
                    if (-10 === seqId) return this._scene;
                    if (seqId < 0) throw new Error("Invalid sequence ID");
                    if (!sequenceIdCache) {
                        var idMap = {};
                        (this._scene.getSubnodeIds(idMap), (sequenceIdCache = Object.values(idMap)));
                    }
                    if (sequenceIdCache.length <= seqId) throw new Error("Sequence ID too big");
                    return sequenceIdCache[seqId];
                }),
                (GEditor.prototype._debugBugged = false),
                (GEditor.prototype._fixDebugData = function (newSelection, actions) {
                    if ("function" == typeof gdb_loaddesign) {
                        if (this._debugBugged || !GEditorOptions.debugTransactions) return;
                        if (newSelection && actions)
                            for (var i = 0; i < newSelection.length; i++)
                                if (newSelection[i].elementInserted) {
                                    var n = newSelection[i].elementAction;
                                    newSelection[i].elementNode = actions[n].insertedNode;
                                }
                    }
                }),
                (GEditor.prototype._addDebugData = function (key, selectionEntries, actions) {
                    if ("function" == typeof gdb_loaddesign) {
                        var recorder = this._scene.getWorkspace() ? this._scene.getWorkspace().getTransactionRecorder() : null;
                        if ((recorder && (this._debugBugged = this._debugBugged || recorder.getDebugBugged()), this._debugBugged || !GEditorOptions.debugTransactions))
                            return;
                        if (((sequenceIdCache = null), "selection" === key && selectionEntries))
                            for (var r = 0; r < selectionEntries.length; r++) {
                                var o = false;
                                if (actions)
                                    for (var a = 0; a < actions.length; a++)
                                        if (actions[a].action.type === GTransactionRecorder.ActionType.Insert && actions[a].action.node === selectionEntries[r].element) {
                                            ((actions[a].action.makeRecorded = true),
                                                (o = true),
                                                (selectionEntries[r].elementInserted = true),
                                                (selectionEntries[r].elementAction = a));
                                            break;
                                        }
                                if (!o) {
                                    var s = this._getSeqId(selectionEntries[r].element);
                                    selectionEntries[r].elementSeq = s;
                                }
                            }
                    }
                }),
                (module.exports = GEditor));
        };
