# Clevy Simple Technical Test
The goal of this simple exercise is to create a very basic chatbot, that is able to answer a few simple questions.

## Installation
1. Clone this repository on a machine that run NodeJS 8.9 and MySQL
2. Run `npm install` to install dependencies
3. Configure the mysql database

If you use MySQL 8, in order to allow the connection, you need to 
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```

## How to use
```
node bot.js "are you a bot?"
```

## Configuration
Talk about key files + ...

### MySQL
Connection config file in config/mysql.js
Exemple file:
```
module.exports = {
	"host": "127.0.0.1",
	"port": 3306,
	"user": "root",
	"password": "password",
	"database": "clevy-simple-test",
}
```