import React, { Component, Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import * as utils from './utils';
import warning from 'warning';

export const FORM_VALIDATE_RESULT = 'FORM_VALIDATE_RESULT';

let requestFrame, cancelFrame;

if (typeof requestAnimationFrame === 'function') {
    requestFrame = requestAnimationFrame;
    cancelFrame = cancelAnimationFrame;
} else {
    requestFrame = setTimeout;
    cancelFrame = clearTimeout;
}

class Form extends Component {
    static displayName = 'React.Formutil.Form';

    static propTypes = {
        render: PropTypes.func,
        component: PropTypes.func,
        children(props, ...args) {
            let pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);

            if (!props.render && !props.component) {
                pt = pt.isRequired;
            }

            return pt(props, ...args);
        },
        $defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        $defaultStates: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        $onFormChange: PropTypes.func,
        $validator: PropTypes.func,
        $processer: PropTypes.func
    };

    static defaultProps = {
        $defaultValues: {},
        $defaultStates: {}
    };

    $$formPending;
    $$formValidatePromise;

    $$registers = {};
    $$deepRegisters = {};

    constructor(props) {
        super(props);

        this.$$defaultInitialize();
    }

    getFormContext() {
        return {
            $$registers: this.$$registers,
            $$register: this.$$register,
            $$unregister: this.$$unregister,
            $$onChange: this.$$onChange,
            $$getDefault: this.$$getDefault,
            $formutil: this.$formutil
        };
    }

    /**
     * @desc 注册或者替换(preName)Field
     */
    $$register = (name, $handler, prevName) => {
        const $curRegistered = this.$$getRegister(name);
        const $prevRegistered = this.$$getRegister(prevName);

        if ($prevRegistered) {
            if ($prevRegistered === $handler) {
                prevName = $prevRegistered.$name;
                delete this.$$registers[prevName];
                delete $prevRegistered.$name;
            }

            if ($curRegistered !== $prevRegistered) {
                utils.objectClear(this.$$defaultValues, prevName);

                this.$$fieldChangedQueue.push({
                    name: prevName,
                    $prevValue: $handler.$getState().$value
                });
            }
        }

        if (name) {
            if ($curRegistered && $curRegistered.$$reserved) {
                $handler.$$reset($curRegistered.$getState());
            } else if ($curRegistered !== $handler) {
                this.$$fieldChangedQueue.push({
                    name,
                    $newValue: $handler.$getState().$value
                });

                if ($curRegistered) {
                    this.$$fieldChangedQueue.push({
                        name,
                        $prevValue: $curRegistered.$getState().$value
                    });
                }

                warning(
                    !$curRegistered || $prevRegistered,
                    `The Field with a name '${name}' has been registered. You will get a copy of it's $fieldutil!`
                );
            }

            this.$$registers[($handler.$name = name)] = !$curRegistered || $prevRegistered ? $handler : $curRegistered;
        }

        this.creatDeepRegisters();
        this.$render();

        return this.$$registers[name];
    };

    $$unregister = (name, $handler, $$reserved) => {
        const $registered = this.$$getRegister(name);

        if ($handler === $registered) {
            if (!$$reserved) {
                name = $registered.$name;
                delete this.$$registers[name];
                delete $registered.$name;
                utils.objectClear(this.$$defaultValues, name);

                this.$$fieldChangedQueue.push({
                    name,
                    $prevValue: $registered.$getState().$value
                });

                this.creatDeepRegisters();
                this.$render();
            } else {
                $registered.$$reserved = true;
            }
        }
    };

    $$defaultInitialize = () => {
        const { $defaultValues, $defaultStates } = this.props;

        this.$$defaultValues = this.$$deepParseObject(
            JSON.parse(
                JSON.stringify(utils.isFunction($defaultValues) ? $defaultValues(this.props) || {} : $defaultValues)
            )
        );
        this.$$defaultStates = this.$$deepParseObject(
            JSON.parse(
                JSON.stringify(utils.isFunction($defaultStates) ? $defaultStates(this.props) || {} : $defaultStates)
            )
        );
    };

    $$getDefault = () => ({
        $$defaultStates: this.$$defaultStates,
        $$defaultValues: this.$$defaultValues
    });

    $$deepParseObject(mayWeakObj, deepObj = {}) {
        utils.objectEach(mayWeakObj, (data, name) => utils.parsePath(deepObj, name, data));

        return deepObj;
    }

    $$triggerChangeTimer;
    $$fieldChangedQueue = [];
    $$triggerFormChange = () => {
        if (this.$$fieldChangedQueue.length) {
            const $$fieldChangedQueue = [...this.$$fieldChangedQueue];

            this.$$fieldChangedQueue.length = 0;

            const $newValues = {};
            const $prevValues = {};
            let hasFormChanged = false;

            $$fieldChangedQueue.forEach(item => {
                if (item.$newValue !== item.$prevValue) {
                    if ('$newValue' in item && '$prevValue' in item) {
                        const $handler = this.$getField(item.name);

                        if ($handler) {
                            this.$getField(item.name).$$triggerChange(item);
                        }
                    }

                    '$newValue' in item && utils.parsePath($newValues, item.name, item.$newValue);
                    '$prevValue' in item && utils.parsePath($prevValues, item.name, item.$prevValue);

                    hasFormChanged = true;
                }
            });

            if (hasFormChanged) {
                if (utils.isFunction(this.props.$validator)) {
                    this.$$formValidate();
                }

                if (utils.isFunction(this.props.$onFormChange)) {
                    this.props.$onFormChange(this.$formutil, $newValues, $prevValues);
                }
            }
        }
    };

    creatDeepRegisters = () => (this.$$deepRegisters = this.$$deepParseObject(this.$$registers));

    $$getRegister = name => {
        if (name) {
            const field = this.$$registers[name] || utils.parsePath(this.$$deepRegisters, name);

            if (field) {
                return field;
            }
        }
    };

    $$formValidate = callback =>
        (this.$$formValidatePromise = new Promise(resolve => {
            const { $validator } = this.props;

            let $breakAsyncHandler;
            let $shouldCancelPrevAsyncValidate;
            let prevCallback;
            let validation;

            const result = $validator(this.$formutil.$params, this.formtutil);
            const execCallback = $formutil =>
                resolve(utils.runCallback(callback, utils.runCallback(prevCallback, $formutil)));

            if (utils.isPromise(result)) {
                if (!this.$$formPending) {
                    this.$$formPending = true;

                    this.$render();
                }

                $shouldCancelPrevAsyncValidate = setCallback => ($breakAsyncHandler = setCallback(execCallback));

                validation = result
                    .then(() => void 0, reason => reason)
                    .then(reason => {
                        if ($breakAsyncHandler) {
                            return $breakAsyncHandler;
                        }

                        this.$shouldCancelPrevAsyncValidate = null;

                        this.$$formPending = false;

                        return this.$$setFormErrors(reason, execCallback);
                    });
            } else {
                if (this.$$formPending) {
                    this.$$formPending = false;
                }

                validation = this.$$setFormErrors(result, execCallback);
            }

            if (this.$shouldCancelPrevAsyncValidate) {
                this.$shouldCancelPrevAsyncValidate(callback => {
                    prevCallback = callback;

                    return validation;
                });
            }

            this.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
        }));

    $$setFormErrors = (validResults, callback) => {
        if (validResults && (validResults instanceof Error || typeof validResults !== 'object')) {
            warning(
                false,
                `The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.`
            );

            return this.$render(callback);
        }

        return this.$$setStates(
            validResults || {},
            (result, handler) => {
                const { $error = {} } = handler.$getState();

                if (result) {
                    return {
                        $error: {
                            ...$error,
                            [FORM_VALIDATE_RESULT]: result
                        }
                    };
                }

                if ($error[FORM_VALIDATE_RESULT]) {
                    delete $error[FORM_VALIDATE_RESULT];

                    return {
                        $error
                    };
                }

                return;
            },
            callback,
            true
        );
    };

    $getField = name => {
        const field = this.$$getRegister(name);

        warning(!name || field, `$getField('${name}') fail to find the matched Field. Maybe it has been unmounted.`);
        warning(name, `You should pass a name of the mounted Field to $getField().`);

        if (field) {
            return field.$new();
        }
    };

    $$onChange = (name, $state, callback) =>
        this.$setStates(
            {
                [name]: $state
            },
            callback
        );

    $$setStates = ($stateTree = {}, processer, callback, force) => {
        const $parsedTree = this.$$deepParseObject($stateTree);
        let hasStateChange = false;

        utils.objectEach(this.$$registers, (handler, name) => {
            const data = name in $stateTree ? $stateTree[name] : utils.parsePath($parsedTree, name);

            if (!utils.isUndefined(data) || force) {
                const $newState = processer(data, handler);

                if ($newState) {
                    const $prevValue = this.$formutil.$weakParams[name];
                    const { $value: $newValue } = handler.$$merge($newState);

                    handler.$$detectChange($newState);

                    if ('$value' in $newState || '$viewValue' in $newState) {
                        const findItem = utils.arrayFind(this.$$fieldChangedQueue, item => item.name === name);

                        if (findItem) {
                            if (!('$prevValue' in findItem)) {
                                findItem.$prevValue = findItem.$newValue;
                            }

                            findItem.$newValue = $newValue;
                        } else {
                            this.$$fieldChangedQueue.push({
                                name,
                                $newValue,
                                $prevValue
                            });
                        }
                    }

                    hasStateChange = true;
                }
            }
        });

        if (hasStateChange) {
            return this.$render(callback);
        }

        return Promise.resolve(utils.runCallback(callback, this.$formutil));
    };

    componentDidUpdate() {
        cancelFrame(this.$$triggerChangeTimer);

        // ensure this calls to access the newest $formutil
        this.$$triggerChangeTimer = requestFrame(() => {
            this.$$triggerFormChange();
        });
    }

    $render = callback =>
        new Promise(resolve => this.forceUpdate(() => resolve(utils.runCallback(callback, this.$formutil))));

    $validates = (...args) => {
        let callback;

        if (utils.isFunction(args[args.length - 1])) {
            callback = args.pop();
        }

        if (args.length) {
            const flatter = names => {
                names.forEach(name => {
                    if (Array.isArray(name)) {
                        flatter(name);
                    } else {
                        const handler = this.$getField(name);

                        if (handler) {
                            handler.$validate();
                        }
                    }
                });
            };

            flatter(args);
        } else {
            utils.objectEach(this.$$registers, handler => handler.$validate());

            if (utils.isFunction(this.props.$validator)) {
                this.$$formValidate();
            }
        }

        return this.$onValidates(callback);
    };

    $onValidates = callback => {
        const filedValidatePromises = Object.keys(this.$$registers).map(name => this.$$registers[name].$onValidate());

        filedValidatePromises.push(this.$$formValidatePromise);

        return Promise.all(filedValidatePromises).then(() => utils.runCallback(callback, this.$formutil));
    };

    $validate = (name, callback) => {
        const handler = this.$getField(name);

        if (handler) {
            return handler.$validate(callback);
        }

        return utils.runCallback(callback);
    };

    $reset = ($stateTree, callback) => {
        this.$$defaultInitialize();

        if (utils.isFunction($stateTree)) {
            callback = $stateTree;
            $stateTree = {};
        }

        return this.$$setStates($stateTree, ($state, handler) => handler.$$reset($state), callback, true);
    };

    $setStates = ($stateTree, callback) => this.$$setStates($stateTree, $state => $state, callback);

    $setValues = ($valueTree, callback) => {
        this.$$deepParseObject($valueTree, this.$$defaultValues);

        return this.$$setStates($valueTree, $value => ({ $value }), callback);
    };

    $setFocuses = ($focusedTree, callback) => this.$$setStates($focusedTree, $focused => ({ $focused }), callback);
    $setDirts = ($dirtyTree, callback) => this.$$setStates($dirtyTree, $dirty => ({ $dirty }), callback);
    $setTouches = ($touchedTree, callback) => this.$$setStates($touchedTree, $touched => ({ $touched }), callback);
    $setPendings = ($pendingTree, callback) => this.$$setStates($pendingTree, $pending => ({ $pending }), callback);
    $setErrors = ($errorTree, callback) => this.$$setStates($errorTree, $error => ({ $error }), callback);

    $batchState = ($state, callback) => this.$setStates(utils.objectMap(this.$$registers, () => $state), callback);
    $batchDirty = ($dirty, callback) =>
        this.$batchState(
            {
                $dirty
            },
            callback
        );

    $batchTouched = ($touched, callback) =>
        this.$batchState(
            {
                $touched
            },
            callback
        );

    $batchFocused = ($focused, callback) =>
        this.$batchState(
            {
                $focused
            },
            callback
        );

    $batchPending = ($pending, callback) =>
        this.$batchState(
            {
                $pending
            },
            callback
        );

    $batchError = ($error, callback) =>
        this.$batchState(
            {
                $error
            },
            callback
        );

    _render() {
        const $formutil = this.$formutil;
        let { children, render, component } = this.props;

        if (component) {
            return createElement(component, { $formutil });
        }

        if (utils.isFunction(render)) {
            return render($formutil);
        }

        if (utils.isFunction(children)) {
            return children($formutil);
        }

        return Children.map(children, child =>
            child && utils.isFunction(child.type)
                ? cloneElement(child, {
                      $formutil
                  })
                : child
        );
    }

    render() {
        const { $processer } = this.props;
        const $stateArray = Object.keys(this.$$registers).map(path => ({
            path,
            $state: this.$$registers[path].$getState()
        }));

        const $weakParams = utils.toObject($stateArray, ($params, { path, $state }) => {
            if ($processer) {
                $processer($state, path);
            }

            if ('$value' in $state && ($state.$dirty || !utils.isUndefined($state.$value))) {
                $params[path] = $state.$value;
            }
        });

        const $pureParams = utils.toObject(
            $stateArray,
            ($params, { path, $state }) => path in $weakParams && utils.parsePath($params, path, $weakParams[path])
        );

        const $invalid = $stateArray.some(({ $state }) => $state.$invalid);
        const $dirty = $stateArray.some(({ $state }) => $state.$dirty);
        const $touched = $stateArray.some(({ $state }) => $state.$touched);
        const $focused = $stateArray.some(({ $state }) => $state.$focused);
        const $pending = this.$$formPending || $stateArray.some(({ $state }) => $state.$pending);

        const $formutil = (this.$formutil = {
            $$registers: this.$$registers,
            $$deepRegisters: this.$$deepRegisters,
            $states: utils.toObject($stateArray, ($states, { path, $state }) => utils.parsePath($states, path, $state)),
            $params: {
                ...this.$$defaultValues,
                ...$pureParams
            },
            $errors: utils.toObject($stateArray, ($errors, { path, $state }) => {
                if ($state.$invalid) {
                    utils.parsePath($errors, path, $state.$error);
                }
            }),
            $dirts: utils.toObject($stateArray, ($dirts, { path, $state }) =>
                utils.parsePath($dirts, path, $state.$dirty)
            ),
            $touches: utils.toObject($stateArray, ($touches, { path, $state }) =>
                utils.parsePath($touches, path, $state.$touched)
            ),
            $focuses: utils.toObject($stateArray, ($focuses, { path, $state }) =>
                utils.parsePath($focuses, path, $state.$focused)
            ),
            $pendings: utils.toObject($stateArray, ($pendings, { path, $state }) =>
                utils.parsePath($pendings, path, $state.$pending)
            ),

            $weakStates: utils.toObject($stateArray, ($states, { path, $state }) => ($states[path] = $state)),
            $weakParams,
            $weakErrors: utils.toObject($stateArray, ($errors, { path, $state }) => {
                if ($state.$invalid) {
                    $errors[path] = $state.$error;
                }
            }),
            $weakDirts: utils.toObject($stateArray, ($dirts, { path, $state }) => ($dirts[path] = $state.$dirty)),
            $weakTouches: utils.toObject(
                $stateArray,
                ($touches, { path, $state }) => ($touches[path] = $state.$touched)
            ),
            $weakFocuses: utils.toObject(
                $stateArray,
                ($focuses, { path, $state }) => ($focuses[path] = $state.$focused)
            ),
            $weakPendings: utils.toObject(
                $stateArray,
                ($weakPendings, { path, $state }) => ($weakPendings[path] = $state.$pending)
            ),

            $getFirstError(name) {
                if (name) {
                    const $fieldutil = $formutil.$getField(name);

                    return $fieldutil && $fieldutil.$getFirstError();
                }

                for (let name in $formutil.$weakErrors) {
                    const $fieldError = $formutil.$weakErrors[name];

                    for (let key in $fieldError) {
                        return $fieldError[key] instanceof Error ? $fieldError[key].message : $fieldError[key];
                    }
                }
            },

            $render: this.$render,

            $getField: this.$getField,
            $onValidates: this.$onValidates,

            // get the newest $formutil
            $new: () => this.$formutil,

            $setStates: this.$setStates,
            $setValues: this.$setValues,
            $setErrors: this.$setErrors,
            $setTouches: this.$setTouches,
            $setDirts: this.$setDirts,
            $setFocuses: this.$setFocuses,

            $batchState: this.$batchState,
            $batchTouched: this.$batchTouched,
            $batchDirty: this.$batchDirty,
            $batchFocused: this.$batchFocused,

            $reset: this.$reset,
            $validates: this.$validates,
            $validate: this.$validate,

            $valid: !$invalid,
            $invalid,
            $dirty,
            $pristine: !$dirty,
            $touched,
            $untouched: !$touched,
            $focused,
            $pending
        });

        return <FormContext.Provider value={this.getFormContext()}>{this._render()}</FormContext.Provider>;
    }
}

export default Form;
