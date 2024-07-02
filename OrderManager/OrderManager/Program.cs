
class OrderManager
{
    static void Main()
    {
        string name, product, address;
        int count;

        GetOrderDetails(out name, out product, out count, out address);

        if (ConfirmOrder(name, product, count, address))
        {
            PrintSuccessMessage(name, product, count, address);
        }
        else
        {
            Console.WriteLine("\nПожалуйста, повторите заказ с правильными данными.");
        }
    }


    static void GetOrderDetails(out string name, out string product, out int count, out string address)
    {
        Console.Write("Введите название товара: ");
        product = Console.ReadLine();
        while (string.IsNullOrWhiteSpace(product))
        {
            Console.Write("Название товара не может быть пустым. Пожалуйста, введите снова: ");
            product = Console.ReadLine();
        }

        Console.Write("Введите количество товара: ");
        while (true)
        {
            try
            {
                string input = Console.ReadLine();
                count = int.Parse(input);
                if (count <= 0)
                    throw new OverflowException();
                break;
            }
            catch (FormatException)
            {
                Console.Write("Некорректное количество. Пожалуйста, введите положительное число: ");
            }
            catch (OverflowException)
            {
                Console.Write("Количество должно быть положительным и не слишком большим. Пожалуйста, введите снова: ");
            }
        }

        Console.Write("Введите ваше имя: ");
        name = Console.ReadLine();
        while (string.IsNullOrWhiteSpace(name))
        {
            Console.Write("Имя не может быть пустым. Пожалуйста, введите снова: ");
            name = Console.ReadLine();
        }

        Console.Write("Введите адрес доставки: ");
        address = Console.ReadLine();
        while (string.IsNullOrWhiteSpace(address))
        {
            Console.Write("Адрес доставки не может быть пустым. Пожалуйста, введите снова: ");
            address = Console.ReadLine();
        }
    }

    static bool ConfirmOrder(string name, string product, int count, string address)
    {
        Console.WriteLine($"\nЗдравствуйте, {name}, вы заказали {count} {product} на адрес {address}, все верно? (да/нет)");
        string confirmation = Console.ReadLine().ToLower();
        return confirmation == "да";
    }

    static void PrintSuccessMessage(string name, string product, int count, string address)
    {
        DateTime deliveryDate = DateTime.Now.AddDays(3);
        Console.WriteLine($"\n{name}! Ваш заказ {product} в количестве {count} оформлен! Ожидайте доставку по адресу {address} к {deliveryDate.ToShortDateString()}.");
    }
}

