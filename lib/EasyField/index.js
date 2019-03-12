var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var EasyField = (_temp = _class = function (_Component) {
    _inherits(EasyField, _Component);

    function EasyField() {
        _classCallCheck(this, EasyField);

        return _possibleConstructorReturn(this, (EasyField.__proto__ || Object.getPrototypeOf(EasyField)).apply(this, arguments));
    }

    _createClass(EasyField, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _parseProps = parseProps(this.props),
                fieldProps = _parseProps.fieldProps,
                childProps = _parseProps.childProps,
                renderProps = _parseProps.renderProps;

            return React.createElement(Field, Object.assign({}, fieldProps, {
                children: function children($fieldutil) {
                    return renderField(createHandler($fieldutil, _this2.props, childProps), renderProps);
                }
            }));
        }
    }]);

    return EasyField;
}(Component), _class.displayName = displayName, _class.propTypes = propTypes, _class.defaultProps = defaultProps, _temp);


export default EasyField;