import React from 'react';
import { render } from '@testing-library/react';
import { $Formutil, FormProps, $Fieldutil, FieldProps } from '../index.d';
import { Form, Field } from '../src';

export function renderForm<Fields = any, Validators = {}, WeakFields = Fields>(
    content: React.ReactNode | (($formutil: $Formutil<Fields, Validators, WeakFields>) => React.ReactNode),
    formProps?: FormProps<Fields, Validators, WeakFields>
) {
    let formHandler: $Formutil<Fields, Validators, WeakFields>;
    const getForm = content => (
        <Form<Fields, Validators, WeakFields> {...formProps}>
            {$formutil => {
                formHandler = $formutil;

                return typeof content === 'function' ? content($formutil) : content;
            }}
        </Form>
    );
    const { rerender, ...rest } = render(getForm(content));

    return {
        getFormutil() {
            return formHandler;
        },
        ...rest,
        rerender: (newContent?: any) => rerender(getForm(newContent === undefined ? content : newContent))
    };
}

export function renderField(fieldProps?: FieldProps) {
    let fieldHandler: $Fieldutil;
    let formHandler: $Formutil;
    let instance;
    const getForm = (newProps?: FieldProps) => (
        <Form
            render={$formutil => {
                formHandler = $formutil;

                return (
                    <Field {...fieldProps} {...newProps} ref={node => (instance = node)}>
                        {$fieldutil => {
                            fieldHandler = $fieldutil;

                            return (
                                <input
                                    data-testid="input"
                                    value={$fieldutil.$viewValue}
                                    onChange={ev => {
                                        $fieldutil.$render(ev.target.value);

                                        if ($fieldutil.$pristine) {
                                            $fieldutil.$setDirty(true);
                                        }
                                    }}
                                    onFocus={() => {
                                        $fieldutil.$setFocused(true);
                                    }}
                                    onBlur={() => {
                                        $fieldutil.$setFocused(false);

                                        if ($fieldutil.$untouched) {
                                            $fieldutil.$setTouched(true);
                                        }
                                    }}
                                />
                            );
                        }}
                    </Field>
                );
            }}></Form>
    );
    const { rerender, ...rest } = render(getForm());

    return {
        getFieldutil() {
            return fieldHandler;
        },
        getFormutil() {
            return formHandler;
        },
        getInstance() {
            return instance;
        },
        getElement() {
            return rest.getByTestId('input') as HTMLInputElement;
        },
        rerender(newProps?: FieldProps) {
            return rerender(getForm(newProps));
        },
        ...rest
    };
}
