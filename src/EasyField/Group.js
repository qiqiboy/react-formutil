import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../utils';
import warning from 'warning';

class EasyFieldGroup extends Component {
    static displayName = 'React.Formutil.EasyField.Group';

    static propTypes = {
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,

        value: PropTypes.any,
        name: PropTypes.string,
        type: PropTypes.string.isRequired,
        groupNode: PropTypes.any,
        render: PropTypes.func
    };

    static defaultProps = {
        type: 'checkbox',
        groupNode: 'div'
    };

    static childContextTypes = {
        $fieldutil: PropTypes.object
    };

    getChildContext() {
        return {
            $fieldutil: this.props
        };
    }

    render() {
        const { className, groupNode: Element, children } = this.props;

        const childProps = {
            GroupOption: EasyFieldGroupOption,
            Field: DeprecatedEasyFieldGroupOption
        };

        const childNodes = isFunction(children)
            ? children(childProps)
            : Children.map(children, child => cloneElement(child, childProps));

        if (Element === null) {
            return childNodes;
        }

        return <Element className={className}>{childNodes}</Element>;
    }
}

class EasyFieldGroupOption extends Component {
    static displayName = 'React.Formutil.EasyField.Group.Option';

    static propTypes = {
        $value: PropTypes.any.isRequired
    };

    static contextTypes = {
        $fieldutil: PropTypes.object
    };

    render() {
        const { $value, onChange, onFocus, onBlur, ...others } = this.props;
        const { $fieldutil } = this.context;
        const { type, name } = $fieldutil;

        const elemProps =
            type === 'radio'
                ? {
                      checked: $fieldutil.value === $value,
                      onChange: ev => {
                          $fieldutil.onChange($value, ev);

                          onChange && onChange(ev);
                      }
                  }
                : type === 'checkbox'
                    ? {
                          checked: $fieldutil.value.indexOf($value) > -1,
                          onChange: ev => {
                              $fieldutil.onChange(
                                  ev.target.checked
                                      ? $fieldutil.value.concat($value)
                                      : $fieldutil.value.filter(value => value !== $value),
                                  ev
                              );

                              onChange && onChange(ev);
                          }
                      }
                    : {
                          value: $fieldutil.value,
                          onChange: ev => {
                              $fieldutil.onChange(ev);

                              onChange && onChange(ev);
                          }
                      };

        return (
            <input
                name={name}
                {...others}
                {...elemProps}
                type={type}
                onFocus={ev => {
                    $fieldutil.onFocus(ev);
                    onFocus && onFocus(ev);
                }}
                onBlur={ev => {
                    $fieldutil.onBlur(ev);
                    onBlur && onBlur(ev);
                }}
            />
        );
    }
}

class DeprecatedEasyFieldGroupOption extends Component {
    static displayName = 'React.Formutil.EasyField.Group.Option.Deprecated';

    componentDidMount() {
        warning(
            false,
            `The "Field" property in EasyField's children-props has been deprecated. Please use "GroupOption" instead.`
        );
    }

    render() {
        return <EasyFieldGroupOption {...this.props} />;
    }
}

export default EasyFieldGroup;
