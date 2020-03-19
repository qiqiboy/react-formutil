import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { $Formutil, $Fieldutil, FieldProps, FormProps } from '../index.d';
import { Form, Field } from '../src';

function renderForm<Fields = any, Validators = {}, WeakFields = Fields>(
    content: React.ReactNode,
    formProps?: FormProps<Fields, Validators, WeakFields>
) {
    let formHandler: $Formutil<Fields, Validators, WeakFields>;
    const getForm = content => (
        <Form<Fields, Validators, WeakFields> {...formProps}>
            {$formutil => {
                formHandler = $formutil;

                return content;
            }}
        </Form>
    );
    const { rerender, ...rest } = render(getForm(content));

    return {
        getFormutil() {
            return formHandler;
        },
        ...rest,
        rerender: content => rerender(getForm(content))
    };
}

const nativeConsoleLog = console.log;
const spyConsoleLog = jest.fn((...args) => nativeConsoleLog(...args));

beforeAll(() => (console.log = spyConsoleLog));
afterAll(() => (console.log = nativeConsoleLog));
beforeEach(() => {
    spyConsoleLog.mockClear();
});

describe('$defaultValues', () => {
    test('as shallow object', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a" children={null} />
                <Field name="b" children={null} />
            </>,
            {
                $defaultValues: {
                    a: 1,
                    b: 2
                }
            }
        );

        expect(getFormutil().$params).toEqual({
            a: 1,
            b: 2
        });
    });

    test('as nested object', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a.b" children={null} />
                <Field name="c[1]" children={null} />
            </>,
            {
                $defaultValues: {
                    a: {
                        b: 1
                    },
                    'c[1]': 2
                }
            }
        );

        expect(getFormutil().$params).toEqual({
            a: {
                b: 1
            },
            c: [undefined, 2]
        });
    });

    test('as function', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a" children={null} />
                <Field name="b" children={null} />
            </>,
            {
                $defaultValues: () => ({
                    a: 1,
                    b: 2
                })
            }
        );

        expect(getFormutil().$params).toEqual({
            a: 1,
            b: 2
        });
    });
});

describe('$defaultStates', () => {
    test('as shallow object', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a" children={null} />
                <Field name="b" children={null} />
            </>,
            {
                $defaultStates: {
                    a: {
                        $value: 1,
                        $dirty: true
                    },
                    b: {
                        $value: 2
                    }
                }
            }
        );

        expect(getFormutil().$params).toEqual({
            a: 1,
            b: 2
        });

        expect(getFormutil().$dirts).toEqual({
            a: true,
            b: false
        });
    });

    test('as nested object', () => {
        const { getFormutil } = renderForm<
            {
                a: {
                    b: number;
                };
                c: [undefined, number];
            },
            {},
            {
                'a.b': number;
                'c[1]': number;
            }
        >(
            <>
                <Field name="a.b" children={null} />
                <Field name="c[1]" children={null} />
            </>,
            {
                $defaultStates: {
                    a: {
                        b: {
                            $value: 1,
                            $dirty: true
                        }
                    },
                    'c[1]': {
                        $value: 2
                    }
                }
            }
        );

        expect(getFormutil().$params).toEqual({
            a: {
                b: 1
            },
            c: [undefined, 2]
        });
        expect(getFormutil().$dirts).toEqual({
            a: {
                b: true
            },
            c: [undefined, false]
        });
    });

    test('as function', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a" children={null} />
                <Field name="b" children={null} />
            </>,
            {
                $defaultStates: () => ({
                    a: {
                        $value: 1,
                        $dirty: true
                    },
                    b: {
                        $value: 2
                    }
                })
            }
        );

        expect(getFormutil().$params).toEqual({
            a: 1,
            b: 2
        });

        expect(getFormutil().$dirts).toEqual({
            a: true,
            b: false
        });
    });
});

describe('$validator', () => {
    
})

describe('$formutil', () => {
    test('$params / $weakParams / $pureParams / $states / $weakState', () => {
        const { getFormutil } = renderForm(
            <>
                <Field name="a.b" $defaultValue={1} children={null} />
                <Field name="c[0]" $defaultValue={2} children={null} />
                <Field name="d" $defaultValue={0} children={null} />
            </>,
            {
                $defaultValues: {
                    d: 3,
                    e: 4
                }
            }
        );

        expect(getFormutil().$params).toEqual({
            a: { b: 1 },
            c: [2],
            d: 3,
            e: 4
        });

        expect(getFormutil().$weakParams).toEqual({
            'a.b': 1,
            'c[0]': 2,
            d: 3
        });

        expect(getFormutil().$pureParams).toEqual({
            a: { b: 1 },
            c: [2],
            d: 3
        });

        const expectFieldState = expect.objectContaining({
            $value: expect.any(Number),
            $dirty: expect.any(Boolean)
        });

        expect(getFormutil().$states).toEqual({
            a: {
                b: expectFieldState
            },
            c: [expectFieldState],
            d: expectFieldState
        });

        expect(getFormutil().$weakStates).toEqual({
            'a.b': expectFieldState,
            'c[0]': expectFieldState,
            d: expectFieldState
        });
    });

    test('$touches / $dirts / $focuses | $pendings / $errors', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    $defaultValue={1}
                    children={null}
                    required
                    $validators={{ required: () => 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    $defaultValue={2}
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: () =>
                            new Promise((resolve, reject) => setTimeout(() => reject('async error'), 200))
                    }}
                />
                <Field name="d" $defaultValue={0} children={null} />
            </>,
            {
                $defaultValues: {
                    d: 3,
                    e: 4
                }
            }
        );

        expect(getFormutil().$touches).toEqual({
            a: { b: false },
            c: [false],
            d: false
        });
        expect(getFormutil().$weakTouches).toEqual({
            'a.b': false,
            'c[0]': false,
            d: false
        });

        expect(getFormutil().$dirts).toEqual({
            a: { b: false },
            c: [false],
            d: false
        });
        expect(getFormutil().$weakDirts).toEqual({
            'a.b': false,
            'c[0]': false,
            d: false
        });

        expect(getFormutil().$focuses).toEqual({
            a: { b: false },
            c: [false],
            d: false
        });
        expect(getFormutil().$weakFocuses).toEqual({
            'a.b': false,
            'c[0]': false,
            d: false
        });

        expect(getFormutil().$pendings).toEqual({
            a: { b: false },
            c: [true],
            d: false
        });
        expect(getFormutil().$weakPendings).toEqual({
            'a.b': false,
            'c[0]': true,
            d: false
        });

        expect(getFormutil().$errors).toEqual({
            a: {
                b: {
                    required: 'reuqired!'
                }
            }
        });
        expect(getFormutil().$weakErrors).toEqual({
            'a.b': {
                required: 'reuqired!'
            }
        });

        await waitFor(() => {
            expect(getFormutil().$pendings).toEqual({
                a: { b: false },
                c: [false],
                d: false
            });
            expect(getFormutil().$weakPendings).toEqual({
                'a.b': false,
                'c[0]': false,
                d: false
            });

            expect(getFormutil().$errors).toEqual({
                a: {
                    b: {
                        required: 'reuqired!'
                    }
                },
                c: [
                    {
                        asyncValidate: 'async error'
                    }
                ]
            });
            expect(getFormutil().$weakErrors).toEqual({
                'a.b': {
                    required: 'reuqired!'
                },
                'c[0]': {
                    asyncValidate: 'async error'
                }
            });
        });
    });

    test('$valid / $invalid / $focused / $touched / $untouched /  $dirty / $pristine / $pending ', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: value =>
                            new Promise((resolve, reject) =>
                                setTimeout(() => (value ? resolve() : reject('async error')), 200)
                            )
                    }}
                />
            </>
        );

        expect(getFormutil().$invalid).toEqual(true);
        expect(getFormutil().$valid).toEqual(false);
        expect(getFormutil().$touched).toEqual(false);
        expect(getFormutil().$untouched).toEqual(true);
        expect(getFormutil().$dirty).toEqual(false);
        expect(getFormutil().$pristine).toEqual(true);
        expect(getFormutil().$focused).toEqual(false);
        expect(getFormutil().$pending).toEqual(true);

        await waitFor(() => {
            expect(getFormutil().$pending).toEqual(false);
        });

        getFormutil()
            .$getField('a.b')!
            .$setState({
                $value: 1,
                $focused: true,
                $dirty: true,
                $touched: true
            });

        getFormutil()
            .$getField('c[0]')!
            .$setState({
                $value: ''
            });

        expect(getFormutil().$invalid).toEqual(false);
        expect(getFormutil().$valid).toEqual(true);
        expect(getFormutil().$touched).toEqual(true);
        expect(getFormutil().$untouched).toEqual(false);
        expect(getFormutil().$dirty).toEqual(true);
        expect(getFormutil().$pristine).toEqual(false);
        expect(getFormutil().$focused).toEqual(true);
        expect(getFormutil().$pending).toEqual(true);

        await waitFor(() => {
            expect(getFormutil().$pending).toEqual(false);
            expect(getFormutil().$invalid).toEqual(true);
            expect(getFormutil().$valid).toEqual(false);
        });
    });

    test('$$registers / $$deepRegisters', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: value =>
                            new Promise((resolve, reject) =>
                                setTimeout(() => (value ? resolve() : reject('async error')), 200)
                            )
                    }}
                />
            </>
        );

        const fieldRegister = expect.objectContaining({
            $getState: expect.any(Function)
        });

        expect(getFormutil().$$registers).toMatchObject({
            'a.b': fieldRegister,
            'c[0]': fieldRegister
        });
        expect(getFormutil().$$deepRegisters).toMatchObject({
            a: {
                b: fieldRegister
            },
            c: [fieldRegister]
        });
    });

    test('$getField()', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
            </>
        );

        const fieldRegister = expect.objectContaining({
            $getState: expect.any(Function)
        });

        expect(getFormutil().$getField('a[b]')).toMatchObject(fieldRegister);
        expect(getFormutil().$getField('a')).toBeUndefined();
    });

    test('$getFirstError()', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
            </>
        );

        expect(getFormutil().$getFirstError()).toEqual('reuqired!');
        expect(getFormutil().$getFirstError('a[b]')).toEqual('reuqired!');
    });

    test('$setValues() / $setErrors() / $setStates() / $setDirts() / $setTouches() / $setPendings()', async () => {
        const { getFormutil } = renderForm<
            {
                a: { b: number };
                c: [number];
            },
            any,
            {
                'a.b': number;
                'c[0]': number;
            }
        >(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: value =>
                            new Promise((resolve, reject) =>
                                setTimeout(() => (value ? resolve() : reject('async error')), 200)
                            )
                    }}
                />
            </>
        );

        getFormutil().$setStates({
            a: {
                b: {
                    $value: 1
                }
            },
            'c[0]': {
                $value: 2
            }
        });
        expect(getFormutil().$params).toEqual({
            a: { b: 1 },
            c: [2]
        });

        getFormutil().$setValues({
            a: {
                b: 3
            },
            'c[0]': 4
        });
        expect(getFormutil().$params).toEqual({
            a: { b: 3 },
            c: [4]
        });

        getFormutil().$setErrors({
            a: {
                b: {
                    required: 'required!'
                }
            },
            'c[0]': {
                required: 'required!'
            }
        });
        expect(getFormutil().$errors).toEqual({
            a: {
                b: {
                    required: 'required!'
                }
            },
            c: [
                {
                    required: 'required!'
                }
            ]
        });

        getFormutil().$setTouches({
            a: {
                b: true
            },
            'c[0]': true
        });
        expect(getFormutil().$touches).toEqual({
            a: { b: true },
            c: [true]
        });

        getFormutil().$setDirts({
            a: {
                b: true
            },
            'c[0]': true
        });
        expect(getFormutil().$dirts).toEqual({
            a: { b: true },
            c: [true]
        });

        getFormutil().$setFocuses({
            a: {
                b: true
            },
            'c[0]': true
        });
        expect(getFormutil().$focuses).toEqual({
            a: { b: true },
            c: [true]
        });

        getFormutil().$setPendings({
            a: {
                b: true
            },
            'c[0]': true
        });
        expect(getFormutil().$pendings).toEqual({
            a: { b: true },
            c: [true]
        });
    });

    test('$onValidates()', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: value =>
                            new Promise((resolve, reject) =>
                                setTimeout(() => (value ? resolve() : reject('async error')), 200)
                            )
                    }}
                />
            </>
        );

        const callback = jest.fn();

        getFormutil().$onValidates(callback);
        expect(callback).not.toBeCalled();

        const valid = await getFormutil().$onValidates(callback);

        expect(valid).toBe(getFormutil());
        expect(callback).toBeCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(getFormutil());
    });

    test('$validates() / $validate()', async () => {
        const call1 = jest.fn(value => !!value || 'reuqired!');
        const call2 = jest.fn(
            value =>
                new Promise((resolve, reject) => setTimeout(() => (value ? resolve() : reject('async error')), 200))
        );
        const { getFormutil } = renderForm(
            <>
                <Field name="a.b" children={null} required $validators={{ required: call1 }} />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: call2
                    }}
                />
            </>
        );

        getFormutil().$validates();
        expect(call1).toBeCalledTimes(2);
        expect(call2).toBeCalledTimes(2);

        getFormutil().$validates('a[b]');
        expect(call1).toBeCalledTimes(3);
        expect(call2).toBeCalledTimes(2);

        getFormutil().$validate('c[0]');
        expect(call1).toBeCalledTimes(3);
        expect(call2).toBeCalledTimes(3);
    });

    test('$reset()', async () => {
        const { getFormutil } = renderForm(
            <>
                <Field
                    name="a.b"
                    children={null}
                    required
                    $validators={{ required: value => !!value || 'reuqired!' }}
                />
                <Field
                    name="c[0]"
                    children={null}
                    asyncValidate
                    $validators={{
                        asyncValidate: value =>
                            new Promise((resolve, reject) =>
                                setTimeout(() => (value ? resolve() : reject('async error')), 200)
                            )
                    }}
                />
            </>
        );

        getFormutil().$setStates({
            'a[b]': {
                $value: 1,
                $dirty: true
            },
            'c[0]': {
                $value: 2,
                $dirty: true
            }
        });
        expect(getFormutil().$states).toMatchObject({
            a: {
                b: expect.objectContaining({
                    $value: 1,
                    $dirty: true
                })
            },
            c: [
                expect.objectContaining({
                    $dirty: true,
                    $value: 2
                })
            ]
        });

        getFormutil().$reset();
        expect(getFormutil().$states).toMatchObject({
            a: {
                b: expect.objectContaining({
                    $value: '',
                    $dirty: false
                })
            },
            c: [
                expect.objectContaining({
                    $value: '',
                    $dirty: false
                })
            ]
        });

        // @ts-ignore
        getFormutil().$reset({
            a: {
                b: { $value: 1 }
            },
            'c[0]': {
                $value: 2
            }
        });
        expect(getFormutil().$states).toMatchObject({
            a: {
                b: expect.objectContaining({
                    $value: 1
                })
            },
            c: [
                expect.objectContaining({
                    $value: 2
                })
            ]
        });
    });
});
