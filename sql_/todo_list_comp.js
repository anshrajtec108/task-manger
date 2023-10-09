// Import required libraries
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = 3000;

// Configure body-parser to handle JSON data
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  port:'3306',
  host: '127.0.0.1',
  user: 'root',
  password: 'anshraj108',
  database: 'todo_db'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define API endpoints

// Retrieve a list of all todos
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('Error querying todos:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
    const todo = req.body.todo;
  
    db.query('INSERT INTO todos (task) VALUES (?)', [todo], (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Todo added successfully');
        res.status(201).json({ message: 'Todo added successfully' });
      }
    });
  });
  

// Update an existing todo by ID
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const newTask = req.body.todo;
  db.query('UPDATE todos SET task = ? WHERE id = ?', [newTask, id], (err, result) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Todo updated successfully' });
    }
  });
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Todo deleted successfully' });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
