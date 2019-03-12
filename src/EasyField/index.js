import React, { Component } from 'react';
import Field from '../Field';
import { renderField, createHandler, parseProps, displayName, propTypes, defaultProps } from './easyFieldHandler';

/**
 * 提供对浏览器原生表单控件的封装
 * 支持以下类型表单元素：
 *  - input[type=xx]
 *  - textarea
 *  - select
 */
class EasyField extends Component {
    static displayName = displayName;
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    render() {
        const { fieldProps, childProps, renderProps } = parseProps(this.props);

        return (
            <Field
                {...fieldProps}
                children={$fieldutil => renderField(createHandler($fieldutil, this.props, childProps), renderProps)}
            />
        );
    }
}

export default EasyField;
