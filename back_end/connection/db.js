
const mysql = require('mysql');

const db_conn = mysql.createConnection({
    port: '3306',
    host: '127.0.0.1',
    user: 'root',
    password: 'anshraj108',
    database: 'todo_db'
});

db_conn.connect((err) => {
    if (err) {
        console.error("error connection", err);
    } else {
        console.log("database is connected");
    }
});

module.exports = db_conn;