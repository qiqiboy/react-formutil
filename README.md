# react-formutil

[![npm](https://img.shields.io/npm/v/react-formutil.svg?style=flat)](https://npm.im/react-formutil)

Happy to build the forms in React ^\_^

`react-formutil` 定义了一种表单状态的收集、分发、同步模型。基于此，你可以很方便的使用 `react-formutil` 来创建、管理你的页面表单。

> #### react-formutil 的优势
>
> 1.  一切都是状态，$value、$diry/$pristine、$touched/$untouched、$valid/$invalid、$error 等都是状态
> 2.  非侵入性，只提供了对表单状态收集的抽象接口，不渲染任何 dom 结构
> 3.  采用受控组件和 context，对组件嵌套层级没有限制，支持数据双向同步（`model<->view`）
> 4.  支持高阶组件和函数式子组件（[function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)）式调用，更灵活
> 5.  具备灵活的表单校验方式，支持同步和异步校验
> 6.  规范的 jsx 语法调用，更符合 react 理念

<!-- vim-markdown-toc GFM -->

* [安装 Installation](#安装-installation)
* [使用 Usage](#使用-usage)
    - [`<Field />`](#field-)
        + [`render`](#render)
        + [`name`](#name)
        + [`$defaultValue`](#defaultvalue)
        + [`$defaultState`](#defaultstate)
        + [`$validators`](#validators)
        + [`$asyncValidators`](#asyncvalidators)
        + [`$onFieldChange`](#onfieldchange)
        + [`$state`](#state)
        + [`$value`](#value)
        + [`$dirty | $pristine | $touched | $untouched | $invalid | $valid | $focused | $pending`](#dirty--pristine--touched--untouched--invalid--valid--focused--pending)
        + [`$error`](#error)
        + [`$picker()`](#picker)
        + [`$reset()`](#reset)
        + [`$getComponent()`](#getcomponent)
        + [`$setState($newState)`](#setstatenewstate)
        + [`$render() | $setValue()`](#render--setvalue)
        + [`$setDirty($dirty) | $setTouched($touched) | $setFocused($focused) | $setValidity(errKey, result)`](#setdirtydirty--settouchedtouched--setfocusedfocused--setvalidityerrkey-result)
        + [`$setError($error)`](#seterrorerror)
        + [`$validate()`](#validate)
        + [`$$formutil`](#formutil)
    - [`withField(Component)`](#withfieldcomponent)
    - [`<EasyField />`](#easyfield-)
        + [`type`](#type)
        + [`name`](#name-1)
        + [`$defaultValue`](#defaultvalue-1)
        + [`$validators`](#validators-1)
        + [`$asyncValidators`](#asyncvalidators-1)
        + [`$parser`](#parser)
        + [`$formatter`](#formatter)
        + [`defaultValue`](#defaultvalue-2)
        + [`validMessage`](#validmessage)
        + [`checked / unchecked`](#checked--unchecked)
    - [`groupNode`](#groupnode)
    - [`<Form />`](#form-)
        + [`render`](#render-1)
        + [`$defaultValues`](#defaultvalues)
        + [`$defaultStates`](#defaultstates)
        + [`$onFormChange`](#onformchange)
        + [`$getField(name)`](#getfieldname)
        + [`$validate(name)`](#validatename)
        + [`$validates()`](#validates)
        + [`$render(callback)`](#rendercallback)
        + [`$setStates($stateTree)`](#setstatesstatetree)
        + [`$setValues($valueTree)`](#setvaluesvaluetree)
        + [`$setErrors($errorTree)`](#seterrorserrortree)
        + [`$reset($stateTree)`](#resetstatetree)
        + [`$setDirts($dirtyTree) | $setTouches($touchedTree) | $setFocuses($focusedTree)`](#setdirtsdirtytree--settouchestouchedtree--setfocusesfocusedtree)
        + [`$batchState($newState) | $batchDirty($dirty) | $batchTouched($touched) | $batchFocused($focused)`](#batchstatenewstate--batchdirtydirty--batchtouchedtouched--batchfocusedfocused)
        + [`$getFirstError()`](#getfirsterror)
        + [`$states | $weakStates`](#states--weakstates)
        + [`$params | $weakParams`](#params--weakparams)
        + [`$errors | $weakErrors`](#errors--weakerrors)
        + [`$dirts | $weakDirts`](#dirts--weakdirts)
        + [`$touches | $weakTouches`](#touches--weaktouches)
        + [`$focuses | $weakFocuses`](#focuses--weakfocuses)
        + [`$valid | $invalid`](#valid--invalid)
        + [`$dirty | $pristine`](#dirty--pristine)
        + [`$touched | $untouched`](#touched--untouched)
        + [`$focused`](#focused)
    - [`withForm(Component)`](#withformcomponent)
    - [`connect(Component)`](#connectcomponent)
* [FAQ & 常见问题解答](#faq--常见问题解答)
    - [`Field 与 EasyField 有什么区别`](#field-与-easyfield-有什么区别)
    - [`checkbox 多选或 radio 单选组怎么实现`](#checkbox-多选或-radio-单选组怎么实现)
    - [`使用 Field 实现一个上传图片的表单控件`](#使用-field-实现一个上传图片的表单控件)
    - [`如何获取对 Field 生成的节点的引用？`](#如何获取对-field-生成的节点的引用)
    - [`对于有大量表单项的长页面有没有优化办法`](#对于有大量表单项的长页面有没有优化办法)

<!-- vim-markdown-toc -->

## 安装 Installation

```bash
# npm
npm install react-formutil --save

# yarn
yarn add react-formutil
```

## 使用 Usage

先看一个简单的示例：

[Demo on codeSandbox.io](https://codesandbox.io/s/pm9ll05p8m)

如果上方地址无法访问或者较慢，也可以查看：[Demo on github pages](http://github.boy.im/react-formutil/demo/)

上面的示例简单展示了 `react-formutil` 的基本用法。当然这只是很简单的示例，更复杂的状态渲染，例如`$dirty`、表单验证等后面会具体讲到。这里想简单说下 `react-formutil` 的设计思路：

`react-formutil` 主要提供了一个 Field 组件和一个 Form 组件，另外还有几个基于此的高阶组件：

*   `Field` 组件主要用来负责和具体的表单控件做状态的同步，并向顶层的 `Form` 注册自身。虽然它是一个标准的 react 组件，但是可以把它理解成单个表单控件的 Provider。
*   `Form` 组件通过 `context` 提供了一些方法给 `Field` 组件，并且它增强了传递过来的子组件，向其传递了整个表单的状态。Form 可以理解为整个表单页面的 Provider。
*   `withField` 是基于 `Field` 包装成高阶组件，方便习惯高阶方式的调用
*   `withForm` 是基于 `Form` 包装成高阶组件，方便习惯高阶方式的调用
*   `EasyField` 是基于 `Field` 进行的组件封装，方便直接调用浏览器原生控件去生成表单(可以参考 demo 中的例子)
*   `connect` 是个高阶组件，用来给被包装的组件传递`$formutil` 对象，以供调用，返回的新组件必须位于某个 Form 组件的孙子辈才可以拿到`$formutil`

`react-formutil` 不像很多你能看到的其它的 react 表单库，它是非侵入性的。即它并不要求、也并不会强制渲染某种固定的 dom 结构。它只需要提供 `name` 值以及绑定好 `$render` 用来更新输入值，然后一切就会自动同步、更新。

> 需要强调，当使用 Field 和 Form 时，我们建议以函数作为子节点方式调用: [function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)
>
> 当然，你也可以通过`render`属性来调用：[render props](https://reactjs.org/docs/render-props.html)

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

//当然也可以传递普通组件作为子节点
//Field组件写在loginForm这个组件中
<Form>
    <LoginForm />
</Form>
```

### `<Field />`

`Field` 是一个标准的 react 组件。它可以理解为表单控件的顶层组件，它可以同步表单控件的状态。每一个表单控件应该总是当作 `Field` 组件的子组件嵌套。

`Field` 可以以函数、或者 React 组件当作子组件调用，推荐使用函数。

`Field` 可以接收以下几个属性参数：

#### `render`

该属性为可选，当使用[function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)方式时，可以不传该属性。
如果设置了该属性，则其会覆盖掉`function as child`方式。

```javascript
<Field name="username" render={props => <input />} />
```

#### `name`

该项必填，`name` 可以是一个简单的字符串，也可以是一个字符串表达式（该表达式执行没有 `scope`, 所以表达式中不能存在变量）

*   `<Field name="username" />`
*   `<Field name="list[0]" />`
*   `<Field name="list[1].name" />`
*   `<Field name="list[2]['test' + 124]" />`

以上都是合法的 `name` 值。对于多层级的 `name` 值，生成的表单参数对象，也会基于该对象层级创建。例如，上面的示例，将会生成以下格式的表单参数对象：

```json
{
    "username": "",
    "list": ["", { "name": "" }, { "test124": "" }]
}
```

#### `$defaultValue`

该属性可以设置表单控件的默认值/初始值。如过不传递该参数，则默认值都为空字符串。通过该属性，你可以指定某个表单控件的默认值或初始值。

*   `<Field $defaultValue="username" />`
*   `<Field $defaultValue={{name: 'dog'}} />`

`$defaultValue` 可以是任意类型值。

#### `$defaultState`

该属性可以覆盖表单控件的的默认状态，类型必需是`key: value`简单对象：

```javascript
<Field $defaultState={{ $value: 'username' }} />
<Field $defaultValue="username" />
```

上面两者等效，其实表单控件的值只是状态里的一个字段`$value`

#### `$validators`

该属性可以设置表单控件的校验方式，它是 `key: value` 的对象形式，key 为校验类型标识，value 为校验函数。仅当校验函数返回 true 时，表示该项校验通过，否则其他值将会被当作错误信息保存到状态中。

仅仅设置了`$validators`，并不会触发校验，还需要设置匹配`$validators`中每一项的属性标识符，该属性的值会作为第二个参数传递给校验函数。

校验被调用，会传入三个值：value、attr、props

*   value 为当前 Field 的值
*   attr 为校验标识值
*   props 为当前传给 Field 的所有 props，还包括当前 Field 所属 Fom 的$formutil

```javascript
<Field
    required
    maxLength="5"
    disableChar="z"
    $validators={{
        required: value => !!value || '该项必填',
        maxLength: (value, len) => value.length <= parseInt(len) || '最少长度：' + len,
        disableChar: (value, char) => value.indexOf(char) === -1 || '禁止输入字符：' + char,
        /* 注意：下面这条规则将不会触发校验，因为我们没有给Field传递 minNumber 属性来表示需要去校验该条规则 */
        minNumber: (value, limit) => value > parseFloat(limit) || '输入值必需大于：' + limit
    }}>
    {props => (
        <div className="form-group">
            <label>密码</label>
            <input type="number" onChange={ev => props.$render(ev.target.value.trim())} value={props.$value} />
            {props.$invalid && <div className="error">{object.values(props.$error)[0]}</div>}
        </div>
    )}
</Field>
```

在这个例子中，我们通过$validators 设置了 `required` 、 `maxLength` 以及 `disabledChar` 的校验规则。同时通过属性 `props` 表示了需要校验这三个字段。然后我们可以通过状态判断将错误信息展示出来。

#### `$asyncValidators`

该属性可以设置表单项的异步校验规则，设置方式与`$validators`类似。但是不同的是，异步校验函数需要返回`promise`对象，该`promise`被`resolve`表示校验成功，`reject`表示校验失败，并且`reject`的`reason`会被当作失败原因保存到状态的`$error`对象。

异步校验时，状态里会有`$pending`用来表示正在异步校验。

```javascript
<Field
    required
    isAccountExist
    $asyncValidators={{
        isAccountExist: value =>
            http.post('/api/v1/check_account', { account: value }).catch(error => Promise.reject(error.message))
    }}>
    {/* ... */}
</Field>
```

#### `$onFieldChange`

由于 react 的渲染是异步的，所以如果存在交叉验证，例如 A 控件依赖于 B 控件的值去校验自身，那么这种情况下，B 的值变更并不会导致 A 立即去应用新的值去校验。所以这种情况下，可以通过该属性设置回调，主动去触发校验 A 控件。

> 注意：
>
> 1.  该回调并不会在调用 `$render` `$setValues` 等更新表单值的方法后立即触发，它会随着最新的一次 react 渲染执行。也正因为此，所以才能拿到变更后的表单的值和状态。
> 2.  仅当当前 `Field` 的值（状态里的`$value`）有变动时才会触发，其他状态例如`$diry` `$touched` 等变化不会触发。
> 3.  如果需要访问 DOM Event，请使用 `onChange` 即可。
> 4.  不要在该回调里再次修改当前 Field 的值，否则会陷入死循环（修改该 Field 的其它状态或者修改其它 Field 的值是安全的）。

```javascript
//在B的值变更并且渲染完毕后，主动再次要求A组件进行一次校验
<Field name="B" $onFieldChange={(newValue, preValue) => $formutil.$getField('A').$validate()}>
    //...
</Field>
```

#### `$state`

Field 会维护一个状态树，以及一些方法，并且会将状态和方法合并一起通过参数或者组件传递给 Field 的子组件：

```js
{
    $value: "", //表单值
    $dirty: false, //是否修改过表单项
    $pristine: true, //与$dirty相反
    $touched: false, //是否接触过表单
    $untouched: true, //与$touched相反
    $focused: false, //是否聚焦到当前输入
    $valid: true, //表单项校验结果是否通过
    $invalid: false, //与$valid相反
    $error: {}, //表单校验错误信息
    $pending: false, //异步校验时该值将为true

    /*** 上面是状态，下面是可用方法 ***/

    $pickr: () => $state, //返回当前状态树
    $reset: ($newState) => $state, //重置为初始状态, $newState存在的话，会做一个合并
    $getComponent: (name) => FieldComponent, //返回Field组件实例

    $render: (value, callback) => {}, //更新表单值，callback可选，会在组件更新后回调
    $setValue: value => {}, //同$render，只是个别名
    $setDirty: $dirty => {}, //设置$dirty装态
    $setTouched: $touched => {}, //设置$touched装态
    $setFocused: $focused => {}, //设置$focused装态
    $setState: $newState => {} //直接更新状态，其实上面的几个方法都是基于$setState
    $setValidity: ($key, $valid) => {} //设置校验， $valid为true代表校验通过，其它值表示校验失败，并当作错误原因
    $setError: ($error) => {} //直接设置错误状态
    $validate: () => {} //触发再次校验
```

该对象会传递给子组件，子组件可以利用其中的方法来同步、修改表单状态：

*   用户输入时需要通过调用`$render`来更新新值到状态中
*   渲染表单项时，应该使用受控组件，根据 `$value` 来渲染
*   错误信息和校验状态可以通过 `$dirty` `$invalid` `$error`来渲染

> **需要强调的是，Field 默认不同步`$touched`/`$untouched`、`$focused` 状态，只有`$dirty`/`$pristine`会自动同步（首次调用`$render`会自动同步`$dirty`状态）**
> 如果你需要其它状态，需要自己去绑定相关事件来更新状态：

```javascript
<Field name="username">
    {props => (
        <input
            onChange={ev => props.$render(ev.target.value)}
            onFocus={ev => props.$setFocused(true)}
            onBlur={ev => props.$setTouched(true) && props.$setFocused(false)}
        />
    )}
</Field>
```

更多解释

#### `$value`

Field 的值实际是保存在状态里的该字段中，

#### `$dirty | $pristine | $touched | $untouched | $invalid | $valid | $focused | $pending`

Field 的一组状态：

*   $dirty 控件被修改过
*   $pristine 控件没有被修改过，与$dirty 互斥
*   $touched 控件失去过焦点
*   $untouched 控件没有失去过焦点
*   $focused 焦点是否在当前控件
*   $pending 是否正在进行异步检查
*   $valid 表单所有控件均校验通过
*   $invalid 表单中有至少一个控件校验不通过

#### `$error`

Field 的错误信息

#### `$picker()`

返回 Field 的纯粹状态（不包含任何下方的方法）

#### `$reset()`

重制当前 Field 为初始状态

#### `$getComponent()`

获取 Field 的实例对象（虚拟 dom）

#### `$setState($newState)`

```javascript
$setState({
    $dirty: true,
    $value: '124'
});
```

设置新的$state，$newState 会与当前$state 合并

#### `$render() | $setValue()`

设置渲染 Field 的值（保存到$value 中）

#### `$setDirty($dirty) | $setTouched($touched) | $setFocused($focused) | $setValidity(errKey, result)`

```javascript
$setDirty(true);
$setTouched(true);
$setFocused(true);
$setValidity('required', '必需填写'); //第二个参数不为true，则表示校验失败，并当作错误描述
$setValidity('required', true); //表示校验通过
```

设置$dirty $touched $error 等状态

#### `$setError($error)`

替换$error

```javascript
$setError({
    required: '必需填写',
    maxLength: '不能超过10个字符'
});
```

#### `$validate()`

重新校验当前 Field

#### `$$formutil`

当前 Field 所属的 Form 的$formutil 对象包含了整个表单的状态以及一些操作方法，具体可以参考下方 Form 说明。

> 特别注意，这里`$$formutil`是双$符号打头

```javascript
<Field name="username">
{ props => <input onChange={ev => props.$render(ev.target.value)} onFocus={ev => props.$$formutil.$validates()} />
</Field>
```

### `withField(Component)`

`withField` 是一个高阶组件，与 `Field` 的区别是调用方式的不同。withField 的第二个参数为可选配置，如过定义了该参数，会将配置传递给 Field 组件。一般情况下建议通过 `Field` 组件去构造表单。如果你需要自定义一个复杂的表单项控件，则可以使用该高阶组件：

```javascript
import React from 'react';
import { withField } from 'react-formutil';

class FieldCustom extends React.Component {
    onChange = ev => this.props.$render(ev.target.value);

    render() {
        return <input onChange={this.onChange} value={this.props.$value} />;
    }
}

export default withField(FieldCustom, {
    $defaultValue: '' //该项将传递给Field组件
});
```

### `<EasyField />`

`EasyField` 是使用 Field 对浏览器原生常见表单空间进行的组件封装，包含了常见的表单类型支持以及常用校验方法的封装（参考下方的`$validators`说明），方便直接调用。

它只会生成默认的表单控件，没有其他额外的 dom 元素，支持的类型如下：

*   `input[type=text]`
*   `input[type=number]`
*   `input[type=search]`
*   `input[type=password]`
*   `input[type=checkbox]`
*   `input[type=radio]`
*   `select`
*   `textarea`
*   `group.radio`
*   `group.checkbox`

事实上，支持任何的 input 元素。并且 EasyField 除了会绑定 onChange 事件来同步输入值，也会绑定 onFocus、onBlur 事件来主动同步`$touched` `$untouched` `$focused`状态。所以无需额外的工作，你就可以方便的使用这些状态来优化你的表单显示。

> EasyField也对亚洲语言（中文、韩文、日文）输入法在输入过程中的的字母合成做了处理

它接收以下属性参数：

#### `type`

除了`select` `checkbox` `radio` `textarea` `group.checkbox` `group.radio`，其他都是渲染默认的 input，type 会原封不动传给 input。

当 `type="select"` 时，还需要设置 option 子节点：

```javascript
<EasyField name="age" type="select">
    <option value="20">20</option>
    <option value="30">30</option>
</EasyField>
```

当 `type="group.checkbox"` `type="group.radio"` 等以 `group.`开头的类型时，需要设置 child 渲染方式，类似 Field 组件调用，建议使用函数式 child。EasyField 会传递包含 Field 属性的 props 给 child 组件(注意，这里的 Field 是指渲染出表单控件的 Field 组件对象，与前面的 Field 完全不同，只是刚好同名)，然后你可以自由定义控件的渲染方式：

在 EasyField 的 child 回调渲染中，必须传递 $value 给 Field：

```javascript
<EasyField type="group.checkbox" name="targets" required validMessage={{ required: '请至少选择一项' }}>
    {({ Field }) =>
        this.targets.map(item => (
            <label key={item.id} className="checkbox-inline">
                <Field $value={item.id} className="checkbox" /> {item.name}
            </label>
        ))
    }
</EasyField>
```

#### `name`

同`Field`的`name`

#### `$defaultValue`

同`Field`的`$defaultValue`

#### `$validators`

同`Field`的`$validators`。EasyFiled 内置了以下集中校验支持：

*   `required` 必填，如果是 group.checkbox，则必需至少选中一项 `required`
*   `maxLength` 。最大输入长度，支持 group.checkbox。有效输入时才会校验 `maxLength="100"`
*   `minLength` 最小输入长度，支持 group.checkbox。有效输入时才会校验 `minLength="10"`
*   `max` 最大输入数值，仅支持 Number 比较。有效输入时才会校验 `max="100"`
*   `min` 最小输入数值，仅支持 Number 比较。有效输入时才会校验 `min="10"`
*   `pattern` 正则匹配。有效输入时才会校验 `pattern={/^\d+$/}`
*   `enum` 枚举值检测。有效输入时才会校验 `enum={[1,2,3]}`
*   `checker` 自定义校验函数。`checker={value => value > 10 && value < 100 || '输入比如大于10小与100'}`

> 注：校验属性的值为 `false`或`空` 时(例如 `required={false|null|undefined}`) 表示不进行该校验

内置的校验规则无需再次声明，除非规则不符合预期，需要替换，则可以通过`$validators` 传递同名校验方法即可替换默认的。另外，内置的校验规则，如果校验不通过，会尝试去 `validMessage` 匹配错误信息。

```javascript
<EasyField name="useraname" required maxLength="10" minLength="3" max="100" min="10" pattern={/^\d+^/} />
```

#### `$asyncValidators`

同`Field`的`$asyncValidators`

#### `$parser`

在输入值更新到 state 中时会传递给 $parser 处理函数。默认为 `value => value`

#### `$formatter`

在 state 中的值渲染给表单控件时会传递给 $formatter 处理函数。默认为 `value => value`

```javascript
<EasyField name="age" $parser={value => Number(value)} $formatter={value => String(value)} />
```

#### `defaultValue`

注意，这个是省略前面的`$`符号。如果与`$defaultValue`同时存在，则会被后者覆盖。

#### `validMessage`

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

如果是 checkbox 或 radio，则可以设置该属性，表示选中/未选中所代表的值。默认为 true 和 false。

```javascript
//这里可以设置选中、未选中用yes和no表示
<label>
    <EasyField type="checkbox" name="remember" checked="yes" unchecked="no" /> 是否同意用户协议
</label>
```

### `groupNode`

如果是 `group.checkbox` 或者 `group.radio` 类型，默认会渲染一个div节点。如果不希望渲染该div节点，可以通过`groupNode={null}`来禁用。

当然，`groupNode`属性还可以是其它节点，例如：`groupNode="section"`；甚至可以是自定义组件：`groupNode={MyCustomComponent}`。

### `<Form />`

`Form` 也是一个标准的 react 组件，它类似 Field，同样可以以函数、或者普通组件当作子组件调用。它可以增强子组件，收集子 dom 树中的 `Field` 组件状态，并通过$formutil 传递给被调用组件。

经过 `Form` 增强的组件，会在其 `props` 中接收到一个`$formutil`对象。例如

*   你可以通过`$formutil.$params` 拿到整个表单的输入值
*   你可以通过`$formutil.$invalid` 或 `$formutil.$valid` 来判断表单是否有误
*   你可以通过`$formutil.$errors` 来获取表单的错误输入信息

`Form` 可以接收以下可选属性参数：

#### `render`

该属性为可选，当使用[function as child](https://reactjs.org/docs/render-props.html#using-props-other-than-render)方式时，可以不传该属性。
如果设置了该属性，则其会覆盖掉`function as child`方式。

```javascript
<Form
    render={$formutil => {/* ... */} />}
/>
```

#### `$defaultValues`

`$defaultValues` 可以通过这里批量设置表单的默认值，格式为 `{ name: value }`（如果设置对应的值，会覆盖 Field 中的 defautlValue 设置）

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
</Form>
```

#### `$defaultStates`

`$defaultStates` 可以通过这里批量设置表单的默认状态，格式为 `{ name: $state }`（如果设置对应的值，会覆盖 Field 中的 defautlValue 设置）

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
</Form>
```

#### `$onFormChange`

该属性可传入一个函数，当表单的值有变动时，会触发该回调，新的$formutil 对象和本次变动的新旧值的集合会依次以参数形式传递：

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

更多解释参考：

#### `$getField(name)`

获取对 name 对应的表单项的操作引用，可以获取到包含以下方法的对象：

```javascript
const {
    $picker(){}, //返回当前$state
    $validate(){}, //重新校验
    $reset($state){}, //重置表单项状态
    $getComponent(){}, //获取Field组件的引用
    $setState,
    $setValue,
    $setDirty,$setTouched,$setValidity,$setError
} = $formutil.$getField('list[0].name'); //name支持表达式字符串
```

#### `$validate(name)`

立即校验对应 name 的表单项

#### `$validates()`

重新校验所有的表单项

#### `$render(callback)`

强制重新渲染表单组件，可以通过该方法的回调，在当前的渲染完成后回调

#### `$setStates($stateTree)`

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

#### `$setValues($valueTree)`

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

#### `$setErrors($errorTree)`

可以用来设置表单的校验结果：

```javascript
$formutil.$setErrors({
    username: {
        required: '必填'
    },
    'list[0].id': {} //代表校验通过
});
```

#### `$reset($stateTree)`

可以用来重置表单，会讲表单重置为初始状态（不会改变组件设置的默认状态和默认值）。如过传递了$stateTree，则会重置为合并了$stateTree 后的状态

```javascript
$formutil.$reset();
```

#### `$setDirts($dirtyTree) | $setTouches($touchedTree) | $setFocuses($focusedTree)`

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

#### `$batchState($newState) | $batchDirty($dirty) | $batchTouched($touched) | $batchFocused($focused)`

批量更改所有表单项的状态

```javascript
$formutil.$batchState({
    $dirty: true,
    $pristine: false
});
$formutil.$batchDirty(true); //同上效果
$formutil.$batchTouched(true);
```

#### `$getFirstError()`

从表单的所有错误项中取出第一个错误描述

```javascript
$formutil.$getFirstError();

//例如
const { $invalid, $getFirstError } = this.props.$formutil;
if ($invalid) {
    alert($getFirstError());
} else {
    // ...submit data
}
```

#### `$states | $weakStates`

所有表单项的状态集合。`$formutl.$state` 是以 `Field`i 的 name 值经过路径解析后的对象，`$formutil.$weakState` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### `$params | $weakParams`

所有表单项的 值`$value` 集合。`$formutil.$params` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakParams` 是以 `Field` 的 `name` 字符串当 key 的对象。

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

#### `$errors | $weakErrors`

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

#### `$dirts | $weakDirts`

所有表单项的 `$dirty` 集合。`$formutil.$dirts` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakDirts` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### `$touches | $weakTouches`

所有表单项的 `$touched` 集合。`$formutil.$touches` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakTouches` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### `$focuses | $weakFocuses`

所有表单项的 `$focused` 集合。`$formutil.$focuses` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakFocuses` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### `$valid | $invalid`

表单项中所有 `Field` 的`$valid` 均为 `true` 时，`$formutil.$valid` 为 `true`, `$formutil.$invalid` 为 false。表单项中有任意 `Field` 的`$valid` 为 `false` 时，`$formutil.$valid` 为 `false`, `$formutil.$invalid` 为 `True`。

#### `$dirty | $pristine`

表单项中所有 `Field` 的`$dirty` 均为 `false` 时，`$formutil.$dirty` 为 `false`, `$formutil.$pristine` 为 true。表单项中有任意 `Field` 的`$dirty` 为 `true` 时，`$formutil.$dirty` 为 `true`, `$formutil.$pristine` 为 `false`。

#### `$touched | $untouched`

表单项中所有 `Field` 的`$touched` 均为 `false` 时，`$formutil.$touched` 为 `false`, `$formutil.$untouched` 为 `true`。表单项中有任意 `Field` 的`$touched` 为 `true` 时，`$formutil.$touched` 为 `true`, `$formutil.$untouched` 为 `false`。

#### `$focused`

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

### `connect(Component)`

connect 是一个高阶组件，它可以增强当前组件，并获取其最近的父辈级中的 Form 组件的 $formutil 对象，并以 props 传递给当前组件。

在大表单拆分多个小组件的时候很有用，不用将$formutil 再传来传去：

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

## FAQ & 常见问题解答

### `Field 与 EasyField 有什么区别`

Field 是抽象的底层，它本身不会渲染任何 dom 结构出来，它仅提供了同步、渲染表单控件的接口。要实现具体的表单，需要通过 Field，使用它提供的接口，手动实现监听用户输入、同步数据等工作（例如不会主动同步$touched $focused 状态）

EasyField 则是基于 Field 封装的另一个组件，它针对浏览器原生的表单控件，封装实现了数据同步、表单校验，可以简化调用。EasyField 会自动绑定 change、focus、blur 事件，并主动同步`$touched` `$untouched` `$focused`状态

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
                    {/* props.Field是每个候选项对应的input[checkbox]，必须渲染出来，并传递 $value */}
                    <props.Field $value={item.id} />
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

*   `Userinfo.js` 用户基本信心的字段
*   `Workinfo.js` 用户工作信息的字段
*   `Submit.js` 提交区域（因为只有在 Form 组件下级才能拿到$formutil 信息）

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
