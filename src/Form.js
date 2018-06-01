import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Form extends Component {
    static displayName = 'React.formutil.Form';

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
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

    $$registers = {};
    $$deepRegisters = {};

    getChildContext() {
        return {
            $$register: this.$$register,
            $$unregister: this.$$unregister,
            $$onChange: this.$$onChange,
            $$defaultValues: this.props.$defaultValues || {},
            $$defaultStates: this.props.$defaultStates || {},
            $formutil: this.$formutil
        };
    }

    /**
     * @desc 注册或者替换(preName)Field
     */
    $$register = (name, handler, preName) => {
        if (preName) {
            delete this.$$registers[preName];
        }

        if (name) {
            this.$$registers[name] = handler;

            handler.$validate();
        }

        if (name || preName) {
            this.creatDeepRigesters();
            this.$render();
        }
    };

    $$unregister = name => {
        if (name) {
            delete this.$$registers[name];

            this.creatDeepRigesters();
            this.$render();
        }
    };

    creatDeepRigesters = () => {
        this.$$deepRegisters = {};

        utils.objectEach(this.$$registers, (handler, name) => utils.parsePath(this.$$deepRegisters, name, handler));
    };

    fetchTreeFromRegisters(dataTree, process) {
        const newTree = {};
        utils.objectEach(this.$$registers, (handler, name) => {
            if (name in dataTree) {
                newTree[name] = process(dataTree[name]);
            } else {
                const data = utils.parsePath(dataTree, name);

                if (typeof data !== 'undefined') {
                    newTree[name] = process(data);
                }
            }
        });

        return newTree;
    }

    $getField = name => this.$$registers[name] || utils.parsePath(this.$$deepRegisters, name);

    $$onChange = (name, $state, callback) =>
        this.$setStates(
            {
                [name]: $state
            },
            callback
        );

    $setStates = ($stateTree = {}, callback) => {
        const $newValues = {};
        const $preValues = {};
        const callbackQueue = [];

        utils.objectEach(this.$$registers, (handler, name) => {
            const $newState = $stateTree[name] || utils.parsePath($stateTree, name);
            if ($newState) {
                handler.$$merge($newState);

                if ('$value' in $newState) {
                    const $newValue = $newState.$value;
                    const $preValue = this.$formutil.$weakParams[name];

                    if ($newValue !== $preValue) {
                        utils.parsePath($newValues, name, $newValue);
                        utils.parsePath($preValues, name, $preValue);

                        callbackQueue.push({
                            callback: handler.$$getFieldChangeHandler(),
                            args: [$newValue, $preValue]
                        });
                    }
                }
            }
        });

        this.$render(() => {
            callback && callback();

            if (Object.keys($newValues).length) {
                const { $onFormChange } = this.props;

                callbackQueue.push({
                    callback: $onFormChange,
                    args: [this.$formutil, $newValues, $preValues]
                });
            }

            callbackQueue.forEach(item => {
                typeof item.callback === 'function' && item.callback(...item.args);
            });
        });
    };

    $render = callback => this.forceUpdate(callback);

    $validates = () => utils.objectEach(this.$$registers, handler => handler.$validate());
    $validate = name => this.$getField(name).$validate();

    $reset = ($stateTree = {}) =>
        this.$setStates(
            utils.objectMap(this.$$registers, (handler, name) =>
                handler.$$reset($stateTree[name] || utils.parsePath($stateTree, name))
            )
        );

    $setValues = ($valueTree, callback) =>
        this.$setStates(this.fetchTreeFromRegisters($valueTree, $value => ({ $value })), callback);
    $setFocuses = $focusedTree =>
        this.$setStates(this.fetchTreeFromRegisters($focusedTree, $focused => ({ $focused })));
    $setDirts = $dirtyTree =>
        this.$setStates(this.fetchTreeFromRegisters($dirtyTree, $dirty => ({ $dirty, $pristine: !$dirty })));
    $setTouches = $touchedTree =>
        this.$setStates(this.fetchTreeFromRegisters($touchedTree, $touched => ({ $touched, $untouched: !$touched })));
    $setErrors = $errorTree => this.$setStates(this.fetchTreeFromRegisters($errorTree, $error => ({ $error })));

    $batchState = ($state = {}) => this.$setStates(utils.objectMap(this.$$registers, () => $state));
    $batchDirty = $dirty =>
        this.$batchState({
            $dirty,
            $pristine: !$dirty
        });
    $batchTouched = $touched =>
        this.$batchState({
            $touched,
            $untouched: !$touched
        });
    $batchFocused = $focused =>
        this.$batchState({
            $focused
        });

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
                ($params, { path, $state }) => utils.parsePath($params, path, $state.$value),
                {
                    ...this.props.$defaultValues
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
            $weakParams: utils.toObject($stateArray, ($params, { path, $state }) => ($params[path] = $state.$value)),
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

            $render: this.$render,

            $getField: this.$getField,

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

        const { children } = this.props;

        if (typeof children === 'function') {
            return children($formutil);
        }

        return Children.map(children, child =>
            cloneElement(child, {
                $formutil
            })
        );
    }
}

export default Form;
