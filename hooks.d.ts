// Type definitions for react-formutil/hooks@>0.5.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';
import {
    $FieldHandler,
    $Fieldutil,
    $Formutil,
    BaseEasyFieldComponentProps,
    BaseFieldComponentProps,
    EasyFieldDefaultValidators,
    FieldValidatorProps,
    Omit,
    OtherKeys
} from './index';
export * from './index';

export type HooksFieldProps<T = string, Validators = {}, Fields = {}, WeakFields = Fields> = BaseFieldComponentProps<
    T,
    Validators,
    Fields,
    WeakFields
> &
    FieldValidatorProps<Validators>;

export function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    name?: string,
    props?: Omit<HooksFieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    props?: HooksFieldProps<T, Validators, Fields, WeakFields>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useForm<Fields = {}, Validators = {}, WeakFields = Fields>(): $Formutil<Fields, Validators, WeakFields>;

export function useHandler<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    name: string,
    props?: Omit<BaseEasyFieldComponentProps<T, Validators, Fields, WeakFields>, 'name' | 'type'> &
        FieldValidatorProps<Validators>
): $FieldHandler<T>;

export function useHandler<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    props: Omit<BaseEasyFieldComponentProps<T, Validators, Fields, WeakFields>, 'type'> & FieldValidatorProps<Validators>
): $FieldHandler<T>;
