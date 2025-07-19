import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "greek_learning_game",
  password: process.env.PGPASSWORD || "kees123",
  port: +(process.env.PGPORT || 5432),
});

pool.on("error", (err: any) => {
  console.error("Unexpected pg pool error", err);
});
