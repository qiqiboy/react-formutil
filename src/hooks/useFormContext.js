import { useContext } from 'react';
import FormContext from '../context';

function useFormContext() {
    const $formContext = useContext(FormContext);

    return $formContext;
}

export default useFormContext;
