import jwt from "jsonwebtoken";

export const checkUserId = (req, res) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return decoded.id
    } catch (err) {
      console.log(err)
    }
  } else {
    return null
  }
}

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.id
      next()

    } catch (err) {
      return res.json({
        message: 'Нет доступа'
      })
    }
  } else {
    return res.json({
      message: 'Нет доступа'
    })
  }
}