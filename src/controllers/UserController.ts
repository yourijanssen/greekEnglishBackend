// src/controllers/UserController.ts
import { Request, Response } from "express";
import { pool } from "../db/pool";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const result = await pool.query("SELECT * FROM users");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Database error." });
    }
  }

  static test(req: Request, res: Response) {
    res.send("Hello from Express!");
  }

  static async seed(req: Request, res: Response) {
    try {
      // Ensure table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL
        );
      `);

      // Seed sample users
      const users = [
        { name: "Alice Smith", email: "alice@example.com" },
        { name: "Bob Jones", email: "bob@example.com" },
        { name: "Charlie Young", email: "charlie@example.com" },
      ];

      for (const user of users) {
        await pool.query(
          `INSERT INTO users (name, email) VALUES ($1, $2)
           ON CONFLICT (email) DO NOTHING`,
          [user.name, user.email]
        );
      }

      res.json({ message: "Seeded users table!" });
    } catch (error) {
      res.status(500).json({ error: "Error seeding users." });
    }
  }
}
