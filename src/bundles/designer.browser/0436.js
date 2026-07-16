module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { GObject } = require(1 /* GObject */);
        function i(e) {
            ((this._app = e), (this._collaborativeFile = null));
        }
        (GObject.inherit(i, GObject),
            (i.prototype.getOrCreateCollaborativeFile = async function () {
                throw "Not implemented";
            }),
            (i.prototype.createCollaborativeFile = async function () {
                throw "Not implemented";
            }),
            (i.prototype.updateCollaborativeFile = function () {
                throw "Not implemented";
            }),
            (i.prototype.getCollaborativeFile = async function () {
                throw "Not implemented";
            }),
            (i.prototype.shareWithUser = async function (e, t) {
                throw "Not implemented";
            }),
            (i.prototype.unshareWithUser = async function (e, t) {
                throw "Not implemented";
            }),
            (i.prototype.setCollaborativeFileStatus = async function (e) {
                throw "Not implemented";
            }),
            (module.exports = i));
    };
