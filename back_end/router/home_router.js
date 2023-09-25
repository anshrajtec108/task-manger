// home_router.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const read_json=require('../util/read_json')
const db_conn=require('../connection/db')
const { send_task, send_task_data } = require('../api/api_for_data/task_lister');
const router = express.Router();

router.get('/', (req, res) => {
  const file_path_home = path.join(__dirname, '../../frond_end/home_gpt.html');
  res.sendFile(file_path_home);
});

// Define the path to the id_temp.json file



const userData = read_json();

router.get('/api/tasks', async (req, res) => {
  const user_id = userData.user_id;
  const user_name=userData.user_name;
  console.log('User ID:', user_id);
  console.log('User name:', user_name);
  try {
    const data = await send_task(user_id,user_name); // Use await inside an async function
    send_task_data(req, res, data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
});
router.post('/api/updateTaskStatus', (req, res) => {
  const taskId = req.body.taskId;
  console.log('taskId',taskId)
  const taskDone = req.body.task_done;
  console.log('taskDone',taskDone)

  // Perform the database update
  const sql = 'UPDATE user_task_list SET task_done = ? WHERE id = ?';

  db_conn.query(sql, [taskDone, taskId], (err, results) => {
    if (err) {
      console.error('Error updating task status:', err);
      res.status(500).json({ success: false, error: 'Error updating task status' });
    } else {
      res.json({ success: true });
    }
  });
});






module.exports=router;