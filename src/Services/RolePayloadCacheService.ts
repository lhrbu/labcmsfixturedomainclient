import moment from 'moment';

export default class RolePayloadCacheService
{
    private readonly _expiredSeconds:number;
    
    public constructor(expiredDayns:number = 7) {
        this._expiredSeconds = expiredDayns*24*60*60;
    }
    public SetUserId(userId:string)
    {
        window.localStorage.setItem("UserId",userId);
    }
    public Set(rolePayload:string)
    {
        window.localStorage.setItem("RolePayload",rolePayload);
        window.localStorage.setItem("RolePayloadExp",(moment().unix()+this._expiredSeconds).toString());
    }

    public Get()
    {
        const maxAllowedDateStr = window.localStorage.getItem("RolePayloadExp");
        if(!maxAllowedDateStr){return null;}

        const maxAllowedUnix = parseInt(maxAllowedDateStr);
        if(maxAllowedUnix>=moment().unix())
        {
            window.localStorage.setItem("RolePayloadExp",(moment().unix()+this._expiredSeconds).toString());
            return window.localStorage.getItem("RolePayload");
        }else{return null;}
    }

    public get UserId(){
        return window.localStorage.getItem("UserId");
    }
}