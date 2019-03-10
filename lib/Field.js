var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { createFieldHandler, GET_FIELD_UUID, FieldPropTypes, FieldDisplayName, renderField } from './fieldHelper';
import FormContext from './context';
import warning from 'warning';

var Field = (_temp2 = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Field);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Field.__proto__ || Object.getPrototypeOf(Field)).call.apply(_ref, [this].concat(args))), _this), _this.$$FIELD_UUID = GET_FIELD_UUID(), _this.$setState = function ($newState, callback) {
            if (_this.isMounting) {
                var $name = _this.props.name;

                if ($name && _this.$formContext.$$onChange) {
                    _this.$formContext.$$onChange($name, $newState, callback);
                } else {
                    _this.$registered.$$merge($newState);

                    _this.forceUpdate(callback);
                }

                return _this.$registered.$getState();
            }

            return _this.$registered.$$merge($newState);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /** @type { any } */

    /** @type { any } */


    _createClass(Field, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.isMounting = true;

            var $name = this.props.name,
                $formContext = this.$formContext;


            warning(!$name || $formContext.$formutil, 'You should enusre that the <Field /> with the name \'' + $name + '\' must be used underneath a <Form /> component or withForm() HOC, otherwise it\'s isolated.');

            warning($name, 'You should assign a name to <Field />, otherwise it will be isolated!');

            if ($formContext.$$register) {
                this.$registered = $formContext.$$register($name, this.$fieldHandler);
            }

            this.$prevValue = this.$state.$value;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.$formContext.$$unregister) {
                this.$formContext.$$unregister(this.props.name, this.$fieldHandler);
            }

            this.isMounting = false;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var $name = this.props.name;

            if ($name !== prevProps.name) {
                if (this.$formContext.$$register) {
                    if ($name) {
                        this.$registered = this.$formContext.$$register($name, this.$fieldHandler, prevProps.name);
                    } else {
                        this.$formContext.$$unregister(prevProps.name, this.$fieldHandler);
                    }
                }
            }

            if (this.$state.$value !== this.$prevValue) {
                if (!$name || !this.$formContext.$$register) {
                    this.$registered.$$triggerChange({
                        $newValue: this.$state.$value,
                        $prevValue: this.$prevValue
                    });
                }

                this.$prevValue = this.$state.$value;
            }
        }
    }, {
        key: '_render',
        value: function _render() {
            var $fieldutil = this.$fieldutil = Object.assign({
                $name: this.props.name
            }, this.$registered.$getState(), this.$registered, {
                $$formutil: this.$formContext.$formutil
            });

            return renderField($fieldutil, this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var shouldInitial = !this.$formContext;

            return React.createElement(
                FormContext.Consumer,
                null,
                function (context) {
                    _this2.$formContext = context;

                    if (!_this2.$fieldHandler) {
                        _this2.$fieldHandler = createFieldHandler(_this2, _this2);
                    }

                    if (!_this2.$registered) {
                        _this2.$registered = _this2.$fieldHandler;
                    }

                    if (shouldInitial) {
                        _this2.$registered.$reset();
                    }

                    return _this2._render();
                }
            );
        }
    }]);

    return Field;
}(Component), _class.displayName = FieldDisplayName, _class.propTypes = FieldPropTypes, _temp2);


export default Field;