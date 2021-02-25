import moment from 'moment'
export default class CheckoutRecordPayload
{
    public Id:number = 0;
    public FixtureNo:number = 0;
    public ReceiverCompany:string = null!;
    public Receiver:string = null!;
    public PlanndReturnDate:number = moment().unix();
}