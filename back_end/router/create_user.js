const db=require('../connection/db')
const user_table=require('../modules/user_table');
const path=require('path')
const fs=require('fs')
const id_tempFilePath = path.join(__dirname, '../util/temp_values.json');
const exprees=require('express');
user_table()

const router =exprees.Router()

router.use(exprees.urlencoded({ extended: true }));

router.get('/create_user',(req,res)=>{
    const file_path_cr_user=path.join(__dirname,'../../frond_end/create_user.html');
    res.sendFile(file_path_cr_user);
})
router.post('/CreateUser',(req,res)=>{
    let frist_name=req.body.frist_name;
    let last_name=req.body.last_name;
    let email=req.body.email;
    let user_name=req.body.user_name;
    let password=req.body.psw;
    let phone_no=req.body.phone_no;
    const insert_qurey_cr_user='INSERT INTO user_table(first_name, last_name, user_email, user_name, user_password, user_phone_no) VALUES (?,?,?,?,?,?)';
    db.query(insert_qurey_cr_user,[frist_name,last_name,email,user_name,password,phone_no],(err,result)=>{
        if (err){
            console.log("error from function user CREATED",err);
        }
        else{
            console.log('customer added successfully from user CREATED✅');
        }})

    const sql = 'SELECT user_id,user_name FROM user_table WHERE user_name = ?';
        
    db.query(sql, [user_name], (err, results) => {
        if (err) {
        console.error("error from create_user_to find the user_id 1",err);
        } 
        else if (results.length === 1){
            console.log(results)
            const user_id = results[0].user_id;
            const user_name = results[0].user_name;

            updateUserInfo(id_tempFilePath, user_id, user_name);
            async function updateUserInfo(id_tempFilePath, user_id, user_name) {
                try {
                const existingData = await fs.promises.readFile(id_tempFilePath, 'utf-8');
                const userInfo = JSON.parse(existingData);
                userInfo.user_id = user_id;
                userInfo.user_name = user_name;
            
                const userInfoJSON = JSON.stringify(userInfo);
            
                await fs.promises.writeFile(id_tempFilePath, userInfoJSON, 'utf-8');   
        
                } catch (error) {
                console.error(error);
                throw new Error('An error occurred while writing to the file2.');
                }
            }
         res.redirect('/')
        }});
    });

module.exports=router;