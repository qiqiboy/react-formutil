import React from 'react';
import { connect, EasyField } from '../src';
import { renderForm } from './helper';

const ConnectForm = connect(props => {
    props.formRef?.(props.$formutil);

    return <EasyField name="a" />;
});

test('should pass $formutil', async () => {
    let innerFormutil;
    const { getFormutil } = renderForm(<ConnectForm formRef={f => (innerFormutil = f)} />);

    expect(getFormutil()).toBe(innerFormutil.$new());
});
