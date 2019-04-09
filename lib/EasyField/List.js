function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import isEqual from 'react-fast-compare';
import Form from '../Form';
import Field from '../Field';
import { isUndefined, isFunction, runCallback } from '../utils';

var EasyFieldList =
/*#__PURE__*/
function (_Component) {
  _inherits(EasyFieldList, _Component);

  function EasyFieldList(props) {
    var _this;

    _classCallCheck(this, EasyFieldList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldList).call(this, props));
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
      var m, values, callback;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (arg) {
        if (isFunction(arg)) {
          callback = arg;
        } else if (typeof arg === 'number') {
          m = arg;
        } else if (typeof arg === 'object') {
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

        return {
          items: items
        };
      }, callback);
    };

    _this.remove = function () {
      var m, callback;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

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

        return {
          items: items
        };
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
    key: "componentDidUpdate",
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
    key: "getId",
    value: function getId(values) {
      return {
        id: this.id++,
        values: values
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          _children = _this$props.children,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          value = _this$props.value;

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
              name: "list[".concat(index, "]"),
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
                    return _children(_objectSpread({}, $baseutil, $innerFormutil, {
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
}(Component);

EasyFieldList.displayName = 'React.Formutil.EasyField.List';
export default EasyFieldList;