// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'greek_learning_game',
  password: 'kees123',
  port: 5432, // default postgres port
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Sample endpoint to fetch all users (assumes a users table exists)
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});