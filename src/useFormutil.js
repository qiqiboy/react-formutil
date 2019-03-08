import React, { useContext } from 'react';
import FormContext from './context';

function useFormutil() {
    const $formutil = useContext(FormContext);

    return $formutil;
}

export default useFormutil;
