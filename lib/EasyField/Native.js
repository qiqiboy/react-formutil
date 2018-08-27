var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var EasyFieldNative = (_temp = _class = function (_Component) {
    _inherits(EasyFieldNative, _Component);

    function EasyFieldNative() {
        _classCallCheck(this, EasyFieldNative);

        return _possibleConstructorReturn(this, (EasyFieldNative.__proto__ || Object.getPrototypeOf(EasyFieldNative)).apply(this, arguments));
    }

    _createClass(EasyFieldNative, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                $fieldutil = _props.$fieldutil,
                htmlValue = _props.value,
                _onChange = _props.onChange,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                checked = _props.checked,
                unchecked = _props.unchecked,
                children = _props.children,
                others = _objectWithoutProperties(_props, ['$fieldutil', 'value', 'onChange', 'onFocus', 'onBlur', 'checked', 'unchecked', 'children']);

            var htmlType = this.props.type;

            var htmlProps = {
                value: 'compositionValue' in this ? this.compositionValue : htmlValue,
                onCompositionEnd: function onCompositionEnd(ev) {
                    _this2.composition = false;
                    delete _this2.compositionValue;
                    htmlProps.onChange(ev);
                },
                onCompositionStart: function onCompositionStart() {
                    return _this2.composition = true;
                },
                onChange: function onChange(ev) {
                    var value = ev.target.value;


                    if (_this2.composition) {
                        _this2.compositionValue = value;
                        _this2.forceUpdate();
                    } else {
                        _onChange && _onChange(value, ev);
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

                        _onChange && _onChange(value, ev);
                    };
                    htmlProps.children = children;

                    break;
                case 'textarea':
                    Element = htmlType;
                    break;

                case 'checkbox':
                case 'radio':
                    htmlProps = {
                        checked: htmlValue === checked,
                        onChange: function onChange(ev) {
                            _onChange && _onChange(ev.target.checked ? checked : unchecked, ev);
                        },
                        onFocus: onFocus,
                        onBlur: onBlur
                    };
                    break;

                default:
                    break;
            }

            return React.createElement(Element, Object.assign({}, others, htmlProps));
        }
    }]);

    return EasyFieldNative;
}(Component), _class.displayName = 'React.Formutil.EasyField.Native', _class.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    value: PropTypes.any,
    name: PropTypes.string,
    type: PropTypes.string,

    checked: PropTypes.any,
    unchekced: PropTypes.any
}, _class.defaultProps = {
    type: 'text',
    checked: true,
    unchecked: false
}, _temp);


export default EasyFieldNative;