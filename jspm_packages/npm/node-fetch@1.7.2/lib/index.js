/* */ 
(function(Buffer, process) {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  const BUFFER = Symbol('buffer');
  const TYPE = Symbol('type');
  const CLOSED = Symbol('closed');
  class Blob {
    constructor() {
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Blob',
        writable: false,
        enumerable: false,
        configurable: true
      });
      this[CLOSED] = false;
      this[TYPE] = '';
      const blobParts = arguments[0];
      const options = arguments[1];
      const buffers = [];
      if (blobParts) {
        const a = blobParts;
        const length = Number(a.length);
        for (let i = 0; i < length; i++) {
          const element = a[i];
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === 'string' ? element : String(element));
          }
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      let type = options && options.type !== undefined && String(options.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }
    get size() {
      return this[CLOSED] ? 0 : this[BUFFER].length;
    }
    get type() {
      return this[TYPE];
    }
    get isClosed() {
      return this[CLOSED];
    }
    slice() {
      const size = this.size;
      const start = arguments[0];
      const end = arguments[1];
      let relativeStart,
          relativeEnd;
      if (start === undefined) {
        relativeStart = 0;
      } else if (start < 0) {
        relativeStart = Math.max(size + start, 0);
      } else {
        relativeStart = Math.min(start, size);
      }
      if (end === undefined) {
        relativeEnd = size;
      } else if (end < 0) {
        relativeEnd = Math.max(size + end, 0);
      } else {
        relativeEnd = Math.min(end, size);
      }
      const span = Math.max(relativeEnd - relativeStart, 0);
      const buffer = this[BUFFER];
      const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
      const blob = new Blob([], {type: arguments[2]});
      blob[BUFFER] = slicedBuffer;
      blob[CLOSED] = this[CLOSED];
      return blob;
    }
    close() {
      this[CLOSED] = true;
    }
  }
  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: 'BlobPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = 'FetchError';
  const Stream = require('stream');
  var _require$1 = require('stream');
  const PassThrough$1 = _require$1.PassThrough;
  const DISTURBED = Symbol('disturbed');
  let convert;
  try {
    convert = require('encoding').convert;
  } catch (e) {}
  function Body(body) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$size = _ref.size;
    let size = _ref$size === undefined ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (typeof body === 'string') {} else if (isURLSearchParams(body)) {} else if (body instanceof Blob) {} else if (Buffer.isBuffer(body)) {} else if (body instanceof Stream) {} else {
      body = String(body);
    }
    this.body = body;
    this[DISTURBED] = false;
    this.size = size;
    this.timeout = timeout;
  }
  Body.prototype = {
    get bodyUsed() {
      return this[DISTURBED];
    },
    arrayBuffer() {
      return consumeBody.call(this).then(function(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob() {
      let ct = this.headers && this.headers.get('content-type') || '';
      return consumeBody.call(this).then(function(buf) {
        return Object.assign(new Blob([], {type: ct.toLowerCase()}), {[BUFFER]: buf});
      });
    },
    json() {
      var _this = this;
      return consumeBody.call(this).then(function(buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError(`invalid json response body at ${_this.url} reason: ${err.message}`, 'invalid-json'));
        }
      });
    },
    text() {
      return consumeBody.call(this).then(function(buffer) {
        return buffer.toString();
      });
    },
    buffer() {
      return consumeBody.call(this);
    },
    textConverted() {
      var _this2 = this;
      return consumeBody.call(this).then(function(buffer) {
        return convertBody(buffer, _this2.headers);
      });
    }
  };
  Body.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (!(name in proto)) {
        const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
        Object.defineProperty(proto, name, desc);
      }
    }
  };
  function consumeBody(body) {
    var _this3 = this;
    if (this[DISTURBED]) {
      return Body.Promise.reject(new Error(`body used already for: ${this.url}`));
    }
    this[DISTURBED] = true;
    if (this.body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    if (typeof this.body === 'string') {
      return Body.Promise.resolve(Buffer.from(this.body));
    }
    if (this.body instanceof Blob) {
      return Body.Promise.resolve(this.body[BUFFER]);
    }
    if (Buffer.isBuffer(this.body)) {
      return Body.Promise.resolve(this.body);
    }
    if (!(this.body instanceof Stream)) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body.Promise(function(resolve, reject) {
      let resTimeout;
      if (_this3.timeout) {
        resTimeout = setTimeout(function() {
          abort = true;
          reject(new FetchError(`Response timeout while trying to fetch ${_this3.url} (over ${_this3.timeout}ms)`, 'body-timeout'));
        }, _this3.timeout);
      }
      _this3.body.on('error', function(err) {
        reject(new FetchError(`Invalid response body while trying to fetch ${_this3.url}: ${err.message}`, 'system', err));
      });
      _this3.body.on('data', function(chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this3.size && accumBytes + chunk.length > _this3.size) {
          abort = true;
          reject(new FetchError(`content size at ${_this3.url} over limit: ${_this3.size}`, 'max-size'));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      _this3.body.on('end', function() {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        resolve(Buffer.concat(accum));
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== 'function') {
      throw new Error('The package `encoding` must be installed to use the textConverted() function');
    }
    const ct = headers.get('content-type');
    let charset = 'utf-8';
    let res,
        str;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === 'gb2312' || charset === 'gbk') {
        charset = 'gb18030';
      }
    }
    return convert(buffer, 'UTF-8', charset).toString();
  }
  function isURLSearchParams(obj) {
    if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
      return false;
    }
    return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
  }
  function clone(instance) {
    let p1,
        p2;
    let body = instance.body;
    if (instance.bodyUsed) {
      throw new Error('cannot clone body after it is used');
    }
    if (body instanceof Stream && typeof body.getBoundary !== 'function') {
      p1 = new PassThrough$1();
      p2 = new PassThrough$1();
      body.pipe(p1);
      body.pipe(p2);
      instance.body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType(instance) {
    const body = instance.body;
    if (body === null) {
      return null;
    } else if (typeof body === 'string') {
      return 'text/plain;charset=UTF-8';
    } else if (isURLSearchParams(body)) {
      return 'application/x-www-form-urlencoded;charset=UTF-8';
    } else if (body instanceof Blob) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (typeof body.getBoundary === 'function') {
      return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else {
      return null;
    }
  }
  function getTotalBytes(instance) {
    const body = instance.body;
    if (body === null) {
      return 0;
    } else if (typeof body === 'string') {
      return Buffer.byteLength(body);
    } else if (isURLSearchParams(body)) {
      return Buffer.byteLength(String(body));
    } else if (body instanceof Blob) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === 'function') {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream(dest, instance) {
    const body = instance.body;
    if (body === null) {
      dest.end();
    } else if (typeof body === 'string') {
      dest.write(body);
      dest.end();
    } else if (isURLSearchParams(body)) {
      dest.write(Buffer.from(String(body)));
      dest.end();
    } else if (body instanceof Blob) {
      dest.write(body[BUFFER]);
      dest.end();
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body.Promise = global.Promise;
  function isValidTokenChar(ch) {
    if (ch >= 94 && ch <= 122)
      return true;
    if (ch >= 65 && ch <= 90)
      return true;
    if (ch === 45)
      return true;
    if (ch >= 48 && ch <= 57)
      return true;
    if (ch === 34 || ch === 40 || ch === 41 || ch === 44)
      return false;
    if (ch >= 33 && ch <= 46)
      return true;
    if (ch === 124 || ch === 126)
      return true;
    return false;
  }
  function checkIsHttpToken(val) {
    if (typeof val !== 'string' || val.length === 0)
      return false;
    if (!isValidTokenChar(val.charCodeAt(0)))
      return false;
    const len = val.length;
    if (len > 1) {
      if (!isValidTokenChar(val.charCodeAt(1)))
        return false;
      if (len > 2) {
        if (!isValidTokenChar(val.charCodeAt(2)))
          return false;
        if (len > 3) {
          if (!isValidTokenChar(val.charCodeAt(3)))
            return false;
          for (var i = 4; i < len; i++) {
            if (!isValidTokenChar(val.charCodeAt(i)))
              return false;
          }
        }
      }
    }
    return true;
  }
  function checkInvalidHeaderChar(val) {
    val += '';
    if (val.length < 1)
      return false;
    var c = val.charCodeAt(0);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    if (val.length < 2)
      return false;
    c = val.charCodeAt(1);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    if (val.length < 3)
      return false;
    c = val.charCodeAt(2);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    for (var i = 3; i < val.length; ++i) {
      c = val.charCodeAt(i);
      if (c <= 31 && c !== 9 || c > 255 || c === 127)
        return true;
    }
    return false;
  }
  function sanitizeName(name) {
    name += '';
    if (!checkIsHttpToken(name)) {
      throw new TypeError(`${name} is not a legal HTTP header name`);
    }
    return name.toLowerCase();
  }
  function sanitizeValue(value) {
    value += '';
    if (checkInvalidHeaderChar(value)) {
      throw new TypeError(`${value} is not a legal HTTP header value`);
    }
    return value;
  }
  const MAP = Symbol('map');
  class Headers {
    constructor() {
      let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      this[MAP] = Object.create(null);
      if (init instanceof Headers) {
        const rawHeaders = init.raw();
        const headerNames = Object.keys(rawHeaders);
        for (const headerName of headerNames) {
          for (const value of rawHeaders[headerName]) {
            this.append(headerName, value);
          }
        }
        return;
      }
      if (init == null) {} else if (typeof init === 'object') {
        const method = init[Symbol.iterator];
        if (method != null) {
          if (typeof method !== 'function') {
            throw new TypeError('Header pairs must be iterable');
          }
          const pairs = [];
          for (const pair of init) {
            if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
              throw new TypeError('Each header pair must be iterable');
            }
            pairs.push(Array.from(pair));
          }
          for (const pair of pairs) {
            if (pair.length !== 2) {
              throw new TypeError('Each header pair must be a name/value tuple');
            }
            this.append(pair[0], pair[1]);
          }
        } else {
          for (const key of Object.keys(init)) {
            const value = init[key];
            this.append(key, value);
          }
        }
      } else {
        throw new TypeError('Provided initializer must be an object');
      }
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Headers',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    get(name) {
      const list = this[MAP][sanitizeName(name)];
      if (!list) {
        return null;
      }
      return list.join(', ');
    }
    forEach(callback) {
      let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      let pairs = getHeaderPairs(this);
      let i = 0;
      while (i < pairs.length) {
        var _pairs$i = pairs[i];
        const name = _pairs$i[0],
            value = _pairs$i[1];
        callback.call(thisArg, value, name, this);
        pairs = getHeaderPairs(this);
        i++;
      }
    }
    set(name, value) {
      this[MAP][sanitizeName(name)] = [sanitizeValue(value)];
    }
    append(name, value) {
      if (!this.has(name)) {
        this.set(name, value);
        return;
      }
      this[MAP][sanitizeName(name)].push(sanitizeValue(value));
    }
    has(name) {
      return !!this[MAP][sanitizeName(name)];
    }
    delete(name) {
      delete this[MAP][sanitizeName(name)];
    }
    raw() {
      return this[MAP];
    }
    keys() {
      return createHeadersIterator(this, 'key');
    }
    values() {
      return createHeadersIterator(this, 'value');
    }
    [Symbol.iterator]() {
      return createHeadersIterator(this, 'key+value');
    }
  }
  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: 'HeadersPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function getHeaderPairs(headers, kind) {
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === 'key' ? function(k) {
      return [k];
    } : function(k) {
      return [k, headers.get(k)];
    });
  }
  const INTERNAL = Symbol('internal');
  function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  }
  const HeadersIteratorPrototype = Object.setPrototypeOf({next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError('Value of `this` is not a HeadersIterator');
      }
      var _INTERNAL = this[INTERNAL];
      const target = _INTERNAL.target,
          kind = _INTERNAL.kind,
          index = _INTERNAL.index;
      const values = getHeaderPairs(target, kind);
      const len = values.length;
      if (index >= len) {
        return {
          value: undefined,
          done: true
        };
      }
      const pair = values[index];
      this[INTERNAL].index = index + 1;
      let result;
      if (kind === 'key') {
        result = pair[0];
      } else if (kind === 'value') {
        result = pair[1];
      } else {
        result = pair;
      }
      return {
        value: result,
        done: false
      };
    }}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: 'HeadersIterator',
    writable: false,
    enumerable: false,
    configurable: true
  });
  var _require$2 = require('http');
  const STATUS_CODES = _require$2.STATUS_CODES;
  class Response {
    constructor() {
      let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Body.call(this, body, opts);
      this.url = opts.url;
      this.status = opts.status || 200;
      this.statusText = opts.statusText || STATUS_CODES[this.status];
      this.headers = new Headers(opts.headers);
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Response',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    get ok() {
      return this.status >= 200 && this.status < 300;
    }
    clone() {
      return new Response(clone(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok
      });
    }
  }
  Body.mixIn(Response.prototype);
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: 'ResponsePrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  var _require$3 = require('url');
  const format_url = _require$3.format;
  const parse_url = _require$3.parse;
  const PARSED_URL = Symbol('url');
  class Request {
    constructor(input) {
      let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let parsedURL;
      if (!(input instanceof Request)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url(`${input}`);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      let method = init.method || input.method || 'GET';
      if ((init.body != null || input instanceof Request && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
        throw new TypeError('Request with GET/HEAD method cannot have body');
      }
      let inputBody = init.body != null ? init.body : input instanceof Request && input.body !== null ? clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      this.method = method.toUpperCase();
      this.redirect = init.redirect || input.redirect || 'follow';
      this.headers = new Headers(init.headers || input.headers || {});
      if (init.body != null) {
        const contentType = extractContentType(this);
        if (contentType !== null && !this.headers.has('Content-Type')) {
          this.headers.append('Content-Type', contentType);
        }
      }
      this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
      this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
      this[PARSED_URL] = parsedURL;
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Request',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    get url() {
      return format_url(this[PARSED_URL]);
    }
    clone() {
      return new Request(this);
    }
  }
  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: 'RequestPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function getNodeRequestOptions(request) {
    const parsedURL = request[PARSED_URL];
    const headers = new Headers(request.headers);
    if (!headers.has('Accept')) {
      headers.set('Accept', '*/*');
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError('Only absolute URLs are supported');
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError('Only HTTP(S) protocols are supported');
    }
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = '0';
    }
    if (request.body != null) {
      const totalBytes = getTotalBytes(request);
      if (typeof totalBytes === 'number') {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set('Content-Length', contentLengthValue);
    }
    if (!headers.has('User-Agent')) {
      headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
    }
    if (request.compress) {
      headers.set('Accept-Encoding', 'gzip,deflate');
    }
    if (!headers.has('Connection') && !request.agent) {
      headers.set('Connection', 'close');
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: headers.raw(),
      agent: request.agent
    });
  }
  const http = require('http');
  const https = require('https');
  var _require = require('stream');
  const PassThrough = _require.PassThrough;
  var _require2 = require('url');
  const resolve_url = _require2.resolve;
  const zlib = require('zlib');
  function fetch(url, opts) {
    if (!fetch.Promise) {
      throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
    }
    Body.Promise = fetch.Promise;
    return new fetch.Promise(function(resolve, reject) {
      const request = new Request(url, opts);
      const options = getNodeRequestOptions(request);
      const send = (options.protocol === 'https:' ? https : http).request;
      if (options.headers.host) {
        options.headers.host = options.headers.host[0];
      }
      const req = send(options);
      let reqTimeout;
      if (request.timeout) {
        req.once('socket', function(socket) {
          reqTimeout = setTimeout(function() {
            req.abort();
            reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
          }, request.timeout);
        });
      }
      req.on('error', function(err) {
        clearTimeout(reqTimeout);
        reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
      });
      req.on('response', function(res) {
        clearTimeout(reqTimeout);
        if (fetch.isRedirect(res.statusCode) && request.redirect !== 'manual') {
          if (request.redirect === 'error') {
            reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
            return;
          }
          if (request.counter >= request.follow) {
            reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
            return;
          }
          if (!res.headers.location) {
            reject(new FetchError(`redirect location header missing at: ${request.url}`, 'invalid-redirect'));
            return;
          }
          if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
            request.method = 'GET';
            request.body = null;
            request.headers.delete('content-length');
          }
          request.counter++;
          resolve(fetch(resolve_url(request.url, res.headers.location), request));
          return;
        }
        const headers = new Headers();
        for (const name of Object.keys(res.headers)) {
          if (Array.isArray(res.headers[name])) {
            for (const val of res.headers[name]) {
              headers.append(name, val);
            }
          } else {
            headers.append(name, res.headers[name]);
          }
        }
        if (request.redirect === 'manual' && headers.has('location')) {
          headers.set('location', resolve_url(request.url, headers.get('location')));
        }
        let body = res.pipe(new PassThrough());
        const response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: headers,
          size: request.size,
          timeout: request.timeout
        };
        const codings = headers.get('Content-Encoding');
        if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          resolve(new Response(body, response_options));
          return;
        }
        const zlibOptions = {
          flush: zlib.Z_SYNC_FLUSH,
          finishFlush: zlib.Z_SYNC_FLUSH
        };
        if (codings == 'gzip' || codings == 'x-gzip') {
          body = body.pipe(zlib.createGunzip(zlibOptions));
          resolve(new Response(body, response_options));
          return;
        }
        if (codings == 'deflate' || codings == 'x-deflate') {
          const raw = res.pipe(new PassThrough());
          raw.once('data', function(chunk) {
            if ((chunk[0] & 0x0F) === 0x08) {
              body = body.pipe(zlib.createInflate());
            } else {
              body = body.pipe(zlib.createInflateRaw());
            }
            resolve(new Response(body, response_options));
          });
          return;
        }
        resolve(new Response(body, response_options));
      });
      writeToStream(req, request);
    });
  }
  fetch.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch.Promise = global.Promise;
  module.exports = exports = fetch;
  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.FetchError = FetchError;
})(require('buffer').Buffer, require('process'));
