// See https://aka.ms/new-console-template for more information
Console.WriteLine( "Hello, World!" );
using System;
using System.Collections.Generic;
using System.IO;

class DictionaryApp
{
    private static string filePath = "C:\\Users\\danil\\source\\repos\\HomeWork_04.07.24\\HomeWork_04.07.24\\dictionary.txt";
    private static Dictionary<string, string> dictionary = new Dictionary<string, string>();

    static void Main()
    {
        LoadDictionary();
        RunDictionaryApp();
        SaveDictionary();
    }

    static void LoadDictionary()
    {
        if ( File.Exists( filePath ) )
        {
            string[] lines = File.ReadAllLines( filePath );
            foreach ( string line in lines )
            {
                if ( !string.IsNullOrWhiteSpace( line ) )
                {
                    string[] parts = line.Split( ':' );
                    if ( parts.Length == 2 )
                    {
                        string key = parts[ 0 ].Trim();
                        string value = parts[ 1 ].Trim();

                        if ( !dictionary.ContainsKey( key ) )
                        {
                            dictionary[ key ] = value;
                        }
                    }
                }
            }
        }
    }

    static void SaveDictionary()
    {
        List<string> lines = new List<string>();
        foreach ( var entry in dictionary )
        {
            lines.Add( $"{entry.Key}:{entry.Value}" );
        }
        File.WriteAllLines( filePath, lines );
    }

    static void RunDictionaryApp()
    {
        while ( true )
        {
            Console.WriteLine( "Выберите действие: " );
            Console.WriteLine( "1. Перевести слово" );
            Console.WriteLine( "2. Добавить новое слово" );
            Console.WriteLine( "3. Выход" );
            Console.WriteLine( "4. Просмотреть все пары слов" );

            string choice = Console.ReadLine();

            switch ( choice )
            {
                case "1":
                    TranslateWord();
                    break;
                case "2":
                    AddNewWord();
                    break;
                case "3":
                    SaveDictionary();
                    return;
                case "4":
                    DisplayAllWords();
                    break;
                default:
                    Console.WriteLine( "Некорректный выбор. Пожалуйста, выберите 1, 2, 3 или 4." );
                    break;
            }
        }
    }

    static void TranslateWord()
    {
        Console.Write( "Введите слово для перевода: " );
        string word = Console.ReadLine().Trim();

        if ( dictionary.ContainsKey( word ) )
        {
            Console.WriteLine( $"Перевод: {dictionary[ word ]}" );
        }
        else
        {
            Console.WriteLine( "Слово отсутствует в словаре." );
            Console.Write( "Хотите добавить новое слово? (да/нет): " );
            string response = Console.ReadLine().ToLower();
            if ( response == "да" )
            {
                AddNewWord( word );
            }
        }
    }

    static void AddNewWord()
    {
        Console.Write( "Введите слово на одном языке: " );
        string word1 = Console.ReadLine().Trim();
        Console.Write( "Введите перевод на другом языке: " );
        string word2 = Console.ReadLine().Trim();

        if ( !dictionary.ContainsKey( word1 ) && !dictionary.ContainsKey( word2 ) )
        {
            dictionary[ word1 ] = word2;
            dictionary[ word2 ] = word1;
            Console.WriteLine( "Слово успешно добавлено в словарь." );
            SaveDictionary(); // Сохраняем изменения сразу после добавления нового слова
        }
        else
        {
            Console.WriteLine( "Одно из слов уже существует в словаре." );
        }
    }

    static void AddNewWord( string word )
    {
        Console.Write( $"Введите перевод для слова '{word}': " );
        string translation = Console.ReadLine().Trim();

        if ( !dictionary.ContainsKey( word ) && !dictionary.ContainsKey( translation ) )
        {
            dictionary[ word ] = translation;
            dictionary[ translation ] = word;
            Console.WriteLine( "Слово успешно добавлено в словарь." );
            SaveDictionary(); // Сохраняем изменения сразу после добавления нового слова
        }
        else
        {
            Console.WriteLine( "Одно из слов уже существует в словаре." );
        }
    }

    static void DisplayAllWords()
    {
        Console.WriteLine( "Существующие пары слов в словаре:" );
        foreach ( var entry in dictionary )
        {
            Console.WriteLine( $"{entry.Key} - {entry.Value}" );
        }
    }
}
