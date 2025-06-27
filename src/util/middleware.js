const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const {User, ActiveToken } = require('../models')

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {  
  const authorization = req.get('authorization')
  
  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'missing or invalid token' }) 

  const token = authorization.substring(7)
  req.decodedToken = jwt.verify(token, SECRET)

  const active = await ActiveToken.findByPk(token)
  if (!active) return res.status(401).json({ error: 'token expired' }) 

  const user = await User.findOne({
    where: { username: req.decodedToken.username }
  })
  if (user.disabled) return res.status(401).json({ error: 'account disabled' })

  next()
}

module.exports = {
  errorHandler, tokenExtractor
}