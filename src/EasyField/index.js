import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Native from './Native';
import Group from './Group';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';

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

        $parser: PropTypes.func,
        $formatter: PropTypes.func
    };

    static defaultProps = {
        validMessage: {},
        valuePropName: 'value',
        changePropName: 'onChange',
        $parser: value => value,
        $formatter: value => value
    };

    static defaultValidators = [
        [
            'required',
            ($value, check, { type, checked }) =>
                type === 'checkbox' || type === 'radio' ? $value === checked : !isEmpty($value)
        ],
        ['maxLength', ($value, len) => isEmpty($value) || $value.length <= len],
        ['minLength', ($value, len) => isEmpty($value) || $value.length >= len],
        ['max', ($value, limit) => isEmpty($value) || $value * 1 <= limit],
        ['min', ($value, limit) => isEmpty($value) || $value * 1 >= limit],
        ['pattern', ($value, regexp) => isEmpty($value) || regexp.test($value)],
        ['enum', ($value, enumeration) => isEmpty($value) || enumeration.indexOf($value) > -1],
        ['checker', ($value, checker) => checker($value)]
    ].reduce(($validators, item) => {
        const [validKey, validate] = item;
        $validators[validKey] = function validator($value, propValue, { validMessage = {} }) {
            return validate(...arguments) || validMessage[validKey] || `Error input: ${validKey}`;
        };
        return $validators;
    }, {});

    render() {
        const {
            $parser,
            $formatter,
            defaultValue,
            valuePropName,
            changePropName,
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
            ...otherProps
        } = fieldProps;

        let { children } = fieldProps;

        let isNative = !isUndefined(this.props.type);

        if (!('$defaultValue' in fieldProps) && 'defaultValue' in this.props) {
            fieldProps.$defaultValue = defaultValue;
        }

        Object.keys({
            ...(fieldProps.$validators = {
                ...EasyField.defaultValidators,
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
            let defaultValue;

            switch (htmlType) {
                case 'select':
                case 'textarea':
                    if (fieldProps.multiple) {
                        defaultValue = [];
                    }
                    break;

                case 'group':
                    if (groupType === 'checkbox') {
                        defaultValue = [];
                    }

                    otherProps.type = groupType;
                    break;

                case 'checkbox':
                case 'radio':
                    defaultValue = fieldProps.unchecked;
                    break;
                default:
                    break;
            }

            children = htmlType === 'group' ? <Group /> : <Native />;

            if (!('$defaultValue' in fieldProps) && !isUndefined(defaultValue)) {
                fieldProps.$defaultValue = defaultValue;
            }
        } else {
            delete otherProps.children;
        }

        return (
            <Field {...fieldProps}>
                {$util => {
                    const childProps = {
                        ...otherProps,

                        [valuePropName]: $formatter($util.$value),
                        [changePropName]: (value, ev) => {
                            if (!ev) {
                                ev = value;
                            }

                            const newValue = fetchValueFromEvent(value);
                            $util.$render($parser(newValue));

                            onChange && onChange(ev);
                        },
                        onFocus: ev => {
                            $util.$setFocused(true);

                            onFocus && onFocus(ev);
                        },
                        onBlur: ev => {
                            if ($util.$untouched) {
                                $util.$setTouched(true);
                            }

                            $util.$setFocused(false);

                            onBlur && onBlur(ev);
                        }
                    };

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
