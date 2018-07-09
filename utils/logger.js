const mysql = require('mysql');
const config = require('../config/mysql');

const connection = mysql.createConnection(config);

module.exports = {
  //Permanently store an interaction
  saveInteraction: (question, answer) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `interaction-logs` SET ?';
      const toInsert = {
        question,
        answer
      };
      
      connection.query(query, toInsert, (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.affectedRows == 0) {
          return reject(Error('Interaction was not saved to database'));
        };
        
        return resolve();
      })
    });
  }
};