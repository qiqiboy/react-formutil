import * as utils from '../src/utils';

test('parsePath() set value', () => {
    expect(utils.parsePath({}, 'a.b', true)).toEqual({
        a: { b: true }
    });

    expect(utils.parsePath({}, 'a[b]', true)).toEqual({
        a: { b: true }
    });

    expect(utils.parsePath({}, 'a["b"]', true)).toEqual({
        a: { b: true }
    });

    expect(utils.parsePath({}, 'a[1]', true)).toEqual({
        a: [undefined, true]
    });

    expect(utils.parsePath({}, 'a[1 + 1]', true)).toEqual({
        a: [undefined, undefined, true]
    });

    expect(utils.parsePath({}, 'a[1 + "a"]', true)).toEqual({
        a: {
            '1a': true
        }
    });

    expect(utils.parsePath({}, 'a.b[c][0][0].d', true)).toEqual({
        a: {
            b: {
                c: [
                    [
                        {
                            d: true
                        }
                    ]
                ]
            }
        }
    });
});

test('parsePath() get value', () => {
    expect(utils.parsePath({ a: { b: true } }, 'a.b')).toEqual(true);

    expect(utils.parsePath({ a: { b: true } }, 'a[b]')).toEqual(true);

    expect(utils.parsePath({ a: { b: true } }, 'a["b"]')).toEqual(true);

    expect(
        utils.parsePath(
            {
                a: [undefined, true]
            },
            'a[1]'
        )
    ).toEqual(true);

    expect(utils.parsePath({ a: [undefined, undefined, true] }, 'a[1 + 1]')).toEqual(true);

    expect(
        utils.parsePath(
            {
                a: {
                    '1a': true
                }
            },
            'a[1 + "a"]'
        )
    ).toEqual(true);

    expect(
        utils.parsePath(
            {
                a: {
                    b: {
                        c: [
                            [
                                {
                                    d: true
                                }
                            ]
                        ]
                    }
                }
            },
            'a.b[c][0][0].d'
        )
    ).toEqual(true);
});

test('isStateEqual()', () => {
    expect(
        utils.isStateEqual(
            {
                a: true
            },
            {
                a: true
            }
        )
    ).toBe(true);

    expect(
        utils.isStateEqual(
            {
                a: true
            },
            {
                a: true,
                b: true
            }
        )
    ).toBe(false);

    expect(
        utils.isStateEqual(
            {
                a: {}
            },
            {
                a: {}
            }
        )
    ).toBe(false);
});

test('objectClear()', () => {
    const obj = {
        a: {
            b: {
                c: [
                    [
                        {
                            d: true
                        }
                    ]
                ]
            }
        }
    };
    utils.objectClear(obj, 'a.b[c][0][0].d');

    expect(obj).toEqual({});

    const obj1 = {
        a: {
            b: {
                c: [
                    [
                        {
                            e: true
                        }
                    ]
                ],
                d: true
            }
        }
    };
    utils.objectClear(obj1, 'a.b[c][0][0].e');

    expect(obj1).toEqual({
        a: {
            b: {
                d: true
            }
        }
    });
});
