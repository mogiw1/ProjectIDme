const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

// Database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Simple "Hello World" route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route to get "Hello World" from the database
app.get('/db', (req, res) => {
  db.query('SELECT message FROM greetings WHERE id = 1', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query.');
      return;
    }
    res.send(result[0].message);
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

