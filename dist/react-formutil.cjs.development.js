'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var warning = require('warning');
var reactDom = require('react-dom');
var reactIs = require('react-is');
var hoistStatics = require('hoist-non-react-statics');
var isEqual = require('react-fast-compare');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var warning__default = /*#__PURE__*/_interopDefaultLegacy(warning);
var reactIs__default = /*#__PURE__*/_interopDefaultLegacy(reactIs);
var hoistStatics__default = /*#__PURE__*/_interopDefaultLegacy(hoistStatics);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

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

var defineProperty = _defineProperty;

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
        defineProperty(target, key, source[key]);
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

var objectSpread2 = _objectSpread2;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

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

var createClass = _createClass;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var isNativeReflectConstruct = _isNativeReflectConstruct;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

function _createSuper(Derived) {
  var hasNativeReflectConstruct = isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return possibleConstructorReturn(this, result);
  };
}

var createSuper = _createSuper;

var FormContext = /*#__PURE__*/React.createContext(function () {
  return {};
});

var isValidElementType = reactIs__default['default'].isValidElementType;
var OBJECT_PROTO = Object.getPrototypeOf({});
var PATH_REGEXP = /\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g;
var Root = typeof window === 'undefined' ? global : window;
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
  return isValidElementType(obj) && typeof obj !== 'string';
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
  warning__default['default'](typeof path === 'string', "The second parameter(".concat(JSON.stringify(path), ") of parsePath() must be a string."));
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
            scope = scope[_word] = isUndefined(scope[_word]) ? {} : objectSpread2({}, scope[_word]);
            break;

          case '][':
          case '[':
            var nextVarWord = executeWord(nextWord);
            scope = scope[_word] = isUndefined(scope[_word]) ? typeof nextVarWord === 'number' && nextVarWord >= 0 ? [] : {} : Array.isArray(scope[_word]) ? toConsumableArray(scope[_word]) : objectSpread2({}, scope[_word]);
            break;

          default:
            scope[_word] = value;
            break;
        }
      }
    }
  } catch (error) {
    warning__default['default'](false, "The name '%s' of Field seems is not a legal expression.", path);
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
  inherits(Form, _Component);

  var _super = createSuper(Form);

  function Form(props) {
    var _this;

    classCallCheck(this, Form);

    _this = _super.call(this, props);
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
      var _assertThisInitialize = assertThisInitialized(_this),
          $$regDuplications = _assertThisInitialize.$$regDuplications;

      var hasDup;
      objectEach($$regDuplications, function (_ref, name) {
        var _ref2 = slicedToArray(_ref, 2),
            $curRegistered = _ref2[0],
            $handler = _ref2[1];

        warning__default['default']($curRegistered.$$reserved, "The Field with a name '".concat(name, "' has been registered!"));
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
          _this.$$duplicateTimer = requestFrame(function () {
            return reactDom.unstable_batchedUpdates(_this.$$checkDuplication);
          });
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
          var _this$$$regDuplicatio = slicedToArray(_this.$$regDuplications[name], 2),
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
    _this.$$fieldChangedQueue = [];

    _this.$$triggerFormChange = function () {
      if (_this.$$fieldChangedQueue.length) {
        var $$fieldChangedQueue = toConsumableArray(_this.$$fieldChangedQueue);

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
        warning__default['default'](false, "The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");
        return _this.$render(callback);
      }

      return _this.$$setStates(validResults || {}, function (result, handler) {
        var _handler$$getState = handler.$getState(),
            _handler$$getState$$e = _handler$$getState.$error,
            $error = _handler$$getState$$e === void 0 ? {} : _handler$$getState$$e;

        if (result) {
          return {
            $error: objectSpread2(objectSpread2({}, $error), {}, defineProperty({}, FORM_VALIDATE_RESULT, result))
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

      warning__default['default'](!name || field, "$getField('".concat(name, "') fail to find the matched Field. Maybe it has been unmounted."));
      warning__default['default'](name, "You should pass a name of the mounted Field to $getField().");

      if (field) {
        var _field$$new;

        return (_field$$new = field.$new) === null || _field$$new === void 0 ? void 0 : _field$$new.call(field);
      }
    };

    _this.$$onChange = function (name, $state, callback) {
      return _this.$setStates(defineProperty({}, name, $state), callback);
    };

    _this.$$setStates = function () {
      var $stateTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var processer = arguments.length > 1 ? arguments[1] : undefined;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var force = arguments.length > 3 ? arguments[3] : undefined;

      var $parsedTree = _this.$$deepParseObject($stateTree);

      var changed = [];
      objectEach(_this.$$registers, function (handler, name) {
        var pathData = pathExist($parsedTree, name);

        if (force || pathData) {
          var $curState = handler.$getState();
          var $newState = handler && processer(pathData && pathData.data, handler);

          if ($newState) {
            var _handler$$$merge = handler.$$merge($newState),
                $newValue = _handler$$$merge.$value;

            changed.push([handler, $newState]);

            if ('$value' in $newState || '$viewValue' in $newState) {
              var findItem = arrayFind(_this.$$fieldChangedQueue, function (item) {
                return item.name === name;
              });

              if (findItem) {
                findItem.$newValue = $newValue;
              } else {
                _this.$$fieldChangedQueue.push({
                  name: name,
                  $newValue: $newValue,
                  $prevValue: $curState.$value
                });
              }
            }

            _this.$$formShouldUpdateFields[name] = true;
          }
        }
      });
      return reactDom.unstable_batchedUpdates(function () {
        changed.forEach(function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
              handler = _ref4[0],
              $newState = _ref4[1];

          return handler.$$detectChange($newState);
        });
        return _this.$render(callback);
      });
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

    _this.$getFirstError = function (name) {
      var $formutil = _this.$formutil;

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
    };

    _this.$new = function () {
      return _this.$formutil;
    };

    _this.$$defaultInitialize();

    return _this;
  }

  createClass(Form, [{
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
      createRef(this.props.$ref, this.$formutil);
      this.$$triggerFormChange();
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
        return /*#__PURE__*/React.createElement(component, {
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
        return child && isComponent(child.type) ? /*#__PURE__*/React.cloneElement(child, {
          $formutil: $formutil
        }) : child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var $processer = this.props.$processer;
      var $stateArray = Object.keys(this.$$registers).map(function (path) {
        return {
          path: path,
          $state: _this2.$$registers[path].$getState()
        };
      });
      var updateAll = this.$$formShouldUpdateAll;
      var lastFormutil = this.$formutil || {};
      var $invalid = $stateArray.some(function (_ref5) {
        var $state = _ref5.$state;
        return $state.$invalid;
      });
      var $dirty = $stateArray.some(function (_ref6) {
        var $state = _ref6.$state;
        return $state.$dirty;
      });
      var $touched = $stateArray.some(function (_ref7) {
        var $state = _ref7.$state;
        return $state.$touched;
      });
      var $focused = $stateArray.some(function (_ref8) {
        var $state = _ref8.$state;
        return $state.$focused;
      });
      var $pending = this.$$formPending || $stateArray.some(function (_ref9) {
        var $state = _ref9.$state;
        return $state.$pending;
      });
      var $pureParams = updateAll ? {} : objectSpread2({}, lastFormutil.$pureParams);
      var $states = updateAll ? {} : objectSpread2({}, lastFormutil.$states);
      var $errors = updateAll ? {} : objectSpread2({}, lastFormutil.$errors);
      var $dirts = updateAll ? {} : objectSpread2({}, lastFormutil.$dirts);
      var $touches = updateAll ? {} : objectSpread2({}, lastFormutil.$touches);
      var $focuses = updateAll ? {} : objectSpread2({}, lastFormutil.$focuses);
      var $pendings = updateAll ? {} : objectSpread2({}, lastFormutil.$pendings);
      var $weakStates = updateAll ? {} : objectSpread2({}, lastFormutil.$weakStates);
      var $weakParams = updateAll ? {} : objectSpread2({}, lastFormutil.$weakParams);
      var $weakErrors = updateAll ? {} : objectSpread2({}, lastFormutil.$weakErrors);
      var $weakDirts = updateAll ? {} : objectSpread2({}, lastFormutil.$weakDirts);
      var $weakFocuses = updateAll ? {} : objectSpread2({}, lastFormutil.$weakFocuses);
      var $weakTouches = updateAll ? {} : objectSpread2({}, lastFormutil.$weakTouches);
      var $weakPendings = updateAll ? {} : objectSpread2({}, lastFormutil.$weakPendings);

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

      this.$formutil = {
        $$registers: objectSpread2({}, this.$$registers),
        $$deepRegisters: this.$$deepRegisters,
        $states: $states,
        $pureParams: $pureParams,
        $params: objectSpread2(objectSpread2({}, this.$$defaultValues), $pureParams),
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
        $getFirstError: this.$getFirstError,
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
        $setPendings: this.$setPendings,
        $batchState: this.$batchState,
        $batchTouched: this.$batchTouched,
        $batchDirty: this.$batchDirty,
        $batchFocused: this.$batchFocused,
        $batchPending: this.$batchPending,
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
      return /*#__PURE__*/React__default['default'].createElement(FormContext.Provider, {
        value: this.getFormContext
      }, this._render());
    }
  }]);

  return Form;
}(React.Component);

Form.displayName = 'React.Formutil.Form';
Form.propTypes = {
  render: PropTypes__default['default'].func,
  component: checkComponentPropType,
  children: function children(props) {
    var pt = PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].node]);

    if (!props.render && !props.component) {
      pt = pt.isRequired;
    }

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return pt.apply(void 0, [props].concat(args));
  },
  $defaultValues: PropTypes__default['default'].oneOfType([PropTypes__default['default'].object, PropTypes__default['default'].func]),
  $defaultStates: PropTypes__default['default'].oneOfType([PropTypes__default['default'].object, PropTypes__default['default'].func]),
  $onFormChange: PropTypes__default['default'].func,
  $validator: PropTypes__default['default'].func,
  $processer: PropTypes__default['default'].func,
  $ref: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].any
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

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
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

var objectWithoutProperties = _objectWithoutProperties;

var filterProps = ['render', 'component', 'children', '$defaultValues', '$defaultStates', '$onFormChange', '$validator', '$processer', '$ref'];

function withForm(WrappedComponent) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var WithForm = /*#__PURE__*/function (_Component) {
    inherits(WithForm, _Component);

    var _super = createSuper(WithForm);

    function WithForm() {
      var _this;

      classCallCheck(this, WithForm);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _this.renderChildren = function ($formutil) {
        return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, Object.assign({}, _this.othersProps, {
          $formutil: $formutil,
          ref: _this.props.__forwardRef__
        }));
      };

      return _this;
    }

    createClass(WithForm, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            __forwardRef__ = _this$props.__forwardRef__,
            others = objectWithoutProperties(_this$props, ["__forwardRef__"]); // component优先级最高，这里排除掉, 避免和render属性冲突


        var _this$props2 = this.props,
            component = _this$props2.component,
            formProps = objectWithoutProperties(_this$props2, ["component"]);

        filterProps.forEach(function (prop) {
          if (prop in others) {
            if (prop === '$defaultStates' || prop === '$defaultValues') {
              formProps[prop] = objectSpread2(objectSpread2({}, config[prop]), others[prop]);
            }

            delete others[prop];
          }
        });
        this.othersProps = others;
        return /*#__PURE__*/React__default['default'].createElement(Form, Object.assign({}, config, formProps, {
          render: this.renderChildren
        }));
      }
    }]);

    return WithForm;
  }(React.Component);

  WithForm.displayName = 'React.Formutil.withForm.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  var ForwardRefForm = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(WithForm, Object.assign({
      __forwardRef__: ref
    }, props));
  });
  ForwardRefForm.displayName = 'React.Formutil.withForm.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  return hoistStatics__default['default'](ForwardRefForm, WrappedComponent);
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
  warning__default['default'](!isUndefined(result), "You should return a string or Error when the validation('".concat(name && name + ': ').concat(key, "') failed, otherwise return true."));
}

var propTypes =  {
  name: PropTypes__default['default'].string,
  $defaultValue: PropTypes__default['default'].any,
  $defaultState: PropTypes__default['default'].oneOfType([PropTypes__default['default'].object, PropTypes__default['default'].func]),
  $onFieldChange: PropTypes__default['default'].func,
  $validators: PropTypes__default['default'].object,
  $asyncValidators: PropTypes__default['default'].object,
  $validateLazy: PropTypes__default['default'].bool,
  $memo: PropTypes__default['default'].oneOfType([PropTypes__default['default'].bool, PropTypes__default['default'].array]),
  $reserveOnUnmount: PropTypes__default['default'].bool,
  $ref: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].any
  })]),
  $parser: PropTypes__default['default'].func,
  $formatter: PropTypes__default['default'].func,
  render: PropTypes__default['default'].func,
  component: checkComponentPropType,
  children: function children(props) {
    var pt = PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].node]);

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
    return /*#__PURE__*/React.createElement(component, {
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
    return child && isComponent(child.type) ? /*#__PURE__*/React.cloneElement(child, {
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
    return $$merge(objectSpread2(objectSpread2(objectSpread2(objectSpread2({}, $baseState), isFunction($defaultState) ? $defaultState(props) : $defaultState), {}, {
      // self default state
      $value: isFunction($defaultValue) ? $defaultValue(props) : '$defaultValue' in props ? $defaultValue : ''
    }, $initialState), $newState));
  }

  function $getState() {
    return objectSpread2({}, $this.$state);
  }

  function $validate(callback) {
    return $$validatePromise = new Promise(function (resolve) {
      var props = $this.props,
          $formContext = $this.$formContext;

      var $validators = objectSpread2(objectSpread2({}, props.$validators), props.$asyncValidators);

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
          var result = $validators[key]($value, props[key], objectSpread2(objectSpread2({}, props), {}, {
            $formutil: $formutil,
            $fieldutil: $this.$fieldutil,
            $validError: $validError
          }));

          if (isPromise(result)) {
            promises.push( // @ts-ignore
            result.catch(function (reason) {
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

        $validatePromises.push($setError(objectSpread2(objectSpread2({}, $newError), $validError)));
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

        validation = $setError(objectSpread2(objectSpread2({}, $newError), $validError), execCallback);
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

    $this.$state = objectSpread2(objectSpread2({}, $this.$state), $newState);
    return $getState();
  }

  return $fieldHandler;
}

var Field = /*#__PURE__*/function (_Component) {
  inherits(Field, _Component);

  var _super = createSuper(Field);

  function Field() {
    var _this;

    classCallCheck(this, Field);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.$$FIELD_UUID = GET_FIELD_UUID();
    _this.$formContext = void 0;
    _this.$state = void 0;
    _this.shouldRendered = false;

    _this.$setState = function ($newState, callback) {
      return new Promise(function (resolve) {
        var execute = function execute() {
          return resolve(runCallback(callback, _this.$fieldutil));
        };

        if (_this.isMounting) {
          var $name = _this.props.name;

          if ($name in (_this.$formContext.$$registers || {})) {
            _this.shouldRendered = false;

            _this.$formContext.$$onChange($name, $newState, execute);
            /**
             * Ensure Field could rerender if <Field /> has been cached. In others words, it's vdomEq always true,
             * <Form /> render not trigger Field rerender
             */


            if (!_this.shouldRendered) {
              _this.forceUpdate();
            }
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

  createClass(Field, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounting = true;
      var $name = this.props.name,
          $formContext = this.$formContext;
      warning__default['default'](!$name || $formContext.$formutil, "You should enusre that the <Field /> with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
      warning__default['default']($name, "You should assign a name to <Field />, otherwise it will be isolated!");

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
      !isStateEqual(this.$registered.$getState(), this.$prevState) || !(Array.isArray($memo) ? isEqual__default['default']($memo, this.props.$memo) : isEqual__default['default'](this.props, nextProps));
    }
  }, {
    key: "_render",
    value: function _render() {
      var $fieldutil = this.$fieldutil = objectSpread2(objectSpread2(objectSpread2({
        $name: this.props.name
      }, this.$registered.$getState()), this.$registered), {}, {
        $$formutil: this.$formContext.$formutil
      });

      return renderField($fieldutil, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.shouldRendered = true;
      return /*#__PURE__*/React__default['default'].createElement(FormContext.Consumer, null, function (getFormContext) {
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
    inherits(WithField, _Component);

    var _super = createSuper(WithField);

    function WithField() {
      var _this;

      classCallCheck(this, WithField);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _this.renderChildren = function ($fieldutil) {
        return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, Object.assign({}, _this.othersProps, {
          $fieldutil: $fieldutil,
          ref: _this.props.__forwardRef__
        }));
      };

      return _this;
    }

    createClass(WithField, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            __forwardRef__ = _this$props.__forwardRef__,
            others = objectWithoutProperties(_this$props, ["__forwardRef__"]); // component优先级最高，这里排除掉, 避免和render属性冲突


        var _this$props2 = this.props,
            component = _this$props2.component,
            fieldProps = objectWithoutProperties(_this$props2, ["component"]);

        filterProps$1.concat(Object.keys(objectSpread2(objectSpread2(objectSpread2(objectSpread2({}, config.$validators), config.$asyncValidators), others.$validators), others.$asyncValidators))).forEach(function (prop) {
          if (prop in others) {
            if (prop === '$validators' || prop === '$asyncValidators' || prop === '$defaultState') {
              fieldProps[prop] = objectSpread2(objectSpread2({}, config[prop]), others[prop]);
            }

            delete others[prop];
          }
        });
        this.othersProps = others;
        return /*#__PURE__*/React__default['default'].createElement(Field, Object.assign({}, config, fieldProps, {
          render: this.renderChildren
        }));
      }
    }]);

    return WithField;
  }(React.Component);

  WithField.displayName = 'React.Formutil.withField.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  var ForwardRefField = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(WithField, Object.assign({
      __forwardRef__: ref
    }, props));
  });
  ForwardRefField.displayName = 'React.Formutil.withField.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  return hoistStatics__default['default'](ForwardRefField, WrappedComponent);
}

var withField$1 = createHOC(withField);

var EasyFieldNative = /*#__PURE__*/function (_Component) {
  inherits(EasyFieldNative, _Component);

  var _super = createSuper(EasyFieldNative);

  function EasyFieldNative() {
    classCallCheck(this, EasyFieldNative);

    return _super.apply(this, arguments);
  }

  createClass(EasyFieldNative, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          $fieldutil = _this$props.$fieldutil,
          htmlValue = _this$props.value,
          _onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          _onBlur = _this$props.onBlur,
          checked = _this$props.checked,
          unchecked = _this$props.unchecked,
          others = objectWithoutProperties(_this$props, ["$fieldutil", "value", "onChange", "onFocus", "onBlur", "checked", "unchecked"]);

      var htmlType = this.props.type;
      var htmlProps = {
        value: 'compositionValue' in this ? this.compositionValue : htmlValue,
        onCompositionEnd: function onCompositionEnd(ev) {
          _this.isComposing = false;
          delete _this.compositionValue;
          htmlProps.onChange(ev);
        },
        onCompositionStart: function onCompositionStart() {
          return _this.isComposing = true;
        },
        onChange: function onChange(ev) {
          var value = ev.target.value;

          if (_this.isComposing) {
            _this.compositionValue = value;

            _this.forceUpdate();
          } else {
            _onChange(value, ev);
          }
        },
        onFocus: onFocus,
        onBlur: function onBlur(ev) {
          if (_this.isComposing) {
            _this.isComposing = false;
            delete _this.compositionValue;
            htmlProps.onChange(ev);
          }

          return _onBlur(ev);
        }
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
            onBlur: _onBlur
          };
          break;
      }

      return /*#__PURE__*/React__default['default'].createElement(Element, Object.assign({}, others, htmlProps));
    }
  }]);

  return EasyFieldNative;
}(React.Component);

EasyFieldNative.displayName = 'React.Formutil.EasyField.Native';
EasyFieldNative.propTypes = {
  onChange: PropTypes__default['default'].func,
  onFocus: PropTypes__default['default'].func,
  onBlur: PropTypes__default['default'].func,
  value: PropTypes__default['default'].any,
  name: PropTypes__default['default'].string,
  type: PropTypes__default['default'].string,
  checked: PropTypes__default['default'].any,
  unchekced: PropTypes__default['default'].any
};
EasyFieldNative.defaultProps = {
  value: '',
  type: 'text',
  checked: true,
  unchecked: false
};

/** @type {any} */

var _createContext = /*#__PURE__*/React.createContext(function () {
  return {};
}),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var EasyFieldGroup = /*#__PURE__*/function (_Component) {
  inherits(EasyFieldGroup, _Component);

  var _super = createSuper(EasyFieldGroup);

  function EasyFieldGroup() {
    var _this;

    classCallCheck(this, EasyFieldGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.getGroupContext = function () {
      return _this.props;
    };

    return _this;
  }

  createClass(EasyFieldGroup, [{
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
        return /*#__PURE__*/React.cloneElement(child, GroupOptionProps);
      });

      if (Element === null) {
        return childNodes;
      }

      return /*#__PURE__*/React__default['default'].createElement(Element, {
        className: className
      }, childNodes);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement(Provider, {
        value: this.getGroupContext
      }, this._render());
    }
  }]);

  return EasyFieldGroup;
}(React.Component);

EasyFieldGroup.displayName = 'React.Formutil.EasyField.Group';
EasyFieldGroup.propTypes = {
  onChange: PropTypes__default['default'].func,
  onFocus: PropTypes__default['default'].func,
  onBlur: PropTypes__default['default'].func,
  value: PropTypes__default['default'].any,
  name: PropTypes__default['default'].string,
  type: PropTypes__default['default'].string.isRequired,
  groupNode: PropTypes__default['default'].any,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].element]).isRequired
};
EasyFieldGroup.defaultProps = {
  type: 'checkbox',
  groupNode: 'div'
};

var EasyFieldGroupOption = /*#__PURE__*/function (_Component2) {
  inherits(EasyFieldGroupOption, _Component2);

  var _super2 = createSuper(EasyFieldGroupOption);

  function EasyFieldGroupOption() {
    classCallCheck(this, EasyFieldGroupOption);

    return _super2.apply(this, arguments);
  }

  createClass(EasyFieldGroupOption, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      warning__default['default']('$value' in this.props, "You should pass a $value to <GroupOption />.");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          $value = _this$props2.$value,
          _onChange = _this$props2.onChange,
          _onFocus = _this$props2.onFocus,
          _onBlur = _this$props2.onBlur,
          others = objectWithoutProperties(_this$props2, ["$value", "onChange", "onFocus", "onBlur"]);

      return /*#__PURE__*/React__default['default'].createElement(Consumer, null, function (getGroupContext) {
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
        return /*#__PURE__*/React__default['default'].createElement("input", Object.assign({
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
  $value: PropTypes__default['default'].any.isRequired
};

var DeprecatedEasyFieldGroupOption = /*#__PURE__*/function (_Component3) {
  inherits(DeprecatedEasyFieldGroupOption, _Component3);

  var _super3 = createSuper(DeprecatedEasyFieldGroupOption);

  function DeprecatedEasyFieldGroupOption() {
    classCallCheck(this, DeprecatedEasyFieldGroupOption);

    return _super3.apply(this, arguments);
  }

  createClass(DeprecatedEasyFieldGroupOption, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      warning__default['default'](false, "The \"Field\" property in EasyField's children-props has been deprecated. Please use \"GroupOption\" instead.");
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement(EasyFieldGroupOption, this.props);
    }
  }]);

  return DeprecatedEasyFieldGroupOption;
}(React.Component);

DeprecatedEasyFieldGroupOption.displayName = 'React.Formutil.EasyField.Group.Option.Deprecated';

var Wrapper = React__default['default'].Frament || 'div';

var EasyFieldList = /*#__PURE__*/function (_Component) {
  inherits(EasyFieldList, _Component);

  var _super = createSuper(EasyFieldList);

  function EasyFieldList(props) {
    var _this;

    classCallCheck(this, EasyFieldList);

    _this = _super.call(this, props);
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
        } else if (!isEqual__default['default'](_this.props.value, $params.list)) {
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

  createClass(EasyFieldList, [{
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
      return /*#__PURE__*/React__default['default'].createElement(Form, {
        key: this.state.formKey,
        $defaultValues: {
          list: value
        },
        $onFormChange: this.$onFormChange,
        children: function children($formutil) {
          _this3.$formutil = $formutil;
          return /*#__PURE__*/React__default['default'].createElement(Wrapper, null, _this3.state.items.map(function (_ref5, index) {
            var id = _ref5.id,
                values = _ref5.values;
            return /*#__PURE__*/React__default['default'].createElement(Field, {
              key: id,
              required: true,
              $defaultValue: values || null,
              $validators: _this3.FieldValidators,
              name: "list[".concat(index, "]"),
              children: function children($fieldutil) {
                return /*#__PURE__*/React__default['default'].createElement(Form, {
                  $defaultValues: $fieldutil.$value || {},
                  $onFormChange: function $onFormChange($formutil) {
                    return $formutil.$onValidates(function ($formutil) {
                      var $invalid = $formutil.$invalid,
                          $params = $formutil.$params;

                      if ($invalid) {
                        if ($fieldutil.$viewValue !== null) {
                          $fieldutil.$render(null);
                        }
                      } else if (!isEqual__default['default']($fieldutil.$viewValue, $params)) {
                        $fieldutil.$render($params);
                      }
                    });
                  },
                  children: function children($innerFormutil) {
                    return _children(objectSpread2(objectSpread2({
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
                    }, $baseutil), $innerFormutil), $formutil);
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
  onChange: PropTypes__default['default'].func,
  onFocus: PropTypes__default['default'].func,
  onBlur: PropTypes__default['default'].func,
  value: PropTypes__default['default'].array,
  children: PropTypes__default['default'].func.isRequired
};

var TYPE = '__TYPE__';
var defaultValidators = [['required', function ($value, check, _ref) {
  var __TYPE__ = _ref.__TYPE__,
      _ref$checked = _ref.checked,
      checked = _ref$checked === void 0 ? true : _ref$checked;
  return check === false || (__TYPE__ === 'checked' ? $value === checked : !isEmpty($value));
}], ['maxLength', function ($value, len) {
  return isEmpty($value) || $value.length <= len * 1;
}], ['minLength', function ($value, len) {
  return isEmpty($value) || $value.length >= len * 1;
}], ['max', function ($value, limit) {
  return isEmpty($value) || $value * 1 <= limit * 1;
}], ['min', function ($value, limit) {
  return isEmpty($value) || $value * 1 >= limit * 1;
}], ['pattern', function ($value, regexp) {
  return isEmpty($value) || regexp.test($value);
}], ['enum', function ($value, enumeration) {
  return isEmpty($value) || enumeration.indexOf($value) > -1;
}], ['checker', function ($value, checker, props) {
  return checker($value, props);
}]].reduce(function ($validators, item) {
  var _item = slicedToArray(item, 2),
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
  type: PropTypes__default['default'].string,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].node]),
  component: checkComponentPropType,
  render: PropTypes__default['default'].func,
  defaultValue: PropTypes__default['default'].any,
  validMessage: PropTypes__default['default'].object,
  valuePropName: PropTypes__default['default'].string,
  changePropName: PropTypes__default['default'].string,
  focusPropName: PropTypes__default['default'].string,
  blurPropName: PropTypes__default['default'].string,
  getValueFromEvent: PropTypes__default['default'].func,
  passUtil: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].bool])
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
  var _objectSpread2;

  var valuePropName = fieldProps.valuePropName,
      changePropName = fieldProps.changePropName,
      focusPropName = fieldProps.focusPropName,
      blurPropName = fieldProps.blurPropName,
      getValueFromEvent = fieldProps.getValueFromEvent,
      passUtil = fieldProps.passUtil;

  var fetchValueFromEvent = function fetchValueFromEvent(ev) {
    return ev && ev.target ? ev.target[valuePropName] : ev;
  };

  var $handleProps = objectSpread2(objectSpread2({}, childProps), {}, (_objectSpread2 = {}, defineProperty(_objectSpread2, valuePropName, $fieldutil.$viewValue), defineProperty(_objectSpread2, changePropName, function (value) {
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
  }), defineProperty(_objectSpread2, focusPropName, function () {
    var onFocus = fieldProps[focusPropName];
    onFocus && onFocus.apply(void 0, arguments);
    $fieldutil.$setFocused(true);
  }), defineProperty(_objectSpread2, blurPropName, function () {
    var onBlur = fieldProps[blurPropName];
    onBlur && onBlur.apply(void 0, arguments);

    if ($fieldutil.$untouched) {
      $fieldutil.$setTouched(true);
    }

    $fieldutil.$setFocused(false);
  }), _objectSpread2));

  if (passUtil) {
    $handleProps[passUtil === true ? '$fieldutil' : String(passUtil)] = $fieldutil;
  }

  return $handleProps;
}
function parseProps(props) {
  var children = props.children,
      component = props.component,
      render = props.render,
      fieldProps = objectWithoutProperties(props, ["children", "component", "render"]);

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
      childProps = objectWithoutProperties(fieldProps, ["name", "type", "defaultValue", "valuePropName", "changePropName", "focusPropName", "blurPropName", "getValueFromEvent", "validMessage", "checked", "unchecked", "__TYPE__", "__DIFF__", "passUtil", "$defaultValue", "$defaultState", "$onFieldChange", "$validators", "$asyncValidators", "$validateLazy", "$memo", "$reserveOnUnmount", "$parser", "$formatter", "$ref"]);

  var renderProps = {
    children: children,
    component: component,
    render: render
  };

  if ($memo === true && isUndefined(__DIFF__)) {
    fieldProps.__DIFF__ = [children, component, render];
  }

  var isNative = !isUndefined(type) || isUndefined(children) && isUndefined(component) && isUndefined(render);
  Object.keys(objectSpread2(objectSpread2({}, fieldProps.$validators = objectSpread2(objectSpread2({}, defaultValidators), fieldProps.$validators)), fieldProps.$asyncValidators)).forEach(function (prop) {
    if (prop in childProps) {
      if (!isNative || !isValidProp(prop)) {
        delete childProps[prop];
      }
    }
  });

  if (isNative) {
    var _split = (type || '').split('.'),
        _split2 = slicedToArray(_split, 2),
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
    return /*#__PURE__*/React.createElement(component, $handleProps);
  }

  if (isFunction(render)) {
    return render($handleProps);
  }

  if (isFunction(children)) {
    return children($handleProps);
  }

  return React.Children.map(children, function (child) {
    return /*#__PURE__*/React.cloneElement(child, $handleProps);
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
  inherits(EasyField, _Component);

  var _super = createSuper(EasyField);

  function EasyField() {
    var _this;

    classCallCheck(this, EasyField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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

  createClass(EasyField, [{
    key: "render",
    value: function render() {
      var _this$parsedProps2 = this.parsedProps = parseProps(this.props),
          fieldProps = _this$parsedProps2.fieldProps;

      return /*#__PURE__*/React__default['default'].createElement(Field, Object.assign({}, fieldProps, {
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
  var Connect = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(FormContext.Consumer, null, function (getFormContext) {
      return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, Object.assign({}, props, {
        $formutil: getFormContext().$formutil,
        ref: ref
      }));
    });
  });
  Connect.displayName = 'React.Formutil.connect.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  return hoistStatics__default['default'](Connect, WrappedComponent);
}

function useFormContext() {
  if (!React__default['default'].useState) {
    throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");
  }

  var useContext = React__default['default'].useContext;
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

  if (!React__default['default'].useState) {
    throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");
  }

  var useState = React__default['default'].useState,
      useLayoutEffect = React__default['default'].useLayoutEffect,
      useRef = React__default['default'].useRef;
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
  $this.$setState = $setState;
  $this.shouldRendered = true; // we not directly use this $state, just from $this.$state

  var _useState = useState(function () {
    $this.$$FIELD_UUID = GET_FIELD_UUID();
    $this.$fieldHandler = $registered = createHandler($this);
    $this.$fieldHandler.$$reset();
    $this.$fieldHandler.$validate();
  }),
      _useState2 = slicedToArray(_useState, 2),
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
    warning__default['default'](!$name || $formContext.$formutil, "You should enusre that the useField() with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
    warning__default['default']($name, "You should pass a name argument to useField(), otherwise it will be isolated!");
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
      var callbackQueue = toConsumableArray(callbackRef.current);

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
          $this.shouldRendered = false;
          $formContext.$$onChange($name, $newState, execute);

          if (!$this.shouldRendered) {
            setState({});
          }
        } else {
          $registered.$$merge($newState);
          $registered.$$detectChange($newState);
          setState({});
          callbackRef.current.push(execute);
        }
      } else {
        $registered.$$merge($newState);
        execute();
      }
    });
  }

  return $this.$fieldutil = objectSpread2(objectSpread2(objectSpread2({
    $name: $name
  }, $registered.$getState()), $registered), {}, {
    $$formutil: $formContext.$formutil
  });
}

function useForm() {
  var _useFormContext = useFormContext(),
      $formutil = _useFormContext.$formutil;

  return $formutil;
}

function useHandler(props) {
  props = objectSpread2(objectSpread2(objectSpread2({}, defaultProps), props), {}, {
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
