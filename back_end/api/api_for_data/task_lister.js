const db_conn = require('../../connection/db');


// function send_task(req,res, user_id) {
//   console.log('Output from get user id send_task', user_id);

//   db_conn.query(
//     'SELECT task_name, description, lable, work_position, start_at, end_at FROM user_task_list where extraint=?',
//     [user_id],
//     (err, results) => {
//       if (err) {
//         console.error('Selection task error', err);
//         return res.status(500).json({ error: 'Selection task error' });
//       }
//       // Send the JSON response only when there are no errors
//       res.json({ taskNames: results });
//     }
//   );
// }
function send_task(user_id,user_name) {
    return new Promise((resolve, reject) => {
      console.log('Output from get user id send_task', user_id);
  
      db_conn.query(
        'SELECT id,task_name,description,lable,work_position,task_done,start_at,end_at FROM user_task_list where extraint=?;',
        [user_id],
        (err, results) => {
          if (err) {
            console.error('Selection task error', err);
            reject(err); // Reject the promise if there's an error
          } else {
            results.forEach(row => {
                row.user_name = user_name;
              });
            resolve(results); // Resolve the promise with the results
          }
        }
      );
    });
  }
  function send_task_data(req,res,data) {
    console.log('data from send_task_data ', data);
        res.json({ taskNames: data });
  }
module.exports = {
  send_task: send_task,
  send_task_data: send_task_data
};
