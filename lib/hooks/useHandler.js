import { createHandler, parseProps, defaultProps } from '../EasyField/easyFieldHandler';
import useField from './useField';

function useHandler(props) {
    props = Object.assign({}, defaultProps, props, { children: null });

    var _parseProps = parseProps(props),
        fieldProps = _parseProps.fieldProps,
        childProps = _parseProps.childProps;

    var $fieldutil = useField(fieldProps);

    return createHandler($fieldutil, props, childProps);
}

export default useHandler;