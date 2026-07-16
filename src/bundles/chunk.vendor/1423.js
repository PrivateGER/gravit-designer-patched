module.exports = function (module, exports, require) {
            var n = require(1424),
                r = require(1425),
                o = require(799),
                GDocument = require(1426),
                s = require(391),
                l = require(1427),
                h = require(197),
                A = require(11),
                c = require(1428),
                p = require(1436),
                u = require(1437),
                d = require(1438),
                g = require(1439),
                f = require(587),
                m = require(1441),
                y = function (e, t, i) {
                    ((this._doc = e),
                        (this.referenceNumber = 1),
                        (this.pageTree = this.getIndirectObject(new p())),
                        (this.info = this.getIndirectObject(new GDocument(t, i))),
                        (this.catalog = this.getIndirectObject(new h())),
                        this.catalog.getPDFObject().put("/Type", "/Catalog"),
                        this.catalog.getPDFObject().put("/Pages", new s(this.pageTree)),
                        (this.fonts = []),
                        (this.references = []),
                        this.addIndirectObject(this.pageTree),
                        this.addIndirectObject(this.catalog),
                        this.addIndirectObject(this.info));
                };
            ((y.prototype._doc = null),
                (y.prototype.pageSize = null),
                (y.prototype.referenceNumber = null),
                (y.prototype.pageTree = null),
                (y.prototype.info = null),
                (y.prototype.catalog = null),
                (y.prototype.fonts = null),
                (y.prototype.references = null),
                (y.prototype.getInfo = function () {
                    return this.info.getPDFObject();
                }),
                (y.prototype.setPageOrigin = function (e) {
                    this.currentPage.getPDFObject().setPageOrigin(e);
                }),
                (y.prototype.getPageOrigin = function () {
                    return this.currentPage.getPDFObject().getPageOrigin();
                }),
                (y.prototype.getPageSize = function () {
                    return this.currentPage.getPDFObject().getPageSize();
                }),
                (y.prototype.getPage = function (e) {
                    return this.pageTree.getPDFObject().getPage(e);
                }),
                (y.prototype.newPage = function (e, t) {
                    var i = this.getIndirectObject(new r(this._doc.isCompress())),
                        n = this.getIndirectObject(new d());
                    return (
                        (this.currentPage = this.getIndirectObject(new g(i, n, e, t))),
                        this.currentPage.getPDFObject().put("/Parent", new s(this.pageTree)),
                        this.pageTree.getPDFObject().addPage(new s(this.currentPage)),
                        this.addIndirectObject(this.currentPage),
                        this.addIndirectObject(i),
                        this.addIndirectObject(n),
                        this.currentPage.getPDFObject()
                    );
                }),
                (y.prototype.add = function (e, t) {
                    this.currentPage.getPDFObject().add(e, t);
                }),
                (y.prototype.addIndirectObject = function (e) {
                    this.references.push(e);
                }),
                (y.prototype.removeIndirectObject = function (e) {
                    var t;
                    e &&
                        this.references.some(function (i, n) {
                            if (i.number === e.number && i.type === e.type) return ((t = n), true);
                        }) &&
                        this.references.splice(t, 1);
                }),
                (y.prototype.getIndirectObject = function (e) {
                    return new n(0, this.referenceNumber++, e);
                }),
                (y.prototype.getCurrentResources = function () {
                    return this.currentPage.getPDFObject().getResources();
                }),
                (y.prototype.getFontResource = function (e) {
                    if (!(e instanceof f)) throw "Unsupported font " + e;
                    var t = e._openTypeFont.names.postScriptName.en;
                    e.isEmbedded() && (t = e.getFamily());
                    var i = this.fonts[t];
                    if (!i) {
                        var n = "F" + Object.keys(this.fonts).length,
                            r = c.createFont(this._doc, e, n);
                        ((i = new u(new s(r))), (this.fonts[t] = i));
                    }
                    var a = this.currentPage.getPDFObject().getResources().getGroup(o.Group.Types.FONT);
                    return (a.get("/" + i.getName()) || a.add(i), i);
                }),
                (y.prototype.write = function (e) {
                    (this.references.sort(function (e, t) {
                        return e.number - t.number;
                    }),
                        A.each(this.references, function (t, i) {
                            ((i.offset = e.getPosition()), i.write(e), e.writeln());
                        }));
                    var t = new m(this.references);
                    (t.write(e),
                        new l(new s(this.catalog), new s(this.info), this.references).write(e),
                        e.writeln("startxref"),
                        e.writeln(t.offset));
                }),
                (module.exports = y));
        };
