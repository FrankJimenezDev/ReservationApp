SELECT * FROM reservationApp.ROOMS;

SELECT ROOMS.room_id as room, STATUS.status_name as status, ROOMS.size, ROOMS.price, CURRENCY.currency_name, ROOMS.createdAt, ROOMS.updatedAt
FROM ROOMS
LEFT JOIN STATUS ON STATUS.status_id=ROOMS.status_id
LEFT JOIN CURRENCY ON CURRENCY.currency_id=ROOMS.currency;