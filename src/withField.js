import React, { Component } from 'react';
import Field from './Field';

function withField(WrappedComponent, config = {}) {
    return class FieldEnhanced extends Component {
        static displayName = 'React.formutil.withField.' +
        (WrappedComponent.displayName || WrappedComponent.name || 'UnknowComponent');

        render() {
            const { ...others } = this.props;
            const { ...fieldProps } = this.props;

            ['$validators', '$asyncValidators', '$defaultValue', '$defaultState', '$onFieldChange', 'name']
                .concat(
                    Object.keys({
                        ...config.$validators,
                        ...config.$asyncValidators,
                        ...others.$validators,
                        ...others.$asyncValidators
                    })
                )
                .forEach(prop => {
                    if (prop in others) {
                        if (prop === '$validators' || prop === '$asyncValidators' || prop === '$defaultState') {
                            fieldProps[prop] = { ...config[prop], ...others[prop] };
                        }
                        delete others[prop];
                    }
                });

            return (
                <Field {...config} {...fieldProps}>
                    {props => <WrappedComponent {...others} {...props} />}
                </Field>
            );
        }
    };
}

export default withField;
