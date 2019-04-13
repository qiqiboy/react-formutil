"use strict";Object.defineProperty(exports,"__esModule",{value:true});function e(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var t=require("react");var r=e(t);var n=e(require("create-react-context"));var a=e(require("warning"));var i=e(require("hoist-non-react-statics"));var u=e(require("react-fast-compare"));function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function l(e,t,r){if(t)s(e.prototype,t);if(r)s(e,r);return e}function $(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function f(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};var n=Object.keys(r);if(typeof Object.getOwnPropertySymbols==="function"){n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))}n.forEach(function(t){$(e,t,r[t])})}return e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});if(t)v(e,t)}function d(e){d=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return d(e)}function v(e,t){v=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return v(e,t)}function p(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var a,i;for(i=0;i<n.length;i++){a=n[i];if(t.indexOf(a)>=0)continue;r[a]=e[a]}return r}function h(e,t){if(e==null)return{};var r=p(e,t);var n,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++){n=i[a];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}function m(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function g(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}return m(e)}function y(e,t){return w(e)||F(e,t)||P()}function b(e){return V(e)||C(e)||k()}function V(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function w(e){if(Array.isArray(e))return e}function C(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]")return Array.from(e)}function F(e,t){var r=[];var n=true;var a=false;var i=undefined;try{for(var u=e[Symbol.iterator](),o;!(n=(o=u.next()).done);n=true){r.push(o.value);if(t&&r.length===t)break}}catch(e){a=true;i=e}finally{try{if(!n&&u["return"]!=null)u["return"]()}finally{if(a)throw i}}return r}function k(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function P(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var E=n({});var O=Object.getPrototypeOf({});var S=/\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g;var j=x(window)?global:window;function x(e){return typeof e==="undefined"}function D(e){return typeof e==="function"}function N(e){return x(e)||e===null||e+""===""}function _(e){return!!e&&D(e.then)}function A(e){return Object.prototype.toString.call(e)==="[object Object]"}function T(e){if(!A(e))return false;if(null===Object.getPrototypeOf(e))return true;if(!D(e.constructor))return false;return e.constructor.prototype===O}function R(e){if(e&&typeof e==="object"){if(Array.isArray(e)){var t=[];for(var r=0,n=e.length;r<n;r++){t[r]=R(e[r])}return t}else if(T(e)){var a={};for(var i in e){a[i]=R(e[i])}return a}}return e}var U=function e(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),a=1;a<r;a++){n[a-1]=arguments[a]}if(D(t)){t.apply(void 0,n)}return n[0]};function I(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++){r[n]=arguments[n]}if(D(r[0])){return e.apply(void 0,r)}return function(t){return e(t,r[0])}}}var H=["minlength","maxlength","max","min","required","pattern","step"];function M(e){return H.indexOf(e.toLowerCase())>-1}var L=function e(t){try{var r=new Function("origin","global","return typeof ".concat(t," === 'number' || (typeof ").concat(t," !== 'undefined' && !(origin in global)) ? ").concat(t," : origin"));return r(t,j)}catch(e){return t}};var q=function e(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++){r[n]=arguments[n]}var i=r[0],u=r[1],o=r[2];a(typeof u==="string","The second parameter(".concat(JSON.stringify(u),") of parsePath() must be a string."));var s=(u.match(S)||[]).map(function(e){return e.replace(/\s/g,"")});var l=u.split(S).map(function(e){return e.trim()}).filter(function(e){return e!==""});var $=i;try{if(r.length<3){for(var f=0,c=l.length;f<c;f++){var d=L(l[f]);if(f+1===c){return $[d]}if(x($[d])){break}$=$[d]}}else{for(var v=0,p=l.length;v<p;v++){var h=L(l[v]);var m=l[v+1];var g=s[v];if(x(m)){$[h]=o;break}switch(g){case"].":case".":$=x($[h])?$[h]={}:$[h];break;case"][":case"[":var y=L(m);$=x($[h])?$[h]=typeof y==="number"&&y>=0?[]:{}:$[h];break;default:$[h]=o;break}}}}catch(e){a(false,"The name '%s' of Field seems is not a legal expression.",u)}if(r.length>2){return i}};var B=function e(t,r){for(var n=0,a=t.length;n<a;n++){if(r(t[n])===true){return t[n]}}};var Y=function e(t,r){return Object.keys(t).reduce(function(e,n){e[n]=r(t[n],n,t);return e},{})};var Q=function e(t,r){return Object.keys(t).forEach(function(e){return r(t[e],e,t)})};var G=function e(t,r){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};return t.reduce(function(){r.apply(void 0,arguments);return arguments.length<=0?undefined:arguments[0]},n)};var z=undefined;var K=function e(t,r,n){Q(t,function(r,n){if(r===z){delete t[n]}else if(r&&typeof r==="object"){e(r,n,t)}});if(n&&Object.keys(t).every(function(e){return t[e]===z})){n[r]=z;e(n)}};var J=function e(t,r){if(!x(q(t,r))){q(t,r,z);K(t)}};var W="FORM_VALIDATE_RESULT";var X,Z;if(typeof requestAnimationFrame==="function"){X=requestAnimationFrame;Z=cancelAnimationFrame}else{X=setTimeout;Z=clearTimeout}var ee=function(e){c(n,e);function n(e){var t;o(this,n);t=g(this,d(n).call(this,e));t.$$formPending=void 0;t.$$formValidatePromise=void 0;t.$$registers={};t.$$deepRegisters={};t.$$regDuplications={};t.$$duplicateTimer=void 0;t.$$checkDuplication=function(){var e=m(t),r=e.$$regDuplications;var n;Q(r,function(e,t){var i=y(e,2),u=i[0],o=i[1];a(u.$$reserved,"The Field with a name '".concat(t,"' has been registered!"));o.$$reset(u.$getState());n=delete r[t]});if(n){t.$render()}};t.$$register=function(e,r,n){t.$$unregister(n,r);if(e){var a=t.$$getRegister(e);if(a){Z(t.$$duplicateTimer);t.$$regDuplications[e]=[a,r];t.$$duplicateTimer=X(t.$$checkDuplication)}else{t.$$fieldChangedQueue.push({name:e,$newValue:r.$getState().$value});J(t.$$defaultValues,e)}t.$$registers[r.$name=e]=r;t.createDeepRegisters();t.$render()}};t.$$unregister=function(e,r,n){if(e){if(e in t.$$regDuplications){var a=y(t.$$regDuplications[e],2),i=a[0],u=a[1];t.$$fieldChangedQueue.push({name:e,$newValue:u.$getState().$value,$prevValue:i.$getState().$value});delete t.$$regDuplications[e]}else if(t.$$registers[e]===r){if(n){r.$$reserved=true}else{delete t.$$registers[e];t.$$fieldChangedQueue.push({name:e,$prevValue:r.$getState().$value});J(t.$$defaultValues,e)}}t.createDeepRegisters();t.$render()}};t.$$defaultInitialize=function(){var e=t.props,r=e.$defaultValues,n=e.$defaultStates;t.$$defaultValues=t.$$deepParseObject(R(D(r)?r(t.props)||{}:r));t.$$defaultStates=t.$$deepParseObject(R(D(n)?n(t.props)||{}:n))};t.$$getDefault=function(){return{$$defaultStates:t.$$defaultStates,$$defaultValues:t.$$defaultValues}};t.$$triggerChangeTimer=void 0;t.$$fieldChangedQueue=[];t.$$triggerFormChange=function(){if(t.$$fieldChangedQueue.length){var e=b(t.$$fieldChangedQueue);t.$$fieldChangedQueue.length=0;var r={};var n={};var a=t.$$registers;var i=false;e.forEach(function(e){if(!(e.name in a)){delete e.$newValue}if(e.$newValue!==e.$prevValue){if("$newValue"in e&&"$prevValue"in e){var u=t.$$getRegister(e.name);if(u){u.$$triggerChange(e)}}"$newValue"in e&&q(r,e.name,e.$newValue);"$prevValue"in e&&q(n,e.name,e.$prevValue);i=true}});if(i){if(D(t.props.$validator)){t.$$formValidate()}if(D(t.props.$onFormChange)){t.props.$onFormChange(t.$formutil,r,n)}}}};t.createDeepRegisters=function(){return t.$$deepRegisters=t.$$deepParseObject(t.$$registers)};t.$$getRegister=function(e){if(e){var r=t.$$registers[e]||q(t.$$deepRegisters,e);if(r){return r}}};t.$$formValidate=function(e){return t.$$formValidatePromise=new Promise(function(r){var n=t.props.$validator;var a;var i;var u;var o;var s=n(t.$formutil.$params,t.formtutil);var l=function t(n){return r(U(e,U(u,n)))};if(_(s)){if(!t.$$formPending){t.$$formPending=true;t.$render()}i=function e(t){return a=t(l)};o=s.then(function(){return void 0},function(e){return e}).then(function(e){if(a){return a}t.$shouldCancelPrevAsyncValidate=null;t.$$formPending=false;return t.$$setFormErrors(e,l)})}else{if(t.$$formPending){t.$$formPending=false}o=t.$$setFormErrors(s,l)}if(t.$shouldCancelPrevAsyncValidate){t.$shouldCancelPrevAsyncValidate(function(e){u=e;return o})}t.$shouldCancelPrevAsyncValidate=i})};t.$$setFormErrors=function(e,r){if(e&&(e instanceof Error||typeof e!=="object")){a(false,"The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");return t.$render(r)}return t.$$setStates(e||{},function(e,t){var r=t.$getState(),n=r.$error,a=n===void 0?{}:n;if(e){return{$error:f({},a,$({},W,e))}}if(a[W]){delete a[W];return{$error:a}}return},r,true)};t.$getField=function(e){var r=t.$$getRegister(e);a(!e||r,"$getField('".concat(e,"') fail to find the matched Field. Maybe it has been unmounted."));a(e,"You should pass a name of the mounted Field to $getField().");if(r){return r.$new()}};t.$$onChange=function(e,r,n){return t.$setStates($({},e,r),n)};t.$$setStates=function(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var r=arguments.length>1?arguments[1]:undefined;var n=arguments.length>2?arguments[2]:undefined;var a=arguments.length>3?arguments[3]:undefined;var i=t.$$deepParseObject(e);var u=false;Q(t.$$registers,function(n,o){var s=o in e?e[o]:q(i,o);if(!x(s)||a){var l=r(s,n);if(l){var $=t.$formutil.$weakParams[o];var f=n.$$merge(l),c=f.$value;n.$$detectChange(l);if("$value"in l||"$viewValue"in l){var d=B(t.$$fieldChangedQueue,function(e){return e.name===o});if(d){if(!("$prevValue"in d)){d.$prevValue=d.$newValue}d.$newValue=c}else{t.$$fieldChangedQueue.push({name:o,$newValue:c,$prevValue:$})}}u=true}}});if(u){return t.$render(n)}return Promise.resolve(U(n,t.$formutil))};t.$render=function(e){return new Promise(function(r){return t.forceUpdate(function(){return r(U(e,t.$formutil))})})};t.$validates=function(){var e;for(var r=arguments.length,n=new Array(r),a=0;a<r;a++){n[a]=arguments[a]}if(D(n[n.length-1])){e=n.pop()}if(n.length){var i=function e(r){r.forEach(function(r){if(Array.isArray(r)){e(r)}else{var n=t.$getField(r);if(n){n.$validate()}}})};i(n)}else{Q(t.$$registers,function(e){return e.$validate()});if(D(t.props.$validator)){t.$$formValidate()}}return t.$onValidates(e)};t.$onValidates=function(e){var r=Object.keys(t.$$registers).map(function(e){return t.$$registers[e].$onValidate()});r.push(t.$$formValidatePromise);return Promise.all(r).then(function(){return U(e,t.$formutil)})};t.$validate=function(e,r){var n=t.$getField(e);if(n){return n.$validate(r)}return U(r)};t.$reset=function(e,r){t.$$defaultInitialize();if(D(e)){r=e;e={}}return t.$$setStates(e,function(e,t){return t.$$reset(e)},r,true)};t.$setStates=function(e,r){return t.$$setStates(e,function(e){return e},r)};t.$setValues=function(e,r){t.$$deepParseObject(R(e),t.$$defaultValues);return t.$$setStates(e,function(e){return{$value:e}},r)};t.$setFocuses=function(e,r){return t.$$setStates(e,function(e){return{$focused:e}},r)};t.$setDirts=function(e,r){return t.$$setStates(e,function(e){return{$dirty:e}},r)};t.$setTouches=function(e,r){return t.$$setStates(e,function(e){return{$touched:e}},r)};t.$setPendings=function(e,r){return t.$$setStates(e,function(e){return{$pending:e}},r)};t.$setErrors=function(e,r){return t.$$setStates(e,function(e){return{$error:e}},r)};t.$batchState=function(e,r){return t.$setStates(Y(t.$$registers,function(){return e}),r)};t.$batchDirty=function(e,r){return t.$batchState({$dirty:e},r)};t.$batchTouched=function(e,r){return t.$batchState({$touched:e},r)};t.$batchFocused=function(e,r){return t.$batchState({$focused:e},r)};t.$batchPending=function(e,r){return t.$batchState({$pending:e},r)};t.$batchError=function(e,r){return t.$batchState({$error:e},r)};t.$$defaultInitialize();return t}l(n,[{key:"getFormContext",value:function e(){return{$$registers:this.$$registers,$$register:this.$$register,$$unregister:this.$$unregister,$$onChange:this.$$onChange,$$getDefault:this.$$getDefault,$formutil:this.$formutil}}},{key:"$$deepParseObject",value:function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};Q(t,function(e,t){return q(r,t,e)});return r}},{key:"componentDidUpdate",value:function e(){var t=this;Z(this.$$triggerChangeTimer);this.$$triggerChangeTimer=X(function(){t.$$triggerFormChange()})}},{key:"_render",value:function e(){var r=this.$formutil;var n=this.props,a=n.children,i=n.render,u=n.component;if(u){return t.createElement(u,{$formutil:r})}if(D(i)){return i(r)}if(D(a)){return a(r)}return t.Children.map(a,function(e){return e&&D(e.type)?t.cloneElement(e,{$formutil:r}):e})}},{key:"render",value:function e(){var t=this;var n=this.props.$processer;var a=Object.keys(this.$$registers).map(function(e){return{path:e,$state:t.$$registers[e].$getState()}});var i=G(a,function(e,t){var r=t.path,a=t.$state;if(n){n(a,r)}if("$value"in a&&(a.$dirty||!x(a.$value))){e[r]=a.$value}});var u=G(a,function(e,t){var r=t.path,n=t.$state;return r in i&&q(e,r,i[r])});var o=a.some(function(e){var t=e.$state;return t.$invalid});var s=a.some(function(e){var t=e.$state;return t.$dirty});var l=a.some(function(e){var t=e.$state;return t.$touched});var $=a.some(function(e){var t=e.$state;return t.$focused});var c=this.$$formPending||a.some(function(e){var t=e.$state;return t.$pending});var d=this.$formutil={$$registers:f({},this.$$registers),$$deepRegisters:this.$$deepRegisters,$states:G(a,function(e,t){var r=t.path,n=t.$state;return q(e,r,n)}),$params:f({},this.$$defaultValues,u),$errors:G(a,function(e,t){var r=t.path,n=t.$state;if(n.$invalid){q(e,r,n.$error)}}),$dirts:G(a,function(e,t){var r=t.path,n=t.$state;return q(e,r,n.$dirty)}),$touches:G(a,function(e,t){var r=t.path,n=t.$state;return q(e,r,n.$touched)}),$focuses:G(a,function(e,t){var r=t.path,n=t.$state;return q(e,r,n.$focused)}),$pendings:G(a,function(e,t){var r=t.path,n=t.$state;return q(e,r,n.$pending)}),$weakStates:G(a,function(e,t){var r=t.path,n=t.$state;return e[r]=n}),$weakParams:i,$weakErrors:G(a,function(e,t){var r=t.path,n=t.$state;if(n.$invalid){e[r]=n.$error}}),$weakDirts:G(a,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$dirty}),$weakTouches:G(a,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$touched}),$weakFocuses:G(a,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$focused}),$weakPendings:G(a,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$pending}),$getFirstError:function e(t){if(t){var r=d.$getField(t);return r&&r.$getFirstError()}for(var n in d.$weakErrors){var a=d.$weakErrors[n];for(var i in a){return a[i]instanceof Error?a[i].message:a[i]}}},$render:this.$render,$getField:this.$getField,$onValidates:this.$onValidates,$new:function e(){return t.$formutil},$setStates:this.$setStates,$setValues:this.$setValues,$setErrors:this.$setErrors,$setTouches:this.$setTouches,$setDirts:this.$setDirts,$setFocuses:this.$setFocuses,$batchState:this.$batchState,$batchTouched:this.$batchTouched,$batchDirty:this.$batchDirty,$batchFocused:this.$batchFocused,$reset:this.$reset,$validates:this.$validates,$validate:this.$validate,$valid:!o,$invalid:o,$dirty:s,$pristine:!s,$touched:l,$untouched:!l,$focused:$,$pending:c};return r.createElement(E.Provider,{value:this.getFormContext()},this._render())}}]);return n}(t.Component);ee.displayName="React.Formutil.Form";ee.defaultProps={$defaultValues:{},$defaultStates:{}};function te(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var a=function(t){c(a,t);function a(){o(this,a);return g(this,d(a).apply(this,arguments))}l(a,[{key:"render",value:function t(){var a=Object.assign({},this.props);var i=this.props,u=i.component,o=h(i,["component"]);["$defaultStates","$defaultValues","$onFormChange","$validator","$processer"].forEach(function(e){if(e in a){if(e==="$defaultStates"||e==="$defaultValues"){o[e]=f({},n[e],a[e])}delete a[e]}});return r.createElement(ee,Object.assign({},n,o,{render:function t(n){return r.createElement(e,Object.assign({},a,{$formutil:n}))}}))}}]);return a}(t.Component);a.displayName="React.Formutil.withForm."+(e.displayName||e.name||"Anonymous");return i(a,e)}var re=I(te);var ne=0;var ae={$valid:true,$invalid:false,$dirty:false,$pristine:true,$touched:false,$untouched:true,$focused:false,$pending:false,$error:{}};function ie(e){return e!==true}function ue(e,t,r){a(!x(e),"You should return a string or Error when the validation('".concat(r&&r+": ").concat(t,"') failed, otherwise return true."))}var oe="React.Formutil.Field";function se(){return ne++}function le(e,r){var n=r.children,a=r.render,i=r.component;if(i){return t.createElement(i,{$fieldutil:e})}if(D(a)){return a(e)}if(D(n)){return n(e)}return t.Children.map(n,function(r){return r&&D(r.type)?t.cloneElement(r,{$fieldutil:e}):r})}function $e(e,t){var r={$$FIELD_UUID:e.$$FIELD_UUID,$$reset:o,$$merge:b,$$detectChange:a,$$triggerChange:i,$onValidate:u,$new:function t(){return e.$fieldutil},$picker:s,$getState:s,$getComponent:function e(){return t},$reset:function t(r,n){return e.$setState(o(r),n)},$getFirstError:y,$validate:l,$setState:e.$setState,$render:$,$setValue:c,$setTouched:d,$setDirty:v,$setFocused:p,$setValidity:m,$setError:h,$setPending:g};var n;function a(e){if("$value"in e||"$viewValue"in e){l()}}function i(t){var r=t.$newValue,n=t.$prevValue;var a=e.props.$onFieldChange;if(D(a)){a(r,n,e.$formContext.$formutil)}}function u(e){n.then(e);return n}function o(t){var r;var n=e.props,a=e.$formContext;if(a.$$getDefault){var i=n.name;var u=a.$$getDefault(),o=u.$$defaultStates,s=u.$$defaultValues;if(i&&s){var l=q(s,i);r=q(o,i)||{};if(!x(l)){r.$value=l}}}var $=n.$defaultValue,c=n.$defaultState;return b(f({},ae,D(c)?c(n):c,{$value:D($)?$(n):"$defaultValue"in n?$:""},r,t))}function s(){return f({},e.$state)}function l(t){return n=new Promise(function(r){var n=e.props,a=e.$formContext;var i=f({},n.$validators,n.$asyncValidators);var u=e.$state,o=u.$value,s=u.$pending,l=Object.assign({},u.$error);var $=a.$formutil;var c={};var d=false;var v;var p;var y;var b;delete l[W];var V=Object.keys(i).reduce(function(t,r){delete l[r];if(!d&&n[r]!=null){var a=i[r](o,n[r],f({},n,{$formutil:$,$fieldutil:e.$fieldutil,$validError:c}));if(_(a)){t.push(a.catch(function(e){if(!v){m(r,e||r)}}))}else if(ie(a)){c[r]=a||r;ue(a,r,n.name);if(n.$validateLazy){d=true}}}return t},[]);var w=function e(n){return r(U(t,U(y,n)))};if(V.length){if(!s){g(true)}p=function e(t){return v=t(w)};V.push(h(f({},l,c)));b=Promise.all(V).then(function(){if(v){return v}e.$shouldCancelPrevAsyncValidate=null;return g(false,w)})}else{if(s){g(false)}b=h(f({},l,c),w)}if(e.$shouldCancelPrevAsyncValidate){e.$shouldCancelPrevAsyncValidate(function(e){y=e;return b})}e.$shouldCancelPrevAsyncValidate=p})}function $(t,r){return e.$setState({$viewValue:t,$dirty:true},r)}function c(t,r){return e.$setState({$value:t},r)}function d(t,r){return e.$setState({$touched:t},r)}function v(t,r){return e.$setState({$dirty:t},r)}function p(t,r){return e.$setState({$focused:t},r)}function h(t,r){return e.$setState({$error:t},r)}function m(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var n=arguments.length>2?arguments[2]:undefined;var a=Object.assign({},e.$state.$error);if(ie(r)){a[t]=r||t;ue(r,t,e.props.name)}else{delete a[t]}return h(a,n)}function g(t,r){return e.$setState({$pending:t},r)}function y(){var t=e.$state.$error,r=t===void 0?{}:t;for(var n in r){return r[n]instanceof Error?r[n].message:r[n]}}function b(t){var r=Object.assign({},t);if("$error"in r){if(!r.$error){r.$error={}}r.$valid=Object.keys(r.$error).length===0}var n=e.props,a=n.$parser,i=n.$formatter;if("$viewValue"in r&&!("$value"in r)){var u=function e(t){return r.$viewValue=t};r.$value=a?a(r.$viewValue,u):r.$viewValue}else if("$value"in r&&!("$viewValue"in r)){var o=function e(t){return r.$value=t};r.$viewValue=i?i(r.$value,o):r.$value}if("$valid"in r){r.$invalid=!r.$valid}else if("$invalid"in r){r.$dirty=!r.$invalid}if("$dirty"in r){r.$pristine=!r.$dirty}else if("$pristine"in r){r.$dirty=!r.$pristine}if("$touched"in r){r.$untouched=!r.$touched}else if("$untouched"in r){r.$touched=!r.$untouched}e.$state=f({},e.$state,r);return s()}return r}var fe=function(e){c(t,e);function t(){var e;var r;o(this,t);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++){a[i]=arguments[i]}r=g(this,(e=d(t)).call.apply(e,[this].concat(a)));r.$$FIELD_UUID=se();r.$formContext=void 0;r.$state=void 0;r.$setState=function(e,t){return new Promise(function(n){var a=function e(){return n(U(t,r.$fieldutil))};if(r.isMounting){var i=r.props.name;if(i in(r.$formContext.$$registers||{})){r.$formContext.$$onChange(i,e,a)}else{r.$registered.$$merge(e);r.$registered.$$detectChange(e);r.forceUpdate(a)}}else{r.$registered.$$merge(e);a()}})};return r}l(t,[{key:"componentDidMount",value:function e(){this.isMounting=true;var t=this.props.name,r=this.$formContext;a(!t||r.$formutil,"You should enusre that the <Field /> with the name '".concat(t,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));a(t,"You should assign a name to <Field />, otherwise it will be isolated!");if(r.$$register){r.$$register(t,this.$fieldHandler)}this.$prevValue=this.$state.$value}},{key:"componentWillUnmount",value:function e(){if(this.$formContext.$$unregister){this.$formContext.$$unregister(this.props.name,this.$fieldHandler,this.props.$reserveOnUnmount)}this.isMounting=false}},{key:"componentDidUpdate",value:function e(t){var r=this.props.name;if(r!==t.name){if(this.$formContext.$$register){this.$formContext.$$register(r,this.$fieldHandler,t.name)}}if(this.$state.$value!==this.$prevValue){if(!(r in(this.$formContext.$$registers||{}))){this.$registered.$$triggerChange({$newValue:this.$state.$value,$prevValue:this.$prevValue})}this.$prevValue=this.$state.$value}}},{key:"_render",value:function e(){var t=this.$fieldutil=f({$name:this.props.name},this.$registered.$getState(),this.$registered,{$$formutil:this.$formContext.$formutil});return le(t,this.props)}},{key:"render",value:function e(){var t=this;var n=!this.$formContext;return r.createElement(E.Consumer,null,function(e){t.$formContext=e;if(!t.$fieldHandler){t.$fieldHandler=$e(t,t)}t.$registered=(e.$$registers||{})[t.$fieldHandler.$name]||t.$fieldHandler;if(n){t.$fieldHandler.$$reset();t.$fieldHandler.$validate()}return t._render()})}}]);return t}(t.Component);fe.displayName=oe;function ce(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var a=function(t){c(a,t);function a(){o(this,a);return g(this,d(a).apply(this,arguments))}l(a,[{key:"render",value:function t(){var a=Object.assign({},this.props);var i=this.props,u=i.component,o=h(i,["component"]);["$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$defaultValue","$defaultState","$onFieldChange","$parser","$formatter","name"].concat(Object.keys(f({},n.$validators,n.$asyncValidators,a.$validators,a.$asyncValidators))).forEach(function(e){if(e in a){if(e==="$validators"||e==="$asyncValidators"||e==="$defaultState"){o[e]=f({},n[e],a[e])}delete a[e]}});return r.createElement(fe,Object.assign({},n,o,{render:function t(n){return r.createElement(e,Object.assign({},a,{$fieldutil:n}))}}))}}]);return a}(t.Component);a.displayName="React.Formutil.withField."+(e.displayName||e.name||"Anonymous");return i(a,e)}var de=I(ce);var ve=function(e){c(t,e);function t(){o(this,t);return g(this,d(t).apply(this,arguments))}l(t,[{key:"render",value:function e(){var t=this;var n=this.props,a=n.$fieldutil,i=n.value,u=n.onChange,o=n.onFocus,s=n.onBlur,l=n.checked,$=n.unchecked,f=h(n,["$fieldutil","value","onChange","onFocus","onBlur","checked","unchecked"]);var c=this.props.type;var d={value:"compositionValue"in this?this.compositionValue:i,onCompositionEnd:function e(r){t.composition=false;delete t.compositionValue;d.onChange(r)},onCompositionStart:function e(){return t.composition=true},onChange:function e(r){var n=r.target.value;if(t.composition){t.compositionValue=n;t.forceUpdate()}else{u(n,r)}},onFocus:o,onBlur:s};var v="input";switch(c){case"select":v=c;d.onChange=function(e){var t=e.target;var r=t.multiple?[].slice.call(t.options).filter(function(e){return e.selected}).map(function(e){return e.value}):t.value;u(r,e)};delete f.type;break;case"textarea":v=c;delete f.type;break;case"checkbox":case"radio":d={checked:i===l,onChange:function e(t){u(t.target.checked?l:$,t)},onFocus:o,onBlur:s};break;default:break}return r.createElement(v,Object.assign({},f,d))}}]);return t}(t.Component);ve.displayName="React.Formutil.EasyField.Native";ve.defaultProps={value:"",type:"text",checked:true,unchecked:false};var pe=n({}),he=pe.Provider,me=pe.Consumer;var ge=function(e){c(n,e);function n(){o(this,n);return g(this,d(n).apply(this,arguments))}l(n,[{key:"getGroupContext",value:function e(){return this.props}},{key:"_render",value:function e(){var n=this.props,a=n.className,i=n.groupNode,u=n.children;var o={GroupOption:ye,Field:be};var s=D(u)?u(o):t.Children.map(u,function(e){return t.cloneElement(e,o)});if(i===null){return s}return r.createElement(i,{className:a},s)}},{key:"render",value:function e(){return r.createElement(he,{value:this.getGroupContext()},this._render())}}]);return n}(t.Component);ge.displayName="React.Formutil.EasyField.Group";ge.defaultProps={type:"checkbox",groupNode:"div"};var ye=function(e){c(t,e);function t(){o(this,t);return g(this,d(t).apply(this,arguments))}l(t,[{key:"componentDidMount",value:function e(){a("$value"in this.props,"You should pass a $value to <GroupOption />.")}},{key:"render",value:function e(){var t=this.props,n=t.$value,a=t.onChange,i=t.onFocus,u=t.onBlur,o=h(t,["$value","onChange","onFocus","onBlur"]);return r.createElement(me,null,function(e){var t=e.type,s=e.name;var l=t==="radio"?{checked:e.value===n,onChange:function t(r){e.onChange(n,r);a&&a(r)}}:t==="checkbox"?{checked:e.value.indexOf(n)>-1,onChange:function t(r){e.onChange(r.target.checked?e.value.concat(n):e.value.filter(function(e){return e!==n}),r);a&&a(r)}}:{value:e.value,onChange:function t(r){e.onChange(r);a&&a(r)}};return r.createElement("input",Object.assign({name:s},o,l,{type:t,onFocus:function t(r){e.onFocus(r);i&&i(r)},onBlur:function t(r){e.onBlur(r);u&&u(r)}}))})}}]);return t}(t.Component);ye.displayName="React.Formutil.EasyField.Group.Option";var be=function(e){c(t,e);function t(){o(this,t);return g(this,d(t).apply(this,arguments))}l(t,[{key:"componentDidMount",value:function e(){a(false,'The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.')}},{key:"render",value:function e(){return r.createElement(ye,this.props)}}]);return t}(t.Component);be.displayName="React.Formutil.EasyField.Group.Option.Deprecated";var Ve=r.Frament||"div";var we=function(e){c(t,e);function t(e){var r;o(this,t);r=g(this,d(t).call(this,e));r.id=0;r.latestValue=r.props.value;r.$formutil=void 0;r.FieldValidators={required:function e(t){return t!==null}};r.$onFormChange=function(e){e.$onValidates(function(e){var t=e.$invalid,n=e.$params;if(t){if(r.props.value.length){r.props.onChange(r.latestValue=[])}}else if(!u(r.props.value,n.list)){r.props.onChange(r.latestValue=n.list)}})};r.swap=function(e,t,n){return r.$setState(function(r){var n=r.items;var a=[n[e],n[t]];n[t]=a[0];n[e]=a[1];return n},n)};r.insert=function(){var e,t,n;for(var a=arguments.length,i=new Array(a),u=0;u<a;u++){i[u]=arguments[u]}i.forEach(function(r){if(D(r)){n=r}else if(typeof r==="number"){e=r}else if(typeof r==="object"){t=r}});return r.$setState(function(n){var a=n.items;if(x(e)){a.push(r.getId(t))}else{a.splice(e,0,r.getId(t))}return{items:a}},n)};r.remove=function(){var e,t;for(var n=arguments.length,a=new Array(n),i=0;i<n;i++){a[i]=arguments[i]}a.forEach(function(r){if(D(r)){t=r}else if(typeof r==="number"){e=r}});return r.$setState(function(t){var n=t.items;if(x(e)){n.pop()}else{n.splice(e,1)}if(!n.length){n=[r.getId()]}return{items:n}},t)};r.$setState=function(e,t){return new Promise(function(n){return r.setState(e,function(){return r.$formutil.$onValidates(function(e){return n(U(t,e))})})})};r.state={items:e.value.length?e.value.map(function(){return r.getId()}):[r.getId()],formKey:0};return r}l(t,[{key:"componentDidUpdate",value:function e(t){var r=this;if(this.props.value!==this.latestValue){this.setState({items:this.props.value.length?this.props.value.map(function(){return r.getId()}):[this.getId()],formKey:this.state.formKey+1});this.latestValue=this.props.value}}},{key:"getId",value:function e(t){return{id:this.id++,values:t}}},{key:"render",value:function e(){var t=this;var n=this.props,a=n.children,i=n.onFocus,o=n.onBlur,s=n.value;if(!D(a)){return null}var l={$length:this.state.items.length,$insert:this.insert,$remove:this.remove,$swap:this.swap,$push:function e(r,n){return t.insert(r,n)},$pop:function e(r){return t.remove(r)},$shift:function e(r){return t.remove(0,r)},$unshift:function e(r,n){return t.insert(0,r,n)},onFocus:i,onBlur:o};return r.createElement(ee,{key:this.state.formKey,$defaultValues:{list:s},$onFormChange:this.$onFormChange,children:function e(n){t.$formutil=n;return r.createElement(Ve,null,t.state.items.map(function(e,i){var o=e.id,s=e.values;return r.createElement(fe,{key:o,required:true,$defaultValue:s||null,$validators:t.FieldValidators,name:"list[".concat(i,"]"),children:function e(o){return r.createElement(ee,{$defaultValues:o.$value||{},$onFormChange:function e(t){return t.$onValidates(function(e){var t=e.$invalid,r=e.$params;if(t){if(o.$viewValue!==null){o.$render(null)}}else if(!u(o.$viewValue,r)){o.$render(r)}})},children:function e(r){return a(f({},l,r,{$index:i,$isLast:function e(){return i===t.state.items.length-1},$isFirst:function e(){return i===0}}),n)}})}})}))}})}}]);return t}(t.Component);we.displayName="React.Formutil.EasyField.List";var Ce="__TYPE__";var Fe=[["required",function(e,t,r){var n=r.__TYPE__,a=r.checked,i=a===void 0?true:a;return n==="checked"?e===i:!N(e)}],["maxLength",function(e,t){return N(e)||e.length<=t}],["minLength",function(e,t){return N(e)||e.length>=t}],["max",function(e,t){return N(e)||e*1<=t}],["min",function(e,t){return N(e)||e*1>=t}],["pattern",function(e,t){return N(e)||t.test(e)}],["enum",function(e,t){return N(e)||t.indexOf(e)>-1}],["checker",function(e,t,r){return t(e,r)}]].reduce(function(e,t){var r=y(t,2),n=r[0],a=r[1];e[n]=function e(t,r,i){var u=i.validMessage,o=u===void 0?{}:u;return a.apply(void 0,arguments)||o[n]||"Error input: ".concat(n)};return e},{});var ke="React.Formutil.EasyField";var Pe={validMessage:{},valuePropName:"value",changePropName:"onChange",focusPropName:"onFocus",blurPropName:"onBlur",$parser:function e(t){return typeof t==="string"?t.trim():t}};function Ee(e,t,r){var n;var a=t.valuePropName,i=t.changePropName,u=t.focusPropName,o=t.blurPropName,s=t.passUtil;var l=function e(t){return t&&t.target?t.target[a]:t};var c=f({},r,(n={},$(n,a,e.$viewValue),$(n,i,function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++){n[a]=arguments[a]}var u=n[0];var o=n[n.length-1];if(!o||!o.target){o=n}else{o=[o]}var s=t[i];s&&s.apply(void 0,b(o));var $=l(u);e.$render($)}),$(n,u,function(){var r=t[u];r&&r.apply(void 0,arguments);e.$setFocused(true)}),$(n,o,function(){var r=t[o];r&&r.apply(void 0,arguments);if(e.$untouched){e.$setTouched(true)}e.$setFocused(false)}),n));if(s){c[s===true?"$fieldutil":s]=e}return c}function Oe(e){var t=e.children,r=e.component,n=e.render,a=h(e,["children","component","render"]);var i=a.name,u=a.type,o=a.defaultValue,s=a.valuePropName,l=a.changePropName,$=a.focusPropName,c=a.blurPropName,d=a.validMessage,v=a.__TYPE__,p=a.passUtil,m=a.$defaultValue,g=a.$defaultState,b=a.$onFieldChange,V=a.$validators,w=a.$asyncValidators,C=a.$validateLazy,F=a.$reserveOnUnmount,k=a.$parser,P=a.$formatter,E=h(a,["name","type","defaultValue","valuePropName","changePropName","focusPropName","blurPropName","validMessage","__TYPE__","passUtil","$defaultValue","$defaultState","$onFieldChange","$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$parser","$formatter"]);var O={children:t,component:r,render:n};var S=!x(u)||x(t)&&x(r)&&x(n);Object.keys(f({},a.$validators=f({},Fe,a.$validators),a.$asyncValidators)).forEach(function(e){if(e in E){if(!S||!M(e)){delete E[e]}}});if(S){var j=(u||"").split("."),D=y(j,2),N=D[0],_=N===void 0?"text":N,A=D[1];O.component=_==="group"?ge:_==="list"?we:ve;if(i){E.name=i}if(u){E.type=_}if(t){E.children=t}switch(_){case"select":case"textarea":if(e.multiple){a[Ce]="array"}break;case"group":if(A==="checkbox"){a[Ce]="array"}E.type=A;break;case"checkbox":case"radio":a[Ce]="checked";break;case"list":a[Ce]="array";break;default:break}}if(!("$defaultValue"in a)&&"defaultValue"in e){a.$defaultValue=o}if(!("$defaultValue"in a)&&Ce in a){var T;switch(a[Ce]){case"checked":var R=a.unchecked,U=R===void 0?false:R;T=U;break;case"array":T=[];break;case"object":T={};break;case"number":T=0;break;case"empty":default:break}a.$defaultValue=T}return{fieldProps:a,childProps:E,renderProps:O}}function Se(e,r){var n=r.component,a=r.render,i=r.children;if(n){return t.createElement(n,e)}if(D(a)){return a(e)}if(D(i)){return i(e)}return t.Children.map(i,function(r){return t.cloneElement(r,e)})}var je=function(e){c(t,e);function t(){o(this,t);return g(this,d(t).apply(this,arguments))}l(t,[{key:"render",value:function e(){var t=Oe(this.props),n=t.fieldProps,a=t.childProps,i=t.renderProps;return r.createElement(fe,Object.assign({},n,{children:function e(t){return Se(Ee(t,n,a),i)}}))}}]);return t}(t.Component);je.displayName=ke;je.defaultProps=Pe;function xe(e){var n=function(t){c(n,t);function n(){o(this,n);return g(this,d(n).apply(this,arguments))}l(n,[{key:"render",value:function t(){var n=this;return r.createElement(E.Consumer,null,function(t){return r.createElement(e,Object.assign({},n.props,{$formutil:t.$formutil}))})}}]);return n}(t.Component);n.displayName="React.Formutil.connect."+(e.displayName||e.name||"Anonymous");return i(n,e)}function De(){if(!r.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var e=r.useContext;var t=e(E);return t}function Ne(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(!r.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var n=r.useState,i=r.useLayoutEffect,u=r.useRef;var o;if(e){if(typeof e==="string"){o=e;t.name=o}else{t=e;o=t.name}}var s=De();var l=u({}).current;var $=u([]);var c;l.$formContext=s;l.props=t;l.$setState=h;var d=n(function(){l.$$FIELD_UUID=se();l.$fieldHandler=c=$e(l);var e=l.$fieldHandler.$$reset();l.$fieldHandler.$validate();return e}),v=y(d,2),p=v[1];if(!c){c=(s.$$registers||{})[l.$fieldHandler.$name]||l.$fieldHandler}i(function(){var e=l.$state;if(l.isMounting){if(!(o in(s.$$registers||{}))){var t=l.$prevValue;c.$$triggerChange({$newValue:e.$value,$prevValue:t})}}l.$prevValue=e.$value},[l.$state.$value]);i(function(){l.isMounting=true;a(!o||s.$formutil,"You should enusre that the useField() with the name '".concat(o,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));a(o,"You should pass a name argument to useField(), otherwise it will be isolated!");return function(){if(s.$$unregister){s.$$unregister(o,l.$fieldHandler,t.$reserveOnUnmount)}l.isMounting=false}},[]);i(function(){if(s.$$register){s.$$register(o,l.$fieldHandler,l.$prevName)}l.$prevName=o},[o]);i(function(){if($.current.length>0){var e=b($.current);$.current.length=0;while(e.length){e.pop()(l.$fieldutil)}}});function h(e,t){return new Promise(function(r){var n=function e(){return r(U(t,l.$fieldutil))};if(l.isMounting){if(o in(s.$$registers||{})){s.$$onChange(o,e,n)}else{p(c.$$merge(e));c.$$detectChange(e);$.current.push(n)}}else{c.$$merge(e);n()}})}return l.$fieldutil=f({$name:o},c.$getState(),c,{$$formutil:s.$formutil})}function _e(){var e=De(),t=e.$formutil;return t}function Ae(e){e=f({},Pe,e,{children:null});var t=Oe(e),r=t.fieldProps,n=t.childProps;var a=Ne(r);return Ee(a,r,n)}exports.EasyField=je;exports.Field=fe;exports.Form=ee;exports.connect=xe;exports.useField=Ne;exports.useForm=_e;exports.useHandler=Ae;exports.withField=de;exports.withForm=re;
