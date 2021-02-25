export default class CheckinRecord
{
    public Id:number = 0;
    public CheckoutRecordId:number = 0;
    public ApplicantUserId:string | null = null;
    public FixtureNo:number = 0;
    public CheckinDate:number | null = null;
    public FixtureRoomApproverUserId:string | null = null;
    public CheckoutStatus:string | null = null;
}