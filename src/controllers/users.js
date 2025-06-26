const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['name', 'username', 'id'],
    include: { 
      model: Blog,
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
    }
  })
  return res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = (req.query.read === 'true' || req.query.read === 'false') 
  ? { read: req.query.read === 'true' } : undefined

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'reading',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: ['read', 'id'],
        where
      },
    }
  })

  if (!user) res.status(404).end()
  return res.json(user)
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