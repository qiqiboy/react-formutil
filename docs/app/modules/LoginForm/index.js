import React, { Component } from 'react';
import { withForm, Field, EasyField } from 'app/../../src';

class LoginForm extends Component {
    submit = ev => {
        ev.preventDefault();

        const { $invalid, $batchDirty } = this.props.$formutil;

        //如果表单有错误，我们可以将所有表单项设置为$dirty，以将所有错误显示出来
        if ($invalid) {
            //通过$batchDirty设置所有表单项
            $batchDirty(true);
        } else {
            alert('表单填写正确，可以登录');
        }
    };

    autoInput = () => {
        //可以通过$setValues来更改表单的值
        this.props.$formutil.$setValues(
            {
                username: 'qiqiboy',
                password: '123456',
                confirm_password: '123456',
                mutiple: ['b', 'c'],
                autologin: false
            },
            () => {
                //我们需要更新后重新校验密码字段，因为这两个字段校验一致性是互相依赖的
                this.props.$formutil.$getField('password').validate();
                this.props.$formutil.$getField('confirm_password').validate();
            }
        );
    };

    resetForm = () => this.props.$formutil.$reset();

    //定义校验规则
    $validators = {
        required: value => (value ? true : '该项必填'),
        minLength: (value, len) => value.length >= parseInt(len) || `最少输入字符长度：${len}`,
        isSame: (value, name) => value === (this.props.$formutil.$params[name] || '') || '两次输入不一致'
    };

    //密码记住时间的配置项
    pwdRemeberDays = [['1day', '一天'], ['3day', '三天'], ['1week', '一周'], ['1month', '一月']];

    //多选项的候选配置
    targets = [
        {
            id: 'a',
            name: '选项一'
        },
        {
            id: 'b',
            name: '选项二'
        },
        {
            id: 'c',
            name: '选项三'
        }
    ];

    render() {
        //可以从$formutil中拿到$params $error $invalid等状态
        const { $params, $errors, $dirts } = this.props.$formutil;

        return (
            <form className="login-form row" onSubmit={this.submit}>
                <div className="col-lg-6">
                    <h4>
                        用户登录{' '}
                        <small>
                            <a
                                href="https://github.com/qiqiboy/react-formutil/blob/master/docs/app/modules/LoginForm/index.js#L73-L216"
                                target="_blank">
                                source on github
                            </a>
                        </small>
                    </h4>
                    <Field name="username" required $validators={this.$validators}>
                        {props => (
                            <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                                <label className="control-label">用户名</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="用户名"
                                    value={props.$value}
                                    onChange={ev => props.$render(ev.target.value.trim())}
                                />
                                {props.$dirty &&
                                    props.$invalid && (
                                        <span className="help-block">{Object.values(props.$error)[0]}</span>
                                    )}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="password"
                        minLength="5"
                        required
                        isSame="confirm_password"
                        $validators={this.$validators}>
                        {props => (
                            <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                                <label className="control-label">密码</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={props.$value}
                                    onChange={ev =>
                                        props.$render(ev.target.value.trim(), () =>
                                            this.props.$formutil.$getField('confirm_password').validate()
                                        )
                                    }
                                />
                                {props.$dirty &&
                                    props.$invalid && (
                                        <span className="help-block">{Object.values(props.$error)[0]}</span>
                                    )}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="confirm_password"
                        minLength="5"
                        required
                        isSame="password"
                        $validators={this.$validators}>
                        {props => (
                            <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                                <label className="control-label">重复密码</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={props.$value}
                                    onChange={(ev /* 这里同样，需要更新组件后再次去校验依赖该表单项字段的项目 */) =>
                                        props.$render(ev.target.value.trim(), () =>
                                            this.props.$formutil.$getField('password').validate()
                                        )
                                    }
                                />
                                {props.$dirty &&
                                    props.$invalid && (
                                        <span className="help-block">{Object.values(props.$error)[0]}</span>
                                    )}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="mutiple"
                        required
                        $validators={{
                            required: value => value.length > 0 || '请至少选择一项'
                        }}
                        $defaultValue={[this.targets[0].id]}>
                        {props => (
                            <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                                <label className="control-label">多选示例</label>
                                <div>
                                    {this.targets.map(item => (
                                        <label className="checkbox-inline" key={item.id}>
                                            <input
                                                type="checkbox"
                                                onChange={ev =>
                                                    props.$render(
                                                        ev.target.checked
                                                            ? props.$value.concat(item.id)
                                                            : props.$value.filter(id => id !== item.id)
                                                    )
                                                }
                                                checked={props.$value.includes(item.id)}
                                            />{' '}
                                            {item.name}
                                        </label>
                                    ))}
                                </div>
                                {props.$dirty &&
                                    props.$invalid && (
                                        <span className="help-block">{Object.values(props.$error)[0]}</span>
                                    )}
                            </div>
                        )}
                    </Field>
                    <Field name="autologin" $defaultValue={false}>
                        {props => (
                            <div className="checkbox">
                                <label className="control-label">
                                    <input
                                        type="checkbox"
                                        checked={props.$value}
                                        onChange={ev => props.$render(ev.target.checked)}
                                    />{' '}
                                    自动登录
                                </label>
                            </div>
                        )}
                    </Field>
                    {$params.autologin && (
                        <Field name="remember" required $validators={this.$validators}>
                            {props => (
                                <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                                    <select
                                        className="form-control"
                                        value={props.$value}
                                        onChange={ev => props.$render(ev.target.value)}>
                                        <option value="">请选择密码保留时间</option>
                                        {this.pwdRemeberDays.map(item => (
                                            <option value={item[0]} key={item[0]}>
                                                {item[1]}
                                            </option>
                                        ))}
                                    </select>
                                    {props.$dirty &&
                                        props.$invalid && (
                                            <span className="help-block">{Object.values(props.$error)[0]}</span>
                                        )}
                                </div>
                            )}
                        </Field>
                    )}
                    <button className="btn btn-block btn-primary">登 录</button>
                    <button className="btn btn-block btn-success" type="button" onClick={this.autoInput}>
                        自动填充
                    </button>
                    <button className="btn btn-block btn-warning" type="button" onClick={this.resetForm}>
                        重置
                    </button>
                    <hr />
                    <h4>使用EasyField组件</h4>
                    <p>
                        这里是使用 EasyField 组件的演示，相比默认的 Field
                        ，它对常用的浏览器表单控件进行了封装，方便直接调用。<br />你可以查看下方的源代码来了解其使用。
                    </p>
                    <div className="form-group">
                        <EasyField
                            name="EasyField.number"
                            type="number"
                            className="form-control"
                            placeholder="数字"
                            validMessage={{ required: '必需填写', max: '最大输入10' }}
                            required
                            max="10"
                        />
                        {$errors.EasyField &&
                            $errors.EasyField.number &&
                            $dirts.EasyField.number && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.number)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <EasyField
                            type="checkbox"
                            name="EasyField.checkbox"
                            checked="1"
                            required
                            unchecked="2"
                            defaultValue="2"
                            validMessage={{ required: '请勾选该项' }}
                        />{' '}
                        checkbox{' '}
                        <small>
                            <a
                                href="https://github.com/qiqiboy/react-formutil/blob/master/docs/app/modules/LoginForm/index.js#L248-L266"
                                target="_blank">
                                source on github
                            </a>
                        </small>
                        {$errors.EasyField &&
                            $errors.EasyField.checkbox &&
                            $dirts.EasyField.checkbox && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.checkbox)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <label>多选</label>{' '}
                        <small>
                            <a
                                href="https://github.com/qiqiboy/react-formutil/blob/master/docs/app/modules/LoginForm/index.js#L267-L289"
                                target="_blank">
                                source on github
                            </a>
                        </small>
                        <EasyField
                            type="group.checkbox"
                            name="EasyField.checkbox_group"
                            required
                            validMessage={{ required: '请至少选择一项' }}>
                            {({ Field }) =>
                                this.targets.map(item => (
                                    <label key={item.id} className="checkbox-inline">
                                        <Field $value={item.id} /> {item.name}
                                    </label>
                                ))
                            }
                        </EasyField>
                        {$errors.EasyField &&
                            $errors.EasyField.checkbox_group &&
                            $dirts.EasyField.checkbox_group && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.checkbox_group)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <EasyField
                            type="radio"
                            name="EasyField.radio"
                            defaultValue={false}
                            required
                            checked="yes"
                            validMessage={{ required: '请选中该项' }}
                        />{' '}
                        radio{' '}
                        <small>
                            <a
                                href="https://github.com/qiqiboy/react-formutil/blob/master/docs/app/modules/LoginForm/index.js#L290-L307"
                                target="_blank">
                                source on github
                            </a>
                        </small>
                        {$errors.EasyField &&
                            $errors.EasyField.radio &&
                            $dirts.EasyField.radio && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.radio)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <label>单选</label>{' '}
                        <small>
                            <a
                                href="https://github.com/qiqiboy/react-formutil/blob/master/docs/app/modules/LoginForm/index.js#L308-L333"
                                target="_blank">
                                source on github
                            </a>
                        </small>
                        <EasyField
                            type="group.radio"
                            name="EasyField.radio_group"
                            defaultValue={this.targets[1].id}
                            required
                            validMessage={{ required: '请选择一项' }}>
                            {({ Field }) =>
                                this.targets.map(item => (
                                    <div className="radio" key={item.id}>
                                        <label key={item.id}>
                                            <Field $value={item.id} /> {item.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </EasyField>
                        {$errors.EasyField &&
                            $errors.EasyField.radio_group &&
                            $dirts.EasyField.radio_group && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.radio_group)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <EasyField
                            type="textarea"
                            name="EasyField.textarea"
                            className="form-control"
                            defaultValue=""
                            minLength="10"
                            required
                            validMessage={{ required: '必需填写', minLength: '至少输入十个字符' }}
                            placeholder="至少输入十个字"
                        />
                        {$errors.EasyField &&
                            $errors.EasyField.textarea &&
                            $dirts.EasyField.textarea && (
                                <span className="help-block bg-danger">
                                    {Object.values($errors.EasyField.textarea)[0]}
                                </span>
                            )}
                    </div>
                    <div className="form-group">
                        <EasyField
                            type="select"
                            name="EasyField.select"
                            className="form-control"
                            required
                            validMessage={{ required: '请选择' }}
                            defaultValue="b">
                            <option value="">select</option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                        </EasyField>
                        {$errors.EasyField &&
                            $errors.EasyField.select &&
                            $dirts.EasyField.select && (
                                <span className="help-block  bg-danger">
                                    {Object.values($errors.EasyField.select)[0]}
                                </span>
                            )}
                    </div>
                </div>

                <div className="col-lg-3">
                    <h4>表单项值</h4>
                    <pre>{JSON.stringify(this.props.$formutil.$params, '\n', 2)}</pre>
                </div>

                <div className="col-lg-3">
                    <h4>表单所有状态</h4>
                    <pre>{JSON.stringify(this.props.$formutil, '\n', 2)}</pre>
                </div>
            </form>
        );
    }
}

//可以通过高阶组件直接设置表单默认值
export default withForm(LoginForm, {
    $defaultValues: {
        extra_param: 'test'
    }
});
