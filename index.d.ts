// Type definitions for react-formutil@>0.4.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';

export as namespace ReactFormutil;

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type DetectAny<T, P, K> = void extends T ? P : K;

export interface OtherKeys {
    [name: string]: any;
}

export type FieldValidatorProps<Validators> = { [K in keyof Validators]?: any };

export type FieldError<Validators> = { [K in keyof Validators]: DetectAny<Validators[K], string, Validators[K]> };

export interface FieldState<T = string, Validators = {}> {
    $value: T;
    $viewValue: any;
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

export type FormPendings<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormPendings<Fields[K]> : boolean>
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

export type ArgFormPendings<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormPendings<Fields[K]> | boolean : boolean
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

export type FormWeakPendings<Fields> = { [K in keyof Fields]: boolean };

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
    propName: any,
    fieldProps: EasyFieldProps<T, P, Fields, WeakFields> & {
        $validError: FieldError<P>;
        $fieldutil?: $Fieldutil<T, P, Fields, WeakFields>;
        $formutil?: $Formutil<Fields, P, WeakFields>;
    } & OtherKeys
) => any;

export type Validators<T = string, Fields = {}, P = {}, WeakFields = Fields> = {
    [K in keyof P]: Validate<T, Fields, P, WeakFields>
};

export interface BaseFieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields> {
    $defaultValue?: T;
    $defaultState?: Partial<FieldState<T, P>>;
    $onFieldChange?: (newValue: T, preValue: T, $formutil: $Formutil<Fields, P, WeakFields>) => void;
    $validators?: Validators<T, Fields, P, WeakFields>;
    $asyncValidators?: never;
    $validateLazy?: boolean;
    $parser?: (($viewValue: any, $setViewValue: ($newViewValue: any) => any) => T) | null;
    $formatter?: (($modelValue: T, $setModelValue: ($newModelValue: T) => T) => any) | null;
    name?: string;
}

export type FieldProps<T = string, P = {}, Fields = {}, WeakFields = Fields> = BaseFieldComponentProps<
    T,
    P,
    Fields,
    WeakFields
> &
    FieldValidatorProps<P>;

export interface FieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields>
    extends BaseFieldComponentProps<T, P, Fields, WeakFields> {
    component?: React.ComponentType<{ $fieldutil: $Fieldutil<T, P> } & OtherKeys>;
    render?: ($fieldutil: $Fieldutil<T, P>) => React.ReactNode;
    children?: (($fieldutil: $Fieldutil<T, P>) => React.ReactNode) | React.ReactNode;
}

export interface EasyFieldDefaultValidators<T = string, Fields = {}, P = {}, WeakFields = {}> {
    required?: boolean | null;
    maxLength?: number | null;
    minLength?: number | null;
    max?: number | null;
    min?: number | null;
    enum?: any[] | null;
    pattern?: RegExp | null;
    checker?: Validate<T, Fields, P, WeakFields> | null;
}

export type ValidMessage<P> = { [K in keyof P]?: string };

export interface BaseEasyFieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields>
    extends BaseFieldComponentProps<T, P, Fields, WeakFields>,
        EasyFieldDefaultValidators {
    checked?: T;
    unchecked?: T;
    validMessage?: ValidMessage<EasyFieldDefaultValidators & P>;
    passUtil?: string;
    valuePropName?: string;
    changePropName?: string;
    focusPropName?: string;
    blurPropName?: string;
}

export type EasyFieldProps<T = string, P = {}, Fields = {}, WeakFields = Fields> = BaseEasyFieldComponentProps<
    T,
    P,
    Fields,
    WeakFields
> &
    FieldValidatorProps<P>;

export interface EasyFieldComponentProps<T = string, P = {}, Fields = {}, WeakFields = Fields>
    extends BaseEasyFieldComponentProps<T, P, Fields, WeakFields> {
    type?: string;
    defaultValue?: T;
    groupNode?: string | React.ComponentType<EasyFieldGroupOptionComponentProps<T> & OtherKeys>;
    component?: React.ComponentType<$FieldHandler<T> & OtherKeys>;
    render?: ($fieldHandler: $FieldHandler<T>) => React.ReactNode;
    children?: (($fieldHandler: $FieldHandler<T>) => React.ReactNode) | React.ReactNode;
}

export interface EasyFieldGroupOptionComponentProps<T = string> {
    $value: T;
}

type FieldHanderCallback = (...args: any[]) => void;
export type $FieldHandler<
    T = string,
    valuePropName = 'value',
    changePropName = 'onChage',
    focusPropName = 'onFocus',
    blurPropName = 'onBlur',
    passUtil = never
    // @ts-ignore
> = { [K in valuePropName]: T } &
    // @ts-ignore
    { [K in changePropName]: FieldHanderCallback } &
    // @ts-ignore
    { [K in focusPropName]: FieldHanderCallback } &
    // @ts-ignore
    { [K in blurPropName]: FieldHanderCallback } &
    // @ts-ignore
    { [K in passUtil]: K extends string ? $Fieldutil<T> : never };

export interface $Fieldutil<T = string, Validators = {}, Fields = {}, WeakFields = Fields>
    extends Readonly<FieldState<T, Validators>> {
    readonly $$FIELD_UUID: number;
    readonly $$formutil: $Formutil<Fields, Validators, WeakFields>;
    readonly $name: string;
    $new(): $Fieldutil<T, Validators, Fields, WeakFields>;
    $picker(): Readonly<FieldState<T, Validators>>;
    $getState(): Readonly<FieldState<T, Validators>>;
    $getComponent(): React.ReactNode;
    $getFirstError(): string;
    $$merge(newState: Partial<FieldState<T, Validators>>): Readonly<FieldState<T, Validators>>;
    $$triggerChange(changedData: { newValue: T; preValue: T }): void;
    $reset(newState?: Partial<FieldState<T, Validators>>): Readonly<FieldState<T, Validators>>;

    $render($viewValue: any, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setValue($modelValue: T, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setState(newState: Partial<FieldState<T, Validators>>, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setTouched(touched: boolean, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setDirty(dirty: boolean, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setFocused(focused: boolean, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setPending(pending: boolean, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setValidity(errorKey: string, validResult: any, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $setError(error: ArgFieldError<Validators>, callback?: () => void): Readonly<FieldState<T, Validators>>;
    $validate(callback?: () => void): Readonly<FieldState<T, Validators>>;
}

export interface $Formutil<Fields = {}, Validators = {}, WeakFields = Fields> {
    readonly $states: Readonly<FormStates<Fields, Validators>>;
    readonly $params: Readonly<FormParams<Fields>>;
    readonly $errors: Readonly<FormErrors<Fields, Validators>>;
    readonly $touches: Readonly<FormTouches<Fields>>;
    readonly $dirts: Readonly<FormDirts<Fields>>;
    readonly $focuses: Readonly<FormFocuses<Fields>>;
    readonly $pendings: Readonly<FormPendings<Fields>>;

    readonly $weakStates: Readonly<FormWeakStates<WeakFields, Validators>>;
    readonly $weakParams: Readonly<FormWeakParams<WeakFields>>;
    readonly $weakErrors: Readonly<FormWeakErrors<WeakFields, Validators>>;
    readonly $weakTouches: Readonly<FormWeakFocuses<WeakFields>>;
    readonly $weakDirts: Readonly<FormWeakDirts<WeakFields>>;
    readonly $weakFocuses: Readonly<FormWeakFocuses<WeakFields>>;
    readonly $weakPendings: Readonly<FormWeakPendings<WeakFields>>;

    readonly $valid: boolean;
    readonly $invalid: boolean;
    readonly $dirty: boolean;
    readonly $pristine: boolean;
    readonly $touched: boolean;
    readonly $untouched: boolean;
    readonly $focused: boolean;
    readonly $pending: boolean;

    readonly $$registers: Readonly<Registers<Fields, Validators, WeakFields>>;
    readonly $$deepRegisters: Readonly<DeepRegisters<Fields, Validators, WeakFields>>;

    $new(): $Formutil<Fields, Validators, WeakFields>;
    $getField<T extends keyof WeakFields>(
        name: T
    ): $Fieldutil<DetectAny<WeakFields[T], string, WeakFields[T]>, Validators> &
        Readonly<FieldState<DetectAny<WeakFields[T], string, WeakFields[T]>, Validators>>;
    $getFirstError<T extends keyof WeakFields>(name?: T): string;
    $render(callback?: () => void): void;
    $validate<T extends keyof WeakFields>(
        name: T,
        callback?: () => void
    ): Readonly<FieldState<DetectAny<WeakFields[T], string, WeakFields[T]>, Validators>>;
    $validates(): void;
    $reset(stateTree?: ArgFormStates<Fields, Validators>, callback?: () => void): void;
    $setStates(stateTree: ArgFormStates<Fields, Validators>, callback?: () => void): void;
    $setValues(valueTree: ArgFormParams<Fields>, callback?: () => void): void;
    $setFocuses(focusedTree: ArgFormFocuses<Fields>, callback?: () => void): void;
    $setDirts(dirtyTree: ArgFormDirts<Fields>, callback?: () => void): void;
    $setTouches(touchedTree: ArgFormTouches<Fields>, callback?: () => void): void;
    $setPendings(pendingTree: ArgFormPendings<Fields>, callback?: () => void): void;
    $setErrors(errorTree: ArgFormErrors<Fields, Validators>, callback?: () => void): void;
    $batchState(state: Partial<FieldState<any, Validators>>, callback?: () => void): void;
    $batchDirty(dirty: boolean, callback?: () => void): void;
    $batchTouched(touched: boolean, callback?: () => void): void;
    $batchFocused(focused: boolean, callback?: () => void): void;
    $batchPending(pending: boolean, callback?: () => void): void;
    $batchError($error: ArgFieldError<Validators>, callback?: () => void): void;
}

export interface BaseFormComponentProps<Fields = {}, Validators = {}, WeakFields = Fields> {
    $defaultValues?: ArgFormParams<Fields>;
    $defaultStates?: ArgFormStates<Fields, Validators>;
    $onFormChange?: (
        $formutil: $Formutil<Fields, Validators, WeakFields>,
        newValues: FormParams<Fields>,
        preValues: FormParams<Fields>
    ) => void;
    $processer?: <K extends keyof WeakFields>(
        $state: FieldState<DetectAny<WeakFields[K], string, WeakFields[K]>, Validators>,
        name: K
    ) => void;
}

export type FormProps<Fields = {}, Validators = {}, WeakFields = Fields> = BaseFormComponentProps<
    Fields,
    Validators,
    WeakFields
>;

export interface FormComponentProps<Fields = {}, Validators = {}, WeakFields = Fields>
    extends BaseFormComponentProps<Fields, Validators, WeakFields> {
    component?: React.ComponentType<{ $formutil: $Formutil<Fields, Validators, WeakFields> } & OtherKeys>;
    render?: ($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode;
    children?: (($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode) | React.ReactNode;
}

export class Field<T = string, Validators = {}, Fields = {}, WeakFields = Fields> extends React.Component<
    FieldComponentProps<T, Validators, Fields, WeakFields> & FieldValidatorProps<Validators>
> {}

export function withField<SelfProps = {}, T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $fieldutil: $Fieldutil<T, Validators, Fields, WeakFields>;
        }
    >,
    config?: FieldProps<T, Validators, Fields, WeakFields>
): React.ComponentClass<Omit<SelfProps, '$fieldutil'> & FieldProps<T, Validators, Fields, WeakFields>>;

export function withField<SelfProps = {}, T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    config?: FieldProps<T, Validators, Fields, WeakFields>
): <SelfProps, T, Validators, Fields, WeakFields>(
    component: React.ComponentType<
        SelfProps & {
            $fieldutil: $Fieldutil<T, Validators, Fields, WeakFields>;
        }
    >
) => React.ComponentClass<Omit<SelfProps, '$fieldutil'> & FieldProps<T, Validators, Fields, WeakFields>>;

export class EasyField<T = string, Validators = {}, Fields = {}, WeakFields = Fields> extends React.Component<
    EasyFieldComponentProps<T, Validators, Fields, WeakFields> & FieldValidatorProps<Validators> & OtherKeys
> {}

export class Form<Fields = {}, Validators = {}, WeakFields = Fields> extends React.Component<
    FormComponentProps<Fields, Validators, WeakFields>
> {}

export function withForm<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >,
    config?: BaseFormComponentProps<Fields, Validators, WeakFields>
): React.ComponentClass<Omit<SelfProps, '$formutil'> & BaseFormComponentProps<Fields, Validators, WeakFields>>;

export function withForm<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    config?: BaseFormComponentProps<Fields, Validators, WeakFields>
): <SelfProps, Fields, Validators, WeakFields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >
) => React.ComponentClass<Omit<SelfProps, '$formutil'> & BaseFormComponentProps<Fields, Validators, WeakFields>>;

export function connect<SelfProps = {}, Fields = {}, Validators = {}, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >
): React.ComponentClass<Omit<SelfProps, '$formutil'>>;
