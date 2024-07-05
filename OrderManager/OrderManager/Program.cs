using System;

class OrderManager
{
    static void Main()
    {
        string name = GetUserName();
        string product = GetProductName();
        int count = GetProductQuantity();
        string address = GetUserAddress();

        if ( ConfirmOrder( name, product, count, address ) )
        {
            Console.WriteLine( $"{name}! Ваш заказ {product} в количестве {count} оформлен! Ожидайте доставку по адресу {address} к {DateTime.Now.AddDays( 3 ):dd.MM.yyyy}." );
        }
        else
        {
            Console.WriteLine( "Заказ отменен." );
        }
    }

    static string GetUserName()
    {
        string name = null;
        while ( string.IsNullOrWhiteSpace( name ) )
        {
            Console.Write( "Введите ваше имя: " );
            name = Console.ReadLine().Trim();
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                Console.WriteLine( "Имя не может быть пустым. Пожалуйста, введите снова." );
            }
        }
        return name;
    }

    static string GetProductName()
    {
        string product = null;
        while ( string.IsNullOrWhiteSpace( product ) )
        {
            Console.Write( "Введите название товара: " );
            product = Console.ReadLine().Trim();
            if ( string.IsNullOrWhiteSpace( product ) )
            {
                Console.WriteLine( "Название товара не может быть пустым. Пожалуйста, введите снова." );
            }
        }
        return product;
    }

    static int GetProductQuantity()
    {
        int count = 0;
        const int maxCount = 1000; // Максимальное количество товара, которое можно заказать

        while ( true )
        {
            Console.Write( "Введите количество товара (1 - 1000): " );
            string input = Console.ReadLine();
            try
            {
                count = int.Parse( input );
                if ( count <= 0 || count > maxCount )
                {
                    throw new OverflowException();
                }
                break;
            }
            catch ( FormatException )
            {
                Console.WriteLine( "Пожалуйста, введите корректное число." );
            }
            catch ( OverflowException )
            {
                Console.WriteLine( $"Количество должно быть положительным и не превышать {maxCount}. Пожалуйста, введите снова." );
            }
        }

        return count;
    }

    static string GetUserAddress()
    {
        string address = null;
        while ( string.IsNullOrWhiteSpace( address ) )
        {
            Console.Write( "Введите адрес доставки: " );
            address = Console.ReadLine().Trim();
            if ( string.IsNullOrWhiteSpace( address ) )
            {
                Console.WriteLine( "Адрес доставки не может быть пустым. Пожалуйста, введите снова." );
            }
        }
        return address;
    }

    static bool ConfirmOrder( string name, string product, int count, string address )
    {
        Console.WriteLine( $"Здравствуйте, {name}, вы заказали {count} {product} на адрес {address}, все верно? (да/нет)" );
        string confirmation = Console.ReadLine().Trim().ToLower();
        return confirmation == "да";
    }
}
