var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import Form from '../Form';
import Field from '../Field';
import { isUndefined, isFunction, runCallback } from '../utils';

var EasyFieldList = (_temp = _class = function (_Component) {
    _inherits(EasyFieldList, _Component);

    function EasyFieldList(props) {
        _classCallCheck(this, EasyFieldList);

        var _this = _possibleConstructorReturn(this, (EasyFieldList.__proto__ || Object.getPrototypeOf(EasyFieldList)).call(this, props));

        _this.id = 0;
        _this.latestValue = _this.props.value;
        _this.FieldValidators = {
            required: function required(value) {
                return value !== null;
            }
        };

        _this.$onFormChange = function ($formutil) {
            $formutil.$onValidates(function ($formutil) {
                var $invalid = $formutil.$invalid,
                    $params = $formutil.$params;


                if ($invalid) {
                    if (_this.props.value.length) {
                        _this.props.onChange(_this.latestValue = []);
                    }
                } else if (!isEqual(_this.props.value, $params.list)) {
                    _this.props.onChange(_this.latestValue = $params.list);
                }
            });
        };

        _this.swap = function (m, n, callback) {
            return _this.$setState(function (_ref) {
                var items = _ref.items;
                var _ref2 = [items[m], items[n]];
                items[n] = _ref2[0];
                items[m] = _ref2[1];


                return items;
            }, callback);
        };

        _this.insert = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var m = void 0,
                values = void 0,
                callback = void 0;

            args.forEach(function (arg) {
                if (isFunction(arg)) {
                    callback = arg;
                } else if (typeof arg === 'number') {
                    m = arg;
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
                    values = arg;
                }
            });

            return _this.$setState(function (_ref3) {
                var items = _ref3.items;

                if (isUndefined(m)) {
                    items.push(_this.getId(values));
                } else {
                    items.splice(m, 0, _this.getId(values));
                }

                return { items: items };
            }, callback);
        };

        _this.remove = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var m = void 0,
                callback = void 0;

            args.forEach(function (arg) {
                if (isFunction(arg)) {
                    callback = arg;
                } else if (typeof arg === 'number') {
                    m = arg;
                }
            });

            return _this.$setState(function (_ref4) {
                var items = _ref4.items;

                if (isUndefined(m)) {
                    items.pop();
                } else {
                    items.splice(m, 1);
                }

                if (!items.length) {
                    items = [_this.getId()];
                }

                return { items: items };
            }, callback);
        };

        _this.$setState = function (updater, callback) {
            return new Promise(function (resolve) {
                return _this.setState(updater, function () {
                    return _this.$formutil.$onValidates(function ($formutil) {
                        return resolve(runCallback(callback, $formutil));
                    });
                });
            });
        };

        _this.state = {
            items: props.value.length ? props.value.map(function () {
                return _this.getId();
            }) : [_this.getId()],
            formKey: 0
        };
        return _this;
    }

    _createClass(EasyFieldList, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _this2 = this;

            if (this.props.value !== this.latestValue) {
                this.setState({
                    items: this.props.value.length ? this.props.value.map(function () {
                        return _this2.getId();
                    }) : [this.getId()],
                    formKey: this.state.formKey + 1
                });

                this.latestValue = this.props.value;
            }
        }
    }, {
        key: 'getId',
        value: function getId(values) {
            return {
                id: this.id++,
                values: values
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                _children = _props.children,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                value = _props.value;


            if (!isFunction(_children)) {
                return null;
            }

            var $baseutil = {
                $length: this.state.items.length,
                $insert: this.insert,
                $remove: this.remove,
                $swap: this.swap,
                $push: function $push(values, callback) {
                    return _this3.insert(values, callback);
                },
                $pop: function $pop(callback) {
                    return _this3.remove(callback);
                },
                $shift: function $shift(callback) {
                    return _this3.remove(0, callback);
                },
                $unshift: function $unshift(values, callback) {
                    return _this3.insert(0, values, callback);
                },
                onFocus: onFocus,
                onBlur: onBlur
            };

            return React.createElement(Form, {
                key: this.state.formKey,
                $defaultValues: {
                    list: value
                },
                $onFormChange: this.$onFormChange,
                children: function children($formutil) {
                    _this3.$formutil = $formutil;

                    return _this3.state.items.map(function (_ref5, index) {
                        var id = _ref5.id,
                            values = _ref5.values;
                        return React.createElement(Field, {
                            key: id,
                            required: true,
                            $defaultValue: values || null,
                            $validators: _this3.FieldValidators,
                            name: 'list[' + index + ']',
                            children: function children($fieldutil) {
                                return React.createElement(Form, {
                                    $defaultValues: $fieldutil.$value || {},
                                    $onFormChange: function $onFormChange($formutil) {
                                        return $formutil.$onValidates(function ($formutil) {
                                            var $invalid = $formutil.$invalid,
                                                $params = $formutil.$params;


                                            if ($invalid) {
                                                if ($fieldutil.$viewValue !== null) {
                                                    $fieldutil.$render(null);
                                                }
                                            } else if (!isEqual($fieldutil.$viewValue, $params)) {
                                                $fieldutil.$render($params);
                                            }
                                        });
                                    },
                                    children: function children($innerFormutil) {
                                        return _children(Object.assign({}, $baseutil, $innerFormutil, {
                                            $index: index,
                                            $isLast: function $isLast() {
                                                return index === _this3.state.items.length - 1;
                                            },
                                            $isFirst: function $isFirst() {
                                                return index === 0;
                                            }
                                        }), $formutil);
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    }]);

    return EasyFieldList;
}(Component), _class.displayName = 'React.Formutil.EasyField.List', _class.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.array,

    children: PropTypes.func.isRequired
}, _temp);


export default EasyFieldList;