import React, { Fragment, useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import CheckoutApplyHistory from '../Components/CheckoutApplyHistory';
const { TabPane } = Tabs;


export default function ApplyHistory()
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
                <CheckoutApplyHistory />
            </TabPane>
        </Tabs>
    </Fragment>);
}