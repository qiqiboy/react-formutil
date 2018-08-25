var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2, _class3, _temp3;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../utils';
import warning from 'warning';

var EasyFieldGroup = (_temp = _class = function (_Component) {
    _inherits(EasyFieldGroup, _Component);

    function EasyFieldGroup() {
        _classCallCheck(this, EasyFieldGroup);

        return _possibleConstructorReturn(this, (EasyFieldGroup.__proto__ || Object.getPrototypeOf(EasyFieldGroup)).apply(this, arguments));
    }

    _createClass(EasyFieldGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                $fieldutil: this.props
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                Element = _props.groupNode,
                children = _props.children;


            var childProps = {
                GroupOption: EasyFieldGroupOption,
                Field: DeprecatedEasyFieldGroupOption
            };

            var childNodes = isFunction(children) ? children(childProps) : Children.map(children, function (child) {
                return cloneElement(child, childProps);
            });

            if (Element === null) {
                return childNodes;
            }

            return React.createElement(
                Element,
                { className: className },
                childNodes
            );
        }
    }]);

    return EasyFieldGroup;
}(Component), _class.displayName = 'React.Formutil.EasyField.Group', _class.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    value: PropTypes.any,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    groupNode: PropTypes.any,
    render: PropTypes.func
}, _class.defaultProps = {
    type: 'checkbox',
    groupNode: 'div'
}, _class.childContextTypes = {
    $fieldutil: PropTypes.object
}, _temp);
var EasyFieldGroupOption = (_temp2 = _class2 = function (_Component2) {
    _inherits(EasyFieldGroupOption, _Component2);

    function EasyFieldGroupOption() {
        _classCallCheck(this, EasyFieldGroupOption);

        return _possibleConstructorReturn(this, (EasyFieldGroupOption.__proto__ || Object.getPrototypeOf(EasyFieldGroupOption)).apply(this, arguments));
    }

    _createClass(EasyFieldGroupOption, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                $value = _props2.$value,
                _onChange = _props2.onChange,
                _onFocus = _props2.onFocus,
                _onBlur = _props2.onBlur,
                others = _objectWithoutProperties(_props2, ['$value', 'onChange', 'onFocus', 'onBlur']);

            var $fieldutil = this.context.$fieldutil;
            var type = $fieldutil.type,
                name = $fieldutil.name;


            var elemProps = type === 'radio' ? {
                checked: $fieldutil.value === $value,
                onChange: function onChange(ev) {
                    $fieldutil.onChange($value, ev);

                    _onChange && _onChange(ev);
                }
            } : type === 'checkbox' ? {
                checked: $fieldutil.value.indexOf($value) > -1,
                onChange: function onChange(ev) {
                    $fieldutil.onChange(ev.target.checked ? $fieldutil.value.concat($value) : $fieldutil.value.filter(function (value) {
                        return value !== $value;
                    }), ev);

                    _onChange && _onChange(ev);
                }
            } : {
                value: $fieldutil.value,
                onChange: function onChange(ev) {
                    $fieldutil.onChange(ev);

                    _onChange && _onChange(ev);
                }
            };

            return React.createElement('input', Object.assign({
                name: name
            }, others, elemProps, {
                type: type,
                onFocus: function onFocus(ev) {
                    $fieldutil.onFocus(ev);
                    _onFocus && _onFocus(ev);
                },
                onBlur: function onBlur(ev) {
                    $fieldutil.onBlur(ev);
                    _onBlur && _onBlur(ev);
                }
            }));
        }
    }]);

    return EasyFieldGroupOption;
}(Component), _class2.displayName = 'React.Formutil.EasyField.Group.Option', _class2.propTypes = {
    $value: PropTypes.any.isRequired
}, _class2.contextTypes = {
    $fieldutil: PropTypes.object
}, _temp2);
var DeprecatedEasyFieldGroupOption = (_temp3 = _class3 = function (_Component3) {
    _inherits(DeprecatedEasyFieldGroupOption, _Component3);

    function DeprecatedEasyFieldGroupOption() {
        _classCallCheck(this, DeprecatedEasyFieldGroupOption);

        return _possibleConstructorReturn(this, (DeprecatedEasyFieldGroupOption.__proto__ || Object.getPrototypeOf(DeprecatedEasyFieldGroupOption)).apply(this, arguments));
    }

    _createClass(DeprecatedEasyFieldGroupOption, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            warning(false, 'The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.');
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(EasyFieldGroupOption, this.props);
        }
    }]);

    return DeprecatedEasyFieldGroupOption;
}(Component), _class3.displayName = 'React.Formutil.EasyField.Group.Option.Deprecated', _temp3);


export default EasyFieldGroup;