import React, { Component } from 'react';
import { withForm, withField, Field } from 'app/../../src';

const provinceData = [
    {
        id: 'beijing',
        name: '北京',
        children: [
            {
                id: 'chaoyang',
                name: '朝阳区'
            },
            {
                id: 'haidian',
                name: '海淀区'
            }
        ]
    },
    {
        id: 'shanghai',
        name: '上海',
        children: [
            {
                id: 'pudong',
                name: '浦东新区'
            },
            {
                id: 'jingan',
                name: '静安区'
            }
        ]
    },
    {
        id: 'guangdong',
        name: '广东',
        children: [
            {
                id: 'guangzhou',
                name: '广州市'
            },
            {
                id: 'shenzhen',
                name: '深圳市'
            }
        ]
    }
];

class FieldCity extends Component {
    state = {
        loading: true
    };

    //模拟异步获取省份信息
    getProvinceData = () => {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                provinceData,
                loading: false
            });

            //获取到省份信息后，如果有已经选择了省份，需要再去获取下城市列表
            if (this.props.$formutil.$params.province) {
                this.getCityData(this.props.$formutil.$params.province);
            }
        }, 1500);
    };

    //模拟异步获取城市信息
    getCityData = id => {
        if (id) {
            this.setState({
                loading: true
            });
            setTimeout(
                () =>
                    this.setState({
                        cityData: provinceData.find(item => item.id === id).children,
                        loading: false
                    }),
                1500
            );
        }
    };

    onProvinceChange = () => {
        this.setState({
            cityData: null
        });

        this.props.$formutil.$setValues(
            {
                city: ''
            },
            () => {
                this.onCityChange();
            }
        );

        if (this.props.$formutil.$params.province) {
            this.getCityData(this.props.$formutil.$params.province);
        }
    };

    onCityChange = () => {
        if (this.props.$formutil.$invalid) {
            this.props.$render(null);
        } else {
            this.props.$render(this.props.$formutil.$params);
        }
    };

    fieldProps = {
        required: true,
        $validators: {
            required: Boolean
        }
    };

    componentDidMount() {
        this.getProvinceData();

        if (this.props.$value) {
            this.props.$formutil.$setValues(this.props.$value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.$value !== this.props.$value &&
            nextProps.$value &&
            (!this.props.$value || nextProps.$value.province !== this.props.$value.province)
        ) {
            this.getCityData(nextProps.$value.province);
        }
    }

    render() {
        const { provinceData, cityData, loading } = this.state;
        const { province = '', city = '' } = this.props.$value || this.props.$formutil.$params;

        return (
            <div className="row">
                <div className="col-sm-6">
                    <Field name="province" {...this.fieldProps}>
                        {props => (
                            <select
                                className="form-control"
                                value={province}
                                onChange={ev => props.$render(ev.target.value, this.onProvinceChange)}>
                                <option value="">{loading ? 'loading' : '选择省份'}</option>
                                {provinceData &&
                                    provinceData.map(item => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </Field>
                </div>
                <div className="col-sm-6">
                    <Field name="city" {...this.fieldProps}>
                        {props => (
                            <select
                                className="form-control"
                                value={city}
                                onChange={ev => props.$render(ev.target.value, this.onCityChange)}>
                                <option value="">{loading ? 'loading' : '选择城市'}</option>
                                {cityData &&
                                    cityData.map(item => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </Field>
                </div>
            </div>
        );
    }
}
// 这里先包装了withForm，方便可以获取到用户填写信息，再包装withField，是因为我们对外暴漏为一个Field
export default withField(withForm(FieldCity), {
    $defaultValue: null
});
