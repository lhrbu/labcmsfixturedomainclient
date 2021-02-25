import axios from 'axios';
import CheckinRecord from '../Models/CheckinRecord';
import { RolePayloadCacheService } from '../Services/RolePayloadCacheService';

const _rolePayloadCacheService = new RolePayloadCacheService();
export default class CheckinRecordsWebAPI
{
    private readonly _url='/api/CheckinRecord';
    public async GetCheckinRecordsHistory()
    {
        const userId = _rolePayloadCacheService.UserId;
        return (await axios.get(`${this._url}/${userId}`,{params:{date:new Date()}})).data as CheckinRecord[];
    }
}