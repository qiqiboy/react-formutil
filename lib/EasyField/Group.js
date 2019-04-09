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

import React, { Component, Children, cloneElement } from 'react';
import createContext from 'create-react-context';
import { isFunction } from '../utils';
import warning from 'warning';
/** @type {any} */

var _createContext = createContext({}),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var EasyFieldGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(EasyFieldGroup, _Component);

  function EasyFieldGroup() {
    _classCallCheck(this, EasyFieldGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldGroup).apply(this, arguments));
  }

  _createClass(EasyFieldGroup, [{
    key: "getGroupContext",
    value: function getGroupContext() {
      return this.props;
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props = this.props,
          className = _this$props.className,
          Element = _this$props.groupNode,
          children = _this$props.children;
      var GroupOptionProps = {
        GroupOption: EasyFieldGroupOption,
        Field: DeprecatedEasyFieldGroupOption
      };
      var childNodes = isFunction(children) ? children(GroupOptionProps) : Children.map(children, function (child) {
        return cloneElement(child, GroupOptionProps);
      });

      if (Element === null) {
        return childNodes;
      }

      return React.createElement(Element, {
        className: className
      }, childNodes);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        value: this.getGroupContext()
      }, this._render());
    }
  }]);

  return EasyFieldGroup;
}(Component);

EasyFieldGroup.displayName = 'React.Formutil.EasyField.Group';
EasyFieldGroup.defaultProps = {
  type: 'checkbox',
  groupNode: 'div'
};

var EasyFieldGroupOption =
/*#__PURE__*/
function (_Component2) {
  _inherits(EasyFieldGroupOption, _Component2);

  function EasyFieldGroupOption() {
    _classCallCheck(this, EasyFieldGroupOption);

    return _possibleConstructorReturn(this, _getPrototypeOf(EasyFieldGroupOption).apply(this, arguments));
  }

  _createClass(EasyFieldGroupOption, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      warning('$value' in this.props, "You should pass a $value to <GroupOption />.");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          $value = _this$props2.$value,
          _onChange = _this$props2.onChange,
          _onFocus = _this$props2.onFocus,
          _onBlur = _this$props2.onBlur,
          others = _objectWithoutProperties(_this$props2, ["$value", "onChange", "onFocus", "onBlur"]);

      return React.createElement(Consumer, null, function ($groupHander) {
        var type = $groupHander.type,
            name = $groupHander.name;
        var elemProps = type === 'radio' ? {
          checked: $groupHander.value === $value,
          onChange: function onChange(ev) {
            $groupHander.onChange($value, ev);
            _onChange && _onChange(ev);
          }
        } : type === 'checkbox' ? {
          checked: $groupHander.value.indexOf($value) > -1,
          onChange: function onChange(ev) {
            $groupHander.onChange(ev.target.checked ? $groupHander.value.concat($value) : $groupHander.value.filter(function (value) {
              return value !== $value;
            }), ev);
            _onChange && _onChange(ev);
          }
        } : {
          value: $groupHander.value,
          onChange: function onChange(ev) {
            $groupHander.onChange(ev);
            _onChange && _onChange(ev);
          }
        };
        return React.createElement("input", Object.assign({
          name: name
        }, others, elemProps, {
          type: type,
          onFocus: function onFocus(ev) {
            $groupHander.onFocus(ev);
            _onFocus && _onFocus(ev);
          },
          onBlur: function onBlur(ev) {
            $groupHander.onBlur(ev);
            _onBlur && _onBlur(ev);
          }
        }));
      });
    }
  }]);

  return EasyFieldGroupOption;
}(Component);

EasyFieldGroupOption.displayName = 'React.Formutil.EasyField.Group.Option';

var DeprecatedEasyFieldGroupOption =
/*#__PURE__*/
function (_Component3) {
  _inherits(DeprecatedEasyFieldGroupOption, _Component3);

  function DeprecatedEasyFieldGroupOption() {
    _classCallCheck(this, DeprecatedEasyFieldGroupOption);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeprecatedEasyFieldGroupOption).apply(this, arguments));
  }

  _createClass(DeprecatedEasyFieldGroupOption, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      warning(false, "The \"Field\" property in EasyField's children-props has been deprecated. Please use \"GroupOption\" instead.");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(EasyFieldGroupOption, this.props);
    }
  }]);

  return DeprecatedEasyFieldGroupOption;
}(Component);

DeprecatedEasyFieldGroupOption.displayName = 'React.Formutil.EasyField.Group.Option.Deprecated';
export default EasyFieldGroup;