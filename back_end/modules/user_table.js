const db_conn=require('../connection/db');

function createTableUser(){
    const createTableUser_query=`CREATE TABLE IF NOT EXISTS user_table(
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        user_email VARCHAR(255),
        user_name VARCHAR(255),
        user_password VARCHAR(255),
        user_phone_no BIGINT DEFAULT 0,
        user_group_resiter VARCHAR(255),
        user_photo VARCHAR(255)
    )`
    db_conn.query(createTableUser_query,(err)=>{
        if(err){
            console.log('error from creating user_table ',err);
        }
        else{
            console.log('the user_table also created')
        }
    })
}

module.exports=createTableUser;