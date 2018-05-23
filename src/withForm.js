import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

function withForm(Form) {
    return class extends Component {
        static displayName = 'React.formutil.withForm.' + Form.name;

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

        $$onChange = name => this.$setState(name);

        $$updateFieldState(name, $newState) {
            if (name in this.$$registers) {
                Object.assign(this.$$registers[name].picker(), $newState);

                if ('$value' in $newState) {
                    this.$$registers[name].validate();
                }
            } else {
                console.warn(`react-formutil: The Field: '${name}' is not existed!`);
            }
        }

        $setState = (name, $newState = {}) => {
            if (typeof name === 'string') {
                this.$$updateFieldState(name, $newState);
            } else {
                Object.keys(name).forEach(key => {
                    this.$$updateFieldState(name, name[key]);
                });
            }

            this.forceUpdate();
        };

        $setValue = (name, $value) => {
            if (typeof name === 'string') {
                this.$$updateFieldState(name, {
                    $value
                });
            } else {
                Object.keys(name).forEach(key => {
                    this.$$updateFieldState(key, {
                        $value: name[key]
                    });
                });
            }

            this.forceUpdate();
        };

        $setDirty = (name, $dirty) => {
            if (typeof name === 'string') {
                this.$$updateFieldState(name, {
                    $dirty,
                    $pristine: !$dirty
                });
            } else {
                Object.keys(name).forEach(key => {
                    this.$$updateFieldState(key, {
                        $dirty: name[key],
                        $pristine: !name[key]
                    });
                });
            }

            this.forceUpdate();
        };

        $setTouched = (name, $touched) => {
            if (typeof name === 'string') {
                this.$$updateFieldState(name, {
                    $touched,
                    $untouched: !$touched
                });
            } else {
                Object.keys(name).forEach(key => {
                    this.$$updateFieldState(key, {
                        $touched: name[key],
                        $untouched: !name[key]
                    });
                });
            }

            this.forceUpdate();
        };

        $batchState = ($newState = {}) => {
            if (typeof $newState !== 'object') {
                console.warn(`$batchState need a Object as the only argument!`);
            } else {
                Object.keys(this.$$registers).forEach(name => this.$$updateFieldState(name, $newState));

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
                $state: this.$$registers[path].picker()
            }));

            const $valid = $stateTree.every(({ $state }) => $state.$valid);
            const $dirty = $stateTree.some(({ $state }) => $state.$dirty);
            const $touched = $stateTree.some(({ $state }) => $state.$touched);
            const $pending = $stateTree.some(({ $state }) => $state.$pending);

            const $formutil = {
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
                $untouched: !$touched,
                $pending
            };

            return <Form {...this.props} $formutil={$formutil} />;
        }
    };
}

export default withForm;
