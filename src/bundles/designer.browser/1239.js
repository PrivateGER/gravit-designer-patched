module.exports = function (module, exports, require) {
        "use strict";
        require(842 /* polyfill:String */);
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.default = exports.TEAMS_COMMANDS = exports.GSharePointClient = void 0),
            require(58 /* polyfill:Array */),
            require(19),
            require(96 /* polyfill:JSON */),
            require(30 /* polyfill:Object */),
            require(57),
            require(8 /* Symbol */),
            require(356 /* polyfill:RegExp */),
            require(20 /* polyfill:RegExp */),
            require(107 /* polyfill:RegExp */),
            require(3),
            require(271 /* polyfill:String */),
            require(34),
            require(134 /* polyfill:String */),
            require(91 /* polyfill:String */),
            require(4),
            require(13),
            require(38),
            require(26),
            require(125),
            require(126 /* polyfill:URL */),
            require(114));
        var GObject = require(1),
            AdalContext = _interopRequireDefault(require(1476 /* lib:adal */)),
            CloudDrive = require(802),
            GCloudUtil = _interopRequireDefault(require(119 /* GCommonNames */)),
            designerConfig = require(10),
            cloudUtils = require(593),
            GError = _interopRequireDefault(require(594)),
            GMicrosoftUser = _interopRequireDefault(require(1477)),
            TeamsAuthenticator = _interopRequireDefault(require(1242 /* GMSTeamsAuthenticator */)),
            Utils = require(40);
        const CloudFile = require(156);
        let cachedToken = null,
            clientInstances = {};
        const teamsCommands = (exports.TEAMS_COMMANDS = TeamsAuthenticator.default.COMMANDS),
            GSharePointClient = (exports.GSharePointClient = function (options) {
                let { tenant, domain, clientID, id, authTenant, corporate, token, relativePath } = options;
                ((this.TOKEN = cachedToken || token),
                    (this.BASE_URL = tenant),
                    (this.AUTH_TENANT = authTenant || tenant),
                    (this.DOMAIN = domain),
                    (this.CLIENT_ID = clientID),
                    (this.SETTINGS_ID = id),
                    (this.CORPORATE = corporate || false),
                    (this.RELATIVE_PATH = relativePath),
                    (this.HEADERS = GSharePointClient.requestHeaders));
            });
        ((GSharePointClient.prototype.setTenantURL = function (url) {
            this.BASE_URL = url.replace("https://", "");
        }),
            (GSharePointClient.prototype.setRelativePath = function (relativePath) {
                this.RELATIVE_PATH = relativePath;
            }),
            (GSharePointClient.prototype.relativeUrlContainsSubsiteRelativePath = function (relativeUrl) {
                return 0 === relativeUrl.indexOf(this.RELATIVE_PATH);
            }),
            (GSharePointClient.prototype.getSanitizedFolderRelativePath = function (relativeUrl) {
                let path = relativeUrl;
                return (this.RELATIVE_PATH && (path = (0, Utils.trimStart)(path, this.RELATIVE_PATH)), (0, Utils.trimStart)(path, "/"));
            }),
            (GSharePointClient.prototype.getSanitizedFileRelativePath = function (relativeUrl) {
                return this.RELATIVE_PATH ? "".concat(this.RELATIVE_PATH, "/").concat(relativeUrl) : relativeUrl;
            }),
            (GSharePointClient.prototype.setToken = function (token) {
                this.TOKEN = token;
            }),
            (GSharePointClient.CheckOutStatuses = { CheckedOut: 0, Available: 2 }),
            (GSharePointClient.FILE_STATUS = {
                LOCKED: 3,
                LOCKED_BY_ME: 2,
                AVAILABLE: 1,
                LOADING: -1,
            }),
            (GSharePointClient.requestHeaders = {
                Accept: "application/json;odata=nometadata",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "en-US,en;q=0.8",
            }),
            (GSharePointClient.CheckinType = {
                MinorCheckIn: 0,
                MajorCheckIn: 1,
                OverwriteCheckIn: 2,
            }),
            (GSharePointClient.SpecialCharList = ["~", '"', "'", "#", "%", "&", "*", ":", "<", ">", "?", "/", "\\", "{", "|", "}"]),
            (GSharePointClient.InvalidNames = [
                ".lock",
                "CON",
                "PRN",
                "AUX",
                "COM0",
                "COM1",
                "COM2",
                "COM3",
                "COM4",
                "COM5",
                "COM6",
                "COM7",
                "COM8",
                "COM9",
                "LPT0",
                "LPT1",
                "LPT2",
                "LPT3",
                "LPT4",
                "LPT5",
                "LPT6",
                "LPT7",
                "LPT8",
                "LPT9",
                "desktop.ini",
            ]),
            (GSharePointClient.InvalidNameBeginnings = ["~$"]),
            (GSharePointClient.InvalidNameEndings = ["."]),
            (GSharePointClient.InvalidContainings = ["_vti_"]),
            (GSharePointClient.InvalidOnlyCharacters = ["."]),
            (GSharePointClient.convertFileToCloudItem = function (fileData) {
                const convertFile = (rawFile) => {
                    var item = CloudFile.from({
                        id: rawFile.UniqueId,
                        version: rawFile.UIVersionLabel,
                        updated: rawFile.TimeLastModified,
                        created: rawFile.TimeCreated,
                        checkedOut: rawFile.CheckOutType === GSharePointClient.CheckOutStatuses.CheckedOut,
                        relativeUrl: rawFile.ServerRelativeUrl,
                    });
                    ((item.storage = CloudFile.Storage.SharePoint),
                        item.setItemType(CloudFile.Type.File),
                        (item.type = GSharePointClient.getFileType({ name: rawFile.Name })),
                        (item.mimeType = rawFile._mimetype || rawFile.mimeType || item.type));
                    const format = designerConfig.FILE_FORMATS.find((entry) => {
                        let { type } = entry;
                        return type === item.type;
                    });
                    return (
                        (item.extension = format && format.ext),
                        (item.name = rawFile.Name.replace(new RegExp(".(".concat(item.extension, ")$"), "i"), "")),
                        item.setModificationTime(item.updated),
                        rawFile.Length && item.setSize(parseInt(rawFile.Length)),
                        item.checkedOut
                            ? (item.checkOutStatus = GSharePointClient.FILE_STATUS.LOADING)
                            : ((item.checkOutStatus = GSharePointClient.FILE_STATUS.AVAILABLE), (item = GSharePointClient.updateFilePermissions(item))),
                        item
                    );
                };
                return fileData instanceof Array ? fileData.map(convertFile) : convertFile(fileData);
            }),
            (GSharePointClient.updateFilePermissions = function (item) {
                return item instanceof CloudFile && item.getType() === CloudFile.Type.File
                    ? ([GSharePointClient.FILE_STATUS.AVAILABLE, GSharePointClient.FILE_STATUS.LOCKED_BY_ME].includes(item.checkOutStatus)
                          ? item.setPermissions([
                                CloudFile.Permission.Open,
                                CloudFile.Permission.Delete,
                                CloudFile.Permission.Download,
                                CloudFile.Permission.Copy,
                                CloudFile.Permission.CutPaste,
                            ])
                          : item.revokePermissions(),
                      item)
                    : item;
            }),
            (GSharePointClient.hasSpecialChar = function (name) {
                return new RegExp("[".concat(GSharePointClient.SpecialCharList.join("|"), "]")).test(name);
            }),
            (GSharePointClient.isNameValid = function (name) {
                if (!name || !name.trim()) return false;
                if (GSharePointClient.hasSpecialChar(name)) return false;
                if (GSharePointClient.InvalidNames.indexOf(name) >= 0) return false;
                for (let t = 0, n = GSharePointClient.InvalidNameBeginnings.length; t < n; t++) {
                    let prefix = GSharePointClient.InvalidNameBeginnings[t];
                    if (name.startsWith(prefix)) return false;
                }
                for (let t = 0, n = GSharePointClient.InvalidNameEndings.length; t < n; t++) {
                    let suffix = GSharePointClient.InvalidNameEndings[t];
                    if (name.endsWith(suffix)) return false;
                }
                for (let t = 0, n = GSharePointClient.InvalidContainings.length; t < n; t++) {
                    let substring = GSharePointClient.InvalidContainings[t];
                    if (name.indexOf(substring) >= 0) return false;
                }
                for (let t = 0, n = GSharePointClient.InvalidOnlyCharacters.length; t < n; t++) {
                    const onlyChar = GSharePointClient.InvalidOnlyCharacters[t];
                    if (RegExp("^[".concat(onlyChar, "]+$")).test(name)) return false;
                }
                return true;
            }),
            (GSharePointClient.convertFolderToCloudItem = function (folderData) {
                const convertFolder = (rawFolder) => {
                    var item = CloudFile.from({
                        id: rawFolder.UniqueId ? rawFolder.UniqueId : rawFolder.id,
                        name: rawFolder.Name ? rawFolder.Name : rawFolder.name,
                        relativeUrl: rawFolder.ServerRelativeUrl ? rawFolder.ServerRelativeUrl : rawFolder.relativeUrl,
                        type: "folder",
                    });
                    return (
                        item.setItemType(CloudFile.Type.Folder),
                        item.setPermission(CloudFile.Permission.Open),
                        item.setPermission(CloudFile.Permission.Delete),
                        item.setPermission(CloudFile.Permission.CutPaste),
                        item
                    );
                };
                return folderData instanceof Array ? folderData.map(convertFolder) : convertFolder(folderData);
            }),
            (GSharePointClient.getFileType = function (file) {
                return file.name.toLowerCase().endsWith(".cdrapp")
                    ? designerConfig.FILE_FORMATS.find((entry) => {
                          let { ext } = entry;
                          return "cdrapp" === ext;
                      }).type
                    : file.name.toLowerCase().endsWith(".cdr")
                      ? designerConfig.FILE_FORMATS.find((entry) => {
                            let { ext: ext } = entry;
                            return "cdr" === ext;
                        }).type
                      : file.name.toLowerCase().endsWith(".des")
                        ? designerConfig.FILE_FORMATS.find((entry) => {
                              let { ext: ext } = entry;
                              return "des" === ext;
                          }).type
                        : void 0;
            }),
            (GSharePointClient.ACCESS_TOKEN_PROP_NAME = "designer.filespanel.cloud-account.sharepoint.token"),
            (GSharePointClient.getInstance = function (options) {
                return (
                    options.id || (options.id = "".concat(options.accountId, ".").concat(options.tenant)),
                    (clientInstances[options.id] && clientInstances[options.id].TOKEN) || (clientInstances[options.id] = new GSharePointClient(options)),
                    GSharePointClient.clearOldAccessTokens(),
                    clientInstances[options.id]
                );
            }),
            (GSharePointClient.deleteToken = function (id) {
                gContainer.removeProperty("".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".").concat(id));
            }),
            (GSharePointClient.getUserId = function () {
                return gDesigner.getSyncUser().id;
            }),
            (GSharePointClient.getUserEmail = function () {
                return gDesigner.getSyncUser().email;
            }),
            (GSharePointClient.clearOldAccessTokens = function () {
                const tokenKeys = [],
                    storageLength = gContainer.getStorageLength();
                for (let n = 0; n < storageLength; n++) {
                    let key = gContainer.getPropertyKeyByIndex(n);
                    0 === key.indexOf("".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".")) && tokenKeys.push(key);
                }
                const userId = GSharePointClient.getUserId();
                for (let t = 0; t < tokenKeys.length; t++) {
                    removeIfInvalid(tokenKeys[t]);
                }
                function removeIfInvalid(key) {
                    gContainer.getProperty(key).then((token) => {
                        GSharePointClient.isTokenValid(token, userId) || gContainer.removeProperty(key);
                    });
                }
            }),
            (GSharePointClient.isTokenValid = function (token, userId) {
                const authenticator = gContainer.getSharepointAuthenticator();
                return authenticator ? authenticator.isTokenValid(token) : !(!token || !token.expires || token.expires <= Date.now() / 1e3) && !(!token.id || token.id !== userId);
            }),
            (GSharePointClient.getCachedToken = function (id) {
                return gContainer.getProperty("".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".").concat(id));
            }),
            (GSharePointClient.getValidCachedTokenOrNull = async function (id) {
                const token = await GSharePointClient.getCachedToken(id);
                return GSharePointClient.isTokenValid(token, GSharePointClient.getUserId()) ? token : null;
            }),
            (GSharePointClient.saveTokenToCache = async function (id, token) {
                gContainer.setProperty("".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".").concat(id), token);
            }),
            (GSharePointClient.ExceptionCode = { LoginAborted: 1, FileAlreadyCheckedOut: 423 }));
        class SharepointException extends GError.default {
            constructor(message, code) {
                (super(message), (this.code = code), (this.__proto__ = SharepointException.prototype), (this.name = "SharepointException"));
            }
            toString() {
                return "[Object SharepointException]";
            }
        }
        ((GSharePointClient.SharepointException = SharepointException),
            (GSharePointClient._logoutAndClearAdalCache = function (settings) {
                var adalContext = new AdalContext.default(settings);
                (adalContext.clearCache(), adalContext.getCachedUser() && adalContext.logOut(), (adalContext._user = null));
                var adalKeys = [];
                for (let e = 0; e < localStorage.length; e++)
                    "adal." === localStorage.key(e).substring(0, 5) && adalKeys.push(localStorage.key(e));
                for (let e = 0; e < adalKeys.length; e++) localStorage.removeItem(adalKeys[e]);
            }),
            (GSharePointClient.prototype.getSettings = function () {
                return {
                    tenant: this.BASE_URL,
                    domain: this.DOMAIN,
                    clientID: this.CLIENT_ID,
                    accountId: this.SETTINGS_ID,
                    authTenant: this.AUTH_TENANT,
                    corporate: this.CORPORATE,
                    token: this.TOKEN,
                    relativePath: this.RELATIVE_PATH,
                    type: designerConfig.EXTERNAL_APP.SHAREPOINT,
                };
            }),
            (GSharePointClient.prototype.getId = function () {
                return this.SETTINGS_ID;
            }),
            (GSharePointClient.prototype.getFile = function (item) {
                return this.getRawFile(item).then(function (blob) {
                    return GCloudUtil.default.createUint8ArrayFromBlob(blob);
                });
            }),
            (GSharePointClient.prototype.queryFiles = function (options) {
                return this.get(this._createQueryFilesURL(options));
            }),
            (GSharePointClient.prototype.fetchFolders = function (folder, orderBy, limit) {
                const relativeUrl = this.getSanitizedFolderRelativePath(folder.relativeUrl);
                var url = "/_api/web/GetFolderByServerRelativeUrl('".concat(encodeURI(relativeUrl), "')/Folders?$orderby=").concat(encodeURI(orderBy));
                return (
                    limit > 0 && (url += "&$top=".concat(limit)),
                    this.get(url).then((response) => {
                        let { value } = response;
                        const items = [];
                        if (!value || !value.length) return items;
                        for (let t = 0, length = value.length; t < length; t++) {
                            let folderData = value[t];
                            if (!folderData.Exists) continue;
                            const cloudItem = GSharePointClient.convertFolderToCloudItem(folderData);
                            ((cloudItem.parent = folder), items.push(cloudItem));
                        }
                        return items;
                    })
                );
            }),
            (GSharePointClient.prototype.queryFilesByOwner = function (queryOptions, ownerId) {
                const url = (function (url) {
                    return (
                        url.searchParams.append("$select", "*"),
                        url.searchParams.append("$expand", "Author"),
                        url.searchParams.append("$filter", "Author/Id eq ".concat(ownerId)),
                        url
                    );
                })(this._createQueryFilesURL(queryOptions));
                return this.get(url);
            }),
            (GSharePointClient.prototype._createQueryFilesURL = function (options) {
                const { folderRelativeUrl, orderBy, limit, skip } = options,
                    relativeUrl = this.getSanitizedFolderRelativePath(folderRelativeUrl),
                    url = this.getAPIEndpointURL("/_api/web/GetFolderByServerRelativeUrl('".concat(relativeUrl, "')/Files"));
                return (url.searchParams.append("$orderby", orderBy), url.searchParams.append("$top", limit), url.searchParams.append("$skip", skip), url);
            }),
            (GSharePointClient.prototype.findFileById = function (id) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                return this.get(
                    "/_api/search/query?querytext='" + id + "'&selectproperties='Title,Filename,ParentLink,DefaultEncodingURL'",
                    { headers: headers }
                ).then((response) => {
                    if (response) {
                        const {
                                PrimaryQueryResult: {
                                    RelevantResults: {
                                        Table: {
                                            Rows: [row],
                                        },
                                    },
                                },
                            } = response,
                            filename = row.Cells.find((cell) => {
                                let { Key } = cell;
                                return "Filename" === Key;
                            }).Value;
                        return {
                            name: row.Cells.find((cell) => {
                                let { Key: key } = cell;
                                return "Title" === key;
                            }).Value,
                            type: GSharePointClient.getFileType({ name: filename }),
                            relativeUrl: row.Cells.find((cell) => {
                                let { Key: key } = cell;
                                return "DefaultEncodingURL" === key;
                            }).Value.replace("https://".concat(this.BASE_URL), ""),
                        };
                    }
                    return null;
                });
            }),
            (GSharePointClient.prototype.getAdditionalItemData = function (item) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const url = "/_api/web/GetFileByServerRelativeUrl('".concat(
                    encodeURI("".concat(item.relativeUrl)),
                    "')/ListItemAllFields?expand=Properties"
                );
                return this.get(url, { headers: headers });
            }),
            (GSharePointClient.prototype.checkOutFile = async function (item) {
                const url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/CheckOut()");
                return this.post(url).catch((error) => {
                    if (error.status === GSharePointClient.ExceptionCode.FileAlreadyCheckedOut)
                        throw new GSharePointClient.SharepointException(
                            GObject.GLocale.get(
                                new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.error-file-is-already-checked-out-by-someone-else")
                            ),
                            GSharePointClient.ExceptionCode.FileAlreadyCheckedOut
                        );
                    throw error;
                });
            }),
            (GSharePointClient.prototype.discardCheckOut = function (item) {
                var url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/UndoCheckOut()");
                return this.post(url);
            }),
            (GSharePointClient.prototype.checkInFile = function (item) {
                let comment = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "New Comment",
                    checkinType = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : GSharePointClient.CheckinType.MinorCheckIn;
                const url = "/_api/web/GetFileByServerRelativeUrl('"
                    .concat(item.relativeUrl, "')/CheckIn(comment='")
                    .concat(comment, "', checkintype=")
                    .concat(checkinType, ")");
                return this.post(url);
            }),
            (GSharePointClient.prototype.getCheckOutFileInfo = function (item) {
                const url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/checkedOutByUser");
                return this.get(url);
            }),
            (GSharePointClient.prototype.getCheckOutFileStatus = async function (item) {
                if (item.hasOwnProperty("checkedOut") && !item.checkedOut) return GSharePointClient.FILE_STATUS.AVAILABLE;
                const checkOutInfo = await this.getCheckOutFileInfo(item).catch(
                    (error) => (console.error(">>>error retrieving checkout info: ", error.message), null)
                );
                if (!checkOutInfo || true === checkOutInfo["odata.null"]) return GSharePointClient.FILE_STATUS.AVAILABLE;
                const user = await this._getUser();
                return checkOutInfo.UserId.NameId === user.getNameId() ? GSharePointClient.FILE_STATUS.LOCKED_BY_ME : GSharePointClient.FILE_STATUS.LOCKED;
            }),
            (GSharePointClient.prototype._getUser = async function () {
                return (this._user || (this._user = new GMicrosoftUser.default(await this.getUser())), this._user);
            }),
            (GSharePointClient.prototype.getFileCreator = async function (item) {
                return new GMicrosoftUser.default(await this._getFileCreator(item));
            }),
            (GSharePointClient.prototype.getLibrarySettings = function () {
                let headers = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return this.get("/_api/web/lists/getByTitle('Documents')", {
                    headers: headers,
                }).then((response) => ({
                    enableVersioning: response.EnableVersioning,
                    enableMinorVersions: response.EnableMinorVersions,
                    enableFolderCreation: response.EnableFolderCreation,
                    forceCheckout: response.ForceCheckout,
                }));
            }),
            (GSharePointClient.prototype.getFileDetails = async function (item) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                try {
                    return await this._getFileDetailsByRelativeURL(item, headers);
                } catch (error) {
                    if (item.id) {
                        const foundItem = await this.findFileById(item.id);
                        return this._getFileDetailsByRelativeURL(foundItem, headers);
                    }
                    throw error;
                }
            }),
            (GSharePointClient.prototype._getFileDetailsByRelativeURL = function (item) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const url = "/_api/web/GetFileByServerRelativeUrl('".concat(encodeURI("".concat(item.relativeUrl)), "')");
                return this.get(url, { headers: headers });
            }),
            (GSharePointClient.prototype.getFolderDetails = function (item) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const relativeUrl = this.getSanitizedFolderRelativePath(item.relativeUrl),
                    url = "/_api/web/GetFolderByServerRelativeUrl('".concat(encodeURI(relativeUrl), "')");
                return this.get(url, { headers: headers });
            }),
            (GSharePointClient.prototype.getParentFolder = function (item) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                const relativeUrl = this.getSanitizedFolderRelativePath(item.relativeUrl),
                    url = "/_api/Web/GetFolderByServerRelativePath(decodedurl='".concat(encodeURI(relativeUrl), "')/ParentFolder");
                return this.get(url, { headers: headers });
            }),
            (GSharePointClient.prototype.copyFileTo = function (item, destinationFolder) {
                var url = "/_api/web/GetFileByServerRelativeUrl('"
                    .concat(encodeURI(item.relativeUrl), "')/copyto(strnewurl='")
                    .concat(encodeURI(destinationFolder.relativeUrl), "/")
                    .concat(item.name, ".")
                    .concat(item.extension, "',boverwrite=false)");
                return this.post(url, null, { rawResponse: true });
            }),
            (GSharePointClient.prototype.moveFileTo = function (item, destinationFolder) {
                var url = "/_api/web/GetFileByServerRelativeUrl('"
                    .concat(encodeURI(item.relativeUrl), "')/moveto(newurl='")
                    .concat(encodeURI(destinationFolder.relativeUrl), "/")
                    .concat(item.name, ".")
                    .concat(item.extension, "',flags=0)");
                return this.post(url, null, { rawResponse: true });
            }),
            (GSharePointClient.prototype.moveFolderTo = function (folder, destinationFolder) {
                var url = "/_api/web/GetFolderByServerRelativeUrl('"
                    .concat(encodeURI(folder.relativeUrl), "')/moveto(newurl='")
                    .concat(encodeURI(destinationFolder.relativeUrl), "/")
                    .concat(folder.name, "')");
                return this.post(url, null, { rawResponse: true });
            }),
            (GSharePointClient.prototype.folderExists = function (folderName, parentFolder) {
                const relativeUrl = this.getSanitizedFolderRelativePath(parentFolder.relativeUrl);
                return this.get(
                    "/_api/Web/GetFolderByServerRelativePath(decodedurl='".concat(
                        encodeURI("".concat(relativeUrl) + "".concat(folderName ? "/".concat(folderName) : "")),
                        "')/Exists/$value"
                    )
                ).catch((error) => (!error.status || 404 !== error.status) && Promise.reject(error));
            }),
            (GSharePointClient.prototype.fileExists = function (fileName, folder) {
                return this.get(
                    "/_api/web/GetFileByServerRelativeUrl('".concat(encodeURI("".concat(folder.relativeUrl, "/").concat(fileName)), "')/Exists/$value")
                ).catch((error) => (!error.status || 404 !== error.status) && Promise.reject(error));
            }),
            (GSharePointClient.prototype.getRawFile = function (item, progress) {
                var url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/$value");
                return this.get(url, { rawResponse: true, progress: progress }).then((response) => response.blob());
            }),
            (GSharePointClient.prototype.getUser = function () {
                return this.get("/_api/Web/CurrentUser");
            }),
            (GSharePointClient.prototype._getFileCreator = function (item) {
                var url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/Author");
                return this.get(url);
            }),
            (GSharePointClient.prototype.get = function (url) {
                let headers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                return this._query("GET", url, null, headers);
            }),
            (GSharePointClient.prototype.post = function (url, body) {
                let requestBody,
                    options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                return ((requestBody = options && options.blobRequest ? new Blob([body]) : body), this._query("POST", url, requestBody, options));
            }),
            (GSharePointClient.prototype._query = function (method, urlOrPath) {
                let resolvedUrl,
                    body = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                return (
                    (resolvedUrl =
                        (options && options.fullLink) || urlOrPath instanceof URL
                            ? urlOrPath instanceof URL
                                ? urlOrPath.toString()
                                : urlOrPath
                            : this.getAPIEndpointURL(urlOrPath).toString()),
                    this.query(method, resolvedUrl, body, options)
                );
            }),
            (GSharePointClient.prototype.getAPIEndpointURL = function (path) {
                return new URL("https://".concat(this.BASE_URL).concat(path));
            }),
            (GSharePointClient.prototype.hasPermissionToAccessFolder = async function (item) {
                try {
                    return !!(await this.getFolderDetails(item));
                } catch (error) {
                    return (
                        (!error || (error.status !== designerConfig.HTTP_STATUS_CODES.FORBIDDEN && error.status !== designerConfig.HTTP_STATUS_CODES.NOT_FOUND)) &&
                        (console.error("GSharePointClient - failed to check folder permissions", error), false)
                    );
                }
            }),
            (GSharePointClient.prototype.getEffectiveBasePermissions = function (relativeUrl) {
                return this.query("GET", "".concat(relativeUrl, "/_api/Web/effectiveBasePermissions"));
            }),
            (GSharePointClient.prototype.getFileEffectiveBasePermissions = function (item) {
                var url = "/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/ListItemAllFields/effectiveBasePermissions");
                return this.get(url);
            }),
            (GSharePointClient.prototype.query = function (method, url) {
                let body = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                const client = this;
                return new Promise((resolve, reject) =>
                    client.TOKEN && GSharePointClient.isTokenValid(client.TOKEN, GSharePointClient.getUserId())
                        ? executeRequest(resolve, reject)
                        : client
                              .connect()
                              .then(() => {
                                  executeRequest(resolve, reject);
                              })
                              .catch((error) => {
                                  reject(error);
                              })
                );
                async function executeRequest(resolve, reject) {
                    const fetchOptions = {
                        method: method,
                        cache: "no-cache",
                        headers: client._prepareRequestHeaders(method, body, options),
                        body: client._prepareRequestBody(method, body, options),
                    };
                    let response;
                    try {
                        response = await fetch(url, fetchOptions);
                    } catch (error) {
                        return void reject(error);
                    }
                    if (401 === response.status)
                        (client.clearUserData(),
                            client
                                .connect(true)
                                .then(() => {
                                    executeRequest(resolve, reject);
                                })
                                .catch((error) => {
                                    reject(error);
                                }));
                    else if (200 === response.status || 201 === response.status || 202 === response.status || 204 === response.status) {
                        if (options && options.progress && "function" == typeof options.progress)
                            return (0, cloudUtils.readResponseWithProgress)(response, options.progress, false).then((data) => resolve(data));
                        if (options && options.rawResponse) return resolve(response);
                        let responseBody = {};
                        if (204 !== response.status)
                            try {
                                responseBody = await response.json();
                            } catch (error) {
                                (console.error("Incorrect response format: ", error.message), reject(error));
                            }
                        resolve(responseBody);
                    } else reject({ status: response.status, statusText: response.statusText });
                }
            }),
            (GSharePointClient.prototype._prepareRequestHeaders = function (method, body, options) {
                if (options && options.noHeaders) return;
                const headers = Object.assign({}, this.HEADERS, {
                    Authorization: "Bearer ".concat(this.TOKEN.token),
                });
                this._isBodyRequestRequired(method, body) &&
                    ((headers["Content-Type"] = (options && options.headers && options.headers["Content-Type"]) || "application/json;odata=verbose"),
                    (headers["Content-Length"] = JSON.stringify(body).length));
                return Object.assign(headers, (options && options.headers) || {});
            }),
            (GSharePointClient.prototype._prepareRequestBody = function (method, body, options) {
                let result;
                return (this._isBodyRequestRequired(method, body) && (result = options && options.blobRequest ? body : JSON.stringify(body)), result);
            }),
            (GSharePointClient.prototype._isBodyRequestRequired = function (method, body) {
                return !(!body || !["POST", "PUT", "PATCH"].includes(method));
            }),
            (GSharePointClient.prototype._getSharePointSettings = function () {
                return {
                    tenant: this.AUTH_TENANT,
                    clientId: this.CLIENT_ID,
                    domain: this.DOMAIN,
                    loginHint: GSharePointClient.getUserEmail(),
                };
            }),
            (GSharePointClient.prototype.clearUserData = function () {
                ((this.TOKEN = null), (this._toClear = true), GSharePointClient._logoutAndClearAdalCache(this._getSharePointSettings()));
            }),
            (GSharePointClient.prototype._getCachedToken = function (isValid) {
                return (
                    isValid || (isValid = (token) => GSharePointClient.isTokenValid(token, GSharePointClient.getUserId())),
                    gContainer.getProperty(this._getTokenPropertyName()).then((cachedToken) => {
                        if (cachedToken && isValid(cachedToken)) return cachedToken;
                    })
                );
            }),
            (GSharePointClient.prototype._setCachedToken = function (token) {
                (this.setToken(token), gContainer.setProperty(this._getTokenPropertyName(), token));
            }),
            (GSharePointClient.prototype._getTokenPropertyName = function () {
                return "".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".").concat(this.SETTINGS_ID);
            }),
            (GSharePointClient.prototype.connect = async function (forceRefresh) {
                let allowSilentRetry = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const client = this,
                    sharePointSettings = this._getSharePointSettings(),
                    requestTimeoutMs = 6e4,
                    closeDelayMs = 3e3;
                let timeoutId,
                    tokenSaved = false;
                const validCachedToken = await GSharePointClient.getValidCachedTokenOrNull(client.SETTINGS_ID);
                if (client._connect) return client._connect;
                const authenticator = gContainer.getSharepointAuthenticator();
                return authenticator
                    ? !forceRefresh && validCachedToken
                        ? void (client.TOKEN = validCachedToken)
                        : (designerConfig.msTeamsMode
                              ? (client._connect = authenticator.authenticate(client._getTeamsCommand()))
                              : (client._connect = authenticator.authenticate(sharePointSettings, { clearCache: forceRefresh })),
                          client._connect.then(
                              (authResult) => (
                                  (client.TOKEN = cachedToken = { id: GSharePointClient.getUserId() }),
                                  authResult.expires && authResult.token
                                      ? ((client.TOKEN.expires = cachedToken.expires = Number(authResult.expires)), (client.TOKEN.token = cachedToken.token = authResult.token))
                                      : "string" == typeof authResult &&
                                        ((client.TOKEN.expires = cachedToken.expires = Math.floor(Date.now() / 1e3) + 3600),
                                        (client.TOKEN.token = cachedToken.token = authResult)),
                                  GSharePointClient.saveTokenToCache(client.SETTINGS_ID, client.TOKEN),
                                  delete client._connect,
                                  client.TOKEN
                              )
                          ),
                          client._connect)
                    : ((client._connect = new Promise((resolve, reject) => {
                          !(function attemptLogin(allowSilentRetry) {
                              gContainer.getProperty("".concat(GSharePointClient.ACCESS_TOKEN_PROP_NAME, ".").concat(client.SETTINGS_ID)).then((storedToken) => {
                                  if (storedToken && !forceRefresh && GSharePointClient.isTokenValid(storedToken, GSharePointClient.getUserId())) return ((client.TOKEN = storedToken), resolve(), void (client._connect = null));
                                  $(window).on("message", handleMessage);
                                  var popupUrl = new URL("".concat(window.location.origin, "/sp.html"));
                                  const popupWindow = client._popupToCenter(popupUrl.href, "SharePointToken", 680, 460);
                                  if (!popupWindow || popupWindow.closed || void 0 === popupWindow.closed)
                                      return (
                                          $(window).off("message", handleMessage),
                                          void reject({
                                              status: CloudDrive.WINDOW_STATUS_BLOCKED,
                                              message: GObject.GLocale.get(
                                                  new GObject.GLocaleKey("GExternalStorage", "text.error-window-blocked-alternative")
                                              ),
                                          })
                                      );
                                  ((popupWindow.onload = function () {
                                      (client._toClear &&
                                          (popupWindow.postMessage(
                                              { cmd: "clearCachedUser", sharepointSettings: sharePointSettings },
                                              "".concat(window.location.protocol, "//").concat(window.location.host, "/sp.html")
                                          ),
                                          delete client._toClear),
                                          popupWindow.postMessage(
                                              { cmd: "sharepointSettings", sharepointSettings: sharePointSettings },
                                              "".concat(window.location.protocol, "//").concat(window.location.host, "/sp.html")
                                          ));
                                  }),
                                      (popupWindow.onclose = function () {
                                          pollInterval && (clearInterval(pollInterval), (pollInterval = null));
                                      }));
                                  var pollInterval = setInterval(function () {
                                      popupWindow.closed &&
                                          !tokenSaved &&
                                          (clearInterval(pollInterval),
                                          (pollInterval = null),
                                          gContainer.removeProperty("sp_getToken_data"),
                                          GSharePointClient._logoutAndClearAdalCache(sharePointSettings),
                                          timeoutId && clearTimeout(timeoutId),
                                          reject(new GSharePointClient.SharepointException(null, GSharePointClient.ExceptionCode.LoginAborted)));
                                  }, 1e3);
                                  async function handleMessage(event) {
                                      let data = event.originalEvent.data;
                                      const { cmd } = data;
                                      if (cmd && "saveToken" === cmd)
                                          ((client.TOKEN = cachedToken =
                                              {
                                                  expires: Math.floor(Date.now() / 1e3) + 3600,
                                                  token: data.token,
                                                  id: GSharePointClient.getUserId(),
                                              }),
                                              GSharePointClient.saveTokenToCache(client.SETTINGS_ID, client.TOKEN),
                                              (tokenSaved = true),
                                              closePopup(popupWindow),
                                              timeoutId && clearTimeout(timeoutId),
                                              $(window).off("message", handleMessage),
                                              (client._connect = null),
                                              resolve());
                                      else if (cmd && "saveTokenError" === cmd) {
                                          const { error } = data;
                                          if ("User login is required" === error) return;
                                          if ((console.error(">>saveTokenError data", data), timeoutId && clearTimeout(timeoutId), allowSilentRetry))
                                              return void (timeoutId = setTimeout(function () {
                                                  (closePopupAfterDelay(popupWindow), GSharePointClient._logoutAndClearAdalCache(sharePointSettings), attemptLogin(false));
                                              }, requestTimeoutMs));
                                          (GSharePointClient._logoutAndClearAdalCache(sharePointSettings), closePopupAfterDelay(popupWindow), (client._connect = null), reject(error));
                                      }
                                  }
                                  allowSilentRetry &&
                                      (timeoutId = setTimeout(function () {
                                          (closePopup(popupWindow), GSharePointClient._logoutAndClearAdalCache(sharePointSettings), attemptLogin(false));
                                      }, requestTimeoutMs));
                              });
                          })(allowSilentRetry);
                      })),
                      client._connect);
                function closePopup(win) {
                    let delay = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    setTimeout(() => {
                        win.close();
                    }, delay);
                }
                function closePopupAfterDelay(win) {
                    closePopup(win, closeDelayMs);
                }
            }),
            (GSharePointClient.prototype.updateFileContent = function (item, content) {
                return this._putBlob("/_api/web/GetFileByServerRelativeUrl('".concat(item.relativeUrl, "')/$value"), content);
            }),
            (GSharePointClient.prototype.updateItem = function (item, data) {
                const relativeUrl = this.getSanitizedFolderRelativePath(item.relativeUrl);
                return this.post("/_api/web/GetFolderByServerRelativeUrl('".concat(relativeUrl, "')/ListItemAllFields"), data, {
                    headers: { "X-HTTP-Method": "MERGE" },
                });
            }),
            (GSharePointClient.prototype.deleteItem = function (item) {
                const relativeUrl = this.getSanitizedFolderRelativePath(item.relativeUrl);
                return this.post("/_api/web/GetFolderByServerRelativeUrl('".concat(relativeUrl, "')"), null, {
                    headers: { "X-HTTP-Method": "DELETE" },
                    rawResponse: true,
                }).then((response) => {
                    if (200 !== response.status && 204 !== response.status) throw new Error(response.statusText);
                });
            }),
            (GSharePointClient.prototype._popupToCenter = function (url, name, height, width) {
                const popup = this._getPopupWindowReference(),
                    top = popup.outerHeight / 2 + popup.screenY - height / 2,
                    left = popup.outerWidth / 2 + popup.screenX - width / 2;
                return window.open(
                    url,
                    name,
                    "left="
                        .concat(left, ",top=")
                        .concat(top, ",width=")
                        .concat(width, ",height=")
                        .concat(height, ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no")
                );
            }),
            (GSharePointClient.prototype._getPopupWindowReference = function () {
                try {
                    window.top.outerHeight;
                    return window.top;
                } catch (e) {
                    return window;
                }
            }),
            (GSharePointClient.prototype.updateFileContentById = function (fileId, content) {
                return this._putBlob("/_api/web/GetFileById('".concat(fileId, "')/$value"), content);
            }),
            (GSharePointClient.prototype._putBlob = function (url, content) {
                return this.post(url, content, {
                    headers: { "X-HTTP-Method": "PUT" },
                    blobRequest: true,
                    rawResponse: true,
                });
            }),
            (GSharePointClient.prototype._getTeamsCommand = function () {
                return teamsCommands.SHAREPOINT_COMMAND;
            }),
            (GSharePointClient.prototype.createFile = function (file, content) {
                const parentUrl = file.parentUrl || file.parent.relativeUrl,
                    relativeUrl = this.getSanitizedFolderRelativePath(parentUrl);
                var url = "/_api/web/GetFolderByServerRelativeUrl('"
                    .concat(relativeUrl, "')/Files/add(url='")
                    .concat(file.getNameWithExtension(), "',overwrite=true)");
                return this.post(url, content, { blobRequest: true, rawResponse: true });
            }),
            (GSharePointClient.prototype.getAccountByEmail = function (email) {
                if (!email || email.indexOf("@") <= 0)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.invalid-email")).replace("%email", email));
                var url = "/_api/web/EnsureUser('".concat(email, "')");
                return this.post(url);
            }),
            (GSharePointClient.prototype.isCorporate = function () {
                return this.CORPORATE;
            }),
            (GSharePointClient.prototype.getCorporateProviderName = function () {
                return "microsoft";
            }),
            (GSharePointClient.prototype.toString = function () {
                return "[Object GSharePointClient]";
            }));
        exports.default = GSharePointClient;
    };
