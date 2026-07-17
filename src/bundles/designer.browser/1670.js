module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(32), require(33));
        require(1 /* GObject */);
        (require(85 /* GContainer */), require(1671));
        function PluginManager(storage) {
            this._storage = storage;
        }
        ((PluginManager.prototype._plugins = null),
            (PluginManager.prototype._storage = null),
            (PluginManager.prototype.load = function () {
                try {
                    ((this._plugins = this._storage.getPlugins()),
                        this._plugins &&
                            this._plugins.forEach((plugin) => {
                                try {
                                    plugin.load(this._storage);
                                } catch (error) {
                                    console.error("PluginManager: Could not load plugin", error);
                                }
                            }));
                } catch (error) {
                    console.error("PluginManager: Could not load plugins", error);
                }
            }),
            (PluginManager.prototype.init = function (gravit) {
                if (this._plugins && this._plugins.length) {
                    let createRecord = () => ({
                            actions: [],
                            sidebars: [],
                            panels: [],
                            tools: [],
                            properties: [],
                        }),
                        merged = createRecord();
                    (this._plugins.forEach((plugin) => {
                        try {
                            let pluginRecord = createRecord();
                            (plugin.init(pluginRecord),
                                Object.keys(pluginRecord).forEach((key) => {
                                    merged[key] = merged[key].concat(pluginRecord[key]);
                                }));
                        } catch (error) {
                            console.error("PluginManager: Could not initilize plugin", error);
                        }
                    }),
                        Object.keys(merged).forEach((key) => {
                            gravit[key] = gravit[key].concat(merged[key]);
                        }));
                }
            }),
            (PluginManager.prototype.start = function () {
                this._plugins &&
                    this._plugins.length &&
                    this._plugins.forEach((plugin) => {
                        try {
                            plugin.start();
                        } catch (error) {
                            console.error("PluginManager: Could not start plugin", error);
                        }
                    });
            }),
            (PluginManager.prototype.unload = function (e) {
                this._plugins &&
                    this._plugins.length &&
                    this._plugins.forEach((plugin) => {
                        try {
                            plugin.unload(this._storage, e);
                        } catch (error) {
                            console.error("PluginManager: Could not unload plugin", error);
                        }
                    });
            }),
            (module.exports = PluginManager));
    };
