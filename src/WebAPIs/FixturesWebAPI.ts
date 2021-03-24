import axios from 'axios';
import Fixture from '../Models/Fixture';

export default class FixturesWebAPI
{
    private readonly _url = '/api/Fixtures';
    public async GetAsync()
    {
        return (await axios.get(this._url,{params:{date:new Date()}})).data as Fixture[];
    }
}