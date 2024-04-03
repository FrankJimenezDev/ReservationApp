SELECT * FROM reservationApp.USERS;

SELECT USERS.user_id, USERS.name, USERS.lastname, ROLES.role_name as rol, STATUS.status_name as status, USERS.createdAt, USERS.updatedAt
FROM USERS
LEFT JOIN ROLES ON ROLES.role_id=USERS.rol_id
LEFT JOIN STATUS ON STATUS.status_id=USERS.user_id;