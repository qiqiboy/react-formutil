import React, { Component } from 'react';
import Field from './Field';

function withField(WrappedComponent, config = {}) {
    return class extends Component {
        static displayName = 'React.formutil.withField.' + WrappedComponent.name;

        render() {
            const { $validators, $asyncValidators, $defaultValue, $defaultState, name, ...otherProps } = this.props;
            const fieldProps = { name };

            Object.keys({ ...$validators, ...$asyncValidators }).forEach(prop => {
                if (prop in otherProps) {
                    fieldProps[prop] = otherProps[prop];
                    delete otherProps[prop];
                }
            });

            [$validators, $asyncValidators, $defaultValue, $defaultState].forEach($prop => {
                if ($prop in this.props) {
                    fieldProps[$prop] = $prop;
                }
            });

            return (
                <Field {...config} {...fieldProps}>
                    {props => <WrappedComponent {...otherProps} {...props} />}
                </Field>
            );
        }
    };
}

export default withField;
