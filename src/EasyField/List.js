import React, { Component } from 'react';
import Form from '../Form';
import Field from '../Field';
import PropTypes from 'prop-types';
import { isUndefined, isFunction, runCallback } from '../utils';

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

    getId() {
        return this.id++;
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
            } else if (JSON.stringify(this.props.value) !== JSON.stringify($params.list)) {
                this.props.onChange((this.latestValue = $params.list));
            }
        });
    };

    swap = (m, n, callback) =>
        this.$setState(({ items }) => {
            [items[n], items[m]] = [items[m], items[n]];

            return items;
        }, callback);

    insert = (m, callback) => {
        if (isUndefined(m)) {
            callback = m;
        }

        return this.$setState(({ items }) => {
            if (isUndefined(m)) {
                items.push(this.getId());
            } else {
                items.splice(m, 0, this.getId());
            }

            return { items };
        }, callback);
    };

    remove = (m, callback) => {
        if (isUndefined(m)) {
            callback = m;
        }

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

        if (!isFunction(children)) {
            return null;
        }

        const $baseutil = {
            $length: this.state.items.length,
            $insert: this.insert,
            $remove: this.remove,
            $swap: this.swap,
            $push: callback => this.insert(callback),
            $pop: callback => this.remove(callback),
            $shift: callback => this.remove(0, callback),
            $unshift: callback => this.insert(0, callback),
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

                    return this.state.items.map((id, index) => (
                        <Field
                            key={id}
                            required
                            $defaultValue={null}
                            $validators={this.FieldValidators}
                            name={`list[${index}]`}
                            children={$fieldutil => {
                                return (
                                    <Form
                                        $defaultValues={$fieldutil.$value || {}}
                                        $onFormChange={$formutil =>
                                            $formutil.$onValidates($formutil => {
                                                const { $invalid, $params } = $formutil;

                                                if ($invalid) {
                                                    if ($fieldutil.$viewValue !== null) {
                                                        $fieldutil.$render(null);
                                                    }
                                                } else if (
                                                    JSON.stringify($fieldutil.$viewValue) !== JSON.stringify($params)
                                                ) {
                                                    $fieldutil.$render($params);
                                                }
                                            })
                                        }
                                        children={$innerFormutil =>
                                            children(
                                                {
                                                    ...$baseutil,
                                                    ...$innerFormutil,
                                                    $index: index,
                                                    $isLast: () => index === this.state.items.length - 1,
                                                    $isFirst: () => index === 0
                                                },
                                                $formutil
                                            )
                                        }
                                    />
                                );
                            }}
                        />
                    ));
                }}
            />
        );
    }
}

export default EasyFieldList;
