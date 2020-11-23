'use strict';

var win = window;

var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

var win$1 = window;

var caf = win$1.cancelAnimationFrame
  || win$1.mozCancelAnimationFrame
  || function(id){ clearTimeout(id); };

function extend() {
  var obj, name, copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function checkStorageValue (value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

function setLocalStorage(storage, key, value, access) {
  if (access) {
    try { storage.setItem(key, value); } catch (e) {}
  }
  return value;
}

function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  
  return 'tns' + window.tnsId;
}

function getBody () {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

var docElement = document.documentElement;

function setFakeBody (body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = docElement.style.overflow;
    //avoid crashing IE8, if background image is used
    body.style.background = '';
    //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = docElement.style.overflow = 'hidden';
    docElement.appendChild(body);
  }

  return docOverflow;
}

function resetFakeBody (body, docOverflow) {
  if (body.fake) {
    body.remove();
    docElement.style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line
    docElement.offsetHeight;
  }
}

// get css-calc 

function calc() {
  var doc = document, 
      body = getBody(),
      docOverflow = setFakeBody(body),
      div = doc.createElement('div'), 
      result = false;

  body.appendChild(div);
  try {
    var str = '(10px * 10)',
        vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
        val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) { 
        result = val.replace(str, ''); 
        break;
      }
    }
  } catch (e) {}
  
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();

  return result;
}

// get subpixel support value

function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;

  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);

  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

  body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();

  return supported;
}

function mediaquerySupport () {
  if (window.matchMedia || window.msMatchMedia) {
    return true;
  }
  
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      div = doc.createElement('div'),
      style = doc.createElement('style'),
      rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
      position;

  style.type = 'text/css';
  div.className = 'tns-mq-test';

  body.appendChild(style);
  body.appendChild(div);

  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }

  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];

  body.fake ? resetFakeBody(body, docOverflow) : div.remove();

  return position === "absolute";
}

// create and append style sheet
function createStyleSheet (media, nonce) {
  // Create the <style> tag
  var style = document.createElement("style");
  // style.setAttribute("type", "text/css");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")
  if (media) { style.setAttribute("media", media); }

  // Add nonce attribute for Content Security Policy
  if (nonce) { style.setAttribute("nonce", nonce); }

  // WebKit hack :(
  // style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.querySelector('head').appendChild(style);

  return style.sheet ? style.sheet : style.styleSheet;
}

// cross browsers addRule method
function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
    'insertRule' in sheet ?
      sheet.insertRule(selector + '{' + rules + '}', index) :
      sheet.addRule(selector, rules, index);
  // });
}

// cross browsers addRule method
function removeCSSRule(sheet, index) {
  // return raf(function() {
    'deleteRule' in sheet ?
      sheet.deleteRule(index) :
      sheet.removeRule(index);
  // });
}

function getCssRulesLength(sheet) {
  var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
  return rule.length;
}

function toDegree (y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));
      
  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEach (arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}

var classListSupport = 'classList' in document.createElement('_');

var hasClass = classListSupport ?
    function (el, str) { return el.classList.contains(str); } :
    function (el, str) { return el.className.indexOf(str) >= 0; };

var addClass = classListSupport ?
    function (el, str) {
      if (!hasClass(el,  str)) { el.classList.add(str); }
    } :
    function (el, str) {
      if (!hasClass(el,  str)) { el.className += ' ' + str; }
    };

var removeClass = classListSupport ?
    function (el, str) {
      if (hasClass(el,  str)) { el.classList.remove(str); }
    } :
    function (el, str) {
      if (hasClass(el, str)) { el.className = el.className.replace(str, ''); }
    };

function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

function getAttr(el, attr) {
  return el.getAttribute(attr);
}

function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined"; 
}

function setAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

  for (var i = els.length; i--;) {
    for(var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

function removeAttrs(els, attrs) {
  els = (isNodeList(els) || els instanceof Array) ? els : [els];
  attrs = (attrs instanceof Array) ? attrs : [attrs];

  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

function arrayFromNodeList (nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}

function hideElement(el, forceHide) {
  if (el.style.display !== 'none') { el.style.display = 'none'; }
}

function showElement(el, forceHide) {
  if (el.style.display === 'none') { el.style.display = ''; }
}

function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}

function whichProperty(props){
  if (typeof props === 'string') {
    var arr = [props],
        Props = props.charAt(0).toUpperCase() + props.substr(1),
        prefixes = ['Webkit', 'Moz', 'ms', 'O'];
        
    prefixes.forEach(function(prefix) {
      if (prefix !== 'ms' || props === 'transform') {
        arr.push(prefix + Props);
      }
    });

    props = arr;
  }

  var el = document.createElement('fakeelement'),
      len = props.length;
  for(var i = 0; i < props.length; i++){
    var prop = props[i];
    if( el.style[prop] !== undefined ){ return prop; }
  }

  return false; // explicit for ie9-
}

function has3DTransforms(tf){
  if (!tf) { return false; }
  if (!window.getComputedStyle) { return false; }
  
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      el = doc.createElement('p'),
      has3d,
      cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';

  cssTF += 'transform';

  // Add it to the body to get the computed style
  body.insertBefore(el, null);

  el.style[tf] = 'translate3d(1px,1px,1px)';
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);

  body.fake ? resetFakeBody(body, docOverflow) : el.remove();

  return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? { passive: true } : false;

function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      data.type = eventName;
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data, eventName);
        });
      }
    }
  };
}

function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = (to.indexOf('%') >= 0) ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick;

  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) { 
      setTimeout(moveElement, tick); 
    } else {
      callback();
    }
  }
}

// Object.keys
if (!Object.keys) {
  Object.keys = function(object) {
    var keys = [];
    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
}

// ChildNode.remove
if(!("remove" in Element.prototype)){
  Element.prototype.remove = function(){
    if(this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

var tns = function(options) {
  options = extend({
    container: '.slider',
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: 'top',
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'top',
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: 'top',
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateNormal: 'tns-normal',
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: '.tns-lazy-img',
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    useLocalStorage: true,
    nonce: false
  }, options || {});

  var doc = document,
      win = window,
      KEYS = {
        ENTER: 13,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      },
      tnsStorage = {},
      localStorageAccess = options.useLocalStorage;

  if (localStorageAccess) {
    // check browser version and local storage access
    var browserInfo = navigator.userAgent;
    var uid = new Date;

    try {
      tnsStorage = win.localStorage;
      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }
      if (!localStorageAccess) { tnsStorage = {}; }
    } catch(e) {
      localStorageAccess = false;
    }

    if (localStorageAccess) {
      // remove storage when browser version changes
      if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
        ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function(item) { tnsStorage.removeItem(item); });
      }
      // update browserInfo
      localStorage['tnsApp'] = browserInfo;
    }
  }

  var CALC = tnsStorage['tC'] ? checkStorageValue(tnsStorage['tC']) : setLocalStorage(tnsStorage, 'tC', calc(), localStorageAccess),
      PERCENTAGELAYOUT = tnsStorage['tPL'] ? checkStorageValue(tnsStorage['tPL']) : setLocalStorage(tnsStorage, 'tPL', percentageLayout(), localStorageAccess),
      CSSMQ = tnsStorage['tMQ'] ? checkStorageValue(tnsStorage['tMQ']) : setLocalStorage(tnsStorage, 'tMQ', mediaquerySupport(), localStorageAccess),
      TRANSFORM = tnsStorage['tTf'] ? checkStorageValue(tnsStorage['tTf']) : setLocalStorage(tnsStorage, 'tTf', whichProperty('transform'), localStorageAccess),
      HAS3DTRANSFORMS = tnsStorage['t3D'] ? checkStorageValue(tnsStorage['t3D']) : setLocalStorage(tnsStorage, 't3D', has3DTransforms(TRANSFORM), localStorageAccess),
      TRANSITIONDURATION = tnsStorage['tTDu'] ? checkStorageValue(tnsStorage['tTDu']) : setLocalStorage(tnsStorage, 'tTDu', whichProperty('transitionDuration'), localStorageAccess),
      TRANSITIONDELAY = tnsStorage['tTDe'] ? checkStorageValue(tnsStorage['tTDe']) : setLocalStorage(tnsStorage, 'tTDe', whichProperty('transitionDelay'), localStorageAccess),
      ANIMATIONDURATION = tnsStorage['tADu'] ? checkStorageValue(tnsStorage['tADu']) : setLocalStorage(tnsStorage, 'tADu', whichProperty('animationDuration'), localStorageAccess),
      ANIMATIONDELAY = tnsStorage['tADe'] ? checkStorageValue(tnsStorage['tADe']) : setLocalStorage(tnsStorage, 'tADe', whichProperty('animationDelay'), localStorageAccess),
      TRANSITIONEND = tnsStorage['tTE'] ? checkStorageValue(tnsStorage['tTE']) : setLocalStorage(tnsStorage, 'tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess),
      ANIMATIONEND = tnsStorage['tAE'] ? checkStorageValue(tnsStorage['tAE']) : setLocalStorage(tnsStorage, 'tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess);

  // get element nodes from selectors
  var supportConsoleWarn = win.console && typeof win.console.warn === "function",
      tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
      optionsElements = {};

  tnsList.forEach(function(item) {
    if (typeof options[item] === 'string') {
      var str = options[item],
          el = doc.querySelector(str);
      optionsElements[item] = str;

      if (el && el.nodeName) {
        options[item] = el;
      } else {
        if (supportConsoleWarn) { console.warn('Can\'t find', options[item]); }
        return;
      }
    }
  });

  // make sure at least 1 slide
  if (options.container.children.length < 1) {
    if (supportConsoleWarn) { console.warn('No slides found in', options.container); }
    return;
   }

  // update options
  var responsive = options.responsive,
      nested = options.nested,
      carousel = options.mode === 'carousel' ? true : false;

  if (responsive) {
    // apply responsive[0] to options and remove it
    if (0 in responsive) {
      options = extend(options, responsive[0]);
      delete responsive[0];
    }

    var responsiveTem = {};
    for (var key in responsive) {
      var val = responsive[key];
      // update responsive
      // from: 300: 2
      // to:
      //   300: {
      //     items: 2
      //   }
      val = typeof val === 'number' ? {items: val} : val;
      responsiveTem[key] = val;
    }
    responsive = responsiveTem;
    responsiveTem = null;
  }

  // update options
  function updateOptions (obj) {
    for (var key in obj) {
      if (!carousel) {
        if (key === 'slideBy') { obj[key] = 'page'; }
        if (key === 'edgePadding') { obj[key] = false; }
        if (key === 'autoHeight') { obj[key] = false; }
      }

      // update responsive options
      if (key === 'responsive') { updateOptions(obj[key]); }
    }
  }
  if (!carousel) { updateOptions(options); }


  // === define and set variables ===
  if (!carousel) {
    options.axis = 'horizontal';
    options.slideBy = 'page';
    options.edgePadding = false;

    var animateIn = options.animateIn,
        animateOut = options.animateOut,
        animateDelay = options.animateDelay,
        animateNormal = options.animateNormal;
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      middleWrapper,
      container = options.container,
      containerParent = container.parentNode,
      containerHTML = container.outerHTML,
      slideItems = container.children,
      slideCount = slideItems.length,
      breakpointZone,
      windowWidth = getWindowWidth(),
      isOn = false;
  if (responsive) { setBreakpointZone(); }
  if (carousel) { container.className += ' tns-vpfix'; }

  // fixedWidth: viewport > rightBoundary > indexMax
  var autoWidth = options.autoWidth,
      fixedWidth = getOption('fixedWidth'),
      edgePadding = getOption('edgePadding'),
      gutter = getOption('gutter'),
      viewport = getViewportWidth(),
      center = getOption('center'),
      items = !autoWidth ? Math.floor(getOption('items')) : 1,
      slideBy = getOption('slideBy'),
      viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
      arrowKeys = getOption('arrowKeys'),
      speed = getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      controls = getOption('controls'),
      controlsText = getOption('controlsText'),
      nav = getOption('nav'),
      touch = getOption('touch'),
      mouseDrag = getOption('mouseDrag'),
      autoplay = getOption('autoplay'),
      autoplayTimeout = getOption('autoplayTimeout'),
      autoplayText = getOption('autoplayText'),
      autoplayHoverPause = getOption('autoplayHoverPause'),
      autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
      sheet = createStyleSheet(null, getOption('nonce')),
      lazyload = options.lazyload,
      lazyloadSelector = options.lazyloadSelector,
      slidePositions, // collection of slide positions
      slideItemsOut = [],
      cloneCount = loop ? getCloneCountForLoop() : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
      rightBoundary = fixedWidth ? getRightBoundary() : null,
      updateIndexBeforeTransform = (!carousel || !loop) ? true : false,
      // transform
      transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
      getIndexMax = (function () {
        if (fixedWidth) {
          return function() { return center && !loop ? slideCount - 1 : Math.ceil(- rightBoundary / (fixedWidth + gutter)); };
        } else if (autoWidth) {
          return function() {
            for (var i = 0; i < slideCountNew; i++) {
              if (slidePositions[i] >= - rightBoundary) { return i; }
            }
          };
        } else {
          return function() {
            if (center && carousel && !loop) {
              return slideCount - 1;
            } else {
              return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
            }
          };
        }
      })(),
      index = getStartIndex(getOption('startIndex')),
      indexCached = index,
      displayIndex = getCurrentSlide(),
      indexMin = 0,
      indexMax = !autoWidth ? getIndexMax() : null,
      // resize
      resizeTimer,
      preventActionWhenRunning = options.preventActionWhenRunning,
      swipeAngle = options.swipeAngle,
      moveDirectionExpected = swipeAngle ? '?' : true,
      running = false,
      onInit = options.onInit,
      events = new Events(),
      // id, class
      newContainerClasses = ' tns-slider tns-' + options.mode,
      slideId = container.id || getSlideId(),
      disable = getOption('disable'),
      disabled = false,
      freezable = options.freezable,
      freeze = freezable && !autoWidth ? getFreeze() : false,
      frozen = false,
      controlsEvents = {
        'click': onControlsClick,
        'keydown': onControlsKeydown
      },
      navEvents = {
        'click': onNavClick,
        'keydown': onNavKeydown
      },
      hoverEvents = {
        'mouseover': mouseoverPause,
        'mouseout': mouseoutRestart
      },
      visibilityEvent = {'visibilitychange': onVisibilityChange},
      docmentKeydownEvent = {'keydown': onDocumentKeydown},
      touchEvents = {
        'touchstart': onPanStart,
        'touchmove': onPanMove,
        'touchend': onPanEnd,
        'touchcancel': onPanEnd
      }, dragEvents = {
        'mousedown': onPanStart,
        'mousemove': onPanMove,
        'mouseup': onPanEnd,
        'mouseleave': onPanEnd
      },
      hasControls = hasOption('controls'),
      hasNav = hasOption('nav'),
      navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
      hasAutoplay = hasOption('autoplay'),
      hasTouch = hasOption('touch'),
      hasMouseDrag = hasOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active',
      slideClonedClass = 'tns-slide-cloned',
      imgCompleteClass = 'tns-complete',
      imgEvents = {
        'load': onImgLoaded,
        'error': onImgFailed
      },
      imgsComplete,
      liveregionCurrent,
      preventScroll = options.preventScrollOnTouch === 'force' ? true : false;

  // controls
  if (hasControls) {
    var controlsContainer = options.controlsContainer,
        controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
        prevButton = options.prevButton,
        nextButton = options.nextButton,
        prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
        nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
        prevIsButton,
        nextIsButton;
  }

  // nav
  if (hasNav) {
    var navContainer = options.navContainer,
        navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
        navItems,
        pages = autoWidth ? slideCount : getPages(),
        pagesCached = 0,
        navClicked = -1,
        navCurrentIndex = getCurrentNavIndex(),
        navCurrentIndexCached = navCurrentIndex,
        navActiveClass = 'tns-nav-active',
        navStr = 'Carousel Page ',
        navStrCurrent = ' (Current Slide)';
  }

  // autoplay
  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayButton = options.autoplayButton,
        autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
        autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
        autoplayTimer,
        animating,
        autoplayHoverPaused,
        autoplayUserPaused,
        autoplayVisibilityPaused;
  }

  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
        lastPosition = {},
        translateInit,
        disX,
        disY,
        panStart = false,
        rafIndex,
        getDist = horizontal ?
          function(a, b) { return a.x - b.x; } :
          function(a, b) { return a.y - b.y; };
  }

  // disable slider when slidecount <= items
  if (!autoWidth) { resetVariblesWhenDisable(disable || freeze); }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';

    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? '3d(' : '3d(0px, ';
      transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
    } else {
      transformPrefix += horizontal ? 'X(' : 'Y(';
      transformPostfix = ')';
    }

  }

  if (carousel) { container.className = container.className.replace('tns-vpfix', ''); }
  initStructure();
  initSheet();
  initSliderTransform();

  // === COMMON FUNCTIONS === //
  function resetVariblesWhenDisable (condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }

  function getCurrentSlide () {
    var tem = carousel ? index - cloneCount : index;
    while (tem < 0) { tem += slideCount; }
    return tem%slideCount + 1;
  }

  function getStartIndex (ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }

  function getAbsIndex (i) {
    if (i == null) { i = index; }

    if (carousel) { i -= cloneCount; }
    while (i < 0) { i += slideCount; }

    return Math.floor(i%slideCount);
  }

  function getCurrentNavIndex () {
    var absIndex = getAbsIndex(),
        result;

    result = navAsThumbnails ? absIndex :
      fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) :
          Math.floor(absIndex / items);

    // set active nav to the last one when reaches the right edge
    if (!loop && carousel && index === indexMax) { result = pages - 1; }

    return result;
  }

  function getItemsMax () {
    // fixedWidth or autoWidth while viewportMax is not available
    if (autoWidth || (fixedWidth && !viewportMax)) {
      return slideCount - 1;
    // most cases
    } else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
          arr = [];

      if (fixedWidth || options[str] < slideCount) { arr.push(options[str]); }

      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];
          if (tem && (fixedWidth || tem < slideCount)) { arr.push(tem); }
        }
      }

      if (!arr.length) { arr.push(0); }

      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }

  function getCloneCountForLoop () {
    var itemsMax = getItemsMax(),
        result = carousel ? Math.ceil((itemsMax * 5 - slideCount)/2) : (itemsMax * 4 - slideCount);
    result = Math.max(itemsMax, result);

    return hasOption('edgePadding') ? result + 1 : result;
  }

  function getWindowWidth () {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function getInsertPosition (pos) {
    return pos === 'top' ? 'afterbegin' : 'beforeend';
  }

  function getClientWidth (el) {
    if (el == null) { return; }
    var div = doc.createElement('div'), rect, width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }

  function getViewportWidth () {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }

  function hasOption (item) {
    if (options[item]) {
      return true;
    } else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item]) { return true; }
        }
      }
      return false;
    }
  }

  // get option:
  // fixed width: viewport, fixedWidth, gutter => items
  // others: window width => all variables
  // all: items => slideBy
  function getOption (item, ww) {
    if (ww == null) { ww = windowWidth; }

    if (item === 'items' && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;

    } else {
      var result = options[item];

      if (responsive) {
        for (var bp in responsive) {
          // bp: convert string to number
          if (ww >= parseInt(bp)) {
            if (item in responsive[bp]) { result = responsive[bp][item]; }
          }
        }
      }

      if (item === 'slideBy' && result === 'page') { result = getOption('items'); }
      if (!carousel && (item === 'slideBy' || item === 'items')) { result = Math.floor(result); }

      return result;
    }
  }

  function getSlideMarginLeft (i) {
    return CALC ?
      CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' :
      i * 100 / slideCountNew + '%';
  }

  function getInnerWrapperStyles (edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = '';

    if (edgePaddingTem !== undefined) {
      var gap = edgePaddingTem;
      if (gutterTem) { gap -= gutterTem; }
      str = horizontal ?
        'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' :
        'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }

    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) { str += getTransitionDurationStyle(speedTem); }
    return str;
  }

  function getContainerWidth (fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      return CALC ?
        CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' :
        slideCountNew * 100 / itemsTem + '%';
    }
  }

  function getSlideWidthStyle (fixedWidthTem, gutterTem, itemsTem) {
    var width;

    if (fixedWidthTem) {
      width = (fixedWidthTem + gutterTem) + 'px';
    } else {
      if (!carousel) { itemsTem = Math.floor(itemsTem); }
      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ?
        CALC + '(100% / ' + dividend + ')' :
        100 / dividend + '%';
    }

    width = 'width:' + width;

    // inner slider: overwrite outer slider styles
    return nested !== 'inner' ? width + ';' : width + ' !important;';
  }

  function getSlideGutterStyle (gutterTem) {
    var str = '';

    // gutter maybe interger || 0
    // so can't use 'if (gutter)'
    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop +  dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  function getCSSPrefix (name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) { prefix = '-' + prefix + '-'; }

    return prefix;
  }

  function getTransitionDurationStyle (speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }

  function getAnimationDurationStyle (speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }

  function initStructure () {
    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        hasGutter = hasOption('gutter');

    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + '-ow';
    innerWrapper.id = slideId + '-iw';

    // set container properties
    if (container.id === '') { container.id = slideId; }
    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
    newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
    if (autoWidth) { newContainerClasses += ' tns-autowidth'; }
    newContainerClasses += ' tns-' + options.axis;
    container.className += newContainerClasses;

    // add constrain layer for carousel
    if (carousel) {
      middleWrapper = doc.createElement('div');
      middleWrapper.id = slideId + '-mw';
      middleWrapper.className = 'tns-ovh';

      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }

    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += ' tns-ah';
    }

    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);

    // add id, class, aria attributes
    // before clone slides
    forEach(slideItems, function(item, i) {
      addClass(item, 'tns-item');
      if (!item.id) { item.id = slideId + '-item' + i; }
      if (!carousel && animateNormal) { addClass(item, animateNormal); }
      setAttrs(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    });

    // ## clone slides
    // carousel: n + slides + n
    // gallery:      slides + n
    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(),
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j%slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        addClass(cloneFirst, slideClonedClass);
        removeAttrs(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          addClass(cloneLast, slideClonedClass);
          removeAttrs(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }

  }

  function initSliderTransform () {
    // ## images loaded/failed
    if (hasOption('autoHeight') || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll('img');

      // add img load event listener
      forEach(imgs, function(img) {
        var src = img.src;

        if (!lazyload) {
          // not data img
          if (src && src.indexOf('data:image') < 0) {
            img.src = '';
            addEvents(img, imgEvents);
            addClass(img, 'loading');

            img.src = src;
          // data img
          } else {
            imgLoaded(img);
          }
        }
      });

      // set imgsComplete
      raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), function() { imgsComplete = true; }); });

      // reset imgs for auto height: check visible imgs only
      if (hasOption('autoHeight')) { imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1)); }

      lazyload ? initSliderTransformStyleCheck() : raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck); });

    } else {
      // set container transform property
      if (carousel) { doContainerTransformSilent(); }

      // update slider tools and events
      initTools();
      initEvents();
    }
  }

  function initSliderTransformStyleCheck () {
    if (autoWidth && slideCount > 1) {
      // check styles application
      var num = loop ? index : slideCount - 1;

      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;

        (Math.abs(left - right) <= 1) ?
          initSliderTransformCore() :
          setTimeout(function(){ stylesApplicationCheck(); }, 16);
      })();

    } else {
      initSliderTransformCore();
    }
  }


  function initSliderTransformCore () {
    // run Fn()s which are rely on image loading
    if (!horizontal || autoWidth) {
      setSlidePositions();

      if (autoWidth) {
        rightBoundary = getRightBoundary();
        if (freezable) { freeze = getFreeze(); }
        indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=
        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    }

    // set container transform property
    if (carousel) { doContainerTransformSilent(); }

    // update slider tools and events
    initTools();
    initEvents();
  }

  function initSheet () {
    // gallery:
    // set animation classes and left value for gallery slider
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item = slideItems[i];
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    }

    // #### LAYOUT

    // ## INLINE-BLOCK VS FLOAT

    // ## PercentageLayout:
    // slides: inline-block
    // remove blank space between slides by set font-size: 0

    // ## Non PercentageLayout:
    // slides: float
    //         margin-right: -100%
    //         margin-left: ~

    // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing
    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
        addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));
      } else if (carousel) {
        forEach(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    }


    // ## BASIC STYLES
    if (CSSMQ) {
      // middle wrapper style
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
        addCSSRule(sheet, '#' + slideId + '-mw', str, getCssRulesLength(sheet));
      }

      // inner wrapper styles
      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet));

      // container styles
      if (carousel) {
        str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
      }

      // slide styles
      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
      if (options.gutter) { str += getSlideGutterStyle(options.gutter); }
      // set gallery items transition-duration
      if (!carousel) {
        if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
        if (ANIMATIONDURATION) { str += getAnimationDurationStyle(speed); }
      }
      if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }

    // non CSS mediaqueries: IE8
    // ## update inner wrapper, container, slides if needed
    // set inline styles for inner wrapper & container
    // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // middle wrapper styles
      update_carousel_transition_duration();

      // inner wrapper styles
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);

      // container styles
      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }

      // slide styles
      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
      if (gutter) { str += getSlideGutterStyle(gutter); }

      // append to the last line
      if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }
    }

    // ## MEDIAQUERIES
    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        // bp: convert string to number
        bp = parseInt(bp);

        var opts = responsive[bp],
            str = '',
            middleWrapperStr = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = !autoWidth ? getOption('items', bp) : null,
            fixedWidthBP = getOption('fixedWidth', bp),
            speedBP = getOption('speed', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            autoHeightBP = getOption('autoHeight', bp),
            gutterBP = getOption('gutter', bp);

        // middle wrapper string
        if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
          middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
        }

        // inner wrapper string
        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
        }

        // container string
        if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || (fixedWidth && 'gutter' in opts))) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }
        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        }

        // slide string
        if ('fixedWidth' in opts || (fixedWidth && 'gutter' in opts) || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        // set gallery items transition-duration
        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) { slideStr += getTransitionDurationStyle(speedBP); }
          if (ANIMATIONDURATION) { slideStr += getAnimationDurationStyle(speedBP); }
        }
        if (slideStr) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }

        // add up
        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;

        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      }
    }
  }

  function initTools () {
    // == slides ==
    updateSlideStatus();

    // == live region ==
    outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
    liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current');

    // == autoplayInit ==
    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';
      if (autoplayButton) {
        setAttrs(autoplayButton, {'data-action': txt});
      } else if (options.autoplayButtonOutput) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      }

      // add event
      if (autoplayButton) {
        addEvents(autoplayButton, {'click': toggleAutoplay});
      }

      if (autoplay) {
        startAutoplay();
        if (autoplayHoverPause) { addEvents(container, hoverEvents); }
        if (autoplayResetOnVisibility) { addEvents(container, visibilityEvent); }
      }
    }

    // == navInit ==
    if (hasNav) {
      // customized nav
      // will not hide the navs in case they're thumbnails
      if (navContainer) {
        setAttrs(navContainer, {'aria-label': 'Carousel Pagination'});
        navItems = navContainer.children;
        forEach(navItems, function(item, i) {
          setAttrs(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-label': navStr + (i + 1),
            'aria-controls': slideId,
          });
        });

      // generated nav
      } else {
        var navHtml = '',
            hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button type="button" data-nav="' + i +'" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) +'"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);

        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }

      updateNavVisibility();

      // add transition
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
      }

      setAttrs(navItems[navCurrentIndex], {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
      removeAttrs(navItems[navCurrentIndex], 'tabindex');
      addClass(navItems[navCurrentIndex], navActiveClass);

      // add events
      addEvents(navContainer, navEvents);
    }



    // == controlsInit ==
    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[1] + '</button></div>');

        controlsContainer = outerWrapper.querySelector('.tns-controls');
      }

      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      if (options.controlsContainer) {
        setAttrs(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        setAttrs([prevButton, nextButton], {
          'aria-controls': slideId,
          'tabindex': '-1',
        });
      }

      if (options.controlsContainer || (options.prevButton && options.nextButton)) {
        setAttrs(prevButton, {'data-controls' : 'prev'});
        setAttrs(nextButton, {'data-controls' : 'next'});
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);

      updateControlsStatus();

      // add events
      if (controlsContainer) {
        addEvents(controlsContainer, controlsEvents);
      } else {
        addEvents(prevButton, controlsEvents);
        addEvents(nextButton, controlsEvents);
      }
    }

    // hide tools if needed
    disableUI();
  }

  function initEvents () {
    // add events
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }

    if (touch) { addEvents(container, touchEvents, options.preventScrollOnTouch); }
    if (mouseDrag) { addEvents(container, dragEvents); }
    if (arrowKeys) { addEvents(doc, docmentKeydownEvent); }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      addEvents(win, {'resize': onResize});
    }

    if (autoHeight) {
      if (nested === 'outer') {
        events.on('innerLoaded', doAutoHeight);
      } else if (!disable) { doAutoHeight(); }
    }

    doLazyLoad();
    if (disable) { disableSlider(); } else if (freeze) { freezeSlider(); }

    events.on('indexChanged', additionalUpdates);
    if (nested === 'inner') { events.emit('innerLoaded', info()); }
    if (typeof onInit === 'function') { onInit(info()); }
    isOn = true;
  }

  function destroy () {
    // sheet
    sheet.disabled = true;
    if (sheet.ownerNode) { sheet.ownerNode.remove(); }

    // remove win event listeners
    removeEvents(win, {'resize': onResize});

    // arrowKeys, controls, nav
    if (arrowKeys) { removeEvents(doc, docmentKeydownEvent); }
    if (controlsContainer) { removeEvents(controlsContainer, controlsEvents); }
    if (navContainer) { removeEvents(navContainer, navEvents); }

    // autoplay
    removeEvents(container, hoverEvents);
    removeEvents(container, visibilityEvent);
    if (autoplayButton) { removeEvents(autoplayButton, {'click': toggleAutoplay}); }
    if (autoplay) { clearInterval(autoplayTimer); }

    // container
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      removeEvents(container, eve);
    }
    if (touch) { removeEvents(container, touchEvents); }
    if (mouseDrag) { removeEvents(container, dragEvents); }

    // cache Object values in options && reset HTML
    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];

    tnsList.forEach(function(item, i) {
      var el = item === 'container' ? outerWrapper : options[item];

      if (typeof el === 'object' && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
            parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    });


    // reset variables
    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null;
    // check variables
    // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });

    for (var a in this) {
      if (a !== 'rebuild') { this[a] = null; }
    }
    isOn = false;
  }

// === ON RESIZE ===
  // responsive || fixedWidth || autoWidth || !horizontal
  function onResize (e) {
    raf(function(){ resizeTasks(getEvent(e)); });
  }

  function resizeTasks (e) {
    if (!isOn) { return; }
    if (nested === 'outer') { events.emit('outerResized', info(e)); }
    windowWidth = getWindowWidth();
    var bpChanged,
        breakpointZoneTem = breakpointZone,
        needContainerTransform = false;

    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone;
      // if (hasRightDeadZone) { needContainerTransform = true; } // *?
      if (bpChanged) { events.emit('newBreakpointStart', info(e)); }
    }

    var indChanged,
        itemsChanged,
        itemsTem = items,
        disableTem = disable,
        freezeTem = freeze,
        arrowKeysTem = arrowKeys,
        controlsTem = controls,
        navTem = nav,
        touchTem = touch,
        mouseDragTem = mouseDrag,
        autoplayTem = autoplay,
        autoplayHoverPauseTem = autoplayHoverPause,
        autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
        indexTem = index;

    if (bpChanged) {
      var fixedWidthTem = fixedWidth,
          autoHeightTem = autoHeight,
          controlsTextTem = controlsText,
          centerTem = center,
          autoplayTextTem = autoplayText;

      if (!CSSMQ) {
        var gutterTem = gutter,
            edgePaddingTem = edgePadding;
      }
    }

    // get option:
    // fixed width: viewport, fixedWidth, gutter => items
    // others: window width => all variables
    // all: items => slideBy
    arrowKeys = getOption('arrowKeys');
    controls = getOption('controls');
    nav = getOption('nav');
    touch = getOption('touch');
    center = getOption('center');
    mouseDrag = getOption('mouseDrag');
    autoplay = getOption('autoplay');
    autoplayHoverPause = getOption('autoplayHoverPause');
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');

    if (bpChanged) {
      disable = getOption('disable');
      fixedWidth = getOption('fixedWidth');
      speed = getOption('speed');
      autoHeight = getOption('autoHeight');
      controlsText = getOption('controlsText');
      autoplayText = getOption('autoplayText');
      autoplayTimeout = getOption('autoplayTimeout');

      if (!CSSMQ) {
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');
      }
    }
    // update options
    resetVariblesWhenDisable(disable);

    viewport = getViewportWidth(); // <= edgePadding, gutter
    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();
      if (!horizontal) {
        updateContentWrapperHeight(); // <= setSlidePositions
        needContainerTransform = true;
      }
    }
    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
                                          // fixedWidth: <= viewport, fixedWidth, gutter
      indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
                                // fixedWidth: <= rightBoundary, fixedWidth, gutter
    }

    if (bpChanged || fixedWidth) {
      items = getOption('items');
      slideBy = getOption('slideBy');
      itemsChanged = items !== itemsTem;

      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) { indexMax = getIndexMax(); } // <= items
        // check index before transform in case
        // slider reach the right edge then items become bigger
        updateIndex();
      }
    }

    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider(); // <= slidePositions, rightBoundary, indexMax
        }
      }
    }

    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
                            // <= fixedWidth: fixedWidth, gutter, rightBoundary
                            // <= others: items

      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }

    resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility
    if (!autoplay) { autoplayHoverPause = autoplayResetOnVisibility = false; }

    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ?
        addEvents(doc, docmentKeydownEvent) :
        removeEvents(doc, docmentKeydownEvent);
    }
    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          showElement(controlsContainer);
        } else {
          if (prevButton) { showElement(prevButton); }
          if (nextButton) { showElement(nextButton); }
        }
      } else {
        if (controlsContainer) {
          hideElement(controlsContainer);
        } else {
          if (prevButton) { hideElement(prevButton); }
          if (nextButton) { hideElement(nextButton); }
        }
      }
    }
    if (nav !== navTem) {
      if (nav) {
        showElement(navContainer);
        updateNavVisibility();
      } else {
        hideElement(navContainer);
      }
    }
    if (touch !== touchTem) {
      touch ?
        addEvents(container, touchEvents, options.preventScrollOnTouch) :
        removeEvents(container, touchEvents);
    }
    if (mouseDrag !== mouseDragTem) {
      mouseDrag ?
        addEvents(container, dragEvents) :
        removeEvents(container, dragEvents);
    }
    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) { showElement(autoplayButton); }
        if (!animating && !autoplayUserPaused) { startAutoplay(); }
      } else {
        if (autoplayButton) { hideElement(autoplayButton); }
        if (animating) { stopAutoplay(); }
      }
    }
    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ?
        addEvents(container, hoverEvents) :
        removeEvents(container, hoverEvents);
    }
    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ?
        addEvents(doc, visibilityEvent) :
        removeEvents(doc, visibilityEvent);
    }

    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) { needContainerTransform = true; }

      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) { innerWrapper.style.height = ''; }
      }

      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }

      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0,
            html = autoplayButton.innerHTML,
            len = html.length - autoplayTextTem[i].length;
        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) { needContainerTransform = true; }
    }

    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }

    indChanged = index !== indexTem;
    if (indChanged) {
      events.emit('indexChanged', info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) { additionalUpdates(); }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
      updateLiveRegion();
    }

    if (itemsChanged && !carousel) { updateGallerySlidePositions(); }

    if (!disable && !freeze) {
      // non-mediaqueries: IE8
      if (bpChanged && !CSSMQ) {
        // middle wrapper styles

        // inner wrapper styles
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }

        if (horizontal) {
          // container styles
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }

          // slide styles
          var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                    getSlideGutterStyle(gutter);

          // remove the last line and
          // add new styles
          removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
          addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
        }
      }

      // auto height
      if (autoHeight) { doAutoHeight(); }

      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }

    if (bpChanged) { events.emit('newBreakpointEnd', info(e)); }
  }





  // === INITIALIZATION FUNCTIONS === //
  function getFreeze () {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return  slideCount <= a;
    }

    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
        vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;

    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }

    return width <= vp;
  }

  function setBreakpointZone () {
    breakpointZone = 0;
    for (var bp in responsive) {
      bp = parseInt(bp); // convert string to number
      if (windowWidth >= bp) { breakpointZone = bp; }
    }
  }

  // (slideBy, indexMin, indexMax) => index
  var updateIndex = (function () {
    return loop ?
      carousel ?
        // loop + carousel
        function () {
          var leftEdge = indexMin,
              rightEdge = indexMax;

          leftEdge += slideBy;
          rightEdge -= slideBy;

          // adjust edges when has edge paddings
          // or fixed-width slider with extra space on the right side
          if (edgePadding) {
            leftEdge += 1;
            rightEdge -= 1;
          } else if (fixedWidth) {
            if ((viewport + gutter)%(fixedWidth + gutter)) { rightEdge -= 1; }
          }

          if (cloneCount) {
            if (index > rightEdge) {
              index -= slideCount;
            } else if (index < leftEdge) {
              index += slideCount;
            }
          }
        } :
        // loop + gallery
        function() {
          if (index > indexMax) {
            while (index >= indexMin + slideCount) { index -= slideCount; }
          } else if (index < indexMin) {
            while (index <= indexMax - slideCount) { index += slideCount; }
          }
        } :
      // non-loop
      function() {
        index = Math.max(indexMin, Math.min(indexMax, index));
      };
  })();

  function disableUI () {
    if (!autoplay && autoplayButton) { hideElement(autoplayButton); }
    if (!nav && navContainer) { hideElement(navContainer); }
    if (!controls) {
      if (controlsContainer) {
        hideElement(controlsContainer);
      } else {
        if (prevButton) { hideElement(prevButton); }
        if (nextButton) { hideElement(nextButton); }
      }
    }
  }

  function enableUI () {
    if (autoplay && autoplayButton) { showElement(autoplayButton); }
    if (nav && navContainer) { showElement(navContainer); }
    if (controls) {
      if (controlsContainer) {
        showElement(controlsContainer);
      } else {
        if (prevButton) { showElement(prevButton); }
        if (nextButton) { showElement(nextButton); }
      }
    }
  }

  function freezeSlider () {
    if (frozen) { return; }

    // remove edge padding from inner wrapper
    if (edgePadding) { innerWrapper.style.margin = '0px'; }

    // add class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { addClass(slideItems[i], str); }
        addClass(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    disableUI();

    frozen = true;
  }

  function unfreezeSlider () {
    if (!frozen) { return; }

    // restore edge padding for inner wrapper
    // for mordern browsers
    if (edgePadding && CSSMQ) { innerWrapper.style.margin = ''; }

    // remove class tns-transparent to cloned slides
    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) { removeClass(slideItems[i], str); }
        removeClass(slideItems[slideCountNew - i - 1], str);
      }
    }

    // update tools
    enableUI();

    frozen = false;
  }

  function disableSlider () {
    if (disabled) { return; }

    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), '');
    removeAttrs(container, ['style']);
    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { hideElement(slideItems[j]); }
        hideElement(slideItems[slideCountNew - j - 1]);
      }
    }

    // vertical slider
    if (!horizontal || !carousel) { removeAttrs(innerWrapper, ['style']); }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i];
        removeAttrs(item, ['style']);
        removeClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    }

    // update tools
    disableUI();

    disabled = true;
  }

  function enableSlider () {
    if (!disabled) { return; }

    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();

    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) { showElement(slideItems[j]); }
        showElement(slideItems[slideCountNew - j - 1]);
      }
    }

    // gallery
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i],
            classN = i < index + items ? animateIn : animateNormal;
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, classN);
      }
    }

    // update tools
    enableUI();

    disabled = false;
  }

  function updateLiveRegion () {
    var str = getLiveRegionStr();
    if (liveregionCurrent.innerHTML !== str) { liveregionCurrent.innerHTML = str; }
  }

  function getLiveRegionStr () {
    var arr = getVisibleSlideRange(),
        start = arr[0] + 1,
        end = arr[1] + 1;
    return start === end ? start + '' : start + ' to ' + end;
  }

  function getVisibleSlideRange (val) {
    if (val == null) { val = getContainerTransformValue(); }
    var start = index, end, rangestart, rangeend;

    // get range start, range end for autoWidth and fixedWidth
    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = - (parseFloat(val) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    }

    // get start, end
    // - check auto width
    if (autoWidth) {
      slidePositions.forEach(function(point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) { start = i; }
          if (rangeend - point >= 0.5) { end = i; }
        }
      });

    // - check percentage width, fixed width
    } else {

      if (fixedWidth) {
        var cell = fixedWidth + gutter;
        if (center || edgePadding) {
          start = Math.floor(rangestart/cell);
          end = Math.ceil(rangeend/cell - 1);
        } else {
          end = start + Math.ceil(viewport/cell) - 1;
        }

      } else {
        if (center || edgePadding) {
          var a = items - 1;
          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }

          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }

          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }

      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }

    return [start, end];
  }

  function doLazyLoad () {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);

      getImageArray.apply(null, arg).forEach(function (img) {
        if (!hasClass(img, imgCompleteClass)) {
          // stop propagation transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
          addEvents(img, eve);

          addEvents(img, imgEvents);

          // update src
          img.src = getAttr(img, 'data-src');

          // update srcset
          var srcset = getAttr(img, 'data-srcset');
          if (srcset) { img.srcset = srcset; }

          addClass(img, 'loading');
        }
      });
    }
  }

  function onImgLoaded (e) {
    imgLoaded(getTarget(e));
  }

  function onImgFailed (e) {
    imgFailed(getTarget(e));
  }

  function imgLoaded (img) {
    addClass(img, 'loaded');
    imgCompleted(img);
  }

  function imgFailed (img) {
    addClass(img, 'failed');
    imgCompleted(img);
  }

  function imgCompleted (img) {
    addClass(img, imgCompleteClass);
    removeClass(img, 'loading');
    removeEvents(img, imgEvents);
  }

  function getImageArray (start, end, imgSelector) {
    var imgs = [];
    if (!imgSelector) { imgSelector = 'img'; }

    while (start <= end) {
      forEach(slideItems[start].querySelectorAll(imgSelector), function (img) { imgs.push(img); });
      start++;
    }

    return imgs;
  }

  // check if all visible images are loaded
  // and update container height if it's done
  function doAutoHeight () {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    raf(function(){ imgsLoadedCheck(imgs, updateInnerWrapperHeight); });
  }

  function imgsLoadedCheck (imgs, cb) {
    // execute callback function if all images are complete
    if (imgsComplete) { return cb(); }

    // check image classes
    imgs.forEach(function (img, index) {
      if (!lazyload && img.complete) { imgCompleted(img); } // Check image.complete
      if (hasClass(img, imgCompleteClass)) { imgs.splice(index, 1); }
    });

    // execute callback function if selected images are all complete
    if (!imgs.length) { return cb(); }

    // otherwise execute this functiona again
    raf(function(){ imgsLoadedCheck(imgs, cb); });
  }

  function additionalUpdates () {
    doLazyLoad();
    updateSlideStatus();
    updateLiveRegion();
    updateControlsStatus();
    updateNavStatus();
  }


  function update_carousel_transition_duration () {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }
  }

  function getMaxSlideHeight (slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }

    return Math.max.apply(null, heights);
  }

  // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done
  function updateInnerWrapperHeight () {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
        wp = middleWrapper ? middleWrapper : innerWrapper;

    if (wp.style.height !== maxHeight) { wp.style.height = maxHeight + 'px'; }
  }

  // get the distance from the top edge of the first slide to each slide
  // (init) => slidePositions
  function setSlidePositions () {
    slidePositions = [0];
    var attr = horizontal ? 'left' : 'top',
        attr2 = horizontal ? 'right' : 'bottom',
        base = slideItems[0].getBoundingClientRect()[attr];

    forEach(slideItems, function(item, i) {
      // skip the first slide
      if (i) { slidePositions.push(item.getBoundingClientRect()[attr] - base); }
      // add the end edge
      if (i === slideCountNew - 1) { slidePositions.push(item.getBoundingClientRect()[attr2] - base); }
    });
  }

  // update slide
  function updateSlideStatus () {
    var range = getVisibleSlideRange(),
        start = range[0],
        end = range[1];

    forEach(slideItems, function(item, i) {
      // show slides
      if (i >= start && i <= end) {
        if (hasAttr(item, 'aria-hidden')) {
          removeAttrs(item, ['aria-hidden', 'tabindex']);
          addClass(item, slideActiveClass);
        }
      // hide slides
      } else {
        if (!hasAttr(item, 'aria-hidden')) {
          setAttrs(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
          removeClass(item, slideActiveClass);
        }
      }
    });
  }

  // gallery: update slide position
  function updateGallerySlidePositions () {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];

      if (i >= index && i < l) {
        // add transitions to visible slides when adjusting their positions
        addClass(item, 'tns-moving');

        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      } else if (item.style.left) {
        item.style.left = '';
        addClass(item, animateNormal);
        removeClass(item, animateIn);
      }

      // remove outlet animation
      removeClass(item, animateOut);
    }

    // removing '.tns-moving'
    setTimeout(function() {
      forEach(slideItems, function(el) {
        removeClass(el, 'tns-moving');
      });
    }, 300);
  }

  // set tabindex on Nav
  function updateNavStatus () {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];

        setAttrs(navPrev, {
          'tabindex': '-1',
          'aria-label': navStr + (navCurrentIndexCached + 1)
        });
        removeClass(navPrev, navActiveClass);

        setAttrs(navCurrent, {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
        removeAttrs(navCurrent, 'tabindex');
        addClass(navCurrent, navActiveClass);

        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }

  function getLowerCaseNodeName (el) {
    return el.nodeName.toLowerCase();
  }

  function isButton (el) {
    return getLowerCaseNodeName(el) === 'button';
  }

  function isAriaDisabled (el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement (isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  }

  // set 'disabled' to true on controls when reach the edges
  function updateControlsStatus () {
    if (!controls || rewind || loop) { return; }

    var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = (index <= indexMin) ? true : false,
        disableNext = (!rewind && index >= indexMax) ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }

  // set duration
  function resetDuration (el, str) {
    if (TRANSITIONDURATION) { el.style[TRANSITIONDURATION] = str; }
  }

  function getSliderWidth () {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }

  function getCenterGap (num) {
    if (num == null) { num = index; }

    var gap = edgePadding ? gutter : 0;
    return autoWidth ? ((viewport - gap) - (slidePositions[num + 1] - slidePositions[num] - gutter))/2 :
      fixedWidth ? (viewport - fixedWidth) / 2 :
        (items - 1) / 2;
  }

  function getRightBoundary () {
    var gap = edgePadding ? gutter : 0,
        result = (viewport + gap) - getSliderWidth();

    if (center && !loop) {
      result = fixedWidth ? - (fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() :
        getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }
    if (result > 0) { result = 0; }

    return result;
  }

  function getContainerTransformValue (num) {
    if (num == null) { num = index; }

    var val;
    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val = - (fixedWidth + gutter) * num;
        if (center) { val += getCenterGap(); }
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        if (center) { num -= getCenterGap(); }
        val = - num * 100 / denominator;
      }
    } else {
      val = - slidePositions[num];
      if (center && autoWidth) {
        val += getCenterGap();
      }
    }

    if (hasRightDeadZone) { val = Math.max(val, rightBoundary); }

    val += (horizontal && !autoWidth && !fixedWidth) ? '%' : 'px';

    return val;
  }

  function doContainerTransformSilent (val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
  }

  function doContainerTransform (val) {
    if (val == null) { val = getContainerTransformValue(); }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide (number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) { l = Math.min(l, slideCountNew); }

    for (var i = number; i < l; i++) {
        var item = slideItems[i];

      // set item positions
      if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }

      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      removeClass(item, classOut);
      addClass(item, classIn);

      if (isOut) { slideItemsOut.push(item); }
    }
  }

  // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers
  var transformCore = (function () {
    return carousel ?
      function () {
        resetDuration(container, '');
        if (TRANSITIONDURATION || !speed) {
          // for morden browsers with non-zero duration or
          // zero duration for all browsers
          doContainerTransform();
          // run fallback function manually
          // when duration is 0 / container is hidden
          if (!speed || !isVisible(container)) { onTransitionEnd(); }

        } else {
          // for old browser with non-zero duration
          jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
        }

        if (!horizontal) { updateContentWrapperHeight(); }
      } :
      function () {
        slideItemsOut = [];

        var eve = {};
        eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
        removeEvents(slideItems[indexCached], eve);
        addEvents(slideItems[index], eve);

        animateSlide(indexCached, animateIn, animateOut, true);
        animateSlide(index, animateNormal, animateIn);

        // run fallback function manually
        // when transition or animation not supported / duration is 0
        if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) { onTransitionEnd(); }
      };
  })();

  function render (e, sliderMoved) {
    if (updateIndexBeforeTransform) { updateIndex(); }

    // render when slider was moved (touch or drag) even though index may not change
    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());
      if (autoHeight) { doAutoHeight(); }

      // pause autoplay when click or keydown from user
      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) { stopAutoplay(); }

      running = true;
      transformCore();
    }
  }

  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */
  function strTrans (str) {
    return str.toLowerCase().replace(/-/g, '');
  }

  // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height
  function onTransitionEnd (event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i];
          // set item positions
          item.style.left = '';

          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }
          removeClass(item, animateOut);
          addClass(item, animateNormal);
        }
      }

      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event'
       *    have to check event first, otherwise event.target will cause an error
       * => or 'gallery' mode:
       *   + event target is slide item
       * => or 'carousel' mode:
       *   + event target is container,
       *   + event.property is the same with transform attribute
       */
      if (!event ||
          !carousel && event.target.parentNode === container ||
          event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events.emit('indexChanged', info());

            doContainerTransformSilent();
          }
        }

        if (nested === 'inner') { events.emit('innerLoaded', info()); }
        running = false;
        indexCached = index;
      }
    }

  }

  // # ACTIONS
  function goTo (targetIndex, e) {
    if (freeze) { return; }

    // prev slideBy
    if (targetIndex === 'prev') {
      onControlsClick(e, -1);

    // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1);

    // go to exact slide
    } else {
      if (running) {
        if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
      }

      var absIndex = getAbsIndex(),
          indexGap = 0;

      if (targetIndex === 'first') {
        indexGap = - absIndex;
      } else if (targetIndex === 'last') {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      } else {
        if (typeof targetIndex !== 'number') { targetIndex = parseInt(targetIndex); }

        if (!isNaN(targetIndex)) {
          // from directly called goTo function
          if (!e) { targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex)); }

          indexGap = targetIndex - absIndex;
        }
      }

      // gallery: make sure new page won't overlap with current page
      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += (index + indexGap - slideCount) >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }

      index += indexGap;

      // make sure index is in range
      if (carousel && loop) {
        if (index < indexMin) { index += slideCount; }
        if (index > indexMax) { index -= slideCount; }
      }

      // if index is changed, start rendering
      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }

    }
  }

  // on controls click
  function onControlsClick (e, dir) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }
    var passEventObject;

    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);

      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }

      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }

    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo('first', e);
        return;
      }
    }

    if (dir) {
      index += slideBy * dir;
      if (autoWidth) { index = Math.floor(index); }
      // pass e when click control buttons or keydown
      render((passEventObject || (e && e.type === 'keydown')) ? e : null);
    }
  }

  // on nav click
  function onNavClick (e) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }

    e = getEvent(e);
    var target = getTarget(e), navIndex;

    // find the clicked nav item
    while (target !== navContainer && !hasAttr(target, 'data-nav')) { target = target.parentNode; }
    if (hasAttr(target, 'data-nav')) {
      var navIndex = navClicked = Number(getAttr(target, 'data-nav')),
          targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
          targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);

      if (navCurrentIndex === navIndex) {
        if (animating) { stopAutoplay(); }
        navClicked = -1; // reset navClicked
      }
    }
  }

  // autoplay functions
  function setAutoplayTimer () {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);

    animating = true;
  }

  function stopAutoplayTimer () {
    clearInterval(autoplayTimer);
    animating = false;
  }

  function updateAutoplayButton (action, txt) {
    setAttrs(autoplayButton, {'data-action': action});
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }

  function startAutoplay () {
    setAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('stop', autoplayText[1]); }
  }

  function stopAutoplay () {
    stopAutoplayTimer();
    if (autoplayButton) { updateAutoplayButton('start', autoplayText[0]); }
  }

  // programaitcally play/pause the slider
  function play () {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause () {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }

  function toggleAutoplay () {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }

  function onVisibilityChange () {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause () {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }

  function mouseoutRestart () {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  }

  // keydown events on document
  function onDocumentKeydown (e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      onControlsClick(e, keyIndex === 0 ? -1 : 1);
    }
  }

  // on key control
  function onControlsKeydown (e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (!prevButton.disabled) { onControlsClick(e, -1); }
      } else if (!nextButton.disabled) {
        onControlsClick(e, 1);
      }
    }
  }

  // set focus
  function setFocus (el) {
    el.focus();
  }

  // on key nav
  function onNavKeydown (e) {
    e = getEvent(e);
    var curElement = doc.activeElement;
    if (!hasAttr(curElement, 'data-nav')) { return; }

    // var code = e.keyCode,
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
        navIndex = Number(getAttr(curElement, 'data-nav'));

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) { setFocus(navItems[navIndex - 1]); }
      } else if (keyIndex === 1) {
        if (navIndex < pages - 1) { setFocus(navItems[navIndex + 1]); }
      } else {
        navClicked = navIndex;
        goTo(navIndex, e);
      }
    }
  }

  function getEvent (e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget (e) {
    return e.target || win.event.srcElement;
  }

  function isTouchEvent (e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior (e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }

  function getMoveDirectionExpected () {
    return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
  }

  function onPanStart (e) {
    if (running) {
      if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
    }

    if (autoplay && animating) { stopAutoplayTimer(); }

    panStart = true;
    if (rafIndex) {
      caf(rafIndex);
      rafIndex = null;
    }

    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }

    lastPosition.x = initPosition.x = $.clientX;
    lastPosition.y = initPosition.y = $.clientY;
    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
      resetDuration(container, '0s');
    }
  }

  function onPanMove (e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;

      if (carousel) {
        if (!rafIndex) { rafIndex = raf(function(){ panUpdate(e); }); }
      } else {
        if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
        if (moveDirectionExpected) { preventScroll = true; }
      }

      if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }

  function panUpdate (e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    caf(rafIndex);
    if (panStart) { rafIndex = raf(function(){ panUpdate(e); }); }

    if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) { preventScroll = true; }

      try {
        if (e.type) { events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e)); }
      } catch(err) {}

      var x = translateInit,
          dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew): dist * 100 / (viewport + gutter);
        x += percentageX;
        x += '%';
      }

      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }

  function onPanEnd (e) {
    if (panStart) {
      if (rafIndex) {
        caf(rafIndex);
        rafIndex = null;
      }
      if (carousel) { resetDuration(container, ''); }
      panStart = false;

      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      var dist = getDist(lastPosition, initPosition);

      if (Math.abs(dist)) {
        // drag vs click
        if (!isTouchEvent(e)) {
          // prevent "click"
          var target = getTarget(e);
          addEvents(target, {'click': function preventClick (e) {
            preventDefaultBehavior(e);
            removeEvents(target, {'click': preventClick});
          }});
        }

        if (carousel) {
          rafIndex = raf(function() {
            if (horizontal && !autoWidth) {
              var indexMoved = - dist * items / (viewport + gutter);
              indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
              index += indexMoved;
            } else {
              var moved = - (translateInit + dist);
              if (moved <= 0) {
                index = indexMin;
              } else if (moved >= slidePositions[slideCountNew - 1]) {
                index = indexMax;
              } else {
                var i = 0;
                while (i < slideCountNew && moved >= slidePositions[i]) {
                  index = i;
                  if (moved > slidePositions[i] && dist < 0) { index += 1; }
                  i++;
                }
              }
            }

            render(e, dist);
            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
          });
        } else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    }

    // reset
    if (options.preventScrollOnTouch === 'auto') { preventScroll = false; }
    if (swipeAngle) { moveDirectionExpected = '?'; }
    if (autoplay && !animating) { setAutoplayTimer(); }
  }

  // === RESIZE FUNCTIONS === //
  // (slidePositions, index, items) => vertical_conentWrapper.height
  function updateContentWrapperHeight () {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
  }

  function getPages () {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }

  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */
  function updateNavVisibility () {
    if (!nav || navAsThumbnails) { return; }

    if (pages !== pagesCached) {
      var min = pagesCached,
          max = pages,
          fn = showElement;

      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = hideElement;
      }

      while (min < max) {
        fn(navItems[min]);
        min++;
      }

      // cache pages
      pagesCached = pages;
    }
  }

  function info (e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      pages: pages,
      pagesCached: pagesCached,
      sheet: sheet,
      isOn: isOn,
      event: e || {},
    };
  }

  return {
    version: '2.9.3',
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy: destroy,
    rebuild: function() {
      return tns(extend(options, optionsElements));
    }
  };
};

exports.tns = tns;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueS1zbGlkZXItM2Y5NDA0NDQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9yYWYuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY2FmLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2V4dGVuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9jaGVja1N0b3JhZ2VWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9zZXRMb2NhbFN0b3JhZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0U2xpZGVJZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRCb2R5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2RvY0VsZW1lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvc2V0RmFrZUJvZHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmVzZXRGYWtlQm9keS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9jYWxjLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3BlcmNlbnRhZ2VMYXlvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvbWVkaWFxdWVyeVN1cHBvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY3JlYXRlU3R5bGVTaGVldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9hZGRDU1NSdWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUNTU1J1bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0Q3NzUnVsZXNMZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvdG9EZWdyZWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0VG91Y2hEaXJlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZm9yRWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9jbGFzc0xpc3RTdXBwb3J0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhc0NsYXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2FkZENsYXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUNsYXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhc0F0dHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0QXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9pc05vZGVMaXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3NldEF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2FycmF5RnJvbU5vZGVMaXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hpZGVFbGVtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3Nob3dFbGVtZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2lzVmlzaWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy93aGljaFByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhczNEVHJhbnNmb3Jtcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRFbmRQcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9wYXNzaXZlT3B0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2FkZEV2ZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9yZW1vdmVFdmVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZXZlbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2pzVHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy90aW55LXNsaWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2luID0gd2luZG93O1xuXG5leHBvcnQgdmFyIHJhZiA9IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW4ubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbi5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gc2V0VGltZW91dChjYiwgMTYpOyB9O1xuIiwidmFyIHdpbiA9IHdpbmRvdztcblxuZXhwb3J0IHZhciBjYWYgPSB3aW4uY2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luLm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IGZ1bmN0aW9uKGlkKXsgY2xlYXJUaW1lb3V0KGlkKTsgfTtcbiIsImV4cG9ydCBmdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBvYmosIG5hbWUsIGNvcHksXG4gICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgICBpID0gMSxcbiAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgob2JqID0gYXJndW1lbnRzW2ldKSAhPT0gbnVsbCkge1xuICAgICAgZm9yIChuYW1lIGluIG9iaikge1xuICAgICAgICBjb3B5ID0gb2JqW25hbWVdO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjb3B5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU3RvcmFnZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gWyd0cnVlJywgJ2ZhbHNlJ10uaW5kZXhPZih2YWx1ZSkgPj0gMCA/IEpTT04ucGFyc2UodmFsdWUpIDogdmFsdWU7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShzdG9yYWdlLCBrZXksIHZhbHVlLCBhY2Nlc3MpIHtcbiAgaWYgKGFjY2Vzcykge1xuICAgIHRyeSB7IHN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTsgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldFNsaWRlSWQoKSB7XG4gIHZhciBpZCA9IHdpbmRvdy50bnNJZDtcbiAgd2luZG93LnRuc0lkID0gIWlkID8gMSA6IGlkICsgMTtcbiAgXG4gIHJldHVybiAndG5zJyArIHdpbmRvdy50bnNJZDtcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Qm9keSAoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgIGJvZHkgPSBkb2MuYm9keTtcblxuICBpZiAoIWJvZHkpIHtcbiAgICBib2R5ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICBib2R5LmZha2UgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGJvZHk7XG59IiwiZXhwb3J0IHZhciBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsImltcG9ydCB7IGRvY0VsZW1lbnQgfSBmcm9tICcuL2RvY0VsZW1lbnQuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0RmFrZUJvZHkgKGJvZHkpIHtcbiAgdmFyIGRvY092ZXJmbG93ID0gJyc7XG4gIGlmIChib2R5LmZha2UpIHtcbiAgICBkb2NPdmVyZmxvdyA9IGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XG4gICAgLy9hdm9pZCBjcmFzaGluZyBJRTgsIGlmIGJhY2tncm91bmQgaW1hZ2UgaXMgdXNlZFxuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIC8vU2FmYXJpIDUuMTMvNS4xLjQgT1NYIHN0b3BzIGxvYWRpbmcgaWYgOjotd2Via2l0LXNjcm9sbGJhciBpcyB1c2VkIGFuZCBzY3JvbGxiYXJzIGFyZSB2aXNpYmxlXG4gICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICBkb2NFbGVtZW50LmFwcGVuZENoaWxkKGJvZHkpO1xuICB9XG5cbiAgcmV0dXJuIGRvY092ZXJmbG93O1xufSIsImltcG9ydCB7IGRvY0VsZW1lbnQgfSBmcm9tICcuL2RvY0VsZW1lbnQuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGYWtlQm9keSAoYm9keSwgZG9jT3ZlcmZsb3cpIHtcbiAgaWYgKGJvZHkuZmFrZSkge1xuICAgIGJvZHkucmVtb3ZlKCk7XG4gICAgZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY092ZXJmbG93O1xuICAgIC8vIFRyaWdnZXIgbGF5b3V0IHNvIGtpbmV0aWMgc2Nyb2xsaW5nIGlzbid0IGRpc2FibGVkIGluIGlPUzYrXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgZG9jRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cbn0iLCIvLyBnZXQgY3NzLWNhbGMgXG4vLyBAcmV0dXJuIC0gZmFsc2UgfCBjYWxjIHwgLXdlYmtpdC1jYWxjIHwgLW1vei1jYWxjXG4vLyBAdXNhZ2UgLSB2YXIgY2FsYyA9IGdldENhbGMoKTsgXG5pbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGMoKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCwgXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICBib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHRyeSB7XG4gICAgdmFyIHN0ciA9ICcoMTBweCAqIDEwKScsXG4gICAgICAgIHZhbHMgPSBbJ2NhbGMnICsgc3RyLCAnLW1vei1jYWxjJyArIHN0ciwgJy13ZWJraXQtY2FsYycgKyBzdHJdLFxuICAgICAgICB2YWw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIHZhbCA9IHZhbHNbaV07XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSB2YWw7XG4gICAgICBpZiAoZGl2Lm9mZnNldFdpZHRoID09PSAxMDApIHsgXG4gICAgICAgIHJlc3VsdCA9IHZhbC5yZXBsYWNlKHN0ciwgJycpOyBcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICBcbiAgYm9keS5mYWtlID8gcmVzZXRGYWtlQm9keShib2R5LCBkb2NPdmVyZmxvdykgOiBkaXYucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvLyBnZXQgc3VicGl4ZWwgc3VwcG9ydCB2YWx1ZVxuLy8gQHJldHVybiAtIGJvb2xlYW5cbmltcG9ydCB7IGdldEJvZHkgfSBmcm9tICcuL2dldEJvZHkuanMnO1xuaW1wb3J0IHsgc2V0RmFrZUJvZHkgfSBmcm9tICcuL3NldEZha2VCb2R5LmpzJztcbmltcG9ydCB7IHJlc2V0RmFrZUJvZHkgfSBmcm9tICcuL3Jlc2V0RmFrZUJvZHkuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyY2VudGFnZUxheW91dCgpIHtcbiAgLy8gY2hlY2sgc3VicGl4ZWwgbGF5b3V0IHN1cHBvcnRpbmdcbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICAgICAgYm9keSA9IGdldEJvZHkoKSxcbiAgICAgIGRvY092ZXJmbG93ID0gc2V0RmFrZUJvZHkoYm9keSksXG4gICAgICB3cmFwcGVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgb3V0ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBzdHIgPSAnJyxcbiAgICAgIGNvdW50ID0gNzAsXG4gICAgICBwZXJQYWdlID0gMyxcbiAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gIHdyYXBwZXIuY2xhc3NOYW1lID0gXCJ0bnMtdC1zdWJwMlwiO1xuICBvdXRlci5jbGFzc05hbWUgPSBcInRucy10LWN0XCI7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgc3RyICs9ICc8ZGl2PjwvZGl2Pic7XG4gIH1cblxuICBvdXRlci5pbm5lckhUTUwgPSBzdHI7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICBib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gIHN1cHBvcnRlZCA9IE1hdGguYWJzKHdyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIG91dGVyLmNoaWxkcmVuW2NvdW50IC0gcGVyUGFnZV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgPCAyO1xuXG4gIGJvZHkuZmFrZSA/IHJlc2V0RmFrZUJvZHkoYm9keSwgZG9jT3ZlcmZsb3cpIDogd3JhcHBlci5yZW1vdmUoKTtcblxuICByZXR1cm4gc3VwcG9ydGVkO1xufSIsImltcG9ydCB7IGdldEJvZHkgfSBmcm9tICcuL2dldEJvZHkuanMnO1xuaW1wb3J0IHsgc2V0RmFrZUJvZHkgfSBmcm9tICcuL3NldEZha2VCb2R5LmpzJztcbmltcG9ydCB7IHJlc2V0RmFrZUJvZHkgfSBmcm9tICcuL3Jlc2V0RmFrZUJvZHkuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFxdWVyeVN1cHBvcnQgKCkge1xuICBpZiAod2luZG93Lm1hdGNoTWVkaWEgfHwgd2luZG93Lm1zTWF0Y2hNZWRpYSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFxuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICBydWxlID0gJ0BtZWRpYSBhbGwgYW5kIChtaW4td2lkdGg6MXB4KXsudG5zLW1xLXRlc3R7cG9zaXRpb246YWJzb2x1dGV9fScsXG4gICAgICBwb3NpdGlvbjtcblxuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgZGl2LmNsYXNzTmFtZSA9ICd0bnMtbXEtdGVzdCc7XG5cbiAgYm9keS5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJ1bGU7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHJ1bGUpKTtcbiAgfVxuXG4gIHBvc2l0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkaXYpLnBvc2l0aW9uIDogZGl2LmN1cnJlbnRTdHlsZVsncG9zaXRpb24nXTtcblxuICBib2R5LmZha2UgPyByZXNldEZha2VCb2R5KGJvZHksIGRvY092ZXJmbG93KSA6IGRpdi5yZW1vdmUoKTtcblxuICByZXR1cm4gcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIjtcbn1cbiIsIi8vIGNyZWF0ZSBhbmQgYXBwZW5kIHN0eWxlIHNoZWV0XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGVTaGVldCAobWVkaWEsIG5vbmNlKSB7XG4gIC8vIENyZWF0ZSB0aGUgPHN0eWxlPiB0YWdcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9jc3NcIik7XG5cbiAgLy8gQWRkIGEgbWVkaWEgKGFuZC9vciBtZWRpYSBxdWVyeSkgaGVyZSBpZiB5b3UnZCBsaWtlIVxuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcInNjcmVlblwiKVxuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogMTAyNHB4KVwiKVxuICBpZiAobWVkaWEpIHsgc3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpOyB9XG5cbiAgLy8gQWRkIG5vbmNlIGF0dHJpYnV0ZSBmb3IgQ29udGVudCBTZWN1cml0eSBQb2xpY3lcbiAgaWYgKG5vbmNlKSB7IHN0eWxlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTsgfVxuXG4gIC8vIFdlYktpdCBoYWNrIDooXG4gIC8vIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcblxuICAvLyBBZGQgdGhlIDxzdHlsZT4gZWxlbWVudCB0byB0aGUgcGFnZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZS5zaGVldCA/IHN0eWxlLnNoZWV0IDogc3R5bGUuc3R5bGVTaGVldDtcbn07IiwiLy8gY3Jvc3MgYnJvd3NlcnMgYWRkUnVsZSBtZXRob2RcbmltcG9ydCB7IHJhZiB9IGZyb20gJy4vcmFmLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBhZGRDU1NSdWxlKHNoZWV0LCBzZWxlY3RvciwgcnVsZXMsIGluZGV4KSB7XG4gIC8vIHJldHVybiByYWYoZnVuY3Rpb24oKSB7XG4gICAgJ2luc2VydFJ1bGUnIGluIHNoZWV0ID9cbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3IgKyAneycgKyBydWxlcyArICd9JywgaW5kZXgpIDpcbiAgICAgIHNoZWV0LmFkZFJ1bGUoc2VsZWN0b3IsIHJ1bGVzLCBpbmRleCk7XG4gIC8vIH0pO1xufSIsIi8vIGNyb3NzIGJyb3dzZXJzIGFkZFJ1bGUgbWV0aG9kXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL3JhZi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ1NTUnVsZShzaGVldCwgaW5kZXgpIHtcbiAgLy8gcmV0dXJuIHJhZihmdW5jdGlvbigpIHtcbiAgICAnZGVsZXRlUnVsZScgaW4gc2hlZXQgP1xuICAgICAgc2hlZXQuZGVsZXRlUnVsZShpbmRleCkgOlxuICAgICAgc2hlZXQucmVtb3ZlUnVsZShpbmRleCk7XG4gIC8vIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkge1xuICB2YXIgcnVsZSA9ICgnaW5zZXJ0UnVsZScgaW4gc2hlZXQpID8gc2hlZXQuY3NzUnVsZXMgOiBzaGVldC5ydWxlcztcbiAgcmV0dXJuIHJ1bGUubGVuZ3RoO1xufSIsImV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZSAoeSwgeCkge1xuICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqICgxODAgLyBNYXRoLlBJKTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2hEaXJlY3Rpb24oYW5nbGUsIHJhbmdlKSB7XG4gIHZhciBkaXJlY3Rpb24gPSBmYWxzZSxcbiAgICAgIGdhcCA9IE1hdGguYWJzKDkwIC0gTWF0aC5hYnMoYW5nbGUpKTtcbiAgICAgIFxuICBpZiAoZ2FwID49IDkwIC0gcmFuZ2UpIHtcbiAgICBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIH0gZWxzZSBpZiAoZ2FwIDw9IHJhbmdlKSB7XG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb247XG59IiwiLy8gaHR0cHM6Ly90b2RkbW90dG8uY29tL2RpdGNoLXRoZS1hcnJheS1mb3JlYWNoLWNhbGwtbm9kZWxpc3QtaGFjay9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoIChhcnIsIGNhbGxiYWNrLCBzY29wZSkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCBhcnJbaV0sIGkpO1xuICB9XG59IiwiZXhwb3J0IHZhciBjbGFzc0xpc3RTdXBwb3J0ID0gJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpOyIsImltcG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQgfSBmcm9tICcuL2NsYXNzTGlzdFN1cHBvcnQuanMnO1xuXG52YXIgaGFzQ2xhc3MgPSBjbGFzc0xpc3RTdXBwb3J0ID9cbiAgICBmdW5jdGlvbiAoZWwsIHN0cikgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHN0cik7IH0gOlxuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7IHJldHVybiBlbC5jbGFzc05hbWUuaW5kZXhPZihzdHIpID49IDA7IH07XG5cbmV4cG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQsIGhhc0NsYXNzIH07IiwiaW1wb3J0IHsgY2xhc3NMaXN0U3VwcG9ydCwgaGFzQ2xhc3MgfSBmcm9tICcuL2hhc0NsYXNzLmpzJztcbnZhciBhZGRDbGFzcyA9IGNsYXNzTGlzdFN1cHBvcnQgP1xuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7XG4gICAgICBpZiAoIWhhc0NsYXNzKGVsLCAgc3RyKSkgeyBlbC5jbGFzc0xpc3QuYWRkKHN0cik7IH1cbiAgICB9IDpcbiAgICBmdW5jdGlvbiAoZWwsIHN0cikge1xuICAgICAgaWYgKCFoYXNDbGFzcyhlbCwgIHN0cikpIHsgZWwuY2xhc3NOYW1lICs9ICcgJyArIHN0cjsgfVxuICAgIH07XG5cbmV4cG9ydCB7IGFkZENsYXNzIH07IiwiaW1wb3J0IHsgY2xhc3NMaXN0U3VwcG9ydCwgaGFzQ2xhc3MgfSBmcm9tICcuL2hhc0NsYXNzLmpzJztcbnZhciByZW1vdmVDbGFzcyA9IGNsYXNzTGlzdFN1cHBvcnQgP1xuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7XG4gICAgICBpZiAoaGFzQ2xhc3MoZWwsICBzdHIpKSB7IGVsLmNsYXNzTGlzdC5yZW1vdmUoc3RyKTsgfVxuICAgIH0gOlxuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7XG4gICAgICBpZiAoaGFzQ2xhc3MoZWwsIHN0cikpIHsgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2Uoc3RyLCAnJyk7IH1cbiAgICB9O1xuXG5leHBvcnQgeyByZW1vdmVDbGFzcyB9OyIsImV4cG9ydCBmdW5jdGlvbiBoYXNBdHRyKGVsLCBhdHRyKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUoYXR0cik7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHIoZWwsIGF0dHIpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShhdHRyKTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gaXNOb2RlTGlzdChlbCkge1xuICAvLyBPbmx5IE5vZGVMaXN0IGhhcyB0aGUgXCJpdGVtKClcIiBmdW5jdGlvblxuICByZXR1cm4gdHlwZW9mIGVsLml0ZW0gIT09IFwidW5kZWZpbmVkXCI7IFxufSIsImltcG9ydCB7IGlzTm9kZUxpc3QgfSBmcm9tIFwiLi9pc05vZGVMaXN0LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbHMsIGF0dHJzKSB7XG4gIGVscyA9IChpc05vZGVMaXN0KGVscykgfHwgZWxzIGluc3RhbmNlb2YgQXJyYXkpID8gZWxzIDogW2Vsc107XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXR0cnMpICE9PSAnW29iamVjdCBPYmplY3RdJykgeyByZXR1cm47IH1cblxuICBmb3IgKHZhciBpID0gZWxzLmxlbmd0aDsgaS0tOykge1xuICAgIGZvcih2YXIga2V5IGluIGF0dHJzKSB7XG4gICAgICBlbHNbaV0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgaXNOb2RlTGlzdCB9IGZyb20gXCIuL2lzTm9kZUxpc3QuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHJzKGVscywgYXR0cnMpIHtcbiAgZWxzID0gKGlzTm9kZUxpc3QoZWxzKSB8fCBlbHMgaW5zdGFuY2VvZiBBcnJheSkgPyBlbHMgOiBbZWxzXTtcbiAgYXR0cnMgPSAoYXR0cnMgaW5zdGFuY2VvZiBBcnJheSkgPyBhdHRycyA6IFthdHRyc107XG5cbiAgdmFyIGF0dHJMZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSBlbHMubGVuZ3RoOyBpLS07KSB7XG4gICAgZm9yICh2YXIgaiA9IGF0dHJMZW5ndGg7IGotLTspIHtcbiAgICAgIGVsc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cnNbal0pO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBhcnJheUZyb21Ob2RlTGlzdCAobmwpIHtcbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IG5sLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyci5wdXNoKG5sW2ldKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufSIsImV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbCwgZm9yY2VIaWRlKSB7XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHsgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbCwgZm9yY2VIaWRlKSB7XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHsgZWwuc3R5bGUuZGlzcGxheSA9ICcnOyB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShlbCkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmRpc3BsYXkgIT09ICdub25lJztcbn0iLCJleHBvcnQgZnVuY3Rpb24gd2hpY2hQcm9wZXJ0eShwcm9wcyl7XG4gIGlmICh0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIGFyciA9IFtwcm9wc10sXG4gICAgICAgIFByb3BzID0gcHJvcHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wcy5zdWJzdHIoMSksXG4gICAgICAgIHByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ21zJywgJ08nXTtcbiAgICAgICAgXG4gICAgcHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgIGlmIChwcmVmaXggIT09ICdtcycgfHwgcHJvcHMgPT09ICd0cmFuc2Zvcm0nKSB7XG4gICAgICAgIGFyci5wdXNoKHByZWZpeCArIFByb3BzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb3BzID0gYXJyO1xuICB9XG5cbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKSxcbiAgICAgIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKXtcbiAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgIGlmKCBlbC5zdHlsZVtwcm9wXSAhPT0gdW5kZWZpbmVkICl7IHJldHVybiBwcm9wOyB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7IC8vIGV4cGxpY2l0IGZvciBpZTktXG59XG4iLCJpbXBvcnQgeyBnZXRCb2R5IH0gZnJvbSAnLi9nZXRCb2R5LmpzJztcbmltcG9ydCB7IHNldEZha2VCb2R5IH0gZnJvbSAnLi9zZXRGYWtlQm9keS5qcyc7XG5pbXBvcnQgeyByZXNldEZha2VCb2R5IH0gZnJvbSAnLi9yZXNldEZha2VCb2R5LmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhczNEVHJhbnNmb3Jtcyh0Zil7XG4gIGlmICghdGYpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIFxuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICAgIGhhczNkLFxuICAgICAgY3NzVEYgPSB0Zi5sZW5ndGggPiA5ID8gJy0nICsgdGYuc2xpY2UoMCwgLTkpLnRvTG93ZXJDYXNlKCkgKyAnLScgOiAnJztcblxuICBjc3NURiArPSAndHJhbnNmb3JtJztcblxuICAvLyBBZGQgaXQgdG8gdGhlIGJvZHkgdG8gZ2V0IHRoZSBjb21wdXRlZCBzdHlsZVxuICBib2R5Lmluc2VydEJlZm9yZShlbCwgbnVsbCk7XG5cbiAgZWwuc3R5bGVbdGZdID0gJ3RyYW5zbGF0ZTNkKDFweCwxcHgsMXB4KSc7XG4gIGhhczNkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUoY3NzVEYpO1xuXG4gIGJvZHkuZmFrZSA/IHJlc2V0RmFrZUJvZHkoYm9keSwgZG9jT3ZlcmZsb3cpIDogZWwucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIChoYXMzZCAhPT0gdW5kZWZpbmVkICYmIGhhczNkLmxlbmd0aCA+IDAgJiYgaGFzM2QgIT09IFwibm9uZVwiKTtcbn1cbiIsIi8vIGdldCB0cmFuc2l0aW9uZW5kLCBhbmltYXRpb25lbmQgYmFzZWQgb24gdHJhbnNpdGlvbkR1cmF0aW9uXG4vLyBAcHJvcGluOiBzdHJpbmdcbi8vIEBwcm9wT3V0OiBzdHJpbmcsIGZpcnN0LWxldHRlciB1cHBlcmNhc2Vcbi8vIFVzYWdlOiBnZXRFbmRQcm9wZXJ0eSgnV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uJywgJ1RyYW5zaXRpb24nKSA9PiB3ZWJraXRUcmFuc2l0aW9uRW5kXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kUHJvcGVydHkocHJvcEluLCBwcm9wT3V0KSB7XG4gIHZhciBlbmRQcm9wID0gZmFsc2U7XG4gIGlmICgvXldlYmtpdC8udGVzdChwcm9wSW4pKSB7XG4gICAgZW5kUHJvcCA9ICd3ZWJraXQnICsgcHJvcE91dCArICdFbmQnO1xuICB9IGVsc2UgaWYgKC9eTy8udGVzdChwcm9wSW4pKSB7XG4gICAgZW5kUHJvcCA9ICdvJyArIHByb3BPdXQgKyAnRW5kJztcbiAgfSBlbHNlIGlmIChwcm9wSW4pIHtcbiAgICBlbmRQcm9wID0gcHJvcE91dC50b0xvd2VyQ2FzZSgpICsgJ2VuZCc7XG4gIH1cbiAgcmV0dXJuIGVuZFByb3A7XG59IiwiLy8gVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZSBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZFxudmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBvcHRzKTtcbn0gY2F0Y2ggKGUpIHt9XG5leHBvcnQgdmFyIHBhc3NpdmVPcHRpb24gPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlOyIsImltcG9ydCB7IHBhc3NpdmVPcHRpb24gfSBmcm9tICcuL3Bhc3NpdmVPcHRpb24uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRzKGVsLCBvYmosIHByZXZlbnRTY3JvbGxpbmcpIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICB2YXIgb3B0aW9uID0gWyd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZSddLmluZGV4T2YocHJvcCkgPj0gMCAmJiAhcHJldmVudFNjcm9sbGluZyA/IHBhc3NpdmVPcHRpb24gOiBmYWxzZTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKHByb3AsIG9ialtwcm9wXSwgb3B0aW9uKTtcbiAgfVxufSIsImltcG9ydCB7IHBhc3NpdmVPcHRpb24gfSBmcm9tICcuL3Bhc3NpdmVPcHRpb24uanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRzKGVsLCBvYmopIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICB2YXIgb3B0aW9uID0gWyd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZSddLmluZGV4T2YocHJvcCkgPj0gMCA/IHBhc3NpdmVPcHRpb24gOiBmYWxzZTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHByb3AsIG9ialtwcm9wXSwgb3B0aW9uKTtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBFdmVudHMoKSB7XG4gIHJldHVybiB7XG4gICAgdG9waWNzOiB7fSxcbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIHRoaXMudG9waWNzW2V2ZW50TmFtZV0gPSB0aGlzLnRvcGljc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgdGhpcy50b3BpY3NbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRvcGljc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgICAgICB0aGlzLnRvcGljc1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgZGF0YS50eXBlID0gZXZlbnROYW1lO1xuICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpcy50b3BpY3NbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgZm4oZGF0YSwgZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTsiLCJleHBvcnQgZnVuY3Rpb24ganNUcmFuc2Zvcm0oZWxlbWVudCwgYXR0ciwgcHJlZml4LCBwb3N0Zml4LCB0bywgZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gIHZhciB0aWNrID0gTWF0aC5taW4oZHVyYXRpb24sIDEwKSxcbiAgICAgIHVuaXQgPSAodG8uaW5kZXhPZignJScpID49IDApID8gJyUnIDogJ3B4JyxcbiAgICAgIHRvID0gdG8ucmVwbGFjZSh1bml0LCAnJyksXG4gICAgICBmcm9tID0gTnVtYmVyKGVsZW1lbnQuc3R5bGVbYXR0cl0ucmVwbGFjZShwcmVmaXgsICcnKS5yZXBsYWNlKHBvc3RmaXgsICcnKS5yZXBsYWNlKHVuaXQsICcnKSksXG4gICAgICBwb3NpdGlvblRpY2sgPSAodG8gLSBmcm9tKSAvIGR1cmF0aW9uICogdGljayxcbiAgICAgIHJ1bm5pbmc7XG5cbiAgc2V0VGltZW91dChtb3ZlRWxlbWVudCwgdGljayk7XG4gIGZ1bmN0aW9uIG1vdmVFbGVtZW50KCkge1xuICAgIGR1cmF0aW9uIC09IHRpY2s7XG4gICAgZnJvbSArPSBwb3NpdGlvblRpY2s7XG4gICAgZWxlbWVudC5zdHlsZVthdHRyXSA9IHByZWZpeCArIGZyb20gKyB1bml0ICsgcG9zdGZpeDtcbiAgICBpZiAoZHVyYXRpb24gPiAwKSB7IFxuICAgICAgc2V0VGltZW91dChtb3ZlRWxlbWVudCwgdGljayk7IFxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufSIsIi8vIE9iamVjdC5rZXlzXG5pZiAoIU9iamVjdC5rZXlzKSB7XG4gIE9iamVjdC5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKSB7XG4gICAgICAgIGtleXMucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG59XG5cbi8vIENoaWxkTm9kZS5yZW1vdmVcbmlmKCEoXCJyZW1vdmVcIiBpbiBFbGVtZW50LnByb3RvdHlwZSkpe1xuICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpe1xuICAgIGlmKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH1cbiAgfTtcbn1cblxuaW1wb3J0IHsgcmFmIH0gZnJvbSAnLi9oZWxwZXJzL3JhZi5qcyc7XG5pbXBvcnQgeyBjYWYgfSBmcm9tICcuL2hlbHBlcnMvY2FmLmpzJztcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4vaGVscGVycy9leHRlbmQuanMnO1xuaW1wb3J0IHsgY2hlY2tTdG9yYWdlVmFsdWUgfSBmcm9tICcuL2hlbHBlcnMvY2hlY2tTdG9yYWdlVmFsdWUuanMnO1xuaW1wb3J0IHsgc2V0TG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXJzL3NldExvY2FsU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBnZXRTbGlkZUlkIH0gZnJvbSAnLi9oZWxwZXJzL2dldFNsaWRlSWQuanMnO1xuaW1wb3J0IHsgY2FsYyB9IGZyb20gJy4vaGVscGVycy9jYWxjLmpzJztcbmltcG9ydCB7IHBlcmNlbnRhZ2VMYXlvdXQgfSBmcm9tICcuL2hlbHBlcnMvcGVyY2VudGFnZUxheW91dC5qcyc7XG5pbXBvcnQgeyBtZWRpYXF1ZXJ5U3VwcG9ydCB9IGZyb20gJy4vaGVscGVycy9tZWRpYXF1ZXJ5U3VwcG9ydC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZVNoZWV0IH0gZnJvbSAnLi9oZWxwZXJzL2NyZWF0ZVN0eWxlU2hlZXQuanMnO1xuaW1wb3J0IHsgYWRkQ1NTUnVsZSB9IGZyb20gJy4vaGVscGVycy9hZGRDU1NSdWxlLmpzJztcbmltcG9ydCB7IHJlbW92ZUNTU1J1bGUgfSBmcm9tICcuL2hlbHBlcnMvcmVtb3ZlQ1NTUnVsZS5qcyc7XG5pbXBvcnQgeyBnZXRDc3NSdWxlc0xlbmd0aCB9IGZyb20gJy4vaGVscGVycy9nZXRDc3NSdWxlc0xlbmd0aC5qcyc7XG5pbXBvcnQgeyB0b0RlZ3JlZSB9IGZyb20gJy4vaGVscGVycy90b0RlZ3JlZS5qcyc7XG5pbXBvcnQgeyBnZXRUb3VjaERpcmVjdGlvbiB9IGZyb20gJy4vaGVscGVycy9nZXRUb3VjaERpcmVjdGlvbi5qcyc7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAnLi9oZWxwZXJzL2ZvckVhY2guanMnO1xuaW1wb3J0IHsgaGFzQ2xhc3MgfSBmcm9tICcuL2hlbHBlcnMvaGFzQ2xhc3MuanMnO1xuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuL2hlbHBlcnMvYWRkQ2xhc3MuanMnO1xuaW1wb3J0IHsgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuL2hlbHBlcnMvcmVtb3ZlQ2xhc3MuanMnO1xuaW1wb3J0IHsgaGFzQXR0ciB9IGZyb20gJy4vaGVscGVycy9oYXNBdHRyLmpzJztcbmltcG9ydCB7IGdldEF0dHIgfSBmcm9tICcuL2hlbHBlcnMvZ2V0QXR0ci5qcyc7XG5pbXBvcnQgeyBzZXRBdHRycyB9IGZyb20gJy4vaGVscGVycy9zZXRBdHRycy5qcyc7XG5pbXBvcnQgeyByZW1vdmVBdHRycyB9IGZyb20gJy4vaGVscGVycy9yZW1vdmVBdHRycy5qcyc7XG5pbXBvcnQgeyBhcnJheUZyb21Ob2RlTGlzdCB9IGZyb20gJy4vaGVscGVycy9hcnJheUZyb21Ob2RlTGlzdC5qcyc7XG5pbXBvcnQgeyBoaWRlRWxlbWVudCB9IGZyb20gJy4vaGVscGVycy9oaWRlRWxlbWVudC5qcyc7XG5pbXBvcnQgeyBzaG93RWxlbWVudCB9IGZyb20gJy4vaGVscGVycy9zaG93RWxlbWVudC5qcyc7XG5pbXBvcnQgeyBpc1Zpc2libGUgfSBmcm9tICcuL2hlbHBlcnMvaXNWaXNpYmxlLmpzJztcbmltcG9ydCB7IHdoaWNoUHJvcGVydHkgfSBmcm9tICcuL2hlbHBlcnMvd2hpY2hQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgeyBoYXMzRFRyYW5zZm9ybXMgfSBmcm9tICcuL2hlbHBlcnMvaGFzM0RUcmFuc2Zvcm1zLmpzJztcbmltcG9ydCB7IGdldEVuZFByb3BlcnR5IH0gZnJvbSAnLi9oZWxwZXJzL2dldEVuZFByb3BlcnR5LmpzJztcbmltcG9ydCB7IGFkZEV2ZW50cyB9IGZyb20gJy4vaGVscGVycy9hZGRFdmVudHMuanMnO1xuaW1wb3J0IHsgcmVtb3ZlRXZlbnRzIH0gZnJvbSAnLi9oZWxwZXJzL3JlbW92ZUV2ZW50cy5qcyc7XG5pbXBvcnQgeyBFdmVudHMgfSBmcm9tICcuL2hlbHBlcnMvZXZlbnRzLmpzJztcbmltcG9ydCB7IGpzVHJhbnNmb3JtIH0gZnJvbSAnLi9oZWxwZXJzL2pzVHJhbnNmb3JtLmpzJztcblxuZXhwb3J0IHZhciB0bnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgIGNvbnRhaW5lcjogJy5zbGlkZXInLFxuICAgIG1vZGU6ICdjYXJvdXNlbCcsXG4gICAgYXhpczogJ2hvcml6b250YWwnLFxuICAgIGl0ZW1zOiAxLFxuICAgIGd1dHRlcjogMCxcbiAgICBlZGdlUGFkZGluZzogMCxcbiAgICBmaXhlZFdpZHRoOiBmYWxzZSxcbiAgICBhdXRvV2lkdGg6IGZhbHNlLFxuICAgIHZpZXdwb3J0TWF4OiBmYWxzZSxcbiAgICBzbGlkZUJ5OiAxLFxuICAgIGNlbnRlcjogZmFsc2UsXG4gICAgY29udHJvbHM6IHRydWUsXG4gICAgY29udHJvbHNQb3NpdGlvbjogJ3RvcCcsXG4gICAgY29udHJvbHNUZXh0OiBbJ3ByZXYnLCAnbmV4dCddLFxuICAgIGNvbnRyb2xzQ29udGFpbmVyOiBmYWxzZSxcbiAgICBwcmV2QnV0dG9uOiBmYWxzZSxcbiAgICBuZXh0QnV0dG9uOiBmYWxzZSxcbiAgICBuYXY6IHRydWUsXG4gICAgbmF2UG9zaXRpb246ICd0b3AnLFxuICAgIG5hdkNvbnRhaW5lcjogZmFsc2UsXG4gICAgbmF2QXNUaHVtYm5haWxzOiBmYWxzZSxcbiAgICBhcnJvd0tleXM6IGZhbHNlLFxuICAgIHNwZWVkOiAzMDAsXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgIGF1dG9wbGF5UG9zaXRpb246ICd0b3AnLFxuICAgIGF1dG9wbGF5VGltZW91dDogNTAwMCxcbiAgICBhdXRvcGxheURpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgIGF1dG9wbGF5VGV4dDogWydzdGFydCcsICdzdG9wJ10sXG4gICAgYXV0b3BsYXlIb3ZlclBhdXNlOiBmYWxzZSxcbiAgICBhdXRvcGxheUJ1dHRvbjogZmFsc2UsXG4gICAgYXV0b3BsYXlCdXR0b25PdXRwdXQ6IHRydWUsXG4gICAgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICBhbmltYXRlSW46ICd0bnMtZmFkZUluJyxcbiAgICBhbmltYXRlT3V0OiAndG5zLWZhZGVPdXQnLFxuICAgIGFuaW1hdGVOb3JtYWw6ICd0bnMtbm9ybWFsJyxcbiAgICBhbmltYXRlRGVsYXk6IGZhbHNlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgcmV3aW5kOiBmYWxzZSxcbiAgICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgICByZXNwb25zaXZlOiBmYWxzZSxcbiAgICBsYXp5bG9hZDogZmFsc2UsXG4gICAgbGF6eWxvYWRTZWxlY3RvcjogJy50bnMtbGF6eS1pbWcnLFxuICAgIHRvdWNoOiB0cnVlLFxuICAgIG1vdXNlRHJhZzogZmFsc2UsXG4gICAgc3dpcGVBbmdsZTogMTUsXG4gICAgbmVzdGVkOiBmYWxzZSxcbiAgICBwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmc6IGZhbHNlLFxuICAgIHByZXZlbnRTY3JvbGxPblRvdWNoOiBmYWxzZSxcbiAgICBmcmVlemFibGU6IHRydWUsXG4gICAgb25Jbml0OiBmYWxzZSxcbiAgICB1c2VMb2NhbFN0b3JhZ2U6IHRydWUsXG4gICAgbm9uY2U6IGZhbHNlXG4gIH0sIG9wdGlvbnMgfHwge30pO1xuXG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgIHdpbiA9IHdpbmRvdyxcbiAgICAgIEtFWVMgPSB7XG4gICAgICAgIEVOVEVSOiAxMyxcbiAgICAgICAgU1BBQ0U6IDMyLFxuICAgICAgICBMRUZUOiAzNyxcbiAgICAgICAgUklHSFQ6IDM5XG4gICAgICB9LFxuICAgICAgdG5zU3RvcmFnZSA9IHt9LFxuICAgICAgbG9jYWxTdG9yYWdlQWNjZXNzID0gb3B0aW9ucy51c2VMb2NhbFN0b3JhZ2U7XG5cbiAgaWYgKGxvY2FsU3RvcmFnZUFjY2Vzcykge1xuICAgIC8vIGNoZWNrIGJyb3dzZXIgdmVyc2lvbiBhbmQgbG9jYWwgc3RvcmFnZSBhY2Nlc3NcbiAgICB2YXIgYnJvd3NlckluZm8gPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIHZhciB1aWQgPSBuZXcgRGF0ZTtcblxuICAgIHRyeSB7XG4gICAgICB0bnNTdG9yYWdlID0gd2luLmxvY2FsU3RvcmFnZTtcbiAgICAgIGlmICh0bnNTdG9yYWdlKSB7XG4gICAgICAgIHRuc1N0b3JhZ2Uuc2V0SXRlbSh1aWQsIHVpZCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZUFjY2VzcyA9IHRuc1N0b3JhZ2UuZ2V0SXRlbSh1aWQpID09IHVpZDtcbiAgICAgICAgdG5zU3RvcmFnZS5yZW1vdmVJdGVtKHVpZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhbFN0b3JhZ2VBY2Nlc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghbG9jYWxTdG9yYWdlQWNjZXNzKSB7IHRuc1N0b3JhZ2UgPSB7fTsgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbG9jYWxTdG9yYWdlQWNjZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZUFjY2Vzcykge1xuICAgICAgLy8gcmVtb3ZlIHN0b3JhZ2Ugd2hlbiBicm93c2VyIHZlcnNpb24gY2hhbmdlc1xuICAgICAgaWYgKHRuc1N0b3JhZ2VbJ3Ruc0FwcCddICYmIHRuc1N0b3JhZ2VbJ3Ruc0FwcCddICE9PSBicm93c2VySW5mbykge1xuICAgICAgICBbJ3RDJywgJ3RQTCcsICd0TVEnLCAndFRmJywgJ3QzRCcsICd0VER1JywgJ3RURGUnLCAndEFEdScsICd0QURlJywgJ3RURScsICd0QUUnXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgdG5zU3RvcmFnZS5yZW1vdmVJdGVtKGl0ZW0pOyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZSBicm93c2VySW5mb1xuICAgICAgbG9jYWxTdG9yYWdlWyd0bnNBcHAnXSA9IGJyb3dzZXJJbmZvO1xuICAgIH1cbiAgfVxuXG4gIHZhciBDQUxDID0gdG5zU3RvcmFnZVsndEMnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RDJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0QycsIGNhbGMoKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIFBFUkNFTlRBR0VMQVlPVVQgPSB0bnNTdG9yYWdlWyd0UEwnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RQTCddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndFBMJywgcGVyY2VudGFnZUxheW91dCgpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgQ1NTTVEgPSB0bnNTdG9yYWdlWyd0TVEnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RNUSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndE1RJywgbWVkaWFxdWVyeVN1cHBvcnQoKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIFRSQU5TRk9STSA9IHRuc1N0b3JhZ2VbJ3RUZiddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndFRmJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0VGYnLCB3aGljaFByb3BlcnR5KCd0cmFuc2Zvcm0nKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIEhBUzNEVFJBTlNGT1JNUyA9IHRuc1N0b3JhZ2VbJ3QzRCddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndDNEJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0M0QnLCBoYXMzRFRyYW5zZm9ybXMoVFJBTlNGT1JNKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIFRSQU5TSVRJT05EVVJBVElPTiA9IHRuc1N0b3JhZ2VbJ3RURHUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RURHUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RURHUnLCB3aGljaFByb3BlcnR5KCd0cmFuc2l0aW9uRHVyYXRpb24nKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIFRSQU5TSVRJT05ERUxBWSA9IHRuc1N0b3JhZ2VbJ3RURGUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RURGUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RURGUnLCB3aGljaFByb3BlcnR5KCd0cmFuc2l0aW9uRGVsYXknKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIEFOSU1BVElPTkRVUkFUSU9OID0gdG5zU3RvcmFnZVsndEFEdSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndEFEdSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndEFEdScsIHdoaWNoUHJvcGVydHkoJ2FuaW1hdGlvbkR1cmF0aW9uJyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBBTklNQVRJT05ERUxBWSA9IHRuc1N0b3JhZ2VbJ3RBRGUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RBRGUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RBRGUnLCB3aGljaFByb3BlcnR5KCdhbmltYXRpb25EZWxheScpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgVFJBTlNJVElPTkVORCA9IHRuc1N0b3JhZ2VbJ3RURSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndFRFJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0VEUnLCBnZXRFbmRQcm9wZXJ0eShUUkFOU0lUSU9ORFVSQVRJT04sICdUcmFuc2l0aW9uJyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBBTklNQVRJT05FTkQgPSB0bnNTdG9yYWdlWyd0QUUnXSA/IGNoZWNrU3RvcmFnZVZhbHVlKHRuc1N0b3JhZ2VbJ3RBRSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndEFFJywgZ2V0RW5kUHJvcGVydHkoQU5JTUFUSU9ORFVSQVRJT04sICdBbmltYXRpb24nKSwgbG9jYWxTdG9yYWdlQWNjZXNzKTtcblxuICAvLyBnZXQgZWxlbWVudCBub2RlcyBmcm9tIHNlbGVjdG9yc1xuICB2YXIgc3VwcG9ydENvbnNvbGVXYXJuID0gd2luLmNvbnNvbGUgJiYgdHlwZW9mIHdpbi5jb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIixcbiAgICAgIHRuc0xpc3QgPSBbJ2NvbnRhaW5lcicsICdjb250cm9sc0NvbnRhaW5lcicsICdwcmV2QnV0dG9uJywgJ25leHRCdXR0b24nLCAnbmF2Q29udGFpbmVyJywgJ2F1dG9wbGF5QnV0dG9uJ10sXG4gICAgICBvcHRpb25zRWxlbWVudHMgPSB7fTtcblxuICB0bnNMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9uc1tpdGVtXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBzdHIgPSBvcHRpb25zW2l0ZW1dLFxuICAgICAgICAgIGVsID0gZG9jLnF1ZXJ5U2VsZWN0b3Ioc3RyKTtcbiAgICAgIG9wdGlvbnNFbGVtZW50c1tpdGVtXSA9IHN0cjtcblxuICAgICAgaWYgKGVsICYmIGVsLm5vZGVOYW1lKSB7XG4gICAgICAgIG9wdGlvbnNbaXRlbV0gPSBlbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdXBwb3J0Q29uc29sZVdhcm4pIHsgY29uc29sZS53YXJuKCdDYW5cXCd0IGZpbmQnLCBvcHRpb25zW2l0ZW1dKTsgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBtYWtlIHN1cmUgYXQgbGVhc3QgMSBzbGlkZVxuICBpZiAob3B0aW9ucy5jb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoIDwgMSkge1xuICAgIGlmIChzdXBwb3J0Q29uc29sZVdhcm4pIHsgY29uc29sZS53YXJuKCdObyBzbGlkZXMgZm91bmQgaW4nLCBvcHRpb25zLmNvbnRhaW5lcik7IH1cbiAgICByZXR1cm47XG4gICB9XG5cbiAgLy8gdXBkYXRlIG9wdGlvbnNcbiAgdmFyIHJlc3BvbnNpdmUgPSBvcHRpb25zLnJlc3BvbnNpdmUsXG4gICAgICBuZXN0ZWQgPSBvcHRpb25zLm5lc3RlZCxcbiAgICAgIGNhcm91c2VsID0gb3B0aW9ucy5tb2RlID09PSAnY2Fyb3VzZWwnID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIGlmIChyZXNwb25zaXZlKSB7XG4gICAgLy8gYXBwbHkgcmVzcG9uc2l2ZVswXSB0byBvcHRpb25zIGFuZCByZW1vdmUgaXRcbiAgICBpZiAoMCBpbiByZXNwb25zaXZlKSB7XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKG9wdGlvbnMsIHJlc3BvbnNpdmVbMF0pO1xuICAgICAgZGVsZXRlIHJlc3BvbnNpdmVbMF07XG4gICAgfVxuXG4gICAgdmFyIHJlc3BvbnNpdmVUZW0gPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgdmFyIHZhbCA9IHJlc3BvbnNpdmVba2V5XTtcbiAgICAgIC8vIHVwZGF0ZSByZXNwb25zaXZlXG4gICAgICAvLyBmcm9tOiAzMDA6IDJcbiAgICAgIC8vIHRvOlxuICAgICAgLy8gICAzMDA6IHtcbiAgICAgIC8vICAgICBpdGVtczogMlxuICAgICAgLy8gICB9XG4gICAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IHtpdGVtczogdmFsfSA6IHZhbDtcbiAgICAgIHJlc3BvbnNpdmVUZW1ba2V5XSA9IHZhbDtcbiAgICB9XG4gICAgcmVzcG9uc2l2ZSA9IHJlc3BvbnNpdmVUZW07XG4gICAgcmVzcG9uc2l2ZVRlbSA9IG51bGw7XG4gIH1cblxuICAvLyB1cGRhdGUgb3B0aW9uc1xuICBmdW5jdGlvbiB1cGRhdGVPcHRpb25zIChvYmopIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdzbGlkZUJ5JykgeyBvYmpba2V5XSA9ICdwYWdlJzsgfVxuICAgICAgICBpZiAoa2V5ID09PSAnZWRnZVBhZGRpbmcnKSB7IG9ialtrZXldID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGtleSA9PT0gJ2F1dG9IZWlnaHQnKSB7IG9ialtrZXldID0gZmFsc2U7IH1cbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHJlc3BvbnNpdmUgb3B0aW9uc1xuICAgICAgaWYgKGtleSA9PT0gJ3Jlc3BvbnNpdmUnKSB7IHVwZGF0ZU9wdGlvbnMob2JqW2tleV0pOyB9XG4gICAgfVxuICB9XG4gIGlmICghY2Fyb3VzZWwpIHsgdXBkYXRlT3B0aW9ucyhvcHRpb25zKTsgfVxuXG5cbiAgLy8gPT09IGRlZmluZSBhbmQgc2V0IHZhcmlhYmxlcyA9PT1cbiAgaWYgKCFjYXJvdXNlbCkge1xuICAgIG9wdGlvbnMuYXhpcyA9ICdob3Jpem9udGFsJztcbiAgICBvcHRpb25zLnNsaWRlQnkgPSAncGFnZSc7XG4gICAgb3B0aW9ucy5lZGdlUGFkZGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIGFuaW1hdGVJbiA9IG9wdGlvbnMuYW5pbWF0ZUluLFxuICAgICAgICBhbmltYXRlT3V0ID0gb3B0aW9ucy5hbmltYXRlT3V0LFxuICAgICAgICBhbmltYXRlRGVsYXkgPSBvcHRpb25zLmFuaW1hdGVEZWxheSxcbiAgICAgICAgYW5pbWF0ZU5vcm1hbCA9IG9wdGlvbnMuYW5pbWF0ZU5vcm1hbDtcbiAgfVxuXG4gIHZhciBob3Jpem9udGFsID0gb3B0aW9ucy5heGlzID09PSAnaG9yaXpvbnRhbCcgPyB0cnVlIDogZmFsc2UsXG4gICAgICBvdXRlcldyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBpbm5lcldyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBtaWRkbGVXcmFwcGVyLFxuICAgICAgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIsXG4gICAgICBjb250YWluZXJQYXJlbnQgPSBjb250YWluZXIucGFyZW50Tm9kZSxcbiAgICAgIGNvbnRhaW5lckhUTUwgPSBjb250YWluZXIub3V0ZXJIVE1MLFxuICAgICAgc2xpZGVJdGVtcyA9IGNvbnRhaW5lci5jaGlsZHJlbixcbiAgICAgIHNsaWRlQ291bnQgPSBzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgIGJyZWFrcG9pbnRab25lLFxuICAgICAgd2luZG93V2lkdGggPSBnZXRXaW5kb3dXaWR0aCgpLFxuICAgICAgaXNPbiA9IGZhbHNlO1xuICBpZiAocmVzcG9uc2l2ZSkgeyBzZXRCcmVha3BvaW50Wm9uZSgpOyB9XG4gIGlmIChjYXJvdXNlbCkgeyBjb250YWluZXIuY2xhc3NOYW1lICs9ICcgdG5zLXZwZml4JzsgfVxuXG4gIC8vIGZpeGVkV2lkdGg6IHZpZXdwb3J0ID4gcmlnaHRCb3VuZGFyeSA+IGluZGV4TWF4XG4gIHZhciBhdXRvV2lkdGggPSBvcHRpb25zLmF1dG9XaWR0aCxcbiAgICAgIGZpeGVkV2lkdGggPSBnZXRPcHRpb24oJ2ZpeGVkV2lkdGgnKSxcbiAgICAgIGVkZ2VQYWRkaW5nID0gZ2V0T3B0aW9uKCdlZGdlUGFkZGluZycpLFxuICAgICAgZ3V0dGVyID0gZ2V0T3B0aW9uKCdndXR0ZXInKSxcbiAgICAgIHZpZXdwb3J0ID0gZ2V0Vmlld3BvcnRXaWR0aCgpLFxuICAgICAgY2VudGVyID0gZ2V0T3B0aW9uKCdjZW50ZXInKSxcbiAgICAgIGl0ZW1zID0gIWF1dG9XaWR0aCA/IE1hdGguZmxvb3IoZ2V0T3B0aW9uKCdpdGVtcycpKSA6IDEsXG4gICAgICBzbGlkZUJ5ID0gZ2V0T3B0aW9uKCdzbGlkZUJ5JyksXG4gICAgICB2aWV3cG9ydE1heCA9IG9wdGlvbnMudmlld3BvcnRNYXggfHwgb3B0aW9ucy5maXhlZFdpZHRoVmlld3BvcnRXaWR0aCxcbiAgICAgIGFycm93S2V5cyA9IGdldE9wdGlvbignYXJyb3dLZXlzJyksXG4gICAgICBzcGVlZCA9IGdldE9wdGlvbignc3BlZWQnKSxcbiAgICAgIHJld2luZCA9IG9wdGlvbnMucmV3aW5kLFxuICAgICAgbG9vcCA9IHJld2luZCA/IGZhbHNlIDogb3B0aW9ucy5sb29wLFxuICAgICAgYXV0b0hlaWdodCA9IGdldE9wdGlvbignYXV0b0hlaWdodCcpLFxuICAgICAgY29udHJvbHMgPSBnZXRPcHRpb24oJ2NvbnRyb2xzJyksXG4gICAgICBjb250cm9sc1RleHQgPSBnZXRPcHRpb24oJ2NvbnRyb2xzVGV4dCcpLFxuICAgICAgbmF2ID0gZ2V0T3B0aW9uKCduYXYnKSxcbiAgICAgIHRvdWNoID0gZ2V0T3B0aW9uKCd0b3VjaCcpLFxuICAgICAgbW91c2VEcmFnID0gZ2V0T3B0aW9uKCdtb3VzZURyYWcnKSxcbiAgICAgIGF1dG9wbGF5ID0gZ2V0T3B0aW9uKCdhdXRvcGxheScpLFxuICAgICAgYXV0b3BsYXlUaW1lb3V0ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVRpbWVvdXQnKSxcbiAgICAgIGF1dG9wbGF5VGV4dCA9IGdldE9wdGlvbignYXV0b3BsYXlUZXh0JyksXG4gICAgICBhdXRvcGxheUhvdmVyUGF1c2UgPSBnZXRPcHRpb24oJ2F1dG9wbGF5SG92ZXJQYXVzZScpLFxuICAgICAgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA9IGdldE9wdGlvbignYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eScpLFxuICAgICAgc2hlZXQgPSBjcmVhdGVTdHlsZVNoZWV0KG51bGwsIGdldE9wdGlvbignbm9uY2UnKSksXG4gICAgICBsYXp5bG9hZCA9IG9wdGlvbnMubGF6eWxvYWQsXG4gICAgICBsYXp5bG9hZFNlbGVjdG9yID0gb3B0aW9ucy5sYXp5bG9hZFNlbGVjdG9yLFxuICAgICAgc2xpZGVQb3NpdGlvbnMsIC8vIGNvbGxlY3Rpb24gb2Ygc2xpZGUgcG9zaXRpb25zXG4gICAgICBzbGlkZUl0ZW1zT3V0ID0gW10sXG4gICAgICBjbG9uZUNvdW50ID0gbG9vcCA/IGdldENsb25lQ291bnRGb3JMb29wKCkgOiAwLFxuICAgICAgc2xpZGVDb3VudE5ldyA9ICFjYXJvdXNlbCA/IHNsaWRlQ291bnQgKyBjbG9uZUNvdW50IDogc2xpZGVDb3VudCArIGNsb25lQ291bnQgKiAyLFxuICAgICAgaGFzUmlnaHREZWFkWm9uZSA9IChmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkgJiYgIWxvb3AgPyB0cnVlIDogZmFsc2UsXG4gICAgICByaWdodEJvdW5kYXJ5ID0gZml4ZWRXaWR0aCA/IGdldFJpZ2h0Qm91bmRhcnkoKSA6IG51bGwsXG4gICAgICB1cGRhdGVJbmRleEJlZm9yZVRyYW5zZm9ybSA9ICghY2Fyb3VzZWwgfHwgIWxvb3ApID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgLy8gdHJhbnNmb3JtXG4gICAgICB0cmFuc2Zvcm1BdHRyID0gaG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnLFxuICAgICAgdHJhbnNmb3JtUHJlZml4ID0gJycsXG4gICAgICB0cmFuc2Zvcm1Qb3N0Zml4ID0gJycsXG4gICAgICAvLyBpbmRleFxuICAgICAgZ2V0SW5kZXhNYXggPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZml4ZWRXaWR0aCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGNlbnRlciAmJiAhbG9vcCA/IHNsaWRlQ291bnQgLSAxIDogTWF0aC5jZWlsKC0gcmlnaHRCb3VuZGFyeSAvIChmaXhlZFdpZHRoICsgZ3V0dGVyKSk7IH07XG4gICAgICAgIH0gZWxzZSBpZiAoYXV0b1dpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZUNvdW50TmV3OyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlUG9zaXRpb25zW2ldID49IC0gcmlnaHRCb3VuZGFyeSkgeyByZXR1cm4gaTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNlbnRlciAmJiBjYXJvdXNlbCAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICByZXR1cm4gc2xpZGVDb3VudCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbG9vcCB8fCBjYXJvdXNlbCA/IE1hdGgubWF4KDAsIHNsaWRlQ291bnROZXcgLSBNYXRoLmNlaWwoaXRlbXMpKSA6IHNsaWRlQ291bnROZXcgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pKCksXG4gICAgICBpbmRleCA9IGdldFN0YXJ0SW5kZXgoZ2V0T3B0aW9uKCdzdGFydEluZGV4JykpLFxuICAgICAgaW5kZXhDYWNoZWQgPSBpbmRleCxcbiAgICAgIGRpc3BsYXlJbmRleCA9IGdldEN1cnJlbnRTbGlkZSgpLFxuICAgICAgaW5kZXhNaW4gPSAwLFxuICAgICAgaW5kZXhNYXggPSAhYXV0b1dpZHRoID8gZ2V0SW5kZXhNYXgoKSA6IG51bGwsXG4gICAgICAvLyByZXNpemVcbiAgICAgIHJlc2l6ZVRpbWVyLFxuICAgICAgcHJldmVudEFjdGlvbldoZW5SdW5uaW5nID0gb3B0aW9ucy5wcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcsXG4gICAgICBzd2lwZUFuZ2xlID0gb3B0aW9ucy5zd2lwZUFuZ2xlLFxuICAgICAgbW92ZURpcmVjdGlvbkV4cGVjdGVkID0gc3dpcGVBbmdsZSA/ICc/JyA6IHRydWUsXG4gICAgICBydW5uaW5nID0gZmFsc2UsXG4gICAgICBvbkluaXQgPSBvcHRpb25zLm9uSW5pdCxcbiAgICAgIGV2ZW50cyA9IG5ldyBFdmVudHMoKSxcbiAgICAgIC8vIGlkLCBjbGFzc1xuICAgICAgbmV3Q29udGFpbmVyQ2xhc3NlcyA9ICcgdG5zLXNsaWRlciB0bnMtJyArIG9wdGlvbnMubW9kZSxcbiAgICAgIHNsaWRlSWQgPSBjb250YWluZXIuaWQgfHwgZ2V0U2xpZGVJZCgpLFxuICAgICAgZGlzYWJsZSA9IGdldE9wdGlvbignZGlzYWJsZScpLFxuICAgICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICAgIGZyZWV6YWJsZSA9IG9wdGlvbnMuZnJlZXphYmxlLFxuICAgICAgZnJlZXplID0gZnJlZXphYmxlICYmICFhdXRvV2lkdGggPyBnZXRGcmVlemUoKSA6IGZhbHNlLFxuICAgICAgZnJvemVuID0gZmFsc2UsXG4gICAgICBjb250cm9sc0V2ZW50cyA9IHtcbiAgICAgICAgJ2NsaWNrJzogb25Db250cm9sc0NsaWNrLFxuICAgICAgICAna2V5ZG93bic6IG9uQ29udHJvbHNLZXlkb3duXG4gICAgICB9LFxuICAgICAgbmF2RXZlbnRzID0ge1xuICAgICAgICAnY2xpY2snOiBvbk5hdkNsaWNrLFxuICAgICAgICAna2V5ZG93bic6IG9uTmF2S2V5ZG93blxuICAgICAgfSxcbiAgICAgIGhvdmVyRXZlbnRzID0ge1xuICAgICAgICAnbW91c2VvdmVyJzogbW91c2VvdmVyUGF1c2UsXG4gICAgICAgICdtb3VzZW91dCc6IG1vdXNlb3V0UmVzdGFydFxuICAgICAgfSxcbiAgICAgIHZpc2liaWxpdHlFdmVudCA9IHsndmlzaWJpbGl0eWNoYW5nZSc6IG9uVmlzaWJpbGl0eUNoYW5nZX0sXG4gICAgICBkb2NtZW50S2V5ZG93bkV2ZW50ID0geydrZXlkb3duJzogb25Eb2N1bWVudEtleWRvd259LFxuICAgICAgdG91Y2hFdmVudHMgPSB7XG4gICAgICAgICd0b3VjaHN0YXJ0Jzogb25QYW5TdGFydCxcbiAgICAgICAgJ3RvdWNobW92ZSc6IG9uUGFuTW92ZSxcbiAgICAgICAgJ3RvdWNoZW5kJzogb25QYW5FbmQsXG4gICAgICAgICd0b3VjaGNhbmNlbCc6IG9uUGFuRW5kXG4gICAgICB9LCBkcmFnRXZlbnRzID0ge1xuICAgICAgICAnbW91c2Vkb3duJzogb25QYW5TdGFydCxcbiAgICAgICAgJ21vdXNlbW92ZSc6IG9uUGFuTW92ZSxcbiAgICAgICAgJ21vdXNldXAnOiBvblBhbkVuZCxcbiAgICAgICAgJ21vdXNlbGVhdmUnOiBvblBhbkVuZFxuICAgICAgfSxcbiAgICAgIGhhc0NvbnRyb2xzID0gaGFzT3B0aW9uKCdjb250cm9scycpLFxuICAgICAgaGFzTmF2ID0gaGFzT3B0aW9uKCduYXYnKSxcbiAgICAgIG5hdkFzVGh1bWJuYWlscyA9IGF1dG9XaWR0aCA/IHRydWUgOiBvcHRpb25zLm5hdkFzVGh1bWJuYWlscyxcbiAgICAgIGhhc0F1dG9wbGF5ID0gaGFzT3B0aW9uKCdhdXRvcGxheScpLFxuICAgICAgaGFzVG91Y2ggPSBoYXNPcHRpb24oJ3RvdWNoJyksXG4gICAgICBoYXNNb3VzZURyYWcgPSBoYXNPcHRpb24oJ21vdXNlRHJhZycpLFxuICAgICAgc2xpZGVBY3RpdmVDbGFzcyA9ICd0bnMtc2xpZGUtYWN0aXZlJyxcbiAgICAgIHNsaWRlQ2xvbmVkQ2xhc3MgPSAndG5zLXNsaWRlLWNsb25lZCcsXG4gICAgICBpbWdDb21wbGV0ZUNsYXNzID0gJ3Rucy1jb21wbGV0ZScsXG4gICAgICBpbWdFdmVudHMgPSB7XG4gICAgICAgICdsb2FkJzogb25JbWdMb2FkZWQsXG4gICAgICAgICdlcnJvcic6IG9uSW1nRmFpbGVkXG4gICAgICB9LFxuICAgICAgaW1nc0NvbXBsZXRlLFxuICAgICAgbGl2ZXJlZ2lvbkN1cnJlbnQsXG4gICAgICBwcmV2ZW50U2Nyb2xsID0gb3B0aW9ucy5wcmV2ZW50U2Nyb2xsT25Ub3VjaCA9PT0gJ2ZvcmNlJyA/IHRydWUgOiBmYWxzZTtcblxuICAvLyBjb250cm9sc1xuICBpZiAoaGFzQ29udHJvbHMpIHtcbiAgICB2YXIgY29udHJvbHNDb250YWluZXIgPSBvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyLFxuICAgICAgICBjb250cm9sc0NvbnRhaW5lckhUTUwgPSBvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyID8gb3B0aW9ucy5jb250cm9sc0NvbnRhaW5lci5vdXRlckhUTUwgOiAnJyxcbiAgICAgICAgcHJldkJ1dHRvbiA9IG9wdGlvbnMucHJldkJ1dHRvbixcbiAgICAgICAgbmV4dEJ1dHRvbiA9IG9wdGlvbnMubmV4dEJ1dHRvbixcbiAgICAgICAgcHJldkJ1dHRvbkhUTUwgPSBvcHRpb25zLnByZXZCdXR0b24gPyBvcHRpb25zLnByZXZCdXR0b24ub3V0ZXJIVE1MIDogJycsXG4gICAgICAgIG5leHRCdXR0b25IVE1MID0gb3B0aW9ucy5uZXh0QnV0dG9uID8gb3B0aW9ucy5uZXh0QnV0dG9uLm91dGVySFRNTCA6ICcnLFxuICAgICAgICBwcmV2SXNCdXR0b24sXG4gICAgICAgIG5leHRJc0J1dHRvbjtcbiAgfVxuXG4gIC8vIG5hdlxuICBpZiAoaGFzTmF2KSB7XG4gICAgdmFyIG5hdkNvbnRhaW5lciA9IG9wdGlvbnMubmF2Q29udGFpbmVyLFxuICAgICAgICBuYXZDb250YWluZXJIVE1MID0gb3B0aW9ucy5uYXZDb250YWluZXIgPyBvcHRpb25zLm5hdkNvbnRhaW5lci5vdXRlckhUTUwgOiAnJyxcbiAgICAgICAgbmF2SXRlbXMsXG4gICAgICAgIHBhZ2VzID0gYXV0b1dpZHRoID8gc2xpZGVDb3VudCA6IGdldFBhZ2VzKCksXG4gICAgICAgIHBhZ2VzQ2FjaGVkID0gMCxcbiAgICAgICAgbmF2Q2xpY2tlZCA9IC0xLFxuICAgICAgICBuYXZDdXJyZW50SW5kZXggPSBnZXRDdXJyZW50TmF2SW5kZXgoKSxcbiAgICAgICAgbmF2Q3VycmVudEluZGV4Q2FjaGVkID0gbmF2Q3VycmVudEluZGV4LFxuICAgICAgICBuYXZBY3RpdmVDbGFzcyA9ICd0bnMtbmF2LWFjdGl2ZScsXG4gICAgICAgIG5hdlN0ciA9ICdDYXJvdXNlbCBQYWdlICcsXG4gICAgICAgIG5hdlN0ckN1cnJlbnQgPSAnIChDdXJyZW50IFNsaWRlKSc7XG4gIH1cblxuICAvLyBhdXRvcGxheVxuICBpZiAoaGFzQXV0b3BsYXkpIHtcbiAgICB2YXIgYXV0b3BsYXlEaXJlY3Rpb24gPSBvcHRpb25zLmF1dG9wbGF5RGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyAxIDogLTEsXG4gICAgICAgIGF1dG9wbGF5QnV0dG9uID0gb3B0aW9ucy5hdXRvcGxheUJ1dHRvbixcbiAgICAgICAgYXV0b3BsYXlCdXR0b25IVE1MID0gb3B0aW9ucy5hdXRvcGxheUJ1dHRvbiA/IG9wdGlvbnMuYXV0b3BsYXlCdXR0b24ub3V0ZXJIVE1MIDogJycsXG4gICAgICAgIGF1dG9wbGF5SHRtbFN0cmluZ3MgPSBbJzxzcGFuIGNsYXNzPVxcJ3Rucy12aXN1YWxseS1oaWRkZW5cXCc+JywgJyBhbmltYXRpb248L3NwYW4+J10sXG4gICAgICAgIGF1dG9wbGF5VGltZXIsXG4gICAgICAgIGFuaW1hdGluZyxcbiAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlZCxcbiAgICAgICAgYXV0b3BsYXlVc2VyUGF1c2VkLFxuICAgICAgICBhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQ7XG4gIH1cblxuICBpZiAoaGFzVG91Y2ggfHwgaGFzTW91c2VEcmFnKSB7XG4gICAgdmFyIGluaXRQb3NpdGlvbiA9IHt9LFxuICAgICAgICBsYXN0UG9zaXRpb24gPSB7fSxcbiAgICAgICAgdHJhbnNsYXRlSW5pdCxcbiAgICAgICAgZGlzWCxcbiAgICAgICAgZGlzWSxcbiAgICAgICAgcGFuU3RhcnQgPSBmYWxzZSxcbiAgICAgICAgcmFmSW5kZXgsXG4gICAgICAgIGdldERpc3QgPSBob3Jpem9udGFsID9cbiAgICAgICAgICBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLnggLSBiLng7IH0gOlxuICAgICAgICAgIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEueSAtIGIueTsgfTtcbiAgfVxuXG4gIC8vIGRpc2FibGUgc2xpZGVyIHdoZW4gc2xpZGVjb3VudCA8PSBpdGVtc1xuICBpZiAoIWF1dG9XaWR0aCkgeyByZXNldFZhcmlibGVzV2hlbkRpc2FibGUoZGlzYWJsZSB8fCBmcmVlemUpOyB9XG5cbiAgaWYgKFRSQU5TRk9STSkge1xuICAgIHRyYW5zZm9ybUF0dHIgPSBUUkFOU0ZPUk07XG4gICAgdHJhbnNmb3JtUHJlZml4ID0gJ3RyYW5zbGF0ZSc7XG5cbiAgICBpZiAoSEFTM0RUUkFOU0ZPUk1TKSB7XG4gICAgICB0cmFuc2Zvcm1QcmVmaXggKz0gaG9yaXpvbnRhbCA/ICczZCgnIDogJzNkKDBweCwgJztcbiAgICAgIHRyYW5zZm9ybVBvc3RmaXggPSBob3Jpem9udGFsID8gJywgMHB4LCAwcHgpJyA6ICcsIDBweCknO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1QcmVmaXggKz0gaG9yaXpvbnRhbCA/ICdYKCcgOiAnWSgnO1xuICAgICAgdHJhbnNmb3JtUG9zdGZpeCA9ICcpJztcbiAgICB9XG5cbiAgfVxuXG4gIGlmIChjYXJvdXNlbCkgeyBjb250YWluZXIuY2xhc3NOYW1lID0gY29udGFpbmVyLmNsYXNzTmFtZS5yZXBsYWNlKCd0bnMtdnBmaXgnLCAnJyk7IH1cbiAgaW5pdFN0cnVjdHVyZSgpO1xuICBpbml0U2hlZXQoKTtcbiAgaW5pdFNsaWRlclRyYW5zZm9ybSgpO1xuXG4gIC8vID09PSBDT01NT04gRlVOQ1RJT05TID09PSAvL1xuICBmdW5jdGlvbiByZXNldFZhcmlibGVzV2hlbkRpc2FibGUgKGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIGNvbnRyb2xzID0gbmF2ID0gdG91Y2ggPSBtb3VzZURyYWcgPSBhcnJvd0tleXMgPSBhdXRvcGxheSA9IGF1dG9wbGF5SG92ZXJQYXVzZSA9IGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50U2xpZGUgKCkge1xuICAgIHZhciB0ZW0gPSBjYXJvdXNlbCA/IGluZGV4IC0gY2xvbmVDb3VudCA6IGluZGV4O1xuICAgIHdoaWxlICh0ZW0gPCAwKSB7IHRlbSArPSBzbGlkZUNvdW50OyB9XG4gICAgcmV0dXJuIHRlbSVzbGlkZUNvdW50ICsgMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXJ0SW5kZXggKGluZCkge1xuICAgIGluZCA9IGluZCA/IE1hdGgubWF4KDAsIE1hdGgubWluKGxvb3AgPyBzbGlkZUNvdW50IC0gMSA6IHNsaWRlQ291bnQgLSBpdGVtcywgaW5kKSkgOiAwO1xuICAgIHJldHVybiBjYXJvdXNlbCA/IGluZCArIGNsb25lQ291bnQgOiBpbmQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBYnNJbmRleCAoaSkge1xuICAgIGlmIChpID09IG51bGwpIHsgaSA9IGluZGV4OyB9XG5cbiAgICBpZiAoY2Fyb3VzZWwpIHsgaSAtPSBjbG9uZUNvdW50OyB9XG4gICAgd2hpbGUgKGkgPCAwKSB7IGkgKz0gc2xpZGVDb3VudDsgfVxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoaSVzbGlkZUNvdW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnROYXZJbmRleCAoKSB7XG4gICAgdmFyIGFic0luZGV4ID0gZ2V0QWJzSW5kZXgoKSxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgcmVzdWx0ID0gbmF2QXNUaHVtYm5haWxzID8gYWJzSW5kZXggOlxuICAgICAgZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGggPyBNYXRoLmNlaWwoKGFic0luZGV4ICsgMSkgKiBwYWdlcyAvIHNsaWRlQ291bnQgLSAxKSA6XG4gICAgICAgICAgTWF0aC5mbG9vcihhYnNJbmRleCAvIGl0ZW1zKTtcblxuICAgIC8vIHNldCBhY3RpdmUgbmF2IHRvIHRoZSBsYXN0IG9uZSB3aGVuIHJlYWNoZXMgdGhlIHJpZ2h0IGVkZ2VcbiAgICBpZiAoIWxvb3AgJiYgY2Fyb3VzZWwgJiYgaW5kZXggPT09IGluZGV4TWF4KSB7IHJlc3VsdCA9IHBhZ2VzIC0gMTsgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEl0ZW1zTWF4ICgpIHtcbiAgICAvLyBmaXhlZFdpZHRoIG9yIGF1dG9XaWR0aCB3aGlsZSB2aWV3cG9ydE1heCBpcyBub3QgYXZhaWxhYmxlXG4gICAgaWYgKGF1dG9XaWR0aCB8fCAoZml4ZWRXaWR0aCAmJiAhdmlld3BvcnRNYXgpKSB7XG4gICAgICByZXR1cm4gc2xpZGVDb3VudCAtIDE7XG4gICAgLy8gbW9zdCBjYXNlc1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RyID0gZml4ZWRXaWR0aCA/ICdmaXhlZFdpZHRoJyA6ICdpdGVtcycsXG4gICAgICAgICAgYXJyID0gW107XG5cbiAgICAgIGlmIChmaXhlZFdpZHRoIHx8IG9wdGlvbnNbc3RyXSA8IHNsaWRlQ291bnQpIHsgYXJyLnB1c2gob3B0aW9uc1tzdHJdKTsgfVxuXG4gICAgICBpZiAocmVzcG9uc2l2ZSkge1xuICAgICAgICBmb3IgKHZhciBicCBpbiByZXNwb25zaXZlKSB7XG4gICAgICAgICAgdmFyIHRlbSA9IHJlc3BvbnNpdmVbYnBdW3N0cl07XG4gICAgICAgICAgaWYgKHRlbSAmJiAoZml4ZWRXaWR0aCB8fCB0ZW0gPCBzbGlkZUNvdW50KSkgeyBhcnIucHVzaCh0ZW0pOyB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhcnIubGVuZ3RoKSB7IGFyci5wdXNoKDApOyB9XG5cbiAgICAgIHJldHVybiBNYXRoLmNlaWwoZml4ZWRXaWR0aCA/IHZpZXdwb3J0TWF4IC8gTWF0aC5taW4uYXBwbHkobnVsbCwgYXJyKSA6IE1hdGgubWF4LmFwcGx5KG51bGwsIGFycikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENsb25lQ291bnRGb3JMb29wICgpIHtcbiAgICB2YXIgaXRlbXNNYXggPSBnZXRJdGVtc01heCgpLFxuICAgICAgICByZXN1bHQgPSBjYXJvdXNlbCA/IE1hdGguY2VpbCgoaXRlbXNNYXggKiA1IC0gc2xpZGVDb3VudCkvMikgOiAoaXRlbXNNYXggKiA0IC0gc2xpZGVDb3VudCk7XG4gICAgcmVzdWx0ID0gTWF0aC5tYXgoaXRlbXNNYXgsIHJlc3VsdCk7XG5cbiAgICByZXR1cm4gaGFzT3B0aW9uKCdlZGdlUGFkZGluZycpID8gcmVzdWx0ICsgMSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFdpbmRvd1dpZHRoICgpIHtcbiAgICByZXR1cm4gd2luLmlubmVyV2lkdGggfHwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2MuYm9keS5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluc2VydFBvc2l0aW9uIChwb3MpIHtcbiAgICByZXR1cm4gcG9zID09PSAndG9wJyA/ICdhZnRlcmJlZ2luJyA6ICdiZWZvcmVlbmQnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2xpZW50V2lkdGggKGVsKSB7XG4gICAgaWYgKGVsID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgcmVjdCwgd2lkdGg7XG4gICAgZWwuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICByZWN0ID0gZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHdpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdDtcbiAgICBkaXYucmVtb3ZlKCk7XG4gICAgcmV0dXJuIHdpZHRoIHx8IGdldENsaWVudFdpZHRoKGVsLnBhcmVudE5vZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCAoKSB7XG4gICAgdmFyIGdhcCA9IGVkZ2VQYWRkaW5nID8gZWRnZVBhZGRpbmcgKiAyIC0gZ3V0dGVyIDogMDtcbiAgICByZXR1cm4gZ2V0Q2xpZW50V2lkdGgoY29udGFpbmVyUGFyZW50KSAtIGdhcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc09wdGlvbiAoaXRlbSkge1xuICAgIGlmIChvcHRpb25zW2l0ZW1dKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAgICAgZm9yICh2YXIgYnAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgICAgIGlmIChyZXNwb25zaXZlW2JwXVtpdGVtXSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gZ2V0IG9wdGlvbjpcbiAgLy8gZml4ZWQgd2lkdGg6IHZpZXdwb3J0LCBmaXhlZFdpZHRoLCBndXR0ZXIgPT4gaXRlbXNcbiAgLy8gb3RoZXJzOiB3aW5kb3cgd2lkdGggPT4gYWxsIHZhcmlhYmxlc1xuICAvLyBhbGw6IGl0ZW1zID0+IHNsaWRlQnlcbiAgZnVuY3Rpb24gZ2V0T3B0aW9uIChpdGVtLCB3dykge1xuICAgIGlmICh3dyA9PSBudWxsKSB7IHd3ID0gd2luZG93V2lkdGg7IH1cblxuICAgIGlmIChpdGVtID09PSAnaXRlbXMnICYmIGZpeGVkV2lkdGgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKCh2aWV3cG9ydCArIGd1dHRlcikgLyAoZml4ZWRXaWR0aCArIGd1dHRlcikpIHx8IDE7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc3VsdCA9IG9wdGlvbnNbaXRlbV07XG5cbiAgICAgIGlmIChyZXNwb25zaXZlKSB7XG4gICAgICAgIGZvciAodmFyIGJwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgICAgICAvLyBicDogY29udmVydCBzdHJpbmcgdG8gbnVtYmVyXG4gICAgICAgICAgaWYgKHd3ID49IHBhcnNlSW50KGJwKSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW4gcmVzcG9uc2l2ZVticF0pIHsgcmVzdWx0ID0gcmVzcG9uc2l2ZVticF1baXRlbV07IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0gPT09ICdzbGlkZUJ5JyAmJiByZXN1bHQgPT09ICdwYWdlJykgeyByZXN1bHQgPSBnZXRPcHRpb24oJ2l0ZW1zJyk7IH1cbiAgICAgIGlmICghY2Fyb3VzZWwgJiYgKGl0ZW0gPT09ICdzbGlkZUJ5JyB8fCBpdGVtID09PSAnaXRlbXMnKSkgeyByZXN1bHQgPSBNYXRoLmZsb29yKHJlc3VsdCk7IH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZU1hcmdpbkxlZnQgKGkpIHtcbiAgICByZXR1cm4gQ0FMQyA/XG4gICAgICBDQUxDICsgJygnICsgaSAqIDEwMCArICclIC8gJyArIHNsaWRlQ291bnROZXcgKyAnKScgOlxuICAgICAgaSAqIDEwMCAvIHNsaWRlQ291bnROZXcgKyAnJSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lcldyYXBwZXJTdHlsZXMgKGVkZ2VQYWRkaW5nVGVtLCBndXR0ZXJUZW0sIGZpeGVkV2lkdGhUZW0sIHNwZWVkVGVtLCBhdXRvSGVpZ2h0QlApIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICBpZiAoZWRnZVBhZGRpbmdUZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGdhcCA9IGVkZ2VQYWRkaW5nVGVtO1xuICAgICAgaWYgKGd1dHRlclRlbSkgeyBnYXAgLT0gZ3V0dGVyVGVtOyB9XG4gICAgICBzdHIgPSBob3Jpem9udGFsID9cbiAgICAgICAgJ21hcmdpbjogMCAnICsgZ2FwICsgJ3B4IDAgJyArIGVkZ2VQYWRkaW5nVGVtICsgJ3B4OycgOlxuICAgICAgICAnbWFyZ2luOiAnICsgZWRnZVBhZGRpbmdUZW0gKyAncHggMCAnICsgZ2FwICsgJ3B4IDA7JztcbiAgICB9IGVsc2UgaWYgKGd1dHRlclRlbSAmJiAhZml4ZWRXaWR0aFRlbSkge1xuICAgICAgdmFyIGd1dHRlclRlbVVuaXQgPSAnLScgKyBndXR0ZXJUZW0gKyAncHgnLFxuICAgICAgICAgIGRpciA9IGhvcml6b250YWwgPyBndXR0ZXJUZW1Vbml0ICsgJyAwIDAnIDogJzAgJyArIGd1dHRlclRlbVVuaXQgKyAnIDAnO1xuICAgICAgc3RyID0gJ21hcmdpbjogMCAnICsgZGlyICsgJzsnXG4gICAgfVxuXG4gICAgaWYgKCFjYXJvdXNlbCAmJiBhdXRvSGVpZ2h0QlAgJiYgVFJBTlNJVElPTkRVUkFUSU9OICYmIHNwZWVkVGVtKSB7IHN0ciArPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZFRlbSk7IH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGFpbmVyV2lkdGggKGZpeGVkV2lkdGhUZW0sIGd1dHRlclRlbSwgaXRlbXNUZW0pIHtcbiAgICBpZiAoZml4ZWRXaWR0aFRlbSkge1xuICAgICAgcmV0dXJuIChmaXhlZFdpZHRoVGVtICsgZ3V0dGVyVGVtKSAqIHNsaWRlQ291bnROZXcgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ0FMQyA/XG4gICAgICAgIENBTEMgKyAnKCcgKyBzbGlkZUNvdW50TmV3ICogMTAwICsgJyUgLyAnICsgaXRlbXNUZW0gKyAnKScgOlxuICAgICAgICBzbGlkZUNvdW50TmV3ICogMTAwIC8gaXRlbXNUZW0gKyAnJSc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2xpZGVXaWR0aFN0eWxlIChmaXhlZFdpZHRoVGVtLCBndXR0ZXJUZW0sIGl0ZW1zVGVtKSB7XG4gICAgdmFyIHdpZHRoO1xuXG4gICAgaWYgKGZpeGVkV2lkdGhUZW0pIHtcbiAgICAgIHdpZHRoID0gKGZpeGVkV2lkdGhUZW0gKyBndXR0ZXJUZW0pICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjYXJvdXNlbCkgeyBpdGVtc1RlbSA9IE1hdGguZmxvb3IoaXRlbXNUZW0pOyB9XG4gICAgICB2YXIgZGl2aWRlbmQgPSBjYXJvdXNlbCA/IHNsaWRlQ291bnROZXcgOiBpdGVtc1RlbTtcbiAgICAgIHdpZHRoID0gQ0FMQyA/XG4gICAgICAgIENBTEMgKyAnKDEwMCUgLyAnICsgZGl2aWRlbmQgKyAnKScgOlxuICAgICAgICAxMDAgLyBkaXZpZGVuZCArICclJztcbiAgICB9XG5cbiAgICB3aWR0aCA9ICd3aWR0aDonICsgd2lkdGg7XG5cbiAgICAvLyBpbm5lciBzbGlkZXI6IG92ZXJ3cml0ZSBvdXRlciBzbGlkZXIgc3R5bGVzXG4gICAgcmV0dXJuIG5lc3RlZCAhPT0gJ2lubmVyJyA/IHdpZHRoICsgJzsnIDogd2lkdGggKyAnICFpbXBvcnRhbnQ7JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlR3V0dGVyU3R5bGUgKGd1dHRlclRlbSkge1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIC8vIGd1dHRlciBtYXliZSBpbnRlcmdlciB8fCAwXG4gICAgLy8gc28gY2FuJ3QgdXNlICdpZiAoZ3V0dGVyKSdcbiAgICBpZiAoZ3V0dGVyVGVtICE9PSBmYWxzZSkge1xuICAgICAgdmFyIHByb3AgPSBob3Jpem9udGFsID8gJ3BhZGRpbmctJyA6ICdtYXJnaW4tJyxcbiAgICAgICAgICBkaXIgPSBob3Jpem9udGFsID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICAgICAgc3RyID0gcHJvcCArICBkaXIgKyAnOiAnICsgZ3V0dGVyVGVtICsgJ3B4Oyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENTU1ByZWZpeCAobmFtZSwgbnVtKSB7XG4gICAgdmFyIHByZWZpeCA9IG5hbWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoIC0gbnVtKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChwcmVmaXgpIHsgcHJlZml4ID0gJy0nICsgcHJlZml4ICsgJy0nOyB9XG5cbiAgICByZXR1cm4gcHJlZml4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUgKHNwZWVkKSB7XG4gICAgcmV0dXJuIGdldENTU1ByZWZpeChUUkFOU0lUSU9ORFVSQVRJT04sIDE4KSArICd0cmFuc2l0aW9uLWR1cmF0aW9uOicgKyBzcGVlZCAvIDEwMDAgKyAnczsnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uRHVyYXRpb25TdHlsZSAoc3BlZWQpIHtcbiAgICByZXR1cm4gZ2V0Q1NTUHJlZml4KEFOSU1BVElPTkRVUkFUSU9OLCAxNykgKyAnYW5pbWF0aW9uLWR1cmF0aW9uOicgKyBzcGVlZCAvIDEwMDAgKyAnczsnO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFN0cnVjdHVyZSAoKSB7XG4gICAgdmFyIGNsYXNzT3V0ZXIgPSAndG5zLW91dGVyJyxcbiAgICAgICAgY2xhc3NJbm5lciA9ICd0bnMtaW5uZXInLFxuICAgICAgICBoYXNHdXR0ZXIgPSBoYXNPcHRpb24oJ2d1dHRlcicpO1xuXG4gICAgb3V0ZXJXcmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzT3V0ZXI7XG4gICAgaW5uZXJXcmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzSW5uZXI7XG4gICAgb3V0ZXJXcmFwcGVyLmlkID0gc2xpZGVJZCArICctb3cnO1xuICAgIGlubmVyV3JhcHBlci5pZCA9IHNsaWRlSWQgKyAnLWl3JztcblxuICAgIC8vIHNldCBjb250YWluZXIgcHJvcGVydGllc1xuICAgIGlmIChjb250YWluZXIuaWQgPT09ICcnKSB7IGNvbnRhaW5lci5pZCA9IHNsaWRlSWQ7IH1cbiAgICBuZXdDb250YWluZXJDbGFzc2VzICs9IFBFUkNFTlRBR0VMQVlPVVQgfHwgYXV0b1dpZHRoID8gJyB0bnMtc3VicGl4ZWwnIDogJyB0bnMtbm8tc3VicGl4ZWwnO1xuICAgIG5ld0NvbnRhaW5lckNsYXNzZXMgKz0gQ0FMQyA/ICcgdG5zLWNhbGMnIDogJyB0bnMtbm8tY2FsYyc7XG4gICAgaWYgKGF1dG9XaWR0aCkgeyBuZXdDb250YWluZXJDbGFzc2VzICs9ICcgdG5zLWF1dG93aWR0aCc7IH1cbiAgICBuZXdDb250YWluZXJDbGFzc2VzICs9ICcgdG5zLScgKyBvcHRpb25zLmF4aXM7XG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSArPSBuZXdDb250YWluZXJDbGFzc2VzO1xuXG4gICAgLy8gYWRkIGNvbnN0cmFpbiBsYXllciBmb3IgY2Fyb3VzZWxcbiAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgIG1pZGRsZVdyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtaWRkbGVXcmFwcGVyLmlkID0gc2xpZGVJZCArICctbXcnO1xuICAgICAgbWlkZGxlV3JhcHBlci5jbGFzc05hbWUgPSAndG5zLW92aCc7XG5cbiAgICAgIG91dGVyV3JhcHBlci5hcHBlbmRDaGlsZChtaWRkbGVXcmFwcGVyKTtcbiAgICAgIG1pZGRsZVdyYXBwZXIuYXBwZW5kQ2hpbGQoaW5uZXJXcmFwcGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ZXJXcmFwcGVyLmFwcGVuZENoaWxkKGlubmVyV3JhcHBlcik7XG4gICAgfVxuXG4gICAgaWYgKGF1dG9IZWlnaHQpIHtcbiAgICAgIHZhciB3cCA9IG1pZGRsZVdyYXBwZXIgPyBtaWRkbGVXcmFwcGVyIDogaW5uZXJXcmFwcGVyO1xuICAgICAgd3AuY2xhc3NOYW1lICs9ICcgdG5zLWFoJztcbiAgICB9XG5cbiAgICBjb250YWluZXJQYXJlbnQuaW5zZXJ0QmVmb3JlKG91dGVyV3JhcHBlciwgY29udGFpbmVyKTtcbiAgICBpbm5lcldyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIC8vIGFkZCBpZCwgY2xhc3MsIGFyaWEgYXR0cmlidXRlc1xuICAgIC8vIGJlZm9yZSBjbG9uZSBzbGlkZXNcbiAgICBmb3JFYWNoKHNsaWRlSXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIGFkZENsYXNzKGl0ZW0sICd0bnMtaXRlbScpO1xuICAgICAgaWYgKCFpdGVtLmlkKSB7IGl0ZW0uaWQgPSBzbGlkZUlkICsgJy1pdGVtJyArIGk7IH1cbiAgICAgIGlmICghY2Fyb3VzZWwgJiYgYW5pbWF0ZU5vcm1hbCkgeyBhZGRDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTsgfVxuICAgICAgc2V0QXR0cnMoaXRlbSwge1xuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gIyMgY2xvbmUgc2xpZGVzXG4gICAgLy8gY2Fyb3VzZWw6IG4gKyBzbGlkZXMgKyBuXG4gICAgLy8gZ2FsbGVyeTogICAgICBzbGlkZXMgKyBuXG4gICAgaWYgKGNsb25lQ291bnQpIHtcbiAgICAgIHZhciBmcmFnbWVudEJlZm9yZSA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgZnJhZ21lbnRBZnRlciA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgIGZvciAodmFyIGogPSBjbG9uZUNvdW50OyBqLS07KSB7XG4gICAgICAgIHZhciBudW0gPSBqJXNsaWRlQ291bnQsXG4gICAgICAgICAgICBjbG9uZUZpcnN0ID0gc2xpZGVJdGVtc1tudW1dLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgYWRkQ2xhc3MoY2xvbmVGaXJzdCwgc2xpZGVDbG9uZWRDbGFzcyk7XG4gICAgICAgIHJlbW92ZUF0dHJzKGNsb25lRmlyc3QsICdpZCcpO1xuICAgICAgICBmcmFnbWVudEFmdGVyLmluc2VydEJlZm9yZShjbG9uZUZpcnN0LCBmcmFnbWVudEFmdGVyLmZpcnN0Q2hpbGQpO1xuXG4gICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgIHZhciBjbG9uZUxhc3QgPSBzbGlkZUl0ZW1zW3NsaWRlQ291bnQgLSAxIC0gbnVtXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgYWRkQ2xhc3MoY2xvbmVMYXN0LCBzbGlkZUNsb25lZENsYXNzKTtcbiAgICAgICAgICByZW1vdmVBdHRycyhjbG9uZUxhc3QsICdpZCcpO1xuICAgICAgICAgIGZyYWdtZW50QmVmb3JlLmFwcGVuZENoaWxkKGNsb25lTGFzdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShmcmFnbWVudEJlZm9yZSwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50QWZ0ZXIpO1xuICAgICAgc2xpZGVJdGVtcyA9IGNvbnRhaW5lci5jaGlsZHJlbjtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTbGlkZXJUcmFuc2Zvcm0gKCkge1xuICAgIC8vICMjIGltYWdlcyBsb2FkZWQvZmFpbGVkXG4gICAgaWYgKGhhc09wdGlvbignYXV0b0hlaWdodCcpIHx8IGF1dG9XaWR0aCB8fCAhaG9yaXpvbnRhbCkge1xuICAgICAgdmFyIGltZ3MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG5cbiAgICAgIC8vIGFkZCBpbWcgbG9hZCBldmVudCBsaXN0ZW5lclxuICAgICAgZm9yRWFjaChpbWdzLCBmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgdmFyIHNyYyA9IGltZy5zcmM7XG5cbiAgICAgICAgaWYgKCFsYXp5bG9hZCkge1xuICAgICAgICAgIC8vIG5vdCBkYXRhIGltZ1xuICAgICAgICAgIGlmIChzcmMgJiYgc3JjLmluZGV4T2YoJ2RhdGE6aW1hZ2UnKSA8IDApIHtcbiAgICAgICAgICAgIGltZy5zcmMgPSAnJztcbiAgICAgICAgICAgIGFkZEV2ZW50cyhpbWcsIGltZ0V2ZW50cyk7XG4gICAgICAgICAgICBhZGRDbGFzcyhpbWcsICdsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgICAgLy8gZGF0YSBpbWdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1nTG9hZGVkKGltZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0IGltZ3NDb21wbGV0ZVxuICAgICAgcmFmKGZ1bmN0aW9uKCl7IGltZ3NMb2FkZWRDaGVjayhhcnJheUZyb21Ob2RlTGlzdChpbWdzKSwgZnVuY3Rpb24oKSB7IGltZ3NDb21wbGV0ZSA9IHRydWU7IH0pOyB9KTtcblxuICAgICAgLy8gcmVzZXQgaW1ncyBmb3IgYXV0byBoZWlnaHQ6IGNoZWNrIHZpc2libGUgaW1ncyBvbmx5XG4gICAgICBpZiAoaGFzT3B0aW9uKCdhdXRvSGVpZ2h0JykpIHsgaW1ncyA9IGdldEltYWdlQXJyYXkoaW5kZXgsIE1hdGgubWluKGluZGV4ICsgaXRlbXMgLSAxLCBzbGlkZUNvdW50TmV3IC0gMSkpOyB9XG5cbiAgICAgIGxhenlsb2FkID8gaW5pdFNsaWRlclRyYW5zZm9ybVN0eWxlQ2hlY2soKSA6IHJhZihmdW5jdGlvbigpeyBpbWdzTG9hZGVkQ2hlY2soYXJyYXlGcm9tTm9kZUxpc3QoaW1ncyksIGluaXRTbGlkZXJUcmFuc2Zvcm1TdHlsZUNoZWNrKTsgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0IGNvbnRhaW5lciB0cmFuc2Zvcm0gcHJvcGVydHlcbiAgICAgIGlmIChjYXJvdXNlbCkgeyBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCgpOyB9XG5cbiAgICAgIC8vIHVwZGF0ZSBzbGlkZXIgdG9vbHMgYW5kIGV2ZW50c1xuICAgICAgaW5pdFRvb2xzKCk7XG4gICAgICBpbml0RXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNsaWRlclRyYW5zZm9ybVN0eWxlQ2hlY2sgKCkge1xuICAgIGlmIChhdXRvV2lkdGggJiYgc2xpZGVDb3VudCA+IDEpIHtcbiAgICAgIC8vIGNoZWNrIHN0eWxlcyBhcHBsaWNhdGlvblxuICAgICAgdmFyIG51bSA9IGxvb3AgPyBpbmRleCA6IHNsaWRlQ291bnQgLSAxO1xuXG4gICAgICAoZnVuY3Rpb24gc3R5bGVzQXBwbGljYXRpb25DaGVjaygpIHtcbiAgICAgICAgdmFyIGxlZnQgPSBzbGlkZUl0ZW1zW251bV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgdmFyIHJpZ2h0ID0gc2xpZGVJdGVtc1tudW0gLSAxXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodDtcblxuICAgICAgICAoTWF0aC5hYnMobGVmdCAtIHJpZ2h0KSA8PSAxKSA/XG4gICAgICAgICAgaW5pdFNsaWRlclRyYW5zZm9ybUNvcmUoKSA6XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBzdHlsZXNBcHBsaWNhdGlvbkNoZWNrKCkgfSwgMTYpO1xuICAgICAgfSkoKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBpbml0U2xpZGVyVHJhbnNmb3JtQ29yZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gaW5pdFNsaWRlclRyYW5zZm9ybUNvcmUgKCkge1xuICAgIC8vIHJ1biBGbigpcyB3aGljaCBhcmUgcmVseSBvbiBpbWFnZSBsb2FkaW5nXG4gICAgaWYgKCFob3Jpem9udGFsIHx8IGF1dG9XaWR0aCkge1xuICAgICAgc2V0U2xpZGVQb3NpdGlvbnMoKTtcblxuICAgICAgaWYgKGF1dG9XaWR0aCkge1xuICAgICAgICByaWdodEJvdW5kYXJ5ID0gZ2V0UmlnaHRCb3VuZGFyeSgpO1xuICAgICAgICBpZiAoZnJlZXphYmxlKSB7IGZyZWV6ZSA9IGdldEZyZWV6ZSgpOyB9XG4gICAgICAgIGluZGV4TWF4ID0gZ2V0SW5kZXhNYXgoKTsgLy8gPD0gc2xpZGVQb3NpdGlvbnMsIHJpZ2h0Qm91bmRhcnkgPD1cbiAgICAgICAgcmVzZXRWYXJpYmxlc1doZW5EaXNhYmxlKGRpc2FibGUgfHwgZnJlZXplKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZUNvbnRlbnRXcmFwcGVySGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IGNvbnRhaW5lciB0cmFuc2Zvcm0gcHJvcGVydHlcbiAgICBpZiAoY2Fyb3VzZWwpIHsgZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQoKTsgfVxuXG4gICAgLy8gdXBkYXRlIHNsaWRlciB0b29scyBhbmQgZXZlbnRzXG4gICAgaW5pdFRvb2xzKCk7XG4gICAgaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNoZWV0ICgpIHtcbiAgICAvLyBnYWxsZXJ5OlxuICAgIC8vIHNldCBhbmltYXRpb24gY2xhc3NlcyBhbmQgbGVmdCB2YWx1ZSBmb3IgZ2FsbGVyeSBzbGlkZXJcbiAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICBmb3IgKHZhciBpID0gaW5kZXgsIGwgPSBpbmRleCArIE1hdGgubWluKHNsaWRlQ291bnQsIGl0ZW1zKTsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNbaV07XG4gICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9IChpIC0gaW5kZXgpICogMTAwIC8gaXRlbXMgKyAnJSc7XG4gICAgICAgIGFkZENsYXNzKGl0ZW0sIGFuaW1hdGVJbik7XG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vICMjIyMgTEFZT1VUXG5cbiAgICAvLyAjIyBJTkxJTkUtQkxPQ0sgVlMgRkxPQVRcblxuICAgIC8vICMjIFBlcmNlbnRhZ2VMYXlvdXQ6XG4gICAgLy8gc2xpZGVzOiBpbmxpbmUtYmxvY2tcbiAgICAvLyByZW1vdmUgYmxhbmsgc3BhY2UgYmV0d2VlbiBzbGlkZXMgYnkgc2V0IGZvbnQtc2l6ZTogMFxuXG4gICAgLy8gIyMgTm9uIFBlcmNlbnRhZ2VMYXlvdXQ6XG4gICAgLy8gc2xpZGVzOiBmbG9hdFxuICAgIC8vICAgICAgICAgbWFyZ2luLXJpZ2h0OiAtMTAwJVxuICAgIC8vICAgICAgICAgbWFyZ2luLWxlZnQ6IH5cblxuICAgIC8vIFJlc291cmNlOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xNDd1cDI0NXd3VFhlUVl2ZTNCUlNBRDRvVmN2UW11R3NGdGVKT2VBNXhOUS9lZGl0P3VzcD1zaGFyaW5nXG4gICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgIGlmIChQRVJDRU5UQUdFTEFZT1VUIHx8IGF1dG9XaWR0aCkge1xuICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJyA+IC50bnMtaXRlbScsICdmb250LXNpemU6JyArIHdpbi5nZXRDb21wdXRlZFN0eWxlKHNsaWRlSXRlbXNbMF0pLmZvbnRTaXplICsgJzsnLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkLCAnZm9udC1zaXplOjA7JywgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgIH0gZWxzZSBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgZm9yRWFjaChzbGlkZUl0ZW1zLCBmdW5jdGlvbiAoc2xpZGUsIGkpIHtcbiAgICAgICAgICBzbGlkZS5zdHlsZS5tYXJnaW5MZWZ0ID0gZ2V0U2xpZGVNYXJnaW5MZWZ0KGkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vICMjIEJBU0lDIFNUWUxFU1xuICAgIGlmIChDU1NNUSkge1xuICAgICAgLy8gbWlkZGxlIHdyYXBwZXIgc3R5bGVcbiAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHtcbiAgICAgICAgdmFyIHN0ciA9IG1pZGRsZVdyYXBwZXIgJiYgb3B0aW9ucy5hdXRvSGVpZ2h0ID8gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUob3B0aW9ucy5zcGVlZCkgOiAnJztcbiAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICctbXcnLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlubmVyIHdyYXBwZXIgc3R5bGVzXG4gICAgICBzdHIgPSBnZXRJbm5lcldyYXBwZXJTdHlsZXMob3B0aW9ucy5lZGdlUGFkZGluZywgb3B0aW9ucy5ndXR0ZXIsIG9wdGlvbnMuZml4ZWRXaWR0aCwgb3B0aW9ucy5zcGVlZCwgb3B0aW9ucy5hdXRvSGVpZ2h0KTtcbiAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnLWl3Jywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuXG4gICAgICAvLyBjb250YWluZXIgc3R5bGVzXG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgc3RyID0gaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoID8gJ3dpZHRoOicgKyBnZXRDb250YWluZXJXaWR0aChvcHRpb25zLmZpeGVkV2lkdGgsIG9wdGlvbnMuZ3V0dGVyLCBvcHRpb25zLml0ZW1zKSArICc7JyA6ICcnO1xuICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7IHN0ciArPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZCk7IH1cbiAgICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCwgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBzbGlkZSBzdHlsZXNcbiAgICAgIHN0ciA9IGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCA/IGdldFNsaWRlV2lkdGhTdHlsZShvcHRpb25zLmZpeGVkV2lkdGgsIG9wdGlvbnMuZ3V0dGVyLCBvcHRpb25zLml0ZW1zKSA6ICcnO1xuICAgICAgaWYgKG9wdGlvbnMuZ3V0dGVyKSB7IHN0ciArPSBnZXRTbGlkZUd1dHRlclN0eWxlKG9wdGlvbnMuZ3V0dGVyKTsgfVxuICAgICAgLy8gc2V0IGdhbGxlcnkgaXRlbXMgdHJhbnNpdGlvbi1kdXJhdGlvblxuICAgICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7IHN0ciArPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZCk7IH1cbiAgICAgICAgaWYgKEFOSU1BVElPTkRVUkFUSU9OKSB7IHN0ciArPSBnZXRBbmltYXRpb25EdXJhdGlvblN0eWxlKHNwZWVkKTsgfVxuICAgICAgfVxuICAgICAgaWYgKHN0cikgeyBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJyA+IC50bnMtaXRlbScsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTsgfVxuXG4gICAgLy8gbm9uIENTUyBtZWRpYXF1ZXJpZXM6IElFOFxuICAgIC8vICMjIHVwZGF0ZSBpbm5lciB3cmFwcGVyLCBjb250YWluZXIsIHNsaWRlcyBpZiBuZWVkZWRcbiAgICAvLyBzZXQgaW5saW5lIHN0eWxlcyBmb3IgaW5uZXIgd3JhcHBlciAmIGNvbnRhaW5lclxuICAgIC8vIGluc2VydCBzdHlsZXNoZWV0IChvbmUgbGluZSkgZm9yIHNsaWRlcyBvbmx5IChzaW5jZSBzbGlkZXMgYXJlIG1hbnkpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1pZGRsZSB3cmFwcGVyIHN0eWxlc1xuICAgICAgdXBkYXRlX2Nhcm91c2VsX3RyYW5zaXRpb25fZHVyYXRpb24oKTtcblxuICAgICAgLy8gaW5uZXIgd3JhcHBlciBzdHlsZXNcbiAgICAgIGlubmVyV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gZ2V0SW5uZXJXcmFwcGVyU3R5bGVzKGVkZ2VQYWRkaW5nLCBndXR0ZXIsIGZpeGVkV2lkdGgsIGF1dG9IZWlnaHQpO1xuXG4gICAgICAvLyBjb250YWluZXIgc3R5bGVzXG4gICAgICBpZiAoY2Fyb3VzZWwgJiYgaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGdldENvbnRhaW5lcldpZHRoKGZpeGVkV2lkdGgsIGd1dHRlciwgaXRlbXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBzbGlkZSBzdHlsZXNcbiAgICAgIHZhciBzdHIgPSBob3Jpem9udGFsICYmICFhdXRvV2lkdGggPyBnZXRTbGlkZVdpZHRoU3R5bGUoZml4ZWRXaWR0aCwgZ3V0dGVyLCBpdGVtcykgOiAnJztcbiAgICAgIGlmIChndXR0ZXIpIHsgc3RyICs9IGdldFNsaWRlR3V0dGVyU3R5bGUoZ3V0dGVyKTsgfVxuXG4gICAgICAvLyBhcHBlbmQgdG8gdGhlIGxhc3QgbGluZVxuICAgICAgaWYgKHN0cikgeyBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJyA+IC50bnMtaXRlbScsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTsgfVxuICAgIH1cblxuICAgIC8vICMjIE1FRElBUVVFUklFU1xuICAgIGlmIChyZXNwb25zaXZlICYmIENTU01RKSB7XG4gICAgICBmb3IgKHZhciBicCBpbiByZXNwb25zaXZlKSB7XG4gICAgICAgIC8vIGJwOiBjb252ZXJ0IHN0cmluZyB0byBudW1iZXJcbiAgICAgICAgYnAgPSBwYXJzZUludChicCk7XG5cbiAgICAgICAgdmFyIG9wdHMgPSByZXNwb25zaXZlW2JwXSxcbiAgICAgICAgICAgIHN0ciA9ICcnLFxuICAgICAgICAgICAgbWlkZGxlV3JhcHBlclN0ciA9ICcnLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU3RyID0gJycsXG4gICAgICAgICAgICBjb250YWluZXJTdHIgPSAnJyxcbiAgICAgICAgICAgIHNsaWRlU3RyID0gJycsXG4gICAgICAgICAgICBpdGVtc0JQID0gIWF1dG9XaWR0aCA/IGdldE9wdGlvbignaXRlbXMnLCBicCkgOiBudWxsLFxuICAgICAgICAgICAgZml4ZWRXaWR0aEJQID0gZ2V0T3B0aW9uKCdmaXhlZFdpZHRoJywgYnApLFxuICAgICAgICAgICAgc3BlZWRCUCA9IGdldE9wdGlvbignc3BlZWQnLCBicCksXG4gICAgICAgICAgICBlZGdlUGFkZGluZ0JQID0gZ2V0T3B0aW9uKCdlZGdlUGFkZGluZycsIGJwKSxcbiAgICAgICAgICAgIGF1dG9IZWlnaHRCUCA9IGdldE9wdGlvbignYXV0b0hlaWdodCcsIGJwKSxcbiAgICAgICAgICAgIGd1dHRlckJQID0gZ2V0T3B0aW9uKCdndXR0ZXInLCBicCk7XG5cbiAgICAgICAgLy8gbWlkZGxlIHdyYXBwZXIgc3RyaW5nXG4gICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04gJiYgbWlkZGxlV3JhcHBlciAmJiBnZXRPcHRpb24oJ2F1dG9IZWlnaHQnLCBicCkgJiYgJ3NwZWVkJyBpbiBvcHRzKSB7XG4gICAgICAgICAgbWlkZGxlV3JhcHBlclN0ciA9ICcjJyArIHNsaWRlSWQgKyAnLW13eycgKyBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZEJQKSArICd9JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlubmVyIHdyYXBwZXIgc3RyaW5nXG4gICAgICAgIGlmICgnZWRnZVBhZGRpbmcnIGluIG9wdHMgfHwgJ2d1dHRlcicgaW4gb3B0cykge1xuICAgICAgICAgIGlubmVyV3JhcHBlclN0ciA9ICcjJyArIHNsaWRlSWQgKyAnLWl3eycgKyBnZXRJbm5lcldyYXBwZXJTdHlsZXMoZWRnZVBhZGRpbmdCUCwgZ3V0dGVyQlAsIGZpeGVkV2lkdGhCUCwgc3BlZWRCUCwgYXV0b0hlaWdodEJQKSArICd9JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnRhaW5lciBzdHJpbmdcbiAgICAgICAgaWYgKGNhcm91c2VsICYmIGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCAmJiAoJ2ZpeGVkV2lkdGgnIGluIG9wdHMgfHwgJ2l0ZW1zJyBpbiBvcHRzIHx8IChmaXhlZFdpZHRoICYmICdndXR0ZXInIGluIG9wdHMpKSkge1xuICAgICAgICAgIGNvbnRhaW5lclN0ciA9ICd3aWR0aDonICsgZ2V0Q29udGFpbmVyV2lkdGgoZml4ZWRXaWR0aEJQLCBndXR0ZXJCUCwgaXRlbXNCUCkgKyAnOyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTiAmJiAnc3BlZWQnIGluIG9wdHMpIHtcbiAgICAgICAgICBjb250YWluZXJTdHIgKz0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWRCUCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRhaW5lclN0cikge1xuICAgICAgICAgIGNvbnRhaW5lclN0ciA9ICcjJyArIHNsaWRlSWQgKyAneycgKyBjb250YWluZXJTdHIgKyAnfSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzbGlkZSBzdHJpbmdcbiAgICAgICAgaWYgKCdmaXhlZFdpZHRoJyBpbiBvcHRzIHx8IChmaXhlZFdpZHRoICYmICdndXR0ZXInIGluIG9wdHMpIHx8ICFjYXJvdXNlbCAmJiAnaXRlbXMnIGluIG9wdHMpIHtcbiAgICAgICAgICBzbGlkZVN0ciArPSBnZXRTbGlkZVdpZHRoU3R5bGUoZml4ZWRXaWR0aEJQLCBndXR0ZXJCUCwgaXRlbXNCUCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdndXR0ZXInIGluIG9wdHMpIHtcbiAgICAgICAgICBzbGlkZVN0ciArPSBnZXRTbGlkZUd1dHRlclN0eWxlKGd1dHRlckJQKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgZ2FsbGVyeSBpdGVtcyB0cmFuc2l0aW9uLWR1cmF0aW9uXG4gICAgICAgIGlmICghY2Fyb3VzZWwgJiYgJ3NwZWVkJyBpbiBvcHRzKSB7XG4gICAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikgeyBzbGlkZVN0ciArPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZEJQKTsgfVxuICAgICAgICAgIGlmIChBTklNQVRJT05EVVJBVElPTikgeyBzbGlkZVN0ciArPSBnZXRBbmltYXRpb25EdXJhdGlvblN0eWxlKHNwZWVkQlApOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsaWRlU3RyKSB7IHNsaWRlU3RyID0gJyMnICsgc2xpZGVJZCArICcgPiAudG5zLWl0ZW17JyArIHNsaWRlU3RyICsgJ30nOyB9XG5cbiAgICAgICAgLy8gYWRkIHVwXG4gICAgICAgIHN0ciA9IG1pZGRsZVdyYXBwZXJTdHIgKyBpbm5lcldyYXBwZXJTdHIgKyBjb250YWluZXJTdHIgKyBzbGlkZVN0cjtcblxuICAgICAgICBpZiAoc3RyKSB7XG4gICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZSgnQG1lZGlhIChtaW4td2lkdGg6ICcgKyBicCAvIDE2ICsgJ2VtKSB7JyArIHN0ciArICd9Jywgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRUb29scyAoKSB7XG4gICAgLy8gPT0gc2xpZGVzID09XG4gICAgdXBkYXRlU2xpZGVTdGF0dXMoKTtcblxuICAgIC8vID09IGxpdmUgcmVnaW9uID09XG4gICAgb3V0ZXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8ZGl2IGNsYXNzPVwidG5zLWxpdmVyZWdpb24gdG5zLXZpc3VhbGx5LWhpZGRlblwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiPnNsaWRlIDxzcGFuIGNsYXNzPVwiY3VycmVudFwiPicgKyBnZXRMaXZlUmVnaW9uU3RyKCkgKyAnPC9zcGFuPiAgb2YgJyArIHNsaWRlQ291bnQgKyAnPC9kaXY+Jyk7XG4gICAgbGl2ZXJlZ2lvbkN1cnJlbnQgPSBvdXRlcldyYXBwZXIucXVlcnlTZWxlY3RvcignLnRucy1saXZlcmVnaW9uIC5jdXJyZW50Jyk7XG5cbiAgICAvLyA9PSBhdXRvcGxheUluaXQgPT1cbiAgICBpZiAoaGFzQXV0b3BsYXkpIHtcbiAgICAgIHZhciB0eHQgPSBhdXRvcGxheSA/ICdzdG9wJyA6ICdzdGFydCc7XG4gICAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHtcbiAgICAgICAgc2V0QXR0cnMoYXV0b3BsYXlCdXR0b24sIHsnZGF0YS1hY3Rpb24nOiB0eHR9KTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hdXRvcGxheUJ1dHRvbk91dHB1dCkge1xuICAgICAgICBvdXRlcldyYXBwZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKGdldEluc2VydFBvc2l0aW9uKG9wdGlvbnMuYXV0b3BsYXlQb3NpdGlvbiksICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cIicgKyB0eHQgKyAnXCI+JyArIGF1dG9wbGF5SHRtbFN0cmluZ3NbMF0gKyB0eHQgKyBhdXRvcGxheUh0bWxTdHJpbmdzWzFdICsgYXV0b3BsYXlUZXh0WzBdICsgJzwvYnV0dG9uPicpO1xuICAgICAgICBhdXRvcGxheUJ1dHRvbiA9IG91dGVyV3JhcHBlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb25dJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBldmVudFxuICAgICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7XG4gICAgICAgIGFkZEV2ZW50cyhhdXRvcGxheUJ1dHRvbiwgeydjbGljayc6IHRvZ2dsZUF1dG9wbGF5fSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICBzdGFydEF1dG9wbGF5KCk7XG4gICAgICAgIGlmIChhdXRvcGxheUhvdmVyUGF1c2UpIHsgYWRkRXZlbnRzKGNvbnRhaW5lciwgaG92ZXJFdmVudHMpOyB9XG4gICAgICAgIGlmIChhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5KSB7IGFkZEV2ZW50cyhjb250YWluZXIsIHZpc2liaWxpdHlFdmVudCk7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA9PSBuYXZJbml0ID09XG4gICAgaWYgKGhhc05hdikge1xuICAgICAgdmFyIGluaXRJbmRleCA9ICFjYXJvdXNlbCA/IDAgOiBjbG9uZUNvdW50O1xuICAgICAgLy8gY3VzdG9taXplZCBuYXZcbiAgICAgIC8vIHdpbGwgbm90IGhpZGUgdGhlIG5hdnMgaW4gY2FzZSB0aGV5J3JlIHRodW1ibmFpbHNcbiAgICAgIGlmIChuYXZDb250YWluZXIpIHtcbiAgICAgICAgc2V0QXR0cnMobmF2Q29udGFpbmVyLCB7J2FyaWEtbGFiZWwnOiAnQ2Fyb3VzZWwgUGFnaW5hdGlvbid9KTtcbiAgICAgICAgbmF2SXRlbXMgPSBuYXZDb250YWluZXIuY2hpbGRyZW47XG4gICAgICAgIGZvckVhY2gobmF2SXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICBzZXRBdHRycyhpdGVtLCB7XG4gICAgICAgICAgICAnZGF0YS1uYXYnOiBpLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogbmF2U3RyICsgKGkgKyAxKSxcbiAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogc2xpZGVJZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGdlbmVyYXRlZCBuYXZcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuYXZIdG1sID0gJycsXG4gICAgICAgICAgICBoaWRkZW5TdHIgPSBuYXZBc1RodW1ibmFpbHMgPyAnJyA6ICdzdHlsZT1cImRpc3BsYXk6bm9uZVwiJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAvLyBoaWRlIG5hdiBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICAgbmF2SHRtbCArPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1uYXY9XCInICsgaSArJ1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWNvbnRyb2xzPVwiJyArIHNsaWRlSWQgKyAnXCIgJyArIGhpZGRlblN0ciArICcgYXJpYS1sYWJlbD1cIicgKyBuYXZTdHIgKyAoaSArIDEpICsnXCI+PC9idXR0b24+JztcbiAgICAgICAgfVxuICAgICAgICBuYXZIdG1sID0gJzxkaXYgY2xhc3M9XCJ0bnMtbmF2XCIgYXJpYS1sYWJlbD1cIkNhcm91c2VsIFBhZ2luYXRpb25cIj4nICsgbmF2SHRtbCArICc8L2Rpdj4nO1xuICAgICAgICBvdXRlcldyYXBwZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKGdldEluc2VydFBvc2l0aW9uKG9wdGlvbnMubmF2UG9zaXRpb24pLCBuYXZIdG1sKTtcblxuICAgICAgICBuYXZDb250YWluZXIgPSBvdXRlcldyYXBwZXIucXVlcnlTZWxlY3RvcignLnRucy1uYXYnKTtcbiAgICAgICAgbmF2SXRlbXMgPSBuYXZDb250YWluZXIuY2hpbGRyZW47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU5hdlZpc2liaWxpdHkoKTtcblxuICAgICAgLy8gYWRkIHRyYW5zaXRpb25cbiAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFRSQU5TSVRJT05EVVJBVElPTi5zdWJzdHJpbmcoMCwgVFJBTlNJVElPTkRVUkFUSU9OLmxlbmd0aCAtIDE4KS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgc3RyID0gJ3RyYW5zaXRpb246IGFsbCAnICsgc3BlZWQgLyAxMDAwICsgJ3MnO1xuXG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICBzdHIgPSAnLScgKyBwcmVmaXggKyAnLScgKyBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnW2FyaWEtY29udHJvbHNePScgKyBzbGlkZUlkICsgJy1pdGVtXScsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgIH1cblxuICAgICAgc2V0QXR0cnMobmF2SXRlbXNbbmF2Q3VycmVudEluZGV4XSwgeydhcmlhLWxhYmVsJzogbmF2U3RyICsgKG5hdkN1cnJlbnRJbmRleCArIDEpICsgbmF2U3RyQ3VycmVudH0pO1xuICAgICAgcmVtb3ZlQXR0cnMobmF2SXRlbXNbbmF2Q3VycmVudEluZGV4XSwgJ3RhYmluZGV4Jyk7XG4gICAgICBhZGRDbGFzcyhuYXZJdGVtc1tuYXZDdXJyZW50SW5kZXhdLCBuYXZBY3RpdmVDbGFzcyk7XG5cbiAgICAgIC8vIGFkZCBldmVudHNcbiAgICAgIGFkZEV2ZW50cyhuYXZDb250YWluZXIsIG5hdkV2ZW50cyk7XG4gICAgfVxuXG5cblxuICAgIC8vID09IGNvbnRyb2xzSW5pdCA9PVxuICAgIGlmIChoYXNDb250cm9scykge1xuICAgICAgaWYgKCFjb250cm9sc0NvbnRhaW5lciAmJiAoIXByZXZCdXR0b24gfHwgIW5leHRCdXR0b24pKSB7XG4gICAgICAgIG91dGVyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoZ2V0SW5zZXJ0UG9zaXRpb24ob3B0aW9ucy5jb250cm9sc1Bvc2l0aW9uKSwgJzxkaXYgY2xhc3M9XCJ0bnMtY29udHJvbHNcIiBhcmlhLWxhYmVsPVwiQ2Fyb3VzZWwgTmF2aWdhdGlvblwiIHRhYmluZGV4PVwiMFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtY29udHJvbHM9XCJwcmV2XCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtY29udHJvbHM9XCInICsgc2xpZGVJZCArJ1wiPicgKyBjb250cm9sc1RleHRbMF0gKyAnPC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1jb250cm9scz1cIm5leHRcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1jb250cm9scz1cIicgKyBzbGlkZUlkICsnXCI+JyArIGNvbnRyb2xzVGV4dFsxXSArICc8L2J1dHRvbj48L2Rpdj4nKTtcblxuICAgICAgICBjb250cm9sc0NvbnRhaW5lciA9IG91dGVyV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudG5zLWNvbnRyb2xzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcHJldkJ1dHRvbiB8fCAhbmV4dEJ1dHRvbikge1xuICAgICAgICBwcmV2QnV0dG9uID0gY29udHJvbHNDb250YWluZXIuY2hpbGRyZW5bMF07XG4gICAgICAgIG5leHRCdXR0b24gPSBjb250cm9sc0NvbnRhaW5lci5jaGlsZHJlblsxXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgc2V0QXR0cnMoY29udHJvbHNDb250YWluZXIsIHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6ICdDYXJvdXNlbCBOYXZpZ2F0aW9uJyxcbiAgICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyIHx8IChvcHRpb25zLnByZXZCdXR0b24gJiYgb3B0aW9ucy5uZXh0QnV0dG9uKSkge1xuICAgICAgICBzZXRBdHRycyhbcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbl0sIHtcbiAgICAgICAgICAnYXJpYS1jb250cm9scyc6IHNsaWRlSWQsXG4gICAgICAgICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyIHx8IChvcHRpb25zLnByZXZCdXR0b24gJiYgb3B0aW9ucy5uZXh0QnV0dG9uKSkge1xuICAgICAgICBzZXRBdHRycyhwcmV2QnV0dG9uLCB7J2RhdGEtY29udHJvbHMnIDogJ3ByZXYnfSk7XG4gICAgICAgIHNldEF0dHJzKG5leHRCdXR0b24sIHsnZGF0YS1jb250cm9scycgOiAnbmV4dCd9KTtcbiAgICAgIH1cblxuICAgICAgcHJldklzQnV0dG9uID0gaXNCdXR0b24ocHJldkJ1dHRvbik7XG4gICAgICBuZXh0SXNCdXR0b24gPSBpc0J1dHRvbihuZXh0QnV0dG9uKTtcblxuICAgICAgdXBkYXRlQ29udHJvbHNTdGF0dXMoKTtcblxuICAgICAgLy8gYWRkIGV2ZW50c1xuICAgICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgIGFkZEV2ZW50cyhjb250cm9sc0NvbnRhaW5lciwgY29udHJvbHNFdmVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkRXZlbnRzKHByZXZCdXR0b24sIGNvbnRyb2xzRXZlbnRzKTtcbiAgICAgICAgYWRkRXZlbnRzKG5leHRCdXR0b24sIGNvbnRyb2xzRXZlbnRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoaWRlIHRvb2xzIGlmIG5lZWRlZFxuICAgIGRpc2FibGVVSSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEV2ZW50cyAoKSB7XG4gICAgLy8gYWRkIGV2ZW50c1xuICAgIGlmIChjYXJvdXNlbCAmJiBUUkFOU0lUSU9ORU5EKSB7XG4gICAgICB2YXIgZXZlID0ge307XG4gICAgICBldmVbVFJBTlNJVElPTkVORF0gPSBvblRyYW5zaXRpb25FbmQ7XG4gICAgICBhZGRFdmVudHMoY29udGFpbmVyLCBldmUpO1xuICAgIH1cblxuICAgIGlmICh0b3VjaCkgeyBhZGRFdmVudHMoY29udGFpbmVyLCB0b3VjaEV2ZW50cywgb3B0aW9ucy5wcmV2ZW50U2Nyb2xsT25Ub3VjaCk7IH1cbiAgICBpZiAobW91c2VEcmFnKSB7IGFkZEV2ZW50cyhjb250YWluZXIsIGRyYWdFdmVudHMpOyB9XG4gICAgaWYgKGFycm93S2V5cykgeyBhZGRFdmVudHMoZG9jLCBkb2NtZW50S2V5ZG93bkV2ZW50KTsgfVxuXG4gICAgaWYgKG5lc3RlZCA9PT0gJ2lubmVyJykge1xuICAgICAgZXZlbnRzLm9uKCdvdXRlclJlc2l6ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2l6ZVRhc2tzKCk7XG4gICAgICAgIGV2ZW50cy5lbWl0KCdpbm5lckxvYWRlZCcsIGluZm8oKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNpdmUgfHwgZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGggfHwgYXV0b0hlaWdodCB8fCAhaG9yaXpvbnRhbCkge1xuICAgICAgYWRkRXZlbnRzKHdpbiwgeydyZXNpemUnOiBvblJlc2l6ZX0pO1xuICAgIH1cblxuICAgIGlmIChhdXRvSGVpZ2h0KSB7XG4gICAgICBpZiAobmVzdGVkID09PSAnb3V0ZXInKSB7XG4gICAgICAgIGV2ZW50cy5vbignaW5uZXJMb2FkZWQnLCBkb0F1dG9IZWlnaHQpO1xuICAgICAgfSBlbHNlIGlmICghZGlzYWJsZSkgeyBkb0F1dG9IZWlnaHQoKTsgfVxuICAgIH1cblxuICAgIGRvTGF6eUxvYWQoKTtcbiAgICBpZiAoZGlzYWJsZSkgeyBkaXNhYmxlU2xpZGVyKCk7IH0gZWxzZSBpZiAoZnJlZXplKSB7IGZyZWV6ZVNsaWRlcigpOyB9XG5cbiAgICBldmVudHMub24oJ2luZGV4Q2hhbmdlZCcsIGFkZGl0aW9uYWxVcGRhdGVzKTtcbiAgICBpZiAobmVzdGVkID09PSAnaW5uZXInKSB7IGV2ZW50cy5lbWl0KCdpbm5lckxvYWRlZCcsIGluZm8oKSk7IH1cbiAgICBpZiAodHlwZW9mIG9uSW5pdCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkluaXQoaW5mbygpKTsgfVxuICAgIGlzT24gPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgLy8gc2hlZXRcbiAgICBzaGVldC5kaXNhYmxlZCA9IHRydWU7XG4gICAgaWYgKHNoZWV0Lm93bmVyTm9kZSkgeyBzaGVldC5vd25lck5vZGUucmVtb3ZlKCk7IH1cblxuICAgIC8vIHJlbW92ZSB3aW4gZXZlbnQgbGlzdGVuZXJzXG4gICAgcmVtb3ZlRXZlbnRzKHdpbiwgeydyZXNpemUnOiBvblJlc2l6ZX0pO1xuXG4gICAgLy8gYXJyb3dLZXlzLCBjb250cm9scywgbmF2XG4gICAgaWYgKGFycm93S2V5cykgeyByZW1vdmVFdmVudHMoZG9jLCBkb2NtZW50S2V5ZG93bkV2ZW50KTsgfVxuICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikgeyByZW1vdmVFdmVudHMoY29udHJvbHNDb250YWluZXIsIGNvbnRyb2xzRXZlbnRzKTsgfVxuICAgIGlmIChuYXZDb250YWluZXIpIHsgcmVtb3ZlRXZlbnRzKG5hdkNvbnRhaW5lciwgbmF2RXZlbnRzKTsgfVxuXG4gICAgLy8gYXV0b3BsYXlcbiAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCBob3ZlckV2ZW50cyk7XG4gICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgdmlzaWJpbGl0eUV2ZW50KTtcbiAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHsgcmVtb3ZlRXZlbnRzKGF1dG9wbGF5QnV0dG9uLCB7J2NsaWNrJzogdG9nZ2xlQXV0b3BsYXl9KTsgfVxuICAgIGlmIChhdXRvcGxheSkgeyBjbGVhckludGVydmFsKGF1dG9wbGF5VGltZXIpOyB9XG5cbiAgICAvLyBjb250YWluZXJcbiAgICBpZiAoY2Fyb3VzZWwgJiYgVFJBTlNJVElPTkVORCkge1xuICAgICAgdmFyIGV2ZSA9IHt9O1xuICAgICAgZXZlW1RSQU5TSVRJT05FTkRdID0gb25UcmFuc2l0aW9uRW5kO1xuICAgICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgZXZlKTtcbiAgICB9XG4gICAgaWYgKHRvdWNoKSB7IHJlbW92ZUV2ZW50cyhjb250YWluZXIsIHRvdWNoRXZlbnRzKTsgfVxuICAgIGlmIChtb3VzZURyYWcpIHsgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgZHJhZ0V2ZW50cyk7IH1cblxuICAgIC8vIGNhY2hlIE9iamVjdCB2YWx1ZXMgaW4gb3B0aW9ucyAmJiByZXNldCBIVE1MXG4gICAgdmFyIGh0bWxMaXN0ID0gW2NvbnRhaW5lckhUTUwsIGNvbnRyb2xzQ29udGFpbmVySFRNTCwgcHJldkJ1dHRvbkhUTUwsIG5leHRCdXR0b25IVE1MLCBuYXZDb250YWluZXJIVE1MLCBhdXRvcGxheUJ1dHRvbkhUTUxdO1xuXG4gICAgdG5zTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIHZhciBlbCA9IGl0ZW0gPT09ICdjb250YWluZXInID8gb3V0ZXJXcmFwcGVyIDogb3B0aW9uc1tpdGVtXTtcblxuICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gJ29iamVjdCcgJiYgZWwpIHtcbiAgICAgICAgdmFyIHByZXZFbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPyBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIDogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnRFbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIGVsLm91dGVySFRNTCA9IGh0bWxMaXN0W2ldO1xuICAgICAgICBvcHRpb25zW2l0ZW1dID0gcHJldkVsID8gcHJldkVsLm5leHRFbGVtZW50U2libGluZyA6IHBhcmVudEVsLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyByZXNldCB2YXJpYWJsZXNcbiAgICB0bnNMaXN0ID0gYW5pbWF0ZUluID0gYW5pbWF0ZU91dCA9IGFuaW1hdGVEZWxheSA9IGFuaW1hdGVOb3JtYWwgPSBob3Jpem9udGFsID0gb3V0ZXJXcmFwcGVyID0gaW5uZXJXcmFwcGVyID0gY29udGFpbmVyID0gY29udGFpbmVyUGFyZW50ID0gY29udGFpbmVySFRNTCA9IHNsaWRlSXRlbXMgPSBzbGlkZUNvdW50ID0gYnJlYWtwb2ludFpvbmUgPSB3aW5kb3dXaWR0aCA9IGF1dG9XaWR0aCA9IGZpeGVkV2lkdGggPSBlZGdlUGFkZGluZyA9IGd1dHRlciA9IHZpZXdwb3J0ID0gaXRlbXMgPSBzbGlkZUJ5ID0gdmlld3BvcnRNYXggPSBhcnJvd0tleXMgPSBzcGVlZCA9IHJld2luZCA9IGxvb3AgPSBhdXRvSGVpZ2h0ID0gc2hlZXQgPSBsYXp5bG9hZCA9IHNsaWRlUG9zaXRpb25zID0gc2xpZGVJdGVtc091dCA9IGNsb25lQ291bnQgPSBzbGlkZUNvdW50TmV3ID0gaGFzUmlnaHREZWFkWm9uZSA9IHJpZ2h0Qm91bmRhcnkgPSB1cGRhdGVJbmRleEJlZm9yZVRyYW5zZm9ybSA9IHRyYW5zZm9ybUF0dHIgPSB0cmFuc2Zvcm1QcmVmaXggPSB0cmFuc2Zvcm1Qb3N0Zml4ID0gZ2V0SW5kZXhNYXggPSBpbmRleCA9IGluZGV4Q2FjaGVkID0gaW5kZXhNaW4gPSBpbmRleE1heCA9IHJlc2l6ZVRpbWVyID0gc3dpcGVBbmdsZSA9IG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9IHJ1bm5pbmcgPSBvbkluaXQgPSBldmVudHMgPSBuZXdDb250YWluZXJDbGFzc2VzID0gc2xpZGVJZCA9IGRpc2FibGUgPSBkaXNhYmxlZCA9IGZyZWV6YWJsZSA9IGZyZWV6ZSA9IGZyb3plbiA9IGNvbnRyb2xzRXZlbnRzID0gbmF2RXZlbnRzID0gaG92ZXJFdmVudHMgPSB2aXNpYmlsaXR5RXZlbnQgPSBkb2NtZW50S2V5ZG93bkV2ZW50ID0gdG91Y2hFdmVudHMgPSBkcmFnRXZlbnRzID0gaGFzQ29udHJvbHMgPSBoYXNOYXYgPSBuYXZBc1RodW1ibmFpbHMgPSBoYXNBdXRvcGxheSA9IGhhc1RvdWNoID0gaGFzTW91c2VEcmFnID0gc2xpZGVBY3RpdmVDbGFzcyA9IGltZ0NvbXBsZXRlQ2xhc3MgPSBpbWdFdmVudHMgPSBpbWdzQ29tcGxldGUgPSBjb250cm9scyA9IGNvbnRyb2xzVGV4dCA9IGNvbnRyb2xzQ29udGFpbmVyID0gY29udHJvbHNDb250YWluZXJIVE1MID0gcHJldkJ1dHRvbiA9IG5leHRCdXR0b24gPSBwcmV2SXNCdXR0b24gPSBuZXh0SXNCdXR0b24gPSBuYXYgPSBuYXZDb250YWluZXIgPSBuYXZDb250YWluZXJIVE1MID0gbmF2SXRlbXMgPSBwYWdlcyA9IHBhZ2VzQ2FjaGVkID0gbmF2Q2xpY2tlZCA9IG5hdkN1cnJlbnRJbmRleCA9IG5hdkN1cnJlbnRJbmRleENhY2hlZCA9IG5hdkFjdGl2ZUNsYXNzID0gbmF2U3RyID0gbmF2U3RyQ3VycmVudCA9IGF1dG9wbGF5ID0gYXV0b3BsYXlUaW1lb3V0ID0gYXV0b3BsYXlEaXJlY3Rpb24gPSBhdXRvcGxheVRleHQgPSBhdXRvcGxheUhvdmVyUGF1c2UgPSBhdXRvcGxheUJ1dHRvbiA9IGF1dG9wbGF5QnV0dG9uSFRNTCA9IGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgPSBhdXRvcGxheUh0bWxTdHJpbmdzID0gYXV0b3BsYXlUaW1lciA9IGFuaW1hdGluZyA9IGF1dG9wbGF5SG92ZXJQYXVzZWQgPSBhdXRvcGxheVVzZXJQYXVzZWQgPSBhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQgPSBpbml0UG9zaXRpb24gPSBsYXN0UG9zaXRpb24gPSB0cmFuc2xhdGVJbml0ID0gZGlzWCA9IGRpc1kgPSBwYW5TdGFydCA9IHJhZkluZGV4ID0gZ2V0RGlzdCA9IHRvdWNoID0gbW91c2VEcmFnID0gbnVsbDtcbiAgICAvLyBjaGVjayB2YXJpYWJsZXNcbiAgICAvLyBbYW5pbWF0ZUluLCBhbmltYXRlT3V0LCBhbmltYXRlRGVsYXksIGFuaW1hdGVOb3JtYWwsIGhvcml6b250YWwsIG91dGVyV3JhcHBlciwgaW5uZXJXcmFwcGVyLCBjb250YWluZXIsIGNvbnRhaW5lclBhcmVudCwgY29udGFpbmVySFRNTCwgc2xpZGVJdGVtcywgc2xpZGVDb3VudCwgYnJlYWtwb2ludFpvbmUsIHdpbmRvd1dpZHRoLCBhdXRvV2lkdGgsIGZpeGVkV2lkdGgsIGVkZ2VQYWRkaW5nLCBndXR0ZXIsIHZpZXdwb3J0LCBpdGVtcywgc2xpZGVCeSwgdmlld3BvcnRNYXgsIGFycm93S2V5cywgc3BlZWQsIHJld2luZCwgbG9vcCwgYXV0b0hlaWdodCwgc2hlZXQsIGxhenlsb2FkLCBzbGlkZVBvc2l0aW9ucywgc2xpZGVJdGVtc091dCwgY2xvbmVDb3VudCwgc2xpZGVDb3VudE5ldywgaGFzUmlnaHREZWFkWm9uZSwgcmlnaHRCb3VuZGFyeSwgdXBkYXRlSW5kZXhCZWZvcmVUcmFuc2Zvcm0sIHRyYW5zZm9ybUF0dHIsIHRyYW5zZm9ybVByZWZpeCwgdHJhbnNmb3JtUG9zdGZpeCwgZ2V0SW5kZXhNYXgsIGluZGV4LCBpbmRleENhY2hlZCwgaW5kZXhNaW4sIGluZGV4TWF4LCByZXNpemVUaW1lciwgc3dpcGVBbmdsZSwgbW92ZURpcmVjdGlvbkV4cGVjdGVkLCBydW5uaW5nLCBvbkluaXQsIGV2ZW50cywgbmV3Q29udGFpbmVyQ2xhc3Nlcywgc2xpZGVJZCwgZGlzYWJsZSwgZGlzYWJsZWQsIGZyZWV6YWJsZSwgZnJlZXplLCBmcm96ZW4sIGNvbnRyb2xzRXZlbnRzLCBuYXZFdmVudHMsIGhvdmVyRXZlbnRzLCB2aXNpYmlsaXR5RXZlbnQsIGRvY21lbnRLZXlkb3duRXZlbnQsIHRvdWNoRXZlbnRzLCBkcmFnRXZlbnRzLCBoYXNDb250cm9scywgaGFzTmF2LCBuYXZBc1RodW1ibmFpbHMsIGhhc0F1dG9wbGF5LCBoYXNUb3VjaCwgaGFzTW91c2VEcmFnLCBzbGlkZUFjdGl2ZUNsYXNzLCBpbWdDb21wbGV0ZUNsYXNzLCBpbWdFdmVudHMsIGltZ3NDb21wbGV0ZSwgY29udHJvbHMsIGNvbnRyb2xzVGV4dCwgY29udHJvbHNDb250YWluZXIsIGNvbnRyb2xzQ29udGFpbmVySFRNTCwgcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbiwgcHJldklzQnV0dG9uLCBuZXh0SXNCdXR0b24sIG5hdiwgbmF2Q29udGFpbmVyLCBuYXZDb250YWluZXJIVE1MLCBuYXZJdGVtcywgcGFnZXMsIHBhZ2VzQ2FjaGVkLCBuYXZDbGlja2VkLCBuYXZDdXJyZW50SW5kZXgsIG5hdkN1cnJlbnRJbmRleENhY2hlZCwgbmF2QWN0aXZlQ2xhc3MsIG5hdlN0ciwgbmF2U3RyQ3VycmVudCwgYXV0b3BsYXksIGF1dG9wbGF5VGltZW91dCwgYXV0b3BsYXlEaXJlY3Rpb24sIGF1dG9wbGF5VGV4dCwgYXV0b3BsYXlIb3ZlclBhdXNlLCBhdXRvcGxheUJ1dHRvbiwgYXV0b3BsYXlCdXR0b25IVE1MLCBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5LCBhdXRvcGxheUh0bWxTdHJpbmdzLCBhdXRvcGxheVRpbWVyLCBhbmltYXRpbmcsIGF1dG9wbGF5SG92ZXJQYXVzZWQsIGF1dG9wbGF5VXNlclBhdXNlZCwgYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkLCBpbml0UG9zaXRpb24sIGxhc3RQb3NpdGlvbiwgdHJhbnNsYXRlSW5pdCwgZGlzWCwgZGlzWSwgcGFuU3RhcnQsIHJhZkluZGV4LCBnZXREaXN0LCB0b3VjaCwgbW91c2VEcmFnIF0uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IGlmIChpdGVtICE9PSBudWxsKSB7IGNvbnNvbGUubG9nKGl0ZW0pOyB9IH0pO1xuXG4gICAgZm9yICh2YXIgYSBpbiB0aGlzKSB7XG4gICAgICBpZiAoYSAhPT0gJ3JlYnVpbGQnKSB7IHRoaXNbYV0gPSBudWxsOyB9XG4gICAgfVxuICAgIGlzT24gPSBmYWxzZTtcbiAgfVxuXG4vLyA9PT0gT04gUkVTSVpFID09PVxuICAvLyByZXNwb25zaXZlIHx8IGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoIHx8ICFob3Jpem9udGFsXG4gIGZ1bmN0aW9uIG9uUmVzaXplIChlKSB7XG4gICAgcmFmKGZ1bmN0aW9uKCl7IHJlc2l6ZVRhc2tzKGdldEV2ZW50KGUpKTsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNpemVUYXNrcyAoZSkge1xuICAgIGlmICghaXNPbikgeyByZXR1cm47IH1cbiAgICBpZiAobmVzdGVkID09PSAnb3V0ZXInKSB7IGV2ZW50cy5lbWl0KCdvdXRlclJlc2l6ZWQnLCBpbmZvKGUpKTsgfVxuICAgIHdpbmRvd1dpZHRoID0gZ2V0V2luZG93V2lkdGgoKTtcbiAgICB2YXIgYnBDaGFuZ2VkLFxuICAgICAgICBicmVha3BvaW50Wm9uZVRlbSA9IGJyZWFrcG9pbnRab25lLFxuICAgICAgICBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gZmFsc2U7XG5cbiAgICBpZiAocmVzcG9uc2l2ZSkge1xuICAgICAgc2V0QnJlYWtwb2ludFpvbmUoKTtcbiAgICAgIGJwQ2hhbmdlZCA9IGJyZWFrcG9pbnRab25lVGVtICE9PSBicmVha3BvaW50Wm9uZTtcbiAgICAgIC8vIGlmIChoYXNSaWdodERlYWRab25lKSB7IG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlOyB9IC8vICo/XG4gICAgICBpZiAoYnBDaGFuZ2VkKSB7IGV2ZW50cy5lbWl0KCduZXdCcmVha3BvaW50U3RhcnQnLCBpbmZvKGUpKTsgfVxuICAgIH1cblxuICAgIHZhciBpbmRDaGFuZ2VkLFxuICAgICAgICBpdGVtc0NoYW5nZWQsXG4gICAgICAgIGl0ZW1zVGVtID0gaXRlbXMsXG4gICAgICAgIGRpc2FibGVUZW0gPSBkaXNhYmxlLFxuICAgICAgICBmcmVlemVUZW0gPSBmcmVlemUsXG4gICAgICAgIGFycm93S2V5c1RlbSA9IGFycm93S2V5cyxcbiAgICAgICAgY29udHJvbHNUZW0gPSBjb250cm9scyxcbiAgICAgICAgbmF2VGVtID0gbmF2LFxuICAgICAgICB0b3VjaFRlbSA9IHRvdWNoLFxuICAgICAgICBtb3VzZURyYWdUZW0gPSBtb3VzZURyYWcsXG4gICAgICAgIGF1dG9wbGF5VGVtID0gYXV0b3BsYXksXG4gICAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZVRlbSA9IGF1dG9wbGF5SG92ZXJQYXVzZSxcbiAgICAgICAgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eVRlbSA9IGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHksXG4gICAgICAgIGluZGV4VGVtID0gaW5kZXg7XG5cbiAgICBpZiAoYnBDaGFuZ2VkKSB7XG4gICAgICB2YXIgZml4ZWRXaWR0aFRlbSA9IGZpeGVkV2lkdGgsXG4gICAgICAgICAgYXV0b0hlaWdodFRlbSA9IGF1dG9IZWlnaHQsXG4gICAgICAgICAgY29udHJvbHNUZXh0VGVtID0gY29udHJvbHNUZXh0LFxuICAgICAgICAgIGNlbnRlclRlbSA9IGNlbnRlcixcbiAgICAgICAgICBhdXRvcGxheVRleHRUZW0gPSBhdXRvcGxheVRleHQ7XG5cbiAgICAgIGlmICghQ1NTTVEpIHtcbiAgICAgICAgdmFyIGd1dHRlclRlbSA9IGd1dHRlcixcbiAgICAgICAgICAgIGVkZ2VQYWRkaW5nVGVtID0gZWRnZVBhZGRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IG9wdGlvbjpcbiAgICAvLyBmaXhlZCB3aWR0aDogdmlld3BvcnQsIGZpeGVkV2lkdGgsIGd1dHRlciA9PiBpdGVtc1xuICAgIC8vIG90aGVyczogd2luZG93IHdpZHRoID0+IGFsbCB2YXJpYWJsZXNcbiAgICAvLyBhbGw6IGl0ZW1zID0+IHNsaWRlQnlcbiAgICBhcnJvd0tleXMgPSBnZXRPcHRpb24oJ2Fycm93S2V5cycpO1xuICAgIGNvbnRyb2xzID0gZ2V0T3B0aW9uKCdjb250cm9scycpO1xuICAgIG5hdiA9IGdldE9wdGlvbignbmF2Jyk7XG4gICAgdG91Y2ggPSBnZXRPcHRpb24oJ3RvdWNoJyk7XG4gICAgY2VudGVyID0gZ2V0T3B0aW9uKCdjZW50ZXInKTtcbiAgICBtb3VzZURyYWcgPSBnZXRPcHRpb24oJ21vdXNlRHJhZycpO1xuICAgIGF1dG9wbGF5ID0gZ2V0T3B0aW9uKCdhdXRvcGxheScpO1xuICAgIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGdldE9wdGlvbignYXV0b3BsYXlIb3ZlclBhdXNlJyk7XG4gICAgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA9IGdldE9wdGlvbignYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eScpO1xuXG4gICAgaWYgKGJwQ2hhbmdlZCkge1xuICAgICAgZGlzYWJsZSA9IGdldE9wdGlvbignZGlzYWJsZScpO1xuICAgICAgZml4ZWRXaWR0aCA9IGdldE9wdGlvbignZml4ZWRXaWR0aCcpO1xuICAgICAgc3BlZWQgPSBnZXRPcHRpb24oJ3NwZWVkJyk7XG4gICAgICBhdXRvSGVpZ2h0ID0gZ2V0T3B0aW9uKCdhdXRvSGVpZ2h0Jyk7XG4gICAgICBjb250cm9sc1RleHQgPSBnZXRPcHRpb24oJ2NvbnRyb2xzVGV4dCcpO1xuICAgICAgYXV0b3BsYXlUZXh0ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVRleHQnKTtcbiAgICAgIGF1dG9wbGF5VGltZW91dCA9IGdldE9wdGlvbignYXV0b3BsYXlUaW1lb3V0Jyk7XG5cbiAgICAgIGlmICghQ1NTTVEpIHtcbiAgICAgICAgZWRnZVBhZGRpbmcgPSBnZXRPcHRpb24oJ2VkZ2VQYWRkaW5nJyk7XG4gICAgICAgIGd1dHRlciA9IGdldE9wdGlvbignZ3V0dGVyJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSBvcHRpb25zXG4gICAgcmVzZXRWYXJpYmxlc1doZW5EaXNhYmxlKGRpc2FibGUpO1xuXG4gICAgdmlld3BvcnQgPSBnZXRWaWV3cG9ydFdpZHRoKCk7IC8vIDw9IGVkZ2VQYWRkaW5nLCBndXR0ZXJcbiAgICBpZiAoKCFob3Jpem9udGFsIHx8IGF1dG9XaWR0aCkgJiYgIWRpc2FibGUpIHtcbiAgICAgIHNldFNsaWRlUG9zaXRpb25zKCk7XG4gICAgICBpZiAoIWhvcml6b250YWwpIHtcbiAgICAgICAgdXBkYXRlQ29udGVudFdyYXBwZXJIZWlnaHQoKTsgLy8gPD0gc2V0U2xpZGVQb3NpdGlvbnNcbiAgICAgICAgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkge1xuICAgICAgcmlnaHRCb3VuZGFyeSA9IGdldFJpZ2h0Qm91bmRhcnkoKTsgLy8gYXV0b1dpZHRoOiA8PSB2aWV3cG9ydCwgc2xpZGVQb3NpdGlvbnMsIGd1dHRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZml4ZWRXaWR0aDogPD0gdmlld3BvcnQsIGZpeGVkV2lkdGgsIGd1dHRlclxuICAgICAgaW5kZXhNYXggPSBnZXRJbmRleE1heCgpOyAvLyBhdXRvV2lkdGg6IDw9IHJpZ2h0Qm91bmRhcnksIHNsaWRlUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpeGVkV2lkdGg6IDw9IHJpZ2h0Qm91bmRhcnksIGZpeGVkV2lkdGgsIGd1dHRlclxuICAgIH1cblxuICAgIGlmIChicENoYW5nZWQgfHwgZml4ZWRXaWR0aCkge1xuICAgICAgaXRlbXMgPSBnZXRPcHRpb24oJ2l0ZW1zJyk7XG4gICAgICBzbGlkZUJ5ID0gZ2V0T3B0aW9uKCdzbGlkZUJ5Jyk7XG4gICAgICBpdGVtc0NoYW5nZWQgPSBpdGVtcyAhPT0gaXRlbXNUZW07XG5cbiAgICAgIGlmIChpdGVtc0NoYW5nZWQpIHtcbiAgICAgICAgaWYgKCFmaXhlZFdpZHRoICYmICFhdXRvV2lkdGgpIHsgaW5kZXhNYXggPSBnZXRJbmRleE1heCgpOyB9IC8vIDw9IGl0ZW1zXG4gICAgICAgIC8vIGNoZWNrIGluZGV4IGJlZm9yZSB0cmFuc2Zvcm0gaW4gY2FzZVxuICAgICAgICAvLyBzbGlkZXIgcmVhY2ggdGhlIHJpZ2h0IGVkZ2UgdGhlbiBpdGVtcyBiZWNvbWUgYmlnZ2VyXG4gICAgICAgIHVwZGF0ZUluZGV4KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJwQ2hhbmdlZCkge1xuICAgICAgaWYgKGRpc2FibGUgIT09IGRpc2FibGVUZW0pIHtcbiAgICAgICAgaWYgKGRpc2FibGUpIHtcbiAgICAgICAgICBkaXNhYmxlU2xpZGVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5hYmxlU2xpZGVyKCk7IC8vIDw9IHNsaWRlUG9zaXRpb25zLCByaWdodEJvdW5kYXJ5LCBpbmRleE1heFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZyZWV6YWJsZSAmJiAoYnBDaGFuZ2VkIHx8IGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSkge1xuICAgICAgZnJlZXplID0gZ2V0RnJlZXplKCk7IC8vIDw9IGF1dG9XaWR0aDogc2xpZGVQb3NpdGlvbnMsIGd1dHRlciwgdmlld3BvcnQsIHJpZ2h0Qm91bmRhcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8PSBmaXhlZFdpZHRoOiBmaXhlZFdpZHRoLCBndXR0ZXIsIHJpZ2h0Qm91bmRhcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8PSBvdGhlcnM6IGl0ZW1zXG5cbiAgICAgIGlmIChmcmVlemUgIT09IGZyZWV6ZVRlbSkge1xuICAgICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgICAgZG9Db250YWluZXJUcmFuc2Zvcm0oZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUoZ2V0U3RhcnRJbmRleCgwKSkpO1xuICAgICAgICAgIGZyZWV6ZVNsaWRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVuZnJlZXplU2xpZGVyKCk7XG4gICAgICAgICAgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFZhcmlibGVzV2hlbkRpc2FibGUoZGlzYWJsZSB8fCBmcmVlemUpOyAvLyBjb250cm9scywgbmF2LCB0b3VjaCwgbW91c2VEcmFnLCBhcnJvd0tleXMsIGF1dG9wbGF5LCBhdXRvcGxheUhvdmVyUGF1c2UsIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHlcbiAgICBpZiAoIWF1dG9wbGF5KSB7IGF1dG9wbGF5SG92ZXJQYXVzZSA9IGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkgPSBmYWxzZTsgfVxuXG4gICAgaWYgKGFycm93S2V5cyAhPT0gYXJyb3dLZXlzVGVtKSB7XG4gICAgICBhcnJvd0tleXMgP1xuICAgICAgICBhZGRFdmVudHMoZG9jLCBkb2NtZW50S2V5ZG93bkV2ZW50KSA6XG4gICAgICAgIHJlbW92ZUV2ZW50cyhkb2MsIGRvY21lbnRLZXlkb3duRXZlbnQpO1xuICAgIH1cbiAgICBpZiAoY29udHJvbHMgIT09IGNvbnRyb2xzVGVtKSB7XG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgICAgc2hvd0VsZW1lbnQoY29udHJvbHNDb250YWluZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2QnV0dG9uKSB7IHNob3dFbGVtZW50KHByZXZCdXR0b24pOyB9XG4gICAgICAgICAgaWYgKG5leHRCdXR0b24pIHsgc2hvd0VsZW1lbnQobmV4dEJ1dHRvbik7IH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgICAgaGlkZUVsZW1lbnQoY29udHJvbHNDb250YWluZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2QnV0dG9uKSB7IGhpZGVFbGVtZW50KHByZXZCdXR0b24pOyB9XG4gICAgICAgICAgaWYgKG5leHRCdXR0b24pIHsgaGlkZUVsZW1lbnQobmV4dEJ1dHRvbik7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmF2ICE9PSBuYXZUZW0pIHtcbiAgICAgIGlmIChuYXYpIHtcbiAgICAgICAgc2hvd0VsZW1lbnQobmF2Q29udGFpbmVyKTtcbiAgICAgICAgdXBkYXRlTmF2VmlzaWJpbGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZUVsZW1lbnQobmF2Q29udGFpbmVyKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodG91Y2ggIT09IHRvdWNoVGVtKSB7XG4gICAgICB0b3VjaCA/XG4gICAgICAgIGFkZEV2ZW50cyhjb250YWluZXIsIHRvdWNoRXZlbnRzLCBvcHRpb25zLnByZXZlbnRTY3JvbGxPblRvdWNoKSA6XG4gICAgICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIHRvdWNoRXZlbnRzKTtcbiAgICB9XG4gICAgaWYgKG1vdXNlRHJhZyAhPT0gbW91c2VEcmFnVGVtKSB7XG4gICAgICBtb3VzZURyYWcgP1xuICAgICAgICBhZGRFdmVudHMoY29udGFpbmVyLCBkcmFnRXZlbnRzKSA6XG4gICAgICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIGRyYWdFdmVudHMpO1xuICAgIH1cbiAgICBpZiAoYXV0b3BsYXkgIT09IGF1dG9wbGF5VGVtKSB7XG4gICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7IHNob3dFbGVtZW50KGF1dG9wbGF5QnV0dG9uKTsgfVxuICAgICAgICBpZiAoIWFuaW1hdGluZyAmJiAhYXV0b3BsYXlVc2VyUGF1c2VkKSB7IHN0YXJ0QXV0b3BsYXkoKTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7IGhpZGVFbGVtZW50KGF1dG9wbGF5QnV0dG9uKTsgfVxuICAgICAgICBpZiAoYW5pbWF0aW5nKSB7IHN0b3BBdXRvcGxheSgpOyB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhdXRvcGxheUhvdmVyUGF1c2UgIT09IGF1dG9wbGF5SG92ZXJQYXVzZVRlbSkge1xuICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlID9cbiAgICAgICAgYWRkRXZlbnRzKGNvbnRhaW5lciwgaG92ZXJFdmVudHMpIDpcbiAgICAgICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgaG92ZXJFdmVudHMpO1xuICAgIH1cbiAgICBpZiAoYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSAhPT0gYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eVRlbSkge1xuICAgICAgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA/XG4gICAgICAgIGFkZEV2ZW50cyhkb2MsIHZpc2liaWxpdHlFdmVudCkgOlxuICAgICAgICByZW1vdmVFdmVudHMoZG9jLCB2aXNpYmlsaXR5RXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChicENoYW5nZWQpIHtcbiAgICAgIGlmIChmaXhlZFdpZHRoICE9PSBmaXhlZFdpZHRoVGVtIHx8IGNlbnRlciAhPT0gY2VudGVyVGVtKSB7IG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlOyB9XG5cbiAgICAgIGlmIChhdXRvSGVpZ2h0ICE9PSBhdXRvSGVpZ2h0VGVtKSB7XG4gICAgICAgIGlmICghYXV0b0hlaWdodCkgeyBpbm5lcldyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gJyc7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRyb2xzICYmIGNvbnRyb2xzVGV4dCAhPT0gY29udHJvbHNUZXh0VGVtKSB7XG4gICAgICAgIHByZXZCdXR0b24uaW5uZXJIVE1MID0gY29udHJvbHNUZXh0WzBdO1xuICAgICAgICBuZXh0QnV0dG9uLmlubmVySFRNTCA9IGNvbnRyb2xzVGV4dFsxXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF1dG9wbGF5QnV0dG9uICYmIGF1dG9wbGF5VGV4dCAhPT0gYXV0b3BsYXlUZXh0VGVtKSB7XG4gICAgICAgIHZhciBpID0gYXV0b3BsYXkgPyAxIDogMCxcbiAgICAgICAgICAgIGh0bWwgPSBhdXRvcGxheUJ1dHRvbi5pbm5lckhUTUwsXG4gICAgICAgICAgICBsZW4gPSBodG1sLmxlbmd0aCAtIGF1dG9wbGF5VGV4dFRlbVtpXS5sZW5ndGg7XG4gICAgICAgIGlmIChodG1sLnN1YnN0cmluZyhsZW4pID09PSBhdXRvcGxheVRleHRUZW1baV0pIHtcbiAgICAgICAgICBhdXRvcGxheUJ1dHRvbi5pbm5lckhUTUwgPSBodG1sLnN1YnN0cmluZygwLCBsZW4pICsgYXV0b3BsYXlUZXh0W2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjZW50ZXIgJiYgKGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSkgeyBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTsgfVxuICAgIH1cblxuICAgIGlmIChpdGVtc0NoYW5nZWQgfHwgZml4ZWRXaWR0aCAmJiAhYXV0b1dpZHRoKSB7XG4gICAgICBwYWdlcyA9IGdldFBhZ2VzKCk7XG4gICAgICB1cGRhdGVOYXZWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgaW5kQ2hhbmdlZCA9IGluZGV4ICE9PSBpbmRleFRlbTtcbiAgICBpZiAoaW5kQ2hhbmdlZCkge1xuICAgICAgZXZlbnRzLmVtaXQoJ2luZGV4Q2hhbmdlZCcsIGluZm8oKSk7XG4gICAgICBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGl0ZW1zQ2hhbmdlZCkge1xuICAgICAgaWYgKCFpbmRDaGFuZ2VkKSB7IGFkZGl0aW9uYWxVcGRhdGVzKCk7IH1cbiAgICB9IGVsc2UgaWYgKGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSB7XG4gICAgICBkb0xhenlMb2FkKCk7XG4gICAgICB1cGRhdGVTbGlkZVN0YXR1cygpO1xuICAgICAgdXBkYXRlTGl2ZVJlZ2lvbigpO1xuICAgIH1cblxuICAgIGlmIChpdGVtc0NoYW5nZWQgJiYgIWNhcm91c2VsKSB7IHVwZGF0ZUdhbGxlcnlTbGlkZVBvc2l0aW9ucygpOyB9XG5cbiAgICBpZiAoIWRpc2FibGUgJiYgIWZyZWV6ZSkge1xuICAgICAgLy8gbm9uLW1lZGlhcXVlcmllczogSUU4XG4gICAgICBpZiAoYnBDaGFuZ2VkICYmICFDU1NNUSkge1xuICAgICAgICAvLyBtaWRkbGUgd3JhcHBlciBzdHlsZXNcblxuICAgICAgICAvLyBpbm5lciB3cmFwcGVyIHN0eWxlc1xuICAgICAgICBpZiAoZWRnZVBhZGRpbmcgIT09IGVkZ2VQYWRkaW5nVGVtIHx8IGd1dHRlciAhPT0gZ3V0dGVyVGVtKSB7XG4gICAgICAgICAgaW5uZXJXcmFwcGVyLnN0eWxlLmNzc1RleHQgPSBnZXRJbm5lcldyYXBwZXJTdHlsZXMoZWRnZVBhZGRpbmcsIGd1dHRlciwgZml4ZWRXaWR0aCwgc3BlZWQsIGF1dG9IZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAvLyBjb250YWluZXIgc3R5bGVzXG4gICAgICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBnZXRDb250YWluZXJXaWR0aChmaXhlZFdpZHRoLCBndXR0ZXIsIGl0ZW1zKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzbGlkZSBzdHlsZXNcbiAgICAgICAgICB2YXIgc3RyID0gZ2V0U2xpZGVXaWR0aFN0eWxlKGZpeGVkV2lkdGgsIGd1dHRlciwgaXRlbXMpICtcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2xpZGVHdXR0ZXJTdHlsZShndXR0ZXIpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXN0IGxpbmUgYW5kXG4gICAgICAgICAgLy8gYWRkIG5ldyBzdHlsZXNcbiAgICAgICAgICByZW1vdmVDU1NSdWxlKHNoZWV0LCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkgLSAxKTtcbiAgICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJyA+IC50bnMtaXRlbScsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhdXRvIGhlaWdodFxuICAgICAgaWYgKGF1dG9IZWlnaHQpIHsgZG9BdXRvSGVpZ2h0KCk7IH1cblxuICAgICAgaWYgKG5lZWRDb250YWluZXJUcmFuc2Zvcm0pIHtcbiAgICAgICAgZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQoKTtcbiAgICAgICAgaW5kZXhDYWNoZWQgPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYnBDaGFuZ2VkKSB7IGV2ZW50cy5lbWl0KCduZXdCcmVha3BvaW50RW5kJywgaW5mbyhlKSk7IH1cbiAgfVxuXG5cblxuXG5cbiAgLy8gPT09IElOSVRJQUxJWkFUSU9OIEZVTkNUSU9OUyA9PT0gLy9cbiAgZnVuY3Rpb24gZ2V0RnJlZXplICgpIHtcbiAgICBpZiAoIWZpeGVkV2lkdGggJiYgIWF1dG9XaWR0aCkge1xuICAgICAgdmFyIGEgPSBjZW50ZXIgPyBpdGVtcyAtIChpdGVtcyAtIDEpIC8gMiA6IGl0ZW1zO1xuICAgICAgcmV0dXJuICBzbGlkZUNvdW50IDw9IGE7XG4gICAgfVxuXG4gICAgdmFyIHdpZHRoID0gZml4ZWRXaWR0aCA/IChmaXhlZFdpZHRoICsgZ3V0dGVyKSAqIHNsaWRlQ291bnQgOiBzbGlkZVBvc2l0aW9uc1tzbGlkZUNvdW50XSxcbiAgICAgICAgdnAgPSBlZGdlUGFkZGluZyA/IHZpZXdwb3J0ICsgZWRnZVBhZGRpbmcgKiAyIDogdmlld3BvcnQgKyBndXR0ZXI7XG5cbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2cCAtPSBmaXhlZFdpZHRoID8gKHZpZXdwb3J0IC0gZml4ZWRXaWR0aCkgLyAyIDogKHZpZXdwb3J0IC0gKHNsaWRlUG9zaXRpb25zW2luZGV4ICsgMV0gLSBzbGlkZVBvc2l0aW9uc1tpbmRleF0gLSBndXR0ZXIpKSAvIDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpZHRoIDw9IHZwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QnJlYWtwb2ludFpvbmUgKCkge1xuICAgIGJyZWFrcG9pbnRab25lID0gMDtcbiAgICBmb3IgKHZhciBicCBpbiByZXNwb25zaXZlKSB7XG4gICAgICBicCA9IHBhcnNlSW50KGJwKTsgLy8gY29udmVydCBzdHJpbmcgdG8gbnVtYmVyXG4gICAgICBpZiAod2luZG93V2lkdGggPj0gYnApIHsgYnJlYWtwb2ludFpvbmUgPSBicDsgfVxuICAgIH1cbiAgfVxuXG4gIC8vIChzbGlkZUJ5LCBpbmRleE1pbiwgaW5kZXhNYXgpID0+IGluZGV4XG4gIHZhciB1cGRhdGVJbmRleCA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGxvb3AgP1xuICAgICAgY2Fyb3VzZWwgP1xuICAgICAgICAvLyBsb29wICsgY2Fyb3VzZWxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBsZWZ0RWRnZSA9IGluZGV4TWluLFxuICAgICAgICAgICAgICByaWdodEVkZ2UgPSBpbmRleE1heDtcblxuICAgICAgICAgIGxlZnRFZGdlICs9IHNsaWRlQnk7XG4gICAgICAgICAgcmlnaHRFZGdlIC09IHNsaWRlQnk7XG5cbiAgICAgICAgICAvLyBhZGp1c3QgZWRnZXMgd2hlbiBoYXMgZWRnZSBwYWRkaW5nc1xuICAgICAgICAgIC8vIG9yIGZpeGVkLXdpZHRoIHNsaWRlciB3aXRoIGV4dHJhIHNwYWNlIG9uIHRoZSByaWdodCBzaWRlXG4gICAgICAgICAgaWYgKGVkZ2VQYWRkaW5nKSB7XG4gICAgICAgICAgICBsZWZ0RWRnZSArPSAxO1xuICAgICAgICAgICAgcmlnaHRFZGdlIC09IDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXhlZFdpZHRoKSB7XG4gICAgICAgICAgICBpZiAoKHZpZXdwb3J0ICsgZ3V0dGVyKSUoZml4ZWRXaWR0aCArIGd1dHRlcikpIHsgcmlnaHRFZGdlIC09IDE7IH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2xvbmVDb3VudCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gcmlnaHRFZGdlKSB7XG4gICAgICAgICAgICAgIGluZGV4IC09IHNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgbGVmdEVkZ2UpIHtcbiAgICAgICAgICAgICAgaW5kZXggKz0gc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gOlxuICAgICAgICAvLyBsb29wICsgZ2FsbGVyeVxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPiBpbmRleE1heCkge1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4ID49IGluZGV4TWluICsgc2xpZGVDb3VudCkgeyBpbmRleCAtPSBzbGlkZUNvdW50OyB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGluZGV4TWluKSB7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPD0gaW5kZXhNYXggLSBzbGlkZUNvdW50KSB7IGluZGV4ICs9IHNsaWRlQ291bnQ7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gOlxuICAgICAgLy8gbm9uLWxvb3BcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4TWluLCBNYXRoLm1pbihpbmRleE1heCwgaW5kZXgpKTtcbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gZGlzYWJsZVVJICgpIHtcbiAgICBpZiAoIWF1dG9wbGF5ICYmIGF1dG9wbGF5QnV0dG9uKSB7IGhpZGVFbGVtZW50KGF1dG9wbGF5QnV0dG9uKTsgfVxuICAgIGlmICghbmF2ICYmIG5hdkNvbnRhaW5lcikgeyBoaWRlRWxlbWVudChuYXZDb250YWluZXIpOyB9XG4gICAgaWYgKCFjb250cm9scykge1xuICAgICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7XG4gICAgICAgIGhpZGVFbGVtZW50KGNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2QnV0dG9uKSB7IGhpZGVFbGVtZW50KHByZXZCdXR0b24pOyB9XG4gICAgICAgIGlmIChuZXh0QnV0dG9uKSB7IGhpZGVFbGVtZW50KG5leHRCdXR0b24pOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW5hYmxlVUkgKCkge1xuICAgIGlmIChhdXRvcGxheSAmJiBhdXRvcGxheUJ1dHRvbikgeyBzaG93RWxlbWVudChhdXRvcGxheUJ1dHRvbik7IH1cbiAgICBpZiAobmF2ICYmIG5hdkNvbnRhaW5lcikgeyBzaG93RWxlbWVudChuYXZDb250YWluZXIpOyB9XG4gICAgaWYgKGNvbnRyb2xzKSB7XG4gICAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgc2hvd0VsZW1lbnQoY29udHJvbHNDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByZXZCdXR0b24pIHsgc2hvd0VsZW1lbnQocHJldkJ1dHRvbik7IH1cbiAgICAgICAgaWYgKG5leHRCdXR0b24pIHsgc2hvd0VsZW1lbnQobmV4dEJ1dHRvbik7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcmVlemVTbGlkZXIgKCkge1xuICAgIGlmIChmcm96ZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAvLyByZW1vdmUgZWRnZSBwYWRkaW5nIGZyb20gaW5uZXIgd3JhcHBlclxuICAgIGlmIChlZGdlUGFkZGluZykgeyBpbm5lcldyYXBwZXIuc3R5bGUubWFyZ2luID0gJzBweCc7IH1cblxuICAgIC8vIGFkZCBjbGFzcyB0bnMtdHJhbnNwYXJlbnQgdG8gY2xvbmVkIHNsaWRlc1xuICAgIGlmIChjbG9uZUNvdW50KSB7XG4gICAgICB2YXIgc3RyID0gJ3Rucy10cmFuc3BhcmVudCc7XG4gICAgICBmb3IgKHZhciBpID0gY2xvbmVDb3VudDsgaS0tOykge1xuICAgICAgICBpZiAoY2Fyb3VzZWwpIHsgYWRkQ2xhc3Moc2xpZGVJdGVtc1tpXSwgc3RyKTsgfVxuICAgICAgICBhZGRDbGFzcyhzbGlkZUl0ZW1zW3NsaWRlQ291bnROZXcgLSBpIC0gMV0sIHN0cik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRvb2xzXG4gICAgZGlzYWJsZVVJKCk7XG5cbiAgICBmcm96ZW4gPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5mcmVlemVTbGlkZXIgKCkge1xuICAgIGlmICghZnJvemVuKSB7IHJldHVybjsgfVxuXG4gICAgLy8gcmVzdG9yZSBlZGdlIHBhZGRpbmcgZm9yIGlubmVyIHdyYXBwZXJcbiAgICAvLyBmb3IgbW9yZGVybiBicm93c2Vyc1xuICAgIGlmIChlZGdlUGFkZGluZyAmJiBDU1NNUSkgeyBpbm5lcldyYXBwZXIuc3R5bGUubWFyZ2luID0gJyc7IH1cblxuICAgIC8vIHJlbW92ZSBjbGFzcyB0bnMtdHJhbnNwYXJlbnQgdG8gY2xvbmVkIHNsaWRlc1xuICAgIGlmIChjbG9uZUNvdW50KSB7XG4gICAgICB2YXIgc3RyID0gJ3Rucy10cmFuc3BhcmVudCc7XG4gICAgICBmb3IgKHZhciBpID0gY2xvbmVDb3VudDsgaS0tOykge1xuICAgICAgICBpZiAoY2Fyb3VzZWwpIHsgcmVtb3ZlQ2xhc3Moc2xpZGVJdGVtc1tpXSwgc3RyKTsgfVxuICAgICAgICByZW1vdmVDbGFzcyhzbGlkZUl0ZW1zW3NsaWRlQ291bnROZXcgLSBpIC0gMV0sIHN0cik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRvb2xzXG4gICAgZW5hYmxlVUkoKTtcblxuICAgIGZyb3plbiA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZVNsaWRlciAoKSB7XG4gICAgaWYgKGRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgc2hlZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UobmV3Q29udGFpbmVyQ2xhc3Nlcy5zdWJzdHJpbmcoMSksICcnKTtcbiAgICByZW1vdmVBdHRycyhjb250YWluZXIsIFsnc3R5bGUnXSk7XG4gICAgaWYgKGxvb3ApIHtcbiAgICAgIGZvciAodmFyIGogPSBjbG9uZUNvdW50OyBqLS07KSB7XG4gICAgICAgIGlmIChjYXJvdXNlbCkgeyBoaWRlRWxlbWVudChzbGlkZUl0ZW1zW2pdKTsgfVxuICAgICAgICBoaWRlRWxlbWVudChzbGlkZUl0ZW1zW3NsaWRlQ291bnROZXcgLSBqIC0gMV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHZlcnRpY2FsIHNsaWRlclxuICAgIGlmICghaG9yaXpvbnRhbCB8fCAhY2Fyb3VzZWwpIHsgcmVtb3ZlQXR0cnMoaW5uZXJXcmFwcGVyLCBbJ3N0eWxlJ10pOyB9XG5cbiAgICAvLyBnYWxsZXJ5XG4gICAgaWYgKCFjYXJvdXNlbCkge1xuICAgICAgZm9yICh2YXIgaSA9IGluZGV4LCBsID0gaW5kZXggKyBzbGlkZUNvdW50OyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc1tpXTtcbiAgICAgICAgcmVtb3ZlQXR0cnMoaXRlbSwgWydzdHlsZSddKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZUluKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRvb2xzXG4gICAgZGlzYWJsZVVJKCk7XG5cbiAgICBkaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBlbmFibGVTbGlkZXIgKCkge1xuICAgIGlmICghZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBzaGVldC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgKz0gbmV3Q29udGFpbmVyQ2xhc3NlcztcbiAgICBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCgpO1xuXG4gICAgaWYgKGxvb3ApIHtcbiAgICAgIGZvciAodmFyIGogPSBjbG9uZUNvdW50OyBqLS07KSB7XG4gICAgICAgIGlmIChjYXJvdXNlbCkgeyBzaG93RWxlbWVudChzbGlkZUl0ZW1zW2pdKTsgfVxuICAgICAgICBzaG93RWxlbWVudChzbGlkZUl0ZW1zW3NsaWRlQ291bnROZXcgLSBqIC0gMV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdhbGxlcnlcbiAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICBmb3IgKHZhciBpID0gaW5kZXgsIGwgPSBpbmRleCArIHNsaWRlQ291bnQ7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zW2ldLFxuICAgICAgICAgICAgY2xhc3NOID0gaSA8IGluZGV4ICsgaXRlbXMgPyBhbmltYXRlSW4gOiBhbmltYXRlTm9ybWFsO1xuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSAoaSAtIGluZGV4KSAqIDEwMCAvIGl0ZW1zICsgJyUnO1xuICAgICAgICBhZGRDbGFzcyhpdGVtLCBjbGFzc04pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0b29sc1xuICAgIGVuYWJsZVVJKCk7XG5cbiAgICBkaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTGl2ZVJlZ2lvbiAoKSB7XG4gICAgdmFyIHN0ciA9IGdldExpdmVSZWdpb25TdHIoKTtcbiAgICBpZiAobGl2ZXJlZ2lvbkN1cnJlbnQuaW5uZXJIVE1MICE9PSBzdHIpIHsgbGl2ZXJlZ2lvbkN1cnJlbnQuaW5uZXJIVE1MID0gc3RyOyB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXZlUmVnaW9uU3RyICgpIHtcbiAgICB2YXIgYXJyID0gZ2V0VmlzaWJsZVNsaWRlUmFuZ2UoKSxcbiAgICAgICAgc3RhcnQgPSBhcnJbMF0gKyAxLFxuICAgICAgICBlbmQgPSBhcnJbMV0gKyAxO1xuICAgIHJldHVybiBzdGFydCA9PT0gZW5kID8gc3RhcnQgKyAnJyA6IHN0YXJ0ICsgJyB0byAnICsgZW5kO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmlzaWJsZVNsaWRlUmFuZ2UgKHZhbCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkgeyB2YWwgPSBnZXRDb250YWluZXJUcmFuc2Zvcm1WYWx1ZSgpOyB9XG4gICAgdmFyIHN0YXJ0ID0gaW5kZXgsIGVuZCwgcmFuZ2VzdGFydCwgcmFuZ2VlbmQ7XG5cbiAgICAvLyBnZXQgcmFuZ2Ugc3RhcnQsIHJhbmdlIGVuZCBmb3IgYXV0b1dpZHRoIGFuZCBmaXhlZFdpZHRoXG4gICAgaWYgKGNlbnRlciB8fCBlZGdlUGFkZGluZykge1xuICAgICAgaWYgKGF1dG9XaWR0aCB8fCBmaXhlZFdpZHRoKSB7XG4gICAgICAgIHJhbmdlc3RhcnQgPSAtIChwYXJzZUZsb2F0KHZhbCkgKyBlZGdlUGFkZGluZyk7XG4gICAgICAgIHJhbmdlZW5kID0gcmFuZ2VzdGFydCArIHZpZXdwb3J0ICsgZWRnZVBhZGRpbmcgKiAyO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYXV0b1dpZHRoKSB7XG4gICAgICAgIHJhbmdlc3RhcnQgPSBzbGlkZVBvc2l0aW9uc1tpbmRleF07XG4gICAgICAgIHJhbmdlZW5kID0gcmFuZ2VzdGFydCArIHZpZXdwb3J0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCBzdGFydCwgZW5kXG4gICAgLy8gLSBjaGVjayBhdXRvIHdpZHRoXG4gICAgaWYgKGF1dG9XaWR0aCkge1xuICAgICAgc2xpZGVQb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbihwb2ludCwgaSkge1xuICAgICAgICBpZiAoaSA8IHNsaWRlQ291bnROZXcpIHtcbiAgICAgICAgICBpZiAoKGNlbnRlciB8fCBlZGdlUGFkZGluZykgJiYgcG9pbnQgPD0gcmFuZ2VzdGFydCArIDAuNSkgeyBzdGFydCA9IGk7IH1cbiAgICAgICAgICBpZiAocmFuZ2VlbmQgLSBwb2ludCA+PSAwLjUpIHsgZW5kID0gaTsgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIC0gY2hlY2sgcGVyY2VudGFnZSB3aWR0aCwgZml4ZWQgd2lkdGhcbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAoZml4ZWRXaWR0aCkge1xuICAgICAgICB2YXIgY2VsbCA9IGZpeGVkV2lkdGggKyBndXR0ZXI7XG4gICAgICAgIGlmIChjZW50ZXIgfHwgZWRnZVBhZGRpbmcpIHtcbiAgICAgICAgICBzdGFydCA9IE1hdGguZmxvb3IocmFuZ2VzdGFydC9jZWxsKTtcbiAgICAgICAgICBlbmQgPSBNYXRoLmNlaWwocmFuZ2VlbmQvY2VsbCAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgTWF0aC5jZWlsKHZpZXdwb3J0L2NlbGwpIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2VudGVyIHx8IGVkZ2VQYWRkaW5nKSB7XG4gICAgICAgICAgdmFyIGEgPSBpdGVtcyAtIDE7XG4gICAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgc3RhcnQgLT0gYSAvIDI7XG4gICAgICAgICAgICBlbmQgPSBpbmRleCArIGEgLyAyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmQgPSBpbmRleCArIGE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGVkZ2VQYWRkaW5nKSB7XG4gICAgICAgICAgICB2YXIgYiA9IGVkZ2VQYWRkaW5nICogaXRlbXMgLyB2aWV3cG9ydDtcbiAgICAgICAgICAgIHN0YXJ0IC09IGI7XG4gICAgICAgICAgICBlbmQgKz0gYjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQpO1xuICAgICAgICAgIGVuZCA9IE1hdGguY2VpbChlbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXMgLSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoc3RhcnQsIDApO1xuICAgICAgZW5kID0gTWF0aC5taW4oZW5kLCBzbGlkZUNvdW50TmV3IC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvTGF6eUxvYWQgKCkge1xuICAgIGlmIChsYXp5bG9hZCAmJiAhZGlzYWJsZSkge1xuICAgICAgdmFyIGFyZyA9IGdldFZpc2libGVTbGlkZVJhbmdlKCk7XG4gICAgICBhcmcucHVzaChsYXp5bG9hZFNlbGVjdG9yKTtcblxuICAgICAgZ2V0SW1hZ2VBcnJheS5hcHBseShudWxsLCBhcmcpLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuICAgICAgICBpZiAoIWhhc0NsYXNzKGltZywgaW1nQ29tcGxldGVDbGFzcykpIHtcbiAgICAgICAgICAvLyBzdG9wIHByb3BhZ2F0aW9uIHRyYW5zaXRpb25lbmQgZXZlbnQgdG8gY29udGFpbmVyXG4gICAgICAgICAgdmFyIGV2ZSA9IHt9O1xuICAgICAgICAgIGV2ZVtUUkFOU0lUSU9ORU5EXSA9IGZ1bmN0aW9uIChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH07XG4gICAgICAgICAgYWRkRXZlbnRzKGltZywgZXZlKTtcblxuICAgICAgICAgIGFkZEV2ZW50cyhpbWcsIGltZ0V2ZW50cyk7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgc3JjXG4gICAgICAgICAgaW1nLnNyYyA9IGdldEF0dHIoaW1nLCAnZGF0YS1zcmMnKTtcblxuICAgICAgICAgIC8vIHVwZGF0ZSBzcmNzZXRcbiAgICAgICAgICB2YXIgc3Jjc2V0ID0gZ2V0QXR0cihpbWcsICdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgIGlmIChzcmNzZXQpIHsgaW1nLnNyY3NldCA9IHNyY3NldDsgfVxuXG4gICAgICAgICAgYWRkQ2xhc3MoaW1nLCAnbG9hZGluZycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkltZ0xvYWRlZCAoZSkge1xuICAgIGltZ0xvYWRlZChnZXRUYXJnZXQoZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25JbWdGYWlsZWQgKGUpIHtcbiAgICBpbWdGYWlsZWQoZ2V0VGFyZ2V0KGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltZ0xvYWRlZCAoaW1nKSB7XG4gICAgYWRkQ2xhc3MoaW1nLCAnbG9hZGVkJyk7XG4gICAgaW1nQ29tcGxldGVkKGltZyk7XG4gIH1cblxuICBmdW5jdGlvbiBpbWdGYWlsZWQgKGltZykge1xuICAgIGFkZENsYXNzKGltZywgJ2ZhaWxlZCcpO1xuICAgIGltZ0NvbXBsZXRlZChpbWcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1nQ29tcGxldGVkIChpbWcpIHtcbiAgICBhZGRDbGFzcyhpbWcsIGltZ0NvbXBsZXRlQ2xhc3MpO1xuICAgIHJlbW92ZUNsYXNzKGltZywgJ2xvYWRpbmcnKTtcbiAgICByZW1vdmVFdmVudHMoaW1nLCBpbWdFdmVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW1hZ2VBcnJheSAoc3RhcnQsIGVuZCwgaW1nU2VsZWN0b3IpIHtcbiAgICB2YXIgaW1ncyA9IFtdO1xuICAgIGlmICghaW1nU2VsZWN0b3IpIHsgaW1nU2VsZWN0b3IgPSAnaW1nJzsgfVxuXG4gICAgd2hpbGUgKHN0YXJ0IDw9IGVuZCkge1xuICAgICAgZm9yRWFjaChzbGlkZUl0ZW1zW3N0YXJ0XS5xdWVyeVNlbGVjdG9yQWxsKGltZ1NlbGVjdG9yKSwgZnVuY3Rpb24gKGltZykgeyBpbWdzLnB1c2goaW1nKTsgfSk7XG4gICAgICBzdGFydCsrO1xuICAgIH1cblxuICAgIHJldHVybiBpbWdzO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgYWxsIHZpc2libGUgaW1hZ2VzIGFyZSBsb2FkZWRcbiAgLy8gYW5kIHVwZGF0ZSBjb250YWluZXIgaGVpZ2h0IGlmIGl0J3MgZG9uZVxuICBmdW5jdGlvbiBkb0F1dG9IZWlnaHQgKCkge1xuICAgIHZhciBpbWdzID0gZ2V0SW1hZ2VBcnJheS5hcHBseShudWxsLCBnZXRWaXNpYmxlU2xpZGVSYW5nZSgpKTtcbiAgICByYWYoZnVuY3Rpb24oKXsgaW1nc0xvYWRlZENoZWNrKGltZ3MsIHVwZGF0ZUlubmVyV3JhcHBlckhlaWdodCk7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1nc0xvYWRlZENoZWNrIChpbWdzLCBjYikge1xuICAgIC8vIGV4ZWN1dGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgYWxsIGltYWdlcyBhcmUgY29tcGxldGVcbiAgICBpZiAoaW1nc0NvbXBsZXRlKSB7IHJldHVybiBjYigpOyB9XG5cbiAgICAvLyBjaGVjayBpbWFnZSBjbGFzc2VzXG4gICAgaW1ncy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGluZGV4KSB7XG4gICAgICBpZiAoIWxhenlsb2FkICYmIGltZy5jb21wbGV0ZSkgeyBpbWdDb21wbGV0ZWQoaW1nKTsgfSAvLyBDaGVjayBpbWFnZS5jb21wbGV0ZVxuICAgICAgaWYgKGhhc0NsYXNzKGltZywgaW1nQ29tcGxldGVDbGFzcykpIHsgaW1ncy5zcGxpY2UoaW5kZXgsIDEpOyB9XG4gICAgfSk7XG5cbiAgICAvLyBleGVjdXRlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIHNlbGVjdGVkIGltYWdlcyBhcmUgYWxsIGNvbXBsZXRlXG4gICAgaWYgKCFpbWdzLmxlbmd0aCkgeyByZXR1cm4gY2IoKTsgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIGV4ZWN1dGUgdGhpcyBmdW5jdGlvbmEgYWdhaW5cbiAgICByYWYoZnVuY3Rpb24oKXsgaW1nc0xvYWRlZENoZWNrKGltZ3MsIGNiKTsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRpdGlvbmFsVXBkYXRlcyAoKSB7XG4gICAgZG9MYXp5TG9hZCgpO1xuICAgIHVwZGF0ZVNsaWRlU3RhdHVzKCk7XG4gICAgdXBkYXRlTGl2ZVJlZ2lvbigpO1xuICAgIHVwZGF0ZUNvbnRyb2xzU3RhdHVzKCk7XG4gICAgdXBkYXRlTmF2U3RhdHVzKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHVwZGF0ZV9jYXJvdXNlbF90cmFuc2l0aW9uX2R1cmF0aW9uICgpIHtcbiAgICBpZiAoY2Fyb3VzZWwgJiYgYXV0b0hlaWdodCkge1xuICAgICAgbWlkZGxlV3JhcHBlci5zdHlsZVtUUkFOU0lUSU9ORFVSQVRJT05dID0gc3BlZWQgLyAxMDAwICsgJ3MnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1heFNsaWRlSGVpZ2h0IChzbGlkZVN0YXJ0LCBzbGlkZVJhbmdlKSB7XG4gICAgdmFyIGhlaWdodHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gc2xpZGVTdGFydCwgbCA9IE1hdGgubWluKHNsaWRlU3RhcnQgKyBzbGlkZVJhbmdlLCBzbGlkZUNvdW50TmV3KTsgaSA8IGw7IGkrKykge1xuICAgICAgaGVpZ2h0cy5wdXNoKHNsaWRlSXRlbXNbaV0ub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gIH1cblxuICAvLyB1cGRhdGUgaW5uZXIgd3JhcHBlciBoZWlnaHRcbiAgLy8gMS4gZ2V0IHRoZSBtYXgtaGVpZ2h0IG9mIHRoZSB2aXNpYmxlIHNsaWRlc1xuICAvLyAyLiBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uIHRvIHNwZWVkXG4gIC8vIDMuIHVwZGF0ZSBpbm5lciB3cmFwcGVyIGhlaWdodCB0byBtYXgtaGVpZ2h0XG4gIC8vIDQuIHNldCB0cmFuc2l0aW9uRHVyYXRpb24gdG8gMHMgYWZ0ZXIgdHJhbnNpdGlvbiBkb25lXG4gIGZ1bmN0aW9uIHVwZGF0ZUlubmVyV3JhcHBlckhlaWdodCAoKSB7XG4gICAgdmFyIG1heEhlaWdodCA9IGF1dG9IZWlnaHQgPyBnZXRNYXhTbGlkZUhlaWdodChpbmRleCwgaXRlbXMpIDogZ2V0TWF4U2xpZGVIZWlnaHQoY2xvbmVDb3VudCwgc2xpZGVDb3VudCksXG4gICAgICAgIHdwID0gbWlkZGxlV3JhcHBlciA/IG1pZGRsZVdyYXBwZXIgOiBpbm5lcldyYXBwZXI7XG5cbiAgICBpZiAod3Auc3R5bGUuaGVpZ2h0ICE9PSBtYXhIZWlnaHQpIHsgd3Auc3R5bGUuaGVpZ2h0ID0gbWF4SGVpZ2h0ICsgJ3B4JzsgfVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBkaXN0YW5jZSBmcm9tIHRoZSB0b3AgZWRnZSBvZiB0aGUgZmlyc3Qgc2xpZGUgdG8gZWFjaCBzbGlkZVxuICAvLyAoaW5pdCkgPT4gc2xpZGVQb3NpdGlvbnNcbiAgZnVuY3Rpb24gc2V0U2xpZGVQb3NpdGlvbnMgKCkge1xuICAgIHNsaWRlUG9zaXRpb25zID0gWzBdO1xuICAgIHZhciBhdHRyID0gaG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnLFxuICAgICAgICBhdHRyMiA9IGhvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbScsXG4gICAgICAgIGJhc2UgPSBzbGlkZUl0ZW1zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2F0dHJdO1xuXG4gICAgZm9yRWFjaChzbGlkZUl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAvLyBza2lwIHRoZSBmaXJzdCBzbGlkZVxuICAgICAgaWYgKGkpIHsgc2xpZGVQb3NpdGlvbnMucHVzaChpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2F0dHJdIC0gYmFzZSk7IH1cbiAgICAgIC8vIGFkZCB0aGUgZW5kIGVkZ2VcbiAgICAgIGlmIChpID09PSBzbGlkZUNvdW50TmV3IC0gMSkgeyBzbGlkZVBvc2l0aW9ucy5wdXNoKGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbYXR0cjJdIC0gYmFzZSk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBzbGlkZVxuICBmdW5jdGlvbiB1cGRhdGVTbGlkZVN0YXR1cyAoKSB7XG4gICAgdmFyIHJhbmdlID0gZ2V0VmlzaWJsZVNsaWRlUmFuZ2UoKSxcbiAgICAgICAgc3RhcnQgPSByYW5nZVswXSxcbiAgICAgICAgZW5kID0gcmFuZ2VbMV07XG5cbiAgICBmb3JFYWNoKHNsaWRlSXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHNob3cgc2xpZGVzXG4gICAgICBpZiAoaSA+PSBzdGFydCAmJiBpIDw9IGVuZCkge1xuICAgICAgICBpZiAoaGFzQXR0cihpdGVtLCAnYXJpYS1oaWRkZW4nKSkge1xuICAgICAgICAgIHJlbW92ZUF0dHJzKGl0ZW0sIFsnYXJpYS1oaWRkZW4nLCAndGFiaW5kZXgnXSk7XG4gICAgICAgICAgYWRkQ2xhc3MoaXRlbSwgc2xpZGVBY3RpdmVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIC8vIGhpZGUgc2xpZGVzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc0F0dHIoaXRlbSwgJ2FyaWEtaGlkZGVuJykpIHtcbiAgICAgICAgICBzZXRBdHRycyhpdGVtLCB7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgc2xpZGVBY3RpdmVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdhbGxlcnk6IHVwZGF0ZSBzbGlkZSBwb3NpdGlvblxuICBmdW5jdGlvbiB1cGRhdGVHYWxsZXJ5U2xpZGVQb3NpdGlvbnMgKCkge1xuICAgIHZhciBsID0gaW5kZXggKyBNYXRoLm1pbihzbGlkZUNvdW50LCBpdGVtcyk7XG4gICAgZm9yICh2YXIgaSA9IHNsaWRlQ291bnROZXc7IGktLTspIHtcbiAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc1tpXTtcblxuICAgICAgaWYgKGkgPj0gaW5kZXggJiYgaSA8IGwpIHtcbiAgICAgICAgLy8gYWRkIHRyYW5zaXRpb25zIHRvIHZpc2libGUgc2xpZGVzIHdoZW4gYWRqdXN0aW5nIHRoZWlyIHBvc2l0aW9uc1xuICAgICAgICBhZGRDbGFzcyhpdGVtLCAndG5zLW1vdmluZycpO1xuXG4gICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9IChpIC0gaW5kZXgpICogMTAwIC8gaXRlbXMgKyAnJSc7XG4gICAgICAgIGFkZENsYXNzKGl0ZW0sIGFuaW1hdGVJbik7XG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnN0eWxlLmxlZnQpIHtcbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgICAgIGFkZENsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpO1xuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlSW4pO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgb3V0bGV0IGFuaW1hdGlvblxuICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZU91dCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZpbmcgJy50bnMtbW92aW5nJ1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBmb3JFYWNoKHNsaWRlSXRlbXMsIGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsLCAndG5zLW1vdmluZycpO1xuICAgICAgfSk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIC8vIHNldCB0YWJpbmRleCBvbiBOYXZcbiAgZnVuY3Rpb24gdXBkYXRlTmF2U3RhdHVzICgpIHtcbiAgICAvLyBnZXQgY3VycmVudCBuYXZcbiAgICBpZiAobmF2KSB7XG4gICAgICBuYXZDdXJyZW50SW5kZXggPSBuYXZDbGlja2VkID49IDAgPyBuYXZDbGlja2VkIDogZ2V0Q3VycmVudE5hdkluZGV4KCk7XG4gICAgICBuYXZDbGlja2VkID0gLTE7XG5cbiAgICAgIGlmIChuYXZDdXJyZW50SW5kZXggIT09IG5hdkN1cnJlbnRJbmRleENhY2hlZCkge1xuICAgICAgICB2YXIgbmF2UHJldiA9IG5hdkl0ZW1zW25hdkN1cnJlbnRJbmRleENhY2hlZF0sXG4gICAgICAgICAgICBuYXZDdXJyZW50ID0gbmF2SXRlbXNbbmF2Q3VycmVudEluZGV4XTtcblxuICAgICAgICBzZXRBdHRycyhuYXZQcmV2LCB7XG4gICAgICAgICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IG5hdlN0ciArIChuYXZDdXJyZW50SW5kZXhDYWNoZWQgKyAxKVxuICAgICAgICB9KTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MobmF2UHJldiwgbmF2QWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIHNldEF0dHJzKG5hdkN1cnJlbnQsIHsnYXJpYS1sYWJlbCc6IG5hdlN0ciArIChuYXZDdXJyZW50SW5kZXggKyAxKSArIG5hdlN0ckN1cnJlbnR9KTtcbiAgICAgICAgcmVtb3ZlQXR0cnMobmF2Q3VycmVudCwgJ3RhYmluZGV4Jyk7XG4gICAgICAgIGFkZENsYXNzKG5hdkN1cnJlbnQsIG5hdkFjdGl2ZUNsYXNzKTtcblxuICAgICAgICBuYXZDdXJyZW50SW5kZXhDYWNoZWQgPSBuYXZDdXJyZW50SW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG93ZXJDYXNlTm9kZU5hbWUgKGVsKSB7XG4gICAgcmV0dXJuIGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0J1dHRvbiAoZWwpIHtcbiAgICByZXR1cm4gZ2V0TG93ZXJDYXNlTm9kZU5hbWUoZWwpID09PSAnYnV0dG9uJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQXJpYURpc2FibGVkIChlbCkge1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzRW5hYmxlRWxlbWVudCAoaXNCdXR0b24sIGVsLCB2YWwpIHtcbiAgICBpZiAoaXNCdXR0b24pIHtcbiAgICAgIGVsLmRpc2FibGVkID0gdmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCB2YWwudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0ICdkaXNhYmxlZCcgdG8gdHJ1ZSBvbiBjb250cm9scyB3aGVuIHJlYWNoIHRoZSBlZGdlc1xuICBmdW5jdGlvbiB1cGRhdGVDb250cm9sc1N0YXR1cyAoKSB7XG4gICAgaWYgKCFjb250cm9scyB8fCByZXdpbmQgfHwgbG9vcCkgeyByZXR1cm47IH1cblxuICAgIHZhciBwcmV2RGlzYWJsZWQgPSAocHJldklzQnV0dG9uKSA/IHByZXZCdXR0b24uZGlzYWJsZWQgOiBpc0FyaWFEaXNhYmxlZChwcmV2QnV0dG9uKSxcbiAgICAgICAgbmV4dERpc2FibGVkID0gKG5leHRJc0J1dHRvbikgPyBuZXh0QnV0dG9uLmRpc2FibGVkIDogaXNBcmlhRGlzYWJsZWQobmV4dEJ1dHRvbiksXG4gICAgICAgIGRpc2FibGVQcmV2ID0gKGluZGV4IDw9IGluZGV4TWluKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZU5leHQgPSAoIXJld2luZCAmJiBpbmRleCA+PSBpbmRleE1heCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAoZGlzYWJsZVByZXYgJiYgIXByZXZEaXNhYmxlZCkge1xuICAgICAgZGlzRW5hYmxlRWxlbWVudChwcmV2SXNCdXR0b24sIHByZXZCdXR0b24sIHRydWUpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVQcmV2ICYmIHByZXZEaXNhYmxlZCkge1xuICAgICAgZGlzRW5hYmxlRWxlbWVudChwcmV2SXNCdXR0b24sIHByZXZCdXR0b24sIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGRpc2FibGVOZXh0ICYmICFuZXh0RGlzYWJsZWQpIHtcbiAgICAgIGRpc0VuYWJsZUVsZW1lbnQobmV4dElzQnV0dG9uLCBuZXh0QnV0dG9uLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCFkaXNhYmxlTmV4dCAmJiBuZXh0RGlzYWJsZWQpIHtcbiAgICAgIGRpc0VuYWJsZUVsZW1lbnQobmV4dElzQnV0dG9uLCBuZXh0QnV0dG9uLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IGR1cmF0aW9uXG4gIGZ1bmN0aW9uIHJlc2V0RHVyYXRpb24gKGVsLCBzdHIpIHtcbiAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7IGVsLnN0eWxlW1RSQU5TSVRJT05EVVJBVElPTl0gPSBzdHI7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlcldpZHRoICgpIHtcbiAgICByZXR1cm4gZml4ZWRXaWR0aCA/IChmaXhlZFdpZHRoICsgZ3V0dGVyKSAqIHNsaWRlQ291bnROZXcgOiBzbGlkZVBvc2l0aW9uc1tzbGlkZUNvdW50TmV3XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENlbnRlckdhcCAobnVtKSB7XG4gICAgaWYgKG51bSA9PSBudWxsKSB7IG51bSA9IGluZGV4OyB9XG5cbiAgICB2YXIgZ2FwID0gZWRnZVBhZGRpbmcgPyBndXR0ZXIgOiAwO1xuICAgIHJldHVybiBhdXRvV2lkdGggPyAoKHZpZXdwb3J0IC0gZ2FwKSAtIChzbGlkZVBvc2l0aW9uc1tudW0gKyAxXSAtIHNsaWRlUG9zaXRpb25zW251bV0gLSBndXR0ZXIpKS8yIDpcbiAgICAgIGZpeGVkV2lkdGggPyAodmlld3BvcnQgLSBmaXhlZFdpZHRoKSAvIDIgOlxuICAgICAgICAoaXRlbXMgLSAxKSAvIDI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSaWdodEJvdW5kYXJ5ICgpIHtcbiAgICB2YXIgZ2FwID0gZWRnZVBhZGRpbmcgPyBndXR0ZXIgOiAwLFxuICAgICAgICByZXN1bHQgPSAodmlld3BvcnQgKyBnYXApIC0gZ2V0U2xpZGVyV2lkdGgoKTtcblxuICAgIGlmIChjZW50ZXIgJiYgIWxvb3ApIHtcbiAgICAgIHJlc3VsdCA9IGZpeGVkV2lkdGggPyAtIChmaXhlZFdpZHRoICsgZ3V0dGVyKSAqIChzbGlkZUNvdW50TmV3IC0gMSkgLSBnZXRDZW50ZXJHYXAoKSA6XG4gICAgICAgIGdldENlbnRlckdhcChzbGlkZUNvdW50TmV3IC0gMSkgLSBzbGlkZVBvc2l0aW9uc1tzbGlkZUNvdW50TmV3IC0gMV07XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPiAwKSB7IHJlc3VsdCA9IDA7IH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250YWluZXJUcmFuc2Zvcm1WYWx1ZSAobnVtKSB7XG4gICAgaWYgKG51bSA9PSBudWxsKSB7IG51bSA9IGluZGV4OyB9XG5cbiAgICB2YXIgdmFsO1xuICAgIGlmIChob3Jpem9udGFsICYmICFhdXRvV2lkdGgpIHtcbiAgICAgIGlmIChmaXhlZFdpZHRoKSB7XG4gICAgICAgIHZhbCA9IC0gKGZpeGVkV2lkdGggKyBndXR0ZXIpICogbnVtO1xuICAgICAgICBpZiAoY2VudGVyKSB7IHZhbCArPSBnZXRDZW50ZXJHYXAoKTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRlbm9taW5hdG9yID0gVFJBTlNGT1JNID8gc2xpZGVDb3VudE5ldyA6IGl0ZW1zO1xuICAgICAgICBpZiAoY2VudGVyKSB7IG51bSAtPSBnZXRDZW50ZXJHYXAoKTsgfVxuICAgICAgICB2YWwgPSAtIG51bSAqIDEwMCAvIGRlbm9taW5hdG9yO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWwgPSAtIHNsaWRlUG9zaXRpb25zW251bV07XG4gICAgICBpZiAoY2VudGVyICYmIGF1dG9XaWR0aCkge1xuICAgICAgICB2YWwgKz0gZ2V0Q2VudGVyR2FwKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1JpZ2h0RGVhZFpvbmUpIHsgdmFsID0gTWF0aC5tYXgodmFsLCByaWdodEJvdW5kYXJ5KTsgfVxuXG4gICAgdmFsICs9IChob3Jpem9udGFsICYmICFhdXRvV2lkdGggJiYgIWZpeGVkV2lkdGgpID8gJyUnIDogJ3B4JztcblxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCAodmFsKSB7XG4gICAgcmVzZXREdXJhdGlvbihjb250YWluZXIsICcwcycpO1xuICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtKHZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb0NvbnRhaW5lclRyYW5zZm9ybSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7IHZhbCA9IGdldENvbnRhaW5lclRyYW5zZm9ybVZhbHVlKCk7IH1cbiAgICBjb250YWluZXIuc3R5bGVbdHJhbnNmb3JtQXR0cl0gPSB0cmFuc2Zvcm1QcmVmaXggKyB2YWwgKyB0cmFuc2Zvcm1Qb3N0Zml4O1xuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlIChudW1iZXIsIGNsYXNzT3V0LCBjbGFzc0luLCBpc091dCkge1xuICAgIHZhciBsID0gbnVtYmVyICsgaXRlbXM7XG4gICAgaWYgKCFsb29wKSB7IGwgPSBNYXRoLm1pbihsLCBzbGlkZUNvdW50TmV3KTsgfVxuXG4gICAgZm9yICh2YXIgaSA9IG51bWJlcjsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNbaV07XG5cbiAgICAgIC8vIHNldCBpdGVtIHBvc2l0aW9uc1xuICAgICAgaWYgKCFpc091dCkgeyBpdGVtLnN0eWxlLmxlZnQgPSAoaSAtIGluZGV4KSAqIDEwMCAvIGl0ZW1zICsgJyUnOyB9XG5cbiAgICAgIGlmIChhbmltYXRlRGVsYXkgJiYgVFJBTlNJVElPTkRFTEFZKSB7XG4gICAgICAgIGl0ZW0uc3R5bGVbVFJBTlNJVElPTkRFTEFZXSA9IGl0ZW0uc3R5bGVbQU5JTUFUSU9OREVMQVldID0gYW5pbWF0ZURlbGF5ICogKGkgLSBudW1iZXIpIC8gMTAwMCArICdzJztcbiAgICAgIH1cbiAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGNsYXNzT3V0KTtcbiAgICAgIGFkZENsYXNzKGl0ZW0sIGNsYXNzSW4pO1xuXG4gICAgICBpZiAoaXNPdXQpIHsgc2xpZGVJdGVtc091dC5wdXNoKGl0ZW0pOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gbWFrZSB0cmFuc2ZlciBhZnRlciBjbGljay9kcmFnOlxuICAvLyAxLiBjaGFuZ2UgJ3RyYW5zZm9ybScgcHJvcGVydHkgZm9yIG1vcmRlcm4gYnJvd3NlcnNcbiAgLy8gMi4gY2hhbmdlICdsZWZ0JyBwcm9wZXJ0eSBmb3IgbGVnYWN5IGJyb3dzZXJzXG4gIHZhciB0cmFuc2Zvcm1Db3JlID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2Fyb3VzZWwgP1xuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNldER1cmF0aW9uKGNvbnRhaW5lciwgJycpO1xuICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OIHx8ICFzcGVlZCkge1xuICAgICAgICAgIC8vIGZvciBtb3JkZW4gYnJvd3NlcnMgd2l0aCBub24temVybyBkdXJhdGlvbiBvclxuICAgICAgICAgIC8vIHplcm8gZHVyYXRpb24gZm9yIGFsbCBicm93c2Vyc1xuICAgICAgICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtKCk7XG4gICAgICAgICAgLy8gcnVuIGZhbGxiYWNrIGZ1bmN0aW9uIG1hbnVhbGx5XG4gICAgICAgICAgLy8gd2hlbiBkdXJhdGlvbiBpcyAwIC8gY29udGFpbmVyIGlzIGhpZGRlblxuICAgICAgICAgIGlmICghc3BlZWQgfHwgIWlzVmlzaWJsZShjb250YWluZXIpKSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb3Igb2xkIGJyb3dzZXIgd2l0aCBub24temVybyBkdXJhdGlvblxuICAgICAgICAgIGpzVHJhbnNmb3JtKGNvbnRhaW5lciwgdHJhbnNmb3JtQXR0ciwgdHJhbnNmb3JtUHJlZml4LCB0cmFuc2Zvcm1Qb3N0Zml4LCBnZXRDb250YWluZXJUcmFuc2Zvcm1WYWx1ZSgpLCBzcGVlZCwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaG9yaXpvbnRhbCkgeyB1cGRhdGVDb250ZW50V3JhcHBlckhlaWdodCgpOyB9XG4gICAgICB9IDpcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2xpZGVJdGVtc091dCA9IFtdO1xuXG4gICAgICAgIHZhciBldmUgPSB7fTtcbiAgICAgICAgZXZlW1RSQU5TSVRJT05FTkRdID0gZXZlW0FOSU1BVElPTkVORF0gPSBvblRyYW5zaXRpb25FbmQ7XG4gICAgICAgIHJlbW92ZUV2ZW50cyhzbGlkZUl0ZW1zW2luZGV4Q2FjaGVkXSwgZXZlKTtcbiAgICAgICAgYWRkRXZlbnRzKHNsaWRlSXRlbXNbaW5kZXhdLCBldmUpO1xuXG4gICAgICAgIGFuaW1hdGVTbGlkZShpbmRleENhY2hlZCwgYW5pbWF0ZUluLCBhbmltYXRlT3V0LCB0cnVlKTtcbiAgICAgICAgYW5pbWF0ZVNsaWRlKGluZGV4LCBhbmltYXRlTm9ybWFsLCBhbmltYXRlSW4pO1xuXG4gICAgICAgIC8vIHJ1biBmYWxsYmFjayBmdW5jdGlvbiBtYW51YWxseVxuICAgICAgICAvLyB3aGVuIHRyYW5zaXRpb24gb3IgYW5pbWF0aW9uIG5vdCBzdXBwb3J0ZWQgLyBkdXJhdGlvbiBpcyAwXG4gICAgICAgIGlmICghVFJBTlNJVElPTkVORCB8fCAhQU5JTUFUSU9ORU5EIHx8ICFzcGVlZCB8fCAhaXNWaXNpYmxlKGNvbnRhaW5lcikpIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gcmVuZGVyIChlLCBzbGlkZXJNb3ZlZCkge1xuICAgIGlmICh1cGRhdGVJbmRleEJlZm9yZVRyYW5zZm9ybSkgeyB1cGRhdGVJbmRleCgpOyB9XG5cbiAgICAvLyByZW5kZXIgd2hlbiBzbGlkZXIgd2FzIG1vdmVkICh0b3VjaCBvciBkcmFnKSBldmVuIHRob3VnaCBpbmRleCBtYXkgbm90IGNoYW5nZVxuICAgIGlmIChpbmRleCAhPT0gaW5kZXhDYWNoZWQgfHwgc2xpZGVyTW92ZWQpIHtcbiAgICAgIC8vIGV2ZW50c1xuICAgICAgZXZlbnRzLmVtaXQoJ2luZGV4Q2hhbmdlZCcsIGluZm8oKSk7XG4gICAgICBldmVudHMuZW1pdCgndHJhbnNpdGlvblN0YXJ0JywgaW5mbygpKTtcbiAgICAgIGlmIChhdXRvSGVpZ2h0KSB7IGRvQXV0b0hlaWdodCgpOyB9XG5cbiAgICAgIC8vIHBhdXNlIGF1dG9wbGF5IHdoZW4gY2xpY2sgb3Iga2V5ZG93biBmcm9tIHVzZXJcbiAgICAgIGlmIChhbmltYXRpbmcgJiYgZSAmJiBbJ2NsaWNrJywgJ2tleWRvd24nXS5pbmRleE9mKGUudHlwZSkgPj0gMCkgeyBzdG9wQXV0b3BsYXkoKTsgfVxuXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIHRyYW5zZm9ybUNvcmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBUcmFuc2ZlciBwcmVmaXhlZCBwcm9wZXJ0aWVzIHRvIHRoZSBzYW1lIGZvcm1hdFxuICAgKiBDU1M6IC1XZWJraXQtVHJhbnNmb3JtID0+IHdlYmtpdHRyYW5zZm9ybVxuICAgKiBKUzogV2Via2l0VHJhbnNmb3JtID0+IHdlYmtpdHRyYW5zZm9ybVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gcHJvcGVydHlcbiAgICpcbiAgICovXG4gIGZ1bmN0aW9uIHN0clRyYW5zIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCAnJyk7XG4gIH1cblxuICAvLyBBRlRFUiBUUkFOU0ZPUk1cbiAgLy8gVGhpbmdzIG5lZWQgdG8gYmUgZG9uZSBhZnRlciBhIHRyYW5zZmVyOlxuICAvLyAxLiBjaGVjayBpbmRleFxuICAvLyAyLiBhZGQgY2xhc3NlcyB0byB2aXNpYmxlIHNsaWRlXG4gIC8vIDMuIGRpc2FibGUgY29udHJvbHMgYnV0dG9ucyB3aGVuIHJlYWNoIHRoZSBmaXJzdC9sYXN0IHNsaWRlIGluIG5vbi1sb29wIHNsaWRlclxuICAvLyA0LiB1cGRhdGUgbmF2IHN0YXR1c1xuICAvLyA1LiBsYXp5bG9hZCBpbWFnZXNcbiAgLy8gNi4gdXBkYXRlIGNvbnRhaW5lciBoZWlnaHRcbiAgZnVuY3Rpb24gb25UcmFuc2l0aW9uRW5kIChldmVudCkge1xuICAgIC8vIGNoZWNrIHJ1bm5pbmcgb24gZ2FsbGVyeSBtb2RlXG4gICAgLy8gbWFrZSBzdXJlIHRyYW50aW9uZW5kL2FuaW1hdGlvbmVuZCBldmVudHMgcnVuIG9ubHkgb25jZVxuICAgIGlmIChjYXJvdXNlbCB8fCBydW5uaW5nKSB7XG4gICAgICBldmVudHMuZW1pdCgndHJhbnNpdGlvbkVuZCcsIGluZm8oZXZlbnQpKTtcblxuICAgICAgaWYgKCFjYXJvdXNlbCAmJiBzbGlkZUl0ZW1zT3V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZUl0ZW1zT3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zT3V0W2ldO1xuICAgICAgICAgIC8vIHNldCBpdGVtIHBvc2l0aW9uc1xuICAgICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9ICcnO1xuXG4gICAgICAgICAgaWYgKEFOSU1BVElPTkRFTEFZICYmIFRSQU5TSVRJT05ERUxBWSkge1xuICAgICAgICAgICAgaXRlbS5zdHlsZVtBTklNQVRJT05ERUxBWV0gPSAnJztcbiAgICAgICAgICAgIGl0ZW0uc3R5bGVbVFJBTlNJVElPTkRFTEFZXSA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlT3V0KTtcbiAgICAgICAgICBhZGRDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiB1cGRhdGUgc2xpZGVzLCBuYXYsIGNvbnRyb2xzIGFmdGVyIGNoZWNraW5nIC4uLlxuICAgICAgICogPT4gbGVnYWN5IGJyb3dzZXJzIHdobyBkb24ndCBzdXBwb3J0ICdldmVudCdcbiAgICAgICAqICAgIGhhdmUgdG8gY2hlY2sgZXZlbnQgZmlyc3QsIG90aGVyd2lzZSBldmVudC50YXJnZXQgd2lsbCBjYXVzZSBhbiBlcnJvclxuICAgICAgICogPT4gb3IgJ2dhbGxlcnknIG1vZGU6XG4gICAgICAgKiAgICsgZXZlbnQgdGFyZ2V0IGlzIHNsaWRlIGl0ZW1cbiAgICAgICAqID0+IG9yICdjYXJvdXNlbCcgbW9kZTpcbiAgICAgICAqICAgKyBldmVudCB0YXJnZXQgaXMgY29udGFpbmVyLFxuICAgICAgICogICArIGV2ZW50LnByb3BlcnR5IGlzIHRoZSBzYW1lIHdpdGggdHJhbnNmb3JtIGF0dHJpYnV0ZVxuICAgICAgICovXG4gICAgICBpZiAoIWV2ZW50IHx8XG4gICAgICAgICAgIWNhcm91c2VsICYmIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlID09PSBjb250YWluZXIgfHxcbiAgICAgICAgICBldmVudC50YXJnZXQgPT09IGNvbnRhaW5lciAmJiBzdHJUcmFucyhldmVudC5wcm9wZXJ0eU5hbWUpID09PSBzdHJUcmFucyh0cmFuc2Zvcm1BdHRyKSkge1xuXG4gICAgICAgIGlmICghdXBkYXRlSW5kZXhCZWZvcmVUcmFuc2Zvcm0pIHtcbiAgICAgICAgICB2YXIgaW5kZXhUZW0gPSBpbmRleDtcbiAgICAgICAgICB1cGRhdGVJbmRleCgpO1xuICAgICAgICAgIGlmIChpbmRleCAhPT0gaW5kZXhUZW0pIHtcbiAgICAgICAgICAgIGV2ZW50cy5lbWl0KCdpbmRleENoYW5nZWQnLCBpbmZvKCkpO1xuXG4gICAgICAgICAgICBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXN0ZWQgPT09ICdpbm5lcicpIHsgZXZlbnRzLmVtaXQoJ2lubmVyTG9hZGVkJywgaW5mbygpKTsgfVxuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIGluZGV4Q2FjaGVkID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICAvLyAjIEFDVElPTlNcbiAgZnVuY3Rpb24gZ29UbyAodGFyZ2V0SW5kZXgsIGUpIHtcbiAgICBpZiAoZnJlZXplKSB7IHJldHVybjsgfVxuXG4gICAgLy8gcHJldiBzbGlkZUJ5XG4gICAgaWYgKHRhcmdldEluZGV4ID09PSAncHJldicpIHtcbiAgICAgIG9uQ29udHJvbHNDbGljayhlLCAtMSk7XG5cbiAgICAvLyBuZXh0IHNsaWRlQnlcbiAgICB9IGVsc2UgaWYgKHRhcmdldEluZGV4ID09PSAnbmV4dCcpIHtcbiAgICAgIG9uQ29udHJvbHNDbGljayhlLCAxKTtcblxuICAgIC8vIGdvIHRvIGV4YWN0IHNsaWRlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgIGlmIChwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcpIHsgcmV0dXJuOyB9IGVsc2UgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuICAgICAgfVxuXG4gICAgICB2YXIgYWJzSW5kZXggPSBnZXRBYnNJbmRleCgpLFxuICAgICAgICAgIGluZGV4R2FwID0gMDtcblxuICAgICAgaWYgKHRhcmdldEluZGV4ID09PSAnZmlyc3QnKSB7XG4gICAgICAgIGluZGV4R2FwID0gLSBhYnNJbmRleDtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0SW5kZXggPT09ICdsYXN0Jykge1xuICAgICAgICBpbmRleEdhcCA9IGNhcm91c2VsID8gc2xpZGVDb3VudCAtIGl0ZW1zIC0gYWJzSW5kZXggOiBzbGlkZUNvdW50IC0gMSAtIGFic0luZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRJbmRleCAhPT0gJ251bWJlcicpIHsgdGFyZ2V0SW5kZXggPSBwYXJzZUludCh0YXJnZXRJbmRleCk7IH1cblxuICAgICAgICBpZiAoIWlzTmFOKHRhcmdldEluZGV4KSkge1xuICAgICAgICAgIC8vIGZyb20gZGlyZWN0bHkgY2FsbGVkIGdvVG8gZnVuY3Rpb25cbiAgICAgICAgICBpZiAoIWUpIHsgdGFyZ2V0SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzbGlkZUNvdW50IC0gMSwgdGFyZ2V0SW5kZXgpKTsgfVxuXG4gICAgICAgICAgaW5kZXhHYXAgPSB0YXJnZXRJbmRleCAtIGFic0luZGV4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGdhbGxlcnk6IG1ha2Ugc3VyZSBuZXcgcGFnZSB3b24ndCBvdmVybGFwIHdpdGggY3VycmVudCBwYWdlXG4gICAgICBpZiAoIWNhcm91c2VsICYmIGluZGV4R2FwICYmIE1hdGguYWJzKGluZGV4R2FwKSA8IGl0ZW1zKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBpbmRleEdhcCA+IDAgPyAxIDogLTE7XG4gICAgICAgIGluZGV4R2FwICs9IChpbmRleCArIGluZGV4R2FwIC0gc2xpZGVDb3VudCkgPj0gaW5kZXhNaW4gPyBzbGlkZUNvdW50ICogZmFjdG9yIDogc2xpZGVDb3VudCAqIDIgKiBmYWN0b3IgKiAtMTtcbiAgICAgIH1cblxuICAgICAgaW5kZXggKz0gaW5kZXhHYXA7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBpbmRleCBpcyBpbiByYW5nZVxuICAgICAgaWYgKGNhcm91c2VsICYmIGxvb3ApIHtcbiAgICAgICAgaWYgKGluZGV4IDwgaW5kZXhNaW4pIHsgaW5kZXggKz0gc2xpZGVDb3VudDsgfVxuICAgICAgICBpZiAoaW5kZXggPiBpbmRleE1heCkgeyBpbmRleCAtPSBzbGlkZUNvdW50OyB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGluZGV4IGlzIGNoYW5nZWQsIHN0YXJ0IHJlbmRlcmluZ1xuICAgICAgaWYgKGdldEFic0luZGV4KGluZGV4KSAhPT0gZ2V0QWJzSW5kZXgoaW5kZXhDYWNoZWQpKSB7XG4gICAgICAgIHJlbmRlcihlKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIC8vIG9uIGNvbnRyb2xzIGNsaWNrXG4gIGZ1bmN0aW9uIG9uQ29udHJvbHNDbGljayAoZSwgZGlyKSB7XG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIGlmIChwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcpIHsgcmV0dXJuOyB9IGVsc2UgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuICAgIH1cbiAgICB2YXIgcGFzc0V2ZW50T2JqZWN0O1xuXG4gICAgaWYgKCFkaXIpIHtcbiAgICAgIGUgPSBnZXRFdmVudChlKTtcbiAgICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoZSk7XG5cbiAgICAgIHdoaWxlICh0YXJnZXQgIT09IGNvbnRyb2xzQ29udGFpbmVyICYmIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXS5pbmRleE9mKHRhcmdldCkgPCAwKSB7IHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlOyB9XG5cbiAgICAgIHZhciB0YXJnZXRJbiA9IFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXS5pbmRleE9mKHRhcmdldCk7XG4gICAgICBpZiAodGFyZ2V0SW4gPj0gMCkge1xuICAgICAgICBwYXNzRXZlbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBkaXIgPSB0YXJnZXRJbiA9PT0gMCA/IC0xIDogMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmV3aW5kKSB7XG4gICAgICBpZiAoaW5kZXggPT09IGluZGV4TWluICYmIGRpciA9PT0gLTEpIHtcbiAgICAgICAgZ29UbygnbGFzdCcsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBpbmRleE1heCAmJiBkaXIgPT09IDEpIHtcbiAgICAgICAgZ29UbygnZmlyc3QnLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXIpIHtcbiAgICAgIGluZGV4ICs9IHNsaWRlQnkgKiBkaXI7XG4gICAgICBpZiAoYXV0b1dpZHRoKSB7IGluZGV4ID0gTWF0aC5mbG9vcihpbmRleCk7IH1cbiAgICAgIC8vIHBhc3MgZSB3aGVuIGNsaWNrIGNvbnRyb2wgYnV0dG9ucyBvciBrZXlkb3duXG4gICAgICByZW5kZXIoKHBhc3NFdmVudE9iamVjdCB8fCAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykpID8gZSA6IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG9uIG5hdiBjbGlja1xuICBmdW5jdGlvbiBvbk5hdkNsaWNrIChlKSB7XG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIGlmIChwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcpIHsgcmV0dXJuOyB9IGVsc2UgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuICAgIH1cblxuICAgIGUgPSBnZXRFdmVudChlKTtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGUpLCBuYXZJbmRleDtcblxuICAgIC8vIGZpbmQgdGhlIGNsaWNrZWQgbmF2IGl0ZW1cbiAgICB3aGlsZSAodGFyZ2V0ICE9PSBuYXZDb250YWluZXIgJiYgIWhhc0F0dHIodGFyZ2V0LCAnZGF0YS1uYXYnKSkgeyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTsgfVxuICAgIGlmIChoYXNBdHRyKHRhcmdldCwgJ2RhdGEtbmF2JykpIHtcbiAgICAgIHZhciBuYXZJbmRleCA9IG5hdkNsaWNrZWQgPSBOdW1iZXIoZ2V0QXR0cih0YXJnZXQsICdkYXRhLW5hdicpKSxcbiAgICAgICAgICB0YXJnZXRJbmRleEJhc2UgPSBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCA/IG5hdkluZGV4ICogc2xpZGVDb3VudCAvIHBhZ2VzIDogbmF2SW5kZXggKiBpdGVtcyxcbiAgICAgICAgICB0YXJnZXRJbmRleCA9IG5hdkFzVGh1bWJuYWlscyA/IG5hdkluZGV4IDogTWF0aC5taW4oTWF0aC5jZWlsKHRhcmdldEluZGV4QmFzZSksIHNsaWRlQ291bnQgLSAxKTtcbiAgICAgIGdvVG8odGFyZ2V0SW5kZXgsIGUpO1xuXG4gICAgICBpZiAobmF2Q3VycmVudEluZGV4ID09PSBuYXZJbmRleCkge1xuICAgICAgICBpZiAoYW5pbWF0aW5nKSB7IHN0b3BBdXRvcGxheSgpOyB9XG4gICAgICAgIG5hdkNsaWNrZWQgPSAtMTsgLy8gcmVzZXQgbmF2Q2xpY2tlZFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGF1dG9wbGF5IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBzZXRBdXRvcGxheVRpbWVyICgpIHtcbiAgICBhdXRvcGxheVRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgb25Db250cm9sc0NsaWNrKG51bGwsIGF1dG9wbGF5RGlyZWN0aW9uKTtcbiAgICB9LCBhdXRvcGxheVRpbWVvdXQpO1xuXG4gICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BBdXRvcGxheVRpbWVyICgpIHtcbiAgICBjbGVhckludGVydmFsKGF1dG9wbGF5VGltZXIpO1xuICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQXV0b3BsYXlCdXR0b24gKGFjdGlvbiwgdHh0KSB7XG4gICAgc2V0QXR0cnMoYXV0b3BsYXlCdXR0b24sIHsnZGF0YS1hY3Rpb24nOiBhY3Rpb259KTtcbiAgICBhdXRvcGxheUJ1dHRvbi5pbm5lckhUTUwgPSBhdXRvcGxheUh0bWxTdHJpbmdzWzBdICsgYWN0aW9uICsgYXV0b3BsYXlIdG1sU3RyaW5nc1sxXSArIHR4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0QXV0b3BsYXkgKCkge1xuICAgIHNldEF1dG9wbGF5VGltZXIoKTtcbiAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHsgdXBkYXRlQXV0b3BsYXlCdXR0b24oJ3N0b3AnLCBhdXRvcGxheVRleHRbMV0pOyB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wQXV0b3BsYXkgKCkge1xuICAgIHN0b3BBdXRvcGxheVRpbWVyKCk7XG4gICAgaWYgKGF1dG9wbGF5QnV0dG9uKSB7IHVwZGF0ZUF1dG9wbGF5QnV0dG9uKCdzdGFydCcsIGF1dG9wbGF5VGV4dFswXSk7IH1cbiAgfVxuXG4gIC8vIHByb2dyYW1haXRjYWxseSBwbGF5L3BhdXNlIHRoZSBzbGlkZXJcbiAgZnVuY3Rpb24gcGxheSAoKSB7XG4gICAgaWYgKGF1dG9wbGF5ICYmICFhbmltYXRpbmcpIHtcbiAgICAgIHN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgIGF1dG9wbGF5VXNlclBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwYXVzZSAoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgc3RvcEF1dG9wbGF5KCk7XG4gICAgICBhdXRvcGxheVVzZXJQYXVzZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUF1dG9wbGF5ICgpIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICBzdG9wQXV0b3BsYXkoKTtcbiAgICAgIGF1dG9wbGF5VXNlclBhdXNlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgIGF1dG9wbGF5VXNlclBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSAoKSB7XG4gICAgaWYgKGRvYy5oaWRkZW4pIHtcbiAgICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgICAgc3RvcEF1dG9wbGF5VGltZXIoKTtcbiAgICAgICAgYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCkge1xuICAgICAgc2V0QXV0b3BsYXlUaW1lcigpO1xuICAgICAgYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VvdmVyUGF1c2UgKCkge1xuICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgIHN0b3BBdXRvcGxheVRpbWVyKCk7XG4gICAgICBhdXRvcGxheUhvdmVyUGF1c2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZW91dFJlc3RhcnQgKCkge1xuICAgIGlmIChhdXRvcGxheUhvdmVyUGF1c2VkKSB7XG4gICAgICBzZXRBdXRvcGxheVRpbWVyKCk7XG4gICAgICBhdXRvcGxheUhvdmVyUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8ga2V5ZG93biBldmVudHMgb24gZG9jdW1lbnRcbiAgZnVuY3Rpb24gb25Eb2N1bWVudEtleWRvd24gKGUpIHtcbiAgICBlID0gZ2V0RXZlbnQoZSk7XG4gICAgdmFyIGtleUluZGV4ID0gW0tFWVMuTEVGVCwgS0VZUy5SSUdIVF0uaW5kZXhPZihlLmtleUNvZGUpO1xuXG4gICAgaWYgKGtleUluZGV4ID49IDApIHtcbiAgICAgIG9uQ29udHJvbHNDbGljayhlLCBrZXlJbmRleCA9PT0gMCA/IC0xIDogMSk7XG4gICAgfVxuICB9XG5cbiAgLy8gb24ga2V5IGNvbnRyb2xcbiAgZnVuY3Rpb24gb25Db250cm9sc0tleWRvd24gKGUpIHtcbiAgICBlID0gZ2V0RXZlbnQoZSk7XG4gICAgdmFyIGtleUluZGV4ID0gW0tFWVMuTEVGVCwgS0VZUy5SSUdIVF0uaW5kZXhPZihlLmtleUNvZGUpO1xuXG4gICAgaWYgKGtleUluZGV4ID49IDApIHtcbiAgICAgIGlmIChrZXlJbmRleCA9PT0gMCkge1xuICAgICAgICBpZiAoIXByZXZCdXR0b24uZGlzYWJsZWQpIHsgb25Db250cm9sc0NsaWNrKGUsIC0xKTsgfVxuICAgICAgfSBlbHNlIGlmICghbmV4dEJ1dHRvbi5kaXNhYmxlZCkge1xuICAgICAgICBvbkNvbnRyb2xzQ2xpY2soZSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IGZvY3VzXG4gIGZ1bmN0aW9uIHNldEZvY3VzIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICAvLyBvbiBrZXkgbmF2XG4gIGZ1bmN0aW9uIG9uTmF2S2V5ZG93biAoZSkge1xuICAgIGUgPSBnZXRFdmVudChlKTtcbiAgICB2YXIgY3VyRWxlbWVudCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgIGlmICghaGFzQXR0cihjdXJFbGVtZW50LCAnZGF0YS1uYXYnKSkgeyByZXR1cm47IH1cblxuICAgIC8vIHZhciBjb2RlID0gZS5rZXlDb2RlLFxuICAgIHZhciBrZXlJbmRleCA9IFtLRVlTLkxFRlQsIEtFWVMuUklHSFQsIEtFWVMuRU5URVIsIEtFWVMuU1BBQ0VdLmluZGV4T2YoZS5rZXlDb2RlKSxcbiAgICAgICAgbmF2SW5kZXggPSBOdW1iZXIoZ2V0QXR0cihjdXJFbGVtZW50LCAnZGF0YS1uYXYnKSk7XG5cbiAgICBpZiAoa2V5SW5kZXggPj0gMCkge1xuICAgICAgaWYgKGtleUluZGV4ID09PSAwKSB7XG4gICAgICAgIGlmIChuYXZJbmRleCA+IDApIHsgc2V0Rm9jdXMobmF2SXRlbXNbbmF2SW5kZXggLSAxXSk7IH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5SW5kZXggPT09IDEpIHtcbiAgICAgICAgaWYgKG5hdkluZGV4IDwgcGFnZXMgLSAxKSB7IHNldEZvY3VzKG5hdkl0ZW1zW25hdkluZGV4ICsgMV0pOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYXZDbGlja2VkID0gbmF2SW5kZXg7XG4gICAgICAgIGdvVG8obmF2SW5kZXgsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEV2ZW50IChlKSB7XG4gICAgZSA9IGUgfHwgd2luLmV2ZW50O1xuICAgIHJldHVybiBpc1RvdWNoRXZlbnQoZSkgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZTtcbiAgfVxuICBmdW5jdGlvbiBnZXRUYXJnZXQgKGUpIHtcbiAgICByZXR1cm4gZS50YXJnZXQgfHwgd2luLmV2ZW50LnNyY0VsZW1lbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1RvdWNoRXZlbnQgKGUpIHtcbiAgICByZXR1cm4gZS50eXBlLmluZGV4T2YoJ3RvdWNoJykgPj0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0QmVoYXZpb3IgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TW92ZURpcmVjdGlvbkV4cGVjdGVkICgpIHtcbiAgICByZXR1cm4gZ2V0VG91Y2hEaXJlY3Rpb24odG9EZWdyZWUobGFzdFBvc2l0aW9uLnkgLSBpbml0UG9zaXRpb24ueSwgbGFzdFBvc2l0aW9uLnggLSBpbml0UG9zaXRpb24ueCksIHN3aXBlQW5nbGUpID09PSBvcHRpb25zLmF4aXM7XG4gIH1cblxuICBmdW5jdGlvbiBvblBhblN0YXJ0IChlKSB7XG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIGlmIChwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcpIHsgcmV0dXJuOyB9IGVsc2UgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuICAgIH1cblxuICAgIGlmIChhdXRvcGxheSAmJiBhbmltYXRpbmcpIHsgc3RvcEF1dG9wbGF5VGltZXIoKTsgfVxuXG4gICAgcGFuU3RhcnQgPSB0cnVlO1xuICAgIGlmIChyYWZJbmRleCkge1xuICAgICAgY2FmKHJhZkluZGV4KTtcbiAgICAgIHJhZkluZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgJCA9IGdldEV2ZW50KGUpO1xuICAgIGV2ZW50cy5lbWl0KGlzVG91Y2hFdmVudChlKSA/ICd0b3VjaFN0YXJ0JyA6ICdkcmFnU3RhcnQnLCBpbmZvKGUpKTtcblxuICAgIGlmICghaXNUb3VjaEV2ZW50KGUpICYmIFsnaW1nJywgJ2EnXS5pbmRleE9mKGdldExvd2VyQ2FzZU5vZGVOYW1lKGdldFRhcmdldChlKSkpID49IDApIHtcbiAgICAgIHByZXZlbnREZWZhdWx0QmVoYXZpb3IoZSk7XG4gICAgfVxuXG4gICAgbGFzdFBvc2l0aW9uLnggPSBpbml0UG9zaXRpb24ueCA9ICQuY2xpZW50WDtcbiAgICBsYXN0UG9zaXRpb24ueSA9IGluaXRQb3NpdGlvbi55ID0gJC5jbGllbnRZO1xuICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgdHJhbnNsYXRlSW5pdCA9IHBhcnNlRmxvYXQoY29udGFpbmVyLnN0eWxlW3RyYW5zZm9ybUF0dHJdLnJlcGxhY2UodHJhbnNmb3JtUHJlZml4LCAnJykpO1xuICAgICAgcmVzZXREdXJhdGlvbihjb250YWluZXIsICcwcycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUGFuTW92ZSAoZSkge1xuICAgIGlmIChwYW5TdGFydCkge1xuICAgICAgdmFyICQgPSBnZXRFdmVudChlKTtcbiAgICAgIGxhc3RQb3NpdGlvbi54ID0gJC5jbGllbnRYO1xuICAgICAgbGFzdFBvc2l0aW9uLnkgPSAkLmNsaWVudFk7XG5cbiAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICBpZiAoIXJhZkluZGV4KSB7IHJhZkluZGV4ID0gcmFmKGZ1bmN0aW9uKCl7IHBhblVwZGF0ZShlKTsgfSk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPT09ICc/JykgeyBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPSBnZXRNb3ZlRGlyZWN0aW9uRXhwZWN0ZWQoKTsgfVxuICAgICAgICBpZiAobW92ZURpcmVjdGlvbkV4cGVjdGVkKSB7IHByZXZlbnRTY3JvbGwgPSB0cnVlOyB9XG4gICAgICB9XG5cbiAgICAgIGlmICgodHlwZW9mIGUuY2FuY2VsYWJsZSAhPT0gJ2Jvb2xlYW4nIHx8IGUuY2FuY2VsYWJsZSkgJiYgcHJldmVudFNjcm9sbCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFuVXBkYXRlIChlKSB7XG4gICAgaWYgKCFtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQpIHtcbiAgICAgIHBhblN0YXJ0ID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhZihyYWZJbmRleCk7XG4gICAgaWYgKHBhblN0YXJ0KSB7IHJhZkluZGV4ID0gcmFmKGZ1bmN0aW9uKCl7IHBhblVwZGF0ZShlKTsgfSk7IH1cblxuICAgIGlmIChtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPT09ICc/JykgeyBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPSBnZXRNb3ZlRGlyZWN0aW9uRXhwZWN0ZWQoKTsgfVxuICAgIGlmIChtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQpIHtcbiAgICAgIGlmICghcHJldmVudFNjcm9sbCAmJiBpc1RvdWNoRXZlbnQoZSkpIHsgcHJldmVudFNjcm9sbCA9IHRydWU7IH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGUudHlwZSkgeyBldmVudHMuZW1pdChpc1RvdWNoRXZlbnQoZSkgPyAndG91Y2hNb3ZlJyA6ICdkcmFnTW92ZScsIGluZm8oZSkpOyB9XG4gICAgICB9IGNhdGNoKGVycikge31cblxuICAgICAgdmFyIHggPSB0cmFuc2xhdGVJbml0LFxuICAgICAgICAgIGRpc3QgPSBnZXREaXN0KGxhc3RQb3NpdGlvbiwgaW5pdFBvc2l0aW9uKTtcbiAgICAgIGlmICghaG9yaXpvbnRhbCB8fCBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCkge1xuICAgICAgICB4ICs9IGRpc3Q7XG4gICAgICAgIHggKz0gJ3B4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwZXJjZW50YWdlWCA9IFRSQU5TRk9STSA/IGRpc3QgKiBpdGVtcyAqIDEwMCAvICgodmlld3BvcnQgKyBndXR0ZXIpICogc2xpZGVDb3VudE5ldyk6IGRpc3QgKiAxMDAgLyAodmlld3BvcnQgKyBndXR0ZXIpO1xuICAgICAgICB4ICs9IHBlcmNlbnRhZ2VYO1xuICAgICAgICB4ICs9ICclJztcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLnN0eWxlW3RyYW5zZm9ybUF0dHJdID0gdHJhbnNmb3JtUHJlZml4ICsgeCArIHRyYW5zZm9ybVBvc3RmaXg7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25QYW5FbmQgKGUpIHtcbiAgICBpZiAocGFuU3RhcnQpIHtcbiAgICAgIGlmIChyYWZJbmRleCkge1xuICAgICAgICBjYWYocmFmSW5kZXgpO1xuICAgICAgICByYWZJbmRleCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoY2Fyb3VzZWwpIHsgcmVzZXREdXJhdGlvbihjb250YWluZXIsICcnKTsgfVxuICAgICAgcGFuU3RhcnQgPSBmYWxzZTtcblxuICAgICAgdmFyICQgPSBnZXRFdmVudChlKTtcbiAgICAgIGxhc3RQb3NpdGlvbi54ID0gJC5jbGllbnRYO1xuICAgICAgbGFzdFBvc2l0aW9uLnkgPSAkLmNsaWVudFk7XG4gICAgICB2YXIgZGlzdCA9IGdldERpc3QobGFzdFBvc2l0aW9uLCBpbml0UG9zaXRpb24pO1xuXG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdCkpIHtcbiAgICAgICAgLy8gZHJhZyB2cyBjbGlja1xuICAgICAgICBpZiAoIWlzVG91Y2hFdmVudChlKSkge1xuICAgICAgICAgIC8vIHByZXZlbnQgXCJjbGlja1wiXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChlKTtcbiAgICAgICAgICBhZGRFdmVudHModGFyZ2V0LCB7J2NsaWNrJzogZnVuY3Rpb24gcHJldmVudENsaWNrIChlKSB7XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdEJlaGF2aW9yKGUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRzKHRhcmdldCwgeydjbGljayc6IHByZXZlbnRDbGlja30pO1xuICAgICAgICAgIH19KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgIHJhZkluZGV4ID0gcmFmKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCkge1xuICAgICAgICAgICAgICB2YXIgaW5kZXhNb3ZlZCA9IC0gZGlzdCAqIGl0ZW1zIC8gKHZpZXdwb3J0ICsgZ3V0dGVyKTtcbiAgICAgICAgICAgICAgaW5kZXhNb3ZlZCA9IGRpc3QgPiAwID8gTWF0aC5mbG9vcihpbmRleE1vdmVkKSA6IE1hdGguY2VpbChpbmRleE1vdmVkKTtcbiAgICAgICAgICAgICAgaW5kZXggKz0gaW5kZXhNb3ZlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBtb3ZlZCA9IC0gKHRyYW5zbGF0ZUluaXQgKyBkaXN0KTtcbiAgICAgICAgICAgICAgaWYgKG1vdmVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4TWluO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmVkID49IHNsaWRlUG9zaXRpb25zW3NsaWRlQ291bnROZXcgLSAxXSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXhNYXg7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgc2xpZGVDb3VudE5ldyAmJiBtb3ZlZCA+PSBzbGlkZVBvc2l0aW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgaWYgKG1vdmVkID4gc2xpZGVQb3NpdGlvbnNbaV0gJiYgZGlzdCA8IDApIHsgaW5kZXggKz0gMTsgfVxuICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW5kZXIoZSwgZGlzdCk7XG4gICAgICAgICAgICBldmVudHMuZW1pdChpc1RvdWNoRXZlbnQoZSkgPyAndG91Y2hFbmQnIDogJ2RyYWdFbmQnLCBpbmZvKGUpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobW92ZURpcmVjdGlvbkV4cGVjdGVkKSB7XG4gICAgICAgICAgICBvbkNvbnRyb2xzQ2xpY2soZSwgZGlzdCA+IDAgPyAtMSA6IDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2V0XG4gICAgaWYgKG9wdGlvbnMucHJldmVudFNjcm9sbE9uVG91Y2ggPT09ICdhdXRvJykgeyBwcmV2ZW50U2Nyb2xsID0gZmFsc2U7IH1cbiAgICBpZiAoc3dpcGVBbmdsZSkgeyBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPSAnPyc7IH1cbiAgICBpZiAoYXV0b3BsYXkgJiYgIWFuaW1hdGluZykgeyBzZXRBdXRvcGxheVRpbWVyKCk7IH1cbiAgfVxuXG4gIC8vID09PSBSRVNJWkUgRlVOQ1RJT05TID09PSAvL1xuICAvLyAoc2xpZGVQb3NpdGlvbnMsIGluZGV4LCBpdGVtcykgPT4gdmVydGljYWxfY29uZW50V3JhcHBlci5oZWlnaHRcbiAgZnVuY3Rpb24gdXBkYXRlQ29udGVudFdyYXBwZXJIZWlnaHQgKCkge1xuICAgIHZhciB3cCA9IG1pZGRsZVdyYXBwZXIgPyBtaWRkbGVXcmFwcGVyIDogaW5uZXJXcmFwcGVyO1xuICAgIHdwLnN0eWxlLmhlaWdodCA9IHNsaWRlUG9zaXRpb25zW2luZGV4ICsgaXRlbXNdIC0gc2xpZGVQb3NpdGlvbnNbaW5kZXhdICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZ2VzICgpIHtcbiAgICB2YXIgcm91Z2ggPSBmaXhlZFdpZHRoID8gKGZpeGVkV2lkdGggKyBndXR0ZXIpICogc2xpZGVDb3VudCAvIHZpZXdwb3J0IDogc2xpZGVDb3VudCAvIGl0ZW1zO1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLmNlaWwocm91Z2gpLCBzbGlkZUNvdW50KTtcbiAgfVxuXG4gIC8qXG4gICAqIDEuIHVwZGF0ZSB2aXNpYmxlIG5hdiBpdGVtcyBsaXN0XG4gICAqIDIuIGFkZCBcImhpZGRlblwiIGF0dHJpYnV0ZXMgdG8gcHJldmlvdXMgdmlzaWJsZSBuYXYgaXRlbXNcbiAgICogMy4gcmVtb3ZlIFwiaGlkZGVuXCIgYXR0cnVidXRlcyB0byBuZXcgdmlzaWJsZSBuYXYgaXRlbXNcbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZU5hdlZpc2liaWxpdHkgKCkge1xuICAgIGlmICghbmF2IHx8IG5hdkFzVGh1bWJuYWlscykgeyByZXR1cm47IH1cblxuICAgIGlmIChwYWdlcyAhPT0gcGFnZXNDYWNoZWQpIHtcbiAgICAgIHZhciBtaW4gPSBwYWdlc0NhY2hlZCxcbiAgICAgICAgICBtYXggPSBwYWdlcyxcbiAgICAgICAgICBmbiA9IHNob3dFbGVtZW50O1xuXG4gICAgICBpZiAocGFnZXNDYWNoZWQgPiBwYWdlcykge1xuICAgICAgICBtaW4gPSBwYWdlcztcbiAgICAgICAgbWF4ID0gcGFnZXNDYWNoZWQ7XG4gICAgICAgIGZuID0gaGlkZUVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChtaW4gPCBtYXgpIHtcbiAgICAgICAgZm4obmF2SXRlbXNbbWluXSk7XG4gICAgICAgIG1pbisrO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWNoZSBwYWdlc1xuICAgICAgcGFnZXNDYWNoZWQgPSBwYWdlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmZvIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgc2xpZGVJdGVtczogc2xpZGVJdGVtcyxcbiAgICAgIG5hdkNvbnRhaW5lcjogbmF2Q29udGFpbmVyLFxuICAgICAgbmF2SXRlbXM6IG5hdkl0ZW1zLFxuICAgICAgY29udHJvbHNDb250YWluZXI6IGNvbnRyb2xzQ29udGFpbmVyLFxuICAgICAgaGFzQ29udHJvbHM6IGhhc0NvbnRyb2xzLFxuICAgICAgcHJldkJ1dHRvbjogcHJldkJ1dHRvbixcbiAgICAgIG5leHRCdXR0b246IG5leHRCdXR0b24sXG4gICAgICBpdGVtczogaXRlbXMsXG4gICAgICBzbGlkZUJ5OiBzbGlkZUJ5LFxuICAgICAgY2xvbmVDb3VudDogY2xvbmVDb3VudCxcbiAgICAgIHNsaWRlQ291bnQ6IHNsaWRlQ291bnQsXG4gICAgICBzbGlkZUNvdW50TmV3OiBzbGlkZUNvdW50TmV3LFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgaW5kZXhDYWNoZWQ6IGluZGV4Q2FjaGVkLFxuICAgICAgZGlzcGxheUluZGV4OiBnZXRDdXJyZW50U2xpZGUoKSxcbiAgICAgIG5hdkN1cnJlbnRJbmRleDogbmF2Q3VycmVudEluZGV4LFxuICAgICAgbmF2Q3VycmVudEluZGV4Q2FjaGVkOiBuYXZDdXJyZW50SW5kZXhDYWNoZWQsXG4gICAgICBwYWdlczogcGFnZXMsXG4gICAgICBwYWdlc0NhY2hlZDogcGFnZXNDYWNoZWQsXG4gICAgICBzaGVldDogc2hlZXQsXG4gICAgICBpc09uOiBpc09uLFxuICAgICAgZXZlbnQ6IGUgfHwge30sXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJzIuOS4zJyxcbiAgICBnZXRJbmZvOiBpbmZvLFxuICAgIGV2ZW50czogZXZlbnRzLFxuICAgIGdvVG86IGdvVG8sXG4gICAgcGxheTogcGxheSxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgaXNPbjogaXNPbixcbiAgICB1cGRhdGVTbGlkZXJIZWlnaHQ6IHVwZGF0ZUlubmVyV3JhcHBlckhlaWdodCxcbiAgICByZWZyZXNoOiBpbml0U2xpZGVyVHJhbnNmb3JtLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG5zKGV4dGVuZChvcHRpb25zLCBvcHRpb25zRWxlbWVudHMpKTtcbiAgICB9XG4gIH07XG59O1xuIl0sIm5hbWVzIjpbIndpbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDakI7QUFDTyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMscUJBQXFCO0FBQzFDLEtBQUssR0FBRyxDQUFDLDJCQUEyQjtBQUNwQyxLQUFLLEdBQUcsQ0FBQyx3QkFBd0I7QUFDakMsS0FBSyxHQUFHLENBQUMsdUJBQXVCO0FBQ2hDLEtBQUssU0FBUyxFQUFFLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs7QUNOaEQsSUFBSUEsS0FBRyxHQUFHLE1BQU0sQ0FBQztBQUNqQjtBQUNPLElBQUksR0FBRyxHQUFHQSxLQUFHLENBQUMsb0JBQW9CO0FBQ3pDLEtBQUtBLEtBQUcsQ0FBQyx1QkFBdUI7QUFDaEMsS0FBSyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFOztBQ0ovQixTQUFTLE1BQU0sR0FBRztBQUN6QixFQUFFLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJO0FBQ3JCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDWCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ2hDO0FBQ0Es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
