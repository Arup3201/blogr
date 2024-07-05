CREATE SCHEMA IF NOT EXISTS BlogrDB;
USE BlogrDB;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(1000) NOT NULL,
    PRIMARY KEY (user_id)
)  ENGINE=INNODB AUTO_INCREMENT=1 CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS Blogs (
    blog_id INT AUTO_INCREMENT, 
    user_id INT NOT NULL, 
    title VARCHAR(1000) NOT NULL UNIQUE, 
    content TEXT(100) NOT NULL, 
    likes INT, 
    topic VARCHAR(100) NOT NULL, 
    tags VARCHAR(1000) NOT NULL, 
    created_on DATE NOT NULL, 
    link VARCHAR NOT NULL, 
    views INT, 
    PRIMARY KEY(blog_id)
)ENGINE=INNODB AUTO_INCREMENT=1 CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT, 
    blog_id INT NOT NULL, 
    user_id INT NOT NULL, 
    comment VARCHAR(10000) NOT NULL, 
    commented_on DATE NOT NULL, 
    sentiment ENUM('positive', 'neutral', 'negative')
    supports INT, 
    PRIMARY KEY(comment_id)
)ENGINE=INNODB AUTO_INCREMENT=1 CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS Questions (
    question_id INT AUTO_INCREMENT, 
    blog_id INT NOT NULL,
    question VARCHAR(10000) NOT NULL, 
    options VARCHAR(10000) NOT NULL, 
    answer VARCHAR(10000) NOT NULL, 
    PRIMARY KEY(question_id)
)ENGINE=INNODB AUTO_INCREMENT=1 CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS Interactions(
    interaction_id INT AUTO_INCREMENT, 
    user_id INT NOT NULL, 
    blog_id INT NOT NULL, 
    interaction_type ENUM('click', 'like', 'comment', 'share'), 
    PRIMARY KEY (interaction_id)
)ENGINE=INNODB AUTO_INCREMENT=1 CHARSET=UTF8MB4;