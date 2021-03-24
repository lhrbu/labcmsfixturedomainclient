import React, { useState,useEffect, Fragment } from 'react';
import { Breadcrumb, Tabs, Table, Button } from 'antd';
import CheckoutRecordsWebAPI from '../WebAPIs/CheckoutRecordsWebAPI';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';
const { TabPane } = Tabs;
const { Column } = Table;


const _timeStampStringConverter = new TimeStampStringConverter();
const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
export default function TestFieldResponseTodo()
{
    const [checkoutRecords, setCheckoutRecords] = useState<CheckoutRecordPayload[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [inSubmit, setInSubmit] = useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = useState<CheckoutRecordPayload | null>(null);

    useEffect(()=>{FetchCheckoutRecordsTodo()},[]);

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
                    <Table dataSource={checkoutRecords}
                        loading={loading}
                        bordered size="small" rowKey='Id'
                        onHeaderRow={() => ({ style: { textAlign: 'center' } })}
                        rowSelection={{
                            type: "radio",
                            hideSelectAll: true,
                            onSelect: e => setSelectedRecord(e)
                        }}>
                        <Column title="Applicant" dataIndex="ApplicantUserId" />
                        <Column title="Fixture No" dataIndex="FixtureNo" />
                        <Column title="Receiver Company" dataIndex="ReceiverCompany" />
                        <Column title="Receiver" dataIndex="Receiver" />
                        <Column title="Plannd Return Date" dataIndex="PlanndReturnDate"
                            render={value => _timeStampStringConverter.FromUnixTimeSeconds(value as number)} />
                    </Table>
                    <Button type='primary' onClick={TestRoomApproveAsync} loading={inSubmit}>Approve</Button>
                    <Button type="primary" danger style={{ marginLeft: '0.5rem' }}>Reject</Button>
                </TabPane>
            </Tabs>
        </Fragment>
    )

    async function FetchCheckoutRecordsTodo()
    {
        const checkoutRecords = await _checkoutRecordsWebAPI.GetCheckoutRecordsTestRoomApproverTodo();
        setCheckoutRecords([...checkoutRecords.map(item => Object.assign(new CheckoutRecordPayload(), item))]);
        setLoading(false);
    }

    async function TestRoomApproveAsync()
    {
        try
        {
            setInSubmit(true);
            await _checkoutRecordsWebAPI.TestRoomApproveAsync(selectedRecord!.Id);
        } catch (error)
        {
            window.alert(error);
        }
        finally
        {
            await FetchCheckoutRecordsTodo();
            setInSubmit(false);
        }
    }
}