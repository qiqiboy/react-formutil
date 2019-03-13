import { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';
import warning from 'warning';

let FIELD_UUID = 0;
const $baseState = {
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

function isError(result) {
    return /*!utils.isUndefined(result) && */ result !== true;
}

function warningValidatorReturn(result, key, name) {
    warning(
        !utils.isUndefined(result),
        `You should return a string or Error when the validation('${name &&
            name + ': '}${key}') failed, otherwise return true.`
    );
}

export const propTypes = {
    name: PropTypes.string,

    $defaultValue: PropTypes.any,
    $defaultState: PropTypes.object,
    $onFieldChange: PropTypes.func,
    $validators: PropTypes.object,
    $asyncValidators: PropTypes.object,
    $validateLazy: PropTypes.bool,

    $parser: PropTypes.func,
    $formatter: PropTypes.func,

    render: PropTypes.func,
    component: PropTypes.func,
    children(props, ...args) {
        let pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);

        if (!props.render && !props.component && props.children !== null) {
            pt = pt.isRequired;
        }

        return pt(props, ...args);
    }
};

export const displayName = 'React.Formutil.Field';

export function GET_FIELD_UUID() {
    return FIELD_UUID++;
}

export function renderField($fieldutil, props) {
    let { children, render, component } = props;

    if (component) {
        return createElement(component, { $fieldutil });
    }

    if (utils.isFunction(render)) {
        return render($fieldutil);
    }

    if (utils.isFunction(children)) {
        return children($fieldutil);
    }

    return Children.map(children, child =>
        child && utils.isFunction(child.type)
            ? cloneElement(child, {
                  $fieldutil
              })
            : child
    );
}

export function createHandler($this, owner) {
    const $fieldHandler = {
        $$FIELD_UUID: $this.$$FIELD_UUID,

        $$merge,
        $$triggerChange({ $newValue, $prevValue }) {
            if (utils.isFunction($this.props.$onFieldChange)) {
                $this.props.$onFieldChange($newValue, $prevValue, $this.$formContext.$formutil);
            }
        },
        $new() {
            return $this.$fieldutil;
        },
        $picker: $getState,
        $getState,
        // not support in Hooks
        $getComponent() {
            return owner;
        },

        $reset,
        $getFirstError,
        $validate,
        $setState: $this.$setState,
        $render,
        $setValue,
        $setTouched,
        $setDirty,
        $setFocused,
        $setValidity,
        $setError,
        $setPending
    };

    function $reset($newState) {
        let $initialState;

        const { props, $formContext } = $this;

        if ($formContext.$$getDefault) {
            const $name = props.name;
            const { $$defaultStates, $$defaultValues } = $formContext.$$getDefault();

            if ($name && $$defaultValues) {
                const $initialValue = utils.parsePath($$defaultValues, $name);

                $initialState = utils.parsePath($$defaultStates, $name) || {};

                if (!utils.isUndefined($initialValue)) {
                    $initialState.$value = $initialValue;
                }
            }
        }

        return $$merge({
            ...$baseState, // the base state
            ...props.$defaultState, // self default state
            $value: '$defaultValue' in props ? props.$defaultValue : '',
            ...$initialState, // the default state from Form
            ...$newState
        });
    }

    function $getState() {
        return { ...$this.$state };
    }

    function $validate(callback) {
        const { props, $formContext } = $this;
        const $validators = { ...props.$validators, ...props.$asyncValidators };
        const {
            $value,
            $error: { ...$newError }
        } = $this.$state;
        const { $formutil } = $formContext;
        const $validError = {};
        let $skipRestValidate = false;
        let $isCancelAsyncValidate = false;

        const $validatePromises = Object.keys($validators).reduce((promises, key) => {
            delete $newError[key];

            if (!$skipRestValidate && props[key] != null) {
                const result = $validators[key]($value, props[key], {
                    ...props,
                    $formutil,
                    $fieldutil: $this.$fieldutil,
                    $validError
                });

                if (utils.isPromise(result)) {
                    promises.push(
                        // @ts-ignore
                        result.catch(reason => {
                            if (!$isCancelAsyncValidate) {
                                $setValidity(key, reason || key);
                            }
                        })
                    );
                } else if (isError(result)) {
                    $validError[key] = result || key;

                    warningValidatorReturn(result, key, props.name);

                    if (props.$validateLazy) {
                        $skipRestValidate = true;
                    }
                }
            }

            return promises;
        }, []);

        if ($validatePromises.length) {
            if ($this.$shouldCancelPrevAsyncValidate) {
                $this.$shouldCancelPrevAsyncValidate();
            } else {
                $setPending(true);
            }

            $this.$shouldCancelPrevAsyncValidate = () => {
                $isCancelAsyncValidate = true;
            };

            Promise.all($validatePromises).then(() => {
                if (!$isCancelAsyncValidate) {
                    $setPending(false);

                    $this.$shouldCancelPrevAsyncValidate = null;
                }
            });
        }

        return $setError(
            {
                ...$newError,
                ...$validError
            },
            callback
        );
    }

    function $render($viewValue, callback) {
        return $this.$setState(
            {
                $viewValue,
                $dirty: true
            },
            callback
        );
    }

    function $setValue($value, callback) {
        return $this.$setState(
            {
                $value
            },
            callback
        );
    }

    function $setTouched($touched, callback) {
        return $this.$setState(
            {
                $touched
            },
            callback
        );
    }

    function $setDirty($dirty, callback) {
        return $this.$setState(
            {
                $dirty
            },
            callback
        );
    }

    function $setFocused($focused, callback) {
        return $this.$setState(
            {
                $focused
            },
            callback
        );
    }

    function $setError($error, callback) {
        return $this.$setState(
            {
                $error
            },
            callback
        );
    }

    function $setValidity(key, result = true, callback) {
        const {
            $error: { ...$newError }
        } = $this.$state;

        if (isError(result)) {
            $newError[key] = result || key;

            warningValidatorReturn(result, key, $this.props.name);
        } else {
            delete $newError[key];
        }

        return $setError($newError, callback);
    }

    function $setPending($pending, callback) {
        return $this.$setState(
            {
                $pending
            },
            callback
        );
    }

    function $getFirstError() {
        const { $error = {} } = $this.$state;

        for (let name in $error) {
            return $error[name] instanceof Error ? $error[name].message : $error[name];
        }
    }

    function $$merge({ ...$newState }) {
        if ('$error' in $newState) {
            if (!$newState.$error) {
                $newState.$error = {};
            }

            $newState.$valid = Object.keys($newState.$error).length === 0;
        }

        // process $value
        const { $parser, $formatter } = $this.props;

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

        $this.$state = { ...$this.$state, ...$newState };

        if ('$value' in $newState) {
            $validate();
        }

        return $getState();
    }

    return $fieldHandler;
}
