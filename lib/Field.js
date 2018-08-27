var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';
import warning from 'warning';

var Field = (_temp = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field(props, context) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.$baseState = Object.assign({
            $value: '$defaultValue' in props ? props.$defaultValue : '',

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $focused: false,

            $pending: false,

            $error: {}

        }, props.$defaultState);

        _this.$name = props.name;

        _this.$handler = {
            $$FIELD_UUID: Field.FIELD_UUID++,
            $$merge: _this.$$merge,
            $$triggerChange: function $$triggerChange(_ref) {
                var $newValue = _ref.$newValue,
                    $preValue = _ref.$preValue;
                return utils.isFunction(_this.props.$onFieldChange) && _this.props.$onFieldChange($newValue, $preValue, _this.context.$formutil);
            },
            $$reset: function $$reset($newState) {
                return _this.$state = Object.assign({}, _this.$baseState, { $error: Object.assign({}, _this.$baseState.$error) }, $newState);
            },

            $name: _this.$name,
            $picker: function $picker() {
                return Object.assign({}, _this.$state);
            },
            $getComponent: function $getComponent() {
                return _this;
            },
            $reset: function $reset($newState) {
                return _this.$setState(_this.$handler.$$reset($newState));
            },
            $render: _this.$render,
            $setValue: _this.$render,
            $setState: _this.$setState,
            $setTouched: _this.$setTouched,
            $setDirty: _this.$setDirty,
            $setFocused: _this.$setFocused,
            $setValidity: _this.$setValidity,
            $setError: _this.$setError,
            $validate: _this.$validate
        };

        // deprecated methods warning
        ['getComponent', 'validate'].forEach(function (key) {
            _this.$handler[key] = function () {
                var _this$$handler;

                warning(false, 'react-formutil: \'%s\' has been deprecated, please use \'%s\' instead.', key, '$' + key);
                return (_this$$handler = _this.$handler)['$' + key].apply(_this$$handler, arguments);
            };
        });

        if (_this.$name && context.$$register) {
            var $initialValue = utils.parsePath(context.$$defaultValues, _this.$name);
            var $initialState = utils.parsePath(context.$$defaultStates, _this.$name);

            if (!utils.isUndefined($initialValue)) {
                _this.$baseState.$value = $initialValue;
            }

            if ($initialState) {
                Object.assign(_this.$baseState, $initialState);
            }

            _this.$handler.$$reset();
            context.$$register(_this.$name, _this.$handler);
        } else {
            _this.$handler.$$reset();
            _this.$preValue = _this.$baseState.$value;
        }
        return _this;
    }

    _createClass(Field, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.context.$$unregister) {
                this.context.$$unregister(this.$name, this.$handler);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.context.$$register && nextProps.name !== this.$name) {
                if (nextProps.name) {
                    this.context.$$register(this.$name = nextProps.name, this.$handler, this.props.name);
                } else {
                    this.$preValue = this.$state.$value;
                    this.context.$$unregister(this.$name, this.$handler);
                    delete this.$name;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                render = _props.render,
                TheComponent = _props.component;

            var childProps = Object.assign({}, this.$state, this.$handler, {
                $$formutil: this.context.$formutil
            });

            if (TheComponent) {
                return React.createElement(TheComponent, childProps);
            }

            if (utils.isFunction(render)) {
                return render(childProps);
            }

            if (utils.isFunction(children)) {
                return children(childProps);
            }

            return Children.map(children, function (child) {
                return child && utils.isFunction(child.type) ? cloneElement(child, childProps) : child;
            });
        }
    }]);

    return Field;
}(Component), _class.displayName = 'React.Formutil.Field', _class.FIELD_UUID = 0, _class.propTypes = {
    $defaultValue: PropTypes.any,
    $defaultState: PropTypes.object,
    $onFieldChange: PropTypes.func,
    name: PropTypes.string,
    render: PropTypes.func,
    component: PropTypes.func,
    children: function children(props) {
        var pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);
        if (!props.render && !props.component) {
            pt = pt.isRequired;
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return pt.apply(undefined, [props].concat(_toConsumableArray(args)));
    },


    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object
}, _class.contextTypes = {
    $$register: PropTypes.func,
    $$unregister: PropTypes.func,
    $$onChange: PropTypes.func,
    $$defaultValues: PropTypes.object,
    $$defaultStates: PropTypes.object,
    $formutil: PropTypes.object
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.$validate = function (callback) {
        var $validators = Object.assign({}, _this2.props.$validators, _this2.props.$asyncValidators);
        var _$state = _this2.$state,
            $value = _$state.$value,
            $error = _$state.$error;
        var $formutil = _this2.context.$formutil;


        var promises = Object.keys($validators).reduce(function (promises, key) {
            delete $error[key];

            if (_this2.props[key] != null) {
                var result = $validators[key]($value, _this2.props[key], Object.assign({}, _this2.props, {
                    $formutil: $formutil
                }));

                if (utils.isPromise(result)) {
                    promises.push(result.catch(function (reason) {
                        return _this2.$setValidity(key, reason instanceof Error ? reason.message : reason);
                    }));
                } else if (result !== true) {
                    $error[key] = result;
                }
            }

            return promises;
        }, []);

        if (promises.length) {
            _this2.$setPending(true);
            Promise.all(promises).then(function () {
                return _this2.$setPending(false);
            });
        }

        return _this2.$setState({
            $error: $error
        }, callback);
    };

    this.$$merge = function ($newState) {
        if ('$error' in $newState) {
            if (!$newState.$error) {
                $newState.$error = {};
            }

            var $valid = Object.keys($newState.$error).length === 0;

            $newState = Object.assign({
                $valid: $valid,
                $invalid: !$valid
            }, $newState);
        }

        Object.assign(_this2.$state, $newState);

        if ('$value' in $newState) {
            _this2.$validate();
        }

        return _this2.$handler.$picker();
    };

    this.$setState = function ($newState, callback) {
        if (_this2.$name && _this2.context.$$onChange) {
            _this2.context.$$onChange(_this2.$name, $newState, callback);
        } else {
            _this2.$$merge($newState);

            _this2.forceUpdate(function () {
                utils.isFunction(callback) && callback();

                var $onFieldChange = _this2.props.$onFieldChange;


                if ('$value' in $newState && utils.isFunction($onFieldChange) && _this2.$state.$value !== _this2.$preValue) {
                    $onFieldChange(_this2.$state.$value, _this2.$preValue);

                    _this2.$preValue = _this2.$state.$value;
                }
            });
        }

        return _this2.$handler.$picker();
    };

    this.$render = function ($value, callback) {
        return _this2.$setState({
            $value: $value,
            $dirty: true,
            $pristine: false
        }, callback);
    };

    this.$setPending = function ($pending, callback) {
        return _this2.$setState({
            $pending: $pending
        }, callback);
    };

    this.$setTouched = function ($touched, callback) {
        return _this2.$setState({
            $touched: $touched,
            $untouched: !$touched
        }, callback);
    };

    this.$setDirty = function ($dirty, callback) {
        return _this2.$setState({
            $dirty: $dirty,
            $pristine: !$dirty
        }, callback);
    };

    this.$setFocused = function ($focused, callback) {
        return _this2.$setState({
            $focused: $focused
        }, callback);
    };

    this.$setError = function ($error, callback) {
        return _this2.$setState({
            $error: $error
        }, callback);
    };

    this.$setValidity = function (key) {
        var valid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var callback = arguments[2];
        var $error = _this2.$state.$error;


        if (valid === true) {
            delete $error[key];
        } else {
            $error[key] = valid;
        }

        return _this2.$setError($error, callback);
    };
}, _temp);


export default Field;