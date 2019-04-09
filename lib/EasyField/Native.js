function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';

var EasyFieldNative =
/*#__PURE__*/
function (_Component) {
  _inherits(EasyFieldNative, _Component);

  function EasyFieldNative() {
    _classCallCheck(this, EasyFieldNative);

    return _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldNative).apply(this, arguments));
  }

  _createClass(EasyFieldNative, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          $fieldutil = _this$props.$fieldutil,
          htmlValue = _this$props.value,
          _onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          checked = _this$props.checked,
          unchecked = _this$props.unchecked,
          others = _objectWithoutProperties(_this$props, ["$fieldutil", "value", "onChange", "onFocus", "onBlur", "checked", "unchecked"]);

      var htmlType = this.props.type;
      var htmlProps = {
        value: 'compositionValue' in this ? this.compositionValue : htmlValue,
        onCompositionEnd: function onCompositionEnd(ev) {
          _this.composition = false;
          delete _this.compositionValue;
          htmlProps.onChange(ev);
        },
        onCompositionStart: function onCompositionStart() {
          return _this.composition = true;
        },
        onChange: function onChange(ev) {
          var value = ev.target.value;

          if (_this.composition) {
            _this.compositionValue = value;

            _this.forceUpdate();
          } else {
            _onChange(value, ev);
          }
        },
        onFocus: onFocus,
        onBlur: onBlur
      };
      var Element = 'input';

      switch (htmlType) {
        case 'select':
          Element = htmlType;

          htmlProps.onChange = function (ev) {
            var node = ev.target;
            var value = node.multiple ? [].slice.call(node.options).filter(function (option) {
              return option.selected;
            }).map(function (option) {
              return option.value;
            }) : node.value;

            _onChange(value, ev);
          };

          delete others.type;
          break;

        case 'textarea':
          Element = htmlType;
          delete others.type;
          break;

        case 'checkbox':
        case 'radio':
          htmlProps = {
            checked: htmlValue === checked,
            onChange: function onChange(ev) {
              _onChange(ev.target.checked ? checked : unchecked, ev);
            },
            onFocus: onFocus,
            onBlur: onBlur
          };
          break;

        default:
          break;
      }

      return React.createElement(Element, Object.assign({}, others, htmlProps));
    }
  }]);

  return EasyFieldNative;
}(Component);

EasyFieldNative.displayName = 'React.Formutil.EasyField.Native';
EasyFieldNative.defaultProps = {
  value: '',
  type: 'text',
  checked: true,
  unchecked: false
};
export default EasyFieldNative;