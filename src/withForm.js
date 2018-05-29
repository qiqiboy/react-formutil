import React, { Component } from 'react';
import Form from './Form';

function withForm(WrappedComponent, config = {}) {
    return class FormEnhanced extends Component {
        static displayName = 'React.formutil.withForm.' + WrappedComponent.name;

        render() {
            const { ...others } = this.props;
            const formProps = {};

            ['$defaultStates', '$defaultValues'].forEach(prop => {
                if (prop in others) {
                    formProps[prop] = { ...config[prop], ...others[prop] };
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
