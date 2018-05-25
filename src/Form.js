import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Form extends Component {
    static displayName = 'React.formutil.Form';

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired,
        $defaultValues: PropTypes.object,
        $defaultStates: PropTypes.object
    };

    static childContextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func,
        $$defaultValues: PropTypes.object,
        $$defaultStates: PropTypes.object
    };

    $$registers = {};
    $$deepRegisters = {};

    getChildContext() {
        return {
            $$register: this.$$register,
            $$unregister: this.$$unregister,
            $$onChange: this.$$onChange,
            $$defaultValues: this.props.$defaultValues || {},
            $$defaultStates: this.props.$defaultStates || {}
        };
    }

    /**
     * @desc 注册或者替换(preName)Field
     */
    $$register = (name, handler, preName) => {
        if (preName) {
            delete this.$$registers[preName];
        }

        this.$$registers[name] = handler;

        handler.validate();

        this.forceUpdate();

        this.creatDeepRigesters();
    };

    $$unregister = name => {
        delete this.$$registers[name];

        this.forceUpdate();

        this.creatDeepRigesters();
    };

    creatDeepRigesters = () => {
        this.$$deepRegisters = {};

        utils.objectEach(this.$$registers, (handler, name) => utils.parsePath(this.$$deepRegisters, name, handler));
    };

    $getField = name => this.$$registers[name] || utils.parsePath(this.$$deepRegisters, name);

    $$onChange = (name, $state, callback) =>
        this.$setStates(
            {
                [name]: $state
            },
            callback
        );

    $setStates = ($stateTree, callback) => {
        utils.objectEach($stateTree, ($newState, name) => {
            const handler = this.$getField(name);
            if (handler) {
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

                handler.merge($newState);

                if ('$value' in $newState) {
                    handler.validate();
                }
            } else {
                console.warn(`react-formutil: The Field: '${name}' is not existed!`);
            }
        });

        this.forceUpdate(callback);
    };

    $reset = ($stateTree = {}) =>
        this.$setStates(
            utils.objectMap(this.$$registers, (handler, name) =>
                handler.reset($stateTree[name] || utils.parsePath($stateTree, name))
            )
        );

    $setValues = ($valueTree, callback) =>
        this.$setStates(utils.objectMap($valueTree, $value => ({ $value })), callback);
    $setDirty = $dirtyTree => this.$setStates(utils.objectMap($dirtyTree, $dirty => ({ $dirty, $pristine: !$dirty })));
    $setTouched = $touchedTree =>
        this.$setStates(utils.objectMap($touchedTree, $touched => ({ $touched, $untouched: !$touched })));
    $setErrors = $errorTree => this.$setStates(utils.objectMap($errorTree, $error => ({ $error })));

    $batchStates = ($state = {}) => this.$setStates(utils.objectMap(this.$$registers, () => $state));
    $batchDirty = $dirty =>
        this.$batchStates({
            $dirty,
            $pristine: !$dirty
        });
    $batchTouched = $touched =>
        this.$batchStates({
            $touched,
            $untouched: !$touched
        });

    render() {
        const $stateArray = Object.keys(this.$$registers).map(path => ({
            path,
            $state: this.$$registers[path].picker()
        }));

        const $valid = $stateArray.every(({ $state }) => $state.$valid);
        const $dirty = $stateArray.some(({ $state }) => $state.$dirty);
        const $touched = $stateArray.some(({ $state }) => $state.$touched);
        const $pending = $stateArray.some(({ $state }) => $state.$pending);

        const $formutil = {
            $$registers: this.$$registers,
            $$deepRegisters: this.$$deepRegisters,
            $states: $stateArray.reduce(
                ($formState, { path, $state }) => utils.parsePath($formState, path, $state),
                {}
            ),
            $params: $stateArray.reduce((params, { path, $state }) => utils.parsePath(params, path, $state.$value), this.props.$defaultValues || {}),
            $error: $valid
                ? null
                : $stateArray.reduce(($error, { path, $state }) => {
                      if ($state.$invalid) {
                          return utils.parsePath($error, path, $state.$error);
                      }
                      return $error;
                  }, {}),
            $weakState: $stateArray.reduce(($formState, { path, $state }) => {
                $formState[path] = $state;
                return $formState;
            }, {}),
            $weakParams: $stateArray.reduce((params, { path, $state }) => {
                params[path] = $state.$value;
                return params;
            }, {}),
            $weakError: $valid
                ? null
                : $stateArray.reduce(($error, { path, $state }) => {
                      if ($state.$invalid) {
                          $error[path] = $state.$error;
                      }
                      return $error;
                  }, {}),

            $getField: this.$getField,

            $setStates: this.$setStates,
            $setValues: this.$setValues,
            $setErrors: this.$setErrors,
            $setTouched: this.$setTouched,
            $setDirty: this.$setDirty,

            $batchStates: this.$batchStates,
            $batchTouched: this.$batchTouched,
            $batchDirty: this.$batchDirty,

            $reset: this.$reset,

            $valid,
            $invalid: !$valid,
            $dirty,
            $pristine: !$dirty,
            $touched,
            $untouched: !$touched,
            $pending
        };

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
