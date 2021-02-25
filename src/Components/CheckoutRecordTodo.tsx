import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';
const { Column } = Table;

export default function CheckoutRecordTodo() {
    const [checkoutRecords, setCheckoutRecords] = useState<CheckoutRecordPayload[]>([]);
    return (
        <Fragment>
            <Table dataSource={checkoutRecords}
                bordered size="small"
                rowSelection={{
                    type: "radio",
                    hideSelectAll: true
                }}>
                <Column title="支架编号" dataIndex="FixtureNo" />
                <Column title="借出单位" dataIndex="ReceiverCompany" />
                <Column title="借出人" dataIndex="Receiver" />
                <Column title="借出时间" dataIndex="PlanndReturnDate" />
            </Table>

            <Button type='primary'>Approve</Button>
            <Button type="primary"  danger style={{ marginLeft: '0.5rem' }}>Reject</Button>
        </Fragment>
    )
}