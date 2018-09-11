// Type definitions for react-formutil@>0.3.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';

export = ReactFormutil;

declare namespace ReactFormutil {
    interface ParamsObject {
        [key: string]: any;
    }

    export interface FieldComponentProps {
        $defaultValue?: any;
        $defaultState?: object;
        $onFieldChange?: ((newValue?: any, preValue?: any, $formutil?: $Formutil) => any);
        $validators?: object;
        $asyncValidators?: object;
        name?: string;
        component?: React.ComponentType<FieldComponentProps<any>> | React.ComponentType<any>;
        render?: (($fieldutil: $Fieldutil) => React.ReactNode);
        children?: (($fieldutil: $Fieldutil) => React.ReactNode) | React.ReactNode;

        [otherName: string]: any;
    }

    export interface EasyFieldComponentProps extends FieldComponentProps {
        type?: string;
        defaultValue?: any;
        checked?: any;
        unchecked?: any;
        validMessage?: object;
        passUtil?: string;
        valuePropName?: string;
        changePropName?: string;
        focusPropName?: string;
        blurPropName?: string;
        groupNode?: string | React.ComponentType;

        $parser?: (value: any) => any;
        $formatter?: (value: any) => any;

        required?: any;
        maxLength?: any;
        minLength?: any;
        max?: any;
        min?: any;
        enum?: any[];
        pattern?: RegExp;
        checker?: (value?: any, checkerValue?: any, props?: ParamsObject) => any;

        component?: React.ComponentType<EasyFieldComponentProps<any>> | React.ComponentType<any>;
        render?: (($fieldutil: $EasyFieldutil) => React.ReactNode);
        children?: (($fieldutil: $EasyFieldutil) => React.ReactNode) | React.ReactNode;
    }

    export interface EasyFieldGroupOptionComponentProps {
        $value: any;

        [otherName: string]: any;
    }

    export interface $EasyFieldutil {
        value?: any;
        GroupOption?: React.ComponentClass<EasyFieldGroupOptionComponentProps, any>;
        onChange?(...args: any[]): void;
        onFocus?(...args: any[]): void;
        onBlur?(...args: any[]): void;

        [otherName: string]: any;
    }

    export interface FieldState {
        $value?: any;
        $valid?: boolean;
        $invalid?: boolean;
        $dirty?: boolean;
        $pristine?: boolean;
        $touched?: boolean;
        $untouched?: boolean;
        $focused?: boolean;
        $pending?: boolean;
        $error?: ParamsObject;
    }

    export interface $Fieldutil extends FieldState {
        $$FIELD_UUID: number;
        $name: string | undefined;
        $picker: FieldState;
        $getComponent(): React.ReactNode;
        $$merge($newState: FieldState): FieldState;
        $$triggerChange(changedData: { newValue: any; preValue: any }): void;
        $$reset(newState: FieldState): FieldState;
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

    export interface $Formutil {
        $states: ParamsObject;
        $params: ParamsObject;
        $errors: ParamsObject;
        $touches: ParamsObject;
        $dirts: ParamsObject;
        $weakStates: ParamsObject;
        $weakParams: ParamsObject;
        $weakErrors: ParamsObject;
        $weakTouches: ParamsObject;
        $weakDirts: ParamsObject;

        $valid: boolean;
        $invalid: boolean;
        $dirty: boolean;
        $pristine: boolean;
        $touched: boolean;
        $untouched: boolean;
        $focued: boolean;
        $pending: boolean;

        $$registers: ParamsObject;
        $$deepRegisters: ParamsObject;

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

    export interface FormComponentProps {
        $defaultValues?: object;
        $defaultStates?: object;
        $onFormChange?: (($formutil?: $Formutil, newValues?: ParamsObject, preValues?: ParamsObject) => any);
        component?: React.ComponentType<FieldComponentProps<any>> | React.ComponentType<any>;
        render?: (($formutil: $Formutil) => React.ReactNode);
        children?: (($formutil: $Formutil) => React.ReactNode) | React.ReactNode;

        [otherName: string]: any;
    }

    export class Field extends React.Component<FieldComponentProps, any> {}

    export function withField<P extends FieldComponentProps<any>>(
        component: React.ComponentType<P>,
        config?: FieldComponentProps
    ): React.ComponentClass<FieldComponentProps>;

    export function withField(config?: FieldComponentProps): withField;

    export class EasyField extends React.Component<EasyFieldComponentProps, any> {}

    export class Form extends React.Component<FormComponentProps, any> {}

    export function withForm<P extends FormComponentProps<any>>(
        component: React.ComponentType<P>,
        config?: FormComponentProps
    ): React.ComponentClass<FormComponentProps>;

    export function withForm(config?: FormComponentProps): withForm<P>;

    export function connect<P>(
        component: React.ComponentType<P>
    ): React.ComponentClass<P>;
}
