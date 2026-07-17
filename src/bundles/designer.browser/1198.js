module.exports = function (module, exports, require) {
        "use strict";
        function GFontDBClient() {
            try {
                this._createDB();
            } catch (e) {
                ((this._failedStarting = true), console.log("Cannot createIndexedDB"), GFontDBClient._removeCallbacks());
            }
        }
        ((GFontDBClient.getInstance = function (callback) {
            if (!GFontDBClient._instance || !GFontDBClient._instance._dataBase || GFontDBClient._instance._failedStarting)
                try {
                    if ((callback && GFontDBClient._cb.push(callback), (GFontDBClient._instance && !GFontDBClient._instance._failedStarting) || (GFontDBClient._instance = new GFontDBClient()), callback)) return null;
                } catch (e) {
                    return ((GFontDBClient._instance = null), void GFontDBClient._removeCallbacks());
                }
            return (callback && callback(GFontDBClient._instance), GFontDBClient._instance);
        }),
            (GFontDBClient._removeCallbacks = function (instance) {
                if (GFontDBClient._cb.length) {
                    for (var t = 0; t < GFontDBClient._cb.length; t++) GFontDBClient._cb[t](instance || null);
                    GFontDBClient._cb = [];
                }
            }),
            (GFontDBClient._instance = null),
            (GFontDBClient._cb = []),
            (GFontDBClient.FONT_LIST = "_gravit_font_list_"),
            (GFontDBClient.NATIVE_FONT_LIST = "_gravit_native_font_list_"),
            (GFontDBClient.NATIVE_FONT_LIST_DATE = "_gravit_native_font_list_date_"),
            (GFontDBClient.NATIVE_FONT_LIST_V = "_gravit_native_font_list_v_"));
        var STORE_NAME = "gravitFonts";
        ((GFontDBClient.prototype._cb = null),
            (GFontDBClient.prototype._dataBase = null),
            (GFontDBClient.prototype._cachingService = null),
            (GFontDBClient.prototype._cachingBroken = false),
            (GFontDBClient.prototype._failedStarting = false),
            (GFontDBClient.prototype._createDB = function () {
                try {
                    ((window.indexedDB =
                        window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB),
                        (IDBTransaction =
                            window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction));
                } catch (e) {}
                if (window.indexedDB) {
                    var request = indexedDB.open("gravitFontsDB", 1);
                    if (
                        (request.addEventListener("error", () => {
                            ((this._failedStarting = true), GFontDBClient._removeCallbacks());
                        }),
                        "done" === request.readyState)
                    ) {
                        if (request.error) throw ((this._failedStarting = true), new Error("Failed starting GFontDBClient"));
                        this._requestSuccess({ target: request });
                    } else
                        ((request.onsuccess = this._requestSuccess.bind(this)),
                            (request.onerror = function (event) {
                                0;
                            }));
                    request.onupgradeneeded = this._createStore.bind(this);
                } else GFontDBClient._removeCallbacks();
            }),
            (GFontDBClient.prototype._requestSuccess = function (event) {
                if (this._dataBase) GFontDBClient._removeCallbacks(this);
                else if (((this._dataBase = event.target.result), this._dataBase)) {
                    if (
                        ((this._dataBase.onerror = function (event) {
                            0;
                        }),
                        this._dataBase.setVersion)
                    )
                        if (1 != this._dataBase.version)
                            return void (this._dataBase.setVersion(1).onsuccess = function () {
                                (this._createStore(), GFontDBClient._removeCallbacks(this));
                            }.bind(this));
                    GFontDBClient._removeCallbacks(this);
                }
            }),
            (GFontDBClient.prototype._createStore = function (event) {
                (this._dataBase || (this._dataBase = event.target.result), this._dataBase && this._dataBase.createObjectStore(STORE_NAME));
            }),
            (GFontDBClient.prototype.ready = function () {
                return !!this._dataBase;
            }),
            (GFontDBClient.prototype.clear = function () {
                return $.Deferred(
                    function (deferred) {
                        this._dataBase || deferred.resolveWith(this, [true]);
                        try {
                            var transaction = this._dataBase.transaction([STORE_NAME], "readwrite");
                            try {
                                var clearRequest = transaction.objectStore(STORE_NAME).clear();
                                ((clearRequest.onsuccess = function (event) {
                                    deferred.resolveWith(this, [true]);
                                }.bind(this)),
                                    (clearRequest.onerror = function (event) {
                                        deferred.resolveWith(this, [false]);
                                    }.bind(this)));
                            } catch (t) {
                                return void deferred.resolveWith(this, [false]);
                            }
                        } catch (t) {
                            (0, deferred.resolveWith(this, [false]));
                        }
                    }.bind(this)
                );
            }),
            (GFontDBClient.prototype.deleteItem = function (key) {
                return $.Deferred(
                    function (deferred) {
                        this._dataBase || deferred.resolveWith(this, [true]);
                        try {
                            var transaction = this._dataBase.transaction([STORE_NAME], "readwrite");
                            try {
                                var deleteRequest = transaction.objectStore(STORE_NAME).delete(key);
                                ((deleteRequest.onsuccess = function (event) {
                                    deferred.resolveWith(this, [true]);
                                }.bind(this)),
                                    (deleteRequest.onerror = function (event) {
                                        deferred.resolveWith(this, [false]);
                                    }.bind(this)));
                            } catch (e) {
                                return void deferred.resolveWith(this, [false]);
                            }
                        } catch (e) {
                            (0, deferred.resolveWith(this, [false]));
                        }
                    }.bind(this)
                );
            }),
            (GFontDBClient.prototype.setItem = function (key, value) {
                return $.Deferred(
                    function (deferred) {
                        this._dataBase || deferred.resolveWith(this, [false]);
                        try {
                            var transaction = this._dataBase.transaction([STORE_NAME], "readwrite");
                            try {
                                var putRequest = transaction.objectStore(STORE_NAME).put(value, key);
                                ((putRequest.onsuccess = function (event) {
                                    deferred.resolveWith(this, [true]);
                                }.bind(this)),
                                    (putRequest.onerror = function (event) {
                                        deferred.resolveWith(this, [false]);
                                    }.bind(this)));
                            } catch (e) {
                                return void deferred.resolveWith(this, [false]);
                            }
                        } catch (e) {
                            (0, deferred.resolveWith(this, [false]));
                        }
                    }.bind(this)
                );
            }),
            (GFontDBClient.prototype.updateItem = function (key, value) {
                return $.Deferred(
                    function (deferred) {
                        (this._dataBase || deferred.resolveWith(this, [false]),
                            this.getItem(key).done((existingValue, store) => {
                                try {
                                    var putRequest = store.put(value, key);
                                    ((putRequest.onsuccess = function (event) {
                                        deferred.resolveWith(this, [true]);
                                    }.bind(this)),
                                        (putRequest.onerror = function (event) {
                                            deferred.resolveWith(this, [false]);
                                        }.bind(this)));
                                } catch (e) {
                                    return void deferred.resolveWith(this, [false]);
                                }
                            }));
                    }.bind(this)
                );
            }),
            (GFontDBClient.prototype.pushArray = function (key, value) {
                return $.Deferred(
                    function (deferred) {
                        this._dataBase || deferred.resolveWith(this, [false]);
                        try {
                            var transaction = this._dataBase.transaction([STORE_NAME], "readwrite");
                            transaction.objectStore(STORE_NAME).count(key).onsuccess = function (event) {
                                if ((console.log("number of fonts:" + key + " " + event.target.result), 0 === event.target.result)) {
                                    try {
                                        transaction.objectStore(STORE_NAME).put(value, key);
                                    } catch (e) {
                                        return void deferred.resolveWith(this, [false]);
                                    }
                                    deferred.resolveWith(this, [true]);
                                } else
                                    1 === event.target.result &&
                                        this.getItem(key).done(
                                            function (existingValue, store) {
                                                if (existingValue) {
                                                    var putRequest;
                                                    existingValue = existingValue.concat(value);
                                                    try {
                                                        putRequest = store.put(existingValue);
                                                    } catch (e) {
                                                        return void deferred.resolveWith(this, [false]);
                                                    }
                                                    ((putRequest.onsuccess = function (event) {
                                                        deferred.resolveWith(this, [true]);
                                                    }),
                                                        (putRequest.error = function (event) {
                                                            deferred.resolveWith(this, [false]);
                                                        }));
                                                }
                                            }.bind(this)
                                        );
                            };
                        } catch (e) {
                            (0, deferred.resolveWith(this, [false]));
                        }
                    }.bind(this)
                );
            }),
            (GFontDBClient.prototype.getItem = function (key) {
                var self = this;
                return $.Deferred(function (deferred) {
                    try {
                        var resolveContext = this;
                        self._dataBase || deferred.resolveWith(resolveContext, [null]);
                        var store = self._dataBase.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME),
                            request = store.get(key);
                        ((request.onsuccess = function (event) {
                            var result = event.target.result;
                            deferred.resolveWith(resolveContext, [result, store]);
                        }),
                            (request.onerror = function (event) {
                                event.target.result;
                                deferred.resolveWith(resolveContext, [null, store]);
                            }));
                    } catch (error) {
                        ((error.name = "exception"), deferred.resolveWith(this, [null, store]));
                    }
                });
            }),
            (module.exports = GFontDBClient));
    };
