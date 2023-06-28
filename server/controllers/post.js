import { findOneId } from "../utils/findUser.js"
import pool from "../db.js"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
import { checkUserId } from "../utils/checkAuth.js"


// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body
    const user = await findOneId(req.userId)
    let filename = ''

    if (req.files) {
      filename = Date.now().toString() + req.files.image.name
      const __diraname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__diraname, '..', 'uploads', filename))
    }

    const sql = 'INSERT INTO posts (username, title, text, imgUrl, userId) VALUES(?, ?, ?, ?, ?)'
    await pool.query(sql, [user.username, title, text, filename, user.id])
    return res.json({
      message: 'Вы успешно создали пост!'
    })

  } catch (error) {
    res.json({ message: 'Не удалось создать пост' })
  }
}


// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const sql = 'SELECT * FROM posts ORDER BY created DESC;'
    const [rows, _] = await pool.query(sql)

    if (!rows) return res.json({ message: 'Постов нет' })

    return res.json({
      posts: rows,
      message: null
    })
  } catch (error) {
    res.json({ message: 'Не удалось получить посты' })
  }
}


// GET POST
export const getPost = async (req, res) => {
  try {
    const sql = 'SELECT * FROM posts WHERE id=?'
    const [rows, _] = await pool.query(sql, [req.params.id])
    const userId = checkUserId(req, res)

    if (userId !== rows[0].userId) {
      const sql2 = 'UPDATE posts SET views = views + 1 WHERE id=?'
      await pool.query(sql2, [req.params.id])
    }

    res.json({
      post: rows[0]
    })
  } catch (error) {
    res.json({ message: 'Не удалось получить пост' })
  }
}

// GET MY POSTS
export const getMyPosts = async (req, res) => {
  try {
    const sql = 'SELECT * FROM posts WHERE posts.userId=?'
    const [rows, _] = await pool.query(sql, [req.userId])

    return res.json({
      posts: rows
    })

  } catch (error) {
    res.json({ message: 'У вас нет постов' })
  }
}


// REMOVE POST
export const removePost = async (req, res) => {
  try {
    const sql1 = 'SELECT * FROM posts WHERE id=?'
    const [rows, _] = await pool.query(sql1, [req.params.id])

    if (rows !== []) {
      const sql2 = 'DELETE FROM posts WHERE id=?'
      await pool.query(sql2, [req.params.id])
      return res.json({ message: 'Пост успешно удален', post: rows[0] })
    }

    return res.json({ message: 'Данного поста не существует' })

  } catch (error) {
    res.json({ message: 'Не удалось удалить пост' })
  }
}

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body
    let filename = ''

    if (req.files) {
      filename = Date.now().toString() + req.files.image.name
      const __diraname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__diraname, '..', 'uploads', filename))
      const sql = `UPDATE posts SET title=?, text=?, imgUrl=? WHERE id=?`
      await pool.query(sql, [title, text, filename, id])
    }

    const sql = `UPDATE posts SET title=?, text=? WHERE id=?`
    await pool.query(sql, [title, text, id])

    const sql2 = 'SELECT * FROM posts WHERE id=?'
    const [rows, _] = await pool.query(sql2, [id])

    return res.json({ message: 'Пост успешно изменен', post: rows[0] })
  } catch (error) {
    res.json({ message: 'Не удалось изменить пост' })
  }
}