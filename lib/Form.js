var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

var Form = (_temp2 = _class = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.$$registers = {}, _this.$$deepRegisters = {}, _this.$$defaultValues = JSON.parse(JSON.stringify(_this.props.$defaultValues)), _this.$$register = function (name, $handler, preName) {
            if (preName && $handler.$$FIELD_UUID === _this.$$registers[name].$$FIELD_UUID) {
                delete _this.$$registers[preName];
                utils.objectClear(_this.$$defaultValues, preName);
            }

            if (name) {
                _this.$$registers[name] = $handler;

                $handler.$validate();
            }

            if (name || preName) {
                _this.creatDeepRigesters();
                _this.$render();
            }
        }, _this.$$unregister = function (name, $handler) {
            if (name && $handler.$$FIELD_UUID === _this.$$registers[name].$$FIELD_UUID) {
                delete _this.$$registers[name];
                utils.objectClear(_this.$$defaultValues, name);

                _this.creatDeepRigesters();
                _this.$render();
            }
        }, _this.creatDeepRigesters = function () {
            _this.$$deepRegisters = {};

            utils.objectEach(_this.$$registers, function (handler, name) {
                return utils.parsePath(_this.$$deepRegisters, name, handler);
            });
        }, _this.$getField = function (name) {
            return _this.$$registers[name] || utils.parsePath(_this.$$deepRegisters, name);
        }, _this.$$onChange = function (name, $state, callback) {
            return _this.$setStates(_defineProperty({}, name, $state), callback);
        }, _this.$setStates = function ($stateTree, callback) {
            var $parsedTree = Object.assign({}, $stateTree);
            var $newValues = {};
            var $preValues = {};
            var callbackQueue = [];

            utils.objectEach($stateTree || {}, function (data, name) {
                return utils.parsePath($parsedTree, name, data);
            });

            utils.objectEach(_this.$$registers, function (handler, name) {
                var $newState = $parsedTree[name] || utils.parsePath($parsedTree, name);
                if ($newState) {
                    handler.$$merge($newState);

                    if ('$value' in $newState) {
                        var $newValue = $newState.$value;
                        var $preValue = _this.$formutil.$weakParams[name];

                        if ($newValue !== $preValue) {
                            utils.parsePath($newValues, name, $newValue);
                            utils.parsePath($preValues, name, $preValue);

                            callbackQueue.push({
                                callback: handler.$$getFieldChangeHandler(),
                                args: [$newValue, $preValue]
                            });
                        }
                    }
                }
            });

            _this.$render(function () {
                callback && callback();

                if (Object.keys($newValues).length) {
                    var $onFormChange = _this.props.$onFormChange;


                    callbackQueue.push({
                        callback: $onFormChange,
                        args: [_this.$formutil, $newValues, $preValues]
                    });
                }

                callbackQueue.forEach(function (item) {
                    typeof item.callback === 'function' && item.callback.apply(item, _toConsumableArray(item.args));
                });
            });
        }, _this.$render = function (callback) {
            return _this.forceUpdate(callback);
        }, _this.$validates = function () {
            return utils.objectEach(_this.$$registers, function (handler) {
                return handler.$validate();
            });
        }, _this.$validate = function (name) {
            return _this.$getField(name).$validate();
        }, _this.$reset = function ($stateTree, callback) {
            if (typeof $stateTree === 'function') {
                callback = $stateTree;
                $stateTree = {};
            }

            var $parsedTree = Object.assign({}, $stateTree);
            utils.objectEach($stateTree || {}, function (data, name) {
                return utils.parsePath($parsedTree, name, data);
            });

            return _this.$setStates(utils.objectMap(_this.$$registers, function (handler, name) {
                return handler.$$reset($parsedTree[name] || utils.parsePath($parsedTree, name));
            }), callback);
        }, _this.$setValues = function ($valueTree, callback) {
            return _this.$setStates(_this.fetchTreeFromRegisters($valueTree, function ($value) {
                return { $value: $value };
            }), callback);
        }, _this.$setFocuses = function ($focusedTree, callback) {
            return _this.$setStates(_this.fetchTreeFromRegisters($focusedTree, function ($focused) {
                return { $focused: $focused };
            }), callback);
        }, _this.$setDirts = function ($dirtyTree, callback) {
            return _this.$setStates(_this.fetchTreeFromRegisters($dirtyTree, function ($dirty) {
                return { $dirty: $dirty, $pristine: !$dirty };
            }), callback);
        }, _this.$setTouches = function ($touchedTree, callback) {
            return _this.$setStates(_this.fetchTreeFromRegisters($touchedTree, function ($touched) {
                return { $touched: $touched, $untouched: !$touched };
            }), callback);
        }, _this.$setErrors = function ($errorTree, callback) {
            return _this.$setStates(_this.fetchTreeFromRegisters($errorTree, function ($error) {
                return { $error: $error };
            }), callback);
        }, _this.$batchState = function ($state, callback) {
            return _this.$setStates(utils.objectMap(_this.$$registers, function () {
                return $state;
            }), callback);
        }, _this.$batchDirty = function ($dirty, callback) {
            return _this.$batchState({
                $dirty: $dirty,
                $pristine: !$dirty
            }, callback);
        }, _this.$batchTouched = function ($touched, callback) {
            return _this.$batchState({
                $touched: $touched,
                $untouched: !$touched
            }, callback);
        }, _this.$batchFocused = function ($focused, callback) {
            return _this.$batchState({
                $focused: $focused
            }, callback);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                $$register: this.$$register,
                $$unregister: this.$$unregister,
                $$onChange: this.$$onChange,
                $$defaultValues: this.props.$defaultValues,
                $$defaultStates: this.props.$defaultStates,
                $formutil: this.$formutil
            };
        }

        /**
         * @desc 注册或者替换(preName)Field
         */

    }, {
        key: 'fetchTreeFromRegisters',
        value: function fetchTreeFromRegisters(dataTree, process) {
            var newTree = {};
            var parsedTree = Object.assign({}, dataTree);

            utils.objectEach(dataTree, function (data, name) {
                return utils.parsePath(parsedTree, name, data);
            });

            utils.objectEach(this.$$registers, function (handler, name) {
                var data = parsedTree[name] || utils.parsePath(parsedTree, name);

                if (typeof data !== 'undefined') {
                    utils.parsePath(newTree, name, process(data));
                }
            });

            return newTree;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var $stateArray = Object.keys(this.$$registers).map(function (path) {
                return {
                    path: path,
                    $state: _this2.$$registers[path].$picker()
                };
            });

            var $invalid = $stateArray.some(function (_ref2) {
                var $state = _ref2.$state;
                return $state.$invalid;
            });
            var $dirty = $stateArray.some(function (_ref3) {
                var $state = _ref3.$state;
                return $state.$dirty;
            });
            var $touched = $stateArray.some(function (_ref4) {
                var $state = _ref4.$state;
                return $state.$touched;
            });
            var $focused = $stateArray.some(function (_ref5) {
                var $state = _ref5.$state;
                return $state.$focused;
            });
            var $pending = $stateArray.some(function (_ref6) {
                var $state = _ref6.$state;
                return $state.$pending;
            });

            var $formutil = this.$formutil = {
                $$registers: this.$$registers,
                $$deepRegisters: this.$$deepRegisters,
                $states: utils.toObject($stateArray, function ($states, _ref7) {
                    var path = _ref7.path,
                        $state = _ref7.$state;
                    return utils.parsePath($states, path, $state);
                }),
                $params: utils.toObject($stateArray, function ($params, _ref8) {
                    var path = _ref8.path,
                        $state = _ref8.$state;
                    return utils.parsePath($params, path, $state.$value);
                }, Object.assign({}, this.$$defaultValues)),
                $errors: utils.toObject($stateArray, function ($errors, _ref9) {
                    var path = _ref9.path,
                        $state = _ref9.$state;

                    if ($state.$invalid) {
                        utils.parsePath($errors, path, $state.$error);
                    }
                }),
                $dirts: utils.toObject($stateArray, function ($dirts, _ref10) {
                    var path = _ref10.path,
                        $state = _ref10.$state;
                    return utils.parsePath($dirts, path, $state.$dirty);
                }),
                $touches: utils.toObject($stateArray, function ($touches, _ref11) {
                    var path = _ref11.path,
                        $state = _ref11.$state;
                    return utils.parsePath($touches, path, $state.$touched);
                }),
                $focuses: utils.toObject($stateArray, function ($focuses, _ref12) {
                    var path = _ref12.path,
                        $state = _ref12.$state;
                    return utils.parsePath($focuses, path, $state.$focused);
                }),

                $weakStates: utils.toObject($stateArray, function ($states, _ref13) {
                    var path = _ref13.path,
                        $state = _ref13.$state;
                    return $states[path] = $state;
                }),
                $weakParams: utils.toObject($stateArray, function ($params, _ref14) {
                    var path = _ref14.path,
                        $state = _ref14.$state;
                    return $params[path] = $state.$value;
                }),
                $weakErrors: utils.toObject($stateArray, function ($errors, _ref15) {
                    var path = _ref15.path,
                        $state = _ref15.$state;

                    if ($state.$invalid) {
                        $errors[path] = $state.$error;
                    }
                }),
                $weakDirts: utils.toObject($stateArray, function ($dirts, _ref16) {
                    var path = _ref16.path,
                        $state = _ref16.$state;
                    return $dirts[path] = $state.$dirty;
                }),
                $weakTouches: utils.toObject($stateArray, function ($touches, _ref17) {
                    var path = _ref17.path,
                        $state = _ref17.$state;
                    return $touches[path] = $state.$touched;
                }),
                $weakFocuses: utils.toObject($stateArray, function ($focuses, _ref18) {
                    var path = _ref18.path,
                        $state = _ref18.$state;
                    return $focuses[path] = $state.$focused;
                }),

                $render: this.$render,

                $getField: this.$getField,

                $setStates: this.$setStates,
                $setValues: this.$setValues,
                $setErrors: this.$setErrors,
                $setTouches: this.$setTouches,
                $setDirts: this.$setDirts,
                $setFocuses: this.$setFocuses,

                $batchState: this.$batchState,
                $batchTouched: this.$batchTouched,
                $batchDirty: this.$batchDirty,
                $batchFocused: this.$batchFocused,

                $reset: this.$reset,
                $validates: this.$validates,
                $validate: this.$validate,

                $valid: !$invalid,
                $invalid: $invalid,
                $dirty: $dirty,
                $pristine: !$dirty,
                $touched: $touched,
                $untouched: !$touched,
                $focused: $focused,
                $pending: $pending
            };

            var children = this.props.children;


            if (typeof children === 'function') {
                return children($formutil);
            }

            return Children.map(children, function (child) {
                return cloneElement(child, {
                    $formutil: $formutil
                });
            });
        }
    }]);

    return Form;
}(Component), _class.displayName = 'React.formutil.Form', _class.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
    $defaultValues: PropTypes.object,
    $defaultStates: PropTypes.object,
    $onFormChange: PropTypes.func
}, _class.childContextTypes = {
    $$register: PropTypes.func,
    $$unregister: PropTypes.func,
    $$onChange: PropTypes.func,
    $$defaultValues: PropTypes.object,
    $$defaultStates: PropTypes.object,
    $formutil: PropTypes.object
}, _class.defaultProps = {
    $defaultValues: {},
    $defaultStates: {}
}, _temp2);


export default Form;