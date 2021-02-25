import axios from 'axios';
import CheckoutRecord from '../Models/CheckoutRecord';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';

export default class CheckoutRecordsWebAPI
{
    public constructor(){
        axios.defaults.withCredentials=true;
    }
    private readonly _url='/api/CheckoutRecords';
    public async GetCheckoutRecordsHistory()
    {
        return (await axios.get(this._url,{params:{date:new Date()}})).data as CheckoutRecord[];
    }

    public async GetCheckoutRecordsTestRoomApproverTodo()
    {
        return (await axios.get(`${this._url}/TestRoomApproverTodo`,{params:{date:new Date()}})).data as CheckoutRecord[];
    }
    public async GetCheckoutRecordsTestRoomApproverTodoCount()
    {
        return (await axios.get(`${this._url}/TestRoomApproverTodoCount`,{params:{date:new Date()}})).data as number;
    }

    public async InitAsync(checkoutRecordPayload:CheckoutRecordPayload)
    {
        await axios.post(`${this._url}/Init`,checkoutRecordPayload,{params:{date:new Date()}});
    }

    public async TestRoomApproveAsync(checkoutRecordId:number)
    {
        await axios.post(`${this._url}/TestRoomApprove/${checkoutRecordId}`,{params:{date:new Date()}});
    }
}