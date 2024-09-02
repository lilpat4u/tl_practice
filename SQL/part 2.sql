-- Поиск всех доступных номеров для бронирования на сегодняшний день
SELECT DISTINCT r.* FROM rooms as r
JOIN bookings as b on r.room_id = b.room_id
WHERE GETDATE() NOT BETWEEN b.check_in_date AND b.check_out_date AND r.availability = 1;

-- Поиск всех клиентов, чьи фамилии начинаются с буквы 'S'
SELECT * FROM customers as c
WHERE c.last_name LIKE 'S%';

-- Поиск всех бронирований для определенного клиента (по имени или электронному адресу).
SELECT b.* FROM bookings as b
JOIN customers as c on b.customer_id = c.customer_id
WHERE c.email = 'alice.johnson@example.com';

-- Найдите все бронирования для определенного номера.
SELECT b.* FROM bookings as b
JOIN rooms as r on b.room_id = r.room_id
WHERE r.room_number = 101;

-- Поиск всех номеров, которые не забронированы на определенную дату.
SELECT * FROM rooms as r
WHERE r.availability = 1 AND r.room_id NOT IN (
	SELECT b.room_id FROM bookings as b
	WHERE '2024-07-11' BETWEEN b.check_in_date AND b.check_out_date
);

