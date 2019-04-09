import useFormContext from './useFormContext';

function useForm() {
  var _useFormContext = useFormContext(),
      $formutil = _useFormContext.$formutil;

  return $formutil;
}

export default useForm;