namespace Domain.Entities
{
    public class Author
    {
        public int Id { get; private init; }
        public string Name { get; private init; }
        public DateTime DateBirth { get; private init; }
        public List<Composition> Composition { get; private init; } = new List<Composition>();

        public Author( string name, DateTime dateBirth )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                throw new ArgumentNullException( $"{name} can not be null" );
            }

            Name = name;
            DateBirth = dateBirth;
        }
    }
}