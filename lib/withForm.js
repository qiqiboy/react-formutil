var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

function withForm(Form) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.$$registers = {}, _this.$$register = function (name, handler, preName) {
                if (preName) {
                    delete _this.$$registers[preName];
                }

                _this.$$registers[name] = handler;

                handler.validate();

                _this.forceUpdate();
            }, _this.$$unregister = function (name) {
                delete _this.$$registers[name];
                _this.forceUpdate();
            }, _this.$$onChange = function (name) {
                return _this.$setState(name);
            }, _this.$setState = function (name) {
                var $newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (typeof name === 'string') {
                    _this.$$updateFieldState(name, $newState);
                } else {
                    Object.keys(name).forEach(function (key) {
                        _this.$$updateFieldState(key, name[key]);
                    });
                }

                _this.forceUpdate();
            }, _this.$setValue = function (name, $value) {
                if (typeof name === 'string') {
                    _this.$$updateFieldState(name, {
                        $value: $value
                    });
                } else {
                    Object.keys(name).forEach(function (key) {
                        _this.$$updateFieldState(key, {
                            $value: name[key]
                        });
                    });
                }

                _this.forceUpdate();
            }, _this.$setDirty = function (name, $dirty) {
                if (typeof name === 'string') {
                    _this.$$updateFieldState(name, {
                        $dirty: $dirty,
                        $pristine: !$dirty
                    });
                } else {
                    Object.keys(name).forEach(function (key) {
                        _this.$$updateFieldState(key, {
                            $dirty: name[key],
                            $pristine: !name[key]
                        });
                    });
                }

                _this.forceUpdate();
            }, _this.$setTouched = function (name, $touched) {
                if (typeof name === 'string') {
                    _this.$$updateFieldState(name, {
                        $touched: $touched,
                        $untouched: !$touched
                    });
                } else {
                    Object.keys(name).forEach(function (key) {
                        _this.$$updateFieldState(key, {
                            $touched: name[key],
                            $untouched: !name[key]
                        });
                    });
                }

                _this.forceUpdate();
            }, _this.$batchState = function () {
                var $newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if ((typeof $newState === 'undefined' ? 'undefined' : _typeof($newState)) !== 'object') {
                    console.warn('$batchState need a Object as the only argument!');
                } else {
                    Object.keys(_this.$$registers).forEach(function (name) {
                        return _this.$$updateFieldState(name, $newState);
                    });

                    _this.forceUpdate();
                }
            }, _this.$batchDirty = function ($dirty) {
                return _this.$batchState({
                    $dirty: $dirty,
                    $pristine: !$dirty
                });
            }, _this.$batchTouched = function ($touched) {
                return _this.$batchState({
                    $touched: $touched,
                    $untouched: !$touched
                });
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(_class, [{
            key: 'getChildContext',
            value: function getChildContext() {
                return {
                    $$register: this.$$register,
                    $$unregister: this.$$unregister,
                    $$onChange: this.$$onChange
                };
            }

            /**
             * @desc 注册或者替换(preName)Field
             */

        }, {
            key: '$$updateFieldState',
            value: function $$updateFieldState(name, $newState) {
                if (name in this.$$registers) {
                    Object.assign(this.$$registers[name].picker(), $newState);

                    if ('$value' in $newState) {
                        this.$$registers[name].validate();
                    }
                } else {
                    console.warn('react-formutil: The Field: \'' + name + '\' is not existed!');
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var $stateTree = Object.keys(this.$$registers).map(function (path) {
                    return {
                        path: path,
                        $state: _this2.$$registers[path].picker()
                    };
                });

                var $valid = $stateTree.every(function (_ref2) {
                    var $state = _ref2.$state;
                    return $state.$valid;
                });
                var $dirty = $stateTree.some(function (_ref3) {
                    var $state = _ref3.$state;
                    return $state.$dirty;
                });
                var $touched = $stateTree.some(function (_ref4) {
                    var $state = _ref4.$state;
                    return $state.$touched;
                });
                var $pending = $stateTree.some(function (_ref5) {
                    var $state = _ref5.$state;
                    return $state.$pending;
                });

                var $formutil = {
                    $state: $stateTree.reduce(function ($formState, _ref6) {
                        var path = _ref6.path,
                            $state = _ref6.$state;
                        return utils.parsePath($formState, path, $state);
                    }, {}),
                    $params: $stateTree.reduce(function (params, _ref7) {
                        var path = _ref7.path,
                            $state = _ref7.$state;
                        return utils.parsePath(params, path, $state.$value);
                    }, {}),
                    $error: $valid ? null : $stateTree.reduce(function ($error, _ref8) {
                        var path = _ref8.path,
                            $state = _ref8.$state;

                        if ($state.$invalid) {
                            return utils.parsePath($error, path, $state.$error);
                        }
                        return $error;
                    }, {}),
                    $weakState: $stateTree.reduce(function ($formState, _ref9) {
                        var path = _ref9.path,
                            $state = _ref9.$state;

                        $formState[path] = $state;
                        return $formState;
                    }, {}),
                    $weakParams: $stateTree.reduce(function (params, _ref10) {
                        var path = _ref10.path,
                            $state = _ref10.$state;

                        params[path] = $state.$value;
                        return params;
                    }, {}),
                    $weakError: $valid ? null : $stateTree.reduce(function ($error, _ref11) {
                        var path = _ref11.path,
                            $state = _ref11.$state;

                        if ($state.$invalid) {
                            $error[path] = $state.$error;
                        }
                        return $error;
                    }, {}),

                    $setState: this.$setState,
                    $setValue: this.$setValue,
                    $setTouched: this.$setTouched,
                    $setDirty: this.$setDirty,

                    $batchState: this.$batchState,
                    $batchTouched: this.$batchTouched,
                    $batchDirty: this.$batchDirty,

                    $valid: $valid,
                    $invalid: !$valid,
                    $dirty: $dirty,
                    $pristine: !$dirty,
                    $touched: $touched,
                    $untouched: !$touched,
                    $pending: $pending
                };

                return React.createElement(Form, Object.assign({}, this.props, { $formutil: $formutil }));
            }
        }]);

        return _class;
    }(Component), _class.displayName = 'React.formutil.withForm.' + Form.name, _class.childContextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func
    }, _temp2;
}

export default withForm;