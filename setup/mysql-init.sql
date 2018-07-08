CREATE DATABASE IF NOT EXISTS `clevy-simple-test`;

USE `clevy-simple-test`;

CREATE TABLE IF NOT EXISTS `interaction-logs` (\
  id INT AUTO_INCREMENT NOT NULL,\
  question VARCHAR(256) NOT NULL,\
  answer TEXT NULL,\
  PRIMARY KEY (id)
);