import { createHandler, parseProps, defaultProps } from '../EasyField/easyFieldHandler';
import useField from './useField';

function useHandler(props) {
    props = { ...defaultProps, ...props, children: null };

    const { fieldProps, childProps } = parseProps(props);
    const $fieldutil = useField(fieldProps);

    return createHandler($fieldutil, fieldProps, childProps);
}

export default useHandler;
