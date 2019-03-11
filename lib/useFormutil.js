import React, { useContext } from 'react';
import FormContext from './context';

function useFormutil() {
    var _useContext = useContext(FormContext),
        $formutil = _useContext.$formutil;

    return $formutil;
}

export default useFormutil;