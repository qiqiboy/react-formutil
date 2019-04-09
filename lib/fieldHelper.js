function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';
import warning from 'warning';
import { FORM_VALIDATE_RESULT } from './Form';
var FIELD_UUID = 0;
var $baseState = {
  $valid: true,
  $invalid: false,
  $dirty: false,
  $pristine: true,
  $touched: false,
  $untouched: true,
  $focused: false,
  $pending: false,
  $error: {}
};

function isError(result) {
  return (
    /*!utils.isUndefined(result) && */
    result !== true
  );
}

function warningValidatorReturn(result, key, name) {
  warning(!utils.isUndefined(result), "You should return a string or Error when the validation('".concat(name && name + ': ').concat(key, "') failed, otherwise return true."));
}

export var propTypes = {
  name: PropTypes.string,
  $defaultValue: PropTypes.any,
  $defaultState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  $onFieldChange: PropTypes.func,
  $validators: PropTypes.object,
  $asyncValidators: PropTypes.object,
  $validateLazy: PropTypes.bool,
  $reserveOnUnmount: PropTypes.bool,
  $parser: PropTypes.func,
  $formatter: PropTypes.func,
  render: PropTypes.func,
  component: PropTypes.func,
  children: function children(props) {
    var pt = PropTypes.oneOfType([PropTypes.func, PropTypes.node]);

    if (!props.render && !props.component && props.children !== null) {
      pt = pt.isRequired;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  }
};
export var displayName = 'React.Formutil.Field';
export function GET_FIELD_UUID() {
  return FIELD_UUID++;
}
export function renderField($fieldutil, props) {
  var children = props.children,
      render = props.render,
      component = props.component;

  if (component) {
    return createElement(component, {
      $fieldutil: $fieldutil
    });
  }

  if (utils.isFunction(render)) {
    return render($fieldutil);
  }

  if (utils.isFunction(children)) {
    return children($fieldutil);
  }

  return Children.map(children, function (child) {
    return child && utils.isFunction(child.type) ? cloneElement(child, {
      $fieldutil: $fieldutil
    }) : child;
  });
}
export function createHandler($this, owner) {
  var $fieldHandler = {
    $$FIELD_UUID: $this.$$FIELD_UUID,
    $$reset: $$reset,
    $$merge: $$merge,
    $$detectChange: $$detectChange,
    $$triggerChange: $$triggerChange,
    $onValidate: $onValidate,
    $new: function $new() {
      return $this.$fieldutil;
    },
    $picker: $getState,
    $getState: $getState,
    // not support in Hooks
    $getComponent: function $getComponent() {
      return owner;
    },
    $reset: function $reset($state, callback) {
      return $this.$setState($$reset($state), callback);
    },
    $getFirstError: $getFirstError,
    $validate: $validate,
    $setState: $this.$setState,
    $render: $render,
    $setValue: $setValue,
    $setTouched: $setTouched,
    $setDirty: $setDirty,
    $setFocused: $setFocused,
    $setValidity: $setValidity,
    $setError: $setError,
    $setPending: $setPending
  };
  var $$validatePromise;

  function $$detectChange($newState) {
    if ('$value' in $newState || '$viewValue' in $newState) {
      $validate();
    }
  }

  function $$triggerChange(_ref) {
    var $newValue = _ref.$newValue,
        $prevValue = _ref.$prevValue;
    var $onFieldChange = $this.props.$onFieldChange;

    if (utils.isFunction($onFieldChange)) {
      $onFieldChange($newValue, $prevValue, $this.$formContext.$formutil);
    }
  }

  function $onValidate(callback) {
    $$validatePromise.then(callback);
    return $$validatePromise;
  }

  function $$reset($newState) {
    var $initialState;
    var props = $this.props,
        $formContext = $this.$formContext;

    if ($formContext.$$getDefault) {
      var $name = props.name;

      var _$formContext$$$getDe = $formContext.$$getDefault(),
          $$defaultStates = _$formContext$$$getDe.$$defaultStates,
          $$defaultValues = _$formContext$$$getDe.$$defaultValues;

      if ($name && $$defaultValues) {
        var $initialValue = utils.parsePath($$defaultValues, $name);
        $initialState = utils.parsePath($$defaultStates, $name) || {};

        if (!utils.isUndefined($initialValue)) {
          $initialState.$value = $initialValue;
        }
      }
    }

    var $defaultValue = props.$defaultValue,
        $defaultState = props.$defaultState;
    return $$merge(_objectSpread({}, $baseState, utils.isFunction($defaultState) ? $defaultState(props) : $defaultState, {
      // self default state
      $value: utils.isFunction($defaultValue) ? $defaultValue(props) : '$defaultValue' in props ? $defaultValue : ''
    }, $initialState, $newState));
  }

  function $getState() {
    return _objectSpread({}, $this.$state);
  }

  function $validate(callback) {
    return $$validatePromise = new Promise(function (resolve) {
      var props = $this.props,
          $formContext = $this.$formContext;

      var $validators = _objectSpread({}, props.$validators, props.$asyncValidators);

      var _$this$$state = $this.$state,
          $value = _$this$$state.$value,
          $pending = _$this$$state.$pending,
          $newError = _extends({}, _$this$$state.$error);

      var $formutil = $formContext.$formutil;
      var $validError = {};
      var $skipRestValidate = false;
      var $breakAsyncHandler;
      var $shouldCancelPrevAsyncValidate;
      var prevCallback;
      var validation;
      delete $newError[FORM_VALIDATE_RESULT];
      var $validatePromises = Object.keys($validators).reduce(function (promises, key) {
        delete $newError[key];

        if (!$skipRestValidate && props[key] != null) {
          var result = $validators[key]($value, props[key], _objectSpread({}, props, {
            $formutil: $formutil,
            $fieldutil: $this.$fieldutil,
            $validError: $validError
          }));

          if (utils.isPromise(result)) {
            promises.push( // @ts-ignore
            result.catch(function (reason) {
              if (!$breakAsyncHandler) {
                $setValidity(key, reason || key);
              }
            }));
          } else if (isError(result)) {
            $validError[key] = result || key;
            warningValidatorReturn(result, key, props.name);

            if (props.$validateLazy) {
              $skipRestValidate = true;
            }
          }
        }

        return promises;
      }, []);

      var execCallback = function execCallback($fieldutil) {
        return resolve(utils.runCallback(callback, utils.runCallback(prevCallback, $fieldutil)));
      };

      if ($validatePromises.length) {
        if (!$pending) {
          $setPending(true);
        }

        $shouldCancelPrevAsyncValidate = function $shouldCancelPrevAsyncValidate(setCallback) {
          return $breakAsyncHandler = setCallback(execCallback);
        };

        $validatePromises.push($setError(_objectSpread({}, $newError, $validError)));
        validation = Promise.all($validatePromises).then(function () {
          if ($breakAsyncHandler) {
            return $breakAsyncHandler;
          }

          $this.$shouldCancelPrevAsyncValidate = null;
          return $setPending(false, execCallback);
        });
      } else {
        if ($pending) {
          $setPending(false);
        }

        validation = $setError(_objectSpread({}, $newError, $validError), execCallback);
      }

      if ($this.$shouldCancelPrevAsyncValidate) {
        $this.$shouldCancelPrevAsyncValidate(function (callback) {
          prevCallback = callback;
          return validation;
        });
      }

      $this.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
    });
  }

  function $render($viewValue, callback) {
    return $this.$setState({
      $viewValue: $viewValue,
      $dirty: true
    }, callback);
  }

  function $setValue($value, callback) {
    return $this.$setState({
      $value: $value
    }, callback);
  }

  function $setTouched($touched, callback) {
    return $this.$setState({
      $touched: $touched
    }, callback);
  }

  function $setDirty($dirty, callback) {
    return $this.$setState({
      $dirty: $dirty
    }, callback);
  }

  function $setFocused($focused, callback) {
    return $this.$setState({
      $focused: $focused
    }, callback);
  }

  function $setError($error, callback) {
    return $this.$setState({
      $error: $error
    }, callback);
  }

  function $setValidity(key) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var callback = arguments.length > 2 ? arguments[2] : undefined;

    var $newError = _extends({}, $this.$state.$error);

    if (isError(result)) {
      $newError[key] = result || key;
      warningValidatorReturn(result, key, $this.props.name);
    } else {
      delete $newError[key];
    }

    return $setError($newError, callback);
  }

  function $setPending($pending, callback) {
    return $this.$setState({
      $pending: $pending
    }, callback);
  }

  function $getFirstError() {
    var _$this$$state$$error = $this.$state.$error,
        $error = _$this$$state$$error === void 0 ? {} : _$this$$state$$error;

    for (var name in $error) {
      return $error[name] instanceof Error ? $error[name].message : $error[name];
    }
  }

  function $$merge(_ref2) {
    var $newState = _extends({}, _ref2);

    if ('$error' in $newState) {
      if (!$newState.$error) {
        $newState.$error = {};
      }

      $newState.$valid = Object.keys($newState.$error).length === 0;
    } // process $value


    var _$this$props = $this.props,
        $parser = _$this$props.$parser,
        $formatter = _$this$props.$formatter;

    if ('$viewValue' in $newState && !('$value' in $newState)) {
      var $setViewValue = function $setViewValue($value) {
        return $newState.$viewValue = $value;
      };

      $newState.$value = $parser ? $parser($newState.$viewValue, $setViewValue) : $newState.$viewValue;
    } else if ('$value' in $newState && !('$viewValue' in $newState)) {
      var $setModelValue = function $setModelValue($value) {
        return $newState.$value = $value;
      };

      $newState.$viewValue = $formatter ? $formatter($newState.$value, $setModelValue) : $newState.$value;
    } // process $valid/$invalid


    if ('$valid' in $newState) {
      $newState.$invalid = !$newState.$valid;
    } else if ('$invalid' in $newState) {
      $newState.$dirty = !$newState.$invalid;
    } // process $dirty/$pristine


    if ('$dirty' in $newState) {
      $newState.$pristine = !$newState.$dirty;
    } else if ('$pristine' in $newState) {
      $newState.$dirty = !$newState.$pristine;
    } // process $touched/$untouched


    if ('$touched' in $newState) {
      $newState.$untouched = !$newState.$touched;
    } else if ('$untouched' in $newState) {
      $newState.$touched = !$newState.$untouched;
    }

    $this.$state = _objectSpread({}, $this.$state, $newState);
    return $getState();
  }

  return $fieldHandler;
}