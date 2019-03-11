import useFormContext from './useFormContext';

function useForm() {
    const { $formutil } = useFormContext();

    return $formutil;
}

export default useForm;
