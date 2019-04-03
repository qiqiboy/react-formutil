var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Form from '../Form';
import Field from '../Field';
import PropTypes from 'prop-types';
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
                } else if (JSON.stringify(_this.props.value) !== JSON.stringify($params.list)) {
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

        _this.insert = function (m, callback) {
            if (isFunction(m)) {
                var _ref3 = [callback, m];
                m = _ref3[0];
                callback = _ref3[1];
            }

            return _this.$setState(function (_ref4) {
                var items = _ref4.items;

                if (isUndefined(m)) {
                    items.push(_this.getId());
                } else {
                    items.splice(m, 0, _this.getId());
                }

                return { items: items };
            }, callback);
        };

        _this.remove = function (m, callback) {
            if (isFunction(m)) {
                var _ref5 = [callback, m];
                m = _ref5[0];
                callback = _ref5[1];
            }

            return _this.$setState(function (_ref6) {
                var items = _ref6.items;

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
        value: function getId() {
            return this.id++;
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
                $push: function $push(callback) {
                    return _this3.insert(callback);
                },
                $pop: function $pop(callback) {
                    return _this3.remove(callback);
                },
                $shift: function $shift(callback) {
                    return _this3.remove(0, callback);
                },
                $unshift: function $unshift(callback) {
                    return _this3.insert(0, callback);
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

                    return _this3.state.items.map(function (id, index) {
                        return React.createElement(Field, {
                            key: id,
                            required: true,
                            $defaultValue: null,
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
                                            } else if (JSON.stringify($fieldutil.$viewValue) !== JSON.stringify($params)) {
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