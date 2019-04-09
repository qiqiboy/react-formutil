function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useState, useLayoutEffect, useRef } from 'react';
import useFormContext from './useFormContext';
import { runCallback } from '../utils';
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
  var $name;

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
  $this.$setState = $setState; // we not directly use this $state, just from $this.$state

  var _useState = useState(function () {
    $this.$$FIELD_UUID = GET_FIELD_UUID();
    $this.$fieldHandler = createHandler($this);
    var $state = $this.$fieldHandler.$$reset();
    $this.$fieldHandler.$validate();
    return $state;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      setState = _useState2[1];

  var $registered = ($formContext.$$registers || {})[$this.$fieldHandler.$name] || $this.$fieldHandler;
  useLayoutEffect(function () {
    var $state = $this.$state;

    if ($this.isMounting) {
      if (!($name in ($formContext.$$registers || {}))) {
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
    warning(!$name || $formContext.$formutil, "You should enusre that the useField() with the name '".concat($name, "' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));
    warning($name, "You should pass a name argument to useField(), otherwise it will be isolated!");
    return function () {
      if ($formContext.$$unregister) {
        $formContext.$$unregister($name, $this.$fieldHandler, props.$reserveOnUnmount);
      }

      $this.isMounting = false;
    };
  }, []);
  useLayoutEffect(function () {
    if ($formContext.$$register) {
      $this.$registered = $formContext.$$register($name, $this.$fieldHandler, $this.$prevName);
    }

    $this.$prevName = $name;
  }, [$name]);
  useLayoutEffect(function () {
    if (callbackRef.current.length > 0) {
      var callbackQueue = _toConsumableArray(callbackRef.current);

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
        if ($name in ($formContext.$$registers || {})) {
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

  return $this.$fieldutil = _objectSpread({
    $name: $name
  }, $registered.$getState(), $registered, {
    $$formutil: $formContext.$formutil
  });
}

export default useField;