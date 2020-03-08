import React, { Component, forwardRef } from 'react';
import Form from './Form';
import { createHOC } from './utils';
import hoistStatics from 'hoist-non-react-statics';

const filterProps = [
    'render',
    'component',
    'children',
    '$defaultValues',
    '$defaultStates',
    '$onFormChange',
    '$validator',
    '$processer',
    '$ref'
];

function withForm(WrappedComponent, config = {}) {
    class WithForm extends Component {
        static displayName =
            'React.Formutil.withForm.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

        renderChildren = $formutil => (
            <WrappedComponent {...this.othersProps} $formutil={$formutil} ref={this.props.__forwardRef__} />
        );

        render() {
            const { ...others } = this.props;
            // component优先级最高，这里排除掉, 避免和render属性冲突
            const { component, ...formProps } = this.props;

            filterProps.forEach(prop => {
                if (prop in others) {
                    if (prop === '$defaultStates' || prop === '$defaultValues') {
                        formProps[prop] = { ...config[prop], ...others[prop] };
                    }
                    delete others[prop];
                }
            });

            this.othersProps = others;

            return <Form {...config} {...formProps} render={this.renderChildren} />;
        }
    }

    const ForwardRefForm = forwardRef((props, ref) => <WithForm __forwardRef__={ref} {...props} />);

    ForwardRefForm.displayName =
        'React.Formutil.withForm.ForwardRef.' + (WrappedComponent.displayName || WrappedComponent.name || 'Anonymous');

    return hoistStatics(ForwardRefForm, WrappedComponent);
}

export default createHOC(withForm);
