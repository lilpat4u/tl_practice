using System.Text;

using CarFactory.Models.BodyShape;
using CarFactory.Models.CarColor;
using CarFactory.Models.Engine;
using CarFactory.Models.SteeringPositions;
using CarFactory.Models.Transmission;

namespace CarFactory.Models.Car
{
    public class Car : ICar
    {
        public string Name { get; }
        public IBodyShape BodyShape { get; }

        public ICarColor Color { get; }

        public IEngine Engine { get; }

        public ITransmission Transmission { get; }

        public SteeringPosition SteeringPosition { get; }

        public Car(
            string name,
            IEngine engine,
            ITransmission transmission,
            IBodyShape bodyShape,
            ICarColor color,
            SteeringPosition steeringPosition)
        {
            Name = name;
            Engine = engine;
            Transmission = transmission;
            BodyShape = bodyShape;
            Color = color;
            SteeringPosition = steeringPosition;
        }

        public int GetMaxSpeed()
        {
            return Engine.MaxSpeed;
        }
        public int GetGearsNum()
        {
            return Transmission.GearsNum;
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Car:");
            sb.AppendLine($"   Name: {Name}");
            sb.AppendLine($"   Engine: {Engine.Name}");
            sb.AppendLine($"   Transmission: {Transmission.Name}");
            sb.AppendLine($"   Body shape: {BodyShape.Name}");
            sb.AppendLine($"   Color: {Color.Color}");
            sb.AppendLine($"   Steering position: {SteeringPosition}");
            sb.AppendLine($"   Max speed: {GetMaxSpeed()}");
            sb.AppendLine($"   Gears: {GetGearsNum()}");

            return sb.ToString();
        }
    }
}