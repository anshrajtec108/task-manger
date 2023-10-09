const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app=express();
const port=4000;

app.use(bodyParser.json());

const db=mysql.createConnection({
    port:'3306', 
    host: '127.0.0.1',
    user: 'root',
    password: 'anshraj108',
    database: 'user_list'
})

db.connect((err)=>{
    if (err){
        console.error("error",err);
    }
    else{
        console.log("the db is connected");
    }
})

app.get('/userlist',(req,res)=>{
    
    db.query('select * from user',(err,result)=>{
        if (err){
            console.error("error",err);
        }
        else{
            res.json(result);
        }
    })
})

app.post('/userlist',(req,res)=>{
    const user_name=req.body.user_name;
    const user_address=req.body.user_address;

    db.query('INSERT INTO user(user_name,user_address) VALUES (?,?)',[user_name,user_address],(err,result)=>{
        if (err){
            console.error("error")
        }
        else{
            console.log('Todo added successfully');
            res.status(201).json({ message: 'Todo added successfully' });
        }
    })
})

app.put('/userlist/:id',(req,res)=>{
    const id=req.params.id;
    const user_name=req.body.user_name;
    const user_address=req.body.user_address;

    db.query('UPDATE user SET user_name=?, user_address=? WHERE id=?', [user_name, user_address, id], (err, result) => {
        if (err){
            console.error("error")
        }
        else{
            console.log('update successfully');
            res.status(201).json({ message: 'update successfully' });
        }
    })
})

app.delete('/userlist/:id',(req,res)=>{
    const id=req.params.id;
    
    db.query('delete from user where id=?',[id],(err,result)=>{
        if (err){
            console.error("error")
        }
        else{ 
            console.log('deleted successfully');
           res.status(201).json({ message: 'deleted successfully' });
            
        }
    })
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
