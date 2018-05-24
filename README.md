# react-formutil

a controlled React component to make it easy for create the form.

`react-formutil` 定义了一种表单状态的收集、分发、同步模型。基于此，你可以很方便的使用 `react-formutil` 来创建、管理你的页面表单。

## 安装 Installation

```bash
# npm
npm install react-formutil --save

# yarn
yarn add react-formutil
```

## 使用 Usage

先看一个简单的示例：

[react-formutil Demo](http://github.boy.im/react-formutil/demo/)

上面的示例简单展示了 `react-formutil` 的基本用法。当然这只是很简单的示例，更复杂的状态渲染，例如`$dirty`、表单验证等后面会具体讲到。这里想简单说下 `react-formutil` 的设计思路：

`react-formutil` 主要提供了一个 Field 组件和一个 Form 组件，另外还有两个高阶组件 `withField` `withForm`：

*   `Field` 组件主要用来负责和具体的表单控件做状态的同步，并向顶层的 `Form` 注册自身
*   `Form` 组件通过 `context` 提供了一些方法给 `Field` 组件，并且它增强了传递过来的子组件，向其传递了整个表单的状态
*   `withField` 是基于 `Field` 进行了包装，方便某些情况下以高阶组件形式调用
*   `withForm` 是基于 `Form` 进行了包装，方便某些情况下以高阶组件形式调用

`react-formutil` 不像很多你能看到的其它的 react 表单库，它是非侵入性的。即它并不要求、也并不会强制渲染某种固定的 dom 结构。它只需要提供 `name` 值以及绑定好 `$render` 用来更新输入值，然后一切就会自动同步、更新。

> #### 需要强调，当使用 Field 和 Form 时，我们建议以函数作为子节点方式调用

```javascript
//一个函数式子组件书写示例
<Form>
    {$formutil => {
        return <Field name="username">{props => <input />}</Field>;
    }}
</Form>

//当然也可以传递普通组件作为子节点
//Field组件写在loginForm这个组件中
<Form>
    <LoginForm />
</Form>
```

### Field

`Field` 是一个标准的 react 组件。它可以理解为表单控件的顶层组件，它可以同步表单控件的状态。每一个表单控件应该总是当作 Field 组件的子组件嵌套。

`Field` 可以接收以下几个属性参数：

#### props.name

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

#### props.$defaultValue

该属性可以设置表单控件的默认值/初始值。如过不传递该参数，则默认值都为空字符串。通过该属性，你可以指定某个表单控件的默认值或初始值。

*   `<Field $defaultValue="username" />`
*   `<Field $defaultValue={{name: 'dog'}} />`

`$defaultValue` 可以是任意类型值。

#### props.$defaultState

该属性可以覆盖表单控件的的默认状态，类型必需是`key: value`简单对象：

```javascript
<Field $defaultState={{ $value: 'username' }} />
<Field $defaultValue="username" />
```

上面两者等效，其实表单控件的值只是状态里的一个字段`$value`

#### props.$validators

该属性可以设置表单控件的校验方式，它是 `key: value` 的对象形式，key 为校验类型标识，value 为校验函数。仅当校验函数返回 true 时，表示该项校验通过，否则其他值将会被当作错误信息保存到状态中。

仅仅设置了`$validators`，并不会触发校验，还需要设置匹配`$validators`中每一项的属性标识符，该属性的值会作为第二个参数传递给校验函数。

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

#### props.$asyncValidators

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

#### Field 的状态对象

Field 会维护一个状态树，

```js
{
    $value: "", //表单值
    $dirty: false, //是否修改过表单项
    $pristine: true, //与$dirty相反
    $touched: false, //是否接触过表单
    $untouched: true, //与$touched相反
    $valid: true, //表单项校验结果是否通过
    $invalid: false, //与$valid相反
    $error: {}, //表单校验错误信息

    $pending: false, //异步校验时该值将为true

    $render: (value, callback) => {}, //更新表单值，callback可选，会在组件更新后回调
    $setValue: value => {}, //同$render，只是个别名
    $setDirty: $dirty => {}, //设置$dirty
    $setTouched: $touched => {},设置$touched
    $setState: $newState => {} //直接更新状态，其实上面的几个方法都是基于$setState
    $setValidity: ($key, $valid) => {}
}
```

该对象会传递给子组件，子组件可以利用其中的方法来同步、修改表单状态：

*   用户输入时需要通过调用`$render`来更新新值到状态中
*   渲染表单项时，应该使用受控组件，根据 `$value` 来渲染
*   错误信息和校验状态可以通过 `$dirty` `$invalid` `$error`来渲染

### withField

`withField` 是一个高阶组件，与 `Field` 的区别是调用方式的不同。一般情况下建议通过 `Field` 组件去构造表单。如果你需要自定义一个复杂的表单项控件，则可以使用该高阶组件：

```javascript
import React from 'react';
import { withField } from 'react-formutil';

class FieldCustom extends React.Component {
    onChange = ev => this.props.$render(ev.target.value);

    render() {
        return <input onChange={this.onChange} value={this.props.$value} />;
    }
}

export default withField(FieldCustom);
```

### Form

`Form` 也是一个标准的 react 组件，它类似 Field，同样可以以函数、或者普通组件当作子组件调用。它可以增强子组件，收集子 dom 树中的 `Field` 组件状态，并通过$formutil 传递给被调用组件。

经过 `Form` 增强的组件，会在其 `props` 中接收到一个`$formutil`对象。例如

*   你可以通过`$formutil.$params` 拿到整个表单的输入值
*   你可以通过`$formutil.$invalid` 或 `$formutil.$valid` 来判断表单是否有误
*   你可以通过`$formutil.$error` 来获取表单的错误输入信息

```javascript
<Form>
    {$formutil => (
        /* const { $params, $invalid, $error, ...others } = $formutil; */
        <div>
            <Field name="username">{props => <input />}</Field>
            <Field name="password">{props => <input />}</Field>
        </div>
    )}
</Form>
```

更多解释参考：

#### $formutil.$getField(name)

获取对 name 对应的表单项的操作引用，可以获取到包含以下方法的对象：

```javascript
{
    picker(){}, //返回当前$state
    validate(){}, //重新校验
    merge($state){} //合并参数$state
}
```

#### $formutil.$setState($stateTree = {})

可以用来更新表单项的状态：

```javascript
$formutil.$setState({
    username: { $dirty: true, $pristine: false },
    'list[0].name': {
        $dirty: true,
        $pristine: false
    }
});
```

#### $formutil.$setValue($valueTree = {})

可以用来更新表单项的值：

```javascript
$formutil.$setValue({
    username: 'jack',
    'list[0].id': '123456'
});
```

#### $formutil.$setDirty($dirtyTree = {}) / $formutil.$setTouched($touchedTree = {})

可以用来更新表单项的`$dirty`、`$touched`，类似`$setValue`

#### $formutil.$batchState($newState = {}) / $formutil.$batchDirty($dirty = false) / $formutil.$batchTouched($touched = false)

批量更改所有表单项的状态

#### $formutil.$state

#### $formutil.$weakState

所有表单项的状态集合。`$formutl.$state` 是以 `Field`i 的 name 值经过路径解析后的对象，`$formutil.$weakState` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### $formutil.$params

#### $formutil.$weakParams

所有表单项的 值`$value` 集合。`$formutil.$params` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakParams` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### $formutil.$error

#### $formutil.$weakError

所有表单项的 `$error` 集合。`$formutil.$error` 是以 `Field` 的 `name` 值经过路径解析后的对象，`$formutil.$weakError` 是以 `Field` 的 `name` 字符串当 key 的对象。

#### $formutil.$valid

#### $formutil.$invalid

表单项中所有 `Field` 的`$valid` 均为 `true` 时，`$formutil.$valid` 为 `true`, `$formutil.$invalid` 为 false。表单项中有任意 `Field` 的`$valid` 均为 `false` 时，`$formutil.$valid` 为 `false`, `$formutil.$invalid` 为 `True`。

#### $formutil.$dirty

#### $formutil.$pristine

表单项中所有 `Field` 的`$dirty` 均为 `false` 时，`$formutil.$dirty` 为 `false`, `$formutil.$pristine` 为 true。表单项中有任意 `Field` 的`$dirty` 均为 `true` 时，`$formutil.$dirty` 为 `true`, `$formutil.$pristine` 为 `false`。

#### $formutil.$touched

#### $formutil.$untouched

表单项中所有 `Field` 的`$touched` 均为 `false` 时，`$formutil.$touched` 为 `false`, `$formutil.$untouched` 为 `true`。表单项中有任意 `Field` 的`$touched` 均为 `true` 时，`$formutil.$touched` 为 `true`, `$formutil.$untouched` 为 `false`。

### withForm

withForm 是基于 Form 封装的高阶组件：

```javascript
class LoginForm extends Component {
    // ...
}

export default withForm(LoginForm);
```

### 有任何问题欢迎提 issue 讨论
