namespace Theater.Contracts.Requests
{
    public class CreateTheaterRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime OpeningDate { get; set; }
        public List<CreateWorkingHoursRequest> WorkingHours { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
    }
}