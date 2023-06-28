import pool from "../db.js"
import { findOneId } from "../utils/findUser.js"

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body
    const sql = 'INSERT INTO comments (text, username, userId, postId) VALUES (?, ?, ?, ?)'
    const sql2 = 'UPDATE posts SET comments = comments + 1 WHERE id = ?'
    const user = await findOneId(req.userId)

    await pool.query(sql, [text, user.username, req.userId, postId])
    await pool.query(sql2, [postId])
    return res.json({ message: 'Комментарий успешно создан', comment: { id: Math.round(Math.random() * 1000000), text, username: user.username, userId: req.userId, postId, created: new Date() } })

  } catch (error) {
    res.json({ message: 'Не удалось создать комментарий' })
  }
}

// GET COMMENTS
export const getComments = async (req, res) => {
  try {
    const sql = 'SELECT * FROM comments WHERE postId = ?'
    const [rows, _] = await pool.query(sql, [req.params.id])
    return res.json({ comments: rows })

  } catch (error) {
    res.json({ message: 'Не удалось получить комментарии' })
  }
}