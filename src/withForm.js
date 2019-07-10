import React, { forwardRef } from 'react';
import Form from './Form';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

function withForm(WrappedComponent, config = {}) {
    const FormEnhanced = forwardRef((props, ref) => {
        const { ...others } = props;
        const { component, ...formProps } = props;

        ['$defaultStates', '$defaultValues', '$onFormChange', '$validator', '$processer', '$ref'].forEach(prop => {
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
                render={$formutil => <WrappedComponent {...others} $formutil={$formutil} ref={ref} />}
            />
        );
    });

    FormEnhanced.displayName =
        'React.Formutil.withForm.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

    return hoistStatics(FormEnhanced, WrappedComponent);
}

export default createHOC(withForm);
