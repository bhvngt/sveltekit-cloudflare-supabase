(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };

  // node_modules/cross-fetch/dist/browser-ponyfill.js
  var require_browser_ponyfill = __commonJS({
    "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
      var __self__ = function(root) {
        function F() {
          this.fetch = false;
          this.DOMException = root.DOMException;
        }
        F.prototype = root;
        return new F();
      }(typeof self !== "undefined" ? self : exports);
      (function(self2) {
        var irrelevant = function(exports2) {
          var support = {
            searchParams: "URLSearchParams" in self2,
            iterable: "Symbol" in self2 && "iterator" in Symbol,
            blob: "FileReader" in self2 && "Blob" in self2 && function() {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            }(),
            formData: "FormData" in self2,
            arrayBuffer: "ArrayBuffer" in self2
          };
          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          }
          if (support.arrayBuffer) {
            var viewClasses = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
          }
          function normalizeName(name) {
            if (typeof name !== "string") {
              name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
              throw new TypeError("Invalid character in header field name");
            }
            return name.toLowerCase();
          }
          function normalizeValue(value) {
            if (typeof value !== "string") {
              value = String(value);
            }
            return value;
          }
          function iteratorFor(items) {
            var iterator = {
              next: function() {
                var value = items.shift();
                return { done: value === void 0, value };
              }
            };
            if (support.iterable) {
              iterator[Symbol.iterator] = function() {
                return iterator;
              };
            }
            return iterator;
          }
          function Headers2(headers) {
            this.map = {};
            if (headers instanceof Headers2) {
              headers.forEach(function(value, name) {
                this.append(name, value);
              }, this);
            } else if (Array.isArray(headers)) {
              headers.forEach(function(header) {
                this.append(header[0], header[1]);
              }, this);
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
              }, this);
            }
          }
          Headers2.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
          };
          Headers2.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
          };
          Headers2.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
          };
          Headers2.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
          };
          Headers2.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
          };
          Headers2.prototype.forEach = function(callback, thisArg) {
            for (var name in this.map) {
              if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
              }
            }
          };
          Headers2.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push(name);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
              items.push(value);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
            });
            return iteratorFor(items);
          };
          if (support.iterable) {
            Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
          }
          function consumed(body) {
            if (body.bodyUsed) {
              return Promise.reject(new TypeError("Already read"));
            }
            body.bodyUsed = true;
          }
          function fileReaderReady(reader) {
            return new Promise(function(resolve2, reject) {
              reader.onload = function() {
                resolve2(reader.result);
              };
              reader.onerror = function() {
                reject(reader.error);
              };
            });
          }
          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
          }
          function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
          }
          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars2 = new Array(view.length);
            for (var i = 0; i < view.length; i++) {
              chars2[i] = String.fromCharCode(view[i]);
            }
            return chars2.join("");
          }
          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0);
            } else {
              var view = new Uint8Array(buf.byteLength);
              view.set(new Uint8Array(buf));
              return view.buffer;
            }
          }
          function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
              this._bodyInit = body;
              if (!body) {
                this._bodyText = "";
              } else if (typeof body === "string") {
                this._bodyText = body;
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
              } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
              } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
              } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
              } else {
                this._bodyText = body = Object.prototype.toString.call(body);
              }
              if (!this.headers.get("content-type")) {
                if (typeof body === "string") {
                  this.headers.set("content-type", "text/plain;charset=UTF-8");
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set("content-type", this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
              }
            };
            if (support.blob) {
              this.blob = function() {
                var rejected = consumed(this);
                if (rejected) {
                  return rejected;
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                  throw new Error("could not read FormData body as blob");
                } else {
                  return Promise.resolve(new Blob([this._bodyText]));
                }
              };
              this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                  return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                  return this.blob().then(readBlobAsArrayBuffer);
                }
              };
            }
            this.text = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as text");
              } else {
                return Promise.resolve(this._bodyText);
              }
            };
            if (support.formData) {
              this.formData = function() {
                return this.text().then(decode);
              };
            }
            this.json = function() {
              return this.text().then(JSON.parse);
            };
            return this;
          }
          var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
          }
          function Request2(input, options2) {
            options2 = options2 || {};
            var body = options2.body;
            if (input instanceof Request2) {
              if (input.bodyUsed) {
                throw new TypeError("Already read");
              }
              this.url = input.url;
              this.credentials = input.credentials;
              if (!options2.headers) {
                this.headers = new Headers2(input.headers);
              }
              this.method = input.method;
              this.mode = input.mode;
              this.signal = input.signal;
              if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
              }
            } else {
              this.url = String(input);
            }
            this.credentials = options2.credentials || this.credentials || "same-origin";
            if (options2.headers || !this.headers) {
              this.headers = new Headers2(options2.headers);
            }
            this.method = normalizeMethod(options2.method || this.method || "GET");
            this.mode = options2.mode || this.mode || null;
            this.signal = options2.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) {
              throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(body);
          }
          Request2.prototype.clone = function() {
            return new Request2(this, { body: this._bodyInit });
          };
          function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split("=");
                var name = split.shift().replace(/\+/g, " ");
                var value = split.join("=").replace(/\+/g, " ");
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
            return form;
          }
          function parseHeaders(rawHeaders) {
            var headers = new Headers2();
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
              var parts = line.split(":");
              var key = parts.shift().trim();
              if (key) {
                var value = parts.join(":").trim();
                headers.append(key, value);
              }
            });
            return headers;
          }
          Body.call(Request2.prototype);
          function Response2(bodyInit, options2) {
            if (!options2) {
              options2 = {};
            }
            this.type = "default";
            this.status = options2.status === void 0 ? 200 : options2.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options2 ? options2.statusText : "OK";
            this.headers = new Headers2(options2.headers);
            this.url = options2.url || "";
            this._initBody(bodyInit);
          }
          Body.call(Response2.prototype);
          Response2.prototype.clone = function() {
            return new Response2(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers2(this.headers),
              url: this.url
            });
          };
          Response2.error = function() {
            var response = new Response2(null, { status: 0, statusText: "" });
            response.type = "error";
            return response;
          };
          var redirectStatuses = [301, 302, 303, 307, 308];
          Response2.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError("Invalid status code");
            }
            return new Response2(null, { status, headers: { location: url } });
          };
          exports2.DOMException = self2.DOMException;
          try {
            new exports2.DOMException();
          } catch (err) {
            exports2.DOMException = function(message, name) {
              this.message = message;
              this.name = name;
              var error3 = Error(message);
              this.stack = error3.stack;
            };
            exports2.DOMException.prototype = Object.create(Error.prototype);
            exports2.DOMException.prototype.constructor = exports2.DOMException;
          }
          function fetch4(input, init2) {
            return new Promise(function(resolve2, reject) {
              var request = new Request2(input, init2);
              if (request.signal && request.signal.aborted) {
                return reject(new exports2.DOMException("Aborted", "AbortError"));
              }
              var xhr = new XMLHttpRequest();
              function abortXhr() {
                xhr.abort();
              }
              xhr.onload = function() {
                var options2 = {
                  status: xhr.status,
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                };
                options2.url = "responseURL" in xhr ? xhr.responseURL : options2.headers.get("X-Request-URL");
                var body = "response" in xhr ? xhr.response : xhr.responseText;
                resolve2(new Response2(body, options2));
              };
              xhr.onerror = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.ontimeout = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.onabort = function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              };
              xhr.open(request.method, request.url, true);
              if (request.credentials === "include") {
                xhr.withCredentials = true;
              } else if (request.credentials === "omit") {
                xhr.withCredentials = false;
              }
              if ("responseType" in xhr && support.blob) {
                xhr.responseType = "blob";
              }
              request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
              });
              if (request.signal) {
                request.signal.addEventListener("abort", abortXhr);
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener("abort", abortXhr);
                  }
                };
              }
              xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
          }
          fetch4.polyfill = true;
          if (!self2.fetch) {
            self2.fetch = fetch4;
            self2.Headers = Headers2;
            self2.Request = Request2;
            self2.Response = Response2;
          }
          exports2.Headers = Headers2;
          exports2.Request = Request2;
          exports2.Response = Response2;
          exports2.fetch = fetch4;
          return exports2;
        }({});
      })(__self__);
      delete __self__.fetch.polyfill;
      exports = __self__.fetch;
      exports.default = __self__.fetch;
      exports.fetch = __self__.fetch;
      exports.Headers = __self__.Headers;
      exports.Request = __self__.Request;
      exports.Response = __self__.Response;
      module.exports = exports;
      module.exports = fetch;
    }
  });

  // node_modules/es5-ext/global.js
  var require_global = __commonJS({
    "node_modules/es5-ext/global.js"(exports, module) {
      var naiveFallback = function() {
        if (typeof self === "object" && self)
          return self;
        if (typeof window === "object" && window)
          return window;
        throw new Error("Unable to resolve global `this`");
      };
      module.exports = function() {
        if (this)
          return this;
        if (typeof globalThis === "object" && globalThis)
          return globalThis;
        try {
          Object.defineProperty(Object.prototype, "__global__", {
            get: function() {
              return this;
            },
            configurable: true
          });
        } catch (error3) {
          return naiveFallback();
        }
        try {
          if (!__global__)
            return naiveFallback();
          return __global__;
        } finally {
          delete Object.prototype.__global__;
        }
      }();
    }
  });

  // node_modules/websocket/package.json
  var require_package = __commonJS({
    "node_modules/websocket/package.json"(exports, module) {
      module.exports = {
        name: "websocket",
        description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
        keywords: [
          "websocket",
          "websockets",
          "socket",
          "networking",
          "comet",
          "push",
          "RFC-6455",
          "realtime",
          "server",
          "client"
        ],
        author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
        contributors: [
          "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
        ],
        version: "1.0.34",
        repository: {
          type: "git",
          url: "https://github.com/theturtle32/WebSocket-Node.git"
        },
        homepage: "https://github.com/theturtle32/WebSocket-Node",
        engines: {
          node: ">=4.0.0"
        },
        dependencies: {
          bufferutil: "^4.0.1",
          debug: "^2.2.0",
          "es5-ext": "^0.10.50",
          "typedarray-to-buffer": "^3.1.5",
          "utf-8-validate": "^5.0.2",
          yaeti: "^0.0.6"
        },
        devDependencies: {
          "buffer-equal": "^1.0.0",
          gulp: "^4.0.2",
          "gulp-jshint": "^2.0.4",
          "jshint-stylish": "^2.2.1",
          jshint: "^2.0.0",
          tape: "^4.9.1"
        },
        config: {
          verbose: false
        },
        scripts: {
          test: "tape test/unit/*.js",
          gulp: "gulp"
        },
        main: "index",
        directories: {
          lib: "./lib"
        },
        browser: "lib/browser.js",
        license: "Apache-2.0"
      };
    }
  });

  // node_modules/websocket/lib/version.js
  var require_version = __commonJS({
    "node_modules/websocket/lib/version.js"(exports, module) {
      module.exports = require_package().version;
    }
  });

  // node_modules/websocket/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/websocket/lib/browser.js"(exports, module) {
      var _globalThis;
      if (typeof globalThis === "object") {
        _globalThis = globalThis;
      } else {
        try {
          _globalThis = require_global();
        } catch (error3) {
        } finally {
          if (!_globalThis && typeof window !== "undefined") {
            _globalThis = window;
          }
          if (!_globalThis) {
            throw new Error("Could not determine global this");
          }
        }
      }
      var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
      var websocket_version = require_version();
      function W3CWebSocket(uri, protocols) {
        var native_instance;
        if (protocols) {
          native_instance = new NativeWebSocket(uri, protocols);
        } else {
          native_instance = new NativeWebSocket(uri);
        }
        return native_instance;
      }
      if (NativeWebSocket) {
        ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
          Object.defineProperty(W3CWebSocket, prop, {
            get: function() {
              return NativeWebSocket[prop];
            }
          });
        });
      }
      module.exports = {
        "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
        "version": websocket_version
      };
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/Mime.js
  var require_Mime = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/Mime.js"(exports, module) {
      "use strict";
      function Mime() {
        this._types = Object.create(null);
        this._extensions = Object.create(null);
        for (let i = 0; i < arguments.length; i++) {
          this.define(arguments[i]);
        }
        this.define = this.define.bind(this);
        this.getType = this.getType.bind(this);
        this.getExtension = this.getExtension.bind(this);
      }
      Mime.prototype.define = function(typeMap, force) {
        for (let type in typeMap) {
          let extensions = typeMap[type].map(function(t) {
            return t.toLowerCase();
          });
          type = type.toLowerCase();
          for (let i = 0; i < extensions.length; i++) {
            const ext = extensions[i];
            if (ext[0] === "*") {
              continue;
            }
            if (!force && ext in this._types) {
              throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
            }
            this._types[ext] = type;
          }
          if (force || !this._extensions[type]) {
            const ext = extensions[0];
            this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
          }
        }
      };
      Mime.prototype.getType = function(path) {
        path = String(path);
        let last = path.replace(/^.*[/\\]/, "").toLowerCase();
        let ext = last.replace(/^.*\./, "").toLowerCase();
        let hasPath = last.length < path.length;
        let hasDot = ext.length < last.length - 1;
        return (hasDot || !hasPath) && this._types[ext] || null;
      };
      Mime.prototype.getExtension = function(type) {
        type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
        return type && this._extensions[type.toLowerCase()] || null;
      };
      module.exports = Mime;
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/types/standard.js
  var require_standard = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/types/standard.js"(exports, module) {
      module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/types/other.js
  var require_other = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/types/other.js"(exports, module) {
      module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/index.js
  var require_mime = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/index.js"(exports, module) {
      "use strict";
      var Mime = require_Mime();
      module.exports = new Mime(require_standard(), require_other());
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/types.js
  var require_types = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
      var KVError = function(_super) {
        __extends(KVError2, _super);
        function KVError2(message, status) {
          var _newTarget = this.constructor;
          if (status === void 0) {
            status = 500;
          }
          var _this = _super.call(this, message) || this;
          Object.setPrototypeOf(_this, _newTarget.prototype);
          _this.name = KVError2.name;
          _this.status = status;
          return _this;
        }
        return KVError2;
      }(Error);
      exports.KVError = KVError;
      var MethodNotAllowedError = function(_super) {
        __extends(MethodNotAllowedError2, _super);
        function MethodNotAllowedError2(message, status) {
          if (message === void 0) {
            message = "Not a valid request method";
          }
          if (status === void 0) {
            status = 405;
          }
          return _super.call(this, message, status) || this;
        }
        return MethodNotAllowedError2;
      }(KVError);
      exports.MethodNotAllowedError = MethodNotAllowedError;
      var NotFoundError2 = function(_super) {
        __extends(NotFoundError3, _super);
        function NotFoundError3(message, status) {
          if (message === void 0) {
            message = "Not Found";
          }
          if (status === void 0) {
            status = 404;
          }
          return _super.call(this, message, status) || this;
        }
        return NotFoundError3;
      }(KVError);
      exports.NotFoundError = NotFoundError2;
      var InternalError = function(_super) {
        __extends(InternalError2, _super);
        function InternalError2(message, status) {
          if (message === void 0) {
            message = "Internal Error in KV Asset Handler";
          }
          if (status === void 0) {
            status = 500;
          }
          return _super.call(this, message, status) || this;
        }
        return InternalError2;
      }(KVError);
      exports.InternalError = InternalError;
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/index.js
  var require_dist = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
      "use strict";
      var __awaiter7 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
      var mime = require_mime();
      var types_1 = require_types();
      Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
        return types_1.MethodNotAllowedError;
      } });
      Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
        return types_1.NotFoundError;
      } });
      Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
        return types_1.InternalError;
      } });
      var mapRequestToAsset = function(request) {
        var parsedUrl = new URL(request.url);
        var pathname = parsedUrl.pathname;
        if (pathname.endsWith("/")) {
          pathname = pathname.concat("index.html");
        } else if (!mime.getType(pathname)) {
          pathname = pathname.concat("/index.html");
        }
        parsedUrl.pathname = pathname;
        return new Request(parsedUrl.toString(), request);
      };
      exports.mapRequestToAsset = mapRequestToAsset;
      function serveSinglePageApp(request) {
        request = mapRequestToAsset(request);
        var parsedUrl = new URL(request.url);
        if (parsedUrl.pathname.endsWith(".html")) {
          return new Request(parsedUrl.origin + "/index.html", request);
        } else {
          return request;
        }
      }
      exports.serveSinglePageApp = serveSinglePageApp;
      var defaultCacheControl = {
        browserTTL: null,
        edgeTTL: 2 * 60 * 60 * 24,
        bypassCache: false
      };
      var getAssetFromKV2 = function(event, options2) {
        return __awaiter7(void 0, void 0, void 0, function() {
          var request, ASSET_NAMESPACE, ASSET_MANIFEST, SUPPORTED_METHODS, rawPathKey, pathIsEncoded, requestKey, parsedUrl, pathname, pathKey, cache, mimeType, shouldEdgeCache, cacheKey, evalCacheOpts, shouldSetBrowserCache, response, headers, shouldRevalidate, body;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                options2 = Object.assign({
                  ASSET_NAMESPACE: __STATIC_CONTENT,
                  ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
                  mapRequestToAsset,
                  cacheControl: defaultCacheControl,
                  defaultMimeType: "text/plain"
                }, options2);
                request = event.request;
                ASSET_NAMESPACE = options2.ASSET_NAMESPACE;
                ASSET_MANIFEST = typeof options2.ASSET_MANIFEST === "string" ? JSON.parse(options2.ASSET_MANIFEST) : options2.ASSET_MANIFEST;
                if (typeof ASSET_NAMESPACE === "undefined") {
                  throw new types_1.InternalError("there is no KV namespace bound to the script");
                }
                SUPPORTED_METHODS = ["GET", "HEAD"];
                if (!SUPPORTED_METHODS.includes(request.method)) {
                  throw new types_1.MethodNotAllowedError(request.method + " is not a valid request method");
                }
                rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
                pathIsEncoded = false;
                if (ASSET_MANIFEST[rawPathKey]) {
                  requestKey = request;
                } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
                  pathIsEncoded = true;
                  requestKey = request;
                } else {
                  requestKey = options2.mapRequestToAsset(request);
                }
                parsedUrl = new URL(requestKey.url);
                pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
                pathKey = pathname.replace(/^\/+/, "");
                cache = caches.default;
                mimeType = mime.getType(pathKey) || options2.defaultMimeType;
                if (mimeType.startsWith("text")) {
                  mimeType += "; charset=utf-8";
                }
                shouldEdgeCache = false;
                if (typeof ASSET_MANIFEST !== "undefined") {
                  if (ASSET_MANIFEST[pathKey]) {
                    pathKey = ASSET_MANIFEST[pathKey];
                    shouldEdgeCache = true;
                  }
                }
                cacheKey = new Request(parsedUrl.origin + "/" + pathKey, request);
                evalCacheOpts = function() {
                  switch (typeof options2.cacheControl) {
                    case "function":
                      return options2.cacheControl(request);
                    case "object":
                      return options2.cacheControl;
                    default:
                      return defaultCacheControl;
                  }
                }();
                options2.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
                if (options2.cacheControl.bypassCache || options2.cacheControl.edgeTTL === null || request.method == "HEAD") {
                  shouldEdgeCache = false;
                }
                shouldSetBrowserCache = typeof options2.cacheControl.browserTTL === "number";
                response = null;
                if (!shouldEdgeCache)
                  return [3, 2];
                return [4, cache.match(cacheKey)];
              case 1:
                response = _a.sent();
                _a.label = 2;
              case 2:
                if (!response)
                  return [3, 3];
                headers = new Headers(response.headers);
                shouldRevalidate = false;
                shouldRevalidate = [
                  request.headers.has("range") !== true,
                  request.headers.has("if-none-match"),
                  response.headers.has("etag"),
                  request.headers.get("if-none-match") === "" + pathKey
                ].every(Boolean);
                if (shouldRevalidate) {
                  if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
                    response.body.cancel();
                    console.log("Body exists and environment supports readable streams. Body cancelled");
                  } else {
                    console.log("Environment doesnt support readable streams");
                  }
                  headers.set("cf-cache-status", "REVALIDATED");
                  response = new Response(null, {
                    status: 304,
                    headers,
                    statusText: "Not Modified"
                  });
                } else {
                  headers.set("CF-Cache-Status", "HIT");
                  response = new Response(response.body, { headers });
                }
                return [3, 5];
              case 3:
                return [4, ASSET_NAMESPACE.get(pathKey, "arrayBuffer")];
              case 4:
                body = _a.sent();
                if (body === null) {
                  throw new types_1.NotFoundError("could not find " + pathKey + " in your content namespace");
                }
                response = new Response(body);
                if (shouldEdgeCache) {
                  response.headers.set("Accept-Ranges", "bytes");
                  response.headers.set("Content-Length", body.length);
                  if (!response.headers.has("etag")) {
                    response.headers.set("etag", "" + pathKey);
                  }
                  response.headers.set("Cache-Control", "max-age=" + options2.cacheControl.edgeTTL);
                  event.waitUntil(cache.put(cacheKey, response.clone()));
                  response.headers.set("CF-Cache-Status", "MISS");
                }
                _a.label = 5;
              case 5:
                response.headers.set("Content-Type", mimeType);
                if (shouldSetBrowserCache) {
                  response.headers.set("Cache-Control", "max-age=" + options2.cacheControl.browserTTL);
                } else {
                  response.headers.delete("Cache-Control");
                }
                return [2, response];
            }
          });
        });
      };
      exports.getAssetFromKV = getAssetFromKV2;
    }
  });

  // node_modules/@sveltejs/kit/dist/ssr.js
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
  var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
  var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  var escaped$1 = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function devalue(value) {
    var counts = new Map();
    function walk(thing) {
      if (typeof thing === "function") {
        throw new Error("Cannot stringify a function");
      }
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (!isPrimitive(thing)) {
        var type = getType(thing);
        switch (type) {
          case "Number":
          case "String":
          case "Boolean":
          case "Date":
          case "RegExp":
            return;
          case "Array":
            thing.forEach(walk);
            break;
          case "Set":
          case "Map":
            Array.from(thing).forEach(walk);
            break;
          default:
            var proto = Object.getPrototypeOf(thing);
            if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
              throw new Error("Cannot stringify arbitrary non-POJOs");
            }
            if (Object.getOwnPropertySymbols(thing).length > 0) {
              throw new Error("Cannot stringify POJOs with symbolic keys");
            }
            Object.keys(thing).forEach(function(key) {
              return walk(thing[key]);
            });
        }
      }
    }
    walk(value);
    var names = new Map();
    Array.from(counts).filter(function(entry) {
      return entry[1] > 1;
    }).sort(function(a, b) {
      return b[1] - a[1];
    }).forEach(function(entry, i) {
      names.set(entry[0], getName(i));
    });
    function stringify(thing) {
      if (names.has(thing)) {
        return names.get(thing);
      }
      if (isPrimitive(thing)) {
        return stringifyPrimitive(thing);
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          return "Object(" + stringify(thing.valueOf()) + ")";
        case "RegExp":
          return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
        case "Date":
          return "new Date(" + thing.getTime() + ")";
        case "Array":
          var members = thing.map(function(v, i) {
            return i in thing ? stringify(v) : "";
          });
          var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
          return "[" + members.join(",") + tail + "]";
        case "Set":
        case "Map":
          return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
        default:
          var obj = "{" + Object.keys(thing).map(function(key) {
            return safeKey(key) + ":" + stringify(thing[key]);
          }).join(",") + "}";
          var proto = Object.getPrototypeOf(thing);
          if (proto === null) {
            return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
          }
          return obj;
      }
    }
    var str = stringify(value);
    if (names.size) {
      var params_1 = [];
      var statements_1 = [];
      var values_1 = [];
      names.forEach(function(name, thing) {
        params_1.push(name);
        if (isPrimitive(thing)) {
          values_1.push(stringifyPrimitive(thing));
          return;
        }
        var type = getType(thing);
        switch (type) {
          case "Number":
          case "String":
          case "Boolean":
            values_1.push("Object(" + stringify(thing.valueOf()) + ")");
            break;
          case "RegExp":
            values_1.push(thing.toString());
            break;
          case "Date":
            values_1.push("new Date(" + thing.getTime() + ")");
            break;
          case "Array":
            values_1.push("Array(" + thing.length + ")");
            thing.forEach(function(v, i) {
              statements_1.push(name + "[" + i + "]=" + stringify(v));
            });
            break;
          case "Set":
            values_1.push("new Set");
            statements_1.push(name + "." + Array.from(thing).map(function(v) {
              return "add(" + stringify(v) + ")";
            }).join("."));
            break;
          case "Map":
            values_1.push("new Map");
            statements_1.push(name + "." + Array.from(thing).map(function(_a) {
              var k = _a[0], v = _a[1];
              return "set(" + stringify(k) + ", " + stringify(v) + ")";
            }).join("."));
            break;
          default:
            values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
            Object.keys(thing).forEach(function(key) {
              statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
            });
        }
      });
      statements_1.push("return " + str);
      return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
    } else {
      return str;
    }
  }
  function getName(num) {
    var name = "";
    do {
      name = chars[num % chars.length] + name;
      num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
  }
  function isPrimitive(thing) {
    return Object(thing) !== thing;
  }
  function stringifyPrimitive(thing) {
    if (typeof thing === "string")
      return stringifyString(thing);
    if (thing === void 0)
      return "void 0";
    if (thing === 0 && 1 / thing < 0)
      return "-0";
    var str = String(thing);
    if (typeof thing === "number")
      return str.replace(/^(-)?0\./, "$1.");
    return str;
  }
  function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
  }
  function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
  }
  function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
  }
  function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
  }
  function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
  }
  function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
      var char = str.charAt(i);
      var code = char.charCodeAt(0);
      if (char === '"') {
        result += '\\"';
      } else if (char in escaped$1) {
        result += escaped$1[char];
      } else if (code >= 55296 && code <= 57343) {
        var next = str.charCodeAt(i + 1);
        if (code <= 56319 && (next >= 56320 && next <= 57343)) {
          result += char + str[++i];
        } else {
          result += "\\u" + code.toString(16).toUpperCase();
        }
      } else {
        result += char;
      }
    }
    result += '"';
    return result;
  }
  function noop() {
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (let i = 0; i < subscribers.length; i += 1) {
            const s2 = subscribers[i];
            s2[1]();
            subscriber_queue.push(s2, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update(fn) {
      set(fn(value));
    }
    function subscribe(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.push(subscriber);
      if (subscribers.length === 1) {
        stop = start(set) || noop;
      }
      run2(value);
      return () => {
        const index2 = subscribers.indexOf(subscriber);
        if (index2 !== -1) {
          subscribers.splice(index2, 1);
        }
        if (subscribers.length === 0) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update, subscribe };
  }
  function hash(value) {
    let hash2 = 5381;
    let i = value.length;
    if (typeof value === "string") {
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else {
      while (i)
        hash2 = hash2 * 33 ^ value[--i];
    }
    return (hash2 >>> 0).toString(36);
  }
  var s$1 = JSON.stringify;
  async function render_response({
    options: options2,
    $session,
    page_config,
    status,
    error: error3,
    branch,
    page
  }) {
    const css2 = new Set(options2.entry.css);
    const js = new Set(options2.entry.js);
    const styles = new Set();
    const serialized_data = [];
    let rendered;
    let is_private = false;
    let maxage;
    if (error3) {
      error3.stack = options2.get_stack(error3);
    }
    if (branch) {
      branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
        if (node.css)
          node.css.forEach((url) => css2.add(url));
        if (node.js)
          node.js.forEach((url) => js.add(url));
        if (node.styles)
          node.styles.forEach((content) => styles.add(content));
        if (fetched && page_config.hydrate)
          serialized_data.push(...fetched);
        if (uses_credentials)
          is_private = true;
        maxage = loaded.maxage;
      });
      const session = writable($session);
      const props = {
        stores: {
          page: writable(null),
          navigating: writable(null),
          session
        },
        page,
        components: branch.map(({ node }) => node.module.default)
      };
      for (let i = 0; i < branch.length; i += 1) {
        props[`props_${i}`] = await branch[i].loaded.props;
      }
      let session_tracking_active = false;
      const unsubscribe = session.subscribe(() => {
        if (session_tracking_active)
          is_private = true;
      });
      session_tracking_active = true;
      try {
        rendered = options2.root.render(props);
      } finally {
        unsubscribe();
      }
    } else {
      rendered = { head: "", html: "", css: { code: "", map: null } };
    }
    const include_js = page_config.router || page_config.hydrate;
    if (!include_js)
      js.clear();
    const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
      ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
      ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
    ].join("\n		");
    let init2 = "";
    if (options2.amp) {
      init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    } else if (include_js) {
      init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
        throw new Error(`Failed to serialize session data: ${error4.message}`);
      })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
    }
    const head = [
      rendered.head,
      styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
      links,
      init2
    ].join("\n\n		");
    const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
      return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
    }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
    const headers = {
      "content-type": "text/html"
    };
    if (maxage) {
      headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
    }
    if (!options2.floc) {
      headers["permissions-policy"] = "interest-cohort=()";
    }
    return {
      status,
      headers,
      body: options2.template({ head, body })
    };
  }
  function try_serialize(data, fail) {
    try {
      return devalue(data);
    } catch (err) {
      if (fail)
        fail(err);
      return null;
    }
  }
  function serialize_error(error3) {
    if (!error3)
      return null;
    let serialized = try_serialize(error3);
    if (!serialized) {
      const { name, message, stack } = error3;
      serialized = try_serialize({ name, message, stack });
    }
    if (!serialized) {
      serialized = "{}";
    }
    return serialized;
  }
  function normalize(loaded) {
    if (loaded.error) {
      const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
      const status = loaded.status;
      if (!(error3 instanceof Error)) {
        return {
          status: 500,
          error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
        };
      }
      if (!status || status < 400 || status > 599) {
        console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
        return { status: 500, error: error3 };
      }
      return { status, error: error3 };
    }
    if (loaded.redirect) {
      if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
        return {
          status: 500,
          error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
        };
      }
      if (typeof loaded.redirect !== "string") {
        return {
          status: 500,
          error: new Error('"redirect" property returned from load() must be a string')
        };
      }
    }
    return loaded;
  }
  function resolve(base, path) {
    const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
    const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
    baseparts.pop();
    for (let i = 0; i < pathparts.length; i += 1) {
      const part = pathparts[i];
      if (part === ".")
        continue;
      else if (part === "..")
        baseparts.pop();
      else
        baseparts.push(part);
    }
    return `/${baseparts.join("/")}`;
  }
  var s = JSON.stringify;
  async function load_node({
    request,
    options: options2,
    state,
    route,
    page,
    node,
    $session,
    context,
    is_leaf,
    is_error,
    status,
    error: error3
  }) {
    const { module } = node;
    let uses_credentials = false;
    const fetched = [];
    let loaded;
    if (module.load) {
      const load_input = {
        page,
        get session() {
          uses_credentials = true;
          return $session;
        },
        fetch: async (resource, opts = {}) => {
          let url;
          if (typeof resource === "string") {
            url = resource;
          } else {
            url = resource.url;
            opts = {
              method: resource.method,
              headers: resource.headers,
              body: resource.body,
              mode: resource.mode,
              credentials: resource.credentials,
              cache: resource.cache,
              redirect: resource.redirect,
              referrer: resource.referrer,
              integrity: resource.integrity,
              ...opts
            };
          }
          if (options2.read && url.startsWith(options2.paths.assets)) {
            url = url.replace(options2.paths.assets, "");
          }
          if (url.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          let response;
          if (/^[a-zA-Z]+:/.test(url)) {
            response = await fetch(url, opts);
          } else {
            const [path, search] = url.split("?");
            const resolved = resolve(request.path, path);
            const filename = resolved.slice(1);
            const filename_html = `${filename}/index.html`;
            const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
            if (asset) {
              if (options2.read) {
                response = new Response(options2.read(asset.file), {
                  headers: {
                    "content-type": asset.type
                  }
                });
              } else {
                response = await fetch(`http://${page.host}/${asset.file}`, opts);
              }
            }
            if (!response) {
              const headers = { ...opts.headers };
              if (opts.credentials !== "omit") {
                uses_credentials = true;
                headers.cookie = request.headers.cookie;
                if (!headers.authorization) {
                  headers.authorization = request.headers.authorization;
                }
              }
              if (opts.body && typeof opts.body !== "string") {
                throw new Error("Request body must be a string");
              }
              const rendered = await respond({
                host: request.host,
                method: opts.method || "GET",
                headers,
                path: resolved,
                rawBody: opts.body,
                query: new URLSearchParams(search)
              }, options2, {
                fetched: url,
                initiator: route
              });
              if (rendered) {
                if (state.prerender) {
                  state.prerender.dependencies.set(resolved, rendered);
                }
                response = new Response(rendered.body, {
                  status: rendered.status,
                  headers: rendered.headers
                });
              }
            }
          }
          if (response) {
            const proxy = new Proxy(response, {
              get(response2, key, receiver) {
                async function text() {
                  const body = await response2.text();
                  const headers = {};
                  for (const [key2, value] of response2.headers) {
                    if (key2 !== "etag" && key2 !== "set-cookie")
                      headers[key2] = value;
                  }
                  if (!opts.body || typeof opts.body === "string") {
                    fetched.push({
                      url,
                      body: opts.body,
                      json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                    });
                  }
                  return body;
                }
                if (key === "text") {
                  return text;
                }
                if (key === "json") {
                  return async () => {
                    return JSON.parse(await text());
                  };
                }
                return Reflect.get(response2, key, response2);
              }
            });
            return proxy;
          }
          return response || new Response("Not found", {
            status: 404
          });
        },
        context: { ...context }
      };
      if (is_error) {
        load_input.status = status;
        load_input.error = error3;
      }
      loaded = await module.load.call(null, load_input);
    } else {
      loaded = {};
    }
    if (!loaded && is_leaf && !is_error)
      return;
    return {
      node,
      loaded: normalize(loaded),
      context: loaded.context || context,
      fetched,
      uses_credentials
    };
  }
  var escaped = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  function escape(str) {
    let result = '"';
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charAt(i);
      const code = char.charCodeAt(0);
      if (char === '"') {
        result += '\\"';
      } else if (char in escaped) {
        result += escaped[char];
      } else if (code >= 55296 && code <= 57343) {
        const next = str.charCodeAt(i + 1);
        if (code <= 56319 && next >= 56320 && next <= 57343) {
          result += char + str[++i];
        } else {
          result += `\\u${code.toString(16).toUpperCase()}`;
        }
      } else {
        result += char;
      }
    }
    result += '"';
    return result;
  }
  async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
    const default_layout = await options2.load_component(options2.manifest.layout);
    const default_error = await options2.load_component(options2.manifest.error);
    const page = {
      host: request.host,
      path: request.path,
      query: request.query,
      params: {}
    };
    const loaded = await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_layout,
      $session,
      context: {},
      is_leaf: false,
      is_error: false
    });
    const branch = [
      loaded,
      await load_node({
        request,
        options: options2,
        state,
        route: null,
        page,
        node: default_error,
        $session,
        context: loaded.context,
        is_leaf: false,
        is_error: true,
        status,
        error: error3
      })
    ];
    try {
      return await render_response({
        options: options2,
        $session,
        page_config: {
          hydrate: options2.hydrate,
          router: options2.router,
          ssr: options2.ssr
        },
        status,
        error: error3,
        branch,
        page
      });
    } catch (error4) {
      options2.handle_error(error4);
      return {
        status: 500,
        headers: {},
        body: error4.stack
      };
    }
  }
  async function respond$1({ request, options: options2, state, $session, route }) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const page = {
      host: request.host,
      path: request.path,
      query: request.query,
      params
    };
    let nodes;
    try {
      nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
    } catch (error4) {
      options2.handle_error(error4);
      return await respond_with_error({
        request,
        options: options2,
        state,
        $session,
        status: 500,
        error: error4
      });
    }
    const leaf = nodes[nodes.length - 1].module;
    const page_config = {
      ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
      router: "router" in leaf ? leaf.router : options2.router,
      hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
    };
    if (!leaf.prerender && state.prerender && !state.prerender.all) {
      return {
        status: 204,
        headers: {},
        body: null
      };
    }
    let branch;
    let status = 200;
    let error3;
    ssr:
      if (page_config.ssr) {
        let context = {};
        branch = [];
        for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          let loaded;
          if (node) {
            try {
              loaded = await load_node({
                request,
                options: options2,
                state,
                route,
                page,
                node,
                $session,
                context,
                is_leaf: i === nodes.length - 1,
                is_error: false
              });
              if (!loaded)
                return;
              if (loaded.loaded.redirect) {
                return {
                  status: loaded.loaded.status,
                  headers: {
                    location: encodeURI(loaded.loaded.redirect)
                  }
                };
              }
              if (loaded.loaded.error) {
                ({ status, error: error3 } = loaded.loaded);
              }
            } catch (e) {
              options2.handle_error(e);
              status = 500;
              error3 = e;
            }
            if (error3) {
              while (i--) {
                if (route.b[i]) {
                  const error_node = await options2.load_component(route.b[i]);
                  let error_loaded;
                  let node_loaded;
                  let j = i;
                  while (!(node_loaded = branch[j])) {
                    j -= 1;
                  }
                  try {
                    error_loaded = await load_node({
                      request,
                      options: options2,
                      state,
                      route,
                      page,
                      node: error_node,
                      $session,
                      context: node_loaded.context,
                      is_leaf: false,
                      is_error: true,
                      status,
                      error: error3
                    });
                    if (error_loaded.loaded.error) {
                      continue;
                    }
                    branch = branch.slice(0, j + 1).concat(error_loaded);
                    break ssr;
                  } catch (e) {
                    options2.handle_error(e);
                    continue;
                  }
                }
              }
              return await respond_with_error({
                request,
                options: options2,
                state,
                $session,
                status,
                error: error3
              });
            }
          }
          branch.push(loaded);
          if (loaded && loaded.loaded.context) {
            context = {
              ...context,
              ...loaded.loaded.context
            };
          }
        }
      }
    try {
      return await render_response({
        options: options2,
        $session,
        page_config,
        status,
        error: error3,
        branch: branch && branch.filter(Boolean),
        page
      });
    } catch (error4) {
      options2.handle_error(error4);
      return await respond_with_error({
        request,
        options: options2,
        state,
        $session,
        status: 500,
        error: error4
      });
    }
  }
  async function render_page(request, route, options2, state) {
    if (state.initiator === route) {
      return {
        status: 404,
        headers: {},
        body: `Not found: ${request.path}`
      };
    }
    const $session = await options2.hooks.getSession(request);
    if (route) {
      const response = await respond$1({
        request,
        options: options2,
        state,
        $session,
        route
      });
      if (response) {
        return response;
      }
      if (state.fetched) {
        return {
          status: 500,
          headers: {},
          body: `Bad request in load function: failed to fetch ${state.fetched}`
        };
      }
    } else {
      return await respond_with_error({
        request,
        options: options2,
        state,
        $session,
        status: 404,
        error: new Error(`Not found: ${request.path}`)
      });
    }
  }
  function lowercase_keys(obj) {
    const clone = {};
    for (const key in obj) {
      clone[key.toLowerCase()] = obj[key];
    }
    return clone;
  }
  function error(body) {
    return {
      status: 500,
      body,
      headers: {}
    };
  }
  async function render_route(request, route) {
    const mod = await route.load();
    const handler = mod[request.method.toLowerCase().replace("delete", "del")];
    if (handler) {
      const match = route.pattern.exec(request.path);
      const params = route.params(match);
      const response = await handler({ ...request, params });
      if (response) {
        if (typeof response !== "object") {
          return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
        }
        let { status = 200, body, headers = {} } = response;
        headers = lowercase_keys(headers);
        const type = headers["content-type"];
        if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
          return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
        }
        if (body instanceof Uint8Array && type !== "application/octet-stream") {
          return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
        }
        let normalized_body;
        if (typeof body === "object" && (!type || type === "application/json")) {
          headers = { ...headers, "content-type": "application/json" };
          normalized_body = JSON.stringify(body);
        } else {
          normalized_body = body;
        }
        return { status, body: normalized_body, headers };
      }
    }
  }
  function read_only_form_data() {
    const map = new Map();
    return {
      append(key, value) {
        if (map.has(key)) {
          map.get(key).push(value);
        } else {
          map.set(key, [value]);
        }
      },
      data: new ReadOnlyFormData(map)
    };
  }
  var _map;
  var ReadOnlyFormData = class {
    constructor(map) {
      __privateAdd(this, _map, void 0);
      __privateSet(this, _map, map);
    }
    get(key) {
      const value = __privateGet(this, _map).get(key);
      return value && value[0];
    }
    getAll(key) {
      return __privateGet(this, _map).get(key);
    }
    has(key) {
      return __privateGet(this, _map).has(key);
    }
    *[Symbol.iterator]() {
      for (const [key, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield [key, value[i]];
        }
      }
    }
    *entries() {
      for (const [key, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield [key, value[i]];
        }
      }
    }
    *keys() {
      for (const [key, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield key;
        }
      }
    }
    *values() {
      for (const [, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield value;
        }
      }
    }
  };
  _map = new WeakMap();
  function parse_body(raw, headers) {
    if (!raw)
      return raw;
    const [type, ...directives] = headers["content-type"].split(/;\s*/);
    if (typeof raw === "string") {
      switch (type) {
        case "text/plain":
          return raw;
        case "application/json":
          return JSON.parse(raw);
        case "application/x-www-form-urlencoded":
          return get_urlencoded(raw);
        case "multipart/form-data": {
          const boundary = directives.find((directive) => directive.startsWith("boundary="));
          if (!boundary)
            throw new Error("Missing boundary");
          return get_multipart(raw, boundary.slice("boundary=".length));
        }
        default:
          throw new Error(`Invalid Content-Type ${type}`);
      }
    }
    return raw;
  }
  function get_urlencoded(text) {
    const { data, append } = read_only_form_data();
    text.replace(/\+/g, " ").split("&").forEach((str) => {
      const [key, value] = str.split("=");
      append(decodeURIComponent(key), decodeURIComponent(value));
    });
    return data;
  }
  function get_multipart(text, boundary) {
    const parts = text.split(`--${boundary}`);
    const nope = () => {
      throw new Error("Malformed form data");
    };
    if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
      nope();
    }
    const { data, append } = read_only_form_data();
    parts.slice(1, -1).forEach((part) => {
      const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
      const raw_headers = match[1];
      const body = match[2].trim();
      let key;
      raw_headers.split("\r\n").forEach((str) => {
        const [raw_header, ...raw_directives] = str.split("; ");
        let [name, value] = raw_header.split(": ");
        name = name.toLowerCase();
        const directives = {};
        raw_directives.forEach((raw_directive) => {
          const [name2, value2] = raw_directive.split("=");
          directives[name2] = JSON.parse(value2);
        });
        if (name === "content-disposition") {
          if (value !== "form-data")
            nope();
          if (directives.filename) {
            throw new Error("File upload is not yet implemented");
          }
          if (directives.name) {
            key = directives.name;
          }
        }
      });
      if (!key)
        nope();
      append(key, body);
    });
    return data;
  }
  async function respond(incoming, options2, state = {}) {
    if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
      const has_trailing_slash = incoming.path.endsWith("/");
      if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
        const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
        const q = incoming.query.toString();
        return {
          status: 301,
          headers: {
            location: encodeURI(path + (q ? `?${q}` : ""))
          }
        };
      }
    }
    try {
      const headers = lowercase_keys(incoming.headers);
      return await options2.hooks.handle({
        request: {
          ...incoming,
          headers,
          body: parse_body(incoming.rawBody, headers),
          params: null,
          locals: {}
        },
        resolve: async (request) => {
          if (state.prerender && state.prerender.fallback) {
            return await render_response({
              options: options2,
              $session: await options2.hooks.getSession(request),
              page_config: { ssr: false, router: true, hydrate: true },
              status: 200,
              error: null,
              branch: [],
              page: null
            });
          }
          for (const route of options2.manifest.routes) {
            if (!route.pattern.test(request.path))
              continue;
            const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
            if (response) {
              if (response.status === 200) {
                if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                  const etag = `"${hash(response.body)}"`;
                  if (request.headers["if-none-match"] === etag) {
                    return {
                      status: 304,
                      headers: {},
                      body: null
                    };
                  }
                  response.headers["etag"] = etag;
                }
              }
              return response;
            }
          }
          return await render_page(request, null, options2, state);
        }
      });
    } catch (e) {
      options2.handle_error(e);
      return {
        status: 500,
        headers: {},
        body: options2.dev ? e.stack : e.message
      };
    }
  }

  // node_modules/svelte/internal/index.mjs
  function noop2() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var tasks = new Set();
  var active_docs = new Set();
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
  }
  var resolved_promise = Promise.resolve();
  var seen_callbacks = new Set();
  var outroing = new Set();
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  var boolean_attributes = new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]);
  var escaped2 = {
    '"': "&quot;",
    "'": "&#39;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function escape2(html) {
    return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
  }
  function each(items, fn) {
    let str = "";
    for (let i = 0; i < items.length; i += 1) {
      str += fn(items[i], i);
    }
    return str;
  }
  var missing_component = {
    $$render: () => ""
  };
  function validate_component(component, name) {
    if (!component || !component.$$render) {
      if (name === "svelte:component")
        name += " this={...}";
      throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
  }
  var on_destroy;
  function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
      const parent_component = current_component;
      const $$ = {
        on_destroy,
        context: new Map(parent_component ? parent_component.$$.context : context || []),
        on_mount: [],
        before_update: [],
        after_update: [],
        callbacks: blank_object()
      };
      set_current_component({ $$ });
      const html = fn(result, props, bindings, slots);
      set_current_component(parent_component);
      return html;
    }
    return {
      render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
        on_destroy = [];
        const result = { title: "", head: "", css: new Set() };
        const html = $$render(result, props, {}, $$slots, context);
        run_all(on_destroy);
        return {
          html,
          css: {
            code: Array.from(result.css).map((css2) => css2.code).join("\n"),
            map: null
          },
          head: result.title + result.head
        };
      },
      $$render
    };
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop2;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index2 = callbacks.indexOf(callback);
          if (index2 !== -1)
            callbacks.splice(index2, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }

  // node_modules/@supabase/supabase-js/dist/module/lib/constants.js
  var DEFAULT_HEADERS = {};

  // node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
  var import_cross_fetch = __toModule(require_browser_ponyfill());
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError = (error3, reject) => {
    if (typeof error3.json !== "function") {
      return reject(error3);
    }
    error3.json().then((err) => {
      return reject({
        message: _getErrorMessage(err),
        status: (error3 === null || error3 === void 0 ? void 0 : error3.status) || 500
      });
    });
  };
  var _getRequestParams = (method, options2, body) => {
    const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({ "Content-Type": "text/plain;charset=UTF-8" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    params.body = JSON.stringify(body);
    return params;
  };
  function _handleRequest(method, url, options2, body) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2, reject) => {
        (0, import_cross_fetch.default)(url, _getRequestParams(method, options2, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
            return resolve2;
          return result.json();
        }).then((data) => resolve2(data)).catch((error3) => handleError(error3, reject));
      });
    });
  }
  function get(url, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("GET", url, options2);
    });
  }
  function post(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("POST", url, options2, body);
    });
  }
  function put(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("PUT", url, options2, body);
    });
  }
  function remove(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("DELETE", url, options2, body);
    });
  }

  // node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
  var GOTRUE_URL = "http://localhost:9999";
  var DEFAULT_HEADERS2 = {};
  var EXPIRY_MARGIN = 60 * 1e3;
  var STORAGE_KEY = "supabase.auth.token";
  var COOKIE_OPTIONS = {
    name: "sb:token",
    lifetime: 60 * 60 * 8,
    domain: "",
    path: "/",
    sameSite: "lax"
  };

  // node_modules/@supabase/gotrue-js/dist/module/lib/cookies.js
  function serialize(name, val, options2) {
    const opt = options2 || {};
    const enc = encodeURIComponent;
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    if (typeof enc !== "function") {
      throw new TypeError("option encode is invalid");
    }
    if (!fieldContentRegExp.test(name)) {
      throw new TypeError("argument name is invalid");
    }
    const value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError("argument val is invalid");
    }
    let str = name + "=" + value;
    if (opt.maxAge != null) {
      const maxAge = opt.maxAge - 0;
      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError("option maxAge is invalid");
      }
      str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError("option domain is invalid");
      }
      str += "; Domain=" + opt.domain;
    }
    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError("option path is invalid");
      }
      str += "; Path=" + opt.path;
    }
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== "function") {
        throw new TypeError("option expires is invalid");
      }
      str += "; Expires=" + opt.expires.toUTCString();
    }
    if (opt.httpOnly) {
      str += "; HttpOnly";
    }
    if (opt.secure) {
      str += "; Secure";
    }
    if (opt.sameSite) {
      const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
      switch (sameSite) {
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return str;
  }
  function isSecureEnvironment(req) {
    if (!req || !req.headers || !req.headers.host) {
      throw new Error('The "host" request header is not available');
    }
    const host = req.headers.host.indexOf(":") > -1 && req.headers.host.split(":")[0] || req.headers.host;
    if (["localhost", "127.0.0.1"].indexOf(host) > -1 || host.endsWith(".local")) {
      return false;
    }
    return true;
  }
  function serializeCookie(cookie, secure) {
    var _a, _b, _c;
    return serialize(cookie.name, cookie.value, {
      maxAge: cookie.maxAge,
      expires: new Date(Date.now() + cookie.maxAge * 1e3),
      httpOnly: true,
      secure,
      path: (_a = cookie.path) !== null && _a !== void 0 ? _a : "/",
      domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : "",
      sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : "lax"
    });
  }
  function setCookies(req, res, cookies) {
    const strCookies = cookies.map((c) => serializeCookie(c, isSecureEnvironment(req)));
    const previousCookies = res.getHeader("Set-Cookie");
    if (previousCookies) {
      if (previousCookies instanceof Array) {
        Array.prototype.push.apply(strCookies, previousCookies);
      } else if (typeof previousCookies === "string") {
        strCookies.push(previousCookies);
      }
    }
    res.setHeader("Set-Cookie", strCookies);
  }
  function setCookie(req, res, cookie) {
    setCookies(req, res, [cookie]);
  }
  function deleteCookie(req, res, name) {
    setCookie(req, res, {
      name,
      value: "",
      maxAge: -1
    });
  }

  // node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
  function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1e3);
    return timeNow + expiresIn;
  }
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  var isBrowser = () => typeof window !== "undefined";
  function getParameterByName(name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var LocalStorage = class {
    constructor(localStorage) {
      this.localStorage = localStorage || globalThis.localStorage;
    }
    clear() {
      return this.localStorage.clear();
    }
    key(index2) {
      return this.localStorage.key(index2);
    }
    setItem(key, value) {
      return this.localStorage.setItem(key, value);
    }
    getItem(key) {
      return this.localStorage.getItem(key);
    }
    removeItem(key) {
      return this.localStorage.removeItem(key);
    }
  };

  // node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var GoTrueApi = class {
    constructor({ url = "", headers = {}, cookieOptions }) {
      this.url = url;
      this.headers = headers;
      this.cookieOptions = Object.assign(Object.assign({}, COOKIE_OPTIONS), cookieOptions);
    }
    signUpWithEmail(email, password, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString = "?redirect_to=" + options2.redirectTo;
          }
          const data = yield post(`${this.url}/signup${queryString}`, { email, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    signInWithEmail(email, password, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "?grant_type=password";
          if (options2.redirectTo) {
            queryString += "&redirect_to=" + options2.redirectTo;
          }
          const data = yield post(`${this.url}/token${queryString}`, { email, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    sendMagicLinkEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + options2.redirectTo;
          }
          const data = yield post(`${this.url}/magiclink${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    inviteUserByEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + options2.redirectTo;
          }
          const data = yield post(`${this.url}/invite${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    resetPasswordForEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + options2.redirectTo;
          }
          const data = yield post(`${this.url}/recover${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    _createRequestHeaders(jwt) {
      const headers = Object.assign({}, this.headers);
      headers["Authorization"] = `Bearer ${jwt}`;
      return headers;
    }
    signOut(jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          yield post(`${this.url}/logout`, {}, { headers: this._createRequestHeaders(jwt), noResolveJson: true });
          return { error: null };
        } catch (error3) {
          return { error: error3 };
        }
      });
    }
    getUrlForProvider(provider, options2) {
      let urlParams = [`provider=${provider}`];
      if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
        urlParams.push(`redirect_to=${options2.redirectTo}`);
      }
      if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
        urlParams.push(`scopes=${options2.scopes}`);
      }
      return `${this.url}/authorize?${urlParams.join("&")}`;
    }
    getUser(jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield get(`${this.url}/user`, { headers: this._createRequestHeaders(jwt) });
          return { user: data, data, error: null };
        } catch (error3) {
          return { user: null, data: null, error: error3 };
        }
      });
    }
    updateUser(jwt, attributes) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield put(`${this.url}/user`, attributes, {
            headers: this._createRequestHeaders(jwt)
          });
          return { user: data, data, error: null };
        } catch (error3) {
          return { user: null, data: null, error: error3 };
        }
      });
    }
    deleteUser(uid, jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield remove(`${this.url}/admin/users/${uid}`, {}, {
            headers: this._createRequestHeaders(jwt)
          });
          return { user: data, data, error: null };
        } catch (error3) {
          return { user: null, data: null, error: error3 };
        }
      });
    }
    refreshAccessToken(refreshToken) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield post(`${this.url}/token?grant_type=refresh_token`, { refresh_token: refreshToken }, { headers: this.headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    setAuthCookie(req, res) {
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
      }
      const { event, session } = req.body;
      if (!event)
        throw new Error("Auth event missing!");
      if (event === "SIGNED_IN") {
        if (!session)
          throw new Error("Auth session missing!");
        setCookie(req, res, {
          name: this.cookieOptions.name,
          value: session.access_token,
          domain: this.cookieOptions.domain,
          maxAge: this.cookieOptions.lifetime,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        });
      }
      if (event === "SIGNED_OUT")
        deleteCookie(req, res, this.cookieOptions.name);
      res.status(200).json({});
    }
    getUserByCookie(req) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          if (!req.cookies)
            throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
          if (!req.cookies[this.cookieOptions.name])
            throw new Error("No cookie found!");
          const token = req.cookies[this.cookieOptions.name];
          const { user, error: error3 } = yield this.getUser(token);
          if (error3)
            throw error3;
          return { user, data: user, error: null };
        } catch (error3) {
          return { user: null, data: null, error: error3 };
        }
      });
    }
  };

  // node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
  function polyfillGlobalThis() {
    if (typeof globalThis === "object")
      return;
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: true
      });
      __magic__.globalThis = __magic__;
      delete Object.prototype.__magic__;
    } catch (e) {
      if (typeof self !== "undefined") {
        self.globalThis = self;
      }
    }
  }

  // node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  polyfillGlobalThis();
  var DEFAULT_OPTIONS = {
    url: GOTRUE_URL,
    autoRefreshToken: true,
    persistSession: true,
    localStorage: globalThis.localStorage,
    detectSessionInUrl: true,
    headers: DEFAULT_HEADERS2
  };
  var GoTrueClient = class {
    constructor(options2) {
      this.stateChangeEmitters = new Map();
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
      this.currentUser = null;
      this.currentSession = null;
      this.autoRefreshToken = settings.autoRefreshToken;
      this.persistSession = settings.persistSession;
      this.localStorage = new LocalStorage(settings.localStorage);
      this.api = new GoTrueApi({
        url: settings.url,
        headers: settings.headers,
        cookieOptions: settings.cookieOptions
      });
      this._recoverSession();
      this._recoverAndRefresh();
      try {
        if (settings.detectSessionInUrl && isBrowser() && !!getParameterByName("access_token")) {
          this.getSessionFromUrl({ storeSession: true });
        }
      } catch (error3) {
        console.log("Error getting session from URL.");
      }
    }
    signUp({ email, password }, options2 = {}) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          const { data, error: error3 } = yield this.api.signUpWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error3) {
            throw error3;
          }
          if (!data) {
            throw "An error occurred on sign up.";
          }
          let session = null;
          let user = null;
          if (data.access_token) {
            session = data;
            user = session.user;
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          if (data.id) {
            user = data;
          }
          return { data, user, session, error: null };
        } catch (error3) {
          return { data: null, user: null, session: null, error: error3 };
        }
      });
    }
    signIn({ email, password, refreshToken, provider }, options2 = {}) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          if (email && !password) {
            const { error: error3 } = yield this.api.sendMagicLinkEmail(email, {
              redirectTo: options2.redirectTo
            });
            return { data: null, user: null, session: null, error: error3 };
          }
          if (email && password) {
            return this._handleEmailSignIn(email, password, {
              redirectTo: options2.redirectTo
            });
          }
          if (refreshToken) {
            const { error: error3 } = yield this._callRefreshToken(refreshToken);
            if (error3)
              throw error3;
            return {
              data: this.currentSession,
              user: this.currentUser,
              session: this.currentSession,
              error: null
            };
          }
          if (provider) {
            return this._handleProviderSignIn(provider, {
              redirectTo: options2.redirectTo,
              scopes: options2.scopes
            });
          }
          throw new Error(`You must provide either an email or a third-party provider.`);
        } catch (error3) {
          return { data: null, user: null, session: null, error: error3 };
        }
      });
    }
    user() {
      return this.currentUser;
    }
    session() {
      return this.currentSession;
    }
    refreshSession() {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const { error: error3 } = yield this._callRefreshToken();
          if (error3)
            throw error3;
          return { data: this.currentSession, user: this.currentUser, error: null };
        } catch (error3) {
          return { data: null, user: null, error: error3 };
        }
      });
    }
    update(attributes) {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const { user, error: error3 } = yield this.api.updateUser(this.currentSession.access_token, attributes);
          if (error3)
            throw error3;
          if (!user)
            throw Error("Invalid user data.");
          const session = Object.assign(Object.assign({}, this.currentSession), { user });
          this._saveSession(session);
          this._notifyAllSubscribers("USER_UPDATED");
          return { data: user, user, error: null };
        } catch (error3) {
          return { data: null, user: null, error: error3 };
        }
      });
    }
    setSession(refresh_token) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!refresh_token) {
            throw new Error("No current session.");
          }
          const { data, error: error3 } = yield this.api.refreshAccessToken(refresh_token);
          if (error3) {
            return { session: null, error: error3 };
          }
          if (!data) {
            return {
              session: null,
              error: { name: "Invalid refresh_token", message: "JWT token provided is Invalid" }
            };
          }
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return { session: data, error: null };
        } catch (error3) {
          return { error: error3, session: null };
        }
      });
    }
    setAuth(access_token) {
      this.currentSession = Object.assign(Object.assign({}, this.currentSession), { access_token, token_type: "bearer", user: null });
      return this.currentSession;
    }
    getSessionFromUrl(options2) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!isBrowser())
            throw new Error("No browser detected.");
          const error_description = getParameterByName("error_description");
          if (error_description)
            throw new Error(error_description);
          const provider_token = getParameterByName("provider_token");
          const access_token = getParameterByName("access_token");
          if (!access_token)
            throw new Error("No access_token detected.");
          const expires_in = getParameterByName("expires_in");
          if (!expires_in)
            throw new Error("No expires_in detected.");
          const refresh_token = getParameterByName("refresh_token");
          if (!refresh_token)
            throw new Error("No refresh_token detected.");
          const token_type = getParameterByName("token_type");
          if (!token_type)
            throw new Error("No token_type detected.");
          const timeNow = Math.round(Date.now() / 1e3);
          const expires_at = timeNow + parseInt(expires_in);
          const { user, error: error3 } = yield this.api.getUser(access_token);
          if (error3)
            throw error3;
          const session = {
            provider_token,
            access_token,
            expires_in: parseInt(expires_in),
            expires_at,
            refresh_token,
            token_type,
            user
          };
          if (options2 === null || options2 === void 0 ? void 0 : options2.storeSession) {
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
            if (getParameterByName("type") === "recovery") {
              this._notifyAllSubscribers("PASSWORD_RECOVERY");
            }
          }
          window.location.hash = "";
          return { data: session, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    signOut() {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;
        this._removeSession();
        this._notifyAllSubscribers("SIGNED_OUT");
        if (accessToken) {
          const { error: error3 } = yield this.api.signOut(accessToken);
          if (error3)
            return { error: error3 };
        }
        return { error: null };
      });
    }
    onAuthStateChange(callback) {
      try {
        const id = uuid();
        const self2 = this;
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            self2.stateChangeEmitters.delete(id);
          }
        };
        this.stateChangeEmitters.set(id, subscription);
        return { data: subscription, error: null };
      } catch (error3) {
        return { data: null, error: error3 };
      }
    }
    _handleEmailSignIn(email, password, options2 = {}) {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          const { data, error: error3 } = yield this.api.signInWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error3 || !data)
            return { data: null, user: null, session: null, error: error3 };
          if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) {
            this._saveSession(data);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          return { data, user: data.user, session: data, error: null };
        } catch (error3) {
          return { data: null, user: null, session: null, error: error3 };
        }
      });
    }
    _handleProviderSignIn(provider, options2 = {}) {
      const url = this.api.getUrlForProvider(provider, {
        redirectTo: options2.redirectTo,
        scopes: options2.scopes
      });
      try {
        if (isBrowser()) {
          window.location.href = url;
        }
        return { provider, url, data: null, session: null, user: null, error: null };
      } catch (error3) {
        if (!!url)
          return { provider, url, data: null, session: null, user: null, error: null };
        return { data: null, user: null, session: null, error: error3 };
      }
    }
    _recoverSession() {
      var _a;
      try {
        const json = isBrowser() && ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(STORAGE_KEY));
        if (!json || typeof json !== "string") {
          return null;
        }
        const data = JSON.parse(json);
        const { currentSession, expiresAt: expiresAt2 } = data;
        const timeNow = Math.round(Date.now() / 1e3);
        if (expiresAt2 >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
          this._saveSession(currentSession);
          this._notifyAllSubscribers("SIGNED_IN");
        }
      } catch (error3) {
        console.log("error", error3);
      }
    }
    _recoverAndRefresh() {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          const json = isBrowser() && (yield this.localStorage.getItem(STORAGE_KEY));
          if (!json) {
            return null;
          }
          const data = JSON.parse(json);
          const { currentSession, expiresAt: expiresAt2 } = data;
          const timeNow = Math.round(Date.now() / 1e3);
          if (expiresAt2 < timeNow) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const { error: error3 } = yield this._callRefreshToken(currentSession.refresh_token);
              if (error3) {
                console.log(error3.message);
                yield this._removeSession();
              }
            } else {
              this._removeSession();
            }
          } else if (!currentSession || !currentSession.user) {
            console.log("Current session is missing data.");
            this._removeSession();
          } else {
            this._saveSession(currentSession);
            this._notifyAllSubscribers("SIGNED_IN");
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      });
    }
    _callRefreshToken(refresh_token) {
      var _a;
      if (refresh_token === void 0) {
        refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
      }
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!refresh_token) {
            throw new Error("No current session.");
          }
          const { data, error: error3 } = yield this.api.refreshAccessToken(refresh_token);
          if (error3)
            throw error3;
          if (!data)
            throw Error("Invalid session data.");
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return { data, error: null };
        } catch (error3) {
          return { data: null, error: error3 };
        }
      });
    }
    _notifyAllSubscribers(event) {
      this.stateChangeEmitters.forEach((x) => x.callback(event, this.currentSession));
    }
    _saveSession(session) {
      this.currentSession = session;
      this.currentUser = session.user;
      const expiresAt2 = session.expires_at;
      const timeNow = Math.round(Date.now() / 1e3);
      if (expiresAt2)
        this._startAutoRefreshToken((expiresAt2 - timeNow - 60) * 1e3);
      if (this.persistSession && session.expires_at) {
        this._persistSession(this.currentSession);
      }
    }
    _persistSession(currentSession) {
      const data = { currentSession, expiresAt: currentSession.expires_at };
      isBrowser() && this.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    _removeSession() {
      return __awaiter3(this, void 0, void 0, function* () {
        this.currentSession = null;
        this.currentUser = null;
        if (this.refreshTokenTimer)
          clearTimeout(this.refreshTokenTimer);
        isBrowser() && (yield this.localStorage.removeItem(STORAGE_KEY));
      });
    }
    _startAutoRefreshToken(value) {
      if (this.refreshTokenTimer)
        clearTimeout(this.refreshTokenTimer);
      if (!value || !this.autoRefreshToken)
        return;
      this.refreshTokenTimer = setTimeout(() => this._callRefreshToken(), value);
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
  var SupabaseAuthClient = class extends GoTrueClient {
    constructor(options2) {
      super(options2);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/types.js
  var import_cross_fetch2 = __toModule(require_browser_ponyfill());
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var PostgrestBuilder = class {
    constructor(builder) {
      Object.assign(this, builder);
    }
    then(onfulfilled, onrejected) {
      if (typeof this.schema === "undefined") {
      } else if (["GET", "HEAD"].includes(this.method)) {
        this.headers["Accept-Profile"] = this.schema;
      } else {
        this.headers["Content-Profile"] = this.schema;
      }
      if (this.method !== "GET" && this.method !== "HEAD") {
        this.headers["Content-Type"] = "application/json";
      }
      return (0, import_cross_fetch2.default)(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      }).then((res) => __awaiter4(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let error3 = null;
        let data = null;
        let count = null;
        if (res.ok) {
          const isReturnMinimal = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.split(",").includes("return=minimal");
          if (this.method !== "HEAD" && !isReturnMinimal) {
            const text = yield res.text();
            if (text && text !== "")
              data = JSON.parse(text);
          }
          const countHeader = (_b = this.headers["Prefer"]) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
          const contentRange = (_c = res.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
          if (countHeader && contentRange && contentRange.length > 1) {
            count = parseInt(contentRange[1]);
          }
        } else {
          error3 = yield res.json();
        }
        const postgrestResponse = {
          error: error3,
          data,
          count,
          status: res.status,
          statusText: res.statusText,
          body: data
        };
        return postgrestResponse;
      })).then(onfulfilled, onrejected);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestTransformBuilder.js
  var PostgrestTransformBuilder = class extends PostgrestBuilder {
    select(columns = "*") {
      let quoted = false;
      const cleanedColumns = columns.split("").map((c) => {
        if (/\s/.test(c) && !quoted) {
          return "";
        }
        if (c === '"') {
          quoted = !quoted;
        }
        return c;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      return this;
    }
    order(column, { ascending = true, nullsFirst = false, foreignTable } = {}) {
      const key = typeof foreignTable === "undefined" ? "order" : `${foreignTable}.order`;
      this.url.searchParams.set(key, `${column}.${ascending ? "asc" : "desc"}.${nullsFirst ? "nullsfirst" : "nullslast"}`);
      return this;
    }
    limit(count, { foreignTable } = {}) {
      const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(key, `${count}`);
      return this;
    }
    range(from, to, { foreignTable } = {}) {
      const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
      const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(keyOffset, `${from}`);
      this.url.searchParams.set(keyLimit, `${to - from + 1}`);
      return this;
    }
    single() {
      this.headers["Accept"] = "application/vnd.pgrst.object+json";
      return this;
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js
  var cleanFilterArray = (filter) => filter.map((s2) => `${s2}`).join(",");
  var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
    not(column, operator, value) {
      this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
      return this;
    }
    or(filters) {
      this.url.searchParams.append("or", `(${filters})`);
      return this;
    }
    eq(column, value) {
      this.url.searchParams.append(`${column}`, `eq.${value}`);
      return this;
    }
    neq(column, value) {
      this.url.searchParams.append(`${column}`, `neq.${value}`);
      return this;
    }
    gt(column, value) {
      this.url.searchParams.append(`${column}`, `gt.${value}`);
      return this;
    }
    gte(column, value) {
      this.url.searchParams.append(`${column}`, `gte.${value}`);
      return this;
    }
    lt(column, value) {
      this.url.searchParams.append(`${column}`, `lt.${value}`);
      return this;
    }
    lte(column, value) {
      this.url.searchParams.append(`${column}`, `lte.${value}`);
      return this;
    }
    like(column, pattern) {
      this.url.searchParams.append(`${column}`, `like.${pattern}`);
      return this;
    }
    ilike(column, pattern) {
      this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
      return this;
    }
    is(column, value) {
      this.url.searchParams.append(`${column}`, `is.${value}`);
      return this;
    }
    in(column, values) {
      this.url.searchParams.append(`${column}`, `in.(${cleanFilterArray(values)})`);
      return this;
    }
    cs(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cs.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cs.{${cleanFilterArray(value)}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
      }
      return this;
    }
    cd(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cd.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cd.{${cleanFilterArray(value)}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
      }
      return this;
    }
    sl(column, range) {
      this.url.searchParams.append(`${column}`, `sl.${range}`);
      return this;
    }
    sr(column, range) {
      this.url.searchParams.append(`${column}`, `sr.${range}`);
      return this;
    }
    nxl(column, range) {
      this.url.searchParams.append(`${column}`, `nxl.${range}`);
      return this;
    }
    nxr(column, range) {
      this.url.searchParams.append(`${column}`, `nxr.${range}`);
      return this;
    }
    adj(column, range) {
      this.url.searchParams.append(`${column}`, `adj.${range}`);
      return this;
    }
    ov(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `ov.${value}`);
      } else {
        this.url.searchParams.append(`${column}`, `ov.{${cleanFilterArray(value)}}`);
      }
      return this;
    }
    fts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
      return this;
    }
    plfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
      return this;
    }
    phfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
      return this;
    }
    wfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
      return this;
    }
    filter(column, operator, value) {
      this.url.searchParams.append(`${column}`, `${operator}.${value}`);
      return this;
    }
    match(query) {
      Object.keys(query).forEach((key) => {
        this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
      });
      return this;
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js
  var PostgrestQueryBuilder = class extends PostgrestBuilder {
    constructor(url, { headers = {}, schema } = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    select(columns = "*", { head = false, count = null } = {}) {
      this.method = "GET";
      let quoted = false;
      const cleanedColumns = columns.split("").map((c) => {
        if (/\s/.test(c) && !quoted) {
          return "";
        }
        if (c === '"') {
          quoted = !quoted;
        }
        return c;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      if (count) {
        this.headers["Prefer"] = `count=${count}`;
      }
      if (head) {
        this.method = "HEAD";
      }
      return new PostgrestFilterBuilder(this);
    }
    insert(values, { upsert = false, onConflict, returning = "representation", count = null } = {}) {
      this.method = "POST";
      let prefersHeaders = [];
      prefersHeaders.push(`return=${returning}`);
      if (upsert)
        prefersHeaders.push("resolution=merge-duplicates");
      if (upsert && onConflict !== void 0)
        this.url.searchParams.set("on_conflict", onConflict);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
    update(values, { returning = "representation", count = null } = {}) {
      this.method = "PATCH";
      let prefersHeaders = [];
      prefersHeaders.push(`return=${returning}`);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
    delete({ returning = "representation", count = null } = {}) {
      this.method = "DELETE";
      let prefersHeaders = [];
      prefersHeaders.push(`return=${returning}`);
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestRpcBuilder.js
  var PostgrestRpcBuilder = class extends PostgrestBuilder {
    constructor(url, { headers = {}, schema } = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    rpc(params, { count = null } = {}) {
      this.method = "POST";
      this.body = params;
      if (count) {
        if (this.headers["Prefer"] !== void 0)
          this.headers["Prefer"] += `,count=${count}`;
        else
          this.headers["Prefer"] = `count=${count}`;
      }
      return new PostgrestTransformBuilder(this);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
  var PostgrestClient = class {
    constructor(url, { headers = {}, schema } = {}) {
      this.url = url;
      this.headers = headers;
      this.schema = schema;
    }
    auth(token) {
      this.headers["Authorization"] = `Bearer ${token}`;
      return this;
    }
    from(table) {
      const url = `${this.url}/${table}`;
      return new PostgrestQueryBuilder(url, { headers: this.headers, schema: this.schema });
    }
    rpc(fn, params, { count = null } = {}) {
      const url = `${this.url}/rpc/${fn}`;
      return new PostgrestRpcBuilder(url, {
        headers: this.headers,
        schema: this.schema
      }).rpc(params, { count });
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
  var transformers_exports = {};
  __export(transformers_exports, {
    PostgresTypes: () => PostgresTypes,
    convertCell: () => convertCell,
    convertChangeData: () => convertChangeData,
    convertColumn: () => convertColumn,
    toArray: () => toArray,
    toBoolean: () => toBoolean,
    toDate: () => toDate,
    toDateRange: () => toDateRange,
    toFloat: () => toFloat,
    toInt: () => toInt,
    toIntRange: () => toIntRange,
    toJson: () => toJson,
    toTimestampString: () => toTimestampString
  });
  var PostgresTypes;
  (function(PostgresTypes2) {
    PostgresTypes2["abstime"] = "abstime";
    PostgresTypes2["bool"] = "bool";
    PostgresTypes2["date"] = "date";
    PostgresTypes2["daterange"] = "daterange";
    PostgresTypes2["float4"] = "float4";
    PostgresTypes2["float8"] = "float8";
    PostgresTypes2["int2"] = "int2";
    PostgresTypes2["int4"] = "int4";
    PostgresTypes2["int4range"] = "int4range";
    PostgresTypes2["int8"] = "int8";
    PostgresTypes2["int8range"] = "int8range";
    PostgresTypes2["json"] = "json";
    PostgresTypes2["jsonb"] = "jsonb";
    PostgresTypes2["money"] = "money";
    PostgresTypes2["numeric"] = "numeric";
    PostgresTypes2["oid"] = "oid";
    PostgresTypes2["reltime"] = "reltime";
    PostgresTypes2["time"] = "time";
    PostgresTypes2["timestamp"] = "timestamp";
    PostgresTypes2["timestamptz"] = "timestamptz";
    PostgresTypes2["timetz"] = "timetz";
    PostgresTypes2["tsrange"] = "tsrange";
    PostgresTypes2["tstzrange"] = "tstzrange";
  })(PostgresTypes || (PostgresTypes = {}));
  var convertChangeData = (columns, records, options2 = {}) => {
    let result = {};
    let skipTypes = typeof options2.skipTypes !== "undefined" ? options2.skipTypes : [];
    Object.entries(records).map(([key, value]) => {
      result[key] = convertColumn(key, columns, records, skipTypes);
    });
    return result;
  };
  var convertColumn = (columnName, columns, records, skipTypes) => {
    let column = columns.find((x) => x.name == columnName);
    if (!column || skipTypes.includes(column.type)) {
      return noop3(records[columnName]);
    } else {
      return convertCell(column.type, records[columnName]);
    }
  };
  var convertCell = (type, stringValue) => {
    try {
      if (stringValue === null)
        return null;
      if (type.charAt(0) === "_") {
        let arrayValue = type.slice(1, type.length);
        return toArray(stringValue, arrayValue);
      }
      switch (type) {
        case PostgresTypes.abstime:
          return noop3(stringValue);
        case PostgresTypes.bool:
          return toBoolean(stringValue);
        case PostgresTypes.date:
          return noop3(stringValue);
        case PostgresTypes.daterange:
          return toDateRange(stringValue);
        case PostgresTypes.float4:
          return toFloat(stringValue);
        case PostgresTypes.float8:
          return toFloat(stringValue);
        case PostgresTypes.int2:
          return toInt(stringValue);
        case PostgresTypes.int4:
          return toInt(stringValue);
        case PostgresTypes.int4range:
          return toIntRange(stringValue);
        case PostgresTypes.int8:
          return toInt(stringValue);
        case PostgresTypes.int8range:
          return toIntRange(stringValue);
        case PostgresTypes.json:
          return toJson(stringValue);
        case PostgresTypes.jsonb:
          return toJson(stringValue);
        case PostgresTypes.money:
          return toFloat(stringValue);
        case PostgresTypes.numeric:
          return toFloat(stringValue);
        case PostgresTypes.oid:
          return toInt(stringValue);
        case PostgresTypes.reltime:
          return noop3(stringValue);
        case PostgresTypes.time:
          return noop3(stringValue);
        case PostgresTypes.timestamp:
          return toTimestampString(stringValue);
        case PostgresTypes.timestamptz:
          return noop3(stringValue);
        case PostgresTypes.timetz:
          return noop3(stringValue);
        case PostgresTypes.tsrange:
          return toDateRange(stringValue);
        case PostgresTypes.tstzrange:
          return toDateRange(stringValue);
        default:
          return noop3(stringValue);
      }
    } catch (error3) {
      console.log(`Could not convert cell of type ${type} and value ${stringValue}`);
      console.log(`This is the error: ${error3}`);
      return stringValue;
    }
  };
  var noop3 = (stringValue) => {
    return stringValue;
  };
  var toBoolean = (stringValue) => {
    switch (stringValue) {
      case "t":
        return true;
      case "f":
        return false;
      default:
        return null;
    }
  };
  var toDate = (stringValue) => {
    return new Date(stringValue);
  };
  var toDateRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [new Date(arr[0]), new Date(arr[1])];
  };
  var toFloat = (stringValue) => {
    return parseFloat(stringValue);
  };
  var toInt = (stringValue) => {
    return parseInt(stringValue);
  };
  var toIntRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [parseInt(arr[0]), parseInt(arr[1])];
  };
  var toJson = (stringValue) => {
    return JSON.parse(stringValue);
  };
  var toArray = (stringValue, type) => {
    let stringEnriched = stringValue.slice(1, stringValue.length - 1);
    let stringArray = stringEnriched.length > 0 ? stringEnriched.split(",") : [];
    let array = stringArray.map((string) => {
      return convertCell(type, string);
    });
    return array;
  };
  var toTimestampString = (stringValue) => {
    return stringValue.replace(" ", "T");
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/constants.js
  var VSN = "1.0.0";
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var SOCKET_STATES;
  (function(SOCKET_STATES2) {
    SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
    SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
    SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
    SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
  })(SOCKET_STATES || (SOCKET_STATES = {}));
  var CHANNEL_STATES;
  (function(CHANNEL_STATES2) {
    CHANNEL_STATES2["closed"] = "closed";
    CHANNEL_STATES2["errored"] = "errored";
    CHANNEL_STATES2["joined"] = "joined";
    CHANNEL_STATES2["joining"] = "joining";
    CHANNEL_STATES2["leaving"] = "leaving";
  })(CHANNEL_STATES || (CHANNEL_STATES = {}));
  var CHANNEL_EVENTS;
  (function(CHANNEL_EVENTS2) {
    CHANNEL_EVENTS2["close"] = "phx_close";
    CHANNEL_EVENTS2["error"] = "phx_error";
    CHANNEL_EVENTS2["join"] = "phx_join";
    CHANNEL_EVENTS2["reply"] = "phx_reply";
    CHANNEL_EVENTS2["leave"] = "phx_leave";
  })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
  var TRANSPORTS;
  (function(TRANSPORTS2) {
    TRANSPORTS2["websocket"] = "websocket";
  })(TRANSPORTS || (TRANSPORTS = {}));

  // node_modules/@supabase/realtime-js/dist/module/lib/timer.js
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = void 0;
      this.tries = 0;
      this.callback = callback;
      this.timerCalc = timerCalc;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/push.js
  var Push = class {
    constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
      this.channel = channel;
      this.event = event;
      this.payload = payload;
      this.timeout = timeout;
      this.sent = false;
      this.timeoutTimer = void 0;
      this.ref = "";
      this.receivedResp = null;
      this.recHooks = [];
      this.refEvent = null;
    }
    resend(timeout) {
      this.timeout = timeout;
      this._cancelRefEvent();
      this.ref = "";
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
      this.send();
    }
    send() {
      if (this._hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref
      });
    }
    receive(status, callback) {
      var _a;
      if (this._hasReceived(status)) {
        callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        return;
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this._cancelRefEvent();
        this._cancelTimeout();
        this.receivedResp = payload;
        this._matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    trigger(status, response) {
      if (this.refEvent)
        this.channel.trigger(this.refEvent, { status, response });
    }
    _cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    _cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = void 0;
    }
    _matchReceive({ status, response }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js
  var RealtimeSubscription = class {
    constructor(topic, params = {}, socket) {
      this.topic = topic;
      this.params = params;
      this.socket = socket;
      this.bindings = [];
      this.state = CHANNEL_STATES.closed;
      this.joinedOnce = false;
      this.pushBuffer = [];
      this.timeout = this.socket.timeout;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.rejoinTimer = new Timer(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.isLeaving() || this.isClosed()) {
          return;
        }
        this.socket.log("channel", `error ${this.topic}`, reason);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.joinPush.receive("timeout", () => {
        if (!this.isJoining()) {
          return;
        }
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }
    subscribe(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
      } else {
        this.joinedOnce = true;
        this.rejoin(timeout);
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      this.bindings.push({ event, callback });
    }
    off(event) {
      this.bindings = this.bindings.filter((bind) => bind.event !== event);
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      if (!this.joinedOnce) {
        throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      }
      let pushEvent = new Push(this, event, payload, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    unsubscribe(timeout = this.timeout) {
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef());
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(event, payload, ref) {
      return payload;
    }
    isMember(topic) {
      return this.topic === topic;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    sendJoin(timeout) {
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.sendJoin(timeout);
    }
    trigger(event, payload, ref) {
      let { close, error: error3, leave, join } = CHANNEL_EVENTS;
      let events = [close, error3, leave, join];
      if (ref && events.indexOf(event) >= 0 && ref !== this.joinRef()) {
        return;
      }
      let handledPayload = this.onMessage(event, payload, ref);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }
      this.bindings.filter((bind) => {
        if (bind.event === "*") {
          return event === (payload === null || payload === void 0 ? void 0 : payload.type);
        } else {
          return bind.event === event;
        }
      }).map((bind) => bind.callback(handledPayload, ref));
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
  var import_websocket = __toModule(require_browser());
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var noop4 = () => {
  };
  var RealtimeClient = class {
    constructor(endPoint, options2) {
      this.channels = [];
      this.endPoint = "";
      this.headers = {};
      this.params = {};
      this.timeout = DEFAULT_TIMEOUT;
      this.transport = import_websocket.w3cwebsocket;
      this.heartbeatIntervalMs = 3e4;
      this.longpollerTimeout = 2e4;
      this.heartbeatTimer = void 0;
      this.pendingHeartbeatRef = null;
      this.ref = 0;
      this.logger = noop4;
      this.conn = null;
      this.sendBuffer = [];
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      if (options2 === null || options2 === void 0 ? void 0 : options2.params)
        this.params = options2.params;
      if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
        this.headers = options2.headers;
      if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
        this.timeout = options2.timeout;
      if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
        this.logger = options2.logger;
      if (options2 === null || options2 === void 0 ? void 0 : options2.transport)
        this.transport = options2.transport;
      if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
        this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
      if (options2 === null || options2 === void 0 ? void 0 : options2.longpollerTimeout)
        this.longpollerTimeout = options2.longpollerTimeout;
      this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
        return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
      };
      this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
        return callback(JSON.stringify(payload));
      };
      this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : (payload, callback) => {
        return callback(JSON.parse(payload));
      };
      this.reconnectTimer = new Timer(() => __awaiter5(this, void 0, void 0, function* () {
        yield this.disconnect();
        this.connect();
      }), this.reconnectAfterMs);
    }
    connect() {
      if (this.conn) {
        return;
      }
      this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
      if (this.conn) {
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error3) => this._onConnError(error3);
        this.conn.onmessage = (event) => this.onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
      }
    }
    disconnect(code, reason) {
      return new Promise((resolve2, _reject) => {
        try {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            if (code) {
              this.conn.close(code, reason || "");
            } else {
              this.conn.close();
            }
            this.conn = null;
          }
          resolve2({ error: null, data: true });
        } catch (error3) {
          resolve2({ error: error3, data: false });
        }
      });
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    onOpen(callback) {
      this.stateChangeCallbacks.open.push(callback);
    }
    onClose(callback) {
      this.stateChangeCallbacks.close.push(callback);
    }
    onError(callback) {
      this.stateChangeCallbacks.error.push(callback);
    }
    onMessage(callback) {
      this.stateChangeCallbacks.message.push(callback);
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    channel(topic, chanParams = {}) {
      let chan = new RealtimeSubscription(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      let { topic, event, payload, ref } = data;
      let callback = () => {
        this.encode(data, (result) => {
          var _a;
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
        });
      };
      this.log("push", `${topic} ${event} (${ref})`, payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
        }
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        this.channels.filter((channel) => channel.isMember(topic)).forEach((channel) => channel.trigger(event, payload, ref));
        this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
      });
    }
    endPointURL() {
      return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    _onConnOpen() {
      this.log("transport", `connected to ${this.endPointURL()}`);
      this._flushSendBuffer();
      this.reconnectTimer.reset();
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
      this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    _onConnClose(event) {
      this.log("transport", "close", event);
      this._triggerChanError();
      clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    _onConnError(error3) {
      this.log("transport", error3.message);
      this._triggerChanError();
      this.stateChangeCallbacks.error.forEach((callback) => callback(error3));
    }
    _triggerChanError() {
      this.channels.forEach((channel) => channel.trigger(CHANNEL_EVENTS.error));
    }
    _appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      const prefix = url.match(/\?/) ? "&" : "?";
      const query = new URLSearchParams(params);
      return `${url}${prefix}${query}`;
    }
    _flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    _sendHeartbeat() {
      var _a;
      if (!this.isConnected()) {
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      });
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js
  var SupabaseRealtimeClient = class {
    constructor(socket, schema, tableName) {
      const topic = tableName === "*" ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
      this.subscription = socket.channel(topic);
    }
    getPayloadRecords(payload) {
      const records = {
        new: {},
        old: {}
      };
      if (payload.type === "INSERT" || payload.type === "UPDATE") {
        records.new = transformers_exports.convertChangeData(payload.columns, payload.record);
      }
      if (payload.type === "UPDATE" || payload.type === "DELETE") {
        records.old = transformers_exports.convertChangeData(payload.columns, payload.old_record);
      }
      return records;
    }
    on(event, callback) {
      this.subscription.on(event, (payload) => {
        let enrichedPayload = {
          schema: payload.schema,
          table: payload.table,
          commit_timestamp: payload.commit_timestamp,
          eventType: payload.type,
          new: {},
          old: {}
        };
        enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
        callback(enrichedPayload);
      });
      return this;
    }
    subscribe(callback = () => {
    }) {
      this.subscription.onError((e) => callback("SUBSCRIPTION_ERROR", e));
      this.subscription.onClose(() => callback("CLOSED"));
      this.subscription.subscribe().receive("ok", () => callback("SUBSCRIBED")).receive("error", (e) => callback("SUBSCRIPTION_ERROR", e)).receive("timeout", () => callback("RETRYING_AFTER_TIMEOUT"));
      return this.subscription;
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js
  var SupabaseQueryBuilder = class extends PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, realtime, table }) {
      super(url, { headers, schema });
      this._subscription = new SupabaseRealtimeClient(realtime, schema, table);
      this._realtime = realtime;
    }
    on(event, callback) {
      if (!this._realtime.isConnected()) {
        this._realtime.connect();
      }
      return this._subscription.on(event, callback);
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
  var __awaiter6 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var DEFAULT_OPTIONS2 = {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    localStorage: globalThis.localStorage,
    headers: DEFAULT_HEADERS
  };
  var SupabaseClient = class {
    constructor(supabaseUrl, supabaseKey, options2) {
      this.supabaseUrl = supabaseUrl;
      this.supabaseKey = supabaseKey;
      if (!supabaseUrl)
        throw new Error("supabaseUrl is required.");
      if (!supabaseKey)
        throw new Error("supabaseKey is required.");
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS2), options2);
      this.restUrl = `${supabaseUrl}/rest/v1`;
      this.realtimeUrl = `${supabaseUrl}/realtime/v1`.replace("http", "ws");
      this.authUrl = `${supabaseUrl}/auth/v1`;
      this.schema = settings.schema;
      this.auth = this._initSupabaseAuthClient(settings);
      this.realtime = this._initRealtimeClient();
    }
    from(table) {
      const url = `${this.restUrl}/${table}`;
      return new SupabaseQueryBuilder(url, {
        headers: this._getAuthHeaders(),
        schema: this.schema,
        realtime: this.realtime,
        table
      });
    }
    rpc(fn, params) {
      const rest = this._initPostgRESTClient();
      return rest.rpc(fn, params);
    }
    removeSubscription(subscription) {
      return new Promise((resolve2) => __awaiter6(this, void 0, void 0, function* () {
        try {
          yield this._closeSubscription(subscription);
          const openSubscriptions = this.getSubscriptions().length;
          if (!openSubscriptions) {
            const { error: error3 } = yield this.realtime.disconnect();
            if (error3)
              return resolve2({ error: error3 });
          }
          return resolve2({ error: null, data: { openSubscriptions } });
        } catch (error3) {
          return resolve2({ error: error3 });
        }
      }));
    }
    _closeSubscription(subscription) {
      return __awaiter6(this, void 0, void 0, function* () {
        if (!subscription.isClosed()) {
          yield this._closeChannel(subscription);
        }
      });
    }
    getSubscriptions() {
      return this.realtime.channels;
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, localStorage }) {
      return new SupabaseAuthClient({
        url: this.authUrl,
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        },
        autoRefreshToken,
        persistSession,
        detectSessionInUrl,
        localStorage
      });
    }
    _initRealtimeClient() {
      return new RealtimeClient(this.realtimeUrl, {
        params: { apikey: this.supabaseKey }
      });
    }
    _initPostgRESTClient() {
      return new PostgrestClient(this.restUrl, {
        headers: this._getAuthHeaders(),
        schema: this.schema
      });
    }
    _getAuthHeaders() {
      var _a, _b;
      const headers = {};
      const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
      headers["apikey"] = this.supabaseKey;
      headers["Authorization"] = `Bearer ${authBearer}`;
      return headers;
    }
    _closeChannel(subscription) {
      return new Promise((resolve2, reject) => {
        subscription.unsubscribe().receive("ok", () => {
          this.realtime.remove(subscription);
          return resolve2(true);
        }).receive("error", (e) => reject(e));
      });
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/index.js
  var createClient = (supabaseUrl, supabaseKey, options2) => {
    return new SupabaseClient(supabaseUrl, supabaseKey, options2);
  };

  // .svelte-kit/output/server/app.js
  var css = {
    code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
    map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
  };
  var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { stores } = $$props;
    let { page } = $$props;
    let { components } = $$props;
    let { props_0 = null } = $$props;
    let { props_1 = null } = $$props;
    let { props_2 = null } = $$props;
    setContext("__svelte__", stores);
    afterUpdate(stores.page.notify);
    let mounted = false;
    let navigated = false;
    let title = null;
    onMount(() => {
      const unsubscribe = stores.page.subscribe(() => {
        if (mounted) {
          navigated = true;
          title = document.title || "untitled page";
        }
      });
      mounted = true;
      return unsubscribe;
    });
    if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
      $$bindings.stores(stores);
    if ($$props.page === void 0 && $$bindings.page && page !== void 0)
      $$bindings.page(page);
    if ($$props.components === void 0 && $$bindings.components && components !== void 0)
      $$bindings.components(components);
    if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
      $$bindings.props_0(props_0);
    if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
      $$bindings.props_1(props_1);
    if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
      $$bindings.props_2(props_2);
    $$result.css.add(css);
    {
      stores.page.set(page);
    }
    return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
      default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
      })}` : ``}`
    })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
  });
  function set_paths(paths) {
  }
  function set_prerendering(value) {
  }
  var user_hooks = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module"
  });
  var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
  var options = null;
  function init(settings) {
    set_paths(settings.paths);
    set_prerendering(settings.prerendering || false);
    options = {
      amp: false,
      dev: false,
      entry: {
        file: "/./_app/start-43be716e.js",
        css: ["/./_app/assets/start-a8cd1609.css"],
        js: ["/./_app/start-43be716e.js", "/./_app/chunks/vendor-dea40876.js"]
      },
      fetched: void 0,
      floc: false,
      get_component_path: (id) => "/./_app/" + entry_lookup[id],
      get_stack: (error22) => String(error22),
      handle_error: (error22) => {
        console.error(error22.stack);
        error22.stack = options.get_stack(error22);
      },
      hooks: get_hooks(user_hooks),
      hydrate: true,
      initiator: void 0,
      load_component,
      manifest,
      paths: settings.paths,
      read: settings.read,
      root: Root,
      router: true,
      ssr: true,
      target: "#svelte",
      template,
      trailing_slash: "never"
    };
  }
  var empty = () => ({});
  var manifest = {
    assets: [],
    layout: ".svelte-kit/build/components/layout.svelte",
    error: ".svelte-kit/build/components/error.svelte",
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: empty,
        a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
        b: [".svelte-kit/build/components/error.svelte"]
      }
    ]
  };
  var get_hooks = (hooks) => ({
    getSession: hooks.getSession || (() => ({})),
    handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request))
  });
  var module_lookup = {
    ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
      return layout;
    }),
    ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
      return error2;
    }),
    "src/routes/index.svelte": () => Promise.resolve().then(function() {
      return index;
    })
  };
  var metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "/./_app/layout.svelte-593ac114.js", "css": [], "js": ["/./_app/layout.svelte-593ac114.js", "/./_app/chunks/vendor-dea40876.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-b3f9eed6.js", "css": [], "js": ["/./_app/error.svelte-b3f9eed6.js", "/./_app/chunks/vendor-dea40876.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-f9fc05e5.js", "css": [], "js": ["/./_app/pages/index.svelte-f9fc05e5.js", "/./_app/chunks/vendor-dea40876.js"], "styles": null } };
  async function load_component(file) {
    return {
      module: await module_lookup[file](),
      ...metadata_lookup[file]
    };
  }
  init({ paths: { "base": "", "assets": "/." } });
  function render(request, {
    prerender
  } = {}) {
    const host = request.headers["host"];
    return respond({ ...request, host }, options, { prerender });
  }
  var Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return `${slots.default ? slots.default({}) : ``}`;
  });
  var layout = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Layout
  });
  function load$1({ error: error22, status }) {
    return { props: { error: error22, status } };
  }
  var Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { status } = $$props;
    let { error: error22 } = $$props;
    if ($$props.status === void 0 && $$bindings.status && status !== void 0)
      $$bindings.status(status);
    if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
      $$bindings.error(error22);
    return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
  });
  var error2 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Error2,
    load: load$1
  });
  var db = createClient("https://twctebskjmdrzcyvjpsf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzIwODg4OSwiZXhwIjoxOTM4Nzg0ODg5fQ.686wVEuMmcHA-_cOUMiv4vGkpzExNO7NVHWy7drJx14");
  async function load({ fetch: fetch4 }) {
    const { data: users, error: error22 } = await db.from("users").select();
    return { props: { users } };
  }
  var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { users = [] } = $$props;
    if ($$props.users === void 0 && $$bindings.users && users !== void 0)
      $$bindings.users(users);
    return `<h1 class="${"m-10 text-2xl"}">Welcome to SvelteKit</h1>
<p class="${"m-10"}">Visit <a class="${"text-blue-600 underline"}" href="${"https://kit.svelte.dev"}">kit.svelte.dev</a> to read the
  documentation</p>
${each(users, (u) => `<p>${escape2(u.id)}</p>`)}`;
  });
  var index = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Routes,
    load
  });

  // .svelte-kit/cloudflare-workers/entry.js
  var import_kv_asset_handler = __toModule(require_dist());
  addEventListener("fetch", (event) => {
    event.respondWith(handle(event));
  });
  async function handle(event) {
    if (event.request.method == "GET") {
      try {
        return await (0, import_kv_asset_handler.getAssetFromKV)(event);
      } catch (e) {
        if (!(e instanceof import_kv_asset_handler.NotFoundError)) {
          return new Response("Error loading static asset:" + (e.message || e.toString()), {
            status: 500
          });
        }
      }
    }
    const request = event.request;
    const request_url = new URL(request.url);
    try {
      const rendered = await render({
        host: request_url.host,
        path: request_url.pathname,
        query: request_url.searchParams,
        rawBody: request.body ? await read(request) : null,
        headers: Object.fromEntries(request.headers),
        method: request.method
      });
      if (rendered) {
        return new Response(rendered.body, {
          status: rendered.status,
          headers: rendered.headers
        });
      }
    } catch (e) {
      return new Response("Error rendering route:" + (e.message || e.toString()), { status: 500 });
    }
    return new Response({
      status: 404,
      statusText: "Not Found"
    });
  }
  async function read(request) {
    const type = request.headers.get("content-type") || "";
    if (type.includes("application/octet-stream")) {
      return new Uint8Array(await request.arrayBuffer());
    }
    return request.text();
  }
})();
