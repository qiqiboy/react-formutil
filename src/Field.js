import { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
    static propTypes = {
        defaultValue: PropTypes.any,
        name: PropTypes.string.isRequired,

        $validators: PropTypes.object
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

            $error: {}
        };

        context.$$register(props.name, () => this.$validate());
    }

    componentWillUnmount() {
        this.context.$$unregister(this.props.name);
    }

    onChange = value => {
        this.$setState({
            $value: value,
            $dirty: true,
            $pristine: false
        });
    };

    $validate = () => {
        const $validators = this.props.$validators;
        const $value = this.$state.$value;

        if ($validators) {
            const $error = Object.keys($validators).reduce(($error, key) => {
                if ($validators[key]($value, this.props[key])) {
                    delete $error[key];
                } else {
                    $error[key] = true;
                }

                return $error;
            }, this.$state.$error || {});
            const $valid = Object.keys($error).length === 0;

            return Object.assign(this.$state, {
                $error,
                $valid,
                $invalid: !$valid
            });
        }

        return this.$state;
    };

    $setState = $newState => {
        Object.assign(this.$state, $newState);
        this.context.$$onChange(this.props.name);

        return this.$state;
    };

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
        if (valid) {
            delete $error[key];
        } else {
            $error[key] = true;
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

        if (typeof children !== 'function') {
            console.warn('The children of Field must be a function!');
            return null;
        }

        const childProps = {
            ...this.$state,

            onChange: this.onChange,
            $setTouched: this.$setTouched,
            $setValidity: this.$setValidity,
            $setDirty: this.$setDirty,
            $setState: this.$setState
        };

        return children(childProps);
    }
}

export default Field;
