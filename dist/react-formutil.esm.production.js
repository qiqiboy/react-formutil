import e from"@babel/runtime/helpers/esm/defineProperty";import t from"@babel/runtime/helpers/esm/objectSpread2";import r from"@babel/runtime/helpers/esm/toConsumableArray";import n from"@babel/runtime/helpers/esm/slicedToArray";import a from"@babel/runtime/helpers/esm/classCallCheck";import i from"@babel/runtime/helpers/esm/createClass";import u from"@babel/runtime/helpers/esm/possibleConstructorReturn";import o from"@babel/runtime/helpers/esm/getPrototypeOf";import s from"@babel/runtime/helpers/esm/assertThisInitialized";import l from"@babel/runtime/helpers/esm/inherits";import $,{createContext as f,createElement as c,Children as d,cloneElement as v,Component as h,forwardRef as p}from"react";import{isValidElementType as m}from"react-is";import g from"warning";import y from"@babel/runtime/helpers/esm/objectWithoutProperties";import b from"hoist-non-react-statics";import F from"react-fast-compare";var V=f(function(){return{}});var w=Object.getPrototypeOf({});var k=/\s*(?:\]\s*\.|\]\s*\[|\.|\[|\])\s*/g;var C=P(window)?global:window;function P(e){return typeof e==="undefined"}function S(e){return typeof e==="function"}function E(e){return P(e)||e===null||e+""===""}function O(e){return!!e&&S(e.then)}function _(e){return Object.prototype.toString.call(e)==="[object Object]"}function j(e){if(!_(e))return false;if(null===Object.getPrototypeOf(e))return true;if(!S(e.constructor))return false;return e.constructor.prototype===w}function D(e){return m(e)&&typeof e!=="string"}function A(e){if(Array.isArray(e)){var t=[];for(var r=0,n=e.length;r<n;r++){t[r]=A(e[r])}return t}else if(j(e)){var a={};for(var i in e){if(e.hasOwnProperty(i))a[i]=A(e[i])}return a}return e}var x=function e(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),a=1;a<r;a++){n[a-1]=arguments[a]}if(S(t)){t.apply(void 0,n)}return n[0]};function N(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++){r[n]=arguments[n]}if(D(r[0])){return e.apply(void 0,r)}return function(t){return e(t,r[0])}}}var U=["minlength","maxlength","max","min","required","pattern","step"];function R(e){return U.indexOf(e.toLowerCase())>-1}var T=function e(t){try{var r=new Function("origin","global","return typeof ".concat(t," === 'number' || (typeof ").concat(t," !== 'undefined' && !(origin in global)) ? ").concat(t," : origin"));return r(t,C)}catch(e){return t}};function I(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++){t[r]=arguments[r]}var n=t[0],a=t[1],i=t[2];g(typeof a==="string","The second parameter(".concat(JSON.stringify(a),") of parsePath() must be a string."));var u=(a.match(k)||[]).map(function(e){return e.replace(/\s/g,"")});var o=a.split(k).map(function(e){return e.trim()}).filter(function(e){return e!==""});var s=n;try{if(t.length<3){for(var l=0,$=o.length;l<$;l++){var f=T(o[l]);if(l+1===$){return s[f]}if(P(s[f])){break}s=s[f]}}else{for(var c=0,d=o.length;c<d;c++){var v=T(o[c]);var h=o[c+1];var p=u[c];if(P(h)){s[v]=i;break}switch(p){case"].":case".":s=P(s[v])?s[v]={}:s[v];break;case"][":case"[":var m=T(h);s=P(s[v])?s[v]=typeof m==="number"&&m>=0?[]:{}:s[v];break;default:s[v]=i;break}}}}catch(e){g(false,"The name '%s' of Field seems is not a legal expression.",a)}if(t.length>2){return n}}function H(e,t){var r=t.split(k).map(function(e){return e.trim()}).filter(function(e){return e!==""});for(var n=0,a=r.length;n<a;n++){var i=T(r[n]);if(!(i in e)){break}if(n+1===a){return{data:e[i]}}e=e[i]}}function M(e,t){if(e){if(S(e)){e(t)}else if("current"in e){e.current=t}}}var L=function e(t,r){for(var n=0,a=t.length;n<a;n++){if(r(t[n])===true){return t[n]}}};var B=function e(t,r){return Object.keys(t).reduce(function(e,n){e[n]=r(t[n],n,t);return e},{})};var Y=function e(t,r){return Object.keys(t).forEach(function(e){return r(t[e],e,t)})};var Q=undefined;function z(e,t,r){Y(e,function(t,r){if(t===Q){delete e[r]}else if(j(t)||Array.isArray(t)){z(t,r,e)}});if(r&&Object.keys(e).every(function(t){return e[t]===Q})){r[t]=Q;z(r)}}var G=function e(t,r){if(!P(I(t,r))){I(t,r,Q);z(t)}};function q(e,t){if(e===t){return true}var r=Object.keys(e);if(r.length!==Object.keys(t).length){return false}for(var n=0;n<r.length;n++){if(e[r[n]]!==t[r[n]]){return false}}return true}var K="FORM_VALIDATE_RESULT";var W,J;if(typeof requestAnimationFrame==="function"){W=requestAnimationFrame;J=cancelAnimationFrame}else{W=setTimeout;J=clearTimeout}var X=function(f){l(h,f);function h(i){var l;a(this,h);l=u(this,o(h).call(this,i));l.$$formPending=void 0;l.$$formValidatePromise=void 0;l.$$registers={};l.$$deepRegisters={};l.getFormContext=function(){return{$$registers:l.$$registers,$$register:l.$$register,$$unregister:l.$$unregister,$$onChange:l.$$onChange,$$getDefault:l.$$getDefault,$formutil:l.$formutil}};l.$$regDuplications={};l.$$duplicateTimer=void 0;l.$$checkDuplication=function(){var e=s(l),t=e.$$regDuplications;var r;Y(t,function(e,a){var i=n(e,2),u=i[0],o=i[1];g(u.$$reserved,"The Field with a name '".concat(a,"' has been registered!"));o.$$reset(u.$getState());r=delete t[a]});if(r){l.$render()}};l.$$register=function(e,t,r){l.$$unregister(r,t);if(e){var n=l.$$getRegister(e);if(n){J(l.$$duplicateTimer);l.$$regDuplications[e]=[n,t];l.$$duplicateTimer=W(l.$$checkDuplication)}else{l.$$fieldChangedQueue.push({name:e,$newValue:t.$getState().$value});G(l.$$defaultValues,e)}l.$$registers[t.$name=e]=t;l.$$formShouldUpdateFields[e]=true;l.createDeepRegisters();l.$render()}};l.$$unregister=function(e,t,r){if(e){if(e in l.$$regDuplications){var a=n(l.$$regDuplications[e],2),i=a[0],u=a[1];l.$$fieldChangedQueue.push({name:e,$newValue:u.$getState().$value,$prevValue:i.$getState().$value});delete l.$$regDuplications[e]}else if(l.$$registers[e]===t){if(r){t.$$reserved=true}else{delete l.$$registers[e];l.$$fieldChangedQueue.push({name:e,$prevValue:t.$getState().$value});G(l.$$defaultValues,e)}}l.$$formShouldUpdateAll=true;l.createDeepRegisters();l.$render()}};l.$$defaultInitialize=function(){var e=l.props,t=e.$defaultValues,r=e.$defaultStates;l.$$defaultValues=l.$$deepParseObject(A(S(t)?t(l.props)||{}:t));l.$$defaultStates=l.$$deepParseObject(A(S(r)?r(l.props)||{}:r))};l.$$getDefault=function(){return{$$defaultStates:l.$$defaultStates,$$defaultValues:l.$$defaultValues}};l.$$formShouldUpdateFields={};l.$$formShouldUpdateAll=false;l.$$triggerChangeTimer=void 0;l.$$fieldChangedQueue=[];l.$$triggerFormChange=function(){if(l.$$fieldChangedQueue.length){var e=r(l.$$fieldChangedQueue);l.$$fieldChangedQueue.length=0;var t={};var n={};var a=l.$$registers;var i=false;e.forEach(function(e){if(!(e.name in a)){delete e.$newValue}if(e.$newValue!==e.$prevValue){if("$newValue"in e&&"$prevValue"in e){var r=l.$$getRegister(e.name);if(r){r.$$triggerChange(e)}}"$newValue"in e&&I(t,e.name,e.$newValue);"$prevValue"in e&&I(n,e.name,e.$prevValue);i=true}});if(i){if(S(l.props.$validator)){l.$$formValidate()}if(S(l.props.$onFormChange)){l.props.$onFormChange(l.$formutil,t,n)}}}};l.createDeepRegisters=function(){return l.$$deepRegisters=l.$$deepParseObject(l.$$registers)};l.$$getRegister=function(e){if(e){var t=l.$$registers[e]||I(l.$$deepRegisters,e);if(t){return t}}};l.$$formValidate=function(e){return l.$$formValidatePromise=new Promise(function(t){var r=l.props.$validator;var n;var a;var i;var u;var o=r(l.$formutil.$params,l.formtutil);var s=function r(n){return t(x(e,x(i,n)))};if(O(o)){if(!l.$$formPending){l.$$formPending=true;l.$render()}a=function e(t){return n=t(s)};u=o.then(function(){return void 0},function(e){return e}).then(function(e){if(n){return n}l.$shouldCancelPrevAsyncValidate=null;l.$$formPending=false;return l.$$setFormErrors(e,s)})}else{if(l.$$formPending){l.$$formPending=false}u=l.$$setFormErrors(o,s)}if(l.$shouldCancelPrevAsyncValidate){l.$shouldCancelPrevAsyncValidate(function(e){i=e;return u})}l.$shouldCancelPrevAsyncValidate=a})};l.$$setFormErrors=function(r,n){if(r&&(r instanceof Error||typeof r!=="object")){g(false,"The result of $validator in <Form /> should always return None(null,undefined) or an object contains error message of Field.");return l.$render(n)}return l.$$setStates(r||{},function(r,n){var a=n.$getState(),i=a.$error,u=i===void 0?{}:i;if(r){return{$error:t({},u,e({},K,r))}}if(u[K]){delete u[K];return{$error:u}}return},n,true)};l.$getField=function(e){var t=l.$$getRegister(e);g(!e||t,"$getField('".concat(e,"') fail to find the matched Field. Maybe it has been unmounted."));g(e,"You should pass a name of the mounted Field to $getField().");if(t){return t.$new()}};l.$$onChange=function(t,r,n){return l.$setStates(e({},t,r),n)};l.$$setStates=function(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var t=arguments.length>1?arguments[1]:undefined;var r=arguments.length>2?arguments[2]:undefined;var n=arguments.length>3?arguments[3]:undefined;var a=l.$$deepParseObject(e);Y(l.$$registers,function(e,r){var i;if(n||(i=H(a,r))){var u=t(i&&i.data,e);if(u){var o=l.$formutil.$weakParams[r];var s=e.$$merge(u),$=s.$value;e.$$detectChange(u);if("$value"in u||"$viewValue"in u){var f=L(l.$$fieldChangedQueue,function(e){return e.name===r});if(f){if(!("$prevValue"in f)){f.$prevValue=f.$newValue}f.$newValue=$}else{l.$$fieldChangedQueue.push({name:r,$newValue:$,$prevValue:o})}}l.$$formShouldUpdateFields[r]=true}}});return l.$render(r)};l.$render=function(e){return new Promise(function(t){return l.forceUpdate(function(){return t(x(e,l.$formutil))})})};l.$validates=function(){var e;for(var t=arguments.length,r=new Array(t),n=0;n<t;n++){r[n]=arguments[n]}if(S(r[r.length-1])){e=r.pop()}if(r.length){var a=function e(t){t.forEach(function(t){if(Array.isArray(t)){e(t)}else{var r=l.$getField(t);if(r){r.$validate()}}})};a(r)}else{Y(l.$$registers,function(e){return e.$validate()});if(S(l.props.$validator)){l.$$formValidate()}}return l.$onValidates(e)};l.$onValidates=function(e){var t=Object.keys(l.$$registers).map(function(e){return l.$$registers[e].$onValidate()});t.push(l.$$formValidatePromise);return Promise.all(t).then(function(){return x(e,l.$formutil)})};l.$validate=function(e,t){var r=l.$getField(e);if(r){return r.$validate(t)}return x(t)};l.$reset=function(e,t){l.$$defaultInitialize();if(S(e)){t=e;e={}}return l.$$setStates(e,function(e,t){return t.$$reset(e)},t,true)};l.$setStates=function(e,t){return l.$$setStates(e,function(e){return e},t)};l.$setValues=function(e,t){l.$$deepParseObject(A(e),l.$$defaultValues);z(l.$$defaultValues);return l.$$setStates(e,function(e){return{$value:e}},t)};l.$setFocuses=function(e,t){return l.$$setStates(e,function(e){return{$focused:e}},t)};l.$setDirts=function(e,t){return l.$$setStates(e,function(e){return{$dirty:e}},t)};l.$setTouches=function(e,t){return l.$$setStates(e,function(e){return{$touched:e}},t)};l.$setPendings=function(e,t){return l.$$setStates(e,function(e){return{$pending:e}},t)};l.$setErrors=function(e,t){return l.$$setStates(e,function(e){return{$error:e}},t)};l.$batchState=function(e,t){return l.$setStates(B(l.$$registers,function(){return e}),t)};l.$batchDirty=function(e,t){return l.$batchState({$dirty:e},t)};l.$batchTouched=function(e,t){return l.$batchState({$touched:e},t)};l.$batchFocused=function(e,t){return l.$batchState({$focused:e},t)};l.$batchPending=function(e,t){return l.$batchState({$pending:e},t)};l.$batchError=function(e,t){return l.$batchState({$error:e},t)};l.$new=function(){return l.$formutil};l.$$defaultInitialize();return l}i(h,[{key:"$$deepParseObject",value:function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};Y(t,function(e,t){return I(r,t,e)});return r}},{key:"$$resetFormUpdateFields",value:function e(){this.$$formShouldUpdateFields={};this.$$formShouldUpdateAll=false}},{key:"componentDidMount",value:function e(){M(this.props.$ref,this.$formutil)}},{key:"componentDidUpdate",value:function e(t){var r=this;M(this.props.$ref,this.$formutil);J(this.$$triggerChangeTimer);this.$$triggerChangeTimer=W(function(){r.$$triggerFormChange()})}},{key:"componentWillUnmount",value:function e(){M(this.props.$ref,null)}},{key:"_render",value:function e(){var t=this.$formutil;var r=this.props,n=r.children,a=r.render,i=r.component;if(i){return c(i,{$formutil:t})}if(S(a)){return a(t)}if(S(n)){return n(t)}return d.map(n,function(e){return e&&D(e.type)?v(e,{$formutil:t}):e})}},{key:"render",value:function e(){var r=this;var n=this.props.$processer;var a=Object.keys(this.$$registers).map(function(e){return{path:e,$state:r.$$registers[e].$getState()}});var i=this.$$formShouldUpdateAll;var u=this.$formutil||{};var o=a.some(function(e){var t=e.$state;return t.$invalid});var s=a.some(function(e){var t=e.$state;return t.$dirty});var l=a.some(function(e){var t=e.$state;return t.$touched});var f=a.some(function(e){var t=e.$state;return t.$focused});var c=this.$$formPending||a.some(function(e){var t=e.$state;return t.$pending});var d=i?{}:t({},u.$pureParams);var v=i?{}:t({},u.$states);var h=i?{}:t({},u.$errors);var p=i?{}:t({},u.$dirts);var m=i?{}:t({},u.$touches);var g=i?{}:t({},u.$focuses);var y=i?{}:t({},u.$pendings);var b=i?{}:t({},u.$weakStates);var F=i?{}:t({},u.$weakParams);var w=i?{}:t({},u.$weakErrors);var k=i?{}:t({},u.$weakDirts);var C=i?{}:t({},u.$weakFocuses);var S=i?{}:t({},u.$weakTouches);var E=i?{}:t({},u.$weakPendings);for(var O=0,_=a.length;O<_;O++){var j=a[O],D=j.$state,A=j.path;if(!i){if(!this.$$formShouldUpdateFields[A]){continue}}if(n){n(D,A)}if("$value"in D&&(!(A in F)||F[A]!==D.$value)&&(D.$dirty||!P(D.$value))){F[A]=D.$value;I(d,A,D.$value)}I(v,A,D);b[A]=D;if(w[A]!==D.$error){if(D.$invalid){I(h,A,D.$error);w[A]=D.$error}else if(A in w){G(h,A);delete w[A]}}if(k[A]!==D.$dirty){I(p,A,D.$dirty);k[A]=D.$dirty}if(S[A]!==D.$touched){I(m,A,D.$touched);S[A]=D.$touched}if(C[A]!==D.$focused){I(g,A,D.$focused);C[A]=D.$focused}if(E[A]!==D.$pending){I(y,A,D.$pending);E[A]=D.$pending}}var x=this.$formutil={$$registers:t({},this.$$registers),$$deepRegisters:this.$$deepRegisters,$states:v,$pureParams:d,$params:t({},this.$$defaultValues,{},d),$errors:h,$dirts:p,$touches:m,$focuses:g,$pendings:y,$weakStates:b,$weakParams:F,$weakErrors:w,$weakDirts:k,$weakTouches:S,$weakFocuses:C,$weakPendings:E,$getFirstError:function e(t){if(t){var r=x.$getField(t);return r&&r.$getFirstError()}for(var n in x.$weakErrors){if(x.$weakErrors.hasOwnProperty(n)){var a=x.$weakErrors[n];for(var i in a){if(a.hasOwnProperty(i)){return a[i]instanceof Error?a[i].message:a[i]}}}}},$render:this.$render,$getField:this.$getField,$onValidates:this.$onValidates,$new:this.$new,$setStates:this.$setStates,$setValues:this.$setValues,$setErrors:this.$setErrors,$setTouches:this.$setTouches,$setDirts:this.$setDirts,$setFocuses:this.$setFocuses,$batchState:this.$batchState,$batchTouched:this.$batchTouched,$batchDirty:this.$batchDirty,$batchFocused:this.$batchFocused,$reset:this.$reset,$validates:this.$validates,$validate:this.$validate,$valid:!o,$invalid:o,$dirty:s,$pristine:!s,$touched:l,$untouched:!l,$focused:f,$pending:c};this.$$resetFormUpdateFields();return $.createElement(V.Provider,{value:this.getFormContext},this._render())}}]);return h}(h);X.displayName="React.Formutil.Form";X.defaultProps={$defaultValues:{},$defaultStates:{}};var Z=["render","component","children","$defaultValues","$defaultStates","$onFormChange","$validator","$processer","$ref"];function ee(e){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var n=function(n){l(s,n);function s(){var t;var r;a(this,s);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++){i[l]=arguments[l]}r=u(this,(t=o(s)).call.apply(t,[this].concat(i)));r.renderChildren=function(t){return $.createElement(e,Object.assign({},r.othersProps,{$formutil:t,ref:r.props.__forwardRef__}))};return r}i(s,[{key:"render",value:function e(){var n=Object.assign({},this.props);var a=this.props,i=a.component,u=y(a,["component"]);Z.forEach(function(e){if(e in n){if(e==="$defaultStates"||e==="$defaultValues"){u[e]=t({},r[e],{},n[e])}delete n[e]}});this.othersProps=n;return $.createElement(X,Object.assign({},r,u,{render:this.renderChildren}))}}]);return s}(h);n.displayName="React.Formutil.withForm."+(e.displayName||e.name||"Anonymous");var s=p(function(e,t){return $.createElement(n,Object.assign({__forwardRef__:t},e))});s.displayName="React.Formutil.withForm.ForwardRef."+(e.displayName||e.name||"Anonymous");return b(s,e)}var te=N(ee);var re=0;var ne={$valid:true,$invalid:false,$dirty:false,$pristine:true,$touched:false,$untouched:true,$focused:false,$pending:false,$error:{}};function ae(e){return e!==true}function ie(e,t,r){g(!P(e),"You should return a string or Error when the validation('".concat(r&&r+": ").concat(t,"') failed, otherwise return true."))}var ue="React.Formutil.Field";function oe(){return re++}function se(e,t){var r=t.children,n=t.render,a=t.component;if(a){return c(a,{$fieldutil:e})}if(S(n)){return n(e)}if(S(r)){return r(e)}return d.map(r,function(t){return t&&D(t.type)?v(t,{$fieldutil:e}):t})}function le(e,r){var n={$$FIELD_UUID:e.$$FIELD_UUID,$$reset:s,$$merge:b,$$detectChange:i,$$triggerChange:u,$onValidate:o,$new:function t(){return e.$fieldutil},$picker:l,$getState:l,$getComponent:function e(){return r},$reset:function t(r,n){return e.$setState(s(r),n)},$getFirstError:y,$validate:$,$setState:e.$setState,$render:f,$setValue:c,$setTouched:d,$setDirty:v,$setFocused:h,$setValidity:m,$setError:p,$setPending:g};var a;function i(e){if("$value"in e||"$viewValue"in e){$()}}function u(t){var r=t.$newValue,n=t.$prevValue;var a=e.props.$onFieldChange;if(S(a)){a(r,n,e.$formContext.$formutil)}}function o(e){a.then(e);return a}function s(r){var n;var a=e.props,i=e.$formContext;if(i.$$getDefault){var u=a.name;var o=i.$$getDefault(),s=o.$$defaultStates,l=o.$$defaultValues;if(u&&l){var $=I(l,u);n=I(s,u)||{};if(!P($)){n.$value=$}}}var f=a.$defaultValue,c=a.$defaultState;return b(t({},ne,{},S(c)?c(a):c,{$value:S(f)?f(a):"$defaultValue"in a?f:""},n,{},r))}function l(){return t({},e.$state)}function $(r){return a=new Promise(function(n){var a=e.props,i=e.$formContext;var u=t({},a.$validators,{},a.$asyncValidators);var o=e.$state,s=o.$value,l=o.$pending,$=Object.assign({},o.$error);var f=i.$formutil;var c={};var d=false;var v;var h;var y;var b;delete $[K];var F=Object.keys(u).reduce(function(r,n){delete $[n];if(!d&&a[n]!=null){var i=u[n](s,a[n],t({},a,{$formutil:f,$fieldutil:e.$fieldutil,$validError:c}));if(O(i)){r.push(i["catch"](function(e){if(!v){m(n,e||n)}}))}else if(ae(i)){c[n]=i||n;ie(i,n,a.name);if(a.$validateLazy){d=true}}}return r},[]);var V=function e(t){return n(x(r,x(y,t)))};if(F.length){if(!l){g(true)}h=function e(t){return v=t(V)};F.push(p(t({},$,{},c)));b=Promise.all(F).then(function(){if(v){return v}e.$shouldCancelPrevAsyncValidate=null;return g(false,V)})}else{if(l){g(false)}b=p(t({},$,{},c),V)}if(e.$shouldCancelPrevAsyncValidate){e.$shouldCancelPrevAsyncValidate(function(e){y=e;return b})}e.$shouldCancelPrevAsyncValidate=h})}function f(t,r){return e.$setState({$viewValue:t,$dirty:true},r)}function c(t,r){return e.$setState({$value:t},r)}function d(t,r){return e.$setState({$touched:t},r)}function v(t,r){return e.$setState({$dirty:t},r)}function h(t,r){return e.$setState({$focused:t},r)}function p(t,r){return e.$setState({$error:t},r)}function m(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var n=arguments.length>2?arguments[2]:undefined;var a=Object.assign({},e.$state.$error);if(ae(r)){a[t]=r||t;ie(r,t,e.props.name)}else{delete a[t]}return p(a,n)}function g(t,r){return e.$setState({$pending:t},r)}function y(){var t=e.$state.$error,r=t===void 0?{}:t;for(var n in r){if(r.hasOwnProperty(n)){return r[n]instanceof Error?r[n].message:r[n]}}}function b(r){var n=Object.assign({},r);if("$error"in n){if(!n.$error){n.$error={}}n.$valid=Object.keys(n.$error).length===0}var a=e.props,i=a.$parser,u=a.$formatter;if("$viewValue"in n&&!("$value"in n)){var o=function e(t){return n.$viewValue=t};n.$value=i?i(n.$viewValue,o):n.$viewValue}else if("$value"in n&&!("$viewValue"in n)){var s=function e(t){return n.$value=t};n.$viewValue=u?u(n.$value,s):n.$value}if("$valid"in n){n.$invalid=!n.$valid}else if("$invalid"in n){n.$dirty=!n.$invalid}if("$dirty"in n){n.$pristine=!n.$dirty}else if("$pristine"in n){n.$dirty=!n.$pristine}if("$touched"in n){n.$untouched=!n.$touched}else if("$untouched"in n){n.$touched=!n.$untouched}e.$state=t({},e.$state,{},n);return l()}return n}var $e=function(e){l(r,e);function r(){var e;var t;a(this,r);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++){i[s]=arguments[s]}t=u(this,(e=o(r)).call.apply(e,[this].concat(i)));t.$$FIELD_UUID=oe();t.$formContext=void 0;t.$state=void 0;t.$setState=function(e,r){return new Promise(function(n){var a=function e(){return n(x(r,t.$fieldutil))};if(t.isMounting){var i=t.props.name;if(i in(t.$formContext.$$registers||{})){t.$formContext.$$onChange(i,e,a)}else{t.$registered.$$merge(e);t.$registered.$$detectChange(e);t.forceUpdate(a)}}else{t.$registered.$$merge(e);a()}})};return t}i(r,[{key:"componentDidMount",value:function e(){this.isMounting=true;var t=this.props.name,r=this.$formContext;g(!t||r.$formutil,"You should enusre that the <Field /> with the name '".concat(t,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));g(t,"You should assign a name to <Field />, otherwise it will be isolated!");if(r.$$register){r.$$register(t,this.$fieldHandler)}this.$prevState=this.$state;M(this.props.$ref,this.$fieldutil)}},{key:"componentWillUnmount",value:function e(){if(this.$formContext.$$unregister){this.$formContext.$$unregister(this.props.name,this.$fieldHandler,this.props.$reserveOnUnmount)}this.isMounting=false;M(this.props.$ref,null)}},{key:"componentDidUpdate",value:function e(t){var r=this.props.name;if(r!==t.name){if(this.$formContext.$$register){this.$formContext.$$register(r,this.$fieldHandler,t.name)}}M(this.props.$ref,this.$fieldutil);if(this.$state.$value!==this.$prevState.$value){if(!(r in(this.$formContext.$$registers||{}))){this.$registered.$$triggerChange({$newValue:this.$state.$value,$prevValue:this.$prevState.$value})}}this.$prevState=this.$state}},{key:"shouldComponentUpdate",value:function e(t){var r=t.$memo;return!r||!q(this.$registered.$getState(),this.$prevState)||!(Array.isArray(r)?F(r,this.props.$memo):F(this.props,t))}},{key:"_render",value:function e(){var r=this.$fieldutil=t({$name:this.props.name},this.$registered.$getState(),{},this.$registered,{$$formutil:this.$formContext.$formutil});return se(r,this.props)}},{key:"render",value:function e(){var t=this;return $.createElement(V.Consumer,null,function(e){var r=!t.$formContext;t.$formContext=e();if(!t.$fieldHandler){t.$fieldHandler=le(t,t)}t.$registered=(t.$formContext.$$registers||{})[t.$fieldHandler.$name]||t.$fieldHandler;if(r){t.$fieldHandler.$$reset();t.$fieldHandler.$validate()}return t._render()})}}]);return r}(h);$e.displayName=ue;var fe=["name","$defaultValue","$defaultState","$onFieldChange","$validators","$asyncValidators","$validateLazy","$memo","$reserveOnUnmount","$ref","$parser","$formatter","render","component","children"];function ce(e){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var n=function(n){l(s,n);function s(){var t;var r;a(this,s);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++){i[l]=arguments[l]}r=u(this,(t=o(s)).call.apply(t,[this].concat(i)));r.renderChildren=function(t){return $.createElement(e,Object.assign({},r.othersProps,{$fieldutil:t,ref:r.props.__forwardRef__}))};return r}i(s,[{key:"render",value:function e(){var n=Object.assign({},this.props);var a=this.props,i=a.component,u=y(a,["component"]);fe.concat(Object.keys(t({},r.$validators,{},r.$asyncValidators,{},n.$validators,{},n.$asyncValidators))).forEach(function(e){if(e in n){if(e==="$validators"||e==="$asyncValidators"||e==="$defaultState"){u[e]=t({},r[e],{},n[e])}delete n[e]}});this.othersProps=n;return $.createElement($e,Object.assign({},r,u,{render:this.renderChildren}))}}]);return s}(h);n.displayName="React.Formutil.withField."+(e.displayName||e.name||"Anonymous");var s=p(function(e,t){return $.createElement(n,Object.assign({__forwardRef__:t},e))});s.displayName="React.Formutil.withField.ForwardRef."+(e.displayName||e.name||"Anonymous");return b(s,e)}var de=N(ce);var ve=function(e){l(t,e);function t(){a(this,t);return u(this,o(t).apply(this,arguments))}i(t,[{key:"render",value:function e(){var t=this;var r=this.props,n=r.$fieldutil,a=r.value,i=r.onChange,u=r.onFocus,o=r.onBlur,s=r.checked,l=r.unchecked,f=y(r,["$fieldutil","value","onChange","onFocus","onBlur","checked","unchecked"]);var c=this.props.type;var d={value:"compositionValue"in this?this.compositionValue:a,onCompositionEnd:function e(r){t.composition=false;delete t.compositionValue;d.onChange(r)},onCompositionStart:function e(){return t.composition=true},onChange:function e(r){var n=r.target.value;if(t.composition){t.compositionValue=n;t.forceUpdate()}else{i(n,r)}},onFocus:u,onBlur:o};var v="input";switch(c){case"select":v=c;d.onChange=function(e){var t=e.target;var r=t.multiple?[].slice.call(t.options).filter(function(e){return e.selected}).map(function(e){return e.value}):t.value;i(r,e)};delete f.type;break;case"textarea":v=c;delete f.type;break;case"checkbox":case"radio":d={checked:a===s,onChange:function e(t){i(t.target.checked?s:l,t)},onFocus:u,onBlur:o};break}return $.createElement(v,Object.assign({},f,d))}}]);return t}(h);ve.displayName="React.Formutil.EasyField.Native";ve.defaultProps={value:"",type:"text",checked:true,unchecked:false};var he=f(function(){return{}}),pe=he.Provider,me=he.Consumer;var ge=function(e){l(t,e);function t(){var e;var r;a(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++){i[s]=arguments[s]}r=u(this,(e=o(t)).call.apply(e,[this].concat(i)));r.getGroupContext=function(){return r.props};return r}i(t,[{key:"_render",value:function e(){var t=this.props,r=t.className,n=t.groupNode,a=t.children;var i={GroupOption:ye,Field:be};var u=S(a)?a(i):d.map(a,function(e){return v(e,i)});if(n===null){return u}return $.createElement(n,{className:r},u)}},{key:"render",value:function e(){return $.createElement(pe,{value:this.getGroupContext},this._render())}}]);return t}(h);ge.displayName="React.Formutil.EasyField.Group";ge.defaultProps={type:"checkbox",groupNode:"div"};var ye=function(e){l(t,e);function t(){a(this,t);return u(this,o(t).apply(this,arguments))}i(t,[{key:"componentDidMount",value:function e(){g("$value"in this.props,"You should pass a $value to <GroupOption />.")}},{key:"render",value:function e(){var t=this.props,r=t.$value,n=t.onChange,a=t.onFocus,i=t.onBlur,u=y(t,["$value","onChange","onFocus","onBlur"]);return $.createElement(me,null,function(e){var t=e();var o=t.type,s=t.name;var l=o==="radio"?{checked:t.value===r,onChange:function e(a){t.onChange(r,a);n&&n(a)}}:o==="checkbox"?{checked:t.value.indexOf(r)>-1,onChange:function e(a){t.onChange(a.target.checked?t.value.concat(r):t.value.filter(function(e){return e!==r}),a);n&&n(a)}}:{value:t.value,onChange:function e(r){t.onChange(r);n&&n(r)}};return $.createElement("input",Object.assign({name:s},u,l,{type:o,onFocus:function e(r){t.onFocus(r);a&&a(r)},onBlur:function e(r){t.onBlur(r);i&&i(r)}}))})}}]);return t}(h);ye.displayName="React.Formutil.EasyField.Group.Option";var be=function(e){l(t,e);function t(){a(this,t);return u(this,o(t).apply(this,arguments))}i(t,[{key:"componentDidMount",value:function e(){g(false,'The "Field" property in EasyField\'s children-props has been deprecated. Please use "GroupOption" instead.')}},{key:"render",value:function e(){return $.createElement(ye,this.props)}}]);return t}(h);be.displayName="React.Formutil.EasyField.Group.Option.Deprecated";var Fe=$.Frament||"div";var Ve=function(e){l(r,e);function r(e){var t;a(this,r);t=u(this,o(r).call(this,e));t.id=0;t.latestValue=t.props.value;t.$formutil=void 0;t.FieldValidators={required:function e(t){return t!==null}};t.$onFormChange=function(e){e.$onValidates(function(e){var r=e.$invalid,n=e.$params;if(r){if(t.props.value.length){t.props.onChange(t.latestValue=[])}}else if(!F(t.props.value,n.list)){t.props.onChange(t.latestValue=n.list)}})};t.swap=function(e,r,n){return t.$setState(function(t){var n=t.items;var a=[n[e],n[r]];n[r]=a[0];n[e]=a[1];return n},n)};t.insert=function(){var e,r,n;for(var a=arguments.length,i=new Array(a),u=0;u<a;u++){i[u]=arguments[u]}i.forEach(function(t){if(S(t)){n=t}else if(typeof t==="number"){e=t}else if(typeof t==="object"){r=t}});return t.$setState(function(n){var a=n.items;if(P(e)){a.push(t.getId(r))}else{a.splice(e,0,t.getId(r))}return{items:a}},n)};t.remove=function(){var e,r;for(var n=arguments.length,a=new Array(n),i=0;i<n;i++){a[i]=arguments[i]}a.forEach(function(t){if(S(t)){r=t}else if(typeof t==="number"){e=t}});return t.$setState(function(r){var n=r.items;if(P(e)){n.pop()}else{n.splice(e,1)}if(!n.length){n=[t.getId()]}return{items:n}},r)};t.$setState=function(e,r){return new Promise(function(n){return t.setState(e,function(){return t.$formutil.$onValidates(function(e){return n(x(r,e))})})})};t.state={items:e.value.length?e.value.map(function(){return t.getId()}):[t.getId()],formKey:0};return t}i(r,[{key:"componentDidUpdate",value:function e(t){var r=this;if(this.props.value!==this.latestValue){this.setState({items:this.props.value.length?this.props.value.map(function(){return r.getId()}):[this.getId()],formKey:this.state.formKey+1});this.latestValue=this.props.value}}},{key:"getId",value:function e(t){return{id:this.id++,values:t}}},{key:"render",value:function e(){var r=this;var n=this.props,a=n.children,i=n.onFocus,u=n.onBlur,o=n.value;var s=this;if(!S(a)){return null}var l={$insert:this.insert,$remove:this.remove,$swap:this.swap,$push:function e(t,n){return r.insert(t,n)},$pop:function e(t){return r.remove(t)},$shift:function e(t){return r.remove(0,t)},$unshift:function e(t,n){return r.insert(0,t,n)},onFocus:i,onBlur:u};return $.createElement(X,{key:this.state.formKey,$defaultValues:{list:o},$onFormChange:this.$onFormChange,children:function e(n){r.$formutil=n;return $.createElement(Fe,null,r.state.items.map(function(e,i){var u=e.id,o=e.values;return $.createElement($e,{key:u,required:true,$defaultValue:o||null,$validators:r.FieldValidators,name:"list[".concat(i,"]"),children:function e(u){return $.createElement(X,{$defaultValues:u.$value||{},$onFormChange:function e(t){return t.$onValidates(function(e){var t=e.$invalid,r=e.$params;if(t){if(u.$viewValue!==null){u.$render(null)}}else if(!F(u.$viewValue,r)){u.$render(r)}})},children:function e(u){return a(t({get $length(){return s.state.items.length},$index:i,$isLast:function e(){return i===r.state.items.length-1},$isFirst:function e(){return i===0}},l,{},u),n)}})}})}))}})}}]);return r}(h);Ve.displayName="React.Formutil.EasyField.List";var we="__TYPE__";var ke=[["required",function(e,t,r){var n=r.__TYPE__,a=r.checked,i=a===void 0?true:a;return n==="checked"?e===i:!E(e)}],["maxLength",function(e,t){return E(e)||e.length<=t}],["minLength",function(e,t){return E(e)||e.length>=t}],["max",function(e,t){return E(e)||e*1<=t}],["min",function(e,t){return E(e)||e*1>=t}],["pattern",function(e,t){return E(e)||t.test(e)}],["enum",function(e,t){return E(e)||t.indexOf(e)>-1}],["checker",function(e,t,r){return t(e,r)}]].reduce(function(e,t){var r=n(t,2),a=r[0],i=r[1];e[a]=function e(t,r,n){var u=n.validMessage,o=u===void 0?{}:u;return i.apply(void 0,arguments)||o[a]||"Error input: ".concat(a)};return e},{});var Ce="React.Formutil.EasyField";var Pe={validMessage:{},valuePropName:"value",changePropName:"onChange",focusPropName:"onFocus",blurPropName:"onBlur",$parser:function e(t){return typeof t==="string"?t.trim():t}};function Se(r,n,a){var i;var u=n.valuePropName,o=n.changePropName,s=n.focusPropName,l=n.blurPropName,$=n.getValueFromEvent,f=n.passUtil;var c=function e(t){return t&&t.target?t.target[u]:t};var d=t({},a,(i={},e(i,u,r.$viewValue),e(i,o,function(e){var t;for(var a=arguments.length,i=new Array(a>1?a-1:0),u=1;u<a;u++){i[u-1]=arguments[u]}if(((t=i[0])===null||t===void 0?void 0:t.nativeEvent)instanceof Event){i.push(e)}else{i.unshift(e)}var s=n[o];s&&s.apply(void 0,i);var l=$?$.apply(void 0,i):c(e);r.$render(l)}),e(i,s,function(){var e=n[s];e&&e.apply(void 0,arguments);r.$setFocused(true)}),e(i,l,function(){var e=n[l];e&&e.apply(void 0,arguments);if(r.$untouched){r.$setTouched(true)}r.$setFocused(false)}),i));if(f){d[f===true?"$fieldutil":String(f)]=r}return d}function Ee(e){var r=e.children,a=e.component,i=e.render,u=y(e,["children","component","render"]);var o=u.name,s=u.type,l=u.defaultValue,$=u.valuePropName,f=u.changePropName,c=u.focusPropName,d=u.blurPropName,v=u.getValueFromEvent,h=u.validMessage,p=u.checked,m=u.unchecked,g=u.__TYPE__,b=u.__DIFF__,F=u.passUtil,V=u.$defaultValue,w=u.$defaultState,k=u.$onFieldChange,C=u.$validators,S=u.$asyncValidators,E=u.$validateLazy,O=u.$memo,_=u.$reserveOnUnmount,j=u.$parser,D=u.$formatter,A=u.$ref,x=y(u,["name","type","defaultValue","valuePropName","changePropName","focusPropName","blurPropName","getValueFromEvent","validMessage","checked","unchecked","__TYPE__","__DIFF__","passUtil","$defaultValue","$defaultState","$onFieldChange","$validators","$asyncValidators","$validateLazy","$memo","$reserveOnUnmount","$parser","$formatter","$ref"]);var N={children:r,component:a,render:i};if(O===true&&P(b)){u.__DIFF__=[r,a,i]}var U=!P(s)||P(r)&&P(a)&&P(i);Object.keys(t({},u.$validators=t({},ke,{},u.$validators),{},u.$asyncValidators)).forEach(function(e){if(e in x){if(!U||!R(e)){delete x[e]}}});if(U){var T=(s||"").split("."),I=n(T,2),H=I[0],M=H===void 0?"text":H,L=I[1];N.component=M==="group"?ge:M==="list"?Ve:ve;if(o){x.name=o}if(s){x.type=M}if(r){x.children=r}x.checked=p;x.unchecked=m;switch(M){case"select":case"textarea":if(e.multiple){u[we]="array"}break;case"group":if(L==="checkbox"){u[we]="array"}x.type=L;break;case"checkbox":case"radio":u[we]="checked";break;case"list":u[we]="array";break}}if(!("$defaultValue"in u)&&"defaultValue"in e){u.$defaultValue=l}if(!("$defaultValue"in u)&&we in u){var B;switch(u[we]){case"checked":var Y=u.unchecked,Q=Y===void 0?false:Y;B=Q;break;case"array":B=[];break;case"object":B={};break;case"number":B=0;break}u.$defaultValue=B}return{fieldProps:u,childProps:x,renderProps:N}}function Oe(e,t){var r=t.component,n=t.render,a=t.children;if(r){return c(r,e)}if(S(n)){return n(e)}if(S(a)){return a(e)}return d.map(a,function(t){return v(t,e)})}var _e=function(e){l(t,e);function t(){var e;var r;a(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++){i[s]=arguments[s]}r=u(this,(e=o(t)).call.apply(e,[this].concat(i)));r.renderChildren=function(e){var t=r.parsedProps,n=t.fieldProps,a=t.childProps,i=t.renderProps;return Oe(Se(e,n,a),i)};r.parsedProps={};return r}i(t,[{key:"render",value:function e(){var t=this.parsedProps=Ee(this.props),r=t.fieldProps;return $.createElement($e,Object.assign({},r,{children:this.renderChildren}))}}]);return t}(h);_e.displayName=Ce;_e.defaultProps=Pe;function je(e){var t=p(function(t,r){return $.createElement(V.Consumer,null,function(n){return $.createElement(e,Object.assign({},t,{$formutil:n().$formutil,ref:r}))})});t.displayName="React.Formutil.connect."+(e.displayName||e.name||"Anonymous");return b(t,e)}function De(){if(!$.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var e=$.useContext;var t=e(V);return t()}function Ae(e){var a=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(!$.useState){throw new Error("Hooks api need react@>=16.8, Please upgrade your reactjs.")}var i=$.useState,u=$.useLayoutEffect,o=$.useRef;var s;if(e){if(typeof e==="string"){s=e;a.name=s}else{a=e;s=a.name}}var l=De();var f=o({}).current;var c=o([]);var d;f.$formContext=l;f.props=a;f.$setState=m;var v=i(function(){f.$$FIELD_UUID=oe();f.$fieldHandler=d=le(f);var e=f.$fieldHandler.$$reset();f.$fieldHandler.$validate();return e}),h=n(v,2),p=h[1];if(!d){d=(l.$$registers||{})[f.$fieldHandler.$name]||f.$fieldHandler}u(function(){var e=f.$state;if(f.isMounting){if(!(s in(l.$$registers||{}))){d.$$triggerChange({$newValue:e.$value,$prevValue:f.$prevState.$value})}}f.$prevState=e},[f.$state.$value]);u(function(){f.isMounting=true;g(!s||l.$formutil,"You should enusre that the useField() with the name '".concat(s,"' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."));g(s,"You should pass a name argument to useField(), otherwise it will be isolated!");return function(){f.isMounting=false;M(a.$ref,null)}},[]);u(function(){if(l.$$register){l.$$register(s,f.$fieldHandler)}return function(){if(l.$$unregister){l.$$unregister(s,f.$fieldHandler,!f.isMounting&&a.$reserveOnUnmount)}}},[s]);u(function(){M(a.$ref,f.$fieldutil)});u(function(){if(c.current.length>0){var e=r(c.current);c.current.length=0;while(e.length){e.pop()(f.$fieldutil)}}});function m(e,t){return new Promise(function(r){var n=function e(){return r(x(t,f.$fieldutil))};if(f.isMounting){if(s in(l.$$registers||{})){l.$$onChange(s,e,n)}else{p(d.$$merge(e));d.$$detectChange(e);c.current.push(n)}}else{d.$$merge(e);n()}})}return f.$fieldutil=t({$name:s},d.$getState(),{},d,{$$formutil:l.$formutil})}function xe(){var e=De(),t=e.$formutil;return t}function Ne(e){e=t({},Pe,{},e,{children:null});var r=Ee(e),n=r.fieldProps,a=r.childProps;var i=Ae(n);return Se(i,n,a)}export{_e as EasyField,$e as Field,X as Form,je as connect,V as formContext,Ae as useField,xe as useForm,Ne as useHandler,de as withField,te as withForm};
