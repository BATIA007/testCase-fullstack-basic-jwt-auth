import pool from "../db.js"

export const findOne = async (username) => {
  const [rows, _] = await pool.query(`SELECT * FROM users WHERE username=?;`, username);
  return rows[0];
}

export const findOneId = async (id) => {
  const [rows, _] = await pool.query(`SELECT * FROM users WHERE id=?;`, id);
  return rows[0];
}