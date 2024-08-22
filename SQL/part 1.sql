USE HotelManagement;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rooms')
	CREATE TABLE dbo.rooms
	(
		room_id INT IDENTITY(1,1) NOT NULL,
		room_number INT NOT NULL,
		room_type NVARCHAR(50) NOT NULL,
		price_per_night MONEY NOT NULL,
		availability BIT NOT NULL,

		CONSTRAINT PK_rooms_room_id PRIMARY KEY (room_id)
	)

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'customers')
	CREATE TABLE dbo.customers
	(
		customer_id INT IDENTITY(1,1) NOT NULL,
		first_name NVARCHAR(50) NOT NULL,
		last_name NVARCHAR(50) NOT NULL,
		email NVARCHAR(254) NOT NULL,
		phone_number NVARCHAR(15) NOT NULL,

		CONSTRAINT PK_customers_customer_id PRIMARY KEY (customer_id)
	)

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'bookings')
	CREATE TABLE dbo.bookings
	(
		booking_id INT IDENTITY(1,1) NOT NULL,
		customer_id INT NOT NULL,
		room_id INT NOT NULL,
		check_in_date DATE NOT NULL,
		check_out_date DATE NOT NULL,

		CONSTRAINT PK_bookings_booking_id PRIMARY KEY (booking_id),
		CONSTRAINT FK_bookings_customer_id 
			FOREIGN KEY (customer_id) REFERENCES dbo.customers (customer_id),
		CONSTRAINT FK_bookings_room_id 
			FOREIGN KEY (room_id) REFERENCES dbo.rooms (room_id)
	)

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'facilities')
	CREATE TABLE dbo.facilities
	(
		facility_id INT IDENTITY(1,1) NOT NULL,
		facility_name NVARCHAR(40) NOT NULL,

		CONSTRAINT PK_facilities_facility_id PRIMARY KEY (facility_id)
	)

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rooms_to_facilities')
	CREATE TABLE dbo.rooms_to_facilities
	(
		room_id INT NOT NULL,
		facility_id INT NOT NULL,

		CONSTRAINT PK_rooms_to_facilities_id PRIMARY KEY (room_id, facility_id),
		CONSTRAINT FK_rooms_to_facilities_room_id 
			FOREIGN KEY (room_id) REFERENCES dbo.rooms (room_id),
		CONSTRAINT FK_rooms_to_facilities_facility_id 
			FOREIGN KEY (facility_id) REFERENCES dbo.facilities (facility_id)
	)


INSERT INTO dbo.rooms VALUES 
  ('12a', N'Одноместный', 100),
  ('13', N'Одноместный', 100),
  ('14', N'Двухместный', 200.50),
  ('15', N'Двухместный', 170),
  ('16', N'Двухместный', 170);
  
INSERT INTO dbo.customers VALUES 
  (N'Андрей', N'Иванов', 'andrey.ivanov@mail.ru', '79058349535'),
  (N'Иван', N'Сапинин', 'ivan.sapinin@mail.ru', '792405385393'),
  (N'Сергей', N'Жернёв', 'sergey.jernev@gmail.com', '79583953593'),
  (N'Евгений', N'Синин', 'evgen.sinin@yandex.ru', '79285939567'),
  (N'Георгий', N'Петров', 'jora.petrov@mail.ru', '79879530535');

INSERT INTO dbo.bookings VALUES
  (1, 5, '2024-07-02', '2024-07-09'),
  (3, 2, '2024-07-09', '2024-07-10'),
  (3, 2, '2024-07-09', '2024-07-15'),
  (4, 3, '2024-07-10', '2024-07-24');
  
INSERT INTO dbo.facilities VALUES
  ('Wi-Fi'),
  (N'Кондиционер'),
  (N'Мини-бар'),
  (N'Джакузи');
  
INSERT INTO dbo.rooms_to_facilities VALUES
  (1, 3),
  (2, 1),
  (2, 2),
  (4, 1),
  (4, 3),
  (4, 4),
  (5, 2),
  (5, 3);