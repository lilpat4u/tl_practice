namespace CarFactory.Models.Engine
{
    public class EnlineEngine : IEngine
    {
        public string Name => "Inline engine";

        public int MaxSpeed => 180;
    }
}