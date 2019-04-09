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
import { createHandler, GET_FIELD_UUID, propTypes, displayName, renderField } from './fieldHelper';
import FormContext from './context';
import warning from 'warning';
import { runCallback } from './utils';

var Field =
/*#__PURE__*/
function (_Component) {
  _inherits(Field, _Component);

  function Field() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Field);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Field)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.$$FIELD_UUID = GET_FIELD_UUID();

    _this.$setState = function ($newState, callback) {
      return new Promise(function (resolve) {
        var execute = function execute() {
          return resolve(runCallback(callback, _this.$fieldutil));
        };

        if (_this.isMounting) {
          var $name = _this.props.name;

          if ($name in (_this.$formContext.$$registers || {})) {
            _this.$formContext.$$onChange($name, $newState, execute);
          } else {
            _this.$registered.$$merge($newState);

            _this.$registered.$$detectChange($newState);

            _this.forceUpdate(execute);
          }
        } else {
          _this.$registered.$$merge($newState);

          execute();
        }
      });
    };

    return _this;
  }

  _createClass(Field, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounting = true;
      var $name = this.props.name,
          $formContext = this.$formContext;
      warning(!$name || $formContext.$formutil, "You should enusre that the <Field /> with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
      warning($name, "You should assign a name to <Field />, otherwise it will be isolated!");

      if ($formContext.$$register) {
        $formContext.$$register($name, this.$fieldHandler);
      }

      this.$prevValue = this.$state.$value;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.$formContext.$$unregister) {
        this.$formContext.$$unregister(this.props.name, this.$fieldHandler, this.props.$reserveOnUnmount);
      }

      this.isMounting = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var $name = this.props.name;

      if ($name !== prevProps.name) {
        if (this.$formContext.$$register) {
          this.$formContext.$$register($name, this.$fieldHandler, prevProps.name);
        }
      }

      if (this.$state.$value !== this.$prevValue) {
        if (!($name in (this.$formContext.$$registers || {}))) {
          this.$registered.$$triggerChange({
            $newValue: this.$state.$value,
            $prevValue: this.$prevValue
          });
        }

        this.$prevValue = this.$state.$value;
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var $fieldutil = this.$fieldutil = _objectSpread({
        $name: this.props.name
      }, this.$registered.$getState(), this.$registered, {
        $$formutil: this.$formContext.$formutil
      });

      return renderField($fieldutil, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var shouldInitial = !this.$formContext;
      return React.createElement(FormContext.Consumer, null, function (context) {
        _this2.$formContext = context;

        if (!_this2.$fieldHandler) {
          _this2.$fieldHandler = createHandler(_this2, _this2);
        }

        _this2.$registered = (context.$$registers || {})[_this2.$fieldHandler.$name] || _this2.$fieldHandler;

        if (shouldInitial) {
          _this2.$fieldHandler.$$reset();

          _this2.$fieldHandler.$validate();
        }

        return _this2._render();
      });
    }
  }]);

  return Field;
}(Component);

Field.displayName = displayName;
export default Field;