import pool from "../db.js"
import { findOne, findOneId } from "../utils/findUser.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// REGISTER
export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const isUsed = await findOne(username)

    if (isUsed) {
      return res.json({
        message: 'Данное имя пользователя уже занято'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)'
    await pool.query(sql, [username, hash])

    const user = await findOne(username)

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )

    res.json({
      token: token,
      user: user.id,
      message: 'Регистрация прошла успешно'
    })
  } catch (err) {
    res.json({
      message: 'Ошибка при регистрации',
    })
  }
}

//LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await findOne(username)

    if (!user) {
      return res.json({
        message: 'Данного пользователя не существует'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Неверный пароль'
      })
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )

    res.json({
      token: token,
      user: user.id,
      message: 'Вы успешно вошли в аккаунт'
    })

  } catch (err) {
    res.json({
      message: 'Ошибка при авторизации'
    })
  }
}

//GET ME
export const getMe = async (req, res) => {
  try {
    const user = await findOneId(req.userId)

    if (!user) {
      res.json({
        message: 'Данного пользователя не существует'
      })
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    )

    res.json({
      token: token,
      user: user.id,
      message: 'Вы успешно вошли в аккаунт'
    })

  } catch (err) {
    res.json({
      message: 'Ошибка при входе'
    })
  }
}