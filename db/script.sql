CREATE DATABASE IF NOT EXISTS xadrez_base;

USE xadrez_base;

DROP TABLE IF EXISTS game_move;
DROP TABLE IF EXISTS piece;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_code VARCHAR(255) UNIQUE,
    player_one_id INT,
    player_two_id INT,
    d_start DATETIME,
    FOREIGN KEY (player_one_id) REFERENCES user(id),
    FOREIGN KEY (player_two_id) REFERENCES user(id)
);

CREATE TABLE piece (
    id INT PRIMARY KEY AUTO_INCREMENT,
    colored BOOLEAN,
    piece_name VARCHAR(6),
    piece_code VARCHAR(10)
);

CREATE TABLE game_move (
    id INT PRIMARY KEY AUTO_INCREMENT,
    piece_id INT,
    spot VARCHAR(2),
    d_time DATETIME,
    room_id INT,
    user_id INT,
    FOREIGN KEY (piece_id) REFERENCES piece(id),
    FOREIGN KEY (room_id) REFERENCES room(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO piece(id, colored, piece_name, piece_code) VALUES
(null, false, 'KING', '\u2654'),
(null, false, 'QUEEN', '\u2655'),
(null, false, 'BISHOP', '\u2657'),
(null, false, 'KNIGHT', '\u2658'),
(null, false, 'ROOK', '\u2656'),
(null, false, 'PAWN', '\u2659');

INSERT INTO piece(id, colored, piece_name, piece_code) VALUES 
(null, true, 'KING', '\u265A'),
(null, true, 'QUEEN', '\u265B'),
(null, true, 'BISHOP', '\u265C'),
(null, true, 'KNIGHT', '\u265D'),
(null, true, 'ROOK', '\u265E'),
(null, true, 'PAWN', '\u265F');