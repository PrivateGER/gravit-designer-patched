module.exports = function (module, exports, require) {
            var GNode = require(2),
                GSceneNode = require(76),
                GPattern = require(50),
                GLocaleKey = require(47),
                IsFiniteNonNegativeNumber = require(0),
                GFont = require(108),
                GPaintCanvas = require(14),
                GUtil = require(11),
                GRGBColor = require(17);

            function GStylable() {}
            for (var u in (IsFiniteNonNegativeNumber.inherit(GStylable, IsFiniteNonNegativeNumber),
            (GStylable.prototype._effects = null),
            (GStylable.prototype._paintLayers = null),
            (GStylable.prototype._layId = null),
            (GStylable.prototype._effId = null),
            (GStylable.StyleLayer = {
                Fill: "F",
                Border: "B",
            }),
            (GStylable.StyleLayerName = {
                "": new GLocaleKey("GStylable", "layer.element"),
                F: new GLocaleKey("GStylable", "layer.fill"),
                B: new GLocaleKey("GStylable", "layer.border"),
            }),
            (GStylable.BorderAlignment = {
                Center: "C",
                Outside: "O",
                Inside: "I",
            }),
            (GStylable.BorderMarker = {
                Circle: "C",
                Bullet: "B",
                Diamond: "D",
                Line: "L",
                LineDouble: "LD",
                Arrow: "A",
                ArrowFat: "AF",
                ArrowLine: "AL",
                ArrowDoubleLine: "ADL",
                ArrowLineBar: "ALB",
                ArrowPointer: "AP",
            }),
            (GStylable.ParagraphAlignment = {
                Left: "l",
                Center: "c",
                Right: "r",
                Justify: "j",
            }),
            (GStylable.TypographyScript = {
                Subscript: "sub",
                Superscript: "super",
            }),
            (GStylable.TextTransformation = {
                Uppercase: "u",
                Lowercase: "l",
                Capitalize: "c",
                SmallCaps: "s",
            }),
            (GStylable.PropertySet = {
                Style: "S",
                Effects: "E",
                Text: "T",
                Paragraph: "P",
                FillPaintLayers: "FL",
                BorderPaintLayers: "BL",
            }),
            (GStylable.PropertySetInfo = {
                S: {
                    visualProperties: {
                        _sdf: null,
                        _sbl: GPaintCanvas.BlendMode.Normal,
                        _sfop: 1,
                        _stop: 1,
                    },
                },
                E: {},
                FL: {},
                BL: {},
                T: {
                    geometryProperties: {
                        _tff: null,
                        _tfi: 20,
                        _tfw: GFont.Weight.Regular,
                        _tfs: GFont.Style.Normal,
                        _tcs: null,
                        _tws: null,
                        _ttrf: null,
                        _ttsc: null,
                        _tlsc: null,
                        _tv: null,
                        _tdu: false,
                        _tds: false,
                        _tlig: "auto",
                        _tfrac: false,
                        _tstyls: null,
                        _tlocl: null,
                    },
                    visualProperties: {
                        _fc: null,
                    },
                    storeFilter: function (propertyName, value) {
                        return value && "_fc" === propertyName ? GPattern.serialize(value) : value;
                    },
                    restoreFilter: function (propertyName, value) {
                        if (value) {
                            if ("_fc" === propertyName) return GPattern.deserialize(value);
                            if ("_tff" === propertyName) return GFont.getFontFamilyCorrected(value);
                        }
                        return value;
                    },
                },
                P: {
                    geometryProperties: {
                        _pal: null,
                        _plh: 1,
                        _pas: "0",
                        _pai: 0,
                    },
                },
            }),
            (GStylable.AllVisualProperties = {}),
            (GStylable.AllGeometryProperties = {}),
            GStylable.PropertySetInfo)) {
                var d = GStylable.PropertySetInfo[u];
                if (d.visualProperties) for (var g in d.visualProperties) GStylable.AllVisualProperties[g] = d.visualProperties[g];
                if (d.geometryProperties) for (var g in d.geometryProperties) GStylable.AllGeometryProperties[g] = d.geometryProperties[g];
            }
            (require(900)(GStylable),
                require(901)(GStylable),
                require(902)(GStylable),
                require(904)(GStylable),
                require(905)(GStylable),
                require(906)(GStylable),
                (GStylable.prototype.getStylePropertySets = function () {
                    return [GStylable.PropertySet.Style, GStylable.PropertySet.BorderPaintLayers, GStylable.PropertySet.FillPaintLayers, GStylable.PropertySet.Effects];
                }),
                (GStylable.prototype.getEffects = function () {
                    return this.getStylePropertySets().indexOf(GStylable.PropertySet.Effects) >= 0
                        ? (this._effects ||
                              ((this._effects = new GStylable.Effects()),
                              (this._effects._multiReferenceId = this._effId || GUtil.uuid()),
                              this._effects._setParent(this)),
                          this._effects)
                        : null;
                }),
                (GStylable.prototype.getPaintLayers = function () {
                    return this.getStylePropertySets().indexOf(GStylable.PropertySet.BorderPaintLayers) >= 0 ||
                        this.getStylePropertySets().indexOf(GStylable.PropertySet.FillPaintLayers) >= 0
                        ? (this._paintLayers ||
                              ((this._paintLayers = new GStylable.PaintLayers()),
                              (this._paintLayers._multiReferenceId = this._layId || GUtil.uuid()),
                              this._paintLayers._setParent(this)),
                          this._paintLayers)
                        : null;
                }),
                (GStylable.prototype.assignStyleFrom = function (source, blockChanges) {
                    for (var sourceSets = source.getStylePropertySets(), targetSets = this.getStylePropertySets(), commonSets = [], a = 0; a < sourceSets.length; ++a)
                        for (var s = sourceSets[a], l = 0; l < targetSets.length; ++l)
                            if (targetSets[l] === s) {
                                commonSets.push(s);
                                break;
                            }
                    if (commonSets.length) {
                        var hasFillLayers = commonSets.indexOf(GStylable.PropertySet.FillPaintLayers) >= 0,
                            hasBorderLayers = commonSets.indexOf(GStylable.PropertySet.BorderPaintLayers) >= 0;
                        if (hasFillLayers || hasBorderLayers) {
                            var targetPaintLayers = this.getPaintLayers(),
                                sourcePaintLayers = source.getPaintLayers(),
                                geometryChanged = false;
                            blockChanges &&
                                targetPaintLayers._beginBlockChanges([
                                    GNode._Change.BeforeChildRemove,
                                    GNode._Change.AfterChildRemove,
                                    GNode._Change.BeforeChildInsert,
                                    GNode._Change.AfterChildInsert,
                                ]);
                            try {
                                for (var layersToRemove = [], paintLayer = targetPaintLayers.getFirstChild(); null !== paintLayer; paintLayer = paintLayer.getNext())
                                    ((paintLayer instanceof GStylable.FillPaintLayer && hasFillLayers) || (paintLayer instanceof GStylable.BorderPaintLayer && hasBorderLayers)) &&
                                        (geometryChanged || (this._stylePrepareGeometryChange(true), (geometryChanged = true)), layersToRemove.push(paintLayer));
                                for (a = 0; a < layersToRemove.length; a++) targetPaintLayers.removeChild(layersToRemove[a]);
                                if (sourcePaintLayers)
                                    for (var sourcePaintLayer = sourcePaintLayers.getFirstChild(); null !== sourcePaintLayer; sourcePaintLayer = sourcePaintLayer.getNext())
                                        ((sourcePaintLayer instanceof GStylable.FillPaintLayer && hasFillLayers) || (sourcePaintLayer instanceof GStylable.BorderPaintLayer && hasBorderLayers)) &&
                                            (geometryChanged || (this._stylePrepareGeometryChange(true), (geometryChanged = true)), targetPaintLayers.appendChild(sourcePaintLayer.clone()));
                            } finally {
                                (blockChanges &&
                                    targetPaintLayers._endBlockChanges([
                                        GNode._Change.BeforeChildRemove,
                                        GNode._Change.AfterChildRemove,
                                        GNode._Change.BeforeChildInsert,
                                        GNode._Change.AfterChildInsert,
                                    ]),
                                    geometryChanged && this._styleFinishGeometryChange(true));
                            }
                        }
                        if (commonSets.indexOf(GStylable.PropertySet.Effects) >= 0) {
                            var targetEffects = this.getEffects(),
                                sourceEffects = source.getEffects(),
                                effectsChanged = false;
                            blockChanges &&
                                targetEffects._beginBlockChanges([
                                    GNode._Change.BeforeChildRemove,
                                    GNode._Change.AfterChildRemove,
                                    GNode._Change.BeforeChildInsert,
                                    GNode._Change.AfterChildInsert,
                                ]);
                            try {
                                for (; targetEffects.getFirstChild(); )
                                    (effectsChanged || (this._stylePrepareGeometryChange(true), (effectsChanged = true)), targetEffects.removeChild(targetEffects.getFirstChild()));
                                if (sourceEffects)
                                    for (var sourceEffect = sourceEffects.getFirstChild(); null !== sourceEffect; sourceEffect = sourceEffect.getNext())
                                        (effectsChanged || (this._stylePrepareGeometryChange(true), (effectsChanged = true)), targetEffects.appendChild(sourceEffect.clone()));
                            } finally {
                                (blockChanges &&
                                    targetEffects._endBlockChanges([
                                        GNode._Change.BeforeChildRemove,
                                        GNode._Change.AfterChildRemove,
                                        GNode._Change.BeforeChildInsert,
                                        GNode._Change.AfterChildInsert,
                                    ]),
                                    effectsChanged && this._styleFinishGeometryChange(true));
                            }
                        }
                        for (var propertyKeys = [], w = 0; w < commonSets.length; ++w) {
                            var E = GStylable.PropertySetInfo[commonSets[w]],
                                B = [];
                            (E.visualProperties && (B = B.concat(Object.keys(E.visualProperties))),
                                E.geometryProperties && (B = B.concat(Object.keys(E.geometryProperties))));
                            for (a = 0; a < B.length; ++a) {
                                var x = B[a];
                                "_sdf" !== x && propertyKeys.push(x);
                            }
                        }
                        if (propertyKeys.length > 0) {
                            var sourceValues = source.getProperties(propertyKeys);
                            this.setProperties(propertyKeys, sourceValues, false, true);
                        }
                    }
                }),
                (GStylable.prototype.hasStyleBorder = function () {
                    var paintLayers = this.getPaintLayers();
                    return paintLayers && paintLayers.hasStyleBorder();
                }),
                (GStylable.prototype.hasStyleFill = function () {
                    var paintLayers = this.getPaintLayers();
                    return paintLayers && paintLayers.hasStyleFill();
                }),
                (GStylable.prototype.getStyleLayers = function () {
                    var styleSets = this.getStylePropertySets(),
                        fillIndex = styleSets.indexOf(GStylable.PropertySet.FillPaintLayers),
                        borderIndex = styleSets.indexOf(GStylable.PropertySet.BorderPaintLayers),
                        result = null;
                    return ((fillIndex || borderIndex) && ((result = []), fillIndex && result.push(GStylable.StyleLayer.Fill), borderIndex && result.push(GStylable.StyleLayer.Border)), result);
                }),
                (GStylable.prototype.getStyleBorderPadding = function (borderLayer) {
                    return borderLayer.$_ba === GStylable.BorderAlignment.Center ? borderLayer.$_bw / 2 : borderLayer.$_ba === GStylable.BorderAlignment.Outside ? borderLayer.$_bw : 0;
                }),
                (GStylable.prototype._setStyleDefaultProperties = function () {
                    for (var styleSets = this.getStylePropertySets(), layerIdAssigned = false, i = 0; i < styleSets.length; ++i) {
                        var n = GStylable.PropertySetInfo[styleSets[i]];
                        (n.visualProperties && this._setDefaultProperties(n.visualProperties),
                            n.geometryProperties && this._setDefaultProperties(n.geometryProperties),
                            styleSets[i] === GStylable.PropertySet.Effects
                                ? (this._effId = GUtil.uuid())
                                : (styleSets[i] !== GStylable.PropertySet.FillPaintLayers && styleSets[i] !== GStylable.PropertySet.BorderPaintLayers) ||
                                  layerIdAssigned ||
                                  ((this._layId = GUtil.uuid()), (layerIdAssigned = true)));
                    }
                }),
                (GStylable.prototype._handleStyleChange = function (changeType, event) {
                    if (changeType === GNode._Change.BeforePropertiesChange || changeType === GNode._Change.AfterPropertiesChange) {
                        for (var hasVisualChange = false, hasGeometryChange = false, changedProperties = [], changedValues = [], l = 0; l < event.properties.length; ++l) {
                            var h = event.properties[l];
                            GStylable.AllGeometryProperties.hasOwnProperty(h)
                                ? ((hasGeometryChange = true),
                                  changeType === GNode._Change.BeforePropertiesChange
                                      ? this._stylePrepareGeometryChange()
                                      : (changedProperties.push(event.properties[l]), changedValues.push(event.values[l])))
                                : GStylable.AllVisualProperties.hasOwnProperty(h) &&
                                  changeType === GNode._Change.AfterPropertiesChange &&
                                  ((hasVisualChange = true), changedProperties.push(event.properties[l]), changedValues.push(event.values[l]));
                        }
                        !hasGeometryChange && hasVisualChange
                            ? (this._styleRepaint(), this._stylePropertiesUpdated(changedProperties, changedValues))
                            : hasGeometryChange && (this._styleFinishGeometryChange(), this._stylePropertiesUpdated(changedProperties, changedValues));
                    } else if (changeType === GNode._Change.Store)
                        for (var styleSets = this.getStylePropertySets(), layersStored = false, u = 0; u < styleSets.length; ++u) {
                            if ((propertySetId = styleSets[u]) === GStylable.PropertySet.Effects)
                                this._effects && null !== this._effects.getFirstChild()
                                    ? (event.blob._eff = GNode.store(this._effects))
                                    : (event.blob._effId = this._effId);
                            else if (propertySetId === GStylable.PropertySet.FillPaintLayers || propertySetId === GStylable.PropertySet.BorderPaintLayers)
                                !layersStored && this._paintLayers && null !== this._paintLayers.getFirstChild()
                                    ? ((event.blob._layers = GNode.store(this._paintLayers, event.options)), (layersStored = true))
                                    : layersStored || (event.blob._layId = this._layId);
                            else {
                                ((setInfo = GStylable.PropertySetInfo[propertySetId]).visualProperties &&
                                    this.storeProperties(event.blob, setInfo.visualProperties, setInfo.storeFilter),
                                    setInfo.geometryProperties && this.storeProperties(event.blob, setInfo.geometryProperties, setInfo.storeFilter));
                            }
                        }
                    else if (changeType === GNode._Change.Restore) {
                        styleSets = this.getStylePropertySets();
                        var layersRestored = false;
                        for (u = 0; u < styleSets.length; ++u) {
                            var propertySetId;
                            if ((propertySetId = styleSets[u]) === GStylable.PropertySet.Effects)
                                event.blob._eff
                                    ? ((this._effects = GNode.restore(event.blob._eff)), this._effects._setParent(this))
                                    : event.blob._effId && (this._effId = event.blob._effId);
                            else if (propertySetId === GStylable.PropertySet.FillPaintLayers || propertySetId === GStylable.PropertySet.BorderPaintLayers)
                                !layersRestored && event.blob._layers
                                    ? ((this._paintLayers = GNode.restore(event.blob._layers)), this._paintLayers._setParent(this), (layersRestored = true))
                                    : !layersRestored && event.blob._layId && ((this._layId = event.blob._layId), (layersRestored = true));
                            else {
                                var setInfo;
                                ((setInfo = GStylable.PropertySetInfo[propertySetId]).visualProperties &&
                                    this.restoreProperties(event.blob, setInfo.visualProperties, setInfo.restoreFilter),
                                    setInfo.geometryProperties && this.restoreProperties(event.blob, setInfo.geometryProperties, setInfo.restoreFilter));
                            }
                        }
                        var paintLayers = this.getPaintLayers();
                        paintLayers && paintLayers._notifyChange(changeType, event);
                    } else
                        changeType === GNode._Change.ParentAttached || changeType === GNode._Change.ParentDetach
                            ? (this._effects &&
                                  (this._effects._detachFromParent(this),
                                  changeType === GNode._Change.ParentAttached && this._effects._attachToParent(this)),
                              this._paintLayers &&
                                  (this._paintLayers._detachFromParent(this),
                                  changeType === GNode._Change.ParentAttached && this._paintLayers._attachToParent(this)))
                            : (changeType !== GSceneNode._Change.SceneAttached && changeType !== GSceneNode._Change.SceneDetached) ||
                              (this._effects &&
                                  (this._effects._detachFromParent(this),
                                  changeType == GSceneNode._Change.SceneAttached && this._effects._attachToParent(this)),
                              this._paintLayers &&
                                  (this._paintLayers._detachFromParent(this),
                                  changeType === GSceneNode._Change.SceneAttached && this._paintLayers._attachToParent(this)));
                }),
                (GStylable.prototype._stylePrepareGeometryChange = function (e) {}),
                (GStylable.prototype._styleFinishGeometryChange = function (e) {}),
                (GStylable.prototype._styleRepaint = function (e) {}),
                (GStylable.prototype._stylePropertiesUpdated = function (e, t) {}),
                (GStylable.prototype.equalsStyle = function (other) {
                    if (other) {
                        var hasEqualPaintLayers = function (hasEqualPaintLayers) {
                            var layers = other.getPaintLayers();
                            if (!layers) return true;
                            var otherLayer = layers.getFirstChild();
                            if (!(layers = this.getPaintLayers())) return true;
                            var thisLayer = layers.getFirstChild();
                            if ((null === otherLayer && null !== thisLayer) || (null !== otherLayer && null === thisLayer)) return false;
                            for (; null !== otherLayer && null !== thisLayer; ) {
                                if ((null === otherLayer && null !== thisLayer) || (null !== otherLayer && null === thisLayer)) return false;
                                if (null !== otherLayer && null !== thisLayer) {
                                    if (!GUtil.equals(otherLayer, thisLayer)) return false;
                                    for (otherLayer = otherLayer.getNext(), thisLayer = thisLayer.getNext(); null !== otherLayer && !(otherLayer instanceof hasEqualPaintLayers); ) otherLayer = otherLayer.getNext();
                                    for (; null !== thisLayer && !(thisLayer instanceof hasEqualPaintLayers); ) thisLayer = thisLayer.getNext();
                                    if ((null === otherLayer && null !== thisLayer) || (null !== otherLayer && null === thisLayer)) return false;
                                }
                            }
                            return true;
                        }.bind(this);
                        if (other.getProperty("ps").indexOf(GStylable.PropertySet.Style) >= 0) {
                            var propertyKeys = [];
                            ((setInfo = GStylable.PropertySetInfo[GStylable.PropertySet.Style]).visualProperties &&
                                (propertyKeys = propertyKeys.concat(Object.keys(setInfo.visualProperties))),
                                setInfo.geometryProperties && (propertyKeys = propertyKeys.concat(Object.keys(setInfo.geometryProperties))));
                            var allEqual = true;
                            if (
                                (propertyKeys.forEach(
                                    function (propertyKey) {
                                        "_sdf" !== propertyKey && (allEqual = allEqual && this.getProperty(propertyKey) === other.getProperty(propertyKey));
                                    }.bind(this)
                                ),
                                !allEqual)
                            )
                                return false;
                        }
                        if (other.getProperty("ps").indexOf(GStylable.PropertySet.FillPaintLayers) >= 0 && !hasEqualPaintLayers(GStylable.FillPaintLayer)) return false;
                        if (other.getProperty("ps").indexOf(GStylable.PropertySet.BorderPaintLayers) >= 0 && !hasEqualPaintLayers(GStylable.BorderPaintLayer)) return false;
                        if (other.getProperty("ps").indexOf(GStylable.PropertySet.Effects) >= 0) {
                            var otherEffect = other.getEffects().getFirstChild(),
                                thisEffect = this.getEffects().getFirstChild();
                            if ((null === otherEffect && null !== thisEffect) || (null !== otherEffect && null === thisEffect)) return false;
                            for (; null !== otherEffect && null !== thisEffect; ) {
                                if (!GUtil.equals(otherEffect, thisEffect)) return false;
                                if (((otherEffect = otherEffect.getNext()), (thisEffect = thisEffect.getNext()), (null === otherEffect && null !== thisEffect) || (null !== otherEffect && null === thisEffect)))
                                    return false;
                            }
                        }
                        if (other.getProperty("ps").indexOf(GStylable.PropertySet.Text) >= 0) {
                            allEqual = true;
                            for (var textPropertySets = [GStylable.PropertySet.Text, GStylable.PropertySet.Paragraph], s = ((propertyKeys = []), 0); s < textPropertySets.length; ++s) {
                                var setInfo;
                                ((setInfo = GStylable.PropertySetInfo[textPropertySets[s]]).visualProperties && (propertyKeys = propertyKeys.concat(Object.keys(setInfo.visualProperties))),
                                    setInfo.geometryProperties && (propertyKeys = propertyKeys.concat(Object.keys(setInfo.geometryProperties))));
                            }
                            return (
                                this.hasProperty("_tff") &&
                                    propertyKeys.forEach(
                                        function (propertyKey) {
                                            allEqual =
                                                "_fc" === propertyKey
                                                    ? allEqual && GRGBColor.equals(this.getProperty(propertyKey), other.getProperty(propertyKey))
                                                    : allEqual && this.getProperty(propertyKey) === other.getProperty(propertyKey);
                                        }.bind(this)
                                    ),
                                allEqual
                            );
                        }
                    }
                    return true;
                }),
                (GStylable.prototype.toString = function () {
                    return "[Mixin GStylable]";
                }),
                (module.exports = GStylable));
        };
