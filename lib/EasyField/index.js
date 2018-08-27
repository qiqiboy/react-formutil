var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
                $parser = _props.$parser,
                $formatter = _props.$formatter,
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
                fieldProps = _objectWithoutProperties(_props, ['$parser', '$formatter', 'defaultValue', 'valuePropName', 'changePropName', 'focusPropName', 'blurPropName', 'render', 'component', 'onChange', 'onFocus', 'onBlur']);

            var fetchValueFromEvent = function fetchValueFromEvent(ev) {
                return ev && ev.target ? ev.target[valuePropName] : ev;
            };

            var $defaultValue = fieldProps.$defaultValue,
                $defaultState = fieldProps.$defaultState,
                $onFieldChange = fieldProps.$onFieldChange,
                $validators = fieldProps.$validators,
                $asyncValidators = fieldProps.$asyncValidators,
                validMessage = fieldProps.validMessage,
                otherProps = _objectWithoutProperties(fieldProps, ['$defaultValue', '$defaultState', '$onFieldChange', '$validators', '$asyncValidators', 'validMessage']);

            var children = fieldProps.children;


            var isNative = !isUndefined(this.props.type) || !this.props.children && !this.props.component && !this.props.render;

            if (!('$defaultValue' in fieldProps) && 'defaultValue' in this.props) {
                fieldProps.$defaultValue = defaultValue;
            }

            Object.keys(Object.assign({}, fieldProps.$validators = Object.assign({}, EasyField.defaultValidators, $validators), $asyncValidators)).forEach(function (prop) {
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

                var _defaultValue = void 0;

                switch (htmlType) {
                    case 'select':
                    case 'textarea':
                        if (fieldProps.multiple) {
                            _defaultValue = [];
                        }
                        break;

                    case 'group':
                        if (groupType === 'checkbox') {
                            _defaultValue = [];
                        }

                        otherProps.type = groupType;
                        break;

                    case 'checkbox':
                    case 'radio':
                        _defaultValue = fieldProps.unchecked;
                        break;

                    default:
                        break;
                }

                children = htmlType === 'group' ? React.createElement(Group, null) : React.createElement(Native, null);

                if (!('$defaultValue' in fieldProps) && !isUndefined(_defaultValue)) {
                    fieldProps.$defaultValue = _defaultValue;
                }
            } else {
                delete otherProps.children;
            }

            return React.createElement(
                Field,
                fieldProps,
                function ($util) {
                    var _Object$assign;

                    var childProps = Object.assign({}, otherProps, (_Object$assign = {}, _defineProperty(_Object$assign, valuePropName, $formatter($util.$value)), _defineProperty(_Object$assign, changePropName, function (value, ev) {
                        if (!ev) {
                            ev = value;
                        }

                        var newValue = fetchValueFromEvent(value);
                        $util.$render($parser(newValue));

                        onChange && onChange(ev);
                    }), _defineProperty(_Object$assign, focusPropName, function (ev) {
                        $util.$setFocused(true);

                        onFocus && onFocus(ev);
                    }), _defineProperty(_Object$assign, blurPropName, function (ev) {
                        if ($util.$untouched) {
                            $util.$setTouched(true);
                        }

                        $util.$setFocused(false);

                        onBlur && onBlur(ev);
                    }), _Object$assign));

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
                        return cloneElement(child, child && isFunction(child.type) ? Object.assign({}, childProps, { $fieldutil: $util }) : childProps);
                    });
                }
            );
        }
    }]);

    return EasyField;
}(Component), _class.displayName = 'React.Formutil.EasyField', _class.propTypes = {
    type: function type(props) {
        var pt = PropTypes.string;

        if (!props.children && !props.component && !props.render) {
            pt = pt.isRequired;
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return pt.apply(undefined, [props].concat(_toConsumableArray(args)));
    },

    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: PropTypes.func,
    render: PropTypes.func,

    defaultValue: PropTypes.any,
    validMessage: PropTypes.object,

    valuePropName: PropTypes.string,
    changePropName: PropTypes.string,
    focusPropName: PropTypes.string,
    blurPropName: PropTypes.string,

    $parser: PropTypes.func,
    $formatter: PropTypes.func
}, _class.defaultProps = {
    validMessage: {},
    valuePropName: 'value',
    changePropName: 'onChange',
    focusPropName: 'onFocus',
    blurPropName: 'onBlur',
    $parser: function $parser(value) {
        return value;
    },
    $formatter: function $formatter(value) {
        return value;
    }
}, _class.defaultValidators = [['required', function ($value, check, _ref) {
    var type = _ref.type,
        checked = _ref.checked;
    return type === 'checkbox' || type === 'radio' ? $value === checked : !isEmpty($value);
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
}], ['checker', function ($value, checker) {
    return checker($value);
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
}, {}), _temp);


export default EasyField;