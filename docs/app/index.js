import React from 'react';
import { render } from 'react-dom';
import LoginForm from 'modules/LoginForm';
import SourceCode from 'modules/SourceCode';

render(
    <div>
        <div className="container">
            <h2 className="title">react-formutil</h2>
            <p className="lead">这个例子将展示如何使用bootstep和react-formutil快速制作一个登表单页面。</p>
            <LoginForm />
        </div>
        <div className="container-fluid">
            <SourceCode />
        </div>
    </div>,
    document.getElementById('wrap')
);
