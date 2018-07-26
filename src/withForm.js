import React, { Component } from 'react';
import Form from './Form';

function withForm(WrappedComponent, config = {}) {
    return class FormEnhanced extends Component {
        static displayName = 'React.formutil.withForm.' +
        (WrappedComponent.displayName || WrappedComponent.name || 'UnknowComponent');

        render() {
            const { ...others } = this.props;
            const { ...formProps } = this.props;

            ['$defaultStates', '$defaultValues', '$onFormChange'].forEach(prop => {
                if (prop in others) {
                    if (prop !== '$onFormChange') {
                        formProps[props] = { ...config[prop], ...others[prop] };
                    }
                    delete others[prop];
                }
            });

            return (
                <Form {...config} {...formProps}>
                    {$formutil => <WrappedComponent {...others} $formutil={$formutil} />}
                </Form>
            );
        }
    };
}

export default withForm;
