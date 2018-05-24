import React, { Component } from 'react';
import Form from './Form';

function withForm(WrappedComponent) {
    return class extends Component {
        static displayName = 'React.formutil.withForm.' + WrappedComponent.name;

        render() {
            return <Form>{$formutil => <WrappedComponent {...this.props} $formutil={$formutil} />}</Form>;
        }
    };
}

export default withForm;
