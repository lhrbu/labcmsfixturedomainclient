import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import CheckinRecordPayload from './CheckinRecordPayload';
const { Column } = Table;


export default function CheckinRecordTodo() {
    const [checkinRecords, setCheckinRecords] = useState<CheckinRecordPayload[]>([]);
    return (
        <Fragment>
            <Table dataSource={checkinRecords}
                bordered size="small"
                rowSelection={{
                    type: "radio",
                    hideSelectAll: true
                }}>
                <Column title="支架编号" dataIndex="FixtureNo" />
            </Table>

            <Button type='primary'>Approve</Button>
            <Button type="primary"  danger style={{ marginLeft: '0.5rem' }}>Reject</Button>
        </Fragment>
    )
}