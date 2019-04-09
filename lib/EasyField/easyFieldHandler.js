function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import Native from './Native';
import Group from './Group';
import List from './List';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';
export var TYPE = '__TYPE__';
export var defaultValidators = [['required', function ($value, check, _ref) {
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
export var propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  component: PropTypes.func,
  render: PropTypes.func,
  defaultValue: PropTypes.any,
  validMessage: PropTypes.object,
  valuePropName: PropTypes.string,
  changePropName: PropTypes.string,
  focusPropName: PropTypes.string,
  blurPropName: PropTypes.string,
  passUtil: PropTypes.string
};
export var displayName = 'React.Formutil.EasyField';
export var defaultProps = {
  validMessage: {},
  valuePropName: 'value',
  changePropName: 'onChange',
  focusPropName: 'onFocus',
  blurPropName: 'onBlur',
  $parser: function $parser(value) {
    return typeof value === 'string' ? value.trim() : value;
  }
};
export function createHandler($fieldutil, fieldProps, childProps) {
  var _objectSpread2;

  var valuePropName = fieldProps.valuePropName,
      changePropName = fieldProps.changePropName,
      focusPropName = fieldProps.focusPropName,
      blurPropName = fieldProps.blurPropName,
      passUtil = fieldProps.passUtil;

  var fetchValueFromEvent = function fetchValueFromEvent(ev) {
    return ev && ev.target ? ev.target[valuePropName] : ev;
  };

  var $handleProps = _objectSpread({}, childProps, (_objectSpread2 = {}, _defineProperty(_objectSpread2, valuePropName, $fieldutil.$viewValue), _defineProperty(_objectSpread2, changePropName, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var value = args[0];
    var ev = args[args.length - 1];

    if (!ev || !ev.target) {
      ev = args;
    } else {
      ev = [ev];
    }

    var onChange = fieldProps[changePropName];
    onChange && onChange.apply(void 0, _toConsumableArray(ev));
    var newValue = fetchValueFromEvent(value);
    $fieldutil.$render(newValue);
  }), _defineProperty(_objectSpread2, focusPropName, function () {
    var onFocus = fieldProps[focusPropName];
    onFocus && onFocus.apply(void 0, arguments);
    $fieldutil.$setFocused(true);
  }), _defineProperty(_objectSpread2, blurPropName, function () {
    var onBlur = fieldProps[blurPropName];
    onBlur && onBlur.apply(void 0, arguments);

    if ($fieldutil.$untouched) {
      $fieldutil.$setTouched(true);
    }

    $fieldutil.$setFocused(false);
  }), _objectSpread2));

  if (passUtil) {
    $handleProps[passUtil === true ? '$fieldutil' : passUtil] = $fieldutil;
  }

  return $handleProps;
}
export function parseProps(props) {
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
      validMessage = fieldProps.validMessage,
      __TYPE__ = fieldProps.__TYPE__,
      passUtil = fieldProps.passUtil,
      $defaultValue = fieldProps.$defaultValue,
      $defaultState = fieldProps.$defaultState,
      $onFieldChange = fieldProps.$onFieldChange,
      $validators = fieldProps.$validators,
      $asyncValidators = fieldProps.$asyncValidators,
      $validateLazy = fieldProps.$validateLazy,
      $reserveOnUnmount = fieldProps.$reserveOnUnmount,
      $parser = fieldProps.$parser,
      $formatter = fieldProps.$formatter,
      childProps = _objectWithoutProperties(fieldProps, ["name", "type", "defaultValue", "valuePropName", "changePropName", "focusPropName", "blurPropName", "validMessage", "__TYPE__", "passUtil", "$defaultValue", "$defaultState", "$onFieldChange", "$validators", "$asyncValidators", "$validateLazy", "$reserveOnUnmount", "$parser", "$formatter"]);

  var renderProps = {
    children: children,
    component: component,
    render: render
  };
  var isNative = !isUndefined(type) || isUndefined(children) && isUndefined(component) && isUndefined(render);
  Object.keys(_objectSpread({}, fieldProps.$validators = _objectSpread({}, defaultValidators, fieldProps.$validators), fieldProps.$asyncValidators)).forEach(function (prop) {
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

    renderProps.component = htmlType === 'group' ? Group : htmlType === 'list' ? List : Native; // Native or Group need to pass 'name' | 'type' | 'children'

    if (name) {
      childProps.name = name;
    }

    if (type) {
      childProps.type = htmlType;
    }

    if (children) {
      childProps.children = children;
    }

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

      default:
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
            unchecked = _fieldProps$unchecked === void 0 ? false : _fieldProps$unchecked;
        _defaultValue = unchecked;
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

      case 'empty':
      default:
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
export function renderField($handleProps, props) {
  var component = props.component,
      render = props.render,
      children = props.children;

  if (component) {
    return createElement(component, $handleProps);
  }

  if (isFunction(render)) {
    return render($handleProps);
  }

  if (isFunction(children)) {
    return children($handleProps);
  }

  return Children.map(children, function (child) {
    return cloneElement(child, $handleProps);
  });
}