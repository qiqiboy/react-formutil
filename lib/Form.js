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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React, { Component, Children, cloneElement, createElement } from 'react';
import FormContext from './context';
import * as utils from './utils';
import warning from 'warning';
export var FORM_VALIDATE_RESULT = 'FORM_VALIDATE_RESULT';
var requestFrame, cancelFrame;

if (typeof requestAnimationFrame === 'function') {
  requestFrame = requestAnimationFrame;
  cancelFrame = cancelAnimationFrame;
} else {
  requestFrame = setTimeout;
  cancelFrame = clearTimeout;
}

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
    _this.$$registers = {};
    _this.$$deepRegisters = {};
    _this.$$regDuplications = {};

    _this.$$checkDuplication = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          $$regDuplications = _assertThisInitialize.$$regDuplications;

      var hasDup;
      utils.objectEach($$regDuplications, function (_ref, name) {
        var _ref2 = _slicedToArray(_ref, 2),
            $curRegistered = _ref2[0],
            $handler = _ref2[1];

        warning($curRegistered.$$reserved, "The Field with a name '".concat(name, "' has been registered!"));
        $handler.$$reset($curRegistered.$getState());
        hasDup = delete $$regDuplications[name];
      });

      if (hasDup) {
        _this.$render();
      }
    };

    _this.$$register = function (name, $handler, prevName) {
      _this.$$unregister(prevName, $handler);

      if (name) {
        var $curRegistered = _this.$$getRegister(name);

        if ($curRegistered) {
          cancelFrame(_this.$$duplicateTimer);
          _this.$$regDuplications[name] = [$curRegistered, $handler];
          _this.$$duplicateTimer = requestFrame(_this.$$checkDuplication);
        } else {
          _this.$$fieldChangedQueue.push({
            name: name,
            $newValue: $handler.$getState().$value
          });

          utils.objectClear(_this.$$defaultValues, name);
        }

        _this.$$registers[$handler.$name = name] = $handler;

        _this.createDeepRegisters();

        _this.$render();
      }
    };

    _this.$$unregister = function (name, $handler, $$reserved) {
      if (name) {
        if (name in _this.$$regDuplications) {
          var _this$$$regDuplicatio = _slicedToArray(_this.$$regDuplications[name], 2),
              $curRegistered = _this$$$regDuplicatio[0],
              _$handler = _this$$$regDuplicatio[1];

          _this.$$fieldChangedQueue.push({
            name: name,
            $newValue: _$handler.$getState().$value,
            $prevValue: $curRegistered.$getState().$value
          });

          delete _this.$$regDuplications[name];
        } else if (_this.$$registers[name] === $handler) {
          if ($$reserved) {
            $handler.$$reserved = true;
          } else {
            delete _this.$$registers[name];

            _this.$$fieldChangedQueue.push({
              name: name,
              $prevValue: $handler.$getState().$value
            });

            utils.objectClear(_this.$$defaultValues, name);
          }
        }

        _this.createDeepRegisters();

        _this.$render();
      }
    };

    _this.$$defaultInitialize = function () {
      var _this$props = _this.props,
          $defaultValues = _this$props.$defaultValues,
          $defaultStates = _this$props.$defaultStates;
      _this.$$defaultValues = _this.$$deepParseObject(utils.deepClone(utils.isFunction($defaultValues) ? $defaultValues(_this.props) || {} : $defaultValues));
      _this.$$defaultStates = _this.$$deepParseObject(utils.deepClone(utils.isFunction($defaultStates) ? $defaultStates(_this.props) || {} : $defaultStates));
    };

    _this.$$getDefault = function () {
      return {
        $$defaultStates: _this.$$defaultStates,
        $$defaultValues: _this.$$defaultValues
      };
    };

    _this.$$fieldChangedQueue = [];

    _this.$$triggerFormChange = function () {
      if (_this.$$fieldChangedQueue.length) {
        var $$fieldChangedQueue = _toConsumableArray(_this.$$fieldChangedQueue);

        _this.$$fieldChangedQueue.length = 0;
        var $newValues = {};
        var $prevValues = {};
        var $$registers = _this.$$registers;
        var hasFormChanged = false;
        $$fieldChangedQueue.forEach(function (item) {
          if (!(item.name in $$registers)) {
            delete item.$newValue;
          }

          if (item.$newValue !== item.$prevValue) {
            if ('$newValue' in item && '$prevValue' in item) {
              var $handler = _this.$$getRegister(item.name);

              if ($handler) {
                $handler.$$triggerChange(item);
              }
            }

            '$newValue' in item && utils.parsePath($newValues, item.name, item.$newValue);
            '$prevValue' in item && utils.parsePath($prevValues, item.name, item.$prevValue);
            hasFormChanged = true;
          }
        });

        if (hasFormChanged) {
          if (utils.isFunction(_this.props.$validator)) {
            _this.$$formValidate();
          }

          if (utils.isFunction(_this.props.$onFormChange)) {
            _this.props.$onFormChange(_this.$formutil, $newValues, $prevValues);
          }
        }
      }
    };

    _this.createDeepRegisters = function () {
      return _this.$$deepRegisters = _this.$$deepParseObject(_this.$$registers);
    };

    _this.$$getRegister = function (name) {
      if (name) {
        var field = _this.$$registers[name] || utils.parsePath(_this.$$deepRegisters, name);

        if (field) {
          return field;
        }
      }
    };

    _this.$$formValidate = function (callback) {
      return _this.$$formValidatePromise = new Promise(function (resolve) {
        var $validator = _this.props.$validator;
        var $breakAsyncHandler;
        var $shouldCancelPrevAsyncValidate;
        var prevCallback;
        var validation;
        var result = $validator(_this.$formutil.$params, _this.formtutil);

        var execCallback = function execCallback($formutil) {
          return resolve(utils.runCallback(callback, utils.runCallback(prevCallback, $formutil)));
        };

        if (utils.isPromise(result)) {
          if (!_this.$$formPending) {
            _this.$$formPending = true;

            _this.$render();
          }

          $shouldCancelPrevAsyncValidate = function $shouldCancelPrevAsyncValidate(setCallback) {
            return $breakAsyncHandler = setCallback(execCallback);
          };

          validation = result.then(function () {
            return void 0;
          }, function (reason) {
            return reason;
          }).then(function (reason) {
            if ($breakAsyncHandler) {
              return $breakAsyncHandler;
            }

            _this.$shouldCancelPrevAsyncValidate = null;
            _this.$$formPending = false;
            return _this.$$setFormErrors(reason, execCallback);
          });
        } else {
          if (_this.$$formPending) {
            _this.$$formPending = false;
          }

          validation = _this.$$setFormErrors(result, execCallback);
        }

        if (_this.$shouldCancelPrevAsyncValidate) {
          _this.$shouldCancelPrevAsyncValidate(function (callback) {
            prevCallback = callback;
            return validation;
          });
        }

        _this.$shouldCancelPrevAsyncValidate = $shouldCancelPrevAsyncValidate;
      });
    };

    _this.$$setFormErrors = function (validResults, callback) {
      if (validResults && (validResults instanceof Error || typeof validResults !== 'object')) {
        warning(false, "The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");
        return _this.$render(callback);
      }

      return _this.$$setStates(validResults || {}, function (result, handler) {
        var _handler$$getState = handler.$getState(),
            _handler$$getState$$e = _handler$$getState.$error,
            $error = _handler$$getState$$e === void 0 ? {} : _handler$$getState$$e;

        if (result) {
          return {
            $error: _objectSpread({}, $error, _defineProperty({}, FORM_VALIDATE_RESULT, result))
          };
        }

        if ($error[FORM_VALIDATE_RESULT]) {
          delete $error[FORM_VALIDATE_RESULT];
          return {
            $error: $error
          };
        }

        return;
      }, callback, true);
    };

    _this.$getField = function (name) {
      var field = _this.$$getRegister(name);

      warning(!name || field, "$getField('".concat(name, "') fail to find the matched Field. Maybe it has been unmounted."));
      warning(name, "You should pass a name of the mounted Field to $getField().");

      if (field) {
        return field.$new();
      }
    };

    _this.$$onChange = function (name, $state, callback) {
      return _this.$setStates(_defineProperty({}, name, $state), callback);
    };

    _this.$$setStates = function () {
      var $stateTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var processer = arguments.length > 1 ? arguments[1] : undefined;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var force = arguments.length > 3 ? arguments[3] : undefined;

      var $parsedTree = _this.$$deepParseObject($stateTree);

      var hasStateChange = false;
      utils.objectEach(_this.$$registers, function (handler, name) {
        var data = name in $stateTree ? $stateTree[name] : utils.parsePath($parsedTree, name);

        if (!utils.isUndefined(data) || force) {
          var $newState = processer(data, handler);

          if ($newState) {
            var $prevValue = _this.$formutil.$weakParams[name];

            var _handler$$$merge = handler.$$merge($newState),
                $newValue = _handler$$$merge.$value;

            handler.$$detectChange($newState);

            if ('$value' in $newState || '$viewValue' in $newState) {
              var findItem = utils.arrayFind(_this.$$fieldChangedQueue, function (item) {
                return item.name === name;
              });

              if (findItem) {
                if (!('$prevValue' in findItem)) {
                  findItem.$prevValue = findItem.$newValue;
                }

                findItem.$newValue = $newValue;
              } else {
                _this.$$fieldChangedQueue.push({
                  name: name,
                  $newValue: $newValue,
                  $prevValue: $prevValue
                });
              }
            }

            hasStateChange = true;
          }
        }
      });

      if (hasStateChange) {
        return _this.$render(callback);
      }

      return Promise.resolve(utils.runCallback(callback, _this.$formutil));
    };

    _this.$render = function (callback) {
      return new Promise(function (resolve) {
        return _this.forceUpdate(function () {
          return resolve(utils.runCallback(callback, _this.$formutil));
        });
      });
    };

    _this.$validates = function () {
      var callback;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (utils.isFunction(args[args.length - 1])) {
        callback = args.pop();
      }

      if (args.length) {
        var flatter = function flatter(names) {
          names.forEach(function (name) {
            if (Array.isArray(name)) {
              flatter(name);
            } else {
              var handler = _this.$getField(name);

              if (handler) {
                handler.$validate();
              }
            }
          });
        };

        flatter(args);
      } else {
        utils.objectEach(_this.$$registers, function (handler) {
          return handler.$validate();
        });

        if (utils.isFunction(_this.props.$validator)) {
          _this.$$formValidate();
        }
      }

      return _this.$onValidates(callback);
    };

    _this.$onValidates = function (callback) {
      var filedValidatePromises = Object.keys(_this.$$registers).map(function (name) {
        return _this.$$registers[name].$onValidate();
      });
      filedValidatePromises.push(_this.$$formValidatePromise);
      return Promise.all(filedValidatePromises).then(function () {
        return utils.runCallback(callback, _this.$formutil);
      });
    };

    _this.$validate = function (name, callback) {
      var handler = _this.$getField(name);

      if (handler) {
        return handler.$validate(callback);
      }

      return utils.runCallback(callback);
    };

    _this.$reset = function ($stateTree, callback) {
      _this.$$defaultInitialize();

      if (utils.isFunction($stateTree)) {
        callback = $stateTree;
        $stateTree = {};
      }

      return _this.$$setStates($stateTree, function ($state, handler) {
        return handler.$$reset($state);
      }, callback, true);
    };

    _this.$setStates = function ($stateTree, callback) {
      return _this.$$setStates($stateTree, function ($state) {
        return $state;
      }, callback);
    };

    _this.$setValues = function ($valueTree, callback) {
      _this.$$deepParseObject(utils.deepClone($valueTree), _this.$$defaultValues);

      return _this.$$setStates($valueTree, function ($value) {
        return {
          $value: $value
        };
      }, callback);
    };

    _this.$setFocuses = function ($focusedTree, callback) {
      return _this.$$setStates($focusedTree, function ($focused) {
        return {
          $focused: $focused
        };
      }, callback);
    };

    _this.$setDirts = function ($dirtyTree, callback) {
      return _this.$$setStates($dirtyTree, function ($dirty) {
        return {
          $dirty: $dirty
        };
      }, callback);
    };

    _this.$setTouches = function ($touchedTree, callback) {
      return _this.$$setStates($touchedTree, function ($touched) {
        return {
          $touched: $touched
        };
      }, callback);
    };

    _this.$setPendings = function ($pendingTree, callback) {
      return _this.$$setStates($pendingTree, function ($pending) {
        return {
          $pending: $pending
        };
      }, callback);
    };

    _this.$setErrors = function ($errorTree, callback) {
      return _this.$$setStates($errorTree, function ($error) {
        return {
          $error: $error
        };
      }, callback);
    };

    _this.$batchState = function ($state, callback) {
      return _this.$setStates(utils.objectMap(_this.$$registers, function () {
        return $state;
      }), callback);
    };

    _this.$batchDirty = function ($dirty, callback) {
      return _this.$batchState({
        $dirty: $dirty
      }, callback);
    };

    _this.$batchTouched = function ($touched, callback) {
      return _this.$batchState({
        $touched: $touched
      }, callback);
    };

    _this.$batchFocused = function ($focused, callback) {
      return _this.$batchState({
        $focused: $focused
      }, callback);
    };

    _this.$batchPending = function ($pending, callback) {
      return _this.$batchState({
        $pending: $pending
      }, callback);
    };

    _this.$batchError = function ($error, callback) {
      return _this.$batchState({
        $error: $error
      }, callback);
    };

    _this.$$defaultInitialize();

    return _this;
  }

  _createClass(Form, [{
    key: "getFormContext",
    value: function getFormContext() {
      return {
        $$registers: this.$$registers,
        $$register: this.$$register,
        $$unregister: this.$$unregister,
        $$onChange: this.$$onChange,
        $$getDefault: this.$$getDefault,
        $formutil: this.$formutil
      };
    }
  }, {
    key: "$$deepParseObject",
    value: function $$deepParseObject(mayWeakObj) {
      var deepObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      utils.objectEach(mayWeakObj, function (data, name) {
        return utils.parsePath(deepObj, name, data);
      });
      return deepObj;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      cancelFrame(this.$$triggerChangeTimer); // ensure this calls to access the newest $formutil

      this.$$triggerChangeTimer = requestFrame(function () {
        _this2.$$triggerFormChange();
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      var $formutil = this.$formutil;
      var _this$props2 = this.props,
          children = _this$props2.children,
          render = _this$props2.render,
          component = _this$props2.component;

      if (component) {
        return createElement(component, {
          $formutil: $formutil
        });
      }

      if (utils.isFunction(render)) {
        return render($formutil);
      }

      if (utils.isFunction(children)) {
        return children($formutil);
      }

      return Children.map(children, function (child) {
        return child && utils.isFunction(child.type) ? cloneElement(child, {
          $formutil: $formutil
        }) : child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var $processer = this.props.$processer;
      var $stateArray = Object.keys(this.$$registers).map(function (path) {
        return {
          path: path,
          $state: _this3.$$registers[path].$getState()
        };
      });
      var $weakParams = utils.toObject($stateArray, function ($params, _ref3) {
        var path = _ref3.path,
            $state = _ref3.$state;

        if ($processer) {
          $processer($state, path);
        }

        if ('$value' in $state && ($state.$dirty || !utils.isUndefined($state.$value))) {
          $params[path] = $state.$value;
        }
      });
      var $pureParams = utils.toObject($stateArray, function ($params, _ref4) {
        var path = _ref4.path,
            $state = _ref4.$state;
        return path in $weakParams && utils.parsePath($params, path, $weakParams[path]);
      });
      var $invalid = $stateArray.some(function (_ref5) {
        var $state = _ref5.$state;
        return $state.$invalid;
      });
      var $dirty = $stateArray.some(function (_ref6) {
        var $state = _ref6.$state;
        return $state.$dirty;
      });
      var $touched = $stateArray.some(function (_ref7) {
        var $state = _ref7.$state;
        return $state.$touched;
      });
      var $focused = $stateArray.some(function (_ref8) {
        var $state = _ref8.$state;
        return $state.$focused;
      });
      var $pending = this.$$formPending || $stateArray.some(function (_ref9) {
        var $state = _ref9.$state;
        return $state.$pending;
      });
      var $formutil = this.$formutil = {
        $$registers: _objectSpread({}, this.$$registers),
        $$deepRegisters: this.$$deepRegisters,
        $states: utils.toObject($stateArray, function ($states, _ref10) {
          var path = _ref10.path,
              $state = _ref10.$state;
          return utils.parsePath($states, path, $state);
        }),
        $params: _objectSpread({}, this.$$defaultValues, $pureParams),
        $errors: utils.toObject($stateArray, function ($errors, _ref11) {
          var path = _ref11.path,
              $state = _ref11.$state;

          if ($state.$invalid) {
            utils.parsePath($errors, path, $state.$error);
          }
        }),
        $dirts: utils.toObject($stateArray, function ($dirts, _ref12) {
          var path = _ref12.path,
              $state = _ref12.$state;
          return utils.parsePath($dirts, path, $state.$dirty);
        }),
        $touches: utils.toObject($stateArray, function ($touches, _ref13) {
          var path = _ref13.path,
              $state = _ref13.$state;
          return utils.parsePath($touches, path, $state.$touched);
        }),
        $focuses: utils.toObject($stateArray, function ($focuses, _ref14) {
          var path = _ref14.path,
              $state = _ref14.$state;
          return utils.parsePath($focuses, path, $state.$focused);
        }),
        $pendings: utils.toObject($stateArray, function ($pendings, _ref15) {
          var path = _ref15.path,
              $state = _ref15.$state;
          return utils.parsePath($pendings, path, $state.$pending);
        }),
        $weakStates: utils.toObject($stateArray, function ($states, _ref16) {
          var path = _ref16.path,
              $state = _ref16.$state;
          return $states[path] = $state;
        }),
        $weakParams: $weakParams,
        $weakErrors: utils.toObject($stateArray, function ($errors, _ref17) {
          var path = _ref17.path,
              $state = _ref17.$state;

          if ($state.$invalid) {
            $errors[path] = $state.$error;
          }
        }),
        $weakDirts: utils.toObject($stateArray, function ($dirts, _ref18) {
          var path = _ref18.path,
              $state = _ref18.$state;
          return $dirts[path] = $state.$dirty;
        }),
        $weakTouches: utils.toObject($stateArray, function ($touches, _ref19) {
          var path = _ref19.path,
              $state = _ref19.$state;
          return $touches[path] = $state.$touched;
        }),
        $weakFocuses: utils.toObject($stateArray, function ($focuses, _ref20) {
          var path = _ref20.path,
              $state = _ref20.$state;
          return $focuses[path] = $state.$focused;
        }),
        $weakPendings: utils.toObject($stateArray, function ($weakPendings, _ref21) {
          var path = _ref21.path,
              $state = _ref21.$state;
          return $weakPendings[path] = $state.$pending;
        }),
        $getFirstError: function $getFirstError(name) {
          if (name) {
            var $fieldutil = $formutil.$getField(name);
            return $fieldutil && $fieldutil.$getFirstError();
          }

          for (var _name in $formutil.$weakErrors) {
            var $fieldError = $formutil.$weakErrors[_name];

            for (var key in $fieldError) {
              return $fieldError[key] instanceof Error ? $fieldError[key].message : $fieldError[key];
            }
          }
        },
        $render: this.$render,
        $getField: this.$getField,
        $onValidates: this.$onValidates,
        // get the newest $formutil
        $new: function $new() {
          return _this3.$formutil;
        },
        $setStates: this.$setStates,
        $setValues: this.$setValues,
        $setErrors: this.$setErrors,
        $setTouches: this.$setTouches,
        $setDirts: this.$setDirts,
        $setFocuses: this.$setFocuses,
        $batchState: this.$batchState,
        $batchTouched: this.$batchTouched,
        $batchDirty: this.$batchDirty,
        $batchFocused: this.$batchFocused,
        $reset: this.$reset,
        $validates: this.$validates,
        $validate: this.$validate,
        $valid: !$invalid,
        $invalid: $invalid,
        $dirty: $dirty,
        $pristine: !$dirty,
        $touched: $touched,
        $untouched: !$touched,
        $focused: $focused,
        $pending: $pending
      };
      return React.createElement(FormContext.Provider, {
        value: this.getFormContext()
      }, this._render());
    }
  }]);

  return Form;
}(Component);

Form.displayName = 'React.Formutil.Form';
Form.defaultProps = {
  $defaultValues: {},
  $defaultStates: {}
};
export default Form;