const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware')

const { ActiveToken } = require('../models')

router.post('/', tokenExtractor, async (req, res) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'missing or invalid token' }) 

  const active = await ActiveToken.findByPk(authorization.substring(7))
  await active?.destroy()

  return res.status(204).end() 
})

module.exports = router