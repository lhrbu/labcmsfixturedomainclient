import axios from 'axios';
import Logined from '../States/Logined'

export default class RolesWebAPI
{
    private readonly _rootUrl = '/api/Roles';

    public async LoginAsync(userId:string,passwordMD5:string)
    {
        await axios.post(`${this._rootUrl}?userId=${userId}&passwordMD5=${passwordMD5}`);
        Logined.SetLogin(true)
    }

    public async LogoutAsync()
    {
        await axios.delete(this._rootUrl);
        window.localStorage.clear();
        Logined.SetLogin(false)
    }
}