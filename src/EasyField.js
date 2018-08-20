import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { isFunction, isEmpty, isValidProp } from './utils';

/**
 * 提供对浏览器原生表单控件的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */
class EasyField extends Component {
    static displayName = 'React.formutil.EasyField';

    static propTypes = {
        type: PropTypes.string.isRequired,
        defaultValue: PropTypes.any,
        checked: PropTypes.any,
        unchecked: PropTypes.any,
        validMessage: PropTypes.object,
        render: PropTypes.func,

        $parser: PropTypes.func,
        $formatter: PropTypes.func
    };

    static childContextTypes = {
        $getFieldProps: PropTypes.func
    };

    static defaultValidators = [
        [
            'required',
            ($value, check, { type, checked }) =>
                type === 'checkbox' || type === 'radio' ? $value === checked : !!($value + '')
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

    static defaultProps = {
        type: 'text',
        checked: true,
        unchecked: false,
        validMessage: {},

        $parser: value => value,
        $formatter: value => value
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
            $parser,
            $formatter,
            validMessage,
            type: typeStr,
            checked,
            unchecked,
            onChange,
            onFocus,
            onBlur,
            ...otherProps
        } = this.props;

        const [type, groupType] = typeStr.split('.');

        const fieldProps = {
            name,
            $onFieldChange,
            $defaultState,
            $validators: {
                ...EasyField.defaultValidators,
                ...$validators
            },
            $asyncValidators,
            validMessage,
            type: typeStr,
            checked,
            unchecked
        };

        Object.keys({ ...fieldProps.$validators, ...$asyncValidators }).forEach(prop => {
            if (prop in otherProps && [undefined, null, false].indexOf(otherProps[prop]) < 0) {
                fieldProps[prop] = otherProps[prop];

                if (!isValidProp(prop)) {
                    delete otherProps[prop];
                }
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
                            $parser,
                            $formatter,
                            $groupType: groupType,
                            $FieldName: name
                        };

                        const { children, render, ...restProps } = otherProps;

                        const childProps = {
                            ...props,
                            Field: EasyFieldGroupItem
                        };

                        let childNodes;

                        if (render) {
                            childNodes = render(childProps);
                        } else if (isFunction(children)) {
                            childNodes = children(childProps);
                        } else {
                            childNodes = React.Children.map(
                                children,
                                child =>
                                    child && isFunction(child.type) ? React.cloneElement(child, childProps) : child
                            );
                        }

                        return <Element {...restProps}>{childNodes}</Element>;
                    }

                    let elemProps;

                    switch (type) {
                        case 'checkbox':
                        case 'radio':
                            elemProps = {
                                checked: $formatter(props.$value) === checked,
                                onChange: ev => {
                                    props.$render($parser(ev.target.checked ? checked : unchecked));
                                    onChange && onChange(ev);
                                }
                            };
                            break;

                        default:
                            elemProps = {
                                value: 'compositionValue' in this ? this.compositionValue : $formatter(props.$value),
                                onCompositionEnd: ev => {
                                    this.composition = false;
                                    delete this.compositionValue;
                                    elemProps.onChange(ev);
                                },
                                onCompositionStart: () => (this.composition = true),
                                onChange: ev => {
                                    const value = ev.target.value;

                                    if (this.composition) {
                                        this.compositionValue = value;
                                        this.forceUpdate();
                                    } else {
                                        props.$render($parser(value));
                                        onChange && onChange(ev);
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
            $groupType,
            $parser,
            $formatter
        } = this.context.$getFieldProps();

        const elemProps =
            $groupType === 'radio'
                ? {
                      checked: $formatter($fieldutil.$value) === $value,
                      onChange: ev => {
                          $fieldutil.$render($parser($value));

                          onChange && onChange(ev);
                          $onFieldChange && $onFieldChange(ev);
                      }
                  }
                : $groupType === 'checkbox'
                    ? {
                          checked: $formatter($fieldutil.$value).indexOf($value) > -1,
                          onChange: ev => {
                              $fieldutil.$render(
                                  $parser(
                                      ev.target.checked
                                          ? $fieldutil.$value.concat($value)
                                          : $fieldutil.$value.filter(value => value !== $value)
                                  )
                              );

                              onChange && onChange(ev);
                              $onFieldChange && $onFieldChange(ev);
                          }
                      }
                    : {
                          value: $formatter($fieldutil.$value),
                          onChange: ev => {
                              $fieldutil.$render($parser(ev.target.value));

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
