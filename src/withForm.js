import React, { Component } from 'react';
import Form from './Form';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

function withForm(WrappedComponent, config = {}) {
    class FormEnhanced extends Component {
        static displayName =
            'React.Formutil.withForm.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        render() {
            const { ...others } = this.props;
            const { component, ...formProps } = this.props;

            ['$defaultStates', '$defaultValues', '$onFormChange', '$validator', '$processer'].forEach(prop => {
                if (prop in others) {
                    if (prop === '$defaultStates' || prop === '$defaultValues') {
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
    }

    return hoistStatics(FormEnhanced, WrappedComponent);
}

export default createHOC(withForm);
