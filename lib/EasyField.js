var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

/**
 * 提供对浏览器原生表单空间的封装
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
                name = _props.name,
                defaultValue = _props.defaultValue,
                $defaultValue = _props.$defaultValue,
                $defaultState = _props.$defaultState,
                $validators = _props.$validators,
                $asyncValidators = _props.$asyncValidators,
                validMessage = _props.validMessage,
                type = _props.type,
                checked = _props.checked,
                unchecked = _props.unchecked,
                _onChange = _props.onChange,
                _onBlur = _props.onBlur,
                otherProps = _objectWithoutProperties(_props, ['name', 'defaultValue', '$defaultValue', '$defaultState', '$validators', '$asyncValidators', 'validMessage', 'type', 'checked', 'unchecked', 'onChange', 'onBlur']);

            var defaultErrMsg = 'Error';

            var fieldProps = {
                name: name,
                $validators: Object.assign({
                    required: function required($value) {
                        return (type === 'checkbox' || type === 'radio' ? $value === checked : !!($value + '')) || validMessage.required || defaultErrMsg + ': required';
                    },
                    maxLength: function maxLength($value, len) {
                        return !$value || $value.length <= len * 1 || validMessage.maxLength || defaultErrMsg + ': maxLength: ' + len;
                    },
                    minLength: function minLength($value, len) {
                        return !$value || $value.length >= len * 1 || validMessage.minLength || defaultErrMsg + ': minLength: ' + len;
                    },
                    max: function max($value, limit) {
                        return !$value || $value * 1 <= limit || validMessage.max || defaultErrMsg + ': max: ' + limit;
                    },
                    min: function min($value, limit) {
                        return !$value || $value * 1 >= limit || validMessage.min || defaultErrMsg + ': min: ' + limit;
                    },
                    pattern: function pattern($value, regexp) {
                        return !$value || regexp.test($value) || validMessage.pattern || defaultErrMsg + ': pattern: ' + regexp;
                    }
                }, $validators),
                $asyncValidators: $asyncValidators
            };

            Object.keys(Object.assign({}, fieldProps.$validators, $asyncValidators)).forEach(function (prop) {
                if (prop in otherProps) {
                    fieldProps[prop] = otherProps[prop];
                    delete otherProps[prop];
                }
            });

            if ('defaultValue' in this.props) {
                fieldProps.$defaultValue = defaultValue;
            }

            if ('$defaultValue' in this.props) {
                fieldProps.$defaultValue = $defaultValue;
            }

            var Element = void 0;

            switch (type) {
                case 'select':
                case 'textarea':
                    Element = type;
                    break;

                default:
                    Element = 'input';
                    break;
            }

            return React.createElement(
                Field,
                fieldProps,
                function (props) {
                    var elemProps = type === 'radio' || type === 'checkbox' ? {
                        checked: props.$value === checked,
                        onChange: function onChange(ev) {
                            props.$render(ev.target.checked ? checked : unchecked);
                            if (_onChange) {
                                _onChange(ev);
                            }
                        }
                    } : {
                        value: props.$value,
                        onChange: function onChange(ev) {
                            props.$render(ev.target.value.trim());
                            if (_onChange) {
                                _onChange(ev);
                            }
                        }
                    };

                    return React.createElement(Element, Object.assign({}, otherProps, {
                        type: type,
                        name: name
                    }, elemProps, {
                        onBlur: function onBlur(ev) {
                            props.$setTouched(true);
                            if (_onBlur) {
                                _onBlur(ev);
                            }
                        }
                    }));
                }
            );
        }
    }]);

    return EasyField;
}(Component), _class.propTypes = {
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object,
    checked: PropTypes.any,
    unchecked: PropTypes.any,
    validMessage: PropTypes.object
}, _class.defaultProps = {
    type: 'text',
    checked: true,
    unchecked: false,
    validMessage: {}
}, _temp);


export default EasyField;