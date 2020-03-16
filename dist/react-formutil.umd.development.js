(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global.ReactFormutil = {}, global.React, global.PropTypes));
}(this, (function (exports, React, PropTypes) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  var FormContext = React.createContext(function () {
    return {};
  });

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  });
  var reactIs_development_1 = reactIs_development.AsyncMode;
  var reactIs_development_2 = reactIs_development.ConcurrentMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Lazy;
  var reactIs_development_9 = reactIs_development.Memo;
  var reactIs_development_10 = reactIs_development.Portal;
  var reactIs_development_11 = reactIs_development.Profiler;
  var reactIs_development_12 = reactIs_development.StrictMode;
  var reactIs_development_13 = reactIs_development.Suspense;
  var reactIs_development_14 = reactIs_development.isAsyncMode;
  var reactIs_development_15 = reactIs_development.isConcurrentMode;
  var reactIs_development_16 = reactIs_development.isContextConsumer;
  var reactIs_development_17 = reactIs_development.isContextProvider;
  var reactIs_development_18 = reactIs_development.isElement;
  var reactIs_development_19 = reactIs_development.isForwardRef;
  var reactIs_development_20 = reactIs_development.isFragment;
  var reactIs_development_21 = reactIs_development.isLazy;
  var reactIs_development_22 = reactIs_development.isMemo;
  var reactIs_development_23 = reactIs_development.isPortal;
  var reactIs_development_24 = reactIs_development.isProfiler;
  var reactIs_development_25 = reactIs_development.isStrictMode;
  var reactIs_development_26 = reactIs_development.isSuspense;
  var reactIs_development_27 = reactIs_development.isValidElementType;
  var reactIs_development_28 = reactIs_development.typeOf;

  var _reactIs_16_13_0_reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });
  var _reactIs_16_13_0_reactIs_1 = _reactIs_16_13_0_reactIs.isValidElementType;

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning = function() {};

  {
    var printWarning = function printWarning(format, args) {
      var len = arguments.length;
      args = new Array(len > 1 ? len - 1 : 0);
      for (var key = 1; key < len; key++) {
        args[key - 1] = arguments[key];
      }
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
            '`warning(condition, format, ...args)` requires a warning ' +
            'message argument'
        );
      }
      if (!condition) {
        printWarning.apply(null, [format].concat(args));
      }
    };
  }

  var warning_1 = warning;

  var OBJECT_PROTO = Object.getPrototypeOf({});
  var PATH_REGEXP = /\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g;
  var Root = isUndefined(window) ? global : window;
  function isUndefined(arg) {
    return typeof arg === 'undefined';
  }
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  function isEmpty(arg) {
    return isUndefined(arg) || arg === null || arg + '' === '';
  }
  function isPromise(promise) {
    return !!promise && isFunction(promise.then);
  }
  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  function isPlainObj(obj) {
    if (!isObject(obj)) return false;
    if (null === Object.getPrototypeOf(obj)) return true;
    if (!isFunction(obj.constructor)) return false;
    return obj.constructor.prototype === OBJECT_PROTO;
  }
  function isComponent(obj) {
    return _reactIs_16_13_0_reactIs_1(obj) && typeof obj !== 'string';
  }
  function checkComponentPropType(props, propName, componentName) {
    if (props[propName] && !isComponent(props[propName])) {
      return new Error("Invalid prop 'component' supplied to '".concat(componentName, "': the prop is not a valid React component"));
    }
  } // quick clone deeply

  function deepClone(obj) {
    if (Array.isArray(obj)) {
      var newObj = [];

      for (var i = 0, j = obj.length; i < j; i++) {
        newObj[i] = deepClone(obj[i]);
      }

      return newObj;
    } else if (isPlainObj(obj)) {
      var _newObj = {};

      for (var _i in obj) {
        if (obj.hasOwnProperty(_i)) _newObj[_i] = deepClone(obj[_i]);
      }

      return _newObj;
    }

    return obj;
  }
  var runCallback = function runCallback(callback) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isFunction(callback)) {
      callback.apply(void 0, args);
    }

    return args[0];
  };
  function createHOC(withHOC) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (isComponent(args[0])) {
        return withHOC.apply(void 0, args);
      }

      return function (WrappedComponent) {
        return withHOC(WrappedComponent, args[0]);
      };
    };
  }
  var VALID_PROPS = ['minlength', 'maxlength', 'max', 'min', 'required', 'pattern', 'step'];
  function isValidProp(prop) {
    return VALID_PROPS.indexOf(prop.toLowerCase()) > -1;
  }
  /* eslint-disable */

  var executeWord = function executeWord(word) {
    try {
      var exec = new Function('origin', 'global', "return typeof ".concat(word, " === 'number' || (typeof ").concat(word, " !== 'undefined' && !(origin in global)) ? ").concat(word, " : origin"));
      return exec(word, Root);
    } catch (err) {
      return word;
    }
  };
  /**
   * @desc 解析表达式中赋值深路径对象
   *
   * @param {object} target 要赋值的对象
   * @param {string} path 赋值路径，eg：list[0].title
   * @param {any} [value] 要赋过去的值，如过不传，则返回解析路径后的值
   *
   * 使用示例：parsePath({}, 'list[0].authors[1].name', 'Lucy');
   */


  function parsePath() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var target = args[0],
        path = args[1],
        value = args[2];
    warning_1(typeof path === 'string', "The second parameter(".concat(JSON.stringify(path), ") of parsePath() must be a string."));
    var pathSymbols = (path.match(PATH_REGEXP) || []).map(function (s) {
      return s.replace(/\s/g, '');
    });
    var pathWords = path.split(PATH_REGEXP).map(function (s) {
      return s.trim();
    }).filter(function (item) {
      return item !== '';
    });
    var scope = target;

    try {
      if (args.length < 3) {
        for (var index = 0, len = pathWords.length; index < len; index++) {
          var word = executeWord(pathWords[index]);

          if (index + 1 === len) {
            return scope[word];
          }

          if (isUndefined(scope[word])) {
            break;
          }

          scope = scope[word];
        }
      } else {
        for (var _index = 0, length = pathWords.length; _index < length; _index++) {
          var _word = executeWord(pathWords[_index]);

          var nextWord = pathWords[_index + 1];
          var symbol = pathSymbols[_index];

          if (isUndefined(nextWord)) {
            scope[_word] = value;
            break;
          }

          switch (symbol) {
            case '].':
            case '.':
              scope = scope[_word] = isUndefined(scope[_word]) ? {} : _objectSpread2({}, scope[_word]);
              break;

            case '][':
            case '[':
              var nextVarWord = executeWord(nextWord);
              scope = scope[_word] = isUndefined(scope[_word]) ? typeof nextVarWord === 'number' && nextVarWord >= 0 ? [] : {} : Array.isArray(scope[_word]) ? _toConsumableArray(scope[_word]) : _objectSpread2({}, scope[_word]);
              break;

            default:
              scope[_word] = value;
              break;
          }
        }
      }
    } catch (error) {
      warning_1(false, "The name '%s' of Field seems is not a legal expression.", path);
    }

    if (args.length > 2) {
      return target;
    }
  }
  function pathExist(scope, path) {
    var pathWords = path.split(PATH_REGEXP).map(function (s) {
      return s.trim();
    }).filter(function (item) {
      return item !== '';
    });

    for (var index = 0, len = pathWords.length; index < len; index++) {
      var word = executeWord(pathWords[index]);

      if (!(word in scope)) {
        break;
      }

      if (index + 1 === len) {
        return {
          data: scope[word]
        };
      }

      scope = scope[word];
    }
  }
  function createRef(ref, value) {
    if (ref) {
      if (isFunction(ref)) {
        ref(value);
      } else if ('current' in ref) {
        ref.current = value;
      }
    }
  }
  var arrayFind = function arrayFind(array, process) {
    for (var i = 0, j = array.length; i < j; i++) {
      if (process(array[i]) === true) {
        return array[i];
      }
    }
  };
  var objectMap = function objectMap(obj, handler) {
    return Object.keys(obj).reduce(function (newObj, key) {
      newObj[key] = handler(obj[key], key, obj);
      return newObj;
    }, {});
  };
  var objectEach = function objectEach(obj, handler) {
    return Object.keys(obj).forEach(function (key) {
      return handler(obj[key], key, obj);
    });
  };
  var TODO_DELETE = undefined;
  function CLEAR(obj, pkey, pobj) {
    objectEach(obj, function (value, key) {
      if (value === TODO_DELETE) {
        delete obj[key];
      } else if (isPlainObj(value) || Array.isArray(value)) {
        CLEAR(value, key, obj);
      }
    });

    if (pobj && Object.keys(obj).every(function (key) {
      return obj[key] === TODO_DELETE;
    })) {
      pobj[pkey] = TODO_DELETE;
      CLEAR(pobj);
    }
  }
  var objectClear = function objectClear(obj, name) {
    if (!isUndefined(parsePath(obj, name))) {
      parsePath(obj, name, TODO_DELETE);
      CLEAR(obj);
    }
  };
  function isStateEqual(prev, next) {
    if (prev === next) {
      return true;
    }

    var keys = Object.keys(prev);

    if (keys.length !== Object.keys(next).length) {
      return false;
    }

    for (var i = 0; i < keys.length; i++) {
      if (prev[keys[i]] !== next[keys[i]]) {
        return false;
      }
    }

    return true;
  }

  var FORM_VALIDATE_RESULT = 'FORM_VALIDATE_RESULT';
  var requestFrame, cancelFrame;

  if (typeof requestAnimationFrame === 'function') {
    requestFrame = requestAnimationFrame;
    cancelFrame = cancelAnimationFrame;
  } else {
    requestFrame = setTimeout;
    cancelFrame = clearTimeout;
  }

  var Form = /*#__PURE__*/function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      var _this;

      _classCallCheck(this, Form);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
      _this.$$formPending = void 0;
      _this.$$formValidatePromise = void 0;
      _this.$$registers = {};
      _this.$$deepRegisters = {};

      _this.getFormContext = function () {
        return {
          $$registers: _this.$$registers,
          $$register: _this.$$register,
          $$unregister: _this.$$unregister,
          $$onChange: _this.$$onChange,
          $$getDefault: _this.$$getDefault,
          $formutil: _this.$formutil
        };
      };

      _this.$$regDuplications = {};
      _this.$$duplicateTimer = void 0;

      _this.$$checkDuplication = function () {
        var _assertThisInitialize = _assertThisInitialized(_this),
            $$regDuplications = _assertThisInitialize.$$regDuplications;

        var hasDup;
        objectEach($$regDuplications, function (_ref, name) {
          var _ref2 = _slicedToArray(_ref, 2),
              $curRegistered = _ref2[0],
              $handler = _ref2[1];

          warning_1($curRegistered.$$reserved, "The Field with a name '".concat(name, "' has been registered!"));
          $handler.$$reset($curRegistered.$getState());
          hasDup = delete $$regDuplications[name];
        });

        if (hasDup) {
          _this.$render();
        }
      };

      _this.$$register = function (name, $handler, prevName) {
        _this.$$unregister(prevName, $handler);

        if (name) {
          var $curRegistered = _this.$$getRegister(name);

          if ($curRegistered) {
            cancelFrame(_this.$$duplicateTimer);
            _this.$$regDuplications[name] = [$curRegistered, $handler];
            _this.$$duplicateTimer = requestFrame(_this.$$checkDuplication);
          } else {
            _this.$$fieldChangedQueue.push({
              name: name,
              $newValue: $handler.$getState().$value
            });

            objectClear(_this.$$defaultValues, name);
          }

          _this.$$registers[$handler.$name = name] = $handler; // this.$$formShouldUpdateAll = true;

          _this.$$formShouldUpdateFields[name] = true;

          _this.createDeepRegisters();

          _this.$render();
        }
      };

      _this.$$unregister = function (name, $handler, $$reserved) {
        if (name) {
          if (name in _this.$$regDuplications) {
            var _this$$$regDuplicatio = _slicedToArray(_this.$$regDuplications[name], 2),
                $curRegistered = _this$$$regDuplicatio[0],
                _$handler = _this$$$regDuplicatio[1];

            _this.$$fieldChangedQueue.push({
              name: name,
              $newValue: _$handler.$getState().$value,
              $prevValue: $curRegistered.$getState().$value
            });

            delete _this.$$regDuplications[name];
          } else if (_this.$$registers[name] === $handler) {
            if ($$reserved) {
              $handler.$$reserved = true;
            } else {
              delete _this.$$registers[name];

              _this.$$fieldChangedQueue.push({
                name: name,
                $prevValue: $handler.$getState().$value
              });

              objectClear(_this.$$defaultValues, name);
            }
          }

          _this.$$formShouldUpdateAll = true;

          _this.createDeepRegisters();

          _this.$render();
        }
      };

      _this.$$defaultInitialize = function () {
        var _this$props = _this.props,
            $defaultValues = _this$props.$defaultValues,
            $defaultStates = _this$props.$defaultStates;
        _this.$$defaultValues = _this.$$deepParseObject(deepClone(isFunction($defaultValues) ? $defaultValues(_this.props) || {} : $defaultValues));
        _this.$$defaultStates = _this.$$deepParseObject(deepClone(isFunction($defaultStates) ? $defaultStates(_this.props) || {} : $defaultStates));
      };

      _this.$$getDefault = function () {
        return {
          $$defaultStates: _this.$$defaultStates,
          $$defaultValues: _this.$$defaultValues
        };
      };

      _this.$$formShouldUpdateFields = {};
      _this.$$formShouldUpdateAll = false;
      _this.$$triggerChangeTimer = void 0;
      _this.$$fieldChangedQueue = [];

      _this.$$triggerFormChange = function () {
        if (_this.$$fieldChangedQueue.length) {
          var $$fieldChangedQueue = _toConsumableArray(_this.$$fieldChangedQueue);

          _this.$$fieldChangedQueue.length = 0;
          var $newValues = {};
          var $prevValues = {};
          var $$registers = _this.$$registers;
          var hasFormChanged = false;
          $$fieldChangedQueue.forEach(function (item) {
            if (!(item.name in $$registers)) {
              delete item.$newValue;
            }

            if (item.$newValue !== item.$prevValue) {
              if ('$newValue' in item && '$prevValue' in item) {
                var $handler = _this.$$getRegister(item.name);

                if ($handler) {
                  $handler.$$triggerChange(item);
                }
              }

              '$newValue' in item && parsePath($newValues, item.name, item.$newValue);
              '$prevValue' in item && parsePath($prevValues, item.name, item.$prevValue);
              hasFormChanged = true;
            }
          });

          if (hasFormChanged) {
            if (isFunction(_this.props.$validator)) {
              _this.$$formValidate();
            }

            if (isFunction(_this.props.$onFormChange)) {
              _this.props.$onFormChange(_this.$formutil, $newValues, $prevValues);
            }
          }
        }
      };

      _this.createDeepRegisters = function () {
        return _this.$$deepRegisters = _this.$$deepParseObject(_this.$$registers);
      };

      _this.$$getRegister = function (name) {
        if (name) {
          var field = _this.$$registers[name] || parsePath(_this.$$deepRegisters, name);

          if (field) {
            return field;
          }
        }
      };

      _this.$$formValidate = function () {
        return _this.$$formValidatePromise = new Promise(function (resolve) {
          var $validator = _this.props.$validator;
          var $breakAsyncHandler;
          var $shouldCancelPrevAsyncValidate;
          var prevCallback;
          var validation;
          var result = $validator(_this.$formutil.$params, _this.$formutil);

          var execCallback = function execCallback($formutil) {
            return resolve(runCallback(prevCallback, $formutil));
          };

          if (isPromise(result)) {
            if (!_this.$$formPending) {
              _this.$$formPending = true;

              _this.$render();
            }

            $shouldCancelPrevAsyncValidate = function $shouldCancelPrevAsyncValidate(setCallback) {
              return $breakAsyncHandler = setCallback(execCallback);
            };

            validation = result.then(function () {
              return void 0;
            }, function (reason) {
              return reason;
            }).then(function (reason) {
              if ($breakAsyncHandler) {
                return $breakAsyncHandler;
              }

              _this.$shouldCancelPrevAsyncValidate = null;
              _this.$$formPending = false;
              return _this.$$setFormErrors(reason, execCallback);
            });
          } else {
            if (_this.$$formPending) {
              _this.$$formPending = false;
            }

            validation = _this.$$setFormErrors(result, execCallback);
          }

          if (_this.$shouldCancelPrevAsyncValidate) {
            _this.$shouldCancelPrevAsyncValidate(function (callback) {
              prevCallback = callback;
              return validation;
            });
          }

          _this.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
        });
      };

      _this.$$setFormErrors = function (validResults, callback) {
        if (validResults && (validResults instanceof Error || typeof validResults !== 'object')) {
          warning_1(false, "The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");
          return _this.$render(callback);
        }

        return _this.$$setStates(validResults || {}, function (result, handler) {
          var _handler$$getState = handler.$getState(),
              _handler$$getState$$e = _handler$$getState.$error,
              $error = _handler$$getState$$e === void 0 ? {} : _handler$$getState$$e;

          if (result) {
            return {
              $error: _objectSpread2({}, $error, _defineProperty({}, FORM_VALIDATE_RESULT, result))
            };
          }

          if ($error[FORM_VALIDATE_RESULT]) {
            delete $error[FORM_VALIDATE_RESULT];
            return {
              $error: $error
            };
          }
        }, callback, true);
      };

      _this.$getField = function (name) {
        var field = _this.$$getRegister(name);

        warning_1(!name || field, "$getField('".concat(name, "') fail to find the matched Field. Maybe it has been unmounted."));
        warning_1(name, "You should pass a name of the mounted Field to $getField().");

        if (field) {
          return field.$new();
        }
      };

      _this.$$onChange = function (name, $state, callback) {
        return _this.$setStates(_defineProperty({}, name, $state), callback);
      };

      _this.$$setStates = function () {
        var $stateTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var processer = arguments.length > 1 ? arguments[1] : undefined;
        var callback = arguments.length > 2 ? arguments[2] : undefined;
        var force = arguments.length > 3 ? arguments[3] : undefined;

        var $parsedTree = _this.$$deepParseObject($stateTree);

        objectEach(_this.$$registers, function (handler, name) {
          var pathData = pathExist($parsedTree, name);

          if (force || pathData) {
            var $newState = processer(pathData && pathData.data, handler);

            if ($newState) {
              var $prevValue = _this.$formutil.$weakParams[name];

              var _handler$$$merge = handler.$$merge($newState),
                  $newValue = _handler$$$merge.$value;

              handler.$$detectChange($newState);

              if ('$value' in $newState || '$viewValue' in $newState) {
                var findItem = arrayFind(_this.$$fieldChangedQueue, function (item) {
                  return item.name === name;
                });

                if (findItem) {
                  if (!('$prevValue' in findItem)) {
                    findItem.$prevValue = findItem.$newValue;
                  }

                  findItem.$newValue = $newValue;
                } else {
                  _this.$$fieldChangedQueue.push({
                    name: name,
                    $newValue: $newValue,
                    $prevValue: $prevValue
                  });
                }
              }

              _this.$$formShouldUpdateFields[name] = true;
            }
          }
        });
        return _this.$render(callback);
      };

      _this.$render = function (callback) {
        return new Promise(function (resolve) {
          return _this.forceUpdate(function () {
            return resolve(runCallback(callback, _this.$formutil));
          });
        });
      };

      _this.$validates = function () {
        var callback;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (isFunction(args[args.length - 1])) {
          callback = args.pop();
        }

        if (args.length) {
          var flatter = function flatter(names) {
            names.forEach(function (name) {
              if (Array.isArray(name)) {
                flatter(name);
              } else {
                var handler = _this.$getField(name);

                if (handler) {
                  handler.$validate();
                }
              }
            });
          };

          flatter(args);
        } else {
          objectEach(_this.$$registers, function (handler) {
            return handler.$validate();
          });

          if (isFunction(_this.props.$validator)) {
            _this.$$formValidate();
          }
        }

        return _this.$onValidates(callback);
      };

      _this.$onValidates = function (callback) {
        var filedValidatePromises = Object.keys(_this.$$registers).map(function (name) {
          return _this.$$registers[name].$onValidate();
        });
        filedValidatePromises.push(_this.$$formValidatePromise);
        return Promise.all(filedValidatePromises).then(function () {
          return runCallback(callback, _this.$formutil);
        });
      };

      _this.$validate = function (name, callback) {
        var handler = _this.$getField(name);

        if (handler) {
          return handler.$validate(callback);
        }

        return runCallback(callback);
      };

      _this.$reset = function ($stateTree, callback) {
        _this.$$defaultInitialize();

        if (isFunction($stateTree)) {
          callback = $stateTree;
          $stateTree = {};
        }

        return _this.$$setStates($stateTree, function ($state, handler) {
          return handler.$$reset($state);
        }, callback, true);
      };

      _this.$setStates = function ($stateTree, callback) {
        return _this.$$setStates($stateTree, function ($state) {
          return $state;
        }, callback);
      };

      _this.$setValues = function ($valueTree, callback) {
        _this.$$deepParseObject(deepClone($valueTree), _this.$$defaultValues);

        CLEAR(_this.$$defaultValues);
        return _this.$$setStates($valueTree, function ($value) {
          return {
            $value: $value
          };
        }, callback);
      };

      _this.$setFocuses = function ($focusedTree, callback) {
        return _this.$$setStates($focusedTree, function ($focused) {
          return {
            $focused: $focused
          };
        }, callback);
      };

      _this.$setDirts = function ($dirtyTree, callback) {
        return _this.$$setStates($dirtyTree, function ($dirty) {
          return {
            $dirty: $dirty
          };
        }, callback);
      };

      _this.$setTouches = function ($touchedTree, callback) {
        return _this.$$setStates($touchedTree, function ($touched) {
          return {
            $touched: $touched
          };
        }, callback);
      };

      _this.$setPendings = function ($pendingTree, callback) {
        return _this.$$setStates($pendingTree, function ($pending) {
          return {
            $pending: $pending
          };
        }, callback);
      };

      _this.$setErrors = function ($errorTree, callback) {
        return _this.$$setStates($errorTree, function ($error) {
          return {
            $error: $error
          };
        }, callback);
      };

      _this.$batchState = function ($state, callback) {
        return _this.$setStates(objectMap(_this.$$registers, function () {
          return $state;
        }), callback);
      };

      _this.$batchDirty = function ($dirty, callback) {
        return _this.$batchState({
          $dirty: $dirty
        }, callback);
      };

      _this.$batchTouched = function ($touched, callback) {
        return _this.$batchState({
          $touched: $touched
        }, callback);
      };

      _this.$batchFocused = function ($focused, callback) {
        return _this.$batchState({
          $focused: $focused
        }, callback);
      };

      _this.$batchPending = function ($pending, callback) {
        return _this.$batchState({
          $pending: $pending
        }, callback);
      };

      _this.$batchError = function ($error, callback) {
        return _this.$batchState({
          $error: $error
        }, callback);
      };

      _this.$new = function () {
        return _this.$formutil;
      };

      _this.$$defaultInitialize();

      return _this;
    }

    _createClass(Form, [{
      key: "$$deepParseObject",
      value: function $$deepParseObject(mayWeakObj) {
        var deepObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        objectEach(mayWeakObj, function (data, name) {
          return parsePath(deepObj, name, data);
        });
        return deepObj;
      } // 本次Form更新时需要变动的fields

    }, {
      key: "$$resetFormUpdateFields",
      value: function $$resetFormUpdateFields() {
        this.$$formShouldUpdateFields = {};
        this.$$formShouldUpdateAll = false;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        createRef(this.props.$ref, this.$formutil);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        createRef(this.props.$ref, this.$formutil);
        cancelFrame(this.$$triggerChangeTimer); // ensure this calls to access the newest $formutil

        this.$$triggerChangeTimer = requestFrame(function () {
          _this2.$$triggerFormChange();
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        createRef(this.props.$ref, null);
      }
    }, {
      key: "_render",
      value: function _render() {
        var $formutil = this.$formutil;
        var _this$props2 = this.props,
            children = _this$props2.children,
            render = _this$props2.render,
            component = _this$props2.component;

        if (component) {
          return React.createElement(component, {
            $formutil: $formutil
          });
        }

        if (isFunction(render)) {
          return render($formutil);
        }

        if (isFunction(children)) {
          return children($formutil);
        }

        return React.Children.map(children, function (child) {
          return child && isComponent(child.type) ? React.cloneElement(child, {
            $formutil: $formutil
          }) : child;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var $processer = this.props.$processer;
        var $stateArray = Object.keys(this.$$registers).map(function (path) {
          return {
            path: path,
            $state: _this3.$$registers[path].$getState()
          };
        });
        var updateAll = this.$$formShouldUpdateAll;
        var lastFormutil = this.$formutil || {};
        var $invalid = $stateArray.some(function (_ref3) {
          var $state = _ref3.$state;
          return $state.$invalid;
        });
        var $dirty = $stateArray.some(function (_ref4) {
          var $state = _ref4.$state;
          return $state.$dirty;
        });
        var $touched = $stateArray.some(function (_ref5) {
          var $state = _ref5.$state;
          return $state.$touched;
        });
        var $focused = $stateArray.some(function (_ref6) {
          var $state = _ref6.$state;
          return $state.$focused;
        });
        var $pending = this.$$formPending || $stateArray.some(function (_ref7) {
          var $state = _ref7.$state;
          return $state.$pending;
        });
        var $pureParams = updateAll ? {} : _objectSpread2({}, lastFormutil.$pureParams);
        var $states = updateAll ? {} : _objectSpread2({}, lastFormutil.$states);
        var $errors = updateAll ? {} : _objectSpread2({}, lastFormutil.$errors);
        var $dirts = updateAll ? {} : _objectSpread2({}, lastFormutil.$dirts);
        var $touches = updateAll ? {} : _objectSpread2({}, lastFormutil.$touches);
        var $focuses = updateAll ? {} : _objectSpread2({}, lastFormutil.$focuses);
        var $pendings = updateAll ? {} : _objectSpread2({}, lastFormutil.$pendings);
        var $weakStates = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakStates);
        var $weakParams = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakParams);
        var $weakErrors = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakErrors);
        var $weakDirts = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakDirts);
        var $weakFocuses = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakFocuses);
        var $weakTouches = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakTouches);
        var $weakPendings = updateAll ? {} : _objectSpread2({}, lastFormutil.$weakPendings);

        for (var i = 0, j = $stateArray.length; i < j; i++) {
          var _$stateArray$i = $stateArray[i],
              $state = _$stateArray$i.$state,
              path = _$stateArray$i.path;

          if (!updateAll) {
            if (!this.$$formShouldUpdateFields[path]) {
              continue;
            }
          }

          if ($processer) {
            $processer($state, path);
          }

          if (path in $weakParams && $state.$pristine && isUndefined($state.$value)) {
            delete $weakParams[path];
            objectClear($pureParams, path);
          } else if ($weakParams[path] !== $state.$value) {
            // update $weakParams
            $weakParams[path] = $state.$value; // update $pureParams

            parsePath($pureParams, path, $state.$value);
          } // update $states


          parsePath($states, path, $state); // update $weakStates

          $weakStates[path] = $state;

          if ($weakErrors[path] !== $state.$error) {
            if ($state.$invalid) {
              // update $errors
              parsePath($errors, path, $state.$error); // update $weakErrors

              $weakErrors[path] = $state.$error;
            } else if (path in $weakErrors) {
              objectClear($errors, path);
              delete $weakErrors[path];
            }
          }

          if ($weakDirts[path] !== $state.$dirty) {
            // update $dirts
            parsePath($dirts, path, $state.$dirty); // update $weakDirts

            $weakDirts[path] = $state.$dirty;
          }

          if ($weakTouches[path] !== $state.$touched) {
            // update $touches
            parsePath($touches, path, $state.$touched); // update $weakTouches

            $weakTouches[path] = $state.$touched;
          }

          if ($weakFocuses[path] !== $state.$focused) {
            // update $focuses
            parsePath($focuses, path, $state.$focused); // update $weakFocuses

            $weakFocuses[path] = $state.$focused;
          }

          if ($weakPendings[path] !== $state.$pending) {
            // update $pendings
            parsePath($pendings, path, $state.$pending); // update $weakPendings

            $weakPendings[path] = $state.$pending;
          }
        }

        var $formutil = this.$formutil = {
          $$registers: _objectSpread2({}, this.$$registers),
          $$deepRegisters: this.$$deepRegisters,
          $states: $states,
          $pureParams: $pureParams,
          $params: _objectSpread2({}, this.$$defaultValues, {}, $pureParams),
          $errors: $errors,
          $dirts: $dirts,
          $touches: $touches,
          $focuses: $focuses,
          $pendings: $pendings,
          $weakStates: $weakStates,
          $weakParams: $weakParams,
          $weakErrors: $weakErrors,
          $weakDirts: $weakDirts,
          $weakTouches: $weakTouches,
          $weakFocuses: $weakFocuses,
          $weakPendings: $weakPendings,
          $getFirstError: function $getFirstError(name) {
            if (name) {
              var $fieldutil = $formutil.$getField(name);
              return $fieldutil && $fieldutil.$getFirstError();
            }

            for (var _name in $formutil.$weakErrors) {
              if ($formutil.$weakErrors.hasOwnProperty(_name)) {
                var $fieldError = $formutil.$weakErrors[_name];

                for (var key in $fieldError) {
                  if ($fieldError.hasOwnProperty(key)) {
                    return $fieldError[key] instanceof Error ? $fieldError[key].message : $fieldError[key];
                  }
                }
              }
            }
          },
          $render: this.$render,
          $getField: this.$getField,
          $onValidates: this.$onValidates,
          // get the newest $formutil
          $new: this.$new,
          $setStates: this.$setStates,
          $setValues: this.$setValues,
          $setErrors: this.$setErrors,
          $setTouches: this.$setTouches,
          $setDirts: this.$setDirts,
          $setFocuses: this.$setFocuses,
          $batchState: this.$batchState,
          $batchTouched: this.$batchTouched,
          $batchDirty: this.$batchDirty,
          $batchFocused: this.$batchFocused,
          $reset: this.$reset,
          $validates: this.$validates,
          $validate: this.$validate,
          $valid: !$invalid,
          $invalid: $invalid,
          $dirty: $dirty,
          $pristine: !$dirty,
          $touched: $touched,
          $untouched: !$touched,
          $focused: $focused,
          $pending: $pending
        };
        this.$$resetFormUpdateFields();
        return React__default.createElement(FormContext.Provider, {
          value: this.getFormContext
        }, this._render());
      }
    }]);

    return Form;
  }(React.Component);

  Form.displayName = 'React.Formutil.Form';
  Form.propTypes = {
    render: PropTypes.func,
    component: checkComponentPropType,
    children: function children(props) {
      var pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);

      if (!props.render && !props.component) {
        pt = pt.isRequired;
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return pt.apply(void 0, [props].concat(args));
    },
    $defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    $defaultStates: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    $onFormChange: PropTypes.func,
    $validator: PropTypes.func,
    $processer: PropTypes.func,
    $ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
      current: PropTypes.any
    })])
  };
  Form.defaultProps = {
    $defaultValues: {},
    $defaultStates: {}
  };

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[_reactIs_16_13_0_reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[_reactIs_16_13_0_reactIs.Memo] = MEMO_STATICS;

  function getStatics(component) {
    // React v16.11 and below
    if (_reactIs_16_13_0_reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);

        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }

      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  var filterProps = ['render', 'component', 'children', '$defaultValues', '$defaultStates', '$onFormChange', '$validator', '$processer', '$ref'];

  function withForm(WrappedComponent) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var WithForm = /*#__PURE__*/function (_Component) {
      _inherits(WithForm, _Component);

      function WithForm() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithForm);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _this.renderChildren = function ($formutil) {
          return React__default.createElement(WrappedComponent, Object.assign({}, _this.othersProps, {
            $formutil: $formutil,
            ref: _this.props.__forwardRef__
          }));
        };

        return _this;
      }

      _createClass(WithForm, [{
        key: "render",
        value: function render() {
          var others = Object.assign({}, this.props); // component优先级最高，这里排除掉, 避免和render属性冲突

          var _this$props = this.props,
              component = _this$props.component,
              formProps = _objectWithoutProperties(_this$props, ["component"]);

          filterProps.forEach(function (prop) {
            if (prop in others) {
              if (prop === '$defaultStates' || prop === '$defaultValues') {
                formProps[prop] = _objectSpread2({}, config[prop], {}, others[prop]);
              }

              delete others[prop];
            }
          });
          this.othersProps = others;
          return React__default.createElement(Form, Object.assign({}, config, formProps, {
            render: this.renderChildren
          }));
        }
      }]);

      return WithForm;
    }(React.Component);

    WithForm.displayName = 'React.Formutil.withForm.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
    var ForwardRefForm = React.forwardRef(function (props, ref) {
      return React__default.createElement(WithForm, Object.assign({
        __forwardRef__: ref
      }, props));
    });
    ForwardRefForm.displayName = 'React.Formutil.withForm.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
    return hoistNonReactStatics_cjs(ForwardRefForm, WrappedComponent);
  }

  var withForm$1 = createHOC(withForm);

  var FIELD_UUID = 0;
  var $baseState = {
    $valid: true,
    $invalid: false,
    $dirty: false,
    $pristine: true,
    $touched: false,
    $untouched: true,
    $focused: false,
    $pending: false,
    $error: {}
  };

  function isError(result) {
    return (
      /*!utils.isUndefined(result) && */
      result !== true
    );
  }

  function warningValidatorReturn(result, key, name) {
    warning_1(!isUndefined(result), "You should return a string or Error when the validation('".concat(name && name + ': ').concat(key, "') failed, otherwise return true."));
  }

  var propTypes =  {
    name: PropTypes.string,
    $defaultValue: PropTypes.any,
    $defaultState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    $onFieldChange: PropTypes.func,
    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object,
    $validateLazy: PropTypes.bool,
    $memo: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    $reserveOnUnmount: PropTypes.bool,
    $ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
      current: PropTypes.any
    })]),
    $parser: PropTypes.func,
    $formatter: PropTypes.func,
    render: PropTypes.func,
    component: checkComponentPropType,
    children: function children(props) {
      var pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);

      if (!props.render && !props.component && props.children !== null) {
        pt = pt.isRequired;
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return pt.apply(void 0, [props].concat(args));
    }
  } ;
  var displayName = 'React.Formutil.Field';
  function GET_FIELD_UUID() {
    return FIELD_UUID++;
  }
  function renderField($fieldutil, props) {
    var children = props.children,
        render = props.render,
        component = props.component;

    if (component) {
      return React.createElement(component, {
        $fieldutil: $fieldutil
      });
    }

    if (isFunction(render)) {
      return render($fieldutil);
    }

    if (isFunction(children)) {
      return children($fieldutil);
    }

    return React.Children.map(children, function (child) {
      return child && isComponent(child.type) ? React.cloneElement(child, {
        $fieldutil: $fieldutil
      }) : child;
    });
  }
  function createHandler($this, owner) {
    var $fieldHandler = {
      $$FIELD_UUID: $this.$$FIELD_UUID,
      $$reset: $$reset,
      $$merge: $$merge,
      $$detectChange: $$detectChange,
      $$triggerChange: $$triggerChange,
      $onValidate: $onValidate,
      $new: function $new() {
        return $this.$fieldutil;
      },
      $picker: $getState,
      $getState: $getState,
      // not support in Hooks
      $getComponent: function $getComponent() {
        return owner;
      },
      $reset: function $reset($state, callback) {
        return $this.$setState($$reset($state), callback);
      },
      $getFirstError: $getFirstError,
      $validate: $validate,
      $setState: $this.$setState,
      $render: $render,
      $setValue: $setValue,
      $setTouched: $setTouched,
      $setDirty: $setDirty,
      $setFocused: $setFocused,
      $setValidity: $setValidity,
      $setError: $setError,
      $setPending: $setPending
    };
    var $$validatePromise;

    function $$detectChange($newState) {
      if ('$value' in $newState || '$viewValue' in $newState) {
        $validate();
      }
    }

    function $$triggerChange(_ref) {
      var $newValue = _ref.$newValue,
          $prevValue = _ref.$prevValue;
      var $onFieldChange = $this.props.$onFieldChange;

      if (isFunction($onFieldChange)) {
        $onFieldChange($newValue, $prevValue, $this.$formContext.$formutil);
      }
    }

    function $onValidate(callback) {
      $$validatePromise.then(callback);
      return $$validatePromise;
    }

    function $$reset($newState) {
      var $initialState;
      var props = $this.props,
          $formContext = $this.$formContext;

      if ($formContext.$$getDefault) {
        var $name = props.name;

        var _$formContext$$$getDe = $formContext.$$getDefault(),
            $$defaultStates = _$formContext$$$getDe.$$defaultStates,
            $$defaultValues = _$formContext$$$getDe.$$defaultValues;

        if ($name && $$defaultValues) {
          var $initialValue = parsePath($$defaultValues, $name);
          $initialState = parsePath($$defaultStates, $name) || {};

          if (!isUndefined($initialValue)) {
            $initialState.$value = $initialValue;
          }
        }
      }

      var $defaultValue = props.$defaultValue,
          $defaultState = props.$defaultState;
      return $$merge(_objectSpread2({}, $baseState, {}, isFunction($defaultState) ? $defaultState(props) : $defaultState, {
        // self default state
        $value: isFunction($defaultValue) ? $defaultValue(props) : '$defaultValue' in props ? $defaultValue : ''
      }, $initialState, {}, $newState));
    }

    function $getState() {
      return _objectSpread2({}, $this.$state);
    }

    function $validate(callback) {
      return $$validatePromise = new Promise(function (resolve) {
        var props = $this.props,
            $formContext = $this.$formContext;

        var $validators = _objectSpread2({}, props.$validators, {}, props.$asyncValidators);

        var _$this$$state = $this.$state,
            $value = _$this$$state.$value,
            $pending = _$this$$state.$pending,
            $newError = Object.assign({}, _$this$$state.$error);
        var $formutil = $formContext.$formutil;
        var $validError = {};
        var $skipRestValidate = false;
        var $breakAsyncHandler;
        var $shouldCancelPrevAsyncValidate;
        var prevCallback;
        var validation;
        delete $newError[FORM_VALIDATE_RESULT];
        var $validatePromises = Object.keys($validators).reduce(function (promises, key) {
          delete $newError[key];

          if (!$skipRestValidate && props[key] != null) {
            var result = $validators[key]($value, props[key], _objectSpread2({}, props, {
              $formutil: $formutil,
              $fieldutil: $this.$fieldutil,
              $validError: $validError
            }));

            if (isPromise(result)) {
              promises.push( // @ts-ignore
              result["catch"](function (reason) {
                if (!$breakAsyncHandler) {
                  $setValidity(key, reason || key);
                }
              }));
            } else if (isError(result)) {
              $validError[key] = result || key;
              warningValidatorReturn(result, key, props.name);

              if (props.$validateLazy) {
                $skipRestValidate = true;
              }
            }
          }

          return promises;
        }, []);

        var execCallback = function execCallback($fieldutil) {
          return resolve(runCallback(callback, runCallback(prevCallback, $fieldutil)));
        };

        if ($validatePromises.length) {
          if (!$pending) {
            $setPending(true);
          }

          $shouldCancelPrevAsyncValidate = function $shouldCancelPrevAsyncValidate(setCallback) {
            return $breakAsyncHandler = setCallback(execCallback);
          };

          $validatePromises.push($setError(_objectSpread2({}, $newError, {}, $validError)));
          validation = Promise.all($validatePromises).then(function () {
            if ($breakAsyncHandler) {
              return $breakAsyncHandler;
            }

            $this.$shouldCancelPrevAsyncValidate = null;
            return $setPending(false, execCallback);
          });
        } else {
          if ($pending) {
            $setPending(false);
          }

          validation = $setError(_objectSpread2({}, $newError, {}, $validError), execCallback);
        }

        if ($this.$shouldCancelPrevAsyncValidate) {
          $this.$shouldCancelPrevAsyncValidate(function (callback) {
            prevCallback = callback;
            return validation;
          });
        }

        $this.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
      });
    }

    function $render($viewValue, callback) {
      return $this.$setState({
        $viewValue: $viewValue,
        $dirty: true
      }, callback);
    }

    function $setValue($value, callback) {
      return $this.$setState({
        $value: $value
      }, callback);
    }

    function $setTouched($touched, callback) {
      return $this.$setState({
        $touched: $touched
      }, callback);
    }

    function $setDirty($dirty, callback) {
      return $this.$setState({
        $dirty: $dirty
      }, callback);
    }

    function $setFocused($focused, callback) {
      return $this.$setState({
        $focused: $focused
      }, callback);
    }

    function $setError($error, callback) {
      return $this.$setState({
        $error: $error
      }, callback);
    }

    function $setValidity(key) {
      var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var $newError = Object.assign({}, $this.$state.$error);

      if (isError(result)) {
        $newError[key] = result || key;
        warningValidatorReturn(result, key, $this.props.name);
      } else {
        delete $newError[key];
      }

      return $setError($newError, callback);
    }

    function $setPending($pending, callback) {
      return $this.$setState({
        $pending: $pending
      }, callback);
    }

    function $getFirstError() {
      var _$this$$state$$error = $this.$state.$error,
          $error = _$this$$state$$error === void 0 ? {} : _$this$$state$$error;

      for (var name in $error) {
        if ($error.hasOwnProperty(name)) {
          return $error[name] instanceof Error ? $error[name].message : $error[name];
        }
      }
    }

    function $$merge(_ref2) {
      var $newState = Object.assign({}, _ref2);

      if ('$error' in $newState) {
        if (!$newState.$error) {
          $newState.$error = {};
        }

        $newState.$valid = Object.keys($newState.$error).length === 0;
      } // process $value


      var _$this$props = $this.props,
          $parser = _$this$props.$parser,
          $formatter = _$this$props.$formatter;

      if ('$viewValue' in $newState && !('$value' in $newState)) {
        var $setViewValue = function $setViewValue($value) {
          return $newState.$viewValue = $value;
        };

        $newState.$value = $parser ? $parser($newState.$viewValue, $setViewValue) : $newState.$viewValue;
      } else if ('$value' in $newState && !('$viewValue' in $newState)) {
        var $setModelValue = function $setModelValue($value) {
          return $newState.$value = $value;
        };

        $newState.$viewValue = $formatter ? $formatter($newState.$value, $setModelValue) : $newState.$value;
      } // process $valid/$invalid


      if ('$valid' in $newState) {
        $newState.$invalid = !$newState.$valid;
      } else if ('$invalid' in $newState) {
        $newState.$dirty = !$newState.$invalid;
      } // process $dirty/$pristine


      if ('$dirty' in $newState) {
        $newState.$pristine = !$newState.$dirty;
      } else if ('$pristine' in $newState) {
        $newState.$dirty = !$newState.$pristine;
      } // process $touched/$untouched


      if ('$touched' in $newState) {
        $newState.$untouched = !$newState.$touched;
      } else if ('$untouched' in $newState) {
        $newState.$touched = !$newState.$untouched;
      }

      $this.$state = _objectSpread2({}, $this.$state, {}, $newState);
      return $getState();
    }

    return $fieldHandler;
  }

  /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

  var hasElementType = typeof Element !== 'undefined';
  var hasMap = typeof Map === 'function';
  var hasSet = typeof Set === 'function';
  var hasArrayBuffer = typeof ArrayBuffer === 'function';

  // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

  function equal(a, b) {
    // START: fast-deep-equal es6/index.js 3.1.1
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;

      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }

      // START: Modifications:
      // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
      //    to co-exist with es5.
      // 2. Replace `for of` with es5 compliant iteration using `for`.
      //    Basically, take:
      //
      //    ```js
      //    for (i of a.entries())
      //      if (!b.has(i[0])) return false;
      //    ```
      //
      //    ... and convert to:
      //
      //    ```js
      //    it = a.entries();
      //    while (!(i = it.next()).done)
      //      if (!b.has(i.value[0])) return false;
      //    ```
      //
      //    **Note**: `i` access switches to `i.value`.
      var it;
      if (hasMap && (a instanceof Map) && (b instanceof Map)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!equal(i.value[1], b.get(i.value[0]))) return false;
        return true;
      }

      if (hasSet && (a instanceof Set) && (b instanceof Set)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        return true;
      }
      // END: Modifications

      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (a[i] !== b[i]) return false;
        return true;
      }

      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      // END: fast-deep-equal

      // START: react-fast-compare
      // custom handling for DOM elements
      if (hasElementType && a instanceof Element) return false;

      // custom handling for React
      for (i = length; i-- !== 0;) {
        if (keys[i] === '_owner' && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner.
          //  _owner contains circular references
          // and is not needed when comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of a react element
          continue;
        }

        // all other properties should be traversed as usual
        if (!equal(a[keys[i]], b[keys[i]])) return false;
      }
      // END: react-fast-compare

      // START: fast-deep-equal
      return true;
    }

    return a !== a && b !== b;
  }
  // end fast-deep-equal

  var _reactFastCompare_3_0_1_reactFastCompare = function isEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if (((error.message || '').match(/stack|recursion/i))) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('react-fast-compare cannot handle circular refs');
        return false;
      }
      // some other error. we should definitely know about these
      throw error;
    }
  };

  var Field = /*#__PURE__*/function (_Component) {
    _inherits(Field, _Component);

    function Field() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Field);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Field)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.$$FIELD_UUID = GET_FIELD_UUID();
      _this.$formContext = void 0;
      _this.$state = void 0;

      _this.$setState = function ($newState, callback) {
        return new Promise(function (resolve) {
          var execute = function execute() {
            return resolve(runCallback(callback, _this.$fieldutil));
          };

          if (_this.isMounting) {
            var $name = _this.props.name;

            if ($name in (_this.$formContext.$$registers || {})) {
              _this.$formContext.$$onChange($name, $newState, execute);
            } else {
              _this.$registered.$$merge($newState);

              _this.$registered.$$detectChange($newState);

              _this.forceUpdate(execute);
            }
          } else {
            _this.$registered.$$merge($newState);

            execute();
          }
        });
      };

      return _this;
    }

    _createClass(Field, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.isMounting = true;
        var $name = this.props.name,
            $formContext = this.$formContext;
        warning_1(!$name || $formContext.$formutil, "You should enusre that the <Field /> with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
        warning_1($name, "You should assign a name to <Field />, otherwise it will be isolated!");

        if ($formContext.$$register) {
          $formContext.$$register($name, this.$fieldHandler);
        }

        this.$prevState = this.$state;
        createRef(this.props.$ref, this.$fieldutil);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.$formContext.$$unregister) {
          this.$formContext.$$unregister(this.props.name, this.$fieldHandler, this.props.$reserveOnUnmount);
        }

        this.isMounting = false;
        createRef(this.props.$ref, null);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var $name = this.props.name;

        if ($name !== prevProps.name) {
          if (this.$formContext.$$register) {
            this.$formContext.$$register($name, this.$fieldHandler, prevProps.name);
          }
        }

        createRef(this.props.$ref, this.$fieldutil);

        if (this.$state.$value !== this.$prevState.$value) {
          if (!($name in (this.$formContext.$$registers || {}))) {
            this.$registered.$$triggerChange({
              $newValue: this.$state.$value,
              $prevValue: this.$prevState.$value
            });
          }
        }

        this.$prevState = this.$state;
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        var $memo = nextProps.$memo;
        return !$memo ||
        /**
         * 这里不能用isEqual深度比较，避免遇到$value为大数据时导致性能问题
         * isStateEqual只比较一层
         */
        !isStateEqual(this.$registered.$getState(), this.$prevState) || !(Array.isArray($memo) ? _reactFastCompare_3_0_1_reactFastCompare($memo, this.props.$memo) : _reactFastCompare_3_0_1_reactFastCompare(this.props, nextProps));
      }
    }, {
      key: "_render",
      value: function _render() {
        var $fieldutil = this.$fieldutil = _objectSpread2({
          $name: this.props.name
        }, this.$registered.$getState(), {}, this.$registered, {
          $$formutil: this.$formContext.$formutil
        });

        return renderField($fieldutil, this.props);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React__default.createElement(FormContext.Consumer, null, function (getFormContext) {
          var shouldInitial = !_this2.$formContext;
          _this2.$formContext = getFormContext();

          if (!_this2.$fieldHandler) {
            _this2.$fieldHandler = createHandler(_this2, _this2);
          }

          _this2.$registered = (_this2.$formContext.$$registers || {})[_this2.$fieldHandler.$name] || _this2.$fieldHandler;

          if (shouldInitial) {
            _this2.$fieldHandler.$$reset();

            _this2.$fieldHandler.$validate();
          }

          return _this2._render();
        });
      }
    }]);

    return Field;
  }(React.Component);

  Field.displayName = displayName;
  Field.propTypes = propTypes;

  var filterProps$1 = ['name', '$defaultValue', '$defaultState', '$onFieldChange', '$validators', '$asyncValidators', '$validateLazy', '$memo', '$reserveOnUnmount', '$ref', '$parser', '$formatter', 'render', 'component', 'children'];

  function withField(WrappedComponent) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var WithField = /*#__PURE__*/function (_Component) {
      _inherits(WithField, _Component);

      function WithField() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithField);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithField)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _this.renderChildren = function ($fieldutil) {
          return React__default.createElement(WrappedComponent, Object.assign({}, _this.othersProps, {
            $fieldutil: $fieldutil,
            ref: _this.props.__forwardRef__
          }));
        };

        return _this;
      }

      _createClass(WithField, [{
        key: "render",
        value: function render() {
          var others = Object.assign({}, this.props); // component优先级最高，这里排除掉, 避免和render属性冲突

          var _this$props = this.props,
              component = _this$props.component,
              fieldProps = _objectWithoutProperties(_this$props, ["component"]);

          filterProps$1.concat(Object.keys(_objectSpread2({}, config.$validators, {}, config.$asyncValidators, {}, others.$validators, {}, others.$asyncValidators))).forEach(function (prop) {
            if (prop in others) {
              if (prop === '$validators' || prop === '$asyncValidators' || prop === '$defaultState') {
                fieldProps[prop] = _objectSpread2({}, config[prop], {}, others[prop]);
              }

              delete others[prop];
            }
          });
          this.othersProps = others;
          return React__default.createElement(Field, Object.assign({}, config, fieldProps, {
            render: this.renderChildren
          }));
        }
      }]);

      return WithField;
    }(React.Component);

    WithField.displayName = 'React.Formutil.withField.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
    var ForwardRefField = React.forwardRef(function (props, ref) {
      return React__default.createElement(WithField, Object.assign({
        __forwardRef__: ref
      }, props));
    });
    ForwardRefField.displayName = 'React.Formutil.withField.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
    return hoistNonReactStatics_cjs(ForwardRefField, WrappedComponent);
  }

  var withField$1 = createHOC(withField);

  var EasyFieldNative = /*#__PURE__*/function (_Component) {
    _inherits(EasyFieldNative, _Component);

    function EasyFieldNative() {
      _classCallCheck(this, EasyFieldNative);

      return _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldNative).apply(this, arguments));
    }

    _createClass(EasyFieldNative, [{
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            $fieldutil = _this$props.$fieldutil,
            htmlValue = _this$props.value,
            _onChange = _this$props.onChange,
            onFocus = _this$props.onFocus,
            onBlur = _this$props.onBlur,
            checked = _this$props.checked,
            unchecked = _this$props.unchecked,
            others = _objectWithoutProperties(_this$props, ["$fieldutil", "value", "onChange", "onFocus", "onBlur", "checked", "unchecked"]);

        var htmlType = this.props.type;
        var htmlProps = {
          value: 'compositionValue' in this ? this.compositionValue : htmlValue,
          onCompositionEnd: function onCompositionEnd(ev) {
            _this.composition = false;
            delete _this.compositionValue;
            htmlProps.onChange(ev);
          },
          onCompositionStart: function onCompositionStart() {
            return _this.composition = true;
          },
          onChange: function onChange(ev) {
            var value = ev.target.value;

            if (_this.composition) {
              _this.compositionValue = value;

              _this.forceUpdate();
            } else {
              _onChange(value, ev);
            }
          },
          onFocus: onFocus,
          onBlur: onBlur
        };
        var Element = 'input';

        switch (htmlType) {
          case 'select':
            Element = htmlType;

            htmlProps.onChange = function (ev) {
              var node = ev.target;
              var value = node.multiple ? [].slice.call(node.options).filter(function (option) {
                return option.selected;
              }).map(function (option) {
                return option.value;
              }) : node.value;

              _onChange(value, ev);
            };

            delete others.type;
            break;

          case 'textarea':
            Element = htmlType;
            delete others.type;
            break;

          case 'checkbox':
          case 'radio':
            htmlProps = {
              checked: htmlValue === checked,
              onChange: function onChange(ev) {
                _onChange(ev.target.checked ? checked : unchecked, ev);
              },
              onFocus: onFocus,
              onBlur: onBlur
            };
            break;
        }

        return React__default.createElement(Element, Object.assign({}, others, htmlProps));
      }
    }]);

    return EasyFieldNative;
  }(React.Component);

  EasyFieldNative.displayName = 'React.Formutil.EasyField.Native';
  EasyFieldNative.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.any,
    unchekced: PropTypes.any
  };
  EasyFieldNative.defaultProps = {
    value: '',
    type: 'text',
    checked: true,
    unchecked: false
  };

  /** @type {any} */

  var _createContext = React.createContext(function () {
    return {};
  }),
      Provider = _createContext.Provider,
      Consumer = _createContext.Consumer;

  var EasyFieldGroup = /*#__PURE__*/function (_Component) {
    _inherits(EasyFieldGroup, _Component);

    function EasyFieldGroup() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, EasyFieldGroup);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EasyFieldGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _this.getGroupContext = function () {
        return _this.props;
      };

      return _this;
    }

    _createClass(EasyFieldGroup, [{
      key: "_render",
      value: function _render() {
        var _this$props = this.props,
            className = _this$props.className,
            Element = _this$props.groupNode,
            children = _this$props.children;
        var GroupOptionProps = {
          GroupOption: EasyFieldGroupOption,
          Field: DeprecatedEasyFieldGroupOption
        };
        var childNodes = isFunction(children) ? children(GroupOptionProps) : React.Children.map(children, function (child) {
          return React.cloneElement(child, GroupOptionProps);
        });

        if (Element === null) {
          return childNodes;
        }

        return React__default.createElement(Element, {
          className: className
        }, childNodes);
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(Provider, {
          value: this.getGroupContext
        }, this._render());
      }
    }]);

    return EasyFieldGroup;
  }(React.Component);

  EasyFieldGroup.displayName = 'React.Formutil.EasyField.Group';
  EasyFieldGroup.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    groupNode: PropTypes.any,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
  };
  EasyFieldGroup.defaultProps = {
    type: 'checkbox',
    groupNode: 'div'
  };

  var EasyFieldGroupOption = /*#__PURE__*/function (_Component2) {
    _inherits(EasyFieldGroupOption, _Component2);

    function EasyFieldGroupOption() {
      _classCallCheck(this, EasyFieldGroupOption);

      return _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldGroupOption).apply(this, arguments));
    }

    _createClass(EasyFieldGroupOption, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        warning_1('$value' in this.props, "You should pass a $value to <GroupOption />.");
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            $value = _this$props2.$value,
            _onChange = _this$props2.onChange,
            _onFocus = _this$props2.onFocus,
            _onBlur = _this$props2.onBlur,
            others = _objectWithoutProperties(_this$props2, ["$value", "onChange", "onFocus", "onBlur"]);

        return React__default.createElement(Consumer, null, function (getGroupContext) {
          var $groupHandler = getGroupContext();
          var type = $groupHandler.type,
              name = $groupHandler.name;
          var elemProps = type === 'radio' ? {
            checked: $groupHandler.value === $value,
            onChange: function onChange(ev) {
              $groupHandler.onChange($value, ev);
              _onChange && _onChange(ev);
            }
          } : type === 'checkbox' ? {
            checked: $groupHandler.value.indexOf($value) > -1,
            onChange: function onChange(ev) {
              $groupHandler.onChange(ev.target.checked ? $groupHandler.value.concat($value) : $groupHandler.value.filter(function (value) {
                return value !== $value;
              }), ev);
              _onChange && _onChange(ev);
            }
          } : {
            value: $groupHandler.value,
            onChange: function onChange(ev) {
              $groupHandler.onChange(ev);
              _onChange && _onChange(ev);
            }
          };
          return React__default.createElement("input", Object.assign({
            name: name
          }, others, elemProps, {
            type: type,
            onFocus: function onFocus(ev) {
              $groupHandler.onFocus(ev);
              _onFocus && _onFocus(ev);
            },
            onBlur: function onBlur(ev) {
              $groupHandler.onBlur(ev);
              _onBlur && _onBlur(ev);
            }
          }));
        });
      }
    }]);

    return EasyFieldGroupOption;
  }(React.Component);

  EasyFieldGroupOption.displayName = 'React.Formutil.EasyField.Group.Option';
  EasyFieldGroupOption.propTypes = {
    $value: PropTypes.any.isRequired
  };

  var DeprecatedEasyFieldGroupOption = /*#__PURE__*/function (_Component3) {
    _inherits(DeprecatedEasyFieldGroupOption, _Component3);

    function DeprecatedEasyFieldGroupOption() {
      _classCallCheck(this, DeprecatedEasyFieldGroupOption);

      return _possibleConstructorReturn(this, _getPrototypeOf(DeprecatedEasyFieldGroupOption).apply(this, arguments));
    }

    _createClass(DeprecatedEasyFieldGroupOption, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        warning_1(false, "The \"Field\" property in EasyField's children-props has been deprecated. Please use \"GroupOption\" instead.");
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(EasyFieldGroupOption, this.props);
      }
    }]);

    return DeprecatedEasyFieldGroupOption;
  }(React.Component);

  DeprecatedEasyFieldGroupOption.displayName = 'React.Formutil.EasyField.Group.Option.Deprecated';

  var Wrapper = React__default.Frament || 'div';

  var EasyFieldList = /*#__PURE__*/function (_Component) {
    _inherits(EasyFieldList, _Component);

    function EasyFieldList(props) {
      var _this;

      _classCallCheck(this, EasyFieldList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldList).call(this, props));
      _this.id = 0;
      _this.latestValue = _this.props.value;
      _this.$formutil = void 0;
      _this.FieldValidators = {
        required: function required(value) {
          return value !== null;
        }
      };

      _this.$onFormChange = function ($formutil) {
        $formutil.$onValidates(function ($formutil) {
          var $invalid = $formutil.$invalid,
              $params = $formutil.$params;

          if ($invalid) {
            if (_this.props.value.length) {
              _this.props.onChange(_this.latestValue = []);
            }
          } else if (!_reactFastCompare_3_0_1_reactFastCompare(_this.props.value, $params.list)) {
            _this.props.onChange(_this.latestValue = $params.list);
          }
        });
      };

      _this.swap = function (m, n, callback) {
        return _this.$setState(function (_ref) {
          var items = _ref.items;
          var _ref2 = [items[m], items[n]];
          items[n] = _ref2[0];
          items[m] = _ref2[1];
          return items;
        }, callback);
      };

      _this.insert = function () {
        var m, values, callback;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.forEach(function (arg) {
          if (isFunction(arg)) {
            callback = arg;
          } else if (typeof arg === 'number') {
            m = arg;
          } else if (typeof arg === 'object') {
            values = arg;
          }
        });
        return _this.$setState(function (_ref3) {
          var items = _ref3.items;

          if (isUndefined(m)) {
            items.push(_this.getId(values));
          } else {
            items.splice(m, 0, _this.getId(values));
          }

          return {
            items: items
          };
        }, callback);
      };

      _this.remove = function () {
        var m, callback;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args.forEach(function (arg) {
          if (isFunction(arg)) {
            callback = arg;
          } else if (typeof arg === 'number') {
            m = arg;
          }
        });
        return _this.$setState(function (_ref4) {
          var items = _ref4.items;

          if (isUndefined(m)) {
            items.pop();
          } else {
            items.splice(m, 1);
          }

          if (!items.length) {
            items = [_this.getId()];
          }

          return {
            items: items
          };
        }, callback);
      };

      _this.$setState = function (updater, callback) {
        return new Promise(function (resolve) {
          return _this.setState(updater, function () {
            return _this.$formutil.$onValidates(function ($formutil) {
              return resolve(runCallback(callback, $formutil));
            });
          });
        });
      };

      _this.state = {
        items: props.value.length ? props.value.map(function () {
          return _this.getId();
        }) : [_this.getId()],
        formKey: 0
      };
      return _this;
    }

    _createClass(EasyFieldList, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        if (this.props.value !== this.latestValue) {
          this.setState({
            items: this.props.value.length ? this.props.value.map(function () {
              return _this2.getId();
            }) : [this.getId()],
            formKey: this.state.formKey + 1
          });
          this.latestValue = this.props.value;
        }
      }
    }, {
      key: "getId",
      value: function getId(values) {
        return {
          id: this.id++,
          values: values
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _this$props = this.props,
            _children = _this$props.children,
            onFocus = _this$props.onFocus,
            onBlur = _this$props.onBlur,
            value = _this$props.value;
        var $self = this;

        if (!isFunction(_children)) {
          return null;
        }

        var $baseutil = {
          $insert: this.insert,
          $remove: this.remove,
          $swap: this.swap,
          $push: function $push(values, callback) {
            return _this3.insert(values, callback);
          },
          $pop: function $pop(callback) {
            return _this3.remove(callback);
          },
          $shift: function $shift(callback) {
            return _this3.remove(0, callback);
          },
          $unshift: function $unshift(values, callback) {
            return _this3.insert(0, values, callback);
          },
          onFocus: onFocus,
          onBlur: onBlur
        };
        return React__default.createElement(Form, {
          key: this.state.formKey,
          $defaultValues: {
            list: value
          },
          $onFormChange: this.$onFormChange,
          children: function children($formutil) {
            _this3.$formutil = $formutil;
            return React__default.createElement(Wrapper, null, _this3.state.items.map(function (_ref5, index) {
              var id = _ref5.id,
                  values = _ref5.values;
              return React__default.createElement(Field, {
                key: id,
                required: true,
                $defaultValue: values || null,
                $validators: _this3.FieldValidators,
                name: "list[".concat(index, "]"),
                children: function children($fieldutil) {
                  return React__default.createElement(Form, {
                    $defaultValues: $fieldutil.$value || {},
                    $onFormChange: function $onFormChange($formutil) {
                      return $formutil.$onValidates(function ($formutil) {
                        var $invalid = $formutil.$invalid,
                            $params = $formutil.$params;

                        if ($invalid) {
                          if ($fieldutil.$viewValue !== null) {
                            $fieldutil.$render(null);
                          }
                        } else if (!_reactFastCompare_3_0_1_reactFastCompare($fieldutil.$viewValue, $params)) {
                          $fieldutil.$render($params);
                        }
                      });
                    },
                    children: function children($innerFormutil) {
                      return _children(_objectSpread2({
                        get $length() {
                          return $self.state.items.length;
                        },

                        $index: index,
                        $isLast: function $isLast() {
                          return index === _this3.state.items.length - 1;
                        },
                        $isFirst: function $isFirst() {
                          return index === 0;
                        }
                      }, $baseutil, {}, $innerFormutil), $formutil);
                    }
                  });
                }
              });
            }));
          }
        });
      }
    }]);

    return EasyFieldList;
  }(React.Component);

  EasyFieldList.displayName = 'React.Formutil.EasyField.List';
  EasyFieldList.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.array,
    children: PropTypes.func.isRequired
  };

  var TYPE = '__TYPE__';
  var defaultValidators = [['required', function ($value, check, _ref) {
    var __TYPE__ = _ref.__TYPE__,
        _ref$checked = _ref.checked,
        checked = _ref$checked === void 0 ? true : _ref$checked;
    return __TYPE__ === 'checked' ? $value === checked : !isEmpty($value);
  }], ['maxLength', function ($value, len) {
    return isEmpty($value) || $value.length <= len;
  }], ['minLength', function ($value, len) {
    return isEmpty($value) || $value.length >= len;
  }], ['max', function ($value, limit) {
    return isEmpty($value) || $value * 1 <= limit;
  }], ['min', function ($value, limit) {
    return isEmpty($value) || $value * 1 >= limit;
  }], ['pattern', function ($value, regexp) {
    return isEmpty($value) || regexp.test($value);
  }], ['enum', function ($value, enumeration) {
    return isEmpty($value) || enumeration.indexOf($value) > -1;
  }], ['checker', function ($value, checker, props) {
    return checker($value, props);
  }]].reduce(function ($validators, item) {
    var _item = _slicedToArray(item, 2),
        validKey = _item[0],
        validate = _item[1];

    $validators[validKey] = function validator($value, propValue, _ref2) {
      var _ref2$validMessage = _ref2.validMessage,
          validMessage = _ref2$validMessage === void 0 ? {} : _ref2$validMessage;
      return validate.apply(void 0, arguments) || validMessage[validKey] || "Error input: ".concat(validKey);
    };

    return $validators;
  }, {});
  var propTypes$1 =  {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: checkComponentPropType,
    render: PropTypes.func,
    defaultValue: PropTypes.any,
    validMessage: PropTypes.object,
    valuePropName: PropTypes.string,
    changePropName: PropTypes.string,
    focusPropName: PropTypes.string,
    blurPropName: PropTypes.string,
    getValueFromEvent: PropTypes.func,
    passUtil: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  } ;
  var displayName$1 = 'React.Formutil.EasyField';
  var defaultProps = {
    validMessage: {},
    valuePropName: 'value',
    changePropName: 'onChange',
    focusPropName: 'onFocus',
    blurPropName: 'onBlur',
    $parser: function $parser(value) {
      return typeof value === 'string' ? value.trim() : value;
    }
  };
  function createHandler$1($fieldutil, fieldProps, childProps) {
    var _objectSpread2$1;

    var valuePropName = fieldProps.valuePropName,
        changePropName = fieldProps.changePropName,
        focusPropName = fieldProps.focusPropName,
        blurPropName = fieldProps.blurPropName,
        getValueFromEvent = fieldProps.getValueFromEvent,
        passUtil = fieldProps.passUtil;

    var fetchValueFromEvent = function fetchValueFromEvent(ev) {
      return ev && ev.target ? ev.target[valuePropName] : ev;
    };

    var $handleProps = _objectSpread2({}, childProps, (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, valuePropName, $fieldutil.$viewValue), _defineProperty(_objectSpread2$1, changePropName, function (value) {
      var _events$;

      for (var _len = arguments.length, events = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        events[_key - 1] = arguments[_key];
      }

      if (((_events$ = events[0]) === null || _events$ === void 0 ? void 0 : _events$.nativeEvent) instanceof Event) {
        events.push(value);
      } else {
        events.unshift(value);
      }

      var onChange = fieldProps[changePropName];
      onChange && onChange.apply(void 0, events);
      var newValue = getValueFromEvent ? getValueFromEvent.apply(void 0, events) : fetchValueFromEvent(value);
      $fieldutil.$render(newValue);
    }), _defineProperty(_objectSpread2$1, focusPropName, function () {
      var onFocus = fieldProps[focusPropName];
      onFocus && onFocus.apply(void 0, arguments);
      $fieldutil.$setFocused(true);
    }), _defineProperty(_objectSpread2$1, blurPropName, function () {
      var onBlur = fieldProps[blurPropName];
      onBlur && onBlur.apply(void 0, arguments);

      if ($fieldutil.$untouched) {
        $fieldutil.$setTouched(true);
      }

      $fieldutil.$setFocused(false);
    }), _objectSpread2$1));

    if (passUtil) {
      $handleProps[passUtil === true ? '$fieldutil' : String(passUtil)] = $fieldutil;
    }

    return $handleProps;
  }
  function parseProps(props) {
    var children = props.children,
        component = props.component,
        render = props.render,
        fieldProps = _objectWithoutProperties(props, ["children", "component", "render"]);

    var name = fieldProps.name,
        type = fieldProps.type,
        defaultValue = fieldProps.defaultValue,
        valuePropName = fieldProps.valuePropName,
        changePropName = fieldProps.changePropName,
        focusPropName = fieldProps.focusPropName,
        blurPropName = fieldProps.blurPropName,
        getValueFromEvent = fieldProps.getValueFromEvent,
        validMessage = fieldProps.validMessage,
        checked = fieldProps.checked,
        unchecked = fieldProps.unchecked,
        __TYPE__ = fieldProps.__TYPE__,
        __DIFF__ = fieldProps.__DIFF__,
        passUtil = fieldProps.passUtil,
        $defaultValue = fieldProps.$defaultValue,
        $defaultState = fieldProps.$defaultState,
        $onFieldChange = fieldProps.$onFieldChange,
        $validators = fieldProps.$validators,
        $asyncValidators = fieldProps.$asyncValidators,
        $validateLazy = fieldProps.$validateLazy,
        $memo = fieldProps.$memo,
        $reserveOnUnmount = fieldProps.$reserveOnUnmount,
        $parser = fieldProps.$parser,
        $formatter = fieldProps.$formatter,
        $ref = fieldProps.$ref,
        childProps = _objectWithoutProperties(fieldProps, ["name", "type", "defaultValue", "valuePropName", "changePropName", "focusPropName", "blurPropName", "getValueFromEvent", "validMessage", "checked", "unchecked", "__TYPE__", "__DIFF__", "passUtil", "$defaultValue", "$defaultState", "$onFieldChange", "$validators", "$asyncValidators", "$validateLazy", "$memo", "$reserveOnUnmount", "$parser", "$formatter", "$ref"]);

    var renderProps = {
      children: children,
      component: component,
      render: render
    };

    if ($memo === true && isUndefined(__DIFF__)) {
      fieldProps.__DIFF__ = [children, component, render];
    }

    var isNative = !isUndefined(type) || isUndefined(children) && isUndefined(component) && isUndefined(render);
    Object.keys(_objectSpread2({}, fieldProps.$validators = _objectSpread2({}, defaultValidators, {}, fieldProps.$validators), {}, fieldProps.$asyncValidators)).forEach(function (prop) {
      if (prop in childProps) {
        if (!isNative || !isValidProp(prop)) {
          delete childProps[prop];
        }
      }
    });

    if (isNative) {
      var _split = (type || '').split('.'),
          _split2 = _slicedToArray(_split, 2),
          _split2$ = _split2[0],
          htmlType = _split2$ === void 0 ? 'text' : _split2$,
          groupType = _split2[1];

      renderProps.component = htmlType === 'group' ? EasyFieldGroup : htmlType === 'list' ? EasyFieldList : EasyFieldNative; // Native or Group need to pass 'name' | 'type' | 'children'

      if (name) {
        childProps.name = name;
      }

      if (type) {
        childProps.type = htmlType;
      }

      if (children) {
        childProps.children = children;
      }

      childProps.checked = checked;
      childProps.unchecked = unchecked;

      switch (htmlType) {
        case 'select':
        case 'textarea':
          if (props.multiple) {
            fieldProps[TYPE] = 'array';
          }

          break;

        case 'group':
          if (groupType === 'checkbox') {
            fieldProps[TYPE] = 'array';
          }

          childProps.type = groupType;
          break;

        case 'checkbox':
        case 'radio':
          fieldProps[TYPE] = 'checked';
          break;

        case 'list':
          fieldProps[TYPE] = 'array';
          break;
      }
    }

    if (!('$defaultValue' in fieldProps) && 'defaultValue' in props) {
      fieldProps.$defaultValue = defaultValue;
    }

    if (!('$defaultValue' in fieldProps) && TYPE in fieldProps) {
      var _defaultValue;

      switch (fieldProps[TYPE]) {
        case 'checked':
          var _fieldProps$unchecked = fieldProps.unchecked,
              _unchecked = _fieldProps$unchecked === void 0 ? false : _fieldProps$unchecked;

          _defaultValue = _unchecked;
          break;

        case 'array':
          _defaultValue = [];
          break;

        case 'object':
          _defaultValue = {};
          break;

        case 'number':
          _defaultValue = 0;
          break;
      }

      fieldProps.$defaultValue = _defaultValue;
    }

    return {
      fieldProps: fieldProps,
      childProps: childProps,
      renderProps: renderProps
    };
  }
  function renderField$1($handleProps, renderprops) {
    var component = renderprops.component,
        render = renderprops.render,
        children = renderprops.children;

    if (component) {
      return React.createElement(component, $handleProps);
    }

    if (isFunction(render)) {
      return render($handleProps);
    }

    if (isFunction(children)) {
      return children($handleProps);
    }

    return React.Children.map(children, function (child) {
      return React.cloneElement(child, $handleProps);
    });
  }

  /**
   * 提供对浏览器原生表单控件的封装
   * 支持以下类型表单元素：
   *  - input[type=xx]
   *  - textarea
   *  - select
   */

  var EasyField = /*#__PURE__*/function (_Component) {
    _inherits(EasyField, _Component);

    function EasyField() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, EasyField);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EasyField)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _this.renderChildren = function ($fieldutil) {
        var _this$parsedProps = _this.parsedProps,
            fieldProps = _this$parsedProps.fieldProps,
            childProps = _this$parsedProps.childProps,
            renderProps = _this$parsedProps.renderProps;
        return renderField$1(createHandler$1($fieldutil, fieldProps, childProps), renderProps);
      };

      _this.parsedProps = {};
      return _this;
    }

    _createClass(EasyField, [{
      key: "render",
      value: function render() {
        var _this$parsedProps2 = this.parsedProps = parseProps(this.props),
            fieldProps = _this$parsedProps2.fieldProps;

        return React__default.createElement(Field, Object.assign({}, fieldProps, {
          children: this.renderChildren
        }));
      }
    }]);

    return EasyField;
  }(React.Component);

  EasyField.displayName = displayName$1;
  EasyField.propTypes = propTypes$1;
  EasyField.defaultProps = defaultProps;

  function connect(WrappedComponent) {
    var Connect = React.forwardRef(function (props, ref) {
      return React__default.createElement(FormContext.Consumer, null, function (getFormContext) {
        return React__default.createElement(WrappedComponent, Object.assign({}, props, {
          $formutil: getFormContext().$formutil,
          ref: ref
        }));
      });
    });
    Connect.displayName = 'React.Formutil.connect.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
    return hoistNonReactStatics_cjs(Connect, WrappedComponent);
  }

  function useFormContext() {
    if (!React__default.useState) {
      throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");
    }

    var useContext = React__default.useContext;
    var getFormContext = useContext(FormContext);
    return getFormContext();
  }

  /**
   * @description
   * The custom hook for Field
   *
   * @param {string | object} [name]
   * @param {object} [props]
   *
   * @return {object} $Fieldutil
   */

  function useField(name) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!React__default.useState) {
      throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");
    }

    var useState = React__default.useState,
        useLayoutEffect = React__default.useLayoutEffect,
        useRef = React__default.useRef;
    var $name;

    if (name) {
      if (typeof name === 'string') {
        $name = name;
        props.name = $name;
      } else {
        props = name;
        $name = props.name;
      }
    }

    var $formContext = useFormContext();
    /** @type {any} */

    var $this = useRef({}).current;
    /** @type {React.MutableRefObject<any[]>} */

    var callbackRef = useRef([]);
    var $registered;
    $this.$formContext = $formContext;
    $this.props = props;
    $this.$setState = $setState; // we not directly use this $state, just from $this.$state

    var _useState = useState(function () {
      $this.$$FIELD_UUID = GET_FIELD_UUID();
      $this.$fieldHandler = $registered = createHandler($this);
      var $state = $this.$fieldHandler.$$reset();
      $this.$fieldHandler.$validate();
      return $state;
    }),
        _useState2 = _slicedToArray(_useState, 2),
        setState = _useState2[1];

    if (!$registered) {
      $registered = ($formContext.$$registers || {})[$this.$fieldHandler.$name] || $this.$fieldHandler;
    }

    useLayoutEffect(function () {
      var $state = $this.$state;

      if ($this.isMounting) {
        if (!($name in ($formContext.$$registers || {}))) {
          $registered.$$triggerChange({
            $newValue: $state.$value,
            $prevValue: $this.$prevState.$value
          });
        }
      }

      $this.$prevState = $state; // eslint-disable-next-line
    }, [$this.$state.$value]);
    useLayoutEffect(function () {
      $this.isMounting = true;
      warning_1(!$name || $formContext.$formutil, "You should enusre that the useField() with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
      warning_1($name, "You should pass a name argument to useField(), otherwise it will be isolated!");
      return function () {
        $this.isMounting = false;
        createRef(props.$ref, null);
      }; // eslint-disable-next-line
    }, []);
    useLayoutEffect(function () {
      if ($formContext.$$register) {
        $formContext.$$register($name, $this.$fieldHandler);
      }

      return function () {
        if ($formContext.$$unregister) {
          $formContext.$$unregister($name, $this.$fieldHandler, !$this.isMounting && props.$reserveOnUnmount);
        }
      }; // eslint-disable-next-line
    }, [$name]); // trigger ref callback

    useLayoutEffect(function () {
      createRef(props.$ref, $this.$fieldutil);
    });
    useLayoutEffect(function () {
      if (callbackRef.current.length > 0) {
        var callbackQueue = _toConsumableArray(callbackRef.current);

        callbackRef.current.length = 0;

        while (callbackQueue.length) {
          callbackQueue.pop()($this.$fieldutil);
        }
      }
    });

    function $setState($newState, callback) {
      return new Promise(function (resolve) {
        var execute = function execute() {
          return resolve(runCallback(callback, $this.$fieldutil));
        };

        if ($this.isMounting) {
          if ($name in ($formContext.$$registers || {})) {
            $formContext.$$onChange($name, $newState, execute);
          } else {
            setState($registered.$$merge($newState));
            $registered.$$detectChange($newState);
            callbackRef.current.push(execute);
          }
        } else {
          $registered.$$merge($newState);
          execute();
        }
      });
    }

    return $this.$fieldutil = _objectSpread2({
      $name: $name
    }, $registered.$getState(), {}, $registered, {
      $$formutil: $formContext.$formutil
    });
  }

  function useForm() {
    var _useFormContext = useFormContext(),
        $formutil = _useFormContext.$formutil;

    return $formutil;
  }

  function useHandler(props) {
    props = _objectSpread2({}, defaultProps, {}, props, {
      children: null
    });

    var _parseProps = parseProps(props),
        fieldProps = _parseProps.fieldProps,
        childProps = _parseProps.childProps;

    var $fieldutil = useField(fieldProps);
    return createHandler$1($fieldutil, fieldProps, childProps);
  }

  exports.EasyField = EasyField;
  exports.Field = Field;
  exports.Form = Form;
  exports.connect = connect;
  exports.formContext = FormContext;
  exports.useField = useField;
  exports.useForm = useForm;
  exports.useHandler = useHandler;
  exports.withField = withField$1;
  exports.withForm = withForm$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
