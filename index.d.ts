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

export type FieldValidatorProps<Validators> = {
    [K in keyof Validators]?: null | ((() => any) extends Validators[K] ? any : Validators[K]);
};

export type FieldError<Validators> = { [K in keyof Validators]: any };

export interface FieldState<T = string, Validators = any> {
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
    [K in keyof Fields]: DetectAny<Fields[K], Fields[K], Fields[K] extends object ? FormParams<Fields[K]> : Fields[K]>;
};

export type FormErrors<Fields, Validators> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        FieldError<Validators>,
        Fields[K] extends object ? FormErrors<Fields[K], Validators> : FieldError<Validators>
    >;
};

// $validator on <Form />
export type FormValiateResult<Fields> =
    | {
          [K in keyof Fields]?: DetectAny<
              Fields[K],
              Fields[K],
              Fields[K] extends object ? FormValiateResult<Fields[K]> : any
          >;
      }
    | void
    | undefined;

export type FormTouches<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormTouches<Fields[K]> : boolean>;
};

export type FormDirts<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormDirts<Fields[K]> : boolean>;
};

export type FormFocuses<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormFocuses<Fields[K]> : boolean>;
};

export type FormPendings<Fields> = {
    [K in keyof Fields]: DetectAny<Fields[K], boolean, Fields[K] extends object ? FormPendings<Fields[K]> : boolean>;
};

export type FormStates<Fields, Validators> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        FieldState<Fields[K], Validators>,
        Fields[K] extends object ? FormStates<Fields[K], Validators> : FieldState<Fields[K], Validators>
    >;
};

export type ArgFormParams<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        Fields[K],
        Fields[K] extends object ? ArgFormParams<Fields[K]> : Fields[K]
    >;
};

export type ArgFieldError<Validators> = null | false | { [K in keyof Validators]?: any };

export type ArgFieldState<T, Validators> = Partial<
    Omit<FieldState<T, Validators>, '$error'> & {
        $error: ArgFieldError<Validators>;
    }
>;

export type ArgFormErrors<Fields, Validators> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        ArgFieldError<Validators>,
        Fields[K] extends object
            ? ArgFormErrors<Fields[K], Validators> | ArgFieldError<Validators>
            : ArgFieldError<Validators>
    >;
};

export type ArgFormTouches<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormTouches<Fields[K]> | boolean : boolean
    >;
};

export type ArgFormPendings<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormPendings<Fields[K]> | boolean : boolean
    >;
};

export type ArgFormDirts<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormDirts<Fields[K]> | boolean : boolean
    >;
};

export type ArgFormFocuses<Fields> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        boolean,
        Fields[K] extends object ? ArgFormFocuses<Fields[K]> | boolean : boolean
    >;
};

export type ArgFormStates<Fields, Validators> = {
    [K in keyof Fields]?: DetectAny<
        Fields[K],
        ArgFieldState<Fields[K], Validators>,
        Fields[K] extends object
            ? ArgFormStates<Fields[K], Validators> | ArgFieldState<Fields[K], Validators>
            : ArgFieldState<Fields[K], Validators>
    >;
};

export type FormWeakParams<Fields> = { [K in keyof Fields]: Fields[K] };

export type FormWeakErrors<Fields, Validators> = { [K in keyof Fields]: FieldError<Validators> };

export type FormWeakTouches<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakDirts<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakFocuses<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakPendings<Fields> = { [K in keyof Fields]: boolean };

export type FormWeakStates<Fields, Validators> = { [K in keyof Fields]: FieldState<Fields[K], Validators> };

export type Registers<Fields, Validators, WeakFields = Fields> = {
    [K in keyof WeakFields]: $Fieldutil<WeakFields[K], Validators, Fields, WeakFields>;
};

export type DeepRegisters<Fields, Validators, WeakFields = Fields> = {
    [K in keyof Fields]: DetectAny<
        Fields[K],
        $Fieldutil<Fields[K], Validators, Fields, WeakFields>,
        Fields[K] extends object
            ? DeepRegisters<Fields[K], Validators, WeakFields>
            : $Fieldutil<Fields[K], Validators, Fields, WeakFields>
    >;
};

export type Validate<T = string, Fields = any, Validators = any, WeakFields = Fields> = (
    value: T,
    propName: any,
    fieldProps: EasyFieldProps<T, Validators, Fields, WeakFields> & {
        $validError?: FieldError<Validators>;
        $fieldutil?: $Fieldutil<T, Validators, Fields, WeakFields>;
        $formutil?: $Formutil<Fields, Validators, WeakFields>;
    } & OtherKeys
) => any;

export type Validators<T = string, Fields = any, P = any, WeakFields = Fields> = {
    [K in keyof P]: Validate<T, Fields, P, WeakFields>;
};

export interface BaseFieldComponentProps<T = string, P = any, Fields = any, WeakFields = Fields> {
    $defaultValue?: T | ((props: any) => T);
    $defaultState?: ArgFieldState<T, P> | ((props: any) => ArgFieldState<T, P>);
    $onFieldChange?: (newValue: T, preValue: T, $formutil: $Formutil<Fields, P, WeakFields>) => void;
    $validators?: Validators<T, Fields, P, WeakFields>;
    $asyncValidators?: never;
    $validateLazy?: boolean;
    $reserveOnUnmount?: boolean;
    $parser?: (($viewValue: any, $setViewValue: ($newViewValue: any) => any) => T) | null;
    $formatter?: (($modelValue: T, $setModelValue: ($newModelValue: T) => T) => any) | null;
    $ref?:
        | (($fieldutil: $Fieldutil<T, P, Fields, WeakFields> | null) => void)
        | {
              readonly current: $Fieldutil<T, P, Fields, WeakFields> | null;
          };
    name?: string;
}

export type FieldProps<T = string, Validators = any, Fields = any, WeakFields = Fields> = BaseFieldComponentProps<
    T,
    Validators,
    Fields,
    WeakFields
> &
    FieldValidatorProps<Validators>;

export interface FieldComponentProps<T = string, Validators = any, Fields = any, WeakFields = Fields>
    extends BaseFieldComponentProps<T, Validators, Fields, WeakFields> {
    component?: React.ComponentType<{ $fieldutil: $Fieldutil<T, Validators> } & OtherKeys>;
    render?: ($fieldutil: $Fieldutil<T, Validators>) => React.ReactNode;
    children?: (($fieldutil: $Fieldutil<T, Validators>) => React.ReactNode) | React.ReactNode;
}

export interface EasyFieldDefaultValidators {
    required: boolean;
    maxLength: number;
    minLength: number;
    max: number;
    min: number;
    enum: any[];
    pattern: RegExp;
}

export type ValidMessage<P> = { [K in keyof P]?: any };

export interface BaseEasyFieldComponentProps<T = string, Validators = any, Fields = any, WeakFields = Fields>
    extends BaseFieldComponentProps<T, Validators, Fields, WeakFields>,
        FieldValidatorProps<EasyFieldDefaultValidators> {
    checked?: T;
    unchecked?: T;
    validMessage?: ValidMessage<
        EasyFieldDefaultValidators & { checker } & Omit<Validators, keyof EasyFieldDefaultValidators & { checker }>
    >;
    passUtil?: string | boolean;
    getValueFromEvent?: (...args: any[]) => T;
    valuePropName?: string;
    changePropName?: string;
    focusPropName?: string;
    blurPropName?: string;

    checker?: Validate<T, Fields, Validators, WeakFields>;
}

export type EasyFieldProps<
    T = string,
    Validators = any,
    Fields = any,
    WeakFields = Fields
> = BaseEasyFieldComponentProps<T, Validators, Fields, WeakFields> & FieldValidatorProps<Validators>;

export interface EasyFieldComponentProps<T = string, Validators = any, Fields = any, WeakFields = Fields>
    extends BaseEasyFieldComponentProps<T, Validators, Fields, WeakFields> {
    type?: string;
    defaultValue?: T;
    groupNode?: string | React.ComponentType<EasyFieldGroupOptionComponentProps<T> & OtherKeys>;
    component?: React.ComponentType<$FieldHandler<T> & OtherKeys>;
    render?: ($fieldHandler: $FieldHandler<T>) => React.ReactNode;
    children?: any;
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

export interface $Fieldutil<T = string, Validators = any, Fields = any, WeakFields = Fields>
    extends Readonly<FieldState<T, Validators>> {
    readonly $$FIELD_UUID: number;
    readonly $$formutil: $Formutil<Fields, Validators, WeakFields>;
    readonly $name: string;
    $new(): $Fieldutil<T, Validators, Fields, WeakFields>;
    $picker(): Readonly<FieldState<T, Validators>>;
    $getState(): Readonly<FieldState<T, Validators>>;
    $getComponent(): React.ReactNode;
    $getFirstError(): any;

    $onValidate<S = $Fieldutil<T, Validators, Fields, WeakFields>>(callback?: ($fieldutil: S) => void): Promise<S>;
    $reset<S = $Fieldutil<T, Validators, Fields, WeakFields>>(callback?: ($fieldutil: S) => void): Promise<S>;
    $reset<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        newState?: ArgFieldState<T, Validators>,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $render<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        $viewValue: any,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setValue<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        $modelValue: T,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setState<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        newState: ArgFieldState<T, Validators>,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setTouched<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        touched: boolean,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setDirty<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        dirty: boolean,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setFocused<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        focused: boolean,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setPending<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        pending: boolean,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setValidity<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        errorKey: string,
        validResult: any,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $setError<S = $Fieldutil<T, Validators, Fields, WeakFields>>(
        error: ArgFieldError<Validators>,
        callback?: ($fieldutil: S) => void
    ): Promise<S>;
    $validate<S = $Fieldutil<T, Validators, Fields, WeakFields>>(callback?: ($fieldutil: S) => void): Promise<S>;
}

export interface $Formutil<Fields = any, Validators = any, WeakFields = Fields> {
    readonly $states: Readonly<FormStates<Fields, Validators>>;
    readonly $params: Readonly<FormParams<Fields>>;
    readonly $pureParams: Readonly<FormParams<Fields>>;
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
    ): undefined | $Fieldutil<WeakFields[T], Validators, Fields, WeakFields>;
    $onValidates<S = $Formutil<Fields, Validators, WeakFields>>(callback?: ($formutil: S) => void): Promise<S>;
    $getFirstError<T extends keyof WeakFields>(name?: T): any;
    $render<S = $Formutil<Fields, Validators, WeakFields>>(callback?: ($formutil: S) => void): Promise<S>;
    $validate<T extends keyof WeakFields, S = $Fieldutil<WeakFields[T], Validators, Fields, WeakFields>>(
        name: T,
        callback?: ($fieldutil?: S) => void
    ): undefined | Promise<S>;
    $validates<T extends keyof WeakFields, S = $Formutil<Fields, Validators, WeakFields>>(
        name: T | T[],
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $validates<S = $Formutil<Fields, Validators, WeakFields>>(callback?: ($formutil: S) => void): Promise<S>;
    $reset<S = $Formutil<Fields, Validators, WeakFields>>(callback?: ($formutil: S) => void): Promise<S>;
    $reset<S = $Formutil<Fields, Validators, WeakFields>>(
        stateTree: ArgFormStates<Fields, Validators>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setStates<S = $Formutil<Fields, Validators, WeakFields>>(
        stateTree: ArgFormStates<Fields, Validators>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setValues<S = $Formutil<Fields, Validators, WeakFields>>(
        valueTree: ArgFormParams<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setFocuses<S = $Formutil<Fields, Validators, WeakFields>>(
        focusedTree: ArgFormFocuses<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setDirts<S = $Formutil<Fields, Validators, WeakFields>>(
        dirtyTree: ArgFormDirts<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setTouches<S = $Formutil<Fields, Validators, WeakFields>>(
        touchedTree: ArgFormTouches<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setPendings<S = $Formutil<Fields, Validators, WeakFields>>(
        pendingTree: ArgFormPendings<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $setErrors<S = $Formutil<Fields, Validators, WeakFields>>(
        errorTree: ArgFormErrors<Fields, Validators>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchState<S = $Formutil<Fields, Validators, WeakFields>>(
        state: ArgFieldState<any, Validators>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchDirty<S = $Formutil<Fields, Validators, WeakFields>>(
        dirty: boolean,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchTouched<S = $Formutil<Fields, Validators, WeakFields>>(
        touched: boolean,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchFocused<S = $Formutil<Fields, Validators, WeakFields>>(
        focused: boolean,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchPending<S = $Formutil<Fields, Validators, WeakFields>>(
        pending: boolean,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $batchError<S = $Formutil<Fields, Validators, WeakFields>>(
        $error: ArgFieldError<Validators>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
}

export interface $Listutil<Fields = any, Validators = any, WeakFields = Fields>
    extends $Formutil<Fields, Validators, WeakFields> {
    $length: number;
    $index: number;
    onFocus: FieldHanderCallback;
    onBlur: FieldHanderCallback;

    $swap<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        p1: number,
        p2: number,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $insert<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        position: number,
        values: ArgFormParams<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $insert<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        posOrValues: number | ArgFormParams<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $insert<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $remove<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        position: number,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $remove<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $push<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        values: ArgFormParams<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $push<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(callback?: ($formutil: S) => void): Promise<S>;
    $pop<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(callback?: ($formutil: S) => void): Promise<S>;
    $shift<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $unshift<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        values: ArgFormParams<Fields>,
        callback?: ($formutil: S) => void
    ): Promise<S>;
    $unshift<S = $Formutil<{ list: Fields[] }, { required: boolean }, any>>(
        callback?: ($formutil: S) => void
    ): Promise<S>;

    $isFirst(): boolean;
    $isLast(): boolean;
}

export interface BaseFormComponentProps<Fields = any, Validators = any, WeakFields = Fields> {
    $defaultValues?: ArgFormParams<Fields> | ((props: any) => ArgFormParams<Fields>);
    $defaultStates?: ArgFormStates<Fields, Validators> | ((props: any) => ArgFormStates<Fields, Validators>);
    $onFormChange?: (
        $formutil: $Formutil<Fields, Validators, WeakFields>,
        newValues: Readonly<FormParams<Fields>>,
        preValues: Readonly<FormParams<Fields>>
    ) => void;
    $validator?: (
        $params: FormParams<Fields>,
        $formutil: $Formutil<Fields, Validators, WeakFields>
    ) => FormValiateResult<Fields> | Promise<FormValiateResult<Fields>>;
    $processer?: <K extends keyof WeakFields>($state: FieldState<WeakFields[K], Validators>, name: K) => void;
    $ref?:
        | (($formutil: $Formutil<Fields, Validators, WeakFields> | null) => void)
        | {
              readonly current: $Formutil<Fields, Validators, WeakFields> | null;
          };
}

export type FormProps<Fields = any, Validators = any, WeakFields = Fields> = BaseFormComponentProps<
    Fields,
    Validators,
    WeakFields
>;

export interface FormComponentProps<Fields = any, Validators = any, WeakFields = Fields>
    extends BaseFormComponentProps<Fields, Validators, WeakFields> {
    component?: React.ComponentType<{ $formutil: $Formutil<Fields, Validators, WeakFields> } & OtherKeys>;
    render?: ($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode;
    children?: (($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode) | React.ReactNode;
}

export class Field<T = string, Validators = any, Fields = any, WeakFields = Fields> extends React.Component<
    FieldComponentProps<T, Validators, Fields, WeakFields> & OtherKeys
> {}

export function withField<SelfProps = any, T = string, Validators = any, Fields = any, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $fieldutil: $Fieldutil<T, Validators, Fields, WeakFields>;
        }
    >,
    config?: FieldProps<T, Validators, Fields, WeakFields>
): React.ComponentClass<Omit<SelfProps, '$fieldutil'> & FieldProps<T, Validators, Fields, WeakFields>>;

export function withField<SelfProps = any, T = string, Validators = any, Fields = any, WeakFields = Fields>(
    config?: FieldProps<T, Validators, Fields, WeakFields>
): <SelfProps, T, Validators, Fields, WeakFields>(
    component: React.ComponentType<
        SelfProps & {
            $fieldutil: $Fieldutil<T, Validators, Fields, WeakFields>;
        }
    >
) => React.ComponentClass<Omit<SelfProps, '$fieldutil'> & FieldProps<T, Validators, Fields, WeakFields>>;

export class EasyField<T = string, Validators = any, Fields = any, WeakFields = Fields> extends React.Component<
    EasyFieldComponentProps<T, Validators, Fields, WeakFields> & OtherKeys
> {}

export class Form<Fields = any, Validators = any, WeakFields = Fields> extends React.Component<
    FormComponentProps<Fields, Validators, WeakFields>
> {}

export function withForm<SelfProps = any, Fields = any, Validators = any, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >,
    config?: FormProps<Fields, Validators, WeakFields>
): React.ComponentClass<Omit<SelfProps, '$formutil'> & FormProps<Fields, Validators, WeakFields>>;

export function withForm<SelfProps = any, Fields = any, Validators = any, WeakFields = Fields>(
    config?: FormProps<Fields, Validators, WeakFields>
): <SelfProps, Fields, Validators, WeakFields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >
) => React.ComponentClass<Omit<SelfProps, '$formutil'> & FormProps<Fields, Validators, WeakFields>>;

export function connect<SelfProps = any, Fields = any, Validators = any, WeakFields = Fields>(
    component: React.ComponentType<
        SelfProps & {
            $formutil: $Formutil<Fields, Validators, WeakFields>;
        }
    >
): React.ComponentClass<Omit<SelfProps, '$formutil'>>;

// hooks
export function useField<T = string, Validators = any, Fields = any, WeakFields = Fields>(
    name?: string,
    props?: Omit<FieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useField<T = string, Validators = any, Fields = any, WeakFields = Fields>(
    props?: FieldProps<T, Validators, Fields, WeakFields>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useForm<Fields = any, Validators = any, WeakFields = Fields>(): $Formutil<
    Fields,
    Validators,
    WeakFields
>;

export function useHandler<T = string, Validators = any, Fields = any, WeakFields = Fields>(
    name: string,
    props?: Omit<EasyFieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $FieldHandler<T>;

export function useHandler<T = string, Validators = any, Fields = any, WeakFields = Fields>(
    props: EasyFieldProps<T, Validators, Fields, WeakFields>
): $FieldHandler<T> & OtherKeys;
