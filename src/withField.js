import React, { Component, forwardRef } from 'react';
import Field from './Field';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

const filterProps = [
    'name',

    '$defaultValue',
    '$defaultState',
    '$onFieldChange',
    '$validators',
    '$asyncValidators',
    '$validateLazy',
    '$memo',
    '$reserveOnUnmount',
    '$ref',
    '$parserc',
    '$formatter',

    'render',
    'component',
    'children'
];

function withField(WrappedComponent, config = {}) {
    class WithField extends Component {
        static displayName =
            'React.Formutil.withField.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        renderChildren = $fieldutil => (
            <WrappedComponent {...this.othersProps} $fieldutil={$fieldutil} ref={this.props.__forwardRef__} />
        );

        render() {
            const { ...others } = this.props;
            // component优先级最高，这里排除掉, 避免和render属性冲突
            const { component, ...fieldProps } = this.props;

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

            this.othersProps = others;

            return <Field {...config} {...fieldProps} render={this.renderChildren} />;
        }
    }

    const ForwardRefField = forwardRef((props, ref) => <WithField __forwardRef__={ref} {...props} />);

    ForwardRefField.displayName =
        'React.Formutil.withField.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

    return hoistStatics(ForwardRefField, WrappedComponent);
}

export default createHOC(withField);
