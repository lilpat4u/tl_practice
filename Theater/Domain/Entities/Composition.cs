using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Composition
    {
        public int Id { get; private init; }
        public string Name { get; private init; }
        public string ShortDescription { get; private init; }
        public string CharactersInfo { get; private init; }
        public int AuthorId { get; private init; }
        [JsonIgnore]
        public Author Author { get; private init; }
        [JsonIgnore]
        public List<Play> Plays { get; private init; } = new List<Play>();

        public Composition( string name, string shortDescription, string charactersInfo, int authorId )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                throw new ArgumentNullException( $"{name} can not be null" );
            }
            Name = name;

            if ( string.IsNullOrWhiteSpace( shortDescription ) )
            {
                throw new ArgumentNullException( $"{shortDescription} can not be null" );
            }
            ShortDescription = shortDescription;

            if ( string.IsNullOrWhiteSpace( charactersInfo ) )
            {
                throw new ArgumentNullException( $"{charactersInfo} can not be null" );
            }
            CharactersInfo = charactersInfo;
            AuthorId = authorId;
        }
    }
}