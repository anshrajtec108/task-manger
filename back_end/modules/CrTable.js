// if task_done ==1 the is done 

const db_conn=require('../connection/db');
function createTable(){
   const createTable_query=`CREATE TABLE IF NOT EXISTS user_task_list (
      id INT AUTO_INCREMENT PRIMARY KEY,
      task_name VARCHAR(255),
      description VARCHAR(255),
      category VARCHAR(255),
      lable VARCHAR(255),
      work_position VARCHAR(255),
      task_done INT DEFAULT 0, 
      start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      end_at TIMESTAMP,
      extra VARCHAR(255) DEFAULT 'empty',
      extraint INT DEFAULT 5555
    );
    
    `


   db_conn.query(createTable_query,(err)=>{
      if (err){
         console.log('error from create Table {CrTable}',err)
      }
      else{
         console.log('created the table')
      }
   })
}
module.exports=createTable;