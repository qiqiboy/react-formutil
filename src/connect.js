import React, { Component } from 'react';
import FormContext from './context';
import hoistStatics from 'hoist-non-react-statics';

function connect(WrappedComponent) {
    class Connect extends Component {
        static displayName =
            'React.Formutil.connect.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        render() {
            return (
                <FormContext.Consumer>
                    {context => <WrappedComponent {...this.props} $formutil={context.$formutil} />}
                </FormContext.Consumer>
            );
        }
    }

    return hoistStatics(Connect, WrappedComponent);
}

export default connect;
