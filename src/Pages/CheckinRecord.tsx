import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Breadcrumb } from 'antd';
import './HeaderBar.css';
import Fixture from '../Models/Fixture';
import FixturesWebAPI from '../WebAPIs/FixturesWebAPI';
import { RolePayloadCacheService } from '../Services/RolePayloadCacheService';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const _rolePayloadCacheService = new RolePayloadCacheService();
export default function CheckinRecord() {

    const [fixturesLoaded,setFixtureLoaded]=useState<boolean>(false);
    const [fixtures,setFixtures] = useState<Fixture[]>([]);
    const [form] = Form.useForm();

    useEffect(()=>{
        FetchFixtures();
    },[]);

    return (
        <Fragment>
            <div style={{ padding: '0 50px',background:'#eee',minHeight:'1.8rem',lineHeight:'1.8rem'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>Website</Breadcrumb.Item>
                    <Breadcrumb.Item>Checkin</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {/* <div className="HeaderBar">HJL-NL-TI-V Fixture Checkout Record Application</div> */}
            <Form {...layout}
                form={form}
                name="Checkin Applicantion"
                style={{ padding: '2rem 10rem 0rem 10rem' }}>
                <Form.Item
                    label="支架编号"
                    name="FixtureNo"
                    rules={[{ 
                        required: true, message: '情输入有效支架编号!',
                        validator: (_, value: number) => fixtures.some(item=>item.No===value) ? Promise.resolve() : Promise.reject("Project name is invalid."),
                        
                        }]}>
                    <Select showSearch
                        onSearch={(value) => form.setFieldsValue({ FixtureNo: value })}>
                        {
                            fixtures.map(item=>(
                                <Option value={item.No!} key={item.No!}>{item.No}</Option>
                            ))
                        }    
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button htmlType="button" type='primary' danger
                        style={{ marginLeft: '0.5rem' }}>
                        Reset</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );

    async function FetchFixtures()
    {
        const fixtures = await (new FixturesWebAPI().GetAsync());
        setFixtures([...fixtures]);
        setFixtureLoaded(true);
    }
}