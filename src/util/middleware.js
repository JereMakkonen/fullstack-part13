const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

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

const tokenExtractor = (req, res, next) => {  
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET) 
  } else { 
    return res.status(401).json({ error: 'token missing' }) 
  }

  next()
}

module.exports = {
  errorHandler, tokenExtractor
};