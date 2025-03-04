using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Play
    {
        public int Id { get; private init; }
        public string Name { get; private init; }
        public DateTime StartDate { get; private init; }
        public DateTime EndDate { get; private init; }
        public decimal TicketPrice { get; private init; }
        public string Description { get; private init; }
        public int TheaterId { get; private init; }
        [JsonIgnore]
        public Theater Theater { get; private init; }
        public int CompositionId { get; private init; }
        [JsonIgnore]
        public Composition Composition { get; private init; }

        public Play( string name, DateTime startDate, DateTime endDate, decimal ticketPrice, string description, int theaterId, int compositionId )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                throw new ArgumentNullException( $"{name} cannot be null" );
            }
            Name = name;

            if ( string.IsNullOrWhiteSpace( description ) )
            {
                throw new ArgumentNullException( $"{description} cannot be null" );
            }
            Description = description;

            if ( ticketPrice < 0 )
            {
                throw new ArgumentOutOfRangeException( $"{ticketPrice} cannot be negative" );
            }
            TicketPrice = ticketPrice;

            if ( startDate >= endDate )
            {
                throw new ArgumentException( "Start date must be before end date" );
            }
            StartDate = startDate;
            EndDate = endDate;
            TheaterId = theaterId;
            CompositionId = compositionId;
        }
    }
}