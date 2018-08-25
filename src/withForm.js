import React, { Component } from 'react';
import Form from './Form';

function withForm(WrappedComponent, config = {}) {
    return class FormEnhanced extends Component {
        static displayName = 'React.Formutil.withForm.' +
        (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        render() {
            const { ...others } = this.props;
            const { component, ...formProps } = this.props;

            ['$defaultStates', '$defaultValues', '$onFormChange'].forEach(prop => {
                if (prop in others) {
                    if (prop !== '$onFormChange') {
                        formProps[prop] = { ...config[prop], ...others[prop] };
                    }
                    delete others[prop];
                }
            });

            return (
                <Form
                    {...config}
                    {...formProps}
                    render={$formutil => <WrappedComponent {...others} $formutil={$formutil} />}
                />
            );
        }
    };
}

export default withForm;
