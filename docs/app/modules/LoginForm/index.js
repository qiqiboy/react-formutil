import React, { Component } from 'react';
import { withForm, Field } from 'app/../../src';

class LoginForm extends Component {
    submit = ev => {
        ev.preventDefault();

        const { $invalid, $batchDirty } = this.props.$formutil;

        if ($invalid) {
            $batchDirty(true);
        } else {
            alert('表单填写正确，可以登录');
        }
    };

    $validators = {
        required: value => !!value,
        minLength: (value, len) => value.length >= parseInt(len)
    };

    validMessage = {
        required: '该项必填',
        minLength: '密码需要最少5个字符'
    };

    pwdRemeberDays = [['1day', '一天'], ['3day', '三天'], ['1week', '一周'], ['1month', '一月']];

    render() {
        const { $params } = this.props.$formutil;

        return (
            <form className="login-form col-lg-offset-3 col-lg-6" onSubmit={this.submit}>
                <h4>立即登录</h4>
                <Field name="username" required $validators={this.$validators}>
                    {props => (
                        <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                            <label className="control-label" htmlFor="exampleInputEmail1">
                                用户名
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="用户名"
                                value={props.$value}
                                onChange={ev => props.$render(ev.target.value.trim())}
                            />
                            {props.$dirty &&
                                props.$invalid && (
                                    <span className="help-block">
                                        {this.validMessage[Object.keys(props.$error)[0]]}
                                    </span>
                                )}
                        </div>
                    )}
                </Field>
                <Field name="password" minLength required $validators={this.$validators}>
                    {props => (
                        <div className={'form-group' + (props.$dirty && props.$invalid ? ' has-error' : '')}>
                            <label className="control-label" htmlFor="exampleInputPassword1">
                                密码
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={props.$value}
                                onChange={ev => props.$render(ev.target.value.trim())}
                            />
                            {props.$dirty &&
                                props.$invalid && (
                                    <span className="help-block">
                                        {this.validMessage[Object.keys(props.$error)[0]]}
                                    </span>
                                )}
                        </div>
                    )}
                </Field>
                <Field name="autologin" defaultValue={false}>
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
                                        <span className="help-block">
                                            {this.validMessage[Object.keys(props.$error)[0]]}
                                        </span>
                                    )}
                            </div>
                        )}
                    </Field>
                )}
                <button className="btn btn-block btn-primary">登 录</button>
                <h4>表单项值</h4>
                <pre>{JSON.stringify(this.props.$formutil.$params, '\n', 2)}</pre>
            </form>
        );
    }
}

export default withForm(LoginForm);
