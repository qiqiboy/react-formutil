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

    isMounting = false;

    constructor(props) {
        super(props);

        this.$baseState = {
            $valid: true,
            $invalid: false,

            $dirty: false,
            $pristine: true,

            $touched: false,
            $untouched: true,

            $focused: false,

            $pending: false,

            $error: {}
        };

        this.$name = props.name;

        this.$handler = {
            $$FIELD_UUID: Field.FIELD_UUID++,
            $$merge: this.$$merge,
            $$triggerChange: ({ $newValue, $preValue }) =>
                utils.isFunction(this.props.$onFieldChange) &&
                this.props.$onFieldChange($newValue, $preValue, this.$formContext.$formutil),
            $name: this.$name,
            $new: () => this.$fieldutil,
            $picker: this.$getState,
            $getState: this.$getState,
            $getComponent: () => this,
            $reset: this.$reset,
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
        this.isMounting = true;

        if (this.$formContext.$$register) {
            this.$formContext.$$register(this.$name, this.$handler);
        }
    }

    componentWillUnmount() {
        if (this.$formContext.$$unregister) {
            this.$formContext.$$unregister(this.$name, this.$handler);
        }

        this.isMounting = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.$name = this.$handler.$name = this.props.name;

            if (this.$formContext.$$register) {
                if (this.$name) {
                    this.$formContext.$$register(this.$name, this.$handler, prevProps.name);
                } else {
                    this.$formContext.$$unregister(prevProps.$name, this.$handler);
                }
            }
        }
    }

    $validate = callback => {
        const $validators = { ...this.props.$validators, ...this.props.$asyncValidators };
        const {
            $value,
            $error: { ...$newError }
        } = this.$state;
        const { $formutil } = this.$formContext;

        const promises = Object.keys($validators).reduce((promises, key) => {
            delete $newError[key];

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
                    $newError[key] = result;
                }
            }

            return promises;
        }, []);

        if (promises.length) {
            this.$setPending(true);
            Promise.all(promises).then(() => this.$setPending(false));
        }

        return this.$setError($newError, callback);
    };

    $$merge = ({ ...$newState }) => {
        if ('$error' in $newState) {
            if (!$newState.$error) {
                $newState.$error = {};
            }

            $newState.$valid = Object.keys($newState.$error).length === 0;
        }

        // process $value
        const { $parser, $formatter } = this.props;

        if ('$viewValue' in $newState && !('$value' in $newState)) {
            const $setViewValue = $value => ($newState.$viewValue = $value);

            $newState.$value = $parser ? $parser($newState.$viewValue, $setViewValue) : $newState.$viewValue;
        } else if ('$value' in $newState && !('$viewValue' in $newState)) {
            const $setModelValue = $value => ($newState.$value = $value);

            $newState.$viewValue = $formatter ? $formatter($newState.$value, $setModelValue) : $newState.$value;
        }

        // process $valid/$invalid
        if ('$valid' in $newState) {
            $newState.$invalid = !$newState.$valid;
        } else if ('$invalid' in $newState) {
            $newState.$dirty = !$newState.$invalid;
        }

        // process $dirty/$pristine
        if ('$dirty' in $newState) {
            $newState.$pristine = !$newState.$dirty;
        } else if ('$pristine' in $newState) {
            $newState.$dirty = !$newState.$pristine;
        }

        // process $touched/$untouched
        if ('$touched' in $newState) {
            $newState.$untouched = !$newState.$touched;
        } else if ('$untouched' in $newState) {
            $newState.$touched = !$newState.$untouched;
        }

        this.$state = { ...this.$state, ...$newState };

        if ('$value' in $newState) {
            this.$preValue = this.$state.$value;

            this.$validate();
        }

        return this.$handler.$getState();
    };

    $getState = () => this.$state;

    $setState = ($newState, callback) => {
        if (this.isMounting) {
            if (this.$name && this.$formContext.$$onChange) {
                this.$formContext.$$onChange(this.$name, $newState, callback);
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
                    }
                });
            }

            return this.$handler.$getState();
        }

        return this.$$merge($newState);
    };

    $reset = $newState => {
        let $initialState;
        const context = this.$formContext;

        if (this.$name && context.$$defaultValues) {
            const $initialValue = utils.parsePath(context.$$defaultValues, this.$name);

            $initialState = utils.parsePath(context.$$defaultStates, this.$name) || {};

            if (!utils.isUndefined($initialValue)) {
                $initialState.$value = $initialValue;
            }
        }

        return this.$$merge({
            ...this.$baseState, // the base state
            ...this.props.$defaultState, // self default state
            $value: '$defaultValue' in this.props ? this.props.$defaultValue : '',
            ...$initialState, // the default state from Form
            ...$newState
        });
    };

    $render = ($viewValue, callback) =>
        this.$setState(
            {
                $viewValue,
                $dirty: true
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
                $touched
            },
            callback
        );

    $setDirty = ($dirty, callback) =>
        this.$setState(
            {
                $dirty
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
        const {
            $error: { ...$newError }
        } = this.$state;

        if (valid === true) {
            delete $newError[key];
        } else {
            $newError[key] = valid;
        }

        return this.$setError($newError, callback);
    };

    $getFirstError = () => {
        const { $error = {} } = this.$state;
        for (let name in $error) {
            return $error[name];
        }
    };

    _render() {
        let { children, render, component: TheComponent } = this.props;
        const $fieldutil = (this.$fieldutil = {
            ...this.$state,
            ...this.$handler,
            $$formutil: this.$formContext.$formutil
        });

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
        const shouldInitial = !this.$formContext;

        return (
            <FormContext.Consumer>
                {context => {
                    this.$formContext = context;

                    if (shouldInitial) {
                        this.$reset();
                    }

                    return this._render();
                }}
            </FormContext.Consumer>
        );
    }
}

export default Field;
