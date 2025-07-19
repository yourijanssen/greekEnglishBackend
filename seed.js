// seed.js
const { Pool } = require('pg');

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'greek_learning_game',
  password: 'kees123',
  port: 5432, // default postgres port
});

async function seed() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `);

  await pool.query(`
    INSERT INTO users (name, email) VALUES
      ('Alice Smith', 'alice@example.com'),
      ('Bob Jones', 'bob@example.com'),
      ('Charlie Young', 'charlie@example.com')
    ON CONFLICT DO NOTHING;
  `);

  console.log('Seeded users table!');
  await pool.end();
}

seed();