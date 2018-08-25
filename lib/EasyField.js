var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2, _class3, _temp3;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { isFunction, isEmpty, isUndefined, isValidProp } from './utils';

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
        key: 'getChildContext',
        value: function getChildContext() {
            var _this2 = this;

            return {
                $getFieldProps: function $getFieldProps() {
                    return _this2.$fieldProps;
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                name = _props.name,
                defaultValue = _props.defaultValue,
                $defaultValue = _props.$defaultValue,
                $defaultState = _props.$defaultState,
                $validators = _props.$validators,
                $asyncValidators = _props.$asyncValidators,
                $onFieldChange = _props.$onFieldChange,
                $parser = _props.$parser,
                $formatter = _props.$formatter,
                validMessage = _props.validMessage,
                typeStr = _props.type,
                checked = _props.checked,
                unchecked = _props.unchecked,
                valuePropName = _props.valuePropName,
                changePropName = _props.changePropName,
                _onChange = _props.onChange,
                _onFocus = _props.onFocus,
                _onBlur = _props.onBlur,
                otherProps = _objectWithoutProperties(_props, ['name', 'defaultValue', '$defaultValue', '$defaultState', '$validators', '$asyncValidators', '$onFieldChange', '$parser', '$formatter', 'validMessage', 'type', 'checked', 'unchecked', 'valuePropName', 'changePropName', 'onChange', 'onFocus', 'onBlur']);

            var fetchValueFromEvent = function fetchValueFromEvent(ev) {
                return ev && ev.target ? ev.target[valuePropName] : ev;
            };

            var _ref = isFunction(typeStr) ? [typeStr] : typeStr.split('.'),
                _ref2 = _slicedToArray(_ref, 2),
                type = _ref2[0],
                groupType = _ref2[1];

            var fieldProps = {
                name: name,
                $onFieldChange: $onFieldChange,
                $defaultState: $defaultState,
                $validators: Object.assign({}, EasyField.defaultValidators, $validators),
                $asyncValidators: $asyncValidators,
                validMessage: validMessage,
                type: typeStr,
                checked: checked,
                unchecked: unchecked
            };

            Object.keys(Object.assign({}, fieldProps.$validators, $asyncValidators)).forEach(function (prop) {
                if (prop in otherProps) {
                    fieldProps[prop] = otherProps[prop];

                    if (!isValidProp(prop)) {
                        delete otherProps[prop];
                    }
                }
            });

            if ('defaultValue' in this.props) {
                fieldProps.$defaultValue = defaultValue;
            }

            if ('$defaultValue' in this.props) {
                fieldProps.$defaultValue = $defaultValue;
            }

            var Element = isFunction(type) ? type : 'input';
            var _defaultValue = void 0;

            switch (type) {
                case 'select':
                case 'textarea':
                    Element = type;
                    if (otherProps.multiple) {
                        _defaultValue = [];
                    }
                    break;

                case 'group':
                    Element = 'div';
                    if (groupType === 'checkbox') {
                        _defaultValue = [];
                    }
                    break;

                case 'checkbox':
                case 'radio':
                    _defaultValue = unchecked;
                    break;
                default:
                    break;
            }

            if (!('$defaultValue' in fieldProps) && !isUndefined(_defaultValue)) {
                fieldProps.$defaultValue = _defaultValue;
            }

            return React.createElement(
                Field,
                fieldProps,
                function (props) {
                    var _elemProps;

                    if (type === 'group') {
                        _this3.$fieldProps = {
                            $fieldutil: props,
                            $onFieldChange: _onChange,
                            $onFieldFocus: _onFocus,
                            $onFieldBlur: _onBlur,
                            $parser: $parser,
                            $formatter: $formatter,
                            $groupType: groupType,
                            $FieldName: name
                        };

                        var children = otherProps.children,
                            render = otherProps.render,
                            _otherProps$groupNode = otherProps.groupNode,
                            _Element = _otherProps$groupNode === undefined ? 'div' : _otherProps$groupNode,
                            restProps = _objectWithoutProperties(otherProps, ['children', 'render', 'groupNode']);

                        var childProps = Object.assign({}, props, {
                            Field: DeprecatedEasyFieldGroupOption, // v0.2.21 deprecated
                            GroupOption: EasyFieldGroupOption
                        });

                        var childNodes = void 0;

                        if (render) {
                            childNodes = render(childProps);
                        } else if (isFunction(children)) {
                            childNodes = children(childProps);
                        } else {
                            childNodes = React.Children.map(children, function (child) {
                                return child && isFunction(child.type) ? React.cloneElement(child, childProps) : child;
                            });
                        }

                        if (_Element === null) {
                            return childNodes;
                        }

                        return React.createElement(
                            _Element,
                            restProps,
                            childNodes
                        );
                    }

                    var elemProps = void 0;

                    switch (type) {
                        case 'checkbox':
                        case 'radio':
                            elemProps = {
                                checked: $formatter(props.$value) === checked,
                                onChange: function onChange(ev) {
                                    props.$render($parser(ev.target.checked ? checked : unchecked));
                                    _onChange && _onChange(ev);
                                }
                            };
                            break;

                        case 'select':
                            elemProps = {
                                value: $formatter(props.$value),
                                onChange: function onChange(ev) {
                                    var node = ev.target;
                                    var value = node.multiple ? [].slice.call(node.options).filter(function (option) {
                                        return option.selected;
                                    }).map(function (option) {
                                        return option.value;
                                    }) : node.value;

                                    props.$render($parser(value));
                                    _onChange && _onChange(ev);
                                }
                            };
                            break;

                        default:
                            elemProps = (_elemProps = {}, _defineProperty(_elemProps, valuePropName, 'compositionValue' in _this3 ? _this3.compositionValue : $formatter(props.$value)), _defineProperty(_elemProps, 'onCompositionEnd', function onCompositionEnd(ev) {
                                _this3.composition = false;
                                delete _this3.compositionValue;
                                elemProps[changePropName](ev);
                            }), _defineProperty(_elemProps, 'onCompositionStart', function onCompositionStart() {
                                return _this3.composition = true;
                            }), _defineProperty(_elemProps, changePropName, function (ev) {
                                var value = fetchValueFromEvent(ev);

                                if (_this3.composition) {
                                    _this3.compositionValue = value;
                                    _this3.forceUpdate();
                                } else {
                                    props.$render($parser(value));
                                    _onChange && _onChange(ev);
                                }
                            }), _elemProps);
                            break;
                    }

                    return React.createElement(Element, Object.assign({}, otherProps, {
                        type: type,
                        name: name
                    }, elemProps, {
                        onFocus: function onFocus(ev) {
                            props.$setFocused(true);

                            _onFocus && _onFocus(ev);
                        },
                        onBlur: function onBlur(ev) {
                            if (props.$untouched) {
                                props.$setTouched(true);
                            }

                            props.$setFocused(false);

                            _onBlur && _onBlur(ev);
                        }
                    }));
                }
            );
        }
    }]);

    return EasyField;
}(Component), _class.displayName = 'React.formutil.EasyField', _class.propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    defaultValue: PropTypes.any,
    checked: PropTypes.any,
    unchecked: PropTypes.any,
    validMessage: PropTypes.object,
    render: PropTypes.func,
    groupNode: PropTypes.any,
    valuePropName: PropTypes.string,
    changePropName: PropTypes.string,

    $parser: PropTypes.func,
    $formatter: PropTypes.func
}, _class.defaultProps = {
    type: 'text',
    checked: true,
    unchecked: false,
    validMessage: {},

    valuePropName: 'value',
    changePropName: 'onChange',

    $parser: function $parser(value) {
        return value;
    },
    $formatter: function $formatter(value) {
        return value;
    }
}, _class.defaultValidators = [['required', function ($value, check, _ref3) {
    var type = _ref3.type,
        checked = _ref3.checked;
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

    $validators[validKey] = function validator($value, propValue, _ref4) {
        var _ref4$validMessage = _ref4.validMessage,
            validMessage = _ref4$validMessage === undefined ? {} : _ref4$validMessage;

        return validate.apply(undefined, arguments) || validMessage[validKey] || 'Error input: ' + validKey;
    };
    return $validators;
}, {}), _class.childContextTypes = {
    $getFieldProps: PropTypes.func
}, _temp);
var DeprecatedEasyFieldGroupOption = (_temp2 = _class2 = function (_Component2) {
    _inherits(DeprecatedEasyFieldGroupOption, _Component2);

    function DeprecatedEasyFieldGroupOption() {
        _classCallCheck(this, DeprecatedEasyFieldGroupOption);

        return _possibleConstructorReturn(this, (DeprecatedEasyFieldGroupOption.__proto__ || Object.getPrototypeOf(DeprecatedEasyFieldGroupOption)).apply(this, arguments));
    }

    _createClass(DeprecatedEasyFieldGroupOption, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                console.warn('The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.');
            } catch (err) {}
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(EasyFieldGroupOption, this.props);
        }
    }]);

    return DeprecatedEasyFieldGroupOption;
}(Component), _class2.displayName = 'React.formutil.EasyField.GroupOption.Deprecated', _temp2);
var EasyFieldGroupOption = (_temp3 = _class3 = function (_Component3) {
    _inherits(EasyFieldGroupOption, _Component3);

    function EasyFieldGroupOption() {
        _classCallCheck(this, EasyFieldGroupOption);

        return _possibleConstructorReturn(this, (EasyFieldGroupOption.__proto__ || Object.getPrototypeOf(EasyFieldGroupOption)).apply(this, arguments));
    }

    _createClass(EasyFieldGroupOption, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                $value = _props2.$value,
                _onChange2 = _props2.onChange,
                _onFocus2 = _props2.onFocus,
                _onBlur2 = _props2.onBlur,
                others = _objectWithoutProperties(_props2, ['$value', 'onChange', 'onFocus', 'onBlur']);

            var _context$$getFieldPro = this.context.$getFieldProps(),
                $fieldutil = _context$$getFieldPro.$fieldutil,
                $onFieldChange = _context$$getFieldPro.$onFieldChange,
                $onFieldFocus = _context$$getFieldPro.$onFieldFocus,
                $onFieldBlur = _context$$getFieldPro.$onFieldBlur,
                $FieldName = _context$$getFieldPro.$FieldName,
                $groupType = _context$$getFieldPro.$groupType,
                $parser = _context$$getFieldPro.$parser,
                $formatter = _context$$getFieldPro.$formatter;

            var elemProps = $groupType === 'radio' ? {
                checked: $formatter($fieldutil.$value) === $value,
                onChange: function onChange(ev) {
                    $fieldutil.$render($parser($value));

                    _onChange2 && _onChange2(ev);
                    $onFieldChange && $onFieldChange(ev);
                }
            } : $groupType === 'checkbox' ? {
                checked: $formatter($fieldutil.$value).indexOf($value) > -1,
                onChange: function onChange(ev) {
                    var valueArr = $fieldutil.$value || [];
                    $fieldutil.$render($parser(ev.target.checked ? valueArr.concat($value) : valueArr.filter(function (value) {
                        return value !== $value;
                    })));

                    _onChange2 && _onChange2(ev);
                    $onFieldChange && $onFieldChange(ev);
                }
            } : {
                value: $formatter($fieldutil.$value),
                onChange: function onChange(ev) {
                    $fieldutil.$render($parser(ev.target.value));

                    _onChange2 && _onChange2(ev);
                    $onFieldChange && $onFieldChange(ev);
                }
            };

            return React.createElement('input', Object.assign({}, others, elemProps, {
                type: $groupType,
                name: $FieldName,
                onFocus: function onFocus(ev) {
                    $fieldutil.$setFocused(true);

                    _onFocus2 && _onFocus2(ev);
                    $onFieldFocus && $onFieldFocus(ev);
                },
                onBlur: function onBlur(ev) {
                    if ($fieldutil.$untouched) {
                        $fieldutil.$setTouched(true);
                    }

                    $fieldutil.$setFocused(false);

                    _onBlur2 && _onBlur2(ev);
                    $onFieldBlur && $onFieldBlur(ev);
                }
            }));
        }
    }]);

    return EasyFieldGroupOption;
}(Component), _class3.displayName = 'React.formutil.EasyField.GroupOption', _class3.propTypes = {
    $value: PropTypes.any.isRequired
}, _class3.contextTypes = {
    $getFieldProps: PropTypes.func
}, _temp3);


export default EasyField;