// Type definitions for react-formutil/hooks@>0.5.0
// Project: react-formutil
// Definitions by: qiqiboy <https://github.com/qiqiboy>

import React from 'react';
import { $FieldHandler, $Fieldutil, $Formutil, EasyFieldProps, FieldProps, Omit, OtherKeys } from './index';
export * from './index';

export function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    name?: string,
    props?: Omit<FieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useField<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    props?: FieldProps<T, Validators, Fields, WeakFields>
): $Fieldutil<T, Validators, Fields, WeakFields>;

export function useForm<Fields = {}, Validators = {}, WeakFields = Fields>(): $Formutil<Fields, Validators, WeakFields>;

export function useHandler<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    name: string,
    props?: Omit<EasyFieldProps<T, Validators, Fields, WeakFields>, 'name'>
): $FieldHandler<T>;

export function useHandler<T = string, Validators = {}, Fields = {}, WeakFields = Fields>(
    props: EasyFieldProps<T, Validators, Fields, WeakFields>
): $FieldHandler<T> & OtherKeys;
