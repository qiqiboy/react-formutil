import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

function connect(WrappedComponent) {
    class Connect extends Component {
        static displayName = 'React.Formutil.connect.' +
        (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        static contextTypes = {
            $formutil: PropTypes.object
        };

        render() {
            return <WrappedComponent {...this.props} $formutil={this.context.$formutil} />;
        }
    }

    return hoistStatics(Connect, WrappedComponent);
}

export default connect;
