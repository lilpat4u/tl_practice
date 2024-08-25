using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Theater
    {
        public int Id { get; private init; }
        public string Name { get; private set; }
        public string Address { get; private init; }
        public DateTime OpeningDate { get; private init; }
        public List<WorkingHours> WorkingHours { get; private init; } = new List<WorkingHours>();
        public string Description { get; private set; }
        public string PhoneNumber { get; private set; }
        [JsonIgnore]
        public List<Play> Plays { get; private init; } = new List<Play>();

        public Theater( string name, string address, DateTime openingDate, string description, string phoneNumber )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                throw new ArgumentNullException( $"{name} cannot be null" );
            }
            Name = name;

            if ( string.IsNullOrWhiteSpace( address ) )
            {
                throw new ArgumentNullException( $"{address} cannot be null" );
            }
            Address = address;
            OpeningDate = openingDate;

            if ( string.IsNullOrWhiteSpace( description ) )
            {
                throw new ArgumentNullException( $"{description} cannot be null" );
            }
            Description = description;

            if ( string.IsNullOrWhiteSpace( phoneNumber ) )
            {
                throw new ArgumentNullException( $"{phoneNumber} cannot be null" );
            }
            PhoneNumber = phoneNumber;
        }

        public void Update( string name, string description, string phoneNumber )
        {
            if ( !string.IsNullOrWhiteSpace( name ) )
            {
                Name = name;
            }

            if ( !string.IsNullOrWhiteSpace( description ) )
            {
                Description = description;
            }

            if ( !string.IsNullOrWhiteSpace( phoneNumber ) )
            {
                PhoneNumber = phoneNumber;
            }
        }
    }
}