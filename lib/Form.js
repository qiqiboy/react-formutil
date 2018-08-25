var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
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

                if (!utils.isUndefined(data)) {
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
                    return (!utils.isUndefined($state.$value) || $state.$dirty) && utils.parsePath($params, path, $state.$value);
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
                    return (!utils.isUndefined($state.$value) || $state.$dirty) && ($params[path] = $state.$value);
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

                $getFirstError: function $getFirstError() {
                    for (var name in $formutil.$weakErrors) {
                        for (var key in $formutil.$weakErrors[name]) {
                            return $formutil.$weakErrors[name][key];
                        }
                    }
                },


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

            var _props = this.props,
                children = _props.children,
                render = _props.render,
                TheComponent = _props.component;


            if (TheComponent) {
                return React.createElement(TheComponent, { $formutil: $formutil });
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
    }]);

    return Form;
}(Component), _class.displayName = 'React.formutil.Form', _class.propTypes = {
    render: PropTypes.func,
    component: PropTypes.func,
    children: function children(props) {
        var pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);
        if (!props.render && !props.component) {
            pt = pt.isRequired;
        }

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        return pt.apply(undefined, [props].concat(_toConsumableArray(args)));
    },

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
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.$$registers = {};
    this.$$deepRegisters = {};
    this.$$defaultValues = JSON.parse(JSON.stringify(this.props.$defaultValues));

    this.$$register = function (name, $handler, preName) {
        if (preName && $handler.$$FIELD_UUID === _this3.$getField(preName).$$FIELD_UUID) {
            delete _this3.$$registers[preName];
            utils.objectClear(_this3.$$defaultValues, preName);

            _this3.$$fieldChangedQueue.push({
                name: preName,
                $preValue: _this3.$formutil.$weakParams[preName]
            });
        }

        if (name) {
            _this3.$$registers[name] = $handler;

            _this3.$$fieldChangedQueue.push({
                name: name,
                $newValue: $handler.$picker().$value
            });

            $handler.$validate();
        }

        if (name || preName) {
            _this3.creatDeepRegisters();
            _this3.$render();
        }
    };

    this.$$unregister = function (name, $handler) {
        if (name && $handler.$$FIELD_UUID === _this3.$getField(name).$$FIELD_UUID) {
            delete _this3.$$registers[name];
            utils.objectClear(_this3.$$defaultValues, name);

            _this3.$$fieldChangedQueue.push({
                name: name,
                $preValue: _this3.$formutil.$weakParams[name]
            });

            _this3.creatDeepRegisters();
            _this3.$render();
        }
    };

    this.$$fieldChangedQueue = [];

    this.$$triggerFormChange = function () {
        if (_this3.$$fieldChangedQueue.length) {
            var $$fieldChangedQueue = [].concat(_toConsumableArray(_this3.$$fieldChangedQueue));
            _this3.$$fieldChangedQueue.length = 0;

            var $newValues = {};
            var $preValues = {};
            var hasFormChanged = false;
            $$fieldChangedQueue.forEach(function (item) {
                if (item.$newValue !== item.$preValue) {
                    if ('$newValue' in item && '$preValue' in item) {
                        _this3.$getField(item.name).$$triggerChange(item);
                    }

                    '$newValue' in item && utils.parsePath($newValues, item.name, item.$newValue);
                    '$preValue' in item && utils.parsePath($preValues, item.name, item.$preValue);

                    hasFormChanged = true;
                }
            });

            if (hasFormChanged && utils.isFunction(_this3.props.$onFormChange)) {
                _this3.props.$onFormChange(_this3.$formutil, $newValues, $preValues);
            }
        }
    };

    this.creatDeepRegisters = function () {
        _this3.$$deepRegisters = {};

        utils.objectEach(_this3.$$registers, function (handler, name) {
            return utils.parsePath(_this3.$$deepRegisters, name, handler);
        });
    };

    this.$getField = function (name) {
        return _this3.$$registers[name] || utils.parsePath(_this3.$$deepRegisters, name);
    };

    this.$$onChange = function (name, $state, callback) {
        return _this3.$setStates(_defineProperty({}, name, $state), callback);
    };

    this.$setStates = function ($stateTree, callback) {
        var $parsedTree = Object.assign({}, $stateTree);

        utils.objectEach($stateTree || {}, function (data, name) {
            return utils.parsePath($parsedTree, name, data);
        });

        utils.objectEach(_this3.$$registers, function (handler, name) {
            var $newState = $parsedTree[name] || utils.parsePath($parsedTree, name);
            if ($newState) {
                if ('$value' in $newState) {
                    var $newValue = $newState.$value;
                    var $preValue = _this3.$formutil.$weakParams[name];
                    var findItem = utils.arrayFind(_this3.$$fieldChangedQueue, function (item) {
                        return item.name === name;
                    });

                    if (findItem) {
                        findItem.$newValue = $newValue;
                    } else {
                        _this3.$$fieldChangedQueue.push({
                            name: name,
                            $newValue: $newValue,
                            $preValue: $preValue
                        });
                    }
                }

                handler.$$merge($newState);
            }
        });

        _this3.$render(callback);
    };

    this.$render = function (callback) {
        return _this3.forceUpdate(function () {
            utils.isFunction(callback) && callback();

            _this3.$$triggerFormChange();
        });
    };

    this.$validates = function () {
        return utils.objectEach(_this3.$$registers, function (handler) {
            return handler.$validate();
        });
    };

    this.$validate = function (name) {
        return _this3.$getField(name).$validate();
    };

    this.$reset = function ($stateTree, callback) {
        if (utils.isFunction($stateTree)) {
            callback = $stateTree;
            $stateTree = {};
        }

        var $parsedTree = Object.assign({}, $stateTree);
        utils.objectEach($stateTree || {}, function (data, name) {
            return utils.parsePath($parsedTree, name, data);
        });

        return _this3.$setStates(utils.objectMap(_this3.$$registers, function (handler, name) {
            return handler.$$reset($parsedTree[name] || utils.parsePath($parsedTree, name));
        }), callback);
    };

    this.$setValues = function ($valueTree, callback) {
        return _this3.$setStates(_this3.fetchTreeFromRegisters($valueTree, function ($value) {
            return { $value: $value };
        }), callback);
    };

    this.$setFocuses = function ($focusedTree, callback) {
        return _this3.$setStates(_this3.fetchTreeFromRegisters($focusedTree, function ($focused) {
            return { $focused: $focused };
        }), callback);
    };

    this.$setDirts = function ($dirtyTree, callback) {
        return _this3.$setStates(_this3.fetchTreeFromRegisters($dirtyTree, function ($dirty) {
            return { $dirty: $dirty, $pristine: !$dirty };
        }), callback);
    };

    this.$setTouches = function ($touchedTree, callback) {
        return _this3.$setStates(_this3.fetchTreeFromRegisters($touchedTree, function ($touched) {
            return { $touched: $touched, $untouched: !$touched };
        }), callback);
    };

    this.$setErrors = function ($errorTree, callback) {
        return _this3.$setStates(_this3.fetchTreeFromRegisters($errorTree, function ($error) {
            return { $error: $error };
        }), callback);
    };

    this.$batchState = function ($state, callback) {
        return _this3.$setStates(utils.objectMap(_this3.$$registers, function () {
            return $state;
        }), callback);
    };

    this.$batchDirty = function ($dirty, callback) {
        return _this3.$batchState({
            $dirty: $dirty,
            $pristine: !$dirty
        }, callback);
    };

    this.$batchTouched = function ($touched, callback) {
        return _this3.$batchState({
            $touched: $touched,
            $untouched: !$touched
        }, callback);
    };

    this.$batchFocused = function ($focused, callback) {
        return _this3.$batchState({
            $focused: $focused
        }, callback);
    };
}, _temp2);


export default Form;