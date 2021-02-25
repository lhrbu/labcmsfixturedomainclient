import React, { Fragment, useEffect, useState } from 'react';
import { Select, Breadcrumb,Table } from 'antd';
import CheckoutRecord from '../Models/CheckoutRecord';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import CheckoutRecordsWebAPI from '../WebAPIs/CheckoutRecordsWebAPI';

const { Column } = Table;

const _timeStampStringConverter = new TimeStampStringConverter();
const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();

export default function CheckoutApplyHistory()
{
    const [loading,setLoading]=useState<boolean>(true);
    const [checkoutRecords,setCheckoutRecords]= useState<CheckoutRecord[]>([]);
    useEffect(()=>{FetchRecords()},[])

    return (
        <Table dataSource={checkoutRecords}
            bordered size="small" loading={loading}
            rowKey="Id"
            onHeaderRow={()=>({style:{textAlign: 'center'}})}>
            <Column title="Id" dataIndex="Id"/>
            <Column title="Applicant" dataIndex="ApplicantUserId"/>
            <Column title="Fixture No" dataIndex="FixtureNo"/>
            <Column title="Checkout Date" dataIndex="CheckoutDate"
                render={value=>_timeStampStringConverter.FromUnixTimeSeconds(value as number)}/>
            <Column title="Receiver Company" dataIndex="ReceiverCompany"/>
            <Column title="Receiver" dataIndex="Receiver"/>
            <Column title="Plannd Return Date" dataIndex="PlanndReturnDate"
                render={value=>_timeStampStringConverter.FromUnixTimeSeconds(value as number)}/>
            <Column title="Test Room Approver" dataIndex="TestRoomApproverUserId"/>
            <Column title="Fixture Room Approver" dataIndex="FixtureRoomApproverUserId"/>
            <Column title="Checkout Status" dataIndex="Status"/>
        </Table>
    );

    async function FetchRecords()
    {
        setCheckoutRecords([...await _checkoutRecordsWebAPI.GetCheckoutRecordsHistory()]);
        setLoading(false);
    }
}