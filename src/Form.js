import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

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
        $defaultValues: PropTypes.object,
        $defaultStates: PropTypes.object,
        $onFormChange: PropTypes.func
    };

    static childContextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func,
        $$defaultValues: PropTypes.object,
        $$defaultStates: PropTypes.object,
        $formutil: PropTypes.object
    };

    static defaultProps = {
        $defaultValues: {},
        $defaultStates: {}
    };

    $$registers = {};
    $$deepRegisters = {};

    getChildContext() {
        return {
            $$register: this.$$register,
            $$unregister: this.$$unregister,
            $$onChange: this.$$onChange,
            $$defaultValues: this.$$defaultValues,
            $$defaultStates: this.$$defaultStates,
            $formutil: this.$formutil
        };
    }

    $$defaultValues = JSON.parse(JSON.stringify(this.props.$defaultValues));
    $$defaultStates = JSON.parse(JSON.stringify(this.props.$defaultStates));

    /**
     * @desc 注册或者替换(preName)Field
     */
    $$register = (name, $handler, preName) => {
        if (preName && $handler.$$FIELD_UUID === this.$getField(preName).$$FIELD_UUID) {
            delete this.$$registers[preName];
            utils.objectClear(this.$$defaultValues, preName);

            this.$$fieldChangedQueue.push({
                name: preName,
                $preValue: this.$formutil.$weakParams[preName]
            });
        }

        if (name) {
            this.$$registers[name] = $handler;

            this.$$fieldChangedQueue.push({
                name,
                $newValue: $handler.$picker().$value
            });

            $handler.$validate();
        }

        if (name || preName) {
            this.creatDeepRegisters();
            this.$render();
        }
    };

    $$unregister = (name, $handler) => {
        if (name && $handler.$$FIELD_UUID === this.$getField(name).$$FIELD_UUID) {
            delete this.$$registers[name];
            utils.objectClear(this.$$defaultValues, name);

            this.$$fieldChangedQueue.push({
                name,
                $preValue: this.$formutil.$weakParams[name]
            });

            this.creatDeepRegisters();
            this.$render();
        }
    };

    $$fieldChangedQueue = [];
    $$triggerFormChange = () => {
        if (this.$$fieldChangedQueue.length) {
            const $$fieldChangedQueue = [...this.$$fieldChangedQueue];
            this.$$fieldChangedQueue.length = 0;

            const $newValues = {};
            const $preValues = {};
            let hasFormChanged = false;
            $$fieldChangedQueue.forEach(item => {
                if (item.$newValue !== item.$preValue) {
                    if ('$newValue' in item && '$preValue' in item) {
                        this.$getField(item.name).$$triggerChange(item);
                    }

                    '$newValue' in item && utils.parsePath($newValues, item.name, item.$newValue);
                    '$preValue' in item && utils.parsePath($preValues, item.name, item.$preValue);

                    hasFormChanged = true;
                }
            });

            if (hasFormChanged && utils.isFunction(this.props.$onFormChange)) {
                this.props.$onFormChange(this.$formutil, $newValues, $preValues);
            }
        }
    };

    creatDeepRegisters = () => {
        this.$$deepRegisters = {};

        utils.objectEach(this.$$registers, (handler, name) => utils.parsePath(this.$$deepRegisters, name, handler));
    };

    fetchTreeFromRegisters(dataTree, process) {
        const newTree = {};
        const parsedTree = { ...dataTree };

        utils.objectEach(dataTree, (data, name) => utils.parsePath(parsedTree, name, data));

        utils.objectEach(this.$$registers, (handler, name) => {
            const data = parsedTree[name] || utils.parsePath(parsedTree, name);

            if (!utils.isUndefined(data)) {
                utils.parsePath(newTree, name, process(data));
            }
        });

        return newTree;
    }

    $getField = name => {
        const field = this.$$registers[name] || utils.parsePath(this.$$deepRegisters, name);

        if (field) {
            return {
                ...field,
                ...field.$picker(),
                $$formutil: this.$formutil
            };
        }
    };

    $$onChange = (name, $state, callback) =>
        this.$setStates(
            {
                [name]: $state
            },
            callback
        );

    $setStates = ($stateTree, callback) => {
        const $parsedTree = { ...$stateTree };

        utils.objectEach($stateTree || {}, (data, name) => utils.parsePath($parsedTree, name, data));

        utils.objectEach(this.$$registers, (handler, name) => {
            const $newState = $parsedTree[name] || utils.parsePath($parsedTree, name);
            if ($newState) {
                if ('$value' in $newState) {
                    const $newValue = $newState.$value;
                    const $preValue = this.$formutil.$weakParams[name];
                    const findItem = utils.arrayFind(this.$$fieldChangedQueue, item => item.name === name);

                    if (findItem) {
                        findItem.$newValue = $newValue;
                    } else {
                        this.$$fieldChangedQueue.push({
                            name,
                            $newValue,
                            $preValue
                        });
                    }
                }

                handler.$$merge($newState);
            }
        });

        this.$render(callback);
    };

    $render = callback =>
        this.forceUpdate(() => {
            utils.isFunction(callback) && callback();

            this.$$triggerFormChange();
        });

    $validates = () => utils.objectEach(this.$$registers, handler => handler.$validate());
    $validate = (name, callback) => this.$getField(name).$validate(callback);

    $reset = ($stateTree, callback) => {
        if (utils.isFunction($stateTree)) {
            callback = $stateTree;
            $stateTree = {};
        }

        const $parsedTree = { ...$stateTree };
        utils.objectEach($stateTree || {}, (data, name) => utils.parsePath($parsedTree, name, data));

        return this.$setStates(
            utils.objectMap(this.$$registers, (handler, name) =>
                handler.$$reset($parsedTree[name] || utils.parsePath($parsedTree, name))
            ),
            callback
        );
    };

    $setValues = ($valueTree, callback) => {
        Object.assign(this.$$defaultValues, JSON.parse(JSON.stringify($valueTree)));
        return this.$setStates(this.fetchTreeFromRegisters($valueTree, $value => ({ $value })), callback);
    };
    $setFocuses = ($focusedTree, callback) =>
        this.$setStates(this.fetchTreeFromRegisters($focusedTree, $focused => ({ $focused })), callback);
    $setDirts = ($dirtyTree, callback) =>
        this.$setStates(this.fetchTreeFromRegisters($dirtyTree, $dirty => ({ $dirty, $pristine: !$dirty })), callback);
    $setTouches = ($touchedTree, callback) =>
        this.$setStates(
            this.fetchTreeFromRegisters($touchedTree, $touched => ({ $touched, $untouched: !$touched })),
            callback
        );
    $setErrors = ($errorTree, callback) =>
        this.$setStates(this.fetchTreeFromRegisters($errorTree, $error => ({ $error })), callback);

    $batchState = ($state, callback) => this.$setStates(utils.objectMap(this.$$registers, () => $state), callback);
    $batchDirty = ($dirty, callback) =>
        this.$batchState(
            {
                $dirty,
                $pristine: !$dirty
            },
            callback
        );
    $batchTouched = ($touched, callback) =>
        this.$batchState(
            {
                $touched,
                $untouched: !$touched
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

    render() {
        const $stateArray = Object.keys(this.$$registers).map(path => ({
            path,
            $state: this.$$registers[path].$picker()
        }));

        const $invalid = $stateArray.some(({ $state }) => $state.$invalid);
        const $dirty = $stateArray.some(({ $state }) => $state.$dirty);
        const $touched = $stateArray.some(({ $state }) => $state.$touched);
        const $focused = $stateArray.some(({ $state }) => $state.$focused);
        const $pending = $stateArray.some(({ $state }) => $state.$pending);

        const $formutil = (this.$formutil = {
            $$registers: this.$$registers,
            $$deepRegisters: this.$$deepRegisters,
            $states: utils.toObject($stateArray, ($states, { path, $state }) => utils.parsePath($states, path, $state)),
            $params: utils.toObject(
                $stateArray,
                ($params, { path, $state }) =>
                    (!utils.isUndefined($state.$value) || $state.$dirty) &&
                    utils.parsePath($params, path, $state.$value),
                {
                    ...this.$$defaultValues
                }
            ),
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

            $weakStates: utils.toObject($stateArray, ($states, { path, $state }) => ($states[path] = $state)),
            $weakParams: utils.toObject(
                $stateArray,
                ($params, { path, $state }) =>
                    (!utils.isUndefined($state.$value) || $state.$dirty) && ($params[path] = $state.$value)
            ),
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

            $getFirstError() {
                for (let name in $formutil.$weakErrors) {
                    for (let key in $formutil.$weakErrors[name]) {
                        return $formutil.$weakErrors[name][key];
                    }
                }
            },

            $render: this.$render,

            $getField: this.$getField,

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

        let { children, render, component: TheComponent } = this.props;

        if (TheComponent) {
            return <TheComponent $formutil={$formutil} />;
        }

        if (utils.isFunction(render)) {
            return render($formutil);
        }

        if (utils.isFunction(children)) {
            return children($formutil);
        }

        return Children.map(
            children,
            child =>
                child && utils.isFunction(child.type)
                    ? cloneElement(child, {
                          $formutil
                      })
                    : child
        );
    }
}

export default Form;
