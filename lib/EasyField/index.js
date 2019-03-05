var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Native from './Native';
import Group from './Group';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';

var TYPE = '__TYPE__';
var defaultValidators = [['required', function ($value, check, _ref) {
    var __TYPE__ = _ref.__TYPE__,
        _ref$checked = _ref.checked,
        checked = _ref$checked === undefined ? true : _ref$checked;
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
            validMessage = _ref2$validMessage === undefined ? {} : _ref2$validMessage;

        return validate.apply(undefined, arguments) || validMessage[validKey] || 'Error input: ' + validKey;
    };
    return $validators;
}, {});

/**
 * 提供对浏览器原生表单控件的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */
var EasyField = (_temp = _class = function (_Component) {
    _inherits(EasyField, _Component);

    function EasyField() {
        _classCallCheck(this, EasyField);

        return _possibleConstructorReturn(this, (EasyField.__proto__ || Object.getPrototypeOf(EasyField)).apply(this, arguments));
    }

    _createClass(EasyField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                defaultValue = _props.defaultValue,
                valuePropName = _props.valuePropName,
                changePropName = _props.changePropName,
                focusPropName = _props.focusPropName,
                blurPropName = _props.blurPropName,
                render = _props.render,
                TheComponent = _props.component,
                onChange = _props.onChange,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                fieldProps = _objectWithoutProperties(_props, ['defaultValue', 'valuePropName', 'changePropName', 'focusPropName', 'blurPropName', 'render', 'component', 'onChange', 'onFocus', 'onBlur']);

            var fetchValueFromEvent = function fetchValueFromEvent(ev) {
                return ev && ev.target ? ev.target[valuePropName] : ev;
            };

            var $defaultValue = fieldProps.$defaultValue,
                $defaultState = fieldProps.$defaultState,
                $onFieldChange = fieldProps.$onFieldChange,
                $validators = fieldProps.$validators,
                $asyncValidators = fieldProps.$asyncValidators,
                $parser = fieldProps.$parser,
                $formatter = fieldProps.$formatter,
                validMessage = fieldProps.validMessage,
                passUtil = fieldProps.passUtil,
                __TYPE__ = fieldProps.__TYPE__,
                otherProps = _objectWithoutProperties(fieldProps, ['$defaultValue', '$defaultState', '$onFieldChange', '$validators', '$asyncValidators', '$parser', '$formatter', 'validMessage', 'passUtil', '__TYPE__']);

            var children = fieldProps.children;


            var isNative = !isUndefined(this.props.type) || !this.props.children && !this.props.component && !this.props.render;

            if (!('$defaultValue' in fieldProps) && 'defaultValue' in this.props) {
                fieldProps.$defaultValue = defaultValue;
            }

            Object.keys(Object.assign({}, fieldProps.$validators = Object.assign({}, defaultValidators, $validators), $asyncValidators)).forEach(function (prop) {
                if (prop in otherProps) {
                    if (!isNative || !isValidProp(prop)) {
                        delete otherProps[prop];
                    }
                }
            });

            if (isNative) {
                var _split = (fieldProps.type || '').split('.'),
                    _split2 = _slicedToArray(_split, 2),
                    _split2$ = _split2[0],
                    htmlType = _split2$ === undefined ? 'text' : _split2$,
                    groupType = _split2[1];

                switch (htmlType) {
                    case 'select':
                    case 'textarea':
                        if (fieldProps.multiple) {
                            fieldProps[TYPE] = 'array';
                        }
                        break;

                    case 'group':
                        if (groupType === 'checkbox') {
                            fieldProps[TYPE] = 'array';
                        }

                        otherProps.type = groupType;
                        break;

                    case 'checkbox':
                    case 'radio':
                        fieldProps[TYPE] = 'checked';
                        break;

                    default:
                        break;
                }

                children = htmlType === 'group' ? React.createElement(Group, null) : React.createElement(Native, null);
            } else {
                delete otherProps.children;
            }

            if (!('$defaultValue' in fieldProps) && TYPE in fieldProps) {
                var _defaultValue = void 0;
                switch (fieldProps[TYPE]) {
                    case 'checked':
                        var _fieldProps$unchecked = fieldProps.unchecked,
                            unchecked = _fieldProps$unchecked === undefined ? false : _fieldProps$unchecked;

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

            return React.createElement(
                Field,
                fieldProps,
                function ($util) {
                    var _Object$assign;

                    var childProps = Object.assign({}, otherProps, (_Object$assign = {}, _defineProperty(_Object$assign, valuePropName, $util.$viewValue), _defineProperty(_Object$assign, changePropName, function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var value = args[0];
                        var ev = args[args.length - 1];

                        if (!ev || !ev.target) {
                            ev = args;
                        } else {
                            ev = [ev];
                        }

                        var newValue = fetchValueFromEvent(value);
                        $util.$render(newValue);

                        onChange && onChange.apply(undefined, _toConsumableArray(ev));
                    }), _defineProperty(_Object$assign, focusPropName, function () {
                        $util.$setFocused(true);

                        onFocus && onFocus.apply(undefined, arguments);
                    }), _defineProperty(_Object$assign, blurPropName, function () {
                        if ($util.$untouched) {
                            $util.$setTouched(true);
                        }

                        $util.$setFocused(false);

                        onBlur && onBlur.apply(undefined, arguments);
                    }), _Object$assign));

                    if (passUtil) {
                        childProps[passUtil] = $util;
                    }

                    if (TheComponent) {
                        return React.createElement(TheComponent, childProps);
                    }

                    if (isFunction(render)) {
                        return render(childProps);
                    }

                    if (isFunction(children)) {
                        return children(childProps);
                    }

                    return Children.map(children, function (child) {
                        return cloneElement(child, childProps);
                    });
                }
            );
        }
    }]);

    return EasyField;
}(Component), _class.displayName = 'React.Formutil.EasyField', _class.propTypes = {
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
}, _class.defaultProps = {
    validMessage: {},
    valuePropName: 'value',
    changePropName: 'onChange',
    focusPropName: 'onFocus',
    blurPropName: 'onBlur',
    $parser: function $parser(value) {
        return typeof value === 'string' ? value.trim() : value;
    }
}, _temp);


export default EasyField;