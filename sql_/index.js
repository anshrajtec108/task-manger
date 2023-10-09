const mysql=require("mysql");

var conn=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"anshraj108",
    database:"collage"
})
conn.connect(function(err) {
    if (err) {throw err};
    console.log("Connected!" );
})