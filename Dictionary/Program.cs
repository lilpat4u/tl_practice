class DictionaryApp
{
    private static string _filePath = "dictionary.txt";
    private static Dictionary<string, string> _dictionary = new Dictionary<string, string>();

    static void Main()
    {
        LoadDictionary();
        RunDictionaryApp();
        SaveDictionary();
    }

    static void LoadDictionary()
    {
        if ( !File.Exists( _filePath ) )
        {
            return;
        }

        string[] lines = File.ReadAllLines( _filePath );
        foreach ( string line in lines )
        {
            if ( string.IsNullOrWhiteSpace( line ) )
            {
                continue;
            }

            string[] parts = line.Split( ':' );
            if ( parts.Length != 2 )
            {
                continue;
            }

            string key = parts[ 0 ].Trim();
            string value = parts[ 1 ].Trim();
            if ( !_dictionary.ContainsKey( key ) && !_dictionary.ContainsKey( value ) )
            {
                _dictionary[ key ] = value;
                _dictionary[ value ] = key;
            }
        }
    }

    static void SaveDictionary()
    {
        List<string> lines = new List<string>();
        foreach ( KeyValuePair<string, string> entry in _dictionary )
        {
            if ( _dictionary[ entry.Value ] == entry.Key ) 
            {
                lines.Add( $"{entry.Key}: {entry.Value}" );
            }
        }
        File.WriteAllLines( _filePath, lines );
    }

    static void RunDictionaryApp()
    {
        while ( true )
        {
            Console.WriteLine( "1. Добавить новое слово" );
            Console.WriteLine( "2. Найти перевод слова" );
            Console.WriteLine( "3. Показать все слова" );
            Console.WriteLine( "4. Выйти" );
            Console.Write( "Выберите действие: " );
            string choice = Console.ReadLine().Trim();

            switch ( choice )
            {
                case "1":
                    AddNewWord();
                    break;
                case "2":
                    FindTranslation();
                    break;
                case "3":
                    DisplayAllWords();
                    break;
                case "4":
                    return;
                default:
                    Console.WriteLine( "Неверный выбор. Пожалуйста, попробуйте снова." );
                    break;
            }
        }
    }

    static void AddNewWord()
    {
        Console.Write( "Введите слово на одном языке: " );
        string word1 = Console.ReadLine().Trim();
        Console.Write( "Введите перевод на другом языке: " );
        string word2 = Console.ReadLine().Trim();

        if ( _dictionary.ContainsKey( word1 ) || _dictionary.ContainsKey( word2 ) )
        {
            Console.WriteLine( "Одно из слов уже существует в словаре." );
        }
        else
        {
            _dictionary[ word1 ] = word2;
            _dictionary[ word2 ] = word1;
            Console.WriteLine( "Слово успешно добавлено в словарь." );
        }
    }

    static void FindTranslation()
    {
        Console.Write( "Введите слово для перевода: " );
        string word = Console.ReadLine().Trim();

        if ( _dictionary.ContainsKey( word ) )
        {
            Console.WriteLine( $"Перевод слова '{word}': {_dictionary[ word ]}" );
        }
        else
        {
            Console.WriteLine( "Слово не найдено в словаре." );
            Console.Write( "Хотите добавить его? (да/нет): " );
            string response = Console.ReadLine().ToLower();
            if ( response == "да" )
            {
                AddNewWord( word );
            }
        }
    }

    static void AddNewWord( string word )
    {
        Console.Write( "Введите перевод для слова: " );
        string translation = Console.ReadLine().Trim();

        if ( _dictionary.ContainsKey( word ) || _dictionary.ContainsKey( translation ) )
        {
            Console.WriteLine( "Одно из слов уже существует в словаре." );
        }
        else
        {
            _dictionary[ word ] = translation;
            _dictionary[ translation ] = word;
            Console.WriteLine( "Слово успешно добавлено в словарь." );
        }
    }

    static void DisplayAllWords()
    {
        if ( _dictionary.Count == 0 )
        {
            Console.WriteLine( "Словарь пуст." );
            return;
        }

        Console.WriteLine( "Все слова в словаре:" );
        foreach ( KeyValuePair<string, string> entry in _dictionary )
        {
            Console.WriteLine( $"{entry.Key} - {entry.Value}" );
        }
    }
}
