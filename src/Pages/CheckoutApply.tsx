import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Breadcrumb, Skeleton,message } from 'antd';
import './HeaderBar.css';
import Fixture from '../Models/Fixture';
import FixturesWebAPI from '../WebAPIs/FixturesWebAPI';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import moment from 'moment';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';
import CheckoutRecordsWebAPI from '../WebAPIs/CheckoutRecordsWebAPI';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const _timeStampStringConverter = new TimeStampStringConverter();
const _fixturesWebAPI =new FixturesWebAPI()

export default function CheckoutApply() {

    const [fixturesLoaded, setFixtureLoaded] = useState<boolean>(false);
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [form] = Form.useForm();
    const [fixtureName,setFixtureName] = useState<string>("");

    const [inSubmit,setInSubmit] = useState<boolean>(false);

    useEffect(() => {
        FetchFixtures();
    }, []);

    return (
        <Fragment>
            <div style={{ padding: '0 50px', background: '#eee', minHeight: '1.8rem', lineHeight: '1.8rem' }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Website</Breadcrumb.Item>
                    <Breadcrumb.Item>Checkout</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{ padding: '2rem 10rem 0rem 10rem' }}>
            <Skeleton loading={!fixturesLoaded} active>
                <Form {...layout}
                    form={form}
                    name="Checkout Applicantion"
                    initialValues={{ PlanndReturnDateString: _timeStampStringConverter.FromUnixTimeSeconds(moment().unix()) }}
                >
                    <Form.Item
                        label="Fixture No"
                        name="FixtureNo"
                        rules={[{
                            required: true, message: '请输入有效支架编号!',
                            validator: (_, value: number) => fixtures.some(item => item.No === value) ? Promise.resolve() : Promise.reject("Project name is invalid."),

                        }]}>
                        <Select showSearch
                            onChange={(value) => { 
                                form.setFieldsValue({ FixtureNo: value })
                                setFixtureName(fixtures.find(item=>item.No===value)!.Description!)
                                }}>
                            {
                                fixtures.map(item => (
                                    <Option value={item.No!} key={item.No!}>{item.No}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Fixture Name">
                        <Input value={fixtureName} disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Receiver Company"
                        name="ReceiverCompany"
                        rules={[{ required: true, message: '请输入借出单位!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Receiver"
                        name="Receiver"
                        rules={[{ required: true, message: '请输入借出人!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Plannd Return Date"
                        name="PlanndReturnDateString"
                        rules={[{ required: true, pattern: /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/, message: 'Time format does not match yyyy/MM/dd HH:mm' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit"
                            onClick={SubmitAsync} loading={inSubmit}>Submit</Button>
                        <Button htmlType="button" type='primary' danger
                            style={{ marginLeft: '0.5rem' }}
                            onClick={ResetForm}>
                            Reset</Button>
                    </Form.Item>
                </Form>
            </Skeleton>
            </div>
        </Fragment>
    );

    async function FetchFixtures() {
        const fixtures = await (_fixturesWebAPI.GetAsync());
        setFixtures([...fixtures]);
        setFixtureLoaded(true);
    }

    async function SubmitAsync() {
        try{
            setInSubmit(true);
            const values = await form.validateFields();
            const checkoutRecordPayload: CheckoutRecordPayload = Object.assign(new CheckoutRecordPayload(), values);
            checkoutRecordPayload.PlanndReturnDate = _timeStampStringConverter.ToUnixTimeSeconds(values.PlanndReturnDateString);
            const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
            await _checkoutRecordsWebAPI.InitAsync(checkoutRecordPayload);
            message.success("Submit Successfully!");
        }catch(error){
            message.error(error);
        }finally{
            setInSubmit(false);
        }

    }

    function ResetForm() {
        form.resetFields();
    }
}