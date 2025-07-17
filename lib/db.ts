// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  user: "next_user",
  host: "localhost", 
  database: "next_auth_app",
  password: "next_pass",
  port: 5432,
});

export default pool;
