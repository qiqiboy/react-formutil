import { renderField, parseProps, displayName, propTypes, defaultProps } from '../EasyField/fieldHelper';
import useHandleProps from './useHandleProps';

function EasyField(props) {
    var _parseProps = parseProps(props),
        fieldProps = _parseProps.fieldProps,
        childProps = _parseProps.childProps,
        renderProps = _parseProps.renderProps;

    var $handleProps = useHandleProps(fieldProps, childProps);

    return renderField($handleProps, renderProps);
}

EasyField.displayName = displayName;
EasyField.defaultProps = defaultProps;
EasyField.propTypes = propTypes;

export default EasyField;