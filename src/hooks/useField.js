import React from 'react';
import warning from 'warning';
import useFormContext from './useFormContext';
import { runCallback, createRef } from '../utils';
import { createHandler, GET_FIELD_UUID } from '../fieldHelper';

/**
 * @description
 * The custom hook for Field
 *
 * @param {string | object} [name]
 * @param {object} [props]
 *
 * @return {object} $Fieldutil
 */
function useField(name, props = {}) {
    if (!React.useState) {
        throw new Error(`Hooks api need react@>=16.8, Please upgrade your reactjs.`);
    }

    const { useState, useLayoutEffect, useRef } = React;

    let $name;

    if (name) {
        if (typeof name === 'string') {
            $name = name;

            props.name = $name;
        } else {
            props = name;

            $name = props.name;
        }
    }

    const $formContext = useFormContext();
    /** @type {any} */
    const $this = useRef({}).current;
    /** @type {React.MutableRefObject<any[]>} */
    const callbackRef = useRef([]);

    let $registered;

    $this.$formContext = $formContext;
    $this.props = props;
    $this.$setState = $setState;
    $this.shouldRendered = true;

    // we not directly use this $state, just from $this.$state
    const [, setState] = useState(() => {
        $this.$$FIELD_UUID = GET_FIELD_UUID();
        $this.$fieldHandler = $registered = createHandler($this);

        $this.$fieldHandler.$$reset();
        $this.$fieldHandler.$validate();
    });

    if (!$registered) {
        $registered = ($formContext.$$registers || {})[$this.$fieldHandler.$name] || $this.$fieldHandler;
    }

    useLayoutEffect(() => {
        const { $state } = $this;

        if ($this.isMounting) {
            if (!($name in ($formContext.$$registers || {}))) {
                $registered.$$triggerChange({
                    $newValue: $state.$value,
                    $prevValue: $this.$prevState.$value
                });
            }
        }

        $this.$prevState = $state;
        // eslint-disable-next-line
    }, [$this.$state.$value]);

    useLayoutEffect(() => {
        $this.isMounting = true;

        warning(
            !$name || $formContext.$formutil,
            `You should enusre that the useField() with the name '${$name}' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated.`
        );

        warning($name, `You should pass a name argument to useField(), otherwise it will be isolated!`);

        return () => {
            $this.isMounting = false;

            createRef(props.$ref, null);
        };
        // eslint-disable-next-line
    }, []);

    useLayoutEffect(() => {
        if ($formContext.$$register) {
            $formContext.$$register($name, $this.$fieldHandler);
        }

        return () => {
            if ($formContext.$$unregister) {
                $formContext.$$unregister($name, $this.$fieldHandler, !$this.isMounting && props.$reserveOnUnmount);
            }
        };
        // eslint-disable-next-line
    }, [$name]);

    // trigger ref callback
    useLayoutEffect(() => {
        createRef(props.$ref, $this.$fieldutil);
    });

    useLayoutEffect(() => {
        if (callbackRef.current.length > 0) {
            const callbackQueue = [...callbackRef.current];

            callbackRef.current.length = 0;

            while (callbackQueue.length) {
                callbackQueue.pop()($this.$fieldutil);
            }
        }
    });

    function $setState($newState, callback) {
        return new Promise(resolve => {
            const execute = () => resolve(runCallback(callback, $this.$fieldutil));

            if ($this.isMounting) {
                if ($name in ($formContext.$$registers || {})) {
                    $this.shouldRendered = false;
                    $formContext.$$onChange($name, $newState, execute);

                    if (!$this.shouldRendered) {
                        setState({});
                    }
                } else {
                    $registered.$$merge($newState);
                    $registered.$$detectChange($newState);

                    setState({});

                    callbackRef.current.push(execute);
                }
            } else {
                $registered.$$merge($newState);
                execute();
            }
        });
    }

    return ($this.$fieldutil = {
        $name,
        ...$registered.$getState(),
        ...$registered,
        $$formutil: $formContext.$formutil
    });
}

export default useField;
