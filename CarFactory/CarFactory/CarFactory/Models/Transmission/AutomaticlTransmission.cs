namespace CarFactory.Models.Transmission
{
    public class AutomaticlTransmission : ITransmission
    {
        public string Name => "Automatic";

        public int GearsNum => 5;
    }
}