import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';
import CheckoutRecordsWebAPI from '../WebAPIs/CheckoutRecordsWebAPI';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
const { Column } = Table;

const _timeStampStringConverter = new TimeStampStringConverter();
const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
export default function CheckoutTestRoomApproverTodo() {
    const [checkoutRecords, setCheckoutRecords] = useState<CheckoutRecordPayload[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [inSubmit,setInSubmit]=useState<boolean>(false);
    const [selectedRecord,setSelectedRecord]= useState<CheckoutRecordPayload | null>(null);

    useEffect(()=>{FetchCheckoutRecordsTodo()},[]);

    return (
        <Fragment>
            <Table dataSource={checkoutRecords}
                loading={loading}
                bordered size="small" rowKey='Id'
                onHeaderRow={()=>({style:{textAlign: 'center'}})}
                rowSelection={{
                    type: "radio",
                    hideSelectAll: true,
                    onSelect: e=>setSelectedRecord(e)
                }}>
                <Column title="Fixture No" dataIndex="FixtureNo" />
                <Column title="Receiver Company" dataIndex="ReceiverCompany" />
                <Column title="Receiver" dataIndex="Receiver" />
                <Column title="Plannd Return Date" dataIndex="PlanndReturnDate" 
                    render={value=>_timeStampStringConverter.FromUnixTimeSeconds(value as number)}/>
            </Table>

            <Button type='primary' onClick={TestRoomApproveAsync} loading={inSubmit}>Approve</Button>
            <Button type="primary"  danger style={{ marginLeft: '0.5rem' }}>Reject</Button>
        </Fragment>
    )

    async function FetchCheckoutRecordsTodo() {
        const checkoutRecords = await _checkoutRecordsWebAPI.GetCheckoutRecordsTestRoomApproverTodo();
        setCheckoutRecords([...checkoutRecords.map(item=>Object.assign(new CheckoutRecordPayload(),item))]);
        setLoading(false);
    }

    async function TestRoomApproveAsync()
    {
        try{
            setInSubmit(true);
            await _checkoutRecordsWebAPI.TestRoomApproveAsync(selectedRecord!.Id);
        }catch(error){
            window.alert(error);
        }
        finally{
            setInSubmit(false);
            window.location.reload();
        }
    }
}