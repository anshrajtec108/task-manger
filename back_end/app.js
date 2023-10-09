const express = require('express');
const path=require('path')
const bodyParser = require('body-parser');
const home = require('./router/home_router');
const addingTask = require('./router/addingTask');
const login_router=require('./router/login');
const create_user=require('./router/create_user')
const modify=require('./router/modify')
const app = express();
const PORT = 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(login_router);
app.use(addingTask);
app.use(create_user);
app.use(modify)

app.use('/', home);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('An error occurred.');
});


app.listen(PORT, () => {
    console.log(`the server is started at ${PORT}`);
});
