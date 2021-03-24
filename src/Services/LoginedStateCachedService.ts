import moment from 'moment';

export default class LoginedStateCachedService
{
    private readonly _expiredSeconds:number;
    
    public constructor(expiredDayns:number = 7) {
        this._expiredSeconds = expiredDayns*24*60*60;
    }
    public SetUserId(userId:string)
    {
        window.localStorage.setItem("UserId",userId);
    }
    
    public GetUserId(){
        return window.localStorage.getItem("UserId");
    }

    public SetRolePayload(rolePayload:string)
    {
        window.localStorage.setItem("RolePayload",rolePayload);
        window.localStorage.setItem("RolePayloadExp",(moment().unix()+this._expiredSeconds).toString());
    }

    public GetRolePayloadAndSetCookie()
    {
        const maxAllowedDateStr = window.localStorage.getItem("RolePayloadExp");
        if(!maxAllowedDateStr){return null;}

        const maxAllowedUnix = parseInt(maxAllowedDateStr);
        if(maxAllowedUnix>=moment().unix())
        {
            window.localStorage.setItem("RolePayloadExp",(moment().unix()+this._expiredSeconds).toString());
            const rolePayloadCookie = window.localStorage.getItem("RolePayload");
            if(rolePayloadCookie){
                window.document.cookie = `RolePayload=${rolePayloadCookie}`
            }
            return rolePayloadCookie

        }else{return null;}
    }

    
}