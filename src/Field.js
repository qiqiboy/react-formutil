import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import * as utils from './utils';
import warning from 'warning';

class Field extends Component {
    static displayName = 'React.Formutil.Field';

    static FIELD_UUID = 0;

    static propTypes = {
        $defaultValue: PropTypes.any,
        $defaultState: PropTypes.object,
        $onFieldChange: PropTypes.func,
        name: PropTypes.string,
        render: PropTypes.func,
        component: PropTypes.func,
        children(props, ...args) {
            let pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);
            if (!props.render && !props.component) {
                pt = pt.isRequired;
            }

            return pt(props, ...args);
        },

        $validators: PropTypes.object,
        $asyncValidators: PropTypes.object,

        $parser: PropTypes.func,
        $formatter: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.$baseState = {
            $value: '$defaultValue' in props ? props.$defaultValue : '',
            $viewValue: '',

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
                this.props.$onFieldChange($newValue, $preValue, this.formContext.$formutil),
            $$reset: $newState => {
                let $initialState;

                if (this.$name) {
                    const context = this.formContext;
                    const $initialValue = utils.parsePath(context.$$defaultValues, this.$name);

                    $initialState = utils.parsePath(context.$$defaultStates, this.$name) || {};

                    if (!utils.isUndefined($initialValue)) {
                        $initialState.$value = $initialValue;
                    }
                } else {
                    this.$preValue = this.$baseState.$value;
                }

                const $state = {
                    ...this.$baseState,
                    $error: { ...this.$baseState.$error },
                    ...$initialState
                };
                const { $formatter } = this.props;

                return (this.$state = {
                    ...$state,
                    $viewValue: $formatter
                        ? $formatter($state.$value, $value => (this.$state.$value = $value))
                        : $state.$value,
                    ...$newState
                });
            },
            $name: this.$name,
            $picker: () => ({ ...this.$state }),
            $getComponent: () => this,
            $reset: $newState => this.$setState(this.$handler.$$reset($newState)),
            $getFirstError: this.$getFirstError,
            $render: this.$render,
            $setValue: this.$setValue,
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
                warning(false, `react-formutil: '%s' has been deprecated, please use '%s' instead.`, key, '$' + key);
                return this.$handler['$' + key](...args);
            };
        });
    }

    componentDidMount() {
        if (this.formContext.$$register) {
            this.formContext.$$register(this.$name, this.$handler);
        }
    }

    componentWillUnmount() {
        if (this.formContext.$$unregister) {
            this.formContext.$$unregister(this.$name, this.$handler);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.formContext.$$register && prevProps.name !== this.$name) {
            this.$name = this.props.name;

            if (this.$name) {
                this.formContext.$$register(this.$name, this.$handler, prevProps.name);
            } else {
                this.$preValue = this.$state.$value;
                this.formContext.$$unregister(prevProps.$name, this.$handler);
            }
        }
    }

    $validate = callback => {
        const $validators = { ...this.props.$validators, ...this.props.$asyncValidators };
        const { $value, $error } = this.$state;
        const { $formutil } = this.formContext;

        const promises = Object.keys($validators).reduce((promises, key) => {
            delete $error[key];

            if (this.props[key] != null) {
                const result = $validators[key]($value, this.props[key], {
                    ...this.props,
                    $formutil
                });

                if (utils.isPromise(result)) {
                    promises.push(
                        result.catch(reason =>
                            this.$setValidity(key, reason instanceof Error ? reason.message : reason)
                        )
                    );
                } else if (result !== true) {
                    $error[key] = result;
                }
            }

            return promises;
        }, []);

        if (promises.length) {
            this.$setPending(true);
            Promise.all(promises).then(() => this.$setPending(false));
        }

        return this.$setState(
            {
                $error
            },
            callback
        );
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

        const { $parser, $formatter } = this.props;

        if ('$viewValue' in $newState && !('$value' in $newState)) {
            const $setViewValue = $value => ($newState.$viewValue = $value);

            $newState.$value = $parser ? $parser($newState.$viewValue, $setViewValue) : $newState.$viewValue;
        } else if ('$value' in $newState && !('$viewValue' in $newState)) {
            const $setModelValue = $value => ($newState.$value = $value);

            $newState.$viewValue = $formatter ? $formatter($newState.$value, $setModelValue) : $newState.$value;
        }

        Object.assign(this.$state, $newState);

        if ('$value' in $newState) {
            this.$validate();
        }

        return this.$handler.$picker();
    };

    $setState = ($newState, callback) => {
        if (this.$name && this.formContext.$$onChange) {
            this.formContext.$$onChange(this.$name, $newState, callback);
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

    $render = ($viewValue, callback) =>
        this.$setState(
            {
                $viewValue,
                $dirty: true,
                $pristine: false
            },
            callback
        );

    $setValue = ($value, callback) =>
        this.$setState(
            {
                $value
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

    $getFirstError = () => {
        const { $error = {} } = this.$state;
        for (let name in $error) {
            return $error[name];
        }
    };

    _render() {
        let { children, render, component: TheComponent } = this.props;
        const $fieldutil = {
            ...this.$state,
            ...this.$handler,
            $$formutil: this.formContext.$formutil
        };

        if (TheComponent) {
            return <TheComponent $fieldutil={$fieldutil} />;
        }

        if (utils.isFunction(render)) {
            return render($fieldutil);
        }

        if (utils.isFunction(children)) {
            return children($fieldutil);
        }

        return Children.map(
            children,
            child =>
                child && utils.isFunction(child.type)
                    ? cloneElement(child, {
                          $fieldutil
                      })
                    : child
        );
    }

    render() {
        return (
            <FormContext.Consumer>
                {context => {
                    if (!this.formContext) {
                        this.formContext = context;

                        this.$handler.$$reset();
                    }

                    return this._render();
                }}
            </FormContext.Consumer>
        );
    }
}

export default Field;
