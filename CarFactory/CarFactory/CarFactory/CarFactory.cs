using CarFactory.Models.BodyShape;
using CarFactory.Models.Car;
using CarFactory.Models.CarColor;
using CarFactory.Models.Engine;
using CarFactory.Models.SteeringPositions;
using CarFactory.Models.Transmission;

namespace CarFactory
{
    public class CarFactory
    {
        List<ICar> _cars = new();

        public void Run()
        {
            string userCommand = "";
            while (userCommand != "4")
            {
                Console.Clear();
                PrintMenu();
                userCommand = Console.ReadLine();
                if (userCommand == "4")
                {
                    break;
                }
                try
                {
                    ProcessCommand(userCommand);
                }
                catch (ArgumentException e)
                {
                    Console.WriteLine($"Error: {e.Message}");
                }
                Console.WriteLine("Tap enter to continue");
                userCommand = Console.ReadLine();
            }
        }

        private void PrintMenu()
        {
            Console.WriteLine("Menu:");
            Console.WriteLine("    1 - Create new car");
            Console.WriteLine("    2 - Print all car");
            Console.WriteLine("    3 - Remove car");
            Console.WriteLine("    4 - Exit");
        }

        private void ProcessCommand(string userCommand)
        {
            switch (userCommand)
            {
                case "1":
                    CreateNewCar();
                    break;
                case "2":
                    PrintAllCars();
                    break;
                case "3":
                    RemoveCar();
                    break;
                case "4":
                    break;
                default:
                    throw new ArgumentException("Unknown command");
            }
        }

        private void CreateNewCar()
        {
            Car car = new Car(
                name: GetNameFromInput(),
                engine: GetEngineFromInput(),
                transmission: GetTransmissionFromInput(),
                bodyShape: GetBodyShapeFromInput(),
                color: GetCarColorFromInput(),
                steeringPosition: GetSteeringPositionFromInput()
            );

            _cars.Add(car);
            Console.WriteLine();
            Console.WriteLine(car);
            Console.WriteLine();
            Console.WriteLine("New car was created");
        }

        private string GetNameFromInput()
        {
            Console.Write("Enter name: ");
            string name = Console.ReadLine();
            while (String.IsNullOrWhiteSpace(name))
            {
                Console.WriteLine("Name can not be empty or contain only spaces");
                Console.Write("Please enter again: ");
                name = Console.ReadLine();
            }

            return name;
        }
        private IEngine GetEngineFromInput()
        {
            Console.WriteLine("Select engine:");
            Console.WriteLine("Rotary");
            Console.WriteLine("Enline");
            Console.WriteLine("V type");

            while (true)
            {
                switch (Console.ReadLine())
                {
                    case "Rotary":
                        return new RotaryEngine();
                    case "Enline":
                        return new EnlineEngine();
                    case "V type":
                        return new VTypeEngine();
                    default:
                        Console.WriteLine("Unknown engine. Please try again");
                        break;
                }
            }
        }
        private ITransmission GetTransmissionFromInput()
        {
            Console.WriteLine("Select transmission:");
            Console.WriteLine("Automatic");
            Console.WriteLine("Manual");
            Console.WriteLine("Powerfull manual");

            while (true)
            {
                switch (Console.ReadLine())
                {
                    case "Automatic":
                        return new AutomaticlTransmission();
                    case "Manual":
                        return new ManualTransmission();
                    case "Powerfull manual":
                        return new PowerfullManualTransmission();
                    default:
                        Console.WriteLine("Unknown transmission. Please try again");
                        break;
                }
            }
        }
        private IBodyShape GetBodyShapeFromInput()
        {
            Console.WriteLine("Select body shape:");
            Console.WriteLine("Hatchback");
            Console.WriteLine("Sedan");
            Console.WriteLine("Universal");

            while (true)
            {
                switch (Console.ReadLine())
                {
                    case "Hatchback":
                        return new Hatchback();
                    case "Sedan":
                        return new Sedan();
                    case "Universal":
                        return new Universal();
                    default:
                        Console.WriteLine("Unknown body shape. Please try again");
                        break;
                }
            }
        }
        private ICarColor GetCarColorFromInput()
        {
            Console.WriteLine("Select color:");
            Console.WriteLine("Black");
            Console.WriteLine("Silver");
            Console.WriteLine("White");

            while (true)
            {
                switch (Console.ReadLine())
                {
                    case "Black":
                        return new Black();
                    case "Silver":
                        return new Silver();
                    case "White":
                        return new White();
                    default:
                        Console.WriteLine("Unknown color. Please try again");
                        break;
                }
            }
        }

        private SteeringPosition GetSteeringPositionFromInput()
        {
            Console.WriteLine("Enter steering position (left/right)");
            SteeringPosition position;
            while (!Enum.TryParse(Console.ReadLine(), true, out position))
            {
                Console.WriteLine("Unknown steering position. Please try again");
            }
            return position;
        }

        private void PrintAllCars()
        {
            _cars.ForEach(car => Console.WriteLine(car));

            Console.WriteLine("All cars was printed");
        }

        private void RemoveCar()
        {
            PrintAllCars();
            Console.WriteLine("Enter name of car");
            string name = Console.ReadLine();
            var car = _cars.FirstOrDefault(c => c.Name == name);
            if (car == null)
            {
                throw new ArgumentException($"Car with name: {name} not found");
            }

            _cars.Remove(car);
            Console.WriteLine("Car was removed");
        }
    }
}