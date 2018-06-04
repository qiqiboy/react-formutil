import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Field extends Component {
    static displayName = 'React.formutil.Field';

    static FIELD_UUID = 0;

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

        this.$handler = {
            $$FIELD_UUID: Field.FIELD_UUID++,
            $$merge: this.$$merge,
            $$triggerChange: ({ $newValue, $preValue }) =>
                utils.isFunction(this.props.$onFieldChange) &&
                this.props.$onFieldChange($newValue, $preValue, this.context.$formutil),
            $$reset: $newState => (this.$state = { ...this.$baseState, $error: {}, ...$newState }),

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
                console.warn(`react-formutil: '${key}' has been deprecated, please use '$${key}' instead.`);
                return this.$handler['$' + key](...args);
            };
        });

        if (this.$name && context.$$register) {
            const $initialValue = utils.parsePath(context.$$defaultValues, this.$name);
            const $initialState = utils.parsePath(context.$$defaultStates, this.$name);

            if (!utils.isUndefined($initialValue)) {
                this.$baseState.$value = $initialValue;
            }

            if ($initialState) {
                Object.assign(this.$baseState, $initialState);
            }

            this.$handler.$$reset();
            context.$$register(this.$name, this.$handler);
        } else {
            this.$handler.$$reset();
            this.$preValue = this.$baseState.$value;
        }
    }

    componentWillUnmount() {
        if (this.context.$$unregister) {
            this.context.$$unregister(this.$name, this.$handler);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.context.$$register && nextProps.name !== this.$name) {
            if (nextProps.name) {
                this.context.$$register((this.$name = nextProps.name), this.$handler, this.props.name);
            } else {
                this.$preValue = this.$state.$value;
                this.context.$$unregister(this.$name, this.$handler);
                delete this.$name;
            }
        }
    }

    $validate = () => {
        this.$syncValidate();
        this.$asyncValidate();
    };

    $syncValidate = () => {
        const { $validators, $asyncValidators } = this.props;
        const { $value, $error } = this.$state;
        const { $formutil } = this.context;

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
                    const $valid = $validators[key]($value, this.props[key], {
                        ...this.props,
                        $formutil
                    });

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
        const { $formutil } = this.context;

        if ($valid && $asyncValidators) {
            const promises = Object.keys($asyncValidators)
                .filter(key => key in this.props)
                .reduce((promises, key) => {
                    const promise = $asyncValidators[key]($value, this.props[key], {
                        ...this.props,
                        $formutil
                    });

                    if (promise && utils.isFunction(promise.then)) {
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
                this.$setPending(true);
                Promise.all(promises).then(() => this.$setPending(false));
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
        if (this.$name && this.context.$$onChange) {
            this.context.$$onChange(this.$name, $newState, callback);
        } else {
            this.$$merge($newState);

            this.forceUpdate(() => {
                utils.isFunction(callback) && callback();

                const { $onFieldChange } = this.props;

                if (
                    '$value' in $newState &&
                    utils.isFunction($onFieldChange) &&
                    this.$state.$value !== this.$preValue
                ) {
                    $onFieldChange(this.$state.$value, this.$preValue);

                    this.$preValue = this.$state.$value;
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

    $setPending = ($pending, callback) =>
        this.$setState(
            {
                $pending
            },
            callback
        );

    $setTouched = ($touched, callback) =>
        this.$setState(
            {
                $touched,
                $untouched: !$touched
            },
            callback
        );

    $setDirty = ($dirty, callback) =>
        this.$setState(
            {
                $dirty,
                $pristine: !$dirty
            },
            callback
        );

    $setFocused = ($focused, callback) =>
        this.$setState(
            {
                $focused
            },
            callback
        );

    $setError = ($error, callback) =>
        this.$setState(
            {
                $error
            },
            callback
        );

    $setValidity = (key, valid = false, callback) => {
        const { $error } = this.$state;

        if (valid === true) {
            delete $error[key];
        } else {
            $error[key] = valid;
        }

        return this.$setError($error, callback);
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
