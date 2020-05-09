import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EasyFieldNative extends Component {
    static displayName = 'React.Formutil.EasyField.Native';

    static propTypes = {
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,

        value: PropTypes.any,
        name: PropTypes.string,
        type: PropTypes.string,

        checked: PropTypes.any,
        unchekced: PropTypes.any
    };

    static defaultProps = {
        value: '',
        type: 'text',
        checked: true,
        unchecked: false
    };

    render() {
        const { $fieldutil, value: htmlValue, onChange, onFocus, onBlur, checked, unchecked, ...others } = this.props;
        const htmlType = this.props.type;

        let htmlProps = {
            value: 'compositionValue' in this ? this.compositionValue : htmlValue,
            onCompositionEnd: ev => {
                this.composition = false;
                delete this.compositionValue;
                htmlProps.onChange(ev);
            },
            onCompositionStart: () => (this.composition = true),
            onChange: ev => {
                const { value } = ev.target;

                if (this.composition) {
                    this.compositionValue = value;
                    this.forceUpdate();
                } else {
                    onChange(value, ev);
                }
            },
            onFocus,
            onBlur: ev => {
                if (this.isComposition) {
                    this.isComposition = false;
                    delete this.compositionValue;
                    htmlProps.onChange(ev);
                }

                return onBlur(ev);
            }
        };
        let Element = 'input';

        switch (htmlType) {
            case 'select':
                Element = htmlType;
                htmlProps.onChange = ev => {
                    const node = ev.target;
                    const value = node.multiple
                        ? [].slice
                              .call(node.options)
                              .filter(option => option.selected)
                              .map(option => option.value)
                        : node.value;

                    onChange(value, ev);
                };

                delete others.type;

                break;
            case 'textarea':
                Element = htmlType;
                delete others.type;
                break;

            case 'checkbox':
            case 'radio':
                htmlProps = {
                    checked: htmlValue === checked,
                    onChange: ev => {
                        onChange(ev.target.checked ? checked : unchecked, ev);
                    },
                    onFocus,
                    onBlur
                };
                break;

            default:
                break;
        }

        return <Element {...others} {...htmlProps} />;
    }
}

export default EasyFieldNative;
