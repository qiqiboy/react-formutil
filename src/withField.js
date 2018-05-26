import React, { Component } from 'react';
import Field from './Field';

function withField(WrappedComponent, config = {}) {
    return class extends Component {
        static displayName = 'React.formutil.withField.' + WrappedComponent.name;

        render() {
            const { $validators, $asyncValidators, ...others } = this.props;
            const fieldProps = {};

            Object.keys({ ...$validators, ...$asyncValidators, ...config.$validators, ...config.$asyncValidators })
                .concat('$validators', '$asyncValidators', '$defaultValue', '$defaultState', 'name')
                .forEach(prop => {
                    if (prop in others) {
                        fieldProps[prop] = others[prop];
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
