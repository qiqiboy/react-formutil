import React from 'react';
import { fireEvent, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../src';
import { renderForm, renderField } from './helper';

describe('name', () => {
    const nativeConsoleError = console.error;

    beforeEach(() => {
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error = nativeConsoleError;
    });

    test('should register form value with name "a"', () => {
        const { getFormutil } = renderForm(<Field name="a" children={null} />);
        const $formutil = getFormutil();

        expect($formutil.$$registers.a).toBeTruthy();
    });

    test('should unregister form value with name "a"', async () => {
        const { getFormutil, rerender } = renderForm(<Field name="a" children={null} />);

        rerender(null);

        const $formutil = getFormutil();

        expect($formutil.$$deepRegisters.a).toBeUndefined();
    });

    test('should register form value with nested-path name "a.b[1].c[2].d"', () => {
        const { getFormutil } = renderForm(<Field name="a.b[1].c[2].d" children={null} />);
        const $formutil = getFormutil();

        // @ts-ignore
        expect($formutil.$$deepRegisters.a.b[1].c[2].d).toBeTruthy();
        expect($formutil.$params.a.b[1].c[2].d).toBe('');
    });

    test('should show wanrings when missing name', () => {
        renderForm(<Field children={null} />);

        expect(console.error).toHaveBeenLastCalledWith(
            'Warning: You should assign a name to <Field />, otherwise it will be isolated!'
        );
    });

    test('should show wanrings if not underneath a Form', () => {
        render(<Field name="a" children={null} />);

        expect(console.error).toHaveBeenLastCalledWith(
            "Warning: You should enusre that the <Field /> with the name 'a' must be used underneath a <Form /> component or withForm() HOC, otherwise it's isolated."
        );
    });
});

describe('$defaultValue', () => {
    test('should set initial value', () => {
        const { getFieldutil } = renderField({
            name: 'a',
            $defaultValue: 'a'
        });

        expect(getFieldutil().$value).toBe('a');
    });

    test('should set initial value that equal function returns', () => {
        const { getFieldutil } = renderField({
            name: 'a',
            $defaultValue() {
                return 'a';
            }
        });

        expect(getFieldutil().$value).toBe('a');
    });
});

describe('$defaultState', () => {
    const initializedState = {
        $viewValue: 'a',
        $touched: true
    };

    test('should set initial state by a object', () => {
        const { getFieldutil } = renderField({
            name: 'a',
            $defaultState: initializedState
        });

        expect(getFieldutil().$getState()).toMatchObject(initializedState);
    });

    test('should set initial state by function returns', () => {
        const { getFieldutil } = renderField({
            name: 'a',
            $defaultState() {
                return initializedState;
            }
        });

        expect(getFieldutil().$getState()).toMatchObject(initializedState);
    });
});

describe('$validators', () => {
    const spyValidators = {
        sync: jest.fn(),
        async: jest.fn()
    };
    const $validators = {
        syncValidate: (value) => {
            spyValidators.sync();

            return !!value || 'sync-validate!';
        },
        asyncValidate: jest.fn((value) => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    spyValidators.async();
                    reject(new Error('async-validate!'));
                }, 200)
            );
        })
    };

    test("should be called and validate field's error", async () => {
        const { getFieldutil, rerender } = renderField({
            name: 'a',
            $validators,
            syncValidate: true
        });

        expect(getFieldutil().$error).toEqual({
            syncValidate: 'sync-validate!'
        });

        expect(spyValidators.sync).toBeCalledTimes(1);
        expect($validators.asyncValidate).not.toBeCalled();

        rerender({
            asyncValidate: true
        });

        getFieldutil().$render('');

        expect(spyValidators.sync).toBeCalledTimes(2);
        expect($validators.asyncValidate).toBeCalledTimes(1);

        await waitFor(() => {
            expect(getFieldutil().$error).toEqual({
                syncValidate: 'sync-validate!',
                asyncValidate: new Error('async-validate!')
            });

            expect(spyValidators.async).toBeCalledTimes(1);
        });

        getFieldutil().$render('a');

        await waitFor(() => {
            expect(getFieldutil().$error).toEqual({
                asyncValidate: new Error('async-validate!')
            });

            expect(spyValidators.sync).toBeCalledTimes(3);
            expect(spyValidators.async).toBeCalledTimes(2);
        });
    });
});

describe('$validateLazy', () => {
    const $validators = {
        syncValidate: jest.fn((value) => {
            return !!value || 'sync-validate!';
        }),
        asyncValidate: jest.fn((value) => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    reject(new Error('async-validate!'));
                }, 200)
            );
        })
    };

    test('should cancel the rest validators calls when get the first error', async () => {
        const { getFieldutil, rerender } = renderField({
            name: 'a',
            $validators,
            syncValidate: true,
            asyncValidate: true
        });

        expect($validators.syncValidate).toBeCalledTimes(1);
        expect($validators.asyncValidate).toBeCalledTimes(1);

        rerender({
            $validateLazy: true
        });

        getFieldutil().$render('');
        expect($validators.syncValidate).toBeCalledTimes(2);
        expect($validators.asyncValidate).toBeCalledTimes(1);

        getFieldutil().$render('a');
        expect($validators.syncValidate).toBeCalledTimes(3);
        expect($validators.asyncValidate).toBeCalledTimes(2);
    });
});

describe('$reserveOnUnmount', () => {
    test('should keep value in form when Field removed', async () => {
        const { getFormutil, rerender } = renderForm(<Field name="a" children={null} />);

        expect(getFormutil().$params).toHaveProperty('a');

        rerender(null);
        expect(getFormutil().$params).not.toHaveProperty('a');

        rerender(<Field name="a" $reserveOnUnmount children={null} />);
        expect(getFormutil().$params).toHaveProperty('a');

        rerender(null);
        expect(getFormutil().$params).toHaveProperty('a');
    });
});

describe('$parser & $formatter', () => {
    test('should transform $viewValue <-> $value', async () => {
        const { getFieldutil, getElement, rerender } = renderField({
            name: 'a',
            $defaultValue: '0',
            $parser(value) {
                return 'parser: ' + value;
            },
            $formatter(value) {
                return 'formatter: ' + value;
            }
        });

        expect(getFieldutil().$value).toBe('0');
        expect(getFieldutil().$viewValue).toBe('formatter: 0');

        getElement().value = '';
        userEvent.type(getElement(), '1');
        expect(getFieldutil().$value).toBe('parser: 1');
        expect(getFieldutil().$viewValue).toBe('1');

        rerender({
            $parser(value, $setViewValue) {
                return $setViewValue('parser: ' + value);
            },
            $formatter(value, $setModelValue) {
                return $setModelValue('formatter: ' + value);
            }
        });

        getFieldutil().$setValue('2');
        expect(getFieldutil().$value).toBe('formatter: 2');
        expect(getFieldutil().$viewValue).toBe('formatter: 2');

        getElement().value = '';
        userEvent.type(getElement(), '3');
        expect(getFieldutil().$value).toBe('parser: 3');
        expect(getFieldutil().$viewValue).toBe('parser: 3');
    });
});

describe('$ref', () => {
    test('should pass $fieldutil as argument to function', async () => {
        let $ref;
        const { getFieldutil } = renderField({
            name: 'a',
            $ref: (ref) => ($ref = ref)
        });

        expect($ref).toBe(getFieldutil());
    });

    test('should setin $fieldutil to createRef()', async () => {
        let $ref = React.createRef<any>();
        const { getFieldutil } = renderField({
            name: 'a',
            $ref
        });

        expect($ref.current).toBe(getFieldutil());
    });
});

describe('$memo', () => {
    test('should not rerender if props deep equal', async () => {
        const renderA = jest.fn();
        const renderB = jest.fn();
        const getFormContent = () => (
            <>
                <Field name="a" $memo propObject={{}} render={renderA} />
                <Field name="b" render={renderB} />
            </>
        );

        const { rerender } = renderForm(getFormContent());

        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent());
        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(2);
    });

    test("should rerender if Field'state changed", async () => {
        const renderA = jest.fn();
        const renderB = jest.fn();
        const getFormContent = () => (
            <>
                <Field name="a" $memo render={renderA} />
                <Field name="b" $memo={[]} render={renderB} />
            </>
        );

        const { getFormutil } = renderForm(getFormContent());

        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);

        getFormutil().$setValues({
            a: 1,
            b: 1
        });

        expect(renderA).toBeCalledTimes(2);
        expect(renderB).toBeCalledTimes(2);
    });

    test("should rerender if Field'props changed", async () => {
        const renderA = jest.fn();
        const renderB = jest.fn();
        const getFormContent = () => (
            <>
                <Field name="a" $memo $validators={{ mutableFunc: () => {} }} render={renderA} />
                <Field name="b" $memo render={renderB} />
            </>
        );

        const { rerender } = renderForm(getFormContent());

        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent());
        expect(renderA).toBeCalledTimes(2);
        expect(renderB).toBeCalledTimes(1);
    });

    test("$memo=[] should not rerender even Field'props changed", async () => {
        const renderA = jest.fn();
        const renderB = jest.fn();
        const getFormContent = () => (
            <>
                <Field name="a" $memo={[]} $validators={{ mutableFunc: () => {} }} render={renderA} />
                <Field name="b" $memo={[]} render={renderB} />
            </>
        );

        const { rerender } = renderForm(getFormContent());

        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent());
        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);
    });

    test('$memo=[...deps] should rerender if deps changed', async () => {
        const renderA = jest.fn();
        const renderB = jest.fn();
        const getFormContent = (...deps) => (
            <>
                <Field name="a" $memo={[...deps]} render={renderA} />
                <Field name="b" $memo={[]} render={renderB} />
            </>
        );

        const { rerender } = renderForm(getFormContent());

        expect(renderA).toBeCalledTimes(1);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent(1));
        expect(renderA).toBeCalledTimes(2);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent(1));
        expect(renderA).toBeCalledTimes(2);
        expect(renderB).toBeCalledTimes(1);

        rerender(getFormContent(1, 2));
        expect(renderA).toBeCalledTimes(3);
        expect(renderB).toBeCalledTimes(1);
    });
});

describe('$onFieldChange()', () => {
    test('called when field value change', async () => {
        const onChange = jest.fn();
        const { getFormutil, getElement } = renderField({
            name: 'a',
            $onFieldChange: onChange
        });

        expect(onChange).not.toBeCalled();

        userEvent.type(getElement(), 'abc', {
            allAtOnce: true
        });

        await waitFor(() => {
            expect(onChange).toBeCalled();
            expect(onChange.mock.calls[0]).toEqual(['abc', '', getFormutil()]);
        });
    });
});

describe('$fieldutil', () => {
    test('$state & $getState()', () => {
        const { getFieldutil } = renderField({
            name: 'a'
        });
        const $fieldutil = getFieldutil();
        const strictState = {
            $value: expect.anything(),
            $viewValue: expect.anything(),
            $dirty: expect.any(Boolean),
            $pristine: expect.any(Boolean),
            $touched: expect.any(Boolean),
            $untouched: expect.any(Boolean),
            $focused: expect.any(Boolean),
            $pending: expect.any(Boolean),
            $valid: expect.any(Boolean),
            $invalid: expect.any(Boolean),
            $error: expect.objectContaining({})
        };

        expect($fieldutil.$value).toBe('');
        expect($fieldutil.$dirty).toBe(false);
        expect($fieldutil.$touched).toBe(false);
        expect($fieldutil.$focused).toBe(false);
        expect($fieldutil.$error).toMatchObject({});
        expect($fieldutil).toMatchObject(strictState);
        expect($fieldutil.$getState()).toEqual(strictState);
    });

    test('change value', async () => {
        const { getFieldutil, getByTestId } = renderField({
            name: 'a'
        });
        const input = getByTestId('input');

        fireEvent.focus(input);

        fireEvent.input(input, {
            target: { value: 'b' }
        });
        // await userEvent.type(input, 'b');

        expect(getFieldutil().$value).toBe('b');
        expect(getFieldutil().$dirty).toBe(true);
        expect(getFieldutil().$focused).toBe(true);

        fireEvent.blur(input);

        expect(getFieldutil().$focused).toBe(false);
        expect(getFieldutil().$touched).toBe(true);

        getFieldutil().$$formutil.$setValues({
            a: 'c'
        });

        expect(input.value).toBe('c');
    });

    test('$reset()', async () => {
        const { getFieldutil, getByTestId } = renderField({
            name: 'a'
        });
        const input = getByTestId('input');

        await userEvent.type(input, 'b');

        expect(getFieldutil().$value).toBe('b');
        getFieldutil().$reset();
        expect(getFieldutil().$value).toBe('');
    });

    test('$setState()', async () => {
        const callback = jest.fn();

        const { getFieldutil, getByTestId } = renderField({
            name: 'a'
        });

        getFieldutil().$setState(
            {
                $dirty: true,
                $viewValue: 'b'
            },
            callback
        );

        const input = getByTestId('input') as HTMLInputElement;

        expect(getFieldutil().$value).toBe('b');
        expect(getFieldutil().$pristine).toBe(false);
        expect(callback).toBeCalled();
        expect(input.value).toBe('b');
    });

    test('$setValue() / $render()', async () => {
        const callback = jest.fn();

        const { getFieldutil, findByTestId } = renderField({
            name: 'b'
        });

        getFieldutil().$setValue('b', callback);

        const input = (await findByTestId('input')) as HTMLInputElement;

        expect(getFieldutil().$value).toBe('b');
        expect(callback).toBeCalled();
        expect(input.value).toBe('b');

        callback.mockClear();

        getFieldutil().$render('c', callback);

        expect(getFieldutil().$value).toBe('c');
        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toBe(getFieldutil());
        expect(input.value).toBe('c');
    });

    test('$setError()/$setValidaty()', async () => {
        const callback = jest.fn();

        const { getFieldutil } = renderField({
            name: 'a'
        });

        getFieldutil().$setError(
            {
                required: 'required!'
            },
            callback
        );

        getFieldutil().$setValidity('maxlength', 'maxlength < 5', callback);

        expect(getFieldutil().$error).toEqual({
            required: 'required!',
            maxlength: 'maxlength < 5'
        });

        expect(callback).toBeCalled();
        expect(callback.mock.calls[1][0]).toBe(getFieldutil());
    });

    const stateMap = {
        $dirty: '$setDirty',
        $touched: '$setTouched',
        $focused: '$setFocused'
    };

    Object.keys(stateMap).forEach((key) => {
        const method = stateMap[key];

        test(method + '()', async () => {
            const callback = jest.fn();

            const { getFieldutil } = renderField({
                name: 'a'
            });

            await getFieldutil()[method](true, callback).then(callback);

            expect(getFieldutil()[key]).toBe(true);
            expect(callback).toBeCalledTimes(2);
            expect(callback.mock.calls[0][0]).toBe(getFieldutil());
        });
    });

    test('$validate() / $onValidate()', async () => {
        const callback = jest.fn((v) => !!v);

        const { getFieldutil } = renderField({
            name: 'b',
            required: true,
            $validators: {
                required: callback
            }
        });

        expect(callback).toBeCalledTimes(1);
        getFieldutil().$validate();
        expect(callback).toBeCalledTimes(2);

        await getFieldutil().$onValidate();
        expect(callback).toBeCalledTimes(2);
    });
});
