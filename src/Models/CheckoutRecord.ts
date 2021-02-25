export default class CheckoutRecord
{
    public Id:number = 0;
    public ApplicantUserId:string | null = null;
    public FixtureNo:number = 0;
    public CheckoutDate:number | null = null;
    public ReceiverCompany:string | null = null;
    public Receiver:string | null = null;
    public PlanndReturnDate:number = 0;
    public TestRoomApproverUserId:string | null = null;
    public FixtureRoomApproverUserId:string | null = null;
    public Status:number = 0;
}