/* eslint import/no-webpack-loader-syntax: 0*/
import React, { Component } from 'react';
import './style.scss';

class SrouceCode extends Component {
    async componentDidMount() {
        const [Editor] = await Promise.all([
            import('codemirror'), //异步载入编辑器代码
            import('codemirror/mode/javascript/javascript'),
            import('codemirror/mode/css/css'),
            import('codemirror/lib/codemirror.css'), //载入编辑器样式
            import('codemirror/theme/solarized.css') //载入编辑器主题
        ]);

        this.jsEditor = new Editor(this.editorNode, {
            mode: 'javascript',
            lineNumbers: true,
            theme: 'solarized',
            value: require('raw-loader!source/LoginForm')
        });
    }

    refCallback = node => {
        this.editorNode = node;
    };

    render() {
        return (
            <div>
                <h3>源代码</h3>
                <div ref={this.refCallback} />
            </div>
        );
    }
}

export default SrouceCode;
