namespace Theater.Contracts.Requests
{
    public class CreatePlayRequest
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TicketPrice { get; set; }
        public string Description { get; set; }
        public int TheaterId { get; set; }
        public int CompositionId { get; set; }
    }
}