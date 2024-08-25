namespace Theater.Contracts.Requests
{
    public class CreateWorkingHoursRequest
    {
        public DateTime OpeningDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public bool IsWeekend { get; set; }
    }
}