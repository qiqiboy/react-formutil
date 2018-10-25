// Type definitions for react-formutil@>0.3.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';

export = ReactFormutil;

declare namespace ReactFormutil {
    interface FormFields {
        [name: string]: any;
    }

    type FieldError<Validators = {}> = { [K in keyof Validators]: string };

    interface FieldState<T = any, Validators = {}> {
        $value: T;
        $valid: boolean;
        $invalid: boolean;
        $dirty: boolean;
        $pristine: boolean;
        $touched: boolean;
        $untouched: boolean;
        $focused: boolean;
        $pending: boolean;
        $error: FieldError<Validators>;
    }

    type FormParams<Fields> = { [K in keyof Fields]: Fields[K] extends object ? FormParams<Fields[K]> : Fields[K] };

    type FormErrors<Fields, Validators = {}> = {
        [K in keyof Fields]: Fields[K] extends object ? FormErrors<Fields[K], Validators> : FieldError<Validators>
    };

    type FormTouches<Fields> = { [K in keyof Fields]: Fields[K] extends object ? FormTouches<Fields[K]> : boolean };

    type FormDirts<Fields> = { [K in keyof Fields]: Fields[K] extends object ? FormDirts<Fields[K]> : boolean };

    type FormFocuses<Fields> = { [K in keyof Fields]: Fields[K] extends object ? FormFocuses<Fields[K]> : boolean };

    type FormStates<Fields, Validators = {}> = {
        [K in keyof Fields]: Fields[K] extends object
            ? FormStates<Fields[K], Validators>
            : FieldState<Fields[K], Validators>
    };

    type ArgFormParams<Fields> = {
        [K in keyof Fields]: Fields[K] extends object ? FormParams<Fields[K]> | Fields[K] : Fields[K]
    };

    type ArgFormErrors<Fields, Validators = {}> = {
        [K in keyof Fields]: Fields[K] extends object
            ? FormErrors<Fields[K], Validators> | FieldError<Validators>
            : FieldError<Validators>
    };

    type ArgFormTouches<Fields> = {
        [K in keyof Fields]: Fields[K] extends object ? FormTouches<Fields[K]> | boolean : boolean
    };

    type ArgFormDirts<Fields> = {
        [K in keyof Fields]: Fields[K] extends object ? FormDirts<Fields[K]> | boolean : boolean
    };

    type ArgFormFocuses<Fields> = {
        [K in keyof Fields]: Fields[K] extends object ? FormFocuses<Fields[K]> | boolean : boolean
    };

    type ArgFormStates<Fields, Validators = {}> = {
        [K in keyof Fields]: Fields[K] extends object
            ? FormStates<Fields[K], Validators> | FieldState<Fields[K], Validators>
            : FieldState<Fields[K], Validators>
    };

    type FormWeakParams<Fields> = { [K in keyof Fields]: Fields[K] };

    type FormWeakErrors<Fields, Validators = {}> = { [K in keyof Fields]: FieldError<Validators> };

    type FormWeakTouches<Fields> = { [K in keyof Fields]: boolean };

    type FormWeakDirts<Fields> = { [K in keyof Fields]: boolean };

    type FormWeakFocuses<Fields> = { [K in keyof Fields]: boolean };

    type FormWeakStates<Fields, Validators = {}> = { [K in keyof Fields]: FieldState<Fields[K], Validators> };

    type Registers<Fields, Validators = {}> = { [K in keyof Fields]: $Fieldutil<Validators> };

    type DeepRegisters<Fields, Validators = {}> = {
        [K in keyof Fields]: Fields[K] extends object ? DeepRegisters<Fields[K], Validators> : $Fieldutil<Validators>
    };

    type Validate = (value: any, propName: string, fieldProps: FieldComponentProps & { $formutil: $Formutil }) => any;

    interface Validators {
        [K: string]: Validate;
    }

    interface FieldComponentProps<T = any, P = {}> {
        $defaultValue: T;
        $defaultState: Partial<FieldState<T, P>>;
        $onFieldChange: ((newValue: T, preValue: T, $formutil: $Formutil<{}, P>) => any);
        $validators: Validators;
        $asyncValidators: never;
        name: string;
        component: React.ComponentType;
        render: (($fieldutil: $Fieldutil<T, P>) => React.ReactNode);
        children: (($fieldutil: $Fieldutil<T, P>) => React.ReactNode) | React.ReactNode;
    }

    interface EasyFieldValidators extends Validators {
        required: Validate;
        maxLength: Validate;
        minLength: Validate;
        max: Validate;
        min: Validate;
        enum: Validate;
        pattern: Validate;
        checker: Validate;
    }

    type ValidMessage<Validators> = { [K in keyof Validators]?: string };

    interface EasyFieldComponentProps<T = any, Validators = {}>
        extends Pick<FieldComponentProps<T, Validators>, Exclude<keyof FieldComponentProps, 'render' | 'children'>> {
        type: string;
        defaultValue: T;
        checked: T;
        unchecked: T;
        validMessage: ValidMessage<Validators>;
        passUtil: string;
        valuePropName: string;
        changePropName: string;
        focusPropName: string;
        blurPropName: string;
        groupNode: string | React.ComponentType<EasyFieldGroupOptionComponentProps>;

        $parser: (value: any) => T;
        $formatter: (value: T) => any;

        required: any;
        maxLength: any;
        minLength: any;
        max: any;
        min: any;
        enum: any[];
        pattern: RegExp;
        checker: Validate;

        render: (($fieldutil: $Easyfieldutil) => React.ReactNode);
        children: (($fieldutil: $Easyfieldutil) => React.ReactNode) | React.ReactNode;
    }

    interface EasyFieldGroupOptionComponentProps {
        $value: any;

        [other: string]: any;
    }

    interface $Easyfieldutil {
        value: any;
        GroupOption: React.ComponentClass;
        onChange: (...args: any[]) => void;
        onFocus: (...args: any[]) => void;
        onBlur: (...args: any[]) => void;

        [other: string]: any;
    }

    interface $Fieldutil<T = any, Validators = {}> extends FieldState<T, Validators> {
        $$FIELD_UUID: number;
        $$formutil: $Formutil;
        $name: string;
        $picker(): FieldState<T, Validators>;
        $getComponent(): React.ReactNode;
        $getFirstError(): string;
        $$merge(newState: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;
        $$triggerChange(changedData: { newValue: T; preValue: T }): void;
        $$reset(newState: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;
        $reset(newState: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;

        $render(value: T, callback?: () => void): FieldState<T, Validators>;
        $setValue(newValue: T, callback?: () => void): FieldState<T, Validators>;
        $setState(newState: Partial<FieldState<T, Validators>>, callback?: () => void): FieldState<T, Validators>;
        $setTouched(touched: boolean, callback?: () => void): FieldState<T, Validators>;
        $setDirty(dirty: boolean, callback?: () => void): FieldState<T, Validators>;
        $setFocused(focused: boolean, callback?: () => void): FieldState<T, Validators>;
        $setValidity(errorKey: string, validResult: any, callback?: () => void): FieldState<T, Validators>;
        $setError(error: FieldError<Validators>, callback?: () => void): FieldState<T, Validators>;
        $validate(callback?: () => void): FieldState<T, Validators>;
    }

    interface $Formutil<Fields = {}, Validators = {}, WeakFields = Fields> {
        $states: FormStates<Fields, Validators>;
        $params: FormParams<Fields>;
        $errors: FormErrors<Fields, Validators>;
        $touches: FormTouches<Fields>;
        $dirts: FormDirts<Fields>;
        $focuses: FormFocuses<Fields>;

        $weakStates: FormWeakStates<WeakFields, Validators>;
        $weakParams: FormWeakParams<WeakFields>;
        $weakErrors: FormWeakErrors<WeakFields, Validators>;
        $weakTouches: FormWeakFocuses<WeakFields>;
        $weakDirts: FormWeakDirts<WeakFields>;
        $weakFocuses: FormWeakFocuses<WeakFields>;

        $valid: boolean;
        $invalid: boolean;
        $dirty: boolean;
        $pristine: boolean;
        $touched: boolean;
        $untouched: boolean;
        $focued: boolean;
        $pending: boolean;

        $$registers: Registers<WeakFields>;
        $$deepRegisters: DeepRegisters<Fields>;

        $getField<T extends keyof WeakFields>(name: T): $Fieldutil<WeakFields[T], Validators>;
        $getFirstError(): string;
        $render(callback?: () => void): void;
        $validate<T extends keyof WeakFields>(name: T): FieldState<WeakFields[T], Validators>;
        $validates(): void;
        $reset(stateTree?: Partial<ArgFormStates<Fields>>, callback?: () => void): void;
        $setStates(stateTree: Partial<ArgFormStates<Fields>>, callback?: () => void): void;
        $setValues(valueTree: Partial<ArgFormParams<Fields>>, callback?: () => void): void;
        $setFocuses(focusedTree: Partial<ArgFormFocuses<Fields>>, callback?: () => void): void;
        $setDirts(dirtyTree: Partial<ArgFormDirts<Fields>>, callback?: () => void): void;
        $setTouches(touchedTree: Partial<ArgFormTouches<Fields>>, callback?: () => void): void;
        $setErrors(errorTree: Partial<ArgFormErrors<Fields>>, callback?: () => void): void;
        $batchState(state: Partial<FieldState<any, Validators>>, callback?: () => void): void;
        $batchDirty(dirty: boolean, callback?: () => void): void;
        $batchTouched(touched: boolean, callback?: () => void): void;
        $batchFocused(focused: boolean, callback?: () => void): void;
    }

    interface FormComponentProps<Fields = {}, Validators = {}> {
        $defaultValues: Partial<ArgFormParams<Fields>>;
        $defaultStates: Partial<ArgFormStates<Fields, Validators>>;
        $onFormChange: ((
            $formutil: $Formutil<Fields, Validators>,
            newValues: FormParams<Fields>,
            preValues: FormParams<Fields>
        ) => void);
        component: React.ComponentType;
        render: (($formutil: $Formutil<Fields, Validators>) => React.ReactNode);
        children: (($formutil: $Formutil<Fields, Validators>) => React.ReactNode) | React.ReactNode;
    }

    class Field extends React.Component<Partial<FieldComponentProps> & FormFields> {}

    function withField<SelfProps = {}, T = any, Validators = {}>(
        component: React.ComponentType<SelfProps>,
        config?: Partial<FieldComponentProps<T, Validators>>
    ): React.ComponentClass<$Fieldutil & SelfProps>;

    function withField<SelfProps = {}, T = any, Validators = {}>(
        config?: Partial<FieldComponentProps<T, Validators>>
    ): (
        component: React.ComponentType<SelfProps>,
        config?: Partial<FieldComponentProps<T, Validators>>
    ) => React.ComponentClass<$Fieldutil & SelfProps>;

    class EasyField extends React.Component<Partial<EasyFieldComponentProps> & FormFields> {}

    class Form extends React.Component<Partial<FormComponentProps> & FormFields> {}

    function withForm<SelfProps = {}, Fields = {}, Validators = {}>(
        component: React.ComponentType<SelfProps>,
        config?: Partial<FormComponentProps<Fields, Validators>>
    ): React.ComponentClass<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators>;
        }
    >;

    function withForm<SelfProps = {}, Fields = {}, Validators = {}>(
        config?: Partial<FormComponentProps<Fields, Validators>>
    ): (
        component: React.ComponentType<SelfProps>,
        config?: Partial<FormComponentProps<Fields, Validators>>
    ) => React.ComponentClass<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators>;
        }
    >;

    function connect<SelfProps = {}, Fields = {}, Validators = {}>(
        component: React.ComponentType<SelfProps>
    ): React.ComponentClass<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators>;
        }
    >;
}
