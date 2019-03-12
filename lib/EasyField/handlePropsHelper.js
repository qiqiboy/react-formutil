var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import Native from './Native';
import Group from './Group';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';

export var TYPE = '__TYPE__';
export var defaultValidators = [['required', function ($value, check, _ref) {
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

export function createHandler($fieldutil, props, childProps) {
    var _Object$assign;

    var valuePropName = props.valuePropName,
        changePropName = props.changePropName,
        focusPropName = props.focusPropName,
        blurPropName = props.blurPropName,
        onChange = props.onChange,
        onFocus = props.onFocus,
        onBlur = props.onBlur,
        passUtil = props.passUtil;


    var fetchValueFromEvent = function fetchValueFromEvent(ev) {
        return ev && ev.target ? ev.target[valuePropName] : ev;
    };

    var $handleProps = Object.assign({}, childProps, (_Object$assign = {}, _defineProperty(_Object$assign, valuePropName, $fieldutil.$viewValue), _defineProperty(_Object$assign, changePropName, function () {
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

        $fieldutil.$render(newValue);

        onChange && onChange.apply(undefined, _toConsumableArray(ev));
    }), _defineProperty(_Object$assign, focusPropName, function () {
        $fieldutil.$setFocused(true);

        onFocus && onFocus.apply(undefined, arguments);
    }), _defineProperty(_Object$assign, blurPropName, function () {
        if ($fieldutil.$untouched) {
            $fieldutil.$setTouched(true);
        }

        $fieldutil.$setFocused(false);

        onBlur && onBlur.apply(undefined, arguments);
    }), _Object$assign));

    if (passUtil) {
        $handleProps[passUtil] = $fieldutil;
    }

    return $handleProps;
}

export function parseProps(props) {
    props = Object.assign({}, defaultProps, props);

    var _props = props,
        defaultValue = _props.defaultValue,
        children = _props.children,
        component = _props.component,
        render = _props.render,
        fieldProps = _objectWithoutProperties(_props, ['defaultValue', 'children', 'component', 'render']);

    var valuePropName = fieldProps.valuePropName,
        changePropName = fieldProps.changePropName,
        focusPropName = fieldProps.focusPropName,
        blurPropName = fieldProps.blurPropName,
        onChange = fieldProps.onChange,
        onFocus = fieldProps.onFocus,
        onBlur = fieldProps.onBlur,
        $defaultValue = fieldProps.$defaultValue,
        $defaultState = fieldProps.$defaultState,
        $onFieldChange = fieldProps.$onFieldChange,
        $validators = fieldProps.$validators,
        $asyncValidators = fieldProps.$asyncValidators,
        $validateLazy = fieldProps.$validateLazy,
        $parser = fieldProps.$parser,
        $formatter = fieldProps.$formatter,
        validMessage = fieldProps.validMessage,
        __TYPE__ = fieldProps.__TYPE__,
        childProps = _objectWithoutProperties(fieldProps, ['valuePropName', 'changePropName', 'focusPropName', 'blurPropName', 'onChange', 'onFocus', 'onBlur', '$defaultValue', '$defaultState', '$onFieldChange', '$validators', '$asyncValidators', '$validateLazy', '$parser', '$formatter', 'validMessage', '__TYPE__']);

    var renderProps = {
        children: children,
        component: component,
        render: render
    };

    var isNative = !isUndefined(props.type) || !children && !component && !render;

    Object.keys(Object.assign({}, fieldProps.$validators = Object.assign({}, defaultValidators, fieldProps.$validators), fieldProps.$asyncValidators)).forEach(function (prop) {
        if (prop in childProps) {
            if (!isNative || !isValidProp(prop)) {
                delete childProps[prop];
            }
        }
    });

    if (isNative) {
        var _split = (props.type || '').split('.'),
            _split2 = _slicedToArray(_split, 2),
            _split2$ = _split2[0],
            htmlType = _split2$ === undefined ? 'text' : _split2$,
            groupType = _split2[1];

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

            default:
                break;
        }

        renderProps.component = htmlType === 'group' ? Group : Native;
        childProps.children = children;
    }

    if (!('$defaultValue' in fieldProps) && 'defaultValue' in props) {
        fieldProps.$defaultValue = defaultValue;
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