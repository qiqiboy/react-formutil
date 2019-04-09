function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import Field from '../Field';
import { renderField, createHandler, parseProps, displayName, propTypes, defaultProps } from './easyFieldHandler';
/**
 * 提供对浏览器原生表单控件的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */

var EasyField =
/*#__PURE__*/
function (_Component) {
  _inherits(EasyField, _Component);

  function EasyField() {
    _classCallCheck(this, EasyField);

    return _possibleConstructorReturn(this, _getPrototypeOf(EasyField).apply(this, arguments));
  }

  _createClass(EasyField, [{
    key: "render",
    value: function render() {
      var _parseProps = parseProps(this.props),
          fieldProps = _parseProps.fieldProps,
          childProps = _parseProps.childProps,
          renderProps = _parseProps.renderProps;

      return React.createElement(Field, Object.assign({}, fieldProps, {
        children: function children($fieldutil) {
          return renderField(createHandler($fieldutil, fieldProps, childProps), renderProps);
        }
      }));
    }
  }]);

  return EasyField;
}(Component);

EasyField.displayName = displayName;
EasyField.defaultProps = defaultProps;
export default EasyField;