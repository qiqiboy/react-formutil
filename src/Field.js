import React, { Component } from 'react';
import { createHandler, GET_FIELD_UUID, propTypes, displayName, renderField } from './fieldHelper';
import FormContext from './context';
import warning from 'warning';
import { runCallback } from './utils';

class Field extends Component {
    static displayName = displayName;
    static propTypes = propTypes;

    $$FIELD_UUID = GET_FIELD_UUID();

    /** @type { any } */
    $formContext;
    /** @type { any } */
    $state;

    componentDidMount() {
        this.isMounting = true;

        const {
            props: { name: $name },
            $formContext
        } = this;

        warning(
            !$name || $formContext.$formutil,
            `You should enusre that the <Field /> with the name '${$name}' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated.`
        );

        warning($name, `You should assign a name to <Field />, otherwise it will be isolated!`);

        if ($formContext.$$register) {
            $formContext.$$register($name, this.$fieldHandler);
        }

        this.$prevValue = this.$state.$value;
    }

    componentWillUnmount() {
        if (this.$formContext.$$unregister) {
            this.$formContext.$$unregister(this.props.name, this.$fieldHandler, this.props.$reserveOnUnmount);
        }

        this.isMounting = false;
    }

    componentDidUpdate(prevProps) {
        const $name = this.props.name;

        if ($name !== prevProps.name) {
            if (this.$formContext.$$register) {
                this.$formContext.$$register($name, this.$fieldHandler, prevProps.name);
            }
        }

        if (this.$state.$value !== this.$prevValue) {
            if (!($name in (this.$formContext.$$registers || {}))) {
                this.$registered.$$triggerChange({
                    $newValue: this.$state.$value,
                    $prevValue: this.$prevValue
                });
            }

            this.$prevValue = this.$state.$value;
        }
    }

    $setState = ($newState, callback) =>
        new Promise(resolve => {
            const execute = () => resolve(runCallback(callback, this.$fieldutil));

            if (this.isMounting) {
                const $name = this.props.name;

                if ($name in (this.$formContext.$$registers || {})) {
                    this.$formContext.$$onChange($name, $newState, execute);
                } else {
                    this.$registered.$$merge($newState);

                    this.$registered.$$detectChange($newState);

                    this.forceUpdate(execute);
                }
            } else {
                this.$registered.$$merge($newState);
                execute();
            }
        });

    _render() {
        const $fieldutil = (this.$fieldutil = {
            $name: this.props.name,
            ...this.$registered.$getState(),
            ...this.$registered,
            $$formutil: this.$formContext.$formutil
        });

        return renderField($fieldutil, this.props);
    }

    render() {
        const shouldInitial = !this.$formContext;

        return (
            <FormContext.Consumer>
                {context => {
                    this.$formContext = context;

                    if (!this.$fieldHandler) {
                        this.$fieldHandler = createHandler(this, this);
                    }

                    this.$registered = (context.$$registers || {})[this.$fieldHandler.$name] || this.$fieldHandler;

                    if (shouldInitial) {
                        this.$fieldHandler.$$reset();
                        this.$fieldHandler.$validate();
                    }

                    return this._render();
                }}
            </FormContext.Consumer>
        );
    }
}

export default Field;
