namespace CarFactory.Models.Transmission
{
    public class ManualTransmission : ITransmission
    {
        public string Name => "Manual";

        public int GearsNum => 5;
    }
}