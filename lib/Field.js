var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

var Field = (_temp = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field(props, context) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

        _this.$validate = function () {
            _this.$syncValidate();
            _this.$asyncValidate();
        };

        _this.$syncValidate = function () {
            var _this$props = _this.props,
                $validators = _this$props.$validators,
                $asyncValidators = _this$props.$asyncValidators;
            var _this$$state = _this.$state,
                $value = _this$$state.$value,
                $error = _this$$state.$error;

            //clear async validators result

            if ($asyncValidators) {
                Object.keys($asyncValidators).forEach(function (key) {
                    if (key in $error) {
                        delete $error[key];
                    }
                });
            }

            if ($validators) {
                Object.keys($validators).forEach(function (key) {
                    if (key in _this.props) {
                        var $valid = $validators[key]($value, _this.props[key]);

                        if ($valid === true) {
                            delete $error[key];
                        } else {
                            $error[key] = $valid;
                        }
                    } else {
                        delete $error[key];
                    }
                });

                return _this.$setState({
                    $error: $error
                });
            }
        };

        _this.$asyncValidate = function () {
            var $asyncValidators = _this.props.$asyncValidators;
            var _this$$state2 = _this.$state,
                $value = _this$$state2.$value,
                $valid = _this$$state2.$valid;


            if ($valid && $asyncValidators) {
                var promises = Object.keys($asyncValidators).filter(function (key) {
                    return key in _this.props;
                }).reduce(function (promises, key) {
                    var promise = $asyncValidators[key]($value, _this.props[key]);

                    if (promise && typeof promise.then === 'function') {
                        return promises.concat(promise.then(function () {
                            return _this.$setValidity(key, true);
                        }, function (reason) {
                            return _this.$setValidity(key, reason === true ? false : reason);
                        }));
                    }

                    _this.$setValidity(key, promise);

                    return promises;
                }, []);

                if (promises.length) {
                    Promise.all(promises).then(function () {
                        return _this.$setPending(false);
                    });

                    _this.$setPending(true);
                }
            }
        };

        _this.$$merge = function ($newState) {
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

            Object.assign(_this.$state, $newState);

            if ('$value' in $newState) {
                _this.$validate();
            }

            return _this.$state;
        };

        _this.$setState = function ($newState, callback) {
            if (_this.$name) {
                _this.context.$$onChange(_this.$name, $newState, callback);
            } else {
                _this.$$merge($newState);
                _this.forceUpdate(callback);
            }

            return _this.$state;
        };

        _this.$render = function ($value, callback) {
            return _this.$setState({
                $value: $value,
                $dirty: true,
                $pristine: false
            }, callback);
        };

        _this.$setPending = function ($pending) {
            return _this.$setState({
                $pending: $pending
            });
        };

        _this.$setTouched = function ($touched) {
            return _this.$setState({
                $touched: $touched,
                $untouched: !$touched
            });
        };

        _this.$setDirty = function ($dirty) {
            return _this.$setState({
                $dirty: $dirty,
                $pristine: !$dirty
            });
        };

        _this.$setFocused = function ($focused) {
            return _this.$setState({
                $focused: $focused
            });
        };

        _this.$setError = function ($error) {
            return _this.$setState({
                $error: $error
            });
        };

        _this.$setValidity = function (key) {
            var valid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var $error = _this.$state.$error;


            if (valid === true) {
                delete $error[key];
            } else {
                $error[key] = valid;
            }

            return _this.$setError($error);
        };

        _this.$baseState = Object.assign({
            $value: props.$defaultValue,

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

        if (_this.$name) {
            var $initialValue = _this.$name in context.$$defaultValues ? context.$$defaultValues[_this.$name] : utils.parsePath(context.$$defaultValues, _this.$name);
            var $initialState = context.$$defaultStates[_this.$name] || utils.parsePath(context.$$defaultStates, _this.$name);

            if (typeof $initialValue !== 'undefined') {
                _this.$baseState.$value = $initialValue;
            }

            if ($initialState) {
                Object.assign(_this.$baseState, $initialState);
            }
        }

        _this.$handler = {
            $name: _this.$name,
            $picker: function $picker() {
                return _this.$state;
            },
            $getComponent: function $getComponent() {
                return _this;
            },
            $$merge: _this.$$merge,
            $$reset: function $$reset($newState) {
                return _this.$state = Object.assign({}, _this.$baseState, $newState);
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

                console.warn('react-formuitl: \'' + key + '\' has been deprecated, please use \'$' + key + '\' instead of it.');
                return (_this$$handler = _this.$handler)['$' + key].apply(_this$$handler, arguments);
            };
        });

        _this.$handler.$$reset();

        if (context.$$register) {
            context.$$register(_this.$name, _this.$handler);
        }
        return _this;
    }

    _createClass(Field, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.context.$$unregister) {
                this.context.$$unregister(this.$name);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.context.$$register && nextProps.name !== this.props.name) {
                this.context.$$register(this.$name = nextProps.name, this.$handler, this.props.name);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            var childProps = Object.assign({}, this.$state, this.$handler, {
                $$formutil: this.context.$formutil
            });

            if (typeof children === 'function') {
                return children(childProps);
            }

            return Children.map(children, function (child) {
                return cloneElement(child, childProps);
            });
        }
    }]);

    return Field;
}(Component), _class.displayName = 'React.formutil.Field', _class.propTypes = {
    $defaultValue: PropTypes.any,
    $defaultState: PropTypes.object,
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,

    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object
}, _class.defaultProps = {
    $defaultValue: ''
}, _class.contextTypes = {
    $$register: PropTypes.func,
    $$unregister: PropTypes.func,
    $$onChange: PropTypes.func,
    $$defaultValues: PropTypes.object,
    $$defaultStates: PropTypes.object,
    $formutil: PropTypes.object
}, _temp);


export default Field;