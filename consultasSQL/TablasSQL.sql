CREATE TABLE ROLES (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(255)
);

CREATE TABLE STATUS (
    status_id INT PRIMARY KEY,
    status_name VARCHAR(255)
);

CREATE TABLE CURRENCY (
    currency_id INT PRIMARY KEY,
    currency_name VARCHAR(255)
);

CREATE TABLE USERS (
    user_id INT PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    rol_id INT,
    status_id INT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES ROLES(role_id),
    FOREIGN KEY (status_id) REFERENCES STATUS(status_id)
);

CREATE TABLE RESERVES (
    reserve_id INT PRIMARY KEY,
    status_id INT,
    user_id INT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    reserveDay DATE,
    checkIn TIMESTAMP,
    checkOut TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES STATUS(status_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE ROOMS (
    room_id INT PRIMARY KEY,
    status_id INT,
    size INT,
    price DECIMAL(10,2),
    currency_id VARCHAR(3),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES STATUS(status_id)
);

CREATE TABLE ROOMS_RESERVES (
    room_id INT,
    reserve_id INT,
    PRIMARY KEY (room_id, reserve_id),
    FOREIGN KEY (room_id) REFERENCES ROOMS(room_id),
    FOREIGN KEY (reserve_id) REFERENCES RESERVES(reserve_id)
);
