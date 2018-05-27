/* eslint import/no-webpack-loader-syntax: 0*/
import React from 'react';
import { render } from 'react-dom';
import SourceCode from 'modules/SourceCode';
import { HashRouter, Switch, Route, Redirect, NavLink as Link } from 'react-router-dom';

import LoginForm from 'modules/LoginForm';

const source1 = require('raw-loader!source/LoginForm1');
const source2 = require('raw-loader!source/LoginForm2');

render(
    <HashRouter>
        <div>
            <div className="container">
                <h2 className="title">
                    react-formutil{' '}
                    <small>
                        <a href="https://github.com/qiqiboy/react-formutil">Github</a>
                    </small>
                </h2>
                <p className="lead">
                    这个例子将展示如何使用bootstrap和react-formutil快速制作一个登表单页面。示例包含了普通的文本输入、下拉框、双密码输入框（一致校验）、多项选择、多级联动等常见表单形式。
                    <a
                        className="small"
                        href=""
                        onClick={ev => {
                            ev.preventDefault();
                            document.querySelector('#source-code').scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}>
                        查看源代码
                    </a>
                </p>
                <LoginForm />
            </div>

            <div className="container-fluid" id="source-code">
                <blockquote>
                    <h5>有两种调用方式，你可以点击切换查看不同的实现代码</h5>
                    <div className="btn-group">
                        <Link to="/one" className="btn btn-md btn-default">
                            源码一
                        </Link>
                        <Link to="/two" className="btn btn-md btn-default">
                            源码二
                        </Link>
                    </div>
                </blockquote>
                <Switch>
                    <Route path="/one" render={() => <SourceCode key="1" source={source1} />} />
                    <Route path="/two" render={() => <SourceCode key="2" source={source2} />} />
                    <Redirect to="/one" />
                </Switch>
            </div>
        </div>
    </HashRouter>,
    document.getElementById('wrap')
);
