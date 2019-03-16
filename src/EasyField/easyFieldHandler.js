import { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import Native from './Native';
import Group from './Group';
import { isEmpty, isUndefined, isFunction, isValidProp } from '../utils';

export const TYPE = '__TYPE__';
export const defaultValidators = [
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

export const propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: PropTypes.func,
    render: PropTypes.func,

    defaultValue: PropTypes.any,
    validMessage: PropTypes.object,

    valuePropName: PropTypes.string,
    changePropName: PropTypes.string,
    focusPropName: PropTypes.string,
    blurPropName: PropTypes.string,

    passUtil: PropTypes.string
};

export const displayName = 'React.Formutil.EasyField';

export const defaultProps = {
    validMessage: {},
    valuePropName: 'value',
    changePropName: 'onChange',
    focusPropName: 'onFocus',
    blurPropName: 'onBlur',
    $parser: value => (typeof value === 'string' ? value.trim() : value)
};

export function createHandler($fieldutil, fieldProps, childProps) {
    const { valuePropName, changePropName, focusPropName, blurPropName, passUtil } = fieldProps;

    const fetchValueFromEvent = function(ev) {
        return ev && ev.target ? ev.target[valuePropName] : ev;
    };

    const $handleProps = {
        ...childProps,

        [valuePropName]: $fieldutil.$viewValue,
        [changePropName]: (...args) => {
            let value = args[0];
            let ev = args[args.length - 1];

            if (!ev || !ev.target) {
                ev = args;
            } else {
                ev = [ev];
            }

            const onChange = fieldProps[changePropName];
            onChange && onChange(...ev);

            const newValue = fetchValueFromEvent(value);
            $fieldutil.$render(newValue);
        },
        [focusPropName]: (...args) => {
            const onFocus = fieldProps[focusPropName];
            onFocus && onFocus(...args);

            $fieldutil.$setFocused(true);
        },
        [blurPropName]: (...args) => {
            const onBlur = fieldProps[blurPropName];
            onBlur && onBlur(...args);

            if ($fieldutil.$untouched) {
                $fieldutil.$setTouched(true);
            }

            $fieldutil.$setFocused(false);
        }
    };

    if (passUtil) {
        $handleProps[passUtil === true ? '$fieldutil' : passUtil] = $fieldutil;
    }

    return $handleProps;
}

export function parseProps(props) {
    const {
        children,
        component,
        render,

        ...fieldProps
    } = props;

    const {
        // filter all the props that accept by EasyField
        name,
        type,
        defaultValue,
        valuePropName,
        changePropName,
        focusPropName,
        blurPropName,
        validMessage,
        __TYPE__,
        passUtil,

        // filter all the props that accept by Field
        $defaultValue,
        $defaultState,
        $onFieldChange,
        $validators,
        $asyncValidators,
        $validateLazy,
        $parser,
        $formatter,

        ...childProps
    } = fieldProps;

    const renderProps = {
        children,
        component,
        render
    };

    const isNative = !isUndefined(type) || (isUndefined(children) && isUndefined(component) && isUndefined(render));

    Object.keys({
        ...(fieldProps.$validators = {
            ...defaultValidators,
            ...fieldProps.$validators
        }),
        ...fieldProps.$asyncValidators
    }).forEach(prop => {
        if (prop in childProps) {
            if (!isNative || !isValidProp(prop)) {
                delete childProps[prop];
            }
        }
    });

    if (isNative) {
        const [htmlType = 'text', groupType] = (type || '').split('.');

        renderProps.component = htmlType === 'group' ? Group : Native;

        // Native or Group need to pass 'name' | 'type' | 'children'
        if (name) {
            childProps.name = name;
        }

        if (type) {
            childProps.type = htmlType;
        }

        if (children) {
            childProps.children = children;
        }

        switch (htmlType) {
            case 'select':
            case 'textarea':
                if (props.multiple) {
                    fieldProps[TYPE] = 'array';
                }
                break;

            case 'group':
                if (groupType === 'checkbox') {
                    fieldProps[TYPE] = 'array';
                }

                childProps.type = groupType;
                break;

            case 'checkbox':
            case 'radio':
                fieldProps[TYPE] = 'checked';
                break;

            default:
                break;
        }
    }

    if (!('$defaultValue' in fieldProps) && 'defaultValue' in props) {
        fieldProps.$defaultValue = defaultValue;
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

    return {
        fieldProps,
        childProps,
        renderProps
    };
}

export function renderField($handleProps, props) {
    let { component, render, children } = props;

    if (component) {
        return createElement(component, $handleProps);
    }

    if (isFunction(render)) {
        return render($handleProps);
    }

    if (isFunction(children)) {
        return children($handleProps);
    }

    return Children.map(children, child => cloneElement(child, $handleProps));
}
