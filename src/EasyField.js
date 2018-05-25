import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

/**
 * 提供对浏览器原生表单空间的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */
class EasyField extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        defaultValue: PropTypes.any,
        name: PropTypes.string,
        $validators: PropTypes.object,
        $asyncValidators: PropTypes.object,
        checked: PropTypes.any,
        unchecked: PropTypes.any,
        validMessage: PropTypes.object
    };

    static defaultProps = {
        type: 'text',
        checked: true,
        unchecked: false,
        validMessage: {}
    };

    render() {
        const {
            name,
            defaultValue,
            $defaultValue,
            $defaultState,
            $validators,
            $asyncValidators,
            validMessage,
            type,
            checked,
            unchecked,
            onChange,
            onBlur,
            ...otherProps
        } = this.props;

        const defaultErrMsg = 'Error';

        const fieldProps = {
            name,
            $validators: {
                required: $value =>
                    (type === 'checkbox' || type === 'radio' ? $value === checked : !!($value + '')) ||
                    validMessage.required ||
                    `${defaultErrMsg}: required`,
                maxLength: ($value, len) =>
                    !$value ||
                    $value.length <= len * 1 ||
                    validMessage.maxLength ||
                    `${defaultErrMsg}: maxLength: ${len}`,
                minLength: ($value, len) =>
                    !$value ||
                    $value.length >= len * 1 ||
                    validMessage.minLength ||
                    `${defaultErrMsg}: minLength: ${len}`,
                max: ($value, limit) =>
                    !$value || $value * 1 <= limit || validMessage.max || `${defaultErrMsg}: max: ${limit}`,
                min: ($value, limit) =>
                    !$value || $value * 1 >= limit || validMessage.min || `${defaultErrMsg}: min: ${limit}`,
                pattern: ($value, regexp) =>
                    !$value || regexp.test($value) || validMessage.pattern || `${defaultErrMsg}: pattern: ${regexp}`,
                ...$validators
            },
            $asyncValidators
        };

        Object.keys({ ...fieldProps.$validators, ...$asyncValidators }).forEach(prop => {
            if (prop in otherProps) {
                fieldProps[prop] = otherProps[prop];
                delete otherProps[prop];
            }
        });

        if ('defaultValue' in this.props) {
            fieldProps.$defaultValue = defaultValue;
        }

        if ('$defaultValue' in this.props) {
            fieldProps.$defaultValue = $defaultValue;
        }

        let Element;

        switch (type) {
            case 'select':
            case 'textarea':
                Element = type;
                break;

            default:
                Element = 'input';
                break;
        }

        return (
            <Field {...fieldProps}>
                {props => {
                    const elemProps =
                        type === 'radio' || type === 'checkbox'
                            ? {
                                  checked: props.$value === checked,
                                  onChange: ev => {
                                      props.$render(ev.target.checked ? checked : unchecked);
                                      if (onChange) {
                                          onChange(ev);
                                      }
                                  }
                              }
                            : {
                                  value: props.$value,
                                  onChange: ev => {
                                      props.$render(ev.target.value.trim());
                                      if (onChange) {
                                          onChange(ev);
                                      }
                                  }
                              };

                    return (
                        <Element
                            {...otherProps}
                            type={type}
                            name={name}
                            {...elemProps}
                            onBlur={ev => {
                                props.$setTouched(true);
                                if (onBlur) {
                                    onBlur(ev);
                                }
                            }}
                        />
                    );
                }}
            </Field>
        );
    }
}

export default EasyField;
