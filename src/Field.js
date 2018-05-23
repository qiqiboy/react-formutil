import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        defaultState: PropTypes.object,
        name: PropTypes.string.isRequired,

        $validators: PropTypes.object,
        $asyncValidators: PropTypes.object
    };

    static defaultProps = {
        defaultValue: ''
    };

    static contextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);

        this.$state = {
            $value: props.defaultValue,

            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $pending: false,

            $error: {},

            ...props.defaultState
        };

        context.$$register(props.name, this.handler());
    }

    componentWillUnmount() {
        this.context.$$unregister(this.props.name);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.context.$$register(nextProps.name, this.handler(), this.props.name);
        }
    }

    handler = () => ({
        picker: () => this.$state,
        validate: () => {
            this.$syncValidate();
            this.$asyncValidate();
        }
    });

    $render = value => {
        this.$setState({
            $value: value,
            $dirty: true,
            $pristine: false
        });
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

            const $valid = Object.keys($error).length === 0;

            return Object.assign(this.$state, {
                $error,
                $valid,
                $invalid: !$valid
            });
        }

        return this.$state;
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

                    this.$setValidity(key, !!promise);

                    return promises;
                }, []);

            if (promises.length) {
                Promise.all(promises).then(() => this.$setPending(false));

                this.$setPending(true);
            }
        }
    };

    $setState = $newState => {
        Object.assign(this.$state, $newState);

        if ('$value' in $newState) {
            this.handler().validate();
        }

        this.context.$$onChange(this.props.name);

        return this.$state;
    };

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

    $setValidity = (key, valid) => {
        const $error = this.$state.$error;
        if (valid === true) {
            delete $error[key];
        } else {
            $error[key] = valid;
        }
        const $valid = Object.keys($error).length === 0;

        return this.$setState({
            $error,
            $valid,
            $invalid: !$valid
        });
    };

    render() {
        const { children } = this.props;
        const childProps = {
            ...this.$state,

            $render: this.$render,
            $setTouched: this.$setTouched,
            $setValidity: this.$setValidity,
            $setDirty: this.$setDirty,
            $setState: this.$setState
        };

        if (typeof children === 'function') {
            return children(childProps);
        }

        const child = Children.only(children);
        return cloneElement(child, childProps);
    }
}

export default Field;
