var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp2, _class3, _temp3;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import createContext from 'create-react-context';
import { isFunction } from '../utils';
import warning from 'warning';

/** @type {any} */

var _createContext = createContext({}),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var EasyFieldGroup = (_temp = _class = function (_Component) {
    _inherits(EasyFieldGroup, _Component);

    function EasyFieldGroup() {
        _classCallCheck(this, EasyFieldGroup);

        return _possibleConstructorReturn(this, (EasyFieldGroup.__proto__ || Object.getPrototypeOf(EasyFieldGroup)).apply(this, arguments));
    }

    _createClass(EasyFieldGroup, [{
        key: 'getGroupContext',
        value: function getGroupContext() {
            return this.props;
        }
    }, {
        key: '_render',
        value: function _render() {
            var _props = this.props,
                className = _props.className,
                Element = _props.groupNode,
                children = _props.children;


            var GroupOptionProps = {
                GroupOption: EasyFieldGroupOption,
                Field: DeprecatedEasyFieldGroupOption
            };

            var childNodes = isFunction(children) ? children(GroupOptionProps) : Children.map(children, function (child) {
                return cloneElement(child, GroupOptionProps);
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
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Provider,
                { value: this.getGroupContext() },
                this._render()
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
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
}, _class.defaultProps = {
    type: 'checkbox',
    groupNode: 'div'
}, _temp);
var EasyFieldGroupOption = (_temp2 = _class2 = function (_Component2) {
    _inherits(EasyFieldGroupOption, _Component2);

    function EasyFieldGroupOption() {
        _classCallCheck(this, EasyFieldGroupOption);

        return _possibleConstructorReturn(this, (EasyFieldGroupOption.__proto__ || Object.getPrototypeOf(EasyFieldGroupOption)).apply(this, arguments));
    }

    _createClass(EasyFieldGroupOption, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            warning('$value' in this.props, 'You should pass a $value to <GroupOption />.');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                $value = _props2.$value,
                _onChange = _props2.onChange,
                _onFocus = _props2.onFocus,
                _onBlur = _props2.onBlur,
                others = _objectWithoutProperties(_props2, ['$value', 'onChange', 'onFocus', 'onBlur']);

            return React.createElement(
                Consumer,
                null,
                function ($groupHander) {
                    var type = $groupHander.type,
                        name = $groupHander.name;


                    var elemProps = type === 'radio' ? {
                        checked: $groupHander.value === $value,
                        onChange: function onChange(ev) {
                            $groupHander.onChange($value, ev);

                            _onChange && _onChange(ev);
                        }
                    } : type === 'checkbox' ? {
                        checked: $groupHander.value.indexOf($value) > -1,
                        onChange: function onChange(ev) {
                            $groupHander.onChange(ev.target.checked ? $groupHander.value.concat($value) : $groupHander.value.filter(function (value) {
                                return value !== $value;
                            }), ev);

                            _onChange && _onChange(ev);
                        }
                    } : {
                        value: $groupHander.value,
                        onChange: function onChange(ev) {
                            $groupHander.onChange(ev);

                            _onChange && _onChange(ev);
                        }
                    };

                    return React.createElement('input', Object.assign({
                        name: name
                    }, others, elemProps, {
                        type: type,
                        onFocus: function onFocus(ev) {
                            $groupHander.onFocus(ev);
                            _onFocus && _onFocus(ev);
                        },
                        onBlur: function onBlur(ev) {
                            $groupHander.onBlur(ev);
                            _onBlur && _onBlur(ev);
                        }
                    }));
                }
            );
        }
    }]);

    return EasyFieldGroupOption;
}(Component), _class2.displayName = 'React.Formutil.EasyField.Group.Option', _class2.propTypes = {
    $value: PropTypes.any.isRequired
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