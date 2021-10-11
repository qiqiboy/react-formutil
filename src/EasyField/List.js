import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import Form from '../Form';
import Field from '../Field';
import { isUndefined, isFunction, runCallback } from '../utils';

const Wrapper = React.Frament || 'div';

class EasyFieldList extends Component {
    static displayName = 'React.Formutil.EasyField.List';

    static propTypes = {
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.array,

        children: PropTypes.func.isRequired
    };

    id = 0;
    latestValue = this.props.value;
    $formutil;

    constructor(props) {
        super(props);

        this.state = {
            items: props.value.length ? props.value.map(() => this.getId()) : [this.getId()],
            formKey: 0
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== this.latestValue) {
            this.setState({
                items: this.props.value.length ? this.props.value.map(() => this.getId()) : [this.getId()],
                formKey: this.state.formKey + 1
            });

            this.latestValue = this.props.value;
        }
    }

    getId(values) {
        return {
            id: this.id++,
            values
        };
    }

    FieldValidators = {
        required(value) {
            return value !== null;
        }
    };

    $onFormChange = $formutil => {
        $formutil.$onValidates($formutil => {
            const { $invalid, $params } = $formutil;

            if ($invalid) {
                if (this.props.value.length) {
                    this.props.onChange((this.latestValue = []));
                }
            } else if (!isEqual(this.props.value, $params.list)) {
                this.props.onChange((this.latestValue = $params.list));
            }
        });
    };

    swap = (m, n, callback) =>
        this.$setState(({ items }) => {
            [items[n], items[m]] = [items[m], items[n]];

            return items;
        }, callback);

    insert = (...args) => {
        let m, values, callback;

        args.forEach(arg => {
            if (isFunction(arg)) {
                callback = arg;
            } else if (typeof arg === 'number') {
                m = arg;
            } else if (typeof arg === 'object') {
                values = arg;
            }
        });

        return this.$setState(({ items }) => {
            if (isUndefined(m)) {
                items.push(this.getId(values));
            } else {
                items.splice(m, 0, this.getId(values));
            }

            return { items };
        }, callback);
    };

    remove = (...args) => {
        let m, callback;

        args.forEach(arg => {
            if (isFunction(arg)) {
                callback = arg;
            } else if (typeof arg === 'number') {
                m = arg;
            }
        });

        return this.$setState(({ items }) => {
            if (isUndefined(m)) {
                items.pop();
            } else {
                items.splice(m, 1);
            }

            if (!items.length) {
                items = [this.getId()];
            }

            return { items };
        }, callback);
    };

    $setState = (updater, callback) =>
        new Promise(resolve =>
            this.setState(updater, () =>
                this.$formutil.$onValidates($formutil => resolve(runCallback(callback, $formutil)))
            )
        );

    render() {
        const { children, onFocus, onBlur, value } = this.props;
        const $self = this;

        if (!isFunction(children)) {
            return null;
        }

        const $baseutil = {
            $insert: this.insert,
            $remove: this.remove,
            $swap: this.swap,
            $push: (values, callback) => this.insert(values, callback),
            $pop: callback => this.remove(callback),
            $shift: callback => this.remove(0, callback),
            $unshift: (values, callback) => this.insert(0, values, callback),
            onFocus,
            onBlur
        };

        return (
            <Form
                key={this.state.formKey}
                $defaultValues={{
                    list: value
                }}
                $onFormChange={this.$onFormChange}
                children={$formutil => {
                    this.$formutil = $formutil;

                    return (
                        <Wrapper>
                            {this.state.items.map(({ id, values }, index) => (
                                <Field
                                    key={id}
                                    required
                                    $defaultValue={values || null}
                                    $validators={this.FieldValidators}
                                    name={`list[${index}]`}
                                    children={$fieldutil => {
                                        return (
                                            <Form
                                                $defaultValues={$fieldutil.$value || {}}
                                                $onFormChange={$formutil =>
                                                    $formutil.$onValidates($formutil => {
                                                        const { $invalid, $params } = $formutil;

                                                        if (!isEqual($fieldutil.$viewValue, $params)) {
                                                            $fieldutil.$setState({
                                                                $viewValue: $params,
                                                                $value: $invalid ? null : $params
                                                            });
                                                        }
                                                    })
                                                }
                                                children={$innerFormutil =>
                                                    children(
                                                        {
                                                            get $length() {
                                                                return $self.state.items.length;
                                                            },
                                                            $index: index,
                                                            $isLast: () => index === this.state.items.length - 1,
                                                            $isFirst: () => index === 0,
                                                            ...$baseutil,
                                                            ...$innerFormutil
                                                        },
                                                        $formutil
                                                    )
                                                }
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </Wrapper>
                    );
                }}
            />
        );
    }
}

export default EasyFieldList;
