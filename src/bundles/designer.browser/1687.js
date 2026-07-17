module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34));
        var GObject = require(1),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */));
        const { DateAPI, DESIGNER: { TITLE } = {} } = require(10 /* designerConfig */),
            GDocumentEvent = require(78),
            defaultMemoryCheckInterval = DateAPI.minutesToMilliseconds(1),
            defaultMemoryUsageThreshold = 0.8,
            defaultAutostartTime = DateAPI.minutesToMilliseconds(30);
        module.exports = class {
            constructor() {
                let {
                    memoryCheckInterval: memoryCheckInterval = defaultMemoryCheckInterval,
                    memoryUsageThreshold: memoryUsageThreshold = defaultMemoryUsageThreshold,
                    autostartTime: autostartTime = defaultAutostartTime,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((this._memoryCheckInterval = Math.max(memoryCheckInterval, DateAPI.minutesToMilliseconds(1))),
                    (this._memoryUsageThreshold = memoryUsageThreshold),
                    (this._autostartTime = autostartTime));
            }
            start() {
                (this.stop(),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                    this._memoryUsageThreshold <= 0 ||
                        (gContainer.isMemoryInfoAvailable() &&
                            (this._memoryCheckIntervalId = setInterval(this._checkMemory.bind(this), this._memoryCheckInterval))));
            }
            stop() {
                (this._autostartScheduleId && (clearTimeout(this._autostartScheduleId), delete this._autostartScheduleId),
                    this._memoryCheckIntervalId && (clearInterval(this._memoryCheckIntervalId), delete this._memoryCheckIntervalId),
                    gDesigner.removeEventListener(GDocumentEvent, this._documentEvent, this));
            }
            _checkMemory() {
                this._calculateThreshold() >= this._memoryUsageThreshold &&
                    (this._openWarningDialog(), this.stop(), this._scheduleStartup());
            }
            _calculateThreshold() {
                const memoryInfo = gContainer.getMemoryInfo();
                return memoryInfo ? memoryInfo.heapSizeInUse / memoryInfo.heapSizeLimit : 0;
            }
            _scheduleStartup() {
                this._autostartTime > 0 &&
                    (this._autostartScheduleId = setTimeout(() => {
                        this.start();
                    }, this._autostartTime));
            }
            _openWarningDialog() {
                this._dialog ||
                    (gDesigner.stats("memorywarningdialog_open"),
                    (this._dialog = GSystemDialog.default.custom({
                        closeCallback: () => {
                            delete this._dialog;
                        },
                        className: "g-memory-warn-dialog",
                        closeable: false,
                        icon: "info",
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GMemoryManager", "text.title")).replace("%app", TITLE),
                        subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GMemoryManager", "text.subtitle")),
                        buttons: [
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                                onclick: (dialogElement) => {
                                    dialogElement.gDialog("close");
                                },
                                highlighted: true,
                            },
                        ],
                    })));
            }
            _documentEvent(event) {
                event.type === GDocumentEvent.Type.Removed && (gDesigner.hasDocuments() || GObject.GRendererCtx.freeMemory());
            }
        };
    };
