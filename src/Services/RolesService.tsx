import axios from 'axios';
import RolePayloadCacheService from './RolePayloadCacheService';


export default class RolesService
{
    private readonly _rootUrl = '/api/Roles';

    public async LoginAsync(userId:string,passwordMD5:string)
    {
        await axios.post(`${this._rootUrl}?userId=${userId}&passwordMD5=${passwordMD5}`);
    }

    public async LogoutAsync()
    {
        await axios.delete(this._rootUrl);
        window.localStorage.clear();

    }
}