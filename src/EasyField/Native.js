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
        type: 'text',
        checked: true,
        unchecked: false
    };

    render() {
        const { value: htmlValue, onChange, onFocus, onBlur, checked, unchecked, children, ...others } = this.props;
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
                    onChange && onChange(value, ev);
                }
            }
        };
        let Element;

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

                    onChange && onChange(value, ev);
                };
                htmlProps.children = children;

                break;
            case 'textarea':
                Element = htmlType;
                break;

            case 'checkbox':
            case 'radio':
                Element = 'input';
                htmlProps = {
                    checked: htmlValue === checked,
                    onChange: ev => {
                        onChange && onChange(ev.target.checked ? checked : unchecked, ev);
                    }
                };
                break;

            default:
                Element = 'input';
                break;
        }

        return <Element {...others} {...htmlProps} />;
    }
}

export default EasyFieldNative;
