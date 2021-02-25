import React, { Fragment, useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import CheckoutRecordTodo from '../Components/CheckoutRecordTodo';
import CheckinRecordTodo from '../Components/CheckinRecordTodo';
import CheckoutRecord from './CheckoutRecord';
import CheckoutRecordHistory from '../Components/CheckoutRecordHistory';
const { TabPane } = Tabs;


export default function History()
{
    return (
    <Fragment>
        <div style={{ padding: '0 50px', background: '#eee', minHeight: '1.8rem', lineHeight: '1.8rem' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Website</Breadcrumb.Item>
                <Breadcrumb.Item>History</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <Tabs defaultActiveKey="1" style={{ padding: '1rem 2rem' }}
            type="card">
            <TabPane key="1" tab="Checkout">
                <CheckoutRecordHistory />
            </TabPane>
            <TabPane key="2" tab="Checkin">
                <CheckoutRecordHistory />
            </TabPane>
        </Tabs>
    </Fragment>);
}