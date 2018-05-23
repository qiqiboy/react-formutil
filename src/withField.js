import React, { Component } from 'react';
import Field from './Field';

function withField(WrappedComponent, config = {}) {
    return class extends Component {
        static displayName = 'React.formutil.withField.' + WrappedComponent.name;

        render() {
            return (
                <Field {...config} {...this.props}>
                    {props => <WrappedComponent {...props} />}
                </Field>
            );
        }
    };
}

export default withField;
