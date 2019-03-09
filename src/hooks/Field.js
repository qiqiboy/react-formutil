import useField from './useField';
import { FieldPropTypes, FieldDisplayName, renderField } from '../fieldHelper';

function Field(props) {
    const $fieldutil = useField(props);

    return renderField($fieldutil, props);
}

Field.FieldDisplayName = FieldDisplayName;
Field.propTypes = FieldPropTypes;

export default Field;
