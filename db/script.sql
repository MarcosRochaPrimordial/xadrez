CREATE DATABASE IF NOT EXISTS xadrez_base;

USE xadrez_base;

DROP TABLE IF EXISTS game_move;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE game (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_code VARCHAR(255) UNIQUE,
    player_one_id INT,
    player_two_id INT,
    d_start DATETIME,
    FOREIGN KEY (player_one_id) REFERENCES user(id),
    FOREIGN KEY (player_two_id) REFERENCES user(id)
);

CREATE TABLE game_move (
    id INT PRIMARY KEY AUTO_INCREMENT,
    d_time DATETIME,
    game_id INT,
    user_id INT,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);