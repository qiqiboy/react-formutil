import React, { Component } from 'react';
import Field from './Field';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

function withField(WrappedComponent, config = {}) {
    class FieldEnhanced extends Component {
        static displayName =
            'React.Formutil.withField.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        render() {
            const { ...others } = this.props;
            const { component, ...fieldProps } = this.props;

            [
                '$validators',
                '$asyncValidators',
                '$validateLazy',
                '$reserveOnUnmount',
                '$defaultValue',
                '$defaultState',
                '$onFieldChange',
                '$parser',
                '$formatter',
                'name'
            ]
                .concat(
                    Object.keys({
                        ...config.$validators,
                        ...config.$asyncValidators,
                        ...others.$validators,
                        ...others.$asyncValidators
                    })
                )
                .forEach(prop => {
                    if (prop in others) {
                        if (prop === '$validators' || prop === '$asyncValidators' || prop === '$defaultState') {
                            fieldProps[prop] = { ...config[prop], ...others[prop] };
                        }
                        delete others[prop];
                    }
                });

            return (
                <Field
                    {...config}
                    {...fieldProps}
                    render={$fieldutil => <WrappedComponent {...others} $fieldutil={$fieldutil} />}
                />
            );
        }
    }

    return hoistStatics(FieldEnhanced, WrappedComponent);
}

export default createHOC(withField);
