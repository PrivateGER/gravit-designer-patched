module.exports = function (module, exports, require) {
        "use strict";
        (require(328 /* polyfill:Array */), require(20 /* polyfill:RegExp */), require(34), require(38));
        var GObject = require(1),
            GMissingFontsDialog = require(841),
            GDocumentStatusEvent = require(217),
            DocumentStatus = require(86);
        const GFontsProvider = require(381),
            GOfflineDialog = require(256),
            GNetworkAvailabilityChangedEvent = require(291);
        var providers = [],
            noop = function () {};
        function FontsProviderManager() {
            if (FontsProviderManager._instance) throw new Error("FontsProviderManager can be instantiated only once.");
            FontsProviderManager._instance = this;
        }
        function handleMissingFont(fontRequest) {
            var activeDocument = gDesigner.getActiveDocument(),
                statusListener = function (statusEvent) {
                    var manager = FontsProviderManager.getInstance();
                    if (statusEvent)
                        switch (statusEvent.status) {
                            case DocumentStatus.Saved:
                            case DocumentStatus.SyncFailed:
                            case DocumentStatus.Ready:
                            case DocumentStatus.SaveFailed:
                                (manager.removeEventListener(GDocumentStatusEvent, statusListener), delete manager._listenerFor[activeDocument.sessionId]);
                                break;
                            case DocumentStatus.LoadFailed:
                                (manager.removeEventListener(GDocumentStatusEvent, statusListener), delete manager._listenerFor[activeDocument.sessionId]);
                            default:
                                return;
                        }
                    if (!((activeDocument.getScene().getProperty("cst") || []).indexOf(fontRequest.family) >= 0)) {
                        var missingFamilies = [fontRequest.family],
                            enablers = providers
                                .filter(function (provider) {
                                    return !provider.isInitialized() && provider.hasEnabler();
                                })
                                .map(function (provider) {
                                    return provider.getEnabler();
                                });
                        (!(function (families, targetDocument) {
                            var manager = FontsProviderManager.getInstance();
                            manager._missingFontsActions || (manager._missingFontsActions = {});
                            manager._missingFontsActions[targetDocument.sessionId] || (manager._missingFontsActions[targetDocument.sessionId] = {});
                            for (var actions = manager._missingFontsActions[targetDocument.sessionId], i = families.length - 1; i >= 0; i--) {
                                var a = families[i];
                                actions.hasOwnProperty(a) ? families.splice(i, 1) : (actions[a] = null);
                            }
                        })(missingFamilies, activeDocument),
                            missingFamilies.length &&
                                (manager._missingFontsDialog
                                    ? (manager._missingFontsDialog.setProviderEnablers(enablers), manager._missingFontsDialog.setMissingFonts(missingFamilies))
                                    : missingFamilies.length &&
                                      (manager._missingFontsDialog = new GMissingFontsDialog(activeDocument, missingFamilies, enablers, (resolvedActions) => {
                                          ((manager._missingFontsDialog = null), (manager.keepFontsMessage = null));
                                          var actions = manager._missingFontsActions[activeDocument.sessionId];
                                          for (var o in resolvedActions) actions[o] = resolvedActions[o];
                                      })),
                                fontRequest.tryToResolveMissingFont &&
                                    manager._showMissingFontsDialog &&
                                    !manager._missingFontsDialog.opened &&
                                    manager._missingFontsDialog.open(manager.keepFontsMessage),
                                (manager._firstCallback = noop)));
                    }
                };
            if (activeDocument && activeDocument.getStatus() === DocumentStatus.Ready) statusListener();
            else {
                var fontsManager = FontsProviderManager.getInstance();
                activeDocument && !fontsManager._listenerFor[activeDocument.sessionId] && ((fontsManager._listenerFor[activeDocument.sessionId] = statusListener), fontsManager.addEventListener(GDocumentStatusEvent, statusListener));
            }
        }
        (GObject.GObject.inherit(FontsProviderManager, GObject.GEventTarget),
            (FontsProviderManager.ResetEvent = function (manager) {
                this.manager = manager;
            }),
            GObject.GObject.inherit(FontsProviderManager.ResetEvent, GObject.GEvent),
            (FontsProviderManager.MissingFontEvent = function (manager, fontRequest, provider) {
                ((this.manager = manager), (this.evt = fontRequest), (this.provider = provider));
            }),
            GObject.GObject.inherit(FontsProviderManager.MissingFontEvent, GObject.GEvent),
            (FontsProviderManager.prototype.manager = null),
            (FontsProviderManager.prototype._resetProviders = null),
            (FontsProviderManager.prototype.init = function () {
                gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this);
            }),
            (FontsProviderManager.prototype._networkAvailabilityChangedEvent = function (event) {
                if (this._resetProviders && this._resetProviders.length && event.connected)
                    for (; this._resetProviders.length; ) this.reset(this._resetProviders.shift(), true);
            }),
            (FontsProviderManager.registerProvider = function (ProviderClass) {
                var provider = new ProviderClass(FontsProviderManager._instance);
                providers.indexOf(provider) < 0 && providers.push(provider);
            }),
            (FontsProviderManager.unregisterProvider = function (ProviderClass) {
                for (var t = 0; t < providers.length; t++) providers[t] instanceof ProviderClass && providers.splice(t--, 1);
            }),
            (FontsProviderManager.getInstance = function () {
                return FontsProviderManager._instance || new FontsProviderManager();
            }),
            FontsProviderManager.getInstance(),
            (FontsProviderManager.getProvider = function (family) {
                return familyProviderMap[family] || null;
            }),
            (FontsProviderManager.getProviders = function () {
                return providers.slice();
            }),
            (FontsProviderManager.getProviderInstance = function (ProviderClass) {
                if (FontsProviderManager._instance) for (var t = 0; t < providers.length; t++) if (providers[t] instanceof ProviderClass) return providers[t];
                return null;
            }),
            (FontsProviderManager.disableProviders = function (providerClasses) {
                if (FontsProviderManager._instance) {
                    for (var t = 0; t < providerClasses.length; t++)
                        for (var n = providerClasses[t], o = 0; o < providers.length; o++) providers[o] instanceof n ? providers[o].setEnabled(false) : providers[o].setEnabled(true);
                    FontsProviderManager._instance.reset(null, false, true);
                }
            }),
            (FontsProviderManager.enableProviders = function (providerClasses, keepOthers) {
                if (FontsProviderManager._instance) {
                    for (var n = 0; n < providerClasses.length; n++)
                        for (var o = providerClasses[n], i = 0; i < providers.length; i++) providers[i] instanceof o ? providers[i].setEnabled(true) : keepOthers || providers[i].setEnabled(false);
                    keepOthers || FontsProviderManager._instance.reset(null, false, true);
                }
            }),
            (FontsProviderManager.resolveQueryFontFamily = function (queryRequest) {
                var manager = FontsProviderManager.getInstance(),
                    resolve = () => {
                        var cachedResult = manager.searchFamilyInCache(queryRequest.family);
                        queryRequest.callback(cachedResult && cachedResult.fonts && cachedResult.fonts.length ? cachedResult.fonts : []);
                    };
                manager.isCacheEmpty() ? manager.query(resolve, "%", true) : resolve();
            }),
            (FontsProviderManager._triggerMissingFont = function (fontRequest, provider) {
                var manager = FontsProviderManager.getInstance();
                manager.hasEventListeners(FontsProviderManager.MissingFontEvent) && manager.trigger(new FontsProviderManager.MissingFontEvent(manager, fontRequest, provider));
            }),
            (FontsProviderManager.resolveFont = function (fontRequest, providerIndex) {
                var provider;
                fontRequest && void 0 === providerIndex
                    ? (provider = FontsProviderManager.getProvider(fontRequest.family))
                        ? provider.resolveFont(fontRequest.family, fontRequest.style, fontRequest.weight, {
                              done: function (font) {
                                  var resolvedFont;
                                  (fontRequest.sender instanceof GObject.GFontManager && (resolvedFont = fontRequest.sender._getFont(fontRequest.family, fontRequest.style, fontRequest.weight)),
                                      (resolvedFont && resolvedFont.isResolved()) || (resolvedFont = GObject.GOpenTypeFont.create(fontRequest.family, fontRequest.style, fontRequest.weight, font)),
                                      resolvedFont && fontRequest.resolved(resolvedFont));
                              },
                              fail: function (error) {
                                  error && error === GFontsProvider.Errors.ConnectionError
                                      ? gDesigner.isOffline() && GOfflineDialog.openUnavailableFeature(() => FontsProviderManager.resolveFont(fontRequest))
                                      : (fontRequest.failed(), FontsProviderManager._triggerMissingFont(fontRequest, provider), handleMissingFont(fontRequest));
                              },
                          })
                        : FontsProviderManager.resolveFont(fontRequest, 0)
                    : "number" == typeof providerIndex &&
                      ((provider = providers[providerIndex])
                          ? provider.resolveFont(fontRequest.family, fontRequest.style, fontRequest.weight, {
                                done: function (font) {
                                    var resolvedFont;
                                    (fontRequest.sender instanceof GObject.GFontManager && (resolvedFont = fontRequest.sender._getFont(fontRequest.family, fontRequest.style, fontRequest.weight)),
                                        (resolvedFont && resolvedFont.isResolved()) || (resolvedFont = GObject.GOpenTypeFont.create(fontRequest.family, fontRequest.style, fontRequest.weight, font)),
                                        resolvedFont ? fontRequest.resolved(resolvedFont) : FontsProviderManager.resolveFont(fontRequest, providerIndex + 1));
                                },
                                fail: function () {
                                    FontsProviderManager.resolveFont(fontRequest, providerIndex + 1);
                                },
                            })
                          : providers && providerIndex === providers.length
                            ? (fontRequest.failed(), FontsProviderManager._triggerMissingFont(fontRequest, provider), handleMissingFont(fontRequest))
                            : FontsProviderManager.resolveFont(fontRequest, providerIndex + 1));
            }),
            (FontsProviderManager.prototype._lock = null),
            (FontsProviderManager.prototype._loaded = 0),
            (FontsProviderManager.prototype._lastLoaded = 0),
            (FontsProviderManager.prototype._loadedPreviews = 0),
            (FontsProviderManager.prototype._lastLoadedPreviews = 0),
            (FontsProviderManager.prototype._loading = false),
            (FontsProviderManager.prototype._timeStamp = 0),
            (FontsProviderManager.prototype._firstCallback = null),
            (FontsProviderManager.prototype._missingFontsDialog = null),
            (FontsProviderManager.prototype._missingFontsActions = null),
            (FontsProviderManager.prototype._showMissingFontsDialog = true),
            (FontsProviderManager.prototype._listenerFor = {}),
            (FontsProviderManager.prototype.getMissingFontsDialog = function () {
                return this._missingFontsDialog;
            }),
            (FontsProviderManager.prototype.keepFontsMessage = null));
        var queryCache = {},
            queryCacheOrder = [],
            fullQueryCache = {},
            fullQueryCacheOrder = [],
            familyProviderMap = {};
        ((FontsProviderManager.prototype.isLoading = function () {
            return this._loading;
        }),
            (FontsProviderManager.prototype.releaseDocumentListener = function (document) {
                this._listenerFor[document.sessionId] && this.removeEventListener(GDocumentStatusEvent, this._listenerFor[document.sessionId]);
            }),
            (FontsProviderManager.prototype.setShowMissingFontsDialog = function (show) {
                this._showMissingFontsDialog = show;
            }),
            (FontsProviderManager.prototype.resetMissingFontsDialog = function () {
                this._missingFontsDialog = null;
            }),
            (FontsProviderManager.prototype._providerProbe = function (e, callback, query, timeStamp, faces, total, freshQuery, previewsOnly, includeDisabled, force) {
                for (var loadedCount, lastLoadedCount, provider, self = this, batchSize = previewsOnly ? 20 : 9999; providers[e] && !includeDisabled && !providers[e].isEnabled(); ) e++;
                if (
                    (previewsOnly ? ((loadedCount = this._loadedPreviews), (lastLoadedCount = this._lastLoadedPreviews)) : ((loadedCount = this._loaded), (lastLoadedCount = this._lastLoaded)),
                    e >= providers.length)
                )
                    return (
                        (this._loading = false),
                        (this._timeStamp = timeStamp),
                        void (previewsOnly
                            ? (this._loadedPreviews = this._lastLoadedPreviews)
                            : ((this._loaded = this._lastLoaded),
                              freshQuery &&
                                  faces.length &&
                                  ((!includeDisabled && this.hasDisabled()) ||
                                      ((fullQueryCache[query] = { faces: faces.slice(), total: total }), fullQueryCacheOrder.unshift(query) > 30 && delete fullQueryCache[fullQueryCacheOrder.pop()]),
                                  includeDisabled || ((queryCache[query] = { faces: faces, total: total }), queryCacheOrder.unshift(query) > 30 && delete queryCache[queryCacheOrder.pop()])),
                              callback({ faces: faces, total: total }),
                              includeDisabled || this._providerProbe(0, callback, query, timeStamp, [], 0, freshQuery, true, includeDisabled, force)))
                    );
                var count,
                    target = loadedCount + (loadedCount < 9999 ? 9999 : batchSize),
                    offset = 0;
                if (0 === e && !freshQuery) {
                    var cumulativeTotal = 0;
                    for (e = 0; e < providers.length; e++)
                        if ((includeDisabled || providers[e].isEnabled()) && (cumulativeTotal += providers[e].getTotalFonts(this.normalizeQuery(query))) > loadedCount) {
                            offset = loadedCount - cumulativeTotal + providers[e].getTotalFonts(this.normalizeQuery(query));
                            break;
                        }
                }
                ((!query || "%" === query) && lastLoadedCount < total) || e >= providers.length
                    ? this._providerProbe(providers.length, callback, query, timeStamp, faces, total, freshQuery, previewsOnly, includeDisabled, force)
                    : ((count = target - lastLoadedCount),
                      (provider = providers[e]).load(
                          this.normalizeQuery(query),
                          offset,
                          count,
                          {
                              done: function (fonts, u, p) {
                                  if (timeStamp < this._timeStamp) console.log("discarded");
                                  else {
                                      (providers.indexOf(provider) < 0 || (!includeDisabled && !providers[e].isEnabled())) && this._providerProbe(e + 1, callback, query, timeStamp, faces, total, freshQuery, previewsOnly, includeDisabled);
                                      for (var g = 0; g < fonts.length; g++) familyProviderMap.hasOwnProperty(fonts[g].family) || (familyProviderMap[fonts[g].family] = provider);
                                      if (!previewsOnly) {
                                          var cachedEntry = queryCache[this.normalizeQuery(query)] || { faces: [] };
                                          if (faces !== cachedEntry.faces || includeDisabled) {
                                              for (g = 0; g < faces.length; g++) {
                                                  if ((matchIndex = providers.indexOf(familyProviderMap[faces[g].family])) > e && providers[matchIndex].isEnabled()) {
                                                      Array.prototype.splice.apply(faces, [g, 0].concat(fonts));
                                                      break;
                                                  }
                                              }
                                              if ((g == faces.length && Array.prototype.push.apply(faces, fonts), !includeDisabled)) {
                                                  var cachedFaces = cachedEntry.faces;
                                                  for (g = 0; g < cachedFaces.length; g++) {
                                                      if ((matchIndex = providers.indexOf(familyProviderMap[cachedFaces[g].family])) > e && providers[matchIndex].isEnabled()) {
                                                          Array.prototype.splice.apply(cachedFaces, [g, 0].concat(fonts));
                                                          break;
                                                      }
                                                  }
                                                  g == cachedFaces.length && Array.prototype.push.apply(cachedFaces, fonts);
                                              }
                                          } else {
                                              for (var g = 0; g < faces.length; g++) {
                                                  var matchIndex;
                                                  if ((matchIndex = providers.indexOf(familyProviderMap[faces[g].family])) > e && providers[matchIndex].isEnabled()) {
                                                      Array.prototype.splice.apply(cachedEntry.faces, [g, 0].concat(fonts));
                                                      break;
                                                  }
                                              }
                                              g == faces.length && Array.prototype.push.apply(faces, fonts);
                                          }
                                      }
                                      (provider.addPreviews(fonts, previewsOnly),
                                          (total += provider.getTotalFonts(this.normalizeQuery(query))),
                                          freshQuery && 0 === e && (previewsOnly ? (this._loadedPreviews = 0) : (this._loaded = 0)),
                                          previewsOnly ? (this._lastLoadedPreviews += fonts.length) : (this._lastLoaded += fonts.length),
                                          faces.sort((fontA, fontB) => fontA.family.localeCompare(fontB.family)),
                                          this._providerProbe(e + 1, callback, query, timeStamp, faces, total, freshQuery, previewsOnly, includeDisabled));
                                  }
                              }.bind(self),
                              fail: function (error) {
                                  (force ||
                                      (error &&
                                          error === GFontsProvider.Errors.ConnectionError &&
                                          (self._resetProviders || (self._resetProviders = []), self._resetProviders.push(provider.constructor))),
                                      self._providerProbe(e + 1, callback, query, timeStamp, faces, total, freshQuery, previewsOnly, includeDisabled));
                              }.bind(self),
                          },
                          force
                      ));
            }),
            (FontsProviderManager.prototype.setLock = function () {
                (this._lock && clearTimeout(this._lock),
                    (this._lock = setTimeout(
                        function () {
                            this._lock = null;
                        }.bind(this),
                        1e4
                    )));
            }),
            (FontsProviderManager.prototype.getLock = function () {
                return !!this._lock;
            }),
            (FontsProviderManager.prototype.reset = function (ProviderClass, resetDisabled, keepFullQueryCache) {
                if (ProviderClass) for (var o = 0; o < providers.length; o++) providers[o] instanceof ProviderClass && (resetDisabled || providers[o].isEnabled()) && providers[o].resetProvider();
                (this._lock && (clearTimeout(this._lock), (this._lock = null)),
                    (this._loaded = 0),
                    (this._lastLoaded = 0),
                    (this._loadedPreviews = 0),
                    (this._lastLoadedPreviews = 0),
                    (this._loading = false),
                    (this._timeStamp = 0),
                    (queryCache = {}),
                    (queryCacheOrder = []),
                    keepFullQueryCache || ((fullQueryCache = {}), (fullQueryCacheOrder = [])),
                    this._firstCallback && this.query(this._firstCallback, "%"),
                    this._missingFontsDialog && (this._missingFontsDialog = null),
                    this.hasEventListeners(FontsProviderManager.ResetEvent) && this.trigger(new FontsProviderManager.ResetEvent(this)));
            }),
            (FontsProviderManager.prototype.loadMore = function (callback, query) {
                if (!this._loading) {
                    if (0 === this._loadedPreviews && 0 === this._lastLoadedPreviews) this._providerProbe(0, callback, query, timeStamp, [], 0, false, true);
                    else if (this._loadedPreviews >= 9999 && this._lastLoadedPreviews < this._loadedPreviews + 20)
                        if (this._loaded >= 9999 && this._lastLoaded < this._loaded + 9999) {
                            this._loading = true;
                            var timeStamp = new Date().getTime();
                            this._providerProbe(0, callback, query, timeStamp, [], 0, false, false);
                        } else {
                            this._loading = true;
                            timeStamp = new Date().getTime();
                            this._providerProbe(0, callback, query, timeStamp, [], 0, false, true);
                        }
                    else if (this._loaded >= 9999 && this._lastLoaded < this._loaded + 9999) {
                        this._loading = true;
                        timeStamp = new Date().getTime();
                        this._providerProbe(0, callback, query, timeStamp, [], 0, false, false);
                    }
                    return this._lastLoadedPreviews;
                }
            }),
            (FontsProviderManager.prototype.query = function (callback, query, includeDisabled) {
                if ((query && (query = query.toLowerCase()), includeDisabled && fullQueryCache.hasOwnProperty(query))) callback((cachedEntry = fullQueryCache[query]));
                else if (!includeDisabled && queryCache.hasOwnProperty(query)) {
                    ((this._lastLoaded = 0), (this._lastLoadedPreviews = 0));
                    var cachedEntry = queryCache[query];
                    ((this._loaded = cachedEntry.faces.length), (this._loadedPreviews = cachedEntry.faces.length), callback(cachedEntry));
                } else {
                    if (query.length > 2) {
                        var prefixQuery = query.substr(0, query.length - 2);
                        for (prefixQuery = this.normalizeQuery(prefixQuery); prefixQuery.length > 1; ) {
                            if (queryCache.hasOwnProperty(prefixQuery))
                                if ((cachedEntry = queryCache[prefixQuery]).faces.length < 9999 || cachedEntry.faces.length == cachedEntry.total) {
                                    for (var a = [], r = 0; r < cachedEntry.faces.length; r++)
                                        cachedEntry.faces[r].family.substr(0, query.length - 1).toLowerCase() ==
                                            query.substr(0, query.length - 1).toLowerCase() && a.push(cachedEntry.faces[r]);
                                    return (
                                        (this._lastLoaded = this._lastLoadedPreviews = 0),
                                        (this._loaded = this._loadedPreviews = a.length),
                                        void callback({ faces: a })
                                    );
                                }
                            ((prefixQuery = prefixQuery.substr(0, prefixQuery.length - 2)), (prefixQuery = this.normalizeQuery(prefixQuery)));
                        }
                    }
                    var timeStamp = new Date().getTime();
                    ((this._loading = true),
                        (this._loaded = this._loadedPreviews = 0),
                        (this._lastLoaded = this._lastLoadedPreviews = 0),
                        this._providerProbe(0, callback, query, timeStamp, [], 0, true, false, includeDisabled));
                }
            }),
            (FontsProviderManager.prototype.normalizeQuery = function (query) {
                return ("%" != query && (query ? (query += "%") : (query = "%"), (query = query.replace(/%+$/, "%"))), query);
            }),
            (FontsProviderManager.prototype.isCacheEmpty = function () {
                return !fullQueryCache || !fullQueryCache.hasOwnProperty("%");
            }),
            (FontsProviderManager.prototype.hasDisabled = function () {
                return providers.some((provider) => !provider.isEnabled());
            }),
            (FontsProviderManager.prototype.searchFamilyInCache = function (family) {
                var normalizedFamily = family.toLowerCase() + ("%" == family ? "" : "%");
                if (this.isCacheEmpty()) return null;
                for (; normalizedFamily.length > 0; ) {
                    if (fullQueryCache.hasOwnProperty(normalizedFamily)) {
                        var n = fullQueryCache[normalizedFamily];
                        if (n.faces)
                            for (var o = 0; o < n.faces.length; o++) {
                                var i = n.faces[o];
                                if (i.family === family) return i;
                                if (i.families && i.families.indexOf(family) >= 0) return i;
                            }
                    }
                    if (1 === normalizedFamily.length) break;
                    ((normalizedFamily = normalizedFamily.substr(0, normalizedFamily.length - 2)), (normalizedFamily = this.normalizeQuery(normalizedFamily)));
                }
                return null;
            }),
            (module.exports = FontsProviderManager));
    };
