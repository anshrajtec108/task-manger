const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app=express();
const port=4001;

app.use(bodyParser.json());

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

    
    // app.post('/login',(req,res)=>{
    //     const username_input=req.body.username;
    //     const password_input=req.body.password;
        
    //     const query1=`select username from user_inpd`
    //     db_conn.query(query1,[username_input], (err,result)=>{
    //         if (err){
    //             console.error("error when finding the username")
    //         }
    //         if (result.length>0){
    //             console.log("found value: ",result[result.length].username)
    //         }
    //     })
    // })
    
    
    app.post('/login',(req,res)=>{
        const username_input=req.body.username_input;
        const password_input=req.body.password_input;
        const select_query1='select * from user_inpd where username=?'
        db_conn.query(select_query1,[username_input],(err,result)=>{
            if (err){
                console.error("error in post",err)
                return;
            }
                        console.log("password from db",password_from_db)
                        console.log("password from input",password_input)
                        const password_from_db=rest[0].password;
                        if (password_from_db === password_input) {
                            res.json("User is logged in");
                          } else {
                            res.json("Enter the correct password");
        

                    }})
            }

    )
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    })