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

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.$$registers = {}, _this.$$register = function (name, picker) {
                _this.$$registers[name] = picker;
                _this.forceUpdate();
            }, _this.$$unregister = function (name) {
                delete _this.$$registers[name];
                _this.forceUpdate();
            }, _this.$$onChange = function (name) {
                return _this.$setState(name);
            }, _this.$setState = function (name) {
                var $newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (typeof name !== 'string') {
                    console.warn('The argument \'name\' of $setState need to be a string! You may want to use \'$batchState\'.');
                } else {
                    Object.assign(_this.$$registers[name](), $newState);

                    _this.forceUpdate();
                }
            }, _this.$setValue = function (name, $value) {
                return _this.$setState(name, {
                    $value: $value
                });
            }, _this.$setDirty = function (name, $dirty) {
                return _this.$setState(name, {
                    $dirty: $dirty,
                    $pristine: !$dirty
                });
            }, _this.$setTouched = function (name, $touched) {
                return _this.$setState(name, {
                    $touched: $touched,
                    $untouched: !$touched
                });
            }, _this.$batchState = function () {
                var $newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if ((typeof $newState === 'undefined' ? 'undefined' : _typeof($newState)) !== 'object') {
                    console.warn('$batchState need a Object as the obnly argument!');
                } else {
                    Object.keys(_this.$$registers).forEach(function (path) {
                        return Object.assign(_this.$$registers[path](), $newState);
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
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var $stateTree = Object.keys(this.$$registers).map(function (path) {
                    return {
                        path: path,
                        $state: _this2.$$registers[path]()
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

                var easyform = {
                    $state: $stateTree.reduce(function ($formState, _ref5) {
                        var path = _ref5.path,
                            $state = _ref5.$state;
                        return utils.parsePath($formState, path, $state);
                    }, {}),
                    $params: $stateTree.reduce(function (params, _ref6) {
                        var path = _ref6.path,
                            $state = _ref6.$state;
                        return utils.parsePath(params, path, $state.$value);
                    }, {}),
                    $error: $valid ? null : $stateTree.reduce(function ($error, _ref7) {
                        var path = _ref7.path,
                            $state = _ref7.$state;

                        if ($state.$invalid) {
                            return utils.parsePath($error, path, $state.$error);
                        }
                        return $error;
                    }, {}),
                    $weakState: $stateTree.reduce(function ($formState, _ref8) {
                        var path = _ref8.path,
                            $state = _ref8.$state;

                        $formState[path] = $state;
                        return $formState;
                    }, {}),
                    $weakParams: $stateTree.reduce(function (params, _ref9) {
                        var path = _ref9.path,
                            $state = _ref9.$state;

                        params[path] = $state.$value;
                        return params;
                    }, {}),
                    $weakError: $valid ? null : $stateTree.reduce(function ($error, _ref10) {
                        var path = _ref10.path,
                            $state = _ref10.$state;

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
                    $untouched: !$touched
                };

                return React.createElement(Form, Object.assign({}, this.props, { easyform: easyform }));
            }
        }]);

        return _class;
    }(Component), _class.displayName = 'WithForm.' + Form.name, _class.childContextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func
    }, _temp2;
}

export default withForm;