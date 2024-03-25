SELECT * FROM reservationApp.RESERVES;

SELECT RESERVES.reserve_id, RS.status_name as reserve_status, 
RESERVES.user_id, USERS.name, USERS.lastname, ROOMS.room_id, ROS.status_name as room_status, 
RESERVES.reserveDay, RESERVES.createdAt, RESERVES.updatedAt, RESERVES.checkIn, RESERVES.checkOut
FROM RESERVES
JOIN ROOMS_RESERVES ON ROOMS_RESERVES.reserve_id=RESERVES.reserve_id
JOIN ROOMS ON ROOMS_RESERVES.room_id=ROOMS.room_id
JOIN STATUS AS RS ON RS.status_id=RESERVES.status_id
JOIN STATUS AS ROS ON ROS.status_id=ROOMS.status_id
JOIN USERS ON USERS.user_id=RESERVES.user_id;