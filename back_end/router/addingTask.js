const express= require('express');
const db_conn=require('../connection/db')
const createTable=require('../modules/CrTable')
const path=require('path');
const read_json=require('../util/read_json')
const router=express.Router()
createTable()

router.get('/add',(req,res)=>{
    const file_path = path.join(__dirname, '../../frond_end/create_task.html');
    res.sendFile(file_path)
})
const userData=read_json();
router.post('/addingTask',(req,res)=>{
       let user_id=userData.user_id
        let task= req.body.task ;
        let description=req.body.description;
        let category=req.body.category;
        let position=req.body.position;
        let startDate=req.body.startDate;
        let endDate=req.body.endDate;
        db_conn.query('INSERT INTO user_task_list(task_name,description,category,work_position,start_at,end_at,extraint) VALUES (?,?,?,?,?,?,?)',[task,description,category,position,startDate,endDate,user_id],(err,result)=>{
            if (err){
                console.log("error from function add_task_insert",err);
            }
            else{
                console.log('customer added successfully from function add_task_insert');
            }
        })
    //console.log('customer added successfully from router',task,description,category,position,startDate,endDate);
    res.redirect('/');

})

module.exports=router;