import React, { Fragment, useEffect, useState } from 'react';
import { Select, Breadcrumb,Table } from 'antd';
import CheckinRecord from './CheckinRecord';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import CheckinRecordsWebAPI from '../WebAPIs/CheckinRecordsWebAPI';

const { Column } = Table;

const _timeStampStringConverter = new TimeStampStringConverter();
const _checkinRecordsWebAPI = new CheckinRecordsWebAPI();

export default function CheckoutRecordHistory()
{
    const [loading,setLoading]=useState<boolean>(true);
    const [checkinRecords,setCheckinRecords]= useState<CheckinRecord[]>([]);
    useEffect(()=>{FetchRecords()},[]);

    return (
        <Table dataSource={checkinRecords}
            bordered size="small" loading={loading}
            rowKey="Id">
            <Column title="Id" dataIndex="Id"/>
            <Column title="CheckoutRecordId" dataIndex="CheckoutRecordId"/>
            <Column title="Applicant" dataIndex="ApplicantUserId"/>
            <Column title="Fixture No" dataIndex="FixtureNo"/>
            <Column title="Checkin Date" dataIndex="CheckinDate"
                render={value=>_timeStampStringConverter.FromUnixTimeSeconds(value as number)}/>
            <Column title="Fixture Room Approver" dataIndex="FixtureRoomApproverUserId"/>
            <Column title="Checkout Status" dataIndex="CheckoutStatus"/>
        </Table>
    );

    async function FetchRecords()
    {
        setCheckinRecords([...await _checkinRecordsWebAPI.GetCheckinRecordsHistory()]);
        setLoading(false);
    }
}