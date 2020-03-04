import React, { Component, Children, cloneElement, createContext } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../utils';
import warning from 'warning';

/** @type {any} */
const { Provider, Consumer } = createContext({});

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
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
    };

    static defaultProps = {
        type: 'checkbox',
        groupNode: 'div'
    };

    getGroupContext() {
        return this.props;
    }

    _render() {
        const { className, groupNode: Element, children } = this.props;

        const GroupOptionProps = {
            GroupOption: EasyFieldGroupOption,
            Field: DeprecatedEasyFieldGroupOption
        };

        const childNodes = isFunction(children)
            ? children(GroupOptionProps)
            : Children.map(children, child => cloneElement(child, GroupOptionProps));

        if (Element === null) {
            return childNodes;
        }

        return <Element className={className}>{childNodes}</Element>;
    }

    render() {
        return <Provider value={this.getGroupContext()}>{this._render()}</Provider>;
    }
}

class EasyFieldGroupOption extends Component {
    static displayName = 'React.Formutil.EasyField.Group.Option';

    static propTypes = {
        $value: PropTypes.any.isRequired
    };

    componentDidMount() {
        warning('$value' in this.props, `You should pass a $value to <GroupOption />.`);
    }

    render() {
        const { $value, onChange, onFocus, onBlur, ...others } = this.props;

        return (
            <Consumer>
                {$groupHandler => {
                    const { type, name } = $groupHandler;

                    const elemProps =
                        type === 'radio'
                            ? {
                                  checked: $groupHandler.value === $value,
                                  onChange: ev => {
                                      $groupHandler.onChange($value, ev);

                                      onChange && onChange(ev);
                                  }
                              }
                            : type === 'checkbox'
                            ? {
                                  checked: $groupHandler.value.indexOf($value) > -1,
                                  onChange: ev => {
                                      $groupHandler.onChange(
                                          ev.target.checked
                                              ? $groupHandler.value.concat($value)
                                              : $groupHandler.value.filter(value => value !== $value),
                                          ev
                                      );

                                      onChange && onChange(ev);
                                  }
                              }
                            : {
                                  value: $groupHandler.value,
                                  onChange: ev => {
                                      $groupHandler.onChange(ev);

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
                                $groupHandler.onFocus(ev);
                                onFocus && onFocus(ev);
                            }}
                            onBlur={ev => {
                                $groupHandler.onBlur(ev);
                                onBlur && onBlur(ev);
                            }}
                        />
                    );
                }}
            </Consumer>
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
