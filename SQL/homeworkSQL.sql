-- Создание базы данных
CREATE DATABASE HotelManagement;
GO

-- Использование созданной базы данных
USE HotelManagement;
GO

-- Создание таблицы Rooms
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'rooms')
CREATE TABLE rooms (
    id_room INT IDENTITY(1,1) NOT NULL,
    room_number INT NOT NULL,
    room_type NVARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    availability BIT NOT NULL,
    CONSTRAINT PK_rooms_id_room PRIMARY KEY (id_room)
);
GO

-- Создание таблицы Customers
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'customers')
CREATE TABLE customers (
    id_customer INT IDENTITY(1,1) NOT NULL,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    phone_number NVARCHAR(20) NOT NULL,
    CONSTRAINT PK_customers_id_customer PRIMARY KEY (id_customer)
);
GO

-- Создание таблицы Bookings
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'bookings')
CREATE TABLE bookings (
    id_booking INT IDENTITY(1,1) NOT NULL,
    id_customer INT NOT NULL,
    id_room INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    CONSTRAINT PK_bookings_id_booking PRIMARY KEY (id_booking),
    CONSTRAINT FK_bookings_id_customer FOREIGN KEY (id_customer) REFERENCES customers(id_customer),
    CONSTRAINT FK_bookings_id_room FOREIGN KEY (id_room) REFERENCES rooms(id_room)
);
GO

-- Создание таблицы Facilities
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'facilities')
CREATE TABLE facilities (
    id_facility INT IDENTITY(1,1) NOT NULL,
    facility_name NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_facilities_id_facility PRIMARY KEY (id_facility)
);
GO

-- Создание таблицы RoomsToFacilities
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'rooms_to_facilities')
CREATE TABLE rooms_to_facilities (
    id_room INT NOT NULL,
    id_facility INT NOT NULL,
    CONSTRAINT PK_rooms_to_facilities PRIMARY KEY (id_room, id_facility),
    CONSTRAINT FK_rooms_to_facilities_id_room FOREIGN KEY (id_room) REFERENCES rooms(id_room),
    CONSTRAINT FK_rooms_to_facilities_id_facility FOREIGN KEY (id_facility) REFERENCES facilities(id_facility)
);
GO

-- Заполнение таблицы Rooms
INSERT INTO rooms (room_number, room_type, price_per_night, availability)
VALUES 
(101, 'Одноместный', 50.00, 1),
(102, 'Двухместный', 75.00, 1),
(103, 'Люкс', 120.00, 0),
(104, 'Одноместный', 50.00, 1),
(105, 'Двухместный', 75.00, 0);
GO

-- Заполнение таблицы Customers
INSERT INTO customers (first_name, last_name, email, phone_number)
VALUES 
('Иван', 'Иванов', 'ivan.ivanov@example.com', '123-456-7890'),
('Мария', 'Петрова', 'maria.petrova@example.com', '234-567-8901'),
('Елена', 'Сидорова', 'elena.sidorova@example.com', '345-678-9012'),
('Алексей', 'Кузнецов', 'alexey.kuznetsov@example.com', '456-789-0123'),
('Ольга', 'Смирнова', 'olga.smirnova@example.com', '567-890-1234');
GO

-- Заполнение таблицы Bookings
INSERT INTO bookings (id_customer, id_room, check_in_date, check_out_date)
VALUES 
(1, 1, '2024-07-01', '2024-07-05'),
(2, 2, '2024-07-03', '2024-07-07'),
(3, 3, '2024-07-02', '2024-07-04'),
(4, 4, '2024-07-04', '2024-07-10');
GO

-- Заполнение таблицы Facilities
INSERT INTO facilities (facility_name)
VALUES 
('Wi-Fi'),
('Кондиционер'),
('Мини-бар'),
('Телевизор');
GO

-- Заполнение таблицы RoomsToFacilities
INSERT INTO rooms_to_facilities (id_room, id_facility)
VALUES 
(1, 1), (1, 2), 
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 1), 
(5, 1), (5, 2);
GO

--1. Найдите все доступные номера для бронирования сегодня.
SELECT * 
FROM Rooms
WHERE availability = 1;

--2. Найдите всех клиентов, чьи фамилии начинаются с буквы "С".
SELECT * 
FROM Customers
WHERE last_name LIKE 'С%';

--3. Найдите все бронирования для определенного клиента (по имени или электронному адресу).
-- По имени
SELECT b.*
FROM Bookings b
JOIN Customers c ON b.id_customer = c.id_customer
WHERE c.first_name = 'Иван' AND c.last_name = 'Иванов';

-- По электронному адресу
SELECT b.*
FROM Bookings b
JOIN Customers c ON b.id_customer = c.id_customer
WHERE c.email = 'ivan.ivanov@example.com';


--4. Найдите все бронирования для определенного номера.
SELECT * 
FROM Bookings
WHERE id_room = 1;

--5. Найдите все номера, которые не забронированы на определенную дату.
DECLARE @date DATE = '2024-07-05';

SELECT * 
FROM rooms
WHERE id_room NOT IN (
    SELECT id_room 
    FROM bookings
    WHERE @date BETWEEN check_in_date AND check_out_date
);
