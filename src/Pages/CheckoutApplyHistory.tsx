import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, Tabs, Table } from 'antd';
import CheckoutRecord from '../Models/CheckoutRecord';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import CheckoutRecordsWebAPI from '../WebAPIs/CheckoutRecordsWebAPI';
const { TabPane } = Tabs;
const { Column } = Table;

const _timeStampStringConverter = new TimeStampStringConverter();
const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
export default function CheckoutApplyHistory()
{
    const [loading, setLoading] = useState<boolean>(true);
    const [checkoutRecords, setCheckoutRecords] = useState<CheckoutRecord[]>([]);
    useEffect(() => { FetchRecords() }, [])

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
                    <Table dataSource={checkoutRecords}
                        bordered size="small" loading={loading}
                        rowKey="Id"
                        onHeaderRow={() => ({ style: { textAlign: 'center' } })}>
                        <Column title="Id" dataIndex="Id" />
                        <Column title="Applicant" dataIndex="ApplicantUserId" />
                        <Column title="Fixture No" dataIndex="FixtureNo" />
                        <Column title="Checkout Date" dataIndex="CheckoutDate"
                            render={value => _timeStampStringConverter.FromUnixTimeSeconds(value as number)} />
                        <Column title="Receiver Company" dataIndex="ReceiverCompany" />
                        <Column title="Receiver" dataIndex="Receiver" />
                        <Column title="Plannd Return Date" dataIndex="PlanndReturnDate"
                            render={value => _timeStampStringConverter.FromUnixTimeSeconds(value as number)} />
                        <Column title="Test Room Approver" dataIndex="TestRoomApproverUserId" />
                        <Column title="Fixture Room Approver" dataIndex="FixtureRoomApproverUserId" />
                        <Column title="Checkout Status" dataIndex="Status" />
                    </Table>
                </TabPane>
            </Tabs>
        </Fragment>);

    async function FetchRecords()
    {
        setCheckoutRecords([...await _checkoutRecordsWebAPI.GetCheckoutRecordsHistory()]);
        setLoading(false);
    }
}