const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { 
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  return res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username }
  })
  if (!user) return res.status(404).end()

  const updatedUser = await user.update({ username: req.body.username })
  return res.json(updatedUser)
})

module.exports = router