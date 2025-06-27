const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const ActiveToken = require('../models/activeToken')

router.post('/', async (req, res) => {

  const user = await User.findOne({
    where: { username: req.body.username }
  })

  if (!(user && req.body.password === 'secret')) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  await ActiveToken.create({ token })

  return res.status(200).send({ ...userForToken, token })
})

module.exports = router