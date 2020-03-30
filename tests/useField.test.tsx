import React from 'react';
import userEvent from '@testing-library/user-event';
import { useField } from '../src';
import { renderForm } from './helper';

function UseFieldCompoennt(props) {
    const $fieldutil = useField(props);

    return (
        <input data-testid="input" value={$fieldutil.$viewValue} onChange={ev => $fieldutil.$render(ev.target.value)} />
    );
}

test('should handle input field', () => {
    const { getFormutil, getByTestId } = renderForm(<UseFieldCompoennt name="a" $defaultValue="1" />);

    expect(getFormutil().$params).toEqual({
        a: '1'
    });

    userEvent.type(getByTestId('input'), '2');

    expect(getFormutil().$params).toEqual({
        a: '12'
    });
});
