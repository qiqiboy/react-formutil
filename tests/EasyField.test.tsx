import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { $Listutil } from '../index.d';
import { EasyField } from '../src';
import { renderForm } from './helper';

describe('native browser field', () => {
    test('input*', async () => {
        const { getFormutil, getByPlaceholderText } = renderForm(
            <form data-testid="form">
                <EasyField type="text" name="text" placeholder="text" />
                <EasyField type="password" name="password" placeholder="password" $defaultValue="123" />
                <EasyField name="custom">
                    <input placeholder="custom" />
                </EasyField>
            </form>
        );

        expect(getFormutil().$params).toEqual({
            text: getByPlaceholderText('text').value,
            password: getByPlaceholderText('password').value,
            custom: getByPlaceholderText('custom').value
        });

        getFormutil().$setValues({
            text: '123',
            custom: '123'
        });
        expect(getFormutil().$getField('text')!.$value).toBe('123');
        expect(getByPlaceholderText('text')).toHaveValue('123');
        expect(getByPlaceholderText('custom')).toHaveValue('123');

        userEvent.type(getByPlaceholderText('password'), '456');
        expect(getFormutil().$params).toEqual({
            text: '123',
            password: '123456',
            custom: '123'
        });

        fireEvent.focus(getByPlaceholderText('text'));
        expect(getFormutil().$focused).toEqual(true);

        fireEvent.blur(getByPlaceholderText('text'));
        expect(getFormutil().$focused).toEqual(false);
        expect(getFormutil().$touched).toEqual(true);
    });

    test('select*', () => {
        const { getFormutil } = renderForm(
            <>
                <EasyField type="select" name="select.single" data-testid="single">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </EasyField>
                <EasyField type="select" multiple name="select.multiple" data-testid="multiple">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </EasyField>
            </>
        );

        expect(getFormutil().$params).toEqual({
            select: {
                single: '',
                multiple: []
            }
        });
    });

    test('checkbox / radio', async () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField type="checkbox" name="checkbox" data-testid="checkbox" />
                <EasyField type="radio" name="radio" data-testid="radio" />
            </>
        );

        expect(getFormutil().$params).toEqual({
            checkbox: false,
            radio: false
        });

        getFormutil().$setValues({
            radio: true
        });

        expect(getByTestId('radio')).toBeChecked();

        userEvent.click(getByTestId('checkbox'));
        expect(getFormutil().$params).toEqual({
            checkbox: true,
            radio: true
        });
    });

    test('group', async () => {
        const { getFormutil, getByTestId } = renderForm(
            <EasyField type="group.checkbox" name="group">
                {({ GroupOption }) => (
                    <div>
                        <GroupOption $value={1} data-testid="a1" />
                        <GroupOption $value={2} data-testid="a2" />
                    </div>
                )}
            </EasyField>
        );

        expect(getFormutil().$params).toEqual({
            group: []
        });

        getFormutil().$setValues({
            group: [1]
        });

        expect(getByTestId('a1')).toBeChecked();

        userEvent.click(getByTestId('a2'));
        expect(getFormutil().$params).toEqual({
            group: [1, 2]
        });
    });

    test('list', async () => {
        let listHandlers: $Listutil[] = [];
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField type="list" name="list" required validMessage={{ required: 'required!' }}>
                    {$listutil => {
                        listHandlers[$listutil.$index] = $listutil;

                        return (
                            <div>
                                <EasyField name="a" required data-testid="a" />
                                <EasyField name="b" />
                            </div>
                        );
                    }}
                </EasyField>
            </>
        );

        expect(listHandlers[0].$params).toEqual({
            a: '',
            b: ''
        });

        expect(listHandlers[0].$errors).toEqual({
            a: {
                required: 'Error input: required'
            }
        });

        expect(getFormutil().$errors).toEqual({
            list: {
                required: 'required!'
            }
        });
        expect(getFormutil().$params).toEqual({
            list: []
        });

        userEvent.type(getByTestId('a'), 'a');

        await waitFor(() => {
            expect(getFormutil().$params).toEqual({
                list: [{ a: 'a', b: '' }]
            });
        });

        expect(getFormutil().$errors).toEqual({});
    });
});

const MyInput = props => <input data-testid="input" {...props} />;

describe('custom component field', () => {
    test('children', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" $defaultValue="1">
                    <MyInput />
                </EasyField>
            </>
        );

        expect(getByTestId('input').value).toBe('1');
        expect(getByTestId('input').value).toBe(getFormutil().$params.a);

        userEvent.type(getByTestId('input'), '2');
        expect(getFormutil().$params.a).toBe('12');

        fireEvent.focus(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(true);

        fireEvent.blur(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(false);
        expect(getFormutil().$touched).toEqual(true);
    });

    test('component', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" $defaultValue="1" component={MyInput} />
            </>
        );

        expect(getByTestId('input').value).toBe('1');
        expect(getByTestId('input').value).toBe(getFormutil().$params.a);

        userEvent.type(getByTestId('input'), '2');
        expect(getFormutil().$params.a).toBe('12');

        fireEvent.focus(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(true);

        fireEvent.blur(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(false);
        expect(getFormutil().$touched).toEqual(true);
    });

    test('render props', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" $defaultValue="1" render={props => <MyInput {...props} />} />
                <EasyField name="b" $defaultValue="2" data-testid="input-2">
                    {props => <MyInput {...props} />}
                </EasyField>
            </>
        );

        expect(getByTestId('input').value).toBe('1');
        expect(getByTestId('input-2').value).toBe('2');
        expect(getFormutil().$params).toEqual({
            a: getByTestId('input').value,
            b: getByTestId('input-2').value
        });

        userEvent.type(getByTestId('input'), '2');
        expect(getFormutil().$params).toEqual({
            a: '12',
            b: '2'
        });

        fireEvent.focus(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(true);

        fireEvent.blur(getByTestId('input'));
        expect(getFormutil().$focused).toEqual(false);
        expect(getFormutil().$touched).toEqual(true);
    });
});

describe('built-in validators', () => {
    test('required', () => {
        const { getFormutil } = renderForm(
            <>
                <EasyField name="a" required $defaultValue="" />
                <EasyField name="b" required $defaultValue={[]} />
                <EasyField name="c" required $defaultValue={false} />
                <EasyField name="d" required $defaultValue={undefined} />
                <EasyField name="e" required $defaultValue={null} children={null} />
                <EasyField name="f" required $defaultValue={0} />
                <EasyField type="checkbox" name="g" required />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { required: 'Error input: required' },
            b: { required: 'Error input: required' },
            d: { required: 'Error input: required' },
            e: { required: 'Error input: required' },
            g: { required: 'Error input: required' }
        });
    });

    test('max/min', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" $defaultValue={1} min={10} max={20} />
                <EasyField name="b" data-testid="input-2" $defaultValue={undefined} min={10} max={20} />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { min: 'Error input: min' }
        });

        userEvent.type(getByTestId('input'), '1'); // 11
        userEvent.type(getByTestId('input-2'), '11'); // 11
        expect(getFormutil().$errors).toEqual({});

        userEvent.type(getByTestId('input'), '1'); // 111
        userEvent.type(getByTestId('input-2'), '1'); // 111
        expect(getFormutil().$errors).toEqual({
            a: { max: 'Error input: max' },
            b: { max: 'Error input: max' }
        });
    });

    test('maxLength/minLength', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" required $defaultValue="" minLength={2} maxLength={5} />
                <EasyField name="b" data-testid="input-2" $defaultValue={undefined} minLength={2} maxLength={5} />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { required: 'Error input: required' }
        });

        userEvent.type(getByTestId('input'), '123'); // 12
        userEvent.type(getByTestId('input-2'), '123'); // 12
        expect(getFormutil().$errors).toEqual({});

        userEvent.type(getByTestId('input'), '456'); // 123456
        userEvent.type(getByTestId('input-2'), '456'); // 123456
        expect(getFormutil().$errors).toEqual({
            a: { maxLength: 'Error input: maxLength' },
            b: { maxLength: 'Error input: maxLength' }
        });
    });

    test('pattern', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" $defaultValue="abc" pattern={/@/} />
                <EasyField name="b" data-testid="input-2" $defaultValue={undefined} pattern={/@/} />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { pattern: 'Error input: pattern' }
        });

        userEvent.type(getByTestId('input'), '@123'); // abc@123
        userEvent.type(getByTestId('input-2'), 'abc@123'); // abc@123
        expect(getFormutil().$errors).toEqual({});
    });

    test('enum', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" $defaultValue="a" enum={['a1', '2', '3']} />
                <EasyField name="b" data-testid="input-2" $defaultValue={undefined} enum={['a1', '2', '3']} />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { enum: 'Error input: enum' }
        });

        userEvent.type(getByTestId('input'), '1'); // a1
        expect(getFormutil().$errors).toEqual({});
    });

    test('checker', () => {
        const checkerSpy = jest.fn(value => value * 1 > 10);
        const checkerSpy2 = jest.fn(value => value * 1 > 10);
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" $defaultValue="1" checker={checkerSpy} />
                <EasyField name="b" data-testid="input-2" $defaultValue={undefined} checker={checkerSpy2} />
            </>
        );

        expect(checkerSpy).toBeCalledTimes(1);
        expect(checkerSpy2).toBeCalledTimes(1);
        expect(getFormutil().$errors).toEqual({
            a: { checker: 'Error input: checker' },
            b: { checker: 'Error input: checker' }
        });

        userEvent.type(getByTestId('input'), '1'); // 11
        userEvent.type(getByTestId('input-2'), '1'); // 1
        expect(getFormutil().$errors).toEqual({
            b: { checker: 'Error input: checker' }
        });
        expect(checkerSpy).toBeCalledTimes(2);
        expect(checkerSpy2).toBeCalledTimes(2);
    });

    test('required has high priority', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField name="a" data-testid="input" $defaultValue="" required minLength={2} maxLength={5} />
                <EasyField
                    name="b"
                    data-testid="input-2"
                    $defaultValue={undefined}
                    required
                    minLength={2}
                    maxLength={5}
                />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: { required: 'Error input: required' },
            b: { required: 'Error input: required' }
        });

        userEvent.type(getByTestId('input'), '1'); // 1
        userEvent.type(getByTestId('input-2'), '1'); // 1
        expect(getFormutil().$errors).toEqual({
            a: { minLength: 'Error input: minLength' },
            b: { minLength: 'Error input: minLength' }
        });
    });
});

describe('checked / unchecked', () => {
    test('map to correct value', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField type="checkbox" checked="yes" unchecked="no" name="a" data-testid="input" />
            </>
        );

        expect(getFormutil().$params).toEqual({
            a: 'no'
        });

        userEvent.click(getByTestId('input'));
        expect(getFormutil().$params).toEqual({
            a: 'yes'
        });
    });
});

describe('validMessage', () => {
    test('map to error message', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField
                    name="a"
                    data-testid="input"
                    required
                    minLength={5}
                    validMessage={{
                        required: 'Please type something',
                        minLength: 'Your name should be more than 5 characters'
                    }}
                />
            </>
        );

        expect(getFormutil().$errors).toEqual({
            a: {
                required: 'Please type something'
            }
        });

        userEvent.type(getByTestId('input'), '1');
        expect(getFormutil().$errors).toEqual({
            a: {
                minLength: 'Your name should be more than 5 characters'
            }
        });
    });
});

describe('valuePropName / changePropName / focusPropName / blurPropName', () => {
    test('change fieldHandler', () => {
        let fieldHandler;
        renderForm(
            <>
                <EasyField
                    name="a"
                    valuePropName="checked"
                    changePropName="onSubmit"
                    focusPropName="onEnter"
                    blurPropName="onLeave"
                    render={a => {
                        fieldHandler = a;
                        return null;
                    }}
                />
            </>
        );

        expect(fieldHandler).toEqual({
            checked: expect.anything(),
            onSubmit: expect.any(Function),
            onEnter: expect.any(Function),
            onLeave: expect.any(Function)
        });
    });
});

describe('passUtil', () => {
    test('pass $fieldutil', () => {
        let fieldHandler;
        const { rerender } = renderForm(
            <>
                <EasyField
                    name="a"
                    passUtil
                    render={a => {
                        fieldHandler = a;
                        return null;
                    }}
                />
            </>
        );

        expect(fieldHandler).toHaveProperty('$fieldutil');

        rerender(
            <>
                <EasyField
                    name="a"
                    passUtil="fieldutilAlias"
                    render={a => {
                        fieldHandler = a;
                        return null;
                    }}
                />
            </>
        );

        expect(fieldHandler).toHaveProperty('fieldutilAlias');
    });
});

describe('getValueFromEvent()', () => {
    test('custom how to get value', () => {
        const { getFormutil, getByTestId } = renderForm(
            <>
                <EasyField
                    name="a"
                    data-testid="input"
                    getValueFromEvent={ev => {
                        return ev.target.value + '--';
                    }}
                />
            </>
        );

        expect(getFormutil().$params).toEqual({
            a: ''
        });

        userEvent.type(getByTestId('input'), '1');
        expect(getFormutil().$params).toEqual({
            a: '1--'
        });
    });
});
