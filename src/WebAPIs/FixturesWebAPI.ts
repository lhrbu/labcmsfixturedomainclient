import axios from 'axios';
import Fixture from '../Models/Fixture';

export default class FixturesWebAPI
{
    private readonly _url = '/api/Fixtures';
    public async GetAsync()
    {
        return (await axios.get(this._url,{params:{date:new Date()}})).data as Fixture[];
    }
    // public async PostAsync(project:Project)
    // {
    //     await axios.post(this._url,project,{params:{date:new Date()}});
    // }
    // public async PutAsync(project:Project)
    // {
    //     await axios.put(this._url,project,{params:{date:new Date()}});
    // }
    // public async DeleteByNameAsync(name:string)
    // {
    //     const nameUrl = `${this._url}/${encodeURIComponent(name)}`;
    //     return await axios.delete(nameUrl);
    // }
}