import React, { Fragment } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import CheckoutTestRoomApproverTodo from '../Components/CheckoutTestRoomApproverTodo';
const { TabPane } = Tabs;

export default function Todo() {
    return (
        <Fragment>
            <div style={{ padding: '0 50px', background: '#eee', minHeight: '1.8rem', lineHeight: '1.8rem' }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Website</Breadcrumb.Item>
                    <Breadcrumb.Item>Todo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Tabs defaultActiveKey="1" style={{ padding: '1rem 2rem' }}
                type="card">
                <TabPane key="1-1" tab="Checkout">
                    <CheckoutTestRoomApproverTodo />
                </TabPane>
            </Tabs>
        </Fragment>
    )
}