module.exports = function (module, exports, require) {
        "use strict";
        (require(96 /* polyfill:JSON */), require(57), require(20 /* polyfill:RegExp */), require(151), require(38));
        var RetryHandler = function () {
            ((this.interval = 1e3), (this.maxInterval = 6e4));
        };
        ((RetryHandler.prototype.retry = function (callback) {
            (setTimeout(callback, this.interval), (this.interval = this.nextInterval_()));
        }),
            (RetryHandler.prototype.reset = function () {
                this.interval = 1e3;
            }),
            (RetryHandler.prototype.nextInterval_ = function () {
                var interval = 2 * this.interval + this.getRandomInt_(0, 1e3);
                return Math.min(interval, this.maxInterval);
            }),
            (RetryHandler.prototype.getRandomInt_ = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }));
        var MediaUploader = function (options) {
            var noop = function () {};
            if (
                ((this.file = options.file),
                (this.contentType = options.contentType || this.file.type || "application/octet-stream"),
                (this.metadata = options.metadata || {
                    name: this.file.name,
                    mimeType: this.contentType,
                }),
                (this.token = options.token),
                (this.onComplete = options.onComplete || noop),
                (this.onProgress = options.onProgress || noop),
                (this.onError = options.onError || noop),
                (this.offset = options.offset || 0),
                (this.chunkSize = options.chunkSize || 0),
                (this.retryHandler = new RetryHandler()),
                (this.url = options.url),
                !this.url)
            ) {
                var params = options.params || {};
                ((params.uploadType = "resumable"), (this.url = this.buildUrl_(options.fileId, params, options.baseUrl)));
            }
            this.httpMethod = options.fileId ? "PATCH" : "POST";
        };
        ((MediaUploader.prototype.upload = function () {
            var xhr = new XMLHttpRequest();
            (xhr.open(this.httpMethod, this.url, true),
                xhr.setRequestHeader("Authorization", "Bearer " + this.token),
                xhr.setRequestHeader("Content-Type", "application/json"),
                xhr.setRequestHeader("X-Upload-Content-Length", this.file.size),
                xhr.setRequestHeader("X-Upload-Content-Type", this.contentType),
                (xhr.onload = function () {
                    if (xhr.status < 400) {
                        var location = xhr.getResponseHeader("Location");
                        ((this.url = location), this.sendFile_());
                    } else this.onUploadError_(xhr);
                }.bind(this)),
                (xhr.onerror = this.onUploadError_.bind(this, xhr)),
                xhr.send(JSON.stringify(this.metadata)));
        }),
            (MediaUploader.prototype.sendFile_ = function () {
                var content = this.file,
                    end = this.file.size;
                (this.offset || this.chunkSize) &&
                    (this.chunkSize && (end = Math.min(this.offset + this.chunkSize, this.file.size)), (content = content.slice(this.offset, end)));
                var xhr = new XMLHttpRequest();
                (xhr.open("PUT", this.url, true),
                    xhr.setRequestHeader("Content-Type", this.contentType),
                    xhr.setRequestHeader("Content-Range", "bytes " + this.offset + "-" + (end - 1) + "/" + this.file.size),
                    xhr.setRequestHeader("X-Upload-Content-Type", this.file.type),
                    xhr.upload && xhr.upload.addEventListener("progress", this.onProgress),
                    (xhr.onload = this.onContentUploadSuccess_.bind(this, xhr)),
                    (xhr.onerror = this.onContentUploadError_.bind(this, xhr)),
                    xhr.send(content));
            }),
            (MediaUploader.prototype.resume_ = function () {
                var xhr = new XMLHttpRequest();
                (xhr.open("PUT", this.url, true),
                    xhr.setRequestHeader("Content-Range", "bytes */" + this.file.size),
                    xhr.setRequestHeader("X-Upload-Content-Type", this.file.type),
                    xhr.upload && xhr.upload.addEventListener("progress", this.onProgress),
                    (xhr.onload = this.onContentUploadSuccess_.bind(this, xhr)),
                    (xhr.onerror = this.onContentUploadError_.bind(this, xhr)),
                    xhr.send());
            }),
            (MediaUploader.prototype.extractRange_ = function (xhr) {
                var range = xhr.getResponseHeader("Range");
                range && (this.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1);
            }),
            (MediaUploader.prototype.onContentUploadSuccess_ = function (xhr) {
                200 == xhr.status || 201 == xhr.status
                    ? this.onComplete(xhr.response)
                    : 308 == xhr.status
                      ? (this.extractRange_(xhr), this.retryHandler.reset(), this.sendFile_())
                      : this.onContentUploadError_(e);
            }),
            (MediaUploader.prototype.onContentUploadError_ = function (xhr) {
                xhr.status && xhr.status < 500 ? this.onError(xhr.response) : this.retryHandler.retry(this.resume_.bind(this));
            }),
            (MediaUploader.prototype.onUploadError_ = function (xhr) {
                this.onError(xhr.response);
            }),
            (MediaUploader.prototype.buildQuery_ = function (params) {
                return (
                    (params = params || {}),
                    Object.keys(params)
                        .map(function (key) {
                            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                        })
                        .join("&")
                );
            }),
            (MediaUploader.prototype.buildUrl_ = function (fileId, params, baseUrl) {
                var url = baseUrl || "https://www.googleapis.com/upload/drive/v3/files/";
                fileId && (url += fileId);
                var query = this.buildQuery_(params);
                return (query && (url += "?" + query), url);
            }),
            (module.exports = MediaUploader));
    };
