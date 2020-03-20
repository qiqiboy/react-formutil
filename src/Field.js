import React, { Component } from 'react';
import { createHandler, GET_FIELD_UUID, propTypes, displayName, renderField } from './fieldHelper';
import FormContext from './context';
import warning from 'warning';
import isEqual from 'react-fast-compare';
import { runCallback, createRef, isStateEqual } from './utils';

class Field extends Component {
    static displayName = displayName;
    static propTypes = propTypes;

    $$FIELD_UUID = GET_FIELD_UUID();

    /** @type { any } */
    $formContext;
    /** @type { any } */
    $state;

    shouldRendered = false;

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

        this.$prevState = this.$state;

        createRef(this.props.$ref, this.$fieldutil);
    }

    componentWillUnmount() {
        if (this.$formContext.$$unregister) {
            this.$formContext.$$unregister(this.props.name, this.$fieldHandler, this.props.$reserveOnUnmount);
        }

        this.isMounting = false;

        createRef(this.props.$ref, null);
    }

    componentDidUpdate(prevProps) {
        const $name = this.props.name;

        if ($name !== prevProps.name) {
            if (this.$formContext.$$register) {
                this.$formContext.$$register($name, this.$fieldHandler, prevProps.name);
            }
        }

        createRef(this.props.$ref, this.$fieldutil);

        if (this.$state.$value !== this.$prevState.$value) {
            if (!($name in (this.$formContext.$$registers || {}))) {
                this.$registered.$$triggerChange({
                    $newValue: this.$state.$value,
                    $prevValue: this.$prevState.$value
                });
            }
        }

        this.$prevState = this.$state;
    }

    shouldComponentUpdate(nextProps) {
        const { $memo } = nextProps;

        return (
            !$memo ||
            /**
             * 这里不能用isEqual深度比较，避免遇到$value为大数据时导致性能问题
             * isStateEqual只比较一层
             */
            !isStateEqual(this.$registered.$getState(), this.$prevState) ||
            !(Array.isArray($memo) ? isEqual($memo, this.props.$memo) : isEqual(this.props, nextProps))
        );
    }

    $setState = ($newState, callback) =>
        new Promise(resolve => {
            const execute = () => resolve(runCallback(callback, this.$fieldutil));

            if (this.isMounting) {
                const $name = this.props.name;

                if ($name in (this.$formContext.$$registers || {})) {
                    this.shouldRendered = false;
                    this.$formContext.$$onChange($name, $newState, execute);

                    /**
                     * Ensure Field could rerender if <Field /> has been cached. In others words, it's vdomEq always true,
                     * <Form /> render not trigger Field rerender
                     */
                    if (!this.shouldRendered) {
                        this.forceUpdate();
                    }
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
        this.shouldRendered = true;

        return (
            <FormContext.Consumer>
                {getFormContext => {
                    const shouldInitial = !this.$formContext;

                    this.$formContext = getFormContext();

                    if (!this.$fieldHandler) {
                        this.$fieldHandler = createHandler(this, this);
                    }

                    this.$registered =
                        (this.$formContext.$$registers || {})[this.$fieldHandler.$name] || this.$fieldHandler;

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
