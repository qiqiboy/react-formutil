import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

class Form extends Component {
    static displayName = 'React.formutil.Form';

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]).isRequired
    }

    static childContextTypes = {
        $$register: PropTypes.func,
        $$unregister: PropTypes.func,
        $$onChange: PropTypes.func
    };

    $$registers = {};

    getChildContext() {
        return {
            $$register: this.$$register,
            $$unregister: this.$$unregister,
            $$onChange: this.$$onChange
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
    };

    $$unregister = name => {
        delete this.$$registers[name];

        this.forceUpdate();
    };

    $getField = name => this.$$registers[name];

    $$onChange = (name, $state, callback) =>
        this.$setState(
            {
                [name]: $state
            },
            callback
        );

    $setState = ($stateTree, callback) => {
        utils.objectEach($stateTree, ($newState, name) => {
            if (name in this.$$registers) {
                const handler = this.$$registers[name];
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

    $setValue = ($valueTree, callback) => this.$setState(utils.objectMap($valueTree, $value => ({ $value })), callback);
    $setDirty = $dirtyTree => this.$setState(utils.objectMap($dirtyTree, $dirty => ({ $dirty, $pristine: !$dirty })));
    $setTouched = $touchedTree =>
        this.$setState(utils.objectMap($touchedTree, $touched => ({ $touched, $untouched: !$touched })));

    $batchState = ($state = {}) => this.$setState(utils.objectMap(this.$$registers, () => $state));
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
            $state: $stateArray.reduce(($formState, { path, $state }) => utils.parsePath($formState, path, $state), {}),
            $params: $stateArray.reduce((params, { path, $state }) => utils.parsePath(params, path, $state.$value), {}),
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

            $setState: this.$setState,
            $setValue: this.$setValue,
            $setTouched: this.$setTouched,
            $setDirty: this.$setDirty,

            $batchState: this.$batchState,
            $batchTouched: this.$batchTouched,
            $batchDirty: this.$batchDirty,

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
