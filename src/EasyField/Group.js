import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import createContext from 'create-react-context';
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
                {$groupHander => {
                    const { type, name } = $groupHander;

                    const elemProps =
                        type === 'radio'
                            ? {
                                  checked: $groupHander.value === $value,
                                  onChange: ev => {
                                      $groupHander.onChange($value, ev);

                                      onChange && onChange(ev);
                                  }
                              }
                            : type === 'checkbox'
                            ? {
                                  checked: $groupHander.value.indexOf($value) > -1,
                                  onChange: ev => {
                                      $groupHander.onChange(
                                          ev.target.checked
                                              ? $groupHander.value.concat($value)
                                              : $groupHander.value.filter(value => value !== $value),
                                          ev
                                      );

                                      onChange && onChange(ev);
                                  }
                              }
                            : {
                                  value: $groupHander.value,
                                  onChange: ev => {
                                      $groupHander.onChange(ev);

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
                                $groupHander.onFocus(ev);
                                onFocus && onFocus(ev);
                            }}
                            onBlur={ev => {
                                $groupHander.onBlur(ev);
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
