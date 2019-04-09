function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import FormContext from './context';
import hoistStatics from 'hoist-non-react-statics';

function connect(WrappedComponent) {
  var Connect =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Connect, _Component);

    function Connect() {
      _classCallCheck(this, Connect);

      return _possibleConstructorReturn(this, _getPrototypeOf(Connect).apply(this, arguments));
    }

    _createClass(Connect, [{
      key: "render",
      value: function render() {
        var _this = this;

        return React.createElement(FormContext.Consumer, null, function (context) {
          return React.createElement(WrappedComponent, Object.assign({}, _this.props, {
            $formutil: context.$formutil
          }));
        });
      }
    }]);

    return Connect;
  }(Component);

  Connect.displayName = 'React.Formutil.connect.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');
  return hoistStatics(Connect, WrappedComponent);
}

export default connect;