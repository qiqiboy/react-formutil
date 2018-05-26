import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Field extends Component {
    static displayName = 'React.formutil.Field';

    static propTypes = {
        $defaultValue: PropTypes.any,
        $defaultState: PropTypes.object,
        name: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,

        $validators: PropTypes.object,
        $asyncValidators: PropTypes.object
    };

    static defaultProps = {
        $defaultValue: ''
    };

    static contextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func,
        $$defaultValues: PropTypes.object,
        $$defaultStates: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.$name = props.name;
        this.$baseState = {
            $value: props.$defaultValue,

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $pending: false,

            $error: {},

            ...props.$defaultState
        };

        if (context.$$register) {
            const $initialValue =
                this.$name in context.$$defaultValues
                    ? context.$$defaultValues[this.$name]
                    : utils.parsePath(context.$$defaultValues, this.$name);
            const $initialState =
                context.$$defaultStates[this.$name] || utils.parsePath(context.$$defaultStates, this.$name);

            if (typeof $initialValue !== 'undefined') {
                this.$baseState.$value = $initialValue;
            }

            if ($initialState) {
                Object.assign(this.$baseState, $initialState);
            }

            this.$handler = {
                picker: () => this.$state,
                validate: () => {
                    this.$syncValidate();
                    this.$asyncValidate();
                },
                merge: $newState => Object.assign(this.$state, $newState),
                reset: $state => (this.$state = { ...this.$baseState, ...$state }),
                getComponent: () => this
            };

            this.$handler.reset();

            context.$$register(props.name, this.$handler);
        } else {
            console.warn(
                `react-formutil: The Field must be nesting inside the component that enhanced by the withForm(a High Order Component provided by react-formutil). `
            );
        }
    }

    componentWillUnmount() {
        this.context.$$unregister(this.props.name);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.$name = nextProps.name;
            this.context.$$register(nextProps.name, this.$handler, this.props.name);
        }
    }

    $syncValidate = () => {
        const { $validators, $asyncValidators } = this.props;
        const { $value, $error } = this.$state;

        //clear async validators result
        if ($asyncValidators) {
            Object.keys($asyncValidators).forEach(key => {
                if (key in $error) {
                    delete $error[key];
                }
            });
        }

        if ($validators) {
            Object.keys($validators).forEach(key => {
                if (key in this.props) {
                    const $valid = $validators[key]($value, this.props[key]);

                    if ($valid === true) {
                        delete $error[key];
                    } else {
                        $error[key] = $valid;
                    }
                } else {
                    delete $error[key];
                }
            });

            return this.$setState({
                $error
            });
        }
    };

    $asyncValidate = () => {
        const $asyncValidators = this.props.$asyncValidators;
        const { $value, $valid } = this.$state;

        if ($valid && $asyncValidators) {
            const promises = Object.keys($asyncValidators)
                .filter(key => key in this.props)
                .reduce((promises, key) => {
                    const promise = $asyncValidators[key]($value, this.props[key]);

                    if (promise && typeof promise.then === 'function') {
                        return promises.concat(
                            promise.then(() => this.$setValidity(key, true), reason => this.$setValidity(key, reason))
                        );
                    }

                    this.$setValidity(key, promise);

                    return promises;
                }, []);

            if (promises.length) {
                Promise.all(promises).then(() => this.$setPending(false));

                this.$setPending(true);
            }
        }
    };

    $setState = ($newState, callback) => this.context.$$onChange(this.$name, $newState, callback) && this.$state;

    $render = ($value, callback) =>
        this.$setState(
            {
                $value,
                $dirty: true,
                $pristine: false
            },
            callback
        );

    $setPending = $pending =>
        this.$setState({
            $pending
        });

    $setTouched = $touched =>
        this.$setState({
            $touched,
            $untouched: !$touched
        });

    $setDirty = $dirty =>
        this.$setState({
            $dirty,
            $pristine: !$dirty
        });

    $setValidity = (key, valid = false) => {
        const { $error } = this.$state;

        if (valid === true) {
            delete $error[key];
        } else {
            $error[key] = valid;
        }

        return this.$setState({
            $error
        });
    };

    render() {
        const { children } = this.props;
        const childProps = {
            $name: this.$name,
            ...this.$state,

            $render: this.$render,
            $setValue: this.$render,
            $setTouched: this.$setTouched,
            $setValidity: this.$setValidity,
            $setDirty: this.$setDirty,
            $setState: this.$setState
        };

        if (typeof children === 'function') {
            return children(childProps);
        }

        return Children.map(children, child => cloneElement(child, childProps));
    }
}

export default Field;
