import React, { Component, Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { unstable_batchedUpdates } from 'react-dom';
import FormContext from './context';
import * as utils from './utils';

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
        component: utils.checkComponentPropType,
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
        $processer: PropTypes.func,
        $ref: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({
                current: PropTypes.any
            })
        ])
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

    getFormContext = () => ({
        $$registers: this.$$registers,
        $$register: this.$$register,
        $$unregister: this.$$unregister,
        $$onChange: this.$$onChange,
        $$getDefault: this.$$getDefault,
        $formutil: this.$formutil
    });

    $$regDuplications = {};
    $$duplicateTimer;
    $$checkDuplication = () => {
        const { $$regDuplications } = this;
        let hasDup;

        utils.objectEach($$regDuplications, ([$curRegistered, $handler], name) => {
            warning($curRegistered.$$reserved, `The Field with a name '${name}' has been registered!`);

            $handler.$$reset($curRegistered.$getState());

            hasDup = delete $$regDuplications[name];
        });

        if (hasDup) {
            this.$render();
        }
    };

    /*
     * @desc 注册或者替换(preName)Field
     */
    $$register = (name, $handler, prevName) => {
        this.$$unregister(prevName, $handler);

        if (name) {
            const $curRegistered = this.$$getRegister(name);

            if ($curRegistered) {
                cancelFrame(this.$$duplicateTimer);

                this.$$regDuplications[name] = [$curRegistered, $handler];
                this.$$duplicateTimer = requestFrame(() => unstable_batchedUpdates(this.$$checkDuplication));
            } else {
                this.$$fieldChangedQueue.push({
                    name,
                    $newValue: $handler.$getState().$value
                });

                utils.objectClear(this.$$defaultValues, name);
            }

            this.$$registers[($handler.$name = name)] = $handler;

            // this.$$formShouldUpdateAll = true;
            this.$$formShouldUpdateFields[name] = true;

            this.createDeepRegisters();
            this.$render();
        }
    };

    $$unregister = (name, $handler, $$reserved) => {
        if (name) {
            if (name in this.$$regDuplications) {
                const [$curRegistered, $handler] = this.$$regDuplications[name];

                this.$$fieldChangedQueue.push({
                    name,
                    $newValue: $handler.$getState().$value,
                    $prevValue: $curRegistered.$getState().$value
                });

                delete this.$$regDuplications[name];
            } else if (this.$$registers[name] === $handler) {
                if ($$reserved) {
                    $handler.$$reserved = true;
                } else {
                    delete this.$$registers[name];

                    this.$$fieldChangedQueue.push({
                        name,
                        $prevValue: $handler.$getState().$value
                    });

                    utils.objectClear(this.$$defaultValues, name);
                }
            }

            this.$$formShouldUpdateAll = true;

            this.createDeepRegisters();
            this.$render();
        }
    };

    $$defaultInitialize = () => {
        const { $defaultValues, $defaultStates } = this.props;

        this.$$defaultValues = this.$$deepParseObject(
            utils.deepClone(utils.isFunction($defaultValues) ? $defaultValues(this.props) || {} : $defaultValues)
        );

        this.$$defaultStates = this.$$deepParseObject(
            utils.deepClone(utils.isFunction($defaultStates) ? $defaultStates(this.props) || {} : $defaultStates)
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

    // 本次Form更新时需要变动的fields
    $$formShouldUpdateFields = {};
    $$formShouldUpdateAll = false;

    $$resetFormUpdateFields() {
        this.$$formShouldUpdateFields = {};
        this.$$formShouldUpdateAll = false;
    }

    $$fieldChangedQueue = [];
    $$triggerFormChange = () => {
        if (this.$$fieldChangedQueue.length) {
            const $$fieldChangedQueue = [...this.$$fieldChangedQueue];

            this.$$fieldChangedQueue.length = 0;

            const $newValues = {};
            const $prevValues = {};
            const $$registers = this.$$registers;
            let hasFormChanged = false;

            $$fieldChangedQueue.forEach(item => {
                if (!(item.name in $$registers)) {
                    delete item.$newValue;
                }

                if (item.$newValue !== item.$prevValue) {
                    if ('$newValue' in item && '$prevValue' in item) {
                        const $handler = this.$$getRegister(item.name);

                        if ($handler) {
                            $handler.$$triggerChange(item);
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

    createDeepRegisters = () => (this.$$deepRegisters = this.$$deepParseObject(this.$$registers));

    $$getRegister = name => {
        if (name) {
            const field = this.$$registers[name] || utils.parsePath(this.$$deepRegisters, name);

            if (field) {
                return field;
            }
        }
    };

    $$formValidate = () =>
        (this.$$formValidatePromise = new Promise(resolve => {
            const { $validator } = this.props;

            let $breakAsyncHandler;
            let $shouldCancelPrevAsyncValidate;
            let prevCallback;
            let validation;

            const result = $validator(this.$formutil.$params, this.$formutil);
            const execCallback = $formutil => resolve(utils.runCallback(prevCallback, $formutil));

            if (utils.isPromise(result)) {
                if (!this.$$formPending) {
                    this.$$formPending = true;

                    this.$render();
                }

                $shouldCancelPrevAsyncValidate = setCallback => ($breakAsyncHandler = setCallback(execCallback));

                validation = result
                    .then(
                        () => void 0,
                        reason => reason
                    )
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
            return field.$new?.();
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
        const changed = [];

        utils.objectEach(this.$$registers, (handler, name) => {
            const pathData = utils.pathExist($parsedTree, name);

            if (force || pathData) {
                const $curState = handler.$getState();
                const $newState = handler && processer(pathData && pathData.data, handler);

                if ($newState) {
                    const { $value: $newValue } = handler.$$merge($newState);

                    changed.push([handler, $newState]);

                    if ('$value' in $newState || '$viewValue' in $newState) {
                        const findItem = utils.arrayFind(this.$$fieldChangedQueue, item => item.name === name);

                        if (findItem) {
                            findItem.$newValue = $newValue;
                        } else {
                            this.$$fieldChangedQueue.push({
                                name,
                                $newValue,
                                $prevValue: $curState.$value
                            });
                        }
                    }

                    this.$$formShouldUpdateFields[name] = true;
                }
            }
        });

        return unstable_batchedUpdates(() => {
            changed.forEach(([handler, $newState]) => handler.$$detectChange($newState));

            return this.$render(callback);
        });
    };

    componentDidMount() {
        utils.createRef(this.props.$ref, this.$formutil);
    }

    componentDidUpdate(prevProps) {
        utils.createRef(this.props.$ref, this.$formutil);

        this.$$triggerFormChange();
    }

    componentWillUnmount() {
        utils.createRef(this.props.$ref, null);
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
        this.$$deepParseObject(utils.deepClone($valueTree), this.$$defaultValues);

        utils.CLEAR(this.$$defaultValues);

        return this.$$setStates($valueTree, $value => ({ $value }), callback);
    };

    $setFocuses = ($focusedTree, callback) => this.$$setStates($focusedTree, $focused => ({ $focused }), callback);
    $setDirts = ($dirtyTree, callback) => this.$$setStates($dirtyTree, $dirty => ({ $dirty }), callback);
    $setTouches = ($touchedTree, callback) => this.$$setStates($touchedTree, $touched => ({ $touched }), callback);
    $setPendings = ($pendingTree, callback) => this.$$setStates($pendingTree, $pending => ({ $pending }), callback);
    $setErrors = ($errorTree, callback) => this.$$setStates($errorTree, $error => ({ $error }), callback);

    $batchState = ($state, callback) =>
        this.$setStates(
            utils.objectMap(this.$$registers, () => $state),
            callback
        );

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

    $getFirstError = name => {
        const $formutil = this.$formutil;

        if (name) {
            const $fieldutil = $formutil.$getField(name);

            return $fieldutil && $fieldutil.$getFirstError();
        }

        for (let name in $formutil.$weakErrors) {
            if ($formutil.$weakErrors.hasOwnProperty(name)) {
                const $fieldError = $formutil.$weakErrors[name];

                for (let key in $fieldError) {
                    if ($fieldError.hasOwnProperty(key)) {
                        return $fieldError[key] instanceof Error ? $fieldError[key].message : $fieldError[key];
                    }
                }
            }
        }
    };

    $new = () => this.$formutil;

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
            child && utils.isComponent(child.type)
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

        const updateAll = this.$$formShouldUpdateAll;
        const lastFormutil = this.$formutil || {};

        const $invalid = $stateArray.some(({ $state }) => $state.$invalid);
        const $dirty = $stateArray.some(({ $state }) => $state.$dirty);
        const $touched = $stateArray.some(({ $state }) => $state.$touched);
        const $focused = $stateArray.some(({ $state }) => $state.$focused);
        const $pending = this.$$formPending || $stateArray.some(({ $state }) => $state.$pending);

        const $pureParams = updateAll ? {} : { ...lastFormutil.$pureParams };

        const $states = updateAll ? {} : { ...lastFormutil.$states };
        const $errors = updateAll ? {} : { ...lastFormutil.$errors };
        const $dirts = updateAll ? {} : { ...lastFormutil.$dirts };
        const $touches = updateAll ? {} : { ...lastFormutil.$touches };
        const $focuses = updateAll ? {} : { ...lastFormutil.$focuses };
        const $pendings = updateAll ? {} : { ...lastFormutil.$pendings };

        const $weakStates = updateAll ? {} : { ...lastFormutil.$weakStates };
        const $weakParams = updateAll ? {} : { ...lastFormutil.$weakParams };
        const $weakErrors = updateAll ? {} : { ...lastFormutil.$weakErrors };
        const $weakDirts = updateAll ? {} : { ...lastFormutil.$weakDirts };
        const $weakFocuses = updateAll ? {} : { ...lastFormutil.$weakFocuses };
        const $weakTouches = updateAll ? {} : { ...lastFormutil.$weakTouches };
        const $weakPendings = updateAll ? {} : { ...lastFormutil.$weakPendings };

        for (let i = 0, j = $stateArray.length; i < j; i++) {
            const { $state, path } = $stateArray[i];

            if (!updateAll) {
                if (!this.$$formShouldUpdateFields[path]) {
                    continue;
                }
            }

            if ($processer) {
                $processer($state, path);
            }

            if (path in $weakParams && $state.$pristine && utils.isUndefined($state.$value)) {
                delete $weakParams[path];

                utils.objectClear($pureParams, path);
            } else if ($weakParams[path] !== $state.$value) {
                // update $weakParams
                $weakParams[path] = $state.$value;

                // update $pureParams
                utils.parsePath($pureParams, path, $state.$value);
            }

            // update $states
            utils.parsePath($states, path, $state);
            // update $weakStates
            $weakStates[path] = $state;

            if ($weakErrors[path] !== $state.$error) {
                if ($state.$invalid) {
                    // update $errors
                    utils.parsePath($errors, path, $state.$error);
                    // update $weakErrors
                    $weakErrors[path] = $state.$error;
                } else if (path in $weakErrors) {
                    utils.objectClear($errors, path);
                    delete $weakErrors[path];
                }
            }

            if ($weakDirts[path] !== $state.$dirty) {
                // update $dirts
                utils.parsePath($dirts, path, $state.$dirty);
                // update $weakDirts
                $weakDirts[path] = $state.$dirty;
            }

            if ($weakTouches[path] !== $state.$touched) {
                // update $touches
                utils.parsePath($touches, path, $state.$touched);
                // update $weakTouches
                $weakTouches[path] = $state.$touched;
            }

            if ($weakFocuses[path] !== $state.$focused) {
                // update $focuses
                utils.parsePath($focuses, path, $state.$focused);
                // update $weakFocuses
                $weakFocuses[path] = $state.$focused;
            }

            if ($weakPendings[path] !== $state.$pending) {
                // update $pendings
                utils.parsePath($pendings, path, $state.$pending);
                // update $weakPendings
                $weakPendings[path] = $state.$pending;
            }
        }

        this.$formutil = {
            $$registers: { ...this.$$registers },
            $$deepRegisters: this.$$deepRegisters,
            $states,
            $pureParams,
            $params: {
                ...this.$$defaultValues,
                ...$pureParams
            },
            $errors,
            $dirts,
            $touches,
            $focuses,
            $pendings,

            $weakStates,
            $weakParams,
            $weakErrors,
            $weakDirts,
            $weakTouches,
            $weakFocuses,
            $weakPendings,

            $getFirstError: this.$getFirstError,

            $render: this.$render,

            $getField: this.$getField,
            $onValidates: this.$onValidates,

            // get the newest $formutil
            $new: this.$new,

            $setStates: this.$setStates,
            $setValues: this.$setValues,
            $setErrors: this.$setErrors,
            $setTouches: this.$setTouches,
            $setDirts: this.$setDirts,
            $setFocuses: this.$setFocuses,
            $setPendings: this.$setPendings,

            $batchState: this.$batchState,
            $batchTouched: this.$batchTouched,
            $batchDirty: this.$batchDirty,
            $batchFocused: this.$batchFocused,
            $batchPending: this.$batchPending,

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
        };

        this.$$resetFormUpdateFields();

        return <FormContext.Provider value={this.getFormContext}>{this._render()}</FormContext.Provider>;
    }
}

export default Form;
