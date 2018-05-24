var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

var Field = (_temp = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field(props, context) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

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
                        var _$valid = $validators[key]($value, _this.props[key]);

                        if (_$valid === true) {
                            delete $error[key];
                        } else {
                            $error[key] = _$valid;
                        }
                    } else {
                        delete $error[key];
                    }
                });

                var $valid = Object.keys($error).length === 0;

                return _this.$setState({
                    $error: $error,
                    $valid: $valid,
                    $invalid: !$valid
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
                            return _this.$setValidity(key, reason);
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

        _this.$setState = function ($newState, callback) {
            return _this.context.$$onChange(_this.$name, $newState, callback) && _this.$state;
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

        _this.$setValidity = function (key, valid) {
            var $error = _this.$state.$error;


            if (valid === true) {
                delete $error[key];
            } else {
                $error[key] = valid;
            }

            var $valid = Object.keys($error).length === 0;

            return _this.$setState({
                $error: $error,
                $valid: $valid,
                $invalid: !$valid
            });
        };

        _this.$state = Object.assign({
            $value: props.$defaultValue,

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $pending: false,

            $error: {}

        }, props.$defaultState);

        _this.$name = props.name;

        if (context.$$register) {
            context.$$register(props.name, _this.$handler = {
                picker: function picker() {
                    return _this.$state;
                },
                validate: function validate() {
                    _this.$syncValidate();
                    _this.$asyncValidate();
                },
                merge: function merge($newState) {
                    return Object.assign(_this.$state, $newState);
                }
            });
        } else {
            console.warn('react-formutil: The Field must be nesting inside the component that enhanced by the withForm(a High Order Component provided by react-formutil). ');
        }
        return _this;
    }

    _createClass(Field, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.$$unregister(this.props.name);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.name !== this.props.name) {
                this.$name = nextProps.name;
                this.context.$$register(nextProps.name, this.$handler, this.props.name);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            var childProps = Object.assign({
                $name: this.$name
            }, this.$state, {

                $render: this.$render,
                $setValue: this.$render,
                $setTouched: this.$setTouched,
                $setValidity: this.$setValidity,
                $setDirty: this.$setDirty,
                $setState: this.$setState
            });

            if (typeof children === 'function') {
                return children(childProps);
            }

            var child = Children.only(children);
            return cloneElement(child, childProps);
        }
    }]);

    return Field;
}(Component), _class.propTypes = {
    $defaultValue: PropTypes.any,
    $defaultState: PropTypes.object,
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,

    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object
}, _class.defaultProps = {
    $defaultValue: '',
    $defaultState: {}
}, _class.contextTypes = {
    $$register: PropTypes.func,
    $$unregister: PropTypes.func,
    $$onChange: PropTypes.func
}, _temp);


export default Field;