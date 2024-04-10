SELECT * FROM reservationApp.reserve;

SELECT reserve.reserve_id, RS.status_name as reserve_status, 
reserve.user_id, user.name, user.lastname, room.room_id, room.price, currency.currency_name, ROS.status_name as room_status, 
reserve.reserveDay, reserve.createdAt, reserve.updatedAt, reserve.checkIn, reserve.checkOut
FROM reserve
JOIN rooms_reserve ON rooms_reserve.reserve_id=reserve.reserve_id
JOIN room ON rooms_reserve.room_id=room.room_id
JOIN status AS RS ON RS.status_id=reserve.status_id
JOIN status AS ROS ON ROS.status_id=room.status_id
JOIN user ON user.user_id=reserve.user_id
JOIN currency on room.currency_id=currency.currency_id;