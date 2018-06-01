import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Field extends Component {
    static displayName = 'React.formutil.Field';

    static propTypes = {
        $defaultValue: PropTypes.any,
        $defaultState: PropTypes.object,
        $onFieldChange: PropTypes.func,
        name: PropTypes.string,
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
        $$defaultStates: PropTypes.object,
        $formutil: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.$baseState = {
            $value: props.$defaultValue,

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $focused: false,

            $pending: false,

            $error: {},

            ...props.$defaultState
        };

        this.$name = props.name;

        if (this.$name) {
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
        }

        this.$handler = {
            $$merge: this.$$merge,
            $$getFieldChangeHandler: () => this.props.$onFieldChange,
            $$reset: $newState => (this.$state = { ...this.$baseState, ...$newState }),

            $name: this.$name,
            $picker: () => ({ ...this.$state }),
            $getComponent: () => this,
            $reset: $newState => this.$setState(this.$handler.$$reset($newState)),
            $render: this.$render,
            $setValue: this.$render,
            $setState: this.$setState,
            $setTouched: this.$setTouched,
            $setDirty: this.$setDirty,
            $setFocused: this.$setFocused,
            $setValidity: this.$setValidity,
            $setError: this.$setError,
            $validate: this.$validate
        };

        // deprecated methods warning
        ['getComponent', 'validate'].forEach(key => {
            this.$handler[key] = (...args) => {
                console.warn(`react-formuitl: '${key}' has been deprecated, please use '$${key}' instead of it.`);
                return this.$handler['$' + key](...args);
            };
        });

        this.$handler.$$reset();

        if (context.$$register) {
            context.$$register(this.$name, this.$handler);
        }
    }

    componentWillUnmount() {
        if (this.context.$$unregister) {
            this.context.$$unregister(this.$name);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.context.$$register && nextProps.name !== this.props.name) {
            this.context.$$register((this.$name = nextProps.name), this.$handler, this.props.name);
        }
    }

    $validate = () => {
        this.$syncValidate();
        this.$asyncValidate();
    };

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
                            promise.then(
                                () => this.$setValidity(key, true),
                                reason => this.$setValidity(key, reason === true ? false : reason)
                            )
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

    $$merge = $newState => {
        if ('$error' in $newState) {
            if (!$newState.$error) {
                $newState.$error = {};
            }

            const $valid = Object.keys($newState.$error).length === 0;

            $newState = {
                $valid,
                $invalid: !$valid,
                ...$newState
            };
        }

        Object.assign(this.$state, $newState);

        if ('$value' in $newState) {
            this.$validate();
        }

        return this.$handler.$picker();
    };

    $setState = ($newState, callback) => {
        if (this.$name) {
            this.context.$$onChange(this.$name, $newState, callback);
        } else {
            const { $preValue } = this.$state;
            this.$$merge($newState);

            this.forceUpdate(() => {
                typeof callback === 'function' && callback();

                const { $onFieldChange } = this.props;

                if (
                    '$value' in $newState &&
                    typeof $onFieldChange === 'function' &&
                    $newState.$value !== $preValue
                ) {
                    $onFieldChange($newState.$value, $preValue);
                }
            });
        }

        return this.$handler.$picker();
    };

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

    $setFocused = $focused =>
        this.$setState({
            $focused
        });

    $setError = $error =>
        this.$setState({
            $error
        });

    $setValidity = (key, valid = false) => {
        const { $error } = this.$state;

        if (valid === true) {
            delete $error[key];
        } else {
            $error[key] = valid;
        }

        return this.$setError($error);
    };

    render() {
        const { children } = this.props;
        const childProps = {
            ...this.$state,
            ...this.$handler,
            $$formutil: this.context.$formutil
        };

        if (typeof children === 'function') {
            return children(childProps);
        }

        return Children.map(children, child => cloneElement(child, childProps));
    }
}

export default Field;
