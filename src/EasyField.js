import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { isFunction, isEmpty, isUndefined, isValidProp } from './utils';

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
        groupNode: PropTypes.any,

        $parser: PropTypes.func,
        $formatter: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        checked: true,
        unchecked: false,
        validMessage: {},

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

    static childContextTypes = {
        $getFieldProps: PropTypes.func
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
            if (prop in otherProps) {
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

        let Element = 'input';
        let _defaultValue;

        switch (type) {
            case 'select':
            case 'textarea':
                Element = type;
                if (otherProps.multiple) {
                    _defaultValue = [];
                }
                break;

            case 'group':
                Element = 'div';
                if (groupType === 'checkbox') {
                    _defaultValue = [];
                }
                break;

            case 'checkbox':
            case 'radio':
                _defaultValue = unchecked;
                break;
            default:
                break;
        }

        if (!('$defaultValue' in fieldProps) && !isUndefined(_defaultValue)) {
            fieldProps.$defaultValue = _defaultValue;
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

                        const { children, render, groupNode: Element = 'div', ...restProps } = otherProps;

                        const childProps = {
                            ...props,
                            Field: DeprecatedEasyFieldGroupOption, // v0.2.21 deprecated
                            GroupOption: EasyFieldGroupOption
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

                        if (Element === null) {
                            return childNodes;
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

                        case 'select':
                            elemProps = {
                                value: $formatter(props.$value),
                                onChange: ev => {
                                    const node = ev.target;
                                    const value = node.multiple
                                        ? [].slice
                                              .call(node.options)
                                              .filter(option => option.selected)
                                              .map(option => option.value)
                                        : node.value;

                                    props.$render($parser(value));
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

class DeprecatedEasyFieldGroupOption extends Component {
    static displayName = 'React.formutil.EasyField.GroupOption.Deprecated';

    componentDidMount() {
        try {
            console.warn(
                `The "Field" property in EasyField's children-props has been deprecated. Please use "GroupOption" instead.`
            );
        } catch (err) {}
    }

    render() {
        return <EasyFieldGroupOption {...this.props} />;
    }
}

class EasyFieldGroupOption extends Component {
    static displayName = 'React.formutil.EasyField.GroupOption';

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
