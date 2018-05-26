var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Field from './Field';

function withField(WrappedComponent) {
    var _class, _temp;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return _temp = _class = function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    $validators = _props.$validators,
                    $asyncValidators = _props.$asyncValidators,
                    others = _objectWithoutProperties(_props, ['$validators', '$asyncValidators']);

                var fieldProps = {};

                Object.keys(Object.assign({}, $validators, $asyncValidators, config.$validators, config.$asyncValidators)).concat('$validators', '$asyncValidators', '$defaultValue', '$defaultState', 'name').forEach(function (prop) {
                    if (prop in others) {
                        fieldProps[prop] = others[prop];
                        delete others[prop];
                    }
                });

                return React.createElement(
                    Field,
                    Object.assign({}, config, fieldProps),
                    function (props) {
                        return React.createElement(WrappedComponent, Object.assign({}, others, props));
                    }
                );
            }
        }]);

        return _class;
    }(Component), _class.displayName = 'React.formutil.withField.' + WrappedComponent.name, _temp;
}

export default withField;