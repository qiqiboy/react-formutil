// Type definitions for react-formutil@>0.3.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';

export as namespace ReactFormutil;

type DetectAny<T, P, K> = void extends T ? P : K;

export interface FormFields {
    [name: string]: any;
}

export type FieldError<Validators = {}> = { [K in keyof Validators]: DetectAny<Validators[K], string, Validators[K]> };

export interface FieldState<T = string, Validators = {}> {
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

export type FormParams<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], string, Fields[K] extends object ? FormParams<Fields[K]> : Fields[K]>
};

export type FormErrors<Fields, Validators> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        FieldError<Validators>,
        Fields[K] extends object ? FormErrors<Fields[K], Validators> : FieldError<Validators>
    >
};

export type FormTouches<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormTouches<Fields[K]> : boolean>
};

export type FormDirts<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormDirts<Fields[K]> : boolean>
};

export type FormFocuses<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormFocuses<Fields[K]> : boolean>
};

export type FormStates<Fields, Validators> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        FieldState<string, Validators>,
        Fields[K] extends object ? FormStates<Fields[K], Validators> : FieldState<Fields[K], Validators>
    >
};

export type ArgFormParams<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        Fields[K],
        Fields[K] extends object ? ArgFormParams<Fields[K]> : Fields[K]
    >
};

export type ArgFieldError<Validators> = {
    [K in keyof Validators]?: DetectAny<Validators[K], string | true, Validators[K] | true>
};

export type ArgFormErrors<Fields, Validators> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        ArgFieldError<Validators>,
        Fields[K] extends object
            ? ArgFormErrors<Fields[K], Validators> | ArgFieldError<Validators>
            : ArgFieldError<Validators>
    >
};

export type ArgFormTouches<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormTouches<Fields[K]> | boolean : boolean
    >
};

export type ArgFormDirts<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormDirts<Fields[K]> | boolean : boolean
    >
};

export type ArgFormFocuses<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormFocuses<Fields[K]> | boolean : boolean
    >
};

export type ArgFormStates<Fields, Validators> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        Partial<FieldState<Fields[K], Validators>>,
        Fields[K] extends object
            ? ArgFormStates<Fields[K], Validators> | Partial<FieldState<Fields[K], Validators>>
            : Partial<FieldState<Fields[K], Validators>>
    >
};

export type FormWeakParams<Fields> = { [K in keyof Fields]: DetectAny<Fields[K], string, Fields[K]> };

export type FormWeakErrors<Fields, Validators> = { [K in keyof Fields]: FieldError<Validators> };

export type FormWeakTouches<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakDirts<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakFocuses<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakStates<Fields, Validators> = {
    [K in keyof Fields]: FieldState<DetectAny<Fields[K], string, Fields[K]>, Validators>
};

export type Registers<Fields, Validators, WeakFields = Fields> = {
    [K in keyof WeakFields]: $Fieldutil<DetectAny<WeakFields[K], string, WeakFields[K]>, Validators, Fields, WeakFields>
};

export type DeepRegisters<Fields, Validators, WeakFields = Fields> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        $Fieldutil<Fields[K], Validators, Fields, WeakFields>,
        Fields[K] extends object
            ? DeepRegisters<Fields[K], Validators, WeakFields>
            : $Fieldutil<Fields[K], Validators, Fields, WeakFields>
    >
};

export type Validate<T = string, Fields = {}, P = {}, WeakFields = Fields> = (
    value: T,
    propName: string,
    fieldProps: EasyFieldComponentProps<T, P, Fields, WeakFields> & { $formutil: $Formutil<Fields, P, WeakFields> }
) => any;

export interface Validators<T = string, Fields = {}, P = {}, WeakFields = Fields> {
    [K: string]: Validate<T, Fields, P, WeakFields>;
}

export interface FieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields> {
    $defaultValue: T;
    $defaultState: Partial<FieldState<T, P>>;
    $onFieldChange: ((newValue: T, preValue: T, $formutil: $Formutil<Fields, P, WeakFields>) => void);
    $validators: Validators<T, Fields, P, WeakFields>;
    $asyncValidators: never;
    name: string;
    component: React.ComponentType;
    render: (($fieldutil: $Fieldutil<T, P>) => React.ReactNode);
    children: (($fieldutil: $Fieldutil<T, P>) => React.ReactNode) | React.ReactNode;
}

export interface EasyFieldValidators {
    required: string;
    maxLength: string;
    minLength: string;
    max: string;
    min: string;
    enum: string;
    pattern: string;
    checker: string;
}

export type ValidMessage<P> = { [K in keyof P]?: string };

export interface EasyFieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields>
    extends Pick<
            FieldComponentProps<T, EasyFieldValidators & P, Fields, WeakFields>,
            Exclude<keyof FieldComponentProps, 'render' | 'children'>
        > {
    type: string;
    defaultValue: T;
    checked: T;
    unchecked: T;
    validMessage: ValidMessage<EasyFieldValidators & P>;
    passUtil: string;
    valuePropName: string;
    changePropName: string;
    focusPropName: string;
    blurPropName: string;
    groupNode: string | React.ComponentType<EasyFieldGroupOptionComponentProps<T>>;

    $parser: (value: any) => T;
    $formatter: (value: T) => any;

    required: boolean;
    maxLength: number;
    minLength: number;
    max: number;
    min: number;
    enum: any[];
    pattern: RegExp;
    checker: Validate<T, Fields, P, WeakFields>;

    render: (($fieldutil: $Easyfieldutil<T>) => React.ReactNode);
    children: (($fieldutil: $Easyfieldutil<T>) => React.ReactNode) | React.ReactNode;
}

export interface EasyFieldGroupOptionComponentProps<T = string> {
    $value: T;

    [other: string]: any;
}

export interface $Easyfieldutil<T = string> {
    value: T;
    GroupOption: React.ComponentClass<EasyFieldGroupOptionComponentProps>;
    onChange: (...args: any[]) => void;
    onFocus: (...args: any[]) => void;
    onBlur: (...args: any[]) => void;

    [other: string]: any;
}

export interface $Fieldutil<T = string, Validators = {}, Fields = {}, WeakFields = Fields>
    extends FieldState<T, Validators> {
    $$FIELD_UUID: number;
    $$formutil: $Formutil<Fields, Validators, WeakFields>;
    $name: string;
    $picker(): FieldState<T, Validators>;
    $getComponent(): React.ReactNode;
    $getFirstError(): string;
    $$merge(newState: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;
    $$triggerChange(changedData: { newValue: T; preValue: T }): void;
    $$reset(newState?: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;
    $reset(newState?: Partial<FieldState<T, Validators>>): FieldState<T, Validators>;

    $render(value: T, callback?: () => void): FieldState<T, Validators>;
    $setValue(newValue: T, callback?: () => void): FieldState<T, Validators>;
    $setState(newState: Partial<FieldState<T, Validators>>, callback?: () => void): FieldState<T, Validators>;
    $setTouched(touched: boolean, callback?: () => void): FieldState<T, Validators>;
    $setDirty(dirty: boolean, callback?: () => void): FieldState<T, Validators>;
    $setFocused(focused: boolean, callback?: () => void): FieldState<T, Validators>;
    $setValidity(errorKey: string, validResult: any, callback?: () => void): FieldState<T, Validators>;
    $setError(error: ArgFieldError<Validators>, callback?: () => void): FieldState<T, Validators>;
    $validate(callback?: () => void): FieldState<T, Validators>;
}

export interface $Formutil<Fields = {}, Validators = {}, WeakFields = Fields> {
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
    $focused: boolean;
    $pending: boolean;

    $$registers: Registers<Fields, Validators, WeakFields>;
    $$deepRegisters: DeepRegisters<Fields, Validators, WeakFields>;

    $getField<T extends keyof WeakFields>(
        name: T
    ): $Fieldutil<DetectAny<WeakFields[T], string, WeakFields[T]>, Validators>;
    $getFirstError(): string;
    $render(callback?: () => void): void;
    $validate<T extends keyof WeakFields>(
        name: T
    ): FieldState<DetectAny<WeakFields[T], string, WeakFields[T]>, Validators>;
    $validates(): void;
    $reset(stateTree?: ArgFormStates<Fields, Validators>, callback?: () => void): void;
    $setStates(stateTree: ArgFormStates<Fields, Validators>, callback?: () => void): void;
    $setValues(valueTree: ArgFormParams<Fields>, callback?: () => void): void;
    $setFocuses(focusedTree: ArgFormFocuses<Fields>, callback?: () => void): void;
    $setDirts(dirtyTree: ArgFormDirts<Fields>, callback?: () => void): void;
    $setTouches(touchedTree: ArgFormTouches<Fields>, callback?: () => void): void;
    $setErrors(errorTree: ArgFormErrors<Fields, Validators>, callback?: () => void): void;
    $batchState(state: Partial<FieldState<any, Validators>>, callback?: () => void): void;
    $batchDirty(dirty: boolean, callback?: () => void): void;
    $batchTouched(touched: boolean, callback?: () => void): void;
    $batchFocused(focused: boolean, callback?: () => void): void;
}

export interface FormComponentProps<Fields = {}, Validators = {}, WeakFields = Fields> {
    $defaultValues: ArgFormParams<Fields>;
    $defaultStates: ArgFormStates<Fields, Validators>;
    $onFormChange: ((
        $formutil: $Formutil<Fields, Validators, WeakFields>,
        newValues: FormParams<Fields>,
        preValues: FormParams<Fields>
    ) => void);
    component: React.ComponentType;
    render: (($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode);
    children: (($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode) | React.ReactNode;
}

export class Field<T = string, Validators = {}, Fields = {}, WeakFields = Fields> extends React.Component<
    Partial<FieldComponentProps<T, Validators, Fields, WeakFields>> & FormFields
> {}

export function withField<SelfProps = {}, T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    component: React.ComponentType<SelfProps>,
    config?: Partial<FieldComponentProps<T, Validators, Fields, WeakFields>>
): React.ComponentClass<$Fieldutil<T, Validators, Fields, WeakFields> & SelfProps>;

export function withField<SelfProps = {}, T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    config?: Partial<FieldComponentProps<T, Validators, Fields, WeakFields>>
): (
    component: React.ComponentType<SelfProps>,
    config?: Partial<FieldComponentProps<T, Validators, Fields, WeakFields>>
) => React.ComponentClass<$Fieldutil<T, Validators, Fields, WeakFields> & SelfProps>;

export class EasyField<T = string, Validators = {}, Fields = {}, WeakFields = Fields> extends React.Component<
    Partial<EasyFieldComponentProps<T, Validators, Fields, WeakFields>> & FormFields
> {}

export class Form<Fields = {}, Validators = {}, WeakFields = Fields> extends React.Component<
    Partial<FormComponentProps<Fields, Validators, WeakFields>> & FormFields
> {}

export function withForm<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    component: React.ComponentType<SelfProps>,
    config?: Partial<FormComponentProps<Fields, Validators, WeakFields>>
): React.ComponentClass<
    SelfProps & {
        $formutil: $Formutil<Fields, Validators, WeakFields>;
    }
>;

export function withForm<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    config?: Partial<FormComponentProps<Fields, Validators, WeakFields>>
): (
    component: React.ComponentType<SelfProps>,
    config?: Partial<FormComponentProps<Fields, Validators, WeakFields>>
) => React.ComponentClass<
    SelfProps & {
        $formutil: $Formutil<Fields, Validators, WeakFields>;
    }
>;

export function connect<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    component: React.ComponentType<SelfProps>
): React.ComponentClass<
    SelfProps & {
        $formutil: $Formutil<Fields, Validators, WeakFields>;
    }
>;
