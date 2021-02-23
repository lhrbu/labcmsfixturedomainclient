import axios from 'axios';
import CheckoutRecordPayload from '../Models/CheckoutRecordPayload';

export default class CheckoutRecordsService
{
    private readonly _rootUrl = "/api/CheckoutRecords";

    public async InitAsync(checkoutRecordInClient:CheckoutRecordPayload):Promise<number>
    {
        return (await axios.post(`${this._rootUrl}/Init`,checkoutRecordInClient)).data;
    }

    public async CancelByIdAsync(id:number)
    {
        await axios.delete(`${this._rootUrl}/${id}`);
    }

    public async TestRoomApprove(id:number)
    {
        await axios.post(`${this._rootUrl}/TestRoomApprove/${id}`);
    }

    public async FixtureRoomApprove(id:number)
    {
        await axios.post(`${this._rootUrl}/FixtureRoomApprove/${id}`);
    }

    public async EndAsync(id:number)
    {
        await axios.post(`${this._rootUrl}/End/${id}`);
    }
}