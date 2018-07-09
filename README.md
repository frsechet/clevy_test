# Clevy Simple Technical Test
The goal of this simple exercise is to create a very basic chatbot, that is able to answer a few simple questions.

## Installation
1. Clone this repository on a machine that run NodeJS (>= 8.9) and MySQL
2. Run `npm install` to install dependencies
3. Configure the MySQL Database

Install MySQL.

The default database name is `clevy-simple-test`. Init the database with the following command:
``` bash
mysql -u USER -p < setup/mysql-init.sql
# Replace USER by a username allowed to make changes or use root
# use -p if you need a password
```
Configure your database connection settings in the config/mysql.js file ([see the config section](#mysql)).

For MySQL 8 users, you need to allow connections with:
``` bash
# In the MySQL Client (mysql -u USER -p)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
# Exemple if user is root and password is password
```

## How to use
``` bash
node bot.js "are you a bot?"
```
The bot stores interaction logs in the table `interaction-logs`.

## Configuration

### MySQL
Config file in config/mysql.js
``` javascript
// Exemple
module.exports = {
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'clevy-simple-test',
};
```

### API Token
API Tokens are stored in files the `config` folder.
- `recast.key` : Recast API

For a simplicity purpose I used files to store token, it would be more secure to use environment variables in production.

### CSV file
The bot answers are located in the config/answers.csv.

## Dependencies
- NodeJS (Tested on >= 8.9)
- Axios
- MySQL (Tested on MySQL 8, should work with lower versions)