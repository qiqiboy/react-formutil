import React from 'react';

// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface FieldComponentProps<any> {
    $defaultValue?: any;
    $defaultState?: object;
    $onFieldChange?: ((newValue?: any, preValue?: any, $formutil?: $Formutil) => any);
    $validators?: object;
    $asyncValidators?: object;
    name?: string;
    component?: React.ComponentType<FieldComponentProps<any>> | React.ComponentType<any>;
    render?: (($fieldutil: $Fieldutil) => React.ReactNode);
    children?: (($fieldutil: $Fieldutil) => React.ReactNode) | React.ReactNode;
}

interface EasyFieldComponentProps<any> extends FieldComponentProps {
    type?: string;
    checked?: any;
    unchecked?: any;
    validMessage?: object;
    passUtil?: string;
    valuePropName?: string;
    changePropName?: string;
    focusPropName?: string;
    blurPropName?: string;

    $parser?: (value: any) => any;
    $formatter?: (value: any) => any;
}

interface FieldState {
    $value?: any;
    $valid?: boolean;
    $invalid?: boolean;
    $dirty?: boolean;
    $pristine?: boolean;
    $touched?: boolean;
    $untouched?: boolean;
    $focused?: boolean;
    $pending?: boolean;
    $error?: object;
}

interface $Fieldutil extends FieldState {
    $$FIELD_UUID: number;
    $$merge($newState: FieldState): FieldState;
    $$triggerChange(changedData: { newValue: any; preValue: any }): void;
    $$reset(newState: FieldState): FieldState;
    $name: string | undefined;
    $picker: FieldState;
    $getComponent: React.ReactNode;
    $reset(newState: FieldState): FieldState;

    $render(value: any, callback?: () => void): FieldState;
    $setValue(newValue: any, callback?: () => void): FieldState;
    $setState(newState: object, callback?: () => void): FieldState;
    $setTouched(touched: boolean, callback?: () => void): FieldState;
    $setDirty(dirty: boolean, callback?: () => void): FieldState;
    $setFocused(focused: boolean, callback?: () => void): FieldState;
    $setValidity(errorKey: string, validResult: any, callback?: () => void): FieldState;
    $setErrord(error: object, callback?: () => void): FieldState;
    $validate(callback?: () => void): FieldState;
}

interface $Formutil {
    $states: object;
    $params: object;
    $errors: object;
    $touches: object;
    $dirts: object;
    $weakStates: object;
    $weakParams: object;
    $weakErrors: object;
    $weakTouches: object;
    $weakDirts: object;

    $valid: boolean;
    $invalid: boolean;
    $dirty: boolean;
    $pristine: boolean;
    $touched: boolean;
    $untouched: boolean;
    $focued: boolean;
    $pending: boolean;

    $$registers: object;
    $$deepRegisters: object;

    $getFirstError(): any;
    $render(callback?: () => void): void;
    $validate(name: string): FieldState;
    $validates(): void;
    $reset(stateTree?: object, callback?: () => void): void;
    $setStates(stateTree?: object, callback: () => void): void;
    $setValues(valueTree?: object, callback?: () => void): void;
    $setFocuses(focusedTree?: object, callback?: () => void): void;
    $setDirts(dirtyTree?: object, callback?: () => void): void;
    $setTouches(touchedTree?: object, callback?: () => void): void;
    $setErrors(errorTree?: object, callback?: () => void): void;
    $batchState(state?: FieldState, callback?: () => void): void;
    $batchDirty(dirty?: boolean, callback?: () => void): void;
    $batchTouched(touched?: boolean, callback?: () => void): void;
    $batchFocused(focused?: boolean, callback?: () => void): void;
}

interface FormComponentProps<any> {
    $defaultValues?: object;
    $defaultStates?: object;
    $onFormChange?: (($formutil?: $Formutil, newValues?: object, preValues?: object) => any);
    component?: React.ComponentType<FieldComponentProps<any>> | React.ComponentType<any>;
    render?: (($formutil: $Formutil) => React.ReactNode);
    children?: (($formutil: $Formutil) => React.ReactNode) | React.ReactNode;
}

export class Field extends React.Component<FieldComponentProps, any> {}

export function withField<P extends FieldComponentProps<any>>(
    component: React.ComponentType<P>
): React.ComponentClass<Omit<P, keyof FieldComponentProps<any>>>;

export function withField(cofig: object): withField;

export class EasyField extends React.Component<EasyFieldComponentProps, any> {}

export class Form extends React.Component<FormComponentProps, any> {}

export function withForm<P extends FormComponentProps<any>>(
    component: React.ComponentType<P>
): React.ComponentClass<Omit<P, keyof FormComponentProps<any>>>;

export function withForm(cofig: object): withForm;

export function connect<P>(
    component: React.ComponentType<P>
): React.ComponentClass<Omit<P, keyof FormComponentProps<any>>>;
