import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Native from './Native';
import Group from './Group';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';

const TYPE = '__TYPE__';
const defaultValidators = [
    [
        'required',
        ($value, check, { __TYPE__, checked = true }) =>
            __TYPE__ === 'checked' ? $value === checked : !isEmpty($value)
    ],
    ['maxLength', ($value, len) => isEmpty($value) || $value.length <= len],
    ['minLength', ($value, len) => isEmpty($value) || $value.length >= len],
    ['max', ($value, limit) => isEmpty($value) || $value * 1 <= limit],
    ['min', ($value, limit) => isEmpty($value) || $value * 1 >= limit],
    ['pattern', ($value, regexp) => isEmpty($value) || regexp.test($value)],
    ['enum', ($value, enumeration) => isEmpty($value) || enumeration.indexOf($value) > -1],
    ['checker', ($value, checker, props) => checker($value, props)]
].reduce(($validators, item) => {
    const [validKey, validate] = item;
    $validators[validKey] = function validator($value, propValue, { validMessage = {} }) {
        return validate(...arguments) || validMessage[validKey] || `Error input: ${validKey}`;
    };
    return $validators;
}, {});

/**
 * 提供对浏览器原生表单控件的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */
class EasyField extends Component {
    static displayName = 'React.Formutil.EasyField';

    static propTypes = {
        type(props, ...args) {
            let pt = PropTypes.string;

            if (!props.children && !props.component && !props.render) {
                pt = pt.isRequired;
            }

            return pt(props, ...args);
        },
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        component: PropTypes.func,
        render: PropTypes.func,

        defaultValue: PropTypes.any,
        validMessage: PropTypes.object,

        valuePropName: PropTypes.string,
        changePropName: PropTypes.string,
        focusPropName: PropTypes.string,
        blurPropName: PropTypes.string,

        $parser: PropTypes.func,
        $formatter: PropTypes.func,

        passUtil: PropTypes.string
    };

    static defaultProps = {
        validMessage: {},
        valuePropName: 'value',
        changePropName: 'onChange',
        focusPropName: 'onFocus',
        blurPropName: 'onBlur',
        $parser: value => value,
        $formatter: value => value
    };

    render() {
        const {
            $parser,
            $formatter,
            defaultValue,
            valuePropName,
            changePropName,
            focusPropName,
            blurPropName,
            render,
            component: TheComponent,
            onChange,
            onFocus,
            onBlur,
            ...fieldProps
        } = this.props;

        const fetchValueFromEvent = function(ev) {
            return ev && ev.target ? ev.target[valuePropName] : ev;
        };

        const {
            $defaultValue,
            $defaultState,
            $onFieldChange,
            $validators,
            $asyncValidators,
            validMessage,
            passUtil,
            __TYPE__,
            ...otherProps
        } = fieldProps;

        let { children } = fieldProps;

        let isNative =
            !isUndefined(this.props.type) || (!this.props.children && !this.props.component && !this.props.render);

        if (!('$defaultValue' in fieldProps) && 'defaultValue' in this.props) {
            fieldProps.$defaultValue = defaultValue;
        }

        Object.keys({
            ...(fieldProps.$validators = {
                ...defaultValidators,
                ...$validators
            }),
            ...$asyncValidators
        }).forEach(prop => {
            if (prop in otherProps) {
                if (!isNative || !isValidProp(prop)) {
                    delete otherProps[prop];
                }
            }
        });

        if (isNative) {
            const [htmlType = 'text', groupType] = (fieldProps.type || '').split('.');

            switch (htmlType) {
                case 'select':
                case 'textarea':
                    if (fieldProps.multiple) {
                        fieldProps[TYPE] = 'array';
                    }
                    break;

                case 'group':
                    if (groupType === 'checkbox') {
                        fieldProps[TYPE] = 'array';
                    }

                    otherProps.type = groupType;
                    break;

                case 'checkbox':
                case 'radio':
                    fieldProps[TYPE] = 'checked';
                    break;

                default:
                    break;
            }

            children = htmlType === 'group' ? <Group /> : <Native />;
        } else {
            delete otherProps.children;
        }

        if (!('$defaultValue' in fieldProps) && TYPE in fieldProps) {
            let defaultValue;
            switch (fieldProps[TYPE]) {
                case 'checked':
                    const { unchecked = false } = fieldProps;
                    defaultValue = unchecked;
                    break;
                case 'array':
                    defaultValue = [];
                    break;
                case 'object':
                    defaultValue = {};
                    break;
                case 'number':
                    defaultValue = 0;
                    break;
                case 'empty':
                default:
                    break;
            }

            fieldProps.$defaultValue = defaultValue;
        }

        return (
            <Field {...fieldProps}>
                {$util => {
                    const childProps = {
                        ...otherProps,

                        [valuePropName]: $formatter($util.$value),
                        [changePropName]: (...args) => {
                            let value = args[0];
                            let ev = args[args.length - 1];

                            if (!ev || !ev.target) {
                                ev = args;
                            } else {
                                ev = [ev];
                            }

                            const newValue = fetchValueFromEvent(value);
                            $util.$render($parser(newValue));

                            onChange && onChange(...ev);
                        },
                        [focusPropName]: (...args) => {
                            $util.$setFocused(true);

                            onFocus && onFocus(...args);
                        },
                        [blurPropName]: (...args) => {
                            if ($util.$untouched) {
                                $util.$setTouched(true);
                            }

                            $util.$setFocused(false);

                            onBlur && onBlur(...args);
                        }
                    };

                    if (passUtil) {
                        childProps[passUtil] = $util;
                    }

                    if (TheComponent) {
                        return <TheComponent {...childProps} />;
                    }

                    if (isFunction(render)) {
                        return render(childProps);
                    }

                    if (isFunction(children)) {
                        return children(childProps);
                    }

                    return Children.map(children, child => cloneElement(child, childProps));
                }}
            </Field>
        );
    }
}

export default EasyField;
