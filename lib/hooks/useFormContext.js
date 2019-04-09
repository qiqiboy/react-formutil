import { useContext } from 'react';
import FormContext from '../context';

function useFormContext() {
  var $formContext = useContext(FormContext);
  return $formContext;
}

export default useFormContext;