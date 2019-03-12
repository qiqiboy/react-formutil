import useField from './useField';
import { propTypes, displayName, renderField } from '../fieldHelper';

function Field(props) {
    const $fieldutil = useField(props);

    return renderField($fieldutil, props);
}

Field.FieldDisplayName = displayName;
Field.propTypes = propTypes;

export default Field;
