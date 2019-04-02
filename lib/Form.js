var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import * as utils from './utils';
import warning from 'warning';

export var FORM_VALIDATE_RESULT = 'FORM_VALIDATE_RESULT';

var requestFrame = void 0,
    cancelFrame = void 0;

if (typeof requestAnimationFrame === 'function') {
    requestFrame = requestAnimationFrame;
    cancelFrame = cancelAnimationFrame;
} else {
    requestFrame = setTimeout;
    cancelFrame = clearTimeout;
}

var Form = (_temp = _class = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _initialiseProps.call(_this);

        _this.$$defaultInitialize();
        return _this;
    }

    _createClass(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.$isMount = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.$isMount = false;
        }
    }, {
        key: 'getFormContext',
        value: function getFormContext() {
            return {
                $$registers: this.$$registers,
                $$register: this.$$register,
                $$unregister: this.$$unregister,
                $$onChange: this.$$onChange,
                $$getDefault: this.$$getDefault,
                $formutil: this.$formutil
            };
        }

        /**
         * @desc 注册或者替换(preName)Field
         */

    }, {
        key: '$$deepParseObject',
        value: function $$deepParseObject(mayWeakObj) {
            var deepObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            utils.objectEach(mayWeakObj, function (data, name) {
                return utils.parsePath(deepObj, name, data);
            });

            return deepObj;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            cancelFrame(this.$$triggerChangeTimer);

            // ensure this calls to access the newest $formutil
            this.$$triggerChangeTimer = requestFrame(function () {
                _this2.$$triggerFormChange();
            });
        }
    }, {
        key: '_render',
        value: function _render() {
            var $formutil = this.$formutil;
            var _props = this.props,
                children = _props.children,
                render = _props.render,
                component = _props.component;


            if (component) {
                return createElement(component, { $formutil: $formutil });
            }

            if (utils.isFunction(render)) {
                return render($formutil);
            }

            if (utils.isFunction(children)) {
                return children($formutil);
            }

            return Children.map(children, function (child) {
                return child && utils.isFunction(child.type) ? cloneElement(child, {
                    $formutil: $formutil
                }) : child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var $processer = this.props.$processer;

            var $stateArray = Object.keys(this.$$registers).map(function (path) {
                return {
                    path: path,
                    $state: _this3.$$registers[path].$getState()
                };
            });

            var $weakParams = utils.toObject($stateArray, function ($params, _ref) {
                var path = _ref.path,
                    $state = _ref.$state;

                if ($processer) {
                    $processer($state, path);
                }

                if ('$value' in $state && ($state.$dirty || !utils.isUndefined($state.$value))) {
                    $params[path] = $state.$value;
                }
            });

            var $pureParams = utils.toObject($stateArray, function ($params, _ref2) {
                var path = _ref2.path,
                    $state = _ref2.$state;
                return path in $weakParams && utils.parsePath($params, path, $weakParams[path]);
            });

            var $invalid = $stateArray.some(function (_ref3) {
                var $state = _ref3.$state;
                return $state.$invalid;
            });
            var $dirty = $stateArray.some(function (_ref4) {
                var $state = _ref4.$state;
                return $state.$dirty;
            });
            var $touched = $stateArray.some(function (_ref5) {
                var $state = _ref5.$state;
                return $state.$touched;
            });
            var $focused = $stateArray.some(function (_ref6) {
                var $state = _ref6.$state;
                return $state.$focused;
            });
            var $pending = this.$$formPending || $stateArray.some(function (_ref7) {
                var $state = _ref7.$state;
                return $state.$pending;
            });

            var $formutil = this.$formutil = {
                $$registers: this.$$registers,
                $$deepRegisters: this.$$deepRegisters,
                $states: utils.toObject($stateArray, function ($states, _ref8) {
                    var path = _ref8.path,
                        $state = _ref8.$state;
                    return utils.parsePath($states, path, $state);
                }),
                $params: Object.assign({}, this.$$defaultValues, $pureParams),
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
                $pendings: utils.toObject($stateArray, function ($pendings, _ref13) {
                    var path = _ref13.path,
                        $state = _ref13.$state;
                    return utils.parsePath($pendings, path, $state.$pending);
                }),

                $weakStates: utils.toObject($stateArray, function ($states, _ref14) {
                    var path = _ref14.path,
                        $state = _ref14.$state;
                    return $states[path] = $state;
                }),
                $weakParams: $weakParams,
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
                $weakPendings: utils.toObject($stateArray, function ($weakPendings, _ref19) {
                    var path = _ref19.path,
                        $state = _ref19.$state;
                    return $weakPendings[path] = $state.$pending;
                }),

                $getFirstError: function $getFirstError(name) {
                    if (name) {
                        var $fieldutil = $formutil.$getField(name);

                        return $fieldutil && $fieldutil.$getFirstError();
                    }

                    for (var _name in $formutil.$weakErrors) {
                        var $fieldError = $formutil.$weakErrors[_name];

                        for (var key in $fieldError) {
                            return $fieldError[key] instanceof Error ? $fieldError[key].message : $fieldError[key];
                        }
                    }
                },


                $render: this.$render,

                $getField: this.$getField,
                $onValidates: this.$onValidates,

                // get the newest $formutil
                $new: function $new() {
                    return _this3.$formutil;
                },

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

            return React.createElement(
                FormContext.Provider,
                { value: this.getFormContext() },
                this._render()
            );
        }
    }]);

    return Form;
}(Component), _class.displayName = 'React.Formutil.Form', _class.propTypes = {
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

    $defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    $defaultStates: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    $onFormChange: PropTypes.func,
    $validator: PropTypes.func,
    $processer: PropTypes.func
}, _class.defaultProps = {
    $defaultValues: {},
    $defaultStates: {}
}, _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.$$registers = {};
    this.$$deepRegisters = {};
    this.$$TODORegisters = {};
    this.$$TODOUnRegisters = {};

    this.$$batchRegister = function () {
        var $$TODORegisters = _this4.$$TODORegisters,
            $$TODOUnRegisters = _this4.$$TODOUnRegisters;


        utils.objectEach($$TODOUnRegisters, function (_ref20, name) {
            var $handler = _ref20.$handler,
                $$reserved = _ref20.$$reserved;

            if ($$reserved) {
                $handler.$$reserved = true;
            } else if (name in _this4.$$registers) {
                delete _this4.$$registers[name];

                _this4.$$fieldChangedQueue.push({
                    name: name,
                    $prevValue: $handler.$getState().$value
                });
            }

            delete $$TODOUnRegisters[name];
        });

        _this4.createDeepRegisters();

        utils.objectEach($$TODORegisters, function (_ref21, name) {
            var $handler = _ref21.$handler;

            var $curRegistered = _this4.$$getRegister(name);

            if ($curRegistered !== $handler) {
                if ($curRegistered) {
                    $handler.$$reset($curRegistered.$getState());

                    warning($curRegistered.$$reserved, 'The Field with a name \'' + name + '\' has been registered!');
                } else {
                    _this4.$$fieldChangedQueue.push({
                        name: name,
                        $newValue: $handler.$getState().$value
                    });

                    utils.preObjectClear(_this4.$$defaultValues, name);
                }
            }

            _this4.$$registers[name] = $handler;

            delete $$TODORegisters[name];
        });

        utils.objectClear(_this4.$$defaultValues);
        _this4.createDeepRegisters();
        _this4.$render();
    };

    this.$$register = function (name, $handler, prevName) {
        cancelFrame(_this4.$$registerTimer);

        if (name) {
            $handler.$name = name;
            _this4.$$TODORegisters[name] = {
                $handler: $handler
            };
        }

        if (prevName) {
            _this4.$$TODOUnRegisters[prevName] = {
                $handler: $handler
            };
        }

        if (_this4.$isMount) {
            _this4.$$registerTimer = requestFrame(_this4.$$batchRegister);
        } else {
            _this4.$$batchRegister();
        }
    };

    this.$$unregister = function (name, $handler, $$reserved) {
        cancelFrame(_this4.$$registerTimer);

        if (name) {
            _this4.$$TODOUnRegisters[name] = {
                $handler: $handler,
                $$reserved: $$reserved
            };
        }

        if (_this4.$isMount) {
            _this4.$$registerTimer = requestFrame(_this4.$$batchRegister);
        } else {
            _this4.$$batchRegister();
        }
    };

    this.$$defaultInitialize = function () {
        var _props2 = _this4.props,
            $defaultValues = _props2.$defaultValues,
            $defaultStates = _props2.$defaultStates;


        _this4.$$defaultValues = _this4.$$deepParseObject(JSON.parse(JSON.stringify(utils.isFunction($defaultValues) ? $defaultValues(_this4.props) || {} : $defaultValues)));
        _this4.$$defaultStates = _this4.$$deepParseObject(JSON.parse(JSON.stringify(utils.isFunction($defaultStates) ? $defaultStates(_this4.props) || {} : $defaultStates)));
    };

    this.$$getDefault = function () {
        return {
            $$defaultStates: _this4.$$defaultStates,
            $$defaultValues: _this4.$$defaultValues
        };
    };

    this.$$fieldChangedQueue = [];

    this.$$triggerFormChange = function () {
        if (_this4.$$fieldChangedQueue.length) {
            var $$fieldChangedQueue = [].concat(_toConsumableArray(_this4.$$fieldChangedQueue));

            _this4.$$fieldChangedQueue.length = 0;

            var $newValues = {};
            var $prevValues = {};
            var $$registers = _this4.$$registers;
            var hasFormChanged = false;

            $$fieldChangedQueue.forEach(function (item) {
                if (!(item.name in $$registers)) {
                    delete item.$newValue;
                }

                if (item.$newValue !== item.$prevValue) {
                    if ('$newValue' in item && '$prevValue' in item) {
                        var $handler = _this4.$$getRegister(item.name);

                        if ($handler) {
                            $handler.$$triggerChange(item);
                        }
                    }

                    '$newValue' in item && utils.parsePath($newValues, item.name, item.$newValue);
                    '$prevValue' in item && utils.parsePath($prevValues, item.name, item.$prevValue);

                    hasFormChanged = true;
                }
            });

            if (hasFormChanged) {
                if (utils.isFunction(_this4.props.$validator)) {
                    _this4.$$formValidate();
                }

                if (utils.isFunction(_this4.props.$onFormChange)) {
                    _this4.props.$onFormChange(_this4.$formutil, $newValues, $prevValues);
                }
            }
        }
    };

    this.createDeepRegisters = function () {
        return _this4.$$deepRegisters = _this4.$$deepParseObject(_this4.$$registers);
    };

    this.$$getRegister = function (name) {
        if (name) {
            var field = _this4.$$registers[name] || utils.parsePath(_this4.$$deepRegisters, name);

            if (field) {
                return field;
            }
        }
    };

    this.$$formValidate = function (callback) {
        return _this4.$$formValidatePromise = new Promise(function (resolve) {
            var $validator = _this4.props.$validator;


            var $breakAsyncHandler = void 0;
            var $shouldCancelPrevAsyncValidate = void 0;
            var prevCallback = void 0;
            var validation = void 0;

            var result = $validator(_this4.$formutil.$params, _this4.formtutil);
            var execCallback = function execCallback($formutil) {
                return resolve(utils.runCallback(callback, utils.runCallback(prevCallback, $formutil)));
            };

            if (utils.isPromise(result)) {
                if (!_this4.$$formPending) {
                    _this4.$$formPending = true;

                    _this4.$render();
                }

                $shouldCancelPrevAsyncValidate = function $shouldCancelPrevAsyncValidate(setCallback) {
                    return $breakAsyncHandler = setCallback(execCallback);
                };

                validation = result.then(function () {
                    return void 0;
                }, function (reason) {
                    return reason;
                }).then(function (reason) {
                    if ($breakAsyncHandler) {
                        return $breakAsyncHandler;
                    }

                    _this4.$shouldCancelPrevAsyncValidate = null;

                    _this4.$$formPending = false;

                    return _this4.$$setFormErrors(reason, execCallback);
                });
            } else {
                if (_this4.$$formPending) {
                    _this4.$$formPending = false;
                }

                validation = _this4.$$setFormErrors(result, execCallback);
            }

            if (_this4.$shouldCancelPrevAsyncValidate) {
                _this4.$shouldCancelPrevAsyncValidate(function (callback) {
                    prevCallback = callback;

                    return validation;
                });
            }

            _this4.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
        });
    };

    this.$$setFormErrors = function (validResults, callback) {
        if (validResults && (validResults instanceof Error || (typeof validResults === 'undefined' ? 'undefined' : _typeof(validResults)) !== 'object')) {
            warning(false, 'The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.');

            return _this4.$render(callback);
        }

        return _this4.$$setStates(validResults || {}, function (result, handler) {
            var _handler$$getState = handler.$getState(),
                _handler$$getState$$e = _handler$$getState.$error,
                $error = _handler$$getState$$e === undefined ? {} : _handler$$getState$$e;

            if (result) {
                return {
                    $error: Object.assign({}, $error, _defineProperty({}, FORM_VALIDATE_RESULT, result))
                };
            }

            if ($error[FORM_VALIDATE_RESULT]) {
                delete $error[FORM_VALIDATE_RESULT];

                return {
                    $error: $error
                };
            }

            return;
        }, callback, true);
    };

    this.$getField = function (name) {
        var field = _this4.$$getRegister(name);

        warning(!name || field, '$getField(\'' + name + '\') fail to find the matched Field. Maybe it has been unmounted.');
        warning(name, 'You should pass a name of the mounted Field to $getField().');

        if (field) {
            return field.$new();
        }
    };

    this.$$onChange = function (name, $state, callback) {
        return _this4.$setStates(_defineProperty({}, name, $state), callback);
    };

    this.$$setStates = function () {
        var $stateTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var processer = arguments[1];
        var callback = arguments[2];
        var force = arguments[3];

        var $parsedTree = _this4.$$deepParseObject($stateTree);
        var hasStateChange = false;

        utils.objectEach(_this4.$$registers, function (handler, name) {
            var data = name in $stateTree ? $stateTree[name] : utils.parsePath($parsedTree, name);

            if (!utils.isUndefined(data) || force) {
                var $newState = processer(data, handler);

                if ($newState) {
                    var $prevValue = _this4.$formutil.$weakParams[name];

                    var _handler$$$merge = handler.$$merge($newState),
                        $newValue = _handler$$$merge.$value;

                    handler.$$detectChange($newState);

                    if ('$value' in $newState || '$viewValue' in $newState) {
                        var findItem = utils.arrayFind(_this4.$$fieldChangedQueue, function (item) {
                            return item.name === name;
                        });

                        if (findItem) {
                            if (!('$prevValue' in findItem)) {
                                findItem.$prevValue = findItem.$newValue;
                            }

                            findItem.$newValue = $newValue;
                        } else {
                            _this4.$$fieldChangedQueue.push({
                                name: name,
                                $newValue: $newValue,
                                $prevValue: $prevValue
                            });
                        }
                    }

                    hasStateChange = true;
                }
            }
        });

        if (hasStateChange) {
            return _this4.$render(callback);
        }

        return Promise.resolve(utils.runCallback(callback, _this4.$formutil));
    };

    this.$render = function (callback) {
        return new Promise(function (resolve) {
            return _this4.forceUpdate(function () {
                return resolve(utils.runCallback(callback, _this4.$formutil));
            });
        });
    };

    this.$validates = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var callback = void 0;

        if (utils.isFunction(args[args.length - 1])) {
            callback = args.pop();
        }

        if (args.length) {
            var flatter = function flatter(names) {
                names.forEach(function (name) {
                    if (Array.isArray(name)) {
                        flatter(name);
                    } else {
                        var handler = _this4.$getField(name);

                        if (handler) {
                            handler.$validate();
                        }
                    }
                });
            };

            flatter(args);
        } else {
            utils.objectEach(_this4.$$registers, function (handler) {
                return handler.$validate();
            });

            if (utils.isFunction(_this4.props.$validator)) {
                _this4.$$formValidate();
            }
        }

        return _this4.$onValidates(callback);
    };

    this.$onValidates = function (callback) {
        var filedValidatePromises = Object.keys(_this4.$$registers).map(function (name) {
            return _this4.$$registers[name].$onValidate();
        });

        filedValidatePromises.push(_this4.$$formValidatePromise);

        return Promise.all(filedValidatePromises).then(function () {
            return utils.runCallback(callback, _this4.$formutil);
        });
    };

    this.$validate = function (name, callback) {
        var handler = _this4.$getField(name);

        if (handler) {
            return handler.$validate(callback);
        }

        return utils.runCallback(callback);
    };

    this.$reset = function ($stateTree, callback) {
        _this4.$$defaultInitialize();

        if (utils.isFunction($stateTree)) {
            callback = $stateTree;
            $stateTree = {};
        }

        return _this4.$$setStates($stateTree, function ($state, handler) {
            return handler.$$reset($state);
        }, callback, true);
    };

    this.$setStates = function ($stateTree, callback) {
        return _this4.$$setStates($stateTree, function ($state) {
            return $state;
        }, callback);
    };

    this.$setValues = function ($valueTree, callback) {
        _this4.$$deepParseObject($valueTree, _this4.$$defaultValues);

        return _this4.$$setStates($valueTree, function ($value) {
            return { $value: $value };
        }, callback);
    };

    this.$setFocuses = function ($focusedTree, callback) {
        return _this4.$$setStates($focusedTree, function ($focused) {
            return { $focused: $focused };
        }, callback);
    };

    this.$setDirts = function ($dirtyTree, callback) {
        return _this4.$$setStates($dirtyTree, function ($dirty) {
            return { $dirty: $dirty };
        }, callback);
    };

    this.$setTouches = function ($touchedTree, callback) {
        return _this4.$$setStates($touchedTree, function ($touched) {
            return { $touched: $touched };
        }, callback);
    };

    this.$setPendings = function ($pendingTree, callback) {
        return _this4.$$setStates($pendingTree, function ($pending) {
            return { $pending: $pending };
        }, callback);
    };

    this.$setErrors = function ($errorTree, callback) {
        return _this4.$$setStates($errorTree, function ($error) {
            return { $error: $error };
        }, callback);
    };

    this.$batchState = function ($state, callback) {
        return _this4.$setStates(utils.objectMap(_this4.$$registers, function () {
            return $state;
        }), callback);
    };

    this.$batchDirty = function ($dirty, callback) {
        return _this4.$batchState({
            $dirty: $dirty
        }, callback);
    };

    this.$batchTouched = function ($touched, callback) {
        return _this4.$batchState({
            $touched: $touched
        }, callback);
    };

    this.$batchFocused = function ($focused, callback) {
        return _this4.$batchState({
            $focused: $focused
        }, callback);
    };

    this.$batchPending = function ($pending, callback) {
        return _this4.$batchState({
            $pending: $pending
        }, callback);
    };

    this.$batchError = function ($error, callback) {
        return _this4.$batchState({
            $error: $error
        }, callback);
    };
}, _temp);


export default Form;