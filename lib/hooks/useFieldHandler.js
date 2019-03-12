import { createHandler, parseProps } from '../EasyField/fieldHandlerHelper';
import useField from './useField';

function useHandleProps(props) {
    var _parseProps = parseProps(props),
        fieldProps = _parseProps.fieldProps,
        childProps = _parseProps.childProps;

    var $fieldutil = useField(fieldProps);

    return createHandler($fieldutil, props, childProps);
}

export default useHandleProps;