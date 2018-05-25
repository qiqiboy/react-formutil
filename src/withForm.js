import React, { Component } from 'react';
import Form from './Form';

function withForm(WrappedComponent, config = {}) {
    return class extends Component {
        static displayName = 'React.formutil.withForm.' + WrappedComponent.name;

        render() {
            const { $defaultValues, $defaultStates, ...others } = this.props;
            const formProps = {};

            [$defaultStates, $defaultValues].forEach($prop => {
                if ($prop in this.props) {
                    formProps[$prop] = $prop;
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
