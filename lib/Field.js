var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import PropTypes from 'prop-types';

var Field = (_temp = _class = function (_Component) {
    _inherits(Field, _Component);

    function Field(props, context) {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

        _this.onChange = function (value) {
            _this.$setState({
                $value: value,
                $dirty: true,
                $pristine: false
            });
        };

        _this.$validate = function () {
            var $validators = _this.props.$validators;
            var $value = _this.$state.$value;

            if ($validators) {
                var $error = Object.keys($validators).reduce(function ($error, key) {
                    if ($validators[key]($value, _this.props[key])) {
                        delete $error[key];
                    } else {
                        $error[key] = true;
                    }

                    return $error;
                }, _this.$state.$error || {});
                var $valid = Object.keys($error).length === 0;

                return Object.assign(_this.$state, {
                    $error: $error,
                    $valid: $valid,
                    $invalid: !$valid
                });
            }

            return _this.$state;
        };

        _this.$setState = function ($newState) {
            Object.assign(_this.$state, $newState);
            _this.context.$$onChange(_this.props.name);

            return _this.$state;
        };

        _this.$setTouched = function ($touched) {
            return _this.$setState({
                $touched: $touched,
                $untouched: !$touched
            });
        };

        _this.$setDirty = function ($dirty) {
            return _this.$setState({
                $dirty: $dirty,
                $pristine: !$dirty
            });
        };

        _this.$setValidity = function (key, valid) {
            var $error = _this.$state.$error;
            if (valid) {
                delete $error[key];
            } else {
                $error[key] = true;
            }
            var $valid = Object.keys($error).length === 0;

            return _this.$setState({
                $error: $error,
                $valid: $valid,
                $invalid: !$valid
            });
        };

        _this.$state = {
            $value: props.defaultValue,

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $error: {}
        };

        context.$$register(props.name, function () {
            return _this.$validate();
        });
        return _this;
    }

    _createClass(Field, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.$$unregister(this.props.name);
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;


            if (typeof children !== 'function') {
                console.warn('The children of Field must be a function!');
                return null;
            }

            var childProps = Object.assign({}, this.$state, {

                onChange: this.onChange,
                $setTouched: this.$setTouched,
                $setValidity: this.$setValidity,
                $setDirty: this.$setDirty,
                $setState: this.$setState
            });

            return children(childProps);
        }
    }]);

    return Field;
}(Component), _class.propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,

    $validators: PropTypes.object
}, _class.defaultProps = {
    defaultValue: ''
}, _class.contextTypes = {
    $$register: PropTypes.func,
    $$unregister: PropTypes.func,
    $$onChange: PropTypes.func
}, _temp);


export default Field;