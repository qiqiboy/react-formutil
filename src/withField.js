import React, { forwardRef } from 'react';
import Field from './Field';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

function withField(WrappedComponent, config = {}) {
    const FieldEnhanced = forwardRef((props, ref) => {
        const { ...others } = props;
        const { component, ...fieldProps } = props;

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
            '$ref',
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
                render={$fieldutil => <WrappedComponent {...others} $fieldutil={$fieldutil} ref={ref} />}
            />
        );
    });

    FieldEnhanced.displayName =
        'React.Formutil.withField.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

    return hoistStatics(FieldEnhanced, WrappedComponent);
}

export default createHOC(withField);
