import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();
// CONSTANTS
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.HOST

const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  connectionLimit: 5
}).promise()

export default pool;