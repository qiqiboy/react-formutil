import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

function withForm(Form) {
    return class extends Component {
        static displayName = 'WithForm.' + Form.name;

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

        $$register = (name, picker) => {
            this.$$registers[name] = picker;
            this.forceUpdate();
        };

        $$unregister = name => {
            delete this.$$registers[name];
            this.forceUpdate();
        };

        $$onChange = name => this.$setState(name);

        $setState = (name, $newState = {}) => {
            if (typeof name !== 'string') {
                console.warn(
                    `The argument 'name' of $setState need to be a string! You may want to use '$batchState'.`
                );
            } else {
                Object.assign(this.$$registers[name](), $newState);

                this.forceUpdate();
            }
        };

        $setValue = (name, $value) =>
            this.$setState(name, {
                $value
            });

        $setDirty = (name, $dirty) =>
            this.$setState(name, {
                $dirty,
                $pristine: !$dirty
            });

        $setTouched = (name, $touched) =>
            this.$setState(name, {
                $touched,
                $untouched: !$touched
            });

        $batchState = ($newState = {}) => {
            if (typeof $newState !== 'object') {
                console.warn(`$batchState need a Object as the obnly argument!`);
            } else {
                Object.keys(this.$$registers).forEach(path => Object.assign(this.$$registers[path](), $newState));

                this.forceUpdate();
            }
        };

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
            const $stateTree = Object.keys(this.$$registers).map(path => ({
                path,
                $state: this.$$registers[path]()
            }));

            const $valid = $stateTree.every(({ $state }) => $state.$valid);
            const $dirty = $stateTree.some(({ $state }) => $state.$dirty);
            const $touched = $stateTree.some(({ $state }) => $state.$touched);

            const easyform = {
                $state: $stateTree.reduce(
                    ($formState, { path, $state }) => utils.parsePath($formState, path, $state),
                    {}
                ),
                $params: $stateTree.reduce(
                    (params, { path, $state }) => utils.parsePath(params, path, $state.$value),
                    {}
                ),
                $error: $valid
                    ? null
                    : $stateTree.reduce(($error, { path, $state }) => {
                          if ($state.$invalid) {
                              return utils.parsePath($error, path, $state.$error);
                          }
                          return $error;
                      }, {}),
                $weakState: $stateTree.reduce(($formState, { path, $state }) => {
                    $formState[path] = $state;
                    return $formState;
                }, {}),
                $weakParams: $stateTree.reduce((params, { path, $state }) => {
                    params[path] = $state.$value;
                    return params;
                }, {}),
                $weakError: $valid
                    ? null
                    : $stateTree.reduce(($error, { path, $state }) => {
                          if ($state.$invalid) {
                              $error[path] = $state.$error;
                          }
                          return $error;
                      }, {}),

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
                $untouched: !$touched
            };

            return <Form {...this.props} easyform={easyform} />;
        }
    };
}

export default withForm;
