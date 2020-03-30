import React from 'react';
import userEvent from '@testing-library/user-event';
import { withField } from '../src';
import { renderForm } from './helper';

const CustomField = withField(({ $fieldutil, ...others }) => {
    return <input {...others} value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />;
});

test('should pass $fieldutil', async () => {
    const { getFormutil, getByTestId } = renderForm(<CustomField name="a" $defaultValue="1" data-testid="input" />);

    expect(getFormutil().$params).toEqual({
        a: '1'
    });

    userEvent.type(getByTestId('input'), '2');

    expect(getFormutil().$params).toEqual({
        a: '12'
    });
});
