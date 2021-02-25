import axios from 'axios';
import CheckoutRecord from '../Models/CheckoutRecord';
import { RolePayloadCacheService } from '../Services/RolePayloadCacheService';

const _rolePayloadCacheService = new RolePayloadCacheService();
export default class CheckoutRecordsWebAPI
{
    private readonly _url='/api/CheckoutRecord';
    public async GetCheckoutRecordsHistory()
    {
        const userId = _rolePayloadCacheService.UserId;
        return (await axios.get(`${this._url}/${userId}`,{params:{date:new Date()}})).data as CheckoutRecord[];
    }
}