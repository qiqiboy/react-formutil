// Type definitions for react-formutil/hooks@>0.5.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';
import { $Fieldutil, $Formutil, BaseFieldComponentProps, FieldValidatorProps, Omit } from './index';
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
