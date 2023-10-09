const express = require('express');
const mysql = require('mysql');
const path=require('path')
const bodyParser = require('body-parser');
const app=express();
const port=4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))


const db_conn=mysql.createConnection({
    port:'3306', 
    host: '127.0.0.1',
    user: 'root',
    password: 'anshraj108',
    database: 'user_login'
})
db_conn.connect((err)=>{
    if (err){
        console.error("error connnection",err)
    }
    else{
        console.log("data base is connected")
    }
})
    create_user_table_query=  `CREATE TABLE IF NOT EXISTS user_inpd (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        data Date
      )
      `;
      db_conn.query(create_user_table_query,(err)=>{
        if (err){
            console.error("error_create the table",err)
        }
        else{
            console.log("Table created successfully")
        }
      })
      app.get('/test',(req,res)=>{
        const un=db_conn.query('SELECT * FROM user_inpd')
        return res.render('index',{
        user_name_html: un,
        });
      })
      app.post('/login', (req, res) => {
        const username_input = req.body.username_input;
        const password_input = req.body.password_input;
 
      
        const select_query1 = 'SELECT * FROM user_inpd WHERE username = ?';
      
        db_conn.query(select_query1, [username_input], (err, result) => {
          if (err) {
            console.error("Error in select_query1", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
      
          if (result.length === 0) {
            res.status(404).json({ message: "Username not found" });
            console.log("not found")
            return;
          }
      
          const password_from_db = result[0].password; // Extract the password from the result
      
          if (password_from_db === password_input) {
            res.json("User is logged in");
          } else {
            res.json("Enter the correct password");
          }
        });
      });
      

      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    