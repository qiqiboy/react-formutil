var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import * as utils from './utils';
import warning from 'warning';

var Field = (_temp = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field(props) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

        _initialiseProps.call(_this);

        _this.$baseState = {
            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $focused: false,

            $pending: false,

            $error: {}
        };

        _this.$name = props.name;

        _this.$handler = {
            $$FIELD_UUID: Field.FIELD_UUID++,
            $$merge: _this.$$merge,
            $$triggerChange: function $$triggerChange(_ref) {
                var $newValue = _ref.$newValue,
                    $preValue = _ref.$preValue;
                return utils.isFunction(_this.props.$onFieldChange) && _this.props.$onFieldChange($newValue, $preValue, _this.$formContext.$formutil);
            },
            $name: _this.$name,
            $new: function $new() {
                return _this.$fieldutil;
            },
            $picker: _this.$getState,
            $getState: _this.$getState,
            $getComponent: function $getComponent() {
                return _this;
            },
            $reset: _this.$reset,
            $getFirstError: _this.$getFirstError,
            $render: _this.$render,
            $setValue: _this.$setValue,
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
        return _this;
    }

    _createClass(Field, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.isMounting = true;

            if (this.$formContext.$$register) {
                this.$formContext.$$register(this.$name, this.$handler);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.$formContext.$$unregister) {
                this.$formContext.$$unregister(this.$name, this.$handler);
            }

            this.isMounting = false;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.name !== prevProps.name) {
                this.$name = this.$handler.$name = this.props.name;

                if (this.$formContext.$$register) {
                    if (this.$name) {
                        this.$formContext.$$register(this.$name, this.$handler, prevProps.name);
                    } else {
                        this.$formContext.$$unregister(prevProps.$name, this.$handler);
                    }
                }
            }
        }
    }, {
        key: '_render',
        value: function _render() {
            var _props = this.props,
                children = _props.children,
                render = _props.render,
                TheComponent = _props.component;

            var $fieldutil = this.$fieldutil = Object.assign({}, this.$state, this.$handler, {
                $$formutil: this.$formContext.$formutil
            });

            if (TheComponent) {
                return React.createElement(TheComponent, { $fieldutil: $fieldutil });
            }

            if (utils.isFunction(render)) {
                return render($fieldutil);
            }

            if (utils.isFunction(children)) {
                return children($fieldutil);
            }

            return Children.map(children, function (child) {
                return child && utils.isFunction(child.type) ? cloneElement(child, {
                    $fieldutil: $fieldutil
                }) : child;
            });
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

                    if (shouldInitial) {
                        _this2.$reset();
                    }

                    return _this2._render();
                }
            );
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
    $asyncValidators: PropTypes.object,

    $parser: PropTypes.func,
    $formatter: PropTypes.func
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.isMounting = false;

    this.$validate = function (callback) {
        var $validators = Object.assign({}, _this3.props.$validators, _this3.props.$asyncValidators);

        var _$state = _this3.$state,
            $value = _$state.$value,
            $newError = _objectWithoutProperties(_$state.$error, []);

        var $formutil = _this3.$formContext.$formutil;


        var promises = Object.keys($validators).reduce(function (promises, key) {
            delete $newError[key];

            if (_this3.props[key] != null) {
                var result = $validators[key]($value, _this3.props[key], Object.assign({}, _this3.props, {
                    $formutil: $formutil
                }));

                if (utils.isPromise(result)) {
                    promises.push(result.catch(function (reason) {
                        return _this3.$setValidity(key, reason instanceof Error ? reason.message : reason);
                    }));
                } else if (result !== true) {
                    $newError[key] = result;
                }
            }

            return promises;
        }, []);

        if (promises.length) {
            _this3.$setPending(true);
            Promise.all(promises).then(function () {
                return _this3.$setPending(false);
            });
        }

        return _this3.$setError($newError, callback);
    };

    this.$$merge = function (_ref2) {
        var $newState = _objectWithoutProperties(_ref2, []);

        if ('$error' in $newState) {
            if (!$newState.$error) {
                $newState.$error = {};
            }

            $newState.$valid = Object.keys($newState.$error).length === 0;
        }

        // process $value
        var _props2 = _this3.props,
            $parser = _props2.$parser,
            $formatter = _props2.$formatter;


        if ('$viewValue' in $newState && !('$value' in $newState)) {
            var $setViewValue = function $setViewValue($value) {
                return $newState.$viewValue = $value;
            };

            $newState.$value = $parser ? $parser($newState.$viewValue, $setViewValue) : $newState.$viewValue;
        } else if ('$value' in $newState && !('$viewValue' in $newState)) {
            var $setModelValue = function $setModelValue($value) {
                return $newState.$value = $value;
            };

            $newState.$viewValue = $formatter ? $formatter($newState.$value, $setModelValue) : $newState.$value;
        }

        // process $valid/$invalid
        if ('$valid' in $newState) {
            $newState.$invalid = !$newState.$valid;
        } else if ('$invalid' in $newState) {
            $newState.$dirty = !$newState.$invalid;
        }

        // process $dirty/$pristine
        if ('$dirty' in $newState) {
            $newState.$pristine = !$newState.$dirty;
        } else if ('$pristine' in $newState) {
            $newState.$dirty = !$newState.$pristine;
        }

        // process $touched/$untouched
        if ('$touched' in $newState) {
            $newState.$untouched = !$newState.$touched;
        } else if ('$untouched' in $newState) {
            $newState.$touched = !$newState.$untouched;
        }

        _this3.$state = Object.assign({}, _this3.$state, $newState);

        if ('$value' in $newState) {
            _this3.$preValue = _this3.$state.$value;

            _this3.$validate();
        }

        return _this3.$handler.$getState();
    };

    this.$getState = function () {
        return Object.assign({}, _this3.$state);
    };

    this.$setState = function ($newState, callback) {
        if (_this3.isMounting) {
            if (_this3.$name && _this3.$formContext.$$onChange) {
                _this3.$formContext.$$onChange(_this3.$name, $newState, callback);
            } else {
                _this3.$$merge($newState);

                _this3.forceUpdate(function () {
                    utils.isFunction(callback) && callback();

                    var $onFieldChange = _this3.props.$onFieldChange;


                    if ('$value' in $newState && utils.isFunction($onFieldChange) && _this3.$state.$value !== _this3.$preValue) {
                        $onFieldChange(_this3.$state.$value, _this3.$preValue);
                    }
                });
            }

            return _this3.$handler.$getState();
        }

        return _this3.$$merge($newState);
    };

    this.$reset = function ($newState) {
        var $initialState = void 0;
        var context = _this3.$formContext;

        if (_this3.$name && context.$$defaultValues) {
            var $initialValue = utils.parsePath(context.$$defaultValues, _this3.$name);

            $initialState = utils.parsePath(context.$$defaultStates, _this3.$name) || {};

            if (!utils.isUndefined($initialValue)) {
                $initialState.$value = $initialValue;
            }
        }

        return _this3.$$merge(Object.assign({}, _this3.$baseState, _this3.props.$defaultState, { // self default state
            $value: '$defaultValue' in _this3.props ? _this3.props.$defaultValue : ''
        }, $initialState, $newState));
    };

    this.$render = function ($viewValue, callback) {
        return _this3.$setState({
            $viewValue: $viewValue,
            $dirty: true
        }, callback);
    };

    this.$setValue = function ($value, callback) {
        return _this3.$setState({
            $value: $value
        }, callback);
    };

    this.$setPending = function ($pending, callback) {
        return _this3.$setState({
            $pending: $pending
        }, callback);
    };

    this.$setTouched = function ($touched, callback) {
        return _this3.$setState({
            $touched: $touched
        }, callback);
    };

    this.$setDirty = function ($dirty, callback) {
        return _this3.$setState({
            $dirty: $dirty
        }, callback);
    };

    this.$setFocused = function ($focused, callback) {
        return _this3.$setState({
            $focused: $focused
        }, callback);
    };

    this.$setError = function ($error, callback) {
        return _this3.$setState({
            $error: $error
        }, callback);
    };

    this.$setValidity = function (key) {
        var valid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var callback = arguments[2];

        var $newError = _objectWithoutProperties(_this3.$state.$error, []);

        if (valid === true) {
            delete $newError[key];
        } else {
            $newError[key] = valid;
        }

        return _this3.$setError($newError, callback);
    };

    this.$getFirstError = function () {
        var _$state$$error = _this3.$state.$error,
            $error = _$state$$error === undefined ? {} : _$state$$error;

        for (var name in $error) {
            return $error[name];
        }
    };
}, _temp);


export default Field;