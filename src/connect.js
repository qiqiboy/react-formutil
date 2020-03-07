import React, { forwardRef } from 'react';
import FormContext from './context';
import hoistStatics from 'hoist-non-react-statics';

function connect(WrappedComponent) {
    const Connect = forwardRef((props, ref) => {
        return (
            <FormContext.Consumer>
                {getFormContext => <WrappedComponent {...props} $formutil={getFormContext().$formutil} ref={ref} />}
            </FormContext.Consumer>
        );
    });

    Connect.displayName =
        'React.Formutil.connect.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

    return hoistStatics(Connect, WrappedComponent);
}

export default connect;
