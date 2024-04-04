SELECT * FROM reservationApp.user;

SELECT user.user_id as id, user.name, user.lastname, user.email, roles.role_name as rol, status.status_name as status, user.createdAt, user.updatedAt
FROM user
LEFT JOIN roles ON roles.role_id=user.rol_id
LEFT JOIN status ON status.status_id=user.status_id;