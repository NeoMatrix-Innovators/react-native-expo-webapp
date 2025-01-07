const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'blackzberry',
  user: 'hexzhen3x7',
  password: 'x3pc09220196',
  database: 'blackzspacededb',
  port: 3306,
});

connection.connect((err: Error | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


module.exports = connection;
