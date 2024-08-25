using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class WorkingHours
    {
        public int Id { get; private init; }
        public DateTime OpeningDate { get; private init; }
        public DateTime ClosingDate { get; private init; }
        public bool IsWeekend { get; private init; }
        public int TheaterId { get; private init; }
        [JsonIgnore]
        public Theater Theater { get; private init; }

        public WorkingHours( DateTime openingDate, DateTime closingDate, bool isWeekend )
        {
            if ( openingDate > closingDate )
                throw new ArgumentException( "Opening date cannot be later than closing date." );

            OpeningDate = openingDate;
            ClosingDate = closingDate;
            IsWeekend = isWeekend;
        }
    }
}