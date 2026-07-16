module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(329),
                GTextEditor = require(387),
                a = require(66),
                s = require(36),
                l = (require(24), require(531));

            function h(e) {
                (r.call(this, e),
                    (this.__gtype_id__ = IsFiniteNonNegativeNumber.getTypeId(h)),
                    h.setCorrectMode(this, e),
                    (this._flags =
                        this._flags &
                        ~(a.Flag.RotateCorners | a.Flag.RotateHandle | a.Flag.ResizeAll | a.Flag.ResizeCenters | a.Flag.ResizeEdges)));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(h, r),
                s.exports(h, l),
                (h.setCorrectMode = function (e, t) {
                    l.isTextMode(t)
                        ? e._textEditor ||
                          ((e._textEditor = new GTextEditor(t)),
                          e._textEditor.removeFlag(a.Flag.RotateCorners),
                          e._textEditor.removeFlag(a.Flag.RotateHandle),
                          e._textEditor.removeFlag(a.Flag.ResizeAll),
                          e._textEditor.removeFlag(a.Flag.ResizeCenters),
                          e._textEditor.removeFlag(a.Flag.ResizeEdges),
                          e.appendEditor(e._textEditor),
                          (function (e) {
                              var t = e._textEditor;
                              for (var i in GTextEditor.prototype)
                                  i &&
                                      i.length > 0 &&
                                      "constructor" !== i &&
                                      "__gmixins__" != i &&
                                      "toString" != i &&
                                      t[i] instanceof Function &&
                                      (e[i] = function () {
                                          return t[this].apply(t, arguments);
                                      }.bind(i));
                              for (var i in GTextEditor)
                                  i &&
                                      i.length > 0 &&
                                      "constructor" !== i &&
                                      "__gmixins__" != i &&
                                      "toString" != i &&
                                      t[i] instanceof Function &&
                                      (e[i] = function () {
                                          return t[this].apply(t, arguments);
                                      }.bind(i));
                          })(e),
                          (e.getParentEditor = h.prototype.getParentEditor.bind(e)),
                          (e.removeEditor = h.prototype.removeEditor.bind(e)))
                        : e._textEditor &&
                          (!(function (e) {
                              for (var t in GTextEditor)
                                  t &&
                                      t.length > 0 &&
                                      "constructor" !== t &&
                                      "__gmixins__" != t &&
                                      "toString" != t &&
                                      GTextEditor.hasOwnProperty(t) &&
                                      GTextEditor[t] instanceof Function &&
                                      e.hasOwnProperty(t) &&
                                      delete e[t];
                              for (var t in GTextEditor.prototype)
                                  t &&
                                      t.length > 0 &&
                                      "constructor" !== t &&
                                      "__gmixins__" != t &&
                                      "toString" != t &&
                                      GTextEditor.prototype.hasOwnProperty(t) &&
                                      GTextEditor.prototype[t] instanceof Function &&
                                      e.hasOwnProperty(t) &&
                                      delete e[t];
                          })(e),
                          delete e._textEditor);
                }),
                (h.setModeText = function (e) {
                    (l.setModeText(e._element), h.setCorrectMode(e, e._element));
                }),
                (h.setModeImage = function (e) {
                    (l.setModeImage(e._element), h.setCorrectMode(e, e._element));
                }),
                (h.prototype.canInlineEdit = function () {
                    return true;
                }),
                (h.prototype.enableInlineEditingSupport = function () {
                    this._textEditor && this._textEditor.setInlineEditEnabled(true);
                }),
                (h.prototype.disableInlineEditingSupport = function () {
                    this._textEditor && this._textEditor.setInlineEditEnabled(false);
                }),
                (h.prototype.beginInlineEdit = function (e) {
                    (h.setModeText(this), this.beginInlineEdit(e));
                }),
                (h.prototype.finishInlineEdit = function () {
                    var e = null;
                    return (this._textEditor && (e = GTextEditor.prototype.finishInlineEdit.call(this._textEditor)), e);
                }),
                (h.prototype.setEditMode = function () {}),
                (h.prototype.toString = function () {
                    return "[Object GCollabTextEditor]";
                }),
                (module.exports = h));
        };
