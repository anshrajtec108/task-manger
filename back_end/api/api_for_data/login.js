const db_conn=require('../../connection/db');




// function get_user_id(user_n_e, callback) {
//     const idQuery = 'SELECT user_id FROM user_table WHERE user_name = ? OR user_email = ?';

//     db_conn.query(idQuery, [user_n_e, user_n_e], (err, results) => {
//         if (err) {
//             console.error(err);
//             callback(err, null); // Pass an error to the callback
//         } else if (results.length === 1) {
//             const user_id = results[0].user_id;
//             callback(null, user_id); // Pass user_id to the callback
//         } else {
//             callback('User not found', null); // Pass an error to the callback
//         }
//     });
// }


function get_user_id(user_id) {
  
    console.log('ouput from get user id ',user_id);
    return user_id
  }
module.exports = {
    get_user_id: get_user_id
};
