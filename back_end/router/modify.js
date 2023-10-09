const express=require('express');
const router=express.Router();
const db=require('../connection/db')

router.post('/task_modify',(req,res)=>{
    const id =req.query.id;
    const input=req.body.enter_lable;
    
    console.log(id,input);
    db.query('UPDATE user_task_list SET lable = ? WHERE id = ?',[input,id],(err,result)=>{
        if (err){
            console.log('inserting the values lable err',err)
        }
        else{
            console.log('the lable is inserted at db')
            res.redirect('/')
        }
    })
})

module.exports=router;