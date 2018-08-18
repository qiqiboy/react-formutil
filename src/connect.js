import React, { Component } from 'react';
import PropTypes from 'prop-types';

function connect(WrappedComponent) {
    return class Connect extends Component {
        static displayName = 'React.formutil.connect.' +
        (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        static contextTypes = {
            $formutil: PropTypes.object
        };

        render() {
            return <WrappedComponent {...this.props} $formutil={this.context.$formutil} />;
        }
    };
}

export default connect;
