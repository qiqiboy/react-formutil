# react-formutil

a controlled React component for make it easy to create the form.

react-formutil 定义了一种表单状态的收集、分发、同步模型。基于此，你可以很方便的使用 react-formutil 来创建、管理你的页面表单。

## 安装 Installation

```bash
# npm
npm install react-formutil --save

#yarn
yarn add react-formutil
```

## 使用 Usage

先看一个简单的示例：

[react-formutil Demo](http://github.boy.im/react-formutil/demo/)

上面的示例简单展示了 react-formutil 的基本用法。当然这只是很简单的示例，更复杂的状态渲染，例如$dirty、表单验证等后面会具体讲到。这里想简单说下 react-formutil 的设计思路：

react-formutil 提供了一个 Field 组件和一个 withForm 的高阶组件。

*   Field 组件主要用来负责和具体的表单控件做状态的同步，并像顶层的 withForm 注册自身
*   withForm 高阶组件通过 context 提供了一些方法给 Field 组件，并且它增强了传递过来的原始组件，向其传递了整个表单的状态

react-formutil 不像很多你能看到的其它的 react 表单库，它是非侵入性的。即它并不要求、也并不会强制渲染某种固定的 dom 结构。它只需要提供 name 值以及绑定好 onChange 用来更新输入值，然后一切就会自动同步、更新。

### Field

Field 是一个标准的 react 组件。它可以理解为表单控件的顶层组件，它可以同步表单控件的状态。每一个表单控件应该总是当作 Field 组件的子组件嵌套。

Field 可以接受三个属性当作参数：

#### props.name

该项必填，name 可以是一个简单的字符串，也可以是一个字符串表达式（该表达式执行没有 scope, 所以表达式中不能存在变量）

*   `<Field name="username" />`
*   `<Field name="list[0]" />`
*   `<Field name="list[1].name" />`
*   `<Field name="list[2]['test' + 124]" />`

以上都是合法的 name 值。对于多层级的 name 值，生成的表单参数对象，也会基于该对象层级创建。例如，上面的示例，将会生成以下格式的表单参数对象：

```json
{
    "username": "",
    "list": ["", { "name": "" }, { "test124": "" }]
}
```

#### props.defaultValue

该属性可以设置表单控件的默认值/初始值。如过不传递该参数，则默认值都为空字符串。通过该属性，你可以指定某个表单控件的默认值或初始值。

*   `<Field defaultValue="username" />`
*   `<Field defaultValue={{name: 'dog'}} />`

defaultValue 可以是任意类型值。

#### props.$validators

该属性可以设置表单控件的校验方式，它是 key: value 的对象形式，key 为校验类型标识，value 为校验函数。仅当校验函数返回 true 时，表示该项校验通过，否则其他值将会被当作错误信息保存到状态中。

仅仅设置了`$validators`，并不会触发校验，还需要设置匹配`$validators`中每一项的属性标识符，该属性的值会作为第二个参数传递给校验函数。

```javascript
<Field
    required
    maxLength="5"
    disableChar="z"
    $validators={{
        required: value => !!value || '该项必填',
        maxLength: (value, len) => value.length <= parseInt(len) || '最少长度：' + len,
        disableChar: (value, char) => value.indexOf(char) === -1 || '禁止输入字符：' + char
    }}>
    {props => (
        <div className="form-group">
            <label>密码</label>
            <input type="number" onChange={ev => props.onChange(ev.target.value.trim())} value={props.$value} />
            {props.$invalid && <div className="error">{object.values(props.$error)[0]}</div>}
        </div>
    )}
</Field>
```

在这个例子中，我们通过$validators 设置了 required 、 maxLength 以及 disabledChar 的校验规则。同时通过属性 props 表示了需要校验这三个字段。然后我们可以通过状态判断将错误信息展示出来。

#### Field 的状态对象

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

    $render: value => {}, //更新表单值
    $setDirty: $dirty => {}, //设置$dirty
    $setTouched: $touched => {},设置$touched
    $setState: $newState => {} //直接更新状态
    $setValidity: ($key, $valid) => {}
}
```

该对象会传递给子组件，子组件可以利用其中的方法来同步、修改表单状态

### withField

withField 是一个高阶组件，与 Field 的区别是调用方式的不同。一般情况下建议通过 Field 组件去构造表单。如果你需要自定义一个复杂的表单项控件，则可以使用该高阶组件：

```javascript
import React from 'react';
import { withField } from 'react-formutil';

class FieldCustom extends React.Component {
    onChange = ev => this.props.onChange(ev.target.value);

    render() {
        return <input onChange={this.onChange} value={this.props.$value} />;
    }
}

export default withField(FieldCustom);
```

### withForm

withForm 同样是高阶组件，它可以增强被调用组件，收集子 dom 树中的 Field 组件状态，并传递给被调用组件。

经过 withForm 增强的组件，会在其 props 中接收到一个`$formutil`对象：

#### $formutil.$state

#### $formutil.$weakState

所有表单项的状态集合。$formutil$state 是以 Field 的 name 值经过路径解析后的对象，$formutil$weakState 是以 Field 的 name 字符串当 key 的对象。

#### $formutil.$params

#### $formutil.$weakParams

所有表单项的 值$value 集合。$formutil$params 是以 Field 的 name 值经过路径解析后的对象，$formutil$weakParams 是以 Field 的 name 字符串当 key 的对象。

#### $formutil.$error

#### $formutil.$weakError

所有表单项的 $error 集合。$formutil$error 是以 Field 的 name 值经过路径解析后的对象，$formutil.$weakError 是以 Field 的 name 字符串当 key 的对象。

#### $formutil.$valid

#### $formutil.$invalid

表单项中所有 Field 的$valid 均为 true 时，$formutil.$valid 为 true, $formutil.$invalid 为 false。表单项中有任意 Field 的$valid 均为 false 时，$formutil.$valid 为 false, $formutil.$invalid 为 True。

#### $formutil.$dirty

#### $formutil.$pristine

表单项中所有 Field 的$dirty 均为 false 时，$formutil.$dirty 为 false, $formutil.$pristine 为 true。表单项中有任意 Field 的$dirty 均为 true 时，$formutil.$dirty 为 true, $formutil.$pristine 为 false。

#### $formutil.$touched

#### $formutil.$untouched

表单项中所有 Field 的$touched 均为 false 时，$formutil.$touched 为 false, $formutil.$untouched 为 true。表单项中有任意 Field 的$touched 均为 true 时，$formutil.$touched 为 true, $formutil.$untouched 为 false。
