!function(e,t){"object"===typeof exports&&"undefined"!==typeof module?t(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],t):t((e=e||self).ReactFormutil={},e.React)}(this,function(e,t){"use strict";var r="default"in t?t.default:t;function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){a(e,t,r[t])})}return e}function s(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?f(e):t}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function h(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var m=t.createContext({}),v=function(){},g=Object.getPrototypeOf({}),y=/\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g,b=w(window)?global:window;function w(e){return"undefined"===typeof e}function C(e){return"function"===typeof e}function F(e){return w(e)||null===e||e+""===""}function V(e){return!!e&&C(e.then)}function P(e){return!!function(e){return"[object Object]"===Object.prototype.toString.call(e)}(e)&&(null===Object.getPrototypeOf(e)||!!C(e.constructor)&&e.constructor.prototype===g)}function S(e){if(e&&"object"===typeof e){if(Array.isArray(e)){for(var t=[],r=0,n=e.length;r<n;r++)t[r]=S(e[r]);return t}if(P(e)){var i={};for(var o in e)i[o]=S(e[o]);return i}}return e}var O=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return C(e)&&e.apply(void 0,r),r[0]};function E(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return C(r[0])?e.apply(void 0,r):function(t){return e(t,r[0])}}}var k=["minlength","maxlength","max","min","required","pattern","step"];var j=function(e){try{return new Function("origin","global","return typeof ".concat(e," === 'number' || (typeof ").concat(e," !== 'undefined' && !(origin in global)) ? ").concat(e," : origin"))(e,b)}catch(t){return e}};function x(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t[0],i=t[1],o=t[2];v("string"===typeof i,"The second parameter(".concat(JSON.stringify(i),") of parsePath() must be a string."));var a=(i.match(y)||[]).map(function(e){return e.replace(/\s/g,"")}),u=i.split(y).map(function(e){return e.trim()}).filter(function(e){return""!==e}),s=n;try{if(t.length<3)for(var l=0,c=u.length;l<c;l++){var $=j(u[l]);if(l+1===c)return s[$];if(w(s[$]))break;s=s[$]}else for(var f=0,d=u.length;f<d;f++){var p=j(u[f]),h=u[f+1],m=a[f];if(w(h)){s[p]=o;break}switch(m){case"].":case".":s=w(s[p])?s[p]={}:s[p];break;case"][":case"[":var g=j(h);s=w(s[p])?s[p]="number"===typeof g&&g>=0?[]:{}:s[p];break;default:s[p]=o}}}catch(e){v(!1,"The name '%s' of Field seems is not a legal expression.",i)}if(t.length>2)return n}function D(e,t){e&&(C(e)?e(t):"current"in e&&(e.current=t))}var _=function(e,t){for(var r=0,n=e.length;r<n;r++)if(!0===t(e[r]))return e[r]},T=function(e,t){return Object.keys(e).reduce(function(r,n){return r[n]=t(e[n],n,e),r},{})},A=function(e,t){return Object.keys(e).forEach(function(r){return t(e[r],r,e)})},N=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.reduce(function(){return t.apply(void 0,arguments),arguments.length<=0?void 0:arguments[0]},r)},R=void 0;var M,U,I=function(e,t){w(x(e,t))||(x(e,t,R),function e(t,r,n){A(t,function(r,n){r===R?delete t[n]:r&&"object"===typeof r&&e(r,n,t)}),n&&Object.keys(t).every(function(e){return t[e]===R})&&(n[r]=R,e(n))}(e))},H="FORM_VALIDATE_RESULT";"function"===typeof requestAnimationFrame?(M=requestAnimationFrame,U=cancelAnimationFrame):(M=setTimeout,U=clearTimeout);var L=function(e){function i(e){var t;return n(this,i),(t=d(this,l(i).call(this,e))).$$formPending=void 0,t.$$formValidatePromise=void 0,t.$$registers={},t.$$deepRegisters={},t.$$regDuplications={},t.$$duplicateTimer=void 0,t.$$checkDuplication=function(){var e,r=f(t).$$regDuplications;A(r,function(t,n){var i=p(t,2),o=i[0],a=i[1];v(o.$$reserved,"The Field with a name '".concat(n,"' has been registered!")),a.$$reset(o.$getState()),e=delete r[n]}),e&&t.$render()},t.$$register=function(e,r,n){if(t.$$unregister(n,r),e){var i=t.$$getRegister(e);i?(U(t.$$duplicateTimer),t.$$regDuplications[e]=[i,r],t.$$duplicateTimer=M(t.$$checkDuplication)):(t.$$fieldChangedQueue.push({name:e,$newValue:r.$getState().$value}),I(t.$$defaultValues,e)),t.$$registers[r.$name=e]=r,t.createDeepRegisters(),t.$render()}},t.$$unregister=function(e,r,n){if(e){if(e in t.$$regDuplications){var i=p(t.$$regDuplications[e],2),o=i[0],a=i[1];t.$$fieldChangedQueue.push({name:e,$newValue:a.$getState().$value,$prevValue:o.$getState().$value}),delete t.$$regDuplications[e]}else t.$$registers[e]===r&&(n?r.$$reserved=!0:(delete t.$$registers[e],t.$$fieldChangedQueue.push({name:e,$prevValue:r.$getState().$value}),I(t.$$defaultValues,e)));t.createDeepRegisters(),t.$render()}},t.$$defaultInitialize=function(){var e=t.props,r=e.$defaultValues,n=e.$defaultStates;t.$$defaultValues=t.$$deepParseObject(S(C(r)?r(t.props)||{}:r)),t.$$defaultStates=t.$$deepParseObject(S(C(n)?n(t.props)||{}:n))},t.$$getDefault=function(){return{$$defaultStates:t.$$defaultStates,$$defaultValues:t.$$defaultValues}},t.$$triggerChangeTimer=void 0,t.$$fieldChangedQueue=[],t.$$triggerFormChange=function(){if(t.$$fieldChangedQueue.length){var e=h(t.$$fieldChangedQueue);t.$$fieldChangedQueue.length=0;var r={},n={},i=t.$$registers,o=!1;e.forEach(function(e){if(e.name in i||delete e.$newValue,e.$newValue!==e.$prevValue){if("$newValue"in e&&"$prevValue"in e){var a=t.$$getRegister(e.name);a&&a.$$triggerChange(e)}"$newValue"in e&&x(r,e.name,e.$newValue),"$prevValue"in e&&x(n,e.name,e.$prevValue),o=!0}}),o&&(C(t.props.$validator)&&t.$$formValidate(),C(t.props.$onFormChange)&&t.props.$onFormChange(t.$formutil,r,n))}},t.createDeepRegisters=function(){return t.$$deepRegisters=t.$$deepParseObject(t.$$registers)},t.$$getRegister=function(e){if(e){var r=t.$$registers[e]||x(t.$$deepRegisters,e);if(r)return r}},t.$$formValidate=function(e){return t.$$formValidatePromise=new Promise(function(r){var n,i,o,a,u=(0,t.props.$validator)(t.$formutil.$params,t.formtutil),s=function(t){return r(O(e,O(o,t)))};V(u)?(t.$$formPending||(t.$$formPending=!0,t.$render()),i=function(e){return n=e(s)},a=u.then(function(){},function(e){return e}).then(function(e){return n||(t.$shouldCancelPrevAsyncValidate=null,t.$$formPending=!1,t.$$setFormErrors(e,s))})):(t.$$formPending&&(t.$$formPending=!1),a=t.$$setFormErrors(u,s)),t.$shouldCancelPrevAsyncValidate&&t.$shouldCancelPrevAsyncValidate(function(e){return o=e,a}),t.$shouldCancelPrevAsyncValidate=i})},t.$$setFormErrors=function(e,r){return e&&(e instanceof Error||"object"!==typeof e)?(v(!1,"The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field."),t.$render(r)):t.$$setStates(e||{},function(e,t){var r=t.$getState().$error,n=void 0===r?{}:r;return e?{$error:u({},n,a({},H,e))}:n[H]?(delete n[H],{$error:n}):void 0},r,!0)},t.$getField=function(e){var r=t.$$getRegister(e);if(v(!e||r,"$getField('".concat(e,"') fail to find the matched Field. Maybe it has been unmounted.")),v(e,"You should pass a name of the mounted Field to $getField()."),r)return r.$new()},t.$$onChange=function(e,r,n){return t.$setStates(a({},e,r),n)},t.$$setStates=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=t.$$deepParseObject(e),a=!1;return A(t.$$registers,function(n,u){var s=u in e?e[u]:x(o,u);if(!w(s)||i){var l=r(s,n);if(l){var c=t.$formutil.$weakParams[u],$=n.$$merge(l).$value;if(n.$$detectChange(l),"$value"in l||"$viewValue"in l){var f=_(t.$$fieldChangedQueue,function(e){return e.name===u});f?("$prevValue"in f||(f.$prevValue=f.$newValue),f.$newValue=$):t.$$fieldChangedQueue.push({name:u,$newValue:$,$prevValue:c})}a=!0}}}),a?t.$render(n):Promise.resolve(O(n,t.$formutil))},t.$render=function(e){return new Promise(function(r){return t.forceUpdate(function(){return r(O(e,t.$formutil))})})},t.$validates=function(){for(var e,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];if(C(n[n.length-1])&&(e=n.pop()),n.length){!function e(r){r.forEach(function(r){if(Array.isArray(r))e(r);else{var n=t.$getField(r);n&&n.$validate()}})}(n)}else A(t.$$registers,function(e){return e.$validate()}),C(t.props.$validator)&&t.$$formValidate();return t.$onValidates(e)},t.$onValidates=function(e){var r=Object.keys(t.$$registers).map(function(e){return t.$$registers[e].$onValidate()});return r.push(t.$$formValidatePromise),Promise.all(r).then(function(){return O(e,t.$formutil)})},t.$validate=function(e,r){var n=t.$getField(e);return n?n.$validate(r):O(r)},t.$reset=function(e,r){return t.$$defaultInitialize(),C(e)&&(r=e,e={}),t.$$setStates(e,function(e,t){return t.$$reset(e)},r,!0)},t.$setStates=function(e,r){return t.$$setStates(e,function(e){return e},r)},t.$setValues=function(e,r){return t.$$deepParseObject(S(e),t.$$defaultValues),t.$$setStates(e,function(e){return{$value:e}},r)},t.$setFocuses=function(e,r){return t.$$setStates(e,function(e){return{$focused:e}},r)},t.$setDirts=function(e,r){return t.$$setStates(e,function(e){return{$dirty:e}},r)},t.$setTouches=function(e,r){return t.$$setStates(e,function(e){return{$touched:e}},r)},t.$setPendings=function(e,r){return t.$$setStates(e,function(e){return{$pending:e}},r)},t.$setErrors=function(e,r){return t.$$setStates(e,function(e){return{$error:e}},r)},t.$batchState=function(e,r){return t.$setStates(T(t.$$registers,function(){return e}),r)},t.$batchDirty=function(e,r){return t.$batchState({$dirty:e},r)},t.$batchTouched=function(e,r){return t.$batchState({$touched:e},r)},t.$batchFocused=function(e,r){return t.$batchState({$focused:e},r)},t.$batchPending=function(e,r){return t.$batchState({$pending:e},r)},t.$batchError=function(e,r){return t.$batchState({$error:e},r)},t.$$defaultInitialize(),t}return s(i,t.Component),o(i,[{key:"getFormContext",value:function(){return{$$registers:this.$$registers,$$register:this.$$register,$$unregister:this.$$unregister,$$onChange:this.$$onChange,$$getDefault:this.$$getDefault,$formutil:this.$formutil}}},{key:"$$deepParseObject",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return A(e,function(e,r){return x(t,r,e)}),t}},{key:"componentDidMount",value:function(){D(this.props.$ref,this.$formutil)}},{key:"componentDidUpdate",value:function(e){var t=this;D(this.props.$ref,this.$formutil),U(this.$$triggerChangeTimer),this.$$triggerChangeTimer=M(function(){t.$$triggerFormChange()})}},{key:"componentWillUnmount",value:function(){D(this.props.$ref,null)}},{key:"_render",value:function(){var e=this.$formutil,r=this.props,n=r.children,i=r.render,o=r.component;return o?t.createElement(o,{$formutil:e}):C(i)?i(e):C(n)?n(e):t.Children.map(n,function(r){return r&&C(r.type)?t.cloneElement(r,{$formutil:e}):r})}},{key:"render",value:function(){var e=this,t=this.props.$processer,n=Object.keys(this.$$registers).map(function(t){return{path:t,$state:e.$$registers[t].$getState()}}),i=N(n,function(e,r){var n=r.path,i=r.$state;t&&t(i,n),"$value"in i&&(i.$dirty||!w(i.$value))&&(e[n]=i.$value)}),o=N(n,function(e,t){var r=t.path;t.$state;return r in i&&x(e,r,i[r])}),a=n.some(function(e){return e.$state.$invalid}),s=n.some(function(e){return e.$state.$dirty}),l=n.some(function(e){return e.$state.$touched}),c=n.some(function(e){return e.$state.$focused}),$=this.$$formPending||n.some(function(e){return e.$state.$pending}),f=this.$formutil={$$registers:u({},this.$$registers),$$deepRegisters:this.$$deepRegisters,$states:N(n,function(e,t){return x(e,t.path,t.$state)}),$params:u({},this.$$defaultValues,o),$errors:N(n,function(e,t){var r=t.path,n=t.$state;n.$invalid&&x(e,r,n.$error)}),$dirts:N(n,function(e,t){return x(e,t.path,t.$state.$dirty)}),$touches:N(n,function(e,t){return x(e,t.path,t.$state.$touched)}),$focuses:N(n,function(e,t){return x(e,t.path,t.$state.$focused)}),$pendings:N(n,function(e,t){return x(e,t.path,t.$state.$pending)}),$weakStates:N(n,function(e,t){var r=t.path,n=t.$state;return e[r]=n}),$weakParams:i,$weakErrors:N(n,function(e,t){var r=t.path,n=t.$state;n.$invalid&&(e[r]=n.$error)}),$weakDirts:N(n,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$dirty}),$weakTouches:N(n,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$touched}),$weakFocuses:N(n,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$focused}),$weakPendings:N(n,function(e,t){var r=t.path,n=t.$state;return e[r]=n.$pending}),$getFirstError:function(e){if(e){var t=f.$getField(e);return t&&t.$getFirstError()}for(var r in f.$weakErrors){var n=f.$weakErrors[r];for(var i in n)return n[i]instanceof Error?n[i].message:n[i]}},$render:this.$render,$getField:this.$getField,$onValidates:this.$onValidates,$new:function(){return e.$formutil},$setStates:this.$setStates,$setValues:this.$setValues,$setErrors:this.$setErrors,$setTouches:this.$setTouches,$setDirts:this.$setDirts,$setFocuses:this.$setFocuses,$batchState:this.$batchState,$batchTouched:this.$batchTouched,$batchDirty:this.$batchDirty,$batchFocused:this.$batchFocused,$reset:this.$reset,$validates:this.$validates,$validate:this.$validate,$valid:!a,$invalid:a,$dirty:s,$pristine:!s,$touched:l,$untouched:!l,$focused:c,$pending:$};return r.createElement(m.Provider,{value:this.getFormContext()},this._render())}}]),i}();function z(e,t){return e(t={exports:{}},t.exports),t.exports}L.displayName="React.Formutil.Form",L.defaultProps={$defaultValues:{},$defaultStates:{}};var B,Y=z(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r="function"===typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,i=r?Symbol.for("react.portal"):60106,o=r?Symbol.for("react.fragment"):60107,a=r?Symbol.for("react.strict_mode"):60108,u=r?Symbol.for("react.profiler"):60114,s=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,c=r?Symbol.for("react.async_mode"):60111,$=r?Symbol.for("react.concurrent_mode"):60111,f=r?Symbol.for("react.forward_ref"):60112,d=r?Symbol.for("react.suspense"):60113,p=r?Symbol.for("react.memo"):60115,h=r?Symbol.for("react.lazy"):60116;function m(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case c:case $:case o:case u:case a:case d:return e;default:switch(e=e&&e.$$typeof){case l:case f:case s:return e;default:return t}}case h:case p:case i:return t}}}function v(e){return m(e)===$}t.typeOf=m,t.AsyncMode=c,t.ConcurrentMode=$,t.ContextConsumer=l,t.ContextProvider=s,t.Element=n,t.ForwardRef=f,t.Fragment=o,t.Lazy=h,t.Memo=p,t.Portal=i,t.Profiler=u,t.StrictMode=a,t.Suspense=d,t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===$||e===u||e===a||e===d||"object"===typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===p||e.$$typeof===s||e.$$typeof===l||e.$$typeof===f)},t.isAsyncMode=function(e){return v(e)||m(e)===c},t.isConcurrentMode=v,t.isContextConsumer=function(e){return m(e)===l},t.isContextProvider=function(e){return m(e)===s},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return m(e)===f},t.isFragment=function(e){return m(e)===o},t.isLazy=function(e){return m(e)===h},t.isMemo=function(e){return m(e)===p},t.isPortal=function(e){return m(e)===i},t.isProfiler=function(e){return m(e)===u},t.isStrictMode=function(e){return m(e)===a},t.isSuspense=function(e){return m(e)===d}});(B=Y)&&B.__esModule&&Object.prototype.hasOwnProperty.call(B,"default")&&B.default;Y.typeOf,Y.AsyncMode,Y.ConcurrentMode,Y.ContextConsumer,Y.ContextProvider,Y.Element,Y.ForwardRef,Y.Fragment,Y.Lazy,Y.Memo,Y.Portal,Y.Profiler,Y.StrictMode,Y.Suspense,Y.isValidElementType,Y.isAsyncMode,Y.isConcurrentMode,Y.isContextConsumer,Y.isContextProvider,Y.isElement,Y.isForwardRef,Y.isFragment,Y.isLazy,Y.isMemo,Y.isPortal,Y.isProfiler,Y.isStrictMode,Y.isSuspense;var Q=z(function(e){e.exports=Y}),G={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},q={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},K={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},W={};function J(e){return Q.isMemo(e)?K:W[e.$$typeof]||G}W[Q.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0};var X=Object.defineProperty,Z=Object.getOwnPropertyNames,ee=Object.getOwnPropertySymbols,te=Object.getOwnPropertyDescriptor,re=Object.getPrototypeOf,ne=Object.prototype;var ie=function e(t,r,n){if("string"!==typeof r){if(ne){var i=re(r);i&&i!==ne&&e(t,i,n)}var o=Z(r);ee&&(o=o.concat(ee(r)));for(var a=J(t),u=J(r),s=0;s<o.length;++s){var l=o[s];if(!q[l]&&(!n||!n[l])&&(!u||!u[l])&&(!a||!a[l])){var c=te(r,l);try{X(t,l,c)}catch(e){}}}return t}return t};var oe=E(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.forwardRef(function(t,i){var o=Object.assign({},t),a=(t.component,$(t,["component"]));return["$defaultStates","$defaultValues","$onFormChange","$validator","$processer","$ref"].forEach(function(e){e in o&&("$defaultStates"!==e&&"$defaultValues"!==e||(a[e]=u({},n[e],o[e])),delete o[e])}),r.createElement(L,Object.assign({},n,a,{render:function(t){return r.createElement(e,Object.assign({},o,{$formutil:t,ref:i}))}}))});return i.displayName="React.Formutil.withForm."+(e.displayName||e.name||"Anonymous"),ie(i,e)}),ae=0,ue={$valid:!0,$invalid:!1,$dirty:!1,$pristine:!0,$touched:!1,$untouched:!0,$focused:!1,$pending:!1,$error:{}};function se(e){return!0!==e}function le(e,t,r){v(!w(e),"You should return a string or Error when the validation('".concat(r&&r+": ").concat(t,"') failed, otherwise return true."))}function ce(){return ae++}function $e(e,t){var r;function n(t){var r,n=e.props,i=e.$formContext;if(i.$$getDefault){var o=n.name,a=i.$$getDefault(),s=a.$$defaultStates,l=a.$$defaultValues;if(o&&l){var $=x(l,o);r=x(s,o)||{},w($)||(r.$value=$)}}var f=n.$defaultValue,d=n.$defaultState;return c(u({},ue,C(d)?d(n):d,{$value:C(f)?f(n):"$defaultValue"in n?f:""},r,t))}function i(){return u({},e.$state)}function o(t){return r=new Promise(function(r){var n,i,o,c,$=e.props,f=e.$formContext,d=u({},$.$validators,$.$asyncValidators),p=e.$state,h=p.$value,m=p.$pending,v=Object.assign({},p.$error),g=f.$formutil,y={},b=!1;delete v[H];var w=Object.keys(d).reduce(function(t,r){if(delete v[r],!b&&null!=$[r]){var i=d[r](h,$[r],u({},$,{$formutil:g,$fieldutil:e.$fieldutil,$validError:y}));V(i)?t.push(i.catch(function(e){n||s(r,e||r)})):se(i)&&(y[r]=i||r,le(i,r,$.name),$.$validateLazy&&(b=!0))}return t},[]),C=function(e){return r(O(t,O(o,e)))};w.length?(m||l(!0),i=function(e){return n=e(C)},w.push(a(u({},v,y))),c=Promise.all(w).then(function(){return n||(e.$shouldCancelPrevAsyncValidate=null,l(!1,C))})):(m&&l(!1),c=a(u({},v,y),C)),e.$shouldCancelPrevAsyncValidate&&e.$shouldCancelPrevAsyncValidate(function(e){return o=e,c}),e.$shouldCancelPrevAsyncValidate=i})}function a(t,r){return e.$setState({$error:t},r)}function s(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2?arguments[2]:void 0,i=Object.assign({},e.$state.$error);return se(r)?(i[t]=r||t,le(r,t,e.props.name)):delete i[t],a(i,n)}function l(t,r){return e.$setState({$pending:t},r)}function c(t){var r=Object.assign({},t);"$error"in r&&(r.$error||(r.$error={}),r.$valid=0===Object.keys(r.$error).length);var n=e.props,o=n.$parser,a=n.$formatter;if("$viewValue"in r&&!("$value"in r)){r.$value=o?o(r.$viewValue,function(e){return r.$viewValue=e}):r.$viewValue}else if("$value"in r&&!("$viewValue"in r)){r.$viewValue=a?a(r.$value,function(e){return r.$value=e}):r.$value}return"$valid"in r?r.$invalid=!r.$valid:"$invalid"in r&&(r.$dirty=!r.$invalid),"$dirty"in r?r.$pristine=!r.$dirty:"$pristine"in r&&(r.$dirty=!r.$pristine),"$touched"in r?r.$untouched=!r.$touched:"$untouched"in r&&(r.$touched=!r.$untouched),e.$state=u({},e.$state,r),i()}return{$$FIELD_UUID:e.$$FIELD_UUID,$$reset:n,$$merge:c,$$detectChange:function(e){("$value"in e||"$viewValue"in e)&&o()},$$triggerChange:function(t){var r=t.$newValue,n=t.$prevValue,i=e.props.$onFieldChange;C(i)&&i(r,n,e.$formContext.$formutil)},$onValidate:function(e){return r.then(e),r},$new:function(){return e.$fieldutil},$picker:i,$getState:i,$getComponent:function(){return t},$reset:function(t,r){return e.$setState(n(t),r)},$getFirstError:function(){var t=e.$state.$error,r=void 0===t?{}:t;for(var n in r)return r[n]instanceof Error?r[n].message:r[n]},$validate:o,$setState:e.$setState,$render:function(t,r){return e.$setState({$viewValue:t,$dirty:!0},r)},$setValue:function(t,r){return e.$setState({$value:t},r)},$setTouched:function(t,r){return e.$setState({$touched:t},r)},$setDirty:function(t,r){return e.$setState({$dirty:t},r)},$setFocused:function(t,r){return e.$setState({$focused:t},r)},$setValidity:s,$setError:a,$setPending:l}}var fe=function(e){function i(){var e,t;n(this,i);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(t=d(this,(e=l(i)).call.apply(e,[this].concat(o)))).$$FIELD_UUID=ce(),t.$formContext=void 0,t.$state=void 0,t.$setState=function(e,r){return new Promise(function(n){var i=function(){return n(O(r,t.$fieldutil))};if(t.isMounting){var o=t.props.name;o in(t.$formContext.$$registers||{})?t.$formContext.$$onChange(o,e,i):(t.$registered.$$merge(e),t.$registered.$$detectChange(e),t.forceUpdate(i))}else t.$registered.$$merge(e),i()})},t}return s(i,t.Component),o(i,[{key:"componentDidMount",value:function(){this.isMounting=!0;var e=this.props.name,t=this.$formContext;v(!e||t.$formutil,"You should enusre that the <Field /> with the name '".concat(e,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated.")),v(e,"You should assign a name to <Field />, otherwise it will be isolated!"),t.$$register&&t.$$register(e,this.$fieldHandler),this.$prevValue=this.$state.$value,D(this.props.$ref,this.$fieldutil)}},{key:"componentWillUnmount",value:function(){this.$formContext.$$unregister&&this.$formContext.$$unregister(this.props.name,this.$fieldHandler,this.props.$reserveOnUnmount),this.isMounting=!1,D(this.props.$ref,null)}},{key:"componentDidUpdate",value:function(e){var t=this.props.name;t!==e.name&&this.$formContext.$$register&&this.$formContext.$$register(t,this.$fieldHandler,e.name),D(this.props.$ref,this.$fieldutil),this.$state.$value!==this.$prevValue&&(t in(this.$formContext.$$registers||{})||this.$registered.$$triggerChange({$newValue:this.$state.$value,$prevValue:this.$prevValue}),this.$prevValue=this.$state.$value)}},{key:"_render",value:function(){return function(e,r){var n=r.children,i=r.render,o=r.component;return o?t.createElement(o,{$fieldutil:e}):C(i)?i(e):C(n)?n(e):t.Children.map(n,function(r){return r&&C(r.type)?t.cloneElement(r,{$fieldutil:e}):r})}(this.$fieldutil=u({$name:this.props.name},this.$registered.$getState(),this.$registered,{$$formutil:this.$formContext.$formutil}),this.props)}},{key:"render",value:function(){var e=this,t=!this.$formContext;return r.createElement(m.Consumer,null,function(r){return e.$formContext=r,e.$fieldHandler||(e.$fieldHandler=$e(e,e)),e.$registered=(r.$$registers||{})[e.$fieldHandler.$name]||e.$fieldHandler,t&&(e.$fieldHandler.$$reset(),e.$fieldHandler.$validate()),e._render()})}}]),i}();fe.displayName="React.Formutil.Field";var de=E(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.forwardRef(function(t,i){var o=Object.assign({},t),a=(t.component,$(t,["component"]));return["$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$defaultValue","$defaultState","$onFieldChange","$parser","$formatter","$ref","name"].concat(Object.keys(u({},n.$validators,n.$asyncValidators,o.$validators,o.$asyncValidators))).forEach(function(e){e in o&&("$validators"!==e&&"$asyncValidators"!==e&&"$defaultState"!==e||(a[e]=u({},n[e],o[e])),delete o[e])}),r.createElement(fe,Object.assign({},n,a,{render:function(t){return r.createElement(e,Object.assign({},o,{$fieldutil:t,ref:i}))}}))});return i.displayName="React.Formutil.withField."+(e.displayName||e.name||"Anonymous"),ie(i,e)}),pe=function(e){function i(){return n(this,i),d(this,l(i).apply(this,arguments))}return s(i,t.Component),o(i,[{key:"render",value:function(){var e=this,t=this.props,n=(t.$fieldutil,t.value),i=t.onChange,o=t.onFocus,a=t.onBlur,u=t.checked,s=t.unchecked,l=$(t,["$fieldutil","value","onChange","onFocus","onBlur","checked","unchecked"]),c=this.props.type,f={value:"compositionValue"in this?this.compositionValue:n,onCompositionEnd:function(t){e.composition=!1,delete e.compositionValue,f.onChange(t)},onCompositionStart:function(){return e.composition=!0},onChange:function(t){var r=t.target.value;e.composition?(e.compositionValue=r,e.forceUpdate()):i(r,t)},onFocus:o,onBlur:a},d="input";switch(c){case"select":d=c,f.onChange=function(e){var t=e.target,r=t.multiple?[].slice.call(t.options).filter(function(e){return e.selected}).map(function(e){return e.value}):t.value;i(r,e)},delete l.type;break;case"textarea":d=c,delete l.type;break;case"checkbox":case"radio":f={checked:n===u,onChange:function(e){i(e.target.checked?u:s,e)},onFocus:o,onBlur:a}}return r.createElement(d,Object.assign({},l,f))}}]),i}();pe.displayName="React.Formutil.EasyField.Native",pe.defaultProps={value:"",type:"text",checked:!0,unchecked:!1};var he=t.createContext({}),me=he.Provider,ve=he.Consumer,ge=function(e){function i(){return n(this,i),d(this,l(i).apply(this,arguments))}return s(i,t.Component),o(i,[{key:"getGroupContext",value:function(){return this.props}},{key:"_render",value:function(){var e=this.props,n=e.className,i=e.groupNode,o=e.children,a={GroupOption:ye,Field:be},u=C(o)?o(a):t.Children.map(o,function(e){return t.cloneElement(e,a)});return null===i?u:r.createElement(i,{className:n},u)}},{key:"render",value:function(){return r.createElement(me,{value:this.getGroupContext()},this._render())}}]),i}();ge.displayName="React.Formutil.EasyField.Group",ge.defaultProps={type:"checkbox",groupNode:"div"};var ye=function(e){function i(){return n(this,i),d(this,l(i).apply(this,arguments))}return s(i,t.Component),o(i,[{key:"componentDidMount",value:function(){v("$value"in this.props,"You should pass a $value to <GroupOption />.")}},{key:"render",value:function(){var e=this.props,t=e.$value,n=e.onChange,i=e.onFocus,o=e.onBlur,a=$(e,["$value","onChange","onFocus","onBlur"]);return r.createElement(ve,null,function(e){var u=e.type,s=e.name,l="radio"===u?{checked:e.value===t,onChange:function(r){e.onChange(t,r),n&&n(r)}}:"checkbox"===u?{checked:e.value.indexOf(t)>-1,onChange:function(r){e.onChange(r.target.checked?e.value.concat(t):e.value.filter(function(e){return e!==t}),r),n&&n(r)}}:{value:e.value,onChange:function(t){e.onChange(t),n&&n(t)}};return r.createElement("input",Object.assign({name:s},a,l,{type:u,onFocus:function(t){e.onFocus(t),i&&i(t)},onBlur:function(t){e.onBlur(t),o&&o(t)}}))})}}]),i}();ye.displayName="React.Formutil.EasyField.Group.Option";var be=function(e){function i(){return n(this,i),d(this,l(i).apply(this,arguments))}return s(i,t.Component),o(i,[{key:"componentDidMount",value:function(){v(!1,'The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.')}},{key:"render",value:function(){return r.createElement(ye,this.props)}}]),i}();be.displayName="React.Formutil.EasyField.Group.Option.Deprecated";var we=Array.isArray,Ce=Object.keys,Fe=Object.prototype.hasOwnProperty,Ve="undefined"!==typeof Element;var Pe=function(e,t){try{return function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){var n,i,o,a=we(t),u=we(r);if(a&&u){if((i=t.length)!=r.length)return!1;for(n=i;0!==n--;)if(!e(t[n],r[n]))return!1;return!0}if(a!=u)return!1;var s=t instanceof Date,l=r instanceof Date;if(s!=l)return!1;if(s&&l)return t.getTime()==r.getTime();var c=t instanceof RegExp,$=r instanceof RegExp;if(c!=$)return!1;if(c&&$)return t.toString()==r.toString();var f=Ce(t);if((i=f.length)!==Ce(r).length)return!1;for(n=i;0!==n--;)if(!Fe.call(r,f[n]))return!1;if(Ve&&t instanceof Element&&r instanceof Element)return t===r;for(n=i;0!==n--;)if(("_owner"!==(o=f[n])||!t.$$typeof)&&!e(t[o],r[o]))return!1;return!0}return t!==t&&r!==r}(e,t)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}},Se=r.Frament||"div",Oe=function(e){function i(e){var t;return n(this,i),(t=d(this,l(i).call(this,e))).id=0,t.latestValue=t.props.value,t.$formutil=void 0,t.FieldValidators={required:function(e){return null!==e}},t.$onFormChange=function(e){e.$onValidates(function(e){var r=e.$invalid,n=e.$params;r?t.props.value.length&&t.props.onChange(t.latestValue=[]):Pe(t.props.value,n.list)||t.props.onChange(t.latestValue=n.list)})},t.swap=function(e,r,n){return t.$setState(function(t){var n=t.items,i=[n[e],n[r]];return n[r]=i[0],n[e]=i[1],n},n)},t.insert=function(){for(var e,r,n,i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return o.forEach(function(t){C(t)?n=t:"number"===typeof t?e=t:"object"===typeof t&&(r=t)}),t.$setState(function(n){var i=n.items;return w(e)?i.push(t.getId(r)):i.splice(e,0,t.getId(r)),{items:i}},n)},t.remove=function(){for(var e,r,n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return i.forEach(function(t){C(t)?r=t:"number"===typeof t&&(e=t)}),t.$setState(function(r){var n=r.items;return w(e)?n.pop():n.splice(e,1),n.length||(n=[t.getId()]),{items:n}},r)},t.$setState=function(e,r){return new Promise(function(n){return t.setState(e,function(){return t.$formutil.$onValidates(function(e){return n(O(r,e))})})})},t.state={items:e.value.length?e.value.map(function(){return t.getId()}):[t.getId()],formKey:0},t}return s(i,t.Component),o(i,[{key:"componentDidUpdate",value:function(e){var t=this;this.props.value!==this.latestValue&&(this.setState({items:this.props.value.length?this.props.value.map(function(){return t.getId()}):[this.getId()],formKey:this.state.formKey+1}),this.latestValue=this.props.value)}},{key:"getId",value:function(e){return{id:this.id++,values:e}}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,i=t.onFocus,o=t.onBlur,a=t.value;if(!C(n))return null;var s={$length:this.state.items.length,$insert:this.insert,$remove:this.remove,$swap:this.swap,$push:function(t,r){return e.insert(t,r)},$pop:function(t){return e.remove(t)},$shift:function(t){return e.remove(0,t)},$unshift:function(t,r){return e.insert(0,t,r)},onFocus:i,onBlur:o};return r.createElement(L,{key:this.state.formKey,$defaultValues:{list:a},$onFormChange:this.$onFormChange,children:function(t){return e.$formutil=t,r.createElement(Se,null,e.state.items.map(function(i,o){var a=i.id,l=i.values;return r.createElement(fe,{key:a,required:!0,$defaultValue:l||null,$validators:e.FieldValidators,name:"list[".concat(o,"]"),children:function(i){return r.createElement(L,{$defaultValues:i.$value||{},$onFormChange:function(e){return e.$onValidates(function(e){var t=e.$invalid,r=e.$params;t?null!==i.$viewValue&&i.$render(null):Pe(i.$viewValue,r)||i.$render(r)})},children:function(r){return n(u({},s,r,{$index:o,$isLast:function(){return o===e.state.items.length-1},$isFirst:function(){return 0===o}}),t)}})}})}))}})}}]),i}();Oe.displayName="React.Formutil.EasyField.List";var Ee="__TYPE__",ke=[["required",function(e,t,r){var n=r.__TYPE__,i=r.checked;return"checked"===n?e===(void 0===i||i):!F(e)}],["maxLength",function(e,t){return F(e)||e.length<=t}],["minLength",function(e,t){return F(e)||e.length>=t}],["max",function(e,t){return F(e)||1*e<=t}],["min",function(e,t){return F(e)||1*e>=t}],["pattern",function(e,t){return F(e)||t.test(e)}],["enum",function(e,t){return F(e)||t.indexOf(e)>-1}],["checker",function(e,t,r){return t(e,r)}]].reduce(function(e,t){var r=p(t,2),n=r[0],i=r[1];return e[n]=function(e,t,r){var o=r.validMessage,a=void 0===o?{}:o;return i.apply(void 0,arguments)||a[n]||"Error input: ".concat(n)},e},{}),je={validMessage:{},valuePropName:"value",changePropName:"onChange",focusPropName:"onFocus",blurPropName:"onBlur",$parser:function(e){return"string"===typeof e?e.trim():e}};function xe(e,t,r){var n,i=t.valuePropName,o=t.changePropName,s=t.focusPropName,l=t.blurPropName,c=t.passUtil,$=u({},r,(a(n={},i,e.$viewValue),a(n,o,function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];var u=n[0],s=n[n.length-1];s=s&&s.target?[s]:n;var l=t[o];l&&l.apply(void 0,h(s));var c=function(e){return e&&e.target?e.target[i]:e}(u);e.$render(c)}),a(n,s,function(){var r=t[s];r&&r.apply(void 0,arguments),e.$setFocused(!0)}),a(n,l,function(){var r=t[l];r&&r.apply(void 0,arguments),e.$untouched&&e.$setTouched(!0),e.$setFocused(!1)}),n));return c&&($[!0===c?"$fieldutil":c]=e),$}function De(e){var t=e.children,r=e.component,n=e.render,i=$(e,["children","component","render"]),o=i.name,a=i.type,s=i.defaultValue,l=(i.valuePropName,i.changePropName,i.focusPropName,i.blurPropName,i.validMessage,i.__TYPE__,i.passUtil,i.$defaultValue,i.$defaultState,i.$onFieldChange,i.$validators,i.$asyncValidators,i.$validateLazy,i.$reserveOnUnmount,i.$parser,i.$formatter,i.$ref,$(i,["name","type","defaultValue","valuePropName","changePropName","focusPropName","blurPropName","validMessage","__TYPE__","passUtil","$defaultValue","$defaultState","$onFieldChange","$validators","$asyncValidators","$validateLazy","$reserveOnUnmount","$parser","$formatter","$ref"])),c={children:t,component:r,render:n},f=!w(a)||w(t)&&w(r)&&w(n);if(Object.keys(u({},i.$validators=u({},ke,i.$validators),i.$asyncValidators)).forEach(function(e){e in l&&(f&&function(e){return k.indexOf(e.toLowerCase())>-1}(e)||delete l[e])}),f){var d=p((a||"").split("."),2),h=d[0],m=void 0===h?"text":h,v=d[1];switch(c.component="group"===m?ge:"list"===m?Oe:pe,o&&(l.name=o),a&&(l.type=m),t&&(l.children=t),m){case"select":case"textarea":e.multiple&&(i[Ee]="array");break;case"group":"checkbox"===v&&(i[Ee]="array"),l.type=v;break;case"checkbox":case"radio":i[Ee]="checked";break;case"list":i[Ee]="array"}}if(!("$defaultValue"in i)&&"defaultValue"in e&&(i.$defaultValue=s),!("$defaultValue"in i)&&Ee in i){var g;switch(i[Ee]){case"checked":var y=i.unchecked;g=void 0!==y&&y;break;case"array":g=[];break;case"object":g={};break;case"number":g=0}i.$defaultValue=g}return{fieldProps:i,childProps:l,renderProps:c}}var _e=function(e){function i(){return n(this,i),d(this,l(i).apply(this,arguments))}return s(i,t.Component),o(i,[{key:"render",value:function(){var e=De(this.props),n=e.fieldProps,i=e.childProps,o=e.renderProps;return r.createElement(fe,Object.assign({},n,{children:function(e){return function(e,r){var n=r.component,i=r.render,o=r.children;return n?t.createElement(n,e):C(i)?i(e):C(o)?o(e):t.Children.map(o,function(r){return t.cloneElement(r,e)})}(xe(e,n,i),o)}}))}}]),i}();function Te(){if(!r.useState)throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");return(0,r.useContext)(m)}function Ae(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!r.useState)throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.");var n,i=r.useState,o=r.useLayoutEffect,a=r.useRef;e&&("string"===typeof e?(n=e,t.name=n):n=(t=e).name);var s,l=Te(),c=a({}).current,$=a([]);c.$formContext=l,c.props=t,c.$setState=function(e,t){return new Promise(function(r){var i=function(){return r(O(t,c.$fieldutil))};c.isMounting?n in(l.$$registers||{})?l.$$onChange(n,e,i):(f(s.$$merge(e)),s.$$detectChange(e),$.current.push(i)):(s.$$merge(e),i())})};var f=p(i(function(){c.$$FIELD_UUID=ce(),c.$fieldHandler=s=$e(c);var e=c.$fieldHandler.$$reset();return c.$fieldHandler.$validate(),e}),2)[1];return s||(s=(l.$$registers||{})[c.$fieldHandler.$name]||c.$fieldHandler),o(function(){var e=c.$state;if(c.isMounting&&!(n in(l.$$registers||{}))){var t=c.$prevValue;s.$$triggerChange({$newValue:e.$value,$prevValue:t})}c.$prevValue=e.$value},[c.$state.$value]),o(function(){return c.isMounting=!0,v(!n||l.$formutil,"You should enusre that the useField() with the name '".concat(n,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated.")),v(n,"You should pass a name argument to useField(), otherwise it will be isolated!"),function(){c.isMounting=!1,D(t.$ref,null)}},[]),o(function(){return l.$$register&&l.$$register(n,c.$fieldHandler),function(){l.$$unregister&&l.$$unregister(n,c.$fieldHandler,!c.isMounting&&t.$reserveOnUnmount)}},[n]),o(function(){D(t.$ref,c.$fieldutil)}),o(function(){if($.current.length>0){var e=h($.current);for($.current.length=0;e.length;)e.pop()(c.$fieldutil)}}),c.$fieldutil=u({$name:n},s.$getState(),s,{$$formutil:l.$formutil})}_e.displayName="React.Formutil.EasyField",_e.defaultProps=je,e.EasyField=_e,e.Field=fe,e.Form=L,e.connect=function(e){var n=t.forwardRef(function(t,n){return r.createElement(m.Consumer,null,function(i){return r.createElement(e,Object.assign({},t,{$formutil:i.$formutil,ref:n}))})});return n.displayName="React.Formutil.connect."+(e.displayName||e.name||"Anonymous"),ie(n,e)},e.useField=Ae,e.useForm=function(){return Te().$formutil},e.useHandler=function(e){var t=De(e=u({},je,e,{children:null})),r=t.fieldProps,n=t.childProps;return xe(Ae(r),r,n)},e.withField=de,e.withForm=oe,Object.defineProperty(e,"__esModule",{value:!0})});
