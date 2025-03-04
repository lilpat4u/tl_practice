namespace Theater.Contracts.Requests
{
    public class CreateCompositionRequest
    {
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string CharactersInfo { get; set; }
        public int AuthorId { get; set; }
    }
}