"use strict";Object.defineProperty(exports,"__esModule",{value:true});function e(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var t=require("react");var r=e(t);var n=require("react-is");var i=e(require("warning"));var a=e(require("hoist-non-react-statics"));var u=e(require("react-fast-compare"));function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}function l(e,t,r){if(t)s(e.prototype,t);if(r)s(e,r);return e}function $(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);if(t)n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable});r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};if(t%2){f(r,true).forEach(function(t){$(e,t,r[t])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(e,Object.getOwnPropertyDescriptors(r))}else{f(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}}return e}function d(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});if(t)p(e,t)}function v(e){v=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return v(e)}function p(e,t){p=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return p(e,t)}function h(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var i,a;for(a=0;a<n.length;a++){i=n[a];if(t.indexOf(i)>=0)continue;r[i]=e[i]}return r}function m(e,t){if(e==null)return{};var r=h(e,t);var n,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++){n=a[i];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}function g(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function y(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}return g(e)}function b(e,t){return C(e)||k(e,t)||O()}function V(e){return w(e)||F(e)||P()}function w(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function C(e){if(Array.isArray(e))return e}function F(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]")return Array.from(e)}function k(e,t){var r=[];var n=true;var i=false;var a=undefined;try{for(var u=e[Symbol.iterator](),o;!(n=(o=u.next()).done);n=true){r.push(o.value);if(t&&r.length===t)break}}catch(e){i=true;a=e}finally{try{if(!n&&u["return"]!=null)u["return"]()}finally{if(i)throw a}}return r}function P(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function O(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var E=t.createContext({});var S=Object.getPrototypeOf({});var j=/\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g;var x=D(window)?global:window;function D(e){return typeof e==="undefined"}function _(e){return typeof e==="function"}function A(e){return D(e)||e===null||e+""===""}function N(e){return!!e&&_(e.then)}function T(e){return Object.prototype.toString.call(e)==="[object Object]"}function R(e){if(!T(e))return false;if(null===Object.getPrototypeOf(e))return true;if(!_(e.constructor))return false;return e.constructor.prototype===S}function U(e){return n.isValidElementType(e)&&typeof e!=="string"}function I(e){if(Array.isArray(e)){var t=[];for(var r=0,n=e.length;r<n;r++){t[r]=I(e[r])}return t}else if(R(e)){var i={};for(var a in e){i[a]=I(e[a])}return i}return e}var H=function e(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++){n[i-1]=arguments[i]}if(_(t)){t.apply(void 0,n)}return n[0]};function M(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++){r[n]=arguments[n]}if(U(r[0])){return e.apply(void 0,r)}return function(t){return e(t,r[0])}}}var L=["minlength","maxlength","max","min","required","pattern","step"];function q(e){return L.indexOf(e.toLowerCase())>-1}var B=function e(t){try{var r=new Function("origin","global","return typeof ".concat(t," === 'number' || (typeof ").concat(t," !== 'undefined' && !(origin in global)) ? ").concat(t," : origin"));return r(t,x)}catch(e){return t}};function Y(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++){t[r]=arguments[r]}var n=t[0],a=t[1],u=t[2];i(typeof a==="string","The second parameter(".concat(JSON.stringify(a),") of parsePath() must be a string."));var o=(a.match(j)||[]).map(function(e){return e.replace(/\s/g,"")});var s=a.split(j).map(function(e){return e.trim()}).filter(function(e){return e!==""});var l=n;try{if(t.length<3){for(var $=0,f=s.length;$<f;$++){var c=B(s[$]);if($+1===f){return l[c]}if(D(l[c])){break}l=l[c]}}else{for(var d=0,v=s.length;d<v;d++){var p=B(s[d]);var h=s[d+1];var m=o[d];if(D(h)){l[p]=u;break}switch(m){case"].":case".":l=D(l[p])?l[p]={}:l[p];break;case"][":case"[":var g=B(h);l=D(l[p])?l[p]=typeof g==="number"&&g>=0?[]:{}:l[p];break;default:l[p]=u;break}}}}catch(e){i(false,"The name '%s' of Field seems is not a legal expression.",a)}if(t.length>2){return n}}function Q(e,t){var r=t.split(j).map(function(e){return e.trim()}).filter(function(e){return e!==""});for(var n=0,i=r.length;n<i;n++){var a=B(r[n]);if(!(a in e)){break}if(n+1===i){return{data:e[a]}}e=e[a]}}function G(e,t){if(e){if(_(e)){e(t)}else if("current"in e){e.current=t}}}var z=function e(t,r){for(var n=0,i=t.length;n<i;n++){if(r(t[n])===true){return t[n]}}};var K=function e(t,r){return Object.keys(t).reduce(function(e,n){e[n]=r(t[n],n,t);return e},{})};var W=function e(t,r){return Object.keys(t).forEach(function(e){return r(t[e],e,t)})};var J=function e(t,r){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};return t.reduce(function(){r.apply(void 0,arguments);return arguments.length<=0?undefined:arguments[0]},n)};var X=undefined;function Z(e,t,r){W(e,function(t,r){if(t===X){delete e[r]}else if(R(t)||Array.isArray(t)){Z(t,r,e)}});if(r&&Object.keys(e).every(function(t){return e[t]===X})){r[t]=X;Z(r)}}var ee=function e(t,r){if(!D(Y(t,r))){Y(t,r,X);Z(t)}};var te="FORM_VALIDATE_RESULT";var re,ne;if(typeof requestAnimationFrame==="function"){re=requestAnimationFrame;ne=cancelAnimationFrame}else{re=setTimeout;ne=clearTimeout}var ie=function(e){d(n,e);function n(e){var t;o(this,n);t=y(this,v(n).call(this,e));t.$$formPending=void 0;t.$$formValidatePromise=void 0;t.$$registers={};t.$$deepRegisters={};t.$$regDuplications={};t.$$duplicateTimer=void 0;t.$$checkDuplication=function(){var e=g(t),r=e.$$regDuplications;var n;W(r,function(e,t){var a=b(e,2),u=a[0],o=a[1];i(u.$$reserved,"The Field with a name '".concat(t,"' has been registered!"));o.$$reset(u.$getState());n=delete r[t]});if(n){t.$render()}};t.$$register=function(e,r,n){t.$$unregister(n,r);if(e){var i=t.$$getRegister(e);if(i){ne(t.$$duplicateTimer);t.$$regDuplications[e]=[i,r];t.$$duplicateTimer=re(t.$$checkDuplication)}else{t.$$fieldChangedQueue.push({name:e,$newValue:r.$getState().$value});ee(t.$$defaultValues,e)}t.$$registers[r.$name=e]=r;t.createDeepRegisters();t.$render()}};t.$$unregister=function(e,r,n){if(e){if(e in t.$$regDuplications){var i=b(t.$$regDuplications[e],2),a=i[0],u=i[1];t.$$fieldChangedQueue.push({name:e,$newValue:u.$getState().$value,$prevValue:a.$getState().$value});delete t.$$regDuplications[e]}else if(t.$$registers[e]===r){if(n){r.$$reserved=true}else{delete t.$$registers[e];t.$$fieldChangedQueue.push({name:e,$prevValue:r.$getState().$value});ee(t.$$defaultValues,e)}}t.createDeepRegisters();t.$render()}};t.$$defaultInitialize=function(){var e=t.props,r=e.$defaultValues,n=e.$defaultStates;t.$$defaultValues=t.$$deepParseObject(I(_(r)?r(t.props)||{}:r));t.$$defaultStates=t.$$deepParseObject(I(_(n)?n(t.props)||{}:n))};t.$$getDefault=function(){return{$$defaultStates:t.$$defaultStates,$$defaultValues:t.$$defaultValues}};t.$$triggerChangeTimer=void 0;t.$$fieldChangedQueue=[];t.$$triggerFormChange=function(){if(t.$$fieldChangedQueue.length){var e=V(t.$$fieldChangedQueue);t.$$fieldChangedQueue.length=0;var r={};var n={};var i=t.$$registers;var a=false;e.forEach(function(e){if(!(e.name in i)){delete e.$newValue}if(e.$newValue!==e.$prevValue){if("$newValue"in e&&"$prevValue"in e){var u=t.$$getRegister(e.name);if(u){u.$$triggerChange(e)}}"$newValue"in e&&Y(r,e.name,e.$newValue);"$prevValue"in e&&Y(n,e.name,e.$prevValue);a=true}});if(a){if(_(t.props.$validator)){t.$$formValidate()}if(_(t.props.$onFormChange)){t.props.$onFormChange(t.$formutil,r,n)}}}};t.createDeepRegisters=function(){return t.$$deepRegisters=t.$$deepParseObject(t.$$registers)};t.$$getRegister=function(e){if(e){var r=t.$$registers[e]||Y(t.$$deepRegisters,e);if(r){return r}}};t.$$formValidate=function(e){return t.$$formValidatePromise=new Promise(function(r){var n=t.props.$validator;var i;var a;var u;var o;var s=n(t.$formutil.$params,t.formtutil);var l=function t(n){return r(H(e,H(u,n)))};if(N(s)){if(!t.$$formPending){t.$$formPending=true;t.$render()}a=function e(t){return i=t(l)};o=s.then(function(){return void 0},function(e){return e}).then(function(e){if(i){return i}t.$shouldCancelPrevAsyncValidate=null;t.$$formPending=false;return t.$$setFormErrors(e,l)})}else{if(t.$$formPending){t.$$formPending=false}o=t.$$setFormErrors(s,l)}if(t.$shouldCancelPrevAsyncValidate){t.$shouldCancelPrevAsyncValidate(function(e){u=e;return o})}t.$shouldCancelPrevAsyncValidate=a})};t.$$setFormErrors=function(e,r){if(e&&(e instanceof Error||typeof e!=="object")){i(false,"The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");return t.$render(r)}return t.$$setStates(e||{},function(e,t){var r=t.$getState(),n=r.$error,i=n===void 0?{}:n;if(e){return{$error:c({},i,$({},te,e))}}if(i[te]){delete i[te];return{$error:i}}return},r,true)};t.$getField=function(e){var r=t.$$getRegister(e);i(!e||r,"$getField('".concat(e,"') fail to find the matched Field. Maybe it has been unmounted."));i(e,"You should pass a name of the mounted Field to $getField().");if(r){return r.$new()}};t.$$onChange=function(e,r,n){return t.$setStates($({},e,r),n)};t.$$setStates=function(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var r=arguments.length>1?arguments[1]:undefined;var n=arguments.length>2?arguments[2]:undefined;var i=arguments.length>3?arguments[3]:undefined;var a=t.$$deepParseObject(e);W(t.$$registers,function(e,n){var u;if(i||(u=Q(a,n))){var o=r(u&&u.data,e);if(o){var s=t.$formutil.$weakParams[n];var l=e.$$merge(o),$=l.$value;e.$$detectChange(o);if("$value"in o||"$viewValue"in o){var f=z(t.$$fieldChangedQueue,function(e){return e.name===n});if(f){if(!("$prevValue"in f)){f.$prevValue=f.$newValue}f.$newValue=$}else{t.$$fieldChangedQueue.push({name:n,$newValue:$,$prevValue:s})}}}}});return t.$render(n)};t.$render=function(e){return new Promise(function(r){return t.forceUpdate(function(){return r(H(e,t.$formutil))})})};t.$validates=function(){var e;for(var r=arguments.length,n=new Array(r),i=0;i<r;i++){n[i]=arguments[i]}if(_(n[n.length-1])){e=n.pop()}if(n.length){var a=function e(r){r.forEach(function(r){if(Array.isArray(r)){e(r)}else{var n=t.$getField(r);if(n){n.$validate()}}})};a(n)}else{W(t.$$registers,function(e){return e.$validate()});if(_(t.props.$validator)){t.$$formValidate()}}return t.$onValidates(e)};t.$onValidates=function(e){var r=Object.keys(t.$$registers).map(function(e){return t.$$registers[e].$onValidate()});r.push(t.$$formValidatePromise);return Promise.all(r).then(function(){return H(e,t.$formutil)})};t.$validate=function(e,r){var n=t.$getField(e);if(n){return n.$validate(r)}return H(r)};t.$reset=function(e,r){t.$$defaultInitialize();if(_(e)){r=e;e={}}return t.$$setStates(e,function(e,t){return t.$$reset(e)},r,true)};t.$setStates=function(e,r){return t.$$setStates(e,function(e){return e},r)};t.$setValues=function(e,r){t.$$deepParseObject(I(e),t.$$defaultValues);Z(t.$$defaultValues);return t.$$setStates(e,function(e){return{$value:e}},r)};t.$setFocuses=function(e,r){return t.$$setStates(e,function(e){return{$focused:e}},r)};t.$setDirts=function(e,r){return t.$$setStates(e,function(e){return{$dirty:e}},r)};t.$setTouches=function(e,r){return t.$$setStates(e,function(e){return{$touched:e}},r)};t.$setPendings=function(e,r){return t.$$setStates(e,function(e){return{$pending:e}},r)};t.$setErrors=function(e,r){return t.$$setStates(e,function(e){return{$error:e}},r)};t.$batchState=function(e,r){return t.$setStates(K(t.$$registers,function(){return e}),r)};t.$batchDirty=function(e,r){return t.$batchState({$dirty:e},r)};t.$batchTouched=function(e,r){return t.$batchState({$touched:e},r)};t.$batchFocused=function(e,r){return t.$batchState({$focused:e},r)};t.$batchPending=function(e,r){return t.$batchState({$pending:e},r)};t.$batchError=function(e,r){return t.$batchState({$error:e},r)};t.$$defaultInitialize();return t}l(n,[{key:"getFormContext",value:function e(){return{$$registers:this.$$registers,$$register:this.$$register,$$unregister:this.$$unregister,$$onChange:this.$$onChange,$$getDefault:this.$$getDefault,$formutil:this.$formutil}}},{key:"$$deepParseObject",value:function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};W(t,function(e,t){return Y(r,t,e)});return r}},{key:"componentDidMount",value:function e(){G(this.props.$ref,this.$formutil)}},{key:"componentDidUpdate",value:function e(t){var r=this;G(this.props.$ref,this.$formutil);ne(this.$$triggerChangeTimer);this.$$triggerChangeTimer=re(function(){r.$$triggerFormChange()})}},{key:"componentWillUnmount",value:function e(){G(this.props.$ref,null)}},{key:"_render",value:function e(){var r=this.$formutil;var n=this.props,i=n.children,a=n.render,u=n.component;if(u){return t.createElement(u,{$formutil:r})}if(_(a)){return a(r)}if(_(i)){return i(r)}return t.Children.map(i,function(e){return e&&U(e.type)?t.cloneElement(e,{$formutil:r}):e})}},{key:"render",value:function e(){var t=this;var n=this.props.$processer;var i=Object.keys(this.$$registers).map(function(e){return{path:e,$state:t.$$registers[e].$getState()}});var a=J(i,function(e,t){var r=t.path,i=t.$state;if(n){n(i,r)}if("$value"in i&&(i.$dirty||!D(i.$value))){e[r]=i.$value}});var u=J(i,function(e,t){var r=t.path,n=t.$state;return r in a&&Y(e,r,a[r])});var o=i.some(function(e){var t=e.$state;return t.$invalid});var s=i.some(function(e){var t=e.$state;return t.$dirty});var l=i.some(function(e){var t=e.$state;return t.$touched});var $=i.some(function(e){var t=e.$state;return t.$focused});var f=this.$$formPending||i.some(function(e){var t=e.$state;return t.$pending});var d=this.$formutil={$$registers:c({},this.$$registers),$$deepRegisters:this.$$deepRegisters,$states:J(i,function(e,t){var r=t.path,n=t.$state;return Y(e,r,n)}),$params:c({},this.$$defaultValues,{},u),$errors:J(i,function(e,t){var r=t.path,n=t.$state;if(n.$invalid){Y(e,r,n.$error)}}),$dirts:J(i,function(e,t){var r=t.path,n=t.$state;return Y(e,r,n.$dirty)}),$touches:J(i,function(e,t){var r=t.path,n=t.$state;return Y(e,r,n.$touched)}),$focuses:J(i,function(e,t){var r=t.path,n=t.$state;return Y(e,r,n.$focused)}),$pendings:J(i,function(e,t){var r=t.path,n=t.$state;return Y(e,r,n.$pending)}),$weakStates:J(i,function(e,t){var r=t.path,n=t.$state;return e[r]=n}),$weakParams:a,$weakErrors:J(i,function(e,t){var r=t.path,n=t.$state;if(n.$invalid){e[r]=n.$error}}),$weakDirts:J(i,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$dirty}),$weakTouches:J(i,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$touched}),$weakFocuses:J(i,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$focused}),$weakPendings:J(i,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$pending}),$getFirstError:function e(t){if(t){var r=d.$getField(t);return r&&r.$getFirstError()}for(var n in d.$weakErrors){var i=d.$weakErrors[n];for(var a in i){return i[a]instanceof Error?i[a].message:i[a]}}},$render:this.$render,$getField:this.$getField,$onValidates:this.$onValidates,$new:function e(){return t.$formutil},$setStates:this.$setStates,$setValues:this.$setValues,$setErrors:this.$setErrors,$setTouches:this.$setTouches,$setDirts:this.$setDirts,$setFocuses:this.$setFocuses,$batchState:this.$batchState,$batchTouched:this.$batchTouched,$batchDirty:this.$batchDirty,$batchFocused:this.$batchFocused,$reset:this.$reset,$validates:this.$validates,$validate:this.$validate,$valid:!o,$invalid:o,$dirty:s,$pristine:!s,$touched:l,$untouched:!l,$focused:$,$pending:f};return r.createElement(E.Provider,{value:this.getFormContext()},this._render())}}]);return n}(t.Component);ie.displayName="React.Formutil.Form";ie.defaultProps={$defaultValues:{},$defaultStates:{}};function ae(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var i=t.forwardRef(function(t,i){var a=Object.assign({},t);var u=t.component,o=m(t,["component"]);["$defaultStates","$defaultValues","$onFormChange","$validator","$processer","$ref"].forEach(function(e){if(e in a){if(e==="$defaultStates"||e==="$defaultValues"){o[e]=c({},n[e],{},a[e])}delete a[e]}});return r.createElement(ie,Object.assign({},n,o,{render:function t(n){return r.createElement(e,Object.assign({},a,{$formutil:n,ref:i}))}}))});i.displayName="React.Formutil.withForm."+(e.displayName||e.name||"Anonymous");return a(i,e)}var ue=M(ae);var oe=0;var se={$valid:true,$invalid:false,$dirty:false,$pristine:true,$touched:false,$untouched:true,$focused:false,$pending:false,$error:{}};function le(e){return e!==true}function $e(e,t,r){i(!D(e),"You should return a string or Error when the validation('".concat(r&&r+": ").concat(t,"') failed, otherwise return true."))}var fe="React.Formutil.Field";function ce(){return oe++}function de(e,r){var n=r.children,i=r.render,a=r.component;if(a){return t.createElement(a,{$fieldutil:e})}if(_(i)){return i(e)}if(_(n)){return n(e)}return t.Children.map(n,function(r){return r&&U(r.type)?t.cloneElement(r,{$fieldutil:e}):r})}function ve(e,t){var r={$$FIELD_UUID:e.$$FIELD_UUID,$$reset:o,$$merge:b,$$detectChange:i,$$triggerChange:a,$onValidate:u,$new:function t(){return e.$fieldutil},$picker:s,$getState:s,$getComponent:function e(){return t},$reset:function t(r,n){return e.$setState(o(r),n)},$getFirstError:y,$validate:l,$setState:e.$setState,$render:$,$setValue:f,$setTouched:d,$setDirty:v,$setFocused:p,$setValidity:m,$setError:h,$setPending:g};var n;function i(e){if("$value"in e||"$viewValue"in e){l()}}function a(t){var r=t.$newValue,n=t.$prevValue;var i=e.props.$onFieldChange;if(_(i)){i(r,n,e.$formContext.$formutil)}}function u(e){n.then(e);return n}function o(t){var r;var n=e.props,i=e.$formContext;if(i.$$getDefault){var a=n.name;var u=i.$$getDefault(),o=u.$$defaultStates,s=u.$$defaultValues;if(a&&s){var l=Y(s,a);r=Y(o,a)||{};if(!D(l)){r.$value=l}}}var $=n.$defaultValue,f=n.$defaultState;return b(c({},se,{},_(f)?f(n):f,{$value:_($)?$(n):"$defaultValue"in n?$:""},r,{},t))}function s(){return c({},e.$state)}function l(t){return n=new Promise(function(r){var n=e.props,i=e.$formContext;var a=c({},n.$validators,{},n.$asyncValidators);var u=e.$state,o=u.$value,s=u.$pending,l=Object.assign({},u.$error);var $=i.$formutil;var f={};var d=false;var v;var p;var y;var b;delete l[te];var V=Object.keys(a).reduce(function(t,r){delete l[r];if(!d&&n[r]!=null){var i=a[r](o,n[r],c({},n,{$formutil:$,$fieldutil:e.$fieldutil,$validError:f}));if(N(i)){t.push(i["catch"](function(e){if(!v){m(r,e||r)}}))}else if(le(i)){f[r]=i||r;$e(i,r,n.name);if(n.$validateLazy){d=true}}}return t},[]);var w=function e(n){return r(H(t,H(y,n)))};if(V.length){if(!s){g(true)}p=function e(t){return v=t(w)};V.push(h(c({},l,{},f)));b=Promise.all(V).then(function(){if(v){return v}e.$shouldCancelPrevAsyncValidate=null;return g(false,w)})}else{if(s){g(false)}b=h(c({},l,{},f),w)}if(e.$shouldCancelPrevAsyncValidate){e.$shouldCancelPrevAsyncValidate(function(e){y=e;return b})}e.$shouldCancelPrevAsyncValidate=p})}function $(t,r){return e.$setState({$viewValue:t,$dirty:true},r)}function f(t,r){return e.$setState({$value:t},r)}function d(t,r){return e.$setState({$touched:t},r)}function v(t,r){return e.$setState({$dirty:t},r)}function p(t,r){return e.$setState({$focused:t},r)}function h(t,r){return e.$setState({$error:t},r)}function m(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var n=arguments.length>2?arguments[2]:undefined;var i=Object.assign({},e.$state.$error);if(le(r)){i[t]=r||t;$e(r,t,e.props.name)}else{delete i[t]}return h(i,n)}function g(t,r){return e.$setState({$pending:t},r)}function y(){var t=e.$state.$error,r=t===void 0?{}:t;for(var n in r){return r[n]instanceof Error?r[n].message:r[n]}}function b(t){var r=Object.assign({},t);if("$error"in r){if(!r.$error){r.$error={}}r.$valid=Object.keys(r.$error).length===0}var n=e.props,i=n.$parser,a=n.$formatter;if("$viewValue"in r&&!("$value"in r)){var u=function e(t){return r.$viewValue=t};r.$value=i?i(r.$viewValue,u):r.$viewValue}else if("$value"in r&&!("$viewValue"in r)){var o=function e(t){return r.$value=t};r.$viewValue=a?a(r.$value,o):r.$value}if("$valid"in r){r.$invalid=!r.$valid}else if("$invalid"in r){r.$dirty=!r.$invalid}if("$dirty"in r){r.$pristine=!r.$dirty}else if("$pristine"in r){r.$dirty=!r.$pristine}if("$touched"in r){r.$untouched=!r.$touched}else if("$untouched"in r){r.$touched=!r.$untouched}e.$state=c({},e.$state,{},r);return s()}return r}var pe=function(e){d(t,e);function t(){var e;var r;o(this,t);for(var n=arguments.length,i=new Array(n),a=0;a<n;a++){i[a]=arguments[a]}r=y(this,(e=v(t)).call.apply(e,[this].concat(i)));r.$$FIELD_UUID=ce();r.$formContext=void 0;r.$state=void 0;r.$setState=function(e,t){return new Promise(function(n){var i=function e(){return n(H(t,r.$fieldutil))};if(r.isMounting){var a=r.props.name;if(a in(r.$formContext.$$registers||{})){r.$formContext.$$onChange(a,e,i)}else{r.$registered.$$merge(e);r.$registered.$$detectChange(e);r.forceUpdate(i)}}else{r.$registered.$$merge(e);i()}})};return r}l(t,[{key:"componentDidMount",value:function e(){this.isMounting=true;var t=this.props.name,r=this.$formContext;i(!t||r.$formutil,"You should enusre that the <Field /> with the name '".concat(t,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));i(t,"You should assign a name to <Field />, otherwise it will be isolated!");if(r.$$register){r.$$register(t,this.$fieldHandler)}this.$prevValue=this.$state.$value;G(this.props.$ref,this.$fieldutil)}},{key:"componentWillUnmount",value:function e(){if(this.$formContext.$$unregister){this.$formContext.$$unregister(this.props.name,this.$fieldHandler,this.props.$reserveOnUnmount)}this.isMounting=false;G(this.props.$ref,null)}},{key:"componentDidUpdate",value:function e(t){var r=this.props.name;if(r!==t.name){if(this.$formContext.$$register){this.$formContext.$$register(r,this.$fieldHandler,t.name)}}G(this.props.$ref,this.$fieldutil);if(this.$state.$value!==this.$prevValue){if(!(r in(this.$formContext.$$registers||{}))){this.$registered.$$triggerChange({$newValue:this.$state.$value,$prevValue:this.$prevValue})}this.$prevValue=this.$state.$value}}},{key:"_render",value:function e(){var t=this.$fieldutil=c({$name:this.props.name},this.$registered.$getState(),{},this.$registered,{$$formutil:this.$formContext.$formutil});return de(t,this.props)}},{key:"render",value:function e(){var t=this;var n=!this.$formContext;return r.createElement(E.Consumer,null,function(e){t.$formContext=e;if(!t.$fieldHandler){t.$fieldHandler=ve(t,t)}t.$registered=(e.$$registers||{})[t.$fieldHandler.$name]||t.$fieldHandler;if(n){t.$fieldHandler.$$reset();t.$fieldHandler.$validate()}return t._render()})}}]);return t}(t.Component);pe.displayName=fe;function he(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var i=t.forwardRef(function(t,i){var a=Object.assign({},t);var u=t.component,o=m(t,["component"]);["$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$defaultValue","$defaultState","$onFieldChange","$parser","$formatter","$ref","name"].concat(Object.keys(c({},n.$validators,{},n.$asyncValidators,{},a.$validators,{},a.$asyncValidators))).forEach(function(e){if(e in a){if(e==="$validators"||e==="$asyncValidators"||e==="$defaultState"){o[e]=c({},n[e],{},a[e])}delete a[e]}});return r.createElement(pe,Object.assign({},n,o,{render:function t(n){return r.createElement(e,Object.assign({},a,{$fieldutil:n,ref:i}))}}))});i.displayName="React.Formutil.withField."+(e.displayName||e.name||"Anonymous");return a(i,e)}var me=M(he);var ge=function(e){d(t,e);function t(){o(this,t);return y(this,v(t).apply(this,arguments))}l(t,[{key:"render",value:function e(){var t=this;var n=this.props,i=n.$fieldutil,a=n.value,u=n.onChange,o=n.onFocus,s=n.onBlur,l=n.checked,$=n.unchecked,f=m(n,["$fieldutil","value","onChange","onFocus","onBlur","checked","unchecked"]);var c=this.props.type;var d={value:"compositionValue"in this?this.compositionValue:a,onCompositionEnd:function e(r){t.composition=false;delete t.compositionValue;d.onChange(r)},onCompositionStart:function e(){return t.composition=true},onChange:function e(r){var n=r.target.value;if(t.composition){t.compositionValue=n;t.forceUpdate()}else{u(n,r)}},onFocus:o,onBlur:s};var v="input";switch(c){case"select":v=c;d.onChange=function(e){var t=e.target;var r=t.multiple?[].slice.call(t.options).filter(function(e){return e.selected}).map(function(e){return e.value}):t.value;u(r,e)};delete f.type;break;case"textarea":v=c;delete f.type;break;case"checkbox":case"radio":d={checked:a===l,onChange:function e(t){u(t.target.checked?l:$,t)},onFocus:o,onBlur:s};break;default:break}return r.createElement(v,Object.assign({},f,d))}}]);return t}(t.Component);ge.displayName="React.Formutil.EasyField.Native";ge.defaultProps={value:"",type:"text",checked:true,unchecked:false};var ye=t.createContext({}),be=ye.Provider,Ve=ye.Consumer;var we=function(e){d(n,e);function n(){o(this,n);return y(this,v(n).apply(this,arguments))}l(n,[{key:"getGroupContext",value:function e(){return this.props}},{key:"_render",value:function e(){var n=this.props,i=n.className,a=n.groupNode,u=n.children;var o={GroupOption:Ce,Field:Fe};var s=_(u)?u(o):t.Children.map(u,function(e){return t.cloneElement(e,o)});if(a===null){return s}return r.createElement(a,{className:i},s)}},{key:"render",value:function e(){return r.createElement(be,{value:this.getGroupContext()},this._render())}}]);return n}(t.Component);we.displayName="React.Formutil.EasyField.Group";we.defaultProps={type:"checkbox",groupNode:"div"};var Ce=function(e){d(t,e);function t(){o(this,t);return y(this,v(t).apply(this,arguments))}l(t,[{key:"componentDidMount",value:function e(){i("$value"in this.props,"You should pass a $value to <GroupOption />.")}},{key:"render",value:function e(){var t=this.props,n=t.$value,i=t.onChange,a=t.onFocus,u=t.onBlur,o=m(t,["$value","onChange","onFocus","onBlur"]);return r.createElement(Ve,null,function(e){var t=e.type,s=e.name;var l=t==="radio"?{checked:e.value===n,onChange:function t(r){e.onChange(n,r);i&&i(r)}}:t==="checkbox"?{checked:e.value.indexOf(n)>-1,onChange:function t(r){e.onChange(r.target.checked?e.value.concat(n):e.value.filter(function(e){return e!==n}),r);i&&i(r)}}:{value:e.value,onChange:function t(r){e.onChange(r);i&&i(r)}};return r.createElement("input",Object.assign({name:s},o,l,{type:t,onFocus:function t(r){e.onFocus(r);a&&a(r)},onBlur:function t(r){e.onBlur(r);u&&u(r)}}))})}}]);return t}(t.Component);Ce.displayName="React.Formutil.EasyField.Group.Option";var Fe=function(e){d(t,e);function t(){o(this,t);return y(this,v(t).apply(this,arguments))}l(t,[{key:"componentDidMount",value:function e(){i(false,'The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.')}},{key:"render",value:function e(){return r.createElement(Ce,this.props)}}]);return t}(t.Component);Fe.displayName="React.Formutil.EasyField.Group.Option.Deprecated";var ke=r.Frament||"div";var Pe=function(e){d(t,e);function t(e){var r;o(this,t);r=y(this,v(t).call(this,e));r.id=0;r.latestValue=r.props.value;r.$formutil=void 0;r.FieldValidators={required:function e(t){return t!==null}};r.$onFormChange=function(e){e.$onValidates(function(e){var t=e.$invalid,n=e.$params;if(t){if(r.props.value.length){r.props.onChange(r.latestValue=[])}}else if(!u(r.props.value,n.list)){r.props.onChange(r.latestValue=n.list)}})};r.swap=function(e,t,n){return r.$setState(function(r){var n=r.items;var i=[n[e],n[t]];n[t]=i[0];n[e]=i[1];return n},n)};r.insert=function(){var e,t,n;for(var i=arguments.length,a=new Array(i),u=0;u<i;u++){a[u]=arguments[u]}a.forEach(function(r){if(_(r)){n=r}else if(typeof r==="number"){e=r}else if(typeof r==="object"){t=r}});return r.$setState(function(n){var i=n.items;if(D(e)){i.push(r.getId(t))}else{i.splice(e,0,r.getId(t))}return{items:i}},n)};r.remove=function(){var e,t;for(var n=arguments.length,i=new Array(n),a=0;a<n;a++){i[a]=arguments[a]}i.forEach(function(r){if(_(r)){t=r}else if(typeof r==="number"){e=r}});return r.$setState(function(t){var n=t.items;if(D(e)){n.pop()}else{n.splice(e,1)}if(!n.length){n=[r.getId()]}return{items:n}},t)};r.$setState=function(e,t){return new Promise(function(n){return r.setState(e,function(){return r.$formutil.$onValidates(function(e){return n(H(t,e))})})})};r.state={items:e.value.length?e.value.map(function(){return r.getId()}):[r.getId()],formKey:0};return r}l(t,[{key:"componentDidUpdate",value:function e(t){var r=this;if(this.props.value!==this.latestValue){this.setState({items:this.props.value.length?this.props.value.map(function(){return r.getId()}):[this.getId()],formKey:this.state.formKey+1});this.latestValue=this.props.value}}},{key:"getId",value:function e(t){return{id:this.id++,values:t}}},{key:"render",value:function e(){var t=this;var n=this.props,i=n.children,a=n.onFocus,o=n.onBlur,s=n.value;if(!_(i)){return null}var l={$length:this.state.items.length,$insert:this.insert,$remove:this.remove,$swap:this.swap,$push:function e(r,n){return t.insert(r,n)},$pop:function e(r){return t.remove(r)},$shift:function e(r){return t.remove(0,r)},$unshift:function e(r,n){return t.insert(0,r,n)},onFocus:a,onBlur:o};return r.createElement(ie,{key:this.state.formKey,$defaultValues:{list:s},$onFormChange:this.$onFormChange,children:function e(n){t.$formutil=n;return r.createElement(ke,null,t.state.items.map(function(e,a){var o=e.id,s=e.values;return r.createElement(pe,{key:o,required:true,$defaultValue:s||null,$validators:t.FieldValidators,name:"list[".concat(a,"]"),children:function e(o){return r.createElement(ie,{$defaultValues:o.$value||{},$onFormChange:function e(t){return t.$onValidates(function(e){var t=e.$invalid,r=e.$params;if(t){if(o.$viewValue!==null){o.$render(null)}}else if(!u(o.$viewValue,r)){o.$render(r)}})},children:function e(r){return i(c({},l,{},r,{$index:a,$isLast:function e(){return a===t.state.items.length-1},$isFirst:function e(){return a===0}}),n)}})}})}))}})}}]);return t}(t.Component);Pe.displayName="React.Formutil.EasyField.List";var Oe="__TYPE__";var Ee=[["required",function(e,t,r){var n=r.__TYPE__,i=r.checked,a=i===void 0?true:i;return n==="checked"?e===a:!A(e)}],["maxLength",function(e,t){return A(e)||e.length<=t}],["minLength",function(e,t){return A(e)||e.length>=t}],["max",function(e,t){return A(e)||e*1<=t}],["min",function(e,t){return A(e)||e*1>=t}],["pattern",function(e,t){return A(e)||t.test(e)}],["enum",function(e,t){return A(e)||t.indexOf(e)>-1}],["checker",function(e,t,r){return t(e,r)}]].reduce(function(e,t){var r=b(t,2),n=r[0],i=r[1];e[n]=function e(t,r,a){var u=a.validMessage,o=u===void 0?{}:u;return i.apply(void 0,arguments)||o[n]||"Error input: ".concat(n)};return e},{});var Se="React.Formutil.EasyField";var je={validMessage:{},valuePropName:"value",changePropName:"onChange",focusPropName:"onFocus",blurPropName:"onBlur",$parser:function e(t){return typeof t==="string"?t.trim():t}};function xe(e,t,r){var n;var i=t.valuePropName,a=t.changePropName,u=t.focusPropName,o=t.blurPropName,s=t.passUtil;var l=function e(t){return t&&t.target?t.target[i]:t};var f=c({},r,(n={},$(n,i,e.$viewValue),$(n,a,function(){for(var r=arguments.length,n=new Array(r),i=0;i<r;i++){n[i]=arguments[i]}var u=n[0];var o=n[n.length-1];if(!o||!o.target){o=n}else{o=[o]}var s=t[a];s&&s.apply(void 0,V(o));var $=l(u);e.$render($)}),$(n,u,function(){var r=t[u];r&&r.apply(void 0,arguments);e.$setFocused(true)}),$(n,o,function(){var r=t[o];r&&r.apply(void 0,arguments);if(e.$untouched){e.$setTouched(true)}e.$setFocused(false)}),n));if(s){f[s===true?"$fieldutil":s]=e}return f}function De(e){var t=e.children,r=e.component,n=e.render,i=m(e,["children","component","render"]);var a=i.name,u=i.type,o=i.defaultValue,s=i.valuePropName,l=i.changePropName,$=i.focusPropName,f=i.blurPropName,d=i.validMessage,v=i.checked,p=i.unchecked,h=i.__TYPE__,g=i.passUtil,y=i.$defaultValue,V=i.$defaultState,w=i.$onFieldChange,C=i.$validators,F=i.$asyncValidators,k=i.$validateLazy,P=i.$reserveOnUnmount,O=i.$parser,E=i.$formatter,S=i.$ref,j=m(i,["name","type","defaultValue","valuePropName","changePropName","focusPropName","blurPropName","validMessage","checked","unchecked","__TYPE__","passUtil","$defaultValue","$defaultState","$onFieldChange","$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$parser","$formatter","$ref"]);var x={children:t,component:r,render:n};var _=!D(u)||D(t)&&D(r)&&D(n);Object.keys(c({},i.$validators=c({},Ee,{},i.$validators),{},i.$asyncValidators)).forEach(function(e){if(e in j){if(!_||!q(e)){delete j[e]}}});if(_){var A=(u||"").split("."),N=b(A,2),T=N[0],R=T===void 0?"text":T,U=N[1];x.component=R==="group"?we:R==="list"?Pe:ge;if(a){j.name=a}if(u){j.type=R}if(t){j.children=t}switch(R){case"select":case"textarea":if(e.multiple){i[Oe]="array"}break;case"group":if(U==="checkbox"){i[Oe]="array"}j.type=U;break;case"checkbox":case"radio":i[Oe]="checked";break;case"list":i[Oe]="array";break;default:break}}if(!("$defaultValue"in i)&&"defaultValue"in e){i.$defaultValue=o}if(!("$defaultValue"in i)&&Oe in i){var I;switch(i[Oe]){case"checked":var H=i.unchecked,M=H===void 0?false:H;I=M;break;case"array":I=[];break;case"object":I={};break;case"number":I=0;break;case"empty":default:break}i.$defaultValue=I}return{fieldProps:i,childProps:j,renderProps:x}}function _e(e,r){var n=r.component,i=r.render,a=r.children;if(n){return t.createElement(n,e)}if(_(i)){return i(e)}if(_(a)){return a(e)}return t.Children.map(a,function(r){return t.cloneElement(r,e)})}var Ae=function(e){d(t,e);function t(){o(this,t);return y(this,v(t).apply(this,arguments))}l(t,[{key:"render",value:function e(){var t=De(this.props),n=t.fieldProps,i=t.childProps,a=t.renderProps;return r.createElement(pe,Object.assign({},n,{children:function e(t){return _e(xe(t,n,i),a)}}))}}]);return t}(t.Component);Ae.displayName=Se;Ae.defaultProps=je;function Ne(e){var n=t.forwardRef(function(t,n){return r.createElement(E.Consumer,null,function(i){return r.createElement(e,Object.assign({},t,{$formutil:i.$formutil,ref:n}))})});n.displayName="React.Formutil.connect."+(e.displayName||e.name||"Anonymous");return a(n,e)}function Te(){if(!r.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var e=r.useContext;var t=e(E);return t}function Re(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(!r.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var n=r.useState,a=r.useLayoutEffect,u=r.useRef;var o;if(e){if(typeof e==="string"){o=e;t.name=o}else{t=e;o=t.name}}var s=Te();var l=u({}).current;var $=u([]);var f;l.$formContext=s;l.props=t;l.$setState=h;var d=n(function(){l.$$FIELD_UUID=ce();l.$fieldHandler=f=ve(l);var e=l.$fieldHandler.$$reset();l.$fieldHandler.$validate();return e}),v=b(d,2),p=v[1];if(!f){f=(s.$$registers||{})[l.$fieldHandler.$name]||l.$fieldHandler}a(function(){var e=l.$state;if(l.isMounting){if(!(o in(s.$$registers||{}))){var t=l.$prevValue;f.$$triggerChange({$newValue:e.$value,$prevValue:t})}}l.$prevValue=e.$value},[l.$state.$value]);a(function(){l.isMounting=true;i(!o||s.$formutil,"You should enusre that the useField() with the name '".concat(o,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));i(o,"You should pass a name argument to useField(), otherwise it will be isolated!");return function(){l.isMounting=false;G(t.$ref,null)}},[]);a(function(){if(s.$$register){s.$$register(o,l.$fieldHandler)}return function(){if(s.$$unregister){s.$$unregister(o,l.$fieldHandler,!l.isMounting&&t.$reserveOnUnmount)}}},[o]);a(function(){G(t.$ref,l.$fieldutil)});a(function(){if($.current.length>0){var e=V($.current);$.current.length=0;while(e.length){e.pop()(l.$fieldutil)}}});function h(e,t){return new Promise(function(r){var n=function e(){return r(H(t,l.$fieldutil))};if(l.isMounting){if(o in(s.$$registers||{})){s.$$onChange(o,e,n)}else{p(f.$$merge(e));f.$$detectChange(e);$.current.push(n)}}else{f.$$merge(e);n()}})}return l.$fieldutil=c({$name:o},f.$getState(),{},f,{$$formutil:s.$formutil})}function Ue(){var e=Te(),t=e.$formutil;return t}function Ie(e){e=c({},je,{},e,{children:null});var t=De(e),r=t.fieldProps,n=t.childProps;var i=Re(r);return xe(i,r,n)}exports.EasyField=Ae;exports.Field=pe;exports.Form=ie;exports.connect=Ne;exports.useField=Re;exports.useForm=Ue;exports.useHandler=Ie;exports.withField=me;exports.withForm=ue;
