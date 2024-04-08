CREATE DATABASE IF NOT EXISTS SoccerSocialHub;
USE SoccerSocialHub;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE user_rol (
    usuario_id INT PRIMARY KEY,
    roles_usuario ENUM('ROLE_USER', 'ROLE_ADMIN') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE teams (
    teams_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    size INT NOT NULL
);

CREATE TABLE players (
    players_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    team_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(teams_id)
);

CREATE TABLE fields (
    fields_id INT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INT,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(teams_id)
);

CREATE TABLE reviews (
    reviews_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    fields_id INT,
    team_id INT,
    FOREIGN KEY (fields_id) REFERENCES fields(fields_id),
    FOREIGN KEY (team_id) REFERENCES teams(teams_id)
);
