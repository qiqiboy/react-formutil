import React, { forwardRef } from 'react';
import Form, { propTypes } from './Form';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

const filterProps = Object.keys(propTypes);

function withForm(WrappedComponent, config = {}) {
    const FormEnhanced = forwardRef((props, ref) => {
        const { ...others } = props;
        // component优先级最高，这里排除掉, 避免和render属性冲突
        const { component, ...formProps } = props;

        filterProps.forEach(prop => {
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
