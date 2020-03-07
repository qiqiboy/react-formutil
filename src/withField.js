import React, { forwardRef } from 'react';
import Field from './Field';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';
import { propTypes } from './fieldHelper';

const filterProps = Object.keys(propTypes);

function withField(WrappedComponent, config = {}) {
    const FieldEnhanced = forwardRef((props, ref) => {
        const { ...others } = props;
        // component优先级最高，这里排除掉, 避免和render属性冲突
        const { component, ...fieldProps } = props;

        filterProps
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
