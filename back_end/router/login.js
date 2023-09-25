const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the fs module
const router = express.Router();
const db = require('../connection/db');
const id_tempFilePath = path.join(__dirname, '../util/temp_values.json');

router.get('/login', (req, res) => {
  const file_path = path.join(__dirname, '../../frond_end/login.html');
  res.sendFile(file_path);
});

router.post('/loginData', (req, res) => {
  let user_name_email = req.body.user_name_email;
  let password = req.body.password;

  const sql = 'SELECT user_id,user_name FROM user_table WHERE (user_name = ? OR user_email = ?) AND user_password = ?';

  db.query(sql, [user_name_email, user_name_email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred.');
    } else if (results.length === 1) {
      const user_id = results[0].user_id;
      console.log(results)
      const user_name = results[0].user_name;
    console.log('user_id by home_router',user_id)
      // Create a JavaScript object with user information
      const userInfo = {
        user_id: user_id,
        user_name: user_name
      };

 

      try {
        const existingData = fs.readFileSync(id_tempFilePath, 'utf-8');
        const userInfo = JSON.parse(existingData);
        userInfo.user_id = user_id; // Update the user_id with the new value
        userInfo.user_name = user_name;
        // Convert the JavaScript object to a JSON string
        const userInfoJSON = JSON.stringify(userInfo);

        // Write the updated JSON string back to the file (id_temp.json)
        fs.writeFileSync(id_tempFilePath, userInfoJSON, 'utf-8')
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while writing to the file.');
      }
    }

    res.redirect('/');
  });
});

module.exports = router;
