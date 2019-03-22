var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { useState, useLayoutEffect, useRef } from 'react';
import useFormContext from './useFormContext';
import { isFunction, runCallback } from '../utils';
import { createHandler, GET_FIELD_UUID } from '../fieldHelper';
import warning from 'warning';

/**
 * @description
 * The custom hook for Field
 *
 * @param {string | object} [name]
 * @param {object} [props]
 *
 * @return {object} $Fieldutil
 */
function useField(name) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $name = void 0;

    if (name) {
        if (typeof name === 'string') {
            $name = name;

            props.name = $name;
        } else {
            props = name;

            $name = props.name;
        }
    }

    var $formContext = useFormContext();
    /** @type {any} */
    var $this = useRef({}).current;
    /** @type {React.MutableRefObject<any[]>} */
    var callbackRef = useRef([]);

    $this.$formContext = $formContext;
    $this.props = props;
    $this.$setState = $setState;

    var $registered = $this.$registered || $this.$fieldHandler || ($this.$fieldHandler = createHandler($this));
    // we not directly use this $state, just from $this.$state

    var _useState = useState(function () {
        $this.$fieldHandler.$$FIELD_UUID = GET_FIELD_UUID();

        var $state = $registered.$$reset();

        $registered.$validate();

        return $state;
    }),
        _useState2 = _slicedToArray(_useState, 2),
        setState = _useState2[1];

    useLayoutEffect(function () {
        var $state = $this.$state;


        if ($this.isMounting) {
            if (!$name || !$formContext.$$register) {
                var $prevValue = $this.$prevValue;


                $registered.$$triggerChange({
                    $newValue: $state.$value,
                    $prevValue: $prevValue
                });
            }
        }

        $this.$prevValue = $state.$value;
    }, [$this.$state.$value]);

    useLayoutEffect(function () {
        $this.isMounting = true;

        warning(!$name || $formContext.$formutil, 'You should enusre that the useField() with the name \'' + $name + '\' must be used underneath a <Form /> component or withForm() HOC, otherwise it\'s isolated.');

        warning($name, 'You should pass a name argument to useField(), otherwise it will be isolated!');

        return function () {
            if ($formContext.$$unregister) {
                $formContext.$$unregister($name, $this.$fieldHandler, props.$reserveOnUnmount);
            }

            $this.isMounting = false;
        };
    }, []);

    useLayoutEffect(function () {
        if ($formContext.$$register) {
            if ($name) {
                $this.$registered = $formContext.$$register($name, $this.$fieldHandler, $this.$prevName);
            } else {
                $formContext.$$unregister($name, $this.$fieldHandler);
            }
        }

        $this.$prevName = $name;
    }, [$name]);

    useLayoutEffect(function () {
        if (callbackRef.current.length > 0) {
            var callbackQueue = [].concat(_toConsumableArray(callbackRef.current));

            callbackRef.current.length = 0;

            while (callbackQueue.length) {
                callbackQueue.pop()($this.$fieldutil);
            }
        }
    });

    function $setState($newState, callback) {
        return new Promise(function (resolve) {
            var execute = function execute() {
                return resolve(runCallback(callback, $this.$fieldutil));
            };

            if ($this.isMounting) {
                if ($name && $formContext.$$onChange) {
                    $formContext.$$onChange($name, $newState, execute);
                } else {
                    setState($registered.$$merge($newState));

                    $registered.$$detectChange($newState);

                    callbackRef.current.push(execute);
                }
            } else {
                $registered.$$merge($newState);
                execute();
            }
        });
    }

    return $this.$fieldutil = Object.assign({
        $name: $name
    }, $registered.$getState(), $registered, {
        $$formutil: $formContext.$formutil
    });
}

export default useField;