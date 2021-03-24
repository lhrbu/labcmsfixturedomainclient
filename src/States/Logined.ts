import { makeAutoObservable } from "mobx"


const _v = false;
function CreateLoginedStatus()
{
    return makeAutoObservable({
        _v,
        get Current():boolean{return this._v},
        SetLogin(value:boolean){this._v = value}
    })
}

const Logined = CreateLoginedStatus()
export default Logined
