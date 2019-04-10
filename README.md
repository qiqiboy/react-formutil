# react-formutil

[![npm](https://img.shields.io/npm/v/react-formutil.svg?style=flat)](https://npm.im/react-formutil)
[![npm](https://img.shields.io/npm/v/react-formutil/next.svg?color=yellow)](https://npm.im/react-formutil)
[![peerDependencies](https://img.shields.io/npm/dependency-version/react-formutil/peer/react.svg?color=yellowgreen)](https://reactjs.org)
[![definitionTypes](https://img.shields.io/npm/types/react-formutil.svg)](https://github.com/qiqiboy/react-formutil/blob/master/index.d.ts)
[![gzip](https://img.shields.io/bundlephobia/minzip/react-formutil.svg)](https://npm.im/react-formutil)
[![download](https://img.shields.io/npm/dm/react-formutil.svg)](https://npm.im/react-formutil)
[![issues](https://img.shields.io/github/issues/qiqiboy/react-formutil.svg)](https://github.com/qiqiboy/react-formutil/issues)
[![license](https://img.shields.io/github/license/qiqiboy/react-formutil.svg)](https://github.com/qiqiboy/react-formutil/blob/master/LICENSE)
[![github](https://img.shields.io/github/last-commit/qiqiboy/react-formutil.svg)](https://github.com/qiqiboy/react-formutil)
[![github](https://img.shields.io/github/release-date/qiqiboy/react-formutil.svg)](https://github.com/qiqiboy/react-formutil/releases)
[![github](https://img.shields.io/github/commit-activity/m/qiqiboy/react-formutil.svg)](https://github.com/qiqiboy/react-formutil/commits/master)
[![github](https://img.shields.io/github/stars/qiqiboy/react-formutil.svg?style=social)](https://github.com/qiqiboy/react-formutil)

[![react-formutil](https://nodei.co/npm/react-formutil.png?compact=true)](https://npm.im/react-formutil)

Happy to build the forms in React ^\_^

`react-formutil` 定义了一种表单状态的收集、分发、同步模型。基于此，你可以很方便的使用 `react-formutil` 来创建、管理你的页面表单。

> #### react-formutil 的优势
>
> 1.  一切都是状态，$value/$viewValue、$diry/$pristine、$touched/$untouched、$valid/$invalid、\$error 等都是状态
> 2.  非侵入性，只提供了对表单状态收集的抽象接口，不渲染任何 dom 结构
> 3.  采用受控组件和 context，对组件嵌套层级没有限制，支持数据双向同步（`model<->view`）
> 4.  同时支持高阶组件和函数式子组件（[render props](https://reactjs.org/docs/render-props.html)）式调用，更灵活（>=0.5.0 起支持[`Hooks`](#hooks)）
> 5.  具备灵活的表单校验方式，支持同步和异步校验
> 6.  规范的 jsx 语法调用，更符合 react 理念
> 7.  [对流行的 react 组件库做了适配优化，现已支持](#如何在-ant-design-或者-material-ui-等项目中使用-react-formutil)：`ant-design` `material-ui` `react-bootstrap` `react-md`

**无论你是否已经了解了`react-formutil`的特性、用法以及 API，开始项目前，请务必阅读下我们建议的[最佳实践](#最佳实践-best-practices)！**

<!-- vim-markdown-toc GFM -->

* [安装 Installation](#安装-installation)
    - [`最新版`](#最新版)
    - [`Next版`](#next版)
    - [`0.4.x`](#04x)
    - [`UMD包`](#umd包)
* [示例 Examples](#示例-examples)
* [使用 Usage](#使用-usage)
    - [`<Field />`](#field-)
        + [`render` `component`](#render-component)
        + [`name`](#name)
        + [`$defaultValue`](#defaultvalue)
        + [`$defaultState`](#defaultstate)
        + [`$validators`](#validators)
        + [~~`$asyncValidators`~~](#asyncvalidators)
        + [`$validateLazy`](#validatelazy)
        + [`$onFieldChange`](#onfieldchange)
        + [`$reserveOnUnmount`](#reserveonunmount)
        + [`$parser`](#parser)
        + [`$formatter`](#formatter)
        + [`$fieldutil`](#fieldutil)
            * [`$value`](#value)
            * [`$viewValue`](#viewvalue)
            * [`$dirty | $pristine | $touched | $untouched | $invalid | $valid | $focused | $pending`](#dirty--pristine--touched--untouched--invalid--valid--focused--pending)
            * [`$error`](#error)
            * [`$new()`](#new)
            * [`$getState()`](#getstate)
            * [`$reset()`](#reset)
            * [`$getComponent()`](#getcomponent)
            * [`$setState($newState)`](#setstatenewstate)
            * [`$render()`](#render)
            * [`$setValue()`](#setvalue)
            * [`$setDirty($dirty) | $setTouched($touched) | $setFocused($focused) | $setValidity(errKey, result)`](#setdirtydirty--settouchedtouched--setfocusedfocused--setvalidityerrkey-result)
            * [`$setError($error)`](#seterrorerror)
            * [`$validate()`](#validate)
            * [`$onValidate()`](#onvalidate)
            * [`$getFirstError()`](#getfirsterror)
            * [`$$formutil`](#formutil)
    - [`withField(Component)`](#withfieldcomponent)
    - [`<EasyField />`](#easyfield-)
        + [`$fieldHandler`](#fieldhandler)
        + [`渲染原生表单控件`](#渲染原生表单控件)
            * [`input`](#input)
            * [`select`](#select)
            * [`checkbox/radio`](#checkboxradio)
            * [`checkbox/radio group`](#checkboxradio-group)
        + [`渲染自定义组件`](#渲染自定义组件)
            * [`原生表单控件`](#原生表单控件)
            * [`列表数组`](#列表数组)
                - [`$listutil`](#listutil)
            * [`第三方组件`](#第三方组件)
        + [`name`](#name-1)
        + [`$defaultValue`](#defaultvalue-1)
        + [`$defaultState`](#defaultstate-1)
        + [`$validators`](#validators-1)
        + [`$validateLazy`](#validatelazy-1)
        + [~~`$asyncValidators`~~](#asyncvalidators-1)
        + [`$parser`](#parser-1)
        + [`$formatter`](#formatter-1)
        + [`defaultValue`](#defaultvalue-2)
        + [`validMessage`](#validmessage)
        + [`checked / unchecked`](#checked--unchecked)
        + [`valuePropName` `changePropName` `focusPropName` `blurPropName`](#valuepropname-changepropname-focuspropname-blurpropname)
        + [`passUtil`](#passutil)
    - [`<Form />`](#form-)
        + [`render` | `component`](#render--component)
        + [`$defaultValues`](#defaultvalues)
        + [`$defaultStates`](#defaultstates)
        + [`$onFormChange`](#onformchange)
        + [`$validator`](#validator)
        + [`$processer`](#processer)
        + [`$formutil`](#formutil-1)
            * [`$new()`](#new-1)
            * [`$getField(name)`](#getfieldname)
            * [`$validate(name)`](#validatename)
            * [`$validates()`](#validates)
            * [`$onValidates()`](#onvalidates)
            * [`$render(callback)`](#rendercallback)
            * [`$setStates($stateTree)`](#setstatesstatetree)
            * [`$setValues($valueTree)`](#setvaluesvaluetree)
            * [`$setErrors($errorTree)`](#seterrorserrortree)
            * [`$reset($stateTree)`](#resetstatetree)
            * [`$setDirts($dirtyTree) | $setTouches($touchedTree) | $setFocuses($focusedTree)`](#setdirtsdirtytree--settouchestouchedtree--setfocusesfocusedtree)
            * [`$batchState($newState) | $batchDirty($dirty) | $batchTouched($touched) | $batchFocused($focused)`](#batchstatenewstate--batchdirtydirty--batchtouchedtouched--batchfocusedfocused)
            * [`$getFirstError()`](#getfirsterror-1)
            * [`$states | $weakStates`](#states--weakstates)
            * [`$params | $weakParams`](#params--weakparams)
            * [`$errors | $weakErrors`](#errors--weakerrors)
            * [`$dirts | $weakDirts`](#dirts--weakdirts)
            * [`$touches | $weakTouches`](#touches--weaktouches)
            * [`$focuses | $weakFocuses`](#focuses--weakfocuses)
            * [`$valid | $invalid`](#valid--invalid)
            * [`$dirty | $pristine`](#dirty--pristine)
            * [`$touched | $untouched`](#touched--untouched)
            * [`$focused`](#focused)
    - [`withForm(Component)`](#withformcomponent)
    - [`connect(Component)`](#connectcomponent)
    - [`Hooks`](#hooks)
        + [`useField`](#usefield)
        + [`useHandler`](#usehandler)
        + [`useForm`](#useform)
* [最佳实践 Best Practices](#最佳实践-best-practices)
* [FAQ & 常见问题解答](#faq--常见问题解答)
    - [`Field 与 EasyField 有什么区别`](#field-与-easyfield-有什么区别)
    - [`Field中的 $value 与 $viewValue 有什么区别`](#field中的-value-与-viewvalue-有什么区别)
    - [`如何在我自己的项目中便捷的使用Field组件？`](#如何在我自己的项目中便捷的使用field组件)
    - [`checkbox 多选或 radio 单选组怎么实现`](#checkbox-多选或-radio-单选组怎么实现)
    - [`使用 Field 实现一个上传图片的表单控件`](#使用-field-实现一个上传图片的表单控件)
    - [`如何获取对 Field 生成的节点的引用？`](#如何获取对-field-生成的节点的引用)
    - [`对于有大量表单项的长页面有没有优化办法`](#对于有大量表单项的长页面有没有优化办法)
    - [`如何在 ant-design 或者 Material-UI 等项目中使用 react-formutil?`](#如何在-ant-design-或者-material-ui-等项目中使用-react-formutil)
    - [`如何使用typescript开发？`](#如何使用typescript开发)

<!-- vim-markdown-toc -->

## 安装 Installation

[![react-formutil](https://nodei.co/npm/react-formutil.png?compact=true)](https://npm.im/react-formutil)

目前最新版本是`0.5.x`，支持所有`v15+`的`react`版本！强烈推荐安装或者升级至该版本。

### `最新版`

[![npm](https://img.shields.io/npm/v/react-formutil.svg?style=flat)](https://npm.im/react-formutil)

相比于上一版本`0.4.x`版本，新增或者改进了部分 API，并且支持`react@16.8`新增的[`Hooks`](#hooks)。完整更新说明请参考：[Release v0.5.0](https://github.com/qiqiboy/react-formutil/releases/tag/0.5.0)

```bash
# npm
npm install react-formutil@latest --save

# yarn
yarn add react-formutil@latest
```

### `Next版`

[![npm](https://img.shields.io/npm/v/react-formutil/next.svg?color=yellow)](https://npm.im/react-formutil)

`Next版`一般会领先于`最新版`，一般是包含一些小功能的添加、测试，或者一些`不那么重要的小bug`的 fix。

```bash
# npm
npm install react-formutil@next --save

# yarn
yarn add react-formutil@next
```

### `0.4.x`

**不建议继续使用。仅限升级`0.5.x`遇到一些暂时没有条件兼容的问题（例如 TS 类型声明变动、Field 注册时机变动），或者进入维护期的项目修复 bug**

`0.4.x`支持所有`v15` - `v16`版本的 react（不支持未来发布的`v17`版本，因为该版本使用旧版的`context API`；目前也不再更新新功能支持，只修复 Bug）；文档请参考：[react-formutil 0.4.x](https://github.com/qiqiboy/react-formutil/tree/0.4.8)

```bash
# npm
npm install react-formutil@0.4 --save

# yarn
yarn add react-formutil@0.4
```

### `UMD包`

[https://unpkg.com/react-formutil@latest/dist/react-formutil.umd.production.js](https://unpkg.com/react-formutil@latest/dist/react-formutil.umd.production.js)

## 示例 Examples

先看一个简单的示例：

[Demo on codeSandbox.io](https://codesandbox.io/s/pm9ll05p8m)

如果上方地址无法访问或者较慢，也可以查看：[Demo on github pages](http://github.boy.im/react-formutil/demo/)

上面的示例简单展示了 `react-formutil` 的基本用法，你可以通过查看源代码（在`codeSandbox`或者查看[docs](https://github.com/qiqiboy/react-formutil/tree/master/docs)）。

另外也准备了一些实例引导教程，教你一步步学习如何上手`react-formutil`! 你可以点击下方链接进入在线示例教程，跟着页面引导一步步学习如何由简到深的开发自己的表单组件！

-   [The First Field](https://codesandbox.io/s/vqqk17ykr7)
-   [Custom Field name](https://codesandbox.io/s/5kqp5p39yn)
-   [Field validators](https://codesandbox.io/s/pk8xnzjwjj)
-   [Controlled validators](https://codesandbox.io/s/xpoknx2nj4)
-   [Asynchronous validate](https://codesandbox.io/s/9zzopyk6v4)
-   [The Login Form](https://codesandbox.io/s/6jqk6roxzk)
-   [The Signup Form](https://codesandbox.io/s/yw0w8zkl69)
-   [Nexted/Complex Form](https://codesandbox.io/s/oxxq7wnkw9)
-   [The Field List/Array](https://codesandbox.io/s/3yzr3r9qkq)
-   [Form Adaptor](https://codesandbox.io/s/14lr59rmlj)
-   And more...

## 使用 Usage

> [了解如何在 `ant-design`、`Material-UI`等流行 react 组件库项目中使用 react-formutil？](#如何在-ant-design-或者-material-ui-等项目中使用-react-formutil)

`react-formutil` 主要提供了一个 Field 组件和一个 Form 组件，另外还有几个基于此的高阶组件：

-   [`<Field />`](#field-) 是一个抽象的组件，它维护了一个表示当前域的状态模型。
-   [`<Form />`](#form-) 也是一个抽象的组件，它主要作为整个表单的控制器，用来和其组件树中的`Field`做状态模型的收集与同步。
-   [`withField`](#withfieldcomponent) 是基于 `Field` 包装成高阶组件，方便习惯高阶方式的调用
-   [`withForm`](#withformcomponent) 是基于 `Form` 包装成高阶组件，方便习惯高阶方式的调用
-   [`<EasyField />`](#easyfield-) 是基于 `Field` 进行的组件封装，可以直接渲染出基于原生态浏览器的表单控件的表单项，方便直接使用。另外它也提供了一组抽象接口用于对接其他 react 组件库。
-   [`connect`](#connectcomponent) 是个高阶组件，用来给被包装的组件传递 [`$formutil`](#formutil-1) 对象。

`react-formutil` 不像很多你能看到的其它的 react 表单库，它是非侵入性的。即它并不要求、也并不会强制渲染某种固定的 dom 结构。它只需要提供 `name` 值以及绑定好 `$render` 用来更新输入值，然后一切就会自动同步、更新。

> 需要强调，当使用 Field 和 Form 时，我们建议以函数作为子节点方式调用: [function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)
>
> 当然，你也可以通过`render`属性来调用：[render props](https://reactjs.org/docs/render-props.html)
>
> 也可以传递`component`来指定直接渲染一个组件。

```javascript
//一个函数式子组件书写示例
<Form>
    {$formutil => {
        return <Field name="username">{props => <input />}</Field>;
    }}
</Form>

//或者使用children属性
<Form
    children={$formutil => <Field name="username" children={props => <input />} />}
/>

//或者使用render属性
<Form
    render={$formutil => <Field name="username" render={props => <input />} />}
/>

//或者使用component属性
<Form
    component={MyForm} />

//当然也可以传递普通组件作为子节点
//Field组件写在loginForm这个组件中
<Form>
    <LoginForm />
</Form>
```

> **对于 `<Form />` `<Field />` `<EasyField />` 三个组件，其相关属性的优先级为：**
>
> `component` > `render` > `children`

### `<Field />`

`Field` 是一个标准的 react 组件，一个`Field`即代表一个表单域。它维护了一个与当前域有关的状态模型（具体可以参考：[`$fieldutil`](#fieldutil)）。

它可以理解为表单控件的顶层组件，它本身不渲染任何实际 DOM 节点。它通过向子组件传递 [`$fieldutil`](#fieldutil) 对象来同步表单控件的状态。

每个表单域的渲染都应当通过`Field`来实现。它提供了多种调用方法，可以以函数、或者 React 组件当作子组件调用，推荐使用[render props](https://reactjs.org/docs/render-props.html)。

> **我们提供了一个教程，关于如果快速通过`Field`组件集成进项目：**
>
> [`如何在我自己的项目中便捷的使用Field组件？`](#如何在我自己的项目中便捷的使用field组件)

`Field` 可以接收以下几个属性参数：

#### `render` `component`

这两个属性为可选，并且不能同时存在（component 会优先于 render，而将其覆盖）。

当使用[function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)方式时，可以不传该属性。

如果设置了该属性，则其会覆盖掉`function as child`方式。

```javascript
<Field name="username" render={$fieldutil => <input />} />
// 或
<Field name="username" component={MyField} />
```

#### `name`

该项必填，`name` 可以是一个简单的字符串，也可以是一个字符串表达式（该表达式执行没有 `scope`, 所以表达式中不能存在变量）

-   `<Field name="username" />`
-   `<Field name="list[0]" />`
-   `<Field name="list[1].name" />`
-   `<Field name="list[2]['test' + 124]" />`

以上都是合法的 `name` 值。对于多层级的 `name` 值，生成的表单参数对象，也会基于该对象层级创建。例如，上面的示例，将会生成以下格式的表单参数对象：

```json
{
    "username": "",
    "list": ["", { "name": "" }, { "test124": "" }]
}
```

#### `$defaultValue`

> `0.5.4`起，`$defaultValue`也可以传递一个函数，该函数接收所有传递给 Field 的 props，然后返回的要设置的默认值。类似`react-redux`中的`mapPropsToState`用法。

`$defaultValue` 可以通过传递一个值，或者一个返回初始值的函数，来将其作为 Field 的默认值/初始值。如过不传递该参数，则默认值都为空字符串。通过该属性，你可以指定某个表单控件的默认值或初始值。

-   `<Field $defaultValue="username" />`
-   `<Field $defaultValue={{name: 'dog'}} />`

`$defaultValue` 可以是任意类型值。

#### `$defaultState`

> `0.5.4`起，`$defaultState`也可以传递一个函数，该函数接收所有传递给 Field 的 props，然后返回的要设置的初始状态。类似`react-redux`中的`mapPropsToState`用法。

`$defaultState` 可以覆盖表单控件的的默认状态，通过传递一个`{ [key]: value }`对象，或者一个返回`{ [key]: value }`对象的函数，来将其作为 Field 的初始状态。

```javascript
<Field $defaultState={{ $value: 'username' }} />
<Field $defaultValue="username" />
```

上面两者等效，其实表单控件的值只是状态里的一个字段`$value`

#### `$validators`

该属性可以设置表单控件的校验方式，同时支持同步和异步校验。它是 `key: value` 的对象形式，key 为校验类型标识，value 为校验函数。仅当校验函数返回 true 时，表示该项校验通过，否则其他值将会被当作错误信息保存到状态中。

> **异步校验**：如果校验函数返回一个`promise`对象，则`resolved`表示校验通过，`rejected`则校验不通过，同时`rejected`返回的`reason`将会被当作错误信息保存到`$error`对象中。

> 异步校验时，状态里会有 `$pending` 用来表示正在异步校验。**如果值快速变化，会触发多次异步校验，但是 Field 只会响应最后一次异步校验结果，前面没有结束的异步校验，无论结果是否通过，都会被忽略！！**

> **异步校验不会被自动取消，你需要自己在校验函数实现时，确保被多次调用时，可以取消掉之前未结束的异步校验（例如未响应的 ajax 请求，需要`abort`掉它）。**

> **特别注意**： 仅仅设置了`$validators`，并不会触发校验，还需要设置匹配`$validators`中每一项的属性标识符，该属性的值会作为第二个参数传递给校验函数。

校验被调用，会传入三个值：value、attr、props

-   `value` 为当前 Field 的值
-   `attr` 为校验标识值
-   `props` 为当前传给 Field 的所有 props，还包括以下三个特殊的值：
    -   `props.$validError` 表示当前校验中，前面已经校验出的错误信息<small>（该属性为`0.5.0`新增）</small>
    -   `props.$fieldutil` 当前 Field 的`$fieldutil`对象<small>（该属性为`0.5.0`新增）</small>。
        -   <small>该值为上一次渲染的状态，可以通过`$fieldutil.$new()`尝试获取最新渲染状态</small>
    -   `props.$formutil` 当前 Field 所属 Form 的`$formutil`对象。
        -   <small>该值为上一次渲染的状态，可以通过`$formutil.$new()`尝试获取最新渲染状态</small>

```javascript
<Field
    required
    maxLength="5"
    disableChar="z"
    asyncCheck
    $validators={{
        required: value => !!value || '该项必填',
        maxLength: (value, len) => value.length <= parseInt(len) || '最少长度：' + len,
        disableChar: (value, char) => value.indexOf(char) === -1 || '禁止输入字符：' + char,
        /* 注意：下面这条规则将不会触发校验，因为我们没有给Field传递 minNumber 属性来表示需要去校验该条规则 */
        minNumber: (value, limit) => value > parseFloat(limit) || '输入值必需大于：' + limit,

        /* 异步校验 */
        asyncCheck: value =>
            axios.post('/api/v1/check_account', { account: value }).catch(error => Promise.reject(error.message))
    }}>
    {$fieldutil => (
        <div className="form-group">
            <label>密码</label>
            <input
                type="number"
                onChange={ev => $fieldutil.$render(ev.target.value.trim())}
                value={$fieldutil.$viewValue}
            />
            {$fieldutil.$invalid && <div className="error">{$fieldutil.$getFirstError()}</div>}
        </div>
    )}
</Field>
```

在这个例子中，我们通过\$validators 设置了 `required` 、 `maxLength` 以及 `disabledChar` 的校验规则。同时通过属性 `props` 表示了需要校验这三个字段。然后我们可以通过状态判断将错误信息展示出来。

当然，也可以只在一个校验函数里校验多个规则，甚至混合异步校验：

```javascript
<Field
    baseCheck
    $validators={{
        baseCheck(value) {
            //校验非空
            if (!value) {
                return '该项必填';
            }

            //校验输入长度
            if (value.length < 5) {
                return '最小输入五个字符';
            }

            //异步校验
            return axios
                .post('/api/v1/check_account', { account: value })
                .catch(error => Promise.reject(error.message));
        }
    }}
/>
```

#### ~~`$asyncValidators`~~

> **`v0.2.22` 起，建议直接使用 `$validators` 即可，`$validators` 也支持了异步校验。不建议单独使用 `$asyncValidators`。**

~~该属性可以设置表单项的异步校验规则，设置方式与`$validators`类似。但是不同的是，异步校验函数需要返回`promise`对象，该`promise`被`resolve`表示校验成功，`reject`表示校验失败，并且`reject`的`reason`会被当作失败原因保存到状态的`$error`对象。~~

~~异步校验时，状态里会有`$pending`用来表示正在异步校验。~~

#### `$validateLazy`

> 该属性为 `v0.5.0` 新增。

默认情况下，每次 Field 的值改变，在调用设置的校验方法时，会将所有的校验函数都执行一遍。

通过该属性，可以设置调用校验函数时，启用`懒校验模式`：即是否遇到第一个错误后停止调用后续其它校验函数。校验顺序为`$validators`对象中的校验函数的声明顺序。所以如果你有异步校验，最好将其放到`$validators`声明的最后，以确保`$validateLazy`能有效节省不必要的校验。

> 如果你在考虑实现一组用于多数表单项的校验函数，那么建议将这些校验规则分开，然后通过传递对应到每个校验函数的标识符来在不同的 Field 上启用不同的校验，并且可以利用`$validateLazy`来使用懒校验，提升校验性能。
>
> 如果仅仅是对个别 Field 做校验，我们更加建议将多个校验规则，在一个校验函数里实现！这样可以更加自由的设定校验顺序以及逻辑。

#### `$onFieldChange`

当 Field 的值随着最近一次重新渲染完成后触发该回调。

由于 react 的渲染是异步的，所以如果存在交叉验证，例如 A 控件依赖于 B 控件的值去校验自身，那么这种情况下，B 的值变更并不会导致 A 立即去应用新的值去校验。所以这种情况下，可以通过该属性设置回调，主动去触发校验 A 控件。

> 注意：
>
> 1.  该回调并不会在调用 `$render` `$setValues` 等更新表单值的方法后立即触发，它会随着最新的一次 react 渲染执行。也正因为此，所以才能拿到变更后的表单的值和状态。
> 2.  仅当当前 `Field` 的值（状态里的`$value`）有变动时才会触发，其他状态例如`$diry` `$touched` 等变化不会触发。
> 3.  如果需要访问 DOM Event，请使用 `onChange` 绑定 DOM 节点访问即可。
> 4.  不要在该回调里再次修改当前 Field 的值，否则会陷入死循环（修改该 Field 的其它状态或者修改其它 Field 的值是安全的）。

```javascript
//在B的值变更并且渲染完毕后，主动再次要求A组件进行一次校验
<Field name="B" $onFieldChange={(newValue, preValue) => $formutil.$getField('A').$validate()}>
    //...
</Field>
```

#### `$reserveOnUnmount`

> 该属性为 `v0.5.1` 新增。

默认情况下，当一个`Field`被从组件树移除时（`componentWillUnmount`），会从`Form`控制器中取消注册，这将会导致该 Field 的状态从表单控制器状态集合中移除（例如，`$params` `$errors`等中不再有该 Field 的值、错误信息等）

如果你希望 Field 移除时，在 Form 控制器中保留该 Field 的状态，那么可以传递`$reserveOnUnmount`属性为`true`即可。当该 Field 再次挂载到组件树中时，会**继承之前所有的状态，完全恢复！**

```javascript
<Field name="username" $reserveOnUnmount />
// OR
<Field name="username" $reserveOnUnmount={true} />
```

#### `$parser`

> 这里介绍的是针对`0.5.0`以后版本。如果你在使用之前的版本，请参考：[`$parser`](https://github.com/qiqiboy/react-formutil/tree/0.4.7#parser)

当用户在表单中进行输入时（主动更新视图），视图中的值在更新到状态模型中前，会经过 `$parser` 处理。

```javascript
// 通过$parser属性来过滤前后输入空格
<Field name="fieldName" $parser={(viewValue, $setViewValue) => viewValue.trim()}>
    //...
</Field>
```

注意，上述写法不会修改当前视图值，它仅仅影响状态模型中的值。如果希望限制用户的输入（例如禁止用户输入任意空格），可以通过`$parser`的第二个参数`$setViewValue`，来在用户每次输入后立即更新视图值。

```javascript
// 通过$parser属性来过滤前后输入空格
<Field name="fieldName" $parser={(viewValue, $setViewValue) => $setViewValue(viewValue.trim())} />
```

#### `$formatter`

> 这里介绍的是针对`0.5.0`以后版本。如果你在使用之前的版本，请参考：[`$formatter`](https://github.com/qiqiboy/react-formutil/tree/0.4.7#formatter)

当在表单模型中主动更新模型值时，会通过 `$formatter` 将模型中的值转换为`$viewValue`后传递给视图渲染。

```javascript
// 通过$formatter将模型中的值转换为标准的金额书写格式
<Field name="amount" $formatter={(value, $setModelValue) => priceFormat(value)} />
```

`$formatter`同样有一个回调方法`$setModelValue`，它可以用来在处理模型值时再次对其进行修改。

#### `$fieldutil`

`$fieldutil` 包含了当前`Field`对象的状态模型以及一组用来更新状态模型的方法。它会被传递给视图组件用来同步和更新表单的状态值。

```js
{
    $value: "", //表单域状态模型值
    $viewValue: "", //表单域视图值，$value和$viewValue可以通过$parser或者$formatter相互转换
    $dirty: false, //是否修改过表单项
    $pristine: true, //与$dirty相反
    $touched: false, //是否接触过表单
    $untouched: true, //与$touched相反
    $focused: false, //是否聚焦到当前输入
    $valid: true, //表单项校验结果是否通过
    $invalid: false, //与$valid相反
    $error: {}, //表单校验错误信息
    $pending: false, //异步校验时该值将为true

    /*** 上面是状态模型，下面是可用方法 ***/

    $getState: () => $state, //返回当前状态模型对象
    $reset: ($newState) => $state, //重置为初始状态, $newState存在的话，会做一个合并
    $getComponent: (name) => FieldComponent, //返回Field组件实例

    $render: (value, callback) => {}, //更新表单域视图值，callback可选，会在组件更新后回调
    $setValue: (value, callback) => {}, //直接更新表单域模型值，callback可选。$setValue与$render的区别在于，前者的值会经过$parser处理后再更新到表单模型中，后者则不会。
    $setDirty: $dirty => {}, //设置$dirty装态
    $setTouched: $touched => {}, //设置$touched装态
    $setFocused: $focused => {}, //设置$focused装态
    $setState: $newState => {} //直接更新状态，其实上面的几个方法都是基于$setState
    $setValidity: ($key, $valid) => {} //设置校验， $valid为true代表校验通过，其它值表示校验失败，并当作错误原因
    $setError: ($error) => {} //直接设置错误状态
    $validate: () => {} //触发再次校验
```

该对象会传递给子组件，子组件可以利用其中的方法来同步、修改表单域状态模型：

-   用户输入时需要通过调用`$render`来更新新值到状态中
-   渲染表单项时，应该使用受控组件，并且根据状态模型中的 `$viewValue` 来渲染值<small>（不建议使用`$value`来渲染视图，因为这样就无法使用`$parser` `$formatter`来对数据做二次过滤）</small>
-   错误信息和校验状态可以通过 `$dirty` `$invalid` `$error` 等来渲染

> **需要强调的是，Field 默认不同步`$touched`/`$untouched`、`$focused` 状态，只有`$dirty`/`$pristine`会自动同步（首次调用`$render`会自动同步`$dirty`状态）**
> 如果你需要其它状态，需要自己去绑定相关事件来更新状态：

```javascript
<Field name="username">
    {$fieldutil => (
        <input
            value={$fieldutil.$viewValue}
            onChange={ev => $fieldutil.$render(ev.target.value)}
            onFocus={ev => $fieldutil.$setFocused(true)}
            onBlur={ev => $fieldutil.$setTouched(true) && $fieldutil.$setFocused(false)}
        />
    )}
</Field>
```

下面是`$fieldutil`中属性的更多解释：

##### `$value`

当前表单域的状态模型值。从表单控件中获取的值保存在该字段下。该值会被同步到整个表单的`$params`中。

##### `$viewValue`

> 该属性为 `v0.5.0` 新增

当前表单域的视图值。一般情况下其等同于`$value`。

当你自定义了`$parser`时，会导致视图值与表单值不一致，此时渲染视图时应当使用`$viewValue`来渲染。

> 事实上，当你需要根据表单值更新 Field 视图时，你应当总是使用 `$viewValue` 来代替 `$value`，这总是安全的！

##### `$dirty | $pristine | $touched | $untouched | $invalid | $valid | $focused | $pending`

当前表单域的其它状态：

-   `$dirty` 控件被修改过
-   `$pristine` 控件没有被修改过，与\$dirty 互斥
-   `$touched` 控件失去过焦点
-   `$untouched` 控件没有失去过焦点
-   `$focused` 焦点是否在当前控件
-   `$valid` 表单所有控件均校验通过
-   `$invalid` 表单中有至少一个控件校验不通过
-   `$pending` 是否正在进行异步检查

##### `$error`

保存了当前表单域的错误信息。它是一个`{ [validdate key]: [error message] }`对象。

> 当没有任何错误信息时，它是一个空对象。所以，需要判断当前表单域是否有错误时，应当通过`$invalid` `$valid`来判断！

##### `$new()`

> 该属性为 `v0.5.0` 新增。

获取最新的`$fieldutil`。

每一次渲染后，`Field`传递的`$fieldutil`对象都是当前的状态的快照。当异步或者回调方法中传递`$fieldutil`对象，拿到的可能与最新的状态不一致。可以通过该方法获取到最新一次渲染后的`$fieldutil`对象!

##### `$getState()`

> 该属性为 `v0.5.0` 新增。如果你在使用旧版本，请使用`$picker()`代替。

返回 Field 的纯粹状态（不包含任何下方的方法）

##### `$reset()`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$reset($newState?: Partial<FieldState>, ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

重置当前表单域名为初始状态，即所有的`$value` `$viewValue` `$dirty`等状态都会恢复为初始状态。

##### `$getComponent()`

获取当前表单域的实例对象引用（虚拟 dom）

##### `$setState($newState)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setState($newState: Partial<FieldState>, ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

设置新的`$state`，`$newState`会与当前`$state`合并

```javascript
$setState({
    $dirty: true,
    $value: '124'
});
```

##### `$render()`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$render($viewValue: any, ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

更新表单域的视图值，并且该值会经过`$parser`处理后更新到表单域的状态模型中。

另外如果该表单域模型状态中的`$dirty`为`false`，也会同时将`$dirty`设置为`true`（`$pristine`为`false`）。

> **提醒** 当从表单控件中同步值时，应当使用`$render`，而不是`$setValue`!

##### `$setValue()`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setValue($value: T, ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

更新表单域的模型值，并且该值会经过`$formatter`后更新到视图上。

##### `$setDirty($dirty) | $setTouched($touched) | $setFocused($focused) | $setValidity(errKey, result)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setDirty($dirty: boolean, callback?:($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
$setTouched($dir$touchedty: boolean, callback?:($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
$setFocused($focused: boolean, callback?:($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
$setValidity(validKey: string, result: any, callback?:($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

设置$dirty $touched \$error 等状态

```javascript
$setDirty(true);
$setTouched(true);
$setFocused(true);
$setValidity('required', '必需填写'); //第二个参数不为true，则表示校验失败，并当作错误描述
$setValidity('required', true); //表示校验通过
```

##### `$setError($error)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setError($error: FieldError, callback?: ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

直接替换当前表单域的`$error`。

```javascript
$setError({
    required: '必需填写',
    maxLength: '不能超过10个字符'
});
```

##### `$validate()`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$validate(callback?: ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

手动触发校验 Field。一般情况下，你无需这么做，当值改变时，会自动调用设定的校验函数。仅当你的校验函数依赖于其它值时，在其它值改变时，你可以通过该方法手动触发校验。

该方法可以传递一个回调函数，或者通过其返回值 Promise 来监听校验完成。

**请注意** 当你手动运行了校验函数时，如果其中包含异步校验，在校验完成前，Field 的值可能再次发生变化，那么会导致校验重新运行。此时，回调函数以及 Promise 回调都将延迟到最后一次校验完成后触发，并且会保持你的调用顺序！

##### `$onValidate()`

```typescript
// 其函数签名如下
// 0.5.1起，同时支持参数回调，以及Promise回调
$onValidate(callback?: ($fieldutil: $Fieldutil) => void): Promise<$Fieldutil>;
```

确保当前 Field 校验结束后进行回调操作。因为如果 Field 有异步校验，在你更改了 Field 的值后，可能想在校验结束后，根据 Field 最新的状态来做一些操作，此时可以就使用该方法。

##### `$getFirstError()`

获取当前表单域的错误项中的首个错误描述。由于`$error`是个对象，所以这里提供了一个方法简化错误信息的获取。

```javascript
<Field>
    {$fieldutil => (
        <div>
            <input value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />
            {$fieldutil.$invalid && <p className="error">{$fieldutil.$getFirstError()}</p>}
        </div>
    )}
</Field>
```

##### `$$formutil`

当前表单域所属的 Form 的[`$formutil`](#formutil-1)对象，它包含了整个表单的状态以及一些操作方法，具体可以参考下方 Form 说明。

> 特别注意，这里`$$formutil`是双`$`符号打头，表示不推荐使用。绝大多数情况下，对当前表单域的访问应当通过`$fieldutil`来完成状态的获取与收集。

```javascript
<Field name="username">
{ $fieldutil => <input onChange={ev => $fieldutil.$render(ev.target.value)} onFocus={ev => $fieldutil.$$formutil.$validates()} />
</Field>
```

### `withField(Component)`

> **特别注意**：v0.4.0 版本起，`withField`将会把状态和方法都放到`$fieldutil`对象中传递给被装饰的组件！！这与之前的方式有所区别，请留意。

`withField` 是一个高阶组件，它基于`Field`组件实现。可以通过 withField 的第二个可选参数来为生成的表单域组件设置默认的 props!

```javascript
import React from 'react';
import { withField } from 'react-formutil';

class FieldCustom extends React.Component {
    onChange = ev => this.props.$fieldutil.$render(ev.target.value);

    render() {
        return <input onChange={this.onChange} value={this.props.$fieldutil.$viewValue} />;
    }
}

export default withField(FieldCustom, {
    $defaultValue: '1234' // 该项将传递给Field组件
});
```

`withField`同样支持装饰器语法

```javascript
@withField
class MyField extends Component {}

//or pass some default props
@withField({
    $defaultValue: '123'
})
class MyField extends Component {}
```

### `<EasyField />`

我们深知提供的`<Field />`只是底层控制，并不能直接转换为生产力。实际使用中，还需要[使用`Field`来适配自己项目所用的表单 UI 组件](#如何在我自己的项目中便捷的使用field组件)。

所以我们也提供了一个`EasyField`组件，它通过`Field`将浏览器支持的原生表单控件都实现了支持，并且支持多选组和单选组：[只需要指定`type`属性就可以使用了](#渲染原生表单控件)

同时，`<EasyField />`也提供了统一的值变动与获取绑定的 API（通过标准的`value` `onChange` `onFocus` `onBlur`等属性，大部分流行的组件库，例如`ant-design`的`data-entry`组件都实现了这种统一、规范的对外访问方式）。

**特别提醒：`EasyField`会默认对所有的字符串输入做前后空格的过滤。如果不需要这个特性，可以通过重写`$parser`属性或者将其设置为`null`来关闭该功能：**

```javascript
<EasyField name="name" type="username" $parser={value => value} />
// OR
<EasyField name="name" type="username" $parser={null} />
```

#### `$fieldHandler`

与`Field`向下传递`$fieldutil`对象类似，`EasyField`也会向下传递一个`$fieldHandler`的对像。

`$fieldHandler`与`$fieldutil`是不同的，它是一个标准的包含`value` `onChange` `onFocus` `onBlur`四个属性的`data-entry`交互规范 API。当然，你也可以通过指定 `valuePropname` `changePropName` `focusPropName` `blurPropName` 属性来修改暴漏的接口方法属性名。

这意味着，所有支持这四个属性（或者部分支持）的组件，都可以嵌套/传递给`EasyField`使用！

```javascript
// $fieldHandler的默认结构。通过指定valuePropName changePropName或者passUtil属性，都会影响实际的$fieldHandler中的值。
// value 表单项的值
// onChange 值变动回调，更新值到表单控制器中
// onFocus 用来同步$focused状态
// onBlur 用来同步$focused $touched等状态
{
    value, onChange, onFocus, onBlur;
}
```

之所以会有这么一个`$fieldHandler`对象，是因为`Field`提供的`$fieldutil`太抽象，无法直接对接各种原生表单控件和第三方表单组件。而`$fieldHandler`则只包含标准的`value` `onChange` `onFocus` `onBlur`等属性，可以放心的直接传递给支持的组件。

`<EasyField />` 支持所有`<Field />`组件所接受的属性参数，可以用来指定该表单项的`name`、默认值、校验规则，以及使用`$parser` `$formatter`做值的过滤转换等。

它主要提供了两种调用方式：

#### `渲染原生表单控件`

`EasyField` 支持一个特殊的`type`属性，类似浏览器表单控件的`type`属性。如果传递了`type`属性，就默认会渲染浏览器原生控件。

当设置了 type 时，EasyField 将会尝试直接渲染浏览器表单元素。它支持以下类型：

-   `input[type=text]`
-   `input[type=number]`
-   `input[type=search]`
-   `input[type=password]`
-   `input[type=checkbox]`
-   `input[type=radio]`
-   `input[...]`
-   `select`
-   `textarea`
-   `group.radio`
-   `group.checkbox`

**EasyField 对亚洲语言（中文、韩文、日文）输入法在输入过程中的的字母合成做了处理**

一些调用示例：

##### `input`

事实上 type 值只要不是 `selct` `textarea` `checkbox` `radio` `group.xxx` 时都是渲染普通 input 输入框，并且 type 值会传给该 input。

```javascript
<EasyField name="name" type="text" />
<EasyField name="pwd" type="password" />
<EasyField name="email" type="email" />
<EasyField name="search" type="search" />
<EasyField name="number" type="number" />

<EasyField name="comment" type="textarea" cols="8" rows="10" />
```

##### `select`

下拉列表可以将后选项当作子节点直接传递就行，就像普通的 select 标签一样！

```javascript
<EasyField name="age" type="select">
    <option value="20">20</option>
    <option value="30">30</option>
</EasyField>
```

##### `checkbox/radio`

单选/多选还可以传递 `checked`、`unchekced` 属性，用来覆盖`选中`/`未选中`状态下所对应的值

```javascript
<EasyField name="agree" checked="yes" unchecked="no" type="checkbox" />
<EasyField name="agree" type="raido" />
```

##### `checkbox/radio group`

当 `type` 值为 `group.xxx` 为渲染输入控件组，当前仅支持`group.checkbox` `group.radio`。它会向函数式子节点传递 `GroupOption` 属性，用来渲染单个后选项。每个后选项的值通过 `$value` 属性指定。

此时支持额外的属性`groupNode`，默认为`'div'`，渲染一个空的 div 标签。`react@16`以上版本可以设置`groupNode={null}`来禁止渲染空的 div 节点

```javascript
<EasyField type="group.checkbox" name="targets" required validMessage={{ required: '请至少选择一项' }}>
    {({ GroupOption }) =>
        this.targets.map(item => (
            <label key={item.id} className="checkbox-inline">
                <GroupOption $value={item.id} className="checkbox" /> {item.name}
            </label>
        ))
    }
</EasyField>
```

#### `渲染自定义组件`

如果不指定`type`属性，那么 `EasyField` 将会尝试通过 `children | render | component` 三个属性来渲染你传递的自定义组件。

与`Field`向下传递`$fieldutil`对象类似，`EasyField`也会向下传递一个`$fieldHandler`的对象。

`$fieldHandler`与`$fieldutil`是不同的，它是一个标准的包含`value` `onChange` `onFocus` `onBlur`是个属性的`data-entry`交互规范 API。当然，你也可以通过指定 `valuePropname` `changePropName` `focusPropName` `blurPropName` 属性来修改暴漏的接口方法属性名。

这意味着，所有支持这四个属性（或者部分支持）的组件，都可以嵌套/传递给`EasyField`使用！比如前面我们提到的通过`type`属性来渲染原生表单控件，其实还可以这么调用：

##### `原生表单控件`

**普通文本输入**

```javascript
<EasyField name="username">
    <input type="text" />
</EasyField>

<EasyField name="pwd">
    <input type="password" placeholder="Password" />
</EasyField>

<EasyField name="select">
    <select>
        <option value="">Select</option>
        <option value="1">Option 1</option>
    </select>
</EasyField>
```

**渲染复选框**

因为`input[type=checkbox]`和`input[type=radio]`是通过节点的`checked`属性来访问其是否被选中的状态的，所以我们可以传递一个`valuePropName`，来表示从节点中收集该属性值，而不是`value`！

```javascript
<EasyField name="username" valuePropName="checked">
    <input type="chekcbox" />
</EasyField>
```

上述代码，拿到的值是`true`和`false`。如果希望能获取到其它值，我们可以象使用`Field`渲染时一样，只需要稍微改造下传递给`onChange`时的值就好了。比如这样：

```javascript
// 这里只是举例，实际中不推荐大家这么调用
// <EasyField type="checkbox" checked="yes" unchecked="no" />
<EasyField name="username">
    {({ onChange, value }) => (
        <input type="checkbox" checked={value === 'yes'} onChange={ev => onChange(ev.target.checked ? 'yes' : 'no')} />
    )}
</EasyField>
```

##### `列表数组`

从`0.5.5`起，`EasyField`新增支持`type="list"`，可以用来方便的实现列表数组表单，即将一组表单以数组形式组合渲染：

```javascript
[
    {
        username: 'xx',
        age: 18
    },
    {
        username: 'xx',
        age: 22
    }
    // ...
];
```

在该模式下，你需要传递一个`render props`形式的`children`，该函数中所渲染的表单将会被作为数组的值：

> **[查看在线示例](https://codesandbox.io/s/3yzr3r9qkq)**

```typescript
<EasyField name="relationships" type="list">
    {($listutil: $Listutil) => {
        return (
            <>
                <div className="relationship-item">
                    <EasyField name="relation" type="select">
                        <option value="">select</option>
                        <option value="0">Father</option>
                        <option value="1">Mother</option>
                    </EasyField>

                    <EasyField name="name" placeholder="The name" />

                    <button onClick={() => $listutil.$remove($listutil.$index)}>Delete</button>
                </div>
                {$listutil.$isLast() && (
                    <div className="relationship-toolbar">
                        <button onClick={() => $listutil.$push()}>Add new</button>
                    </div>
                )}
            </>
        );
    }}
</EasyField>
```

如上示例，你将会得到一个可以自由增删的列表形式表单，它将会渲染下面结构的`$params`：

```javascript
// $params =
{
    relationships: [
        {
            relation: '0',
            name: 'John'
        },
        {
            relation: '1',
            name: 'Clare'
        }
    ];
}
```

###### `$listutil`

当你传递一个`render props`函数时，它将会接受两个参数：

-   `$listutil` 为每个数组子表单的`$formutil`对象，另外扩展了一些其它用于列表渲染的方法
-   `$formutil` 为整个数组表单的`$formutil`对象

```javascript
// $listutil =
{
    ...$formutil, // 包含当前数组表单项的$formutil

    $length, // 数组表单项数量
    $index, // 当前表单的次序
    $insert(pos?: number, values?: object, callback?: Function), // 在pos位置新增，如果pos不指定，则为在当前列表末尾新增。如果指定values，则作为新增项的默认值
    $remove(pos?: number, callback?: Function), // 删除pos位置项，如果pos不指定，则为删除当前列表最后一项
    $push(values?: object, callback?: Function), // 在列表尾部新增。如果指定values，则作为新增项的默认值
    $pop(callback?: Function), // 删除列表最后一项
    $shift(callback?: Function), // 删除列表第一项
    $unshift(values?: object, callback?: Function) // 在列表前面增加。如果指定values，则作为新增项的默认值

    $isLast(), // 是否最后一项
    $isFirst(), // 是否第一项

    onFocus(), // $fieldHandler的onFocus回调，可以传递给渲染的Field组件，用来同步`$focused` `$touched`等状态
    onBlur()  // $fieldHandler的onBlur回调，可以传递给渲染的Field组件，用来同步`$focused` `$touched`等状态
}
```

你可以使用`$listutil`提供的方法，来渲染一些控制按钮，以控制列表项。但是需要注意以下几点：

-   列表数组无法删除为`0`，如果你尝试删除最后一项，那么会删除后自动创建一个新的项。
-   `children`方法会随着列表数组的数量渲染`n`次，你可以通过`$isFirst()` `$isLast()`方法判断是否是`第一项` `末项`，来控制一些不希望被多次重复渲染的内容：比如新增按钮

##### `第三方组件`

我们只需要通过 `children | render | component` 三个属性，来支持根据传递的`$fieldHandler`来渲染以及更新值就可以了。

社区提供了很多优秀的组件库，我们要使用他们也很简单。

例如，与 `ant-design` 进行交互：

```javascript
// antd的Input实现了标准的value onChange接口
import { Input, Switch } from 'antd';

<EasyField name="username">
    <Input />
</EasyField>;

<EasyField name="switch" $defaultValue={true}>
    <Switch />
</EasyField>;
```

与 `react-select` 进行交互：

```javascript
// react-select也实现了标准的value onChange接口
import Select from 'react-select';

// 因为Field默认值都是空字符串，react-select不接受字符串，所以我们传递默认值为空undefined
<EasyField name="react-select" $defaultValue={undefined}>
    <Select options={options} />
</EasyField>;
```

假如第三方的组件没有支持 `value` `onChange`等属性接口，那么也可以根据实际情况，通过指定`valuePropName` `changePropname`等或者通过给`children` 或 `render`传递渲染方法，然后在自定义方法里指定如何渲染即可：

```javascript
// 假设我们要使用TheThirdlyComponent这个组件渲染表单，但是其接受值的属性名为renderValue，值变动的回调属性名为onValueChange
<EasyField name="custom" valuePropName="renderValue" changePropName={onValueChange}>
    <TheThirdlyComponent />
</EasyField>;

// 也可以这样
<EasyField name="custom">
    {$handler => {
        return <TheThirdlyComponent renderValue={$handler.value} onValueChange={value => $handler.onChange(value)} />;
    }}
</EasyField>;
```

#### `name`

同`Field`的[`name`](#name)

#### `$defaultValue`

同`Field`的 [`$defaultValue`](#defaultvalue)

#### `$defaultState`

同`Field`的 [`$defaultState`](#defaultstate)

#### `$validators`

同`Field`的[`$validators`](#validators)。

但是请注意，**`EasyField`内置了一些常用的校验方法**，例如：

-   `required` 必填，如果是 group.checkbox，则必需至少选中一项 `required`
-   `maxLength` 。最大输入长度，支持 group.checkbox。有效输入时才会校验 `maxLength="100"`
-   `minLength` 最小输入长度，支持 group.checkbox。有效输入时才会校验 `minLength="10"`
-   `max` 最大输入数值，仅支持 Number 比较。有效输入时才会校验 `max="100"`
-   `min` 最小输入数值，仅支持 Number 比较。有效输入时才会校验 `min="10"`
-   `pattern` 正则匹配。有效输入时才会校验 `pattern={/^\d+$/}`
-   `enum` 枚举值检测。有效输入时才会校验 `enum={[1,2,3]}`
-   `checker` 自定义校验函数。`checker={value => value > 10 && value < 100 || '输入比如大于10小与100'}`

> 注：校验属性的值为 `null` 时表示不进行该校验

**小技巧**：你可以利用`checker`很便捷的完成自定义校验，不需要`validMessage` `$validators`：

```javascript
<EasyField checker={value => {
    if (!value) {
        return 'Required!';
    }

    if (value.length < 6) {
        return 'minlength: 6';
    }

    return true; // no error
}}
```

你可以通过直接给`EasyField`传递相应的校验规则标识符来启用对应的校验规则。

当你给`EasyField`传递`$validators`时，它会与内置的校验方法进行合并，并且会覆盖同名的默认校验方法。当内置的几种校验方法不能满足需求时，可以使用像`Field`的`$validators`属性一样指定自定义校验。

**如果你已经了解了默认支持 checker 校验属性，我们建议自定义校验逻辑都直接通过该方式实现**

#### `$validateLazy`

同`Field`的[`$validateLazy`](#validatelazy)

#### ~~`$asyncValidators`~~

同`Field`的[`$asyncValidators`](#asyncvalidators)

> **`v0.2.22` 起，建议直接使用 `$validators` 即可，`$validators` 也支持了异步校验。不建议单独使用 `$asyncValidators`。**

#### `$parser`

同`Field`的 [`$parser`](#parser)

`EasyField`默认启用了对字符串值过滤前后空格。如果你不需要这个特性，可以通过将该属性设置为`null`或者覆盖实现来关闭这个设置。

#### `$formatter`

同`Field`的 [`$formatter`](#formatter)

#### `defaultValue`

注意，这个是省略前面的`$`符号。如果与[`$defaultValue`](#defaultvalue)同时存在，则会被后者覆盖。

#### `validMessage`

**仅对使用内置校验规则有效。如果自定义校验要支持该属性，需要实现校验函数时支持该属性**

可以通过该属性，设置内置的校验方法的错误信息展示：

```javascript
<EasyField
    name="useraname"
    required
    maxLength="10"
    validMessage={{
        required: '必需填写',
        maxLength: '最多输入十个字符'
    }}
/>
```

#### `checked / unchecked`

**仅对指定了`type`值的原生控件渲染有效**

如果是 checkbox 或 radio，则可以设置该属性，表示选中/未选中所代表的值。默认为 true 和 false。

```javascript
//这里可以设置选中、未选中用yes和no表示
<label>
    <EasyField type="checkbox" name="remember" checked="yes" unchecked="no" /> 是否同意用户协议
</label>
```

#### `valuePropName` `changePropName` `focusPropName` `blurPropName`

当不设置 type 属性，而使用自定义渲染时，如果组件的值以及值变动触发的更新回调方法不是默认的 value、onChange、onFocus、onBlur，可以通过这些参数更改：

```javascript
function MyComponent({ current, onUpdate }) {
    return <button onClick={() => onUpdate(124)}>更新</button>;
}

<label>
    <EasyField component={MyComponent} valuePropName="current" changePropName="onUpdate" /> 是否同意用户协议
</label>;
```

#### `passUtil`

默认情况下，`EasyField`给自定义组件传递的属性中，不包括当前表单项组件的`$fieldutil`对象。

如果使用自定义组件时，如果需要访问当前 Field 的状态，可以通过设置该参数`true`，或者传入一个字符串，`EasyField` 会将`$fieldutil`通过该参数值传递给自定义组件：

```javascript
<EasyField name="custom" passUtil="$fieldutil">
    {({ $fieldutil, onChange, value }) => {
        return <input className={$fieldutil.$invalid ? 'has-error' : ''} onChange={onChange} value={value} />;
    }}
</EasyField>
```

### `<Form />`

`Form` 是一个标准的 react 组件，它的调用方法与 `Field` 类似。一个表单应当只具有一个顶层`Form`，它下面可以包含多个`Field`域。

`Form` 通过 [`$formutil`](#formutil-1) 来与其内部的各个`Field`做状态模型的注册、收集与同步。它会基于每个`Field`的`nmae`属性，来将其作用域下的所有的`Field`的状态模型，统一收集处理。

所有传递给 `Form` 组件或者函数，会在其 `props`/`arguments` 中接收到一个[`$formutil`](#formutil-1)对象，它提供了多种状态集合以及对表单的一些操作方法。例如

-   你可以通过`$formutil.$params` 拿到整个表单的输入值
-   你可以通过`$formutil.$invalid` 或 `$formutil.$valid` 来判断表单是否有误
-   你可以通过`$formutil.$errors` 来获取表单的错误输入信息

`$formutil`的更多解释请参考：[`$formutil`](#formutil-1)

`Form` 可以接收以下可选属性参数：

#### `render` | `component`

该属性为可选，当使用[function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)方式时，可以不传该属性。如果设置了该属性，则其会覆盖掉`function as child`方式。

如果`render` 和 `component` 同时存在，则后者会覆盖前者。

```javascript
<Form
    render={$formutil => {/* ... */} />}
/>

<Form
    component={MyForm}
/>
```

#### `$defaultValues`

> `0.5.4`起，`$defaultValues`也可以传递一个函数，该函数接收所有传递给 Form 的 props，然后返回的`{ [name]: defaultValue }`对象。类似`react-redux`中的`mapPropsToState`用法。

`$defaultValues` 可以通过传递一个 `{ [name]: defaultValue }`对象，或者传递一个返回 `{ [name]: defaultValue }`对象的函数，来将其作为表单的初始化值。

**`$defaultValues` 的优先级高于 Field 自身的 `$defaultValue` 设置。**

```javascript
<Form
    $defaultValues={{
        username: 'qiqiboy'
    }}>
    {$formutil => (
        /* const { $params, $invalid, $errors, ...others } = $formutil; */
        <div>
            <Field name="username">{props => <input />}</Field>
            <Field name="password">{props => <input />}</Field>
        </div>
    )}
</Form>;

// 或者使用withForm
withForm(MyForm, {
    $defaultValues(props) {
        return {
            username: props.username
        };
    }
});
```

#### `$defaultStates`

> `0.5.4`起，`$defaultStates`也可以传递一个函数，该函数接收所有传递给 Form 的 props，然后返回的`{ [name]: defaultState }`对象。类似`react-redux`中的`mapPropsToState`用法。

`$defaultStates` 可以通过传递一个 `{ [name]: defaultState }`对象，或者传递一个返回 `{ [name]: defaultState }`对象的函数，来将其作为表单的初始化状态

**`$defaultStates` 的优先级高于 Field 自身的 `$defaultState` 设置。**

```javascript
<Form
    $defaultStates={{
        username: {
            $dirty: true
        }
    }}>
    {$formutil => (
        /* const { $params, $invalid, $errors, ...others } = $formutil; */
        <div>
            <Field name="username">{props => <input />}</Field>
            <Field name="password">{props => <input />}</Field>
        </div>
    )}
</Form>;

// 或者使用withForm
withForm(MyForm, {
    $defaultStates(props) {
        return {
            username: props.usernameState
        };
    }
});
```

#### `$onFormChange`

该属性可传入一个函数，当表单的值有变动时，会触发该回调，新的\$formutil 对象和本次变动的新旧值的集合会依次以参数形式传递：

> 注意：
>
> 1.  该回调不是随用户修改同步触发，它随 react 的最新的一次渲染完成触发。
> 2.  请避免在该回调里不加条件的一直去变更表单项的值，否则可能陷入死循环（因为表单值变更即会导致该回调重新触发）。

```javascript
<Form $onFormChange={($formutil, newValues, preValues) => console.log($formutil, newValues, preValues)}>//...</Form>;

//当表单值有变更时，将会打印:
//$formutil
{
    $params: {},
    $states: {},
    $invalid: false,
    $valid: true,
    //...
    $setStates: () => {},
    $getField: () => {},
    //...
}
//newValues
{
    username: 'new value';
}
//preValues
{
    username: 'pre value';
}
```

#### `$validator`

> **注**：该属性为`v0.5.0`新增！

现在你可以通过`$validator`属性，来直接对整个表单值进行校验了。当表单值更新时，会调用该校验函数，然后根据其返回值更新表单的校验结果。

其函数签名如下([`如何使用typescript开发？`](#如何使用typescript开发))：

```typescript
($params: FormParams<Fields>, $formutil: $Formutil<Fields, Validators, WeakFields>) => FormValidateResult<Fields>;
```

**与`Field`的`$validators`有以下区别：**

-   `Form`的`$validator`仅当表单值有变动时才会调用，而`Field`的`$validators`则会每次更新`Field`的值时都会调用（即使前后两次值相同）。
-   `Form`的`$validator`是在表单值稳定下来后才会调用（异步），而`Field`的`$validators`则是与更新值是同步调用。
    -   **所以`$validator`非常适合用来校验那些互相依赖的字段，例如两次密码输入是否一致**
-   `Form`的`$validator`校验结果应当以`{ [ Field name ]: 'error message' }`形式返回，或者包在`promise`对象中以 rejected 状态返回。
    -   `{ username: 'error message', 'nestedObj.username': 'error message', nestedArray: [ 'error message' ] }`

例 1: 校验密码是否一致

```javascript
<Form
    $validator={$params => {
        if ($params.password !== $params.confirm_password) {
            return {
                password: 'The twice passwords are not equal.'
            };
        }
    }}
/>
```

例 2: 异步校验用户名是否重复

```javascript
<Form
    $validator={async function($params) {
        cosnt result = await asyncCheckUsername($params.username)
        if (result.isReplica) {
            throw {
                username: 'The username has exist.'
            }
        }
    }}
/>
```

例 3: 返回多个字段校验结果

```javascript
<Form
    $validator={$params => {
        const errors = {};

        if ($params.password !== $params.confirm_password) {
            errors.password = 'The twice passwords are not equal.';
        }

        if (isEmail($params.email) === false) {
            errors.email = 'Wrong email!';
        }

        return errors;
    }}
/>
```

**虽然我们提供了这个属性用于表单整体校验，但是我们依然建议校验应该基于每个`<Field />`进行来作为最佳实践！**

#### `$processer`

> **注**：该属性为`v0.5.0`新增！

`$processer` 可以用来对表单域项的`$state`做进一步的加工！**在这里对`$state`做的修改都将影响到最终的表单状态！所以请慎用！**

在`Form`控制器提取每个表单项的状态模型，汇总到`$formutil`中时，会将每个域的状态模型以及其`name`值传递给`$processer`函数，该函数可以对\$state 进行修改、加工!

但是，请注意，这里对`$state`的修改，不会影响到表单项的实际的状态模型！

```typescript
/**
 * @param $state: object 该表单域项的状态模型对象，{ $value, $valid, $invalid, $dirty, ... }
 * @param name: string 该表单域项的name，例如：'username'
 */
function $processer($state: FieldState<T>, name: string) {
    // process $state
}
```

**Form 在收集表单域的值时，是从`$state.$value`中获取的；但是如果`$value`不存在，或者其值是`undefined` && `$state.$dirty`也是`true`时，则会忽略该值！！**。

如果你了解以上信息，可以通过`$processer`方法，来对表单域的值做进一步的加工或过滤！

例如，当某些值不想被收集到`$params`中时，可以通过`$processer`来将其删除！

```javascript
// 将某些字段的对象值转换为字符串
<Form $processer={($state, name) => {
    // userInfo为一个对象值，我们将其转换为json字符串
    if (name === 'userInfo') {
        $state.$value = JSON.stringify($state.$value);
    }
}} />

// 过滤掉所有值为Null或者Undefined的字段
<Form $processer={($state) => {
    if ($value === undefined || $value === null) {
        // 删除该值
        delete $state.$value;
    }
}} />

// 强制所有的值都收集。通过将所有的$dirty都设置为true，来强制收集所有的值!
// 这里只是举例，实际中都不需要这么做！
<Form $processer={($state) => {
    $state.$dirty = true;
}} />
```

#### `$formutil`

`$formutil` 前面我们提到了，它是`Form`组件基于其组件树下的所有`Field`的状态模型，经过收集整理后返回的关于整个表单的状态模型集合。另外它也包含了一组用于操作整个表单的方法。

具体每个状态属性以及方法的解释，请参考：

##### `$new()`

获取最新的表单`$formutil`。这里可能会产生一个疑问：**为什么已经拿到了`$formutil`，还要再通过`$new()`再获取一次呢？**

这是因为`$formutil`是随着渲染，每次都时时生成的新对象，即 react 组件的前后两次渲染，拿到的`$formutil`其实都是所属渲染帧的快照！

当使用`withForm`高阶组件时，我们如果通过`this.props.$formutil`来访问，都是安全的，因为最新的`$formutil`都会通过组件的`props`传递过去。

但是，当我们通过`render props`方式（即通过`Form`的 render、children 属性传递[渲染函数](#render--component)），异步回调里获取的上下文中`$fomutil`则可能是之前的某个快照，并不是最新的，所以你获得的表单状态和值都可能是不正确的。

**错误的调用**

```javascript
<Form>
    {$formutil => {
        const onChange = ev => {
            // 延迟2s执行
            setTimeout(() => {
                const { $invalid, $params } = $formutil;
                // 这里的$formutil来自于回调函数所在作用域上下文中的$formutil
                // 它是`onChange`事件触发时的最后一次渲染的快照
                // 如果`onChange`触发，到延迟2s回调函数执行，表单又有变化的话，那么这里拿到的$formutil有可能就是和最新的表单状态不一致
            }, 2000);
        };

        return <EasyField name="user" onChange={onChange} required />;
    }}
</Form>
```

**正确的用法**

```javascript
<Form>
    {$formutil => {
        const onChange = ev => {
            // 延迟2s执行
            setTimeout(() => {
                const { $invalid, $params } = $formutil.$new();
                // 注意，这里通过 $formutil.$new() 获取即时的最新的 $formutil，这样子是绝对安全的用法。
                // 如果不确定该不该用 $formutil.$new()，那么请记住，总是使用$new()总是没错的！
                // ...
            }, 2000);
        };

        return <EasyField name="user" onChange={onChange} required />;
    }}
</Form>
```

##### `$getField(name)`

```typescript
// 其函数签名如下
$getField(name: string): undefined | $Fieldutil;
```

获取对 name 对应的表单项的[`$fieldutil`](#fieldutil)对象。

**只能获取到已注册的 Field，否则返回空**

##### `$validate(name)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$validate(name: string, callback?: ($formutil: $Formutil) => void): undefined | Promise<$formutil>;
```

立即校验对应 name 的表单项。

**只能对已注册的 Field 发起校验，并且返回 Promise 回调。否则返回空**

##### `$validates()`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
// 校验name说对应的Field
$validates(names: string | string[], callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
// 校验所有表单
$validates(callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以对单个表单域（`$valdiates('field')`，类似上面的`$validate()`）或者同时对多个表单域（`$validates(['field1', 'field2'])`），甚至整个表单所有 Field 进行校验（`$validates()`，不传 name 参数）。

对全部表单域进行校验，会同时触发`Field`的校验，以及`Form`的`$validator`校验（如果有的话），并且回调方法以及 Promise 回调都将在所有校验完成后！

##### `$onValidates()`

```typescript
// 其函数签名如下
// 0.5.1起，同时支持参数回调，以及Promise回调
$onValidates(callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

确保整个 Form 当前的校验已经完成，因为 Form 可能包含有异步校验，某些情况下，你可能需要在整个表单的校验完成后，再去执行一些操作，此时你可以通过该方法确认。

```typescript
// 例如，当绑定表单值变动事件时，如果需要确保本次变动导致的校验完成后，再进行操作，可以调用该方法
<Form $onFormChange={$formutil => $formutil.$onValiates().then(() => console.log('form validate complete'))} />
```

##### `$render(callback)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$render(callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

强制重新渲染表单组件，可以通过该方法的回调，在当前的渲染完成后回调

##### `$setStates($stateTree)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setStates($stateTree: { [name: string]: FieldState }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以用来更新表单项的状态：

```javascript
$formutil.$setStates({
    username: { $dirty: true, $pristine: false },
    'list[0].name': {
        //也可以像下方一样传入结构化对象
        $dirty: true,
        $pristine: false
    },
    list: [
        {
            name: {
                $dirty: true,
                $pristine: false
            }
        }
    ]
});
```

##### `$setValues($valueTree)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setValues($valueTree: { [name: string]: any }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以用来更新表单项的值：

```javascript
$formutil.$setValues({
    username: 'jack',
    'list[0].id': '123456', //也可以像下方一样传入结构化对象
    list: [
        {
            id: '123456'
        }
    ]
});
```

##### `$setErrors($errorTree)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setErrors($errorTree: { [name: string]: FieldError }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以用来设置表单的校验结果：

```javascript
$formutil.$setErrors({
    username: {
        required: '必填'
    },
    'list[0].id': {} //代表校验通过
});
```

##### `$reset($stateTree)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$reset($stateTree: { [name: string]: FieldState }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以用来重置表单，会将表单重置为初始状态（不会改变组件设置的默认状态和默认值）。如过传递了$stateTree，则会重置为合并了$stateTree 后的状态

```javascript
$formutil.$reset();
```

##### `$setDirts($dirtyTree) | $setTouches($touchedTree) | $setFocuses($focusedTree)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$setDirts($dirtyTree?: { [name: string]: boolean }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
$setTouches($touchedTree?: { [name: string]: boolean }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
$setFocuses($focusedTree?: { [name: string]: boolean }, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

可以用来更新表单控件的`$dirty`、`$touched`、`$focused`状态，类似`$setValues`

```javascript
$formutil.$setDirts({
    username: true,
    'list[0].id': false
});

$formutil.$setFocuses({
    username: true,
    'list[0].id': false
});
```

##### `$batchState($newState) | $batchDirty($dirty) | $batchTouched($touched) | $batchFocused($focused)`

```typescript
// 其函数签名如下
// 0.5.0起，同时支持参数回调，以及Promise回调
$batchState($newState: FieldState, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
$batchDirty($dirty: boolean, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
$batchTouched($touched: boolean, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
$batchFocused($focused: boolean, callback?: ($formutil: $Formutil) => void): Promise<$Formutil>;
```

批量更改所有表单项的状态

```javascript
$formutil.$batchState({
    $dirty: true,
    $pristine: false
});
$formutil.$batchDirty(true); //同上效果
$formutil.$batchTouched(true);
```

##### `$getFirstError()`

```typescript
// 其函数签名如下
$getFirstError(): undefined | string;
```

从表单的所有错误项中取出第一个错误描述

如果传递`name`参数，则为获取`name`对应的表单项的第一个错误信息！

```javascript
// 获取整个表单的第一个错误
$formutil.$getFirstError();

// 获取name值为username的Field的第一个错误
$formutil.$getFirstError('username');

//例如
const { $invalid, $getFirstError } = this.props.$formutil;
if ($invalid) {
    alert($getFirstError());
} else {
    // ...submit data
}
```

##### `$states | $weakStates`

所有表单项的状态集合。`$formutl.$state` 是以 `Field` 的 name 值经过路径解析后的对象，`$formutil.$weakState` 是以 `Field` 的 `name` 字符串当 key 的对象。

##### `$params | $weakParams`

所有表单项的 值`$value` 集合。`$formutil.$params` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakParams` 是以 `Field` 的 `name` 字符串当 key 的对象。

> **请注意：** 只有表单项的`$dirty`状态为`false`，或者其值`$value`不是`undefined`时，其值才会被收集解析道`$params`或者`$weakParams`中！
>
> 如果你希望调整该行为，可以通过[`$processer`](#processer)来调整表单对值的收集逻辑。

```javascript
$params = {
    username: 'qiqiboy',
    list: [{ name: 'apple' }, { name: 'banana' }]
};

$weakParams = {
    username: 'qiqiboy',
    'list[0].name': 'apple',
    'list[1].name': 'banana'
};
```

##### `$errors | $weakErrors`

所有表单项的 `$error` 集合。`$formutil.$errors` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakErrors` 是以 `Field` 的 `name` 字符串当 key 的对象。

```javascript
$errors = {
    username: {
        required: '必填'
    },
    list: [
        {
            name: {
                required: '必填'
            }
        },
        {
            name: {
                required: '必填'
            }
        }
    ]
};

$weakErrors = {
    username: {
        required: '必填'
    },
    'list[0].name': {
        required: '必填'
    },
    'list[1].name': {
        required: '必填'
    }
};
```

##### `$dirts | $weakDirts`

所有表单项的 `$dirty` 集合。`$formutil.$dirts` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakDirts` 是以 `Field` 的 `name` 字符串当 key 的对象。

##### `$touches | $weakTouches`

所有表单项的 `$touched` 集合。`$formutil.$touches` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakTouches` 是以 `Field` 的 `name` 字符串当 key 的对象。

##### `$focuses | $weakFocuses`

所有表单项的 `$focused` 集合。`$formutil.$focuses` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakFocuses` 是以 `Field` 的 `name` 字符串当 key 的对象。

##### `$valid | $invalid`

表单项中所有 `Field` 的`$valid` 均为 `true` 时，`$formutil.$valid` 为 `true`, `$formutil.$invalid` 为 false。表单项中有任意 `Field` 的`$valid` 为 `false` 时，`$formutil.$valid` 为 `false`, `$formutil.$invalid` 为 `True`。

##### `$dirty | $pristine`

表单项中所有 `Field` 的`$dirty` 均为 `false` 时，`$formutil.$dirty` 为 `false`, `$formutil.$pristine` 为 true。表单项中有任意 `Field` 的`$dirty` 为 `true` 时，`$formutil.$dirty` 为 `true`, `$formutil.$pristine` 为 `false`。

##### `$touched | $untouched`

表单项中所有 `Field` 的`$touched` 均为 `false` 时，`$formutil.$touched` 为 `false`, `$formutil.$untouched` 为 `true`。表单项中有任意 `Field` 的`$touched` 为 `true` 时，`$formutil.$touched` 为 `true`, `$formutil.$untouched` 为 `false`。

##### `$focused`

表单项中所有 `Field` 的`$focused` 均为 `false` 时，`$formutil.$focused` 为 `false`。表单项中有任意 `Field` 的`$focused` 为 `true` 时，`$formutil.$focused` 为 `true`。

### `withForm(Component)`

withForm 是基于 Form 封装的高阶组件，withForm 的第二个参数为可选配置，如过定义了该参数，会将配置传递给 Form 组件。

```javascript
class LoginForm extends Component {
    // ...
}

export default withForm(LoginForm, {
    $defaultValues: {} //该项将传递给Form组件
});
```

`withForm`同样支持装饰器语法

```javascript
@withForm
class MyField extends Component {}

//or pass some default props
@withForm({
    $defaultValues: {}
})
class MyField extends Component {}
```

### `connect(Component)`

connect 是一个高阶组件，它可以增强当前组件，并获取其最近的父辈级中的 Form 组件的 \$formutil 对象，并以 props 传递给当前组件。

在大表单拆分多个小组件的时候很有用，不用将\$formutil 再传来传去：

```javascript
import { connect } from 'react-formutil';
class Submit extends Component {
    submit = () => {
        //通过connect可以拿到 $formutil
        const { $formutil } = this.props;
        // ...
    };

    render() {
        return <button onClick={this.submit} />;
    }
}

export default connect(Submit);
```

```javascript
<Form>
    <div className="">
        <EasyField name="username" />
        <Submit />
    </div>
</Form>
```

### `Hooks`

[`Hooks`](https://reactjs.org/docs/hooks-intro.html) 是`react@16.8`开始，正式推出的新的组件开发 API。`react-formutil@0.5.0`开始，也提供了相关的适用与这一全新开发方式的相关`Hooks`。

**请注意**，与官方态度一样，`Hooks`并不是要对之前基于`class component`开发方式的否定，它是可选的、并且向后兼容，不会破坏目前任何基于现有`react-formutil`的项目正常运行。

**如果你要开始使用`Hooks`，请确保你已经安装了最新的`react-formutil@>0.5.0`以及`react@>16.8.0` `react-dom@>16.8.0`。**

全新的`Hooks`方法，位于`react-formutil/hooks`下（如果要使用新增的`useField` `useForm` hooks，必须从这里导出获取）。

你可以直接将项目中的，所有的从`react-formutil`的导出，全部改为从`react-formutil/hooks`导出（是的，所有你需要的组件、HOC、TS 类型定义等都可以从这里导出）。当然，这是一个建议，如果你这么做了，理论上可以减少一点构建体积`^_^`。如果没用到 hooks 的地方，依然保持目前的导出方式，依然没有问题！

#### `useField`

`useField` 可以用来获取或者生成一个新的[`$fieldutil`](#fieldutil)对象。它接受类似`Field`组件所有能接受的`props`参数：

```typescript
function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    name?: string,
    props?: Omit<FieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $Fieldutil<T, Validators, Fields, WeakFields>;

function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    props?: FieldProps<T, Validators, Fields, WeakFields>
): $Fieldutil<T, Validators, Fields, WeakFields>;
```

我们来尝试使用下`useField`。但是首先，假如我们要定义一个`Field`控件，它是个普通的`input`输入框，使用非`hooks`方法，大概长这样：

```javascript
import { Field } from 'react-formutil';

/**
 * 你可以直接将自定义组件的所有props直接传递给`Field`，这样你的自定义组件就可以变成一个标准的类`Field`组件,
 * 它可以接受任意的`Field`支持的属性值，例如`$defualtValue` `$validators`。
 *
 * <UserNameField name="username" $defaultValue="Lucy" />
 */
function UserNameField(props) {
    return (
        <Field {...props}>
            {$fieldutil => <input value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />}
        </Field>
    );
}
```

假如使用`useField`的话，会是什么样子呢？

```javascript
import { Field } from 'react-formutil/hooks'; // 请注意，这里的模块导入位置

function UserNameField(props) {
    const $fieldutil = useField(props);

    return <input value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />;
}
```

就是这么简单！上面的代码完全等效，但是明显使用`hooks`方式，更加简洁，没有`HOC`、没有`render props`，完全就是个普通的函数定义！

就像调用`Field`组件时，我们可以传递一些默认值、默认校验方法等，使用`useField`也可以这么做！

```javascript
function UserNameField({ name }) {
    const $fieldutil = useField(name, {
        $validators: {
            required(value) {
                return !!value || 'Required!';
            }
        }
    });

    return <input value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />;
}
```

#### `useHandler`

`useHandler`基于`EasyField`实现，会反馈传递的[`$fieldHandler`](#fieldhandler)对象。我们可以通过这个 hook 更方便使用和继承`EasyField`的功能与特性！！

这里还是以渲染一个用户输入为例：

```typescript
import { useHandler } from 'react-formutil/hooks';

function UserNameField(props) {
    const $handler = useHandler(props);

    return <input {...$handler} />;
}

/** 直接调用，并且利用EasyField的内置校验，要求必填，并且不能少于5个字符
<UserNameField
    name="username" 
    required
    minLength={5}
    validMessage={{ required: '请填写用户名!',maxLength: '用户名长度不能小于5个字符！' }}
/>
 */
```

是不是比上面使用`useField`更简单了呢？而且更厉害的是，直接也具有了支持`EasyField`内置校验规则的能力！！

#### `useForm`

`useForm`可以用来获取上下文中的[`$formutil`](#formutil-1)对象。请注意，与`useField`不同，这里只能获取当前组件所在的`Form`中的`$formutil`对象，而不能创建一个新的`Form`上下文！！它比较类似于`connect`高阶组件的作用！

> `useField`可以获取已经存在的其它`Field`的`$fieldutil`，如果没有，它会创建一个新的`$fieldutil`句柄

```javascript
import { Form, useForm } from 'react-formutil/hooks';

function UserInfoSubmitForm() {
    const $formutil = useForm();

    const onSubmit = function() {
        const { $invalid, $getFirstError } = $formutil;

        if ($invalid) {
            alert($getFirstError());
        } else {
            // submit data
        }
    };

    return <button className="btn-submit" onClick={onSubmit} />;
}

// 使用，必须位于<Form />组件，或者withForm()高阶组件所在的组件树中才能获取到！
<Form>
    {/*...*/}
    <Others>
        <UserInfoSubmitForm />
    </Others>
    {/*...*/}
</Form>;
```

## 最佳实践 Best Practices

`react-formutil`旨在提供一个`非强侵入性` `高度抽象` `方便迁移` `简化接入`的表单工具。正是由于下面的几点思考，才有了与众不同的`rect-formutil`！

-   一张表单只能有一个顶层 `<Form />` 或者 `withForm`。但是你可以通过将一个`<Form />`使用`<Field />`/`withField`包装后，使其变身为一个`Field`组件，来快捷复用以及嵌套表单使用！

    <hr/>

-   表单项`Field`应当是尽可能的做到`小粒度` `低耦合` `独立性`，保证其可复用性。例如表单校验，我们强烈建议通过`<Field />`的[`$validators`](#validators)来对每个`Field`配置校验规则，而不是统一在`Form`层面进行校验！！

    -   `$validators`对象也是可以复用的，你可以将所有的校验规则都放到一个`$validators`对象中，然后传递给所有的`<Field />`。但是不用担心这些规则会对所有`<Field />`生效。因为校验规则的生效，还需要对`<Field />`传递对应的校验规则标识符才会启用！
    -   我们知道其它很多表单库，或多或少，其文档、官方示例，甚至 API，都在推荐在`<Form />`层面对数据进行校验，但是我们认为这样会造成`Form`与`Field`的强耦合，不利于`Field`的组件复用！
    -   我们也提供了`<Form />`的[`$validator`](#validator)属性来在`<Form />`层面做校验，但是请注意，仅建议用于那些校验时其字段相互耦合依赖的表单，例如两次密码输入确认场景

    <hr/>

-   `Field`应当尽量保证对外渲染的值与接口接受到的值保持一致（包括类型、格式），对于复杂的`Field`数据收集，很多情况下，组件层面我们拿到的是`array`/`object`，但是接口可能需要 json 字符串。

    -   我们**不建议**在`submit`时再对数据进行转换，因为这导致视图与服务 server 的数据结构不一致，导致无论提交数据还是渲染 server 数据，都需要无穷无尽的数据转换。你可以通过以下办法对数据在表单层面进行加工转换
    -   第一种办法，对于自己封装的`Field`，应当在通过`$fieldutil.render()`在传递数据值时对值做好数据转换
    -   第二种办法，针对第三方封装的`Field`或者只是个别情况下，那么我们应当通过 [`$parser`](#parser)属性来指定`$viewValue`与`$modleValue`的转换（即视图数据到模型数据）
    -   如果你对前两种方法较为陌生，那么至少你应当通过`Form`的[`$processer`](#processer)属性对数据进行转换。

    <hr/>

-   `<Field />`的[`name`](#name)属性是支持深层路径索引（nested 嵌套）的，所以你可以善于利用其这一特性，方便的将值收集到对象或者数组中。

    <hr/>

-   大表单请尽可能进行拆分处理，将其转换为可以复用的`表单片段（即只包含相关性、相似性的一组Field）`，然后通过组合这些表单片段来达到复用或者优化大表单单一组件过大的问题。

    -   [`对于有大量表单项的长页面有没有优化办法`](#对于有大量表单项的长页面有没有优化办法)

    <hr/>

*   Typescript 开发中，对于`withField` `withForm` `connect`三个高阶组件调用，请使用`函数式调用`，避免`@decorator`装饰器语法，因为高阶组件会改变类签名，导致类型校验失败。

    -   通过`函数调用`方式使用提供的高阶组件，可以正确处理组件上挂在的`$fieldutil` `$formutil`类型声明，避免被当作必需属性。

    <hr/>

## FAQ & 常见问题解答

### `Field 与 EasyField 有什么区别`

`Field` 是抽象的底层，它本身不会渲染任何 dom 结构出来，它仅提供了同步、渲染表单控件的接口。要实现具体的表单，需要通过 Field，使用它提供的接口，手动实现监听用户输入、同步数据等工作（例如不会主动同步`$touched` `$focused` 状态）

`EasyField` 则是基于 `Field` 封装的另一个组件，它针对浏览器原生的表单控件，封装实现了数据同步、表单校验，可以简化调用。`EasyField` 会自动绑定 `change`、`focus`、`blur` 事件，并主动同步`$touched` `$untouched` `$focused`状态

### `Field中的 $value 与 $viewValue 有什么区别`

从`v0.5.0`起，Field 表单域中的状态模型中，新增了`$viewValue`。它与之前的`$value`的区别是：

-   `$value`表示的是表单域状态模型值，用来向`Form`同步。`$formutil`中的`$params`即为从每个`Field`中收集的`$value`集合！
-   `$viewValue`表示的是表单域的视图值，即视图中显示的值是根据该值显示的。它一般情况下都与`$value`相同，但是当我们自定义了`$parser` `$formatter`时，可能会导致两者不同。

当渲染视图时，应当根据`$viewValue`来渲染，否则会导致`$parser` `$formatter`属性失效（因为这两个属性就是处理`$value`与`$viewValue`的转换的，如果不想使用默认支持的这两个数据处理钩子，使用`$value`当然也没什么问题～）！

**为什么要做出这样的改动？**

这是因为 `v0.5.0` 之前的版本，只有一个状态模型值`$value`。经过`$parser`处理的值会直接更新到模型中，而视图也是根据模型中的值渲染的，这就会导致`$parser`进而影响到视图值的显示！

例如，当我们希望过滤用户输入的空格时，我们一般会通过`$parser`传递过滤函数：

```javascript
<Field name="user_name" $parser={value => value.trim()} />
```

但是，以上代码在`v0.5.0`之前的版本中，会导致用户完全无法输入空格：完全无法输入 `Jobs Smith`，中间的那个空格永远输入不上，因为一旦输入就会立即被`$parser`过滤掉，并且更新回视图中！

`v0.5.0`版本通过新增加的`$viewValue`，来将视图值单独存储，与原来的模型值`$value`做了区分。这样，就可以正常的输入 `Jobs Smith` 啦！

**副作用**

当然，这一改动也会导致`$parser`的某些用法产生与之前版本的预期不一致。

例如，当我们希望提供一个只能输入整数（其它字符直接不可输入）金额输入框时：

```javascript
<Field name="user_name" $parser={value => value.split(/[^\d]/g, '')} />
```

以上代码在`v0.5.0`之前的版本中，即可达到目的。因为`$parser`处理过后的值会被更新到状态模型中，视图也是根据这个过滤后的值渲染的，所以就可以直接实现禁止用户输入非整数字符。

但是在`v0.5.0`之后的版本中，视图根据`$viewValue`渲染的话，会导致状态模型中的值被正确处理了，但是视图中的值还是用户原始输入，即可能包含非法值。要实现过滤视图中显示的值，我们可以通过`$parser`提供的第二个回调参数`$setViewValue`来同步更新视图值：

```javascript
<Field name="user_name" $parser={(value, $setViewValue) => $setViewValue(value.split(/[^\d]/g, ''))} />
```

### `如何在我自己的项目中便捷的使用Field组件？`

`<Field />`组件本身的设计理念如果你已经了解后，那么一定会产生这样的疑问:

> 在我自己的项目中，每个表单控件都基于`Field`去写，处理状态与错误显示，有点太复杂、太啰嗦了。有没有更优化的方法？

答案当然是“有的”！

-   如果你在使用`ant-design`、`Material-UI`或者`react-boostrap`等第三方的 UI 库，你可以参考：[`如何在 ant-design 或者 Material-UI 等项目中使用 react-formutil?`](#如何在-ant-design-或者-material-ui-等项目中使用-react-formutil)
-   如果你对上面提到的`react-antd-formutil`、`react-material-formutil`等适配库的实现比较了解，你也可以参考其对你目前使用的 UI 组件库做适配！
-   如果你在使用团队自己对组件库，或者是个新接触`react-formutil`的新手，想快速实现项目中应用，请往下看

对于在使用自己私有（团队内部）表单 UI 组件或者实现的项目，我们这里提供了一个示例，通过封装一个`FormItem`来快速适配`bootstrap`框架提供的表单 UI：

**[Form Adaptor](https://codesandbox.io/s/14lr59rmlj)**

你可以点击上述链接来查看代码实现，以及运行效果！

### `checkbox 多选或 radio 单选组怎么实现`

可以直接 Field 实现，也可以使用 EasyField 实现（demo 都中有示例）：

```javascript
const hobbiesItems = [
    {
        id: 'music',
        name: '音乐'
    },
    {
        id: 'movie',
        name: '电影'
    },
    {
        id: 'ps4',
        name: 'ps4'
    }
];

<EasyField name="hobbies" type="group.checkbox">
    {props => (
        <div>
            {hobbies.map(item => (
                <label className="checkbox-inline" key={item.id}>
                    {/* props.GroupOption是每个候选项对应的input[checkbox]，必须渲染出来，并传递 $value */}
                    <props.GroupOption $value={item.id} />
                    {item.name}
                </label>
            ))}
        </div>
    )}
</EasyField>;
```

### `使用 Field 实现一个上传图片的表单控件`

假如我们需要在表单中插入一个按钮，用户需要点击按钮上传图片后，将图片地址同步到表单中

```javascript
import React from 'react';
import { Field } from 'react-formutil';
import uploadFile from './uplaodFile'; //上传文件的方法

//定义我们自己的表单控件组件
export default function FieldFile(props) {
    return (
        <Field {...props}>
            {$props => {
                const selectFile = function() {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.onchange = function() {
                        /* get file &upload */
                        const files = fileInput.files;
                        uploadFile(files).then(
                            fileUrl => {
                                //将文件地址更新到Field的状态中
                                $props.$render(fileUrl);
                            },
                            error => {
                                alert('upload fail');
                            }
                        );
                    };

                    fileInput.click();
                };

                return (
                    <div className="upload-image">
                        {$props.$value && <img src={$props.$value} className="preview" />}
                        <button onClick={selectFile}>{$props.$value ? '更改图片' : '上传图片'}</button>
                    </div>
                );
            }}
        </Field>
    );
}

/* ---------------------- 使用 -------------------- */

<div className="form-group">
    <label>点击上传头像</label>
    <FieldFile name="avatar" />
</div>;
```

### `如何获取对 Field 生成的节点的引用？`

可以通过 `$getField` 获取到一组 `handler` 方法，其中有 `$getComponent` 方法，可以获取到组件对象，然后再通过 `react-dom` 提供的 `findDOMNode` 来获取到对应的实际 dom 元素节点

```javascript
import { findDOMNode } from 'react-dom';

<Form>
    {$formutil => {
        function getNode(name) {
            return findDOMNode($formutil.$getField(name).$getComponent());
        }

        return <Field name="username">{/*...*/}</Field>;
    }}
</Form>;
```

### `对于有大量表单项的长页面有没有优化办法`

对于一个具有很多表单项、导致页面很大的表单，如果全部在一个组件里维护，会比较痛苦。幸运的事，使用 react-formutl 你可以很方便将大表单拆分成多个模块，既能减小大组件带来的维护难题，还能复用表单模块。

比如同时要收集用户的个人信息和工作信息，我们可以将其拆分为三个模块：

-   `Userinfo.js` 用户基本信心的字段
-   `Workinfo.js` 用户工作信息的字段
-   `Submit.js` 提交区域（因为只有在 Form 组件下级才能拿到\$formutil 信息）

注： Submit.js 和 Workinfo.js 合并到一起也是可以的。

```javascript
// Userinfo.js
import React from 'react';
import { EasyField } from 'react-formutil';

export default function Userinfo({ $formutil }) {
    //可以从props中获取$formutil
    return (
        <div className="userinfo-form">
            <h3>基本信息</h3>
            <EasyField name="name" placeholder="姓名" />
            <EasyField name="age" placeholder="年龄" />
            <EasyField name="sex" placeholder="性别" />
            <EasyField name="phone" placeholder="手机" />
        </div>
    );
}
```

```javascript
// Workinfo.js
import React from 'react';
import { EasyField } from 'react-formutil';

export default function Workinfo({ $formutil }) {
    //可以从props中获取$formutil
    return (
        <div className="workinfo-form">
            <h3>工作信息</h3>
            <EasyField name="company" placeholder="公司名称" />
            <EasyField name="job" placeholder="行业" />
            <EasyField name="work_address" placeholder="公司地址" />
        </div>
    );
}
```

```javascript
//Submit.js
export default function Submit({ $formutil }) {
    //可以从props中获取$formutil

    const postData = () => {
        const { $params, $invalid, $erros } = $formutil;
        // ... 更多处理
    };

    return (
        <div className="submit-area">
            <button disabled={$formutil.$invlid} onClick={postData}>
                提交
            </button>
        </div>
    );
}
```

```javascript
// EditInfoPage.js
import React from 'react';
import Userinfo from './Userinfo';
import Workinfo from './Workinfo';
import Submit from './Submit';
import { Form } from 'react-formutl';

export default function EditInfoPage() {
    //可以直接将拆分的模块以子组件放置在<Form />组件下（直接子组件，不可嵌套其它组件，否则可以使用下方的写法）
    return (
        <div className="editinfo-page">
            <Form>
                <Userinfo />
                <Workinfo />
                <Submit />
            </Form>
        </div>
    );

    /* 与下方写法等效 */

    return (
        <Form>
            {({ $formutil }) => (
                <div className="editinfo-page">
                    <Userinfo $formutil={$formutil} />
                    <Workinfo $formutil={$formutil} />
                    <Submit $formutil={$formutil} />
                </div>
            )}
        </Form>
    );

    /* 也可以使用 connect 高阶组件包装分拆的组件，然后就不必显式的传 $formutil */
    /**
     *  import { connect }  from 'react-formutil'
     *  class Submit extends Component {
     *      submit = () => {
     *          //通过connect可以拿到 $formutil
     *          const { $formutil } = this.props;
     *          // ...
     *      };
     *
     *      render() {
     *          return <button onClick={this.submit} />;
     *      }
     *  }
     *  export default connect(Submit);
     */
    return (
        <Form>
            <div className="editinfo-page">
                <Userinfo />
                <Workinfo />
                <Submit />
            </div>
        </Form>
    );
}
```

### `如何在 ant-design 或者 Material-UI 等项目中使用 react-formutil?`

在`ant-design`或`Material-UI`项目中使用 react-formutil 也非常简单，以 ant-design 为例：

```javascript
import React, { Component } from 'react';
import { EasyField, Field, withForm } from 'react-formutil';
import { Form, Input, Checkbox, DatePicker, Button } from 'antd';

//@decorator
@withForm
class MyForm extends Component {
    onSubmit = ev => {
        ev.preventDefault();

        const { $invalid } = this.props.$formutil;

        if ($invalid) {
            // some error
        } else {
            // submit data
        }
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                {/* use <Field /> */}
                <Field name="title">
                    {props => <Input value={props.value} onChange={ev => props.$render(ev.target.value)} />}
                </Field>

                {/* use <EasyField />, not need to sync data by set 'onChange' manual */}
                <EasyField name="username">
                    <Input placeholder="Username" />
                </EasyField>

                <EasyField name="password">
                    <Input type="password" placeholder="Password" />
                </EasyField>

                <EasyField name="remeber" $defaultValue={true} valuePropName="checked">
                    <Checkbox>remember me</Checkbox>
                </EasyField>

                {/* use <Form.Item /> */}
                <Form.Item label="Date">
                    <EasyField name="date" $defaultValue={null}>
                        <DatePicker />
                    </EasyField>
                </Form.Item>

                <Button block type="primary">
                    Submit
                </Button>
            </Form>
        );
    }
}
```

是的，你可以使用`Field`来手动绑定 onChange 来同步数据，也可以直接使用`EasyField`嵌套 `antd` 的组件即可，`EasyField`会自动绑定好相关数据同步。

为了更便捷的在各大流程组件库项目中使用`react-formutil`，我们也提供了针对各个组件库的优化封装组件：

-   [`react-antd-formutil`](https://github.com/qiqiboy/react-antd-formutil) [![npm](https://img.shields.io/npm/v/react-antd-formutil.svg?style=flat)](https://npm.im/react-antd-formutil)
-   [`react-material-formutil`](https://github.com/qiqiboy/react-material-formutil) [![npm](https://img.shields.io/npm/v/react-material-formutil.svg?style=flat)](https://npm.im/react-material-formutil)
-   [`react-bootstrap-formutil`](https://github.com/qiqiboy/react-bootstrap-formutil) [![npm](https://img.shields.io/npm/v/react-bootstrap-formutil.svg?style=flat)](https://npm.im/react-bootstrap-formutil)
-   [`react-md-formutil`](https://github.com/qiqiboy/react-md-formutil) [![npm](https://img.shields.io/npm/v/react-md-formutil.svg?style=flat)](https://npm.im/react-md-formutil)
-   and more...

你可以点击上方链接来了解更多。

如果你还觉得有其它优秀的组件库也需要提供针对性的组件优化，也可以提 issues。

### `如何使用typescript开发？`

`react-formutil@0.3.0` 起提供了针对`typescript`的`DefinitionTypes`声明文件，在开发中可能会用到的主要是以下几个：

-   `$Formutil<Field, Validators, WeakFields>` 整个表单的 `$formtutil` 类型声明
-   `$Fieldutil<T, Validators, Fields, WeakFields>` 单个表单项的 `$fieldutil` 类型声明
-   `Field<T, Validators, Fields, WeakFields>` Field 组件的类型声明
-   `FieldProps<T, Validators, Fields, WeakFields>` `Field` 组件的 props 类型声明
-   `EasyField<T, Validators, Fields, WeakFields>` `EasyField` 组件的类型声明
-   `EasyFieldProps<T, Validators, Fields, WeakFields>` `EasyField` 组件的 props 类型声明
-   `Form<Fields, Validators, WeakFields>` `Form` 组件的类型声明
-   `FormProps<Fields, Validators, WeakFields>` `Form` 组件的 props 类型声明

除了以上列出的，还有很多其它的类型定义，可以自行查看类型声明文件。

> `T` 是指值类型；<br/>`Validators` 是指表单的校验项结构；<br/>`Fields`是指表单的参数域结构；<br/>`WeakFields`是指扁平的`Fields`结构，默认等同于`Fields`。如果你的表单不使用深层结构，那么只需要提供`Fields`即可。
>
> `let IErrors: Validators = { required: true, maxLength: string }`  
> `let fields: Fields = { user: { name: string, age: number }, price: number }`  
> `let weakFields: WeakFields = { 'user.name': string, 'user.age': number, price: number }`

```typescript
import React, { Component } from 'react';
import { withForm, EasyField, $Formutil, $Fieldutil } from 'react-formutil';

// 定义整个表单的参数结构
interface IFields {
    name: string;
    age: number;
}

// 定义整个表单的校验结构
interface IErrors {
    required: string;
    max: string;
}

// 定义表单组件的props
// 因为我们使用了withForm高阶组件，所以我们需要声明$formutil这个对象
// 并且通过给 $Formutil 传递泛型参数，来明确整个$formutil对象中可以获取的表单相关结构信息
interface IProps {
    $formutil: $Formutil<IFields, IErrors>;
}

class UserForm extends Component<IProps> {
    componentDidMount() {
        // 可以调用$formutil对象
        this.props.$formutil.$setValues({
            name: 'xiao hong'
        });

        // 甚至可以访问错误信息结构
        console.log(this.props.$formutil.$errors.age.required);
    }

    render() {
        return (
            <form>
                {/* 这里类似上面声明IProps时传递了泛型参数，如果我们需要在EasyField属性配置中访问其对象信息，也需要提供泛型参数定义 */}
                <EasyField name="name" $onFieldChange={(newValue, oldValue, $formutil: $Formutil<IFields, IErrors>) => {
                    // 可以正常访问$formutil对象
                }} />

                {/* 这里我们定义该项的值为number类型，所以在渲染该值是需要做类型转换 */}
                <Field name="age">
                    { $fieldutil: $Fieldutil<number> => {
                            // console.log($fieldutil.$viewValue)
                            return <input onChange={ev => $fieldutil.$render(Number(ev.target.value))} value={$fieldutil.$viewValue} />
                        }
                    }
                </Field>
            </form>
        );
    }
}

export default withForm(UserForm)
```
