import React, { Fragment, useState } from 'react';
import { Breadcrumb,Tabs } from 'antd';
import CheckoutRecordTodo from '../Components/CheckoutRecordTodo';
import CheckinRecordTodo from '../Components/CheckinRecordTodo';
import CheckoutRecord from './CheckoutRecord';
const { TabPane } = Tabs;

export default function Todo()
{
    const [showCheckInPage,setShowCheckInPage]=useState<boolean>(true);
    return (
        <Fragment>
            <div style={{ padding: '0 50px',background:'#eee',minHeight:'1.8rem',lineHeight:'1.8rem'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>Website</Breadcrumb.Item>
                    <Breadcrumb.Item>Todo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Tabs defaultActiveKey="1" style={{padding:'1rem 2rem'}}
                type="card">
                <TabPane key="1" tab="Todo">
                    <Tabs defaultActiveKey="1-1" type="card">
                        <TabPane key="1-1" tab="Checout">
                            <CheckoutRecordTodo />
                        </TabPane>
                        <TabPane key="1-2" tab="Checkin">
                            <CheckinRecordTodo />
                        </TabPane>
                    </Tabs>
                </TabPane>  
            </Tabs>
        </Fragment>
    )
}