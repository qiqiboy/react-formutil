import React from 'react';
import { render } from '@testing-library/react';
import { $Formutil } from '..';
import { Form as FormCJS, EasyField as EasyFieldCJS } from '../dist/react-formutil.cjs.development';
import { Form as FormESM, EasyField as EasyFieldESM } from '../dist/react-formutil.esm.development';
import { Form as FormUMD, EasyField as EasyFieldUMD } from '../dist/react-formutil.umd.development';

test('react-formutil.cjs.production should running', async () => {
    let formutilRef = React.createRef<$Formutil>();
    render(
        <FormCJS $ref={formutilRef}>
            {() => (
                <>
                    <EasyFieldCJS name="a" $defaultValue={1} />
                    <EasyFieldCJS name="b.c" $defaultValue={2} />
                </>
            )}
        </FormCJS>
    );

    expect(formutilRef.current!.$params).toEqual({
        a: 1,
        b: {
            c: 2
        }
    });
});

test('react-formutil.esm.production should running', async () => {
    let formutilRef = React.createRef<$Formutil>();
    render(
        <FormESM $ref={formutilRef}>
            {() => (
                <>
                    <EasyFieldESM name="a" $defaultValue={1} />
                    <EasyFieldESM name="b.c" $defaultValue={2} />
                </>
            )}
        </FormESM>
    );

    expect(formutilRef.current!.$params).toEqual({
        a: 1,
        b: {
            c: 2
        }
    });
});

test('react-formutil.umd.production should running', async () => {
    let formutilRef = React.createRef<$Formutil>();
    render(
        <FormUMD $ref={formutilRef}>
            {() => (
                <>
                    <EasyFieldUMD name="a" $defaultValue={1} />
                    <EasyFieldUMD name="b.c" $defaultValue={2} />
                </>
            )}
        </FormUMD>
    );

    expect(formutilRef.current!.$params).toEqual({
        a: 1,
        b: {
            c: 2
        }
    });
});
