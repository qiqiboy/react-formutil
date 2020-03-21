import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { withForm, EasyField } from '../src';
import { $Formutil } from '../index.d';

function FormPage() {
    return (
        <div>
            <EasyField name="a" />
            <EasyField name="b" />
        </div>
    );
}

test('withForm', () => {
    const formutilRef = React.createRef<$Formutil>();
    const Form = withForm(FormPage);
    render(<Form $ref={formutilRef} />);

    expect(formutilRef.current!.$params).toEqual({
        a: '',
        b: ''
    });
});
