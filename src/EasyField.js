import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import * as utils from './utils';

/**
 * 提供对浏览器原生表单控件的封装
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

    static childContextTypes = {
        $getFieldProps: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        checked: true,
        unchecked: false,
        validMessage: {}
    };

    getChildContext() {
        return {
            $getFieldProps: () => this.$fieldProps
        };
    }

    render() {
        const {
            name,
            defaultValue,
            $defaultValue,
            $defaultState,
            $validators,
            $asyncValidators,
            $onFieldChange,
            validMessage,
            type: typeStr,
            checked,
            unchecked,
            onChange,
            onFocus,
            onBlur,
            ...otherProps
        } = this.props;

        const defaultErrMsg = 'Error';
        const [type, groupType] = typeStr.split('.');

        const fieldProps = {
            name,
            $onFieldChange,
            $defaultState,
            $validators: {
                required: ($value, check) =>
                    check === false ||
                    (type === 'checkbox' || type === 'radio' ? $value === checked : !!($value + '')) ||
                    validMessage.required ||
                    `${defaultErrMsg}: required`,
                maxLength: ($value, len) =>
                    len === false ||
                    utils.isEmpty($value) ||
                    $value.length <= len * 1 ||
                    validMessage.maxLength ||
                    `${defaultErrMsg}: maxLength: ${len}`,
                minLength: ($value, len) =>
                    len === false ||
                    utils.isEmpty($value) ||
                    $value.length >= len * 1 ||
                    validMessage.minLength ||
                    `${defaultErrMsg}: minLength: ${len}`,
                max: ($value, limit) =>
                    limit === false ||
                    utils.isEmpty($value) ||
                    $value * 1 <= limit ||
                    validMessage.max ||
                    `${defaultErrMsg}: max: ${limit}`,
                min: ($value, limit) =>
                    limit === false ||
                    utils.isEmpty($value) ||
                    $value * 1 >= limit ||
                    validMessage.min ||
                    `${defaultErrMsg}: min: ${limit}`,
                pattern: ($value, regexp) =>
                    regexp === false ||
                    utils.isEmpty($value) ||
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
                        this.$fieldProps = {
                            $fieldutil: props,
                            $onFieldChange: onChange,
                            $onFieldFocus: onFocus,
                            $onFieldBlur: onBlur,
                            $groupType: groupType,
                            $FieldName: name
                        };

                        const { children, ...restProps } = otherProps;

                        const childProps = {
                            ...props,
                            Field: EasyFieldGroupItem
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
                                    onChange && onChange(ev);
                                }
                            };
                            break;

                        default:
                            elemProps = {
                                value: props.$value,
                                onChange: ev => {
                                    props.$render(ev.target.value.trim());
                                    onChange && onChange(ev);
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
                            onFocus={ev => {
                                props.$setFocused(true);

                                onFocus && onFocus(ev);
                            }}
                            onBlur={ev => {
                                if (props.$untouched) {
                                    props.$setTouched(true);
                                }

                                props.$setFocused(false);

                                onBlur && onBlur(ev);
                            }}
                        />
                    );
                }}
            </Field>
        );
    }
}

class EasyFieldGroupItem extends Component {
    static displayName = 'react.formutil.EasyField.GroupItem';

    static propTypes = {
        $value: PropTypes.any.isRequired
    };

    static contextTypes = {
        $getFieldProps: PropTypes.func
    };

    render() {
        const { $value, onChange, onFocus, onBlur, ...others } = this.props;
        const {
            $fieldutil,
            $onFieldChange,
            $onFieldFocus,
            $onFieldBlur,
            $FieldName,
            $groupType
        } = this.context.$getFieldProps();

        const elemProps =
            $groupType === 'radio'
                ? {
                      checked: $fieldutil.$value === $value,
                      onChange: ev => {
                          $fieldutil.$render($value);

                          onChange && onChange(ev);
                          $onFieldChange && $onFieldChange(ev);
                      }
                  }
                : $groupType === 'checkbox'
                    ? {
                          checked: $fieldutil.$value.indexOf($value) > -1,
                          onChange: ev => {
                              $fieldutil.$render(
                                  ev.target.checked
                                      ? $fieldutil.$value.concat($value)
                                      : $fieldutil.$value.filter(value => value !== $value)
                              );

                              onChange && onChange(ev);
                              $onFieldChange && $onFieldChange(ev);
                          }
                      }
                    : {
                          value: $fieldutil.$value,
                          onChange: ev => {
                              $fieldutil.$render(ev.target.value);

                              onChange && onChange(ev);
                              $onFieldChange && $onFieldChange(ev);
                          }
                      };

        return (
            <input
                {...others}
                {...elemProps}
                type={$groupType}
                name={$FieldName}
                onFocus={ev => {
                    $fieldutil.$setFocused(true);

                    onFocus && onFocus(ev);
                    $onFieldFocus && $onFieldFocus(ev);
                }}
                onBlur={ev => {
                    if ($fieldutil.$untouched) {
                        $fieldutil.$setTouched(true);
                    }

                    $fieldutil.$setFocused(false);

                    onBlur && onBlur(ev);
                    $onFieldBlur && $onFieldBlur(ev);
                }}
            />
        );
    }
}
export default EasyField;
