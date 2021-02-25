import axios from 'axios';
import CheckinRecord from '../Archive/CheckinRecord';

export default class CheckinRecordsWebAPI
{
    private readonly _url='/api/CheckinRecords';
    public async GetCheckinRecordsHistory()
    {
        return (await axios.get(this._url,{params:{date:new Date()}})).data as CheckinRecord[];
    }
    public async GetCheckinRecordsTodo()
    {
        return (await axios.get(`${this._url}/Todo`,{params:{date:new Date()}})).data as CheckinRecord[];
    }
}