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
            type: typeStr,
            checked,
            unchecked,
            onChange,
            onBlur,
            ...otherProps
        } = this.props;

        const defaultErrMsg = 'Error';
        const [type, groupType] = typeStr.split('.');

        const fieldProps = {
            name,
            $defaultState,
            $validators: {
                required: ($value, check) =>
                    check === false ||
                    (type === 'checkbox' || type === 'radio' ? $value === checked : !!($value + '')) ||
                    validMessage.required ||
                    `${defaultErrMsg}: required`,
                maxLength: ($value, len) =>
                    len === false ||
                    !$value ||
                    $value.length <= len * 1 ||
                    validMessage.maxLength ||
                    `${defaultErrMsg}: maxLength: ${len}`,
                minLength: ($value, len) =>
                    len === false ||
                    !$value ||
                    $value.length >= len * 1 ||
                    validMessage.minLength ||
                    `${defaultErrMsg}: minLength: ${len}`,
                max: ($value, limit) =>
                    limit === false ||
                    !$value ||
                    $value * 1 <= limit ||
                    validMessage.max ||
                    `${defaultErrMsg}: max: ${limit}`,
                min: ($value, limit) =>
                    limit === false ||
                    !$value ||
                    $value * 1 >= limit ||
                    validMessage.min ||
                    `${defaultErrMsg}: min: ${limit}`,
                pattern: ($value, regexp) =>
                    regexp === false ||
                    !$value ||
                    regexp.test($value) ||
                    validMessage.pattern ||
                    `${defaultErrMsg}: pattern: ${regexp}`,
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

            case 'group':
                Element = 'div';
                if (groupType === 'checkbox' && !('$defaultValue' in fieldProps)) {
                    fieldProps.$defaultValue = [];
                }
                break;

            default:
                Element = 'input';
                break;
        }

        return (
            <Field {...fieldProps}>
                {props => {
                    if (type === 'group') {
                        const { children, restProps } = otherProps;

                        const childProps = {
                            ...props,
                            Field: ({ $value, onChange, ...others }) => {
                                const elemProps =
                                    groupType === 'radio'
                                        ? {
                                              checked: props.$value === $value,
                                              onChange: ev => {
                                                  props.$render($value);

                                                  if (props.$untouched) {
                                                      props.$setTouched(true);
                                                  }

                                                  if (onChange) {
                                                      onChange(ev);
                                                  }
                                              }
                                          }
                                        : {
                                              checked: props.$value.indexOf($value) > -1,
                                              onChange: ev => {
                                                  props.$render(
                                                      ev.target.checked
                                                          ? props.$value.concat($value)
                                                          : props.$value.filter(value => value !== $value)
                                                  );

                                                  if (props.$untouched) {
                                                      props.$setTouched(true);
                                                  }

                                                  if (onChange) {
                                                      onChange(ev);
                                                  }
                                              }
                                          };

                                return <input {...others} {...elemProps} type={groupType} name={name} />;
                            }
                        };

                        childProps.Field.propTypes = {
                            $value: PropTypes.any.isRequired
                        };

                        return (
                            <Element {...restProps}>
                                {typeof children === 'function'
                                    ? children(childProps)
                                    : React.Children.map(children, child => React.cloneElement(child, childProps))}
                            </Element>
                        );
                    }

                    let elemProps;

                    switch (type) {
                        case 'checkbox':
                        case 'radio':
                            elemProps = {
                                checked: props.$value === checked,
                                onChange: ev => {
                                    props.$render(ev.target.checked ? checked : unchecked);
                                    if (onChange) {
                                        onChange(ev);
                                    }
                                }
                            };
                            break;

                        default:
                            elemProps = {
                                value: props.$value,
                                onChange: ev => {
                                    props.$render(ev.target.value.trim());
                                    if (onChange) {
                                        onChange(ev);
                                    }
                                }
                            };
                            break;
                    }

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
