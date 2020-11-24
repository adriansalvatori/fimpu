import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, b as space, t as text, h as claim_element, j as children, c as detach_dev, f as claim_space, k as claim_text, l as attr_dev, n as add_location, o as insert_dev, p as append_dev, r as listen_dev, u as noop, z as run_all } from './client.e4ec623b.js';

/*! @vimeo/player v2.14.1 | (c) 2020 Vimeo | MIT License | https://github.com/vimeo/player.js */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @module lib/functions
 */

/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */

/* global global */
var isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */

function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }

  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
/**
 * Check to see if the object is a DOM Element.
 *
 * @param {*} element The object to check.
 * @return {boolean}
 */

function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
}
/**
 * Check to see whether the value is a number.
 *
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */

function isInteger(value) {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */

function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */

function getVimeoUrl() {
  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = oEmbedParameters.id;
  var url = oEmbedParameters.url;
  var idOrUrl = id || url;

  if (!idOrUrl) {
    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
  }

  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }

  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace('http:', 'https:');
  }

  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }

  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*!
 * weakmap-polyfill v2.0.1 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2020 Polygon Planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (self) {

  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var defineProperty = function (object, name, value) {
    if (Object.defineProperty) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = function () {
    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


    defineProperty(WeakMap.prototype, 'delete', function (key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

    defineProperty(WeakMap.prototype, 'get', function (key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

    defineProperty(WeakMap.prototype, 'has', function (key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

    defineProperty(WeakMap.prototype, 'set', function (key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }

      defineProperty(key, this._id, [key, value]);
      return this;
    });

    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }

    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  }();

  function isObject(x) {
    return Object(x) === x;
  }
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

var npo_src = createCommonjsModule(function (module) {
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function UMD(name, context, definition) {
  // special form of UMD for polyfilling across evironments
  context[name] = context[name] || definition();

  if ( module.exports) {
    module.exports = context[name];
  }
})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {

  var builtInProp,
      cycle,
      scheduling_queue,
      ToString = Object.prototype.toString,
      timer = typeof setImmediate != "undefined" ? function timer(fn) {
    return setImmediate(fn);
  } : setTimeout; // dammit, IE8.

  try {
    Object.defineProperty({}, "x", {});

    builtInProp = function builtInProp(obj, name, val, config) {
      return Object.defineProperty(obj, name, {
        value: val,
        writable: true,
        configurable: config !== false
      });
    };
  } catch (err) {
    builtInProp = function builtInProp(obj, name, val) {
      obj[name] = val;
      return obj;
    };
  } // Note: using a queue instead of array for efficiency


  scheduling_queue = function Queue() {
    var first, last, item;

    function Item(fn, self) {
      this.fn = fn;
      this.self = self;
      this.next = void 0;
    }

    return {
      add: function add(fn, self) {
        item = new Item(fn, self);

        if (last) {
          last.next = item;
        } else {
          first = item;
        }

        last = item;
        item = void 0;
      },
      drain: function drain() {
        var f = first;
        first = last = cycle = void 0;

        while (f) {
          f.fn.call(f.self);
          f = f.next;
        }
      }
    };
  }();

  function schedule(fn, self) {
    scheduling_queue.add(fn, self);

    if (!cycle) {
      cycle = timer(scheduling_queue.drain);
    }
  } // promise duck typing


  function isThenable(o) {
    var _then,
        o_type = typeof o;

    if (o != null && (o_type == "object" || o_type == "function")) {
      _then = o.then;
    }

    return typeof _then == "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }

    this.chain.length = 0;
  } // NOTE: This is a separate function to isolate
  // the `try..catch` so that other code can be
  // optimized better


  function notifyIsolated(self, cb, chain) {
    var ret, _then;

    try {
      if (cb === false) {
        chain.reject(self.msg);
      } else {
        if (cb === true) {
          ret = self.msg;
        } else {
          ret = cb.call(void 0, self.msg);
        }

        if (ret === chain.promise) {
          chain.reject(TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then,
        self = this; // already triggered?


    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    try {
      if (_then = isThenable(msg)) {
        schedule(function () {
          var def_wrapper = new MakeDefWrapper(self);

          try {
            _then.call(msg, function $resolve$() {
              resolve.apply(def_wrapper, arguments);
            }, function $reject$() {
              reject.apply(def_wrapper, arguments);
            });
          } catch (err) {
            reject.call(def_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;

        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDefWrapper(self), err);
    }
  }

  function reject(msg) {
    var self = this; // already triggered?

    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    self.msg = msg;
    self.state = 2;

    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }

  function MakeDefWrapper(self) {
    this.def = self;
    this.triggered = false;
  }

  function MakeDef(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = void 0;
  }

  function Promise(executor) {
    if (typeof executor != "function") {
      throw TypeError("Not a function");
    }

    if (this.__NPO__ !== 0) {
      throw TypeError("Not a promise");
    } // instance shadowing the inherited "brand"
    // to signal an already "initialized" promise


    this.__NPO__ = 1;
    var def = new MakeDef(this);

    this["then"] = function then(success, failure) {
      var o = {
        success: typeof success == "function" ? success : true,
        failure: typeof failure == "function" ? failure : false
      }; // Note: `then(..)` itself can be borrowed to be used against
      // a different promise constructor for making the chained promise,
      // by substituting a different `this` binding.

      o.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        o.resolve = resolve;
        o.reject = reject;
      });
      def.chain.push(o);

      if (def.state !== 0) {
        schedule(notify, def);
      }

      return o.promise;
    };

    this["catch"] = function $catch$(failure) {
      return this.then(void 0, failure);
    };

    try {
      executor.call(void 0, function publicResolve(msg) {
        resolve.call(def, msg);
      }, function publicReject(msg) {
        reject.call(def, msg);
      });
    } catch (err) {
      reject.call(def, err);
    }
  }

  var PromisePrototype = builtInProp({}, "constructor", Promise,
  /*configurable=*/
  false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

  Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

  builtInProp(PromisePrototype, "__NPO__", 0,
  /*configurable=*/
  false);
  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
    var Constructor = this; // spec mandated checks
    // note: best "isPromise" check that's practical for now

    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
      return msg;
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      resolve(msg);
    });
  });
  builtInProp(Promise, "reject", function Promise$reject(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      reject(msg);
    });
  });
  builtInProp(Promise, "all", function Promise$all(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    if (arr.length === 0) {
      return Constructor.resolve([]);
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      var len = arr.length,
          msgs = Array(len),
          count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;

        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  builtInProp(Promise, "race", function Promise$race(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  return Promise;
});
});

/**
 * @module lib/callbacks
 */
var callbackMap = new WeakMap();
/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */

function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */

function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
/**
 * Remove a stored callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */

function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!playerCallbacks[name]) {
    return true;
  } // If no callback is passed, remove all callbacks for the event


  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }

  var index = playerCallbacks[name].indexOf(callback);

  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }

  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */

function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);

  if (playerCallbacks.length < 1) {
    return false;
  }

  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
/**
 * Move callbacks associated with an element to another element.
 *
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */

function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}

/**
 * @module lib/embed
 */
var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */

function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return oEmbedParameters.reduce(function (params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));

    if (value || value === '') {
      params[param] = value === '' ? 1 : value;
    }

    return params;
  }, defaults);
}
/**
 * Create an embed from oEmbed data inside an element.
 *
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */

function createEmbed(_ref, element) {
  var html = _ref.html;

  if (!element) {
    throw new TypeError('An element must be provided');
  }

  if (element.getAttribute('data-vimeo-initialized') !== null) {
    return element.querySelector('iframe');
  }

  var div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute('data-vimeo-initialized', 'true');
  return element.querySelector('iframe');
}
/**
 * Make an oEmbed call for the specified URL.
 *
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @param {HTMLElement} element The element.
 * @return {Promise}
 */

function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }

    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }

    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }

      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }

      try {
        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

        if (json.domain_status_code === 403) {
          // We still want to create the embed to give users visual feedback
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = function () {
      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };

    xhr.send();
  });
}
/**
 * Initialize all embeds within a specific element
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

  var handleError = function handleError(error) {
    if ('console' in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };

  elements.forEach(function (element) {
    try {
      // Skip any that have data-vimeo-defer
      if (element.getAttribute('data-vimeo-defer') !== null) {
        return;
      }

      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function (data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
/**
 * Resize embeds when messaged by the player.
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  // Prevent execution if users include the player.js script multiple times.
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }

  window.VimeoPlayerResizeEmbeds_ = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    } // 'spacechange' is fired only on embeds with cards


    if (!event.data || event.data.event !== 'spacechange') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      } // Change padding-bottom of the enclosing div to accommodate
      // card carousel without distorting aspect ratio


      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };

  window.addEventListener('message', onMessage);
}

/**
 * @module lib/postmessage
 */
/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */

function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {};
    }
  }

  return data;
}
/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */

function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }

  var message = {
    method: method
  };

  if (params !== undefined) {
    message.value = params;
  } // IE 8 and 9 do not support passing messages, so stringify them


  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }

  player.element.contentWindow.postMessage(message, player.origin);
}
/**
 * Parse the data received from a message event.
 *
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */

function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;

  if (data.event) {
    if (data.event === 'error') {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function (promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
        removeCallback(player, data.data.method, promise);
      });
    }

    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);

    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }

  callbacks.forEach(function (callback) {
    try {
      if (typeof callback === 'function') {
        callback.call(player, param);
        return;
      }

      callback.resolve(param);
    } catch (e) {// empty
    }
  });
}

/* MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Terms */
function initializeScreenfull() {
  var fn = function () {
    var val;
    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];

      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }

        return ret;
      }
    }

    return false;
  }();

  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull = {
    request: function request(element) {
      return new Promise(function (resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered() {
          screenfull.off('fullscreenchange', onFullScreenEntered);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function (resolve, reject) {
        if (!screenfull.isFullscreen) {
          resolve();
          return;
        }

        var onFullScreenExit = function onFullScreenExit() {
          screenfull.off('fullscreenchange', onFullScreenExit);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull;
}

var playerMap = new WeakMap();
var readyMap = new WeakMap();
var screenfull = {};

var Player = /*#__PURE__*/function () {
  /**
   * Create a Player.
   *
   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
   *        player iframe, and id, or a jQuery object.
   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
   * @return {Player}
   */
  function Player(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Player);

    /* global jQuery */
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn('A jQuery object with multiple elements was passed, using the first element.');
      }

      element = element[0];
    } // Find an element by ID


    if (typeof document !== 'undefined' && typeof element === 'string') {
      element = document.getElementById(element);
    } // Not an element!


    if (!isDomElement(element)) {
      throw new TypeError('You must pass either a valid element or a valid id.');
    } // Already initialized an embed in this div, so grab the iframe


    if (element.nodeName !== 'IFRAME') {
      var iframe = element.querySelector('iframe');

      if (iframe) {
        element = iframe;
      }
    } // iframe url is not a Vimeo url


    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
      throw new Error('The player element passed isn’t a Vimeo embed.');
    } // If there is already a player object in the map, return that


    if (playerMap.has(element)) {
      return playerMap.get(element);
    }

    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = '*';
    var readyPromise = new npo_src(function (resolve, reject) {
      _this._onMessage = function (event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }

        if (_this.origin === '*') {
          _this.origin = event.origin;
        }

        var data = parseMessageData(event.data);
        var isError = data && data.event === 'error';
        var isReadyError = isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }

        var isReadyEvent = data && data.event === 'ready';
        var isPingResponse = data && data.method === 'ping';

        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute('data-ready', 'true');

          resolve();
          return;
        }

        processData(_this, data);
      };

      _this._window.addEventListener('message', _this._onMessage);

      if (_this.element.nodeName !== 'IFRAME') {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
          // but store reference to the original element

          _this.element = iframe;
          _this._originalElement = element;
          swapCallbacks(element, iframe);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    }); // Store a copy of this Player in the map

    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
    // the player is already ready.

    if (this.element.nodeName === 'IFRAME') {
      postMessage(this, 'ping');
    }

    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen() {
        return screenfull.exit();
      };

      screenfull.on('fullscreenchange', function () {
        if (screenfull.isFullscreen) {
          storeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } else {
          removeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } // eslint-disable-next-line


        _this.ready().then(function () {
          postMessage(_this, 'fullscreenchange', screenfull.isFullscreen);
        });
      });
    }

    return this;
  }
  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */


  _createClass(Player, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new npo_src(function (resolve, reject) {
        // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return
        return _this2.ready().then(function () {
          storeCallback(_this2, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return

        return _this3.ready().then(function () {
          storeCallback(_this3, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'set');

        if (value === undefined || value === null) {
          throw new TypeError('There must be a value to set.');
        } // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return


        return _this4.ready().then(function () {
          storeCallback(_this4, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (!callback) {
        throw new TypeError('You must pass a callback function.');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var callbacks = getCallbacks(this, "event:".concat(eventName));

      if (callbacks.length === 0) {
        this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }

      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (callback && typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

      if (lastCallback) {
        this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id successfully loaded.
     * @reject {TypeError} The id was not a number.
     */

    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|object} options The id of the video or an object with embed options.
     * @return {LoadVideoPromise}
     */

  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod('loadVideo', options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */

    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */

  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
        reject(new Error('Unknown player. Probably unloaded.'));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.callMethod('addCuePoint', {
        time: time,
        data: data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */

  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod('removeCuePoint', id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */

    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */

    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */

  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError('You must pass a language.');
      }

      return this.callMethod('enableTextTrack', {
        language: language,
        kind: kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */

    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */

  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod('disableTextTrack');
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */

    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */

  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod('pause');
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */

    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */

  }, {
    key: "play",
    value: function play() {
      return this.callMethod('play');
    }
    /**
     * Request that the player enters fullscreen.
     * @return {Promise}
     */

  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }

      return this.callMethod('requestFullscreen');
    }
    /**
     * Request that the player exits fullscreen.
     * @return {Promise}
     */

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }

      return this.callMethod('exitFullscreen');
    }
    /**
     * Returns true if the player is currently fullscreen.
     * @return {Promise}
     */

  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }

      return this.get('fullscreen');
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */

    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */

  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod('unload');
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new npo_src(function (resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);

        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);

          _this5._originalElement.removeAttribute('data-vimeo-initialized');
        }

        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
          _this5.element.parentNode.removeChild(_this5.element);
        } // If the clip is private there is a case where the element stays the
        // div element. Destroy should reset the div and remove the iframe child.


        if (_this5.element && _this5.element.nodeName === 'DIV' && _this5.element.parentNode) {
          _this5.element.removeAttribute('data-vimeo-initialized');

          var iframe = _this5.element.querySelector('iframe');

          if (iframe && iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }

        _this5._window.removeEventListener('message', _this5._onMessage);

        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */

  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get('autopause');
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */

  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set('autopause', autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */

    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */

  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get('buffered');
    }
    /**
     * @typedef {Object} CameraProperties
     * @prop {number} props.yaw - Number between 0 and 360.
     * @prop {number} props.pitch - Number between -90 and 90.
     * @prop {number} props.roll - Number between -180 and 180.
     * @prop {number} props.fov - The field of view in degrees.
     */

    /**
     * A promise to get the camera properties of the player.
     *
     * @promise GetCameraPromise
     * @fulfill {CameraProperties} The camera properties.
     */

    /**
     * For 360° videos get the camera properties for this player.
     *
     * @return {GetCameraPromise}
     */

  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get('cameraProps');
    }
    /**
     * A promise to set the camera properties of the player.
     *
     * @promise SetCameraPromise
     * @fulfill {Object} The camera was successfully set.
     * @reject {RangeError} The range was out of bounds.
     */

    /**
     * For 360° videos set the camera properties for this player.
     *
     * @param {CameraProperties} camera The camera properties
     * @return {SetCameraPromise}
     */

  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set('cameraProps', camera);
    }
    /**
     * A representation of a chapter.
     *
     * @typedef {Object} VimeoChapter
     * @property {number} startTime The start time of the chapter.
     * @property {object} title The title of the chapter.
     * @property {number} index The place in the order of Chapters. Starts at 1.
     */

    /**
     * A promise to get chapters for the video.
     *
     * @promise GetChaptersPromise
     * @fulfill {VimeoChapter[]} The chapters for the video.
     */

    /**
     * Get an array of all the chapters for the video.
     *
     * @return {GetChaptersPromise}
     */

  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get('chapters');
    }
    /**
     * A promise to get the currently active chapter.
     *
     * @promise GetCurrentChaptersPromise
     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
     */

    /**
     * Get the currently active chapter for the video.
     *
     * @return {GetCurrentChaptersPromise}
     */

  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get('currentChapter');
    }
    /**
     * A promise to get the color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */

    /**
     * Get the color for this player.
     *
     * @return {GetColorPromise}
     */

  }, {
    key: "getColor",
    value: function getColor() {
      return this.get('color');
    }
    /**
     * A promise to set the color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */

    /**
     * Set the color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set('color', color);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */

    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */

  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get('cuePoints');
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */

    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get('currentTime');
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */

    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set('currentTime', currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */

    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */

    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */

  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get('ended');
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */

    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get('loop');
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */

    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */

  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set('loop', loop);
    }
    /**
     * A promise to set the muted state of the player.
     *
     * @promise SetMutedPromise
     * @fulfill {boolean} The muted state that was set.
     */

    /**
     * Set the muted state of the player. When set to `true`, the player
     * volume will be muted.
     *
     * @param {boolean} muted
     * @return {SetMutedPromise}
     */

  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set('muted', muted);
    }
    /**
     * A promise to get the muted state of the player.
     *
     * @promise GetMutedPromise
     * @fulfill {boolean} Whether or not the player is muted.
     */

    /**
     * Get the muted state of the player.
     *
     * @return {GetMutedPromise}
     */

  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get('muted');
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */

    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get('paused');
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
     */

    /**
     * Get the playback rate of the player on a scale from `0.5` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get('playbackRate');
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
     */

    /**
     * Set the playback rate of the player on a scale from `0.5` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set('playbackRate', playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */

    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */

  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get('played');
    }
    /**
     * A promise to get the qualities available of the current video.
     *
     * @promise GetQualitiesPromise
     * @fulfill {Array} The qualities of the video.
     */

    /**
     * Get the qualities of the current video.
     *
     * @return {GetQualitiesPromise}
     */

  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get('qualities');
    }
    /**
     * A promise to get the current set quality of the video.
     *
     * @promise GetQualityPromise
     * @fulfill {string} The current set quality.
     */

    /**
     * Get the current set quality of the video.
     *
     * @return {GetQualityPromise}
     */

  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get('quality');
    }
    /**
     * A promise to set the video quality.
     *
     * @promise SetQualityPromise
     * @fulfill {number} The quality was set.
     * @reject {RangeError} The quality is not available.
     */

    /**
     * Set a video quality.
     *
     * @param {string} quality
     * @return {SetQualityPromise}
     */

  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set('quality', quality);
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */

    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */

  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get('seekable');
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */

    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */

  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get('seeking');
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */

    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */

  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get('textTracks');
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */

    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */

  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get('videoEmbedCode');
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */

    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */

  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get('videoId');
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */

    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */

  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get('videoTitle');
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */

    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */

  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get('videoWidth');
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */

    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */

  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get('videoHeight');
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */

    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */

  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get('videoUrl');
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */

    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get('volume');
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */

    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set('volume', volume);
    }
  }]);

  return Player;
}(); // Setup embed only if this is not a node environment


if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
}

/* src\components\Agenda.svelte generated by Svelte v3.23.0 */

const file = "src\\components\\Agenda.svelte";

function create_fragment(ctx) {
	let div28;
	let div0;
	let t0;
	let div27;
	let div26;
	let div25;
	let div8;
	let div7;
	let article0;
	let div1;
	let figure0;
	let i0;
	let t1;
	let div6;
	let div4;
	let strong0;
	let t2;
	let t3;
	let br0;
	let t4;
	let div2;
	let span0;
	let i1;
	let t5;
	let small0;
	let t6;
	let t7;
	let div3;
	let span1;
	let i2;
	let t8;
	let small1;
	let t9;
	let t10;
	let div5;
	let strong1;
	let t11;
	let t12;
	let ul0;
	let li0;
	let t13;
	let t14;
	let li1;
	let t15;
	let t16;
	let li2;
	let t17;
	let t18;
	let strong2;
	let t19;
	let t20;
	let ul1;
	let li3;
	let t21;
	let t22;
	let li4;
	let t23;
	let t24;
	let div16;
	let div15;
	let article1;
	let div9;
	let figure1;
	let i3;
	let t25;
	let div14;
	let div12;
	let strong3;
	let t26;
	let t27;
	let br1;
	let t28;
	let div10;
	let span2;
	let i4;
	let t29;
	let small2;
	let t30;
	let t31;
	let div11;
	let span3;
	let i5;
	let t32;
	let small3;
	let t33;
	let t34;
	let div13;
	let strong4;
	let t35;
	let t36;
	let ul2;
	let li5;
	let t37;
	let t38;
	let li6;
	let t39;
	let t40;
	let li7;
	let t41;
	let t42;
	let strong5;
	let t43;
	let t44;
	let ul3;
	let li8;
	let t45;
	let t46;
	let li9;
	let t47;
	let t48;
	let div24;
	let div23;
	let article2;
	let div17;
	let figure2;
	let i6;
	let t49;
	let div22;
	let div20;
	let strong6;
	let t50;
	let t51;
	let br2;
	let t52;
	let div18;
	let span4;
	let i7;
	let t53;
	let small4;
	let t54;
	let t55;
	let div19;
	let span5;
	let i8;
	let t56;
	let small5;
	let t57;
	let t58;
	let div21;
	let strong7;
	let t59;
	let t60;
	let ul4;
	let li10;
	let t61;
	let t62;
	let li11;
	let t63;
	let t64;
	let li12;
	let t65;
	let t66;
	let strong8;
	let t67;
	let t68;
	let ul5;
	let li13;
	let t69;
	let t70;
	let li14;
	let t71;
	let t72;
	let button;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div28 = element("div");
			div0 = element("div");
			t0 = space();
			div27 = element("div");
			div26 = element("div");
			div25 = element("div");
			div8 = element("div");
			div7 = element("div");
			article0 = element("article");
			div1 = element("div");
			figure0 = element("figure");
			i0 = element("i");
			t1 = space();
			div6 = element("div");
			div4 = element("div");
			strong0 = element("strong");
			t2 = text("Actos Protocolarios - Instalación");
			t3 = space();
			br0 = element("br");
			t4 = space();
			div2 = element("div");
			span0 = element("span");
			i1 = element("i");
			t5 = space();
			small0 = element("small");
			t6 = text("9:00am");
			t7 = space();
			div3 = element("div");
			span1 = element("span");
			i2 = element("i");
			t8 = space();
			small1 = element("small");
			t9 = text("Auditorio Principal");
			t10 = space();
			div5 = element("div");
			strong1 = element("strong");
			t11 = text("Apertura del foro:");
			t12 = space();
			ul0 = element("ul");
			li0 = element("li");
			t13 = text("Iván Duque Márquez");
			t14 = space();
			li1 = element("li");
			t15 = text("Presidente de la República de Colombia");
			t16 = space();
			li2 = element("li");
			t17 = text("CO");
			t18 = space();
			strong2 = element("strong");
			t19 = text("Apertura del foro:");
			t20 = space();
			ul1 = element("ul");
			li3 = element("li");
			t21 = text("Karen Abudinen");
			t22 = space();
			li4 = element("li");
			t23 = text("Ministra TIC");
			t24 = space();
			div16 = element("div");
			div15 = element("div");
			article1 = element("article");
			div9 = element("div");
			figure1 = element("figure");
			i3 = element("i");
			t25 = space();
			div14 = element("div");
			div12 = element("div");
			strong3 = element("strong");
			t26 = text("Actos Protocolarios - Instalación");
			t27 = space();
			br1 = element("br");
			t28 = space();
			div10 = element("div");
			span2 = element("span");
			i4 = element("i");
			t29 = space();
			small2 = element("small");
			t30 = text("9:00am");
			t31 = space();
			div11 = element("div");
			span3 = element("span");
			i5 = element("i");
			t32 = space();
			small3 = element("small");
			t33 = text("Auditorio Principal");
			t34 = space();
			div13 = element("div");
			strong4 = element("strong");
			t35 = text("Apertura del foro:");
			t36 = space();
			ul2 = element("ul");
			li5 = element("li");
			t37 = text("Iván Duque Márquez");
			t38 = space();
			li6 = element("li");
			t39 = text("Presidente de la República de Colombia");
			t40 = space();
			li7 = element("li");
			t41 = text("CO");
			t42 = space();
			strong5 = element("strong");
			t43 = text("Apertura del foro:");
			t44 = space();
			ul3 = element("ul");
			li8 = element("li");
			t45 = text("Karen Abudinen");
			t46 = space();
			li9 = element("li");
			t47 = text("Ministra TIC");
			t48 = space();
			div24 = element("div");
			div23 = element("div");
			article2 = element("article");
			div17 = element("div");
			figure2 = element("figure");
			i6 = element("i");
			t49 = space();
			div22 = element("div");
			div20 = element("div");
			strong6 = element("strong");
			t50 = text("Actos Protocolarios - Instalación");
			t51 = space();
			br2 = element("br");
			t52 = space();
			div18 = element("div");
			span4 = element("span");
			i7 = element("i");
			t53 = space();
			small4 = element("small");
			t54 = text("9:00am");
			t55 = space();
			div19 = element("div");
			span5 = element("span");
			i8 = element("i");
			t56 = space();
			small5 = element("small");
			t57 = text("Auditorio Principal");
			t58 = space();
			div21 = element("div");
			strong7 = element("strong");
			t59 = text("Apertura del foro:");
			t60 = space();
			ul4 = element("ul");
			li10 = element("li");
			t61 = text("Iván Duque Márquez");
			t62 = space();
			li11 = element("li");
			t63 = text("Presidente de la República de Colombia");
			t64 = space();
			li12 = element("li");
			t65 = text("CO");
			t66 = space();
			strong8 = element("strong");
			t67 = text("Apertura del foro:");
			t68 = space();
			ul5 = element("ul");
			li13 = element("li");
			t69 = text("Karen Abudinen");
			t70 = space();
			li14 = element("li");
			t71 = text("Ministra TIC");
			t72 = space();
			button = element("button");
			this.h();
		},
		l: function claim(nodes) {
			div28 = claim_element(nodes, "DIV", { id: true, class: true });
			var div28_nodes = children(div28);
			div0 = claim_element(div28_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t0 = claim_space(div28_nodes);
			div27 = claim_element(div28_nodes, "DIV", { class: true });
			var div27_nodes = children(div27);
			div26 = claim_element(div27_nodes, "DIV", { class: true });
			var div26_nodes = children(div26);
			div25 = claim_element(div26_nodes, "DIV", { class: true });
			var div25_nodes = children(div25);
			div8 = claim_element(div25_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			div7 = claim_element(div8_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			article0 = claim_element(div7_nodes, "ARTICLE", { class: true });
			var article0_nodes = children(article0);
			div1 = claim_element(article0_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			figure0 = claim_element(div1_nodes, "FIGURE", { class: true });
			var figure0_nodes = children(figure0);
			i0 = claim_element(figure0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			figure0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t1 = claim_space(article0_nodes);
			div6 = claim_element(article0_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div4 = claim_element(div6_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			strong0 = claim_element(div4_nodes, "STRONG", { class: true });
			var strong0_nodes = children(strong0);
			t2 = claim_text(strong0_nodes, "Actos Protocolarios - Instalación");
			strong0_nodes.forEach(detach_dev);
			t3 = claim_space(div4_nodes);
			br0 = claim_element(div4_nodes, "BR", {});
			t4 = claim_space(div4_nodes);
			div2 = claim_element(div4_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			span0 = claim_element(div2_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i1 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			t5 = claim_space(div2_nodes);
			small0 = claim_element(div2_nodes, "SMALL", {});
			var small0_nodes = children(small0);
			t6 = claim_text(small0_nodes, "9:00am");
			small0_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t7 = claim_space(div4_nodes);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			span1 = claim_element(div3_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			i2 = claim_element(span1_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span1_nodes.forEach(detach_dev);
			t8 = claim_space(div3_nodes);
			small1 = claim_element(div3_nodes, "SMALL", {});
			var small1_nodes = children(small1);
			t9 = claim_text(small1_nodes, "Auditorio Principal");
			small1_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t10 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			strong1 = claim_element(div5_nodes, "STRONG", {});
			var strong1_nodes = children(strong1);
			t11 = claim_text(strong1_nodes, "Apertura del foro:");
			strong1_nodes.forEach(detach_dev);
			t12 = claim_space(div5_nodes);
			ul0 = claim_element(div5_nodes, "UL", {});
			var ul0_nodes = children(ul0);
			li0 = claim_element(ul0_nodes, "LI", {});
			var li0_nodes = children(li0);
			t13 = claim_text(li0_nodes, "Iván Duque Márquez");
			li0_nodes.forEach(detach_dev);
			t14 = claim_space(ul0_nodes);
			li1 = claim_element(ul0_nodes, "LI", {});
			var li1_nodes = children(li1);
			t15 = claim_text(li1_nodes, "Presidente de la República de Colombia");
			li1_nodes.forEach(detach_dev);
			t16 = claim_space(ul0_nodes);
			li2 = claim_element(ul0_nodes, "LI", {});
			var li2_nodes = children(li2);
			t17 = claim_text(li2_nodes, "CO");
			li2_nodes.forEach(detach_dev);
			ul0_nodes.forEach(detach_dev);
			t18 = claim_space(div5_nodes);
			strong2 = claim_element(div5_nodes, "STRONG", {});
			var strong2_nodes = children(strong2);
			t19 = claim_text(strong2_nodes, "Apertura del foro:");
			strong2_nodes.forEach(detach_dev);
			t20 = claim_space(div5_nodes);
			ul1 = claim_element(div5_nodes, "UL", {});
			var ul1_nodes = children(ul1);
			li3 = claim_element(ul1_nodes, "LI", {});
			var li3_nodes = children(li3);
			t21 = claim_text(li3_nodes, "Karen Abudinen");
			li3_nodes.forEach(detach_dev);
			t22 = claim_space(ul1_nodes);
			li4 = claim_element(ul1_nodes, "LI", {});
			var li4_nodes = children(li4);
			t23 = claim_text(li4_nodes, "Ministra TIC");
			li4_nodes.forEach(detach_dev);
			ul1_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			article0_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			div8_nodes.forEach(detach_dev);
			t24 = claim_space(div25_nodes);
			div16 = claim_element(div25_nodes, "DIV", { class: true });
			var div16_nodes = children(div16);
			div15 = claim_element(div16_nodes, "DIV", { class: true });
			var div15_nodes = children(div15);
			article1 = claim_element(div15_nodes, "ARTICLE", { class: true });
			var article1_nodes = children(article1);
			div9 = claim_element(article1_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);
			figure1 = claim_element(div9_nodes, "FIGURE", { class: true });
			var figure1_nodes = children(figure1);
			i3 = claim_element(figure1_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			figure1_nodes.forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			t25 = claim_space(article1_nodes);
			div14 = claim_element(article1_nodes, "DIV", { class: true });
			var div14_nodes = children(div14);
			div12 = claim_element(div14_nodes, "DIV", { class: true });
			var div12_nodes = children(div12);
			strong3 = claim_element(div12_nodes, "STRONG", { class: true });
			var strong3_nodes = children(strong3);
			t26 = claim_text(strong3_nodes, "Actos Protocolarios - Instalación");
			strong3_nodes.forEach(detach_dev);
			t27 = claim_space(div12_nodes);
			br1 = claim_element(div12_nodes, "BR", {});
			t28 = claim_space(div12_nodes);
			div10 = claim_element(div12_nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			span2 = claim_element(div10_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i4 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i4).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			t29 = claim_space(div10_nodes);
			small2 = claim_element(div10_nodes, "SMALL", {});
			var small2_nodes = children(small2);
			t30 = claim_text(small2_nodes, "9:00am");
			small2_nodes.forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			t31 = claim_space(div12_nodes);
			div11 = claim_element(div12_nodes, "DIV", { class: true });
			var div11_nodes = children(div11);
			span3 = claim_element(div11_nodes, "SPAN", { class: true });
			var span3_nodes = children(span3);
			i5 = claim_element(span3_nodes, "I", { "data-feather": true });
			children(i5).forEach(detach_dev);
			span3_nodes.forEach(detach_dev);
			t32 = claim_space(div11_nodes);
			small3 = claim_element(div11_nodes, "SMALL", {});
			var small3_nodes = children(small3);
			t33 = claim_text(small3_nodes, "Auditorio Principal");
			small3_nodes.forEach(detach_dev);
			div11_nodes.forEach(detach_dev);
			div12_nodes.forEach(detach_dev);
			t34 = claim_space(div14_nodes);
			div13 = claim_element(div14_nodes, "DIV", { class: true });
			var div13_nodes = children(div13);
			strong4 = claim_element(div13_nodes, "STRONG", {});
			var strong4_nodes = children(strong4);
			t35 = claim_text(strong4_nodes, "Apertura del foro:");
			strong4_nodes.forEach(detach_dev);
			t36 = claim_space(div13_nodes);
			ul2 = claim_element(div13_nodes, "UL", {});
			var ul2_nodes = children(ul2);
			li5 = claim_element(ul2_nodes, "LI", {});
			var li5_nodes = children(li5);
			t37 = claim_text(li5_nodes, "Iván Duque Márquez");
			li5_nodes.forEach(detach_dev);
			t38 = claim_space(ul2_nodes);
			li6 = claim_element(ul2_nodes, "LI", {});
			var li6_nodes = children(li6);
			t39 = claim_text(li6_nodes, "Presidente de la República de Colombia");
			li6_nodes.forEach(detach_dev);
			t40 = claim_space(ul2_nodes);
			li7 = claim_element(ul2_nodes, "LI", {});
			var li7_nodes = children(li7);
			t41 = claim_text(li7_nodes, "CO");
			li7_nodes.forEach(detach_dev);
			ul2_nodes.forEach(detach_dev);
			t42 = claim_space(div13_nodes);
			strong5 = claim_element(div13_nodes, "STRONG", {});
			var strong5_nodes = children(strong5);
			t43 = claim_text(strong5_nodes, "Apertura del foro:");
			strong5_nodes.forEach(detach_dev);
			t44 = claim_space(div13_nodes);
			ul3 = claim_element(div13_nodes, "UL", {});
			var ul3_nodes = children(ul3);
			li8 = claim_element(ul3_nodes, "LI", {});
			var li8_nodes = children(li8);
			t45 = claim_text(li8_nodes, "Karen Abudinen");
			li8_nodes.forEach(detach_dev);
			t46 = claim_space(ul3_nodes);
			li9 = claim_element(ul3_nodes, "LI", {});
			var li9_nodes = children(li9);
			t47 = claim_text(li9_nodes, "Ministra TIC");
			li9_nodes.forEach(detach_dev);
			ul3_nodes.forEach(detach_dev);
			div13_nodes.forEach(detach_dev);
			div14_nodes.forEach(detach_dev);
			article1_nodes.forEach(detach_dev);
			div15_nodes.forEach(detach_dev);
			div16_nodes.forEach(detach_dev);
			t48 = claim_space(div25_nodes);
			div24 = claim_element(div25_nodes, "DIV", { class: true });
			var div24_nodes = children(div24);
			div23 = claim_element(div24_nodes, "DIV", { class: true });
			var div23_nodes = children(div23);
			article2 = claim_element(div23_nodes, "ARTICLE", { class: true });
			var article2_nodes = children(article2);
			div17 = claim_element(article2_nodes, "DIV", { class: true });
			var div17_nodes = children(div17);
			figure2 = claim_element(div17_nodes, "FIGURE", { class: true });
			var figure2_nodes = children(figure2);
			i6 = claim_element(figure2_nodes, "I", { "data-feather": true });
			children(i6).forEach(detach_dev);
			figure2_nodes.forEach(detach_dev);
			div17_nodes.forEach(detach_dev);
			t49 = claim_space(article2_nodes);
			div22 = claim_element(article2_nodes, "DIV", { class: true });
			var div22_nodes = children(div22);
			div20 = claim_element(div22_nodes, "DIV", { class: true });
			var div20_nodes = children(div20);
			strong6 = claim_element(div20_nodes, "STRONG", { class: true });
			var strong6_nodes = children(strong6);
			t50 = claim_text(strong6_nodes, "Actos Protocolarios - Instalación");
			strong6_nodes.forEach(detach_dev);
			t51 = claim_space(div20_nodes);
			br2 = claim_element(div20_nodes, "BR", {});
			t52 = claim_space(div20_nodes);
			div18 = claim_element(div20_nodes, "DIV", { class: true });
			var div18_nodes = children(div18);
			span4 = claim_element(div18_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i7 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i7).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			t53 = claim_space(div18_nodes);
			small4 = claim_element(div18_nodes, "SMALL", {});
			var small4_nodes = children(small4);
			t54 = claim_text(small4_nodes, "9:00am");
			small4_nodes.forEach(detach_dev);
			div18_nodes.forEach(detach_dev);
			t55 = claim_space(div20_nodes);
			div19 = claim_element(div20_nodes, "DIV", { class: true });
			var div19_nodes = children(div19);
			span5 = claim_element(div19_nodes, "SPAN", { class: true });
			var span5_nodes = children(span5);
			i8 = claim_element(span5_nodes, "I", { "data-feather": true });
			children(i8).forEach(detach_dev);
			span5_nodes.forEach(detach_dev);
			t56 = claim_space(div19_nodes);
			small5 = claim_element(div19_nodes, "SMALL", {});
			var small5_nodes = children(small5);
			t57 = claim_text(small5_nodes, "Auditorio Principal");
			small5_nodes.forEach(detach_dev);
			div19_nodes.forEach(detach_dev);
			div20_nodes.forEach(detach_dev);
			t58 = claim_space(div22_nodes);
			div21 = claim_element(div22_nodes, "DIV", { class: true });
			var div21_nodes = children(div21);
			strong7 = claim_element(div21_nodes, "STRONG", {});
			var strong7_nodes = children(strong7);
			t59 = claim_text(strong7_nodes, "Apertura del foro:");
			strong7_nodes.forEach(detach_dev);
			t60 = claim_space(div21_nodes);
			ul4 = claim_element(div21_nodes, "UL", {});
			var ul4_nodes = children(ul4);
			li10 = claim_element(ul4_nodes, "LI", {});
			var li10_nodes = children(li10);
			t61 = claim_text(li10_nodes, "Iván Duque Márquez");
			li10_nodes.forEach(detach_dev);
			t62 = claim_space(ul4_nodes);
			li11 = claim_element(ul4_nodes, "LI", {});
			var li11_nodes = children(li11);
			t63 = claim_text(li11_nodes, "Presidente de la República de Colombia");
			li11_nodes.forEach(detach_dev);
			t64 = claim_space(ul4_nodes);
			li12 = claim_element(ul4_nodes, "LI", {});
			var li12_nodes = children(li12);
			t65 = claim_text(li12_nodes, "CO");
			li12_nodes.forEach(detach_dev);
			ul4_nodes.forEach(detach_dev);
			t66 = claim_space(div21_nodes);
			strong8 = claim_element(div21_nodes, "STRONG", {});
			var strong8_nodes = children(strong8);
			t67 = claim_text(strong8_nodes, "Apertura del foro:");
			strong8_nodes.forEach(detach_dev);
			t68 = claim_space(div21_nodes);
			ul5 = claim_element(div21_nodes, "UL", {});
			var ul5_nodes = children(ul5);
			li13 = claim_element(ul5_nodes, "LI", {});
			var li13_nodes = children(li13);
			t69 = claim_text(li13_nodes, "Karen Abudinen");
			li13_nodes.forEach(detach_dev);
			t70 = claim_space(ul5_nodes);
			li14 = claim_element(ul5_nodes, "LI", {});
			var li14_nodes = children(li14);
			t71 = claim_text(li14_nodes, "Ministra TIC");
			li14_nodes.forEach(detach_dev);
			ul5_nodes.forEach(detach_dev);
			div21_nodes.forEach(detach_dev);
			div22_nodes.forEach(detach_dev);
			article2_nodes.forEach(detach_dev);
			div23_nodes.forEach(detach_dev);
			div24_nodes.forEach(detach_dev);
			div25_nodes.forEach(detach_dev);
			div26_nodes.forEach(detach_dev);
			div27_nodes.forEach(detach_dev);
			t72 = claim_space(div28_nodes);
			button = claim_element(div28_nodes, "BUTTON", { class: true, "aria-label": true });
			children(button).forEach(detach_dev);
			div28_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "modal-background");
			add_location(div0, file, 1, 4, 49);
			attr_dev(i0, "data-feather", "calendar");
			add_location(i0, file, 10, 36, 521);
			attr_dev(figure0, "class", "image is-64x64");
			add_location(figure0, file, 9, 32, 452);
			attr_dev(div1, "class", "media-left has-text-primary");
			add_location(div1, file, 8, 28, 377);
			attr_dev(strong0, "class", "has-text-primary has-margin-bottom-10");
			add_location(strong0, file, 15, 36, 802);
			add_location(br0, file, 16, 36, 936);
			attr_dev(i1, "data-feather", "clock");
			add_location(i1, file, 18, 68, 1100);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 18, 40, 1072);
			add_location(small0, file, 19, 40, 1178);
			attr_dev(div2, "class", "button is-small is-primary is-outlined");
			add_location(div2, file, 17, 36, 978);
			attr_dev(i2, "data-feather", "users");
			add_location(i2, file, 22, 68, 1400);
			attr_dev(span1, "class", "icon is-small");
			add_location(span1, file, 22, 40, 1372);
			add_location(small1, file, 23, 40, 1478);
			attr_dev(div3, "class", "button is-small is-link is-outlined");
			add_location(div3, file, 21, 36, 1281);
			attr_dev(div4, "class", "content has-margin-bottom-20");
			add_location(div4, file, 14, 32, 722);
			add_location(strong1, file, 27, 37, 1699);
			add_location(li0, file, 29, 44, 1826);
			add_location(li1, file, 30, 44, 1899);
			add_location(li2, file, 31, 44, 1992);
			add_location(ul0, file, 28, 40, 1776);
			add_location(strong2, file, 33, 40, 2092);
			add_location(li3, file, 35, 44, 2219);
			add_location(li4, file, 36, 44, 2288);
			add_location(ul1, file, 34, 40, 2169);
			attr_dev(div5, "class", "content is-small");
			add_location(div5, file, 26, 32, 1630);
			attr_dev(div6, "class", "media-content");
			add_location(div6, file, 13, 28, 661);
			attr_dev(article0, "class", "media");
			add_location(article0, file, 7, 24, 324);
			attr_dev(div7, "class", "box");
			add_location(div7, file, 6, 20, 281);
			attr_dev(div8, "class", "column is-one-third");
			add_location(div8, file, 5, 16, 226);
			attr_dev(i3, "data-feather", "calendar");
			add_location(i3, file, 48, 36, 2833);
			attr_dev(figure1, "class", "image is-64x64");
			add_location(figure1, file, 47, 32, 2764);
			attr_dev(div9, "class", "media-left has-text-primary");
			add_location(div9, file, 46, 28, 2689);
			attr_dev(strong3, "class", "has-text-primary has-margin-bottom-10");
			add_location(strong3, file, 53, 36, 3114);
			add_location(br1, file, 54, 36, 3248);
			attr_dev(i4, "data-feather", "clock");
			add_location(i4, file, 56, 68, 3412);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 56, 40, 3384);
			add_location(small2, file, 57, 40, 3490);
			attr_dev(div10, "class", "button is-small is-primary is-outlined");
			add_location(div10, file, 55, 36, 3290);
			attr_dev(i5, "data-feather", "users");
			add_location(i5, file, 60, 68, 3712);
			attr_dev(span3, "class", "icon is-small");
			add_location(span3, file, 60, 40, 3684);
			add_location(small3, file, 61, 40, 3790);
			attr_dev(div11, "class", "button is-small is-link is-outlined");
			add_location(div11, file, 59, 36, 3593);
			attr_dev(div12, "class", "content has-margin-bottom-20");
			add_location(div12, file, 52, 32, 3034);
			add_location(strong4, file, 65, 37, 4011);
			add_location(li5, file, 67, 44, 4138);
			add_location(li6, file, 68, 44, 4211);
			add_location(li7, file, 69, 44, 4304);
			add_location(ul2, file, 66, 40, 4088);
			add_location(strong5, file, 71, 40, 4404);
			add_location(li8, file, 73, 44, 4531);
			add_location(li9, file, 74, 44, 4600);
			add_location(ul3, file, 72, 40, 4481);
			attr_dev(div13, "class", "content is-small");
			add_location(div13, file, 64, 32, 3942);
			attr_dev(div14, "class", "media-content");
			add_location(div14, file, 51, 28, 2973);
			attr_dev(article1, "class", "media");
			add_location(article1, file, 45, 24, 2636);
			attr_dev(div15, "class", "box");
			add_location(div15, file, 44, 20, 2593);
			attr_dev(div16, "class", "column is-one-third");
			add_location(div16, file, 43, 16, 2538);
			attr_dev(i6, "data-feather", "calendar");
			add_location(i6, file, 86, 36, 5145);
			attr_dev(figure2, "class", "image is-64x64");
			add_location(figure2, file, 85, 32, 5076);
			attr_dev(div17, "class", "media-left has-text-primary");
			add_location(div17, file, 84, 28, 5001);
			attr_dev(strong6, "class", "has-text-primary has-margin-bottom-10");
			add_location(strong6, file, 91, 36, 5426);
			add_location(br2, file, 92, 36, 5560);
			attr_dev(i7, "data-feather", "clock");
			add_location(i7, file, 94, 68, 5724);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 94, 40, 5696);
			add_location(small4, file, 95, 40, 5802);
			attr_dev(div18, "class", "button is-small is-primary is-outlined");
			add_location(div18, file, 93, 36, 5602);
			attr_dev(i8, "data-feather", "users");
			add_location(i8, file, 98, 68, 6024);
			attr_dev(span5, "class", "icon is-small");
			add_location(span5, file, 98, 40, 5996);
			add_location(small5, file, 99, 40, 6102);
			attr_dev(div19, "class", "button is-small is-link is-outlined");
			add_location(div19, file, 97, 36, 5905);
			attr_dev(div20, "class", "content has-margin-bottom-20");
			add_location(div20, file, 90, 32, 5346);
			add_location(strong7, file, 103, 37, 6323);
			add_location(li10, file, 105, 44, 6450);
			add_location(li11, file, 106, 44, 6523);
			add_location(li12, file, 107, 44, 6616);
			add_location(ul4, file, 104, 40, 6400);
			add_location(strong8, file, 109, 40, 6716);
			add_location(li13, file, 111, 44, 6843);
			add_location(li14, file, 112, 44, 6912);
			add_location(ul5, file, 110, 40, 6793);
			attr_dev(div21, "class", "content is-small");
			add_location(div21, file, 102, 32, 6254);
			attr_dev(div22, "class", "media-content");
			add_location(div22, file, 89, 28, 5285);
			attr_dev(article2, "class", "media");
			add_location(article2, file, 83, 24, 4948);
			attr_dev(div23, "class", "box");
			add_location(div23, file, 82, 20, 4905);
			attr_dev(div24, "class", "column is-one-third");
			add_location(div24, file, 81, 16, 4850);
			attr_dev(div25, "class", "columns");
			add_location(div25, file, 4, 12, 187);
			attr_dev(div26, "class", "container");
			add_location(div26, file, 3, 8, 150);
			attr_dev(div27, "class", "modal-content svelte-1fn1srg");
			add_location(div27, file, 2, 4, 113);
			attr_dev(button, "class", "modal-close is-large");
			attr_dev(button, "aria-label", "close");
			add_location(button, file, 122, 4, 7198);
			attr_dev(div28, "id", "agenda-interactiva");
			attr_dev(div28, "class", "modal");
			add_location(div28, file, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div28, anchor);
			append_dev(div28, div0);
			append_dev(div28, t0);
			append_dev(div28, div27);
			append_dev(div27, div26);
			append_dev(div26, div25);
			append_dev(div25, div8);
			append_dev(div8, div7);
			append_dev(div7, article0);
			append_dev(article0, div1);
			append_dev(div1, figure0);
			append_dev(figure0, i0);
			append_dev(article0, t1);
			append_dev(article0, div6);
			append_dev(div6, div4);
			append_dev(div4, strong0);
			append_dev(strong0, t2);
			append_dev(div4, t3);
			append_dev(div4, br0);
			append_dev(div4, t4);
			append_dev(div4, div2);
			append_dev(div2, span0);
			append_dev(span0, i1);
			append_dev(div2, t5);
			append_dev(div2, small0);
			append_dev(small0, t6);
			append_dev(div4, t7);
			append_dev(div4, div3);
			append_dev(div3, span1);
			append_dev(span1, i2);
			append_dev(div3, t8);
			append_dev(div3, small1);
			append_dev(small1, t9);
			append_dev(div6, t10);
			append_dev(div6, div5);
			append_dev(div5, strong1);
			append_dev(strong1, t11);
			append_dev(div5, t12);
			append_dev(div5, ul0);
			append_dev(ul0, li0);
			append_dev(li0, t13);
			append_dev(ul0, t14);
			append_dev(ul0, li1);
			append_dev(li1, t15);
			append_dev(ul0, t16);
			append_dev(ul0, li2);
			append_dev(li2, t17);
			append_dev(div5, t18);
			append_dev(div5, strong2);
			append_dev(strong2, t19);
			append_dev(div5, t20);
			append_dev(div5, ul1);
			append_dev(ul1, li3);
			append_dev(li3, t21);
			append_dev(ul1, t22);
			append_dev(ul1, li4);
			append_dev(li4, t23);
			append_dev(div25, t24);
			append_dev(div25, div16);
			append_dev(div16, div15);
			append_dev(div15, article1);
			append_dev(article1, div9);
			append_dev(div9, figure1);
			append_dev(figure1, i3);
			append_dev(article1, t25);
			append_dev(article1, div14);
			append_dev(div14, div12);
			append_dev(div12, strong3);
			append_dev(strong3, t26);
			append_dev(div12, t27);
			append_dev(div12, br1);
			append_dev(div12, t28);
			append_dev(div12, div10);
			append_dev(div10, span2);
			append_dev(span2, i4);
			append_dev(div10, t29);
			append_dev(div10, small2);
			append_dev(small2, t30);
			append_dev(div12, t31);
			append_dev(div12, div11);
			append_dev(div11, span3);
			append_dev(span3, i5);
			append_dev(div11, t32);
			append_dev(div11, small3);
			append_dev(small3, t33);
			append_dev(div14, t34);
			append_dev(div14, div13);
			append_dev(div13, strong4);
			append_dev(strong4, t35);
			append_dev(div13, t36);
			append_dev(div13, ul2);
			append_dev(ul2, li5);
			append_dev(li5, t37);
			append_dev(ul2, t38);
			append_dev(ul2, li6);
			append_dev(li6, t39);
			append_dev(ul2, t40);
			append_dev(ul2, li7);
			append_dev(li7, t41);
			append_dev(div13, t42);
			append_dev(div13, strong5);
			append_dev(strong5, t43);
			append_dev(div13, t44);
			append_dev(div13, ul3);
			append_dev(ul3, li8);
			append_dev(li8, t45);
			append_dev(ul3, t46);
			append_dev(ul3, li9);
			append_dev(li9, t47);
			append_dev(div25, t48);
			append_dev(div25, div24);
			append_dev(div24, div23);
			append_dev(div23, article2);
			append_dev(article2, div17);
			append_dev(div17, figure2);
			append_dev(figure2, i6);
			append_dev(article2, t49);
			append_dev(article2, div22);
			append_dev(div22, div20);
			append_dev(div20, strong6);
			append_dev(strong6, t50);
			append_dev(div20, t51);
			append_dev(div20, br2);
			append_dev(div20, t52);
			append_dev(div20, div18);
			append_dev(div18, span4);
			append_dev(span4, i7);
			append_dev(div18, t53);
			append_dev(div18, small4);
			append_dev(small4, t54);
			append_dev(div20, t55);
			append_dev(div20, div19);
			append_dev(div19, span5);
			append_dev(span5, i8);
			append_dev(div19, t56);
			append_dev(div19, small5);
			append_dev(small5, t57);
			append_dev(div22, t58);
			append_dev(div22, div21);
			append_dev(div21, strong7);
			append_dev(strong7, t59);
			append_dev(div21, t60);
			append_dev(div21, ul4);
			append_dev(ul4, li10);
			append_dev(li10, t61);
			append_dev(ul4, t62);
			append_dev(ul4, li11);
			append_dev(li11, t63);
			append_dev(ul4, t64);
			append_dev(ul4, li12);
			append_dev(li12, t65);
			append_dev(div21, t66);
			append_dev(div21, strong8);
			append_dev(strong8, t67);
			append_dev(div21, t68);
			append_dev(div21, ul5);
			append_dev(ul5, li13);
			append_dev(li13, t69);
			append_dev(ul5, t70);
			append_dev(ul5, li14);
			append_dev(li14, t71);
			append_dev(div28, t72);
			append_dev(div28, button);

			if (!mounted) {
				dispose = [
					listen_dev(div0, "click", /*closeModal*/ ctx[0], false, false, false),
					listen_dev(button, "click", /*closeModal*/ ctx[0], false, false, false)
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div28);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	const closeModal = () => {
		document.querySelector("#agenda-interactiva").classList.toggle("is-active");
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Agenda> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Agenda", $$slots, []);
	$$self.$capture_state = () => ({ closeModal });
	return [closeModal];
}

class Agenda extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Agenda",
			options,
			id: create_fragment.name
		});
	}
}

export { Agenda as A, Player as P };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbmRhLjliZDdkMmEwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHZpbWVvL3BsYXllci9kaXN0L3BsYXllci5lcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FnZW5kYS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEB2aW1lby9wbGF5ZXIgdjIuMTQuMSB8IChjKSAyMDIwIFZpbWVvIHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vdmltZW8vcGxheWVyLmpzICovXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbi8qKlxuICogQG1vZHVsZSBsaWIvZnVuY3Rpb25zXG4gKi9cblxuLyoqXG4gKiBDaGVjayB0byBzZWUgdGhpcyBpcyBhIG5vZGUgZW52aXJvbm1lbnQuXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xuXG4vKiBnbG9iYWwgZ2xvYmFsICovXG52YXIgaXNOb2RlID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChnbG9iYWwpID09PSAnW29iamVjdCBnbG9iYWxdJztcbi8qKlxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBtZXRob2QgZm9yIGEgZ2l2ZW4gZ2V0dGVyIG9yIHNldHRlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBFaXRoZXIg4oCcZ2V04oCdIG9yIOKAnHNldOKAnS5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBnZXRNZXRob2ROYW1lKHByb3AsIHR5cGUpIHtcbiAgaWYgKHByb3AuaW5kZXhPZih0eXBlLnRvTG93ZXJDYXNlKCkpID09PSAwKSB7XG4gICAgcmV0dXJuIHByb3A7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQodHlwZS50b0xvd2VyQ2FzZSgpKS5jb25jYXQocHJvcC5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSkuY29uY2F0KHByb3Auc3Vic3RyKDEpKTtcbn1cbi8qKlxuICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBvYmplY3QgaXMgYSBET00gRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IGVsZW1lbnQgVGhlIG9iamVjdCB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuZnVuY3Rpb24gaXNEb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIEJvb2xlYW4oZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmICdub2RlTmFtZScgaW4gZWxlbWVudCAmJiBlbGVtZW50Lm93bmVyRG9jdW1lbnQgJiYgZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KTtcbn1cbi8qKlxuICogQ2hlY2sgdG8gc2VlIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cDovL2RsLmRyb3Bib3h1c2VyY29udGVudC5jb20vdS8zNTE0Ni9qcy90ZXN0cy9pc051bWJlci5odG1sXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW50ZWdlciBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09IHZhbHVlO1xufVxuLyoqXG4gKiBDaGVjayB0byBzZWUgaWYgdGhlIFVSTCBpcyBhIFZpbWVvIHVybC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgc3RyaW5nLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc1ZpbWVvVXJsKHVybCkge1xuICByZXR1cm4gL14oaHR0cHM/Oik/XFwvXFwvKChwbGF5ZXJ8d3d3KVxcLik/dmltZW9cXC5jb20oPz0kfFxcLykvLnRlc3QodXJsKTtcbn1cbi8qKlxuICogR2V0IHRoZSBWaW1lbyBVUkwgZnJvbSBhbiBlbGVtZW50LlxuICogVGhlIGVsZW1lbnQgbXVzdCBoYXZlIGVpdGhlciBhIGRhdGEtdmltZW8taWQgb3IgZGF0YS12aW1lby11cmwgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvRW1iZWRQYXJhbWV0ZXJzIFRoZSBvRW1iZWQgcGFyYW1ldGVycy5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBnZXRWaW1lb1VybCgpIHtcbiAgdmFyIG9FbWJlZFBhcmFtZXRlcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICB2YXIgaWQgPSBvRW1iZWRQYXJhbWV0ZXJzLmlkO1xuICB2YXIgdXJsID0gb0VtYmVkUGFyYW1ldGVycy51cmw7XG4gIHZhciBpZE9yVXJsID0gaWQgfHwgdXJsO1xuXG4gIGlmICghaWRPclVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQW4gaWQgb3IgdXJsIG11c3QgYmUgcGFzc2VkLCBlaXRoZXIgaW4gYW4gb3B0aW9ucyBvYmplY3Qgb3IgYXMgYSBkYXRhLXZpbWVvLWlkIG9yIGRhdGEtdmltZW8tdXJsIGF0dHJpYnV0ZS4nKTtcbiAgfVxuXG4gIGlmIChpc0ludGVnZXIoaWRPclVybCkpIHtcbiAgICByZXR1cm4gXCJodHRwczovL3ZpbWVvLmNvbS9cIi5jb25jYXQoaWRPclVybCk7XG4gIH1cblxuICBpZiAoaXNWaW1lb1VybChpZE9yVXJsKSkge1xuICAgIHJldHVybiBpZE9yVXJsLnJlcGxhY2UoJ2h0dHA6JywgJ2h0dHBzOicpO1xuICB9XG5cbiAgaWYgKGlkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQoaWQsIFwiXFx1MjAxRCBpcyBub3QgYSB2YWxpZCB2aWRlbyBpZC5cIikpO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcdTIwMUNcIi5jb25jYXQoaWRPclVybCwgXCJcXHUyMDFEIGlzIG5vdCBhIHZpbWVvLmNvbSB1cmwuXCIpKTtcbn1cblxudmFyIGFycmF5SW5kZXhPZlN1cHBvcnQgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgIT09ICd1bmRlZmluZWQnO1xudmFyIHBvc3RNZXNzYWdlU3VwcG9ydCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cucG9zdE1lc3NhZ2UgIT09ICd1bmRlZmluZWQnO1xuXG5pZiAoIWlzTm9kZSAmJiAoIWFycmF5SW5kZXhPZlN1cHBvcnQgfHwgIXBvc3RNZXNzYWdlU3VwcG9ydCkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdGhlIFZpbWVvIFBsYXllciBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGlzIGJyb3dzZXIuJyk7XG59XG5cbnZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxuLyohXG4gKiB3ZWFrbWFwLXBvbHlmaWxsIHYyLjAuMSAtIEVDTUFTY3JpcHQ2IFdlYWtNYXAgcG9seWZpbGxcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9wb2x5Z29ucGxhbmV0L3dlYWttYXAtcG9seWZpbGxcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDIwIFBvbHlnb24gUGxhbmV0IDxwb2x5Z29uLnBsYW5ldC5hcXVhQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gKHNlbGYpIHtcblxuICBpZiAoc2VsZi5XZWFrTWFwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIHNlbGYuV2Vha01hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBFQ01BLTI2MiAyMy4zIFdlYWtNYXAgT2JqZWN0c1xuICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICBpZiAodGhpcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDb25zdHJ1Y3RvciBXZWFrTWFwIHJlcXVpcmVzICduZXcnXCIpO1xuICAgICAgfVxuXG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2lkJywgZ2VuSWQoJ19XZWFrTWFwJykpOyAvLyBFQ01BLTI2MiAyMy4zLjEuMSBXZWFrTWFwKFtpdGVyYWJsZV0pXG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBDdXJyZW50bHksIFdlYWtNYXAgYGl0ZXJhYmxlYCBhcmd1bWVudCBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1dlYWtNYXAgaXRlcmFibGUgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuICAgIH0gLy8gRUNNQS0yNjIgMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcblxuXG4gICAgZGVmaW5lUHJvcGVydHkoV2Vha01hcC5wcm90b3R5cGUsICdkZWxldGUnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBjaGVja0luc3RhbmNlKHRoaXMsICdkZWxldGUnKTtcblxuICAgICAgaWYgKCFpc09iamVjdChrZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX2lkXTtcblxuICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5WzBdID09PSBrZXkpIHtcbiAgICAgICAgZGVsZXRlIGtleVt0aGlzLl9pZF07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7IC8vIEVDTUEtMjYyIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG5cbiAgICBkZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2dldCcsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGNoZWNrSW5zdGFuY2UodGhpcywgJ2dldCcpO1xuXG4gICAgICBpZiAoIWlzT2JqZWN0KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX2lkXTtcblxuICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5WzBdID09PSBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH0pOyAvLyBFQ01BLTI2MiAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuXG4gICAgZGVmaW5lUHJvcGVydHkoV2Vha01hcC5wcm90b3R5cGUsICdoYXMnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBjaGVja0luc3RhbmNlKHRoaXMsICdoYXMnKTtcblxuICAgICAgaWYgKCFpc09iamVjdChrZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX2lkXTtcblxuICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5WzBdID09PSBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTsgLy8gRUNNQS0yNjIgMjMuMy4zLjUgV2Vha01hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG5cbiAgICBkZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ3NldCcsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBjaGVja0luc3RhbmNlKHRoaXMsICdzZXQnKTtcblxuICAgICAgaWYgKCFpc09iamVjdChrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdmFsdWUgdXNlZCBhcyB3ZWFrIG1hcCBrZXknKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMuX2lkXTtcblxuICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5WzBdID09PSBrZXkpIHtcbiAgICAgICAgZW50cnlbMV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGRlZmluZVByb3BlcnR5KGtleSwgdGhpcy5faWQsIFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrSW5zdGFuY2UoeCwgbWV0aG9kTmFtZSkge1xuICAgICAgaWYgKCFpc09iamVjdCh4KSB8fCAhaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2lkJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtZXRob2ROYW1lICsgJyBtZXRob2QgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlciAnICsgdHlwZW9mIHgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbklkKHByZWZpeCkge1xuICAgICAgcmV0dXJuIHByZWZpeCArICdfJyArIHJhbmQoKSArICcuJyArIHJhbmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYW5kKCkge1xuICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMik7XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkoV2Vha01hcCwgJ19wb2x5ZmlsbCcsIHRydWUpO1xuICAgIHJldHVybiBXZWFrTWFwO1xuICB9KCk7XG5cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiBPYmplY3QoeCkgPT09IHg7XG4gIH1cbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBjb21tb25qc0dsb2JhbCA6IGNvbW1vbmpzR2xvYmFsKTtcblxudmFyIG5wb19zcmMgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKiEgTmF0aXZlIFByb21pc2UgT25seVxuICAgIHYwLjguMSAoYykgS3lsZSBTaW1wc29uXG4gICAgTUlUIExpY2Vuc2U6IGh0dHA6Ly9nZXRpZnkubWl0LWxpY2Vuc2Uub3JnXG4qL1xuKGZ1bmN0aW9uIFVNRChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIC8vIHNwZWNpYWwgZm9ybSBvZiBVTUQgZm9yIHBvbHlmaWxsaW5nIGFjcm9zcyBldmlyb25tZW50c1xuICBjb250ZXh0W25hbWVdID0gY29udGV4dFtuYW1lXSB8fCBkZWZpbml0aW9uKCk7XG5cbiAgaWYgKCBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGV4dFtuYW1lXTtcbiAgfVxufSkoXCJQcm9taXNlXCIsIHR5cGVvZiBjb21tb25qc0dsb2JhbCAhPSBcInVuZGVmaW5lZFwiID8gY29tbW9uanNHbG9iYWwgOiBjb21tb25qc0dsb2JhbCwgZnVuY3Rpb24gREVGKCkge1xuXG4gIHZhciBidWlsdEluUHJvcCxcbiAgICAgIGN5Y2xlLFxuICAgICAgc2NoZWR1bGluZ19xdWV1ZSxcbiAgICAgIFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICAgIHRpbWVyID0gdHlwZW9mIHNldEltbWVkaWF0ZSAhPSBcInVuZGVmaW5lZFwiID8gZnVuY3Rpb24gdGltZXIoZm4pIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlKGZuKTtcbiAgfSA6IHNldFRpbWVvdXQ7IC8vIGRhbW1pdCwgSUU4LlxuXG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge30pO1xuXG4gICAgYnVpbHRJblByb3AgPSBmdW5jdGlvbiBidWlsdEluUHJvcChvYmosIG5hbWUsIHZhbCwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBjb25maWcgIT09IGZhbHNlXG4gICAgICB9KTtcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBidWlsdEluUHJvcCA9IGZ1bmN0aW9uIGJ1aWx0SW5Qcm9wKG9iaiwgbmFtZSwgdmFsKSB7XG4gICAgICBvYmpbbmFtZV0gPSB2YWw7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH0gLy8gTm90ZTogdXNpbmcgYSBxdWV1ZSBpbnN0ZWFkIG9mIGFycmF5IGZvciBlZmZpY2llbmN5XG5cblxuICBzY2hlZHVsaW5nX3F1ZXVlID0gZnVuY3Rpb24gUXVldWUoKSB7XG4gICAgdmFyIGZpcnN0LCBsYXN0LCBpdGVtO1xuXG4gICAgZnVuY3Rpb24gSXRlbShmbiwgc2VsZikge1xuICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgdGhpcy5zZWxmID0gc2VsZjtcbiAgICAgIHRoaXMubmV4dCA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkOiBmdW5jdGlvbiBhZGQoZm4sIHNlbGYpIHtcbiAgICAgICAgaXRlbSA9IG5ldyBJdGVtKGZuLCBzZWxmKTtcblxuICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgIGxhc3QubmV4dCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlyc3QgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIGl0ZW0gPSB2b2lkIDA7XG4gICAgICB9LFxuICAgICAgZHJhaW46IGZ1bmN0aW9uIGRyYWluKCkge1xuICAgICAgICB2YXIgZiA9IGZpcnN0O1xuICAgICAgICBmaXJzdCA9IGxhc3QgPSBjeWNsZSA9IHZvaWQgMDtcblxuICAgICAgICB3aGlsZSAoZikge1xuICAgICAgICAgIGYuZm4uY2FsbChmLnNlbGYpO1xuICAgICAgICAgIGYgPSBmLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9KCk7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUoZm4sIHNlbGYpIHtcbiAgICBzY2hlZHVsaW5nX3F1ZXVlLmFkZChmbiwgc2VsZik7XG5cbiAgICBpZiAoIWN5Y2xlKSB7XG4gICAgICBjeWNsZSA9IHRpbWVyKHNjaGVkdWxpbmdfcXVldWUuZHJhaW4pO1xuICAgIH1cbiAgfSAvLyBwcm9taXNlIGR1Y2sgdHlwaW5nXG5cblxuICBmdW5jdGlvbiBpc1RoZW5hYmxlKG8pIHtcbiAgICB2YXIgX3RoZW4sXG4gICAgICAgIG9fdHlwZSA9IHR5cGVvZiBvO1xuXG4gICAgaWYgKG8gIT0gbnVsbCAmJiAob190eXBlID09IFwib2JqZWN0XCIgfHwgb190eXBlID09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgIF90aGVuID0gby50aGVuO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgX3RoZW4gPT0gXCJmdW5jdGlvblwiID8gX3RoZW4gOiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hhaW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5vdGlmeUlzb2xhdGVkKHRoaXMsIHRoaXMuc3RhdGUgPT09IDEgPyB0aGlzLmNoYWluW2ldLnN1Y2Nlc3MgOiB0aGlzLmNoYWluW2ldLmZhaWx1cmUsIHRoaXMuY2hhaW5baV0pO1xuICAgIH1cblxuICAgIHRoaXMuY2hhaW4ubGVuZ3RoID0gMDtcbiAgfSAvLyBOT1RFOiBUaGlzIGlzIGEgc2VwYXJhdGUgZnVuY3Rpb24gdG8gaXNvbGF0ZVxuICAvLyB0aGUgYHRyeS4uY2F0Y2hgIHNvIHRoYXQgb3RoZXIgY29kZSBjYW4gYmVcbiAgLy8gb3B0aW1pemVkIGJldHRlclxuXG5cbiAgZnVuY3Rpb24gbm90aWZ5SXNvbGF0ZWQoc2VsZiwgY2IsIGNoYWluKSB7XG4gICAgdmFyIHJldCwgX3RoZW47XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGNiID09PSBmYWxzZSkge1xuICAgICAgICBjaGFpbi5yZWplY3Qoc2VsZi5tc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNiID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0ID0gc2VsZi5tc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gY2IuY2FsbCh2b2lkIDAsIHNlbGYubXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXQgPT09IGNoYWluLnByb21pc2UpIHtcbiAgICAgICAgICBjaGFpbi5yZWplY3QoVHlwZUVycm9yKFwiUHJvbWlzZS1jaGFpbiBjeWNsZVwiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoZW4gPSBpc1RoZW5hYmxlKHJldCkpIHtcbiAgICAgICAgICBfdGhlbi5jYWxsKHJldCwgY2hhaW4ucmVzb2x2ZSwgY2hhaW4ucmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFpbi5yZXNvbHZlKHJldCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNoYWluLnJlamVjdChlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUobXNnKSB7XG4gICAgdmFyIF90aGVuLFxuICAgICAgICBzZWxmID0gdGhpczsgLy8gYWxyZWFkeSB0cmlnZ2VyZWQ/XG5cblxuICAgIGlmIChzZWxmLnRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYudHJpZ2dlcmVkID0gdHJ1ZTsgLy8gdW53cmFwXG5cbiAgICBpZiAoc2VsZi5kZWYpIHtcbiAgICAgIHNlbGYgPSBzZWxmLmRlZjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKF90aGVuID0gaXNUaGVuYWJsZShtc2cpKSB7XG4gICAgICAgIHNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGVmX3dyYXBwZXIgPSBuZXcgTWFrZURlZldyYXBwZXIoc2VsZik7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3RoZW4uY2FsbChtc2csIGZ1bmN0aW9uICRyZXNvbHZlJCgpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShkZWZfd3JhcHBlciwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICRyZWplY3QkKCkge1xuICAgICAgICAgICAgICByZWplY3QuYXBwbHkoZGVmX3dyYXBwZXIsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdC5jYWxsKGRlZl93cmFwcGVyLCBlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLm1zZyA9IG1zZztcbiAgICAgICAgc2VsZi5zdGF0ZSA9IDE7XG5cbiAgICAgICAgaWYgKHNlbGYuY2hhaW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNjaGVkdWxlKG5vdGlmeSwgc2VsZik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdC5jYWxsKG5ldyBNYWtlRGVmV3JhcHBlcihzZWxmKSwgZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWplY3QobXNnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvLyBhbHJlYWR5IHRyaWdnZXJlZD9cblxuICAgIGlmIChzZWxmLnRyaWdnZXJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYudHJpZ2dlcmVkID0gdHJ1ZTsgLy8gdW53cmFwXG5cbiAgICBpZiAoc2VsZi5kZWYpIHtcbiAgICAgIHNlbGYgPSBzZWxmLmRlZjtcbiAgICB9XG5cbiAgICBzZWxmLm1zZyA9IG1zZztcbiAgICBzZWxmLnN0YXRlID0gMjtcblxuICAgIGlmIChzZWxmLmNoYWluLmxlbmd0aCA+IDApIHtcbiAgICAgIHNjaGVkdWxlKG5vdGlmeSwgc2VsZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXRlcmF0ZVByb21pc2VzKENvbnN0cnVjdG9yLCBhcnIsIHJlc29sdmVyLCByZWplY3Rlcikge1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAoZnVuY3Rpb24gSUlGRShpZHgpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShhcnJbaWR4XSkudGhlbihmdW5jdGlvbiAkcmVzb2x2ZXIkKG1zZykge1xuICAgICAgICAgIHJlc29sdmVyKGlkeCwgbXNnKTtcbiAgICAgICAgfSwgcmVqZWN0ZXIpO1xuICAgICAgfSkoaWR4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBNYWtlRGVmV3JhcHBlcihzZWxmKSB7XG4gICAgdGhpcy5kZWYgPSBzZWxmO1xuICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBNYWtlRGVmKHNlbGYpIHtcbiAgICB0aGlzLnByb21pc2UgPSBzZWxmO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5jaGFpbiA9IFtdO1xuICAgIHRoaXMubXNnID0gdm9pZCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fX05QT19fICE9PSAwKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBwcm9taXNlXCIpO1xuICAgIH0gLy8gaW5zdGFuY2Ugc2hhZG93aW5nIHRoZSBpbmhlcml0ZWQgXCJicmFuZFwiXG4gICAgLy8gdG8gc2lnbmFsIGFuIGFscmVhZHkgXCJpbml0aWFsaXplZFwiIHByb21pc2VcblxuXG4gICAgdGhpcy5fX05QT19fID0gMTtcbiAgICB2YXIgZGVmID0gbmV3IE1ha2VEZWYodGhpcyk7XG5cbiAgICB0aGlzW1widGhlblwiXSA9IGZ1bmN0aW9uIHRoZW4oc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgdmFyIG8gPSB7XG4gICAgICAgIHN1Y2Nlc3M6IHR5cGVvZiBzdWNjZXNzID09IFwiZnVuY3Rpb25cIiA/IHN1Y2Nlc3MgOiB0cnVlLFxuICAgICAgICBmYWlsdXJlOiB0eXBlb2YgZmFpbHVyZSA9PSBcImZ1bmN0aW9uXCIgPyBmYWlsdXJlIDogZmFsc2VcbiAgICAgIH07IC8vIE5vdGU6IGB0aGVuKC4uKWAgaXRzZWxmIGNhbiBiZSBib3Jyb3dlZCB0byBiZSB1c2VkIGFnYWluc3RcbiAgICAgIC8vIGEgZGlmZmVyZW50IHByb21pc2UgY29uc3RydWN0b3IgZm9yIG1ha2luZyB0aGUgY2hhaW5lZCBwcm9taXNlLFxuICAgICAgLy8gYnkgc3Vic3RpdHV0aW5nIGEgZGlmZmVyZW50IGB0aGlzYCBiaW5kaW5nLlxuXG4gICAgICBvLnByb21pc2UgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihmdW5jdGlvbiBleHRyYWN0Q2hhaW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSAhPSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHJlamVjdCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG8ucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIG8ucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgfSk7XG4gICAgICBkZWYuY2hhaW4ucHVzaChvKTtcblxuICAgICAgaWYgKGRlZi5zdGF0ZSAhPT0gMCkge1xuICAgICAgICBzY2hlZHVsZShub3RpZnksIGRlZik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXNbXCJjYXRjaFwiXSA9IGZ1bmN0aW9uICRjYXRjaCQoZmFpbHVyZSkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIGZhaWx1cmUpO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IuY2FsbCh2b2lkIDAsIGZ1bmN0aW9uIHB1YmxpY1Jlc29sdmUobXNnKSB7XG4gICAgICAgIHJlc29sdmUuY2FsbChkZWYsIG1zZyk7XG4gICAgICB9LCBmdW5jdGlvbiBwdWJsaWNSZWplY3QobXNnKSB7XG4gICAgICAgIHJlamVjdC5jYWxsKGRlZiwgbXNnKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0LmNhbGwoZGVmLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBQcm9taXNlUHJvdG90eXBlID0gYnVpbHRJblByb3Aoe30sIFwiY29uc3RydWN0b3JcIiwgUHJvbWlzZSxcbiAgLypjb25maWd1cmFibGU9Ki9cbiAgZmFsc2UpOyAvLyBOb3RlOiBBbmRyb2lkIDQgY2Fubm90IHVzZSBgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uKWAgaGVyZVxuXG4gIFByb21pc2UucHJvdG90eXBlID0gUHJvbWlzZVByb3RvdHlwZTsgLy8gYnVpbHQtaW4gXCJicmFuZFwiIHRvIHNpZ25hbCBhbiBcInVuaW5pdGlhbGl6ZWRcIiBwcm9taXNlXG5cbiAgYnVpbHRJblByb3AoUHJvbWlzZVByb3RvdHlwZSwgXCJfX05QT19fXCIsIDAsXG4gIC8qY29uZmlndXJhYmxlPSovXG4gIGZhbHNlKTtcbiAgYnVpbHRJblByb3AoUHJvbWlzZSwgXCJyZXNvbHZlXCIsIGZ1bmN0aW9uIFByb21pc2UkcmVzb2x2ZShtc2cpIHtcbiAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzOyAvLyBzcGVjIG1hbmRhdGVkIGNoZWNrc1xuICAgIC8vIG5vdGU6IGJlc3QgXCJpc1Byb21pc2VcIiBjaGVjayB0aGF0J3MgcHJhY3RpY2FsIGZvciBub3dcblxuICAgIGlmIChtc2cgJiYgdHlwZW9mIG1zZyA9PSBcIm9iamVjdFwiICYmIG1zZy5fX05QT19fID09PSAxKSB7XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKG1zZyk7XG4gICAgfSk7XG4gIH0pO1xuICBidWlsdEluUHJvcChQcm9taXNlLCBcInJlamVjdFwiLCBmdW5jdGlvbiBQcm9taXNlJHJlamVjdChtc2cpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobXNnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGJ1aWx0SW5Qcm9wKFByb21pc2UsIFwiYWxsXCIsIGZ1bmN0aW9uIFByb21pc2UkYWxsKGFycikge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7IC8vIHNwZWMgbWFuZGF0ZWQgY2hlY2tzXG5cbiAgICBpZiAoVG9TdHJpbmcuY2FsbChhcnIpICE9IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgcmV0dXJuIENvbnN0cnVjdG9yLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpO1xuICAgIH1cblxuICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3IucmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSAhPSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHJlamVjdCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoLFxuICAgICAgICAgIG1zZ3MgPSBBcnJheShsZW4pLFxuICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgIGl0ZXJhdGVQcm9taXNlcyhDb25zdHJ1Y3RvciwgYXJyLCBmdW5jdGlvbiByZXNvbHZlcihpZHgsIG1zZykge1xuICAgICAgICBtc2dzW2lkeF0gPSBtc2c7XG5cbiAgICAgICAgaWYgKCsrY291bnQgPT09IGxlbikge1xuICAgICAgICAgIHJlc29sdmUobXNncyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG4gIH0pO1xuICBidWlsdEluUHJvcChQcm9taXNlLCBcInJhY2VcIiwgZnVuY3Rpb24gUHJvbWlzZSRyYWNlKGFycikge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7IC8vIHNwZWMgbWFuZGF0ZWQgY2hlY2tzXG5cbiAgICBpZiAoVG9TdHJpbmcuY2FsbChhcnIpICE9IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgcmV0dXJuIENvbnN0cnVjdG9yLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmUgIT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiByZWplY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICBpdGVyYXRlUHJvbWlzZXMoQ29uc3RydWN0b3IsIGFyciwgZnVuY3Rpb24gcmVzb2x2ZXIoaWR4LCBtc2cpIHtcbiAgICAgICAgcmVzb2x2ZShtc2cpO1xuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBQcm9taXNlO1xufSk7XG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIGxpYi9jYWxsYmFja3NcbiAqL1xudmFyIGNhbGxiYWNrTWFwID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogU3RvcmUgYSBjYWxsYmFjayBmb3IgYSBtZXRob2Qgb3IgZXZlbnQgZm9yIGEgcGxheWVyLlxuICpcbiAqIEBwYXJhbSB7UGxheWVyfSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbWV0aG9kIG9yIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0geyhmdW5jdGlvbih0aGlzOlBsYXllciwgKik6IHZvaWR8e3Jlc29sdmU6IGZ1bmN0aW9uLCByZWplY3Q6IGZ1bmN0aW9ufSl9IGNhbGxiYWNrXG4gKiAgICAgICAgVGhlIGNhbGxiYWNrIHRvIGNhbGwgb3IgYW4gb2JqZWN0IHdpdGggcmVzb2x2ZSBhbmQgcmVqZWN0IGZ1bmN0aW9ucyBmb3IgYSBwcm9taXNlLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBzdG9yZUNhbGxiYWNrKHBsYXllciwgbmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIHBsYXllckNhbGxiYWNrcyA9IGNhbGxiYWNrTWFwLmdldChwbGF5ZXIuZWxlbWVudCkgfHwge307XG5cbiAgaWYgKCEobmFtZSBpbiBwbGF5ZXJDYWxsYmFja3MpKSB7XG4gICAgcGxheWVyQ2FsbGJhY2tzW25hbWVdID0gW107XG4gIH1cblxuICBwbGF5ZXJDYWxsYmFja3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gIGNhbGxiYWNrTWFwLnNldChwbGF5ZXIuZWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbn1cbi8qKlxuICogR2V0IHRoZSBjYWxsYmFja3MgZm9yIGEgcGxheWVyIGFuZCBldmVudCBvciBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtQbGF5ZXJ9IHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBtZXRob2Qgb3IgZXZlbnQgbmFtZVxuICogQHJldHVybiB7ZnVuY3Rpb25bXX1cbiAqL1xuXG5mdW5jdGlvbiBnZXRDYWxsYmFja3MocGxheWVyLCBuYW1lKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBjYWxsYmFja01hcC5nZXQocGxheWVyLmVsZW1lbnQpIHx8IHt9O1xuICByZXR1cm4gcGxheWVyQ2FsbGJhY2tzW25hbWVdIHx8IFtdO1xufVxuLyoqXG4gKiBSZW1vdmUgYSBzdG9yZWQgY2FsbGJhY2sgZm9yIGEgbWV0aG9kIG9yIGV2ZW50IGZvciBhIHBsYXllci5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG1ldGhvZCBvciBldmVudCBuYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBzcGVjaWZpYyBjYWxsYmFjayB0byByZW1vdmUuXG4gKiBAcmV0dXJuIHtib29sZWFufSBXYXMgdGhpcyB0aGUgbGFzdCBjYWxsYmFjaz9cbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVDYWxsYmFjayhwbGF5ZXIsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBjYWxsYmFja01hcC5nZXQocGxheWVyLmVsZW1lbnQpIHx8IHt9O1xuXG4gIGlmICghcGxheWVyQ2FsbGJhY2tzW25hbWVdKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gSWYgbm8gY2FsbGJhY2sgaXMgcGFzc2VkLCByZW1vdmUgYWxsIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50XG5cblxuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgcGxheWVyQ2FsbGJhY2tzW25hbWVdID0gW107XG4gICAgY2FsbGJhY2tNYXAuc2V0KHBsYXllci5lbGVtZW50LCBwbGF5ZXJDYWxsYmFja3MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gcGxheWVyQ2FsbGJhY2tzW25hbWVdLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBwbGF5ZXJDYWxsYmFja3NbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGNhbGxiYWNrTWFwLnNldChwbGF5ZXIuZWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbiAgcmV0dXJuIHBsYXllckNhbGxiYWNrc1tuYW1lXSAmJiBwbGF5ZXJDYWxsYmFja3NbbmFtZV0ubGVuZ3RoID09PSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGZpcnN0IHN0b3JlZCBjYWxsYmFjayBmb3IgYSBwbGF5ZXIgYW5kIGV2ZW50IG9yIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG1ldGhvZCBvciBldmVudCBuYW1lLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBjYWxsYmFjaywgb3IgZmFsc2UgaWYgdGhlcmUgd2VyZSBub25lXG4gKi9cblxuZnVuY3Rpb24gc2hpZnRDYWxsYmFja3MocGxheWVyLCBuYW1lKSB7XG4gIHZhciBwbGF5ZXJDYWxsYmFja3MgPSBnZXRDYWxsYmFja3MocGxheWVyLCBuYW1lKTtcblxuICBpZiAocGxheWVyQ2FsbGJhY2tzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgY2FsbGJhY2sgPSBwbGF5ZXJDYWxsYmFja3Muc2hpZnQoKTtcbiAgcmVtb3ZlQ2FsbGJhY2socGxheWVyLCBuYW1lLCBjYWxsYmFjayk7XG4gIHJldHVybiBjYWxsYmFjaztcbn1cbi8qKlxuICogTW92ZSBjYWxsYmFja3MgYXNzb2NpYXRlZCB3aXRoIGFuIGVsZW1lbnQgdG8gYW5vdGhlciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9sZEVsZW1lbnQgVGhlIG9sZCBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV3RWxlbWVudCBUaGUgbmV3IGVsZW1lbnQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHN3YXBDYWxsYmFja3Mob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICB2YXIgcGxheWVyQ2FsbGJhY2tzID0gY2FsbGJhY2tNYXAuZ2V0KG9sZEVsZW1lbnQpO1xuICBjYWxsYmFja01hcC5zZXQobmV3RWxlbWVudCwgcGxheWVyQ2FsbGJhY2tzKTtcbiAgY2FsbGJhY2tNYXAuZGVsZXRlKG9sZEVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgbGliL2VtYmVkXG4gKi9cbnZhciBvRW1iZWRQYXJhbWV0ZXJzID0gWydhdXRvcGF1c2UnLCAnYXV0b3BsYXknLCAnYmFja2dyb3VuZCcsICdieWxpbmUnLCAnY29sb3InLCAnY29udHJvbHMnLCAnZG50JywgJ2hlaWdodCcsICdpZCcsICdsb29wJywgJ21heGhlaWdodCcsICdtYXh3aWR0aCcsICdtdXRlZCcsICdwbGF5c2lubGluZScsICdwb3J0cmFpdCcsICdyZXNwb25zaXZlJywgJ3NwZWVkJywgJ3RleHR0cmFjaycsICd0aXRsZScsICd0cmFuc3BhcmVudCcsICd1cmwnLCAnd2lkdGgnXTtcbi8qKlxuICogR2V0IHRoZSAnZGF0YS12aW1lbyctcHJlZml4ZWQgYXR0cmlidXRlcyBmcm9tIGFuIGVsZW1lbnQgYXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RlZmF1bHRzPXt9XSBUaGUgZGVmYXVsdCB2YWx1ZXMgdG8gdXNlLlxuICogQHJldHVybiB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAqL1xuXG5mdW5jdGlvbiBnZXRPRW1iZWRQYXJhbWV0ZXJzKGVsZW1lbnQpIHtcbiAgdmFyIGRlZmF1bHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgcmV0dXJuIG9FbWJlZFBhcmFtZXRlcnMucmVkdWNlKGZ1bmN0aW9uIChwYXJhbXMsIHBhcmFtKSB7XG4gICAgdmFyIHZhbHVlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZpbWVvLVwiLmNvbmNhdChwYXJhbSkpO1xuXG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgcGFyYW1zW3BhcmFtXSA9IHZhbHVlID09PSAnJyA/IDEgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LCBkZWZhdWx0cyk7XG59XG4vKipcbiAqIENyZWF0ZSBhbiBlbWJlZCBmcm9tIG9FbWJlZCBkYXRhIGluc2lkZSBhbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFRoZSBvRW1iZWQgZGF0YS5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gcHV0IHRoZSBpZnJhbWUgaW4uXG4gKiBAcmV0dXJuIHtIVE1MSUZyYW1lRWxlbWVudH0gVGhlIGlmcmFtZSBlbWJlZC5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbWJlZChfcmVmLCBlbGVtZW50KSB7XG4gIHZhciBodG1sID0gX3JlZi5odG1sO1xuXG4gIGlmICghZWxlbWVudCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FuIGVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCcpO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXZpbWVvLWluaXRpYWxpemVkJykgIT09IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgfVxuXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS12aW1lby1pbml0aWFsaXplZCcsICd0cnVlJyk7XG4gIHJldHVybiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xufVxuLyoqXG4gKiBNYWtlIGFuIG9FbWJlZCBjYWxsIGZvciB0aGUgc3BlY2lmaWVkIFVSTC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlkZW9VcmwgVGhlIHZpbWVvLmNvbSB1cmwgZm9yIHRoZSB2aWRlby5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBQYXJhbWV0ZXJzIHRvIHBhc3MgdG8gb0VtYmVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cblxuZnVuY3Rpb24gZ2V0T0VtYmVkRGF0YSh2aWRlb1VybCkge1xuICB2YXIgcGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgdmFyIGVsZW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAoIWlzVmltZW9VcmwodmlkZW9VcmwpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXFx1MjAxQ1wiLmNvbmNhdCh2aWRlb1VybCwgXCJcXHUyMDFEIGlzIG5vdCBhIHZpbWVvLmNvbSB1cmwuXCIpKTtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gXCJodHRwczovL3ZpbWVvLmNvbS9hcGkvb2VtYmVkLmpzb24/dXJsPVwiLmNvbmNhdChlbmNvZGVVUklDb21wb25lbnQodmlkZW9VcmwpKTtcblxuICAgIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgdXJsICs9IFwiJlwiLmNvbmNhdChwYXJhbSwgXCI9XCIpLmNvbmNhdChlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW3BhcmFtXSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4aHIgPSAnWERvbWFpblJlcXVlc3QnIGluIHdpbmRvdyA/IG5ldyBYRG9tYWluUmVxdWVzdCgpIDogbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiXFx1MjAxQ1wiLmNvbmNhdCh2aWRlb1VybCwgXCJcXHUyMDFEIHdhcyBub3QgZm91bmQuXCIpKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKFwiXFx1MjAxQ1wiLmNvbmNhdCh2aWRlb1VybCwgXCJcXHUyMDFEIGlzIG5vdCBlbWJlZGRhYmxlLlwiKSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTsgLy8gQ2hlY2sgYXBpIHJlc3BvbnNlIGZvciA0MDMgb24gb2VtYmVkXG5cbiAgICAgICAgaWYgKGpzb24uZG9tYWluX3N0YXR1c19jb2RlID09PSA0MDMpIHtcbiAgICAgICAgICAvLyBXZSBzdGlsbCB3YW50IHRvIGNyZWF0ZSB0aGUgZW1iZWQgdG8gZ2l2ZSB1c2VycyB2aXN1YWwgZmVlZGJhY2tcbiAgICAgICAgICBjcmVhdGVFbWJlZChqc29uLCBlbGVtZW50KTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiXFx1MjAxQ1wiLmNvbmNhdCh2aWRlb1VybCwgXCJcXHUyMDFEIGlzIG5vdCBlbWJlZGRhYmxlLlwiKSkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUoanNvbik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzID8gXCIgKFwiLmNvbmNhdCh4aHIuc3RhdHVzLCBcIilcIikgOiAnJztcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaGVyZSB3YXMgYW4gZXJyb3IgZmV0Y2hpbmcgdGhlIGVtYmVkIGNvZGUgZnJvbSBWaW1lb1wiLmNvbmNhdChzdGF0dXMsIFwiLlwiKSkpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCgpO1xuICB9KTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBhbGwgZW1iZWRzIHdpdGhpbiBhIHNwZWNpZmljIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbcGFyZW50PWRvY3VtZW50XSBUaGUgcGFyZW50IGVsZW1lbnQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFbWJlZHMoKSB7XG4gIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGRvY3VtZW50O1xuICB2YXIgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aW1lby1pZF0sIFtkYXRhLXZpbWVvLXVybF0nKSk7XG5cbiAgdmFyIGhhbmRsZUVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAoJ2NvbnNvbGUnIGluIHdpbmRvdyAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIGFuIGVtYmVkOiBcIi5jb25jYXQoZXJyb3IpKTtcbiAgICB9XG4gIH07XG5cbiAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBTa2lwIGFueSB0aGF0IGhhdmUgZGF0YS12aW1lby1kZWZlclxuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXZpbWVvLWRlZmVyJykgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFyYW1zID0gZ2V0T0VtYmVkUGFyYW1ldGVycyhlbGVtZW50KTtcbiAgICAgIHZhciB1cmwgPSBnZXRWaW1lb1VybChwYXJhbXMpO1xuICAgICAgZ2V0T0VtYmVkRGF0YSh1cmwsIHBhcmFtcywgZWxlbWVudCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRW1iZWQoZGF0YSwgZWxlbWVudCk7XG4gICAgICB9KS5jYXRjaChoYW5kbGVFcnJvcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycm9yKTtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBSZXNpemUgZW1iZWRzIHdoZW4gbWVzc2FnZWQgYnkgdGhlIHBsYXllci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbcGFyZW50PWRvY3VtZW50XSBUaGUgcGFyZW50IGVsZW1lbnQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHJlc2l6ZUVtYmVkcygpIHtcbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZG9jdW1lbnQ7XG5cbiAgLy8gUHJldmVudCBleGVjdXRpb24gaWYgdXNlcnMgaW5jbHVkZSB0aGUgcGxheWVyLmpzIHNjcmlwdCBtdWx0aXBsZSB0aW1lcy5cbiAgaWYgKHdpbmRvdy5WaW1lb1BsYXllclJlc2l6ZUVtYmVkc18pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aW5kb3cuVmltZW9QbGF5ZXJSZXNpemVFbWJlZHNfID0gdHJ1ZTtcblxuICB2YXIgb25NZXNzYWdlID0gZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgaWYgKCFpc1ZpbWVvVXJsKGV2ZW50Lm9yaWdpbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vICdzcGFjZWNoYW5nZScgaXMgZmlyZWQgb25seSBvbiBlbWJlZHMgd2l0aCBjYXJkc1xuXG5cbiAgICBpZiAoIWV2ZW50LmRhdGEgfHwgZXZlbnQuZGF0YS5ldmVudCAhPT0gJ3NwYWNlY2hhbmdlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpZnJhbWVzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaWZyYW1lc1tpXS5jb250ZW50V2luZG93ICE9PSBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IC8vIENoYW5nZSBwYWRkaW5nLWJvdHRvbSBvZiB0aGUgZW5jbG9zaW5nIGRpdiB0byBhY2NvbW1vZGF0ZVxuICAgICAgLy8gY2FyZCBjYXJvdXNlbCB3aXRob3V0IGRpc3RvcnRpbmcgYXNwZWN0IHJhdGlvXG5cblxuICAgICAgdmFyIHNwYWNlID0gaWZyYW1lc1tpXS5wYXJlbnRFbGVtZW50O1xuICAgICAgc3BhY2Uuc3R5bGUucGFkZGluZ0JvdHRvbSA9IFwiXCIuY29uY2F0KGV2ZW50LmRhdGEuZGF0YVswXS5ib3R0b20sIFwicHhcIik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgbGliL3Bvc3RtZXNzYWdlXG4gKi9cbi8qKlxuICogUGFyc2UgYSBtZXNzYWdlIHJlY2VpdmVkIGZyb20gcG9zdE1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHJlY2VpdmVkIGZyb20gcG9zdE1lc3NhZ2UuXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VNZXNzYWdlRGF0YShkYXRhKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIElmIHRoZSBtZXNzYWdlIGNhbm5vdCBiZSBwYXJzZWQsIHRocm93IHRoZSBlcnJvciBhcyBhIHdhcm5pbmdcbiAgICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFBvc3QgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7UGxheWVyfSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gdXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCBUaGUgQVBJIG1ldGhvZCB0byBjYWxsLlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyBUaGUgcGFyYW1ldGVycyB0byBzZW5kIHRvIHRoZSBwbGF5ZXIuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHBvc3RNZXNzYWdlKHBsYXllciwgbWV0aG9kLCBwYXJhbXMpIHtcbiAgaWYgKCFwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93IHx8ICFwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgbWV0aG9kOiBtZXRob2RcbiAgfTtcblxuICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICBtZXNzYWdlLnZhbHVlID0gcGFyYW1zO1xuICB9IC8vIElFIDggYW5kIDkgZG8gbm90IHN1cHBvcnQgcGFzc2luZyBtZXNzYWdlcywgc28gc3RyaW5naWZ5IHRoZW1cblxuXG4gIHZhciBpZVZlcnNpb24gPSBwYXJzZUZsb2F0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLiptc2llIChcXGQrKS4qJC8sICckMScpKTtcblxuICBpZiAoaWVWZXJzaW9uID49IDggJiYgaWVWZXJzaW9uIDwgMTApIHtcbiAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gIH1cblxuICBwbGF5ZXIuZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHBsYXllci5vcmlnaW4pO1xufVxuLyoqXG4gKiBQYXJzZSB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIGEgbWVzc2FnZSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1BsYXllcn0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCByZWNlaXZlZCB0aGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7KE9iamVjdHxzdHJpbmcpfSBkYXRhIFRoZSBtZXNzYWdlIGRhdGEuIFN0cmluZ3Mgd2lsbCBiZSBwYXJzZWQgaW50byBKU09OLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG5mdW5jdGlvbiBwcm9jZXNzRGF0YShwbGF5ZXIsIGRhdGEpIHtcbiAgZGF0YSA9IHBhcnNlTWVzc2FnZURhdGEoZGF0YSk7XG4gIHZhciBjYWxsYmFja3MgPSBbXTtcbiAgdmFyIHBhcmFtO1xuXG4gIGlmIChkYXRhLmV2ZW50KSB7XG4gICAgaWYgKGRhdGEuZXZlbnQgPT09ICdlcnJvcicpIHtcbiAgICAgIHZhciBwcm9taXNlcyA9IGdldENhbGxiYWNrcyhwbGF5ZXIsIGRhdGEuZGF0YS5tZXRob2QpO1xuICAgICAgcHJvbWlzZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZGF0YS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICBlcnJvci5uYW1lID0gZGF0YS5kYXRhLm5hbWU7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgcmVtb3ZlQ2FsbGJhY2socGxheWVyLCBkYXRhLmRhdGEubWV0aG9kLCBwcm9taXNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrcyA9IGdldENhbGxiYWNrcyhwbGF5ZXIsIFwiZXZlbnQ6XCIuY29uY2F0KGRhdGEuZXZlbnQpKTtcbiAgICBwYXJhbSA9IGRhdGEuZGF0YTtcbiAgfSBlbHNlIGlmIChkYXRhLm1ldGhvZCkge1xuICAgIHZhciBjYWxsYmFjayA9IHNoaWZ0Q2FsbGJhY2tzKHBsYXllciwgZGF0YS5tZXRob2QpO1xuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICBwYXJhbSA9IGRhdGEudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChwbGF5ZXIsIHBhcmFtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5yZXNvbHZlKHBhcmFtKTtcbiAgICB9IGNhdGNoIChlKSB7Ly8gZW1wdHlcbiAgICB9XG4gIH0pO1xufVxuXG4vKiBNSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIFNpbmRyZSBTb3JodXMgPHNpbmRyZXNvcmh1c0BnbWFpbC5jb20+IChzaW5kcmVzb3JodXMuY29tKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5UZXJtcyAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNjcmVlbmZ1bGwoKSB7XG4gIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBmbk1hcCA9IFtbJ3JlcXVlc3RGdWxsc2NyZWVuJywgJ2V4aXRGdWxsc2NyZWVuJywgJ2Z1bGxzY3JlZW5FbGVtZW50JywgJ2Z1bGxzY3JlZW5FbmFibGVkJywgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAnZnVsbHNjcmVlbmVycm9yJ10sIC8vIE5ldyBXZWJLaXRcbiAgICBbJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJywgJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJywgJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JywgJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJywgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ10sIC8vIE9sZCBXZWJLaXRcbiAgICBbJ3dlYmtpdFJlcXVlc3RGdWxsU2NyZWVuJywgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLCAnd2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50JywgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLCAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXSwgWydtb3pSZXF1ZXN0RnVsbFNjcmVlbicsICdtb3pDYW5jZWxGdWxsU2NyZWVuJywgJ21vekZ1bGxTY3JlZW5FbGVtZW50JywgJ21vekZ1bGxTY3JlZW5FbmFibGVkJywgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAnbW96ZnVsbHNjcmVlbmVycm9yJ10sIFsnbXNSZXF1ZXN0RnVsbHNjcmVlbicsICdtc0V4aXRGdWxsc2NyZWVuJywgJ21zRnVsbHNjcmVlbkVsZW1lbnQnLCAnbXNGdWxsc2NyZWVuRW5hYmxlZCcsICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAnTVNGdWxsc2NyZWVuRXJyb3InXV07XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gZm5NYXAubGVuZ3RoO1xuICAgIHZhciByZXQgPSB7fTtcblxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YWwgPSBmbk1hcFtpXTtcblxuICAgICAgaWYgKHZhbCAmJiB2YWxbMV0gaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJldFtmbk1hcFswXVtpXV0gPSB2YWxbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSgpO1xuXG4gIHZhciBldmVudE5hbWVNYXAgPSB7XG4gICAgZnVsbHNjcmVlbmNoYW5nZTogZm4uZnVsbHNjcmVlbmNoYW5nZSxcbiAgICBmdWxsc2NyZWVuZXJyb3I6IGZuLmZ1bGxzY3JlZW5lcnJvclxuICB9O1xuICB2YXIgc2NyZWVuZnVsbCA9IHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBvbkZ1bGxTY3JlZW5FbnRlcmVkID0gZnVuY3Rpb24gb25GdWxsU2NyZWVuRW50ZXJlZCgpIHtcbiAgICAgICAgICBzY3JlZW5mdWxsLm9mZignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkVudGVyZWQpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY3JlZW5mdWxsLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuRW50ZXJlZCk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHJldHVyblByb21pc2UgPSBlbGVtZW50W2ZuLnJlcXVlc3RGdWxsc2NyZWVuXSgpO1xuXG4gICAgICAgIGlmIChyZXR1cm5Qcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVyblByb21pc2UudGhlbihvbkZ1bGxTY3JlZW5FbnRlcmVkKS5jYXRjaChyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGV4aXQ6IGZ1bmN0aW9uIGV4aXQoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIXNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvbkZ1bGxTY3JlZW5FeGl0ID0gZnVuY3Rpb24gb25GdWxsU2NyZWVuRXhpdCgpIHtcbiAgICAgICAgICBzY3JlZW5mdWxsLm9mZignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbFNjcmVlbkV4aXQpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY3JlZW5mdWxsLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsU2NyZWVuRXhpdCk7XG4gICAgICAgIHZhciByZXR1cm5Qcm9taXNlID0gZG9jdW1lbnRbZm4uZXhpdEZ1bGxzY3JlZW5dKCk7XG5cbiAgICAgICAgaWYgKHJldHVyblByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgcmV0dXJuUHJvbWlzZS50aGVuKG9uRnVsbFNjcmVlbkV4aXQpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZU1hcFtldmVudF07XG5cbiAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gb2ZmKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50TmFtZU1hcFtldmVudF07XG5cbiAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHNjcmVlbmZ1bGwsIHtcbiAgICBpc0Z1bGxzY3JlZW46IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudFtmbi5mdWxsc2NyZWVuRWxlbWVudF0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZWxlbWVudDoge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnRbZm4uZnVsbHNjcmVlbkVsZW1lbnRdO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNFbmFibGVkOiB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIC8vIENvZXJjZSB0byBib29sZWFuIGluIGNhc2Ugb2Ygb2xkIFdlYktpdFxuICAgICAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudFtmbi5mdWxsc2NyZWVuRW5hYmxlZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzY3JlZW5mdWxsO1xufVxuXG52YXIgcGxheWVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciByZWFkeU1hcCA9IG5ldyBXZWFrTWFwKCk7XG52YXIgc2NyZWVuZnVsbCA9IHt9O1xuXG52YXIgUGxheWVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFBsYXllci5cbiAgICpcbiAgICogQHBhcmFtIHsoSFRNTElGcmFtZUVsZW1lbnR8SFRNTEVsZW1lbnR8c3RyaW5nfGpRdWVyeSl9IGVsZW1lbnQgQSByZWZlcmVuY2UgdG8gdGhlIFZpbWVvXG4gICAqICAgICAgICBwbGF5ZXIgaWZyYW1lLCBhbmQgaWQsIG9yIGEgalF1ZXJ5IG9iamVjdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBvRW1iZWQgcGFyYW1ldGVycyB0byB1c2Ugd2hlbiBjcmVhdGluZyBhbiBlbWJlZCBpbiB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybiB7UGxheWVyfVxuICAgKi9cbiAgZnVuY3Rpb24gUGxheWVyKGVsZW1lbnQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBsYXllcik7XG5cbiAgICAvKiBnbG9iYWwgalF1ZXJ5ICovXG4gICAgaWYgKHdpbmRvdy5qUXVlcnkgJiYgZWxlbWVudCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoID4gMSAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBIGpRdWVyeSBvYmplY3Qgd2l0aCBtdWx0aXBsZSBlbGVtZW50cyB3YXMgcGFzc2VkLCB1c2luZyB0aGUgZmlyc3QgZWxlbWVudC4nKTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9IGVsZW1lbnRbMF07XG4gICAgfSAvLyBGaW5kIGFuIGVsZW1lbnQgYnkgSURcblxuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgfSAvLyBOb3QgYW4gZWxlbWVudCFcblxuXG4gICAgaWYgKCFpc0RvbUVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgZWl0aGVyIGEgdmFsaWQgZWxlbWVudCBvciBhIHZhbGlkIGlkLicpO1xuICAgIH0gLy8gQWxyZWFkeSBpbml0aWFsaXplZCBhbiBlbWJlZCBpbiB0aGlzIGRpdiwgc28gZ3JhYiB0aGUgaWZyYW1lXG5cblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSUZSQU1FJykge1xuICAgICAgdmFyIGlmcmFtZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG5cbiAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgZWxlbWVudCA9IGlmcmFtZTtcbiAgICAgIH1cbiAgICB9IC8vIGlmcmFtZSB1cmwgaXMgbm90IGEgVmltZW8gdXJsXG5cblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSUZSQU1FJyAmJiAhaXNWaW1lb1VybChlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwbGF5ZXIgZWxlbWVudCBwYXNzZWQgaXNu4oCZdCBhIFZpbWVvIGVtYmVkLicpO1xuICAgIH0gLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHBsYXllciBvYmplY3QgaW4gdGhlIG1hcCwgcmV0dXJuIHRoYXRcblxuXG4gICAgaWYgKHBsYXllck1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBwbGF5ZXJNYXAuZ2V0KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuX3dpbmRvdyA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3JpZ2luID0gJyonO1xuICAgIHZhciByZWFkeVByb21pc2UgPSBuZXcgbnBvX3NyYyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBfdGhpcy5fb25NZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghaXNWaW1lb1VybChldmVudC5vcmlnaW4pIHx8IF90aGlzLmVsZW1lbnQuY29udGVudFdpbmRvdyAhPT0gZXZlbnQuc291cmNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90aGlzLm9yaWdpbiA9PT0gJyonKSB7XG4gICAgICAgICAgX3RoaXMub3JpZ2luID0gZXZlbnQub3JpZ2luO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSBwYXJzZU1lc3NhZ2VEYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICB2YXIgaXNFcnJvciA9IGRhdGEgJiYgZGF0YS5ldmVudCA9PT0gJ2Vycm9yJztcbiAgICAgICAgdmFyIGlzUmVhZHlFcnJvciA9IGlzRXJyb3IgJiYgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5tZXRob2QgPT09ICdyZWFkeSc7XG5cbiAgICAgICAgaWYgKGlzUmVhZHlFcnJvcikge1xuICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgZXJyb3IubmFtZSA9IGRhdGEuZGF0YS5uYW1lO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzUmVhZHlFdmVudCA9IGRhdGEgJiYgZGF0YS5ldmVudCA9PT0gJ3JlYWR5JztcbiAgICAgICAgdmFyIGlzUGluZ1Jlc3BvbnNlID0gZGF0YSAmJiBkYXRhLm1ldGhvZCA9PT0gJ3BpbmcnO1xuXG4gICAgICAgIGlmIChpc1JlYWR5RXZlbnQgfHwgaXNQaW5nUmVzcG9uc2UpIHtcbiAgICAgICAgICBfdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1yZWFkeScsICd0cnVlJyk7XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzc0RhdGEoX3RoaXMsIGRhdGEpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgX3RoaXMuX29uTWVzc2FnZSk7XG5cbiAgICAgIGlmIChfdGhpcy5lbGVtZW50Lm5vZGVOYW1lICE9PSAnSUZSQU1FJykge1xuICAgICAgICB2YXIgcGFyYW1zID0gZ2V0T0VtYmVkUGFyYW1ldGVycyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHVybCA9IGdldFZpbWVvVXJsKHBhcmFtcyk7XG4gICAgICAgIGdldE9FbWJlZERhdGEodXJsLCBwYXJhbXMsIGVsZW1lbnQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB2YXIgaWZyYW1lID0gY3JlYXRlRW1iZWQoZGF0YSwgZWxlbWVudCk7IC8vIE92ZXJ3cml0ZSBlbGVtZW50IHdpdGggdGhlIG5ldyBpZnJhbWUsXG4gICAgICAgICAgLy8gYnV0IHN0b3JlIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgZWxlbWVudFxuXG4gICAgICAgICAgX3RoaXMuZWxlbWVudCA9IGlmcmFtZTtcbiAgICAgICAgICBfdGhpcy5fb3JpZ2luYWxFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICBzd2FwQ2FsbGJhY2tzKGVsZW1lbnQsIGlmcmFtZSk7XG4gICAgICAgICAgcGxheWVyTWFwLnNldChfdGhpcy5lbGVtZW50LCBfdGhpcyk7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7IC8vIFN0b3JlIGEgY29weSBvZiB0aGlzIFBsYXllciBpbiB0aGUgbWFwXG5cbiAgICByZWFkeU1hcC5zZXQodGhpcywgcmVhZHlQcm9taXNlKTtcbiAgICBwbGF5ZXJNYXAuc2V0KHRoaXMuZWxlbWVudCwgdGhpcyk7IC8vIFNlbmQgYSBwaW5nIHRvIHRoZSBpZnJhbWUgc28gdGhlIHJlYWR5IHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCBpZlxuICAgIC8vIHRoZSBwbGF5ZXIgaXMgYWxyZWFkeSByZWFkeS5cblxuICAgIGlmICh0aGlzLmVsZW1lbnQubm9kZU5hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICBwb3N0TWVzc2FnZSh0aGlzLCAncGluZycpO1xuICAgIH1cblxuICAgIGlmIChzY3JlZW5mdWxsLmlzRW5hYmxlZCkge1xuICAgICAgdmFyIGV4aXRGdWxsc2NyZWVuID0gZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW5mdWxsLmV4aXQoKTtcbiAgICAgIH07XG5cbiAgICAgIHNjcmVlbmZ1bGwub24oJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgIHN0b3JlQ2FsbGJhY2soX3RoaXMsICdldmVudDpleGl0RnVsbHNjcmVlbicsIGV4aXRGdWxsc2NyZWVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVDYWxsYmFjayhfdGhpcywgJ2V2ZW50OmV4aXRGdWxsc2NyZWVuJywgZXhpdEZ1bGxzY3JlZW4pO1xuICAgICAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG5cbiAgICAgICAgX3RoaXMucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwb3N0TWVzc2FnZShfdGhpcywgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBzY3JlZW5mdWxsLmlzRnVsbHNjcmVlbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIHByb21pc2UgZm9yIGEgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgQVBJIG1ldGhvZCB0byBjYWxsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2FyZ3M9e31dIEFyZ3VtZW50cyB0byBzZW5kIHZpYSBwb3N0TWVzc2FnZS5cbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoUGxheWVyLCBbe1xuICAgIGtleTogXCJjYWxsTWV0aG9kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGxNZXRob2QobmFtZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIHJldHVybiBuZXcgbnBvX3NyYyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIFdlIGFyZSBzdG9yaW5nIHRoZSByZXNvbHZlL3JlamVjdCBoYW5kbGVycyB0byBjYWxsIGxhdGVyLCBzbyB3ZVxuICAgICAgICAvLyBjYW7igJl0IHJldHVybiBoZXJlLlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJvbWlzZS9hbHdheXMtcmV0dXJuXG4gICAgICAgIHJldHVybiBfdGhpczIucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdG9yZUNhbGxiYWNrKF90aGlzMiwgbmFtZSwge1xuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdDogcmVqZWN0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoX3RoaXMyLCBuYW1lLCBhcmdzKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBwcm9taXNlIGZvciB0aGUgdmFsdWUgb2YgYSBwbGF5ZXIgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgcHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KG5hbWUpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IG5wb19zcmMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBuYW1lID0gZ2V0TWV0aG9kTmFtZShuYW1lLCAnZ2V0Jyk7IC8vIFdlIGFyZSBzdG9yaW5nIHRoZSByZXNvbHZlL3JlamVjdCBoYW5kbGVycyB0byBjYWxsIGxhdGVyLCBzbyB3ZVxuICAgICAgICAvLyBjYW7igJl0IHJldHVybiBoZXJlLlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJvbWlzZS9hbHdheXMtcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuIF90aGlzMy5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN0b3JlQ2FsbGJhY2soX3RoaXMzLCBuYW1lLCB7XG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0OiByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwb3N0TWVzc2FnZShfdGhpczMsIG5hbWUpO1xuICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIHByb21pc2UgZm9yIHNldHRpbmcgdGhlIHZhbHVlIG9mIGEgcGxheWVyIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIEFQSSBtZXRob2QgdG8gY2FsbC5cbiAgICAgKiBAcGFyYW0ge21peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBucG9fc3JjKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgbmFtZSA9IGdldE1ldGhvZE5hbWUobmFtZSwgJ3NldCcpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlcmUgbXVzdCBiZSBhIHZhbHVlIHRvIHNldC4nKTtcbiAgICAgICAgfSAvLyBXZSBhcmUgc3RvcmluZyB0aGUgcmVzb2x2ZS9yZWplY3QgaGFuZGxlcnMgdG8gY2FsbCBsYXRlciwgc28gd2VcbiAgICAgICAgLy8gY2Fu4oCZdCByZXR1cm4gaGVyZS5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByb21pc2UvYWx3YXlzLXJldHVyblxuXG5cbiAgICAgICAgcmV0dXJuIF90aGlzNC5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN0b3JlQ2FsbGJhY2soX3RoaXM0LCBuYW1lLCB7XG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0OiByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwb3N0TWVzc2FnZShfdGhpczQsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuIFdpbGwgY2FsbCB0aGVcbiAgICAgKiBjYWxsYmFjayB3aXRoIGEgc2luZ2xlIHBhcmFtZXRlciwgYGRhdGFgLCB0aGF0IGNvbnRhaW5zIHRoZSBkYXRhIGZvclxuICAgICAqIHRoYXQgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBldmVudCBmaXJlcy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCFldmVudE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBldmVudCBuYW1lLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSBjYWxsYmFjayBmdW5jdGlvbi4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2FsbGJhY2tzID0gZ2V0Q2FsbGJhY2tzKHRoaXMsIFwiZXZlbnQ6XCIuY29uY2F0KGV2ZW50TmFtZSkpO1xuXG4gICAgICBpZiAoY2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNhbGxNZXRob2QoJ2FkZEV2ZW50TGlzdGVuZXInLCBldmVudE5hbWUpLmNhdGNoKGZ1bmN0aW9uICgpIHsvLyBJZ25vcmUgdGhlIGVycm9yLiBUaGVyZSB3aWxsIGJlIGFuIGVycm9yIGV2ZW50IGZpcmVkIHRoYXRcbiAgICAgICAgICAvLyB3aWxsIHRyaWdnZXIgdGhlIGVycm9yIGNhbGxiYWNrIGlmIHRoZXkgYXJlIGxpc3RlbmluZy5cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHN0b3JlQ2FsbGJhY2sodGhpcywgXCJldmVudDpcIi5jb25jYXQoZXZlbnROYW1lKSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuIFdpbGwgcmVtb3ZlIGFsbFxuICAgICAqIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCBpZiBhIGBjYWxsYmFja2AgaXNu4oCZdCBwYXNzZWQsIG9yIG9ubHkgdGhhdFxuICAgICAqIHNwZWNpZmljIGNhbGxiYWNrIGlmIGl0IGlzIHBhc3NlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gVGhlIHNwZWNpZmljIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib2ZmXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIWV2ZW50TmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGV2ZW50IG5hbWUuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxhc3RDYWxsYmFjayA9IHJlbW92ZUNhbGxiYWNrKHRoaXMsIFwiZXZlbnQ6XCIuY29uY2F0KGV2ZW50TmFtZSksIGNhbGxiYWNrKTsgLy8gSWYgdGhlcmUgYXJlIG5vIGNhbGxiYWNrcyBsZWZ0LCByZW1vdmUgdGhlIGxpc3RlbmVyXG5cbiAgICAgIGlmIChsYXN0Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsTWV0aG9kKCdyZW1vdmVFdmVudExpc3RlbmVyJywgZXZlbnROYW1lKS5jYXRjaChmdW5jdGlvbiAoZSkgey8vIElnbm9yZSB0aGUgZXJyb3IuIFRoZXJlIHdpbGwgYmUgYW4gZXJyb3IgZXZlbnQgZmlyZWQgdGhhdFxuICAgICAgICAgIC8vIHdpbGwgdHJpZ2dlciB0aGUgZXJyb3IgY2FsbGJhY2sgaWYgdGhleSBhcmUgbGlzdGVuaW5nLlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGxvYWQgYSBuZXcgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBMb2FkVmlkZW9Qcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHZpZGVvIHdpdGggdGhpcyBpZCBzdWNjZXNzZnVsbHkgbG9hZGVkLlxuICAgICAqIEByZWplY3Qge1R5cGVFcnJvcn0gVGhlIGlkIHdhcyBub3QgYSBudW1iZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgbmV3IHZpZGVvIGludG8gdGhpcyBlbWJlZC4gVGhlIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCBpZlxuICAgICAqIHRoZSB2aWRlbyBpcyBzdWNjZXNzZnVsbHkgbG9hZGVkLCBvciBpdCB3aWxsIGJlIHJlamVjdGVkIGlmIGl0IGNvdWxkXG4gICAgICogbm90IGJlIGxvYWRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfG9iamVjdH0gb3B0aW9ucyBUaGUgaWQgb2YgdGhlIHZpZGVvIG9yIGFuIG9iamVjdCB3aXRoIGVtYmVkIG9wdGlvbnMuXG4gICAgICogQHJldHVybiB7TG9hZFZpZGVvUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxvYWRWaWRlb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkVmlkZW8ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnbG9hZFZpZGVvJywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBwZXJmb3JtIGFuIGFjdGlvbiB3aGVuIHRoZSBQbGF5ZXIgaXMgcmVhZHkuXG4gICAgICpcbiAgICAgKiBAdG9kbyBkb2N1bWVudCBlcnJvcnNcbiAgICAgKiBAcHJvbWlzZSBMb2FkVmlkZW9Qcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3ZvaWR9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGEgZnVuY3Rpb24gd2hlbiB0aGUgcGxheWVyIGlmcmFtZSBoYXMgaW5pdGlhbGl6ZWQuIFlvdSBkbyBub3RcbiAgICAgKiBuZWVkIHRvIHdhaXQgZm9yIGByZWFkeWAgdG8gdHJpZ2dlciB0byBiZWdpbiBhZGRpbmcgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogb3IgY2FsbGluZyBvdGhlciBtZXRob2RzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UmVhZHlQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVhZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICB2YXIgcmVhZHlQcm9taXNlID0gcmVhZHlNYXAuZ2V0KHRoaXMpIHx8IG5ldyBucG9fc3JjKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVW5rbm93biBwbGF5ZXIuIFByb2JhYmx5IHVubG9hZGVkLicpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5wb19zcmMucmVzb2x2ZShyZWFkeVByb21pc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gYWRkIGEgY3VlIHBvaW50IHRvIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBBZGRDdWVQb2ludFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7c3RyaW5nfSBUaGUgaWQgb2YgdGhlIGN1ZSBwb2ludCB0byB1c2UgZm9yIHJlbW92ZUN1ZVBvaW50LlxuICAgICAqIEByZWplY3Qge1JhbmdlRXJyb3J9IHRoZSB0aW1lIHdhcyBsZXNzIHRoYW4gMCBvciBncmVhdGVyIHRoYW4gdGhlXG4gICAgICogICAgICAgICB2aWRlb+KAmXMgZHVyYXRpb24uXG4gICAgICogQHJlamVjdCB7VW5zdXBwb3J0ZWRFcnJvcn0gQ3VlIHBvaW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRoZSBjdXJyZW50XG4gICAgICogICAgICAgICBwbGF5ZXIgb3IgYnJvd3Nlci5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGN1ZSBwb2ludCB0byB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgVGhlIHRpbWUgZm9yIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSBBcmJpdHJhcnkgZGF0YSB0byBiZSByZXR1cm5lZCB3aXRoIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHJldHVybiB7QWRkQ3VlUG9pbnRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkQ3VlUG9pbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ3VlUG9pbnQodGltZSkge1xuICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnYWRkQ3VlUG9pbnQnLCB7XG4gICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gcmVtb3ZlIGEgY3VlIHBvaW50IGZyb20gdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEFkZEN1ZVBvaW50UHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBpZCBvZiB0aGUgY3VlIHBvaW50IHRoYXQgd2FzIHJlbW92ZWQuXG4gICAgICogQHJlamVjdCB7SW52YWxpZEN1ZVBvaW50fSBUaGUgY3VlIHBvaW50IHdpdGggdGhlIHNwZWNpZmllZCBpZCB3YXMgbm90XG4gICAgICogICAgICAgICBmb3VuZC5cbiAgICAgKiBAcmVqZWN0IHtVbnN1cHBvcnRlZEVycm9yfSBDdWUgcG9pbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAgKiAgICAgICAgIHBsYXllciBvciBicm93c2VyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgY3VlIHBvaW50IGZyb20gdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgY3VlIHBvaW50IHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtSZW1vdmVDdWVQb2ludFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVDdWVQb2ludFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVDdWVQb2ludChpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgncmVtb3ZlQ3VlUG9pbnQnLCBpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSB0ZXh0IHRyYWNrIG9uIGEgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBWaW1lb1RleHRUcmFja1xuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgSVNPIGxhbmd1YWdlIGNvZGUuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGtpbmQgVGhlIGtpbmQgb2YgdHJhY2sgaXQgaXMgKGNhcHRpb25zIG9yIHN1YnRpdGxlcykuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGxhYmVsIFRoZSBodW1hbuKAkHJlYWRhYmxlIGxhYmVsIGZvciB0aGUgdHJhY2suXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZW5hYmxlIGEgdGV4dCB0cmFjay5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEVuYWJsZVRleHRUcmFja1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7VmltZW9UZXh0VHJhY2t9IFRoZSB0ZXh0IHRyYWNrIHRoYXQgd2FzIGVuYWJsZWQuXG4gICAgICogQHJlamVjdCB7SW52YWxpZFRyYWNrTGFuZ3VhZ2VFcnJvcn0gTm8gdHJhY2sgd2FzIGF2YWlsYWJsZSB3aXRoIHRoZVxuICAgICAqICAgICAgICAgc3BlY2lmaWVkIGxhbmd1YWdlLlxuICAgICAqIEByZWplY3Qge0ludmFsaWRUcmFja0Vycm9yfSBObyB0cmFjayB3YXMgYXZhaWxhYmxlIHdpdGggdGhlIHNwZWNpZmllZFxuICAgICAqICAgICAgICAgbGFuZ3VhZ2UgYW5kIGtpbmQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhlIHRleHQgdHJhY2sgd2l0aCB0aGUgc3BlY2lmaWVkIGxhbmd1YWdlLCBhbmQgb3B0aW9uYWxseSB0aGVcbiAgICAgKiBzcGVjaWZpZWQga2luZCAoY2FwdGlvbnMgb3Igc3VidGl0bGVzKS5cbiAgICAgKlxuICAgICAqIFdoZW4gc2V0IHZpYSB0aGUgQVBJLCB0aGUgdHJhY2sgbGFuZ3VhZ2Ugd2lsbCBub3QgY2hhbmdlIHRoZSB2aWV3ZXLigJlzXG4gICAgICogc3RvcmVkIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIHR3b+KAkGxldHRlciBsYW5ndWFnZSBjb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBba2luZF0gVGhlIGtpbmQgb2YgdHJhY2sgdG8gZW5hYmxlIChjYXB0aW9ucyBvciBzdWJ0aXRsZXMpLlxuICAgICAqIEByZXR1cm4ge0VuYWJsZVRleHRUcmFja1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVUZXh0VHJhY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlVGV4dFRyYWNrKGxhbmd1YWdlLCBraW5kKSB7XG4gICAgICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSBsYW5ndWFnZS4nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgnZW5hYmxlVGV4dFRyYWNrJywge1xuICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UsXG4gICAgICAgIGtpbmQ6IGtpbmRcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZGlzYWJsZSB0aGUgYWN0aXZlIHRleHQgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBEaXNhYmxlVGV4dFRyYWNrUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHt2b2lkfSBUaGUgdHJhY2sgd2FzIGRpc2FibGVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB0aGUgY3VycmVudGx5LWFjdGl2ZSB0ZXh0IHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RGlzYWJsZVRleHRUcmFja1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkaXNhYmxlVGV4dFRyYWNrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGVUZXh0VHJhY2soKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdkaXNhYmxlVGV4dFRyYWNrJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBwYXVzZSB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBQYXVzZVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7dm9pZH0gVGhlIHZpZGVvIHdhcyBwYXVzZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB0aGUgdmlkZW8gaWYgaXTigJlzIHBsYXlpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQYXVzZVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJwYXVzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ3BhdXNlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBwbGF5IHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFBsYXlQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3ZvaWR9IFRoZSB2aWRlbyB3YXMgcGxheWVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUGxheSB0aGUgdmlkZW8gaWYgaXTigJlzIHBhdXNlZC4gKipOb3RlOioqIG9uIGlPUyBhbmQgc29tZSBvdGhlclxuICAgICAqIG1vYmlsZSBkZXZpY2VzLCB5b3UgY2Fubm90IHByb2dyYW1tYXRpY2FsbHkgdHJpZ2dlciBwbGF5LiBPbmNlIHRoZVxuICAgICAqIHZpZXdlciBoYXMgdGFwcGVkIG9uIHRoZSBwbGF5IGJ1dHRvbiBpbiB0aGUgcGxheWVyLCBob3dldmVyLCB5b3VcbiAgICAgKiB3aWxsIGJlIGFibGUgdG8gdXNlIHRoaXMgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQbGF5UHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInBsYXlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxNZXRob2QoJ3BsYXknKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0aGF0IHRoZSBwbGF5ZXIgZW50ZXJzIGZ1bGxzY3JlZW4uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlcXVlc3RGdWxsc2NyZWVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RGdWxsc2NyZWVuKCkge1xuICAgICAgaWYgKHNjcmVlbmZ1bGwuaXNFbmFibGVkKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW5mdWxsLnJlcXVlc3QodGhpcy5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgncmVxdWVzdEZ1bGxzY3JlZW4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0aGF0IHRoZSBwbGF5ZXIgZXhpdHMgZnVsbHNjcmVlbi5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZXhpdEZ1bGxzY3JlZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4oKSB7XG4gICAgICBpZiAoc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbmZ1bGwuZXhpdCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jYWxsTWV0aG9kKCdleGl0RnVsbHNjcmVlbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBsYXllciBpcyBjdXJyZW50bHkgZnVsbHNjcmVlbi5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RnVsbHNjcmVlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGdWxsc2NyZWVuKCkge1xuICAgICAgaWYgKHNjcmVlbmZ1bGwuaXNFbmFibGVkKSB7XG4gICAgICAgIHJldHVybiBucG9fc3JjLnJlc29sdmUoc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2Z1bGxzY3JlZW4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHVubG9hZCB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBVbmxvYWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3ZvaWR9IFRoZSB2aWRlbyB3YXMgdW5sb2FkZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHBsYXllciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1VubG9hZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1bmxvYWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5sb2FkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbE1ldGhvZCgndW5sb2FkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFudXAgdGhlIHBsYXllciBhbmQgcmVtb3ZlIGl0IGZyb20gdGhlIERPTVxuICAgICAqXG4gICAgICogSXQgd29uJ3QgYmUgdXNhYmxlIGFuZCBhIG5ldyBvbmUgc2hvdWxkIGJlIGNvbnN0cnVjdGVkXG4gICAgICogIGluIG9yZGVyIHRvIGRvIGFueSBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IG5wb19zcmMoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmVhZHlNYXAuZGVsZXRlKF90aGlzNSk7XG4gICAgICAgIHBsYXllck1hcC5kZWxldGUoX3RoaXM1LmVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChfdGhpczUuX29yaWdpbmFsRWxlbWVudCkge1xuICAgICAgICAgIHBsYXllck1hcC5kZWxldGUoX3RoaXM1Ll9vcmlnaW5hbEVsZW1lbnQpO1xuXG4gICAgICAgICAgX3RoaXM1Ll9vcmlnaW5hbEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXZpbWVvLWluaXRpYWxpemVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3RoaXM1LmVsZW1lbnQgJiYgX3RoaXM1LmVsZW1lbnQubm9kZU5hbWUgPT09ICdJRlJBTUUnICYmIF90aGlzNS5lbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBfdGhpczUuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzNS5lbGVtZW50KTtcbiAgICAgICAgfSAvLyBJZiB0aGUgY2xpcCBpcyBwcml2YXRlIHRoZXJlIGlzIGEgY2FzZSB3aGVyZSB0aGUgZWxlbWVudCBzdGF5cyB0aGVcbiAgICAgICAgLy8gZGl2IGVsZW1lbnQuIERlc3Ryb3kgc2hvdWxkIHJlc2V0IHRoZSBkaXYgYW5kIHJlbW92ZSB0aGUgaWZyYW1lIGNoaWxkLlxuXG5cbiAgICAgICAgaWYgKF90aGlzNS5lbGVtZW50ICYmIF90aGlzNS5lbGVtZW50Lm5vZGVOYW1lID09PSAnRElWJyAmJiBfdGhpczUuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgX3RoaXM1LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXZpbWVvLWluaXRpYWxpemVkJyk7XG5cbiAgICAgICAgICB2YXIgaWZyYW1lID0gX3RoaXM1LmVsZW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG5cbiAgICAgICAgICBpZiAoaWZyYW1lICYmIGlmcmFtZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzNS5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfdGhpczUuX29uTWVzc2FnZSk7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRBdXRvcGF1c2VQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge2Jvb2xlYW59IFdoZXRoZXIgYXV0b3BhdXNlIGlzIHR1cm5lZCBvbiBvciBvZmYuXG4gICAgICogQHJlamVjdCB7VW5zdXBwb3J0ZWRFcnJvcn0gQXV0b3BhdXNlIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgICAqICAgICAgICAgcGxheWVyIG9yIGJyb3dzZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBmb3IgdGhpcyBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRBdXRvcGF1c2VQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXV0b3BhdXNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEF1dG9wYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnYXV0b3BhdXNlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGF1dG9wYXVzZSBiZWhhdmlvciBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRBdXRvcGF1c2VQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge2Jvb2xlYW59IFdoZXRoZXIgYXV0b3BhdXNlIGlzIHR1cm5lZCBvbiBvciBvZmYuXG4gICAgICogQHJlamVjdCB7VW5zdXBwb3J0ZWRFcnJvcn0gQXV0b3BhdXNlIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aCB0aGUgY3VycmVudFxuICAgICAqICAgICAgICAgcGxheWVyIG9yIGJyb3dzZXIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgb3IgZGlzYWJsZSB0aGUgYXV0b3BhdXNlIGJlaGF2aW9yIG9mIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgd2hlbiBhbm90aGVyIHZpZGVvIGlzIHBsYXllZCBpbiB0aGUgc2FtZSBicm93c2VyLCB0aGlzXG4gICAgICogcGxheWVyIHdpbGwgYXV0b21hdGljYWxseSBwYXVzZS4gVW5sZXNzIHlvdSBoYXZlIGEgc3BlY2lmaWMgcmVhc29uXG4gICAgICogZm9yIGRvaW5nIHNvLCB3ZSByZWNvbW1lbmQgdGhhdCB5b3UgbGVhdmUgYXV0b3BhdXNlIHNldCB0byB0aGVcbiAgICAgKiBkZWZhdWx0IChgdHJ1ZWApLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvcGF1c2VcbiAgICAgKiBAcmV0dXJuIHtTZXRBdXRvcGF1c2VQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2V0QXV0b3BhdXNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEF1dG9wYXVzZShhdXRvcGF1c2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldCgnYXV0b3BhdXNlJywgYXV0b3BhdXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgYnVmZmVyZWQgcHJvcGVydHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0QnVmZmVyZWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBCdWZmZXJlZCBUaW1lcmFuZ2VzIGNvbnZlcnRlZCB0byBhbiBBcnJheS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnVmZmVyZWQgcHJvcGVydHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0QnVmZmVyZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QnVmZmVyZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QnVmZmVyZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2J1ZmZlcmVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IENhbWVyYVByb3BlcnRpZXNcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwcm9wcy55YXcgLSBOdW1iZXIgYmV0d2VlbiAwIGFuZCAzNjAuXG4gICAgICogQHByb3Age251bWJlcn0gcHJvcHMucGl0Y2ggLSBOdW1iZXIgYmV0d2VlbiAtOTAgYW5kIDkwLlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHByb3BzLnJvbGwgLSBOdW1iZXIgYmV0d2VlbiAtMTgwIGFuZCAxODAuXG4gICAgICogQHByb3Age251bWJlcn0gcHJvcHMuZm92IC0gVGhlIGZpZWxkIG9mIHZpZXcgaW4gZGVncmVlcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGNhbWVyYSBwcm9wZXJ0aWVzIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRDYW1lcmFQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0NhbWVyYVByb3BlcnRpZXN9IFRoZSBjYW1lcmEgcHJvcGVydGllcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEZvciAzNjDCsCB2aWRlb3MgZ2V0IHRoZSBjYW1lcmEgcHJvcGVydGllcyBmb3IgdGhpcyBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRDYW1lcmFQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2FtZXJhUHJvcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2FtZXJhUHJvcHMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NhbWVyYVByb3BzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGNhbWVyYSBwcm9wZXJ0aWVzIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDYW1lcmFQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge09iamVjdH0gVGhlIGNhbWVyYSB3YXMgc3VjY2Vzc2Z1bGx5IHNldC5cbiAgICAgKiBAcmVqZWN0IHtSYW5nZUVycm9yfSBUaGUgcmFuZ2Ugd2FzIG91dCBvZiBib3VuZHMuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBGb3IgMzYwwrAgdmlkZW9zIHNldCB0aGUgY2FtZXJhIHByb3BlcnRpZXMgZm9yIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDYW1lcmFQcm9wZXJ0aWVzfSBjYW1lcmEgVGhlIGNhbWVyYSBwcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7U2V0Q2FtZXJhUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldENhbWVyYVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENhbWVyYVByb3BzKGNhbWVyYSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdjYW1lcmFQcm9wcycsIGNhbWVyYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBjaGFwdGVyLlxuICAgICAqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gVmltZW9DaGFwdGVyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXJ0VGltZSBUaGUgc3RhcnQgdGltZSBvZiB0aGUgY2hhcHRlci5cbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBjaGFwdGVyLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleCBUaGUgcGxhY2UgaW4gdGhlIG9yZGVyIG9mIENoYXB0ZXJzLiBTdGFydHMgYXQgMS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgY2hhcHRlcnMgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldENoYXB0ZXJzUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtWaW1lb0NoYXB0ZXJbXX0gVGhlIGNoYXB0ZXJzIGZvciB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIHRoZSBjaGFwdGVycyBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q2hhcHRlcnNQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2hhcHRlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hhcHRlcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NoYXB0ZXJzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgY2hhcHRlci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldEN1cnJlbnRDaGFwdGVyc1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7VmltZW9DaGFwdGVyfHVuZGVmaW5lZH0gVGhlIGN1cnJlbnQgY2hhcHRlciBmb3IgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGNoYXB0ZXIgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldEN1cnJlbnRDaGFwdGVyc1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdXJyZW50Q2hhcHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50Q2hhcHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnY3VycmVudENoYXB0ZXInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY29sb3Igb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldENvbG9yUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBoZXggY29sb3Igb2YgdGhlIHBsYXllci5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sb3IgZm9yIHRoaXMgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q29sb3JQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q29sb3JcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29sb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2NvbG9yJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGNvbG9yIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDb2xvclByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7c3RyaW5nfSBUaGUgY29sb3Igd2FzIHN1Y2Nlc3NmdWxseSBzZXQuXG4gICAgICogQHJlamVjdCB7VHlwZUVycm9yfSBUaGUgc3RyaW5nIHdhcyBub3QgYSB2YWxpZCBoZXggb3IgcmdiIGNvbG9yLlxuICAgICAqIEByZWplY3Qge0NvbnRyYXN0RXJyb3J9IFRoZSBjb2xvciB3YXMgc2V0LCBidXQgdGhlIGNvbnRyYXN0IGlzXG4gICAgICogICAgICAgICBvdXRzaWRlIG9mIHRoZSBhY2NlcHRhYmxlIHJhbmdlLlxuICAgICAqIEByZWplY3Qge0VtYmVkU2V0dGluZ3NFcnJvcn0gVGhlIG93bmVyIG9mIHRoZSBwbGF5ZXIgaGFzIGNob3NlbiB0b1xuICAgICAqICAgICAgICAgdXNlIGEgc3BlY2lmaWMgY29sb3IuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbG9yIG9mIHRoaXMgcGxheWVyIHRvIGEgaGV4IG9yIHJnYiBzdHJpbmcuIFNldHRpbmcgdGhlXG4gICAgICogY29sb3IgbWF5IGZhaWwgaWYgdGhlIG93bmVyIG9mIHRoZSB2aWRlbyBoYXMgc2V0IHRoZWlyIGVtYmVkXG4gICAgICogcHJlZmVyZW5jZXMgdG8gZm9yY2UgYSBzcGVjaWZpYyBjb2xvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciBUaGUgaGV4IG9yIHJnYiBjb2xvciBzdHJpbmcgdG8gc2V0LlxuICAgICAqIEByZXR1cm4ge1NldENvbG9yUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldENvbG9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2NvbG9yJywgY29sb3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHJlcHJlc2VudGF0aW9uIG9mIGEgY3VlIHBvaW50LlxuICAgICAqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gVmltZW9DdWVQb2ludFxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lIFRoZSB0aW1lIG9mIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGEgVGhlIGRhdGEgcGFzc2VkIHdoZW4gYWRkaW5nIHRoZSBjdWUgcG9pbnQuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGlkIFRoZSB1bmlxdWUgaWQgZm9yIHVzZSB3aXRoIHJlbW92ZUN1ZVBvaW50LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY3VlIHBvaW50cyBvZiBhIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0Q3VlUG9pbnRzUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtWaW1lb0N1ZVBvaW50W119IFRoZSBjdWUgcG9pbnRzIGFkZGVkIHRvIHRoZSB2aWRlby5cbiAgICAgKiBAcmVqZWN0IHtVbnN1cHBvcnRlZEVycm9yfSBDdWUgcG9pbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAgKiAgICAgICAgIHBsYXllciBvciBicm93c2VyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGFycmF5IG9mIHRoZSBjdWUgcG9pbnRzIGFkZGVkIHRvIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldEN1ZVBvaW50c1Byb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdWVQb2ludHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q3VlUG9pbnRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdjdWVQb2ludHMnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldEN1cnJlbnRUaW1lUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpbiBzZWNvbmRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0Q3VycmVudFRpbWVQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q3VycmVudFRpbWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2N1cnJlbnRUaW1lJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBzZXQgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRDdXJyZW50VGltZVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgYWN0dWFsIGN1cnJlbnQgdGltZSB0aGF0IHdhcyBzZXQuXG4gICAgICogQHJlamVjdCB7UmFuZ2VFcnJvcn0gdGhlIHRpbWUgd2FzIGxlc3MgdGhhbiAwIG9yIGdyZWF0ZXIgdGhhbiB0aGVcbiAgICAgKiAgICAgICAgIHZpZGVv4oCZcyBkdXJhdGlvbi5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpbiBzZWNvbmRzLiBJZiB0aGUgcGxheWVyIHdhc1xuICAgICAqIHBhdXNlZCwgaXQgd2lsbCByZW1haW4gcGF1c2VkLiBMaWtld2lzZSwgaWYgdGhlIHBsYXllciB3YXMgcGxheWluZyxcbiAgICAgKiBpdCB3aWxsIHJlc3VtZSBwbGF5aW5nIG9uY2UgdGhlIHZpZGVvIGhhcyBidWZmZXJlZC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcHJvdmlkZSBhbiBhY2N1cmF0ZSB0aW1lIGFuZCB0aGUgcGxheWVyIHdpbGwgYXR0ZW1wdCB0byBzZWVrXG4gICAgICogdG8gYXMgY2xvc2UgdG8gdGhhdCB0aW1lIGFzIHBvc3NpYmxlLiBUaGUgZXhhY3QgdGltZSB3aWxsIGJlIHRoZVxuICAgICAqIGZ1bGZpbGxlZCB2YWx1ZSBvZiB0aGUgcHJvbWlzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50VGltZVxuICAgICAqIEByZXR1cm4ge1NldEN1cnJlbnRUaW1lUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldEN1cnJlbnRUaW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEN1cnJlbnRUaW1lKGN1cnJlbnRUaW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2N1cnJlbnRUaW1lJywgY3VycmVudFRpbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXREdXJhdGlvblByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgZHVyYXRpb24gaW4gc2Vjb25kcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvIGluIHNlY29uZHMuIEl0IHdpbGwgYmUgcm91bmRlZCB0byB0aGVcbiAgICAgKiBuZWFyZXN0IHNlY29uZCBiZWZvcmUgcGxheWJhY2sgYmVnaW5zLCBhbmQgdG8gdGhlIG5lYXJlc3QgdGhvdXNhbmR0aFxuICAgICAqIG9mIGEgc2Vjb25kIGFmdGVyIHBsYXliYWNrIGJlZ2lucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldER1cmF0aW9uUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldER1cmF0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldER1cmF0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdkdXJhdGlvbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBlbmRlZCBzdGF0ZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRFbmRlZFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHZpZGVvIGhhcyBlbmRlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZW5kZWQgc3RhdGUgb2YgdGhlIHZpZGVvLiBUaGUgdmlkZW8gaGFzIGVuZGVkIGlmXG4gICAgICogYGN1cnJlbnRUaW1lID09PSBkdXJhdGlvbmAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRFbmRlZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRFbmRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbmRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnZW5kZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHBsYXllciBpcyBzZXQgdG8gbG9vcC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0TG9vcFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRMb29wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldExvb3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2xvb3AnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgbG9vcCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgU2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gVGhlIGxvb3Agc3RhdGUgdGhhdCB3YXMgc2V0LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsb29wIHN0YXRlIG9mIHRoZSBwbGF5ZXIuIFdoZW4gc2V0IHRvIGB0cnVlYCwgdGhlIHBsYXllclxuICAgICAqIHdpbGwgc3RhcnQgb3ZlciBpbW1lZGlhdGVseSBvbmNlIHBsYXliYWNrIGVuZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvb3BcbiAgICAgKiBAcmV0dXJuIHtTZXRMb29wUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldExvb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TG9vcChsb29wKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ2xvb3AnLCBsb29wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgbXV0ZWQgc3RhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldE11dGVkUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBUaGUgbXV0ZWQgc3RhdGUgdGhhdCB3YXMgc2V0LlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtdXRlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLiBXaGVuIHNldCB0byBgdHJ1ZWAsIHRoZSBwbGF5ZXJcbiAgICAgKiB2b2x1bWUgd2lsbCBiZSBtdXRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbXV0ZWRcbiAgICAgKiBAcmV0dXJuIHtTZXRNdXRlZFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRNdXRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRNdXRlZChtdXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdtdXRlZCcsIG11dGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgbXV0ZWQgc3RhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldE11dGVkUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgcGxheWVyIGlzIG11dGVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtdXRlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0TXV0ZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0TXV0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TXV0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ211dGVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHBhdXNlZCBzdGF0ZSBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0TG9vcFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHZpZGVvIGlzIHBhdXNlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGF1c2VkIHN0YXRlIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRMb29wUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFBhdXNlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQYXVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3BhdXNlZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBwbGF5YmFjayByYXRlIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRQbGF5YmFja1JhdGVQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHBsYXliYWNrIHJhdGUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gMC41IHRvIDIuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYXliYWNrIHJhdGUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gYDAuNWAgdG8gYDJgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UGxheWJhY2tSYXRlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFBsYXliYWNrUmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQbGF5YmFja1JhdGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3BsYXliYWNrUmF0ZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gc2V0IHRoZSBwbGF5YmFja3JhdGUgb2YgdGhlIHBsYXllci5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldFBsYXliYWNrUmF0ZVByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgcGxheWJhY2sgcmF0ZSB3YXMgc2V0LlxuICAgICAqIEByZWplY3Qge1JhbmdlRXJyb3J9IFRoZSBwbGF5YmFjayByYXRlIHdhcyBsZXNzIHRoYW4gMC41IG9yIGdyZWF0ZXIgdGhhbiAyLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwbGF5YmFjayByYXRlIG9mIHRoZSBwbGF5ZXIgb24gYSBzY2FsZSBmcm9tIGAwLjVgIHRvIGAyYC4gV2hlbiBzZXRcbiAgICAgKiB2aWEgdGhlIEFQSSwgdGhlIHBsYXliYWNrIHJhdGUgd2lsbCBub3QgYmUgc3luY2hyb25pemVkIHRvIG90aGVyXG4gICAgICogcGxheWVycyBvciBzdG9yZWQgYXMgdGhlIHZpZXdlcidzIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGxheWJhY2tSYXRlXG4gICAgICogQHJldHVybiB7U2V0UGxheWJhY2tSYXRlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldFBsYXliYWNrUmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ3BsYXliYWNrUmF0ZScsIHBsYXliYWNrUmF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHBsYXllZCBwcm9wZXJ0eSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRQbGF5ZWRQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBQbGF5ZWQgVGltZXJhbmdlcyBjb252ZXJ0ZWQgdG8gYW4gQXJyYXkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsYXllZCBwcm9wZXJ0eSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRQbGF5ZWRQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UGxheWVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBsYXllZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgncGxheWVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHF1YWxpdGllcyBhdmFpbGFibGUgb2YgdGhlIGN1cnJlbnQgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRRdWFsaXRpZXNQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge0FycmF5fSBUaGUgcXVhbGl0aWVzIG9mIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcXVhbGl0aWVzIG9mIHRoZSBjdXJyZW50IHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UXVhbGl0aWVzUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFF1YWxpdGllc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRRdWFsaXRpZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3F1YWxpdGllcycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBjdXJyZW50IHNldCBxdWFsaXR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFF1YWxpdHlQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge3N0cmluZ30gVGhlIGN1cnJlbnQgc2V0IHF1YWxpdHkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2V0IHF1YWxpdHkgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0UXVhbGl0eVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRRdWFsaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFF1YWxpdHkoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3F1YWxpdHknKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgdmlkZW8gcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIFNldFF1YWxpdHlQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHF1YWxpdHkgd2FzIHNldC5cbiAgICAgKiBAcmVqZWN0IHtSYW5nZUVycm9yfSBUaGUgcXVhbGl0eSBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgdmlkZW8gcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWFsaXR5XG4gICAgICogQHJldHVybiB7U2V0UXVhbGl0eVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzZXRRdWFsaXR5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFF1YWxpdHkocXVhbGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KCdxdWFsaXR5JywgcXVhbGl0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHNlZWthYmxlIHByb3BlcnR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFNlZWthYmxlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtBcnJheX0gU2Vla2FibGUgVGltZXJhbmdlcyBjb252ZXJ0ZWQgdG8gYW4gQXJyYXkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlZWthYmxlIHByb3BlcnR5IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFNlZWthYmxlUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFNlZWthYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNlZWthYmxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdzZWVrYWJsZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBzZWVraW5nIHByb3BlcnR5IG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRTZWVraW5nUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgcGxheWVyIGlzIGN1cnJlbnRseSBzZWVraW5nLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGlmIHRoZSBwbGF5ZXIgaXMgY3VycmVudGx5IHNlZWtpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRTZWVraW5nUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFNlZWtpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2Vla2luZygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnc2Vla2luZycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSB0ZXh0IHRyYWNrcyBvZiBhIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VGV4dFRyYWNrc1Byb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7VmltZW9UZXh0VHJhY2tbXX0gVGhlIHRleHQgdHJhY2tzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXJyYXkgb2YgdGhlIHRleHQgdHJhY2tzIHRoYXQgZXhpc3QgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFRleHRUcmFja3NQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VGV4dFRyYWNrc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUZXh0VHJhY2tzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd0ZXh0VHJhY2tzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIGVtYmVkIGNvZGUgZm9yIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFZpZGVvRW1iZWRDb2RlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtzdHJpbmd9IFRoZSBgPGlmcmFtZT5gIGVtYmVkIGNvZGUgZm9yIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYDxpZnJhbWU+YCBlbWJlZCBjb2RlIGZvciB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0VtYmVkQ29kZVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWaWRlb0VtYmVkQ29kZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb0VtYmVkQ29kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9FbWJlZENvZGUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgaWQgb2YgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VmlkZW9JZFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7bnVtYmVyfSBUaGUgaWQgb2YgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpZCBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0lkUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFZpZGVvSWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9JZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9JZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSB0aXRsZSBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRWaWRlb1RpdGxlUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSB0aXRsZSBvZiB0aGUgdmlkZW8uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpdGxlIG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFZpZGVvVGl0bGVQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VmlkZW9UaXRsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb1RpdGxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd2aWRlb1RpdGxlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIG5hdGl2ZSB3aWR0aCBvZiB0aGUgdmlkZW8uXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBHZXRWaWRlb1dpZHRoUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBuYXRpdmUgd2lkdGggb2YgdGhlIHZpZGVvLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuYXRpdmUgd2lkdGggb2YgdGhlIGN1cnJlbnRseeKAkHBsYXlpbmcgdmlkZW8uIFRoZSB3aWR0aCBvZlxuICAgICAqIHRoZSBoaWdoZXN04oCQcmVzb2x1dGlvbiBhdmFpbGFibGUgd2lsbCBiZSB1c2VkIGJlZm9yZSBwbGF5YmFjayBiZWdpbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb1dpZHRoUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImdldFZpZGVvV2lkdGhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9XaWR0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9XaWR0aCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdG8gZ2V0IHRoZSBuYXRpdmUgaGVpZ2h0IG9mIHRoZSB2aWRlby5cbiAgICAgKlxuICAgICAqIEBwcm9taXNlIEdldFZpZGVvSGVpZ2h0UHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSBuYXRpdmUgaGVpZ2h0IG9mIHRoZSB2aWRlby5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmF0aXZlIGhlaWdodCBvZiB0aGUgY3VycmVudGx54oCQcGxheWluZyB2aWRlby4gVGhlIGhlaWdodCBvZlxuICAgICAqIHRoZSBoaWdoZXN04oCQcmVzb2x1dGlvbiBhdmFpbGFibGUgd2lsbCBiZSB1c2VkIGJlZm9yZSBwbGF5YmFjayBiZWdpbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtHZXRWaWRlb0hlaWdodFByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWaWRlb0hlaWdodFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaWRlb0hlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndmlkZW9IZWlnaHQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIGdldCB0aGUgdmltZW8uY29tIHVybCBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0VmlkZW9VcmxQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHZpbWVvLmNvbSB1cmwgZm9yIHRoZSB2aWRlby5cbiAgICAgKiBAcmVqZWN0IHtQcml2YWN5RXJyb3J9IFRoZSB1cmwgaXNu4oCZdCBhdmFpbGFibGUgYmVjYXVzZSBvZiB0aGUgdmlkZW/igJlzIHByaXZhY3kgc2V0dGluZy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmltZW8uY29tIHVybCBmb3IgdGhlIHZpZGVvLlxuICAgICAqXG4gICAgICogQHJldHVybiB7R2V0VmlkZW9VcmxQcm9taXNlfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VmlkZW9VcmxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9VcmwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3ZpZGVvVXJsJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0byBnZXQgdGhlIHZvbHVtZSBsZXZlbCBvZiB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHByb21pc2UgR2V0Vm9sdW1lUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtudW1iZXJ9IFRoZSB2b2x1bWUgbGV2ZWwgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gMCB0byAxLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHZvbHVtZSBsZXZlbCBvZiB0aGUgcGxheWVyIG9uIGEgc2NhbGUgZnJvbSBgMGAgdG8gYDFgLlxuICAgICAqXG4gICAgICogTW9zdCBtb2JpbGUgZGV2aWNlcyBkbyBub3Qgc3VwcG9ydCBhbiBpbmRlcGVuZGVudCB2b2x1bWUgZnJvbSB0aGVcbiAgICAgKiBzeXN0ZW0gdm9sdW1lLiBJbiB0aG9zZSBjYXNlcywgdGhpcyBtZXRob2Qgd2lsbCBhbHdheXMgcmV0dXJuIGAxYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0dldFZvbHVtZVByb21pc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRWb2x1bWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Vm9sdW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd2b2x1bWUnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRvIHNldCB0aGUgdm9sdW1lIGxldmVsIG9mIHRoZSBwbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcHJvbWlzZSBTZXRWb2x1bWVQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge251bWJlcn0gVGhlIHZvbHVtZSB3YXMgc2V0LlxuICAgICAqIEByZWplY3Qge1JhbmdlRXJyb3J9IFRoZSB2b2x1bWUgd2FzIGxlc3MgdGhhbiAwIG9yIGdyZWF0ZXIgdGhhbiAxLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2b2x1bWUgb2YgdGhlIHBsYXllciBvbiBhIHNjYWxlIGZyb20gYDBgIHRvIGAxYC4gV2hlbiBzZXRcbiAgICAgKiB2aWEgdGhlIEFQSSwgdGhlIHZvbHVtZSBsZXZlbCB3aWxsIG5vdCBiZSBzeW5jaHJvbml6ZWQgdG8gb3RoZXJcbiAgICAgKiBwbGF5ZXJzIG9yIHN0b3JlZCBhcyB0aGUgdmlld2Vy4oCZcyBwcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogTW9zdCBtb2JpbGUgZGV2aWNlcyBkbyBub3Qgc3VwcG9ydCBzZXR0aW5nIHRoZSB2b2x1bWUuIEFuIGVycm9yIHdpbGxcbiAgICAgKiAqbm90KiBiZSB0cmlnZ2VyZWQgaW4gdGhhdCBzaXR1YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdm9sdW1lXG4gICAgICogQHJldHVybiB7U2V0Vm9sdW1lUHJvbWlzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNldFZvbHVtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoJ3ZvbHVtZScsIHZvbHVtZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBsYXllcjtcbn0oKTsgLy8gU2V0dXAgZW1iZWQgb25seSBpZiB0aGlzIGlzIG5vdCBhIG5vZGUgZW52aXJvbm1lbnRcblxuXG5pZiAoIWlzTm9kZSkge1xuICBzY3JlZW5mdWxsID0gaW5pdGlhbGl6ZVNjcmVlbmZ1bGwoKTtcbiAgaW5pdGlhbGl6ZUVtYmVkcygpO1xuICByZXNpemVFbWJlZHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiPGRpdiBpZD1cImFnZW5kYS1pbnRlcmFjdGl2YVwiIGNsYXNzPVwibW9kYWxcIj5cclxuICAgIDxkaXYgb246Y2xpY2s9e2Nsb3NlTW9kYWx9IGNsYXNzPVwibW9kYWwtYmFja2dyb3VuZFwiPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW9uZS10aGlyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZWRpYVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWxlZnQgaGFzLXRleHQtcHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJpbWFnZSBpcy02NHg2NFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBkYXRhLWZlYXRoZXI9XCJjYWxlbmRhclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudCBoYXMtbWFyZ2luLWJvdHRvbS0yMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwiaGFzLXRleHQtcHJpbWFyeSBoYXMtbWFyZ2luLWJvdHRvbS0xMFwiPkFjdG9zIFByb3RvY29sYXJpb3MgLSBJbnN0YWxhY2nDs248L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGlzLXByaW1hcnkgaXMtb3V0bGluZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cImNsb2NrXCI+PC9pPjwvc3Bhbj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+OTowMGFtPC9zbWFsbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgaXMtbGluayBpcy1vdXRsaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD5BdWRpdG9yaW8gUHJpbmNpcGFsPC9zbWFsbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQgaXMtc21hbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHQ8c3Ryb25nPkFwZXJ0dXJhIGRlbCBmb3JvOjwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5JdsOhbiBEdXF1ZSBNw6FycXVlejwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlByZXNpZGVudGUgZGUgbGEgUmVww7pibGljYSBkZSBDb2xvbWJpYTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkNPPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPkFwZXJ0dXJhIGRlbCBmb3JvOjwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5LYXJlbiBBYnVkaW5lbjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPk1pbmlzdHJhIFRJQzwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy1vbmUtdGhpcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwibWVkaWFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1sZWZ0IGhhcy10ZXh0LXByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiaW1hZ2UgaXMtNjR4NjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgZGF0YS1mZWF0aGVyPVwiY2FsZW5kYXJcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQgaGFzLW1hcmdpbi1ib3R0b20tMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzcz1cImhhcy10ZXh0LXByaW1hcnkgaGFzLW1hcmdpbi1ib3R0b20tMTBcIj5BY3RvcyBQcm90b2NvbGFyaW9zIC0gSW5zdGFsYWNpw7NuPC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJjbG9ja1wiPjwvaT48L3NwYW4+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPjk6MDBhbTwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGlzLXNtYWxsIGlzLWxpbmsgaXMtb3V0bGluZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJzXCI+PC9pPjwvc3Bhbj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+QXVkaXRvcmlvIFByaW5jaXBhbDwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50IGlzLXNtYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0PHN0cm9uZz5BcGVydHVyYSBkZWwgZm9ybzo8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+SXbDoW4gRHVxdWUgTcOhcnF1ZXo8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5QcmVzaWRlbnRlIGRlIGxhIFJlcMO6YmxpY2EgZGUgQ29sb21iaWE8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5DTzwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5BcGVydHVyYSBkZWwgZm9ybzo8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+S2FyZW4gQWJ1ZGluZW48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5NaW5pc3RyYSBUSUM8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtb25lLXRoaXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lZGlhXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtbGVmdCBoYXMtdGV4dC1wcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImltYWdlIGlzLTY0eDY0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGRhdGEtZmVhdGhlcj1cImNhbGVuZGFyXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50IGhhcy1tYXJnaW4tYm90dG9tLTIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJoYXMtdGV4dC1wcmltYXJ5IGhhcy1tYXJnaW4tYm90dG9tLTEwXCI+QWN0b3MgUHJvdG9jb2xhcmlvcyAtIEluc3RhbGFjacOzbjwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gaXMtc21hbGwgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwiY2xvY2tcIj48L2k+PC9zcGFuPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD45OjAwYW08L3NtYWxsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBpcy1zbWFsbCBpcy1saW5rIGlzLW91dGxpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJ1c2Vyc1wiPjwvaT48L3NwYW4+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPkF1ZGl0b3JpbyBQcmluY2lwYWw8L3NtYWxsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudCBpcy1zbWFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdDxzdHJvbmc+QXBlcnR1cmEgZGVsIGZvcm86PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkl2w6FuIER1cXVlIE3DoXJxdWV6PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+UHJlc2lkZW50ZSBkZSBsYSBSZXDDumJsaWNhIGRlIENvbG9tYmlhPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+Q088L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+QXBlcnR1cmEgZGVsIGZvcm86PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPkthcmVuIEFidWRpbmVuPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+TWluaXN0cmEgVElDPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YnV0dG9uIG9uOmNsaWNrPXtjbG9zZU1vZGFsfSBjbGFzcz1cIm1vZGFsLWNsb3NlIGlzLWxhcmdlXCIgYXJpYS1sYWJlbD1cImNsb3NlXCI+PC9idXR0b24+XHJcbjwvZGl2PlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGNvbnN0IGNsb3NlTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FnZW5kYS1pbnRlcmFjdGl2YScpLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG4gICAgLm1vZGFsLWNvbnRlbnQge1xyXG4gICAgICAgIHdpZHRoOiA5MHZ3O1xyXG4gICAgICAgIGhlaWdodDogOTB2aDtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB9XHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxTQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsWUFBWSxXQUFXLENBQUMsRUFBRTtBQUMxQyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUM3RCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzFDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsSUFBSSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUIsSUFBSSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO0FBQzNELElBQUksVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDbkMsSUFBSSxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDMUQsSUFBSSxNQUFNLENBQUMsY0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OENDMTVFbUIsR0FBVTtnREF5SFAsR0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUl0QixVQUFVO0VBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
